/* =========================================================
   화면 틀 · 창 · 대화창 · 알림 · 효과
   ========================================================= */
const GAME_W = 1280, GAME_H = 720;
let gameScale = 1;
function fitGame(){
  gameScale = Math.min(innerWidth/GAME_W, innerHeight/GAME_H);
  $('#game').style.transform = `translate(-50%,-50%) scale(${gameScale})`;
}
addEventListener('resize', fitGame);
/* 화면 좌표 → 게임 안 좌표 */
function localPt(el,e){
  const r=el.getBoundingClientRect(), k=r.width/(el.offsetWidth||1);
  return {x:(e.clientX-r.left)/k, y:(e.clientY-r.top)/k};
}
function toggleFullscreen(){
  try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}
}

/* ---------- 화면 전환 ---------- */
const screen = ()=>$('#screen');
async function goScreen(fn){
  const f=$('#fade'); f.classList.add('on'); await wait(220);
  closeModal(); fn(); await wait(40); f.classList.remove('on');
}

/* ---------- 창(모달) ---------- */
function openModal(html,cls=''){
  const m=$('#modal');
  m.innerHTML=`<div class="panel ${cls}">${html}</div>`; m.hidden=false; m.scrollTop=0;
  return m.firstElementChild;
}
function closeModal(){const m=$('#modal');m.hidden=true;m.innerHTML=''}
function pick(root){
  return new Promise(res=>{
    root.querySelectorAll('[data-v]').forEach(b=>b.addEventListener('click',()=>{if(b.disabled)return;sfx.pop();res(b.dataset.v)}));
  });
}
function headHTML(icon,title,sub){
  return `<div class="ghead"><div class="gicon">${icon}</div><div class="gtitle"><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div><button class="icon" data-rep="${noEmoji(title+'. '+(sub||'')).replace(/"/g,'')}" aria-label="다시 듣기">🔊</button></div>`;
}
document.addEventListener('click',e=>{const r=e.target.closest('[data-rep]');if(r)say(r.dataset.rep)});

/* ---------- 마우스를 올리면 읽어 주기 (글을 못 읽는 아이용) ---------- */
let hoverT=null, hoverEl=null;
document.addEventListener('pointerover',e=>{
  if(e.pointerType!=='mouse')return;
  const el=e.target.closest('[data-say]');
  if(!el||el===hoverEl)return;
  hoverEl=el; clearTimeout(hoverT);
  hoverT=setTimeout(()=>say(el.dataset.say),300);
});
document.addEventListener('pointerout',e=>{
  const el=e.target.closest('[data-say]');
  if(el&&!el.contains(e.relatedTarget)){if(hoverEl===el)hoverEl=null;clearTimeout(hoverT)}
});
document.addEventListener('pointerdown',()=>{ac();if(BGM.want&&!BGM.timer&&CFG.bgm)bgm(BGM.want)},{capture:true});

/* ---------- 이야기 대화창 ---------- */
const WHO_C = {hachu:'#FF5C9E',narr:'#7A5A8C'};
async function talkSeq(lines){
  const d=$('#dialog'); d.hidden=false;
  for(const [who,text,face] of lines){
    const f=FR[who], name=who==='hachu'?'하츄핑':who==='narr'?'':(f?f.n:who);
    const col=f?f.deep:(WHO_C[who]||'#7A5A8C');
    d.innerHTML=`<div class="dlg ${who==='narr'?'narr':''}">${who==='narr'?'':`<div class="dlg-por bob">${portrait(who,face||'')}</div>`}
      <div class="dlg-body">${name?`<span class="dlg-name" style="--nc:${col}">${name}</span>`:''}<p class="dlg-text"></p><span class="dlg-next">▼ 눌러요</span></div></div>`;
    const p=$('.dlg-text',d); say(text); sfx.click();
    let i=0, full=false;
    const timer=setInterval(()=>{i++;p.textContent=text.slice(0,i);if(i>=text.length){clearInterval(timer);full=true}},38);
    await new Promise(res=>{
      const h=()=>{ if(!full){clearInterval(timer);p.textContent=text;full=true;return} d.removeEventListener('click',h);res() };
      d.addEventListener('click',h);
    });
  }
  d.hidden=true; d.innerHTML='';
}

/* ---------- 알림 · 효과 ---------- */
function toast(html){
  const t=document.createElement('div'); t.className='toast'; t.innerHTML=html;
  $('#toast').appendChild(t); setTimeout(()=>t.classList.add('out'),2600); setTimeout(()=>t.remove(),3100);
}
function floatFx(host,x,y,ch='💖'){
  const e=document.createElement('span'); e.className='fh'; e.textContent=ch;
  e.style.left=(x-16)+'px'; e.style.top=(y-20)+'px'; host.appendChild(e); setTimeout(()=>e.remove(),1000);
}
function confetti(n=40){
  const ch=['💖','⭐','✨','🎀','🌸','💜'], fx=$('#fx');
  for(let i=0;i<n;i++){
    const e=document.createElement('span'); e.className='confetti'; e.textContent=ch[i%ch.length];
    e.style.left=Math.random()*100+'%'; e.style.animationDuration=(2.5+Math.random()*2.5)+'s'; e.style.animationDelay=(Math.random()*1.2)+'s';
    fx.appendChild(e); setTimeout(()=>e.remove(),6500);
  }
}
function hop(el){if(!el)return;el.classList.remove('hop');void el.offsetWidth;el.classList.add('hop');el.addEventListener('animationend',()=>el.classList.remove('hop'),{once:true})}
let progEl=null;
function progress(f){if(progEl)progEl.style.width=Math.round(Math.min(1,f)*100)+'%'}

/* ---------- 결과 칩 ---------- */
function chipsHTML(r){
  let h='',d=0;
  const add=(c,txt,v)=>{h+=`<div class="chip" style="--c:${c};animation-delay:${.15+d*.12}s">${txt} <em>${v>0?'+':''}${v}</em></div>`;d++};
  for(const [k,v] of Object.entries(r.stats||{}))if(v)add(ST[k].c,`${ST[k].i} ${ST[k].n}`,v);
  if(r.coins)add('#D49B00','🪙 코인',r.coins);
  if(r.mood)add(MOOD_C,'💗 기분',r.mood);
  return h;
}
function speechOf(r){
  const p=[], ups=Object.entries(r.stats||{}).filter(([,v])=>v>0);
  if(ups.length)p.push(ups.map(([k,v])=>`${ST[k].n} ${v}`).join(', ')+' 올랐어요!');
  if(r.coins>0)p.push(`코인 ${r.coins}개를 받았어요!`);
  if(r.mood>0)p.push('기분이 좋아졌어요!');
  return p.join(' ');
}
function effectChips(A){
  let h='';
  for(const [k,v] of Object.entries(A.gain||{}))h+=`<span class="mc up">${ST[k].i}+${v}</span>`;
  if(A.cat==='adv')h+=`<span class="mc up">💪 🪄 🎁</span>`;
  if(A.special==='invite')h+=`<span class="mc up">👫 💗 놀이 3번</span>`;
  if(A.cost)h+=`<span class="mc coin">🪙-${A.cost}</span>`;
  if(A.coin)h+=`<span class="mc coin">🪙+${A.coin}</span>`;
  if(A.mood)h+=`<span class="mc ${A.mood>0?'up':'down'}">💗${A.mood>0?'+':''}${A.mood}</span>`;
  return `<span class="mcs">${h}</span>`;
}
function giftHTML(it,label='새 옷을 얻었어요!'){
  if(!it)return '';
  return `<div class="card2 gift"><div class="cp2">${onlyItem(it.id)}</div><div><small>${label}</small><b>${it.n}</b><button class="btn pink sm" data-wear="${it.id}" data-say="지금 입어 보기">👗 지금 입기</button></div></div>`;
}
function bindGift(root){
  root.querySelectorAll('[data-wear]').forEach(b=>b.onclick=()=>{
    const it=ITEM[b.dataset.wear]; meta.outfit[it.slot]=it.id; saveMeta();
    b.textContent='입었어요! ✔'; b.disabled=true; sfx.chime(); say('입었어요! 예뻐요!');
  });
}
function meetHTML(mt){
  if(!mt)return '';
  const f=mt.f;
  return `<div class="card2 meet"><div class="cp2 bob">${friendPing(f,{face:'happy'})}</div><div><small>${mt.first?'새 친구를 만났어요!':'친구랑 더 친해졌어요!'}</small><b>${f.n}</b><span class="hearts">${heartsHTML(S.friends[f.id])}</span></div></div>`;
}
function meetSpeech(mt){if(!mt)return '';return mt.first?` 새 친구 ${josa(mt.f.n,'을','를')} 만났어요!`:` ${josa(mt.f.n,'과','와')} 더 친해졌어요!`}
function decoHTML(list){return list.map((d,j)=>`<span class="dc" style="left:${DECO_POS[j][0]}%;top:${DECO_POS[j][1]}%">${d}</span>`).join('')}
function sceneBox(imgKey,bg,deco,inner,cls=''){
  const has=!!imgUrl(imgKey);
  return `<div class="scene ${cls}" style="${bgCSS(imgKey,bg)}">${has?'':decoHTML(deco||[])}${inner}</div>`;
}
