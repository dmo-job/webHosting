/* =========================================================
   엔딩 · 엔딩 도감 · 추억 앨범
   ========================================================= */
function calcEnding(){
  const st=S.stats, c=S.cnt, vals=Object.values(st);
  if(vals.every(v=>v>=50))return 'queen';
  if(vals.every(v=>v>=35))return 'royal';
  if(FRIENDS.filter(f=>(S.friends[f.id]||0)>=5).length>=3)return 'friends';
  if(S.coins>=600)return 'rich';
  const spec=[['chef',(c.cook||0)+(c.bakery||0),5],['flower',c.flower||0,4],['teacher',c.baby||0,4],['explorer',S.advCount,4]]
    .filter(x=>x[1]>=x[2]).sort((a,b)=>b[1]-a[1]);
  if(spec.length)return spec[0][0];
  const order=STATS.slice().sort((a,b)=>st[b.k]-st[a.k]), top=order[0].k, second=order[1].k;
  switch(top){
    case 'art':return (c.art||0)>(c.dance||0)?'painter':'art';
    case 'magic':return second==='kind'?'fairy':'magic';
    case 'kind':return 'love';
    case 'charm':return 'fashion';
    default:return top;
  }
}
function lineupHTML(fs,face='happy'){
  fs=fs.slice(0,6);
  return `<div class="lineup">${fs.slice(0,2).map(f=>`<div class="bob">${friendPing(f,{face})}</div>`).join('')}<div class="me bob">${heroPing({face})}</div>${fs.slice(2).map(f=>`<div class="bob">${friendPing(f,{face})}</div>`).join('')}</div>`;
}
async function runEnding(){
  const fs=metFriends();
  bgm('ending');
  let m=openModal(`<div class="center"><h2 class="big-title">🏰 왕국 무도회가 열렸어요!</h2></div>
    ${sceneBox('ballroom','linear-gradient(#FFE7F3,#E7DBFF)',['✨','🎀','🌟','💫','🎶'],`<div class="ball-in">${imgUrl('ballroom')?'':'<div class="castle">'+castleSVG()+'</div>'}${lineupHTML(fs)}</div>`,'ball')}
    <p class="intro-txt">1년 동안 무럭무럭 자란 하츄핑을 모두 축하해요!</p><div class="row"><button class="btn pink big" data-v="n" data-say="다음">다음 ▶</button></div>`,'wide');
  sfx.fanfare(); say('왕국 무도회가 열렸어요! 1년 동안 무럭무럭 자란 하츄핑을 모두 축하해요!');
  await pick(m);
  await formReveal('princess');
  const medals=S.medals.map(x=>RANKS[x.rank].i).join(' ');
  m=openModal(`<div class="center"><h2 class="big-title">하츄핑의 1년</h2></div>
    <div class="recap">
      <div class="rc"><span>📏</span>키 ${S.heights[0]}cm → ${S.height}cm</div>
      <div class="rc"><span>✨</span>${persName()} 하츄핑</div>
      <div class="rc"><span>🏅</span>${medals||'메달 없음'}</div>
      <div class="rc"><span>👫</span>${fs.length?fs.map(f=>`${f.n} ${'💗'.repeat(S.friends[f.id])}`).join('<br>'):'친구 없음'}</div>
      <div class="rc"><span>🗺️</span>모험 ${S.advCount}번</div>
      <div class="rc"><span>🪙</span>코인 ${S.coins}개</div>
    </div>
    <p class="intro-txt">하츄핑은 어떤 공주님이 되었을까요?</p><div class="row"><button class="btn" data-v="diary" data-say="일기장 보기">📔 일기장 보기</button><button class="btn pink big" data-v="n" data-say="두근두근">두근두근! ✨</button></div>`,'wide');
  say(`하츄핑의 1년이에요. 키가 ${S.height}센티미터가 되었어요. 하츄핑은 어떤 공주님이 되었을까요?`);
  let v=await pick(m);
  if(v==='diary'){await openDiary(true)}
  openModal(`<div class="center"><h2 class="big-title">짜잔…!</h2><div class="silhouette bob">${ping({stage:2})}</div></div>`);
  sfx.drum(); await wait(2600);
  const e=calcEnding(), E=ENDINGS[e], isNew=!meta.endings.includes(e);
  if(isNew)meta.endings.push(e);
  const outfit={...meta.outfit,...(E.out||{})};
  meta.album.unshift({e,date:new Date().toLocaleDateString('ko-KR'),pers:persName(),h:S.height,medals,outfit,friends:fs.map(f=>[f.id,S.friends[f.id]]),stats:{...S.stats}});
  meta.album=meta.album.slice(0,24);
  meta.st.years++;
  S.done=true; saveMeta(); drop(slotKey(SLOT));
  const u=imgUrl('ending_bg');
  m=openModal(`<div class="ending" style="--eb:${E.bg};${u?`background:linear-gradient(90deg,${E.bg}EE 0 45%,${E.bg}99),url('${u}') center/cover`:''}">
      <div class="art"><div class="bob">${ping({stage:2,outfit,face:'happy'})}</div><span class="prop">${E.i}</span></div>
      <div>${isNew?'<span class="newb">새 엔딩!</span>':''}
        <h2>${E.n}</h2><p>${persName()} 하츄핑은 ${E.d}</p>
        <div class="minis">${STATS.map(s=>`<span class="mini">${s.i} ${S.stats[s.k]}</span>`).join('')}${medals?`<span class="mini">${medals}</span>`:''}</div>
      </div></div>
    <div class="row"><button class="btn" data-v="book" data-say="엔딩 도감">📖 엔딩 도감</button><button class="btn" data-v="album" data-say="추억 앨범">📷 추억 앨범</button><button class="btn pink" data-v="home" data-say="처음 화면으로">🏠 처음 화면</button></div>`,'wide');
  sfx.fanfare(); confetti(60);
  say(`짜잔! ${josa(E.n,'이','가')} 되었어요! ${E.d}`);
  checkStickers();
  v=await pick(m);
  S=null;
  if(v==='book')openBook(true); else if(v==='album')openAlbum(true); else goScreen(renderTitle);
}
function openBook(toTitle){
  const m=openModal(`${headHTML('📖','엔딩 도감',`${meta.endings.length} / ${ENDING_ORDER.length} 모았어요`)}
    <div class="book">${ENDING_ORDER.map(k=>{const E=ENDINGS[k],got=meta.endings.includes(k);
      return `<div class="ecard ${got?'':'lock'}" style="--eb:${E.bg}" data-say="${got?E.n:'아직 몰라요. 힌트, '+E.hint}"><div class="ei">${E.i}</div><b>${got?E.n:'???'}</b><small>💡 ${E.hint}</small></div>`}).join('')}</div>
    <div class="row"><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say(`엔딩 도감이에요. ${meta.endings.length}개 모았어요!`);
  pick(m).then(()=>{closeModal();if(toTitle)goScreen(renderTitle)});
}
function openAlbum(toTitle){
  const m=openModal(`${headHTML('📷','추억 앨범','지금까지 키운 하츄핑들이에요!')}
    <div class="album">${meta.album.length?meta.album.map(a=>{const E=ENDINGS[a.e];return `<div class="acard2" style="--eb:${E.bg}" data-say="${E.n}"><div class="ap">${ping({stage:2,outfit:a.outfit,face:'happy'})}<span>${E.i}</span></div><b>${E.n}</b><small>${a.date} · ${a.pers} 하츄핑<br>📏 ${a.h}cm ${a.medals||''}</small></div>`}).join('')
      :'<div class="note">아직 사진이 없어요. 1년 동안 하츄핑을 키우면 여기에 남아요!</div>'}</div>
    <div class="row"><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say('추억 앨범이에요!');
  pick(m).then(()=>{closeModal();if(toTitle)goScreen(renderTitle)});
}
function openStickers(){
  const m=openModal(`${headHTML('⭐','스티커북',`${meta.stickers.length} / ${STICKERS.length} 모았어요`)}
    <div class="stickers">${STICKERS.map(s=>{const got=meta.stickers.includes(s.id);return `<div class="stk ${got?'':'lock'}" data-say="${got?s.n:'아직 없어요. '+s.hint}"><span class="si2">${got?s.i:'❔'}</span><b>${got?s.n:'???'}</b><small>${s.hint}</small></div>`}).join('')}</div>
    <div class="row"><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say(`스티커북이에요. ${meta.stickers.length}개 모았어요!`);
  pick(m).then(closeModal);
}
