/* =====================================================================
   AXIOM — Copybook notes 1: numbers · GCF & LCM · fractions · percentages
   Every note: the rule, the rule in human words, worked examples
   step by step, a memory trick and the classic mistake.
   ===================================================================== */

/* ---------------- Numbers & the basics ---------------- */
CB("nums","l1",{t:"The four operations",
  f:["\\c1{+}\\s\\t{put together} || \\c2{−}\\s\\t{take away} || \\c3{×}\\s\\t{groups of} || \\c4{÷}\\s\\t{share equally}"],fl:"The four moves",
  h:["**Adding** puts amounts together: 3 apples + 4 apples = 7 apples.","**Subtracting** takes away — or measures the gap between two numbers: from 4 up to 10 is `10 − 4 = 6`.","**Multiplying** is fast adding: `4 × 3` means four groups of three = 12.","**Dividing** shares fairly: 12 sweets for 3 friends → `12 ÷ 3 = 4` each.","Each move has an **undo**: + undoes −, and × undoes ÷. That's how you check any answer."],
  pic:PIC.flow([["4 groups of 3","4 × 3"],["is the same as","3+3+3+3"],["answer","12"]],["means","="]),
  k:[["sum","the answer to +"],["difference","the answer to −"],["product","the answer to ×"],["quotient","the answer to ÷"]],
  tr:"**S**um, **D**ifference, **P**roduct, **Q**uotient go in the order + − × ÷. Say it like a phone number: S-D-P-Q.",
  w:"“5 less than x” is `x − 5`, not `5 − x`. The words “less than” flip the order.",
  ex:[["A shop has 48 pens in boxes of 6. How many boxes?",["“Boxes of 6” means we share 48 into groups of 6 // sharing into equal groups = divide","`48 ÷ 6 = 8`","Check by undoing: `8 × 6 = 48` ✓ // multiply undoes divide"],"8 boxes"],
      ["Write “7 less than twice a number n” as maths.",["“Twice a number” = `2n` // twice = ×2","“7 less than” it means start with `2n` and take 7 away // less than flips the order","So: `2n − 7`"],"`2n − 7`"]]});

CB("nums","l2",{t:"Order of operations (PEMDAS)",
  f:["\\c1{P}arentheses → \\c2{E}xponents → \\c3{M}ultiply \\t{&} \\c3{D}ivide → \\c4{A}dd \\t{&} \\c4{S}ubtract"],fl:"The order",
  h:["Everyone in the world calculates in the same order, so we all get the same answer.","1️⃣ First anything in **brackets**. 2️⃣ Then **powers**. 3️⃣ Then **× and ÷** together, left to right. 4️⃣ Last **+ and −** together, left to right.","× and ÷ are **partners** of equal rank — whichever comes first (reading left to right) goes first. Same for + and −."],
  pic:PIC.flow([["1st","( )"],["2nd","x²"],["3rd","× ÷"],["4th","+ −"]],["then","then","then"],{bw:96,gap:54}),
  tr:"“**P**lease **E**xcuse **M**y **D**ear **A**unt **S**ally.” But remember MD and AS are pairs: do them left to right.",
  w:"`3 + 4 × 5` is **23**, not 35. Multiplication jumps the queue before addition.",
  ex:[["Compute `3 + 4 × (10 − 6) ÷ 2`",["Brackets first: `10 − 6 = 4` → `3 + 4 × 4 ÷ 2`","× and ÷ left to right: `4 × 4 = 16`, then `16 ÷ 2 = 8` → `3 + 8`","Add last: `3 + 8 = 11`"],"11"],
      ["Compute `20 − 2 × 3^{2}`",["No brackets. Powers first: `3^{2} = 9` → `20 − 2 × 9` // the power belongs only to the 3","Multiply: `2 × 9 = 18` → `20 − 18`","Subtract: `2`"],"2"]]});

CB("nums","l3",{t:"Negative numbers",
  f:["\\c1{(+)(+)} = + || \\c1{(−)(−)} = + || \\c2{(+)(−)} = − || \\c2{(−)(+)} = −","a − (−b) = a + b"],
  h:["Think of a **thermometer**: above zero is warm (positive), below zero is cold (negative).","Adding a negative = moving **down**. Subtracting a negative = moving **up** (taking away a debt makes you richer).","For × and ÷ only count the minus signs: **even** number of minuses → positive answer, **odd** → negative."],
  pic:FIG.numline(-6,6,{jumps:[{from:-4,to:3,label:"+7",c:"grn"}],marks:[{v:-4,label:"start −4",c:"red"},{v:3,label:"end 3",c:"blue"}],cap:"−4 + 7: start at −4 and walk 7 steps right."}),
  tr:"Two minuses next to each other (− −) shake hands and become a plus.",
  w:"`(−3)^{2} = 9` but `−3^{2} = −9`. Without brackets the square only touches the 3.",
  ex:[["Compute `−8 − (−5) + 2`",["Two minuses together become a plus: `−8 + 5 + 2` // −(−5) = +5","Left to right: `−8 + 5 = −3`","`−3 + 2 = −1`"],"−1"],
      ["Compute `(−2)(3)(−4)`",["Count the minus signs: two of them → even → answer is positive","Multiply the sizes: `2 × 3 × 4 = 24`"],"24"]]});

CB("nums","l4",{t:"Factors, multiples & primes",
  f:["\\t{factor} × \\t{factor} = \\t{number} || \\t{number} × 1, 2, 3, … = \\t{multiples}"],fl:"Two directions",
  h:["**Factors** fit *inside* a number with nothing left over. Factors of 12: 1, 2, 3, 4, 6, 12.","**Multiples** grow *out of* a number: multiples of 4 are 4, 8, 12, 16, 20 …","A **prime** has exactly two factors: 1 and itself (2, 3, 5, 7, 11, 13 …). 1 is **not** prime.","Every number breaks into primes in exactly one way: `60 = 2^{2} × 3 × 5`."],
  pic:FIG2.tree(60,{cap:"A factor tree: keep splitting until every branch ends in a prime."}),
  tr:"**F**actors are **F**ew and small (they fit inside). **M**ultiples are **M**any and big (they go on forever).",
  w:"2 is the only even prime. And 1 is not prime — it has only one factor.",
  ex:[["List all factors of 36.",["Find pairs that multiply to 36, starting from 1: `1 × 36`, `2 × 18`, `3 × 12`, `4 × 9`, `6 × 6` // stop when the pair meets in the middle","Write every number from the pairs once"],"1, 2, 3, 4, 6, 9, 12, 18, 36"],
      ["Write 84 as a product of primes.",["`84 = 2 × 42` // start with the smallest prime","`42 = 2 × 21`","`21 = 3 × 7` — all primes now","Collect them: `2 × 2 × 3 × 7`"],"`84 = 2^{2} × 3 × 7`"]]});

CB("nums","l5",{t:"Even, odd, remainders & consecutive numbers",
  f:["\\t{even} ± \\t{even} = \\t{even} || \\t{odd} ± \\t{odd} = \\t{even} || \\t{even} ± \\t{odd} = \\t{odd}","\\t{number} = \\t{divisor} × \\t{quotient} + \\t{remainder}"],
  h:["Not sure about an even/odd rule? **Test tiny numbers**: odd + odd → 1 + 3 = 4, even. Done.","A **remainder** is what's left over when sharing doesn't work out exactly: 17 sweets for 5 children → 3 each, **2 left**.","**Consecutive** numbers come one after another: n, n + 1, n + 2. Consecutive even (or odd) numbers jump by 2: n, n + 2, n + 4.","For an odd count of consecutive numbers, the **middle one = total ÷ count**."],
  pic:FIG.numline(0,20,{step:5,marks:[{v:15,label:"5 × 3 = 15",c:"blue"},{v:17,label:"17",c:"red"}],jumps:[{from:15,to:17,label:"remainder 2",c:"grn",h:24}],cap:"17 ÷ 5: three full groups reach 15, and 2 is left over."}),
  tr:"Remainder questions: never do algebra first. **Pick the smallest number** that fits the rule and just compute.",
  w:"Consecutive **odd** numbers are n, n + 2, n + 4 — not n, n + 1, n + 3.",
  ex:[["When n is divided by 7 the remainder is 3. What is the remainder when 2n is divided by 7?",["Pick a number that fits: `n = 10` (10 = 7 + 3) // smallest easy choice","Then `2n = 20`","`20 ÷ 7 = 2` remainder 6 // 7 × 2 = 14, 20 − 14 = 6"],"6"],
      ["Three consecutive odd numbers add to 57. What are they?",["Middle number = total ÷ count = `57 ÷ 3 = 19`","The others are 2 below and 2 above","Check: `17 + 19 + 21 = 57` ✓"],"17, 19, 21"]]});

CB("nums","l6",{t:"Mental maths & estimating",
  f:["× 5 = × 10 ÷ 2 || × 25 = × 100 ÷ 4 || 10\\% = ÷ 10"],fl:"Speed tricks",
  h:["**× 5:** multiply by 10, then halve. `46 × 5 = 460 ÷ 2 = 230`.","**10%:** move the decimal point one place left. 10% of 340 = 34. Then 5% is half of that, 20% is double.","**× 99:** multiply by 100 and take one away: `7 × 99 = 700 − 7 = 693`.","**Estimate first**: round, get a rough answer, then compare with the calculator. It catches mistyped numbers."],
  pic:PIC.flow([["10% of 48","4.8"],["5% (half)","2.4"],["15% (add)","7.2"]],["halve","add both"]),
  tr:"The estimate is your **seatbelt**: two seconds of rounding saves you from a wrong key press.",
  w:"Round **sensibly**: 38.7 × 5.1 ≈ 40 × 5 = 200, not 30 × 5. Round to the nearest friendly number.",
  ex:[["A meal costs $48. Leave a 15% tip, mentally.",["10% of 48 = 4.80 // move the point one place","5% = half of that = 2.40","15% = 10% + 5% = `4.80 + 2.40`"],"$7.20"],
      ["Estimate `612 ÷ 29.7`",["Round to friendly numbers: `600 ÷ 30`","`600 ÷ 30 = 20`","So the real answer must be about 20 (it is 20.6)"],"about 20"]]});

CB("nums","l7",{t:"Types of numbers & squares to know",
  f:["\\t{natural} ⊂ \\t{integers} ⊂ \\t{rationals} ⊂ \\t{reals}"],fl:"Number families",
  h:["**Natural** numbers: 1, 2, 3 … (counting). **Integers**: add 0 and the negatives (… −2, −1, 0, 1, 2 …).","**Rational** numbers can be written as a fraction of integers: `\\f{3}{4}`, 0.5, −2, 0.333… **Irrational**: they can't — like `\\r{2}` and π (their decimals never end or repeat).","Learn the **squares** 1² to 15² and the **cubes** 1³ to 5³ by heart — the SAT uses them constantly."],
  pic:PIC.flow([["1² 2² 3² 4² 5²","1 4 9 16 25"],["6² 7² 8² 9² 10²","36 49 64 81 100"],["11² 12² 13² 14² 15²","121 144 169 196 225"]],["",""],{bw:170,gap:20}),
  tr:"Every integer is rational (5 = 5/1). If a decimal **stops or repeats**, it's rational.",
  w:"`\\r{16} = 4` is rational — a square root is only irrational when the number isn't a perfect square.",
  ex:[["Which are integers: −7, 0.5, 0, `\\f{12}{4}`, `\\r{9}`?",["−7 is a whole number below zero → integer","0.5 is between 0 and 1 → not an integer","`\\f{12}{4} = 3` and `\\r{9} = 3` → integers // simplify before you decide"],"−7, 0, 12/4, √9"],
      ["Is `\\r{50}` between 7 and 8?",["`7^{2} = 49` and `8^{2} = 64`","50 is between 49 and 64","So `\\r{50}` is between 7 and 8 (just above 7)"],"yes, about 7.07"]]});

CB("nums","l8",{t:"Opposites & absolute value",
  f:["|a| = \\t{distance from} 0 || |5| = |−5| = 5"],
  h:["The **opposite** of a number is its mirror image across zero: the opposite of 4 is −4, of −7 is 7.","**Absolute value** `|x|` is the **distance from zero** — always zero or positive. Direction doesn't matter, only how far.","A number plus its opposite is always 0: `a + (−a) = 0`."],
  pic:FIG.numline(-6,6,{marks:[{v:-5,label:"−5",c:"red"},{v:5,label:"5",c:"blue"}],jumps:[{from:0,to:-5,label:"5 steps",c:"grn"},{from:0,to:5,label:"5 steps",c:"grn"}],cap:"−5 and 5 are both 5 steps from zero, so |−5| = |5| = 5."}),
  tr:"Absolute value bars are a **washing machine**: the minus sign gets washed out, the size stays.",
  w:"Do the inside first: `|3 − 8| = |−5| = 5`, not 3 + 8.",
  ex:[["Compute `|−12| − |4 − 9|`",["Inside the second bars first: `4 − 9 = −5`","Distances: `|−12| = 12`, `|−5| = 5`","`12 − 5`"],"7"],
      ["Which is smaller: −9 or −2?",["On the number line −9 is further to the left","Further left = smaller, even though |−9| is bigger"],"−9"]]});

CB("nums","l9",{t:"Comparing & ordering numbers",
  f:["\\f{3}{8} = 0.375 || 38\\% = 0.38 || 0.4"],fl:"Put them in one form",
  h:["**Step 1:** turn everything into decimals (fraction → divide top by bottom; percent → ÷ 100).","**Step 2:** compare digit by digit from the left, like words in a dictionary. Add zeros so they're the same length: 0.375 vs 0.380 vs 0.400.","For negatives the order flips: the number further from zero is the **smaller** one."],
  pic:FIG.numline(0,1,{step:0.25,marks:[{v:0.375,label:"3/8",c:"blue"},{v:0.4,label:"0.4",c:"red"}],cap:"3/8 = 0.375 sits just left of 0.4."}),
  tr:"Same length first: 0.4 → 0.400. Then it's like comparing 375, 380 and 400.",
  w:"0.5 > 0.45 even though 45 > 5. Compare **place by place**, not by how many digits.",
  ex:[["Order from smallest: `\\f{2}{5}`, 0.38, 41%",["Change to decimals: `\\f{2}{5} = 0.40`, 0.38, 41% = 0.41","Compare: 0.38 < 0.40 < 0.41"],"0.38, 2/5, 41%"],
      ["Order: −0.5, −0.45, −1",["Further from zero = smaller: −1 is furthest","Then −0.5 (it's further than −0.45)"],"−1, −0.5, −0.45"]]});

CB("nums","l10",{t:"Decimals: the four operations",
  f:["\\t{add/subtract: line up the points} || \\t{multiply: count the decimal places}"],fl:"Decimal rules",
  h:["**Add & subtract:** write the numbers under each other with the **decimal points lined up**. Fill gaps with zeros.","**Multiply:** ignore the points, multiply as whole numbers, then put back as many decimal places as the two numbers had together.","**Divide:** move the point in both numbers until the one you divide **by** is whole: `4.8 ÷ 0.6 = 48 ÷ 6 = 8`.","**Round:** look at the next digit — 5 or more rounds up."],
  pic:PLACEV(),
  tr:"Money is the best teacher: $2.50 + $0.75 — you'd never line up the 2 with the 7.",
  w:"`0.3 × 0.2 = 0.06`, not 0.6: there are **two** decimal places in total.",
  ex:[["Compute `3.25 × 0.4`",["Ignore the points: `325 × 4 = 1300`","Decimal places: 3.25 has 2, 0.4 has 1 → 3 in total","Put back 3 places: 1.300"],"1.3"],
      ["Compute `7.2 ÷ 0.08`",["Make the divisor whole: move both points two places right → `720 ÷ 8` // same jump in both numbers keeps the answer the same","`720 ÷ 8 = 90`"],"90"]]});

/* ---------------- GCF & LCM ---------------- */
CB("gcf","l1",{t:"Divisibility rules",
  f:["\\t{by 3: digit sum ÷ 3} || \\t{by 9: digit sum ÷ 9} || \\t{by 4: last two digits ÷ 4}"],fl:"Quick tests",
  h:["**2:** last digit even. **5:** ends in 0 or 5. **10:** ends in 0.","**3:** add the digits — if the sum divides by 3, so does the number. **9:** same idea with 9.","**4:** the last two digits divide by 4. **6:** passes both the 2 test and the 3 test."],
  pic:DIGITS([4,5,7,2],"4 + 5 + 7 + 2 = 18 → divisible by 3 and by 9."),
  tr:"3 and 9 are the “digit sum” rules. 2, 4, 5 and 10 only look at the **end** of the number.",
  w:"Divisible by 6 needs **both** 2 and 3. 3,333 passes the 3 test but is odd, so it fails 6.",
  ex:[["Is 2,754 divisible by 9?",["Add the digits: `2 + 7 + 5 + 4 = 18`","18 divides by 9 ✓"],"Yes — 2,754 = 9 × 306"],
      ["Is 1,234 divisible by 4?",["Only the last two digits matter: 34","`34 ÷ 4 = 8.5` — not whole"],"No"]]});

CB("gcf","l2",{t:"Prime factorization",
  f:["360 = 2^{3} × 3^{2} × 5"],fl:"Every number's recipe",
  h:["Keep splitting a number into smaller factors until every piece is **prime**. That's its prime factorization — its unique recipe.","Use a **factor tree** (branches) or a **division ladder** (keep dividing by the smallest prime that works).","Write repeated primes with **exponents**: 2 × 2 × 2 = 2³."],
  pic:FIG2.tree(360,{cap:"360 → 2 × 180 → … → 2 × 2 × 2 × 3 × 3 × 5."}),
  tr:"Always try the **smallest prime first**: 2, then 3, then 5, then 7. You'll never miss one.",
  w:"Don't stop at a non-prime: 4 and 9 must be split further into 2 × 2 and 3 × 3.",
  ex:[["Prime-factorise 120.",["`120 ÷ 2 = 60`, `60 ÷ 2 = 30`, `30 ÷ 2 = 15` // three 2s","`15 ÷ 3 = 5`, and 5 is prime","Collect: `2 × 2 × 2 × 3 × 5`"],"`2^{3} × 3 × 5`"],
      ["Prime-factorise 98.",["`98 ÷ 2 = 49`","49 isn't divisible by 2, 3 or 5 → try 7: `49 = 7 × 7`"],"`2 × 7^{2}`"]]});

CB("gcf","l3",{t:"Greatest common factor (GCF)",
  f:["\\t{GCF} = \\t{shared primes, smallest powers}"],
  h:["The **GCF** is the biggest number that divides **both** numbers exactly.","Small numbers: list the factors and pick the biggest one they share.","Any numbers: prime-factorise both and multiply the primes they **share**.","Big numbers: Euclid's trick — GCF(a, b) = GCF(b, remainder of a ÷ b). Repeat until the remainder is 0."],
  pic:FIG2.venn(24,36,{cap:"24 = 2·2·2·3, 36 = 2·2·3·3. Shared middle: 2·2·3 = 12."}),
  tr:"GCF is **G**reatest and **small** — it can never be bigger than the smaller number.",
  w:"Shared primes only, and only as many times as **both** have them: 24 has three 2s, 36 has two → use two.",
  ex:[["Find GCF(24, 36).",["`24 = 2^{3} × 3`, `36 = 2^{2} × 3^{2}`","Shared: two 2s and one 3","`2 × 2 × 3`"],"12"],
      ["Find GCF(84, 120) with Euclid's trick.",["`120 ÷ 84` → remainder 36","`84 ÷ 36` → remainder 12","`36 ÷ 12` → remainder 0, so stop // the last divisor is the GCF"],"12"]]});

CB("gcf","l4",{t:"Least common multiple (LCM)",
  f:["\\t{LCM}(a, b) = \\f{a × b}{\\t{GCF}(a, b)}"],
  h:["The **LCM** is the smallest number that **both** numbers divide into — the first place their times tables meet.","Small numbers: list multiples of the bigger number until one also works for the smaller.","Prime method: take **every** prime that appears, with its **biggest** power.","Shortcut: multiply the two numbers and divide by their GCF."],
  pic:PIC.flow([["× 6","6, 12, 18, 24"],["× 8","8, 16, 24"],["first match","24"]],["",""]),
  tr:"LCM is **L**east but **large** — it's at least as big as the bigger number.",
  w:"The LCM is not always a × b: LCM(6, 8) = 24, not 48 (because they share a 2).",
  ex:[["Find LCM(6, 8).",["Multiples of 8: 8, 16, 24 …","Is 24 a multiple of 6? `24 = 6 × 4` ✓"],"24"],
      ["Find LCM(18, 30) using the GCF.",["GCF(18, 30) = 6","`\\f{18 × 30}{6} = \\f{540}{6}`","`= 90`"],"90"]]});

CB("gcf","l5",{t:"GCF × LCM = a × b",
  f:["\\t{GCF}(a, b) × \\t{LCM}(a, b) = a × b"],
  h:["For **two** numbers, the GCF and LCM multiply to give the same thing as the two numbers multiplied.","Why: in a Venn diagram of primes, GCF is the middle and LCM is everything — together they use each prime exactly as often as a × b does.","For **three** numbers it doesn't work — use primes instead."],
  pic:FIG2.venn(12,18,{cap:"GCF = 6, LCM = 36, and 6 × 36 = 216 = 12 × 18."}),
  tr:"If you know three of the four (a, b, GCF, LCM), divide to find the fourth.",
  w:"Only for **two** numbers. For 3 numbers the rule breaks.",
  ex:[["GCF(a, 16) = 4 and LCM(a, 16) = 48. Find a.",["`4 × 48 = a × 16`","`192 = 16a`","`a = 192 ÷ 16`"],"a = 12"],
      ["Find GCF and LCM of 4, 6 and 10.",["Primes: `4 = 2^{2}`, `6 = 2 × 3`, `10 = 2 × 5`","GCF: the prime all three share → 2","LCM: every prime, biggest power: `2^{2} × 3 × 5 = 60`"],"GCF 2, LCM 60"]]});

CB("gcf","l6",{t:"Word problems: GCF or LCM?",
  f:["\\t{split into equal groups} → \\t{GCF} || \\t{happen together again} → \\t{LCM}"],fl:"Which one?",
  h:["**GCF** questions **split** things: biggest equal groups, largest square tiles, most identical bags. The answer is **smaller** than the numbers.","**LCM** questions **repeat** things: when will both buses leave together again, smallest number of items that packs evenly both ways. The answer is **bigger**.","Ask: “is the answer smaller or bigger than my numbers?” — that tells you which."],
  pic:PIC.flow([["bus A every","12 min"],["bus B every","18 min"],["together after","36 min"]],["",""]),
  tr:"**G**CF **G**roups (divide up). **L**CM **L**ater (wait for a meeting).",
  w:"If the answer you get is bigger than both numbers in a “split” question, you used the wrong one.",
  ex:[["24 red and 36 blue marbles go into identical bags with nothing left over. Most bags?",["Splitting into identical groups → GCF","GCF(24, 36) = 12","Each bag: 2 red + 3 blue"],"12 bags"],
      ["Two lights blink every 8 s and 12 s. They blink together now. When next?",["Repeating events meeting again → LCM","LCM(8, 12) = 24"],"after 24 seconds"]]});

CB("gcf","l7",{t:"GCF & LCM inside fractions",
  f:["\\f{a}{b} = \\f{a ÷ \\t{GCF}}{b ÷ \\t{GCF}} || \\t{common denominator} = \\t{LCM}"],
  h:["**Simplify** a fraction in one move: divide top and bottom by their GCF.","**Add or subtract** fractions using the LCM of the bottoms as the common denominator — the smallest one, so the numbers stay small.","Works with letters too: `\\f{6x^{2}}{9x} = \\f{2x}{3}` (GCF = 3x)."],
  pic:PIC.strip(4,3,{n2:8,k2:6,cap:"6/8 simplified by GCF 2 is 3/4 — the same amount."}),
  tr:"Simplify with the **G**CF (makes numbers **G**o down). Add with the **L**CM (makes bottoms **L**ine up).",
  w:"Cancel factors, never terms: in `\\f{x + 6}{6}` you can't cancel the 6s.",
  ex:[["Simplify `\\f{48}{72}`",["GCF(48, 72) = 24","`48 ÷ 24 = 2`, `72 ÷ 24 = 3`"],"`\\f{2}{3}`"],
      ["Compute `\\f{5}{6} + \\f{3}{8}`",["LCM(6, 8) = 24 → common denominator","`\\f{5}{6} = \\f{20}{24}`, `\\f{3}{8} = \\f{9}{24}`","`\\f{20 + 9}{24} = \\f{29}{24}`"],"`\\f{29}{24}` (= 1 5/24)"]]});

/* ---------------- Fractions, decimals & percents ---------------- */
CB("frac","l0",{t:"What a fraction is",
  f:["\\f{\\c1{3}}{\\c2{4}} \\s ← \\t{pieces we take} / \\t{equal pieces in one whole}"],fl:"Top and bottom",
  h:["The **bottom** (denominator) says how many **equal** pieces one whole is cut into.","The **top** (numerator) says how many of those pieces you have.","Top smaller than bottom → less than 1 (proper). Top bigger → more than 1 (improper). Top = bottom → exactly 1.","A fraction is also a **point on the number line**: 3/4 is three quarters of the way from 0 to 1."],
  pic:FIG.pizza(4,3,{cap:"3/4: the pizza is cut into 4 equal slices and we take 3."}),
  tr:"**D**enominator = **D**own and **D**ivides the whole. **N**umerator = **N**umber you have.",
  w:"The pieces must be **equal**. Three slices of a pizza cut unevenly is not 3/4.",
  ex:[["A chocolate bar has 12 squares. You eat 5. What fraction is left?",["Whole = 12 squares → bottom is 12","Left: `12 − 5 = 7` squares → top is 7"],"`\\f{7}{12}`"],
      ["Is `\\f{9}{7}` more or less than 1?",["Top 9 is bigger than bottom 7","So we have more than one whole: `\\f{9}{7} = 1\\f{2}{7}`"],"more than 1"]]});

CB("frac","l1",{t:"Fractions are division",
  f:["\\f{a}{b} = a ÷ b","\\f{a}{b} = \\f{a × k}{b × k}"],
  h:["`\\f{3}{4}` literally means `3 ÷ 4 = 0.75`. Every fraction is a division waiting to happen.","Multiply or divide the top **and** bottom by the same number and the value doesn't change — like cutting a pizza into more, smaller slices.","**Simplify** by dividing top and bottom by the biggest number that fits both."],
  pic:PIC.strip(2,1,{n2:6,k2:3,cap:"1/2 = 3/6: same amount, cut into more pieces."}),
  tr:"Whatever you do to the top, do to the bottom — and the fraction stays the same size.",
  w:"Adding the same number to top and bottom **changes** the value: `\\f{1}{2} ≠ \\f{1 + 1}{2 + 1}`.",
  ex:[["Simplify `\\f{18}{24}`",["Biggest number that divides 18 and 24: 6","`18 ÷ 6 = 3`, `24 ÷ 6 = 4`"],"`\\f{3}{4}`"],
      ["Write `\\f{5}{8}` as a decimal.",["A fraction is a division: `5 ÷ 8`","`= 0.625`"],"0.625"]]});

CB("frac","l2",{t:"Fractions ⇄ decimals ⇄ percents",
  f:["\\f{1}{4} = 0.25 = 25\\%"],fl:"Three names, one amount",
  h:["**Fraction → decimal:** divide top by bottom.","**Decimal → percent:** × 100 (move the point 2 places right). **Percent → decimal:** ÷ 100.","**Percent** literally means “out of 100”: 25% = 25/100.","**“Percent of”** means multiply: 30% of 80 = `0.30 × 80 = 24`."],
  pic:PIC.flow([["fraction","3/4"],["decimal","0.75"],["percent","75%"]],["top ÷ bottom","× 100"]),
  tr:"Know these by heart: 1/2 = 50%, 1/4 = 25%, 3/4 = 75%, 1/5 = 20%, 1/10 = 10%, 1/3 ≈ 33.3%.",
  w:"0.5% is **half of one percent** = 0.005, not 0.5.",
  ex:[["What is 35% of 60?",["“Of” means ×, and 35% = 0.35","`0.35 × 60 = 21`"],"21"],
      ["Write `\\f{3}{8}` as a percent.",["`3 ÷ 8 = 0.375`","× 100 → 37.5%"],"37.5%"]]});

CB("frac","l3",{t:"Percent change",
  f:["\\t{new} = \\t{old} × (1 ± \\t{rate})","\\t{percent change} = \\f{\\t{new} − \\t{old}}{\\t{old}} × 100\\%"],
  h:["Going **up** 20%? Multiply by **1.20**. Going **down** 20%? Multiply by **0.80** (you keep 80%).","To find the percent change, divide the **change** by the **original** (old) value.","Always divide by where you **started**, never by where you ended."],
  pic:PIC.bars2(["old",40,"40"],["new",50,"50"],{mid:"+10 = +25%",cap:"The change (10) is compared with the start (40): 10 ÷ 40 = 25%."}),
  tr:"Up p% → × (1 + p). Down p% → × (1 − p). One multiplication, no subtracting afterwards.",
  w:"Up 20% then down 20% is **not** back to the start: 100 → 120 → 96.",
  ex:[["A $80 jacket is 25% off. New price?",["You keep `100\\% − 25\\% = 75\\%` → multiply by 0.75","`80 × 0.75 = 60`"],"$60"],
      ["A price rises from $40 to $50. Percent increase?",["Change: `50 − 40 = 10`","Divide by the OLD price: `\\f{10}{40} = 0.25`"],"25% increase"]]});

CB("frac","l4",{t:"Mixed numbers & comparing fractions",
  f:["a\\f{b}{c} = \\f{a × c + b}{c}"],
  h:["A **mixed number** like 2⅓ means 2 wholes and ⅓ more. Turn it into one fraction to calculate: `2\\f{1}{3} = \\f{7}{3}` (2 wholes = 6 thirds, plus 1).","**Compare** fractions by changing them to decimals, or by **cross-multiplying**: for `\\f{5}{8}` vs `\\f{3}{5}`, compare `5 × 5 = 25` with `8 × 3 = 24` → 5/8 wins.","The **reciprocal** flips a fraction: of 3/4 it's 4/3."],
  pic:PIC.strip(8,5,{n2:5,k2:3,cap:"5/8 (0.625) is a bit bigger than 3/5 (0.6)."}),
  tr:"Mixed → improper: **multiply the whole by the bottom, add the top**, keep the bottom.",
  w:"On the SAT grid-in, type `7/3`, never “2 1/3” — the computer reads that as 21/3.",
  ex:[["Write `3\\f{2}{5}` as an improper fraction.",["Whole × bottom: `3 × 5 = 15`","Add the top: `15 + 2 = 17`","Keep the bottom 5"],"`\\f{17}{5}`"],
      ["Which is bigger: `\\f{4}{9}` or `\\f{3}{7}`?",["Cross-multiply: `4 × 7 = 28` and `9 × 3 = 27`","28 is on the side of 4/9"],"`\\f{4}{9}`"]]});

CB("frac","l5",{t:"Real-life percent: tax, tip, discount, interest",
  f:["\\t{price} × (1 − \\t{discount}) × (1 + \\t{tax})","I = P × r × t"],
  h:["Discount, tax and tip are all **multipliers**: 25% off → × 0.75, 8% tax → × 1.08, 20% tip → × 1.20.","Several changes? **Chain the multipliers** — multiply them one after another.","**Simple interest:** interest = principal × rate × years. $500 at 4% for 3 years earns `500 × 0.04 × 3 = 60`."],
  pic:PIC.flow([["price","$60"],["25% off (× 0.75)","$45"],["+8% tax (× 1.08)","$48.60"]],["× 0.75","× 1.08"],{bw:140}),
  tr:"Say it out loud: **“percent changes multiply.”** Never add 25% and 8%.",
  w:"“A is 30% more than B” does **not** mean “B is 30% less than A”. The base is different.",
  ex:[["A $60 shirt is 25% off, then 8% tax is added. Final price?",["25% off → × 0.75: `60 × 0.75 = 45`","8% tax → × 1.08: `45 × 1.08 = 48.60`"],"$48.60"],
      ["$800 at 5% simple interest for 2 years. Total?",["Interest: `800 × 0.05 × 2 = 80`","Total = money + interest = `800 + 80`"],"$880"]]});

CB("frac","l6",{t:"Reverse percent: finding the original",
  f:["\\t{original} = \\f{\\t{new}}{\\t{multiplier}}"],
  h:["They give you the price **after** the change and ask for the price **before**.","Write the change as a multiplier (25% off → 0.75), then **divide** the new price by it.","Why divide? Because `original × 0.75 = new`, and division undoes multiplication."],
  pic:PIC.flow([["original","?"],["× 0.75 (25% off)",""],["new price","$60"]],["",""]),
  tr:"Forward: **multiply**. Backward: **divide**. Same multiplier both ways.",
  w:"Don't add the 25% back onto $60 (that gives $75 — wrong). The 25% was taken from the original.",
  ex:[["After a 25% discount a coat costs $60. Original price?",["25% off → multiplier 0.75","`original = 60 ÷ 0.75`","`= 80`. Check: `80 × 0.75 = 60` ✓"],"$80"],
      ["After a 20% raise, a salary is $54,000. What was it before?",["20% up → multiplier 1.2","`54000 ÷ 1.2 = 45000`"],"$45,000"]]});

CB("frac","l7",{t:"Adding & subtracting fractions",
  f:["\\f{a}{b} + \\f{c}{d} = \\f{ad + bc}{bd}"],
  h:["You can only add pieces of the **same size** — so first make the bottoms equal.","Find a common denominator (the LCM of the bottoms), rewrite each fraction, then add the **tops** and keep the bottom.","Mixed numbers: either add wholes and fractions separately, or turn everything into improper fractions."],
  pic:PIC.strip(3,1,{n2:6,k2:2,cap:"1/3 is the same size as 2/6 — now it can be added to other sixths."}),
  tr:"**Bottoms must match, then add the tops.** Never add the bottoms.",
  w:"`\\f{1}{2} + \\f{1}{3}` is `\\f{5}{6}`, not `\\f{2}{5}`.",
  ex:[["Compute `\\f{2}{3} + \\f{3}{4}`",["Common bottom: 12","`\\f{2}{3} = \\f{8}{12}`, `\\f{3}{4} = \\f{9}{12}`","`\\f{8 + 9}{12} = \\f{17}{12}`"],"`\\f{17}{12}` = 1 5/12"],
      ["Compute `3\\f{1}{4} − 1\\f{2}{3}`",["Improper: `\\f{13}{4} − \\f{5}{3}`","Common bottom 12: `\\f{39}{12} − \\f{20}{12}`","`= \\f{19}{12}`"],"`\\f{19}{12}` = 1 7/12"]]});

CB("frac","l8",{t:"Multiplying & dividing fractions",
  f:["\\f{a}{b} × \\f{c}{d} = \\f{a × c}{b × d} || \\f{a}{b} ÷ \\f{c}{d} = \\f{a}{b} × \\f{d}{c}"],
  h:["**Multiply:** top × top, bottom × bottom. No common denominator needed!","**Cancel first** to keep numbers small: any top can cancel with any bottom.","**Divide:** keep the first fraction, change ÷ to ×, flip the second (**keep–change–flip**).","“Half **of** 30” = `\\f{1}{2} × 30`. “Of” means multiply."],
  pic:FIG2.areaBox(["2/3"],["3/4"],[["6/12"]],{cap:"2/3 of 3/4 is 6/12 = 1/2 of the whole square."}),
  tr:"**K**eep, **C**hange, **F**lip — “KCF” for dividing.",
  w:"Flip the **second** fraction, not the first.",
  ex:[["Compute `\\f{4}{9} × \\f{3}{8}`",["Cancel: 4 with 8 → 1 and 2; 3 with 9 → 1 and 3","`\\f{1}{3} × \\f{1}{2} = \\f{1}{6}`"],"`\\f{1}{6}`"],
      ["Compute `\\f{2}{5} ÷ \\f{4}{15}`",["Keep–change–flip: `\\f{2}{5} × \\f{15}{4}`","Cancel 5 with 15 → 1 and 3; 2 with 4 → 1 and 2","`\\f{1 × 3}{1 × 2} = \\f{3}{2}`"],"`\\f{3}{2}` = 1½"]]});

CB("frac","l9",{t:"Fraction word problems",
  f:["\\t{part} = \\t{fraction} × \\t{whole} || \\t{whole} = \\t{part} ÷ \\t{fraction}"],
  h:["**A fraction of an amount:** multiply. 2/5 of 40 = 16.","**What's left:** subtract the fraction from 1 first. Spend 1/3 → 2/3 is left.","**A fraction of what's left:** work in stages — find what's left, then take the fraction of **that**.","**Find the whole from a part:** divide. If 3/4 of the class is 18, the class is `18 ÷ \\f{3}{4} = 24`."],
  pic:TAPE(["rent 1/3","1/4 of rest: food","left"],["var(--blue)","var(--violet)","var(--grn)"],"Of $120: rent $40, food $20, left $60"),
  tr:"Draw a **bar** and cut it. Pictures make “fraction of what's left” obvious.",
  w:"“1/4 of the remaining” is not 1/4 of the original — read the word **remaining**.",
  ex:[["Sara has $120. She spends 1/3 on rent, then 1/4 of the remaining money on food. How much is left?",["Rent: `\\f{1}{3} × 120 = 40` → left `80`","Food: `\\f{1}{4} × 80 = 20` // a quarter of what's LEFT","Left: `80 − 20`"],"$60"],
      ["3/5 of the students walk to school. That's 27 students. How many students in all?",["Part = 27, fraction = 3/5","Whole = `27 ÷ \\f{3}{5} = 27 × \\f{5}{3}`","`= 45`"],"45 students"]]});

/* ---------------- Percentages ---------------- */
CB("pct","l1",{t:"What a percent really is",
  f:["p\\% = \\f{p}{100}"],
  h:["“Per cent” = **per hundred**. 37% means 37 out of every 100.","Three ways to write it: `37\\% = \\f{37}{100} = 0.37`.","Over 100% means **more than the whole**: 150% = 1.5 times. Under 1% is tiny: 0.4% = 0.004."],
  pic:FIG2.grid100(37,{cap:"37% = 37 of the 100 squares."}),
  tr:"Percent → decimal: **slide the point 2 left** (37% → 0.37). Decimal → percent: slide it 2 right.",
  w:"0.25 is 25%, but 0.25% is a quarter of one percent = 0.0025.",
  ex:[["Write 8% as a decimal and as a fraction.",["Decimal: slide the point 2 left → 0.08","Fraction: `\\f{8}{100} = \\f{2}{25}`"],"0.08 = 2/25"],
      ["Write 1.25 as a percent.",["Slide the point 2 right → 125%","More than 100% → more than the whole"],"125%"]]});

CB("pct","l2",{t:"The three percent questions",
  f:["\\t{part} = \\t{percent} × \\t{whole}"],fl:"One equation for all three",
  h:["Every percent question hides the same equation. Translate the words: **is** → =, **of** → ×, **what** → the unknown.","**Find the part:** What is 20% of 50? → `x = 0.2 × 50 = 10`.","**Find the percent:** 10 is what % of 50? → `10 = p × 50` → p = 0.2 = 20%.","**Find the whole:** 10 is 20% of what? → `10 = 0.2 × x` → x = 50."],
  pic:PIC.pct(20,{part:"part 10",whole:"whole 50",cap:"10 is 20% of 50."}),
  tr:"“**Is** over **of** equals percent over 100”: `\\f{\\t{is}}{\\t{of}} = \\f{\\%}{100}`.",
  w:"Write the equation **every time**, even when it looks easy — most mistakes come from guessing which number is the whole.",
  ex:[["18 is what percent of 72?",["“is” → =, “of” → ×: `18 = p × 72`","`p = \\f{18}{72} = 0.25`"],"25%"],
      ["42 is 60% of what number?",["`42 = 0.6 × x`","`x = 42 ÷ 0.6`"],"70"]]});

CB("pct","l3",{t:"Percent increase & decrease with multipliers",
  f:["\\t{up} p\\%: × (1 + \\f{p}{100}) || \\t{down} p\\%: × (1 − \\f{p}{100})"],
  h:["A **multiplier** does the change in one step. Up 15% → × 1.15. Down 15% → × 0.85.","To read a multiplier: 1.07 = up 7%; 0.93 = down 7%.","**Percent change** = change ÷ original × 100%."],
  pic:PIC.flow([["start","200"],["up 15%","× 1.15"],["result","230"]],["",""]),
  tr:"Above 1 = growing, below 1 = shrinking. The digits after the 1 (or missing below it) are the percent.",
  w:"“Decreased **to** 80%” (× 0.8) is different from “decreased **by** 80%” (× 0.2).",
  ex:[["A town of 12,000 people grows 15%. New population?",["Up 15% → × 1.15","`12000 × 1.15 = 13800`"],"13,800"],
      ["A stock falls from $250 to $210. Percent decrease?",["Change: `250 − 210 = 40`","Divide by the original: `\\f{40}{250} = 0.16`"],"16% decrease"]]});

CB("pct","l4",{t:"Successive changes & percent of a percent",
  f:["\\t{two changes} = × m_{1} × m_{2}"],
  h:["Several percent changes in a row? **Multiply the multipliers.** Up 10% then up 20%: `1.1 × 1.2 = 1.32` → up 32% in total (not 30%).","Each new percent works on the **new** amount, not the original — that's why they don't simply add.","Stuck? **Start with 100** — it makes every percent easy to see."],
  pic:PIC.flow([["start","100"],["+10%","110"],["+20%","132"]],["× 1.1","× 1.2"]),
  tr:"Use **100** as your starting number. The final number minus 100 is the total percent change.",
  w:"+50% then −50% is **not** 0%: 100 → 150 → 75, a 25% loss.",
  ex:[["A price goes up 10%, then down 10%. Total change?",["Multipliers: `1.1 × 0.9 = 0.99`","0.99 means you keep 99%"],"1% decrease"],
      ["What is 40% of 25% of 800?",["25% of 800: `0.25 × 800 = 200`","40% of 200: `0.4 × 200 = 80` // percent of a percent: just multiply"],"80"]]});

CB("pct","l5",{t:"Reverse percent",
  f:["\\t{original} × \\t{multiplier} = \\t{new} ⟹ \\t{original} = \\f{\\t{new}}{\\t{multiplier}}"],
  h:["You know the **after** value; you want the **before**.","Turn the change into a multiplier, then **divide**.","Two changes? Multiply their multipliers first, then divide once."],
  pic:PIC.flow([["new","$352"],["÷ 0.88","(1.1 × 0.8)"],["original","$400"]],["",""]),
  tr:"Check by going forward: original × multiplier should give the new value.",
  w:"Subtracting the percent from the new value gives the wrong base. Divide by the multiplier instead.",
  ex:[["After a 12% increase a rent is $1,120. Original rent?",["Up 12% → multiplier 1.12","`1120 ÷ 1.12 = 1000`"],"$1,000"],
      ["Up 10% then down 20%, the final price is $352. Original?",["Combined multiplier: `1.1 × 0.8 = 0.88`","`352 ÷ 0.88 = 400`"],"$400"]]});

CB("pct","l6",{t:"Money: markup, profit & interest",
  f:["\\t{profit} = \\t{selling} − \\t{cost} || \\t{profit} \\% = \\f{\\t{profit}}{\\t{cost}} × 100\\%","A = P(1 + r)^{t}"],
  h:["**Markup** raises the cost to get the selling price: 40% markup → × 1.4.","**Profit %** is always measured against the **cost** (what you paid).","**Compound interest** earns interest on interest: each year multiply by (1 + r). `$1000` at 5% for 2 years → `1000 × 1.05^{2} = 1102.50`."],
  pic:PIC.bars2(["simple",1100,"$1100"],["compound",1102.5,"$1102.50"],{cap:"$1000 at 5% for 2 years: compounding earns a little extra."}),
  tr:"Simple interest: **add** the same amount each year. Compound: **multiply** by the same number each year.",
  w:"Profit percent divides by **cost**, not by selling price.",
  ex:[["A shop buys a lamp for $50 and sells it for $70. Profit percent?",["Profit: `70 − 50 = 20`","`\\f{20}{50} = 0.4`"],"40%"],
      ["$2,000 at 3% compounded yearly for 2 years. Final amount?",["Multiplier per year: 1.03","`2000 × 1.03^{2} = 2000 × 1.0609`"],"$2,121.80"]]});

CB("pct","l7",{t:"Percentage points & percent error",
  f:["\\t{percent error} = \\f{|\\t{estimate} − \\t{actual}|}{\\t{actual}} × 100\\%"],
  h:["**Percentage points** are a plain subtraction of two percents: 40% → 50% is up **10 points**.","But in **percent** terms it's up 25% (10 is 25% of 40).","**Percent error** compares how wrong a guess was with the true value."],
  pic:PIC.bars2(["before",40,"40%"],["after",50,"50%"],{mid:"+10 points = +25%"}),
  tr:"Points **subtract**. Percent change **divides**.",
  w:"Percent error divides by the **actual** value, never by the estimate.",
  ex:[["Approval rose from 40% to 50%. By how many points? By what percent?",["Points: `50 − 40 = 10`","Percent: `\\f{10}{40} = 0.25`"],"10 points, 25%"],
      ["A student estimates 45 cm; the true length is 50 cm. Percent error?",["Difference: `|45 − 50| = 5`","`\\f{5}{50} = 0.1`"],"10%"]]});

CB("pct","l8",{t:"Percent problem patterns",
  f:["\\t{part} = p × \\t{whole} || \\t{new} = \\t{old} × m || \\t{old} = \\f{\\t{new}}{m}"],fl:"The three tools",
  h:["Almost every SAT percent problem uses one of three tools: **part of a whole**, **forward change** (multiply), **backward change** (divide).","Read the question twice and ask: do I know the start or the end?","Use 100 as a pretend starting value whenever no number is given."],
  pic:PIC.flow([["know start?","multiply"],["know end?","divide"],["no numbers?","use 100"]],["",""],{bw:130,gap:30}),
  tr:"**Start known → ×. End known → ÷.**",
  w:"Check the answer is sensible: a discounted price must be **less** than the original.",
  ex:[["A population drops 20% then rises 20%. What percent of the original is it now?",["Start with 100","× 0.8 → 80, then × 1.2 → 96"],"96% (a 4% drop)"],
      ["A laptop costs $630 after 10% off. What was the discount in dollars?",["Original: `630 ÷ 0.9 = 700`","Discount: `700 − 630`"],"$70"]]});
