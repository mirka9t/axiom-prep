/* =====================================================================
   AXIOM — DEEP LESSONS (3)
   ===================================================================== */
DEEP("sys","l2",12,`
<h3>Going deeper: what substitution really does</h3>
<p>If one equation tells you <b>y = 2x + 1</b>, then y and 2x + 1 are two names for the same number. So anywhere you see y in the other equation, you're allowed to write 2x + 1 instead. That swap removes one letter, and an equation with one letter is something you already know how to solve.</p>
<p>Think of it like a nickname: if “Sam” and “the tallest boy in class” are the same person, every sentence about Sam is a sentence about the tallest boy. Substitution is just replacing the nickname with the full description.</p>
<h3>The method in five steps</h3>
<ol><li><b>Isolate</b> one variable in one equation. Pick a variable with coefficient 1 or −1 if possible, so no fractions appear.</li><li><b>Substitute</b> that expression into the <em>other</em> equation — always inside brackets.</li><li><b>Solve</b> the new one-variable equation.</li><li><b>Back-substitute</b> the value to find the second variable.</li><li><b>Check</b> the pair in BOTH original equations.</li></ol>
<h3>Worked examples</h3>
<div class="eg"><div class="lab">1 · Already isolated</div>y = 3x − 5 and 2x + y = 15.<br>Substitute: 2x + (3x − 5) = 15 → 5x − 5 = 15 → 5x = 20 → x = 4.<br>Back: y = 3(4) − 5 = 7. Check: 2(4) + 7 = 15 ✓ → <strong>(4, 7)</strong>.</div>
<div class="eg"><div class="lab">2 · Isolate first</div>x + 4y = 7 and 3x − 2y = 7.<br>From the first, x = 7 − 4y (x had coefficient 1 — the easy choice).<br>Substitute: 3(7 − 4y) − 2y = 7 → 21 − 12y − 2y = 7 → −14y = −14 → y = 1.<br>Back: x = 7 − 4 = 3 → <strong>(3, 1)</strong>.</div>
<div class="eg"><div class="lab">3 · From a word problem</div>Two numbers add to 45; one is 9 less than twice the other.<br>x + y = 45 and y = 2x − 9 → x + (2x − 9) = 45 → 3x = 54 → x = 18, y = 27.</div>
<div class="eg"><div class="lab">4 · A line meets a parabola</div>y = x² and y = x + 6. Both equal y, so x² = x + 6 → x² − x − 6 = 0 → (x − 3)(x + 2) = 0.<br>x = 3 → y = 9; x = −2 → y = 4. Two intersection points: <strong>(3, 9) and (−2, 4)</strong>.</div>
<h3>Common slips</h3>
<ul><li><b>Forgetting brackets.</b> Substituting y = 2x − 5 into 3x − y = 10 gives 3x − (2x − 5) = 10, which is 3x − 2x <b>+ 5</b> = 10. Without brackets you'd get −5 and a wrong answer.</li><li><b>Stopping halfway.</b> The question may ask for y, or for x + y. Read the last line of the question again.</li><li><b>Substituting back into the same equation you used to isolate.</b> It's not wrong, but it can't catch mistakes. Check in the other equation.</li></ul>
${QC("y = 2x + 3 and 4x − y = 7. Find y.","13","4x − (2x + 3) = 7 → 2x = 10 → x = 5 → y = 13.")}
${QC("x = 2y − 1 and 3x + y = 18. Find x.","5","3(2y − 1) + y = 18 → 7y = 21 → y = 3 → x = 5.")}
`);
DEEP("lines","l3",11,`
<h3>Going deeper: why standard form exists</h3>
<p>Standard form <b>Ax + By = C</b> is the natural shape of a “budget” or “total” story. If pens cost $4, notebooks $5, and you spend exactly $100, then every possible purchase satisfies <b>4x + 5y = 100</b>. Each point on that line is one way to spend the money.</p>
<h3>Intercepts the fast way</h3>
<p>Cover up one variable (set it to 0) and solve for the other.</p>
<div class="fbox">x-intercept: set y = 0 → x = C ÷ A        y-intercept: set x = 0 → y = C ÷ B</div>
<div class="eg"><div class="lab">EXAMPLE</div>3x + 4y = 24 → x-intercept 24 ÷ 3 = 8 → (8, 0); y-intercept 24 ÷ 4 = 6 → (0, 6). Plot both and draw the line — the fastest graph there is.</div>
${FIG.plane({r:9,lines:[{m:-0.75,b:6}],pts:[[8,0,"(8, 0)"],[0,6,"(0, 6)"]],cap:"3x + 4y = 24 through its two intercepts."})}
<h3>The slope from standard form</h3>
<div class="fbox">slope of Ax + By = C  is  m = −A ÷ B</div>
<p>Why: solve for y → By = −Ax + C → y = (−A/B)x + C/B. For 3x + 4y = 24 the slope is −3/4.</p>
<h3>Reading it in context</h3>
<div class="eg"><div class="lab">EXAMPLE — the $100 budget</div>4x + 5y = 100 (x pens, y notebooks).<br>• x-intercept 25: spend everything on pens — 25 pens.<br>• y-intercept 20: everything on notebooks — 20 notebooks.<br>• Slope −4/5: each extra pen means giving up 4/5 of a notebook.<br>• The point (10, 12): 10 pens and 12 notebooks cost exactly $100 ✓.</div>
<h3>Converting between forms</h3>
<div class="eg"><div class="lab">y = mx + b → standard</div>y = (2/3)x − 4. Multiply every term by 3: 3y = 2x − 12. Move x: <strong>2x − 3y = 12</strong>.</div>
<div class="tip">On the SAT, parallel lines in standard form have the same A : B ratio. 2x + 3y = 5 and 4x + 6y = 1 are parallel (4 : 6 = 2 : 3).</div>
${QC("x-intercept of 5x − 2y = 20?","4","Set y = 0: 5x = 20.")}
${QC("Slope of 6x + 3y = 9?","-2","−6 ÷ 3.")}
`);
DEEP("geo2","l5",12,`
<h3>Going deeper: where the circle equation comes from</h3>
<p>A circle is every point at the same distance r from its centre (h, k). The distance from a point (x, y) to the centre is √((x − h)² + (y − k)²). Setting that equal to r and squaring gives the equation:</p>
<div class="fbox">(x − h)² + (y − k)² = r²        centre (h, k), radius r</div>
<h3>Reading the centre and radius</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(x + 3)² + (y − 1)² = 20. Rewrite x + 3 as x − (−3): centre <strong>(−3, 1)</strong>. The right side is r², so r = √20 = <strong>2√5</strong> ≈ 4.47.</div>
<div class="trap"><b>Two traps:</b> the signs inside flip (x + 3 means h = −3), and the right side is r², not r.</div>
<h3>Completing the square for circles</h3>
<p>Sometimes the equation is expanded: x² + y² − 6x + 4y − 12 = 0. Rebuild the squares:</p>
<ol><li>Group x-terms and y-terms; move the number across: (x² − 6x) + (y² + 4y) = 12.</li><li>For x: half of −6 is −3, squared 9. For y: half of 4 is 2, squared 4.</li><li>Add 9 and 4 to <b>both</b> sides: (x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4.</li><li>Factor: (x − 3)² + (y + 2)² = 25.</li></ol>
<p>Centre <strong>(3, −2)</strong>, radius <strong>5</strong>.</p>
<h3>Inside, on, or outside?</h3>
<p>Put the point into the left side and compare with r². For the circle above and the point (6, 2): (6 − 3)² + (2 + 2)² = 9 + 16 = 25 = r² → the point is <b>on</b> the circle. Less than 25 → inside; more → outside.</p>
<h3>Writing the equation from facts</h3>
<div class="eg"><div class="lab">Centre and a point</div>Centre (2, −1), through (5, 3): r² = (5 − 2)² + (3 + 1)² = 9 + 16 = 25 → <strong>(x − 2)² + (y + 1)² = 25</strong>.</div>
<div class="eg"><div class="lab">Ends of a diameter</div>(−1, 2) and (5, 10). Centre = midpoint (2, 6). Diameter length √(6² + 8²) = 10, so r = 5 → <strong>(x − 2)² + (y − 6)² = 25</strong>.</div>
${QC("x² + y² + 8x − 2y = 8. What is the radius?","5","(x + 4)² + (y − 1)² = 8 + 16 + 1 = 25.")}
${QC("A circle centred at the origin passes through (6, 8). Radius?","10","√(36 + 64).")}
`);
DEEP("geo1","l5",10,`
<h3>Going deeper: why the angle sum is (n − 2) × 180°</h3>
<p>Pick one corner of a polygon and draw lines to every other corner you can reach. You always create <b>n − 2 triangles</b>, and each triangle has 180°. That's the whole reason for the formula.</p>
<table class="tbl" style="width:100%"><tr><td><b>sides n</b></td><td>3</td><td>4</td><td>5</td><td>6</td><td>8</td><td>10</td></tr><tr><td><b>angle sum</b></td><td>180°</td><td>360°</td><td>540°</td><td>720°</td><td>1080°</td><td>1440°</td></tr></table>
<h3>Regular polygons (all sides and angles equal)</h3>
<div class="fbox">each interior angle = (n − 2) × 180 ÷ n        each exterior angle = 360 ÷ n        interior + exterior = 180</div>
<div class="eg"><div class="lab">EXAMPLES</div>Hexagon: interior 720 ÷ 6 = 120°, exterior 60°. Octagon: interior 135°, exterior 45°.</div>
<p>The exterior angles of <em>any</em> polygon add to 360° — imagine walking around it: you turn a full circle.</p>
<h3>Working backwards</h3>
<div class="eg"><div class="lab">From one angle</div>Each interior angle is 150°. Exterior = 30°, so n = 360 ÷ 30 = <strong>12 sides</strong>.</div>
<div class="eg"><div class="lab">From the sum</div>The angles add to 1440°. (n − 2) × 180 = 1440 → n − 2 = 8 → <strong>n = 10</strong>.</div>
<h3>A missing angle in an irregular polygon</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A pentagon's angles are 100°, 110°, 95°, 120° and x. Sum must be 540°: x = 540 − 425 = <strong>115°</strong>.</div>
<h3>Quadrilateral facts worth knowing</h3>
<ul><li><b>Parallelogram:</b> opposite angles equal; neighbouring angles add to 180°; diagonals bisect each other.</li><li><b>Rectangle:</b> all angles 90°; diagonals equal.</li><li><b>Rhombus:</b> all sides equal; diagonals perpendicular.</li><li><b>Square:</b> all of the above.</li></ul>
${QC("Each exterior angle of a regular polygon is 24°. How many sides?","15","360 ÷ 24.")}
${QC("A hexagon's angles are 120, 130, 110, 140, 125 and x. Find x.","95","720 − 625.")}
`);
DEEP("trig","l4",11,`
<h3>Going deeper: the unit circle</h3>
<p>The unit circle has radius 1 and centre (0, 0). Walk an angle θ counter-clockwise from the positive x-axis: the point you land on is exactly <b>(cos θ, sin θ)</b>. That's what sine and cosine really are — coordinates.</p>
<table class="tbl" style="width:100%"><tr><td><b>θ</b></td><td>0</td><td>π/6 (30°)</td><td>π/4 (45°)</td><td>π/3 (60°)</td><td>π/2 (90°)</td></tr><tr><td><b>cos θ</b></td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr><tr><td><b>sin θ</b></td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr></table>
<h3>Signs in each quadrant</h3>
<p>Quadrant I: both positive. II (x negative): sin positive, cos negative. III: both negative. IV: cos positive, sin negative.</p>
<h3>Reference angles</h3>
<p>Any angle has the same <em>size</em> of sine and cosine as its acute “reference angle” to the x-axis; only the sign changes by quadrant.</p>
<div class="eg"><div class="lab">EXAMPLES</div>cos(2π/3): reference π/3, quadrant II → <strong>−1/2</strong>.<br>sin(5π/6): reference π/6, quadrant II → <strong>1/2</strong>.<br>sin(7π/6): reference π/6, quadrant III → <strong>−1/2</strong>.</div>
<h3>Arcs and sectors with radians</h3>
<div class="fbox">arc length s = rθ        sector area A = ½ r² θ        (θ in radians)</div>
<div class="eg"><div class="lab">EXAMPLE</div>r = 10, θ = 0.6 → s = 6, A = ½ · 100 · 0.6 = <strong>30</strong>.</div>
<h3>Coterminal angles</h3>
<p>Adding or subtracting 2π lands on the same point: 13π/6 and π/6 have the same sine and cosine.</p>
${QC("sin(5π/6) as a decimal?","0.5","Reference π/6 in quadrant II.")}
${QC("Arc length for r = 8 and θ = 3π/4 is kπ. Enter k.","6","8 · 3/4.")}
`);
DEEP("sys","l1",10,`
<h3>Going deeper: a solution must work in BOTH equations</h3>
<p>A system is two (or more) conditions that must be true <em>at the same time</em>. A solution is a pair (x, y) that passes every condition. Testing is easy: substitute and see.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Is (2, 3) a solution of x + y = 5 and 2x − y = 1? First: 2 + 3 = 5 ✓. Second: 4 − 3 = 1 ✓. Yes. The point (1, 4) passes the first but fails the second (2 − 4 = −2), so it's not a solution.</div>
<h3>Seeing it on a graph and in a table</h3>
<p>Each equation is a line; the solution is where the lines cross. In a table, it's the x-value where both outputs are equal.</p>
<table class="tbl" style="width:100%"><tr><td>x</td><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><td>y = 5 − x</td><td>5</td><td>4</td><td>3</td><td>2</td></tr><tr><td>y = 2x − 1</td><td>−1</td><td>1</td><td>3</td><td>5</td></tr></table>
<p>At x = 2 both give 3 → solution (2, 3).</p>
<h3>Building a system from words</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Adult tickets cost $8, child tickets $5. 30 tickets were sold for $195.<br>Count equation: a + c = 30. Money equation: 8a + 5c = 195.<br>Solve: c = 30 − a → 8a + 5(30 − a) = 195 → 3a = 45 → <strong>15 adults, 15 children</strong>.</div>
<div class="tip">Most SAT system stories have one “count” equation and one “value” equation. Look for both.</div>
<h3>One, none or infinitely many — the logic</h3>
<ul><li>Lines crossing once → exactly <b>one</b> solution.</li><li>Parallel lines never meet → <b>no</b> solution (the conditions contradict each other).</li><li>The same line twice → <b>infinitely many</b> (the second condition adds nothing new).</li></ul>
${QC("Is (4, −1) a solution of x − y = 5 and 2x + 3y = 5? Type yes or no.","yes","4 + 1 = 5 ✓ and 8 − 3 = 5 ✓.")}
${QC("a + c = 40 and 10a + 6c = 300. Find a.","15","10a + 6(40 − a) = 300 → 4a = 60.")}
`);
DEEP("trig","l3",11,`
<h3>Going deeper: choose the ratio from what you have</h3>
<p>Label the sides from the given angle: <b>opposite</b>, <b>adjacent</b>, <b>hypotenuse</b>. Then pick the ratio that uses the side you know and the side you want.</p>
<table class="tbl" style="width:100%"><tr><td><b>You know / want</b></td><td><b>Use</b></td></tr><tr><td>opposite and hypotenuse</td><td>sin</td></tr><tr><td>adjacent and hypotenuse</td><td>cos</td></tr><tr><td>opposite and adjacent</td><td>tan</td></tr></table>
<h3>Worked examples (calculator in degree mode)</h3>
<div class="eg"><div class="lab">1 · Unknown on top</div>Angle 35°, hypotenuse 20, find the opposite side: sin 35° = x/20 → x = 20 sin 35° ≈ 20 × 0.5736 ≈ <strong>11.47</strong>.</div>
<div class="eg"><div class="lab">2 · Using tan</div>Angle 50°, adjacent 12, find the opposite: tan 50° = x/12 → x = 12 tan 50° ≈ 12 × 1.1918 ≈ <strong>14.30</strong>.</div>
<div class="eg"><div class="lab">3 · Unknown on the bottom</div>Angle 28°, opposite 9, find the hypotenuse: sin 28° = 9/h → h = 9 ÷ sin 28° ≈ 9 ÷ 0.4695 ≈ <strong>19.17</strong>. When x is in the denominator, you divide.</div>
<h3>Angles of elevation and depression</h3>
<p>Elevation: looking <b>up</b> from horizontal. Depression: looking <b>down</b> from horizontal. Both form right triangles with the ground.</p>
<div class="eg"><div class="lab">EXAMPLE</div>From 40 m away, the top of a 30 m tree: tan θ = 30/40 = 0.75 → θ ≈ 36.9°.</div>
<h3>Exact answers with special triangles</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A 30° angle with hypotenuse 10: the opposite side is half the hypotenuse = <strong>5</strong>, exactly (30-60-90 triangle). No calculator needed.</div>
<div class="trap"><b>Calculator trap:</b> if sin 30° gives −0.988, your calculator is in radian mode.</div>
${QC("A right triangle has a 30° angle and hypotenuse 18. Length of the side opposite 30°?","9","Half the hypotenuse.")}
${QC("A 45° right triangle has legs of 7. The hypotenuse is k√2. Enter k.","7","45-45-90: leg × √2.")}
`);
DEEP("pct","l5",10,`
<h3>Going deeper: why you can't just subtract the percent back</h3>
<p>A price rose 20% to $96. Many students take 20% of 96 and subtract: 96 − 19.20 = 76.80. Wrong! The 20% was taken of the <em>original</em> price, not of 96. The original is $80: 80 × 1.2 = 96 ✓.</p>
<h3>The multiplier method (always works)</h3>
<div class="fbox">original × multiplier = new        →        original = new ÷ multiplier</div>
<div class="eg"><div class="lab">1 · After a discount</div>A jacket costs $68 after 15% off. Multiplier 0.85 → original = 68 ÷ 0.85 = <strong>$80</strong>.</div>
<div class="eg"><div class="lab">2 · After tax</div>With 12% tax the bill is $112. Original = 112 ÷ 1.12 = <strong>$100</strong>.</div>
<div class="eg"><div class="lab">3 · After two changes</div>Up 10% then down 20%, the final price is $352. Combined multiplier 1.1 × 0.8 = 0.88 → original = 352 ÷ 0.88 = <strong>$400</strong>.</div>
<div class="eg"><div class="lab">4 · A part given</div>After a 25% increase, a class has 75 students. 1.25 × original = 75 → <strong>60</strong> students.</div>
<h3>Finding the percent itself</h3>
<p>Before and after both known → percent change = (new − old) ÷ old. From 80 to 96: 16 ÷ 80 = 20%.</p>
<div class="tip">Always ask: “Is this number the BEFORE or the AFTER?” If it's the after, divide by the multiplier.</div>
${QC("After 30% off, a phone costs $56. Original price?","80","56 ÷ 0.7.")}
${QC("After an 8% raise, a salary is $54,000. Salary before?","50000","54,000 ÷ 1.08.")}
`);
DEEP("ineq","l2",11,`
<h3>Going deeper: |x − a| is a distance</h3>
<p>Read |x − a| as “the distance between x and a on the number line”. Then every absolute value problem becomes a picture.</p>
${FIG.numline(-4,12,{marks:[{v:4,label:"4",c:"vio"},{v:-2,label:"−2",c:"blue"},{v:10,label:"10",c:"blue"}],jumps:[{from:4,to:10,label:"6",c:"grn"},{from:4,to:-2,label:"6",c:"grn"}],cap:"|x − 4| = 6: the points 6 away from 4."})}
<h3>Equations: two cases</h3>
<div class="eg"><div class="lab">1</div>|x − 4| = 6 → x − 4 = 6 or x − 4 = −6 → <strong>x = 10 or −2</strong>.</div>
<div class="eg"><div class="lab">2 · Isolate first</div>2|x + 1| − 3 = 7 → 2|x + 1| = 10 → |x + 1| = 5 → x = 4 or −6.</div>
<h3>Inequalities: between or outside</h3>
<div class="fbox">|x − a| &lt; d  →  a − d &lt; x &lt; a + d    (between)
|x − a| &gt; d  →  x &lt; a − d  or  x &gt; a + d    (outside)</div>
${'<div class="figrow">'+FIG.numline(-4,12,{segs:[{a:-2,b:10,ca:false,cb:false,c:"grn"}],cap:"|x − 4| < 6: between"})+FIG.numline(-4,12,{rays:[{v:-2,dir:"left",closed:true,c:"red"},{v:10,dir:"right",closed:true,c:"red"}],cap:"|x − 4| ≥ 6: outside"})+'</div>'}
<h3>Writing an absolute value from words or an interval</h3>
<div class="eg"><div class="lab">From words</div>“x is within 3 of 10” → <strong>|x − 10| ≤ 3</strong>.</div>
<div class="eg"><div class="lab">From an interval</div>5 ≤ x ≤ 17: the centre is (5 + 17)/2 = 11 and the half-width is 6 → <strong>|x − 11| ≤ 6</strong>.</div>
<div class="trap"><b>No-solution trap:</b> |x − 2| = −3 is impossible, and |x − 2| &lt; −1 has no solutions — a distance is never negative.</div>
${QC("|2x − 3| = 9. Larger solution?","6","2x − 3 = 9 → x = 6.")}
${QC("2 ≤ x ≤ 14 written as |x − c| ≤ r. Find c.","8","The midpoint.")}
`);
DEEP("lines","l6",10,`
<h3>Going deeper: distance is just Pythagoras</h3>
<p>Draw the two points and complete a right triangle: the horizontal leg is the change in x, the vertical leg is the change in y, and the distance is the hypotenuse.</p>
${FIG.plane({r:10,pts:[[1,2,"(1, 2)"],[7,10,"(7, 10)"]],lines:[],cap:"Legs 6 and 8 → distance 10."})}
<div class="fbox">d = √((x₂ − x₁)² + (y₂ − y₁)²)        midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)</div>
<div class="eg"><div class="lab">EXAMPLE</div>(1, 2) to (7, 10): Δx = 6, Δy = 8, d = √(36 + 64) = <strong>10</strong>.</div>
<h3>The midpoint is an average</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(−3, 5) and (7, −1): ((−3 + 7)/2, (5 − 1)/2) = <strong>(2, 2)</strong>.</div>
<h3>Working backwards from a midpoint</h3>
<p>The midpoint is halfway, so the other end is as far past the midpoint as the first end is before it.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Midpoint (4, 1), one end (1, −3). Other end: x = 2·4 − 1 = 7, y = 2·1 − (−3) = 5 → <strong>(7, 5)</strong>.</div>
<h3>Using them in geometry</h3>
<ul><li>Is a triangle isosceles? Compute the three side lengths and look for two equal ones.</li><li>A circle's diameter goes from A to B: centre = midpoint, radius = half the distance.</li><li>Is a point equidistant from two others? Compare the two distances.</li></ul>
${QC("Distance from (−2, 1) to (4, 9)?","10","6 and 8.")}
${QC("Midpoint (3, −2), one end (−1, 4). x-coordinate of the other end?","7","2·3 − (−1).")}
`);
