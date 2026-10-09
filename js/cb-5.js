/* =====================================================================
   AXIOM — Copybook notes 5: data · probability · geometry · trigonometry
   ===================================================================== */

/* ---------------- Data & statistics ---------------- */
CB("data","l1",{t:"Mean, median, mode & range",
  f:["\\t{mean} = \\f{\\t{sum of all values}}{\\t{how many values}}","\\t{median} = \\t{the middle one (in order)} || \\t{range} = \\t{max} − \\t{min}"],
  h:["**Mean** = the fair share: pour everything together and share it out equally.","**Median** = line the numbers up from small to big and take the **middle** one. Even count? Average the two middle numbers.","**Mode** = the value that appears **most** often.","**Range** = how wide the data is: biggest − smallest."],
  pic:PIC.dots([2,3,3,4,4,4,5,11],{lo:1,hi:12,cap:"One big value (11) drags the mean to the right; the median stays in the middle."}),
  k:[["Mean","total ÷ count"],["Median","the middle value once sorted"],["Mode","the most frequent value"],["Outlier","a value far from the rest"]],
  tr:"Mean = **share it out**. Median = **middle of the line** (like the median strip in the middle of a road). Mode = **most**.",
  w:"Sort the list **before** you look for the median — the middle of an unsorted list means nothing.",
  ex:[["Find the mean and median of 3, 7, 7, 2, 11",["Sort: 2, 3, 7, 7, 11","Mean: `\\f{2 + 3 + 7 + 7 + 11}{5} = \\f{30}{5} = 6`","Median: the 3rd of 5 values // 5 values → the 3rd is the middle"],"mean 6, median 7 (mode 7, range 9)"],
      ["The mean of 4 tests is 85. What score on test 5 makes the mean 87?",["Total so far: `4 × 85 = 340` // mean × count = total","Total needed: `5 × 87 = 435`","`435 − 340`"],"95"]]});

CB("data","l2",{t:"Spread & standard deviation",
  f:["\\t{SD} ≈ \\t{the typical distance from the mean}"],
  h:["Standard deviation (SD) tells you how **spread out** the data is.","Values huddled close to the mean → **small** SD. Values scattered far away → **large** SD.","On the SAT you almost never calculate it — you **compare** two pictures.","Add the same number to every value → the mean moves, the SD stays the same. Multiply every value by k → the SD is multiplied by k too."],
  pic:'<div class="figrow">'+PIC.dots([5,5,6,6,6,7,7],{lo:1,hi:11,median:false,cap:"Tight huddle → small SD"})+PIC.dots([1,3,5,6,7,9,11],{lo:1,hi:11,median:false,col:"var(--violet)",cap:"Scattered → big SD (same mean 6!)"})+'</div>',
  k:[["Standard deviation","how far values typically are from the mean"],["Spread","how far apart the values are"]],
  tr:"Small SD = **tight huddle**. Big SD = **scattered crowd**.",
  w:"Adding 10 points to everyone's score doesn't change the SD — everyone moves together, so the gaps stay the same.",
  ex:[["Set A: 10, 10, 10, 10. Set B: 4, 8, 12, 16. Which has the larger SD?",["Set A: every value sits exactly on the mean → spread 0","Set B: the values are far from their mean (10)"],"Set B"],
      ["Every value in a data set is increased by 5. What happens to the mean and SD?",["Mean: everything slides up 5 → mean goes up 5","SD: the gaps between values don't change"],"mean + 5, SD unchanged"]]});

CB("data","l3",{t:"Percentages in data & surveys",
  f:["\\t{percent} = \\f{\\t{part}}{\\t{whole}} × 100\\%","\\t{estimate for everyone} = \\t{sample %} × \\t{population}"],
  h:["Always ask: **percent of WHAT?** The whole decides the answer.","A survey gives a percent for the sample. Use the same percent for the whole population to **estimate**.","Percent of a percent: turn both into decimals and multiply."],
  pic:PIC.pct(30,{part:"36 said yes",whole:"120 asked",inner:"30%",cap:"36 out of 120 → 36 ÷ 120 = 0.30 = 30%."}),
  tr:"The **whole** is usually the number right after the word **of**.",
  w:"“40% of the boys” and “40% of all students” have different wholes — read carefully.",
  ex:[["In a survey of 200 students, 36 like chess. What percent is that?",["`\\f{36}{200} = 0.18`","`0.18 × 100`"],"18%"],
      ["The sample says 18% like chess. The school has 1,500 students. Estimate how many like chess.",["Same percent of the bigger group: `0.18 × 1500`"],"about 270 students"]]});

CB("data","l4",{t:"Scatterplots & lines of best fit",
  f:["\\t{prediction: } y = mx + b || \\t{residual} = \\t{actual} − \\t{predicted}"],
  h:["Each dot is one thing measured twice: x across, y up.","The line of best fit runs through the **middle of the cloud** of dots.","Slope in words: “for every 1 more x, y goes up by m **on average**.”","Up-and-right = positive association; down = negative; a shapeless blob = no association.","Residual: how far a real dot is from the line (above the line → positive)."],
  pic:FIG.scatter([[1,2],[2,2.8],[3,3.1],[4,4.4],[5,4.6],[6,5.9],[7,6.1],[8,7.2],[9,7.5]],{line:{m:0.7,b:1.3},cap:"Positive association: the red line goes up through the middle of the dots."}),
  k:[["Association","how x and y move together"],["Residual","actual − predicted"],["Interpolate","predict inside the data range (safe)"]],
  tr:"Read the slope as a sentence: “each **1 more** hour → **2.5 more** points.”",
  w:"A pattern doesn't prove one thing **causes** the other. And predictions far outside the data are risky.",
  ex:[["Best-fit line `y = 2.5x + 10` (x = hours studied, y = score). Predict the score for 6 hours.",["`y = 2.5(6) + 10`","`= 15 + 10`"],"25"],
      ["A student studied 6 hours and scored 31. What is the residual?",["Residual = actual − predicted","`31 − 25`"],"6 (the dot is above the line)"]]});

CB("data","l5",{t:"Two-way tables",
  f:["P(\\t{A given B}) = \\f{\\t{A and B}}{\\t{total of B}}"],
  h:["A two-way table sorts the same people **two ways** at once (rows and columns).","Each inside cell counts people who are **both** things.","Words like **given**, **of the**, **among** tell you which row or column is your new whole.","Totals: add across a row, or down a column."],
  pic:PIC.tbl(["","Likes math","Doesn't","Total"],[["Grade 9",30,20,50],["Grade 10",45,5,50],["Total",75,25,100]],{hi:[[1,1]],cap:"Of the 50 tenth-graders, 45 like math → 45/50 = 90%."}),
  tr:"**Given** = your new whole. Cover the rest of the table with your hand.",
  w:"“Of the tenth-graders, who likes math?” → 45/50. “Of those who like math, who is in grade 10?” → 45/75. Same 45, different whole!",
  ex:[["What fraction of tenth-graders like math?",["Whole = tenth-graders = 50","Part = tenth-graders who like math = 45"],"`\\f{45}{50} = \\f{9}{10}`"],
      ["Of the students who like math, what fraction are in grade 9?",["Whole = likes math = 75","Part = grade 9 and likes math = 30"],"`\\f{30}{75} = \\f{2}{5}`"]]});

CB("data","l6",{t:"Surveys, experiments & margin of error",
  f:["\\t{true value} ≈ \\t{estimate} ± \\t{margin of error}"],
  h:["**Random sample** → you may generalize to the population the sample came from (only that one!).","**Random assignment** to groups (an experiment) → you may say one thing **causes** the other.","No random assignment → only “is **associated** with”.","Margin of error: the true value is probably within ± that amount. A **bigger sample** → a **smaller** margin of error."],
  pic:FIG.numline(40,56,{step:2,segs:[{a:44,b:52,ca:1,cb:1,c:"vio"}],marks:[{v:48,label:"estimate 48%",c:"red"}],cap:"48% ± 4% → the true value is likely between 44% and 52%."}),
  k:[["Population","everyone you want to know about"],["Sample","the group you actually asked"],["Bias","a sample that leans one way (e.g. only volunteers)"]],
  tr:"**Random sample → generalize. Random assignment → cause.**",
  w:"A survey of gym members tells you about gym members — not about all adults.",
  ex:[["A poll says 48% ± 4% support a plan. Is it plausible that more than half support it?",["Interval: `48 − 4 = 44` to `48 + 4 = 52`","52% is inside the interval"],"Yes — plausible, but not certain"],
      ["Volunteers chose whether to take a vitamin; those who did slept better. Does the vitamin cause better sleep?",["Were people randomly assigned? No — they chose","No random assignment → no cause-and-effect"],"No — only an association"]]});

CB("data","l7",{t:"Box plots, histograms & dot plots",
  f:["\\t{IQR} = Q_{3} − Q_{1}","\\t{5 numbers: } \\t{min} · Q_{1} · \\t{median} · Q_{3} · \\t{max}"],
  h:["A box plot draws **five numbers**: min, Q1, median, Q3, max.","The **box** holds the middle 50% of the data. Each of the four pieces holds about 25%.","Histogram: each bar shows **how many** values fall in that interval — taller bar, more values.","Dot plot: one dot for each value, stacked up."],
  pic:PIC.box([2,5,8,12,18],{lo:0,hi:20,cap:"The middle half of the data lives in the box: from Q1 = 5 to Q3 = 12."}),
  tr:"Box plot = **5 numbers, 4 quarters**. The box = the middle half.",
  w:"A long whisker does NOT mean more data — each quarter has the same number of values, just spread wider.",
  ex:[["Box plot: min 2, Q1 5, median 8, Q3 12, max 18. Find the IQR and the range.",["IQR: `12 − 5 = 7`","Range: `18 − 2 = 16`"],"IQR 7, range 16"],
      ["The same plot shows 40 values. About how many are between 5 and 12?",["The box holds the middle 50%","`0.5 × 40`"],"about 20"]]});

CB("data","l8",{t:"Weighted averages & combining groups",
  f:["\\t{combined mean} = \\f{n_{1} · \\t{mean}_{1} + n_{2} · \\t{mean}_{2}}{n_{1} + n_{2}}"],
  h:["You **can't** just average two averages unless the groups are the same size.","Turn each average back into a **total** (mean × count), add the totals, divide by the total count.","The combined mean always lands **between** the two means — closer to the bigger group."],
  pic:PIC.flow([["A: 10 × 80","800"],["B: 30 × 90","2700"],["3500 ÷ 40","87.5"]],["+","="],{bw:140,gap:44}),
  tr:"**Averages don't add — totals do.** Convert to totals first.",
  w:"The answer is not `\\f{80 + 90}{2} = 85` — the bigger class pulls the mean toward 90.",
  ex:[["Class A: 10 students, mean 80. Class B: 30 students, mean 90. Combined mean?",["Totals: `10 × 80 = 800`, `30 × 90 = 2700`","`\\f{800 + 2700}{40} = \\f{3500}{40}`"],"87.5"],
      ["A grade is 40% homework (score 90) and 60% tests (score 70). Final grade?",["`0.4 × 90 = 36`","`0.6 × 70 = 42`","`36 + 42`"],"78"]]});

CB("data","l9",{t:"Reading every kind of chart",
  f:["\\t{Title} → \\t{Axes} → \\t{Units} → \\t{Scale} → \\t{then the numbers}"],
  h:["Before any arithmetic, read the **title**, the **axis labels** and the **units**.","Check where the axis **starts** — a cut-off axis makes small differences look huge.","Line graph: the **steepest** piece = the fastest change.","Bar chart compares groups; a pie chart shows parts of one whole.","“in thousands” on an axis means multiply what you read by 1,000."],
  pic:FIG.bars([12,18,9,24],["Mon","Tue","Wed","Thu"],{hi:3,cap:"Thursday (red) is the tallest bar: 24 sales."}),
  tr:"**T-A-U-S**: Title, Axes, Units, Scale — every single time.",
  w:"If the axis says “in thousands”, a bar at 4 means **4,000**.",
  ex:[["From the chart: by what percent did sales rise from Wednesday (9) to Thursday (24)?",["Change: `24 − 9 = 15`","Percent change: `\\f{15}{9} ≈ 1.667` // divide by the OLD value"],"about 167%"],
      ["On a line graph, the steepest piece is from 2 pm to 3 pm. What does that tell you?",["Steepest = the biggest change per hour"],"the fastest change happened 2–3 pm"]]});

CB("data","l10",{t:"Comparing spread: range, IQR & SD",
  f:["\\t{range} = \\t{max} − \\t{min} || \\t{IQR} = Q_{3} − Q_{1} || \\t{SD} = \\t{typical gap from the mean}"],
  h:["**Range** uses only the two extremes — one outlier wrecks it.","**IQR** uses the middle half — it ignores outliers (we call it **resistant**).","**SD** uses every value — an outlier pushes it up.","Remove an outlier: mean, range and SD change a lot; median and IQR barely move."],
  pic:PIC.dots([4,5,5,6,6,6,7,7,15],{lo:3,hi:16,cap:"The outlier 15 stretches the range and pulls the mean; the median (6) doesn't care."}),
  k:[["Resistant","hardly changed by outliers"],["Outlier","a value far from the others"]],
  tr:"Outliers: **median & IQR are stubborn; mean, range & SD are sensitive.**",
  w:"“Which changes the most if the outlier is removed?” → usually the **range** (and among centres, the **mean**).",
  ex:[["Data: 4, 5, 5, 6, 6, 6, 7, 7, 15. Remove 15. What happens to the mean, median and range?",["Mean: `\\f{61}{9} ≈ 6.8` → `\\f{46}{8} = 5.75` // drops","Median: 6 → 6 // still the middle","Range: `15 − 4 = 11` → `7 − 4 = 3`"],"mean drops, median stays, range drops a lot"],
      ["Two classes have the same mean. Class A's SD is 3, class B's SD is 9. Which is more consistent?",["Smaller SD = scores closer to the mean"],"Class A"]]});

/* ---------------- Probability & counting ---------------- */
CB("prob","l1",{t:"Basic probability",
  f:["P(\\t{event}) = \\f{\\t{ways you want}}{\\t{all possible ways}}","P(\\t{not } A) = 1 − P(A)"],
  h:["Probability is a number from **0** (impossible) to **1** (certain).","Count the outcomes you **want**, then divide by **all** outcomes (each equally likely).","The chance something does **not** happen = 1 − the chance it does."],
  pic:PIC.strip(6,2,{cap:"A die: 2 of its 6 faces (5 and 6) are bigger than 4 → 2/6 = 1/3."}),
  k:[["Outcome","one possible result"],["Event","the outcomes you care about"],["Complement","everything else — “not A”"]],
  tr:"**Want over All.**",
  w:"A probability can never be bigger than 1 or below 0. If you get 1.3, something went wrong.",
  ex:[["A bag has 3 red, 5 blue and 2 green marbles. P(blue)?",["Want: 5 blue","All: `3 + 5 + 2 = 10`"],"`\\f{5}{10} = \\f{1}{2}`"],
      ["Same bag. P(not green)?",["`P(\\t{green}) = \\f{2}{10}`","`1 − \\f{2}{10}`"],"`\\f{8}{10} = \\f{4}{5}`"]]});

CB("prob","l2",{t:"Combined events & counting",
  f:["P(A \\t{ and } B) = P(A) · P(B) \\s \\t{(independent)}","P(A \\t{ or } B) = P(A) + P(B) − P(A \\t{ and } B)"],
  h:["**AND** → multiply (both must happen, so the chance shrinks).","**OR** → add, then subtract the overlap so nothing is counted twice.","Counting rule: m choices, then n choices → `m × n` combinations in total."],
  pic:GRID36(function(a,b){return a+b===7},"Two dice make 36 outcomes. A sum of 7 happens 6 ways → 6/36 = 1/6."),
  tr:"**AND = ×, OR = +** (minus the overlap).",
  w:"4 shirts and 3 pairs of pants make `4 × 3 = 12` outfits, not 7.",
  ex:[["Flip a coin and roll a die. P(heads and a 6)?",["`P(H) = \\f{1}{2}`, `P(6) = \\f{1}{6}`","AND → multiply: `\\f{1}{2} · \\f{1}{6}`"],"`\\f{1}{12}`"],
      ["Pick a card numbered 1–20. P(even or a multiple of 5)?",["Even: 10 cards. Multiples of 5: 4 cards (5, 10, 15, 20)","Both: 10 and 20 → 2 cards // don't count them twice","`\\f{10 + 4 − 2}{20}`"],"`\\f{12}{20} = \\f{3}{5}`"]]});

CB("prob","l3",{t:"“At least one” & expected counts",
  f:["P(\\t{at least one}) = 1 − P(\\t{none})","\\t{expected count} = n × p"],
  h:["“At least one” hides many cases (one, two, three…). Its opposite — **none** — is just one case.","So find P(none) and subtract it from 1.","Expected count = number of tries × probability. It's what happens “on average”."],
  pic:PIC.flow([["no 6, one roll","5/6"],["no 6 in 4 rolls","(5/6)⁴ ≈ 0.48"],["at least one 6","1 − 0.48 = 0.52"]],["",""],{bw:160,gap:30}),
  tr:"“At least one” → **flip it**: 1 − none.",
  w:"Don't add `\\f{1}{6}` four times (that gives `\\f{4}{6}`) — it double-counts rolls with two sixes.",
  ex:[["Roll a die 4 times. P(at least one 6)?",["P(no 6 in one roll) = `\\f{5}{6}`","P(no 6 in 4 rolls) = `(\\f{5}{6})^{4} ≈ 0.482` // AND → multiply","`1 − 0.482`"],"≈ 0.518"],
      ["A player makes 80% of free throws. How many does she expect to make in 25 shots?",["`n × p = 25 × 0.8`"],"20"]]});

CB("prob","l4",{t:"Permutations & combinations",
  f:["n! = n(n − 1)(n − 2) ⋯ 1","\\t{order matters: } \\f{n!}{(n − r)!} || \\t{order doesn't: } \\f{n!}{r!(n − r)!}"],
  h:["**Order matters** (1st/2nd/3rd place, president and vice-president, a code) → permutation.","**Order doesn't matter** (a team, a committee, pizza toppings) → combination.","Combination = permutation ÷ the number of ways to rearrange the chosen ones."],
  pic:PIC.flow([["gold","5 choices"],["silver","4 left"],["bronze","3 left"],["total","60"]],["×","×","="],{bw:110,gap:40}),
  tr:"Ask: **if I swap two picks, is it a different result?** Yes → permutation. No → combination.",
  w:"A committee of 3 from 5 people is `\\f{60}{6} = 10`, not 60 — the same three people in a different order are the same committee.",
  ex:[["5 runners. How many ways to award gold, silver and bronze?",["Gold: 5 choices, silver: 4, bronze: 3","`5 × 4 × 3`"],"60"],
      ["Choose a 3-person committee from 5 people.",["Ordered picks: 60","Each group of 3 can be ordered `3! = 6` ways","`\\f{60}{6}`"],"10"]]});

CB("prob","l5",{t:"Independent, dependent & conditional",
  f:["P(B \\t{ given } A) = \\f{P(A \\t{ and } B)}{P(A)}","\\t{independent: } P(B \\t{ given } A) = P(B)"],
  h:["**Independent**: the first result doesn't change the second (coin flips, drawing **with** replacement).","**Dependent**: the first result changes the second (drawing **without** replacement — one item fewer).","“Given A” → A has happened; A is now your whole world."],
  pic:PTREE("Without replacement: after a red, only 3 reds out of 9 marbles remain."),
  tr:"**Without replacement → the bottom number drops by 1** (and maybe the top too).",
  w:"Two reds without replacement is `\\f{4}{10} · \\f{3}{9}`, not `\\f{4}{10} · \\f{4}{10}`.",
  ex:[["Bag: 4 red, 6 blue. Draw two without replacement. P(both red)?",["First red: `\\f{4}{10}`","Second red: `\\f{3}{9}` // one red is gone, and one marble","`\\f{4}{10} · \\f{3}{9} = \\f{12}{90}`"],"`\\f{2}{15}`"],
      ["Same bag. P(second is red, given the first was blue)?",["After a blue: 4 red and 5 blue are left","`\\f{4}{9}`"],"`\\f{4}{9}`"]]});

/* ---------------- Geometry foundations ---------------- */
CB("geo0","l1",{t:"Points, lines, rays & angles",
  f:["\\t{acute} < 90° || \\t{right} = 90° || 90° < \\t{obtuse} < 180° || \\t{straight} = 180°"],
  h:["**Point**: an exact spot, no size. **Line**: goes on forever both ways.","**Ray**: starts at a point and goes forever one way — like a torch beam.","**Segment**: a piece with two endpoints — it has a length.","**Angle**: two rays from the same point (the vertex), measured in degrees."],
  pic:FIG2.angles({cap:"Acute is small, right is a square corner, obtuse is wide, straight is flat."}),
  k:[["Vertex","the corner point of an angle"],["⟂ perpendicular","meet at 90°"],["∥ parallel","never meet"]],
  tr:"**Acute** = a cute little angle. **Obtuse** = big and wide.",
  w:"Only call an angle 90° when it's **marked** with the little square (or the problem says so).",
  ex:[["An angle is 3 times half a right angle. What type is it?",["Half a right angle = 45°","`3 × 45 = 135°`"],"obtuse (135°)"],
      ["Two segments are perpendicular. What angle do they make?",["Perpendicular = a square corner"],"90°"]]});

CB("geo0","l2",{t:"Angle relationships",
  f:["\\t{complementary: } a + b = 90° || \\t{supplementary: } a + b = 180°","\\t{vertical angles are equal} || \\t{all the way around} = 360°"],
  h:["**Complementary** angles add to 90° (they make a corner).","**Supplementary** angles add to 180° (they make a straight line).","**Vertical angles** sit across from each other in an X — they're always equal.","Angles all the way around one point add to 360°."],
  pic:PIC.xang(60,{note:"60 + 120 = 180",cap:"Across the X: equal angles. Side by side: they add to 180°."}),
  tr:"**C**omplementary = **C**orner (90°). **S**upplementary = **S**traight (180°).",
  w:"The complement of 30° is 60°, its supplement is 150°. Don't mix them up.",
  ex:[["Two angles are supplementary; one is 4 times the other. Find both.",["`x + 4x = 180`","`5x = 180` → `x = 36`"],"36° and 144°"],
      ["Two lines cross. One angle is 70°. Find the other three.",["Across the X: 70°","Neighbours: `180 − 70 = 110°`"],"70°, 110°, 110°"]]});

CB("geo0","l3",{t:"Triangles: types & key facts",
  f:["\\c1{a} + \\c2{b} + \\c3{c} = 180°","\\t{Area} = \\f{1}{2} × \\t{base} × \\t{height}"],
  h:["The three inside angles of **any** triangle add to 180°.","By sides: **equilateral** (3 equal, all 60°), **isosceles** (2 equal sides → 2 equal angles), **scalene** (none equal).","The biggest angle is always across from the longest side.","The **height** meets the base at a right angle."],
  pic:FIG.tri({a:"height",b:"base",ac:"red",bc:"blue",cap:"Area = ½ × base × height — a triangle is half of a rectangle."}),
  k:[["Equilateral","3 equal sides, 3 × 60°"],["Isosceles","2 equal sides, 2 equal angles"],["Scalene","no equal sides"]],
  tr:"Tear off the 3 corners of a paper triangle and line them up — they make a straight line: **180°**.",
  w:"The height is not always a side: it's the straight-down (perpendicular) distance to the base.",
  ex:[["A triangle has angles 50° and 65°. Find the third angle.",["`180 − 50 − 65`"],"65° (two equal angles → isosceles!)"],
      ["An isosceles triangle has a top angle of 40°. Find each base angle.",["The base angles share `180 − 40 = 140`","`140 ÷ 2`"],"70° each"]]});

CB("geo0","l4",{t:"Quadrilaterals",
  f:["\\t{angles of any quadrilateral} = 360°","\\t{parallelogram } A = bh || \\t{trapezoid } A = \\f{1}{2}(b_{1} + b_{2})h"],
  h:["Every 4-sided shape's angles add to 360° (a diagonal splits it into two triangles).","**Parallelogram**: opposite sides parallel and equal; opposite angles equal.","**Rectangle** = parallelogram + right angles. **Rhombus** = 4 equal sides. **Square** = both!","**Trapezoid**: exactly one pair of parallel sides."],
  pic:FIG2.quads({cap:"The quadrilateral family: each member adds one more rule."}),
  tr:"A square is a rectangle **and** a rhombus — it's the shape that follows every rule.",
  w:"Parallelogram area uses the **height**, not the slanted side.",
  ex:[["Three angles of a quadrilateral are 80°, 95° and 110°. Find the fourth.",["`80 + 95 + 110 = 285`","`360 − 285`"],"75°"],
      ["A trapezoid has bases 6 and 10 and height 4. Area?",["Average the bases: `\\f{6 + 10}{2} = 8`","`8 × 4`"],"32"]]});

CB("geo0","l5",{t:"Perimeter & area",
  f:["\\t{perimeter} = \\t{add up all the sides} || \\t{area} = \\t{squares that fit inside}"],
  h:["**Perimeter** is the fence around the edge — a length (cm).","**Area** is the carpet inside — square units (cm²).","Odd shapes: **split** them into rectangles and triangles, or take a big rectangle and **subtract** the missing piece."],
  pic:PIC.flow([["L-shape","split it"],["10 × 4","40"],["3 × 5","15"],["total","55"]],["","+","="],{bw:110,gap:40}),
  tr:"**Fence vs carpet**: perimeter walks around, area fills in.",
  w:"Doubling the sides of a square doubles the perimeter but makes the area **4 times** bigger.",
  ex:[["A rectangle is 8 by 5. Perimeter and area?",["Perimeter: `2(8 + 5) = 26`","Area: `8 × 5 = 40`"],"P = 26, A = 40"],
      ["An L-shape: a 10 × 4 rectangle with a 3 × 5 rectangle on top. Total area?",["`10 × 4 = 40`","`3 × 5 = 15`","`40 + 15`"],"55"]]});

CB("geo0","l6",{t:"3D solids: volume & surface",
  f:["\\t{prism, cylinder: } V = \\t{base area} × h","\\t{cone, pyramid: } V = \\f{1}{3} × \\t{base area} × h || \\t{sphere: } V = \\f{4}{3}πr^{3}"],
  h:["**Volume** = how much fits inside (cubic units).","A prism or cylinder is a stack of identical slices → base area × height.","A pointy shape (cone, pyramid) holds exactly **one third** of the matching prism or cylinder.","**Surface area** = add up the areas of all the faces — the wrapping paper."],
  pic:FIG2.solids({cap:"Pointy shapes hold ⅓ of the matching prism or cylinder."}),
  k:[["Face","a flat side"],["Edge","where two faces meet"],["Vertex","a corner (a cube has 8)"]],
  tr:"**Pointy → ⅓.** A cone is one third of the can it fits in.",
  w:"Use the **radius**, not the diameter — halve the diameter first.",
  ex:[["A cylinder has r = 3 and h = 10. Volume?",["Base area: `π · 3^{2} = 9π`","`9π × 10`"],"`90π ≈ 282.7`"],
      ["A cone with the same base and height?",["`\\f{1}{3} × 90π`"],"`30π`"]]});

CB("geo0","l7",{t:"Shapes on the coordinate grid",
  f:["\\t{distance} = \\r{(x_{2} − x_{1})^{2} + (y_{2} − y_{1})^{2}}","\\t{midpoint} = (\\f{x_{1} + x_{2}}{2}, \\f{y_{1} + y_{2}}{2})"],
  h:["Flat (horizontal) or upright (vertical) lengths: just **subtract** the coordinates.","Slanted lengths: draw a right triangle and use **Pythagoras** — that's all the distance formula is.","The **midpoint** is the average of the x's and the average of the y's."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x>=1&&x<=4?1+(x-1)*4/3:NaN},c:"vio"}],pts:[[1,1,"A(1, 1)","blue",-58],[4,5,"B(4, 5)","red"]],slope:[1,1,4,5],cap:"From A to B: run 3, rise 4 → distance √(3² + 4²) = 5."}),
  tr:"Distance formula = **Pythagoras in disguise**. Midpoint = **average**.",
  w:"Squaring kills negatives: `(−3)^{2} = 9`. And don't forget the square root at the end.",
  ex:[["Distance from A(1, 1) to B(4, 5)?",["Run: `4 − 1 = 3`. Rise: `5 − 1 = 4`","`\\r{3^{2} + 4^{2}} = \\r{25}`"],"5"],
      ["Midpoint of (−2, 6) and (8, 0)?",["x: `\\f{−2 + 8}{2} = 3`","y: `\\f{6 + 0}{2} = 3`"],"(3, 3)"]]});

/* ---------------- Geometry: angles & triangles ---------------- */
CB("geo1","l1",{t:"Parallel lines & a transversal",
  f:["\\t{only two sizes of angle: } \\c1{a} \\t{ and } \\c2{b}, \\s \\c1{a} + \\c2{b} = 180°"],
  h:["When a line crosses two **parallel** lines it makes 8 angles — but only **2 sizes**.","All the small (acute) ones are equal; all the big (obtuse) ones are equal.","Any small one + any big one = 180°.","Shapes to spot: **Z** (alternate angles, equal), **F** (corresponding angles, equal), **C/U** (same-side angles, add to 180°)."],
  pic:FIG.para(["a","b","b","a","a","b","b","a"],{cs:["blue","red","red","blue","blue","red","red","blue"],cap:"Every a is equal, every b is equal, and a + b = 180°."}),
  tr:"**Z** = equal, **F** = equal, **U** = adds to 180°.",
  w:"These rules only work when the lines are **parallel** (look for the arrows or the word).",
  ex:[["Parallel lines are cut by a transversal; one angle is 65°. Find the other size.",["Small angles: all 65°","Big angles: `180 − 65`"],"65° and 115°"],
      ["Same-side interior angles are `2x + 10` and `3x + 20`. Find x.",["They add to 180: `5x + 30 = 180`","`5x = 150`"],"x = 30"]]});

CB("geo1","l2",{t:"Triangle rules",
  f:["a + b + c = 180° || \\t{exterior angle} = \\t{the two far inside angles added}"],
  h:["The inside angles always add to 180°.","An **exterior angle** (extend one side) equals the two inside angles that are **not** next to it.","The longest side is across from the biggest angle.","Isosceles: equal sides ↔ equal angles across from them."],
  pic:PIC.flow([["inside angles","40° + 60°"],["third angle","80°"],["exterior angle","100°"]],["","180 − 80"],{bw:140,gap:56}),
  tr:"Exterior angle = **the two far-away friends** added together.",
  w:"The exterior angle is 180° minus its **own neighbour** — not 180° minus all three.",
  ex:[["Two angles of a triangle are 40° and 60°. Find the exterior angle at the third corner.",["The far inside angles: 40° and 60°","`40 + 60`"],"100°"],
      ["An isosceles triangle has base angles `x` and top angle `x + 30`. Find x.",["`x + x + (x + 30) = 180`","`3x = 150`"],"x = 50"]]});

CB("geo1","l3",{t:"Pythagoras & special right triangles",
  f:["\\c1{a}^{2} + \\c3{b}^{2} = \\c4{c}^{2} \\s \\t{(c = the hypotenuse)}","45°\\t{–}45°\\t{–}90°: \\s x, \\s x, \\s x\\r{2} || 30°\\t{–}60°\\t{–}90°: \\s x, \\s x\\r{3}, \\s 2x"],
  h:["Only for **right** triangles. The hypotenuse c is the longest side, across from the right angle.","The two small squares (on the legs) together exactly fill the big square (on the hypotenuse).","Famous triples: **3-4-5**, **5-12-13**, **8-15-17**, **7-24-25** — and their multiples (6-8-10…).","45-45-90 is half a square: hypotenuse = leg × √2. 30-60-90 is half an equilateral triangle: sides x, x√3, 2x."],
  pic:PIC.pyth(3,4,{cap:"9 + 16 = 25: the two smaller squares fill the big one exactly."}),
  k:[["Hypotenuse","the longest side, across from 90°"],["Legs","the two sides that make the right angle"],["Triple","whole numbers that fit a² + b² = c²"]],
  tr:"Spot a **triple** and skip the work: 3-4-5, 5-12-13, 8-15-17 (and multiples).",
  w:"c must be the hypotenuse. Finding a **leg**? Subtract: `b^{2} = c^{2} − a^{2}`.",
  ex:[["The legs are 6 and 8. Find the hypotenuse.",["`6^{2} + 8^{2} = 36 + 64 = 100`","`c = \\r{100}` // or: 6-8-10 is 3-4-5 doubled"],"10"],
      ["The hypotenuse is 13 and one leg is 5. Find the other leg.",["`b^{2} = 13^{2} − 5^{2} = 169 − 25 = 144`","`b = \\r{144}`"],"12"],
      ["A 30-60-90 triangle has short leg 4. Find the other two sides.",["Long leg: `4\\r{3}`","Hypotenuse: `2 × 4 = 8`"],"`4\\r{3}` and 8"]]});

CB("geo1","l4",{t:"Similar triangles",
  f:["\\f{\\t{big side}}{\\t{matching small side}} = k \\s \\t{(the same for every pair)}","\\t{lengths} × k || \\t{areas} × k^{2} || \\t{volumes} × k^{3}"],
  h:["Similar = **same shape, different size**: equal angles, sides in the same ratio.","Two equal angles are enough to prove two triangles similar (AA).","Match sides by **position** (shortest with shortest…), then write one proportion.","Sides × k → area × k², volume × k³."],
  pic:PIC.simtri(3,2,2,{cap:"Every side doubled (k = 2) → the area is 4 times as big."}),
  tr:"Write every ratio as **big ÷ small** — they must all match.",
  w:"Scale factor 3 makes the area **9** times bigger, not 3.",
  ex:[["A triangle has sides 3, 4, 5. A similar triangle's shortest side is 9. Find its longest side.",["`k = \\f{9}{3} = 3`","`5 × 3`"],"15"],
      ["Two similar triangles have k = 3. The small one has area 10. Area of the big one?",["Areas grow by `k^{2} = 9`","`10 × 9`"],"90"]]});

CB("geo1","l5",{t:"Polygons & their angles",
  f:["\\t{inside angles add to } (n − 2) × 180° || \\t{each outside angle (regular)} = \\f{360°}{n}"],
  h:["From one corner, any n-sided polygon splits into **(n − 2) triangles** → (n − 2) × 180°.","**Regular** polygon: all sides and angles equal → divide the total by n.","The outside (exterior) angles of any polygon add to **360°** — walk around it and you turn once."],
  pic:POLYSPLIT(6,"A hexagon splits into 4 triangles → 4 × 180° = 720°."),
  tr:"**Triangles inside = sides − 2.**",
  w:"Use (n − 2), not n: a pentagon holds 3 triangles (540°), not 5.",
  ex:[["Angle sum of an octagon (8 sides)?",["`(8 − 2) × 180`"],"1080°"],
      ["Each inside angle of a regular hexagon?",["Total: `(6 − 2) × 180 = 720`","`720 ÷ 6`"],"120°"]]});

CB("geo1","l6",{t:"Congruence & the triangle inequality",
  f:["a + b > c \\s \\t{(for every pair of sides)}","\\t{difference} < \\t{third side} < \\t{sum}"],
  h:["**Congruent** = exact copies: same size and same shape.","Shortcuts that prove it: **SSS, SAS, ASA, AAS** (and **HL** for right triangles).","NOT proofs: SSA and AAA (AAA only proves similar).","Triangle inequality: any two sides must add to **more** than the third, or the sides can't close up."],
  pic:FIG.numline(0,12,{segs:[{a:4,b:10,c:"vio"}],cap:"Sides 3 and 7: the third side must be strictly between 7 − 3 = 4 and 7 + 3 = 10."}),
  k:[["≅","congruent: identical copies"],["SAS","two sides and the angle between them"]],
  tr:"The third side lives **between the difference and the sum**.",
  w:"Sides 2, 3, 5 do NOT make a triangle: 2 + 3 = 5 isn't **more** than 5 — it lies flat.",
  ex:[["Two sides are 5 and 9. Which could be the third side: 3, 4, 10 or 15?",["Between `9 − 5 = 4` and `9 + 5 = 14` (not equal to either)","Only 10 fits"],"10"],
      ["Two triangles share two equal sides and the equal angle between them. Congruent?",["That's SAS"],"Yes"]]});

CB("geo1","l7",{t:"Transformations: slide, flip, turn & resize",
  f:["\\t{slide: } (x, y) → (x + a, y + b) || \\t{flip over the } x\\t{-axis: } (x, y) → (x, −y)","\\t{turn 90° anticlockwise: } (x, y) → (−y, x) || \\t{resize by } k: (x, y) → (kx, ky)"],
  h:["**Slide** (translate): every point moves the same way.","**Flip** (reflect): a mirror image. Over the x-axis the y changes sign; over the y-axis the x changes sign.","**Turn** (rotate) around the origin.","**Resize** (dilate) by k from the origin: multiply both coordinates.","Slides, flips and turns keep the size (congruent). Resizing keeps the shape (similar)."],
  pic:FIG.plane({r:6,pts:[[2,3,"P(2, 3)","blue"],[2,-3,"flip (2, −3)","red"],[-3,2,"turn (−3, 2)","grn",-96],[5,5,"slide (5, 5)","vio",-92]],cap:"P(2, 3) flipped over the x-axis, turned 90°, and slid 3 right and 2 up."}),
  tr:"**Flip over x → y flips sign. Flip over y → x flips sign.**",
  w:"A 90° anticlockwise turn: (x, y) → (−y, x). You swap AND change a sign.",
  ex:[["Reflect (4, −1) over the y-axis.",["Over the y-axis → the x changes sign"],"(−4, −1)"],
      ["Dilate (3, −2) by a factor of 2 from the origin.",["Multiply both: `(2 · 3, 2 · (−2))`"],"(6, −4)"]]});

CB("geo1","l8",{t:"Solving geometry problems",
  f:["\\t{draw} → \\t{label} → \\t{spot a hidden shape} → \\t{write one equation}"],
  h:["Redraw the figure **big** and write every given number on it.","Hunt for hidden **right triangles**, **isosceles triangles** and **parallel lines**.","Call the unknown x and write one equation from a rule you know (180°, Pythagoras, area…).","Check the answer fits the picture: lengths positive, angles sensible."],
  pic:PIC.flow([["draw","sketch it"],["label","every number"],["spot","hidden shape"],["solve","one equation"]],["","",""],{bw:110,gap:36}),
  tr:"Stuck? **Draw one extra line** — a height or a diagonal often reveals a right triangle.",
  w:"Figures are not always drawn to scale — trust the numbers, not the look.",
  ex:[["A 10-ft ladder leans on a wall; its foot is 6 ft from the wall. How high up does it reach?",["Hidden right triangle: hypotenuse 10, leg 6","`h = \\r{10^{2} − 6^{2}} = \\r{64}`"],"8 ft"],
      ["A rectangle's diagonal is 13 and its width is 5. Find its area.",["Length: `\\r{13^{2} − 5^{2}} = 12`","Area: `12 × 5`"],"60"]]});

/* ---------------- Geometry: circles, area & volume ---------------- */
CB("geo2","l1",{t:"Circles",
  f:["C = 2πr = πd || A = πr^{2}","d = 2r"],
  h:["The **radius** goes from the centre to the edge; the **diameter** goes right across (2 radii).","**Circumference** = the distance around — the fence.","**Area** = the inside — the pizza.","π ≈ 3.14 is how many diameters fit around the circle."],
  pic:FIG.circ({r:"r",dia:"d = 2r",cap:"Radius: centre → edge. Diameter: edge → edge, through the centre."}),
  k:[["Radius r","centre to edge"],["Diameter d","across, through the centre"],["Circumference","the distance around"]],
  tr:"**Area has the square** (πr²) because area is measured in squares.",
  w:"Given the diameter? Halve it before using πr².",
  ex:[["A circle has diameter 10. Find its circumference and area.",["r = 5","C = `2π · 5 = 10π`","A = `π · 5^{2} = 25π`"],"C = 10π, A = 25π"],
      ["A circle has area 49π. Find its circumference.",["`r^{2} = 49` → `r = 7`","C = `2π · 7`"],"14π"]]});

CB("geo2","l2",{t:"Area of common shapes",
  f:["\\t{rectangle } lw || \\t{triangle } \\f{1}{2}bh || \\t{parallelogram } bh","\\t{trapezoid } \\f{1}{2}(b_{1} + b_{2})h || \\t{circle } πr^{2}"],
  h:["Every area formula grows out of the **rectangle**.","Parallelogram = a rectangle with one end sliced off and moved over → b × h.","Triangle = half a parallelogram → ½bh.","Trapezoid: two copies make a parallelogram → half of (b₁ + b₂) × h.","Shaded region = **big shape − small shape**."],
  pic:TRAP2("Two identical trapezoids make a parallelogram → each one is ½(b₁ + b₂)h."),
  tr:"**Shaded = outside − inside.**",
  w:"The h in every formula is the **perpendicular** height, never a slanted side.",
  ex:[["A square of side 10 has a circle of radius 5 cut out of it. Shaded area?",["Square: `10^{2} = 100`","Circle: `π · 5^{2} = 25π`","`100 − 25π`"],"`100 − 25π ≈ 21.5`"],
      ["A triangle has base 12 and height 7. Area?",["`\\f{1}{2} · 12 · 7`"],"42"]]});

CB("geo2","l3",{t:"Volume & surface area",
  f:["\\t{box: } V = lwh || SA = 2(lw + lh + wh)","\\t{cylinder: } V = πr^{2}h || SA = 2πr^{2} + 2πrh"],
  h:["**Volume** counts the unit cubes inside. **Surface area** adds up the faces — the paint on the outside.","A box has three pairs of matching faces.","A cylinder unrolls into two circles (the lids) and one rectangle (the label) whose width is the circumference 2πr."],
  pic:FIG.box({l:"l = 5",w:"w = 3",h:"h = 4",cap:"Volume = 5 × 3 × 4 = 60 cubes. Paint = 2(15 + 20 + 12) = 94 squares."}),
  tr:"Cylinder surface: **two lids + one label**.",
  w:"Volume is in cubic units (cm³); surface area is in square units (cm²).",
  ex:[["A box is 5 × 3 × 4. Find its volume and surface area.",["V = `5 · 3 · 4 = 60`","SA = `2(15 + 20 + 12) = 2 · 47`"],"V = 60, SA = 94"],
      ["A cylinder has r = 2 and h = 5. Volume?",["`π · 2^{2} · 5`"],"`20π`"]]});

CB("geo2","l4",{t:"Circle rules: inscribed angles & tangents",
  f:["\\t{inscribed angle} = \\f{1}{2} × \\t{central angle} || \\t{tangent} ⟂ \\t{radius}"],
  h:["A **central** angle sits at the centre — it equals its arc.","An **inscribed** angle sits on the edge, looking at the same arc — it's **half** as big.","An angle that looks at a diameter (a semicircle) is always 90°.","A **tangent** touches the circle once and makes a right angle with the radius there."],
  pic:FIG.circ({deg:80,cap:"Central angle 80° → any angle on the edge looking at the same arc is 40°."}),
  tr:"**Edge angle = half the centre angle.**",
  w:"Tangent + radius = right angle → there's usually a hidden Pythagoras.",
  ex:[["A central angle is 110°. Find an inscribed angle on the same arc.",["Half of it: `110 ÷ 2`"],"55°"],
      ["A tangent from P touches a circle of radius 5; P is 13 from the centre. Find the tangent length.",["Right angle where it touches","`\\r{13^{2} − 5^{2}} = \\r{144}`"],"12"]]});

CB("geo2","l5",{t:"Circle equations",
  f:["(x − \\c1{h})^{2} + (y − \\c1{k})^{2} = \\c2{r}^{2}","\\t{centre } (\\c1{h}, \\c1{k}) || \\t{radius } \\c2{r}"],
  h:["Every point on the circle is exactly **r** away from the centre — the equation is just the distance formula.","Signs **flip**: `(x − 3)` means h = 3; `(y + 2)` means k = −2.","The right side is r², so take its **square root** to get the radius.","Messy form like `x^{2} + 6x + y^{2} …`? Complete the square for x and for y."],
  pic:FIG.plane({r:6,fns:[{f:function(x){var q=9-(x-2)*(x-2);return q<0?NaN:-1+Math.sqrt(q)}},{f:function(x){var q=9-(x-2)*(x-2);return q<0?NaN:-1-Math.sqrt(q)},c:"blue"}],pts:[[2,-1,"","red"]],labels:[[0.3,-2.1,"centre (2, −1)","red"]],cap:"(x − 2)² + (y + 1)² = 9 → centre (2, −1), radius 3."}),
  tr:"**Signs flip, and square-root the right side.**",
  w:"`(x + 4)^{2}` means h = −4. And r² = 20 means r = `\\r{20}`, not 20.",
  ex:[["Find the centre and radius of `(x − 2)^{2} + (y + 1)^{2} = 9`.",["h = 2, k = −1 // signs flip","r = `\\r{9} = 3`"],"centre (2, −1), r = 3"],
      ["Find the centre and radius of `x^{2} + 6x + y^{2} − 4y = 12`.",["x: `x^{2} + 6x + 9 = (x + 3)^{2}` // add (6 ÷ 2)² = 9","y: `y^{2} − 4y + 4 = (y − 2)^{2}` // add (4 ÷ 2)² = 4","Right side: `12 + 9 + 4 = 25`"],"centre (−3, 2), r = 5"]]});

CB("geo2","l6",{t:"Scaling shapes",
  f:["\\t{lengths} × k || \\t{areas} × k^{2} || \\t{volumes} × k^{3}"],
  h:["Scale every length by k: perimeters (lengths) × k.","Areas grow in **two** directions → × k².","Volumes grow in **three** directions → × k³.","It works backwards too: area × 9 means lengths × 3."],
  pic:PIC.flow([["sides","× 2"],["area","× 4"],["volume","× 8"]],["2²","2³"],{bw:120,gap:56}),
  tr:"**1D → k, 2D → k², 3D → k³.**",
  w:"Doubling a cube's edge makes its volume **8** times bigger, not 2.",
  ex:[["A cube's edge is tripled. How does its surface area change?",["Surface area is an area → `k^{2}`","`3^{2}`"],"9 times as big"],
      ["Two similar cylinders have volumes 16 and 54. Ratio of their radii?",["Volume ratio: `\\f{54}{16} = \\f{27}{8}`","Lengths: cube root of each → `\\f{3}{2}`"],"3 : 2"]]});

CB("geo2","l7",{t:"Composite solids & real-world volume",
  f:["V_{\\t{total}} = V_{1} + V_{2} \\s \\t{or} \\s V_{\\t{big}} − V_{\\t{hole}}"],
  h:["Break the object into shapes you know (a cylinder + a cone, a box − a cylinder hole).","Find each volume, then **add** (glued together) or **subtract** (cut out).","Watch the units: 1 litre = 1,000 cm³."],
  pic:PIC.flow([["cylinder","90π"],["cone on top","12π"],["silo","102π"]],["+","="],{bw:130,gap:44}),
  tr:"**Glued → add. Drilled → subtract.**",
  w:"Convert units before you compute: cm³ ÷ 1000 = litres.",
  ex:[["A silo is a cylinder (r = 3, h = 10) with a cone on top (r = 3, h = 4). Volume?",["Cylinder: `π · 9 · 10 = 90π`","Cone: `\\f{1}{3} · π · 9 · 4 = 12π`","`90π + 12π`"],"`102π`"],
      ["A box is 10 cm × 10 cm × 10 cm. How many litres does it hold?",["`10 · 10 · 10 = 1000` cm³","1000 cm³ = 1 L"],"1 litre"]]});

/* ---------------- Trigonometry ---------------- */
CB("trig","l1",{t:"SOH-CAH-TOA",
  f:["sin θ = \\f{\\c2{\\t{opp}}}{\\c5{\\t{hyp}}} || cos θ = \\f{\\c3{\\t{adj}}}{\\c5{\\t{hyp}}} || tan θ = \\f{\\c2{\\t{opp}}}{\\c3{\\t{adj}}}"],
  h:["Only for **right** triangles. Stand at the angle θ and look around:","**Opposite** = the side across from you. **Adjacent** = the side next to you (not the long one). **Hypotenuse** = the longest side, across from the right angle.","Each trig value is a **ratio of two sides**. It depends only on the angle — not on how big the triangle is."],
  pic:FIG.tri({a:"opposite",b:"adjacent",c:"hypotenuse",ang:"θ",ac:"red",bc:"grn",cc:"vio",cap:"Standing at θ: opposite is across, adjacent is beside you, the hypotenuse is the long slant."}),
  k:[["Opposite","the side across from θ"],["Adjacent","the side touching θ (not the hypotenuse)"],["Hypotenuse","the longest side"]],
  tr:"**SOH-CAH-TOA**: Sine = Opp/Hyp, Cosine = Adj/Hyp, Tangent = Opp/Adj.",
  w:"Opposite and adjacent depend on **which angle** you stand at — move to the other angle and they swap.",
  ex:[["A right triangle has opposite 3, adjacent 4, hypotenuse 5. Find sin θ, cos θ and tan θ.",["sin = opp ÷ hyp = `\\f{3}{5}`","cos = adj ÷ hyp = `\\f{4}{5}`","tan = opp ÷ adj = `\\f{3}{4}`"],"`\\f{3}{5}`, `\\f{4}{5}`, `\\f{3}{4}`"],
      ["In a right triangle, sin A = `\\f{5}{13}`. Find cos A.",["Opp 5, hyp 13 → adj = `\\r{169 − 25} = 12` // Pythagoras","cos = adj ÷ hyp"],"`\\f{12}{13}`"]]});

CB("trig","l2",{t:"Radians & the unit circle",
  f:["180° = π \\t{ radians}","\\t{degrees → radians: } × \\f{π}{180} || \\t{radians → degrees: } × \\f{180}{π}"],
  h:["One **radian** is the angle whose arc is exactly as long as the radius.","Half a turn = π radians = 180°. A full turn = 2π = 360°.","The **unit circle** has radius 1. The point at angle θ is (cos θ, sin θ).","So cos θ is the **x** of that point and sin θ is the **y**."],
  pic:PIC.ucirc(40,{lab:"θ",cap:"On the unit circle: x = cos θ (green), y = sin θ (violet)."}),
  tr:"**π = 180°.** Swap them like units: 60° = 60 × π/180 = π/3.",
  w:"Check your calculator mode: degrees or radians.",
  ex:[["Convert 135° to radians.",["`135 × \\f{π}{180}`","Simplify `\\f{135}{180} = \\f{3}{4}`"],"`\\f{3π}{4}`"],
      ["Convert `\\f{5π}{6}` to degrees.",["Replace π with 180°: `\\f{5 × 180}{6}`"],"150°"]]});

CB("trig","l3",{t:"Finding missing sides with trig",
  f:["\\c2{\\t{opp}} = \\c5{\\t{hyp}} · sin θ || \\c3{\\t{adj}} = \\c5{\\t{hyp}} · cos θ || \\c2{\\t{opp}} = \\c3{\\t{adj}} · tan θ"],
  h:["**Step 1:** label the sides from the angle's point of view: opp, adj, hyp.","**Step 2:** pick the ratio that uses the side you **know** and the side you **want**.","**Step 3:** write it as an equation and solve. If the unknown ends up on the bottom, swap it with the trig value."],
  pic:FIG.tri({a:"x (opp)",c:"20 (hyp)",ang:"35°",ac:"red",cc:"vio",cap:"Know the hypotenuse, want the opposite → sine: x = 20 sin 35° ≈ 11.5."}),
  tr:"Circle the two sides involved, then pick the ratio with **exactly those two**.",
  w:"Degree mode for angles in degrees — otherwise your answer is nonsense.",
  ex:[["The hypotenuse is 20 and the angle is 35°. Find the side opposite the angle.",["opp & hyp → sin","`x = 20 · sin 35°`","`≈ 20 × 0.574`"],"≈ 11.5"],
      ["A ramp rises at 10° and covers 12 m horizontally. How high does it go?",["Know adj (12), want opp → tan","`h = 12 · tan 10° ≈ 12 × 0.176`"],"≈ 2.1 m"]]});

CB("trig","l4",{t:"Arcs & sectors",
  f:["\\t{arc} = \\f{θ}{360°} × 2πr || \\t{sector} = \\f{θ}{360°} × πr^{2}","s = rθ \\s \\t{(θ in radians)}"],
  h:["An **arc** is a slice of the circumference; a **sector** is the same slice of the area (a pizza slice).","The slice fraction is **angle ÷ full turn** (360°).","In radians it's even simpler: arc = radius × angle.","Handy values: sin 30° = ½, cos 60° = ½, sin 45° = cos 45° = √2⁄2."],
  pic:FIG.circ({deg:90,r:"r = 6",cap:"A 90° sector is ¼ of the pizza: arc = ¼ · 12π = 3π, area = ¼ · 36π = 9π."}),
  tr:"**Slice fraction = angle ÷ 360.** Use the same fraction for the arc and the area.",
  w:"s = rθ only works when θ is in **radians**.",
  ex:[["Radius 6, central angle 60°. Arc length?",["Fraction: `\\f{60}{360} = \\f{1}{6}`","`\\f{1}{6} × 2π · 6`"],"`2π`"],
      ["Radius 4, angle `\\f{π}{2}` radians. Arc length?",["`s = rθ = 4 · \\f{π}{2}`"],"`2π`"]]});

CB("trig","l5",{t:"Trig identities & complementary angles",
  f:["sin^{2}θ + cos^{2}θ = 1","sin θ = cos(90° − θ) || tan θ = \\f{sin θ}{cos θ}"],
  h:["The two small angles of a right triangle add to 90°.","The side **opposite** one of them is **adjacent** to the other — so the sine of one is the cosine of the other.","Similar triangles have equal angles → equal trig ratios, whatever their size.","Pythagoras on the unit circle gives sin²θ + cos²θ = 1."],
  pic:PIC.ucirc(30,{lab:"30°",pt:"(√3⁄2, ½)",cos:"√3⁄2",sin:"½",cap:"(√3⁄2)² + (½)² = ¾ + ¼ = 1 — that's sin² + cos² = 1."}),
  tr:"**Co**-sine = the sine of the **co**mplement: sin 20° = cos 70°.",
  w:"If sin x° = cos y° (both acute), then x + y = 90 — the SAT loves this one.",
  ex:[["If sin x° = cos 32° and 0 < x < 90, find x.",["Complements: `x + 32 = 90`"],"x = 58"],
      ["sin θ = `\\f{3}{5}` and θ is acute. Find cos θ.",["`cos^{2}θ = 1 − \\f{9}{25} = \\f{16}{25}`","`cos θ = \\f{4}{5}` // acute → positive"],"`\\f{4}{5}`"]]});
