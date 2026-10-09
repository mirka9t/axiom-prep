/* =====================================================================
   AXIOM — Copybook notes 3: inequalities · absolute value · lines ·
   systems · word problems · problem-solving toolkit
   ===================================================================== */

/* ---------------- Inequalities ---------------- */
CB("ineq","l1",{t:"Inequalities: the flip rule",
  f:["−2x > 6 ⟹ x \\c2{<} −3"],fl:"× or ÷ by a negative → flip",
  h:["Solve an inequality exactly like an equation — with **one** extra rule.","When you **multiply or divide by a negative number**, turn the sign around (< becomes >).","Adding or subtracting never flips anything.","Test one number at the end: if x = −4 should work, plug it in and see."],
  pic:FIG.numline(-6,2,{rays:[{v:-3,dir:"left",closed:false,c:"blue"}],cap:"x < −3: open dot at −3 (not included), arrow to the left."}),
  k:[["at least","≥"],["at most / no more than","≤"],["more than","&gt;"],["fewer than","&lt;"]],
  tr:"Negative number = **mirror**. Multiplying by one flips the whole picture, so the sign flips too.",
  w:"Only multiplying/dividing by a **negative** flips. `3x < 12` → `x < 4`, no flip.",
  ex:[["Solve `−2x + 1 < 7`",["Subtract 1: `−2x < 6`","Divide by −2 and **flip**: `x > −3` // dividing by a negative","Test x = 0: `−2(0) + 1 = 1 < 7` ✓"],"x > −3"],
      ["You have $50. Notebooks cost $3.75. At most how many can you buy?",["`3.75n ≤ 50` → `n ≤ 13.33…`","You can't buy part of a notebook → round **down**"],"13"]]});

CB("ineq","l2",{t:"Absolute value = distance",
  f:["|A| = b ⟹ A = b \\t{ or } A = −b","|x − a| \\t{ = distance between } x \\t{ and } a"],
  h:["`|x|` is the distance from 0, so it's never negative.","`|x − 3| = 5` asks: which numbers are **5 away from 3**? Answer: 8 and −2.","Equations give **two cases**: the inside equals +b or −b.","`|A| = −4` has **no** solution — a distance can't be negative."],
  pic:FIG.numline(-4,10,{marks:[{v:3,label:"3",c:"ink"},{v:8,label:"8",c:"red"},{v:-2,label:"−2",c:"red"}],jumps:[{from:3,to:8,label:"5 away",c:"grn"},{from:3,to:-2,label:"5 away",c:"grn"}],cap:"|x − 3| = 5: the two numbers 5 steps from 3."}),
  tr:"Read `|x − a|` as “**how far x is from a**”. Then picture the number line.",
  w:"Get the bars **alone** first: `2|x| + 1 = 9` → `|x| = 4` → x = ±4.",
  ex:[["Solve `|x + 2| = 6`",["Case +: `x + 2 = 6` → `x = 4`","Case −: `x + 2 = −6` → `x = −8`"],"x = 4 or x = −8"],
      ["Solve `3|x − 1| − 2 = 10`",["Isolate the bars: `3|x − 1| = 12` → `|x − 1| = 4`","`x − 1 = 4` → 5, or `x − 1 = −4` → −3"],"x = 5 or x = −3"]]});

CB("ineq","l3",{t:"Compound & absolute value inequalities",
  f:["|x − a| < d ⟹ a − d < x < a + d","|x − a| > d ⟹ x < a − d \\t{ or } x > a + d"],
  h:["A **compound** inequality squeezes x between two numbers: do every step to **all three parts**.","**And** (between) → one connected piece on the number line. **Or** (outside) → two arrows going apart.","`|x − a| < d` → x is **within d of a** (between). `|x − a| > d` → x is **more than d away** (outside)."],
  pic:FIG.numline(-4,5,{segs:[{a:-2,b:3,ca:false,cb:true,c:"blue"}],cap:"−2 < x ≤ 3: open dot at −2, filled dot at 3."}),
  tr:"**Less than → less-and → between. Greater than → great-or → outside.**",
  w:"Filled dot ● for ≤ or ≥ (the number is included). Open dot ○ for < or >.",
  ex:[["Solve `−3 < 2x + 1 ≤ 7`",["Subtract 1 from all three parts: `−4 < 2x ≤ 6`","Divide all three by 2: `−2 < x ≤ 3`"],"−2 < x ≤ 3"],
      ["A part must be 50 mm, give or take 0.2 mm. Write and solve.",["“Within 0.2 of 50”: `|L − 50| ≤ 0.2`","Between: `50 − 0.2 ≤ L ≤ 50 + 0.2`"],"49.8 ≤ L ≤ 50.2"]]});

CB("ineq","l4",{t:"Inequality word problems & shaded graphs",
  f:["y > mx + b \\t{: shade above} || y < mx + b \\t{: shade below}"],
  h:["Budget questions (“can afford”, “at most”) → round the answer **down**. Need questions (“at least”, “enough”) → round **up**.","A two-variable inequality is a **shaded region**: all the points that make it true.","Dashed line for < or >, solid line for ≤ or ≥.","To check a point: plug it in — if the statement is true, the point is in the region."],
  pic:FIG.plane({r:5,lines:[{m:2,b:-1,dash:"9 7"}],shade:[{m:2,b:-1,above:true}],pts:[[0,3,"(0, 3) ✓","grn"],[3,0,"(3, 0) ✗","red"]],cap:"y > 2x − 1: everything above the dashed line."}),
  tr:"Pick the test point **(0, 0)** if the line doesn't pass through it — easiest arithmetic ever.",
  w:"130 students, 40 per bus: 3.25 buses means you need **4** buses, not 3.",
  ex:[["130 students; each bus holds 40. Minimum buses?",["`130 ÷ 40 = 3.25`","3 buses leave students behind → round **up**"],"4 buses"],
      ["Is (1, 4) a solution of `y ≥ x + 2`?",["Plug in: `4 ≥ 1 + 2` → `4 ≥ 3`","True ✓"],"yes"]]});

CB("ineq","l5",{t:"Reading inequality graphs & phrases",
  f:["○ \\t{not included} (<, >) || ● \\t{included} (≤, ≥)"],
  h:["On a number line, the **dot** tells you about the endpoint and the **arrow** tells you the direction.","Arrow pointing right → greater than. Arrow pointing left → less than.","A shaded piece between two dots → a compound “and” inequality."],
  pic:FIG.numline(-2,8,{rays:[{v:5,dir:"left",closed:true,c:"blue"}],cap:"Filled dot at 5, arrow left: x ≤ 5."}),
  k:[["no more than","≤"],["no less than","≥"],["exceeds","&gt;"],["below","&lt;"],["minimum","≥"],["maximum","≤"]],
  tr:"The inequality sign points like an arrow: x < 3 points **left** on the number line.",
  w:"“No less than 18” means 18 or more: `≥ 18`.",
  ex:[["Write the graph: open dot at −1, arrow to the right.",["Open dot → −1 not included → strict sign","Arrow right → greater"],"x > −1"],
      ["“A ride needs riders at least 120 cm tall.” Inequality?",["“At least” → 120 or more","Height h"],"h ≥ 120"]]});

/* ---------------- Absolute value & piecewise ---------------- */
CB("abs","l1",{t:"The graph of y = |x| and its moves",
  f:["y = a|x − h| + k \\t{: vertex} (h, k)"],
  h:["`y = |x|` is a **V** with its point (vertex) at (0, 0).","Inside the bars: `x − h` slides it **right** h (backwards from what it looks like).","Outside: `+ k` lifts it **up** k.","`a` changes the steepness; a negative a flips the V upside down (Λ)."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return Math.abs(x)},c:"ink2",dash:"6 6"},{f:function(x){return Math.abs(x-2)+1}}],pts:[[2,1,"vertex (2, 1)","vio"]],cap:"y = |x − 2| + 1: the V moved right 2 and up 1."}),
  tr:"**Inside moves sideways and backwards; outside moves up and down normally.**",
  w:"`|x + 3|` moves the V **left** 3, not right.",
  ex:[["Find the vertex of `y = |x + 4| − 5`",["Inside: `x + 4` → h = −4 (left 4)","Outside: `−5` → down 5"],"(−4, −5)"],
      ["Does `y = −2|x| + 3` open up or down? What's its highest point?",["a = −2 is negative → upside-down V","Vertex: (0, 3), so the highest point is y = 3"],"down, max 3"]]});

CB("abs","l2",{t:"Absolute value on a graph",
  f:["|x − 1| = 3 \\t{ ⟺ where } y = |x − 1| \\t{ meets } y = 3"],
  h:["Solving an equation = finding where two graphs **cross**.","Draw the V and a horizontal line: the crossing points are the solutions.","An inequality like `|x − 1| < 3` = where the V is **below** the line (between the crossings)."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return Math.abs(x-1)}}],lines:[{m:0,b:3,c:"red"}],pts:[[-2,3,"x = −2","red"],[4,3,"x = 4","red"]],cap:"The V meets y = 3 at x = −2 and x = 4."}),
  tr:"Below the line → **between** the two crossings. Above → **outside** them.",
  w:"If the line is below the vertex, they never meet → no solution.",
  ex:[["Solve `|x − 1| = 3` from the graph.",["Draw `y = |x − 1|` (vertex at 1) and the line `y = 3`","They cross at x = −2 and x = 4"],"x = −2 or x = 4"],
      ["Solve `|x − 1| < 3`.",["The V is below y = 3 between the crossings"],"−2 < x < 4"]]});

CB("abs","l3",{t:"Piecewise functions",
  f:["f(x) = \\t{one rule if } x < c, \\t{another rule if } x ≥ c"],
  h:["A **piecewise** function uses **different rules on different parts** of the x-axis.","To evaluate: first look at x and choose the **right piece**, then use only that rule.","Real life: phone plans, taxes, parking fees — the price rule changes after a certain point."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x<1?x+2:NaN}},{f:function(x){return x>=1?5-x:NaN},c:"red"}],cap:"Blue rule for x < 1, red rule for x ≥ 1."}),
  tr:"**Where am I?** first, **what's the rule?** second.",
  w:"Check the boundary carefully: is it < or ≤? The point belongs to exactly one piece.",
  ex:[["`f(x) = 2x + 1` if x < 3, `f(x) = 10 − x` if x ≥ 3. Find f(3).",["x = 3 fits “x ≥ 3” → second rule","`f(3) = 10 − 3`"],"7"],
      ["Parking: $4 for up to 2 hours, then $3 per extra hour. Cost for 5 hours?",["First 2 hours: $4","Extra hours: `5 − 2 = 3` → `3 × 3 = 9`","Total: `4 + 9`"],"$13"]]});

CB("abs","l4",{t:"Tolerance & real-world absolute value",
  f:["|\\t{actual} − \\t{target}| ≤ \\t{tolerance}"],
  h:["“Within”, “give or take”, “off by at most” — these words mean an absolute value inequality.","The **target** goes inside the bars with the variable; the **allowed error** goes on the other side.","Solve it as a “between” inequality."],
  pic:FIG.numline(46,54,{segs:[{a:48,b:52,ca:true,cb:true,c:"grn"}],marks:[{v:50,label:"target 50",c:"blue"}],cap:"|w − 50| ≤ 2: anything from 48 to 52 passes."}),
  tr:"Target in the middle, tolerance either side: **target ± tolerance**.",
  w:"The answer is a **range**, not a single number.",
  ex:[["A bag should weigh 500 g, within 15 g. Write and solve.",["`|w − 500| ≤ 15`","`500 − 15 ≤ w ≤ 500 + 15`"],"485 ≤ w ≤ 515"],
      ["Which inequality means “t is more than 3 away from 20”?",["“More than … away” → outside → `>`"],"`|t − 20| > 3`"]]});

/* ---------------- Lines & slope ---------------- */
CB("lines","l1",{t:"Slope",
  f:["m = \\f{y_{2} − y_{1}}{x_{2} − x_{1}} = \\f{\\t{rise}}{\\t{run}}"],
  h:["**Slope** = steepness = how much y changes when x goes up by 1.","Pick two points and divide **up/down change** by **left/right change**.","Positive slope → uphill. Negative → downhill. 0 → flat. Vertical lines have **no** slope (undefined)."],
  pic:FIG.plane({r:6,lines:[{m:3,b:-1}],slope:[1,2,3,8],pts:[[1,2,"(1, 2)"],[3,8,"(3, 8)"]],cap:"Rise 6, run 2: slope = 6 ÷ 2 = 3."}),
  tr:"**Rise over run** — you have to rise up out of bed before you can run.",
  w:"Keep the order the same on top and bottom: if you start with point 2 on top, start with point 2 on the bottom too.",
  ex:[["Slope through (1, 2) and (3, 8)?",["Rise: `8 − 2 = 6`","Run: `3 − 1 = 2`","`m = \\f{6}{2}`"],"3"],
      ["Slope through (−2, 5) and (4, 2)?",["Rise: `2 − 5 = −3`","Run: `4 − (−2) = 6`","`m = \\f{−3}{6} = −\\f{1}{2}`"],"−1/2 (downhill)"]]});

CB("lines","l2",{t:"Slope-intercept form",
  f:["y = \\c1{m}x + \\c3{b}"],
  h:["`\\c1{m}` is the **slope**: how much y goes up when x goes up by 1. Big m = steep. Negative m = downhill.","`\\c3{b}` is the **y-intercept**: where the line crosses the y-axis — the **starting value** when x = 0.","To draw it: put a dot at `(0, b)`, then go **right 1, up m**, and repeat.","Parallel lines have the **same** m. Perpendicular lines have slopes that multiply to −1 (flip and change sign)."],
  pic:FIG.plane({r:6,lines:[{m:2,b:-1}],slope:[1,1,2,3],pts:[[0,-1,"start (0, −1)","grn"]],cap:"y = 2x − 1: start at −1, then right 1, up 2."}),
  tr:"**b** = **b**eginning (where you start), **m** = **m**ove (how you move).",
  w:"In `y = 5 − 2x` the slope is **−2**, not 5. The slope is the number glued to x.",
  ex:[["A taxi costs $3 to start plus $2 per mile. Write the cost y for x miles.",["The start fee is the value at 0 miles → `b = 3`","Each mile adds 2 → slope `m = 2`","Put them into `y = mx + b`"],"`y = 2x + 3`"],
      ["Find the line through (1, 2) and (3, 8).",["Slope: `\\f{8 − 2}{3 − 1} = 3`","Use (1, 2): `2 = 3(1) + b` → `b = −1`"],"`y = 3x − 1`"]]});

CB("lines","l3",{t:"Standard form & intercepts",
  f:["Ax + By = C || \\t{slope} = −\\f{A}{B}"],
  h:["**x-intercept:** where the line crosses the x-axis → put `y = 0`.","**y-intercept:** where it crosses the y-axis → put `x = 0`.","Standard form makes intercepts quick. For the slope, rearrange to y = mx + b or use `−\\f{A}{B}`."],
  pic:FIG.plane({r:7,lines:[{m:-2/3,b:4}],pts:[[6,0,"(6, 0)"],[0,4,"(0, 4)"]],cap:"2x + 3y = 12 crosses the axes at (6, 0) and (0, 4)."}),
  tr:"Cover-up trick: cover the y-term and solve for x (that's the x-intercept), then cover the x-term.",
  w:"The x-intercept has **y = 0**, not x = 0. Write intercepts as points: (6, 0).",
  ex:[["Find both intercepts of `2x + 3y = 12`.",["y = 0: `2x = 12` → x = 6 → (6, 0)","x = 0: `3y = 12` → y = 4 → (0, 4)"],"(6, 0) and (0, 4)"],
      ["Slope of `4x − 2y = 10`?",["`−\\f{A}{B} = −\\f{4}{−2}`","`= 2`"],"2"]]});

CB("lines","l4",{t:"Point-slope form",
  f:["y − y_{1} = m(x − x_{1})"],
  h:["When you know **one point and the slope**, point-slope form writes the line immediately.","Put the point's numbers in for x₁ and y₁, and the slope for m.","Reading a line from a graph: find the y-intercept, then count rise/run between two **grid corners**."],
  pic:FIG.plane({r:6,lines:[{m:-0.5,b:3}],slope:[0,3,4,1],pts:[[0,3,"(0, 3)"],[4,1,"(4, 1)"]],cap:"From (0, 3) to (4, 1): rise −2, run 4 → slope −½."}),
  tr:"Notice the **minus signs** in the form: `(x − x_{1})`. A point (−2, 5) gives `(x + 2)`.",
  w:"Use exact grid-corner points from a graph. Guessing (1.3, 2.4) gives a wrong slope.",
  ex:[["Line with slope 3 through (2, 5), in y = mx + b form.",["`y − 5 = 3(x − 2)`","`y − 5 = 3x − 6`","`y = 3x − 1`"],"`y = 3x − 1`"],
      ["Slope −2 through (−1, 4). Point-slope form?",["`y − 4 = −2(x − (−1))`"],"`y − 4 = −2(x + 1)`"]]});

CB("lines","l5",{t:"What the numbers in a line mean",
  f:["y = \\c1{m}x + \\c3{b}: \\c3{b} = \\t{start} || \\c1{m} = \\t{change per unit}"],
  h:["In a real-life line, **b** is the value at the very start (x = 0): a fee, a starting height, a starting amount.","**m** is the change for each **one** extra unit of x, with units “y-unit per x-unit”.","A table is a line if y changes by the same amount every time x goes up by the same step."],
  pic:PIC.flow([["week 0","10 cm"],["week 1","12.5 cm"],["week 2","15 cm"],["week 3","17.5 cm"]],["+2.5","+2.5","+2.5"],{bw:100,gap:50,cap:"h = 2.5w + 10: start at 10, add 2.5 every week."}),
  tr:"Units of the slope = **units of y ÷ units of x**: dollars per hour, cm per week.",
  w:"If x jumps by 2 each column of a table, divide the y-change by 2 to get the slope.",
  ex:[["A plant's height h (cm) after w weeks: `h = 2.5w + 10`. Meaning of 2.5 and 10?",["10 = height when planted (w = 0)","2.5 = it grows 2.5 cm each week"],"start 10 cm, +2.5 cm per week"],
      ["Table: x = 0, 2, 4 → y = 7, 13, 19. Equation?",["y goes up 6 while x goes up 2 → `m = 3`","At x = 0, y = 7 → `b = 7`"],"`y = 3x + 7`"]]});

CB("lines","l6",{t:"Distance & midpoint",
  f:["M = (\\f{x_{1} + x_{2}}{2}, \\f{y_{1} + y_{2}}{2}) || d = \\r{(x_{2} − x_{1})^{2} + (y_{2} − y_{1})^{2}}"],
  h:["**Midpoint** = the exact middle = the **average** of the x's and the average of the y's.","**Distance** is Pythagoras in disguise: the horizontal and vertical gaps are the legs of a right triangle.","Working backwards from a midpoint: other end = 2 × midpoint − known end."],
  pic:FIG.plane({r:6,lines:[{m:4/3,b:2/3,c:"red"}],slope:[1,2,4,6],pts:[[1,2,"(1, 2)"],[4,6,"(4, 6)"]],cap:"Across 3, up 4 → distance 5 (a 3-4-5 triangle)."}),
  tr:"Midpoint = **average**. Distance = **Pythagoras**. Two ideas you already know.",
  w:"Square the differences **before** adding: `\\r{3^{2} + 4^{2}} = 5`, not 3 + 4 = 7.",
  ex:[["Distance from (1, 2) to (4, 6)?",["Across: `4 − 1 = 3`, up: `6 − 2 = 4`","`\\r{9 + 16} = \\r{25}`"],"5"],
      ["Midpoint (4, 1) and one end (1, −3). Other end?",["x: `2 × 4 − 1 = 7`","y: `2 × 1 − (−3) = 5`"],"(7, 5)"]]});

CB("lines","l7",{t:"Horizontal & vertical lines",
  f:["y = c \\t{ horizontal, slope 0} || x = c \\t{ vertical, slope undefined}"],
  h:["A **horizontal** line keeps the same y everywhere: `y = 3`. Its slope is 0 (flat).","A **vertical** line keeps the same x everywhere: `x = −2`. Its slope is undefined (you can't “run”).","Three ways to graph any line: from y = mx + b, from two intercepts, or from a table of points."],
  pic:FIG.plane({r:5,lines:[{m:0,b:3}],vlines:[{x:-2}],labels:[[1,3.6,"y = 3","blue"],[-1.8,-4,"x = −2","vio"]],cap:"y = 3 is flat; x = −2 stands straight up."}),
  tr:"`y = 3` → **y** is stuck at 3 → the line lies down like a **y**awning person. `x = −2` stands up.",
  w:"`y = 3` is horizontal even though the number is a y. Don't draw it vertically.",
  ex:[["Line through (2, 5) and (7, 5)?",["Both points have y = 5 → horizontal"],"y = 5"],
      ["Line through (−3, 1) and (−3, 8)? Its slope?",["Both have x = −3 → vertical: x = −3","Run = 0 → slope undefined"],"x = −3, undefined slope"]]});

CB("lines","l8",{t:"Four faces of a line",
  f:["\\t{story} ⇄ \\t{equation} ⇄ \\t{table} ⇄ \\t{graph}"],
  h:["The same linear situation can be shown four ways — and the SAT asks you to switch between them.","**Story → equation:** start value is b, rate is m.","**Table → equation:** m = change in y ÷ change in x; b = y when x = 0.","**Graph → equation:** read b at the y-axis, count rise/run for m."],
  pic:PIC.flow([["story","$5 + $2/h"],["equation","y = 2x + 5"],["table","0→5, 1→7"],["graph","line"]],["","",""],{bw:118,gap:34}),
  tr:"Whatever face you're given, find **two things**: the start and the rate.",
  w:"In a table check the x-steps are equal before calling it linear.",
  ex:[["A pool has 200 L and drains 25 L per minute. Equation, and when is it empty?",["Start 200, rate −25: `V = 200 − 25t`","Empty: `200 − 25t = 0` → `t = 8`"],"V = 200 − 25t; empty after 8 min"],
      ["A line passes through (0, 4) and (2, 10). Fill in y at x = 5.",["Slope: `\\f{10 − 4}{2} = 3`, b = 4 → `y = 3x + 4`","`y = 3(5) + 4`"],"19"]]});

/* ---------------- Systems of equations ---------------- */
CB("sys","l1",{t:"What a system is",
  f:["\\t{solution} = \\t{the point on BOTH lines}"],
  h:["A **system** is two equations that must be true **at the same time**.","On a graph each equation is a line. The solution is where they **cross**.","Lines cross once → 1 solution. Parallel → no solution. Same line → infinitely many."],
  pic:FIG.plane({r:6,lines:[{m:-1,b:5},{m:1,b:-1}],pts:[[3,2,"(3, 2) works in both","vio"]],cap:"x + y = 5 and x − y = 1 cross at (3, 2)."}),
  tr:"A solution must pass **both** tests — like a key that has to fit two locks.",
  w:"Check your answer in **both** equations, not just one.",
  ex:[["Is (2, 3) a solution of `x + y = 5` and `2x − y = 1`?",["First: `2 + 3 = 5` ✓","Second: `4 − 3 = 1` ✓"],"yes"],
      ["How many solutions: `y = 2x + 1` and `y = 2x − 4`?",["Same slope 2, different starts → parallel","Parallel lines never meet"],"none"]]});

CB("sys","l2",{t:"Substitution",
  f:["y = \\c1{2x} \\t{ and } x + \\c1{y} = 9 ⟹ x + \\c1{2x} = 9"],fl:"Swap in what you know",
  h:["Use it when one equation already says “**y = …**” or “**x = …**”.","Replace that letter in the **other** equation with its expression.","Now there's only one letter — solve it, then put the answer back to find the other letter."],
  pic:FIG.plane({r:9,lines:[{m:2,b:0},{m:-1,b:9,c:"red"}],pts:[[3,6,"(3, 6)","vio"]],cap:"y = 2x and x + y = 9 cross at (3, 6)."}),
  tr:"**Swap, solve, back-substitute.**",
  w:"Put brackets around what you substitute: `3x − 2(x + 1)`, not `3x − 2x + 1`.",
  ex:[["Solve: `y = 2x` and `x + y = 9`.",["Swap y for 2x: `x + 2x = 9`","`3x = 9` → `x = 3`","Back: `y = 2(3) = 6`"],"(3, 6)"],
      ["Solve: `x = y + 2` and `3x + y = 18`.",["Swap: `3(y + 2) + y = 18`","`4y + 6 = 18` → `y = 3`","`x = 3 + 2 = 5`"],"(5, 3)"]]});

CB("sys","l3",{t:"Elimination",
  f:["(x + y = 5) + (x − y = 1) ⟹ 2x = 6"],fl:"Add or subtract to cancel",
  h:["Line the equations up. **Add** them (or subtract) so one letter disappears.","If nothing cancels yet, **multiply** one equation (or both) so a pair of numbers matches.","Solve for the remaining letter, then substitute back."],
  pic:PIC.flow([["x + y = 5","x − y = 1"],["add","2x = 6"],["x = 3","y = 2"]],["",""],{bw:130}),
  tr:"Same numbers with **opposite signs** → add. Same numbers with **same signs** → subtract.",
  w:"When you multiply an equation, multiply **every** term — including the number after =.",
  ex:[["Solve: `x + y = 5` and `x − y = 1`.",["Add: the y's cancel → `2x = 6` → `x = 3`","Back: `3 + y = 5` → `y = 2`"],"(3, 2)"],
      ["Solve: `2x + 3y = 12` and `x − y = 1`.",["Multiply the second by 3: `3x − 3y = 3`","Add to the first: `5x = 15` → `x = 3`","`3 − y = 1` → `y = 2`"],"(3, 2)"]]});

CB("sys","l4",{t:"Systems in word problems",
  f:["\\t{how many}: a + c = n || \\t{how much}: p_{1}a + p_{2}c = \\t{total}"],
  h:["Two unknowns → you need two facts. Usually one counts **how many** and the other counts **how much** (money, weight, value).","Name both unknowns, write both equations, then substitute or eliminate.","Mixtures: amount × percent + amount × percent = total × percent."],
  pic:PIC.flow([["count equation","a + c = 20"],["value equation","10a + 6c = 168"],["solve","a = 12, c = 8"]],["",""],{bw:150,gap:40}),
  tr:"Write the **units** next to each equation: “tickets” and “dollars”. They must not be mixed.",
  w:"Multiply each count by its price in the money equation — don't add counts and dollars.",
  ex:[["14 coins, only dimes and quarters, worth $2.60. How many quarters?",["Count: `d + q = 14`","Value (cents): `10d + 25q = 260`","`d = 14 − q`: `140 − 10q + 25q = 260` → `15q = 120` → `q = 8`"],"8 quarters (and 6 dimes)"],
      ["Mix a 10% salt solution with a 30% one to get 20 L of 25%. Litres of 10%?",["`x + y = 20` and `0.1x + 0.3y = 5`","`0.1x + 0.3(20 − x) = 5` → `6 − 0.2x = 5`","`x = 5`"],"5 L of 10% (15 L of 30%)"]]});

CB("sys","l5",{t:"Finding k: how many solutions",
  f:["\\f{a_{1}}{a_{2}} = \\f{b_{1}}{b_{2}} ≠ \\f{c_{1}}{c_{2}} → \\t{none} || \\f{a_{1}}{a_{2}} = \\f{b_{1}}{b_{2}} = \\f{c_{1}}{c_{2}} → \\t{infinitely many}"],
  h:["**No solution** = parallel lines: same slope, different intercept. The x- and y-numbers are in the same ratio, the constants are not.","**Infinitely many** = the same line: everything is in the same ratio (one equation is a multiple of the other).","Otherwise there's exactly one solution."],
  pic:FIG.plane({r:5,lines:[{m:-2,b:3},{m:-2,b:-1,c:"red"}],cap:"Parallel: same slope −2, different intercepts → no solution."}),
  tr:"Ask: is one equation a **multiple** of the other? All the way → infinite. Only the left side → none.",
  w:"Rewrite both equations in the same order (x, y, constant) before comparing.",
  ex:[["`kx + 3y = 6` and `2x + y = 5` have no solution. Find k.",["y-ratio: `\\f{3}{1} = 3`, so the x-ratio must be 3: `\\f{k}{2} = 3` → `k = 6`","Constants: `\\f{6}{5} ≠ 3` ✓"],"k = 6"],
      ["`3x − 2y = 8` and `6x + ky = 16` have infinitely many solutions. Find k.",["Everything doubles: 3→6, 8→16","So −2 → −4"],"k = −4"]]});

CB("sys","l6",{t:"Choosing the fastest method",
  f:["\\t{asked for } x + y \\t{? add the equations!}"],
  h:["Something already alone (y = …)? → **substitution**.","Numbers line up (same or opposite)? → **elimination**.","Ugly decimals? → graph both lines in Desmos and click the crossing.","Asked for `x + y` or `x − y`? Try **adding or subtracting the equations** — often you never need x and y separately."],
  pic:PIC.flow([["3x + 2y = 17","2x + 3y = 18"],["add","5x + 5y = 35"],["divide by 5","x + y = 7"]],["",""],{bw:130}),
  tr:"Read **what's asked** before solving. The SAT often hands you a shortcut.",
  w:"Don't solve for x and y if they only want a combination — it costs time and adds mistakes.",
  ex:[["`3x + 2y = 17` and `2x + 3y = 18`. Find x + y.",["Add: `5x + 5y = 35`","Divide by 5"],"7"],
      ["Same equations. Find x − y.",["Subtract the second from the first: `x − y = 17 − 18`"],"−1"]]});

/* ---------------- Word problems masterclass ---------------- */
CB("wp","l1",{t:"The 5-step method",
  f:["\\t{read the question} → \\t{name} → \\t{translate} → \\t{solve} → \\t{check}"],fl:"Five steps",
  h:["1️⃣ Read the **last sentence first** — know what they want.","2️⃣ **Name** the unknown with a letter and its unit.","3️⃣ **Translate** the story sentence by sentence.","4️⃣ **Solve.** 5️⃣ **Re-read** the question: x, or 2x, or the total?"],
  pic:PIC.flow([["1","goal"],["2","name"],["3","translate"],["4","solve"],["5","check"]],["","","",""],{bw:80,gap:30}),
  tr:"The wrong answer you'd get by skipping step 5 is almost always one of the choices. Don't fall for it.",
  w:"Most word-problem points are lost in **reading**, not in maths.",
  ex:[["Maya is 4 years older than twice her brother's age. Together they're 31. How old is Maya?",["Goal: Maya's age. Let b = brother's age","Maya = `2b + 4`; `b + 2b + 4 = 31`","`3b = 27` → `b = 9`","Re-read: they want Maya → `2(9) + 4`"],"22"],
      ["A number increased by 40% is 84. Find the number.",["Name it n: `1.4n = 84`","`n = 84 ÷ 1.4`"],"60"]]});

CB("wp","l2",{t:"The translation dictionary",
  f:["\\t{is} = || \\t{of} × || \\t{per} ÷ || \\t{twice} 2× || \\t{less than} \\t{flips}"],fl:"Words → symbols",
  h:["**is / was / will be / gives** → =","**of** (with fractions/percents) → ×   **per** → ÷ (a rate)","**more than / increased by / sum** → +   **less than / decreased by / difference** → −","**ratio of a to b** → a/b   **at least** → ≥   **at most** → ≤"],
  pic:PIC.flow([["“5 less than","x”"],["means","x − 5"]],["→"],{bw:140,gap:60}),
  k:[["in 5 years","add 5 to every age"],["consecutive","n, n + 1, n + 2"],["of","× (multiply)"]],
  tr:"Translate **one phrase at a time** — never the whole sentence at once.",
  w:"“The ratio of boys to girls” is boys/girls — order matters.",
  ex:[["“Seven less than three times a number is 20.” Find the number.",["Three times a number: `3n`","Seven less than that: `3n − 7`","`3n − 7 = 20` → `n = 9`"],"9"],
      ["“The sum of a number and its half is 36.”",["`n + \\f{n}{2} = 36`","`\\f{3n}{2} = 36` → `n = 24`"],"24"]]});

CB("wp","l3",{t:"Multi-step problems & units",
  f:["\\t{step 1 result (with unit)} → \\t{step 2} → \\t{answer (with unit)}"],
  h:["Hard problems are just **two or three easy steps** chained together.","Write the **unit** next to every number: 15 gallons, $52.50.","If you need “enough” of something (paint, buses), round **up** at the end."],
  pic:PIC.flow([["420 miles","÷ 28 mi/gal"],["15 gallons","× $3.50"],["cost","$52.50"]],["",""]),
  tr:"A number without a unit is a mistake waiting to happen.",
  w:"Check the units cancel: miles ÷ (miles per gallon) = gallons ✓.",
  ex:[["A car does 28 miles per gallon; gas is $3.50 per gallon. Cost of a 420-mile trip?",["Gallons: `420 ÷ 28 = 15`","Cost: `15 × 3.50`"],"$52.50"],
      ["A 20 ft × 9 ft wall needs 2 coats. A gallon covers 350 ft². Gallons to buy?",["Area: `20 × 9 = 180` ft², two coats → 360 ft²","`360 ÷ 350 = 1.03…` → you need enough → round up"],"2 gallons"]]});

CB("wp","l4",{t:"Motion, work & mixture tables",
  f:["d = r × t || \\t{work} = \\t{rate} × t || \\t{pure} = \\t{percent} × \\t{amount}"],
  h:["All three are the **same idea**: something = rate × amount.","Make a table with one row per person/car/solution and columns for rate, time (or amount) and the product.","Then write an equation using the column that's given in the story (total distance, whole job = 1, total pure amount)."],
  pic:PIC.flow([["rate","60 km/h"],["× time","2.5 h"],["= distance","150 km"]],["",""]),
  tr:"One row per thing, three columns. Fill the boxes and the equation appears.",
  w:"In work problems the whole job = **1**, not 100.",
  ex:[["Two pipes fill a tank in 4 h and 12 h. Together?",["Rates: `\\f{1}{4} + \\f{1}{12} = \\f{3}{12} + \\f{1}{12} = \\f{4}{12} = \\f{1}{3}` tank per hour","1 tank ÷ `\\f{1}{3}` per hour"],"3 hours"],
      ["How much pure acid is in 40 L of a 15% solution?",["Pure = percent × amount","`0.15 × 40`"],"6 L"]]});

/* ---------------- Problem-solving toolkit ---------------- */
CB("solve","l1",{t:"The 4-step method",
  f:["\\t{understand} → \\t{plan} → \\t{solve} → \\t{look back}"],
  h:["**Understand:** what's given, what's asked? Underline it.","**Plan:** which rule or picture connects them?","**Solve:** carefully, one line per step.","**Look back:** does the answer make sense? Does it answer the actual question?"],
  pic:PIC.flow([["1","understand"],["2","plan"],["3","solve"],["4","look back"]],["","",""],{bw:100,gap:34}),
  tr:"Spend the first 15 seconds **only reading**. It saves a minute later.",
  w:"An answer that's negative for a length, or bigger than the whole for a part, means a slip.",
  ex:[["A rectangle's length is 3 more than its width; the perimeter is 26. Find the area.",["Asked: area. Let w = width, length = w + 3","Perimeter: `2w + 2(w + 3) = 26` → `4w = 20` → `w = 5`","Length 8 → area `5 × 8`"],"40"],
      ["Look back: someone got width = −5 for a rectangle. What's wrong?",["A width can't be negative","Re-check the equation and signs"],"there's a mistake to find"]]});

CB("solve","l2",{t:"Plug in numbers & backsolve",
  f:["\\t{letters everywhere? pick easy numbers} || \\t{numbers in the choices? test them}"],
  h:["**Plugging in:** when the question is all letters, choose simple numbers (like 2, 3, 10), work out the answer, then see which choice gives the same result.","**Backsolving:** when the choices are numbers, put them back into the problem. Start with a middle choice — if it's too big, go smaller.","Avoid 0 and 1 when plugging in — they make different expressions look equal."],
  pic:PIC.flow([["a = 2b, b = 3c","let c = 1"],["b = 3, a = 6","so a = 6c"]],["→"],{bw:150,gap:50}),
  tr:"Turn algebra into **arithmetic**. Arithmetic is much harder to get wrong.",
  w:"When plugging in, test **every** choice — two might match by luck; then try another number.",
  ex:[["If a = 2b and b = 3c, then a = ? c",["Let c = 1 → b = 3 → a = 6","So a is 6 times c"],"6c"],
      ["Which value of x solves `\\f{x + 6}{2} = x`? (A) 2 (B) 4 (C) 6 (D) 8",["Try (C) 6: `\\f{12}{2} = 6` ✓"],"x = 6"]]});

CB("solve","l3",{t:"Draw it, table it, list it",
  f:["\\t{picture} || \\t{table} || \\t{organised list}"],
  h:["**Draw it:** shapes, paths, number lines — a quick sketch shows what the words hide.","**Table it:** organise numbers into rows and columns to see the pattern.","**List it:** for “how many ways” questions, list systematically (start from the biggest) so you don't miss or repeat any."],
  pic:FIG.numline(0,10,{jumps:[{from:0,to:4,label:"4",c:"blue"},{from:4,to:10,label:"6",c:"grn"}],cap:"A quick line sketch turns a story into numbers."}),
  tr:"If you're stuck for 20 seconds, **draw something**. Anything.",
  w:"Lists must be **systematic**: change one thing at a time.",
  ex:[["How many ways can you make 25¢ with dimes and nickels?",["2 dimes + 1 nickel","1 dime + 3 nickels","0 dimes + 5 nickels"],"3 ways"],
      ["A snail climbs 3 m each day and slips 2 m each night. A 10 m wall?",["Table: after day n it reaches `n + 2` m (net +1 per day, then +3)","Day 8: starts at 7 m, climbs to 10 m ✓"],"8 days"]]});

CB("solve","l4",{t:"Estimate, eliminate & test extremes",
  f:["\\t{rough answer first} → \\t{cross out the impossible}"],
  h:["**Estimate** before calculating: round the numbers to get a ballpark.","**Eliminate** choices that are impossible: negative lengths, probabilities above 1, answers in the wrong direction.","**Test extremes:** try a very big or very small value (like 0 or 100) to see how an expression behaves."],
  pic:PIC.flow([["4 choices","A B C D"],["2 impossible","✗ ✗"],["guess left","50%"]],["",""]),
  tr:"Even when you can't solve it, eliminating two choices doubles your chance.",
  w:"There's no penalty for wrong answers on the SAT — never leave a blank.",
  ex:[["`\\f{398 × 51}{99}` is closest to: 50, 100, 200, 400?",["Round: `\\f{400 × 50}{100} = 200`"],"200"],
      ["A probability question has choices 0.3, 0.5, 1.2, −0.1. Which can be crossed out?",["Probabilities live between 0 and 1","1.2 and −0.1 are impossible"],"1.2 and −0.1"]]});

CB("solve","l5",{t:"Spot the pattern & work backwards",
  f:["\\t{pattern}: \\t{find the rule from the first few terms} || \\t{backwards}: \\t{undo each step from the end}"],
  h:["**Patterns:** write out the first few cases and look at what changes each time — adding the same amount? multiplying? repeating every 4?","**Work backwards:** when you know the end result, undo every step in reverse order (× becomes ÷, + becomes −)."],
  pic:PIC.flow([["end","35"],["undo +5","30"],["undo ×3","10"],["start","10"]],["−5","÷3",""],{bw:96,gap:44}),
  tr:"Repeating cycles: divide the position by the cycle length and look at the **remainder**.",
  w:"Undo steps in the **reverse** order — last step first.",
  ex:[["A number is tripled, then 5 is added, giving 35. The number?",["Undo +5: `35 − 5 = 30`","Undo ×3: `30 ÷ 3 = 10`"],"10"],
      ["The units digit of 7 to the power 2023?",["Units digits of 7, 7², 7³, 7⁴: 7, 9, 3, 1 — a cycle of 4","`2023 ÷ 4` leaves remainder 3 → third in the cycle"],"3"]]});
