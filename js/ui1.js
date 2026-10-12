/* =====================================================================
   ZERO TO 800 — APP UI (1) · icons · shell · settings · atmosphere
   ===================================================================== */
function fastObserve(fn,cd,guard){var pend=[],sch=false,opts={childList:true,subtree:true,characterData:!!cd};
  var mo=new MutationObserver(function(rs){if(guard&&!guard())return;for(var i=0;i<rs.length;i++){var r=rs[i];if(r.type==="characterData")pend.push(r.target.parentNode);else for(var j=0;j<r.addedNodes.length;j++){var n=r.addedNodes[j];pend.push(n.nodeType===3?n.parentNode:n)}}
    if(sch)return;sch=true;requestAnimationFrame(function(){mo.disconnect();var L=pend;pend=[];sch=false;for(var k=0;k<L.length;k++){var n=L[k];if(n&&n.nodeType===1&&n.isConnected){try{fn(n)}catch(e){}}}mo.takeRecords();mo.observe(document.body,opts)})});
  mo.observe(document.body,opts);return mo}
var ICONS={
home:"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
bookOpen:"M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z",
book:"M5 4a2 2 0 0 1 2-2h12v17H7a2 2 0 0 0-2 2z M5 21V4 M9 7h6",
database:"M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
timer:"M10 2h4 M12 13l3-3 M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0z",
clock:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M12 7v5l3 2",
repeat:"M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3",
cards:"M4 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z M6 3h14a2 2 0 0 1 2 2v12",
moon:"M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z",
sun:"M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
trendUp:"M3 17l6-6 4 4 8-8 M15 7h6v6",
barChart:"M5 20V11 M11 20V5 M17 20v-6 M3 20h18",
flame:"M12 22c-4 0-7-3-7-7 0-4 3-6 4-10 2 2 3 4 3 6 1-1 2-2 2-4 3 2 5 5 5 8 0 4-3 7-7 7z",
star:"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
zap:"M13 2 4 14h7l-1 8 9-12h-7z",
brain:"M9.5 3A3 3 0 0 0 6.6 6 3 3 0 0 0 4 10.5a3 3 0 0 0 1 5 3 3 0 0 0 4.5 3.3V3.3 M14.5 3A3 3 0 0 1 17.4 6 3 3 0 0 1 20 10.5a3 3 0 0 1-1 5 3 3 0 0 1-4.5 3.3 M12 4v17",
fileText:"M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6 M8 13h8 M8 17h5",
check:"M5 12.5l4.5 4.5L19 7",
x:"M6 6l12 12 M18 6 6 18",
chevR:"M9 6l6 6-6 6",chevL:"M15 6l-6 6 6 6",chevD:"M6 9l6 6 6-6",
arrowR:"M5 12h14 M13 6l6 6-6 6",arrowL:"M19 12H5 M11 6l-6 6 6 6",
bookmark:"M6 3h12v18l-6-4-6 4z",
flag:"M5 21V4 M5 4h12l-2.5 4L17 12H5",
calc:"M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8v4H8z M8 14h.01 M12 14h.01 M16 14h.01 M8 18h.01 M12 18h.01 M16 18h.01",
sigma:"M18 5H6l6 7-6 7h12",
bulb:"M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z",
alert:"M12 3 2 20h20z M12 10v4 M12 17h.01",
target:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
trophy:"M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0z M7 6H4v1a3 3 0 0 0 3 3 M17 6h3v1a3 3 0 0 1-3 3",
award:"M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.5 14 7 22l5-3 5 3-1.5-8",
play:"M7 4l13 8-13 8z",pause:"M7 4h3v16H7z M14 4h3v16h-3z",
volume:"M11 5 6 9H3v6h3l5 4z M15.5 9a4 4 0 0 1 0 6 M18.5 6a8 8 0 0 1 0 12",
volOff:"M11 5 6 9H3v6h3l5 4z M16 9l5 6 M21 9l-5 6",
search:"M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z M21 21l-5-5",
filter:"M3 5h18l-7 8v6l-4 2v-8z",
globe:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
headphones:"M4 15v-3a8 8 0 0 1 16 0v3 M4 15h3v6H5a1 1 0 0 1-1-1z M20 15h-3v6h2a1 1 0 0 0 1-1z",
coffee:"M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z M17 10h2a2 2 0 0 1 0 4h-2 M8 2v3 M12 2v3",
pen:"M4 20h4L19 9l-4-4L4 16z M13 7l4 4",
eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
hash:"M5 9h14 M5 15h14 M10 3 8 21 M16 3l-2 18",
pie:"M21 12A9 9 0 1 1 12 3v9z M15 3.5A9 9 0 0 1 20.5 9H15z",
scale:"M12 3v18 M6 21h12 M4 7h16 M7 7l-3 7a3 3 0 0 0 6 0z M17 7l-3 7a3 3 0 0 0 6 0z",
fx:"M7 20c2 0 2.5-2 3-8s1-8 3.5-8 M6 11h6 M14 11l6 8 M20 11l-6 8",
ineq:"M10 6 4 12l6 6 M14 6l6 6-6 6",
intersect:"M3 19 21 6 M3 6l18 13 M12 12.5h.01",
power:"M4 20l7-9 M11 20 4 11 M15 4h5l-5 6h5",
parabola:"M3 4c3 17 15 17 18 0 M2 20h20",
rocket:"M5 15c-1 1-2 5-2 6 1 0 5-1 6-2 M9 15l-3-3 6-7c3-3 6-3 9-3 0 3 0 6-3 9l-7 6z M15 9a1 1 0 1 0 0-.01",
dice:"M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 8h.01 M16 8h.01 M12 12h.01 M8 16h.01 M16 16h.01",
triangle:"M4 20V4l16 16z M4 16h4v4",
circle:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M12 12h9",
angle:"M3 20h18 M3 20 17 5 M10 20a7 7 0 0 0-2.3-5.2",
monitor:"M3 4h18v12H3z M8 21h8 M12 16v5",
crown:"M3 18h18 M3 18 2 7l6 4 4-7 4 7 6-4-1 11",
lang:"M4 5h9 M8.5 3v2 M5 9c1.5 4 4.5 6 8 7 M12 5c-1 5-4 9-8 11 M13 21l4-9 4 9 M14.3 18h5.4",
grid:"M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
list:"M8 6h13 M8 12h13 M8 18h13 M3.5 6h.01 M3.5 12h.01 M3.5 18h.01",
menu:"M3 6h18 M3 12h18 M3 18h18",
sparkles:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M12 2v3 M12 19v3 M4.2 4.2l2.1 2.1 M17.7 17.7l2.1 2.1 M2 12h3 M19 12h3 M4.2 19.8l2.1-2.1 M17.7 6.3l2.1-2.1",
user:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0",
calendar:"M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4",
rain:"M6 14a4 4 0 0 1 .5-8A6 6 0 0 1 18 7a3.5 3.5 0 0 1 0 7z M8 17l-1 3 M12 17l-1 3 M16 17l-1 3",
waves:"M2 9c3-3 5 3 8 0s5 3 8 0 3-1 4 0 M2 15c3-3 5 3 8 0s5 3 8 0 3-1 4 0",
lamp:"M10 21h4 M12 21v-9 M9 12h6 M12 3c-1 2-2 3-2 4.5a2 2 0 0 0 4 0C14 6 13 5 12 3z",
tool:"M14.5 6.5a4 4 0 0 0 5 5L11 20a2.1 2.1 0 0 1-3-3z",
save:"M5 3h11l3 3v15H5z M8 3v5h7 M8 14h8v7H8z",
refresh:"M20 11A8 8 0 1 0 18 17 M20 4v7h-7",
infinity:"M6 16a4 4 0 1 1 0-8c4 0 8 8 12 8a4 4 0 1 0 0-8c-4 0-8 8-12 8z",
cap:"M2 9l10-5 10 5-10 5z M6 11v5c3 3 9 3 12 0v-5 M22 9v6",
sprout:"M12 21v-9 M12 12c0-4 3-7 8-7 0 5-3 8-8 7z M12 14c0-3-2-5-6-5 0 4 2 6 6 5z",
tree:"M12 22v-5 M5 17h14L12 3z",
mountain:"M3 20l6-10 4 6 3-4 5 8z",
compass:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15.5 8.5l-2 5-5 2 2-5z",
type:"M4 7V5h16v2 M12 5v14 M9 19h6",
layers:"M12 3 2 8l10 5 10-5z M2 13l10 5 10-5 M2 17l10 5 10-5",
logout:"M9 21H5V3h4 M16 17l5-5-5-5 M21 12H9",
strike:"M4 12h16 M8 6a4 4 0 0 1 8 0 M9 18a4 4 0 0 0 7-1",
eyeOff:"M3 3l18 18 M10.6 5.1A10 10 0 0 1 22 12s-1.3 2.3-3.6 4.2 M6.6 6.6C3.6 8.4 2 12 2 12s4 7 10 7c1.8 0 3.4-.5 4.8-1.3",
dot:"M12 12h.01"};
function ic(n,cls){var d=ICONS[n]||ICONS.dot;return '<svg class="ic '+(cls||"")+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>'}

/* emoji → icon (applied everywhere automatically) */
var EMO={"🧑‍🏫":"cap","🎯":"target","🎲":"dice","📖":"bookOpen","🧠":"brain","⚡":"zap","🔁":"repeat","📝":"fileText","📈":"trendUp","🚀":"rocket","🔥":"flame","📚":"book","👑":"crown","⏱":"timer","📐":"triangle","🧮":"calc","🔤":"type","✏":"pen","🌙":"moon","🕯":"lamp","🗣":"lang","🧩":"fx","📊":"barChart","🏆":"trophy","💪":"trendUp","🎓":"cap","🏅":"award","🌱":"sprout","🌿":"sprout","♾":"infinity","🚩":"flag","🧭":"compass","🔢":"hash","🍕":"pie","⚖":"scale","🔗":"intersect","🎢":"parabola","🎛":"fx","🌀":"angle","🎉":"sparkles","✍":"pen","🖥":"monitor","⭐":"star","⚙":"settings","🗿":"mountain","🌳":"tree","💯":"target","📅":"calendar","🧹":"sparkles","👋":"sparkles","☀":"sun","🌤":"sun","🛠":"tool","⚐":"flag","☕":"coffee","🍅":"timer","🔈":"volOff","🔊":"volume","🌧":"rain","🌊":"waves","🔇":"volOff","⏸":"pause","💾":"save","🏠":"home","⚠":"alert","💡":"bulb","🔄":"refresh","▶":"play","✦":"sparkles","❄":"snow","⚔":"swords","🇷🇺":"globe","🧑":"user","🏫":"cap"};
var EMO_RE=new RegExp("("+Object.keys(EMO).sort(function(a,b){return b.length-a.length}).map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("|")+")\\uFE0F?","g");
function iconify(root){
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),list=[],n;
  while((n=w.nextNode())){EMO_RE.lastIndex=0;if(EMO_RE.test(n.nodeValue)){var p=n.parentElement;if(p&&!p.closest("svg,script,style,textarea,.noicon"))list.push(n)}}
  list.forEach(function(t){var f=document.createDocumentFragment(),s=t.nodeValue,last=0;EMO_RE.lastIndex=0;var m;
    while((m=EMO_RE.exec(s))){if(m.index>last)f.appendChild(document.createTextNode(s.slice(last,m.index)));var sp=document.createElement("span");sp.className="emi";sp.innerHTML=ic(EMO[m[1]]);f.appendChild(sp);last=m.index+m[0].length}
    if(last<s.length)f.appendChild(document.createTextNode(s.slice(last).replace(/^\s*\uFE0F/,"")));t.parentNode.replaceChild(f,t)});
}
fastObserve(function(n){iconify(n)},true);

/* unit icons */
var UICON={nums:"hash",frac:"pie",ratio:"scale",alg:"fx",ineq:"ineq",lines:"trendUp",sys:"intersect",wp:"bookOpen",exp:"power",quad:"parabola",func:"fx",advm:"rocket",data:"barChart",prob:"dice",geo1:"triangle",geo2:"circle",trig:"angle",desmos:"monitor",hard:"crown",words:"lang"};
var DICON={alg:"fx",adv:"parabola",psda:"barChart",geo:"triangle",pro:"crown"};
function uic(u,cls){return '<span class="utile '+(cls||"")+'" style="--uc:'+u.color+'">'+ic(UICON[u.id]||"book")+'</span>'}

/* ---------- navigation ---------- */
var NAV=[["/","Today","home"],["/units","Learn","bookOpen"],["/qb","Question Bank","database"],["/mock","Practice Tests","timer"],["/revise","Review","repeat"],["/study","Study Room","lamp"],["/progress","Progress","trendUp"]];
var NAV2=[["/formulas","Formula sheet","sigma"],["/strategy","Test strategy","compass"],["/glossary","Glossary","type"],["/unit/words","Math English","lang"],["/sheet/all","Worksheets","fileText"],["/daily","Daily challenge","zap"]];
var TABS=[["/","Today","home"],["/units","Learn","bookOpen"],["/qb","Bank","database"],["/mock","Tests","timer"],["more","More","grid"]];
function navInit(){
  el("snav").innerHTML=NAV.map(function(x){return '<a href="#'+x[0]+'" data-r="'+x[0]+'">'+ic(x[2])+'<span>'+x[1]+'</span></a>'}).join("")+'<div class="snav-sep">Library</div>'+NAV2.map(function(x){return '<a href="#'+x[0]+'" data-r="'+x[0]+'">'+ic(x[2])+'<span>'+x[1]+'</span></a>'}).join("");
  el("tabbar").innerHTML=TABS.map(function(x){return x[0]==="more"?'<button onclick="moreSheet()">'+ic(x[2])+'<span>'+x[1]+'</span></button>':'<a href="#'+x[0]+'" data-r="'+x[0]+'">'+ic(x[2])+'<span>'+x[1]+'</span></a>'}).join("");
}
var ROUTE_OF={unit:"/units",lesson:"/units",practice:"/units",quiz:"/units",cards:"/units",bank:"/qb",qb:"/qb",srs:"/revise",forever:"/revise",review:"/revise",revise:"/revise",run:"",daily:"/daily",sheet:"/sheet/all"};
var TITLES={"":"Today",units:"Learn",unit:"Unit",lesson:"Lesson",qb:"Question Bank",bank:"Practice builder",mock:"Practice Tests",revise:"Review",review:"Mistake review",srs:"Smart flashcards",forever:"Remember forever",study:"Study Room",progress:"Progress",formulas:"Formula sheet",strategy:"Test strategy",glossary:"Glossary",daily:"Daily challenge",sheet:"Worksheet",run:"Practice",practice:"Practice",quiz:"Unit quiz",cards:"Flashcards"};
var _markNavUI=markNav;
markNav=function(h){_markNavUI(h);var p=h.split("/").filter(Boolean),base="/"+(p[0]||""),act=ROUTE_OF[p[0]]!=null?ROUTE_OF[p[0]]:base;
  if(p[0]==="unit"&&p[1]==="words")act="/unit/words";
  document.querySelectorAll("#snav a,#tabbar a").forEach(function(a){a.classList.toggle("on",a.getAttribute("data-r")===act)});
  var t=TITLES[p[0]||""]||"AXIOM";if(p[0]==="unit"||p[0]==="lesson"){var u=findUnit(p[1]);if(u)t=u.title.replace(/ \(.*\)$/,"")}
  el("tbTitle").textContent=t;el("backBtn").hidden=!p.length;
  document.body.classList.toggle("focus",p[0]==="lesson");document.body.classList.toggle("immerse",p[0]==="run"||(p[0]==="qb"&&p[1]==="q")||p[0]==="practice"||p[0]==="quiz"||p[0]==="mock");
};
function moreSheet(){var m=modal('<h2>More</h2><div class="msheet">'+NAV.concat(NAV2).filter(function(x){return !TABS.some(function(t){return t[0]===x[0]})}).map(function(x){return '<a href="#'+x[0]+'" data-close>'+ic(x[2])+'<span>'+x[1]+'</span></a>'}).join("")+'<a href="javascript:void 0" onclick="settingsOpen()" data-close>'+ic("settings")+'<span>Settings</span></a></div>',"sheet");
  m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){m.remove()})})}

/* ---------- theme, ambient, settings ---------- */
function setTheme(t){document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem("z800theme",t)}catch(e){}el("themeBtn").innerHTML=ic(t==="dark"?"moon":"sun")}
function ambientToggle(){playSound(STUDY.sound?null:"rain");el("ambBtn").classList.toggle("on",!!STUDY.sound);toast(STUDY.sound?"Soft rain on — study mode":"Sound off")}
function settingsOpen(){var p=S.profile||{},th=document.documentElement.getAttribute("data-theme")||"dark";
  var m=modal('<h2>Settings</h2><div class="set">'+
   '<div class="setrow"><div><b>Appearance</b><small>Evening study room or bright library</small></div><div class="seg"><button class="'+(th==="dark"?"on":"")+'" data-th="dark">Evening</button><button class="'+(th==="light"?"on":"")+'" data-th="light">Library</button></div></div>'+
   '<div class="setrow"><div><b>Russian translations</b><small>Show (перевод) after math words</small></div><button class="sw'+(S.ruOn?" on":"")+'" id="swRu"><i></i></button></div>'+
   '<div class="setrow"><div><b>Daily goal</b><small>Questions per day</small></div><div class="seg">'+[10,20,30,50].map(function(g){return '<button class="'+((S.goalQ||20)===g?"on":"")+'" data-g="'+g+'">'+g+'</button>'}).join("")+'</div></div>'+
   '<div class="setrow"><div><b>Ambient sound</b><small>Rain, deep noise or fireplace</small></div><div class="seg">'+[["rain","Rain"],["brown","Deep"],["fire","Fire"],["","Off"]].map(function(s){return '<button class="'+((STUDY.sound||"")===s[0]?"on":"")+'" data-s="'+s[0]+'">'+s[1]+'</button>'}).join("")+'</div></div>'+
   '<div class="setrow"><div><b>Your details</b><small>'+esc(p.name||"No name")+' · target '+(p.target||800)+(p.date?' · test '+p.date:'')+'</small></div><button class="btn sm" id="setProf">Edit</button></div>'+
   '<div class="setrow"><div><b>Backup & reset</b><small>Move progress between devices</small></div><button class="btn sm" data-close onclick="go(\'/progress\')">Open</button></div></div>',"settings");
  m.querySelectorAll("[data-th]").forEach(function(b){b.onclick=function(){setTheme(b.getAttribute("data-th"));m.remove();settingsOpen()}});
  m.querySelectorAll("[data-g]").forEach(function(b){b.onclick=function(){S.goalQ=+b.getAttribute("data-g");saveS();m.remove();settingsOpen();router()}});
  m.querySelectorAll("[data-s]").forEach(function(b){b.onclick=function(){playSound(b.getAttribute("data-s")||null);el("ambBtn").classList.toggle("on",!!STUDY.sound);m.remove();settingsOpen()}});
  el("swRu").onclick=function(){S.ruOn=!S.ruOn;saveS();this.classList.toggle("on",S.ruOn);var rb=el("ruBtn");if(rb)rb.classList.toggle("on",S.ruOn);router()};
  el("setProf").onclick=function(){m.remove();onboard(true)};
}
(function(){
  navInit();
  var ob=el("themeBtn"),nb=ob.cloneNode(true);ob.parentNode.replaceChild(nb,ob);
  var t=null;try{t=localStorage.getItem("z800theme")}catch(e){}setTheme(t||"dark");
  el("themeBtn").onclick=function(e){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")};
  el("ambBtn").innerHTML=ic("headphones");el("setBtn").innerHTML=ic("settings");el("backBtn").innerHTML=ic("chevL");
  el("backBtn").onclick=function(){history.length>1?history.back():go("/")};
  var rb=el("ruBtn");if(rb){rb.innerHTML=ic("globe")+"<span>RU</span>";el("tbTools").insertBefore(rb,el("themeBtn"))}
  document.querySelectorAll(".pill.fire .pi").forEach(function(x){x.innerHTML=ic("flame")});
  document.querySelectorAll(".pill.xp .pi").forEach(function(x){x.innerHTML=ic("sparkles")});
})();
