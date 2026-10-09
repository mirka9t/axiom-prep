/* =====================================================================
   ZERO TO 800 — CONTENT v4 (1)
   New illustrations · Unit: GCF & LCM (НОД и НОК) · Unit: Percentages
   ===================================================================== */
var FIG2=(function(){
function col(c){return {blue:"var(--blue)",red:"var(--red)",grn:"var(--grn)",yel:"var(--yel)",vio:"var(--violet)",ink:"var(--ink)",ink2:"var(--ink2)"}[c||"ink"]||c}
function wrap(w,h,s,cap){return '<figure class="fig"><svg viewBox="0 0 '+w+' '+h+'" style="width:100%;max-width:'+w+'px;height:auto">'+s+'</svg>'+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'}
function t(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||"middle")+'" class="ft fpop" style="fill:'+col(o.c)+';font-size:'+(o.fs||15)+'px;animation-delay:'+(o.d||0)+'s">'+s+'</text>'}
function ln(d,o){o=o||{};return '<path d="'+d+'" pathLength="1" class="fdraw" style="fill:none;stroke:'+col(o.c||"ink2")+';stroke-width:'+(o.w||2.2)+';animation-delay:'+(o.d||0)+'s" stroke-linecap="round"/>'}
function spf(v){for(var p=2;p*p<=v;p++)if(v%p===0)return p;return v}
function tree(n,o){o=o||{};var steps=[],v=n;while(spf(v)!==v){var p=spf(v);steps.push(p);v=v/p}
  var W=Math.max(260,120+steps.length*52),H=70+steps.length*64,x=70,y=34,s=t(x,y,n,{fs:20}),cur=n;
  steps.forEach(function(p,i){var d=0.3+i*0.5,nx=x+52,ny=y+64;cur=cur/p;
    s+=ln("M"+(x-6)+" "+(y+8)+" L"+(x-40)+" "+(ny-22),{d:d})+ln("M"+(x+6)+" "+(y+8)+" L"+(nx-4)+" "+(ny-22),{d:d});
    s+='<circle cx="'+(x-44)+'" cy="'+(ny-7)+'" r="17" class="fpop" style="fill:color-mix(in srgb,var(--grn) 22%,transparent);stroke:var(--grn);stroke-width:2;animation-delay:'+(d+.3)+'s"/>'+t(x-44,ny-1,p,{c:"grn",fs:16,d:d+.3});
    s+=(spf(cur)===cur?'<circle cx="'+nx+'" cy="'+(ny-7)+'" r="17" class="fpop" style="fill:color-mix(in srgb,var(--grn) 22%,transparent);stroke:var(--grn);stroke-width:2;animation-delay:'+(d+.4)+'s"/>':'')+t(nx,ny-1,cur,{c:spf(cur)===cur?"grn":"ink",fs:spf(cur)===cur?16:18,d:d+.4});x=nx;y=ny});
  return wrap(W,H,s,o.cap||(n+" = "+steps.concat([cur]).join(" × ")))}
function primes(n){var r=[],v=n;while(v>1){var p=spf(v);r.push(p);v/=p}return r}
function venn(a,b,o){o=o||{};var pa=primes(a),pb=primes(b),sh=[],la=[],lb=pb.slice();
  pa.forEach(function(p){var i=lb.indexOf(p);if(i>-1){sh.push(p);lb.splice(i,1)}else la.push(p)});
  var s='<circle cx="160" cy="120" r="92" class="ffade" style="fill:color-mix(in srgb,var(--blue) 14%,transparent);stroke:var(--blue);stroke-width:2.5"/><circle cx="270" cy="120" r="92" class="ffade" style="fill:color-mix(in srgb,var(--violet) 14%,transparent);stroke:var(--violet);stroke-width:2.5;animation-delay:.2s"/>';
  s+=t(130,20,"factors of "+a,{c:"blue",fs:14})+t(300,20,"factors of "+b,{c:"vio",fs:14});
  function col_(arr,x,c,d){return arr.map(function(p,i){return t(x,128+(i-(arr.length-1)/2)*24,p,{fs:19,c:c,d:d+i*.12})}).join("")}
  s+=col_(la,120,"blue",.5)+col_(sh,215,"ink",.9)+col_(lb,310,"vio",.7);
  var g=sh.reduce(function(m,x){return m*x},1),l=la.concat(sh,lb).reduce(function(m,x){return m*x},1);
  s+=t(215,232,"GCF = "+(sh.length?sh.join(" × "):"1")+" = "+g+"   ·   LCM = "+la.concat(sh,lb).join(" × ")+" = "+l,{fs:13.5,c:"ink",d:1.3});
  return wrap(430,246,s,o.cap||"Shared primes (middle) give the GCF. Everything in the picture multiplied gives the LCM.")}
function pctBar(p,o){o=o||{};var W=540,x0=20,x1=520,s="";
  s+='<rect x="'+x0+'" y="44" width="'+(x1-x0)+'" height="40" rx="10" style="fill:var(--soft);stroke:var(--line)"/>';
  s+='<rect x="'+x0+'" y="44" width="'+((x1-x0)*Math.min(p,100)/100)+'" height="40" rx="10" class="fgrowx" style="fill:url(#pg'+p+')"/>';
  s='<defs><linearGradient id="pg'+p+'"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--violet)"/></linearGradient></defs>'+s;
  for(var i=0;i<=10;i++){var x=x0+(x1-x0)*i/10;s+='<path d="M'+x+' 84 V92" style="stroke:var(--ink2)"/>'+(i%(o.step||2.5)===0||i%5===0?t(x,108,(i*10)+"%",{fs:11,c:"ink2"}):"")}
  if(o.top)s+=t(x0+(x1-x0)*Math.min(p,100)/100,32,o.top,{fs:14,c:"blue",d:.8});
  if(o.right)s+=t(x1,32,o.right,{fs:13,c:"ink2",a:"end"});
  return wrap(W,118,s,o.cap)}
function grid100(k,o){o=o||{};var s="",c=22;for(var i=0;i<100;i++){var r=Math.floor(i/10),q=i%10;s+='<rect x="'+(10+q*c)+'" y="'+(10+r*c)+'" width="'+(c-3)+'" height="'+(c-3)+'" rx="3" class="'+(i<k?"fpop":"")+'" style="fill:'+(i<k?"var(--blue)":"var(--soft)")+';stroke:var(--line);'+(i<k?"animation-delay:"+(i*0.012)+"s":"")+'"/>'}
  return wrap(240,240,s,o.cap||k+" out of 100 squares = "+k+"%")}
function areaBox(cols,rows,cells,o){o=o||{};var cw=110,rh=64,x0=70,y0=40,s="";
  cols.forEach(function(c,i){s+=t(x0+cw*i+cw/2,28,c,{c:"blue",fs:17})});rows.forEach(function(r,j){s+=t(44,y0+rh*j+rh/2+6,r,{c:"vio",fs:17})});
  rows.forEach(function(r,j){cols.forEach(function(c,i){s+='<rect x="'+(x0+cw*i)+'" y="'+(y0+rh*j)+'" width="'+cw+'" height="'+rh+'" class="fpop" style="fill:color-mix(in srgb,'+["var(--blue)","var(--violet)","var(--grn)","var(--yel)"][(i+j)%4]+' 16%,transparent);stroke:var(--ink2);stroke-width:1.5;animation-delay:'+(.2+(i+j)*.15)+'s"/>'+t(x0+cw*i+cw/2,y0+rh*j+rh/2+6,cells[j][i],{fs:17,d:.5+(i+j)*.15})})});
  return wrap(x0+cw*cols.length+20,y0+rh*rows.length+14,s,o.cap)}
function angles(o){var s="",P=[[30,"acute","< 90°"],[90,"right","= 90°"],[135,"obtuse","90°–180°"],[180,"straight","= 180°"]];
  P.forEach(function(q,i){var cx=30+i*140,cy=100,L=80,a=q[0]*Math.PI/180,x2=cx+L*Math.cos(-a),y2=cy+L*Math.sin(-a);
    s+=ln("M"+cx+" "+cy+" H"+(cx+L),{c:"ink",w:2.5,d:i*.15})+ln("M"+cx+" "+cy+" L"+x2.toFixed(1)+" "+y2.toFixed(1),{c:"blue",w:2.5,d:.3+i*.15});
    s+=q[0]===90?'<path d="M'+cx+' '+(cy-14)+' H'+(cx+14)+' V'+cy+'" style="fill:none;stroke:var(--red);stroke-width:2"/>':ln("M"+(cx+22)+" "+cy+" A22 22 0 "+(q[0]>180?1:0)+" 0 "+(cx+22*Math.cos(-a)).toFixed(1)+" "+(cy+22*Math.sin(-a)).toFixed(1),{c:"red",w:2,d:.6+i*.15});
    s+=t(cx+40,cy+30,q[1],{fs:14,d:.8+i*.15})+t(cx+40,cy+48,q[2],{fs:12,c:"ink2",d:.9+i*.15})});
  return wrap(570,160,s,(o||{}).cap||"The four angle types you must recognise instantly")}
function quads(o){var S=[["square","M20 20h70v70H20z",["4 equal sides","4 right angles"]],["rectangle","M10 30h100v52H10z",["opposite sides equal","4 right angles"]],["rhombus","M60 12 104 55 60 98 16 55z",["4 equal sides","diagonals ⟂"]],["parallelogram","M30 25h80l-20 60H10z",["opposite sides ∥ and =","opposite angles ="]],["trapezoid","M35 25h50l25 60H10z",["exactly one pair ∥","area ½(a+b)h"]],["kite","M60 10 95 45 60 100 25 45z",["two pairs of adjacent equal sides","diagonals ⟂"]]],s="";
  S.forEach(function(q,i){var gx=(i%3)*190,gy=Math.floor(i/3)*170;s+='<g transform="translate('+(gx+25)+','+(gy+10)+')">'+ln(q[1],{c:["blue","vio","grn","red","yel","blue"][i],w:3,d:i*.12})+'</g>'+t(gx+85,gy+138,q[0],{fs:15,d:.4+i*.1})+t(gx+85,gy+156,q[2][0],{fs:11,c:"ink2",d:.5+i*.1})});
  return wrap(570,340,s,(o||{}).cap||"Every quadrilateral has angles adding to 360°")}
function solids(o){var s="";
  s+=ln("M30 150 L90 40 L150 150 Z M90 40 L110 120 L150 150 M30 150 L110 120",{c:"blue",w:2.5});s+=t(90,180,"pyramid",{fs:14,d:.5})+t(90,198,"V = ⅓ · base · h",{fs:12,c:"ink2",d:.6});
  s+=ln("M200 150 A60 18 0 0 0 320 150 L260 40 Z",{c:"vio",w:2.5,d:.2})+ln("M200 150 A60 18 0 0 1 320 150",{c:"vio",w:1.5,d:.3});s+=t(260,180,"cone",{fs:14,d:.6})+t(260,198,"V = ⅓πr²h",{fs:12,c:"ink2",d:.7});
  s+='<circle cx="430" cy="100" r="58" class="ffade" style="fill:color-mix(in srgb,var(--grn) 12%,transparent);stroke:var(--grn);stroke-width:2.5"/>'+ln("M372 100 A58 16 0 0 0 488 100",{c:"grn",w:1.6,d:.4})+t(430,180,"sphere",{fs:14,d:.7})+t(430,198,"V = (4/3)πr³",{fs:12,c:"ink2",d:.8});
  return wrap(520,210,s,(o||{}).cap)}
return {tree:tree,venn:venn,pctBar:pctBar,grid100:grid100,areaBox:areaBox,angles:angles,quads:quads,solids:solids};
})();
function NEWUNIT(u,afterId){var i=UNITS.indexOf(findUnit(afterId));UNITS.splice(i+1,0,u);u.lessons.forEach(function(){});return u}

/* =====================================================================
   UNIT: GCF & LCM (НОД и НОК)
   ===================================================================== */
NEWUNIT({id:"gcf",em:"🔢",color:"#dbeaff",title:"GCF & LCM (НОД и НОК)",tag:"Divisibility, prime factorization, factor trees, the greatest common factor and least common multiple — every method, every type of question.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"Divisibility rules: test any number in seconds",mins:10,h:`
<p>Before we find common factors, we need a fast way to answer “does this number divide that one?” without a calculator. Mathematicians found simple <strong>divisibility rules</strong> — tiny tests that look only at the digits. Once you learn them, breaking numbers apart becomes almost instant.</p>
<h3>The rules you must know</h3>
<table class="tbl" style="width:100%"><tr><td><b>Divides by</b></td><td><b>Test</b></td><td><b>Example</b></td></tr>
<tr><td>2</td><td>last digit is even (0, 2, 4, 6, 8)</td><td>3,58<b>4</b> ✓</td></tr>
<tr><td>3</td><td>sum of digits divides by 3</td><td>471 → 4+7+1 = 12 ✓</td></tr>
<tr><td>4</td><td>last two digits divide by 4</td><td>1,3<b>16</b> → 16 ✓</td></tr>
<tr><td>5</td><td>ends in 0 or 5</td><td>2,34<b>5</b> ✓</td></tr>
<tr><td>6</td><td>divisible by 2 AND by 3</td><td>258: even, 2+5+8 = 15 ✓</td></tr>
<tr><td>8</td><td>last three digits divide by 8</td><td>5,<b>120</b> → 120 ÷ 8 = 15 ✓</td></tr>
<tr><td>9</td><td>sum of digits divides by 9</td><td>738 → 18 ✓</td></tr>
<tr><td>10</td><td>ends in 0</td><td>4,57<b>0</b> ✓</td></tr>
<tr><td>11</td><td>alternating sum of digits divides by 11</td><td>2,728 → 2−7+2−8 = −11 ✓</td></tr></table>
<h3>Why the 3 and 9 rules work</h3>
<p>Each power of ten is “one more than a multiple of 9”: 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1. So 471 = 4·(99+1) + 7·(9+1) + 1 = (a multiple of 9) + 4 + 7 + 1. Whatever is left over comes only from the digit sum. That's why only the digit sum matters for 3 and 9.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Is 5,184 divisible by 6? Last digit 4 → even ✓. Digit sum 5+1+8+4 = 18 → divisible by 3 ✓. Both tests pass, so <strong>yes</strong> (5,184 ÷ 6 = 864).</div>
<div class="eg"><div class="lab">EXAMPLE</div>Is 1,234 divisible by 4? Last two digits 34; 34 ÷ 4 = 8.5 → <strong>no</strong>.</div>
<div class="trap"><b>Trap.</b> “Divisible by 6” needs BOTH 2 and 3. 15 passes the 3-test but is odd, so 15 is not divisible by 6.</div>
${QC("Is 2,457 divisible by 9? Type yes or no.","yes","2 + 4 + 5 + 7 = 18, which divides by 9.")}
${QC("The number 4?2 is divisible by 3. What is the largest digit that ? can be?","9","4 + ? + 2 = 6 + ? must be divisible by 3, so ? can be 0, 3, 6 or 9. The largest is 9.")}
`},
{id:"l2",t:"Prime numbers & prime factorization (factor trees)",mins:12,h:`
<p>A <strong>prime number</strong> has exactly two factors: 1 and itself. Every other whole number above 1 is <strong>composite</strong> — it can be built by multiplying primes. Primes are like the atoms of chemistry: everything else is made from them.</p>
<div class="fbox">Primes below 50:  2  3  5  7  11  13  17  19  23  29  31  37  41  43  47</div>
<div class="tip"><b>To check if a number is prime</b>, try dividing it only by primes up to its square root. For 91: √91 ≈ 9.5, so test 2, 3, 5, 7. 91 = 7 × 13 → not prime. For 97: none of 2, 3, 5, 7 work → 97 is prime.</div>
<h3>Factor trees</h3>
<p>To break a number into primes, split it into any two factors, then keep splitting until every branch ends in a prime. Circle the primes as you go.</p>
${FIG2.tree(60)}
<p>No matter how you start (60 = 6 × 10 or 60 = 4 × 15), you always end with the same primes. This is called the <strong>Fundamental Theorem of Arithmetic</strong>: every number has exactly one prime “recipe”.</p>
${FIG2.tree(360,{cap:"360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5"})}
<h3>Write it with exponents</h3>
<p>Group repeated primes with powers: 360 = 2³ · 3² · 5. This short form is exactly what we'll use to find GCF and LCM.</p>
<h3>The division ladder (another method)</h3>
<p>Divide by the smallest prime that works, write the result underneath, repeat:</p>
<div class="fbox">2 | 360
2 | 180
2 |  90
3 |  45
3 |  15
5 |   5
  |   1      →  360 = 2·2·2·3·3·5</div>
${NOTE("students who skip the prime recipe struggle with GCF, LCM, simplifying fractions and radicals. Ten minutes here saves hours later.")}
${QC("Write 84 as primes: 84 = 2^a · 3 · 7. Enter a.","2","84 = 2 × 42 = 2 × 2 × 21 = 2² × 3 × 7.")}
${QC("Is 119 prime? Type yes or no.","no","119 = 7 × 17.")}
`},
{id:"l3",t:"GCF — НОД: three ways to find it",mins:12,h:`
<p>The <strong>greatest common factor</strong> (GCF, also called greatest common divisor, in Russian <b>НОД</b>) of two numbers is the biggest number that divides both with nothing left over.</p>
<h3>Method 1 — list the factors (small numbers)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>GCF of 18 and 24. Factors of 18: 1, 2, 3, <u>6</u>, 9, 18. Factors of 24: 1, 2, 3, 4, <u>6</u>, 8, 12, 24. Largest common: <strong>6</strong>.</div>
<h3>Method 2 — prime factorization (works for any numbers)</h3>
<p>Write both as primes. The GCF takes <b>only the primes they share</b>, each at the <b>smaller</b> power.</p>
<div class="eg"><div class="lab">EXAMPLE</div>GCF of 72 and 120. 72 = 2³ · 3². 120 = 2³ · 3 · 5. Shared: 2 (smaller power 3) and 3 (smaller power 1). GCF = 2³ · 3 = <strong>24</strong>.</div>
${FIG2.venn(72,120)}
<h3>Method 3 — Euclid's algorithm (big numbers, very fast)</h3>
<p>Replace the larger number by the remainder when you divide it by the smaller one. Repeat until the remainder is 0. The last non-zero number is the GCF.</p>
<div class="eg"><div class="lab">EXAMPLE</div>GCF of 252 and 198.<br>252 ÷ 198 = 1 remainder 54 → now (198, 54)<br>198 ÷ 54 = 3 remainder 36 → (54, 36)<br>54 ÷ 36 = 1 remainder 18 → (36, 18)<br>36 ÷ 18 = 2 remainder 0 → GCF = <strong>18</strong>.</div>
<div class="tip"><b>Co-prime numbers.</b> If the GCF is 1 (like 8 and 15), the numbers share no prime — they are called co-prime (взаимно простые).</div>
<div class="trap"><b>Trap.</b> The GCF can never be bigger than the smaller number. If your “GCF” of 18 and 24 is 72, you found the LCM by mistake.</div>
${QC("GCF (НОД) of 36 and 60?","12","36 = 2²·3², 60 = 2²·3·5 → shared 2²·3 = 12.")}
${QC("Use Euclid: GCF of 391 and 299?","23","391 − 299 = 92 → (299, 92): 299 = 3·92 + 23 → (92, 23): 92 = 4·23 → GCF 23.")}
`},
{id:"l4",t:"LCM — НОК: three ways to find it",mins:11,h:`
<p>The <strong>least common multiple</strong> (LCM, in Russian <b>НОК</b>) is the smallest positive number that both numbers divide into. It's the first place where their “times tables” meet.</p>
<h3>Method 1 — list the multiples</h3>
<div class="eg"><div class="lab">EXAMPLE</div>LCM of 6 and 8. Multiples of 8: 8, 16, <u>24</u>, 32… Multiples of 6: 6, 12, 18, <u>24</u>… First match: <strong>24</strong>.</div>
<div class="tip"><b>Tip:</b> always list multiples of the <em>larger</em> number and test each against the smaller — it's faster.</div>
<h3>Method 2 — prime factorization</h3>
<p>The LCM takes <b>every prime that appears in either number</b>, each at its <b>highest</b> power.</p>
<div class="eg"><div class="lab">EXAMPLE</div>LCM of 72 and 120. 72 = 2³·3², 120 = 2³·3·5. Every prime at highest power: 2³ · 3² · 5 = <strong>360</strong>.</div>
<h3>Method 3 — use the GCF</h3>
<div class="fbox">LCM(a, b) = a × b ÷ GCF(a, b)</div>
<div class="eg"><div class="lab">EXAMPLE</div>LCM of 18 and 24: GCF is 6, so LCM = 18 × 24 ÷ 6 = 432 ÷ 6 = <strong>72</strong>.</div>
${FIG2.venn(18,24,{cap:"18 and 24: shared 2 × 3 = 6 (GCF). All primes 3 × 2 × 3 × 2 × 2 = 72 (LCM)."})}
<div class="trap"><b>Trap.</b> The LCM is never smaller than the larger number. And a × b is a common multiple, but usually NOT the least one.</div>
${QC("LCM (НОК) of 12 and 18?","36","12 = 2²·3, 18 = 2·3² → 2²·3² = 36.")}
${QC("LCM of 9 and 14?","126","They're co-prime (GCF 1), so LCM = 9 × 14 = 126.")}
`},
{id:"l5",t:"Three numbers, and the rule GCF × LCM = a × b",mins:9,h:`
<p>Everything works for three (or more) numbers too — just apply the same prime rules to all of them at once.</p>
<div class="eg"><div class="lab">EXAMPLE</div>12 = 2²·3, 18 = 2·3², 30 = 2·3·5.<br>GCF: primes in ALL three at the lowest power → 2 · 3 = <strong>6</strong>.<br>LCM: every prime at the highest power → 2²·3²·5 = <strong>180</strong>.</div>
<h3>The beautiful rule (for two numbers)</h3>
<div class="fbox">GCF(a, b) × LCM(a, b) = a × b</div>
<p>Why? The GCF uses the smaller power of each prime, the LCM uses the larger one. Together they use every power exactly once — exactly what a × b uses.</p>
<div class="eg"><div class="lab">EXAMPLE — SAT style</div>Two numbers have GCF 6 and LCM 180. One number is 36. Find the other. 6 × 180 = 36 × b → b = 1080 ÷ 36 = <strong>30</strong>.</div>
<div class="trap"><b>Careful:</b> this product rule is only true for TWO numbers, not three.</div>
${QC("GCF of two numbers is 4, their LCM is 120, one number is 24. The other?","20","4 × 120 = 24b → b = 20.")}
${QC("LCM of 4, 6 and 10?","60","2², 2·3, 2·5 → 2²·3·5 = 60.")}
`},
{id:"l6",t:"Word problems: is it GCF or LCM?",mins:12,h:`
<p>The math is easy; the hard part is recognising which one the story wants. Here is the decision rule I give every student:</p>
<div class="fbox">Splitting things into equal groups, largest possible size  →  GCF  (answer is SMALLER than the numbers)
Events repeating, “together again”, smallest common amount  →  LCM  (answer is BIGGER than the numbers)</div>
<div class="eg"><div class="lab">GCF STORY</div>A florist has 48 roses and 36 tulips. She wants identical bouquets with no flowers left over, using as many bouquets as possible. GCF(48, 36) = <strong>12 bouquets</strong>, each with 4 roses and 3 tulips.</div>
<div class="eg"><div class="lab">GCF STORY</div>A floor 240 cm × 180 cm is covered with the largest possible equal square tiles. Side = GCF(240, 180) = <strong>60 cm</strong>; 4 × 3 = 12 tiles.</div>
<div class="eg"><div class="lab">LCM STORY</div>Bus A comes every 15 minutes, bus B every 20 minutes. Both just left together. Next time together: LCM(15, 20) = <strong>60 minutes</strong>.</div>
<div class="eg"><div class="lab">LCM STORY</div>Hot dogs come in packs of 10, buns in packs of 8. Smallest equal number of each: LCM(10, 8) = <strong>40</strong> → 4 packs of hot dogs, 5 packs of buns.</div>
<div class="eg"><div class="lab">LCM STORY</div>Two gears have 12 and 18 teeth. How many teeth pass before the same two teeth meet again? LCM(12, 18) = <strong>36</strong>.</div>
${NOTE("before calculating, ask out loud: should the answer be smaller or bigger than my numbers? That one question picks GCF or LCM for you.")}
${QC("Lights blink every 6 s and 8 s. Seconds until they blink together again?","24","LCM(6, 8) = 24.")}
${QC("30 boys and 42 girls are split into equal mixed teams, as many teams as possible. How many teams?","6","GCF(30, 42) = 6.")}
`},
{id:"l7",t:"GCF & LCM inside fractions",mins:8,h:`
<p>Here is where НОД and НОК quietly appear all the time.</p>
<h3>Simplifying uses the GCF</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Simplify 84/126. GCF(84, 126) = 42. 84 ÷ 42 = 2, 126 ÷ 42 = 3 → <strong>2/3</strong> in one step.</div>
<h3>Adding uses the LCM (the least common denominator)</h3>
<div class="eg"><div class="lab">EXAMPLE</div>5/12 + 7/18. LCM(12, 18) = 36. 5/12 = 15/36, 7/18 = 14/36. Sum = <strong>29/36</strong>.</div>
<div class="tip">Using the LCM instead of just multiplying the denominators (12 × 18 = 216) keeps the numbers small and saves a long simplification at the end.</div>
<h3>Algebra too</h3>
<p>The same ideas work with letters: GCF of 12x³y and 18x²y² is 6x²y; LCM is 36x³y².</p>
${QC("Simplify 45/75 (as a fraction).","3/5","GCF 15.")}
${QC("Compute 3/8 + 5/12 (as a fraction).","19/24","LCM 24: 9/24 + 10/24.")}
`}]},"nums");
more("gcf",[
P("Which number is divisible by 9?",["1,234","4,563","7,801","2,222"],1,"4+5+6+3 = 18."),
P("Which number is divisible by 4?",["1,318","2,522","3,716","4,610"],2,"Last two digits 16 ÷ 4 = 4."),
N("Prime factorization of 90 is 2 · 3^a · 5. Enter a.","2","90 = 2·45 = 2·3²·5."),
N("GCF of 48 and 64?","16","2⁴ is shared."),
N("LCM of 8 and 12?","24","2³·3."),
N("GCF of 35 and 64?","1","Co-prime: no shared primes."),
N("Two numbers: GCF 5, LCM 60, one is 15. The other?","20","300 ÷ 15."),
N("Simplify 56/72: denominator after simplifying?","9","GCF 8 → 7/9."),
N("Red lights every 9 min, blue every 12 min. Minutes until together?","36","LCM 36."),
N("Largest square tiles for a 84 × 60 room (side)?","12","GCF 12.")
],[
N("GCF of 168 and 180?","12","2³·3·7 and 2²·3²·5 → 2²·3."),
N("LCM of 15, 20 and 25?","300","3·5, 2²·5, 5² → 2²·3·5²."),
P("Which pair is co-prime?",["14 and 21","15 and 28","12 and 18","9 and 33"],1,"15 = 3·5, 28 = 2²·7 share nothing."),
N("Euclid: GCF of 455 and 1001?","91","1001 = 2·455 + 91; 455 = 5·91."),
N("Packs of 6 cups and 10 plates. Smallest equal number of each?","30","LCM 30."),
N("Compute 7/15 + 4/9 (fraction).","41/45","LCM 45: 21/45 + 20/45."),
P("A question asks for the 'largest number of identical gift bags'. Use:",["LCM","GCF","sum","product"],1,"Equal groups, largest → GCF."),
N("How many prime factors (with repeats) does 96 have?","6","96 = 2⁵·3: 5 + 1.")
],[
C("НОД = ?","GCF — greatest common factor (divisor)."),
C("НОК = ?","LCM — least common multiple."),
C("Divisible by 3 / 9","Digit sum divisible by 3 / 9."),
C("Divisible by 4 / 8","Last two / last three digits divisible by 4 / 8."),
C("Divisible by 6","Divisible by 2 AND by 3."),
C("GCF from primes","Shared primes, LOWEST powers."),
C("LCM from primes","All primes, HIGHEST powers."),
C("GCF × LCM","= a × b (for two numbers)."),
C("Euclid's algorithm","Replace the bigger number by the remainder until it's 0."),
C("GCF or LCM story?","Smaller answer, equal groups → GCF. Bigger answer, together again → LCM.")
]);

/* =====================================================================
   UNIT: Percentages
   ===================================================================== */
NEWUNIT({id:"pct",em:"🎯",color:"#ffe3ec",title:"Percentages (проценты)",tag:"Everything about percents: meaning, conversions, the three percent questions, increase/decrease, successive changes, reverse percent, money, interest and percentage points.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"What a percent really is",mins:11,h:`
<p>“Percent” comes from Latin <em>per centum</em> — “for every hundred”. So <strong>37% means 37 out of every 100</strong>. That's all a percent is: a fraction with a hidden denominator of 100.</p>
${FIG2.grid100(37,{cap:"37% — 37 of the 100 squares are filled"})}
<h3>Three ways to write the same amount</h3>
<div class="fbox">37%  =  37/100  =  0.37</div>
<ul><li><b>Percent → decimal:</b> divide by 100 (move the point two places left). 37% → 0.37, 5% → 0.05, 120% → 1.2, 0.5% → 0.005.</li>
<li><b>Decimal → percent:</b> multiply by 100. 0.8 → 80%, 1.35 → 135%, 0.004 → 0.4%.</li>
<li><b>Fraction → percent:</b> divide, then × 100. 3/8 = 0.375 = 37.5%.</li>
<li><b>Percent → fraction:</b> put it over 100 and simplify. 45% = 45/100 = 9/20.</li></ul>
<h3>The table every top scorer knows by heart</h3>
<table class="tbl" style="width:100%"><tr><td>1/2 = 50%</td><td>1/3 ≈ 33.3%</td><td>1/4 = 25%</td><td>1/5 = 20%</td></tr>
<tr><td>3/4 = 75%</td><td>2/3 ≈ 66.7%</td><td>1/8 = 12.5%</td><td>2/5 = 40%</td></tr>
<tr><td>1/10 = 10%</td><td>1/20 = 5%</td><td>3/8 = 37.5%</td><td>1/6 ≈ 16.7%</td></tr></table>
<h3>Percents above 100% and below 1%</h3>
<p>200% means “twice the amount”. 150% means 1.5 times. 0.5% means half of one percent — very small: 0.5% of 1000 is just 5.</p>
<div class="trap"><b>Trap:</b> 0.5 and 0.5% are very different. 0.5 = 50%, but 0.5% = 0.005.</div>
${QC("Write 7/20 as a percent (number only).","35","7 ÷ 20 = 0.35.")}
${QC("Write 0.4% as a decimal.","0.004","Divide 0.4 by 100.")}
`},
{id:"l2",t:"The three percent questions",mins:12,h:`
<p>Every basic percent problem has three quantities: the <b>part</b>, the <b>whole</b>, and the <b>percent</b> (rate). They're always linked by one formula:</p>
<div class="fbox">part = percent × whole        (percent written as a decimal)</div>
${FIG2.pctBar(30,{top:"30% → part = 24",right:"whole = 80",cap:"30% of 80 is 24: the part is a slice of the whole."})}
<p>Two of the three numbers will be given — you find the third.</p>
<h3>Type 1: find the part</h3>
<div class="eg"><div class="lab">EXAMPLE</div>What is 30% of 80? part = 0.30 × 80 = <strong>24</strong>.</div>
<h3>Type 2: find the percent</h3>
<div class="eg"><div class="lab">EXAMPLE</div>24 is what percent of 80? 24 = p × 80 → p = 24 ÷ 80 = 0.30 = <strong>30%</strong>.</div>
<h3>Type 3: find the whole</h3>
<div class="eg"><div class="lab">EXAMPLE</div>24 is 30% of what number? 24 = 0.30 × w → w = 24 ÷ 0.30 = <strong>80</strong>.</div>
<div class="tip"><b>Translation trick:</b> “is” → =, “of” → ×, “what” → the unknown. “24 <u>is</u> 30% <u>of</u> <u>what</u>” → 24 = 0.30 × w.</div>
<h3>Mental shortcuts</h3>
<ul><li>10% = move the decimal one place left. 1% = two places.</li><li>x% of y = y% of x. So 8% of 50 = 50% of 8 = <b>4</b>. Swap when it's easier!</li></ul>
${QC("What is 15% of 240?","36","10% = 24, 5% = 12.")}
${QC("18 is 45% of what number?","40","18 ÷ 0.45 = 40.")}
${QC("Compute 4% of 75 using the swap trick.","3","75% of 4 = 3.")}
`},
{id:"l3",t:"Percent increase & decrease with multipliers",mins:12,h:`
<p>Instead of finding the change and adding or subtracting it, top scorers multiply by one number — the <strong>multiplier</strong>. It's faster and it makes harder problems easy.</p>
<div class="fbox">increase by p%  →  × (1 + p/100)        decrease by p%  →  × (1 − p/100)</div>
<table class="tbl" style="width:100%"><tr><td><b>Change</b></td><td>+5%</td><td>+20%</td><td>+150%</td><td>−10%</td><td>−35%</td><td>−100%</td></tr>
<tr><td><b>Multiplier</b></td><td>1.05</td><td>1.2</td><td>2.5</td><td>0.9</td><td>0.65</td><td>0</td></tr></table>
${FIG2.pctBar(120,{top:"120% after a 20% increase",cap:"After +20% you have 120% of the original — multiply by 1.2."})}
<div class="eg"><div class="lab">EXAMPLE</div>A salary of $3,500 rises 8%. New salary = 3500 × 1.08 = <strong>$3,780</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A car worth $24,000 loses 15%. Value = 24000 × 0.85 = <strong>$20,400</strong>.</div>
<h3>Finding the percent change</h3>
<div class="fbox">percent change = (new − old) ÷ old × 100%</div>
<div class="eg"><div class="lab">EXAMPLE</div>From 250 to 310: change 60, divided by the old 250 = 0.24 → <strong>24% increase</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>From 80 to 52: change −28, ÷ 80 = −0.35 → <strong>35% decrease</strong>.</div>
<div class="trap"><b>Always divide by the ORIGINAL.</b> From 80 to 100 is +25% (20/80), but from 100 to 80 is −20% (20/100). Same gap, different percents!</div>
${QC("Multiplier for a 7% decrease?","0.93","1 − 0.07.")}
${QC("Price goes from $40 to $46. Percent increase?","15","6 ÷ 40 = 0.15.")}
`},
{id:"l4",t:"Successive changes & percent of a percent",mins:10,h:`
<p>When one percent change follows another, <strong>multiply the multipliers</strong>. Never add the percents.</p>
<div class="eg"><div class="lab">EXAMPLE</div>+20% then −20%: 1.2 × 0.8 = 0.96 → overall <strong>−4%</strong>, not 0%! The second 20% was taken from a bigger number.</div>
<div class="eg"><div class="lab">EXAMPLE</div>+10% three years in a row: 1.1³ = 1.331 → overall <strong>+33.1%</strong>, not 30%.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A shop raises prices 25%, then gives a 20% discount: 1.25 × 0.8 = 1.00 → back exactly where it started.</div>
<h3>Percent of a percent</h3>
<div class="eg"><div class="lab">EXAMPLE</div>40% of students play a sport, and 25% of those play football. Football players = 0.25 × 0.40 = 0.10 = <strong>10%</strong> of all students.</div>
<h3>Using 100 as a starting number</h3>
<p>Whenever no starting amount is given, pretend it's 100. Then every result is already a percent.</p>
<div class="eg"><div class="lab">EXAMPLE</div>A population falls 30% then rises 50%. Start 100 → 70 → 105. Overall <strong>+5%</strong>.</div>
${NOTE("“percent changes multiply” is the most valuable sentence in this unit. Say it until it's automatic.")}
${QC("A price rises 50% and then falls 50%. Overall percent change? (enter a negative number for a decrease)","-25","1.5 × 0.5 = 0.75.")}
${QC("60% of a class are girls; 30% of the girls wear glasses. What percent of the class are girls with glasses?","18","0.6 × 0.3 = 0.18.")}
`},
{id:"l5",t:"Reverse percent: finding the original",mins:9,h:`
<p>If you know the amount AFTER a percent change, divide by the multiplier to get the amount BEFORE.</p>
<div class="fbox">original = new value ÷ multiplier</div>
<div class="eg"><div class="lab">EXAMPLE</div>After a 20% discount a phone costs $360. Original = 360 ÷ 0.8 = <strong>$450</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>Including 12% tax, a bill is $89.60. Before tax = 89.60 ÷ 1.12 = <strong>$80</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A town grew 25% to 15,000 people. Before = 15,000 ÷ 1.25 = <strong>12,000</strong>.</div>
<div class="trap"><b>The classic wrong answer:</b> 360 + 20% of 360 = 432. Wrong — the 20% was 20% of the original price, not of 360.</div>
${QC("After a 35% discount a coat costs $52. Original price?","80","52 ÷ 0.65.")}
`},
{id:"l6",t:"Money: discount, tax, tip, markup, profit, interest",mins:13,h:`
<p>Every money percent is the same multiplier idea in different clothes.</p>
<table class="tbl" style="width:100%"><tr><td><b>Word</b></td><td><b>Meaning</b></td><td><b>Multiply by</b></td></tr>
<tr><td>discount (скидка) 30%</td><td>price goes down</td><td>0.70</td></tr><tr><td>sales tax (налог) 8%</td><td>price goes up</td><td>1.08</td></tr>
<tr><td>tip 18%</td><td>added to the bill</td><td>1.18</td></tr><tr><td>markup (наценка) 40%</td><td>store's selling price above its cost</td><td>1.40</td></tr>
<tr><td>commission 5%</td><td>salesperson earns 5% of sales</td><td>0.05 (just the part)</td></tr></table>
<h3>Profit & profit percent</h3>
<div class="fbox">profit = selling price − cost        profit % = profit ÷ cost × 100%</div>
<div class="eg"><div class="lab">EXAMPLE</div>Bought for $50, sold for $65. Profit $15 → 15/50 = <strong>30% profit</strong>.</div>
<h3>Simple vs compound interest</h3>
<div class="fbox">simple:    A = P(1 + rt)          compound:  A = P(1 + r)ᵗ</div>
<table class="tbl" style="width:100%"><tr><td><b>Year</b></td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
<tr><td>Simple 10% on $1000</td><td>1000</td><td>1100</td><td>1200</td><td>1300</td></tr>
<tr><td>Compound 10% on $1000</td><td>1000</td><td>1100</td><td>1210</td><td>1331</td></tr></table>
<p>Simple interest grows by the same amount each year (linear). Compound grows by the same <em>percent</em> each year (exponential), so it pulls ahead.</p>
<div class="eg"><div class="lab">EXAMPLE — full chain</div>A $120 jacket: 25% off, then 8% tax, then you pay with a $100 bill. Price = 120 × 0.75 × 1.08 = $97.20. Change = <strong>$2.80</strong>.</div>
${QC("Cost $80, markup 35%. Selling price?","108","80 × 1.35.")}
${QC("$2,000 at 5% compound interest for 2 years (dollars)?","2205","2000 × 1.05².")}
`},
{id:"l7",t:"Percentage points, percent error & percents in tables",mins:10,h:`
<h3>Percent vs percentage points</h3>
<p>If an interest rate goes from 4% to 5%, it rose by <b>1 percentage point</b> — but by <b>25 percent</b> (1 is 25% of 4). The SAT tests this difference.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Unemployment falls from 10% to 8%: a drop of 2 percentage points, which is a 20% decrease.</div>
<h3>Percent error</h3>
<div class="fbox">percent error = |estimate − actual| ÷ actual × 100%</div>
<div class="eg"><div class="lab">EXAMPLE</div>You estimate 45 people; there were 50. Error = 5 ÷ 50 = <strong>10%</strong>.</div>
<h3>Percents in tables</h3>
<table class="tbl" style="width:100%"><tr><td></td><td><b>Pass</b></td><td><b>Fail</b></td><td><b>Total</b></td></tr><tr><td>Class A</td><td>36</td><td>4</td><td>40</td></tr><tr><td>Class B</td><td>45</td><td>15</td><td>60</td></tr><tr><td>Total</td><td>81</td><td>19</td><td>100</td></tr></table>
<ul><li>Percent of Class A that passed: 36/40 = 90%.</li><li>Percent of passers who are in Class B: 45/81 ≈ 55.6%.</li><li>Percent of all students in Class B who failed: 15/100 = 15%.</li></ul>
<div class="tip">The words after “of” (or “among”) tell you which total goes on the bottom.</div>
${QC("A rate rises from 5% to 6%. By what percent did it increase?","20","1 ÷ 5 = 0.2.")}
${QC("Measured 4.8 m, true 5 m. Percent error?","4","0.2 ÷ 5.")}
`}]},"frac");
more("pct",[
N("What is 35% of 260?","91","0.35 × 260."),
N("27 is what percent of 90?","30","27 ÷ 90."),
N("42 is 60% of what number?","70","42 ÷ 0.6."),
N("Multiplier for a 18% increase?","1.18","1 + 0.18."),
N("A $64 item rises 25%. New price?","80","64 × 1.25."),
N("From 500 to 420: percent decrease?","16","80 ÷ 500."),
N("+30% then −30%: overall percent change (negative for decrease)?","-9","1.3 × 0.7 = 0.91."),
N("After 15% off, a bag costs $68. Original price?","80","68 ÷ 0.85."),
N("Cost $40, sold $52. Profit percent?","30","12 ÷ 40."),
N("Write 3/8 as a percent.","37.5","0.375.")
],[
N("70% of a survey said yes; 40% of those were teens. Teens who said yes, as a percent of all?","28","0.7 × 0.4."),
N("$1,500 at 4% simple interest for 5 years: total amount?","1800","1500 × (1 + 0.2)."),
N("A tax of 6% makes a total of $63.60. Price before tax?","60","63.60 ÷ 1.06."),
P("A rate goes from 8% to 10%. Which is true?",["it rose 2%","it rose 2 percentage points","it rose 20 percentage points","it rose 2.5%"],1,"10 − 8 = 2 points (a 25% increase)."),
N("A population of 8,000 grows 5% per year. After 2 years?","8820","8000 × 1.05²."),
N("Increase of 150%: multiplier?","2.5","1 + 1.5."),
N("Estimate 230, actual 250. Percent error?","8","20 ÷ 250."),
N("A shirt is marked up 50% then discounted 20%. Overall percent change?","20","1.5 × 0.8 = 1.2.")
],[
C("Percent means","Out of 100. 37% = 37/100 = 0.37."),
C("part = ?","percent (as a decimal) × whole."),
C("Increase by p%","× (1 + p/100)."),
C("Decrease by p%","× (1 − p/100)."),
C("Percent change","(new − old) ÷ OLD."),
C("Successive changes","Multiply the multipliers — never add percents."),
C("Reverse percent","original = new ÷ multiplier."),
C("Percentage points","Plain difference of two percents (4% → 5% is +1 point, +25%)."),
C("Simple vs compound","P(1 + rt) linear vs P(1 + r)ᵗ exponential."),
C("x% of y","= y% of x (swap trick).")
]);
