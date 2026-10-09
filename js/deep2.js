/* =====================================================================
   AXIOM — DEEP LESSONS (2)
   ===================================================================== */
DEEP("data","l1",10,`
<h3>Going deeper: the mean is a balance point</h3>
<p>Imagine the values as weights on a ruler. The mean is the point where the ruler balances. That's why one very large value (an outlier) drags the mean towards it — it's a heavy weight far away — while the median, which only cares about the middle position, barely moves.</p>
<div class="fbox">mean = sum ÷ count        so        sum = mean × count</div>
<p>That second form solves most SAT mean questions.</p>
<div class="eg"><div class="lab">1 · Adding a value</div>20 students average 70. A new student scores 91. New sum = 20·70 + 91 = 1491; new mean = 1491 ÷ 21 = <strong>71</strong>.</div>
<div class="eg"><div class="lab">2 · Finding a missing value</div>Five tests average 84. Four of them are 80, 90, 78, 88. The fifth = 5·84 − (80 + 90 + 78 + 88) = 420 − 336 = <strong>84</strong>.</div>
<div class="eg"><div class="lab">3 · The score you need</div>After 4 tests the mean is 75. What's needed on test 5 for a mean of 78? 5·78 − 4·75 = 390 − 300 = <strong>90</strong>.</div>
<h3>The median from a frequency table</h3>
<table class="tbl" style="width:100%"><tr><td>pets</td><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><td>students</td><td>4</td><td>6</td><td>7</td><td>3</td></tr></table>
<p>20 students → the median is the average of the 10th and 11th values. Count: values 0 cover positions 1–4, values 1 cover 5–10, values 2 cover 11–17. So the 10th is 1 and the 11th is 2 → median <strong>1.5</strong>.</p>
<h3>Which centre should you use?</h3>
<ul><li>Symmetric data, no outliers → mean and median are close; either works.</li><li>Skewed data or outliers (incomes, house prices) → the <b>median</b> describes a “typical” value better.</li><li>Removing an outlier changes the mean a lot and the median a little.</li></ul>
${QC("Six numbers have mean 15. Five of them sum to 72. What is the sixth?","18","90 − 72.")}
${QC("Values 1, 2, 3, 4 occur 2, 5, 4, 1 times. What is the median?","2","12 values; 6th and 7th are both 2.")}
`);
DEEP("data","l3",8,`
<h3>Going deeper: percent of what?</h3>
<p>Every percent in a data question is “part ÷ whole”. The hard part is picking the right whole — the group the question restricts you to.</p>
<table class="tbl" style="width:100%"><tr><td></td><td><b>Likes math</b></td><td><b>Doesn't</b></td><td><b>Total</b></td></tr><tr><td>Grade 10</td><td>45</td><td>30</td><td>75</td></tr><tr><td>Grade 11</td><td>60</td><td>65</td><td>125</td></tr><tr><td>Total</td><td>105</td><td>95</td><td>200</td></tr></table>
<div class="eg"><div class="lab">Three different wholes</div>• Percent of ALL students who are grade 10 and like math: 45 ÷ 200 = <b>22.5%</b>.<br>• Percent OF GRADE 10 who like math: 45 ÷ 75 = <b>60%</b>.<br>• Percent OF MATH-LOVERS who are in grade 10: 45 ÷ 105 ≈ <b>42.9%</b>.</div>
<h3>From a sample to a population</h3>
<div class="eg"><div class="lab">EXAMPLE</div>In a random sample of 200 students, 105 like math. The school has 1,400 students. Estimate: 105/200 × 1400 = <strong>735</strong>. Valid only if the sample was <b>random</b> and from the same population.</div>
<div class="trap"><b>Trap:</b> a survey of people at a gym can't tell you how much the whole city exercises — the sample isn't representative.</div>
${QC("Using the table, what percent of grade 11 students don't like math? (number only)","52","65 ÷ 125.")}
`);
DEEP("prob","l1",10,`
<h3>Going deeper: the sample space</h3>
<p>Probability = favourable outcomes ÷ all <b>equally likely</b> outcomes. The list of all outcomes is the <b>sample space</b>. When you're unsure, write it out.</p>
<div class="eg"><div class="lab">EXAMPLE — two coins</div>Outcomes: HH, HT, TH, TT (four, equally likely). P(exactly one head) = 2/4 = <strong>1/2</strong>. A common mistake is to list only “two heads, one head, no heads” — those three aren't equally likely.</div>
<h3>Probability from a table</h3>
<table class="tbl" style="width:100%"><tr><td></td><td><b>Bus</b></td><td><b>Walk</b></td><td><b>Total</b></td></tr><tr><td>Junior</td><td>30</td><td>20</td><td>50</td></tr><tr><td>Senior</td><td>18</td><td>32</td><td>50</td></tr><tr><td>Total</td><td>48</td><td>52</td><td>100</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>A student is chosen at random. P(walks) = 52/100 = 0.52. Given the student is a senior, P(walks) = 32/50 = <strong>0.64</strong> — “given” shrinks the whole to the senior row.</div>
<h3>The complement: “not” and “at least”</h3>
<p>P(not A) = 1 − P(A). If P(rain) = 0.3, P(no rain) = 0.7. For “at least one”, it's usually easier to compute 1 − P(none).</p>
<h3>Expected counts</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A light bulb is defective with probability 0.02. In a box of 450, about 450 × 0.02 = <strong>9</strong> are expected to be defective.</div>
<div class="tip">A probability is always between 0 and 1. If you get 1.4 or −0.2, something went wrong.</div>
${QC("Using the table, P(junior | takes the bus)? (fraction)","5/8","30 ÷ 48.")}
${QC("A bag has 3 red, 5 blue, 2 green. P(not blue)? (fraction)","1/2","5 ÷ 10 are not blue.")}
`);
DEEP("prob","l2",9,`
<h3>Going deeper: “and” multiplies, “or” adds</h3>
<div class="fbox">P(A and B) = P(A) × P(B)            (independent)
P(A or B)  = P(A) + P(B) − P(A and B)</div>
<p>The subtraction in the “or” rule removes the outcomes you counted twice.</p>
<div class="eg"><div class="lab">EXAMPLE — or</div>A card is drawn from 52. P(heart or king) = 13/52 + 4/52 − 1/52 = 16/52 = <strong>4/13</strong> (the king of hearts was counted twice).</div>
<div class="eg"><div class="lab">EXAMPLE — and</div>Roll two dice. P(both even) = 1/2 × 1/2 = <strong>1/4</strong>.</div>
<h3>The multiplication principle for counting</h3>
<p>If one choice has m options and a second has n, there are m × n combinations.</p>
<div class="eg"><div class="lab">EXAMPLE</div>3 shirts, 4 trousers, 2 pairs of shoes: 3 × 4 × 2 = <strong>24</strong> outfits.</div>
<div class="eg"><div class="lab">EXAMPLE — codes</div>A code is a letter followed by two digits: 26 × 10 × 10 = <strong>2,600</strong> codes. If the digits can't repeat: 26 × 10 × 9 = 2,340.</div>
${QC("P(A) = 0.5, P(B) = 0.4, P(A and B) = 0.2. P(A or B)?","0.7","0.5 + 0.4 − 0.2.")}
`);
DEEP("geo1","l2",10,`
<h3>Going deeper: why the angles add to 180°</h3>
<p>Draw a line through the top vertex parallel to the base. The two angles beside the top angle are alternate angles with the base angles — equal to them. The three angles at the top lie on a straight line, so they add to 180°. That's the proof.</p>
${FIG.para(["a","","","","","","",""],{cap:"Parallel lines carry the base angles up to the top: a straight line = 180°."})}
<h3>The exterior angle theorem</h3>
<p>An exterior angle equals the <b>sum of the two remote interior angles</b>. Reason: exterior + adjacent interior = 180, and the three interior angles also add to 180.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Interior angles 48° and 67°; the exterior angle at the third vertex = 48 + 67 = <strong>115°</strong>.</div>
<h3>Chains of reasoning (isosceles)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>In triangle ABC, AB = AC and angle A = 40°. The base angles are equal: (180 − 40)/2 = <strong>70°</strong> each.<br>Now extend BC past C: the exterior angle at C = 180 − 70 = 110°.</div>
<h3>Triangle inequality</h3>
<p>Any side must be shorter than the sum of the other two. Sides 3 and 8: the third side x satisfies 8 − 3 &lt; x &lt; 8 + 3 → 5 &lt; x &lt; 11.</p>
<h3>Area with any base</h3>
<p>A = ½ × base × height, where the height is perpendicular to the base you chose — it may fall outside an obtuse triangle.</p>
${QC("Isosceles triangle with apex angle 52°. Each base angle?","64","128 ÷ 2.")}
${QC("Two sides are 6 and 10. Largest whole-number length of the third side?","15","Must be less than 16.")}
`);
DEEP("geo2","l2",11,`
<h3>Going deeper: every area formula, explained</h3>
<table class="tbl" style="width:100%"><tr><td><b>Shape</b></td><td><b>Area</b></td><td><b>Why</b></td></tr>
<tr><td>Rectangle</td><td>l × w</td><td>rows × columns of unit squares</td></tr>
<tr><td>Parallelogram</td><td>b × h</td><td>cut a triangle off one side, move it: a rectangle</td></tr>
<tr><td>Triangle</td><td>½ b × h</td><td>half of a parallelogram</td></tr>
<tr><td>Trapezoid</td><td>½(a + b) × h</td><td>average of the two parallel sides × height</td></tr>
<tr><td>Circle</td><td>πr²</td><td>slices rearranged into a near-rectangle πr by r</td></tr></table>
<h3>Composite shapes: add or subtract</h3>
<div class="eg"><div class="lab">ADD</div>An L-shape: split into a 10 × 4 rectangle and a 4 × 6 rectangle: 40 + 24 = <strong>64</strong>.</div>
<div class="eg"><div class="lab">SUBTRACT</div>A 12 × 12 square with a circle of radius 6 cut out: 144 − 36π ≈ <strong>30.9</strong>.</div>
<div class="eg"><div class="lab">FRAME</div>A 20 × 30 photo with a 2-unit border: outer 24 × 34 = 816; inner 600; frame = <strong>216</strong>.</div>
<h3>Perimeter traps</h3>
<ul><li>Perimeter counts only the outside edges — not the cuts you made to split a shape.</li><li>A semicircle's perimeter includes the diameter: πr + 2r.</li></ul>
<h3>Scaling</h3>
<p>Multiply every length by k → perimeter × k, area × k². A square with side 3 → 6: area goes from 9 to 36 (× 4).</p>
${QC("Trapezoid with parallel sides 8 and 14, height 5. Area?","55","½ × 22 × 5.")}
${QC("A semicircle has diameter 10. Perimeter = kπ + 10. Enter k.","5","πr = 5π.")}
`);
DEEP("ratio","l1",8,`
<h3>Going deeper: parts, wholes and scaling</h3>
<p>A ratio compares <b>parts</b>. The whole is the sum of the parts. Most ratio mistakes come from mixing these up.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Red : blue = 3 : 5. Fraction of red = 3/(3 + 5) = <strong>3/8</strong>, not 3/5.</div>
<h3>The “one part” method</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A class has boys : girls = 4 : 7 and 33 students. 11 parts = 33 → 1 part = 3 → boys 12, girls 21.</div>
<div class="eg"><div class="lab">EXAMPLE — difference given</div>Same ratio, but there are 9 more girls than boys. The difference is 3 parts = 9 → 1 part = 3 → boys 12, girls 21.</div>
<h3>Three-part ratios</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Cement : sand : gravel = 1 : 2 : 4 for 350 kg → 7 parts of 50 kg → <strong>50, 100, 200 kg</strong>.</div>
<h3>Changing a ratio</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Cats : dogs = 2 : 3, with 10 cats. After 5 more cats arrive, the ratio is 15 : 15 = 1 : 1. (There were 15 dogs.)</div>
${QC("Ratio 5 : 3, difference 16. What is the larger amount?","40","2 parts = 16 → 1 part = 8.")}
`);
DEEP("exp","l2",8,`
<h3>Going deeper: roots are fractional powers</h3>
<div class="fbox">√x = x^(1/2)      ∛x = x^(1/3)      ⁿ√(xᵐ) = x^(m/n)</div>
<p>Why? (x^(1/2))² = x^(1/2 · 2) = x¹ = x — exactly what a square root does.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Write ∛(x²) · √x as one power: x^(2/3) · x^(1/2) = x^(2/3 + 1/2) = <strong>x^(7/6)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>16^(3/4) = (⁴√16)³ = 2³ = <strong>8</strong>. Take the root first — the numbers stay small.</div>
<h3>Square roots and ±</h3>
<p>√25 means the positive root only: 5. But the <em>equation</em> x² = 25 has two solutions: ±5. Know which one the question asks.</p>
<h3>Estimating roots</h3>
<p>√50 is between √49 = 7 and √64 = 8, closer to 7: about 7.07.</p>
${QC("Write √x · x² as x^k. Enter k as a decimal.","2.5","1/2 + 2.")}
${QC("Compute 27^(2/3).","9","(∛27)² = 9.")}
`);
DEEP("exp","l3",8,`
<h3>Going deeper: working with scientific notation</h3>
<p>Scientific notation is a × 10ⁿ with 1 ≤ a &lt; 10. The exponent counts how many places the decimal point moved.</p>
<div class="eg"><div class="lab">CONVERTING</div>45,000,000 = 4.5 × 10⁷ (point moves 7 left). 0.00032 = 3.2 × 10⁻⁴ (4 right → negative).</div>
<h3>Multiplying and dividing</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(3 × 10⁵)(4 × 10³) = 12 × 10⁸ = <strong>1.2 × 10⁹</strong> — fix the front number so it's under 10.</div>
<div class="eg"><div class="lab">EXAMPLE</div>(8 × 10⁶) ÷ (2 × 10⁻²) = 4 × 10⁸.</div>
<h3>Adding: match the powers first</h3>
<div class="eg"><div class="lab">EXAMPLE</div>3 × 10⁴ + 5 × 10³ = 30 × 10³ + 5 × 10³ = 35 × 10³ = <strong>3.5 × 10⁴</strong>.</div>
<h3>“How many times larger?”</h3>
<div class="eg"><div class="lab">EXAMPLE</div>The Sun's mass ≈ 2 × 10³⁰ kg; Earth's ≈ 6 × 10²⁴ kg. Ratio ≈ (2/6) × 10⁶ ≈ <strong>333,000 times</strong>.</div>
${QC("(6 × 10⁴)(5 × 10²) = a × 10ⁿ. Enter n.","7","30 × 10⁶ = 3 × 10⁷.")}
`);
DEEP("advm","l2",10,`
<h3>Going deeper: rational expressions are fractions with letters</h3>
<p>Every rule for number fractions works for algebraic ones. The one new danger: values that make a denominator zero are not allowed.</p>
<h3>Simplifying: factor, then cancel whole factors</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(x² − 9)/(x² + 5x + 6) = (x − 3)(x + 3)/((x + 2)(x + 3)) = <strong>(x − 3)/(x + 2)</strong>, for x ≠ −3, −2.</div>
<h3>Multiplying and dividing</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(x/(x + 1)) ÷ (x²/(x² − 1)) = x/(x + 1) × (x − 1)(x + 1)/x² = <strong>(x − 1)/x</strong>.</div>
<h3>Adding: common denominator</h3>
<div class="eg"><div class="lab">EXAMPLE</div>2/x + 3/(x + 1) = (2(x + 1) + 3x)/(x(x + 1)) = <strong>(5x + 2)/(x(x + 1))</strong>.</div>
<h3>Polynomial division as a remainder</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(x² + 5x + 7)/(x + 2): x² + 5x + 7 = (x + 2)(x + 3) + 1, so it equals x + 3 + 1/(x + 2). The remainder is 1.</div>
<div class="trap"><b>Trap:</b> (x + 6)/6 is NOT x + 1. You may only cancel factors (things multiplied), never terms (things added).</div>
${QC("Simplify (x² − 4)/(x − 2) and evaluate at x = 5.","7","x + 2.")}
`);
DEEP("advm","l3",8,`
<h3>Going deeper: complex numbers step by step</h3>
<div class="fbox">i = √(−1)      i² = −1      i³ = −i      i⁴ = 1   (the pattern repeats every 4)</div>
<h3>Adding and multiplying</h3>
<div class="eg"><div class="lab">ADD</div>(3 + 2i) + (5 − 6i) = <strong>8 − 4i</strong> — combine real parts and imaginary parts separately.</div>
<div class="eg"><div class="lab">MULTIPLY</div>(3 + 2i)(1 − 4i) = 3 − 12i + 2i − 8i² = 3 − 10i + 8 = <strong>11 − 10i</strong>.</div>
<h3>Dividing: multiply by the conjugate</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(5 + i)/(2 − i) × (2 + i)/(2 + i) = (10 + 5i + 2i + i²)/(4 + 1) = (9 + 7i)/5 = <strong>9/5 + (7/5)i</strong>.</div>
<h3>Powers of i</h3>
<p>Divide the exponent by 4 and use the remainder: i²³ → 23 = 4·5 + 3 → i³ = −i.</p>
<div class="tip">On the SAT, complex-number questions are short arithmetic. The only rule to remember is i² = −1 — replace it immediately whenever it appears.</div>
${QC("(2 + 3i)(2 − 3i) = ? (a real number)","13","4 − 9i² = 4 + 9.")}
`);
DEEP("trig","l2",8,`
<h3>Going deeper: what a radian really is</h3>
<p>Wrap the radius of a circle around its edge. The angle that arc makes at the centre is <b>1 radian</b> (about 57.3°). A full turn needs 2π radii, so 360° = 2π radians.</p>
<div class="fbox">180° = π rad        degrees → radians: × π/180        radians → degrees: × 180/π</div>
<div class="eg"><div class="lab">EXAMPLES</div>90° = π/2 · 60° = π/3 · 45° = π/4 · 30° = π/6 · 3π/4 = 135°.</div>
<h3>Why radians make arc length easy</h3>
<div class="fbox">arc length s = r θ        (θ in radians)        sector area = ½ r² θ</div>
<div class="eg"><div class="lab">EXAMPLE</div>r = 6, θ = π/3: s = 6 · π/3 = <strong>2π</strong>. Compare with degrees: (60/360) · 2π · 6 = 2π — the same, but longer to write.</div>
<h3>Angles on the unit circle</h3>
<p>Coterminal angles end in the same place: θ and θ ± 2π. So 7π/3 points the same way as π/3.</p>
${QC("Convert 150° to radians: kπ. Enter k as a fraction.","5/6","150/180.")}
${QC("Arc length with r = 9 and θ = 2π/3 is kπ. Enter k.","6","9 · 2/3.")}
`);
LPC={};
