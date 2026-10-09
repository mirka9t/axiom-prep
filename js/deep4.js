/* =====================================================================
   AXIOM — DEEP LESSONS (4) + solved problem sets
   ===================================================================== */
DEEP("alg","l1",10,`
<h3>Going deeper: the vocabulary of expressions</h3>
<p>In <b>5x² − 3x + 7</b>: the <b>terms</b> are 5x², −3x and 7 (separated by + and −). The <b>coefficients</b> are 5 and −3 (the numbers stuck to letters). 7 is the <b>constant</b>. Notice the minus sign belongs to its term: the second term is −3x, not 3x.</p>
<h3>Expressions vs equations</h3>
<p>An <b>expression</b> has no equals sign — you can simplify or evaluate it, but not “solve” it. An <b>equation</b> has an equals sign and makes a claim you can solve.</p>
<h3>Evaluating: substitute with brackets</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Evaluate 2x² − 3xy + y when x = −2, y = 3: 2(−2)² − 3(−2)(3) + 3 = 2·4 + 18 + 3 = <strong>29</strong>. Brackets around every negative value prevent sign errors.</div>
<h3>Combining like terms</h3>
<p>Like terms have exactly the same letters with the same powers: 3x² and −7x² are like; 3x² and 3x are not.</p>
<div class="eg"><div class="lab">EXAMPLE</div>4a + 3b − 2a + 5 − 7b = (4a − 2a) + (3b − 7b) + 5 = <strong>2a − 4b + 5</strong>.</div>
<h3>Distributing, including negatives</h3>
<div class="eg"><div class="lab">EXAMPLE</div>3(2x − 4) − 2(x − 5) = 6x − 12 − 2x + 10 = <strong>4x − 2</strong>. The −2 multiplies −5 to make +10.</div>
<h3>Translating words to expressions</h3>
<table class="tbl" style="width:100%"><tr><td>5 more than twice n</td><td>2n + 5</td></tr><tr><td>3 less than a number</td><td>n − 3 (not 3 − n!)</td></tr><tr><td>the product of 4 and the sum of x and 1</td><td>4(x + 1)</td></tr><tr><td>half of a number, squared</td><td>(n/2)²</td></tr></table>
<h3>Equivalent expressions (an SAT favourite)</h3>
<p>Two expressions are equivalent if they're equal for every value of x. To check a choice quickly, plug in a number like x = 2 into both.</p>
${QC("Simplify 5(x + 2) − 3(x − 4). The result is ax + b; enter b.","22","5x + 10 − 3x + 12 = 2x + 22.")}
${QC("Evaluate a² − 2ab when a = −3 and b = 2.","21","9 − 2(−3)(2) = 9 + 12.")}
`);
DEEP("func","l2",10,`
<h3>Going deeper: domain and range in plain words</h3>
<p>The <b>domain</b> is every input x you're allowed to use. The <b>range</b> is every output y the function actually produces. On a graph: domain = how far the graph stretches left–right; range = how far it stretches up–down.</p>
<h3>Finding the domain from an equation</h3>
<ul><li><b>Division:</b> the denominator can't be 0. f(x) = 5/(x − 3) → all x except 3.</li><li><b>Even roots:</b> the inside can't be negative. g(x) = √(x + 4) → x ≥ −4.</li><li><b>Context:</b> times, lengths and counts can't be negative; counts must be whole numbers.</li></ul>
<h3>Finding the range</h3>
<div class="eg"><div class="lab">EXAMPLES</div>y = x² has range y ≥ 0 (a square is never negative).<br>y = (x − 2)² + 5 has range y ≥ 5 (minimum at the vertex).<br>y = −|x| + 3 has range y ≤ 3 (maximum 3).</div>
<h3>Reading a graph like an expert</h3>
<ul><li><b>Increasing</b> where it goes uphill left to right; <b>decreasing</b> downhill.</li><li><b>Maximum / minimum:</b> the highest / lowest y-value — answer with the y-value, and say where it happens with the x-value.</li><li><b>f(x) &gt; 0</b> means “above the x-axis”; <b>f(x) = 2</b> means “where the graph is at height 2” — draw a horizontal line at 2 and read the x-values.</li></ul>
<div class="eg"><div class="lab">CONTEXT</div>A taxi ride costs C(m) = 3 + 2m for m miles, up to 30 miles. Domain: 0 ≤ m ≤ 30. Range: 3 ≤ C ≤ 63.</div>
${QC("Smallest value in the domain of f(x) = √(2x − 6)?","3","2x − 6 ≥ 0.")}
${QC("Minimum value (range starts at) of y = (x + 1)² − 7?","-7","Vertex (−1, −7).")}
`);
DEEP("ineq","l1",10,`
<h3>Going deeper: why the sign flips</h3>
<p>Take a true statement: 2 &lt; 5. Multiply both sides by −1: −2 and −5. But −2 is to the right of −5, so now −2 &gt; −5. Multiplying by a negative <b>mirrors</b> the number line, so the order reverses. That's the whole reason for the flip rule.</p>
<div class="fbox">Flip the inequality sign when you multiply or divide BOTH sides by a negative number.
Adding or subtracting anything never flips it.</div>
<h3>Worked examples</h3>
<div class="eg"><div class="lab">1</div>−4x + 7 ≥ 19 → −4x ≥ 12 → divide by −4 and flip → <strong>x ≤ −3</strong>.</div>
<div class="eg"><div class="lab">2 · Avoid the flip</div>5 − 2x &lt; 11. Move the x-term to the right instead: 5 − 11 &lt; 2x → −6 &lt; 2x → <strong>x &gt; −3</strong>. Same answer, no flip needed.</div>
<div class="eg"><div class="lab">3 · Fractions</div>(x − 3)/−2 &gt; 4 → multiply by −2 and flip: x − 3 &lt; −8 → <strong>x &lt; −5</strong>.</div>
<div class="eg"><div class="lab">4 · Compound</div>−3 ≤ 2x + 1 &lt; 9 → subtract 1 from all three parts: −4 ≤ 2x &lt; 8 → divide all by 2: <strong>−2 ≤ x &lt; 4</strong>.</div>
<h3>Always test one number</h3>
<p>After solving x ≤ −3, test x = −4 in the original: −4(−4) + 7 = 23 ≥ 19 ✓. Test x = 0: 7 ≥ 19 ✗. The answer behaves correctly.</p>
<h3>Word problems</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A van can carry at most 1,200 kg. The driver weighs 80 kg and each crate 45 kg: 80 + 45c ≤ 1200 → c ≤ 24.9 → at most <strong>24 crates</strong> (round down — you can't exceed the limit).</div>
${QC("Solve −3x − 5 ≥ 10. The answer is x ≤ k; enter k.","-5","−3x ≥ 15 → x ≤ −5.")}
${QC("Largest whole number x with 7 − 2x > −4?","5","−2x > −11 → x < 5.5.")}
`);
DEEP("geo2","l3",11,`
<h3>Going deeper: volume = base area × height</h3>
<p>Every prism and cylinder follows one idea: stack copies of the base until you reach the height. Volume = (area of the base) × (height). Pointed solids — cones and pyramids — are exactly <b>one third</b> of the matching prism or cylinder.</p>
<table class="tbl" style="width:100%"><tr><td><b>Solid</b></td><td><b>Volume</b></td><td><b>Surface area</b></td></tr>
<tr><td>Rectangular box</td><td>lwh</td><td>2(lw + lh + wh)</td></tr><tr><td>Cube</td><td>s³</td><td>6s²</td></tr><tr><td>Cylinder</td><td>πr²h</td><td>2πr² + 2πrh</td></tr><tr><td>Cone</td><td>⅓πr²h</td><td>πr² + πrl (l = slant height)</td></tr><tr><td>Pyramid</td><td>⅓ × base × h</td><td>base + triangles</td></tr><tr><td>Sphere</td><td>(4/3)πr³</td><td>4πr²</td></tr></table>
<h3>Surface area: unfold it</h3>
<p>Surface area is the amount of wrapping paper. Unfold the solid into flat pieces (a “net”) and add their areas. A cylinder unfolds into two circles and a rectangle whose width is the circumference 2πr.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Cylinder r = 3, h = 10: two circles 2·9π = 18π, side 2π·3·10 = 60π, total <strong>78π</strong>.</div>
<h3>Working backwards</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A cube has volume 216. Side = ∛216 = 6, surface area = 6·36 = <strong>216</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A cylinder holds 200π cm³ with radius 5: 25π·h = 200π → <strong>h = 8</strong>.</div>
<h3>Scaling solids</h3>
<p>Multiply every length by k: surface area × k², volume × k³. Doubling a ball's radius makes it hold 8 times as much.</p>
${QC("A box is 4 × 5 × 6. Surface area?","148","2(20 + 24 + 30).")}
${QC("A cone has r = 3 and h = 8. Volume = kπ. Enter k.","24","⅓ · 9 · 8.")}
`);
DEEP("frac","l2",9,`
<h3>Going deeper: three faces of the same number</h3>
<p>1/4, 0.25 and 25% are the same amount written three ways. Percent literally means “per hundred”: 25% = 25/100.</p>
<div class="fbox">fraction → decimal: divide top by bottom        decimal → percent: × 100
percent → decimal: ÷ 100        decimal → fraction: write over 10, 100, 1000… and simplify</div>
<table class="tbl" style="width:100%"><tr><td>1/2 = 0.5 = 50%</td><td>1/4 = 0.25 = 25%</td><td>3/4 = 0.75 = 75%</td></tr><tr><td>1/5 = 0.2 = 20%</td><td>1/8 = 0.125 = 12.5%</td><td>1/3 ≈ 0.333 = 33.3%</td></tr><tr><td>2/3 ≈ 0.667 = 66.7%</td><td>1/10 = 0.1 = 10%</td><td>3/2 = 1.5 = 150%</td></tr></table>
<h3>Percents above 100 and below 1</h3>
<p>150% = 1.5 (one and a half times). 0.5% = 0.005 (half of one percent). These trip people up — move the decimal point exactly two places.</p>
<h3>Repeating decimals</h3>
<p>0.333… = 1/3, 0.666… = 2/3, 0.090909… = 1/11. On the SAT grid-in, type the fraction or as many digits as fit.</p>
<h3>Percent of a number — mental shortcuts</h3>
<div class="eg"><div class="lab">EXAMPLES</div>10% of 340 = 34 (move the point). 5% = half of that = 17. 15% = 34 + 17 = 51. 1% of 340 = 3.4, so 3% = 10.2.</div>
${QC("Write 0.375 as a fraction in lowest terms.","3/8","375/1000 = 3/8.")}
${QC("What is 0.4% as a decimal?","0.004","÷ 100.")}
`);
DEEP("exp","l5",10,`
<h3>Going deeper: make the bases match</h3>
<p>When x is in an exponent, the key move is to rewrite every number as a power of the <b>same base</b>. Then the exponents must be equal.</p>
<div class="fbox">if aᵐ = aⁿ (a &gt; 0, a ≠ 1) then m = n</div>
<div class="eg"><div class="lab">1</div>4ˣ = 32 → (2²)ˣ = 2⁵ → 2x = 5 → <strong>x = 2.5</strong>.</div>
<div class="eg"><div class="lab">2</div>9^(x + 1) = 27ˣ → 3^(2x + 2) = 3^(3x) → 2x + 2 = 3x → <strong>x = 2</strong>.</div>
<div class="eg"><div class="lab">3 · A fraction</div>(1/8)ˣ = 16 → 2^(−3x) = 2⁴ → <strong>x = −4/3</strong>.</div>
<h3>Equivalent exponential forms (very common on the SAT)</h3>
<p>The same growth can be written many ways. Use the laws of exponents to translate.</p>
<div class="eg"><div class="lab">EXAMPLES</div>• 1.21^(t/2) = (1.1²)^(t/2) = <strong>1.1ᵗ</strong> → 10% growth per year.<br>• 2^(t/3) means doubling every 3 units of t.<br>• 1000(0.5)^(t/5730) is a half-life of 5,730 years.<br>• 3·2^(x + 1) = 3·2·2ˣ = <strong>6·2ˣ</strong>.</div>
<h3>Which form reveals what?</h3>
<p>If a question asks for the growth per month but the model uses years, rewrite: 1.12ᵗ per year = (1.12^(1/12))^(12t) ≈ 1.0095 per month.</p>
${QC("Solve 8ˣ = 4^(x + 1).","2","2^(3x) = 2^(2x + 2) → x = 2.")}
${QC("5·3^(x + 2) = k·3ˣ. Find k.","45","5 · 9.")}
`);
DEEP("quad","l6",9,`
<h3>Going deeper: why sum and product work</h3>
<p>If a quadratic has solutions r and s, it factors as a(x − r)(x − s). Expand: a(x² − (r + s)x + rs). Compare with ax² + bx + c and you get:</p>
<div class="fbox">sum of solutions  r + s = −b ÷ a        product  r · s = c ÷ a</div>
<div class="eg"><div class="lab">EXAMPLE</div>2x² − 10x + 7 = 0: sum = 10/2 = <strong>5</strong>, product = <strong>7/2</strong> — without solving anything.</div>
<h3>When this saves time</h3>
<ul><li>The question asks for the sum or product, not the solutions themselves.</li><li>The solutions are ugly (with square roots) but their sum is a whole number.</li><li>You're building a quadratic from given solutions.</li></ul>
<div class="eg"><div class="lab">BUILDING</div>A quadratic with solutions 3 and −5 and leading coefficient 1: sum −2, product −15 → <strong>x² + 2x − 15 = 0</strong>.</div>
<div class="eg"><div class="lab">FINDING A CONSTANT</div>x² + kx + 12 = 0 has a solution x = 2. The product is 12, so the other solution is 6; the sum is 8 = −k → <strong>k = −8</strong>.</div>
${QC("Sum of the solutions of 3x² − 12x − 5 = 0?","4","12 ÷ 3.")}
${QC("x² − 9x + c = 0 has solution 4. Find c.","20","Other solution 5; product 20.")}
`);
DEEP("geo1","l6",9,`
<h3>Going deeper: what congruent means</h3>
<p>Congruent figures are identical copies: same side lengths and same angles. You could slide, flip or turn one to land exactly on the other.</p>
<h3>The shortcuts that prove triangles congruent</h3>
<table class="tbl" style="width:100%"><tr><td><b>SSS</b></td><td>three sides equal</td></tr><tr><td><b>SAS</b></td><td>two sides and the angle between them</td></tr><tr><td><b>ASA</b></td><td>two angles and the side between them</td></tr><tr><td><b>AAS</b></td><td>two angles and a side not between them</td></tr><tr><td><b>HL</b></td><td>right triangles: hypotenuse and one leg</td></tr></table>
<div class="trap"><b>Not shortcuts:</b> AAA proves only similarity (same shape, maybe different size), and SSA can give two different triangles.</div>
<h3>Using congruence</h3>
<p>Once two triangles are congruent, every matching part is equal. Order of letters matters: if △ABC ≅ △DEF, then A matches D, AB = DE, angle C = angle F.</p>
<h3>The triangle inequality, explained</h3>
<p>Try to build a triangle from sticks of 2, 3 and 7: the 2 and 3 together can't reach across 7. Any side must be shorter than the other two combined.</p>
<div class="fbox">for sides a and b, the third side c satisfies |a − b| &lt; c &lt; a + b</div>
<div class="eg"><div class="lab">EXAMPLE</div>Sides 5 and 12: 7 &lt; c &lt; 17. Possible whole-number lengths: 8 through 16 — that's 9 options.</div>
${QC("Sides 4 and 9: how many whole-number lengths can the third side have?","7","6, 7, …, 12.")}
`);
DEEP("trig","l1",10,`
<h3>Going deeper: naming the sides correctly</h3>
<p>The names change depending on which acute angle you stand at. The <b>hypotenuse</b> is always opposite the right angle (the longest side). The <b>opposite</b> side is across from your angle. The <b>adjacent</b> side touches your angle but isn't the hypotenuse.</p>
${FIG.tri({a:"opposite",b:"adjacent",c:"hypotenuse",ang:"θ",cap:"From angle θ: opposite, adjacent, hypotenuse."})}
<div class="fbox">sin θ = opposite ÷ hypotenuse        cos θ = adjacent ÷ hypotenuse        tan θ = opposite ÷ adjacent</div>
<h3>One triangle, both acute angles</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A 5-12-13 triangle with angle A opposite the 5 and angle B opposite the 12.<br>sin A = 5/13, cos A = 12/13, tan A = 5/12.<br>sin B = 12/13, cos B = 5/13, tan B = 12/5.<br>Notice: sin A = cos B — because A + B = 90°.</div>
<h3>From one ratio to all the others</h3>
<div class="eg"><div class="lab">EXAMPLE</div>cos θ = 8/17. Draw a triangle: adjacent 8, hypotenuse 17, opposite √(289 − 64) = 15. So sin θ = 15/17, tan θ = 15/8.</div>
<h3>Ratios don't depend on size</h3>
<p>A 3-4-5 triangle and a 30-40-50 triangle have the same angles, so the same sin, cos and tan. The ratios belong to the <em>angle</em>, not the triangle.</p>
${QC("tan θ = 7/24. What is sin θ? (fraction)","7/25","Hypotenuse 25.")}
${QC("In a right triangle, sin A = 0.6. What is cos B (B is the other acute angle)?","0.6","sin A = cos B.")}
`);
DEEP("geo2","l1",9,`
<h3>Going deeper: π and why the formulas work</h3>
<p>For every circle, circumference ÷ diameter is the same number, π ≈ 3.14159. That's where C = πd = 2πr comes from. For the area, cut a circle into thin slices and line them up alternating — they form a near-rectangle of width πr (half the circumference) and height r: area πr².</p>
<h3>Working backwards between r, d, C and A</h3>
<div class="eg"><div class="lab">EXAMPLES</div>Area 64π → r² = 64 → r = 8 → C = 16π.<br>Circumference 10π → d = 10 → r = 5 → A = 25π.<br>Area 50 (no π) → r² = 50/π ≈ 15.9 → r ≈ 3.99.</div>
<h3>Fractions of a circle</h3>
<div class="fbox">arc length = (angle ÷ 360) × 2πr        sector area = (angle ÷ 360) × πr²</div>
<div class="eg"><div class="lab">EXAMPLE</div>A 72° sector of a circle with r = 10: fraction 72/360 = 1/5. Arc = 20π/5 = 4π; area = 100π/5 = 20π.</div>
<h3>Circles in real problems</h3>
<div class="eg"><div class="lab">WHEELS</div>A wheel with diameter 70 cm makes one turn = 70π ≈ 219.9 cm. To travel 1 km = 100,000 cm, it turns about 100,000 ÷ 219.9 ≈ 455 times.</div>
${QC("A circle has circumference 18π. Its area is kπ. Enter k.","81","r = 9.")}
${QC("A 90° sector of a circle with r = 6 has area kπ. Enter k.","9","¼ × 36.")}
`);

/* ---------------- solved problem sets ---------------- */
function PROB(n,q,steps,ans){return '<div class="ws-ex"><div class="ws-h"><span>Problem '+n+'</span></div><p><b>'+q+'</b></p><ol class="ps-steps">'+steps.map(function(s){return '<li>'+s+'</li>'}).join("")+'</ol><div class="ps-ans">Answer: <b>'+ans+'</b></div></div>'}
L("pct","l8","Percent mastery: 10 classic SAT problems, fully solved",22,`
<p>This lesson is a guided workout. Each problem is a pattern the SAT uses again and again. Read the question, try it yourself for a minute, then study every step of the solution. By the end, percent questions will feel routine.</p>
<h3>Problems 1–3: the basics, done properly</h3>
${PROB(1,"What is 35% of 240?",["Turn the percent into a decimal: 35% = 0.35.","“Of” means multiply: 0.35 × 240.","0.35 × 240 = 84."],"84")}
${PROB(2,"18 is what percent of 72?",["The whole comes after “of”: 72.","Part ÷ whole = 18 ÷ 72 = 0.25.","Convert to a percent: 0.25 × 100 = 25%."],"25%")}
${PROB(3,"42 is 60% of what number?",["Write it as an equation: 0.6 × n = 42.","Divide: n = 42 ÷ 0.6 = 70.","Check: 60% of 70 = 42 ✓."],"70")}
<h3>Problems 4–6: change and reverse change</h3>
${PROB(4,"A price drops from $250 to $205. What is the percent decrease?",["Change = 250 − 205 = 45.","Divide by the ORIGINAL: 45 ÷ 250 = 0.18.","= 18% decrease."],"18%")}
${PROB(5,"After a 25% discount a coat costs $90. What was the original price?",["After 25% off you pay 75%: multiplier 0.75.","original × 0.75 = 90 → original = 90 ÷ 0.75.","= $120. (Not 90 + 25% of 90 = 112.50!)"],"$120")}
${PROB(6,"A population of 8,000 grows 10% one year and 10% the next. What is it after two years?",["Each year multiplies by 1.1.","8000 × 1.1 × 1.1 = 8000 × 1.21.","= 9,680 — that's a 21% total increase, not 20%."],"9,680")}
<h3>Problems 7–8: successive changes</h3>
${PROB(7,"A stock rises 40% and then falls 40%. What is the overall percent change?",["Multipliers: 1.4 and 0.6.","1.4 × 0.6 = 0.84.","0.84 means 84% of the original: a 16% decrease."],"−16%")}
${PROB(8,"A shirt is marked up 50% and then put on sale for 20% off the marked price. Compared with the original cost, what is the final price?",["1.5 × 0.8 = 1.2.","The final price is 120% of the cost.","That's a 20% increase overall."],"20% more than the original")}
<h3>Problems 9–10: percent in context</h3>
${PROB(9,"In a class, 40% of students are boys. 25% of the boys and 50% of the girls play an instrument. What percent of the class plays an instrument?",["Imagine 100 students: 40 boys, 60 girls.","Boys who play: 25% of 40 = 10. Girls who play: 50% of 60 = 30.","Total 40 of 100 = 40%."],"40%")}
${PROB(10,"A town's unemployment rate went from 5% to 6%. By how many percentage points and by what percent did it rise?",["Percentage points: 6 − 5 = 1 point.","Percent change: 1 ÷ 5 = 0.2.","= 20% increase in the rate."],"1 point; 20%")}
<h3>The patterns behind all ten</h3>
<table class="tbl" style="width:100%"><tr><td>Find the part</td><td>part = percent × whole</td></tr><tr><td>Find the percent</td><td>part ÷ whole</td></tr><tr><td>Find the whole</td><td>part ÷ percent</td></tr><tr><td>Percent change</td><td>change ÷ original</td></tr><tr><td>Reverse change</td><td>new ÷ multiplier</td></tr><tr><td>Successive changes</td><td>multiply the multipliers</td></tr><tr><td>Mixed groups</td><td>imagine 100 people</td></tr></table>
${NOTE("“imagine 100” is the single most useful percent trick. It turns every abstract percent into a concrete count of people or dollars.")}
${QC("A TV costs $480 after a 20% discount. Original price?","600","480 ÷ 0.8.")}
${QC("Up 30%, then down 30%: overall percent change? (number only, negative for a decrease)","-9","1.3 × 0.7 = 0.91.")}
`);
L("geo1","l8","Geometry problem-solving: 8 multi-step problems, fully solved",22,`
<p>Hard SAT geometry questions chain two or three simple facts together. The skill is spotting <em>which</em> facts connect. Work through these eight problems slowly — each solution explains not just what to do but <b>why that step comes next</b>.</p>
<h3>Problems 1–3: triangles</h3>
${PROB(1,"In triangle ABC, angle A = 2x, angle B = 3x and angle C = 4x. What is the largest angle?",["The three angles add to 180: 2x + 3x + 4x = 180.","9x = 180 → x = 20.","Largest: 4x = 80°."],"80°")}
${PROB(2,"A 10-foot ladder leans against a wall with its foot 6 feet from the wall. How high up the wall does it reach?",["The wall, ground and ladder form a right triangle; the ladder is the hypotenuse.","h² + 6² = 10² → h² = 64.","h = 8 (a 6-8-10 triangle)."],"8 feet")}
${PROB(3,"Two similar triangles have corresponding sides 4 and 10. The small triangle's area is 12. What is the large triangle's area?",["The scale factor is 10 ÷ 4 = 2.5.","Areas scale by the square: 2.5² = 6.25.","12 × 6.25 = 75."],"75")}
<h3>Problems 4–5: circles</h3>
${PROB(4,"A square is inscribed in a circle of radius 5. What is the area of the square?",["The square's diagonal is the circle's diameter: 10.","For a square, diagonal = side × √2 → side = 10/√2 = 5√2.","Area = (5√2)² = 50."],"50")}
${PROB(5,"A circle has area 36π. A sector of it has area 6π. What is the sector's central angle?",["The sector is 6π ÷ 36π = 1/6 of the circle.","1/6 of 360° = 60°."],"60°")}
<h3>Problems 6–8: combined and coordinate</h3>
${PROB(6,"A rectangle has perimeter 34 and diagonal 13. What is its area?",["Let the sides be l and w: 2(l + w) = 34 → l + w = 17.","Diagonal: l² + w² = 169.","Try the triple 5-12-13: 5 + 12 = 17 ✓. Area = 60."],"60")}
${PROB(7,"Points A(1, 1), B(7, 1) and C(4, 5) form a triangle. What is its area?",["Base AB lies on y = 1: length 7 − 1 = 6.","Height = vertical distance from C to that line: 5 − 1 = 4.","Area = ½ × 6 × 4 = 12."],"12")}
${PROB(8,"A cylinder and a cone have the same radius and the same volume. The cylinder's height is 5. What is the cone's height?",["Cylinder: πr²·5. Cone: ⅓πr²h.","Set equal: 5πr² = ⅓πr²h → 5 = h/3.","h = 15."],"15")}
<h3>The habits behind every solution</h3>
<ul><li><b>Draw and label</b> everything — even when a figure is given, mark the numbers you find.</li><li><b>Look for hidden right triangles</b>: diagonals, heights, radii to tangent points.</li><li><b>Name the scale factor</b> whenever shapes are similar: lengths × k, areas × k², volumes × k³.</li><li><b>Use the triples</b> 3-4-5, 5-12-13, 8-15-17 and their multiples to skip square roots.</li></ul>
${QC("In a triangle the angles are x, x + 20 and 2x. Find x.","40","4x + 20 = 180.")}
${QC("A square has diagonal 8. Its area?","32","side² = 64 ÷ 2.")}
`);
(function(){["pct","geo1"].forEach(function(id){var u=findUnit(id);u.lessons.sort(function(a,b){return (a.id==="ws")-(b.id==="ws")})})})();
LPC={};
