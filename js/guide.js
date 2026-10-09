/* =====================================================================
   AXIOM — easy to use
   Ask-Axi buddy · next-step coach · "explain this page" + first-visit tips
   Simple / Everything menu · shortcuts V and R
   ===================================================================== */
if(!S.seenPg)S.seenPg={};

/* ---------- what should I do next? ---------- */
function axiCoach(){var done=0;UNITS.forEach(function(u){u.lessons.forEach(function(l){if(S.lessons[u.id+"/"+l.id])done++})});
  var nx=typeof nextLessonRef==="function"?nextLessonRef():nextLesson(),due=typeof dueCards==="function"?dueCards():0,mis=(S.mistakes||[]).length,diag=(S.diagHist||[]).length,lp=S.lpos||{},mid=null;
  for(var k in lp){if(lp[k]>0&&!S.lessons[k]){var p=k.split("/"),u=findUnit(p[0]),l=u&&u.lessons.filter(function(x){return x.id===p[1]})[0];if(l){mid={u:u,l:l,k:k};break}}}
  var nm=(S.profile&&S.profile.name)||"",hi=nm?L2("Hi "+nm+"! ","Привет, "+nm+"! "):"";
  if(!done&&!diag&&nx)return {say:hi+L2("Let's begin with Step 1 together — one short lesson. Or take the diagnostic test first so I can build your plan.","Давай начнём с шага 1 — один короткий урок. Или сначала пройди диагностику, и я составлю тебе план."),btn:L2("Start Step 1","Начать шаг 1"),go:"go('/lesson/"+nx.u.id+"/"+nx.l.id+"')",ic:"play"};
  if(mid)return {say:hi+L2("You stopped in the middle of “"+mid.l.t+"”. Let's finish it — it only takes a few minutes.","Ты остановился на середине урока «"+mid.l.t+"». Давай закончим — это займёт пару минут."),btn:L2("Continue the lesson","Продолжить урок"),go:"go('/lesson/"+mid.k+"')",ic:"play"};
  if(due>=5)return {say:hi+L2(due+" flashcards are ready to review. Doing them now is the fastest way to remember them for good.",due+" карточек ждут повторения. Повторить их сейчас — самый быстрый способ запомнить навсегда."),btn:L2("Review now","Повторить"),go:"go('/revise')",ic:"repeat"};
  if(mis>=5)return {say:hi+L2("You have "+mis+" saved mistakes. Fixing old mistakes is the quickest way to gain points.","У тебя "+mis+" сохранённых ошибок. Исправлять старые ошибки — самый быстрый способ набрать баллы."),btn:L2("Fix my mistakes","Исправить ошибки"),go:"go('/review')",ic:"refresh"};
  var w=typeof weakSkills==="function"?weakSkills(1)[0]:null;
  if(w&&w.a>=4&&w.acc!==null&&w.acc<0.6)return {say:hi+L2("Your weakest skill right now is “"+w.sk+"” — "+Math.round(w.acc*100)+"% correct. A short smart practice set will fix that.","Твой самый слабый навык сейчас — «"+w.sk+"», "+Math.round(w.acc*100)+"% верно. Короткая умная практика это исправит."),btn:L2("Smart practice","Умная практика"),go:"smartPractice()",ic:"target"};
  if(nx)return {say:hi+L2("Next up: “"+nx.l.t+"” in "+nx.u.title.replace(/ \(.*\)$/,"")+". One lesson a day keeps you moving toward 800.","Дальше: «"+nx.l.t+"» в разделе "+nx.u.title.replace(/ \(.*\)$/,"")+". Один урок в день — и ты идёшь к 800."),btn:L2("Start the lesson","Начать урок"),go:"go('/lesson/"+nx.u.id+"/"+nx.l.id+"')",ic:"play"};
  return {say:hi+L2("You've finished every lesson — amazing! Now take a full practice test to see your score.","Ты прошёл все уроки — невероятно! Теперь пройди полный пробный тест и узнай свой балл."),btn:L2("Practice test","Пробный тест"),go:"go('/mock')",ic:"timer"}}

/* ---------- what is this page? ---------- */
var PAGEHELP={
 "":["This is Today, your home page. At the top I suggest your next step. Below are your daily quests, your streak and quick links. Tap me any time you're unsure.","Это «Сегодня», твоя главная страница. Сверху я подсказываю следующий шаг. Ниже — задания дня, серия дней и быстрые ссылки. Нажимай на меня, если не уверен."],
 diagnostic:["The diagnostic test finds your level. Answer honestly — it's fine to skip what you don't know. Afterwards I'll show which topics to study first.","Диагностика определяет твой уровень. Отвечай честно — пропускать то, чего не знаешь, можно. Потом я покажу, что учить в первую очередь."],
 units:["This is the Course: steps from the basics to the hardest SAT topics. Go in order — each step builds on the one before. Tap a step to see its lessons.","Это Курс: шаги от основ до самых сложных тем SAT. Иди по порядку — каждый шаг опирается на предыдущий. Нажми на шаг, чтобы увидеть уроки."],
 unit:["This is one step of the course. Do the lessons in order, then practise, review the flashcards and take the unit quiz. Five crowns means you've mastered it.","Это один шаг курса. Пройди уроки по порядку, потом практика, карточки и тест раздела. Пять корон — тема освоена."],
 lesson:["This is a lesson, one page at a time. Press Continue or swipe to move on. 'Your turn' pages let you try a question. Press Read to me and I'll read it aloud.","Это урок, по одной странице. Нажимай «Далее» или листай. На страницах «Твоя очередь» можно решить задачу. Нажми «Читать», и я прочитаю урок вслух."],
 qb:["The Question Bank has thousands of SAT questions with full explanations. Filter by topic and difficulty, then open any question. Anything you miss goes to Review.","В Банке вопросов тысячи задач SAT с полными объяснениями. Выбери тему и сложность и открой любую задачу. Ошибки попадут в Повторение."],
 mock:["Practice Tests work like the real digital SAT: two timed modules. Your Module 1 result decides how hard Module 2 is. Try one every week or two.","Пробные тесты как настоящий цифровой SAT: два модуля на время. От первого модуля зависит сложность второго. Проходи раз в одну-две недели."],
 revise:["Review brings back flashcards and mistakes right before you'd forget them. Ten minutes a day here makes what you learned permanent.","Повторение возвращает карточки и ошибки прямо перед тем, как ты их забудешь. Десять минут в день — и знания остаются навсегда."],
 review:["Mistake review: every question you missed is saved here. Redo them until they feel easy — it's the fastest way to gain points.","Работа над ошибками: здесь все задачи, где ты ошибся. Решай их, пока не станет легко — это самый быстрый способ набрать баллы."],
 practice:["Practice: one question at a time. After each answer you see why it's right or wrong. Use Hint if you're stuck, or press Read to me.","Практика: по одной задаче. После ответа видно, почему он верный или нет. Если застрял — «Подсказка» или «Читать»."],
 quiz:["Unit quiz: score 80% or more to master this unit. After each answer I explain it, so mistakes become lessons.","Тест раздела: набери 80% или больше, чтобы освоить раздел. После каждого ответа я объясняю решение."],
 cards:["Flashcards: read the front, think of the answer, then flip. Be honest about whether you knew it — the cards you miss come back sooner.","Карточки: прочитай вопрос, вспомни ответ, переверни. Отвечай честно — забытые карточки вернутся раньше."],
 think:["The Reasoning Gym trains thinking, not just answers: find mistakes in solutions, choose the best method, explain and prove.","Тренажёр мышления учит думать, а не только отвечать: находить ошибки, выбирать метод, объяснять и доказывать."],
 mirror:["AXIOM Mirror is a picture of how you think, built from everything you do here. It gets sharper the more you study.","Зеркало AXIOM — портрет твоего мышления по всему, что ты делаешь. Чем больше учишься, тем он точнее."],
 map:["The Mathematical Map shows how ideas connect. Arrows point from the ideas each topic is built on, and colours show your level.","Математическая карта показывает связи между идеями. Стрелки идут от основ к темам, цвет показывает твой уровень."],
 museum:["The Museum of Mistakes turns your repeated mistakes into exhibits. Watch them fade as you fix them.","Музей ошибок превращает повторяющиеся ошибки в экспонаты. Смотри, как они исчезают, когда ты их исправляешь."],
 lab:["The Concept Lab lets you discover rules yourself: experiment with sliders, spot the pattern, then see why it must be true.","В Лаборатории ты сам открываешь правила: двигай ползунки, замечай закономерность и смотри, почему она верна."],
 create:["Create a Problem: design your own SAT question and I'll check that it works. Making questions is a great way to understand them.","Создай задачу: придумай свой вопрос SAT, а я проверю его. Составлять задачи — отличный способ их понять."],
 plan:["Your Study plan: set your test date and I'll spread the course over the weeks you have left.","Учебный план: укажи дату экзамена, и я распределю курс на оставшиеся недели."],
 journey:["Your Level journey: every 120 XP is a new level, and I get a new look at levels 5, 10, 15 and 25.","Путь по уровням: каждые 120 XP — новый уровень, а на уровнях 5, 10, 15 и 25 у меня новый образ."],
 progress:["Progress shows everything you've done: questions, accuracy, minutes studied and your estimated score over time.","Прогресс показывает всё: задачи, точность, минуты занятий и примерный балл со временем."],
 league:["The Device League compares everyone with an AXIOM account on this device. Friendly competition helps!","Лига устройства сравнивает всех, у кого есть аккаунт AXIOM на этом устройстве. Дружеское соревнование помогает!"],
 notes:["My notes keeps everything you wrote while studying. Add notes from any lesson with the pen button.","Мои заметки — всё, что ты записал во время учёбы. Добавляй заметки из любого урока кнопкой с ручкой."],
 drill:["Speed drill: 60 seconds of quick mental maths. Faster basics leave more time for the hard questions.","Скоростной тренажёр: 60 секунд устного счёта. Быстрые основы оставляют время на сложные задачи."],
 study:["The Study Room is a calm space with a focus timer and ambient sound. Set a goal and study without distractions.","Учебная комната — спокойное место с таймером и фоновым звуком. Поставь цель и занимайся без отвлечений."],
 formulas:["The Formula sheet has every formula you need on one page. Use the search box to find one fast.","Лист формул — все нужные формулы на одной странице. Ищи нужную через строку поиска."],
 words:["Math English: every maths word in this course with its Russian translation. Learn the words and SAT questions become easy to read.","Математический английский: все слова курса с переводом. Выучи слова — и задачи SAT станет легко читать."],
 glossary:["The Glossary explains every maths word in plain English. Search for any word you don't know.","Глоссарий объясняет каждое математическое слово простыми словами. Ищи любое незнакомое слово."],
 strategy:["Test strategy: pacing, guessing, the calculator and how to avoid careless mistakes on test day.","Стратегия: темп, угадывание, калькулятор и как не терять баллы из-за невнимательности."],
 daily:["The Daily challenge: five harder questions, the same for everyone today. Compare scores with a friend!","Задача дня: пять сложных вопросов, одинаковых для всех сегодня. Сравни результат с другом!"],
 sheet:["Worksheets: solve the questions on paper first, showing every step, then open the answers.","Рабочие листы: сначала реши на бумаге с каждым шагом, потом открой ответы."]};
PAGEHELP["review-run"]=PAGEHELP.practice;PAGEHELP.smart=PAGEHELP.practice;
function pageBase(h){var p=String(h===undefined?location.hash:h).replace(/^#\/?/,"").split("/").filter(Boolean);if(!p.length)return "";if(p[0]==="unit"&&p[1]==="words")return "words";return p[0]}
function pageHelp(){var x=PAGEHELP[pageBase()];return x?L2(x[0],x[1]):""}

/* ---------- the Ask-Axi buddy ---------- */
function buddyRender(){var b=el("axiBuddy"),show=S.voice.buddy&&!S.axiOff;
  if(!show){if(b&&!el("axiPanel"))b.remove();document.body.classList.remove("has-buddy");return}
  if(!b){b=document.createElement("div");b.id="axiBuddy";document.body.appendChild(b)}
  b.classList.remove("nobtn");if(!b.querySelector(".ab-btn"))b.insertAdjacentHTML("afterbegin",'<button class="ab-btn" aria-label="Ask Axi" title="'+L2("Ask Axi (V)","Спроси Акси (V)")+'" onclick="buddyToggle()">'+AXI("happy",58,"axi-bob")+'</button>');
  document.body.classList.add("has-buddy")}
function buddyHost(){var b=el("axiBuddy");if(!b){b=document.createElement("div");b.id="axiBuddy";b.className="nobtn";document.body.appendChild(b)}return b}
function buddyClose(){var p=el("axiPanel");if(p){p.remove();if(TK)axiHush()}var b=el("axiBuddy");if(b&&b.classList.contains("nobtn")&&!b.children.length)b.remove()}
function buddyToggle(){if(el("axiPanel")){buddyClose();return}tipClose();VG=true;var host=buddyHost(),help=pageHelp(),c=axiCoach(),acts=[];
  if(typeof LP!=="undefined"&&LP&&el("plStage"))acts.push(["speak",L2("Read this lesson to me","Прочитай мне урок"),"buddyClose();lessonRead()"]);
  if(typeof RUN!=="undefined"&&RUN&&document.querySelector(".q-card .q-q")){if(!RUN.answered&&document.getElementById("hintBtn"))acts.push(["bulb",L2("Give me a hint","Дай подсказку"),"buddyClose();showHint()"]);acts.push(["speak",L2("Read the question to me","Прочитай вопрос"),"buddyClose();readQuestion()"])}
  acts.push(["compass",L2("Show me around","Покажи, что где"),"buddyClose();tourStart(0)"],["search",L2("Find anything","Найти что угодно"),"buddyClose();searchOpen()"],["graph",L2("Graphing calculator","Графический калькулятор"),"buddyClose();graphOpen()"],["calc",L2("Calculator","Калькулятор"),"buddyClose();calcOpen()"],["sparkles",L2("Meet Axi again","Знакомство с Акси"),"buddyClose();introOpen()"],["settings",L2("Voice & settings","Голос и настройки"),"buddyClose();settingsOpen()"]);
  var p=document.createElement("div");p.id="axiPanel";p.setAttribute("role","dialog");p.setAttribute("aria-label","Ask Axi");
  p.innerHTML='<div class="ap-h"><div class="ap-axi">'+AXI("happy",66,"")+'</div><div class="ap-bub"><span class="ap-say" id="apSay">'+L2("Hi! How can I help?","Привет! Чем помочь?")+'</span></div><button class="ap-x" onclick="buddyClose()" title="'+L2("Close","Закрыть")+'">'+ic("x")+'</button></div><div class="ap-body">'+
   '<div class="ap-sec"><small>'+L2("My suggestion","Мой совет")+'</small><p>'+esc(c.say)+'</p><div class="row">'+(c.btn?'<button class="btn sm pri" onclick="buddyClose();'+c.go+'">'+ic(c.ic||"play")+esc(c.btn)+'</button>':'')+'<button class="btn sm ghost" onclick="buddySay(0)">'+ic("speak")+L2("Say it","Скажи вслух")+'</button></div></div>'+
   (help?'<div class="ap-sec"><small>'+L2("About this page","Об этой странице")+'</small><p>'+esc(help)+'</p><button class="btn sm ghost" onclick="buddySay(1)">'+ic("speak")+L2("Explain this page","Объясни страницу")+'</button></div>':'')+
   '<div class="ap-acts">'+acts.map(function(a){return '<button onclick="'+a[2]+'">'+ic(a[0])+'<span>'+a[1]+'</span></button>'}).join("")+'</div>'+
   '<div class="ap-voice"><span>'+L2("I talk with:","Я говорю:")+'</span><div class="vseg">'+[["voice",L2("Voice","Голос")],["chirp",L2("Chirps","Звуки")],["silent",L2("Silent","Тихо")]].map(function(x){return '<button data-m="'+x[0]+'" class="'+(S.voice.mode===x[0]?"on":"")+'" onclick="voiceMode(\''+x[0]+'\')">'+x[1]+'</button>'}).join("")+'</div></div></div>';
  host.appendChild(p);p._c=c;p._h=help;
  axiSay(el("apSay").textContent,{axi:p.querySelector(".ap-axi"),bubble:el("apSay"),mode:"silent"})}
function buddySay(which){var p=el("axiPanel");if(!p)return;VG=true;if(TK&&TK.loud&&TK.panel===which){axiHush();return}var t=axiSay(which?p._h:p._c.say,{axi:p.querySelector(".ap-axi"),bubble:el("apSay")});if(t)t.panel=which}
document.addEventListener("pointerdown",function(e){var p=el("axiPanel");if(p&&!e.target.closest("#axiBuddy"))buddyClose()},true);

/* ---------- first-visit page tips ---------- */
function tipClose(){var t=el("axiTip");if(t){t.remove();if(TK)axiHush()}}
function busyScreen(){return !!(el("intro")||el("tour")||el("gate")||el("axiPanel")||document.querySelector(".celeb,.modal,#splash:not(.out),#axiDock,#graph:not(.minimized),.calc:not(.minimized),#scratch"))}
function pageTip(tries){tries=tries||0;tipClose();if(!S.voice.tips||!S.voice.buddy||S.axiOff)return;var base=pageBase(),txt=pageHelp();if(!txt||S.seenPg[base])return;
  if(busyScreen()){if(tries<12)clearTimeout(window._ptT),window._ptT=setTimeout(function(){if(pageBase()===base)pageTip(tries+1)},1600);return}
  var host=el("axiBuddy");if(!host||!host.querySelector(".ab-btn"))return;S.seenPg[base]=1;saveS();
  var t=document.createElement("div");t.id="axiTip";t.setAttribute("role","status");
  t.innerHTML='<div class="at-t" id="atT">'+esc(txt)+'</div><div class="at-b"><button class="btn sm ghost" onclick="S.voice.tips=false;saveS();tipClose();toast(L2(\'Page tips are off — turn them on in Settings\',\'Подсказки выключены — включи их в настройках\'))">'+L2("No more tips","Больше не показывать")+'</button><button class="btn sm pri" onclick="tipClose()">'+L2("Got it","Понятно")+'</button></div>';
  host.appendChild(t);axiAuto(txt,{axi:host.querySelector(".ab-btn"),bubble:el("atT")})}
window.addEventListener("hashchange",function(){tipClose();buddyClose();clearTimeout(window._ptT);window._ptT=setTimeout(pageTip,900)});

/* ---------- Simple / Everything menu ---------- */
var SIMPLE_NAV=["/","/units","/diagnostic","/qb","/revise","/mock","/progress","/formulas"];
if(!S.ui.navMode){S.ui.navMode=(Object.keys(S.lessons||{}).length||S.xp>60)?"full":"simple";saveS()}
var _niG=navInit;navInit=function(){_niG();var sn=el("snav");if(!sn)return;var simple=S.ui.navMode==="simple";
  if(simple){var all=NAV.concat(NAV2),items=SIMPLE_NAV.map(function(p){return all.filter(function(x){return x[0]===p})[0]}).filter(Boolean),pins=sn.querySelector('.ngrp[data-g="pins"]'),ph=pins?pins.outerHTML:"";
    sn.innerHTML='<div class="ngrp" data-g="simple"><div class="ngrp-b">'+items.map(navLink).join("")+'</div></div>'+ph+'<button class="nav-more" onclick="navMode(\'full\')">'+ic("chevD")+'<span>'+L2("Show all features","Показать все разделы")+'</span></button>'}
  sn.insertAdjacentHTML("afterbegin",'<div class="navmode" role="group" aria-label="Menu size"><button class="'+(simple?"on":"")+'" onclick="navMode(\'simple\')">'+L2("Simple","Просто")+'</button><button class="'+(simple?"":"on")+'" onclick="navMode(\'full\')">'+L2("Everything","Всё")+'</button></div>');
  if(typeof markNav==="function")try{markNav(location.hash.replace(/^#/,"")||"/")}catch(e){}};
function navMode(m){if(S.ui.navMode===m)return;S.ui.navMode=m;saveS();navInit();try{sfx("tap")}catch(e){}toast(m==="simple"?L2("Simple menu — just the essentials","Простое меню — только главное"):L2("Full menu — every feature","Полное меню — все разделы"))}
navInit();

/* ---------- shortcuts, quick menu, command palette ---------- */
document.addEventListener("keydown",function(e){if(e.ctrlKey||e.metaKey||e.altKey)return;var tg=(e.target||{}).tagName||"";if(/INPUT|TEXTAREA|SELECT/.test(tg)||(e.target&&e.target.isContentEditable))return;if(el("intro")||el("tour")||document.querySelector(".modal"))return;
  if(e.key==="v"||e.key==="V"){e.preventDefault();buddyToggle()}
  else if(e.key==="r"||e.key==="R"){if(typeof LP!=="undefined"&&LP&&el("plStage")){e.preventDefault();lessonRead()}else if(document.querySelector(".q-card .q-q")){e.preventDefault();readQuestion()}}
  else if(e.key==="Escape"){buddyClose();tipClose()}});
var _qiG=quickItems;quickItems=function(){var l=_qiG();l.splice(0,0,["speak","Ask Axi","buddyToggle()","V"],["list",S.ui.navMode==="simple"?"Menu: show everything":"Menu: simple","navMode(S.ui.navMode===\'simple\'?\'full\':\'simple\')"]);return l};buildTop();
var _paG=paletteActions;paletteActions=function(){var l=_paG();l.splice(0,0,["speak","Ask Axi — what should I do next?",buddyToggle],["help","Explain this page",function(){buddyToggle();setTimeout(function(){buddySay(1)},200)}],["list","Menu: simple / everything",function(){navMode(S.ui.navMode==="simple"?"full":"simple")}]);return l};
var _scG=shortcutsOpen;shortcutsOpen=function(){_scG();var k=document.querySelector(".modal .kbl");if(k)k.insertAdjacentHTML("beforeend",'<div><kbd>V</kbd><span>'+L2("Ask Axi","Спроси Акси")+'</span></div><div><kbd>R</kbd><span>'+L2("Axi reads the lesson or question aloud","Акси читает урок или вопрос")+'</span></div><div><kbd>Esc</kbd><span>'+L2("Stop Axi talking","Остановить Акси")+'</span></div>')};

/* ---------- what's new ---------- */
AXV="2.2";
whatsNew=function(){if(el("intro"))return;S.seenVer=AXV;saveS();var L=[["speak",L2("Axi talks!","Акси говорит!"),L2("Real voice, cute chirps or silent — Axi's mouth moves as the words light up.","Голос, милые звуки или тишина — рот Акси двигается, а слова подсвечиваются.")],["bookOpen",L2("Read to me","Читать вслух"),L2("Axi reads lessons, questions and explanations aloud, maths included.","Акси читает уроки, вопросы и объяснения вслух, даже формулы.")],["help",L2("Ask Axi","Спроси Акси"),L2("Tap Axi in the corner: next step, page explanations, hints and tools.","Нажми на Акси в углу: следующий шаг, объяснение страницы, подсказки и инструменты.")],["list",L2("Simple menu","Простое меню"),L2("Just the essentials, or switch to Everything any time.","Только главное — или переключись на «Всё».")],["compass",L2("Page tips","Подсказки страниц"),L2("The first time you open a page, Axi explains what it's for.","При первом открытии страницы Акси объясняет, для чего она.")]];
  var m=modal('<div style="text-align:center">'+AXI("cheer",90,"axi-jump")+'</div><h2>'+L2("What’s new in AXIOM ","Что нового в AXIOM ")+AXV+'</h2><div class="wn">'+L.map(function(x){return '<div class="wn-i"><span class="qa-ic">'+ic(x[0])+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join("")+'</div><button class="btn pri block" data-close>'+L2("Let’s go","Поехали")+'</button>',"gs");trUI(m);
  setTimeout(function(){var mb=document.querySelector(".modal.gs");if(mb)axiAuto(L2("Guess what? I can talk now! Tap me in the corner whenever you need help.","Угадай что? Теперь я умею говорить! Нажимай на меня в углу, когда нужна помощь."),{axi:mb})},400)};

/* ---------- start ---------- */
buddyRender();setTimeout(pageTip,2600);
var _setLangG=setLang;setLang=function(l){_setLangG(l);var b=el("axiBuddy");if(b){var bt=b.querySelector(".ab-btn");if(bt)bt.title=L2("Ask Axi (V)","Спроси Акси (V)")}};

(function(){var c=`
#axiBuddy{position:fixed;right:18px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:118;display:flex;flex-direction:column;align-items:flex-end}
#axiBuddy.nobtn{width:0;height:0}
.ab-btn{width:66px;height:66px;border-radius:50%;border:1px solid color-mix(in srgb,var(--violet) 40%,var(--line));background:radial-gradient(circle at 50% 35%,color-mix(in srgb,#ffc4dc 30%,var(--paper)),var(--paper));box-shadow:0 12px 30px rgba(0,0,0,.28);display:grid;place-items:center;cursor:pointer;padding:0;overflow:visible;transition:transform .15s}
.ab-btn:hover{transform:translateY(-3px) scale(1.04)}.ab-btn .axi{margin-top:-6px}
body.reading #axiBuddy .ab-btn,body.focus #axiBuddy .ab-btn,body:has(#graph:not(.minimized)) #axiBuddy .ab-btn,body:has(.calc.floatwin:not(.minimized)) #axiBuddy .ab-btn{display:none}
body:has(.player) #axiBuddy{bottom:calc(84px + env(safe-area-inset-bottom,0px))}body.drawer-open #axiBuddy,body:has(#intro) #axiBuddy{display:none}
body.has-buddy .pomo{right:96px}body.has-buddy #app.view{padding-bottom:120px}body.reading #axiTip,body:has(#graph:not(.minimized)) #axiTip,body:has(.calc:not(.minimized)) #axiTip{display:none}
#axiPanel{position:absolute;right:0;bottom:76px;width:min(370px,calc(100vw - 20px));max-height:min(620px,calc(100vh - 120px));max-height:min(620px,calc(100dvh - 120px));display:flex;flex-direction:column;border-radius:22px;background:var(--paper);border:1px solid var(--line);box-shadow:0 26px 70px rgba(0,0,0,.45);animation:apIn .3s cubic-bezier(.3,1.3,.5,1) both;transform-origin:bottom right;overflow:hidden}
#axiBuddy.nobtn #axiPanel,body.reading #axiPanel,body:has(#graph:not(.minimized)) #axiPanel{bottom:0}
@keyframes apIn{from{opacity:0;transform:scale(.9) translateY(10px)}}
.ap-h{display:flex;align-items:flex-start;gap:8px;padding:12px 12px 10px;background:linear-gradient(135deg,color-mix(in srgb,var(--violet) 18%,var(--paper)),color-mix(in srgb,#ff9ec7 14%,var(--paper)));border-bottom:1px solid var(--line)}
.ap-axi{flex:none;margin:-4px 0 -10px}.ap-bub{flex:1;min-width:0;align-self:center;padding:9px 12px;border-radius:14px;background:var(--paper);border:1px solid var(--line);font-size:14px;line-height:1.45;font-weight:600}
.ap-x{flex:none;width:30px;height:30px;border-radius:10px;border:0;background:transparent;color:var(--ink2);display:grid;place-items:center;cursor:pointer}
.ap-body{overflow-y:auto;padding:4px 12px 12px;overscroll-behavior:contain}
.ap-sec{padding:10px 2px;border-bottom:1px solid var(--line)}.ap-sec small{display:block;font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--violet)}.ap-sec p{margin:4px 0 8px;font-size:14px;line-height:1.5;color:var(--ink)}.ap-sec .row{gap:6px}
.ap-acts{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:10px 0}.ap-acts button{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:12px;border:1px solid var(--line);background:var(--soft);color:var(--ink);font:600 13px var(--ui);text-align:left;cursor:pointer}.ap-acts button:hover{border-color:color-mix(in srgb,var(--violet) 50%,var(--line))}.ap-acts .ic{width:17px;height:17px;color:var(--violet);flex:none}
.ap-voice{display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:4px;font-size:12.5px;color:var(--ink2);font-weight:700}
#axiTip{position:absolute;right:0;bottom:78px;width:min(320px,calc(100vw - 24px));padding:12px 14px;border-radius:18px 18px 6px 18px;background:var(--paper);border:1px solid color-mix(in srgb,var(--violet) 40%,var(--line));box-shadow:0 18px 50px rgba(0,0,0,.35);animation:apIn .35s cubic-bezier(.3,1.3,.5,1) both;transform-origin:bottom right}
.at-t{font-size:14px;line-height:1.5}.at-b{display:flex;justify-content:flex-end;gap:6px;margin-top:10px}
.navmode{display:flex;gap:2px;padding:3px;margin:0 4px 8px;border-radius:12px;background:var(--soft);border:1px solid var(--line)}.navmode button{flex:1;border:0;background:none;color:var(--ink2);font:700 12.5px var(--ui);padding:6px 8px;border-radius:9px;cursor:pointer}.navmode button.on{background:var(--paper);color:var(--ink);box-shadow:var(--sh)}
body.side-mini .navmode,body.side-mini .nav-more span{display:none}
.nav-more{display:flex;align-items:center;gap:10px;width:100%;margin-top:6px;padding:9px 12px;border-radius:12px;border:1px dashed var(--line);background:none;color:var(--ink2);font:600 13.5px var(--ui);cursor:pointer}.nav-more:hover{color:var(--ink);border-color:var(--violet)}
@media(max-width:900px){body.has-buddy #app.view{padding-bottom:calc(160px + env(safe-area-inset-bottom,0px))}#axiBuddy{right:10px;bottom:calc(78px + env(safe-area-inset-bottom,0px))}.ab-btn{width:54px;height:54px}.ab-btn .axi{width:48px;height:48px}#axiPanel{bottom:64px}#axiTip{bottom:64px}body:has(.player) #axiBuddy{bottom:calc(80px + env(safe-area-inset-bottom,0px))}}
@media(max-width:560px){.ap-acts{grid-template-columns:1fr 1fr}.ap-voice{flex-wrap:wrap}}
`;var st=document.createElement("style");st.textContent=c;document.head.appendChild(st)})();
Object.assign(RU,{"Ask Axi":"Спроси Акси","Menu: simple":"Меню: простое","Menu: show everything":"Меню: показать всё","Explain this page":"Объясни страницу","Ask Axi — what should I do next?":"Спроси Акси — что делать дальше?","Menu: simple / everything":"Меню: простое / всё"});
