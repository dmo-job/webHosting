/* =========================================================
   모험 (무사수행)
   ========================================================= */
function buildAdvNodes(R){
  const extra=shuffle(['treasure','block','spring','treasure']);
  if(!(R.friend in S.friends)||Math.random()<.5)extra.unshift('friend');
  return [...shuffle(['foe','quiz',...extra.slice(0,2)]),'goal'];
}
async function runAdventure(A){
  const R=REGIONS[A.region], acc=newAcc();
  accMood(acc,A.mood);
  bgm('adventure');
  const nodes=buildAdvNodes(R);
  const NODE_I={foe:R.foe.i,quiz:'🧚',treasure:'🎁',block:R.block.i,spring:'⛲',friend:'👫',goal:R.goal.i};
  const m=openModal(`${headHTML(R.i,R.n,'앞으로 가면서 모험해요!')}
    <div class="adv-path">${nodes.map((t,j)=>`<span class="anode" data-j="${j}">${t==='goal'?R.goal.i:'❔'}</span>`).join('')}</div>
    ${sceneBox(R.img,R.bg,R.deco,`<div class="adv-hero bob" id="ahero">${heroPing()}</div><div class="adv-ev" id="aev"></div>`,'adv-scene')}
    <p class="adv-txt" id="atx"></p><div class="row" id="ach"></div>`,'wide');
  const ev=$('#aev',m), tx=$('#atx',m), chEl=$('#ach',m), hero=$('#ahero',m), ns=$$('.anode',m);
  async function step(o){
    if(o.ev!==undefined){ev.innerHTML=o.ev;ev.style.animation='none';void ev.offsetWidth;ev.style.animation=''}
    tx.textContent=o.text; say(o.say||o.text);
    chEl.innerHTML=o.choices.map(c=>`<button class="${c.q?'qbtn':'btn big '+(c.pink?'pink':'')}" data-v="${c.v}" data-say="${c.s||noEmoji(c.l)}">${c.l}</button>`).join('');
    return pick(chEl);
  }
  const next=[{v:'go',l:'좋아요 ▶',pink:1}];
  for(let j=0;j<nodes.length;j++){
    await step({ev:'👣',text:j===0?`${ro(R.n)} 모험을 떠나요! 앞으로 가 볼까요?`:'다음 길로 가 볼까요?',choices:[{v:'go',l:'👣 앞으로!',pink:1}]});
    ns.forEach((n,k)=>n.classList.toggle('now',k===j)); hop(hero); sfx.whoosh();
    hero.style.left=`${12+j*7}%`;
    const t=nodes[j];
    if(t==='treasure'){
      await step({ev:'🎁',text:'보물 상자를 찾았어요! 열어 볼까요?',choices:[{v:'open',l:'🔓 열어 보기',pink:1}]});
      if(Math.random()<.3){const sn=pickOne(SNACKS.filter(s=>s.price));addSnack(sn.id);sfx.chime();await step({ev:sn.i,text:`${sn.i} ${josa(sn.n,'이','가')} 들어 있었어요!`,choices:next})}
      else{const c=10+rand(4)*5;accCoins(acc,c);sfx.coin();await step({ev:'🪙',text:`반짝반짝! 코인 ${c}개를 찾았어요!`,choices:next})}
    }else if(t==='foe'){
      const v=await step({ev:R.foe.i,text:`${josa(R.foe.n,'이','가')} 길을 막았어요! 어떻게 할까요?`,choices:[{v:'body',l:'💪 힘내기'},{v:'magic',l:'🪄 마법 쓰기'},{v:'kind',l:'💗 친구 하자!'}]});
      const ok=Math.random()<Math.min(.95,.35+S.stats[v]/80);
      if(ok){accStat(acc,v,3);accCoins(acc,15);sfx.fanfare();await step({ev:'💖',text:`${josa(R.foe.n,'이','가')} 착해졌어요! 고맙다고 코인을 줬어요!`,choices:next});diary(R.foe.i,`${R.n}에서 ${josa(R.foe.n,'과','와')} 친구가 됐어요.`)}
      else{accStat(acc,v,1);sfx.soft();await step({ev:'💨',text:`${josa(R.foe.n,'이','가')} 휙 도망갔어요! 그래도 괜찮아요!`,choices:next})}
    }else if(t==='quiz'){
      const q=pickOne(QUIZ);
      const v=await step({ev:'🧚',text:`퀴즈 요정이 물어봐요! ${q.q}`,choices:shuffle([q.a,...q.o]).map(x=>({v:x,l:x,q:1,s:x}))});
      if(v===q.a){accStat(acc,'smart',3);sfx.chime();await step({ev:'⭕',text:'딩동댕! 정답이에요!',choices:next})}
      else{accStat(acc,'smart',1);sfx.soft();await step({ev:q.a,text:`아쉬워요! 정답은 ${q.a}!`,say:'아쉬워요! 다음엔 맞힐 수 있어요!',choices:next})}
    }else if(t==='block'){
      await step({ev:R.block.i,text:`${josa(R.block.n,'이','가')} 있어요! 넘어가 볼까요?`,choices:[{v:'go',l:'💪 영차!',pink:1}]});
      hop(hero);
      if(S.stats.body>=S.mi*3){accStat(acc,'body',2);sfx.chime();await step({ev:'🎉',text:'영차! 멋지게 넘었어요!',choices:next})}
      else{accStat(acc,'body',1);await step({ev:'🐢',text:'조심조심 돌아서 갔어요!',choices:next})}
    }else if(t==='spring'){
      await step({ev:'⛲',text:'반짝이는 샘물을 찾았어요! 마시면 기운이 나요!',choices:[{v:'go',l:'🥤 마시기',pink:1}]});
      accMood(acc,12); sfx.chime(); await step({ev:'💗',text:'기운이 났어요!',choices:next});
    }else if(t==='friend'){
      const f=FR[R.friend], first=!(f.id in S.friends); addHeart(f.id); sfx.chime();
      if(first)diary('👫',`${R.n}에서 새 친구 ${josa(f.n,'을','를')} 만났어요!`);
      await step({ev:friendPing(f,{face:'happy'}),text:first?`새 친구 ${josa(f.n,'을','를')} 만났어요! 같이 모험해요!`:`${josa(f.n,'이','가')} 같이 놀자고 해요! ${heartsHTML(S.friends[f.id])}`,choices:next});
    }else if(t==='goal'){
      const it=grant(R.goal.item);
      diary(R.goal.i,`${R.n}에서 ${josa(R.goal.n,'을','를')} 찾았어요!`);
      if(it){sfx.fanfare();confetti(24);await step({ev:R.goal.i,text:`${josa(R.goal.n,'을','를')} 찾았어요! 보물로 ${josa(it.n,'을','를')} 받았어요!`,choices:next})}
      else{accCoins(acc,40);sfx.coin();await step({ev:R.goal.i,text:`${josa(R.goal.n,'을','를')} 또 찾았어요! 코인 40개를 받았어요!`,choices:next})}
    }
    ns[j].classList.add('done'); ns[j].textContent=NODE_I[t];
  }
  accStat(acc,'body',3); accStat(acc,'magic',2);
  S.advCount++; S.cnt[A.key]=(S.cnt[A.key]||0)+1; S.pers.brave++;
  meta.st.regions[A.region]=1; saveMeta();
  const r=openModal(`<div class="center"><div class="res-hero bob">${heroPing({face:'happy'})}</div><div class="res-title">모험 끝!</div><div class="res-stars">🗺️✨</div>
    <div class="chips">${chipsHTML(acc)}</div><div class="row"><button class="btn pink big" data-v="n" data-say="다음">${S.slot===2?'이번 달 끝! ▶':'다음 칸 ▶'}</button></div></div>`);
  sfx.fanfare(); say(`모험 끝! ${speechOf(acc)}`); checkStickers();
  await pick(r); bgm(homeTrack());
}
