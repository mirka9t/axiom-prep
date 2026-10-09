/* =====================================================================
   ZERO TO 800 — QUESTION GENERATORS
   Every call makes a brand-new question with new numbers and a
   step-by-step explanation. Difficulty d = 1 (easy) .. 3 (hard).
   ===================================================================== */
var GEN=(function(){
var rng=Math.random;
function seed(s){var a=s>>>0;rng=function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function unseed(){rng=Math.random}
function ri(a,b){return a+Math.floor(rng()*(b-a+1))}
function nz(a,b){var v;do{v=ri(a,b)}while(v===0);return v}
function pick(a){return a[Math.floor(rng()*a.length)]}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(rng()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
function lcm(a,b){return a/gcd(a,b)*b}
function fr(n,d){if(d<0){n=-n;d=-d}var g=gcd(n,d);n/=g;d/=g;return d===1?String(n):n+"/"+d}
function frD(n,d){var f=fr(n,d);return f.replace("-","−")}
function f(n){return n<0?"−"+(-n):String(n)}
function r2(x){return Math.round(x*100)/100}
function poly(cs,v){v=v||"x";var n=cs.length-1,out="";
  cs.forEach(function(c,i){var p=n-i;if(c===0)return;var ac=Math.abs(c);
    var body=p===0?String(ac):((ac===1?"":ac)+v+(p===1?"":p===2?"²":p===3?"³":"^"+p));
    out+=out===""?(c<0?"−":"")+body:(c<0?" − ":" + ")+body});
  return out||"0"}
function mc(q,right,wrongs,s){var o=[String(right)];wrongs.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});shuffle(o);return {t:"mc",q:q,c:o,a:o.indexOf(String(right)),s:s}}
function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}

var S={};   /* skill registry: S[unit] = [ [name, fn], ... ] */
function add(u,name,fn){(S[u]=S[u]||[]).push([name,fn])}

/* ================= nums ================= */
add("nums","Order of operations",function(d){
  if(d===1){var a=ri(2,20),b=ri(2,9),c=ri(2,9);return nm("Compute: "+a+" + "+b+" × "+c,a+b*c,"Multiply first: "+b+" × "+c+" = "+b*c+". Then "+a+" + "+b*c+" = "+(a+b*c)+".")}
  if(d===2){var b2=ri(2,6),a2=b2+ri(2,8),c2=ri(2,6),e=ri(2,5),dd=e*ri(2,6),v=(a2-b2)*c2+dd/e;return nm("Compute: ("+a2+" − "+b2+") × "+c2+" + "+dd+" ÷ "+e,v,"Brackets: "+(a2-b2)+". Then "+(a2-b2)+" × "+c2+" = "+(a2-b2)*c2+" and "+dd+" ÷ "+e+" = "+dd/e+". Add: "+v+".")}
  var a3=ri(20,60),b3=ri(2,4),c3=ri(2,3),d3=ri(1,9),v3=a3-b3*b3*c3+d3;return nm("Compute: "+a3+" − "+b3+"² × "+c3+" + "+d3,v3,"Exponent: "+b3+"² = "+b3*b3+". Multiply: "+b3*b3+" × "+c3+" = "+b3*b3*c3+". Then left to right: "+a3+" − "+b3*b3*c3+" + "+d3+" = "+v3+".")});
add("nums","Negative numbers",function(d){
  var a=nz(-12,12),b=ri(2,12),c=ri(2,12);
  if(d<3){var v=a-(-b)+(-c);return nm("Compute: "+f(a)+" − ("+f(-b)+") + ("+f(-c)+")",v,"Minus a negative is plus: "+f(a)+" + "+b+" − "+c+" = "+f(v)+".")}
  var x=nz(-6,6),y=nz(-6,6),z=nz(-4,4),p=x*y*z,neg=(x<0)+(y<0)+(z<0);return nm("Compute: ("+f(x)+")("+f(y)+")("+f(z)+")",p,neg+" negative sign"+(neg===1?"":"s")+" → "+(neg%2?"odd → negative":"even → positive")+". Size: "+Math.abs(x*y*z)+". Answer "+f(p)+".")});
add("nums","GCF & LCM",function(d){
  var g=pick([2,3,4,5,6]),a=g*ri(2,d+4),b=g*ri(2,d+5);while(b===a)b=g*ri(2,d+6);
  if(ri(0,1))return nm("What is the greatest common factor of "+a+" and "+b+"?",gcd(a,b),"The biggest number dividing both "+a+" and "+b+" is "+gcd(a,b)+".");
  return nm("What is the least common multiple of "+a+" and "+b+"?",lcm(a,b),"LCM = "+a+" × "+b+" ÷ GCF("+gcd(a,b)+") = "+lcm(a,b)+".")});
add("nums","Remainders",function(d){
  var dv=ri(3,9),q=ri(4,20*d),r=ri(1,dv-1),n=dv*q+r;
  if(d<3)return nm("What is the remainder when "+n+" is divided by "+dv+"?",r,dv+" × "+q+" = "+dv*q+", and "+n+" − "+dv*q+" = "+r+".");
  var k=ri(2,4),ans=(k*r)%dv;return nm("When n is divided by "+dv+" the remainder is "+r+". What is the remainder when "+k+"n is divided by "+dv+"?",ans,"Pick n = "+(dv+r)+". Then "+k+"n = "+k*(dv+r)+", which leaves remainder "+ans+" when divided by "+dv+".")});

/* ================= frac ================= */
add("frac","Adding fractions",function(d){
  var b=ri(2,6+d*2),dd=ri(2,6+d*2);while(dd===b)dd=ri(2,9);var a=ri(1,b-1),c=ri(1,dd-1),sub=d>1&&ri(0,1);
  var n=sub?a*dd-c*b:a*dd+c*b,den=b*dd;
  return nm("Compute "+a+"/"+b+(sub?" − ":" + ")+c+"/"+dd+" (as a fraction).",fr(n,den),"Common denominator "+den+": "+a*dd+"/"+den+(sub?" − ":" + ")+c*b+"/"+den+" = "+frD(n,den)+".")});
add("frac","Percent of a number",function(d){
  var p=pick(d===1?[10,20,25,50,75]:[5,12,15,35,40,60,85]),n=pick([20,40,60,80,120,160,200,240,300,360,400]);
  return nm("What is "+p+"% of "+n+"?",r2(p*n/100),p+"% = "+p/100+". "+p/100+" × "+n+" = "+r2(p*n/100)+".")});
add("frac","Percent change",function(d){
  var o=pick([20,25,40,50,80,120,200,250,400]),p=pick([5,10,15,20,25,30,40,50,60,75]),up=ri(0,1),nw=o*(up?1+p/100:1-p/100);
  return nm("A value changes from "+o+" to "+r2(nw)+". By what percent did it "+(up?"increase":"decrease")+"?",p,"Change = "+r2(Math.abs(nw-o))+". Divide by the ORIGINAL: "+r2(Math.abs(nw-o))+" ÷ "+o+" = "+p/100+" = "+p+"%.")});
add("frac","Discount & tax chains",function(d){
  var pr=pick([40,60,80,120,150,200,250]),ds=pick([10,20,25,30,40]),tx=pick([5,8,10]),v=r2(pr*(1-ds/100)*(1+tx/100));
  return nm("A $"+pr+" item is "+ds+"% off, then "+tx+"% tax is added. Final price in dollars (nearest cent)?",v,"Chain the multipliers: "+pr+" × "+(1-ds/100)+" × "+(1+tx/100)+" = "+v+".")});
add("frac","Reverse percent",function(d){
  var o=pick([40,50,60,80,120,160,200,500]),p=pick([10,20,25,40,50]),up=d>1&&ri(0,1),nw=r2(o*(up?1+p/100:1-p/100));
  return nm((up?"After a "+p+"% increase":"After a "+p+"% discount")+", the price is $"+nw+". What was the original price?",o,"Original × "+(up?1+p/100:1-p/100)+" = "+nw+" → original = "+nw+" ÷ "+(up?1+p/100:1-p/100)+" = "+o+". (Don't just add the % back!)")});

/* ================= ratio ================= */
add("ratio","Splitting in a ratio",function(d){
  var a=ri(1,7),b=ri(1,7);while(a===b)b=ri(1,8);var k=ri(2,6*d),T=(a+b)*k;
  return nm("$"+T+" is shared in the ratio "+a+":"+b+". What is the larger share?",Math.max(a,b)*k,"Total parts "+(a+b)+"; one part = "+T+" ÷ "+(a+b)+" = "+k+". Larger share = "+Math.max(a,b)+" × "+k+" = "+Math.max(a,b)*k+".")});
add("ratio","Proportions",function(d){
  var a=ri(2,9),b=ri(2,12),k=ri(2,6),x=a*k,c=b*k;
  return nm("Solve for x: "+a+"/"+b+" = x/"+c,x,"Cross-multiply: "+b+"x = "+a+" × "+c+" = "+a*c+" → x = "+x+".")});
add("ratio","Rates & speed",function(d){
  var s=pick([30,40,45,50,60,72,80]),t=pick([1.5,2,2.5,3,4]);
  if(ri(0,1))return nm("A car travels "+s*t+" km in "+t+" hours. Average speed (km/h)?",s,"speed = distance ÷ time = "+s*t+" ÷ "+t+" = "+s+".");
  var a=pick([30,40,50,60]),b=pick([20,30,40,70]),T=pick([2,3,4]);
  return nm("Two cars "+(a+b)*T+" miles apart drive toward each other at "+a+" and "+b+" mph. How many hours until they meet?",T,"The gap closes at "+a+" + "+b+" = "+(a+b)+" mph. "+(a+b)*T+" ÷ "+(a+b)+" = "+T+".")});
add("ratio","Work together",function(d){
  var pr=pick([[3,6,2],[4,12,3],[6,12,4],[10,15,6],[12,24,8],[20,30,12],[6,3,2],[5,20,4]]);
  return nm("One machine does a job in "+pr[0]+" hours, another in "+pr[1]+" hours. Working together, how many hours?",pr[2],"Rates add: 1/"+pr[0]+" + 1/"+pr[1]+" = 1/"+pr[2]+" job per hour → "+pr[2]+" hours.")});

/* ================= alg ================= */
add("alg","Two-step equations",function(d){
  var x=nz(-9,12),a=nz(2,9)*(d>2&&ri(0,1)?-1:1),b=nz(-15,15),c=a*x+b;
  return nm("Solve: "+poly([a,b])+" = "+f(c),x,(b>0?"Subtract "+b:"Add "+(-b))+": "+f(a)+"x = "+f(c-b)+". Divide by "+f(a)+": x = "+f(x)+".")});
add("alg","Variables on both sides",function(d){
  var x=nz(-8,10),a=ri(3,9),c=ri(1,a-1),b=nz(-12,12),dd=a*x+b-c*x;
  return nm("Solve: "+poly([a,b])+" = "+poly([c,dd]),x,"Subtract "+c+"x: "+poly([a-c,b])+" = "+f(dd)+". Then "+(a-c)+"x = "+f(dd-b)+" → x = "+f(x)+".")});
add("alg","Distributing",function(d){
  var x=nz(-6,9),a=ri(2,6),b=nz(-7,7),c=a*(x+b);
  return nm("Solve: "+a+"("+poly([1,b])+") = "+f(c),x,"Divide both sides by "+a+": "+poly([1,b])+" = "+f(c/a)+". So x = "+f(x)+".")});
add("alg","Linear word models",function(d){
  var fee=pick([15,20,25,30,40,50]),rate=pick([3,4,5,8,12,15,20,25]),n=ri(3,15),T=fee+rate*n,thing=pick([["a gym","sign-up fee","per month","months"],["a repair shop","call-out fee","per hour","hours"],["a streaming box","setup fee","per week","weeks"]]);
  return nm(thing[0][0].toUpperCase()+thing[0].slice(1)+" charges a $"+fee+" "+thing[1]+" plus $"+rate+" "+thing[2]+". The bill is $"+T+". How many "+thing[3]+"?",n,fee+" + "+rate+"n = "+T+" → "+rate+"n = "+(T-fee)+" → n = "+n+".")});
add("alg","No solution constant",function(d){
  var a=ri(2,9),b=nz(-9,9),c=nz(-9,9);while(c===b)c=nz(-9,9);
  return nm("For what value of k does "+poly([a,b])+" = kx "+(c<0?"− "+(-c):"+ "+c)+" have no solution?",a,"The x-terms must match so they cancel (k = "+a+"), leaving "+f(b)+" = "+f(c)+", which is false → no solution.")});

/* ================= ineq ================= */
add("ineq","Solving inequalities",function(d){
  var a=nz(2,7)*(d>1&&ri(0,1)?-1:1),x=nz(-6,8),b=nz(-10,10),c=a*x+b,sym=pick(["<",">"]);
  var res=a<0?(sym==="<"?">":"<"):sym,opp=res==="<"?">":"<";
  return mc("Solve: "+poly([a,b])+" "+sym+" "+f(c),"x "+res+" "+f(x),["x "+opp+" "+f(x),"x "+res+" "+f(-x),"x "+opp+" "+f(-x)],"Move "+f(b)+": "+f(a)+"x "+sym+" "+f(c-b)+". Divide by "+f(a)+(a<0?" — negative, so FLIP the sign":"")+": x "+res+" "+f(x)+".")});
add("ineq","Absolute value",function(d){
  var a=nz(-6,8),r=ri(2,9),big=ri(0,1);
  return nm("Solve |x "+(a<0?"+ "+(-a):"− "+a)+"| = "+r+". Enter the "+(big?"larger":"smaller")+" solution.",big?a+r:a-r,"x is "+r+" away from "+f(a)+": x = "+f(a+r)+" or x = "+f(a-r)+".")});
add("ineq","Budget word problems",function(d){
  var p=pick([2.5,3.75,4.25,6,7.5,8.99,12]),B=pick([40,50,75,100,120]),n=Math.floor(B/p+1e-9);
  return nm("You have $"+B+". Each item costs $"+p+". What is the greatest number of items you can buy?",n,B+" ÷ "+p+" = "+r2(B/p)+". You can't buy part of an item, so round DOWN: "+n+".")});

/* ================= lines ================= */
add("lines","Slope from two points",function(d){
  var x1=ri(-5,5),y1=ri(-5,5),dx=nz(-4,4),m=pick(d===1?[1,2,3,-1,-2]:[2,3,-2,-3,0.5,-0.5]),x2=x1+dx*(m%1?2:1),y2=y1+m*(x2-x1);
  return nm("What is the slope of the line through ("+f(x1)+", "+f(y1)+") and ("+f(x2)+", "+f(y2)+")?",m,"(y₂ − y₁)/(x₂ − x₁) = ("+f(y2)+" − "+f(y1)+")/("+f(x2)+" − "+f(x1)+") = "+f(y2-y1)+"/"+f(x2-x1)+" = "+f(m)+".")});
add("lines","y-intercept from a point",function(d){
  var m=nz(-4,4),x=nz(-4,5),b=nz(-8,8),y=m*x+b;
  return nm("A line has slope "+f(m)+" and passes through ("+f(x)+", "+f(y)+"). What is its y-intercept?",b,f(y)+" = "+f(m)+"("+f(x)+") + b → "+f(y)+" = "+f(m*x)+" + b → b = "+f(b)+".")});
add("lines","Perpendicular slopes",function(d){
  var n=nz(-5,5),dd=ri(1,5);var m=fr(n,dd),p=fr(-dd,n);
  return mc("A line has slope "+m.replace("-","−")+". What is the slope of a line perpendicular to it?",p.replace("-","−"),[m.replace("-","−"),fr(dd,n).replace("-","−"),fr(-n,dd).replace("-","−"),"0"],"Perpendicular = negative reciprocal: flip "+m.replace("-","−")+" and change the sign → "+p.replace("-","−")+".")});
add("lines","Intercepts of Ax + By = C",function(d){
  var A=nz(1,6),B=nz(1,6),x0=nz(-6,8),C=A*x0;
  if(C%B!==0){B=A}C=A*x0;
  return nm("What is the x-intercept of "+poly([A,0]).replace("x","x")+" "+(B<0?"− "+(-B):"+ "+B)+"y = "+f(C)+"?",x0,"Set y = 0: "+A+"x = "+f(C)+" → x = "+f(x0)+".")});
add("lines","Distance & midpoint",function(d){
  var t=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17]]),x1=ri(-5,5),y1=ri(-5,5),sx=pick([1,-1]),sy=pick([1,-1]),x2=x1+sx*t[0],y2=y1+sy*t[1];
  if(ri(0,1))return nm("Distance between ("+f(x1)+", "+f(y1)+") and ("+f(x2)+", "+f(y2)+")?",t[2],"Across "+t[0]+", up/down "+t[1]+": √("+t[0]+"² + "+t[1]+"²) = "+t[2]+".");
  return nm("Midpoint of ("+f(x1)+", "+f(y1)+") and ("+f(x2)+", "+f(y2)+"): enter the x-coordinate.",(x1+x2)/2,"Average the x's: ("+f(x1)+" + "+f(x2)+")/2 = "+f((x1+x2)/2)+".")});

/* ================= sys ================= */
function sysMake(){var x=nz(-6,8),y=nz(-6,8),a=nz(1,5),b=nz(-5,5),c=nz(1,5),dd=nz(-5,5);while(a*dd-b*c===0){dd=nz(-5,5)}return {x:x,y:y,a:a,b:b,c:c,d:dd,e:a*x+b*y,g:c*x+dd*y}}
function sysStr(s){return poly([s.a,0])+" "+(s.b<0?"− ":"+ ")+(Math.abs(s.b)===1?"":Math.abs(s.b))+"y = "+f(s.e)+"  and  "+poly([s.c,0])+" "+(s.d<0?"− ":"+ ")+(Math.abs(s.d)===1?"":Math.abs(s.d))+"y = "+f(s.g)}
add("sys","Solving systems",function(d){
  var s=sysMake(),askX=ri(0,1);
  return nm("Solve the system "+sysStr(s)+". Enter "+(askX?"x":"y")+".",askX?s.x:s.y,"Eliminate one variable (or substitute). The solution is x = "+f(s.x)+", y = "+f(s.y)+". Check: "+s.a+"("+f(s.x)+") + "+f(s.b)+"("+f(s.y)+") = "+f(s.e)+" ✓.")});
add("sys","The x + y shortcut",function(d){
  var x=nz(-4,8),y=nz(-4,8),a=ri(2,7),b=ri(1,a-1);
  return nm(poly([a,0])+" + "+(b===1?"":b)+"y = "+(a*x+b*y)+" and "+(b===1?"":b)+"x + "+a+"y = "+(b*x+a*y)+". Find x + y.",x+y,"Add the equations: "+(a+b)+"x + "+(a+b)+"y = "+(a*x+b*y+b*x+a*y)+" → x + y = "+(x+y)+".")});
add("sys","Ticket & coin systems",function(d){
  var A=pick([8,10,12,15]),C=pick([4,5,6]),a=ri(5,30),c=ri(5,30),n=a+c,T=A*a+C*c;
  return nm("Adult tickets cost $"+A+" and child tickets $"+C+". "+n+" tickets brought in $"+T+". How many adult tickets were sold?",a,"a + c = "+n+" and "+A+"a + "+C+"c = "+T+". Substitute c = "+n+" − a: "+(A-C)+"a + "+C*n+" = "+T+" → a = "+a+".")});
add("sys","No-solution systems (find k)",function(d){
  var a=nz(1,5),b=nz(1,5),m=ri(2,4),c=nz(-9,9),k=a*m;
  return nm("For what k does kx + "+(b*m)+"y = "+(c*m+1)+" and "+poly([a,0])+" + "+(b===1?"":b)+"y = "+f(c)+" have no solution?",k,"The y-coefficients have ratio "+b*m+"/"+b+" = "+m+". For parallel lines the x-coefficients need the same ratio: k = "+a+" × "+m+" = "+k+". Constants: "+(c*m+1)+" ≠ "+m+" × "+f(c)+" ✓.")});

/* ================= exp ================= */
add("exp","Exponent rules",function(d){
  var a=ri(2,8),b=ri(2,8),c=ri(1,6),n=a+b-c;
  if(d>2){var p=ri(2,4);return nm("Simplify (x^"+a+" · x^"+b+")^"+p+" ÷ x^"+c+" to x^n. Enter n.",(a+b)*p-c,"Inside: x^"+(a+b)+". Power: x^"+(a+b)*p+". Divide: x^"+((a+b)*p-c)+".")}
  return nm("Simplify (x^"+a+" · x^"+b+") ÷ x^"+c+" to x^n. Enter n.",n,"Multiply → add: "+a+" + "+b+" = "+(a+b)+". Divide → subtract "+c+": n = "+n+".")});
add("exp","Fractional powers",function(d){
  var q=pick([["8","2/3",4],["27","2/3",9],["16","3/4",8],["32","2/5",4],["4","3/2",8],["9","3/2",27],["64","2/3",16],["81","3/4",27],["125","2/3",25],["16","1/2",4]]);
  return nm("Compute "+q[0]+"^("+q[1]+").",q[2],"The bottom of the fraction is the root, the top is the power: take the root of "+q[0]+" first, then raise it. Result: "+q[2]+".")});
add("exp","Same-base equations",function(d){
  var b=pick([2,3,5]),k=ri(-2,4),n=pick(b===2?[3,4,5,6,7]:[2,3,4]),x=n-k;
  return nm("Solve "+b+"^(x "+(k<0?"− "+(-k):"+ "+k)+") = "+Math.pow(b,n)+".",x,Math.pow(b,n)+" = "+b+"^"+n+", so x "+(k<0?"− "+(-k):"+ "+k)+" = "+n+" → x = "+x+".")});
add("exp","Radical equations",function(d){
  var r=ri(2,9),a=nz(-8,10),x=r*r-a,m=d>1?ri(2,4):1;
  return nm("Solve "+(m>1?m:"")+"√(x "+(a<0?"− "+(-a):"+ "+a)+")"+(m>1?" = "+m*r:" = "+r)+".",x,(m>1?"Divide by "+m+": √(…) = "+r+". ":"")+"Square both sides: x "+(a<0?"− "+(-a):"+ "+a)+" = "+r*r+" → x = "+x+". Check: √"+r*r+" = "+r+" ✓.")});

/* ================= quad ================= */
add("quad","Roots by factoring",function(d){
  var r=nz(-7,9),s=nz(-7,9);while(s===r)s=nz(-7,9);var big=ri(0,1);
  return nm("Solve "+poly([1,-(r+s),r*s])+" = 0. Enter the "+(big?"larger":"smaller")+" solution.",big?Math.max(r,s):Math.min(r,s),"Two numbers that multiply to "+f(r*s)+" and add to "+f(-(r+s))+": "+f(-r)+" and "+f(-s)+". So (x "+(r<0?"+ "+(-r):"− "+r)+")(x "+(s<0?"+ "+(-s):"− "+s)+") = 0 → x = "+f(r)+" or "+f(s)+".")});
add("quad","Vertex of a parabola",function(d){
  var a=pick(d===1?[1]:[1,2,-1,3,-2]),h=nz(-5,5),k=nz(-9,9),b=-2*a*h,c=a*h*h+k,askY=d>1&&ri(0,1);
  return nm((askY?"What is the y-coordinate of the vertex of ":"What is the x-coordinate of the vertex of ")+"y = "+poly([a,b,c])+"?",askY?k:h,"x = −b/(2a) = "+f(-b)+"/"+(2*a)+" = "+f(h)+"."+(askY?" Plug in: y = "+f(k)+".":""))});
add("quad","How many solutions (discriminant)",function(d){
  var a=pick([1,2,3]),b=nz(-8,8),kind=ri(0,2),c;
  if(kind===0){c=ri(-10,Math.floor(b*b/(4*a))-1)}else if(kind===1){if((b*b)%(4*a)!==0){b=2*a*nz(1,3)}c=b*b/(4*a)}else{c=Math.floor(b*b/(4*a))+ri(1,8)}
  var D=b*b-4*a*c,ans=D>0?"2 real solutions":D===0?"exactly 1 real solution":"no real solutions";
  return mc("How many real solutions does "+poly([a,b,c])+" = 0 have?",ans,["2 real solutions","exactly 1 real solution","no real solutions","infinitely many"],"Discriminant = b² − 4ac = "+b*b+" − "+4*a*c+" = "+D+". "+(D>0?"Positive → 2.":D===0?"Zero → 1.":"Negative → none."))});
add("quad","Sum & product of roots",function(d){
  var a=pick([1,2,3,4]),b=nz(-12,12),c=nz(-12,12),sum=ri(0,1);
  return nm("What is the "+(sum?"sum":"product")+" of the solutions of "+poly([a,b,c])+" = 0?",sum?fr(-b,a):fr(c,a),sum?"Sum = −b/a = "+frD(-b,a)+".":"Product = c/a = "+frD(c,a)+".")});
add("quad","Expanding",function(d){
  var p=nz(-7,7),q=nz(-7,7),a=d>1?ri(2,4):1;
  return nm("Expand ("+(a>1?a:"")+"x "+(p<0?"− "+(-p):"+ "+p)+")(x "+(q<0?"− "+(-q):"+ "+q)+") = "+(a>1?a:"")+"x² + bx + c. Enter b.",a*q+p,"Outer + inner: "+(a>1?a:"")+"x·"+f(q)+" + "+f(p)+"·x = "+f(a*q+p)+"x.")});

/* ================= func ================= */
add("func","Evaluating functions",function(d){
  var a=nz(-3,4),b=nz(-6,6),c=nz(-9,9),k=nz(-4,4);
  return nm("If f(x) = "+poly([a,b,c])+", what is f("+f(k)+")?",a*k*k+b*k+c,"Replace every x with ("+f(k)+"): "+f(a)+"("+k*k+") + "+f(b)+"("+f(k)+") + "+f(c)+" = "+f(a*k*k+b*k+c)+".")});
add("func","Composition",function(d){
  var a=nz(-4,4),b=nz(-6,6),c=nz(-4,4),e=nz(-6,6),k=nz(-3,4),g=c*k+e;
  return nm("f(x) = "+poly([a,b])+" and g(x) = "+poly([c,e])+". Find f(g("+f(k)+")).",a*g+b,"Inside first: g("+f(k)+") = "+f(g)+". Then f("+f(g)+") = "+f(a*g+b)+".")});
add("func","Transformations",function(d){
  var h=ri(1,6),k=ri(1,6),t=pick([["f(x) + "+k,"up "+k],["f(x) − "+k,"down "+k],["f(x − "+h+")","right "+h],["f(x + "+h+")","left "+h]]);
  var all=["up "+k,"down "+k,"right "+h,"left "+h];
  return mc("The graph of y = "+t[0]+" is the graph of y = f(x) moved:",t[1],all.filter(function(z){return z!==t[1]}),"Outside the brackets moves vertically (normal direction); inside moves horizontally (reversed). So: "+t[1]+".")});
add("func","Working backwards",function(d){
  var a=nz(-5,6),b=nz(-9,9),x=nz(-6,8);
  return nm("f(x) = "+poly([a,b])+". For what x is f(x) = "+f(a*x+b)+"?",x,poly([a,b])+" = "+f(a*x+b)+" → "+f(a)+"x = "+f(a*x+b-b)+" → x = "+f(x)+".")});

/* ================= advm ================= */
add("advm","Exponential growth",function(d){
  var P=pick([100,200,500,1000,2000]),r=pick([2,4,5,10,20]),t=pick([2,3]),v=r2(P*Math.pow(1+r/100,t));
  return nm("$"+P+" grows by "+r+"% each year. Value after "+t+" years (nearest cent)?",v,P+" × "+(1+r/100)+"^"+t+" = "+v+".")});
add("advm","Reading growth factors",function(d){
  var p=pick([3,5,8,12,15,20,25]),up=ri(0,1),b=up?r2(1+p/100):r2(1-p/100);
  return mc("f(t) = 400("+b+")^t. What happens each time period?",(up?"increases by ":"decreases by ")+p+"%",[(up?"decreases by ":"increases by ")+p+"%",(up?"increases by ":"decreases by ")+Math.round(b*100)+"%",(up?"increases by ":"decreases by ")+(100-p)+"%"],"b = "+b+(up?" = 1 + "+p/100+" → grows "+p+"%.":" = 1 − "+p/100+" → shrinks "+p+"%."))});
add("advm","Doubling & half-life",function(d){
  var a=pick([50,100,300,500]),k=pick([2,3,4,5]),m=ri(1,4),half=ri(0,1),v=half?a/Math.pow(2,m):a*Math.pow(2,m);
  return nm((half?"A substance has a half-life of "+k+" hours. Starting with "+a+" mg, how much remains after "+k*m+" hours?":"A population of "+a+" doubles every "+k+" years. What is it after "+k*m+" years?"),v,k*m+" ÷ "+k+" = "+m+(half?" halvings: ":" doublings: ")+a+(half?" ÷ ":" × ")+Math.pow(2,m)+" = "+v+".")});
add("advm","Complex numbers",function(d){
  var a=nz(-4,5),b=nz(-4,5),c=nz(-4,5),e=nz(-4,5),re=a*c-b*e,im=a*e+b*c;
  function cx(x,y){return f(x)+(y<0?" − ":" + ")+(Math.abs(y)===1?"":Math.abs(y))+"i"}
  return mc("Simplify ("+cx(a,b)+")("+cx(c,e)+"). (i² = −1)",cx(re,im),[cx(a*c+b*e,im),cx(re,a*e-b*c),cx(a*c,b*e)],"FOIL: "+a*c+" + "+a*e+"i + "+b*c+"i + "+b*e+"i². Replace i² with −1: "+cx(re,im)+".")});

/* ================= data ================= */
add("data","Mean",function(d){
  var n=ri(4,6+d),arr=[],m=ri(5,40);for(var i=0;i<n-1;i++)arr.push(m+ri(-8,8));var last=m*n-arr.reduce(function(s,v){return s+v},0);arr.push(last);if(last<0)return S.data[0][1](d);shuffle(arr);
  return nm("Find the mean of: "+arr.join(", "),m,"Sum = "+m*n+", count = "+n+". Mean = "+m*n+" ÷ "+n+" = "+m+".")});
add("data","Median",function(d){
  var n=ri(5,8),arr=[];for(var i=0;i<n;i++)arr.push(ri(1,40));var s=arr.slice().sort(function(a,b){return a-b}),med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;
  return nm("Find the median of: "+arr.join(", "),med,"Sort: "+s.join(", ")+". "+(n%2?"Middle value: "+med+".":"Average the two middle values: ("+s[n/2-1]+" + "+s[n/2]+")/2 = "+med+"."))});
add("data","Missing value from a mean",function(d){
  var n=ri(4,6),m=ri(60,95),arr=[];for(var i=0;i<n-1;i++)arr.push(m+ri(-10,10));var need=m*n-arr.reduce(function(s,v){return s+v},0);
  return nm("A student's first "+(n-1)+" test scores are "+arr.join(", ")+". What score on the next test makes the mean exactly "+m+"?",need,"Needed total = "+m+" × "+n+" = "+m*n+". Current total = "+(m*n-need)+". Needed score = "+need+".")});
add("data","Residuals",function(d){
  var m=nz(-3,5),b=ri(0,20),x=ri(2,12),r=nz(-6,6),pred=m*x+b;
  return nm("A best-fit line is y = "+poly([m,b])+". At x = "+x+" the actual value is "+(pred+r)+". What is the residual?",r,"Predicted = "+f(pred)+". Residual = actual − predicted = "+(pred+r)+" − "+f(pred)+" = "+f(r)+".")});

/* ================= prob ================= */
add("prob","Simple probability",function(d){
  var r=ri(1,9),b=ri(1,9),g=ri(0,6),T=r+b+g,col=pick([["red",r],["blue",b]]);
  return nm("A bag has "+r+" red, "+b+" blue"+(g?" and "+g+" green":"")+" marbles. P(picking "+col[0]+")? (fraction)",fr(col[1],T),col[1]+" "+col[0]+" out of "+T+" total = "+fr(col[1],T)+".")});
add("prob","At least one",function(d){
  var n=ri(2,4);return nm("Flip "+n+" fair coins. What is P(at least one head)? (fraction)",fr(Math.pow(2,n)-1,Math.pow(2,n)),"P(no heads) = (1/2)^"+n+" = 1/"+Math.pow(2,n)+". So P(at least one) = 1 − 1/"+Math.pow(2,n)+" = "+fr(Math.pow(2,n)-1,Math.pow(2,n))+".")});
add("prob","Counting choices",function(d){
  var a=ri(2,6),b=ri(2,6),c=d>1?ri(2,5):1;
  return nm("A menu has "+a+" starters, "+b+" mains"+(c>1?" and "+c+" desserts":"")+". How many different meals (one of each)?",a*b*c,"Multiply the choices: "+a+" × "+b+(c>1?" × "+c:"")+" = "+a*b*c+".")});
add("prob","Two-way tables",function(d){
  var a=ri(10,40),b=ri(5,30),c=ri(10,40),e=ri(5,30);
  return nm("Survey: Grade 10 — "+a+" like sport, "+b+" don't. Grade 11 — "+c+" like sport, "+e+" don't. What fraction of Grade 11 students like sport?",fr(c,c+e),"Restrict to Grade 11 only: "+c+" out of "+(c+e)+" = "+fr(c,c+e)+".")});

/* ================= geo1 ================= */
add("geo1","Triangle angles",function(d){
  var a=ri(25,80),b=ri(25,80);return nm("Two angles of a triangle are "+a+"° and "+b+"°. The third angle?",180-a-b,"180 − "+a+" − "+b+" = "+(180-a-b)+"°.")});
add("geo1","Pythagorean theorem",function(d){
  var t=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]),k=ri(1,d+1),leg=ri(0,1);
  if(leg)return nm("A right triangle has hypotenuse "+t[2]*k+" and one leg "+t[0]*k+". The other leg?",t[1]*k,"√("+t[2]*k+"² − "+t[0]*k+"²) = √"+(t[1]*k*t[1]*k)+" = "+t[1]*k+".");
  return nm("A right triangle has legs "+t[0]*k+" and "+t[1]*k+". The hypotenuse?",t[2]*k,"√("+t[0]*k+"² + "+t[1]*k+"²) = √"+(t[2]*k*t[2]*k)+" = "+t[2]*k+".")});
add("geo1","Polygon angles",function(d){
  var n=pick([5,6,8,9,10,12]),each=ri(0,1);
  return nm(each?"Each interior angle of a regular "+n+"-sided polygon (degrees)?":"Sum of the interior angles of a "+n+"-sided polygon (degrees)?",each?(n-2)*180/n:(n-2)*180,"Sum = ("+n+" − 2) × 180 = "+(n-2)*180+(each?". Each = "+(n-2)*180+" ÷ "+n+" = "+(n-2)*180/n+".":"."))});
add("geo1","Similar triangles",function(d){
  var a=ri(2,8),k=pick([2,3,1.5,2.5,4]),b=ri(3,9),area=d>2;
  if(area){var A=ri(2,12);return nm("Two similar triangles have scale factor "+k+". The small one has area "+A+". Area of the large one?",r2(A*k*k),"Areas scale by k² = "+k*k+": "+A+" × "+k*k+" = "+r2(A*k*k)+".")}
  return nm("Similar triangles: a side of "+a+" matches a side of "+r2(a*k)+". Another small side is "+b+". Its matching side?",r2(b*k),"Scale factor = "+r2(a*k)+" ÷ "+a+" = "+k+". "+b+" × "+k+" = "+r2(b*k)+".")});
add("geo1","Special right triangles",function(d){
  var s=ri(2,9);if(ri(0,1))return nm("In a 30-60-90 triangle the short leg is "+s+". The hypotenuse?",2*s,"Sides x : x√3 : 2x → hypotenuse 2 × "+s+" = "+2*s+".");
  return mc("A 45-45-90 triangle has legs of "+s+". The hypotenuse is:",s+"√2",[s+"√3",String(2*s),s*s+""],"Sides x : x : x√2 → "+s+"√2.")});

/* ================= geo2 ================= */
add("geo2","Circle area & circumference",function(d){
  var r=ri(2,12),area=ri(0,1),dia=d>1&&ri(0,1);
  return nm("A circle has "+(dia?"diameter "+2*r:"radius "+r)+". Its "+(area?"area":"circumference")+" = kπ. Enter k.",area?r*r:2*r,(dia?"Radius = "+r+". ":"")+(area?"A = πr² = "+r*r+"π.":"C = 2πr = "+2*r+"π."))});
add("geo2","Sectors & arcs",function(d){
  var r=pick([3,4,6,9,12]),deg=pick([30,45,60,90,120,180]),area=ri(0,1),k=area?r2(deg/360*r*r):r2(deg/360*2*r);
  return nm("A sector of a circle with radius "+r+" has a central angle of "+deg+"°. Its "+(area?"area":"arc length")+" = kπ. Enter k.",k,"Fraction of the circle = "+deg+"/360. "+(area?"× πr² = "+r*r+"π":"× 2πr = "+2*r+"π")+" → "+k+"π.")});
add("geo2","Volume",function(d){
  if(ri(0,1)){var l=ri(2,10),w=ri(2,10),h=ri(2,10);return nm("Volume of a box "+l+" × "+w+" × "+h+"?",l*w*h,l+" × "+w+" × "+h+" = "+l*w*h+".")}
  var r=ri(1,6),h2=ri(2,10);return nm("A cylinder has radius "+r+" and height "+h2+". Volume = kπ. Enter k.",r*r*h2,"V = πr²h = π·"+r*r+"·"+h2+" = "+r*r*h2+"π.")});
add("geo2","Circle equations",function(d){
  var h=nz(-6,6),k=nz(-6,6),r=ri(2,8);
  if(d===1)return nm("What is the radius of (x "+(h<0?"+ "+(-h):"− "+h)+")² + (y "+(k<0?"+ "+(-k):"− "+k)+")² = "+r*r+"?",r,"r² = "+r*r+" → r = "+r+".");
  var D=-2*h,E=-2*k,F=h*h+k*k-r*r;
  return nm("What is the radius of x² + y² "+(D<0?"− "+(-D):"+ "+D)+"x "+(E<0?"− "+(-E):"+ "+E)+"y "+(F<0?"− "+(-F):"+ "+F)+" = 0?",r,"Complete the square: (x "+(h<0?"+ "+(-h):"− "+h)+")² + (y "+(k<0?"+ "+(-k):"− "+k)+")² = "+(-F)+" + "+h*h+" + "+k*k+" = "+r*r+". So r = "+r+".")});
add("geo2","Inscribed angles",function(d){
  var c=2*ri(15,80),insc=ri(0,1);
  return nm(insc?"A central angle measures "+c+"°. What is an inscribed angle on the same arc?":"An inscribed angle measures "+c/2+"°. What is the central angle on the same arc?",insc?c/2:c,"Inscribed = half of central. "+(insc?c+" ÷ 2 = "+c/2:c/2+" × 2 = "+c)+"°.")});

/* ================= trig ================= */
add("trig","SOH-CAH-TOA",function(d){
  var t=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]),k=ri(1,3),fn=pick(["sin","cos","tan"]),o=t[0]*k,a=t[1]*k,h=t[2]*k;
  var ans=fn==="sin"?fr(o,h):fn==="cos"?fr(a,h):fr(o,a);
  return nm("In a right triangle, angle θ has opposite side "+o+", adjacent side "+a+" and hypotenuse "+h+". What is "+fn+" θ? (fraction)",ans,fn+" = "+(fn==="sin"?"opposite/hypotenuse = "+o+"/"+h:fn==="cos"?"adjacent/hypotenuse = "+a+"/"+h:"opposite/adjacent = "+o+"/"+a)+" = "+ans+".")});
add("trig","Degrees ↔ radians",function(d){
  var deg=pick([30,45,60,90,120,135,150,180,270]),c=fr(deg,180);
  return nm("Convert "+deg+"° to radians. The answer is kπ — enter k as a fraction or decimal.",c,deg+" × π/180 = "+c+"π.")});
add("trig","Missing side with trig",function(d){
  var h=pick([10,20,25,40,50]),r=pick([0.2,0.4,0.6,0.8]),fn=pick(["sin","cos"]);
  return nm("In a right triangle the hypotenuse is "+h+" and "+fn+" θ = "+r+". Find the "+(fn==="sin"?"opposite":"adjacent")+" side.",r2(h*r),fn+" = "+(fn==="sin"?"opposite":"adjacent")+"/hypotenuse → side = "+r+" × "+h+" = "+r2(h*r)+".")});
add("trig","Complementary angles",function(d){
  var x=pick([10,20,25,35,40,50,65,70]),v=pick(["0.34","0.57","0.64","0.82","0.91"]);
  return mc("If sin("+x+"°) = "+v+", which is also equal to "+v+"?","cos("+(90-x)+"°)",["cos("+x+"°)","sin("+(90-x)+"°)","tan("+x+"°)"],"sin x = cos(90° − x), so sin("+x+"°) = cos("+(90-x)+"°).")});

/* ================= wp / hard / desmos (built from others + extras) ================= */
add("wp","Age problems",function(d){
  var y=ri(3,15),k=ri(2,4),n=ri(2,10);var o=k*y;
  return nm("A parent is "+k+" times as old as a child. Together their ages add to "+(o+y)+". How old is the child?",y,"c + "+k+"c = "+(o+y)+" → "+(k+1)+"c = "+(o+y)+" → c = "+y+".")});
add("wp","Consecutive integers",function(d){
  var n=ri(3,5),s=ri(-5,40),ev=d>1,step=ev?2:1;if(ev&&s%2)s++;var sum=0;for(var i=0;i<n;i++)sum+=s+i*step;
  return nm("The sum of "+n+" consecutive "+(ev?"even ":"")+"integers is "+sum+". What is the largest?",s+(n-1)*step,"Let them be n, n + "+step+", … Middle ≈ "+sum+" ÷ "+n+". They are "+Array.apply(null,{length:n}).map(function(_,i){return s+i*step}).join(", ")+".")});
S.wp=S.wp.concat([S.alg[3],S.frac[4],S.sys[2],S.ratio[2]]);
add("hard","One-solution quadratics",function(d){
  var b=2*nz(1,8);return nm("x² "+(b<0?"− "+(-b):"+ "+b)+"x + c = 0 has exactly one real solution. Find c.",b*b/4,"One solution → b² − 4ac = 0 → "+b*b+" − 4c = 0 → c = "+b*b/4+".")});
add("hard","Factor-theorem constants",function(d){
  var r=nz(-4,4),c=nz(-12,12),k=-(r*r+c)/r;if(k%1)return S.hard[0][1](d);
  return nm("(x "+(r<0?"+ "+(-r):"− "+r)+") is a factor of x² + kx "+(c<0?"− "+(-c):"+ "+c)+". Find k.",k,"p("+f(r)+") = 0: "+r*r+" + "+f(r)+"k "+(c<0?"− "+(-c):"+ "+c)+" = 0 → k = "+f(k)+".")});
add("hard","Matching coefficients",function(d){
  var a=ri(2,5),p=nz(-6,6),q=nz(-6,6);
  return nm("("+a+"x "+(p<0?"− "+(-p):"+ "+p)+")(x + c) = "+a+"x² + bx "+(p*q<0?"− "+Math.abs(p*q):"+ "+p*q)+" for all x. Find b.",a*q+p,"Constant terms: "+f(p)+"·c = "+f(p*q)+" → c = "+f(q)+". Then b = "+a+"·"+f(q)+" + "+f(p)+" = "+f(a*q+p)+".")});
S.hard=S.hard.concat([S.sys[3],S.alg[4],S.func[1],S.quad[3],S.geo2[3]]);
S.desmos=[S.quad[1],S.sys[0],S.quad[0],S.func[3],S.hard[0]];

/* ================= public API ================= */
function make(u,d,si){var list=S[u];if(!list||!list.length)return null;var sk=si!=null?list[si]:pick(list);d=d||ri(1,3);
  var it;for(var tries=0;tries<6;tries++){try{it=sk[1](d);if(it&&isFinite(parseFloat(it.a))||it&&it.t==="mc")break}catch(e){it=null}}
  if(!it)return null;it.uid=u;it.gen=1;it.d=d;it.sk=sk[0];return it}
function set(units,n,d){var out=[],seen={};for(var i=0;out.length<n&&i<n*8;i++){var u=pick(units),it=make(u,d==="mix"||!d?ri(1,3):d);if(it&&!seen[it.q]){seen[it.q]=1;out.push(it)}}return out}
function skills(u){return (S[u]||[]).map(function(s){return s[0]})}
function count(){var n=0;for(var k in S)n+=S[k].length;return n}
return {rnd:function(){return rng()},make:make,set:set,skills:skills,seed:seed,unseed:unseed,count:count,units:function(){return Object.keys(S)},_S:S,frac:fr};
})();
