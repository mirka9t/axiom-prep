/* =====================================================================
   ZERO TO 800 — APP UI (3) · paged lesson player
   ===================================================================== */
var LPC={},LP=null;
function lpBuild(l,u){
  var key=u.id+"/"+l.id;if(LPC[key])return LPC[key];
  var tmp=document.createElement("div");tmp.innerHTML=l.h;
  var pages=[],cur=null,lastT="The big idea";
  function start(t,cont){cur={t:t,kind:"read",html:[],w:0,cont:!!cont};pages.push(cur)}
  start(lastT);
  [].slice.call(tmp.childNodes).forEach(function(n){
    if(n.nodeType===3){if(n.textContent.trim())cur.html.push(esc(n.textContent));return}
    if(n.nodeType!==1)return;var tg=n.tagName,cls=typeof n.className==="string"?n.className:"";
    if(tg==="H3"){lastT=n.textContent;start(lastT);return}
    if(/\bqc\b/.test(cls)){pages.push({t:"Check yourself",kind:"check",html:[n.outerHTML]});start(lastT,1);return}
    if(/\bws-ex\b/.test(cls)){pages.push({t:lastT,kind:"example",html:[n.outerHTML]});start(lastT,1);return}
    var w=(tg==="FIGURE"||/fig/.test(cls))?2:/\b(eg|fbox|note)\b/.test(cls)?1.6:(tg==="UL"||tg==="OL"||tg==="TABLE")?1.5:1;
    if(cur.w+w>4.6&&cur.html.length){start(lastT,1)}
    cur.html.push(n.outerHTML);cur.w+=w});
  pages=pages.filter(function(p){return p.html.length});
  var text=tmp.textContent,terms=[];
  if(u.id!=="words")DICT.slice().reverse().forEach(function(d){if(terms.length<16&&d.re.test(text)&&!terms.some(function(x){return x.en.indexOf(d.en)>-1||d.en.indexOf(x.en)>-1}))terms.push(d)});
  var rec={f:[],t:[],x:[]};
  tmp.querySelectorAll(".fbox").forEach(function(f){rec.f.push(f.textContent)});
  tmp.querySelectorAll(".tip").forEach(function(f){rec.t.push(f.textContent)});
  tmp.querySelectorAll(".trap").forEach(function(f){rec.x.push(f.textContent)});
  return (LPC[key]={pages:pages,terms:terms,rec:rec});
}
function lpCount(l,u){var b=lpBuild(l,u);return b.pages.length+2+(b.terms.length?1:0)}
var _viewLessonReader=viewLesson;
viewLesson=function(a,uid,lid){
  var u=findUnit(uid);if(!u)return go("/units");var li=-1;u.lessons.forEach(function(x,i){if(x.id===lid)li=i});if(li<0)return go("/unit/"+uid);
  var l=u.lessons[li],b=lpBuild(l,u),seq=[{kind:"cover"}].concat(b.pages);if(b.terms.length)seq.push({kind:"terms"});seq.push({kind:"recap"});
  var key=uid+"/"+lid;S.lpos=S.lpos||{};var pos=S.lessons[key]?0:Math.min(S.lpos[key]||0,seq.length-1);
  LP={u:u,l:l,li:li,seq:seq,i:pos,key:key,b:b};
  a.innerHTML='<div class="player" style="--uc:'+u.color+'"><div class="pl-top"><button class="tb-btn" title="Close" onclick="go(\'/unit/'+uid+'\')">'+ic("x")+'</button><div class="pl-seg" id="plSeg">'+seq.map(function(){return '<i></i>'}).join("")+'</div><button class="tb-btn" title="Show everything on one page" onclick="lpReader()">'+ic("list")+'</button></div>'+
   '<div class="pl-stage" id="plStage"></div><div class="pl-nav"><button class="btn ghost" id="plBack" onclick="lpGo(-1)">'+ic("chevL")+'<span>Back</span></button><span class="pl-cnt" id="plCount"></span><button class="btn pri" id="plNext" onclick="lpGo(1)"><span>Continue</span>'+ic("chevR")+'</button></div></div>';
  var st=el("plStage"),x0=null;
  st.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
  st.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>70&&!e.target.closest("input,.qc,svg"))lpGo(dx<0?1:-1);x0=null},{passive:true});
  lpShow(0);
};
function lpReader(){var P=LP;if(!P)return;var a=el("app");_viewLessonReader(a,P.u.id,P.l.id);
  var art=a.querySelector(".lesson");if(art)art.insertAdjacentHTML("afterbegin",'<button class="btn sm ghost" style="margin-bottom:12px" onclick="router()">'+ic("layers")+' Back to page view</button>')}
function lpShow(dir){
  var P=LP,pg=P.seq[P.i],st=el("plStage"),h="",n=P.seq.length;if(!st)return;
  if(pg.kind==="cover"){var subs=[];P.b.pages.forEach(function(p){if(p.kind==="read"&&!p.cont&&subs.indexOf(p.t)<0)subs.push(p.t)});var ex=P.b.pages.filter(function(p){return p.kind==="example"}).length,ck=P.b.pages.filter(function(p){return p.kind==="check"}).length;
    h='<div class="pg cover">'+uic(P.u,"xxl")+'<span class="eyebrow">Lesson '+(P.li+1)+' of '+P.u.lessons.length+' · '+esc(P.u.title.replace(/ \(.*\)$/,""))+'</span><h1>'+esc(P.l.t)+'</h1><div class="cv-meta"><span>'+ic("clock")+P.l.mins+' min</span><span>'+ic("layers")+n+' pages</span>'+(ex?'<span>'+ic("pen")+ex+' worked examples</span>':'')+(ck?'<span>'+ic("target")+ck+(ck===1?' check':' checks')+'</span>':'')+'</div>'+
     (subs.length?'<div class="cv-list"><b>In this lesson you will learn</b>'+subs.map(function(s,i){return '<div class="cv-i"><span>'+(i+1)+'</span>'+esc(s)+'</div>'}).join("")+'</div>':'')+
     (S.lessons[P.key]?'<div class="cv-done">'+ic("check")+' You completed this lesson — reviewing is how it sticks.</div>':'')+'</div>'}
  else if(pg.kind==="terms"){h='<div class="pg"><span class="pg-kind k-terms">'+ic("lang")+'Key words</span><h2 class="pg-t">Words to know from this lesson</h2><p class="muted">Every word below appeared in this lesson. Say each English word out loud, then cover the right column and test yourself.</p><div class="terms no-gloss">'+P.b.terms.map(function(d){return '<div class="term"><b>'+esc(d.en)+'</b><span>'+esc(d.ru)+'</span></div>'}).join("")+'</div></div>'}
  else if(pg.kind==="recap"){var r=P.b.rec,nx=P.u.lessons[P.li+1];
    h='<div class="pg recap"><span class="pg-kind k-recap">'+ic("sparkles")+'Recap</span><h2 class="pg-t">What to remember</h2>'+
     (r.f.length?'<div class="rc"><div class="rc-h">'+ic("sigma")+'Formulas & rules</div>'+r.f.map(function(x){return '<div class="fbox">'+esc(x)+'</div>'}).join("")+'</div>':'')+
     (r.t.length?'<div class="rc"><div class="rc-h">'+ic("bulb")+'Key ideas</div><ul>'+r.t.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul></div>':'')+
     (r.x.length?'<div class="rc warn"><div class="rc-h">'+ic("alert")+'Watch out for</div><ul>'+r.x.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul></div>':'')+
     (!r.f.length&&!r.t.length&&!r.x.length?'<p>You worked through every page of this lesson. Explain the main idea out loud in one sentence — if you can, you own it.</p>':'')+
     '<div class="rc-next">'+(nx?'<span>Up next: <b>'+esc(nx.t)+'</b></span>':'<span>This is the last lesson of the unit — time for the quiz.</span>')+'</div></div>'}
  else{var kind=pg.kind==="check"?'<span class="pg-kind k-check">'+ic("pen")+'Check yourself</span>':pg.kind==="example"?'<span class="pg-kind k-ex">'+ic("bookOpen")+'Worked example</span>':(pg.cont?'':'<span class="pg-kind">'+ic("bulb")+'Concept</span>');
    h='<div class="pg lesson">'+kind+(pg.kind==="check"?'<h2 class="pg-t">Your turn</h2>':'<h2 class="pg-t">'+esc(pg.t)+'</h2>')+pg.html.join("")+'</div>'}
  st.innerHTML='<div class="pg-wrap '+(dir>0?"in-r":dir<0?"in-l":"in-f")+'">'+h+'</div>';
  st.scrollTop=0;var mc=document.querySelector(".mainc");if(mc)mc.scrollTop=0;window.scrollTo(0,0);
  el("plSeg").querySelectorAll("i").forEach(function(s,i){s.className=i<P.i?"d":i===P.i?"c":""});
  el("plCount").textContent=(P.i+1)+" / "+n;el("plBack").disabled=P.i===0;
  var last=P.i===n-1;el("plNext").innerHTML=last?'<span>Complete lesson</span>'+ic("check"):P.i===0?'<span>Start</span>'+ic("chevR"):'<span>Continue</span>'+ic("chevR");
  el("plNext").classList.toggle("gd",last);
  S.lpos[P.key]=P.i;saveS();
}
function lpGo(d){if(!LP||!el("plStage"))return;var n=LP.i+d;if(n<0)return;if(n>=LP.seq.length)return lpFinish();LP.i=n;lpShow(d)}
function lpFinish(){var P=LP,nx=P.u.lessons[P.li+1],was=S.lessons[P.key];markLesson(P.u.id,P.l.id);S.lpos[P.key]=0;saveS();
  el("plStage").innerHTML='<div class="pg-wrap in-r"><div class="pg cover done"><div class="bigcheck">'+ic("check")+'</div><h1>Lesson complete</h1><p>'+(was?"Reviewed again — that's how memory is built.":"+10 XP · "+esc(pickA(QUOTES)))+'</p><div class="row" style="justify-content:center">'+
   (nx?'<button class="btn pri" onclick="go(\'/lesson/'+P.u.id+'/'+nx.id+'\')">Next: '+esc(nx.t)+ic("chevR")+'</button>':'<button class="btn pri" onclick="startSet(\''+P.u.id+'\',\'quiz\')">'+ic("target")+'Take the unit quiz</button>')+
   (GEN.skills(P.u.id).length?'<button class="btn" onclick="unitGenRun(\''+P.u.id+'\',1)">'+ic("infinity")+'Practice now</button>':'')+'<button class="btn ghost" onclick="go(\'/unit/'+P.u.id+'\')">Back to unit</button></div></div></div>';
  el("plSeg").querySelectorAll("i").forEach(function(s){s.className="d"});el("plNext").style.visibility="hidden";el("plBack").style.visibility="hidden";el("plCount").textContent="";
}
document.addEventListener("keydown",function(e){if(!LP||!el("plStage")||/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||""))return;
  if(e.key==="ArrowRight"){e.preventDefault();lpGo(1)}else if(e.key==="ArrowLeft"){e.preventDefault();lpGo(-1)}});
