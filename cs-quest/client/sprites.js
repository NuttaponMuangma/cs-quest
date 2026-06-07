// ═══════════════════════════════════════════════════
//  CS Quest — Pixel Art Sprite Library
//  สไตล์ Pixel Agents: ตัวละครมีรายละเอียด ชุด ผม หน้าตา
// ═══════════════════════════════════════════════════

const SPR = {};
const _cache = new Map();

function _px(key, w, h, fn) {
  if (_cache.has(key)) return _cache.get(key);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;
  fn(x, w, h);
  if (_cache.size > 800) _cache.clear();
  _cache.set(key, c);
  return c;
}

// Shorthand fill rect
const _r = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
// 1-pixel dot
const _d = (c, x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };

// ═══════════════════════════════════════════════════
//  PLAYER CHARACTERS  (24×32 each)
//  6 types: student-boy, student-girl, boy-casual,
//           police-officer, wizard, elf-girl
// ═══════════════════════════════════════════════════

function _shadow(c, cx, cy, rx, ry) {
  c.fillStyle = 'rgba(0,0,0,0.22)';
  c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2); c.fill();
}

// ── avatar 0: Student Boy (เสื้อขาว กางเกงดำ) ──────
SPR.player0 = (dir, fr, moving) => _px(`p0_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // legs
  _r(c,  6, 24, 5, 10, '#1a1a2e'); _r(c, 13, 24, 5, 10, '#1a1a2e');
  if(wk){ _r(c, 6,24,5,10,'#252540'); _r(c,13,24,5,10,'#1a1a2e'); }
  // shoes
  _r(c, 5,32,6,3,'#333'); _r(c,13,32,6,3,'#333');
  // body / shirt
  _r(c, 6,13,12,13,'#f0f0f0'); // white shirt
  _r(c, 5,14,2,10,'#f0f0f0'); _r(c,17,14,2,10,'#f0f0f0'); // arms
  _r(c, 6,22,12,4,'#1a1a2e'); // pants top
  // collar
  _r(c, 10,13,4,3,'#1a1a2e'); _r(c,10,13,2,2,'#f0f0f0'); _r(c,12,13,2,2,'#f0f0f0');
  // head
  _r(c, 7,4,10,11,'#f5c5a3');
  // hair (dark)
  _r(c, 7,4,10,4,'#2d1a0a'); _r(c, 7,5,2,6,'#2d1a0a'); _r(c,15,5,2,5,'#2d1a0a');
  // ears
  _r(c, 6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  // eyes
  if(dir!=='up') { _r(c,9,9,2,2,'#1a1a2e'); _r(c,13,9,2,2,'#1a1a2e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  // smile
  if(dir!=='up') { _r(c,9,12,6,1,'#c47a60'); _r(c,9,12,1,1,'#1a1a2e'); _r(c,14,12,1,1,'#1a1a2e'); }
  // school bag
  _r(c,17,14,4,9,'#4a7fc1'); _r(c,18,15,2,7,'#5a8fd1'); _r(c,18,17,2,2,'#3a6fa1');
});

// ── avatar 1: Student Girl (เสื้อขาว กระโปรงแดง) ──
SPR.player1 = (dir, fr, moving) => _px(`p1_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // skirt
  _r(c, 5,22,14,8,'#e53935'); _r(c,4,24,16,6,'#ef5350');
  // legs
  _r(c, 7,28,4,7,'#f5c5a3'); _r(c,13,28,4,7,'#f5c5a3');
  if(wk){ _r(c,7,28,4,7,'#e8b48a'); _r(c,13,28,4,7,'#f5c5a3'); }
  // shoes
  _r(c, 6,33,5,3,'#1a1a2e'); _r(c,13,33,5,3,'#1a1a2e');
  // body
  _r(c, 6,13,12,11,'#f0f0f0'); _r(c,5,14,2,9,'#f0f0f0'); _r(c,17,14,2,9,'#f0f0f0');
  // collar / necktie
  _r(c,10,13,4,3,'#e53935'); _r(c,11,14,2,5,'#e53935'); _r(c,11,18,2,3,'#c62828');
  // head
  _r(c, 7,4,10,11,'#f5c5a3');
  // hair long (twin tails)
  _r(c, 7,4,10,5,'#1a0a0a'); _r(c,6,6,2,8,'#1a0a0a'); _r(c,16,6,2,8,'#1a0a0a');
  _r(c,4,10,3,6,'#2d0d0d'); _r(c,17,10,3,6,'#2d0d0d'); // pigtails
  // ribbon
  _r(c,12,4,5,3,'#e53935'); _r(c,12,4,2,2,'#ff6b6b'); _r(c,15,4,2,2,'#ff6b6b');
  _r(c,6,4,5,3,'#e53935'); _r(c,6,4,2,2,'#ff6b6b'); _r(c,9,4,2,2,'#ff6b6b');
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up') { _r(c,9,9,2,2,'#1a1a2e'); _r(c,13,9,2,2,'#1a1a2e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up') { _r(c,9,12,6,1,'#e8735a'); _r(c,10,11,4,1,'#e8735a'); }
  // bag
  _r(c,0,15,4,8,'#e91e63'); _r(c,1,16,2,6,'#f06292'); _r(c,1,18,2,2,'#c2185b');
});

// ── avatar 2: Casual Boy (เสื้อ hoodie ส้ม) ─────────
SPR.player2 = (dir, fr, moving) => _px(`p2_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  _r(c, 6,24,5,10,'#3e3e5e'); _r(c,13,24,5,10,'#3e3e5e');
  if(wk){ _r(c,6,24,5,10,'#4e4e6e'); _r(c,13,24,5,10,'#3e3e5e'); }
  _r(c,5,32,6,3,'#2a2a40'); _r(c,13,32,6,3,'#2a2a40');
  _r(c,5,13,14,13,'#ff6f00'); _r(c,4,14,2,10,'#ff6f00'); _r(c,18,14,2,10,'#ff6f00');
  _r(c,8,23,8,4,'#e65100');  // pocket
  _r(c,6,13,12,4,'#e65100'); // hood edge
  _r(c,8,13,8,3,'#ff6f00');
  _r(c,7,4,10,11,'#f5c5a3');
  _r(c,7,4,10,5,'#4a2c0a'); _r(c,6,5,2,4,'#3a1a00');
  // cap
  _r(c,6,3,12,3,'#1565c0'); _r(c,5,3,14,2,'#1976d2'); _r(c,4,5,3,2,'#1565c0');
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up') { _r(c,9,9,2,2,'#1a1a2e'); _r(c,13,9,2,2,'#1a1a2e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up') { _r(c,10,12,4,1,'#c47a60'); }
});

// ── avatar 3: Police Officer (ตำรวจ) ────────────────
SPR.player3 = (dir, fr, moving) => _px(`p3_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  _r(c,6,24,5,10,'#1a237e'); _r(c,13,24,5,10,'#1a237e');
  if(wk){ _r(c,6,24,5,10,'#283593'); _r(c,13,24,5,10,'#1a237e'); }
  _r(c,5,32,6,3,'#111'); _r(c,13,32,6,3,'#111');
  // uniform
  _r(c,5,13,14,13,'#1a237e'); _r(c,4,14,2,10,'#1a237e'); _r(c,18,14,2,10,'#1a237e');
  // belt + badge area
  _r(c,6,21,12,3,'#111'); _r(c,10,21,4,3,'#ffd700');
  // badge
  _r(c,9,15,2,3,'#ffd700'); _r(c,10,14,2,5,'#ffd700'); _r(c,8,16,6,1,'#ffd700');
  // tie
  _r(c,11,13,2,8,'#111');
  _r(c,7,4,10,11,'#f5c5a3');
  // police hat
  _r(c,6,4,12,4,'#1a237e'); _r(c,5,7,14,2,'#283593'); _r(c,4,8,16,2,'#1a237e');
  _r(c,9,3,6,3,'#1a237e');
  // hat badge
  _r(c,10,5,4,2,'#ffd700'); _r(c,11,4,2,3,'#ffd700');
  // mustache
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up') { _r(c,9,9,2,2,'#1a237e'); _r(c,13,9,2,2,'#1a237e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up') { _r(c,8,12,8,2,'#4a2010'); _r(c,8,12,8,1,'#5a2a10'); } // mustache
  // gun holster
  _r(c,18,19,3,6,'#111'); _r(c,19,20,2,4,'#333');
});

// ── avatar 4: Wizard (นักวิชาการ/แมวมอง) ───────────
SPR.player4 = (dir, fr, moving) => _px(`p4_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  _r(c,6,24,5,10,'#4a148c'); _r(c,13,24,5,10,'#4a148c');
  if(wk){ _r(c,6,24,5,10,'#6a1aac'); _r(c,13,24,5,10,'#4a148c'); }
  _r(c,5,33,7,3,'#2a0060'); _r(c,12,33,7,3,'#2a0060');
  // robe
  _r(c,4,13,16,13,'#6a1b9a'); _r(c,3,14,2,10,'#6a1b9a'); _r(c,19,14,2,10,'#6a1b9a');
  _r(c,4,20,16,6,'#7b1fa2'); // robe bottom flare
  // robe detail
  _r(c,11,13,2,12,'#4a148c');
  _r(c,7,15,2,6,'#9c27b0'); _r(c,15,15,2,6,'#9c27b0'); // stars on robe
  _r(c,8,19,2,2,'#ffd700'); _r(c,14,19,2,2,'#ffd700'); _r(c,11,17,2,2,'#ffd700');
  // wand
  _r(c,20,12,2,14,'#5d3a1a'); _r(c,19,11,4,3,'#ffd700'); _r(c,20,10,2,2,'#fff');
  _r(c,7,4,10,11,'#f5c5a3');
  // wizard hat tall
  _r(c,9,0,6,5,'#4a148c'); _r(c,8,4,8,2,'#6a1b9a'); _r(c,6,5,12,3,'#6a1b9a');
  _r(c,10,1,4,3,'#7b1fa2'); _r(c,11,0,2,2,'#ffd700');
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up') { _r(c,9,9,2,2,'#4a148c'); _r(c,13,9,2,2,'#4a148c'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up') { _r(c,9,12,2,1,'#c47a60'); _r(c,13,12,2,1,'#c47a60'); }
  // beard
  if(dir!=='up') { _r(c,9,11,6,2,'#e0e0e0'); _r(c,8,13,8,3,'#e0e0e0'); _r(c,10,15,4,2,'#bdbdbd'); }
});

// ── avatar 5: Smart Girl with glasses (เด็กหญิงแว่น) ──
SPR.player5 = (dir, fr, moving) => _px(`p5_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // skirt (blue)
  _r(c,5,22,14,8,'#1565c0'); _r(c,4,24,16,6,'#1976d2');
  _r(c,7,28,4,7,'#f5c5a3'); _r(c,13,28,4,7,'#f5c5a3');
  if(wk){ _r(c,7,28,4,7,'#e8b48a'); _r(c,13,28,4,7,'#f5c5a3'); }
  _r(c,6,33,5,3,'#1a1a2e'); _r(c,13,33,5,3,'#1a1a2e');
  _r(c,6,13,12,11,'#e8f5e9'); _r(c,5,14,2,9,'#e8f5e9'); _r(c,17,14,2,9,'#e8f5e9');
  // vest
  _r(c,7,14,10,9,'#2e7d32'); _r(c,11,13,2,10,'#1b5e20');
  _r(c,7,4,10,11,'#f5c5a3');
  // brown hair bob cut
  _r(c,7,4,10,5,'#5d2e0c'); _r(c,6,6,2,6,'#6d3e1c'); _r(c,16,6,2,6,'#6d3e1c');
  _r(c,7,9,2,4,'#7a4a22'); _r(c,15,9,2,4,'#7a4a22');
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up') { _r(c,9,9,2,2,'#1a1a2e'); _r(c,13,9,2,2,'#1a1a2e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  // glasses!
  if(dir!=='up') {
    _r(c,8,9,4,4,'rgba(100,200,255,0.25)'); _r(c,12,9,4,4,'rgba(100,200,255,0.25)');
    _r(c,8,9,4,1,'#333'); _r(c,8,12,4,1,'#333'); _r(c,8,9,1,4,'#333'); _r(c,11,9,1,4,'#333');
    _r(c,12,9,4,1,'#333'); _r(c,12,12,4,1,'#333'); _r(c,15,9,1,4,'#333');
    _r(c,11,10,2,2,'#555'); // bridge
    _r(c,6,10,2,1,'#333'); _r(c,16,10,2,1,'#333'); // temples
  }
  if(dir!=='up') { _r(c,9,12,6,1,'#e8735a'); }
  // book
  _r(c,0,14,4,9,'#f44336'); _r(c,1,15,3,7,'#ff5252'); _r(c,1,17,3,1,'#fff'); _r(c,1,19,3,1,'#fff');
});

// ═══════════════════════════════════════════════════
//  NPC CHARACTERS  (24×32) — ธีมตามด่าน
// ═══════════════════════════════════════════════════

// NPC 0: Teacher (ครู — ด่าน 1 การแก้ปัญหา)
SPR.npc0 = (fr) => _px(`npc0_${fr>>5&1}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const b = (fr>>5)&1;
  _r(c,6,24,5,10+b,'#1a237e'); _r(c,13,24,5,10+b,'#1a237e');
  _r(c,5,32,7,4,'#0d1257'); _r(c,12,32,7,4,'#0d1257');
  _r(c,5,13,14,13,'#3949ab'); _r(c,4,14,2,10,'#3949ab'); _r(c,18,14,2,10,'#3949ab');
  _r(c,11,13,2,12,'#1a237e'); // shirt line
  // tie
  _r(c,10,13,4,2,'#fff'); _r(c,11,15,2,8,'#e53935');
  // pocket square
  _r(c,15,14,3,3,'#fff'); _r(c,15,14,3,1,'#e53935');
  // book/clipboard
  _r(c,19,13,4,11,'#ff9800'); _r(c,20,14,3,9,'#ffa726'); _r(c,20,15,3,1,'#fff'); _r(c,20,17,3,1,'#fff'); _r(c,20,19,3,1,'#fff');
  _r(c,7,4,10,11,'#f0c090');
  _r(c,7,4,10,4,'#3e2000'); _r(c,6,5,2,5,'#2e1000');_r(c,16,5,2,5,'#2e1000');
  // glasses
  _r(c,8,9,4,4,'rgba(150,220,255,0.2)'); _r(c,12,9,4,4,'rgba(150,220,255,0.2)');
  _r(c,8,9,4,1,'#1a1a2e'); _r(c,8,12,4,1,'#1a1a2e'); _r(c,8,9,1,4,'#1a1a2e'); _r(c,11,9,1,4,'#1a1a2e');
  _r(c,12,9,4,1,'#1a1a2e'); _r(c,12,12,4,1,'#1a1a2e'); _r(c,15,9,1,4,'#1a1a2e');
  _r(c,11,10,2,1,'#333');
  _r(c,6,10,2,1,'#333'); _r(c,16,10,2,1,'#333');
  _r(c,6,8,2,3,'#d4a070'); _r(c,16,8,2,3,'#d4a070');
  _r(c,9,12,6,1,'#a06040'); _r(c,9,13,2,1,'#804030'); _r(c,13,13,2,1,'#804030');
});

// NPC 1: Programmer (โปรแกรมเมอร์ — ด่าน 2)
SPR.npc1 = (fr) => _px(`npc1_${fr>>5&1}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const b = (fr>>5)&1;
  _r(c,6,24,5,10+b,'#212121'); _r(c,13,24,5,10+b,'#212121');
  _r(c,5,32,7,3,'#111'); _r(c,12,32,7,3,'#111');
  // hoodie dark
  _r(c,5,13,14,13,'#263238'); _r(c,4,14,2,10,'#263238'); _r(c,18,14,2,10,'#263238');
  _r(c,6,13,12,4,'#1c2427'); // hood rim
  // laptop sticker on chest
  _r(c,8,16,8,5,'#37474f'); _r(c,9,17,6,3,'#546e7a'); _r(c,10,17,1,1,'#4caf50'); _r(c,12,17,2,1,'#4caf50');
  // headphones
  _r(c,6,5,2,5,'#37474f'); _r(c,16,5,2,5,'#37474f');
  _r(c,6,5,2,3,'#455a64'); _r(c,16,5,2,3,'#455a64');
  _r(c,7,4,10,11,'#f5c5a3');
  _r(c,7,4,10,5,'#1a1a1a'); _r(c,6,5,2,3,'#111'); _r(c,16,5,2,3,'#111');
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  _r(c,9,9,2,2,'#263238'); _r(c,13,9,2,2,'#263238');
  _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8');
  _r(c,9,12,6,1,'#c47a60');
  // coffee cup
  _r(c,19,20,4,6,'#fff'); _r(c,20,21,3,4,'#5d4037'); _r(c,19,25,4,1,'#bdbdbd'); _r(c,22,22,2,2,'#fff');
});

// NPC 2: Data Analyst (นักวิเคราะห์ข้อมูล — ด่าน 3)
SPR.npc2 = (fr) => _px(`npc2_${fr>>5&1}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const b = (fr>>5)&1;
  _r(c,6,24,5,10+b,'#37474f'); _r(c,13,24,5,10+b,'#37474f');
  _r(c,5,32,7,3,'#263238'); _r(c,12,32,7,3,'#263238');
  _r(c,5,13,14,13,'#e65100'); _r(c,4,14,2,10,'#e65100'); _r(c,18,14,2,10,'#e65100');
  _r(c,11,13,2,12,'#bf360c');
  // name badge
  _r(c,8,16,8,5,'#fff'); _r(c,9,17,6,3,'#e3f2fd'); _r(c,9,17,6,1,'#1976d2'); _r(c,9,19,6,1,'#666'); _r(c,9,20,3,1,'#999');
  _r(c,7,4,10,11,'#f0d0a0');
  _r(c,7,4,10,5,'#1a0a0a');
  _r(c,6,8,2,3,'#d4aa80'); _r(c,16,8,2,3,'#d4aa80');
  _r(c,9,9,2,2,'#1a1a2e'); _r(c,13,9,2,2,'#1a1a2e');
  _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8');
  _r(c,9,12,6,1,'#c47a60');
  // tablet
  _r(c,19,12,4,12,'#37474f'); _r(c,20,13,3,10,'#1565c0'); _r(c,20,14,3,2,'#1976d2'); _r(c,20,17,3,1,'#90caf9'); _r(c,20,19,2,1,'#4fc3f7');
});

// NPC 3: Cyber Security (ผู้พิทักษ์ไซเบอร์ — ด่าน 4)
SPR.npc3 = (fr) => _px(`npc3_${fr>>5&1}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const b = (fr>>5)&1;
  _r(c,6,24,5,10+b,'#1b5e20'); _r(c,13,24,5,10+b,'#1b5e20');
  _r(c,5,32,7,3,'#0a3d12'); _r(c,12,32,7,3,'#0a3d12');
  // tactical vest
  _r(c,5,13,14,13,'#2e7d32'); _r(c,4,14,2,10,'#2e7d32'); _r(c,18,14,2,10,'#2e7d32');
  _r(c,7,14,10,11,'#1b5e20'); // vest body
  _r(c,8,14,8,3,'#388e3c'); // chest rig
  _r(c,8,18,3,3,'#4caf50'); _r(c,13,18,3,3,'#4caf50'); // pockets
  _r(c,10,14,4,2,'#ffd700'); // patch
  // shield badge
  _r(c,10,16,4,4,'#ffd700'); _r(c,11,17,2,3,'#1b5e20');
  _r(c,7,4,10,11,'#f5c5a3');
  // tactical helmet / balaclava
  _r(c,6,4,12,5,'#2e7d32'); _r(c,7,4,10,7,'#388e3c');
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  _r(c,9,9,2,2,'#1b5e20'); _r(c,13,9,2,2,'#1b5e20');
  _d(c,9,9,'rgba(0,255,0,0.5)'); _d(c,13,9,'rgba(0,255,0,0.5)'); // glowing eyes
  _r(c,9,12,6,1,'#888'); // mouth mask
  _r(c,8,11,8,3,'#2e7d32'); // mask
});

// ═══════════════════════════════════════════════════
//  ENVIRONMENT DECORATIONS
// ═══════════════════════════════════════════════════

SPR.tree = (v) => _px(`tree${v}`, 48, 56, (c) => {
  const cols=[['#1a3a0d','#2e6b1a','#4a9627','#7ec850'],['#173012','#266020','#3d8622','#66aa38'],['#223808','#365814','#548a20','#7ab840']];
  const [d,m,l,hi] = cols[v%3];
  _r(c,20,38,8,18,'#5d3a1a'); _r(c,21,39,4,16,'#7a4e24'); _r(c,22,40,2,14,'#8d6030');
  c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(24,55,14,4,0,0,Math.PI*2); c.fill();
  [[4,26,40,24,d],[2,20,44,26,m],[5,15,38,20,m],[8,10,32,14,l],[10,6,28,10,l],[12,3,24,7,hi],[14,1,20,5,hi]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  [[2,28,6,10,d],[40,28,6,10,d],[3,22,4,10,m],[41,22,4,10,m]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  [[14,10],[20,5],[28,10],[10,18],[34,18],[18,3]].forEach(([x,y])=>{ c.fillStyle='rgba(255,255,255,.25)'; c.fillRect(x,y,3,3); });
});

SPR.bush = (v) => _px(`bush${v}`, 36, 28, (c) => {
  const cols=[['#1a5a0d','#2d8020','#44a030'],['#1a4a2a','#2a6a3a','#3a8a4a'],['#3a5a0a','#5a7a1a','#7a9a28']];
  const [d,m,l] = cols[v%3];
  c.fillStyle='rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(18,26,15,4,0,0,Math.PI*2); c.fill();
  [[2,10,12,16,d],[22,10,12,16,d],[7,8,22,18,m],[5,7,26,16,m],[9,5,18,12,l],[11,3,14,9,l]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  c.fillStyle='rgba(255,255,255,.22)'; c.fillRect(13,5,5,5);
  c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(6,10,4,4); c.fillRect(24,10,4,4);
});

SPR.flower = (v) => _px(`flower${v}`, 24, 32, (c) => {
  const pc=[['#ff6b9d','#e91e63','#ffb3cc'],['#ffee44','#ffc107','#fff9c4'],['#ce93d8','#9c27b0','#f3e5f5'],['#4dd0e1','#0097a7','#e0f7fa']];
  const [p1,p2,hi] = pc[v%4];
  _r(c,11,21,2,11,'#388e3c'); _r(c,5,25,8,3,'#4caf50'); _r(c,13,23,8,3,'#4caf50');
  _d(c,10,24,'#81c784'); _d(c,14,26,'#81c784');
  [[5,11,6,6],[13,11,6,6],[6,17,6,6],[12,17,6,6],[8,9,8,4],[8,19,8,4]].forEach(([x,y,w,h])=>_r(c,x,y,w,h,p1));
  _r(c,7,10,10,10,p1); _r(c,8,12,8,8,p2);
  _r(c,10,13,4,4,hi); _r(c,11,13,2,2,'#fff');
});

SPR.rock = (v) => _px(`rock${v}`, 32, 24, (c) => {
  const cols=[['#455a64','#607d8b','#90a4ae','#b0bec5'],['#4e342e','#6d4c41','#8d6e63','#a1887f'],['#37474f','#546e7a','#78909c','#90a4ae']];
  const [d,m,l,hi] = cols[v%3];
  c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(16,23,13,3.5,0,0,Math.PI*2); c.fill();
  [[2,12,28,11,d],[4,9,24,12,m],[5,8,22,10,m],[7,5,18,8,l],[9,4,14,6,hi]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(9,7,6,4); c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(16,9,4,3);
});

SPR.chest = (open, fr) => _px(`chest${open?1:0}_${fr%8}`, 32, 30, (c) => {
  c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(16,28,12,3,0,0,Math.PI*2); c.fill();
  _r(c,3,16,26,12,'#5d3a1a'); _r(c,4,17,24,10,'#7a4e24'); _r(c,5,18,22,8,'#8d5e30');
  if(open){
    _r(c,3,8,26,10,'#7a4e24'); _r(c,4,9,24,8,'#9a6a34'); _r(c,5,10,22,6,'#8d5e30');
    const t = fr%10<5;
    if(t){[[7,5],[12,3],[18,6],[10,2],[15,1]].forEach(([x,y])=>{ c.fillStyle='#ffd700'; c.fillRect(x,y,3,3); c.fillStyle='#fff8'; c.fillRect(x,y,1,1); }); }
    _r(c,8,10,16,6,'rgba(255,215,0,0.15)'); // glow inside
  }else{
    _r(c,3,9,26,9,'#7a4e24'); _r(c,4,10,24,7,'#9a6a34'); _r(c,5,11,22,5,'#8d5e30');
  }
  // lock
  c.fillStyle='#ffd700'; c.beginPath(); c.arc(16,22,3.5,0,Math.PI*2); c.fill();
  c.strokeStyle='#ffd700'; c.lineWidth=2.5; c.beginPath(); c.arc(16,19.5,3,Math.PI,0); c.stroke();
  c.fillStyle='#e6a800'; c.fillRect(14,21,4,1);
  // nails
  [[4,17],[28,17],[4,26],[28,26]].forEach(([x,y])=>{ c.fillStyle='#ffd700'; c.beginPath(); c.arc(x,y,2,0,Math.PI*2); c.fill(); });
  // wood grain
  _r(c,4,20,24,1,'rgba(0,0,0,.12)'); _r(c,4,24,24,1,'rgba(0,0,0,.12)');
});

SPR.star = (fr) => _px(`star_${fr%12}`, 20, 28, (c) => {
  const b = Math.sin(fr*0.25)*3|0;
  c.fillStyle='rgba(0,0,0,.15)'; c.beginPath(); c.ellipse(10,27,6,2,0,0,Math.PI*2); c.fill();
  c.save(); c.translate(10, 12+b);
  // outer glow
  c.fillStyle='rgba(255,200,0,0.2)'; c.beginPath(); for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?4:13;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);} c.closePath(); c.fill();
  c.beginPath(); for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?3:10;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);} c.closePath();
  c.fillStyle='#ffd700'; c.fill(); c.strokeStyle='#ff9800'; c.lineWidth=1; c.stroke();
  c.fillStyle='rgba(255,255,255,.55)'; c.fillRect(-3,-4,4,4); c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(1,-2,2,2);
  c.restore();
});

SPR.fence = () => _px('fence', 32, 22, (c) => {
  _r(c,0,10,32,5,'#8d6e3a'); _r(c,0,11,32,2,'#a0825a'); _r(c,0,15,32,2,'#a0825a');
  [0,12,24].forEach(x=>{ _r(c,x,5,4,16,'#8d6e3a'); _r(c,x+1,6,2,4,'#a0825a'); _r(c,x,4,4,3,'#6d4e2a'); });
});

// ── Theme-specific decos ──
SPR.schoolBuilding = () => _px('school', 56, 56, (c) => {
  _r(c,2,18,52,36,'#c8966a'); _r(c,4,20,48,32,'#d4a870');
  _r(c,0,12,56,8,'#a07840'); _r(c,2,10,52,6,'#b08848'); _r(c,4,8,48,4,'#c09858');
  [[6,22],[20,22],[34,22],[6,38],[20,38],[34,38]].forEach(([x,y])=>{ _r(c,x,y,12,10,'#87ceeb'); _r(c,x,y,12,1,'#90d8f0'); _r(c,x+5,y,1,10,'rgba(0,0,0,.2)'); _r(c,x,y+4,12,1,'rgba(0,0,0,.2)'); _r(c,x,y,1,10,'rgba(255,255,255,.2)'); });
  _r(c,22,38,12,18,'#7a5020'); _r(c,23,39,10,17,'#5a3010'); _r(c,26,42,4,4,'#ffd700');
  _r(c,24,0,8,14,'#aaa'); _r(c,25,1,6,12,'#999'); _r(c,26,14,4,6,'#e53935'); _r(c,26,16,4,3,'#fff'); _r(c,26,19,4,3,'#1565c0');
  _r(c,24,12,8,2,'#888');
  _r(c,2,18,52,4,'rgba(255,255,255,.15)');
});

SPR.goalpost = () => _px('goal', 40, 48, (c) => {
  _r(c,17,6,6,42,'#e0e0e0'); _r(c,18,7,4,40,'#bdbdbd');
  _r(c,2,6,36,6,'#e0e0e0'); _r(c,3,7,34,4,'#bdbdbd');
  _r(c,2,6,6,36,'#e0e0e0'); _r(c,3,7,4,34,'#bdbdbd');
  _r(c,32,6,6,36,'#e0e0e0'); _r(c,33,7,4,34,'#bdbdbd');
  // net lines
  for(let y=8;y<40;y+=4){ c.strokeStyle='rgba(255,255,255,0.3)'; c.lineWidth=1; c.beginPath(); c.moveTo(3,y); c.lineTo(37,y); c.stroke(); }
  for(let x=3;x<37;x+=4){ c.strokeStyle='rgba(255,255,255,0.3)'; c.lineWidth=1; c.beginPath(); c.moveTo(x,7); c.lineTo(x,42); c.stroke(); }
  c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(20,48,14,4,0,0,Math.PI*2); c.fill();
});

SPR.house = (v) => _px(`house${v}`, 48, 52, (c) => {
  const wc=['#ef5350','#42a5f5','#66bb6a','#ffa726','#ab47bc'][v%5];
  _r(c,4,24,40,28,wc+'cc'); _r(c,5,25,38,26,wc);
  // roof
  c.fillStyle='#5d3a1a'; c.beginPath(); c.moveTo(0,26); c.lineTo(24,4); c.lineTo(48,26); c.closePath(); c.fill();
  c.fillStyle='#7a4e24'; c.beginPath(); c.moveTo(2,26); c.lineTo(24,6); c.lineTo(46,26); c.closePath(); c.fill();
  // windows with curtains
  [[6,28],[30,28]].forEach(([x,y])=>{ _r(c,x,y,12,12,'#87ceeb'); _r(c,x,y,6,12,'rgba(255,150,150,0.3)'); _r(c,x,y,12,1,'rgba(255,255,255,.4)'); _r(c,x+5,y,1,12,'rgba(0,0,0,.2)'); _r(c,x,y+5,12,1,'rgba(0,0,0,.2)'); });
  _r(c,20,36,8,16,'#7a5020'); _r(c,21,37,6,15,'#5a3010'); _r(c,22,40,2,3,'#ffd700'); // door+knob
  _r(c,22,28,4,4,'#e0e0e0'); // chimney top
  _r(c,22,16,4,14,'#9e9e9e'); _r(c,23,17,2,12,'#bdbdbd'); // chimney
  if(v%2===0){ _r(c,2,24,44,4,'rgba(255,255,255,.15)'); } // highlight
});

SPR.lamp = () => _px('lamp', 12, 40, (c) => {
  _r(c,5,28,2,12,'#78909c'); _r(c,4,36,4,4,'#607d8b');
  _r(c,3,24,6,6,'#78909c'); _r(c,2,20,8,6,'#90a4ae');
  c.fillStyle='rgba(255,255,150,0.9)'; c.beginPath(); c.arc(6,22,5,0,Math.PI*2); c.fill();
  c.fillStyle='rgba(255,255,100,0.4)'; c.beginPath(); c.arc(6,22,8,0,Math.PI*2); c.fill();
  c.fillStyle='rgba(255,255,0,0.15)'; c.beginPath(); c.arc(6,22,12,0,Math.PI*2); c.fill();
  _r(c,5,18,2,5,'#ffd700');
});

SPR.bench = () => _px('bench', 40, 20, (c) => {
  _r(c,0,6,40,5,'#8d6e3a'); _r(c,0,7,40,3,'#a0825a');
  _r(c,2,10,4,10,'#6d4e2a'); _r(c,16,10,4,10,'#6d4e2a'); _r(c,34,10,4,10,'#6d4e2a');
  _r(c,2,4,4,4,'#6d4e2a'); _r(c,34,4,4,4,'#6d4e2a');
  _r(c,0,2,40,4,'#7a5a30'); _r(c,1,3,38,2,'#9a7a50');
});

SPR.computer = () => _px('computer', 32, 32, (c) => {
  _r(c,4,2,24,20,'#263238'); _r(c,5,3,22,18,'#37474f');
  // screen content
  _r(c,6,4,20,16,'#1a237e'); _r(c,7,5,18,14,'#0d1257');
  // code lines
  [[7,6,'#4caf50',8],[7,8,'#fff',12],[7,10,'#ff9800',6],[7,12,'#fff',10],[7,14,'#4caf50',8],[7,16,'#fff',5]].forEach(([x,y,col,w])=>_r(c,x,y,w,1,col));
  _r(c,12,22,8,2,'#455a64'); _r(c,8,24,16,2,'#37474f'); _r(c,6,26,20,4,'#263238');
  _r(c,2,28,28,1,'#455a64');
  // keyboard
  for(let i=0;i<5;i++) for(let j=0;j<8;j++) _r(c,2+j*4,29+i,3,1,'rgba(255,255,255,0.1)');
});

SPR.billboard = (v) => _px(`bill${v}`, 48, 44, (c) => {
  _r(c,22,28,4,16,'#78909c'); _r(c,23,29,2,14,'#90a4ae');
  _r(c,2,2,44,28,'#263238'); _r(c,3,3,42,26,'#37474f'); _r(c,0,0,48,4,'#1c313a');
  const msgs=[['#4caf50','#fff'],['#1976d2','#ffeb3b'],['#e53935','#fff'],['#7b1fa2','#fff']];
  const [bg,fg] = msgs[v%4];
  _r(c,4,4,40,24,bg+'33');
  _r(c,8,8,32,4,fg+'aa'); _r(c,8,14,24,2,fg+'88'); _r(c,8,18,28,2,fg+'88'); _r(c,8,22,20,2,fg+'66');
  _r(c,6,6,4,4,fg); // icon
});

// ═══════════════════════════════════════════════════
//  TILE BACKGROUNDS
// ═══════════════════════════════════════════════════

SPR.groundTile = (theme, tx, ty) => {
  const k = `gnd_${theme}_${(tx+ty*3)%6}`;
  return _px(k, 32, 32, (c) => {
    const themes = {
      school: { base:['#7cb34a','#7ab048','#78ae46','#80b84e'], detail:'rgba(255,255,255,.04)' },
      forest: { base:['#2e6b1a','#2c6818','#306020','#2a5818'], detail:'rgba(0,0,0,.06)' },
      town:   { base:['#5a8a3a','#588838','#5c8c3c','#60903e'], detail:'rgba(255,255,255,.04)' },
      stadium:{ base:['#4a9a2a','#489828','#4c9c2c','#50a030'], detail:'rgba(255,255,255,.03)' },
    };
    const th = themes[theme]||themes.forest;
    c.fillStyle = th.base[(tx*3+ty*7)%4]; c.fillRect(0,0,32,32);
    if((tx*5+ty*3)%9===0){ c.fillStyle=th.detail; c.fillRect(4,6,1,7); c.fillRect(10,4,1,9); c.fillRect(18,7,1,6); c.fillRect(25,5,1,8); }
    if((tx*7+ty)%11===0){ c.fillStyle='rgba(255,255,255,.06)'; c.fillRect(3,3,6,6); }
  });
};

SPR.pathTile = (theme, tx, ty) => {
  const k = `path_${theme}_${(tx+ty)%4}`;
  return _px(k, 32, 32, (c) => {
    const cols = {
      school: ['#c8b89a','#c4b496','#ccbc9e','#d0c0a2'],
      forest: ['#8a6a3a','#866638','#8e6e3c','#927240'],
      town:   ['#d4c07a','#d0bc76','#d8c47e','#dcc882'],
      stadium:['#e8d84a','#e4d446','#eadc4e','#eee052'],
    };
    const c2 = (cols[theme]||cols.forest)[(tx+ty)%4];
    c.fillStyle = c2; c.fillRect(0,0,32,32);
    // subtle tile texture
    c.fillStyle='rgba(0,0,0,.06)'; c.fillRect(0,0,32,1); c.fillRect(0,0,1,32);
    c.fillStyle='rgba(255,255,255,.08)'; c.fillRect(1,1,31,1); c.fillRect(1,1,1,31);
    if((tx*7+ty*3)%8===0){ c.fillStyle='rgba(0,0,0,.06)'; c.fillRect(4,12,24,2); }
    if((tx*5+ty*7)%6===0){ c.fillStyle='rgba(255,255,255,.05)'; c.fillRect(8,20,16,2); }
  });
};

SPR.waterTile = (fr, tx, ty) => _px(`water_${fr%16}`, 32, 32, (c) => {
  const w = Math.floor(fr/4)%32;
  c.fillStyle = ['#1565c0','#1976d2','#0d47a1'][(tx+ty)%3]; c.fillRect(0,0,32,32);
  c.fillStyle='rgba(255,255,255,.1)'; c.fillRect((tx*7+w)%32,4,4,2); c.fillRect((tx*5+w+16)%32,18,6,2);
  c.fillStyle='rgba(255,255,255,.06)'; c.fillRect(0,10,32,1); c.fillRect(0,24,32,1);
});

SPR.wallTile = (theme, tx, ty) => {
  const k = `wall_${theme}_${(tx+ty*2)%4}`;
  return _px(k, 32, 32, (c) => {
    const cols = { school:['#8b6f47','#a08050','#704020'], forest:['#2d5a1b','#1a4a0a','#366622'], town:['#8a6a4a','#a07858','#6a4a2a'], stadium:['#607080','#708090','#506070'] };
    const [d,m,top] = (cols[theme]||cols.town);
    c.fillStyle = d; c.fillRect(0,0,32,32);
    // brick pattern
    const odd = (ty)%2===0;
    for(let row=0;row<4;row++){
      for(let col=0;col<4;col++){
        const bx = (col*8)+(odd&&row%2===0?-4:0); const by = row*8;
        c.fillStyle=m; c.fillRect(bx+1,by+1,7,7);
        c.fillStyle='rgba(255,255,255,.1)'; c.fillRect(bx+1,by+1,7,1);
        c.fillStyle='rgba(0,0,0,.15)'; c.fillRect(bx+1,by+7,7,1);
      }
    }
    c.fillStyle=top; c.fillRect(0,0,32,3);
  });
};

// ═══════════════════════════════════════════════════
//  RENDER HELPERS
// ═══════════════════════════════════════════════════

SPR.getPlayer = (av, dir, fr, moving) => {
  const fn = SPR[`player${av}`] || SPR.player0;
  return fn(dir, fr, moving);
};

SPR.getNPC = (lv, fr) => {
  const fn = SPR[`npc${(lv-1)%4}`];
  return fn ? fn(fr) : SPR.npc0(fr);
};

SPR.clearCache = () => { _cache.clear(); };
