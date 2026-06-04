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
const rooms = new Map();
const playerWs = new Map(); // ws -> {player, room}

function createRoom(roomId) {
  return {
    id: roomId,
    players: new Map(), // ws -> player
    state: 'lobby',     // lobby | playing | results
    wave: 1,
    createdAt: Date.now()
  };
}

function getRoom(roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, createRoom(roomId));
  return rooms.get(roomId);
}

function broadcast(room, msg, excludeWs = null) {
  const data = JSON.stringify(msg);
  room.players.forEach((_, ws) => {
    if (ws !== excludeWs && ws.readyState === 1) ws.send(data);
  });
}
function broadcastAll(room, msg) { broadcast(room, msg, null); }

function getLeaderboard(room) {
  return [...room.players.values()]
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ id: p.id, name: p.name, score: p.score, avatar: p.avatar, rank: i + 1 }));
}

function getRoomSnapshot(room) {
  return {
    players: [...room.players.values()],
    state: room.state,
    wave: room.wave,
    leaderboard: getLeaderboard(room)
  };
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (raw) => {
    let msg; try { msg = JSON.parse(raw); } catch { return; }
    const { type, payload } = msg;

    if (type === 'JOIN') {
      const { name, avatar, roomId } = payload;
      const room = getRoom(roomId || 'default');
      if (room.players.size >= MAX_PLAYERS) {
        ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'ห้องเต็ม (สูงสุด 30 คน)' } }));
        return;
      }
      const player = {
        id: uuidv4(), name: name || 'ผู้เล่น', avatar: avatar || 0,
        x: 400 + Math.random() * 100, y: 300 + Math.random() * 100,
        score: 0, wave: 1, direction: 'down', moving: false, roomId: room.id, ready: false
      };
      room.players.set(ws, player);
      playerWs.set(ws, { player, room });

      ws.send(JSON.stringify({ type: 'INIT', payload: { selfId: player.id, ...getRoomSnapshot(room) } }));
      broadcast(room, { type: 'PLAYER_JOINED', payload: player }, ws);
      broadcastAll(room, { type: 'LOBBY_UPDATE', payload: getRoomSnapshot(room) });
      console.log(`[JOIN] ${player.name} → room:${room.id} (${room.players.size})`);
    }

    else if (type === 'READY') {
      const e = playerWs.get(ws); if (!e) return;
      const { player, room } = e;
      player.ready = true;
      broadcastAll(room, { type: 'LOBBY_UPDATE', payload: getRoomSnapshot(room) });
      // Auto-start if all ready and ≥1 player
      const all = [...room.players.values()];
      if (all.length >= 1 && all.every(p => p.ready) && room.state === 'lobby') {
        room.state = 'playing'; room.wave = 1;
        broadcastAll(room, { type: 'GAME_START', payload: { wave: 1 } });
      }
    }

    else if (type === 'START_NOW') { // Host force-start
      const e = playerWs.get(ws); if (!e) return;
      const { room } = e;
      if (room.state !== 'lobby') return;
      room.state = 'playing'; room.wave = 1;
      broadcastAll(room, { type: 'GAME_START', payload: { wave: 1 } });
    }

    else if (type === 'MOVE') {
      const e = playerWs.get(ws); if (!e) return;
      const { player, room } = e;
      Object.assign(player, { x: payload.x, y: payload.y, direction: payload.direction, moving: payload.moving });
      broadcast(room, { type: 'PLAYER_MOVED', payload: { id: player.id, x: payload.x, y: payload.y, direction: payload.direction, moving: payload.moving } }, ws);
    }

    else if (type === 'SCORE') {
      const e = playerWs.get(ws); if (!e) return;
      const { player, room } = e;
      player.score = Math.max(0, player.score + (payload.delta || 0));
      player.wave = payload.wave || player.wave;
      ws.send(JSON.stringify({ type: 'SCORE_UPDATE', payload: { score: player.score } }));
      broadcastAll(room, { type: 'LEADERBOARD', payload: { leaderboard: getLeaderboard(room) } });
    }

    else if (type === 'WAVE_CLEAR') {
      const e = playerWs.get(ws); if (!e) return;
      const { player, room } = e;
      player.wave = (payload.wave || 1) + 1;
    }

    else if (type === 'GAME_END') {
      const e = playerWs.get(ws); if (!e) return;
      const { room } = e;
      room.state = 'results';
      broadcastAll(room, { type: 'SHOW_RESULTS', payload: { leaderboard: getLeaderboard(room) } });
    }

    else if (type === 'CHAT') {
      const e = playerWs.get(ws); if (!e) return;
      const { player, room } = e;
      const text = String(payload.text || '').slice(0, 80);
      broadcastAll(room, { type: 'CHAT_MSG', payload: { id: player.id, name: player.name, text, avatar: player.avatar } });
    }

    else if (type === 'PING') {
      ws.send(JSON.stringify({ type: 'PONG', payload: { ts: Date.now() } }));
    }
  });

  ws.on('close', () => {
    const e = playerWs.get(ws); if (!e) return;
    const { player, room } = e;
    room.players.delete(ws); playerWs.delete(ws);
    broadcast(room, { type: 'PLAYER_LEFT', payload: { id: player.id, name: player.name } });
    broadcastAll(room, { type: 'LOBBY_UPDATE', payload: getRoomSnapshot(room) });
    if (room.players.size === 0) { rooms.delete(room.id); console.log(`[ROOM] ${room.id} removed`); }
  });

  ws.on('error', (e) => console.error('WS:', e.message));
});

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) { ws.terminate(); return; }
    ws.isAlive = false; ws.ping();
  });
}, 30000);

app.get('/api/stats', (req, res) => {
  const s = { rooms: rooms.size, players: playerWs.size };
  res.json(s);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🎮 CS Quest on :${PORT}`));
