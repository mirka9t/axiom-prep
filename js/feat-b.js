/* =====================================================================
   ZERO TO 800 — v2 FEATURES (B)
   bank · mock test · daily · smart flashcards · study room · progress · router
   ===================================================================== */

/* ================= QUESTION BANK ================= */
var BANK={units:{},d:"mix",n:20,src:"mix"};
function handPool(units){var p=[];units.forEach(function(id){var u=findUnit(id);if(u)p=p.concat(u.prac,u.quiz)});return p}
function viewBank(a,tab){
  tab=tab||"build";if(!Object.keys(BANK.units).length)UNITS.forEach(function(u){BANK.units[u.id]=1});
  var hand=handPool(UNITS.map(function(u){return u.id})).length;
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Question bank</div>'+
   '<div class="sec-h"><h2>🎲 Question bank</h2><span class="k">'+GEN.count()+' question generators (unlimited) + '+hand+' hand-written questions</span></div>'+
   '<div class="tabs"><button class="'+(tab==="build"?"on":"")+'" onclick="go(\'/bank\')">🛠️ Build a set</button><button class="'+(tab==="browse"?"on":"")+'" onclick="go(\'/bank/browse\')">📚 Browse all</button></div><div id="bankbody"></div>';
  var b=el("bankbody");
  if(tab==="browse")return bankBrowse(b);
  var weak=UNITS.filter(function(u){var x=acc(u.id);return x!==null&&x<75&&S.stats[u.id].a>=5}).map(function(u){return u.id});
  b.innerHTML='<div class="card pad"><h3 class="h3">1 · Choose topics</h3><div class="row" style="margin-bottom:10px"><button class="btn sm" onclick="bankAll(1)">Select all</button><button class="btn sm ghost" onclick="bankAll(0)">Clear</button>'+(weak.length?'<button class="btn sm warn" onclick="bankWeak()">🎯 My weak spots ('+weak.length+')</button>':'')+'</div>'+
   DOMAINS.map(function(D){return '<div class="bdom"><div class="bdh">'+D.em+' '+esc(D.name)+'</div><div class="chipset">'+D.units.map(function(id){var u=findUnit(id);return '<button class="tog'+(BANK.units[id]?" on":"")+'" data-u="'+id+'" onclick="bankTog(this)">'+u.em+' '+esc(u.title)+'</button>'}).join("")+'</div></div>'}).join("")+
   '<h3 class="h3" style="margin-top:18px">2 · Difficulty</h3>'+seg("d",[["mix","Mixed"],[1,"Easy"],[2,"Medium"],[3,"Hard"]],BANK.d)+
   '<h3 class="h3" style="margin-top:18px">3 · How many</h3>'+seg("n",[[10,"10"],[20,"20"],[30,"30"],[50,"50"],[0,"∞ endless"]],BANK.n)+
   '<h3 class="h3" style="margin-top:18px">4 · Question source</h3>'+seg("src",[["mix","Mix of both"],["gen","Fresh generated"],["hand","Hand-written"]],BANK.src)+
   '<button class="btn pri block" style="margin-top:22px" onclick="bankStart()">Start practicing →</button></div>';
}
function seg(key,opts,cur){return '<div class="seg">'+opts.map(function(o){return '<button class="'+(String(o[0])===String(cur)?"on":"")+'" onclick="BANK[\''+key+'\']='+(typeof o[0]==="number"?o[0]:"'"+o[0]+"'")+';viewBank(el(\'app\'))">'+o[1]+'</button>'}).join("")+'</div>'}
function bankTog(b){var id=b.getAttribute("data-u");if(BANK.units[id])delete BANK.units[id];else BANK.units[id]=1;b.classList.toggle("on")}
function bankAll(on){BANK.units={};if(on)UNITS.forEach(function(u){BANK.units[u.id]=1});viewBank(el("app"))}
function bankWeak(){BANK.units={};UNITS.forEach(function(u){var x=acc(u.id);if(x!==null&&x<75&&S.stats[u.id].a>=5)BANK.units[u.id]=1});viewBank(el("app"))}
function bankStart(cfg){
  cfg=cfg||{units:Object.keys(BANK.units),d:BANK.d,n:BANK.n,src:BANK.src};
  if(!cfg.units.length){toast("Pick at least one topic");return}
  S.bankCfg=cfg;saveS();
  var d=cfg.d==="mix"?"mix":+cfg.d,n=cfg.n||8,items=[];
  var genUnits=cfg.units.filter(function(id){return GEN.skills(id).length});
  if(cfg.src!=="gen"){var pool=shuf(handPool(cfg.units));items=pool.slice(0,cfg.src==="hand"?n:Math.ceil(n/2))}
  if(cfg.src!=="hand"&&genUnits.length)items=items.concat(GEN.set(genUnits,n-items.length,d));
  shuf(items);
  var R={u:{id:"__bank",title:"Question bank",em:"🎲",color:"#e8edff"},mode:"prac",items:items,i:0,correct:0,answered:false};
  if(!cfg.n){R.endless=true;R.gen=function(){var id=pickA(genUnits.length?genUnits:cfg.units);return GEN.make(id,d==="mix"?1+Math.floor(Math.random()*3):d)||pickA(handPool(cfg.units))}}
  if(!items.length){toast("No questions for that choice");return}
  startRun(R,"/run");
}
function bankBrowse(b){
  b.innerHTML='<div class="card pad"><div class="row"><select id="bbU" class="search" style="max-width:260px"><option value="">All units</option>'+UNITS.map(function(u){return '<option value="'+u.id+'">'+u.em+' '+esc(u.title)+'</option>'}).join("")+'</select><input id="bbQ" class="search" placeholder="Search questions… (slope, percent, circle)"></div><div id="bbL" style="margin-top:14px"></div></div>';
  function draw(){var u=el("bbU").value,q=el("bbQ").value.toLowerCase(),out=[];
    UNITS.forEach(function(un){if(u&&un.id!==u)return;un.prac.concat(un.quiz).forEach(function(it){if(!q||(it.q+" "+it.s).toLowerCase().indexOf(q)>-1)out.push([un,it])})});
    el("bbL").innerHTML='<div class="muted" style="margin-bottom:8px">'+out.length+' questions</div>'+out.slice(0,80).map(function(p,i){var it=p[1],ans=it.t==="mc"?it.c[it.a]:it.a;
      return '<div class="bq"><div class="bqh"><span class="qt-u" style="background:'+p[0].color+'">'+p[0].em+' '+esc(p[0].title)+'</span></div><div class="bqq">'+esc(it.q)+'</div>'+(it.t==="mc"?'<ol type="A" class="bqc">'+it.c.map(function(c){return '<li>'+esc(c)+'</li>'}).join("")+'</ol>':'')+
      '<details><summary>Show answer</summary><div class="explain ok"><div class="v">'+esc(ans)+'</div>'+esc(it.s)+'</div></details></div>'}).join("")+(out.length>80?'<div class="muted">Showing 80 — search or pick a unit to narrow down.</div>':'');}
  el("bbU").onchange=draw;el("bbQ").oninput=draw;draw();
}

/* ================= MOCK TEST ================= */
var MOCK=null;
function mockItems(n,diffs){
  var plan=[];var w=[["alg",.35],["adv",.35],["psda",.15],["geo",.15]];
  w.forEach(function(x){for(var i=0;i<Math.round(n*x[1]);i++)plan.push(x[0])});while(plan.length<n)plan.push("alg");plan.length=n;
  var seen={},out=[];
  plan.forEach(function(dm){var D=DOMAINS.filter(function(z){return z.id===dm})[0];var it=null;
    for(var t=0;t<10&&!it;t++){var id=pickA(D.units),d=pickA(diffs),c=null;
      if(Math.random()<.28){var q=findUnit(id).quiz;c=Object.assign({},pickA(q));c.d=2}else c=GEN.make(id,d);
      if(c&&!seen[c.q]){seen[c.q]=1;it=c}}
    if(it)out.push(it)});
  out.sort(function(a,b){return (a.d||2)-(b.d||2)});return out;
}
function viewMock(a){
  if(MOCK&&!MOCK.done){if(!MOCK.end)return mockBreak(false);if(MOCK.end<=Date.now())return mockFinishModule(true);mockTimer();return mockDraw()}
  var hist=S.mockHist.slice(-8).reverse();
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Mock test</div><div class="sec-h"><h2>⏱️ Mock SAT Math</h2><span class="k">timed · adaptive · scored</span></div>'+
   '<div class="grid g2"><div class="card pad"><h3 class="h3">How it works</h3><p>Just like the real digital SAT: <b>two modules</b>. How well you do in Module 1 decides whether Module 2 is <b>harder</b> (needed for 700+) or easier. Questions follow the real mix: about 35% Algebra, 35% Advanced Math, 15% Data, 15% Geometry & Trig — easiest first in each module.</p>'+
   '<ul class="clean"><li>No explanations until the end — like test day.</li><li>You can flag questions, skip and come back.</li><li>When time runs out, the module ends automatically.</li><li>Every question is freshly generated, so no two mocks are the same.</li></ul>'+
   '<div class="grid g3" style="margin-top:14px">'+
   '<button class="mockopt" onclick="mockStart(22,35,2)"><b>Full test</b><span>2 × 22 questions<br>35 min each</span></button>'+
   '<button class="mockopt" onclick="mockStart(11,18,2)"><b>Half test</b><span>2 × 11 questions<br>18 min each</span></button>'+
   '<button class="mockopt" onclick="mockStart(11,18,1)"><b>Quick module</b><span>1 × 11 questions<br>18 min</span></button></div></div>'+
   '<div class="card pad"><h3 class="h3">Your results</h3>'+(hist.length?hist.map(function(m){return '<div class="mh"><span>'+m.date+'</span><span>'+(m.full?"Full":m.mods===2?"Half":"Quick")+'</span><b>'+m.score+'</b><span class="muted">'+m.raw+'/'+m.total+'</span></div>'}).join("")+(S.mockHist.length>1?mockChart():''):'<p class="muted">No tests yet. Your first one is the most useful: it shows exactly where to focus.</p>')+'</div></div>';
}
function mockStart(n,mins,mods){
  MOCK={n:n,mins:mins,mods:mods,mod:1,items:mockItems(n,[1,1,2,2,2,3]),ans:{},flag:{},i:0,res:[],full:n===22&&mods===2};
  MOCK.end=Date.now()+mins*60000;mockTimer();go("/mock");mockDraw();
}
function mockTimer(){clearInterval(window._mt);window._mt=setInterval(function(){if(!MOCK||MOCK.done){clearInterval(window._mt);return}
  var ms=MOCK.end-Date.now(),t=el("mtime");if(t){t.textContent=fmtT(ms);t.classList.toggle("low",ms<300000)}
  if(ms<=0){if(location.hash==="#/mock")mockFinishModule(true);else clearInterval(window._mt)}},500)}
function fmtT(ms){ms=Math.max(0,ms);var s=Math.floor(ms/1000);return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
function mockDraw(){
  var a=el("app"),M=MOCK,it=M.items[M.i],k=M.mod+"-"+M.i,cur=M.ans[k];
  a.innerHTML='<div class="mock"><div class="mtop"><span><b>Module '+M.mod+'</b> of '+M.mods+'</span><span id="mtime" class="mtime">'+fmtT(M.end-Date.now())+'</span><button class="btn sm ghost" onclick="el(\'mtime\').classList.toggle(\'hid\')">Hide timer</button></div>'+
   '<div class="q-card enter"><div class="q-head"><span>Question '+(M.i+1)+' of '+M.items.length+'</span><button class="flagb'+(M.flag[k]?" on":"")+'" onclick="MOCK.flag[\''+k+'\']=!MOCK.flag[\''+k+'\'];mockDraw()">'+(M.flag[k]?"🚩 Flagged":"⚐ Flag for review")+'</button></div>'+
   '<div class="q-q">'+esc(it.q)+'</div>'+
   (it.t==="mc"?it.c.map(function(c,i){return '<button class="opt'+(cur===i?" sel":"")+'" onclick="MOCK.ans[\''+k+'\']='+i+';mockDraw()"><span class="k">'+"ABCD".charAt(i)+'</span><span>'+esc(c)+'</span></button>'}).join(""):
    '<div class="numin"><input id="mIn" value="'+esc(cur==null?"":cur)+'" placeholder="type your answer" oninput="MOCK.ans[\''+k+'\']=this.value"></div><div class="muted" style="font-size:13px">Fractions like 3/4 or decimals are fine. No mixed numbers.</div>')+
   '<div class="navrow" style="margin-top:18px"><button class="btn" '+(M.i?"":"disabled")+' onclick="MOCK.i--;mockDraw()">← Back</button><button class="btn ghost" onclick="mockGrid()">▦ All questions</button>'+
   (M.i<M.items.length-1?'<button class="btn pri" onclick="MOCK.i++;mockDraw()">Next →</button>':'<button class="btn gd" onclick="mockGrid()">Review & finish</button>')+'</div></div></div>';
}
function mockGrid(){var M=MOCK;var m=modal('<h2>Module '+M.mod+' — overview</h2><p class="muted">Tap a number to jump. 🚩 = flagged, filled = answered.</p><div class="mgrid">'+M.items.map(function(_,i){var k=M.mod+"-"+i,ans=M.ans[k]!=null&&M.ans[k]!=="";return '<button class="'+(ans?"a ":"")+(M.flag[k]?"f ":"")+(i===M.i?"c":"")+'" data-i="'+i+'">'+(i+1)+'</button>'}).join("")+'</div>'+
  '<div class="row" style="justify-content:space-between;margin-top:16px"><button class="btn ghost" data-close>Keep working</button><button class="btn pri" id="mFin">Finish module '+M.mod+'</button></div>');
  m.querySelectorAll(".mgrid button").forEach(function(b){b.onclick=function(){MOCK.i=+b.getAttribute("data-i");m.remove();mockDraw()}});
  el("mFin").onclick=function(){var left=M.items.filter(function(_,i){var v=M.ans[M.mod+"-"+i];return v==null||v===""}).length;
    if(left&&!confirm(left+" question(s) unanswered. Guessing is free — finish anyway?"))return;m.remove();mockFinishModule(false)};
}
function mockFinishModule(auto){
  var M=MOCK;if(!M||M.done)return;var right=0;
  M.items.forEach(function(it,i){var v=M.ans[M.mod+"-"+i],ok=v!=null&&v!==""&&(it.t==="mc"?v===it.a:checkNum(it.a,v));if(ok)right++;
    M.res.push({it:it,v:v,ok:ok,mod:M.mod});record(it.uid,ok);if(!ok){var u=findUnit(it.uid);if(u)logMistake2(u,it,String(it.t==="mc"?it.c[it.a]:it.a))}});
  M["r"+M.mod]=right;M["n"+M.mod]=M.items.length;
  if(M.mod===1&&M.mods===2){M.hard=right/M.items.length>=.6;M.mod=2;M.i=0;M.items=mockItems(M.n,M.hard?[2,2,3,3,3]:[1,1,2,2,3]);
    clearInterval(window._mt);M.end=null;return mockBreak(auto)}
  M.done=true;clearInterval(window._mt);mockResults();
}
function mockBreak(auto){el("app").innerHTML='<div class="q-wrap"><div class="q-card result enter"><div class="big-em">☕</div><h2>Module 1 complete'+(auto?" — time's up":"")+'</h2><p>Take a breath. Stretch. Drink some water. On the real SAT there\'s no break between math modules, but a 20-second reset helps.</p><button class="btn pri" onclick="MOCK.end=Date.now()+MOCK.mins*60000;mockTimer();mockDraw()">Start Module 2 →</button></div></div>'}
function mockScore(M){var f1=M.r1/M.n1;if(M.mods===1)return Math.round((200+600*f1)/10)*10;var f2=M.r2/M.n2;
  var s=M.hard?200+600*(0.45*f1+0.55*f2):200+450*(0.5*f1+0.5*f2);return Math.min(800,Math.round(s/10)*10)}
function mockResults(){
  var M=MOCK,sc=mockScore(M),raw=(M.r1||0)+(M.r2||0),tot=(M.n1||0)+(M.n2||0);
  S.mockHist.push({date:dayStr(),score:sc,raw:raw,total:tot,full:M.full,mods:M.mods});addXp(50);saveS();checkBadges();
  var dom={};M.res.forEach(function(r){var D=domainOf(r.it.uid);dom[D.name]=dom[D.name]||[0,0];dom[D.name][1]++;if(r.ok)dom[D.name][0]++});
  el("app").innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/mock">Mock test</a> › Results</div>'+
   '<div class="grid g2"><div class="card pad" style="text-align:center"><div class="big-em">'+(sc>=750?"👑":sc>=650?"🚀":"🌱")+'</div><div class="score">'+sc+'</div><div class="lab">estimated SAT Math score</div><p class="muted">'+raw+' of '+tot+' correct'+(M.mods===2?' · Module 2 was '+(M.hard?'the <b>harder</b> one ✓':'the easier one — aim for 60%+ in Module 1 to unlock the hard route'):'')+'</p><p class="muted" style="font-size:13px">This is an estimate from our own scale — use it to track progress, not as an official score.</p></div>'+
   '<div class="card pad"><h3 class="h3">By area</h3>'+Object.keys(dom).map(function(k){var p=Math.round(100*dom[k][0]/dom[k][1]);return '<div class="dbar"><span>'+esc(k)+'</span><div class="bar-t"><i data-w="'+p+'"></i></div><b>'+dom[k][0]+'/'+dom[k][1]+'</b></div>'}).join("")+
   '<div class="row" style="margin-top:16px"><button class="btn pri" onclick="MOCK=null;go(\'/mock\')">Back to mock tests</button><button class="btn" onclick="go(\'/review\')">Review mistakes</button></div></div></div>'+
   '<div class="sec-h"><h2>Every question, explained</h2></div>'+M.res.map(function(r,i){var it=r.it,yours=r.v==null||r.v===""?"(blank)":it.t==="mc"?it.c[r.v]:r.v,right=it.t==="mc"?it.c[it.a]:it.a;
    return '<div class="card pad rv '+(r.ok?"ok":"no")+'"><div class="rvh"><b>M'+r.mod+' · Q'+(i%M.n+1)+'</b><span>'+(r.ok?"✓ correct":"✗ your answer: "+esc(yours))+'</span></div><div class="q-q" style="font-size:16px">'+esc(it.q)+'</div><div class="explain '+(r.ok?"ok":"no")+'"><div class="v">Answer: '+esc(right)+'</div>'+esc(it.s)+'</div></div>'}).join("");
  paintBars();if(sc>=650)confetti(200);
}
function mockChart(){var h=S.mockHist.slice(-10),W=320,H=120,pts=h.map(function(m,i){return [20+i*(W-40)/Math.max(1,h.length-1),H-15-(m.score-200)/600*(H-30)]});
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;margin-top:12px"><path d="M'+pts.map(function(p){return p.join(" ")}).join(" L")+'" pathLength="1" class="fdraw" style="fill:none;stroke:var(--blue);stroke-width:3"/>'+pts.map(function(p,i){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" style="fill:var(--blue)"/><text x="'+p[0]+'" y="'+(p[1]-8)+'" text-anchor="middle" class="ft" style="font-size:11px;fill:var(--ink2)">'+h[i].score+'</text>'}).join("")+'</svg>'}

/* ================= DAILY CHALLENGE ================= */
function viewDaily(a){
  var t=dayStr(),done=S.daily[t],dots="";for(var i=6;i>=0;i--){var k=dayStr(-i);dots+='<span class="dd'+(S.daily[k]!=null?" on":"")+'" title="'+k+'">'+(S.daily[k]!=null?"✓":"")+'</span>'}
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Daily challenge</div><div class="q-wrap"><div class="q-card result enter"><div class="big-em">⚡</div><h2>Daily challenge</h2>'+
   '<p>Five questions from across the whole test, medium to hard. Everyone using this app gets the <b>same five today</b> — study with a friend and compare scores!</p><div class="ddots">'+dots+'</div>'+
   (done!=null?'<p><b>Done today: '+done+'%.</b> A new challenge unlocks at midnight.</p><button class="btn" onclick="go(\'/bank\')">Practice more in the bank</button>':'<button class="btn pri block" onclick="dailyStart()">Start today\'s challenge (+25 XP)</button>')+'</div></div>';
}
function dailyStart(){var t=dayStr(),s=0;for(var i=0;i<t.length;i++)s=s*31+t.charCodeAt(i);GEN.seed(s);
  var us=["alg","lines","sys","quad","func","exp","advm","frac","ratio","data","geo1","geo2","trig","prob","ineq"],items=[];
  for(i=0;i<5;i++){var u=us[Math.floor((s>>>0)/(i*7+1))%us.length];var it=GEN.make(u,[2,2,3,2,3][i]);if(it)items.push(it);s=s*17+13}
  GEN.unseed();startRun({u:{id:"__daily",title:"Daily challenge",em:"⚡",color:"#fff2cc"},mode:"prac",items:items,i:0,correct:0,answered:false},"/run")}

/* ================= SMART FLASHCARDS (spaced repetition) ================= */
var BOX=[0,1,2,4,8,16,32];
function viewSRS(a){
  var t=dayStr(),all=[];UNITS.forEach(function(u){u.cards.forEach(function(c){all.push(c)})});
  var due=all.filter(function(c){var s=S.srs[c.k];return s&&s.due<=t}),fresh=all.filter(function(c){return !S.srs[c.k]}),learned=all.filter(function(c){var s=S.srs[c.k];return s&&s.b>=4}).length;
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Smart flashcards</div><div class="sec-h"><h2>🃏 Smart flashcards</h2><span class="k">spaced repetition</span></div>'+
   '<div class="grid g2"><div class="card pad"><p>Cards you know come back <b>less often</b> (after 1, 2, 4, 8, 16, 32 days). Cards you miss come back <b>tomorrow</b>. This is the scientifically proven way to move facts into long-term memory — literally writing them in stone.</p>'+
   '<div class="stat mini4" style="margin:14px 0"><div class="b"><b>'+due.length+'</b><span>due today</span></div><div class="b"><b>'+fresh.length+'</b><span>new cards</span></div><div class="b"><b>'+learned+'</b><span>long-term</span></div><div class="b"><b>'+all.length+'</b><span>total</span></div></div>'+
   '<button class="btn pri block" onclick="srsStart()">'+(due.length?"Review "+Math.min(due.length,40)+" due card"+(due.length>1?"s":"")+(fresh.length?" + 10 new":""):"Learn 15 new cards")+'</button></div>'+
   '<div class="card pad"><h3 class="h3">Memory boxes</h3>'+[0,1,2,3,4,5,6].map(function(b){var n=all.filter(function(c){var s=S.srs[c.k];return s&&s.b===b}).length;return '<div class="dbar"><span>Box '+b+(b?" · "+BOX[b]+"d":" · new")+'</span><div class="bar-t"><i data-w="'+Math.round(100*n/Math.max(1,all.length))+'"></i></div><b>'+n+'</b></div>'}).join("")+'</div></div>';
  paintBars();
}
function srsStart(){var t=dayStr(),all=[];UNITS.forEach(function(u){u.cards.forEach(function(c){all.push(c)})});
  var due=shuf(all.filter(function(c){var s=S.srs[c.k];return s&&s.due<=t})).slice(0,40),fresh=all.filter(function(c){return !S.srs[c.k]}).slice(0,due.length?10:15);
  var cards=due.concat(fresh);if(!cards.length){toast("All caught up! Come back tomorrow.");return}
  DECK={u:{id:"__srs",title:"Smart flashcards"},cards:cards,i:0,flipped:false,known:0};
  go("/srs/run");
}
var _cardMark=cardMark;
cardMark=function(known){var c=DECK&&DECK.cards[DECK.i];
  if(c&&c.k){var s=S.srs[c.k]||{b:0},t=dayStr();s.b=known?Math.min(6,s.b+1):0;s.due=dayStr(known?BOX[s.b]:1);S.srs[c.k]=s;S.cardsSeen++;saveS();checkBadges();
    if(!known&&DECK.u.id==="__srs"&&!c._again){var cc=Object.assign({},c);cc._again=1;DECK.cards.push(cc)}}
  _cardMark(known)};
var _drawCard=drawCard;
drawCard=function(){_drawCard();var D=DECK;if(!D)return;
  var u=findUnit((D.cards[D.i]||{}).uid);var fr=document.querySelector(".face.front");if(fr&&u&&D.u.id==="__srs")fr.insertAdjacentHTML("afterbegin",'<span class="ftag">'+u.em+' '+esc(u.title)+'</span>');
  if(D.i>=D.cards.length){var nr=document.querySelector("#deckwrap .navrow");if(nr&&D.u.id==="__srs")nr.innerHTML='<button class="btn" onclick="go(\'/\')">Home</button><button class="btn pri" onclick="go(\'/srs\')">Back to smart flashcards</button>';if(D.known>=D.cards.length*.8)confetti(80)}};
document.addEventListener("keydown",function(e){if(!DECK||!el("flip")||/INPUT|TEXTAREA/.test((e.target||{}).tagName||""))return;
  if(e.key===" "){e.preventDefault();flipCard()}else if(e.key==="ArrowRight"&&DECK.flipped)cardMark(true);else if(e.key==="ArrowLeft"&&DECK.flipped)cardMark(false)});

/* ================= STUDY ROOM ================= */
var STUDY={mode:25,end:null,left:25*60000,running:false,sound:null,vol:.5};
var AU={ctx:null,src:null,g:null};
function noise(kind){var c=AU.ctx,len=c.sampleRate*4,b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0),last=0;
  for(var i=0;i<len;i++){var w=Math.random()*2-1;
    if(kind==="brown"){last=(last+0.02*w)/1.02;d[i]=last*3.5}
    else if(kind==="fire"){last=(last+0.02*w)/1.02;d[i]=last*3;if(Math.random()<0.00035){for(var j=0;j<300&&i+j<len;j++)d[i+j]+=(Math.random()*2-1)*Math.exp(-j/40)*0.8}}
    else{d[i]=w*0.5}}return b}
function playSound(kind){
  if(AU.src){try{AU.src.stop()}catch(e){}AU.src=null}
  STUDY.sound=kind;if(!kind){studyUI();return}
  try{AU.ctx=AU.ctx||new (window.AudioContext||window.webkitAudioContext)();AU.ctx.resume();
    var s=AU.ctx.createBufferSource();s.buffer=noise(kind);s.loop=true;
    var lp=AU.ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=kind==="rain"?2600:kind==="fire"?900:500;
    var hp=AU.ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=kind==="rain"?350:40;
    AU.g=AU.ctx.createGain();AU.g.gain.value=STUDY.vol*(kind==="rain"?.35:.6);
    s.connect(hp);hp.connect(lp);lp.connect(AU.g);AU.g.connect(AU.ctx.destination);s.start();AU.src=s}catch(e){toast("Sound isn't available in this browser")}
  studyUI()}
function chime(){try{AU.ctx=AU.ctx||new (window.AudioContext||window.webkitAudioContext)();var t=AU.ctx.currentTime;[523.25,659.25,783.99].forEach(function(fq,i){var o=AU.ctx.createOscillator(),g=AU.ctx.createGain();o.type="sine";o.frequency.value=fq;g.gain.setValueAtTime(0,t+i*.18);g.gain.linearRampToValueAtTime(.2,t+i*.18+.02);g.gain.exponentialRampToValueAtTime(.001,t+i*.18+1.4);o.connect(g);g.connect(AU.ctx.destination);o.start(t+i*.18);o.stop(t+i*.18+1.5)})}catch(e){}}
function studySet(m){STUDY.mode=m;STUDY.running=false;STUDY.left=m*60000;STUDY.end=null;studyUI()}
function studyToggle(){if(STUDY.running){STUDY.left=STUDY.end-Date.now();STUDY.running=false}else{STUDY.end=Date.now()+STUDY.left;STUDY.running=true}studyUI()}
setInterval(function(){if(!STUDY.running)return;var ms=STUDY.end-Date.now();STUDY.left=ms;
  if(ms<=0){STUDY.running=false;chime();var focus=STUDY.mode>=25;
    if(focus){S.studyMin+=STUDY.mode;S.sessions=S.sessions||{};S.sessions[dayStr()]=(S.sessions[dayStr()]||0)+1;saveS();addXp(20);checkBadges();confetti(100);toast("Session complete! +20 XP. Take a short break 🌿");STUDY.mode=5}else{toast("Break over — ready for another session?");STUDY.mode=25}
    STUDY.left=STUDY.mode*60000}
  var t=el("stTime");if(t){t.textContent=fmtT(STUDY.left);var r=el("stRing");if(r)r.style.strokeDashoffset=1-STUDY.left/(STUDY.mode*60000)}
  var p=el("pomoPill");if(p){p.style.display=STUDY.running&&location.hash.indexOf("#/study")<0?"flex":"none";p.textContent="🍅 "+fmtT(STUDY.left)}},500);
function viewStudy(a){
  var stars="";for(var i=0;i<60;i++)stars+='<i style="left:'+(Math.random()*100)+'%;top:'+(Math.random()*70)+'%;animation-delay:'+(Math.random()*4)+'s;transform:scale('+(Math.random()*.8+.4)+')"></i>';
  a.innerHTML='<div class="study'+(STUDY.sound==="rain"?" raining":"")+'" id="studyRoom"><div class="stars">'+stars+'</div><div class="moon"></div><div class="rainfx"></div>'+
   '<div class="st-in"><div class="st-q" id="stQ">'+esc(quoteOfDay())+'</div>'+
   '<div class="st-timer"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" class="st-bg"/><circle cx="100" cy="100" r="90" id="stRing" class="st-fg" pathLength="1" transform="rotate(-90 100 100)"/></svg><div class="st-t"><b id="stTime">'+fmtT(STUDY.left)+'</b><span id="stMode"></span></div></div>'+
   '<div class="st-row" id="stModes"></div><div class="st-row"><button class="btn pri" id="stGo" onclick="studyToggle()"></button><button class="btn ghost st-ghost" onclick="studySet(STUDY.mode)">Reset</button></div>'+
   '<div class="st-row" id="stSounds"></div><div class="st-row"><span>🔈</span><input type="range" min="0" max="1" step="0.05" value="'+STUDY.vol+'" oninput="STUDY.vol=+this.value;if(AU.g)AU.g.gain.value=STUDY.vol*(STUDY.sound===\'rain\'?.35:.6)"><span>🔊</span></div>'+
   '<input class="st-goal" placeholder="Tonight I will… (e.g. finish the Quadratics lessons)" value="'+esc(S.goal||"")+'" oninput="S.goal=this.value;saveS()">'+
   '<div class="st-stats">'+Math.round(S.studyMin/60*10)/10+' hours focused in total · '+((S.sessions||{})[dayStr()]||0)+' session(s) today</div></div></div>';
  studyUI();
  clearInterval(window._sq);window._sq=setInterval(function(){var q=el("stQ");if(!q){clearInterval(window._sq);return}q.classList.remove("fadein");void q.offsetWidth;q.textContent=pickA(QUOTES);q.classList.add("fadein")},30000);
}
function studyUI(){if(!el("stModes"))return;
  el("stModes").innerHTML=[[25,"Focus 25"],[50,"Deep 50"],[5,"Break 5"],[15,"Long break 15"]].map(function(m){return '<button class="tog'+(STUDY.mode===m[0]?" on":"")+'" onclick="studySet('+m[0]+')">'+m[1]+'</button>'}).join("");
  el("stSounds").innerHTML=[["rain","🌧️ Rain"],["brown","🌊 Deep noise"],["fire","🔥 Fireplace"],[null,"🔇 Silence"]].map(function(s){return '<button class="tog'+(STUDY.sound===s[0]?" on":"")+'" onclick="playSound('+(s[0]?"\'"+s[0]+"\'":"null")+')">'+s[1]+'</button>'}).join("");
  el("stGo").textContent=STUDY.running?"⏸ Pause":"▶ Start";el("stMode").textContent=STUDY.mode>=25?"focus":"break";
  el("stTime").textContent=fmtT(STUDY.left);el("stRing").style.strokeDashoffset=1-STUDY.left/(STUDY.mode*60000);
  var r=el("studyRoom");if(r)r.classList.toggle("raining",STUDY.sound==="rain");
}

/* ================= PROGRESS ================= */
function viewProgress(a){
  var o=overall(),p=S.profile||{},dl=daysLeft(),best=S.mockHist.reduce(function(m,x){return Math.max(m,x.score)},0);
  var weak=UNITS.filter(function(u){var x=acc(u.id);return x!==null&&S.stats[u.id].a>=5&&x<75}).sort(function(x,y){return acc(x.id)-acc(y.id)}).slice(0,4);
  var days=[],mx=1;for(var i=13;i>=0;i--){var k=dayStr(-i);days.push([k,S.days[k]||0]);mx=Math.max(mx,S.days[k]||0)}
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Progress</div><div class="sec-h"><h2>📈 Your progress'+(p.name?", "+esc(p.name):"")+'</h2><button class="btn sm ghost" onclick="onboard(true)">Edit details</button></div>'+
   '<div class="stat"><div class="b"><b>'+o.score+'</b><span>estimated score</span></div><div class="b"><b>'+(best||"—")+'</b><span>best mock</span></div><div class="b"><b>'+(p.target||800)+'</b><span>target</span></div><div class="b"><b>'+(dl!==null?Math.max(0,dl):"—")+'</b><span>days to test</span></div></div>'+
   '<div class="grid g2" style="margin-top:16px"><div class="card pad"><h3 class="h3">Mastery by SAT area</h3>'+DOMAINS.map(function(D){var s=0;D.units.forEach(function(id){s+=unitStats(findUnit(id)).pct});var pc=Math.round(s/D.units.length);return '<div class="dbar"><span>'+D.em+' '+esc(D.name)+'</span><div class="bar-t"><i data-w="'+pc+'"></i></div><b>'+pc+'%</b></div>'}).join("")+'</div>'+
   '<div class="card pad"><h3 class="h3">Last 14 days</h3><div class="wbars w14">'+days.map(function(d){return '<div class="wb"><i style="height:'+Math.max(3,d[1]/mx*90)+'px" title="'+d[0]+': '+d[1]+'"></i><span>'+d[0].slice(8)+'</span></div>'}).join("")+'</div><div class="muted" style="margin-top:8px">'+S.answered+' questions answered · '+(S.answered?Math.round(100*S.correctN/S.answered):0)+'% correct · '+Math.round(S.studyMin/6)/10+' h in the study room</div></div></div>'+
   (weak.length?'<div class="sec-h"><h2>🎯 Focus here next</h2><span class="k">lowest accuracy</span></div><div class="grid g-auto">'+weak.map(function(u){return '<div class="card pad"><b>'+u.em+' '+esc(u.title)+'</b><p class="muted">'+acc(u.id)+'% on '+S.stats[u.id].a+' questions</p><div class="row"><button class="btn sm pri" onclick="unitGenRun(\''+u.id+'\',2)">Drill it</button><button class="btn sm" onclick="go(\'/unit/'+u.id+'\')">Re-read</button></div></div>'}).join("")+'</div>':'')+
   '<div class="sec-h"><h2>Every unit</h2></div><div class="card pad" style="overflow-x:auto"><table class="tbl2"><tr><th>Unit</th><th>Lessons</th><th>Quiz best</th><th>Accuracy</th><th>Cards learned</th></tr>'+UNITS.map(function(u){var st=unitStats(u),cl=u.cards.filter(function(c){var s=S.srs[c.k];return s&&s.b>=3}).length,ac=acc(u.id);
     return '<tr onclick="go(\'/unit/'+u.id+'\')"><td>'+u.em+' '+esc(u.title)+'</td><td>'+st.ld+'/'+st.lt+'</td><td>'+(st.quiz?st.quiz+"%"+(st.quiz>=80?" ✓":""):"—")+'</td><td>'+(ac===null?"—":ac+"%")+'</td><td>'+cl+'/'+u.cards.length+'</td></tr>'}).join("")+'</table></div>'+
   '<div class="sec-h"><h2>🏅 Badges</h2><span class="k">'+Object.keys(S.badges).length+' / '+BADGES.length+'</span></div><div class="bgrid">'+BADGES.map(function(b){var on=S.badges[b[0]];return '<div class="bdg'+(on?" on":"")+'"><div class="be">'+b[1]+'</div><b>'+esc(b[2])+'</b><small>'+esc(b[3])+'</small></div>'}).join("")+'</div>'+
   '<div class="sec-h"><h2>💾 Backup & move devices</h2></div><div class="card pad"><p class="muted">Progress lives in this browser only. Copy your backup code to keep it safe or move it to another device, then paste it there.</p><textarea id="bk" class="search" rows="3" placeholder="Paste a backup code here to restore…"></textarea><div class="row" style="margin-top:10px"><button class="btn" onclick="bkCopy()">Copy my backup code</button><button class="btn" onclick="bkLoad()">Restore from code</button><button class="btn warn" onclick="if(confirm(\'Erase ALL progress? This cannot be undone.\')){localStorage.removeItem(\'z800\');location.hash=\'#/\';location.reload()}">Reset everything</button></div></div>';
  paintBars();
}
function bkCopy(){var code=btoa(unescape(encodeURIComponent(JSON.stringify(S))));var t=el("bk");t.value=code;t.select();try{navigator.clipboard.writeText(code).then(function(){toast("Backup code copied ✓")},function(){toast("Code is in the box — copy it manually")})}catch(e){toast("Code is in the box — copy it manually")}}
function bkLoad(){try{var o=JSON.parse(decodeURIComponent(escape(atob(el("bk").value.trim()))));if(!o||typeof o.xp!=="number")throw 0;for(var k in o)S[k]=o[k];saveS();toast("Progress restored ✓");router()}catch(e){toast("That code doesn't look right")}}

/* ================= ROUTER ================= */
var _router=router;
router=function(){
  var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean),a=el("app");
  a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");
  var mine={bank:1,mock:1,daily:1,srs:1,study:1,progress:1,run:1};
  if(!mine[p[0]])return _router();
  tickStreak();paintMini();markNav(h);window.scrollTo(0,0);
  if(p[0]==="run"){if(RUN)return drawQuestion();return go("/bank")}
  if(p[0]==="bank")return viewBank(a,p[1]);
  if(p[0]==="mock")return viewMock(a);
  if(p[0]==="daily")return viewDaily(a);
  if(p[0]==="srs"){if(p[1]==="run"&&DECK&&DECK.u.id==="__srs"){a.innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/srs">Smart flashcards</a></div><div class="deck" id="deckwrap"></div><p class="muted" style="text-align:center">Keys: space = flip · → got it · ← again</p>';return drawCard()}return viewSRS(a)}
  if(p[0]==="study")return viewStudy(a);
  if(p[0]==="progress")return viewProgress(a);
};

/* ================= INIT ================= */
(function(){
  var nav=el("topnav");if(nav)nav.innerHTML=[["/","Home"],["/units","Learn"],["/bank","Bank"],["/mock","Mock test"],["/srs","Cards"],["/study","Study room"],["/progress","Progress"]].map(function(x){return '<a href="#'+x[0]+'" data-r="'+x[0]+'">'+x[1]+'</a>'}).join("");
  var dr=document.querySelector("#drawer .panel");if(dr)dr.innerHTML=[["/","🏠 Home"],["/units","📚 All units"],["/bank","🎲 Question bank"],["/mock","⏱️ Mock SAT test"],["/daily","⚡ Daily challenge"],["/srs","🃏 Smart flashcards"],["/study","🕯️ Study room"],["/progress","📈 Progress & badges"],["/review","🔁 Mistake review"],["/formulas","🧮 Formula sheet"],["/strategy","🎯 Test strategy"],["/glossary","🔤 Glossary"]].map(function(x){return '<a href="#'+x[0]+'">'+x[1]+'</a>'}).join("");
  var pill=document.createElement("div");pill.id="pomoPill";pill.className="pomo";pill.onclick=function(){go("/study")};document.body.appendChild(pill);
  var rb=document.createElement("div");rb.id="readbar";rb.className="readbar";document.body.appendChild(rb);
  checkBadges();bootRoute();
})();
