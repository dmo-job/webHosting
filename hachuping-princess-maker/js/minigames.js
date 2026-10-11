/* =========================================================
   미니게임 (모두 0~10점, 실패 없음)
   ========================================================= */
const GAMES = {
  dance:    {n:'춤추기',        i:'💃',how:'반짝 빛나는 버튼을 눌러요!',          run:a=>padsGame(a,{idle:['💗','⭐','🌙','🎀'],hit:'✨'})},
  rhythm:   {n:'노래 박자 맞추기',i:'🎤',how:'음표가 동그라미에 오면 눌러요!',       run:a=>rhythmGame(a)},
  water:    {n:'꽃에 물 주기',  i:'🌷',how:'시든 꽃을 눌러서 물을 줘요!',         run:a=>padsGame(a,{idle:['🌱','🌱','🌱','🌱'],lit:'🥀',hit:'🌷',fx:'💧'})},
  memory:   {n:'같은 그림 찾기',i:'🃏',how:'똑같은 그림 두 개를 찾아요!',         run:a=>memoryGame(a)},
  find:     {n:'숨은 그림 찾기',i:'🔍',how:'위에 있는 그림을 찾아서 눌러요!',      run:a=>findGame(a)},
  catch:    {n:'별 받기',       i:'⭐',how:'하츄핑을 움직여서 별을 받아요!',       run:a=>catchGame(a,{items:['⭐','💖'],bg:'linear-gradient(#BFE6FF,#FFE0EE)'})},
  bread:    {n:'빵 받기',       i:'🍞',how:'떨어지는 빵을 바구니로 받아요!',       run:a=>catchGame(a,{items:['🍞','🥐','🧁'],bg:'linear-gradient(#FFF1DD,#FFD9A8)'})},
  butterfly:{n:'나비 잡기',     i:'🦋',how:'예쁜 나비를 바구니로 받아요!',         run:a=>catchGame(a,{items:['🦋','🌼'],bg:'linear-gradient(#D8F3FF,#D9F5CF)'})},
  simon:    {n:'마법 주문',     i:'🔮',how:'반짝인 보석을 똑같이 눌러요!',         run:a=>simonGame(a)},
  cuddle:   {n:'쓰다듬기',      i:'🤗',how:'하츄핑을 꾹꾹 눌러서 쓰다듬어 줘요!',  run:a=>cuddleGame(a)},
  tea:      {n:'티파티 차리기', i:'🫖',how:'위에 있는 것과 똑같이 차려 줘요!',    run:a=>recipeGame(a,{pool:['🫖','☕','🍰','🍪','🌹','🧁','🍓','🥄'],ordered:false})},
  cake:     {n:'케이크 만들기', i:'🎂',how:'주문서 순서대로 아래부터 쌓아요!',    run:a=>recipeGame(a,{pool:['🍞','🍓','🍦','🍫','🍒','🍌'],ordered:true})},
  fashion:  {n:'패션쇼 준비',   i:'👗',how:'위에 있는 것과 똑같이 골라요!',        run:a=>recipeGame(a,{pool:['👗','👠','🎀','👒','💍','👜','🧣','🕶️'],ordered:false})},
  songpyeon:{n:'송편 빚기',     i:'🍡',how:'송편에 넣을 소를 똑같이 골라요!',      run:a=>recipeGame(a,{pool:['🫘','🌰','🍯','🥜','🍠','🌕'],ordered:false,labels:['🌕 이렇게!','🍡 내 송편']})},
  color:    {n:'색칠하기',      i:'🎨',how:'색을 고르고 그림을 눌러 색칠해요!',    run:a=>colorGame(a)},
  baby:     {n:'아기 돌보기',   i:'🍼',how:'아기가 원하는 것을 골라 줘요!',        run:a=>babyGame(a)},
  gift:     {n:'선물 나눠 주기',i:'🎁',how:'친구가 원하는 선물을 골라 줘요!',      run:a=>babyGame(a,{gift:true})},
  bubble:   {n:'거품 목욕',     i:'🛁',how:'올라오는 거품을 눌러서 터뜨려요!',     run:a=>bubbleGame(a)},
  teeth:    {n:'치카치카 양치', i:'🪥',how:'세균을 문질러서 이를 깨끗하게 닦아요!', run:a=>rubGame(a,{teeth:true})},
  potty:    {n:'화장실 순서',   i:'🚽',how:'순서대로 눌러요! 마지막엔 손 씻기!',    run:a=>recipeGame(a,{pool:['🚽','🧻','💦','🚰','🧼','🙌','🧸','🎈'],ordered:true,row:true,seqs:[['🚽','🧻','💦'],['🚰','🧼','🙌'],['🧼','🙌','🧻']],labels:['📜 이 순서로!','🙋 내가 한 것']})},
  meal:     {n:'골고루 밥 먹기',i:'🍚',how:'위에 있는 음식을 똑같이 담아요!',      run:a=>recipeGame(a,{pool:['🍚','🥦','🐟','🥕','🍎','🥛','🍳','🥗'],ordered:false,labels:['🍽️ 이렇게 담아요','😋 내 밥상']})},
  rub:      {n:'반짝반짝 청소', i:'🧽',how:'먼지를 문질러서 깨끗하게 닦아요!',     run:a=>rubGame(a)},
};
const PLAYGROUND = ['dance','rhythm','memory','find','catch','bread','simon','tea','cake','fashion','songpyeon','color','baby','rub','water','butterfly','bubble','teeth','potty','meal'];

async function playGame(key){
  const G=GAMES[key], prev=BGM.want;
  bgm('game');
  const m=openModal(`${headHTML(G.i,G.n,G.how)}<div class="garea" id="garea"><div class="gready"><div class="gready-in"><div class="gr-ic bob">${G.i}</div><p>${G.how}</p><button class="btn pink big" data-v="go" data-say="시작">▶ 시작!</button>${meta.best[key]!=null?`<small>최고 점수 ${'⭐'.repeat(Math.ceil(meta.best[key]/3.4))}</small>`:''}</div></div></div><div class="gprog"><i id="gprog"></i></div>`,'game');
  say(G.how);
  await pick($('#garea',m));
  sfx.chime(); progEl=$('#gprog',m); progress(0);
  const sc=clamp(Math.round(await G.run($('#garea',m))),0,10);
  progress(1);
  meta.st.games[key]=(meta.st.games[key]||0)+1;
  if(sc>=10)meta.st.perfects++;
  if(sc>(meta.best[key]??-1))meta.best[key]=sc;
  saveMeta(); checkStickers();
  if(prev)bgm(prev);
  await wait(250);
  return sc;
}
function starsOf(sc){return sc>=8?3:sc>=5?2:1}

/* ---------- 빛나는 버튼 누르기 (춤, 물 주기) ---------- */
function padsGame(area,o){return new Promise(done=>{
  const idle=o.idle, fr=[523,659,784,988], N=12, iv=1250*speedMul();
  area.innerHTML=`<div class="dg"><div class="dg-hero">${heroPing()}</div><div class="pads">${idle.map((c,i)=>`<button class="pad pad${i}" data-i="${i}" aria-label="버튼 ${i+1}">${c}</button>`).join('')}</div></div>`;
  const pads=$$('.pad',area), hero=$('.dg-hero',area);
  let beat=0,hits=0,lit=-1,prev=-1;
  pads.forEach(p=>p.onclick=e=>{
    const i=+p.dataset.i;
    if(i===lit){
      hits++; lit=-1; p.classList.remove('on'); p.classList.add('hit'); p.textContent=o.hit;
      tone(fr[i],.22,'triangle',.15); hop(hero);
      const pt=localPt(area,e); floatFx(area,pt.x,pt.y-20,o.fx||'✨');
      setTimeout(()=>{p.classList.remove('hit');p.textContent=idle[i]},420);
    }else sfx.soft();
  });
  function next(){
    pads.forEach((p,i)=>{if(p.classList.contains('on')){p.classList.remove('on');p.textContent=idle[i]}});
    if(beat>=N){setTimeout(()=>done(hits/N*10),500);return}
    let i;do{i=rand(4)}while(i===prev);
    prev=i; lit=i; pads[i].classList.add('on'); if(o.lit)pads[i].textContent=o.lit;
    beat++; progress(beat/N);
    setTimeout(()=>{lit=-1;next()},iv);
  }
  setTimeout(next,600);
})}

/* ---------- 노래 박자 맞추기 ---------- */
function rhythmGame(area){return new Promise(done=>{
  const L=[{i:'💗',c:'#FF8FC0',k:['ArrowLeft','a','1'],f:523},{i:'⭐',c:'#FFC94D',k:['ArrowDown','s','2'],f:659},{i:'🎵',c:'#B69CFF',k:['ArrowRight','d','3'],f:784}];
  area.innerHTML=`<div class="rh"><div class="rh-hero bob">${heroPing()}</div><div class="rh-board"><div class="rh-lanes">${L.map((l,i)=>`<div class="rh-lane" data-i="${i}" style="--lc:${l.c}"><div class="rh-hit"></div></div>`).join('')}</div>
    <div class="rh-btns">${L.map((l,i)=>`<button class="rh-b" data-i="${i}" style="--lc:${l.c}" aria-label="${i+1}번">${l.i}</button>`).join('')}</div></div><div class="rh-msg" id="rhm"></div></div>`;
  const lanes=$$('.rh-lane',area), msg=$('#rhm',area), hero=$('.rh-hero',area);
  const N=16, gap=760*speedMul(), fall=2100*speedMul(), t0=performance.now()+900;
  const notes=[]; let lastLane=-1;
  for(let n=0;n<N;n++){let l;do{l=rand(3)}while(l===lastLane&&Math.random()<.6);lastLane=l;notes.push({l,t:t0+n*gap+(n>7?0:0),el:null,st:0})}
  let hits=0, judged=0, fin=false;
  const hitY=()=>lanes[0].clientHeight-46;
  function judge(l){
    const now=performance.now(), H=hitY();
    let best=null,bd=1e9;
    for(const n of notes){if(n.st||n.l!==l||!n.el)continue;const y=(now-(n.t-fall))/fall*H;const d=Math.abs(y-H);if(d<bd){bd=d;best=n}}
    const b=$$('.rh-b',area)[l]; b.classList.add('press'); setTimeout(()=>b.classList.remove('press'),120);
    if(best&&bd<56){
      best.st=1; hits++; judged++; best.el.classList.add('pop'); setTimeout(()=>best.el&&best.el.remove(),250);
      tone(L[l].f,.2,'triangle',.15); hop(hero);
      msg.textContent=bd<24?'최고! ✨':'좋아요! 💗'; msg.className='rh-msg show'; setTimeout(()=>msg.className='rh-msg',300);
      progress(judged/N);
    }else sfx.soft();
  }
  area.querySelectorAll('.rh-b,.rh-lane').forEach(el=>el.addEventListener('pointerdown',e=>{e.preventDefault();judge(+el.dataset.i)}));
  const kd=e=>{L.forEach((l,i)=>{if(l.k.includes(e.key)){e.preventDefault();judge(i)}})};
  addEventListener('keydown',kd);
  function loop(){
    if(fin)return;
    const now=performance.now(), H=hitY();
    for(const n of notes){
      if(n.st)continue;
      const y=(now-(n.t-fall))/fall*H;
      if(y<-40)continue;
      if(!n.el){n.el=document.createElement('span');n.el.className='rh-note';n.el.textContent=L[n.l].i;lanes[n.l].appendChild(n.el)}
      n.el.style.transform=`translateY(${y}px)`;
      if(y>H+60){n.st=2;judged++;n.el.classList.add('miss');const el=n.el;setTimeout(()=>el.remove(),300);progress(judged/N)}
    }
    if(judged>=N){fin=true;removeEventListener('keydown',kd);setTimeout(()=>done(hits/N*10),600);return}
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})}

/* ---------- 같은 그림 찾기 ---------- */
function memoryGame(area){return new Promise(done=>{
  const pairs=S&&S.mi>=6?6:4;
  const sy=shuffle(['🍓','⭐','🌙','🎀','🌷','🐰','🍰','🦋']).slice(0,pairs);
  const cards=shuffle([...sy,...sy]);
  area.innerHTML=`<div class="mem ${pairs===6?'m6':''}">${cards.map((c,i)=>`<button class="card" data-i="${i}" aria-label="카드"><span class="back">💗</span><span class="face">${c}</span></button>`).join('')}</div>`;
  let first=null,lock=false,tries=0,found=0;
  area.querySelectorAll('.card').forEach(b=>b.onclick=()=>{
    if(lock||b.classList.contains('open'))return;
    b.classList.add('open'); sfx.click();
    if(!first){first=b;return}
    tries++; const a=first; first=null;
    if(cards[a.dataset.i]===cards[b.dataset.i]){
      found++; a.classList.add('got'); b.classList.add('got'); sfx.chime(); progress(found/pairs);
      if(found===pairs)setTimeout(()=>done(Math.max(4,10-(tries-pairs)*(pairs===4?1:.7))),800);
    }else{lock=true;setTimeout(()=>{a.classList.remove('open');b.classList.remove('open');lock=false},900)}
  });
})}

/* ---------- 숨은 그림 찾기 ---------- */
function findGame(area){return new Promise(done=>{
  const pool=['🍎','🍌','🍇','🌸','🌼','🍄','🐞','🦋','🐌','🎈','🧸','🎀','🔔','🍪','🍓','⭐','🌙','☂️','🐟','🐤','🍩','🎁'];
  const targets=shuffle(pool.slice()).slice(0,4), others=pool.filter(x=>!targets.includes(x));
  const items=shuffle([...targets,...Array.from({length:26},()=>pickOne(others))]);
  area.innerHTML=`<div class="fd"><div class="fd-top">찾아요! ${targets.map(t=>`<span class="fd-t" data-t="${t}">${t}</span>`).join('')}</div><div class="fd-field" id="fdf"></div></div>`;
  const field=$('#fdf',area), W=field.clientWidth, H=field.clientHeight, cols=10, rows=3;
  const cells=shuffle(Array.from({length:cols*rows},(_,i)=>i));
  items.forEach((x,i)=>{
    const c=cells[i%cells.length], cx=(c%cols+.5)*W/cols+(Math.random()-.5)*W/cols*.5, cy=(Math.floor(c/cols)+.5)*H/rows+(Math.random()-.5)*H/rows*.5;
    field.insertAdjacentHTML('beforeend',`<button class="fd-i" data-x="${x}" style="left:${cx}px;top:${cy}px;font-size:${34+rand(16)}px;transform:translate(-50%,-50%) rotate(${rand(60)-30}deg)">${x}</button>`);
  });
  let found=0, miss=0;
  field.querySelectorAll('.fd-i').forEach(b=>b.onclick=()=>{
    const x=b.dataset.x, t=$(`.fd-t[data-t="${x}"]`,area);
    if(targets.includes(x)&&t&&!t.classList.contains('ok')){
      t.classList.add('ok'); b.classList.add('ok'); found++; sfx.chime(); progress(found/targets.length);
      if(found===targets.length)setTimeout(()=>done(Math.max(4,10-miss)),800);
    }else if(!b.classList.contains('ok')){miss++;b.classList.add('shake');sfx.soft();setTimeout(()=>b.classList.remove('shake'),400)}
  });
})}

/* ---------- 떨어지는 것 받기 ---------- */
function catchGame(area,o){return new Promise(done=>{
  area.innerHTML=`<div class="cg" style="background:${o.bg}"><div class="catcher"><div class="bob">${heroPing()}</div><span class="bk">🧺</span></div></div>`;
  const box=$('.cg',area), catcher=$('.catcher',area);
  const TOTAL=18, sp=1/speedMul();
  let W=box.clientWidth,H=box.clientHeight,x=W/2,stars=[],spawned=0,caught=0,spawnT=400,last=performance.now(),keys={};
  const mv=e=>{x=localPt(box,e).x};
  box.addEventListener('pointermove',mv); box.addEventListener('pointerdown',mv);
  const kd=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){keys[e.key]=true;e.preventDefault()}};
  const ku=e=>{keys[e.key]=false};
  addEventListener('keydown',kd); addEventListener('keyup',ku);
  function loop(t){
    const dt=Math.min(50,t-last); last=t; W=box.clientWidth; H=box.clientHeight;
    if(keys.ArrowLeft)x-=dt*.6; if(keys.ArrowRight)x+=dt*.6;
    x=Math.max(55,Math.min(W-55,x)); catcher.style.left=x+'px';
    spawnT-=dt;
    if(spawned<TOTAL&&spawnT<=0){
      spawnT=1000/sp; spawned++; progress(spawned/TOTAL);
      const el=document.createElement('span'); el.className='fstar'; el.textContent=pickOne(o.items); box.appendChild(el);
      stars.push({el,x:50+Math.random()*(W-100),y:-40,v:(.12+Math.random()*.05)*sp});
    }
    for(const s of stars){
      s.y+=s.v*dt; s.el.style.transform=`translate(${s.x}px,${s.y}px)`;
      if(s.y>H-140&&s.y<H-30&&Math.abs(s.x-x)<66){s.done=true;caught++;s.el.classList.add('caught');tone(660+caught*25,.12,'triangle');const el=s.el;setTimeout(()=>el.remove(),300)}
      else if(s.y>H){s.done=true;s.el.remove()}
    }
    stars=stars.filter(s=>!s.done);
    if(spawned>=TOTAL&&!stars.length){
      removeEventListener('keydown',kd); removeEventListener('keyup',ku);
      setTimeout(()=>done(caught/TOTAL*10),400); return;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})}

/* ---------- 순서 기억하기 (마법) ---------- */
function simonGame(area){return new Promise(done=>{
  const gems=[{i:'💗',c:'#FF6FA8',f:523},{i:'⭐',c:'#FFC94D',f:659},{i:'🌙',c:'#8C7BFF',f:784},{i:'💧',c:'#4DC3FF',f:1047}];
  area.innerHTML=`<div class="sg"><div class="sg-msg"></div><div class="gems">${gems.map((g,k)=>`<button class="gem" data-i="${k}" style="--gc:${g.c}" aria-label="보석 ${k+1}">${g.i}</button>`).join('')}<div class="sg-ping">${heroPing()}</div></div></div>`;
  const btns=$$('.gem',area), msg=$('.sg-msg',area), hero=$('.sg-ping',area), sm=speedMul();
  const lens=S&&S.mi>=6?[3,4,5]:[2,3,4]; let round=0,seq=[],pos=0,input=false,mistakes=0;
  function flash(k,d=460){btns[k].classList.add('on');tone(gems[k].f,.3,'sine',.15);setTimeout(()=>btns[k].classList.remove('on'),d)}
  function show(){
    input=false; msg.textContent='잘 보세요! 👀'; say('잘 보세요!');
    let t=1100; seq.forEach(k=>{setTimeout(()=>flash(k,460*sm),t);t+=800*sm});
    setTimeout(()=>{input=true;pos=0;msg.textContent='이제 눌러 보세요! 👆';say('이제 눌러 보세요!')},t);
  }
  function start(){seq=Array.from({length:lens[round]},()=>rand(4));show()}
  btns.forEach(b=>b.onclick=()=>{
    if(!input)return; const k=+b.dataset.i; flash(k,250);
    if(k===seq[pos]){
      pos++;
      if(pos===seq.length){
        input=false; round++; progress(round/lens.length); hop(hero); setTimeout(sfx.chime,300);
        if(round>=lens.length){msg.textContent='마법 성공! ✨';setTimeout(()=>done(Math.max(3,10-mistakes*2)),1000)}
        else{msg.textContent='딩동댕! ✨';setTimeout(start,1300)}
      }
    }else{input=false;mistakes++;msg.textContent='괜찮아요, 다시 보여줄게요!';say('괜찮아요, 다시 보여줄게요!');setTimeout(show,1800)}
  });
  setTimeout(start,500);
})}

/* ---------- 쓰다듬기 ---------- */
function cuddleGame(area){return new Promise(done=>{
  area.innerHTML=`<div class="cu"><button class="cu-ping bob" aria-label="하츄핑 쓰다듬기">${heroPing({face:'sleepy'})}</button></div>`;
  const b=$('.cu-ping',area), N=8; let n=0;
  b.onclick=e=>{
    if(n>=N)return; n++; hop(b); tone(520+n*60,.16,'triangle'); progress(n/N);
    const pt=localPt(area,e); floatFx(area,pt.x,pt.y);
    if(n===4)b.innerHTML=heroPing();
    if(n===N){b.innerHTML=heroPing({face:'happy'});say('하츄~ 기분 좋아요!');setTimeout(()=>done(10),900)}
  };
})}

/* ---------- 똑같이 차리기 / 순서대로 쌓기 ---------- */
function recipeGame(area,o){return new Promise(done=>{
  const R=3; let r=0,mistakes=0,target,got;
  const lab=o.labels||(o.ordered?['📜 주문서','🍽️ 내 케이크']:['👀 이렇게!','🧺 내가 고른 것']);
  area.innerHTML=`<div class="rg ${o.ordered?'ordered':''} ${o.row?'rowseq':''}"><div class="rg-box rg-order"><span class="rg-lab">${lab[0]}</span><div class="rg-items" id="rt"></div></div><div class="rg-box rg-build"><span class="rg-lab">${lab[1]}</span><div class="rg-items" id="rb"></div></div><div class="rg-pool" id="rp"></div></div>`;
  const tEl=$('#rt',area), bEl=$('#rb',area), pEl=$('#rp',area);
  function round(){
    target=o.seqs?o.seqs[r].slice():shuffle(o.pool.slice()).slice(0,3); got=[];
    tEl.innerHTML=target.map(x=>`<span>${x}</span>`).join(''); bEl.innerHTML='';
    pEl.innerHTML=shuffle(o.pool.slice()).map(x=>`<button class="rg-b" data-x="${x}">${x}</button>`).join('');
    pEl.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      const x=b.dataset.x, ok=o.ordered?x===target[got.length]:(target.includes(x)&&!got.includes(x));
      if(ok){
        got.push(x); b.disabled=true; bEl.insertAdjacentHTML('beforeend',`<span class="pop-in">${x}</span>`); tone(600+got.length*120,.15,'triangle');
        if(got.length===target.length){
          r++; progress(r/R); sfx.chime(); pEl.querySelectorAll('button').forEach(z=>z.disabled=true);
          if(r>=R)setTimeout(()=>done(Math.max(4,10-mistakes)),700); else setTimeout(round,900);
        }
      }else{mistakes++;b.classList.add('shake');sfx.soft();setTimeout(()=>b.classList.remove('shake'),400)}
    });
  }
  round();
})}

/* ---------- 색칠하기 ---------- */
function colorGame(area){return new Promise(done=>{
  const PAL=['#FF6FA8','#FFD34D','#7FD9C0','#6FB8FF','#B69CFF','#FF9A5C','#8BD46E','#FFFFFF'];
  let cur=PAL[0]; const filled=new Set();
  const st='stroke="#7A5A8C" stroke-width="3"';
  let petals=''; for(let p=0;p<5;p++){const a=p*Math.PI*2/5-Math.PI/2;petals+=`<circle class="rgn" data-r="p${p}" cx="${(90+Math.cos(a)*16).toFixed(1)}" cy="${(140+Math.sin(a)*16).toFixed(1)}" r="13" fill="#fff" ${st}/>`}
  area.innerHTML=`<div class="cgm"><svg viewBox="0 0 320 230" aria-label="색칠 그림">
    <rect class="rgn" data-r="sky" x="4" y="4" width="312" height="222" rx="18" fill="#fff" ${st}/>
    <path class="rgn rbw" data-r="r1" d="M40,176 A120,120 0 0 1 280,176" fill="none" stroke="#EEE6F5" stroke-width="15"/>
    <path class="rgn rbw" data-r="r2" d="M57,176 A103,103 0 0 1 263,176" fill="none" stroke="#E4DAEE" stroke-width="15"/>
    <path class="rgn rbw" data-r="r3" d="M74,176 A86,86 0 0 1 246,176" fill="none" stroke="#EEE6F5" stroke-width="15"/>
    <circle class="rgn" data-r="sun" cx="272" cy="44" r="24" fill="#fff" ${st}/>
    <g class="rgn" data-r="cloud" fill="#fff" ${st}><circle cx="52" cy="48" r="16"/><circle cx="72" cy="40" r="20"/><circle cx="94" cy="50" r="15"/></g>
    <path class="rgn" data-r="ground" d="M4,186 Q80,166 160,184 T316,178 L316,212 Q316,226 302,226 L18,226 Q4,226 4,212Z" fill="#fff" ${st}/>
    <line x1="90" y1="150" x2="90" y2="200" stroke="#5DBB7A" stroke-width="6" stroke-linecap="round"/>
    ${petals}<circle class="rgn" data-r="pc" cx="90" cy="140" r="10" fill="#fff" ${st}/>
    <path class="rgn" data-r="heart" d="${heartPath(226,150,20)}" fill="#fff" ${st}/>
  </svg><div class="pal">${PAL.map((c,i)=>`<button data-c="${c}" style="background:${c}" class="${i?'':'on'}" aria-label="색 ${i+1}"></button>`).join('')}<button class="btn pink sm" id="cDone" hidden>✔ 다 했어요</button></div></div>`;
  const TOTAL=area.querySelectorAll('.rgn').length;
  area.querySelectorAll('.pal [data-c]').forEach(b=>b.onclick=()=>{cur=b.dataset.c;area.querySelectorAll('.pal [data-c]').forEach(z=>z.classList.toggle('on',z===b));sfx.click()});
  $('svg',area).addEventListener('click',e=>{
    const el=e.target.closest('.rgn'); if(!el)return;
    if(el.classList.contains('rbw'))el.setAttribute('stroke',cur); else el.setAttribute('fill',cur);
    filled.add(el.dataset.r); tone(500+filled.size*40,.12,'triangle',.1); progress(filled.size/TOTAL);
    if(filled.size>=8)$('#cDone',area).hidden=false;
    if(filled.size===TOTAL)finish();
  });
  let fin=false;
  function finish(){if(fin)return;fin=true;sfx.chime();say('멋진 그림이 완성됐어요!');setTimeout(()=>done(10),900)}
  $('#cDone',area).onclick=finish;
})}

/* ---------- 원하는 것 골라 주기 ---------- */
function babyGame(area,o={}){return new Promise(done=>{
  const W=o.gift?['🧸','🎈','📚','🎀','🍭','⚽']:['🍼','🧸','🎵','🧦','🍪','🛁'];
  const N=6; let r=0,mist=0,who=null;
  area.innerHTML=`<div class="bbg"><div class="bb-top"><div class="bb-p" id="bp"></div><div class="wish" id="wish"></div></div><div class="bb-ch" id="bch"></div></div>`;
  const bp=$('#bp',area), wish=$('#wish',area), ch=$('#bch',area);
  const draw=face=>bp.innerHTML=o.gift?friendPing(who,{face,prop:false}):babyPing(face);
  function round(){
    who=pickOne(FRIENDS); draw('');
    const w=pickOne(W); wish.textContent=w;
    const opts=shuffle([w,...shuffle(W.filter(x=>x!==w)).slice(0,2)]);
    ch.innerHTML=opts.map(x=>`<button data-x="${x}">${x}</button>`).join('');
    ch.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      if(b.dataset.x===w){
        r++; progress(r/N); sfx.chime(); draw('happy'); hop(bp); wish.textContent='💖';
        ch.querySelectorAll('button').forEach(x=>x.disabled=true);
        if(r>=N)setTimeout(()=>done(Math.max(4,10-mist*1.5)),800); else setTimeout(round,900);
      }else{mist++;b.classList.add('shake');sfx.soft();setTimeout(()=>b.classList.remove('shake'),400)}
    });
  }
  round();
})}

/* ---------- 문질러 닦기 ---------- */
function rubGame(area,o={}){return new Promise(done=>{
  area.innerHTML=o.teeth?`<div class="rb teeth"><div class="tooth-row top">${'<i></i>'.repeat(7)}</div><div class="tooth-row bot">${'<i></i>'.repeat(7)}</div></div>`:`<div class="rb"></div>`;
  const box=$('.rb',area), W=box.clientWidth, H=box.clientHeight, N=o.teeth?12:14, spots=[];
  for(let i=0;i<N;i++){
    const sz=52+rand(30), x=o.teeth?130+Math.random()*(W-260):50+Math.random()*(W-100), y=o.teeth?(i%2?H*.71:H*.29)+(Math.random()-.5)*44:50+Math.random()*(H-100);
    const el=document.createElement('div'); el.className=o.teeth?'germ':'dust'; el.style.cssText=`left:${x-sz/2}px;top:${y-sz/2}px;width:${sz}px;height:${sz}px;font-size:${(sz*.6)|0}px`;
    if(o.teeth)el.textContent='🦠';
    box.appendChild(el); spots.push({el,x,y,r:sz/2+14,hp:4,t:0});
  }
  const t0=performance.now(); let left=N, fin=false;
  const rub=e=>{
    if(fin)return; const p=localPt(box,e), now=performance.now();
    for(const s of spots){
      if(s.hp<=0||now-s.t<70||Math.hypot(p.x-s.x,p.y-s.y)>s.r)continue;
      s.t=now; s.hp--; s.el.style.opacity=s.hp/4;
      if(s.hp<=0){left--;progress((N-left)/N);tone(900+(N-left)*30,.1,'triangle',.08);floatFx(box,s.x,s.y,'✨');if(!left)finish()}
    }
  };
  box.addEventListener('pointermove',rub); box.addEventListener('pointerdown',rub);
  const timer=setTimeout(finish,30000*speedMul());
  function finish(){
    if(fin)return; fin=true; clearTimeout(timer);
    const t=(performance.now()-t0)/1000;
    const sc=left>0?(N-left)/N*8:(t<=12?10:Math.max(5,10-(t-12)/3));
    sfx.chime(); setTimeout(()=>done(sc),600);
  }
})}

/* ---------- 거품 목욕 (방울 터뜨리기) ---------- */
function bubbleGame(area){return new Promise(done=>{
  area.innerHTML=`<div class="bub"><div class="bub-tub"><div class="bub-hero">${heroPing({face:'happy'})}</div><div class="tub"><span>🫧</span><span>🫧</span><span>🦆</span></div></div></div>`;
  const box=$('.bub',area), TOTAL=16, sp=1/speedMul(); let made=0,popped=0,fin=false;
  function spawn(){
    if(fin)return;
    if(made>=TOTAL){if(!box.querySelector('.bb2'))end();else setTimeout(spawn,300);return}
    made++; progress(made/TOTAL);
    const b=document.createElement('button'); b.className='bb2'; b.textContent='🫧'; b.setAttribute('aria-label','거품');
    b.style.left=(40+Math.random()*(box.clientWidth-90))+'px'; b.style.animationDuration=(4.4/sp)+'s'; b.style.fontSize=(44+rand(26))+'px';
    b.onpointerdown=e=>{e.preventDefault();if(b.dataset.p)return;b.dataset.p=1;popped++;b.textContent='✨';b.classList.add('pop');tone(700+popped*30,.1,'triangle');setTimeout(()=>b.remove(),250)};
    b.addEventListener('animationend',()=>b.remove());
    box.appendChild(b); setTimeout(spawn,700/sp);
  }
  function end(){if(fin)return;fin=true;sfx.chime();setTimeout(()=>done(popped/TOTAL*10),500)}
  setTimeout(spawn,400);
})}
