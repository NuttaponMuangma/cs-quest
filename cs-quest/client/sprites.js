// ═══════════════════════════════════════════════════
//  CS Quest — Pixel Art Sprite Library
//  สไตล์ AI Agent Office: เหมือน Pixel Agents รูปที่แนบ
//  ตัวละครสวมชุดทำงาน/นักเรียน, ฉากออฟฟิศ-ห้องเรียน
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

const _r = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
const _d = (c, x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };

// ═══════════════════════════════════════════════════
//  SHADOW HELPER
// ═══════════════════════════════════════════════════
function _shadow(c, cx, cy, rx, ry) {
  c.fillStyle = 'rgba(0,0,0,0.25)';
  c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2); c.fill();
}

// ═══════════════════════════════════════════════════
//  PLAYER CHARACTERS (24×36) — AI Agent Office Style
// ═══════════════════════════════════════════════════

// ── avatar 0: Office Worker Boy (สูทดำ เน็คไท) ──
SPR.player0 = (dir, fr, moving) => _px(`p0_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // legs - dark trousers
  _r(c, 6,24,5,10,'#1c1c2e'); _r(c,13,24,5,10,'#1c1c2e');
  if(wk){ _r(c,6,24,5,10,'#2a2a40'); _r(c,13,24,5,10,'#1c1c2e'); }
  // shoes - shiny black
  _r(c,5,32,6,3,'#111'); _r(c,12,32,7,3,'#111');
  _r(c,5,32,3,1,'rgba(255,255,255,.2)'); _r(c,12,32,3,1,'rgba(255,255,255,.2)');
  // suit jacket - dark navy
  _r(c,5,13,14,13,'#1a237e');
  _r(c,4,14,2,11,'#1a237e'); _r(c,18,14,2,11,'#1a237e');
  // lapels
  _r(c,9,13,6,8,'#141450');
  _r(c,9,13,3,6,'#1e2d9e'); _r(c,12,13,3,6,'#141450');
  // white shirt / tie
  _r(c,10,13,4,10,'#f0f0f0');
  _r(c,11,14,2,9,'#e53935');
  _r(c,11,21,2,2,'#b71c1c');
  // pocket square
  _r(c,5,16,2,2,'#fff'); _r(c,5,16,2,1,'#e0e0e0');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair - dark neat
  _r(c,7,4,10,4,'#1a0a00'); _r(c,7,5,2,4,'#1a0a00'); _r(c,15,5,2,3,'#1a0a00');
  _r(c,7,4,10,2,'#2d1a00'); // top highlight
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  // eyes with glasses
  if(dir!=='up'){
    _r(c,8,9,4,3,'#ffd700'); _r(c,12,9,4,3,'#ffd700'); // glasses frame
    _r(c,9,9,2,2,'#111'); _r(c,13,9,2,2,'#111'); // pupils
    _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8');
    _r(c,12,10,1,1,'#ffd700'); // bridge
  }
  if(dir!=='up'){ _r(c,9,12,6,1,'#c47a60'); }
  // briefcase
  _r(c,17,18,5,8,'#5d3a1a'); _r(c,18,17,3,2,'#7a4e24');
  _r(c,19,20,2,4,'#6d4e2a'); _r(c,18,22,3,1,'#ffd700');
});

// ── avatar 1: School Girl (ชุดนักเรียนหญิง - ทันสมัย) ──
SPR.player1 = (dir, fr, moving) => _px(`p1_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // skirt - dark navy
  _r(c,5,22,14,9,'#1a237e'); _r(c,4,25,16,6,'#1e2d9e');
  // pleats
  _r(c,6,23,1,8,'#141450'); _r(c,10,23,1,8,'#141450'); _r(c,14,23,1,8,'#141450');
  // legs
  _r(c,7,29,4,6,'#f5c5a3'); _r(c,13,29,4,6,'#f5c5a3');
  if(wk){ _r(c,7,29,4,6,'#e8b48a'); _r(c,13,29,4,6,'#f5c5a3'); }
  // white socks + shoes
  _r(c,6,33,5,3,'#f0f0f0'); _r(c,13,33,5,3,'#f0f0f0');
  _r(c,6,34,5,2,'#111'); _r(c,13,34,5,2,'#111');
  // white blouse
  _r(c,6,13,12,11,'#fafafa'); _r(c,5,14,2,9,'#fafafa'); _r(c,17,14,2,9,'#fafafa');
  // sailor collar - navy
  _r(c,7,13,10,5,'#1a237e'); _r(c,8,13,8,3,'#fafafa');
  _r(c,9,14,6,4,'#1a237e');
  // neckerchief - red
  _r(c,10,15,4,6,'#e53935'); _r(c,11,16,2,8,'#c62828');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair - twin tails neat
  _r(c,7,4,10,5,'#0a0a1a'); _r(c,6,6,2,8,'#0a0a1a'); _r(c,16,6,2,8,'#0a0a1a');
  _r(c,4,10,3,8,'#1a1a2e'); _r(c,17,10,3,8,'#1a1a2e');
  // hair ribbon - red
  _r(c,14,4,5,3,'#e53935');
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up'){ _r(c,9,9,2,2,'#0a0a1a'); _r(c,13,9,2,2,'#0a0a1a'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up'){ _r(c,9,12,6,1,'#e8735a'); _r(c,10,11,4,1,'#e8735a'); }
  // bag - backpack
  _r(c,0,14,4,10,'#1565c0'); _r(c,1,15,2,8,'#1976d2'); _r(c,1,18,2,2,'#0d47a1');
});

// ── avatar 2: Developer Boy (hoodie เทา + headset) ──
SPR.player2 = (dir, fr, moving) => _px(`p2_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // jeans
  _r(c,6,24,5,10,'#1565c0'); _r(c,13,24,5,10,'#1565c0');
  if(wk){ _r(c,6,24,5,10,'#1976d2'); _r(c,13,24,5,10,'#1565c0'); }
  // sneakers
  _r(c,5,32,6,3,'#f0f0f0'); _r(c,13,32,6,3,'#f0f0f0');
  _r(c,5,34,6,1,'#ccc'); _r(c,13,34,6,1,'#ccc');
  // hoodie - dark gray
  _r(c,5,12,14,14,'#37474f'); _r(c,4,13,2,11,'#37474f'); _r(c,18,13,2,11,'#37474f');
  _r(c,6,11,12,3,'#263238'); // hood
  _r(c,8,24,8,4,'#263238'); // pocket
  _r(c,9,25,6,2,'#1c282e'); // pocket detail
  // logo on hoodie (circuit)
  _r(c,10,16,4,1,'#4caf50'); _r(c,10,16,1,4,'#4caf50');
  _r(c,13,16,1,3,'#4caf50'); _r(c,10,19,4,1,'#4caf50');
  _d(c,10,16,'#69f0ae'); _d(c,13,19,'#69f0ae');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair - curly/afro
  _r(c,6,3,12,6,'#1a0a00');
  _r(c,5,4,14,4,'#2d1500');
  _r(c,7,4,10,6,'#1a0a00');
  _r(c,5,5,2,3,'#1a0a00'); _r(c,17,5,2,3,'#1a0a00');
  // headphones
  _r(c,5,6,2,4,'#37474f'); _r(c,17,6,2,4,'#37474f'); // cups
  _r(c,7,5,10,2,'#263238'); // band
  _r(c,5,7,2,2,'#4caf50'); _r(c,17,7,2,2,'#4caf50'); // indicator
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up'){ _r(c,9,9,2,2,'#1a0a00'); _r(c,13,9,2,2,'#1a0a00'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up'){ _r(c,10,12,4,1,'#c47a60'); }
});

// ── avatar 3: Data Scientist (lab coat สีขาว) ──
SPR.player3 = (dir, fr, moving) => _px(`p3_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // dark pants
  _r(c,6,24,5,10,'#263238'); _r(c,13,24,5,10,'#263238');
  if(wk){ _r(c,6,24,5,10,'#37474f'); _r(c,13,24,5,10,'#263238'); }
  // shoes
  _r(c,5,32,6,3,'#1a1a2e'); _r(c,13,32,6,3,'#1a1a2e');
  // lab coat - white
  _r(c,4,12,16,14,'#f0f0f0'); _r(c,3,13,2,11,'#f0f0f0'); _r(c,19,13,2,11,'#f0f0f0');
  // coat lapels / inside
  _r(c,9,12,6,12,'#e8f5e9');
  _r(c,9,12,3,8,'#fafafa'); _r(c,12,12,3,8,'#e8f5e9');
  // teal shirt inside
  _r(c,10,14,4,8,'#00695c');
  // pocket with pen
  _r(c,5,17,4,4,'#e8e8e8'); _r(c,5,17,4,1,'#ccc');
  _r(c,6,15,1,4,'#e53935'); _r(c,7,15,1,3,'#1565c0'); // pens
  // name badge
  _r(c,13,17,4,5,'#fff'); _r(c,14,18,2,1,'#333'); _r(c,13,17,4,1,'#e53935');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair - neat side part
  _r(c,7,4,10,4,'#1a0a00'); _r(c,7,5,2,4,'#1a0a00');
  _r(c,9,4,8,3,'#2d1500'); _r(c,7,4,4,2,'#1a0a00');
  // glasses
  if(dir!=='up'){
    _r(c,8,9,4,3,'#263238'); _r(c,12,9,4,3,'#263238');
    _r(c,9,9,2,2,'#0d47a1'); _r(c,13,9,2,2,'#0d47a1');
    _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8');
    _r(c,12,10,1,1,'#263238');
  }
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up'){ _r(c,9,12,6,1,'#c47a60'); }
  // clipboard
  _r(c,18,14,5,8,'#f5f5f5'); _r(c,19,13,3,2,'#795548');
  _r(c,19,16,3,1,'#90a4ae'); _r(c,19,18,3,1,'#90a4ae'); _r(c,19,20,3,1,'#90a4ae');
});

// ── avatar 4: AI Researcher (jacket สีม่วง + glowing laptop) ──
SPR.player4 = (dir, fr, moving) => _px(`p4_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  const glow = (Math.sin(animF*0.1)+1)*0.5;
  // dark pants
  _r(c,6,24,5,10,'#1a0033'); _r(c,13,24,5,10,'#1a0033');
  if(wk){ _r(c,6,24,5,10,'#2a0050'); _r(c,13,24,5,10,'#1a0033'); }
  // boots
  _r(c,5,32,6,3,'#212121'); _r(c,13,32,6,3,'#212121');
  _r(c,5,32,3,1,'rgba(180,0,255,.3)'); _r(c,13,32,3,1,'rgba(180,0,255,.3)');
  // purple jacket
  _r(c,5,12,14,14,'#4a0072'); _r(c,4,13,2,11,'#4a0072'); _r(c,18,13,2,11,'#4a0072');
  // jacket details
  _r(c,9,12,6,12,'#38005c');
  _r(c,9,12,3,7,'#5c007a'); _r(c,12,12,3,7,'#38005c');
  // glowing circuit pattern on jacket
  const gc2 = `rgba(180,0,255,${0.4+glow*0.4})`;
  _r(c,6,16,3,1,gc2); _r(c,6,16,1,5,gc2); _r(c,6,21,3,1,gc2);
  _r(c,15,16,3,1,gc2); _r(c,17,16,1,5,gc2); _r(c,15,21,3,1,gc2);
  // shirt inside
  _r(c,10,14,4,8,'#ce93d8');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair - gradient purple tips
  _r(c,7,4,10,5,'#1a0033');
  _r(c,7,4,10,2,'#4a0072'); // purple tips
  _r(c,6,5,2,4,'#1a0033'); _r(c,16,5,2,3,'#1a0033');
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up'){
    _r(c,9,9,2,2,'#1a0033'); _r(c,13,9,2,2,'#1a0033');
    _d(c,9,9,'rgba(180,0,255,.8)'); _d(c,13,9,'rgba(180,0,255,.8)'); // glowing eyes
  }
  if(dir!=='up'){ _r(c,9,12,6,1,'#c47a60'); }
  // glowing tablet
  _r(c,18,16,5,6,'#1a0033');
  _r(c,19,17,3,4,`rgba(180,0,255,${0.5+glow*0.5})`);
});

// ── avatar 5: School Boy (ชุดนักเรียนชาย - ไทย) ──
SPR.player5 = (dir, fr, moving) => _px(`p5_${dir}_${moving?fr>>3&1:0}`, 24, 36, (c) => {
  _shadow(c, 12, 34, 7, 2.5);
  const wk = moving ? (fr>>3)&1 : 0;
  // dark shorts
  _r(c,6,24,5,8,'#1c1c2e'); _r(c,13,24,5,8,'#1c1c2e');
  if(wk){ _r(c,6,24,5,8,'#2a2a3e'); _r(c,13,24,5,8,'#1c1c2e'); }
  // legs visible
  _r(c,7,30,4,5,'#f5c5a3'); _r(c,13,30,4,5,'#f5c5a3');
  // white socks + black shoes
  _r(c,6,33,5,3,'#f0f0f0'); _r(c,13,33,5,3,'#f0f0f0');
  _r(c,5,34,6,2,'#111'); _r(c,13,34,6,2,'#111');
  // white shirt
  _r(c,6,13,12,13,'#f0f0f0');
  _r(c,5,14,2,11,'#f0f0f0'); _r(c,17,14,2,11,'#f0f0f0');
  // collar
  _r(c,10,13,4,3,'#1c1c2e'); _r(c,10,13,2,2,'#f0f0f0'); _r(c,12,13,2,2,'#f0f0f0');
  // belt
  _r(c,6,23,12,2,'#1c1c2e'); _r(c,11,23,2,2,'#ffd700');
  // head
  _r(c,7,4,10,11,'#f5c5a3');
  // hair
  _r(c,7,4,10,4,'#1a0a00'); _r(c,7,5,2,6,'#1a0a00'); _r(c,15,5,2,5,'#1a0a00');
  // ears
  _r(c,6,8,2,3,'#e8b48a'); _r(c,16,8,2,3,'#e8b48a');
  if(dir!=='up'){ _r(c,9,9,2,2,'#1c1c2e'); _r(c,13,9,2,2,'#1c1c2e'); _d(c,9,9,'#fff8'); _d(c,13,9,'#fff8'); }
  if(dir!=='up'){ _r(c,9,12,6,1,'#c47a60'); }
  // school bag
  _r(c,17,13,5,10,'#1565c0'); _r(c,18,14,3,8,'#1976d2'); _r(c,18,17,3,2,'#0d47a1');
  _r(c,18,14,3,1,'#ffd700');
});

// ── Frame counter ──
let animF = 0;

// ═══════════════════════════════════════════════════
//  NPC CHARACTERS — AI Agent style
// ═══════════════════════════════════════════════════

// NPC 0: AI Master (ด่าน 1 - แก้ปัญหา) — ชายแก่ สูทฟ้า
SPR.npc0 = (fr) => _px(`npc0_${fr>>3&7}`, 22, 32, (c) => {
  const b = Math.sin(fr*0.18)*2|0;
  _r(c,1,29,20,3,'rgba(0,0,0,.2)');
  // legs
  _r(c,4,22,5,9,'#1a237e'); _r(c,11,22,5,9,'#1a237e');
  _r(c,3,30,7,2,'#111'); _r(c,11,30,7,2,'#111');
  // suit body
  _r(c,3,11,16,13,'#1565c0');
  _r(c,2,12,2,10,'#1565c0'); _r(c,18,12,2,10,'#1565c0');
  _r(c,8,11,6,11,'#0d47a1'); // lapel shadow
  _r(c,8,11,3,7,'#1976d2'); _r(c,11,11,3,7,'#0d47a1'); // lapels
  _r(c,9,11,4,9,'#f0f0f0'); // shirt
  _r(c,10,12,2,8,'#e53935'); // tie
  // head + bob
  _r(c,4,3+b,14,11,'#f5c5a3');
  _r(c,4,3+b,14,4,'#e0d0c0'); // white hair
  _r(c,3,5+b,2,4,'#e0d0c0'); _r(c,17,5+b,2,4,'#e0d0c0');
  _r(c,4,3+b,14,2,'#eee'); // hair top
  // glasses
  _r(c,5,8+b,5,3,'#ffd700'); _r(c,10,8+b,5,3,'#ffd700'); _r(c,9,9+b,1,1,'#ffd700');
  _r(c,6,8+b,3,2,'#1a1a2e'); _r(c,11,8+b,3,2,'#1a1a2e');
  // smile
  _r(c,7,12+b,8,1,'#c47a60'); _r(c,7,12+b,1,1,'#1a1a2e'); _r(c,14,12+b,1,1,'#1a1a2e');
  // ears
  _r(c,3,8+b,2,3,'#e8b48a'); _r(c,17,8+b,2,3,'#e8b48a');
  // glow orb in hand
  _r(c,18,15,4,4,'rgba(255,215,0,.15)');
  _r(c,19,16,2,2,'rgba(255,215,0,.8)');
});

// NPC 1: Code Bot (ด่าน 2 - Python) — robot เขียว
SPR.npc1 = (fr) => _px(`npc1_${fr>>3&3}`, 22, 32, (c) => {
  const b = Math.sin(fr*0.2)*1.5|0;
  const glow = (Math.sin(fr*0.15)+1)*0.5;
  _r(c,1,29,20,3,'rgba(0,0,0,.2)');
  // body - robot
  _r(c,4,12,14,12,'#263238');
  _r(c,3,13,2,10,'#37474f'); _r(c,17,13,2,10,'#37474f');
  // screen on chest
  _r(c,6,14,10,8,'#1a237e');
  _r(c,7,15,8,6,`rgba(33,150,243,${0.3+glow*0.4})`);
  // code lines on screen
  [[7,15,'#4caf50',5],[7,17,'#fff',3],[7,19,'#ff9800',4]].forEach(([x,y,col,w])=>_r(c,x,y,w,1,col));
  // arms
  _r(c,2,13,2,8,'#455a64'); _r(c,18,13,2,8,'#455a64');
  _r(c,0,19,3,3,'#546e7a'); _r(c,18,19,4,3,'#546e7a'); // hands
  // legs
  _r(c,6,23,4,8,'#37474f'); _r(c,12,23,4,8,'#37474f');
  _r(c,5,29,5,3,'#263238'); _r(c,12,29,5,3,'#263238');
  // head - robot
  _r(c,3,3+b,16,11,'#37474f');
  _r(c,4,4+b,14,9,'#455a64');
  // face screen
  _r(c,5,5+b,12,6,'#0d1257');
  _r(c,6,6+b,4,3,`rgba(0,230,118,${0.7+glow*0.3})`); // eye L
  _r(c,12,6+b,4,3,`rgba(0,230,118,${0.7+glow*0.3})`); // eye R
  _r(c,7,7+b,2,1,'#fff'); _r(c,13,7+b,2,1,'#fff'); // pupils
  // smile bar
  _r(c,6,10+b,10,1,`rgba(0,230,118,${0.5+glow*0.3})`);
  // antenna
  _r(c,10,1+b,2,4,'#78909c');
  _r(c,9,0+b,4,2,'#4caf50');
  _r(c,10,0+b,2,1,'rgba(0,230,118,.8)');
  // ears / bolts
  _r(c,2,6+b,2,2,'#546e7a'); _r(c,18,6+b,2,2,'#546e7a');
});

// NPC 2: Data Guardian (ด่าน 3 - ข้อมูล) — หญิง ชุด holographic
SPR.npc2 = (fr) => _px(`npc2_${fr>>3&7}`, 22, 32, (c) => {
  const b = Math.sin(fr*0.16)*2|0;
  const glow = (Math.sin(fr*0.12)+1)*0.5;
  _r(c,1,29,20,3,'rgba(0,0,0,.2)');
  // skirt - holographic teal
  _r(c,4,22,14,8,'#006064');
  _r(c,3,24,16,6,'#00838f');
  _r(c,4,24,14,1,`rgba(0,255,255,${0.2+glow*0.2})`); // sheen
  // legs
  _r(c,5,28,4,4,'#f5c5a3'); _r(c,11,28,4,4,'#f5c5a3');
  // cyan boots
  _r(c,4,31,6,2,'#00695c'); _r(c,11,31,7,2,'#00695c');
  // top - teal
  _r(c,4,12,14,12,'#00838f');
  _r(c,3,13,2,10,'#00838f'); _r(c,17,13,2,10,'#00838f');
  // holographic data pattern
  _r(c,5,14,2,1,`rgba(0,255,255,${glow*.5})`);
  _r(c,10,16,5,1,`rgba(0,255,255,${glow*.4})`);
  _r(c,6,19,4,1,`rgba(0,255,255,${glow*.4})`);
  // collar
  _r(c,8,12,6,5,'#004d40');
  // floating data orb
  const ox = 18+(Math.sin(fr*0.1)*2|0), oy = 12+(Math.sin(fr*0.15)*2|0);
  _r(c,ox,oy,4,4,`rgba(0,255,255,${0.15+glow*0.15})`);
  _r(c,ox+1,oy+1,2,2,`rgba(0,255,255,${0.6+glow*0.4})`);
  // head
  _r(c,4,3+b,14,11,'#f5c5a3');
  // hair - teal highlights
  _r(c,4,3+b,14,4,'#1a1a2e');
  _r(c,4,3+b,14,2,'#004d40');
  _r(c,3,5+b,2,6,'#1a1a2e'); _r(c,17,5+b,2,6,'#1a1a2e');
  _r(c,3,8+b,3,5,'#006064'); _r(c,16,8+b,3,5,'#006064'); // side flow
  // eyes
  _r(c,6,8+b,3,2,`rgba(0,255,255,${0.5+glow*0.5})`);
  _r(c,13,8+b,3,2,`rgba(0,255,255,${0.5+glow*0.5})`);
  _r(c,7,8+b,1,2,'#1a1a2e'); _r(c,14,8+b,1,2,'#1a1a2e');
  _r(c,6,11+b,9,1,'#c47a60');
  // ears
  _r(c,3,8+b,2,3,'#e8b48a'); _r(c,17,8+b,2,3,'#e8b48a');
});

// NPC 3: Cyber Shield (ด่าน 4 - ความปลอดภัย) — หน้ากาก armor ม่วง
SPR.npc3 = (fr) => _px(`npc3_${fr>>3&3}`, 22, 32, (c) => {
  const b = Math.sin(fr*0.2)*1|0;
  const glow = (Math.sin(fr*0.18)+1)*0.5;
  _r(c,1,29,20,3,'rgba(0,0,0,.2)');
  // legs - armored
  _r(c,4,22,5,9,'#4a0072'); _r(c,11,22,5,9,'#4a0072');
  _r(c,3,29,8,3,'#6a1b9a'); _r(c,11,29,8,3,'#6a1b9a');
  // armor body
  _r(c,3,11,16,13,'#4a0072');
  _r(c,2,12,2,11,'#6a1b9a'); _r(c,18,12,2,11,'#6a1b9a');
  // chest piece
  _r(c,6,12,10,10,'#38005c');
  _r(c,7,13,8,7,'#6a1b9a');
  // cyber pattern
  _r(c,7,14,8,1,`rgba(180,0,255,${0.3+glow*0.5})`);
  _r(c,8,16,2,4,`rgba(180,0,255,${0.2+glow*0.4})`);
  _r(c,12,16,2,4,`rgba(180,0,255,${0.2+glow*0.4})`);
  _r(c,8,20,6,1,`rgba(180,0,255,${0.3+glow*0.4})`);
  // shield on arm
  _r(c,0,14,3,7,'#4a0072'); _r(c,0,15,3,5,'#6a1b9a'); _r(c,0,17,3,1,'#b39ddb');
  _r(c,1,15,1,5,`rgba(180,0,255,${glow*0.8})`);
  // head + helmet
  _r(c,4,2+b,14,12,'#4a0072'); // helmet
  _r(c,5,3+b,12,10,'#6a1b9a');
  // visor
  _r(c,5,6+b,12,5,'#0d1257');
  _r(c,6,7+b,10,3,`rgba(180,0,255,${0.4+glow*0.4})`);
  _r(c,7,7+b,3,2,'rgba(255,255,255,.2)'); // visor glare
  // helmet top glow
  _r(c,9,2+b,4,2,`rgba(180,0,255,${0.5+glow*0.5})`);
  // cyber lines on helmet
  _r(c,4,5+b,2,2,'#9c27b0'); _r(c,16,5+b,2,2,'#9c27b0');
});

// ═══════════════════════════════════════════════════
//  MAP OBJECTS & TILES — Office/School Pixel Art
// ═══════════════════════════════════════════════════

// ── Computer Desk (office style, glowing screen) ──
SPR.computerDesk = (fr) => _px(`cdesk_${fr>>4&1}`, 48, 40, (c) => {
  const glow = (Math.sin(fr*0.1)+1)*0.5;
  // desk body
  _r(c,2,22,44,16,'#5d3a1a'); _r(c,3,23,42,14,'#7a5020');
  _r(c,2,22,44,2,'rgba(255,255,255,.12)');
  // legs
  _r(c,4,36,4,4,'#5d3a1a'); _r(c,40,36,4,4,'#5d3a1a');
  // monitor stand
  _r(c,20,14,8,9,'#263238'); _r(c,22,20,4,3,'#37474f');
  _r(c,16,21,16,2,'#263238');
  // monitor body
  _r(c,8,2,32,16,'#263238'); _r(c,9,3,30,14,'#1c313a');
  // screen content - code
  _r(c,10,4,28,12,'#0d1257');
  const sg = `rgba(33,150,243,${0.5+glow*0.3})`;
  [[10,5,'#4caf50',12],[10,7,sg,18],[10,9,'#ff9800',10],[10,11,sg,14]].forEach(([x,y,col,w])=>_r(c,x,y,w,1,col));
  // screen glow effect
  c.fillStyle=`rgba(33,150,243,${0.06+glow*0.06})`; c.fillRect(10,4,28,12);
  // keyboard
  for(let i=0;i<8;i++) for(let j=0;j<16;j++) _r(c,8+j*2,26+i%2,1,1,'rgba(255,255,255,0.08)');
  _r(c,8,26,32,4,'#37474f'); _r(c,8,26,32,1,'rgba(255,255,255,.06)');
  // mouse
  _r(c,42,24,5,7,'#455a64'); _r(c,44,24,1,3,'rgba(255,255,255,.15)');
  _r(c,42,24,5,1,'rgba(255,255,255,.08)');
});

// ── Bookshelf (office/school) ──
SPR.bookshelf = () => _px('bookshelf', 48, 56, (c) => {
  // frame
  _r(c,0,0,48,56,'#5d3a1a');
  _r(c,2,2,44,52,'#7a5020');
  // shelves
  [12,26,40].forEach(sy=>{
    _r(c,2,sy,44,2,'#5d3a1a');
    // books on shelf above
    const colors=['#e53935','#1565c0','#2e7d32','#f57f17','#6a1b9a','#00838f','#c62828','#0277bd'];
    let bx=3;
    colors.forEach((col,i)=>{
      const bw=4+i%2; const bh=sy-3-(i%3);
      _r(c,bx,sy-bh,bw,bh,col);
      _r(c,bx,sy-bh,bw,1,'rgba(255,255,255,.2)');
      _r(c,bx+1,sy-bh+1,1,bh-2,'rgba(255,255,255,.1)');
      bx+=bw+1;
      if(bx>42)bx=3;
    });
  });
  // top row of books
  let bx=3;
  ['#9c27b0','#00695c','#bf360c','#283593','#558b2f'].forEach((col,i)=>{
    const bw=5+i%2; const bh=6+i%3;
    _r(c,bx,42-bh,bw,bh,col);
    _r(c,bx,42-bh,bw,1,'rgba(255,255,255,.2)');
    bx+=bw+1; if(bx>42)bx=3;
  });
});

// ── Office Plant ──
SPR.plant = (v) => _px(`plant${v}`, 20, 32, (c) => {
  // pot
  const potColors=['#8d6e3a','#00838f','#c62828','#4a0072'][v%4];
  _r(c,6,24,8,8,potColors); _r(c,5,22,10,4,potColors);
  _r(c,6,24,8,2,'rgba(255,255,255,.12)');
  // soil
  _r(c,6,22,8,2,'#3e2723');
  // stem + leaves
  _r(c,9,14,2,10,'#388e3c');
  if(v%2===0){
    // round bush type
    _r(c,3,8,14,10,'#2e7d32'); _r(c,2,10,16,6,'#388e3c');
    _r(c,4,6,12,6,'#43a047');
    _r(c,6,8,3,3,'rgba(255,255,255,.08)');
  }else{
    // tall leaf type
    _r(c,5,4,4,14,'#2e7d32'); _r(c,11,6,4,12,'#388e3c');
    _r(c,8,2,4,10,'#43a047');
    _r(c,6,5,2,2,'rgba(255,255,255,.1)');
  }
});

// ── Office Chair ──
SPR.chair = () => _px('chair', 32, 32, (c) => {
  // wheels
  [[4,28],[14,28],[24,28]].forEach(([x,y])=>{ _r(c,x,y,4,4,'#424242'); _r(c,x+1,y,2,1,'rgba(255,255,255,.15)'); });
  // base pole
  _r(c,14,20,4,10,'#616161'); _r(c,12,24,8,3,'#757575');
  // seat
  _r(c,6,16,20,8,'#1565c0'); _r(c,7,17,18,6,'#1976d2');
  _r(c,7,17,18,2,'rgba(255,255,255,.1)');
  // backrest
  _r(c,4,4,24,14,'#1565c0'); _r(c,5,5,22,12,'#1976d2');
  _r(c,5,5,22,3,'rgba(255,255,255,.08)');
  // armrests
  _r(c,2,12,4,8,'#0d47a1'); _r(c,26,12,4,8,'#0d47a1');
});

// ── Whiteboard ──
SPR.whiteboard = (fr) => _px(`wb_${fr>>4&1}`, 64, 44, (c) => {
  const glow = (Math.sin(fr*0.08)+1)*0.5;
  // frame
  _r(c,0,0,64,44,'#37474f');
  _r(c,2,2,60,40,'#fafafa');
  _r(c,0,0,64,3,'#263238');
  // stand legs
  _r(c,10,40,4,4,'#37474f'); _r(c,50,40,4,4,'#37474f');
  _r(c,12,38,40,4,'#455a64');
  // board content - flowchart/diagram
  _r(c,8,6,20,6,'#e3f2fd'); _r(c,9,7,18,4,'#1565c0'); // box 1
  _r(c,36,6,20,6,'#e8f5e9'); _r(c,37,7,18,4,'#2e7d32'); // box 2
  _r(c,20,6,16,6,'rgba(33,150,243,.08)');
  // arrows
  _r(c,28,8,8,2,'#546e7a'); _r(c,34,7,2,4,'#546e7a'); // arrow
  _r(c,18,12,2,8,'#546e7a'); // down arrow
  // lower diagram
  _r(c,15,22,14,8,'#fff3e0'); _r(c,16,23,12,6,'#f57f17'); // decision diamond-ish
  _r(c,35,22,14,8,'#fce4ec'); _r(c,36,23,12,6,'#c62828');
  _r(c,29,26,6,2,'#546e7a');
  // glow effect (smart board)
  c.fillStyle=`rgba(33,150,243,${0.02+glow*0.02})`; c.fillRect(2,2,60,40);
  // tray
  _r(c,2,40,60,3,'#90a4ae'); _r(c,10,41,6,1,'#ff5722'); _r(c,20,41,6,1,'#1565c0'); // markers
});

// ── Gate/Barrier (ไม้กั้น) ──
SPR.gate = (isOpen, fr) => _px(`gate_${isOpen?'o':'c'}_${fr>>3&3}`, 32, 48, (c) => {
  const t = isOpen ? Math.min(1, (fr%30)/15) : 0;
  const angle = t * Math.PI * 0.5;
  // post
  _r(c,14,0,4,48,'#455a64');
  _r(c,15,0,2,48,'rgba(255,255,255,.15)');
  // warning stripes on post
  for(let i=0;i<6;i++) _r(c,14,i*8,4,4,i%2===0?'#ffd700':'#e53935');
  // barrier arm
  c.save(); c.translate(16, 8);
  c.rotate(-angle);
  _r(c,0,-3,14,6,'#ffd700');
  for(let i=0;i<14;i+=4) { c.fillStyle=i%8===0?'#e53935':'#ffd700'; c.fillRect(i,-3,4,6); }
  // stripes
  for(let i=0;i<14;i+=4) { c.fillStyle=i%8===0?'#e53935':'#ffd700'; c.fillRect(i,-3,4,6); }
  c.restore();
  // glow when open
  if(isOpen){
    c.fillStyle=`rgba(93,222,58,${0.2+Math.sin(fr*0.2)*0.1})`;
    c.beginPath(); c.arc(16,8,12,0,Math.PI*2); c.fill();
    _r(c,14,4,4,4,'rgba(93,222,58,.6)');
  }
});

// ── Lobby Barrier (รั้วขอบ) ──
SPR.barrier = () => _px('barrier', 32, 24, (c) => {
  // posts
  _r(c,0,4,4,20,'#455a64'); _r(c,28,4,4,20,'#455a64');
  _r(c,1,4,2,20,'rgba(255,255,255,.15)');
  _r(c,29,4,2,20,'rgba(255,255,255,.15)');
  // rail
  _r(c,0,8,32,5,'#ffd700');
  _r(c,0,8,32,2,'rgba(255,255,255,.2)');
  _r(c,0,13,32,5,'#ffd700');
  // warning stripes
  for(let i=0;i<4;i++){ _r(c,i*8,8,4,5,'#e53935'); _r(c,i*8+4,8,4,5,'#ffd700'); }
  for(let i=0;i<4;i++){ _r(c,i*8,13,4,5,'#ffd700'); _r(c,i*8+4,13,4,5,'#e53935'); }
  // cap
  _r(c,0,4,4,4,'#263238'); _r(c,28,4,4,4,'#263238');
  _r(c,0,4,4,1,'rgba(255,255,255,.2)'); _r(c,28,4,1,4,'rgba(255,255,255,.2)');
});

// ── Floor Tile — Office Themes ──
SPR.groundTile = (theme, tx, ty) => {
  const k = `gnd_${theme}_${(tx+ty*3)%6}`;
  return _px(k, 32, 32, (c) => {
    const themes = {
      // Office floor - light gray tile
      school: { base:['#eceff1','#e8ecef','#eff2f4','#e4e8ec'], detail:'rgba(0,0,0,.04)' },
      // Server room - dark grid floor
      forest: { base:['#102027','#0d1b21','#132e37','#0a1a22'], detail:'rgba(0,230,118,.05)' },
      // Meeting room - carpet navy
      town:   { base:['#1a237e','#1c2590','#192080','#1e28a0'], detail:'rgba(255,255,255,.03)' },
      // Cafeteria - warm wood
      stadium:{ base:['#8d6e3a','#8a6a35','#906e3e','#7d5e2a'], detail:'rgba(255,255,255,.06)' },
    };
    const th = themes[theme]||themes.school;
    c.fillStyle = th.base[(tx*3+ty*7)%4]; c.fillRect(0,0,32,32);
    // tile grout lines
    c.fillStyle = th.detail;
    c.fillRect(0,0,32,1); c.fillRect(0,0,1,32);
    // floor pattern
    if(theme==='forest'){
      // grid lines glow
      c.fillStyle='rgba(0,230,118,.04)';
      c.fillRect(0,0,32,1); c.fillRect(0,0,1,32);
      if((tx+ty)%3===0){ c.fillStyle='rgba(0,230,118,.06)'; c.fillRect(8,8,16,16); }
    }
    if(theme==='school'){
      // subtle tile pattern
      if((tx*5+ty*3)%9===0){ c.fillStyle='rgba(0,0,0,.03)'; c.fillRect(2,2,28,28); }
    }
    if(theme==='town'){
      // carpet pattern
      if((tx+ty)%2===0){ c.fillStyle='rgba(255,255,255,.02)'; c.fillRect(4,4,24,24); }
    }
    if(theme==='stadium'){
      // wood grain
      c.fillStyle='rgba(0,0,0,.06)'; c.fillRect(0,tx%16,32,1);
    }
  });
};

SPR.pathTile = (theme, tx, ty) => {
  const k = `path_${theme}_${(tx+ty)%4}`;
  return _px(k, 32, 32, (c) => {
    const cols = {
      school: ['#b0bec5','#90a4ae','#b8c6cf','#cfd8dc'], // corridor
      forest: ['#1c3a47','#163040','#20404f','#183540'], // dark path
      town:   ['#283593','#2a3ba0','#263090','#2e40b0'], // aisle
      stadium:['#a07840','#9c7235','#a47d48','#a88050'], // wood path
    };
    const c2 = (cols[theme]||cols.school)[(tx+ty)%4];
    c.fillStyle = c2; c.fillRect(0,0,32,32);
    // path texture
    c.fillStyle='rgba(0,0,0,.06)'; c.fillRect(0,0,32,1); c.fillRect(0,0,1,32);
    c.fillStyle='rgba(255,255,255,.06)'; c.fillRect(1,1,31,1);
    if(theme==='school'){
      // floor direction guide
      if((tx*3+ty)%8===0){ c.fillStyle='rgba(33,150,243,.08)'; c.fillRect(12,2,8,28); }
    }
  });
};

SPR.waterTile = (fr, tx, ty) => _px(`water_${fr%16}`, 32, 32, (c) => {
  // Use as "energy flow" for server room theme
  const w = Math.floor(fr/4)%32;
  c.fillStyle = ['#1565c0','#1976d2','#0d47a1'][(tx+ty)%3]; c.fillRect(0,0,32,32);
  c.fillStyle='rgba(33,150,243,.15)'; c.fillRect((tx*7+w)%32,4,4,2); c.fillRect((tx*5+w+16)%32,18,6,2);
  c.fillStyle='rgba(255,255,255,.05)'; c.fillRect(0,10,32,1); c.fillRect(0,24,32,1);
});

SPR.wallTile = (theme, tx, ty) => {
  const k = `wall_${theme}_${(tx+ty*2)%4}`;
  return _px(k, 32, 32, (c) => {
    const themes = {
      school: { bg:'#b0bec5', mid:'#cfd8dc', top:'#90a4ae', acc:'#1976d2' }, // office wall
      forest: { bg:'#102027', mid:'#1c3a47', top:'#0d1b21', acc:'#4caf50' }, // server room
      town:   { bg:'#1a237e', mid:'#283593', top:'#141566', acc:'#ffd700' }, // meeting room
      stadium:{ bg:'#5d3a1a', mid:'#7a5020', top:'#4a2a10', acc:'#ff9800' }, // wood panel
    };
    const th = themes[theme]||themes.school;
    c.fillStyle = th.bg; c.fillRect(0,0,32,32);
    // wall panel lines
    c.fillStyle = th.mid;
    for(let y=0;y<4;y++) c.fillRect(2,y*8+1,28,7);
    c.fillStyle = th.top; c.fillRect(0,0,32,3);
    // accent stripe
    c.fillStyle = th.acc+'44'; c.fillRect(0,0,32,3);
    c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(2,1,28,1);
  });
};

// ═══════════════════════════════════════════════════
//  OFFICE DECORATION SPRITES
// ═══════════════════════════════════════════════════

// Tree → Office plant
SPR.tree = (v) => SPR.plant(v);

// Bush → Small plant / printer
SPR.bush = (v) => _px(`bush${v}`, 24, 20, (c) => {
  if(v===0){
    // printer/copier
    _r(c,2,8,20,12,'#37474f'); _r(c,3,9,18,10,'#455a64');
    _r(c,4,6,16,4,'#37474f');
    _r(c,6,11,12,4,'#263238'); // paper slot
    _r(c,8,10,8,2,'rgba(255,255,255,.15)');
    _r(c,4,7,4,2,'#4caf50'); // light
    _r(c,10,7,6,1,'#90a4ae'); // paper out
  }else if(v===1){
    // mini plant
    _r(c,8,12,8,8,'#5d3a1a'); _r(c,7,10,10,4,'#7a5020');
    _r(c,4,2,16,12,'#2e7d32'); _r(c,6,4,12,8,'#388e3c');
    _r(c,8,2,8,4,'#43a047');
  }else{
    // coffee machine
    _r(c,4,4,16,16,'#263238'); _r(c,5,5,14,14,'#37474f');
    _r(c,7,6,10,4,'#1a1a2e'); // display
    _r(c,8,7,8,2,'rgba(33,150,243,.5)');
    _r(c,10,10,4,8,'#212121'); // coffee area
    _r(c,11,12,2,4,'#5d3a1a'); // coffee
    _r(c,7,18,10,2,'rgba(0,0,0,.3)'); // shadow
  }
});

// Flower → Network hub / mini decoration
SPR.flower = (v) => _px(`flower${v}`, 16, 16, (c) => {
  const cols=['#e53935','#1565c0','#ffd700','#4caf50'];
  const col=cols[v%4];
  // mini hub
  _r(c,4,4,8,8,'#263238'); _r(c,5,5,6,6,'#37474f');
  _r(c,6,6,4,4,'#1a237e');
  // status light
  _r(c,6,6,2,2,col);
  c.fillStyle=col+'44'; c.beginPath(); c.arc(8,8,5,0,Math.PI*2); c.fill();
  // cables
  _r(c,0,7,5,2,'#546e7a'); _r(c,11,7,5,2,'#546e7a');
  _r(c,7,0,2,5,'#546e7a'); _r(c,7,11,2,5,'#546e7a');
});

// Rock → Server rack
SPR.rock = (v) => _px(`rock${v}`, 24, 28, (c) => {
  _r(c,2,2,20,24,'#263238'); _r(c,3,3,18,22,'#37474f');
  _r(c,3,3,18,2,'rgba(255,255,255,.08)');
  // server units
  for(let i=0;i<4;i++){
    const y=5+i*5;
    _r(c,4,y,16,4,'#1c313a');
    _r(c,5,y+1,2,2,['#4caf50','#2196f3','#ff9800','#4caf50'][i]);
    _r(c,8,y+1,10,1,'rgba(255,255,255,.1)');
    _r(c,8,y+2,8,1,'rgba(255,255,255,.06)');
  }
  // power LED
  _r(c,3,22,3,2,'#4caf50');
});

// Chest → Achievement box / data capsule
SPR.chest = (open, fr) => {
  const glow = (Math.sin(fr*0.12)+1)*0.5;
  return _px(`chest_${open?'o':'c'}_${fr>>4&1}`, 28, 24, (c) => {
    _r(c,2,20,24,4,'rgba(0,0,0,.3)');
    if(!open){
      _r(c,2,8,24,14,'#1565c0'); _r(c,3,9,22,12,'#1976d2');
      _r(c,2,8,24,4,'#0d47a1');
      _r(c,4,10,20,2,'rgba(255,255,255,.15)');
      _r(c,11,13,6,4,'#ffd700'); _r(c,12,13,4,4,'#ff9800'); // lock
      _r(c,13,12,2,2,'#ffd700');
    }else{
      _r(c,2,12,24,10,'#1565c0'); _r(c,3,13,22,8,'#1976d2');
      // glow inside
      c.fillStyle=`rgba(255,215,0,${0.3+glow*0.4})`; c.fillRect(4,13,20,8);
      _r(c,2,8,24,5,'#0d47a1');
      _r(c,3,9,22,3,'rgba(255,255,255,.1)');
      // floating star
      const fy=10-(Math.sin(fr*0.15)*3|0);
      c.fillStyle=`rgba(255,215,0,${0.7+glow*0.3})`;
      c.font='bold 10px sans-serif'; c.textAlign='center'; c.fillText('⭐',14,fy);
    }
  });
};

// Star → Floating orb
SPR.star = (fr) => _px(`star_${fr>>3&7}`, 20, 28, (c) => {
  const b = Math.sin(fr*0.25)*3|0;
  const glow = (Math.sin(fr*0.18)+1)*0.5;
  c.fillStyle='rgba(0,0,0,.15)'; c.beginPath(); c.ellipse(10,27,6,2,0,0,Math.PI*2); c.fill();
  c.save(); c.translate(10, 12+b);
  // outer glow
  c.fillStyle=`rgba(33,150,243,${0.2+glow*0.2})`; c.beginPath(); c.arc(0,0,10,0,Math.PI*2); c.fill();
  c.fillStyle=`rgba(33,150,243,${0.4+glow*0.4})`; c.beginPath(); c.arc(0,0,6,0,Math.PI*2); c.fill();
  c.fillStyle='#1976d2'; c.beginPath(); c.arc(0,0,4,0,Math.PI*2); c.fill();
  c.fillStyle='rgba(255,255,255,.6)'; c.fillRect(-2,-2,2,2);
  c.restore();
});

// Fence → Low partition wall
SPR.fence = () => _px('fence', 32, 22, (c) => {
  // partition panels - office style
  _r(c,0,6,32,14,'#90a4ae'); _r(c,0,7,32,12,'#b0bec5');
  _r(c,0,6,32,3,'#78909c'); // top bar
  _r(c,0,6,32,1,'rgba(255,255,255,.2)');
  // panel detail
  _r(c,2,10,28,6,'#cfd8dc'); _r(c,3,11,26,4,'rgba(255,255,255,.08)');
  // posts
  [0,15,30].forEach(x=>{ _r(c,x,2,2,20,'#546e7a'); _r(c,x,2,2,1,'rgba(255,255,255,.2)'); });
});

// House → Office module / workspace pod
SPR.house = (v) => _px(`house${v}`, 48, 52, (c) => {
  const cols=['#1565c0','#006064','#4a0072','#bf360c','#1b5e20'][v%5];
  // workspace pod
  _r(c,4,20,40,32,cols+'cc'); _r(c,5,21,38,30,cols);
  // roof/top bar
  c.fillStyle='#263238'; c.beginPath(); c.moveTo(0,22); c.lineTo(24,4); c.lineTo(48,22); c.closePath(); c.fill();
  c.fillStyle='#37474f'; c.beginPath(); c.moveTo(2,22); c.lineTo(24,6); c.lineTo(46,22); c.closePath(); c.fill();
  // windows - glowing
  [[6,26],[30,26]].forEach(([x,y])=>{
    _r(c,x,y,12,12,'#0d1257');
    _r(c,x,y,12,12,'rgba(33,150,243,.15)');
    _r(c,x,y,12,1,'rgba(255,255,255,.2)');
    _r(c,x+5,y,1,12,'rgba(0,0,0,.15)');
    _r(c,x,y+5,12,1,'rgba(0,0,0,.15)');
  });
  // door - glass
  _r(c,20,36,8,16,'#0d1257'); _r(c,21,37,6,15,'rgba(33,150,243,.2)');
  _r(c,22,40,2,3,'#ffd700'); // handle
  _r(c,20,36,8,1,'rgba(255,255,255,.2)');
});

// Lamp → Smart lamp / LED panel
SPR.lamp = () => _px('lamp', 12, 40, (c) => {
  _r(c,5,24,2,16,'#546e7a'); _r(c,4,38,4,2,'#455a64');
  _r(c,2,18,8,8,'#37474f');
  c.fillStyle='rgba(255,255,255,0.95)'; c.beginPath(); c.arc(6,20,5,0,Math.PI*2); c.fill();
  c.fillStyle='rgba(255,255,150,0.5)'; c.beginPath(); c.arc(6,20,8,0,Math.PI*2); c.fill();
  c.fillStyle='rgba(255,255,200,0.2)'; c.beginPath(); c.arc(6,20,12,0,Math.PI*2); c.fill();
  _r(c,4,16,4,5,'rgba(255,255,255,.8)');
});

// Bench → Office sofa / waiting seat
SPR.bench = () => _px('bench', 40, 20, (c) => {
  // sofa frame
  _r(c,0,8,40,12,'#1565c0'); _r(c,0,9,40,10,'#1976d2');
  _r(c,0,8,40,2,'rgba(255,255,255,.12)');
  // cushions
  _r(c,2,10,12,8,'#1a237e'); _r(c,14,10,12,8,'#1a237e'); _r(c,28,10,10,8,'#1a237e');
  _r(c,3,11,10,2,'rgba(255,255,255,.08)');
  // armrests
  _r(c,0,6,4,12,'#0d47a1'); _r(c,36,6,4,12,'#0d47a1');
  _r(c,0,6,4,2,'rgba(255,255,255,.1)');
  // legs
  _r(c,4,18,4,2,'#0d47a1'); _r(c,32,18,4,2,'#0d47a1');
});

// Computer → standalone terminal
SPR.computer = () => _px('computer', 32, 32, (c) => {
  _r(c,4,2,24,20,'#263238'); _r(c,5,3,22,18,'#37474f');
  _r(c,6,4,20,16,'#1a237e'); _r(c,7,5,18,14,'#0d1257');
  [[7,6,'#4caf50',8],[7,8,'#fff',12],[7,10,'#ff9800',6],[7,12,'#fff',10],[7,14,'#4caf50',8],[7,16,'#fff',5]].forEach(([x,y,col,w])=>_r(c,x,y,w,1,col));
  _r(c,12,22,8,2,'#455a64'); _r(c,8,24,16,2,'#37474f'); _r(c,6,26,20,4,'#263238');
  for(let i=0;i<5;i++) for(let j=0;j<8;j++) _r(c,2+j*4,29+i,3,1,'rgba(255,255,255,0.1)');
});

// Billboard → Digital display
SPR.billboard = (v) => _px(`bill${v}`, 48, 44, (c) => {
  _r(c,22,28,4,16,'#546e7a'); _r(c,23,29,2,14,'#607d8b');
  _r(c,2,2,44,28,'#263238'); _r(c,3,3,42,26,'#37474f'); _r(c,0,0,48,4,'#1c313a');
  const msgs=[['#1565c0','#4caf50'],['#006064','#fff'],['#4a0072','#ffd700'],['#bf360c','#fff']];
  const [bg,fg] = msgs[v%4];
  _r(c,4,4,40,24,bg+'44');
  _r(c,8,8,32,4,fg+'bb'); _r(c,8,14,24,2,fg+'88'); _r(c,8,18,28,2,fg+'88'); _r(c,8,22,20,2,fg+'66');
  _r(c,6,6,4,4,fg); // icon
  // screen glow
  c.fillStyle=bg+'22'; c.fillRect(4,4,40,24);
});

// School building → Main office building
SPR.schoolBuilding = () => _px('school', 56, 56, (c) => {
  // building
  _r(c,2,18,52,36,'#37474f'); _r(c,4,20,48,32,'#455a64');
  _r(c,0,12,56,8,'#263238'); _r(c,2,10,52,6,'#2d3a42'); _r(c,4,8,48,4,'#37474f');
  // windows - glowing blue
  [[6,22],[20,22],[34,22],[6,38],[20,38],[34,38]].forEach(([x,y])=>{
    _r(c,x,y,12,10,'#0d1257');
    _r(c,x,y,12,10,'rgba(33,150,243,.25)');
    _r(c,x,y,12,1,'rgba(255,255,255,.15)');
    _r(c,x+5,y,1,10,'rgba(0,0,0,.15)');
    _r(c,x,y+4,12,1,'rgba(0,0,0,.1)');
    _r(c,x,y,1,10,'rgba(255,255,255,.1)');
  });
  // glass door
  _r(c,22,38,12,18,'#0d1257'); _r(c,23,39,10,17,'rgba(33,150,243,.2)');
  _r(c,26,42,4,4,'#ffd700');
  // antenna
  _r(c,24,0,8,14,'#546e7a'); _r(c,25,1,6,12,'#607d8b');
  _r(c,26,14,4,6,'#e53935'); _r(c,26,16,4,3,'#fafafa'); _r(c,26,19,4,3,'#1565c0');
  _r(c,24,12,8,2,'#455a64');
  // building highlight
  _r(c,2,18,52,3,'rgba(255,255,255,.08)');
});

// Goalpost → Server rack tower
SPR.goalpost = () => _px('goal', 40, 48, (c) => {
  _r(c,12,2,16,44,'#263238'); _r(c,13,3,14,42,'#37474f');
  _r(c,13,3,14,2,'rgba(255,255,255,.1)');
  // servers in rack
  for(let i=0;i<8;i++){
    const y=4+i*5;
    _r(c,14,y,12,4,'#1c313a');
    _r(c,15,y+1,2,2,i%3===0?'#4caf50':i%3===1?'#2196f3':'#ff9800');
    _r(c,18,y+1,8,1,'rgba(255,255,255,.08)');
  }
  // cables
  _r(c,10,10,4,30,'#1a1a1a'); _r(c,26,8,4,32,'#212121');
  _r(c,8,2,4,2,'#546e7a'); _r(c,28,2,4,2,'#546e7a');
  c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(20,48,14,4,0,0,Math.PI*2); c.fill();
});

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
