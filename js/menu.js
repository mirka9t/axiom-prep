/* =====================================================================
   AXIOM — menu system
   grouped navigation · "tuck into ☰" drawer (replaces hiding) · mobile drawer
   ===================================================================== */
ICONS.burger="M4 6h16 M4 12h16 M4 18h16";ICONS.tuck="M4 6h16 M4 12h10 M4 18h16 M17 9l3 3-3 3";ICONS.pinIn="M12 17v5 M7 3h10l-1 6 3 4H5l3-4z";
if(S.ui.side==="hidden")S.ui.side="drawer";if(!S.ui.gc)S.ui.gc={};
TITLES[""]="Today";
var NAVGROUPS=[["main","Learn & practise",["/","/diagnostic","/units","/qb","/mock","/revise"]],["think","Think",["/think","/mirror","/map","/museum","/lab","/create"]],["track","Plan & track",["/plan","/progress","/league","/notes"]],["tools","Tools & library",null]];
function navLink(x){return '<a href="#'+x[0]+'" data-r="'+x[0]+'" title="'+esc(x[1])+'">'+ic(x[2])+'<span>'+esc(x[1])+'</span></a>'}
navInit=function(){var all=NAV.concat(NAV2),used={},html="";
  NAVGROUPS.forEach(function(g){var items=g[2]?g[2].map(function(p){return all.filter(function(x){return x[0]===p})[0]}).filter(Boolean):all.filter(function(x){return !used[x[0]]});
    items=items.filter(function(x){return !used[x[0]]});items.forEach(function(x){used[x[0]]=1});if(!items.length)return;
    html+='<div class="ngrp'+(S.ui.gc[g[0]]?" closed":"")+'" data-g="'+g[0]+'"><button class="ngrp-h" onclick="navGroup(\''+g[0]+'\')"><span>'+g[1]+'</span>'+ic("chevD")+'</button><div class="ngrp-b">'+items.map(navLink).join("")+'</div></div>'});
  if(S.pins&&S.pins.length){var pins=S.pins.map(function(id){var u=findUnit(id);return u?navLink(["/unit/"+id,u.title,UICON[id]||"book"]):""}).join("");if(pins)html+='<div class="ngrp'+(S.ui.gc.pins?" closed":"")+'" data-g="pins"><button class="ngrp-h" onclick="navGroup(\'pins\')"><span>Pinned</span>'+ic("chevD")+'</button><div class="ngrp-b">'+pins+'</div></div>'}
  el("snav").innerHTML=html;
  el("tabbar").innerHTML=TABS.map(function(x){return x[0]==="more"?'<button onclick="moreSheet()">'+ic(x[2])+'<span>'+x[1]+'</span></button>':'<a href="#'+x[0]+'" data-r="'+x[0]+'">'+ic(x[2])+'<span>'+x[1]+'</span></a>'}).join("");
  if(typeof markNav==="function")try{markNav(location.hash.replace(/^#/,"")||"/")}catch(e){}};
function navGroup(g){S.ui.gc[g]=!S.ui.gc[g];saveS();var el2=document.querySelector('.ngrp[data-g="'+g+'"]');if(el2)el2.classList.toggle("closed",!!S.ui.gc[g]);sfx("tap")}
var _mnM=markNav;markNav=function(h){_mnM(h);var a=document.querySelector("#snav a.on");if(a){var g=a.closest(".ngrp");if(g)g.classList.remove("closed")}};

/* ---------- drawer instead of hiding ---------- */
function isMobile(){return window.innerWidth<=900}
function drawerOpen(){qmClose&&qmClose();var sh=document.querySelector(".shell"),sc=el("sideScrim");if(!sc){sc=document.createElement("div");sc.id="sideScrim";sc.onclick=drawerClose;(sh||document.body).insertBefore(sc,(sh||document.body).firstChild)}document.body.classList.add("drawer-open");sfx("tap")}
function drawerClose(){document.body.classList.remove("drawer-open")}
function drawerToggle(){if(document.body.classList.contains("drawer-open"))drawerClose();else drawerOpen()}
applySide=function(){var b=document.body,u=S.ui,mob=isMobile();b.classList.remove("side-hidden");b.classList.toggle("side-mini",u.side==="mini"&&!mob);b.classList.toggle("side-drawer",u.side==="drawer"&&!mob);b.classList.toggle("side-right",u.pos==="right");document.documentElement.style.setProperty("--side-w",(u.w||252)+"px");
  var c=document.querySelector(".side-ctl");if(c){var mini=u.side==="mini",drw=u.side==="drawer";
    c.innerHTML=(drw?'<button class="sc-pin" title="Keep the menu open" onclick="sideSet(\'side\',\'full\');drawerClose();toast(\'Menu pinned open\')">'+ic("pinIn")+'</button>':'<button class="sc-mini" title="'+(mini?"Expand the menu ([)":"Collapse to icons ([)")+'" onclick="sideMini()">'+ic(mini?"expand":"collapse")+'</button>')+
      '<button class="sc-move" title="Move menu left / right" onclick="sideMove()">'+ic("swap")+'</button>'+(drw?'':'<button class="sc-tuck" title="Tuck the menu into the ☰ button" onclick="sideTuck()">'+ic("tuck")+'</button>')+'<button class="sc-x" title="Close menu" onclick="drawerClose()">'+ic("x")+'</button>'}
  var sb=el("sideBtn");if(sb){sb.innerHTML=ic("burger");sb.title="Menu";sb.setAttribute("aria-label","Open menu")}};
var _rsT=null;window.addEventListener("resize",function(){clearTimeout(_rsT);_rsT=setTimeout(function(){applySide();if(!isMobile()&&S.ui.side!=="drawer")drawerClose()},150)});
var _modalM=modal;modal=function(h,c){drawerClose();return _modalM(h,c)};
ICONS.expand="M9 6l6 6-6 6 M4 4v16";
function sideTuck(){sideSet("side","drawer");drawerClose();toast("Menu tucked into the ☰ button — click it any time")}
sideToggle=function(){if(isMobile()||S.ui.side==="drawer")return drawerToggle();sideTuck()};
(function(){var sb=el("sideBtn");if(sb)sb.onclick=function(){drawerToggle()}})();
moreSheet=function(){drawerOpen()};
window.addEventListener("hashchange",drawerClose);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&document.body.classList.contains("drawer-open"))drawerClose()});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".side a");if(a&&document.body.classList.contains("drawer-open"))setTimeout(drawerClose,60)});
applySide();navInit();

(function(){var c=`
.ngrp{margin-bottom:4px}.ngrp-h{display:flex;align-items:center;justify-content:space-between;width:100%;padding:10px 12px 6px;border:0;background:none;color:var(--ink2);font:800 11px var(--ui);letter-spacing:.09em;text-transform:uppercase;cursor:pointer;border-radius:8px}
.ngrp-h:hover{color:var(--ink)}.ngrp-h .ic{width:14px;height:14px;transition:transform .25s}.ngrp.closed .ngrp-h .ic{transform:rotate(-90deg)}
.ngrp-b{display:flex;flex-direction:column;gap:2px;max-height:1200px;transition:max-height .35s ease,opacity .25s}.ngrp.closed .ngrp-b{max-height:0;opacity:0;overflow:hidden;pointer-events:none}
body.side-mini .ngrp-h{display:none}body.side-mini .ngrp{border-top:1px solid var(--line);padding-top:6px;margin-top:6px}body.side-mini .ngrp:first-child{border-top:0;margin-top:0}body.side-mini .ngrp.closed .ngrp-b{max-height:1200px;opacity:1;overflow:visible;pointer-events:auto}
.side-ctl .sc-x{display:none}body.drawer-open .side-ctl .sc-x{display:grid}
#sideBtn{display:none}body.side-drawer #sideBtn{display:inline-grid}
body.side-drawer .shell{grid-template-columns:1fr!important}
body.side-drawer .side{position:fixed;top:0;bottom:0;left:0;z-index:140;width:min(var(--side-w,252px),86vw);display:flex!important;transform:translateX(-105%);visibility:hidden;transition:transform .32s cubic-bezier(.3,1,.4,1),visibility 0s linear .32s;background:var(--bg);border-right:1px solid var(--line);overflow-y:auto;backdrop-filter:none;-webkit-backdrop-filter:none}
body.side-right.side-drawer .side{left:auto;right:0;transform:translateX(105%);border-left:1px solid var(--line);border-right:0}
body.drawer-open .side{transform:none!important;visibility:visible!important;transition:transform .32s cubic-bezier(.3,1,.4,1),visibility 0s!important;box-shadow:0 0 60px rgba(0,0,0,.45)}
body.side-drawer .side-rs{display:none}
body.side-drawer:not(.drawer-open) .side{pointer-events:none}
#sideScrim{position:fixed;inset:0;z-index:135;background:rgba(6,9,16,.5);opacity:0;pointer-events:none;transition:opacity .3s}body.drawer-open #sideScrim{opacity:1;pointer-events:auto}
@media(max-width:900px){
 .shell,body.side-right .shell,body.side-mini .shell,body.side-drawer .shell{grid-template-columns:1fr!important}
 #sideBtn{display:inline-grid!important}
 .side{display:flex!important;position:fixed;top:0;bottom:0;left:0;z-index:140;width:min(300px,86vw);transform:translateX(-105%);visibility:hidden;transition:transform .32s cubic-bezier(.3,1,.4,1),visibility 0s linear .32s;background:var(--bg);border-right:1px solid var(--line);overflow-y:auto;backdrop-filter:none;-webkit-backdrop-filter:none}
 body.side-right .side{left:auto;right:0;transform:translateX(105%);border-left:1px solid var(--line);border-right:0;order:0}
 body:not(.drawer-open) .side{pointer-events:none}
 .side-rs{display:none!important}.side-ctl button:not(.sc-x){display:none!important}.side-ctl{margin:0 0 4px}
}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();

/* ---------- bug fixes: returning to a finished practice set / flashcard deck ---------- */
(function(){var _dqG=drawQuestion;drawQuestion=function(){if(!RUN||!RUN.items)return go("/units");if(RUN.i>=RUN.items.length)return showResults();return _dqG()};
  if(typeof drawCard==="function"){var _dcG=drawCard;drawCard=function(){if(!DECK||!DECK.cards||!DECK.cards.length)return go("/revise");if(DECK.i>=DECK.cards.length)DECK.i=DECK.cards.length-1;return _dcG()}}})();

/* ---------- menu extras: continue shortcut + footer links ---------- */
function nextLessonRef(){for(var i=0;i<UNITS.length;i++){var u=UNITS[i];if(u.id==="words")continue;for(var j=0;j<u.lessons.length;j++){var l=u.lessons[j];if(!S.lessons[u.id+"/"+l.id])return {u:u,l:l}}}return null}
(function(){var _ni2=navInit;navInit=function(){_ni2();var sn=el("snav");if(!sn)return;var n=nextLessonRef();
  if(n)sn.insertAdjacentHTML("afterbegin",'<a class="nav-cont" href="#/lesson/'+n.u.id+'/'+n.l.id+'" title="Continue: '+esc(n.l.t)+'">'+ic("play")+'<span><small>Continue</small>'+esc(n.l.t)+'</span></a>');
  sn.insertAdjacentHTML("beforeend",'<div class="nav-foot"><button onclick="helpOpen()">'+ic("help")+'<span>Help</span></button><button onclick="philosophyOpen()">'+ic("sparkles")+'<span>Philosophy</span></button><button onclick="shortcutsOpen()">'+ic("keyboard")+'<span>Shortcuts</span></button></div>')};
  var _lfM=lpFinish;lpFinish=function(){_lfM();navInit()};navInit()})();
(function(){var c=`
.nav-cont{display:flex!important;align-items:center;gap:10px;margin:4px 0 8px;padding:10px 12px!important;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--blue) 18%,var(--paper)),color-mix(in srgb,var(--violet) 14%,var(--paper)));border:1px solid color-mix(in srgb,var(--blue) 35%,var(--line))}
.nav-cont>span{display:flex;flex-direction:column;min-width:0;font-size:13px;font-weight:700;line-height:1.3}.nav-cont small{font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--blue)}.nav-cont>span{overflow:hidden}.nav-cont>.ic{flex:none;color:var(--blue)}
.nav-foot{display:flex;gap:4px;margin-top:10px;padding-top:10px;border-top:1px solid var(--line)}.nav-foot button{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 4px;border:0;border-radius:10px;background:none;color:var(--ink2);font:600 10.5px var(--ui);cursor:pointer}.nav-foot button:hover{background:var(--soft);color:var(--ink)}.nav-foot .ic{width:16px;height:16px}
body.side-mini .nav-cont>span,body.side-mini .nav-foot span{display:none}body.side-mini .nav-cont{justify-content:center;padding:10px!important}body.side-mini .nav-foot{flex-direction:column}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();

Object.assign(RU,{"Learn & practise":"Учёба и практика","Think":"Мышление","Plan & track":"План и прогресс","Tools & library":"Инструменты и библиотека","Philosophy":"Философия","Shortcuts":"Клавиши"});

/* ---------- tidy generated maths (1x → x, + 0, x^1) — ids stay stable ---------- */
function tidyMath(s){if(typeof s!=="string")return s;return s.replace(/(^|[^0-9.,A-Za-z])([−-]?)1x/g,"$1$2x").replace(/ [+−-] 0(?![\d.])/g,"").replace(/\^\(x\)/g,"^x").replace(/x\^1(?![\d.])/g,"x").replace(/x¹(?![\d⁰-⁹])/g,"x")}
(function(){var _gm=GEN.make;GEN.make=function(){var it=_gm.apply(GEN,arguments);if(it&&it.q){var t=tidyMath(it.q);if(t!==it.q){it._q0=it.q;it.q=t}if(it.s)it.s=tidyMath(it.s);if(it.c)it.c=it.c.map(tidyMath)}return it};QB=null;QBI={}})();
(function(){var s=document.createElement("style");s.textContent=".numin{display:flex;gap:8px;flex-wrap:nowrap;align-items:stretch}.numin input{flex:1 1 auto;min-width:0;width:auto}.numin .btn{flex:none;white-space:nowrap}";document.head.appendChild(s)})();

/* ---------- guided tour: open the tucked menu for menu steps ---------- */
(function(){var _tourB=tourStart;window._tourDrawer=false;
  tourStart=function(i){i=i||0;while(i<TOUR.length&&!document.querySelector(TOUR[i][0]))i++;
    if(i>=TOUR.length){if(window._tourDrawer){drawerClose();window._tourDrawer=false}document.body.classList.remove("tour-run");return _tourB(i)}
    var t=document.querySelector(TOUR[i][0]),inSide=!!t.closest(".side"),tucked=document.body.classList.contains("side-drawer")||isMobile(),open=document.body.classList.contains("drawer-open");
    if(inSide&&tucked&&!open){document.body.classList.add("tour-run");drawerOpen();window._tourDrawer=true;setTimeout(function(){tourStart(i)},420);return}
    if(!inSide&&window._tourDrawer&&open){drawerClose();window._tourDrawer=false;setTimeout(function(){tourStart(i)},420);return}
    if(!t.__tourScrolled){t.__tourScrolled=1;try{t.scrollIntoView({block:"center",inline:"nearest"})}catch(e){}setTimeout(function(){tourStart(i)},80);return}t.__tourScrolled=0;
    var r=_tourB(i),c=document.querySelector(".tr-card");if(c){var cr=c.getBoundingClientRect(),top=cr.top;if(cr.bottom>innerHeight-10)top=innerHeight-cr.height-10;if(top<10)top=10;c.style.top=top+"px";var left=Math.min(Math.max(10,cr.left),innerWidth-cr.width-10);c.style.left=Math.max(10,left)+"px"}return r};
  document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#tour .btn.ghost")){document.body.classList.remove("tour-run");if(window._tourDrawer){drawerClose();window._tourDrawer=false}}},true);
  var st=document.createElement("style");st.textContent="body.tour-run .side{transition:none!important}";document.head.appendChild(st)})();
