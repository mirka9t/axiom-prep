/* =====================================================================
   ZERO TO 800 — v3 EXTRA 4
   Remember-forever skill review · worksheets · formula flashcards · styles
   ===================================================================== */
if(!S.sk)S.sk={};
var SKBOX=[0,1,2,4,7,15,30,60];

/* ---------- formula flashcards (added to each unit's deck) ---------- */
(function(){
  var map={"Arithmetic & percent":"frac","Ratios & rates":"ratio","Lines":"lines","Exponents & roots":"exp","Quadratics":"quad","Functions":"func","Statistics":"data","Probability":"prob","Geometry — flat":"geo2","Right triangles":"geo1","Geometry — 3D":"geo2","Trigonometry":"trig"};
  FORMULAS.forEach(function(g){var u=findUnit(map[g.h]);if(!u)return;g.f.forEach(function(r){var i=u.cards.length;u.cards.push({f:"Formula · "+r[0]+" = ?",b:r[1],k:u.id+"#"+i,uid:u.id})})});
})();

/* ---------- skill memory ---------- */
function allSkills(){var out=[];UNITS.forEach(function(u){GEN.skills(u.id).forEach(function(n,i){out.push({uid:u.id,name:n,i:i,key:u.id+"|"+n})})});return out}
function skUpdate(it,ok){if(!it||!it.gen||!it.sk||!it.uid)return;var k=it.uid+"|"+it.sk,s=S.sk[k]||{b:0,a:0,c:0};
  s.a++;if(ok){s.c++;s.b=Math.min(7,s.b+1)}else s.b=0;s.due=dayStr(ok?SKBOX[s.b]:1);s.last=dayStr();S.sk[k]=s;saveS()}
var _finishQv4=finishQ;
finishQ=function(ok,it,ct){_finishQv4(ok,it,ct);skUpdate(it,ok);
  if(it.gen&&it.sk){var s=S.sk[it.uid+"|"+it.sk],ex=el("exbox");if(s&&ex)ex.insertAdjacentHTML("beforeend",'<div class="memline">🧠 Memory for “'+esc(it.sk)+'”: '+memDots(s.b)+' <span>next review '+(s.due===dayStr(1)?"tomorrow":"in "+SKBOX[s.b]+" days")+'</span></div>')}};
function memDots(b){var h="";for(var i=1;i<=7;i++)h+='<i class="'+(i<=b?"on":"")+'"></i>';return '<span class="mdots">'+h+'</span>'}
function skDue(){var t=dayStr();return allSkills().filter(function(s){var m=S.sk[s.key];return m&&m.due<=t})}

function viewForever(a){
  var all=allSkills(),seen=all.filter(function(s){return S.sk[s.key]}),due=skDue(),strong=all.filter(function(s){var m=S.sk[s.key];return m&&m.b>=5});
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Remember forever</div><div class="sec-h"><h2>🧠 Remember forever</h2><span class="k">spaced review of every skill</span></div>'+
   '<div class="grid g2"><div class="card pad"><p>This is how you make math stay in your head for life. Every skill you practice gets a <b>memory level</b> from 0 to 7. Answer correctly and the skill comes back later and later — after 1, 2, 4, 7, 15, 30, then 60 days. Make a mistake and it comes back tomorrow. A few minutes a day keeps <b>every</b> topic fresh until test day and long after.</p>'+
   '<div class="stat mini4" style="margin:14px 0"><div class="b"><b>'+due.length+'</b><span>due today</span></div><div class="b"><b>'+seen.length+'/'+all.length+'</b><span>skills started</span></div><div class="b"><b>'+strong.length+'</b><span>long-term (5+)</span></div><div class="b"><b>'+Math.round(100*strong.length/Math.max(1,all.length))+'%</b><span>locked in</span></div></div>'+
   '<button class="btn pri block" onclick="foreverStart()">'+(due.length?"Review "+Math.min(due.length,15)+" due skill"+(due.length>1?"s":""):"Start new skills (10 questions)")+'</button>'+
   '<p class="muted" style="font-size:13px;margin-top:10px">Every question you answer anywhere in the app (practice, bank, daily) also updates these memory levels.</p></div>'+
   '<div class="card pad"><h3 class="h3">Memory by unit</h3>'+UNITS.filter(function(u){return GEN.skills(u.id).length&&u.id!=="words"}).map(function(u){var sk=all.filter(function(s){return s.uid===u.id}),sum=0;sk.forEach(function(s){sum+=(S.sk[s.key]||{b:0}).b});var p=Math.round(100*sum/(7*sk.length));
     return '<div class="dbar"><span>'+u.em+' '+esc(u.title)+'</span><div class="bar-t"><i data-w="'+p+'"></i></div><b>'+p+'%</b></div>'}).join("")+'</div></div>'+
   '<div class="sec-h"><h2>All skills</h2></div><div class="card pad sklist">'+all.filter(function(s){return s.uid!=="words"}).map(function(s){var m=S.sk[s.key],u=findUnit(s.uid);
     return '<div class="skrow" onclick="unitGenRun(\''+s.uid+'\',0,'+s.i+')"><span>'+u.em+'</span><b>'+esc(s.name)+'</b>'+memDots(m?m.b:0)+'<small>'+(m?(m.due<=dayStr()?"due now":"next "+m.due):"not started")+'</small></div>'}).join("")+'</div>';
  paintBars();
}
function foreverStart(){
  var t=dayStr(),due=skDue().sort(function(x,y){return S.sk[x.key].due<S.sk[y.key].due?-1:1}).slice(0,15),items=[];
  due.forEach(function(s){var b=S.sk[s.key].b,it=GEN.make(s.uid,b<2?1:b<5?2:3,s.i);if(it)items.push(it)});
  if(items.length<10){var fresh=shuf(allSkills().filter(function(s){return !S.sk[s.key]&&s.uid!=="words"}));
    var read=fresh.filter(function(s){return findUnit(s.uid).lessons.some(function(l){return S.lessons[s.uid+"/"+l.id]})});
    (read.length?read:fresh).slice(0,10-items.length).forEach(function(s){var it=GEN.make(s.uid,1,s.i);if(it)items.push(it)})}
  if(!items.length){toast("Everything is fresh! Come back tomorrow.");return}
  shuf(items);startRun({u:{id:"__forever",title:"Remember forever",em:"🧠",color:"#efe6ff"},mode:"prac",items:items,i:0,correct:0,answered:false},"/run");
}

/* ---------- worksheets ---------- */
var SHEET=null;
function sheetGo(uid){SHEET=null;go("/sheet/"+uid)}
function sheetMake(uid){var units=uid==="all"?UNITS.filter(function(u){return GEN.skills(u.id).length&&u.id!=="words"}).map(function(u){return u.id}):[uid],items=[];
  [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3].forEach(function(d){for(var t=0;t<6;t++){var it=GEN.make(pickA(units),d);if(it&&!items.some(function(x){return x.q===it.q})){items.push(it);break}}});
  SHEET={uid:uid,items:items}}
function viewSheet(a,uid){
  uid=uid||"all";if(!SHEET||SHEET.uid!==uid)sheetMake(uid);var u=findUnit(uid);
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Worksheet</div><div class="sec-h"><h2>📝 Worksheet: '+(u?u.em+" "+esc(u.title):"all topics")+'</h2><span class="k">20 questions · easy → hard</span></div>'+
   '<div class="card pad"><p>Take a sheet of paper and solve every question <b>in writing</b>, showing each step — just like in class. Only then open the answers. Writing by hand is one of the strongest ways to remember a method.</p>'+
   '<div class="row"><select class="search" style="max-width:280px" onchange="sheetGo(this.value)"><option value="all">All topics mixed</option>'+UNITS.filter(function(x){return GEN.skills(x.id).length&&x.id!=="words"}).map(function(x){return '<option value="'+x.id+'"'+(x.id===uid?" selected":"")+'>'+x.em+' '+esc(x.title)+'</option>'}).join("")+'</select><button class="btn pri" onclick="sheetGo(\''+uid+'\')">🔄 New worksheet</button><button class="btn" onclick="sheetAll(true)">Show all answers</button><button class="btn ghost" onclick="sheetAll(false)">Hide all</button></div></div>'+
   SHEET.items.map(function(it,i){var ans=it.t==="mc"?"ABCD".charAt(it.a)+") "+it.c[it.a]:it.a,uu=findUnit(it.uid);
    return '<div class="card pad sq"><div class="sqh"><b>'+(i+1)+'.</b><span class="qt-d">'+["","●○○","●●○","●●●"][it.d||2]+'</span>'+(uid==="all"?'<span class="muted">'+uu.em+' '+esc(uu.title)+'</span>':'')+'</div><div class="q-q">'+esc(it.q)+'</div>'+
     (it.t==="mc"?'<ol type="A" class="bqc">'+it.c.map(function(c){return '<li>'+esc(c)+'</li>'}).join("")+'</ol>':'<div class="sqline">Answer: ______________</div>')+
     '<details class="sqd"><summary>Answer & full explanation</summary><div class="explain ok"><div class="v">Answer: '+esc(ans)+'</div><b>Step by step:</b> '+esc(it.s)+'</div>'+deepHTML(it)+'</details></div>'}).join("");
}
function sheetAll(open){document.querySelectorAll(".sqd").forEach(function(d){d.open=open})}

/* ---------- hook into router, home, unit pages ---------- */
var _routerV4=router;
router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean),a=el("app");
  if(p[0]==="forever"||p[0]==="sheet"){a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);window.scrollTo(0,0);
    return p[0]==="forever"?viewForever(a):viewSheet(a,p[1])}
  return _routerV4()};
var _viewHomeV4=viewHome;
viewHome=function(a){_viewHomeV4(a);var d=skDue().length,pl=a.querySelector(".dash .card");
  if(pl){var h3=pl.querySelector(".h3");h3.insertAdjacentHTML("afterend",'<div class="plan'+(d?"":" done")+'" onclick="go(\'/forever\')"><span class="pe">🧠</span><div><b>Remember forever</b><small>'+(d?d+" skill"+(d>1?"s":"")+" due for review":"Nothing due — start new skills")+'</small></div><span class="go">'+(d?"›":"✓")+'</span></div>')}
  var tl=a.querySelector(".tools");if(tl)tl.insertAdjacentHTML("afterbegin",tile("🧠","Remember forever","Every skill comes back on a schedule","/forever")+tile("📝","Worksheets","20 written questions with full answers","/sheet/all")+tile("🗣️","Math English","~230 words with Russian translations","/unit/words"));
};
var _viewUnitV4=viewUnit;
viewUnit=function(a,id,tab){_viewUnitV4(a,id,tab);tab=tab||"lessons";var b=el("tabbody");
  if(b&&(tab==="practice"||tab==="lessons")&&GEN.skills(id).length&&id!=="words")b.insertAdjacentHTML("beforeend",'<div class="card pad" style="margin-top:14px"><h3 style="font-family:var(--disp)">📝 Worksheet</h3><p class="muted">20 questions from easy to hard to solve on paper, each with a full step-by-step answer.</p><button class="btn" onclick="sheetGo(\''+id+'\')">Open a worksheet</button></div>')};
(function(){var dr=document.querySelector("#drawer .panel");if(dr){dr.insertAdjacentHTML("beforeend",'<a href="#/forever">🧠 Remember forever</a><a href="#/sheet/all">📝 Worksheets</a><a href="#/unit/words">🗣️ Math English</a>')}})();

/* ---------- styles ---------- */
(function(){var c=`
.ru-g{color:var(--violet);font-weight:600;font-size:.88em;font-style:normal;white-space:normal}
.rubtn{font-weight:800;font-size:12px;letter-spacing:.04em;opacity:.55}
.rubtn.on{opacity:1;color:var(--violet);border-color:var(--violet)}
.deep{margin-top:12px;border-radius:13px;border:1px solid var(--line);background:var(--paper);padding:4px 16px 12px}
.dp{margin-top:12px}.dpl{display:block;font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--blue);margin-bottom:4px}
.dpf{font-family:var(--mono);font-size:15px;background:var(--soft);border-radius:9px;padding:9px 12px;white-space:pre-wrap}
.dp ol{margin:4px 0 0 20px;line-height:1.65}
.warnp{background:color-mix(in srgb,var(--red) 8%,var(--paper));border-radius:10px;padding:10px 12px}.warnp .dpl{color:var(--red)}
.dplink{display:inline-block;margin-top:12px;font-weight:700}
.deepwrap{margin-top:10px}.deepwrap summary{padding:6px 0}
.memline{margin-top:10px;font-size:13px;color:var(--ink2);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mdots{display:inline-flex;gap:3px;vertical-align:middle}.mdots i{width:12px;height:6px;border-radius:3px;background:var(--line)}.mdots i.on{background:var(--violet)}
.skrow{display:grid;grid-template-columns:28px 1fr auto 110px;gap:10px;align-items:center;padding:9px 6px;border-bottom:1px solid var(--line);cursor:pointer;font-size:14px}
.skrow:hover{background:var(--soft)}.skrow small{color:var(--ink2);text-align:right}
@media(max-width:560px){.skrow{grid-template-columns:24px 1fr;}.skrow .mdots,.skrow small{grid-column:2}}
.ws-ex{margin:18px 0;border:1px solid var(--line);border-radius:16px;padding:16px 18px;background:var(--paper);box-shadow:var(--sh)}
.ws-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.ws-h span{font-family:var(--disp);font-weight:800;font-size:18px;color:var(--blue)}
.ws-h em{font-style:normal;font-size:12px;font-weight:800;padding:3px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:.05em}
.lveasy{background:color-mix(in srgb,var(--grn) 18%,var(--paper));color:var(--grn)}.lvmedium{background:color-mix(in srgb,var(--yel) 30%,var(--paper));color:#9a6b00}.lvhard{background:color-mix(in srgb,var(--red) 15%,var(--paper));color:var(--red)}
.ws-p{font-size:17px;margin-bottom:8px}
.ws-s{margin:6px 0 10px 22px;line-height:1.7}.ws-s li{padding:3px 0}.ws-s li::marker{font-weight:800;color:var(--blue)}
.ws-a{padding:9px 13px;border-radius:10px;background:color-mix(in srgb,var(--grn) 12%,var(--paper));font-weight:600}
.ws-w{margin-top:8px;font-size:14px;color:var(--ink2)}
.sq{margin-bottom:12px}.sqh{display:flex;gap:10px;align-items:center;margin-bottom:4px;font-size:14px}.sqh b{font-family:var(--disp);font-size:20px;color:var(--blue)}
.sqline{color:var(--ink2);margin:8px 0;font-family:var(--mono)}
.sqd{margin-top:8px}
.vocab-t td{font-size:15px}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();

var _dqV4=drawQuestion;
drawQuestion=function(){_dqV4();var R=RUN,it=R&&R.items[R.i],c=document.querySelector(".q-card");if(c&&it&&it.uid==="words")c.classList.add("no-gloss")};
var _dcV4=drawCard;
drawCard=function(){_dcV4();var D=DECK,c=D&&D.cards[D.i],w=el("deckwrap");if(w)w.classList.toggle("no-gloss",!!(c&&c.uid==="words"))};
checkBadges();bootRoute();
