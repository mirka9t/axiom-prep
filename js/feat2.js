/* =====================================================================
   ZERO TO 800 — EXTRA FEATURES
   study plan · lesson notes · search everything · speed drill · text size
   ===================================================================== */
if(!S.notes)S.notes={};if(!S.drillBest)S.drillBest={};if(!S.zoom)S.zoom=1;
document.documentElement.style.setProperty("--zoom",S.zoom);

/* ---------------- STUDY PLAN ---------------- */
function planData(){
  var all=[];UNITS.forEach(function(u){if(u.id==="words")return;u.lessons.forEach(function(l){all.push({u:u,l:l,done:!!S.lessons[u.id+"/"+l.id]})})});
  var left=all.filter(function(x){return !x.done}),dl=daysLeft(),days=dl!==null&&dl>0?dl:70,buffer=Math.min(14,Math.max(2,Math.floor(days*0.2))),learn=Math.max(1,days-buffer),per=Math.max(1,Math.ceil(left.length/learn));
  return {all:all,left:left,days:days,buffer:buffer,learn:learn,per:per,hasDate:dl!==null}}
function viewPlan(a){var P=planData(),weeks=[],idx=0,start=new Date();
  for(var d=0;d<P.days&&weeks.length<20;d++){var w=Math.floor(d/7);weeks[w]=weeks[w]||{from:d,items:[],review:false};if(d<P.learn){for(var k=0;k<P.per&&idx<P.left.length;k++)weeks[w].items.push(P.left[idx++])}else weeks[w].review=true}
  var today=P.left.slice(0,P.per),pct=Math.round(100*(P.all.length-P.left.length)/Math.max(1,P.all.length));
  function dfmt(off){var x=new Date(start.getTime()+off*864e5);return x.toLocaleDateString(undefined,{day:"numeric",month:"short"})}
  a.innerHTML='<section><div class="pg-h"><div><h1>Study plan</h1><p>'+(P.hasDate?'Built from your test date: '+P.days+' days left.':'No test date yet — this plan assumes 10 weeks. <a href="javascript:onboard(true)">Set your test date</a> for a personal plan.')+'</p></div><button class="btn sm" onclick="pdfPlan()">'+ic("download")+'PDF</button></div>'+
   '<div class="pstats"><div class="card ps"><span class="stc-ic cal">'+ic("bookOpen")+'</span><div><b>'+P.left.length+'</b><small>lessons left</small></div></div><div class="card ps"><span class="stc-ic fl">'+ic("target")+'</span><div><b>'+P.per+' / day</b><small>lessons to stay on track</small></div></div><div class="card ps"><span class="stc-ic cr">'+ic("timer")+'</span><div><b>'+P.buffer+' days</b><small>final review & practice tests</small></div></div><div class="card ps"><div style="flex:1"><b>'+pct+'%</b><small>of the course done</small><div class="pbar" style="margin-top:6px"><i style="width:'+pct+'%"></i></div></div></div></div>'+
   '<div class="card pad" style="margin-top:14px"><h3 class="h3">Today</h3>'+(today.length?today.map(function(x){return '<a class="pl" href="#/lesson/'+x.u.id+'/'+x.l.id+'"><span class="pl-ic">'+ic(UICON[x.u.id]||"book")+'</span><span class="pl-t"><b>'+esc(x.l.t)+'</b><small>'+esc(x.u.title)+' · '+x.l.mins+' min</small></span>'+ic("chevR","pl-go")+'</a>'}).join(""):'<p>All lessons done! Focus on practice tests, the Question Bank and Review.</p>')+
   '<p class="muted" style="font-size:13px;margin:10px 4px 0">Also every day: 15–20 practice questions and 5 minutes in Review.</p></div>'+
   '<h2 class="sec">Week by week</h2><div class="weeks">'+weeks.map(function(w,i){return '<div class="card wk"><div class="wk-h"><b>Week '+(i+1)+'</b><small>'+dfmt(w.from)+' – '+dfmt(Math.min(w.from+6,P.days-1))+'</small></div>'+
     (w.items.length?'<ol>'+w.items.map(function(x){return '<li><a href="#/lesson/'+x.u.id+'/'+x.l.id+'">'+esc(x.l.t)+'</a> <small>'+esc(x.u.title)+'</small></li>'}).join("")+'</ol>':'')+
     (w.review?'<div class="wk-r">'+ic("timer")+' Review week: practice tests, mistake review, Top 20 traps, formula sheet.</div>':(i>=2?'<div class="wk-r">'+ic("timer")+' End of week: one practice test.</div>':''))+'</div>'}).join("")+'</div></section>'}
function pdfPlan(){var P=planData();pdfDoc("My study plan",P.left.length+" lessons left · "+P.per+" per day",'<ol>'+P.left.map(function(x){return '<li>'+esc(x.l.t)+' — <i>'+esc(x.u.title)+'</i></li>'}).join("")+'</ol>')}

/* ---------------- NOTES ---------------- */
function noteOpen(uid,lid){var key=uid+"/"+lid,u=findUnit(uid),l=u&&u.lessons.filter(function(x){return x.id===lid})[0];
  var m=modal('<h2>My notes</h2><p class="muted">'+esc(l?l.t:"")+'</p><textarea id="noteTx" class="notetx" placeholder="Write the rule in your own words, a trick you noticed, or a question for later…">'+esc((S.notes[key]||{}).t||"")+'</textarea><div class="row" style="justify-content:space-between;margin-top:10px"><small class="muted" id="noteSt">Saved automatically</small><button class="btn pri" data-close>Done</button></div>',"notem");
  var tx=el("noteTx");tx.focus();tx.oninput=function(){var v=tx.value.trim();if(v)S.notes[key]={t:tx.value,ts:dayStr()};else delete S.notes[key];saveS();el("noteSt").textContent="Saved ✓";var nb=el("noteBtn");if(nb)nb.classList.toggle("on",!!v)}}
var _vlN=viewLesson;viewLesson=function(a,uid,lid){_vlN(a,uid,lid);var top=a.querySelector(".pl-top");if(!top)return;var b=document.createElement("button");b.id="noteBtn";b.className="tb-btn"+(S.notes[uid+"/"+lid]?" on":"");b.title="My notes for this lesson";b.innerHTML=ic("pen");b.onclick=function(){noteOpen(uid,lid)};top.insertBefore(b,top.lastElementChild)};
var _pdfLN=pdfLesson;pdfLesson=function(uid,lid){var n=S.notes[uid+"/"+lid];if(!n)return _pdfLN(uid,lid);var u=findUnit(uid),l=u.lessons.filter(function(x){return x.id===lid})[0];
  pdfDoc(l.t,u.title+" · with my notes",'<div class="pd-lesson first">'+pdfStatic(l.h)+'</div><div class="pd-lesson"><h2>My notes</h2><div class="note" style="white-space:pre-wrap">'+esc(n.t)+'</div></div>')};
function viewNotes(a){var keys=Object.keys(S.notes);
  a.innerHTML='<section><div class="pg-h"><div><h1>My notes</h1><p>Everything you wrote while studying. Add notes from any lesson with the pen button at the top.</p></div>'+(keys.length?'<button class="btn sm" onclick="pdfNotes()">'+ic("download")+'PDF</button>':'')+'</div>'+
   (keys.length?keys.map(function(k){var p=k.split("/"),u=findUnit(p[0]),l=u&&u.lessons.filter(function(x){return x.id===p[1]})[0];if(!l)return "";
     return '<div class="card pad nt"><div class="nt-h">'+uic(u)+'<div><b>'+esc(l.t)+'</b><small>'+esc(u.title)+' · '+esc(S.notes[k].ts||"")+'</small></div><div class="row"><button class="btn sm" onclick="noteOpen(\''+p[0]+'\',\''+p[1]+'\')">'+ic("pen")+'Edit</button><button class="btn sm ghost" onclick="go(\'/lesson/'+p[0]+'/'+p[1]+'\')">Open lesson</button></div></div><div class="nt-t">'+esc(S.notes[k].t)+'</div></div>'}).join(""):
    '<div class="empty card">'+ic("pen")+'<p>No notes yet. Open any lesson and tap the pen at the top to write your first note.</p></div>')+'</section>'}
function pdfNotes(){pdfDoc("My notes",Object.keys(S.notes).length+" notes",Object.keys(S.notes).map(function(k){var p=k.split("/"),u=findUnit(p[0]),l=u&&u.lessons.filter(function(x){return x.id===p[1]})[0];return l?'<h2>'+esc(l.t)+'</h2><p><i>'+esc(u.title)+'</i></p><div class="note" style="white-space:pre-wrap">'+esc(S.notes[k].t)+'</div>':""}).join(""))}

/* ---------------- SEARCH EVERYTHING ---------------- */
var SIDX=null;
function searchIndex(){if(SIDX)return SIDX;SIDX=[];var t=document.createElement("div");
  UNITS.forEach(function(u){SIDX.push({k:"Unit",t:u.title,s:u.tag,h:"/unit/"+u.id,ic:UICON[u.id],txt:(u.title+" "+u.tag).toLowerCase()});
    u.lessons.forEach(function(l){t.innerHTML=l.h;var tx=t.textContent.replace(/\s+/g," ");SIDX.push({k:"Lesson",t:l.t,s:u.title,h:"/lesson/"+u.id+"/"+l.id,ic:UICON[u.id],txt:(l.t+" "+tx).toLowerCase(),raw:tx})})});
  FORMULAS.forEach(function(g){g.f.forEach(function(r){SIDX.push({k:"Formula",t:r[0]+" = "+r[1],s:g.h,h:"/formulas",ic:"sigma",txt:(r[0]+" "+r[1]+" "+g.h).toLowerCase()})})});
  GLOSS.forEach(function(g){var d=g[1].replace(/<[^>]+>/g," ");SIDX.push({k:"Word",t:g[0],s:d,h:"/glossary",ic:"type",txt:(g[0]+" "+d).toLowerCase()})});
  DICT.forEach(function(d){SIDX.push({k:"Translation",t:d.en+" — "+d.ru,s:d.cat,h:"/unit/words",ic:"lang",txt:(d.en+" "+d.ru).toLowerCase()})});
  return SIDX}
function searchOpen(){var m=modal('<div class="srch big">'+ic("search")+'<input id="gsq" placeholder="Search lessons, formulas, words… (e.g. slope, НОД, circle area)" autocomplete="off"></div><div id="gsr" class="gsr"><p class="muted">Type at least 2 letters.</p></div>',"searchm");
  var inp=el("gsq");inp.focus();inp.oninput=function(){var q=inp.value.trim().toLowerCase();if(q.length<2){el("gsr").innerHTML='<p class="muted">Type at least 2 letters.</p>';return}
    var words=q.split(/\s+/),res=searchIndex().map(function(x){var sc=0;words.forEach(function(w){var i=x.txt.indexOf(w);if(i>-1)sc+=(x.t.toLowerCase().indexOf(w)>-1?5:1)+(x.k==="Unit"?2:x.k==="Lesson"?1:0)});return [sc,x]}).filter(function(p){return p[0]>=words.length}).sort(function(a,b){return b[0]-a[0]}).slice(0,30);
    el("gsr").innerHTML=res.length?res.map(function(p){var x=p[1],snip="";if(x.raw){var i=x.raw.toLowerCase().indexOf(words[0]);if(i>-1)snip="…"+x.raw.slice(Math.max(0,i-40),i+70)+"…"}
      return '<a class="gsi" href="#'+x.h+'" data-close>'+'<span class="gs-ic">'+ic(x.ic||"book")+'</span><span class="gs-t"><b>'+esc(x.t)+'</b><small>'+x.k+' · '+esc(x.s||"")+'</small>'+(snip?'<em>'+esc(snip)+'</em>':'')+'</span></a>'}).join(""):'<p class="muted">Nothing found. Try a shorter word.</p>';
    m.querySelectorAll(".gsi").forEach(function(a){a.addEventListener("click",function(){m.remove()})})};trUI(m)}
document.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();searchOpen()}});

/* ---------------- SPEED DRILL ---------------- */
var DR=null;
var DMODES=[["times","Times tables","Multiplication up to 12 × 12"],["neg","Negative numbers","Add, subtract and multiply with signs"],["pct","Percents","Easy percents of round numbers"],["frac","Fractions","Fraction of a number, simple fraction ops"],["mix","Mixed","A bit of everything"]];
function drillQ(mode){var r=function(a,b){return a+Math.floor(Math.random()*(b-a+1))};if(mode==="mix")mode=["times","neg","pct","frac"][r(0,3)];
  if(mode==="times"){var a=r(2,12),b=r(2,12);return [a+" × "+b,a*b]}
  if(mode==="neg"){var x=r(-15,15)||3,y=r(-15,15)||-4,op=["+","−","×"][r(0,2)];return ["("+f_(x)+") "+op+" ("+f_(y)+")",op==="+"?x+y:op==="−"?x-y:x*y]}
  if(mode==="pct"){var p=[10,20,25,50,75,5,30,40][r(0,7)],n=[20,40,60,80,120,200,400][r(0,6)];return [p+"% of "+n,p*n/100]}
  var d=[2,3,4,5,6,8,10][r(0,6)],k=r(2,12),nn=r(1,d-1);return [nn+"/"+d+" of "+(d*k),nn*k]}
function f_(n){return n<0?"−"+(-n):String(n)}
function viewDrill(a){if(DR&&DR.running)return drillDraw();
  a.innerHTML='<section><div class="pg-h"><div><h1>Speed drill</h1><p>60 seconds. As many correct answers as you can. Fast mental math frees up time for the hard questions on the test.</p></div></div><div class="dgrid">'+DMODES.map(function(m){return '<button class="card dm-b" onclick="drillStart(\''+m[0]+'\')"><span class="qa-ic">'+ic(m[0]==="mix"?"sparkles":m[0]==="pct"?"percent":m[0]==="frac"?"pie":m[0]==="neg"?"ineq":"zap")+'</span><b>'+m[1]+'</b><small>'+m[2]+'</small><span class="dbest">Best: '+(S.drillBest[m[0]]||0)+'</span></button>'}).join("")+'</div></section>'}
function drillStart(mode){DR={mode:mode,score:0,miss:0,end:Date.now()+60000,running:true,q:drillQ(mode)};if(location.hash!=="#/drill")go("/drill");drillDraw();clearInterval(window._dt);window._dt=setInterval(drillTick,200)}
function drillDraw(){var a=el("app");a.innerHTML='<div class="drill"><div class="dr-top"><span class="dr-time" id="drT">60</span><span class="dr-sc">'+ic("star")+'<b id="drS">'+DR.score+'</b></span></div><div class="dr-q" id="drQ">'+esc(DR.q[0])+' = ?</div><input id="drIn" class="dr-in" inputmode="numeric" autocomplete="off" placeholder="answer"><p class="muted">Press Enter to submit. Wrong answers just move on.</p></div>';
  var i=el("drIn");i.focus();i.onkeydown=function(e){if(e.key!=="Enter")return;var v=i.value.trim().replace("−","-");if(!v)return;var ok=Math.abs(parseFloat(v)-DR.q[1])<1e-9;
    if(ok){DR.score++;sfx("ok")}else{DR.miss++;sfx("no");toast(DR.q[0]+" = "+f_(DR.q[1]))}
    var card=document.querySelector(".drill");card.classList.remove("pop","shake");void card.offsetWidth;card.classList.add(ok?"pop":"shake");
    DR.q=drillQ(DR.mode);el("drQ").textContent=DR.q[0]+" = ?";el("drS").textContent=DR.score;i.value=""};drillTick()}
function drillTick(){if(!DR||!DR.running)return;var s=Math.max(0,Math.ceil((DR.end-Date.now())/1000)),t=el("drT");if(t){t.textContent=s;t.classList.toggle("low",s<=10)}
  if(s<=0){DR.running=false;clearInterval(window._dt);var best=S.drillBest[DR.mode]||0,nb=DR.score>best;if(nb)S.drillBest[DR.mode]=DR.score;saveS();if(DR.score)addXp(Math.min(30,DR.score));sfx(nb?"level":"done");if(nb)confetti(120);
    var a=el("app");if(location.hash==="#/drill")a.innerHTML='<div class="q-wrap"><div class="q-card result enter"><div class="big-em">'+ic(nb?"trophy":"zap")+'</div><div class="score">'+DR.score+'</div><div class="lab">correct in 60 seconds'+(nb?' · new best!':' · best '+best)+'</div><p>'+DR.miss+' missed. '+(DR.score>=25?"Lightning fast.":DR.score>=15?"Solid speed — keep going.":"Speed comes with repetition. Try again!")+'</p><div class="row" style="justify-content:center"><button class="btn pri" onclick="drillStart(\''+DR.mode+'\')">'+ic("refresh")+'Again</button><button class="btn" onclick="DR=null;go(\'/drill\')">Other drills</button></div></div></div>'}}

/* ---------------- TEXT SIZE ---------------- */
var _soF=settingsOpen;settingsOpen=function(){_soF();var set=document.querySelector(".modal.settings .set");if(!set)return;
  set.insertAdjacentHTML("beforeend",'<div class="setrow"><div><b>Text size</b><small>Lessons and questions</small></div><div class="seg">'+[[1,"A"],[1.12,"A+"],[1.25,"A++"]].map(function(z){return '<button class="'+(S.zoom===z[0]?"on":"")+'" data-z="'+z[0]+'" style="font-size:'+(13*z[0])+'px">'+z[1]+'</button>'}).join("")+'</div></div>');
  set.querySelectorAll("[data-z]").forEach(function(b){b.onclick=function(){S.zoom=+b.getAttribute("data-z");saveS();document.documentElement.style.setProperty("--zoom",S.zoom);set.querySelectorAll("[data-z]").forEach(function(x){x.classList.toggle("on",x===b)})}});trUI(set)};

/* ---------------- wiring: nav, routes, Today ---------------- */
NAV2=[["/plan","Study plan","calendar"],["/notes","My notes","pen"],["/drill","Speed drill","flame"]].concat(NAV2);navInit();
(function(){var tb=el("tbTools");if(tb)tb.insertAdjacentHTML("afterbegin",'<button class="tb-btn" title="Search everything (Ctrl+K)" onclick="searchOpen()">'+ic("search")+'</button>')})();
TITLES.plan="Study plan";TITLES.notes="My notes";TITLES.drill="Speed drill";
Object.assign(RU,{"Study plan":"План подготовки","My notes":"Мои заметки","Speed drill":"Скоростная тренировка","Text size":"Размер текста","Week by week":"По неделям","lessons left":"уроков осталось","Measurement & unit conversions":"Единицы измерения","Top 20 SAT traps":"20 главных ловушек SAT","The digital SAT: format & test day":"Цифровой SAT: формат и день экзамена","Times tables":"Таблица умножения","Negative numbers":"Отрицательные числа","Percents":"Проценты","Fractions":"Дроби","Mixed":"Смешанное","Again":"Ещё раз","Other drills":"Другие тренировки","Done":"Готово","Search everything (Ctrl+K)":"Поиск"});
var _rF=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);
  if(p[0]==="plan"||p[0]==="notes"||p[0]==="drill"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;
    if(p[0]!=="drill"&&DR&&DR.running){DR.running=false;clearInterval(window._dt)}
    return p[0]==="plan"?viewPlan(a):p[0]==="notes"?viewNotes(a):viewDrill(a)}
  if(DR&&DR.running){DR.running=false;clearInterval(window._dt)}
  return _rF()};
var _vhF=viewHome;viewHome=function(a){_vhF(a);var P=planData(),pc=a.querySelector(".plan-c .ch");
  if(pc&&P.left.length)pc.insertAdjacentHTML("afterend",'<a class="pl" href="#/plan"><span class="pl-ic">'+ic("calendar")+'</span><span class="pl-t"><b>Study plan: '+P.per+' lesson'+(P.per>1?"s":"")+' today</b><small>'+P.left.length+' lessons left'+(P.hasDate?' · '+P.days+' days to the test':'')+'</small></span>'+ic("chevR","pl-go")+'</a>');
  var qa=a.querySelector(".qa");if(qa)qa.insertAdjacentHTML("beforeend",'<a class="qa-i qa-r" href="#/drill"><span class="qa-ic">'+ic("flame")+'</span><b>Speed drill</b><small>60-second mental math game</small></a><a class="qa-i qa-v" href="#/plan"><span class="qa-ic">'+ic("calendar")+'</span><b>Study plan</b><small>Your day-by-day path to test day</small></a>')};

(function(){var c=`
.pg,.q-card,.qv-card,.lesson,.prose{zoom:var(--zoom,1)}
.weeks{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.wk{padding:14px 16px}.wk-h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}.wk-h small{color:var(--ink2)}
.wk ol{margin:4px 0 0 18px;padding:0;font-size:14px;line-height:1.6}.wk li small{color:var(--ink2)}.wk-r{display:flex;gap:6px;align-items:center;margin-top:8px;font-size:13px;color:var(--violet);font-weight:600}.wk-r .ic{width:15px;height:15px}
.notetx{width:100%;min-height:200px;box-sizing:border-box;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--soft);color:var(--ink);font:500 15px/1.6 var(--ui);resize:vertical}
.notem .mbox{text-align:left}.nt{margin-bottom:12px}.nt-h{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.nt-h>div:nth-child(2){flex:1;min-width:180px}.nt-h small{display:block;color:var(--ink2)}
.nt-t{margin-top:10px;white-space:pre-wrap;line-height:1.6;padding:12px 14px;border-radius:12px;background:var(--soft)}
.empty .ic{width:36px;height:36px;color:var(--ink2)}
.searchm .mbox{text-align:left;width:min(640px,100%)}.srch.big{height:52px;font-size:16px}.gsr{max-height:60vh;overflow:auto;margin-top:10px}
.gsi{display:flex;gap:12px;align-items:flex-start;padding:10px;border-radius:12px;color:var(--ink)}.gsi:hover{background:var(--soft)}
.gs-ic{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:var(--soft);color:var(--blue);flex:none}.gs-t b{display:block}.gs-t small{color:var(--ink2);font-size:12px}.gs-t em{display:block;font-size:12.5px;color:var(--ink2);margin-top:2px}
.dgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.dm-b{display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:18px;text-align:left;cursor:pointer;color:var(--ink);font-family:var(--ui)}.dm-b small{color:var(--ink2)}.dm-b .qa-ic{background:color-mix(in srgb,var(--yel) 18%,transparent);color:var(--yel)}
.dbest{margin-top:6px;font-size:12px;font-weight:800;color:var(--violet)}
.drill{max-width:520px;margin:30px auto;text-align:center;padding:30px;border-radius:26px;background:var(--paper);border:1px solid var(--line);box-shadow:var(--sh)}
.dr-top{display:flex;justify-content:space-between;align-items:center}.dr-time{font:800 28px var(--mono);padding:4px 14px;border-radius:12px;background:var(--soft)}.dr-time.low{color:var(--red);animation:pulse 1s infinite}
.dr-sc{display:flex;align-items:center;gap:6px;font-size:22px}.dr-sc .ic{color:var(--yel);fill:var(--yel)}
.dr-q{font-family:var(--disp);font-size:clamp(34px,7vw,52px);font-weight:800;margin:30px 0 20px}
.dr-in{width:200px;text-align:center;font:800 28px var(--mono);padding:12px;border-radius:14px;border:2px solid var(--line);background:var(--soft);color:var(--ink)}.dr-in:focus{outline:none;border-color:var(--blue)}
.trapcard{display:flex;gap:14px;align-items:flex-start;margin:14px 0;padding:14px 16px;border-radius:16px;background:var(--paper);border:1px solid var(--line)}
.tc-n{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-weight:900;color:#fff;background:linear-gradient(135deg,#ff8a6b,#f0465f)}
.tc-ex{margin:6px 0;color:var(--ink2)}.tc-fix{padding:8px 12px;border-radius:10px;background:color-mix(in srgb,var(--grn) 12%,var(--paper))}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
