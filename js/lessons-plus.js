/* =====================================================================
   AXIOM — lessons you do, not just read
   · "Try it first": cover a worked example and reveal it step by step
   · "Your turn": a fresh question like the examples, checked on the spot
   · Ask Axi from any lesson page (explain simply · another example · quiz)
   · after any practice answer: "Ask Axi to explain it slowly"
   ===================================================================== */
ICONS.eyeOff=ICONS.eyeOff||"M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10 10 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3.2 4.2M6.1 6.1C3.9 7.6 2.5 9.8 2 12c1 2.5 5 7 10 7a10 10 0 0 0 4-.8";

/* ---------- 1. try it first ---------- */
function lxCover(b){var ex=b.closest(".cb-ex");if(!ex)return;var on=!ex.classList.contains("lx-cover");ex.classList.toggle("lx-cover",on);ex.querySelectorAll(".cb-steps li").forEach(function(li){li.classList.remove("lx-shown")});var a=ex.querySelector(".cb-a");if(a)a.classList.remove("lx-shown");
  b.innerHTML=on?ic("eye")+'<span>'+L2("Show all","Показать всё")+'</span>':ic("eyeOff")+'<span>'+L2("Try it first","Сначала сам")+'</span>';lxNextBtn(ex)}
function lxNextBtn(ex){var n=ex.querySelector(".lx-next");if(!ex.classList.contains("lx-cover")){if(n)n.remove();return}
  var left=[].slice.call(ex.querySelectorAll(".cb-steps li:not(.lx-shown)")),a=ex.querySelector(".cb-a:not(.lx-shown)");if(!n){n=document.createElement("button");n.className="btn sm pri lx-next";n.onclick=function(){lxStep(ex)};var host=ex.querySelector(".cb-steps");host.parentNode.insertBefore(n,host.nextSibling)}
  if(!left.length&&!a){n.remove();ex.classList.add("lx-done");return}n.innerHTML=ic("chevR")+'<span>'+(left.length?L2("Show step "+(ex.querySelectorAll(".cb-steps li.lx-shown").length+1),"Шаг "+(ex.querySelectorAll(".cb-steps li.lx-shown").length+1)):L2("Show the answer","Показать ответ"))+'</span>'}
function lxStep(ex){var li=ex.querySelector(".cb-steps li:not(.lx-shown)");if(li)li.classList.add("lx-shown");else{var a=ex.querySelector(".cb-a");if(a)a.classList.add("lx-shown")}lxNextBtn(ex)}

/* ---------- 2. your turn: a fresh question like the examples ---------- */
function lxTry(host,uid,title){var si=BRAIN.skillFor(uid,title),it=null;for(var k=0;k<6&&!it;k++)it=GEN.make(uid,2,si);if(!it){host.remove();return}host._it=it;host._done=false;
  var q=BRAIN.qtext(it.q),h='<div class="lx-th">'+AXI("happy",34,"")+'<div><b>'+L2("Your turn","Твоя очередь")+'</b><small>'+L2("A fresh question like the examples — new every time","Новая задача как в примерах — каждый раз другая")+'</small></div></div><div class="lx-q">'+q+'</div>';
  if(it.t==="mc")h+='<div class="lx-opts">'+it.c.map(function(c,i){return '<button class="opt lx-o" data-i="'+i+'"><span class="k">'+"ABCD".charAt(i)+'</span><span>'+BRAIN.qtext(String(c))+'</span></button>'}).join("")+'</div>';
  else h+='<div class="lx-in"><input inputmode="text" autocomplete="off" placeholder="'+L2("your answer…","твой ответ…")+'" aria-label="'+L2("Your answer","Твой ответ")+'"><button class="btn pri sm lx-chk">'+L2("Check","Проверить")+'</button></div>';
  h+='<div class="lx-res"></div><div class="lx-row"><button class="btn sm ghost lx-new">'+ic("refresh")+L2("New question","Новая задача")+'</button><button class="btn sm ghost lx-ask">'+ic("chat")+L2("Ask Axi","Спросить Акси")+'</button></div>';
  host.innerHTML=h;
  host.querySelectorAll(".lx-o").forEach(function(o){o.onclick=function(){lxCheck(host,+o.getAttribute("data-i"))}});
  var inp=host.querySelector(".lx-in input");if(inp){inp.onkeydown=function(e){if(e.key==="Enter")lxCheck(host,inp.value)};host.querySelector(".lx-chk").onclick=function(){lxCheck(host,inp.value)}}
  host.querySelector(".lx-new").onclick=function(){lxTry(host,uid,title)};
  host.querySelector(".lx-ask").onclick=function(){chatOpen(host._done?"explain it":"quiz me on "+title,true)}}
function lxCheck(host,v){var it=host._it;if(!it||host._done)return;var ok,shown;
  if(it.t==="mc"){ok=v===it.a;shown=it.c[it.a];host.querySelectorAll(".lx-o").forEach(function(o,k){o.disabled=true;if(k===it.a)o.classList.add("correct");if(k===v&&!ok)o.classList.add("wrong")})}
  else{if(!String(v).trim()){toast(L2("Type an answer first","Сначала введи ответ"));return}ok=checkNum(it.a,v);shown=Array.isArray(it.a)?it.a[0]:it.a;host.querySelector(".lx-in input").disabled=true}
  host._done=true;try{if(typeof skUpdate==="function")skUpdate(it,ok);if(ok)addXp(3)}catch(e){}
  var st=BRAIN.splitSteps(it.s);host.querySelector(".lx-res").innerHTML='<div class="explain '+(ok?"ok":"no")+'"><div class="v">'+(ok?L2("Correct! +3 XP","Верно! +3 XP"):L2("Not quite — answer: ","Почти — ответ: ")+BRAIN.qtext(String(shown)))+'</div><ol class="eg-steps lx-st">'+st.map(function(s,i){return '<li style="--i:'+i+'"><span class="eg-num">'+(i+1)+'</span><div>'+BRAIN.qtext(s)+'</div></li>'}).join("")+'</ol></div>';
  if(ok&&typeof confetti==="function")try{confetti(30)}catch(e){}}

/* ---------- 3. Ask Axi from a lesson page ---------- */
function lxAskRow(){return '<div class="lx-ask-row" role="group" aria-label="'+L2("Ask Axi about this page","Спроси Акси об этой странице")+'"><span class="lx-ask-l">'+AXI("happy",26,"")+L2("Ask Axi","Спроси Акси")+'</span>'+
  [[L2("Explain this simply","Объясни просто"),"explain this lesson"],[L2("Another example","Ещё пример"),"another example"],[L2("Quiz me on this","Проверь меня"),"quiz me on this lesson"]].map(function(x){return '<button class="axc-chip" onclick="chatOpen(\''+x[1]+'\',true)">'+x[0]+'</button>'}).join("")+'</div>'}

/* ---------- wire into the lesson pages ---------- */
var _lpShowLX=lpShow;lpShow=function(d){_lpShowLX(d);try{lxDecorate()}catch(e){console.error(e)}};
function lxDecorate(){var st=el("plStage");if(!st||typeof LP==="undefined"||!LP)return;var pg=st.querySelector(".pg");if(!pg||pg.classList.contains("cover"))return;var kind=(LP.seq[LP.i]||{}).kind;
  pg.querySelectorAll(".cb-exs .cb-ex").forEach(function(ex){if(ex.querySelector(".lx-cv"))return;var b=document.createElement("button");b.className="lx-cv";b.type="button";b.innerHTML=ic("eyeOff")+'<span>'+L2("Try it first","Сначала сам")+'</span>';b.onclick=function(){lxCover(b)};ex.insertBefore(b,ex.firstChild)});
  var exs=pg.querySelector(".cb-exs");if(exs&&!pg.querySelector(".lx-try")){var t=document.createElement("div");t.className="lx-try";exs.parentNode.insertBefore(t,exs.nextSibling);lxTry(t,LP.u.id,LP.l.t)}
  if((kind==="read"||kind==="example")&&!pg.querySelector(".lx-ask-row")&&LP.u.id!=="words")pg.insertAdjacentHTML("beforeend",lxAskRow())}

/* ---------- 4. after a practice answer ---------- */
if(typeof finishQ==="function"){var _fqLX=finishQ;finishQ=function(ok,it,ct){_fqLX(ok,it,ct);try{var ex=el("exbox");if(ex&&!ex.querySelector(".lx-axbtn")){var b=document.createElement("button");b.className="btn sm ghost lx-axbtn";b.innerHTML=ic("chat")+L2(ok?"Ask Axi why it works":"Ask Axi to explain it slowly",ok?"Почему это работает?":"Акси, объясни медленно");b.onclick=function(){chatOpen("explain this question",true)};(ex.querySelector(".explain")||ex).appendChild(b)}}catch(e){}}}

(function(){var c=`
.cb-ex{position:relative}
.lx-cv{position:absolute;right:0;top:0;display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;border:1px solid color-mix(in srgb,var(--pv,var(--violet)) 40%,transparent);background:color-mix(in srgb,var(--pv,var(--violet)) 10%,transparent);color:var(--pv,var(--violet));font:700 12px var(--ui);cursor:pointer;transition:all .15s}
.lx-cv:hover{background:color-mix(in srgb,var(--pv,var(--violet)) 22%,transparent)}.lx-cv .ic{width:14px;height:14px}
.lx-cover .cb-steps li:not(.lx-shown){filter:blur(7px);opacity:.35;pointer-events:none;user-select:none}
.lx-cover .cb-a:not(.lx-shown){filter:blur(8px);opacity:.3}
.lx-cover .cb-steps li.lx-shown,.lx-cover .cb-a.lx-shown{filter:none;opacity:1;animation:cbIn .45s cubic-bezier(.2,.8,.2,1)}
.lx-cover .cb-steps li,.lx-cover .cb-a{transition:filter .35s,opacity .35s}
.lx-next{margin:4px 0 10px 34px}
.lx-try{margin:16px 0 8px;padding:16px;border-radius:20px;border:1.5px dashed color-mix(in srgb,var(--violet) 45%,var(--line));background:linear-gradient(135deg,color-mix(in srgb,var(--violet) 8%,transparent),color-mix(in srgb,var(--blue) 6%,transparent))}
.lx-th{display:flex;align-items:center;gap:10px;margin-bottom:10px}.lx-th svg{width:34px;height:34px}.lx-th b{display:block;font:800 16px var(--disp,inherit)}.lx-th small{color:var(--ink2);font-size:12.5px}
.lx-q{font-size:16.5px;line-height:1.55;margin:4px 0 12px}.lx-opts{display:grid;gap:8px}
.lx-in{display:flex;gap:8px}.lx-in input{flex:1;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);font:500 16px var(--ui)}.lx-in input:focus{outline:0;border-color:var(--violet);box-shadow:0 0 0 4px color-mix(in srgb,var(--violet) 18%,transparent)}
.lx-res:not(:empty){margin-top:12px}.lx-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.lx-st{margin-top:8px}
.lx-ask-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:22px 0 4px;padding-top:14px;border-top:1px dashed var(--line)}
.lx-ask-l{display:inline-flex;align-items:center;gap:6px;font:800 12px var(--ui);letter-spacing:.06em;text-transform:uppercase;color:var(--violet);margin-right:4px}.lx-ask-l svg{width:26px;height:26px}
.lx-axbtn{margin-top:10px}
@media print{.lx-cv,.lx-try,.lx-ask-row,.lx-next{display:none!important}.lx-cover .cb-steps li,.lx-cover .cb-a{filter:none!important;opacity:1!important}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
