// CS Quest — Pixel Art Sprite Library v3
// สไตล์ Pixel Agents: 16×31 characters, detailed uniforms & faces
'use strict';
const SPR={};
const _C=new Map();
function _px(key,w,h,fn){
  if(_C.has(key))return _C.get(key);
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d');x.imageSmoothingEnabled=false;fn(x);
  if(_C.size>1000)_C.clear();_C.set(key,c);return c;
}
const _r=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h);};

// ── shared base (shadow + shoes + skin + neck + ears + head) ──
function _base(c,skin,shoe){
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(8,30,6,2,0,0,Math.PI*2);c.fill();
  _r(c,3,27,5,3,shoe);_r(c,8,27,5,3,shoe);_r(c,2,28,4,2,shoe);_r(c,10,28,4,2,shoe);
  _r(c,4,3,8,9,skin);_r(c,3,6,2,3,skin);_r(c,11,6,2,3,skin);_r(c,6,11,4,2,skin);
}
function _eyes(c,col,shine){
  _r(c,5,6,3,2,'#fff');_r(c,8,6,3,2,'#fff');
  _r(c,6,6,2,2,col);_r(c,9,6,2,2,col);
  if(shine){_r(c,6,6,1,1,'rgba(255,255,255,0.7)');_r(c,9,6,1,1,'rgba(255,255,255,0.7)');}
}
function _brow(c,col){_r(c,5,5,3,1,col);_r(c,8,5,3,1,col);}
function _smile(c){_r(c,6,9,4,1,'#c47a60');_r(c,5,9,1,1,'#a05040');_r(c,10,9,1,1,'#a05040');}
function _mouth(c){_r(c,6,9,4,1,'#c47a60');}
function _glasses(c,lensCol){
  _r(c,4,6,4,3,lensCol||'rgba(100,180,255,0.28)');
  _r(c,4,6,4,1,'#1a1a2e');_r(c,4,8,4,1,'#1a1a2e');_r(c,4,6,1,3,'#1a1a2e');_r(c,7,6,1,3,'#1a1a2e');
  _r(c,8,6,4,3,lensCol||'rgba(100,180,255,0.28)');
  _r(c,8,6,4,1,'#1a1a2e');_r(c,8,8,4,1,'#1a1a2e');_r(c,11,6,1,3,'#1a1a2e');
  _r(c,7,7,2,1,'#333');_r(c,3,7,1,1,'#1a1a2e');_r(c,12,7,1,1,'#1a1a2e');
  _r(c,5,6,1,1,'rgba(255,255,255,0.5)');_r(c,9,6,1,1,'rgba(255,255,255,0.5)');
}

// walk frame: 0=stand,1=left,2=right  (offset leg y by ±2)
function _legs(c,col,fr,shoe){
  const a=fr===1?-2:fr===2?2:0;
  _r(c,4,21,4,8,col);_r(c,8,21,4,8,col);
  if(fr){_r(c,4,21+a,4,6,col+'dd');_r(c,8,21-a,4,6,col+'dd');}
  _r(c,3,27,5,3,shoe);_r(c,8,27,5,3,shoe);_r(c,2,28,4,2,shoe);_r(c,10,28,4,2,shoe);
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(8,30,6,2,0,0,Math.PI*2);c.fill();
}

// ═══ PLAYER 0: Student Boy ═══
SPR.p0=(dir,fr,mv)=>_px(`p0${dir}${mv?fr>>3&3:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _legs(c,'#1a237e',wk,'#1a1a2e');
  _r(c,3,13,10,9,'#f5f5f5');_r(c,2,14,2,7,'#f5f5f5');_r(c,12,14,2,7,'#f5f5f5');
  _r(c,3,20,10,2,'#1a237e');
  _r(c,6,13,4,3,'#1a237e');_r(c,6,13,2,2,'#f5f5f5');_r(c,8,13,2,2,'#f5f5f5');
  _r(c,7,13,2,7,'#e53935');_r(c,7,15,2,3,'#b71c1c');
  _r(c,7,15,2,1,'#ddd');_r(c,7,17,2,1,'#ddd');
  _r(c,12,14,1,9,'#4a7a2e');_r(c,13,15,3,8,'#3a6a1e');_r(c,13,16,3,6,'#4a7a2e');
  _base(c,'#f5c5a3','#1a1a2e');
  _r(c,4,3,8,4,'#1a0a00');_r(c,4,4,2,5,'#1a0a00');_r(c,10,4,2,4,'#1a0a00');
  _brow(c,'#2a1a00');_eyes(c,'#1a1a2e',true);_smile(c);
});

// ═══ PLAYER 1: Student Girl ═══
SPR.p1=(dir,fr,mv)=>_px(`p1${dir}${mv?fr>>3&2:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _r(c,3,19,10,9,'#e53935');_r(c,2,22,12,6,'#ef5350');
  _r(c,4,27,3,3,'#f5c5a3');_r(c,9,27,3,3,'#f5c5a3');
  if(wk){_r(c,4,25+wk,3,3,'#e8b48a');} 
  _r(c,3,29,4,2,'#1a1a2e');_r(c,9,29,4,2,'#1a1a2e');
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(8,30,6,2,0,0,Math.PI*2);c.fill();
  _r(c,3,13,10,8,'#fff');_r(c,2,14,2,6,'#fff');_r(c,12,14,2,6,'#fff');
  _r(c,6,13,4,3,'#e53935');_r(c,6,13,2,2,'#fff');_r(c,8,13,2,2,'#fff');
  _r(c,5,12,3,3,'#e53935');_r(c,8,12,3,3,'#e53935');_r(c,7,12,2,3,'#c62828');_r(c,6,13,4,1,'#ef5350');
  _base(c,'#f5c5a3','#1a1a2e');
  _r(c,4,3,8,5,'#1a0a00');_r(c,3,5,2,10,'#1a0a00');_r(c,11,5,2,10,'#1a0a00');
  _r(c,3,13,2,4,'#2d0d0d');_r(c,11,13,2,4,'#2d0d0d');
  _r(c,11,3,4,3,'#e53935');_r(c,12,2,2,2,'#ff6b6b');
  _brow(c,'#1a0a00');_eyes(c,'#1a1a2e',true);
  _r(c,5,5,1,1,'#1a0a00');_r(c,7,5,1,1,'#1a0a00');_r(c,8,5,1,1,'#1a0a00');_r(c,10,5,1,1,'#1a0a00');
  _smile(c);
});

// ═══ PLAYER 2: Casual Boy hoodie ═══
SPR.p2=(dir,fr,mv)=>_px(`p2${dir}${mv?fr>>3&2:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _legs(c,'#3e3e5e',wk,'#2a2a40');
  _r(c,3,28,4,2,'#e0e0e0');_r(c,9,28,4,2,'#e0e0e0');
  _r(c,3,13,10,10,'#ff6f00');_r(c,2,14,2,8,'#ff6f00');_r(c,12,14,2,8,'#ff6f00');
  _r(c,3,13,10,3,'#e65100');_r(c,5,13,6,2,'#ff6f00');
  _r(c,5,20,6,3,'#e65100');_r(c,6,21,1,1,'#cc5500');_r(c,9,21,1,1,'#cc5500');
  _base(c,'#f5c5a3','#2a2a40');
  _r(c,4,3,8,4,'#4a2c0a');_r(c,4,4,1,5,'#3a1a00');_r(c,11,4,1,4,'#3a1a00');
  _r(c,3,2,10,3,'#1565c0');_r(c,2,4,12,2,'#1976d2');_r(c,2,3,14,2,'#1565c0');_r(c,2,4,2,2,'#0d47a1');
  _brow(c,'#3a1a00');_eyes(c,'#1a1a2e',true);_mouth(c);
});

// ═══ PLAYER 3: Police Officer ═══
SPR.p3=(dir,fr,mv)=>_px(`p3${dir}${mv?fr>>3&2:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _legs(c,'#1a237e',wk,'#111');
  _r(c,3,29,4,2,'#222');_r(c,9,29,4,2,'#222');
  _r(c,3,13,10,10,'#1565c0');_r(c,2,14,2,8,'#1565c0');_r(c,12,14,2,8,'#1565c0');
  _r(c,6,13,4,10,'#0d47a1');
  _r(c,2,14,3,2,'#ffd700');_r(c,11,14,3,2,'#ffd700');
  _r(c,5,15,5,4,'#ffd700');_r(c,6,16,3,3,'#1565c0');_r(c,7,16,1,1,'#ffd700');
  _r(c,3,21,10,2,'#111');_r(c,7,21,2,2,'#ffd700');
  _r(c,12,22,3,4,'#1a1a2e');_r(c,13,23,2,3,'#333');
  _base(c,'#e8b48a','#111');
  _r(c,3,2,10,4,'#1a237e');_r(c,2,5,12,2,'#283593');_r(c,1,6,14,2,'#1a237e');
  _r(c,4,1,8,3,'#1565c0');_r(c,6,3,4,2,'#ffd700');_r(c,7,2,2,3,'#ffca28');
  _brow(c,'#2a1a00');_eyes(c,'#0d47a1',true);
  _r(c,5,9,6,2,'#4a2010');_r(c,5,9,3,1,'#5a2a10');_r(c,8,9,3,1,'#5a2a10');// mustache
});

// ═══ PLAYER 4: Wizard ═══
SPR.p4=(dir,fr,mv)=>_px(`p4${dir}${mv?fr>>3&2:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _legs(c,'#4a148c',wk,'#2a0060');
  _r(c,3,13,10,10,'#6a1b9a');_r(c,2,14,2,8,'#7b1fa2');_r(c,12,14,2,8,'#7b1fa2');
  _r(c,3,20,10,3,'#7b1fa2');_r(c,2,22,12,4,'#8e24aa');
  _r(c,6,13,4,10,'#4a148c');
  _r(c,4,16,2,2,'#ffd700');_r(c,5,15,1,1,'#ffd700');_r(c,4,17,1,1,'#ffd700');_r(c,5,17,1,1,'#ffd700');
  _r(c,10,19,2,2,'#ffd700');_r(c,11,18,1,1,'#ffd700');
  _r(c,13,12,1,10,'#5d3a1a');_r(c,12,11,3,2,'#ffd700');_r(c,13,10,1,2,'#fff');
  _base(c,'#f0d0a0','#2a0060');
  _r(c,5,0,6,5,'#4a148c');_r(c,4,4,8,2,'#6a1b9a');_r(c,3,5,10,3,'#7b1fa2');
  _r(c,6,1,4,3,'#7b1fa2');_r(c,7,0,2,2,'#ffd700');
  _r(c,5,9,6,4,'#e0e0e0');_r(c,6,12,4,6,'#bdbdbd');_r(c,7,17,2,4,'#9e9e9e');
  _brow(c,'#e0e0e0');_eyes(c,'#4a148c',true);
});

// ═══ PLAYER 5: Smart Girl with glasses ═══
SPR.p5=(dir,fr,mv)=>_px(`p5${dir}${mv?fr>>3&2:0}`,16,31,c=>{
  const wk=mv?fr>>3&2:0;
  _r(c,3,19,10,9,'#1565c0');_r(c,2,22,12,6,'#1976d2');
  _r(c,4,27,3,3,'#f5c5a3');_r(c,9,27,3,3,'#f5c5a3');
  if(wk){_r(c,4,25+wk,3,3,'#e8b48a');}
  _r(c,3,29,4,2,'#1a1a2e');_r(c,9,29,4,2,'#1a1a2e');
  c.fillStyle='rgba(0,0,0,0.22)';c.beginPath();c.ellipse(8,30,6,2,0,0,Math.PI*2);c.fill();
  _r(c,3,13,10,8,'#e8f5e9');_r(c,2,14,2,6,'#e8f5e9');_r(c,12,14,2,6,'#e8f5e9');
  _r(c,4,14,8,7,'#2e7d32');_r(c,7,13,2,8,'#1b5e20');_r(c,4,14,8,2,'#388e3c');
  _r(c,0,14,3,9,'#e53935');_r(c,0,15,3,7,'#ef5350');_r(c,0,17,3,1,'#ffcdd2');_r(c,0,19,3,1,'#ffcdd2');
  _base(c,'#f5c5a3','#1a1a2e');
  _r(c,4,3,8,5,'#5d2e0c');_r(c,3,5,2,7,'#6d3e1c');_r(c,11,5,2,7,'#6d3e1c');
  _r(c,4,9,2,4,'#7a4a22');_r(c,10,9,2,4,'#7a4a22');
  _brow(c,'#3a1a00');_eyes(c,'#1a1a2e',true);_glasses(c);_smile(c);
});

// ═══ NPC 0: Teacher (ครู) ═══
SPR.npc0=(fr)=>_px(`npc0_${fr>>5&1}`,16,31,c=>{
  const b=(fr>>5)&1;
  _r(c,4,21,4,8+b,'#1a237e');_r(c,8,21,4,8+b,'#1a237e');
  _r(c,3,28,5,3,'#111');_r(c,8,28,5,3,'#111');
  _r(c,3,13,10,10,'#37474f');_r(c,2,14,2,8,'#37474f');_r(c,12,14,2,8,'#37474f');
  _r(c,6,13,4,10,'#263238');_r(c,5,13,2,5,'#eceff1');_r(c,9,13,2,5,'#eceff1');
  _r(c,7,13,2,8,'#e53935');_r(c,7,15,2,4,'#b71c1c');_r(c,7,18,2,2,'#ef5350');
  _r(c,12,15,2,2,'#fff');_r(c,12,15,2,1,'#e53935');
  _r(c,13,13,4,11,'#ff9800');_r(c,13,14,4,9,'#ffa726');_r(c,14,12,2,2,'#795548');
  _r(c,14,15,3,1,'#fff');_r(c,14,17,3,1,'#fff');_r(c,14,19,2,1,'#fff');
  _base(c,'#f0c090','#111');
  _r(c,4,3,8,4,'#1a0a00');_r(c,4,4,2,5,'#1a0a00');_r(c,10,4,2,4,'#1a0a00');
  _brow(c,'#2a1a00');_eyes(c,'#263238',true);_glasses(c,'rgba(120,180,255,0.22)');_smile(c);
});

// ═══ NPC 1: Programmer ═══
SPR.npc1=(fr)=>_px(`npc1_${fr>>5&1}`,16,31,c=>{
  const b=(fr>>5)&1;
  _r(c,4,21,4,8+b,'#212121');_r(c,8,21,4,8+b,'#212121');
  _r(c,3,28,5,3,'#111');_r(c,8,28,5,3,'#111');
  _r(c,3,13,10,10,'#263238');_r(c,2,14,2,8,'#263238');_r(c,12,14,2,8,'#263238');
  _r(c,4,13,8,3,'#1c313a');_r(c,5,13,6,2,'#263238');_r(c,5,20,6,3,'#1c313a');
  _r(c,5,16,6,5,'#37474f');_r(c,6,17,4,3,'#546e7a');
  _r(c,7,17,1,1,'#4caf50');_r(c,9,17,2,1,'#4caf50');_r(c,7,18,2,1,'#2196f3');
  _r(c,3,5,2,5,'#37474f');_r(c,11,5,2,5,'#37474f');_r(c,3,5,2,3,'#455a64');_r(c,11,5,2,3,'#455a64');
  _r(c,13,21,4,6,'#fff');_r(c,14,22,3,4,'#795548');_r(c,13,26,4,1,'#bdbdbd');_r(c,16,23,2,2,'#fff');
  _base(c,'#f5c5a3','#111');
  _r(c,4,3,8,5,'#1a1a1a');_r(c,3,4,2,4,'#111');_r(c,11,4,2,4,'#111');
  _r(c,4,3,3,2,'#222');_r(c,9,3,3,2,'#111');
  _brow(c,'#111');_eyes(c,'#263238',true);_mouth(c);
});

// ═══ NPC 2: Data Analyst ═══
SPR.npc2=(fr)=>_px(`npc2_${fr>>5&1}`,16,31,c=>{
  const b=(fr>>5)&1;
  _r(c,4,21,4,8+b,'#37474f');_r(c,8,21,4,8+b,'#37474f');
  _r(c,3,28,5,3,'#263238');_r(c,8,28,5,3,'#263238');
  _r(c,3,13,10,10,'#e65100');_r(c,2,14,2,8,'#e65100');_r(c,12,14,2,8,'#e65100');
  _r(c,6,13,4,10,'#bf360c');_r(c,5,13,2,5,'#fff');_r(c,9,13,2,5,'#fff');
  _r(c,6,15,4,5,'#fff');_r(c,6,15,4,1,'#1976d2');_r(c,7,17,3,1,'#9e9e9e');_r(c,7,18,2,1,'#bdbdbd');_r(c,6,14,4,1,'#1976d2');
  _r(c,13,13,4,12,'#37474f');_r(c,13,14,4,10,'#1565c0');_r(c,14,15,3,2,'#1976d2');_r(c,14,18,3,1,'#90caf9');_r(c,14,20,2,1,'#4fc3f7');
  _base(c,'#d4956a','#263238');
  _r(c,4,3,8,4,'#1a0a00');_r(c,4,4,2,5,'#1a0a00');_r(c,10,4,2,4,'#1a0a00');
  _brow(c,'#2a1a00');_eyes(c,'#1a1a2e',true);_mouth(c);
});

// ═══ NPC 3: Cyber Security ═══
SPR.npc3=(fr)=>_px(`npc3_${fr>>5&1}`,16,31,c=>{
  const b=(fr>>5)&1;
  _r(c,4,21,4,8+b,'#1b5e20');_r(c,8,21,4,8+b,'#1b5e20');
  _r(c,3,28,5,3,'#0a3d12');_r(c,8,28,5,3,'#0a3d12');
  _r(c,3,13,10,10,'#2e7d32');_r(c,2,14,2,8,'#2e7d32');_r(c,12,14,2,8,'#2e7d32');
  _r(c,4,14,8,8,'#1b5e20');_r(c,5,14,6,3,'#388e3c');
  _r(c,5,18,3,3,'#4caf50');_r(c,8,18,3,3,'#4caf50');
  _r(c,6,14,4,2,'#ffd700');_r(c,6,16,4,4,'#ffd700');_r(c,7,17,2,3,'#1b5e20');_r(c,7,17,2,1,'#ffd700');
  _base(c,'#f5c5a3','#0a3d12');
  _r(c,3,2,10,5,'#2e7d32');_r(c,4,3,8,6,'#388e3c');_r(c,3,6,10,3,'#1b5e20');
  _r(c,5,6,3,2,'#1b5e20');_r(c,8,6,3,2,'#1b5e20');
  _r(c,6,6,2,2,'rgba(0,255,80,0.85)');_r(c,9,6,2,2,'rgba(0,255,80,0.85)');
  _r(c,6,6,1,1,'rgba(200,255,200,0.9)');_r(c,9,6,1,1,'rgba(200,255,200,0.9)');
  _r(c,5,9,6,2,'#263238');_r(c,6,9,4,1,'#37474f');
});

// ═══ ENV TILES 32×32 ═══
const _GT={
  school:['#d0c098','#cdb890','#d4c4a2','#c8b488'],
  forest:['#3a7020','#3d7422','#407826','#386e1e'],
  town:  ['#c8b47a','#c4b076','#ccb87e','#c0aa72'],
  stadium:['#4a9a2a','#489828','#4c9c2c','#50a030'],
};
const _PT={
  school:['#c8b48a','#c4b086','#ccb88e','#c0aa82'],
  forest:['#8a6a3a','#866638','#8e6e3c','#927240'],
  town:  ['#d4c07a','#d0bc76','#d8c47e','#dcc882'],
  stadium:['#e8d84a','#e4d446','#eadc4e','#eee052'],
};
SPR.ground=(th,tx,ty)=>_px(`G${th}${(tx*3+ty*7)%8}`,32,32,c=>{
  c.fillStyle=(_GT[th]||_GT.forest)[(tx*3+ty*7)%4];c.fillRect(0,0,32,32);
  if((tx*5+ty*3)%9===0){c.fillStyle='rgba(255,255,255,.05)';c.fillRect(4,6,1,7);c.fillRect(10,4,1,9);c.fillRect(18,7,1,6);}
  if(th==='stadium'&&ty===(24>>1)&&tx>1&&tx<30){c.fillStyle='rgba(255,255,255,.12)';c.fillRect(0,15,32,2);}
  if(th==='stadium'&&tx===(28>>1)&&ty>1&&ty<22){c.fillStyle='rgba(255,255,255,.12)';c.fillRect(15,0,2,32);}
});
SPR.path=(th,tx,ty)=>_px(`P${th}${(tx+ty)%4}`,32,32,c=>{
  c.fillStyle=(_PT[th]||_PT.forest)[(tx+ty)%4];c.fillRect(0,0,32,32);
  c.fillStyle='rgba(0,0,0,.07)';c.fillRect(0,0,32,1);c.fillRect(0,0,1,32);
  c.fillStyle='rgba(255,255,255,.08)';c.fillRect(1,1,31,1);c.fillRect(1,1,1,31);
  if((tx*7+ty*3)%8===0){c.fillStyle='rgba(0,0,0,.06)';c.fillRect(4,14,24,2);}
});
SPR.water=(fr,tx,ty)=>_px(`W${fr%16}`,32,32,c=>{
  c.fillStyle=['#1565c0','#1976d2','#0d47a1'][(tx+ty)%3];c.fillRect(0,0,32,32);
  const w=Math.floor(fr/4)%32;
  c.fillStyle='rgba(255,255,255,.1)';c.fillRect((tx*7+w)%32,6,5,2);c.fillRect((tx*5+w+16)%32,20,7,2);
  c.fillStyle='rgba(255,255,255,.06)';c.fillRect(0,12,32,1);c.fillRect(0,26,32,1);
});
SPR.wall=(th,tx,ty)=>_px(`WL${th}${(tx+ty*2)%4}`,32,32,c=>{
  const cols={school:['#8b6f47','#a08050','#c09860'],forest:['#2d5a1b','#1a4a0a','#366622'],town:['#8a6a4a','#a07858','#b88a68'],stadium:['#607080','#708090','#8090a0']};
  const[d,m,top]=(cols[th]||cols.town);
  c.fillStyle=d;c.fillRect(0,0,32,32);
  const odd=ty%2===0;
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    const bx=(col*8)+(odd&&row%2===0?-4:0),by=row*8;
    c.fillStyle=m;c.fillRect(bx+1,by+1,7,7);
    c.fillStyle='rgba(255,255,255,.1)';c.fillRect(bx+1,by+1,7,1);
    c.fillStyle='rgba(0,0,0,.15)';c.fillRect(bx+1,by+7,7,1);
  }
  c.fillStyle=top;c.fillRect(0,0,32,3);
});

// ═══ DECORATIONS ═══
SPR.tree=(v)=>_px(`TR${v}`,48,56,c=>{
  const[d,m,l,hi]=[['#1a3a0d','#2e6b1a','#4a9627','#7ec850'],['#173012','#266020','#3d8622','#66aa38'],['#223808','#365814','#548a20','#7ab840']][v%3];
  _r(c,20,38,8,18,'#5d3a1a');_r(c,21,39,4,16,'#7a4e24');_r(c,22,40,2,14,'#8d6030');
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(24,55,14,4,0,0,Math.PI*2);c.fill();
  [[4,26,40,24,d],[2,20,44,26,m],[5,15,38,20,m],[8,10,32,14,l],[10,6,28,10,l],[12,3,24,7,hi],[14,1,20,5,hi]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  [[2,28,6,10,d],[40,28,6,10,d],[3,22,4,10,m],[41,22,4,10,m]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  [[14,10],[20,5],[28,10],[10,18],[34,18]].forEach(([x,y])=>{c.fillStyle='rgba(255,255,255,.24)';c.fillRect(x,y,3,3);});
});
SPR.bush=(v)=>_px(`BU${v}`,36,28,c=>{
  const[d,m,l]=[['#1a5a0d','#2d8020','#44a030'],['#1a4a2a','#2a6a3a','#3a8a4a'],['#3a5a0a','#5a7a1a','#7a9a28']][v%3];
  c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(18,26,15,4,0,0,Math.PI*2);c.fill();
  [[2,10,12,16,d],[22,10,12,16,d],[7,8,22,18,m],[5,7,26,16,m],[9,5,18,12,l],[11,3,14,9,l]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  c.fillStyle='rgba(255,255,255,.22)';c.fillRect(13,5,5,5);
});
SPR.flower=(v)=>_px(`FL${v}`,24,32,c=>{
  const[p1,p2,hi]=[['#ff6b9d','#e91e63','#ffb3cc'],['#ffee44','#ffc107','#fff9c4'],['#ce93d8','#9c27b0','#f3e5f5'],['#4dd0e1','#0097a7','#e0f7fa']][v%4];
  _r(c,11,21,2,11,'#388e3c');_r(c,5,25,8,3,'#4caf50');_r(c,13,23,8,3,'#4caf50');
  [[5,11,6,6],[13,11,6,6],[6,17,6,6],[12,17,6,6],[8,9,8,4],[8,19,8,4]].forEach(([x,y,w,h])=>_r(c,x,y,w,h,p1));
  _r(c,7,10,10,10,p1);_r(c,8,12,8,8,p2);_r(c,10,13,4,4,hi);_r(c,11,13,2,2,'#fff');
});
SPR.rock=(v)=>_px(`RK${v}`,32,24,c=>{
  const[d,m,l,hi]=[['#455a64','#607d8b','#90a4ae','#b0bec5'],['#4e342e','#6d4c41','#8d6e63','#a1887f'],['#37474f','#546e7a','#78909c','#90a4ae']][v%3];
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(16,23,13,3.5,0,0,Math.PI*2);c.fill();
  [[2,12,28,11,d],[4,9,24,12,m],[5,8,22,10,m],[7,5,18,8,l],[9,4,14,6,hi]].forEach(([x,y,w,h,col])=>_r(c,x,y,w,h,col));
  c.fillStyle='rgba(255,255,255,.3)';c.fillRect(9,7,6,4);
});
SPR.chest=(open,fr)=>_px(`CH${open?1:0}_${fr%8}`,32,30,c=>{
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(16,28,12,3,0,0,Math.PI*2);c.fill();
  _r(c,3,16,26,12,'#5d3a1a');_r(c,4,17,24,10,'#7a4e24');_r(c,5,18,22,8,'#8d5e30');
  if(open){
    _r(c,3,8,26,10,'#7a4e24');_r(c,4,9,24,8,'#9a6a34');
    if(fr%10<5){[[7,5],[12,3],[18,6],[10,2],[15,1]].forEach(([x,y])=>{c.fillStyle='#ffd700';c.fillRect(x,y,3,3);c.fillStyle='#fff8';c.fillRect(x,y,1,1);});}
  }else{_r(c,3,9,26,9,'#7a4e24');_r(c,4,10,24,7,'#9a6a34');}
  c.fillStyle='#ffd700';c.beginPath();c.arc(16,22,3.5,0,Math.PI*2);c.fill();
  c.strokeStyle='#ffd700';c.lineWidth=2.5;c.beginPath();c.arc(16,19.5,3,Math.PI,0);c.stroke();
  [[4,17],[28,17],[4,26],[28,26]].forEach(([x,y])=>{c.fillStyle='#ffd700';c.beginPath();c.arc(x,y,2,0,Math.PI*2);c.fill();});
  _r(c,4,20,24,1,'rgba(0,0,0,.12)');_r(c,4,24,24,1,'rgba(0,0,0,.12)');
});
SPR.star=(fr)=>_px(`ST${fr%12}`,20,28,c=>{
  const b=Math.sin(fr*0.25)*3|0;
  c.fillStyle='rgba(0,0,0,.15)';c.beginPath();c.ellipse(10,27,6,2,0,0,Math.PI*2);c.fill();
  c.save();c.translate(10,12+b);
  c.fillStyle='rgba(255,200,0,0.18)';c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?4:13;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();
  c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?3:10;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();
  c.fillStyle='#ffd700';c.fill();c.strokeStyle='#ff9800';c.lineWidth=1;c.stroke();
  c.fillStyle='rgba(255,255,255,.55)';c.fillRect(-3,-4,4,4);c.restore();
});
SPR.fence=()=>_px('FN',32,22,c=>{
  _r(c,0,10,32,5,'#8d6e3a');_r(c,0,11,32,2,'#a0825a');_r(c,0,15,32,2,'#a0825a');
  [0,12,24].forEach(x=>{_r(c,x,5,4,16,'#8d6e3a');_r(c,x+1,6,2,4,'#a0825a');_r(c,x,4,4,3,'#6d4e2a');});
});
SPR.school=()=>_px('SC',56,56,c=>{
  _r(c,2,18,52,36,'#c8966a');_r(c,4,20,48,32,'#d4a870');
  _r(c,0,12,56,8,'#a07840');_r(c,2,10,52,6,'#b08848');_r(c,4,8,48,4,'#c09858');
  [[6,22],[20,22],[34,22],[6,38],[20,38],[34,38]].forEach(([x,y])=>{_r(c,x,y,12,10,'#87ceeb');_r(c,x,y,12,1,'#90d8f0');_r(c,x+5,y,1,10,'rgba(0,0,0,.2)');_r(c,x,y+4,12,1,'rgba(0,0,0,.2)');});
  _r(c,22,38,12,18,'#7a5020');_r(c,23,39,10,17,'#5a3010');
  _r(c,24,0,8,14,'#aaa');_r(c,26,14,4,6,'#e53935');_r(c,26,16,4,3,'#fff');_r(c,26,19,4,3,'#1565c0');
  _r(c,2,18,52,4,'rgba(255,255,255,.15)');
});
SPR.goalpost=()=>_px('GP',40,48,c=>{
  _r(c,17,6,6,42,'#e0e0e0');_r(c,18,7,4,40,'#bdbdbd');
  _r(c,2,6,36,6,'#e0e0e0');_r(c,3,7,34,4,'#bdbdbd');
  _r(c,2,6,6,36,'#e0e0e0');_r(c,3,7,4,34,'#bdbdbd');
  _r(c,32,6,6,36,'#e0e0e0');_r(c,33,7,4,34,'#bdbdbd');
  for(let y=8;y<40;y+=4){c.strokeStyle='rgba(255,255,255,0.28)';c.lineWidth=1;c.beginPath();c.moveTo(3,y);c.lineTo(37,y);c.stroke();}
  for(let x=3;x<37;x+=4){c.strokeStyle='rgba(255,255,255,0.28)';c.lineWidth=1;c.beginPath();c.moveTo(x,7);c.lineTo(x,42);c.stroke();}
  c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(20,48,14,4,0,0,Math.PI*2);c.fill();
});
SPR.house=(v)=>_px(`HS${v}`,48,52,c=>{
  const wc=['#ef5350','#42a5f5','#66bb6a','#ffa726','#ab47bc'][v%5];
  _r(c,4,24,40,28,wc+'cc');_r(c,5,25,38,26,wc);
  c.fillStyle='#5d3a1a';c.beginPath();c.moveTo(0,26);c.lineTo(24,4);c.lineTo(48,26);c.closePath();c.fill();
  c.fillStyle='#7a4e24';c.beginPath();c.moveTo(2,26);c.lineTo(24,6);c.lineTo(46,26);c.closePath();c.fill();
  [[6,28],[30,28]].forEach(([x,y])=>{_r(c,x,y,12,12,'#87ceeb');_r(c,x,y,6,12,'rgba(255,150,150,0.25)');_r(c,x,y,12,1,'rgba(255,255,255,.35)');_r(c,x+5,y,1,12,'rgba(0,0,0,.18)');_r(c,x,y+5,12,1,'rgba(0,0,0,.18)');});
  _r(c,20,36,8,16,'#7a5020');_r(c,21,37,6,15,'#5a3010');_r(c,22,40,2,3,'#ffd700');
  _r(c,22,16,4,14,'#9e9e9e');_r(c,22,28,4,2,'#e0e0e0');_r(c,23,17,2,12,'#bdbdbd');
  _r(c,2,24,44,4,'rgba(255,255,255,.15)');
});
SPR.lamp=()=>_px('LM',12,40,c=>{
  _r(c,5,28,2,12,'#78909c');_r(c,4,36,4,4,'#607d8b');
  _r(c,3,24,6,6,'#78909c');_r(c,2,20,8,6,'#90a4ae');
  c.fillStyle='rgba(255,255,150,0.85)';c.beginPath();c.arc(6,22,5,0,Math.PI*2);c.fill();
  c.fillStyle='rgba(255,255,100,0.35)';c.beginPath();c.arc(6,22,8,0,Math.PI*2);c.fill();
  _r(c,5,18,2,5,'#ffd700');
});
SPR.bench=()=>_px('BN',40,20,c=>{
  _r(c,0,6,40,5,'#8d6e3a');_r(c,0,7,40,3,'#a0825a');
  _r(c,2,10,4,10,'#6d4e2a');_r(c,16,10,4,10,'#6d4e2a');_r(c,34,10,4,10,'#6d4e2a');
  _r(c,2,4,4,4,'#6d4e2a');_r(c,34,4,4,4,'#6d4e2a');
  _r(c,0,2,40,4,'#7a5a30');_r(c,1,3,38,2,'#9a7a50');
});

// ═══ PUBLIC API ═══
SPR.getPlayer=(av,dir,fr,mv)=>{
  const fns=[SPR.p0,SPR.p1,SPR.p2,SPR.p3,SPR.p4,SPR.p5];
  return (fns[av]||SPR.p0)(dir||'down',fr||0,mv||false);
};
SPR.getNPC=(lv,fr)=>{
  const fns=[SPR.npc0,SPR.npc1,SPR.npc2,SPR.npc3];
  return fns[(lv-1)%4](fr||0);
};
SPR.clearCache=()=>_C.clear();
