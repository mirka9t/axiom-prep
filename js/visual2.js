/* =====================================================================
   AXIOM — VISUAL LESSONS (2)
   ===================================================================== */
VIS("poly","l5",8,`<h3>Picture it: factoring is FOIL backwards</h3>
${PLAIN("To factor x² + bx + c, find two numbers that MULTIPLY to c and ADD to b. They become the two brackets.")}
<table class="tbl vtab"><tr><td colspan="3"><b>x² + 8x + 12: multiply to 12, add to 8</b></td></tr><tr><td>1 × 12</td><td>sum 13</td><td>✗</td></tr><tr><td>2 × 6</td><td>sum 8</td><td>✓</td></tr><tr><td>3 × 4</td><td>sum 7</td><td>✗</td></tr></table>
${MINIS.area.draw([2,6])}
<p class="muted" style="text-align:center">The four boxes of x² + 8x + 12 rebuild the rectangle (x + 2)(x + 6).</p>
${STEP("Factor x² − x − 12","Product −12, sum −1",["The product is negative → one number positive, one negative.","List pairs for 12: (1, 12), (2, 6), (3, 4).","We need a difference of 1 with the bigger one negative: 3 and −4.","Check: 3 × (−4) = −12 ✓ and 3 + (−4) = −1 ✓.","Write the brackets: (x + 3)(x − 4)."],"Answer: <b>(x + 3)(x − 4)</b>")}`,true);
VIS("exp","l4",8,`<h3>Picture it: where fake solutions come from</h3>
${PLAIN("Squaring both sides can create an extra answer that never worked in the original equation. On a graph you can see it: the original curves meet once, but the squared version meets twice.")}
<div class="figrow">${FIG.plane({r:5,fns:[{f:function(x){return x<-2?NaN:Math.sqrt(x+2)}},{f:function(x){return x},c:"red"}],pts:[[2,2,"(2, 2)","vio"]],cap:"√(x + 2) = x: they meet ONLY at x = 2."})}${FIG.plane({r:5,fns:[{f:function(x){return x+2}},{f:function(x){return x*x},c:"red"}],pts:[[2,4,"x = 2","vio"],[-1,1,"x = −1 (fake)","red"]],cap:"After squaring, x + 2 = x² meets twice."})}</div>
${STEP("Solve √(x + 2) = x","Square, solve, CHECK",["Square both sides: x + 2 = x².","Rearrange: x² − x − 2 = 0.","Factor: (x − 2)(x + 1) = 0 → x = 2 or x = −1.","Check x = 2: √4 = 2 ✓.","Check x = −1: √1 = 1, but the right side is −1 ✗ — extraneous."],"Answer: <b>x = 2 only</b>")}`);
VIS("func","l5",8,`<h3>Picture it: a table is a list of points</h3>
${PLAIN("Each row of a function table is a point (x, y). If y changes by the same amount every time x goes up by 1, the points sit on a straight line.")}
<table class="tbl vtab"><tr><td><b>x (weeks)</b></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><td><b>y (savings $)</b></td><td>40</td><td>55</td><td>70</td><td>85</td><td>100</td></tr></table>
${FIG.plane({r:6,pts:[[0,0.8,""],[1,1.1,""],[2,1.4,""],[3,1.7,""],[4,2,""]],lines:[{m:0.3,b:0.8}],cap:"Scaled picture of the table: equal steps up → a straight line, y = 15x + 40."})}
${STEP("Write the rule for the savings table","Find the change, then the start",["Change per row: 55 − 40 = 15, 70 − 55 = 15 … constant → linear.","Slope m = 15 dollars per week.","Starting value (x = 0): b = 40.","Rule: y = 15x + 40.","Check row x = 3: 15·3 + 40 = 85 ✓"],"Answer: <b>y = 15x + 40</b>")}`);
VIS("func","l7",8,`<h3>Picture it: adding vs multiplying patterns</h3>
${PLAIN("An arithmetic sequence ADDS the same number each step (it grows like a line). A geometric sequence MULTIPLIES by the same number (it grows faster and faster).")}
${DOTSEQ([2,5,8,11,14],"Arithmetic: 2, 5, 8, 11, 14 — add 3 each time. nth term = 2 + 3(n − 1).")}
${CHAIN([3,6,12,24,48],["1st","2nd","3rd","4th","5th"],"Geometric: 3, 6, 12, 24, 48 — multiply by 2 each time. nth term = 3 · 2ⁿ⁻¹.")}
${STEP("Find the 20th term of 7, 11, 15, 19, …","Arithmetic or geometric?",["Differences: 11 − 7 = 4, 15 − 11 = 4 → adds 4: arithmetic.","First term a₁ = 7, difference d = 4.","Formula: aₙ = a₁ + (n − 1)d.","a₂₀ = 7 + 19 × 4 = 7 + 76 = 83."],"Answer: <b>83</b>")}`);
VIS("data","l5",8,`<h3>Picture it: finding the right row and column</h3>
${PLAIN("Every question about a two-way table picks a PART and a WHOLE. The word “given” or “of the …” tells you which row or column is the whole.")}
<table class="tbl vtab twt"><tr><td></td><td><b>Plays sport</b></td><td><b>No sport</b></td><td><b>Total</b></td></tr><tr class="hl"><td><b>Grade 9</b></td><td class="hx">36</td><td>24</td><td class="ht">60</td></tr><tr><td><b>Grade 10</b></td><td>28</td><td>52</td><td>80</td></tr><tr><td><b>Total</b></td><td>64</td><td>76</td><td>140</td></tr></table>
${STEP("What fraction of grade 9 students play sport?","“of grade 9” → the whole is the grade 9 row",["The whole: the grade 9 row total = 60 (highlighted).","The part: grade 9 AND plays sport = 36.","Fraction = 36/60 = 3/5 = 60%.","Compare: “what fraction of ALL students are grade 9 sport players?” would be 36/140."],"Answer: <b>3/5 (60%)</b>")}`,true);
VIS("data","l7",8,`<h3>Picture it: reading a box plot</h3>
${PLAIN("A box plot squeezes a whole data set into five numbers. The box holds the middle half of the data; the line inside is the median.")}
${BOXPLOT([12,18,24,30,46],10,50,"Middle half: 18 to 30. Median 24. Range 46 − 12 = 34. IQR 30 − 18 = 12.")}
${FIG.bars([2,5,9,6,3],["10–19","20–29","30–39","40–49","50–59"],{title:"Histogram: test scores",cap:"A histogram counts how many values land in each interval. Total = 25 students; the tallest bar (30–39) is the most common interval."})}
${STEP("Using the box plot: what percent of the data is above 30?","Use the quarters",["The box plot splits the data into four quarters.","Q3 = 30 marks the top 25%.","So about 25% of the values are above 30."],"Answer: <b>about 25%</b>")}`);
VIS("prob","l3",8,`<h3>Picture it: “at least one” = everything except “none”</h3>
${PLAIN("The chance of at least one six is hard to count directly (one six, two sixes, three sixes…). It's much easier to find the chance of NO sixes and subtract from 1.")}
${CHAIN([100,83,69,58],["start","1 roll","2 rolls","3 rolls"],"Chance of NO six, in %: each roll keeps 5/6 of what's left. After 3 rolls: (5/6)³ ≈ 58%.")}
${STEP("Roll a die 3 times. P(at least one six)?","Use the complement",["P(no six on one roll) = 5/6.","P(no six in 3 rolls) = (5/6)³ = 125/216.","P(at least one six) = 1 − 125/216.","= 91/216 ≈ 0.42."],"Answer: <b>91/216 ≈ 42%</b>")}`);
VIS("geo1","l4",8,`<h3>Picture it: same shape, different size</h3>
${PLAIN("Similar triangles have the same angles; every side is multiplied by the same scale factor k. Lengths scale by k, areas by k².")}
${SIMTRI(2,"A 3-4-5 triangle and its double. Every side × 2 (k = 2). Area: 6 → 24, which is × 4 = k².")}
${STEP("Similar triangles have sides 6 and 15 that match. The small one has area 20. Large area?","Find k, then square it",["Scale factor k = 15 ÷ 6 = 2.5.","Areas scale by k² = 2.5² = 6.25.","Large area = 20 × 6.25 = 125."],"Answer: <b>125</b>")}`);
VIS("geo2","l4",8,`<h3>Picture it: the inscribed angle rule</h3>
${PLAIN("An angle with its corner ON the circle is half of the angle at the centre that opens onto the same arc.")}
${INSCRIBED("Blue central angle = 2θ; red inscribed angle = θ. Both open onto arc AB.")}
${STEP("A central angle is 110°. The inscribed angle on the same arc?","Half the central angle",["Both angles open onto the same arc.","Inscribed = central ÷ 2.","110 ÷ 2 = 55°."],"Answer: <b>55°</b>")}
<div class="tip"><b>Also remember:</b> a radius meets a tangent line at 90°, and an inscribed angle that stands on a diameter is always 90°.</div>`);
VIS("geo2","l6",8,`<h3>Picture it: why area scales by k²</h3>
${PLAIN("Double the side of a square and you need 4 copies of the old square to fill it. Triple it and you need 9. Lengths × k, areas × k², volumes × k³.")}
${svgWrap(400,150,(function(){var s="",x=20;[[1,"×1"],[2,"×4"],[3,"×9"]].forEach(function(c,i){var n=c[0],z=32;for(var a=0;a<n;a++)for(var b=0;b<n;b++)s+='<rect x="'+(x+a*z)+'" y="'+(110-(b+1)*z)+'" width="'+(z-2)+'" height="'+(z-2)+'" rx="3" fill="'+["var(--blue)","var(--violet)","var(--grn)"][i]+'" opacity=".8"/>';s+=TX(x+n*z/2,135,"side "+n+": area "+c[1],{fs:12});x+=n*z+40});return s})(),"Side × 2 → area × 4. Side × 3 → area × 9.")}
${STEP("A model car is built at scale 1 : 20. Its paint covers 150 cm². How much paint area on the real car?","Areas scale by the square",["Length scale factor k = 20.","Area factor k² = 400.","Real area = 150 × 400 = 60,000 cm² = 6 m²."],"Answer: <b>60,000 cm² (6 m²)</b>")}`,true);
VIS("data","l8",8,`<h3>Picture it: a weighted average is a balance point</h3>
${PLAIN("When groups have different sizes, the average leans toward the bigger group — like a see-saw balancing closer to the heavier side.")}
${SEESAW(70,20,85,10,"20 students averaged 70, 10 students averaged 85. The balance is at 75 — closer to the bigger group.")}
${STEP("20 students average 70; 10 students average 85. Overall average?","Total ÷ count — never average the averages",["Total of group 1: 20 × 70 = 1,400.","Total of group 2: 10 × 85 = 850.","Combined total: 2,250 for 30 students.","Average = 2,250 ÷ 30 = 75."],"Answer: <b>75</b> (not 77.5)")}`);
VIS("pct","l4",8,`<h3>Picture it: each percent uses a new base</h3>
${PLAIN("After the first change, the second percent is taken of the NEW amount. That's why +20% then −20% doesn't bring you back.")}
${CHAIN([100,120,96],["start","+20%","−20%"],"100 → 120 (+20) → 96 (−24). The 20% decrease is bigger because it's 20% of 120.")}
${STEP("A price rises 25% and then falls 20%. Overall change?","Multiply the multipliers",["+25% → multiplier 1.25.","−20% → multiplier 0.80.","1.25 × 0.80 = 1.00.","The price is back to exactly where it started — a coincidence of these two numbers!"],"Answer: <b>0% overall</b>")}
${MINI("pct",[120,100])}`);

/* ---------------- styles ---------------- */
(function(){var c=`
.stepx{margin:16px 0;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--violet) 7%,var(--paper));border:1px solid color-mix(in srgb,var(--violet) 30%,var(--line))}
.sx-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}.sx-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet))}.sx-badge.lab{background:linear-gradient(135deg,#16a86f,#2dd4bf)}
.sx-p{font-family:var(--mono);font-size:16px;padding:10px 12px;border-radius:12px;background:var(--soft);margin-bottom:10px}
.sx-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}.sx-s{display:none;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:12px;background:var(--paper);border:1px solid var(--line);animation:fadeUp .35s ease both}.sx-s.on{display:flex}
.sx-n{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:13px;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet))}.sx-s u{text-decoration-color:var(--red);text-decoration-thickness:2px;text-underline-offset:3px}
.sx-ans{display:none;margin-top:10px;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--grn) 14%,var(--paper));border:1px solid color-mix(in srgb,var(--grn) 40%,var(--line))}.stepx.done .sx-ans{display:block;animation:fadeUp .35s ease both}
.sx-ctl{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}.sx-done{font-size:13px;color:var(--grn);font-weight:700}
.minilab{display:block;margin:16px 0;padding:16px;border-radius:18px;background:color-mix(in srgb,#2dd4bf 7%,var(--paper));border:1px solid color-mix(in srgb,#2dd4bf 35%,var(--line))}.mini-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}
.mini-s{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:6px}.mini-s label{display:block;font-size:13.5px}.mini-s label span{display:flex;justify-content:space-between}.mini-s input{width:100%;accent-color:#14b8a6}
.mini-r{margin:6px 0 0;padding:10px 12px;border-radius:12px;background:var(--paper);font-size:15px;line-height:1.6}
.plainw{margin:12px 0;padding:12px 14px 12px 16px;border-radius:14px;background:color-mix(in srgb,#e8a21c 10%,var(--paper));border-left:4px solid #e8a21c;font-size:15.5px;line-height:1.65}.plainw b{display:block;font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;color:#c98500;margin-bottom:2px}
.vtab{width:100%;margin:10px 0;text-align:center}.vtab td{padding:8px}.twt tr.hl td{background:color-mix(in srgb,var(--blue) 12%,transparent)}.twt td.hx{background:color-mix(in srgb,var(--violet) 30%,transparent);font-weight:800}.twt td.ht{outline:2px solid var(--blue);font-weight:800}
#printArea .sx-s,#printArea .sx-ans{display:block!important}#printArea .sx-ctl,#printArea .mini-s{display:none!important}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
LPC={};
