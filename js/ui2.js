/* =====================================================================
   ZERO TO 800 — APP UI (2) · Today · Learn · Unit · Review hub
   ===================================================================== */
function ringSVG(p,size,stroke,cls){size=size||64;stroke=stroke||7;var r=(size-stroke)/2,c=2*Math.PI*r;p=Math.max(0,Math.min(1,p||0));
  return '<svg class="ringsvg '+(cls||"")+'" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" class="rbg" stroke-width="'+stroke+'"/><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" class="rfg" stroke-width="'+stroke+'" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+(c*(1-p)).toFixed(1)+'" style="--c:'+c.toFixed(1)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/></svg>'}
function subtopics(l){var m=l.h.match(/<h3>([^<]{2,80})<\/h3>/g)||[];return m.map(function(x){return x.replace(/<\/?h3>/g,"")})}
function unitPct(u){return unitStats(u).pct}
function nextInUnit(u){for(var i=0;i<u.lessons.length;i++)if(!S.lessons[u.id+"/"+u.lessons[i].id])return u.lessons[i];return null}

/* ---------------- TODAY ---------------- */
viewHome=function(a){
  if(!S.profile)setTimeout(function(){if(!document.querySelector(".modal"))onboard(false)},600);
  var o=overall(),p=S.profile||{},hr=new Date().getHours(),nm=p.name?", "+esc(p.name):"";
  var greet=hr<5?"Still up"+nm+"? Let's make it count":hr<12?"Good morning"+nm:hr<18?"Good afternoon"+nm:"Good evening"+nm;
  var tq=S.days[dayStr()]||0,goal=S.goalQ||20,nl=nextLesson(),dl=daysLeft(),cd=dueCards(),sd=skDue().length,daily=S.daily[dayStr()];
  var date=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"});
  var pos=nl?(S.lpos||{})[nl.u.id+"/"+nl.l.id]||0:0,tot=nl?lpCount(nl.l,nl.u):1;
  var plan=[
    nl?["bookOpen","Learn: "+esc(nl.l.t),esc(nl.u.title.replace(/ \(.*\)$/,"")),"/lesson/"+nl.u.id+"/"+nl.l.id,false]:["cap","All lessons complete","Keep sharp with the Question Bank","/qb",true],
    ["zap","Daily challenge",daily!=null?"Done — "+daily+"%":"5 questions · +25 XP","/daily",daily!=null],
    ["brain","Remember forever",sd?sd+" skill"+(sd>1?"s":"")+" due":"Nothing due today","/forever",!sd],
    ["cards","Smart flashcards",cd?cd+" card"+(cd>1?"s":"")+" due":"Learn a few new cards","/srs",false]];
  if(S.mistakes.length)plan.push(["repeat","Fix your mistakes",S.mistakes.length+" waiting","/review",false]);
  a.innerHTML='<section class="today">'+
   '<div class="t-head"><div class="t-date">'+esc(date)+'</div><h1>'+greet+'.</h1><p class="t-quote">“'+esc(quoteOfDay())+'”</p></div>'+
   '<div class="t-stats">'+
    '<div class="stc"><div class="stc-ring">'+ringSVG(tq/goal,72,8,"g")+'<b>'+tq+'</b></div><div><b>'+tq+' / '+goal+'</b><small>questions today</small></div></div>'+
    '<div class="stc"><span class="stc-ic fl">'+ic("flame")+'</span><div><b>'+S.streak.c+' day'+(S.streak.c===1?"":"s")+'</b><small>study streak</small></div></div>'+
    '<div class="stc"><div class="stc-ring">'+ringSVG(o.mastery,72,8,"b")+'<b class="sm">'+o.score+'</b></div><div><b>'+o.score+'</b><small>estimated score</small></div></div>'+
    '<div class="stc"><span class="stc-ic cal">'+ic("calendar")+'</span><div><b>'+(dl!==null?Math.max(0,dl)+" days":"Set date")+'</b><small>'+(dl!==null?"until your SAT":"<a href=\"javascript:onboard(true)\">add your test date</a>")+'</small></div></div></div>'+
   '<div class="t-grid">'+
    (nl?'<div class="card cont" onclick="go(\'/lesson/'+nl.u.id+'/'+nl.l.id+'\')" style="--uc:'+nl.u.color+'"><div class="cont-l">'+uic(nl.u,"xl")+'</div><div class="cont-m"><span class="eyebrow">Continue learning</span><h3>'+esc(nl.l.t)+'</h3><p>'+esc(nl.u.title.replace(/ \(.*\)$/,""))+' · '+nl.l.mins+' min</p><div class="pbar"><i style="width:'+Math.round(100*pos/Math.max(1,tot-1))+'%"></i></div></div><button class="btn pri round">'+ic("play")+'</button></div>':
     '<div class="card cont"><div class="cont-m"><span class="eyebrow">Course complete</span><h3>Every lesson read. Now make it automatic.</h3><button class="btn pri" onclick="go(\'/mock\')">Take a practice test</button></div></div>')+
    '<div class="card plan-c"><div class="ch">'+ic("list")+'<b>Today\'s plan</b></div>'+plan.map(function(x){return '<a class="pl'+(x[4]?" done":"")+'" href="#'+x[3]+'"><span class="pl-ic">'+ic(x[4]?"check":x[0])+'</span><span class="pl-t"><b>'+x[1]+'</b><small>'+x[2]+'</small></span>'+ic("chevR","pl-go")+'</a>'}).join("")+'</div></div>'+
   '<h2 class="sec">Jump in</h2><div class="qa">'+
    [["database","Question Bank",QB_TOTAL()+" questions with rationales","/qb","b"],["timer","Practice test","Timed & adaptive, like Bluebook","/mock","v"],["zap","Daily challenge","5 fresh questions","/daily","y"],["lamp","Study room","Focus timer & rain","/study","n"],["sigma","Formula sheet","Every formula in one place","/formulas","g"],["lang","Math English","~230 words, RU translations","/unit/words","r"]].map(function(x){return '<a class="qa-i qa-'+x[4]+'" href="#'+x[3]+'"><span class="qa-ic">'+ic(x[0])+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small></a>'}).join("")+'</div>'+
   '<h2 class="sec">Your SAT map</h2><div class="dmap">'+DOMAINS.map(function(D){var s=0;D.units.forEach(function(id){s+=unitPct(findUnit(id))});var pc=Math.round(s/D.units.length);
     return '<div class="card dm"><div class="dm-h"><span class="dm-ic">'+ic(DICON[D.id])+'</span><div><b>'+esc(D.name)+'</b><small>'+esc(D.w)+'</small></div><span class="dm-p">'+pc+'%</span></div><div class="pbar"><i style="width:'+pc+'%"></i></div><div class="dm-u">'+D.units.map(function(id){var u=findUnit(id);return '<a href="#/unit/'+id+'" title="'+esc(u.title)+'" style="--uc:'+u.color+'">'+ic(UICON[id])+'<span>'+esc(u.title.replace(/ \(.*\)$/,"").split(/[:&,]/)[0])+'</span><i style="width:'+unitPct(u)+'%"></i></a>'}).join("")+'</div></div>'}).join("")+'</div></section>';
};

/* ---------------- LEARN ---------------- */
viewUnits=function(a){
  var tl=lessonsTotal(),ld=lessonsDone();
  a.innerHTML='<section class="learn"><div class="pg-h"><div><h1>Learn</h1><p>'+UNITS.length+' units · '+tl+' lessons · '+ld+' completed. Follow the path top to bottom, or jump to any topic.</p></div><div class="srch">'+ic("search")+'<input id="lsearch" placeholder="Find a topic — slope, circles, percent…"></div></div><div id="lbody"></div></section>';
  function draw(q){q=(q||"").toLowerCase();
    el("lbody").innerHTML=DOMAINS.map(function(D){var us=D.units.map(findUnit).filter(function(u){return !q||(u.title+" "+u.tag+" "+u.lessons.map(function(l){return l.t+" "+subtopics(l).join(" ")}).join(" ")).toLowerCase().indexOf(q)>-1});if(!us.length)return "";
      return '<div class="dsec"><div class="dsec-h"><span class="dm-ic">'+ic(DICON[D.id])+'</span><b>'+esc(D.name)+'</b><small>'+esc(D.w)+'</small></div><div class="ugrid">'+us.map(function(u){var pc=unitPct(u),st=0;u.lessons.forEach(function(l){st+=subtopics(l).length});
        return '<a class="ucard" href="#/unit/'+u.id+'" style="--uc:'+u.color+'">'+uic(u)+'<div class="uc-m"><b>'+esc(u.title.replace(/ \(.*\)$/,""))+'</b><small>'+u.lessons.length+' lessons · '+st+' subtopics</small></div><div class="uc-r">'+ringSVG(pc/100,40,5,"b")+'<span>'+pc+'</span></div></a>'}).join("")+'</div></div>'}).join("")||'<div class="empty">Nothing matches that. Try another word.</div>'}
  draw();el("lsearch").oninput=function(){draw(this.value)};
};

/* ---------------- UNIT ---------------- */
viewUnit=function(a,id,tab){
  var u=findUnit(id);if(!u)return go("/units");var st=unitStats(u),nx=nextInUnit(u),D=domainOf(id),ac=acc(id),sk=GEN.skills(id),qbN=QB_COUNT_UNIT(id);
  var stN=0;u.lessons.forEach(function(l){stN+=subtopics(l).length});
  a.innerHTML='<section class="unitv"><div class="uhero" style="--uc:'+u.color+'"><div class="uh-l">'+uic(u,"xxl")+'</div><div class="uh-m"><span class="eyebrow">'+ic(DICON[D.id])+' '+esc(D.name)+'</span><h1>'+esc(u.title)+'</h1><p>'+u.tag+'</p>'+
   '<div class="uh-s"><span>'+ic("bookOpen")+st.ld+'/'+st.lt+' lessons</span><span>'+ic("list")+stN+' subtopics</span><span>'+ic("target")+(st.quiz?"Quiz best "+st.quiz+"%":"Quiz not taken")+'</span>'+(ac!==null?'<span>'+ic("check")+ac+'% accuracy</span>':'')+'</div>'+
   '<div class="row">'+(nx?'<button class="btn pri" onclick="go(\'/lesson/'+id+'/'+nx.id+'\')">'+ic("play")+(st.ld?"Continue":"Start unit")+'</button>':'<button class="btn pri" onclick="startSet(\''+id+'\',\'quiz\')">'+ic("target")+'Take the unit quiz</button>')+(sk.length?'<button class="btn" onclick="unitGenRun(\''+id+'\',2)">'+ic("infinity")+'Practice</button>':'')+'</div></div>'+
   '<div class="uh-r">'+ringSVG(st.pct/100,108,10,"b")+'<b>'+st.pct+'%</b><small>complete</small></div></div>'+
   '<div class="ucols"><div><h2 class="sec">Lessons & subtopics</h2><div class="path">'+u.lessons.map(function(l,i){var done=S.lessons[id+"/"+l.id],cur=nx&&nx.id===l.id,sub=subtopics(l),pos=(S.lpos||{})[id+"/"+l.id];
     return '<a class="pnode'+(done?" done":"")+(cur?" cur":"")+'" href="#/lesson/'+id+'/'+l.id+'"><span class="pn-dot">'+(done?ic("check"):(i+1))+'</span><div class="pn-b"><b>'+esc(l.t)+'</b><small>'+l.mins+' min · '+lpCount(l,u)+' pages'+(pos&&!done?' · in progress':'')+'</small>'+(sub.length?'<div class="pn-sub">'+sub.map(function(s){return '<span>'+esc(s)+'</span>'}).join("")+'</div>':'')+'</div>'+ic("chevR","pn-go")+'</a>'}).join("")+'</div></div>'+
   '<div><h2 class="sec" id="practice">Practice & review</h2><div class="pcards">'+
    (qbN?'<a class="pc" href="javascript:qbForUnit(\''+id+'\')"><span class="pc-ic b">'+ic("database")+'</span><div><b>Question Bank</b><small>'+qbN+' questions with full rationales, filtered to this unit</small></div>'+ic("chevR")+'</a>':'')+
    (sk.length?'<div class="pc col"><div class="pc-top"><span class="pc-ic v">'+ic("infinity")+'</span><div><b>Endless practice</b><small>New numbers every time</small></div></div><div class="row"><button class="btn sm gd" onclick="unitGenRun(\''+id+'\',1)">Easy</button><button class="btn sm pri" onclick="unitGenRun(\''+id+'\',2)">Medium</button><button class="btn sm warn" onclick="unitGenRun(\''+id+'\',3)">Hard</button></div><div class="chipset">'+sk.map(function(s,i){return '<button class="tog" onclick="unitGenRun(\''+id+'\',0,'+i+')">'+esc(s)+'</button>'}).join("")+'</div></div>':'')+
    '<a class="pc" href="javascript:startSet(\''+id+'\',\'quiz\')" id="quiz"><span class="pc-ic y">'+ic("target")+'</span><div><b>Unit quiz</b><small>'+u.quiz.length+' questions · 80% to master'+(st.quiz?' · best '+st.quiz+'%':'')+'</small></div>'+ic("chevR")+'</a>'+
    (sk.length?'<a class="pc" href="javascript:unitGenRun(\''+id+'\',2,null,\'quiz\')"><span class="pc-ic r">'+ic("refresh")+'</span><div><b>Fresh quiz</b><small>10 new generated questions, counts toward mastery</small></div>'+ic("chevR")+'</a>':'')+
    '<a class="pc" href="javascript:startSet(\''+id+'\',\'prac\')"><span class="pc-ic g">'+ic("pen")+'</span><div><b>Guided practice</b><small>'+u.prac.length+' hand-picked questions with explanations</small></div>'+ic("chevR")+'</a>'+
    '<a class="pc" href="#/cards/'+id+'" id="cards"><span class="pc-ic n">'+ic("cards")+'</span><div><b>Flashcards</b><small>'+u.cards.length+' cards — rules, formulas, words</small></div>'+ic("chevR")+'</a>'+
    (sk.length&&id!=="words"?'<a class="pc" href="javascript:sheetGo(\''+id+'\')"><span class="pc-ic b">'+ic("fileText")+'</span><div><b>Worksheet</b><small>20 questions to solve on paper</small></div>'+ic("chevR")+'</a>':'')+
   '</div></div></div></section>';
  if(tab&&tab!=="lessons"){var t=el(tab==="prac"?"practice":tab);if(t&&t.scrollIntoView)setTimeout(function(){t.scrollIntoView({behavior:"smooth"})},100)}
};

/* ---------------- REVIEW HUB ---------------- */
function viewRevise(a){
  var cd=dueCards(),sd=skDue().length,m=S.mistakes.length;
  var items=[["repeat","Mistake review",m?m+" questions to fix — they leave the list once you get them right":"No mistakes saved. Nice.","/review","r"],["brain","Remember forever",sd?sd+" skills due for review today":"Every skill on schedule","/forever","v"],["cards","Smart flashcards",cd?cd+" cards due":"Learn new cards","/srs","y"],["fileText","Worksheets","20 questions on paper, with full answers","/sheet/all","b"],["zap","Daily challenge",S.daily[dayStr()]!=null?"Done today":"5 questions, same for everyone","/daily","g"],["tool","Practice builder","Mix topics, difficulty and length","/bank","n"]];
  a.innerHTML='<section><div class="pg-h"><div><h1>Review</h1><p>Learning is the first half. Reviewing on a schedule is what makes it permanent.</p></div></div><div class="rgrid">'+items.map(function(x){return '<a class="card rv-i qa-'+x[4]+'" href="#'+x[3]+'"><span class="qa-ic">'+ic(x[0])+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small>'+ic("arrowR","rv-go")+'</a>'}).join("")+'</div></section>';
}
var _routerUI2=router;
router=function(){var p=(location.hash.replace(/^#/,"")||"/").split("/").filter(Boolean);
  if(p[0]==="revise"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(location.hash.replace(/^#/,""));window.scrollTo(0,0);return viewRevise(a)}
  var r=_routerUI2();var m=document.querySelector(".mainc");if(m)m.scrollTop=0;return r};
