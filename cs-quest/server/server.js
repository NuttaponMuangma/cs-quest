const express = require('express');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const MAX_PLAYERS = 30;
const TICK_RATE = 50; // ms

// Game state
const rooms = new Map(); // roomId -> room
const players = new Map(); // ws -> player

function createRoom(roomId) {
  return {
    id: roomId,
    players: new Map(),
    started: false,
    createdAt: Date.now()
  };
}

function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, createRoom(roomId));
  }
  return rooms.get(roomId);
}

function broadcast(room, msg, excludeWs = null) {
  const data = JSON.stringify(msg);
  room.players.forEach((player, ws) => {
    if (ws !== excludeWs && ws.readyState === 1) {
      ws.send(data);
    }
  });
}

function broadcastAll(room, msg) {
  broadcast(room, msg, null);
}

function getLeaderboard(room) {
  const lb = [];
  room.players.forEach((p) => {
    lb.push({ id: p.id, name: p.name, score: p.score, avatar: p.avatar });
  });
  return lb.sort((a, b) => b.score - a.score).slice(0, 10);
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    const { type, payload } = msg;

    if (type === 'JOIN') {
      const { name, avatar, roomId } = payload;
      const room = getOrCreateRoom(roomId || 'default');

      if (room.players.size >= MAX_PLAYERS) {
        ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'ห้องเต็มแล้ว (สูงสุด 30 คน)' } }));
        return;
      }

      const player = {
        id: uuidv4(),
        name: name || 'ผู้เล่น',
        avatar: avatar || 0,
        x: 200 + Math.random() * 100,
        y: 200 + Math.random() * 100,
        score: 0,
        level: 1,
        direction: 'down',
        moving: false,
        roomId: room.id
      };

      room.players.set(ws, player);
      players.set(ws, { player, room });

      // Send self info
      ws.send(JSON.stringify({
        type: 'INIT',
        payload: {
          selfId: player.id,
          players: Array.from(room.players.values()),
          leaderboard: getLeaderboard(room)
        }
      }));

      // Notify others
      broadcast(room, {
        type: 'PLAYER_JOINED',
        payload: player
      }, ws);

      console.log(`[JOIN] ${player.name} (${player.id}) in room ${room.id} | Total: ${room.players.size}`);
    }

    else if (type === 'MOVE') {
      const entry = players.get(ws);
      if (!entry) return;
      const { player, room } = entry;
      const { x, y, direction, moving } = payload;
      player.x = x;
      player.y = y;
      player.direction = direction;
      player.moving = moving;

      broadcast(room, {
        type: 'PLAYER_MOVED',
        payload: { id: player.id, x, y, direction, moving }
      }, ws);
    }

    else if (type === 'SCORE') {
      const entry = players.get(ws);
      if (!entry) return;
      const { player, room } = entry;
      const { delta } = payload;
      player.score = Math.max(0, player.score + (delta || 0));

      broadcastAll(room, {
        type: 'LEADERBOARD',
        payload: { leaderboard: getLeaderboard(room) }
      });

      ws.send(JSON.stringify({
        type: 'SCORE_UPDATE',
        payload: { score: player.score }
      }));
    }

    else if (type === 'CHAT') {
      const entry = players.get(ws);
      if (!entry) return;
      const { player, room } = entry;
      const text = String(payload.text || '').slice(0, 80);

      broadcastAll(room, {
        type: 'CHAT_MSG',
        payload: { id: player.id, name: player.name, text, avatar: player.avatar }
      });
    }

    else if (type === 'PING') {
      ws.send(JSON.stringify({ type: 'PONG', payload: { ts: Date.now() } }));
    }
  });

  ws.on('close', () => {
    const entry = players.get(ws);
    if (entry) {
      const { player, room } = entry;
      room.players.delete(ws);
      players.delete(ws);

      broadcast(room, {
        type: 'PLAYER_LEFT',
        payload: { id: player.id, name: player.name }
      });

      console.log(`[LEAVE] ${player.name} | Room ${room.id} players: ${room.players.size}`);

      if (room.players.size === 0) {
        rooms.delete(room.id);
        console.log(`[ROOM] Room ${room.id} removed (empty)`);
      }
    }
  });

  ws.on('error', (err) => console.error('WS Error:', err.message));
});

// Heartbeat
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) { ws.terminate(); return; }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const stats = { rooms: rooms.size, totalPlayers: players.size };
  rooms.forEach((room, id) => {
    stats[id] = room.players.size;
  });
  res.json(stats);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎮 CS Quest Server running on port ${PORT}`);
});
