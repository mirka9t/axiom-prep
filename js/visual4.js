/* =====================================================================
   AXIOM — VISUAL LESSONS (4)
   ===================================================================== */
function NESTED(cap){var L=[["Real numbers","√2, π, −0.5",360,230,"var(--violet)"],["Rational","1/2, −3.75, 0.333…",290,175,"var(--blue)"],["Integers","−3, 0, 7",220,120,"var(--grn)"],["Whole / natural","0, 1, 2, 3 …",150,68,"#e8a21c"]],s="";
  L.forEach(function(r,i){var x=200-r[2]/2,y=240-r[3]-10;s+='<rect x="'+x+'" y="'+y+'" width="'+r[2]+'" height="'+r[3]+'" rx="18" fill="color-mix(in srgb,'+r[4]+' 14%,transparent)" stroke="'+r[4]+'" stroke-width="2"/>'+TX(200,y+18,r[0],{fs:13,fw:800,c:r[4]})+TX(200,y+34,r[1],{fs:11,c:"var(--ink2)"})});return svgWrap(400,240,s,cap)}
function DOTPLOT(sets,cap){var s="",H=70;sets.forEach(function(d,k){var y0=40+k*H;s+='<line x1="20" y1="'+y0+'" x2="380" y2="'+y0+'" stroke="var(--ink2)"/>';for(var v=0;v<=10;v++)s+=TX(20+v*36,y0+16,v,{fs:10,c:"var(--ink2)",fw:500});var cnt={};d[1].forEach(function(v){cnt[v]=(cnt[v]||0)+1;s+='<circle cx="'+(20+v*36)+'" cy="'+(y0-8-(cnt[v]-1)*12)+'" r="5" fill="'+d[2]+'"/>'});s+=TX(380,y0-40,d[0],{a:"end",fs:12,c:d[2]})});return svgWrap(400,40+sets.length*H,s,cap)}
function GRIDSQ(n,cap){var s="",z=18,side=Math.round(Math.sqrt(n));for(var i=0;i<n;i++)s+='<rect x="'+(20+(i%side)*z)+'" y="'+(20+Math.floor(i/side)*z)+'" width="'+(z-2)+'" height="'+(z-2)+'" rx="3" fill="var(--blue)" opacity=".8"/>';return svgWrap(side*z+40,Math.ceil(n/side)*z+40,s,cap)}

VIS("nums","l7",8,`<h3>Picture it: number families live inside each other</h3>
${PLAIN("Every whole number is an integer, every integer is rational (it can be written as a fraction), and every rational number is real. Irrational numbers like √2 and π are real but can't be written as fractions.")}
${NESTED("Each family sits inside the next. √2 and π are in the outer ring only — real but not rational.")}
<table class="tbl vtab"><tr><td><b>Number</b></td><td><b>Whole</b></td><td><b>Integer</b></td><td><b>Rational</b></td><td><b>Real</b></td></tr><tr><td>5</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>−4</td><td></td><td>✓</td><td>✓</td><td>✓</td></tr><tr><td>2/3</td><td></td><td></td><td>✓</td><td>✓</td></tr><tr><td>√7</td><td></td><td></td><td></td><td>✓</td></tr></table>`,true);
VIS("nums","l5",7,`<h3>Picture it: what a remainder is</h3>
${PLAIN("17 ÷ 5: make as many full groups of 5 as you can. The dots left over are the remainder.")}
${svgWrap(400,110,(function(){var s="";for(var i=0;i<17;i++){var g=Math.floor(i/5),k=i%5,x=g<3?(20+g*110+k*20):(350+(i-15)*22),y=50;s+='<circle cx="'+(x+10)+'" cy="'+y+'" r="8" fill="'+(g<3?"var(--blue)":"var(--red)")+'"/>'}for(var g2=0;g2<3;g2++)s+='<rect x="'+(18+g2*110)+'" y="34" width="102" height="32" rx="12" fill="none" stroke="var(--violet)" stroke-dasharray="4 3"/>';return s+TX(170,96,"3 full groups of 5",{fs:12,c:"var(--violet)"})+TX(372,96,"2 left over",{fs:12,c:"var(--red)"})})(),"17 = 5 × 3 + 2, so 17 ÷ 5 = 3 remainder 2.")}
${STEP("What is the remainder when 100 is divided by 7?","Biggest multiple that fits",["Multiples of 7 near 100: 7 × 14 = 98.","98 ≤ 100 but 7 × 15 = 105 is too big.","Remainder = 100 − 98 = 2."],"Answer: <b>2</b>")}`);
VIS("poly","l4",8,`<h3>Picture it: pulling out the common factor</h3>
${PLAIN("Factoring out the GCF is the distributive law backwards: find what every term shares and write it once outside the bracket.")}
${svgWrap(380,150,'<rect x="80" y="30" width="170" height="70" fill="color-mix(in srgb,var(--blue) 22%,transparent)" stroke="var(--blue)"/><rect x="250" y="30" width="90" height="70" fill="color-mix(in srgb,var(--grn) 22%,transparent)" stroke="var(--grn)"/>'+TX(165,70,"6x²",{fs:16,fw:800})+TX(295,70,"9x",{fs:16,fw:800})+TX(60,70,"3x",{fs:15,c:"var(--violet)",fw:800})+TX(165,22,"2x",{fs:13})+TX(295,22,"3",{fs:13})+TX(210,128,"6x² + 9x = 3x(2x + 3)",{fs:14,fw:800}),"The side 3x is shared by both boxes; the top lengths 2x and 3 go inside the bracket.")}
${STEP("Factor 12x³ − 8x² + 4x","GCF of every term",["Numbers 12, 8, 4 → GCF 4.","Letters x³, x², x → smallest power: x.","GCF = 4x.","Divide each term by 4x: 3x², −2x, +1.","Write it: 4x(3x² − 2x + 1). Check by expanding ✓"],"Answer: <b>4x(3x² − 2x + 1)</b>")}`,true);
VIS("poly","l6",8,`<h3>Picture it: the AC method, step by step</h3>
${PLAIN("When the x² has a number in front, multiply a × c, find two numbers for that product that add to b, split the middle term, and factor in pairs.")}
${STEP("Factor 2x² + 7x + 3","a = 2, b = 7, c = 3",["a × c = 2 × 3 = 6. Find two numbers: product 6, sum 7 → 1 and 6.","Split the middle: 2x² + 1x + 6x + 3.","Group in pairs: (2x² + x) + (6x + 3).","Factor each pair: x(2x + 1) + 3(2x + 1).","Common bracket: (2x + 1)(x + 3)."],"Answer: <b>(2x + 1)(x + 3)</b>")}
${MINIS.area.draw([1,6])}
<p class="muted" style="text-align:center">The area-model idea still works: split into boxes that share a side.</p>`);
VIS("poly","l8",8,`<h3>Picture it: division leaves a remainder</h3>
${PLAIN("Dividing polynomials works like dividing numbers: 17 ÷ 5 = 3 remainder 2 means 17 = 5·3 + 2. In the same way p(x) = (divisor)(quotient) + remainder.")}
${STEP("Divide x² + 5x + 9 by x + 2","Long division, one term at a time",["x² ÷ x = x. Multiply: x(x + 2) = x² + 2x.","Subtract: (x² + 5x) − (x² + 2x) = 3x. Bring down +9: 3x + 9.","3x ÷ x = 3. Multiply: 3(x + 2) = 3x + 6.","Subtract: (3x + 9) − (3x + 6) = 3. That's the remainder.","So x² + 5x + 9 = (x + 2)(x + 3) + 3."],"Answer: <b>x + 3, remainder 3</b>")}
<div class="tip"><b>Remainder theorem shortcut:</b> the remainder when p(x) is divided by (x − a) is p(a). Here a = −2: 4 − 10 + 9 = 3 ✓</div>`);
VIS("quad","l5",7,`<h3>Picture it: factors ↔ zeros</h3>
${PLAIN("Each factor (x − a) makes the graph touch the x-axis at x = a. Read the factors and you can sketch the graph; read the zeros and you can write the factors.")}
${FIG.plane({r:6,fns:[{f:function(x){return 0.25*(x+3)*(x-1)*(x-4)}}],pts:[[-3,0,"−3"],[1,0,"1"],[4,0,"4"]],cap:"y = ¼(x + 3)(x − 1)(x − 4): zeros at −3, 1 and 4."})}
${STEP("A polynomial has zeros −2 and 5 (and leading coefficient 1). Write it.","Zero a → factor (x − a)",["Zero −2 → factor (x − (−2)) = (x + 2).","Zero 5 → factor (x − 5).","Multiply: (x + 2)(x − 5) = x² − 3x − 10."],"Answer: <b>x² − 3x − 10</b>")}`);
VIS("pct","l6",7,`<h3>Picture it: discount, then tax</h3>
${PLAIN("Real prices change in steps: first the discount, then tax on the discounted price. Each step multiplies.")}
${CHAIN([80,60,64.8],["price","25% off","+8% tax"],"$80 × 0.75 = $60, then $60 × 1.08 = $64.80.")}
${STEP("A $120 jacket is 30% off, then 6% tax is added. Final price?","Multiply step by step",["30% off → pay 70%: 120 × 0.70 = $84.","6% tax → 84 × 1.06 = $89.04.","One line: 120 × 0.70 × 1.06 = $89.04."],"Answer: <b>$89.04</b>")}`);
VIS("data","l10",7,`<h3>Picture it: same mean, different spread</h3>
${PLAIN("Two classes can have the same average but very different spreads. A smaller standard deviation means the values huddle close to the mean.")}
${DOTPLOT([["Class A: tight",[4,5,5,5,6,4,6,5],"var(--blue)"],["Class B: spread out",[1,9,2,8,5,3,7,5],"var(--red)"]],"Both have mean 5. Class B's dots sit farther from 5, so its standard deviation is larger.")}`);
VIS("exp","l7",7,`<h3>Picture it: √48 hides a perfect square</h3>
${PLAIN("√48 = √(16 × 3). The 16 is a perfect square — a 4 × 4 block — so it comes out as 4, and the 3 stays inside: 4√3.")}
${GRIDSQ(16,"16 squares make a 4 × 4 square: √16 = 4. That's the part of 48 = 16 × 3 that “comes out”.")}
${STEP("Simplify √72","Largest perfect-square factor",["Perfect squares dividing 72: 4, 9, 36.","Largest is 36: 72 = 36 × 2.","√72 = √36 × √2 = 6√2."],"Answer: <b>6√2</b>")}`);
VIS("wp","l2",7,`<h3>Picture it: one phrase at a time</h3>
${PLAIN("Read the sentence in chunks and replace each chunk with its symbol. The order of “less than” is the classic trap: “3 less than x” is x − 3.")}
${STEP("“The sum of a number and 8 is twice the number decreased by 5.”","Translate chunk by chunk",["“the sum of a number and 8” → x + 8.","“is” → =.","“twice the number decreased by 5” → 2x − 5.","Equation: x + 8 = 2x − 5 → 13 = x.","Check: 13 + 8 = 21 and 2·13 − 5 = 21 ✓"],"Answer: <b>x = 13</b>")}`,true);
VIS("meas","l2",6,`<h3>Picture it: the US volume ladder</h3>
${CHAIN([1,4,8,16],["gallon","quarts","pints","cups"],"1 gallon = 4 quarts = 8 pints = 16 cups. Gallon → quart × 4; then each step down × 2.")}
${PLAIN("When the units aren't powers of 10, write the conversion as a fraction and let the units cancel.")}`);
VIS("model","l2",7,`<h3>Picture it: two points make a line</h3>
${PLAIN("Two data points are enough to build a linear model: the slope is rise over run between them, then extend the line back to x = 0 to find the starting value.")}
${FIG.plane({r:6,lines:[{m:0.5,b:1}],pts:[[2,2,"(2, 2)"],[6,4,"(6, 4)"],[0,1,"start (0, 1)","grn"]],slope:[2,2,6,4],cap:"Rise 2 over run 4 → slope 1/2; back to x = 0 gives 1. Model: y = ½x + 1."})}`);
LPC={};
