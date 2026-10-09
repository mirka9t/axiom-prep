/* =====================================================================
   AXIOM — Axi introduces the app · daily quests · level journey
   ===================================================================== */
ICONS.chest="M4 10h16v10H4z M4 10l2-5h12l2 5 M10 13h4v3h-4z";ICONS.gift="M4 10h16v10H4z M3 7h18v3H3z M12 7v13 M12 7c-2-3-6-3-6 0 M12 7c2-3 6-3 6 0";ICONS.path="M6 20c0-6 12-4 12-10S8 6 8 4 M6 20h.01 M8 4h.01";
AXV="2.1";
/* ---------------- intro ---------------- */
var INTRO_KEY="axiom_intro_v1";
var INTRO_T={en:{skip:"Skip",next:"Next",back:"Back",go:"Let's go!",
  s:[["cheer","Hi! I'm Axi.","I'm an axolotl — the animal that can regrow what it loses. That's the idea behind AXIOM: every mistake you make is data that helps your maths grow back stronger."],
     ["happy","Welcome to AXIOM","Your SAT Math coach — from zero to 800. Every rule is built from first principles, so you understand why it works instead of just memorising it."],
     ["happy","How you'll learn",""],
     ["happy","Your toolbox","A graphing calculator with a math keypad, a calculator, the SAT reference sheet and a scratchpad. Open them from Tools and drag them anywhere on the screen."],
     ["cheer","Grow with me","Earn XP and level up — I unlock a new look at levels 5, 10, 15 and 25. Finish a unit and we jump to the top together!"],
     ["cheer","Let's begin!","One lesson a day is enough to start. Tap dotted words to see them in Russian, and press ? whenever you need help."]],
  how:[["bookOpen","Learn","Short lesson pages with step-by-step examples and sliders to play with."],["pen","Practice","Unlimited questions. After a mistake you see why each answer is right or wrong."],["repeat","Review","Flashcards and your own mistakes come back until they stick."],["target","Test","A diagnostic builds your plan; practice tests track your score."]],
  tools:[["graph","Graphing"],["calc","Calculator"],["sigma","Formulas"],["draw","Scratchpad"]],chips:["units","lessons","question types","unlimited practice"]},
 ru:{skip:"Пропустить",next:"Далее",back:"Назад",go:"Поехали!",
  s:[["cheer","Привет! Я Акси.","Я аксолотль — животное, которое умеет восстанавливать то, что потеряло. В этом идея AXIOM: каждая ошибка — это данные, которые помогают твоей математике стать сильнее."],
     ["happy","Добро пожаловать в AXIOM","Твой тренер по математике SAT — с нуля до 800. Каждое правило объясняется с самых основ, чтобы ты понимал, почему оно работает, а не просто запоминал."],
     ["happy","Как ты будешь учиться",""],
     ["happy","Твои инструменты","Графический калькулятор с математической клавиатурой, калькулятор, справочный лист SAT и черновик. Открывай их в «Инструментах» и перетаскивай куда угодно."],
     ["cheer","Расти вместе со мной","Получай XP и повышай уровень — на уровнях 5, 10, 15 и 25 у меня появляется новый образ. Пройди раздел — и мы вместе запрыгнем на вершину!"],
     ["cheer","Начнём!","Для начала достаточно одного урока в день. Нажимай на слова с пунктиром, чтобы увидеть перевод, и на «?», если нужна помощь."]],
  how:[["bookOpen","Учись","Короткие страницы уроков с пошаговыми примерами и ползунками."],["pen","Практикуйся","Бесконечные задания. После ошибки видно, почему каждый ответ верный или неверный."],["repeat","Повторяй","Карточки и твои ошибки возвращаются, пока не запомнятся."],["target","Проверяй","Диагностика строит план, пробные тесты показывают балл."]],
  tools:[["graph","График"],["calc","Калькулятор"],["sigma","Формулы"],["draw","Черновик"]],chips:["разделов","уроков","типов задач","бесконечная практика"]}};
var IN={i:0,lang:null};
function introOpen(){var o=el("intro");if(!o){o=document.createElement("div");o.id="intro";document.body.appendChild(o)}IN.i=0;IN.lang=IN.lang||(S.uiLang==="ru"?"ru":"en");introDraw(0);
  var sx=null;o.onpointerdown=function(e){if(e.target.closest("button"))return;sx=e.clientX};o.onpointerup=function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(dx<-50)introGo(1);else if(dx>50)introGo(-1)}}
function introSlideVis(k,T){if(k===1){var n=lessonsTotal();return '<div class="in-brand">'+AXLOGO+'<b>AXIOM</b><small>SAT Math · 0 → 800</small></div><div class="in-chips"><span><b>'+UNITS.length+'</b>'+T.chips[0]+'</span><span><b>'+n+'</b>'+T.chips[1]+'</span><span><b>'+GEN.count()+'</b>'+T.chips[2]+'</span><span><b>∞</b>'+T.chips[3]+'</span></div>'}
  if(k===2)return '<div class="in-how">'+T.how.map(function(h,i){return '<div class="in-hc" style="animation-delay:'+(0.08*i)+'s"><span class="qa-ic">'+ic(h[0])+'</span><b>'+h[1]+'</b><small>'+h[2]+'</small></div>'}).join("")+'</div>';
  if(k===3)return '<div class="in-tools">'+T.tools.map(function(t,i){return '<div class="in-tool" style="animation-delay:'+(0.1*i)+'s">'+ic(t[0])+'<span>'+t[1]+'</span></div>'}).join("")+'<div class="in-kp">'+["x²","a⁄b","√","π","|x|","sin"].map(function(k){return '<span>'+k+'</span>'}).join("")+'</div></div>';
  if(k===4)return '<div class="in-looks">'+[[1,""],[5,"star"],[10,"phones"],[15,"cap"],[25,"crown"]].map(function(l,i){return '<div style="animation-delay:'+(0.1*i)+'s">'+AXI("happy",66,"axi-bob",l[1])+'<small>Lv '+l[0]+'</small></div>'}).join("")+'</div>';
  return ""}
function introDraw(dir){var o=el("intro");if(!o)return;var T=INTRO_T[IN.lang],s=T.s[IN.i],n=T.s.length,last=IN.i===n-1;
  o.innerHTML='<div class="in-card"><div class="in-top"><div class="in-lang"><button class="'+(IN.lang==="en"?"on":"")+'" onclick="IN.lang=\'en\';introDraw(0)">EN</button><button class="'+(IN.lang==="ru"?"on":"")+'" onclick="IN.lang=\'ru\';introDraw(0)">RU</button></div><button class="in-skip" onclick="introClose(true)">'+T.skip+'</button></div>'+
   '<div class="in-slide '+(dir>0?"from-r":dir<0?"from-l":"")+'"><div class="in-axi">'+AXI(s[0],IN.i===0?150:112,IN.i===0||last?"axi-jump":"axi-bob")+'</div><div class="in-txt"><h1>'+s[1]+'</h1>'+(s[2]?'<p>'+s[2]+'</p>':'')+'</div>'+introSlideVis(IN.i,T)+'</div>'+
   '<div class="in-foot"><button class="btn ghost" onclick="introGo(-1)" '+(IN.i?"":"disabled")+'>'+ic("chevL")+T.back+'</button><div class="in-dots">'+T.s.map(function(_,k){return '<i class="'+(k===IN.i?"on":k<IN.i?"done":"")+'" onclick="IN.i='+k+';introDraw(0)"></i>'}).join("")+'</div><button class="btn pri" onclick="'+(last?"introClose()":"introGo(1)")+'">'+(last?T.go:T.next)+ic("chevR")+'</button></div></div>'}
function introGo(d){var n=INTRO_T[IN.lang].s.length,j=IN.i+d;if(j<0||j>=n)return;IN.i=j;try{sfx("tap")}catch(e){}introDraw(d)}
function introClose(skip){try{localStorage.setItem(INTRO_KEY,"1")}catch(e){}S.seenVer=AXV;saveS();var o=el("intro");if(!o)return;if(!skip){try{jingle("level")}catch(e){}confetti(120)}o.classList.add("out");setTimeout(function(){o.remove()},420)}
document.addEventListener("keydown",function(e){if(!el("intro"))return;if(e.key==="ArrowRight"){introGo(1);e.stopPropagation()}else if(e.key==="ArrowLeft"){introGo(-1);e.stopPropagation()}else if(e.key==="Escape")introClose(true)},true);
(function(){var seen=null;try{seen=localStorage.getItem(INTRO_KEY)}catch(e){}if(!seen)setTimeout(introOpen,el("splash")?1150:250)})();
(function(){var sp=document.querySelector("#splash .sp-in small");if(sp)sp.textContent="SAT Math, built from first principles · with Axi"})();
var _wnI=whatsNew;whatsNew=function(){if(el("intro"))return;_wnI()};
var _hoI=helpOpen;helpOpen=function(){_hoI();var r=document.querySelector(".modal.help .row");if(r)r.insertAdjacentHTML("afterbegin",'<button class="btn ghost" onclick="this.closest(\'.modal\').remove();introOpen()">'+ic("sparkles")+'Meet Axi — what is AXIOM?</button>')};

/* fix: the welcome form could open twice on a brand-new visit (an early, unguarded timer) */
var _obOnce=onboard;onboard=function(edit){if(document.querySelector(".modal.ob"))return;return _obOnce(edit)};

/* ---------------- daily quests ---------------- */
function qd(){var t=dayStr();if(!S.qd||S.qd.d!==t)S.qd={d:t,l:0,k:0,done:0};return S.qd}
var QUESTS=[["bookOpen","Finish 1 lesson",function(){return qd().l},1],["pen","Answer 15 questions",function(){return S.days[dayStr()]||0},15],["cards","Review 5 flashcards",function(){return qd().k},5]];
function questCheck(){var q=qd();if(q.done)return;if(QUESTS.every(function(x){return x[2]()>=x[3]})){q.done=1;saveS();addXp(30);celebrate("quest");var c=document.querySelector(".questcard");if(c)c.outerHTML=questHTML()}}
var _mlQ=markLesson;markLesson=function(uid,lid){var was=S.lessons[uid+"/"+lid];_mlQ(uid,lid);if(!was){qd().l++;saveS();questCheck()}};
var _cmQ=cardMark;cardMark=function(k){if(DECK&&DECK.cards&&DECK.cards[DECK.i]){qd().k++;saveS()}_cmQ(k);questCheck()};
var _rcQ=record;record=function(u,ok){_rcQ(u,ok);questCheck()};
function questHTML(){var q=qd(),n=QUESTS.filter(function(x){return x[2]()>=x[3]}).length;
  return '<div class="card questcard'+(q.done?" done":"")+'"><div class="qc-h"><div>'+AXI(q.done?"cheer":"happy",54,"axi-bob")+'</div><div><b>Axi’s daily quests</b><small>'+(q.done?"All done today — chest opened! +30 XP":n+" of 3 done · finish all three for a +30 XP chest")+'</small></div><span class="qc-chest'+(q.done?" open":"")+'">'+ic(q.done?"gift":"chest")+'</span></div>'+
   QUESTS.map(function(x){var v=Math.min(x[2](),x[3]),ok=v>=x[3];return '<div class="qsrow'+(ok?" ok":"")+'"><span class="qr-ic">'+ic(ok?"check":x[0])+'</span><span class="qr-t">'+x[1]+'</span><div class="pbar"><i style="width:'+Math.round(100*v/x[3])+'%"></i></div><b>'+v+'/'+x[3]+'</b></div>'}).join("")+'</div>'}
HOMESEC.push(["quests","Axi's daily quests",".questcard"]);
var _vhQ=viewHome;viewHome=function(a){_vhQ(a);if(S.homeHide.quests||a.querySelector(".questcard"))return;var anchor=a.querySelector(".axi-greet")||a.querySelector(".t-head");if(anchor)anchor.insertAdjacentHTML("afterend",questHTML())};
(function(){var _cnQ=celNext;celNext=function(){var x=CELQ[0];if(!x||x[0]!=="quest")return _cnQ();CELQ.shift();CELON=true;var o=document.createElement("div");o.className="celeb c-quest";
  o.innerHTML='<div class="cel-card">'+AXI("cheer",130,"axi-jump")+'<div class="chest-big">'+ic("gift")+'</div><h2>Daily quests complete!</h2><p>Axi opened the chest for you.</p><span class="cel-xp">'+ic("sparkles")+'+30 XP</span><button class="btn pri" id="celQOk" style="margin-top:8px">Collect</button></div>';
  document.body.appendChild(o);try{jingle("level")}catch(e){}confetti(140);function close(){o.classList.add("out");setTimeout(function(){o.remove();celNext()},350)}el("celQOk").onclick=close}})();

/* ---------------- level journey ---------------- */
function viewJourney(a){var lv=level(),top=Math.max(30,lv+6),into=S.xp%120,looks={5:"star",10:"phones",15:"cap",25:"crown"},names={star:"a glowing star",phones:"headphones",cap:"a graduation cap",crown:"a golden crown"};
  var H=top*92+120,W=360,pos=[];for(var n=1;n<=top;n++){pos[n]=[W/2+Math.sin(n*0.85)*110,H-60-(n-1)*92]}
  var path="",done="";for(n=1;n<top;n++){var A=pos[n],B=pos[n+1],seg=" C"+A[0]+","+(A[1]-46)+" "+B[0]+","+(B[1]+46)+" "+B[0]+","+B[1];if(n===1){path="M"+A[0]+","+A[1];done="M"+A[0]+","+A[1]}path+=seg;if(n<lv)done+=seg}
  var nodes="";for(n=1;n<=top;n++){var p=pos[n],st=n<lv?"done":n===lv?"cur":"todo",lk=looks[n];
    nodes+='<button class="jn '+st+(lk?" reward":"")+'" style="left:'+(p[0]-30)+'px;top:'+(p[1]-30)+'px" onclick="toast(\''+(n<=lv?"Level "+n+" reached":"Level "+n+" — "+((n-1)*120-S.xp)+" XP to go")+(lk?" · Axi gets "+names[lk]:"")+'\')">'+(st==="done"?ic("check"):'<b>'+n+'</b>')+'</button>'+
     (lk&&n!==lv?'<div class="jr" style="left:'+(p[0]+(p[0]>W/2?-140:38))+'px;top:'+(p[1]-24)+'px">'+AXI("happy",44,"",lk)+'<span>Lv '+n+'<small>'+names[lk]+'</small></span></div>':'')}
  var me=pos[lv];
  a.innerHTML='<section><div class="pg-h"><div><h1>Your journey</h1><p>Every 120 XP is a new level. Lessons, practice, quests and the gym all earn XP — Axi climbs with you.</p></div><div class="title-badge">'+ic("trophy")+'<div><small>Level</small><b>'+lv+'</b></div></div></div>'+
   '<div class="card pad jn-top"><div class="lv-h"><b>Level '+lv+' → '+(lv+1)+'</b><small>'+into+' / 120 XP</small></div><div class="pbar"><i style="width:'+Math.round(into/120*100)+'%"></i></div></div>'+
   '<div class="jmap"><div class="jwrap" style="width:'+W+'px;height:'+H+'px"><svg width="'+W+'" height="'+H+'"><path d="'+path+'" fill="none" stroke="var(--line)" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 18"/><path d="'+done+'" fill="none" stroke="url(#jg)" stroke-width="10" stroke-linecap="round"/><defs><linearGradient id="jg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--violet)"/></linearGradient></defs></svg>'+nodes+
   '<div class="jme" style="left:'+(me[0]>W/2?me[0]-122:me[0]+38)+'px;top:'+(me[1]-58)+'px">'+AXI("cheer",80,"axi-bob")+'<span>You are here</span></div></div></div></section>';
  setTimeout(function(){var c=a.querySelector(".jn.cur");if(c&&c.scrollIntoView)c.scrollIntoView({block:"center"})},80)}
NAV2.splice(0,0,["/journey","Level journey","path"]);if(typeof NAVGROUPS!=="undefined")NAVGROUPS[2][2].splice(1,0,"/journey");navInit();TITLES.journey="Level journey";
var _rJ=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);if(p[0]==="journey"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;return viewJourney(a)}return _rJ()};
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#lvbar,.lvstrip");if(b&&!e.target.closest("a,button"))go("/journey")});
var _qiI=quickItems;quickItems=function(){var l=_qiI();l.splice(1,0,["sparkles","Meet Axi — what is AXIOM?","introOpen()"],["path","Level journey","go(\'/journey\')"]);return l};buildTop();
var _paI=paletteActions;paletteActions=function(){var l=_paI();l.splice(1,0,["sparkles","Meet Axi — what is AXIOM?",introOpen],["path","Level journey",function(){go("/journey")}]);return l};
whatsNew=function(){if(el("intro"))return;S.seenVer=AXV;saveS();var L=[["sparkles","Meet Axi","AXIOM's axolotl mascot — cheers, levels and unit celebrations."],["kbd","Math keypad","The graphing calculator now has powers, fractions, roots and more."],["corner","Movable tools","Drag the grapher, calculator and reference sheet anywhere."],["chest","Daily quests","Three small goals a day, with a reward chest."],["path","Level journey","See your path, level by level."]];
  var m=modal('<h2>What’s new in AXIOM '+AXV+'</h2><div class="wn">'+L.map(function(x){return '<div class="wn-i"><span class="qa-ic">'+ic(x[0])+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join("")+'</div><button class="btn pri block" data-close>Let’s go</button>',"gs");trUI(m)};
Object.assign(RU,{"Axi’s daily quests":"Ежедневные задания Акси","Finish 1 lesson":"Пройди 1 урок","Answer 15 questions":"Ответь на 15 вопросов","Review 5 flashcards":"Повтори 5 карточек","Level journey":"Путь по уровням","Your journey":"Твой путь","You are here":"Ты здесь","Daily quests complete!":"Задания дня выполнены!","Collect":"Забрать","Meet Axi — what is AXIOM?":"Знакомство с Акси — что такое AXIOM?"});

(function(){var c=`
#intro{position:fixed;inset:0;z-index:470;display:grid;place-items:center;padding:16px;background:radial-gradient(70% 60% at 50% 30%,color-mix(in srgb,var(--violet) 28%,var(--bg)),var(--bg));animation:fadeUp .35s ease both;transition:opacity .4s;touch-action:pan-y}#intro.out{opacity:0}
.in-card{width:min(640px,100%);max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:hidden;padding:20px 22px;border-radius:28px;background:var(--paper);border:1px solid var(--line);box-shadow:0 30px 90px rgba(0,0,0,.45);display:flex;flex-direction:column;gap:12px}
.in-top{display:flex;justify-content:space-between;align-items:center}.in-lang{display:flex;gap:4px;padding:3px;border-radius:999px;background:var(--soft)}.in-lang button{border:0;background:none;color:var(--ink2);font:800 12px var(--ui);padding:5px 12px;border-radius:999px;cursor:pointer}.in-lang button.on{background:var(--paper);color:var(--ink);box-shadow:var(--sh)}
.in-skip{border:0;background:none;color:var(--ink2);font:700 13px var(--ui);cursor:pointer;padding:6px}
.in-slide{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;min-height:340px;justify-content:center;flex:1 1 auto;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}.in-top,.in-foot{flex:none}.in-slide.from-r{animation:inR .4s cubic-bezier(.3,1,.4,1) both}.in-slide.from-l{animation:inL .4s cubic-bezier(.3,1,.4,1) both}
.in-txt h1{font-family:var(--disp);font-size:clamp(26px,5vw,36px);margin:0 0 6px}.in-txt p{margin:0 auto;max-width:480px;color:var(--ink2);font-size:16px;line-height:1.6}
.in-brand{display:flex;align-items:center;gap:12px}.in-brand .axlogo{width:56px;height:56px;border-radius:16px}.in-brand b{font:900 28px var(--disp);letter-spacing:.2em}.in-brand small{display:block;color:var(--ink2);font-size:12px;letter-spacing:0}
.in-chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.in-chips span{display:flex;flex-direction:column;align-items:center;min-width:92px;padding:8px 10px;border-radius:14px;background:var(--soft);font-size:12px;color:var(--ink2)}.in-chips b{font:800 22px var(--disp);color:var(--ink)}
.in-how{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}.in-hc{display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:12px;border-radius:16px;background:var(--soft);text-align:left;animation:fadeUp .4s ease both}.in-hc small{color:var(--ink2);line-height:1.4}.in-hc .qa-ic{margin:0 0 4px}
.in-tools{display:flex;flex-direction:column;align-items:center;gap:12px}.in-tools>.in-tool{display:none}.in-tools{flex-direction:row;flex-wrap:wrap;justify-content:center}.in-tool{display:flex!important;flex-direction:column;align-items:center;gap:4px;width:92px;padding:10px;border-radius:16px;background:var(--soft);font-size:12.5px;font-weight:700;animation:fpop .45s cubic-bezier(.3,1.5,.5,1) both}.in-tool .ic{width:26px;height:26px;color:var(--violet)}
.in-kp{display:flex;gap:5px;width:100%;justify-content:center}.in-kp span{min-width:40px;padding:8px;border-radius:10px;border:1px solid var(--line);background:color-mix(in srgb,var(--blue) 8%,var(--paper));font:600 15px Georgia,serif}
.in-looks{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}.in-looks>div{display:flex;flex-direction:column;align-items:center;animation:fpop .45s cubic-bezier(.3,1.5,.5,1) both}.in-looks small{font-weight:800;color:var(--ink2)}
.in-foot{display:flex;align-items:center;justify-content:space-between;gap:10px}.in-dots{display:flex;gap:6px}.in-dots i{width:8px;height:8px;border-radius:999px;background:var(--line);cursor:pointer;transition:width .25s,background .25s}.in-dots i.on{width:24px;background:linear-gradient(90deg,var(--blue),var(--violet))}.in-dots i.done{background:color-mix(in srgb,var(--violet) 50%,var(--line))}
@media(max-width:600px){.in-card{padding:16px 16px 14px}.in-how{grid-template-columns:1fr;gap:7px}.in-hc{display:grid;grid-template-columns:auto 1fr;column-gap:10px;row-gap:1px;padding:9px 11px;align-items:center}.in-hc .qa-ic{grid-row:span 2;margin:0}.in-hc small{font-size:12.5px;line-height:1.35}.in-txt p{font-size:15px}.in-slide{justify-content:flex-start;padding-top:4px}.in-how,.in-tools,.in-looks{margin-top:2px}.in-slide{min-height:0}.in-foot .btn{padding:0 12px}}
.questcard{padding:14px 16px;margin-bottom:12px}.qc-h{display:flex;align-items:center;gap:12px;margin-bottom:8px}.qc-h>div:nth-child(2){flex:1}.qc-h small{display:block;color:var(--ink2)}
.qc-chest{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:color-mix(in srgb,#e8a21c 16%,var(--paper));color:#c98500}.qc-chest .ic{width:24px;height:24px}.qc-chest.open{background:linear-gradient(135deg,#ffd34d,#f5b02e);color:#fff;animation:fpop .6s cubic-bezier(.3,1.6,.5,1) both}
.qsrow{display:grid;grid-template-columns:30px 1fr 110px 42px;align-items:center;gap:8px;padding:5px 0}.qr-ic{width:28px;height:28px;border-radius:9px;display:grid;place-items:center;background:var(--soft);color:var(--ink2)}.qr-ic .ic{width:15px;height:15px}.qsrow.ok .qr-ic{background:var(--grn);color:#fff}.qsrow.ok .qr-t{color:var(--ink2);text-decoration:line-through}.qsrow b{text-align:right;font:700 13px var(--mono)}
.questcard.done{border-color:color-mix(in srgb,#f5b02e 55%,var(--line));background:linear-gradient(135deg,color-mix(in srgb,#ffd34d 12%,var(--paper)),var(--paper))}
@media(max-width:600px){.qsrow{grid-template-columns:30px 1fr 42px;row-gap:4px}.qsrow .qr-ic{grid-row:1/3;grid-column:1}.qsrow .qr-t{grid-row:1;grid-column:2}.qsrow b{grid-row:1;grid-column:3}.qsrow .pbar{grid-column:2/4;grid-row:2}}
.chest-big{width:70px;height:70px;border-radius:20px;display:grid;place-items:center;background:linear-gradient(135deg,#ffd34d,#f5b02e);color:#fff;animation:fpop .6s .2s cubic-bezier(.3,1.6,.5,1) both;margin-top:-10px}.chest-big .ic{width:38px;height:38px}
.jn-top{margin-bottom:14px}.jmap{display:flex;justify-content:center;overflow-x:auto;padding:10px 0 40px}.jwrap{position:relative;flex:none}.jwrap>svg{position:absolute;inset:0}
.jn{position:absolute;width:60px;height:60px;border-radius:50%;border:4px solid var(--line);background:var(--paper);color:var(--ink2);display:grid;place-items:center;cursor:pointer;font:800 18px var(--disp);box-shadow:0 6px 0 color-mix(in srgb,var(--ink) 18%,transparent);transition:transform .15s}.jn:hover{transform:translateY(-3px)}
.jn.done{background:linear-gradient(135deg,var(--blue),var(--violet));border-color:transparent;color:#fff}.jn.done .ic{width:24px;height:24px;stroke-width:3}
.jn.cur{border-color:var(--violet);color:var(--violet);box-shadow:0 0 0 8px color-mix(in srgb,var(--violet) 18%,transparent),0 6px 0 color-mix(in srgb,var(--violet) 40%,transparent);animation:pulse2 2s infinite}
.jn.reward.todo{border-color:#f5b02e;color:#c98500}
.jr{position:absolute;display:flex;align-items:center;gap:6px;width:132px;line-height:1.25;font-size:12px;font-weight:800;color:#c98500}.jr small{display:block;font-weight:600;color:var(--ink2)}
.jme{position:absolute;width:80px;display:flex;flex-direction:column;align-items:center;pointer-events:none}.jme span{margin-top:-6px;padding:2px 8px;border-radius:999px;background:var(--violet);color:#fff;font-size:11px;font-weight:800;white-space:nowrap}
#lvbar,.lvstrip{cursor:pointer}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
