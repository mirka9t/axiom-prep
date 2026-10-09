/* =====================================================================
   ZERO TO 800 — DEEP LESSONS (1)
   nums · frac · ratio · alg (equations) · ineq · lines
   ===================================================================== */

/* ---------------- NUMBERS ---------------- */
L("nums","l8","Opposite numbers & absolute value",12,`
<p>Every number except 0 has a “mirror twin” on the other side of zero. These twins are called <strong>opposite numbers</strong>. They are exactly the same distance from 0, just on opposite sides.</p>
${FIG.numline(-6,6,{marks:[{v:-4,label:"−4",c:"red"},{v:4,label:"4",c:"blue"}],jumps:[{from:0,to:4,label:"4 steps",c:"grn"},{from:0,to:-4,label:"4 steps",c:"grn"}],cap:"4 and −4 are opposites: both are 4 steps from zero."})}
<h3>How to write “the opposite”</h3>
<p>A minus sign in front of a number means “the opposite of”. So −7 is the opposite of 7, and −(−7) means “the opposite of −7”, which is <strong>7</strong>.</p>
<div class="fbox">opposite of a = −a        −(−a) = a        a + (−a) = 0</div>
<ul><li>The opposite of 9 is −9.</li><li>The opposite of −2.5 is 2.5.</li><li>The opposite of 0 is 0 (zero is its own twin).</li></ul>
<div class="tip"><b>Opposites always add to zero.</b> 8 + (−8) = 0. This is why subtracting is the same as adding the opposite: 10 − 3 = 10 + (−3).</div>
<h3>Absolute value: distance from zero</h3>
<p>The <strong>absolute value</strong> of a number, written with two bars |a|, is how far it is from 0. Distance is never negative, so the absolute value is always 0 or positive.</p>
<div class="fbox">|5| = 5        |−5| = 5        |0| = 0        opposites have the SAME absolute value</div>
<div class="eg"><div class="lab">EXAMPLE</div>Compute |−12| − |4| + −(−3). Step by step: |−12| = 12, |4| = 4, −(−3) = 3. So 12 − 4 + 3 = <strong>11</strong>.</div>
<h3>Comparing negative numbers</h3>
<p>On the number line, numbers get bigger as you go right. So for negatives, the one <em>closer</em> to zero is bigger.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Which is bigger, −3 or −8? −3 is to the right (closer to zero), so <strong>−3 &gt; −8</strong>. Think of temperature: −3° is warmer than −8°.</div>
<div class="eg"><div class="lab">EXAMPLE</div>Order from smallest to largest: 2, −5, 0, −1, |−6|. Since |−6| = 6: <strong>−5, −1, 0, 2, 6</strong>.</div>
<div class="trap"><b>Trap.</b> Bigger absolute value does NOT mean bigger number. |−10| = 10 is large, but −10 itself is smaller than −1.</div>
<h3>Where opposites appear in real life</h3>
<p>Up 30 metres and down 30 metres. A deposit of $50 and a withdrawal of $50. 15° above zero and 15° below. Any time two things “cancel out”, you're looking at opposites.</p>
${NOTE("when a problem gets confusing with many minus signs, rewrite every “−(−a)” as “+a” first. Then there is only one kind of sign left to think about.")}
${QC("What is the opposite of −13?","13","The opposite flips the sign: −(−13) = 13.")}
${QC("Compute |−9| + (−9).","0","|−9| = 9, and 9 + (−9) = 0.")}
${QC("Which is larger: −0.5 or −5? Type the number.","-0.5","−0.5 is closer to zero, so it is larger.")}
`);
L("nums","l9","Comparing & ordering any numbers",10,`
<p>The SAT often hides a simple question: “which value is greatest?” among integers, decimals, fractions and percents. Here is a method that always works.</p>
<h3>Step 1: put everything in the same form</h3>
<p>The easiest common form is a <b>decimal</b>. Use your calculator for fractions.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Order 3/5, 0.58, 62%, 5/8. As decimals: 0.6, 0.58, 0.62, 0.625. Smallest to largest: <strong>0.58, 3/5, 62%, 5/8</strong>.</div>
<h3>Step 2: compare decimals digit by digit</h3>
<p>Line up the decimal points. Compare the first digit that is different. Add zeros at the end if it helps: 0.7 = 0.70.</p>
<div class="eg"><div class="lab">EXAMPLE</div>0.405 vs 0.45 → 0.405 vs 0.450. The tenths match (4); the hundredths are 0 vs 5 → <strong>0.45 is bigger</strong>.</div>
<div class="trap"><b>Trap:</b> more digits is not bigger. 0.1234 &lt; 0.2.</div>
<h3>Comparing fractions without a calculator</h3>
<ul><li><b>Same denominator:</b> bigger top wins. 5/9 &gt; 4/9.</li><li><b>Same numerator:</b> smaller bottom wins (bigger pieces). 3/5 &gt; 3/8.</li><li><b>Otherwise cross-multiply:</b> 4/7 vs 5/9 → 4·9 = 36 vs 7·5 = 35 → 4/7 is bigger.</li></ul>
<h3>Mixing negatives in</h3>
<p>Do positives and negatives separately: every negative is smaller than every positive. Among negatives, flip your thinking: −0.2 &gt; −0.25.</p>
${FIG.numline(-1,1,{step:0.25,marks:[{v:-0.75,label:"−3/4",c:"red"},{v:-0.2,label:"−0.2",c:"red"},{v:0.4,label:"40%",c:"blue"},{v:0.625,label:"5/8",c:"blue"}],cap:"Placing numbers on a line makes their order obvious."})}
${QC("Which is greatest: 0.3, 2/7, 31%? Type it exactly as written.","31%","0.3, 0.2857…, 0.31 → 31% is greatest.")}
${QC("Is 5/12 greater than 0.4? Type yes or no.","yes","5/12 ≈ 0.4167.")}
`);
L("nums","l10","Decimals: add, subtract, multiply, divide & round",12,`
<p>Decimals are just fractions with 10, 100, 1000… on the bottom. Each place to the right of the point is ten times smaller: tenths, hundredths, thousandths.</p>
<div class="fbox">3 . 4 7 5   →   3 ones, 4 tenths, 7 hundredths, 5 thousandths</div>
<h3>Adding and subtracting: line up the points</h3>
<div class="eg"><div class="lab">EXAMPLE</div>12.5 + 3.75: write 12.50 + 3.75 with the points under each other → <strong>16.25</strong>.<br>8 − 2.36: write 8.00 − 2.36 → <strong>5.64</strong>.</div>
<h3>Multiplying: ignore the points, then count</h3>
<ol><li>Multiply as if there were no decimal points.</li><li>Count the total digits after the points in both numbers.</li><li>Put that many digits after the point in the answer.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>0.6 × 0.04: 6 × 4 = 24. Total decimal digits: 1 + 2 = 3 → <strong>0.024</strong>.</div>
<h3>Dividing: make the divisor a whole number</h3>
<p>Move the point in the divisor until it's a whole number, and move the point in the other number the same number of places.</p>
<div class="eg"><div class="lab">EXAMPLE</div>7.2 ÷ 0.3 → 72 ÷ 3 = <strong>24</strong>. (Both points moved one place right.)</div>
<h3>Rounding</h3>
<p>Look at the digit just after the place you're rounding to: 5 or more → round up; 4 or less → round down.</p>
<div class="eg"><div class="lab">EXAMPLE</div>3.14159 to the nearest hundredth: the hundredths digit is 4, next digit is 1 → <strong>3.14</strong>. To the nearest tenth: 3.1. To the nearest thousandth: 3.142.</div>
<div class="tip"><b>On the SAT</b> grid-in, if a decimal answer is long, enter as many digits as fit — don't round early in the middle of a calculation, only at the end.</div>
${QC("Compute 0.25 × 0.8.","0.2","25 × 8 = 200, three decimal places → 0.200.")}
${QC("Compute 4.5 ÷ 0.09.","50","450 ÷ 9 = 50.")}
${QC("Round 12.6849 to the nearest hundredth.","12.68","The next digit is 4 → round down.")}
`);
more("nums",[
N("What is −(−(−6))?","-6","Two flips cancel, one remains: −6."),
N("Compute |−7| − |3| − |−2|.","2","7 − 3 − 2."),
P("Which is the smallest?",["−2.5","−2.05","−2","−2.55"],3,"−2.55 is furthest left."),
N("Compute 3.6 + 0.48.","4.08","Line up the points."),
N("Compute 1.2 × 0.05.","0.06","12 × 5 = 60, three places."),
N("Compute 9.6 ÷ 1.2.","8","96 ÷ 12."),
P("Order 0.7, 2/3, 69%: which is largest?",["0.7","2/3","69%","all equal"],0,"0.7 > 0.69 > 0.667.")
],[
N("The sum of a number and its opposite?","0","a + (−a) = 0."),
N("Round 0.4567 to the nearest tenth.","0.5","Next digit 5 → round up."),
P("Which is true?",["−8 > −3","|−8| < |−3|","−3 > −8","−3 < −8"],2,"−3 is to the right of −8.")
],[
C("Opposite numbers","Same distance from 0, opposite sides: 5 and −5. They add to 0."),
C("−(−a) = ?","a. The opposite of the opposite is the number itself."),
C("Comparing negatives","Closer to zero = bigger. −2 > −9."),
C("Multiply decimals","Multiply without points, then count total decimal places."),
C("Divide by a decimal","Move both points until the divisor is whole.")
]);

/* ---------------- FRACTIONS ---------------- */
L("frac","l0","Fractions from zero: what a fraction really is",12,`
<p>Let's start from the very beginning. A <strong>fraction</strong> describes part of a whole that has been cut into <em>equal</em> pieces.</p>
${'<div class="figrow">'+FIG.pizza(5,2,{cap:"2/5: cut into 5 equal pieces, take 2"})+FIG.pizza(8,8,{cap:"8/8 = 1 whole"})+'</div>'}
<div class="fbox">numerator (top)     → how many pieces we take
denominator (bottom) → how many equal pieces make one whole</div>
<h3>Fractions are numbers on the number line</h3>
<p>To place 3/4: split the gap from 0 to 1 into 4 equal steps, then walk 3 of them.</p>
${FIG.numline(0,2,{step:0.25,marks:[{v:0.75,label:"3/4",c:"blue"},{v:1.25,label:"5/4",c:"red"}],cap:"3/4 is less than 1; 5/4 is more than 1."})}
<h3>Three kinds of fractions</h3>
<ul><li><b>Proper:</b> top smaller than bottom, value less than 1 (3/4).</li><li><b>Improper:</b> top bigger than or equal to the bottom, value 1 or more (5/4, 8/8).</li><li><b>Mixed number:</b> a whole number plus a proper fraction (1¼ = 5/4).</li></ul>
<h3>Special fractions to recognise</h3>
<ul><li>Any number over itself is 1: 7/7 = 1.</li><li>Any number over 1 is itself: 9/1 = 9.</li><li>0 over any number is 0: 0/5 = 0.</li><li><b>Never divide by zero:</b> 5/0 is undefined.</li></ul>
<h3>Equivalent fractions</h3>
<p>Cutting the same pizza into more slices doesn't change how much you have. Multiply or divide top AND bottom by the same number: 1/2 = 2/4 = 3/6 = 50/100.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Fill in the blank: 3/4 = ?/20. The bottom was multiplied by 5, so the top is too: 3 × 5 = <strong>15</strong>.</div>
${NOTE("every fraction skill — adding, comparing, simplifying — comes from one idea: you may multiply or divide top and bottom by the same number without changing the value.")}
${QC("2/3 = ?/12. Find the missing number.","8","Bottom × 4, so top × 4.")}
${QC("Is 9/7 proper or improper? Type the word.","improper","The top is bigger than the bottom.")}
`);
L("frac","l7","Adding & subtracting fractions and mixed numbers",14,`
<p>You can only add pieces of the <strong>same size</strong>. That's the whole secret behind the common denominator.</p>
<h3>Case 1: same denominators</h3>
<p>Add or subtract the tops; keep the bottom.</p>
<div class="eg"><div class="lab">EXAMPLE</div>2/9 + 5/9 = <strong>7/9</strong>. 7/8 − 3/8 = 4/8 = <strong>1/2</strong>.</div>
<h3>Case 2: different denominators</h3>
<ol><li>Find the least common denominator (the LCM of the bottoms).</li><li>Rewrite each fraction with that denominator.</li><li>Add or subtract the tops.</li><li>Simplify.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>5/6 + 3/4. LCM(6, 4) = 12. 5/6 = 10/12, 3/4 = 9/12. Sum = 19/12 = <strong>1 7/12</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>7/10 − 2/15. LCM(10, 15) = 30. 21/30 − 4/30 = <strong>17/30</strong>.</div>
<h3>Case 3: mixed numbers — two methods</h3>
<p><b>Method A (always works):</b> change to improper fractions first.</p>
<div class="eg"><div class="lab">EXAMPLE</div>2 1/3 + 1 3/4 = 7/3 + 7/4 = 28/12 + 21/12 = 49/12 = <strong>4 1/12</strong>.</div>
<p><b>Method B:</b> add wholes and fractions separately — but watch for borrowing when subtracting.</p>
<div class="eg"><div class="lab">EXAMPLE — borrowing</div>5 1/4 − 2 3/4. You can't take 3/4 from 1/4, so borrow 1 whole from the 5: 5 1/4 = 4 5/4. Now 4 5/4 − 2 3/4 = <strong>2 2/4 = 2 1/2</strong>.</div>
<div class="trap"><b>Never add the bottoms.</b> 1/2 + 1/3 ≠ 2/5. Check with sense: 1/2 alone is already bigger than 2/5!</div>
${QC("Compute 3/8 + 1/6 (as a fraction).","13/24","LCD 24: 9/24 + 4/24.")}
${QC("Compute 4 1/5 − 1 3/5 as an improper fraction.","13/5","21/5 − 8/5 = 13/5 (= 2 3/5).")}
`);
L("frac","l8","Multiplying & dividing fractions and mixed numbers",13,`
<p>Good news: multiplying and dividing fractions is <em>easier</em> than adding — no common denominator needed.</p>
<h3>Multiplying: straight across</h3>
<div class="fbox">a/b × c/d = (a × c)/(b × d)</div>
<div class="eg"><div class="lab">EXAMPLE</div>2/3 × 5/7 = 10/21.</div>
<h3>Cancel before you multiply (cross-simplify)</h3>
<p>If any top and any bottom share a factor, divide them first. The numbers stay small.</p>
<div class="eg"><div class="lab">EXAMPLE</div>4/9 × 15/8: 4 and 8 share 4 → 1 and 2. 15 and 9 share 3 → 5 and 3. Now 1/3 × 5/2 = <strong>5/6</strong>.</div>
<h3>“Of” means multiply</h3>
<div class="eg"><div class="lab">EXAMPLE</div>3/4 of 48 = 3/4 × 48 = 36. (Divide 48 into 4 parts = 12; take 3 parts = 36.)</div>
<h3>Dividing: keep, change, flip</h3>
<p>Keep the first fraction, change ÷ to ×, flip the second fraction.</p>
<div class="fbox">a/b ÷ c/d = a/b × d/c</div>
<div class="eg"><div class="lab">EXAMPLE</div>3/5 ÷ 9/10 = 3/5 × 10/9 = 30/45 = <strong>2/3</strong>.</div>
<p><b>Why does flipping work?</b> Dividing asks “how many of these fit?”. How many halves fit in 3? Six — and 3 × 2/1 = 6. Dividing by 1/2 is the same as multiplying by 2.</p>
<h3>Mixed numbers: convert first</h3>
<div class="eg"><div class="lab">EXAMPLE</div>2 1/2 × 1 1/3 = 5/2 × 4/3 = 20/6 = <strong>10/3 = 3 1/3</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>3 3/4 ÷ 1 1/4 = 15/4 ÷ 5/4 = 15/4 × 4/5 = <strong>3</strong>.</div>
<div class="trap"><b>Trap:</b> 2 1/2 × 1 1/2 is NOT (2 × 1) + (1/2 × 1/2) = 2 1/4. Convert first: 5/2 × 3/2 = 15/4 = 3 3/4. Always change mixed numbers to improper fractions before multiplying or dividing.</div>
${QC("Compute 5/6 × 9/10 (as a fraction).","3/4","Cancel: 45/60 = 3/4.")}
${QC("Compute 2/3 ÷ 4/9 (as a fraction).","3/2","2/3 × 9/4 = 18/12.")}
${QC("How many 1/4-cup servings are in 3 cups?","12","3 ÷ 1/4 = 3 × 4.")}
`);
L("frac","l9","Fraction word problems",12,`
<p>Fraction stories follow a few patterns. Spot the pattern and the story becomes one line of math.</p>
<h3>Pattern 1: a fraction of an amount</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A class of 32 students; 3/8 walk to school. How many? 3/8 × 32 = <strong>12</strong>.</div>
<h3>Pattern 2: what's left over</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Ali spends 2/5 of his $60 on a book. How much is left? Spent 2/5 × 60 = 24, left 36. Faster: he keeps 3/5, and 3/5 × 60 = <strong>$36</strong>.</div>
<h3>Pattern 3: a fraction of what's left</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Of $120, Sara spends 1/3 on rent, then 1/4 of the <em>remaining</em> money on food. After rent: 2/3 × 120 = 80. Food: 1/4 × 80 = 20. Left: <strong>$60</strong>.</div>
<div class="trap"><b>Read “of the remaining” carefully</b> — the second fraction is taken from what's left, not from the original total.</div>
<h3>Pattern 4: find the whole from a part</h3>
<div class="eg"><div class="lab">EXAMPLE</div>3/5 of a number is 24. What's the number? 3/5 × n = 24 → n = 24 ÷ 3/5 = 24 × 5/3 = <strong>40</strong>. Quick way: 3 parts = 24, so 1 part = 8, and 5 parts = 40.</div>
<h3>Pattern 5: comparing parts</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A tank is 3/4 full and holds 60 litres when full. After using 1/3 of a full tank, how full is it? 3/4 − 1/3 = 9/12 − 4/12 = 5/12 of 60 = <strong>25 litres</strong>.</div>
${NOTE("draw a bar split into equal boxes for the denominator. Shade what's used. Students who draw the bar almost never get these wrong.")}
${QC("2/7 of a number is 18. What is the number?","63","1 part = 9, 7 parts = 63.")}
${QC("A $90 budget: 1/3 on travel, then 1/2 of what remains on food. Dollars left?","30","After travel 60; food 30; left 30.")}
`);
more("frac",[
N("Compute 5/8 + 1/12 (fraction).","17/24","LCD 24: 15/24 + 2/24."),
N("Compute 3 1/2 + 2 2/3 as an improper fraction.","37/6","7/2 + 8/3 = 21/6 + 16/6."),
N("Compute 6 1/3 − 2 2/3 as an improper fraction.","11/3","19/3 − 8/3."),
N("Compute 7/12 × 18/35 (fraction).","3/10","Cancel then multiply."),
N("Compute 1 1/2 ÷ 3/4.","2","3/2 × 4/3."),
N("3/4 of 56?","42","56 ÷ 4 × 3."),
N("5/6 of a number is 35. The number?","42","1 part = 7.")
],[
N("Compute 2 3/4 × 1 1/3 as an improper fraction.","11/3","11/4 × 4/3."),
N("A rope 12 m long is cut into pieces 3/4 m long. How many pieces?","16","12 ÷ 3/4."),
N("Of 150 apples, 2/5 are red and 1/3 of the rest are green. How many green?","30","Rest 90; 1/3 of 90."),
P("Which is equivalent to 18/24?",["2/3","3/4","4/5","6/9"],1,"Divide by 6.")
],[
C("Numerator / denominator","Top = pieces taken. Bottom = equal pieces in one whole."),
C("Equivalent fractions","Multiply or divide top AND bottom by the same number."),
C("Subtracting mixed numbers","Borrow 1 whole when the fraction part is too small."),
C("Keep · change · flip","a/b ÷ c/d = a/b × d/c."),
C("Find the whole from a part","part ÷ fraction (e.g. 24 ÷ 3/5 = 40).")
]);

/* ---------------- RATIO ---------------- */
L("ratio","l6","Ratio tables, double number lines & scale drawings",12,`
<p>When ratios stay the same, every row of a table is just a multiple of the first row. That's a <strong>ratio table</strong>.</p>
<table class="tbl" style="width:100%"><tr><td><b>Cups of flour</b></td><td>2</td><td>4</td><td>6</td><td>10</td><td>1</td></tr><tr><td><b>Cookies</b></td><td>24</td><td>48</td><td>72</td><td>120</td><td>12</td></tr></table>
<p>Moving along the table you can multiply, divide, or add columns: the 10-cup column is the 4-cup column plus the 6-cup column (48 + 72 = 120).</p>
<h3>Double number line</h3>
${FIG.numline(0,8,{marks:[{v:2,label:"3 km",c:"blue"},{v:4,label:"6 km",c:"blue"},{v:6,label:"9 km",c:"blue"}],cap:"Top values: kilometres. Bottom values: litres of fuel (2, 4, 6). The ratio 3 km : 2 L never changes."})}
<h3>Scale drawings and maps</h3>
<p>A scale like <b>1 : 50,000</b> means 1 unit on the map is 50,000 of the same units in real life.</p>
<div class="eg"><div class="lab">EXAMPLE</div>On a 1 : 50,000 map two towns are 6 cm apart. Real distance = 6 × 50,000 = 300,000 cm = 3,000 m = <strong>3 km</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A floor plan uses 1 inch = 4 feet. A room is 3.5 in by 2.5 in on paper → 14 ft by 10 ft, area <strong>140 ft²</strong>.</div>
<div class="trap"><b>Area trap.</b> The scale multiplies lengths. Areas multiply by the scale <em>squared</em>: on the plan above the drawing area is 8.75 in², but the real area is 8.75 × 16 = 140 ft².</div>
${QC("A map scale is 1 : 25,000. 8 cm on the map is how many km?","2","8 × 25,000 = 200,000 cm = 2 km.")}
`);
more("ratio",[N("Ratio table: 3 tickets cost $21. Cost of 11 tickets?","77","$7 each."),N("Scale 1 in = 5 ft. A 4.5 in wall is how many feet?","22.5","4.5 × 5.")],[N("Scale 1 : 100. A 6 cm × 4 cm drawing is a real room of how many m²?","24","6 m × 4 m.")],[C("Ratio table","Every column is a multiple of the first; columns can be added."),C("Map scale 1 : n","Real = map × n (same units). Area scales by n².")]);

/* ---------------- EQUATIONS (alg) ---------------- */
L("alg","l0","Equations from zero: one-step equations",12,`
<p>An <strong>equation</strong> says two things are equal: <span class="fx">x + 5 = 12</span>. Solving means finding the value of x that makes it true. Here x must be 7, because 7 + 5 = 12.</p>
${FIG.scale("x + 5","12",{cap:"Picture a balance. To keep it level, whatever you do to one side you must do to the other."})}
<h3>The key idea: undo with the opposite operation</h3>
<table class="tbl" style="width:100%"><tr><td><b>If x is…</b></td><td><b>undo it by…</b></td></tr><tr><td>plus a number</td><td>subtracting it</td></tr><tr><td>minus a number</td><td>adding it</td></tr><tr><td>times a number</td><td>dividing by it</td></tr><tr><td>divided by a number</td><td>multiplying by it</td></tr></table>
<h3>All four one-step types</h3>
<div class="eg"><div class="lab">ADDITION</div>x + 9 = 4 → subtract 9 from both sides → x = 4 − 9 = <strong>−5</strong>. Check: −5 + 9 = 4 ✓</div>
<div class="eg"><div class="lab">SUBTRACTION</div>x − 6 = 11 → add 6 to both sides → x = <strong>17</strong>. Check: 17 − 6 = 11 ✓</div>
<div class="eg"><div class="lab">MULTIPLICATION</div>−4x = 28 → divide both sides by −4 → x = <strong>−7</strong>. Check: −4 × −7 = 28 ✓</div>
<div class="eg"><div class="lab">DIVISION</div>x/5 = −3 → multiply both sides by 5 → x = <strong>−15</strong>. Check: −15 ÷ 5 = −3 ✓</div>
<h3>One-step with a fraction coefficient</h3>
<div class="eg"><div class="lab">EXAMPLE</div>(2/3)x = 10 → multiply both sides by the reciprocal 3/2 → x = 10 × 3/2 = <strong>15</strong>.</div>
<div class="tip"><b>Always check.</b> Put your answer back into the ORIGINAL equation. If both sides match, you're 100% sure. This takes five seconds and catches nearly every mistake.</div>
<div class="trap"><b>Trap:</b> in −x = 8, x is NOT 8. −x means −1·x, so divide by −1: x = −8.</div>
${QC("Solve x − 13 = −4.","9","Add 13 to both sides.")}
${QC("Solve −6x = 42.","-7","Divide both sides by −6.")}
${QC("Solve (3/4)x = 18.","24","Multiply both sides by 4/3.")}
`);
L("alg","l8","Multi-step equations: the complete method",15,`
<p>Every linear equation — no matter how long — can be solved with the same six steps, in this order. Learn the order and you'll never feel lost.</p>
<div class="fbox">1. Clear fractions (multiply EVERY term by the common denominator)
2. Remove brackets (distribute)
3. Combine like terms on each side
4. Move all x-terms to one side
5. Move all numbers to the other side
6. Divide by the coefficient of x — then CHECK</div>
<div class="eg"><div class="lab">EXAMPLE 1 — brackets on both sides</div>Solve 3(x − 4) + 2 = 5(x + 2) − 6.<br>
Step 2: 3x − 12 + 2 = 5x + 10 − 6<br>Step 3: 3x − 10 = 5x + 4<br>Step 4: subtract 3x → −10 = 2x + 4<br>Step 5: subtract 4 → −14 = 2x<br>Step 6: x = <strong>−7</strong>.<br>Check: left 3(−11) + 2 = −31; right 5(−5) − 6 = −31 ✓</div>
<div class="eg"><div class="lab">EXAMPLE 2 — fractions</div>Solve x/2 + (x − 1)/3 = 4.<br>
Step 1: multiply every term by 6: 3x + 2(x − 1) = 24<br>Step 2: 3x + 2x − 2 = 24<br>Step 3: 5x − 2 = 24<br>Steps 5–6: 5x = 26 → x = <strong>26/5 = 5.2</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE 3 — decimals</div>Solve 0.3x + 1.2 = 0.5x − 0.8.<br>Multiply every term by 10: 3x + 12 = 5x − 8 → 20 = 2x → x = <strong>10</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE 4 — a minus before a bracket</div>Solve 7 − (2x − 5) = 3x − 8.<br>7 − 2x + 5 = 3x − 8 → 12 − 2x = 3x − 8 → 20 = 5x → x = <strong>4</strong>.</div>
<div class="tip"><b>Keep x positive:</b> in step 4, move the SMALLER x-term. That way you rarely divide by a negative.</div>
<div class="trap"><b>The two classic slips:</b> forgetting to multiply EVERY term when clearing fractions, and not flipping all the signs inside a bracket that has a minus in front.</div>
${NOTE("write one step per line and change only one thing per line. Students who do three things in one line make three times the mistakes.")}
${QC("Solve 2(3x + 1) − 4 = 4(x + 2).","5","6x − 2 = 4x + 8 → 2x = 10.")}
${QC("Solve (x + 4)/3 = (x − 2)/2.","14","Cross-multiply: 2x + 8 = 3x − 6.")}
`);
L("alg","l9","The map of every equation on the SAT",12,`
<p>The SAT uses about ten kinds of equations. The fastest way to solve any equation is to first <strong>recognise its type</strong>; each type has its own method. Keep this page as your map.</p>
<table class="tbl" style="width:100%">
<tr><td><b>Type</b></td><td><b>How to recognise it</b></td><td><b>Method</b></td></tr>
<tr><td>Linear</td><td>x only to the 1st power: 3x − 5 = 2x + 1</td><td>6-step method (this unit)</td></tr>
<tr><td>Proportion</td><td>fraction = fraction: 3/x = 12/20</td><td>cross-multiply</td></tr>
<tr><td>Literal</td><td>several letters: solve A = lw for w</td><td>same moves, treat other letters as numbers</td></tr>
<tr><td>Absolute value</td><td>|2x − 1| = 7</td><td>split into +7 and −7</td></tr>
<tr><td>Quadratic</td><td>an x² term: x² − 5x + 6 = 0</td><td>set = 0, factor / formula / square roots</td></tr>
<tr><td>Radical</td><td>x under a root: √(x + 3) = 5</td><td>isolate, square, CHECK</td></tr>
<tr><td>Rational</td><td>x in a denominator: 4/(x − 1) = 2</td><td>multiply by the denominator, reject zeros</td></tr>
<tr><td>Exponential</td><td>x in an exponent: 2ˣ = 32</td><td>same base, set exponents equal</td></tr>
<tr><td>Linear system</td><td>two equations, x and y</td><td>substitution / elimination</td></tr>
<tr><td>Nonlinear system</td><td>a line and a parabola</td><td>substitute → quadratic</td></tr></table>
<h3>One quick example of each</h3>
<div class="eg"><div class="lab">PROPORTION</div>3/x = 12/20 → 12x = 60 → x = <strong>5</strong>.</div>
<div class="eg"><div class="lab">ABSOLUTE VALUE</div>|2x − 1| = 7 → 2x − 1 = 7 or −7 → x = <strong>4 or −3</strong>.</div>
<div class="eg"><div class="lab">QUADRATIC</div>x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = <strong>2 or 3</strong>.</div>
<div class="eg"><div class="lab">RADICAL</div>√(x + 3) = 5 → x + 3 = 25 → x = <strong>22</strong> (check ✓).</div>
<div class="eg"><div class="lab">RATIONAL</div>4/(x − 1) = 2 → 4 = 2x − 2 → x = <strong>3</strong> (denominator 2 ≠ 0 ✓).</div>
<div class="eg"><div class="lab">EXPONENTIAL</div>2ˣ = 32 = 2⁵ → x = <strong>5</strong>.</div>
<div class="eg"><div class="lab">SYSTEM</div>x + y = 10, x − y = 4 → add: 2x = 14 → x = 7, y = <strong>3</strong>.</div>
<div class="tip"><b>Universal first move:</b> simplify each side. <b>Universal last move:</b> check the answer in the original equation — especially for radical and rational equations, where fake answers appear.</div>
${QC("Solve |x + 2| = 9. Enter the negative solution.","-11","x + 2 = −9.")}
${QC("Solve 5/x = 15/12.","4","15x = 60.")}
`);
more("alg",[
N("Solve x + 17 = 5.","-12","Subtract 17."),
N("Solve x/4 = −6.","-24","Multiply by 4."),
N("Solve −x = 9.","-9","Divide by −1."),
N("Solve 5(x − 2) = 3(x + 4).","11","5x − 10 = 3x + 12."),
N("Solve x/3 + x/6 = 5.","10","Multiply by 6: 2x + x = 30."),
N("Solve 0.2x − 1 = 0.1x + 2.","30","Multiply by 10: 2x − 10 = x + 20."),
P("What type of equation is √(2x) = 6?",["linear","radical","rational","exponential"],1,"x is under a root.")
],[
N("Solve 4 − 3(x − 2) = x − 6.","4","4 − 3x + 6 = x − 6 → 16 = 4x."),
N("Solve (2x − 1)/5 = (x + 4)/3.","23","6x − 3 = 5x + 20."),
N("Solve 3ˣ = 81.","4","81 = 3⁴."),
P("To solve 6/(x + 2) = 3, the first step is:",["subtract 3","multiply both sides by (x + 2)","square both sides","factor"],1,"Clear the denominator.")
],[
C("Undo operations","+ ↔ −, × ↔ ÷. Do the same to both sides."),
C("6-step method","Clear fractions → distribute → combine → x to one side → numbers to other → divide & check."),
C("Clearing fractions","Multiply EVERY term by the common denominator."),
C("Equation map","Recognise the type first: linear, proportion, absolute, quadratic, radical, rational, exponential, system.")
]);

/* ---------------- INEQUALITIES ---------------- */
L("ineq","l5","Reading & writing inequality graphs and phrases",11,`
<p>An inequality has many solutions, so we draw them on a number line.</p>
<div class="fbox">open circle ○  → the number is NOT included  (&lt; or &gt;)
filled circle ● → the number IS included      (≤ or ≥)
arrow → shows which direction the solutions go</div>
${'<div class="figrow">'+FIG.numline(-3,6,{rays:[{v:2,dir:"right",closed:false,c:"blue"}],cap:"x > 2"})+FIG.numline(-3,6,{rays:[{v:1,dir:"left",closed:true,c:"red"}],cap:"x ≤ 1"})+'</div>'}
${FIG.numline(-4,6,{segs:[{a:-2,b:4,ca:true,cb:false,c:"grn"}],cap:"−2 ≤ x < 4: both ends shown, the left one included, the right one not."})}
<h3>From a graph to an inequality</h3>
<p>Look at the circle (open or filled) and the direction of the arrow. Filled circle at 3 with the arrow pointing left → <b>x ≤ 3</b>.</p>
<h3>Phrase dictionary</h3>
<table class="tbl" style="width:100%"><tr><td>at least 5 / minimum 5 / no less than 5</td><td>x ≥ 5</td></tr><tr><td>at most 5 / maximum 5 / no more than 5</td><td>x ≤ 5</td></tr><tr><td>more than 5 / exceeds 5</td><td>x &gt; 5</td></tr><tr><td>fewer than 5 / below 5</td><td>x &lt; 5</td></tr><tr><td>between 2 and 8 (inclusive)</td><td>2 ≤ x ≤ 8</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE</div>“A ride requires riders to be at least 120 cm tall but less than 200 cm.” → <strong>120 ≤ h &lt; 200</strong>.</div>
<div class="trap"><b>Trap:</b> “no more than” sounds negative but means ≤.</div>
${QC("A graph has a filled circle at −1 and an arrow to the right. Write the inequality using >= or <= (e.g. x>=-1).",["x>=-1","x≥-1"],"Filled = included, arrow right = bigger values.")}
`);
more("ineq",[P("“No fewer than 30 people” means:",["p < 30","p ≤ 30","p ≥ 30","p > 30"],2,"No fewer than = at least.")],[],[C("Open vs filled circle","Open: not included (<, >). Filled: included (≤, ≥).")]);

/* ---------------- LINES ---------------- */
L("lines","l7","Horizontal & vertical lines, and graphing any line",12,`
<h3>Horizontal lines: y = number</h3>
<p>Every point has the same y-value, so the line is flat. Slope = 0. Example: y = 3.</p>
<h3>Vertical lines: x = number</h3>
<p>Every point has the same x-value, so the line goes straight up. Slope is <b>undefined</b> (you'd divide by zero). Example: x = −2.</p>
${FIG.plane({r:5,lines:[{m:0,b:3,c:"blue"}],vlines:[{x:-2,c:"red"}],labels:[[1,3.6,"y = 3 (slope 0)","blue"],[-4.6,-3.5,"x = −2 (undefined)","red"]],cap:"Horizontal: y = k. Vertical: x = k."})}
<div class="tip"><b>Memory trick:</b> “y = 3” lists only y, so y is stuck at 3 → the line runs sideways. “x = −2” → x is stuck → the line runs up and down.</div>
<h3>Three ways to graph any line</h3>
<p><b>Method 1 — slope and intercept</b> (for y = mx + b): plot (0, b), then use rise/run to find the next point.</p>
<div class="eg"><div class="lab">EXAMPLE</div>y = −(2/3)x + 4: start at (0, 4); slope −2/3 means down 2, right 3 → (3, 2). Draw through both.</div>
${FIG.plane({r:6,lines:[{m:-2/3,b:4}],slope:[0,4,3,2],pts:[[0,4,"(0, 4)"],[3,2,"(3, 2)"]],cap:"Start at the intercept, then follow the slope."})}
<p><b>Method 2 — two intercepts</b> (best for Ax + By = C): set x = 0 and y = 0. For 3x + 2y = 12 → (0, 6) and (4, 0).</p>
<p><b>Method 3 — a table of values:</b> choose x = −1, 0, 1, 2, compute y, plot, connect.</p>
${QC("What is the slope of the line x = 7? Type undefined or a number.","undefined","Vertical lines have undefined slope.")}
${QC("Line through (2, 5) and (8, 5). Its equation is y = ?","5","Same y-value → horizontal line y = 5.")}
`);
more("lines",[P("The line y = −4 is:",["vertical","horizontal","slope −4","through the origin"],1,"y = constant → horizontal."),N("Slope of the line through (3, 1) and (3, 9)? Type the x-value of this vertical line.","3","Both x = 3: the line x = 3.")],[],[C("y = k","Horizontal line, slope 0."),C("x = k","Vertical line, slope undefined.")]);
