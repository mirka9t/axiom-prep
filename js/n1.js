/* =====================================================================
   ZERO TO 800 — FINAL CONTENT
   Units: Measurement & unit conversions · Top 20 SAT traps · Digital SAT & test day
   ===================================================================== */
ICONS.ruler="M3 17 17 3l4 4L7 21z M7 13l2 2 M10 10l2 2 M13 7l2 2";
ICONS.trap="M12 3 2 20h20z M12 10v4 M12 17h.01";

/* ---------------- UNIT: Measurement ---------------- */
NEWUNIT({id:"meas",em:"📐",color:"#e2f3ff",title:"Measurement & unit conversions",tag:"Metric prefixes, US customary units, time, speed and temperature, and converting areas, volumes and rates — the hidden skill behind many word problems.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"The metric system & its prefixes",mins:11,h:`
<p>The metric system is built on powers of ten, which makes converting easy: you just move the decimal point. Every unit is a <strong>prefix</strong> plus a base unit: metre (length), gram (mass), litre (volume).</p>
<table class="tbl" style="width:100%"><tr><td><b>Prefix</b></td><td>kilo- (k)</td><td>hecto- (h)</td><td>deka- (da)</td><td><b>base</b></td><td>deci- (d)</td><td>centi- (c)</td><td>milli- (m)</td></tr>
<tr><td><b>Value</b></td><td>1000</td><td>100</td><td>10</td><td>1</td><td>0.1</td><td>0.01</td><td>0.001</td></tr></table>
<div class="tip"><b>The staircase rule:</b> going to a <em>smaller</em> unit (to the right) → the number gets <em>bigger</em>, multiply by 10 for each step. Going to a bigger unit → divide by 10 for each step.</div>
<div class="eg"><div class="lab">EXAMPLE</div>3.2 km to metres: km → m is three steps right → × 1000 → <strong>3,200 m</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>450 mL to litres: three steps left → ÷ 1000 → <strong>0.45 L</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>2.5 kg to grams: × 1000 → <strong>2,500 g</strong>. 75 cm to metres: ÷ 100 → <strong>0.75 m</strong>.</div>
<h3>Useful connections</h3>
<div class="fbox">1 mL = 1 cm³        1 L = 1,000 cm³        1 m³ = 1,000 L        1 kg of water ≈ 1 L</div>
<div class="trap"><b>Trap:</b> when converting to a smaller unit, the number must get larger. If 5 km became 0.005 m, you divided when you should have multiplied.</div>
${QC("Convert 0.8 km to metres.","800","× 1000.")}
${QC("Convert 2,300 mg to grams.","2.3","÷ 1000.")}
`},
{id:"l2",t:"US customary units",mins:10,h:`
<p>The SAT is American, so it uses inches, feet, pounds and gallons. These units don't follow powers of ten, so you must know the key facts.</p>
<table class="tbl" style="width:100%"><tr><td><b>Length</b></td><td>12 inches = 1 foot · 3 feet = 1 yard · 5,280 feet = 1 mile</td></tr>
<tr><td><b>Weight</b></td><td>16 ounces = 1 pound · 2,000 pounds = 1 ton</td></tr>
<tr><td><b>Volume</b></td><td>2 cups = 1 pint · 2 pints = 1 quart · 4 quarts = 1 gallon</td></tr>
<tr><td><b>Metric links</b></td><td>1 inch = 2.54 cm · 1 mile ≈ 1.61 km · 1 kg ≈ 2.2 pounds</td></tr></table>
<p>The SAT normally gives you the conversion fact inside the question when it's not one of the basic ones — read it carefully.</p>
<h3>The chain method</h3>
<p>Multiply by fractions equal to 1, arranged so the unwanted units cancel.</p>
<div class="eg"><div class="lab">EXAMPLE</div>How many inches in 2.5 yards? 2.5 yd × (3 ft / 1 yd) × (12 in / 1 ft) = <strong>90 in</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>How many cups in 3 gallons? 3 gal × 4 qt/gal × 2 pt/qt × 2 cups/pt = <strong>48 cups</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A 10-inch pipe in centimetres: 10 × 2.54 = <strong>25.4 cm</strong>.</div>
${QC("How many ounces in 3.5 pounds?","56","3.5 × 16.")}
${QC("How many feet in 4 yards and 2 feet?","14","12 + 2.")}
`},
{id:"l3",t:"Time, speed & temperature",mins:11,h:`
<div class="fbox">60 s = 1 min    60 min = 1 h    3,600 s = 1 h    24 h = 1 day    7 days = 1 week</div>
<div class="eg"><div class="lab">EXAMPLE</div>2.4 hours in hours and minutes: 0.4 h × 60 = 24 min → <strong>2 h 24 min</strong>. (Not 2 h 40 min!)</div>
<div class="trap"><b>Decimal hours trap:</b> 1.5 hours = 1 hour 30 minutes, because 0.5 × 60 = 30. Time is base 60, not base 100.</div>
<h3>Converting speeds</h3>
<div class="eg"><div class="lab">EXAMPLE</div>90 km/h to m/s: 90 × 1000 ÷ 3600 = <strong>25 m/s</strong>. Shortcut: km/h ÷ 3.6 = m/s.</div>
<div class="eg"><div class="lab">EXAMPLE</div>60 miles per hour = 1 mile per minute = 88 feet per second (60 × 5280 ÷ 3600).</div>
<h3>Temperature</h3>
<div class="fbox">F = (9/5)C + 32        C = (5/9)(F − 32)</div>
<div class="eg"><div class="lab">EXAMPLE</div>25 °C → (9/5)·25 + 32 = 45 + 32 = <strong>77 °F</strong>. 50 °F → (5/9)(18) = <strong>10 °C</strong>.</div>
<div class="tip">A change of 1 °C equals a change of 1.8 °F — that's the slope of the line F = 1.8C + 32, a common SAT question.</div>
${QC("Convert 3.25 hours to minutes.","195","3.25 × 60.")}
${QC("Convert 35 °C to °F.","95","63 + 32.")}
`},
{id:"l4",t:"Converting areas, volumes & rates",mins:12,h:`
<p>Squared and cubed units need the conversion factor squared or cubed. Rates need two conversions — one for the top unit and one for the bottom.</p>
<div class="fbox">1 m = 100 cm   →   1 m² = 10,000 cm²   →   1 m³ = 1,000,000 cm³
1 ft = 12 in    →   1 ft² = 144 in²     →   1 ft³ = 1,728 in³
1 yd = 3 ft     →   1 yd² = 9 ft²       →   1 yd³ = 27 ft³</div>
<div class="eg"><div class="lab">EXAMPLE</div>A room is 180 ft². How many square yards of carpet? 180 ÷ 9 = <strong>20 yd²</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A tank holds 2.5 m³. In litres: 2.5 × 1000 = <strong>2,500 L</strong>.</div>
<h3>Rates: convert the top and the bottom</h3>
<div class="eg"><div class="lab">EXAMPLE</div>Coffee costs $0.75 per ounce. Price per pound? $0.75/oz × 16 oz/lb = <strong>$12 per pound</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>A tap drips 12 mL per minute. Litres per day? 12 × 60 × 24 = 17,280 mL = <strong>17.28 L</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — density</div>Population 4,500 people on 1.5 km². Per square km = 3,000. Per hectare (1 km² = 100 ha) = <strong>30 per ha</strong>.</div>
${NOTE("write the units on every number and cross them out as they cancel. If the units left at the end aren't the ones asked for, you know before you calculate that the setup is wrong.")}
${QC("How many square inches in 5 square feet?","720","5 × 144.")}
${QC("$2.40 per pound = how many cents per ounce?","15","240 ÷ 16.")}
`}]},"ratio");
more("meas",[N("Convert 4.7 m to cm.","470","× 100."),N("Convert 3,500 mL to L.","3.5","÷ 1000."),N("Inches in 6 feet?","72","× 12."),N("Quarts in 5 gallons?","20","× 4."),N("Minutes in 2.75 hours?","165","× 60."),N("Convert 20 °C to °F.","68","36 + 32."),N("Cubic feet in 2 cubic yards?","54","× 27."),N("Convert 72 km/h to m/s.","20","÷ 3.6.")],
[N("Convert 0.06 kg to grams.","60","× 1000."),N("Square centimetres in 0.3 m²?","3000","× 10,000."),N("A car uses 8 L per 100 km. Litres for 350 km?","28","3.5 × 8."),P("2.2 hours equals:",["2 h 20 min","2 h 12 min","2 h 2 min","2 h 22 min"],1,"0.2 × 60 = 12 min."),N("Convert 104 °F to °C.","40","(5/9)(72).")],
[C("Metric staircase","kilo, hecto, deka, base, deci, centi, milli — ×10 per step down."),C("1 mL =","1 cm³. 1 L = 1,000 cm³. 1 m³ = 1,000 L."),C("Length (US)","12 in = 1 ft; 3 ft = 1 yd; 5,280 ft = 1 mi."),C("Volume (US)","2 cups = 1 pt; 2 pt = 1 qt; 4 qt = 1 gal."),C("°C ↔ °F","F = 1.8C + 32; C = (F − 32)/1.8."),C("Area conversion","Square the length factor: 1 ft² = 144 in²."),C("Decimal hours","0.1 h = 6 min.")]);

/* ---------------- UNIT: Top 20 SAT traps ---------------- */
function TRAP(n,title,ex,fix){return '<div class="trapcard"><div class="tc-n">'+n+'</div><div><b>'+title+'</b><div class="tc-ex">'+ex+'</div><div class="tc-fix"><b>Avoid it:</b> '+fix+'</div></div></div>'}
NEWUNIT({id:"traps",em:"⚠️",color:"#ffe6e0",title:"Top 20 SAT traps",tag:"The twenty mistakes that cost the most points — each with a real example and the habit that prevents it. The fastest way from 700 to 800.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"Reading traps (1–5)",mins:10,h:`
<p>The SAT writers know exactly where students slip. Many wrong answer choices are built from the most common mistakes, so a trap answer is always waiting for you. Learn the traps and they become free points.</p>
${TRAP(1,"Answering a different question","If 3x + 5 = 20, what is 2x? Many students stop at x = 5 and pick 5. The answer is 10.","Underline the exact thing being asked before you start. Check it again before you choose.")}
${TRAP(2,"Ignoring units","A speed is given in km/h but the question asks for metres per second; the trap choice is the km/h number.","Circle every unit in the question and write units next to every number you compute.")}
${TRAP(3,"Missing NOT / EXCEPT / LEAST","“Which of the following is NOT a solution?” — students pick the first valid solution they find.","When a question contains NOT, EXCEPT or LEAST, write the word on your scratch paper in capitals.")}
${TRAP(4,"Percent of the wrong thing","“20% of the students who passed” vs “20% of all students”.","Find the word after “of” — that's the whole you divide by or multiply.")}
${TRAP(5,"Rounding too early or to the wrong place","Rounding 2.346 to 2.3 halfway through gives a final answer that's slightly off; or giving the nearest tenth when hundredths were asked.","Keep full precision until the last step, and reread the rounding instruction.")}
${QC("If 4x − 3 = 21, what is x + 2?","8","x = 6, so x + 2 = 8 — not 6!")}
`},
{id:"l2",t:"Algebra traps (6–10)",mins:11,h:`
${TRAP(6,"Not distributing a minus sign","5 − (2x − 3) written as 5 − 2x − 3. Correct: 5 − 2x + 3.","A minus in front of a bracket changes the sign of EVERY term inside — put the new signs in before doing anything else.")}
${TRAP(7,"Forgetting to flip an inequality","−3x > 12 written as x > −4. Correct: x < −4.","Every time you multiply or divide by a negative, flip the sign — then test one number to be sure.")}
${TRAP(8,"Keeping an extraneous solution","√(x + 2) = x gives x = 2 or x = −1 after squaring; −1 doesn't work.","After squaring or clearing fractions, plug every answer back into the ORIGINAL equation.")}
${TRAP(9,"(a + b)² = a² + b²","(x + 4)² written as x² + 16. Correct: x² + 8x + 16.","Write the square as (x + 4)(x + 4) and multiply all four boxes.")}
${TRAP(10,"Cancelling terms instead of factors","(x + 6)/6 “simplified” to x. That's not allowed.","Only cancel things that are MULTIPLIED. Factor first, then cancel whole factors.")}
${QC("Solve −2x + 4 ≥ 10. Enter the boundary number (x ≤ ?).","-3","−2x ≥ 6 → x ≤ −3 (flip!).")}
`},
{id:"l3",t:"Number & percent traps (11–15)",mins:11,h:`
${TRAP(11,"Averaging rates directly","Going 30 mph and returning 60 mph doesn't average 45 mph; it's 40 mph.","Average speed = total distance ÷ total time. Work with totals.")}
${TRAP(12,"Adding successive percents","+20% then −20% is not 0%; it's −4%.","Multiply the multipliers: 1.2 × 0.8 = 0.96.")}
${TRAP(13,"Percent vs percentage points","4% → 5% is +1 percentage point but +25 percent.","Ask: does the question want the plain difference (points) or the relative change (percent)?")}
${TRAP(14,"Ratio part vs whole","Boys : girls = 2 : 3. The fraction of boys is 2/5, not 2/3.","Add the ratio parts to get the whole before writing a fraction.")}
${TRAP(15,"Rounding the wrong way in context","120 people, 50 per bus → 2.4 buses. Answer 3, not 2. But $50 at $15 each → 3 items, not 4.","“Need enough” → round up. “Can afford” → round down.")}
${QC("Boys : girls = 3 : 5. What fraction of the class are boys? (fraction)","3/8","3 ÷ (3 + 5).")}
`},
{id:"l4",t:"Geometry & data traps (16–20)",mins:11,h:`
${TRAP(16,"Radius vs diameter","A circle with diameter 10 has area 25π, not 100π.","Write “r = …” before using any circle formula.")}
${TRAP(17,"Scaling area and volume linearly","Doubling the sides of a square doubles the area? No — it multiplies it by 4. Volume by 8.","Lengths × k, areas × k², volumes × k³.")}
${TRAP(18,"Trusting the picture","A figure that looks like a right angle may not be one, unless it's marked or stated.","Use only what's marked or written. If it says “not drawn to scale”, the picture can lie.")}
${TRAP(19,"Correlation means causation","Cities with more ice-cream sales have more drownings. Ice cream doesn't cause drowning; summer causes both.","Only a randomized experiment can show cause and effect.")}
${TRAP(20,"Mean vs median with an outlier","Salaries 30k, 32k, 35k, 400k: the mean (≈124k) is not ‘typical’; the median (33.5k) is.","When there's an extreme value, the median describes the centre better and changes much less.")}
${NOTE("print this unit (download icon) and read it the night before every practice test. Students who do this cut their careless mistakes roughly in half.")}
${QC("A circle has diameter 14. Its area is kπ. Enter k.","49","r = 7.")}
`}]},"hard");
more("traps",[N("If 2x + 7 = 19, what is 3x?","18","x = 6."),P("5 − (3x − 4) equals:",["5 − 3x − 4","1 − 3x","9 − 3x","9 + 3x"],2,"5 − 3x + 4."),N("Up 25% then down 20%: overall percent change?","0","1.25 × 0.8 = 1."),N("Square side tripled: area multiplied by?","9","3²."),N("Data 2, 3, 3, 4, 48: median?","3","Middle value.")],
[N("If 5x − 2 = 18, what is x − 1?","3","x = 4."),N("Cats : dogs = 4 : 5. What fraction of the animals are dogs? (fraction)","5/9","Whole = 4 + 5 = 9 parts; dogs are 5 of them.")],
[C("Trap #1","Answer the exact question asked (x vs 2x)."),C("Trap #7","Flip the inequality when × or ÷ by a negative."),C("Trap #9","(a + b)² = a² + 2ab + b²."),C("Trap #12","Successive % changes multiply."),C("Trap #16","Use the RADIUS in πr²."),C("Trap #19","Correlation is not causation.")]);

/* ---------------- UNIT: Digital SAT & test day ---------------- */
NEWUNIT({id:"satday",em:"🎓",color:"#efe7ff",title:"The digital SAT: format & test day",tag:"How the digital SAT is built, how adaptive scoring works, the tools on screen, an 8-week plan and a test-day checklist.",prac:[],quiz:[],cards:[],lessons:[
{id:"l1",t:"The digital SAT at a glance",mins:9,h:`
<p>Knowing exactly what you'll face removes half the stress. Here is the structure of the digital SAT.</p>
<table class="tbl" style="width:100%"><tr><td><b>Section</b></td><td><b>Modules</b></td><td><b>Questions</b></td><td><b>Time</b></td></tr>
<tr><td>Reading & Writing</td><td>2</td><td>54 (27 + 27)</td><td>64 min (32 + 32)</td></tr>
<tr><td>Math</td><td>2</td><td>44 (22 + 22)</td><td>70 min (35 + 35)</td></tr></table>
<p>There's a 10-minute break between the two sections. Each section is scored from 200 to 800, for a total from 400 to 1600.</p>
<h3>The math section in numbers</h3>
<ul><li>About <b>35%</b> Algebra, <b>35%</b> Advanced Math, <b>15%</b> Problem-Solving & Data Analysis, <b>15%</b> Geometry & Trigonometry.</li>
<li>Most questions are multiple choice with 4 options; about a quarter are <b>student-produced responses</b> where you type the answer.</li>
<li>A few questions in each module are unscored “pretest” questions — you can't tell which, so treat every question seriously.</li>
<li>There is <b>no penalty for wrong answers</b>. Never leave a question blank.</li>
<li>That's roughly <b>1 minute 35 seconds per question</b>.</li></ul>
${QC("How many math questions are on the digital SAT in total?","44","22 + 22.")}
`},
{id:"l2",t:"How adaptive scoring works",mins:8,h:`
<p>The digital SAT is <strong>adaptive by module</strong>. Everyone gets a similar first module with easy, medium and hard questions. Your performance on Module 1 decides which version of Module 2 you receive.</p>
<ul><li>Strong Module 1 → a <b>harder</b> Module 2, which unlocks the top scores.</li><li>Weaker Module 1 → an easier Module 2, which limits how high the score can go.</li></ul>
<div class="tip"><b>What this means for you:</b> accuracy in Module 1 matters a lot. Don't rush Module 1 to “save time” — careless mistakes there can cap your score.</div>
<p>Harder questions are generally worth more toward your scaled score than easier ones, but every question on the screen counts the same for you in the moment: answer the easy ones correctly first, flag the hard ones, return later.</p>
<p>The <b>Practice Tests</b> page in this app copies this structure: two modules, with Module 2 chosen by your Module 1 result.</p>
${QC("Does a wrong answer lose points on the digital SAT? Type yes or no.","no","There is no guessing penalty.")}
`},
{id:"l3",t:"Bluebook, Desmos & the tools on screen",mins:9,h:`
<p>The test is taken in College Board's <b>Bluebook</b> app on a laptop or tablet. Install it early and try the official practice tests inside it — they are free and are the closest thing to the real exam.</p>
<ul><li><b>Desmos graphing calculator</b> is built into every math question (you may also bring an approved calculator).</li>
<li><b>Reference sheet</b> with area, volume and triangle formulas — the same facts as in this app's reference button.</li>
<li><b>Mark for review</b> to flag questions and come back.</li>
<li><b>Answer eliminator</b> to cross out choices — exactly like the strike tool in this app's Question Bank.</li>
<li><b>Timer</b> you can hide, which shows a warning near the end.</li></ul>
<div class="tip">Practice with these tools before test day. Skill with Desmos alone can save several minutes per module.</div>
`},
{id:"l4",t:"Your 8-week plan to test day",mins:10,h:`
<p>A plan beats motivation. Here is a proven 8-week structure using this app. (The <b>Study plan</b> page builds a personal version from your test date.)</p>
<table class="tbl" style="width:100%"><tr><td><b>Weeks</b></td><td><b>Focus</b></td></tr>
<tr><td>1–2</td><td>Foundations: Numbers, GCF & LCM, Fractions, Percentages, Ratios, Equations from zero.</td></tr>
<tr><td>3–4</td><td>Algebra: expressions, factoring, inequalities, lines, systems, word problems.</td></tr>
<tr><td>5–6</td><td>Advanced Math, Data, Probability, Geometry & Trigonometry.</td></tr>
<tr><td>7</td><td>The 800 zone, SAT traps, Desmos; two full practice tests with full review.</td></tr>
<tr><td>8</td><td>Light review: mistakes, flashcards, formula sheet; one last practice test early in the week.</td></tr></table>
<h3>Every day</h3>
<ol><li>One or two lessons (pages + check yourself).</li><li>15–20 practice questions.</li><li>5 minutes of Review: mistakes, smart flashcards, remember forever.</li></ol>
${NOTE("the score you get on test day is mostly built in the weeks you reviewed your mistakes, not in the weeks you learned new topics.")}
`},
{id:"l5",t:"The last week & test-day checklist",mins:8,h:`
<h3>The last week</h3>
<ul><li>No new topics in the last 2–3 days. Review formulas, traps and your mistake list.</li><li>Sleep 8 hours for several nights in a row — memory and focus depend on it.</li><li>Confirm the test location and how you'll get there.</li></ul>
<h3>The night before</h3>
<ul><li>Charge your device fully; make sure Bluebook is updated and your exam setup is complete.</li><li>Prepare: photo ID, admission ticket, charger, approved calculator, pencils, water, a snack.</li><li>Read the Top 20 traps once, then stop studying.</li></ul>
<h3>Test morning</h3>
<ul><li>Eat breakfast. Arrive early.</li><li>In each module: do every question you're sure of first, flag the rest, then return. Never leave blanks.</li><li>If you feel panic: breathe in for 4 seconds, out for 6, three times. Then read the next question slowly.</li></ul>
<div class="tip">Always check the official College Board website for the latest rules about ID, devices and what you may bring — they are the final authority.</div>
${QC("How many minutes do you get for each math module?","35","Two modules × 35 minutes.")}
`}]},"traps");
more("satday",[P("Total digital SAT score range:",["200–800","400–1600","0–1600","400–1200"],1,"Two sections of 200–800."),P("What decides your Module 2 difficulty?",["your PSAT","Module 1 performance","random","Reading score"],1,"Adaptive by module."),N("Approximate seconds per math question (70 min / 44)?","95","4200 ÷ 44 ≈ 95.")],
[P("Which tool is built into every math question?",["Wolfram Alpha","Desmos","a protractor","nothing"],1,"Desmos graphing calculator.")],
[C("Digital SAT math","2 modules × 22 questions × 35 minutes."),C("Guessing penalty","None — never leave a blank."),C("Adaptive","Module 1 performance decides Module 2 difficulty."),C("Domains","35% Algebra, 35% Advanced, 15% Data, 15% Geometry/Trig.")]);

/* ---------------- generators & tips ---------------- */
(function(){
var R=function(){return GEN.rnd()};function ri(a,b){return a+Math.floor(R()*(b-a+1))}function pk(a){return a[Math.floor(R()*a.length)]}
function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}function r4(x){return Math.round(x*10000)/10000}
var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}
add("meas","Metric conversions",function(d){var P=[["km","m",1000],["m","cm",100],["m","mm",1000],["kg","g",1000],["L","mL",1000],["g","mg",1000],["cm","mm",10]],p=pk(P),v=ri(2,99)/(R()<.5?10:1),down=R()<.5;
  return down?nm("Convert "+v+" "+p[0]+" to "+p[1]+".",r4(v*p[2]),"1 "+p[0]+" = "+p[2]+" "+p[1]+". Smaller unit → bigger number: × "+p[2]+" = "+r4(v*p[2])+"."):nm("Convert "+r4(v*p[2])+" "+p[1]+" to "+p[0]+".",v,"Bigger unit → smaller number: ÷ "+p[2]+" = "+v+".")});
add("meas","US customary conversions",function(d){var P=[["feet","inches",12],["yards","feet",3],["pounds","ounces",16],["gallons","quarts",4],["quarts","pints",2],["pints","cups",2],["yards","inches",36]],p=pk(P),v=ri(2,15);
  return nm("How many "+p[1]+" are in "+v+" "+p[0]+"?",v*p[2],"1 "+p[0].replace(/s$/,"").replace("feet","foot")+" = "+p[2]+" "+p[1]+", so "+v+" × "+p[2]+" = "+(v*p[2])+".")});
add("meas","Time & speed conversions",function(d){if(R()<.5){var h=ri(1,5)+pk([.1,.2,.25,.4,.5,.75]);return nm("How many minutes are in "+h+" hours?",Math.round(h*60),h+" × 60 = "+Math.round(h*60)+" minutes. (Time is base 60!)")}
  var k=pk([18,36,54,72,90,108]);return nm("Convert "+k+" km/h to m/s.",k/3.6,k+" × 1000 ÷ 3600 = "+(k/3.6)+" m/s (shortcut: ÷ 3.6).")});
add("meas","Temperature conversions",function(d){if(R()<.5){var c=5*ri(-4,8);return nm("Convert "+c+" °C to °F.",1.8*c+32,"F = 1.8C + 32 = "+(1.8*c)+" + 32 = "+(1.8*c+32)+".")}var f=9*ri(4,12)+32-36;var cc=(f-32)/1.8;return nm("Convert "+f+" °F to °C.",Math.round(cc*100)/100,"C = (F − 32) ÷ 1.8 = "+(f-32)+" ÷ 1.8 = "+Math.round(cc*100)/100+".")});
add("meas","Area & volume units",function(d){var P=[["square feet","square inches",144],["square yards","square feet",9],["cubic yards","cubic feet",27],["square metres","square centimetres",10000],["cubic metres","litres",1000]],p=pk(P),v=ri(2,12);
  return nm("How many "+p[1]+" are in "+v+" "+p[0]+"?",v*p[2],"For area/volume, square/cube the length factor: 1 "+p[0].replace(/s$/,"").replace("square feet","square foot").replace("cubic feet","cubic foot")+" = "+p[2]+" "+p[1]+". "+v+" × "+p[2]+" = "+(v*p[2])+".")});
var A=GEN._S;function ref(u,n){var l=A[u]||[];for(var i=0;i<l.length;i++)if(l[i][0]===n)return l[i]}
GEN._S.traps=[ref("alg","Two-step equations"),ref("ineq","Solving inequalities"),ref("exp","Radical equations"),ref("poly","Special products"),ref("pct","Successive changes"),ref("pct","Percentage points"),ref("ratio","Splitting in a ratio"),ref("geo2","Circle area & circumference"),ref("geo1","Similar triangles"),ref("data","Median")].filter(Boolean);
})();
T("Metric conversions","meas","l1","kilo 1000 · hecto 100 · deka 10 · base · deci 0.1 · centi 0.01 · milli 0.001",["Find how many steps apart the units are.","To a smaller unit multiply by 10 per step; to a larger unit divide.","Check: smaller unit ⇒ bigger number."],"Moving the decimal point the wrong way.",["convert"]);
T("US customary conversions","meas","l2","12 in = 1 ft · 3 ft = 1 yd · 16 oz = 1 lb · 4 qt = 1 gal · 2 pt = 1 qt · 2 c = 1 pt",["Write the conversion fact as a fraction.","Arrange it so the old unit cancels.","Multiply."],"Dividing when you should multiply (or the reverse).",["how many"]);
T("Time & speed conversions","meas","l3","60 min = 1 h · km/h ÷ 3.6 = m/s",["Remember time is base 60.","For speeds convert the distance unit and the time unit separately."],"Reading 1.5 h as 1 h 50 min.",["hours","km/h"]);
T("Temperature conversions","meas","l3","F = 1.8C + 32 · C = (F − 32)/1.8",["Pick the right formula for the direction.","Follow the order of operations."],"Adding 32 before multiplying.",["°"]);
T("Area & volume units","meas","l4","square the length factor for area, cube it for volume",["Find the length conversion.","Square (area) or cube (volume) it.","Multiply."],"Using 12 instead of 144 for square feet to square inches.",["square","cubic"]);

/* register */
UICON.meas="ruler";UICON.traps="trap";UICON.satday="cap";
(function(){function ins(dom,id,after){var D=DOMAINS.filter(function(x){return x.id===dom})[0];if(!D||D.units.indexOf(id)>-1)return;var i=after?D.units.indexOf(after):D.units.length-1;D.units.splice(i+1,0,id)}
  ins("psda","meas","ratio");ins("pro","traps","hard");ins("pro","satday","traps");
  UNITS.forEach(function(u){u.cards.forEach(function(c,i){if(!c.k){c.k=u.id+"#"+i;c.uid=u.id}});u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id})});
  QB=null;QBI={};LPC={};})();
