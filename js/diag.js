/* =====================================================================
   ZERO TO 800 — DIAGNOSTIC TEST & PERSONAL STUDY GUIDE
   ===================================================================== */
var DIAG_PLAN=[["nums","Order of operations",1],["gcf","LCM (НОК) by primes",1],["frac","Adding fractions",1],["pct","Find the whole",1],["ratio","Proportions",1],["meas","Metric conversions",1],
 ["alg","Variables on both sides",2],["poly","Factoring trinomials",2],["ineq","Solving inequalities",2],["lines","Slope from two points",2],["sys","Solving systems",2],["wp","Linear word models",2],
 ["exp","Exponent rules",2],["quad","Roots by factoring",2],["func","Evaluating functions",2],["advm","Reading growth factors",2],["model","Linear model from two points",2],
 ["data","Median",2],["prob","Simple probability",2],["geo0","Exterior angles",2],["geo1","Pythagorean theorem",2],["geo2","Circle area & circumference",2],["trig","SOH-CAH-TOA",2],["hard","One-solution quadratics",3]];
var DG=null;if(!S.diagHist)S.diagHist=[];
function diagItems(){var out=[];DIAG_PLAN.forEach(function(p){var list=GEN._S[p[0]]||[],si=-1;list.forEach(function(sk,i){if(sk[0]===p[1])si=i});if(si<0&&list.length)si=0;if(si<0)return;var it=GEN.make(p[0],p[2],si);if(it){it.uid=p[0];out.push(it)}});return out}
function viewDiag(a,sub){if(sub==="results")return diagResults(a);if(DG&&!DG.done)return diagDraw();
  var last=S.diag;
  a.innerHTML='<section><div class="pg-h"><div><h1>Diagnostic test</h1><p>Find out exactly what you know — and what to study first.</p></div></div>'+
   '<div class="grid g2"><div class="card pad diag-intro"><span class="dg-hero">'+ic("target")+'</span><h3 class="h3">How it works</h3><ul class="clean"><li><b>24 questions</b> — one from every important area of SAT Math, from basics to the 800 zone.</li><li>About <b>25–35 minutes</b>. A clock shows your time, but there’s no time limit.</li><li><b>No feedback during the test</b>, just like the real thing.</li><li>Don’t guess wildly: if you really don’t know, tap <b>“I don’t know”</b> — that makes your study guide more accurate.</li><li>At the end you get a <b>score estimate</b>, a <b>skill map</b> and a <b>personal study guide</b>, and your Study plan is re-ordered so your weak topics come first.</li></ul>'+
   '<button class="btn pri block" onclick="diagStart()">'+ic("play")+(last?"Retake the diagnostic":"Start the diagnostic")+'</button></div>'+
   '<div class="card pad"><h3 class="h3">Your results</h3>'+(last?'<div class="big-score">'+last.score+'</div><p class="muted">'+esc(last.date)+' · '+last.right+' of '+last.total+' correct</p><button class="btn" onclick="go(\'/diagnostic/results\')">'+ic("fileText")+'Open my study guide</button>'+(S.diagHist.length>1?'<div style="margin-top:14px">'+lineChart(S.diagHist.slice(-8).map(function(d){return {l:d.date.slice(5),v:d.score}}),{min:200,max:800,col:"var(--violet)",dots:1})+'</div>':''):'<p class="muted">No diagnostic yet. Take it first — it takes the guesswork out of what to study.</p>')+'</div></div></section>'}
function diagStart(){DG={items:diagItems(),i:0,ans:{},times:{},start:Date.now(),qStart:Date.now(),done:false};if(location.hash!=="#/diagnostic")go("/diagnostic");diagDraw();clearInterval(window._dgt);window._dgt=setInterval(function(){var t=el("dgTime");if(!t||!DG||DG.done){clearInterval(window._dgt);return}t.textContent=fmtS(Date.now()-DG.start)},1000)}
function diagDraw(){var a=el("app"),D=DG,it=D.items[D.i],cur=D.ans[D.i],u=findUnit(it.uid),n=D.items.length;D.qStart=Date.now();
  a.innerHTML='<div class="q-wrap"><div class="dg-top"><span>Question <b>'+(D.i+1)+'</b> of '+n+'</span><span class="qtime">'+ic("clock")+'<b id="dgTime">'+fmtS(Date.now()-D.start)+'</b></span></div><div class="q-bar"><i style="width:'+(100*D.i/n)+'%"></i></div>'+
   '<div class="q-card enter"><div class="q-tags"><span class="qt-u" style="background:'+u.color+'">'+esc(u.title)+'</span></div><div class="q-q">'+esc(it.q)+'</div>'+
   (it.t==="mc"?it.c.map(function(c,i){return '<button class="opt'+(cur===i?" sel":"")+'" onclick="diagAns('+i+')"><span class="k">'+"ABCD".charAt(i)+'</span><span>'+esc(c)+'</span></button>'}).join(""):'<div class="numin"><input id="dgIn" placeholder="type your answer" value="'+esc(cur==null||cur==="?"?"":cur)+'" autocomplete="off" onkeydown="if(event.key===\'Enter\')diagNext()"></div>')+
   '<div class="navrow" style="margin-top:16px;flex-wrap:wrap;gap:8px"><button class="btn ghost" onclick="diagAns(\'?\');diagNext()">I don\'t know</button><span style="flex:1"></span>'+(D.i?'<button class="btn" onclick="diagMove(-1)">'+ic("chevL")+'Back</button>':'')+'<button class="btn pri" onclick="diagNext()">'+(D.i<n-1?"Next":"Finish & see results")+ic("chevR")+'</button></div></div>'+
   '<p class="muted" style="text-align:center;font-size:13px">Tools: <a href="javascript:calcOpen()">calculator</a> · <a href="javascript:graphOpen()">graphing calculator</a> · <a href="javascript:refOpen()">reference sheet</a> · <a href="javascript:scratchOpen()">scratchpad</a></p></div>';
  figInject(a.querySelector(".q-card"),it);var i2=el("dgIn");if(i2)i2.focus()}
function diagAns(v){DG.ans[DG.i]=v;if(typeof v==="number")document.querySelectorAll(".opt").forEach(function(o,j){o.classList.toggle("sel",j===v)})}
function diagMove(d){diagSaveInput();DG.times[DG.i]=(DG.times[DG.i]||0)+(Date.now()-DG.qStart);DG.i+=d;diagDraw()}
function diagSaveInput(){var i=el("dgIn");if(i&&i.value.trim())DG.ans[DG.i]=i.value.trim()}
function diagNext(){diagSaveInput();if(DG.ans[DG.i]==null){toast("Answer, or tap “I don't know”");return}sfx("tap");if(DG.i<DG.items.length-1)return diagMove(1);DG.times[DG.i]=(DG.times[DG.i]||0)+(Date.now()-DG.qStart);diagFinish()}
function diagFinish(){var D=DG;D.done=true;clearInterval(window._dgt);var res={},right=0,wsum=0,wtot=0;
  D.items.forEach(function(it,i){var v=D.ans[i],ok=v!=="?"&&v!=null&&(it.t==="mc"?v===it.a:checkNum(it.a,v)),dk=v==="?",w=it.d||2;if(ok){right++;wsum+=w}wtot+=w;
    res[it.uid]={st:ok?"c":dk?"d":"w",t:Math.round((D.times[i]||0)/1000),q:it.q,ans:it.t==="mc"?it.c[it.a]:String(it.a),yours:dk?"I don't know":v==null?"—":it.t==="mc"?it.c[v]:String(v),s:it.s,sk:it.sk};
    record(it.uid,ok);skUpdate(it,ok);if(!ok){var u=findUnit(it.uid);if(u)logMistake2(u,it,res[it.uid].ans)}});
  var score=Math.round((200+600*Math.pow(wsum/wtot,1.1))/10)*10;
  S.diag={date:dayStr(),score:score,right:right,total:D.items.length,res:res,mins:Math.round((Date.now()-D.start)/60000)};S.diagHist.push({date:dayStr(),score:score});addXp(40);saveS();checkBadges();
  sfx("done");confetti(140);go("/diagnostic/results")}
function diagPriority(uid){var d=S.diag;if(!d||!d.res)return 1;var r=d.res[uid];if(!r){var D=domainOf(uid),bad=D.units.filter(function(id){return d.res[id]&&d.res[id].st!=="c"}).length;return bad?1:2}return r.st==="c"?(r.t>120?1:3):0}
function diagResults(a){var d=S.diag;if(!d)return go("/diagnostic");
  var doms=DOMAINS.filter(function(D){return D.id!=="pro"}).map(function(D){var tot=0,ok=0;D.units.forEach(function(id){var r=d.res[id];if(r){tot++;if(r.st==="c")ok++}});return [D,ok,tot]});
  var fix=[],grow=[],keep=[];UNITS.forEach(function(u){if(u.id==="words")return;var p=diagPriority(u.id);(p===0?fix:p===1?grow:keep).push(u)});
  function unitRow(u,why){var mins=u.lessons.reduce(function(s,l){return s+l.mins},0),r=d.res[u.id];return '<a class="gd-row" href="#/unit/'+u.id+'">'+uic(u)+'<div><b>'+esc(u.title)+'</b><small>'+why+' · '+u.lessons.length+' lessons · ~'+Math.round(mins/60*10)/10+' h</small></div>'+(r?'<span class="gd-st '+r.st+'">'+(r.st==="c"?ic("check"):r.st==="d"?"?":ic("x"))+'</span>':'')+ic("chevR","pl-go")+'</a>'}
  var topFix=fix.slice(0,3).map(function(u){return u.title}).join(", ");
  a.innerHTML='<section class="dres"><div class="pg-h"><div><h1>Your diagnostic results</h1><p>'+esc(d.date)+' · '+d.right+' of '+d.total+' correct · '+d.mins+' min</p></div><div class="row"><button class="btn sm" onclick="pdfGuide()">'+ic("download")+'PDF</button><button class="btn sm" onclick="DG=null;go(\'/diagnostic\')">'+ic("refresh")+'Retake</button></div></div>'+
   '<div class="grid g2"><div class="card pad" style="text-align:center"><span class="eyebrow">Estimated SAT Math score</span><div class="big-score">'+d.score+'</div><div class="pbar"><i style="width:'+Math.round((d.score-200)/6)+'%"></i></div><p class="muted" style="font-size:13px;margin-top:10px">A starting estimate from 24 questions — your Practice Tests will make it more precise.</p></div>'+
   '<div class="card pad"><h3 class="h3">By area</h3>'+doms.map(function(x){var p=x[2]?Math.round(100*x[1]/x[2]):0;return '<div class="dbar"><span>'+esc(x[0].name)+'</span><div class="bar-t"><i data-w="'+p+'"></i></div><b>'+x[1]+'/'+x[2]+'</b></div>'}).join("")+'</div></div>'+
   '<div class="card pad gd-sum">'+ic("compass")+'<div><b>Your study guide in one sentence</b><p>'+(fix.length?'Start with <b>'+esc(topFix)+'</b>, then strengthen the yellow topics, and keep the green ones fresh with Review. Your Study plan has been re-ordered to match.':'Excellent — no big gaps. Focus on the 800 zone, the SAT traps and timed Practice Tests.')+'</p><div class="row"><button class="btn pri" onclick="go(\'/plan\')">'+ic("calendar")+'Open my study plan</button>'+(fix[0]?'<button class="btn" onclick="go(\'/unit/'+fix[0].id+'\')">'+ic("play")+'Start: '+esc(fix[0].title)+'</button>':'')+'</div></div></div>'+
   '<div class="gd-cols"><div><h2 class="sec"><span class="dotc w"></span>1 · Fix first</h2>'+(fix.length?fix.map(function(u){return unitRow(u,"missed in the diagnostic")}).join(""):'<p class="muted">Nothing — great work.</p>')+'</div>'+
   '<div><h2 class="sec"><span class="dotc y"></span>2 · Strengthen</h2>'+(grow.length?grow.map(function(u){var r=d.res[u.id];return unitRow(u,r&&r.st==="c"?"correct but slow":"not tested — weak area nearby")}).join(""):'<p class="muted">Nothing here.</p>')+'</div>'+
   '<div><h2 class="sec"><span class="dotc g"></span>3 · Keep fresh</h2>'+(keep.length?keep.map(function(u){return unitRow(u,d.res[u.id]?"correct and on pace":"related area looked strong")}).join(""):'<p class="muted">Nothing yet.</p>')+'</div></div>'+
   '<h2 class="sec">Every question, explained</h2>'+Object.keys(d.res).map(function(id){var r=d.res[id],u=findUnit(id);if(!u)return "";return '<div class="card pad rv '+(r.st==="c"?"ok":"no")+'"><div class="rvh"><b>'+esc(u.title)+'</b><span>'+(r.st==="c"?"✓ correct":r.st==="d"?"you didn't know":"✗ you answered "+esc(r.yours))+' · '+r.t+' s</span></div><div class="q-q" style="font-size:16px">'+esc(r.q)+'</div><div class="explain '+(r.st==="c"?"ok":"no")+'"><div class="v">Answer: '+esc(r.ans)+'</div>'+esc(r.s)+'</div></div>'}).join("")+'</section>';
  paintBars()}
function pdfGuide(){var d=S.diag;if(!d)return;var rows=UNITS.filter(function(u){return u.id!=="words"}).map(function(u){return [diagPriority(u.id),u]}).sort(function(x,y){return x[0]-y[0]});
  pdfDoc("My SAT Math study guide","Diagnostic "+d.date+" · estimated score "+d.score+" · "+d.right+"/"+d.total+" correct",'<h2>Study order</h2><ol>'+rows.map(function(r){return '<li><b>'+esc(r[1].title)+'</b> — '+["fix first","strengthen","",'keep fresh'][r[0]]+' ('+r[1].lessons.length+' lessons)</li>'}).join("")+'</ol>')}

/* study plan follows the diagnostic */
var _pdD=planData;planData=function(){var P=_pdD();if(S.diag){var ord={};UNITS.forEach(function(u,i){ord[u.id]=i});P.left.sort(function(a,b){return (diagPriority(a.u.id)-diagPriority(b.u.id))||(ord[a.u.id]-ord[b.u.id])||(a.u.lessons.indexOf(a.l)-b.u.lessons.indexOf(b.l))});P.byDiag=true}return P};
var _vpD=viewPlan;viewPlan=function(a){_vpD(a);if(S.diag){var h=a.querySelector(".pg-h p");if(h)h.insertAdjacentHTML("beforeend",' <b>Ordered by your diagnostic: weak topics first.</b>')}};

/* Today card */
var _vhD=viewHome;viewHome=function(a){_vhD(a);var anchor=a.querySelector(".fod")||a.querySelector(".lvstrip")||a.querySelector(".t-head");if(!anchor)return;
  if(!S.diag)anchor.insertAdjacentHTML("afterend",'<div class="card dgcard"><span class="dg-ic">'+ic("target")+'</span><div><b>Take the diagnostic test</b><p>24 questions, ~30 minutes. Get your score estimate and a personal study guide.</p></div><button class="btn pri" onclick="go(\'/diagnostic\')">'+ic("play")+'Start</button></div>');
  else{var fix=UNITS.filter(function(u){return u.id!=="words"&&diagPriority(u.id)===0}).slice(0,3);anchor.insertAdjacentHTML("afterend",'<div class="card dgcard"><span class="dg-ic">'+ic("compass")+'</span><div><b>Your study guide · diagnostic '+S.diag.score+'</b><p>'+(fix.length?'Focus: '+fix.map(function(u){return esc(u.title)}).join(" · "):'No big gaps — push on the 800 zone and practice tests.')+'</p></div><button class="btn" onclick="go(\'/diagnostic/results\')">Open</button></div>')}};
var _vhSU=viewHome;viewHome=function(a){_vhSU(a);var sc=a.querySelector(".startcard .row");if(sc&&!S.diag)sc.insertAdjacentHTML("afterbegin",'<button class="btn" onclick="go(\'/diagnostic\')">'+ic("target")+'Take the diagnostic first</button>')};

/* routes + nav */
NAV.splice(1,0,["/diagnostic","Diagnostic test","target"]);navInit();TITLES.diagnostic="Diagnostic test";
var _rD=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);
  if(p[0]==="diagnostic"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;return viewDiag(a,p[1])}
  return _rD()};
Object.assign(RU,{"Diagnostic test":"Диагностический тест","Your diagnostic results":"Результаты диагностики","Fix first":"Исправить в первую очередь","Strengthen":"Укрепить","Keep fresh":"Поддерживать","By area":"По разделам","Open my study plan":"Открыть план подготовки","Take the diagnostic test":"Пройди диагностический тест","I don't know":"Не знаю","Retake":"Пройти заново"});
(function(){var c=`
.dg-hero{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));margin-bottom:8px}.dg-hero .ic{width:28px;height:28px}
.dg-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;color:var(--ink2)}.dg-top .qtime{margin:0}
.gd-sum{display:flex;gap:14px;align-items:flex-start;margin-top:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--violet) 14%,var(--paper)),var(--paper))}.gd-sum>.ic{width:30px;height:30px;color:var(--violet);flex:none;margin-top:2px}.gd-sum p{margin:6px 0 12px;color:var(--ink2)}
.gd-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:1000px){.gd-cols{grid-template-columns:1fr}}
.gd-row{display:flex;align-items:center;gap:10px;padding:10px 12px;margin-bottom:8px;border-radius:14px;background:var(--paper);border:1px solid var(--line);color:var(--ink);transition:transform .15s}.gd-row:hover{transform:translateX(3px)}
.gd-row>div{flex:1;min-width:0}.gd-row b{display:block;font-size:14px}.gd-row small{color:var(--ink2);font-size:12px}.gd-row .utile{width:36px;height:36px;border-radius:11px}.gd-row .utile .ic{width:18px;height:18px}
.gd-st{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:12px;color:#fff;flex:none}.gd-st.c{background:var(--grn)}.gd-st.w{background:var(--red)}.gd-st.d{background:var(--yel)}.gd-st .ic{width:13px;height:13px;stroke-width:3}
.dotc{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:8px;vertical-align:middle}.dotc.w{background:var(--red)}.dotc.y{background:var(--yel)}.dotc.g{background:var(--grn)}
.dgcard{display:flex;align-items:center;gap:14px;padding:14px 18px;margin-bottom:12px;flex-wrap:wrap;border-color:color-mix(in srgb,var(--violet) 40%,var(--line))}.dgcard>div{flex:1;min-width:200px}.dgcard p{margin:3px 0 0;color:var(--ink2);font-size:14px}
.dg-ic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));flex:none}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
