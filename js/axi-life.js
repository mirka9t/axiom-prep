/* =====================================================================
   AXIOM — Axi comes alive
   · eyes follow your pointer · random little moves when idle
   · dozes off when you leave, wakes up when you're back
   · waves on hover, squishes when tapped
   · notices when you're stuck (two misses in a row, or a long pause)
     and offers to explain — then steps back so it never nags
   ===================================================================== */
(function(){
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,last=Date.now(),sleeping=false,lastNudge=0,raf=0,px=-1,py=-1;
function live(){return [].slice.call(document.querySelectorAll("#axiBuddy .axi, .axc-av .axi, .axi-greet .axi, .axi.axi-live"))}
function look(){raf=0;if(px<0)return;live().forEach(function(svg){var r=svg.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>innerHeight)return;var cx=r.left+r.width/2,cy=r.top+r.height*.42,dx=px-cx,dy=py-cy,d=Math.sqrt(dx*dx+dy*dy)||1,k=Math.min(1,d/260);
  svg.style.setProperty("--ex",(dx/d*6*k).toFixed(2)+"px");svg.style.setProperty("--ey",(dy/d*4.5*k).toFixed(2)+"px")})}
if(!RM)document.addEventListener("pointermove",function(e){px=e.clientX;py=e.clientY;wake();if(!raf)raf=requestAnimationFrame(look)},{passive:true});
function wake(){last=Date.now();if(sleeping){sleeping=false;var b=document.querySelector("#axiBuddy .ab-btn");if(b){b.classList.remove("axl-sleep");b.classList.add("axl-wake");setTimeout(function(){b.classList.remove("axl-wake")},900)}}}
["keydown","pointerdown","scroll","touchstart"].forEach(function(ev){document.addEventListener(ev,wake,{passive:true,capture:true})});
/* idle life: every ~15 s a small move; after 70 s of nothing, a nap */
setInterval(function(){var b=document.querySelector("#axiBuddy .ab-btn");if(!b||document.hidden)return;var idle=Date.now()-last;
  if(idle>70000&&!sleeping&&!(window.AXC&&AXC.open)){sleeping=true;b.classList.add("axl-sleep");return}
  if(!sleeping&&!RM&&Math.random()<.5){var m=["axl-peek","axl-wiggle","axl-hop"][Math.floor(Math.random()*3)];b.classList.add(m);setTimeout(function(){b.classList.remove(m)},1200)}},15000);
/* hover: wave + a short hello that fits the page */
var hoverT=0;document.addEventListener("pointerover",function(e){var b=e.target.closest&&e.target.closest("#axiBuddy .ab-btn");if(!b||b.contains(e.relatedTarget))return;b.classList.add("axl-wave");clearTimeout(hoverT);
  if(window.AXC&&AXC.open)return;hoverT=setTimeout(function(){if(!b.matches(":hover"))return;var t=document.createElement("div");t.className="axl-hello";t.textContent=helloText();var host=el("axiBuddy");if(!host||host.querySelector(".axl-hello"))return;host.appendChild(t);setTimeout(function(){t.classList.add("out");setTimeout(function(){t.remove()},300)},2400)},350)});
document.addEventListener("pointerout",function(e){var b=e.target.closest&&e.target.closest("#axiBuddy .ab-btn");if(b&&!b.contains(e.relatedTarget))b.classList.remove("axl-wave")});
document.addEventListener("pointerdown",function(e){var b=e.target.closest&&e.target.closest("#axiBuddy .ab-btn");if(b){b.classList.remove("axl-squish");void b.offsetWidth;b.classList.add("axl-squish")}},true);
function helloText(){var h=location.hash;if(typeof RUN!=="undefined"&&RUN&&document.querySelector(".q-card"))return L2("Stuck? I can explain it!","Застрял? Я объясню!");if(/lesson/.test(h))return L2("Questions? Ask me!","Есть вопросы? Спрашивай!");if(/notebook/.test(h))return L2("Want me to quiz you?","Проверить тебя?");return L2("Ask me anything!","Спроси меня!")}
/* proactive help: two misses in a row in practice */
var miss=0;if(typeof finishQ==="function"){var _fqLife=finishQ;finishQ=function(ok,it,ct){_fqLife(ok,it,ct);var b=document.querySelector("#axiBuddy .ab-btn");
  if(b){var c=ok?"axl-joy":"axl-oops";b.classList.add(c);setTimeout(function(){b.classList.remove(c)},1100)}
  miss=ok?0:miss+1;if(miss>=2){miss=0;nudge(L2("Two tricky ones in a row — want me to walk you through this one step by step?","Две сложные подряд — разобрать эту по шагам?"),L2("Yes, explain it","Да, объясни"),function(){chatOpen("explain this question",true)})}}}
/* proactive help: a long pause on a lesson page */
setInterval(function(){if(document.hidden||Date.now()-last<85000||Date.now()-lastNudge<300000)return;if(!/lesson\//.test(location.hash)||!el("plStage"))return;
  nudge(L2("Taking your time? Good. Tip: select any sentence and press “Ask Axi”, or ask me to explain this page more simply.","Не спешишь? Отлично. Совет: выдели любое предложение и нажми «Спросить Акси»."),L2("Explain this page","Объясни страницу"),function(){chatOpen("explain this lesson",true)})},20000);
function nudge(text,btnLabel,fn){if(Date.now()-lastNudge<120000)return;if((typeof busyScreen==="function"&&busyScreen())||!S.voice||!S.voice.buddy||S.axiOff)return;var host=el("axiBuddy");if(!host||!host.querySelector(".ab-btn"))return;lastNudge=Date.now();
  var o=document.querySelector(".axl-nudge");if(o)o.remove();var n=document.createElement("div");n.className="axl-nudge";n.setAttribute("role","status");
  n.innerHTML='<p>'+esc(text)+'</p><div><button class="btn sm pri">'+esc(btnLabel)+'</button><button class="btn sm ghost">'+L2("Not now","Не сейчас")+'</button></div>';
  n.querySelector(".pri").onclick=function(){n.remove();fn()};n.querySelector(".ghost").onclick=function(){n.remove()};host.appendChild(n);setTimeout(function(){if(n.parentNode){n.classList.add("out");setTimeout(function(){n.remove()},300)}},14000)}
window.axiNudge=nudge;

var c=`
.axi .axi-eyes{translate:var(--ex,0) var(--ey,0);transition:translate .18s ease-out}
#axiBuddy .ab-btn{transition:transform .25s cubic-bezier(.3,1.6,.5,1),opacity .2s;will-change:transform}
#axiBuddy .ab-btn:hover{transform:translateY(-4px) scale(1.06)}
#axiBuddy .ab-btn.axl-wave .axi-armR{animation:wave2 .32s ease-in-out 4 alternate}
#axiBuddy .ab-btn.axl-squish{animation:axlSquish .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes axlSquish{30%{transform:scale(1.15,.85)}60%{transform:scale(.94,1.08)}}
#axiBuddy .ab-btn.axl-peek .axi{animation:axlPeek 1.1s ease-in-out}@keyframes axlPeek{30%{transform:rotate(-12deg) translateX(-4px)}70%{transform:rotate(9deg)}}
#axiBuddy .ab-btn.axl-wiggle .axi-gillL,#axiBuddy .ab-btn.axl-wiggle .axi-gillR{animation-duration:.35s}
#axiBuddy .ab-btn.axl-hop .axi{animation:axlHop .8s cubic-bezier(.3,1.6,.5,1)}@keyframes axlHop{40%{transform:translateY(-12px)}}
#axiBuddy .ab-btn.axl-joy .axi{animation:axlHop .7s cubic-bezier(.3,1.6,.5,1) 2}
#axiBuddy .ab-btn.axl-oops .axi{animation:axlTilt 1s ease}@keyframes axlTilt{30%{transform:rotate(-10deg)}60%{transform:rotate(6deg)}}
#axiBuddy .ab-btn.axl-sleep .axi-eyes{scale:1 .12;transition:scale .6s}
#axiBuddy .ab-btn.axl-sleep .axi{animation:axlBreathe 3.5s ease-in-out infinite}@keyframes axlBreathe{50%{transform:scale(1.03) translateY(1px)}}
#axiBuddy .ab-btn.axl-sleep::after{content:"z z z";position:absolute;right:-6px;top:-14px;font:800 13px var(--ui);letter-spacing:2px;color:var(--violet);animation:axlZ 2.6s ease-in-out infinite}
@keyframes axlZ{0%{opacity:0;transform:translate(0,6px) scale(.8)}40%{opacity:1}100%{opacity:0;transform:translate(10px,-14px) scale(1.1)}}
#axiBuddy .ab-btn.axl-wake .axi{animation:axlHop .7s cubic-bezier(.3,1.6,.5,1)}
#axiBuddy .ab-btn{position:relative}
.axl-hello{position:absolute;right:66px;bottom:16px;white-space:nowrap;padding:8px 12px;border-radius:14px 14px 4px 14px;background:var(--paper);border:1px solid var(--line);box-shadow:0 12px 30px -12px rgba(0,0,0,.5);font:700 13px var(--ui);color:var(--ink);animation:axmIn .3s cubic-bezier(.2,.9,.3,1.3) both;transition:opacity .3s,transform .3s;pointer-events:none}
.axl-hello.out{opacity:0;transform:translateY(6px)}
.axl-nudge{position:absolute;right:0;bottom:78px;width:min(300px,calc(100vw - 24px));padding:12px 14px;border-radius:18px 18px 6px 18px;background:var(--paper);border:1px solid color-mix(in srgb,var(--violet) 35%,var(--line));box-shadow:0 20px 50px -18px rgba(0,0,0,.55);animation:axmIn .35s cubic-bezier(.2,.9,.3,1.3) both;transition:opacity .3s,transform .3s}
.axl-nudge p{margin:0 0 10px;font-size:14px;line-height:1.45}.axl-nudge div{display:flex;gap:6px}.axl-nudge.out{opacity:0;transform:translateY(8px)}
@media (prefers-reduced-motion:reduce){.axi .axi-eyes{translate:none}#axiBuddy .ab-btn,#axiBuddy .ab-btn *{animation:none!important}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
