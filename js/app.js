/* =====================================================================
   ZERO TO 800 — SAT Math course engine + content
   Plain-language lessons, practice, flashcards, quizzes, progress.
   ===================================================================== */

/* ---------- tiny helpers ---------- */
/* render once when every script has loaded (start.js turns BOOT off) */
var BOOT=1;function bootRoute(){if(!BOOT)router()}
function el(id){return document.getElementById(id)}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function go(h){location.hash="#"+h;window.scrollTo(0,0)}
function toast(m){var t=el("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove("show")},1900)}

/* ---------- persistent state ---------- */
var S={lessons:{},quiz:{},prac:{},cards:{},mistakes:[],xp:0,streak:{c:0,last:""},seenIntro:false};
function loadS(){try{var r=localStorage.getItem("z800");if(r){var o=JSON.parse(r);for(var k in o)S[k]=o[k]}}catch(e){}}
function saveS(){try{localStorage.setItem("z800",JSON.stringify(S))}catch(e){}}
loadS();
function today(){return new Date().toISOString().slice(0,10)}
function tickStreak(){
  var t=today();if(S.streak.last===t)return;
  var y=new Date(Date.now()-864e5).toISOString().slice(0,10),y2=new Date(Date.now()-2*864e5).toISOString().slice(0,10);
  if(S.streak.last===y2&&(S.freeze||0)>0&&S.streak.c>0){S.freeze--;S.streak.last=y;S._froze=S.streak.c}
  S.streak.c=(S.streak.last===y)?S.streak.c+1:1;S.streak.last=t;
  if(S.streak.c%7===0&&(S.freeze||0)<2){S.freeze=(S.freeze||0)+1;S._earnedFreeze=S.streak.c}
  saveS();
}

function addXp(n){S.xp+=n;saveS();paintMini()}
function level(){return 1+Math.floor(S.xp/120)}
function paintMini(){el("mStreak").textContent=S.streak.c;el("mXp").textContent=S.xp;el("mLvl").textContent=level()}

/* ---------- numeric answer checking ---------- */
function num(v){
  if(v==null)return NaN;v=(""+v).trim().replace(/\s/g,"").replace(/^\+/,"");
  if(v==="")return NaN;
  if(/^-?\d+\/-?\d+$/.test(v)){var p=v.split("/");return (+p[0])/(+p[1])}
  if(/^-?\d*\.?\d+%$/.test(v))return parseFloat(v)/100;
  var n=parseFloat(v);return isNaN(n)?NaN:n;
}
function checkNum(ans,input){
  var accept=Array.isArray(ans)?ans:[ans];
  var raw=(""+input).trim().toLowerCase().replace(/\s/g,"");
  for(var i=0;i<accept.length;i++){
    var a=(""+accept[i]).trim().toLowerCase().replace(/\s/g,"");
    if(raw===a)return true;
    var an=num(accept[i]),inn=num(input);
    if(!isNaN(an)&&!isNaN(inn)&&Math.abs(an-inn)<1e-6)return true;
  }
  return false;
}

/* =====================================================================
   COURSE CONTENT
   Each unit: {id,em,color,title,tag, lessons:[{id,t,mins,h}], prac:[], quiz:[], cards:[]}
   Practice/quiz item: {t:'mc',q,c:[...],a:idx,s:expl}  OR  {t:'num',q,a:'ans'|[...],s:expl}
   ===================================================================== */

function P(q,c,a,s){return {t:"mc",q:q,c:c,a:a,s:s}}
function N(q,a,s){return {t:"num",q:q,a:a,s:s}}
function C(f,b){return {f:f,b:b}}

var UNITS=[

/* 1 ============================================================= */
{id:"nums",em:"🔢",color:"#e8edff",title:"Numbers & the basics",tag:"How numbers work, the order of operations, and negatives. The floor everything stands on.",
lessons:[
{id:"l1",t:"What the operations really mean",mins:6,h:`
<p>Before anything fancy, let's be sure the four basic moves feel obvious. You already use them every day — we're just naming them clearly.</p>
<h3>The four operations</h3>
<ul>
<li><strong>Adding</strong> (+) puts amounts together. 3 + 4 = 7.</li>
<li><strong>Subtracting</strong> (−) takes away, or asks "how far apart?". 10 − 4 = 6.</li>
<li><strong>Multiplying</strong> (×) is fast repeated adding. 4 × 3 means "four groups of three" = 12.</li>
<li><strong>Dividing</strong> (÷) is fair sharing, or "how many groups fit?". 12 ÷ 3 = 4 (twelve split into groups of three makes four groups).</li>
</ul>
<div class="tip"><b>Key idea.</b> Multiplying and dividing are opposites. Adding and subtracting are opposites. If one undoes the other, you can always check your work by going backwards.</div>
<h3>Words that mean each operation</h3>
<p>The SAT hides operations inside words. Learn the translations:</p>
<ul>
<li><strong>Add:</strong> sum, total, more than, increased by, combined, together</li>
<li><strong>Subtract:</strong> difference, less than, fewer, decreased by, remaining, left</li>
<li><strong>Multiply:</strong> product, times, of, per, each, twice/double (×2), triple (×3)</li>
<li><strong>Divide:</strong> quotient, per, split, shared equally, ratio, out of</li>
</ul>
<div class="trap"><b>Watch out.</b> "5 less than x" is <span class="fx">x − 5</span>, NOT <span class="fx">5 − x</span>. The "less than" flips the order. Read slowly.</div>
`},
{id:"l2",t:"Order of operations (PEMDAS)",mins:7,h:`
<p>When an expression has several operations, everyone must do them in the same order — otherwise we'd all get different answers. That agreed order has a nickname: <strong>PEMDAS</strong>.</p>
<div class="fbox">P → E → MD → AS</div>
<ul>
<li><strong>P</strong> — Parentheses (brackets) first: <span class="fx">( )</span></li>
<li><strong>E</strong> — Exponents (powers) next: <span class="fx">3²</span></li>
<li><strong>MD</strong> — Multiply & Divide, left to right (they're equal rank)</li>
<li><strong>AS</strong> — Add & Subtract, left to right (also equal rank)</li>
</ul>
<div class="tip"><b>The trap most people fall for:</b> multiply/divide are done <em>left to right as they appear</em>, not "all multiplication then all division". Same for add/subtract.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Compute <span class="fx">3 + 4 × (10 − 6) ÷ 2</span>.<br>
1. Parentheses: 10 − 6 = 4 → <span class="fx">3 + 4 × 4 ÷ 2</span><br>
2. Multiply/divide left to right: 4 × 4 = 16, then 16 ÷ 2 = 8 → <span class="fx">3 + 8</span><br>
3. Add: <strong>11</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Compute <span class="fx">2 + 3²  × 2</span>.<br>
Exponent first: 3² = 9. Then 9 × 2 = 18. Then 2 + 18 = <strong>20</strong>. (Not 2+3=5 then squared — the exponent only touches the 3.)</div>
<div class="trap"><b>Common mistake.</b> Adding before multiplying. In <span class="fx">3 + 4 × 5</span> you get 3 + 20 = 23, never 7 × 5.</div>
`},
{id:"l3",t:"Negative numbers without fear",mins:8,h:`
<p>Numbers live on a line that runs both ways from zero. To the right they get bigger; to the left they get smaller (more negative). Think of temperature, or money you owe.</p>
<div class="fbox">… −3  −2  −1   0   1   2   3 …</div>
<div class="tip"><b>Size vs position.</b> −5 is <em>further</em> from zero than −2, so −5 is actually the <em>smaller</em> number. −5 &lt; −2.</div>
<h3>Adding and subtracting signs</h3>
<ul>
<li>Two minuses next to each other become a plus: <span class="fx">a − (−b) = a + b</span>. Owing a debt that gets cancelled makes you richer.</li>
<li>Adding a negative is the same as subtracting: <span class="fx">5 + (−3) = 5 − 3 = 2</span>.</li>
</ul>
<h3>Multiplying and dividing signs</h3>
<div class="fbox">(+)(+) = +   (−)(−) = +   (+)(−) = −   (−)(+) = −</div>
<p>The rule in words: <strong>same signs give positive, different signs give negative.</strong> An even number of minus signs → positive; an odd number → negative.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Compute <span class="fx">−3 − (−8) + (−2)</span>.<br>
= −3 + 8 − 2 = <strong>3</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Compute <span class="fx">(−2)(−3)(−1)</span>.<br>
Three minus signs (odd) → answer is negative. 2×3×1 = 6, so <strong>−6</strong>.</div>
<div class="trap"><b>Careful with powers.</b> <span class="fx">(−2)² = 4</span> (the whole −2 is squared) but <span class="fx">−2² = −4</span> (only the 2 is squared, then made negative). Parentheses change the meaning.</div>
`}
],
prac:[
N("Compute: 6 + 2 × 5","16","Multiply first: 2×5=10, then 6+10=16."),
N("Compute: (8 − 3) × 2 + 1","11","Parentheses: 5. Then 5×2=10. Then +1 = 11."),
N("Compute: 20 ÷ 4 ÷ 5","1","Left to right: 20÷4=5, then 5÷5=1."),
N("Compute: −7 + 3","-4","Start at −7, move right 3 → −4."),
N("Compute: −6 − (−10)","4","Minus a negative becomes plus: −6+10 = 4."),
N("Compute: (−3)(4)(−2)","24","Two negatives → positive. 3×4×2 = 24."),
N("Compute: 4 + 2³","12","Exponent first: 2³=8. Then 4+8=12."),
P("Which is the smallest number?",["−1","0","−8","3"],2,"On the number line −8 is furthest left, so it is smallest.")
],
quiz:[
N("Compute: 3 × (4 + 5) − 6","21","Parentheses 9, times 3 = 27, minus 6 = 21."),
N("Compute: 100 − 10 × 5","50","Multiply first: 50. Then 100−50 = 50."),
P("Which equals −2²?",["4","−4","2","−2"],1,"−2² means −(2²) = −4. Only (−2)² would be 4."),
N("Compute: −5 + 12 − 3","4","−5+12 = 7, then 7−3 = 4."),
P("'7 less than a number x' is written as:",["7 − x","x − 7","x + 7","7x"],1,"'less than' flips order: x − 7."),
N("Compute: 2 + 3 × 4²","50","Exponent: 16. Times 3: 48. Plus 2: 50.")
],
cards:[
C("Order of operations","PEMDAS: Parentheses, Exponents, Multiply/Divide (left→right), Add/Subtract (left→right)."),
C("(−)(−) = ?","Positive. Same signs multiply to positive."),
C("a − (−b) = ?","a + b. Two minuses make a plus."),
C("Is −5 bigger or smaller than −2?","Smaller. Further left on the number line = smaller."),
C("(−2)² vs −2²","(−2)² = 4 (all squared). −2² = −4 (only the 2 is squared)."),
C("'less than' in word problems","Flips the order: '3 less than x' = x − 3.")
]},

/* 2 ============================================================= */
{id:"frac",em:"🍕",color:"#ffe9d6",title:"Fractions, decimals & percents",tag:"Three ways to say 'part of a whole' — and how to switch between them instantly.",
lessons:[
{id:"l1",t:"Fractions are just division",mins:8,h:`
<p>A fraction like <span class="fx">3/4</span> means "3 out of 4 equal pieces". The bottom number (<strong>denominator</strong>) says how many equal pieces the whole is cut into. The top (<strong>numerator</strong>) says how many you take.</p>
<div class="tip"><b>Secret:</b> a fraction is literally a division. <span class="fx">3/4</span> = 3 ÷ 4 = 0.75. That's why every fraction is also a decimal.</div>
<h3>Equivalent fractions</h3>
<p>Multiply or divide top and bottom by the same number and the value doesn't change — you've just cut the pizza into more (or fewer) slices.</p>
<div class="fbox">1/2 = 2/4 = 3/6 = 50/100</div>
<h3>Simplifying (reducing)</h3>
<p>Divide top and bottom by the biggest number that fits both. <span class="fx">6/8</span>: both divide by 2 → <span class="fx">3/4</span>.</p>
<h3>Adding & subtracting</h3>
<p>You can only add slices of the <em>same size</em>, so first make the denominators match.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">2/3 + 3/4</span>. Common denominator is 12. 2/3 = 8/12, 3/4 = 9/12. Sum = <strong>17/12</strong> (= 1 and 5/12).</div>
<h3>Multiplying & dividing</h3>
<ul>
<li>Multiply: straight across. <span class="fx">2/3 × 4/5 = 8/15</span>.</li>
<li>Divide: flip the second fraction and multiply. <span class="fx">2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6</span>.</li>
</ul>
<div class="trap"><b>Never</b> add denominators. 1/2 + 1/3 is NOT 2/5. Find a common denominator first (it's 5/6).</div>
`},
{id:"l2",t:"Decimals & percents",mins:7,h:`
<p>A <strong>decimal</strong> is a fraction whose bottom is 10, 100, 1000… written with a dot. <span class="fx">0.7 = 7/10</span>, <span class="fx">0.25 = 25/100 = 1/4</span>.</p>
<p><strong>Percent</strong> means "out of 100". <span class="fx">45% = 45/100 = 0.45</span>. So percent and decimal are the same idea; just slide the dot two places.</p>
<div class="fbox">percent → decimal: divide by 100 (move dot 2 left)
decimal → percent: multiply by 100 (move dot 2 right)</div>
<h3>The three you must memorize</h3>
<table style="width:100%;border-collapse:collapse;margin:14px 0" class="tbl">
<tr><td>1/2</td><td>0.5</td><td>50%</td></tr>
<tr><td>1/4</td><td>0.25</td><td>25%</td></tr>
<tr><td>3/4</td><td>0.75</td><td>75%</td></tr>
<tr><td>1/5</td><td>0.2</td><td>20%</td></tr>
<tr><td>1/10</td><td>0.1</td><td>10%</td></tr>
<tr><td>1/3</td><td>0.333…</td><td>33.3%</td></tr>
</table>
<h3>"Percent OF" means multiply</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
What is 30% of 80? Turn 30% into 0.30 and multiply: 0.30 × 80 = <strong>24</strong>.</div>
<div class="tip"><b>The word "of" almost always means multiply.</b> "Half of 40" = ½ × 40 = 20.</div>
`},
{id:"l3",t:"Percent change (the SAT favourite)",mins:7,h:`
<p>SAT loves increase/decrease problems. Here's the reliable method.</p>
<h3>Increase or decrease by a percent</h3>
<div class="fbox">New = Old × (1 ± percent-as-decimal)</div>
<ul>
<li>Up 20%: multiply by 1.20</li>
<li>Down 20%: multiply by 0.80</li>
<li>Up 5%: multiply by 1.05</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
A $50 shirt is discounted 30%. New price = 50 × 0.70 = <strong>$35</strong>. (Keeping 70% is faster than finding the 30% and subtracting.)</div>
<h3>Percent change from two numbers</h3>
<div class="fbox">percent change = (new − old) / old × 100%</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Price rises from 40 to 50. Change = (50 − 40)/40 = 10/40 = 0.25 = <strong>25% increase</strong>. (Always divide by the <em>original</em>.)</div>
<div class="trap"><b>Up 20% then down 20% does not return to start.</b> 100 → 120 → 96. You end 4% lower, because the second 20% is taken from a bigger number.</div>
`}
],
prac:[
N("Simplify 6/9 (write as a/b).","2/3","Divide top and bottom by 3."),
N("Compute 1/2 + 1/3 (as a fraction).","5/6","Common denominator 6: 3/6 + 2/6 = 5/6."),
N("Compute 3/4 × 2/9 (simplified).","1/6","Multiply across: 6/36 = 1/6."),
N("What is 25% of 60?","15","0.25 × 60 = 15."),
N("Write 0.6 as a percent (number only).","60","Move the dot two places right → 60%."),
N("A $80 item drops 25%. New price ($)?","60","80 × 0.75 = 60."),
N("Price goes 20 → 26. Percent increase?","30","(26−20)/20 = 6/20 = 0.30 = 30%."),
N("Compute 2/5 ÷ 1/10 (whole number).","4","Flip and multiply: 2/5 × 10/1 = 20/5 = 4.")
],
quiz:[
N("Compute 5/6 − 1/4 (as a fraction).","7/12","Common denom 12: 10/12 − 3/12 = 7/12."),
N("What is 15% of 200?","30","0.15 × 200 = 30."),
P("40 is what percent of 50?",["70%","80%","90%","125%"],1,"40/50 = 0.8 = 80%."),
N("A number grows 10% to become 88. Original number?","80","x × 1.1 = 88 → x = 80."),
N("Convert 3/8 to a decimal.","0.375","3 ÷ 8 = 0.375."),
P("Up 50% then down 50% of 200 gives:",["200","150","100","50"],1,"200→300→150. Not back to 200.")
],
cards:[
C("Fraction = ?","A division. 3/4 = 3 ÷ 4 = 0.75."),
C("Add fractions rule","Match denominators first, then add the tops. Never add bottoms."),
C("Divide fractions","Flip the second one and multiply. a/b ÷ c/d = a/b × d/c."),
C("'percent of' means…","Multiply. 30% of 80 = 0.30 × 80."),
C("Percent change formula","(new − old) ÷ old × 100%. Divide by the original."),
C("Up 20% then down 20%","Not back to start — ends 4% lower (×1.2 ×0.8 = 0.96)."),
C("Increase by p%","Multiply by (1 + p/100). Decrease: (1 − p/100).")
]},

/* 3 ============================================================= */
{id:"ratio",em:"⚖️",color:"#dff5e8",title:"Ratios, rates & proportions",tag:"Comparing quantities, unit rates, scaling recipes and maps — the heart of 'Data Analysis'.",
lessons:[
{id:"l1",t:"Ratios and how to scale them",mins:7,h:`
<p>A <strong>ratio</strong> compares two amounts. "3 boys to 2 girls" is written 3:2 or 3/2. Ratios can be scaled up or down as long as you multiply <em>both</em> parts by the same number.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
A recipe uses flour and sugar in ratio 3:1. For 12 cups of flour, how much sugar? 3:1 scaled by 4 becomes 12:4, so <strong>4 cups</strong>.</div>
<h3>Part-to-part vs part-to-whole</h3>
<p>If a class is 3 boys : 2 girls, the whole is 3 + 2 = 5 parts. So boys are 3/5 of the class, girls 2/5.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
30 students, ratio 3:2 boys to girls. Total parts = 5, each part = 30 ÷ 5 = 6. Boys = 3×6 = <strong>18</strong>, girls = 2×6 = 12.</div>
`},
{id:"l2",t:"Rates, units & proportions",mins:8,h:`
<p>A <strong>rate</strong> is a ratio with different units, like miles per hour or dollars per pound. A <strong>unit rate</strong> is "per 1".</p>
<div class="fbox">speed = distance ÷ time     price per item = total ÷ count</div>
<div class="eg"><div class="lab">EXAMPLE</div>
180 km in 3 hours → 180 ÷ 3 = <strong>60 km/h</strong>.</div>
<h3>Solving proportions</h3>
<p>A <strong>proportion</strong> says two ratios are equal. Cross-multiply to solve.</p>
<div class="fbox">a/b = c/d   ⟹   a·d = b·c</div>
<div class="eg"><div class="lab">EXAMPLE</div>
If 3 pens cost $12, what do 8 pens cost? Set up 3/12 = 8/x → 3x = 96 → x = <strong>$32</strong>. (Or: one pen is $4, so 8 pens = $32.)</div>
<h3>Unit conversion — the "railroad" trick</h3>
<p>Multiply by fractions equal to 1 so the units you don't want cancel.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Convert 90 minutes to hours: 90 min × (1 hr / 60 min) = 90/60 = <strong>1.5 hr</strong>. The "min" cancels top and bottom.</div>
<div class="tip"><b>Always write units.</b> If the units don't cancel to what you want, your setup is upside down — flip a fraction.</div>
`}
],
prac:[
N("A ratio 2:3 is scaled so the first part is 10. Second part?","15","2:3 ×5 = 10:15."),
N("Class of 24 in ratio 5:1 (cats:dogs). How many cats?","20","6 parts, each = 4. Cats = 5×4 = 20."),
N("240 miles in 4 hours. Speed (mph)?","60","240 ÷ 4 = 60."),
N("6 apples cost $3. Cost of 10 apples ($)?","5","$0.50 each × 10 = $5."),
N("Convert 2.5 hours to minutes.","150","2.5 × 60 = 150."),
N("Solve 4/9 = x/36.","16","Cross multiply: 9x=144, x=16."),
N("A map scale: 1 cm = 5 km. 7 cm is how many km?","35","7 × 5 = 35."),
N("A car goes 60 km/h. Distance in 2.5 h (km)?","150","60 × 2.5 = 150.")
],
quiz:[
N("Recipe ratio water:rice = 2:1. For 3 cups rice, cups of water?","6","2:1 ×3 = 6:3."),
N("Total 45 in ratio 4:5. The larger share is?","25","9 parts, each 5. Larger = 5×5 = 25."),
N("A printer does 20 pages per minute. Pages in 7 minutes?","140","20 × 7 = 140."),
P("If y is proportional to x and y=12 when x=3, find y when x=8.",["24","32","20","96"],1,"y = 4x, so y = 32."),
N("Solve 5/x = 15/9.","3","Cross: 45 = 15x, x = 3."),
N("A worker earns $54 for 6 hours. Rate ($/hr)?","9","54 ÷ 6 = 9.")
],
cards:[
C("Ratio 3:2 total parts","5. Boys 3/5, girls 2/5 of the whole."),
C("Solve a proportion","Cross-multiply: a/b = c/d → ad = bc."),
C("Unit rate","'Per 1'. Divide total by the count. 180 km ÷ 3 h = 60 km/h."),
C("Unit conversion trick","Multiply by fractions = 1 so unwanted units cancel."),
C("Directly proportional","y = kx. Doubling x doubles y."),
C("Split N in ratio a:b","N ÷ (a+b) = one part; multiply each side by it.")
]},

/* 4 ============================================================= */
{id:"alg",em:"🧩",color:"#e9e2ff",title:"Algebra: expressions & equations",tag:"Letters standing for numbers. Simplifying, and the balance rule for solving.",
lessons:[
{id:"l1",t:"Expressions: letters are just numbers in disguise",mins:7,h:`
<p>An <strong>expression</strong> is a math phrase like <span class="fx">3x + 5</span>. The letter <strong>x</strong> is a <em>variable</em> — a placeholder for a number we don't know yet. <span class="fx">3x</span> means "3 times x".</p>
<h3>Like terms</h3>
<p>You can combine terms that have the exact same letter part. <span class="fx">3x + 5x = 8x</span>. But <span class="fx">3x + 5</span> stays as is — x's and plain numbers don't mix.</p>
<h3>Distributing (opening brackets)</h3>
<p>Multiply the outside by <em>every</em> term inside.</p>
<div class="fbox">a(b + c) = ab + ac</div>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">2(3x − 4) − (x − 5)</span><br>
= 6x − 8 − x + 5   (note: −(x−5) flips both signs)<br>
= <strong>5x − 3</strong>.</div>
<div class="trap"><b>The minus-sign trap.</b> A minus in front of a bracket flips the sign of everything inside. −(x − 5) = −x + 5.</div>
`},
{id:"l2",t:"Solving equations: keep the scale balanced",mins:9,h:`
<p>An <strong>equation</strong> has an equals sign — it's a balance scale. The golden rule: <strong>whatever you do to one side, do to the other</strong>. Your goal is to get x alone.</p>
<h3>The undo order</h3>
<p>To free x, undo operations in reverse PEMDAS order: deal with +/− first, then ×/÷.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">4x − 7 = 13</span>.<br>
Add 7 to both sides: 4x = 20.<br>
Divide both sides by 4: x = <strong>5</strong>.<br>
Check: 4(5) − 7 = 13 ✓.</div>
<h3>Variables on both sides</h3>
<p>Collect all x's on one side, all numbers on the other.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">5x + 2 = 3x + 12</span>.<br>
Subtract 3x: 2x + 2 = 12.<br>
Subtract 2: 2x = 10 → x = <strong>5</strong>.</div>
<h3>Brackets and fractions</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">(x + 3)/2 = 2x − 6</span>.<br>
Multiply both sides by 2: x + 3 = 4x − 12.<br>
15 = 3x → x = <strong>5</strong>.</div>
<div class="tip"><b>Always check.</b> Plug your answer back in. If both sides match, you're right — this catches almost every mistake.</div>
`},
{id:"l3",t:"Turning words into equations",mins:8,h:`
<p>Most SAT algebra is a word problem wearing a costume. Follow a fixed routine:</p>
<ol>
<li><strong>Name the unknown.</strong> "Let x = the number of tickets."</li>
<li><strong>Translate each sentence</strong> into math using the word-list (of = ×, is = =, more than = +…).</li>
<li><strong>Solve</strong> the equation.</li>
<li><strong>Answer the actual question</strong> (sometimes they ask for 2x, not x).</li>
</ol>
<div class="eg"><div class="lab">EXAMPLE</div>
"A phone plan costs $20 plus $0.10 per minute. If the bill is $35, how many minutes?"<br>
Let m = minutes. Equation: 20 + 0.10m = 35.<br>
0.10m = 15 → m = <strong>150 minutes</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
"Three consecutive integers add to 72." Let them be x, x+1, x+2.<br>
x + (x+1) + (x+2) = 72 → 3x + 3 = 72 → x = 23. The integers are <strong>23, 24, 25</strong>.</div>
<div class="trap"><b>Answer what's asked.</b> If they ask for "the largest integer", it's 25, not 23. Underline the actual question.</div>
`}
],
prac:[
N("Simplify 3x + 5 − x + 2 (coefficient of x, then constant as 'ax+b').","2x+7","3x−x=2x; 5+2=7."),
N("Expand 4(2x − 3) as 'ax+b'.","8x-12","4×2x=8x; 4×(−3)=−12."),
N("Solve 2x + 5 = 17.","6","2x = 12, x = 6."),
N("Solve 3(x − 2) = 9.","5","3x − 6 = 9 → 3x = 15 → x = 5."),
N("Solve 7x − 4 = 2x + 11.","3","5x = 15, x = 3."),
N("Solve x/3 + 1 = 4.","9","x/3 = 3 → x = 9."),
N("A number tripled, plus 4, is 25. The number?","7","3n + 4 = 25 → n = 7."),
N("Solve 5 − 2x = 1.","2","−2x = −4 → x = 2.")
],
quiz:[
N("Simplify 2(x + 3) − 4(x − 1) as 'ax+b'.","-2x+10","2x+6−4x+4 = −2x+10."),
N("Solve 6x + 2 = 4x + 14.","6","2x = 12, x = 6."),
N("Solve (2x − 1)/3 = 5.","8","2x−1 = 15 → 2x = 16 → x = 8."),
P("'5 less than twice a number n' is:",["5 − 2n","2n − 5","2(n−5)","2n+5"],1,"twice n = 2n; 5 less than it = 2n − 5."),
N("Two numbers add to 30; one is 4 times the other. The smaller number?","6","x + 4x = 30 → x = 6."),
N("Solve 4 − (x + 2) = 10.","-8","4 − x − 2 = 10 → 2 − x = 10 → x = −8.")
],
cards:[
C("Like terms","Same letter part combine: 3x + 5x = 8x. x's and numbers don't mix."),
C("Distribute","a(b+c) = ab + ac. Multiply the outside by everything inside."),
C("Golden rule of equations","Do the same thing to both sides."),
C("−(x − 5) = ?","−x + 5. A leading minus flips every sign inside."),
C("Solving order","Undo +/− first, then ×/÷ to isolate x."),
C("Word-problem finish","Answer what's actually asked — maybe it wants 2x, not x.")
]},

/* 5 ============================================================= */
{id:"ineq",em:"↔️",color:"#ffe0ea",title:"Inequalities & absolute value",tag:"When the answer is a range, not one number — plus distance from zero.",
lessons:[
{id:"l1",t:"Inequalities: the flip rule",mins:7,h:`
<p>An <strong>inequality</strong> uses &lt; &gt; ≤ ≥ instead of =. You solve it just like an equation, with ONE extra rule.</p>
<div class="fbox">&lt; less than    &gt; greater than    ≤ at most (≤)    ≥ at least (≥)</div>
<div class="trap"><b>THE flip rule.</b> If you multiply or divide both sides by a <em>negative</em> number, flip the inequality sign.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">−2x &gt; 6</span>. Divide by −2 and flip: <span class="fx">x &lt; −3</span>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">3x + 4 ≤ 19</span>. Subtract 4: 3x ≤ 15. Divide by 3 (positive, no flip): <strong>x ≤ 5</strong>.</div>
<h3>Everyday words</h3>
<ul>
<li>"at least 5" → ≥ 5</li>
<li>"at most 5" / "no more than 5" → ≤ 5</li>
<li>"more than 5" → &gt; 5, "fewer than 5" → &lt; 5</li>
</ul>
`},
{id:"l2",t:"Absolute value = distance from zero",mins:7,h:`
<p><strong>Absolute value</strong> <span class="fx">|x|</span> means "how far x is from zero" — always positive. <span class="fx">|−5| = 5</span> and <span class="fx">|5| = 5</span>.</p>
<h3>Solving |stuff| = number</h3>
<p>Because two points are the same distance from zero, there are usually <strong>two answers</strong>.</p>
<div class="fbox">|A| = b   ⟹   A = b   OR   A = −b</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Solve <span class="fx">|x − 3| = 5</span>.<br>
x − 3 = 5 → x = 8, or x − 3 = −5 → x = −2. So <strong>x = 8 or −2</strong>.</div>
<div class="tip"><b>SAT shortcut.</b> |x − a| is "the distance between x and a." So |x − 3| = 5 asks "which numbers are 5 away from 3?" → 8 and −2.</div>
<div class="trap"><b>No solution case.</b> |x| = −4 has no answer — distance can't be negative.</div>
`}
],
prac:[
P("Solve 2x − 1 < 9. x is:",["x < 5","x > 5","x < 4","x > 4"],0,"2x < 10 → x < 5."),
P("Solve −3x ≥ 12. x is:",["x ≥ −4","x ≤ −4","x ≥ 4","x ≤ 4"],1,"Divide by −3 and flip: x ≤ −4."),
N("Compute |−9|.","9","Distance from 0 is 9."),
N("|x| = 7 has how many solutions?","2","x = 7 or x = −7."),
P("Solve |x + 2| = 6. Solutions:",["4 and 8","4 and −8","−4 and 8","−4 and −8"],1,"x+2=6→4; x+2=−6→−8."),
P("'At most 20' translates to:",["x < 20","x > 20","x ≤ 20","x ≥ 20"],2,"at most = ≤."),
N("The larger solution of |x − 1| = 10.","11","x−1=10 → 11 (other is −9)."),
P("Solve 5 − x > 2. x is:",["x < 3","x > 3","x < 7","x > 7"],0,"−x > −3 → x < 3 (flip).")
],
quiz:[
P("Solve 4x + 3 ≤ 23.",["x ≤ 5","x ≥ 5","x ≤ 6.5","x ≥ 6.5"],0,"4x ≤ 20 → x ≤ 5."),
P("Solve −2x + 1 < 7.",["x > −3","x < −3","x > 3","x < 3"],0,"−2x < 6 → x > −3 (flip)."),
N("The two solutions of |2x| = 10 are ±?","5","2x = 10 or −10 → x = 5 or −5."),
P("Which x satisfies |x − 4| = 0?",["4","0","4 and −4","no solution"],0,"Only x = 4 is 0 away from 4."),
P("'You must be at least 18' means age a satisfies:",["a > 18","a ≥ 18","a < 18","a ≤ 18"],1,"at least = ≥."),
N("Solve |x + 5| = 5, smaller solution.","-10","x+5=−5 → −10; other is 0.")
],
cards:[
C("Inequality flip rule","Multiplying/dividing by a negative flips < to > (and ≤ to ≥)."),
C("|x| means","Distance from zero — always ≥ 0. |−5| = 5."),
C("|A| = b solving","Two cases: A = b OR A = −b."),
C("'at least' / 'at most'","at least = ≥, at most = ≤."),
C("|x| = −3","No solution. Distance can't be negative."),
C("|x − a| = d meaning","x is distance d from a. Answers: a+d and a−d.")
]},

/* 6 ============================================================= */
{id:"lines",em:"📈",color:"#d9f0ff",title:"Lines & slope",tag:"The coordinate plane, slope, and every form of a line. A huge chunk of the test.",
lessons:[
{id:"l1",t:"The coordinate plane & slope",mins:8,h:`
<p>Two number lines crossing at right angles make the <strong>coordinate plane</strong>. A point is written <span class="fx">(x, y)</span> — x is how far <em>across</em>, y is how far <em>up</em>. The crossing point (0,0) is the <strong>origin</strong>.</p>
<h3>Slope = steepness</h3>
<p><strong>Slope</strong> tells how tilted a line is: how much y changes for each step in x. Read it as "rise over run".</p>
<div class="fbox">slope m = (y₂ − y₁) / (x₂ − x₁) = rise / run</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Line through (1, 2) and (3, 8): m = (8 − 2)/(3 − 1) = 6/2 = <strong>3</strong>. For every 1 right, the line goes 3 up.</div>
<ul>
<li>Positive slope → uphill (to the right). Negative → downhill.</li>
<li>Slope 0 → flat horizontal line. Undefined slope → vertical line.</li>
</ul>
<div class="trap"><b>Order matters (and must match).</b> Whichever point's y you put first, its x goes first too. Don't mix them up.</div>
`},
{id:"l2",t:"y = mx + b (slope-intercept form)",mins:8,h:`
<p>The most useful way to write a line:</p>
<div class="fbox">y = mx + b</div>
<ul>
<li><strong>m</strong> = slope (steepness)</li>
<li><strong>b</strong> = y-intercept (where the line crosses the y-axis, i.e. y when x = 0)</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">y = 3x − 1</span> has slope 3 and crosses the y-axis at −1. To graph: start at (0, −1), then go up 3, right 1, and mark the next point.</div>
<h3>Building the equation from two points</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
Line through (1, 2) and (3, 8): slope = 3 (from before). Use one point: 2 = 3(1) + b → b = −1. Equation: <strong>y = 3x − 1</strong>.</div>
<h3>Parallel & perpendicular</h3>
<ul>
<li><strong>Parallel</strong> lines have the <em>same</em> slope.</li>
<li><strong>Perpendicular</strong> lines have slopes that are <em>negative reciprocals</em> (flip and change sign). If one is 2, the other is −1/2. Their product is −1.</li>
</ul>
<div class="tip"><b>Reading a real-world line.</b> In "cost = 15h + 40", the 15 is the rate (slope, $ per hour) and 40 is the starting fee (y-intercept).</div>
`},
{id:"l3",t:"Standard form & intercepts",mins:6,h:`
<p>Lines also appear as <strong>standard form</strong> <span class="fx">Ax + By = C</span>. It's handy for finding where a line crosses each axis.</p>
<h3>Finding intercepts fast</h3>
<ul>
<li><strong>x-intercept:</strong> set y = 0, solve for x. (crosses the x-axis)</li>
<li><strong>y-intercept:</strong> set x = 0, solve for y.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">2x + 3y = 12</span>.<br>
x-intercept: y=0 → 2x=12 → x=6, point (6, 0).<br>
y-intercept: x=0 → 3y=12 → y=4, point (0, 4).</div>
<div class="tip"><b>To get slope from standard form,</b> rearrange to y = mx + b, or just use m = −A/B. Here m = −2/3.</div>
`}
],
prac:[
N("Slope through (0,0) and (4,8)?","2","8/4 = 2."),
N("Slope through (2,5) and (6,5)?","0","No change in y → flat line, slope 0."),
N("In y = 4x − 7, the slope is?","4","m is the number in front of x."),
N("In y = 4x − 7, the y-intercept is?","-7","b = −7."),
P("A line parallel to y = 2x + 1 has slope:",["−2","1/2","2","−1/2"],2,"Parallel = same slope = 2."),
P("A line perpendicular to y = 3x has slope:",["3","−3","1/3","−1/3"],3,"Negative reciprocal of 3 is −1/3."),
N("x-intercept of 2x + 5y = 10?","5","Set y=0: 2x=10 → x=5."),
N("Line through (1,4) with slope 2: find b.","2","4 = 2(1)+b → b=2.")
],
quiz:[
N("Slope through (−1, 2) and (3, 10)?","2","(10−2)/(3−(−1)) = 8/4 = 2."),
P("Which line has y-intercept 5 and slope −2?",["y = 5x − 2","y = −2x + 5","y = 2x + 5","y = −2x − 5"],1,"y = mx + b with m=−2, b=5."),
N("Line through (2,3) and (2,9). Its slope is undefined — enter the x-value of this vertical line.","2","Both points have x = 2, so x = 2 is a vertical line."),
P("Line perpendicular to y = (1/4)x + 3 has slope:",["1/4","4","−4","−1/4"],2,"Negative reciprocal of 1/4 is −4."),
N("y-intercept of 3x − y = 6?","-6","x=0 → −y=6 → y=−6."),
N("A taxi charges $3 plus $2 per mile. Cost for 7 miles ($)?","17","3 + 2×7 = 17.")
],
cards:[
C("Point notation","(x, y): x across, y up."),
C("Slope formula","m = (y₂−y₁)/(x₂−x₁) = rise/run."),
C("y = mx + b","m = slope, b = y-intercept (y when x=0)."),
C("Parallel lines","Same slope."),
C("Perpendicular lines","Negative reciprocal slopes; product = −1."),
C("Find x-intercept","Set y = 0 and solve. y-intercept: set x = 0."),
C("Slope 0 vs undefined","0 = horizontal line; undefined = vertical line.")
]},

/* 7 ============================================================= */
{id:"sys",em:"🔗",color:"#e0f7f4",title:"Systems of equations",tag:"Two equations, two unknowns. Substitution, elimination, and what the answer means.",
lessons:[
{id:"l1",t:"What a system is",mins:6,h:`
<p>One equation with two unknowns (like x + y = 5) has endless solutions. To pin down both x and y you need <strong>two</strong> equations that are true at the same time. That pair is a <strong>system</strong>.</p>
<p>Graphically, each equation is a line. The solution is the single point where the lines <strong>cross</strong>.</p>
<div class="tip"><b>Three possible outcomes.</b><br>• Lines cross once → one solution.<br>• Lines are parallel (never cross) → no solution.<br>• Same line → infinitely many solutions.</div>
`},
{id:"l2",t:"Substitution",mins:7,h:`
<p><strong>Substitution</strong> is best when one equation already has a variable alone (or is easy to isolate).</p>
<ol>
<li>Get one variable alone in one equation.</li>
<li>Plug that into the OTHER equation.</li>
<li>Solve for the one remaining variable, then back-substitute.</li>
</ol>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">y = 2x</span> and <span class="fx">x + y = 9</span>.<br>
Replace y with 2x in the second: x + 2x = 9 → 3x = 9 → x = 3.<br>
Then y = 2(3) = 6. Solution: <strong>(3, 6)</strong>.</div>
`},
{id:"l3",t:"Elimination",mins:8,h:`
<p><strong>Elimination</strong> shines when variables line up. Add or subtract the equations so one variable cancels.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">x + y = 5</span><br><span class="fx">x − y = 1</span><br>
Add them: the y's cancel → 2x = 6 → x = 3. Then 3 + y = 5 → y = 2. Solution <strong>(3, 2)</strong>.</div>
<h3>When you need to scale first</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">2x + 3y = 12</span><br><span class="fx">x − y = 1</span><br>
Multiply the second by 2: 2x − 2y = 2. Subtract from the first: 5y = 10 → y = 2. Then x = 3. <strong>(3, 2)</strong>.</div>
<div class="tip"><b>Recognizing "no solution" fast.</b> If the two lines have the same slope but different intercepts, they're parallel → no solution. If everything matches (same line) → infinitely many.</div>
<div class="trap"><b>Finish the job.</b> After you find x, always compute y (and vice-versa). SAT often asks for x + y or x − y, so you need both.</div>
`}
],
prac:[
N("y = x + 1 and y = 5. Find x.","4","5 = x + 1 → x = 4."),
N("Solve x + y = 10, x − y = 2. Find x.","6","Add: 2x=12 → x=6."),
N("From the previous system, find y.","4","6 + y = 10 → y = 4."),
N("y = 3x and 2x + y = 15. Find x.","3","2x + 3x = 15 → x = 3."),
N("2x + y = 7 and y = 1. Find x.","3","2x + 1 = 7 → x = 3."),
N("x + 2y = 8 and x = 2. Find y.","3","2 + 2y = 8 → y = 3."),
N("Solve 3x + 2y = 16 and x = 4. Find y.","2","12 + 2y = 16 → y = 2."),
N("x − y = 4 and x + y = 10. Find x + y … actually find x·? enter x.","7","Add: 2x=14 → x=7.")
],
quiz:[
N("Solve x + y = 12 and x − y = 4. Find y.","4","Subtract: 2y = 8 → y = 4."),
N("y = 2x − 3 and y = x + 1. Find x.","4","2x−3 = x+1 → x = 4."),
N("2x + 3y = 13 and y = 1. Find x.","5","2x + 3 = 13 → x = 5."),
P("Lines y = 2x + 1 and y = 2x − 4 have:",["one solution","no solution","infinite solutions","x=0"],1,"Same slope, different intercept = parallel = no solution."),
N("Solve 3x − y = 5 and x + y = 7. Find x.","3","Add: 4x = 12 → x = 3."),
N("From x=3 above, find y.","4","3 + y = 7 → y = 4.")
],
cards:[
C("What solves a system","The (x,y) point where both equations are true — where the lines cross."),
C("Substitution","Isolate one variable, plug into the other equation."),
C("Elimination","Add/subtract equations to cancel a variable; scale first if needed."),
C("No solution look","Same slope, different y-intercept (parallel lines)."),
C("Infinite solutions look","Both equations are the same line."),
C("Finish rule","Find both variables — SAT may ask for x+y or x−y.")
]},

/* 8 ============================================================= */
{id:"exp",em:"⚡",color:"#fff2cc",title:"Exponents, roots & scientific notation",tag:"Powers, their laws, square roots, and writing huge or tiny numbers.",
lessons:[
{id:"l1",t:"Exponents and their laws",mins:8,h:`
<p>An <strong>exponent</strong> counts repeated multiplication. <span class="fx">2⁴ = 2·2·2·2 = 16</span>. The 2 is the <strong>base</strong>, the 4 is the <strong>power</strong>.</p>
<h3>The laws (learn these cold)</h3>
<div class="fbox">aᵐ · aⁿ = aᵐ⁺ⁿ        (same base, multiply → add powers)
aᵐ ÷ aⁿ = aᵐ⁻ⁿ        (same base, divide → subtract powers)
(aᵐ)ⁿ = aᵐⁿ           (power of a power → multiply)
(ab)ⁿ = aⁿ bⁿ         (spread over a product)
a⁰ = 1                (anything to the 0 is 1)
a⁻ⁿ = 1/aⁿ            (negative power → reciprocal)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">(x³ · x⁴) / x²</span> = x⁷ / x² = <strong>x⁵</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">2⁻³</span> = 1/2³ = <strong>1/8</strong>.</div>
<div class="trap"><b>Don't multiply the base by the power.</b> 3² is 9, not 6. And (a²)³ = a⁶ (multiply), while a²·a³ = a⁵ (add).</div>
`},
{id:"l2",t:"Roots and fractional powers",mins:8,h:`
<p>A <strong>square root</strong> undoes squaring. <span class="fx">√25 = 5</span> because 5² = 25. A root is really a fractional exponent:</p>
<div class="fbox">√a = a^(1/2)        ∛a = a^(1/3)        a^(m/n) = ⁿ√(aᵐ)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">8^(2/3)</span> = (∛8)² = 2² = <strong>4</strong>. (Take the root first, then the power — smaller numbers.)</div>
<h3>Simplifying radicals</h3>
<p>Pull out perfect-square factors.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">√72</span> = √(36 · 2) = 6√2.</div>
<h3>Root rules</h3>
<div class="fbox">√(ab) = √a · √b        √(a/b) = √a / √b</div>
<div class="trap"><b>No breaking apart sums.</b> √(9 + 16) = √25 = 5, which is NOT √9 + √16 = 3 + 4 = 7. Roots don't split over addition.</div>
`},
{id:"l3",t:"Scientific notation",mins:6,h:`
<p><strong>Scientific notation</strong> writes very big or very small numbers as (a number between 1 and 10) × 10 to a power.</p>
<div class="fbox">3,200,000 = 3.2 × 10⁶        0.00047 = 4.7 × 10⁻⁴</div>
<ul>
<li>Big number → positive power (count how many places the dot moves left).</li>
<li>Tiny number → negative power (dot moves right).</li>
</ul>
<h3>Multiplying them</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">(3 × 10⁴)(2 × 10³)</span> = (3·2) × 10^(4+3) = <strong>6 × 10⁷</strong>. Multiply the fronts, add the powers.</div>
`}
],
prac:[
N("Compute 2⁵.","32","2·2·2·2·2 = 32."),
N("Simplify x⁴ · x³ (as x^n, enter n).","7","Add powers: 4+3 = 7."),
N("Simplify (x²)⁵ (enter n for x^n).","10","Multiply powers: 2×5 = 10."),
N("Compute 5⁰.","1","Anything to the 0 power is 1."),
N("Compute 3⁻²  (as a fraction).","1/9","3⁻² = 1/3² = 1/9."),
N("Compute √64.","8","8² = 64."),
N("Simplify √50 as a√b: enter a.","5","√25·2 = 5√2, so a = 5."),
N("Compute 16^(1/2).","4","Square root of 16 = 4.")
],
quiz:[
N("Compute (x⁶)/(x²) (enter n for x^n).","4","Subtract powers: 6−2 = 4."),
N("Compute 27^(2/3).","9","(∛27)² = 3² = 9."),
P("√(16 + 9) equals:",["7","5","25","√7"],1,"√25 = 5, not 4+3."),
N("Write 45,000 as 4.5 × 10^n. Enter n.","4","Dot moves 4 places left."),
N("Compute (2×10³)(4×10²) → a×10^n, enter a.","8","2·4=8, powers 3+2=5 → 8×10⁵."),
N("Compute 2⁻¹ + 2⁻² (as a fraction).","3/4","1/2 + 1/4 = 3/4.")
],
cards:[
C("aᵐ · aⁿ","= aᵐ⁺ⁿ (same base → add powers)."),
C("(aᵐ)ⁿ","= aᵐⁿ (power of a power → multiply)."),
C("a⁰","= 1 for any nonzero a."),
C("a⁻ⁿ","= 1/aⁿ (negative power = reciprocal)."),
C("√a as a power","a^(1/2). And a^(m/n) = ⁿ√(aᵐ)."),
C("√(a+b)","does NOT equal √a + √b."),
C("Scientific notation ×","Multiply the fronts, add the powers of 10.")
]},

/* 9 ============================================================= */
{id:"quad",em:"🎢",color:"#ffe0d6",title:"Polynomials & quadratics",tag:"Multiplying, factoring, the quadratic formula, and parabolas.",
lessons:[
{id:"l1",t:"FOIL and factoring",mins:9,h:`
<p>A <strong>polynomial</strong> is a sum of terms like <span class="fx">3x² − 5x + 2</span>. To multiply two brackets, use <strong>FOIL</strong> — First, Outer, Inner, Last.</p>
<div class="eg"><div class="lab">EXAMPLE — FOIL</div>
<span class="fx">(x + 3)(x + 4)</span><br>
First: x·x = x². Outer: x·4 = 4x. Inner: 3·x = 3x. Last: 3·4 = 12.<br>
= x² + 4x + 3x + 12 = <strong>x² + 7x + 12</strong>.</div>
<h3>Factoring: FOIL in reverse</h3>
<p>To factor <span class="fx">x² + 7x + 12</span>, find two numbers that <strong>multiply to 12</strong> and <strong>add to 7</strong> → that's 3 and 4. So it factors to <span class="fx">(x + 3)(x + 4)</span>.</p>
<h3>Patterns to memorize</h3>
<div class="fbox">(a + b)² = a² + 2ab + b²
(a − b)² = a² − 2ab + b²
(a + b)(a − b) = a² − b²   ← difference of squares</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Factor <span class="fx">x² − 25</span> → difference of squares → <strong>(x + 5)(x − 5)</strong>.</div>
<div class="trap"><b>(a + b)² ≠ a² + b².</b> The middle term 2ab is always there. (x+3)² = x² + 6x + 9.</div>
`},
{id:"l2",t:"Solving quadratics",mins:9,h:`
<p>A <strong>quadratic equation</strong> looks like <span class="fx">ax² + bx + c = 0</span>. It can have two, one, or no real solutions. Three ways to solve:</p>
<h3>1. Factoring (fastest when it works)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">x² − 5x + 6 = 0</span> → (x − 2)(x − 3) = 0. A product is zero only if a factor is zero, so <strong>x = 2 or x = 3</strong>.</div>
<div class="tip"><b>Zero-product rule.</b> If A·B = 0, then A = 0 or B = 0. This is why factoring solves quadratics.</div>
<h3>2. The quadratic formula (always works)</h3>
<div class="fbox">x = ( −b ± √(b² − 4ac) ) / (2a)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">x² − 5x + 6 = 0</span>: a=1, b=−5, c=6. Discriminant = 25 − 24 = 1.<br>
x = (5 ± 1)/2 → x = 3 or x = 2.</div>
<h3>The discriminant tells you how many solutions</h3>
<div class="fbox">D = b² − 4ac</div>
<ul>
<li>D &gt; 0 → two real solutions</li>
<li>D = 0 → one solution (repeated)</li>
<li>D &lt; 0 → no real solutions</li>
</ul>
<div class="trap"><b>Don't forget the ±.</b> The formula gives two answers. And divide the whole top by 2a.</div>
`},
{id:"l3",t:"Parabolas: the U-shaped graph",mins:8,h:`
<p>The graph of <span class="fx">y = ax² + bx + c</span> is a <strong>parabola</strong> — a smooth U (or upside-down U). It models thrown balls, profit curves, and more.</p>
<ul>
<li>If <strong>a &gt; 0</strong> the U opens up (has a lowest point / minimum).</li>
<li>If <strong>a &lt; 0</strong> it opens down (highest point / maximum).</li>
</ul>
<h3>Key features</h3>
<ul>
<li><strong>Roots / x-intercepts / zeros:</strong> where it crosses the x-axis (the solutions of ax²+bx+c=0).</li>
<li><strong>Vertex:</strong> the turning point. Its x-value is <span class="fx">x = −b/(2a)</span>; plug that in to get the y-value.</li>
<li><strong>Axis of symmetry:</strong> the vertical line through the vertex.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
<span class="fx">y = x² − 6x + 5</span>. Vertex x = 6/2 = 3; y = 9 − 18 + 5 = −4. Vertex = (3, −4). Roots: (x−1)(x−5)=0 → x = 1 and 5.</div>
<h3>Vertex form</h3>
<div class="fbox">y = a(x − h)² + k   → vertex is (h, k)</div>
<div class="tip"><b>Reading a word problem.</b> "Maximum height" = the y of the vertex. "When does it hit the ground" = the positive root (y = 0).</div>
`}
],
prac:[
N("Expand (x + 2)(x + 5) → x² + bx + c, enter b.","7","Outer+Inner = 5x + 2x = 7x."),
N("Factor x² + 8x + 15 = (x+a)(x+b). Enter the smaller of a,b.","3","3·5=15, 3+5=8."),
P("Factor x² − 49:",["(x−7)²","(x+7)(x−7)","(x−49)(x+1)","can't factor"],1,"Difference of squares."),
N("Solve x² − 9 = 0, positive root.","3","x² = 9 → x = ±3."),
N("Solve (x − 4)(x + 1) = 0, larger root.","4","x = 4 or −1."),
N("For x² − 5x + 6 = 0, product of roots (c/a).","6","Roots 2 and 3 → 2×3 = 6."),
N("Vertex x-value of y = x² − 8x + 3.","4","−b/2a = 8/2 = 4."),
P("y = −2x² + 5 opens:",["up","down","sideways","it's a line"],1,"a = −2 < 0, opens down.")
],
quiz:[
N("Expand (x − 3)² → x² + bx + c, enter b.","-6","−2·3 = −6 (middle term)."),
N("Solve x² − 7x + 12 = 0, larger root.","4","(x−3)(x−4)=0 → 3 or 4."),
P("Discriminant of x² + 2x + 5 tells us there are:",["2 real roots","1 real root","0 real roots","3 roots"],2,"D = 4 − 20 = −16 < 0 → no real roots."),
N("Vertex x of y = 2x² − 12x + 1.","3","−(−12)/(2·2) = 12/4 = 3."),
N("Using the formula for x² − 4x + 3 = 0, smaller root.","1","D=4, x=(4±2)/2 → 3 or 1."),
P("A ball's height h = −5t² + 20t. Max height is at t =",["1","2","4","5"],1,"Vertex t = −20/(2·−5) = 2.")
],
cards:[
C("FOIL","(a+b)(c+d): First, Outer, Inner, Last, then combine."),
C("Difference of squares","a² − b² = (a+b)(a−b)."),
C("(a+b)²","= a² + 2ab + b². The 2ab is always there."),
C("Zero-product rule","If A·B = 0 then A = 0 or B = 0."),
C("Quadratic formula","x = (−b ± √(b²−4ac)) / (2a)."),
C("Discriminant b²−4ac","+ → 2 roots, 0 → 1 root, − → no real roots."),
C("Vertex x-value","x = −b/(2a); plug in for the y."),
C("a in ax²+bx+c","a>0 opens up (min), a<0 opens down (max).")
]},

/* 10 ============================================================= */
{id:"func",em:"🎛️",color:"#e7e0ff",title:"Functions & graphs",tag:"Function notation, reading graphs, and moving them around.",
lessons:[
{id:"l1",t:"Function notation f(x)",mins:7,h:`
<p>A <strong>function</strong> is a machine: put a number in, get exactly one number out. We write it <span class="fx">f(x)</span>, read "f of x". It does NOT mean f times x.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
If <span class="fx">f(x) = 2x² − 3</span>, then <span class="fx">f(−2)</span> means "put −2 where x is": 2(−2)² − 3 = 2·4 − 3 = <strong>5</strong>.</div>
<h3>Reading it backwards</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
If f(x) = 3x + 1 and f(x) = 10, find x. Set 3x + 1 = 10 → x = 3.</div>
<h3>On a graph</h3>
<p><span class="fx">f(3) = 7</span> means the point (3, 7) is on the graph. To find f(3) from a graph: go to x = 3, read the height.</p>
<div class="tip"><b>Composition.</b> f(g(x)) means do g first, then feed the result into f. Work from the inside out.</div>
`},
{id:"l2",t:"Domain, range & reading graphs",mins:7,h:`
<p><strong>Domain</strong> = all the x-values you're allowed to put in. <strong>Range</strong> = all the y-values that come out.</p>
<h3>What to watch on graphs</h3>
<ul>
<li><strong>x-intercepts (zeros):</strong> where the curve crosses the x-axis (y = 0).</li>
<li><strong>y-intercept:</strong> where it crosses the y-axis (x = 0).</li>
<li><strong>Increasing / decreasing:</strong> going up or down as you move right.</li>
<li><strong>Maximum / minimum:</strong> highest or lowest points.</li>
</ul>
<div class="tip"><b>Vertical line test.</b> A graph is a function only if no vertical line hits it twice — each input has one output.</div>
<h3>Two graphs meeting</h3>
<p>Where two graphs cross, the functions are equal. That's how you solve f(x) = g(x) visually — find the x of the crossing point.</p>
`},
{id:"l3",t:"Transformations: sliding & flipping",mins:8,h:`
<p>Small changes to a function move its graph in predictable ways. Start from y = f(x):</p>
<div class="fbox">f(x) + k   → up k        f(x) − k   → down k
f(x + h)   → LEFT h      f(x − h)   → RIGHT h
−f(x)      → flip over x-axis
a·f(x)     → stretch taller (a>1) or squash (0 &lt; a &lt; 1)</div>
<div class="trap"><b>Inside the bracket goes the opposite way.</b> f(x − 3) moves the graph RIGHT 3, even though it looks like minus. Horizontal shifts are backwards.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
If the graph of y = x² is shifted right 2 and up 1, the new equation is y = (x − 2)² + 1, with vertex (2, 1).</div>
<div class="tip"><b>Outside = vertical & normal direction. Inside = horizontal & reversed.</b> That single sentence covers every transformation question.</div>
`}
],
prac:[
N("If f(x) = 3x − 4, find f(5).","11","3·5 − 4 = 11."),
N("If f(x) = x² + 1, find f(−3).","10","9 + 1 = 10."),
N("If f(x) = 2x + 1 and f(x) = 9, find x.","4","2x = 8 → x = 4."),
N("If f(x)=x−1 and g(x)=2x, find f(g(3)).","5","g(3)=6, f(6)=5."),
P("f(x) shifted up 4 is:",["f(x+4)","f(x)+4","f(x−4)","f(x)−4"],1,"Adding outside moves up."),
P("y = (x + 3)² moves y = x²:",["right 3","left 3","up 3","down 3"],1,"Inside +3 shifts LEFT 3."),
N("If f(x) = 5, and this is a horizontal line, what is f(100)?","5","Constant function — always 5."),
N("Point (2, 7) is on y=f(x). What is f(2)?","7","f(2) is the y at x=2.")
],
quiz:[
N("If f(x) = x² − 2x, find f(4).","8","16 − 8 = 8."),
N("If g(x) = 4 − x and g(x) = 10, find x.","-6","4 − x = 10 → x = −6."),
P("The graph of y = f(x) − 5 is y = f(x):",["up 5","down 5","left 5","right 5"],1,"Subtracting outside → down."),
P("y = (x − 4)² has its vertex at:",["(4, 0)","(−4, 0)","(0, 4)","(0, −4)"],0,"Right 4, so vertex (4, 0)."),
N("If f(x)=2x and g(x)=x+3, find g(f(2)).","7","f(2)=4, g(4)=7."),
P("A vertical line crosses a graph twice. The graph is:",["a function","not a function","linear","increasing"],1,"Fails the vertical line test.")
],
cards:[
C("f(x) means","'f of x' — plug x into the rule. NOT f times x."),
C("f(3) = 7 on a graph","The point (3, 7) is on the graph."),
C("Domain / Range","Domain = allowed inputs (x). Range = outputs (y)."),
C("Vertical line test","A graph is a function if no vertical line hits it twice."),
C("f(x) + k","Shifts graph up by k (down if −k)."),
C("f(x − h)","Shifts graph RIGHT by h (inside is reversed)."),
C("−f(x)","Flips the graph over the x-axis."),
C("f(g(x))","Do g first, then f — inside out.")
]},

/* 11 ============================================================= */
{id:"advm",em:"🚀",color:"#dcefff",title:"Advanced math extras",tag:"Exponential growth, rational expressions, and complex numbers — the tricky bonus topics.",
lessons:[
{id:"l1",t:"Exponential growth & decay",mins:8,h:`
<p>When something grows or shrinks by a <em>percentage</em> each step (not a fixed amount), it's <strong>exponential</strong>. The variable sits in the exponent.</p>
<div class="fbox">final = start · (rate)^time</div>
<ul>
<li>Growth by r%: base = <span class="fx">1 + r/100</span> (e.g. +5% → ×1.05)</li>
<li>Decay by r%: base = <span class="fx">1 − r/100</span> (e.g. −5% → ×0.95)</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
$1000 earns 5% per year. After 3 years: 1000 · (1.05)³ ≈ <strong>$1157.63</strong>.</div>
<div class="tip"><b>Linear vs exponential.</b> "Increases by 20 each year" = linear (add). "Increases by 20% each year" = exponential (multiply). Spotting which is which is a classic SAT question.</div>
<div class="eg"><div class="lab">EXAMPLE — reading a model</div>
In P = 500·(2)^(t/3), the population starts at 500 and <em>doubles</em> every 3 units of time.</div>
`},
{id:"l2",t:"Rational expressions",mins:7,h:`
<p>A <strong>rational expression</strong> is a fraction with variables, like <span class="fx">(x² − 9)/(x − 3)</span>. Handle it exactly like a normal fraction — but factor first, and note where the bottom would be zero.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Simplify <span class="fx">(x² − 9)/(x − 3)</span>. Factor top: (x−3)(x+3). Cancel the (x−3): answer <strong>x + 3</strong> (for x ≠ 3).</div>
<div class="trap"><b>Only cancel factors, never terms.</b> In (x + 2)/2 you cannot cancel the 2's — the top is a sum, not a product.</div>
<h3>Undefined points</h3>
<p>A fraction is undefined when its denominator is 0. For <span class="fx">1/(x − 4)</span>, x = 4 is not allowed.</p>
`},
{id:"l3",t:"Complex numbers (just the basics)",mins:6,h:`
<p>There's no real number whose square is negative — so mathematicians invented one: <span class="fx">i</span>, where <span class="fx">i² = −1</span>. A <strong>complex number</strong> looks like <span class="fx">a + bi</span>.</p>
<h3>The only rules you need for the SAT</h3>
<div class="fbox">i² = −1        i = √(−1)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Simplify <span class="fx">(2 + 3i) + (4 − i)</span>. Add real parts and imaginary parts separately: 6 + 2i.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Multiply <span class="fx">(2 + 3i)(1 − i)</span> with FOIL: 2 − 2i + 3i − 3i² = 2 + i − 3(−1) = <strong>5 + i</strong>. (Replace i² with −1.)</div>
<div class="tip"><b>The whole trick</b> is: treat i like a variable, then swap i² for −1 at the end.</div>
`}
],
prac:[
N("$200 grows 10% per year. Value after 2 years ($).","242","200·1.1² = 242."),
P("'A savings account grows 3% yearly' is:",["linear","exponential","constant","negative"],1,"Percent growth → exponential."),
N("Population P = 100·2^t. Value at t = 3.","800","100·8 = 800."),
N("Simplify (x²−4)/(x−2). Answer as x+? enter the number.","2","(x−2)(x+2)/(x−2) = x+2."),
P("1/(x − 5) is undefined when x =",["0","5","−5","1"],1,"Denominator zero at x = 5."),
N("Compute i². ","-1","By definition i² = −1."),
P("(3 + 2i) + (1 + 4i) =",["4 + 6i","3 + 8i","4 + 2i","6 + 4i"],0,"Add reals (4) and imaginaries (6i)."),
N("A car worth $20000 loses 10%/yr. Value after 1 yr ($).","18000","20000·0.9 = 18000.")
],
quiz:[
N("$500 at 4% yearly for 2 years ($, round to cent).","540.80","500·1.04² = 540.80."),
P("Which grows fastest long-term?",["+50 each year","×1.5 each year","+100 each year","stays same"],1,"Multiplying (exponential) overtakes any fixed addition."),
N("Simplify (x²−16)/(x+4) → x−? enter the number.","4","(x+4)(x−4)/(x+4) = x−4."),
P("(2 + i)(3 − i) equals:",["6 − i","7 + i","5 + i","6 + i"],1,"6 −2i +3i −i² = 6 + i +1 = 7 + i."),
P("x/(x²−9) is undefined at:",["x = 3 only","x = −3 only","x = 3 and −3","never"],2,"x²−9=0 at ±3."),
N("Model N = 80·(0.5)^t. Value at t = 2.","20","80·0.25 = 20.")
],
cards:[
C("Exponential model","final = start · (base)^time. +r% → ×(1+r/100)."),
C("Linear vs exponential","Adds a fixed amount = linear. Grows by % = exponential."),
C("Simplify rational expr","Factor, then cancel FACTORS (never terms)."),
C("Undefined fraction","When the denominator = 0."),
C("i² = ?","−1. That's the whole idea of imaginary numbers."),
C("Multiply complex","FOIL, then replace i² with −1.")
]},

/* 12 ============================================================= */
{id:"data",em:"📊",color:"#e0f2e9",title:"Data & statistics",tag:"Averages, spread, and reading charts — the 'Problem-Solving & Data Analysis' domain.",
lessons:[
{id:"l1",t:"Mean, median, mode & range",mins:8,h:`
<p>These summarize a list of numbers with a single value (a "center") or describe the spread.</p>
<ul>
<li><strong>Mean (average):</strong> add them all, divide by how many. <span class="fx">mean = sum ÷ count</span>.</li>
<li><strong>Median:</strong> the middle value when sorted. (If two are in the middle, average them.)</li>
<li><strong>Mode:</strong> the value that appears most often.</li>
<li><strong>Range:</strong> biggest − smallest.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
Data: 2, 4, 4, 6, 9. Mean = 25/5 = 5. Sorted middle = 4 (median). Mode = 4. Range = 9 − 2 = 7.</div>
<div class="tip"><b>The reverse trick.</b> If the mean of 5 numbers is 10, the total is 5 × 10 = 50. SAT loves "find the missing value" — use total = mean × count.</div>
<div class="trap"><b>Outliers.</b> One huge value drags the MEAN a lot but barely moves the MEDIAN. That's why median is "resistant".</div>
`},
{id:"l2",t:"Spread, standard deviation & reading charts",mins:8,h:`
<p><strong>Standard deviation</strong> measures how spread out data is. You won't calculate it by hand on the SAT — you just need the idea:</p>
<ul>
<li>Numbers clustered close together → <strong>small</strong> standard deviation.</li>
<li>Numbers spread far apart → <strong>large</strong> standard deviation.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
{50, 50, 50, 50} has SD = 0 (no spread). {10, 30, 70, 90} has a large SD.</div>
<h3>Reading tables & graphs</h3>
<p>Half the data questions are just careful reading. Steps that avoid mistakes:</p>
<ul>
<li>Read the <strong>title and axis labels</strong> first — including the units.</li>
<li>Note the <strong>scale</strong> (do gridlines go up by 1, 5, 100?).</li>
<li>For "how many more" questions, read both bars and subtract.</li>
</ul>
<h3>Line of best fit</h3>
<p>A scatterplot's <strong>best-fit line</strong> shows the trend. Its slope = the rate of change; you can use it to predict values, and its equation is read like any y = mx + b.</p>
`},
{id:"l3",t:"Percentages in data & surveys",mins:6,h:`
<p>Two ideas the SAT tests constantly with tables and surveys:</p>
<h3>Part of a whole</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
In a table, 45 of 180 people chose "yes". Fraction = 45/180 = 1/4 = <strong>25%</strong>.</div>
<h3>Making a sample stand for a population</h3>
<p>If a random sample shows a rate, you can scale it up to estimate the whole group — but only if the sample was <strong>random</strong>.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
In a random sample of 200 voters, 120 support a plan (60%). In a city of 50,000 voters, estimate 60% × 50,000 = <strong>30,000</strong> supporters.</div>
<div class="trap"><b>Bad samples give bad estimates.</b> If a survey only asks people leaving a gym about exercise habits, you can't trust it for the whole city. SAT asks you to spot this bias.</div>
`}
],
prac:[
N("Mean of 3, 7, 8, 10, 12.","8","Sum 40 ÷ 5 = 8."),
N("Median of 5, 2, 9, 4, 7 (sort first).","5","Sorted 2,4,5,7,9 → middle 5."),
N("Mode of 4, 6, 6, 7, 9, 6.","6","6 appears most."),
N("Range of 12, 5, 20, 8.","15","20 − 5 = 15."),
N("Five test scores average 82. Total points?","410","82 × 5 = 410."),
N("Four numbers average 10; three are 8,9,12. The fourth?","11","Total 40 − 29 = 11."),
N("Of 250 people, 100 said yes. Percent yes?","40","100/250 = 40%."),
N("Median of 4, 8, 10, 20 (even count).","9","Average middle two: (8+10)/2 = 9.")
],
quiz:[
N("Mean of 6, 6, 12, 16.","10","40 ÷ 4 = 10."),
N("A student has 88, 92, 79. What score makes the mean exactly 87?","89","Need total 348; have 259; 348−259 = 89."),
P("Adding one very large outlier mostly changes the:",["median","mode","mean","range only"],2,"Mean is pulled by outliers; median resists."),
P("Data {20,20,21,19} vs {2,40,10,30}. Which has larger SD?",["first","second","equal","can't tell"],1,"Second set is far more spread out."),
N("In a random sample of 300, 90 prefer tea (30%). Estimate for 4000 people.","1200","0.30 × 4000 = 1200."),
P("A survey only at a coffee shop about coffee is likely:",["random","unbiased","biased","perfect"],2,"The location skews who is asked — biased sample.")
],
cards:[
C("Mean","Sum ÷ count. Reverse: total = mean × count."),
C("Median","Middle value when sorted (average the two middle if even)."),
C("Mode","Most frequent value."),
C("Range","Largest − smallest."),
C("Outlier effect","Big change to the mean, little to the median."),
C("Standard deviation","Small = data close together; large = spread out."),
C("Sample → population","Scale the sample rate up, but only if the sample is random.")
]},

/* 13 ============================================================= */
{id:"prob",em:"🎲",color:"#f0e0ff",title:"Probability & counting",tag:"How likely something is, and how to count possibilities without listing them.",
lessons:[
{id:"l1",t:"Basic probability",mins:7,h:`
<p><strong>Probability</strong> is a number from 0 (impossible) to 1 (certain) telling how likely an event is.</p>
<div class="fbox">P(event) = (favourable outcomes) / (total outcomes)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Roll a die. P(rolling a 4) = 1/6. P(rolling an even number) = 3/6 = 1/2 (three evens: 2,4,6).</div>
<h3>The "not" shortcut</h3>
<div class="fbox">P(not A) = 1 − P(A)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
If P(rain) = 0.3, then P(no rain) = 1 − 0.3 = 0.7.</div>
<h3>Reading probability from a table</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
A table shows 120 students; 30 play chess. P(a random student plays chess) = 30/120 = <strong>1/4</strong>.</div>
`},
{id:"l2",t:"Combined events & counting",mins:8,h:`
<h3>AND (both happen) → multiply</h3>
<p>For independent events, multiply the probabilities.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Two coins both land heads: P = 1/2 × 1/2 = <strong>1/4</strong>.</div>
<h3>The counting principle</h3>
<p>If one choice has m options and the next has n options, together there are <strong>m × n</strong> combinations.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
3 shirts and 4 pants → 3 × 4 = <strong>12</strong> outfits.</div>
<h3>Conditional probability (given)</h3>
<p>"P(A given B)" narrows the total to only the B group first.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
From a table, of 50 girls, 20 play sport. P(plays sport | girl) = 20/50 = <strong>2/5</strong>. The word "given" tells you which row/column is the new whole.</div>
<div class="tip"><b>SAT reality.</b> Most SAT probability is just reading a two-way table and forming a fraction. Find the right numerator and the right total.</div>
`}
],
prac:[
N("P(rolling a 3 on a die), as a fraction.","1/6","One favourable of six."),
N("P(drawing a red card from a standard 52-card deck).","1/2","26 red of 52."),
P("If P(win) = 0.4, then P(lose) =",["0.4","0.6","1.4","0.04"],1,"1 − 0.4 = 0.6."),
N("Two dice both show 6. Probability (fraction).","1/36","1/6 × 1/6."),
N("5 hats and 3 scarves. How many combinations?","15","5 × 3 = 15."),
N("Bag: 3 red, 2 blue. P(red), fraction.","3/5","3 of 5 total."),
N("Of 80 people, 20 like tea. P(likes tea), fraction.","1/4","20/80 = 1/4."),
P("A coin flip then a die roll: total outcomes?",["8","12","6","2"],1,"2 × 6 = 12.")
],
quiz:[
N("P(even number on a die), fraction.","1/2","2,4,6 → 3/6."),
N("P(NOT rolling a 1), fraction.","5/6","1 − 1/6 = 5/6."),
N("Spinner lands red with P=0.25 twice in a row. P?","0.0625","0.25 × 0.25 = 0.0625."),
N("4 appetizers, 3 mains, 2 desserts. Meals possible?","24","4 × 3 × 2 = 24."),
P("Table: 40 boys, 25 play music. P(plays music | boy) =",["25/40","40/25","25/65","15/40"],0,"Among boys only: 25/40."),
N("Bag has 6 marbles, 2 green. P(green) as a fraction.","1/3","2/6 = 1/3.")
],
cards:[
C("Probability formula","favourable ÷ total. Between 0 and 1."),
C("P(not A)","= 1 − P(A)."),
C("AND (independent)","Multiply the probabilities."),
C("Counting principle","m choices then n choices = m × n total."),
C("P(A | B) 'given'","Restrict to the B group, then form the fraction."),
C("Two-way tables","Most SAT probability = pick the right number over the right total.")
]},

/* 14 ============================================================= */
{id:"geo1",em:"📐",color:"#ffe8cc",title:"Geometry: angles & triangles",tag:"Lines, angles, the triangle rules, Pythagoras and special triangles.",
lessons:[
{id:"l1",t:"Angles & lines",mins:7,h:`
<p>Angles are measured in degrees. A few facts unlock most angle problems:</p>
<ul>
<li>A straight line = <strong>180°</strong>. Angles on a line add to 180° (supplementary).</li>
<li>A full turn = <strong>360°</strong>.</li>
<li>A right angle = <strong>90°</strong> (complementary angles add to 90°).</li>
<li><strong>Vertical angles</strong> (opposite each other at a crossing) are equal.</li>
</ul>
<h3>Parallel lines cut by a line</h3>
<p>When a line crosses two parallel lines, it makes pairs of equal angles.</p>
<ul>
<li><strong>Corresponding</strong> and <strong>alternate</strong> angles are equal.</li>
<li><strong>Co-interior</strong> (same-side) angles add to 180°.</li>
</ul>
<div class="tip"><b>The two-value shortcut.</b> With parallel lines, every angle is either equal to a given angle or is its "180° minus" partner. Only two numbers exist in the whole picture.</div>
`},
{id:"l2",t:"Triangle rules",mins:8,h:`
<ul>
<li>The three angles of any triangle add to <strong>180°</strong>.</li>
<li><strong>Isosceles:</strong> two equal sides → the angles opposite them are equal too.</li>
<li><strong>Equilateral:</strong> all sides equal → all angles 60°.</li>
<li>An <strong>exterior angle</strong> equals the sum of the two far interior angles.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
Two angles are 50° and 60°. Third = 180 − 110 = <strong>70°</strong>.</div>
<h3>Area & perimeter</h3>
<div class="fbox">Area = ½ · base · height        Perimeter = sum of all sides</div>
<h3>Similar triangles</h3>
<p>Same shape, different size → matching sides are in the same ratio. Set up a proportion to find a missing side.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Similar triangles: small has sides 3, 4; big has matching 6, ?. Ratio is 2×, so ? = 8.</div>
`},
{id:"l3",t:"Pythagoras & special right triangles",mins:9,h:`
<p>In a <strong>right triangle</strong> (one 90° angle), the sides obey:</p>
<div class="fbox">a² + b² = c²   (c is the hypotenuse, the longest side, opposite the right angle)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Legs 6 and 8. Hypotenuse = √(36 + 64) = √100 = <strong>10</strong>.</div>
<h3>Pythagorean triples (memorize)</h3>
<p>Side sets that always work — spotting them saves time: <strong>3-4-5</strong>, <strong>5-12-13</strong>, <strong>8-15-17</strong>, and their multiples (like 6-8-10).</p>
<h3>The two special triangles (on the SAT formula sheet)</h3>
<div class="fbox">45°–45°–90°:  sides  x : x : x√2
30°–60°–90°:  sides  x : x√3 : 2x</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A 45-45-90 triangle with legs 5 has hypotenuse 5√2. A 30-60-90 with short leg 4 has sides 4, 4√3, 8.</div>
<div class="trap"><b>Hypotenuse is always the longest side</b> and sits opposite the right angle. Don't plug a leg in where c belongs.</div>
`}
],
prac:[
N("Two angles on a straight line: one is 130°. The other?","50","180 − 130 = 50."),
N("Triangle angles 40° and 75°. Third?","65","180 − 115 = 65."),
N("Equilateral triangle: each angle?","60","180 ÷ 3 = 60."),
N("Right triangle legs 3 and 4. Hypotenuse?","5","3-4-5 triple."),
N("Right triangle legs 5 and 12. Hypotenuse?","13","5-12-13 triple."),
N("Isosceles triangle with apex 40°. Each base angle?","70","(180−40)/2 = 70."),
N("Area of triangle base 10, height 6.","30","½·10·6 = 30."),
P("45-45-90 triangle, legs 7. Hypotenuse:",["7","14","7√2","7√3"],2,"Multiply leg by √2.")
],
quiz:[
N("Vertical angle to a 63° angle?","63","Vertical angles are equal."),
N("Triangle with angles x, x, and 80° (isosceles). Find x.","50","2x = 100 → x = 50."),
N("Right triangle legs 8 and 15. Hypotenuse?","17","8-15-17 triple."),
P("30-60-90 triangle, short leg 6. The hypotenuse is:",["6","6√3","12","12√3"],2,"Hypotenuse = 2 × short leg = 12."),
N("Parallel lines, a co-interior angle is 110°. Its partner?","70","Co-interior add to 180 → 70."),
N("Similar triangles scale ×3. A side of 5 becomes?","15","5 × 3 = 15.")
],
cards:[
C("Angles on a line","Add to 180°."),
C("Triangle angle sum","Always 180°."),
C("Vertical angles","Equal (opposite angles at a crossing)."),
C("Pythagorean theorem","a² + b² = c², c = hypotenuse (opposite the right angle)."),
C("Common triples","3-4-5, 5-12-13, 8-15-17 (and multiples)."),
C("45-45-90 sides","x : x : x√2."),
C("30-60-90 sides","x : x√3 : 2x (short : long : hypotenuse)."),
C("Triangle area","½ × base × height."),
C("Similar triangles","Matching sides share one ratio — use a proportion.")
]},

/* 15 ============================================================= */
{id:"geo2",em:"⭕",color:"#d6f0ff",title:"Geometry: circles, area & volume",tag:"Circles, common area formulas, 3D volume, and the tricky arc/sector bits.",
lessons:[
{id:"l1",t:"Circles",mins:8,h:`
<p>A circle's size comes from its <strong>radius</strong> r (center to edge). The <strong>diameter</strong> d = 2r crosses the whole circle.</p>
<div class="fbox">Circumference (perimeter) = 2πr = πd
Area = πr²</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Radius 5: circumference = 2π·5 = 10π ≈ 31.4; area = π·25 = 25π ≈ 78.5.</div>
<h3>Arcs & sectors (a slice)</h3>
<p>A slice of the circle is a fraction of the whole, set by its central angle out of 360°.</p>
<div class="fbox">arc length = (angle/360) · 2πr
sector area = (angle/360) · πr²</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A 90° slice of a circle with r = 4 is 90/360 = 1/4 of it. Sector area = ¼·π·16 = <strong>4π</strong>.</div>
<h3>Circle equation</h3>
<div class="fbox">(x − h)² + (y − k)² = r²   → center (h, k), radius r</div>
<div class="eg"><div class="lab">EXAMPLE</div>
(x − 2)² + (y + 3)² = 25 → center (2, −3), radius √25 = 5.</div>
`},
{id:"l2",t:"Area & perimeter of common shapes",mins:7,h:`
<div class="fbox">Rectangle:   Area = length × width,   Perimeter = 2(l + w)
Square:      Area = s²,               Perimeter = 4s
Triangle:    Area = ½ · base · height
Parallelogram: Area = base × height
Trapezoid:   Area = ½ (b₁ + b₂) · height</div>
<div class="tip"><b>Composite shapes.</b> For an odd shape, split it into rectangles and triangles, find each area, then add (or subtract a hole).</div>
<div class="eg"><div class="lab">EXAMPLE</div>
An L-shape = big rectangle minus a small missing corner rectangle. Compute both, subtract.</div>
`},
{id:"l3",t:"Volume & surface area (3D)",mins:8,h:`
<p><strong>Volume</strong> is the space inside a solid (cubic units). For any "box-like" prism or cylinder, volume = base area × height.</p>
<div class="fbox">Box (rectangular prism): V = length × width × height
Cube: V = s³
Cylinder: V = πr² · h   (circle area × height)
Sphere: V = (4/3)πr³
Cone: V = (1/3)πr² h</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Cylinder radius 3, height 10: V = π·9·10 = <strong>90π</strong> ≈ 283.</div>
<div class="tip"><b>On the SAT the harder volume formulas are given</b> at the start of the section. You mainly need to plug in carefully and keep π symbolic unless told to round.</div>
<div class="trap"><b>Units.</b> Area is squared (cm²), volume is cubed (cm³). Watch what the question wants.</div>
`}
],
prac:[
N("Circumference of a circle radius 7, as a multiple of π (enter the number before π).","14","2π·7 = 14π."),
N("Area of a circle radius 6, as multiple of π.","36","π·6² = 36π."),
N("Area of rectangle 8 by 5.","40","8 × 5 = 40."),
N("Perimeter of a square with side 9.","36","4 × 9 = 36."),
N("Volume of a box 2 × 3 × 4.","24","2·3·4 = 24."),
N("Volume of a cube side 5.","125","5³ = 125."),
N("A 90° sector of a circle is what fraction of it?","1/4","90/360 = 1/4."),
N("Circle (x−1)²+(y−2)²=49. Radius?","7","√49 = 7.")
],
quiz:[
N("Area of a circle diameter 10, as multiple of π.","25","r = 5, area = 25π."),
N("Volume of a cylinder r=2, h=5, as multiple of π.","20","π·4·5 = 20π."),
N("Area of a triangle base 12, height 7.","42","½·12·7 = 42."),
N("A trapezoid, parallel sides 6 and 10, height 4. Area?","32","½(6+10)·4 = 32."),
P("Center of (x+4)² + (y−1)² = 9:",["(4, −1)","(−4, 1)","(4, 1)","(−4, −1)"],1,"Signs flip: (−4, 1)."),
N("Sector area, 60° slice of circle r=6, as multiple of π.","6","(60/360)·36π = 6π.")
],
cards:[
C("Circle circumference","2πr = πd."),
C("Circle area","πr²."),
C("Arc / sector","Multiply the whole by (central angle ÷ 360)."),
C("Circle equation","(x−h)² + (y−k)² = r²; center (h,k), radius r."),
C("Rectangle area / perimeter","A = lw; P = 2(l+w)."),
C("Trapezoid area","½(b₁+b₂)·height."),
C("Box volume","length × width × height."),
C("Cylinder volume","πr²h (base circle × height)."),
C("Units","Area is squared; volume is cubed.")
]},

/* 16 ============================================================= */
{id:"trig",em:"🌀",color:"#e6e0ff",title:"Trigonometry",tag:"SOH-CAH-TOA, radians, and the little bit of unit circle the SAT wants.",
lessons:[
{id:"l1",t:"SOH-CAH-TOA",mins:8,h:`
<p>Trig connects an angle in a right triangle to the ratio of its sides. Label sides from the angle you care about: <strong>opposite</strong>, <strong>adjacent</strong>, and <strong>hypotenuse</strong> (the long one).</p>
<div class="fbox">SOH: sin = Opposite / Hypotenuse
CAH: cos = Adjacent / Hypotenuse
TOA: tan = Opposite / Adjacent</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Right triangle: opposite = 3, adjacent = 4, hypotenuse = 5.<br>
sin = 3/5, cos = 4/5, tan = 3/4.</div>
<div class="tip"><b>Same-side sharing.</b> The two non-right angles are complementary (add to 90°). A neat fact the SAT tests: <span class="fx">sin(x) = cos(90° − x)</span>. The sine of one acute angle equals the cosine of the other.</div>
`},
{id:"l2",t:"Radians & the unit circle basics",mins:8,h:`
<p>Angles can be measured in <strong>degrees</strong> or in <strong>radians</strong>. Radians tie angles to the distance around a circle.</p>
<div class="fbox">180° = π radians        so   degrees × (π/180) = radians</div>
<div class="eg"><div class="lab">EXAMPLE</div>
90° = 90 · π/180 = <strong>π/2</strong> radians. 60° = π/3. 45° = π/4.</div>
<h3>A few unit-circle values worth knowing</h3>
<table style="width:100%;border-collapse:collapse" class="tbl">
<tr><td>angle</td><td>sin</td><td>cos</td></tr>
<tr><td>0</td><td>0</td><td>1</td></tr>
<tr><td>30° (π/6)</td><td>1/2</td><td>√3/2</td></tr>
<tr><td>45° (π/4)</td><td>√2/2</td><td>√2/2</td></tr>
<tr><td>60° (π/3)</td><td>√3/2</td><td>1/2</td></tr>
<tr><td>90° (π/2)</td><td>1</td><td>0</td></tr>
</table>
<div class="tip"><b>SAT reality.</b> Deep trig is rare. You mainly need SOH-CAH-TOA, the sin/cos complement rule, and degree↔radian conversion. Don't over-study this — nail the earlier units first.</div>
`}
],
prac:[
N("Right triangle: opposite 6, hypotenuse 10. sin as a fraction.","3/5","6/10 = 3/5."),
N("Opposite 8, adjacent 6. tan as a fraction.","4/3","8/6 = 4/3."),
N("Adjacent 5, hypotenuse 13. cos as a fraction.","5/13","adjacent/hypotenuse."),
N("Convert 180° to radians (as a multiple of π, enter the number).","1","180° = π = 1·π."),
N("Convert 45° to radians → π/? enter the denominator.","4","45·π/180 = π/4."),
P("If sin(30°) = 1/2, then cos(60°) =",["1/2","√3/2","1","0"],0,"cos(60) = sin(30) by the complement rule."),
N("A 3-4-5 right triangle: cos of the angle opposite the 3-side (adjacent 4, hyp 5).","4/5","adjacent/hyp = 4/5."),
N("Convert 90° to radians → π/? enter the denominator.","2","90 = π/2.")
],
quiz:[
N("Opposite 9, hypotenuse 15. sin as a fraction.","3/5","9/15 = 3/5."),
N("Convert 60° to radians → π/? enter denominator.","3","60·π/180 = π/3."),
P("sin(x) = cos(?)",["x","90° − x","180° − x","2x"],1,"Complementary angle rule."),
N("Right triangle legs 5, 12 (hyp 13). tan of angle opposite the 5 (opp 5, adj 12), as a fraction.","5/12","opposite/adjacent."),
P("π radians equals:",["45°","90°","180°","360°"],2,"π radians = 180°."),
N("If cos(θ) = 8/17 in a right triangle (adj 8, hyp 17), the opposite side is?","15","√(17²−8²)=√225=15.")
],
cards:[
C("SOH","sin = Opposite / Hypotenuse."),
C("CAH","cos = Adjacent / Hypotenuse."),
C("TOA","tan = Opposite / Adjacent."),
C("Degrees → radians","× π/180. (180° = π radians.)"),
C("sin/cos complement","sin(x) = cos(90° − x)."),
C("Hypotenuse","Longest side, opposite the right angle — the denominator in sin and cos.")
]}
];

/* =====================================================================
   FORMULA SHEET
   ===================================================================== */
var FORMULAS=[
{h:"Arithmetic & percent",f:[
["a(b + c) = ab + ac","distribute"],
["% of a number","decimal × number"],
["percent change","(new − old) ÷ old"],
["increase by p%","× (1 + p/100)"],
["decrease by p%","× (1 − p/100)"]
]},
{h:"Ratios & rates",f:[
["a/b = c/d","cross-multiply: ad = bc"],
["speed","distance ÷ time"],
["unit rate","total ÷ count"]
]},
{h:"Lines",f:[
["slope m","(y₂−y₁)/(x₂−x₁)"],
["slope-intercept","y = mx + b"],
["point-slope","y − y₁ = m(x − x₁)"],
["parallel","same slope"],
["perpendicular","slopes multiply to −1"]
]},
{h:"Exponents & roots",f:[
["aᵐ·aⁿ","aᵐ⁺ⁿ"],
["aᵐ/aⁿ","aᵐ⁻ⁿ"],
["(aᵐ)ⁿ","aᵐⁿ"],
["a⁻ⁿ","1/aⁿ"],
["a^(1/2)","√a"]
]},
{h:"Quadratics",f:[
["standard","ax² + bx + c = 0"],
["quadratic formula","x = (−b ± √(b²−4ac))/(2a)"],
["discriminant","D = b² − 4ac"],
["vertex x","−b/(2a)"],
["diff of squares","a²−b² = (a+b)(a−b)"],
["(a±b)²","a² ± 2ab + b²"]
]},
{h:"Functions",f:[
["f(x)+k","shift up k"],
["f(x−h)","shift right h"],
["−f(x)","flip over x-axis"],
["f(g(x))","do g, then f"]
]},
{h:"Statistics",f:[
["mean","sum ÷ count"],
["total","mean × count"],
["median","middle of sorted list"],
["range","max − min"]
]},
{h:"Probability",f:[
["P(event)","favourable ÷ total"],
["P(not A)","1 − P(A)"],
["A and B (indep.)","P(A) × P(B)"],
["counting","m × n"]
]},
{h:"Geometry — flat",f:[
["circle circumference","2πr = πd"],
["circle area","πr²"],
["sector","(angle/360) × area"],
["circle equation","(x−h)²+(y−k)²=r²"],
["rectangle area","l × w"],
["triangle area","½ × b × h"],
["trapezoid area","½(b₁+b₂)h"],
["angles in triangle","= 180°"]
]},
{h:"Right triangles",f:[
["Pythagoras","a² + b² = c²"],
["triples","3-4-5, 5-12-13, 8-15-17"],
["45-45-90","x : x : x√2"],
["30-60-90","x : x√3 : 2x"]
]},
{h:"Geometry — 3D",f:[
["box volume","l × w × h"],
["cube","s³"],
["cylinder","πr²h"],
["sphere","(4/3)πr³"],
["cone","(1/3)πr²h"]
]},
{h:"Trigonometry",f:[
["sin","opp / hyp"],
["cos","adj / hyp"],
["tan","opp / adj"],
["deg → rad","× π/180"],
["180°","π radians"],
["complement","sin x = cos(90°−x)"]
]}
];

/* =====================================================================
   GLOSSARY
   ===================================================================== */
var GLOSS=[
["Variable","A letter standing in for a number, like x."],
["Coefficient","The number multiplying a variable. In 5x, it's 5."],
["Term","A single piece of an expression, separated by + or −."],
["Expression","A math phrase with no equals sign, like 3x + 2."],
["Equation","Two expressions set equal, like 3x + 2 = 11."],
["Slope","How steep a line is; rise over run."],
["Intercept","Where a graph crosses an axis."],
["Function","A rule giving exactly one output for each input, f(x)."],
["Domain","All allowed inputs (x-values) of a function."],
["Range","All possible outputs (y-values) of a function."],
["Quadratic","An equation with an x² term; graphs as a parabola."],
["Parabola","The U-shaped graph of a quadratic."],
["Vertex","The turning point (top or bottom) of a parabola."],
["Root / Zero","An x-value where a function equals 0 (crosses the x-axis)."],
["Discriminant","b²−4ac; tells how many real solutions a quadratic has."],
["Exponent","A small raised number counting repeated multiplication."],
["Radical","A root symbol, like √."],
["Ratio","A comparison of two amounts, like 3:2."],
["Proportion","A statement that two ratios are equal."],
["Mean","The average: sum divided by count."],
["Median","The middle value of a sorted list."],
["Mode","The most frequent value in a list."],
["Probability","How likely an event is, from 0 to 1."],
["Hypotenuse","The longest side of a right triangle, opposite the 90°."],
["Radian","An angle unit; 180° = π radians."],
["Absolute value","Distance from zero; always positive. |−4| = 4."],
["Reciprocal","The flip of a number: reciprocal of 3 is 1/3."],
["Integer","A whole number, positive, negative, or zero (…−2,−1,0,1,2…)."],
["Prime number","A whole number > 1 with only two divisors: 1 and itself."],
["Outlier","A value far from the rest of the data."]
];

/* =====================================================================
   STRATEGY (HTML)
   ===================================================================== */
var STRATEGY=`
<h2>How to use this course to reach 800</h2>
<p>An 800 is not about being a genius. It's about (1) knowing every idea on this page cold, and (2) not throwing away points on careless mistakes. This course covers both. Here's the plan.</p>
<h2>Your study routine</h2>
<div class="acc" open><summary>The learning loop for each lesson<span>▾</span></summary><div class="body">
<ol>
<li><b>Read</b> the lesson slowly. Don't skim.</li>
<li><b>Redo the examples yourself</b> on paper, covering the answer.</li>
<li><b>Do the practice.</b> If you miss one, read the explanation until it clicks.</li>
<li><b>Take the quiz</b> and aim for 80%+. Below that, the unit isn't done — review and retake.</li>
<li><b>Run the flashcards</b> until every card is "got it".</li>
<li><b>Come back in a few days.</b> Skim the cards again. This is how memory sticks.</li>
</ol></div></div>
<div class="acc"><summary>A realistic weekly schedule<span>▾</span></summary><div class="body">
<ul>
<li><b>Mon–Thu:</b> one lesson + its practice (30–45 min).</li>
<li><b>Fri:</b> the unit quiz + flashcards of the week.</li>
<li><b>Sat:</b> the "Mistake review" tab — redo everything you got wrong.</li>
<li><b>Sun:</b> rest, or a light flashcard skim of older units.</li>
</ul>
<p>Sixteen units at this pace is roughly two to three months — perfect for a December test if you start now.</p>
</div></div>
<h2>Test-day strategy</h2>
<div class="acc"><summary>Pacing — don't run out of time<span>▾</span></summary><div class="body">
<p>The digital SAT Math has two modules of about 22 questions in 35 minutes each — roughly <b>90 seconds per question</b>. If a question is eating your time, <b>flag it and move on</b>. An easy question later is worth the same points as a hard one now. Come back with leftover time.</p>
</div></div>
<div class="acc"><summary>Use the built-in Desmos calculator<span>▾</span></summary><div class="body">
<p>The digital SAT gives you a Desmos graphing calculator for the whole math section. Learn to use it before test day:</p>
<ul>
<li><b>Solve equations</b> by typing them and reading where the graph crosses zero.</li>
<li><b>Solve systems</b> by graphing both lines and finding the intersection.</li>
<li><b>Find a vertex</b> of a parabola by graphing and clicking the turning point.</li>
<li><b>Check factoring and arithmetic</b> instantly.</li>
</ul>
<p>But don't rely on it for everything — knowing the math is faster for simple steps.</p>
</div></div>
<div class="acc"><summary>Grid-in (student-produced) answers<span>▾</span></summary><div class="body">
<p>Some questions have no answer choices — you type the number. Rules to remember:</p>
<ul>
<li>You can enter fractions (3/4) or decimals (0.75) — either is fine.</li>
<li>If the answer is a long decimal, enter as many digits as fit; don't round early.</li>
<li>Negative answers and fractions are allowed. Mixed numbers are not — write 5/4, not 1¼.</li>
</ul>
</div></div>
<div class="acc"><summary>The careless-mistake killers<span>▾</span></summary><div class="body">
<ul>
<li><b>Answer what's asked.</b> Circle the actual question. They may want x + 1, not x.</li>
<li><b>Watch signs.</b> A dropped minus sign is the #1 point-loser.</li>
<li><b>Check units.</b> Minutes vs hours, cm vs m, area vs volume.</li>
<li><b>Plug your answer back in</b> when you have a spare moment.</li>
<li><b>Estimate first.</b> If you expect ~50 and get 5000, you slipped somewhere.</li>
</ul>
</div></div>
<div class="acc"><summary>Smart guessing (never leave blanks)<span>▾</span></summary><div class="body">
<p>There is <b>no penalty for wrong answers</b>. Always put something. If stuck on a multiple-choice question:</p>
<ul>
<li><b>Plug in the answer choices</b> — test which one makes the equation true.</li>
<li><b>Pick your own numbers</b> for variables in "which expression equals…" questions.</li>
<li><b>Eliminate</b> obviously wrong choices to raise your odds.</li>
</ul>
</div></div>
<h2>Two power techniques worth mastering</h2>
<div class="acc"><summary>Plugging in numbers<span>▾</span></summary><div class="body">
<p>When a problem is all letters ("if a = 2b and b = 3c, then a = ? c"), pick easy numbers. Let c = 1, so b = 3, a = 6 → a = 6c. Works every time and avoids algebra slips.</p>
</div></div>
<div class="acc"><summary>Backsolving from choices<span>▾</span></summary><div class="body">
<p>For "solve for x" multiple choice, try the middle choice in the equation. Too big? Go smaller. This turns hard algebra into simple checking. Start with choice B or C since answers are usually ordered.</p>
</div></div>
`;

/* =====================================================================
   PROGRESS MATH
   ===================================================================== */
function unitStats(u){
  var lt=u.lessons.length, ld=0;
  u.lessons.forEach(function(l){if(S.lessons[u.id+"/"+l.id])ld++});
  var qbest=S.quiz[u.id]||0;
  var pr=S.prac[u.id]||{done:0,correct:0};
  return {lt:lt,ld:ld, quiz:qbest, prac:pr,
    pct: Math.round(100*( (ld/lt)*0.5 + (qbest/100)*0.5 ))};
}
function overall(){
  var lp=0,lt=0,qp=0,qt=0;
  UNITS.forEach(function(u){
    lt+=u.lessons.length;
    u.lessons.forEach(function(l){if(S.lessons[u.id+"/"+l.id])lp++});
    qt+=1; qp+=(S.quiz[u.id]||0)/100;
  });
  var lessonFrac=lp/lt, quizFrac=qp/qt;
  var mastery=lessonFrac*0.45 + quizFrac*0.55;
  var score=Math.round((200+600*mastery)/10)*10;
  return {lessonFrac:lessonFrac,quizFrac:quizFrac,mastery:mastery,score:score,
    lessonsDone:lp,lessonsTotal:lt,
    quizzesDone:UNITS.filter(function(u){return (S.quiz[u.id]||0)>=80}).length};
}

/* record a mistake for review */
function logMistake(u,q,correct,explain){
  var text=q;
  S.mistakes=S.mistakes.filter(function(m){return m.q!==text});
  S.mistakes.unshift({uid:u.id,unit:u.title,q:text,correct:correct,explain:explain,ts:Date.now()});
  if(S.mistakes.length>150)S.mistakes.length=150;
  saveS();
}

/* =====================================================================
   ROUTER + VIEWS
   ===================================================================== */
function router(){
  var h=location.hash.replace(/^#/,"")||"/";
  var parts=h.split("/").filter(Boolean); // e.g. ['unit','frac']
  tickStreak();paintMini();
  markNav(h);
  var a=el("app");
  if(h==="/"||h==="") return viewHome(a);
  if(parts[0]==="units") return viewUnits(a);
  if(parts[0]==="unit") return viewUnit(a,parts[1],parts[2]);
  if(parts[0]==="lesson") return viewLesson(a,parts[1],parts[2]);
  if(parts[0]==="practice") return viewPractice(a,parts[1]);
  if(parts[0]==="quiz") return viewQuiz(a,parts[1]);
  if(parts[0]==="cards") return viewCards(a,parts[1]);
  if(parts[0]==="formulas") return viewFormulas(a);
  if(parts[0]==="strategy") return viewStrategy(a);
  if(parts[0]==="glossary") return viewGlossary(a);
  if(parts[0]==="review") return viewReview(a);
  a.innerHTML='<div class="empty">Page not found. <a href="#/">Go home</a>.</div>';
}
function markNav(h){
  var base="/"+(h.split("/").filter(Boolean)[0]||"");
  document.querySelectorAll("#topnav a").forEach(function(a){
    var r=a.getAttribute("data-r");
    a.classList.toggle("on", r===base || (r==="/"&&h==="/"));
  });
}
function findUnit(id){for(var i=0;i<UNITS.length;i++)if(UNITS[i].id===id)return UNITS[i];return null}

/* ---- HOME / DASHBOARD ---- */
function viewHome(a){
  var o=overall();
  var next=null;
  for(var i=0;i<UNITS.length;i++){var st=unitStats(UNITS[i]);if(st.pct<100){next=UNITS[i];break}}
  var greeting=S.xp>0?"Welcome back":"Let's begin";
  a.innerHTML=
  '<div class="hero">'+
    '<div class="big">'+
      '<h1>'+greeting+'. Let\'s get you to 800.</h1>'+
      '<p>A complete SAT Math course built from zero. No hard words — every idea explained like a friend would. Learn, practice, drill flashcards, and watch your score estimate climb.</p>'+
      '<div class="row">'+
        (next?'<button class="btn pri" onclick="go(\'/unit/'+next.id+'\')">▶ Continue: '+esc(next.title)+'</button>':'<button class="btn pri" onclick="go(\'/units\')">Browse units</button>')+
        '<button class="btn ghost" onclick="go(\'/units\')">All units</button>'+
      '</div>'+
    '</div>'+
    '<div class="card pad gauge">'+
      '<div class="ring" style="--p:'+Math.min(100,Math.round(o.mastery*100))+'"><div class="hole"><b>'+o.score+'</b><small>est. score</small></div></div>'+
      '<div class="cap">Your estimated score grows as you finish lessons and pass quizzes. Max is 800.</div>'+
    '</div>'+
  '</div>'+

  '<div class="stat" style="margin-top:18px">'+
    '<div class="b"><b>'+o.lessonsDone+'/'+o.lessonsTotal+'</b><span>lessons read</span></div>'+
    '<div class="b"><b>'+o.quizzesDone+'/'+UNITS.length+'</b><span>units mastered (quiz ≥ 80%)</span></div>'+
    '<div class="b"><b>'+S.xp+'</b><span>XP · level '+level()+'</span></div>'+
    '<div class="b"><b>'+S.streak.c+' 🔥</b><span>day streak</span></div>'+
  '</div>'+

  '<div class="sec-h"><h2>Jump back in</h2></div>'+
  '<div class="grid g-auto">'+
    tile("📚","All "+UNITS.length+" units","Lessons, practice & quizzes","/units")+
    tile("🃏","Flashcards","Quick memory drills","/cards/"+(next?next.id:UNITS[0].id))+
    tile("🧮","Formula sheet","Everything on one page","/formulas")+
    tile("🎯","Test strategy","Pacing, calculator, guessing","/strategy")+
    tile("🔁","Mistake review","Redo what you got wrong ("+S.mistakes.length+")","/review")+
    tile("🔤","Glossary","Every term in plain words","/glossary")+
  '</div>'+

  '<div class="sec-h"><h2>The path</h2><span class="k">follow it top to bottom</span></div>'+
  '<div class="grid g-auto">'+UNITS.map(unitCard).join("")+'</div>';
  paintBars();
}
function tile(em,t,s,href){
  return '<div class="card pad unit" onclick="go(\''+href+'\')">'+
    '<div class="top"><div class="em">'+em+'</div><h3>'+esc(t)+'</h3></div>'+
    '<p>'+esc(s)+'</p></div>';
}
function unitCard(u,i){
  var st=unitStats(u);
  var done=st.pct>=100;
  return '<div class="card pad unit" style="--c:'+u.color+'" onclick="go(\'/unit/'+u.id+'\')">'+
    (done?'<span class="badge">✓ done</span>':'')+
    '<div class="top"><div class="em">'+u.em+'</div>'+
      '<h3>'+esc(u.title)+'</h3><span class="n">'+(i+1<10?"0":"")+(i+1)+'</span></div>'+
    '<p>'+esc(u.tag)+'</p>'+
    '<div class="mini-bar"><div class="bar-t" style="flex:1"><i data-w="'+st.pct+'"></i></div><span>'+st.pct+'%</span></div>'+
  '</div>';
}
function paintBars(){document.querySelectorAll(".bar-t i[data-w]").forEach(function(i){setTimeout(function(){i.style.width=i.getAttribute("data-w")+"%"},30)})}

/* ---- ALL UNITS ---- */
function viewUnits(a){
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Units</div>'+
    '<div class="sec-h"><h2>All '+UNITS.length+' units</h2><span class="k">start at the top if you\'re new</span></div>'+
    '<input class="search" id="usearch" placeholder="Search a topic… (slope, fractions, circle)">'+
    '<div class="grid g-auto" id="ulist" style="margin-top:16px">'+UNITS.map(unitCard).join("")+'</div>';
  paintBars();
  el("usearch").addEventListener("input",function(){
    var v=this.value.toLowerCase();
    var html=UNITS.map(function(u,i){
      var hay=(u.title+" "+u.tag+" "+u.lessons.map(function(l){return l.t}).join(" ")).toLowerCase();
      return hay.indexOf(v)>-1?unitCard(u,i):"";
    }).join("");
    el("ulist").innerHTML=html||'<div class="empty">No unit matches that. Try another word.</div>';
    paintBars();
  });
}

/* ---- UNIT DETAIL ---- */
function viewUnit(a,id,tab){
  var u=findUnit(id);if(!u)return go("/units");
  tab=tab||"lessons";
  var st=unitStats(u);
  var idx=UNITS.indexOf(u);
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/units">Units</a> › '+esc(u.title)+'</div>'+
    '<div class="top" style="display:flex;gap:14px;align-items:center;margin-bottom:6px">'+
      '<div class="em" style="--c:'+u.color+';width:54px;height:54px;font-size:27px;border-radius:15px;background:'+u.color+'">'+u.em+'</div>'+
      '<div><h1 style="font-family:var(--disp);font-size:clamp(24px,4vw,34px);font-weight:800">'+esc(u.title)+'</h1></div>'+
    '</div>'+
    '<p style="color:var(--ink2);max-width:60ch">'+esc(u.tag)+'</p>'+
    '<div class="mini-bar" style="max-width:340px;margin:12px 0"><div class="bar-t" style="flex:1"><i data-w="'+st.pct+'"></i></div><span>'+st.pct+'% complete</span></div>'+
    '<div class="tabs">'+
      tb("lessons","📖 Lessons ("+st.ld+"/"+st.lt+")",tab,id)+
      tb("practice","✏️ Practice",tab,id)+
      tb("quiz","🎯 Quiz"+(st.quiz?" · best "+st.quiz+"%":""),tab,id)+
      tb("cards","🃏 Flashcards ("+u.cards.length+")",tab,id)+
    '</div><div id="tabbody"></div>';
  paintBars();
  var body=el("tabbody");
  if(tab==="lessons"){
    body.innerHTML=u.lessons.map(function(l,i){
      var done=S.lessons[u.id+"/"+l.id];
      return '<div class="list-row '+(done?"done":"")+'" onclick="go(\'/lesson/'+u.id+'/'+l.id+'\')">'+
        '<div class="ix">'+(done?"✓":(i+1))+'</div>'+
        '<div class="t"><b>'+esc(l.t)+'</b><small>'+l.mins+' min read</small></div>'+
        '<div class="go">›</div></div>';
    }).join("")+
    '<div class="navrow"><span></span>'+
    (idx<UNITS.length-1?'<button class="btn" onclick="go(\'/unit/'+UNITS[idx+1].id+'\')">Next unit: '+esc(UNITS[idx+1].title)+' →</button>':'')+'</div>';
  } else if(tab==="practice"){
    body.innerHTML='<div class="card pad"><h3 style="font-family:var(--disp)">Practice — no pressure</h3>'+
      '<p style="color:var(--ink2)">'+u.prac.length+' questions, one at a time. You get the answer and full explanation right after each. Wrong ones are saved to your Mistake review.</p>'+
      '<button class="btn pri" onclick="startSet(\''+u.id+'\',\'prac\')">Start practice</button></div>';
  } else if(tab==="quiz"){
    body.innerHTML='<div class="card pad"><h3 style="font-family:var(--disp)">Unit quiz</h3>'+
      '<p style="color:var(--ink2)">'+u.quiz.length+' questions. Score 80% or more to mark this unit mastered. You can retake it any time.</p>'+
      (st.quiz?'<div class="chipset"><span class="chip">Best: '+st.quiz+'%</span>'+(st.quiz>=80?'<span class="chip" style="color:var(--grn)">✓ mastered</span>':'')+'</div>':'')+
      '<button class="btn pri" onclick="startSet(\''+u.id+'\',\'quiz\')">'+(st.quiz?"Retake quiz":"Start quiz")+'</button></div>';
  } else if(tab==="cards"){
    body.innerHTML='<div class="card pad"><h3 style="font-family:var(--disp)">Flashcards</h3>'+
      '<p style="color:var(--ink2)">'+u.cards.length+' cards. Tap to flip, then mark whether you got it. Great for a 5-minute drill.</p>'+
      '<button class="btn pri" onclick="go(\'/cards/'+u.id+'\')">Open flashcards</button></div>';
  }
}
function tb(key,label,cur,id){return '<button class="'+(cur===key?"on":"")+'" onclick="go(\'/unit/'+id+'/'+key+'\')">'+label+'</button>'}

/* ---- LESSON ---- */
function viewLesson(a,uid,lid){
  var u=findUnit(uid);if(!u)return go("/units");
  var li=-1;for(var i=0;i<u.lessons.length;i++)if(u.lessons[i].id===lid)li=i;
  if(li<0)return go("/unit/"+uid);
  var l=u.lessons[li];
  var done=S.lessons[uid+"/"+lid];
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/unit/'+uid+'">'+esc(u.title)+'</a> › Lesson</div>'+
    '<article class="lesson">'+
      '<h1>'+esc(l.t)+'</h1>'+
      '<div class="est">'+esc(u.title)+' · '+l.mins+' min read</div>'+
      l.h+
      '<div class="navrow">'+
        (li>0?'<button class="btn" onclick="go(\'/lesson/'+uid+'/'+u.lessons[li-1].id+'\')">← Previous</button>':'<span></span>')+
        '<button class="btn '+(done?"":"pri")+'" id="doneBtn" onclick="markLesson(\''+uid+'\',\''+lid+'\')">'+(done?"✓ Marked as read":"Mark as read (+10 XP)")+'</button>'+
        (li<u.lessons.length-1?'<button class="btn" onclick="go(\'/lesson/'+uid+'/'+u.lessons[li+1].id+'\')">Next →</button>':'<button class="btn pri" onclick="go(\'/unit/'+uid+'/practice\')">Practice this unit →</button>')+
      '</div>'+
    '</article>';
}
function markLesson(uid,lid){
  var key=uid+"/"+lid;
  if(!S.lessons[key]){S.lessons[key]=1;addXp(10);toast("Lesson done! +10 XP")}
  saveS();
  var b=el("doneBtn");if(b){b.textContent="✓ Marked as read";b.classList.remove("pri")}
}

/* =====================================================================
   PRACTICE / QUIZ ENGINE
   ===================================================================== */
var RUN=null;
function startSet(uid,mode){
  var u=findUnit(uid);
  var items=(mode==="quiz"?u.quiz:u.prac).slice();
  RUN={u:u,mode:mode,items:items,i:0,correct:0,answered:false};
  var target="/"+(mode==="quiz"?"quiz":"practice")+"/"+uid;
  if(location.hash==="#"+target){window.scrollTo(0,0);drawQuestion()}
  else go(target);
}
function viewPractice(a,uid){renderRun(a,uid,"prac")}
function viewQuiz(a,uid){renderRun(a,uid,"quiz")}

function renderRun(a,uid,mode){
  var u=findUnit(uid);if(!u)return go("/units");
  if(!RUN||RUN.u.id!==uid||RUN.mode!==mode){
    // fresh landing: show start screen
    var st=unitStats(u);
    a.innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/unit/'+uid+'">'+esc(u.title)+'</a> › '+(mode==="quiz"?"Quiz":"Practice")+'</div>'+
      '<div class="q-wrap"><div class="q-card" style="text-align:center">'+
      '<div style="font-size:44px">'+(mode==="quiz"?"🎯":"✏️")+'</div>'+
      '<h2 style="font-family:var(--disp);margin:8px 0">'+(mode==="quiz"?"Unit quiz":"Practice")+' · '+esc(u.title)+'</h2>'+
      '<p style="color:var(--ink2)">'+(mode==="quiz"?u.quiz.length+" questions. Aim for 80%+ to master this unit.":u.prac.length+" questions with full explanations.")+'</p>'+
      '<button class="btn pri block" onclick="startSet(\''+uid+'\',\''+mode+'\')">Start</button>'+
      '</div></div>';
    return;
  }
  drawQuestion();
}

function drawQuestion(){
  var a=el("app"),R=RUN,it=R.items[R.i];
  var total=R.items.length;
  R.answered=false;R.picked=null;
  var head='<div class="crumb"><a href="#/">Home</a> › <a href="#/unit/'+R.u.id+'">'+esc(R.u.title)+'</a> › '+(R.mode==="quiz"?"Quiz":"Practice")+'</div>';
  var bar='<div class="q-head"><span>Question '+(R.i+1)+' of '+total+'</span><span>'+(R.mode==="quiz"?"Score so far: "+R.correct:"✓ "+R.correct)+'</span></div>'+
    '<div class="q-bar"><i style="width:'+(100*R.i/total)+'%"></i></div>';
  var qhtml='<div class="q-card"><div class="q-q">'+esc(it.q)+'</div>';
  if(it.t==="mc"){
    qhtml+=it.c.map(function(c,i){
      return '<button class="opt" data-i="'+i+'" onclick="pick('+i+')"><span class="k">'+"ABCD".charAt(i)+'</span><span>'+esc(c)+'</span></button>';
    }).join("");
  }else{
    qhtml+='<div class="numin"><input id="nin" inputmode="text" autocomplete="off" placeholder="type your answer…" onkeydown="if(event.key===\'Enter\')submitNum()"><button class="btn pri" onclick="submitNum()">Check</button></div>'+
    '<div style="color:var(--ink2);font-size:13px">Tip: fractions like 3/4 are fine.</div>';
  }
  qhtml+='<div id="exbox"></div><div id="nextrow" class="navrow" style="margin-top:18px"></div></div>';
  a.innerHTML=head+'<div class="q-wrap">'+bar+qhtml+'</div>';
  if(it.t==="num"){var n=el("nin");if(n)n.focus()}
}
function pick(i){
  var R=RUN;if(R.answered)return;var it=R.items[R.i];
  R.answered=true;R.picked=i;
  var ok=(i===it.a);
  var opts=document.querySelectorAll(".opt");
  opts.forEach(function(o,k){o.setAttribute("disabled","");if(k===it.a)o.classList.add("correct");if(k===i&&!ok)o.classList.add("wrong")});
  finishQ(ok,it,it.c[it.a]);
}
function submitNum(){
  var R=RUN;if(R.answered)return;var it=R.items[R.i];
  var v=el("nin").value;
  if(v.trim()===""){toast("Type an answer first");return}
  R.answered=true;
  var ok=checkNum(it.a,v);
  el("nin").setAttribute("disabled","");
  var correctShown=Array.isArray(it.a)?it.a[0]:it.a;
  finishQ(ok,it,correctShown);
}
function finishQ(ok,it,correctText){
  var R=RUN;
  if(ok){R.correct++;addXp(R.mode==="quiz"?4:5)}
  else{ if(R.mode!=="cards"&&R.u.id!=="__review") logMistake(R.u,it.q,String(correctText),it.s); }
  var ex=el("exbox");
  ex.innerHTML='<div class="explain '+(ok?"ok":"no")+'"><div class="v">'+(ok?"Correct! ✓":"Not quite — answer: "+esc(String(correctText)))+'</div>'+esc(it.s)+'</div>';
  var last=(R.i>=R.items.length-1);
  el("nextrow").innerHTML='<span></span><button class="btn pri" onclick="nextQ()">'+(last?"See results →":"Next question →")+'</button>';
}
function nextQ(){
  var R=RUN;
  if(R.i>=R.items.length-1){return showResults()}
  R.i++;drawQuestion();
}
function showResults(){
  var R=RUN,a=el("app");
  var pct=Math.round(100*R.correct/R.items.length);
  if(R.mode==="quiz"){
    var prev=S.quiz[R.u.id]||0;
    if(pct>prev){S.quiz[R.u.id]=pct;saveS()}
    if(pct>=80&&prev<80){addXp(30)}
  }
  var msg = pct>=80?"Excellent — you've mastered this!" : pct>=60?"Good progress. One more pass and you've got it." : "Keep going — review the lesson and try again.";
  var emoji = pct>=80?"🏆":pct>=60?"💪":"📖";
  var isRev=(R.u.id==="__review");
  var buttons = isRev
    ? '<button class="btn" onclick="go(\'/review\')">Back to review</button>'+
      '<button class="btn pri" onclick="reviewRun()">Redo again</button>'
    : '<button class="btn" onclick="go(\'/unit/'+R.u.id+'\')">Back to unit</button>'+
      '<button class="btn pri" onclick="startSet(\''+R.u.id+'\',\''+R.mode+'\')">Try again</button>'+
      (R.mode==="prac"?'<button class="btn gd" onclick="startSet(\''+R.u.id+'\',\'quiz\')">Take the quiz →</button>':'');
  a.innerHTML='<div class="q-wrap"><div class="q-card result">'+
    '<div style="font-size:50px">'+emoji+'</div>'+
    '<div class="score">'+pct+'%</div>'+
    '<div class="lab">'+R.correct+' of '+R.items.length+' correct</div>'+
    '<p style="margin:14px 0">'+msg+'</p>'+
    '<div class="navrow" style="justify-content:center;gap:10px">'+buttons+'</div></div></div>';
  RUN=null;
}

/* =====================================================================
   FLASHCARDS
   ===================================================================== */
var DECK=null;
function viewCards(a,uid){
  var u=findUnit(uid);if(!u)return go("/units");
  DECK={u:u,cards:u.cards.slice(),i:0,flipped:false,known:0};
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › <a href="#/unit/'+uid+'">'+esc(u.title)+'</a> › Flashcards</div>'+
    '<div class="deck" id="deckwrap"></div>';
  drawCard();
}
function drawCard(){
  var D=DECK;if(!D)return;
  if(D.i>=D.cards.length){
    el("deckwrap").innerHTML='<div class="q-card result"><div style="font-size:48px">🃏</div>'+
      '<div class="score">'+D.known+'/'+D.cards.length+'</div><div class="lab">cards you got</div>'+
      '<div class="navrow" style="justify-content:center;gap:10px;margin-top:16px">'+
      '<button class="btn" onclick="go(\'/unit/'+D.u.id+'\')">Back to unit</button>'+
      '<button class="btn pri" onclick="go(\'/cards/'+D.u.id+'\')">Shuffle again</button></div></div>';
    if(D.known===D.cards.length&&D.cards.length){addXp(10);toast("Deck cleared! +10 XP")}
    return;
  }
  var c=D.cards[D.i];
  el("deckwrap").innerHTML=
    '<div style="color:var(--ink2);font-weight:700;margin-bottom:6px">Card '+(D.i+1)+' of '+D.cards.length+'</div>'+
    '<div class="flip" id="flip" onclick="flipCard()"><div class="inner">'+
      '<div class="face front"><span class="tag">TAP TO FLIP</span><div class="txt">'+esc(c.f)+'</div></div>'+
      '<div class="face back"><div class="txt">'+esc(c.b)+'</div></div>'+
    '</div></div>'+
    '<div class="ctl">'+
      '<button class="btn warn" onclick="cardMark(false)">Review again</button>'+
      '<button class="btn gd" onclick="cardMark(true)">Got it ✓</button>'+
    '</div>'+
    '<div class="meta">Flip the card, then say if you knew it.</div>';
}
function flipCard(){DECK.flipped=!DECK.flipped;el("flip").classList.toggle("flipped",DECK.flipped)}
function cardMark(known){
  if(known)DECK.known++;
  DECK.i++;DECK.flipped=false;drawCard();
}

/* =====================================================================
   FORMULAS / STRATEGY / GLOSSARY / REVIEW
   ===================================================================== */
function viewFormulas(a){
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Formulas</div>'+
    '<div class="sec-h"><h2>The formula sheet</h2><span class="k">everything you need, on one page</span></div>'+
    '<input class="search" id="fsearch" placeholder="Search a formula…" style="margin-bottom:16px">'+
    '<div class="fsheet" id="fsheet">'+FORMULAS.map(fgrp).join("")+'</div>';
  el("fsearch").addEventListener("input",function(){
    var v=this.value.toLowerCase();
    var out=FORMULAS.map(function(g){
      var rows=g.f.filter(function(r){return (r[0]+" "+r[1]+" "+g.h).toLowerCase().indexOf(v)>-1});
      return rows.length?fgrp({h:g.h,f:rows}):"";
    }).join("");
    el("fsheet").innerHTML=out||'<div class="empty">Nothing matches. Try a shorter word.</div>';
  });
}
function fgrp(g){
  return '<div class="fgrp"><h4>'+esc(g.h)+'</h4>'+
    g.f.map(function(r){return '<div class="f"><span class="d">'+esc(r[0])+'</span><span class="m">'+esc(r[1])+'</span></div>'}).join("")+
    '</div>';
}
function viewStrategy(a){
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Strategy</div><div class="prose">'+STRATEGY+'</div>';
}
function viewGlossary(a){
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Glossary</div>'+
    '<div class="sec-h"><h2>Glossary</h2><span class="k">every math word, in plain English</span></div>'+
    '<input class="search" id="gsearch" placeholder="Look up a word…" style="margin-bottom:16px">'+
    '<dl class="gl" id="gl">'+GLOSS.map(function(g){return '<dt>'+esc(g[0])+'</dt><dd>'+esc(g[1])+'</dd>'}).join("")+'</dl>';
  el("gsearch").addEventListener("input",function(){
    var v=this.value.toLowerCase();
    el("gl").innerHTML=GLOSS.filter(function(g){return (g[0]+" "+g[1]).toLowerCase().indexOf(v)>-1})
      .map(function(g){return '<dt>'+esc(g[0])+'</dt><dd>'+esc(g[1])+'</dd>'}).join("")||'<dd>No match.</dd>';
  });
}
function viewReview(a){
  if(!S.mistakes.length){
    a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Review</div>'+
      '<div class="empty"><div style="font-size:44px">🎉</div><h2 style="font-family:var(--disp)">No mistakes saved</h2>'+
      '<p>When you miss a practice or quiz question, it lands here so you can redo it later. Go earn some (on purpose or not)!</p>'+
      '<button class="btn pri" onclick="go(\'/units\')">Go practice</button></div>';
    return;
  }
  a.innerHTML='<div class="crumb"><a href="#/">Home</a> › Review</div>'+
    '<div class="sec-h"><h2>Mistake review</h2><span class="k">'+S.mistakes.length+' saved</span></div>'+
    '<p style="color:var(--ink2);max-width:60ch">These are questions you missed. Reviewing your own mistakes is the single fastest way to gain points. Redo them until they feel easy.</p>'+
    '<div class="navrow" style="margin:8px 0 18px"><button class="btn pri" onclick="reviewRun()">🔁 Redo all as a quiz</button><button class="btn" onclick="clearMistakes()">Clear list</button></div>'+
    '<div>'+S.mistakes.map(function(m){
      return '<div class="card pad" style="margin-bottom:12px"><div style="font-weight:700;margin-bottom:6px">'+esc(m.q)+'</div>'+
      '<div style="color:var(--grn);font-weight:700;font-size:14px">Answer: '+esc(m.correct)+'</div>'+
      '<div style="color:var(--ink2);font-size:14px;margin-top:4px">'+esc(m.explain)+'</div>'+
      '<div style="color:var(--ink2);font-size:12px;margin-top:6px">from '+esc(m.unit)+'</div></div>';
    }).join("")+'</div>';
}
function clearMistakes(){if(confirm("Clear all saved mistakes?")){S.mistakes=[];saveS();router()}}
function reviewRun(){
  // build a temporary run from mistakes; we need to find original items
  var items=[];
  S.mistakes.forEach(function(m){
    var u=findUnit(m.uid);if(!u)return;
    var all=u.prac.concat(u.quiz);
    for(var i=0;i<all.length;i++){if(all[i].q===m.q){items.push(all[i]);break}}
  });
  if(!items.length){toast("Nothing to redo");return}
  RUN={u:{id:"__review",title:"Mistake review",lessons:[],prac:[],quiz:[],cards:[]},mode:"prac",items:items,i:0,correct:0,answered:false};
  if(location.hash==="#/review-run"){window.scrollTo(0,0);drawQuestion()}
  else location.hash="#/review-run";
}
/* handle review-run route by hijacking router */
window.addEventListener("hashchange",function(){
  if(location.hash==="#/review-run"&&RUN){drawQuestion();return}
  router();
});

/* =====================================================================
   INIT
   ===================================================================== */
// theme
(function(){
  el("themeBtn").addEventListener("click",function(){
    var r=document.documentElement,cur=r.getAttribute("data-theme");
    var dark=cur?cur==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
    r.setAttribute("data-theme",dark?"light":"dark");
    try{localStorage.setItem("z800theme",dark?"light":"dark")}catch(e){}
  });
  try{var t=localStorage.getItem("z800theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}
})();
// drawer
el("burger").addEventListener("click",function(){el("drawer").classList.add("open")});
el("drawer").addEventListener("click",function(e){if(e.target===el("drawer")||e.target.tagName==="A")el("drawer").classList.remove("open")});

paintMini();
if(location.hash==="#/review-run")location.hash="#/review";
bootRoute();
