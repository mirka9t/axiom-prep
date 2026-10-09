/* =====================================================================
   AXIOM — Copybook notes 4: exponents · quadratics · functions ·
   advanced maths · modelling
   ===================================================================== */

/* ---------------- Exponents, roots & scientific notation ---------------- */
CB("exp","l1",{t:"The laws of exponents",
  f:["a^{m} · a^{n} = a^{m + n} || \\f{a^{m}}{a^{n}} = a^{m − n} || (a^{m})^{n} = a^{mn}","a^{0} = 1 || a^{−n} = \\f{1}{a^{n}}"],
  h:["An exponent **counts** how many times you multiply: `2^{4} = 2 × 2 × 2 × 2 = 16`.","**Multiplying** the same base → **add** the powers (you're just counting more factors).","**Dividing** → **subtract** the powers (factors cancel).","**Power of a power** → **multiply** the powers.","Anything (except 0) to the power 0 is 1. A negative power means “flip it”."],
  pic:PIC.flow([["x³ · x⁴","(xxx)(xxxx)"],["count the x's","7 of them"],["answer","x⁷"]],["",""],{bw:140}),
  tr:"× → **add**, ÷ → **subtract**, power of a power → **multiply**. Always with the **same base**.",
  w:"`2^{3} × 3^{2}` can't be combined — different bases. And `3^{2}` is 9, not 6.",
  ex:[["Simplify `\\f{x^{3} · x^{4}}{x^{2}}`",["Top: `x^{3 + 4} = x^{7}` // multiply → add","Divide: `x^{7 − 2}` // divide → subtract"],"`x^{5}`"],
      ["Simplify `(2x^{3})^{2}`",["Square everything inside: `2^{2} · (x^{3})^{2}`","`4 · x^{6}` // power of a power → multiply"],"`4x^{6}`"]]});

CB("exp","l2",{t:"Roots & fractional powers",
  f:["\\r{a} = a^{\\f{1}{2}} || \\rr{a} = a^{\\f{1}{3}} || a^{\\f{m}{n}} = (\\t{n-th root of } a)^{m}","\\r{ab} = \\r{a} · \\r{b}"],
  h:["A square root **undoes** squaring: `\\r{25} = 5` because `5^{2} = 25`.","A fractional power is a root: the **bottom** of the fraction is the root, the **top** is the power.","**Simplify** a root by pulling out perfect squares: `\\r{72} = \\r{36 · 2} = 6\\r{2}`."],
  pic:PIC.flow([["8^(2/3)","root first"],["∛8 = 2","then power"],["2² = 4",""]],["",""]),
  tr:"Fractional power: **root first, then power** — the numbers stay small.",
  w:"`\\r{9 + 16}` is `\\r{25} = 5`, not `3 + 4 = 7`. Roots don't split over +.",
  ex:[["Compute `27^{\\f{2}{3}}`",["Bottom 3 → cube root: `\\rr{27} = 3`","Top 2 → square it: `3^{2}`"],"9"],
      ["Simplify `\\r{50}`",["Biggest perfect square inside 50: 25","`\\r{25 · 2} = \\r{25} · \\r{2}`"],"`5\\r{2}`"]]});

CB("exp","l3",{t:"Scientific notation",
  f:["a × 10^{n}, \\s 1 ≤ a < 10"],
  h:["Big or tiny numbers are written as (a number from 1 to 10) × (a power of 10).","**Big** number → positive power: 3,200,000 = `3.2 × 10^{6}` (the point moves 6 places).","**Tiny** number → negative power: 0.00047 = `4.7 × 10^{−4}`.","Multiplying: multiply the front numbers, **add** the powers of 10."],
  pic:HOPS("3200000","The decimal point hops 6 places → 3.2 × 10⁶."),
  tr:"Count the **hops** of the decimal point. Left hops (big number) = positive power.",
  w:"`45 × 10^{3}` is not in scientific notation — the front must be under 10: `4.5 × 10^{4}`.",
  ex:[["Compute `(3 × 10^{4})(2 × 10^{3})`",["Fronts: `3 × 2 = 6`","Powers: `10^{4 + 3} = 10^{7}`"],"`6 × 10^{7}`"],
      ["Compute `\\f{8 × 10^{6}}{2 × 10^{−2}}`",["Fronts: `8 ÷ 2 = 4`","Powers: `10^{6 − (−2)} = 10^{8}`"],"`4 × 10^{8}`"]]});

CB("exp","l4",{t:"Radical equations",
  f:["\\r{\\t{stuff}} = k ⟹ \\t{stuff} = k^{2} \\t{ — then CHECK}"],
  h:["**Step 1:** get the square root alone on one side.","**Step 2:** square both sides.","**Step 3:** solve the equation you get.","**Step 4:** check every answer in the original — squaring can create **fake** (extraneous) solutions."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x>=-6?Math.sqrt(x+6):NaN}},{f:function(x){return x},c:"red"}],pts:[[3,3,"x = 3 ✓","grn"]],cap:"√(x + 6) and y = x meet only at x = 3; the “solution” x = −2 is fake."}),
  tr:"A square root is **never negative**. If your answer makes the root side negative, throw it away.",
  w:"The fake solution is usually one of the answer choices. Checking is not optional.",
  ex:[["Solve `\\r{x + 3} = 5`",["Square both sides: `x + 3 = 25`","`x = 22`. Check: `\\r{25} = 5` ✓"],"x = 22"],
      ["Solve `\\r{x + 6} = x`",["Square: `x + 6 = x^{2}` → `x^{2} − x − 6 = 0`","`(x − 3)(x + 2) = 0` → `x = 3` or `x = −2`","Check −2: `\\r{4} = 2`, but the right side is −2 ✗ fake"],"x = 3 only"]]});

CB("exp","l5",{t:"Same-base tricks",
  f:["b^{x} = b^{y} ⟹ x = y"],
  h:["Rewrite both sides with the **same base**, then set the exponents equal.","Know your powers: 2, 4, 8, 16, 32, 64 · 3, 9, 27, 81 · 5, 25, 125.","Equivalent forms: `4^{x} = 2^{2x}`, `8^{\\f{x}{3}} = 2^{x}`, `\\f{1}{\\r{x}} = x^{−\\f{1}{2}}`."],
  pic:PIC.flow([["9^x = 27","(3²)^x = 3³"],["same base","3^(2x) = 3³"],["exponents","2x = 3"]],["",""],{bw:140}),
  tr:"Find the **smallest** base both numbers are powers of (for 9 and 27 it's 3).",
  w:"Don't divide `\\f{27}{9}` — the bases must match first, then compare exponents.",
  ex:[["Solve `2^{x + 1} = 32`",["`32 = 2^{5}`","`x + 1 = 5`"],"x = 4"],
      ["Solve `9^{x} = 27`",["`(3^{2})^{x} = 3^{3}` → `3^{2x} = 3^{3}`","`2x = 3`"],"`x = \\f{3}{2}`"]]});

CB("exp","l6",{t:"Zero, negative & fractional exponents",
  f:["a^{0} = 1 || a^{−1} = \\f{1}{a} || a^{−n} = \\f{1}{a^{n}} || a^{\\f{1}{n}} = \\t{n-th root}"],
  h:["Look at the pattern `2^{3} = 8`, `2^{2} = 4`, `2^{1} = 2` — each step down **halves**.","Keep halving: `2^{0} = 1`, `2^{−1} = \\f{1}{2}`, `2^{−2} = \\f{1}{4}`. That's **why** these rules are true.","A negative exponent doesn't make the number negative — it makes it a **fraction**."],
  pic:PIC.flow([["2³","8"],["2²","4"],["2¹","2"],["2⁰","1"],["2⁻¹","1/2"]],["÷2","÷2","÷2","÷2"],{bw:72,gap:40}),
  tr:"Negative exponent → **move it to the other floor** of the fraction and make the exponent positive.",
  w:"`2^{−3}` is `\\f{1}{8}`, not −8.",
  ex:[["Compute `5^{−2}`",["Flip: `\\f{1}{5^{2}}`","`= \\f{1}{25}`"],"`\\f{1}{25}`"],
      ["Compute `(\\f{2}{3})^{−2}`",["Flip the fraction: `(\\f{3}{2})^{2}`","`= \\f{9}{4}`"],"`\\f{9}{4}`"]]});

CB("exp","l7",{t:"Working with radicals",
  f:["a\\r{c} + b\\r{c} = (a + b)\\r{c} || \\r{a} · \\r{b} = \\r{ab} || \\f{1}{\\r{a}} = \\f{\\r{a}}{a}"],
  h:["**Simplify:** pull out perfect squares.","**Add/subtract** only **like** radicals (same number under the root) — like adding apples to apples.","**Multiply:** outsides × outsides, insides × insides.","**Rationalize:** no roots in the denominator — multiply top and bottom by the root."],
  pic:PIC.flow([["√12 + √27","2√3 + 3√3"],["like radicals","5√3"]],["simplify each"],{bw:150,gap:80}),
  tr:"Simplify **first**: √12 and √27 don't look alike until you simplify them to 2√3 and 3√3.",
  w:"`\\r{2} + \\r{3}` is **not** `\\r{5}`. Unlike radicals don't combine.",
  ex:[["Compute `\\r{12} + \\r{27}`",["`\\r{12} = 2\\r{3}`, `\\r{27} = 3\\r{3}`","Like radicals: `2\\r{3} + 3\\r{3}`"],"`5\\r{3}`"],
      ["Rationalize `\\f{6}{\\r{3}}`",["Multiply top and bottom by `\\r{3}`: `\\f{6\\r{3}}{3}`","Simplify: `2\\r{3}`"],"`2\\r{3}`"]]});

/* ---------------- Polynomials & quadratics ---------------- */
CB("quad","l1",{t:"FOIL and factoring",
  f:["(x + p)(x + q) = x^{2} + (p + q)x + pq"],
  h:["**FOIL** multiplies two brackets: First, Outer, Inner, Last — then combine the middle terms.","**Factoring** is FOIL in reverse: find p and q that **multiply to the last number** and **add to the middle number**.","Remember the patterns: `(a + b)^{2} = a^{2} + 2ab + b^{2}` and `a^{2} − b^{2} = (a + b)(a − b)`."],
  pic:FIG2.areaBox(["x","+3"],["x","+4"],[["x²","3x"],["4x","12"]],{cap:"FOIL is an area: four boxes, then add."}),
  tr:"The **middle** number is the sum, the **last** number is the product.",
  w:"`(x + 3)^{2}` has a middle term 6x. It's not `x^{2} + 9`.",
  ex:[["Expand `(x − 2)(x + 7)`",["F `x^{2}`, O `7x`, I `−2x`, L `−14`","Combine: `x^{2} + 5x − 14`"],"`x^{2} + 5x − 14`"],
      ["Factor `x^{2} + 8x + 15`",["Multiply to 15, add to 8: 3 and 5"],"`(x + 3)(x + 5)`"]]});

CB("quad","l2",{t:"Solving quadratics",
  f:["x = \\f{−b ± \\r{b^{2} − 4ac}}{2a}"],fl:"The quadratic formula",
  h:["A quadratic is an equation with an `x^{2}`, written as `ax^{2} + bx + c = 0`.","**Step 1:** move everything to one side so the other side is 0.","**Step 2:** try to **factor** — if it splits into two brackets, each bracket = 0 gives a solution.","If factoring is hard, the **formula** always works: read off a, b and c and plug them in.","The part under the root, `b^{2} − 4ac`, tells you how many answers: positive → 2, zero → 1, negative → none."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x*x-5*x+6}}],pts:[[2,0,"x = 2","red"],[3,0,"x = 3","red",6]],cap:"The solutions are where the U-shaped graph crosses the x-axis."}),
  tr:"Sing it: “x equals negative b, plus or minus the square root, of b squared minus four a c, all over two a.”",
  w:"Divide the **whole** top by 2a — not only the square root. And don't lose the ±: it gives two answers.",
  ex:[["Solve `x^{2} − 5x + 6 = 0`",["Two numbers that multiply to 6 and add to −5: −2 and −3","Factor: `(x − 2)(x − 3) = 0` // check: FOIL gives x² − 5x + 6 ✓","A product is 0 only if one bracket is 0"],"`x = 2` or `x = 3`"],
      ["Solve `2x^{2} + 3x − 2 = 0` with the formula",["Read the numbers: `a = 2`, `b = 3`, `c = −2`","Under the root: `9 − 4(2)(−2) = 9 + 16 = 25` // positive → two answers","`x = \\f{−3 ± \\r{25}}{4} = \\f{−3 ± 5}{4}`","Plus: `\\f{2}{4} = \\f{1}{2}` · Minus: `\\f{−8}{4} = −2`"],"`x = \\f{1}{2}` or `x = −2`"]]});

CB("quad","l3",{t:"Parabolas",
  f:["y = ax^{2} + bx + c || \\t{vertex } x = −\\f{b}{2a}"],
  h:["The graph of a quadratic is a **parabola**: a smooth U.","**a > 0** → opens up (a smile, has a minimum). **a < 0** → opens down (a frown, has a maximum).","The **vertex** is the turning point; its x is `−\\f{b}{2a}`. Plug that in to get the y.","**Roots** (x-intercepts) are the solutions of `ax^{2} + bx + c = 0`. **c** is the y-intercept."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x*x-6*x+5}}],pts:[[3,-4,"vertex (3, −4)","vio"],[1,0,"root 1"],[5,0,"root 5"]],cap:"y = x² − 6x + 5: vertex (3, −4), roots 1 and 5."}),
  tr:"The vertex is **halfway between the roots** — free shortcut.",
  w:"“Maximum height” is the **y** of the vertex, not the x.",
  ex:[["Vertex of `y = x^{2} − 6x + 5`?",["`x = −\\f{−6}{2(1)} = 3`","`y = 9 − 18 + 5 = −4`"],"(3, −4)"],
      ["A ball's height is `h = −5t^{2} + 20t`. When is it highest, and how high?",["`t = −\\f{20}{2(−5)} = 2`","`h = −5(4) + 40 = 20`"],"at t = 2 s, 20 m"]]});

CB("quad","l4",{t:"Completing the square & vertex form",
  f:["y = a(x − h)^{2} + k \\t{: vertex } (h, k)","x^{2} + bx = (x + \\f{b}{2})^{2} − (\\f{b}{2})^{2}"],
  h:["**Vertex form** shows the turning point immediately: (h, k).","To get there: take **half** of the x-number, **square** it, add and subtract it, then wrap the first three terms into a bracket.","`(x + 3)^{2}` means h = **−3** — the sign flips."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return (x+3)*(x+3)-4}}],pts:[[-3,-4,"(−3, −4)","vio"]],cap:"y = (x + 3)² − 4 turns at (−3, −4)."}),
  tr:"**Half it, square it, add it, subtract it.**",
  w:"In `a(x − h)^{2} + k`, the minimum value is **k** (when a > 0) — not h.",
  ex:[["Write `x^{2} + 6x + 5` in vertex form.",["Half of 6 is 3; `3^{2} = 9`","`x^{2} + 6x + 9 − 9 + 5`","`(x + 3)^{2} − 4`"],"`(x + 3)^{2} − 4`, vertex (−3, −4)"],
      ["Minimum value of `x^{2} − 4x + 7`?",["Half of −4 is −2; square: 4","`(x − 2)^{2} + 3`"],"3"]]});

CB("quad","l5",{t:"Zeros, factors & remainders",
  f:["p(a) = 0 ⟺ (x − a) \\t{ is a factor} ⟺ \\t{graph crosses at } x = a"],
  h:["Three ways of saying the same thing: **a is a zero**, **(x − a) is a factor**, **the graph touches the x-axis at a**.","From factors to zeros: flip each sign. `(x − 1)(x + 2)` → zeros 1 and −2.","**Remainder theorem:** dividing p(x) by (x − a) leaves remainder p(a)."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return 0.15*(x-1)*(x+2)*(x-4)}}],pts:[[1,0,"1"],[-2,0,"−2"],[4,0,"4"]],cap:"p(x) = (x − 1)(x + 2)(x − 4): zeros at 1, −2 and 4."}),
  tr:"Factor `(x − a)` ↔ zero **a**: the signs are always opposite.",
  w:"`(x + 5)` is a factor → the zero is **−5**.",
  ex:[["Zeros of `p(x) = (x − 3)(x + 1)(2x − 5)`?",["Each bracket = 0","`x = 3`, `x = −1`, `2x = 5` → `x = \\f{5}{2}`"],"3, −1, 5/2"],
      ["`(x − 4)` is a factor of `x^{2} + kx + 12`. Find k.",["Then p(4) = 0: `16 + 4k + 12 = 0`","`4k = −28`"],"k = −7"]]});

CB("quad","l6",{t:"Sum & product of solutions",
  f:["\\t{sum} = −\\f{b}{a} || \\t{product} = \\f{c}{a}"],
  h:["For `ax^{2} + bx + c = 0`, you can find the **sum** and **product** of the solutions **without solving**.","Building a quadratic from solutions r and s: `(x − r)(x − s) = 0`, i.e. `x^{2} − (\\t{sum})x + (\\t{product}) = 0`."],
  pic:PIC.flow([["x² − 7x + 12 = 0","roots 3 and 4"],["sum","7 = −(−7)/1"],["product","12 = 12/1"]],["",""],{bw:150,gap:30}),
  tr:"Sum has the **minus**: −b/a. Product doesn't: c/a.",
  w:"Divide by **a**. With `2x^{2} − 10x + 3`, the sum is `\\f{10}{2} = 5`, not 10.",
  ex:[["Sum of the solutions of `2x^{2} − 10x + 3 = 0`?",["`−\\f{b}{a} = −\\f{−10}{2}`"],"5"],
      ["Write a quadratic with solutions 2 and −5 (leading coefficient 1).",["Sum: −3, product: −10","`x^{2} − (−3)x + (−10)`"],"`x^{2} + 3x − 10 = 0`"]]});

CB("quad","l7",{t:"When a line meets a parabola",
  f:["\\t{set equal} → ax^{2} + bx + c = 0 → b^{2} − 4ac \\t{ counts the meeting points}"],
  h:["To find where a line and a parabola meet, **set the two expressions equal** and solve the quadratic.","Discriminant positive → they cross at **2** points; zero → they just touch (**1** point, tangent); negative → they **miss**."],
  pic:FIG.plane({r:9,fns:[{f:function(x){return x*x}},{f:function(x){return 2*x+3},c:"red"}],pts:[[3,9,"(3, 9)","vio",-44],[-1,1,"(−1, 1)","vio"]],cap:"y = x² and y = 2x + 3 meet twice."}),
  tr:"“Exactly one point” or “tangent” → set the discriminant to **0**.",
  w:"After finding x, plug into the **line** (simpler) to get y.",
  ex:[["Where do `y = x^{2}` and `y = 2x + 3` meet?",["`x^{2} = 2x + 3` → `x^{2} − 2x − 3 = 0`","`(x − 3)(x + 1) = 0` → x = 3 or −1","y from the line: 9 and 1"],"(3, 9) and (−1, 1)"],
      ["For which c does `y = x^{2}` touch `y = 4x + c` exactly once?",["`x^{2} − 4x − c = 0`","Discriminant 0: `16 + 4c = 0`"],"c = −4"]]});

CB("quad","l8",{t:"Square roots & quadratic word problems",
  f:["x^{2} = k ⟹ x = ± \\r{k} || (x − h)^{2} = k ⟹ x = h ± \\r{k}"],
  h:["No x-term? Get `x^{2}` alone and take the square root of both sides — **both** + and −.","Word problems: area of a rectangle, falling objects, consecutive numbers whose product is given — they all lead to a quadratic.","Throw away answers that make no sense (negative lengths or times)."],
  pic:PIC.flow([["(x − 2)² = 9","x − 2 = ±3"],["x = 5","x = −1"]],["√ both sides"],{bw:140,gap:80}),
  tr:"Square root of both sides → write **±** immediately so you never forget it.",
  w:"`x^{2} = 49` has **two** solutions: 7 and −7.",
  ex:[["Solve `(x − 2)^{2} = 9`",["`x − 2 = ±3`","`x = 2 + 3 = 5` or `x = 2 − 3 = −1`"],"x = 5 or x = −1"],
      ["A rectangle is 3 m longer than wide; its area is 40 m². Width?",["`w(w + 3) = 40` → `w^{2} + 3w − 40 = 0`","`(w + 8)(w − 5) = 0` → w = 5 (w = −8 makes no sense)"],"5 m"]]});

/* ---------------- Functions & graphs ---------------- */
CB("func","l1",{t:"Function notation f(x)",
  f:["f(x) = 2x^{2} − 3 ⟹ f(\\c2{−2}) = 2(\\c2{−2})^{2} − 3 = 5"],
  h:["A **function** is a machine: put a number in, get exactly one number out.","`f(x)` is read “f of x”. It does **not** mean f times x.","`f(3)` means: replace **every** x with 3 (use brackets!).","On a graph, `f(3) = 7` means the point (3, 7) is on the curve."],
  pic:MACHINE("3","× 2, then − 1","5","f(x) = 2x − 1 turns 3 into 5."),
  tr:"Put the input in **brackets** every time: `f(−2) = 2(−2)^{2} − 3`.",
  w:"`f(x) = 7` asks for x (work backwards), while `f(7)` asks for the output.",
  ex:[["`f(x) = x^{2} + 1`. Find f(−3).",["Replace x with (−3): `(−3)^{2} + 1`","`9 + 1`"],"10"],
      ["`f(x) = 3x + 1` and `f(x) = 10`. Find x.",["`3x + 1 = 10`","`3x = 9`"],"x = 3"]]});

CB("func","l2",{t:"Domain, range & reading graphs",
  f:["\\t{domain} = \\t{allowed inputs } (x) || \\t{range} = \\t{possible outputs } (y)"],
  h:["**Domain:** all x-values you're allowed to use. Watch for division by 0 and square roots of negatives.","**Range:** all the y-values the function actually reaches.","On a graph: domain = how far it spreads **left–right**; range = how far **up–down**.","Read zeros (where y = 0), the y-intercept (x = 0), maximums and minimums."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x>=-3&&x<=4?0.5*(x-1)*(x-1)-2:NaN}}],pts:[[1,-2,"min (1, −2)","vio"],[-3,6,"(−3, 6)"],[4,2.5,"(4, 2.5)"]],cap:"Domain −3 ≤ x ≤ 4; range −2 ≤ y ≤ 6."}),
  tr:"**D**omain = **D**rawing from left to right. **R**ange = **R**ising up and down.",
  w:"For `\\f{1}{x − 4}`, x = 4 is **not** in the domain.",
  ex:[["Domain of `f(x) = \\r{x − 2}`?",["Inside a square root can't be negative: `x − 2 ≥ 0`"],"x ≥ 2"],
      ["Range of `g(x) = x^{2} + 3`?",["`x^{2}` is never below 0, so `x^{2} + 3` is never below 3"],"y ≥ 3"]]});

CB("func","l3",{t:"Transformations",
  f:["f(x) + k \\t{ up} || f(x − h) \\t{ right} || −f(x) \\t{ flip} || a · f(x) \\t{ stretch}"],
  h:["**Outside** the brackets → vertical moves, in the normal direction: `f(x) + 3` goes **up** 3.","**Inside** the brackets → horizontal moves, **backwards**: `f(x − 3)` goes **right** 3.","A minus outside flips it upside down; a number in front stretches it taller."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return x*x},c:"ink2",dash:"6 6"},{f:function(x){return (x-2)*(x-2)+1}}],pts:[[2,1,"(2, 1)","blue"]],labels:[[-5.6,5.4,"y = x²","ink2"],[2.7,4.5,"y = (x − 2)² + 1","blue"]],cap:"Right 2 (inside, backwards) and up 1 (outside, normal)."}),
  tr:"**Inside lies, outside tells the truth.**",
  w:"`f(x + 4)` moves **left** 4, even though there's a plus.",
  ex:[["`y = x^{2}` moves right 3 and down 2. New equation?",["Right 3 → inside: `(x − 3)^{2}`","Down 2 → outside: `− 2`"],"`y = (x − 3)^{2} − 2`"],
      ["(2, 5) is on y = f(x). Where is it on `y = f(x − 1) + 3`?",["Inside −1 → right 1: x = 3","Outside +3 → up 3: y = 8"],"(3, 8)"]]});

CB("func","l4",{t:"Linear vs quadratic vs exponential",
  f:["\\t{linear: + same amount} || \\t{quadratic: differences change evenly} || \\t{exponential: × same number}"],
  h:["**Linear:** adds the same amount each step → straight line. “Increases by 50 each year.”","**Exponential:** multiplies by the same number each step → J-shaped curve. “Increases by 5% each year.”","**Quadratic:** the differences themselves go up by the same amount → U-shape. Thrown balls, areas."],
  pic:PIC.flow([["3, 7, 11, 15","+4 each → linear"],["3, 6, 12, 24","×2 each → exponential"],["1, 4, 9, 16","+3, +5, +7 → quadratic"]],["",""],{bw:180,gap:20}),
  tr:"Table test: **subtract** neighbours first. Equal → linear. Not equal? **Divide** neighbours. Equal → exponential.",
  w:"“Grows by 20” is linear; “grows by 20%” is exponential. One symbol changes everything.",
  ex:[["Table: 5, 10, 20, 40. Which kind? Next value?",["Differences: 5, 10, 20 — not equal","Ratios: ×2 each time → exponential"],"exponential, next 80"],
      ["“A tree grows 30 cm every year.” Linear or exponential?",["Same amount added each year"],"linear"]]});

CB("func","l5",{t:"Function tables & word models",
  f:["\\t{table row}: (x, f(x)) = \\t{a point on the graph}"],
  h:["A table is just a list of points: each column is an (input, output) pair.","To find f(2), look for x = 2 and read below it. To solve f(x) = −14, search the bottom row.","Which equation fits the table? **Plug in** the easiest point (usually x = 0) into each choice."],
  pic:FIG.plane({r:6,lines:[{m:-3,b:1}],pts:[[-1,4,"(−1, 4)"],[0,1,"(0, 1)"],[2,-5,"(2, −5)"]],cap:"The table x = −1, 0, 2 → 4, 1, −5 lies on y = −3x + 1."}),
  tr:"x = 0 in a table gives you the **y-intercept** for free.",
  w:"C(50) = 520 means “50 items cost $520” — the input is the 50.",
  ex:[["Table: f(−1) = 4, f(0) = 1, f(2) = −5. Which fits: `f(x) = −3x + 1` or `f(x) = 3x + 1`?",["x = 0: both give 1","x = −1: `−3(−1) + 1 = 4` ✓ for the first; the second gives −2 ✗"],"`f(x) = −3x + 1`"],
      ["C(n) = 8n + 120 is the cost of n shirts. What is C(50)?",["`8 × 50 + 120 = 520`"],"$520 for 50 shirts"]]});

CB("func","l6",{t:"Which form reveals what",
  f:["ax^{2} + bx + c → c || a(x − p)(x − q) → p, q || a(x − h)^{2} + k → (h, k)"],
  h:["**Standard** form `ax^{2} + bx + c` shows the **y-intercept** c.","**Factored** form `a(x − p)(x − q)` shows the **x-intercepts** p and q.","**Vertex** form `a(x − h)^{2} + k` shows the **vertex** (h, k) and the max/min value k.","Exponential `a · b^{x}`: a = starting value, b = growth factor."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return 0.5*(x-3)*(x+1)}}],pts:[[3,0,"3"],[-1,0,"−1"],[1,-2,"vertex (1, −2)","vio"],[0,-1.5,"c = −1.5","grn"]],cap:"0.5(x − 3)(x + 1): zeros 3 and −1, vertex halfway at x = 1."}),
  tr:"Need **zeros** → factored. Need **max/min** → vertex. Need **start** → standard.",
  w:"In vertex form `(x − h)`, h has the opposite sign of what you see.",
  ex:[["`y = 2(x − 3)(x + 5)`. Positive x-intercept?",["Set each factor to 0: x = 3 or x = −5"],"3"],
      ["Which form shows the maximum of a parabola directly?",["The vertex form `a(x − h)^{2} + k`: the max is k"],"vertex form"]]});

CB("func","l7",{t:"Arithmetic & geometric sequences",
  f:["\\t{arithmetic}: a_{n} = a_{1} + (n − 1)d || \\t{geometric}: a_{n} = a_{1} · r^{n − 1}"],
  h:["**Arithmetic:** add the same number d each time: 4, 7, 10, 13 (d = 3).","**Geometric:** multiply by the same number r each time: 3, 6, 12, 24 (r = 2).","The n-th term: start with the first term and apply the step **n − 1** times (the first term needs no steps)."],
  pic:PIC.flow([["a₁","4"],["a₂","7"],["a₃","10"],["a₄","13"]],["+3","+3","+3"],{bw:80,gap:50}),
  tr:"Term number n uses **n − 1** jumps — like floors in a building: floor 1 has no stairs below it.",
  w:"The 10th term of 4, 7, 10 … is `4 + 9 × 3 = 31`, not `4 + 10 × 3`.",
  ex:[["Find the 20th term of 5, 9, 13, …",["`d = 4`, `a_{1} = 5`","`a_{20} = 5 + 19 × 4 = 81`"],"81"],
      ["Find the 6th term of 2, 6, 18, …",["`r = 3`","`a_{6} = 2 · 3^{5} = 2 × 243`"],"486"]]});

CB("func","l8",{t:"Parent functions",
  f:["y = x || y = x^{2} || y = |x| || y = \\r{x} || y = 2^{x} || y = \\f{1}{x}"],fl:"The family",
  h:["Every graph on the SAT is a **parent** shape that's been moved, stretched or flipped.","Line (straight), parabola (U), absolute value (V), square root (half-arch from 0), exponential (J), reciprocal (two branches).","Recognise the parent first, then read the moves."],
  pic:FIG.plane({r:5,fns:[{f:function(x){return x*x},c:"blue"},{f:function(x){return Math.abs(x)},c:"red"},{f:function(x){return x>=0?Math.sqrt(x):NaN},c:"grn"},{f:function(x){return Math.pow(2,x)},c:"vio"}],labels:[[-4.8,4.5,"x²","blue"],[-4.6,3.2,"|x|","red"],[3.2,1.2,"√x","grn"],[1.8,4.4,"2ˣ","vio"]],cap:"Four parents: U, V, half-arch and J."}),
  tr:"Learn **six shapes** and you can read almost any SAT graph.",
  w:"`y = \\r{x}` doesn't exist for negative x — the graph starts at 0.",
  ex:[["A graph is a V with its point at (2, −1). Equation?",["Parent: `|x|`","Right 2, down 1"],"`y = |x − 2| − 1`"],
      ["Which parent never touches the x-axis: `x^{2}`, `2^{x}`, `|x|`?",["`2^{x}` gets close to 0 but never reaches it"],"`y = 2^{x}`"]]});

CB("func","l9",{t:"Inverse functions",
  f:["\\t{swap } x \\t{ and } y, \\t{ then solve for } y"],
  h:["The **inverse** undoes the function: if f turns 3 into 7, the inverse turns 7 back into 3.","To find it: write y = f(x), **swap** x and y, then solve for y.","The graph of the inverse is the **mirror image** of the original in the line y = x."],
  pic:FIG.plane({r:6,lines:[{m:2,b:1},{m:0.5,b:-0.5,c:"red"},{m:1,b:0,c:"ink2",dash:"5 5"}],labels:[[1.2,4.5,"f(x) = 2x + 1","blue"],[2.2,0.2,"inverse","red"]],cap:"f and its inverse are mirror images in y = x."}),
  tr:"Inverse = **undo in reverse order**: f multiplies by 2 then adds 1, so the inverse subtracts 1 then divides by 2.",
  w:"The inverse is not `\\f{1}{f(x)}` — it undoes the function, it doesn't flip the fraction.",
  ex:[["Find the inverse of `f(x) = 2x + 1`.",["`y = 2x + 1` → swap: `x = 2y + 1`","Solve: `y = \\f{x − 1}{2}`"],"`f^{−1}(x) = \\f{x − 1}{2}`"],
      ["f(4) = 11. What is the inverse at 11?",["The inverse sends the output back to the input"],"4"]]});

/* ---------------- Advanced maths extras ---------------- */
CB("advm","l1",{t:"Exponential growth & decay",
  f:["\\t{final} = \\t{start} × (1 ± r)^{t}"],
  h:["When something changes by a **percent** each period, it's exponential: multiply by the same factor every time.","Growth r% → factor `1 + r`. Decay r% → factor `1 − r`.","Linear vs exponential: “+20 per year” adds; “+20% per year” multiplies."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return Math.pow(2,x)}},{f:function(x){return Math.pow(0.5,x)},c:"red"}],labels:[[1.4,5,"growth 2ˣ","blue"],[-5.6,4,"decay (½)ˣ","red"]],cap:"Growth shoots up; decay slides toward zero but never reaches it."}),
  tr:"Factor above 1 → growing. Factor below 1 → shrinking.",
  w:"5% growth → multiply by **1.05**, not by 5 or 0.05.",
  ex:[["$1,000 grows 5% per year. Value after 3 years?",["Factor: 1.05","`1000 × 1.05^{3} = 1000 × 1.157625`"],"≈ $1,157.63"],
      ["A car worth $20,000 loses 10% per year. Value after 2 years?",["Factor: 0.9","`20000 × 0.9^{2} = 20000 × 0.81`"],"$16,200"]]});

CB("advm","l2",{t:"Rational expressions",
  f:["\\f{P(x)}{Q(x)}, \\s Q(x) ≠ 0"],
  h:["A **rational expression** is a fraction with letters. Treat it like a number fraction.","**Factor** top and bottom, then cancel **whole factors** that match.","Write down the **forbidden values**: whatever makes the bottom 0.","Adding: common denominator, just like `\\f{1}{2} + \\f{1}{3}`."],
  pic:PIC.flow([["(x² − 9)/(x − 3)","factor the top"],["(x − 3)(x + 3)/(x − 3)","cancel"],["x + 3","(x ≠ 3)"]],["",""],{bw:170,gap:28}),
  tr:"**Factor everything first.** No brackets → no cancelling.",
  w:"`\\f{x + 2}{2}` ≠ x. You can't cancel parts of a sum.",
  ex:[["Simplify `\\f{x^{2} − 9}{x − 3}`",["Top: `(x − 3)(x + 3)`","Cancel `(x − 3)`"],"`x + 3` (x ≠ 3)"],
      ["Where is `\\f{x}{x^{2} − 16}` undefined?",["Bottom = 0: `x^{2} = 16`"],"x = 4 and x = −4"]]});

CB("advm","l3",{t:"Complex numbers",
  f:["i^{2} = −1 || (a + bi) + (c + di) = (a + c) + (b + d)i"],
  h:["`i` is a new number whose square is −1.","A complex number looks like `a + bi`: a real part and an imaginary part.","**Add:** real with real, i with i. **Multiply:** FOIL, then replace `i^{2}` with −1.","**Divide:** multiply top and bottom by the **conjugate** (flip the sign of the i-part)."],
  pic:PIC.flow([["i¹","i"],["i²","−1"],["i³","−i"],["i⁴","1"]],["×i","×i","×i"],{bw:70,gap:44}),
  tr:"Treat i like an ordinary letter — then swap every `i^{2}` for −1 at the end.",
  w:"`(2 + 3i)(1 − i)` has an `i^{2}` term — don't forget to turn it into −1.",
  ex:[["Simplify `(2 + 3i) + (4 − i)`",["Real: `2 + 4 = 6`","Imaginary: `3i − i = 2i`"],"`6 + 2i`"],
      ["Multiply `(2 + 3i)(1 − i)`",["FOIL: `2 − 2i + 3i − 3i^{2}`","`i^{2} = −1`: `2 + i + 3`"],"`5 + i`"]]});

CB("advm","l4",{t:"Reading exponential models",
  f:["f(t) = a · b^{t} || f(t) = a · 2^{\\f{t}{k}} \\t{ doubles every } k"],
  h:["**a** = starting amount (t = 0). **b** = factor per period.","b = 1.06 → grows 6% per period. b = 0.92 → shrinks 8%.","`2^{\\f{t}{3}}` → **doubles every 3** time units. `(\\f{1}{2})^{\\f{t}{5}}` → **half-life** of 5.","Compound interest: `A = P(1 + \\f{r}{n})^{nt}` (n = times per year)."],
  pic:PIC.flow([["t = 0","500"],["t = 3","1000"],["t = 6","2000"],["t = 9","4000"]],["×2","×2","×2"],{bw:90,gap:44,cap:"500 · 2^(t/3): doubles every 3 years."}),
  tr:"The number **under** t in the exponent is how long one full step takes.",
  w:"`(0.85)^{t}` is a **15%** decrease, not 85%.",
  ex:[["`P(t) = 500 · 2^{\\f{t}{3}}`. Population after 9 years?",["`\\f{9}{3} = 3` doublings","`500 × 2^{3} = 500 × 8`"],"4,000"],
      ["`f(t) = 80(0.75)^{t}`. By what percent does f drop each period?",["`1 − 0.75 = 0.25`"],"25%"]]});

CB("advm","l5",{t:"Rational equations",
  f:["\\f{a}{x + p} = \\f{b}{x + q} ⟹ a(x + q) = b(x + p)"],
  h:["Clear the fractions: multiply both sides by the denominators (or cross-multiply when it's one fraction each side).","Solve the equation you get.","**Check:** an answer that makes any denominator 0 is **forbidden** — throw it away."],
  pic:FIG.numline(-2,6,{marks:[{v:3,label:"x = 3 forbidden",c:"red"}],cap:"x/(x − 3): the value 3 is never allowed."}),
  tr:"Write the forbidden values **before** you start solving.",
  w:"`\\f{x}{x − 3} = \\f{3}{x − 3}` gives x = 3 — which is forbidden, so **no solution**.",
  ex:[["Solve `\\f{12}{x + 2} = 3`",["Multiply by `(x + 2)`: `12 = 3x + 6`","`3x = 6`"],"x = 2"],
      ["Solve `\\f{3}{x + 1} = \\f{2}{x − 1}`",["Cross-multiply: `3(x − 1) = 2(x + 1)`","`3x − 3 = 2x + 2`"],"x = 5"]]});

CB("advm","l6",{t:"Polynomial graphs",
  f:["(x − a)^{\\t{odd}} → \\t{crosses} || (x − a)^{\\t{even}} → \\t{bounces}"],
  h:["Each factor `(x − a)` gives a zero at x = a.","**Multiplicity:** a factor used an **odd** number of times → the graph **crosses** the axis. **Even** → it **touches and bounces back**.","**End behaviour:** look at the highest-power term. Even degree → both ends the same way; odd degree → opposite ways."],
  pic:FIG.plane({r:6,fns:[{f:function(x){return 0.2*(x+3)*(x-1)*(x-1)}}],pts:[[-3,0,"crosses −3"],[1,0,"bounces at 1","red"]],cap:"(x + 3)(x − 1)²: crosses at −3, bounces at 1."}),
  tr:"**Odd → through. Even → bounce.**",
  w:"A squared factor still counts as **one** zero on the graph, but it touches instead of crossing.",
  ex:[["Zeros of `(x + 2)(x − 4)^{2}` and what happens at each?",["`x = −2`: power 1 (odd) → crosses","`x = 4`: power 2 (even) → bounces"],"crosses at −2, bounces at 4"],
      ["End behaviour of `y = −x^{3} + 2x`?",["Highest term `−x^{3}`: odd degree, negative","Left end up, right end down"],"up on the left, down on the right"]]});

/* ---------------- Modeling real situations ---------------- */
CB("model","l1",{t:"From words to a model",
  f:["\\t{same amount added?} → \\t{linear} || \\t{same percent / factor?} → \\t{exponential}"],
  h:["Ask four questions: **What changes?** (the variable) **What's the start?** **How does it change — adding or multiplying?** **Any limits?** (can't be negative, whole numbers only)","Adding a fixed amount → `y = b + mx`.","Multiplying by a fixed factor → `y = a · b^{x}`."],
  pic:PIC.flow([["what changes?","x"],["start?","a or b"],["+ or ×?","model"],["limits?","domain"]],["","",""],{bw:110,gap:30}),
  tr:"The verb tells you: “increases **by** 50” → linear; “increases **by** 5%” or “doubles” → exponential.",
  w:"Check the model at the start: plugging in x = 0 should give the starting value.",
  ex:[["A savings account starts at $300 and you add $25 a week. Model?",["Start 300, add 25 each week → linear"],"`S = 300 + 25w`"],
      ["A town of 8,000 grows 3% per year. Model?",["Start 8000, multiply by 1.03 each year → exponential"],"`P = 8000(1.03)^{t}`"]]});

CB("model","l2",{t:"A linear model from two points",
  f:["m = \\f{y_{2} − y_{1}}{x_{2} − x_{1}} || b = y − mx"],
  h:["**Step 1:** the rate (slope) from the two data points.","**Step 2:** the starting value: put one point into `y = mx + b` and solve for b.","From a table: the rate is the change in y per **one** step in x."],
  pic:FIG.plane({r:8,lines:[{m:1.5,b:1}],pts:[[2,4,"(2, 4)"],[4,7,"(4, 7)"]],cap:"Two points fix exactly one line."}),
  tr:"Always write the slope with units: “$ per hour”, “cm per day”.",
  w:"Use the same point for x and y when finding b — don't mix one point's x with another's y.",
  ex:[["A plumber charges $130 for 2 hours and $200 for 4 hours. Model?",["Rate: `\\f{200 − 130}{4 − 2} = 35` per hour","Start: `130 = 35(2) + b` → `b = 60`"],"`C = 35h + 60`"],
      ["Using that model, what does 60 mean?",["It's the cost at 0 hours"],"a $60 call-out fee"]]});

CB("model","l3",{t:"An exponential model from data",
  f:["y = a · b^{x}: \\s b = \\f{y_{2}}{y_{1}} \\t{ (for one step)}"],
  h:["The **factor** b is the ratio between consecutive values: divide, don't subtract.","The **start** a is the value at x = 0.","If the points are k steps apart, the ratio equals `b^{k}`: take the k-th root to get b.","Doubling time / half-life: how long until the amount ×2 or ÷2."],
  pic:PIC.flow([["x = 0","200"],["x = 1","240"],["x = 2","288"]],["× 1.2","× 1.2"]),
  tr:"Linear data → **subtract** neighbours. Exponential data → **divide** them.",
  w:"Percent from the factor: b = 1.2 → +20% per step.",
  ex:[["Values: x = 0 → 200, x = 1 → 240, x = 2 → 288. Model?",["`\\f{240}{200} = 1.2` and `\\f{288}{240} = 1.2` ✓","Start a = 200"],"`y = 200(1.2)^{x}`"],
      ["y = 50 at x = 0 and y = 200 at x = 2. Find b.",["`b^{2} = \\f{200}{50} = 4`","`b = 2`"],"b = 2"]]});

CB("model","l4",{t:"Interpreting & comparing models",
  f:["\\t{set models equal to find when they meet}"],
  h:["Every number in a model has a **meaning** — say it as a sentence with units.","To compare two linear models, look at the **start** (b) and the **rate** (m).","To find when two models are equal, **set them equal** and solve.","Exponential eventually beats any linear model, no matter how small its start."],
  pic:FIG.plane({r:10,lines:[{m:0.5,b:4},{m:0.8,b:1.6,c:"red"}],pts:[[8,8,"plans meet (8, 8)","vio",-140]],cap:"Two plans: the steeper one starts lower but catches up."}),
  tr:"Before you solve, predict: who starts higher? who grows faster? Then check your answer agrees.",
  w:"The meeting point's x is usually the answer (months, miles) — not the y.",
  ex:[["Company X: `30 + 0.5m`. Company Y: `18 + 0.8m`. When are they equal?",["`30 + 0.5m = 18 + 0.8m`","`12 = 0.3m`"],"m = 40"],
      ["In `C = 18 + 0.8m`, what does 0.8 mean if m is miles?",["Change in cost per one extra mile"],"$0.80 per mile"]]});
