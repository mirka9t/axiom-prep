/* =====================================================================
   ZERO TO 800 — generators & tips for the deep lessons
   ===================================================================== */
(function(){
var R=function(){return GEN.rnd()};
function ri(a,b){return a+Math.floor(R()*(b-a+1))}function nz(a,b){var v;do{v=ri(a,b)}while(v===0);return v}
function pk(a){return a[Math.floor(R()*a.length)]}function f(n){return n<0?"−"+(-n):String(n)}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
function fr(n,d){if(d<0){n=-n;d=-d}var g=gcd(n,d);n/=g;d/=g;return d===1?String(n):n+"/"+d}
function nm(q,a,s){return {t:"num",q:q,a:String(a),s:s}}
function mc(q,right,wr,s){var o=[String(right)];wr.forEach(function(w){w=String(w);if(o.indexOf(w)<0&&o.length<4)o.push(w)});for(var i=o.length-1;i>0;i--){var j=Math.floor(R()*(i+1)),t=o[i];o[i]=o[j];o[j]=t}return {t:"mc",q:q,c:o,a:o.indexOf(String(right)),s:s}}
function sg(n){return n<0?"− "+(-n):"+ "+n}
var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}

add("nums","Opposites & absolute value",function(d){
  if(R()<.5){var a=nz(-15,15),b=nz(-15,15),c=nz(-9,9),v=-(-a)+Math.abs(b)-Math.abs(c);
    return nm("Compute −("+f(-a)+") + |"+f(b)+"| − |"+f(c)+"|.",v,"−("+f(-a)+") is the opposite of "+f(-a)+", which is "+f(a)+". |"+f(b)+"| = "+Math.abs(b)+", |"+f(c)+"| = "+Math.abs(c)+". So "+f(a)+" + "+Math.abs(b)+" − "+Math.abs(c)+" = "+f(v)+".")}
  var vals=[nz(-12,-1),nz(-12,-1),nz(1,9),0],big=R()<.5;vals=vals.filter(function(v,i){return vals.indexOf(v)===i});var ans=big?Math.max.apply(null,vals):Math.min.apply(null,vals);
  return mc("Which number is the "+(big?"greatest":"least")+"?",f(ans),vals.filter(function(v){return v!==ans}).map(f),"On the number line, numbers increase to the right. Among negatives, the one closer to 0 is bigger. The "+(big?"greatest":"least")+" is "+f(ans)+".")});
add("nums","Decimal operations",function(d){var op=pk(["+","−","×","÷"]),a=ri(11,99)/10,b=ri(2,9)/(R()<.5?10:100),v;
  if(op==="+")v=Math.round((a+b)*1000)/1000;else if(op==="−")v=Math.round((a-b)*1000)/1000;else if(op==="×")v=Math.round(a*b*10000)/10000;else{var q=ri(2,15);a=Math.round(q*b*10000)/10000;v=q}
  return nm("Compute "+a+" "+op+" "+b+".",v,op==="+"||op==="−"?"Line up the decimal points (add zeros if needed), then "+(op==="+"?"add":"subtract")+": "+v+".":op==="×"?"Multiply without the points, then count the total decimal places in both numbers: "+v+".":"Move both decimal points until "+b+" is a whole number, then divide: "+v+".")});
add("frac","Mixed numbers",function(d){var w1=ri(1,6),w2=ri(1,4),dn=pk([2,3,4,5,6,8]),n1=ri(1,dn-1),n2=ri(1,dn-1),sub=R()<.5&&w1+n1/dn>w2+n2/dn;
  var A=w1*dn+n1,B=w2*dn+n2,res=sub?A-B:A+B;
  return nm("Compute "+w1+" "+n1+"/"+dn+(sub?" − ":" + ")+w2+" "+n2+"/"+dn+". Give the answer as an improper fraction.",fr(res,dn),"Convert: "+w1+" "+n1+"/"+dn+" = "+A+"/"+dn+" and "+w2+" "+n2+"/"+dn+" = "+B+"/"+dn+". Then "+A+(sub?" − ":" + ")+B+" = "+res+" → "+fr(res,dn)+(sub&&n1<n2?" (with the other method you would need to borrow a whole).":"."))});
add("frac","Multiplying & dividing fractions",function(d){var a=ri(1,9),b=ri(2,10),c=ri(1,9),e=ri(2,10),div=R()<.5;
  return nm("Compute "+a+"/"+b+(div?" ÷ ":" × ")+c+"/"+e+" (as a simplified fraction).",div?fr(a*e,b*c):fr(a*c,b*e),div?"Keep, change, flip: "+a+"/"+b+" × "+e+"/"+c+" = "+(a*e)+"/"+(b*c)+" = "+fr(a*e,b*c)+".":"Multiply straight across: "+(a*c)+"/"+(b*e)+" = "+fr(a*c,b*e)+" (cancel common factors).")});
add("frac","Fraction of an amount",function(d){var dn=pk([3,4,5,6,8]),n=ri(1,dn-1),k=ri(3,15),T=dn*k;
  if(R()<.5)return nm(n+"/"+dn+" of "+T+" is what number?",n*k,T+" ÷ "+dn+" = "+k+" (one part), × "+n+" = "+(n*k)+".");
  return nm(n+"/"+dn+" of a number is "+(n*k)+". What is the number?",T,"One part = "+(n*k)+" ÷ "+n+" = "+k+". The whole is "+dn+" parts = "+T+".")});
add("alg","One-step equations",function(d){var x=nz(-12,15),t=pk(["+","−","×","÷"]),k=nz(2,9);
  if(t==="+")return nm("Solve x + "+k+" = "+f(x+k)+".",x,"Subtract "+k+" from both sides: x = "+f(x+k)+" − "+k+" = "+f(x)+".");
  if(t==="−")return nm("Solve x − "+k+" = "+f(x-k)+".",x,"Add "+k+" to both sides: x = "+f(x-k)+" + "+k+" = "+f(x)+".");
  if(t==="×"){var m=pk([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);return nm("Solve "+f(m)+"x = "+f(m*x)+".",x,"Divide both sides by "+f(m)+": x = "+f(x)+".")}
  return nm("Solve x/"+k+" = "+f(x)+".",x*k,"Multiply both sides by "+k+": x = "+f(x*k)+".")});
add("alg","Equations with fractions",function(d){var x=nz(-6,12),a=pk([2,3,4]),b=pk([3,5,6]);while(b===a)b=pk([3,5,6]);var L_=a*b,rhs=x/a+x/b;
  if(Math.abs(rhs-Math.round(rhs))>1e-9){x=a*b*nz(1,3);rhs=x/a+x/b}
  return nm("Solve x/"+a+" + x/"+b+" = "+rhs+".",x,"Multiply EVERY term by "+L_+": "+(L_/a)+"x + "+(L_/b)+"x = "+(rhs*L_)+" → "+(L_/a+L_/b)+"x = "+(rhs*L_)+" → x = "+x+".")});
add("exp","Simplifying radicals",function(d){var a=ri(2,9),b=pk([2,3,5,6,7]),n=a*a*b;return nm("Simplify √"+n+" = a√"+b+". Enter a.",a,n+" = "+(a*a)+" × "+b+", and "+(a*a)+" is a perfect square: √"+n+" = √"+(a*a)+" · √"+b+" = "+a+"√"+b+".")});
add("quad","Solving by square roots",function(d){var r=ri(1,9),h=nz(-6,6),big=R()<.5;
  return nm("Solve (x "+sg(-h)+")² = "+r*r+". Enter the "+(big?"larger":"smaller")+" solution.",big?h+r:h-r,"Take ± square roots: x "+sg(-h)+" = ±"+r+" → x = "+f(h+r)+" or x = "+f(h-r)+".")});
add("prob","Permutations & combinations",function(d){var n=ri(5,10),k=ri(2,3),perm=R()<.5,p=1;for(var i=0;i<k;i++)p*=n-i;var c=p/(k===2?2:6);
  return perm?nm("In how many ways can "+k+" different prizes (1st"+(k===3?", 2nd and 3rd":" and 2nd")+") be given to "+n+" people?",p,"Order matters: "+Array.apply(null,{length:k}).map(function(_,i){return n-i}).join(" × ")+" = "+p+"."):nm("How many ways can a group of "+k+" be chosen from "+n+" people?",c,"Order doesn't matter: "+p+" ordered ways ÷ "+k+"! = "+c+".")});
add("geo1","Transformations",function(d){var x=nz(-8,8),y=nz(-8,8),t=pk(["x","y","r90","r180","tr"]),dx=nz(-5,5),dy=nz(-5,5);
  var T={x:["reflected over the x-axis",[x,-y],"(x, y) → (x, −y)"],y:["reflected over the y-axis",[-x,y],"(x, y) → (−x, y)"],r90:["rotated 90° counter-clockwise about the origin",[-y,x],"(x, y) → (−y, x)"],r180:["rotated 180° about the origin",[-x,-y],"(x, y) → (−x, −y)"],tr:["translated "+Math.abs(dx)+(dx>0?" right":" left")+" and "+Math.abs(dy)+(dy>0?" up":" down"),[x+dx,y+dy],"(x, y) → (x "+sg(dx)+", y "+sg(dy)+")"]}[t],ax=R()<.5;
  return nm("The point ("+f(x)+", "+f(y)+") is "+T[0]+". What is the "+(ax?"x":"y")+"-coordinate of the image?",ax?T[1][0]:T[1][1],"Rule: "+T[2]+". Image: ("+f(T[1][0])+", "+f(T[1][1])+").")});
add("trig","Pythagorean identity",function(d){var t=pk([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]),s=R()<.5;
  return nm((s?"sin":"cos")+" θ = "+t[0]+"/"+t[2]+" for an acute angle θ. Find "+(s?"cos":"sin")+" θ (fraction).",t[1]+"/"+t[2],"sin²θ + cos²θ = 1 → the other ratio² = 1 − "+(t[0]*t[0])+"/"+(t[2]*t[2])+" = "+(t[1]*t[1])+"/"+(t[2]*t[2])+" → "+t[1]+"/"+t[2]+" (a "+t.join("-")+" triangle).")});
})();

T("Opposites & absolute value","nums","l8","−(−a) = a · |a| = distance from 0 · closer to 0 = bigger (for negatives)",["Rewrite every −(−a) as a.","Replace each |…| by the distance from zero (never negative).","Compute left to right; to compare, picture the number line."],"Thinking a bigger absolute value means a bigger number (−10 < −1).",["opposite","|","greatest","least"]);
T("Decimal operations","nums","l10","+/−: line up points · ×: count decimal places · ÷: make the divisor whole",["For + and −, write the numbers with points lined up.","For ×, multiply as whole numbers then place the point.","For ÷, shift both points the same number of places."],"Lining up the last digits instead of the decimal points.",["compute"]);
T("Mixed numbers","frac","l7","a b/c = (a·c + b)/c",["Convert every mixed number to an improper fraction.","Use a common denominator, add or subtract the tops.","Simplify or convert back."],"Subtracting fraction parts without borrowing when the first is smaller.",["mixed"]);
T("Multiplying & dividing fractions","frac","l8","× straight across · ÷ keep-change-flip",["To multiply: tops × tops, bottoms × bottoms (cancel first).","To divide: flip the second fraction and multiply.","Simplify the result."],"Flipping the first fraction instead of the second.",["×","÷"]);
T("Fraction of an amount","frac","l9","fraction of N = N ÷ bottom × top · whole = part ÷ fraction",["Find one part: divide by the denominator.","Multiply by the numerator (or, for the whole, count all the parts)."],"Dividing by the numerator instead of the denominator.",["of"]);
T("One-step equations","alg","l0","undo with the opposite operation on BOTH sides",["See what is done to x (+, −, ×, ÷).","Do the opposite to both sides.","Check by substituting back."],"Changing only one side, or forgetting the sign of a negative coefficient.",["solve"]);
T("Equations with fractions","alg","l8","multiply EVERY term by the common denominator",["Find the LCM of all denominators.","Multiply every single term (both sides) by it.","Solve the fraction-free equation and check."],"Multiplying only the fractions and forgetting the whole-number terms.",["/"]);
T("Simplifying radicals","exp","l7","√(a²b) = a√b",["Find the largest perfect square that divides the number.","Write the number as (perfect square) × (the rest).","Take the square root of the perfect square outside."],"Pulling out a non-square factor, or stopping at a smaller perfect square.",["√"]);
T("Solving by square roots","quad","l8","(x − h)² = k → x = h ± √k",["Isolate the squared part.","Take the square root of both sides — write ±.","Solve both cases."],"Forgetting the negative root.",["²"]);
T("Permutations & combinations","prob","l4","nPk = n(n−1)…(k terms) · nCk = nPk ÷ k!",["Decide if order matters (prizes, positions) or not (groups).","Multiply the falling choices.","If order doesn't matter, divide by k!."],"Using permutations for a group/committee.",["ways"]);
T("Transformations","geo1","l7","x-axis (x, −y) · y-axis (−x, y) · 90° CCW (−y, x) · 180° (−x, −y)",["Identify the transformation.","Apply its rule to the coordinates.","Check by sketching quickly."],"Mixing up the reflection rules for the two axes.",["reflected","rotated","translated"]);
T("Pythagorean identity","trig","l5","sin²θ + cos²θ = 1",["Square the given ratio.","Subtract from 1.","Take the positive square root (acute angle)."],"Subtracting the ratios without squaring.",["sin","cos"]);
QB=null;QBI={};LPC={};
