/* =========================================================
   소리 · 목소리(TTS) · 효과음 · 배경음악
   ========================================================= */
let koVoice = null;
function pickVoice(){try{const vs=speechSynthesis.getVoices();koVoice=vs.find(v=>/^ko/i.test(v.lang)&&/female|여|Heami|SunHi|Yuna/i.test(v.name))||vs.find(v=>/^ko/i.test(v.lang))||null}catch(e){}}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function say(t){
  if(!CFG.voice||!('speechSynthesis' in window)||!t)return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(noEmoji(String(t).replace(/<[^>]+>/g,'')));
    u.lang='ko-KR'; if(koVoice)u.voice=koVoice; u.rate=CFG.voiceRate; u.pitch=1.25;
    speechSynthesis.speak(u);
  }catch(e){}
}
function hush(){try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}

let AC = null;
function ac(){
  if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}
  if(AC&&AC.state==='suspended')AC.resume();
  return AC;
}
function tone(f,d=.15,type='sine',vol=.14,delay=0){
  const a=ac(); if(!a||!CFG.sfx)return;
  const o=a.createOscillator(), g=a.createGain(), t=a.currentTime+delay;
  o.type=type; o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+.02); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t+d+.05);
}
const sfx = {
  pop:   ()=>tone(880,.12,'triangle'),
  click: ()=>tone(620,.06,'square',.04),
  soft:  ()=>tone(300,.18,'sine',.07),
  coin:  ()=>{tone(1320,.08,'square',.05);tone(1760,.16,'square',.05,.07)},
  chime: ()=>[660,880,1320].forEach((f,i)=>tone(f,.28,'sine',.12,i*.08)),
  sticker:()=>[784,988,1175,1568].forEach((f,i)=>tone(f,.2,'triangle',.1,i*.07)),
  fanfare:()=>[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,.32,'triangle',.13,i*.13)),
  drum:  ()=>{for(let i=0;i<18;i++)tone(140+(i%2)*30,.08,'square',.05,i*.1)},
  whoosh:()=>{const a=ac();if(!a||!CFG.sfx)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime;o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(1200,t+.25);g.gain.setValueAtTime(.06,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.32)},
};

/* ---------- 배경음악 (직접 연주하는 작은 오르골) ---------- */
const TRACKS = {
  title:  {bpm:84, m:'E5 - G5 - C6 - B5 A5 G5 - E5 - D5 - - - F5 - A5 - D6 - C6 B5 C6 - G5 - E5 - - -', b:'C3 C3 A2 A2 F2 F2 G2 G2 D3 D3 F2 F2 C3 C3 G2 G2'},
  home:   {bpm:100,m:'C5 E5 G5 E5 F5 A5 G5 - E5 G5 C6 G5 A5 G5 E5 - D5 F5 A5 F5 G5 E5 C5 - D5 E5 F5 D5 C5 - - -', b:'C3 C3 F3 F3 C3 C3 F3 F3 D3 D3 G2 G2 G2 G2 C3 C3'},
  winter: {bpm:92, m:'G5 E5 E5 - F5 D5 D5 - C5 D5 E5 F5 G5 G5 G5 - G5 E5 E5 - F5 D5 D5 - C5 E5 G5 G5 C5 - - -', b:'C3 C3 G2 G2 C3 C3 G2 G2 C3 C3 G2 G2 C3 G2 C3 C3'},
  town:   {bpm:108,m:'G4 C5 E5 G5 E5 C5 D5 - F4 A4 D5 F5 E5 C5 B4 - G4 C5 E5 G5 A5 G5 E5 C5 D5 E5 D5 B4 C5 - - -', b:'C3 E3 F3 G3 F2 A2 G2 G2 C3 E3 F3 F3 G2 G2 C3 C3'},
  adventure:{bpm:120,m:'C5 D5 E5 G5 E5 D5 C5 G4 A4 C5 D5 E5 D5 C5 A4 - F4 A4 C5 F5 E5 C5 A4 C5 G4 B4 D5 G5 F5 D5 B4 -', b:'C3 G2 C3 G2 A2 E3 A2 E3 F2 C3 F2 C3 G2 D3 G2 D3'},
  contest:{bpm:112,m:'G4 C5 C5 E5 G5 - E5 C5 D5 F5 F5 A5 G5 - - - E5 G5 C6 G5 A5 F5 D5 F5 E5 C5 D5 B4 C5 - - -', b:'C3 G2 C3 G2 F2 C3 G2 G2 C3 E3 F3 D3 G2 G2 C3 C3'},
  ending: {bpm:76, m:'C5 - E5 G5 A5 - G5 - F5 - E5 D5 E5 - - - A4 - C5 F5 E5 - D5 - C5 - D5 E5 C5 - - -', b:'C3 C3 A2 A2 F2 F2 G2 G2 F2 F2 G2 G2 C3 C3 C3 C3'},
  game:   {bpm:128,m:'E5 E5 G5 E5 C5 D5 E5 - A4 C5 E5 C5 D5 B4 G4 - E5 E5 G5 A5 G5 E5 C5 D5 E5 D5 C5 B4 C5 - - -', b:'C3 G2 A2 E2 F2 C3 G2 G2 C3 G2 A2 E2 F2 G2 C3 C3'},
};
const NOTE_IDX = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function noteFreq(n){
  if(!n||n==='-')return 0;
  const m=n.match(/^([A-G])(#?)(\d)$/); if(!m)return 0;
  const midi=12*(+m[3]+1)+NOTE_IDX[m[1]]+(m[2]?1:0);
  return 440*Math.pow(2,(midi-69)/12);
}
for(const t of Object.values(TRACKS)){t.mel=t.m.split(/\s+/).map(noteFreq);t.bas=t.b.split(/\s+/).map(noteFreq)}
const BGM = {cur:null, want:null, timer:null, next:0, step:0, bus:null};
function bgmNote(f,t,d,type,vol){
  const a=AC; const o=a.createOscillator(), g=a.createGain();
  o.type=type; o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+.03); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g).connect(BGM.bus); o.start(t); o.stop(t+d+.05);
}
function bgmTick(){
  const T=TRACKS[BGM.cur]; if(!T||!AC)return;
  const spb=60/T.bpm/2;
  while(BGM.next<AC.currentTime+.25){
    const i=BGM.step%T.mel.length, f=T.mel[i];
    if(f)bgmNote(f,BGM.next,spb*1.6,'triangle',.5);
    if(i%2===0){const b=T.bas[(i/2)%T.bas.length];if(b)bgmNote(b,BGM.next,spb*1.9,'sine',.55)}
    BGM.next+=spb; BGM.step++;
  }
}
function bgm(name){
  BGM.want=name;
  if(!CFG.bgm){bgmStop(true);return}
  if(BGM.cur===name&&BGM.timer)return;
  const a=ac(); if(!a)return;
  bgmStop(true);
  BGM.cur=name; BGM.step=0; BGM.next=a.currentTime+.15;
  BGM.bus=a.createGain(); BGM.bus.gain.setValueAtTime(.0001,a.currentTime); BGM.bus.gain.exponentialRampToValueAtTime(.06,a.currentTime+1.2);
  BGM.bus.connect(a.destination);
  BGM.timer=setInterval(bgmTick,60); bgmTick();
}
function bgmStop(keepWant){
  if(BGM.timer)clearInterval(BGM.timer);
  if(BGM.bus&&AC){const b=BGM.bus;try{b.gain.cancelScheduledValues(AC.currentTime);b.gain.setValueAtTime(b.gain.value,AC.currentTime);b.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.4)}catch(e){}setTimeout(()=>{try{b.disconnect()}catch(e){}},600)}
  BGM.timer=null; BGM.cur=null; BGM.bus=null;
  if(!keepWant)BGM.want=null;
}
