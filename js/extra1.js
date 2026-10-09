/* =====================================================================
   ZERO TO 800 — v3 EXTRA 1
   English → Russian math dictionary, automatic "(перевод)" glosses,
   and the new "Math English" unit.
   ===================================================================== */
var TERMS=[
["Numbers & operations",[
["order of operations","порядок действий"],["parentheses","скобки"],["brackets","скобки"],["sum","сумма"],["difference","разность"],["product","произведение"],["quotient","частное"],
["remainder","остаток"],["divisor","делитель"],["integer","целое число"],["whole number","целое число"],["negative","отрицательный"],["positive","положительный"],["number line","числовая прямая"],
["prime number","простое число"],["prime","простое (число)"],["factor","множитель, делитель"],["multiple","кратное"],["greatest common factor","НОД (наибольший общий делитель)"],["least common multiple","НОК (наименьшее общее кратное)"],
["even number","чётное число"],["odd number","нечётное число"],["consecutive","последовательные (идущие подряд)"],["digit","цифра"],["estimate","прикинуть, оценка"],["approximately","приблизительно"],["twice","вдвое, дважды"],["triple","утроить"],["per","на (за) каждый"],["total","итого, всего"]]],
["Fractions & percents",[
["fraction","дробь"],["numerator","числитель"],["denominator","знаменатель"],["common denominator","общий знаменатель"],["improper fraction","неправильная дробь"],["mixed number","смешанное число"],["reciprocal","обратное число"],
["decimal","десятичная дробь"],["percent","процент"],["percent change","изменение в процентах"],["increase","увеличение"],["decrease","уменьшение"],["discount","скидка"],["tax","налог"],["markup","наценка"],["commission","комиссионные"],
["simple interest","простые проценты"],["compound interest","сложные проценты"],["interest","проценты (по вкладу)"],["principal","основная сумма (вклада)"],["original","исходный"],["multiplier","множитель (коэффициент)"],["simplify","упростить"],["equivalent","равносильный, эквивалентный"]]],
["Ratios & rates",[
["ratio","отношение"],["proportion","пропорция"],["rate","скорость, темп"],["unit rate","цена (скорость) за единицу"],["speed","скорость"],["distance","расстояние"],["average speed","средняя скорость"],["directly proportional","прямо пропорциональный"],
["varies inversely","обратно пропорционален"],["inverse variation","обратная пропорциональность"],["direct variation","прямая пропорциональность"],["cross-multiply","умножить крест-накрест"],["convert","перевести (единицы)"],["density","плотность"],["mixture","смесь"],["scale","масштаб"]]],
["Algebra",[
["variable","переменная"],["coefficient","коэффициент"],["constant","постоянная (константа)"],["term","член (слагаемое)"],["like terms","подобные слагаемые"],["expression","выражение"],["equation","уравнение"],["inequality","неравенство"],
["solve","решить"],["solution","решение (корень)"],["distribute","раскрыть скобки"],["isolate","выразить (оставить одну)"],["substitute","подставить"],["substitution","подстановка"],["elimination","метод сложения (исключения)"],
["system of equations","система уравнений"],["literal equation","буквенное уравнение"],["no solution","нет решений"],["infinitely many solutions","бесконечно много решений"],["absolute value","модуль (абсолютная величина)"],
["at least","не менее"],["at most","не более"],["greater than","больше чем"],["less than","меньше чем"],["compound inequality","двойное неравенство"],["round down","округлить вниз"],["round up","округлить вверх"],["evaluate","вычислить значение"],["check","проверить"]]],
["Lines & graphs",[
["coordinate plane","координатная плоскость"],["coordinate","координата"],["origin","начало координат"],["axis","ось"],["axes","оси"],["graph","график"],["slope","угловой коэффициент (наклон)"],["rise","подъём"],
["y-intercept","точка пересечения с осью y"],["x-intercept","точка пересечения с осью x"],["intercept","точка пересечения с осью"],["slope-intercept form","уравнение вида y = mx + b"],["point-slope form","уравнение прямой через точку и наклон"],["standard form","стандартный вид"],
["parallel","параллельный"],["perpendicular","перпендикулярный"],["negative reciprocal","обратное число с противоположным знаком"],["midpoint","середина отрезка"],["horizontal","горизонтальный"],["vertical","вертикальный"],["steep","крутой"],["linear","линейный"],["linear model","линейная модель"]]],
["Powers & polynomials",[
["exponent","показатель степени"],["power","степень"],["base","основание"],["squared","в квадрате"],["cubed","в кубе"],["square root","квадратный корень"],["cube root","кубический корень"],["radical","корень (радикал)"],
["scientific notation","стандартный вид числа"],["polynomial","многочлен"],["degree","степень / градус"],["quadratic","квадратный (квадратичный)"],["factoring","разложение на множители"],["expand","раскрыть скобки"],
["difference of squares","разность квадратов"],["discriminant","дискриминант"],["quadratic formula","формула корней квадратного уравнения"],["completing the square","выделение полного квадрата"],["parabola","парабола"],["vertex","вершина"],
["axis of symmetry","ось симметрии"],["zeros","нули (корни) функции"],["root","корень"],["extraneous solution","посторонний корень"],["remainder theorem","теорема об остатке"],["zero-product rule","правило нулевого произведения"]]],
["Functions & models",[
["function","функция"],["input","входное значение (аргумент)"],["output","выходное значение"],["domain","область определения"],["range","область значений / размах"],["composition","композиция (сложная функция)"],["transformation","преобразование"],
["shift","сдвиг"],["reflection","отражение"],["stretch","растяжение"],["maximum","максимум"],["minimum","минимум"],["increasing","возрастающая"],["decreasing","убывающая"],["exponential","показательный (экспоненциальный)"],
["growth factor","коэффициент роста"],["growth","рост"],["decay","убывание, распад"],["half-life","период полураспада"],["complex number","комплексное число"],["imaginary","мнимый"],["undefined","не определено"],["rational expression","рациональное выражение (дробь с переменной)"]]],
["Data & probability",[
["average","среднее"],["median","медиана"],["mode","мода"],["standard deviation","стандартное отклонение"],["outlier","выброс"],["data","данные"],["survey","опрос"],["sample","выборка"],["random sample","случайная выборка"],
["population","совокупность, население"],["margin of error","погрешность"],["experiment","эксперимент"],["random assignment","случайное распределение по группам"],["scatterplot","диаграмма рассеяния"],["line of best fit","линия наилучшего приближения"],
["residual","остаток (факт − прогноз)"],["trend","тенденция"],["association","связь (зависимость)"],["correlation","корреляция"],["causation","причинно-следственная связь"],["two-way table","таблица сопряжённости"],["histogram","гистограмма"],
["box plot","диаграмма «ящик с усами»"],["quartile","квартиль"],["interquartile range","межквартильный размах"],["frequency","частота"],["probability","вероятность"],["outcome","исход"],["independent","независимый"],["conditional probability","условная вероятность"],["expected","ожидаемый"],["biased","смещённый (необъективный)"]]],
["Geometry & trig",[
["angle","угол"],["right angle","прямой угол"],["degrees","градусы"],["triangle","треугольник"],["right triangle","прямоугольный треугольник"],["hypotenuse","гипотенуза"],["leg","катет"],["isosceles","равнобедренный"],["equilateral","равносторонний"],
["similar","подобный"],["congruent","равный (конгруэнтный)"],["scale factor","коэффициент подобия"],["vertical angles","вертикальные углы"],["supplementary","дополняющие до 180°"],["complementary","дополняющие до 90°"],["transversal","секущая"],
["polygon","многоугольник"],["regular polygon","правильный многоугольник"],["interior angle","внутренний угол"],["exterior angle","внешний угол"],["perimeter","периметр"],["area","площадь"],["volume","объём"],["surface area","площадь поверхности"],
["rectangle","прямоугольник"],["parallelogram","параллелограмм"],["trapezoid","трапеция"],["circle","круг, окружность"],["radius","радиус"],["diameter","диаметр"],["circumference","длина окружности"],["arc","дуга"],["sector","сектор"],["chord","хорда"],
["tangent","касательная / тангенс"],["inscribed angle","вписанный угол"],["central angle","центральный угол"],["semicircle","полукруг"],["cylinder","цилиндр"],["sphere","шар (сфера)"],["cone","конус"],["cube","куб"],["prism","призма"],
["sine","синус"],["cosine","косинус"],["opposite","противолежащий (противоположный)"],["adjacent","прилежащий"],["radian","радиан"],["unit circle","единичная окружность"],["Pythagorean theorem","теорема Пифагора"]]]];

/* flat, longest-first */
var DICT=[];TERMS.forEach(function(g){g[1].forEach(function(p){DICT.push({en:p[0],ru:p[1],cat:g[0]})})});
DICT.sort(function(a,b){return b.en.length-a.en.length});
DICT.forEach(function(d){d.re=new RegExp("(^|[^A-Za-z-])("+d.en.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?:s|es)?)(?![A-Za-z])","i")});
if(S.ruOn===undefined)S.ruOn=true;

var GLOSS_IN=".lesson,.explain,.q-q,.face,.gl,.prose,.bqq,.deep,.rv,.ws-ex";
var GLOSS_SKIP=".fbox,.dpf,.fx,svg,script,style,.ru-g,input,textarea,button,select,option,.opt,.q-tags,summary,.ldots,.qc-lab,.vocab-t,.no-gloss";
function glossify(root){
  if(!S.ruOn||!root)return;
  var boxes=root.matches&&root.matches(GLOSS_IN)?[root]:[].slice.call(root.querySelectorAll(GLOSS_IN));
  if(!boxes.length)return;
  var seen={};[].forEach.call(root.querySelectorAll(".ru-g"),function(s){seen[s.getAttribute("data-t")]=1});
  boxes.forEach(function(box){
    if(box.closest(".no-gloss"))return;
    DICT.forEach(function(d){
      if(seen[d.en])return;
      var w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT,null),n;
      while((n=w.nextNode())){
        var pe=n.parentElement;if(!pe||pe.closest(GLOSS_SKIP))continue;
        var m=d.re.exec(n.nodeValue);if(!m)continue;
        var end=m.index+m[1].length+m[2].length;
        var after=n.splitText(end);
        var sp=document.createElement("span");sp.className="ru-g";sp.setAttribute("data-t",d.en);sp.textContent=" ("+d.ru+")";
        after.parentNode.insertBefore(sp,after);seen[d.en]=1;break;
      }
    });
  });
}
(function(){
  var app=el("app"),busy=false;
  var mo=new MutationObserver(function(){if(busy)return;busy=true;requestAnimationFrame(function(){mo.disconnect();try{glossify(app)}catch(e){}mo.takeRecords();mo.observe(app,{childList:true,subtree:true});busy=false})});
  mo.observe(app,{childList:true,subtree:true});
  var b=document.createElement("button");b.className="iconbtn rubtn"+(S.ruOn?" on":"");b.id="ruBtn";b.title="Show Russian translations in brackets";b.textContent="RU";
  b.onclick=function(){S.ruOn=!S.ruOn;saveS();b.classList.toggle("on",S.ruOn);toast(S.ruOn?"Russian translations ON (перевод включён)":"Translations off");router()};
  var tb=el("themeBtn");if(tb)tb.parentNode.insertBefore(b,tb);
})();

/* ---------------- Math English unit ---------------- */
var WORDS={id:"words",em:"🗣️",color:"#e3f2ff",title:"Math English (английский для математики)",tag:"Every math word used in this course, with its Russian translation. Learn the words and the questions become easy to read.",
lessons:[{id:"l1",t:"Why math vocabulary matters",mins:5,h:`
<p>The SAT is written in English, and a surprising number of lost points come from one unknown word. If you don't know that <b>quotient</b> means the result of division, a very easy question becomes impossible. So in this course, whenever an important word appears for the first time on a page, its Russian translation appears next to it in brackets — like this: denominator <span class="ru-g">(знаменатель)</span>. You can switch this on and off with the <b>RU</b> button at the top.</p>
<h3>How to learn these words fast</h3>
<ol><li>Read the word lists in the next lessons once, slowly, saying each English word out loud.</li>
<li>Do the flashcards of this unit — they go into your Smart flashcards and come back on a schedule until you know them forever.</li>
<li>Do the practice: questions ask you to translate in both directions.</li>
<li>Most importantly, notice the words when they appear in lessons. Meeting a word in real use is what fixes it in memory.</li></ol>
${NOTE("my international students who learned the vocabulary first improved faster than the ones who only did math. Words are the door; math is the room.")}`}],
prac:[],quiz:[],cards:[]};
TERMS.forEach(function(g,gi){
  WORDS.lessons.push({id:"v"+(gi+1),t:"Words: "+g[0],mins:Math.ceil(g[1].length/6),h:'<div class="no-gloss"><p>Read each word aloud. Cover the Russian column and test yourself, then cover the English column.</p><table class="tbl vocab-t" style="width:100%"><tr><td><b>English</b></td><td><b>Русский</b></td></tr>'+g[1].map(function(p){return '<tr><td style="text-align:left"><b>'+esc(p[0])+'</b></td><td style="text-align:left">'+esc(p[1])+'</td></tr>'}).join("")+'</table></div>'});
  g[1].forEach(function(p){WORDS.cards.push({f:p[0],b:p[1]+"   ·   ("+g[0]+")"})});
});
UNITS.push(WORDS);
WORDS.cards.forEach(function(c,i){c.k="words#"+i;c.uid="words"});
(function(){var pro=DOMAINS.filter(function(d){return d.id==="pro"})[0];if(pro)pro.units.unshift("words")})();

/* vocabulary question generators */
(function(){
  function pk(a){return a[Math.floor(Math.random()*a.length)]}
  function others(d,key,n){var o=[],tries=0;while(o.length<n&&tries<200){tries++;var x=pk(DICT);if(x.en!==d.en&&x[key]!==d[key]&&o.indexOf(x[key])<0)o.push(x[key])}return o}
  function mcq(q,right,wr,s){var c=[right].concat(wr);for(var i=c.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=c[i];c[i]=c[j];c[j]=t}return {t:"mc",q:q,c:c,a:c.indexOf(right),s:s}}
  GEN._S.words=[
   ["English → Russian",function(){var d=pk(DICT);return mcq("What does the math word “"+d.en+"” mean?",d.ru,others(d,"ru",3),"“"+d.en+"” = "+d.ru+". Topic: "+d.cat+". Say it aloud three times and use it in a sentence.")}],
   ["Russian → English",function(){var d=pk(DICT);return mcq("Which English word means «"+d.ru+"»?",d.en,others(d,"en",3),"«"+d.ru+"» in English is “"+d.en+"”. Topic: "+d.cat+".")}]];
})();
for(var _i=0;_i<10;_i++){WORDS.prac.push(GEN.make("words",1));WORDS.quiz.push(GEN.make("words",1))}
