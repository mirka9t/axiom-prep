/* =====================================================================
   AXIOM — motion & feel
   Light that follows your pointer on cards, soft 3D tilt on course
   cards, ink ripples on buttons, sections that rise into view as you
   scroll, numbers that count up, a smooth page-change bar and a gentle
   cross-fade when you switch themes. All of it switches off for
   "reduce motion" and on touch-only screens where hover makes no sense.
   ===================================================================== */
(function(){
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,HOVER=window.matchMedia&&matchMedia("(hover: hover) and (pointer: fine)").matches;
var SPOT=".card,.ucard,.unit,.cstep,.pc,.qa-i,.stc,.cbm,.jn,.gym-c,.mockopt,.plan,.fod,.hero,.qrow,.cb,.tile,.lcard,.utile,.pl,.dmap";
var TILT=".ucard,.unit,.cbm,.utile";
var RIP=".btn,.opt,.mockopt,.ax-btn,.axc-chip,.tb-btn,.ax-opt,.cont,.qa-i";
function relative(n){if(getComputedStyle(n).position==="static")n.style.position="relative"}
/* ---- spotlight + tilt ---- */
var cur=null;
if(HOVER&&!RM){document.addEventListener("pointermove",function(e){var c=e.target.closest&&e.target.closest(SPOT);if(c&&c.closest(".axc,.modal,#plStage .pg-t"))c=null;
  if(cur&&cur!==c){cur.classList.remove("fx-lit");cur.style.removeProperty("--rx");cur.style.removeProperty("--ry");cur=null}
  if(!c)return;if(!cur){relative(c);c.classList.add("fx-lit");cur=c}var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  c.style.setProperty("--mx",(x*100).toFixed(1)+"%");c.style.setProperty("--my",(y*100).toFixed(1)+"%");
  if(c.matches(TILT)&&r.width<520){c.style.setProperty("--rx",((.5-y)*5).toFixed(2)+"deg");c.style.setProperty("--ry",((x-.5)*6).toFixed(2)+"deg")}},{passive:true});
  document.addEventListener("pointerleave",function(){if(cur){cur.classList.remove("fx-lit");cur=null}})}
/* ---- ripples ---- */
document.addEventListener("pointerdown",function(e){if(RM||e.button>0)return;var b=e.target.closest&&e.target.closest(RIP);if(!b||b.disabled)return;relative(b);
  var r=b.getBoundingClientRect(),w=document.createElement("span"),d=Math.max(r.width,r.height)*2.2;w.className="fx-ripw";w.innerHTML='<i style="left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px;width:'+d+'px;height:'+d+'px"></i>';b.appendChild(w);setTimeout(function(){w.remove()},650)},{passive:true});
/* ---- page-change bar + reveal + count-up after every page draw ---- */
var bar=document.createElement("div");bar.id="fxBar";document.body.appendChild(bar);
function barRun(){bar.classList.remove("run");void bar.offsetWidth;bar.classList.add("run")}
window.addEventListener("hashchange",barRun);
var IO=("IntersectionObserver" in window)&&!RM?new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("fx-in");IO.unobserve(en.target);var n=en.target;if(n.__count)countUp(n)}})},{rootMargin:"0px 0px -6% 0px",threshold:.06}):null;
var REV="#app .card,#app .ucard,#app .unit,#app .sec,#app section,#app .cbm,#app .pc,#app .stc,#app .jn,#app .gym-c,#app .plan,#app .fod,#app .cbk>h2,#app .tile,#app .list-row";
function after(){var a=el("app");if(!a)return;
  if(IO){var vh=innerHeight,k=0;a.querySelectorAll(REV).forEach(function(n){if(n.closest("#plStage,.modal,.fx-rv")||n.classList.contains("fx-rv"))return;var r=n.getBoundingClientRect();if(r.top>vh*0.92){n.classList.add("fx-rv");n.style.setProperty("--fxd",(k++%4)*0.05+"s");IO.observe(n)}})}
  a.querySelectorAll(".stc b,.ax-stats b,.pstat b,.big-num").forEach(function(b){if(b.__done)return;var m=String(b.textContent).match(/^\s*(\d{1,5})(\b.*)$/);if(!m||+m[1]<2)return;b.__done=1;b.__count={to:+m[1],rest:m[2]};var r=b.getBoundingClientRect();if(r.top<innerHeight)countUp(b);else if(IO)IO.observe(b)});
  a11y(document.body)}
function countUp(b){if(RM||!b.__count)return;var c=b.__count,t0=performance.now(),dur=Math.min(1100,380+c.to*2);b.__count=null;
  function f(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);b.textContent=Math.round(c.to*e)+c.rest;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if(typeof router==="function"){var _routerFx=router;router=function(){var r=_routerFx.apply(this,arguments);try{after()}catch(e){}return r}}
/* ---- smooth theme switch ---- */
if(typeof setTheme==="function"){var _setThemeFx=setTheme;setTheme=function(t){var h=document.documentElement;if(!RM&&document.body){h.classList.add("fx-theme");clearTimeout(h.__ft);h.__ft=setTimeout(function(){h.classList.remove("fx-theme")},520)}return _setThemeFx.apply(this,arguments)}}
/* ---- every button gets a name for screen readers ---- */
var NAMES={burger:"Menu","qm-b":"More options",round:"Continue","ab-btn":"Ask Axi"};
function a11y(root){(root||document).querySelectorAll("button:not([aria-label]),a[onclick]:not([aria-label])").forEach(function(b){if((b.textContent||"").trim())return;var t=b.getAttribute("title");if(t){b.setAttribute("aria-label",t);return}for(var k in NAMES)if(b.classList.contains(k)){b.setAttribute("aria-label",NAMES[k]);return}})}
window.fxAfter=after;

var c=`
:root{--fx-glow:color-mix(in srgb,var(--violet) 15%,transparent)}
html[data-theme="light"]{--fx-glow:color-mix(in srgb,var(--violet) 10%,transparent)}
.fx-lit::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:1;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),var(--fx-glow),transparent 62%);animation:fxFade .25s ease both}
.fx-lit{border-color:color-mix(in srgb,var(--violet) 34%,var(--line))!important}
@keyframes fxFade{from{opacity:0}}
.ucard,.unit,.cbm{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .25s}
.fx-lit:is(.ucard,.unit,.cbm){transform:perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0)) translateY(-3px);box-shadow:0 22px 44px -22px rgba(0,0,0,.55)}
.card,.pc,.qa-i,.stc,.jn,.gym-c,.plan,.tile{transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .25s}
@media (hover:hover) and (pointer:fine){:is(.pc,.qa-i,.stc,.jn,.gym-c,.tile):hover{transform:translateY(-3px);box-shadow:0 18px 38px -22px rgba(0,0,0,.5)}}
.fx-ripw{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;z-index:2}
.fx-ripw i{position:absolute;border-radius:50%;background:currentColor;opacity:.22;transform:scale(0);animation:fxRip .6s cubic-bezier(.2,.7,.3,1) forwards}
@keyframes fxRip{to{transform:scale(1);opacity:0}}
.btn,.opt,.mockopt,.ax-btn,.tb-btn{transition:transform .15s,box-shadow .2s,background .2s,border-color .2s,filter .2s}
.btn:active:not(:disabled),.tb-btn:active,.opt:active:not(:disabled){transform:scale(.97)}
@media (hover:hover) and (pointer:fine){.btn.pri:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 12px 24px -12px color-mix(in srgb,var(--violet) 80%,transparent);filter:brightness(1.06)}}
#fxBar{position:fixed;left:0;top:0;height:3px;width:100%;z-index:300;pointer-events:none;transform-origin:left;transform:scaleX(0);opacity:0;background:linear-gradient(90deg,var(--blue),var(--violet),#ff8ec0)}
#fxBar.run{animation:fxBar .6s cubic-bezier(.3,.7,.2,1)}@keyframes fxBar{0%{transform:scaleX(0);opacity:1}70%{transform:scaleX(.85);opacity:1}100%{transform:scaleX(1);opacity:0}}
.fx-rv{opacity:0;transform:translateY(18px)}
.fx-rv.fx-in{opacity:1;transform:none;transition:opacity .6s ease var(--fxd,0s),transform .7s cubic-bezier(.2,.8,.2,1) var(--fxd,0s)}
html.fx-theme,html.fx-theme *{transition:background-color .45s ease,color .45s ease,border-color .45s ease,fill .45s ease!important}
:focus-visible{outline:2.5px solid color-mix(in srgb,var(--violet) 80%,transparent);outline-offset:2px;border-radius:8px}
::selection{background:color-mix(in srgb,var(--violet) 32%,transparent)}
@media (prefers-reduced-motion:reduce){.fx-rv{opacity:1;transform:none}.fx-lit::after{display:none}#fxBar{display:none}}
@media print{.fx-rv{opacity:1!important;transform:none!important}#fxBar,.fx-ripw{display:none}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
