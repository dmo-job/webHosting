/* =========================================================
   그림 (SVG) · 이미지 에셋
   ========================================================= */
const IMG = window.HPM_IMAGES || {};
function imgUrl(k){return IMG[k] ? 'assets/images/'+IMG[k] : null}
function bgCSS(k,fallback){const u=imgUrl(k);return u?`background:url('${u}') center/cover no-repeat, ${fallback}`:`background:${fallback}`}

let uid = 0;
function heartPath(cx,cy,s){return `M${cx},${cy+s*.9} C${cx-s*1.4},${cy+s*.05} ${cx-s*.85},${cy-s*1.05} ${cx},${cy-s*.35} C${cx+s*.85},${cy-s*1.05} ${cx+s*1.4},${cy+s*.05} ${cx},${cy+s*.9}Z`}
function starPath(cx,cy,r,ir=r*.45){let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?ir:r;p+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(1)+','+(cy+Math.sin(a)*rr).toFixed(1)}return p+'Z'}
function symbolPath(t,cx,cy,s){
  switch(t){
    case 'star':return starPath(cx,cy,s*1.3);
    case 'drop':return `M${cx},${cy-s*1.25} C${cx+s*.6},${cy-s*.35} ${cx+s},${cy+s*.05} ${cx+s},${cy+s*.45} A${s},${s} 0 0 1 ${cx-s},${cy+s*.45} C${cx-s},${cy+s*.05} ${cx-s*.6},${cy-s*.35} ${cx},${cy-s*1.25}Z`;
    case 'leaf':return `M${cx},${cy-s*1.2} C${cx+s*1.15},${cy-s*.6} ${cx+s*.95},${cy+s*.75} ${cx},${cy+s*1.2} C${cx-s*.95},${cy+s*.75} ${cx-s*1.15},${cy-s*.6} ${cx},${cy-s*1.2}Z`;
    case 'bolt':return `M${cx+s*.25},${cy-s*1.25} L${cx-s*.75},${cy+s*.15} L${cx-s*.05},${cy+s*.15} L${cx-s*.35},${cy+s*1.25} L${cx+s*.8},${cy-s*.3} L${cx+s*.08},${cy-s*.3}Z`;
    case 'note':{const r=s*.5,x=cx-s*.3,y=cy+s*.7,sx=x+r-s*.18;
      return `M${x-r},${y} a${r},${r} 0 1 0 ${2*r},0 a${r},${r} 0 1 0 ${-2*r},0Z M${sx},${y} L${sx},${cy-s*1.2} L${sx+s*.3},${cy-s*1.2} Q${cx+s*1.1},${cy-s*.9} ${cx+s*.9},${cy-s*.1} Q${cx+s*.6},${cy-s*.6} ${sx+s*.3},${cy-s*.7} L${sx+s*.3},${y}Z`}
  }
  return heartPath(cx,cy,s);
}

/* ---------- 옷 ---------- */
function dressSVG(d,id){
  const it=ITEM[d];
  const base=(fill,stroke='#E0558F')=>`<path d="M70,160 Q100,150 130,160 L147,206 Q100,220 53,206Z" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
  const hem=(c='#fff',r=6.5)=>{let s='';for(let x=58;x<=142;x+=12){const y=206+7*(1-((x-100)/47)**2);s+=`<circle cx="${x}" cy="${y.toFixed(1)}" r="${r}" fill="${c}" opacity=".92"/>`}return s};
  const bow=(c='#FF4F8B')=>`<path d="${heartPath(100,160,8)}" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
  switch(d){
    case 'd_flora':return `<path d="M62,180 Q100,190 138,180 L150,208 Q100,222 50,208Z" fill="#FFFFFF" stroke="#F0A8C8" stroke-width="2.5"/>`+[54,70,86,102,118,134,146].map((x,i)=>`<ellipse cx="${x}" cy="${206+(i%2?3:0)}" rx="9.5" ry="7.5" fill="${i%2?'#FFB3D6':'#FF7FB6'}"/>`).join('')+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFFFFF" stroke="#F0A8C8" stroke-width="2.5"/><path d="M67,180 Q100,194 133,180" stroke="#7CC447" stroke-width="3" fill="none"/>${[0,72,144,216,288].map(a=>`<circle cx="${(100+Math.cos(a*Math.PI/180)*6).toFixed(1)}" cy="${(168+Math.sin(a*Math.PI/180)*6).toFixed(1)}" r="5" fill="#FF7FB6"/>`).join('')}<circle cx="100" cy="168" r="4" fill="#FFD54F"/>`;
    case 'd_berry':return `<path d="M60,178 Q100,190 140,178 L148,196 Q100,206 52,196Z" fill="#FFB3D6" stroke="#E57AAE" stroke-width="2"/><path d="M54,194 Q100,206 146,194 L152,210 Q100,224 48,210Z" fill="#FF8CC0" stroke="#E0558F" stroke-width="2.5"/>`+hem('#FFE0EE',5.5)+[[70,201],[100,205],[130,201],[84,187],[116,187]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.4" fill="#E8365C"/>`).join('')+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFFFFF" stroke="#F0A8C8" stroke-width="2.5"/><path d="M100,166 L87,158 L87,174Z M100,166 L113,158 L113,174Z" fill="#FF6FA8" stroke="#E0407F" stroke-width="1.5" stroke-linejoin="round"/><circle cx="100" cy="166" r="3.8" fill="#E8365C"/>`;
    case 'd_starform':return `<path d="M62,180 Q100,190 138,180 L150,208 Q100,222 50,208Z" fill="#FF9CC9" stroke="#E0558F" stroke-width="2.5"/>`+hem('#FFE0EE',6)+[[72,194],[96,200],[122,194],[110,186],[84,186]].map(([x,y],i)=>`<path d="${starPath(x,y,5)}" fill="${i%2?'#FFFFFF':'#FFE27A'}"/>`).join('')+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFFFFF" stroke="#F0A8C8" stroke-width="2.5"/><path d="M67,180 Q100,194 133,180" stroke="#F2C230" stroke-width="3" fill="none"/><path d="${starPath(100,168,9)}" fill="#FF6FB2" stroke="#F2C230" stroke-width="1.8" stroke-linejoin="round"/>`;
    case 'd_dia':return `<path d="M62,180 Q100,190 138,180 L150,208 Q100,222 50,208Z" fill="#FFB8D8" stroke="#E0558F" stroke-width="2.5"/><g stroke="#FFFFFF" stroke-width="1.8" opacity=".9">${[60,76,92,108,124,140].map(x=>`<path d="M${x},184 L${x+12},206 M${x+12},184 L${x},206"/>`).join('')}</g>`+hem('#FFFFFF',5)+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFD6EA" stroke="#F0A8C8" stroke-width="2.5"/><path d="M78,156 Q100,168 122,156" stroke="#fff" stroke-width="5" fill="none"/><path d="M100,162 L92,170 L100,180 L108,170Z" fill="#FFFFFF" stroke="#FF8FC0" stroke-width="1.6"/>`;
    case 'd_princess':return `<defs><linearGradient id="${id}p" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FF8CC4"/></linearGradient></defs><path d="M46,186 Q28,202 32,224 Q42,214 52,210Z M154,186 Q172,202 168,224 Q158,214 148,210Z" fill="#A8E2FF" stroke="#7CC8F0" stroke-width="1.5"/><path d="M60,178 Q100,190 140,178 L158,214 Q100,232 42,214Z" fill="url(#${id}p)" stroke="#E57AAE" stroke-width="2.5"/><path d="M46,208 Q100,226 154,208" stroke="#F2C230" stroke-width="3" fill="none"/><path d="M70,158 Q100,148 130,158 L134,182 Q100,196 66,182Z" fill="#FFFFFF" stroke="#EDB3CF" stroke-width="2.5"/><path d="M67,180 Q100,198 133,180" stroke="#F2C230" stroke-width="3.5" fill="none"/><path d="M92,180 L89,166 L95,171 L100,161 L105,171 L111,166 L108,180Z" fill="#F2C230" stroke="#B8860B" stroke-width="1.5" stroke-linejoin="round"/><circle cx="100" cy="154" r="4.5" fill="#A8E2FF" stroke="#fff" stroke-width="1.5"/>`;
    case 'd_areum':return `<path d="M62,180 Q100,190 138,180 L150,208 Q100,222 50,208Z" fill="#FFB8D8" stroke="#E57AAE" stroke-width="2.5"/>`+hem('#FFE3A8',5.5)+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFFFFF" stroke="#F0A8C8" stroke-width="2.5"/><path d="M67,180 Q100,194 133,180" stroke="#F2C230" stroke-width="3" fill="none"/><path d="M92,178 L90,166 L95,170 L100,162 L105,170 L110,166 L108,178Z" fill="#F2C230" stroke="#B8860B" stroke-width="1.4"/>`;
    case 'd_sappun':return `<path d="M52,186 Q100,174 148,186 L160,200 Q100,214 40,200Z" fill="#FFFFFF" stroke="#97B2E6" stroke-width="2.5"/><path d="M48,198 Q100,212 152,198 L156,206 Q100,220 44,206Z" fill="#CFE6FF" stroke="#97B2E6" stroke-width="2"/><path d="M70,158 Q100,148 130,158 L134,184 Q100,192 66,184Z" fill="#FFFFFF" stroke="#BFD8F2" stroke-width="2.5"/><path d="M100,166 L94,172 L100,180 L106,172Z" fill="#7CC8FF"/>`;
    case 'd_ponny':return base(`url(#${id}r)`,'#E6B48A')+hem()+`<path d="M70,158 Q100,148 130,158 L134,182 Q100,192 66,182Z" fill="#FFFFFF" stroke="#E6B48A" stroke-width="2.5"/><path d="M92,178 L90,166 L95,170 L100,162 L105,170 L110,166 L108,178Z" fill="#F2C230" stroke="#B8860B" stroke-width="1.4"/>`;
    case 'd_hachu':return `<defs><linearGradient id="${id}k" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F57DB6"/></linearGradient></defs>
      <path d="M60,178 Q100,190 140,178 L154,208 Q127,216 100,222 Q73,216 46,208Z" fill="url(#${id}k)" stroke="#E57AAE" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M52,202 Q100,218 148,202" stroke="#F2C230" stroke-width="3" fill="none"/>
      <path d="M70,158 Q100,148 130,158 L134,182 Q100,196 66,182Z" fill="#FFFFFF" stroke="#EDB3CF" stroke-width="2.5"/>
      <path d="M67,180 Q100,198 133,180" stroke="#F2C230" stroke-width="3.5" fill="none"/>
      <path d="M92,180 L89,166 L95,171 L100,161 L105,171 L111,166 L108,180Z" fill="#F2C230" stroke="#B8860B" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M88,176 Q82,168 88,162 M112,176 Q118,168 112,162" stroke="#F2C230" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M100,154 L90,148 L90,160Z M100,154 L110,148 L110,160Z" fill="#F45E9E" stroke="#D9408C" stroke-width="1.5" stroke-linejoin="round"/><circle cx="100" cy="154" r="3.5" fill="#E2409A"/>`;
    case 'd_rainbow':return base(`url(#${id}r)`)+hem()+bow();
    case 'd_star':return base(it.color,'#8E74E8')+hem()+[[82,182],[112,176],[98,196],[126,196],[72,198]].map(([x,y])=>`<path d="${starPath(x,y,5)}" fill="#FFF6B0"/>`).join('')+bow('#FFD54F');
    case 'd_mermaid':{let s=base(it.color,'#2FA8C4');
      for(let y=172;y<=196;y+=12){const hw=30+(y-160)/46*17-6;for(let x=100-hw;x<=100+hw;x+=12)s+=`<path d="M${(x-6).toFixed(1)},${y} Q${x.toFixed(1)},${y+8} ${(x+6).toFixed(1)},${y}" stroke="#fff" stroke-width="2" fill="none" opacity=".85"/>`}
      return s+hem('#E8FBFF')+`<path d="${starPath(100,161,7)}" fill="#FFE27A" stroke="#fff" stroke-width="1.2"/>`}
    case 'd_cloud':return base('#FFFFFF','#9DB7E8')+hem('#DDE8FF',8.5)+[[84,180],[114,186]].map(([x,y])=>`<g fill="#EAF1FF"><circle cx="${x}" cy="${y}" r="6"/><circle cx="${x+7}" cy="${y-3}" r="7"/><circle cx="${x+14}" cy="${y}" r="6"/></g>`).join('')+bow('#8FB8FF');
    case 'd_apron':return base(it.color)+hem()+`<path d="M80,166 L120,166 L127,203 Q100,211 73,203Z" fill="#fff" stroke="#E7A3C4" stroke-width="2"/><path d="${heartPath(100,186,6)}" fill="#FF8FC0"/>`+bow();
    case 'd_knight':return base(it.color,'#8C9BB3')+hem('#FFD54F',5.5)+`<rect x="68" y="166" width="64" height="6" rx="3" fill="#B58A2E"/><path d="${heartPath(100,186,9)}" fill="#FF5C7A" stroke="#FFD54F" stroke-width="2"/>`;
    case 'd_ball':return base(it.color)+`<path d="M62,190 Q100,176 138,190 L147,206 Q100,220 53,206Z" fill="#FFC2DE" opacity=".9"/>`+hem('#FFE4F1')+[[80,176],[118,174],[96,200],[130,198],[68,198]].map(([x,y])=>`<path d="${starPath(x,y,4)}" fill="#FFD54F"/>`).join('')+bow('#FFD54F');
    case 'd_hanbok':{const cols=['#FF6F91','#FFD54F','#7FD9C0','#6FB8FF','#B69CFF'];let s=base('#FF7FA0','#D84D74');
      s+=`<clipPath id="${id}h"><ellipse cx="100" cy="166" rx="34" ry="12"/></clipPath><g clip-path="url(#${id}h)">`+cols.map((c,i)=>`<rect x="${66+i*14}" y="152" width="14" height="28" fill="${c}"/>`).join('')+'</g>';
      return s+`<path d="M98,170 Q90,190 86,200 M102,170 Q110,190 114,200" stroke="#D8306E" stroke-width="4" fill="none" stroke-linecap="round"/>`+hem('#FFE0EA',5)}
    case 'd_santa':return base(it.color,'#B82A38')+hem('#FFFFFF',8)+`<rect x="68" y="168" width="64" height="7" rx="3" fill="#3B2350"/><rect x="94" y="166" width="12" height="11" rx="2" fill="#FFD54F"/>`+`<circle cx="100" cy="158" r="7" fill="#fff"/>`;
  }
  let s=base(it.color)+hem();
  if(d==='d_mint'||d==='d_lemon')[[84,184],[116,184],[100,198]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="4" fill="#fff" opacity=".85"/>`);
  return s+bow();
}
function headSVG(h){
  switch(h){
    case 'ribbon':return `<g transform="translate(144 54) rotate(18)" stroke="#D8306E" stroke-width="2.5"><path d="M0,0 L-24,-15 Q-28,0 -24,15Z" fill="#FF5C9E"/><path d="M0,0 L24,-15 Q28,0 24,15Z" fill="#FF5C9E"/><circle r="7" fill="#FF3C80"/></g>`;
    case 'flower':{let s='<g transform="translate(56 60)">';for(let i=0;i<5;i++){const a=i*Math.PI*2/5;s+=`<circle cx="${(Math.cos(a)*10).toFixed(1)}" cy="${(Math.sin(a)*10).toFixed(1)}" r="8.5" fill="#fff" stroke="#FF8FC0" stroke-width="2"/>`}return s+'<circle r="6.5" fill="#FFD54F"/></g>'}
    case 'bunny':return `<g stroke="#E7A3C4" stroke-width="3" fill="#fff"><ellipse cx="74" cy="14" rx="11" ry="25" transform="rotate(-14 74 14)"/><ellipse cx="126" cy="14" rx="11" ry="25" transform="rotate(14 126 14)"/></g><g fill="#FFC2DA"><ellipse cx="74" cy="16" rx="5" ry="16" transform="rotate(-14 74 16)"/><ellipse cx="126" cy="16" rx="5" ry="16" transform="rotate(14 126 16)"/></g><path d="M50,62 Q100,10 150,62" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    case 'witch':return `<path d="M54,54 Q100,36 146,54 Q148,62 140,62 Q100,50 60,62 Q52,62 54,54Z" fill="#6B4FD6" stroke="#4E35B5" stroke-width="2.5"/><path d="M72,50 Q88,20 104,-6 Q114,-9 112,3 L128,48 Q100,40 72,50Z" fill="#7C5CFF" stroke="#4E35B5" stroke-width="2.5" stroke-linejoin="round"/><rect x="76" y="40" width="48" height="7" rx="3" fill="#FF8FC0"/><path d="${starPath(100,24,7)}" fill="#FFE27A"/>`;
    case 'starband':return `<path d="M46,80 Q100,4 154,80" stroke="#6CC8FF" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${starPath(100,36,18)}" fill="#FFD54F" stroke="#E8A800" stroke-width="2.5"/>`;
    case 'flowercrown':return flowerArc(['#FF8FC0','#FFE27A','#9FE8D2','#B7A4FF','#FFB36B','#FF8FC0','#FFE27A']);
    case 'h_flora':{const fl=(x,y)=>`<g>${[0,72,144,216,288].map(a=>`<circle cx="${(x+Math.cos(a*Math.PI/180)*8).toFixed(1)}" cy="${(y+Math.sin(a*Math.PI/180)*8).toFixed(1)}" r="7.5" fill="#FF7FB6" stroke="#fff" stroke-width="1.6"/>`).join('')}<circle cx="${x}" cy="${y}" r="5.5" fill="#FFD54F" stroke="#fff" stroke-width="1.2"/></g>`;
      return `<ellipse cx="58" cy="62" rx="7" ry="3.5" fill="#7CC447" transform="rotate(30 58 62)"/><ellipse cx="142" cy="62" rx="7" ry="3.5" fill="#7CC447" transform="rotate(-30 142 62)"/>`+fl(44,50)+fl(156,50)}
    case 'h_berry':{const fb=(x,y)=>`<g>${[0,60,120,180,240,300].map(a=>`<circle cx="${(x+Math.cos(a*Math.PI/180)*8.5).toFixed(1)}" cy="${(y+Math.sin(a*Math.PI/180)*8.5).toFixed(1)}" r="6.5" fill="#FFF4F8" stroke="#FF8FC0" stroke-width="1.6"/>`).join('')}<circle cx="${x}" cy="${y}" r="7.5" fill="#E8365C" stroke="#fff" stroke-width="1.6"/><circle cx="${x-2.5}" cy="${y-2.5}" r="1.6" fill="#fff"/></g>`;
      return fb(44,50)+fb(156,50)}
    case 'h_star':return [[44,50,-15],[156,50,15]].map(([x,y,r])=>`<g transform="rotate(${r} ${x} ${y})"><path d="${starPath(x,y,17)}" fill="#FF6FB2" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><path d="${starPath(x,y,7.5)}" fill="#FFC2DE"/></g>`).join('')+`<path d="${starPath(64,38,5)}" fill="#FFE27A"/><path d="${starPath(136,38,5)}" fill="#FFE27A"/>`;
    case 'h_dia':return [[44,50,-22],[156,50,22]].map(([x,y,r])=>`<g transform="rotate(${r} ${x} ${y})"><path d="${heartPath(x,y,17)}" fill="#FFE3F0" stroke="#FF8FC0" stroke-width="2.2"/><path d="M${x},${y-6} L${x-9},${y+3} L${x},${y+14} L${x+9},${y+3}Z" fill="#FFFFFF" opacity=".85"/><path d="M${x-15},${y-1} L${x+15},${y-1}" stroke="#FFB3D2" stroke-width="1.5"/>${sparkle(x+9,y-7,1.7)}</g>`).join('');
    case 'f_areum':return flower5(144,54,9,'#FFB3D2','#FFE3A8')+flower5(58,60,6,'#FFD6E8','#FFE3A8');
    case 'f_sappun':return `<path d="M44,86 Q100,56 156,86" stroke="#E4E8F4" stroke-width="3" fill="none"/><path d="M100,64 L92,74 L100,84 L108,74Z" fill="#7CC8FF" stroke="#fff" stroke-width="1.8"/>`;
    case 'f_ponny':return `<g transform="translate(144 54) rotate(18)"><path d="M0,0 L-24,-15 Q-28,0 -24,15Z" fill="#FF9CC9" stroke="#fff" stroke-width="2"/><path d="M0,0 L24,-15 Q28,0 24,15Z" fill="#A8E6CF" stroke="#fff" stroke-width="2"/><circle r="7" fill="#FFE27A" stroke="#fff" stroke-width="2"/></g>`;
    case 'tiara':return `<g transform="rotate(14 118 30)"><path d="M84,46 C86,30 92,22 98,30 C100,16 112,10 118,22 C124,10 136,16 138,30 C144,22 150,30 152,46 Q118,38 84,46Z" fill="#F4F4FA" stroke="#A9A9C2" stroke-width="2.5" stroke-linejoin="round"/><path d="M92,40 Q96,30 100,38 M136,38 Q140,30 144,40" stroke="#C9C9DA" stroke-width="2" fill="none"/><path d="${heartPath(118,32,8)}" fill="#FF4F98" stroke="#fff" stroke-width="1.6"/><circle cx="98" cy="30" r="2.4" fill="#fff" stroke="#A9A9C2"/><circle cx="138" cy="30" r="2.4" fill="#fff" stroke="#A9A9C2"/><circle cx="118" cy="18" r="2.6" fill="#fff" stroke="#A9A9C2"/></g>`;
    case 'crown':return `<path d="M62,50 L64,12 L84,32 L100,4 L116,32 L136,12 L138,50 Q100,40 62,50Z" fill="#FFD54F" stroke="#E0A200" stroke-width="3" stroke-linejoin="round"/><path d="${heartPath(100,34,9)}" fill="#FF3C80" stroke="#fff" stroke-width="1.5"/><circle cx="64" cy="12" r="4" fill="#FF8FC0"/><circle cx="136" cy="12" r="4" fill="#FF8FC0"/><circle cx="100" cy="5" r="4" fill="#8FD8FF"/>`;
    case 'f_drop':return `<g fill="#FFFFFF44" stroke="#4A7FD6" stroke-width="4"><circle cx="76" cy="110" r="19"/><circle cx="124" cy="110" r="19"/></g><path d="M95,106 Q100,101 105,106" stroke="#4A7FD6" stroke-width="4" fill="none"/><path d="${heartPath(140,92,4)}" fill="#FF8FC0"/>`;
    case 'f_bolt':return `<g transform="translate(142 52)"><path d="${starPath(0,0,15)}" fill="#FFE45C" stroke="#EE8600" stroke-width="2.5"/><path d="M-4,-18 C-2,-26 6,-28 8,-22" stroke="#FF8A00" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
    case 'f_leaf':return `${clover(144,52,15,'#7CC447','#3F8E1E')}${clover(58,58,10,'#9EDC55','#3F8E1E')}`;
    case 'f_note':return `<g transform="translate(144 54) rotate(14)" stroke="#7A4FD9" stroke-width="2.5"><path d="M0,0 L-22,-14 Q-26,0 -22,14Z" fill="#B69CFF"/><path d="M0,0 L22,-14 Q26,0 22,14Z" fill="#B69CFF"/></g><path d="${symbolPath('note',144,52,9)}" fill="#7A4FD9"/>`;
    case 'f_star':return `<path d="M46,80 Q100,4 154,80" stroke="#FFB65E" stroke-width="9" fill="none" stroke-linecap="round"/><g transform="translate(100 30)">${Array.from({length:8},(_,i)=>`<ellipse cx="${(Math.cos(i*Math.PI/4)*15).toFixed(1)}" cy="${(Math.sin(i*Math.PI/4)*15).toFixed(1)}" rx="8" ry="4.5" fill="#FFB65E" transform="rotate(${i*45} ${(Math.cos(i*Math.PI/4)*15).toFixed(1)} ${(Math.sin(i*Math.PI/4)*15).toFixed(1)})"/>`).join('')}<circle r="11" fill="#FFE45C" stroke="#EE8526" stroke-width="2"/></g>`;
  }
  return '';
}
function flowerArc(cols){
  let s='';
  for(let k=0;k<7;k++){const a=(-150+k*20)*Math.PI/180,x=100+64*Math.cos(a),y=100+64*Math.sin(a);
    s+=`<ellipse cx="${(x+6).toFixed(1)}" cy="${(y+5).toFixed(1)}" rx="5" ry="3" fill="#6CCB8C"/>`;
    for(let p=0;p<5;p++){const b=p*Math.PI*2/5;s+=`<circle cx="${(x+Math.cos(b)*5).toFixed(1)}" cy="${(y+Math.sin(b)*5).toFixed(1)}" r="4.5" fill="${cols[k]}"/>`}
    s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#fff"/>`}
  return s;
}
function handSVG(h){
  switch(h){
    case 'wand':return `<line x1="146" y1="188" x2="164" y2="144" stroke="#C98BFF" stroke-width="6" stroke-linecap="round"/><path d="${heartPath(166,134,13)}" fill="#FF5C9E" stroke="#fff" stroke-width="2.5"/>`;
    case 'mic':return `<line x1="146" y1="188" x2="160" y2="154" stroke="#9A8FB0" stroke-width="8" stroke-linecap="round"/><circle cx="163" cy="146" r="12" fill="#FF8FC0" stroke="#fff" stroke-width="3"/>`;
    case 'book':return `<g transform="rotate(-14 156 162)"><rect x="140" y="142" width="34" height="40" rx="5" fill="#6FA8FF" stroke="#3F7FE0" stroke-width="2.5"/><rect x="145" y="146" width="4" height="32" fill="#fff" opacity=".7"/><path d="${starPath(160,162,7)}" fill="#FFE27A"/></g>`;
    case 'bouquet':return `<path d="M148,190 L160,150 L176,160Z" fill="#9FE8D2" stroke="#4FBF9E" stroke-width="2.5"/><circle cx="160" cy="146" r="8" fill="#FF8FC0"/><circle cx="173" cy="152" r="7" fill="#FFE27A"/><circle cx="166" cy="137" r="7" fill="#B7A4FF"/>`;
    case 'heartmirror':return `<line x1="146" y1="190" x2="158" y2="160" stroke="#E8B400" stroke-width="6" stroke-linecap="round"/><path d="${heartPath(164,146,16)}" fill="#FFD54F" stroke="#E0A200" stroke-width="2.5"/><path d="${heartPath(164,147,10)}" fill="#DDF2FF"/><path d="M158,140 L163,135" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`;
    case 'jewel_heart':return `<path d="M138,150 Q156,178 174,150" stroke="#F2C230" stroke-width="2.6" fill="none" stroke-dasharray="3 2"/><path d="${heartPath(156,178,11)}" fill="#FF4F98" stroke="#fff" stroke-width="2"/><path d="M150,173 L154,169" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`;
    case 'rose':return `<path d="M146,192 Q152,170 160,152" stroke="#5DBB7A" stroke-width="4" fill="none"/><ellipse cx="152" cy="172" rx="6.5" ry="3.2" fill="#7CC447" transform="rotate(-40 152 172)"/><circle cx="162" cy="144" r="11.5" fill="#FF6FA8" stroke="#E0407F" stroke-width="2"/><path d="M162,144 m-5,0 a5,5 0 1 1 6,4 a3,3 0 1 1 -2,-4" stroke="#C8307E" stroke-width="2" fill="none"/>`;
    case 'flowerwand':return `<line x1="146" y1="190" x2="162" y2="148" stroke="#FFB3D2" stroke-width="6" stroke-linecap="round"/>${[0,72,144,216,288].map(a=>`<circle cx="${(166+Math.cos(a*Math.PI/180)*9).toFixed(1)}" cy="${(138+Math.sin(a*Math.PI/180)*9).toFixed(1)}" r="8" fill="#FF7FB6" stroke="#fff" stroke-width="1.6"/>`).join('')}<circle cx="166" cy="138" r="6" fill="#FFD54F"/>`;
    case 'starwand':return `<line x1="146" y1="188" x2="164" y2="146" stroke="#FFC94D" stroke-width="6" stroke-linecap="round"/><path d="${starPath(167,132,18)}" fill="#FFE27A" stroke="#E8A800" stroke-width="2.5"/>`;
    case 'brush':return `<line x1="146" y1="190" x2="164" y2="150" stroke="#C98B5A" stroke-width="6" stroke-linecap="round"/><rect x="159" y="141" width="10" height="9" rx="2" fill="#B9C2D0" transform="rotate(24 164 146)"/><path d="M163,142 Q168,122 178,124 Q178,138 170,146Z" fill="#FF6FA8" stroke="#fff" stroke-width="1.5"/>`;
    case 'teacup':return `<path d="M144,150 L172,150 Q170,170 158,172 Q146,170 144,150Z" fill="#fff" stroke="#E7A3C4" stroke-width="2.5"/><path d="M172,154 Q182,157 171,165" stroke="#E7A3C4" stroke-width="3" fill="none"/><path d="${heartPath(158,159,4)}" fill="#FF8FC0"/><ellipse cx="158" cy="174" rx="16" ry="4" fill="#fff" stroke="#E7A3C4" stroke-width="2"/>`;
    case 'balloon':return `<path d="M150,184 Q160,160 166,122" stroke="#9A8FB0" stroke-width="2" fill="none"/><path d="${heartPath(168,104,18)}" fill="#FF5C9E" stroke="#fff" stroke-width="2.5"/><ellipse cx="160" cy="98" rx="4" ry="6" fill="#fff" opacity=".6"/>`;
    case 'shield':return `<path d="M142,148 Q158,142 174,148 L172,170 Q166,182 158,188 Q150,182 144,170Z" fill="#9FC4FF" stroke="#4F7FD6" stroke-width="3"/><path d="${heartPath(158,166,8)}" fill="#FF5C9E"/>`;
    case 'pumpkin':return `<path d="M146,150 Q158,132 170,150" stroke="#8B5A2B" stroke-width="3" fill="none"/><ellipse cx="158" cy="166" rx="18" ry="14" fill="#FF9A3C" stroke="#D86A10" stroke-width="2.5"/><path d="M158,153 L158,180 M148,156 Q144,166 148,177 M168,156 Q172,166 168,177" stroke="#D86A10" stroke-width="1.5" fill="none"/><path d="M151,163 l3,-4 l3,4Z M161,163 l3,-4 l3,4Z" fill="#5A2E0A"/><path d="M151,170 Q158,175 165,170" stroke="#5A2E0A" stroke-width="2" fill="none"/>`;
  }
  return '';
}

/* ---------- 하츄핑 & 친구 (티니핑 비율: 큰 머리, 작은 몸) ---------- */
const CHARS = {
  hachu: {face:'#F9D3E5',line:'#E59BC0',hair:'#F47AB4',hair2:'#D9408C',eye:'#E2409A',blush:'#FF8FBE',lash:2,big:true},
  baro:  {face:'#CDEBFF',line:'#5AA6DE',hair:'#5DB4F2',hair2:'#2C82CE',eye:'#1C9A62',blush:'#FF9FC0'},
  aja:   {face:'#FFF08F',line:'#E8B22C',hair:'#FFB620',hair2:'#EE8600',eye:'#1F3486',blush:'#FF9F7A'},
  chacha:{face:'#F9F8CF',line:'#A2CC58',hair:'#9EDC55',hair2:'#5DAF2C',eye:'#1F6FD0',blush:'#FFA3B8',lash:true},
  lala:  {face:'#F3E8FF',line:'#A98BE2',hair:'#B48EFF',hair2:'#7B53DE',eye:'#6B3CCB',blush:'#FF9FCB',lash:true},
  hap:   {face:'#FFF2DD',line:'#EEA35C',hair:'#FFB65E',hair2:'#EE8526',eye:'#7A3F14',blush:'#FF9C8A'},
  baby:  {face:'#FFF3F8',line:'#F2A9C8',hair:'#FFC6DE',hair2:'#F49BC2',eye:'#C2477E',blush:'#FF9FC0'},
  areum: {face:'#FDE6F0',line:'#E89BC2',hair:'#FF9CCB',hair2:'#E86AA8',eye:'#8E4FD6',blush:'#FF9FC4',lash:2,big:true,dress:'d_areum'},
  sappun:{face:'#EEF2FF',line:'#97B2E6',hair:'#A6D6FF',hair2:'#6FA8E8',eye:'#2E86E0',blush:'#FFB0CC',lash:2,big:true,dress:'d_sappun'},
  ponny: {face:'#FFF3E6',line:'#E6B48A',hair:'#FFE27A',hair2:'#F59AC0',eye:'#1FA3A8',blush:'#FFA8B8',lash:2,big:true,dress:'d_ponny'},
};
const GRAY = {face:'#F1ECF5',line:'#CDBEDB',hair:'#DCD0E6',hair2:'#C2B2D2',eye:'#B8A8C8',blush:'#E6DCEE'};
const mirror = s=>`<g transform="translate(200 0) scale(-1 1)">${s}</g>`;
function clover(cx,cy,s,fill,stroke){let o='';for(let k=0;k<4;k++)o+=`<path d="${heartPath(cx,cy-s*.9,s*.62)}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" transform="rotate(${k*90+45} ${cx} ${cy})"/>`;return o+`<circle cx="${cx}" cy="${cy}" r="${s*.2}" fill="${stroke}"/>`}
function sparkle(x,y,r=3){return `<path d="M${x},${y-r*2} L${x+r*.5},${y-r*.5} L${x+r*2},${y} L${x+r*.5},${y+r*.5} L${x},${y+r*2} L${x-r*.5},${y+r*.5} L${x-r*2},${y} L${x-r*.5},${y-r*.5}Z" fill="#fff"/>`}

function flower5(x,y,r,petal,center){return `<g>${[0,72,144,216,288].map(a=>`<circle cx="${(x+Math.cos((a-90)*Math.PI/180)*r).toFixed(1)}" cy="${(y+Math.sin((a-90)*Math.PI/180)*r).toFixed(1)}" r="${(r*.85).toFixed(1)}" fill="${petal}" stroke="#fff" stroke-width="1.5"/>`).join('')}<circle cx="${x}" cy="${y}" r="${(r*.6).toFixed(1)}" fill="${center}" stroke="#fff" stroke-width="1.2"/></g>`}

/* 머리 뒤쪽에 오는 것들 (양갈래, 귀, 머리숱) */
function backFeat(who,c,stage,id){
  const L=c.line;
  switch(who){
    case 'hachu':{
      const glit=(x,y)=>[[-8,-6],[6,-9],[-2,4],[9,3],[-10,8],[3,12],[12,-2]].map(([a,b],i)=>`<circle cx="${x+a}" cy="${y+b}" r="${i%3?1:1.6}" fill="#fff" opacity=".85"/>`).join('');
      const tail=`<circle cx="40" cy="66" r="22" fill="url(#${id}t)" stroke="${L}" stroke-width="2.5"/>
        <path d="M30,74 C8,90 0,128 4,160 C6,176 10,186 16,194 L44,192 C40,174 38,146 42,120 C44,104 48,92 54,84Z" fill="url(#${id}t)" stroke="${L}" stroke-width="2.5"/>
        <path d="M14,110 C9,130 9,152 13,170" stroke="#fff" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/>
        <path d="M44,190 C46,212 26,226 8,220 C-8,214 -10,194 2,186 C12,180 24,188 18,198 C14,204 6,202 6,196" fill="url(#${id}g)" stroke="#C83C86" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M14,190 C24,184 34,190 38,200" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>${glit(18,204)}`;
      const tt=`<g transform="translate(6 -2)">${tail}</g>`;
      return tt+mirror(tt);
    }
    case 'baro':{
      const ear=`<path d="M46,80 C18,92 8,138 20,172 C28,182 42,176 46,160 C50,132 58,106 62,92Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/><path d="M30,112 C24,136 26,154 30,164" stroke="#fff" stroke-width="4" fill="none" opacity=".4" stroke-linecap="round"/>`;
      return ear+mirror(ear);
    }
    case 'aja':{
      const curl=`<circle cx="42" cy="62" r="22" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/><path d="M42,62 m-11,0 a11,11 0 1 1 12,10 a6,6 0 1 1 -4,-9" stroke="${c.hair2}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      return curl+mirror(curl)+`<path d="M124,198 C146,214 160,206 162,192" stroke="${L}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M124,198 C146,214 160,206 162,192" stroke="${c.face}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="${starPath(164,186,12)}" fill="${c.hair}" stroke="${c.hair2}" stroke-width="2"/>`;
    }
    case 'chacha':
      return `<path d="M30,104 C24,52 62,24 100,24 C138,24 176,52 170,104 C176,128 186,144 174,156 C162,164 150,152 152,136 L48,136 C50,152 38,164 26,156 C14,144 24,128 30,104Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/>
        <circle cx="30" cy="150" r="13" fill="${c.hair}" stroke="${L}" stroke-width="2"/><circle cx="170" cy="150" r="13" fill="${c.hair}" stroke="${L}" stroke-width="2"/>`;
    case 'lala':
      return `<path d="M126,40 C172,16 202,62 184,100 C174,122 186,146 200,146 C190,166 160,160 156,134 C152,108 170,82 142,64Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/><path d="M172,58 C182,76 176,92 170,104" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>
        <ellipse cx="38" cy="78" rx="12" ry="16" fill="${c.hair}" stroke="${L}" stroke-width="2.5" transform="rotate(-25 38 78)"/>`;
    case 'hap':{
      let s='';
      for(let k=0;k<12;k++){const a=k*30,x=100+Math.cos(a*Math.PI/180)*66,y=98+Math.sin(a*Math.PI/180)*60;
        s+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="13" ry="21" fill="${k%2?c.hair:'#FFD36B'}" stroke="${L}" stroke-width="2" transform="rotate(${a+90} ${x.toFixed(1)} ${y.toFixed(1)})"/>`}
      return s;
    }
    case 'areum':{
      const g=`<defs><linearGradient id="${id}a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c.hair}"/><stop offset=".68" stop-color="#FFB8D8"/><stop offset="1" stop-color="#FFE3A8"/></linearGradient></defs>`;
      return g+`<path d="M34,96 C18,130 16,178 28,206 C38,218 54,212 60,198 L140,198 C146,212 162,218 172,206 C184,178 182,130 166,96 C150,60 50,60 34,96Z" fill="url(#${id}a)" stroke="${L}" stroke-width="2.5"/>
        <path d="M26,140 C24,166 28,186 34,198 M174,140 C176,166 172,186 166,198" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>`;
    }
    case 'sappun':{
      const g=`<defs><linearGradient id="${id}s" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c.hair}"/><stop offset="1" stop-color="#F2F8FF"/></linearGradient></defs>`;
      const curl=`<circle cx="36" cy="80" r="21" fill="#FFFFFF" stroke="${L}" stroke-width="2.5"/><path d="M36,80 m-10,1 a10,10 0 1 1 11,8 a5.5,5.5 0 1 1 -3,-8" stroke="#BFD8F2" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      return g+`<path d="M36,100 C20,136 20,180 32,208 C42,218 56,212 62,198 L138,198 C144,212 158,218 168,208 C180,180 180,136 164,100 C150,64 50,64 36,100Z" fill="url(#${id}s)" stroke="${L}" stroke-width="2.5"/>`+curl+mirror(curl);
    }
    case 'ponny':{
      const g=`<defs><linearGradient id="${id}p" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#FF9CC9"/><stop offset=".3" stop-color="#FF9CC9"/><stop offset=".32" stop-color="#FFE27A"/><stop offset=".62" stop-color="#FFE27A"/><stop offset=".64" stop-color="#A8E6CF"/><stop offset=".9" stop-color="#A8E6CF"/><stop offset=".92" stop-color="#FFB8D8"/></linearGradient></defs>`;
      return g+`<path d="M128,40 C170,22 204,56 196,100 C190,128 170,140 178,170 C184,192 204,198 198,214 C184,226 158,212 156,186 C152,160 172,132 168,108 C164,84 150,66 132,62Z" fill="url(#${id}p)" stroke="${L}" stroke-width="2.5"/>
        <path d="M176,62 C188,80 184,100 176,114" stroke="#fff" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>
        <path d="M40,82 C26,104 26,132 36,150 C44,156 52,150 52,140 C48,124 50,104 58,90Z" fill="#FFE27A" stroke="${L}" stroke-width="2.5"/>`;
    }
    case 'baby':
      return `<ellipse cx="44" cy="70" rx="13" ry="17" fill="${c.hair}" stroke="${L}" stroke-width="2.5" transform="rotate(-30 44 70)"/><ellipse cx="156" cy="70" rx="13" ry="17" fill="${c.hair}" stroke="${L}" stroke-width="2.5" transform="rotate(30 156 70)"/>`;
  }
  return '';
}
/* 머리 앞쪽에 오는 것들 (앞머리, 장식) */
function frontFeat(who,c,id){
  const L=c.line;
  switch(who){
    case 'hachu':{
      const heart=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><path d="${heartPath(x,y,16)}" fill="url(#${id}g)" stroke="#fff" stroke-width="2.2"/><path d="M${x-10},${y-6} Q${x-7},${y-13} ${x-1},${y-10}" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"/>${[[4,-4],[-4,4],[8,4],[0,10],[-8,-1]].map(([a,b])=>`<circle cx="${x+a}" cy="${y+b}" r="1.1" fill="#fff" opacity=".9"/>`).join('')}</g>`;
      return `<path d="M46,78 C38,36 70,14 102,14 C138,14 164,38 156,78 C146,60 128,52 112,54 C104,56 98,60 92,66 C80,62 60,64 46,78Z" fill="url(#${id}h)" stroke="${L}" stroke-width="2.5"/>
        <path d="M106,22 C130,22 148,36 154,56" stroke="#fff" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>
        <g transform="translate(95 74) scale(1.25) translate(-95 -74)"><path d="M94,58 C110,52 116,66 110,78 C104,90 86,92 80,82 C74,72 84,62 92,68 C98,72 96,80 90,80" fill="url(#${id}h)" stroke="${L}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M92,68 C98,72 96,80 90,80" stroke="${c.hair2}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M97,60 C106,58 110,64 108,70" stroke="#fff" stroke-width="2.6" fill="none" opacity=".55" stroke-linecap="round"/></g>
        ${heart(44,52,-24)}${heart(156,52,24)}`;
    }
    case 'baro':
      return `<g transform="translate(124 34) rotate(14)" stroke="${L}" stroke-width="2.5"><path d="M0,0 C-20,-28 -50,-12 -40,10 C-32,24 -10,14 0,0Z" fill="${c.hair2}"/><path d="M0,0 C20,-28 50,-12 40,10 C32,24 10,14 0,0Z" fill="${c.hair2}"/><circle r="8" fill="${c.hair}"/></g>
        <g fill="#fff" stroke="#C9DCF0" stroke-width="2"><circle cx="86" cy="54" r="13"/><circle cx="102" cy="46" r="15"/><circle cx="118" cy="54" r="12"/><circle cx="101" cy="60" r="12"/></g>`;
    case 'aja':
      return `<path d="M72,50 C64,22 86,4 104,12 C96,22 104,32 114,24 C130,14 142,32 132,50 C118,42 88,42 72,50Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/>
        <path d="M90,20 C96,30 106,32 112,26" stroke="#FFE27A" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="${starPath(132,22,9)}" fill="#FFE45C" stroke="${c.hair2}" stroke-width="2"/>`;
    case 'chacha':
      return `<path d="M42,88 C42,52 70,34 100,34 C130,34 158,52 158,88 C148,74 138,66 124,68 C118,78 108,80 100,72 C92,80 82,78 76,68 C62,66 52,74 42,88Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/>
        <path d="M60,56 C70,44 84,40 96,40" stroke="#fff" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>
        ${clover(68,30,14,c.hair2,'#3F8E1E')}${clover(134,26,14,c.hair2,'#3F8E1E')}`;
    case 'lala':
      return `<path d="M42,84 C44,48 74,30 102,32 C132,34 158,52 158,84 C148,68 130,60 112,64 C104,72 90,74 80,64 C64,64 50,72 42,84Z" fill="${c.hair}" stroke="${L}" stroke-width="2.5"/>
        <path d="${symbolPath('note',134,36,12)}" fill="#FFE27A" stroke="${c.hair2}" stroke-width="2"/>`;
    case 'hap':
      return `<g fill="${c.hair}" stroke="${L}" stroke-width="2"><circle cx="84" cy="46" r="10"/><circle cx="100" cy="40" r="11"/><circle cx="116" cy="46" r="10"/></g><circle cx="100" cy="24" r="10" fill="#FFE45C" stroke="${c.hair2}" stroke-width="2"/>${[0,60,120,180,240,300].map(a=>`<line x1="${100+Math.cos(a*Math.PI/180)*13}" y1="${24+Math.sin(a*Math.PI/180)*13}" x2="${100+Math.cos(a*Math.PI/180)*18}" y2="${24+Math.sin(a*Math.PI/180)*18}" stroke="${c.hair2}" stroke-width="3" stroke-linecap="round"/>`).join('')}`;
    case 'areum':
      return `<path d="M38,96 C34,54 66,28 100,28 C134,28 166,54 162,96 C152,76 136,64 118,66 C110,76 92,78 84,68 C66,66 48,78 38,96Z" fill="url(#${id}h)" stroke="${L}" stroke-width="2.5"/>
        <path d="M60,54 C74,42 90,38 104,40" stroke="#FFE9B8" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>
        <path d="M70,40 L76,12 L88,28 L100,4 L112,28 L124,12 L130,40 Q100,32 70,40Z" fill="#FFC2DE" stroke="#E86AA8" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="${heartPath(100,26,7)}" fill="#FF4F98" stroke="#fff" stroke-width="1.5"/><circle cx="76" cy="14" r="3" fill="#fff"/><circle cx="124" cy="14" r="3" fill="#fff"/>
        ${flower5(152,66,8,'#FFD6E8','#FFB3D2')}`;
    case 'sappun':
      return `<path d="M40,94 C36,54 68,30 100,30 C132,30 164,54 160,94 C150,74 134,64 116,66 C108,74 92,76 84,66 C66,64 50,76 40,94Z" fill="url(#${id}h)" stroke="${L}" stroke-width="2.5"/>
        <path d="M62,52 C76,40 92,36 106,38" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>
        <path d="M78,36 L84,16 L92,28 L100,8 L108,28 L116,16 L122,36 Q100,30 78,36Z" fill="#F4F4FA" stroke="#A9A9C2" stroke-width="2.2" stroke-linejoin="round"/><path d="${heartPath(100,24,5)}" fill="#FF6FB2"/>
        <path d="M100,72 L94,80 L100,88 L106,80Z" fill="#7CC8FF" stroke="#fff" stroke-width="1.6"/>`;
    case 'ponny':
      return `<path d="M38,96 C34,54 66,28 100,28 C134,28 166,54 162,96 C152,76 136,64 118,66 C110,76 92,78 84,68 C66,66 48,78 38,96Z" fill="#FFE27A" stroke="${L}" stroke-width="2.5"/>
        <path d="M50,72 C60,48 82,38 100,38" stroke="#FF9CC9" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M108,38 C130,40 146,54 152,74" stroke="#A8E6CF" stroke-width="9" fill="none" stroke-linecap="round"/>
        <g transform="rotate(18 124 26)"><path d="M108,34 L112,18 L119,26 L124,12 L129,26 L136,18 L140,34 Q124,29 108,34Z" fill="#F4F4FA" stroke="#A9A9C2" stroke-width="2" stroke-linejoin="round"/><path d="${heartPath(124,24,4.5)}" fill="#FF6FB2"/></g>`;
    case 'baby':
      return `<path d="M96,40 C92,26 104,18 112,26 C116,32 108,38 104,34" stroke="${c.hair2}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  }
  return '';
}
/* 친구들이 늘 들고 있는 물건 */
function propSVG(who,c){
  switch(who){
    case 'chacha':return `<g transform="translate(4 6)"><path d="M140,170 L164,170 L162,194 L142,194Z" fill="#9FD8F5" stroke="#4F9FD0" stroke-width="2.5"/><path d="M164,176 L180,164" stroke="#4F9FD0" stroke-width="4" stroke-linecap="round"/><path d="M144,170 Q152,156 160,170" stroke="#4F9FD0" stroke-width="2.5" fill="none"/>${clover(152,183,5,'#7CC447','#3F8E1E')}</g>`;
    case 'lala':return handSVG('mic');
    case 'areum':return handSVG('bouquet');
    case 'ponny':return handSVG('balloon');
    case 'sappun':return `<line x1="146" y1="190" x2="162" y2="146" stroke="#C9D8F0" stroke-width="5" stroke-linecap="round"/><path d="M162,146 C182,140 170,166 186,168 C172,176 162,160 152,170" stroke="#7CC8FF" stroke-width="4" fill="none" stroke-linecap="round"/><path d="${starPath(163,142,7)}" fill="#FFE27A"/>`;
    case 'baro':return handSVG('book');
    case 'hap':return `<g transform="translate(-6 6)"><line x1="146" y1="190" x2="158" y2="150" stroke="#5DBB7A" stroke-width="4"/>${Array.from({length:10},(_,i)=>{const a=i*36*Math.PI/180;return `<ellipse cx="${(160+Math.cos(a)*10).toFixed(1)}" cy="${(140+Math.sin(a)*10).toFixed(1)}" rx="6" ry="3.5" fill="#FFD54F" transform="rotate(${i*36} ${(160+Math.cos(a)*10).toFixed(1)} ${(140+Math.sin(a)*10).toFixed(1)})"/>`}).join('')}<circle cx="160" cy="140" r="6" fill="#8B5A2B"/></g>`;
  }
  return '';
}
function eyePair(c,id,face){
  if(face==='sleepy'||face==='blink')return `<g stroke="#3B2350" stroke-width="4" fill="none" stroke-linecap="round"><path d="M64,112 Q76,121 88,112"/><path d="M112,112 Q124,121 136,112"/></g>`;
  if(face==='happy')return `<g stroke="#3B2350" stroke-width="4.5" fill="none" stroke-linecap="round"><path d="M64,114 Q76,99 88,114"/><path d="M112,114 Q124,99 136,114"/></g>`;
  const one=(cx,side)=>`<ellipse cx="${cx}" cy="110" rx="13.5" ry="16.5" fill="url(#${id}e)"/>
    <ellipse cx="${cx}" cy="112" rx="7.5" ry="9.5" fill="#1D0F2E" opacity=".8"/>
    <ellipse cx="${cx}" cy="120" rx="7.5" ry="4" fill="#fff" opacity=".3"/>
    <circle cx="${cx-4.5}" cy="103" r="5.2" fill="#fff"/><circle cx="${cx+5}" cy="115" r="2.4" fill="#fff"/>
    <path d="M${cx-13.5},106 A13.5,16.5 0 0 1 ${cx+13.5},106" stroke="#3B2350" stroke-width="2.6" fill="none"/>
    ${c.lash===2?`<path d="M${cx-13.5},106 A13.5,16.5 0 0 1 ${cx+13.5},106" stroke="#3B2350" stroke-width="3.6" fill="none"/><path d="M${cx+side*9},96 l${side*5},-7 M${cx+side*12.5},100 l${side*7},-4 M${cx+side*14},106 l${side*7},0" stroke="#3B2350" stroke-width="2.6" stroke-linecap="round"/>`:c.lash?`<path d="M${cx+side*11},97 l${side*6},-5 M${cx+side*13.5},103 l${side*7},-2" stroke="#3B2350" stroke-width="2.6" stroke-linecap="round"/>`:''}`;
  if(c.big){
    const big=(cx,side)=>`<ellipse cx="${cx}" cy="112" rx="17" ry="19" fill="#fff"/><ellipse cx="${cx}" cy="113" rx="15" ry="17" fill="url(#${id}e)"/>
      <ellipse cx="${cx}" cy="114" rx="8.5" ry="10" fill="#4A0A2E" opacity=".85"/><ellipse cx="${cx}" cy="123" rx="9" ry="4.5" fill="#FF9AD0" opacity=".55"/>
      <ellipse cx="${cx-5}" cy="104" rx="6" ry="7.5" fill="#fff"/><circle cx="${cx+6}" cy="120" r="2.8" fill="#fff"/>
      <ellipse cx="${cx}" cy="112" rx="17" ry="19" fill="none" stroke="#3A1630" stroke-width="3.2"/>
      <path d="M${cx+side*13},${98} l${side*5},-6 M${cx+side*16},${104} l${side*7},-3 M${cx+side*17.5},${111} l${side*7},0 M${cx+side*12},${127} l${side*4},4" stroke="#3A1630" stroke-width="2.4" stroke-linecap="round"/>`;
    const brows=`<path d="M60,86 Q70,80 82,84 M118,84 Q130,80 140,86" stroke="#E07BB0" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    if(face==='sad')return `<g>${big(74,-1)}${big(126,1)}</g><path d="M60,84 L82,90 M140,84 L118,90" stroke="#E07BB0" stroke-width="2.6" stroke-linecap="round"/>`;
    return brows+`<g class="eyes" style="animation-delay:-${(Math.random()*4).toFixed(2)}s">${big(74,-1)}${big(126,1)}</g>`;
  }
  if(face==='sad')return `<g>${one(76,-1)}${one(124,1)}</g><g stroke="#3B2350" stroke-width="3" stroke-linecap="round"><path d="M64,88 L86,93"/><path d="M136,88 L114,93"/></g>`;
  return `<g class="eyes" style="animation-delay:-${(Math.random()*4).toFixed(2)}s">${one(76,-1)}${one(124,1)}</g>`;
}
function imgPing(who,o){
  const face=o.face||(o.sleepy?'sleepy':''), mark={sleepy:'💤',happy:'✨',sad:'💧'}[face];
  return `<svg viewBox="-14 -14 228 258" class="ping custom" aria-hidden="true"><ellipse cx="100" cy="230" rx="50" ry="7" fill="#4A2B5C" opacity=".12"/><image href="${CHAR_IMG[who]}" x="-12" y="-12" width="224" height="244" preserveAspectRatio="xMidYMax meet"${o.gray?' style="filter:grayscale(1) brightness(1.5) opacity(.45)"':''}/>${!o.gray&&mark?`<text x="160" y="34" font-size="32">${mark}</text>`:''}</svg>`;
}
function vecPing(o={}){
  const id='hp'+(uid++), who=o.who||'hachu', c=o.gray?GRAY:(CHARS[who]||CHARS.hachu);
  const stage=o.stage??2, of=o.outfit||{}, face=o.face||(o.sleepy?'sleepy':''), L=c.line;
  let s=`<svg viewBox="-14 -14 228 258" class="ping" aria-hidden="true"><defs>
    <linearGradient id="${id}r" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FF9AA2"/><stop offset=".25" stop-color="#FFD39A"/><stop offset=".5" stop-color="#FFF3A0"/><stop offset=".75" stop-color="#A8E6CF"/><stop offset="1" stop-color="#A9C7FF"/></linearGradient>
    <linearGradient id="${id}e" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2A1240"/><stop offset="1" stop-color="${c.eye}"/></linearGradient>
    <linearGradient id="${id}t" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#F3BCD6"/><stop offset=".55" stop-color="#FBDCEA"/><stop offset="1" stop-color="#F2B8D3"/></linearGradient>
    <radialGradient id="${id}g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FF8CC4"/><stop offset=".6" stop-color="#EA4E9C"/><stop offset="1" stop-color="#C8307E"/></radialGradient>
    <linearGradient id="${id}h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFC2DE"/><stop offset=".45" stop-color="${c.hair}"/><stop offset="1" stop-color="${c.hair2}"/></linearGradient>
    <radialGradient id="${id}f" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="${c.face}"/><stop offset="1" stop-color="${c.face}"/></radialGradient></defs>`;
  s+=`<ellipse cx="100" cy="226" rx="44" ry="7" fill="#4A2B5C" opacity=".12"/>`;
  s+=backFeat(who,c,stage,id);
  if(false&&who==='hachu'&&stage>=1){const w=8+stage*5;s+=`<g class="wings" fill="#fff" stroke="${L}" stroke-width="2"><path d="${heartPath(70-w*.4,170,w)}" transform="rotate(-50 ${70-w*.4} 170)"/><path d="${heartPath(130+w*.4,170,w)}" transform="rotate(50 ${130+w*.4} 170)"/></g>`}
  s+=`<g fill="${c.face}" stroke="${L}" stroke-width="2.5"><ellipse cx="88" cy="211" rx="11" ry="7"/><ellipse cx="112" cy="211" rx="11" ry="7"/><ellipse cx="100" cy="185" rx="31" ry="27"/></g>`;
  const dr=of.dress||c.dress;
  if(dr&&(ITEM[dr]||dr===c.dress))s+=`<g transform="translate(100 158) scale(.8 .92) translate(-100 -158)">${dressSVG(dr,id)}</g>`;
  else if(!o.gray&&who!=='baby')s+=`<path d="M91,172 L93,163 L97.5,168 L100,160 L102.5,168 L107,163 L109,172Z" fill="#FFD54F" stroke="#E0A200" stroke-width="1.4" stroke-linejoin="round"/>`;
  s+=`<g fill="${c.face}" stroke="${L}" stroke-width="2.5"><ellipse cx="72" cy="184" rx="8" ry="12" transform="rotate(35 72 184)"/><ellipse cx="128" cy="184" rx="8" ry="12" transform="rotate(-35 128 184)"/></g>`;
  if(of.hand)s+=`<g transform="translate(-8 6)">${handSVG(of.hand)}</g>`;
  else if(o.prop&&!o.gray)s+=propSVG(who,c);
  s+=`<ellipse cx="100" cy="98" rx="66" ry="60" fill="url(#${id}f)" stroke="${L}" stroke-width="2.5"/>`;
  s+=frontFeat(who,c,id);
  s+=eyePair(c,id,face);
  if(who==='baro'&&face!=='happy'&&face!=='sleepy')s+=`<g fill="#FFFFFF33" stroke="#34488A" stroke-width="3.5"><circle cx="76" cy="110" r="19"/><circle cx="124" cy="110" r="19"/></g><path d="M95,106 Q100,101 105,106" stroke="#34488A" stroke-width="3.5" fill="none"/>`;
  s+=`<g fill="${c.blush}" opacity=".5"><ellipse cx="54" cy="128" rx="10" ry="6"/><ellipse cx="146" cy="128" rx="10" ry="6"/></g>`;
  if(face==='sleepy')s+=`<ellipse cx="100" cy="134" rx="3.5" ry="3" fill="#3B2350"/>`;
  else if(face==='happy')s+=`<path d="M91,128 Q100,145 109,128Z" fill="#FF7FA8" stroke="#3B2350" stroke-width="2.6" stroke-linejoin="round"/>`;
  else if(face==='sad')s+=`<path d="M93,137 Q100,131 107,137" stroke="#3B2350" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  else if(c.big)s+=`<path d="M89,132 Q100,152 113,132 Q101,137 89,132Z" fill="#D9445F" stroke="#3A1630" stroke-width="2.4" stroke-linejoin="round"/><ellipse cx="101" cy="142" rx="6" ry="3.5" fill="#FF8FA0"/>`;
  else s+=`<path d="M93,130 Q96.5,135 100,131 Q103.5,135 107,130" stroke="#3B2350" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(c.big&&face!=='sleepy')s+=`<circle cx="100" cy="127" r="1.7" fill="#5A2A44"/>`;
  if(of.head)s+=headSVG(of.head);
  return s+'</svg>';
}

/* ---------- 도트 그림 변환 ----------
   벡터 그림을 4배 크기로 그린 다음, 4×4 칸마다 가장 많은 색 하나만 남겨 88칸 도트로 만들어요.
   아주 어두운 색은 캐릭터 선 색으로, 거의 흰색은 흰색으로 정리하고 바깥에 1픽셀 테두리를 둘러요. */
const PX_W = 88, PX_H = Math.round(88*258/228);
const PX = {url:new Map(), id:new Map(), wait:new Map(), n:0};
const PX_OUT = {areum:'#A3346E',sappun:'#3E6AAE',ponny:'#B0687A',hachu:'#8E2A62',baro:'#1E5C96',aja:'#9A5600',chacha:'#3C7A1C',lala:'#4F2FA0',hap:'#A2520E',baby:'#B0577F'};
const hexRGB = h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
function pxKeyOf(o){return JSON.stringify([o.who||'hachu',o.stage??2,o.outfit||{},o.face||(o.sleepy?'sleepy':''),!!o.gray,!!o.prop])}
function pxIdOf(k){let i=PX.id.get(k);if(!i){i='px'+(++PX.n);PX.id.set(k,i)}return i}
async function pxRender(svg,who,gray){
  const img=new Image();
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));
  await img.decode();
  const W=PX_W, H=PX_H, K=4, BW=W*K, big=document.createElement('canvas');
  big.width=BW; big.height=H*K;
  const bg=big.getContext('2d'); bg.drawImage(img,0,0,BW,H*K);
  const src=bg.getImageData(0,0,BW,H*K).data, out=new ImageData(W,H), o=out.data;
  const q=v=>Math.min(255,Math.round(v/17)*17), counts=new Map();
  const line=hexRGB(gray?'#B8A8C8':(PX_OUT[who]||'#6B2A55')), deep=line.map(v=>v*.55|0);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    counts.clear(); let opaque=0;
    for(let dy=0;dy<K;dy++)for(let dx=0;dx<K;dx++){
      const i=((y*K+dy)*BW+(x*K+dx))*4;
      if(src[i+3]<110)continue;
      opaque++; const c=(q(src[i])<<16)|(q(src[i+1])<<8)|q(src[i+2]);
      counts.set(c,(counts.get(c)||0)+1);
    }
    const j=(y*W+x)*4;
    if(opaque<7){o[j+3]=0;continue}
    let best=0,bc=-1; for(const [c,n] of counts)if(n>bc){bc=n;best=c}
    let r=best>>16&255, g=best>>8&255, b=best&255;
    const lum=.3*r+.59*g+.11*b, spread=Math.max(r,g,b)-Math.min(r,g,b);
    if(lum<62)[r,g,b]=deep;
    else if(lum>232&&spread<28)r=g=b=255;
    o[j]=r;o[j+1]=g;o[j+2]=b;o[j+3]=255;
  }
  const solid=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&o[(y*W+x)*4+3]===255, edge=[];
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(o[(y*W+x)*4+3])continue;if(solid(x+1,y)||solid(x-1,y)||solid(x,y+1)||solid(x,y-1))edge.push((y*W+x)*4)}
  edge.forEach(j=>{o[j]=line[0];o[j+1]=line[1];o[j+2]=line[2];o[j+3]=255});
  const c=document.createElement('canvas'); c.width=W; c.height=H; c.getContext('2d').putImageData(out,0,0);
  return c.toDataURL();
}
function pxImg(id,u,bk){return `<img class="ping px" src="${u}" alt="" draggable="false" data-pk="${id}"${bk?` data-bk="${bk}"`:''}>`}
function pxQueue(id,o,bk){
  if(PX.wait.has(id))return PX.wait.get(id);
  const p=pxRender(vecPing(o),o.who||'hachu',o.gray).then(u=>{
    PX.url.set(id,u);
    document.querySelectorAll(`svg[data-pk="${id}"]`).forEach(el=>{const t=document.createElement('template');t.innerHTML=pxImg(id,u,el.dataset.bk);el.replaceWith(t.content.firstChild)});
    return u;
  }).catch(()=>null);
  PX.wait.set(id,p); return p;
}
function pxWarm(list){return Promise.all(list.map(o=>{const id=pxIdOf(pxKeyOf(o));return PX.url.has(id)?null:pxQueue(id,o)}))}
/* ---------- 원작 참고 그림으로 만든 도트 (tools/make_sprites.py, 이 PC에서만) ---------- */
const SPR = window.HPM_CHARS || {};
function sprKey(o){
  const who=o.who||'hachu';
  if(who!=='hachu')return SPR[who]?who:null;
  const of=o.outfit||{};
  const F=FORMS.find(F=>F.parts.head===(of.head||null)&&F.parts.dress===(of.dress||null)&&F.parts.hand===(of.hand||null));
  if(F&&SPR['hachu_'+F.id])return 'hachu_'+F.id;
  if((of.dress==='d_hachu'||!of.dress)&&!of.head&&!of.hand&&SPR.hachu)return 'hachu';
  return null;
}
function sprPing(k,o){
  const face=o.face||(o.sleepy?'sleepy':''), mark={sleepy:'💤',happy:'✨',sad:'💧'}[face];
  return `<svg viewBox="-14 -14 228 258" class="ping spr" aria-hidden="true"><image href="assets/characters/${SPR[k]}" x="-14" y="-14" width="228" height="258" preserveAspectRatio="xMidYMax meet" style="image-rendering:pixelated${o.gray?';filter:grayscale(1) brightness(1.5) opacity(.45)':''}"/>${!o.gray&&mark?`<text x="164" y="34" font-size="30">${mark}</text>`:''}</svg>`;
}
function ping(o={}){
  const who=o.who||'hachu';
  if(CFG.charImg&&CHAR_IMG[who])return imgPing(who,o);
  if(CFG.refSprite!==false&&CFG.pixel!==false){const k=sprKey(o);if(k)return sprPing(k,o)}
  if(CFG.pixel===false)return vecPing(o);
  const id=pxIdOf(pxKeyOf(o)), face=o.face||(o.sleepy?'sleepy':'');
  let bk='';
  if(face===''&&!o.gray){const bo={...o,face:'blink',sleepy:false};bk=pxIdOf(pxKeyOf(bo));if(!PX.url.has(bk))pxQueue(bk,bo)}
  const u=PX.url.get(id);
  if(u)return pxImg(id,u,bk);
  pxQueue(id,o);
  return vecPing(o).replace('<svg ',`<svg data-pk="${id}"${bk?` data-bk="${bk}"`:''} `);
}
/* 도트 캐릭터 눈 깜빡임 */
setInterval(()=>{
  if(CFG.pixel===false)return;
  document.querySelectorAll('img.px[data-bk]').forEach(img=>{
    if(Math.random()<.4)return;
    const bu=PX.url.get(img.dataset.bk); if(!bu)return;
    const orig=img.getAttribute('src');
    setTimeout(()=>{img.src=bu;setTimeout(()=>{if(img.getAttribute('src')===bu)img.src=orig},140)},Math.random()*900);
  });
},3400);

function heroPing(x={}){return ping({stage:stageOf(),outfit:meta.outfit,...x})}
function friendPing(f,x={}){return ping({who:f.id,stage:1,prop:true,...x})}
function shadowPing(f){return ping({who:f.id,gray:true,stage:1})}
function babyPing(face=''){return ping({who:'baby',stage:0,face})}
function onlyItem(id){const it=ITEM[id];return ping({stage:1,outfit:{[it.slot]:id}})}
function portrait(who,face=''){
  if(who==='hachu')return ping({stage:stageOf(),outfit:{head:meta.outfit.head},face});
  const f=FR[who];return f?ping({who:f.id,stage:1,face}):'';
}

/* ---------- 가구 ---------- */
function furnSVG(id){
  const svg=(vb,inner)=>`<svg viewBox="${vb}" class="furn-svg" aria-hidden="true">${inner}</svg>`;
  switch(id){
    case 'bed_basic':case 'bed_pink':case 'bed_star':case 'bed_cloud':{
      const P={bed_basic:['#E8C9A8','#C99A6E','#FFFFFF','#D9C2D2'],bed_pink:['#FF9CC7','#E0558F','#FFC6DD','#E0558F'],bed_star:['#6E62C8','#4B3FA0','#CFC6FF','#7F6FD8'],bed_cloud:['#FFFFFF','#9DB7E8','#CFE6FF','#86A9E0']}[id];
      let head=`<rect x="8" y="40" width="46" height="132" rx="20" fill="${P[0]}" stroke="${P[1]}" stroke-width="4"/>`;
      if(id==='bed_pink')head=`<path d="${heartPath(36,62,34)}" fill="${P[0]}" stroke="${P[1]}" stroke-width="4"/><rect x="14" y="70" width="40" height="102" rx="10" fill="${P[0]}" stroke="${P[1]}" stroke-width="4"/>`;
      if(id==='bed_cloud')head=`<g fill="#fff" stroke="${P[1]}" stroke-width="4"><circle cx="30" cy="62" r="24"/><circle cx="44" cy="40" r="20"/><rect x="10" y="60" width="46" height="112" rx="16"/></g>`;
      let pat='';
      if(id==='bed_pink')pat=[[130,112],[176,122],[214,108]].map(([x,y])=>`<path d="${heartPath(x,y,7)}" fill="#FF7FB3"/>`).join('');
      if(id==='bed_star')pat=[[130,112],[176,122],[214,108]].map(([x,y])=>`<path d="${starPath(x,y,8)}" fill="#FFE27A"/>`).join('')+`<path d="${starPath(30,70,10)}" fill="#FFE27A"/><path d="${starPath(36,110,7)}" fill="#FFE27A"/>`;
      if(id==='bed_cloud')pat=`<g fill="#fff" opacity=".8"><circle cx="140" cy="116" r="8"/><circle cx="150" cy="112" r="9"/><circle cx="160" cy="116" r="8"/></g>`;
      return svg('0 0 260 190',`${head}<rect x="226" y="96" width="24" height="76" rx="10" fill="${P[0]}" stroke="${P[1]}" stroke-width="4"/><rect x="40" y="104" width="204" height="30" rx="12" fill="#fff" stroke="#E5D3EC" stroke-width="3"/><ellipse cx="82" cy="100" rx="28" ry="15" fill="#fff" stroke="#E5D3EC" stroke-width="3"/><path d="M104,96 Q170,84 238,98 L240,138 Q170,146 102,138Z" fill="${P[2]}" stroke="${P[3]}" stroke-width="3"/>${pat}<rect x="22" y="168" width="10" height="16" rx="3" fill="${P[1]}"/><rect x="232" y="168" width="10" height="16" rx="3" fill="${P[1]}"/>`);
    }
    case 'wall_garland':{let s=`<path d="M10,14 Q220,70 430,14" stroke="#C98B5A" stroke-width="3" fill="none"/>`;for(let i=0;i<9;i++){const x=30+i*48,y=14+56*Math.sin(Math.PI*(x-10)/420)*.75;s+=`<path d="${heartPath(x,y+16,13)}" fill="${['#FF8FC0','#FFD54F','#B7A4FF'][i%3]}" stroke="#fff" stroke-width="2"/>`}return svg('0 0 440 80',s)}
    case 'wall_stars':{let s=`<path d="M10,14 Q220,70 430,14" stroke="#7A6B8C" stroke-width="2.5" fill="none"/>`;for(let i=0;i<10;i++){const x=24+i*44,y=14+56*Math.sin(Math.PI*(x-10)/420)*.75;s+=`<circle cx="${x}" cy="${y+12}" r="9" fill="#FFF3A0" opacity=".55"/><path d="${starPath(x,y+12,8)}" fill="${['#FFE27A','#FFB3D2','#A8D8FF'][i%3]}"/>`}return svg('0 0 440 80',s)}
    case 'wall_rainbow':return svg('0 0 440 80',['#FF9AA2','#FFD39A','#FFF3A0','#A8E6CF','#A9C7FF'].map((c,i)=>`<path d="M${120+i*10},78 A${100-i*10},${66-i*10} 0 0 1 ${320-i*10},78" stroke="${c}" stroke-width="10" fill="none"/>`).join('')+`<g fill="#fff"><circle cx="112" cy="70" r="14"/><circle cx="128" cy="66" r="12"/><circle cx="312" cy="70" r="14"/><circle cx="328" cy="66" r="12"/></g>`);
    case 'rug_basic':return svg('0 0 320 70',`<ellipse cx="160" cy="35" rx="156" ry="31" fill="#F1E3FA" stroke="#D9C2EC" stroke-width="4"/><ellipse cx="160" cy="35" rx="124" ry="22" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="10 8"/>`);
    case 'rug_heart':return svg('0 0 320 70',`<ellipse cx="160" cy="35" rx="156" ry="31" fill="#FFC6DD" stroke="#FF8FC0" stroke-width="4"/><path d="${heartPath(160,36,18)}" fill="#FF5C9E" transform="matrix(1 0 0 .55 0 16)"/><ellipse cx="160" cy="35" rx="130" ry="24" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 8"/>`);
    case 'rug_flower':{let s=`<ellipse cx="160" cy="35" rx="156" ry="31" fill="#CDEFC4" stroke="#8ED39B" stroke-width="4"/>`;for(let p=0;p<8;p++){const a=p*Math.PI/4;s+=`<ellipse cx="${160+Math.cos(a)*60}" cy="${35+Math.sin(a)*14}" rx="26" ry="9" fill="${p%2?'#FFE27A':'#FF9CC7'}"/>`}return svg('0 0 320 70',s+`<ellipse cx="160" cy="35" rx="24" ry="9" fill="#fff"/>`)}
    case 'rug_cloud':return svg('0 0 320 70',`<g fill="#DCEBFF" stroke="#9DB7E8" stroke-width="4"><ellipse cx="160" cy="38" rx="150" ry="28"/></g><g fill="#fff"><circle cx="90" cy="30" r="14"/><circle cx="110" cy="26" r="16"/><circle cx="130" cy="32" r="12"/><circle cx="200" cy="40" r="12"/><circle cx="218" cy="34" r="15"/><circle cx="236" cy="40" r="11"/></g>`);
    case 'shelf_book':{let s=`<rect x="6" y="6" width="158" height="218" rx="12" fill="#E8C9A8" stroke="#C99A6E" stroke-width="5"/>`;
      [60,120,180].forEach(y=>s+=`<rect x="12" y="${y}" width="146" height="8" fill="#C99A6E"/>`);
      const cols=['#FF8FC0','#6FB8FF','#FFD54F','#7FD9C0','#B69CFF','#FF9A5C'];
      [[18,14],[18,74],[18,134]].forEach(([x0,y0],r)=>{let x=x0;for(let i=0;i<6;i++){const w=14+((i*5+r*3)%8),h=36+((i*7+r)%9);s+=`<rect x="${x}" y="${y0+46-h}" width="${w}" height="${h}" rx="3" fill="${cols[(i+r)%6]}"/>`;x+=w+4;if(x>140)break}});
      return svg('0 0 170 230',s+`<text x="85" y="216" font-size="26" text-anchor="middle">🌙</text>`)}
    case 'shelf_toy':{let s=`<rect x="6" y="6" width="158" height="218" rx="12" fill="#FFE3EE" stroke="#FF9CC7" stroke-width="5"/>`;
      [70,140].forEach(y=>s+=`<rect x="12" y="${y}" width="146" height="8" fill="#FF9CC7"/>`);
      s+=`<text x="48" y="60" font-size="40" text-anchor="middle">🧸</text><text x="118" y="60" font-size="40" text-anchor="middle">🎀</text><text x="48" y="130" font-size="40" text-anchor="middle">🐰</text><text x="118" y="130" font-size="40" text-anchor="middle">🦄</text><text x="85" y="205" font-size="44" text-anchor="middle">🏰</text>`;
      return svg('0 0 170 230',s)}
    case 'lamp_moon':return svg('0 0 80 260',`<circle cx="40" cy="44" r="40" fill="#FFF3A0" opacity=".35"/><path d="M52,14 A30,30 0 1 0 52,74 A24,24 0 1 1 52,14Z" fill="#FFE27A" stroke="#E8B400" stroke-width="3"/><rect x="37" y="78" width="6" height="160" fill="#B9A5C9"/><ellipse cx="40" cy="244" rx="26" ry="9" fill="#B9A5C9"/>`);
    case 'lamp_star':return svg('0 0 80 260',`<circle cx="40" cy="44" r="40" fill="#FFF3A0" opacity=".35"/><path d="${starPath(40,44,30)}" fill="#FFE27A" stroke="#E8B400" stroke-width="3"/><rect x="37" y="76" width="6" height="162" fill="#FF9CC7"/><ellipse cx="40" cy="244" rx="26" ry="9" fill="#FF9CC7"/>`);
    case 'toy_bear':return svg('0 0 140 130',`<g fill="#D9A06B" stroke="#A86E3E" stroke-width="3"><circle cx="44" cy="30" r="13"/><circle cx="96" cy="30" r="13"/><ellipse cx="70" cy="96" rx="40" ry="30"/><circle cx="70" cy="50" r="32"/><circle cx="34" cy="112" r="14"/><circle cx="106" cy="112" r="14"/></g><ellipse cx="70" cy="60" rx="14" ry="10" fill="#F2D2B0"/><circle cx="58" cy="46" r="4" fill="#3B2350"/><circle cx="82" cy="46" r="4" fill="#3B2350"/><circle cx="70" cy="56" r="4" fill="#3B2350"/><path d="${heartPath(70,96,9)}" fill="#FF5C9E"/>`);
    case 'toy_horse':return svg('0 0 140 130',`<path d="M10,118 Q70,138 130,118" stroke="#C99A6E" stroke-width="8" fill="none" stroke-linecap="round"/><g fill="#fff" stroke="#E7A3C4" stroke-width="3"><ellipse cx="72" cy="78" rx="40" ry="22"/><path d="M96,70 L110,28 Q122,22 126,34 L116,74Z"/></g><path d="M108,30 Q96,40 98,60" stroke="#FF8FC0" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="118" cy="36" r="3" fill="#3B2350"/><g stroke="#E7A3C4" stroke-width="5" stroke-linecap="round"><line x1="46" y1="96" x2="38" y2="118"/><line x1="98" y1="96" x2="106" y2="118"/></g><path d="M34,76 Q20,70 22,92" stroke="#FFD54F" stroke-width="7" fill="none" stroke-linecap="round"/>`);
    case 'toy_piano':{let s=`<rect x="10" y="30" width="120" height="70" rx="10" fill="#FF8FC0" stroke="#E0558F" stroke-width="3"/><rect x="18" y="60" width="104" height="30" rx="4" fill="#fff"/>`;for(let i=0;i<7;i++)s+=`<line x1="${18+i*14.8}" y1="60" x2="${18+i*14.8}" y2="90" stroke="#E5D3EC" stroke-width="2"/>`;for(const i of [1,2,4,5,6])s+=`<rect x="${18+i*14.8-4}" y="60" width="8" height="17" fill="#3B2350"/>`;
      return svg('0 0 140 130',s+`<rect x="20" y="100" width="8" height="24" fill="#E0558F"/><rect x="112" y="100" width="8" height="24" fill="#E0558F"/><text x="70" y="26" font-size="22" text-anchor="middle">🎵</text>`)}
    case 'plant_tulip':return svg('0 0 80 100',`<path d="M40,60 L40,26 M40,50 Q24,40 22,30 M40,46 Q56,38 58,28" stroke="#5DBB7A" stroke-width="4" fill="none"/><path d="M32,28 Q32,10 40,8 Q48,10 48,28 Q40,34 32,28Z" fill="#FF6FA8"/><path d="M14,30 Q14,18 22,16 Q30,18 30,30 Q22,34 14,30Z" fill="#FFD54F"/><path d="M50,28 Q50,16 58,14 Q66,16 66,28 Q58,32 50,28Z" fill="#B69CFF"/><path d="M18,60 L62,60 L56,96 L24,96Z" fill="#E89A6B" stroke="#C47447" stroke-width="3"/>`);
    case 'plant_sun':return svg('0 0 80 100',`<path d="M40,62 L40,34" stroke="#5DBB7A" stroke-width="5"/><ellipse cx="30" cy="50" rx="10" ry="5" fill="#5DBB7A" transform="rotate(-30 30 50)"/>${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<ellipse cx="${40+Math.cos(a)*15}" cy="${26+Math.sin(a)*15}" rx="8" ry="4" fill="#FFD54F" transform="rotate(${i*30} ${40+Math.cos(a)*15} ${26+Math.sin(a)*15})"/>`}).join('')}<circle cx="40" cy="26" r="11" fill="#8B5A2B"/><path d="M18,60 L62,60 L56,96 L24,96Z" fill="#7FB8E8" stroke="#4F8FC8" stroke-width="3"/>`);
  }
  return '';
}

/* ---------- 마을 건물 ---------- */
function houseSVG(roof,wall,icon,locked){
  return `<svg viewBox="0 0 160 160" class="house-svg" aria-hidden="true"><ellipse cx="80" cy="152" rx="66" ry="7" fill="#4A2B5C" opacity=".12"/>
    <rect x="26" y="70" width="108" height="80" rx="10" fill="${locked?'#EDE6F3':wall}" stroke="${locked?'#CDBEDB':'#fff'}" stroke-width="4"/>
    <path d="M12,78 Q80,4 148,78 Q80,62 12,78Z" fill="${locked?'#CDBEDB':roof}" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
    <rect x="64" y="104" width="32" height="46" rx="14" fill="${locked?'#D8CCE4':'#fff'}" opacity=".9"/><circle cx="88" cy="128" r="3" fill="${locked?'#B9A5C9':roof}"/>
    <rect x="36" y="88" width="20" height="20" rx="6" fill="#fff" opacity=".85"/><rect x="104" y="88" width="20" height="20" rx="6" fill="#fff" opacity=".85"/>
    <text x="80" y="58" font-size="30" text-anchor="middle">${locked?'❔':icon}</text></svg>`;
}
function castleSVG(){
  return `<svg viewBox="0 0 220 180" class="house-svg" aria-hidden="true"><ellipse cx="110" cy="172" rx="96" ry="8" fill="#4A2B5C" opacity=".12"/>
    <g fill="#FFF4FA" stroke="#E7A3C4" stroke-width="4"><rect x="20" y="60" width="44" height="110" rx="6"/><rect x="156" y="60" width="44" height="110" rx="6"/><rect x="56" y="88" width="108" height="82" rx="6"/><rect x="88" y="40" width="44" height="80" rx="6"/></g>
    <g fill="#FF8FC0" stroke="#fff" stroke-width="3" stroke-linejoin="round"><path d="M14,64 L42,18 L70,64Z"/><path d="M150,64 L178,18 L206,64Z"/><path d="M82,44 L110,4 L138,44Z"/></g>
    <path d="M92,170 L92,136 Q110,116 128,136 L128,170Z" fill="#FFB8D6"/><path d="${heartPath(110,72,10)}" fill="#FF5C9E"/>
    <g fill="#B7E3FF"><rect x="32" y="84" width="20" height="24" rx="10"/><rect x="168" y="84" width="20" height="24" rx="10"/></g></svg>`;
}
