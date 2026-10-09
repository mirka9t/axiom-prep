/* =====================================================================
   ZERO TO 800 — v2 CONTENT PART 2
   New lessons: exp, quad, func, advm, data, prob, geo1, geo2, trig
   New units: wp (word problems), desmos, hard (the 800 zone)
   ===================================================================== */

/* ---------- figures for original lessons ---------- */
addFig("quad","l3",FIG.plane({r:6,fns:[{f:function(x){return x*x-6*x+5}}],pts:[[3,-4,"vertex (3, −4)","vio"],[1,0,"root 1"],[5,0,"root 5"]],cap:"y = x² − 6x + 5: opens up, turns at (3, −4), crosses the x-axis at 1 and 5."}));
addEnd("quad","l3",'<div class="figrow">'+FIG.plane({r:5,fns:[{f:function(x){return 0.5*x*x-2}}],cap:"a > 0 → smile (minimum)"})+FIG.plane({r:5,fns:[{f:function(x){return -0.5*x*x+3},c:"red"}],cap:"a < 0 → frown (maximum)"})+'</div>'+QC("Vertex x-value of y = x² + 10x + 3?","-5","x = −b/(2a) = −10/2 = −5."));
addFig("func","l3",FIG.plane({r:6,fns:[{f:function(x){return x*x},c:"ink2",dash:"6 6"},{f:function(x){return (x-2)*(x-2)+1}}],pts:[[2,1,"(2, 1)","blue"]],labels:[[-5.6,5.4,"y = x²","ink2"],[2.7,4.5,"y = (x − 2)² + 1","blue"]],cap:"Right 2 (inside, reversed) and up 1 (outside, normal)."}));
addFig("advm","l1",FIG.plane({r:6,fns:[{f:function(x){return Math.pow(2,x)}},{f:function(x){return Math.pow(0.5,x)},c:"red"}],labels:[[1.4,5,"growth: 2ˣ","blue"],[-5.6,4,"decay: (½)ˣ","red"]],cap:"Exponential growth shoots up; decay slides toward zero but never reaches it."}));
addFig("data","l2",FIG.bars([12,18,9,15],["Mon","Tue","Wed","Thu"],{title:"Books sold",hi:1,cap:"Read the title, labels and scale first. Tue (18) − Wed (9) = 9 more."}));
addFig("geo1","l1",FIG.para(["a","b","b","a","a","b","b","a"],{cs:["blue","red","red","blue","blue","red","red","blue"],cap:"With parallel lines, every angle is either a or b — and a + b = 180°."}));
addFig("geo1","l3",FIG.tri({a:"6",b:"8",c:"10",cap:"6² + 8² = 36 + 64 = 100 = 10²"}));
addFig("geo2","l1",'<div class="figrow">'+FIG.circ({r:"r",dia:"",label:"C = 2πr,  A = πr²"})+FIG.circ({deg:90,r:"4",label:"90° slice = ¼ of the circle"})+'</div>');
addFig("geo2","l3",FIG.box({l:"length 5",w:"width 3",h:"height 4",cap:"V = 5 × 3 × 4 = 60 cubic units"}));
addFig("trig","l1",FIG.tri({a:"opposite 3",b:"adjacent 4",c:"hypotenuse 5",ang:"θ",cap:"From angle θ: opposite is across, adjacent is next to it, hypotenuse is the longest."}));

/* =====================================================================
   UNIT: exp
   ===================================================================== */
L("exp","l4","Radical equations (and fake solutions)",8,`
<p>A <strong>radical equation</strong> has the variable under a square root, like √(x + 3) = 5. The plan is simple: <b>get the root alone, then square both sides.</b></p>
<div class="eg"><div class="lab">EXAMPLE</div>
√(x + 3) = 5 → square both sides: x + 3 = 25 → <strong>x = 22</strong>. Check: √25 = 5 ✓.</div>
<div class="eg"><div class="lab">EXAMPLE — isolate first</div>
2√x + 1 = 9 → 2√x = 8 → √x = 4 → <strong>x = 16</strong>.</div>
<h3>Extraneous (fake) solutions</h3>
<p>Squaring can create answers that don't really work, because a square root is never negative.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
√(x + 6) = x. Square: x + 6 = x² → x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 or −2.<br>
Check x = −2: √4 = 2, but the right side is −2. ✗ Fake!<br>
Only <strong>x = 3</strong> works.</div>
${NOTE("the SAT deliberately puts the fake solution in the answer choices. After squaring, plugging back in is not optional — it IS the question.")}
${QC("Solve √(2x − 1) = 3.","5","Square: 2x − 1 = 9 → x = 5.")}
`);
L("exp","l5","Same-base tricks & equivalent exponent forms",8,`
<p>To solve equations like 2^(x+1) = 32, make both sides the <strong>same base</strong>. Then the exponents must be equal.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
2^(x+1) = 32 = 2⁵ → x + 1 = 5 → <strong>x = 4</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
9^x = 27. Both are powers of 3: (3²)^x = 3³ → 3^(2x) = 3³ → 2x = 3 → <strong>x = 3/2</strong>.</div>
<h3>Powers to know by heart</h3>
<div class="fbox">2: 2, 4, 8, 16, 32, 64, 128, 256
3: 3, 9, 27, 81, 243
5: 5, 25, 125, 625</div>
<h3>Rewriting expressions</h3>
<p>The SAT asks "which expression is equivalent?". Use the laws to reshape:</p>
<ul><li>4^x = (2²)^x = 2^(2x)</li><li>8^(x/3) = (2³)^(x/3) = 2^x</li><li>x^(3/2) = √(x³) = x√x</li><li>1/√x = x^(−1/2)</li></ul>
${QC("Solve 3^(x − 1) = 81.","5","81 = 3⁴, so x − 1 = 4 → x = 5.")}
${QC("Solve 4^x = 8.","3/2","2^(2x) = 2³ → 2x = 3 → x = 3/2.")}
`);
more("exp",[
N("Solve √(x − 4) = 6.","40","x − 4 = 36."),
N("Solve 3√x = 12.","16","√x = 4 → x = 16."),
N("Solve 2^x = 64.","6","2⁶ = 64."),
N("Solve 5^(x+2) = 125.","1","125 = 5³ → x + 2 = 3."),
N("Solve 25^x = 5.","1/2","5^(2x) = 5¹ → x = 1/2."),
P("Which equals 8^(2/3)?",["2","4","16/3","64"],1,"(∛8)² = 4."),
P("x^(1/2) · x^(3/2) =",["x","x²","x³","x^(3/4)"],1,"Add exponents: 1/2 + 3/2 = 2."),
N("√(x + 7) = x − 5. The valid solution?","9","x + 7 = x² − 10x + 25 → x² − 11x + 18 = 0 → x = 9 or 2. x = 2 gives √9 = 3 ≠ −3, fake.")
],[
N("Solve √(3x + 1) = 5.","8","3x + 1 = 25."),
N("Solve 2^(3x) = 64.","2","3x = 6."),
P("√(x + 2) = x has the solution(s):",["2 only","−1 only","2 and −1","none"],0,"x² − x − 2 = 0 → 2 or −1; −1 gives √1 = 1 ≠ −1."),
N("27^x = 9. Find x as a fraction.","2/3","3^(3x) = 3² → x = 2/3.")
],[
C("Radical equation","Isolate the root, square both sides, then CHECK."),
C("Extraneous solution","A 'solution' from squaring that fails in the original."),
C("Same-base method","Rewrite both sides with one base; set exponents equal."),
C("Powers of 2","2, 4, 8, 16, 32, 64, 128, 256."),
C("4^x as base 2","2^(2x)."),
C("x^(3/2)","√(x³) = x√x.")
]);

/* =====================================================================
   UNIT: quad
   ===================================================================== */
L("quad","l4","Completing the square & vertex form",9,`
<p>Vertex form <span class="fx">y = a(x − h)² + k</span> shows the turning point (h, k) instantly. Completing the square turns ordinary form into vertex form.</p>
<h3>The recipe (when a = 1)</h3>
<ol><li>Take half of the x-coefficient.</li><li>Square it.</li><li>Add and subtract it.</li><li>Package the first three terms as a perfect square.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>
y = x² + 6x + 5. Half of 6 is 3; 3² = 9.<br>
y = (x² + 6x + 9) − 9 + 5 = <strong>(x + 3)² − 4</strong>. Vertex (−3, −4).</div>
<div class="eg"><div class="lab">EXAMPLE</div>
x² − 4x + 7: half of −4 is −2, square 4. → (x − 2)² + 3. Vertex (2, 3), so the minimum value is <strong>3</strong>.</div>
${FIG.plane({r:6,fns:[{f:function(x){return (x+3)*(x+3)-4}}],pts:[[-3,-4,"(−3, −4)","vio"]],cap:"y = (x + 3)² − 4 turns at (−3, −4)."})}
<div class="trap"><b>Sign flip.</b> (x + 3)² means h = −3. The vertex x has the opposite sign of what's inside the bracket.</div>
${QC("What is the minimum value of y = x² − 4x + 7?","3","(x − 2)² + 3 → lowest value 3.")}
`);
L("quad","l5","Polynomials: zeros, factors & remainders",9,`
<p>A <strong>polynomial</strong> is a sum of powers of x, like x³ − 2x + 5. Its <strong>degree</strong> is the highest power (here 3).</p>
<h3>Zeros and factors are the same information</h3>
<div class="fbox">If p(a) = 0  ⟺  (x − a) is a factor  ⟺  the graph crosses the x-axis at a</div>
<div class="eg"><div class="lab">EXAMPLE</div>
p(x) = (x − 1)(x + 2)(x − 5). Its zeros are <strong>1, −2, 5</strong> (flip each sign).</div>
<h3>The remainder theorem</h3>
<p>The remainder when p(x) is divided by (x − a) is just <strong>p(a)</strong>. No long division needed!</p>
<div class="eg"><div class="lab">EXAMPLE</div>
p(x) = x³ − 2x + 5 divided by (x − 2): remainder = p(2) = 8 − 4 + 5 = <strong>9</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — reading a table</div>
If a table shows p(3) = 0, then (x − 3) is a factor of p.</div>
<h3>Adding & subtracting polynomials</h3>
<p>Combine like terms. Careful when subtracting a whole bracket: (3x² + 2x) − (x² − 5x) = 2x² + 7x.</p>
${QC("p(x) = x³ − 2x + 5. Remainder when divided by (x − 2)?","9","p(2) = 8 − 4 + 5 = 9.")}
${QC("If (x − 4) is a factor of x² + kx + 12, what is k?","-7","p(4) = 16 + 4k + 12 = 0 → k = −7.")}
`);
L("quad","l6","Sum & product of solutions",6,`
<p>A beautiful shortcut many students never learn. For <span class="fx">ax² + bx + c = 0</span>:</p>
<div class="fbox">sum of solutions = −b/a        product of solutions = c/a</div>
<div class="eg"><div class="lab">EXAMPLE</div>
2x² − 10x + 3 = 0. Sum = 10/2 = <strong>5</strong>. Product = 3/2. You didn't solve anything!</div>
<div class="eg"><div class="lab">EXAMPLE</div>
x² − 7x + 12 = 0 has solutions 3 and 4: sum 7 = −(−7)/1 ✓, product 12 ✓.</div>
<h3>Building a quadratic from its solutions</h3>
<p>Solutions 2 and −5 → (x − 2)(x + 5) = x² + 3x − 10.</p>
${NOTE("this shortcut turns a 2-minute question into a 10-second one. The SAT asks for sums of solutions more often than you'd think.")}
${QC("Sum of the solutions of 2x² − 10x + 3 = 0?","5","−b/a = 10/2 = 5.")}
`);
L("quad","l7","When a line meets a parabola",8,`
<p>A <strong>nonlinear system</strong> mixes a line and a curve. Set them equal, then solve the quadratic.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
y = x² and y = 2x + 3 → x² = 2x + 3 → x² − 2x − 3 = 0 → (x − 3)(x + 1) = 0 → x = 3 or −1.<br>
Points: (3, 9) and (−1, 1).</div>
${FIG.plane({r:9,fns:[{f:function(x){return x*x}},{f:function(x){return 2*x+3},c:"red"}],pts:[[3,9,"(3, 9)","vio",-44],[-1,1,"(−1, 1)","vio"]],cap:"A line can cross a parabola twice, touch it once, or miss it."})}
<h3>How many intersections? Use the discriminant</h3>
<p>After setting equal and moving everything to one side, check b² − 4ac: positive → 2 points, zero → 1 point (the line just touches — "tangent"), negative → 0 points.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
For which c does y = x² touch y = 4x + c exactly once? x² − 4x − c = 0 → 16 + 4c = 0 → <strong>c = −4</strong>.</div>
${QC("y = x² and y = 2x + 3 meet at two points. Larger x-coordinate?","3","x² − 2x − 3 = 0 → x = 3 or −1.")}
`);
more("quad",[
N("Write x² + 8x + 10 as (x + h)² + k. Enter k.","-6","(x + 4)² − 16 + 10."),
N("Minimum value of y = x² + 2x + 6?","5","(x + 1)² + 5."),
N("p(x) = 2x² − 3x + 1. Remainder when divided by (x − 3)?","10","p(3) = 18 − 9 + 1 = 10."),
N("Product of the solutions of 3x² + 5x − 12 = 0?","-4","c/a = −12/3."),
N("Sum of the solutions of x² − 9x + 2 = 0?","9","−b/a = 9."),
N("y = x² − 1 and y = 3: positive x at the intersection?","2","x² − 1 = 3 → x = ±2."),
P("How many times does y = x² + 4 meet y = 0?",["0","1","2","infinitely many"],0,"x² = −4 has no real solution."),
N("Zeros of (x − 2)(x + 7): the negative zero?","-7","x + 7 = 0.")
],[
N("Vertex y-coordinate of y = x² − 10x + 30.","5","(x − 5)² + 5."),
N("If x = 2 is a zero of x³ + kx − 4, find k.","-2","8 + 2k − 4 = 0 → k = −2."),
N("y = x² + 1 and y = 2x: how many intersection points?","1","x² − 2x + 1 = 0 → (x − 1)² = 0, one point."),
N("Solutions r and s of x² − 6x + 4 = 0. Find r + s + rs.","10","Sum 6, product 4.")
],[
C("Completing the square","Half the b, square it, add & subtract. → (x + b/2)² + …"),
C("Vertex form","y = a(x − h)² + k → vertex (h, k)."),
C("Remainder theorem","p(x) ÷ (x − a) leaves remainder p(a)."),
C("Factor theorem","p(a) = 0 ⇔ (x − a) is a factor."),
C("Sum / product of roots","−b/a and c/a."),
C("Line meets parabola","Set equal → quadratic → discriminant says how many points.")
]);

/* =====================================================================
   UNIT: func
   ===================================================================== */
L("func","l4","Linear vs quadratic vs exponential",8,`
<p>Three families of functions dominate the SAT. You should recognize each one from a table, a graph or a story.</p>
${'<div class="figrow">'+FIG.plane({r:5,lines:[{m:1,b:0}],cap:"Linear: straight"})+FIG.plane({r:5,fns:[{f:function(x){return 0.4*x*x-3}}],cap:"Quadratic: U-shape"})+FIG.plane({r:5,fns:[{f:function(x){return Math.pow(1.8,x)-1}}],cap:"Exponential: J-shape"})+'</div>'}
<h3>From a table</h3>
<ul><li><b>Linear:</b> adds the <em>same amount</em> each step (3, 7, 11, 15 → +4 each).</li>
<li><b>Exponential:</b> multiplies by the <em>same number</em> each step (3, 6, 12, 24 → ×2 each).</li>
<li><b>Quadratic:</b> the differences change by the same amount (1, 4, 9, 16 → differences 3, 5, 7 → +2 each).</li></ul>
<h3>From a story</h3>
<ul><li>"increases by 50 each year" → linear</li><li>"increases by 5% each year", "doubles", "halves" → exponential</li><li>"thrown ball", "area of a square", "profit peaks" → quadratic</li></ul>
${NOTE("for tables, always compute the differences first. If they're equal → linear. If not, try dividing → exponential.")}
${QC("A table goes 3, 6, 12, 24. What is the next value?","48","It doubles each time.")}
`);
L("func","l5","Function tables & word models",8,`
<p>Functions often come as tables or real situations. Stay calm: <b>f(input) = output</b>, every time.</p>
<table class="tbl" style="width:100%;margin:10px 0"><tr><td>x</td><td>−1</td><td>0</td><td>2</td><td>5</td></tr><tr><td>f(x)</td><td>4</td><td>1</td><td>−5</td><td>−14</td></tr></table>
<ul><li>f(2) = −5 (find x = 2, read below).</li><li>If f(x) = −14, then x = 5 (search the bottom row).</li><li>The y-intercept is f(0) = 1.</li></ul>
<div class="eg"><div class="lab">EXAMPLE — which equation fits?</div>
Test the table's points in each answer choice. Try f(x) = −3x + 1: f(−1) = 4 ✓, f(2) = −5 ✓, f(5) = −14 ✓. That's it.</div>
<h3>Functions in context</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
The cost to make n shirts is C(n) = 8n + 120. What does C(50) = 520 mean? It costs <strong>$520 to make 50 shirts</strong>.</div>
<div class="tip"><b>Plugging in answer choices</b> is the fastest method for "which function matches this table?". Use the easiest point first (usually x = 0).</div>
${QC("C(n) = 8n + 120. What is C(50)?","520","8 × 50 + 120 = 520.")}
`);
L("func","l6","Which form reveals what",7,`
<p>The same function can be written in different forms, and each form <em>shows</em> a different feature for free. Top scorers pick the form that answers the question.</p>
<table class="tbl" style="width:100%;margin:12px 0">
<tr><td><b>Form</b></td><td><b>Shows instantly</b></td></tr>
<tr><td>y = ax² + bx + c</td><td>y-intercept = c</td></tr>
<tr><td>y = a(x − p)(x − q)</td><td>x-intercepts p and q</td></tr>
<tr><td>y = a(x − h)² + k</td><td>vertex (h, k), max/min value k</td></tr>
<tr><td>y = a · bˣ</td><td>starting value a, growth factor b</td></tr>
</table>
<div class="eg"><div class="lab">EXAMPLE</div>
y = 2(x − 3)(x + 5) → the graph crosses the x-axis at <strong>3 and −5</strong>. And the vertex is halfway between: x = (3 + (−5))/2 = −1.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
"Which form shows the maximum height as a constant?" → vertex form, because k is the maximum.</div>
${QC("y = 2(x − 3)(x + 5). What is the positive x-intercept?","3","Set each factor to zero: x = 3 or x = −5.")}
`);
more("func",[
P("Table 5, 8, 11, 14 is:",["linear","exponential","quadratic","none"],0,"+3 each step."),
P("Table 2, 6, 18, 54 is:",["linear","exponential","quadratic","none"],1,"×3 each step."),
P("'Loses 12% of its value each year' is:",["linear","exponential decay","quadratic","constant"],1,"Percent change → exponential."),
N("Table: f(0) = 7, f(1) = 10, f(2) = 13. Find f(10).","37","f(x) = 3x + 7."),
N("f(x) = (x − 4)(x + 1). The y-intercept?","-4","f(0) = (−4)(1)."),
N("y = −(x − 2)² + 9. Maximum value?","9","Vertex form: k = 9."),
N("y = 3(x − 1)(x − 7). x-coordinate of the vertex?","4","Midway between 1 and 7."),
N("V(t) = 200 · 1.5^t. Starting value?","200","a = 200.")
],[
N("Table 1, 4, 9, 16, 25: next value?","36","Squares: 6² = 36."),
N("f(x) = x² − 3 at x = −4?","13","16 − 3."),
P("Which shows the x-intercepts directly?",["y = x² − x − 6","y = (x − 3)(x + 2)","y = (x − ½)² − 6.25","all equally"],1,"Factored form."),
N("A table has f(1) = 5, f(2) = 10, f(3) = 20. f(5)?","80","Doubles each step: 40, 80.")
],[
C("Linear table","Same difference each step."),
C("Exponential table","Same ratio each step (×b)."),
C("Quadratic table","Differences change by a constant (second difference)."),
C("Factored form shows","x-intercepts."),
C("Vertex form shows","Vertex (h, k) and max/min value."),
C("Standard form shows","y-intercept c.")
]);

/* =====================================================================
   UNIT: advm
   ===================================================================== */
L("advm","l4","Exponential models: reading every number",9,`
<p>An exponential model <span class="fx">f(t) = a · b^t</span> tells a whole story if you know how to read it.</p>
<ul><li><b>a</b> = starting amount (t = 0).</li>
<li><b>b &gt; 1</b> → growth by (b − 1) × 100%. b = 1.06 → grows 6%.</li>
<li><b>b &lt; 1</b> → decay by (1 − b) × 100%. b = 0.92 → shrinks 8%.</li></ul>
<h3>Different time periods</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
P(t) = 500 · 2^(t/3). The exponent t/3 means the population doubles <strong>every 3 years</strong>. After 9 years: 500 · 2³ = 4000.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
M(t) = 80 · (½)^(t/5) → half-life of 5 hours. After 10 hours: 80 · ¼ = 20.</div>
<h3>Compound interest</h3>
<div class="fbox">A = P(1 + r/n)^(nt)     n = times per year the interest is added</div>
<div class="eg"><div class="lab">EXAMPLE</div>
$1000 at 6% compounded monthly for 2 years: 1000(1 + 0.06/12)^(24) ≈ <strong>$1127.16</strong>.</div>
${QC("f(t) = 500(0.92)^t. By what percent does f decrease each period?","8","1 − 0.92 = 0.08 = 8%.")}
`);
L("advm","l5","Rational equations",8,`
<p>Equations with variables in the denominator. The strategy: <b>clear the fractions</b> by multiplying everything by the common denominator, then solve as usual — and check you didn't make any denominator zero.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
12/(x + 2) = 3 → multiply by (x + 2): 12 = 3(x + 2) → 12 = 3x + 6 → <strong>x = 2</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — cross-multiply</div>
3/(x + 1) = 2/(x − 1) → 3(x − 1) = 2(x + 1) → 3x − 3 = 2x + 2 → <strong>x = 5</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — the trap</div>
x/(x − 3) = 3/(x − 3) → x = 3. But x = 3 makes the denominator 0! So there is <strong>no solution</strong>.</div>
${NOTE("before you celebrate, glance at every denominator with your answer plugged in. If one becomes zero, that answer is forbidden.")}
${QC("Solve 12/(x + 2) = 3.","2","12 = 3x + 6 → x = 2.")}
`);
more("advm",[
N("P = 300 · 2^(t/4). Value at t = 8?","1200","2² = 4; 300 × 4."),
N("f(t) = 50(1.12)^t: percent growth per period?","12","1.12 − 1 = 0.12."),
N("Half-life 6 hours, start 64 mg. Amount after 18 hours?","8","Three halvings: 64 → 32 → 16 → 8."),
N("Solve 20/x = 4.","5","x = 20/4."),
N("Solve 6/(x − 1) = 2.","4","6 = 2x − 2."),
N("Solve 4/(x + 3) = 2/(x − 1).","5","4x − 4 = 2x + 6 → x = 5."),
P("(3 − i)(3 + i) =",["8","9 − i","10","9 + i²"],2,"9 − i² = 9 + 1 = 10."),
P("V = 2000(0.85)^t describes:",["15% growth","15% decay","85% decay","linear loss"],1,"b = 0.85 < 1: loses 15%.")
],[
N("$2000 at 5% compounded yearly for 2 years (dollars).","2205","2000 × 1.05² = 2205."),
P("x/(x − 2) = 2/(x − 2) has:",["x = 2","x = 0","no solution","infinitely many"],2,"x = 2 makes the denominator zero."),
N("A culture triples every 2 hours, starting at 100. Count after 6 hours?","2700","3³ × 100."),
N("Solve 1/x + 1/3 = 1/2.","6","1/x = 1/6.")
],[
C("a · b^t","a = start; b > 1 growth, b < 1 decay."),
C("Percent from b","b = 1.07 → +7%. b = 0.93 → −7%."),
C("2^(t/3)","Doubles every 3 time units."),
C("Compound interest","A = P(1 + r/n)^(nt)."),
C("Rational equation","Multiply by the common denominator; reject answers that zero a denominator.")
]);

/* =====================================================================
   UNIT: data
   ===================================================================== */
L("data","l4","Scatterplots, best-fit lines & predictions",9,`
<p>A <strong>scatterplot</strong> shows many (x, y) pairs as dots. We look for a <strong>trend</strong>.</p>
${FIG.scatter([[1,3],[2,4.2],[3,4.8],[4,6.5],[5,7],[6,8.4],[7,8.6],[8,10.4],[9,11],[2.5,5.5],[6.5,7.2]],{xmax:10,ymax:14,line:{m:1.1,b:2},xl:"hours studied",cap:"Positive trend: more hours, higher scores. Red = line of best fit y = 1.1x + 2."})}
<ul><li><b>Positive association:</b> dots rise to the right. <b>Negative:</b> they fall. <b>None:</b> a random cloud.</li>
<li><b>Strong</b> = dots hug the line; <b>weak</b> = loose cloud.</li></ul>
<h3>Predictions</h3>
<p>Plug x into the best-fit line. With y = 1.1x + 2, at x = 5 we predict 7.5.</p>
<h3>Residual = actual − predicted</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
Line y = 2x + 5. At x = 10 it predicts 25. The real data point is 27. Residual = 27 − 25 = <strong>2</strong> (the point sits 2 above the line).</div>
<div class="trap"><b>Correlation is not causation.</b> Ice-cream sales and sunburns rise together — but ice cream doesn't cause sunburn. Summer causes both.</div>
${QC("Line y = 2x + 5. At x = 10 the actual value is 27. Residual?","2","27 − 25 = 2.")}
`);
L("data","l5","Two-way tables",8,`
<p>A <strong>two-way table</strong> sorts people by two questions at once. They power many SAT probability and percent questions.</p>
<table class="tbl" style="width:100%;margin:10px 0">
<tr><td></td><td><b>Likes math</b></td><td><b>Doesn't</b></td><td><b>Total</b></td></tr>
<tr><td><b>Grade 10</b></td><td>30</td><td>20</td><td>50</td></tr>
<tr><td><b>Grade 11</b></td><td>45</td><td>15</td><td>60</td></tr>
<tr><td><b>Total</b></td><td>75</td><td>35</td><td>110</td></tr></table>
<ul><li>Fraction of <em>all students</em> who are Grade 10 and like math: 30/110.</li>
<li>Fraction of <em>Grade 10 students</em> who like math: 30/50 = 60%.</li>
<li>Fraction of <em>math-likers</em> in Grade 11: 45/75 = 60%.</li></ul>
<div class="tip"><b>The only skill:</b> find the phrase that sets the <em>whole</em> ("of the Grade 10 students", "among those who…"). That row or column total goes on the bottom.</div>
${NOTE("I have students physically put a finger on the row or column the question restricts to. It sounds silly. It works.")}
${QC("Using the table: what percent of Grade 11 students like math?","75","45/60 = 0.75.")}
`);
L("data","l6","Surveys, experiments & margin of error",8,`
<p>These questions have almost no math — just logic. Learn three rules and they're free points.</p>
<h3>Rule 1: Random <em>sampling</em> → you may generalize</h3>
<p>If people were chosen at random from a group, the results apply to <em>that whole group</em> — but not to a different group.</p>
<h3>Rule 2: Random <em>assignment</em> → you may claim cause</h3>
<p>Only an experiment where subjects were randomly put into treatment groups can show that one thing <strong>causes</strong> another. Surveys and observations only show association.</p>
<h3>Rule 3: Margin of error = a range</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
A poll says 45% ± 3%. The true value is plausibly between <strong>42% and 48%</strong>. Larger samples → smaller margin of error.</div>
<div class="trap"><b>Bias traps.</b> Asking only volunteers, only one school, or only people at a gym gives a biased sample — you can't generalize to everyone.</div>
${QC("A poll finds 45% with a margin of error of 3%. What is the upper end of the likely range (%)?","48","45 + 3.")}
`);
L("data","l7","Box plots, histograms & dot plots",8,`
<p>Different pictures of the same kind of information.</p>
<h3>Box plot (five-number summary)</h3>
<p>Minimum — Q1 — median — Q3 — maximum. The box covers the middle half of the data.</p>
<div class="fbox">IQR (interquartile range) = Q3 − Q1       range = max − min</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Q1 = 12, median 15, Q3 = 20 → IQR = 8. Half of all values lie between 12 and 20.</div>
<h3>Histogram</h3>
<p>Bars show how many values fall in each interval. To find the median, count to the middle value across the bars.</p>
<h3>Dot plot</h3>
<p>Each dot is one value. Great for finding mode (tallest stack), median (count to the middle) and mean (add up all dots).</p>
<div class="tip"><b>Shape.</b> Long tail to the right (skewed right) → mean is bigger than median. Tail to the left → mean is smaller.</div>
${QC("Q1 = 12 and Q3 = 20. What is the IQR?","8","20 − 12.")}
`);
more("data",[
N("Best-fit y = 3x + 4. Predicted y at x = 6?","22","3·6 + 4."),
N("Predicted 40, actual 35. Residual?","-5","35 − 40."),
P("Dots fall from left to right. The association is:",["positive","negative","none","causal"],1,"Going down → negative."),
N("Table: 40 of 160 people are left-handed. Percent?","25","40/160."),
N("Q1 = 30, Q3 = 52. IQR?","22","52 − 30."),
P("To conclude a drug CAUSES improvement, you need:",["a big survey","random assignment","a histogram","a high mean"],1,"Only randomized experiments show cause."),
N("Poll 62% ± 4%. Lower end of the range?","58","62 − 4."),
P("Data skewed right: mean compared with median is usually:",["smaller","larger","equal","zero"],1,"The long right tail pulls the mean up.")
],[
P("A survey of randomly chosen students at School A can be generalized to:",["all students in the country","all students at School A","all teenagers","nobody"],1,"Only to the population sampled."),
N("Table: 18 of the 45 seniors own a car. Fraction as a decimal?","0.4","18/45."),
N("Line y = −2x + 50. At x = 10 actual is 33. Residual?","3","Predicted 30; 33 − 30."),
N("Dot plot values 2, 3, 3, 3, 5, 8. Mean?","4","24/6.")
],[
C("Residual","actual − predicted. Positive = point above the line."),
C("Association vs causation","Correlation alone never proves cause."),
C("Two-way table","The phrase 'of the …' decides the denominator."),
C("Random sampling","Lets you generalize to the population sampled."),
C("Random assignment","Lets you claim cause and effect."),
C("Margin of error","estimate ± margin gives the plausible range."),
C("IQR","Q3 − Q1: spread of the middle half.")
]);

/* =====================================================================
   UNIT: prob
   ===================================================================== */
L("prob","l3","'At least one', dice & expected counts",8,`
<p>Three probability patterns that come up again and again.</p>
<h3>1. "At least one" → use the opposite</h3>
<div class="fbox">P(at least one) = 1 − P(none)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Flip 2 coins. P(no heads) = ½ × ½ = ¼. So P(at least one head) = 1 − ¼ = <strong>¾</strong>.</div>
<h3>2. Two dice = 36 outcomes</h3>
<p>6 × 6 = 36 equally likely pairs. Sum of 7 happens 6 ways (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) → P = 6/36 = 1/6.</p>
<h3>3. Expected count</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
If 15% of lightbulbs are defective, in a box of 200 you'd expect 0.15 × 200 = <strong>30</strong> defective ones.</div>
<h3>Without replacement</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
A bag has 3 red and 2 blue. Draw two without putting back. P(both red) = 3/5 × 2/4 = <strong>3/10</strong>. The second fraction changes because one red is gone.</div>
${QC("P(at least one head in 2 coin flips)? (fraction)","3/4","1 − 1/4.")}
`);
more("prob",[
N("P(at least one six in 2 dice rolls)? (fraction)","11/36","1 − (5/6)² = 11/36."),
N("P(sum of 7 with two dice)? (fraction)","1/6","6/36."),
N("8% of 500 phones are faulty. Expected faulty phones?","40","0.08 × 500."),
N("Bag: 4 red, 1 blue. Draw 2 without replacement. P(both red)? (fraction)","3/5","4/5 × 3/4 = 12/20."),
N("Two dice. P(double sixes)? (fraction)","1/36","1 of 36.")
],[
N("3 coins. P(at least one tail)? (fraction)","7/8","1 − 1/8."),
N("A 20% chance of rain each day for 2 independent days. P(no rain both days)? (decimal)","0.64","0.8 × 0.8."),
N("Deck of 10 cards numbered 1–10. P(number > 7)? (fraction)","3/10","8, 9, 10.")
],[
C("At least one","1 − P(none)."),
C("Two dice","36 outcomes; sum 7 has 6 ways."),
C("Expected count","probability × number of trials."),
C("Without replacement","The second fraction's top and bottom both drop.")
]);

/* =====================================================================
   UNIT: geo1
   ===================================================================== */
L("geo1","l4","Similar triangles: the deep dive",9,`
<p>Two triangles are <strong>similar</strong> if they have the same angles. Then all matching sides share one scale factor k.</p>
<h3>Spotting similarity (AA)</h3>
<p>You only need <b>two matching angles</b>. The classic SAT picture: a line drawn parallel to one side of a triangle creates a smaller triangle inside that is similar to the big one.</p>
<div class="eg"><div class="lab">EXAMPLE — nested triangles</div>
In triangle ABC, DE ∥ BC with D on AB and E on AC. AD = 4, AB = 10, DE = 6. Find BC.<br>
Scale factor = AB/AD = 10/4 = 2.5 → BC = 6 × 2.5 = <strong>15</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — shadows</div>
A 2 m pole casts a 3 m shadow. At the same time a tree casts a 24 m shadow. Height of tree: 2/3 = h/24 → <strong>h = 16 m</strong>.</div>
<h3>Area and similarity</h3>
<div class="fbox">sides × k   →   area × k²   →   volume × k³</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Scale factor 3, small area 5 → big area 5 × 9 = <strong>45</strong>.</div>
${QC("Similar triangles with scale factor 3. Small area 5. Big area?","45","5 × 3² = 45.")}
`);
L("geo1","l5","Polygons & their angles",7,`
<p>A polygon with n sides can be cut into (n − 2) triangles from one corner. Each triangle has 180°, so:</p>
<div class="fbox">sum of interior angles = (n − 2) × 180°
each angle of a REGULAR polygon = (n − 2) × 180° ÷ n
sum of exterior angles = 360° (always!)</div>
<table class="tbl" style="width:100%;margin:10px 0"><tr><td><b>Shape</b></td><td>triangle</td><td>square</td><td>pentagon</td><td>hexagon</td><td>octagon</td></tr>
<tr><td><b>Sum</b></td><td>180°</td><td>360°</td><td>540°</td><td>720°</td><td>1080°</td></tr>
<tr><td><b>Regular angle</b></td><td>60°</td><td>90°</td><td>108°</td><td>120°</td><td>135°</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>
Each exterior angle of a regular polygon is 30°. How many sides? 360 ÷ 30 = <strong>12</strong>.</div>
${QC("Each interior angle of a regular hexagon?","120","(6 − 2) × 180 ÷ 6 = 120.")}
`);
L("geo1","l6","Congruence & the triangle inequality",6,`
<p><strong>Congruent</strong> shapes are exact copies — same size and shape. Matching sides and angles are equal.</p>
<h3>The triangle inequality</h3>
<p>Any two sides together must be <em>longer</em> than the third — otherwise the triangle can't close.</p>
<div class="fbox">difference of two sides &lt; third side &lt; sum of two sides</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Two sides are 4 and 9. The third side is between 9 − 4 = 5 and 9 + 4 = 13 (not including them). So it's between 5 and 13.</div>
<h3>Big side ↔ big angle</h3>
<p>The longest side is always across from the largest angle; the shortest side is across from the smallest.</p>
${QC("Two sides are 4 and 9. Largest possible integer length of the third side?","12","It must be less than 13.")}
`);
more("geo1",[
N("Sum of interior angles of a pentagon?","540","3 × 180."),
N("Each interior angle of a regular octagon?","135","1080 ÷ 8."),
N("Regular polygon, exterior angle 40°. Number of sides?","9","360 ÷ 40."),
N("A 1.5 m person casts a 2 m shadow; a building casts 40 m. Building height (m)?","30","1.5/2 = h/40."),
N("Similar triangles, sides 4 and 10 match. The small perimeter is 18. Big perimeter?","45","Scale 2.5."),
N("Scale factor 2; small area 7. Big area?","28","7 × 4."),
P("Which can be triangle side lengths?",["2, 3, 6","3, 4, 8","5, 6, 10","1, 1, 3"],2,"5 + 6 > 10 ✓."),
N("Sides 7 and 3: smallest possible integer third side?","5","Must exceed 4.")
],[
N("DE ∥ BC; AD = 3, AB = 9, DE = 5. BC?","15","Scale 3."),
N("Interior angle sum of a 10-sided polygon?","1440","8 × 180."),
N("Cube scale factor 3: volume multiplies by?","27","3³."),
P("In a triangle with angles 40°, 60°, 80°, the longest side is opposite:",["40°","60°","80°","can't tell"],2,"Biggest angle ↔ longest side.")
],[
C("AA similarity","Two matching angles → similar triangles."),
C("Parallel line inside a triangle","Creates a smaller similar triangle."),
C("Area scale","× k² (volume × k³)."),
C("Polygon angle sum","(n − 2) × 180°."),
C("Exterior angles","Always add to 360°."),
C("Triangle inequality","difference < third side < sum.")
]);

/* =====================================================================
   UNIT: geo2
   ===================================================================== */
L("geo2","l4","Circle rules: inscribed angles, tangents & chords",9,`
<p>Four circle facts cover nearly every SAT circle question.</p>
<ol>
<li><b>Inscribed angle = half the central angle</b> on the same arc. Central 80° → inscribed 40°.</li>
<li><b>An angle in a semicircle is 90°.</b> If a triangle's side is a diameter and the corner is on the circle, it's a right angle.</li>
<li><b>A tangent is perpendicular to the radius</b> at the point where it touches. That gives you a right triangle → Pythagoras.</li>
<li><b>Arc measure = central angle.</b> An arc "of 60°" is 60/360 = 1/6 of the circle.</li>
</ol>
<div class="eg"><div class="lab">EXAMPLE — tangent</div>
A tangent from point P touches a circle of radius 5 at T. The distance from P to the center is 13. Then PT = √(13² − 5²) = <strong>12</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — arc length with the rule</div>
Radius 9, central angle 40°: arc = (40/360) × 2π × 9 = <strong>2π</strong>.</div>
${QC("Central angle 80°. Inscribed angle on the same arc?","40","Half of 80.")}
`);
L("geo2","l5","Circle equations: finding center & radius",8,`
<p>Standard form <span class="fx">(x − h)² + (y − k)² = r²</span> shows center (h, k) and radius r. But the SAT often hides it as an expanded equation — you complete the square twice.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
x² + y² − 6x + 4y − 12 = 0.<br>
Group: (x² − 6x) + (y² + 4y) = 12.<br>
Complete: (x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4.<br>
→ (x − 3)² + (y + 2)² = 25. Center <strong>(3, −2)</strong>, radius <strong>5</strong>.</div>
<div class="trap"><b>Two traps:</b> the center's signs flip (y + 2 → k = −2), and r² = 25 means r = 5, not 25.</div>
${QC("Radius of x² + y² + 8x − 9 = 0?","5","(x + 4)² + y² = 9 + 16 = 25.")}
`);
L("geo2","l6","Surface area & scaling shapes",7,`
<p><strong>Surface area</strong> = the total area of all outside faces (the amount of wrapping paper).</p>
<div class="fbox">box: SA = 2(lw + lh + wh)        cube: SA = 6s²
cylinder: SA = 2πr² + 2πrh</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Box 5 × 3 × 4: SA = 2(15 + 20 + 12) = <strong>94</strong> square units.</div>
<h3>Scaling</h3>
<p>If every length is multiplied by k:</p>
<div class="fbox">lengths × k      areas × k²      volumes × k³</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Double a cube's side: area × 4, volume × 8. A cube of volume 10 becomes volume 80.</div>
${NOTE("students always want to double the volume when the side doubles. Picture it: a 2×2×2 cube is made of eight 1×1×1 cubes.")}
${QC("A cube's side doubles. Its volume is multiplied by?","8","2³ = 8.")}
`);
more("geo2",[
N("Inscribed angle 35°. Central angle on the same arc?","70","Double it."),
N("Tangent problem: radius 6, distance to center 10. Tangent length?","8","√(100 − 36)."),
N("x² + y² − 10y = 0: radius?","5","x² + (y − 5)² = 25."),
N("Surface area of a cube with side 3?","54","6 × 9."),
N("Box 2 × 3 × 4: surface area?","52","2(6 + 8 + 12)."),
N("Radius triples; area multiplies by?","9","3²."),
N("Arc of 120° on radius 3, as a multiple of π.","2","(1/3) × 6π = 2π."),
P("Center of (x − 5)² + (y + 1)² = 16:",["(5, 1)","(−5, 1)","(5, −1)","(−5, −1)"],2,"Flip the signs inside.")
],[
N("x² + y² + 6x − 2y − 6 = 0: radius?","4","(x + 3)² + (y − 1)² = 16."),
N("Triangle inscribed in a semicircle: angle opposite the diameter (degrees)?","90","Thales' theorem."),
N("Cylinder r = 2, h = 5: total surface area as a multiple of π.","28","2π·4 + 2π·10 = 28π."),
N("Sphere volume 36π. Radius triples. New volume as a multiple of π.","972","36 × 27.")
],[
C("Inscribed angle","Half the central angle."),
C("Angle in a semicircle","90°."),
C("Tangent ⟂ radius","Right angle where the tangent touches."),
C("Circle from expanded form","Complete the square in x and y."),
C("Surface area of a box","2(lw + lh + wh)."),
C("Scale by k","Area × k², volume × k³.")
]);

/* =====================================================================
   UNIT: trig
   ===================================================================== */
L("trig","l3","Finding missing sides with trig",8,`
<p>Given an angle's trig ratio and one side, you can find another side. Pick the ratio that links <em>what you know</em> to <em>what you want</em>.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Hypotenuse 10 and sin θ = 0.6. Want the opposite side. sin = opp/hyp → opp = 0.6 × 10 = <strong>6</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Adjacent 12 and tan θ = 3/4. Want opposite. tan = opp/adj → opp = ¾ × 12 = <strong>9</strong>.</div>
${FIG.tri({a:"?",b:"12",ang:"θ",c:"",cap:"tan θ = opposite ÷ adjacent → opposite = 12 · tan θ"})}
<div class="eg"><div class="lab">EXAMPLE — ramp</div>
A ramp makes a 30° angle and is 8 m long (hypotenuse). Height = 8 · sin 30° = 8 · ½ = <strong>4 m</strong>.</div>
${QC("cos θ = 0.8 and the hypotenuse is 15. Adjacent side?","12","0.8 × 15.")}
`);
L("trig","l4","Radians, arcs & the unit circle",8,`
<p>A <strong>radian</strong> is the angle that makes an arc exactly one radius long. A full circle is 2π radians (= 360°).</p>
<div class="fbox">arc length s = r · θ     (θ in radians)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Radius 4, angle π/2: s = 4 · π/2 = <strong>2π</strong>.</div>
${FIG.circ({deg:60,r:"r",label:"60° = π/3 radians"})}
<h3>Unit circle basics</h3>
<p>On a circle of radius 1 centered at the origin, the point at angle θ is <span class="fx">(cos θ, sin θ)</span>.</p>
<ul><li>0 → (1, 0)   π/2 → (0, 1)   π → (−1, 0)   3π/2 → (0, −1)</li>
<li>Adding 2π gives the same point again (a full turn).</li></ul>
${QC("Radius 4, central angle π/2. Arc length as a multiple of π?","2","s = 4 · π/2 = 2π.")}
`);
more("trig",[
N("Hypotenuse 20, sin θ = 0.35. Opposite side?","7","0.35 × 20."),
N("Adjacent 8, tan θ = 1.5. Opposite?","12","1.5 × 8."),
N("A 10 m ladder makes a 30° angle with the ground. How high does it reach? (sin 30° = 0.5)","5","height = 10 × sin 30° = 5."),
N("Radius 6, angle π/3. Arc length as a multiple of π.","2","6 × π/3 = 2π."),
N("Convert 3π/4 radians to degrees.","135","× 180/π."),
N("x-coordinate of the unit-circle point at angle π?","-1","(cos π, sin π) = (−1, 0).")
],[
N("sin θ = 5/13, hypotenuse 26. Opposite?","10","5/13 × 26."),
N("Arc 5π on radius 10. Angle in radians as a multiple of π?","0.5","θ = s/r = π/2."),
N("Convert 150° to radians: enter the coefficient of π as a fraction.","5/6","150/180.")
],[
C("Find a side","Choose sin/cos/tan linking the known side to the wanted side."),
C("Arc length (radians)","s = rθ."),
C("Full circle","2π radians = 360°."),
C("Unit circle point","(cos θ, sin θ).")
]);

/* =====================================================================
   NEW UNIT: Word problems masterclass
   ===================================================================== */
var WP={id:"wp",em:"📖",color:"#fde7c8",title:"Word problems masterclass",tag:"Reading like a detective: turning long stories into short equations, step by step.",lessons:[
{id:"l1",t:"The 5-step method for any word problem",mins:9,h:`
<p>Here's the truth after decades of teaching: most SAT points are lost in <em>reading</em>, not in math. So we'll build a routine you can run on autopilot.</p>
<ol>
<li><b>Read the last sentence first.</b> Know exactly what they want before reading the story.</li>
<li><b>Name the unknowns.</b> Write "Let x = …" with the unit.</li>
<li><b>Translate sentence by sentence.</b> Numbers and relationships only; ignore decoration.</li>
<li><b>Solve.</b> Use algebra, plugging in, or Desmos — whatever is fastest.</li>
<li><b>Re-read the question and check units.</b> Did they ask for x, 2x, the total, the difference?</li>
</ol>
<div class="eg"><div class="lab">EXAMPLE</div>
"Maya is 4 years older than twice her brother's age. The sum of their ages is 31. How old is Maya?"<br>
① They want Maya's age. ② Let b = brother's age. ③ Maya = 2b + 4; b + (2b + 4) = 31. ④ 3b = 27 → b = 9. ⑤ Maya = 2(9) + 4 = <strong>22</strong> (not 9!).</div>
${NOTE("the wrong answer 9 will be sitting in the choices, waiting for everyone who skipped step 5.")}
${QC("A number increased by 40% equals 84. What is the number?","60","1.4x = 84 → x = 60.")}
`},
{id:"l2",t:"The translation dictionary",mins:8,h:`
<p>Every word problem is written in a small, repeating vocabulary. Master it and the story turns into math automatically.</p>
<table class="tbl" style="width:100%;margin:10px 0">
<tr><td><b>English</b></td><td><b>Math</b></td></tr>
<tr><td>is, was, will be, equals, results in</td><td>=</td></tr>
<tr><td>of (with fractions/percents)</td><td>×</td></tr>
<tr><td>per, for each, every</td><td>÷ (a rate) or × when totaling</td></tr>
<tr><td>a number, some amount</td><td>x</td></tr>
<tr><td>twice / thrice</td><td>2× / 3×</td></tr>
<tr><td>x less than y</td><td>y − x (order flips!)</td></tr>
<tr><td>x more than y</td><td>y + x</td></tr>
<tr><td>the ratio of a to b</td><td>a / b</td></tr>
<tr><td>at least / at most / no more than</td><td>≥ / ≤ / ≤</td></tr>
<tr><td>exceeds, more than</td><td>&gt;</td></tr></table>
<h3>Setups you'll see again and again</h3>
<ul><li><b>Age:</b> "in 5 years" → add 5 to everyone.</li>
<li><b>Consecutive:</b> n, n+1, n+2 (even/odd: n, n+2, n+4).</li>
<li><b>Money:</b> total = price × quantity, summed over items.</li>
<li><b>Percent change:</b> new = old × (1 ± p).</li></ul>
${QC("'Seven less than three times a number is 20.' Find the number.","9","3x − 7 = 20 → x = 9.")}
`},
{id:"l3",t:"Multi-step problems & keeping units straight",mins:9,h:`
<p>Hard word problems chain two or three small steps. Keep each step's result labeled with its unit and you'll never lose track.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
A car uses 1 gallon per 28 miles. Gas costs $3.50 per gallon. What does a 420-mile trip cost?<br>
Step 1: gallons = 420 ÷ 28 = 15 gallons.<br>
Step 2: cost = 15 × $3.50 = <strong>$52.50</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A painter covers 350 ft² per gallon. A wall is 20 ft by 9 ft and needs 2 coats. How many whole gallons must be bought?<br>
Area = 180 ft², two coats = 360 ft². 360 ÷ 350 = 1.03 → buy <strong>2 gallons</strong> (round up — you need enough).</div>
<div class="tip"><b>Unit sentence:</b> write "15 gallons", "$52.50" — never bare numbers. A number without a unit is a mistake waiting to happen.</div>
${QC("A car gets 30 miles per gallon; gas costs $4 per gallon. Cost of a 450-mile trip?","60","15 gallons × $4.")}
`}],
prac:[
N("Tom is 3 times as old as Lily. In 6 years he'll be twice her age. Lily's age now?","6","3L + 6 = 2(L + 6) → L = 6."),
N("The sum of three consecutive integers is 96. The largest?","33","31, 32, 33."),
N("A shirt costs $4 more than a hat. Together they cost $30. The shirt?","17","h + h + 4 = 30 → h = 13."),
N("'Five more than half a number is 17.' The number?","24","x/2 + 5 = 17."),
N("A recipe needs 3 eggs per 12 cookies. Eggs for 60 cookies?","15","5 batches."),
N("A car uses 1 gallon per 25 miles; gas $3.20/gal. Cost for 400 miles?","51.2","16 gal × 3.20."),
N("A pool fills at 12 L/min. How many hours to fill 3,600 L?","5","300 minutes."),
N("After spending 1/3 of her money and then $10, Ana has $30 left. Starting amount?","60","(2/3)x − 10 = 30.")
],
quiz:[
N("Ben has twice as many cards as Sam. Ben gives Sam 10 and they're equal. How many did Sam start with?","20","2s − 10 = s + 10."),
N("A store marks up a $40 item 50%, then discounts 20%. Final price?","48","40 × 1.5 × 0.8."),
N("Tickets: $12 each plus a $5 fee per order. Max tickets in one order with $80?","6","12t + 5 ≤ 80 → t ≤ 6.25."),
N("Wall area 240 ft², 2 coats, 1 gallon covers 400 ft². Whole gallons to buy?","2","480/400 = 1.2 → 2."),
N("The ratio of boys to girls is 4:5 with 36 students. How many more girls than boys?","4","16 boys, 20 girls."),
N("A number decreased by 25% is 45. The number?","60","0.75x = 45.")
],
cards:[
C("Step 1 of every word problem","Read the last sentence first — know what's being asked."),
C("'is' means","="),
C("'x less than y'","y − x (order flips)."),
C("Age problems","'In n years' → add n to every person's age."),
C("Multi-step","Label every intermediate result with its unit."),
C("Final check","Re-read the question: x or 2x? total or difference?")
]};

/* =====================================================================
   NEW UNIT: Desmos superpowers
   ===================================================================== */
var DES={id:"desmos",em:"🖥️",color:"#d7f5ea",title:"Desmos superpowers",tag:"The built-in graphing calculator can solve a third of the test. Learn exactly how.",lessons:[
{id:"l1",t:"Graph it, click it: solving equations visually",mins:8,h:`
<p>The digital SAT includes the Desmos graphing calculator on every math question. Students who use it well save 5–10 minutes per module. Here's the core move.</p>
<h3>Solve any equation: graph both sides</h3>
<p>To solve 2x + 7 = x² − 1, type <span class="fx">y = 2x + 7</span> and <span class="fx">y = x² − 1</span> on separate lines. Click where they cross — Desmos shows the coordinates. The x-values are your solutions (here x = −2 and x = 4).</p>
<h3>Find zeros, vertices and intersections</h3>
<ul><li><b>Zeros:</b> type the function; click the gray dots on the x-axis.</li>
<li><b>Vertex:</b> click the turning point of a parabola.</li>
<li><b>Systems:</b> type both lines; click the crossing point.</li></ul>
${FIG.plane({r:8,fns:[{f:function(x){return 2*x+7}},{f:function(x){return x*x-1},c:"red"}],pts:[[-2,3,"(−2, 3)","vio"]],cap:"The two sides cross at x = −2 (and x = 4, off the top): those are the solutions."})}
<div class="tip"><b>Zoom tip:</b> if you can't see a crossing, use the zoom buttons or the wrench icon to change the window.</div>
${NOTE("practice in the free Desmos calculator at home before test day. The skill is only useful if your fingers already know it.")}
${QC("Solve by thinking graphically: where does y = 2x + 7 meet y = x² − 1? Enter the negative x.","-2","x² − 2x − 8 = 0 → x = 4 or −2.")}
`},
{id:"l2",t:"Sliders & tables: finding hidden constants",mins:8,h:`
<p>Two advanced tricks for questions with an unknown constant.</p>
<h3>Sliders</h3>
<p>Type an equation with a letter, like <span class="fx">y = x² + kx + 9</span>. Desmos offers to add a <b>slider</b> for k. Drag it and watch: when does the parabola just touch the x-axis? (k = 6 or −6.) Great for "for what value of k…" questions.</p>
<h3>Tables & regression</h3>
<p>Given a table of points, enter them in a Desmos table, then type <span class="fx">y₁ ~ mx₁ + b</span>. Desmos finds the best-fit m and b. Works for exponential too: <span class="fx">y₁ ~ a·b^x₁</span>.</p>
<h3>Checking equivalent expressions</h3>
<p>Graph the original expression and each answer choice. The one whose graph lies exactly on top is equivalent.</p>
${QC("For what positive k does y = x² + kx + 9 just touch the x-axis?","6","Discriminant k² − 36 = 0.")}
`},
{id:"l3",t:"When NOT to use Desmos",mins:5,h:`
<p>Desmos is a power tool, not a crutch. Skip it when:</p>
<ul><li>The arithmetic is one step (2x = 14). Typing takes longer than thinking.</li>
<li>The question is about reading a table, a chart, or a sentence's meaning.</li>
<li>The answer needs an exact form like 3√2 or 5π — Desmos gives decimals. (You can still use it to check: 3√2 ≈ 4.243.)</li>
<li>Geometry questions with pictures — draw and reason instead.</li></ul>
<div class="tip"><b>Best habit:</b> solve by hand, then verify with Desmos if time allows. That combination is how you get to zero careless mistakes.</div>
${NOTE("my highest scorers used Desmos on about one question in four — always on purpose, never out of panic.")}
`}],
prac:[
N("Solve x² = x + 6 graphically: the positive solution.","3","x² − x − 6 = 0."),
N("Intersection of y = 3x − 2 and y = x + 4: x-value.","3","2x = 6."),
N("Vertex x of y = x² − 8x + 1 (you could click it).","4","−b/2a."),
N("For what positive k does y = x² + kx + 16 touch the x-axis once?","8","k² = 64."),
N("Zeros of y = x² − 5x: the nonzero one.","5","x(x − 5)."),
P("Best tool to check which expression equals (x + 2)²?",["graph each and compare","guess","long division","histogram"],0,"Matching graphs → equivalent.")
],
quiz:[
N("Solve 2^x = x + 2 graphically: the positive solution.","2","2² = 4 = 2 + 2."),
N("y = x² − 4 and y = 2x − 1: larger x of intersection.","3","x² − 2x − 3 = 0."),
N("Minimum value of y = x² + 6x + 13.","4","(x + 3)² + 4."),
P("Desmos gives 4.2426… The exact choice is most likely:",["3√2","2√3","√17","4.25"],0,"3√2 ≈ 4.2426.")
],
cards:[
C("Solve any equation in Desmos","Graph both sides as y = …; click the intersection."),
C("Sliders","Type a letter constant; drag to find special cases."),
C("Regression","y₁ ~ mx₁ + b fits a line to a table."),
C("Equivalent expressions","Graphs lie exactly on top of each other."),
C("Don't use Desmos for","One-step arithmetic, reading charts, exact radical answers.")
]};

/* =====================================================================
   NEW UNIT: The 800 zone
   ===================================================================== */
var HARD={id:"hard",em:"👑",color:"#f5e1ff",title:"The 800 zone: hardest question patterns",tag:"The handful of question types that separate 750 from 800 — and exactly how to beat each one.",lessons:[
{id:"l1",t:"Parameter questions (find the constant)",mins:10,h:`
<p>The hardest module usually has 2–4 questions with a mystery constant (k, a, c). They all reduce to a few rules you already know. Here they are side by side:</p>
<table class="tbl" style="width:100%;margin:10px 0">
<tr><td><b>Question says…</b></td><td><b>Use this rule</b></td></tr>
<tr><td>linear equation has no solution</td><td>x-coefficients equal, constants different</td></tr>
<tr><td>linear equation has infinite solutions</td><td>both sides identical</td></tr>
<tr><td>system has no solution</td><td>a₁/a₂ = b₁/b₂ ≠ c₁/c₂</td></tr>
<tr><td>quadratic has exactly one solution</td><td>b² − 4ac = 0</td></tr>
<tr><td>quadratic has no real solution</td><td>b² − 4ac &lt; 0</td></tr>
<tr><td>(x − a) is a factor of p</td><td>p(a) = 0</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>
x² − 8x + c = 0 has exactly one solution. 64 − 4c = 0 → <strong>c = 16</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
y = x² + c and y = 4x meet at exactly one point. Set equal: x² − 4x + c = 0. One solution → 16 − 4c = 0 → <strong>c = 4</strong>. (The line is tangent to the parabola.)</div>
${QC("x² − 8x + c = 0 has exactly one solution. Find c.","16","64 − 4c = 0.")}
`},
{id:"l2",t:"Equivalent expressions: matching coefficients",mins:9,h:`
<p>"If (ax + 3)(2x − 5) = 6x² + bx − 15 for all x, find b." These look scary but are pure bookkeeping.</p>
<div class="fbox">If two polynomials are equal for ALL x, matching powers have equal coefficients.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Expand: (ax + 3)(2x − 5) = 2ax² − 5ax + 6x − 15.<br>
x² terms: 2a = 6 → a = 3.<br>
x terms: −5a + 6 = b → b = −15 + 6 = <strong>−9</strong>.</div>
<h3>The plug-in shortcut</h3>
<p>Since it's true for ALL x, choose x = 0 or x = 1 to make equations fast. At x = 1: (a + 3)(−3) = 6 + b − 15. With a = 3: −18 = b − 9 → b = −9 ✓.</p>
<div class="eg"><div class="lab">EXAMPLE — fractions</div>
If 12/(x + 3) is written as A/(x + 3), clearly A = 12. If (5x + 7)/(x + 1) = 5 + B/(x + 1), then 5x + 7 = 5(x + 1) + B → B = 2.</div>
${QC("(ax + 3)(2x − 5) = 6x² + bx − 15 for all x. Find b.","-9","a = 3, b = −5a + 6 = −9.")}
`},
{id:"l3",t:"Tricky function questions",mins:9,h:`
<p>Top-level function questions combine several ideas. Three patterns:</p>
<h3>1. Transformations from a table</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
If f(2) = 5, and g(x) = f(x − 3) + 1, then g(5) = f(2) + 1 = <strong>6</strong>. (Choose x so the inside becomes a known input.)</div>
<h3>2. Solving f(x) = g(x) without equations</h3>
<p>From a table, find the x where both rows show the same value.</p>
<h3>3. Composite with an unknown</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
f(x) = 2x + k and f(f(1)) = 17. f(1) = 2 + k, then f(2 + k) = 4 + 2k + k = 4 + 3k = 17 → <strong>k = 13/3</strong>.</div>
${NOTE("slow down on these. Write each inner value on paper. Every mistake I've seen here is a skipped step, not a missing idea.")}
${QC("f(2) = 5 and g(x) = f(x − 3) + 1. Find g(5).","6","g(5) = f(2) + 1.")}
`},
{id:"l4",t:"Geometry combos: circles + triangles + coordinates",mins:9,h:`
<p>The hardest geometry combines two ideas. Look for the hidden right triangle — it's almost always there.</p>
<div class="eg"><div class="lab">EXAMPLE — chord distance</div>
A chord of length 16 sits 6 units from the center. Radius? Half the chord (8) and the distance (6) form a right triangle with the radius as hypotenuse: r = √(64 + 36) = <strong>10</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — square in a circle</div>
A square with side 6 is inscribed in a circle. The diagonal (6√2) is the diameter, so r = 3√2 and area = π(3√2)² = <strong>18π</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — point on a circle</div>
Is (5, 7) on (x − 2)² + (y − 3)² = 25? (3)² + (4)² = 25 ✓ Yes.</div>
${QC("A chord of length 16 is 6 units from the center. Radius?","10","√(8² + 6²).")}
`},
{id:"l5",t:"Your final 800 checklist",mins:6,h:`
<p>This is the page I hand every student in the last week. Read it before each practice test.</p>
<ol>
<li><b>Every question is worth the same.</b> Don't burn 4 minutes on one. Flag it and return.</li>
<li><b>Underline what's asked.</b> x, 2x, x + y, the positive solution, the nearest tenth…</li>
<li><b>Write every step.</b> Mental shortcuts cause sign errors.</li>
<li><b>Check with a second method</b> — plug back in, or Desmos.</li>
<li><b>Units:</b> minutes vs hours, area vs volume, percent vs decimal.</li>
<li><b>"Which must be true?"</b> Test with specific numbers, including negatives and zero.</li>
<li><b>Grid-ins:</b> fractions fine, no mixed numbers, don't round early.</li>
<li><b>Leave nothing blank.</b> No penalty for guessing.</li>
<li><b>Review your mistake list</b> in this app every week. Your own errors are the best teacher you'll ever have.</li>
</ol>
${NOTE("the difference between 760 and 800 is almost never knowledge — it's two careless mistakes. This checklist exists to kill those two mistakes.")}
`}],
prac:[
N("x² + 10x + c = 0 has exactly one solution. c?","25","100 − 4c = 0."),
N("(x − 3) is a factor of x² + kx − 6. k?","-1","9 + 3k − 6 = 0."),
N("(2x + a)(x + 4) = 2x² + 11x + 12 for all x. a?","3","8 + a = 11."),
N("f(4) = 9 and g(x) = 2f(x + 1). Find g(3).","18","g(3) = 2f(4)."),
N("Square of side 4 inscribed in a circle. Area as a multiple of π.","8","r = 2√2, r² = 8."),
N("For what c does x² − 6x + c = 0 have no real solutions? Enter the smallest integer c.","10","36 − 4c < 0 → c > 9."),
N("f(x) = 3x + k, f(f(0)) = 16. k?","4","f(0) = k, f(k) = 4k = 16."),
N("Chord 24, distance 5 from the center. Radius?","13","√(144 + 25).")
],
quiz:[
N("ax + 5 = 3(x + b) has infinitely many solutions. Find the product a·b.","5","Match: a = 3 and 3b = 5, so a·b = 3 · 5/3 = 5."),
N("x² − kx + 9 = 0 has one solution with k > 0. k?","6","k² − 36 = 0."),
N("(5x + 7)/(x + 1) = 5 + B/(x + 1). B?","2","5x + 7 = 5x + 5 + B."),
N("Circle (x − 1)² + (y + 2)² = r² passes through (4, 2). r?","5","9 + 16 = 25."),
N("kx − 2y = 7 and 3x − y = 1 have no solution. k?","6","k/3 = 2."),
N("g(x) = f(x + 2) − 3, f(5) = 10. g(3)?","7","f(5) − 3.")
],
cards:[
C("One solution (quadratic)","Discriminant b² − 4ac = 0."),
C("Equal for all x","Match coefficients of each power (or plug in x = 0, 1)."),
C("g(x) = f(x − 3)","Choose x so the inside hits a known input."),
C("Chord problems","Half-chord, distance to center, radius form a right triangle."),
C("Square in a circle","Diagonal = diameter."),
C("760 → 800","Kill careless mistakes: underline, write steps, check.")
]};

/* insert new units into the path */
(function(){
  var iSys=UNITS.indexOf(findUnit("sys"));
  UNITS.splice(iSys+1,0,WP);
  UNITS.push(DES,HARD);
})();
