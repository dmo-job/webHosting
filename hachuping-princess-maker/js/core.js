/* =========================================================
   저장 · 설정 · 상태 · 공용 도우미
   ========================================================= */
function load(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function drop(k){try{localStorage.removeItem(k)}catch(e){}}

/* ---------- 부모님 설정 ---------- */
const CFG_DEF = {voice:true, voiceRate:.95, bgm:true, sfx:true, speed:'normal', breakMin:0, charImg:true, pixel:true, refSprite:true};
let CFG = {...CFG_DEF, ...(load('hpm_settings')||{})};
if(load('hpm_sound')==='off'){CFG.voice=false;CFG.sfx=false;CFG.bgm=false}
function saveCfg(){store('hpm_settings',CFG)}
function speedMul(){return CFG.speed==='slow'?1.35:CFG.speed==='fast'?.8:1}

/* ---------- 모든 판에 걸쳐 남는 기록 ---------- */
const META = 'hpm_meta_v1';
let meta = load(META)||{};
function normMeta(){
  meta.owned = (meta.owned||['ribbon','d_pink']).filter(id=>ITEM[id]);
  if(!meta.owned.includes('ribbon'))meta.owned.unshift('ribbon');
  if(!meta.owned.includes('d_pink'))meta.owned.push('d_pink');
  if(!meta.owned.includes('d_hachu'))meta.owned.push('d_hachu');
  meta.endings = (meta.endings||[]).filter(id=>ENDINGS[id]);
  meta.outfit = meta.outfit||{head:null,dress:'d_hachu',hand:null};
  if(!meta.look3){const o=meta.outfit;if(o.head==='ribbon'&&o.dress==='d_pink'&&!o.hand)meta.outfit={head:null,dress:'d_hachu',hand:null};meta.look3=1}
  meta.furn = (meta.furn||[]).filter(id=>FU[id]);
  meta.room = meta.room||{};
  meta.stickers = meta.stickers||[];
  meta.album = meta.album||[];
  meta.best = meta.best||{};
  meta.forms = (meta.forms||[]).filter(id=>FORMS.some(f=>f.id===id));
  meta.st = Object.assign({games:{},perfects:0,regions:{},golds:0,birthdays:0,seollal:0,years:0}, meta.st||{});
}
normMeta();
function saveMeta(){store(META,meta)}

/* ---------- 내가 넣은 캐릭터 그림 (이 컴퓨터 브라우저에만 저장) ---------- */
const CHAR_KEYS = ['hachu','baro','aja','chacha','lala','hap'];
const CHAR_NAMES = {hachu:'하츄핑',baro:'바로핑',aja:'아자핑',chacha:'차차핑',lala:'라라핑',hap:'해핑'};
const CHAR_IMG = {};
function dataUrlToBlobUrl(d){
  try{const [h,b]=d.split(',');const mime=h.match(/:(.*?);/)[1];const bin=atob(b);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([u],{type:mime}))}catch(e){return null}
}
for(const k of CHAR_KEYS){let d=null;try{d=localStorage.getItem('hpm_charimg_'+k)}catch(e){}if(d){const u=dataUrlToBlobUrl(d);if(u)CHAR_IMG[k]=u}}
/* 가장자리와 같은 색 배경을 투명하게 */
function removeBg(img){
  const {width:w,height:h,data:p}=img, at=(x,y)=>(y*w+x)*4;
  const cs=[at(0,0),at(w-1,0),at(0,h-1),at(w-1,h-1)];
  if(cs.every(i=>p[i+3]<20))return;
  let r=0,g=0,b=0;cs.forEach(i=>{r+=p[i];g+=p[i+1];b+=p[i+2]});r/=4;g/=4;b/=4;
  const near=i=>p[i+3]>0&&Math.abs(p[i]-r)+Math.abs(p[i+1]-g)+Math.abs(p[i+2]-b)<70;
  const seen=new Uint8Array(w*h), st=[];
  for(let x=0;x<w;x++)st.push(x,0,x,h-1);
  for(let y=0;y<h;y++)st.push(0,y,w-1,y);
  while(st.length){const y=st.pop(),x=st.pop();if(x<0||y<0||x>=w||y>=h)continue;const k=y*w+x;if(seen[k])continue;seen[k]=1;const i=k*4;if(!near(i))continue;p[i+3]=0;st.push(x+1,y,x-1,y,x,y+1,x,y-1)}
}
function opaqueBox(img){
  const {width:w,height:h,data:p}=img;let x0=w,y0=h,x1=-1,y1=-1;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(p[(y*w+x)*4+3]>20){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  return x1<0?{x:0,y:0,w,h}:{x:x0,y:y0,w:x1-x0+1,h:y1-y0+1};
}
async function importCharImg(file,who){
  const src=URL.createObjectURL(file);
  try{
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src});
    const k=Math.min(1,520/Math.max(img.width,img.height)), w=Math.max(1,Math.round(img.width*k)), h=Math.max(1,Math.round(img.height*k));
    const cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d');cx.drawImage(img,0,0,w,h);
    const d=cx.getImageData(0,0,w,h);removeBg(d);cx.putImageData(d,0,0);
    const b=opaqueBox(d), out=document.createElement('canvas');out.width=b.w;out.height=b.h;out.getContext('2d').drawImage(cv,b.x,b.y,b.w,b.h,0,0,b.w,b.h);
    let url=out.toDataURL('image/webp',.92);if(!url.startsWith('data:image/webp'))url=out.toDataURL('image/png');
    localStorage.setItem('hpm_charimg_'+who,url);
    if(CHAR_IMG[who])URL.revokeObjectURL(CHAR_IMG[who]);
    CHAR_IMG[who]=dataUrlToBlobUrl(url);
    return true;
  }catch(e){return false}
  finally{URL.revokeObjectURL(src)}
}
function removeCharImg(who){try{localStorage.removeItem('hpm_charimg_'+who)}catch(e){}if(CHAR_IMG[who])URL.revokeObjectURL(CHAR_IMG[who]);delete CHAR_IMG[who]}


/* ---------- 저장 슬롯 ---------- */
let SLOT = 1;
let S = null;
const slotKey = n => 'hpm_slot_'+n;
(function migrateOld(){
  const old = load('hpm_run_v2');
  if(old && !old.done && !load(slotKey(1))) store(slotKey(1), old);
  drop('hpm_run_v2'); drop('hpm_run_v1');
})();
function newState(){
  return {v:3, mi:0, stats:{body:0,smart:0,art:0,magic:0,kind:0,charm:0}, mood:80, coins:50, height:75, heights:[75],
    pers:{brave:0,wise:0,kind:0,bright:0,grace:0}, cnt:{}, advCount:0, medals:[], friends:{areum:2,sappun:2,ponny:2}, snacks:{cake:1},
    talked:false, played:false, parked:false, plan:null, slot:0, done:false, diary:[], story:{}, started:Date.now()};
}
function normState(s){
  const d = newState();
  for(const k in d) if(s[k]===undefined) s[k]=d[k];
  s.v = 3;
  for(const id of ['areum','sappun','ponny'])if(!(id in s.friends))s.friends[id]=2;
  return s;
}
function loadSlot(n){const s=load(slotKey(n));if(!s||s.done)return null;return normState(s)}
function saveRun(){if(S)store(slotKey(SLOT),S);saveMeta()}

/* ---------- 작은 도우미 ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const wait = ms=>new Promise(r=>setTimeout(r,ms));
const rand = n=>Math.floor(Math.random()*n);
const pickOne = a=>a[rand(a.length)];
const clamp = (v,a=0,b=100)=>Math.max(a,Math.min(b,v));
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=rand(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function hasBatchim(w){const c=w.charCodeAt(w.length-1)-0xAC00;return c>=0&&c<11172&&c%28!==0}
function josa(w,a,b){return w+(hasBatchim(w)?a:b)}
function ro(w){const c=w.charCodeAt(w.length-1)-0xAC00;return w+(c>=0&&c<11172&&c%28!==0&&c%28!==8?'으로':'로')}
const noEmoji = t=>String(t).replace(/\p{Extended_Pictographic}|️|‍/gu,'').trim();

/* ---------- 상태 바꾸기 ---------- */
function stageOf(mi=S?S.mi:11){return mi<=3?0:mi<=7?1:2}
function seasonOf(mi){return Math.floor(mi/3)}
function monthName(mi=S.mi){return MONTHS[mi]+'월'}
function addStat(k,v){const b=S.stats[k];S.stats[k]=clamp(b+v);return S.stats[k]-b}
function addMood(v){const b=S.mood;S.mood=clamp(b+v);return S.mood-b}
function newAcc(){return {stats:{},coins:0,mood:0}}
function accStat(acc,k,v){const g=addStat(k,v);acc.stats[k]=(acc.stats[k]||0)+g}
function accCoins(acc,c){S.coins=Math.max(0,S.coins+c);acc.coins+=c}
function accMood(acc,v){acc.mood+=addMood(v)}
function accGain(acc,g){for(const [k,v] of Object.entries(g||{}))accStat(acc,k,v)}
function heartsHTML(n){return '💗'.repeat(n)+'🤍'.repeat(5-n)}
function metFriends(){return FRIENDS.filter(f=>f.id in S.friends)}
function addHeart(id,n=1){S.friends[id]=Math.min(5,(S.friends[id]||0)+n)}
function addSnack(id,n=1){S.snacks[id]=(S.snacks[id]||0)+n}
function persName(){const e=Object.entries(S.pers).sort((a,b)=>b[1]-a[1]);return e[0][1]>0?PERS[e[0][0]]:'귀여운'}
function topStat(){return STATS.slice().sort((a,b)=>S.stats[b.k]-S.stats[a.k])[0].k}
function grant(id){if(meta.owned.includes(id))return null;meta.owned.push(id);saveMeta();return ITEM[id]}
function grantForm(id){
  const F=FORMS.find(f=>f.id===id);
  if(!F||meta.forms.includes(id))return false;
  meta.forms.push(id);
  Object.values(F.parts).forEach(p=>{if(p&&!meta.owned.includes(p))meta.owned.push(p)});
  saveMeta(); return true;
}
function grantShopItem(){
  const left = ITEMS.filter(t=>t.price&&!meta.owned.includes(t.id));
  return left.length ? grant(pickOne(left).id) : null;
}
function diary(icon,text){
  if(!S)return;
  let d = S.diary.find(x=>x.mi===S.mi);
  if(!d){d={mi:S.mi,lines:[]};S.diary.push(d)}
  if(d.lines.length<9)d.lines.push({i:icon,t:text});
}

/* ---------- 스티커 ---------- */
function checkStickers(){
  const got=[];
  for(const s of STICKERS){
    if(meta.stickers.includes(s.id))continue;
    let ok=false;try{ok=s.ok()}catch(e){}
    if(ok){meta.stickers.push(s.id);got.push(s)}
  }
  if(!got.length)return;
  saveMeta();
  got.forEach((s,i)=>setTimeout(()=>{toast(`${s.i} 새 스티커! <b>${s.n}</b>`);sfx.sticker()},i*1700));
}
