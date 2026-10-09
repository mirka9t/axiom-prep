/* =====================================================================
   AXIOM 2.0 — final layer
   smart practice · skill insights · saved lessons · pronunciation
   accessibility · get started · what's new · UI polish
   ===================================================================== */
var AXV="2.0";ICONS.bookmarkPlus="M6 3h12v18l-6-4-6 4z M12 7v6 M9 10h6";ICONS.wand="M4 20 16 8 M14 6l2-2 M18 10l2-2 M17 3v2 M21 7h-2 M19 3l-1 1";ICONS.eye2="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z";
if(!S.saved)S.saved=[];

/* ---------- smart practice: your weakest skills ---------- */
function weakSkills(n){var arr=[];UNITS.forEach(function(u){if(u.id==="words")return;var read=u.lessons.some(function(l){return S.lessons[u.id+"/"+l.id]});
  GEN.skills(u.id).forEach(function(sk,i){var m=S.sk[u.id+"|"+sk],acc=m&&m.a?m.c/m.a:null,sc=m&&m.a?acc+Math.min(m.b||0,7)*0.04:(read?0.55:0.75);arr.push({uid:u.id,sk:sk,i:i,sc:sc,acc:acc,a:m?m.a:0})})});
  arr.sort(function(x,y){return x.sc-y.sc});var out=[],per={};arr.forEach(function(x){if(out.length<n&&(per[x.uid]||0)<2){out.push(x);per[x.uid]=(per[x.uid]||0)+1}});return out}
function smartPractice(){var ws=weakSkills(7),items=[];ws.forEach(function(w,k){var c=k<3?2:1;for(var j=0;j<c&&items.length<10;j++){var it=GEN.make(w.uid,w.acc!==null&&w.acc<0.5?1:2,w.i);if(it)items.push(it)}});
  if(!items.length){toast("Answer a few questions first");return}
  startRun({u:{id:"__smart",title:"Smart practice",em:"🎯",color:"#e8edff"},mode:"prac",items:items,i:0,correct:0,answered:false},"/run");toast("10 questions from your weakest skills")}

/* ---------- saved lessons ---------- */
function saveLessonToggle(key){var i=S.saved.indexOf(key);if(i>-1)S.saved.splice(i,1);else S.saved.unshift(key);saveS();toast(i>-1?"Removed from saved lessons":"Lesson saved — find it in Review");var b=el("saveLBtn");if(b)b.querySelector("span:last-child").textContent=i>-1?"Save lesson":"Saved ✓"}
var _vlF=viewLesson;viewLesson=function(a,uid,lid){_vlF(a,uid,lid);var p=a.querySelector("#qmLesson .qm-pop");if(!p)return;var key=uid+"/"+lid,on=S.saved.indexOf(key)>-1;
  p.insertAdjacentHTML("afterbegin",'<button class="qm-i" id="saveLBtn" onclick="qmClose();saveLessonToggle(\''+key+'\')"><span class="qm-ic">'+ic("bookmark")+'</span><span>'+(on?"Saved ✓":"Save lesson")+'</span></button>')};
var _vrF=viewRevise;viewRevise=function(a){_vrF(a);var g=a.querySelector(".rgrid");if(!g)return;
  g.insertAdjacentHTML("afterbegin",'<a class="card rv-i qa-v" href="javascript:smartPractice()"><span class="qa-ic">'+ic("wand")+'</span><b>Smart practice</b><small>10 questions picked from your weakest skills</small>'+ic("arrowR","rv-go")+'</a>');
  var list=S.saved.map(function(k){var p=k.split("/"),u=findUnit(p[0]),l=u&&u.lessons.filter(function(x){return x.id===p[1]})[0];return l?'<a class="pl" href="#/lesson/'+k+'"><span class="pl-ic">'+ic(UICON[u.id]||"book")+'</span><span class="pl-t"><b>'+esc(l.t)+'</b><small>'+esc(u.title)+'</small></span><button class="tb-btn" title="Remove" onclick="event.preventDefault();event.stopPropagation();saveLessonToggle(\''+k+'\');viewRevise(el(\'app\'))">'+ic("x")+'</button></a>':""}).join("");
  a.querySelector("section").insertAdjacentHTML("beforeend",'<h2 class="sec">'+ic("bookmark")+' Saved lessons</h2><div class="card pad">'+(list||'<p class="muted">Save any lesson from its ⋯ menu to keep it here for later.</p>')+'</div>')};

/* ---------- progress: jump links + skill insights ---------- */
var _vpF=viewProgress;viewProgress=function(a){_vpF(a);var rows=[];UNITS.forEach(function(u){GEN.skills(u.id).forEach(function(sk,i){var m=S.sk[u.id+"|"+sk];if(m&&m.a)rows.push({u:u,sk:sk,i:i,a:m.a,c:m.c,b:m.b||0})})});rows.sort(function(x,y){return x.c/x.a-y.c/y.a});
  var h='<h2 class="sec">Skill insights</h2><div class="card pad">'+(rows.length?'<p class="muted" style="margin-top:0">Every skill you have practised, weakest first. Tap Practise to drill one.</p><div class="sk-ins">'+rows.slice(0,40).map(function(r){var p=Math.round(100*r.c/r.a);return '<div class="ski"><span class="ski-p '+(p<60?"lo":p<80?"mid":"hi")+'">'+p+'%</span><div><b>'+esc(r.sk)+'</b><small>'+esc(r.u.title)+' · '+r.c+'/'+r.a+' correct</small></div>'+memDots(r.b)+'<button class="btn sm" onclick="unitGenRun(\''+r.u.id+'\',2,'+r.i+')">Practise</button></div>'}).join("")+'</div>':'<p class="muted">Practise a few questions and your skill-by-skill picture will appear here.</p>')+'</div>';
  var anchor=a.querySelector(".crgrid");if(anchor)anchor.insertAdjacentHTML("afterend",h);
  var secs=a.querySelectorAll("h2.sec"),chips=[];secs.forEach(function(s,i){var id="ps"+i;s.id=id;chips.push('<button class="tog" onclick="var t=document.getElementById(\''+id+'\');t&&t.scrollIntoView&&t.scrollIntoView({behavior:\'smooth\',block:\'start\'})">'+esc(s.textContent.trim())+'</button>')});
  var ph=a.querySelector(".pg-h");if(ph&&chips.length)ph.insertAdjacentHTML("afterend",'<div class="jumps">'+chips.join("")+'</div>')};

/* ---------- pronunciation ---------- */
function sayWord(w){try{var ss=window.speechSynthesis;if(!ss){toast("Audio isn't supported in this browser");return}ss.cancel();var u=new SpeechSynthesisUtterance(w);u.lang="en-US";u.rate=.9;ss.speak(u)}catch(e){}}
function addSpeakers(root){if(!window.speechSynthesis||!root)return;root.querySelectorAll(".vocab-t tr td:first-child b, .term > b, .gl dt").forEach(function(b){if(b.querySelector(".say"))return;var w=b.firstChild&&b.firstChild.nodeValue?b.firstChild.nodeValue:b.textContent;b.insertAdjacentHTML("beforeend",' <button class="say" title="Hear it" onclick="event.stopPropagation();sayWord(\''+esc(w.trim()).replace(/'/g,"\\'")+'\')">'+ic("speak")+'</button>')})}
var _lsF=lpShow;lpShow=function(d){_lsF(d);addSpeakers(el("plStage"))};
var _vgF=viewGlossary;viewGlossary=function(a){_vgF(a);addSpeakers(a)};
var _dcF=drawCard;drawCard=function(){_dcF();var D=DECK,c=D&&D.cards[D.i],f=document.querySelector(".face.front");if(c&&c.uid==="words"&&f&&window.speechSynthesis)f.insertAdjacentHTML("beforeend",'<button class="say big" onclick="event.stopPropagation();sayWord(\''+esc(c.f).replace(/'/g,"\\'")+'\')">'+ic("speak")+'</button>')};

/* ---------- accessibility ---------- */
function applyA11y(){var h=document.documentElement;h.classList.toggle("readable",!!S.readable);h.classList.toggle("contrast",!!S.contrast);h.classList.toggle("calm",!!S.calm)}applyA11y();
var _soF2=settingsOpen;settingsOpen=function(){_soF2();var set=document.querySelector(".modal.settings .set");if(!set)return;
  set.insertAdjacentHTML("beforeend",'<div class="set-h">Accessibility</div>'+[["readable","Readable font","Wider letters and more line spacing"],["contrast","High contrast","Stronger text and borders"],["calm","Calm mode","Turn off animations and motion"]].map(function(x){return '<div class="setrow"><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div><button class="sw'+(S[x[0]]?" on":"")+'" data-a11y="'+x[0]+'"><i></i></button></div>'}).join("")+'<p class="ver">AXIOM '+AXV+' · works offline once installed · your data stays on this device</p>');
  set.querySelectorAll("[data-a11y]").forEach(function(b){b.onclick=function(){var k=b.getAttribute("data-a11y");S[k]=!S[k];saveS();b.classList.toggle("on",!!S[k]);applyA11y()}});trUI(set)};

/* ---------- get started (new accounts) & what's new (existing users) ---------- */
function getStarted(){if(document.querySelector(".modal.gs"))return;var nm=(S.profile&&S.profile.name)||"";S.started=1;S.seenVer=AXV;saveS();
  var m=modal('<div class="auth-hero">'+AXLOGO+'</div><h2>Welcome to AXIOM'+(nm?", "+esc(nm):"")+'</h2><p class="muted" style="text-align:center">How would you like to begin?</p><div class="gs-opts">'+
   '<button class="gs-o rec" onclick="this.closest(\'.modal\').remove();go(\'/diagnostic\')"><span class="qa-ic">'+ic("target")+'</span><b>Take the diagnostic</b><small>Recommended · 30 min · get a personal study guide</small></button>'+
   '<button class="gs-o" onclick="this.closest(\'.modal\').remove();go(\'/unit/nums\')"><span class="qa-ic">'+ic("play")+'</span><b>Start from Step 1</b><small>Begin with the basics and go in order</small></button>'+
   '<button class="gs-o" onclick="this.closest(\'.modal\').remove();go(\'/\');setTimeout(function(){tourStart(0)},400)"><span class="qa-ic">'+ic("compass")+'</span><b>Take the 30-second tour</b><small>See where everything is</small></button></div>',"gs");trUI(m)}
var _obF=onboard;onboard=function(edit){_obF(edit);var b=el("obSave");if(b&&!S.started)b.addEventListener("click",function(){setTimeout(getStarted,450)})};
function whatsNew(){S.seenVer=AXV;saveS();var L=[["sparkles","AXIOM brand","A new look, logo and name everywhere."],["target","Diagnostic test","A personal study guide that reorders your plan."],["graph","Graphing calculator","Zeros, vertices and intersections — like Desmos."],["wand","Smart practice","10 questions from your weakest skills, one tap."],["trophy","League & duels","Compete with everyone on this device."],["focus","Flexible layout","Collapse, move or hide the menu; focus mode."]];
  var m=modal('<h2>What\u2019s new in AXIOM '+AXV+'</h2><div class="wn">'+L.map(function(x){return '<div class="wn-i"><span class="qa-ic">'+ic(x[0])+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join("")+'</div><button class="btn pri block" data-close>Let\u2019s go</button>',"gs");trUI(m)}
setTimeout(function(){if(el("gate")||document.querySelector(".modal"))return;if(window.Z800_USER&&S.xp>0&&S.seenVer!==AXV)whatsNew()},2600);

/* ---------- entry points ---------- */
var _qiF=quickItems;quickItems=function(){var l=_qiF();l.splice(0,0,["wand","Smart practice","smartPractice()"]);return l};buildTop();
var _paF=paletteActions;paletteActions=function(){var l=_paF();l.splice(1,0,["wand","Smart practice — weakest skills",smartPractice],["bookmark","Saved lessons",function(){go("/revise")}]);return l};
var _vhF2=viewHome;viewHome=function(a){_vhF2(a);var pl=a.querySelector(".plan-c .ch");if(pl&&S.answered>=5)pl.insertAdjacentHTML("afterend",'<a class="pl" href="javascript:smartPractice()"><span class="pl-ic">'+ic("wand")+'</span><span class="pl-t"><b>Smart practice</b><small>10 questions from your weakest skills</small></span>'+ic("chevR","pl-go")+'</a>')};
Object.assign(RU,{"Smart practice":"Умная практика","Saved lessons":"Сохранённые уроки","Save lesson":"Сохранить урок","Skill insights":"Навыки подробно","Practise":"Практика","Accessibility":"Доступность","Readable font":"Удобный шрифт","High contrast":"Высокий контраст","Calm mode":"Спокойный режим","Take the diagnostic":"Пройти диагностику","Start from Step 1":"Начать с шага 1","Take the 30-second tour":"Обзор за 30 секунд"});

/* ---------- polish ---------- */
(function(){var c=`
:focus-visible{outline:2.5px solid var(--blue);outline-offset:2px;border-radius:8px}
::selection{background:color-mix(in srgb,var(--blue) 30%,transparent)}
.mainc{scrollbar-width:thin;scrollbar-color:var(--line) transparent}.mainc::-webkit-scrollbar{width:10px}.mainc::-webkit-scrollbar-thumb{background:var(--line);border-radius:10px;border:3px solid var(--bg)}
#app>.sec-h:first-child h2,#app>section>.sec-h:first-child h2{font-family:var(--disp);font-size:clamp(26px,3.6vw,36px);margin:0}
.sec-h{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:6px 0 16px}.sec-h .k{color:var(--ink2);font-size:14px}
.empty{border-radius:18px}.empty .ic{display:block;margin:0 auto 8px}
.jumps{display:flex;gap:6px;flex-wrap:wrap;margin:-4px 0 16px;position:sticky;top:64px;z-index:6;padding:8px 0;background:linear-gradient(var(--bg) 70%,transparent)}.jumps .tog{padding:6px 12px;font-size:13px}
.sk-ins{display:flex;flex-direction:column;gap:6px}.ski{display:grid;grid-template-columns:56px 1fr auto auto;gap:10px;align-items:center;padding:8px 10px;border-radius:12px;background:var(--soft)}.ski small{display:block;color:var(--ink2);font-size:12px}
.ski-p{font:800 15px var(--mono);text-align:center;padding:6px 0;border-radius:10px}.ski-p.lo{color:var(--red);background:color-mix(in srgb,var(--red) 12%,transparent)}.ski-p.mid{color:#c98500;background:color-mix(in srgb,var(--yel) 18%,transparent)}.ski-p.hi{color:var(--grn);background:color-mix(in srgb,var(--grn) 14%,transparent)}
@media(max-width:600px){.ski{grid-template-columns:48px 1fr}.ski .mdots,.ski .btn{grid-column:2}}
.say{display:inline-grid;place-items:center;width:26px;height:26px;margin-left:4px;border-radius:8px;border:1px solid var(--line);background:var(--paper);color:var(--blue);cursor:pointer;vertical-align:middle}.say .ic{width:14px;height:14px}.say.big{position:absolute;bottom:14px;right:14px;width:40px;height:40px}.say.big .ic{width:20px;height:20px}
.set-h{margin:16px 0 2px;font-size:11.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ink2)}.ver{margin:14px 0 0;font-size:12px;color:var(--ink2);text-align:center}
.gs .mbox{text-align:left}.gs h2{text-align:center}.gs .auth-hero{background:none;width:72px;height:72px}.gs .auth-hero .axlogo{border-radius:20px}
.gs-opts{display:flex;flex-direction:column;gap:10px;margin-top:14px}.gs-o{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:12px;align-items:center;padding:14px;border-radius:16px;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;text-align:left;font-family:var(--ui);transition:transform .15s,border-color .15s}
.gs-o:hover{transform:translateY(-2px);border-color:var(--blue)}.gs-o .qa-ic{grid-row:1/3;margin:0;background:color-mix(in srgb,var(--blue) 14%,transparent);color:var(--blue)}.gs-o small{color:var(--ink2)}.gs-o.rec{border-color:color-mix(in srgb,var(--blue) 55%,var(--line));box-shadow:0 0 0 4px color-mix(in srgb,var(--blue) 10%,transparent)}
.wn{display:flex;flex-direction:column;gap:8px;margin:14px 0}.wn-i{display:flex;gap:12px;align-items:center;padding:10px;border-radius:14px;background:var(--soft)}.wn-i .qa-ic{margin:0;background:color-mix(in srgb,var(--violet) 15%,transparent);color:var(--violet)}.wn-i small{display:block;color:var(--ink2)}
html.readable{--ui:Verdana,Tahoma,"Segoe UI",sans-serif}html.readable .pg,html.readable .q-q,html.readable .lesson{letter-spacing:.015em;line-height:1.85}
html.contrast[data-theme="dark"]{--ink:#ffffff;--ink2:#c9d1e6;--line:#4a5678}html.contrast[data-theme="light"]{--ink:#000000;--ink2:#333a4d;--line:#9aa3b8}
html.calm *,html.calm *::before,html.calm *::after{animation:none!important;transition:none!important}html.calm .fdraw{stroke-dashoffset:0}html.calm .ambient{display:none}
.tabbar a.on::after{content:"";display:block;width:18px;height:3px;border-radius:3px;background:var(--blue);margin-top:2px}
.btn,.tb-btn,.qm-b,.tog,.opt{-webkit-tap-highlight-color:transparent}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
