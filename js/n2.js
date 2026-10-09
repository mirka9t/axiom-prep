/* =====================================================================
   ZERO TO 800 — CONTENT: Modeling real situations · Problem-solving toolkit
   ===================================================================== */
ICONS.model="M3 20h18 M5 16l4-5 4 3 6-8 M15 6h4v4";ICONS.toolkit="M3 8h18v12H3z M8 8V5h8v3 M3 13h18";

NEWUNIT({id:"model",em:"🚀",color:"#e4fbf1",title:"Modeling real situations",tag:"Turning real stories, tables and data into linear and exponential models — and reading what every number in a model means.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"From words to a model: the four questions",mins:11,h:`
<p>A <strong>model</strong> is an equation that describes something real: a phone bill, a growing population, a cooling cup of tea. Almost every SAT model is <b>linear</b> or <b>exponential</b>, and four questions tell you which one and how to build it.</p>
<ol><li><b>What changes?</b> That's the input (usually time t or a count n).</li><li><b>What do we measure?</b> That's the output (cost, height, population).</li><li><b>Where does it start?</b> The value when the input is 0.</li><li><b>How does it change?</b> By the same <em>amount</em> each step → linear. By the same <em>percent / factor</em> each step → exponential.</li></ol>
<div class="fbox">linear:       y = start + rate × t        (adds the same amount)
exponential:  y = start × factorᵗ        (multiplies by the same number)</div>
<div class="eg"><div class="lab">EXAMPLE</div>“A gym charges $40 to join and $25 per month.” Starts at 40, adds 25 each month → linear: <strong>C = 40 + 25m</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>“A town of 8,000 grows 3% per year.” Starts at 8,000, multiplies by 1.03 each year → exponential: <strong>P = 8000(1.03)ᵗ</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>“A car worth $20,000 loses $1,800 of value each year.” Same amount → linear: V = 20000 − 1800t. If it lost 9% each year → V = 20000(0.91)ᵗ.</div>
${NOTE("the words “per”, “each” and “every” with a fixed number mean linear. The word “percent” (or doubling, halving, tripling) means exponential. Circle those words first.")}
${QC("“A plant is 12 cm tall and grows 1.5 cm per week.” Height after 8 weeks?","24","12 + 1.5 × 8.")}
`},
{id:"l2",t:"Building a linear model from two points or a table",mins:12,h:`
<p>When the SAT gives you two data points instead of a story, the model is still y = mx + b — you just find m and b first.</p>
<h3>Step 1: the rate (slope) from two points</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A taxi ride of 4 miles costs $11.00 and a ride of 10 miles costs $21.50. Rate = (21.50 − 11.00) ÷ (10 − 4) = 10.50 ÷ 6 = <strong>$1.75 per mile</strong>.</div>
<h3>Step 2: the starting value</h3>
<p>Put one point into y = mx + b: 11.00 = 1.75 · 4 + b → b = 11.00 − 7.00 = <strong>$4.00</strong> (the fixed fee).</p>
<div class="fbox">Model: C = 1.75m + 4        check: 1.75 · 10 + 4 = 21.50 ✓</div>
<h3>From a table</h3>
<table class="tbl" style="width:100%"><tr><td>weeks w</td><td>2</td><td>5</td><td>8</td></tr><tr><td>savings S ($)</td><td>130</td><td>220</td><td>310</td></tr></table>
<p>Each 3 weeks adds $90 → rate $30/week. Start: 130 − 2·30 = 70. So <strong>S = 30w + 70</strong>.</p>
<div class="tip"><b>Units of the slope:</b> (units of y) per (unit of x) — dollars per mile, cm per week. If an answer choice describes the slope with the wrong units, it's wrong.</div>
<div class="trap"><b>Trap:</b> the table may skip values (2, 5, 8). Divide the change in y by the change in x — not by 1.</div>
${QC("A plumber charges $95 for a 1-hour job and $215 for a 4-hour job. What is the hourly rate?","40","(215 − 95) ÷ 3.")}
${QC("Same plumber: what is the fixed call-out fee?","55","95 − 40.")}
`},
{id:"l3",t:"Building an exponential model from data",mins:12,h:`
<p>For exponential data, look at <b>ratios</b> instead of differences.</p>
<table class="tbl" style="width:100%"><tr><td>years t</td><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><td>value</td><td>500</td><td>600</td><td>720</td><td>864</td></tr></table>
<p>600 ÷ 500 = 1.2, 720 ÷ 600 = 1.2, 864 ÷ 720 = 1.2 → constant factor 1.2. Model: <strong>V = 500(1.2)ᵗ</strong>, a 20% growth per year.</p>
<h3>When the points are not one step apart</h3>
<div class="fbox">factor per step  b = (y₂ ÷ y₁)^(1 ÷ (t₂ − t₁))</div>
<div class="eg"><div class="lab">EXAMPLE</div>A culture grows from 200 to 1,800 in 2 hours. 1800 ÷ 200 = 9 over 2 hours → b = 9^(1/2) = 3. It <strong>triples every hour</strong>: N = 200 · 3ᵗ.</div>
<h3>Doubling time and half-life</h3>
<div class="eg"><div class="lab">EXAMPLE</div>A medicine level halves every 6 hours, starting at 80 mg: A = 80(½)^(t/6). After 18 hours: 80 · ⅛ = <strong>10 mg</strong>.</div>
<h3>Finding the percent</h3>
<p>factor 1.2 → +20%; factor 0.85 → −15%; factor 3 → +200%.</p>
<div class="trap"><b>Trap:</b> growing from 100 to 121 in 2 years is 10% per year (1.1² = 1.21), not 10.5% and not 21%.</div>
${QC("A value grows from 400 to 900 in 2 years with the same factor each year. What is the yearly factor?","1.5","(900 ÷ 400)^(1/2) = √2.25 = 1.5.")}
`},
{id:"l4",t:"Interpreting & comparing models",mins:11,h:`
<p>Many SAT questions give you a finished model and ask what one number <em>means</em>. Read each part in plain words.</p>
<div class="eg"><div class="lab">LINEAR</div>T = 72 − 2.5m (temperature of a drink, m = minutes in the fridge).<br>• 72 → the temperature at the start (m = 0).<br>• −2.5 → it drops 2.5 degrees <b>each minute</b>.<br>• T = 47 when m = 10 → after 10 minutes it is 47 degrees.</div>
<div class="eg"><div class="lab">EXPONENTIAL</div>P = 1500(1.04)^(t/2).<br>• 1500 → the starting amount.<br>• 1.04 → grows 4% …<br>• t/2 → … <b>every 2 years</b>.</div>
<h3>Comparing two models</h3>
<p>A linear model adds; an exponential model multiplies. Over a long time, <b>exponential growth always overtakes linear growth</b>, even if it starts smaller.</p>
<div class="eg"><div class="lab">EXAMPLE</div>Plan A: 100 + 50t. Plan B: 100(1.3)ᵗ. At t = 1: 150 vs 130. At t = 4: 300 vs 285.6. At t = 5: 350 vs 371.3 — B passes A between years 4 and 5.</div>
<h3>When do two linear models meet?</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Company X: 30 + 0.5m. Company Y: 18 + 0.8m. Equal when 30 + 0.5m = 18 + 0.8m → 12 = 0.3m → <strong>m = 40</strong>.</div>
<div class="tip"><b>Domain sense:</b> time and counts can't be negative; a model may only make sense for, say, 0 ≤ t ≤ 10.</div>
${QC("In C = 2.75p + 12, what is the cost when p = 8?","34","22 + 12.")}
`}]},"advm");
more("model",[
P("“Grows by 6% each year” is best modeled by:",["linear","exponential","quadratic","constant"],1,"Percent growth → exponential."),
N("A model V = 3200(0.85)ᵗ: by what percent does V decrease each year?","15","1 − 0.85."),
N("Points (2, 19) and (6, 39) lie on a linear model. Rate of change?","5","20 ÷ 4."),
N("Same model: value at x = 0?","9","19 − 2·5."),
N("A value triples every 4 years from 50. Value after 8 years?","450","50 · 3²."),
N("Gym A: 20 + 15m; gym B: 50 + 10m. Months until equal cost?","6","5m = 30.")],
[N("A table: t = 1, 3, 5 → y = 11, 17, 23. y at t = 0?","8","Rate 3; 11 − 3."),N("From 250 to 1,000 in 2 hours (constant factor). Factor per hour?","2","√4."),P("In H = 180 − 6t (H in cm, t in days), 6 means:",["the start height","cm lost per day","days","total loss"],1,"Change per one day.")],
[C("Linear vs exponential","Same AMOUNT each step → linear. Same PERCENT/factor → exponential."),C("Rate from two points","(y₂ − y₁) ÷ (x₂ − x₁)."),C("Factor from two points","b = (y₂/y₁)^(1/(t₂ − t₁))."),C("a·b^(t/k)","Multiplies by b every k time units."),C("Long run","Exponential growth always overtakes linear.")]);

function TOOL(n,t,body){return '<div class="trapcard"><div class="tc-n" style="background:linear-gradient(135deg,var(--blue),var(--violet))">'+n+'</div><div><b>'+t+'</b><div class="tc-ex">'+body+'</div></div></div>'}
NEWUNIT({id:"solve",em:"🧭",color:"#eef0ff",title:"Problem-solving toolkit",tag:"What to do when you don't know what to do: the 4-step method, plugging in, backsolving, drawing, tables, patterns and working backwards.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"The 4-step method for any problem",mins:10,h:`
<p>Great problem-solvers are not people who instantly see the answer. They are people who know what to do <em>when they don't</em>. This four-step method comes from the mathematician George Pólya and works on every SAT question.</p>
${TOOL(1,"Understand","Read twice. Underline what's asked. Write down what you know, with units. Restate the question in your own words.")}
${TOOL(2,"Plan","Choose a tool: an equation, a picture, a table, plugging in numbers, backsolving, Desmos. Ask: have I seen a problem like this?")}
${TOOL(3,"Solve","Carry out the plan one line at a time. If it gets messy, step back and pick another tool — that's normal, not failure.")}
${TOOL(4,"Check","Does the answer make sense (size, sign, units)? Does it answer the exact question? Plug it back in.")}
<div class="eg"><div class="lab">EXAMPLE</div>“The sum of two numbers is 50 and one is 4 times the other. What is the larger?”<br>Understand: two numbers, sum 50, one = 4 × other; want the larger.<br>Plan: let the smaller be x → x + 4x = 50.<br>Solve: x = 10, larger = 40.<br>Check: 10 + 40 = 50 ✓, 40 = 4·10 ✓, they asked for the larger ✓ → <strong>40</strong>.</div>
${QC("Two numbers sum to 36; one is 5 times the other. The larger?","30","6x = 36.")}
`},
{id:"l2",t:"Plug in numbers & backsolve from the choices",mins:12,h:`
<h3>Plugging in numbers</h3>
<p>When the choices are expressions with letters, invent easy numbers for the letters, compute the answer, and see which choice gives the same number.</p>
<div class="eg"><div class="lab">EXAMPLE</div>“If a = 3b and b = 2c, then a = ?” Pick c = 1 → b = 2 → a = 6. The choice that equals 6 when c = 1 is <strong>6c</strong>.</div>
<div class="tip">Avoid 0 and 1 when they make several choices equal; numbers like 2, 3 or 10 work best. If two choices both match, try a second number.</div>
<h3>Backsolving</h3>
<p>When the choices are numbers, test them in the question. Start with a middle choice: if it's too big, go smaller; if too small, go bigger.</p>
<div class="eg"><div class="lab">EXAMPLE</div>“A number decreased by 30% and then increased by 50% gives 63. What is the number?” Choices: 50, 60, 70, 80. Try 60: 60 × 0.7 = 42, × 1.5 = 63 ✓ → <strong>60</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>“For which x is √(x + 7) = x − 5?” Choices 2, 9, 11, 14. Try 9: √16 = 4 and 9 − 5 = 4 ✓. (Backsolving also avoids extraneous answers automatically.)</div>
${NOTE("backsolving is not cheating — it's using the test's own information. Many 800 scorers backsolve two or three questions per module.")}
${QC("If x = 2y and y = 5z, x is how many times z?","10","z = 1 → y = 5 → x = 10.")}
`},
{id:"l3",t:"Draw it, table it, list it",mins:10,h:`
<p>Your brain solves pictures faster than paragraphs. Three ways to “see” a problem:</p>
${TOOL("A","Draw a picture","Geometry, distances, ladders, shadows, overlapping groups. Label every length you know and mark what you want with a “?”.")}
${TOOL("B","Make a table","Rates, mixtures, ages, ‘before and after’. Rows for each object, columns for each quantity.")}
${TOOL("C","Make an organised list","Counting problems with few cases. List systematically so you don't miss or repeat any.")}
<div class="eg"><div class="lab">DRAW IT</div>A 13-foot ladder reaches 12 feet up a wall. How far is its foot from the wall? Draw the right triangle: legs 12 and ?, hypotenuse 13 → <strong>5 feet</strong> (5-12-13).</div>
<div class="eg"><div class="lab">LIST IT</div>How many ways can you make 25 cents from dimes and nickels? (2 dimes + 1 nickel), (1 dime + 3 nickels), (0 dimes + 5 nickels) → <strong>3 ways</strong>.</div>
<div class="eg"><div class="lab">TABLE IT</div>“Ana is 10 years older than Ben. In 4 years she will be twice as old as he will be.” Table — now: Ana b + 10, Ben b; in 4 years: Ana b + 14, Ben b + 4. Equation from the last row: b + 14 = 2(b + 4) → b = 6. So Ben is 6 and <strong>Ana is 16</strong>.</div>“In 4 years Ana will be twice as old as Ben. Now she is 3 years older than him.” Table: now (b + 3, b); in 4 years (b + 7, b + 4). b + 7 = 2(b + 4) → b = −1?? Impossible — so reread: a table catches impossible stories and misreads quickly.</div>
${QC("A 10 m ramp rises 6 m. How long is its horizontal base?","8","6-8-10.")}
`},
{id:"l4",t:"Estimate, eliminate & test extremes",mins:9,h:`
<p>Before calculating, predict roughly what the answer should be. Then you can throw away choices that are impossible.</p>
<div class="eg"><div class="lab">ESTIMATE</div>“What is 19.8% of 503?” About 20% of 500 = 100. Choices 9.96, 99.6, 996, 0.996 → only <strong>99.6</strong> is close.</div>
<div class="eg"><div class="lab">ELIMINATE</div>A length must be positive; a probability must be between 0 and 1; a percent of a group can't exceed 100%. Cross those choices out first.</div>
<div class="eg"><div class="lab">EXTREMES</div>“If 0 &lt; x &lt; 1, which is greatest: x, x², √x, 1/x?” Test x = 0.25: 0.25, 0.0625, 0.5, 4 → <strong>1/x</strong>.</div>
<div class="tip">Testing extremes (a very small number, a very large one, a negative, a fraction between 0 and 1) answers most “which must be true?” questions.</div>
${QC("If 0 < x < 1, which is smallest: x, x², √x? Type x, x^2 or sqrt(x).",["x^2","x²"],"Try x = 0.25: x² = 0.0625 is smallest.")}
`},
{id:"l5",t:"Spot the pattern & work backwards",mins:10,h:`
<h3>Look for a pattern</h3>
<div class="eg"><div class="lab">EXAMPLE</div>What is the units digit of 7¹⁰⁰? Units digits of 7¹, 7², 7³, 7⁴: 7, 9, 3, 1, then it repeats every 4. 100 ÷ 4 leaves 0 → same as 7⁴ → <strong>1</strong>.</div>
<h3>Work backwards</h3>
<p>When you know the end and the steps, undo the steps in reverse order.</p>
<div class="eg"><div class="lab">EXAMPLE</div>“I took a number, doubled it, subtracted 7, and divided by 3 to get 11.” Backwards: 11 × 3 = 33, + 7 = 40, ÷ 2 = <strong>20</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A shop sells half its apples plus 2 more in the morning, then half of the rest plus 2 in the afternoon, leaving 5. Afternoon: before it there were (5 + 2) × 2 = 14. Morning: (14 + 2) × 2 = <strong>32 apples</strong> at the start.</div>
${NOTE("when you feel stuck, try a smaller version of the problem. Patterns appear on small numbers and then the big question becomes easy.")}
${QC("Doubled, plus 5, divided by 3 gives 9. The starting number?","11","9·3 = 27, − 5 = 22, ÷ 2 = 11.")}
`}]},"wp");
more("solve",[N("If m = 4n and n = 3k, m is how many times k?","12","k = 1 → n = 3 → m = 12."),N("Units digit of 3²⁰?","1","Cycle 3, 9, 7, 1 repeats every 4."),N("Tripled, minus 4, gives 26. The number?","10","(26 + 4) ÷ 3."),P("If 0 < x < 1, which is largest?",["x","x²","x³","√x"],3,"Try x = 0.25: √x = 0.5."),N("A 17 ft ladder's foot is 8 ft from a wall. Height reached?","15","8-15-17.")],
[N("Ways to make 30 cents with dimes and nickels (any number of each)?","4","3d, 2d+2n, 1d+4n, 6n."),N("Half of a number plus 6 is 20. The number?","28","(20 − 6) × 2.")],
[C("Pólya's 4 steps","Understand → Plan → Solve → Check."),C("Plug in numbers","Choices with letters → pick easy values and compare."),C("Backsolve","Choices with numbers → test them, start in the middle."),C("Test extremes","Try a tiny number, a big one, a negative and a fraction."),C("Work backwards","Undo the steps in reverse order.")]);

(function(){var R=function(){return GEN.rnd()};function ri(a,b){return a+Math.floor(R()*(b-a+1))}function pk(a){return a[Math.floor(R()*a.length)]}
function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}function mc(q,right,wr,s){var o=[String(right)];wr.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});for(var i=o.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=o[i];o[i]=o[j];o[j]=t}return {t:"mc",q:q,c:o,a:o.indexOf(String(right)),s:s}}
var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}
add("model","Linear model from two points",function(d){var m=pk([2,3,4,5,6,8,12,15]),b=ri(5,60),x1=ri(1,4),x2=x1+ri(2,6),ask=R()<.5;
  return nm("A linear model passes through ("+x1+", "+(m*x1+b)+") and ("+x2+", "+(m*x2+b)+"). What is its "+(ask?"rate of change (slope)":"value when x = 0")+"?",ask?m:b,"Rate = ("+(m*x2+b)+" − "+(m*x1+b)+") ÷ ("+x2+" − "+x1+") = "+m+". Start: "+(m*x1+b)+" − "+m+"·"+x1+" = "+b+".")});
add("model","Exponential model from data",function(d){var a=pk([50,100,200,300,500]),b=pk([2,3,1.5]),k=pk([2,3]);var v=a*Math.pow(b,k);
  return nm("A quantity grows by the same factor every hour, from "+a+" to "+v+" in "+k+" hours. What is the hourly factor?",b,"Factor per hour = ("+v+" ÷ "+a+")^(1/"+k+") = "+Math.pow(b,k)+"^(1/"+k+") = "+b+".")});
add("model","Interpreting model parameters",function(d){var s=ri(20,90),r=pk([2,3,4,5,1.5,2.5]),dec=R()<.5,thing=pk([["the temperature of a drink","minutes","degrees"],["the water in a tank","minutes","litres"],["a phone plan cost","months","dollars"]]);
  return mc("In the model y = "+s+(dec?" − ":" + ")+r+"t for "+thing[0]+" after t "+thing[1]+", what does "+r+" represent?",(dec?"the decrease":"the increase")+" in "+thing[2]+" each "+thing[1].replace(/s$/,""),["the starting amount in "+thing[2],"the total after "+r+" "+thing[1],"the number of "+thing[1]],"The number multiplied by t is the change per one unit of t: "+(dec?"it goes down by ":"it goes up by ")+r+" "+thing[2]+" each "+thing[1].replace(/s$/,"")+". "+s+" is the starting value.")});
add("model","When models meet",function(d){var m1=ri(2,9),m2=m1+ri(1,6),t=ri(3,20),b2=ri(5,40),b1=b2+(m2-m1)*t;
  return nm("Plan A costs "+b1+" + "+m1+"n and plan B costs "+b2+" + "+m2+"n. For what n do they cost the same?",t,b1+" + "+m1+"n = "+b2+" + "+m2+"n → "+(b1-b2)+" = "+(m2-m1)+"n → n = "+t+".")});
add("solve","Work backwards",function(d){var x=ri(3,30),m=ri(2,4),dv=pk([2,3,5]),a=ri(1,9);while((m*x+a)%dv)a++;var y=m*x+a;
  return nm("A number is multiplied by "+m+", then "+a+" is added, then the result is divided by "+dv+". The answer is "+(y/dv)+". What was the number?",x,"Undo in reverse: "+(y/dv)+" × "+dv+" = "+y+", − "+a+" = "+(y-a)+", ÷ "+m+" = "+x+".")});
add("solve","Units-digit patterns",function(d){var b=pk([2,3,7,8,4,9]),n=ri(10,99),cyc={2:[2,4,8,6],3:[3,9,7,1],7:[7,9,3,1],8:[8,4,2,6],4:[4,6],9:[9,1]}[b],dg=cyc[(n-1)%cyc.length];
  return nm("What is the units digit of "+b+"^"+n+"?",dg,"Units digits of powers of "+b+" repeat: "+cyc.join(", ")+" (cycle of "+cyc.length+"). "+n+" lands on position "+(((n-1)%cyc.length)+1)+" → "+dg+".")});
var A=GEN._S;function ref(u,n){var l=A[u]||[];for(var i=0;i<l.length;i++)if(l[i][0]===n)return l[i]}
[ref("wp","Age problems"),ref("wp","Consecutive integers"),ref("sys","Ticket & coin systems"),ref("func","Working backwards")].forEach(function(r){if(r)GEN._S.solve.push(r)});
})();
T("Linear model from two points","model","l2","m = Δy ÷ Δx · b = y − m·x",["Find the rate from the two points.","Substitute one point to get the start value.","Write y = mx + b and check with the other point."],"Dividing by 1 when the x-values are several steps apart.",["linear model","passes through"]);
T("Exponential model from data","model","l3","b = (y₂/y₁)^(1/steps)",["Divide the later value by the earlier one.","Take the root for the number of steps.","Write y = a · bᵗ."],"Dividing the total growth by the number of steps (that's linear thinking).",["factor"]);
T("Interpreting model parameters","model","l4","in y = b + mt: b = start, m = change per unit of t",["Find the number multiplied by t: that's the change per unit.","The constant is the value at t = 0.","Put the units into the sentence."],"Calling the rate the starting value (or the reverse).",["represent"]);
T("When models meet","model","l4","set the two expressions equal and solve",["Write both models.","Set them equal.","Solve for the input."],"Comparing only the starting values.",["same"]);
T("Work backwards","solve","l5","undo each step in reverse order",["List the steps in order.","Start from the result and apply the opposite operations backwards."],"Undoing the steps in the original order.",["then"]);
T("Units-digit patterns","solve","l5","units digits of powers repeat in short cycles",["Write the first few units digits until they repeat.","Use the remainder of the exponent ÷ cycle length."],"Using the exponent itself instead of its remainder.",["units digit"]);
UICON.model="model";UICON.solve="toolkit";
(function(){function ins(dom,id,after){var D=DOMAINS.filter(function(x){return x.id===dom})[0];if(!D||D.units.indexOf(id)>-1)return;var i=after?D.units.indexOf(after):D.units.length-1;D.units.splice(i+1,0,id)}
  ins("adv","model","advm");ins("alg","solve","wp");
  UNITS.forEach(function(u){u.cards.forEach(function(c,i){if(!c.k){c.k=u.id+"#"+i;c.uid=u.id}});u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id})});
  QB=null;QBI={};LPC={};})();
