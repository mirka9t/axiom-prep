/* =====================================================================
   AXIOM — VISUAL LESSONS (5) + "open in the grapher" buttons
   ===================================================================== */
function GRAPHBTN(exprs,label){return '<div class="gbtn-row"><button class="btn sm gbtn" onclick="graphWith([\''+exprs.join("\',\'")+'\'])">'+ic("graph")+(label||"Open this in the graphing calculator")+'</button></div>'}
function TAPE(parts,cols,lab,cap){var n=parts.length,w=360/n,s="";parts.forEach(function(p,i){s+='<rect x="'+(20+i*w)+'" y="20" width="'+(w-3)+'" height="44" rx="6" fill="'+(cols[i]||"var(--soft)")+'" opacity=".9" stroke="var(--line)"/>'+TX(20+i*w+w/2,48,p,{fs:14,fw:800,c:"#fff"})});if(lab)s+=TX(200,90,lab,{fs:13,c:"var(--ink2)"});return svgWrap(400,100,s,cap)}
function TILES(groups,cap){var s="",x=14;groups.forEach(function(g){for(var i=0;i<g[0];i++){var w=g[1]==="x²"?40:g[1]==="x"?18:16,h=g[1]==="x²"?40:g[1]==="x"?40:16;s+='<rect x="'+x+'" y="'+(70-h)+'" width="'+w+'" height="'+h+'" rx="4" fill="'+g[2]+'" opacity=".88"/>';x+=w+5}x+=16});s+='<line x1="10" y1="76" x2="'+(x-10)+'" y2="76" stroke="var(--line)"/>';return svgWrap(Math.max(320,x),100,s+TX(Math.max(320,x)/2,96,groups.map(function(g){return g[0]+(g[1]==="1"?"":g[1])}).join(" + "),{fs:13}),cap)}
function DIGITS(d,cap){var s="",x=40;d.forEach(function(v){s+='<rect x="'+x+'" y="20" width="44" height="44" rx="10" fill="color-mix(in srgb,var(--blue) 20%,transparent)" stroke="var(--blue)" stroke-width="2"/>'+TX(x+22,49,v,{fs:20,fw:800});x+=56});
  var sum=d.reduce(function(a,b){return a+b},0),s2=String(sum).split("").reduce(function(a,b){return a+ +b},0);s+=TX(x+14,49,"→",{fs:20,c:"var(--ink2)"})+'<rect x="'+(x+34)+'" y="20" width="56" height="44" rx="10" fill="var(--violet)"/>'+TX(x+62,49,sum,{fs:20,fw:800,c:"#fff"});
  return svgWrap(x+110,96,s+TX((x+110)/2,88,"digit sum "+sum+(sum>9?" → "+s2:""),{fs:12,c:"var(--ink2)"}),cap)}
function TWOLINES(a,b,max,cap){var s="",X=function(v){return 30+v/max*340};[[a,"var(--blue)",40],[b,"var(--red)",90]].forEach(function(r){s+='<line x1="30" y1="'+r[2]+'" x2="370" y2="'+r[2]+'" stroke="var(--line)" stroke-width="2"/>'+TX(16,r[2]+5,"every "+r[0],{a:"start",fs:10,c:r[1]}).replace('x="16"','x="30" dy="-14"');for(var v=r[0];v<=max;v+=r[0]){var hit=v%a===0&&v%b===0;s+='<circle cx="'+X(v)+'" cy="'+r[2]+'" r="'+(hit?9:6)+'" fill="'+(hit?"var(--violet)":r[1])+'"/>'+TX(X(v),r[2]+24,v,{fs:11,c:hit?"var(--violet)":"var(--ink2)",fw:hit?800:600})}});
  return svgWrap(400,130,s,cap)}
function GRID36(test,cap){var s="",z=30;for(var a=1;a<=6;a++){s+=TX(46+a*z-z/2+6,18,a,{fs:12,c:"var(--blue)"})+TX(34,30+a*z-z/2+4,a,{fs:12,c:"var(--red)"});for(var b=1;b<=6;b++){var hit=test(a,b);s+='<rect x="'+(40+a*z-z+8)+'" y="'+(24+b*z-z)+'" width="'+(z-3)+'" height="'+(z-3)+'" rx="5" fill="'+(hit?"var(--violet)":"var(--soft)")+'"/>'+TX(40+a*z-z+8+(z-3)/2,24+b*z-z+19,a+b,{fs:11,c:hit?"#fff":"var(--ink2)"})}}return svgWrap(240,214,s,cap)}
function PTREE(cap){var s='<circle cx="30" cy="110" r="6" fill="var(--ink)"/>',B=[[["R","4/10",50,"var(--red)"],[["R","3/9","var(--red)"],["B","6/9","var(--blue)"]]],[["B","6/10",170,"var(--blue)"],[["R","4/9","var(--red)"],["B","5/9","var(--blue)"]]]];
  B.forEach(function(br){var y=br[0][2];s+='<line x1="36" y1="110" x2="150" y2="'+y+'" stroke="'+br[0][3]+'" stroke-width="2.5"/>'+TX(90,(110+y)/2-6,br[0][1],{fs:12,c:br[0][3]})+'<circle cx="160" cy="'+y+'" r="13" fill="'+br[0][3]+'"/>'+TX(160,y+5,br[0][0],{fs:13,c:"#fff",fw:800});
    br[1].forEach(function(l,j){var y2=y-26+j*52;s+='<line x1="173" y1="'+y+'" x2="290" y2="'+y2+'" stroke="'+l[2]+'" stroke-width="2"/>'+TX(232,(y+y2)/2-6,l[1],{fs:11,c:l[2]})+'<circle cx="300" cy="'+y2+'" r="11" fill="'+l[2]+'"/>'+TX(300,y2+4,l[0],{fs:12,c:"#fff",fw:800})})});
  s+=TX(330,28,"R then R: 4/10 × 3/9 = 2/15",{a:"start",fs:12,fw:800,c:"var(--violet)"}).replace('x="330"','x="200"');return svgWrap(420,220,s,cap)}
function POLYSPLIT(n,cap){var cx=120,cy=110,R=85,P=[];for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;P.push([cx+R*Math.cos(a),cy+R*Math.sin(a)])}
  var cols=["var(--blue)","var(--violet)","var(--grn)","#e8a21c","var(--red)","#14b8a6"],s="";for(var k=1;k<n-1;k++)s+='<polygon points="'+[P[0],P[k],P[k+1]].map(String).join(" ")+'" fill="'+cols[(k-1)%6]+'" opacity=".28" stroke="'+cols[(k-1)%6]+'" stroke-width="1.5"/>';
  s+='<polygon points="'+P.map(String).join(" ")+'" fill="none" stroke="var(--ink)" stroke-width="2.5"/>'+TX(260,90,n+" sides",{a:"start",fs:13})+TX(260,114,(n-2)+" triangles",{a:"start",fs:13,c:"var(--violet)"})+TX(260,138,(n-2)+" × 180° = "+((n-2)*180)+"°",{a:"start",fs:13,fw:800});return svgWrap(400,220,s,cap)}
function MACHINE(inp,rule,out,cap){var s='<rect x="130" y="30" width="140" height="70" rx="16" fill="color-mix(in srgb,var(--violet) 18%,transparent)" stroke="var(--violet)" stroke-width="2.5"/>'+TX(200,72,rule,{fs:16,fw:800})+TX(200,24,"function machine",{fs:11,c:"var(--ink2)"})+
  '<line x1="40" y1="65" x2="124" y2="65" stroke="var(--blue)" stroke-width="3" marker-end="url(#ar)"/><line x1="276" y1="65" x2="360" y2="65" stroke="var(--grn)" stroke-width="3"/>'+TX(60,55,"in: "+inp,{fs:14,c:"var(--blue)"})+TX(330,55,"out: "+out,{fs:14,c:"var(--grn)"})+'<polygon points="124,58 134,65 124,72" fill="var(--blue)"/><polygon points="360,58 370,65 360,72" fill="var(--grn)"/>';return svgWrap(400,120,s,cap)}
function HOPS(num,cap){var d=num.replace(/,/g,"").split(""),s="",x=20;d.forEach(function(c,i){s+=TX(x+i*26,70,c,{fs:22,fw:800,c:i===0?"var(--violet)":"var(--ink)"})});var n=d.length-1;for(var i=0;i<n;i++){var x1=x+(n-i)*26+12,x2=x1-26;s+='<path d="M'+x1+',78 Q'+((x1+x2)/2)+',100 '+x2+',78" fill="none" stroke="var(--blue)" stroke-width="2"/>'}
  s+='<circle cx="'+(x+d.length*26-12)+'" cy="74" r="4" fill="var(--red)"/><circle cx="'+(x+14)+'" cy="74" r="4" fill="var(--grn)"/>'+TX(x+d.length*13,124,"the point hops "+n+" places left → × 10^"+n,{fs:12,c:"var(--blue)"});return svgWrap(Math.max(300,x+d.length*26+20),134,s,cap)}
function ROAD(cap){var s='<line x1="30" y1="60" x2="370" y2="60" stroke="var(--ink2)" stroke-width="10" stroke-linecap="round"/><line x1="30" y1="60" x2="370" y2="60" stroke="var(--paper)" stroke-width="2" stroke-dasharray="8 8"/>'+
  '<rect x="18" y="34" width="26" height="16" rx="4" fill="var(--blue)"/><rect x="356" y="34" width="26" height="16" rx="4" fill="var(--red)"/>'+TX(30,26,"A · 70 km/h",{fs:12,c:"var(--blue)",a:"start"}).replace('x="30"','x="14"')+TX(386,26,"80 km/h · B",{fs:12,c:"var(--red)",a:"end"})+
  '<line x1="30" y1="86" x2="188.7" y2="86" stroke="var(--blue)" stroke-width="3"/><line x1="188.7" y1="86" x2="370" y2="86" stroke="var(--red)" stroke-width="3"/><circle cx="188.7" cy="60" r="8" fill="var(--violet)"/>'+TX(109,104,"140 km",{fs:12,c:"var(--blue)"})+TX(279,104,"160 km",{fs:12,c:"var(--red)"})+TX(200,124,"300 km apart · they meet after 2 h",{fs:12,fw:800});return svgWrap(400,132,s,cap)}
function PLACEV(cap){var cols=[["tens","2"],["ones","3"],[".","."],["tenths","4"],["hundredths","7"],["thousandths","5"]],s="",x=20;cols.forEach(function(c){var w=c[0]==="."?20:58;if(c[0]!=="."){s+='<rect x="'+x+'" y="30" width="'+(w-4)+'" height="50" rx="8" fill="color-mix(in srgb,var(--blue) 14%,transparent)" stroke="var(--line)"/>'+TX(x+w/2-2,20,c[0],{fs:10,c:"var(--ink2)"})}s+=TX(x+w/2-2,66,c[1],{fs:24,fw:800,c:c[0]==="."?"var(--red)":"var(--ink)"});x+=w});
  return svgWrap(x+20,96,s,cap)}
function TRAP2(cap){var s='<polygon points="40,150 200,150 170,60 80,60" fill="color-mix(in srgb,var(--blue) 25%,transparent)" stroke="var(--blue)" stroke-width="2.5"/><polygon points="200,150 360,150 320,60 230,60" fill="color-mix(in srgb,var(--violet) 25%,transparent)" stroke="var(--violet)" stroke-width="2.5" stroke-dasharray="6 4"/>'+
  TX(120,168,"b₂ (bottom)",{fs:12})+TX(125,52,"b₁ (top)",{fs:12})+TX(280,168,"b₁",{fs:12,c:"var(--violet)"})+TX(275,52,"b₂",{fs:12,c:"var(--violet)"})+'<line x1="80" y1="60" x2="80" y2="150" stroke="var(--red)" stroke-dasharray="4 3"/>'+TX(92,110,"h",{fs:13,c:"var(--red)",a:"start"})+TX(200,192,"two copies = parallelogram with base b₁ + b₂ → trapezoid = ½(b₁ + b₂)h",{fs:11.5,c:"var(--ink2)"});return svgWrap(400,200,s,cap)}

VIS("gcf","l1",7,`<h3>Picture it: the digit-sum test</h3>
${PLAIN("A number is divisible by 3 if its digits add up to a multiple of 3, and by 9 if they add up to a multiple of 9. You only look at the digits — no long division.")}
${DIGITS([4,5,7,2],"4 + 5 + 7 + 2 = 18. 18 is a multiple of 3 AND of 9, so 4,572 is divisible by both.")}
<table class="tbl vtab"><tr><td><b>Divisible by</b></td><td><b>Quick test</b></td></tr><tr><td>2</td><td>last digit even</td></tr><tr><td>3 / 9</td><td>digit sum divisible by 3 / 9</td></tr><tr><td>4</td><td>last two digits divisible by 4</td></tr><tr><td>5</td><td>last digit 0 or 5</td></tr><tr><td>6</td><td>passes the tests for 2 AND 3</td></tr><tr><td>10</td><td>last digit 0</td></tr></table>
${STEP("Which of 2, 3, 4, 5, 6, 9 divide 4,572?","Run each quick test",["Last digit 2 is even → divisible by 2 ✓.","Digit sum 18 → divisible by 3 ✓ and by 9 ✓.","Last two digits 72 = 4 × 18 → divisible by 4 ✓.","Last digit isn't 0 or 5 → NOT divisible by 5.","Divisible by 2 and by 3 → divisible by 6 ✓."],"Answer: <b>2, 3, 4, 6 and 9 — not 5</b>")}`,true);
VIS("gcf","l5",7,`<h3>Picture it: why GCF × LCM = a × b</h3>
${PLAIN("Put the prime factors of both numbers in a Venn diagram. The middle (shared primes) is the GCF; everything in the picture multiplied together is the LCM. Multiplying GCF × LCM uses every prime exactly as often as a × b does.")}
${FIG2.venn(12,18,{cap:"12 = 2·2·3 and 18 = 2·3·3. Shared: 2·3 = 6 (GCF). All: 2·2·3·3 = 36 (LCM). 6 × 36 = 216 = 12 × 18."})}
${STEP("The GCF of two numbers is 8 and their product is 960. Find the LCM.","Use GCF × LCM = a × b",["Write the rule: GCF × LCM = a × b.","Substitute: 8 × LCM = 960.","Divide: LCM = 960 ÷ 8 = 120."],"Answer: <b>120</b>")}`);
VIS("gcf","l6",7,`<h3>Picture it: when do things happen together?</h3>
${PLAIN("“Split into equal groups / the biggest size that fits” → GCF. “Happen together again / the first time they match” → LCM.")}
${TWOLINES(12,18,72,"Bus A every 12 min, bus B every 18 min. They leave together again at 36 (and 72) — the LCM.")}
${STEP("24 apples and 36 oranges go into identical bags with none left over. The greatest number of bags?","Equal groups → GCF",["“Identical bags, none left over, greatest number” → GCF.","24 = 2³ × 3 and 36 = 2² × 3².","GCF = 2² × 3 = 12 bags.","Each bag: 24 ÷ 12 = 2 apples and 36 ÷ 12 = 3 oranges."],"Answer: <b>12 bags</b>")}`);
VIS("ratio","l1",7,`<h3>Picture it: a tape diagram</h3>
${PLAIN("A ratio 2 : 3 means 2 equal parts of one thing for every 3 equal parts of the other. Draw 5 equal boxes; the total tells you how big one box is.")}
${TAPE(["6","6","6","6","6"],["var(--blue)","var(--blue)","var(--red)","var(--red)","var(--red)"],"30 students ÷ 5 parts = 6 per part","Boys : girls = 2 : 3. Boys = 2 × 6 = 12, girls = 3 × 6 = 18.")}
${STEP("Boys : girls = 2 : 3 in a class of 30. How many girls?","Count the parts",["Total parts = 2 + 3 = 5.","One part = 30 ÷ 5 = 6 students.","Girls = 3 parts = 3 × 6 = 18.","Check: 12 boys + 18 girls = 30 ✓, and 12 : 18 = 2 : 3 ✓."],"Answer: <b>18 girls</b>")}`,true);
VIS("ratio","l4",7,`<h3>Picture it: two cars meeting</h3>
${PLAIN("When two things move TOWARD each other, their speeds add: together they close the gap at 70 + 80 = 150 km every hour.")}
${ROAD("A and B start 300 km apart. Combined speed 150 km/h → they meet after 300 ÷ 150 = 2 hours.")}
${STEP("Two cars start 300 km apart and drive toward each other at 70 and 80 km/h. Where do they meet?","Combined speed",["Closing speed = 70 + 80 = 150 km/h.","Time to meet = 300 ÷ 150 = 2 h.","Car A travels 70 × 2 = 140 km.","Car B travels 80 × 2 = 160 km (140 + 160 = 300 ✓)."],"Answer: <b>after 2 h, 140 km from A</b>")}`);
VIS("alg","l1",7,`<h3>Picture it: algebra tiles</h3>
${PLAIN("A letter is just a box holding a number. 3x + 2 means three x-boxes and two single units. Put a number into each box and you can count the total.")}
${TILES([[3,"x","var(--blue)"],[2,"1","#e8a21c"]],"3x + 2: three tall x-tiles and two unit squares. If each x-tile holds 4, the total is 3·4 + 2 = 14.")}
${STEP("Evaluate 2x² − 3x + 1 when x = −2","Brackets around the value",["Replace every x with (−2): 2(−2)² − 3(−2) + 1.","Power first: (−2)² = 4 → 2·4 = 8.","Next: −3·(−2) = +6.","Add: 8 + 6 + 1 = 15."],"Answer: <b>15</b>")}`,true);
VIS("alg","l8",7,`<h3>Picture it: keep the scale balanced</h3>
${PLAIN("An equation is a balanced scale. Every move you make to one side, you make to the other — then it stays balanced and the answer stays correct.")}
${FIG.scale("3x + 4","19",{cap:"Take 4 from both pans, then split both into 3 equal parts: x = 5."})}
${STEP("Solve 2(x − 3) + 5 = 4x − 7","Six-step method",["Distribute: 2x − 6 + 5 = 4x − 7.","Combine: 2x − 1 = 4x − 7.","Move x to the side with more: subtract 2x → −1 = 2x − 7.","Add 7: 6 = 2x.","Divide by 2: x = 3. Check: 2(0) + 5 = 5 and 12 − 7 = 5 ✓"],"Answer: <b>x = 3</b>")}`);
VIS("poly","l1",7,`<h3>Picture it: sort before you add</h3>
${PLAIN("Like terms are the same kind of tile: x² with x², x with x, numbers with numbers. You can only combine tiles of the same shape.")}
${TILES([[2,"x²","var(--violet)"],[9,"x","var(--blue)"],[5,"1","#e8a21c"]],"After sorting: 2x² + 9x + 5.")}
${STEP("Simplify 3x² + 5x − 2 − x² + 4x + 7","Group like terms",["x² terms: 3x² − x² = 2x².","x terms: 5x + 4x = 9x.","Numbers: −2 + 7 = 5.","Write in order of powers: 2x² + 9x + 5."],"Answer: <b>2x² + 9x + 5</b>")}`,true);
VIS("sys","l2",7,`<h3>Picture it: substitution finds the crossing point</h3>
${PLAIN("The solution of a system is where the two lines cross. Substitution finds that point with algebra; the graph shows it.")}
${FIG.plane({r:9,lines:[{m:2,b:-1},{m:-1,b:8}],pts:[[3,5,"(3, 5)","vio"]],cap:"y = 2x − 1 and x + y = 8 meet at (3, 5)."})}
${GRAPHBTN(["2x-1","8-x"],"See it in the graphing calculator")}
${STEP("Solve y = 2x − 1 and x + y = 8","Swap y for 2x − 1",["The first equation says y = 2x − 1.","Put it into the second: x + (2x − 1) = 8.","3x − 1 = 8 → 3x = 9 → x = 3.","Back-substitute: y = 2(3) − 1 = 5."],"Answer: <b>(3, 5)</b>")}`);
VIS("exp","l1",7,`<h3>Picture it: count the factors</h3>
${PLAIN("x³ · x² means (x·x·x)·(x·x): five x's multiplied, so x⁵. Multiplying ADDS the exponents because you're just counting the factors.")}
${svgWrap(400,90,(function(){var s="",x=20;["var(--blue)","var(--blue)","var(--blue)","var(--violet)","var(--violet)"].forEach(function(c,i){s+='<rect x="'+x+'" y="20" width="50" height="44" rx="10" fill="'+c+'" opacity=".85"/>'+TX(x+25,49,"x",{fs:20,fw:800,c:"#fff"});x+=58+(i===2?18:0)});return s+TX(102,82,"x³",{fs:13,c:"var(--blue)"})+TX(270,82,"x²",{fs:13,c:"var(--violet)"})})(),"3 + 2 = 5 factors → x³ · x² = x⁵.")}
${STEP("Simplify (2x³)² · x⁴ ÷ (4x⁵)","One law at a time",["Power of a product: (2x³)² = 4x⁶.","Multiply: 4x⁶ · x⁴ = 4x¹⁰ (add 6 + 4).","Divide: 4x¹⁰ ÷ 4x⁵ = x⁵ (4 ÷ 4 = 1, subtract 10 − 5)."],"Answer: <b>x⁵</b>")}`,true);
VIS("exp","l3",7,`<h3>Picture it: the hopping decimal point</h3>
${PLAIN("Scientific notation writes a number as (a number from 1 to 10) × (a power of 10). The power counts how many places the decimal point hopped.")}
${HOPS("45000000","45,000,000 = 4.5 × 10⁷: the point hops 7 places left to sit after the 4.")}
${STEP("Compute (3 × 10⁵)(4 × 10³) in scientific notation","Front numbers, then powers",["Multiply the front numbers: 3 × 4 = 12.","Add the powers: 10⁵ × 10³ = 10⁸ → 12 × 10⁸.","12 is too big for the front: 12 = 1.2 × 10.","So 1.2 × 10¹ × 10⁸ = 1.2 × 10⁹."],"Answer: <b>1.2 × 10⁹</b>")}`);
VIS("quad","l2",7,`<h3>Picture it: solutions are x-intercepts</h3>
${PLAIN("Solving x² − x − 6 = 0 asks: where does the graph of y = x² − x − 6 touch the x-axis? Every method — factoring, the formula, Desmos — finds the same two points.")}
${FIG.plane({r:6,fns:[{f:function(x){return x*x-x-6}}],pts:[[-2,0,"−2"],[3,0,"3"]],cap:"y = x² − x − 6 crosses the x-axis at −2 and 3."})}
${GRAPHBTN(["x^2-x-6"])}
${STEP("Solve x² − x − 6 = 0 with the quadratic formula","a = 1, b = −1, c = −6",["Discriminant: b² − 4ac = 1 + 24 = 25.","√25 = 5.","x = (1 ± 5) ÷ 2.","x = 6/2 = 3 or x = −4/2 = −2 — the same as factoring (x − 3)(x + 2)."],"Answer: <b>x = 3 or x = −2</b>")}`);
VIS("quad","l8",7,`<h3>Picture it: a square equals a number</h3>
${PLAIN("(x − 1)² = 4 asks where the parabola y = (x − 1)² reaches height 4. A horizontal line at 4 cuts it twice — that's the ± in the square-root method.")}
${FIG.plane({r:6,fns:[{f:function(x){return (x-1)*(x-1)}}],lines:[{m:0,b:4,c:"red"}],pts:[[-1,4,"x = −1"],[3,4,"x = 3"]],cap:"Two crossings: x − 1 = 2 or x − 1 = −2."})}
${GRAPHBTN(["(x-1)^2","4"])}
${STEP("Solve (x − 1)² = 4","Square roots, with ±",["Take the square root of both sides: x − 1 = ±2.","Case +: x − 1 = 2 → x = 3.","Case −: x − 1 = −2 → x = −1."],"Answer: <b>x = 3 or x = −1</b>")}`);
VIS("func","l1",7,`<h3>Picture it: a function machine</h3>
${PLAIN("A function is a machine: put an input in, the rule acts on it, one output comes out. f(3) means “put 3 into the machine called f”.")}
${MACHINE(3,"f(x) = 2x + 1",7,"f(3) = 2·3 + 1 = 7.")}
${STEP("f(x) = x² − 2x. Find f(−3).","Replace x with (−3)",["Write it with brackets: f(−3) = (−3)² − 2(−3).","(−3)² = 9.","−2(−3) = +6.","9 + 6 = 15."],"Answer: <b>f(−3) = 15</b>")}`,true);
VIS("func","l2",7,`<h3>Picture it: domain and range on a graph</h3>
${PLAIN("The domain is how far the graph reaches left-to-right; the range is how far it reaches up-and-down. y = √(x + 4) starts at x = −4 and only goes up.")}
${FIG.plane({r:6,fns:[{f:function(x){return x<-4?NaN:Math.sqrt(x+4)}}],pts:[[-4,0,"starts at (−4, 0)","vio"]],cap:"Domain: x ≥ −4. Range: y ≥ 0."})}
${GRAPHBTN(["sqrt(x+4)"])}
${STEP("Find the domain of g(x) = 5/(x − 3)","Look for forbidden inputs",["Division: the denominator can't be 0.","x − 3 = 0 when x = 3.","Every other number is allowed."],"Answer: <b>all real numbers except 3</b>")}`);
VIS("advm","l3",7,`<h3>Picture it: the complex plane</h3>
${PLAIN("A complex number a + bi is a point: a steps right (real part), b steps up (imaginary part). Adding complex numbers is just moving on this plane.")}
${FIG.plane({r:5,pts:[[3,2,"3 + 2i","blue"],[1,-4,"1 − 4i","red"],[4,-2,"sum 4 − 2i","vio"]],cap:"Horizontal axis = real part, vertical axis = imaginary part. (3 + 2i) + (1 − 4i) = 4 − 2i."})}
${STEP("Multiply (3 + 2i)(1 − 4i)","FOIL, then i² = −1",["First: 3·1 = 3. Outer: 3·(−4i) = −12i.","Inner: 2i·1 = 2i. Last: 2i·(−4i) = −8i².","Combine: 3 − 10i − 8i².","i² = −1 → −8i² = +8 → 11 − 10i."],"Answer: <b>11 − 10i</b>")}`);
VIS("model","l3",6,`<h3>Picture it: each step multiplies</h3>
${CHAIN([200,600,1800],["0 h","1 h","2 h"],"200 → 600 → 1,800: each hour × 3. Two steps multiply by 3 × 3 = 9.")}
${STEP("A culture grows from 200 to 1,800 in 2 hours (same factor each hour). Factor per hour?","Ratio, then root",["Total growth: 1800 ÷ 200 = 9 over 2 hours.","Per-hour factor b with b² = 9.","b = 3: it triples every hour.","Model: N = 200 · 3ᵗ."],"Answer: <b>× 3 per hour</b>")}`);
VIS("data","l1",7,`<h3>Picture it: an outlier pulls the mean</h3>
${PLAIN("The median is the middle value — it doesn't care how far away the extremes are. The mean is a balance point, so one far-away value drags it toward itself.")}
${DOTPLOT([["2, 3, 3, 4, 5, 9",[2,3,3,4,5,9],"var(--blue)"]],"Median = 3.5 (between 3 and 4). Mean = 26 ÷ 6 ≈ 4.33 — pulled right by the 9.")}
${STEP("Find the mean and median of 2, 3, 3, 4, 5, 9","Sum ÷ count, and the middle",["Sum = 2 + 3 + 3 + 4 + 5 + 9 = 26.","Mean = 26 ÷ 6 ≈ 4.33.","Six values → median = average of the 3rd and 4th: (3 + 4) ÷ 2 = 3.5.","The 9 makes the mean bigger than the median."],"Answer: <b>mean ≈ 4.33, median 3.5</b>")}`,true);
VIS("prob","l1",7,`<h3>Picture it: all 36 outcomes of two dice</h3>
${PLAIN("When outcomes are equally likely, probability = favourable ÷ total. Draw every outcome and count.")}
${GRID36(function(a,b){return a+b===7},"Blue die across, red die down. The 6 purple squares have sum 7: P = 6/36 = 1/6.")}
${STEP("Roll two dice. P(sum is 10 or more)?","Count favourable outcomes",["Sum 10: (4,6), (5,5), (6,4) — 3 outcomes.","Sum 11: (5,6), (6,5) — 2. Sum 12: (6,6) — 1.","Favourable = 3 + 2 + 1 = 6.","P = 6/36 = 1/6."],"Answer: <b>1/6</b>")}`,true);
VIS("prob","l5",7,`<h3>Picture it: a tree that changes after each draw</h3>
${PLAIN("Without replacement, the second branch depends on the first: after taking a red pen there are fewer reds AND fewer pens in total.")}
${PTREE("A box with 4 red and 6 blue pens; two drawn without replacement. Multiply along a path.")}
${STEP("Same box: P(one red and one blue, in either order)?","Add the two paths",["Red then blue: 4/10 × 6/9 = 24/90.","Blue then red: 6/10 × 4/9 = 24/90.","Add the paths: 48/90.","Simplify: 48/90 = 8/15."],"Answer: <b>8/15</b>")}`);
VIS("geo1","l5",6,`<h3>Picture it: polygons are made of triangles</h3>
${POLYSPLIT(5,"From one corner of a pentagon you can draw 3 triangles — that's why its angles add to 3 × 180° = 540°.")}
${STEP("Each interior angle of a regular hexagon?","Triangles, then share",["n = 6 → n − 2 = 4 triangles.","Angle sum = 4 × 180° = 720°.","Regular → all 6 angles equal: 720 ÷ 6 = 120°."],"Answer: <b>120°</b>")}`,true);
VIS("geo2","l2",6,`<h3>Picture it: where the trapezoid formula comes from</h3>
${TRAP2("Two copies of the same trapezoid, one flipped, form a parallelogram.")}
${STEP("Trapezoid with parallel sides 8 and 14 and height 5. Area?","½ × (sum of parallel sides) × height",["Add the parallel sides: 8 + 14 = 22.","Half of that: 11 (the average width).","Multiply by the height: 11 × 5 = 55."],"Answer: <b>55</b>")}`);
VIS("geo2","l5",7,`<h3>Picture it: a circle on the grid</h3>
${PLAIN("(x − h)² + (y − k)² = r² is every point exactly r away from the centre (h, k). Complete the square to find h, k and r.")}
${FIG.plane({r:6,fns:[{f:function(x){var d=9-(x-1)*(x-1);return d<0?NaN:-2+Math.sqrt(d)}},{f:function(x){var d=9-(x-1)*(x-1);return d<0?NaN:-2-Math.sqrt(d)},c:"blue"}],pts:[[1,-2,"centre (1, −2)","vio"],[4,-2,"r = 3","red"]],cap:"(x − 1)² + (y + 2)² = 9: centre (1, −2), radius 3."})}
${STEP("Find the centre and radius of x² + y² − 2x + 4y − 4 = 0","Complete both squares",["Group: (x² − 2x) + (y² + 4y) = 4.","Half of −2 is −1 → add 1. Half of 4 is 2 → add 4. Add both to the right too: 4 + 1 + 4 = 9.","(x − 1)² + (y + 2)² = 9.","Centre (1, −2), r = √9 = 3."],"Answer: <b>centre (1, −2), radius 3</b>")}`);
VIS("trig","l2",6,`<h3>Picture it: an angle on the unit circle</h3>
${PLAIN("On the unit circle (radius 1), the point at angle θ is (cos θ, sin θ). For θ = π/3 (60°) that point is (1/2, √3/2).")}
${FIG.plane({r:2,fns:[{f:function(x){return Math.abs(x)>1?NaN:Math.sqrt(1-x*x)}},{f:function(x){return Math.abs(x)>1?NaN:-Math.sqrt(1-x*x)},c:"blue"}],lines:[],pts:[[0.5,0.866,"(1/2, √3/2)","vio"],[1,0,"θ = 0","grn"]],cap:"Walking π/3 counter-clockwise from (1, 0) lands on (cos π/3, sin π/3) = (0.5, 0.866)."})}`);
VIS("nums","l10",6,`<h3>Picture it: place value</h3>
${PLACEV("23.475: each place to the right is ten times smaller — tenths, hundredths, thousandths.")}
${STEP("Compute 0.6 × 0.04","Multiply, then count places",["Ignore the points: 6 × 4 = 24.","Decimal places: 0.6 has 1, 0.04 has 2 → 3 in total.","Put 3 digits after the point: 0.024."],"Answer: <b>0.024</b>")}`,true);
VIS("frac","l9",6,`<h3>Picture it: a part tells you the whole</h3>
${TAPE(["8","8","8","8","8"],["var(--violet)","var(--violet)","var(--violet)","var(--soft)","var(--soft)"],"3 shaded parts = 24 → 1 part = 8 → 5 parts = 40","3/5 of a number is 24: three of the five equal parts make 24.")}
${STEP("3/5 of a number is 24. Find the number.","One part first",["3 parts = 24.","1 part = 24 ÷ 3 = 8.","The whole is 5 parts = 5 × 8 = 40.","Check: 3/5 × 40 = 24 ✓"],"Answer: <b>40</b>")}`);
VIS("wp","l4",6,`<h3>Picture it: work as fractions per hour</h3>
${FBARS([[1,6,"Anna 1/6","var(--blue)"],[2,6,"Ben 2/6","var(--violet)"],[3,6,"together 3/6","var(--grn)"]],"Anna paints 1/6 of the fence per hour, Ben 1/3 = 2/6. Together 3/6 = 1/2 per hour → 2 hours.")}
${PLAIN("Rates add, times don't. Convert each worker into “fraction of the job per hour”, add the fractions, then flip to get the time.")}`);
VIS("pct","l7",6,`<h3>Picture it: points vs percent</h3>
${CHAIN([4,5],["before","after"],"From 4% to 5%: up 1 percentage POINT, but 1 ÷ 4 = 25% in relative PERCENT terms.")}
${STEP("A rate goes from 8% to 6%. Change in points and in percent?","Two different questions",["Percentage points: 6 − 8 = −2 points.","Percent change: −2 ÷ 8 = −0.25.","= a 25% decrease of the rate."],"Answer: <b>−2 points; −25%</b>")}`);
(function(){var c=`.gbtn-row{display:flex;justify-content:center;margin:6px 0 12px}.gbtn{gap:6px}`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
LPC={};
