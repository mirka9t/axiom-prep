/* =====================================================================
   ZERO TO 800 — v4 generators & tips for new units
   ===================================================================== */
(function(){
var R=function(){return GEN.rnd()};
function ri(a,b){return a+Math.floor(R()*(b-a+1))}function nz(a,b){var v;do{v=ri(a,b)}while(v===0);return v}
function pk(a){return a[Math.floor(R()*a.length)]}
function f(n){return n<0?"−"+(-n):String(n)}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
function r2(x){return Math.round(x*100)/100}
function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}
function mc(q,right,wr,s){var o=[String(right)];wr.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});for(var i=o.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=o[i];o[i]=o[j];o[j]=t}return {t:"mc",q:q,c:o,a:o.indexOf(String(right)),s:s}}
function pf(n){var r={},v=n;for(var p=2;p*p<=v;p++)while(v%p===0){r[p]=(r[p]||0)+1;v/=p}if(v>1)r[v]=(r[v]||0)+1;return r}
function pfs(n){var r=pf(n);return Object.keys(r).map(function(p){return p+(r[p]>1?"^"+r[p]:"")}).join(" · ").replace(/\^2/g,"²").replace(/\^3/g,"³").replace(/\^4/g,"⁴").replace(/\^5/g,"⁵").replace(/\^6/g,"⁶")}
function poly(cs){var n=cs.length-1,out="";cs.forEach(function(c,i){var p=n-i;if(c===0)return;var ac=Math.abs(c),b=p===0?String(ac):((ac===1?"":ac)+"x"+(p===2?"²":p===3?"³":""));out+=out===""?(c<0?"−":"")+b:(c<0?" − ":" + ")+b});return out||"0"}
function sg(n){return n<0?"− "+(-n):"+ "+n}
var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}

/* ---------- gcf ---------- */
add("gcf","Divisibility rules",function(d){
  var dv=pk(d===1?[3,4,5,9]:[3,4,6,8,9,11]),k=ri(30,d===3?900:300),ok=dv*k,w=[];while(w.length<3){var x=ok+ri(1,dv-1)+dv*ri(-8,8);if(x>0&&x%dv&&w.indexOf(x)<0)w.push(x)}
  var rule={3:"digit sum divisible by 3",4:"last two digits divisible by 4",5:"last digit 0 or 5",6:"even AND digit sum divisible by 3",8:"last three digits divisible by 8",9:"digit sum divisible by 9",11:"alternating digit sum divisible by 11"}[dv];
  return mc("Which number is divisible by "+dv+"?",ok,w,"Rule for "+dv+": "+rule+". "+ok+" passes ("+ok+" ÷ "+dv+" = "+k+"); the others leave a remainder.")});
add("gcf","Prime factorization",function(d){
  var a=ri(1,d+2),b=ri(0,2),c=ri(0,d>1?2:1),n=Math.pow(2,a)*Math.pow(3,b)*Math.pow(5,c)*(d===3?pk([1,7]):1),ask=pk(["2","3"]);if(ask==="3"&&!b)ask="2";
  return nm("Write "+n+" as a product of primes. What is the exponent of "+ask+"?",ask==="2"?a:b,"Factor tree: "+n+" = "+pfs(n)+". The exponent of "+ask+" is "+(ask==="2"?a:b)+".")});
add("gcf","GCF (НОД) by primes",function(d){
  var g=pk([2,3,4,5,6,8,9,12,14,15]),x=ri(2,6+d),y=ri(2,7+d);while(gcd(x,y)!==1||x===y)y=ri(2,9+d);var a=g*x,b=g*y;
  return nm("Find the GCF (НОД) of "+a+" and "+b+".",g,a+" = "+pfs(a)+" and "+b+" = "+pfs(b)+". Take only the shared primes at the LOWER power: GCF = "+g+".")});
add("gcf","LCM (НОК) by primes",function(d){
  var g=pk([2,3,4,5,6]),x=ri(2,5+d),y=ri(2,6+d);while(gcd(x,y)!==1||x===y)y=ri(2,8+d);var a=g*x,b=g*y,l=g*x*y;
  return nm("Find the LCM (НОК) of "+a+" and "+b+".",l,a+" = "+pfs(a)+", "+b+" = "+pfs(b)+". Every prime at its HIGHER power: "+pfs(l)+" = "+l+". Check: "+a+" × "+b+" ÷ GCF "+g+" = "+l+".")});
add("gcf","GCF × LCM = a × b",function(d){
  var g=pk([2,3,4,5,6]),x=ri(2,7),y=ri(2,9);while(gcd(x,y)!==1||x===y)y=ri(2,9);var a=g*x,b=g*y,l=g*x*y;
  return nm("Two numbers have GCF "+g+" and LCM "+l+". One of them is "+a+". What is the other?",b,"For two numbers GCF × LCM = a × b: "+g+" × "+l+" = "+a+" × b → b = "+(g*l)+" ÷ "+a+" = "+b+".")});
add("gcf","GCF or LCM word problems",function(d){
  var g=pk([3,4,5,6,8,12]),x=ri(2,6),y=ri(3,8);while(gcd(x,y)!==1||x===y)y=ri(3,9);var a=g*x,b=g*y;
  if(R()<.5){var T=pk([["A teacher has "+a+" pencils and "+b+" erasers and makes identical kits with nothing left over. What is the greatest number of kits?"],["A garden "+a+" m by "+b+" m is divided into the largest possible equal squares. What is the side of each square (m)?"]])[0];
    return nm(T,g,"Equal groups, as large/many as possible, answer smaller than the numbers → GCF("+a+", "+b+") = "+g+".")}
  var T2=pk(["Bus A leaves every "+a+" minutes and bus B every "+b+" minutes. They leave together now. After how many minutes do they leave together again?","Two lights flash every "+a+" s and "+b+" s. They flash together now. Seconds until they flash together again?"]);
  return nm(T2,g*x*y,"Repeating events meeting again, answer bigger than the numbers → LCM("+a+", "+b+") = "+(g*x*y)+".")});

/* ---------- pct ---------- */
add("pct","Find the part",function(d){var p=pk(d===1?[10,20,25,50,75]:[12,15,35,45,62.5,140]),w=pk([40,80,120,160,240,320,400,560]);return nm("What is "+p+"% of "+w+"?",r2(p*w/100),"part = rate × whole = "+p/100+" × "+w+" = "+r2(p*w/100)+".")});
add("pct","Find the percent",function(d){var p=pk([5,12,15,20,24,35,40,60,75,125]),w=pk([20,40,60,80,120,200,250,400]);var pt=r2(p*w/100);return nm(pt+" is what percent of "+w+"?",p,"rate = part ÷ whole = "+pt+" ÷ "+w+" = "+p/100+" = "+p+"%.")});
add("pct","Find the whole",function(d){var p=pk([10,15,20,25,30,40,60,80]),w=pk([30,50,60,80,120,150,240]);var pt=r2(p*w/100);return nm(pt+" is "+p+"% of what number?",w,"whole = part ÷ rate = "+pt+" ÷ "+p/100+" = "+w+".")});
add("pct","Multipliers",function(d){var v=pk([40,60,80,120,250,400,1200]),p=pk([5,8,10,15,20,25,35,40]),up=R()<.5,m=up?1+p/100:1-p/100;return nm("A value of "+v+" "+(up?"increases":"decreases")+" by "+p+"%. What is the new value?",r2(v*m),"Multiplier = "+r2(m)+". "+v+" × "+r2(m)+" = "+r2(v*m)+".")});
add("pct","Successive changes",function(d){var a=pk([10,20,25,30,40,50]),b=pk([10,20,25,30,40,50]),ua=R()<.6,ub=R()<.4,m=(ua?1+a/100:1-a/100)*(ub?1+b/100:1-b/100),ch=Math.round((m-1)*10000)/100;
  return nm("A price "+(ua?"rises":"falls")+" "+a+"% and then "+(ub?"rises":"falls")+" "+b+"%. What is the overall percent change? (negative for a decrease)",ch,"Multiply the multipliers: "+r2(ua?1+a/100:1-a/100)+" × "+r2(ub?1+b/100:1-b/100)+" = "+Math.round(m*10000)/10000+" → "+(ch>=0?"+":"")+ch+"%. Never just add the percents.")});
add("pct","Reverse percent",function(d){var o=pk([40,60,80,120,150,200,250,400]),p=pk([10,20,25,30,40,50]),up=R()<.4,nw=r2(o*(up?1+p/100:1-p/100));return nm("After a "+p+"% "+(up?"increase":"discount")+" the price is $"+nw+". What was the original price?",o,"original = new ÷ multiplier = "+nw+" ÷ "+r2(up?1+p/100:1-p/100)+" = "+o+".")});
add("pct","Compound interest",function(d){var P=pk([500,1000,2000,5000]),r=pk([2,4,5,6,10]),t=pk([2,3]),v=r2(P*Math.pow(1+r/100,t));return nm("$"+P+" earns "+r+"% interest compounded yearly. Value after "+t+" years (nearest cent)?",v,"A = P(1 + r)ᵗ = "+P+" × "+(1+r/100)+"^"+t+" = "+v+".")});
add("pct","Profit & markup",function(d){var c=pk([20,40,50,60,80,120,200]),p=pk([10,15,20,25,30,40,50]);
  if(R()<.5)return nm("A store buys an item for $"+c+" and marks it up "+p+"%. What is the selling price?",r2(c*(1+p/100)),"Selling price = cost × (1 + markup) = "+c+" × "+(1+p/100)+" = "+r2(c*(1+p/100))+".");
  var sp=r2(c*(1+p/100));return nm("An item costs $"+c+" and sells for $"+sp+". What is the profit percent?",p,"Profit = "+r2(sp-c)+". Profit % = profit ÷ COST = "+r2(sp-c)+" ÷ "+c+" = "+p+"%.")});
add("pct","Percentage points",function(d){var a=pk([2,4,5,8,10,20]),b=a+pk([1,2,3,4,5]),pp=b-a,pc=Math.round((b-a)/a*1000)/10;
  return mc("A rate rises from "+a+"% to "+b+"%. Which statement is correct?","It rose "+pp+" percentage points ("+pc+"%)",["It rose "+pp+"%","It rose "+pc+" percentage points","It rose "+(b)+"%"],"Percentage points = plain difference "+b+" − "+a+" = "+pp+". Percent increase = "+pp+" ÷ "+a+" = "+pc+"%.")});

/* ---------- poly ---------- */
add("poly","Combining like terms",function(d){var a=nz(-9,9),b=nz(-9,9),c=nz(-9,9),e=nz(-9,9);return nm("Simplify "+a+"x² "+sg(b)+"x "+sg(c)+"x² "+sg(e)+"x. What is the coefficient of x?",b+e,"Combine like terms: x² terms "+f(a)+" + "+f(c)+" = "+f(a+c)+"; x terms "+f(b)+" + "+f(e)+" = "+f(b+e)+".").q?nm("Simplify "+poly([a,b])+" "+sg(c)+"x "+sg(e)+". What is the coefficient of x?",a+c,"x terms: "+f(a)+" + "+f(c)+" = "+f(a+c)+". Constants combine separately: "+f(b)+" + "+f(e)+" = "+f(b+e)+"."):null});
add("poly","Multiplying binomials",function(d){var a=d>1?ri(2,4):1,p=nz(-8,8),c=d>2?ri(2,3):1,q=nz(-8,8),askb=R()<.6;
  var A=a*c,B=a*q+p*c,Cc=p*q;return nm("Expand ("+(a>1?a:"")+"x "+sg(p)+")("+(c>1?c:"")+"x "+sg(q)+") = "+A+"x² + bx + c. Enter "+(askb?"b":"c")+".",askb?B:Cc,"Area model: "+A+"x², "+f(a*q)+"x, "+f(p*c)+"x, "+f(Cc)+". Middle terms combine to "+f(B)+"x; constant "+f(Cc)+".")});
add("poly","Special products",function(d){var a=ri(1,5),b=ri(1,9),pl=R()<.5;
  if(R()<.6)return nm("("+(a>1?a:"")+"x "+(pl?"+ ":"− ")+b+")² = "+a*a+"x² + kx + "+b*b+". Enter k.",(pl?1:-1)*2*a*b,"(a ± b)² = a² ± 2ab + b²: middle term = ±2·"+a+"x·"+b+" = "+f((pl?1:-1)*2*a*b)+"x. Never forget it!");
  var n=pk([20,30,40,50,60,100]),k=ri(1,4);return nm("Compute "+(n+k)+" × "+(n-k)+" using a difference of squares.",n*n-k*k,"("+n+" + "+k+")("+n+" − "+k+") = "+n+"² − "+k+"² = "+n*n+" − "+k*k+" = "+(n*n-k*k)+".")});
add("poly","Factoring out the GCF",function(d){var g=ri(2,9),a=ri(1,6),b=nz(-9,9);while(gcd(a,b)!==1)b=nz(-9,9);
  return nm("Factor "+poly([g*a,g*b,0])+" = "+g+"x("+(a>1?a:"")+"x + k). Enter k.",b,"GCF of the terms is "+g+"x. Divide each term: "+(g*a)+"x² ÷ "+g+"x = "+(a>1?a:"")+"x and "+f(g*b)+"x ÷ "+g+"x = "+f(b)+".")});
add("poly","Factoring trinomials",function(d){var p=nz(-9,9),q=nz(-9,9);while(p===q)q=nz(-9,9);var big=Math.max(p,q);
  return nm("Factor "+poly([1,p+q,p*q])+" = (x + p)(x + q). Enter the larger of p and q.",big,"Need two numbers that multiply to "+f(p*q)+" and add to "+f(p+q)+": "+f(p)+" and "+f(q)+". So (x "+sg(p)+")(x "+sg(q)+").")});
add("poly","AC method",function(d){var a=ri(2,5),p=nz(-7,7),q=nz(-6,6);while(gcd(a,p)!==1)p=nz(-7,7);var B=a*q+p,C=p*q;
  return nm("Factor "+poly([a,B,C])+" = ("+a+"x + p)(x + q). Enter p.",p,"a·c = "+a+"·("+f(C)+") = "+f(a*C)+". Two numbers with product "+f(a*C)+" and sum "+f(B)+": "+f(a*q)+" and "+f(p)+". Split and group → ("+a+"x "+sg(p)+")(x "+sg(q)+").")});
add("poly","Simplifying algebraic fractions",function(d){var r=nz(-8,8),s=nz(-8,8);while(s===r)s=nz(-8,8);
  return nm("Simplify ("+poly([1,-(r+s),r*s])+")/(x "+sg(-r)+") to x + k. Enter k.",-s,"Factor the top: (x "+sg(-r)+")(x "+sg(-s)+"). Cancel the common FACTOR (x "+sg(-r)+") → x "+sg(-s)+".")});
add("poly","Polynomial remainders",function(d){var a=nz(-3,3),b=nz(-6,6),c=nz(-9,9),k=nz(-4,4);
  return nm("What is the remainder when "+poly([a,b,c])+" is divided by (x "+sg(-k)+")?",a*k*k+b*k+c,"Remainder theorem: plug in x = "+f(k)+": "+f(a)+"("+k*k+") + "+f(b)+"("+f(k)+") "+sg(c)+" = "+f(a*k*k+b*k+c)+".")});

/* ---------- geo0 ---------- */
add("geo0","Angle types",function(d){var x=pk([ri(5,85),90,ri(95,175),180]),ans=x<90?"acute":x===90?"right":x<180?"obtuse":"straight";
  return mc("An angle measures "+x+"°. What type is it?",ans,["acute","right","obtuse","straight"],ans+": "+(x<90?"less than 90°":x===90?"exactly 90°":x<180?"between 90° and 180°":"exactly 180°")+".")});
add("geo0","Complements & supplements",function(d){var x=ri(12,85),sup=R()<.5;return nm("What is the "+(sup?"supplement":"complement")+" of "+x+"°?",sup?180-x:90-x,(sup?"Supplementary angles add to 180°: 180 − ":"Complementary angles add to 90°: 90 − ")+x+" = "+(sup?180-x:90-x)+"°.")});
add("geo0","Angle algebra",function(d){
  if(R()<.35){var sm=pk([3,4,5,6]),a1=ri(1,sm-1),b1=sm-a1;return nm("Around a point the angles are "+(a1>1?a1:"")+"x°, "+(b1>1?b1:"")+"x°, 120° and 60°. Find x.",180/sm,"All angles around a point add to 360°: "+sm+"x + 180 = 360 → x = "+(180/sm)+".")}
  var x=ri(10,25),a=ri(2,3),b=ri(1,3),c=ri(-10,20),e=180-(a*x+c)-(b*x);
  return nm("Two angles on a straight line measure ("+a+"x "+sg(c)+")° and ("+b+"x "+sg(e)+")°. Find x.",x,"Angles on a line add to 180°: "+(a+b)+"x "+sg(c+e)+" = 180 → "+(a+b)+"x = "+(180-c-e)+" → x = "+x+".")});
add("geo0","Exterior angles",function(d){var a=ri(25,80),b=ri(25,80);return nm("Two interior angles of a triangle are "+a+"° and "+b+"°. What is the exterior angle at the third vertex?",a+b,"Exterior angle = sum of the two far interior angles = "+a+" + "+b+" = "+(a+b)+"°.")});
add("geo0","Quadrilateral angles",function(d){var a=ri(60,120),b=ri(60,120),c=ri(60,120),x=360-a-b-c;if(x<20||x>170)return GEN._S.geo0[3][1](d);return nm("Three angles of a quadrilateral are "+a+"°, "+b+"° and "+c+"°. Find the fourth.",x,"Quadrilateral angles add to 360°: 360 − "+(a+b+c)+" = "+x+"°.")});
add("geo0","Area of flat shapes",function(d){var t=pk(["par","trap","tri","rect"]),b=ri(4,15),h=ri(3,12),b2=ri(3,b);
  if(t==="par")return nm("A parallelogram has base "+b+" and height "+h+". Area?",b*h,"A = base × height = "+b*h+".");
  if(t==="tri")return nm("A triangle has base "+b+" and height "+h+". Area?",r2(b*h/2),"A = ½ × "+b+" × "+h+" = "+r2(b*h/2)+".");
  if(t==="rect"){var P=2*(b+h);return nm("A rectangle has perimeter "+P+" and length "+b+". What is its area?",b*h,"2(l + w) = "+P+" → w = "+h+". A = "+b+" × "+h+" = "+b*h+".")}
  return nm("A trapezoid has parallel sides "+b+" and "+b2+" and height "+h+". Area?",r2((b+b2)*h/2),"A = ½(b₁ + b₂)h = ½("+(b+b2)+")("+h+") = "+r2((b+b2)*h/2)+".")});
add("geo0","Shaded regions",function(d){var r=ri(2,9),s=2*r;return nm("A circle of radius "+r+" fits exactly inside a square. The shaded area between them is "+s*s+" − kπ. Enter k.",r*r,"Square side = diameter = "+s+", area "+s*s+". Circle area = π·"+r+"² = "+r*r+"π. Shaded = "+s*s+" − "+r*r+"π.")});
add("geo0","Pyramids & cones",function(d){if(R()<.5){var r=ri(2,6),h=3*ri(1,4);return nm("A cone has radius "+r+" and height "+h+". Its volume is kπ. Enter k.",r*r*h/3,"V = ⅓πr²h = ⅓·π·"+r*r+"·"+h+" = "+(r*r*h/3)+"π.")}
  var s=ri(2,9),h2=3*ri(1,5);return nm("A square pyramid has base side "+s+" and height "+h2+". Volume?",s*s*h2/3,"V = ⅓ × base area × h = ⅓ × "+s*s+" × "+h2+" = "+(s*s*h2/3)+".")});
add("geo0","Triangles on the grid",function(d){var b=ri(4,12),x=ri(0,b),h=ri(3,10);return nm("Find the area of the triangle with vertices (0, 0), ("+b+", 0) and ("+x+", "+h+").",r2(b*h/2),"Base on the x-axis = "+b+"; height = the y-coordinate of the top vertex = "+h+". Area = ½·"+b+"·"+h+" = "+r2(b*h/2)+".")});

/* ---------- extra skills in existing units ---------- */
add("func","Sequences",function(d){if(R()<.5){var a=nz(-10,20),dd=nz(-6,9),n=ri(8,30);return nm("Arithmetic sequence: "+[a,a+dd,a+2*dd].map(f).join(", ")+", … What is term number "+n+"?",a+(n-1)*dd,"aₙ = a₁ + (n − 1)d = "+f(a)+" + "+(n-1)+"·"+f(dd)+" = "+f(a+(n-1)*dd)+".")}
  var a1=ri(1,5),r=pk([2,3,-2]),n2=ri(4,7),v=a1*Math.pow(r,n2-1);return nm("Geometric sequence: "+[a1,a1*r,a1*r*r].map(f).join(", ")+", … What is term number "+n2+"?",v,"aₙ = a₁·rⁿ⁻¹ = "+a1+"·("+f(r)+")^"+(n2-1)+" = "+f(v)+".")});
add("data","Weighted averages",function(d){var n1=ri(5,30),n2=ri(5,30),m1=ri(60,95),m2=ri(55,95),v=r2((n1*m1+n2*m2)/(n1+n2));return nm("Group A: "+n1+" people, average "+m1+". Group B: "+n2+" people, average "+m2+". Combined average (to 2 decimals)?",v,"Weight by size: ("+n1+"·"+m1+" + "+n2+"·"+m2+") ÷ "+(n1+n2)+" = "+(n1*m1+n2*m2)+" ÷ "+(n1+n2)+" = "+v+".")});
})();

/* fix the first poly generator (cleaner version) */
GEN._S.poly[0]=["Combining like terms",function(d){var R=GEN.rnd,a=Math.floor(R()*15)-7||2,b=Math.floor(R()*15)-7||3,c=Math.floor(R()*15)-7||-4,e=Math.floor(R()*15)-7||5;
  function s(n){return n<0?"− "+(-n):"+ "+n}function f(n){return n<0?"−"+(-n):String(n)}
  function tx(n,v,first){var m=Math.abs(n)===1?"":Math.abs(n);return (first?(n<0?"−":""):(n<0?" − ":" + "))+m+v}
  return {t:"num",q:"Simplify "+tx(a,"x²",1)+tx(b,"x")+tx(c,"x²")+tx(e,"x")+". What is the coefficient of x?",a:String(b+e),s:"Like terms have the same power. x² terms: "+f(a)+" + "+f(c)+" = "+f(a+c)+". x terms: "+f(b)+" + "+f(e)+" = "+f(b+e)+"."}}];

/* ---------- method tips for the new skills ---------- */
T("Divisibility rules","gcf","l1","2: even · 3: digit sum · 4: last 2 digits · 5: ends 0/5 · 6: 2 and 3 · 8: last 3 digits · 9: digit sum · 11: alternating sum",["Pick the rule for the divisor.","Apply it to each choice — look only at the digits the rule mentions.","For 6, check BOTH the 2-rule and the 3-rule."],"Using only one test for 6, or testing the last digit for 4 instead of the last two.",["divisible"]);
T("Prime factorization","gcf","l2","every number = product of primes (one way only)",["Split the number into any two factors.","Keep splitting until every branch ends in a prime.","Collect repeated primes as powers: 2·2·2 = 2³."],"Stopping at a composite number like 9 or 15 instead of splitting it further.",["prime","factorization"]);
T("GCF (НОД) by primes","gcf","l3","GCF = shared primes, LOWEST powers",["Factor both numbers into primes.","Keep only the primes that appear in BOTH.","Use the smaller power of each and multiply."],"Including primes that appear in only one number (that's the LCM).",["gcf","нод","greatest common"]);
T("LCM (НОК) by primes","gcf","l4","LCM = all primes, HIGHEST powers   ·   LCM = a·b ÷ GCF",["Factor both numbers into primes.","Take every prime that appears in either number.","Use the larger power of each and multiply."],"Just multiplying the two numbers — that's a common multiple but usually not the least.",["lcm","нок","least common"]);
T("GCF × LCM = a × b","gcf","l5","GCF(a,b) × LCM(a,b) = a × b",["Multiply the GCF and LCM.","Divide by the number you know.","Check that the GCF divides your answer."],"Using the rule with three numbers — it only works for two.",["gcf","lcm"]);
T("GCF or LCM word problems","gcf","l6","equal groups → GCF (smaller) · together again → LCM (bigger)",["Ask: should the answer be smaller or bigger than the given numbers?","Smaller and ‘split into equal groups’ → GCF.","Bigger and ‘happen together again’ → LCM."],"Choosing by keywords alone without the smaller/bigger check.",["together","identical","largest","every"]);
T("Find the part","pct","l2","part = rate × whole",["Change the percent to a decimal.","Multiply by the whole (“of” means ×).","Check size: 50% should be half."],"Multiplying by the percent number instead of the decimal.",["% of"]);
T("Find the percent","pct","l2","rate = part ÷ whole",["Identify the whole (after “of”).","Divide part by whole.","Multiply by 100 for a percent."],"Dividing the whole by the part.",["what percent"]);
T("Find the whole","pct","l2","whole = part ÷ rate",["Write part = rate × whole.","Divide the part by the rate (as a decimal)."],"Multiplying instead of dividing.",["of what"]);
T("Multipliers","pct","l3","increase p% → × (1 + p/100) · decrease → × (1 − p/100)",["Build the multiplier.","Multiply once — no separate add/subtract step."],"Using 0.15 for a 15% decrease instead of 0.85.",["increases","decreases"]);
T("Successive changes","pct","l4","overall multiplier = m₁ × m₂ × …",["Write each change as a multiplier.","Multiply them.","Overall % change = (product − 1) × 100."],"Adding the percents (+20% then −20% is NOT 0%).",["then"]);
T("Reverse percent","pct","l5","original = new ÷ multiplier",["Identify the multiplier used.","Divide the new value by it."],"Adding the percent back to the new value.",["original"]);
T("Compound interest","pct","l6","A = P(1 + r)ᵗ",["Multiplier 1 + r.","Raise to the number of years.","Multiply by P; round at the end."],"Using simple interest P(1 + rt).",["compounded"]);
T("Profit & markup","pct","l6","profit % = profit ÷ COST · selling = cost × (1 + markup)",["Find profit = selling − cost.","Divide by the COST, not the selling price."],"Dividing by the selling price.",["profit","markup"]);
T("Percentage points","pct","l7","points = b − a · percent change = (b − a) ÷ a",["Subtract the percents for the change in points.","Divide that by the starting percent for the % change."],"Calling a change from 4% to 5% a 1% increase.",["percentage point"]);
T("Combining like terms","poly","l1","only identical variable parts combine",["Group terms with the same letters and powers.","Add their coefficients.","Keep the variable part unchanged."],"Adding powers: x² + x² is 2x², not x⁴.",["simplify","coefficient"]);
T("Multiplying binomials","poly","l2","(a + b)(c + d) = ac + ad + bc + bd",["Draw a 2 × 2 area model or use FOIL.","Multiply every pair.","Combine the two middle terms."],"Skipping the outer or inner product.",["expand"]);
T("Special products","poly","l3","(a ± b)² = a² ± 2ab + b² · (a + b)(a − b) = a² − b²",["Recognise the pattern.","Apply it directly — no FOIL needed."],"(x + 5)² = x² + 25 — the middle term is missing.",["²","×"]);
T("Factoring out the GCF","poly","l4","ab + ac = a(b + c)",["Find the GCF of the numbers and the lowest power of each letter.","Divide every term by it.","Multiply back to check."],"Taking out less than the greatest factor.",["factor"]);
T("Factoring trinomials","poly","l5","x² + bx + c = (x + p)(x + q), pq = c, p + q = b",["Look at the signs of b and c to fix the signs of p and q.","List factor pairs of c.","Pick the pair that adds to b."],"Getting the product right but the sum's sign wrong.",["factor"]);
T("AC method","poly","l6","ax² + bx + c: find m·n = ac, m + n = b, split, group",["Multiply a × c.","Find two numbers with that product and sum b.","Split the middle term and factor by grouping."],"Looking for numbers that multiply to c instead of a·c.",["factor"]);
T("Simplifying algebraic fractions","poly","l7","factor, then cancel common FACTORS",["Factor the numerator and denominator completely.","Cancel identical factors.","Note values that make the original denominator 0."],"Cancelling terms in a sum like (x + 6)/6.",["simplify"]);
T("Polynomial remainders","poly","l8","remainder of p(x) ÷ (x − a) = p(a)",["Find a from the divisor (sign flips: x + 3 → a = −3).","Substitute a into the polynomial."],"Substituting +3 for a divisor of (x + 3).",["remainder"]);
T("Angle types","geo0","l1","acute < 90° · right = 90° · obtuse 90°–180° · straight = 180°",["Compare the angle with 90° and 180°."],"Calling 90° acute or 180° obtuse.",["type"]);
T("Complements & supplements","geo0","l2","complementary → 90° · supplementary → 180°",["Pick the total (90 or 180).","Subtract the given angle."],"Mixing up which total goes with which word.",["complement","supplement"]);
T("Angle algebra","geo0","l2","line 180° · point 360° · vertical angles equal",["Decide which rule links the angles.","Write the equation and solve for x.","Plug x back to get each angle if asked."],"Setting angles on a line equal instead of adding them to 180.",["straight line","around a point"]);
T("Exterior angles","geo0","l3","exterior = sum of the two far interior angles",["Add the two interior angles that are NOT next to the exterior angle."],"Using 180 − (sum) — that's the third interior angle.",["exterior"]);
T("Quadrilateral angles","geo0","l4","angles add to 360°",["Add the known angles.","Subtract from 360."],"Subtracting from 180.",["quadrilateral"]);
T("Area of flat shapes","geo0","l5","rectangle lw · triangle ½bh · parallelogram bh · trapezoid ½(b₁ + b₂)h",["Identify the shape.","Use the perpendicular height.","Plug into the formula."],"Using a slanted side as the height.",["area"]);
T("Shaded regions","geo0","l5","shaded = big area − small area",["Find the big shape's area.","Find the small shape's area.","Subtract."],"Using the diameter as the radius.",["shaded"]);
T("Pyramids & cones","geo0","l6","V = ⅓ × base area × height",["Find the base area (s² or πr²).","Multiply by height, then divide by 3."],"Forgetting the ⅓.",["cone","pyramid"]);
T("Triangles on the grid","geo0","l7","area = ½ × base × height (use the axis as the base)",["Find a side on an axis or a horizontal line — that's the base.","Height = vertical distance from the third vertex."],"Using the slanted side as the height.",["vertices"]);
T("Sequences","func","l7","arithmetic aₙ = a₁ + (n − 1)d · geometric aₙ = a₁·rⁿ⁻¹",["Find the difference (or ratio).","Use (n − 1), not n.","Compute carefully."],"Using n instead of n − 1.",["sequence","term"]);
T("Weighted averages","data","l8","combined mean = (n₁m₁ + n₂m₂) ÷ (n₁ + n₂)",["Turn each average into a total (n × m).","Add totals, divide by total count."],"Averaging the two averages directly.",["combined","average"]);

/* ---------- register units, icons, domains ---------- */
ICONS.venn="M14 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z M20 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0z";
ICONS.percent="M19 5 5 19 M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z";
ICONS.areabox="M4 4h16v16H4z M4 11h16 M11 4v16";
ICONS.shapes="M4 20h7v-7H4z M17.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z M13 20l4.5-7 4.5 7z";
ICONS.music="M9 18V5l12-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z";
ICONS.crownf="M3 18h18 M3 18 2 7l6 4 4-7 4 7 6-4-1 11";
UICON.gcf="venn";UICON.pct="percent";UICON.poly="areabox";UICON.geo0="shapes";
(function(){function ins(dom,id,after){var D=DOMAINS.filter(function(x){return x.id===dom})[0];if(!D||D.units.indexOf(id)>-1)return;var i=after?D.units.indexOf(after):-1;D.units.splice(i+1,0,id)}
  ins("psda","gcf","nums");ins("psda","pct","frac");ins("adv","poly",null);ins("geo","geo0",null);
  UNITS.forEach(function(u){u.cards.forEach(function(c,i){if(!c.k){c.k=u.id+"#"+i;c.uid=u.id}});u.prac.forEach(function(it){it.uid=it.uid||u.id});u.quiz.forEach(function(it){it.uid=it.uid||u.id})});
  QB=null;QBI={};LPC={};})();
