/* =====================================================================
   ZERO TO 800 — DEEP LESSONS (2)
   exp · quad · func · advm · data · prob · geo1 · geo2 · trig · wp · sys
   ===================================================================== */
L("exp","l6","Zero, negative & fractional exponents — and why they work",12,`
<p>Exponents with 0, negatives and fractions look strange, but they follow one simple pattern. Watch what happens when we go down the powers of 2:</p>
<table class="tbl" style="width:100%"><tr><td>2³</td><td>2²</td><td>2¹</td><td>2⁰</td><td>2⁻¹</td><td>2⁻²</td><td>2⁻³</td></tr><tr><td>8</td><td>4</td><td>2</td><td><b>1</b></td><td><b>1/2</b></td><td><b>1/4</b></td><td><b>1/8</b></td></tr></table>
<p>Each step to the right divides by 2. Keep the pattern going past 2¹ and you get 2⁰ = 1, then halves.</p>
<div class="fbox">a⁰ = 1   (a ≠ 0)
a⁻ⁿ = 1/aⁿ           1/a⁻ⁿ = aⁿ
(a/b)⁻ⁿ = (b/a)ⁿ
a^(1/n) = ⁿ√a        a^(m/n) = (ⁿ√a)ᵐ</div>
<div class="eg"><div class="lab">EXAMPLE</div>5⁻² = 1/25. (2/3)⁻² = (3/2)² = 9/4. 1/4⁻¹ = 4.</div>
<div class="eg"><div class="lab">EXAMPLE — moving factors</div>Simplify 6x⁻³y² / (2x²y⁻¹). Numbers: 6/2 = 3. x: x⁻³⁻² = x⁻⁵. y: y²⁻⁽⁻¹⁾ = y³. Answer 3y³/x⁵.</div>
<div class="eg"><div class="lab">EXAMPLE — fractional</div>32^(3/5) = (⁵√32)³ = 2³ = <strong>8</strong>. 49^(−1/2) = 1/√49 = <strong>1/7</strong>.</div>
<div class="trap"><b>Traps:</b> a negative exponent does NOT make the number negative (2⁻³ = 1/8, positive). And −3² = −9 but (−3)² = 9.</div>
${QC("Compute 4⁻² (fraction).","1/16","1/4².")}
${QC("Compute 27^(−2/3) (fraction).","1/9","1/(∛27)² = 1/9.")}
`);
L("exp","l7","Radicals: simplify, add, multiply & rationalize",13,`
<p>A <strong>radical</strong> (root) is simplified when no perfect square is left inside it.</p>
<h3>Simplify: pull out perfect squares</h3>
<div class="fbox">√(ab) = √a · √b        perfect squares: 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144</div>
<div class="eg"><div class="lab">EXAMPLE</div>√48 = √(16 · 3) = 4√3.   √200 = √(100 · 2) = 10√2.   √(x⁶) = x³.</div>
<h3>Add and subtract: only like radicals</h3>
<p>Treat √3 like a variable: 2√3 + 5√3 = 7√3. But √2 + √3 can't be combined.</p>
<div class="eg"><div class="lab">EXAMPLE</div>√12 + √27 = 2√3 + 3√3 = <strong>5√3</strong> — simplify first, then they match!</div>
<h3>Multiply: multiply outsides, multiply insides</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(2√3)(5√6) = 10√18 = 10 · 3√2 = <strong>30√2</strong>. And √5 · √5 = 5.</div>
<h3>Rationalize: no roots in the denominator</h3>
<div class="eg"><div class="lab">EXAMPLE</div>6/√3 = 6√3/3 = <strong>2√3</strong> (multiply top and bottom by √3).</div>
<div class="eg"><div class="lab">EXAMPLE — conjugate</div>4/(3 − √5): multiply by (3 + √5)/(3 + √5): 4(3 + √5)/(9 − 5) = <strong>3 + √5</strong>.</div>
<div class="trap"><b>Trap:</b> √(a + b) ≠ √a + √b. √(9 + 16) = 5, not 7.</div>
${QC("Simplify √75 = a√3. Enter a.","5","√(25·3).")}
${QC("Simplify √8 + √18 = k√2. Enter k.","5","2√2 + 3√2.")}
`);
L("quad","l8","Solving by square roots & quadratic word problems",13,`
<p>When a quadratic has no x-term — just a square and a number — you don't need to factor. Isolate the square and take the square root of both sides. <b>Remember the ±.</b></p>
<div class="eg"><div class="lab">EXAMPLE</div>3x² − 12 = 63 → 3x² = 75 → x² = 25 → x = <strong>±5</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — a squared bracket</div>(x − 3)² = 16 → x − 3 = ±4 → x = <strong>7 or −1</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — not a perfect square</div>x² = 18 → x = ±√18 = <strong>±3√2</strong>.</div>
<div class="eg"><div class="lab">NO SOLUTION</div>x² + 9 = 0 → x² = −9: no real number squares to a negative.</div>
<h3>Word problems that become quadratics</h3>
<div class="eg"><div class="lab">AREA</div>A rectangle's length is 3 more than its width; area 70. w(w + 3) = 70 → w² + 3w − 70 = 0 → (w + 10)(w − 7) = 0 → w = 7 (a width can't be negative). Dimensions <strong>7 by 10</strong>.</div>
<div class="eg"><div class="lab">PROJECTILE</div>h(t) = −16t² + 48t + 64. When does it hit the ground? −16t² + 48t + 64 = 0 → divide by −16: t² − 3t − 4 = 0 → (t − 4)(t + 1) = 0 → <strong>t = 4 s</strong>. Max height at t = 1.5: h = 100 ft.</div>
<div class="eg"><div class="lab">CONSECUTIVE NUMBERS</div>Two consecutive positive integers have product 156: n(n + 1) = 156 → n² + n − 156 = 0 → (n + 13)(n − 12) = 0 → <strong>12 and 13</strong>.</div>
<div class="tip">In real-world problems, reject answers that make no sense (negative lengths or times) — the SAT expects you to.</div>
${QC("Solve (x + 2)² = 49. Enter the larger solution.","5","x + 2 = ±7.")}
${QC("Solve 3x² − 27 = 0. Enter the positive solution.","3","3x² = 27 → x² = 9 → x = ±3.")}
`);
L("func","l8","Parent functions & reading any graph",13,`
<p>Most graphs on the SAT are versions of a few <strong>parent functions</strong>. Know their shapes and you can read almost any graph.</p>
${'<div class="figrow">'+FIG.plane({r:4,lines:[{m:1,b:0}],cap:"y = x (line)"})+FIG.plane({r:4,fns:[{f:function(x){return x*x}}],cap:"y = x² (parabola)"})+FIG.plane({r:4,fns:[{f:function(x){return Math.abs(x)}}],cap:"y = |x| (V-shape)"})+'</div>'}
${'<div class="figrow">'+FIG.plane({r:4,fns:[{f:function(x){return x<0?NaN:Math.sqrt(x)}}],cap:"y = √x (half-arch)"})+FIG.plane({r:4,fns:[{f:function(x){return Math.pow(2,x)}}],cap:"y = 2ˣ (exponential)"})+FIG.plane({r:4,fns:[{f:function(x){return Math.abs(x)<0.15?NaN:1/x}}],cap:"y = 1/x (two branches)"})+'</div>'}
<h3>What to read from any graph</h3>
<ul><li><b>Intercepts:</b> where it crosses the axes. y-intercept = f(0); x-intercepts = zeros.</li>
<li><b>Increasing / decreasing:</b> read left to right — uphill means increasing.</li>
<li><b>Maximum / minimum:</b> the highest and lowest points (and their y-values).</li>
<li><b>Domain / range:</b> which x-values and y-values the graph covers. y = √x has domain x ≥ 0.</li>
<li><b>Where f(x) &gt; 0:</b> the parts of the graph above the x-axis.</li></ul>
<div class="eg"><div class="lab">EXAMPLE</div>For y = x² − 4: zeros at x = ±2, minimum −4 at x = 0, decreasing for x &lt; 0, increasing for x &gt; 0, f(x) &lt; 0 between −2 and 2.</div>
<div class="tip"><b>Transformations still apply:</b> y = |x − 3| + 1 is the V-shape moved right 3 and up 1, with its corner at (3, 1).</div>
${QC("Where is the corner (vertex) of y = |x + 2| − 5? Enter its y-coordinate.","-5","Left 2, down 5 → (−2, −5).")}
`);
L("advm","l6","Polynomial graphs: zeros, multiplicity & end behavior",13,`
<p>The factored form of a polynomial tells you its whole graph.</p>
<h3>Zeros come from the factors</h3>
<p>y = (x + 2)(x − 1)(x − 3) crosses the x-axis at x = −2, 1 and 3.</p>
${FIG.plane({r:5,fns:[{f:function(x){return 0.4*(x+2)*(x-1)*(x-3)}}],pts:[[-2,0,"−2"],[1,0,"1"],[3,0,"3"]],cap:"y = (x + 2)(x − 1)(x − 3), scaled: three zeros, three crossings."})}
<h3>Multiplicity: cross or bounce?</h3>
<ul><li>A factor to an <b>odd</b> power (x − 1) or (x − 1)³: the graph <b>crosses</b> the axis.</li>
<li>A factor to an <b>even</b> power (x − 1)²: the graph <b>touches and bounces back</b>.</li></ul>
${FIG.plane({r:5,fns:[{f:function(x){return 0.35*(x+2)*(x-1)*(x-1)}}],pts:[[-2,0,"cross"],[1,0,"bounce"]],cap:"y = (x + 2)(x − 1)²: crosses at −2, bounces at 1."})}
<h3>End behavior: look at the leading term</h3>
<table class="tbl" style="width:100%"><tr><td></td><td><b>leading coefficient +</b></td><td><b>leading coefficient −</b></td></tr><tr><td><b>even degree</b></td><td>both ends up ↑ ↑</td><td>both ends down ↓ ↓</td></tr><tr><td><b>odd degree</b></td><td>left down, right up ↓ ↑</td><td>left up, right down ↑ ↓</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE — SAT style</div>A graph crosses the x-axis at −3 and 4 and bounces at 0. Which could be its equation? A factor x² (bounce at 0), (x + 3), (x − 4): <strong>y = x²(x + 3)(x − 4)</strong>.</div>
<div class="trap"><b>Sign trap:</b> a zero at x = −3 comes from the factor (x + 3), not (x − 3).</div>
${QC("How many x-intercepts does y = (x − 5)²(x + 1) have?","2","Zeros at 5 and −1.")}
`);
L("data","l9","Reading every kind of chart",12,`
<p>Many SAT data questions are about careful reading. Every chart is read the same way: <b>title → axes and units → scale → then the question</b>.</p>
<h3>Bar charts</h3>
${FIG.bars([45,30,60,25],["Bus","Bike","Walk","Car"],{title:"How 160 students get to school",hi:2,cap:"Compare heights. Walk is the mode; Walk − Car = 35."})}
<h3>Line graphs</h3>
<p>Show change over time. The <b>steepest</b> segment is the fastest change. Slope between two points = rate of change.</p>
${FIG.scatter([[0,2],[2,4],[4,5],[6,8],[8,9],[10,12]],{xmax:10,ymax:14,line:null,xl:"months",cap:"Read points carefully; the rate between months 4 and 6 is (8 − 5) ÷ 2 = 1.5 per month."})}
<h3>Pie charts</h3>
<p>Each slice is a percent of the whole; slices add to 100%. To get a count: percent × total. A slice of 25% in a 160-person survey = 40 people. A slice's angle = percent × 360°.</p>
<h3>Histograms & frequency tables</h3>
<p>Bars stand for intervals (like 60–69). The height is how many values fall in each. To find the median, count to the middle value.</p>
<h3>Tables</h3>
<p>Always check whether numbers are counts or percents, and which total they use.</p>
<div class="trap"><b>Scale traps:</b> an axis that doesn't start at 0 exaggerates differences; gridlines may go up by 5 or 20, not 1.</div>
${QC("In the bar chart above, what percent of the 160 students walk? (number only)","37.5","60 ÷ 160.")}
${QC("A pie slice is 15% of 240 people. How many people?","36","0.15 × 240.")}
`);
L("prob","l4","Counting: permutations & combinations",12,`
<p>When there are too many outcomes to list, we count them with multiplication.</p>
<h3>Factorial</h3>
<div class="fbox">n! = n × (n − 1) × … × 2 × 1        5! = 120,  4! = 24,  3! = 6,  0! = 1</div>
<p>n! is the number of ways to arrange n different things in a row. 5 books on a shelf: 5! = <strong>120</strong> ways.</p>
<h3>Permutations: order matters</h3>
<div class="eg"><div class="lab">EXAMPLE</div>8 runners; how many ways to award gold, silver, bronze? 8 × 7 × 6 = <strong>336</strong>. (First place has 8 choices, then 7 remain, then 6.)</div>
<h3>Combinations: order does NOT matter</h3>
<p>Choosing a group (a team, a committee) — swapping people doesn't make a new group. Divide by the arrangements of the chosen group.</p>
<div class="fbox">C(n, k) = n! / (k! (n − k)!)</div>
<div class="eg"><div class="lab">EXAMPLE</div>Choose 3 people from 8 for a committee: 336 ÷ 3! = 336 ÷ 6 = <strong>56</strong>.</div>
<div class="tip"><b>Ask:</b> “If I swap two chosen items, is it a different result?” Yes → permutation (president/vice-president). No → combination (two club members).</div>
<div class="eg"><div class="lab">EXAMPLE — with probability</div>From 5 boys and 4 girls, 2 are chosen at random. P(both girls) = C(4, 2) / C(9, 2) = 6/36 = <strong>1/6</strong>.</div>
${QC("How many ways can 4 people stand in a line?","24","4! = 24.")}
${QC("How many ways to choose 2 toppings from 6?","15","6·5/2.")}
`);
L("prob","l5","Independent vs dependent events & conditional probability",12,`
<p>Two events are <strong>independent</strong> if one doesn't change the chances of the other (two coin flips). They are <strong>dependent</strong> if the first changes the second (drawing cards without putting them back).</p>
<div class="fbox">independent:  P(A and B) = P(A) × P(B)
dependent:    P(A and B) = P(A) × P(B given A)
conditional:  P(B | A) = P(A and B) ÷ P(A)</div>
<div class="eg"><div class="lab">INDEPENDENT</div>Roll a die and flip a coin: P(6 and heads) = 1/6 × 1/2 = <strong>1/12</strong>.</div>
<div class="eg"><div class="lab">DEPENDENT</div>A box has 4 red and 6 blue pens. Take two without replacement. P(red then red) = 4/10 × 3/9 = 12/90 = <strong>2/15</strong>.</div>
<h3>Tree diagrams</h3>
<p>Draw branches for the first event, then branches for the second. Multiply along a path; add across paths.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Same box: P(one of each colour) = P(R then B) + P(B then R) = 4/10·6/9 + 6/10·4/9 = 24/90 + 24/90 = <strong>8/15</strong>.</div>
<h3>Conditional probability from a table</h3>
<p>“Given” shrinks the whole to one group. If 30 of 50 seniors drive and the question is “given a student is a senior”, the answer is 30/50 — not 30/(all students).</p>
${QC("A bag has 3 green and 2 yellow marbles. Draw two without replacement. P(both yellow)? (fraction)","1/10","2/5 × 1/4.")}
`);
L("geo1","l7","Transformations: slide, flip, turn & resize",12,`
<p>A <strong>transformation</strong> moves a shape. The original is the pre-image; the result is the image (often labelled A′, “A prime”).</p>
<div class="fbox">translation (slide)  (x, y) → (x + a, y + b)
reflection over x-axis  (x, y) → (x, −y)
reflection over y-axis  (x, y) → (−x, y)
reflection over y = x   (x, y) → (y, x)
rotation 90° counter-clockwise about the origin  (x, y) → (−y, x)
rotation 180°           (x, y) → (−x, −y)
dilation by k (from origin)  (x, y) → (kx, ky)</div>
${FIG.plane({r:6,pts:[[2,4,"A(2, 4)","blue"],[2,-4,"A′ over x-axis","red"],[-2,4,"A′ over y-axis","grn"],[-4,2,"A′ rotated 90°","vio",-60]],cap:"One point, three transformations."})}
<div class="eg"><div class="lab">EXAMPLE</div>Translate (3, −1) by 4 left and 2 up: (3 − 4, −1 + 2) = <strong>(−1, 1)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>Dilate a triangle with vertices (1, 2), (3, 2), (1, 5) by k = 2: (2, 4), (6, 4), (2, 10). Sides double; the area becomes 4 times bigger.</div>
<div class="tip"><b>Shape and size:</b> slides, flips and turns keep the shape AND size (congruent). Dilations keep the shape but change size (similar).</div>
${QC("Reflect (5, −3) over the y-axis. Enter the new x-coordinate.","-5","(x, y) → (−x, y).")}
${QC("Rotate (2, 7) by 180° about the origin. Enter the new y-coordinate.","-7","(x, y) → (−x, −y).")}
`);
L("geo2","l7","Composite solids & real-world volume",12,`
<p>Real objects are often made of simple solids glued together, or with a hole cut out. Find each piece's volume, then add or subtract.</p>
<div class="eg"><div class="lab">ADD — a silo</div>A cylinder (r = 3, h = 10) topped by a half-sphere (r = 3). Cylinder: π·9·10 = 90π. Hemisphere: ½ · (4/3)π·27 = 18π. Total <strong>108π ≈ 339.3</strong>.</div>
<div class="eg"><div class="lab">SUBTRACT — a pipe</div>A pipe 20 cm long, outer radius 5, inner radius 4: π·25·20 − π·16·20 = 500π − 320π = <strong>180π cm³</strong> of material.</div>
<div class="eg"><div class="lab">FILLING</div>A tank 2 m × 1.5 m × 1 m fills at 50 litres per minute. Volume 3 m³ = 3,000 L (1 m³ = 1,000 L) → 3,000 ÷ 50 = <strong>60 minutes</strong>.</div>
<div class="fbox">1 m³ = 1,000 litres        1 litre = 1,000 cm³        1 mL = 1 cm³</div>
<div class="eg"><div class="lab">DISPLACEMENT</div>A rock sinks into a cylinder of water (r = 4 cm) and the water rises 2.5 cm. Rock volume = π·16·2.5 = <strong>40π cm³</strong>.</div>
<div class="tip">Always sketch the object and label every measurement before calculating — especially which length is a radius and which is a diameter.</div>
${QC("A box 4 × 5 × 6 with a cube-shaped hole of side 2 cut out. Remaining volume?","112","120 − 8.")}
`);
L("trig","l5","Trig identities & similar triangles",11,`
<p>Why do sin, cos and tan depend only on the angle? Because all right triangles with the same angle are <strong>similar</strong> — their sides are in the same proportions. A bigger triangle has bigger sides, but the same ratios.</p>
${FIG.tri({a:"3k",b:"4k",c:"5k",ang:"θ",cap:"Scale a 3-4-5 triangle by any k: sin θ = 3k/5k = 3/5 every time."})}
<h3>The Pythagorean identity</h3>
<div class="fbox">sin²θ + cos²θ = 1        tan θ = sin θ / cos θ</div>
<p>It comes straight from Pythagoras: divide a² + b² = c² by c².</p>
<div class="eg"><div class="lab">EXAMPLE</div>sin θ = 5/13 (θ acute). cos²θ = 1 − 25/169 = 144/169 → cos θ = <strong>12/13</strong>, tan θ = 5/12.</div>
<h3>Complementary angles (again, because the SAT loves it)</h3>
<div class="fbox">sin θ = cos(90° − θ)        cos θ = sin(90° − θ)</div>
<div class="eg"><div class="lab">EXAMPLE</div>If sin(2x + 10)° = cos(3x − 5)°, the angles add to 90: 5x + 5 = 90 → x = <strong>17</strong>.</div>
${QC("cos θ = 0.6 for an acute angle. Find sin θ.","0.8","sin² = 1 − 0.36 = 0.64.")}
${QC("sin(x + 20)° = cos(2x + 10)°. Find x.","20","3x + 30 = 90.")}
`);
L("wp","l4","Motion, work & mixture: the table method",13,`
<p>Three classic story types all share one structure: <b>amount = rate × quantity</b>. Put the story in a table and the equation writes itself.</p>
<h3>Motion: distance = rate × time</h3>
<table class="tbl" style="width:100%"><tr><td></td><td><b>rate</b></td><td><b>time</b></td><td><b>distance</b></td></tr><tr><td>Car A</td><td>60</td><td>t</td><td>60t</td></tr><tr><td>Car B</td><td>40</td><td>t</td><td>40t</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>The cars leave the same place in opposite directions. When are they 250 km apart? 60t + 40t = 250 → t = <strong>2.5 h</strong>.</div>
<h3>Work: work = rate × time</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Anna paints a fence in 6 h, Ben in 3 h. Rates 1/6 and 1/3 per hour. Together: (1/6 + 1/3)t = 1 → (1/2)t = 1 → <strong>t = 2 h</strong>.</div>
<h3>Mixture: amount of pure stuff = percent × volume</h3>
<table class="tbl" style="width:100%"><tr><td></td><td><b>%</b></td><td><b>litres</b></td><td><b>pure</b></td></tr><tr><td>Solution A</td><td>20%</td><td>x</td><td>0.2x</td></tr><tr><td>Solution B</td><td>50%</td><td>10</td><td>5</td></tr><tr><td>Mix</td><td>30%</td><td>x + 10</td><td>0.3(x + 10)</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>0.2x + 5 = 0.3(x + 10) → 0.2x + 5 = 0.3x + 3 → 2 = 0.1x → <strong>x = 20 L</strong>.</div>
<h3>Money mixtures work the same way</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Coffee at $8/kg mixed with coffee at $12/kg to get 20 kg at $9/kg: 8x + 12(20 − x) = 180 → −4x = −60 → <strong>x = 15 kg</strong> of the $8 coffee.</div>
${NOTE("the table is not optional for hard problems. Once each box is filled, the last row (or the sum of rows) IS the equation.")}
${QC("Two trains 300 km apart approach each other at 70 and 80 km/h. Hours until they meet?","2","150t = 300.")}
`);
more("exp",[N("Compute (1/3)⁻² .","9","Flip and square."),N("Simplify √98 = a√2. Enter a.","7","√49·2."),N("Rationalize 10/√5 = a√5. Enter a.","2","10√5/5.")],[N("Simplify (2√3)(4√12).","48","Multiply outsides 2·4 = 8 and insides √3·√12 = √36 = 6 → 48."),P("Which equals 8^(−2/3)?",["−4","1/4","4","−1/4"],1,"1/(∛8)² = 1/4.")],[C("a⁰ and a⁻ⁿ","a⁰ = 1; a⁻ⁿ = 1/aⁿ (still positive)."),C("Simplify a radical","Pull out the largest perfect square: √48 = 4√3."),C("Rationalize","Multiply by √a/√a, or by the conjugate.")]);
more("quad",[N("Solve 2x² = 72, positive solution.","6","x² = 36."),N("Solve (x − 1)² = 25, smaller solution.","-4","x − 1 = −5.")],[N("A rectangle: length = width + 4, area 60. Width?","6","w² + 4w − 60 = 0 → (w + 10)(w − 6).")],[C("Square-root method","Isolate the square, take ±√ of both sides.")]);
more("func",[P("Which parent function has a V shape?",["y = x²","y = |x|","y = √x","y = 2ˣ"],1,"Absolute value makes a V.")],[],[C("Parent functions","x (line), x² (U), |x| (V), √x (half-arch), 2ˣ (J), 1/x (two branches).")]);
more("advm",[N("y = (x − 2)²(x + 3): at which x does the graph bounce?","2","Even power at x = 2."),P("End behavior of y = −x³ + 2x:",["both up","both down","left up, right down","left down, right up"],2,"Odd degree, negative leading.")],[],[C("Multiplicity","Odd power: crosses. Even power: bounces."),C("End behavior","Even degree: same direction both ends. Odd: opposite.")]);
more("data",[N("A pie slice of 90° represents what percent?","25","90/360.")],[],[C("Reading a chart","Title → axes & units → scale → question.")]);
more("prob",[N("Compute 6!.","720","6·5·4·3·2·1."),N("Ways to award 1st and 2nd among 10 players?","90","10·9."),N("Ways to choose 3 books from 7?","35","7·6·5 ÷ 6.")],[N("Ways to choose a 2-person team from 12?","66","12·11 ÷ 2."),N("Box: 5 red, 5 blue. Two drawn without replacement. P(both red)? (fraction)","2/9","5/10 · 4/9.")],[C("Permutation vs combination","Order matters → permutation. Order doesn't → combination (÷ k!)."),C("Dependent events","Second probability changes: multiply P(A) × P(B given A).")]);
more("geo1",[N("Translate (−2, 5) right 6 and down 3. New y?","2","5 − 3."),N("Reflect (4, 9) over y = x. New x?","9","(x, y) → (y, x).")],[N("Dilate by 3: (2, −1) becomes (6, ?).","-3","Multiply both by 3.")],[C("Reflections","x-axis: (x, −y). y-axis: (−x, y). y = x: (y, x)."),C("Rotation 90° CCW","(x, y) → (−y, x).")]);
more("geo2",[N("Litres in 0.5 m³?","500","1 m³ = 1000 L."),N("Cylinder r = 2, h = 6 plus a hemisphere r = 2 on top: volume = kπ (fraction ok).","88/3","24π + 16π/3.")],[],[C("1 m³ =","1,000 litres. 1 L = 1,000 cm³.")]);
more("trig",[N("sin θ = 8/17 (acute). cos θ as a fraction?","15/17","8-15-17."),N("sin(3x)° = cos(2x + 15)°. Find x.","15","5x + 15 = 90.")],[],[C("sin²θ + cos²θ","= 1. tan θ = sin θ / cos θ.")]);
more("wp",[N("A 30% salt solution: how many litres of pure water to add to 6 L to make it 20%?","3","1.8 = 0.2(6 + x)."),N("Pipe A fills a pool in 4 h, pipe B in 12 h. Hours together?","3","1/4 + 1/12 = 1/3.")],[],[C("Table method","Rows: each object. Columns: rate × quantity = amount.")]);

/* ---------- order: beginner lessons first, workshops last ---------- */
UNITS.forEach(function(u){
  var l0=u.lessons.filter(function(l){return l.id==="l0"}),ws=u.lessons.filter(function(l){return l.id==="ws"}),rest=u.lessons.filter(function(l){return l.id!=="l0"&&l.id!=="ws"});
  u.lessons=l0.concat(rest,ws);
  u.cards.forEach(function(c,i){if(!c.k){c.k=u.id+"#"+i;c.uid=u.id}});u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id});
});
