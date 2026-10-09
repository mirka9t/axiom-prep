/* =====================================================================
   ZERO TO 800 — UX LAYER
   language (EN / RU interface) · tap-to-translate · simpler navigation
   help guide · ordered course path · PDF export · local accounts
   ===================================================================== */
ICONS.download="M12 3v12 M7 10l5 5 5-5 M5 21h14";
ICONS.help="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9.5 9.2a2.6 2.6 0 1 1 3.7 2.4c-.8.4-1.2 1-1.2 1.9 M12 17h.01";
ICONS.mail="M3 5h18v14H3z M3 6l9 7 9-7";ICONS.lock="M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3";ICONS.cloud="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z";

/* ---------- clean English titles ---------- */
(function(){var t={gcf:"GCF & LCM",pct:"Percentages",words:"Math English"};for(var k in t){var u=findUnit(k);if(u)u.title=t[k]}
  var g=findUnit("gcf");if(g)g.lessons.forEach(function(l){l.t=l.t.replace("GCF — НОД:","GCF:").replace("LCM — НОК:","LCM:")});})();

/* ---------- settings migration ---------- */
if(!S.uiLang)S.uiLang="en";
if(!S.trMode)S.trMode="tap";
S.ruOn=S.trMode==="brackets";

/* ---------- tap-to-translate (replaces the bracket glosses) ---------- */
var _glossBrackets=glossify;
glossify=function(root){
  if(!root)return;var mode=S.trMode;if(mode==="off")return;if(mode==="brackets"){S.ruOn=true;return _glossBrackets(root)}
  var boxes=root.matches&&root.matches(GLOSS_IN)?[root]:[].slice.call(root.querySelectorAll(GLOSS_IN));if(!boxes.length)return;
  var seen={};[].forEach.call(root.querySelectorAll(".tt"),function(s){seen[s.getAttribute("data-t")]=1});
  boxes.forEach(function(box){if(box.closest(".no-gloss"))return;
    DICT.forEach(function(d){if(seen[d.en])return;var w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT,null),n;
      while((n=w.nextNode())){var pe=n.parentElement;if(!pe||pe.closest(GLOSS_SKIP+",.tt"))continue;var m=d.re.exec(n.nodeValue);if(!m)continue;
        var st=m.index+m[1].length,mid=n.splitText(st),after=mid.splitText(m[2].length),sp=document.createElement("span");sp.className="tt";sp.setAttribute("data-t",d.en);sp.setAttribute("data-ru",d.ru);
        mid.parentNode.insertBefore(sp,mid);sp.appendChild(mid);seen[d.en]=1;break}})});
};
(function(){var tip=document.createElement("div");tip.id="ttip";document.body.appendChild(tip);var cur=null;
  function show(t){var r=t.getBoundingClientRect();tip.innerHTML='<b>'+esc(t.textContent)+'</b><span>'+esc(t.getAttribute("data-ru"))+'</span>';tip.classList.add("on");
    var x=Math.min(window.innerWidth-tip.offsetWidth-10,Math.max(10,r.left+r.width/2-tip.offsetWidth/2)),y=r.top-tip.offsetHeight-8;if(y<8)y=r.bottom+8;tip.style.left=x+"px";tip.style.top=y+"px";cur=t}
  function hide(){tip.classList.remove("on");cur=null}
  document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest(".tt");if(t){e.stopPropagation();if(cur===t)hide();else show(t)}else hide()},true);
  document.addEventListener("mouseover",function(e){var t=e.target.closest&&e.target.closest(".tt");if(t&&window.matchMedia&&window.matchMedia("(hover:hover)").matches)show(t)});
  document.addEventListener("mouseout",function(e){var t=e.target.closest&&e.target.closest(".tt");if(t&&window.matchMedia&&window.matchMedia("(hover:hover)").matches)hide()});
  document.addEventListener("scroll",hide,true);})();


/* extra vocabulary for the new lessons */
(function(){[["opposite numbers","противоположные числа"],["proper fraction","правильная дробь"],["inverse operation","обратное действие"],["factorial","факториал"],["permutation","перестановка (размещение)"],["combination","сочетание"],["rotation","поворот"],["dilation","растяжение (гомотетия)"],["translation","параллельный перенос"],["multiplicity","кратность корня"],["end behavior","поведение графика на концах"],["parent function","базовая функция"],["rationalize","избавиться от корня в знаменателе"],["conjugate","сопряжённое выражение"],["place value","разряд"],["decimal point","десятичная запятая"],["borrow","занять (единицу)"],["dependent","зависимый"],["identity","тождество"],["pie chart","круговая диаграмма"],["bar chart","столбчатая диаграмма"],["line graph","линейный график"],["solid","объёмная фигура (тело)"],["hemisphere","полушар"],["displacement","вытеснение"]].forEach(function(p){if(DICT.some(function(d){return d.en===p[0]}))return;var d={en:p[0],ru:p[1],cat:"More"};d.re=new RegExp("(^|[^A-Za-z-])("+p[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?:s|es)?)(?![A-Za-z])","i");DICT.push(d)});DICT.sort(function(a,b){return b.en.length-a.en.length})})();

/* ---------- interface language: English / Русский ---------- */
var RU={"Today":"Сегодня","Course":"Курс","Learn":"Курс","Question Bank":"Банк вопросов","Practice Tests":"Пробные тесты","Review":"Повторение","Study Room":"Комната учёбы","Progress":"Прогресс","Library":"Библиотека","Formula sheet":"Формулы","Test strategy":"Стратегия теста","Glossary":"Словарь","Math English":"Английский для математики","Worksheets":"Рабочие листы","Worksheet":"Рабочий лист","Daily challenge":"Задание дня","More":"Ещё","Bank":"Банк","Tests":"Тесты","Settings":"Настройки","Help":"Помощь","Sign in":"Войти","Sign out":"Выйти","Create account":"Создать аккаунт","Account":"Аккаунт",
"Continue learning":"Продолжить обучение","Today's plan":"План на сегодня","Jump in":"Быстрый старт","Your SAT map":"Карта SAT","questions today":"вопросов сегодня","study streak":"дней подряд","estimated score":"примерный балл","until your SAT":"до экзамена SAT","Remember forever":"Запомнить навсегда","Smart flashcards":"Умные карточки","Fix your mistakes":"Исправь ошибки","Course complete":"Курс пройден","Set date":"Указать дату",
"Lessons & subtopics":"Уроки и подтемы","Practice & review":"Практика и повторение","Continue":"Продолжить","Start unit":"Начать раздел","Practice":"Практика","Endless practice":"Бесконечная практика","New numbers every time":"Каждый раз новые числа","Easy":"Лёгкий","Medium":"Средний","Hard":"Сложный","Unit quiz":"Тест по разделу","Fresh quiz":"Новый тест","Guided practice":"Практика с разбором","Flashcards":"Карточки","Take the unit quiz":"Пройти тест по разделу","complete":"пройдено","PDF notes":"Конспект PDF","mastery":"мастерство",
"Start":"Начать","Back":"Назад","Complete lesson":"Завершить урок","Concept":"Понятие","Worked example":"Разбор примера","Check yourself":"Проверь себя","Your turn":"Твоя очередь","Key words":"Ключевые слова","Recap":"Итог","What to remember":"Что запомнить","Formulas & rules":"Формулы и правила","Key ideas":"Главные идеи","Watch out for":"Осторожно","In this lesson you will learn":"В этом уроке ты узнаешь","Lesson complete":"Урок пройден","Back to unit":"К разделу","Practice now":"Практиковаться","Words to know from this lesson":"Слова из этого урока","Back to page view":"Обратно к страницам",
"Check":"Проверить","Check answer":"Проверить ответ","Show answer":"Показать ответ","Show me":"Покажи ответ","Next question →":"Следующий вопрос →","See results →":"Результаты →","Try it yourself":"Попробуй сам","Previous":"Назад","Next":"Далее","All questions":"Все вопросы","Rationale":"Объяснение","How to solve questions like this":"Как решать такие вопросы","Correct":"Верно","Incorrect":"Неверно","Answer":"Ответ","Try it again":"Попробовать снова","Practice in order":"Решать по порядку","Random":"Случайный","Filters":"Фильтры","Domains & skills":"Разделы и навыки","Difficulty":"Сложность","Status":"Статус","Question type":"Тип вопроса","All":"Все","Unanswered":"Без ответа","Bookmarked":"В закладках","Marked for review":"Отмечено","Multiple choice":"С вариантами","Student-produced response":"Свой ответ","Reset filters":"Сбросить фильтры","Formula / rule":"Формула / правило","The method, step by step":"Метод по шагам","The mistake most students make":"Частая ошибка","Show the full method & formula":"Показать метод и формулу","Finish & see results":"Закончить и увидеть результат",
"Study calendar · 15 weeks":"Календарь занятий · 15 недель","Score estimate":"Оценка балла","Mastery crowns":"Короны мастерства","Edit details":"Изменить данные","Badges":"Значки",
"Appearance":"Оформление","Evening":"Вечер","Daily goal":"Цель на день","Ambient sound":"Фоновый звук","Your details":"Твои данные","Backup & reset":"Копия и сброс","Edit":"Изменить","Open":"Открыть","Sound effects":"Звуковые эффекты","Rain":"Дождь","Deep":"Шум","Fire":"Камин","Off":"Выкл","Language":"Язык","Interface language":"Язык интерфейса","Translation help":"Помощь с переводом","Tap words":"Нажатием","Brackets":"В скобках","Close":"Закрыть","Got it":"Понятно","How to use this app":"Как пользоваться приложением",
"Mistake review":"Работа над ошибками","Practice builder":"Конструктор практики","Calculator":"Калькулятор","Reference sheet":"Справочный лист",
"Algebra":"Алгебра","Advanced Math":"Продвинутая математика","Problem-Solving & Data":"Решение задач и данные","Geometry & Trigonometry":"Геометрия и тригонометрия","Strategy & the 800 zone":"Стратегия и зона 800",
"Numbers & the basics":"Числа и основы","Fractions, decimals & percents":"Дроби, десятичные и проценты","Ratios, rates & proportions":"Отношения, скорости и пропорции","Algebra: expressions & equations":"Алгебра: выражения и уравнения","Inequalities & absolute value":"Неравенства и модуль","Lines & slope":"Прямые и наклон","Systems of equations":"Системы уравнений","Exponents, roots & scientific notation":"Степени, корни и стандартный вид","Polynomials & quadratics":"Многочлены и квадратные уравнения","Functions & graphs":"Функции и графики","Advanced math extras":"Дополнительные темы","Data & statistics":"Данные и статистика","Probability & counting":"Вероятность и комбинаторика","Geometry: angles & triangles":"Геометрия: углы и треугольники","Geometry: circles, area & volume":"Геометрия: круги, площадь и объём","Trigonometry":"Тригонометрия","Word problems masterclass":"Текстовые задачи","Desmos superpowers":"Возможности Desmos","The 800 zone: hardest question patterns":"Зона 800: самые сложные задачи","GCF & LCM":"НОД и НОК","Percentages":"Проценты","Algebraic expressions & factoring":"Выражения и разложение на множители","Geometry foundations":"Основы геометрии",
"Step":"Шаг","Next up":"Следующий","You are here":"Ты здесь","New here? Start here":"Впервые здесь? Начни отсюда"};
var RU_RX=[[/^(\d+) lessons · (\d+) subtopics$/,"$1 уроков · $2 подтем"],[/^(\d+) min$/,"$1 мин"],[/^(\d+) pages$/,"$1 страниц"],[/^Lesson (\d+) of (\d+) · (.*)$/,"Урок $1 из $2 · $3"],[/^(\d+) lessons$/,"$1 уроков"],[/^Step (\d+)$/,"Шаг $1"],[/^(\d+) questions?$/,"$1 вопросов"]];
var NO_TR=".lesson,.pg.lesson,.q-q,.opt,.explain,.rat-b,.deep,.fbox,.ws-ex,figure,svg,.gl,.prose,.bqq,.bqc,.face,.qc,.terms,.vocab-t,input,textarea,script,style,.tt,#printArea,.rch,.cv-list,.t-quote,.st-q,.pn-sub,.cv-i,#ttip";
function trUI(root){if(S.uiLang!=="ru"||!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,todo=[];
  while((n=w.nextNode())){var t=n.nodeValue.trim();if(!t||t.length>70)continue;var pe=n.parentElement;if(!pe||pe.closest(NO_TR))continue;
    var r=RU[t];if(!r){for(var i=0;i<RU_RX.length;i++)if(RU_RX[i][0].test(t)){r=t.replace(RU_RX[i][0],RU_RX[i][1]);break}}if(r&&r!==t)todo.push([n,t,r])}
  todo.forEach(function(x){x[0].nodeValue=x[0].nodeValue.replace(x[1],x[2])});}
fastObserve(function(n){trUI(n)},false,function(){return S.uiLang==="ru"});
function setLang(l){S.uiLang=l;saveS();if(typeof renderAcct==="function")renderAcct();document.documentElement.lang=l==="ru"?"ru":"en";navInit();var rb=el("ruBtn");if(rb)rb.innerHTML=ic("globe")+"<span>"+(l==="ru"?"RU":"EN")+"</span>";router();if(l==="ru")setTimeout(function(){trUI(document.body)},30)}
function setTr(m){S.trMode=m;S.ruOn=m==="brackets";saveS();router()}

/* ---------- simpler navigation ---------- */
NAV=[["/","Today","home"],["/units","Course","bookOpen"],["/qb","Question Bank","database"],["/mock","Practice Tests","timer"],["/revise","Review","repeat"],["/progress","Progress","trendUp"]];
NAV2=[["/study","Study Room","lamp"],["/formulas","Formula sheet","sigma"],["/unit/words","Math English","lang"],["/glossary","Glossary","type"],["/strategy","Test strategy","compass"],["/daily","Daily challenge","zap"],["/sheet/all","Worksheets","fileText"]];
TABS=[["/","Today","home"],["/units","Course","bookOpen"],["/qb","Bank","database"],["/mock","Tests","timer"],["more","More","grid"]];
TITLES.units="Course";
(function(){
  var tb=el("tbTools");if(tb){tb.insertAdjacentHTML("afterbegin",'<button class="tb-btn" id="helpBtn" title="How to use this app" onclick="helpOpen()">'+ic("help")+'</button>')}
  var rb=el("ruBtn");if(rb){var nb=rb.cloneNode(false);nb.id="ruBtn";nb.className="tb-btn rubtn on";nb.title="Interface language";rb.parentNode.replaceChild(nb,rb);nb.innerHTML=ic("globe")+"<span>"+(S.uiLang==="ru"?"RU":"EN")+"</span>";nb.onclick=function(){setLang(S.uiLang==="ru"?"en":"ru")}}
  var sf=document.querySelector(".side-foot");if(sf)sf.insertAdjacentHTML("beforeend",'<div id="acct" class="acct"></div>');
  navInit();
})();
var _moreSheetU=moreSheet;moreSheet=function(){_moreSheetU();var ms=document.querySelector(".msheet");if(ms)ms.insertAdjacentHTML("beforeend",'<a href="javascript:void 0" onclick="this.closest(\'.modal\').remove();authOpen()">'+ic("user")+'<span>Account</span></a><a href="javascript:void 0" onclick="this.closest(\'.modal\').remove();helpOpen()">'+ic("help")+'<span>Help</span></a>')};

/* ---------- help guide ---------- */
function helpOpen(){var ru=S.uiLang==="ru";
  var steps=ru?[["bookOpen","1. Учи урок","Открой «Курс» и иди по шагам по порядку. Урок — это страницы: читай, листай кнопкой «Продолжить», отвечай на «Проверь себя»."],["pen","2. Практикуйся","В конце урока нажми «Практиковаться». Неправильные ответы сохраняются автоматически, с полным объяснением."],["repeat","3. Повторяй","Во вкладке «Повторение»: работа над ошибками, карточки и «Запомнить навсегда» — по несколько минут каждый день."],["timer","4. Проверь себя","Раз в неделю проходи пробный тест в «Пробных тестах», чтобы увидеть свой примерный балл."]]:
   [["bookOpen","1. Learn a lesson","Open Course and follow the steps in order. A lesson is a set of pages: read, tap Continue, and answer the “Check yourself” pages."],["pen","2. Practice it","At the end of a lesson tap “Practice now”. Wrong answers are saved automatically, with a full explanation."],["repeat","3. Review","In Review: fix your mistakes, do flashcards and “Remember forever” — a few minutes every day."],["timer","4. Test yourself","Once a week take a Practice Test to see your estimated score."]];
  var m=modal('<h2>'+(ru?"Как пользоваться приложением":"How to use this app")+'</h2><p class="muted">'+(ru?"Всё приложение — это четыре простых шага, повторяемых каждый день.":"The whole app is four simple steps, repeated every day.")+'</p><div class="hsteps">'+steps.map(function(s){return '<div class="hstep"><span class="hs-ic">'+ic(s[0])+'</span><div><b>'+s[1]+'</b><small>'+s[2]+'</small></div></div>'}).join("")+'</div>'+
   '<div class="htips"><div>'+ic("globe")+(ru?" Кнопка EN/RU вверху переключает язык. Слова с пунктиром — нажми, чтобы увидеть перевод.":" The EN/RU button at the top switches the language. Words with a dotted underline — tap them for the Russian translation.")+'</div><div>'+ic("download")+(ru?" Кнопка загрузки сохраняет урок, раздел или лист в PDF.":" The download button saves a lesson, unit or worksheet as a PDF.")+'</div><div>'+ic("help")+(ru?" Эта подсказка всегда доступна по кнопке «?».":" This guide is always one tap away on the “?” button.")+'</div></div>'+
   '<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn pri" data-close>'+(ru?"Понятно":"Got it")+'</button></div>',"help");
  S.seenHelp=1;saveS();}

/* ---------- Course: one clear ordered path ---------- */
viewUnits=function(a){
  var curId=null;for(var i=0;i<UNITS.length;i++){if(unitPct(UNITS[i])<100){curId=UNITS[i].id;break}}
  a.innerHTML='<section class="learn"><div class="pg-h"><div><h1>Course</h1><p>'+UNITS.length+' steps · '+lessonsTotal()+' lessons. Go in order from Step 1 — each step builds on the one before. Tap a step to see its lessons.</p></div><div class="srch">'+ic("search")+'<input id="lsearch" placeholder="Find a topic: fractions, equations, circles…"></div></div><div class="cpath" id="cpath"></div></section>';
  function draw(q){q=(q||"").toLowerCase();el("cpath").innerHTML=UNITS.map(function(u,i){
    var hay=(u.title+" "+u.tag+" "+u.lessons.map(function(l){return l.t+" "+subtopics(l).join(" ")}).join(" ")).toLowerCase();if(q&&hay.indexOf(q)<0)return "";
    var pc=unitPct(u),D=domainOf(u.id),cur=u.id===curId;
    return '<a class="cstep'+(pc>=100?" done":"")+(cur?" cur":"")+'" href="#/unit/'+u.id+'" style="--uc:'+u.color+'"><span class="cs-n">'+(pc>=100?ic("check"):(i+1))+'</span>'+uic(u)+'<div class="cs-m"><div class="cs-top"><b>'+esc(u.title)+'</b>'+(cur?'<span class="cs-cur">'+(lessonsDone()?"You are here":"New here? Start here")+'</span>':'')+'</div><small>'+esc(D.name)+' · '+u.lessons.length+' lessons</small><div class="pbar"><i style="width:'+pc+'%"></i></div></div>'+crownBadge(crowns(u))+ic("chevR","cs-go")+'</a>'}).join("")||'<div class="empty">Nothing matches. Try another word.</div>'}
  draw();el("lsearch").oninput=function(){draw(this.value)};
};

/* ---------- Today: simple first steps for new learners ---------- */
var _vhU=viewHome;viewHome=function(a){_vhU(a);
  if(!lessonsDone()){var th=a.querySelector(".t-head");if(th)th.insertAdjacentHTML("afterend",'<div class="card startcard"><span class="sc-ic">'+ic("sparkles")+'</span><div><b>New here? Start here</b><p>Step 1 is “Numbers & the basics”. Open it, read the first lesson page by page, then practice. That is the whole method.</p></div><div class="row"><button class="btn pri" onclick="go(\'/unit/nums\')">'+ic("play")+'Start Step 1</button><button class="btn ghost" onclick="helpOpen()">'+ic("help")+'How it works</button></div></div>')}
  if(S.profile&&!S.seenHelp&&!document.querySelector(".modal"))setTimeout(helpOpen,700);
};

/* ---------- settings: language + translation + account ---------- */
var _soU=settingsOpen;settingsOpen=function(){_soU();var sw=el("swRu"),row=sw&&sw.closest(".setrow"),ru=S.uiLang==="ru";
  var html='<div class="setrow"><div><b>Interface language</b><small>Menus, buttons and titles</small></div><div class="seg"><button class="'+(!ru?"on":"")+'" data-l="en">English</button><button class="'+(ru?"on":"")+'" data-l="ru">Русский</button></div></div>'+
   '<div class="setrow"><div><b>Translation help</b><small>Russian for difficult words in lessons</small></div><div class="seg">'+[["tap","Tap words"],["brackets","Brackets"],["off","Off"]].map(function(x){return '<button class="'+(S.trMode===x[0]?"on":"")+'" data-tr="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div></div>'+
   '<div class="setrow"><div><b>Account</b><small>'+(AUTH.user?"@"+esc(AUTH.user.id)+" · on this device":"You are using the app as a guest")+'</small></div><button class="btn sm" onclick="this.closest(\'.modal\').remove();authOpen()">'+(AUTH.user?"Open":"Sign in / Create")+'</button></div>';
  if(row)row.outerHTML=html;
  var m=document.querySelector(".modal.settings");if(!m)return;
  m.querySelectorAll("[data-l]").forEach(function(b){b.onclick=function(){m.remove();setLang(b.getAttribute("data-l"));settingsOpen()}});
  m.querySelectorAll("[data-tr]").forEach(function(b){b.onclick=function(){m.remove();setTr(b.getAttribute("data-tr"));settingsOpen()}});
  trUI(m);};

/* =====================================================================
   PDF EXPORT (browser "Save as PDF" — keeps every symbol & diagram sharp)
   ===================================================================== */
function pdfStatic(html){var t=document.createElement("div");t.innerHTML=html;
  t.querySelectorAll(".qc").forEach(function(q){var qq=q.querySelector(".qc-q"),lab=qq&&qq.querySelector(".qc-lab");if(lab)lab.remove();var d=document.createElement("div");d.className="pd-qc";
    d.innerHTML='<b>Try it:</b> '+(qq?qq.innerHTML:"")+'<div class="pd-ans">Answer: '+esc((q.getAttribute("data-a")||"").split("|")[0])+' — '+esc(q.getAttribute("data-s")||"")+'</div>';q.parentNode.replaceChild(d,q)});
  t.querySelectorAll("button,.row,input,.ldots").forEach(function(b){b.remove()});return t.innerHTML}
function pdfDoc(title,sub,body){var pa=el("printArea");if(!pa){pa=document.createElement("div");pa.id="printArea";document.body.appendChild(pa)}
  pa.innerHTML='<div class="pd-head"><div class="pd-logo">∑</div><div><div class="pd-brand">Zero to 800 · SAT Math</div><h1>'+esc(title)+'</h1><p>'+esc(sub)+'</p></div></div>'+body+'<div class="pd-foot">Zero to 800 · '+new Date().toLocaleDateString()+'</div>';
  document.body.classList.add("printing");
  toast(S.uiLang==="ru"?"В окне печати выберите «Сохранить как PDF»":"In the print window, choose “Save as PDF” as the printer");
  setTimeout(function(){try{window.print()}catch(e){toast("Printing isn't allowed in this preview — open your own site version")}setTimeout(function(){document.body.classList.remove("printing")},1500)},350)}
window.addEventListener("afterprint",function(){document.body.classList.remove("printing")});
function pdfLesson(uid,lid){var u=findUnit(uid),l=u&&u.lessons.filter(function(x){return x.id===lid})[0];if(!l)return;pdfDoc(l.t,u.title+" · "+l.mins+" min lesson",'<div class="pd-lesson first">'+pdfStatic(l.h)+'</div>')}
function pdfUnit(uid){var u=findUnit(uid);if(!u)return;pdfDoc(u.title,u.lessons.length+" lessons · complete unit notes",
  '<div class="pd-toc"><b>Contents</b><ol>'+u.lessons.map(function(l){return '<li>'+esc(l.t)+'</li>'}).join("")+'</ol></div>'+u.lessons.map(function(l,i){return '<div class="pd-lesson"><h2>'+(i+1)+'. '+esc(l.t)+'</h2>'+pdfStatic(l.h)+'</div>'}).join(""))}
function pdfQuestions(title,sub,items){
  var q=items.map(function(it,i){return '<div class="pd-q"><b>'+(i+1)+'.</b> '+esc(it.q)+(it.t==="mc"?'<ol type="A">'+it.c.map(function(c){return '<li>'+esc(c)+'</li>'}).join("")+'</ol>':'<div class="pd-line">Answer: ____________________</div>')+'</div>'}).join("");
  var a=items.map(function(it,i){var r=it.t==="mc"?"ABCD".charAt(it.a)+") "+it.c[it.a]:it.a;return '<div class="pd-a"><b>'+(i+1)+'. '+esc(String(r))+'</b> — '+esc(it.s)+'</div>'}).join("");
  pdfDoc(title,sub,'<div class="pd-qs">'+q+'</div><div class="pd-lesson"><h2>Answer key with explanations</h2>'+a+'</div>')}
function pdfSheet(){if(!SHEET)return;var u=findUnit(SHEET.uid);pdfQuestions("Worksheet: "+(u?u.title:"All topics"),"20 questions · easy → hard · answers at the end",SHEET.items)}
function pdfQB(){var l=qbFiltered().slice(0,50);if(!l.length)return toast("No questions to export");pdfQuestions("Question Bank set",l.length+" questions from your current filters · answers at the end",l)}
function pdfFormulas(){pdfDoc("Formula sheet","Every formula in the course",FORMULAS.map(function(g){return '<div class="pd-fg"><h2>'+esc(g.h)+'</h2><table class="tbl">'+g.f.map(function(r){return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td></tr>'}).join("")+'</table></div>'}).join(""))}
/* buttons */
var _vlU=viewLesson;viewLesson=function(a,uid,lid){_vlU(a,uid,lid);var top=a.querySelector(".pl-top");if(top){var b=document.createElement("button");b.className="tb-btn";b.title="Download this lesson as PDF";b.innerHTML=ic("download");b.onclick=function(){pdfLesson(uid,lid)};top.insertBefore(b,top.lastElementChild)}};
var _vuU=viewUnit;viewUnit=function(a,id,tab){_vuU(a,id,tab);var r=a.querySelector(".uhero .row");if(r)r.insertAdjacentHTML("beforeend",'<button class="btn ghost" onclick="pdfUnit(\''+id+'\')">'+ic("download")+'PDF notes</button>')};
var _vsU=viewSheet;viewSheet=function(a,uid){_vsU(a,uid);var r=a.querySelector(".card .row");if(r)r.insertAdjacentHTML("beforeend",'<button class="btn" onclick="pdfSheet()">'+ic("download")+'PDF</button>')};
var _vqU=viewQB;viewQB=function(a){_vqU(a);var r=a.querySelector(".qbl-h .row");if(r)r.insertAdjacentHTML("afterbegin",'<button class="btn sm" onclick="pdfQB()">'+ic("download")+'PDF</button>')};
var _vfU=viewFormulas;viewFormulas=function(a){_vfU(a);var h=a.querySelector(".sec-h");if(h)h.insertAdjacentHTML("beforeend",'<button class="btn sm" onclick="pdfFormulas()">'+ic("download")+'PDF</button>')};

/* =====================================================================
   ACCOUNTS — local, on this device (no database, no internet needed)
   ===================================================================== */
var AUTH={user:null,local:true};
function sha256(ascii){function rr(v,a){return (v>>>a)|(v<<(32-a))}var mp=Math.pow,mw=mp(2,32),i,j,res="",words=[],bl=ascii.length*8,hash=sha256.h=sha256.h||[],k=sha256.k=sha256.k||[],pc=k.length,comp={};
  for(var c=2;pc<64;c++){if(!comp[c]){for(i=0;i<313;i+=c)comp[i]=c;hash[pc]=(mp(c,.5)*mw)|0;k[pc++]=(mp(c,1/3)*mw)|0}}
  ascii+="\x80";while(ascii.length%64-56)ascii+="\x00";
  for(i=0;i<ascii.length;i++){j=ascii.charCodeAt(i);if(j>>8)return;words[i>>2]|=j<<((3-i)%4)*8}
  words[words.length]=((bl/mw)|0);words[words.length]=bl;
  for(j=0;j<words.length;){var w=words.slice(j,j+=16),old=hash;hash=hash.slice(0,8);
    for(i=0;i<64;i++){var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
      var t1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
      var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));hash=[(t1+t2)|0].concat(hash);hash[4]=(hash[4]+t1)|0}
    for(i=0;i<8;i++)hash[i]=(hash[i]+old[i])|0}
  for(i=0;i<8;i++)for(j=3;j+1;j--){var bb=(hash[i]>>(j*8))&255;res+=((bb<16)?0:"")+bb.toString(16)}return res}
function hpw(salt,pw){return sha256(unescape(encodeURIComponent(salt+"|"+pw)))}
function accUsers(){try{return JSON.parse(localStorage.getItem("z800_users")||"{}")}catch(e){return {}}}
function accSaveUsers(u){try{localStorage.setItem("z800_users",JSON.stringify(u))}catch(e){}}
function accSession(name,remember){try{localStorage.removeItem("z800_session");sessionStorage.removeItem("z800_session");(remember?localStorage:sessionStorage).setItem("z800_session",name)}catch(e){}}
function accLogout(){try{localStorage.removeItem("z800_session");sessionStorage.removeItem("z800_session")}catch(e){}location.reload()}
function accSalt(){var a=new Uint8Array(12);try{crypto.getRandomValues(a)}catch(e){for(var i=0;i<12;i++)a[i]=Math.random()*256|0}return Array.prototype.map.call(a,function(x){return ("0"+x.toString(16)).slice(-2)}).join("")}
(function(){var u=window.Z800_USER;if(u&&u!=="__guest"){var us=accUsers();if(us[u])AUTH.user={id:u,email:"@"+u,user_metadata:{name:us[u].name},created:us[u].created}}
  if(S.profile&&S.profile.fresh){delete S.profile.fresh;saveS();setTimeout(function(){if(!el("gate"))onboard(true)},700)}})();
function renderAcct(){var b=el("acct");if(!b)return;var u=AUTH.user;
  b.innerHTML=u?'<button class="acct-b" onclick="authOpen()"><span class="av">'+esc((u.user_metadata.name||u.id).charAt(0).toUpperCase())+'</span><span class="ac-t"><b>'+esc(u.user_metadata.name||u.id)+'</b><small>'+ic("lock")+'@'+esc(u.id)+'</small></span></button>':
   '<button class="acct-b" onclick="authOpen()"><span class="av g">'+ic("user")+'</span><span class="ac-t"><b>Guest</b><small>Create an account</small></span></button>'}
function legacyInfo(){try{var raw=localStorage.getItem("z800");if(!raw)return null;var d=JSON.parse(raw);return d&&d.xp>0?{xp:d.xp,lvl:1+Math.floor(d.xp/120),raw:raw}:null}catch(e){return null}}
function accGate(mode){mode=mode||"in";var g=el("gate");if(!g){g=document.createElement("div");g.id="gate";document.body.appendChild(g)}
  var us=accUsers(),names=Object.keys(us),legacy=window.Z800_USER?null:legacyInfo(),up=mode==="up";
  g.innerHTML='<div class="gate-card"><div class="gate-brand"><span class="logo-m">∑</span><div><b>Zero to 800</b><small>SAT Math · study room</small></div></div>'+
   '<h1>'+(up?"Create your account":"Welcome back")+'</h1><p class="muted">'+(up?"Your own space: lessons, progress, notes and streaks.":"Sign in to continue your progress.")+'</p>'+
   (!up&&names.length?'<div class="gate-users">'+names.map(function(n){return '<button class="gu" data-u="'+esc(n)+'"><span class="av">'+esc((us[n].name||n).charAt(0).toUpperCase())+'</span><span>'+esc(us[n].name||n)+'<small>@'+esc(n)+'</small></span></button>'}).join("")+'</div>':'')+
   '<div class="seg auth-seg"><button class="'+(!up?"on":"")+'" id="gIn">Sign in</button><button class="'+(up?"on":"")+'" id="gUp">Create account</button></div>'+
   (up?'<label class="fl">Your name<input id="gName" autocomplete="name" placeholder="e.g. Muhammadjon"></label>':'')+
   '<label class="fl">Username<input id="gUser" autocomplete="username" placeholder="letters and numbers" autocapitalize="off"></label>'+
   '<label class="fl">Password<input id="gPass" type="password" autocomplete="'+(up?"new-password":"current-password")+'" placeholder="at least 4 characters"></label>'+
   (up?'<label class="fl">Repeat password<input id="gPass2" type="password" autocomplete="new-password"></label>':'')+
   (up&&legacy?'<label class="gchk"><input type="checkbox" id="gImport" checked> Bring my existing progress into this account (level '+legacy.lvl+', '+legacy.xp+' XP)</label>':'')+
   '<label class="gchk"><input type="checkbox" id="gRem" checked> Keep me signed in on this device</label>'+
   '<div id="gMsg" class="auth-msg"></div><button class="btn pri block" id="gGo">'+(up?"Create account":"Sign in")+'</button>'+
   (window.Z800_USER?'<button class="btn ghost block" style="margin-top:8px" onclick="el(\'gate\').remove()">Cancel</button>':'<button class="btn ghost block" style="margin-top:8px" id="gGuest">Continue as guest</button>')+
   '<p class="gate-note">'+ic("lock")+' Accounts and progress are stored privately in this browser on this device. To move to another device, use the backup code in Progress.</p></div>';
  function msg(t){el("gMsg").textContent=t;el("gMsg").className="auth-msg no"}
  el("gIn").onclick=function(){accGate("in")};el("gUp").onclick=function(){accGate("up")};
  g.querySelectorAll(".gu").forEach(function(b){b.onclick=function(){el("gUser").value=b.getAttribute("data-u");el("gPass").focus()}});
  var gg=el("gGuest");if(gg)gg.onclick=function(){accSession("__guest",true);window.Z800_USER="__guest";g.remove();renderAcct();router()};
  function go(){var un=(el("gUser").value||"").trim().toLowerCase(),pw=el("gPass").value||"";
    if(!/^[a-z0-9_.-]{3,20}$/.test(un)){msg("Username: 3–20 letters, numbers, dots or underscores.");return}
    if(pw.length<4){msg("Password must be at least 4 characters.");return}
    var users=accUsers(),rem=el("gRem").checked;
    if(up){if(users[un]){msg("That username is taken on this device.");return}if(pw!==el("gPass2").value){msg("The two passwords don't match.");return}
      var nm=(el("gName").value||"").trim()||un,salt=accSalt();users[un]={name:nm,salt:salt,hash:hpw(salt,pw),created:new Date().toISOString().slice(0,10)};accSaveUsers(users);
      var imp=el("gImport")&&el("gImport").checked&&legacy;try{localStorage.setItem("z800_u_"+un,imp?legacy.raw:JSON.stringify({profile:{name:nm,date:"",target:800,fresh:true}}))}catch(e){}
      if(imp){try{var d=JSON.parse(legacy.raw);d.profile=d.profile||{};if(!d.profile.name)d.profile.name=nm;localStorage.setItem("z800_u_"+un,JSON.stringify(d))}catch(e){}}
      accSession(un,rem);location.reload();return}
    var rec=users[un];if(!rec||hpw(rec.salt,pw)!==rec.hash){msg("Wrong username or password.");return}
    accSession(un,rem);location.reload()}
  el("gGo").onclick=go;g.querySelectorAll("input").forEach(function(i){i.addEventListener("keydown",function(e){if(e.key==="Enter")go()})});
  trUI(g);}
function authOpen(){var u=AUTH.user;if(!u)return accGate(Object.keys(accUsers()).length?"in":"up");
  var o=overall(),m=modal('<div class="auth-hero">'+ic("user")+'</div><h2>'+esc(u.user_metadata.name)+'</h2><p class="muted" style="text-align:center">@'+esc(u.id)+(u.created?' · member since '+esc(u.created):'')+'</p>'+
   '<div class="stat mini4"><div class="b"><b>'+level()+'</b><span>level</span></div><div class="b"><b>'+S.xp+'</b><span>XP</span></div><div class="b"><b>'+o.lessonsDone+'</b><span>lessons</span></div><div class="b"><b>'+S.streak.c+'</b><span>streak</span></div></div>'+
   '<div class="acct-info">'+ic("lock")+'<span>Your account and progress are saved privately in this browser on this device.</span></div>'+
   '<div class="acct-acts"><button class="btn" id="aPw">'+ic("lock")+'Change password</button><button class="btn" id="aSw">'+ic("repeat")+'Switch account</button><button class="btn" data-close onclick="go(\'/progress\')">'+ic("save")+'Backup code</button><button class="btn warn" id="aDel">'+ic("x")+'Delete account</button></div>'+
   '<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" data-close>Close</button><button class="btn pri" id="aOut">'+ic("logout")+'Sign out</button></div>',"auth");
  el("aOut").onclick=accLogout;el("aSw").onclick=accLogout;
  el("aPw").onclick=function(){m.remove();var m2=modal('<h2>Change password</h2><label class="fl">Current password<input id="pOld" type="password"></label><label class="fl">New password<input id="pNew" type="password"></label><div id="pMsg" class="auth-msg"></div><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" data-close>Cancel</button><button class="btn pri" id="pGo">Save</button></div>',"auth");
    el("pGo").onclick=function(){var us=accUsers(),r=us[u.id];if(!r||hpw(r.salt,el("pOld").value)!==r.hash){el("pMsg").textContent="Current password is wrong.";el("pMsg").className="auth-msg no";return}
      if((el("pNew").value||"").length<4){el("pMsg").textContent="At least 4 characters.";el("pMsg").className="auth-msg no";return}
      r.salt=accSalt();r.hash=hpw(r.salt,el("pNew").value);accSaveUsers(us);m2.remove();toast("Password changed")};trUI(m2)};
  el("aDel").onclick=function(){if(!confirm("Delete the account @"+u.id+" and ALL its progress on this device? This cannot be undone."))return;var us=accUsers();delete us[u.id];accSaveUsers(us);try{localStorage.removeItem("z800_u_"+u.id)}catch(e){}accLogout()};
  trUI(m);}
renderAcct();
if(!window.Z800_USER)setTimeout(function(){accGate(Object.keys(accUsers()).length?"in":"up")},60);

/* ---------- styles ---------- */
(function(){var c=`
.tt{border-bottom:1.5px dotted var(--violet);cursor:help;text-decoration:none}
#ttip{position:fixed;z-index:200;display:flex;flex-direction:column;gap:2px;max-width:260px;padding:9px 13px;border-radius:12px;background:#1b2033;color:#fff;font-size:13.5px;box-shadow:0 12px 30px rgba(0,0,0,.35);opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity .15s,transform .15s}
#ttip.on{opacity:1;transform:none}#ttip b{font-size:12px;color:#a9b3d6;font-weight:700}#ttip span{font-weight:700;font-size:15px}
.hsteps{display:flex;flex-direction:column;gap:10px;margin:14px 0;text-align:left}
.hstep{display:flex;gap:14px;align-items:flex-start;padding:12px 14px;border-radius:14px;background:var(--soft)}
.hstep b{display:block;margin-bottom:2px}.hstep small{color:var(--ink2);font-size:13.5px;line-height:1.5}
.hs-ic{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet))}
.htips{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--ink2);text-align:left}.htips div{display:flex;gap:8px;align-items:center}.htips .ic{width:16px;height:16px;flex:none}
.help .mbox{text-align:left}.help h2,.help>.mbox>p{text-align:center}
.cpath{display:flex;flex-direction:column;gap:10px;position:relative}
.cstep{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:18px;background:var(--paper);border:1px solid var(--line);color:var(--ink);box-shadow:var(--sh);transition:transform .15s,border-color .15s}
.cstep:hover{transform:translateX(4px);border-color:color-mix(in srgb,var(--uc) 60%,var(--line))}
.cs-n{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:14px;background:var(--soft);border:2px solid var(--line);color:var(--ink2)}
.cstep.done .cs-n{background:var(--grn);border-color:var(--grn);color:#fff}.cs-n .ic{width:16px;height:16px;stroke-width:3}
.cstep.cur{border-color:var(--blue);box-shadow:0 0 0 4px color-mix(in srgb,var(--blue) 14%,transparent)}.cstep.cur .cs-n{border-color:var(--blue);color:var(--blue)}
.cs-m{flex:1;min-width:0}.cs-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.cs-m small{display:block;color:var(--ink2);font-size:12.5px;margin:2px 0 6px}
.cs-cur{font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));animation:pulse2 2s infinite}
.cs-go{color:var(--ink2)}.cstep .crown{margin-top:0}
@media(max-width:560px){.cstep .crown{display:none}.cstep{gap:10px;padding:12px}}
.startcard{display:flex;align-items:center;gap:16px;padding:18px 20px;margin-bottom:14px;flex-wrap:wrap;background:linear-gradient(135deg,color-mix(in srgb,var(--blue) 18%,var(--paper)),var(--paper))}
.startcard>div:nth-child(2){flex:1;min-width:220px}.startcard p{margin:4px 0 0;color:var(--ink2)}
.sc-ic{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));flex:none}
.acct{margin-top:8px}.acct-b{width:100%;display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;text-align:left;font-family:var(--ui)}
.av{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));flex:none}.av.g{background:var(--soft);color:var(--ink2)}
.ac-t b{display:block;font-size:13.5px}.ac-t small{display:flex;align-items:center;gap:4px;color:var(--ink2);font-size:11.5px}.ac-t small .ic{width:13px;height:13px}
.auth .mbox{text-align:left}.auth h2{text-align:center}.auth-hero{width:64px;height:64px;margin:0 auto 6px;border-radius:20px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet))}.auth-hero .ic{width:30px;height:30px}
.auth-seg{display:flex;width:100%;margin:8px 0 4px}.auth-seg button{flex:1}
.auth-msg{margin-top:10px;font-size:13.5px;min-height:18px}.auth-msg.no{color:var(--red)}.auth-msg.ok{color:var(--grn)}
.acct-info{display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:12px;background:var(--soft);font-size:14px}
#gate{position:fixed;inset:0;z-index:300;display:grid;place-items:center;padding:20px;overflow:auto;background:radial-gradient(60% 50% at 80% 10%,var(--glow),transparent),radial-gradient(60% 60% at 10% 90%,color-mix(in srgb,var(--violet) 18%,transparent),transparent),var(--bg)}
.gate-card{width:min(440px,100%);padding:28px;border-radius:26px;background:var(--paper);border:1px solid var(--line);box-shadow:0 30px 80px rgba(0,0,0,.35);animation:fadeUp .4s ease both}
.gate-card h1{font-family:var(--disp);font-size:28px;margin:16px 0 4px}.gate-brand{display:flex;align-items:center;gap:11px}.gate-brand b{display:block;font-family:var(--disp);font-size:19px}.gate-brand small{color:var(--ink2);font-size:12px}
.gate-users{display:flex;flex-direction:column;gap:6px;margin:12px 0}.gu{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:13px;border:1px solid var(--line);background:var(--soft);color:var(--ink);cursor:pointer;text-align:left;font:600 14px var(--ui)}.gu small{display:block;color:var(--ink2);font-weight:500}
.gchk{display:flex;gap:8px;align-items:flex-start;margin-top:12px;font-size:13.5px;color:var(--ink2)}.gchk input{accent-color:var(--blue);margin-top:2px}
.gate-note{display:flex;gap:8px;align-items:flex-start;margin:14px 0 0;font-size:12.5px;color:var(--ink2)}.gate-note .ic{width:15px;height:15px;flex:none;margin-top:1px}
.acct-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
#printArea{display:none}
@media print{
 @page{margin:14mm}
 html,body{height:auto!important;overflow:visible!important;background:#fff!important}
 body.printing>*:not(#printArea){display:none!important}
 body.printing #printArea{display:block!important}
 #printArea{--ink:#151a2d;--ink2:#545d74;--paper:#fff;--soft:#f3f4f8;--line:#d8dce6;--blue:#3d5cff;--violet:#7658ff;--grn:#0f9f63;--red:#dc3e57;--yel:#d48b00;color:#151a2d;font:11.5pt/1.55 var(--ui);background:#fff}
 #printArea .fdraw{stroke-dashoffset:0!important;animation:none!important}
 #printArea .fpop,#printArea .ffade,#printArea .fgrow,#printArea .fgrowx{animation:none!important;opacity:1!important;transform:none!important}
 #printArea .pd-lesson{break-before:page}#printArea .pd-lesson.first{break-before:auto}
 #printArea .eg,#printArea .tip,#printArea .trap,#printArea .fbox,#printArea .note,#printArea figure,#printArea .ws-ex,#printArea table,#printArea .pd-q,#printArea .pd-qc{break-inside:avoid}
 .tt{border:0!important}
}
#printArea .pd-head{display:flex;gap:14px;align-items:center;padding-bottom:12px;margin-bottom:16px;border-bottom:3px solid #3d5cff}
#printArea .pd-logo{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;color:#fff;font-size:26px;font-weight:800;background:#3d5cff}
#printArea .pd-brand{font-size:10pt;color:#545d74;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
#printArea h1{font-family:var(--disp);font-size:22pt;margin:2px 0}#printArea .pd-head p{margin:0;color:#545d74}
#printArea h2{font-family:var(--disp);font-size:16pt;margin:16px 0 8px}#printArea h3{font-size:13pt;margin:14px 0 6px}
#printArea .eg{border:1px solid #d8dce6;border-left:4px solid #3d5cff;border-radius:8px;padding:8px 12px;margin:10px 0;background:#f6f7fb}
#printArea .eg .lab{font-size:9pt;font-weight:800;color:#3d5cff;letter-spacing:.06em}
#printArea .tip{border-left:4px solid #0f9f63;background:#eefaf4;padding:8px 12px;border-radius:8px;margin:10px 0}
#printArea .trap{border-left:4px solid #dc3e57;background:#fdf0f2;padding:8px 12px;border-radius:8px;margin:10px 0}
#printArea .note{border-left:4px solid #7658ff;background:#f4f1ff;padding:8px 12px;border-radius:8px;margin:10px 0;font-style:italic}
#printArea .fbox{font-family:var(--mono);white-space:pre-wrap;background:#f3f4f8;border:1px solid #d8dce6;border-radius:8px;padding:10px 12px;margin:10px 0}
#printArea .fx{font-family:var(--mono)}#printArea table{border-collapse:collapse;width:100%;margin:8px 0}#printArea td{border:1px solid #d8dce6;padding:5px 8px}
#printArea .ws-ex{border:1px solid #d8dce6;border-radius:10px;padding:10px 14px;margin:12px 0}#printArea .ws-h span{font-weight:800;color:#3d5cff}
#printArea .pd-qc{border:1px dashed #3d5cff;border-radius:8px;padding:8px 12px;margin:10px 0}#printArea .pd-ans{font-size:9.5pt;color:#545d74;margin-top:4px}
#printArea .pd-q{padding:8px 0;border-bottom:1px solid #e6e8ef}#printArea .pd-q ol{margin:4px 0 0 22px}#printArea .pd-line{margin-top:6px;color:#545d74}
#printArea .pd-a{padding:5px 0;font-size:10.5pt;border-bottom:1px solid #eef0f5}
#printArea .pd-toc ol{columns:2;font-size:10.5pt}#printArea .pd-foot{margin-top:24px;padding-top:8px;border-top:1px solid #d8dce6;font-size:9pt;color:#545d74}
#printArea figure{text-align:center;margin:10px 0}#printArea figcaption{font-size:9.5pt;color:#545d74}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
document.documentElement.lang=S.uiLang==="ru"?"ru":"en";
bootRoute();if(S.uiLang==="ru")setTimeout(function(){trUI(document.body)},50);
