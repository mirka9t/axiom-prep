/* =====================================================================
   ZERO TO 800 — CONTENT v4 (2)
   Unit: Algebraic expressions & factoring · Unit: Geometry foundations
   Extra lessons: types of numbers · sequences · weighted averages
   ===================================================================== */
NEWUNIT({id:"poly",em:"🧩",color:"#e6e1ff",title:"Algebraic expressions & factoring",tag:"Terms and like terms, multiplying with the area model, special products, and every factoring method — GCF, grouping, trinomials, the AC method — plus algebraic fractions and polynomial division.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"Terms, coefficients & combining like terms",mins:10,h:`
<p>An algebraic expression is built from <strong>terms</strong> joined by + and −. In <span class="fx">5x² − 3x + 7</span> there are three terms: 5x², −3x and 7.</p>
<ul><li>The <b>coefficient</b> is the number in front: 5 in 5x², −3 in −3x. If you see just x, the coefficient is 1.</li>
<li>The <b>variable part</b> is the letters with their powers: x², x, xy, x²y…</li>
<li>A term with no letters (7) is a <b>constant</b>.</li></ul>
<h3>Like terms</h3>
<p>Terms are <b>like terms</b> only if their variable parts are <em>exactly</em> the same — same letters, same powers. 3x² and −8x² are like terms. 3x² and 3x are NOT (different powers). 4xy and 4yx ARE (order of multiplication doesn't matter).</p>
<h3>Combining like terms</h3>
<p>Add or subtract the coefficients; keep the variable part unchanged. Think of x² as “apples” and x as “bananas” — you can add apples to apples, never apples to bananas.</p>
<div class="eg"><div class="lab">EXAMPLE</div>4x² + 3x − 7 + 2x² − 5x + 1<br>Group: (4x² + 2x²) + (3x − 5x) + (−7 + 1) = <strong>6x² − 2x − 6</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — subtracting a bracket</div>(5a² − 2a + 3) − (2a² + 4a − 1) = 5a² − 2a + 3 − 2a² − 4a + 1 = <strong>3a² − 6a + 4</strong>. The minus flips EVERY sign inside the second bracket.</div>
<div class="trap"><b>Trap.</b> x² + x² = 2x², not x⁴. Adding never changes the power; only multiplying does (x² · x² = x⁴).</div>
${QC("Simplify 7y − 3 + 2y + 10 − y. What is the coefficient of y?","8","7 + 2 − 1 = 8 (and the constant is 7).")}
${QC("(3x² + 5x) − (x² − 2x): the coefficient of x?","7","5x − (−2x) = 7x.")}
`},
{id:"l2",t:"Multiplying polynomials with the area model",mins:12,h:`
<p>Multiplying brackets is just the distributive law used many times: <b>every term in the first bracket multiplies every term in the second</b>. The clearest way to see it is a rectangle — the <strong>area model</strong>.</p>
${FIG2.areaBox(["x","+3"],["x","+4"],[["x²","3x"],["4x","12"]],{cap:"(x + 3)(x + 4): the four boxes add to x² + 3x + 4x + 12 = x² + 7x + 12"})}
<p>The width is x + 3, the height is x + 4, so the area is (x + 3)(x + 4). Each small box is one product, and the total area is their sum.</p>
<h3>FOIL — the shortcut for two binomials</h3>
<p><b>F</b>irst · <b>O</b>uter · <b>I</b>nner · <b>L</b>ast.</p>
<div class="eg"><div class="lab">EXAMPLE</div>(2x − 5)(3x + 4): F: 6x², O: 8x, I: −15x, L: −20 → <strong>6x² − 7x − 20</strong>.</div>
<h3>Bigger brackets — same idea, more boxes</h3>
${FIG2.areaBox(["x²","−2x","+5"],["x","+3"],[["x³","−2x²","5x"],["3x²","−6x","15"]],{cap:"(x + 3)(x² − 2x + 5) = x³ + x² − x + 15"})}
<div class="eg"><div class="lab">EXAMPLE</div>(x + 3)(x² − 2x + 5): boxes x³, −2x², 5x, 3x², −6x, 15. Combine: <strong>x³ + x² − x + 15</strong>.</div>
<div class="tip"><b>Count check:</b> a 2-term bracket times a 3-term bracket gives 2 × 3 = 6 products before combining. If you have fewer, you skipped one.</div>
${QC("Expand (x − 6)(x + 2) = x² + bx + c. Enter b.","-4","Outer + inner: 2x − 6x = −4x.")}
${QC("Expand (2x + 3)(x − 1): the constant term?","-3","3 × (−1).")}
`},
{id:"l3",t:"Special products: perfect squares & difference of squares",mins:10,h:`
<p>Three products appear so often that you should recognise them instantly — both forwards (expanding) and backwards (factoring).</p>
<div class="fbox">(a + b)² = a² + 2ab + b²
(a − b)² = a² − 2ab + b²
(a + b)(a − b) = a² − b²</div>
${FIG2.areaBox(["a","+b"],["a","+b"],[["a²","ab"],["ab","b²"]],{cap:"(a + b)²: a square of side a + b contains a², b² and TWO ab rectangles."})}
<div class="eg"><div class="lab">EXAMPLE</div>(x + 5)² = x² + 10x + 25. (3y − 2)² = 9y² − 12y + 4.</div>
<div class="eg"><div class="lab">EXAMPLE</div>(x + 7)(x − 7) = x² − 49 — the middle terms +7x and −7x cancel.</div>
<div class="eg"><div class="lab">MENTAL MATH BONUS</div>41 × 39 = (40 + 1)(40 − 1) = 1600 − 1 = <strong>1599</strong>.</div>
<div class="trap"><b>The most common algebra mistake on the SAT:</b> (x + 5)² ≠ x² + 25. The 10x is always there.</div>
${QC("(x − 4)² = x² + bx + 16. Enter b.","-8","−2 · 4 = −8.")}
${QC("Compute 52 × 48 using a difference of squares.","2496","50² − 2² = 2500 − 4.")}
`},
{id:"l4",t:"Factoring 1: greatest common factor & grouping",mins:11,h:`
<p><strong>Factoring</strong> is expanding in reverse: we turn a sum into a product. Always try these first two methods before anything else.</p>
<h3>Method 1: take out the GCF</h3>
<p>Find the greatest common factor of all terms (numbers AND letters), write it outside, and divide each term by it.</p>
<div class="eg"><div class="lab">EXAMPLE</div>12x³ − 18x² + 6x. GCF of 12, 18, 6 is 6; lowest power of x is x¹. → <strong>6x(2x² − 3x + 1)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>15a²b − 10ab² = <strong>5ab(3a − 2b)</strong>.</div>
<div class="tip"><b>Check:</b> multiply back out. If you get the original, it's right.</div>
<h3>Method 2: grouping (four terms)</h3>
<p>Split the four terms into two pairs, factor each pair, then take out the common bracket.</p>
<div class="eg"><div class="lab">EXAMPLE</div>x³ + 3x² + 2x + 6<br>= x²(x + 3) + 2(x + 3)<br>= <strong>(x + 3)(x² + 2)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — with a minus</div>ax − ay − bx + by = a(x − y) − b(x − y) = <strong>(x − y)(a − b)</strong>. When taking out −b, the sign of the last term flips.</div>
${QC("Factor 8x² + 12x = 4x(2x + k). Enter k.","3","12x ÷ 4x = 3.")}
${QC("x³ − 5x² + 4x − 20 = (x − 5)(x² + m). Enter m.","4","x²(x − 5) + 4(x − 5).")}
`},
{id:"l5",t:"Factoring 2: trinomials x² + bx + c",mins:12,h:`
<p>To factor x² + bx + c, find two numbers that <b>multiply to c</b> and <b>add to b</b>. Then x² + bx + c = (x + p)(x + q).</p>
<h3>Let the signs guide you</h3>
<table class="tbl" style="width:100%"><tr><td><b>c</b></td><td><b>b</b></td><td><b>Signs of p and q</b></td><td><b>Example</b></td></tr>
<tr><td>+</td><td>+</td><td>both +</td><td>x² + 7x + 12 = (x + 3)(x + 4)</td></tr>
<tr><td>+</td><td>−</td><td>both −</td><td>x² − 9x + 20 = (x − 4)(x − 5)</td></tr>
<tr><td>−</td><td>+</td><td>different, bigger one +</td><td>x² + 2x − 15 = (x + 5)(x − 3)</td></tr>
<tr><td>−</td><td>−</td><td>different, bigger one −</td><td>x² − 4x − 21 = (x − 7)(x + 3)</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE — step by step</div>x² − 2x − 24. c = −24 → signs differ. b = −2 → the bigger one is negative. Pairs for 24: 1·24, 2·12, 3·8, 4·6. Difference of 2 → 4 and 6 → −6 and +4. Answer <strong>(x − 6)(x + 4)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — take out a GCF first</div>3x² − 15x + 18 = 3(x² − 5x + 6) = <strong>3(x − 2)(x − 3)</strong>.</div>
<div class="tip"><b>Some trinomials can't be factored</b> with whole numbers (like x² + x + 1). On the SAT, use the quadratic formula for those.</div>
${QC("x² + 11x + 28 = (x + p)(x + q). Enter the larger of p, q.","7","4 × 7 = 28 and 4 + 7 = 11.")}
${QC("x² − x − 30 = (x − a)(x + b). Enter a.","6","−6 and +5: product −30, sum −1.")}
`},
{id:"l6",t:"Factoring 3: ax² + bx + c (the AC method)",mins:13,h:`
<p>When the leading coefficient a isn't 1, use the <strong>AC method</strong>. It always works when the expression is factorable.</p>
<ol><li>Multiply a × c.</li><li>Find two numbers that multiply to ac and add to b.</li><li>Split the middle term using those two numbers.</li><li>Factor by grouping.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>6x² + 11x + 4.<br>1. a·c = 6 · 4 = 24.<br>2. Two numbers with product 24 and sum 11: 3 and 8.<br>3. 6x² + 3x + 8x + 4.<br>4. 3x(2x + 1) + 4(2x + 1) = <strong>(2x + 1)(3x + 4)</strong>.<br>Check: 6x² + 8x + 3x + 4 ✓.</div>
<div class="eg"><div class="lab">EXAMPLE — negatives</div>2x² − 5x − 12.<br>a·c = −24; product −24, sum −5 → −8 and 3.<br>2x² − 8x + 3x − 12 = 2x(x − 4) + 3(x − 4) = <strong>(x − 4)(2x + 3)</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — solving with it</div>2x² − 5x − 12 = 0 → (x − 4)(2x + 3) = 0 → x = 4 or x = −3/2.</div>
${NOTE("write the two numbers down before splitting. Students who try to do the AC method in their head lose signs every time.")}
${QC("Factor 3x² + 10x + 8 = (3x + p)(x + q). Enter p.","4","ac = 24 → 6 and 4: 3x² + 6x + 4x + 8 = 3x(x + 2) + 4(x + 2).")}
${QC("Larger solution of 2x² + x − 6 = 0? (fraction ok)","3/2","(2x − 3)(x + 2) = 0.")}
`},
{id:"l7",t:"Algebraic fractions: simplify, multiply, add",mins:12,h:`
<p>Algebraic fractions follow the same rules as number fractions — the only new skill is factoring first.</p>
<h3>Simplifying: factor, then cancel common FACTORS</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(x² − 9)/(x² + 5x + 6) = (x − 3)(x + 3) / ((x + 2)(x + 3)) = <strong>(x − 3)/(x + 2)</strong>, for x ≠ −3, −2.</div>
<div class="trap"><b>Never cancel terms.</b> In (x + 6)/6 you can't cancel the 6s — the top is a sum. Only whole factors (things multiplied) cancel.</div>
<h3>Multiplying and dividing</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(2x/(x + 1)) · ((x² − 1)/(4x²)) = 2x(x − 1)(x + 1) / ((x + 1) · 4x²) = <strong>(x − 1)/(2x)</strong>. To divide, flip the second fraction and multiply.</div>
<h3>Adding: find the common denominator (LCM of the bottoms)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>3/x + 2/(x + 1) = 3(x + 1)/(x(x + 1)) + 2x/(x(x + 1)) = <strong>(5x + 3)/(x(x + 1))</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — SAT style</div>Which is equivalent to (x² + 3x)/x? Factor: x(x + 3)/x = x + 3 (for x ≠ 0).</div>
${QC("Simplify (x² − 4)/(x − 2) to x + k. Enter k.","2","(x − 2)(x + 2)/(x − 2).")}
${QC("1/x + 1/(2x) = k/(2x). Enter k.","3","2/(2x) + 1/(2x).")}
`},
{id:"l8",t:"Dividing polynomials & remainders",mins:11,h:`
<p>Polynomial long division works exactly like number long division: divide the leading terms, multiply, subtract, bring down, repeat.</p>
<div class="eg"><div class="lab">EXAMPLE</div>(x² + 5x + 8) ÷ (x + 2)<br>1. x² ÷ x = <b>x</b>. Multiply: x(x + 2) = x² + 2x. Subtract: 3x + 8.<br>2. 3x ÷ x = <b>3</b>. Multiply: 3(x + 2) = 3x + 6. Subtract: <b>2</b>.<br>Result: x + 3 remainder 2, so (x² + 5x + 8)/(x + 2) = <strong>x + 3 + 2/(x + 2)</strong>.</div>
<h3>The remainder shortcut</h3>
<p>The remainder when p(x) is divided by (x − a) equals p(a). Above: divide by (x + 2) = (x − (−2)), so remainder = p(−2) = 4 − 10 + 8 = 2 ✓.</p>
<div class="eg"><div class="lab">EXAMPLE — SAT style</div>If (2x² + 7x + 1)/(x + 3) = 2x + 1 + k/(x + 3), find k. Remainder = p(−3) = 18 − 21 + 1 = <strong>−2</strong>.</div>
<div class="tip"><b>Missing powers:</b> when dividing x³ − 8 by (x − 2), write it as x³ + 0x² + 0x − 8 so the columns line up.</div>
${QC("Remainder when x² + 4x + 9 is divided by x + 1?","6","p(−1) = 1 − 4 + 9.")}
`}]},"alg");
more("poly",[
N("Simplify 3a + 5b − a + 2b: coefficient of a?","2","3 − 1."),
N("(4x² − x + 2) − (x² + 3x − 5): coefficient of x?","-4","−x − 3x."),
N("Expand (x + 7)(x − 3) = x² + bx + c. Enter c.","-21","7 × (−3)."),
N("(3x − 2)² = 9x² + bx + 4. Enter b.","-12","2 · 3x · (−2)."),
N("Factor 10x² − 15x = 5x(2x + k). Enter k.","-3","−15x ÷ 5x."),
N("x² + 9x + 20 = (x + p)(x + q). Smaller of p, q?","4","4 and 5."),
N("x² − 49 = (x + a)(x − a). Enter a.","7","Difference of squares."),
N("2x² + 7x + 3 = (2x + 1)(x + k). Enter k.","3","ac = 6 → 6 and 1."),
N("Simplify (x² + 6x)/x to x + k. Enter k.","6","x(x + 6)/x."),
N("Remainder of (x² − 3x + 5) ÷ (x − 2)?","3","p(2) = 4 − 6 + 5.")
],[
N("Expand (2x + 5)(x − 4): coefficient of x?","-3","−8x + 5x."),
N("x² − 12x + 35 = (x − p)(x − q). Larger of p, q?","7","5 and 7."),
N("6x² − x − 2 = (3x − 2)(2x + k). Enter k.","1","Check: 6x² + 3x − 4x − 2."),
N("Compute 103 × 97 with a difference of squares.","9991","100² − 3²."),
P("Which is equivalent to (x² − 1)/(x + 1)?",["x + 1","x − 1","x","1"],1,"(x − 1)(x + 1)/(x + 1)."),
N("(3x² + 8x + 2)/(x + 2) = 3x + 2 + k/(x + 2). Enter k.","-2","p(−2) = 12 − 16 + 2."),
N("Factor x³ + 2x² + 3x + 6 = (x + 2)(x² + m). Enter m.","3","Grouping."),
N("If x + y = 7 and x − y = 3, find x² − y².","21","(x + y)(x − y).")
],[
C("Like terms","Same letters with the same powers — only these combine."),
C("x² + x²","2x² (adding never changes the power)."),
C("Area model","Every term times every term: draw a box for each product."),
C("FOIL","First, Outer, Inner, Last."),
C("(a + b)²","a² + 2ab + b²."),
C("a² − b²","(a + b)(a − b)."),
C("Factor x² + bx + c","Two numbers: multiply to c, add to b."),
C("AC method","a·c → two numbers → split middle → group."),
C("First step of any factoring","Take out the GCF."),
C("Algebraic fractions","Factor first, cancel only FACTORS.")
]);

/* =====================================================================
   UNIT: Geometry foundations
   ===================================================================== */
NEWUNIT({id:"geo0",em:"📐",color:"#dff6ea",title:"Geometry foundations",tag:"The language of geometry: points, lines and angle types, angle relationships, triangle and quadrilateral properties, every area and perimeter formula, 3D solids, and shapes on the coordinate grid.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"Points, lines, rays, segments & angle types",mins:9,h:`
<p>Geometry has its own vocabulary. Learning it first makes every later picture easy to read.</p>
<ul><li><b>Point</b>: an exact location, named with a capital letter (A). It has no size.</li>
<li><b>Line</b>: straight, goes on forever in both directions. Written AB with arrows on both ends.</li>
<li><b>Ray</b>: starts at a point and goes forever in one direction (like a sun ray).</li>
<li><b>Segment</b>: the part of a line between two endpoints. It has a length.</li>
<li><b>Angle</b>: two rays from the same point (the <b>vertex</b>), measured in degrees.</li></ul>
${FIG2.angles()}
<table class="tbl" style="width:100%"><tr><td><b>Type</b></td><td>acute</td><td>right</td><td>obtuse</td><td>straight</td><td>reflex</td><td>full turn</td></tr><tr><td><b>Size</b></td><td>0°–90°</td><td>90°</td><td>90°–180°</td><td>180°</td><td>180°–360°</td><td>360°</td></tr></table>
<div class="tip"><b>Right angles</b> are shown by a small square in the corner. If you see the square, it's exactly 90° — even if the drawing looks a bit off. SAT pictures are not always drawn to scale unless it says so.</div>
<p>Two lines that meet at a right angle are <b>perpendicular</b> (⊥). Lines that never meet are <b>parallel</b> (∥), shown with matching arrow marks.</p>
${QC("An angle of 125° is acute, right, obtuse or straight? Type the word.","obtuse","Between 90° and 180°.")}
`},
{id:"l2",t:"Angle relationships",mins:11,h:`
<p>Most angle questions are solved with five relationships. Learn them and you'll fill in missing angles like a puzzle.</p>
<div class="fbox">complementary:  a + b = 90°
supplementary:  a + b = 180°   (angles on a straight line)
around a point: all angles add to 360°
vertical angles: opposite angles at a crossing are EQUAL
triangle:       the three angles add to 180°</div>
${FIG.para(["70°","110°","110°","70°","","","",""],{cap:"Where two lines cross, opposite (vertical) angles are equal, and neighbours add to 180°."})}
<div class="eg"><div class="lab">EXAMPLE</div>Two angles are complementary and one is 4 times the other. x + 4x = 90 → x = 18. The angles are <strong>18° and 72°</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>Angles on a straight line are 2x + 10 and 3x − 5. (2x + 10) + (3x − 5) = 180 → 5x = 175 → x = 35. The angles are 80° and 100°.</div>
<div class="eg"><div class="lab">EXAMPLE</div>Around a point: 90°, 120°, x, x. 210 + 2x = 360 → x = <strong>75°</strong>.</div>
<div class="tip"><b>Memory trick:</b> <b>C</b>omplementary comes before <b>S</b>upplementary in the alphabet, and 90 comes before 180.</div>
${QC("The supplement of a 47° angle?","133","180 − 47.")}
${QC("Vertical angles are (3x + 10)° and (5x − 20)°. Find x.","15","3x + 10 = 5x − 20.")}
`},
{id:"l3",t:"Triangles: types and key properties",mins:11,h:`
<h3>Classify by sides</h3>
<ul><li><b>Equilateral:</b> 3 equal sides, all angles 60°.</li><li><b>Isosceles:</b> 2 equal sides; the angles opposite them are equal.</li><li><b>Scalene:</b> no equal sides, no equal angles.</li></ul>
<h3>Classify by angles</h3>
<ul><li><b>Acute:</b> all angles less than 90°.</li><li><b>Right:</b> one 90° angle (the side opposite it is the hypotenuse).</li><li><b>Obtuse:</b> one angle bigger than 90°.</li></ul>
<h3>The properties you'll use constantly</h3>
<div class="fbox">angle sum = 180°
exterior angle = sum of the two far interior angles
longest side ↔ largest angle
any side < sum of the other two (triangle inequality)
area = ½ × base × height</div>
${FIG.tri({a:"height h",b:"base b",c:"",cap:"The height is always perpendicular to the base — not a slanted side."})}
<div class="eg"><div class="lab">EXAMPLE — exterior angle</div>A triangle has interior angles 50° and 65°. The exterior angle at the third vertex = 50 + 65 = <strong>115°</strong>. (Check: third angle 65°, and 180 − 65 = 115 ✓.)</div>
<div class="eg"><div class="lab">EXAMPLE — isosceles</div>An isosceles triangle has a base angle of 40°. The other base angle is 40°; the top angle is 180 − 80 = <strong>100°</strong>.</div>
${QC("A triangle has angles 2x, 3x and 4x. Find the largest angle.","80","9x = 180 → x = 20.")}
`},
{id:"l4",t:"Quadrilaterals & their properties",mins:12,h:`
<p>A <strong>quadrilateral</strong> has four sides, and its angles always add to <b>360°</b> (it splits into two triangles).</p>
${FIG2.quads()}
<table class="tbl" style="width:100%"><tr><td><b>Shape</b></td><td><b>Sides</b></td><td><b>Angles</b></td><td><b>Diagonals</b></td></tr>
<tr><td>Parallelogram</td><td>opposite sides parallel & equal</td><td>opposite equal; neighbours add to 180°</td><td>bisect each other</td></tr>
<tr><td>Rectangle</td><td>opposite equal</td><td>all 90°</td><td>equal length</td></tr>
<tr><td>Rhombus</td><td>all 4 equal</td><td>opposite equal</td><td>perpendicular</td></tr>
<tr><td>Square</td><td>all 4 equal</td><td>all 90°</td><td>equal & perpendicular</td></tr>
<tr><td>Trapezoid</td><td>exactly one pair parallel</td><td>co-interior pairs add to 180°</td><td>—</td></tr>
<tr><td>Kite</td><td>two pairs of equal adjacent sides</td><td>one pair equal</td><td>perpendicular</td></tr></table>
<div class="tip"><b>Family tree:</b> every square is a rectangle AND a rhombus; every rectangle and rhombus is a parallelogram. So a fact about parallelograms is true for squares too.</div>
<div class="eg"><div class="lab">EXAMPLE</div>In a parallelogram one angle is 72°. Its neighbour is 180 − 72 = 108°; the other two are 72° and 108°.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A rhombus has diagonals 10 and 24. They cross at right angles and cut each other in half → right triangle with legs 5 and 12 → each side is <strong>13</strong>.</div>
${QC("Three angles of a quadrilateral are 80°, 95° and 110°. The fourth?","75","360 − 285.")}
`},
{id:"l5",t:"Perimeter & area of every flat shape",mins:13,h:`
<p><b>Perimeter</b> is the distance around a shape (a fence). <b>Area</b> is the space inside (a carpet), measured in square units.</p>
<div class="fbox">rectangle:     P = 2(l + w)      A = l · w
square:        P = 4s            A = s²
triangle:      P = a + b + c     A = ½ b h
parallelogram: A = b · h          (h perpendicular to b)
trapezoid:     A = ½ (b₁ + b₂) h
circle:        C = 2πr           A = πr²</div>
<h3>Composite shapes: add the pieces</h3>
<div class="eg"><div class="lab">EXAMPLE</div>An L-shaped room: a 10 × 4 rectangle joined to a 6 × 3 rectangle. Area = 40 + 18 = <strong>58 m²</strong>.</div>
<h3>Shaded regions: big minus small</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A square of side 10 with a circle of radius 5 inside. Shaded corners = 100 − 25π ≈ <strong>21.5</strong>.</div>
${FIG.circ({r:"5",label:"square 10 × 10 around a circle of radius 5"})}
<div class="eg"><div class="lab">EXAMPLE — trapezoid</div>Parallel sides 8 and 14, height 5: A = ½(8 + 14)(5) = <strong>55</strong>.</div>
<div class="trap"><b>Units trap:</b> doubling every side of a shape multiplies its area by 4, not 2. Area grows with the square of the scale.</div>
${QC("A rectangle has perimeter 30 and length 9. Its area?","54","2(9 + w) = 30 → w = 6.")}
${QC("A trapezoid has bases 6 and 10 and height 7. Area?","56","½ · 16 · 7.")}
`},
{id:"l6",t:"3D solids: faces, edges, vertices, volume & surface",mins:12,h:`
<p>Solids have <b>faces</b> (flat surfaces), <b>edges</b> (where faces meet) and <b>vertices</b> (corners). For any solid with flat faces: <b>V − E + F = 2</b> (Euler's formula).</p>
<table class="tbl" style="width:100%"><tr><td><b>Solid</b></td><td>Faces</td><td>Edges</td><td>Vertices</td></tr><tr><td>Cube</td><td>6</td><td>12</td><td>8</td></tr><tr><td>Triangular prism</td><td>5</td><td>9</td><td>6</td></tr><tr><td>Square pyramid</td><td>5</td><td>8</td><td>5</td></tr></table>
${FIG2.solids({cap:"Pointed solids (pyramid, cone) hold exactly one third of the matching prism or cylinder."})}
<div class="fbox">prism / cylinder:  V = base area × height
pyramid / cone:    V = ⅓ × base area × height
sphere:            V = (4/3)πr³      surface = 4πr²
box surface:       2(lw + lh + wh)</div>
<div class="eg"><div class="lab">EXAMPLE</div>A cone with radius 3 and height 8: V = ⅓ · π · 9 · 8 = <strong>24π</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A square pyramid with base side 6 and height 10: V = ⅓ · 36 · 10 = <strong>120</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A sphere of radius 3: V = (4/3)π · 27 = <strong>36π</strong>.</div>
${QC("Volume of a cone with r = 6 and h = 5, as a multiple of π?","60","⅓ · 36 · 5 = 60.")}
`},
{id:"l7",t:"Shapes on the coordinate grid",mins:11,h:`
<p>The SAT loves putting shapes on the coordinate plane. Three tools do all the work: <b>distance</b> (side lengths), <b>slope</b> (parallel & perpendicular sides) and <b>midpoint</b>.</p>
${FIG.plane({r:7,pts:[[0,0,"A(0, 0)"],[6,0,"B(6, 0)"],[2,5,"C(2, 5)"]],lines:[],cap:"Triangle ABC: base AB lies on the x-axis, height = y of C."})}
<div class="eg"><div class="lab">EXAMPLE — area of a triangle on the grid</div>A(0, 0), B(6, 0), C(2, 5). Base AB = 6 (along the x-axis). Height = vertical distance from C to the axis = 5. Area = ½ · 6 · 5 = <strong>15</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — is it a right angle?</div>P(1, 1), Q(4, 3), R(2, 6). Slope PQ = 2/3, slope QR = 3/(−2) = −3/2. Product = −1 → perpendicular → the angle at Q is 90°.</div>
<div class="eg"><div class="lab">EXAMPLE — fourth vertex of a parallelogram</div>A(0, 0), B(5, 0), C(7, 3). In parallelogram ABCD, D = A + (C − B) = (0 + 2, 0 + 3) = <strong>(2, 3)</strong>.</div>
<div class="tip"><b>Box method</b> for any triangle: draw the rectangle around it, then subtract the three right-triangle corners.</div>
${QC("Area of the triangle with vertices (0, 0), (8, 0), (3, 6)?","24","½ · 8 · 6.")}
`}]},"trig");
(function(){var i=UNITS.indexOf(findUnit("geo0")),g=UNITS.splice(i,1)[0];UNITS.splice(UNITS.indexOf(findUnit("geo1")),0,g)})();
more("geo0",[
P("An angle of 90° is called:",["acute","right","obtuse","straight"],1,"Exactly 90°."),
N("Complement of 28°?","62","90 − 28."),
N("Supplement of 64°?","116","180 − 64."),
N("Around a point: 100°, 80°, x and 2x. Find x.","60","180 + 3x = 360."),
N("Exterior angle of a triangle when the far interior angles are 45° and 70°?","115","45 + 70."),
N("Quadrilateral angles 90°, 90°, 100°, x. Find x.","80","360 − 280."),
N("Parallelogram base 9, height 4. Area?","36","b × h."),
N("Circle of radius 3 inside a square of side 6: shaded area = 36 − kπ. k?","9","πr² = 9π."),
N("Square pyramid, base 4, height 9. Volume?","48","⅓ · 16 · 9."),
N("Faces of a triangular prism?","5","2 triangles + 3 rectangles.")
],[
N("Two supplementary angles: one is 30° more than twice the other. The smaller?","50","x + 2x + 30 = 180."),
N("Rhombus with diagonals 16 and 30. Side length?","17","8-15-17."),
N("A rectangle 12 × 5. Its diagonal?","13","5-12-13."),
N("Sphere of radius 6: volume = kπ. k?","288","(4/3)·216."),
N("Triangle (0, 0), (10, 0), (4, 7). Area?","35","½ · 10 · 7."),
P("Which is always true for a rectangle?",["all sides equal","diagonals perpendicular","diagonals equal","exactly one pair of parallel sides"],2,"Rectangle diagonals are equal."),
N("Parallelogram ABCD: A(1, 1), B(6, 1), C(8, 4). x-coordinate of D?","3","D = A + C − B = (3, 4)."),
N("V − E + F for any polyhedron?","2","Euler's formula.")
],[
C("Acute / right / obtuse","< 90° / = 90° / between 90° and 180°."),
C("Complementary / supplementary","Add to 90° / add to 180°."),
C("Vertical angles","Opposite angles at a crossing are equal."),
C("Exterior angle of a triangle","Sum of the two far interior angles."),
C("Quadrilateral angle sum","360°."),
C("Parallelogram area","base × perpendicular height."),
C("Trapezoid area","½(b₁ + b₂)h."),
C("Pyramid / cone volume","⅓ × base area × height."),
C("Sphere volume / surface","(4/3)πr³ / 4πr²."),
C("Euler's formula","V − E + F = 2.")
]);

/* =====================================================================
   EXTRA LESSONS in existing units
   ===================================================================== */
L("nums","l7","Types of numbers & the squares you must know",10,`
<p>Numbers come in families, each one containing the one before it, like nesting dolls.</p>
<ul><li><b>Natural numbers</b>: 1, 2, 3, … (counting numbers).</li>
<li><b>Whole numbers</b>: 0, 1, 2, 3, …</li>
<li><b>Integers</b>: … −2, −1, 0, 1, 2 … (whole numbers and their negatives).</li>
<li><b>Rational numbers</b>: anything that can be written as a fraction of integers: 3/4, −5, 0.25, 0.333… (decimals that end or repeat).</li>
<li><b>Irrational numbers</b>: decimals that never end and never repeat: √2, √3, π. They can't be written as fractions.</li>
<li><b>Real numbers</b>: all of the above together — every point on the number line.</li></ul>
<div class="eg"><div class="lab">EXAMPLE</div>√16 = 4 is rational (an integer, even). √15 is irrational. 0.121212… is rational (it repeats).</div>
<h3>Squares & cubes to know by heart</h3>
<table class="tbl" style="width:100%"><tr><td>1²=1</td><td>2²=4</td><td>3²=9</td><td>4²=16</td><td>5²=25</td><td>6²=36</td><td>7²=49</td><td>8²=64</td></tr>
<tr><td>9²=81</td><td>10²=100</td><td>11²=121</td><td>12²=144</td><td>13²=169</td><td>14²=196</td><td>15²=225</td><td>16²=256</td></tr>
<tr><td>2³=8</td><td>3³=27</td><td>4³=64</td><td>5³=125</td><td>2⁴=16</td><td>2⁵=32</td><td>3⁴=81</td><td>2¹⁰=1024</td></tr></table>
<div class="tip">Knowing these makes square roots, Pythagoras, exponents and factoring dramatically faster.</div>
${QC("What is 13²?","169","13 × 13.")}
${QC("Is √50 rational? Type yes or no.","no","50 is not a perfect square.")}
`);
L("func","l7","Arithmetic & geometric sequences",11,`
<p>A <strong>sequence</strong> is a list of numbers that follows a rule. Two kinds matter, and they are exactly linear and exponential functions in disguise.</p>
<h3>Arithmetic: add the same amount each time</h3>
<div class="fbox">aₙ = a₁ + (n − 1)·d        d = common difference</div>
<div class="eg"><div class="lab">EXAMPLE</div>5, 9, 13, 17, … d = 4. The 20th term: a₂₀ = 5 + 19·4 = <strong>81</strong>.</div>
<h3>Geometric: multiply by the same number each time</h3>
<div class="fbox">aₙ = a₁ · r⁽ⁿ⁻¹⁾        r = common ratio</div>
<div class="eg"><div class="lab">EXAMPLE</div>3, 6, 12, 24, … r = 2. The 8th term: a₈ = 3 · 2⁷ = <strong>384</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — find the rule</div>A sequence has a₁ = 7 and a₄ = 22, arithmetic. 22 = 7 + 3d → d = 5. So aₙ = 7 + 5(n − 1) = 5n + 2.</div>
<div class="trap"><b>Off-by-one trap:</b> it's (n − 1), not n, because the first term has had zero steps added.</div>
${QC("Arithmetic: 12, 9, 6, … What is the 10th term?","-15","12 + 9·(−3).")}
${QC("Geometric: 2, 6, 18, … What is the 6th term?","486","2 · 3⁵.")}
`);
L("data","l8","Weighted averages & combining groups",9,`
<p>When groups of different sizes are combined, you can't just average the averages. Each group's average must be <b>weighted</b> by its size.</p>
<div class="fbox">combined mean = (n₁·m₁ + n₂·m₂) ÷ (n₁ + n₂)</div>
<div class="eg"><div class="lab">EXAMPLE</div>Class A: 20 students, mean 80. Class B: 30 students, mean 70. Combined = (20·80 + 30·70) ÷ 50 = (1600 + 2100) ÷ 50 = <strong>74</strong> — closer to 70 because B is bigger.</div>
<div class="eg"><div class="lab">EXAMPLE — weighted grade</div>Homework counts 20%, tests 50%, final 30%. Scores 90, 80, 70: 0.2·90 + 0.5·80 + 0.3·70 = 18 + 40 + 21 = <strong>79</strong>.</div>
<div class="trap"><b>Trap:</b> (80 + 70)/2 = 75 would only be right if the groups were the same size.</div>
${QC("12 boys average 15 and 8 girls average 20. Combined average?","17","(180 + 160) ÷ 20.")}
`);
more("nums",[P("Which number is irrational?",["0.25","√49","π","−3"],2,"π never ends or repeats.")],[],[C("Rational vs irrational","Rational = fraction of integers (ends or repeats). Irrational = never ends, never repeats (√2, π).")]);
more("func",[N("Arithmetic 4, 11, 18, … 15th term?","102","4 + 14·7."),N("Geometric 5, 10, 20, … 7th term?","320","5 · 2⁶.")],[N("Arithmetic: a₁ = 3, a₅ = 23. Common difference?","5","23 = 3 + 4d.")],[C("Arithmetic sequence","aₙ = a₁ + (n − 1)d."),C("Geometric sequence","aₙ = a₁ · rⁿ⁻¹.")]);
more("data",[N("10 people average 30, 15 people average 40. Combined average?","36","(300 + 600) ÷ 25.")],[],[C("Combined average","(n₁m₁ + n₂m₂) ÷ (n₁ + n₂) — weight by group size.")]);
