/* =====================================================================
   AXIOM — VISUAL LESSONS (3)
   ===================================================================== */
function TREE(levels,cap){var s="",x0=200,W=360,yStep=60;var n1=levels[0].length,n2=levels[1].length;
  s+='<circle cx="'+x0+'" cy="20" r="6" fill="var(--ink)"/>';levels[0].forEach(function(a,i){var x1=40+(i+0.5)*W/n1;s+='<line x1="'+x0+'" y1="20" x2="'+x1+'" y2="'+(20+yStep)+'" stroke="var(--blue)" stroke-width="2"/>'+TX(x1,20+yStep+16,a,{fs:12,c:"var(--blue)"});
    levels[1].forEach(function(b,j){var x2=40+(i*n2+j+0.5)*W/(n1*n2);s+='<line x1="'+x1+'" y1="'+(20+yStep+24)+'" x2="'+x2+'" y2="'+(20+2*yStep+10)+'" stroke="var(--violet)" stroke-width="1.6"/>'+TX(x2,20+2*yStep+26,b,{fs:10.5,c:"var(--violet)"})})});
  return svgWrap(440,180,s,cap)}
function STAIRS(cap){var P=["km","hm","dam","m","dm","cm","mm"],s="";P.forEach(function(p,i){var x=20+i*54,y=20+i*18;s+='<rect x="'+x+'" y="'+y+'" width="50" height="'+(140-i*18)+'" rx="6" fill="'+(p==="m"?"var(--violet)":"color-mix(in srgb,var(--blue) "+(30+i*8)+"%,transparent)")+'"/>'+TX(x+25,y+20,p,{fs:13,fw:800,c:p==="m"?"#fff":"var(--ink)"})});
  s+=TX(200,190,"going DOWN the stairs (to smaller units): × 10 per step",{fs:12,c:"var(--grn)"})+TX(200,208,"going UP (to bigger units): ÷ 10 per step",{fs:12,c:"var(--red)"});return svgWrap(400,216,s,cap)}

VIS("quad","l3",6,`<h3>Picture it: move the parabola yourself</h3>
${PLAIN("In vertex form y = a(x − h)² + k, the numbers h and k say WHERE the parabola sits (its vertex), and a says its SHAPE — upside down when a is negative, narrower when a is bigger.")}
${MINI("para",[1,2,-3])}`);
VIS("geo2","l1",6,`<h3>Picture it: slices of a circle</h3>
${PLAIN("A sector is a slice of pizza. Its angle tells you what fraction of the whole circle you have — and you get that same fraction of the circumference (arc) and of the area.")}
${MINI("sector",[90,6])}`);
VIS("lines","l1",5,`<h3>Picture it: change the slope yourself</h3>
${PLAIN("Slope is steepness with a direction. Drag m: positive tilts up to the right, negative tilts down, 0 is flat, and a bigger number is steeper.")}
${MINI("slope",[2,-1])}`);
VIS("func","l6",8,`<h3>Picture it: three forms, one parabola</h3>
${PLAIN("The same parabola can be written three ways. Each form shows one feature for free: standard shows the y-intercept, factored shows the x-intercepts, vertex form shows the vertex.")}
${FIG.plane({r:6,fns:[{f:function(x){return (x-1)*(x-5)/2}}],pts:[[1,0,"zero 1"],[5,0,"zero 5"],[3,-2,"vertex (3, −2)","vio"],[0,2.5,"y-int 2.5","grn"]],cap:"y = ½(x − 1)(x − 5) = ½(x − 3)² − 2 = ½x² − 3x + 2.5"})}
${STEP("Which form shows the minimum of y = x² − 6x + 5 directly?","Rewrite in vertex form",["Half of −6 is −3; (−3)² = 9.","x² − 6x + 5 = (x² − 6x + 9) − 9 + 5.","= (x − 3)² − 4.","Vertex (3, −4): the minimum value is −4 at x = 3.","Factored form (x − 1)(x − 5) would show the zeros 1 and 5 instead."],"Answer: <b>vertex form; minimum −4</b>")}`,true);
VIS("gcf","l7",8,`<h3>Picture it: GCF simplifies in one move</h3>
${PLAIN("To simplify a fraction in one step, divide the top and the bottom by their GREATEST common factor. Factor trees show what they share.")}
<div class="figrow">${FIG2.tree(84,{cap:"84 = 2 × 2 × 3 × 7"})}${FIG2.tree(126,{cap:"126 = 2 × 3 × 3 × 7"})}</div>
${STEP("Simplify 84/126","Find what they share",["84 = 2² × 3 × 7 and 126 = 2 × 3² × 7.","Shared primes, smallest powers: 2 × 3 × 7 = 42 → GCF = 42.","84 ÷ 42 = 2 and 126 ÷ 42 = 3.","So 84/126 = 2/3 — done in one step."],"Answer: <b>2/3</b>")}`);
VIS("nums","l4",6,`<h3>Picture it: a factor tree</h3>
${PLAIN("Keep splitting a number into two factors until every branch ends in a prime. The primes at the ends are the number's “DNA” — every number has exactly one set.")}
${FIG2.tree(360,{cap:"360 = 2³ × 3² × 5. Whichever split you start with, you always end with the same primes."})}`);
VIS("abs","l4",6,`<h3>Picture it: a tolerance band</h3>
${PLAIN("|w − 500| ≤ 8 means “w is within 8 of 500”. On a number line it's a band centred at 500 that stretches 8 each way.")}
${FIG.numline(488,512,{step:4,segs:[{a:492,b:508,ca:true,cb:true,c:"grn"}],marks:[{v:500,label:"500",c:"vio"}],cap:"Allowed weights: 492 ≤ w ≤ 508 — the centre ± the tolerance."})}
${STEP("Write |x − c| ≤ r for the interval 14 ≤ x ≤ 26","Centre and radius",["Centre = middle of the interval = (14 + 26) ÷ 2 = 20.","Radius = half the width = (26 − 14) ÷ 2 = 6.","So |x − 20| ≤ 6.","Check the ends: 20 − 6 = 14 ✓ and 20 + 6 = 26 ✓"],"Answer: <b>|x − 20| ≤ 6</b>")}`);
VIS("func","l9",7,`<h3>Picture it: the inverse is a mirror image</h3>
${PLAIN("An inverse swaps every input and output. Swapping x and y reflects the graph across the line y = x.")}
${FIG.plane({r:6,lines:[{m:2,b:1},{m:0.5,b:-0.5,c:"red"},{m:1,b:0,c:"ink2",dash:"5 6"}],pts:[[1,3,"(1, 3)","blue"],[3,1,"(3, 1)","red"]],cap:"Blue f(x) = 2x + 1. Red f⁻¹(x) = (x − 1)/2. Dashed y = x is the mirror: (1, 3) ↔ (3, 1)."})}
${STEP("Find f⁻¹(x) for f(x) = 2x + 1","Swap and solve",["Write y = 2x + 1.","Swap x and y: x = 2y + 1.","Solve for y: x − 1 = 2y → y = (x − 1)/2.","Check: f(1) = 3 and f⁻¹(3) = (3 − 1)/2 = 1 ✓"],"Answer: <b>f⁻¹(x) = (x − 1)/2</b>")}`);
VIS("advm","l4",7,`<h3>Picture it: growth by a constant factor</h3>
${PLAIN("In y = a · bᵗ, a is where you start and b is what you multiply by each step. b = 1.2 means +20% each step; b = 0.85 means −15%.")}
${CHAIN([500,600,720,864],["t = 0","t = 1","t = 2","t = 3"],"y = 500 · 1.2ᵗ: each bar is 1.2 times the one before — the jumps get bigger.")}
${STEP("V = 3,000(0.92)ᵗ. What do 3,000 and 0.92 mean?","Read each number",["t = 0 gives V = 3,000: the starting value.","0.92 is the multiplier each year.","0.92 = 1 − 0.08, so V decreases by 8% per year.","After 2 years: 3000 × 0.92² = 2,539.20."],"Answer: <b>start 3,000; −8% per year</b>")}`);
VIS("exp","l6",5,`<h3>Picture it: keep halving</h3>
${CHAIN([8,4,2,1,0.5,0.25],["2³","2²","2¹","2⁰","2⁻¹","2⁻²"],"Each step to the right divides by 2. So 2⁰ = 1 and negative powers are fractions: 2⁻² = 1/4.")}
${PLAIN("A negative exponent doesn't make a number negative — it makes it a fraction (one over the positive power).")}`,true);
VIS("alg","l4",8,`<h3>Picture it: unwrap the letter you want</h3>
${PLAIN("Solving for a letter works exactly like solving for x: undo what's been done to it, in reverse order. Treat every other letter as if it were a number.")}
${STEP("Solve A = ½bh for h","Isolate h",["h is multiplied by ½ and by b.","Multiply both sides by 2: 2A = bh.","Divide both sides by b: h = 2A/b.","Check with numbers: b = 4, h = 3 gives A = 6; then 2·6/4 = 3 ✓"],"Answer: <b>h = 2A/b</b>")}
${STEP("Solve F = 1.8C + 32 for C","Undo +32, then ×1.8",["Subtract 32: F − 32 = 1.8C.","Divide by 1.8: C = (F − 32)/1.8.","Check: F = 212 → (212 − 32)/1.8 = 100 ✓"],"Answer: <b>C = (F − 32)/1.8</b>")}`,true);
VIS("data","l6",7,`<h3>Picture it: an estimate with a margin</h3>
${PLAIN("A survey gives an estimate plus a margin of error. The true value is likely inside the interval estimate ± margin — not exactly at the estimate.")}
${FIG.numline(40,64,{step:4,segs:[{a:48,b:56,ca:true,cb:true,c:"blue"}],marks:[{v:52,label:"52%",c:"vio"}],cap:"52% ± 4% → the true percent is plausibly between 48% and 56%."})}
${STEP("A poll says 52% ± 4% support a plan. Can we be confident a majority supports it?","Look at the whole interval",["Interval: 52 − 4 = 48% to 52 + 4 = 56%.","A majority means more than 50%.","Part of the interval (48% to 50%) is below 50%.","So we can't be confident of a majority."],"Answer: <b>No — the interval includes values below 50%</b>")}`);
VIS("prob","l4",7,`<h3>Picture it: a counting tree</h3>
${PLAIN("Each branch is one choice. The number of paths from the top to the bottom is the number of possible outcomes — that's why we multiply.")}
${TREE([["shirt A","shirt B","shirt C"],["jeans","shorts"]],"3 shirts × 2 trousers = 6 different outfits (6 paths).")}`,true);
VIS("sys","l5",8,`<h3>Picture it: what k must do</h3>
${PLAIN("“No solution” means parallel lines: the SAME slope but a DIFFERENT intercept. “Infinitely many” means the same slope AND the same intercept.")}
${FIG.plane({r:6,lines:[{m:-2,b:5},{m:-2,b:4,c:"red"}],cap:"2x + y = 5 and 6x + 3y = 12: both slope −2, intercepts 5 and 4 → parallel, no solution."})}
${STEP("For what k does kx + 3y = 12 have no solution with 2x + y = 5?","Match the slopes",["Slope of 2x + y = 5: y = −2x + 5 → slope −2.","Slope of kx + 3y = 12: y = −(k/3)x + 4 → slope −k/3.","Parallel needs −k/3 = −2 → k = 6.","Check intercepts: 4 ≠ 5, so the lines never meet ✓"],"Answer: <b>k = 6</b>")}`);
VIS("advm","l5",8,`<h3>Picture it: forbidden values</h3>
${PLAIN("A rational equation has x in a denominator. Any value that makes a denominator zero is forbidden — even if your algebra produces it.")}
${STEP("Solve 3/(x − 1) = 6/(x + 2)","Cross-multiply, then check",["Forbidden values: x ≠ 1 and x ≠ −2.","Cross-multiply: 3(x + 2) = 6(x − 1).","3x + 6 = 6x − 6 → 12 = 3x → x = 4.","4 isn't forbidden ✓. Check: 3/3 = 1 and 6/6 = 1 ✓"],"Answer: <b>x = 4</b>")}
${STEP("Solve x/(x − 3) = 3/(x − 3) + 2","A trap",["Forbidden: x ≠ 3.","Multiply every term by (x − 3): x = 3 + 2(x − 3).","x = 2x − 3 → x = 3.","But 3 is forbidden (it makes the denominator 0)."],"Answer: <b>no solution</b>")}`);
VIS("meas","l1",5,`<h3>Picture it: the metric staircase</h3>
${STAIRS("Each step is a factor of 10. km → m is 3 steps down: × 1,000. mm → cm is 1 step up: ÷ 10.")}`,true);
LPC={};
