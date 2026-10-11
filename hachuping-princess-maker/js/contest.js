/* =========================================================
   대회
   ========================================================= */
async function runContestFlow(ck){
  bgm('contest');
  let key=ck;
  if(ck==='autumn'){
    const keys=['run','cook','fashion','magicshow'];
    const m=openModal(`${headHTML('🍂','가을 축제','어떤 대회에 나갈까요?')}<div class="pick4">${keys.map(k=>{const C=CONTESTS[k];return `<button class="acard" data-v="${k}" data-say="${C.n}" style="--ac:${C.c}"><span class="ai">${C.i}</span><span class="an">${C.n}</span><span class="mcs"><span class="mc up">${C.tip}</span></span></button>`}).join('')}</div>`);
    say('가을 축제가 열렸어요! 어떤 대회에 나갈까요?');
    key=await pick(m);
  }
  await runContest(key);
}
function cstageHTML(rivals,open){
  const u=imgUrl('contest_stage');
  return `<div class="cstage ${open?'open':''}" id="cst" style="${u?`background:url('${u}') center/cover`:''}"><div class="curtain l"></div><div class="curtain r"></div>${u?'':'<div class="boards"></div>'}<div class="lights"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="contestants"><div class="cp">${friendPing(rivals[0])}</div><div class="cp">${friendPing(rivals[1])}</div><div class="cp me" id="cme">${heroPing()}</div><div class="cp">${friendPing(rivals[2])}</div></div></div>`;
}
async function runContest(key){
  const C=CONTESTS[key];
  const rivals=[FR[C.pref],...shuffle(FRIENDS.filter(f=>f.id!==C.pref)).slice(0,2)];
  let m=openModal(`<div class="center"><h2 class="big-title">${C.i} ${C.n}</h2></div>${cstageHTML(rivals)}<p class="cmsg">${josa(C.n,'이','가')} 열렸어요!</p>
    <div class="row" id="ch"><button class="btn pink big" data-v="play" data-say="내가 할래">🎮 내가 할래!</button><button class="btn big" data-v="auto" data-say="하츄핑 혼자">▶ 하츄핑 혼자</button></div><p class="hint">내가 하면 보너스 점수를 받아요!</p>`,'wide');
  sfx.chime(); say(`${josa(C.n,'이','가')} 열렸어요! 직접 해 볼까요?`);
  setTimeout(()=>{const c=$('#cst',m);if(c)c.classList.add('open')},400);
  const v=await pick($('#ch',m));
  let bonus=0;
  if(v==='play'){const sc=await playGame(C.game);bonus=Math.round(sc*1.2)}
  bgm('contest');
  m=openModal(`<div class="center"><h2 class="big-title">${C.i} ${C.n}</h2></div>${cstageHTML(rivals,true)}<p class="cmsg" id="cmsg">무대가 시작돼요!</p><div id="cend"></div>`,'wide');
  const cst=$('#cst',m), msg=$('#cmsg',m), cps=$$('.cp',m), rivalEls=[cps[0],cps[1],cps[3]];
  await wait(700);
  for(let j=0;j<3;j++){msg.textContent=`${rivals[j].n} 차례!`;hop(rivalEls[j]);tone(440+j*80,.25,'triangle',.1);await wait(850)}
  cst.classList.add('me-turn'); msg.textContent='하츄핑 차례예요! ✨'; say('하츄핑 차례예요!');
  for(let k=0;k<4;k++){hop($('#cme',m));tone([523,659,784,1047][k],.3,'triangle',.14);await wait(520)}
  const base=8+S.mi*4.6, offs=shuffle([8,1,-7]);
  const rows=[{me:true,n:'하츄핑',s:Math.round(C.score()+bonus)},...rivals.map((f,j)=>({f,n:f.n,s:Math.max(5,Math.round(base+offs[j]+rand(9)-4))}))];
  const sorted=rows.slice().sort((a,b)=>b.s-a.s||(b.me?1:0)-(a.me?1:0));
  const rank=sorted.findIndex(x=>x.me);
  const mx=Math.max(...rows.map(x=>x.s))*1.1;
  const end=$('#cend',m);
  end.innerHTML=`<div class="board">${rows.map(x=>`<div class="brow ${x.me?'me':''}"><div class="bp">${x.me?heroPing():friendPing(x.f)}</div><span class="bn">${x.n}</span><div class="bb"><i style="background:${x.me?'var(--pink)':x.f.deep}" data-w="${(x.s/mx*100).toFixed(1)}"></i></div><b class="bs">${x.s}</b></div>`).join('')}</div>`;
  $('#cst',m).classList.add('small');
  msg.textContent='두구두구두구…'; sfx.drum();
  await wait(60); end.querySelectorAll('.bb i').forEach(i=>i.style.width=i.dataset.w+'%');
  await wait(2200);
  const R=RANKS[rank], acc=newAcc(); let item=null;
  if(rank===0){item=grant(C.prize);if(!item)accCoins(acc,30);accCoins(acc,50);accStat(acc,'charm',3);accMood(acc,15);meta.st.golds++}
  else if(rank===1){accCoins(acc,30);accStat(acc,'charm',2);accMood(acc,10);if(Math.random()<.5)item=grantShopItem()}
  else if(rank===2){accCoins(acc,20);accStat(acc,'charm',1);accMood(acc,8)}
  else{accCoins(acc,10);accMood(acc,8);addSnack(pickOne(SNACKS.filter(s=>s.price)).id)}
  S.medals.push({mi:S.mi,key,rank});
  diary(R.i,`${C.n}에 나가서 ${rank<3?josa(R.n,'을','를')+' 받았어요!':'끝까지 멋지게 해냈어요!'}`);
  msg.textContent=rank<3?`축하해요! 하츄핑은 ${R.n}!`:'끝까지 멋지게 해냈어요! 참가상!';
  end.insertAdjacentHTML('afterbegin',`<div class="medal">${R.i}</div>`);
  end.insertAdjacentHTML('beforeend',`<div class="chips">${chipsHTML(acc)}</div>${giftHTML(item,rank===0?'우승 상품이에요!':'선물을 받았어요!')}<div class="row"><button class="btn pink big" data-v="n" data-say="다음">다음 ▶</button></div>`);
  $('#cst',m).classList.remove('small'); $('#cst',m).classList.add('tiny');
  sfx.fanfare(); confetti(rank<2?40:16);
  say(`${rank<3?'축하해요! 하츄핑은 '+josa(R.n,'을','를')+' 받았어요!':'끝까지 멋지게 해냈어요! 참가상을 받았어요!'}${item?' 선물로 '+josa(item.n,'을','를')+' 받았어요!':''}`);
  bindGift(end); saveMeta(); checkStickers();
  await pick(end);
  const fk={sing:'star',snow:'dia'}[key];
  if(fk&&rank<3)await formReveal(fk);
}
