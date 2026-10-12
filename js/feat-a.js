/* =====================================================================
   ZERO TO 800 — v2 FEATURES (A)
   state · tracking · practice engine upgrades · celebrations · badges · home
   ===================================================================== */

/* ---------- state defaults ---------- */
(function(){var d={stats:{},days:{},srs:{},mockHist:[],daily:{},profile:null,badges:{},studyMin:0,cardsSeen:0,answered:0,correctN:0,goal:"",bankCfg:null};
  for(var k in d)if(S[k]===undefined)S[k]=d[k];})();
UNITS.forEach(function(u){u.cards.forEach(function(c,i){c.k=u.id+"#"+i;c.uid=u.id});
  u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id})});
if(typeof STRATEGY!=="undefined")STRATEGY=STRATEGY.replace("Sixteen units at this pace is roughly two to three months — perfect for a December test if you start now.","Nineteen units and around ninety lessons: at one or two lessons a day that's roughly ten to twelve weeks — right on time for a December test if you start now.");

var DOMAINS=[
 {id:"alg",name:"Algebra",em:"🧩",units:["alg","ineq","lines","sys","wp"],w:"about 35% of the test"},
 {id:"adv",name:"Advanced Math",em:"🚀",units:["exp","quad","func","advm"],w:"about 35% of the test"},
 {id:"psda",name:"Problem-Solving & Data",em:"📊",units:["nums","frac","ratio","data","prob"],w:"about 15% of the test"},
 {id:"geo",name:"Geometry & Trigonometry",em:"📐",units:["geo1","geo2","trig"],w:"about 15% of the test"},
 {id:"pro",name:"Strategy & the 800 zone",em:"👑",units:["desmos","hard"],w:"the finishing touches"}];
function domainOf(uid){for(var i=0;i<DOMAINS.length;i++)if(DOMAINS[i].units.indexOf(uid)>-1)return DOMAINS[i];return DOMAINS[0]}
function pickA(a){return a[Math.floor(Math.random()*a.length)]}
function shuf(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function dayStr(off){return new Date(Date.now()+(off||0)*864e5).toISOString().slice(0,10)}
function isPseudo(R){return R&&R.u&&R.u.id.charAt(0)==="_"}

var QUOTES=[
"Math isn't a talent you're born with. It's a staircase — and you only ever need to climb the next step.",
"Every mistake you review is a point you'll never lose again.",
"Slow is smooth, smooth is fast. Write every step.",
"You don't need to feel ready. You need to open the next lesson.",
"The students who reach 800 aren't geniuses. They're the ones who came back tomorrow.",
"Confusion is not a stop sign. It's the feeling of your brain building something new.",
"Twenty focused minutes beat two distracted hours.",
"Underline what they're asking. Half of all lost points live in that one habit.",
"When you're stuck, try small numbers. Math loves to show itself on simple examples.",
"Be patient with yourself. Nobody learned fractions in a day — not even your teacher.",
"The test rewards calm people. Breathe, read, then write.",
"Every formula here was once confusing to someone who now finds it obvious. You're next.",
"Review your wrong answers like letters from your future self.",
"A streak isn't about perfection. It's about showing up small, every day.",
"Your score is not your worth. It's just a number you're learning to move.",
"Draw it. Label it. Half of geometry solves itself once it's on paper.",
"Checking your answer isn't extra work. It's the work.",
"Tonight's small lesson is December's easy question."];
function quoteOfDay(){var n=0,t=dayStr();for(var i=0;i<t.length;i++)n+=t.charCodeAt(i)*(i+1);return QUOTES[n%QUOTES.length]}

/* ---------- tracking ---------- */
function record(uid,ok){var s=S.stats[uid]||(S.stats[uid]={a:0,c:0});s.a++;if(ok)s.c++;S.answered++;if(ok)S.correctN++;
  var t=dayStr();S.days[t]=(S.days[t]||0)+1;saveS();checkBadges()}
function acc(uid){var s=S.stats[uid];return s&&s.a?Math.round(100*s.c/s.a):null}

/* ---------- celebrations ---------- */
function confetti(n){
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var c=document.createElement("canvas");c.className="confetti";document.body.appendChild(c);
  var W=c.width=innerWidth,H=c.height=innerHeight,x=c.getContext("2d"),cols=["#2b5cff","#ffcf3f","#12a56b","#ff4d6a","#7b5cff","#40c4ff"],P=[];
  for(var i=0;i<(n||140);i++)P.push({x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:pickA(cols),a:Math.random()*6,s:Math.random()*.3-.15});
  var t0=performance.now();(function fr(t){var e=t-t0;x.clearRect(0,0,W,H);
    P.forEach(function(p){p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.s;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.globalAlpha=Math.max(0,1-e/2600);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});
    if(e<2600)requestAnimationFrame(fr);else c.remove()})(t0);
}
function modal(html,cls){var m=document.createElement("div");m.className="modal "+(cls||"");m.innerHTML='<div class="mbox">'+html+'</div>';
  m.addEventListener("click",function(e){if(e.target===m||e.target.hasAttribute("data-close"))m.remove()});document.body.appendChild(m);return m}
var _addXp=addXp;
addXp=function(n){var before=level();_addXp(n);var after=level();
  if(after>before){confetti(180);modal('<div class="big-em">⭐</div><h2>Level '+after+'!</h2><p>'+esc(pickA(QUOTES))+'</p><button class="btn pri" data-close>Keep going</button>',"lvl")}};

/* ---------- badges ---------- */
function lessonsDone(){return Object.keys(S.lessons).length}
function lessonsTotal(){return UNITS.reduce(function(s,u){return s+u.lessons.length},0)}
function unitsMastered(){return UNITS.filter(function(u){return (S.quiz[u.id]||0)>=80}).length}
var BADGES=[
 ["first_lesson","📖","First step","Read your first lesson",function(){return lessonsDone()>=1}],
 ["lessons10","📚","Bookworm","Read 10 lessons",function(){return lessonsDone()>=10}],
 ["lessons_half","🧠","Half the map","Read half of all lessons",function(){return lessonsDone()>=lessonsTotal()/2}],
 ["lessons_all","🎓","Scholar","Read every lesson",function(){return lessonsDone()>=lessonsTotal()}],
 ["quiz1","🎯","First mastery","Score 80%+ on a unit quiz",function(){return unitsMastered()>=1}],
 ["units5","🏅","Five stars","Master 5 units",function(){return unitsMastered()>=5}],
 ["units_all","👑","Crowned","Master every unit",function(){return unitsMastered()>=UNITS.length}],
 ["q100","✏️","Century","Answer 100 questions",function(){return S.answered>=100}],
 ["q500","⚙️","Machine","Answer 500 questions",function(){return S.answered>=500}],
 ["q1000","🗿","Written in stone","Answer 1,000 questions",function(){return S.answered>=1000}],
 ["streak3","🌱","Habit","3-day streak",function(){return S.streak.c>=3}],
 ["streak7","🌿","Week warrior","7-day streak",function(){return S.streak.c>=7}],
 ["streak30","🌳","Unstoppable","30-day streak",function(){return S.streak.c>=30}],
 ["mock1","⏱️","Test pilot","Finish a mock test",function(){return S.mockHist.length>=1}],
 ["mock700","🚀","700 club","Score 700+ on a full mock",function(){return S.mockHist.some(function(m){return m.full&&m.score>=700})}],
 ["mock800","💯","Perfect","Score 800 on a full mock",function(){return S.mockHist.some(function(m){return m.full&&m.score>=800})}],
 ["daily7","📅","Daily devotee","Complete 7 daily challenges",function(){return Object.keys(S.daily).length>=7}],
 ["study5h","🌙","Night owl","5 hours in the study room",function(){return S.studyMin>=300}],
 ["cards100","🃏","Card shark","Review 100 flashcards",function(){return S.cardsSeen>=100}],
 ["clean","🧹","Clean slate","Clear 20 mistakes in review",function(){return (S.cleared||0)>=20}]];
function checkBadges(){BADGES.forEach(function(b){if(!S.badges[b[0]]&&b[4]()){S.badges[b[0]]=dayStr();saveS();
  setTimeout(function(){confetti(90);var t=el("toast");t.innerHTML='<b>'+b[1]+' Badge unlocked:</b> '+esc(b[2]);t.classList.add("show","gold");clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove("show","gold")},3200)},400)}})}

/* ---------- practice engine upgrades ---------- */
function startRun(R,hash){RUN=R;if(location.hash==="#"+hash){window.scrollTo(0,0);drawQuestion()}else go(hash)}
function unitGenRun(uid,d,si,mode){
  var u=findUnit(uid),items=[];
  for(var i=0;i<(mode==="quiz"?10:5);i++){var it=GEN.make(uid,mode==="quiz"?(i<3?2:3):d,si);if(it)items.push(it)}
  var R={u:u,mode:mode||"prac",items:items,i:0,correct:0,answered:false,fresh:true};
  if(mode!=="quiz"){R.endless=true;R.gen=function(){return GEN.make(uid,d,si)}}
  startRun(R,"/"+(mode==="quiz"?"quiz":"practice")+"/"+uid);
}
var _drawQuestion=drawQuestion;
drawQuestion=function(){
  _drawQuestion();var R=RUN,it=R.items[R.i];if(!it)return;
  var uu=findUnit(it.uid)||R.u,card=document.querySelector(".q-card");
  if(isPseudo(R)){var cr=document.querySelector(".crumb");if(cr)cr.innerHTML='<a href="#/">Home</a> › '+esc(R.u.title)}
  if(R.endless){var hd=document.querySelector(".q-head span");if(hd)hd.textContent="Question "+(R.i+1)+" · ∞ endless";var qb=document.querySelector(".q-bar i");if(qb)qb.style.width=(R.correct/(R.i+1)*100)+"%"}
  if(card){var dd=it.d||0,tags='<div class="q-tags"><span class="qt-u" style="background:'+uu.color+'">'+uu.em+" "+esc(uu.title)+'</span>'+(it.sk?'<span>'+esc(it.sk)+'</span>':'<span>hand-picked</span>')+(dd?'<span class="qt-d">'+["","●○○ easy","●●○ medium","●●● hard"][dd]+'</span>':'')+'</div>';
    card.insertAdjacentHTML("afterbegin",tags);card.classList.add("enter")}
};
function logMistake2(u,it,correct){
  S.mistakes=S.mistakes.filter(function(m){return m.q!==it.q});
  S.mistakes.unshift({uid:u.id,unit:u.title,q:it.q,correct:correct,explain:it.s,ts:Date.now(),item:it});
  if(S.mistakes.length>150)S.mistakes.length=150;saveS();
}
finishQ=function(ok,it,correctText){
  var R=RUN,uid=it.uid||R.u.id,u=findUnit(uid)||R.u;
  record(uid,ok);
  var card=document.querySelector(".q-card");
  if(ok){R.correct++;addXp(R.mode==="quiz"?4:5);R.combo=(R.combo||0)+1;if(R.combo>=3&&R.combo%3===0)toast("🔥 "+R.combo+" in a row!");
    if(R.u.id==="__review"){var before=S.mistakes.length;S.mistakes=S.mistakes.filter(function(m){return m.q!==it.q});if(S.mistakes.length<before){S.cleared=(S.cleared||0)+1;saveS()}}}
  else{R.combo=0;if(R.u.id!=="__review")logMistake2(u,it,String(correctText))}
  if(card){card.classList.remove("pop","shake");void card.offsetWidth;card.classList.add(ok?"pop":"shake")}
  var ex=el("exbox");
  ex.innerHTML='<div class="explain '+(ok?"ok":"no")+' rise"><div class="v">'+(ok?pickA(["Correct! ✓","Yes! Nailed it ✓","Exactly right ✓","Beautiful ✓","That's it ✓"]):"Not quite — the answer is "+esc(String(correctText)))+'</div><b>How to think about it:</b> '+esc(it.s)+(ok?'':'<div class="small-note">Saved to your mistake review — you\'ll see it again until you get it right.</div>')+'</div>';
  var last=R.i>=R.items.length-1&&!R.endless;
  el("nextrow").innerHTML=(R.endless?'<button class="btn" onclick="showResults()">Finish & see results</button>':'<span></span>')+'<button class="btn pri" id="nextBtn" onclick="nextQ()">'+(last?"See results →":"Next question →")+'</button>';
  var nb=el("nextBtn");if(nb)nb.focus({preventScroll:true});
};
nextQ=function(){var R=RUN;if(!R)return;
  if(R.endless&&R.i>=R.items.length-1){var m=R.gen();if(m)R.items.push(m)}
  if(R.i>=R.items.length-1)return showResults();R.i++;drawQuestion();window.scrollTo({top:0,behavior:"smooth"})};
document.addEventListener("keydown",function(e){
  if(!RUN||!document.querySelector(".q-card")||/INPUT|TEXTAREA/.test((e.target||{}).tagName||""))return;
  if(e.key==="Enter"&&RUN.answered){nextQ();return}
  var k="abcd1234".indexOf(e.key.toLowerCase());if(k>-1&&!RUN.answered&&RUN.items[RUN.i].t==="mc"){var i=k%4;if(i<RUN.items[RUN.i].c.length)pick(i)}});

var _showResults=showResults;
showResults=function(){
  var R=RUN;if(!R)return;var n=R.endless?R.i+1:R.items.length,pct=Math.round(100*R.correct/Math.max(1,n));
  if(!isPseudo(R)&&!R.endless){_showResults();if(pct>=80)confetti();checkBadges();return}
  var a=el("app"),miss={};R.items.slice(0,n).forEach(function(it,i){});
  if(R.u.id==="__daily"&&!S.daily[dayStr()]){S.daily[dayStr()]=pct;addXp(25);saveS();checkBadges()}
  var emoji=pct>=90?"🏆":pct>=70?"💪":"📖",msg=pct>=90?"Outstanding. This is 800-level work.":pct>=70?"Strong work — a little more and it's automatic.":"Good effort. Read the explanations of the ones you missed, then try again.";
  var again=R.u.id==="__bank"?'<button class="btn pri" onclick="bankStart(S.bankCfg)">Another set</button>':R.u.id==="__review"?'<button class="btn pri" onclick="reviewRun()">Redo remaining</button>':R.u.id==="__daily"?'<button class="btn pri" onclick="go(\'/bank\')">Open question bank</button>':R.endless?'<button class="btn pri" onclick="unitGenRun(\''+R.u.id+'\',2)">Keep practicing</button>':'';
  a.innerHTML='<div class="q-wrap"><div class="q-card result enter"><div class="big-em">'+emoji+'</div><div class="score">'+pct+'%</div><div class="lab">'+R.correct+' of '+n+' correct · '+esc(R.u.title)+'</div><p style="margin:14px 0">'+msg+'</p>'+
    (R.u.id==="__daily"?'<p class="muted">Daily challenge done! +25 XP. A new one unlocks tomorrow.</p>':'')+
    '<div class="navrow" style="justify-content:center;gap:10px;flex-wrap:wrap"><button class="btn" onclick="go(\''+(R.u.id==="__review"?"/review":R.u.id.charAt(0)==="_"?"/":"/unit/"+R.u.id)+'\')">Back</button>'+again+(S.mistakes.length?'<button class="btn ghost" onclick="go(\'/review\')">Mistakes ('+S.mistakes.length+')</button>':'')+'</div></div></div>';
  if(pct>=80)confetti();RUN=null;
};
reviewRun=function(){
  var items=[];S.mistakes.forEach(function(m){if(m.item){items.push(m.item);return}
    var u=findUnit(m.uid);if(!u)return;var all=u.prac.concat(u.quiz);for(var i=0;i<all.length;i++)if(all[i].q===m.q){items.push(all[i]);break}});
  if(!items.length){toast("Nothing to redo");return}
  startRun({u:{id:"__review",title:"Mistake review",color:"#ffe0ea",em:"🔁"},mode:"prac",items:items.slice(0,30),i:0,correct:0,answered:false},"/run");
};

/* ---------- lesson upgrades ---------- */
function qcCheck(btn){var box=btn.closest(".qc"),inp=box.querySelector("input"),v=inp.value;if(!v.trim()){toast("Type an answer first");return}
  var ok=checkNum(box.getAttribute("data-a").split("|"),v),out=box.querySelector(".qc-out");
  out.innerHTML='<div class="explain '+(ok?"ok":"no")+' rise"><div class="v">'+(ok?"Correct! ✓":"Not quite — try again, or tap “Show me”.")+'</div>'+(ok?esc(box.getAttribute("data-s")):"")+'</div>';
  box.classList.remove("pop","shake");void box.offsetWidth;box.classList.add(ok?"pop":"shake");if(ok&&!box._x){box._x=1;addXp(2)}}
function qcShow(btn){var box=btn.closest(".qc");box.querySelector(".qc-out").innerHTML='<div class="explain rise"><div class="v">Answer: '+esc(box.getAttribute("data-a").split("|")[0])+'</div>'+esc(box.getAttribute("data-s"))+'</div>'}
var _viewLesson=viewLesson;
viewLesson=function(a,uid,lid){_viewLesson(a,uid,lid);var u=findUnit(uid);if(!u)return;
  var dots=u.lessons.map(function(l){return '<a href="#/lesson/'+uid+'/'+l.id+'" title="'+esc(l.t)+'" class="ldot'+(l.id===lid?" cur":"")+(S.lessons[uid+"/"+l.id]?" done":"")+'"></a>'}).join("");
  var art=a.querySelector(".lesson");if(art)art.insertAdjacentHTML("afterbegin",'<div class="ldots">'+dots+'<span>'+(u.lessons.map(function(l){return l.id}).indexOf(lid)+1)+' / '+u.lessons.length+'</span></div>');};
var _markLesson=markLesson;
markLesson=function(uid,lid){var was=S.lessons[uid+"/"+lid];_markLesson(uid,lid);if(!was){confetti(60);checkBadges()}};
window.addEventListener("scroll",function(){var b=el("readbar");if(!b)return;var L=document.querySelector(".lesson");if(!L){b.style.width="0";return}
  var h=document.documentElement,p=h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight);b.style.width=Math.min(100,p*100)+"%"},{passive:true});

/* ---------- unit page upgrades ---------- */
var _viewUnit=viewUnit;
viewUnit=function(a,id,tab){_viewUnit(a,id,tab);var u=findUnit(id);if(!u)return;tab=tab||"lessons";var body=el("tabbody"),sk=GEN.skills(id),ac=acc(id);
  if(ac!==null){var mb=a.querySelector(".mini-bar");if(mb)mb.insertAdjacentHTML("afterend",'<div class="chipset"><span class="chip">🎯 accuracy '+ac+'% on '+S.stats[id].a+' questions</span><span class="chip">'+esc(domainOf(id).em+" "+domainOf(id).name)+'</span></div>')}
  if(tab==="practice"&&sk.length)body.insertAdjacentHTML("beforeend",'<div class="card pad" style="margin-top:14px"><h3 style="font-family:var(--disp)">♾ Endless practice</h3><p class="muted">Fresh questions with new numbers every time — they never run out. Perfect for making a skill automatic.</p>'+
    '<div class="row"><button class="btn gd" onclick="unitGenRun(\''+id+'\',1)">Easy</button><button class="btn pri" onclick="unitGenRun(\''+id+'\',2)">Medium</button><button class="btn warn" onclick="unitGenRun(\''+id+'\',3)">Hard</button></div>'+
    '<h4 style="margin:16px 0 8px">Or drill one skill:</h4><div class="chipset">'+sk.map(function(s,i){return '<button class="tog" onclick="unitGenRun(\''+id+'\',0,'+i+')">'+esc(s)+'</button>'}).join("")+'</div></div>');
  if(tab==="quiz"&&sk.length)body.insertAdjacentHTML("beforeend",'<div class="card pad" style="margin-top:14px"><h3 style="font-family:var(--disp)">🎲 Fresh quiz</h3><p class="muted">10 brand-new generated questions (medium & hard). Counts toward mastery just like the regular quiz — take it again and again with different numbers.</p><button class="btn pri" onclick="unitGenRun(\''+id+'\',2,null,\'quiz\')">Start a fresh quiz</button></div>');
};
var _viewUnits=viewUnits;
viewUnits=function(a){_viewUnits(a);var h=a.querySelector(".sec-h h2");if(h)h.textContent="All "+UNITS.length+" units";};

/* ---------- onboarding ---------- */
function onboard(edit){if(document.querySelector(".modal.ob"))return;var p=S.profile||{};
  var m=modal('<div class="big-em">👋</div><h2>'+(edit?"Your details":"Welcome to AXIOM")+'</h2><p class="muted">Three quick questions so the app can plan with you. You can change them anytime in Progress.</p>'+
   '<label class="fl">What should I call you?<input id="obName" value="'+esc(p.name||"")+'" placeholder="your name"></label>'+
   '<label class="fl">When is your SAT?<input id="obDate" type="date" value="'+esc(p.date||"")+'"></label>'+
   '<label class="fl">Your target math score<select id="obTarget">'+[650,700,750,800].map(function(v){return '<option'+((p.target||800)===v?" selected":"")+'>'+v+'</option>'}).join("")+'</select></label>'+
   '<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close>'+(edit?"Cancel":"Skip")+'</button><button class="btn pri" id="obSave">Save</button></div>',"ob");
  el("obSave").onclick=function(){S.profile={name:el("obName").value.trim(),date:el("obDate").value,target:+el("obTarget").value};saveS();m.remove();router()};
  if(!edit)m.addEventListener("click",function(e){if(e.target.hasAttribute("data-close")){S.profile={name:"",date:"",target:800};saveS()}});
}
function daysLeft(){var p=S.profile;if(!p||!p.date)return null;return Math.ceil((new Date(p.date+"T09:00:00")-new Date())/864e5)}

/* ---------- new home ---------- */
function nextLesson(){for(var i=0;i<UNITS.length;i++){var u=UNITS[i];for(var j=0;j<u.lessons.length;j++){if(!S.lessons[u.id+"/"+u.lessons[j].id])return {u:u,l:u.lessons[j]}}}return null}
function dueCards(){var t=dayStr(),n=0;for(var k in S.srs)if(S.srs[k].due<=t)n++;return n}
function weekBars(){var mx=1,d=[];for(var i=6;i>=0;i--){var k=dayStr(-i),v=S.days[k]||0;mx=Math.max(mx,v);d.push([k,v])}
  return '<div class="wbars">'+d.map(function(x){var wd=new Date(x[0]+"T12:00:00").toLocaleDateString(undefined,{weekday:"narrow"});return '<div class="wb"><i style="height:'+Math.max(4,x[1]/mx*70)+'px" title="'+x[1]+' questions"></i><span>'+wd+'</span></div>'}).join("")+'</div>'}
viewHome=function(a){
  if(!S.profile)setTimeout(function(){onboard(false)},400);
  var o=overall(),hr=new Date().getHours(),nm=S.profile&&S.profile.name?", "+esc(S.profile.name):"",
    greet=hr<5?"🌙 Late-night study"+nm+"? Respect.":hr<12?"☀️ Good morning"+nm:hr<18?"🌤️ Good afternoon"+nm:"🌙 Good evening"+nm,
    nl=nextLesson(),dl=daysLeft(),doneDaily=S.daily[dayStr()]!=null,due=dueCards(),acct=S.answered?Math.round(100*S.correctN/S.answered):0;
  var plan=[
    nl?['📖','Read: '+esc(nl.l.t),esc(nl.u.title),"/lesson/"+nl.u.id+"/"+nl.l.id,false]:['🎓','All lessons read!','Keep drilling with the bank',"/bank",true],
    ['⚡','Daily challenge',doneDaily?'Done today — '+S.daily[dayStr()]+'%':'5 questions · +25 XP',"/daily",doneDaily],
    ['🃏','Smart flashcards',due?due+' cards due today':'Learn new cards',"/srs",false],
    S.mistakes.length?['🔁','Review mistakes',S.mistakes.length+' waiting',"/review",false]:['🎲','Question bank','Build a practice set',"/bank",false]];
  a.innerHTML=
  '<div class="hero aurora"><div class="big"><div class="greet">'+greet+'</div>'+
   '<h1>'+(S.xp?"Let's keep climbing to 800.":"Your journey to 800 starts here.")+'</h1>'+
   '<p>'+esc(quoteOfDay())+' <span class="sig">— your teacher</span></p>'+
   (dl!==null?'<div class="count"><b>'+Math.max(0,dl)+'</b> day'+(dl===1?"":"s")+' until your SAT · target '+(S.profile.target||800)+'</div>':'')+
   '<div class="row">'+(nl?'<button class="btn pri" onclick="go(\'/lesson/'+nl.u.id+'/'+nl.l.id+'\')">▶ Continue learning</button>':'<button class="btn pri" onclick="go(\'/mock\')">Take a mock test</button>')+
   '<button class="btn ghost" onclick="go(\'/study\')">🕯️ Study room</button></div></div>'+
   '<div class="card pad gauge"><div class="ring" style="--p:'+Math.min(100,Math.round(o.mastery*100))+'"><div class="hole"><b class="countup" data-to="'+o.score+'">'+o.score+'</b><small>est. score</small></div></div>'+
   '<div class="cap">Grows with lessons, quizzes and your accuracy. '+(S.mockHist.length?'Latest mock: <b>'+S.mockHist[S.mockHist.length-1].score+'</b>':'Take a mock test for a real reading.')+'</div></div></div>'+
  '<div class="dash"><div class="card pad"><h3 class="h3">Today\'s plan</h3>'+plan.map(function(p){return '<div class="plan'+(p[4]?" done":"")+'" onclick="go(\''+p[3]+'\')"><span class="pe">'+p[0]+'</span><div><b>'+p[1]+'</b><small>'+p[2]+'</small></div><span class="go">'+(p[4]?"✓":"›")+'</span></div>'}).join("")+'</div>'+
   '<div class="card pad"><h3 class="h3">This week</h3>'+weekBars()+'<div class="stat mini4"><div class="b"><b>'+S.streak.c+' 🔥</b><span>day streak</span></div><div class="b"><b>'+S.answered+'</b><span>questions</span></div><div class="b"><b>'+acct+'%</b><span>accuracy</span></div><div class="b"><b>'+o.lessonsDone+'/'+o.lessonsTotal+'</b><span>lessons</span></div></div></div></div>'+
  '<div class="sec-h"><h2>Your tools</h2></div><div class="grid g-auto tools">'+
   tile("🎲","Question bank",GEN.count()+" generators — unlimited questions","/bank")+tile("⏱️","Mock SAT test","Timed, adaptive, scored like the real one","/mock")+
   tile("⚡","Daily challenge","5 fresh questions every day","/daily")+tile("🃏","Smart flashcards","Spaced repetition — memory in stone","/srs")+
   tile("🕯️","Study room","Focus timer & rain sounds","/study")+tile("📈","Progress","Scores, weak spots, badges","/progress")+
   tile("🧮","Formula sheet","Everything on one page","/formulas")+tile("🎯","Test strategy","Pacing, Desmos, guessing","/strategy")+
   tile("🔁","Mistake review",S.mistakes.length+" to fix","/review")+tile("🔤","Glossary","Every word in plain English","/glossary")+'</div>'+
  DOMAINS.map(function(D){return '<div class="sec-h"><h2>'+D.em+' '+esc(D.name)+'</h2><span class="k">'+esc(D.w)+'</span></div><div class="grid g-auto">'+D.units.map(function(id){var u=findUnit(id);return unitCard(u,UNITS.indexOf(u))}).join("")+'</div>'}).join("");
  paintBars();
};

/* ---------- score estimate also rewards practice accuracy ---------- */
var _overall=overall;
overall=function(){var o=_overall(),af=S.answered?(S.correctN/S.answered)*Math.min(1,S.answered/600):0;
  o.mastery=o.lessonFrac*0.35+o.quizFrac*0.45+af*0.2;o.score=Math.round((200+600*o.mastery)/10)*10;return o};
