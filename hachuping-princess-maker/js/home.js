/* =========================================================
   타이틀 · 저장 슬롯 · 집(방) · 일정 · 한 달 진행 · 달 시작 이벤트
   ========================================================= */
function homeTrack(){return S&&seasonOf(S.mi)===3?'winter':'home'}

/* ---------- 타이틀 ---------- */
function renderTitle(){
  S=null; bgm('title');
  const u=imgUrl('title_bg');
  screen().innerHTML=`<div class="title" style="${bgCSS('title_bg','linear-gradient(#BFE3FF,#FFE3F1 70%,#FFF4E0)')}">
    ${u?'':`<div class="t-castle">${castleSVG()}</div><span class="tdeco cloud" style="left:60px;top:70px">☁️</span><span class="tdeco cloud" style="left:540px;top:40px">☁️</span><span class="tdeco cloud" style="left:1080px;top:110px">☁️</span>`}
    <div class="t-spark">${Array.from({length:14},(_,i)=>`<i style="left:${rand(100)}%;top:${rand(100)}%;animation-delay:-${i*.4}s">✦</i>`).join('')}</div>
    <div class="t-left">
      <div class="logo"><span class="l1">하츄핑</span><span class="l2">프린세스 메이커</span></div>
      <p class="t-sub">아기 하츄핑을 1년 동안 키워서 멋진 공주님으로 만들어 주세요!</p>
      <div class="t-menu">
        <button class="btn pink big" id="tStart" data-say="시작하기">▶ 시작하기</button>
        <button class="btn big" id="tPlay" data-say="놀이터">🎪 놀이터</button>
      </div>
      <div class="t-small">
        <button class="btn sm" id="tBook" data-say="엔딩 도감">📖 엔딩 ${meta.endings.length}/${ENDING_ORDER.length}</button>
        <button class="btn sm" id="tStk" data-say="스티커북">⭐ 스티커 ${meta.stickers.length}/${STICKERS.length}</button>
        <button class="btn sm" id="tAlb" data-say="추억 앨범">📷 앨범</button>
        <button class="btn sm" id="tCfg" data-say="부모님 설정">⚙️ 설정</button>
        <button class="btn sm" id="tFull" data-say="큰 화면">⛶</button>
      </div>
    </div>
    <div class="t-right"><div class="t-cloud"></div><button class="t-ping bob" id="tPing" aria-label="하츄핑">${ping({stage:2,outfit:meta.outfit})}</button></div>
    <div class="t-ver">v${VERSION}</div>
  </div>`;
  $('#tStart').onclick=()=>{ac();sfx.pop();openSlots()};
  $('#tPlay').onclick=()=>{ac();sfx.pop();openPlayground(false)};
  $('#tBook').onclick=()=>{ac();sfx.pop();openBook()};
  $('#tStk').onclick=()=>{ac();sfx.pop();openStickers()};
  $('#tAlb').onclick=()=>{ac();sfx.pop();openAlbum()};
  $('#tCfg').onclick=()=>{ac();sfx.pop();openParentGate()};
  $('#tFull').onclick=()=>{sfx.pop();toggleFullscreen()};
  $('#tPing').onclick=e=>{ac();hop(e.currentTarget);sfx.pop();say(pickOne(['하츄! 안녕! 나는 하츄핑이야!','같이 놀자! 하츄~','오늘은 어떤 공주님이 될까?']))};
}
function openSlots(){
  const card=n=>{
    const s=loadSlot(n);
    if(!s)return `<div class="slotcard empty"><b>슬롯 ${n}</b><div class="sc-ping dim">${ping({stage:0})}</div><small>비어 있어요</small><button class="btn pink" data-new="${n}" data-say="새로 시작">🌱 새로 시작</button></div>`;
    const sum=Object.values(s.stats).reduce((a,b)=>a+b,0);
    return `<div class="slotcard"><b>슬롯 ${n}</b><div class="sc-ping bob">${ping({stage:stageOf(s.mi),outfit:meta.outfit})}</div><small>${MONTHS[s.mi]}월 · ${GROW[stageOf(s.mi)]}<br>⭐ ${sum} · 🪙 ${s.coins} · 👫 ${Object.keys(s.friends).length}</small>
      <button class="btn pink" data-cont="${n}" data-say="이어서 하기">⏩ 이어서 하기</button><button class="btn sm" data-new="${n}" data-say="처음부터">🌱 처음부터</button></div>`;
  };
  const m=openModal(`${headHTML('💾','어디에서 할까요?','세 명까지 따로 키울 수 있어요!')}<div class="slots3">${[1,2,3].map(card).join('')}</div><div class="row"><button class="btn" id="slx" data-say="닫기">✖ 닫기</button></div>`,'wide');
  say('어디에서 할까요? 세 명까지 따로 키울 수 있어요!');
  m.querySelectorAll('[data-cont]').forEach(b=>b.onclick=()=>{sfx.pop();SLOT=+b.dataset.cont;S=loadSlot(SLOT);goScreen(resume)});
  m.querySelectorAll('[data-new]').forEach(b=>b.onclick=()=>{
    const n=+b.dataset.new;
    if(loadSlot(n)&&!b.dataset.armed){b.dataset.armed=1;b.textContent='한 번 더 누르면 새로 시작해요';sfx.soft();say('한 번 더 누르면 처음부터 시작해요');return}
    sfx.chime(); SLOT=n; S=newState(); saveRun(); goScreen(()=>{renderHome(false);intro()});
  });
  $('#slx',m).onclick=()=>{sfx.pop();closeModal()};
}
async function intro(){
  bgm('title');
  const lines=[
    ['narr','하늘 나라에서 아기 하츄핑이 내려왔어요!'],
    ['hachu','안녕! 나는 하츄핑이야! 오늘부터 잘 부탁해!','happy'],
    ['narr','3월부터 2월까지, 1년 동안 하츄핑을 키워 주세요. 어떤 공주님이 될까요?'],
    ['narr','한 달에 할 일을 세 개 골라요. 배우려면 코인이 들고, 아르바이트를 하면 코인을 벌어요!'],
    ['hachu','졸리면 쉬게 해 줘! 친구도 사귀고 모험도 떠나고 싶어!','happy'],
    ['areum','안녕 하츄핑! 우리는 공주님 친구들이야. 나는 아름핑!','happy'],
    ['sappun','나는 사뿐핑! 사뿐사뿐~ 같이 놀자!','happy'],
    ['ponny','나는 뽀니핑! 무지개처럼 신나게 지내자!','happy'],
    ['narr','🛏️ 쉬기에서 친구 초대하기를 고르면 친구들이 집에 놀러 와요!'],
  ];
  const m=openModal(`<div class="intro-sky"><span class="cl" style="left:8%;top:10%">☁️</span><span class="cl" style="right:10%;top:22%">☁️</span><span class="cl" style="left:30%;top:4%;font-size:30px">✨</span><span class="cl" style="right:30%;top:8%;font-size:26px">⭐</span><div class="baby bob">${ping({stage:0,outfit:meta.outfit})}</div></div>`,'wide intro');
  sfx.chime();
  await talkSeq(lines);
  closeModal(); bgm(homeTrack()); bubble('3월이에요! 📅 일정 짜기를 눌러 볼까요?');
}
function resume(){
  renderHome(false);
  if(S.plan&&S.slot<3)runMonth();
  else if(S.plan&&S.slot>=3)monthEnd();
  else bubble(`${monthName()}이에요! 일정을 짜 볼까요?`);
}

/* ---------- 상단 바 ---------- */
function hudHTML(town){
  const mi=S.mi, se=seasonOf(mi);
  const path=MONTHS.map((mm,i)=>{
    const cls=i<mi?'done':i===mi?'now':'';
    const mark=i===mi?'💗':CONTEST_AT[i]?'🏆':i===5?'🎂':i===11?'👑':'';
    return `<span class="pd ${cls}" title="${mm}월">${mark}</span>`;
  }).join('');
  return `<header class="hud">
    <button class="icon" id="hHome" data-say="${town?'집으로':'처음 화면으로'}" aria-label="${town?'집':'처음 화면'}">${town?'🏡':'🏠'}</button>
    <div class="mbadge s${se}" data-say="${monthName()}, ${SEASON[se]}"><b>${MONTHS[mi]}</b><span>월</span><i>${SEASON_I[se]}</i></div>
    <div class="path" data-say="${monthName()}이에요. 2월이 끝나면 공주님이 돼요">${path}</div>
    <div class="coins" data-say="코인 ${S.coins}개">🪙 ${S.coins}</div>
    <button class="icon" id="hSnd" data-say="배경음악" aria-label="배경음악">${CFG.bgm?'🎵':'🔇'}</button>
    <button class="icon" id="hCfg" data-say="부모님 설정" aria-label="설정">⚙️</button>
    <button class="icon" id="hFull" data-say="큰 화면" aria-label="큰 화면">⛶</button>
  </header>`;
}
function bindHud(){
  const town=!!screen().querySelector('.town');
  $('#hHome').onclick=()=>{sfx.pop();hush();saveRun();goScreen(town?()=>renderHome(false):renderTitle)};
  $('#hSnd').onclick=e=>{CFG.bgm=!CFG.bgm;saveCfg();e.currentTarget.textContent=CFG.bgm?'🎵':'🔇';if(CFG.bgm)bgm(town?'town':homeTrack());else bgmStop(true)};
  $('#hCfg').onclick=()=>{sfx.pop();openParentGate()};
  $('#hFull').onclick=()=>{sfx.pop();toggleFullscreen()};
}

/* ---------- 방 ---------- */
function roomHTML(mini){
  const se=seasonOf(S?S.mi:0), r=meta.room;
  const view=['🌸','☀️','🍁','⛄'][se];
  const fu=(slot,def,cls,style)=>{const id=r[slot]||def;return id?`<div class="fu ${cls}" style="${style}" data-slot="${slot}">${furnSVG(id)}</div>`:''};
  return `<div class="room r${se}">
    <div class="wall"></div><div class="wains"></div><div class="floor"></div>
    <div class="window"><div class="win-view"><span class="wv">${view}</span>${Array.from({length:5},(_,i)=>`<span class="wfall" style="left:${10+i*20}%;animation-delay:-${i*1.1}s">${SEASON_P[se]}</span>`).join('')}</div><div class="curtain-l"></div><div class="curtain-r"></div><div class="sill"></div></div>
    <button class="door" id="door" data-say="마을로 나가기" ${mini?'tabindex="-1"':''}><span>🗺️</span><b>마을</b></button>
    ${fu('wall',null,'f-wall','left:500px;top:92px;width:440px')}
    ${fu('plant',null,'f-plant','left:350px;top:262px;width:74px')}
    ${fu('shelf',null,'f-shelf','left:845px;top:240px;width:160px')}
    ${fu('lamp',null,'f-lamp','left:770px;top:300px;width:74px')}
    ${fu('bed','bed_basic','f-bed','left:282px;top:398px;width:270px')}
    ${fu('rug','rug_basic','f-rug','left:470px;top:536px;width:340px')}
    ${fu('toy',null,'f-toy','left:840px;top:470px;width:140px')}
  </div>`;
}

/* ---------- 집 화면 ---------- */
function renderHome(greet){
  bgm(homeTrack());
  const g=stageOf(), t=S.mood<30;
  const rows=STATS.map(s=>`<div class="srow" data-say="${s.n} ${S.stats[s.k]}"><span class="si" style="background:${s.c}2E">${s.i}</span><div><div class="sn">${s.n}</div><div class="bar"><i style="width:${S.stats[s.k]}%;background:${s.c}"></i></div></div><b class="sv">${S.stats[s.k]}</b></div>`).join('');
  const snackN=Object.values(S.snacks).reduce((a,b)=>a+b,0);
  const story=metFriends().find(f=>pendingStory(f));
  const ck=CONTEST_AT[S.mi], C=ck?(ck==='autumn'?{n:'가을 축제',i:'🍂'}:CONTESTS[ck]):null;
  const cal=CAL_INFO[S.mi];
  screen().innerHTML=`<div class="home">
    ${roomHTML()}
    <div class="bubble" id="bubble"></div>
    <button class="hero bob g${g}" id="hero" aria-label="하츄핑">${heroPing({sleepy:t})}</button>
    ${hudHTML()}
    <aside class="statcard glass">
      <div class="grow" data-say="${GROW[g]}">${GROW[g]}</div>
      <div class="tag" data-say="성격, ${persName()} 하츄핑">✨ ${persName()} 하츄핑</div>
      ${rows}
      <div class="sep"></div>
      <div class="srow" data-say="기분 ${S.mood}"><span class="si" style="background:${MOOD_C}2E">${t?'💤':'💗'}</span><div><div class="sn">기분</div><div class="bar"><i style="width:${S.mood}%;background:${MOOD_C}"></i></div></div><b class="sv">${S.mood}</b></div>
      <div class="mini-info"><span data-say="키 ${S.height}센티미터">📏 ${S.height}cm</span><span data-say="메달 ${S.medals.length}개">🏅 ${S.medals.length}</span></div>
    </aside>
    <aside class="notecard glass">
      <h3>📌 ${monthName()} 소식</h3>
      ${cal?`<p data-say="${noEmoji(cal)}">${cal}</p>`:''}
      ${C?`<p data-say="이번 달 말에 ${C.n}">${C.i} 이번 달 말 <b>${C.n}</b></p>`:''}
      ${S.mi===11?'<p data-say="이번 달 말에 왕국 무도회">💃 이번 달 말 <b>무도회</b></p>':''}
      <p data-say="${S.talked?'대화는 다음 달에':'대화 한 번 남았어요'}">💬 대화 ${S.talked?'✔':'<b>1번 남음</b>'}</p>
      <p data-say="${S.played?'친구랑 놀기는 다음 달에':'친구랑 놀기 한 번 남았어요'}">🎈 친구 놀기 ${S.played?'✔':'<b>1번 남음</b>'}</p>
      ${story?`<p class="hot" data-say="${josa(story.n,'이','가')} 이야기를 기다려요">💌 ${josa(story.n,'이','가')} 기다려요!</p>`:''}
    </aside>
    <nav class="dock">
      <button class="cmd main pulse" id="cPlan" data-say="일정 짜기"><span class="ai">📅</span><span class="an">일정 짜기</span></button>
      <button class="cmd" id="cTalk" data-say="대화하기" style="--ac:#4EA8F5"><span class="ai">💬</span><span class="an">대화</span>${S.talked?'':'<span class="badge">1</span>'}</button>
      <button class="cmd" id="cSnack" data-say="간식 주기" style="--ac:#FF9466"><span class="ai">🍪</span><span class="an">간식</span>${snackN?`<span class="badge">${snackN}</span>`:''}</button>
      <button class="cmd" id="cTown" data-say="마을" style="--ac:#3DBB84"><span class="ai">🗺️</span><span class="an">마을</span></button>
      <button class="cmd" id="cFriends" data-say="친구들" style="--ac:#FFB15C"><span class="ai">👫</span><span class="an">친구</span>${story?'<span class="badge">💌</span>':''}</button>
      <button class="cmd" id="cCloset" data-say="옷장" style="--ac:#9B7BFF"><span class="ai">👗</span><span class="an">옷장</span></button>
      <button class="cmd" id="cRoom" data-say="방 꾸미기" style="--ac:#E9A400"><span class="ai">🛋️</span><span class="an">꾸미기</span></button>
      <button class="cmd" id="cDiary" data-say="일기장" style="--ac:#FF6FA8"><span class="ai">📔</span><span class="an">일기</span></button>
    </nav>
  </div>`;
  bindHud();
  const on=(id,fn)=>$('#'+id).onclick=()=>{ac();sfx.pop();fn()};
  on('cPlan',openSchedule); on('cTalk',openTalk); on('cSnack',openSnack); on('cTown',()=>goScreen(renderTown));
  on('cFriends',openFriends); on('cCloset',()=>openCloset()); on('cRoom',openRoom); on('cDiary',()=>openDiary(false));
  on('door',()=>goScreen(renderTown));
  $('#hero').onclick=e=>{
    ac(); hop(e.currentTarget); sfx.pop();
    const p=localPt(screen(),e); floatFx(screen(),p.x,p.y);
    const lines=S.mood<30?['하암~ 졸려요 💤','쉬고 싶어요…','소풍 가고 싶어요!']:
      ['하츄~! 사랑해요 💗','간지러워요! 히히','오늘도 반짝반짝!','같이 놀아요!','나는 공주님이 될 거예요!',`나는 ${persName()} 하츄핑이에요!`,'마을에 놀러 가고 싶어요!'];
    bubble(pickOne(lines));
  };
  if(greet){
    const se=seasonOf(S.mi);
    if(t)bubble('하암… 졸려요. 이번 달엔 쉬는 칸도 넣어 줄래요? 💤');
    else if(S.mi%3===0&&S.mi>0)bubble(`${SEASON[se]}이 왔어요! ${SEASON_I[se]} 일정을 짜 볼까요?`);
    else bubble(`${monthName()}이에요! 일정을 짜 볼까요?`);
  }
}
function refreshHome(){if(screen().querySelector('.home'))renderHome(false)}
function bubble(text){const b=$('#bubble');if(!b)return;b.textContent=text;b.style.animation='none';void b.offsetWidth;b.style.animation='';say(text)}

/* ---------- 일정 짜기 ---------- */
function openSchedule(){
  let plan=[], cat='learn';
  const m=openModal(`${headHTML('📅',`${monthName()} 일정 짜기`,'할 일 세 개를 골라요!')}
    <div class="slots" id="slots"></div><div class="budget" id="budget"></div>
    <div class="tabs" id="ctabs">${CATS.map(c=>`<button class="tab" data-c="${c.k}" data-say="${c.n}">${c.i} ${c.n}</button>`).join('')}</div>
    <div class="acards" id="acards"></div><div class="note warn" id="warn" hidden></div>
    <div class="row"><button class="btn" id="sBack" data-say="닫기">✖ 닫기</button><button class="btn pink big" id="sGo" data-say="시작">▶ 시작!</button></div>`,'wide');
  say(`${monthName()} 일정 짜기! 할 일 세 개를 골라요!`);
  const project=()=>{let c=S.coins,md=S.mood;for(const k of plan){const A=ACTS[k];if(A.cost)c-=A.cost;if(A.coin)c+=A.coin;md=clamp(md+(A.mood||0))}return {c,md}};
  const lockReason=A=>{
    if(A.unlockMi&&S.mi<A.unlockMi)return `🔒 ${monthName(A.unlockMi)}부터`;
    if(A.need)for(const [k,v] of Object.entries(A.need))if(S.stats[k]<v)return `🔒 ${ST[k].i} ${v} 필요`;
    if(A.cost&&project().c<A.cost)return '🪙 코인이 모자라요';
    return null;
  };
  function draw(){
    $('#slots',m).innerHTML=[0,1,2].map(i=>{
      const k=plan[i];
      if(!k)return `<div class="slot"><span class="no">${i+1}</span><span class="q">?</span><span class="sl" style="color:var(--ink-soft)">${ORDN[i]} 칸</span></div>`;
      const A=ACTS[k];
      return `<button class="slot full" data-rm="${i}" data-say="${A.n}. 누르면 빼요"><span class="no">${i+1}</span><span class="x">✖</span><span class="bigi">${A.i}</span><span class="sl">${A.n}</span></button>`;
    }).join('');
    const p=project();
    $('#budget',m).innerHTML=`<span data-say="코인">🪙 ${S.coins} → ${p.c}</span><span class="${p.md<20?'bad':''}" data-say="기분">💗 ${S.mood} → ${p.md}</span>`;
    m.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.c===cat));
    $('#acards',m).innerHTML=Object.values(ACTS).filter(A=>A.cat===cat).map(A=>{
      const lk=lockReason(A), col=A.gain?ST[Object.keys(A.gain)[0]].c:A.cat==='adv'?'#4EA8F5':MOOD_C;
      return `<button class="acard" data-k="${A.key}" style="--ac:${col}" ${lk||plan.length>=3?'disabled':''} data-say="${A.n}${lk?'. '+noEmoji(lk):''}"><span class="ai">${A.i}</span><span class="an">${A.n}</span>${effectChips(A)}${lk?`<span class="lk">${lk}</span>`:''}</button>`;
    }).join('');
    const w=$('#warn',m); w.hidden=!(plan.length&&p.md<20);
    w.textContent='💤 너무 바빠요! 🛏️ 쉬기를 넣으면 하츄핑이 기뻐해요.';
    $('#sGo',m).disabled=plan.length<3;
    m.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{plan.splice(+b.dataset.rm,1);sfx.soft();draw()});
    m.querySelectorAll('.acard').forEach(b=>b.onclick=()=>{
      if(plan.length>=3)return;
      plan.push(b.dataset.k); sfx.click();
      say(plan.length===3?`${ACTS[b.dataset.k].n}. 다 골랐어요! 시작을 눌러요!`:ACTS[b.dataset.k].n);
      draw();
    });
  }
  m.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{cat=b.dataset.c;sfx.click();draw()});
  $('#sBack',m).onclick=()=>{sfx.pop();closeModal()};
  $('#sGo',m).onclick=()=>{if(plan.length<3)return;sfx.chime();S.plan=plan;S.slot=0;saveRun();runMonth()};
  draw();
}

/* ---------- 한 달 진행 ---------- */
async function runMonth(){
  while(S.slot<3){await runSlot(S.slot);S.slot++;saveRun();checkStickers()}
  await monthEnd();
}
function applyAct(A,mult){
  const acc=newAcc(), tf=(S.mood<30&&A.cat!=='rest')?.7:1;
  for(const [k,v] of Object.entries(A.gain||{}))accStat(acc,k,Math.max(1,Math.round(v*mult*tf)));
  if(A.cost)accCoins(acc,-A.cost);
  if(A.coin)accCoins(acc,Math.round(A.coin*mult*tf));
  if(A.mood)accMood(acc,A.mood>0?Math.round(A.mood*mult):A.mood);
  if(A.pers)S.pers[A.pers]++;
  S.cnt[A.key]=(S.cnt[A.key]||0)+1;
  return acc;
}
function friendEncounter(fid){
  if(!fid)return null;
  const f=FR[fid];
  if(!(fid in S.friends)){if(Math.random()<.45){S.friends[fid]=1;diary('👫',`새 친구 ${josa(f.n,'을','를')} 만났어요!`);return {f,first:true}}return null}
  if(S.friends[fid]<5&&Math.random()<.35){addHeart(fid);return {f,first:false}}
  return null;
}
async function runSlot(i){
  let A=ACTS[S.plan[i]], note='';
  if(A.cost&&S.coins<A.cost){A=ACTS.rest;note='🪙 코인이 모자라서 대신 푹 쉬었어요.'}
  else if(A.cat!=='rest'&&S.mood<10){A=ACTS.rest;note='🤧 너무 피곤해서 이번에는 쉬었어요.'}
  if(note){
    const m=openModal(`<div class="center"><div style="font-size:70px">${note.slice(0,2)}</div><h2>${note.slice(2)}</h2><div class="row"><button class="btn pink big" data-v="ok" data-say="알겠어요">알겠어요 ▶</button></div></div>`);
    say(note); await pick(m);
  }
  if(A.cat==='adv')return runAdventure(A);
  if(A.special==='invite')return runInvite(A);
  bgm(homeTrack());
  const isRest=A.cat==='rest', cuddle=A.key==='rest';
  const m=openModal(`<div class="center"><span class="slot-pill">${monthName()} · ${ORDN[i]} 칸</span><h2 class="big-title">${A.i} ${A.n}</h2></div>
    ${sceneBox(A.img,A.bg,A.deco,`<div class="sc-hero bob">${heroPing(cuddle?{face:'sleepy'}:{})}</div>${imgUrl(A.img)?'':`<span class="sc-prop">${A.prop}</span>`}`)}
    <div class="ticker" id="tick">${'<span></span>'.repeat(10)}</div>
    <div class="row" id="ch"><button class="btn pink big" data-v="play" data-say="${cuddle?'쓰다듬어 주기':'내가 할래'}">${cuddle?'🤗 쓰다듬어 주기':'🎮 내가 할래!'}</button><button class="btn big" data-v="auto" data-say="하츄핑 혼자">▶ 하츄핑 혼자</button></div>
    <p class="hint" id="hint">${isRest?'직접 하면 기분이 더 좋아져요!':'내가 하면 점수가 더 많이 올라요!'}</p>`,'wide');
  say(`${ORDN[i]} 칸, ${A.n}! ${isRest?'같이 해 볼까요?':'직접 해 볼까요?'}`);
  const v=await pick($('#ch',m));
  let score=null;
  if(v==='play')score=await playGame(Array.isArray(A.game)?pickOne(A.game):A.game);
  const great=score==null?Math.random()<.2:score>=8;
  const mult=score==null?(great?1.3:1):1+score*.06;
  const tired=S.mood<30&&!isRest;
  const res=applyAct(A,mult);
  diary(A.i,A.say+(great&&!isRest?' 대성공!':''));
  if(score==null){$('#ch',m).innerHTML='';$('#hint',m).textContent='열심히 하는 중…';await ticker(m,great)}
  const mt=friendEncounter(A.friend);
  const item=(score!=null&&score>=7&&Math.random()<.15)?grantShopItem():null;
  const title=isRest?(A.doneT||(A.key==='picnic'?'신나는 소풍!':'푹 쉬었어요!')):great?'대성공!':'성공!';
  const r=openModal(`<div class="center"><div class="res-hero bob">${heroPing({face:'happy'})}</div>
    <div class="res-title">${title}</div><div class="res-stars">${isRest?'💗💗💗':great?'🌟🌟🌟':'⭐⭐'}</div>
    <div class="chips">${chipsHTML(res)}</div>
    ${tired?'<div class="note">💤 조금 졸려서 평소보다 덜 올랐어요. 쉬는 칸도 넣어 주세요!</div>':''}
    ${meetHTML(mt)}${giftHTML(item,'선물을 받았어요!')}
    <div class="row"><button class="btn pink big" data-v="next" data-say="다음">${i===2?'이번 달 끝! ▶':'다음 칸 ▶'}</button></div></div>`);
  sfx.fanfare();
  say(`${title} ${speechOf(res)}${meetSpeech(mt)}${item?' 그리고 '+josa(item.n,'을','를')+' 받았어요!':''}`);
  bindGift(r);
  await pick(r);
}
async function ticker(m,great){
  const cells=$$('#tick span',m), hero=$('.sc-hero',m);
  for(let d=0;d<10;d++){
    cells[d].textContent=great&&Math.random()<.6?'🌟':'⭐'; cells[d].classList.add('on');
    tone(500+d*40,.1,'triangle',.08); if(d%3===0)hop(hero);
    await wait(260);
  }
  await wait(350);
}
async function monthEnd(){
  S.slot=3;
  const ck=CONTEST_AT[S.mi];
  if(ck&&!S.medals.some(x=>x.mi===S.mi)){await runContestFlow(ck);saveRun()}
  if(S.mi>=11)return runEnding();
  const before=stageOf();
  S.mi++; S.plan=null; S.slot=0; S.talked=false; S.played=false; S.parked=false;
  S.height=+(S.height+1.6+S.stats.body/60+Math.random()*.6).toFixed(1); S.heights.push(S.height);
  saveRun(); checkStickers();
  closeModal(); renderHome(false);
  if(stageOf()>before)await growUp(before,stageOf());
  await monthStart();
  saveRun(); closeModal(); renderHome(true); checkStickers();
}
async function growUp(a,b){
  const m=openModal(`<div class="center"><h2 class="big-title">쑥쑥! 하츄핑이 자랐어요!</h2>
    <div class="grow-box"><div class="a">${ping({stage:a,outfit:meta.outfit})}</div><div class="arr">✨</div><div class="b bob">${ping({stage:b,outfit:meta.outfit,face:'happy'})}</div></div>
    <p class="intro-txt" style="min-height:0">${josa(GROW[b],'이','가')} 되었어요! 날개도 커졌어요!</p>
    <div class="row"><button class="btn pink big" data-v="ok" data-say="좋아요">좋아요! ▶</button></div></div>`);
  sfx.fanfare(); confetti(24);
  say(`쑥쑥! 하츄핑이 자랐어요! ${josa(GROW[b],'이','가')} 되었어요!`);
  diary('🌱',`쑥쑥 자라서 ${josa(GROW[b],'이','가')} 되었어요!`);
  await pick(m);
}

/* ---------- 이벤트 창 ---------- */
async function eventModal(o){
  const inner=`<div class="ev-in"><div class="ev-hero bob">${heroPing({face:o.face||''})}</div><div class="ev-ic">${o.icon}</div></div>`;
  const m=openModal(`<div class="center">${o.img!==undefined?sceneBox(o.img,o.bg||'linear-gradient(#FFF0F8,#EDE4FF)',o.deco||['✨','💗','🌸','⭐','🎀'],inner,'ev-scene'):`<div class="ev-art">${inner}</div>`}
    <h2 class="big-title">${o.title}</h2>${o.text?`<p class="ev-p">${o.text}</p>`:''}${o.chips?`<div class="chips">${o.chips}</div>`:''}${o.extra||''}
    <div class="row">${o.choices.map(c=>`<button class="btn ${c.pink?'pink':''} big" data-v="${c.v}" data-say="${noEmoji(c.l)}">${c.l}</button>`).join('')}</div></div>`,'wide');
  say(o.title+' '+(o.text||''));
  if(o.extra)bindGift(m);
  return pick(m);
}
const OK=[{v:'ok',l:'좋아요 ▶',pink:1}];
async function eventDone(icon,title,acc,more={}){
  sfx.chime();
  await eventModal({icon,title,face:'happy',chips:acc?chipsHTML(acc):'',text:acc?speechOf(acc):'',choices:OK,...more});
}

/* ---------- 계절 행사 (달마다) ---------- */
const CAL_INFO = {1:'🌸 벚꽃 축제',2:'🎈 어린이날',4:'🏖️ 여름 바다',5:'🎂 하츄핑 생일',6:'🌕 추석',7:'🎃 할로윈',8:'🍁 단풍 편지',9:'🎄 크리스마스',10:'🧧 설날',11:'🍫 초콜릿 만들기'};
const CAL = {
  1: async()=>{
    const fs=metFriends().slice(0,3);
    const v=await eventModal({img:'ev_cherry',bg:'linear-gradient(#FFE6F0,#FFF5FA)',deco:['🌸','🌸','🌳','🌸','🌸'],icon:'🌸',title:'벚꽃 축제가 열렸어요!',text:'누구랑 같이 갈까요?',
      choices:[...fs.map(f=>({v:f.id,l:`${josa(f.n,'이랑','랑')}`})),{v:'family',l:'🏡 가족이랑',pink:!fs.length}]});
    const a=newAcc();
    if(FR[v]){addHeart(v);accMood(a,15);diary('🌸',`${josa(FR[v].n,'과','와')} 벚꽃 축제에 갔어요.`);await eventDone('🌸',`${josa(FR[v].n,'과','와')} 벚꽃을 봤어요! 우정이 더 깊어졌어요!`,a)}
    else{accMood(a,20);diary('🌸','가족이랑 벚꽃 축제에 갔어요.');await eventDone('🌸','가족이랑 벚꽃 길을 걸었어요!',a)}
  },
  2: async()=>{
    const v=await eventModal({icon:'🎈',title:'오늘은 어린이날이에요!',text:'어떤 선물을 받을까요?',img:'',bg:'linear-gradient(#FFF3C4,#FFE0EE)',deco:['🎈','🎁','🎈','🎉','🎀'],
      choices:[{v:'cloth',l:'🎁 새 옷',pink:1},{v:'coin',l:'🪙 코인 50개'},{v:'snack',l:'🍰 간식 세 개'}]});
    const a=newAcc(); let it=null;
    if(v==='cloth'){it=grantShopItem();if(!it)accCoins(a,50)}
    else if(v==='coin')accCoins(a,50);
    else{addSnack('cake');addSnack('icecream');addSnack('cookie')}
    accMood(a,10); diary('🎈','어린이날 선물을 받았어요!');
    await eventDone('🎁',v==='snack'?'간식 세 개를 받았어요! 🍰🍦🍪':'어린이날 선물을 받았어요!',a,{extra:giftHTML(it,'어린이날 선물!')});
  },
  4: async()=>{
    const v=await eventModal({img:'ev_beach',bg:'linear-gradient(#BDEBFF,#FFF0C8 70%)',deco:['☀️','🌊','🐚','⛱️','🦀'],icon:'🏖️',title:'여름 바다에 놀러 왔어요!',text:'무엇을 하고 놀까요?',
      choices:[{v:'castle',l:'🏰 큰 모래성'},{v:'heart',l:'💗 하트 모래성'},{v:'shell',l:'🐚 조개 줍기'}]});
    const a=newAcc(); accMood(a,20);
    if(v==='castle')accStat(a,'charm',2); else if(v==='heart')accStat(a,'art',2); else accCoins(a,15);
    diary('🏖️','여름 바다에서 신나게 놀았어요!');
    await eventDone('🏖️','바다에서 신나게 놀았어요!',a);
  },
  5: birthday,
  6: async()=>{
    const v=await eventModal({img:'ev_chuseok',bg:'linear-gradient(#2E2A6E,#7A5CC8)',deco:['🌕','✨','🍂','⭐','🏮'],icon:'🌕',title:'추석이에요! 송편을 빚어요!',text:'직접 빚어 볼까요?',
      choices:[{v:'play',l:'🎮 내가 빚을래!',pink:1},{v:'auto',l:'▶ 같이 빚기'}]});
    let n=2; if(v==='play'){const sc=await playGame('songpyeon');n=sc>=8?4:3}
    addSnack('songpyeon',n); const a=newAcc(); accStat(a,'kind',2); accMood(a,10);
    diary('🌕',`추석에 송편을 ${n}개 빚었어요. 보름달에 소원도 빌었어요.`);
    await eventDone('🍡',`송편 ${n}개를 만들었어요! 보름달에 소원도 빌었어요!`,a);
  },
  7: async()=>{
    const v=await eventModal({img:'ev_halloween',bg:'linear-gradient(#3A2A5E,#FF9A3C 140%)',deco:['🎃','🦇','🍬','👻','🌙'],icon:'🎃',title:'할로윈 파티예요!',text:'무슨 분장을 할까요?',
      choices:[{v:'witch',l:'🧙 마법사'},{v:'ghost',l:'👻 유령'},{v:'pumpkin',l:'🎃 호박'}]});
    addSnack('candy',3); const a=newAcc(); accMood(a,15);
    if(v==='witch')accStat(a,'magic',2); else if(v==='ghost')accStat(a,'art',2); else accStat(a,'body',2);
    const it=grant('pumpkin');
    diary('🎃','할로윈 파티에서 사탕을 잔뜩 받았어요!');
    await eventDone('🍬','사탕을 세 개나 받았어요! 트릭 오어 트릿!',a,{extra:giftHTML(it,'할로윈 선물!')});
  },
  8: async()=>{
    const fs=metFriends();
    const v=await eventModal({img:'',bg:'linear-gradient(#FFE3C2,#FFD0B0)',deco:['🍁','🍂','🍁','🌰','🍂'],icon:'🍁',title:'단풍잎이 예쁘게 물들었어요!',text:'단풍잎으로 무엇을 할까요?',
      choices:[{v:'letter',l:'💌 친구에게 편지'},{v:'mark',l:'🔖 책갈피 만들기'},{v:'draw',l:'🎨 단풍 그림'}]});
    const a=newAcc();
    if(v==='letter'){if(fs.length){const f=pickOne(fs);addHeart(f.id);accStat(a,'kind',1);diary('💌',`${f.n}에게 단풍잎 편지를 보냈어요.`);await eventDone('💌',`${f.n}에게 편지를 보냈어요! 아주 좋아했어요!`,a);return}accStat(a,'kind',2)}
    else if(v==='mark')accStat(a,'smart',2); else accStat(a,'art',2);
    diary('🍁','단풍잎으로 예쁜 것을 만들었어요.');
    await eventDone('🍁','단풍잎으로 예쁜 걸 만들었어요!',a);
  },
  9: async()=>{
    await eventModal({img:'ev_christmas',bg:'linear-gradient(#1F3A5E,#3C6EA8)',deco:['🎄','⭐','❄️','🎁','🔔'],icon:'🎄',title:'메리 크리스마스!',text:'산타 할아버지가 선물을 두고 가셨어요!',choices:[{v:'open',l:'🎁 선물 열어 보기',pink:1}]});
    const it=grant('d_santa')||grantShopItem(); const a=newAcc(); accMood(a,20); if(!it)accCoins(a,50);
    diary('🎄','크리스마스에 산타 할아버지 선물을 받았어요!');
    sfx.fanfare(); confetti(30);
    await eventDone('🎅','와! 크리스마스 선물이에요!',a,{extra:giftHTML(it,'산타 할아버지 선물!')});
  },
  10: async()=>{
    await eventModal({img:'ev_seollal',bg:'linear-gradient(#FFE8E0,#FFF6E0)',deco:['🧧','🎎','🪁','🏮','✨'],icon:'🧧',title:'설날이에요!',text:'어른들께 세배를 해요!',choices:[{v:'bow',l:'🙇 새해 복 많이 받으세요!',pink:1}]});
    const c=30+rand(4)*10, a=newAcc(); accCoins(a,c); accStat(a,'charm',2); accMood(a,10);
    S.height=+(S.height+1).toFixed(1); S.heights[S.heights.length-1]=S.height;
    const it=grant('d_hanbok'); meta.st.seollal++; saveMeta();
    diary('🧧',`설날에 세배하고 세뱃돈 ${c}코인을 받았어요. 떡국을 먹고 키도 컸어요!`);
    await eventDone('🥣',`세뱃돈 ${c}코인! 떡국을 먹고 한 살 더 먹었어요!`,a,{extra:giftHTML(it,'설날 선물이에요!')});
  },
  11: async()=>{
    const fs=metFriends();
    const v=await eventModal({img:'',bg:'linear-gradient(#FFE0EA,#F4E0D2)',deco:['🍫','💝','🍫','✨','💗'],icon:'🍫',title:'초콜릿을 만들었어요!',text:'누구에게 줄까요?',
      choices:fs.length?[{v:'all',l:'💝 친구들 모두에게',pink:1},{v:'me',l:'😋 내가 먹을래!'}]:[{v:'me',l:'😋 맛있게 먹기',pink:1}]});
    const a=newAcc();
    if(v==='all'){fs.forEach(f=>addHeart(f.id));accStat(a,'kind',2);diary('💝','친구들에게 초콜릿을 나눠 줬어요.');await eventDone('💝','친구들이 모두 고마워했어요! 하트가 하나씩 늘었어요!',a)}
    else{addSnack('choco',2);accMood(a,15);diary('🍫','달콤한 초콜릿을 만들었어요.');await eventDone('🍫','초콜릿 두 개가 생겼어요!',a)}
  },
};
async function birthday(){
  const fs=metFriends(); fs.forEach(f=>addHeart(f.id));
  const a=newAcc(); accMood(a,30); accCoins(a,30);
  const item=grant('balloon')||grantShopItem(); meta.st.birthdays++; saveMeta();
  diary('🎂','생일 파티를 했어요! 모두 축하해 줬어요!');
  const m=openModal(`<div class="center"><h2 class="big-title">🎂 오늘은 하츄핑 생일이에요!</h2>
    ${sceneBox('ev_birthday','linear-gradient(#FFE7F3,#FFF3D6)',['🎈','🎉','🎂','🎁','🎈'],`<div class="ball-in">${lineupHTML(fs)}</div>`,'ball')}
    <p class="ev-p">${fs.length?josa(fs.map(f=>f.n).join(', '),'이','가')+' 축하하러 왔어요!':'생일 축하해요, 하츄핑!'}</p>
    <div class="chips">${chipsHTML(a)}</div>${giftHTML(item,'생일 선물이에요!')}
    <div class="row"><button class="btn pink big" data-v="ok" data-say="고마워요">고마워요! ▶</button></div></div>`,'wide');
  sfx.fanfare(); confetti(40);
  say(`생일 축하해요, 하츄핑! ${fs.length?'친구들이 축하하러 왔어요!':''}${item?' 선물로 '+josa(item.n,'을','를')+' 받았어요!':''}`);
  bindGift(m); await pick(m);
}

/* ---------- 깜짝 이벤트 ---------- */
const EVENTS=[
  {id:'bird',run:async()=>{
    const v=await eventModal({icon:'🐦',title:'아기 새가 둥지에서 떨어졌어요!',text:'어떻게 할까요?',choices:[{v:'help',l:'🤲 둥지에 올려 주기',pink:1},{v:'pass',l:'🙈 그냥 지나가기'}]});
    if(v==='help'){const a=newAcc();accStat(a,'kind',4);S.pers.kind++;diary('🐦','아기 새를 둥지에 올려 줬어요.');await eventDone('🐦','아기 새가 고맙다고 노래해 줬어요!',a)}
    else await eventDone('🐦','엄마 새가 와서 아기 새를 데려갔어요. 다음엔 꼭 도와줘요!',null);
  }},
  {id:'purse',run:async()=>{
    const v=await eventModal({icon:'👛',title:'길에서 코인 주머니를 주웠어요!',text:'어떻게 할까요?',choices:[{v:'give',l:'🙋 주인 찾아 주기',pink:1},{v:'keep',l:'😊 내가 가질래'}]});
    const a=newAcc();
    if(v==='give'){accStat(a,'kind',3);accStat(a,'charm',2);S.pers.grace++;if('baro' in S.friends)addHeart('baro');diary('👛','주운 코인 주머니를 주인에게 돌려줬어요.');
      await eventDone('🙇',`주인 할머니가 아주 고마워했어요!${'baro' in S.friends?' 바로핑도 칭찬해 줬어요!':''}`,a)}
    else{accCoins(a,20);await eventDone('🪙','코인 20개가 생겼어요!',a)}
  }},
  {id:'rainbow',run:async()=>{const a=newAcc();accMood(a,10);diary('🌈','비가 그치고 무지개를 봤어요.');await eventDone('🌈','비가 그치고 무지개가 떴어요!',a)}},
  {id:'star',run:async()=>{
    const v=await eventModal({icon:'🌠',title:'별똥별이 떨어졌어요! 소원을 빌어요!',text:'어떤 소원을 빌까요?',choices:[{v:'kind',l:'💗 친구가 많아지게'},{v:'magic',l:'✨ 마법을 잘하게'},{v:'charm',l:'👑 멋진 공주님이 되게'}]});
    const a=newAcc(); accStat(a,v,3); diary('🌠','별똥별에게 소원을 빌었어요.'); await eventDone('🌠','소원을 빌었더니 마음이 반짝반짝해요!',a);
  }},
  {id:'drawing',run:async()=>{
    const v=await eventModal({icon:'🖼️',title:'하츄핑이 그림을 그려 왔어요!',text:'뭐라고 해 줄까요?',choices:[{v:'praise',l:'👏 칭찬해 주기',pink:1},{v:'hang',l:'🖼️ 벽에 걸어 주기'}]});
    const a=newAcc(); if(v==='praise'){accMood(a,10);accStat(a,'art',2)}else accMood(a,15);
    await eventDone('🥰','하츄핑이 아주 기뻐해요!',a);
  }},
  {id:'visit',cond:()=>metFriends().length>0,run:async()=>{
    const f=pickOne(metFriends()); addHeart(f.id); const a=newAcc(); accMood(a,10);
    diary('🎈',`${josa(f.n,'이','가')} 집에 놀러 왔어요.`);
    await eventModal({icon:friendPing(f,{face:'happy'}),title:`${josa(f.n,'이','가')} 놀러 왔어요!`,text:`같이 신나게 놀았어요! ${heartsHTML(S.friends[f.id])}`,face:'happy',chips:chipsHTML(a),choices:OK});
  }},
  {id:'letter',cond:()=>metFriends().length>0,run:async()=>{
    const f=pickOne(metFriends()); addHeart(f.id); const sn=SN[f.fav]; addSnack(sn.id);
    await eventModal({icon:'💌',title:`${f.n}에게서 편지가 왔어요!`,text:`"우리 또 놀자!" ${sn.i} ${sn.n}도 같이 왔어요!`,face:'happy',choices:OK});
  }},
];
async function monthStart(){
  if(S.mood<20){
    const a=newAcc(); accMood(a,20);
    await eventModal({icon:'🤧',title:'콜록콜록! 하츄핑이 감기에 걸렸어요',text:'따뜻한 차를 마시고 푹 잤어요. 이번 달엔 쉬는 칸을 꼭 넣어 주세요!',face:'sleepy',chips:chipsHTML(a),choices:OK});
    diary('🤧','감기에 걸렸지만 푹 자고 나았어요.');
  }
  let happened=false;
  if(CAL[S.mi]){await CAL[S.mi]();happened=true}
  const f=metFriends().find(x=>pendingStory(x));
  if(f){await playStory(f);happened=true}
  if(!happened&&Math.random()<.6){const pool=EVENTS.filter(e=>!e.cond||e.cond());await pickOne(pool).run()}
}

/* 벚꽃 축제 → 플로라 하츄핑, 여름 바다 → 베리 하츄핑 */
{const c1=CAL[1],c4=CAL[4];CAL[1]=async()=>{await c1();await formReveal('flora')};CAL[4]=async()=>{await c4();await formReveal('berry')}}
