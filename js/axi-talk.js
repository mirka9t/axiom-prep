/* =====================================================================
   AXIOM — Axi talks everywhere
   intro slides · tour · celebrations · practice · Today · voice settings
   ===================================================================== */

/* ---------- intro: Axi reads each slide ---------- */
INTRO_T.en.s[5][2]="One lesson a day is enough to start. Stuck anywhere? Tap me in the corner — I'll explain the page, read lessons aloud and tell you what to do next.";
INTRO_T.ru.s[5][2]="Для начала достаточно одного урока в день. Застрял? Нажми на меня в углу — я объясню страницу, прочитаю урок вслух и подскажу, что делать дальше.";
var INTRO_SAY={en:"Here's how you'll learn. Learn with short lesson pages. Practise with unlimited questions. Review your mistakes and flashcards until they stick. And test yourself with full practice tests.",
  ru:"Вот как ты будешь учиться. Учись по коротким страницам уроков. Практикуйся на бесконечных заданиях. Повторяй ошибки и карточки, пока не запомнишь. И проверяй себя пробными тестами."};
var _idT=introDraw;introDraw=function(dir){_idT(dir);var o=el("intro");if(!o)return;var top=o.querySelector(".in-top"),sk=o.querySelector(".in-skip"),ru=IN.lang==="ru";
  if(top&&sk&&!top.querySelector(".in-voice")){var b=document.createElement("button");b.className="in-voice"+(S.voice.auto?" on":"");b.title=ru?"Голос Акси вкл/выкл":"Axi's voice on / off";b.innerHTML=ic(S.voice.auto?"speak":"vMute");
    b.onclick=function(e){e.stopPropagation();S.voice.auto=!S.voice.auto;saveS();b.classList.toggle("on",S.voice.auto);b.innerHTML=ic(S.voice.auto?"speak":"vMute");if(S.voice.auto){VG=true;introSpeak()}else axiHush()};top.insertBefore(b,sk)}
  clearTimeout(window._inT);window._inT=setTimeout(introSpeak,dir?300:160)};
function introSpeak(){var o=el("intro");if(!o||o.classList.contains("out"))return;var T=INTRO_T[IN.lang],s=T.s[IN.i],p=o.querySelector(".in-txt p"),ax=o.querySelector(".in-axi"),txt=s[2]||INTRO_SAY[IN.lang];
  axiAuto(txt,{axi:ax,bubble:s[2]?p:null,lang:IN.lang==="ru"?"ru":"en"});
  var hc=o.querySelector(".in-hear");
  if(!VG&&S.voice.auto&&S.voice.mode!=="silent"&&ax){if(!hc){ax.insertAdjacentHTML("beforeend",'<button class="in-hear">'+ic("speak")+(IN.lang==="ru"?"Нажми — и услышишь меня":"Tap to hear me")+'</button>');ax.querySelector(".in-hear").onclick=function(e){e.stopPropagation();VG=true;this.remove();introSpeak()}}}
  else if(hc)hc.remove()}
var _icT=introClose;introClose=function(skip){axiHush();_icT(skip)};

/* ---------- tour: Axi narrates every stop ---------- */
TOUR.splice(1,0,[".navmode","Simple shows just the essentials. Switch to Everything to see every feature AXIOM has."]);
TOUR.push(["#axiBuddy","And this is me! Tap me any time: I explain the page you're on, read lessons aloud and tell you what to do next. Shortcut: V."]);
var _tsT=tourStart;tourStart=function(i){_tsT(i);var ov=el("tour"),card=ov&&ov.querySelector(".tr-card");if(!card)return;
  if(!card.querySelector(".tr-axi"))card.insertAdjacentHTML("afterbegin",'<div class="tr-axi">'+AXI("happy",58,"")+'</div>');var p=card.querySelector("p");if(p)axiAuto(p.textContent,{axi:card,bubble:p})};

/* ---------- celebrations: Axi cheers out loud ---------- */
var _cnT=celNext;celNext=function(){_cnT();var o=[].slice.call(document.querySelectorAll(".celeb:not(.out)")).pop();if(!o||o._said)return;o._said=1;
  var k=(o.className.match(/c-(\w+)/)||[])[1],t="",wait=500;
  if(k==="lesson")t=L2("Lesson complete! Plus ten XP. Great job!","Урок пройден! Плюс десять очков. Отлично!");
  else if(k==="level"){var lv=(o.querySelector(".cel-lv b")||{}).textContent||level(),nw=o.querySelector(".cel-new");wait=800;
    t=L2("Level up! You're now level "+lv+"!"+(nw?" And look — I got a new look!":" I'm so proud of you."),"Новый уровень! Теперь у тебя уровень "+lv+"!"+(nw?" Смотри — у меня новый образ!":" Я тобой горжусь."))}
  else if(k==="unit"){var h=o.querySelector(".cel-txt h1");wait=1700;t=L2("Unit complete! You finished "+(h?h.textContent:"this unit")+". We jumped to the top together!","Раздел пройден! Ты закончил раздел «"+(h?h.textContent:"")+"». Мы вместе запрыгнули на вершину!")}
  else if(k==="quest"){wait=700;t=L2("All three quests done! Here's your treasure chest: thirty bonus XP!","Все три задания выполнены! Вот твой сундук: тридцать бонусных очков!")}
  if(t)setTimeout(function(){if(o.isConnected&&!o.classList.contains("out"))axiAuto(t,{axi:o})},wait)};

/* ---------- practice: streaks, encouragement, hints, explanations ---------- */
var _fqAxT=finishQ;finishQ=function(ok,it,ct){_fqAxT(ok,it,ct);
  var pop=[].slice.call(document.querySelectorAll(".axi-pop:not(.out)")).pop();
  if(ok&&pop&&!pop._said){pop._said=1;var n=parseInt((pop.querySelector("b")||{}).textContent,10)||0;axiAuto(L2(n+" in a row! Keep going!",n+" подряд! Так держать!"),{axi:pop})}
  var tip=document.querySelector("#exbox .axi-tip");
  if(tip&&!tip._v){tip._v=1;var sp=tip.querySelector("span");tip.classList.add("tap-hear");tip.title=L2("Tap to hear Axi","Нажми, чтобы услышать Акси");tip.insertAdjacentHTML("beforeend",'<span class="th-ic">'+ic("speak")+'</span>');
    tip.onclick=function(){VG=true;axiSay(sp.textContent,{axi:tip,bubble:sp})}}
  var ex=el("exbox"),e=ex&&ex.querySelector(".explain");
  if(e&&!ex.querySelector(".ax-explain"))e.insertAdjacentHTML("beforeend",'<div class="no-read"><button class="btn sm ghost ax-explain" onclick="axiExplain()">'+ic("speak")+L2("Explain it to me, Axi","Акси, объясни мне")+'</button></div>')};
function axiExplain(){var ex=el("exbox");if(!ex)return;if(RD){readerStop();return}var b=readBlocks(ex).filter(function(n){return !n.closest(".axi-tip")});readerStart(b.length?b:[ex],{label:L2("Axi explains","Акси объясняет")})}
var _shT=showHint;showHint=function(){_shT();var h=document.querySelector(".hintbox");if(!h||h._v)return;h._v=1;h.insertAdjacentHTML("afterbegin",'<span class="hb-axi">'+AXI("think",42,"")+'</span>');
  var txt=h.textContent.replace(/\s+/g," ").trim();axiAuto(txt,{axi:h})};

/* ---------- Today: Axi greets you and suggests the next step ---------- */
var AXI_IDEAS={en:["Fun fact: axolotls can regrow their legs, their heart and even parts of their brain. You can regrow forgotten formulas the same way — by reviewing.","Tip: when a question feels hard, write down what you know first. Half the answer is often already on the page.","Tip: underline exactly what the question asks. Many wrong answers come from solving for x when they wanted 2x.","Fun fact: the digital SAT gives you a graphing calculator for every maths question. Practise with ours so your fingers know it.","Tip: ten minutes of review today beats one hour of cramming next week.","Tip: if you are stuck for more than two minutes, mark the question and move on. Every question is worth the same.","Fun fact: zero was invented as a number more than one and a half thousand years ago, in India."],
  ru:["Интересный факт: аксолотли умеют отращивать лапы, сердце и даже часть мозга. Забытые формулы тоже можно «отрастить» — повторением.","Совет: если задача сложная, сначала запиши, что ты уже знаешь. Половина ответа часто уже на странице.","Совет: подчеркни, что именно спрашивают. Много ошибок — когда находят x, а нужно было 2x.","Интересный факт: на цифровом SAT есть графический калькулятор для каждой задачи. Тренируйся на нашем.","Совет: десять минут повторения сегодня лучше часа зубрёжки через неделю.","Совет: если застрял дольше двух минут — отметь задачу и иди дальше. Все задачи стоят одинаково.","Интересный факт: ноль как число придумали больше полутора тысяч лет назад в Индии."]};
function axiIdea(box){if(!box)return;var t=box.querySelector(".ag-t"),L=AXI_IDEAS[S.uiLang==="ru"?"ru":"en"],k=Math.floor(Math.random()*L.length);if(t&&t.textContent===L[k])k=(k+1)%L.length;VG=true;axiSay(L[k],{axi:box,bubble:t})}
axiPoke=function(box){if(!box)return;var s=box.querySelector(".axi");VG=true;if(TK&&TK.loud){axiHush();return}
  if(s){s.classList.remove("axi-jump");void s.getBoundingClientRect();s.classList.add("axi-jump")}var t=box.querySelector(".ag-t");axiSay(t?t.textContent:axiMessage(),{axi:box,bubble:t})};
var _vhT=viewHome;viewHome=function(a){_vhT(a);var g=a.querySelector(".axi-greet");if(!g||g._t)return;g._t=1;var b=g.querySelector(".axi-bubble");if(!b)return;
  var c=axiCoach(),sm=b.querySelector("small"),cap=sm?sm.outerHTML:"";
  b.innerHTML='<span class="ag-t">'+esc(c.say)+'</span><div class="ag-act">'+(c.btn?'<button class="btn sm pri" onclick="event.stopPropagation();'+c.go+'">'+ic(c.ic||"play")+esc(c.btn)+'</button>':'')+
   '<button class="btn sm ghost" onclick="event.stopPropagation();axiPoke(this.closest(\'.axi-greet\'))">'+ic("speak")+L2("Hear Axi","Послушать")+'</button><button class="btn sm ghost" onclick="event.stopPropagation();axiIdea(this.closest(\'.axi-greet\'))">'+ic("sparkles")+L2("Another idea","Ещё идея")+'</button></div>'+cap;
  setTimeout(function(){if(!g.isConnected||TK||RD)return;var t=g.querySelector(".ag-t"),loud=S.voice.auto&&VG&&S.voice.greet!==dayStr();if(loud){S.voice.greet=dayStr();saveS()}
    axiSay(t.textContent,{axi:g,bubble:t,mode:loud?undefined:"silent"})},650)};

/* ---------- settings: everything about Axi's voice ---------- */
function vSwRow(id,t,s,on){return '<div class="setrow"><div><b>'+t+'</b><small>'+s+'</small></div><button class="sw'+(on?" on":"")+'" id="'+id+'"><i></i></button></div>'}
function voiceMode(m){if(m==="voice"&&!window.speechSynthesis){toast(L2("This browser has no speech voice — try Chirps","В этом браузере нет голоса — выбери «Звуки»"));m="chirp"}S.voice.mode=m;saveS();
  document.querySelectorAll('[data-m]').forEach(function(b){if(b.closest(".vseg,.ap-voice"))b.classList.toggle("on",b.getAttribute("data-m")===m)});VG=true;axiHush();
  var where=document.querySelector(".modal.settings .vtest")||document.querySelector("#axiPanel .ap-axi")||document.querySelector("#axiBuddy");
  axiSay(m==="voice"?L2("This is my voice!","Это мой голос!"):m==="chirp"?L2("Chirp chirp! This is how axolotls talk.","Чирик-чирик! Так говорят аксолотли."):L2("I'll talk quietly — just watch my mouth.","Буду говорить тихо — смотри на мой рот."),{axi:where,bubble:document.querySelector(".modal.settings .vtest-t")||el("apSay")})}
function vFillVoices(){var L=vLoad();["en","ru"].forEach(function(lg){var s=el("vName_"+lg);if(!s)return;var c=L.filter(function(v){return (v.lang||"").toLowerCase().indexOf(lg)===0}),cur=lg==="ru"?S.voice.vnameRu:S.voice.vname;
  s.innerHTML='<option value="">'+L2("Automatic (best available)","Автоматически (лучший)")+'</option>'+c.map(function(v){return '<option value="'+esc(v.name)+'"'+(v.name===cur?" selected":"")+'>'+esc(v.name)+'</option>'}).join("");s.closest(".setrow").style.display=c.length?"":"none"})}
var _soT=settingsOpen;settingsOpen=function(){_soT();var set=document.querySelector(".modal.settings .set");if(!set||set.querySelector(".vset"))return;var v=S.voice,row=el("swAxi")&&el("swAxi").closest(".setrow");
  var h='<div class="vset"><div class="vtest">'+AXI("happy",62,"")+'<div><b>'+L2("Axi's voice","Голос Акси")+'</b><small class="vtest-t">'+L2("Choose how Axi talks, then press Hear Axi.","Выбери, как говорит Акси, и нажми «Послушать».")+'</small></div><button class="btn sm" onclick="axiTest()">'+ic("speak")+L2("Hear Axi","Послушать")+'</button></div>'+
   '<div class="setrow"><div><b>'+L2("How Axi talks","Как говорит Акси")+'</b><small>'+L2("Voice: real words · Chirps: cute sounds · Silent: mouth only","Голос — слова · Звуки — милые звуки · Тихо — только рот")+'</small></div><div class="vseg">'+[["voice",L2("Voice","Голос")],["chirp",L2("Chirps","Звуки")],["silent",L2("Silent","Тихо")]].map(function(x){return '<button data-m="'+x[0]+'" class="'+(v.mode===x[0]?"on":"")+'" onclick="voiceMode(\''+x[0]+'\')">'+x[1]+'</button>'}).join("")+'</div></div>'+
   (window.speechSynthesis?'<div class="setrow"><div><b>'+L2("English voice","Английский голос")+'</b><small>'+L2("Used for lessons and English","Для уроков и английского")+'</small></div><select id="vName_en" class="vsel"></select></div><div class="setrow"><div><b>'+L2("Russian voice","Русский голос")+'</b><small>'+L2("Used when the app is in Russian","Когда приложение на русском")+'</small></div><select id="vName_ru" class="vsel"></select></div>':'')+
   '<div class="setrow"><div><b>'+L2("Talking speed","Скорость речи")+'</b><small>'+L2("Lessons have their own speed button","У чтения уроков своя кнопка скорости")+'</small></div><input type="range" id="vRate" min="0.6" max="1.6" step="0.1" value="'+v.rate+'"></div>'+
   '<div class="setrow"><div><b>'+L2("Voice pitch","Высота голоса")+'</b><small>'+L2("Higher sounds more like a little axolotl","Выше — больше похоже на маленького аксолотля")+'</small></div><input type="range" id="vPitch" min="0.8" max="1.8" step="0.05" value="'+v.pitch+'"></div>'+
   vSwRow("vAuto",L2("Talk automatically","Говорить автоматически"),L2("In the intro, tour, page tips and celebrations","Во вступлении, туре, подсказках и праздниках"),v.auto)+
   vSwRow("vBuddy",L2("Ask-Axi button","Кнопка «Спроси Акси»"),L2("Little Axi in the corner who helps on every page","Маленький Акси в углу помогает на каждой странице"),v.buddy)+
   vSwRow("vTips",L2("Page tips","Подсказки страниц"),L2("Axi explains each page the first time you open it","Акси объясняет страницу при первом открытии"),v.tips)+
   '<div class="setrow"><div><b>'+L2("Page tips again","Подсказки заново")+'</b><small>'+L2("Show every page tip once more","Показать все подсказки ещё раз")+'</small></div><button class="btn sm" id="vTipsReset">'+ic("refresh")+L2("Reset","Сбросить")+'</button></div></div>';
  if(row)row.insertAdjacentHTML("afterend",h);else set.insertAdjacentHTML("afterbegin",h);
  vFillVoices();if(window.speechSynthesis){try{speechSynthesis.addEventListener("voiceschanged",vFillVoices,{once:true})}catch(e){}}
  ["en","ru"].forEach(function(lg){var s=el("vName_"+lg);if(s)s.onchange=function(){if(lg==="ru")S.voice.vnameRu=s.value;else S.voice.vname=s.value;saveS();VG=true;axiSay(lg==="ru"?"Привет! Я Аксилотти.":"Hi! I'm Axilotti.",{axi:document.querySelector(".vtest"),bubble:document.querySelector(".vtest-t"),lang:lg})}});
  el("vRate").onchange=function(){S.voice.rate=+this.value;saveS();axiTest()};el("vPitch").onchange=function(){S.voice.pitch=+this.value;saveS();axiTest()};
  [["vAuto","auto"],["vBuddy","buddy"],["vTips","tips"]].forEach(function(x){el(x[0]).onclick=function(){S.voice[x[1]]=!S.voice[x[1]];saveS();this.classList.toggle("on",S.voice[x[1]]);if(x[1]==="buddy"&&typeof buddyRender==="function")buddyRender();if(x[1]==="auto"&&!S.voice.auto)axiHush()}});
  el("vTipsReset").onclick=function(){S.seenPg={};saveS();toast(L2("Page tips will show again","Подсказки покажутся снова"))};trUI(set)};

(function(){var c=`
.in-top{gap:8px}.in-top .in-lang{margin-right:auto}.in-voice{width:34px;height:34px;border-radius:50%;border:1px solid var(--line);background:var(--soft);color:var(--ink2);display:grid;place-items:center;cursor:pointer}.in-voice.on{color:var(--violet);border-color:color-mix(in srgb,var(--violet) 50%,var(--line))}.in-voice .ic{width:17px;height:17px}
.in-axi{position:relative}.in-hear{position:absolute;left:50%;bottom:-6px;transform:translateX(-50%);display:inline-flex;align-items:center;gap:6px;white-space:nowrap;padding:6px 12px;border-radius:999px;border:0;background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;font:800 12.5px var(--ui);cursor:pointer;box-shadow:0 8px 20px color-mix(in srgb,var(--violet) 40%,transparent);animation:hearPulse 1.6s ease-in-out infinite}.in-hear .ic{width:15px;height:15px}
@keyframes hearPulse{50%{transform:translateX(-50%) scale(1.06)}}
.in-txt p.karaoke .kw.on,.tr-card p.karaoke .kw.on{background:color-mix(in srgb,var(--violet) 22%,transparent)}
.tr-card{display:grid;grid-template-columns:auto 1fr;column-gap:10px}.tr-card>*{grid-column:2}.tr-card .tr-axi{grid-column:1;grid-row:1 / span 3;margin-top:-4px}
.axi-tip.tap-hear{cursor:pointer}.axi-tip .th-ic{margin-left:auto;color:var(--violet);flex:none}.axi-tip .th-ic .ic{width:16px;height:16px}
.ax-explain{margin-top:8px;color:var(--violet)}
.hintbox .hb-axi{flex:none;margin:-8px 0 -8px -4px}
.axi-greet{align-items:flex-start}.axi-greet>.axi{margin-top:4px}.ag-t{display:block}.ag-act{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.ag-act .btn .ic{width:16px;height:16px}
.vset{margin:6px 0 4px;padding:10px 12px 4px;border-radius:16px;background:color-mix(in srgb,var(--violet) 7%,var(--paper));border:1px solid color-mix(in srgb,var(--violet) 25%,var(--line))}
.vtest{display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:1px solid var(--line)}.vtest>div{flex:1;min-width:0}.vtest small{display:block;color:var(--ink2);font-size:12.5px;line-height:1.45}
.vseg{display:inline-flex;padding:3px;border-radius:12px;background:var(--soft);gap:2px;flex:none}.vseg button{border:0;background:none;color:var(--ink2);font:700 12.5px var(--ui);padding:6px 10px;border-radius:9px;cursor:pointer}.vseg button.on{background:var(--paper);color:var(--violet);box-shadow:var(--sh)}
.vsel{max-width:190px;padding:7px 9px;border-radius:10px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font:600 13px var(--ui)}
.vset input[type=range]{accent-color:var(--violet);max-width:150px}
@media(max-width:560px){.axi-greet{gap:8px}.axi-greet>.axi{width:66px;height:66px}.ag-act{gap:5px}.ag-act .btn{min-height:32px;padding:0 10px;font-size:12.5px}.ag-act .btn .ic{width:14px;height:14px}.vset .setrow{flex-wrap:wrap}.vseg{width:100%}.vseg button{flex:1}.vsel{max-width:100%;width:100%}}
`;var st=document.createElement("style");st.textContent=c;document.head.appendChild(st)})();
Object.assign(RU,{"Hear Axi":"Послушать","Another idea":"Ещё идея","Explain it to me, Axi":"Акси, объясни мне"});
