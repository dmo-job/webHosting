/* =========================================================
   시작
   ========================================================= */
fitGame();
(async()=>{
  if(CFG.pixel!==false){
    const warm=[...['','blink','happy','sleepy'].map(f=>({stage:2,outfit:meta.outfit,face:f})),...FRIENDS.map(f=>({who:f.id,stage:1,prop:true}))];
    await Promise.race([pxWarm(warm),wait(3000)]);
  }
  renderTitle();
})();
addEventListener('keydown',e=>{if(e.key==='F'&&e.shiftKey)toggleFullscreen()});
