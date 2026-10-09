/* =====================================================================
   AXIOM — DEEP LESSONS (1): going deeper on the core of SAT algebra
   ===================================================================== */
function DEEP(uid,lid,mins,html){var u=findUnit(uid);if(!u)return;u.lessons.forEach(function(l){if(l.id===lid&&!l.deep){l.h+=html;l.mins+=mins;l.deep=1}})}

DEEP("alg","l2",9,`
<h3>Going deeper: why the balance rule works</h3>
<p>An equation says two expressions have <em>exactly the same value</em>. If two things are equal and you add 5 to both, they're still equal. Multiply both by 3 — still equal. That's the only rule you ever use: <b>whatever you do, do it to the whole of both sides</b>.</p>
<p>The goal is to “unwrap” x. Think of x as a gift wrapped in layers: the last layer put on is the first one you take off. So you undo operations in the <b>reverse</b> of the order of operations.</p>
<div class="eg"><div class="lab">EXAMPLE — unwrapping layer by layer</div>Solve 3(x − 2)/4 + 5 = 11.<br>What happened to x, in order: subtract 2 → multiply by 3 → divide by 4 → add 5.<br>Undo in reverse: subtract 5 → 3(x − 2)/4 = 6. Multiply by 4 → 3(x − 2) = 24. Divide by 3 → x − 2 = 8. Add 2 → <strong>x = 10</strong>.<br>Check: 3(8)/4 + 5 = 6 + 5 = 11 ✓</div>
<h3>Worked examples, from easy to hard</h3>
<div class="eg"><div class="lab">1 · A negative coefficient</div>7 − 2x = 15 → subtract 7: −2x = 8 → divide by −2: <strong>x = −4</strong>. Check: 7 − 2(−4) = 7 + 8 = 15 ✓</div>
<div class="eg"><div class="lab">2 · Decimals</div>0.4x + 3 = 1.2x − 5. Multiply every term by 10 to remove decimals: 4x + 30 = 12x − 50 → 80 = 8x → <strong>x = 10</strong>.</div>
<div class="eg"><div class="lab">3 · Two fractions</div>(x + 1)/3 − (x − 2)/4 = 1. Multiply EVERY term by 12: 4(x + 1) − 3(x − 2) = 12 → 4x + 4 − 3x + 6 = 12 → x + 10 = 12 → <strong>x = 2</strong>. Notice the −3 multiplies the whole bracket: −3 · (−2) = +6.</div>
<div class="eg"><div class="lab">4 · Brackets on both sides</div>2(3x − 1) − 3(x + 4) = x + 6 → 6x − 2 − 3x − 12 = x + 6 → 3x − 14 = x + 6 → 2x = 20 → <strong>x = 10</strong>.</div>
<h3>Questions students ask</h3>
<p><b>“Can I just move a term to the other side and change its sign?”</b> Yes — that's a shortcut for subtracting (or adding) it on both sides. But if you're ever unsure, write the full step; most sign errors come from the shortcut.</p>
<p><b>“Can I divide both sides by x?”</b> Avoid it. If x could be 0, dividing by it is impossible and you can lose a solution. In x² = 3x, dividing by x gives x = 3 and loses x = 0. Instead: x² − 3x = 0 → x(x − 3) = 0 → x = 0 or 3.</p>
<p><b>“What if x disappears?”</b> If you're left with something false (4 = 9), there's no solution. If it's always true (4 = 4), every number works.</p>
<div class="trap"><b>The #1 slip:</b> distributing a minus sign to only the first term. −3(x − 2) is −3x <b>+ 6</b>.</div>
${QC("Solve 5 − 3(x − 1) = 2x − 7.","3","5 − 3x + 3 = 2x − 7 → 8 − 3x = 2x − 7 → 15 = 5x → x = 3.")}
${QC("Solve (2x − 3)/5 + 1 = (x + 4)/3.","14","Multiply every term by 15: 3(2x − 3) + 15 = 5(x + 4) → 6x − 9 + 15 = 5x + 20 → 6x + 6 = 5x + 20 → x = 14.")}
`);
DEEP("lines","l1",9,`
<h3>Going deeper: slope is a rate of change</h3>
<p>Slope isn't just “steepness” — it tells you <b>how fast y changes compared with x</b>, with units. If y is dollars and x is hours, a slope of 15 means $15 per hour. If y is litres and x is minutes, a slope of −4 means the tank loses 4 litres every minute.</p>
${'<div class="figrow">'+FIG.plane({r:4,lines:[{m:2,b:0}],cap:"positive: rises"})+FIG.plane({r:4,lines:[{m:-1,b:1},],cap:"negative: falls"})+FIG.plane({r:4,lines:[{m:0,b:2}],cap:"zero: flat"})+'</div>'}
<h3>Four ways to find a slope</h3>
<ul><li><b>Two points:</b> (y₂ − y₁) ÷ (x₂ − x₁).</li><li><b>A graph:</b> pick two exact grid points, count rise and run.</li><li><b>A table:</b> change in y ÷ change in x between any two rows.</li><li><b>An equation:</b> rewrite as y = mx + b and read m.</li></ul>
<h3>Worked examples</h3>
<div class="eg"><div class="lab">1 · Negative coordinates</div>Through (−3, 4) and (5, −2): m = (−2 − 4) ÷ (5 − (−3)) = −6 ÷ 8 = <strong>−3/4</strong>. Careful: 5 − (−3) = 8.</div>
<div class="eg"><div class="lab">2 · From a table with jumps</div>x: 2, 6, 10 · y: 7, 13, 19. x goes up 4 while y goes up 6 → m = 6/4 = <strong>3/2</strong>.</div>
<div class="eg"><div class="lab">3 · In context</div>A tank holds 50 L after 2 minutes and 26 L after 8 minutes. Slope = (26 − 50) ÷ (8 − 2) = −24 ÷ 6 = <strong>−4 L per minute</strong>: it's draining.</div>
<div class="eg"><div class="lab">4 · Finding a missing coordinate</div>A line through (1, k) and (4, 10) has slope 2. (10 − k) ÷ (4 − 1) = 2 → 10 − k = 6 → <strong>k = 4</strong>.</div>
<h3>Common slips</h3>
<ul><li>Mixing the order: (y₂ − y₁) on top must be matched by (x₂ − x₁) on the bottom — same point first both times.</li><li>Putting x on top. Remember “rise over run”: up-and-down over left-and-right.</li><li>Calling a vertical line's slope 0. Vertical = undefined; horizontal = 0.</li></ul>
${QC("Slope through (−2, 5) and (4, −7)?","-2","−12 ÷ 6.")}
${QC("A line through (2, k) and (5, 11) has slope 3. Find k.","2","(11 − k) ÷ 3 = 3 → k = 2.")}
`);
DEEP("lines","l2",10,`
<h3>Going deeper: building y = mx + b from anything</h3>
<p>Every “write the equation” question comes down to finding two numbers: <b>m</b> and <b>b</b>. Find m first (from a slope, two points, or a parallel/perpendicular line), then use one point to find b.</p>
<div class="eg"><div class="lab">1 · Slope and a point</div>Slope −3 through (−2, 7): 7 = −3(−2) + b → 7 = 6 + b → b = 1 → <strong>y = −3x + 1</strong>.</div>
<div class="eg"><div class="lab">2 · Two points</div>(2, 1) and (6, 9): m = 8/4 = 2. Then 1 = 2(2) + b → b = −3 → <strong>y = 2x − 3</strong>.</div>
<div class="eg"><div class="lab">3 · Parallel</div>Parallel to y = 4x − 2 through (1, 9): same slope 4 → 9 = 4 + b → <strong>y = 4x + 5</strong>.</div>
<div class="eg"><div class="lab">4 · Perpendicular to a standard-form line</div>Perpendicular to 2x + 3y = 6 through (4, 1). First the original slope: 3y = −2x + 6 → m = −2/3. Perpendicular slope = 3/2. Then 1 = (3/2)(4) + b → b = −5 → <strong>y = (3/2)x − 5</strong>.</div>
<h3>Converting between forms</h3>
<p>Standard form Ax + By = C → solve for y: 3x − 4y = 8 → −4y = −3x + 8 → <strong>y = (3/4)x − 2</strong>. Divide <em>every</em> term by −4.</p>
<h3>Reading every part in context</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Savings: S = 1200 − 75w (w = weeks).<br>• 1200: savings at the start.<br>• −75: savings drop $75 each week.<br>• x-intercept (S = 0): 1200 − 75w = 0 → w = 16 — the money runs out after 16 weeks.<br>• S = 600 when w = 8: halfway after 8 weeks.</div>
<div class="tip">The x-intercept in a story usually means “when does it reach zero?” — a favourite SAT question.</div>
${QC("Line perpendicular to y = −(1/2)x + 3 through (1, 4): what is b?","2","Slope 2 → 4 = 2 + b.")}
${QC("Rewrite 5x + 2y = 12 as y = mx + b. Enter m.","-5/2","2y = −5x + 12 → y = −2.5x + 6.")}
`);
DEEP("sys","l3",11,`
<h3>Going deeper: one problem, three methods</h3>
<p>Solve 2x + y = 11 and x − y = 1 three ways — and notice they all agree.</p>
<div class="eg"><div class="lab">SUBSTITUTION</div>From the first: y = 11 − 2x. Put it into the second: x − (11 − 2x) = 1 → 3x − 11 = 1 → x = 4, then y = 3.</div>
<div class="eg"><div class="lab">ELIMINATION</div>Add the equations: (2x + y) + (x − y) = 11 + 1 → 3x = 12 → x = 4, y = 3.</div>
<div class="eg"><div class="lab">GRAPHING</div>y = −2x + 11 and y = x − 1 cross at <strong>(4, 3)</strong>.</div>
${FIG.plane({r:6,lines:[{m:-2,b:11},{m:1,b:-1}],pts:[[4,3,"(4, 3)","vio"]],cap:"Both lines pass through (4, 3)."})}
<h3>Choosing the fastest method</h3>
<table class="tbl" style="width:100%"><tr><td><b>If you see…</b></td><td><b>Use</b></td></tr><tr><td>y = … or x = … already</td><td>substitution</td></tr><tr><td>matching or opposite coefficients</td><td>elimination</td></tr><tr><td>ugly decimals / fractions</td><td>clear them first, or Desmos</td></tr><tr><td>they ask for x + y or x − y</td><td>add / subtract the equations</td></tr></table>
<h3>Harder examples</h3>
<div class="eg"><div class="lab">1 · Fractions</div>x/2 + y/3 = 4 and x − y = 3. Multiply the first by 6: 3x + 2y = 24. From the second y = x − 3: 3x + 2(x − 3) = 24 → 5x = 30 → x = 6, y = 3.</div>
<div class="eg"><div class="lab">2 · Decimals</div>0.5x + 0.2y = 3.2 and 0.3x − 0.1y = 0.6. Multiply both by 10: 5x + 2y = 32 and 3x − y = 6 → y = 3x − 6 → 5x + 6x − 12 = 32 → x = 4, y = 6.</div>
<div class="eg"><div class="lab">3 · A word problem</div>3 pens and 2 notebooks cost $13; 5 pens and 4 notebooks cost $24. Double the first: 6p + 4n = 26. Subtract the second: p = 2. Then 6 + 2n = 13 → n = 3.50. A pen costs <strong>$2</strong>, a notebook <strong>$3.50</strong>.</div>
<h3>How many solutions — without solving</h3>
<p>Put both in y = mx + b. Different slopes → exactly one solution. Same slope, different intercepts → none. Same slope and intercept → infinitely many.</p>
${QC("x + 2y = 10 and 3x − 2y = 6. Find y.","3","Add: 4x = 16 → x = 4 → 2y = 6.")}
${QC("4 apples and 1 melon cost $7; 2 apples and 3 melons cost $11. Price of a melon?","3","Double the 2nd: 4a + 6m = 22; subtract the 1st: 5m = 15.")}
`);
DEEP("quad","l2",11,`
<h3>Going deeper: which method should I use?</h3>
<table class="tbl" style="width:100%"><tr><td><b>Equation looks like…</b></td><td><b>Fastest method</b></td></tr><tr><td>x² = 49 or (x − 3)² = 16 (no separate x term)</td><td>square roots (±)</td></tr><tr><td>small whole numbers that factor</td><td>factoring</td></tr><tr><td>anything else</td><td>quadratic formula</td></tr><tr><td>you need the vertex too</td><td>completing the square</td></tr><tr><td>messy decimals, or you want a check</td><td>Desmos</td></tr></table>
<p><b>Always first:</b> move everything to one side so it equals 0. Factoring and the formula only work on “… = 0”.</p>
<h3>The quadratic formula without mistakes</h3>
<ol><li>Write a, b and c <b>with their signs</b>.</li><li>Compute the discriminant D = b² − 4ac on its own line.</li><li>Simplify √D.</li><li>Divide the <b>whole</b> top by 2a.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>3x² − 4x − 2 = 0: a = 3, b = −4, c = −2. D = 16 − 4(3)(−2) = 16 + 24 = 40. √40 = 2√10. x = (4 ± 2√10)/6 = <strong>(2 ± √10)/3</strong> ≈ 1.72 or −0.39.</div>
<h3>More worked examples</h3>
<div class="eg"><div class="lab">1 · Not yet = 0</div>x² + 6x = 16 → x² + 6x − 16 = 0 → (x + 8)(x − 2) = 0 → <strong>x = −8 or 2</strong>.</div>
<div class="eg"><div class="lab">2 · Leading coefficient 2</div>2x² = 9x − 4 → 2x² − 9x + 4 = 0 → (2x − 1)(x − 4) = 0 → <strong>x = 1/2 or 4</strong>.</div>
<div class="eg"><div class="lab">3 · The classic trap</div>(x − 3)(x + 5) = 9. You may NOT set each bracket equal to 9! Expand: x² + 2x − 15 = 9 → x² + 2x − 24 = 0 → (x + 6)(x − 4) = 0 → <strong>x = −6 or 4</strong>.</div>
<h3>Why the zero-product rule needs a zero</h3>
<p>If A × B = 0, one of them must be 0 — nothing else multiplies to zero. But A × B = 9 has endless possibilities (1 × 9, 3 × 3, 0.5 × 18 …), so you can't split it. That's why we always rearrange to “= 0” first.</p>
${QC("Larger solution of 2x² − 9x + 4 = 0?","4","(2x − 1)(x − 4).")}
${QC("(x + 2)(x − 1) = 4. Positive solution?","2","x² + x − 6 = 0 → (x + 3)(x − 2).")}
`);
DEEP("quad","l3",10,`
<h3>Going deeper: one parabola, every feature</h3>
<p>Take y = 2x² − 8x + 6 and write it three ways:</p>
<div class="fbox">standard:  y = 2x² − 8x + 6        → y-intercept 6
factored:  y = 2(x − 1)(x − 3)    → x-intercepts 1 and 3
vertex:    y = 2(x − 2)² − 2      → vertex (2, −2), minimum −2</div>
${FIG.plane({r:6,fns:[{f:function(x){return 2*x*x-8*x+6}}],pts:[[2,-2,"vertex (2, −2)","vio"],[1,0,"1"],[3,0,"3"],[0,6,"y-int 6","grn"]],cap:"Same parabola: intercepts, vertex and axis x = 2."})}
<h3>Symmetry: the free shortcut</h3>
<p>A parabola is a mirror image across its axis. Points at the same distance from the axis have the same height.</p>
<div class="eg"><div class="lab">EXAMPLE</div>The axis is x = 2 and (−1, 5) is on the graph. −1 is 3 units left of the axis, so the point 3 units right — <strong>(5, 5)</strong> — is also on it.</div>
<div class="eg"><div class="lab">EXAMPLE</div>The zeros are −4 and 6. The vertex x is halfway: (−4 + 6)/2 = <strong>1</strong>.</div>
<h3>Projectile problems in depth</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A ball's height is h(t) = −16t² + 32t + 48 (feet, seconds).<br>• Launch height: h(0) = <b>48 ft</b>.<br>• Highest point at t = −32/(2·−16) = 1 s: h(1) = −16 + 32 + 48 = <b>64 ft</b>.<br>• Hits the ground when h = 0: −16(t² − 2t − 3) = 0 → (t − 3)(t + 1) = 0 → <b>t = 3 s</b> (reject −1).<br>• Same height again: since the axis is t = 1, the ball is at 48 ft at t = 0 and at t = 2.</div>
${QC("y = x² − 6x + 8. y-coordinate of the vertex?","-1","x = 3, y = 9 − 18 + 8.")}
${QC("A parabola has axis x = 4 and passes through (1, 7). The point (k, 7) is also on it, k ≠ 1. Find k.","7","1 is 3 left of 4, so 3 right: 7.")}
`);
DEEP("func","l1",9,`
<h3>Going deeper: what makes something a function</h3>
<p>A function gives <b>exactly one output for every input</b>. A vending machine is a function: press B4, always get the same snack. If pressing B4 sometimes gave chips and sometimes a drink, it wouldn't be a function.</p>
<ul><li>Table: no x-value may appear twice with different y-values.</li><li>Graph: the vertical line test.</li><li>Equation: y = x² is a function; x = y² is not (x = 4 gives y = 2 and y = −2).</li></ul>
<h3>Evaluating carefully — including expressions</h3>
<div class="eg"><div class="lab">1 · Negatives</div>f(x) = 2x² − 3x. f(−2) = 2(−2)² − 3(−2) = 2·4 + 6 = <strong>14</strong>. Brackets around −2 every time.</div>
<div class="eg"><div class="lab">2 · Putting in an expression</div>f(x) = x² − 2x. Find f(a + 1). Replace every x with (a + 1): (a + 1)² − 2(a + 1) = a² + 2a + 1 − 2a − 2 = <strong>a² − 1</strong>.</div>
<div class="eg"><div class="lab">3 · Combining values</div>f(x) = 3x + 1. f(2) + f(5) = 7 + 16 = 23. But f(2 + 5) = f(7) = 22. Different! f(a) + f(b) is not f(a + b) in general.</div>
<h3>Reading f(x) in sentences</h3>
<p>If C(n) is the cost of n tickets, “C(4) = 54” means <i>four tickets cost $54</i>. “C(n) = 90” asks <i>how many tickets cost $90?</i> — solve for n.</p>
<h3>When two functions are equal</h3>
<div class="eg"><div class="lab">EXAMPLE</div>f(x) = 2x + 7 and g(x) = 5x − 8. f(x) = g(x) when 2x + 7 = 5x − 8 → x = 5. On a graph, that's where the two lines cross.</div>
${QC("f(x) = 3x − 4. For what x is f(x) = 11?","5","3x = 15.")}
${QC("f(x) = x² + 1. What is f(3) − f(−2)?","5","10 − 5.")}
`);
DEEP("func","l3",10,`
<h3>Going deeper: several transformations at once</h3>
<p>For y = a·f(x − h) + k, work in this order: <b>horizontal shift → stretch/flip → vertical shift</b>. The easiest way is to follow one point.</p>
<div class="eg"><div class="lab">EXAMPLE — following a point</div>(2, 5) is on y = f(x). Where does it go on y = −2f(x − 1) + 3?<br>• x − 1 inside → move right 1: x = 3.<br>• ×2: height 10. Flip (−): −10. Then +3: −7.<br>Image: <strong>(3, −7)</strong>.</div>
<h3>Transformations from a table</h3>
<table class="tbl" style="width:100%"><tr><td>x</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><td>f(x)</td><td>6</td><td>4</td><td>9</td><td>1</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>g(x) = f(x + 2) − 3. g(1) = f(3) − 3 = 9 − 3 = <strong>6</strong>. g(2) = f(4) − 3 = <strong>−2</strong>. The trick: choose x so that the inside becomes a value the table has.</div>
<h3>Recognising a transformation from two graphs</h3>
<p>Compare one clear point, usually the vertex or a corner. If the vertex moved from (0, 0) to (−3, 2), the new function is f(x + 3) + 2. If the graph is upside down, there's a minus in front.</p>
${FIG.plane({r:6,fns:[{f:function(x){return Math.abs(x)},c:"ink2",dash:"6 6"},{f:function(x){return Math.abs(x+3)+2}}],pts:[[-3,2,"(−3, 2)"]],cap:"|x| (dashed) moved left 3 and up 2: |x + 3| + 2."})}
${QC("(4, −1) is on y = f(x). Its image on y = f(x − 3) + 5 has what y-coordinate?","4","Right 3, up 5 → (7, 4).")}
`);
DEEP("exp","l1",9,`
<h3>Going deeper: why every law is true</h3>
<p>You never need to memorise the laws blindly — expand and look:</p>
<ul><li>x³ · x² = (x·x·x)(x·x) = five x's = x⁵ → <b>add</b>.</li><li>x⁵ ÷ x² = (x·x·x·x·x)/(x·x) → two cancel, three remain = x³ → <b>subtract</b>.</li><li>(x²)³ = x²·x²·x² = x⁶ → <b>multiply</b>.</li><li>x⁰: x³ ÷ x³ = 1, but also x³⁻³ = x⁰. So x⁰ = 1.</li></ul>
<h3>Combining several laws</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Simplify (3x²y³)² · (2xy)³ ÷ (12x⁵y⁸).<br>(3x²y³)² = 9x⁴y⁶. (2xy)³ = 8x³y³. Multiply: 72x⁷y⁹. Divide by 12x⁵y⁸: <strong>6x²y</strong>.</div>
<h3>Negative bases and brackets</h3>
<div class="fbox">(−2)⁴ = 16      −2⁴ = −16      (−2)³ = −8      (−1)ⁿ = 1 if n even, −1 if n odd</div>
<h3>Exponents inside equations</h3>
<div class="eg"><div class="lab">EXAMPLE</div>2ˣ · 2³ = 2¹⁰ → 2^(x + 3) = 2¹⁰ → x + 3 = 10 → <strong>x = 7</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>If (x²)ᵏ · x³ = x¹¹ for all x, then 2k + 3 = 11 → <strong>k = 4</strong>.</div>
<div class="trap"><b>Traps:</b> (x + y)² ≠ x² + y² and 2³ · 3³ = 6³ (same exponent, multiply bases) but 2³ · 2⁴ = 2⁷ (same base, add exponents). Check which part is the same.</div>
${QC("Simplify (2a³)³ ÷ (4a⁵) = k·aⁿ. Enter k.","2","8a⁹ ÷ 4a⁵ = 2a⁴.")}
${QC("If 3ˣ · 3² = 3⁹, find x.","7","x + 2 = 9.")}
`);

/* ---------------- new comprehensive lessons ---------------- */
L("lines","l8","The four faces of a line: story, table, graph, equation",16,`
<p>The SAT shows the same linear relationship in four different costumes. If you can move between them, almost every linear question becomes routine. We'll follow <b>one</b> situation through all four.</p>
<h3>Face 1: the story</h3>
<p>“A phone plan charges a $15 monthly fee plus $0.05 per text message.” Key words: a fixed amount (15) and an amount <em>per</em> unit (0.05) → linear.</p>
<h3>Face 2: the equation</h3>
<div class="fbox">C = 0.05t + 15        (t = texts, C = monthly cost in $)</div>
<p>The “per” number is the slope; the fixed amount is the intercept.</p>
<h3>Face 3: the table</h3>
<table class="tbl" style="width:100%"><tr><td>texts t</td><td>0</td><td>100</td><td>200</td><td>400</td></tr><tr><td>cost C ($)</td><td>15</td><td>20</td><td>25</td><td>35</td></tr></table>
<p>Every extra 100 texts adds $5: 5 ÷ 100 = 0.05 per text — the slope again. The t = 0 column shows the intercept.</p>
<h3>Face 4: the graph</h3>
${FIG.plane({r:6,lines:[{m:0.5,b:1.5}],pts:[[0,1.5,"(0, 15)"],[2,2.5,"(200, 25)"]],cap:"Scaled picture: starts at 15 and rises steadily; the y-intercept is the fixed fee."})}
<p>The line starts at the fee on the vertical axis and rises by the rate. A steeper line would mean a higher price per text.</p>
<h3>Translating between faces — the moves</h3>
<table class="tbl" style="width:100%"><tr><td><b>From → to</b></td><td><b>What to do</b></td></tr>
<tr><td>story → equation</td><td>fixed amount = b, per-unit amount = m</td></tr>
<tr><td>table → equation</td><td>m = Δy ÷ Δx; b = y when x = 0 (or solve with one row)</td></tr>
<tr><td>graph → equation</td><td>read b on the y-axis; count rise/run between grid points</td></tr>
<tr><td>equation → meaning</td><td>“starts at b, changes by m per unit of x”</td></tr></table>
<h3>SAT-style questions on one situation</h3>
<div class="eg"><div class="lab">Q1</div>What does 0.05 represent? → The cost of each text message ($0.05 per text).</div>
<div class="eg"><div class="lab">Q2</div>How many texts make the bill $27.50? → 0.05t + 15 = 27.5 → t = <strong>250</strong>.</div>
<div class="eg"><div class="lab">Q3</div>Plan B costs $25 with unlimited texts. When is Plan A cheaper? → 0.05t + 15 &lt; 25 → t &lt; 200: fewer than <strong>200 texts</strong>.</div>
<div class="eg"><div class="lab">Q4</div>The company raises the fee to $18 but keeps the rate. How does the graph change? → Same slope, shifted up 3: a <strong>parallel line</strong>.</div>
${NOTE("when a question confuses you, sketch the face you find easiest — usually a tiny table with x = 0, 1, 2. Most students who “don't get” a linear question get it instantly with three rows of numbers.")}
${QC("A table shows (0, 12), (3, 21), (6, 30). Write y = mx + b: enter m.","3","9 ÷ 3.")}
${QC("A pool has 800 L and drains at 25 L per minute. After how many minutes is it empty?","32","800 − 25t = 0.")}
`);
L("alg","l10","Ten patterns of SAT word problems",18,`
<p>SAT word problems look endless, but almost all of them repeat a small set of patterns. Recognise the pattern and you already know the equation. Here are the ten that matter most, each with a full example.</p>
<h3>1. Fixed + rate</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A gym charges $35 to join and $22 per month. Total after 9 months? 35 + 22·9 = <strong>$233</strong>. Equation shape: total = fixed + rate × units.</div>
<h3>2. Break-even (two plans)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Plan A: 40 + 3n. Plan B: 25 + 5n. Equal when 40 + 3n = 25 + 5n → n = <strong>7.5</strong> units. Set the two expressions equal.</div>
<h3>3. Total value of two kinds</h3>
<div class="eg"><div class="lab">EXAMPLE</div>40 tickets: adults $12, children $7, total $380. a + c = 40 and 12a + 7c = 380 → 12a + 7(40 − a) = 380 → 5a = 100 → <strong>20 adults</strong>.</div>
<h3>4. Percent change</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A $250 bike is 20% off. 250 × 0.8 = <strong>$200</strong>. Pattern: new = old × (1 ± p).</div>
<h3>5. Reverse percent</h3>
<div class="eg"><div class="lab">EXAMPLE</div>After a 15% raise, pay is $920. Before: 920 ÷ 1.15 = <strong>$800</strong>.</div>
<h3>6. Rate × time</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A cyclist rides 18 km/h for 2.5 h: distance = <strong>45 km</strong>. Pattern: amount = rate × time (works for distance, pages, litres…).</div>
<h3>7. Ratio share</h3>
<div class="eg"><div class="lab">EXAMPLE</div>$600 split 2 : 3 → 5 parts of $120 → <strong>$240 and $360</strong>.</div>
<h3>8. Consecutive or related numbers</h3>
<div class="eg"><div class="lab">EXAMPLE</div>One number is 6 more than twice another; they sum to 39. x + (2x + 6) = 39 → x = 11, the other <strong>28</strong>.</div>
<h3>9. Inequality limit</h3>
<div class="eg"><div class="lab">EXAMPLE</div>An elevator holds at most 1,000 kg. A 70 kg operator plus boxes of 30 kg: 70 + 30b ≤ 1000 → b ≤ 31 → <strong>31 boxes</strong>.</div>
<h3>10. Growth by a factor</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A $5,000 investment grows 4% per year: after 3 years 5000 × 1.04³ ≈ <strong>$5,624.32</strong>.</div>
<h3>How to identify the pattern fast</h3>
<table class="tbl" style="width:100%"><tr><td><b>Clue words</b></td><td><b>Pattern</b></td></tr><tr><td>“plus … per …”</td><td>1 · fixed + rate</td></tr><tr><td>“when will they be equal / cost the same”</td><td>2 · break-even</td></tr><tr><td>two kinds, a count and a total value</td><td>3 · system</td></tr><tr><td>“% off / % more”</td><td>4 or 5 · percent</td></tr><tr><td>“per hour / per minute”</td><td>6 · rate × time</td></tr><tr><td>“in the ratio”</td><td>7 · ratio share</td></tr><tr><td>“at most / at least / no more than”</td><td>9 · inequality</td></tr><tr><td>“each year by …%”, “doubles”</td><td>10 · growth factor</td></tr></table>
${NOTE("say the pattern number out loud before you write anything. Naming the pattern is half the solution — the other half is arithmetic.")}
${QC("Plan A: 60 + 4m; Plan B: 30 + 7m. For how many months m are they equal?","10","30 = 3m.")}
${QC("50 coins of nickels (5¢) and dimes (10¢) are worth $3.60. How many dimes?","22","5n + 10d = 360, n + d = 50 → 5d = 110.")}
`);
(function(){var L_=findUnit("lines");L_.lessons.sort(function(a,b){return (a.id==="ws")-(b.id==="ws")});var A=findUnit("alg");A.lessons.sort(function(a,b){return (a.id==="l0"?-1:0)-(b.id==="l0"?-1:0)||((a.id==="ws")-(b.id==="ws"))})})();
