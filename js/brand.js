/* =====================================================================
   AXIOM — brand & flexible interface
   ===================================================================== */
var AXLOGO='<svg class="axlogo" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="axg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--violet)"/></linearGradient></defs><rect width="64" height="64" rx="17" fill="url(#axg)"/><path d="M17 47 L32 15 L47 47" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 36 H53" stroke="#fff" stroke-width="3.6" stroke-linecap="round" opacity=".92"/><circle cx="32" cy="15" r="3.4" fill="#fff"/></svg>';
ICONS.sidebar="M3 4h18v16H3z M9 4v16";ICONS.collapse="M15 6l-6 6 6 6 M20 4v16";ICONS.swap="M7 7h13 M16 3l4 4-4 4 M17 17H4 M8 13l-4 4 4 4";ICONS.pin="M12 17v5 M7 3h10l-1 6 3 4H5l3-4z";ICONS.palette="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-.6-.3-1-.6-1.4-.3-.4-.4-.8-.4-1.2 0-1 .8-1.4 1.8-1.4H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z M7.5 11h.01 M10 7h.01 M14.5 7h.01";ICONS.keyboard="M3 6h18v12H3z M7 10h.01 M11 10h.01 M15 10h.01 M7 14h10";ICONS.focus="M4 9V5h4 M20 9V5h-4 M4 15v4h4 M20 15v4h-4 M12 12h.01";ICONS.dots="M5 12h.01 M12 12h.01 M19 12h.01";ICONS.week="M4 5h16v16H4z M4 10h16 M9 14h2 M13 14h2 M9 17h2";ICONS.layout="M4 4h16v16H4z M4 10h16 M10 10v10";
if(!S.ui)S.ui={side:"full",pos:"left",w:252};if(!S.pins)S.pins=[];if(!S.recent)S.recent=[];if(!S.homeHide)S.homeHide={};if(!S.accent)S.accent="indigo";
document.title="AXIOM — SAT Math";

/* ---------- brand text & logo everywhere ---------- */
function brandify(root){(root.querySelectorAll?root:document).querySelectorAll(".logo-m,.pd-logo").forEach(function(x){if(!x.querySelector(".axlogo")){x.innerHTML=AXLOGO;x.classList.add("axm")}});
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode()))if(n.nodeValue.indexOf("Zero to 800")>-1&&!(n.parentElement&&n.parentElement.closest("input,textarea")))L.push(n);
  L.forEach(function(t){t.nodeValue=t.nodeValue.replace(/Zero to 800/g,"AXIOM")})}
fastObserve(function(n){brandify(n)},false);
(function(){var b=document.querySelector(".brand");if(b)b.innerHTML='<span class="logo-m axm">'+AXLOGO+'</span><div class="brand-t"><b>AXIOM</b><small>SAT Math · 0 → 800</small></div>'})();

/* ---------- splash ---------- */
(function(){var seen=false;try{seen=sessionStorage.getItem("axiom_splash")}catch(e){}if(seen||(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;
  var s=document.createElement("div");s.id="splash";s.innerHTML='<div class="sp-in">'+AXLOGO+'<b>AXIOM</b><small>SAT Math, built from first principles.</small></div>';document.body.appendChild(s);
  try{sessionStorage.setItem("axiom_splash","1")}catch(e){}setTimeout(function(){s.classList.add("out")},1100);setTimeout(function(){s.remove()},1700)})();

/* ---------- accent colours ---------- */
var ACCENTS={indigo:["Indigo","#7f9cff","#a98bff","#3d5cff","#7658ff"],ocean:["Ocean","#4fc3f7","#5b8def","#0284c7","#2563eb"],emerald:["Emerald","#4bd596","#2dd4bf","#059669","#0d9488"],sunset:["Sunset","#ffb35c","#ff7a8a","#ea7a0c","#e0405a"],rose:["Rose","#ff8fb1","#c084fc","#e11d74","#9333ea"]};
function setAccent(k){S.accent=ACCENTS[k]?k:"indigo";saveS();var a=ACCENTS[S.accent],st=el("accentCss");if(!st){st=document.createElement("style");st.id="accentCss";document.head.appendChild(st)}
  st.textContent='html[data-theme="dark"]{--blue:'+a[1]+';--violet:'+a[2]+'}html[data-theme="light"]{--blue:'+a[3]+';--violet:'+a[4]+'}'}
setAccent(S.accent);

/* ---------- theme switch: always at the top ---------- */
function themeSwitchHTML(cls){var d=document.documentElement.getAttribute("data-theme")==="dark";return '<button class="thsw '+(cls||"")+(d?" dark":"")+'" onclick="themeFlip()" title="Light / dark mode (T)" aria-label="Toggle light or dark mode"><span class="ts-sun">'+ic("sun")+'</span><span class="ts-moon">'+ic("moon")+'</span><i class="ts-knob"></i></button>'}
function themeFlip(){var d=document.documentElement.getAttribute("data-theme")==="dark";document.documentElement.classList.add("theming");setTheme(d?"light":"dark");setTimeout(function(){document.documentElement.classList.remove("theming")},450);
  document.querySelectorAll(".thsw").forEach(function(b){b.classList.toggle("dark",!d)});if(typeof sfx==="function")sfx("tap");if(typeof grDraw==="function")grDraw()}

/* ---------- quick menus (hover or click) ---------- */
function qmenu(id,btn,items,cls){return '<div class="qm '+(cls||"")+'" id="'+id+'"><button class="qm-b" onclick="qmToggle(\''+id+'\',event)" aria-haspopup="true">'+btn+'</button><div class="qm-pop">'+items.map(function(x){return x==="-"?'<i class="qm-sep"></i>':'<button class="qm-i" onclick="qmClose();'+x[2]+'"><span class="qm-ic">'+ic(x[0])+'</span><span>'+x[1]+'</span>'+(x[3]?'<kbd>'+x[3]+'</kbd>':'')+'</button>'}).join("")+'</div></div>'}
function qmToggle(id,e){if(e)e.stopPropagation();var m=el(id);if(!m)return;var o=m.classList.contains("open");qmClose();if(!o){m.classList.add("open");if(typeof sfx==="function")sfx("tap")}}
function qmClose(){document.querySelectorAll(".qm.open").forEach(function(m){m.classList.remove("open")})}
document.addEventListener("click",function(e){if(!(e.target.closest&&e.target.closest(".qm")))qmClose()});
function quickItems(){return [["search","Search & commands","searchOpen()","Ctrl K"],["calc","Calculator","calcOpen()","C"],["graph","Graphing calculator","graphOpen()","G"],["sigma","Reference sheet","refOpen()"],["draw","Scratchpad","scratchOpen()","D"],"-",["focus","Focus mode","zenToggle()","F"],["burger","Tuck menu into ☰ / open it","sideToggle()","\\"],["headphones","Ambient sound","ambientToggle()"],["globe","Language: EN / RU","setLang(S.uiLang===\'ru\'?\'en\':\'ru\')"],["palette","Accent colour","accentCycle()"],"-",["week","Weekly report","go(\'/week\')"],["layout","Customize home","homeCustomize()"],["keyboard","Keyboard shortcuts","shortcutsOpen()","?"],["help","Help","helpOpen()"],["settings","Settings","settingsOpen()"],["user","Account","authOpen()"]].concat(typeof INSTALL!=="undefined"&&INSTALL?[["download","Install AXIOM app","installApp()"]]:[])}
function accentCycle(){var k=Object.keys(ACCENTS),i=(k.indexOf(S.accent)+1)%k.length;setAccent(k[i]);toast("Accent: "+ACCENTS[k[i]][0])}
function buildTop(){var t=el("tbTools");if(!t)return;var old=t.querySelector(".tb-new");if(old)old.remove();
  t.insertAdjacentHTML("beforeend",'<div class="tb-new"><button class="srch-pill" onclick="searchOpen()">'+ic("search")+'<span>Search or jump to…</span><kbd>Ctrl K</kbd></button>'+qmenu("qmTop",ic("grid")+'<span class="qm-lab">Tools</span>',quickItems(),"right")+themeSwitchHTML()+'</div>');
  var tb=document.querySelector(".topbar");if(tb&&!el("sideBtn"))tb.insertAdjacentHTML("afterbegin",'<button class="tb-btn keep" id="sideBtn" title="Menu" onclick="sideToggle()">'+ic("sidebar")+'</button>')}
buildTop();

/* ---------- sidebar: collapse · hide · move · resize ---------- */
function applySide(){var b=document.body,u=S.ui;b.classList.toggle("side-mini",u.side==="mini");b.classList.toggle("side-hidden",u.side==="hidden");b.classList.toggle("side-right",u.pos==="right");document.documentElement.style.setProperty("--side-w",(u.w||252)+"px")}
function sideSet(k,v){S.ui[k]=v;saveS();applySide()}
function sideToggle(){if(window.innerWidth<=900){moreSheet();return}sideSet("side",S.ui.side==="hidden"?"full":"hidden");sfx&&sfx("tap")}
function sideMini(){sideSet("side",S.ui.side==="mini"?"full":"mini")}
function sideMove(){sideSet("pos",S.ui.pos==="right"?"left":"right");toast(S.ui.pos==="right"?"Menu moved to the right":"Menu moved to the left")}
(function(){var side=document.querySelector(".side");if(!side)return;
  side.insertAdjacentHTML("afterbegin",'<div class="side-ctl"><button title="Collapse to icons ([)" onclick="sideMini()">'+ic("collapse")+'</button><button title="Move menu left / right" onclick="sideMove()">'+ic("swap")+'</button><button title="Hide menu (\\)" onclick="sideSet(\'side\',\'hidden\')">'+ic("x")+'</button></div>');
  var rs=document.createElement("div");rs.className="side-rs";rs.title="Drag to resize";side.appendChild(rs);var drag=false;
  rs.addEventListener("pointerdown",function(e){drag=true;rs.setPointerCapture(e.pointerId);document.body.classList.add("resizing")});
  rs.addEventListener("pointermove",function(e){if(!drag)return;var w=S.ui.pos==="right"?window.innerWidth-e.clientX:e.clientX;S.ui.w=Math.max(200,Math.min(380,Math.round(w)));document.documentElement.style.setProperty("--side-w",S.ui.w+"px")});
  rs.addEventListener("pointerup",function(){drag=false;document.body.classList.remove("resizing");saveS()});
  rs.addEventListener("dblclick",function(){S.ui.w=252;saveS();applySide()});
  document.querySelectorAll("#snav a, .snav a").forEach(function(a){if(!a.title)a.title=a.textContent.trim()})})();
applySide();
/* pinned units in the sidebar */
var _niB=navInit;navInit=function(){_niB();var sn=el("snav");if(!sn)return;sn.querySelectorAll("a").forEach(function(a){a.title=a.textContent.trim()});
  if(S.pins.length){var h='<div class="snav-sep">Pinned</div>'+S.pins.map(function(id){var u=findUnit(id);return u?'<a href="#/unit/'+id+'" data-r="/unit/'+id+'" title="'+esc(u.title)+'">'+ic(UICON[id]||"book")+'<span>'+esc(u.title)+'</span></a>':""}).join("");sn.insertAdjacentHTML("beforeend",h)}};
navInit();
function pinToggle(id){var i=S.pins.indexOf(id);if(i>-1)S.pins.splice(i,1);else S.pins.push(id);saveS();navInit();toast(i>-1?"Unpinned":"Pinned to the menu");router()}
var _vuB=viewUnit;viewUnit=function(a,id,tab){_vuB(a,id,tab);var r=a.querySelector(".uhero .row");if(r){var on=S.pins.indexOf(id)>-1;r.insertAdjacentHTML("beforeend",'<button class="btn ghost'+(on?" pinned":"")+'" onclick="pinToggle(\''+id+'\')">'+ic("pin")+(on?"Pinned":"Pin to menu")+'</button>')}};

/* ---------- focus mode ---------- */
function zenToggle(){document.body.classList.toggle("zen");var on=document.body.classList.contains("zen");if(on&&!el("zenExit")){document.body.insertAdjacentHTML("beforeend",'<button id="zenExit" onclick="zenToggle()">'+ic("x")+' Exit focus mode</button>')}else{var z=el("zenExit");if(z)z.remove()}toast(on?"Focus mode on — press F to exit":"Focus mode off")}

/* ---------- lesson & question quick menus ---------- */
var _vlB=viewLesson;viewLesson=function(a,uid,lid){_vlB(a,uid,lid);var top=a.querySelector(".pl-top");if(!top)return;var btns=[].slice.call(top.querySelectorAll(".tb-btn")).slice(1);
  var items=btns.map(function(b,i){b.id=b.id||("plb"+i);return [null,b.title||"Tool",b]});var pop=document.createElement("div");pop.className="qm right";pop.id="qmLesson";pop.innerHTML='<button class="qm-b" onclick="qmToggle(\'qmLesson\',event)">'+ic("dots")+'</button><div class="qm-pop"></div>';
  var p=pop.querySelector(".qm-pop");items.forEach(function(x){var b=x[2];b.classList.add("qm-i");b.insertAdjacentHTML("beforeend",'<span>'+esc(x[1])+'</span>');b.addEventListener("click",qmClose);p.appendChild(b)});
  top.appendChild(pop);top.insertAdjacentHTML("beforeend",themeSwitchHTML("sm"))};
var _dqB=drawQuestion;drawQuestion=function(){_dqB();var tl=document.querySelector(".q-card .q-tools");if(!tl||tl.querySelector(".qm"))return;var hint=el("hintBtn"),rest=[].slice.call(tl.querySelectorAll(".btn")).filter(function(b){return b!==hint});
  var pop=document.createElement("div");pop.className="qm";pop.id="qmQ";pop.innerHTML='<button class="qm-b btn sm ghost" onclick="qmToggle(\'qmQ\',event)">'+ic("tool")+'Tools</button><div class="qm-pop"></div>';var p=pop.querySelector(".qm-pop");
  rest.forEach(function(b){b.className="qm-i";b.addEventListener("click",qmClose);p.appendChild(b)});
  [["calc","Calculator","calcOpen()"],["sigma","Reference sheet","refOpen()"]].forEach(function(x){p.insertAdjacentHTML("beforeend",'<button class="qm-i" onclick="qmClose();'+x[2]+'"><span class="qm-ic">'+ic(x[0])+'</span><span>'+x[1]+'</span></button>')});tl.appendChild(pop)};

/* ---------- recent pages ---------- */
var _rB=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);
  if(p[0]==="week"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);return viewWeek(a)}
  var r=_rB();try{if(p[0]==="lesson"||p[0]==="unit"){var u=findUnit(p[1]),t=null;if(u){if(p[0]==="unit")t=u.title;else{var l=u.lessons.filter(function(x){return x.id===p[2]})[0];if(l)t=l.t}}
    if(t){S.recent=S.recent.filter(function(x){return x.h!==h});S.recent.unshift({h:h,t:t,u:p[1],k:p[0]});S.recent=S.recent.slice(0,8)}}}catch(e){}
  var tt=el("tbTitle");if(tt&&!p.length)tt.textContent="Today";return r};

/* ---------- command palette (replaces search) ---------- */
function paletteActions(){var d=document.documentElement.getAttribute("data-theme")==="dark";return [
  ["sun",d?"Light / dark mode — switch to light":"Light / dark mode — switch to dark",themeFlip,"T"],["target","Take the diagnostic test",function(){go("/diagnostic")}],["dice","Random practice question",function(){qbStartList(true)}],["zap","Daily challenge",function(){go("/daily")}],["calendar","Open study plan",function(){go("/plan")}],["timer","Start a practice test",function(){go("/mock")}],["calc","Calculator",calcOpen,"C"],["graph","Graphing calculator",graphOpen,"G"],["draw","Scratchpad",scratchOpen,"D"],["focus","Focus mode",zenToggle,"F"],["burger","Tuck menu into ☰ / open it",sideToggle,"\\"],["collapse","Collapse menu to icons",sideMini,"["],["swap","Move menu left / right",sideMove],["palette","Change accent colour",accentCycle],["week","Weekly report",function(){go("/week")}],["keyboard","Keyboard shortcuts",shortcutsOpen,"?"],["settings","Settings",settingsOpen],["user","Account",authOpen]]}
searchOpen=function(){var m=modal('<div class="srch big">'+ic("search")+'<input id="gsq" placeholder="Search lessons, formulas, words — or type a command" autocomplete="off"><kbd>Esc</kbd></div><div id="gsr" class="gsr"></div>',"searchm");
  var inp=el("gsq"),sel=0;inp.focus();
  var ACTS=[];function rowA(x){ACTS.push(x[2]);return '<a class="gsi" href="javascript:void 0" data-run="'+(ACTS.length-1)+'"><span class="gs-ic">'+ic(x[0])+'</span><span class="gs-t"><b>'+esc(x[1])+'</b><small>Action</small></span>'+(x[3]?'<kbd>'+x[3]+'</kbd>':'')+'</a>'}
  function render(){ACTS=[];var q=inp.value.trim().toLowerCase(),h="";
    if(!q){h+=(S.recent.length?'<div class="gs-h">Recent</div>'+S.recent.map(function(r){var u=findUnit(r.u);return '<a class="gsi" href="#'+r.h+'"><span class="gs-ic">'+ic(UICON[r.u]||"book")+'</span><span class="gs-t"><b>'+esc(r.t)+'</b><small>'+(r.k==="lesson"?"Lesson":"Unit")+(u?" · "+esc(u.title):"")+'</small></span></a>'}).join(""):"")+'<div class="gs-h">Actions</div>'+paletteActions().map(rowA).join("")}
    else{var acts=paletteActions().filter(function(x){return x[1].toLowerCase().indexOf(q)>-1});if(acts.length)h+='<div class="gs-h">Actions</div>'+acts.map(rowA).join("");
      if(q.length>=2){var words=q.split(/\s+/),res=searchIndex().map(function(x){var sc=0;words.forEach(function(w){if(x.txt.indexOf(w)>-1)sc+=(x.t.toLowerCase().indexOf(w)>-1?5:1)+(x.k==="Unit"?2:x.k==="Lesson"?1:0)});return [sc,x]}).filter(function(p){return p[0]>=words.length}).sort(function(a,b){return b[0]-a[0]}).slice(0,24);
        if(res.length)h+='<div class="gs-h">Results</div>'+res.map(function(p){var x=p[1],snip="";if(x.raw){var i=x.raw.toLowerCase().indexOf(words[0]);if(i>-1)snip="…"+x.raw.slice(Math.max(0,i-40),i+70)+"…"}return '<a class="gsi" href="#'+x.h+'"><span class="gs-ic">'+ic(x.ic||"book")+'</span><span class="gs-t"><b>'+esc(x.t)+'</b><small>'+x.k+' · '+esc(x.s||"")+'</small>'+(snip?'<em>'+esc(snip)+'</em>':'')+'</span></a>'}).join("")}
      if(!h)h='<p class="muted">Nothing found. Try a shorter word.</p>'}
    el("gsr").innerHTML=h;sel=0;mark();
    m.querySelectorAll(".gsi").forEach(function(a){a.addEventListener("click",function(e){var r=a.getAttribute("data-run");m.remove();if(r!==null){e.preventDefault();var fn=ACTS[+r];setTimeout(function(){fn()},10)}})})}
  function mark(){var L=m.querySelectorAll(".gsi");L.forEach(function(a,i){a.classList.toggle("sel",i===sel)});if(L[sel]&&L[sel].scrollIntoView)L[sel].scrollIntoView({block:"nearest"})}
  inp.oninput=render;inp.onkeydown=function(e){var L=m.querySelectorAll(".gsi");if(e.key==="ArrowDown"){sel=Math.min(L.length-1,sel+1);mark();e.preventDefault()}else if(e.key==="ArrowUp"){sel=Math.max(0,sel-1);mark();e.preventDefault()}else if(e.key==="Enter"&&L[sel]){L[sel].click()}else if(e.key==="Escape"){m.remove()}e.stopPropagation()};
  render();trUI(m)};

/* ---------- keyboard shortcuts ---------- */
function shortcutsOpen(){var K=[["Ctrl / ⌘ + K","Search & commands"],["T","Light / dark mode"],["\\","Tuck menu into ☰ / open it"],["[","Collapse menu to icons"],["F","Focus mode"],["C","Calculator"],["G","Graphing calculator"],["D","Scratchpad"],["← →","Previous / next lesson page"],["A B C D","Choose an answer"],["Enter","Check / next question"],["?","This list"]];
  var m=modal('<h2>Keyboard shortcuts</h2><div class="kbl">'+K.map(function(k){return '<div><kbd>'+k[0]+'</kbd><span>'+k[1]+'</span></div>'}).join("")+'</div><button class="btn pri" data-close>Got it</button>',"kbm");trUI(m)}
document.addEventListener("keydown",function(e){var tg=(e.target||{}).tagName||"";if(/INPUT|TEXTAREA|SELECT/.test(tg)||e.ctrlKey||e.metaKey||e.altKey)return;if(document.querySelector(".modal"))return;
  var k=e.key;if(k==="?"){shortcutsOpen();return}if(k==="\\"){sideToggle();return}if(k==="["){sideMini();return}
  if(document.querySelector(".q-card .opt:not([disabled])")||el("plStage")&&false)return;
  if(k==="t"||k==="T")themeFlip();else if(k==="f"||k==="F")zenToggle();else if(k==="g"||k==="G")graphOpen();else if((k==="c"||k==="C")&&!document.querySelector(".q-card"))calcOpen();else if((k==="d"||k==="D")&&!document.querySelector(".q-card .opt"))scratchOpen()});

/* ---------- customise home ---------- */
var HOMESEC=[["stats","Stats row",".t-stats"],["level","Level & week strip",".lvstrip"],["fod","Formula of the day",".fod"],["diag","Diagnostic / study guide card",".dgcard"],["plan","Continue & today's plan",".t-grid"],["jump","Jump in",".qa"],["map","Your SAT map",".dmap"]];
var _vhB=viewHome;viewHome=function(a){_vhB(a);HOMESEC.forEach(function(s){if(S.homeHide[s[0]]){var e=a.querySelector(s[2]);if(e){var prev=e.previousElementSibling;if(prev&&prev.classList.contains("sec"))prev.remove();e.remove()}}});
  a.insertAdjacentHTML("beforeend",'<div class="home-foot"><button class="btn sm ghost" onclick="homeCustomize()">'+ic("layout")+'Customize this page</button><button class="btn sm ghost" onclick="go(\'/week\')">'+ic("week")+'Weekly report</button></div>')};
function homeCustomize(){var m=modal('<h2>Customize home</h2><p class="muted">Choose what you see on the Today page.</p><div class="set">'+HOMESEC.map(function(s){return '<div class="setrow"><div><b>'+s[1]+'</b></div><button class="sw'+(S.homeHide[s[0]]?"":" on")+'" data-h="'+s[0]+'"><i></i></button></div>'}).join("")+'</div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn pri" data-close>Done</button></div>',"settings");
  m.querySelectorAll("[data-h]").forEach(function(b){b.onclick=function(){var k=b.getAttribute("data-h");S.homeHide[k]=!S.homeHide[k];saveS();b.classList.toggle("on",!S.homeHide[k]);if(location.hash==="#/"||!location.hash)router()}});trUI(m)}

/* ---------- settings additions ---------- */
var _soB=settingsOpen;settingsOpen=function(){_soB();var set=document.querySelector(".modal.settings .set");if(!set)return;
  set.insertAdjacentHTML("afterbegin",'<div class="setrow"><div><b>Accent colour</b><small>Your AXIOM colour</small></div><div class="accs">'+Object.keys(ACCENTS).map(function(k){return '<button class="acc-dot'+(S.accent===k?" on":"")+'" title="'+ACCENTS[k][0]+'" style="background:linear-gradient(135deg,'+ACCENTS[k][1]+','+ACCENTS[k][2]+')" data-ac="'+k+'"></button>'}).join("")+'</div></div>'+
   '<div class="setrow"><div><b>Menu</b><small>Full, icons only, or tucked into the ☰ button</small></div><div class="seg"><button class="'+(S.ui.side==="full"?"on":"")+'" data-sd="full">Full</button><button class="'+(S.ui.side==="mini"?"on":"")+'" data-sd="mini">Icons</button><button class="'+(S.ui.side==="drawer"?"on":"")+'" data-sd="drawer">☰ Button</button></div></div>'+
   '<div class="setrow"><div><b>Menu position</b></div><div class="seg"><button class="'+(S.ui.pos!=="right"?"on":"")+'" data-sp="left">Left</button><button class="'+(S.ui.pos==="right"?"on":"")+'" data-sp="right">Right</button></div></div>');
  set.querySelectorAll("[data-ac]").forEach(function(b){b.onclick=function(){setAccent(b.getAttribute("data-ac"));set.querySelectorAll("[data-ac]").forEach(function(x){x.classList.toggle("on",x===b)})}});
  set.querySelectorAll("[data-sd]").forEach(function(b){b.onclick=function(){sideSet("side",b.getAttribute("data-sd"));set.querySelectorAll("[data-sd]").forEach(function(x){x.classList.toggle("on",x===b)})}});
  set.querySelectorAll("[data-sp]").forEach(function(b){b.onclick=function(){sideSet("pos",b.getAttribute("data-sp"));set.querySelectorAll("[data-sp]").forEach(function(x){x.classList.toggle("on",x===b)})}});trUI(set)};

/* ---------- weekly report ---------- */
function weekData(){var d=[];for(var i=6;i>=0;i--){var k=dayStr(-i),L=S.log[k]||{};d.push({k:k,xp:L.xp||0,q:Math.max(L.q||0,S.days[k]||0),c:L.c||0})}
  var xp=d.reduce(function(s,x){return s+x.xp},0),q=d.reduce(function(s,x){return s+x.q},0),c=d.reduce(function(s,x){return s+x.c},0),best=d.slice().sort(function(a,b){return b.xp-a.xp})[0],active=d.filter(function(x){return x.q||x.xp}).length;
  var units=UNITS.filter(function(u){return S.stats[u.id]&&S.stats[u.id].a>=5}).map(function(u){return [u,S.stats[u.id].c/S.stats[u.id].a]}).sort(function(a,b){return b[1]-a[1]});
  return {d:d,xp:xp,q:q,acc:q?Math.round(100*c/q):0,best:best,active:active,top:units[0],weak:units.length>1?units[units.length-1]:null}}
function viewWeek(a){var W=weekData(),msg=W.active>=6?"Outstanding consistency — this is how 800s are built.":W.active>=4?"Good rhythm. One or two more study days next week will make a big difference.":W.active>=1?"A start! Aim for a little every day next week — even 15 minutes counts.":"A fresh week ahead. Open one lesson today.";
  a.innerHTML='<section><div class="pg-h"><div><h1>Weekly report</h1><p>The last 7 days at a glance.</p></div><button class="btn sm" onclick="pdfWeek()">'+ic("download")+'PDF</button></div>'+
   '<div class="pstats"><div class="card ps"><span class="stc-ic cr">'+ic("sparkles")+'</span><div><b>'+W.xp+' XP</b><small>earned</small></div></div><div class="card ps"><span class="stc-ic cal">'+ic("pen")+'</span><div><b>'+W.q+'</b><small>questions answered</small></div></div><div class="card ps"><span class="stc-ic fl">'+ic("target")+'</span><div><b>'+W.acc+'%</b><small>accuracy</small></div></div><div class="card ps"><span class="stc-ic cal">'+ic("calendar")+'</span><div><b>'+W.active+' / 7</b><small>days active</small></div></div></div>'+
   '<div class="card chartc">'+lineChart(W.d.map(function(x){return {l:x.k.slice(5),v:x.xp}}),{col:"var(--violet)",dots:1})+'</div>'+
   '<div class="grid g2" style="margin-top:14px"><div class="card pad"><h3 class="h3">Highlights</h3><ul class="clean">'+(W.best&&W.best.xp?'<li>Best day: <b>'+W.best.k+'</b> with '+W.best.xp+' XP.</li>':'')+(W.top?'<li>Strongest unit: <b>'+esc(W.top[0].title)+'</b> ('+Math.round(W.top[1]*100)+'%).</li>':'')+(W.weak?'<li>Needs attention: <b>'+esc(W.weak[0].title)+'</b> ('+Math.round(W.weak[1]*100)+'%).</li>':'')+'<li>Current streak: <b>'+S.streak.c+' days</b>.</li></ul></div>'+
   '<div class="card pad gd-sum" style="margin:0">'+ic("compass")+'<div><b>Coach\u2019s note</b><p>'+msg+'</p>'+(W.weak?'<button class="btn pri" onclick="unitGenRun(\''+W.weak[0].id+'\',2)">'+ic("infinity")+'Practise '+esc(W.weak[0].title)+'</button>':'<button class="btn pri" onclick="go(\'/plan\')">'+ic("calendar")+'Open study plan</button>')+'</div></div></div></section>'}
function pdfWeek(){var W=weekData();pdfDoc("Weekly report",W.d[0].k+" to "+W.d[6].k,'<table class="tbl"><tr><td><b>Day</b></td><td><b>XP</b></td><td><b>Questions</b></td></tr>'+W.d.map(function(x){return '<tr><td>'+x.k+'</td><td>'+x.xp+'</td><td>'+x.q+'</td></tr>'}).join("")+'</table><p>Total: '+W.xp+' XP · '+W.q+' questions · '+W.acc+'% accuracy · '+W.active+'/7 days active.</p>')}
TITLES.week="Weekly report";

Object.assign(RU,{"Tools":"Инструменты","Search & commands":"Поиск и команды","Search or jump to…":"Поиск…","Focus mode":"Режим фокуса","Tuck menu into ☰ / open it":"Спрятать меню в ☰ / открыть","Ambient sound":"Фоновый звук","Accent colour":"Цвет акцента","Weekly report":"Недельный отчёт","Customize home":"Настроить главную","Customize this page":"Настроить страницу","Keyboard shortcuts":"Горячие клавиши","Pinned":"Закреплено","Pin to menu":"Закрепить в меню","Menu":"Меню","Menu position":"Положение меню","Full":"Полное","Icons":"Значки","Hidden":"Скрыто","Left":"Слева","Right":"Справа","Recent":"Недавние","Actions":"Действия","Results":"Результаты","Highlights":"Главное","Absolute value & piecewise functions":"Модуль и кусочные функции"});

(function(){var c=`
.axlogo{width:100%;height:100%;display:block}.logo-m.axm{background:none!important;box-shadow:0 8px 22px color-mix(in srgb,var(--blue) 40%,transparent);border-radius:13px;overflow:hidden;padding:0}
.brand-t b{font-family:var(--disp);font-size:21px;letter-spacing:.14em;font-weight:900;background:linear-gradient(135deg,var(--ink),color-mix(in srgb,var(--violet) 70%,var(--ink)));-webkit-background-clip:text;background-clip:text;color:transparent}
.pd-logo.axm{background:none!important;padding:0;overflow:hidden}
#splash{position:fixed;inset:0;z-index:500;display:grid;place-items:center;background:radial-gradient(60% 60% at 50% 40%,color-mix(in srgb,var(--violet) 25%,var(--bg)),var(--bg));transition:opacity .55s ease,visibility .55s}
#splash.out{opacity:0;visibility:hidden}.sp-in{display:flex;flex-direction:column;align-items:center;gap:10px}
.sp-in .axlogo{width:92px;height:92px;border-radius:24px;animation:axpop .8s cubic-bezier(.3,1.6,.5,1) both;box-shadow:0 20px 60px color-mix(in srgb,var(--blue) 45%,transparent)}
.sp-in b{font-family:var(--disp);font-size:38px;letter-spacing:.32em;font-weight:900;margin-left:.32em;animation:axrise .7s .25s ease both}.sp-in small{color:var(--ink2);animation:axrise .7s .45s ease both}
@keyframes axpop{from{transform:scale(.4) rotate(-12deg);opacity:0}}@keyframes axrise{from{opacity:0;transform:translateY(10px)}}
html.theming *,html.theming *::before,html.theming *::after{transition:background-color .4s ease,color .4s ease,border-color .4s ease,fill .4s ease!important}
.thsw{position:relative;width:64px;height:34px;border-radius:999px;border:1px solid var(--line);background:var(--soft);cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:0 8px;flex:none}
.thsw .ic{width:16px;height:16px;position:relative;z-index:1;transition:color .3s}.ts-sun .ic{color:#e8a21c}.ts-moon .ic{color:var(--ink2)}
.ts-knob{position:absolute;top:3px;left:3px;width:26px;height:26px;border-radius:50%;background:var(--paper);box-shadow:0 2px 8px rgba(0,0,0,.25);transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.thsw.dark .ts-knob{transform:translateX(30px)}.thsw.dark .ts-moon .ic{color:var(--violet)}.thsw.dark .ts-sun .ic{color:var(--ink2)}.thsw.sm{transform:scale(.88)}
.tb-tools>*:not(.tb-new){display:none!important}.tb-new{display:flex;align-items:center;gap:8px}
.srch-pill{display:flex;align-items:center;gap:8px;height:38px;padding:0 10px 0 12px;border-radius:12px;border:1px solid var(--line);background:var(--paper);color:var(--ink2);cursor:pointer;font:500 13.5px var(--ui);min-width:220px}.srch-pill span{flex:1;text-align:left}.srch-pill .ic{width:16px;height:16px}
kbd{font:700 11px var(--mono);padding:2px 6px;border-radius:6px;border:1px solid var(--line);background:var(--soft);color:var(--ink2)}
@media(max-width:1100px){.srch-pill{min-width:0}.srch-pill span,.srch-pill kbd{display:none}}
.qm{position:relative}.qm-b{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 12px;border-radius:12px;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;font:700 13.5px var(--ui)}.qm-b .ic{width:17px;height:17px}
.qm-pop{position:absolute;top:calc(100% + 8px);left:0;z-index:60;min-width:250px;max-height:70vh;overflow:auto;padding:6px;border-radius:16px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--line);box-shadow:0 18px 50px rgba(0,0,0,.3);opacity:0;visibility:hidden;transform:translateY(-6px) scale(.98);transform-origin:top left;transition:opacity .18s,transform .2s cubic-bezier(.3,1.3,.5,1),visibility .18s}
.qm.right .qm-pop{left:auto;right:0;transform-origin:top right}.qm.open .qm-pop{opacity:1;visibility:visible;transform:none}
@media(hover:hover){.qm:hover .qm-pop{opacity:1;visibility:visible;transform:none;transition-delay:.12s}.qm:hover .qm-b{border-color:color-mix(in srgb,var(--blue) 50%,var(--line))}}
.qm-i{display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:0;border-radius:10px;background:none;color:var(--ink);cursor:pointer;text-align:left;font:600 14px var(--ui);min-height:auto;box-shadow:none}.qm-i:hover{background:var(--soft)}.qm-i span:not(.qm-ic){flex:1}.qm-i kbd{margin-left:auto}
.qm-ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:var(--soft);color:var(--blue);flex:none}.qm-ic .ic{width:16px;height:16px}.qm-i .ic{width:16px;height:16px}
.qm-sep{display:block;height:1px;margin:5px 6px;background:var(--line)}
.pl-top .qm-b{height:40px;width:40px;padding:0;justify-content:center}.pl-top .qm-i.tb-btn{width:100%;height:auto;border:0;justify-content:flex-start}
.shell{grid-template-columns:var(--side-w,252px) 1fr;transition:grid-template-columns .3s ease}
.side{position:relative}.side-ctl{display:flex;gap:4px;justify-content:flex-end;margin:-6px -4px 0}.side-ctl button{width:28px;height:28px;border-radius:8px;border:0;background:none;color:var(--ink2);cursor:pointer;display:grid;place-items:center;opacity:.55;transition:opacity .15s,background .15s}.side-ctl button:hover{opacity:1;background:var(--soft)}.side-ctl .ic{width:15px;height:15px}
.side-rs{position:absolute;top:0;bottom:0;right:-3px;width:7px;cursor:col-resize;z-index:5}.side-rs:hover,body.resizing .side-rs{background:color-mix(in srgb,var(--blue) 35%,transparent)}body.resizing{user-select:none;cursor:col-resize}body.resizing .shell{transition:none}
body.side-right .shell{grid-template-columns:1fr var(--side-w,252px)}body.side-right .side{order:2;border-right:0;border-left:1px solid var(--line)}body.side-right .side-rs{right:auto;left:-3px}
body.side-mini .shell{grid-template-columns:76px 1fr}body.side-mini.side-right .shell{grid-template-columns:1fr 76px}
body.side-mini .side{padding-left:10px;padding-right:10px;align-items:center}body.side-mini .brand-t,body.side-mini .snav a span,body.side-mini .snav-sep,body.side-mini .sf-card,body.side-mini .lvbar,body.side-mini .ac-t,body.side-mini .side-rs{display:none}
body.side-mini .snav a{justify-content:center;padding:11px}body.side-mini .side-ctl{flex-direction:column;margin:0}body.side-mini .brand{padding:6px 0 10px}body.side-mini .acct-b{justify-content:center;padding:6px}
body.side-hidden .shell{grid-template-columns:0 1fr}body.side-hidden .side{display:none}
#sideBtn{display:inline-grid}@media(max-width:900px){#sideBtn{display:none}.srch-pill{display:none}.qm-lab{display:none}}
body.zen .side,body.zen .topbar,body.zen .tabbar{display:none!important}body.zen .shell{grid-template-columns:1fr!important}body.zen #app.view{max-width:900px}
#zenExit{position:fixed;top:14px;right:14px;z-index:90;display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:var(--glass);backdrop-filter:blur(12px);color:var(--ink);cursor:pointer;font:700 13px var(--ui);opacity:.55;transition:opacity .2s}#zenExit:hover{opacity:1}#zenExit .ic{width:15px;height:15px}
.btn.pinned{color:var(--yel);border-color:color-mix(in srgb,var(--yel) 50%,var(--line))}
.gs-h{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ink2);margin:10px 8px 4px}.gsi.sel{background:var(--soft);outline:2px solid color-mix(in srgb,var(--blue) 45%,transparent)}.gsi kbd{margin-left:auto;align-self:center}
.srch.big kbd{margin-left:auto}
.kbl{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0;text-align:left}.kbl div{display:flex;align-items:center;gap:10px;font-size:14px}.kbl kbd{min-width:70px;text-align:center}
.home-foot{display:flex;gap:8px;justify-content:center;margin-top:24px;flex-wrap:wrap}
.accs{display:flex;gap:6px}.acc-dot{width:26px;height:26px;border-radius:50%;border:2px solid var(--paper);cursor:pointer;box-shadow:0 0 0 1px var(--line)}.acc-dot.on{box-shadow:0 0 0 3px var(--ink)}
.gate-brand .logo-m{width:44px;height:44px}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
(function(){var _gate=accGate;accGate=function(m){_gate(m);var c=document.querySelector(".gate-card");if(c&&!c.querySelector(".thsw"))c.insertAdjacentHTML("afterbegin",'<div style="display:flex;justify-content:flex-end;margin:-8px -8px 0">'+themeSwitchHTML("sm")+'</div>')};if(el("gate"))accGate(Object.keys(accUsers()).length?"in":"up")})();
setTheme(document.documentElement.getAttribute("data-theme")||"dark");document.querySelectorAll(".thsw").forEach(function(b){b.classList.toggle("dark",document.documentElement.getAttribute("data-theme")==="dark")});
bootRoute();
