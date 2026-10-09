/* =====================================================================
   AXIOM — Copybook notes 2: ratios · measurement · algebra · factoring
   ===================================================================== */

/* ---------------- Ratios, rates & proportions ---------------- */
CB("ratio","l1",{t:"Ratios and scaling",
  f:["\\t{one part} = \\f{\\t{total}}{\\t{sum of the ratio numbers}}"],
  h:["A **ratio** compares amounts: 3 : 2 means “3 of these for every 2 of those”.","Scale a ratio by multiplying **both** numbers by the same thing: 3 : 2 = 6 : 4 = 30 : 20.","**Part-to-whole:** with boys : girls = 3 : 2, the whole is 3 + 2 = 5 parts, so boys are 3/5 of the class.","**One-part method:** total ÷ number of parts = size of one part. Then multiply."],
  pic:TAPE(["B","B","B","G","G"],["var(--blue)","var(--blue)","var(--blue)","var(--red)","var(--red)"],"3 : 2 → 5 equal parts"),
  tr:"Draw the parts as boxes. Total ÷ boxes = what one box is worth.",
  w:"3 : 2 does **not** mean 3 boys out of 2 — it's 3 out of **5**.",
  ex:[["30 students, boys : girls = 3 : 2. How many boys?",["Total parts: `3 + 2 = 5`","One part: `30 ÷ 5 = 6` students","Boys: `3 × 6`"],"18 boys"],
      ["Flour : sugar = 5 : 2. You use 15 cups of flour. How much sugar?",["Flour went from 5 to 15 → scale by 3","Sugar: `2 × 3`"],"6 cups"]]});

CB("ratio","l2",{t:"Rates & proportions",
  f:["\\f{a}{b} = \\f{c}{d} ⟹ a × d = b × c","\\t{unit rate} = \\f{\\t{total}}{\\t{number of units}}"],
  h:["A **rate** compares different units: km per hour, dollars per kilo. The **unit rate** is the amount for **one**.","A **proportion** says two ratios are equal. Solve it by **cross-multiplying**.","To convert units, multiply by a fraction equal to 1 (like `\\f{60 \\t{min}}{1 \\t{h}}`) so the unwanted unit cancels."],
  pic:PIC.flow([["3 pens","$12"],["1 pen","$4"],["8 pens","$32"]],["÷ 3","× 8"]),
  tr:"Write the **units** on everything. If they cancel to what you want, your setup is right.",
  w:"Keep the same order on both sides: pens over dollars = pens over dollars.",
  ex:[["3 pens cost $12. What do 8 pens cost?",["Unit rate: `12 ÷ 3 = 4` dollars per pen","8 pens: `8 × 4`"],"$32"],
      ["Solve `\\f{4}{9} = \\f{x}{36}`",["Cross-multiply: `9x = 4 × 36 = 144`","`x = 144 ÷ 9`"],"x = 16"]]});

CB("ratio","l3",{t:"Converting squared & cubed units",
  f:["1 \\t{ft} = 12 \\t{in} → 1 \\t{ft}^{2} = 144 \\t{in}^{2} → 1 \\t{ft}^{3} = 1728 \\t{in}^{3}","\\t{density} = \\f{\\t{mass}}{\\t{volume}}"],
  h:["For **area**, use the conversion **twice** (12 × 12 = 144). For **volume**, use it **three** times (12 × 12 × 12 = 1728).","Two-step conversions chain fractions: km/h → m/s means × 1000 (km→m) and ÷ 3600 (h→s).","**Density** = how much stuff is packed into each unit of space: mass ÷ volume, or people ÷ area."],
  pic:PIC.flow([["1 m²","1 m × 1 m"],["in cm","100 × 100"],["= ","10,000 cm²"]],["",""]),
  tr:"Square units → square the conversion number. Cube units → cube it.",
  w:"1 m² is **10,000** cm², not 100 cm².",
  ex:[["How many square inches are in 3 square feet?",["1 ft² = `12 × 12 = 144` in²","`3 × 144`"],"432 in²"],
      ["Convert 72 km/h to m/s.",["`72 × 1000 = 72000` m per hour","÷ 3600 seconds: `72000 ÷ 3600`"],"20 m/s"]]});

CB("ratio","l4",{t:"Speed, meeting & work problems",
  f:["d = r × t || \\t{average speed} = \\f{\\t{total distance}}{\\t{total time}}","\\t{together}: \\f{1}{a} + \\f{1}{b} = \\f{1}{T}"],
  h:["**distance = rate × time** — and its two rearrangements: rate = d ÷ t, time = d ÷ r.","Two things moving **toward** each other close the gap at the **sum** of their speeds.","**Average speed** is total distance ÷ total time — never the average of the two speeds.","**Work:** if a job takes 3 hours, you do 1/3 of it per hour. People working together **add their rates**."],
  pic:ROAD(),
  tr:"Make a little table: **Rate | Time | Distance** (or Work). Fill it in, and the equation writes itself.",
  w:"60 miles at 30 mph and back at 60 mph: the average is **40** mph, not 45.",
  ex:[["Two cars 300 miles apart drive toward each other at 40 and 60 mph. When do they meet?",["The gap closes at `40 + 60 = 100` mph","Time = distance ÷ rate: `300 ÷ 100`"],"after 3 hours"],
      ["Ana paints a room in 3 h, Ben in 6 h. Together?",["Rates per hour: Ana `\\f{1}{3}`, Ben `\\f{1}{6}`","Together: `\\f{1}{3} + \\f{1}{6} = \\f{2}{6} + \\f{1}{6} = \\f{1}{2}` room per hour","Half a room per hour → 2 hours for one room"],"2 hours"]]});

CB("ratio","l5",{t:"Direct & inverse variation",
  f:["\\t{direct}: y = kx || \\t{inverse}: y = \\f{k}{x}"],
  h:["**Direct:** when one doubles, the other doubles. The ratio `\\f{y}{x}` is always the same number k. The graph is a straight line through (0, 0).","**Inverse:** when one doubles, the other halves. The product `x × y` is always the same number k.","Find k from one pair of values, then use it for the new value."],
  pic:FIG.plane({r:6,lines:[{m:0.8,b:0}],fns:[{f:function(x){return x>0.3?4/x:NaN},c:"red"}],labels:[[2.4,4.8,"direct: y = 0.8x","blue"],[2.6,1.1,"inverse: y = 4/x","red"]],cap:"Direct: a line through the origin. Inverse: a curve that drops as x grows."}),
  tr:"**Direct → divide** gives the constant. **Inverse → multiply** gives the constant.",
  w:"More workers → **fewer** days. That's inverse — don't use a direct proportion.",
  ex:[["y varies directly with x; y = 15 when x = 5. Find y when x = 8.",["`k = \\f{y}{x} = \\f{15}{5} = 3` → `y = 3x`","`y = 3 × 8`"],"24"],
      ["6 workers finish a job in 10 days. How long for 15 workers?",["Inverse: the product stays the same → `6 × 10 = 60` worker-days","`60 ÷ 15`"],"4 days"]]});

CB("ratio","l6",{t:"Ratio tables & scale drawings",
  f:["\\t{real} = \\t{map length} × \\t{scale}"],
  h:["A **ratio table** lists equal ratios side by side: 2 : 5, 4 : 10, 6 : 15 … Multiply or divide columns to reach the number you need.","A **double number line** puts two quantities on matching lines so you can read across.","A **scale** like 1 cm : 5 km means every 1 cm on the map is 5 km in real life."],
  pic:PIC.flow([["map","1 cm"],["real","5 km"],["7 cm map","35 km"]],["means","× 7"]),
  tr:"Find the “**1**” first (1 cm = 5 km). From 1 you can reach any number.",
  w:"Areas on a scale drawing scale by the scale **squared**: 2× lengths → 4× area.",
  ex:[["Map scale 1 cm : 5 km. Two towns are 7 cm apart. Real distance?",["1 cm stands for 5 km","`7 × 5`"],"35 km"],
      ["A recipe for 4 people uses 300 g of rice. How much for 10 people?",["For 1 person: `300 ÷ 4 = 75` g","For 10: `75 × 10`"],"750 g"]]});

/* ---------------- Measurement & unit conversions ---------------- */
CB("meas","l1",{t:"The metric system",
  f:["\\t{kilo} = 1000 || \\t{centi} = \\f{1}{100} || \\t{milli} = \\f{1}{1000}"],
  h:["Metric units go up and down in steps of 10, so converting = **moving the decimal point**.","**kilo-** means 1000: 1 km = 1000 m, 1 kg = 1000 g. **centi-** means hundredth: 100 cm = 1 m. **milli-** means thousandth: 1000 mm = 1 m.","Going to a **smaller** unit → the number gets **bigger** (multiply). Going to a **bigger** unit → divide."],
  pic:PIC.flow([["km","1"],["m","1,000"],["cm","100,000"],["mm","1,000,000"]],["× 1000","× 100","× 10"],{bw:100,gap:56}),
  tr:"“**K**ing **H**enry **D**ied **B**y **D**rinking **C**hocolate **M**ilk” — kilo, hecto, deca, base, deci, centi, milli.",
  w:"Smaller unit, bigger number: 2.5 m is 250 cm (not 0.025).",
  ex:[["Convert 3.7 km to metres.",["km → m is × 1000 (smaller unit, bigger number)","`3.7 × 1000`"],"3,700 m"],
      ["Convert 450 mL to litres.",["mL → L is ÷ 1000","`450 ÷ 1000`"],"0.45 L"]]});

CB("meas","l2",{t:"US customary units",
  f:["12 \\t{in} = 1 \\t{ft} || 3 \\t{ft} = 1 \\t{yd} || 5280 \\t{ft} = 1 \\t{mi} || 16 \\t{oz} = 1 \\t{lb}"],
  h:["US units don't go in tens, so you **chain** conversion fractions.","Write each step as a fraction equal to 1, with the unit you want to cancel on the opposite side.","Volume ladder: 2 cups = 1 pint, 2 pints = 1 quart, 4 quarts = 1 gallon."],
  pic:PIC.flow([["gallon","1"],["quarts","4"],["pints","8"],["cups","16"]],["× 4","× 2","× 2"],{bw:100,gap:56}),
  tr:"Unit you want to get rid of goes on the **bottom** of the next fraction.",
  w:"Don't mix ounces of weight (oz) with fluid ounces (fl oz) — the SAT will tell you which one.",
  ex:[["How many inches are in 2.5 yards?",["`2.5 \\t{yd} × \\f{3 \\t{ft}}{1 \\t{yd}} = 7.5` ft","`7.5 \\t{ft} × \\f{12 \\t{in}}{1 \\t{ft}} = 90` in"],"90 in"],
      ["A recipe needs 3 quarts of milk. How many cups?",["1 quart = 2 pints = 4 cups","`3 × 4`"],"12 cups"]]});

CB("meas","l3",{t:"Time, speed & temperature",
  f:["F = \\f{9}{5}C + 32 || C = \\f{5}{9}(F − 32)","1 \\t{h} = 60 \\t{min} = 3600 \\t{s}"],
  h:["Time is in sixties: 1.5 hours = 1 hour 30 minutes (not 1 h 50 min!).","To change a **speed**, convert the top unit and the bottom unit separately.","**Temperature:** Celsius → Fahrenheit: × 9/5, then + 32. Back: − 32 first, then × 5/9."],
  pic:PIC.flow([["°C","25"],["× 9/5","45"],["+ 32","77 °F"]],["",""]),
  tr:"Water freezes at **0 °C = 32 °F** and boils at **100 °C = 212 °F**. Use them to check.",
  w:"0.75 hours is 45 minutes, not 75.",
  ex:[["Convert 30 °C to °F.",["`\\f{9}{5} × 30 = 54`","`54 + 32 = 86`"],"86 °F"],
      ["Convert 90 km/h into metres per minute.",["Top: `90 \\t{km} = 90000 \\t{m}`","Bottom: 1 h = 60 min → `90000 ÷ 60`"],"1,500 m/min"]]});

CB("meas","l4",{t:"Converting areas, volumes & rates",
  f:["(\\t{length factor})^{2} \\t{for area} || (\\t{length factor})^{3} \\t{for volume}"],
  h:["**Area** conversions square the length factor: 1 m = 100 cm → 1 m² = 10,000 cm².","**Volume** conversions cube it: 1 m³ = 1,000,000 cm³. Also 1 L = 1000 cm³ and 1 mL = 1 cm³.","**Rates** like $ per m² or L per hour: convert the top and the bottom one at a time."],
  pic:FIG.box({l:"100 cm",w:"100 cm",h:"100 cm",cap:"1 m³ = 100 × 100 × 100 = 1,000,000 cm³ = 1000 L."}),
  tr:"Ask “is this a length, an area or a volume?” — then use the factor once, twice or three times.",
  w:"A carpet price of $20 per m² is **$0.002 per cm²** — the bottom unit got 10,000 times smaller.",
  ex:[["A tank holds 2.4 m³. How many litres?",["1 m³ = 1000 L","`2.4 × 1000`"],"2,400 L"],
      ["Paint covers 12 m² per litre. How many cm² per mL?",["12 m² = `12 × 10000 = 120000` cm²","1 L = 1000 mL → `120000 ÷ 1000`"],"120 cm² per mL"]]});

/* ---------------- Algebra: expressions & equations ---------------- */
CB("alg","l0",{t:"One-step equations",
  f:["x + a = b ⟹ x = b − a || ax = b ⟹ x = \\f{b}{a}"],fl:"Undo it",
  h:["An equation is a **balance**. To get x alone, **undo** what's happening to it with the opposite move.","+ is undone by −. × is undone by ÷. And the other way round.","Whatever you do to one side, do **exactly** the same to the other side."],
  pic:FIG.scale("x + 7","15",{cap:"Take 7 off both pans and the balance stays level: x = 8."}),
  tr:"Ask: “What is being done to x?” Then do the **opposite** to both sides.",
  w:"For `\\f{x}{4} = 3`, multiply by 4 (don't divide): x = 12.",
  ex:[["Solve `x + 7 = 15`",["7 is added to x → subtract 7 from both sides","`x = 15 − 7`"],"x = 8"],
      ["Solve `\\f{2}{3}x = 10`",["x is multiplied by `\\f{2}{3}` → multiply both sides by the flip `\\f{3}{2}`","`x = 10 × \\f{3}{2} = 15`"],"x = 15"]]});

CB("alg","l1",{t:"Expressions & like terms",
  f:["3x + 5x = 8x || a(b + c) = ab + ac"],
  h:["A **variable** (like x) is just a number we don't know yet. `3x` means 3 times x.","**Like terms** have exactly the same letter part: 3x and 5x combine to 8x. But 3x and 5 can't combine — x's and plain numbers are different things.","**Distribute** (open brackets): multiply the outside number by **every** term inside.","A minus in front of a bracket flips **every** sign inside: `−(x − 5) = −x + 5`."],
  pic:TILES([[3,"x","var(--blue)"],[5,"1","var(--grn)"],[2,"x","var(--blue)"]],"3x + 5 + 2x → 5x + 5"),
  tr:"Think of x as **apples** and plain numbers as **oranges**. You can add apples to apples only.",
  w:"`2(x + 4)` is `2x + 8`, not `2x + 4` — the 2 multiplies **both** terms.",
  ex:[["Simplify `2(3x − 4) − (x − 5)`",["Distribute: `6x − 8 − x + 5` // the minus flips both signs inside","Combine x's: `6x − x = 5x`","Combine numbers: `−8 + 5 = −3`"],"`5x − 3`"],
      ["Evaluate `x^{2} − 3x` when `x = −2`",["Put −2 in brackets: `(−2)^{2} − 3(−2)`","`4 + 6`"],"10"]]});

CB("alg","l2",{t:"Solving equations: the balance",
  f:["ax + b = c ⟹ x = \\f{c − b}{a}"],
  h:["Undo in **reverse order**: first get rid of the + or − number, then the × or ÷.","Variables on both sides? Move all x's to one side and all numbers to the other.","Fractions? Multiply **every** term by the bottom number to clear them.","**Always check** by putting your answer back into the original equation."],
  pic:FIG.scale("4x − 7","13",{cap:"Add 7 to both pans, then divide both by 4."}),
  tr:"**Peel** x like an onion: the last thing done to x comes off first.",
  w:"When you move a term across the = sign, its sign flips. Moving `+3x` gives `−3x`.",
  ex:[["Solve `4x − 7 = 13`",["Add 7 to both sides: `4x = 20` // undo −7","Divide both sides by 4: `x = 5` // undo ×4","Check: `4(5) − 7 = 13` ✓"],"x = 5"],
      ["Solve `5x + 2 = 3x + 12`",["Subtract 3x from both sides: `2x + 2 = 12`","Subtract 2: `2x = 10`","Divide by 2"],"x = 5"]]});

CB("alg","l3",{t:"Turning words into equations",
  f:["\\t{is} → = || \\t{of} → × || \\t{more than} → + || \\t{less than} → − \\t{(order flips)}"],fl:"The dictionary",
  h:["**Name the unknown** first: “Let m = number of minutes.”","Translate one phrase at a time using the dictionary.","Solve, then **re-read the question** — sometimes they want 2x or the total, not x."],
  pic:PIC.flow([["“twice a number”","2n"],["“increased by 5”","+ 5"],["“is 17”","= 17"]],["",""],{bw:150,gap:30}),
  tr:"Underline the **last sentence** first: it tells you what to find.",
  w:"“Three less than x” is `x − 3`. “Three less x” is rare — read carefully.",
  ex:[["A phone plan costs $20 plus $0.10 per minute. The bill is $35. How many minutes?",["Let m = minutes","`20 + 0.10m = 35`","`0.10m = 15` → `m = 150`"],"150 minutes"],
      ["Three consecutive integers add to 72. Find the largest.",["Call them x, x + 1, x + 2","`3x + 3 = 72` → `3x = 69` → `x = 23`","They want the largest: `23 + 2`"],"25"]]});

CB("alg","l4",{t:"Literal equations: solving for a letter",
  f:["A = lw ⟹ w = \\f{A}{l}"],
  h:["When there are only letters, treat every **other** letter as if it were a number and use the normal balance moves.","Ask: what is happening to the letter I want? Undo it, step by step.","Trick: replace the letters with simple numbers (12 = 3 × 4), see what you'd do, then put the letters back."],
  pic:PIC.flow([["A = l × w","12 = 3 × 4"],["to get 4","12 ÷ 3"],["so","w = A ÷ l"]],["",""],{bw:140,gap:36}),
  tr:"**Unwrap** the letter you want, like a present: outer layer first.",
  w:"Divide **everything** on the other side: from `P = 2l + 2w`, `l = \\f{P − 2w}{2}`, not `P − w`.",
  ex:[["Solve `P = 2l + 2w` for l.",["Subtract 2w: `P − 2w = 2l`","Divide by 2: `l = \\f{P − 2w}{2}`"],"`l = \\f{P − 2w}{2}`"],
      ["Solve `F = \\f{9}{5}C + 32` for C.",["Subtract 32: `F − 32 = \\f{9}{5}C`","Multiply by `\\f{5}{9}`: `C = \\f{5}{9}(F − 32)`"],"`C = \\f{5}{9}(F − 32)`"]]});

CB("alg","l5",{t:"No solution & infinitely many solutions",
  f:["ax + b = cx + d: || a ≠ c → \\t{one} || a = c, b ≠ d → \\t{none} || a = c, b = d → \\t{infinitely many}"],
  h:["Simplify both sides fully, then compare.","If the x's **cancel** and you're left with something false (like 3 = 5) → **no solution**.","If the x's cancel and you're left with something always true (5 = 5) → **infinitely many** solutions.","For “find k” questions: no solution → make the x-numbers equal and the plain numbers different."],
  pic:FIG.plane({r:5,lines:[{m:1,b:1},{m:1,b:-2}],cap:"Same slope, different start: parallel lines never meet — no solution."}),
  tr:"Same x-number, different constant → **parallel** → never equal → no solution.",
  w:"Expand brackets **before** you compare: `3(x + 1) = 3x + 3` is infinitely many, not one.",
  ex:[["How many solutions does `2x + 3 = 2x + 5` have?",["Subtract 2x: `3 = 5` — false"],"none"],
      ["For what k does `kx + 1 = 6x + 9` have no solution?",["x-numbers must match: `k = 6`","Constants differ (1 ≠ 9) ✓"],"k = 6"]]});

CB("alg","l6",{t:"Building linear models",
  f:["\\t{total} = \\c3{\\t{start}} + \\c1{\\t{rate}} × \\t{units} || y = \\c3{b} + \\c1{m}x"],
  h:["Many stories have a **starting amount** plus a **fixed amount each time**. That's always a straight line.","The start is **b** (what you pay at 0 units). The rate per unit is **m**.","“What does 30 mean?” → say it as a sentence: “for each extra month, the cost goes up by $30”."],
  pic:FIG.plane({r:8,lines:[{m:1.5,b:2}],pts:[[0,2,"start b = 2","grn"]],cap:"Start at b, then climb by m for every unit."}),
  tr:"Slope sentence: “for each additional **[x-unit]**, **[y]** goes up by **[m] [y-units]**.”",
  w:"Don't swap them: the number **alone** is the start; the number **with x** is the rate.",
  ex:[["A gym charges $50 to join plus $30 per month. Write the cost after m months.",["Start (b): 50","Rate (m): 30 per month"],"`C = 50 + 30m`"],
      ["Plan A: $20 + $5/month. Plan B: $50 + $2/month. When do they cost the same?",["Set them equal: `20 + 5m = 50 + 2m`","`3m = 30`"],"after 10 months"]]});

CB("alg","l8",{t:"Multi-step equations: the complete method",
  f:["\\t{clear fractions} → \\t{open brackets} → \\t{collect} → \\t{isolate} → \\t{check}"],fl:"Five steps",
  h:["1️⃣ **Clear fractions:** multiply every term by the common denominator.","2️⃣ **Open brackets** (distribute).","3️⃣ **Collect** like terms on each side.","4️⃣ **Isolate x:** move x's to one side, numbers to the other, then divide.","5️⃣ **Check** in the original equation."],
  pic:PIC.flow([["clear","fractions"],["open","brackets"],["collect","terms"],["isolate","x"],["check","✓"]],["","","",""],{bw:90,gap:28}),
  tr:"Same five steps every time. Don't skip step 5.",
  w:"Multiply **every** term when clearing fractions — including the plain numbers.",
  ex:[["Solve `\\f{x + 3}{2} = 2x − 6`",["Clear the fraction: × 2 on both sides → `x + 3 = 4x − 12`","Collect: `3 + 12 = 4x − x` → `15 = 3x`","Divide by 3"],"x = 5"],
      ["Solve `3(x − 2) − 4 = 2(x + 1)`",["Open brackets: `3x − 6 − 4 = 2x + 2`","Collect: `3x − 10 = 2x + 2`","`x = 12`"],"x = 12"]]});

CB("alg","l9",{t:"Every kind of SAT equation",
  f:["\\t{linear} · \\t{system} · \\t{quadratic} · \\t{radical} · \\t{rational} · \\t{exponential} · \\t{absolute value}"],fl:"The map",
  h:["**Linear** (x only to power 1): balance moves.","**Quadratic** (x²): factor, or use the formula.","**Radical** (x under a root): isolate the root, square, **check**.","**Rational** (x in a denominator): multiply by the denominator, **check** it isn't 0.","**Absolute value:** two cases, + and −. **Exponential:** make the bases the same."],
  pic:PIC.flow([["x","balance"],["x²","factor / formula"],["√x","square + check"],["1/x","× denominator"]],["","",""],{bw:120,gap:28}),
  tr:"First ask **“what kind of equation is this?”** — the type tells you the tool.",
  w:"Radical and rational equations can produce **fake** answers. Always plug back in.",
  ex:[["Solve `|x − 3| = 5`",["Two cases: `x − 3 = 5` or `x − 3 = −5`","`x = 8` or `x = −2`"],"x = 8 or x = −2"],
      ["Solve `2^{x + 1} = 32`",["Same base: `32 = 2^{5}`","So `x + 1 = 5`"],"x = 4"]]});

CB("alg","l10",{t:"Ten word-problem patterns",
  f:["\\t{fixed} + \\t{rate} × n || \\t{two plans equal} || \\t{value} = \\t{count} × \\t{price}"],fl:"Recognise the pattern",
  h:["**Fixed + rate** (gym, taxi): `total = start + rate × units`.","**Break-even:** two plans → set them equal.","**Two kinds of items** (tickets, coins): one equation for how many, one for how much money.","**Percent change, reverse percent, rate × time, ratio share** — each has its own one-line setup you've already learned."],
  pic:PIC.flow([["read","story"],["name","pattern"],["write","equation"],["solve","& check"]],["","",""],{bw:96,gap:34}),
  tr:"Most SAT stories are one of about ten patterns. Name the pattern and the equation is half-written.",
  w:"Answer the question asked — total cost, not the number of months, if that's what they want.",
  ex:[["Adult tickets $10, child $6. 20 tickets sold for $168. How many adult tickets?",["How many: `a + c = 20` → `c = 20 − a`","How much: `10a + 6c = 168` → `10a + 6(20 − a) = 168`","`4a + 120 = 168` → `a = 12`"],"12 adult tickets"],
      ["A taxi: $2.50 plus $1.75 per mile. Cost of an 8-mile ride?",["Fixed + rate: `2.50 + 1.75 × 8`","`2.50 + 14 = 16.50`"],"$16.50"]]});

/* ---------------- Algebraic expressions & factoring ---------------- */
CB("poly","l1",{t:"Terms, coefficients & like terms",
  f:["\\c1{5}x^{2} \\t{: coefficient} \\c1{5}, \\t{variable} x, \\t{power} 2"],fl:"Anatomy of a term",
  h:["A **term** is one piece separated by + or −. `4x^{2} − 3x + 7` has three terms.","The **coefficient** is the number in front of the letters. The plain number (7) is the **constant**.","**Like terms** have the same letters with the same powers: `3x^{2}` and `−x^{2}` are like terms; `3x^{2}` and `3x` are not.","Combine like terms by adding their coefficients."],
  pic:TILES([[2,"x²","var(--violet)"],[3,"x","var(--blue)"],[4,"1","var(--grn)"]],"2x² + 3x + 4: three kinds of pieces"),
  tr:"Sort first, then add — like sorting coins by type before counting.",
  w:"`x^{2}` and `x` are **different** kinds — `x^{2} + x` stays as it is.",
  ex:[["Simplify `3x^{2} + 5x − x^{2} + 2 − 7x`",["x² terms: `3x^{2} − x^{2} = 2x^{2}`","x terms: `5x − 7x = −2x`","constant: 2"],"`2x^{2} − 2x + 2`"],
      ["In `−4x^{3} + x − 9`, what is the coefficient of x?",["The x term is `+x`, which means `+1x`"],"1"]]});

CB("poly","l2",{t:"Multiplying polynomials (area model)",
  f:["(a + b)(c + d) = ac + ad + bc + bd"],
  h:["Every term in the first bracket multiplies **every** term in the second.","The **area model**: draw a box, put one bracket on top and one on the side, fill each cell, then add.","For two binomials, **FOIL** (First, Outer, Inner, Last) is the same thing."],
  pic:FIG2.areaBox(["x","+3"],["x","+4"],[["x²","3x"],["4x","12"]],{cap:"(x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12."}),
  tr:"Count the products: 2 terms × 2 terms = **4** products. 2 × 3 = **6**. If you have fewer, you missed one.",
  w:"Keep the signs with their terms: in `(x − 5)`, the second term is **−5**.",
  ex:[["Expand `(x + 3)(x + 4)`",["F: `x × x = x^{2}`, O: `x × 4 = 4x`","I: `3 × x = 3x`, L: `3 × 4 = 12`","Add: `x^{2} + 7x + 12`"],"`x^{2} + 7x + 12`"],
      ["Expand `(2x − 1)(x^{2} + 3x − 2)`",["`2x` times each: `2x^{3} + 6x^{2} − 4x`","`−1` times each: `−x^{2} − 3x + 2`","Combine: `2x^{3} + 5x^{2} − 7x + 2`"],"`2x^{3} + 5x^{2} − 7x + 2`"]]});

CB("poly","l3",{t:"Special products",
  f:["(a + b)^{2} = a^{2} + \\c2{2ab} + b^{2}","(a − b)^{2} = a^{2} − \\c2{2ab} + b^{2}","(a + b)(a − b) = a^{2} − b^{2}"],
  h:["A squared bracket always has a **middle term** `2ab`. Forgetting it is the #1 algebra mistake.","**Difference of squares:** (a + b)(a − b) — the middle terms cancel, leaving `a^{2} − b^{2}`.","Spot these patterns backwards too: `x^{2} − 49 = (x + 7)(x − 7)`."],
  pic:FIG2.areaBox(["a","+b"],["a","+b"],[["a²","ab"],["ab","b²"]],{cap:"(a + b)²: the two ab boxes are the middle term 2ab."}),
  tr:"Square the first, **double the product**, square the last.",
  w:"`(x + 3)^{2}` is `x^{2} + 6x + 9`, **not** `x^{2} + 9`.",
  ex:[["Expand `(x − 5)^{2}`",["Square the first: `x^{2}`","Double the product: `2 × x × (−5) = −10x`","Square the last: `25`"],"`x^{2} − 10x + 25`"],
      ["Factor `9x^{2} − 16`",["Both are squares: `(3x)^{2} − 4^{2}`","Difference of squares: `(3x + 4)(3x − 4)`"],"`(3x + 4)(3x − 4)`"]]});

CB("poly","l4",{t:"Factoring: GCF & grouping",
  f:["ab + ac = a(b + c)"],
  h:["**Factoring** is distributing backwards: find what every term shares and pull it out front.","Take out the **biggest** common factor — both the number and the letters.","**Grouping** (four terms): pair them up, factor each pair, then pull out the common bracket."],
  pic:PIC.flow([["6x² + 9x","both share 3x"],["3x(2x + 3)","check: expand back"]],["take out 3x"],{bw:170,gap:80}),
  tr:"Always check by **expanding** your answer — you should get the original back.",
  w:"Don't forget the 1: `x^{2} + x = x(x + 1)`, not `x(x)`.",
  ex:[["Factor `12x^{3} − 18x^{2}`",["GCF of 12 and 18 is 6; of x³ and x² is x² → `6x^{2}`","`12x^{3} ÷ 6x^{2} = 2x`, `18x^{2} ÷ 6x^{2} = 3`"],"`6x^{2}(2x − 3)`"],
      ["Factor `x^{3} + 2x^{2} + 3x + 6` by grouping.",["Pair up: `x^{2}(x + 2) + 3(x + 2)`","Common bracket `(x + 2)`: `(x + 2)(x^{2} + 3)`"],"`(x + 2)(x^{2} + 3)`"]]});

CB("poly","l5",{t:"Factoring x² + bx + c",
  f:["x^{2} + bx + c = (x + p)(x + q) \\t{where} p × q = c, p + q = b"],
  h:["Find **two numbers** that **multiply to c** and **add to b**.","Signs guide you: c positive → both numbers have the same sign (the sign of b). c negative → opposite signs.","Check with FOIL."],
  pic:PIC.flow([["multiply to","12"],["add to","7"],["numbers","3 and 4"]],["",""]),
  tr:"List the factor pairs of c, then pick the pair that adds to b.",
  w:"For `x^{2} − x − 12`, the pair is `−4` and `+3` (product −12, sum −1) — watch the signs.",
  ex:[["Factor `x^{2} + 7x + 12`",["Pairs of 12: 1·12, 2·6, 3·4","3 + 4 = 7 ✓"],"`(x + 3)(x + 4)`"],
      ["Factor `x^{2} − 2x − 15`",["Product −15 → opposite signs","Sum −2 → the bigger one is negative: −5 and 3"],"`(x − 5)(x + 3)`"]]});

CB("poly","l6",{t:"Factoring ax² + bx + c (AC method)",
  f:["ac = p × q, \\s b = p + q ⟹ \\t{split} bx = px + qx"],
  h:["1️⃣ Multiply a × c.","2️⃣ Find two numbers that multiply to ac and add to b.","3️⃣ Split the middle term using those numbers.","4️⃣ Factor by grouping."],
  pic:PIC.flow([["2x² + 7x + 3","ac = 6"],["6 = 6 × 1","sum 7 ✓"],["2x² + 6x + x + 3",""],["(x + 3)(2x + 1)",""]],["","",""],{bw:150,gap:26}),
  tr:"Always take out any common factor **first** — it makes the numbers smaller.",
  w:"After splitting, both brackets from grouping must match. If they don't, check your signs.",
  ex:[["Factor `2x^{2} + 7x + 3`",["`ac = 6`; numbers that multiply to 6 and add to 7: 6 and 1","Split: `2x^{2} + 6x + x + 3`","Group: `2x(x + 3) + 1(x + 3)`"],"`(2x + 1)(x + 3)`"],
      ["Factor `3x^{2} − 10x + 8`",["`ac = 24`; multiply to 24, add to −10: −6 and −4","Split: `3x^{2} − 6x − 4x + 8`","Group: `3x(x − 2) − 4(x − 2)`"],"`(3x − 4)(x − 2)`"]]});

CB("poly","l7",{t:"Algebraic fractions",
  f:["\\f{(x − 3)(x + 3)}{x − 3} = x + 3 \\s (x ≠ 3)"],
  h:["Treat them exactly like number fractions — but **factor first**.","Cancel only **whole factors** (things being multiplied), never single terms.","Note the **forbidden values**: anything that makes a denominator 0.","To add, find a common denominator just like with numbers."],
  pic:PIC.flow([["x² − 9","(x − 3)(x + 3)"],["over x − 3","cancel (x − 3)"],["result","x + 3"]],["factor",""]),
  tr:"**Factor, then cancel.** If you can't see brackets, you can't cancel.",
  w:"In `\\f{x + 2}{2}` the 2s do **not** cancel — the top is a sum, not a product.",
  ex:[["Simplify `\\f{x^{2} − 4}{x^{2} + x − 6}`",["Factor top: `(x − 2)(x + 2)`","Factor bottom: `(x + 3)(x − 2)`","Cancel `(x − 2)`"],"`\\f{x + 2}{x + 3}`"],
      ["Compute `\\f{1}{x} + \\f{2}{x + 1}`",["Common denominator: `x(x + 1)`","`\\f{x + 1}{x(x + 1)} + \\f{2x}{x(x + 1)}`","Add tops: `\\f{3x + 1}{x(x + 1)}`"],"`\\f{3x + 1}{x(x + 1)}`"]]});

CB("poly","l8",{t:"Dividing polynomials & remainders",
  f:["p(x) ÷ (x − a) \\t{leaves remainder} p(a)"],fl:"The remainder shortcut",
  h:["Polynomial division works like long division with numbers: divide, multiply, subtract, bring down.","**Shortcut:** the remainder when p(x) is divided by `(x − a)` is just `p(a)`. Plug in a!","If `p(a) = 0`, then `(x − a)` divides perfectly — it's a **factor**."],
  pic:PIC.flow([["p(x) ÷ (x − 2)","?"],["plug in 2","p(2)"],["= remainder",""]],["",""]),
  tr:"Divided by `(x − 3)` → plug in **+3**. Divided by `(x + 3)` → plug in **−3**.",
  w:"Watch the sign: `(x + 1)` means plug in −1.",
  ex:[["Remainder when `x^{3} − 2x + 5` is divided by `(x − 2)`?",["Plug in 2: `2^{3} − 2(2) + 5`","`8 − 4 + 5 = 9`"],"9"],
      ["Is `(x + 1)` a factor of `x^{3} + 1`?",["Plug in −1: `(−1)^{3} + 1 = 0`","Remainder 0 → yes"],"yes"]]});
