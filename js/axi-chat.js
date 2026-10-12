/* =====================================================================
   AXIOM — talk to Axilotti
   A real chat with Axi's offline brain: type (or say) anything —
   a problem, a topic, "quiz me", "what should I study?" — and Axi
   answers step by step, with typeset maths, voice and buttons.
   Also: select any text in a lesson and press "Ask Axi".
   ===================================================================== */
ICONS.send="M4 12 20 4l-4 16-4-7-8-1zM12 13l8-9";
ICONS.mic="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6";
ICONS.trash="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6";
ICONS.chat="M4 5h16v11H9l-5 4z M8 9h8M8 12h5";
ICONS.shield="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12l2.5 2.5 4.5-5";
ICONS.copy="M9 9h11v11H9zM5 15V4h11";
ICONS.stop="M7 7h10v10H7z";

var AXC={open:false,busy:false,hist:[],key:function(){return "axiom_chat_"+(window.Z800_USER||"__guest")}};
function axcLoad(){try{AXC.hist=JSON.parse(localStorage.getItem(AXC.key())||"[]")||[]}catch(e){AXC.hist=[]}}
function axcSave(){try{localStorage.setItem(AXC.key(),JSON.stringify(AXC.hist.slice(-40)))}catch(e){}}
axcLoad();
if(S.voice&&S.voice.chatSpeak===undefined)S.voice.chatSpeak=true;

/* ---------- open / close ---------- */
function chatOpen(prefill,send){if(AXC.open){if(prefill!==undefined){var i=el("axcIn");i.value=prefill;if(send)chatSend();else i.focus()}return}
  if(typeof tipClose==="function")tipClose();VG=true;AXC.open=true;var p=document.createElement("div");p.id="axiChat";p.className="axc";p.setAttribute("role","dialog");p.setAttribute("aria-label","Chat with Axi");
  var rec=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
  p.innerHTML='<div class="axc-h"><div class="axc-av" id="axcAv">'+AXI("happy",46,"axi-live")+'</div><div class="axc-who"><b>Axilotti</b><small><i class="axc-dot"></i>'+L2("Your SAT Math tutor","Твой помощник по математике SAT")+'</small></div>'+ 
    '<button class="axc-hb'+(S.voice.chatSpeak?" on":"")+'" id="axcSpk" title="'+L2("Read answers aloud","Читать ответы вслух")+'" onclick="chatSpeakToggle()">'+ic("speak")+'</button>'+
    '<button class="axc-hb" title="'+L2("More","Ещё")+'" onclick="chatToolsToggle()">'+ic("dots")+'</button><button class="axc-hb" title="'+L2("Close","Закрыть")+' (Esc)" onclick="chatClose()">'+ic("x")+'</button></div>'+
    '<div class="axc-tools" id="axcTools" hidden><div class="axc-tg">'+[["compass",L2("Tour","Тур"),"tourStart(0)"],["search",L2("Search","Поиск"),"searchOpen()"],["graph",L2("Graphing","График"),"graphOpen()"],["calc",L2("Calculator","Калькулятор"),"calcOpen()"],["sparkles",L2("Meet Axi","Знакомство"),"introOpen()"],["settings",L2("Settings","Настройки"),"settingsOpen()"],["trash",L2("Clear chat","Очистить"),"chatClear()"]].map(function(a){return '<button data-act="'+a[2]+'">'+ic(a[0])+'<span>'+a[1]+'</span></button>'}).join("")+'</div>'+
    '<div class="axc-voice"><span>'+L2("Axi's voice:","Голос Акси:")+'</span><div class="vseg">'+[["voice",L2("Voice","Голос")],["chirp",L2("Chirps","Звуки")],["silent",L2("Silent","Тихо")]].map(function(x){return '<button data-m="'+x[0]+'" class="'+(S.voice.mode===x[0]?"on":"")+'" onclick="voiceMode(\''+x[0]+'\');this.parentNode.querySelectorAll(\'button\').forEach(function(b){b.classList.toggle(\'on\',b===this)},this)">'+x[1]+'</button>'}).join("")+'</div></div></div>'+
    '<div class="axc-body" id="axcBody" aria-live="polite"></div><div class="axc-chips" id="axcChips"></div>'+
    '<form class="axc-in" onsubmit="event.preventDefault();chatSend()"><textarea id="axcIn" rows="1" placeholder="'+L2("Ask anything — e.g. solve 3x − 7 = 11","Спроси что угодно — например, реши 3x − 7 = 11")+'" aria-label="'+L2("Message Axi","Сообщение Акси")+'" autocomplete="off"></textarea>'+
    (rec?'<button type="button" class="axc-mic" id="axcMic" title="'+L2("Speak","Сказать")+'" onclick="chatMic()">'+ic("mic")+'</button>':'')+'<button type="submit" class="axc-send" title="'+L2("Send","Отправить")+' (Enter)">'+ic("send")+'</button></form>';
  document.body.appendChild(p);document.body.classList.add("chat-on");
  var b=el("axcBody");if(!AXC.hist.length)chatWelcome();else{b.innerHTML=AXC.hist.map(function(m){return msgHTML(m.f,m.h,true)}).join("");b.querySelectorAll(".ax-quiz .ax-opt").forEach(function(o){o.disabled=true});chatContextNote()}
  chatChips();requestAnimationFrame(function(){p.classList.add("in");b.scrollTop=b.scrollHeight});
  var inp=el("axcIn");inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();chatSend()}else if(e.key==="ArrowUp"&&!inp.value){var last=AXC.hist.filter(function(m){return m.f==="me"}).pop();if(last){inp.value=last.raw||"";e.preventDefault()}}else if(e.key==="Escape"){chatClose()}});
  inp.addEventListener("input",function(){inp.style.height="auto";inp.style.height=Math.min(120,inp.scrollHeight)+"px"});
  p.addEventListener("click",chatClick);
  if(prefill!==undefined){inp.value=prefill;if(send)setTimeout(chatSend,60)}else if(!("ontouchstart" in window))setTimeout(function(){inp.focus()},120);
  try{BRAIN.buildIndex()}catch(e){}}
function chatClose(){var p=el("axiChat");AXC.open=false;if(!p)return;if(typeof axiHush==="function"&&TK)axiHush();p.classList.remove("in");p.classList.add("out");document.body.classList.remove("chat-on");setTimeout(function(){p.remove()},220)}
function chatToggle(){if(AXC.open)chatClose();else chatOpen()}
function chatToolsToggle(){var t=el("axcTools");if(t)t.hidden=!t.hidden}
function chatSpeakToggle(){S.voice.chatSpeak=!S.voice.chatSpeak;saveS();var b=el("axcSpk");if(b)b.classList.toggle("on",S.voice.chatSpeak);if(!S.voice.chatSpeak&&TK)axiHush();toast(S.voice.chatSpeak?L2("Axi will read answers aloud","Акси будет читать ответы"):L2("Axi stays quiet","Акси молчит"))}
function chatClear(){AXC.hist=[];axcSave();BRAIN.ctx.quiz=null;BRAIN.ctx.topic=null;var b=el("axcBody");if(b){b.innerHTML="";chatWelcome();chatChips()}}

/* ---------- messages ---------- */
function msgHTML(f,h,old){return f==="me"?'<div class="axm me'+(old?" old":"")+'"><div class="axm-b">'+h+'</div></div>':'<div class="axm ai'+(old?" old":"")+'"><div class="axm-av">'+AXI("happy",30,"")+'</div><div class="axm-b">'+h+'</div></div>'}
function chatAdd(f,h,raw){var b=el("axcBody");if(!b)return null;b.insertAdjacentHTML("beforeend",msgHTML(f,h));AXC.hist.push({f:f,h:h,raw:raw,t:Date.now()});if(AXC.hist.length>60)AXC.hist=AXC.hist.slice(-40);axcSave();var m=b.lastElementChild;
  if(f==="ai"&&typeof glossify==="function"){try{glossify(m.querySelector(".axm-b"))}catch(e){}}
  chatScroll(m);return m}
function chatScroll(m){var b=el("axcBody");if(!b)return;var top=m&&m.offsetHeight>b.clientHeight*0.8?m.offsetTop-12:b.scrollHeight;if(b.scrollTo)b.scrollTo({top:top,behavior:"smooth"});else b.scrollTop=top}
function chatWelcome(){var c=typeof axiCoach==="function"?axiCoach():null,nm=(S.profile&&S.profile.name)||"",h=AXC.hist.length?"":'<p>'+L2("Hi"+(nm?" "+esc(nm):"")+"! I'm Axilotti 💜 Ask me anything about SAT Math. I solve problems step by step, explain topics in plain words, quiz you, and know your progress.","Привет"+(nm?", "+esc(nm):"")+"! Я Аксилотти 💜 Спрашивай что угодно по математике SAT. Решаю задачи по шагам, объясняю темы простыми словами, проверяю тебя и знаю твой прогресс.")+'</p>';
  if(c)h+='<div class="ax-coachline">'+ic("target")+'<span>'+esc(c.say.replace(/^(Hi|Привет)[^!]*!\s*/,""))+'</span></div>'+(c.btn?'<div class="ax-acts"><button class="ax-btn pri" data-act="'+esc(c.go)+'">'+ic(c.ic||"play")+'<span>'+esc(c.btn)+'</span></button></div>':'');
  chatAdd("ai",h);chatContextNote(true)}
var _ctxSeen="";
function chatContextNote(force){var k=location.hash;if(!force&&k===_ctxSeen)return;_ctxSeen=k;var p={};try{p=BRAIN&&BRAIN.respond?{}:{}}catch(e){}
  if(typeof LP!=="undefined"&&LP&&el("plStage")){var n=typeof cbFind==="function"?cbFind(LP.u.id,LP.l.id):null;if(n&&!force)chatAdd("ai",'<p class="ax-ctx">'+ic("bookOpen")+L2("You're on “"+esc(LP.l.t)+"”. Ask me anything about it.","Ты на уроке «"+esc(LP.l.t)+"». Спрашивай про него что угодно.")+'</p>')}}
function chatChips(list){var c=el("axcChips");if(!c)return;list=list||BRAIN.suggestions();c.innerHTML=list.map(function(x){return '<button class="axc-chip" data-q="'+esc(x.q)+'">'+esc(x.t)+'</button>'}).join("")}

/* ---------- sending & answering ---------- */
function chatSend(text){var inp=el("axcIn");var raw=text!==undefined?text:(inp?inp.value:"");raw=String(raw||"").trim();if(!raw||AXC.busy)return;if(inp&&text===undefined){inp.value="";inp.style.height="auto"}
  chatAdd("me",esc(raw),raw);var b=el("axcBody");AXC.busy=true;b.insertAdjacentHTML("beforeend",'<div class="axm ai typing" id="axcTyping"><div class="axm-av">'+AXI("think",30,"")+'</div><div class="axm-b"><i></i><i></i><i></i></div></div>');chatScroll();axcMood("think");
  var r;try{r=BRAIN.respond(raw)}catch(e){console.error(e);r={html:"<p>"+L2("Oops — my brain tripped over that one. Could you write it a little differently?","Ой — я споткнулся. Можешь написать по-другому?")+"</p>",mood:"sad"}}
  if(!r)r={html:"<p>…</p>"};var delay=Math.min(1100,320+String(r.html).replace(/<[^>]+>/g,"").length*1.2);if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)delay=80;
  setTimeout(function(){var ty=el("axcTyping");if(ty)ty.remove();AXC.busy=false;chatReply(r)},delay)}
function chatReply(r){var m=chatAdd("ai",r.html+(r.foot||""));axcMood(r.mood||"happy");if(r.chips&&r.chips.length)chatChips(r.chips.concat(BRAIN.suggestions().slice(0,2)));else chatChips();
  if(r.act){setTimeout(function(){try{new Function(r.act)()}catch(e){}if(/^go\(/.test(r.act)&&window.innerWidth<720)chatClose()},380)}
  if(r.say&&S.voice.chatSpeak&&S.voice.mode!=="silent"){try{axiSay(r.say,{axi:el("axcAv"),mode:S.voice.mode})}catch(e){}}
  else{var av=el("axcAv");if(av){av.classList.add("axc-nod");setTimeout(function(){av.classList.remove("axc-nod")},700)}}
  if(r.mood==="cheer"&&typeof confetti==="function"&&/ax-res ok/.test(r.html))try{confetti(40)}catch(e){}}
function axcMood(mood){var av=el("axcAv");if(!av)return;av.innerHTML=AXI(mood==="sad"?"sad":mood==="think"?"think":mood==="cheer"?"cheer":mood==="wow"?"wow":"happy",46,"axi-live")}
function chatClick(e){var q=e.target.closest(".axc-chip");if(q){chatSend(q.getAttribute("data-q"));return}
  var a=e.target.closest("[data-act]");if(!a||a.disabled)return;var act=a.getAttribute("data-act");e.preventDefault();
  if(/^BRAIN\.answer\(/.test(act)){var qz=a.closest(".ax-quiz"),i=+act.match(/\d+/)[0],Q=BRAIN.ctx.quiz;if(!Q||Q.done){toast(L2("That question is finished — ask for another!","Эта задача уже решена — попроси новую!"));return}
    if(qz){qz.querySelectorAll(".ax-opt").forEach(function(o,k){o.disabled=true;if(k===Q.it.a)o.classList.add("ok");if(k===i&&i!==Q.it.a)o.classList.add("no")})}
    chatAdd("me",esc("ABCD".charAt(i)+") "+String(Q.it.c[i])),"ABCD".charAt(i));var r=BRAIN.answer(i);if(r)setTimeout(function(){chatReply(r)},260);return}
  try{new Function(act)()}catch(err){console.error(err)}
  if(/^go\(|lessonRead|graphOpen|calcOpen|settingsOpen|tourStart|introOpen|searchOpen|scratchOpen|refOpen/.test(act)&&window.innerWidth<720)chatClose()}

/* ---------- speaking to Axi ---------- */
var AXREC=null;
function chatMic(){var R=window.SpeechRecognition||window.webkitSpeechRecognition,b=el("axcMic");if(!R)return;
  if(AXREC){try{AXREC.stop()}catch(e){}return}
  var r=new R();AXREC=r;r.lang=S.uiLang==="ru"?"ru-RU":"en-US";r.interimResults=true;r.maxAlternatives=1;if(b)b.classList.add("rec");
  r.onresult=function(e){var t="";for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;var inp=el("axcIn");if(inp)inp.value=t;if(e.results[e.results.length-1].isFinal){setTimeout(function(){chatSend()},250)}};
  r.onend=r.onerror=function(){AXREC=null;if(b)b.classList.remove("rec")};try{r.start()}catch(e){AXREC=null;if(b)b.classList.remove("rec")}}

/* ---------- Ask Axi about any selected text ---------- */
var selBtn=null;
function selHide(){if(selBtn){selBtn.remove();selBtn=null}}
document.addEventListener("selectionchange",function(){var s=window.getSelection&&window.getSelection();if(!s||s.isCollapsed)setTimeout(function(){var s2=window.getSelection();if(!s2||s2.isCollapsed)selHide()},120)});
document.addEventListener("pointerup",function(e){if(e.target.closest&&e.target.closest("#axiChat,.axc-sel,input,textarea"))return;setTimeout(function(){var s=window.getSelection&&window.getSelection();if(!s||s.isCollapsed||!s.rangeCount){return}var t=String(s).trim();
  if(t.length<2||t.length>240)return;var n=s.anchorNode&&(s.anchorNode.nodeType===1?s.anchorNode:s.anchorNode.parentElement);if(!n||!n.closest||!n.closest("#app"))return;
  var r=s.getRangeAt(0).getBoundingClientRect();selHide();selBtn=document.createElement("button");selBtn.className="axc-sel";selBtn.type="button";selBtn.innerHTML=AXI("happy",22,"")+'<span>'+L2("Ask Axi","Спросить Акси")+'</span>';
  selBtn.style.left=Math.max(8,Math.min(window.innerWidth-150,r.left+r.width/2-62))+"px";selBtn.style.top=Math.max(8,r.top-46)+"px";
  selBtn.onpointerdown=function(ev){ev.preventDefault()};selBtn.onclick=function(){var q=/[=<>]|\d\s*[a-z]|[+\-*/^]\s*\d/i.test(t)&&/\d/.test(t)?t:"explain "+t;selHide();chatOpen(q,true)};document.body.appendChild(selBtn)},10)});
document.addEventListener("scroll",selHide,true);

/* ---------- the Ask-Axi button now opens the chat ---------- */
buddyToggle=function(){chatToggle()};
/* page changes call buddyClose(): on a phone the chat steps aside, on a big screen it stays open beside the page */
var _buddyCloseC=buddyClose;buddyClose=function(){_buddyCloseC();if(window.innerWidth<720)chatClose()};
var _busyC=busyScreen;busyScreen=function(){return _busyC()||AXC.open};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&AXC.open&&!document.querySelector(".modal"))chatClose();
  if((e.key==="/"||e.key==="k")&&(e.ctrlKey||e.metaKey)&&e.shiftKey){e.preventDefault();chatToggle()}});
/* keep the conversation aware of the page */
window.addEventListener("hashchange",function(){if(AXC.open){chatChips();chatContextNote()}selHide()});
/* open from anywhere: ?ask=… in the link */
(function(){try{var m=location.search.match(/[?&]ask=([^&]+)/);if(m){var q=decodeURIComponent(m[1].replace(/\+/g," "));try{history.replaceState(null,"",location.pathname+location.hash)}catch(e){}setTimeout(function(){chatOpen(q,true)},1200)}}catch(e){}})();
if(typeof PAGEHELP!=="undefined"){}
/* quick menu & palette */
if(typeof paletteActions==="function"){var _paC=paletteActions;paletteActions=function(){var l=_paC();l.splice(0,0,["chat",L2("Ask Axi anything","Спросить Акси"),function(){chatOpen()}]);return l}}

/* ---------- what's new in 2.4 ---------- */
AXV="2.4";
whatsNew=function(){if(el("intro"))return;S.seenVer=AXV;saveS();
  var L=[["chat",L2("Talk to Axi — a real study brain","Поговори с Акси — настоящий помощник"),L2("Ask anything: Axi solves maths step by step, explains topics, quizzes you and plans your week. Works offline.","Спроси что угодно: Акси решает задачи по шагам, объясняет темы, проверяет тебя и планирует неделю. Работает без интернета.")],
    ["search",L2("Ask about any sentence","Спроси про любое предложение"),L2("Select text in a lesson and tap “Ask Axi”.","Выдели текст в уроке и нажми «Спросить Акси».")],
    ["sparkles",L2("Axi is alive","Акси оживает"),L2("Eyes that follow you, naps when you're away, and help when you're stuck.","Глаза следят за тобой, дремлет, когда тебя нет, и помогает, когда трудно.")],
    ["zap",L2("Faster and smoother","Быстрее и плавнее"),L2("The app starts about 3× faster, with new hover effects and animations.","Приложение запускается примерно в 3 раза быстрее, с новыми эффектами и анимацией.")]];
  var m=modal('<div style="text-align:center">'+AXI("cheer",90,"axi-jump")+'</div><h2>'+L2("What’s new in AXIOM ","Что нового в AXIOM ")+AXV+'</h2><div class="wn">'+L.map(function(x){return '<div class="wn-i"><span class="qa-ic">'+ic(x[0])+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join("")+'</div><div style="display:flex;gap:8px"><button class="btn ghost" style="flex:1" data-close onclick="setTimeout(function(){chatOpen()},250)">'+ic("chat")+L2("Talk to Axi","Поговорить с Акси")+'</button><button class="btn pri" style="flex:1" data-close>'+L2("Let’s go","Поехали")+'</button></div>',"gs");trUI(m)};

/* ---------- styles ---------- */
(function(){var c=`
.axc{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:140;width:min(430px,calc(100vw - 24px));height:min(700px,calc(100vh - 110px));height:min(700px,calc(100dvh - 110px));display:flex;flex-direction:column;
  background:color-mix(in srgb,var(--paper) 94%,transparent);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3);border:1px solid color-mix(in srgb,var(--violet) 26%,var(--line));border-radius:26px;
  box-shadow:0 30px 80px -20px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.03) inset;transform:translateY(18px) scale(.97);opacity:0;transform-origin:bottom right;transition:transform .32s cubic-bezier(.2,.9,.2,1.1),opacity .22s;overflow:hidden}
.axc.in{transform:none;opacity:1}.axc.out{transform:translateY(14px) scale(.97);opacity:0}
body.chat-on #axiBuddy .ab-btn{transform:scale(.0);opacity:0;pointer-events:none}
.axc-h{display:flex;align-items:center;gap:10px;padding:12px 12px 12px 14px;border-bottom:1px solid var(--line);background:linear-gradient(120deg,color-mix(in srgb,var(--violet) 16%,transparent),color-mix(in srgb,var(--blue) 10%,transparent))}
.axc-av{width:46px;height:46px;flex:none;border-radius:50%;background:radial-gradient(circle at 50% 60%,color-mix(in srgb,#ff9ec5 30%,transparent),transparent 70%);display:grid;place-items:center}
.axc-av svg{width:46px;height:46px}.axc-nod svg{animation:axcNod .6s ease}@keyframes axcNod{30%{transform:rotate(-8deg) translateY(2px)}60%{transform:rotate(5deg)}}
.axc-who{flex:1;min-width:0}.axc-who b{display:block;font:800 17px var(--disp,inherit);letter-spacing:.01em}.axc-who small{display:flex;align-items:center;gap:6px;color:var(--ink2);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.axc-dot{width:8px;height:8px;border-radius:50%;background:var(--grn);box-shadow:0 0 0 3px color-mix(in srgb,var(--grn) 25%,transparent);animation:axcPulse 2.4s infinite}@keyframes axcPulse{50%{box-shadow:0 0 0 6px transparent}}
.axc-hb{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;color:var(--ink2);background:transparent;border:0;cursor:pointer;transition:background .15s,color .15s,transform .15s}.axc-hb:hover{background:color-mix(in srgb,var(--ink) 8%,transparent);color:var(--ink)}.axc-hb:active{transform:scale(.92)}.axc-hb.on{color:var(--violet)}.axc-hb .ic{width:19px;height:19px}
.axc-tools[hidden]{display:none!important}.axc-tools{padding:10px 12px;border-bottom:1px solid var(--line);display:grid;gap:10px;animation:axcDrop .25s ease}@keyframes axcDrop{from{opacity:0;transform:translateY(-6px)}}
.axc-tg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.axc-tg button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border-radius:12px;border:1px solid var(--line);background:color-mix(in srgb,var(--ink) 3%,transparent);color:var(--ink);font:600 11.5px var(--ui);cursor:pointer;transition:all .15s}.axc-tg button:hover{border-color:var(--violet);transform:translateY(-1px)}.axc-tg .ic{width:18px;height:18px;color:var(--violet)}
.axc-voice{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink2)}
.axc-body{flex:1;overflow-y:auto;padding:14px 12px 6px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;overscroll-behavior:contain}
.axm{display:flex;gap:8px;align-items:flex-end;animation:axmIn .38s cubic-bezier(.2,.9,.3,1.2) both}.axm.old{animation:none}@keyframes axmIn{from{opacity:0;transform:translateY(10px) scale(.98)}}
.axm.me{justify-content:flex-end}.axm.me .axm-b{background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;border-radius:18px 18px 4px 18px;padding:9px 14px;max-width:82%;font-size:15px;line-height:1.45;word-break:break-word;box-shadow:0 8px 20px -10px color-mix(in srgb,var(--violet) 70%,transparent)}
.axm-av{width:30px;height:30px;flex:none;align-self:flex-start}.axm-av svg{width:30px;height:30px}
.axm.ai .axm-b{background:color-mix(in srgb,var(--ink) 5%,var(--paper));border:1px solid var(--line);border-radius:4px 18px 18px 18px;padding:10px 13px;max-width:calc(100% - 38px);min-width:0;font-size:14.5px;line-height:1.55;overflow-x:auto}
.axm.ai .axm-b>p{margin:0 0 6px}.axm.ai .axm-b>p:last-child{margin:0}
.axm.typing .axm-b{display:flex;gap:5px;padding:14px 16px}.axm.typing i{width:7px;height:7px;border-radius:50%;background:var(--violet);animation:axcTy 1s infinite}.axm.typing i:nth-child(2){animation-delay:.15s}.axm.typing i:nth-child(3){animation-delay:.3s}@keyframes axcTy{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
.axc-chips{display:flex;gap:6px;padding:6px 12px 2px;overflow-x:auto;scrollbar-width:none}.axc-chips::-webkit-scrollbar{display:none}
.axc-chip{flex:none;padding:7px 12px;border-radius:999px;border:1px solid color-mix(in srgb,var(--violet) 35%,var(--line));background:color-mix(in srgb,var(--violet) 8%,transparent);color:var(--ink);font:600 12.5px var(--ui);cursor:pointer;white-space:nowrap;transition:all .18s}
.axc-chip:hover{background:color-mix(in srgb,var(--violet) 20%,transparent);transform:translateY(-1px)}.axc-chip:active{transform:scale(.96)}
.axc-in{display:flex;align-items:flex-end;gap:6px;padding:8px 10px 10px;border-top:1px solid transparent}
.axc-in textarea{flex:1;resize:none;min-height:44px;max-height:120px;padding:11px 14px;border-radius:16px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);font:500 15px/1.4 var(--ui);outline:0;transition:border-color .15s,box-shadow .15s}
.axc-in textarea:focus{border-color:var(--violet);box-shadow:0 0 0 4px color-mix(in srgb,var(--violet) 18%,transparent)}
.axc-send,.axc-mic{width:44px;height:44px;flex:none;border-radius:14px;border:0;display:grid;place-items:center;cursor:pointer;transition:transform .15s,filter .15s}
.axc-send{background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;box-shadow:0 8px 18px -8px var(--violet)}.axc-send:hover{filter:brightness(1.1);transform:translateY(-1px)}.axc-send:active{transform:scale(.92)}
.axc-mic{background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink2)}.axc-mic.rec{background:var(--red);color:#fff;animation:axcRec 1.2s infinite}@keyframes axcRec{50%{box-shadow:0 0 0 8px color-mix(in srgb,var(--red) 20%,transparent)}}
.axc-send .ic,.axc-mic .ic{width:20px;height:20px}
/* answer blocks */
.ax-k{display:flex;align-items:center;gap:6px;font:800 11px var(--ui);letter-spacing:.07em;text-transform:uppercase;color:var(--violet);margin:0 0 6px}.ax-k .ic{width:14px;height:14px}
.ax-q{font-size:16.5px;margin:2px 0 8px;padding:8px 10px;border-radius:10px;background:color-mix(in srgb,var(--blue) 7%,transparent)}
.ax-steps{list-style:none;margin:6px 0;padding:0;display:grid;gap:6px}.ax-steps li{display:flex;gap:9px;align-items:flex-start;animation:axStep .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i)*.13s + .1s)}
@keyframes axStep{from{opacity:0;transform:translateX(-8px)}}
.ax-n{flex:none;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:800 11.5px var(--ui);color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));margin-top:3px}
.ax-m{font-size:16px;line-height:1.5;overflow-x:auto;padding:1px 0}.ax-t{font-size:13.5px;color:var(--ink2);line-height:1.5}.ax-steps .ax-t:only-child{color:var(--ink);font-size:14.5px}
.ax-ans{display:flex;align-items:center;gap:8px;margin:10px 0 4px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--grn) 13%,transparent);border:1.5px solid color-mix(in srgb,var(--grn) 50%,transparent);font-size:17px;font-weight:700;animation:axPop .5s cubic-bezier(.2,.9,.3,1.4) both;animation-delay:.5s}
.ax-ans .ic{width:20px;height:20px;color:var(--grn);flex:none}@keyframes axPop{from{opacity:0;transform:scale(.9)}}
.ax-chk{display:flex;gap:7px;align-items:flex-start;font-size:13px;color:var(--ink2);margin:6px 0}.ax-chk .ic{width:16px;height:16px;color:var(--grn);flex:none;margin-top:2px}
.ax-p{margin:6px 0;font-size:14px}.ax-tip,.ax-warn,.ax-coachline{display:flex;gap:8px;align-items:flex-start;margin:8px 0 2px;padding:9px 11px;border-radius:12px;background:color-mix(in srgb,var(--yel,#f5c84c) 16%,transparent);font-size:13.5px}
.ax-warn{background:color-mix(in srgb,var(--red) 12%,transparent)}.ax-coachline{background:color-mix(in srgb,var(--violet) 12%,transparent)}.ax-tip .ic,.ax-warn .ic,.ax-coachline .ic{width:17px;height:17px;flex:none;margin-top:1px}.ax-tip .ic{color:#e3a412}.ax-warn .ic{color:var(--red)}.ax-coachline .ic{color:var(--violet)}
.ax-facts{display:grid;grid-template-columns:1fr;gap:4px;margin:8px 0;padding:8px 10px;border-radius:12px;border:1px dashed color-mix(in srgb,var(--violet) 35%,var(--line))}.ax-facts div{display:flex;justify-content:space-between;gap:10px;font-size:13.5px}.ax-facts span{color:var(--ink2)}.ax-facts b{text-align:right}
.ax-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.ax-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:12px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font:700 13px var(--ui);cursor:pointer;transition:all .15s}.ax-btn .ic{width:16px;height:16px}
.ax-btn:hover{border-color:var(--violet);transform:translateY(-1px)}.ax-btn.pri{background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;border-color:transparent}
.ax-note .ax-nt,.ax-def .ax-nt{font:700 25px/1.15 "Caveat","Segoe Print",cursive;color:var(--blue);margin:0 0 6px}.ax-def small{font:600 14px var(--ui);color:var(--ink2)}
.ax-f{display:flex;flex-wrap:wrap;gap:6px 18px;justify-content:center;padding:9px 10px;margin:6px 0;border:2px solid color-mix(in srgb,var(--blue) 60%,transparent);border-radius:255px 14px 225px 14px/14px 225px 14px 255px;font-size:17px}
.ax-ul{margin:6px 0;padding-left:18px}.ax-ul li{margin:3px 0;font-size:14px}
.ax-foot{margin-top:8px;padding-top:8px;border-top:1px dashed var(--line);font-size:12.5px;color:var(--ink2);display:flex;gap:6px;align-items:center}.ax-foot .ic{width:15px;height:15px}.ax-foot a{color:var(--violet);font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
.ax-quiz .ax-qq{font-size:16px;margin:4px 0 10px;line-height:1.5}.ax-opts{display:grid;gap:6px}
.ax-opt{display:flex;align-items:center;gap:10px;text-align:left;padding:9px 11px;border-radius:12px;border:1.5px solid var(--line);background:var(--paper);color:var(--ink);font:500 14.5px var(--ui);cursor:pointer;transition:all .15s}.ax-opt:hover:not(:disabled){border-color:var(--violet);transform:translateX(3px)}
.ax-opt .k{width:24px;height:24px;flex:none;border-radius:8px;display:grid;place-items:center;font-weight:800;font-size:12px;background:color-mix(in srgb,var(--violet) 14%,transparent);color:var(--violet)}
.ax-opt.ok{border-color:var(--grn);background:color-mix(in srgb,var(--grn) 13%,transparent)}.ax-opt.no{border-color:var(--red);background:color-mix(in srgb,var(--red) 11%,transparent);animation:axShake .4s}.ax-opt:disabled{cursor:default}
@keyframes axShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.ax-hint{font-size:12.5px;color:var(--ink2);margin:4px 0 0}
.ax-res.ok .ax-k{color:var(--grn)}.ax-res.no .ax-k{color:var(--red);text-transform:none;letter-spacing:0;font-size:14px;align-items:flex-start}.ax-res .ax-k>span{flex:1}.ax-res.no .ax-k b{color:var(--ink)}
.ax-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0 12px}.ax-stats div{text-align:center;padding:8px 4px;border-radius:12px;background:color-mix(in srgb,var(--violet) 9%,transparent)}.ax-stats b{display:block;font:800 18px var(--disp,inherit);color:var(--ink)}.ax-stats small{font-size:10.5px;color:var(--ink2);line-height:1.2;display:block}
.ax-plan ul{list-style:none;padding:0;margin:6px 0;display:grid;gap:5px}.ax-plan li{display:grid;grid-template-columns:42px 1fr;gap:8px;font-size:13.5px;padding:6px 8px;border-radius:10px;background:color-mix(in srgb,var(--ink) 4%,transparent);animation:axStep .4s both}.ax-plan li b{color:var(--violet)}
.ax-ctx{display:flex;gap:6px;align-items:center;color:var(--ink2);font-size:13px}.ax-ctx .ic{width:15px;height:15px;color:var(--violet)}
.axc-sel{position:fixed;z-index:160;display:flex;align-items:center;gap:6px;padding:6px 12px 6px 6px;border-radius:999px;border:0;background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;font:700 13px var(--ui);box-shadow:0 12px 26px -10px rgba(0,0,0,.6);cursor:pointer;animation:axPop .25s both}.axc-sel svg{width:22px;height:22px;background:#fff3;border-radius:50%}
@media (max-width:720px){.axc{right:0;left:0;bottom:0;top:0;width:auto;height:auto;border-radius:0;border:0;padding-top:env(safe-area-inset-top,0px);transform-origin:bottom center}
  .axc-in{padding-bottom:calc(10px + env(safe-area-inset-bottom,0px))}.ax-stats{grid-template-columns:repeat(2,1fr)}}
@media (prefers-reduced-motion:reduce){.axc,.axm,.ax-steps li,.ax-ans{animation:none!important;transition:none!important}}
@media print{.axc,.axc-sel{display:none!important}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
