/* =========================================================
   대화 · 간식 · 상점 · 친구 · 옷장 · 방 꾸미기 · 일기장 · 마을 · 놀이터 · 설정
   ========================================================= */

/* ---------- 대화 ---------- */
function listenLine(){
  const L={body:'요즘 뛰어노는 게 제일 신나요! 더 튼튼해지고 싶어요!',smart:'책 읽는 게 재밌어요! 궁금한 게 아주 많아요!',art:'노래하고 춤추는 게 제일 좋아요! 무대에 서 보고 싶어요!',
    magic:'반짝반짝 마법이 좋아요! 별을 만들어 보고 싶어요!',kind:'친구들을 도와주면 마음이 따뜻해져요!',charm:'예쁜 드레스를 입으면 진짜 공주님이 된 것 같아요!'};
  const opts=[];
  if(Object.values(S.stats).some(v=>v>0))opts.push(L[topStat()]);
  const notMet=FRIENDS.filter(f=>!(f.id in S.friends));
  if(notMet.length){const f=pickOne(notMet);opts.push(`${f.place}에 가면 ${josa(f.n,'을','를')} 만날 수 있대요!`)}
  if(S.mood<40)opts.push('조금 피곤해요… 소풍 가고 싶어요!');
  if(S.coins<20)opts.push('코인이 조금밖에 없어요. 아르바이트를 해 볼까요?');
  if(!Object.values(S.snacks).some(n=>n>0))opts.push('달콤한 간식이 먹고 싶어요! 🍰');
  if(meta.furn.length<2)opts.push('내 방을 예쁘게 꾸미고 싶어요! 🛋️');
  if(!opts.length)opts.push('하츄핑은 오늘도 행복해요! 💗');
  return pickOne(opts);
}
async function openTalk(){
  if(S.talked){
    const m=openModal(`<div class="center"><div class="talk-top"><div class="tk-hero bob">${heroPing({face:'happy'})}</div><div class="say2">이번 달에는 벌써 이야기했어요. 다음 달에 또 이야기해요!</div></div><div class="row"><button class="btn pink" data-v="x">✔ 알겠어요</button></div></div>`);
    say('이번 달에는 벌써 이야기했어요. 다음 달에 또 이야기해요!'); await pick(m); closeModal(); return;
  }
  const m=openModal(`${headHTML('💬','하츄핑과 대화하기','한 달에 한 번 이야기할 수 있어요!')}
    <div class="talk-top"><div class="tk-hero bob" id="tkh">${heroPing()}</div><div class="say2" id="tks">무슨 이야기 할까요?</div></div>
    <div id="tkb"><div class="talk">${TALKS.map(t=>`<button class="acard" data-v="${t.k}" data-say="${t.n}" style="--ac:${t.c}"><span class="ai">${t.i}</span><span class="an">${t.n}</span></button>`).join('')}</div></div>`);
  say('하츄핑과 대화해요! 무엇을 할까요?');
  const v=await pick(m);
  S.talked=true; const acc=newAcc(); let line='';
  if(v==='praise'){accMood(acc,10);accStat(acc,'charm',1);S.pers.grace++;line=pickOne(['헤헤, 칭찬 받으니까 기분 최고예요!','더 열심히 할게요! 💪','정말요? 나 잘했어요? 히히!'])}
  else if(v==='hug'){accMood(acc,18);S.pers.kind++;line=pickOne(['따뜻해요… 사랑해요 💗','꼬옥! 하츄핑도 꼬옥!','안아 주니까 하나도 안 피곤해요!'])}
  else if(v==='listen'){accMood(acc,6);line=listenLine()}
  else{accMood(acc,4);const d=+(S.height-S.heights[0]).toFixed(1);line=d>0?`키가 ${S.height}cm예요! 처음보다 ${d}cm나 컸어요!`:`키가 ${S.height}cm예요! 앞으로 쑥쑥 클 거예요!`}
  $('#tkh',m).innerHTML=heroPing({face:'happy'}); hop($('#tkh',m));
  $('#tks',m).textContent=line; sfx.chime();
  const chart=v==='height'?`<div class="hchart">${S.heights.map((h,i)=>`<div style="height:${clamp((h-60)/55*100,4,100)}%"><span>${h}</span><em>${MONTHS[i]}월</em></div>`).join('')}</div>`:'';
  $('#tkb',m).innerHTML=`${chart}<div class="chips">${chipsHTML(acc)}</div><div class="row"><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`;
  say(line); saveRun();
  await pick($('#tkb',m)); closeModal(); refreshHome();
}

/* ---------- 간식 ---------- */
function openSnack(){
  const m=openModal(`${headHTML('🍪','간식 주기','하츄핑에게 간식을 줘요!')}
    <div class="talk-top"><div class="tk-hero bob" id="skh" style="position:relative">${heroPing()}</div><div class="say2" id="sks">간식 주세요! 냠냠!</div></div>
    <div class="snacks" id="skl"></div>
    <div class="row"><button class="btn" id="skShop" data-say="상점 가기">🏪 상점 가기</button><button class="btn pink" id="skX" data-say="닫기">✔ 닫기</button></div>`);
  say('하츄핑에게 간식을 줘요!');
  function draw(){
    const have=SNACKS.filter(s=>S.snacks[s.id]>0);
    $('#skl',m).innerHTML=have.length?have.map(s=>`<button class="acard" data-s="${s.id}" data-say="${s.n}" style="--ac:#FF9466"><span class="ai">${s.i}</span><span class="an">${s.n} ×${S.snacks[s.id]}</span>${effectChips({gain:s.gain,mood:s.mood})}</button>`).join('')
      :`<div class="note" style="grid-column:1/-1">간식이 없어요. 🏪 상점에서 사 와요!</div>`;
    m.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
      const s=SN[b.dataset.s]; S.snacks[s.id]--; const acc=newAcc(); accMood(acc,s.mood); accGain(acc,s.gain);
      const h=$('#skh',m); h.innerHTML=heroPing({face:'happy'}); hop(h);
      const fx=document.createElement('span'); fx.className='eatfx'; fx.textContent=s.i; h.appendChild(fx); setTimeout(()=>fx.remove(),1000);
      const line=pickOne(['냠냠! 맛있어요!','우와, 최고로 맛있어요!','고마워요! 기운이 나요!']);
      $('#sks',m).textContent=line; sfx.chime(); say(line); draw();
    });
  }
  draw();
  $('#skShop',m).onclick=()=>{sfx.pop();openShop('snack')};
  $('#skX',m).onclick=()=>{sfx.pop();saveRun();closeModal();refreshHome()};
}

/* ---------- 상점 ---------- */
function openShop(tab='snack',back){
  const m=openModal(`${headHTML('🏪','하츄핑 마을 상점','갖고 싶은 것을 골라요!')}
    <div class="wallet"><span class="coins" id="shc"></span></div>
    <div class="tabs"><button class="tab" data-t="snack" data-say="간식">🍰 간식</button><button class="tab" data-t="item" data-say="옷">👗 옷</button><button class="tab" data-t="furn" data-say="가구">🛋️ 가구</button></div>
    <div id="shl" class="scrollbox"></div><div class="row"><button class="btn pink" id="shX" data-say="다 샀어요">✔ 다 샀어요</button></div>`,'wide');
  say('하츄핑 마을 상점이에요! 갖고 싶은 것을 골라요!');
  bgm('town');
  function draw(){
    $('#shc',m).textContent=`🪙 ${S.coins}`;
    m.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
    const L=$('#shl',m), btn=(price,attr)=>`<button class="btn sm ${S.coins>=price?'pink':''}" ${attr} ${S.coins<price?'disabled':''}>🪙 ${price}</button>`;
    if(tab==='snack')L.innerHTML=`<div class="items">${SNACKS.filter(s=>s.price).map(s=>`<div class="item" data-say="${s.n}, ${s.price}코인"><span class="big">${s.i}</span>${s.n}${effectChips({gain:s.gain,mood:s.mood})}<small>가진 것 ${S.snacks[s.id]||0}</small>${btn(s.price,`data-buy="${s.id}"`)}</div>`).join('')}</div>`;
    else if(tab==='item')L.innerHTML=`<div class="items">${ITEMS.filter(t=>t.price).map(t=>{const own=meta.owned.includes(t.id);
        return `<div class="item ${own?'on':''}" data-say="${t.n}${own?', 있어요':', '+t.price+'코인'}"><span class="ip">${onlyItem(t.id)}</span>${t.n}${own?`<button class="btn sm" data-wear2="${t.id}">👗 입기</button>`:btn(t.price,`data-buyi="${t.id}"`)}</div>`}).join('')}</div>`;
    else L.innerHTML=`<div class="items furn">${FURN.map(f=>{const own=meta.furn.includes(f.id);
        return `<div class="item ${own?'on':''}" data-say="${f.n}${own?', 있어요':', '+f.price+'코인'}"><span class="fp2">${furnSVG(f.id)}</span>${f.n}${own?`<button class="btn sm" data-place="${f.id}">🛋️ 놓기</button>`:btn(f.price,`data-buyf="${f.id}"`)}</div>`}).join('')}</div>`;
    L.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const s=SN[b.dataset.buy];if(S.coins<s.price)return;S.coins-=s.price;addSnack(s.id);sfx.coin();say(`${josa(s.n,'을','를')} 샀어요!`);saveRun();draw()});
    L.querySelectorAll('[data-buyi]').forEach(b=>b.onclick=()=>{const t=ITEM[b.dataset.buyi];if(S.coins<t.price)return;S.coins-=t.price;grant(t.id);sfx.coin();sfx.chime();say(`${josa(t.n,'을','를')} 샀어요! 입어 볼까요?`);saveRun();checkStickers();draw()});
    L.querySelectorAll('[data-wear2]').forEach(b=>b.onclick=()=>{const t=ITEM[b.dataset.wear2];meta.outfit[t.slot]=t.id;saveMeta();sfx.chime();say(`${josa(t.n,'을','를')} 입었어요!`);b.textContent='입었어요 ✔'});
    L.querySelectorAll('[data-buyf]').forEach(b=>b.onclick=()=>{const f=FU[b.dataset.buyf];if(S.coins<f.price)return;S.coins-=f.price;meta.furn.push(f.id);meta.room[f.slot]=f.id;sfx.coin();sfx.chime();say(`${josa(f.n,'을','를')} 사서 방에 놓았어요!`);saveRun();checkStickers();draw()});
    L.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>{const f=FU[b.dataset.place];meta.room[f.slot]=f.id;saveMeta();sfx.chime();say(`${josa(f.n,'을','를')} 방에 놓았어요!`);b.textContent='놓았어요 ✔'});
  }
  m.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.t;sfx.click();draw()});
  $('#shX',m).onclick=()=>{sfx.pop();saveRun();closeModal();if(back)back();else refreshHome()};
  draw();
}

/* ---------- 친구 ---------- */
function pendingStory(f){
  const seen=S.story[f.id]||0, h=S.friends[f.id]||0, st=f.story[seen];
  return st&&h>=st.need?st:null;
}
async function playStory(f){
  const seen=S.story[f.id]||0, st=f.story[seen];
  S.story[f.id]=seen+1;
  bgm('home');
  const m=openModal(`<div class="center"><span class="slot-pill">💞 ${f.n} 이야기 ${seen+1}</span><h2 class="big-title">${st.t}</h2></div>
    ${sceneBox('', `linear-gradient(${f.bg},#FFF)`, ['✨','💗','🌸','⭐','🎀'], `<div class="duo"><div class="bob">${friendPing(f)}</div><div class="bob">${heroPing()}</div></div>`)}`,'wide');
  await wait(500);
  await talkSeq(st.lines);
  const acc=newAcc(); accGain(acc,st.gain);
  let item=null; if(st.gift)item=grant(f.item);
  diary('💞',`${josa(f.n,'과','와')} "${st.t}" 추억을 만들었어요.`);
  $('.duo',m).innerHTML=`<div class="bob">${friendPing(f,{face:'happy'})}</div><div class="bob">${heroPing({face:'happy'})}</div>`;
  m.insertAdjacentHTML('beforeend',`<div class="chips">${chipsHTML(acc)}</div>${giftHTML(item,`${f.n}의 선물이에요!`)}<div class="row"><button class="btn pink big" data-v="ok" data-say="좋아요">좋아요 ▶</button></div>`);
  sfx.chime(); if(item){sfx.fanfare();confetti(30)}
  bindGift(m); saveRun(); checkStickers();
  await pick(m);
}
function openFriends(){
  let gifting=null;
  const m=openModal(`${headHTML('👫','티니핑 친구들','친구랑 놀고 선물도 줘요!')}<div class="fgrid" id="fg"></div>
    <p class="hint">🎈 같이 놀기는 한 달에 한 번! 💗 다섯 개면 단짝 친구예요.</p>
    <div class="row"><button class="btn pink" id="fX" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say('티니핑 친구들이에요!');
  const fg=$('#fg',m);
  function draw(){
    fg.innerHTML=FRIENDS.map(f=>{
      if(!(f.id in S.friends))return `<div class="fcard lock" data-say="아직 못 만났어요. ${noEmoji(f.where)}에서 만날 수 있어요"><div class="fp">${shadowPing(f)}</div><b>???</b><small>💡 ${f.where}</small></div>`;
      const h=S.friends[f.id], fav=SN[f.fav], ps=pendingStory(f);
      let act;
      if(gifting===f.id){
        const have=SNACKS.filter(s=>S.snacks[s.id]>0);
        act=have.length?`<div class="snackpick">${have.map(s=>`<button class="btn sm" data-g="${s.id}" data-f="${f.id}" data-say="${s.n}">${s.i}×${S.snacks[s.id]}</button>`).join('')}</div>`:`<small>간식이 없어요. 상점에서 사 와요!</small>`;
      }else act=`<div class="row"><button class="btn sm" data-gift="${f.id}" data-say="선물 주기">🎁</button><button class="btn sm" data-play="${f.id}" ${S.played?'disabled':''} data-say="같이 놀기">🎈</button>${ps?`<button class="btn sm pink pulse" data-story="${f.id}" data-say="이야기 보기">💬</button>`:''}</div>`;
      return `<div class="fcard" style="--fb:${f.bg}" data-say="${f.n}"><div class="fp bob" id="fp_${f.id}">${friendPing(f,{face:h>=5?'happy':''})}</div><b>${f.n}</b><span class="hearts">${heartsHTML(h)}</span><small>${h>=5?'💞 단짝 친구!':`좋아하는 간식: ${fav.i}`}</small>${act}</div>`;
    }).join('');
    fg.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>{gifting=b.dataset.gift;sfx.click();draw()});
    fg.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{
      const f=FR[b.dataset.f], s=SN[b.dataset.g]; S.snacks[s.id]--; const n=s.id===f.fav?2:1; addHeart(f.id,n); gifting=null;
      sfx.chime(); say(`${josa(f.n,'이','가')} 좋아해요!${n===2?' 제일 좋아하는 간식이래요!':''}`); draw(); hop($('#fp_'+f.id,m)); checkStickers();
    });
    fg.querySelectorAll('[data-play]').forEach(b=>b.onclick=()=>{
      const f=FR[b.dataset.play]; S.played=true; addHeart(f.id); addMood(12);
      diary('🎈',`${josa(f.n,'과','와')} 신나게 놀았어요.`);
      sfx.fanfare(); say(`${josa(f.n,'과','와')} 신나게 놀았어요! 하츄핑 기분도 좋아졌어요!`); draw(); hop($('#fp_'+f.id,m)); checkStickers();
    });
    fg.querySelectorAll('[data-story]').forEach(b=>b.onclick=async()=>{await playStory(FR[b.dataset.story]);openFriends()});
  }
  draw();
  $('#fX',m).onclick=()=>{sfx.pop();saveRun();closeModal();refreshHome()};
}

/* ---------- 옷장 ---------- */
function openCloset(back){
  let tab='head';
  const m=openModal(`${headHTML('👗','하츄핑 옷장','옷을 눌러서 입혀 봐요!')}
    <div class="closet-grid"><div class="closet-prev"><div class="inner bob" id="cPrev"></div></div>
      <div><div class="tabs">${[...SLOTS,{k:'form',n:'변신',i:'✨'}].map(s=>`<button class="tab" data-t="${s.k}" data-say="${s.n}">${s.i} ${s.n}</button>`).join('')}</div><div class="items scrollbox" id="cItems"></div></div></div>
    <div class="row"><button class="btn pink big" id="cDone" data-say="다 입었어요">✔ 다 입었어요</button></div>`,'wide');
  say('하츄핑 옷장이에요! 옷을 눌러서 입혀 봐요!');
  const prev=$('#cPrev',m), grid=$('#cItems',m);
  function draw(){
    prev.innerHTML=heroPing();
    m.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
    if(tab==='form'){
      grid.innerHTML=FORMS.map(F=>meta.forms.includes(F.id)
        ?`<button class="item form" data-form="${F.id}" data-say="${F.n}"><span class="ip">${ping({stage:1,outfit:F.parts})}</span>${F.i} ${F.n}</button>`
        :`<div class="item lock form" data-say="아직 없어요. ${F.how}에서 얻을 수 있어요"><span class="ip dim">${ping({stage:1,outfit:F.parts})}</span>❔ ${F.how}</div>`).join('');
      grid.querySelectorAll('[data-form]').forEach(b=>b.onclick=()=>{const F=FORMS.find(f=>f.id===b.dataset.form);meta.outfit={...F.parts};saveMeta();sfx.fanfare();draw();hop(prev);say(`반짝반짝! ${ro(F.n)} 변신!`)});
      return;
    }
    grid.innerHTML=`<button class="item ${!meta.outfit[tab]?'on':''}" data-id="" data-say="안 입기"><span class="none">🚫</span>안 입기</button>`+
      ITEMS.filter(t=>t.slot===tab).map(t=>meta.owned.includes(t.id)
        ?`<button class="item ${meta.outfit[tab]===t.id?'on':''}" data-id="${t.id}" data-say="${t.n}"><span class="ip">${onlyItem(t.id)}</span>${t.n}</button>`
        :`<div class="item lock" data-say="아직 없어요. ${t.price?'상점에서 살 수 있어요':noEmoji(SRC_TXT[t.src]||'')}"><span class="q">?</span>${t.price?`🏪 ${t.price}`:SRC_TXT[t.src]}</div>`).join('');
    grid.querySelectorAll('button.item').forEach(b=>b.onclick=()=>{
      meta.outfit[tab]=b.dataset.id||null; saveMeta(); sfx.chime(); draw(); hop(prev);
      say(b.dataset.id?ITEM[b.dataset.id].n+'! 예뻐요!':'벗었어요');
    });
  }
  m.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.t;sfx.click();draw()});
  $('#cDone',m).onclick=()=>{sfx.pop();closeModal();if(back)back();else{refreshHome();bubble('어때요? 예쁘죠? 💗')}};
  draw();
}

/* ---------- 변신 폼을 얻었을 때 ---------- */
async function formReveal(id){
  const F=FORMS.find(f=>f.id===id);
  if(!F||!grantForm(id))return;
  const st=S?stageOf():2;
  const m=openModal(`<div class="center"><span class="slot-pill">✨ 새 변신 폼</span><h2 class="big-title">${F.i} ${F.n}</h2>
    <div class="grow-box"><div class="a">${ping({stage:st,outfit:meta.outfit})}</div><div class="arr">✨</div><div class="b bob">${ping({stage:st,outfit:F.parts,face:'happy'})}</div></div>
    <p class="intro-txt" style="min-height:0">반짝반짝! 이제 ${ro(F.n)} 변신할 수 있어요!</p>
    <div class="row"><button class="btn pink big" data-v="wear" data-say="지금 변신하기">✨ 지금 변신하기</button><button class="btn big" data-v="later" data-say="나중에">나중에</button></div></div>`,'wide');
  sfx.fanfare(); confetti(40); say(`새 변신 폼! ${F.n}! 지금 변신해 볼까요?`);
  if(S)diary(F.i,`${ro(F.n)} 변신할 수 있게 되었어요!`);
  const v=await pick(m);
  if(v==='wear'){meta.outfit={...F.parts};saveMeta();say(`${ro(F.n)} 변신!`)}
  checkStickers();
}

/* ---------- 방 꾸미기 ---------- */
function openRoom(){
  let tab='bed';
  const m=openModal(`${headHTML('🛋️','방 꾸미기','가구를 골라서 방을 꾸며요!')}
    <div class="room-grid"><div class="room-prev" id="rPrev"></div>
      <div><div class="tabs small">${FURN_SLOTS.map(s=>`<button class="tab" data-t="${s.k}" data-say="${s.n}">${s.i} ${s.n}</button>`).join('')}</div><div class="items furn scrollbox" id="rItems"></div></div></div>
    <div class="row"><button class="btn" id="rShop" data-say="가구 사러 가기">🏪 가구 사러 가기</button><button class="btn pink big" id="rDone" data-say="다 꾸몄어요">✔ 다 꾸몄어요</button></div>`,'wide');
  say('방 꾸미기! 가구를 골라서 방을 꾸며요!');
  function draw(){
    $('#rPrev',m).innerHTML=`<div class="room-mini">${roomHTML(true)}</div>`;
    m.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
    const list=FURN.filter(f=>f.slot===tab);
    $('#rItems',m).innerHTML=`<button class="item ${!meta.room[tab]?'on':''}" data-id="" data-say="기본"><span class="none">↺</span>기본</button>`+
      list.map(f=>meta.furn.includes(f.id)
        ?`<button class="item ${meta.room[tab]===f.id?'on':''}" data-id="${f.id}" data-say="${f.n}"><span class="fp2">${furnSVG(f.id)}</span>${f.n}</button>`
        :`<div class="item lock" data-say="${f.n}. 상점에서 ${f.price}코인"><span class="fp2 dim">${furnSVG(f.id)}</span>🏪 ${f.price}</div>`).join('');
    $('#rItems',m).querySelectorAll('button.item').forEach(b=>b.onclick=()=>{
      meta.room[tab]=b.dataset.id||null; saveMeta(); sfx.chime(); draw();
      say(b.dataset.id?FU[b.dataset.id].n+'! 예뻐요!':'기본으로 돌려놨어요');
    });
  }
  m.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.t;sfx.click();draw()});
  $('#rShop',m).onclick=()=>{sfx.pop();openShop('furn',openRoom)};
  $('#rDone',m).onclick=()=>{sfx.pop();closeModal();refreshHome();bubble('우와, 내 방이 너무 예뻐졌어요! 🛋️')};
  draw();
}

/* ---------- 일기장 ---------- */
function openDiary(fromEnding){
  return new Promise(res=>{
    const pages=S.diary.slice().sort((a,b)=>a.mi-b.mi);
    let i=Math.max(0,pages.length-1);
    const m=openModal(`${headHTML('📔','하츄핑 일기장','한 달 동안 있었던 일을 적었어요')}<div id="dbook"></div>
      <div class="row"><button class="btn" id="dPrev" data-say="앞 장">◀ 앞 장</button><button class="btn" id="dRead" data-say="읽어 주기">🔊 읽어 주기</button><button class="btn" id="dNext" data-say="다음 장">다음 장 ▶</button><button class="btn pink" id="dX" data-say="닫기">✔ 닫기</button></div>`,'wide');
    function draw(){
      const p=pages[i];
      if(!p){$('#dbook',m).innerHTML='<div class="note">아직 일기가 없어요. 이번 달 일정을 끝내면 일기가 생겨요!</div>';return}
      const se=seasonOf(p.mi);
      $('#dbook',m).innerHTML=`<div class="diary"><div class="dpage left"><div class="dmonth">${MONTHS[p.mi]}월</div><div class="dseason">${SEASON_I[se]} ${SEASON[se]}</div><div class="dstk bob">${ping({stage:stageOf(p.mi),outfit:meta.outfit,face:'happy'})}</div><small>${i+1} / ${pages.length}</small></div>
        <div class="dpage right">${p.lines.map(l=>`<p><span>${l.i}</span>${l.t}</p>`).join('')}</div></div>`;
      $('#dPrev',m).disabled=i<=0; $('#dNext',m).disabled=i>=pages.length-1;
    }
    const read=()=>{const p=pages[i];if(p)say(`${MONTHS[p.mi]}월. `+p.lines.map(l=>l.t).join(' '))};
    $('#dPrev',m).onclick=()=>{i--;sfx.click();draw();read()};
    $('#dNext',m).onclick=()=>{i++;sfx.click();draw();read()};
    $('#dRead',m).onclick=read;
    $('#dX',m).onclick=()=>{sfx.pop();if(!fromEnding){closeModal();refreshHome()}res()};
    draw(); read();
  });
}

/* ---------- 마을 ---------- */
const TOWN_SPOTS = [
  {k:'home',  n:'우리 집',  x:70,  y:470,w:180},
  {k:'castle',n:'왕궁',     x:530, y:70, w:220},
  {k:'shop',  n:'상점',     x:565, y:360,w:160},
  {k:'park',  n:'공원 놀이터',x:1010,y:420,w:190},
  {k:'baro',  x:250, y:200,w:140},
  {k:'aja',   x:900, y:150,w:140},
  {k:'chacha',x:330, y:420,w:140},
  {k:'lala',  x:790, y:330,w:140},
  {k:'hap',   x:1090,y:200,w:140},
  {k:'areum', x:80,  y:150,w:130},
  {k:'sappun',x:765, y:170,w:120},
  {k:'ponny', x:640, y:555,w:120},
];
function renderTown(){
  bgm('town');
  const sp=TOWN_SPOTS.map(s=>{
    let art,label,lock=false;
    if(s.k==='home'){art=houseSVG('#FF8FC0','#FFF4FA','💗');label='🏡 우리 집'}
    else if(s.k==='castle'){art=castleSVG();label='🏰 왕궁'}
    else if(s.k==='shop'){art=houseSVG('#FFC94D','#FFF8E6','🏪');label='🏪 상점'}
    else if(s.k==='park'){art=`<div class="park"><span>🌳</span><span>🎠</span><span>🌳</span><span class="sw">🛝</span></div>`;label='🌳 공원 놀이터'}
    else{const f=FR[s.k];lock=!(f.id in S.friends);art=houseSVG(f.deep,f.bg,`<tspan>${['🎀','⭐','🍀','🎵','☀️','🌸','🩰','🌈'][FRIENDS.indexOf(f)]}</tspan>`,lock);label=lock?'❔ ???':`${f.n} 집`}
    return `<button class="spot ${lock?'lock':''}" data-k="${s.k}" style="left:${s.x}px;top:${s.y}px;width:${s.w}px" data-say="${noEmoji(label)}">${art}<span class="spot-l">${label}</span></button>`;
  }).join('');
  screen().innerHTML=`<div class="town" style="${bgCSS('town_bg','linear-gradient(#BFE6FF 0 22%,#C9F0C8 22%,#A8E2A8)')}">
    ${imgUrl('town_bg')?'':`<svg class="road" viewBox="0 0 1280 720" preserveAspectRatio="none"><path d="M160,640 C300,560 420,600 520,520 S640,420 650,330 S700,250 640,220 M650,470 C760,500 900,520 1100,520 M520,520 C440,450 380,360 320,300 M760,430 C820,380 900,330 980,280 S1100,260 1160,270" fill="none" stroke="#FFF6E0" stroke-width="40" stroke-linecap="round"/></svg>
    <span class="tdeco" style="left:20px;top:340px">🌲</span><span class="tdeco" style="left:470px;top:280px">🌷</span><span class="tdeco" style="left:820px;top:640px">🌼</span><span class="tdeco" style="left:1200px;top:600px">🌲</span><span class="tdeco" style="left:180px;top:380px">🌸</span><span class="tdeco cloud" style="left:120px;top:40px">☁️</span><span class="tdeco cloud" style="left:960px;top:30px">☁️</span>`}
    ${sp}
    ${hudHTML(true)}
  </div>`;
  bindHud();
  screen().querySelectorAll('.spot').forEach(b=>b.onclick=()=>townGo(b.dataset.k));
  say('하츄핑 마을이에요! 어디로 갈까요?');
}
function townGo(k){
  sfx.pop();
  if(k==='home')return goScreen(()=>renderHome(false));
  if(k==='shop')return openShop('snack',()=>bgm('town'));
  if(k==='park')return openPlayground(true);
  if(k==='castle')return openCastle();
  const f=FR[k];
  if(!(f.id in S.friends)){toast(`❔ 아직 못 만난 친구예요 · 💡 ${f.where}`);say(`아직 못 만난 친구예요. ${noEmoji(f.where)}에서 만날 수 있어요`);return}
  visitFriend(f);
}
async function visitFriend(f){
  const ps=pendingStory(f);
  if(ps){await playStory(f);closeModal();return}
  const lines={baro:'바르게 줄 서는 것도 멋진 일이야!',aja:'아자아자! 오늘도 힘차게!',chacha:'차 한잔 마시고 갈래?',lala:'랄라~ 새 노래를 만들었어!',hap:'해피해피! 놀러 와 줘서 고마워!'};
  const m=openModal(`${headHTML('🏠',`${f.n} 집`,'')}${sceneBox('',`linear-gradient(${f.bg},#FFF)`,['✨','💗','🌸','⭐','🎀'],`<div class="duo"><div class="bob">${friendPing(f)}</div><div class="bob">${heroPing()}</div></div>`)}
    <p class="intro-txt" style="min-height:0">${lines[f.id]} ${heartsHTML(S.friends[f.id])}</p>
    <div class="row"><button class="btn pink big" data-v="play" ${S.played?'disabled':''} data-say="같이 놀기">🎈 같이 놀기</button><button class="btn big" data-v="out" data-say="나가기">🚪 나가기</button></div>${S.played?'<p class="hint">같이 놀기는 다음 달에 또 할 수 있어요!</p>':''}`,'wide');
  say(lines[f.id]);
  const v=await pick(m);
  if(v==='play'){
    S.played=true; addHeart(f.id); addMood(12); diary('🎈',`${f.n} 집에 놀러 가서 신나게 놀았어요.`);
    $('.duo',m).innerHTML=`<div class="bob hop">${friendPing(f,{face:'happy'})}</div><div class="bob hop">${heroPing({face:'happy'})}</div>`;
    sfx.fanfare(); say(`${josa(f.n,'과','와')} 신나게 놀았어요!`); saveRun(); checkStickers(); await wait(1600);
  }
  closeModal();
}
function openCastle(){
  const upcoming=Object.entries(CONTEST_AT).map(([mi,k])=>{const done=S.medals.find(x=>x.mi===+mi);const C=k==='autumn'?{n:'가을 축제',i:'🍂'}:CONTESTS[k];return `<div class="rc"><span>${C.i}</span>${MONTHS[mi]}월 말 · ${C.n} ${done?RANKS[done.rank].i:+mi<S.mi?'':'🔜'}</div>`}).join('');
  const m=openModal(`${headHTML('🏰','하츄핑 왕궁','대회 일정과 기록을 볼 수 있어요')}<div class="recap">${upcoming}<div class="rc"><span>🎂</span>8월 · 하츄핑 생일</div><div class="rc"><span>💃</span>2월 말 · 왕국 무도회</div></div>
    <div class="row"><button class="btn" data-v="book" data-say="엔딩 도감">📖 엔딩 도감</button><button class="btn" data-v="stk" data-say="스티커북">⭐ 스티커북</button><button class="btn" data-v="album" data-say="추억 앨범">📷 추억 앨범</button><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say('하츄핑 왕궁이에요. 대회 일정을 볼 수 있어요!');
  pick(m).then(v=>{if(v==='book')openBook();else if(v==='stk')openStickers();else if(v==='album')openAlbum();else closeModal()});
}

/* ---------- 놀이터 (미니게임 연습) ---------- */
function openPlayground(inRun){
  const m=openModal(`${headHTML('🎪','놀이터','좋아하는 놀이를 마음껏 해요! (점수는 연습이에요)')}
    <div class="pg">${PLAYGROUND.map(k=>{const G=GAMES[k],b=meta.best[k];return `<button class="acard" data-v="${k}" data-say="${G.n}" style="--ac:#B69CFF"><span class="ai">${G.i}</span><span class="an">${G.n}</span><small>${b!=null?'⭐'.repeat(starsOf(b)):'처음이에요'}</small></button>`}).join('')}</div>
    <div class="row"><button class="btn pink" data-v="x" data-say="닫기">✔ 닫기</button></div>`,'wide');
  say('놀이터예요! 좋아하는 놀이를 골라요!');
  pick(m).then(async v=>{
    if(v==='x'){closeModal();if(!inRun&&!S)bgm('title');return}
    const sc=await playGame(v);
    let bonus='';
    if(inRun&&S&&!S.parked){S.parked=true;addMood(8);bonus='<div class="chips"><div class="chip" style="--c:#FF5C9E">💗 기분 <em>+8</em></div></div>'}
    const r=openModal(`<div class="center"><div class="res-hero bob">${heroPing({face:'happy'})}</div><div class="res-title">${sc>=8?'최고예요!':sc>=5?'잘했어요!':'재밌었어요!'}</div><div class="res-stars">${'⭐'.repeat(starsOf(sc))}</div>${bonus}
      <div class="row"><button class="btn big" data-v="again" data-say="다시 하기">🔁 다시 하기</button><button class="btn pink big" data-v="list" data-say="다른 놀이">🎪 다른 놀이</button></div></div>`);
    sfx.fanfare(); say(sc>=8?'최고예요!':'잘했어요!');
    const w=await pick(r);
    if(w==='again'){const k=v;openPlaygroundRun(k,inRun)}else openPlayground(inRun);
  });
}
async function openPlaygroundRun(k,inRun){await playGame(k);openPlayground(inRun)}

/* ---------- 부모님 설정 ---------- */
function openParentGate(){
  const m=openModal(`<div class="center"><div style="font-size:60px">🔒</div><h2>어른만 열 수 있어요</h2><p class="ev-p">아래 버튼을 2초 동안 꾹 누르세요.</p>
    <div class="row"><button class="btn pink big hold" id="hold"><span class="fill"></span>🔑 꾹 누르기</button><button class="btn" id="gx">✖ 닫기</button></div></div>`);
  const h=$('#hold',m); let t=null;
  const start=e=>{e.preventDefault();h.classList.add('holding');t=setTimeout(()=>{openSettings()},2000)};
  const stop=()=>{h.classList.remove('holding');clearTimeout(t)};
  h.addEventListener('pointerdown',start); h.addEventListener('pointerup',stop); h.addEventListener('pointerleave',stop);
  $('#gx',m).onclick=()=>{sfx.pop();closeModal()};
}
function openSettings(){
  const seg=(k,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button class="${CFG[k]===v?'on':''}" data-k="${k}" data-val='${JSON.stringify(v)}'>${l}</button>`).join('')}</div>`;
  const m=openModal(`${headHTML('⚙️','부모님 설정','')}
    <div class="settings">
      <div class="set"><b>🗣️ 읽어 주는 목소리</b>${seg('voice',[[true,'켜기'],[false,'끄기']])}</div>
      <div class="set"><b>🐢 목소리 빠르기</b>${seg('voiceRate',[[.8,'천천히'],[.95,'보통'],[1.1,'빠르게']])}</div>
      <div class="set"><b>🎵 배경음악</b>${seg('bgm',[[true,'켜기'],[false,'끄기']])}</div>
      <div class="set"><b>🔔 효과음</b>${seg('sfx',[[true,'켜기'],[false,'끄기']])}</div>
      <div class="set"><b>🎮 미니게임 속도</b>${seg('speed',[['slow','느리게'],['normal','보통'],['fast','빠르게']])}</div>
      <div class="set"><b>⏰ 쉬는 시간 알림</b>${seg('breakMin',[[0,'끄기'],[20,'20분'],[30,'30분'],[45,'45분']])}</div>
      <div class="set"><b>🧩 캐릭터 그림체</b>${seg('pixel',[[true,'도트'],[false,'매끈한 그림']])}</div>
      ${Object.keys(SPR).length?`<div class="set"><b>🌟 원작 도트</b>${seg('refSprite',[[true,'원작 도트 쓰기'],[false,'그린 도트 쓰기']])}</div>`:''}
      <div class="set"><b>🖼️ 캐릭터 그림</b>${seg('charImg',[[true,'내가 넣은 그림 쓰기'],[false,'게임 그림만 쓰기']])}</div>
      <div class="charpick">${CHAR_KEYS.map(k=>`<div class="cpk"><div class="cpk-img">${k==='hachu'?ping({stage:2,outfit:meta.outfit}):ping({who:k,stage:1,prop:true})}</div><b>${CHAR_NAMES[k]}</b>
        <label class="btn sm pink">📁 그림 넣기<input type="file" accept="image/*" data-ci="${k}" hidden></label>${CHAR_IMG[k]?`<button class="btn sm" data-cdel="${k}">🗑️ 빼기</button>`:''}</div>`).join('')}</div>
      <p class="hint">배경이 없는(투명) PNG가 가장 예뻐요. 흰색처럼 한 가지 색인 배경은 자동으로 지워요.<br>넣은 그림은 이 컴퓨터 브라우저에만 저장되고, 넣은 그림에는 옷 입히기와 표정이 보이지 않아요.</p>
      <div class="set"><b>💾 저장 데이터</b><div class="seg">${[1,2,3].map(n=>`<button data-del="${n}">슬롯 ${n} 지우기</button>`).join('')}<button data-reset="1" class="danger">모두 처음으로</button></div></div>
      <p class="hint">버전 ${VERSION} · 옷 ${meta.owned.length}/${ITEMS.length} · 엔딩 ${meta.endings.length}/${ENDING_ORDER.length} · 스티커 ${meta.stickers.length}/${STICKERS.length}</p>
    </div>
    <div class="row"><button class="btn pink" id="sx">✔ 닫기</button></div>`,'wide');
  m.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{
    CFG[b.dataset.k]=JSON.parse(b.dataset.val); saveCfg(); sfx.click();
    m.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach(z=>z.classList.toggle('on',z===b));
    if(b.dataset.k==='bgm'){if(CFG.bgm)bgm(BGM.want||'title');else bgmStop(true)}
    if(b.dataset.k==='voiceRate'||b.dataset.k==='voice')say('하츄핑이 이렇게 읽어 줄게요!');
    if(b.dataset.k==='breakMin')breakStart=Date.now();
    if(b.dataset.k==='charImg'||b.dataset.k==='pixel'||b.dataset.k==='refSprite')openSettings();
  });
  m.querySelectorAll('[data-ci]').forEach(inp=>inp.onchange=async()=>{
    const f=inp.files&&inp.files[0]; if(!f)return;
    const ok=await importCharImg(f,inp.dataset.ci);
    if(ok){sfx.chime();toast(`🖼️ <b>${CHAR_NAMES[inp.dataset.ci]}</b> 그림을 넣었어요!`)}else{sfx.soft();toast('그림을 넣지 못했어요. 다른 그림으로 해 보세요')}
    openSettings();
  });
  m.querySelectorAll('[data-cdel]').forEach(b=>b.onclick=()=>{removeCharImg(b.dataset.cdel);sfx.soft();openSettings()});
  m.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
    if(b.dataset.armed){drop(slotKey(+b.dataset.del));b.textContent='지웠어요 ✔';b.disabled=true;sfx.soft();return}
    b.dataset.armed=1;b.textContent='한 번 더 누르면 지워요';
  });
  $('[data-reset]',m).onclick=e=>{
    const b=e.currentTarget;
    if(b.dataset.armed){[1,2,3].forEach(n=>drop(slotKey(n)));drop(META);meta={};normMeta();saveMeta();b.textContent='처음으로 돌렸어요 ✔';b.disabled=true;return}
    b.dataset.armed=1;b.textContent='정말요? 옷·엔딩·스티커가 모두 지워져요. 한 번 더 누르세요';
  };
  $('#sx',m).onclick=()=>{sfx.pop();closeModal();if(!S)renderTitle();else refreshHome()};
}

/* ---------- 쉬는 시간 알림 ---------- */
let breakStart=Date.now();
setInterval(()=>{
  if(!CFG.breakMin)return;
  if(Date.now()-breakStart<CFG.breakMin*60000)return;
  breakStart=Date.now();
  const o=document.createElement('div'); o.className='breakov';
  o.innerHTML=`<div class="panel center"><div class="bob" style="width:180px;margin:0 auto">${ping({stage:2,outfit:meta.outfit,face:'sleepy'})}</div><h2 class="big-title">잠깐 쉬어요!</h2><p class="intro-txt" style="min-height:0">눈도 쉬고, 물도 마시고, 기지개도 쭉 켜요! 🧃</p><div class="row"><button class="btn pink big" disabled>⏳ 조금만 기다려요</button></div></div>`;
  $('#game').appendChild(o); say('잠깐 쉬어요! 눈도 쉬고, 물도 마시고, 기지개도 쭉 켜요!');
  const b=$('button',o); setTimeout(()=>{b.disabled=false;b.textContent='✔ 다 쉬었어요'},15000);
  b.onclick=()=>{o.remove();sfx.pop()};
},30000);

/* ---------- 친구 초대하기 (집에서 같이 놀기) ---------- */
const PLAYS = [
  {k:'doll',   n:'인형 놀이',  i:'🧸',bg:'#FFF0F6',deco:['🧸','🎀','🪆','💗','⭐'],gain:{kind:1},       mood:8, line:'인형한테 예쁜 옷 입혀 주자!',          reply:'좋아! 이 인형은 공주님이야!'},
  {k:'library',n:'도서관 가기',i:'📚',bg:'#FFF4D9',deco:['📚','📖','🕯️','🌙','📜'],gain:{smart:2},      mood:4, line:'도서관에서 이 동화책 같이 읽자!',      reply:'와, 그림이 너무 예쁘다!'},
  {k:'toilet', n:'화장실 가기',i:'🚽',bg:'#E6F4FF',deco:['🚽','🧻','🧼','🫧','💧'],gain:{},             mood:6, line:'잠깐 화장실 다녀올게!',                reply:'다녀와서 손도 깨끗이 씻자!'},
  {k:'snack',  n:'간식 먹기',  i:'🍪',bg:'#FFEBD6',deco:['🍪','🧁','🍓','🥛','🍰'],gain:{body:1},       mood:10,line:'냠냠! 같이 먹으니까 더 맛있어!',       reply:'나눠 먹으면 두 배로 맛있어!'},
  {k:'hide',   n:'숨바꼭질',   i:'🙈',bg:'#E3F7E8',deco:['🌳','🙈','🛋️','🌷','🪴'],gain:{body:1},       mood:10,line:'꼭꼭 숨어라 머리카락 보일라!',          reply:'찾았다! 거기 숨었구나!'},
  {k:'draw',   n:'그림 그리기',i:'🖍️',bg:'#FFF8DD',deco:['🖍️','🎨','🖼️','🌈','✏️'],gain:{art:2},        mood:6, line:'우리 서로 얼굴 그려 주자!',            reply:'짜잔! 너랑 똑같이 그렸어!'},
  {k:'dance',  n:'춤추기',     i:'💃',bg:'#F3E8FF',deco:['🎶','💃','✨','🎶','🪩'],gain:{art:1,body:1}, mood:8, line:'음악 틀어 줄게! 같이 춤추자!',         reply:'빙글빙글~ 너무 신나!'},
  {k:'dress',  n:'옷 바꿔 입기',i:'👗',bg:'#FFE6F6',deco:['👗','👠','🎀','👒','💍'],gain:{charm:2},     mood:8, line:'와, 그 드레스 정말 잘 어울려!',        reply:'너도 공주님 같아!'},
  {k:'tea',    n:'티파티',     i:'🫖',bg:'#FFF0F6',deco:['🫖','☕','🍰','🌹','🕯️'],gain:{charm:1,kind:1},mood:8,line:'공주님처럼 차를 마셔 볼까?',           reply:'호호, 향기가 너무 좋아요!'},
  {k:'bath',   n:'손 씻기',    i:'🧼',bg:'#DDF3FF',deco:['🧼','🫧','💧','🫧','🧴'],gain:{charm:1},      mood:5, line:'놀고 나면 손을 깨끗이 씻어야 해!',     reply:'보글보글 거품 손 완성!'},
];
function partyHTML(inv,face=''){
  return `<div class="party">${inv.map(f=>`<div class="bob">${friendPing(f,{face,prop:false})}</div>`).join('')}<div class="bob me">${heroPing({face})}</div></div>`;
}
async function runInvite(A){
  const fs=metFriends(); let sel=[];
  const m=openModal(`${headHTML('🏠','친구 초대하기','누구를 초대할까요? 세 명까지 고를 수 있어요!')}<div class="fgrid invite" id="ivf"></div>
    <div class="row"><button class="btn pink big" id="ivGo" data-say="초대하기" disabled>🎉 초대하기</button></div>`,'wide');
  say('친구 초대하기! 누구를 초대할까요? 세 명까지 고를 수 있어요!');
  const grid=$('#ivf',m);
  const draw=()=>{
    grid.innerHTML=fs.map(f=>{const on=sel.includes(f.id);return `<button class="fcard ${on?'picked':''}" data-f="${f.id}" style="--fb:${f.bg}" data-say="${f.n}"><div class="fp">${friendPing(f,{face:on?'happy':''})}</div><b>${f.n}</b><span class="hearts">${heartsHTML(S.friends[f.id])}</span><small>${on?'✔ 초대해요':'눌러서 고르기'}</small></button>`}).join('');
    grid.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.f;
      if(sel.includes(id))sel=sel.filter(x=>x!==id); else if(sel.length<3)sel.push(id); else{sfx.soft();say('세 명까지 초대할 수 있어요');return}
      sfx.click(); draw(); $('#ivGo',m).disabled=!sel.length;
    });
  };
  draw();
  await new Promise(r=>$('#ivGo',m).onclick=r);
  sfx.chime();
  const inv=sel.map(id=>FR[id]), acc=newAcc(), done=[];
  for(let round=0;round<3;round++){
    const opts=shuffle(PLAYS.filter(p=>!done.includes(p.k))).slice(0,6);
    if(!opts.some(p=>p.k==='library')&&!done.includes('library'))opts[0]=PLAYS.find(p=>p.k==='library');
    if(!opts.some(p=>p.k==='toilet')&&!done.includes('toilet'))opts[1]=PLAYS.find(p=>p.k==='toilet');
    const m2=openModal(`<div class="center"><span class="slot-pill">🏠 친구들과 놀기 · ${round+1} / 3</span><h2 class="big-title">${round===0?'친구들이 놀러 왔어요! ':''}뭐 하고 놀까요?</h2></div>
      ${sceneBox('','linear-gradient(#FFE6F0,#FFF6FB)',['🎈','💗','🧸','⭐','🎀'],partyHTML(inv,round===0?'happy':''))}
      <div class="acards play" id="pl">${opts.map(p=>`<button class="acard" data-v="${p.k}" data-say="${p.n}" style="--ac:#FF8FC0"><span class="ai">${p.i}</span><span class="an">${p.n}</span></button>`).join('')}</div>`,'wide');
    say(`${round===0?'친구들이 놀러 왔어요! ':''}뭐 하고 놀까요?`);
    const k=await pick($('#pl',m2)), P=PLAYS.find(p=>p.k===k); done.push(k);
    const sp=pickOne(inv);
    const m3=openModal(`<div class="center"><span class="slot-pill">${P.i} ${P.n}</span></div>
      ${sceneBox('',`linear-gradient(${P.bg},#FFFFFF)`,P.deco,partyHTML(inv,'happy'))}<div id="plr"></div>`,'wide');
    await talkSeq([[sp.id,P.line],['hachu',P.reply,'happy']]);
    const r=newAcc(); accGain(r,P.gain); accMood(r,P.mood); inv.forEach(f=>{if(Math.random()<.4)addHeart(f.id)});
    for(const [s,v] of Object.entries(r.stats))acc.stats[s]=(acc.stats[s]||0)+v;
    acc.mood+=r.mood;
    $('#plr',m3).innerHTML=`<div class="chips">${chipsHTML(r)}</div><div class="row"><button class="btn pink big" data-v="n" data-say="다음">${round<2?'다음 놀이 ▶':'이제 그만 놀자 ▶'}</button></div>`;
    sfx.chime(); await pick($('#plr',m3));
  }
  inv.forEach(f=>addHeart(f.id)); accMood(acc,A.mood||10);
  S.cnt[A.key]=(S.cnt[A.key]||0)+1; S.pers.kind++;
  const names=inv.map(f=>f.n).join(', '), plays=done.map(k=>PLAYS.find(p=>p.k===k).n).join(', ');
  diary('🏠',`${josa(names,'이','가')} 놀러 왔어요. 같이 ${plays} 했어요.`);
  const r=openModal(`<div class="center"><h2 class="big-title">또 놀자! 안녕~ 👋</h2>
    ${sceneBox('','linear-gradient(#FFE6F0,#FFF6FB)',['🌙','💗','⭐','✨','🎀'],partyHTML(inv,'happy'))}
    <p class="ev-p">${inv.map(f=>`${f.n} ${heartsHTML(S.friends[f.id])}`).join('<br>')}</p>
    <div class="chips">${chipsHTML(acc)}</div>
    <div class="row"><button class="btn pink big" data-v="n" data-say="다음">${S.slot===2?'이번 달 끝! ▶':'다음 칸 ▶'}</button></div></div>`,'wide');
  sfx.fanfare(); say(`친구들이 집에 갔어요. 또 놀자! ${speechOf(acc)}`); checkStickers();
  await pick(r);
}
