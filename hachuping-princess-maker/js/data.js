/* =========================================================
   하츄핑 프린세스 메이커 · 게임 데이터
   ========================================================= */
const VERSION = '3.0';

const STATS = [
  {k:'body', n:'튼튼',  i:'💪', c:'#FF9466'},
  {k:'smart',n:'똑똑',  i:'📖', c:'#4EA8F5'},
  {k:'art',  n:'반짝',  i:'🎵', c:'#FF6FA8'},
  {k:'magic',n:'마법',  i:'🪄', c:'#9B7BFF'},
  {k:'kind', n:'마음씨',i:'🌷', c:'#3DBB84'},
  {k:'charm',n:'공주력',i:'👑', c:'#E9A400'},
];
const ST = Object.fromEntries(STATS.map(s => [s.k, s]));
const MOOD_C = '#FF5C9E';
const PERS = {brave:'씩씩한', wise:'생각이 깊은', kind:'상냥한', bright:'반짝반짝 밝은', grace:'의젓한'};
const MONTHS = [3,4,5,6,7,8,9,10,11,12,1,2];
const SEASON = ['봄','여름','가을','겨울'];
const SEASON_I = ['🌸','☀️','🍁','❄️'];
const SEASON_P = ['🌸','✨','🍁','❄️'];
const GROW = ['아기 하츄핑','어린이 하츄핑','꼬마 공주 하츄핑'];
const ORDN = ['첫째','둘째','셋째'];

/* ---------- 할 일 ---------- */
const CATS = [{k:'learn',n:'배우기',i:'🎓'},{k:'job',n:'아르바이트',i:'💼'},{k:'adv',n:'모험',i:'🗺️'},{k:'rest',n:'쉬기',i:'🛏️'}];
const ACTS = {
  dance:  {cat:'learn',n:'댄스 교실',  i:'💃',cost:10,gain:{art:6,body:2},  mood:-8, pers:'bright',game:'dance', friend:'lala',  img:'sc_dance',
           bg:'linear-gradient(#FFE3F3,#E9D9FF)',deco:['🪩','🎶','🎶','✨','🎀'],prop:'🎶',say:'댄스 교실에서 신나게 춤을 배웠어요.'},
  study:  {cat:'learn',n:'도서관 공부',i:'📖',cost:5, gain:{smart:6,charm:1},mood:-8, pers:'wise',  game:['memory','find'],friend:'baro',img:'sc_study',
           bg:'linear-gradient(#FFF4D9,#FFE6C2)',deco:['📚','📚','🕯️','🌙','📜'],prop:'📖',say:'도서관에서 재미있는 책을 읽었어요.'},
  magic:  {cat:'learn',n:'마법 학교',  i:'🔮',cost:15,gain:{magic:6,smart:2},mood:-9, pers:'wise',  game:'simon', img:'sc_magic',
           bg:'linear-gradient(#3D2C7A,#7A5CC8)',deco:['✨','⭐','🌙','🔮','✨'],prop:'✨',say:'마법 학교에서 반짝 주문을 배웠어요.'},
  gym:    {cat:'learn',n:'체육 교실',  i:'🤸',cost:10,gain:{body:6,charm:1},mood:-9, pers:'brave', game:'catch', friend:'aja',   img:'sc_gym',
           bg:'linear-gradient(#D6F5E3,#BDEBD2)',deco:['⚽','🏸','🎽','🏃','⭐'],prop:'⚽',say:'체육 교실에서 땀 흘리며 뛰었어요.'},
  manners:{cat:'learn',n:'예절 교실',  i:'🫖',cost:15,gain:{charm:6,kind:2}, mood:-8, pers:'grace', game:'tea',   friend:'chacha',img:'sc_manners',
           bg:'linear-gradient(#FFF0F6,#FFE1EC)',deco:['🫖','🍰','🌹','☕','🕯️'],prop:'☕',say:'예절 교실에서 공주님 인사를 배웠어요.'},
  art:    {cat:'learn',n:'미술 교실',  i:'🎨',cost:10,gain:{art:5,kind:1,charm:1},mood:-7,pers:'bright',game:'color',img:'sc_art',
           bg:'linear-gradient(#FFF8DD,#FFEBC7)',deco:['🎨','🖼️','🖌️','🌈','✏️'],prop:'🖌️',say:'미술 교실에서 알록달록 그림을 그렸어요.'},
  bakery: {cat:'job',n:'빵집 도우미',  i:'🍞',coin:25,gain:{body:2,kind:1},  mood:-10,pers:'kind',  game:'bread', friend:'hap',   img:'sc_bakery',
           bg:'linear-gradient(#FFEBD0,#FFD8A8)',deco:['🍞','🥐','🧁','🥖','🍩'],prop:'🥐',say:'빵집에서 맛있는 빵 굽는 걸 도왔어요.'},
  flower: {cat:'job',n:'꽃집 도우미',  i:'🌷',coin:20,gain:{kind:3,art:1},   mood:-9, pers:'kind',  game:'water', friend:'chacha',img:'sc_flower',
           bg:'linear-gradient(#E6F8E0,#CDEFC4)',deco:['🌷','🌻','🌹','🌼','🪴'],prop:'💐',say:'꽃집에서 꽃에 물을 주었어요.'},
  baby:   {cat:'job',n:'아기 돌보기',  i:'🍼',coin:22,gain:{kind:3,smart:1}, mood:-10,pers:'kind',  game:'baby',  img:'sc_baby',
           bg:'linear-gradient(#FFF0F8,#FFE0EF)',deco:['🍼','🧸','🎈','🧦','⭐'],prop:'🧸',say:'아기 핑들을 사랑으로 돌봤어요.'},
  clean:  {cat:'job',n:'성 청소',      i:'🧽',coin:30,gain:{body:3},         mood:-12,pers:'brave', game:'rub',   img:'sc_clean',
           bg:'linear-gradient(#E6F0FF,#D3E2FF)',deco:['🏰','🫧','🫧','🧹','✨'],prop:'🧽',say:'왕궁 창문을 반짝반짝 닦았어요.'},
  cook:   {cat:'job',n:'레스토랑',     i:'🍳',coin:35,gain:{smart:1,art:1,kind:1},mood:-12,pers:'wise',game:'cake',unlockMi:3,img:'sc_cook',
           bg:'linear-gradient(#FFEFE2,#FFDCC4)',deco:['🍳','🍝','🍰','🥗','🍓'],prop:'🍰',say:'레스토랑에서 케이크를 만들었어요.'},
  forest: {cat:'adv',region:'forest',n:'반짝반짝 숲', i:'🌳',mood:-12},
  sea:    {cat:'adv',region:'sea',   n:'무지개 바다', i:'🌊',mood:-12,need:{body:20}},
  cloud:  {cat:'adv',region:'cloud', n:'구름 위의 성',i:'☁️',mood:-12,need:{body:35,magic:20}},
  rest:   {cat:'rest',n:'푹 쉬기', i:'🛏️',mood:35,game:'cuddle',img:'sc_rest',
           bg:'linear-gradient(#E8E4FF,#D9D2FF)',deco:['🌙','⭐','💤','☁️','✨'],prop:'💤',say:'집에서 푹 쉬었어요.'},
  picnic: {cat:'rest',n:'소풍 가기',i:'🧺',cost:10,mood:50,gain:{kind:1},game:'butterfly',img:'sc_picnic',
           bg:'linear-gradient(#D8F3FF,#D9F5CF)',deco:['🌳','🦋','🌼','☀️','🌸'],prop:'🧺',say:'들판으로 소풍을 가서 나비를 봤어요.'},
  bath:   {cat:'rest',n:'씻기',      i:'🛁',mood:20,gain:{charm:1},game:'bubble',doneT:'깨끗해졌어요!',
           bg:'linear-gradient(#DDF3FF,#C6E8FF)',deco:['🫧','🛁','🧴','🫧','🦆'],prop:'🫧',say:'보글보글 거품 목욕을 했어요.'},
  brush:  {cat:'rest',n:'양치하기',  i:'🪥',mood:10,gain:{body:1},game:'teeth',doneT:'이가 반짝반짝!',
           bg:'linear-gradient(#FFF0F6,#E6F6FF)',deco:['🪥','🦷','✨','🫧','🪞'],prop:'🪥',say:'치카치카 이를 깨끗하게 닦았어요.'},
  toilet: {cat:'rest',n:'화장실 가기',i:'🚽',mood:12,game:'potty',doneT:'시원해요!',
           bg:'linear-gradient(#E6F4FF,#F4FBFF)',deco:['🚽','🧻','🧼','💧','🫧'],prop:'🧼',say:'화장실에 다녀와서 손도 깨끗이 씻었어요.'},
  meal:   {cat:'rest',n:'밥 먹기',   i:'🍚',mood:15,gain:{body:2},game:'meal',doneT:'잘 먹었습니다!',
           bg:'linear-gradient(#FFF6E0,#FFE9CC)',deco:['🍚','🥦','🐟','🥕','🍎'],prop:'🥄',say:'골고루 맛있게 밥을 먹었어요.'},
  invite: {cat:'rest',n:'친구 초대하기',i:'🏠',mood:10,special:'invite',say:'친구들을 집에 초대했어요.'},
};
Object.keys(ACTS).forEach(k => ACTS[k].key = k);
const DECO_POS = [[6,10],[80,8],[12,56],[84,54],[46,6]];

/* ---------- 옷 ---------- */
const ITEMS = [
  {id:'ribbon',     slot:'head', n:'분홍 리본',    src:'start'},
  {id:'flower',     slot:'head', n:'꽃 머리핀',    price:30},
  {id:'bunny',      slot:'head', n:'토끼 머리띠',  price:40},
  {id:'witch',      slot:'head', n:'마법사 모자',  price:50},
  {id:'starband',   slot:'head', n:'별 머리띠',    src:'contest'},
  {id:'flowercrown',slot:'head', n:'꽃 왕관',      src:'adv'},
  {id:'tiara',      slot:'head', n:'반짝 티아라',  src:'contest'},
  {id:'crown',      slot:'head', n:'하트 왕관',    src:'contest'},
  {id:'f_drop',     slot:'head', n:'동글 안경',    src:'friend'},
  {id:'f_bolt',     slot:'head', n:'용기 별핀',    src:'friend'},
  {id:'f_leaf',     slot:'head', n:'네잎클로버 핀',src:'friend'},
  {id:'f_note',     slot:'head', n:'음표 리본',    src:'friend'},
  {id:'f_star',     slot:'head', n:'해님 머리띠',  src:'friend'},
  {id:'f_areum',    slot:'head', n:'아름 꽃핀',    src:'friend'},
  {id:'f_sappun',   slot:'head', n:'사뿐 보석핀',  src:'friend'},
  {id:'f_ponny',    slot:'head', n:'무지개 리본',  src:'friend'},
  {id:'d_hachu',    slot:'dress',n:'하츄핑 원래 옷',src:'start'},
  {id:'d_pink',     slot:'dress',n:'분홍 드레스',  color:'#FFB8D6',src:'start'},
  {id:'d_mint',     slot:'dress',n:'민트 드레스',  color:'#9FE8D2',price:40},
  {id:'d_lemon',    slot:'dress',n:'레몬 드레스',  color:'#FFE27A',price:40},
  {id:'d_apron',    slot:'dress',n:'요리사 앞치마',color:'#FFC9DE',price:50},
  {id:'d_knight',   slot:'dress',n:'기사 옷',      color:'#D9E2EE',price:70},
  {id:'d_ball',     slot:'dress',n:'무도회 드레스',color:'#FF9CC9',price:120},
  {id:'d_star',     slot:'dress',n:'별빛 드레스',  color:'#B7A4FF',src:'contest'},
  {id:'d_rainbow',  slot:'dress',n:'무지개 드레스',src:'contest'},
  {id:'d_mermaid',  slot:'dress',n:'인어 드레스',  color:'#86DCEB',src:'adv'},
  {id:'d_cloud',    slot:'dress',n:'구름 드레스',  color:'#FFFFFF',src:'adv'},
  {id:'d_hanbok',   slot:'dress',n:'색동 한복',    color:'#FF7FA0',src:'event'},
  {id:'d_santa',    slot:'dress',n:'산타 드레스',  color:'#EE4B5A',src:'event'},
  {id:'wand',       slot:'hand', n:'하트 요술봉',  price:35},
  {id:'mic',        slot:'hand', n:'반짝 마이크',  price:30},
  {id:'book',       slot:'hand', n:'마법 책',      price:30},
  {id:'bouquet',    slot:'hand', n:'꽃다발',       price:25},
  {id:'brush',      slot:'hand', n:'무지개 붓',    price:30},
  {id:'teacup',     slot:'hand', n:'찻잔',         price:25},
  {id:'balloon',    slot:'hand', n:'하트 풍선',    price:20},
  {id:'shield',     slot:'hand', n:'하트 방패',    price:45},
  {id:'starwand',   slot:'hand', n:'별 지팡이',    src:'contest'},
  {id:'pumpkin',    slot:'hand', n:'호박 바구니',  src:'event'},
  {id:'h_flora',    slot:'head', n:'플로라 꽃핀',  src:'form'},
  {id:'h_star',     slot:'head', n:'스타 별핀',    src:'form'},
  {id:'h_berry',    slot:'head', n:'베리 꽃핀',    src:'form'},
  {id:'h_dia',      slot:'head', n:'다이아 하트핀',src:'form'},
  {id:'d_flora',    slot:'dress',n:'플로라 드레스',src:'form'},
  {id:'d_starform', slot:'dress',n:'스타 드레스',  src:'form'},
  {id:'d_berry',    slot:'dress',n:'베리 드레스',  src:'form'},
  {id:'d_dia',      slot:'dress',n:'다이아 드레스',src:'form'},
  {id:'d_princess', slot:'dress',n:'프린세스 드레스',src:'form'},
  {id:'flowerwand', slot:'hand', n:'꽃 요술봉',    src:'form'},
  {id:'rose',       slot:'hand', n:'분홍 장미',    src:'form'},
  {id:'jewel_heart',slot:'hand', n:'하트 목걸이',  src:'form'},
  {id:'heartmirror',slot:'hand', n:'하트 거울',    src:'form'},
];
/* ---------- 하츄핑 변신 폼 (옷 세트) ---------- */
const FORMS = [
  {id:'flora',   n:'플로라 하츄핑',  i:'🌸',parts:{head:'h_flora',dress:'d_flora',hand:'flowerwand'}, how:'4월 벚꽃 축제'},
  {id:'star',    n:'스타 하츄핑',    i:'⭐',parts:{head:'h_star',dress:'d_starform',hand:'starwand'},  how:'6월 노래 대회 메달'},
  {id:'berry',   n:'베리 하츄핑',    i:'🍓',parts:{head:'h_berry',dress:'d_berry',hand:'rose'},        how:'7월 여름 바다'},
  {id:'dia',     n:'다이아 하츄핑',  i:'💎',parts:{head:'h_dia',dress:'d_dia',hand:'jewel_heart'},     how:'12월 눈꽃 대회 메달'},
  {id:'princess',n:'프린세스 하츄핑',i:'👑',parts:{head:'tiara',dress:'d_princess',hand:'heartmirror'},how:'2월 왕국 무도회'},
];
const ITEM = Object.fromEntries(ITEMS.map(t => [t.id, t]));
const SLOTS = [{k:'head',n:'머리',i:'🎀'},{k:'dress',n:'옷',i:'👗'},{k:'hand',n:'손',i:'🪄'}];
const SRC_TXT = {form:'✨ 변신 폼',start:'처음부터 있어요',contest:'🏆 대회 상품',adv:'🗺️ 모험 보물',friend:'💞 단짝 선물',event:'🎉 특별한 날'};

/* ---------- 간식 ---------- */
const SNACKS = [
  {id:'cake',     n:'딸기 케이크',i:'🍰',price:15,mood:15},
  {id:'cookie',   n:'당근 쿠키',  i:'🍪',price:10,mood:8, gain:{body:1}},
  {id:'candy',    n:'별사탕',     i:'🍬',price:8, mood:6, gain:{magic:1}},
  {id:'tea',      n:'꽃잎 차',    i:'🍵',price:12,mood:8, gain:{charm:1}},
  {id:'icecream', n:'아이스크림', i:'🍦',price:10,mood:12},
  {id:'songpyeon',n:'송편',       i:'🍡',mood:12,gain:{kind:1}},
  {id:'choco',    n:'초콜릿',     i:'🍫',mood:12},
];
const SN = Object.fromEntries(SNACKS.map(s => [s.id, s]));

/* ---------- 방 꾸미기 ---------- */
const FURN_SLOTS = [
  {k:'bed',n:'침대',i:'🛏️'},{k:'wall',n:'벽 장식',i:'🎊'},{k:'rug',n:'러그',i:'🟣'},{k:'shelf',n:'선반',i:'📚'},
  {k:'lamp',n:'조명',i:'💡'},{k:'toy',n:'장난감',i:'🧸'},{k:'plant',n:'화분',i:'🪴'},
];
const FURN = [
  {id:'bed_pink',    slot:'bed',  n:'하트 침대',     price:60},
  {id:'bed_star',    slot:'bed',  n:'별님 침대',     price:80},
  {id:'bed_cloud',   slot:'bed',  n:'구름 침대',     price:100},
  {id:'wall_garland',slot:'wall', n:'하트 가랜드',   price:25},
  {id:'wall_stars',  slot:'wall', n:'별 전구',       price:35},
  {id:'wall_rainbow',slot:'wall', n:'무지개 장식',   price:45},
  {id:'rug_heart',   slot:'rug',  n:'하트 러그',     price:30},
  {id:'rug_flower',  slot:'rug',  n:'꽃 러그',       price:30},
  {id:'rug_cloud',   slot:'rug',  n:'구름 러그',     price:40},
  {id:'shelf_book',  slot:'shelf',n:'책장',          price:40},
  {id:'shelf_toy',   slot:'shelf',n:'인형 선반',     price:50},
  {id:'lamp_moon',   slot:'lamp', n:'달님 조명',     price:30},
  {id:'lamp_star',   slot:'lamp', n:'별님 조명',     price:30},
  {id:'toy_bear',    slot:'toy',  n:'곰 인형',       price:20},
  {id:'toy_horse',   slot:'toy',  n:'흔들 목마',     price:45},
  {id:'toy_piano',   slot:'toy',  n:'장난감 피아노', price:40},
  {id:'plant_tulip', slot:'plant',n:'튤립 화분',     price:15},
  {id:'plant_sun',   slot:'plant',n:'해바라기 화분', price:20},
];
const FU = Object.fromEntries(FURN.map(f => [f.id, f]));

/* ---------- 티니핑 친구 ---------- */
const FRIENDS = [
  {id:'baro',  n:'바로핑',body:'#CDEBFF',deep:'#2C82CE',fav:'cookie',  bg:'#E3F2FF',where:'📖 도서관 공부',          place:'도서관', item:'f_drop',
   story:[
    {need:2,t:'도서관 정리',gain:{smart:2},lines:[['baro','하츄핑! 책이 너무 많아서 정리를 못 하겠어…'],['hachu','내가 도와줄게! 같이 하면 금방이야!'],['baro','고마워! 너랑 하니까 하나도 안 힘들어!']]},
    {need:4,t:'바로핑의 고민',gain:{kind:3},lines:[['baro','있잖아… 내가 실수로 꽃병을 깼어.'],['baro','선생님께 솔직하게 말해야 할까?'],['hachu','응! 솔직하게 말하면 선생님도 이해해 주실 거야!'],['baro','용기 내서 말했더니 괜찮다고 하셨어! 고마워, 하츄핑!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['baro','하츄핑, 너는 내 제일 소중한 친구야!'],['baro','이거 받아! 나랑 똑같은 동글 안경이야!'],['hachu','우와, 이제 우리 쌍둥이 같아! 소중히 할게!']]},
   ]},
  {id:'aja',   n:'아자핑',body:'#FFF08F',deep:'#EE8600',fav:'icecream',bg:'#FFF6CF',where:'🤸 체육 교실, 🌳 숲 모험',  place:'체육 교실', item:'f_bolt',
   story:[
    {need:2,t:'달리기 시합',gain:{body:2},lines:[['aja','아자아자! 하츄핑, 나랑 달리기 시합할래?'],['hachu','좋아! 누가 더 빠른지 해 보자!'],['aja','헉헉… 너 정말 빠르다! 우리 또 하자!']]},
    {need:4,t:'아기 고양이 구하기',gain:{body:2,kind:2},lines:[['aja','저기 봐! 나무 위에서 아기 고양이가 못 내려오고 있어!'],['hachu','내가 사다리를 꼭 잡아 줄게! 같이 구하자!'],['aja','구했다! 우리가 힘을 합치니까 할 수 있었어!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['aja','하츄핑은 나의 최고의 단짝이야!'],['aja','용기가 필요할 때 이 별 머리핀을 해!'],['hachu','고마워 아자핑! 아자아자!']]},
   ]},
  {id:'chacha',n:'차차핑',body:'#F9F8CF',deep:'#5DAF2C',fav:'tea',     bg:'#EEF8DA',where:'🫖 예절 교실, 🌷 꽃집',    place:'예절 교실', item:'f_leaf',
   story:[
    {need:2,t:'꽃잎 차 파티',gain:{charm:2},lines:[['chacha','하츄핑, 우리 집에서 꽃잎 차 마실래?'],['hachu','와, 향기가 너무 좋다!'],['chacha','천천히 마시면 마음이 차분해져.']]},
    {need:4,t:'속상한 날',gain:{kind:2,charm:1},lines:[['hachu','친구랑 다퉈서 속상해…'],['chacha','괜찮아! 차차 나아질 거야. 숨을 크게 쉬어 봐. 후~ 하~'],['hachu','후~ 하~ 마음이 조금 편해졌어!'],['chacha','이제 친구한테 먼저 말을 걸어 볼래? 분명 잘될 거야!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['chacha','하츄핑이랑 있으면 마음이 따뜻해.'],['chacha','들판에서 네잎클로버를 찾았어. 행운의 머리핀이야!'],['hachu','고마워 차차핑! 행운이 가득할 것 같아!']]},
   ]},
  {id:'lala',  n:'라라핑',body:'#F3E8FF',deep:'#7B53DE',fav:'candy',   bg:'#EFE6FF',where:'💃 댄스 교실, 🌊 바다 모험',place:'댄스 교실', item:'f_note',
   story:[
    {need:2,t:'같이 노래해요',gain:{art:2},lines:[['lala','랄라랄라~ 하츄핑, 나랑 노래할래?'],['hachu','좋아! 랄라~ 하츄~!'],['lala','우리 목소리가 딱 맞아!']]},
    {need:4,t:'떨리는 무대',gain:{art:2,kind:1},lines:[['lala','다음 주에 무대에 서는데… 너무 떨려.'],['hachu','내가 맨 앞에서 응원할게! 라라핑은 할 수 있어!'],['lala','네 응원 덕분에 끝까지 노래했어! 고마워!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['lala','하츄핑은 내 노래의 첫 번째 팬이야!'],['lala','이 음표 리본 받아 줘!'],['hachu','고마워 라라핑! 랄라~']]},
   ]},
  {id:'hap',   n:'해핑',  body:'#FFF2DD',deep:'#EE8526',fav:'cake',    bg:'#FFEBD6',where:'🍞 빵집, ☁️ 구름 성 모험', place:'빵집', item:'f_star',
   story:[
    {need:2,t:'빵 나눠 먹기',gain:{kind:2},lines:[['hap','해피해피! 빵을 많이 구웠어! 같이 먹자!'],['hachu','냠냠! 해핑이 구운 빵 최고야!'],['hap','같이 먹으니까 두 배로 맛있어!']]},
    {need:4,t:'비 오는 날',gain:{kind:2,art:1},lines:[['hap','비가 와서 기분이 축 처졌어…'],['hachu','그럼 내가 재밌는 표정 보여 줄게! 메롱~'],['hap','푸하하! 하츄핑 덕분에 다시 해피해졌어!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['hap','하츄핑을 만나서 매일매일 행복해!'],['hap','반짝반짝 해님 머리띠야. 우리 우정의 해님!'],['hachu','고마워 해핑! 너무너무 행복해!']]},
   ]},
  /* ---- 프린세스 티니핑: 처음부터 친구 ---- */
  {id:'areum', n:'아름핑',princess:true,body:'#FDE6F0',deep:'#E86AA8',fav:'cake',    bg:'#FFE6F2',where:'처음부터 친구',place:'왕궁',item:'f_areum',
   story:[
    {need:2,t:'꽃밭 산책',gain:{charm:2},lines:[['areum','하츄핑, 우리 꽃밭에 산책 갈래?'],['hachu','좋아! 꽃이 정말 예쁘다!'],['areum','마음이 예쁘면 꽃도 더 예뻐 보인대!']]},
    {need:4,t:'속상한 머리',gain:{kind:2,charm:1},lines:[['areum','오늘 머리가 엉망이야… 속상해.'],['hachu','괜찮아! 웃는 얼굴이 제일 예뻐!'],['areum','정말? 고마워! 너랑 있으면 자신감이 생겨!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['areum','하츄핑은 마음이 제일 아름다운 친구야.'],['areum','내가 아끼는 꽃핀을 줄게!'],['hachu','우와, 고마워 아름핑! 매일 하고 다닐게!']]},
   ]},
  {id:'sappun',n:'사뿐핑',princess:true,body:'#EEF2FF',deep:'#6FA8E8',fav:'tea',     bg:'#E8F1FF',where:'처음부터 친구',place:'왕궁',item:'f_sappun',
   story:[
    {need:2,t:'발레 연습',gain:{art:2},lines:[['sappun','사뿐사뿐~ 하츄핑, 발레 같이 해 볼래?'],['hachu','발끝으로 서기… 어어, 넘어질 것 같아!'],['sappun','천천히 해도 괜찮아. 점점 잘하게 될 거야!']]},
    {need:4,t:'넘어진 날',gain:{body:2,kind:1},lines:[['sappun','무대에서 넘어져서 너무 창피했어…'],['hachu','넘어져도 다시 일어나면 돼! 나도 같이 연습할게!'],['sappun','그래, 다시 해 볼게! 고마워 하츄핑!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['sappun','하츄핑 덕분에 발레가 다시 좋아졌어!'],['sappun','이 반짝이 보석핀을 선물할게!'],['hachu','고마워 사뿐핑! 우리 같이 사뿐사뿐!']]},
   ]},
  {id:'ponny', n:'뽀니핑',princess:true,body:'#FFF3E6',deep:'#F59AC0',fav:'icecream',bg:'#FFF5E0',where:'처음부터 친구',place:'왕궁',item:'f_ponny',
   story:[
    {need:2,t:'무지개 머리',gain:{art:1,charm:1},lines:[['ponny','하츄핑! 내 머리 무지개 색 예쁘지?'],['hachu','응! 꼭 무지개 같아!'],['ponny','헤헤, 너도 머리 예쁘게 묶어 줄게!']]},
    {need:4,t:'시끄러워도 괜찮아',gain:{kind:2},lines:[['ponny','다들 나보고 너무 시끄럽대… 히잉.'],['hachu','나는 뽀니핑이 신나게 웃는 게 좋아!'],['ponny','진짜? 그럼 우리 같이 신나게 놀자!']]},
    {need:5,t:'단짝 선물',gift:true,lines:[['ponny','하츄핑은 나의 무지개 단짝이야!'],['ponny','내 무지개 리본을 너한테 줄게!'],['hachu','고마워 뽀니핑! 우리 둘 다 무지개 공주!']]},
   ]},
];
const FR = Object.fromEntries(FRIENDS.map(f => [f.id, f]));

/* ---------- 모험 ---------- */
const REGIONS = {
  forest:{n:'반짝반짝 숲',i:'🌳',img:'adv_forest',bg:'linear-gradient(#D5F5DE,#9EDDB2)',deco:['🌳','🍄','🌼','🌲','🐿️'],friend:'aja',
          foe:{i:'🦝',n:'장난꾸러기 너구리'},block:{i:'🪵',n:'커다란 통나무'},goal:{i:'🌈',n:'무지개 꽃',item:'flowercrown'}},
  sea:   {n:'무지개 바다',i:'🌊',img:'adv_sea',bg:'linear-gradient(#C8EEFF,#6FCBEA)',deco:['🐚','🐠','🪸','🫧','🐬'],friend:'lala',
          foe:{i:'🐙',n:'심술쟁이 문어'},block:{i:'🌊',n:'높은 파도'},goal:{i:'🦪',n:'반짝 진주',item:'d_mermaid'}},
  cloud: {n:'구름 위의 성',i:'☁️',img:'adv_cloud',bg:'linear-gradient(#ECE6FF,#C4D6FF)',deco:['☁️','⭐','🌙','🏰','🌠'],friend:'hap',
          foe:{i:'🌩️',n:'투덜투덜 번개 구름'},block:{i:'🌉',n:'흔들흔들 구름 다리'},goal:{i:'⭐',n:'별 조각',item:'d_cloud'}},
};
const QUIZ = [
  {q:'빨간 과일은 어느 것일까요?',a:'🍎',o:['🍌','🍇']},
  {q:'하늘을 나는 친구는 누구일까요?',a:'🐦',o:['🐟','🐢']},
  {q:'물속에 사는 친구는 누구일까요?',a:'🐟',o:['🐶','🐱']},
  {q:'밤하늘에 뜨는 것은 무엇일까요?',a:'🌙',o:['☀️','🌈']},
  {q:'추운 겨울에 내리는 것은 무엇일까요?',a:'❄️',o:['🌸','🍁']},
  {q:'별은 몇 개일까요? ⭐⭐⭐',a:'3',o:['2','4']},
  {q:'하트는 몇 개일까요? 💗💗💗💗',a:'4',o:['3','5']},
  {q:'노란 과일은 어느 것일까요?',a:'🍌',o:['🍓','🍇']},
  {q:'멍멍 짖는 친구는 누구일까요?',a:'🐶',o:['🐱','🐰']},
  {q:'비가 올 때 쓰는 것은 무엇일까요?',a:'☂️',o:['🕶️','🧤']},
  {q:'가장 큰 동물은 누구일까요?',a:'🐘',o:['🐭','🐥']},
  {q:'2 더하기 1은 얼마일까요?',a:'3',o:['2','4']},
  {q:'당근을 좋아하는 친구는 누구일까요?',a:'🐰',o:['🐟','🐦']},
  {q:'달콤한 꿀을 만드는 친구는 누구일까요?',a:'🐝',o:['🐌','🐸']},
  {q:'3 빼기 1은 얼마일까요?',a:'2',o:['1','3']},
  {q:'바다에 사는 큰 친구는 누구일까요?',a:'🐳',o:['🦁','🐻']},
];

/* ---------- 대회 ---------- */
const CONTEST_AT = {3:'sing',6:'autumn',9:'snow'};
const CONTESTS = {
  sing:     {n:'노래 대회',     i:'🎤',c:'#FF6FA8',game:'rhythm', prize:'tiara',    pref:'lala',  tip:'🎵 👑',   score:()=>S.stats.art+S.stats.charm*.5},
  run:      {n:'달리기 대회',   i:'🏃',c:'#FF9466',game:'catch',  prize:'starband', pref:'aja',   tip:'💪',      score:()=>S.stats.body*1.2+S.stats.kind*.2},
  cook:     {n:'요리 대회',     i:'🍰',c:'#FFA35C',game:'cake',   prize:'d_rainbow',pref:'hap',   tip:'📖 🎵 🍳',score:()=>S.stats.smart*.5+S.stats.art*.5+((S.cnt.cook||0)+(S.cnt.bakery||0))*4},
  fashion:  {n:'패션쇼',        i:'👗',c:'#E9A400',game:'fashion',prize:'d_star',   pref:'chacha',tip:'👑 👗',   score:()=>S.stats.charm+Object.values(meta.outfit).filter(Boolean).length*4},
  magicshow:{n:'마법 대회',     i:'🪄',c:'#9B7BFF',game:'simon',  prize:'starwand', pref:'baro',  tip:'🪄 📖',   score:()=>S.stats.magic+S.stats.smart*.3},
  snow:     {n:'눈꽃 착한 어린이 대회',i:'❄️',c:'#3DBB84',game:'gift',prize:'crown',pref:'chacha',tip:'🌷 👑',score:()=>S.stats.kind*1.1+S.stats.charm*.3},
};
const RANKS = [{i:'🥇',n:'금메달'},{i:'🥈',n:'은메달'},{i:'🥉',n:'동메달'},{i:'🎗️',n:'참가상'}];

/* ---------- 엔딩 ---------- */
const ENDINGS = {
  queen:   {n:'온 세상을 비추는 여왕님',i:'💎',bg:'#FFF0B3',hint:'모든 점수를 아주 높게',out:{head:'crown',dress:'d_ball',hand:'starwand'},
            d:'무엇이든 최고로 잘해서 하츄핑 왕국을 다스리는 여왕님이 되었어요! 온 세상이 반짝반짝 빛나요.'},
  royal:   {n:'하츄핑 왕국의 진짜 공주님',i:'👑',bg:'#FFEFB8',hint:'모든 것을 골고루',out:{head:'tiara',dress:'d_ball'},
            d:'무엇이든 잘하는 멋진 공주님이 되었어요! 왕국의 모든 친구들이 하츄핑을 사랑해요.'},
  friends: {n:'티니핑 친구들의 공주님',i:'🌈',bg:'#E6F4FF',hint:'친구 셋과 단짝 되기',out:null,
            d:'단짝 친구들과 언제나 함께하는 공주님이 되었어요! 친구들이 하츄핑을 제일 좋아해요.'},
  rich:    {n:'반짝 상점 사장님 공주님',i:'💰',bg:'#FFF3CC',hint:'코인을 600개 모으기',out:{hand:'teacup',dress:'d_lemon'},
            d:'아르바이트를 열심히 해서 마을에서 제일 예쁜 상점을 연 사장님 공주님이 되었어요!'},
  art:     {n:'반짝반짝 아이돌 공주님',i:'🎤',bg:'#FFE0F2',hint:'댄스 교실에 많이 가기',out:{hand:'mic',head:'starband'},
            d:'노래하고 춤추는 걸 제일 좋아하는 아이돌 공주님이 되었어요! 무대 위에서 반짝반짝 빛나요.'},
  painter: {n:'무지개 화가 공주님',i:'🎨',bg:'#FFF6D9',hint:'미술 교실에 많이 가기',out:{hand:'brush'},
            d:'세상을 알록달록 색칠하는 화가 공주님이 되었어요! 하츄핑의 그림은 왕국의 보물이에요.'},
  smart:   {n:'척척박사 공주님',i:'🔭',bg:'#DCEFFF',hint:'똑똑 점수를 제일 높게',out:{hand:'book'},
            d:'책을 많이 읽어서 무엇이든 척척 아는 박사 공주님이 되었어요!'},
  body:    {n:'용감한 기사 공주님',i:'🛡️',bg:'#FFE6D6',hint:'튼튼 점수를 제일 높게',out:{dress:'d_knight',hand:'shield'},
            d:'튼튼하고 용감해서 친구들을 지켜 주는 기사 공주님이 되었어요!'},
  magic:   {n:'별빛 마법사 공주님',i:'🌟',bg:'#E8E0FF',hint:'마법 점수를 제일 높게',out:{head:'witch',hand:'starwand'},
            d:'반짝반짝 마법으로 모두를 행복하게 만드는 마법사 공주님이 되었어요!'},
  fairy:   {n:'꽃요정 공주님',i:'🧚',bg:'#F0E6FF',hint:'마법과 마음씨를 함께 높게',out:{head:'flowercrown',hand:'wand'},
            d:'따뜻한 마음과 마법으로 꽃과 동물을 돌보는 꽃요정 공주님이 되었어요!'},
  love:    {n:'사랑이 가득한 하트 공주님',i:'💖',bg:'#FFD9E8',hint:'마음씨 점수를 제일 높게',out:{hand:'balloon'},
            d:'마음이 제일 따뜻한 공주님이 되었어요! 하츄핑 곁에 있으면 모두 행복해져요.'},
  fashion: {n:'패션 공주님',i:'👗',bg:'#FFE6F6',hint:'공주력 점수를 제일 높게',out:null,
            d:'예쁜 옷을 멋지게 입는 패션 공주님이 되었어요! 왕국의 모두가 하츄핑의 옷을 따라 입어요.'},
  chef:    {n:'달콤한 요리사 공주님',i:'🍰',bg:'#FFE7D6',hint:'빵집과 레스토랑에서 많이 일하기',out:{dress:'d_apron',head:null,hand:null},
            d:'맛있는 케이크와 빵을 만드는 요리사 공주님이 되었어요! 모두 하츄핑의 요리를 기다려요.'},
  flower:  {n:'꽃의 공주님',i:'🌷',bg:'#E3F7DD',hint:'꽃집에서 많이 일하기',out:{head:'flowercrown',hand:'bouquet',dress:'d_mint'},
            d:'꽃을 사랑하는 꽃의 공주님이 되었어요! 하츄핑이 걸으면 길마다 꽃이 피어나요.'},
  teacher: {n:'다정한 선생님 공주님',i:'🍎',bg:'#FFEAF3',hint:'아기 돌보기를 많이 하기',out:{hand:'book'},
            d:'아기 핑들을 사랑으로 돌보는 다정한 선생님 공주님이 되었어요!'},
  explorer:{n:'용감한 탐험가 공주님',i:'🧭',bg:'#DFF3FF',hint:'모험을 많이 떠나기',out:{hand:'shield'},
            d:'숲과 바다와 구름 성을 누비는 용감한 탐험가 공주님이 되었어요!'},
};
const ENDING_ORDER = ['queen','royal','friends','rich','art','painter','smart','body','magic','fairy','love','fashion','chef','flower','teacher','explorer'];

/* ---------- 대화 ---------- */
const TALKS = [
  {k:'praise',n:'칭찬해 주기',i:'👏',c:'#E9A400'},
  {k:'hug',   n:'꼭 안아 주기',i:'🤗',c:'#FF5C9E'},
  {k:'listen',n:'이야기 듣기',i:'👂',c:'#4EA8F5'},
  {k:'height',n:'키 재기',    i:'📏',c:'#3DBB84'},
];

/* ---------- 스티커 (모든 판에 걸쳐 모아요) ---------- */
const STICKERS = [
  {id:'first_month', i:'🌱',n:'첫 달 완료',      hint:'첫 달 일정을 끝내요',        ok:()=>S&&S.mi>=1},
  {id:'first_game',  i:'🎮',n:'첫 미니게임',     hint:'미니게임을 해 봐요',         ok:()=>Object.keys(meta.st.games).length>=1},
  {id:'perfect',     i:'⭐',n:'만점!',           hint:'미니게임 10점',              ok:()=>meta.st.perfects>=1},
  {id:'perfect10',   i:'🌟',n:'만점 열 번',      hint:'미니게임 10점을 열 번',      ok:()=>meta.st.perfects>=10},
  {id:'all_games',   i:'🎪',n:'미니게임 박사',   hint:'모든 미니게임 해 보기',      ok:()=>Object.keys(meta.st.games).length>=Object.keys(GAMES).length},
  {id:'friend1',     i:'👫',n:'첫 친구',         hint:'티니핑 친구를 만나요',       ok:()=>S&&Object.keys(S.friends).length>=1},
  {id:'friend_all',  i:'🌈',n:'친구 모두',       hint:'티니핑 친구 모두 만나기',    ok:()=>S&&Object.keys(S.friends).length>=FRIENDS.length},
  {id:'bestie',      i:'💞',n:'단짝 친구',       hint:'하트 다섯 개 친구',          ok:()=>S&&Object.values(S.friends).some(h=>h>=5)},
  {id:'gold',        i:'🥇',n:'금메달',          hint:'대회에서 1등',               ok:()=>meta.st.golds>=1},
  {id:'medals3',     i:'🏅',n:'메달 부자',       hint:'한 해에 메달 세 개',         ok:()=>S&&S.medals.filter(m=>m.rank<3).length>=3},
  {id:'adv_all',     i:'🗺️',n:'모험왕',          hint:'모험 세 곳 모두 가 보기',    ok:()=>Object.keys(meta.st.regions).length>=3},
  {id:'treasure',    i:'💎',n:'보물 발견',       hint:'모험 끝에서 보물 찾기',      ok:()=>['flowercrown','d_mermaid','d_cloud'].some(i=>meta.owned.includes(i))},
  {id:'rich300',     i:'💰',n:'코인 부자',       hint:'코인 300개 모으기',          ok:()=>S&&S.coins>=300},
  {id:'tall',        i:'📏',n:'쑥쑥 100cm',      hint:'키 100cm 되기',              ok:()=>S&&S.height>=100},
  {id:'closet10',    i:'👗',n:'옷 열 벌',        hint:'옷 열 벌 모으기',            ok:()=>meta.owned.length>=10},
  {id:'closet_all',  i:'👑',n:'옷장 완성',       hint:'옷 모두 모으기',             ok:()=>meta.owned.length>=ITEMS.length},
  {id:'room5',       i:'🛋️',n:'꾸미기 대장',     hint:'가구 다섯 개 모으기',        ok:()=>meta.furn.length>=5},
  {id:'birthday',    i:'🎂',n:'생일 파티',       hint:'8월 생일 파티',              ok:()=>meta.st.birthdays>=1},
  {id:'seollal',     i:'🧧',n:'세뱃돈',          hint:'1월 설날에 세배하기',        ok:()=>meta.st.seollal>=1},
  {id:'diary',       i:'📔',n:'일기 열두 장',    hint:'1년 일기 다 쓰기',           ok:()=>meta.st.years>=1},
  {id:'ending1',     i:'📖',n:'첫 엔딩',         hint:'엔딩을 하나 봐요',           ok:()=>meta.endings.length>=1},
  {id:'ending5',     i:'📚',n:'엔딩 다섯',       hint:'엔딩 다섯 개',               ok:()=>meta.endings.length>=5},
  {id:'ending_all',  i:'🏆',n:'엔딩 마스터',     hint:'엔딩 모두 보기',             ok:()=>meta.endings.length>=ENDING_ORDER.length},
  {id:'form1',       i:'✨',n:'첫 변신',         hint:'변신 폼 얻기',               ok:()=>meta.forms.length>=1},
  {id:'form_all',    i:'🦄',n:'변신 마스터',     hint:'변신 폼 다섯 개 모두',       ok:()=>meta.forms.length>=FORMS.length},
  {id:'royal',       i:'👸',n:'진짜 공주님',     hint:'공주님이나 여왕님 엔딩',     ok:()=>meta.endings.includes('royal')||meta.endings.includes('queen')},
];

/* ---------- 이미지 (있으면 쓰고, 없으면 그림으로 그려요) ---------- */
const IMAGE_KEYS = ['title_bg','town_bg','sc_dance','sc_study','sc_magic','sc_gym','sc_manners','sc_art','sc_bakery','sc_flower','sc_baby','sc_clean','sc_cook','sc_rest','sc_picnic',
  'adv_forest','adv_sea','adv_cloud','contest_stage','ballroom','ev_cherry','ev_beach','ev_chuseok','ev_halloween','ev_christmas','ev_seollal','ev_birthday','ending_bg'];
