/* =====================================================================
   AXIOM — CONTENT: Absolute value & piecewise functions · inverses · spread
   ===================================================================== */
ICONS.vshape="M3 5l9 14 9-14 M3 21h18";
NEWUNIT({id:"abs",em:"🧩",color:"#e8f0ff",title:"Absolute value & piecewise functions",tag:"The V-shaped graph, its shifts and flips, absolute value equations and inequalities on a graph, and functions defined in pieces.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"The graph of y = |x| and its moves",mins:11,h:`
<p>The function y = |x| turns every input into its distance from zero. Negative inputs become positive, so the graph is a sharp <strong>V</strong> with its corner (vertex) at the origin.</p>
${FIG.plane({r:5,fns:[{f:function(x){return Math.abs(x)}}],pts:[[0,0,"vertex (0, 0)"]],cap:"y = |x|: slope −1 on the left, +1 on the right."})}
<h3>Moving the V</h3>
<div class="fbox">y = a|x − h| + k     vertex (h, k)
a > 0 opens up (V) · a < 0 opens down (Λ) · |a| > 1 narrower · |a| < 1 wider</div>
<div class="eg"><div class="lab">EXAMPLE</div>y = |x − 3| + 2: shifted right 3 and up 2 → vertex <strong>(3, 2)</strong>, minimum value 2.</div>
<div class="eg"><div class="lab">EXAMPLE</div>y = −2|x + 1| + 4: vertex (−1, 4), opens down, twice as steep → maximum value <strong>4</strong>.</div>
${FIG.plane({r:6,fns:[{f:function(x){return Math.abs(x-3)+2}},{f:function(x){return -2*Math.abs(x+1)+4},c:"red"}],cap:"Blue: |x − 3| + 2. Red: −2|x + 1| + 4."})}
<div class="trap"><b>Sign trap:</b> |x + 1| moves LEFT 1 (inside the bars works backwards, like every horizontal shift).</div>
${QC("What is the minimum value of y = |x + 4| − 6?","-6","Vertex (−4, −6).")}
`},
{id:"l2",t:"Absolute value equations & inequalities on a graph",mins:12,h:`
<p>Solving |x − 2| = 3 is the same as asking where the V-graph y = |x − 2| meets the horizontal line y = 3. A horizontal line can cut a V in <b>two</b> points, touch the vertex at <b>one</b>, or miss it entirely (<b>none</b>).</p>
${FIG.plane({r:6,fns:[{f:function(x){return Math.abs(x-2)}}],lines:[{m:0,b:3,c:"red"}],pts:[[-1,3,"x = −1"],[5,3,"x = 5"]],cap:"|x − 2| = 3 → x = −1 or x = 5."})}
<div class="fbox">|A| = c:   c > 0 → two solutions · c = 0 → one · c < 0 → none</div>
<div class="eg"><div class="lab">EXAMPLE</div>|3x + 1| = −4 has <strong>no solution</strong> — an absolute value can never be negative.</div>
<h3>Inequalities: above or below the line</h3>
<ul><li>|x − 2| &lt; 3 → the part of the V <b>below</b> y = 3 → −1 &lt; x &lt; 5 (between).</li><li>|x − 2| &gt; 3 → the parts <b>above</b> → x &lt; −1 or x &gt; 5 (outside).</li></ul>
<div class="eg"><div class="lab">EXAMPLE — SAT style</div>How many solutions does |x + 3| − 5 = k have when k = −5? |x + 3| = 0 → exactly <strong>one</strong> (x = −3).</div>
${QC("How many solutions does |2x − 7| = 0 have?","1","Only 2x − 7 = 0.")}
`},
{id:"l3",t:"Piecewise functions",mins:12,h:`
<p>A <strong>piecewise function</strong> uses different rules for different parts of the input. Real life is full of them: taxi fares, tax brackets, shipping costs.</p>
<div class="fbox">f(x) =  2x + 1   if x < 3
        10 − x   if x ≥ 3</div>
<h3>Evaluating: first choose the right piece</h3>
<div class="eg"><div class="lab">EXAMPLE</div>f(1): 1 &lt; 3 → first rule → 2(1) + 1 = <strong>3</strong>.<br>f(3): 3 ≥ 3 → second rule → 10 − 3 = <strong>7</strong>.<br>f(8): second rule → <strong>2</strong>.</div>
${FIG.plane({r:6,fns:[{f:function(x){return x<3?2*x+1:NaN}},{f:function(x){return x>=3?10-x:NaN},c:"red"}],pts:[[3,7,"(3, 7)","red"]],cap:"Two pieces; at x = 3 the red rule applies (filled dot)."})}
<div class="tip"><b>Read the boundary carefully:</b> &lt; means the boundary value belongs to the other piece; ≤ or ≥ means it belongs to this one.</div>
<h3>In context</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A parking garage charges $5 for the first hour and $3 for each extra hour (up to a daily maximum of $20). Cost for 4 hours: 5 + 3·3 = $14. For 9 hours: 5 + 3·8 = 29 → capped at <strong>$20</strong>.</div>
<div class="eg"><div class="lab">ABSOLUTE VALUE IS PIECEWISE</div>|x| = x if x ≥ 0, and −x if x &lt; 0. That's why its graph has two straight pieces.</div>
${QC("Using f above, what is f(−2)?","-3","−2 < 3 → 2(−2) + 1.")}
`},
{id:"l4",t:"Distance, tolerance & real-world absolute value",mins:9,h:`
<p>On the SAT, absolute value almost always means <strong>distance</strong> or <strong>allowed error</strong>.</p>
<div class="eg"><div class="lab">TOLERANCE</div>A bag of rice should weigh 500 g, with an error of at most 8 g: |w − 500| ≤ 8 → <strong>492 ≤ w ≤ 508</strong>.</div>
<div class="eg"><div class="lab">DISTANCE</div>“The temperature differs from 20° by more than 5°” → |T − 20| &gt; 5 → T &lt; 15 or T &gt; 25.</div>
<div class="eg"><div class="lab">WRITING IT</div>“x is within 0.3 of 4.5” → |x − 4.5| ≤ 0.3. The centre goes inside with a minus; the allowed distance goes on the right.</div>
${NOTE("translate |x − a| as “the distance between x and a” out loud. Every absolute value question becomes a number-line picture.")}
${QC("A part must be 12 cm with tolerance 0.05 cm. What is the largest allowed length?","12.05","12 + 0.05.")}
`}]},"ineq");
more("abs",[N("Vertex y-value of y = |x − 1| + 7?","7","Vertex (1, 7)."),N("Vertex x-value of y = 3|x + 5| − 2?","-5","Inside x + 5 → left 5."),P("y = −|x| + 4 has a:",["minimum of 4","maximum of 4","minimum of −4","maximum of 0"],1,"Opens down from (0, 4)."),N("How many solutions: |x − 3| = −2?","0","Never negative."),N("f(x) = x² if x < 0, 3x if x ≥ 0. Find f(−4).","16","First piece."),N("Same f: find f(4).","12","Second piece.")],
[N("How many solutions: |x + 2| = 5?","2","x = 3 or −7."),N("Tolerance |w − 250| ≤ 4: smallest allowed w?","246","250 − 4."),P("|x − 6| < 2 means:",["4 < x < 8","x < 4 or x > 8","−8 < x < −4","x < 8"],0,"Within 2 of 6.")],
[C("y = a|x − h| + k","V-shape with vertex (h, k); a < 0 opens down."),C("|A| = c solutions","c > 0: two · c = 0: one · c < 0: none."),C("|x − a| < d","Between: a − d < x < a + d."),C("Piecewise","Pick the rule whose condition the input satisfies, then evaluate.")]);

L("func","l9","Inverse functions (an introduction)",10,`
<p>An <strong>inverse function</strong> undoes what the original function does. If f turns 3 into 11, then its inverse f⁻¹ turns 11 back into 3.</p>
<div class="fbox">if f(a) = b, then f⁻¹(b) = a          f⁻¹ swaps inputs and outputs</div>
<h3>Finding an inverse: swap and solve</h3>
<ol><li>Write y = f(x).</li><li>Swap x and y.</li><li>Solve for y.</li></ol>
<div class="eg"><div class="lab">EXAMPLE</div>f(x) = 3x + 2. Swap: x = 3y + 2 → y = (x − 2)/3. So f⁻¹(x) = (x − 2)/3. Check: f(4) = 14 and f⁻¹(14) = 4 ✓.</div>
<div class="eg"><div class="lab">FROM A TABLE</div>If a table shows f(5) = 9, then f⁻¹(9) = 5 — just read the table backwards.</div>
<div class="tip">The graph of f⁻¹ is the mirror image of f across the line y = x, because every point (a, b) becomes (b, a).</div>
<div class="trap"><b>Notation trap:</b> f⁻¹(x) is the inverse, NOT 1/f(x).</div>
${QC("f(x) = 2x − 6. Find f⁻¹(10).","8","2x − 6 = 10 → x = 8.")}
`);
L("data","l10","Comparing spread: range, IQR & standard deviation",10,`
<p>Two data sets can have the same mean and look completely different. <strong>Spread</strong> describes how far the values are scattered.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Set A: 48, 49, 50, 51, 52. Set B: 10, 30, 50, 70, 90. Both have mean 50 — but B is far more spread out.</div>
<table class="tbl" style="width:100%"><tr><td><b>Measure</b></td><td><b>What it shows</b></td><td><b>Outliers?</b></td></tr><tr><td>Range = max − min</td><td>total width</td><td>very sensitive</td></tr><tr><td>IQR = Q3 − Q1</td><td>width of the middle half</td><td>resistant</td></tr><tr><td>Standard deviation</td><td>typical distance from the mean</td><td>sensitive</td></tr></table>
<h3>SAT-style reasoning (no calculation needed)</h3>
<ul><li>Values clustered near the centre → <b>smaller</b> standard deviation.</li><li>Adding the same number to every value → spread <b>unchanged</b> (everything just shifts).</li><li>Multiplying every value by 3 → standard deviation and range are <b>tripled</b>.</li><li>Removing an outlier far from the mean → standard deviation <b>decreases</b>.</li></ul>
<div class="eg"><div class="lab">EXAMPLE</div>Every score in a class increases by 5 points. The mean goes up by 5; the standard deviation stays the <strong>same</strong>.</div>
${QC("Every value in a data set is doubled. The range was 7. What is the new range?","14","Spread scales by the same factor.")}
`);
more("func",[N("f(x) = 4x + 1. f⁻¹(21)?","5","4x + 1 = 21.")],[],[C("Inverse function","Swaps input and output: f(a) = b ⇔ f⁻¹(b) = a.")]);
more("data",[P("Adding 10 to every value changes the standard deviation by:",["+10","×10","nothing","−10"],2,"Shifting doesn't change spread.")],[],[C("Spread rules","Add c to all: spread same. Multiply by k: spread × k.")]);

(function(){var R=function(){return GEN.rnd()};function ri(a,b){return a+Math.floor(R()*(b-a+1))}function nz(a,b){var v;do{v=ri(a,b)}while(v===0);return v}function pk(a){return a[Math.floor(R()*a.length)]}
function f(n){return n<0?"−"+(-n):String(n)}function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}
function mc(q,right,wr,s){var o=[String(right)];wr.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});for(var i=o.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=o[i];o[i]=o[j];o[j]=t}return {t:"mc",q:q,c:o,a:o.indexOf(String(right)),s:s}}
var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}
add("abs","Vertex of an absolute value graph",function(d){var a=pk([1,2,3,-1,-2]),h=nz(-6,6),k=nz(-8,8),askX=R()<.5;
  return nm("What is the "+(askX?"x":"y")+"-coordinate of the vertex of y = "+(a===1?"":a===-1?"−":f(a))+"|x "+(h<0?"+ "+(-h):"− "+h)+"| "+(k<0?"− "+(-k):"+ "+k)+"?",askX?h:k,"y = a|x − h| + k has vertex (h, k). Inside the bars x "+(h<0?"+ "+(-h):"− "+h)+" → h = "+f(h)+" (sign flips); k = "+f(k)+". Vertex ("+f(h)+", "+f(k)+").")});
add("abs","Number of solutions",function(d){var c=pk([ri(1,9),0,-ri(1,9)]),a=ri(1,4),b=nz(-9,9),n=c>0?2:c===0?1:0;
  return mc("How many real solutions does |"+(a>1?a:"")+"x "+(b<0?"− "+(-b):"+ "+b)+"| = "+f(c)+" have?",String(n),["0","1","2","infinitely many"],"An absolute value equals "+f(c)+": "+(c>0?"positive → two solutions (inside = ±"+c+").":c===0?"zero → exactly one solution.":"negative → impossible, no solution."))});
add("abs","Piecewise evaluation",function(d){var b=ri(-2,4),m1=nz(-3,4),c1=nz(-5,5),m2=nz(-3,3),c2=nz(-9,9),x=pk([b-ri(1,4),b,b+ri(1,4)]),first=x<b,v=first?m1*x+c1:m2*x+c2;
  return nm("f(x) = "+(m1===1?"":m1===-1?"−":f(m1))+"x "+(c1<0?"− "+(-c1):"+ "+c1)+" if x < "+f(b)+", and f(x) = "+(m2===1?"":m2===-1?"−":f(m2))+"x "+(c2<0?"− "+(-c2):"+ "+c2)+" if x ≥ "+f(b)+". What is f("+f(x)+")?",v,f(x)+(first?" < ":" ≥ ")+f(b)+" → use the "+(first?"first":"second")+" rule: "+f(first?m1:m2)+"·("+f(x)+") "+((first?c1:c2)<0?"− "+(-(first?c1:c2)):"+ "+(first?c1:c2))+" = "+f(v)+".")});
add("func","Inverse functions",function(d){var m=nz(-5,6),b=nz(-9,9),x=nz(-6,8),y=m*x+b;
  return nm("f(x) = "+(m===1?"":m===-1?"−":f(m))+"x "+(b<0?"− "+(-b):"+ "+b)+". What is f⁻¹("+f(y)+")?",x,"f⁻¹("+f(y)+") is the input that gives "+f(y)+": "+f(m)+"x "+(b<0?"− "+(-b):"+ "+b)+" = "+f(y)+" → x = "+f(x)+".")});
add("data","Spread reasoning",function(d){var t=pk([["Every value in a data set is increased by 7.","stays the same",["increases by 7","is multiplied by 7","decreases"]],["Every value in a data set is multiplied by 3.","is multiplied by 3",["stays the same","increases by 3","is divided by 3"]],["An outlier far above all other values is removed.","decreases",["increases","stays the same","doubles"]]]);
  return mc(t[0]+" What happens to the standard deviation?",t[1],t[2],"Shifting all values doesn't change spread; scaling multiplies spread by the same factor; removing a far-away value reduces spread.")});
})();
T("Vertex of an absolute value graph","abs","l1","y = a|x − h| + k → vertex (h, k)",["Read h from inside the bars — flip its sign.","k is the number added outside.","a < 0 means the V opens down."],"Taking h with the same sign as written inside the bars.",["vertex","|"]);
T("Number of solutions","abs","l2","|A| = c: two if c > 0, one if c = 0, none if c < 0",["Isolate the absolute value.","Look at the sign of the other side."],"Solving a negative case anyway and getting fake answers.",["how many"]);
T("Piecewise evaluation","abs","l3","use the rule whose condition the input satisfies",["Compare the input with the boundary.","Watch < versus ≥ at the boundary itself.","Evaluate that rule only."],"Using the wrong piece at the boundary value.",["if x"]);
T("Inverse functions","func","l9","f(a) = b ⇔ f⁻¹(b) = a",["Set f(x) equal to the given number.","Solve for x — that is f⁻¹ of the number."],"Computing f(number) or 1/f(number) instead.",["f⁻¹"]);
T("Spread reasoning","data","l10","add c: spread same · multiply by k: spread × k",["Ask whether values were shifted, scaled or an outlier changed.","Apply the rule."],"Thinking adding to every value increases the standard deviation.",["standard deviation"]);
UICON.abs="vshape";
(function(){var D=DOMAINS.filter(function(x){return x.id==="adv"})[0];if(D&&D.units.indexOf("abs")<0)D.units.push("abs");
  UNITS.forEach(function(u){var l0=u.lessons.filter(function(l){return l.id==="l0"}),ws=u.lessons.filter(function(l){return l.id==="ws"}),rest=u.lessons.filter(function(l){return l.id!=="l0"&&l.id!=="ws"});u.lessons=l0.concat(rest,ws);
    u.cards.forEach(function(c,i){if(!c.k){c.k=u.id+"#"+i;c.uid=u.id}});u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id})});
  QB=null;QBI={};LPC={};})();
