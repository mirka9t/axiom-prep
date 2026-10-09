/* =====================================================================
   AXIOM — Axi's brain, part 1: the maths engine
   A small, careful algebra system that solves problems the way a good
   teacher writes them on the board: every step, in plain words, checked.
   Works offline, no server, no API key.
   ===================================================================== */
var AXM=(function(){
"use strict";
/* ---------------- exact fractions ---------------- */
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t}return a}
function lcm(a,b){return a&&b?Math.abs(a/gcd(a,b)*b):0}
function F(n,d){if(d===undefined)d=1;if(typeof n==="object")return n;
  if(!isFinite(n)||!isFinite(d)||d===0)return {n:NaN,d:1};
  if(n%1||d%1){var k=1;while((Math.abs(n*k-Math.round(n*k))>1e-9||Math.abs(d*k-Math.round(d*k))>1e-9)&&k<1e9)k*=10;n=Math.round(n*k);d=Math.round(d*k)}
  if(d<0){n=-n;d=-d}var g=gcd(n,d)||1;n/=g;d/=g;
  if(Math.abs(n)>9e15||d>9e15){var v=n/d;return {n:v,d:1,approx:true}}
  return {n:n,d:d}}
function fadd(a,b){return F(a.n*b.d+b.n*a.d,a.d*b.d)}
function fsub(a,b){return F(a.n*b.d-b.n*a.d,a.d*b.d)}
function fmul(a,b){return F(a.n*b.n,a.d*b.d)}
function fdiv(a,b){return b.n===0||isNaN(b.n)||isNaN(a.n)?{n:NaN,d:1}:F(a.n*b.d,a.d*b.n)}
function fneg(a){return {n:-a.n,d:a.d}}
function fz(a){return a.n===0}
function fv(a){return a.n/a.d}
function fint(a){return a.d===1}
function feq(a,b){return a.n===b.n&&a.d===b.d}
function fpow(a,k){var r=F(1);if(k<0){a=fdiv(F(1),a);k=-k}for(var i=0;i<k;i++)r=fmul(r,a);return r}
function fabs(a){return {n:Math.abs(a.n),d:a.d}}
var M="−";
/* plain text: 7, −3, 3/4 */
function fstr(a){if(isNaN(a.n))return "undefined";if(a.approx)return dec(a.n);return (a.n<0?M:"")+Math.abs(a.n)+(a.d===1?"":"/"+a.d)}
/* copybook maths markup */
function fmx(a){if(isNaN(a.n))return "\\t{undefined}";if(a.approx)return dec(a.n).replace("-",M);return (a.n<0?M:"")+(a.d===1?Math.abs(a.n):"\\f{"+Math.abs(a.n)+"}{"+a.d+"}")}
function dec(v,p){if(!isFinite(v))return String(v);p=p||4;var r=Math.round(v*Math.pow(10,p))/Math.pow(10,p);return String(r).replace("-",M)}
function nice(a){return fint(a)?fmx(a):fmx(a)+" ≈ "+dec(fv(a),3)}

/* ---------------- tokenizer + parser ---------------- */
var FUNCS={sqrt:1,cbrt:1,abs:1,sin:1,cos:1,tan:1,ln:1,log:1};
function clean(s){s=String(s);if(/÷/.test(s))s=s.replace(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g,"($1/$2)");return s.replace(/[−–—]/g,"-").replace(/[×✕∙·]/g,"*").replace(/÷/g,"/").replace(/²/g,"^2").replace(/³/g,"^3").replace(/√/g,"sqrt").replace(/∛/g,"cbrt").replace(/π/g,"pi").replace(/≤/g,"<=").replace(/≥/g,">=").replace(/≠/g,"!=").replace(/\*\*/g,"^").replace(/[\[{]/g,"(").replace(/[\]}]/g,")").replace(/\s+/g," ").trim()}
function tokenize(s){s=clean(s);var T=[],i=0,m;
  while(i<s.length){var c=s[i];
    if(c===" "){i++;continue}
    if((m=s.slice(i).match(/^\d+(\.\d+)?|^\.\d+/))){T.push({k:"n",v:F(parseFloat(m[0]))});i+=m[0].length;continue}
    if((m=s.slice(i).match(/^[a-zA-Z]+/))){var w=m[0],lw=w.toLowerCase();i+=w.length;
      if(FUNCS[lw]){T.push({k:"f",v:lw});continue}
      if(lw==="pi"){T.push({k:"pi"});continue}
      /* split longer words into single-letter variables: 2xy → 2·x·y; known names stay whole */
      for(var j=0;j<w.length;j++){if(lw.slice(j,j+2)==="pi"){T.push({k:"pi"});j++;continue}T.push({k:"v",v:w[j]})}continue}
    if("+-*/^()=<>|,!".indexOf(c)>-1){if((c==="<"||c===">"||c==="!")&&s[i+1]==="="){T.push({k:"o",v:c+"="});i+=2;continue}T.push({k:"o",v:c});i++;continue}
    throw new Error("I can't read “"+c+"”")}
  return T}
function parse(str){var T=tokenize(str),p=0,absDepth=0;
  function peek(){return T[p]}function eat(v){var t=T[p];if(t&&t.k==="o"&&t.v===v){p++;return true}return false}
  function startsAtom(t){return t&&(t.k==="n"||t.k==="v"||t.k==="f"||t.k==="pi"||(t.k==="o"&&(t.v==="("||(t.v==="|"&&absDepth===0))))}
  function expr(){var a=term();for(;;){if(eat("+"))a={t:"+",a:a,b:term()};else if(eat("-"))a={t:"-",a:a,b:term()};else return a}}
  function term(){var a=unary();for(;;){if(eat("*"))a={t:"*",a:a,b:unary()};else if(eat("/"))a={t:"/",a:a,b:unary()};else if(startsAtom(peek()))a={t:"*",a:a,b:power(),imp:1};else return a}}
  function unary(){if(eat("-"))return {t:"neg",a:unary()};if(eat("+"))return unary();return power()}
  function power(){var a=atom();if(eat("^")){var b=eat("-")?{t:"neg",a:power()}:power();return {t:"^",a:a,b:b}}return a}
  function atom(){var t=T[p];if(!t)throw new Error("The expression ends too early");
    if(t.k==="n"){p++;return {t:"n",v:t.v}}
    if(t.k==="pi"){p++;return {t:"pi"}}
    if(t.k==="v"){p++;return {t:"v",n:t.v}}
    if(t.k==="f"){p++;var arg;if(peek()&&peek().k==="o"&&peek().v==="("){p++;arg=expr();if(!eat(")"))throw new Error("A bracket is missing")}else arg=power();return t.v==="abs"?{t:"abs",a:arg}:{t:"fn",f:t.v,a:arg}}
    if(t.k==="o"&&t.v==="("){p++;var e=expr();if(!eat(")"))throw new Error("A bracket is missing");return {t:"par",a:e}}
    if(t.k==="o"&&t.v==="|"){p++;absDepth++;var e2=expr();absDepth--;if(!eat("|"))throw new Error("An absolute-value bar is missing");return {t:"abs",a:e2}}
    throw new Error("I didn't expect “"+t.v+"” there")}
  var r=expr();if(p<T.length)throw new Error("I couldn't read the part after “"+(T[p-1]?(T[p-1].v&&T[p-1].v.n!==undefined?fstr(T[p-1].v):T[p-1].v):"")+"”");return r}
function unpar(n){while(n&&n.t==="par")n=n.a;return n}

/* ---------------- polynomials in any letters ---------------- */
function mono(k){var o={};if(!k)return o;k.split("*").forEach(function(q){var z=q.split("^");o[z[0]]=(o[z[0]]||0)+(z[1]?+z[1]:1)});return o}
function mkey(o){return Object.keys(o).filter(function(v){return o[v]}).sort().map(function(v){return o[v]===1?v:v+"^"+o[v]}).join("*")}
function P(c){var o={};if(c&&!fz(F(c)))o[""]=F(c);return o}
function pvar(v){var o={};o[v]=F(1);return o}
function pclean(A){var o={};for(var k in A)if(!fz(A[k]))o[k]=A[k];return o}
function padd(A,B){var o={},k;for(k in A)o[k]=A[k];for(k in B)o[k]=o[k]?fadd(o[k],B[k]):B[k];return pclean(o)}
function pneg(A){var o={};for(var k in A)o[k]=fneg(A[k]);return o}
function psub(A,B){return padd(A,pneg(B))}
function pscale(A,c){var o={};for(var k in A)o[k]=fmul(A[k],c);return pclean(o)}
function pmul(A,B){var o={};for(var a in A)for(var b in B){var ma=mono(a),mb=mono(b),v;for(v in mb)ma[v]=(ma[v]||0)+mb[v];var k=mkey(ma),c=fmul(A[a],B[b]);o[k]=o[k]?fadd(o[k],c):c}return pclean(o)}
function ppow(A,n){var r=P(1);for(var i=0;i<n;i++)r=pmul(r,A);return r}
function pconst(A){var ks=Object.keys(A);if(!ks.length)return F(0);if(ks.length===1&&ks[0]==="")return A[""];return null}
function pvars(A){var s={};for(var k in A){var m=mono(k);for(var v in m)s[v]=1}return Object.keys(s).sort()}
function pdeg(A,v){var d=0;for(var k in A){var m=mono(k),e=v?(m[v]||0):Object.keys(m).reduce(function(s,x){return s+m[x]},0);if(e>d)d=e}return d}
function pzero(A){return !Object.keys(A).length}
/* coefficient of v^e as a polynomial in the other letters */
function pcoef(A,v,e){var o={};for(var k in A){var m=mono(k);if((m[v]||0)===e){delete m[v];var kk=mkey(m);o[kk]=o[kk]?fadd(o[kk],A[k]):A[k]}}return pclean(o)}
function peval(A,env){var s=0;for(var k in A){var m=mono(k),t=fv(A[k]);for(var v in m)t*=Math.pow(env[v],m[v]);s+=t}return s}
function pevalF(A,v,x){var s=F(0);for(var k in A){var m=mono(k),t=A[k];for(var w in m){if(w!==v)return null;t=fmul(t,fpow(x,m[w]))}s=fadd(s,t)}return s}
function pequal(A,B){return pzero(psub(A,B))}
function pden(A){var L=1;for(var k in A)L=lcm(L,A[k].d);return L}
function pnumgcd(A){var g=0;for(var k in A)g=gcd(g,A[k].n);return g||1}
function ordered(A){return Object.keys(A).sort(function(x,y){var dx=pdeg(mono2(x)),dy=pdeg(mono2(y));if(dx!==dy)return dy-dx;return x<y?-1:x>y?1:0})}
function mono2(k){var o={};o[k||""]=F(1);return o}
function monoMX(k){var m=mono(k);return Object.keys(m).sort().map(function(v){return m[v]===1?v:v+"^{"+m[v]+"}"}).join("")}
function monoTX(k){var m=mono(k),sup={2:"²",3:"³"};return Object.keys(m).sort().map(function(v){return m[v]===1?v:v+(sup[m[v]]||"^"+m[v])}).join("")}
function pmx(A,txt){var ks=ordered(A);if(!ks.length)return "0";var out="";
  ks.forEach(function(k,i){var c=A[k],neg=c.n<0,ac=fabs(c),body;var mk=txt?monoTX(k):monoMX(k);
    if(!k)body=txt?fstr(ac):fmx(ac);else if(ac.n===1&&ac.d===1)body=mk;else body=(txt?fstr(ac):fmx(ac))+mk;
    out+=i===0?(neg?M:"")+body:(neg?" "+M+" ":" + ")+body});return out}
function ptx(A){return pmx(A,true)}

/* ---------------- tree → polynomial / rational ---------------- */
function toPoly(n){n=unpar(n);switch(n.t){
  case "n":return P(n.v);case "v":return pvar(n.n);case "pi":return null;
  case "+":var a=toPoly(n.a),b=toPoly(n.b);return a&&b?padd(a,b):null;
  case "-":a=toPoly(n.a);b=toPoly(n.b);return a&&b?psub(a,b):null;
  case "*":a=toPoly(n.a);b=toPoly(n.b);return a&&b?pmul(a,b):null;
  case "neg":a=toPoly(n.a);return a?pneg(a):null;
  case "/":a=toPoly(n.a);b=toPoly(n.b);if(!a||!b)return null;var c=pconst(b);if(!c||fz(c))return null;return pscale(a,fdiv(F(1),c));
  case "^":a=toPoly(n.a);var e=toPoly(n.b),ec=e&&pconst(e);if(!a||!ec||!fint(ec)||ec.n<0||ec.n>12)return (a&&ec&&fint(ec)&&ec.n<0&&pconst(a))?P(fpow(pconst(a),ec.n)):null;return ppow(a,ec.n);
  case "fn":if(n.f==="sqrt"){a=toPoly(n.a);c=a&&pconst(a);if(c&&c.n>=0){var r=sqrtF(c);if(r)return P(r)}}return null;
  case "abs":a=toPoly(n.a);c=a&&pconst(a);return c?P(fabs(c)):null}
  return null}
function sqrtF(c){var a=Math.round(Math.sqrt(c.n)),b=Math.round(Math.sqrt(c.d));return a*a===c.n&&b*b===c.d?F(a,b):null}
/* rational function N/D for equations with the unknown in a denominator */
function toRat(n){n=unpar(n);var p=toPoly(n);if(p)return {N:p,D:P(1)};var a,b;switch(n.t){
  case "+":a=toRat(n.a);b=toRat(n.b);if(!a||!b)return null;if(pequal(a.D,b.D))return {N:padd(a.N,b.N),D:a.D};return {N:padd(pmul(a.N,b.D),pmul(b.N,a.D)),D:pmul(a.D,b.D)};
  case "-":a=toRat(n.a);b=toRat(n.b);if(!a||!b)return null;if(pequal(a.D,b.D))return {N:psub(a.N,b.N),D:a.D};return {N:psub(pmul(a.N,b.D),pmul(b.N,a.D)),D:pmul(a.D,b.D)};
  case "*":a=toRat(n.a);b=toRat(n.b);return a&&b?{N:pmul(a.N,b.N),D:pmul(a.D,b.D)}:null;
  case "/":a=toRat(n.a);b=toRat(n.b);return a&&b&&!pzero(b.N)?{N:pmul(a.N,b.D),D:pmul(a.D,b.N)}:null;
  case "neg":a=toRat(n.a);return a?{N:pneg(a.N),D:a.D}:null;
  case "^":a=toRat(n.a);var e=toPoly(n.b),ec=e&&pconst(e);if(!a||!ec||!fint(ec)||ec.n<0||ec.n>6)return null;return {N:ppow(a.N,ec.n),D:ppow(a.D,ec.n)}}
  return null}
/* numbers */
function ev(n,env){n=unpar(n);env=env||{};switch(n.t){
  case "n":return fv(n.v);case "pi":return Math.PI;case "v":if(!(n.n in env))throw new Error("no value for "+n.n);return env[n.n];
  case "+":return ev(n.a,env)+ev(n.b,env);case "-":return ev(n.a,env)-ev(n.b,env);case "*":return ev(n.a,env)*ev(n.b,env);
  case "/":return ev(n.a,env)/ev(n.b,env);case "neg":return -ev(n.a,env);case "^":return Math.pow(ev(n.a,env),ev(n.b,env));
  case "abs":return Math.abs(ev(n.a,env));
  case "fn":var x=ev(n.a,env),k=has(n.a,"pi")?1:Math.PI/180;if(n.f==="tan"&&Math.abs(Math.cos(x*k))<1e-12)return NaN;return n.f==="sqrt"?Math.sqrt(x):n.f==="cbrt"?Math.cbrt(x):n.f==="sin"?Math.sin(x*k):n.f==="cos"?Math.cos(x*k):n.f==="tan"?Math.tan(x*k):n.f==="ln"?Math.log(x):Math.log10(x)}
  throw new Error("?")}
function hasVar(n,v){n=unpar(n);if(!n)return false;if(n.t==="v")return v?n.n===v:true;return !!((n.a&&hasVar(n.a,v))||(n.b&&hasVar(n.b,v)))}
function varsOf(n,s){s=s||{};n=unpar(n);if(!n)return s;if(n.t==="v")s[n.n]=1;if(n.a)varsOf(n.a,s);if(n.b)varsOf(n.b,s);return s}
function has(n,t){n=unpar(n);if(!n)return false;if(n.t===t)return true;return !!((n.a&&has(n.a,t))||(n.b&&has(n.b,t)))}
function subst(n,v,val){if(!n)return n;if(n.t==="v"&&n.n===v)return {t:"par",a:val,sub:1};var o={};for(var k in n)o[k]=n[k];if(n.a)o.a=subst(n.a,v,val);if(n.b)o.b=subst(n.b,v,val);return o}

/* ---------------- printing a tree as maths ---------------- */
var PREC={"+":1,"-":1,"*":2,"neg":3,"/":5,"^":4,"n":6,"v":6,"pi":6,"fn":6,"abs":6,"par":6};
function show(n,need){need=need||0;var s,pr=PREC[n.t];
  switch(n.t){
  case "par":if(!n.sub&&unpar(n.a).t==="/"&&need<5)return show(unpar(n.a),need);return n.sub?(isSimple(n.a)&&!(unpar(n.a).t==="n"&&unpar(n.a).v.n<0)?show(n.a,need):"("+show(n.a)+")"):"("+show(n.a)+")";
  case "n":s=fmx(n.v);if(n.v.n<0&&need>1)return "("+s+")";return s;
  case "v":return n.n;case "pi":return "π";
  case "+":s=show(n.a,1)+" + "+show(n.b,2);break;
  case "-":s=show(n.a,1)+" "+M+" "+show(n.b,2);break;
  case "*":var A=show(n.a,2),B=show(n.b,3),ua=unpar(n.a),ub=n.b.t==="par"?n.b:unpar(n.b);
    var imp=(ua.t==="n"||ua.t==="v"||ua.t==="^"||n.a.t==="par"||(ua.t==="neg"&&unpar(ua.a).t==="n")||(ua.t==="/"&&!n.a.imp)||(ua.t==="*"&&ua.imp&&(ub.t==="v"||ub.t==="par")))&&(ub.t==="v"||ub.t==="par"||ub.t==="fn"||ub.t==="pi"||(ub.t==="^"&&unpar(ub.a).t==="v"))&&!(ua.t==="v"&&ub.t==="n");
    if(n.b.t==="par"&&n.b.sub)imp=false;
    s=A+(imp?"":" · ")+B;break;
  case "neg":s=M+show(n.a,3);break;
  case "/":s="\\f{"+show(unpar(n.a))+"}{"+show(unpar(n.b))+"}";break;
  case "^":s=show(n.a,5)+"^{"+show(unpar(n.b))+"}";break;
  case "fn":s=n.f==="sqrt"?"\\r{"+show(n.a)+"}":n.f==="cbrt"?"\\rr{"+show(n.a)+"}":n.f+"("+show(n.a)+")";break;
  case "abs":s="|"+show(n.a)+"|";break}
  return pr<need?"("+s+")":s}
function isSimple(n){n=unpar(n);return n.t==="n"||n.t==="v"||n.t==="pi"}

/* ---------------- a step ---------------- */
function St(m,t){return {m:m,t:t||""}}
function eqmx(L,R,op){return L+" "+(op||"=")+" "+R}

/* ---------------- radicals ---------------- */
/* √n = k√m */
function surd(n){var k=1,m=n;for(var f=2;f*f<=m;f++)while(m%(f*f)===0){m/=f*f;k*=f}return {k:k,m:m}}
function surdMX(n){if(n<0)return null;var s=surd(n);return s.m===1?String(s.k):(s.k===1?"":s.k)+"\\r{"+s.m+"}"}
/* (p ± q√m)/r simplified, as maths */
function quadRoots(a,b,c){/* integers */var D=b*b-4*a*c;if(D<0)return {D:D,none:true};if(D===0)return {D:0,exact:true,r:[F(-b,2*a),F(-b,2*a)]};var s=surd(D);
  if(s.m===1){return {D:D,exact:true,r:[F(-b+s.k,2*a),F(-b-s.k,2*a)]}}
  var g=gcd(gcd(Math.abs(b),s.k),Math.abs(2*a)),p=-b/g,q=s.k/g,r=2*a/g;if(r<0){p=-p;q=q;r=-r}
  var rad=(q===1?"":q)+"\\r{"+s.m+"}",num=(p?(p<0?M+Math.abs(p):p)+" ± "+rad:"±"+rad);
  var mx=r===1?num:"\\f{"+num+"}{"+r+"}";
  return {D:D,exact:false,mx:mx,v:[(-b+Math.sqrt(D))/(2*a),(-b-Math.sqrt(D))/(2*a)],sm:s}}

/* ---------------- solving one equation ---------------- */
function pickVar(vs,want){if(want&&vs.indexOf(want)>-1)return want;if(vs.indexOf("x")>-1)return "x";for(var i=0;i<vs.length;i++)if(vs[i]!=="y")return vs[i];return vs[0]}
function solveEq(lhs,rhs,want){var Ln=parse(lhs),Rn=parse(rhs),vs=Object.keys(varsOf({t:"=",a:Ln,b:Rn})).sort();
  if(!vs.length)return checkNumbers(Ln,Rn);
  var v=pickVar(vs,want),steps=[],title=eqmx(show(Ln),show(Rn));
  var out={kind:"solve",v:v,q:title,steps:steps};
  /* |A| = c */
  if(has(Ln,"abs")||has(Rn,"abs"))return solveAbs(Ln,Rn,v,out);
  if(has(Ln,"fn")||has(Rn,"fn"))return solveRadical(Ln,Rn,v,out);
  var Lp=toPoly(Ln),Rp=toPoly(Rn);
  if(!Lp||!Rp){var Lr=toRat(Ln),Rr=toRat(Rn);if(Lr&&Rr)return solveRational(Ln,Rn,Lr,Rr,v,out);return numericSolve(Ln,Rn,v,out)}
  var expanded=pmx(Lp)+" = "+pmx(Rp);if(expanded.replace(/\s/g,"")!==title.replace(/\s/g,""))steps.push(St(expanded,"Expand any brackets and combine like terms on each side."));
  /* clear fractions */
  var L=pden(padd(P(0),Lp)),R=pden(Rp),K=lcm(L,R);
  if(K>1){Lp=pscale(Lp,F(K));Rp=pscale(Rp,F(K));steps.push(St(pmx(Lp)+" = "+pmx(Rp),"Multiply **both sides by "+K+"** to clear the fractions."))}
  var D=psub(Lp,Rp),deg=pdeg(D,v),others=pvars(D).filter(function(w){return w!==v});
  out.Lp=Lp;out.Rp=Rp;
  if(others.length&&deg===1)return solveLiteral(D,v,out,Lp,Rp);
  if(others.length)return fail(out,"This has more than one unknown ("+pvars(D).join(", ")+"). Give me a second equation, or tell me which letter to solve for.");
  if(deg===0){if(pzero(D)){out.answer="\\t{every number works}";out.note="Both sides are always equal — the equation is true for **all real numbers** (infinitely many solutions).";out.sol="all";if(!steps.length||steps[steps.length-1].m!==pmx(Lp)+" = "+pmx(Rp))steps.push(St(pmx(Lp)+" = "+pmx(Rp),"Both sides are exactly the same."));else steps[steps.length-1].t+=" Now both sides are **exactly the same**."}
    else{out.answer="\\t{no solution}";out.note="The "+v+"-terms cancel and we're left with something false, so **no number works**.";out.sol=[];steps.push(St(fmx(pconst(pcoef(Lp,v,0))||F(0))+" = "+fmx(pconst(pcoef(Rp,v,0))||F(0)),"Take "+v+"-terms away from both sides: they cancel — and what's left is **false**."))}return out}
  if(deg===1)return linear(Lp,Rp,v,out,Ln,Rn);
  if(deg===2)return quadratic(D,v,out,Ln,Rn);
  return higher(D,v,out,Ln,Rn)}
function checkNumbers(Ln,Rn){var a=ev(Ln),b=ev(Rn),ok=Math.abs(a-b)<1e-9;return {kind:"check",q:show(Ln)+" = "+show(Rn),steps:[St(show(Ln)+" = "+dec(a),"Work out the left side."),St(show(Rn)+" = "+dec(b),"Work out the right side.")],answer:ok?"\\t{true}":"\\t{false}",note:ok?"Both sides are equal, so the statement is **true**.":"The sides are different, so the statement is **false**."}}
function fail(out,msg){out.fail=msg;return out}
function linear(Lp,Rp,v,out,Ln,Rn){var s=out.steps,a1=pcoef(Lp,v,1),b1=pcoef(Lp,v,0),a2=pcoef(Rp,v,1),b2=pcoef(Rp,v,0);
  a1=pconst(a1)||F(0);a2=pconst(a2)||F(0);b1=pconst(b1)||F(0);b2=pconst(b2)||F(0);var k,p,q,vx=function(c){return pmx(pscale(pvar(v),c))};
  if(!fz(a2)){if(fv(a1)>=fv(a2)){k=fsub(a1,a2);p=b1;q=b2;s.push(St(lin(k,p,v)+" = "+fmx(q),(fv(a2)>0?"Subtract **"+vx(a2)+"** from":"Add **"+vx(fneg(a2))+"** to")+" both sides, so all the "+v+"'s are on the left."))}
    else{k=fsub(a2,a1);p=b2;q=b1;s.push(St(fmx(q)+" = "+lin(k,p,v),(fv(a1)>0?"Subtract **"+vx(a1)+"** from":fz(a1)?"Keep":"Add **"+vx(fneg(a1))+"** to")+" both sides"+(fz(a1)?" — the "+v+"'s are already on the right.":" so the "+v+"'s gather on the right (where there are more of them).")));s.push(St(lin(k,p,v)+" = "+fmx(q),"Swap the sides so "+v+" is on the left (that's allowed)."))}}
  else{k=a1;p=b1;q=b2}
  var r=fsub(q,p);if(!fz(p))s.push(St(pmx(pscale(pvar(v),k))+" = "+fmx(r),(fv(p)>0?"Subtract **"+fmx(p)+"** from":"Add **"+fmx(fneg(p))+"** to")+" both sides to leave the "+v+"-term alone."));
  var x=fdiv(r,k);if(!(k.n===1&&k.d===1))s.push(St(v+" = "+(k.d===1?"\\f{"+fmx(r)+"}{"+fmx(k)+"}":fmx(r)+" ÷ "+fmx(k))+(fint(x)||k.d!==1?" = "+fmx(x):""),"Divide both sides by **"+fmx(k)+"**"+(k.n<0?" (a negative number — fine in an equation).":".")));
  out.sol=[x];out.answer=v+" = "+nice(x);addCheck(out,Ln,Rn,v,x);return out}
function lin(k,p,v){return pmx(padd(pscale(pvar(v),k),P(p)))}
function addCheck(out,Ln,Rn,v,x){try{var env={};env[v]=fv(x);var a=ev(Ln,env),b=ev(Rn,env);if(Math.abs(a-b)<1e-7*(1+Math.abs(a))){var val={t:"n",v:x};out.check=show(subst(Ln,v,val))+" = "+dec(a)+"  \\t{and}  "+show(subst(Rn,v,val))+" = "+dec(b)}}catch(e){}}
function quadratic(D,v,out,Ln,Rn){var s=out.steps,a=pconst(pcoef(D,v,2)),b=pconst(pcoef(D,v,1))||F(0),c=pconst(pcoef(D,v,0))||F(0);
  if(fv(a)<0){D=pneg(D);a=fneg(a);b=fneg(b);c=fneg(c)}
  var K=pden(D);if(K>1){D=pscale(D,F(K));a=fmul(a,F(K));b=fmul(b,F(K));c=fmul(c,F(K))}
  var g=gcd(gcd(a.n,b.n),c.n);
  var bq=pconst(pcoef(D,v,1))||F(0),stdShown=out.q&&out.q.replace(/\s/g,"")===(pmx(D)+" = 0").replace(/\s/g,"");
  if(!stdShown&&!(fz(bq)&&out.q&&/^[a-z]\^\{2\}=/.test(out.q.replace(/\s/g,""))))s.push(St(pmx(D)+" = 0","Move everything to one side so the other side is **0** (standard form a"+v+"² + b"+v+" + c = 0)."));
  if(g>1){D=pscale(D,F(1,g));a=F(a.n/g);b=F(b.n/g);c=F(c.n/g);s.push(St(pmx(D)+" = 0","Divide everything by **"+g+"** to make the numbers smaller."))}
  out.abc=[a.n,b.n,c.n];var A=a.n,B=b.n,C=c.n,sols=[];
  if(C===0){/* v(av+b)=0 */var r=F(-B,A);s.push(St(v+"("+lin(F(A),F(B),v)+") = 0","Every term has a **"+v+"**, so take it out as a common factor."));
    s.push(St(v+" = 0 \\t{  or  } "+lin(F(A),F(B),v)+" = 0","If two things multiply to 0, **one of them must be 0**."));sols=[F(0),r];out.answer=v+" = 0 \\t{ or } "+v+" = "+nice(r)}
  else if(B===0){var t=F(-C,A);if(!(out.q&&out.q.replace(/\s/g,"")===(v+"^{2} = "+fmx(t)).replace(/\s/g,"")))s.push(St(v+"^{2} = "+fmx(t),"Get "+v+"² alone."));
    if(t.n<0){out.answer="\\t{no real solution}";out.note="A square can never be negative, so there is no real solution.";out.sol=[];return out}
    var sq=sqrtF(t);if(sq){s.push(St(v+" = ±"+fmx(sq),"Take the square root — and remember **both** the positive and the negative root."));sols=[sq,fneg(sq)];out.answer=v+" = "+fmx(sq)+" \\t{ or } "+v+" = "+fmx(fneg(sq))}
    else{var num=t.n*t.d,sr=surdMX(num),rad=t.d===1?sr:"\\f{"+sr+"}{"+t.d+"}";s.push(St(v+" = ±"+rad,"Take the square root of both sides (± because both signs work)."));out.answer=v+" = ±"+rad+" ≈ ±"+dec(Math.sqrt(fv(t)),3);out.sol=[F(Math.sqrt(fv(t))),F(-Math.sqrt(fv(t)))];out.approx=true;return out}}
  else{var Q=quadRoots(A,B,C);s.push(St("\\t{discriminant } b^{2} − 4ac = "+(B<0?"("+M+Math.abs(B)+")":B)+"^{2} − 4("+(A<0?M+Math.abs(A):A)+")("+(C<0?M+Math.abs(C):C)+") = "+(Q.D<0?M+Math.abs(Q.D):Q.D),"Check the **discriminant** first: it tells us how many solutions there are ("+(Q.D>0?"positive → two":Q.D===0?"zero → exactly one":"negative → none")+")."));
    if(Q.none){out.answer="\\t{no real solution}";out.note="The discriminant is negative, so the parabola never touches the x-axis: **no real solutions**.";out.sol=[];return out}
    if(Q.exact){var r1=Q.r[0],r2=Q.r[1];var fx=factorStr(A,r1,r2,v);
      if(A===1)s.push(St(fx+" = 0","Factor: find two numbers that **multiply to "+fmx(F(C))+"** and **add to "+fmx(F(B))+"** → "+fmx(fneg(r1))+" and "+fmx(fneg(r2))+"."));
      else s.push(St(fx+" = 0","Factor the trinomial (the discriminant is a perfect square, so it factors nicely)."));
      if(!feq(r1,r2)){s.push(St(v+" = "+fmx(r1)+" \\t{  or  } "+v+" = "+fmx(r2),"Set **each factor equal to 0** and solve."));sols=[r1,r2].sort(function(x,y){return fv(x)-fv(y)});out.answer=v+" = "+nice(sols[0])+" \\t{ or } "+v+" = "+nice(sols[1])}
      else{s.push(St(v+" = "+fmx(r1),"Both factors are the same: one (double) solution."));sols=[r1];out.answer=v+" = "+nice(r1)}}
    else{s.push(St(v+" = \\f{"+M+"b ± \\r{b^{2} − 4ac}}{2a} = \\f{"+(B<0?Math.abs(B):M+B)+" ± \\r{"+Q.D+"}}{"+2*A+"}","It doesn't factor nicely, so use the **quadratic formula**."));
      s.push(St(v+" = "+Q.mx,"Simplify: \\r{"+Q.D+"} = "+surdMX(Q.D)+"."));out.answer=v+" = "+Q.mx;out.dec=Q.v.map(function(x){return dec(x,3)});out.sol=Q.v.map(function(x){return F(x)});out.approx=true;
      out.note="As decimals: "+v+" ≈ "+dec(Q.v[1],3)+" or "+v+" ≈ "+dec(Q.v[0],3)+".";}}
  if(sols.length){out.sol=sols;var chk=[];sols.forEach(function(x){try{var env={};env[v]=fv(x);if(Math.abs(ev(Ln,env)-ev(Rn,env))<1e-7)chk.push(v+" = "+fmx(x))}catch(e){}});if(chk.length===sols.length)out.check="\\t{both values make the two sides equal}"}
  out.tip="SAT shortcut: the two solutions **add up to "+fmx(F(-B,A))+"** (that's "+M+"b/a) and **multiply to "+fmx(F(C,A))+"** (that's c/a).";
  return out}
function factorStr(A,r1,r2,v){/* A(v−r1)(v−r2) with integer factors */function fac(r){var p=r.d,q=r.n;return "("+lin(F(p),F(-q),v)+")"}
  var k=A/(r1.d*r2.d);var pre=k===1?"":k===-1?M:String(k).replace("-",M);if(feq(r1,r2))return pre+fac(r1)+"^{2}";return pre+fac(r1)+fac(r2)}
function higher(D,v,out,Ln,Rn){var s=out.steps;var K=pden(D);if(K>1)D=pscale(D,F(K));var deg=pdeg(D,v),co=[];for(var e=deg;e>=0;e--)co.push(pconst(pcoef(D,v,e))||F(0));
  s.push(St(pmx(D)+" = 0","Move everything to one side."));
  /* common factor of v */var low=0;while(low<deg&&fz(co[deg-low]))low++;
  var roots=[];if(low>0){s.push(St(v+(low>1?"^{"+low+"}":"")+"("+pmx(polyFrom(co.slice(0,deg-low+1),v))+") = 0","Take out the common factor **"+v+(low>1?"^"+low:"")+"** → one solution is "+v+" = 0."));roots.push(F(0));co=co.slice(0,deg-low+1);deg-=low}
  var guard=0;while(deg>2&&guard++<6){var rr=ratRoot(co);if(!rr)break;roots.push(rr);var q=synth(co,rr).map(function(x){return fdiv(x,F(rr.d))});s.push(St("("+lin(F(rr.d),F(-rr.n),v)+")("+pmx(polyFrom(q,v))+") = 0","Try simple numbers: "+v+" = "+fmx(rr)+" makes it 0, so **("+ptx(polyFrom([F(rr.d),F(-rr.n)],v))+")** is a factor. Divide it out."));co=q;deg--}
  if(deg===2){var a=co[0],b=co[1],c=co[2],qp=padd(padd(pscale(ppow(pvar(v),2),a),pscale(pvar(v),b)),P(c));var sub=quadratic(qp,v,{steps:[],q:""},Ln,Rn);var first=true;sub.steps.forEach(function(x){if(/^Move everything/.test(x.t))return;if(first){x={m:x.m,t:"Now solve the other factor, "+ptx(qp)+" = 0. "+x.t};first=false}s.push(x)});if(sub.sol)roots=roots.concat(sub.sol)}
  else if(deg===1)roots.push(fdiv(fneg(co[1]),co[0]));
  else if(deg>2)return numericSolve(Ln,Rn,v,out);
  var seen={},uniq=[];roots.forEach(function(r){var k=dec(fv(r),6);if(!seen[k]){seen[k]=1;uniq.push(r)}});uniq.sort(function(x,y){return fv(x)-fv(y)});
  out.sol=uniq;out.answer=uniq.length?uniq.map(function(r){return v+" = "+nice(r)}).join(" \\t{ or } "):"\\t{no real solution}";return out}
function polyFrom(co,v){var A={},n=co.length-1;co.forEach(function(c,i){A=padd(A,pscale(ppow(pvar(v),n-i),c))});return A}
function ratRoot(co){var a=co[0],c=co[co.length-1];if(!fint(a)||!fint(c))return null;if(c.n===0)return F(0);
  var ps=divisors(Math.abs(c.n)),qs=divisors(Math.abs(a.n));for(var i=0;i<ps.length;i++)for(var j=0;j<qs.length;j++)for(var sg=1;sg>=-1;sg-=2){var r=F(sg*ps[i],qs[j]),val=F(0);co.forEach(function(k){val=fadd(fmul(val,r),k)});if(fz(val))return r}return null}
function divisors(n){var d=[];for(var i=1;i<=n&&i<=10000;i++)if(n%i===0)d.push(i);return d}
function synth(co,r){var out=[],acc=F(0);for(var i=0;i<co.length-1;i++){acc=fadd(fmul(acc,r),co[i]);out.push(acc)}return out}
function pmxNice(A){var ks=ordered(A);if(ks.length>1&&A[ks[0]].n<0){for(var i=1;i<ks.length;i++)if(A[ks[i]].n>0){var o={};o[ks[i]]=A[ks[i]];var rest={};ks.forEach(function(k,j){if(j!==i)rest[k]=A[k]});return pmx(o)+" "+pmx(rest).replace(/^−/,"− ").replace(/^(?!− )/,"+ ")}}return pmx(A)}
function solveLiteral(D,v,out,Lp,Rp){var s=out.steps,A=pcoef(D,v,1),B=pcoef(D,v,0);if(A[ordered(A)[0]].n<0){A=pneg(A);B=pneg(B)}var N=pneg(B),Dn=A;
  /* tidy: no fractions, positive leading coefficient */var k=lcm(pden(N),pden(Dn));if(k>1){N=pscale(N,F(k));Dn=pscale(Dn,F(k))}
  var lead=Dn[ordered(Dn)[0]];if(lead&&lead.n<0){N=pneg(N);Dn=pneg(Dn)}
  var g=gcd(pnumgcd(N),pnumgcd(Dn));if(g>1){N=pscale(N,F(1,g));Dn=pscale(Dn,F(1,g))}
  var Ac=pconst(A),Am=Object.keys(A).length===1&&!Ac?pmx(A):"("+pmx(A)+")";s.push(St((Ac?(Ac.n===1&&Ac.d===1?"":fmx(Ac)):Am)+v+" = "+pmxNice(pneg(B)),"Get every **"+v+"**-term on one side and everything else on the other."));
  var dc=pconst(Dn);out.answer=v+" = "+(dc&&dc.n===1&&dc.d===1?pmxNice(N):"\\f{"+pmxNice(N)+"}{"+pmxNice(Dn)+"}");
  s.push(St(out.answer,"Divide both sides by what multiplies "+v+"."));out.literal=true;return out}
function solveRational(Ln,Rn,Lr,Rr,v,out){var s=out.steps;var Lh=pmul(Lr.N,Rr.D),Rh=pmul(Rr.N,Lr.D);
  s.push(St(pmx(Lh)+" = "+pmx(Rh),"The unknown is in a denominator, so **multiply both sides by the denominators** (cross-multiply) to clear them."));
  var D=psub(Lh,Rh),deg=pdeg(D,v),bad=[],sub;
  var inner={kind:"solve",v:v,steps:[]};
  if(deg===1)sub=linear(Lh,Rh,v,inner,Ln,Rn);else if(deg===2)sub=quadratic(D,v,inner,Ln,Rn);else if(deg===0)return fail(out,"After clearing the fractions the "+v+"'s cancel — there's no solution.");else sub=higher(D,v,inner,Ln,Rn);
  sub.steps.forEach(function(x){s.push(x)});var good=[];(sub.sol||[]).forEach(function(x){var ok=true;try{var env={};env[v]=fv(x);var a=ev(Ln,env),b=ev(Rn,env);if(!isFinite(a)||!isFinite(b)||Math.abs(a-b)>1e-7)ok=false}catch(e){ok=false}if(ok)good.push(x);else bad.push(x)});
  if(bad.length)s.push(St(bad.map(function(x){return v+" ≠ "+fmx(x)}).join(", "),"**Check:** "+bad.map(function(x){return v+" = "+fmx(x)}).join(", ")+" would make a denominator 0 (or fails the original), so it is **not** a real solution."));
  out.sol=good;out.answer=good.length?good.map(function(x){return v+" = "+nice(x)}).join(" \\t{ or } "):"\\t{no solution}";return out}
function solveAbs(Ln,Rn,v,out){var s=out.steps,L=unpar(Ln),R=unpar(Rn);if(L.t!=="abs"&&R.t==="abs"){var t=L;L=R;R=t}
  if(L.t!=="abs"||hasVar(R,v))return numericSolve(Ln,Rn,v,out);
  var c=toPoly(R),cc=c&&pconst(c);if(!cc)return numericSolve(Ln,Rn,v,out);
  if(cc.n<0){out.answer="\\t{no solution}";out.note="An absolute value is a **distance**, so it can't be negative.";out.sol=[];s.push(St("|"+show(L.a)+"| = "+fmx(cc),"Absolute value is never negative."));return out}
  s.push(St(show(L.a)+" = "+fmx(cc)+" \\t{  or  } "+show(L.a)+" = "+fmx(fneg(cc)),"Absolute value = distance from 0, so the inside is **"+fmx(cc)+" or "+fmx(fneg(cc))+"**."));
  var sols=[];[cc,fneg(cc)].forEach(function(k,i){if(i&&fz(cc))return;var sub=solveEq(stringify(L.a),fstr(k).replace(M,"-"),v);if(sub.sol)sols=sols.concat(sub.sol);var last=sub.steps[sub.steps.length-1];if(sub.answer)s.push(St(sub.answer,"Solve case "+(i+1)+"."))});
  sols.sort(function(x,y){return fv(x)-fv(y)});out.sol=sols;out.answer=sols.map(function(x){return v+" = "+nice(x)}).join(" \\t{ or } ");return out}
function solveRadical(Ln,Rn,v,out){var s=out.steps,L=unpar(Ln),R=unpar(Rn);if(!(L.t==="fn"&&L.f==="sqrt")&&R.t==="fn"&&R.f==="sqrt"){var t=L;L=R;R=t}
  if(!(L.t==="fn"&&L.f==="sqrt"))return numericSolve(Ln,Rn,v,out);
  var A=toPoly(L.a),B=toPoly(R);if(!A||!B)return numericSolve(Ln,Rn,v,out);
  var B2=pmul(B,B);s.push(St(pmx(A)+" = "+(pconst(B)?fmx(pconst(B2)):"("+pmx(B)+")^{2}"),"**Square both sides** to remove the square root."));
  if(!pconst(B))s.push(St(pmx(A)+" = "+pmx(B2),"Expand the right side."));
  var D=psub(A,B2),deg=pdeg(D,v),inner={kind:"solve",v:v,steps:[]},sub;
  if(deg===1)sub=linear(A,B2,v,inner,Ln,Rn);else if(deg===2)sub=quadratic(D,v,inner,Ln,Rn);else return numericSolve(Ln,Rn,v,out);
  sub.steps.forEach(function(x){s.push(x)});var good=[],bad=[];(sub.sol||[]).forEach(function(x){try{var env={};env[v]=fv(x);if(Math.abs(ev(Ln,env)-ev(Rn,env))<1e-7)good.push(x);else bad.push(x)}catch(e){bad.push(x)}});
  if(bad.length)s.push(St(bad.map(function(x){return v+" = "+fmx(x)+" \\t{ ✗}"}).join(", "),"**Check in the original:** squaring can create fake (extraneous) answers — "+bad.map(function(x){return fmx(x)}).join(", ")+" fails, so throw it away."));
  else if(good.length)s.push(St(good.map(function(x){return v+" = "+fmx(x)+" \\t{ ✓}"}).join(", "),"**Check in the original** (always do this after squaring) — it works."));
  out.sol=good;out.answer=good.length?good.map(function(x){return v+" = "+nice(x)}).join(" \\t{ or } "):"\\t{no solution}";return out}
function numericSolve(Ln,Rn,v,out){var f=function(x){var e={};e[v]=x;return ev(Ln,e)-ev(Rn,e)},roots=[];
  var prev=null,px=-200;for(var i=0;i<=8000;i++){var x=-200+i*0.05,y;try{y=f(x)}catch(e){y=NaN}if(isFinite(y)&&Math.abs(y)<1e-12)roots.push(x);
    else if(isFinite(y)&&prev!==null&&isFinite(prev)&&prev*y<0){var a=px,b=x;for(var k=0;k<70;k++){var m=(a+b)/2,fm=f(m);if(f(a)*fm<=0)b=m;else a=m}var r=(a+b)/2;if(Math.abs(f(r))<1e-6)roots.push(r)}prev=y;px=x}
  var u=[];roots.forEach(function(r){if(!u.some(function(z){return Math.abs(z-r)<1e-6}))u.push(r)});
  out.steps.push(St(show(Ln)+" = "+show(Rn),"This one doesn't simplify to a polynomial, so I find where the two sides are equal **numerically** (like reading the graph where they cross)."));
  u=u.map(function(r){return Math.abs(r-Math.round(r))<1e-7?Math.round(r):r});out.sol=u.map(function(r){return F(Math.round(r*1e6)/1e6)});out.approx=!u.every(function(r){return r%1===0});out.answer=u.length?u.map(function(r){return v+(r%1===0?" = "+String(r).replace("-",M):" ≈ "+dec(r,4))}).join(" \\t{ or } "):"\\t{no real solution found between −200 and 200}";return out}
function stringify(n){return show(n).replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g,"($1)/($2)").replace(/\\r\{([^{}]*)\}/g,"sqrt($1)").replace(/\^\{([^{}]*)\}/g,"^($1)").replace(/·/g,"*").replace(/−/g,"-")}

/* ---------------- inequalities ---------------- */
function cmp(a,op,b){return op==="<"?a<b:op===">"?a>b:op==="<="?a<=b+1e-12:a>=b-1e-12}
function solveIneq(lhs,op,rhs,want){var Ln=parse(lhs),Rn=parse(rhs),vs=Object.keys(varsOf({a:Ln,b:Rn})).sort(),v=pickVar(vs,want),s=[],out={kind:"ineq",v:v,q:show(Ln)+" "+sym(op)+" "+show(Rn),steps:s};
  if(unpar(Ln).t==="abs"&&!hasVar(Rn))return absIneq(unpar(Ln).a,op,Rn,v,out);
  var Lp=toPoly(Ln),Rp=toPoly(Rn);if(!Lp||!Rp||pvars(psub(Lp,Rp)).length>1)return fail(out,"I can solve linear and quadratic inequalities in one letter step by step. For this one, try graphing both sides.");
  var D=psub(Lp,Rp),deg=pdeg(D,v);
  if(deg===0){var c0=fv(pconst(D)||F(0)),ok=cmp(c0,op,0);s.push(St(fmx(pconst(pcoef(Lp,v,0))||F(0))+" "+sym(op)+" "+fmx(pconst(pcoef(Rp,v,0))||F(0)),"Take the "+v+"-terms away from both sides — they cancel."));out.answer=ok?"\\t{all real numbers}":"\\t{no solution}";out.note=ok?"What's left is always **true**, so every number works.":"What's left is **false**, so no number works.";return out}
  if(deg===2)return quadIneq(D,op,v,out);
  if(deg!==1)return fail(out,"That's degree "+deg+" — try graphing it and reading where it's above or below zero.");
  var k=pconst(pcoef(D,v,1)),c=pconst(pcoef(D,v,0))||F(0);
  s.push(St(pmx(pscale(pvar(v),k))+" "+sym(op)+" "+fmx(fneg(c)),"Collect the "+v+"-terms on the left and the numbers on the right (same moves as an equation)."));
  var r=fdiv(fneg(c),k),o=op;if(k.n<0){o=flip(op);s.push(St(v+" "+sym(o)+" "+fmx(r),"Divide by **"+fmx(k)+"**. It's negative, so **flip the inequality sign**!"))}
  else if(!(k.n===1&&k.d===1))s.push(St(v+" "+sym(o)+" "+fmx(r),"Divide both sides by **"+fmx(k)+"** (positive, so the sign stays)."));
  out.answer=v+" "+sym(o)+" "+nice(r);out.rel=[o,r];out.note="On a number line: "+(o.indexOf("=")>-1?"a **filled** dot at ":"an **open** dot at ")+fstr(r)+", shading to the **"+(o[0]==="<"?"left":"right")+"**.";
  out.interval=o==="<"?"(−∞, "+fstr(r)+")":o==="<="?"(−∞, "+fstr(r)+"]":o===">"?"("+fstr(r)+", ∞)":"["+fstr(r)+", ∞)";return out}
function quadIneq(D,op,v,out){var s=out.steps,a=pconst(pcoef(D,v,2));if(a.n<0){D=pneg(D);a=fneg(a);op=flip(op);s.push(St(pmx(D)+" "+sym(op)+" 0","Multiply by −1 (flip the sign) so the "+v+"² term is positive."))}
  var K=pden(D);if(K>1)D=pscale(D,F(K));var A=pconst(pcoef(D,v,2)).n,B=(pconst(pcoef(D,v,1))||F(0)).n,C=(pconst(pcoef(D,v,0))||F(0)).n,Q=quadRoots(A,B,C);
  s.push(St(pmx(D)+" "+sym(op)+" 0","Everything on one side; the other side is 0."));
  if(Q.none||Q.D===0&&!Q.exact){var pos=op[0]===">";out.answer=pos?"\\t{all real numbers}":"\\t{no solution}";out.note="The parabola opens up and never dips below the x-axis.";return out}
  var r1,r2,lab1,lab2;if(Q.exact){r1=Q.r[1];r2=Q.r[0];if(fv(r1)>fv(r2)){var t=r1;r1=r2;r2=t}lab1=fmx(r1);lab2=fmx(r2)}else{r1=F(Math.min(Q.v[0],Q.v[1]));r2=F(Math.max(Q.v[0],Q.v[1]));lab1=dec(fv(r1),3);lab2=dec(fv(r2),3)}
  s.push(St(v+" = "+lab1+" \\t{ and } "+v+" = "+lab2,"Find where it equals 0 — these are the boundary points."));
  var between=op[0]==="<",eq=op.length>1;s.push(St(between?lab1+" "+(eq?"≤":"<")+" "+v+" "+(eq?"≤":"<")+" "+lab2:v+" "+(eq?"≤":"<")+" "+lab1+" \\t{ or } "+v+" "+(eq?"≥":">")+" "+lab2,"The U-shaped graph is **below** zero between the roots and **above** zero outside them."));
  out.answer=s[s.length-1].m;return out}
function absIneq(A,op,Rn,v,out){var s=out.steps,c=pconst(toPoly(Rn)||{})||null;if(!c)return fail(out,"I need a number on the other side.");
  if(c.n<0&&op[0]==="<"){out.answer="\\t{no solution}";out.note="An absolute value is never negative.";s.push(St("|"+show(A)+"| "+sym(op)+" "+fmx(c),"A distance can't be less than a negative number."));return out}
  if(c.n<0){out.answer="\\t{all real numbers}";s.push(St("|"+show(A)+"| "+sym(op)+" "+fmx(c),"Any distance is bigger than a negative number."));return out}
  if(op[0]==="<"){s.push(St(fmx(fneg(c))+" "+sym(op)+" "+show(A)+" "+sym(op)+" "+fmx(c),"|stuff| "+sym(op)+" "+fstr(c)+" means the stuff is **within "+fstr(c)+" of 0**: sandwich it."));var r=solveCompound(fstr(fneg(c)).replace(M,"-"),op,stringify(A),op,fstr(c).replace(M,"-"),v);r.steps.forEach(function(x){s.push(x)});out.answer=r.answer;out.interval=r.interval;return out}
  s.push(St(show(A)+" "+(op===">"?"<":"≤")+" "+fmx(fneg(c))+" \\t{  or  } "+show(A)+" "+sym(op)+" "+fmx(c),"|stuff| "+sym(op)+" "+fstr(c)+" means the stuff is **more than "+fstr(c)+" away from 0** — on either side."));
  var r1=solveIneq(stringify(A),op===">"?"<":"<=",fstr(fneg(c)).replace(M,"-"),v),r2=solveIneq(stringify(A),op,fstr(c).replace(M,"-"),v);out.answer=(r1.answer||"?")+" \\t{ or } "+(r2.answer||"?");return out}
function solveCompound(a,op1,mid,op2,b,want){var Mn=parse(mid),vs=Object.keys(varsOf(Mn)),v=pickVar(vs,want),s=[],Lc=pconst(toPoly(parse(a))||{}),Rc=pconst(toPoly(parse(b))||{}),P2=toPoly(Mn),out={kind:"ineq",v:v,q:fmx(Lc||F(0))+" "+sym(op1)+" "+show(Mn)+" "+sym(op2)+" "+fmx(Rc||F(0)),steps:s};
  if(!Lc||!Rc||!P2||pdeg(P2,v)!==1||pvars(P2).length>1)return fail(out,"I can solve a three-part inequality when the middle is a straight-line expression in one letter.");
  var k=pconst(pcoef(P2,v,1)),c=pconst(pcoef(P2,v,0))||F(0),L1=fsub(Lc,c),R1=fsub(Rc,c);
  if(!fz(c))s.push(St(fmx(L1)+" "+sym(op1)+" "+pmx(pscale(pvar(v),k))+" "+sym(op2)+" "+fmx(R1),(fv(c)>0?"Subtract **"+fmx(c)+"** from":"Add **"+fmx(fneg(c))+"** to")+" **all three parts**."));
  var L2=fdiv(L1,k),R2=fdiv(R1,k),o1=op1,o2=op2;if(k.n<0){var t=L2;L2=R2;R2=t;o1=flip(op2);o2=flip(op1);o1=o1.replace(">","<");o2=o2.replace(">","<");s.push(St(fmx(L2)+" "+sym(o1)+" "+v+" "+sym(o2)+" "+fmx(R2),"Divide all three parts by **"+fmx(k)+"** — negative, so both signs flip (and we rewrite it smallest-first)."))}
  else if(!(k.n===1&&k.d===1))s.push(St(fmx(L2)+" "+sym(o1)+" "+v+" "+sym(o2)+" "+fmx(R2),"Divide all three parts by **"+fmx(k)+"**."));
  out.answer=fmx(L2)+" "+sym(o1)+" "+v+" "+sym(o2)+" "+fmx(R2);out.interval=(o1==="<"?"(":"[")+fstr(L2)+", "+fstr(R2)+(o2==="<"?")":"]");return out}
function sym(o){return o==="<="?"≤":o===">="?"≥":o}
function flip(o){return {"<":">",">":"<","<=":">=",">=":"<="}[o]}

/* ---------------- systems of two linear equations ---------------- */
function solveSystem(e1,e2){var p1=splitEq(e1),p2=splitEq(e2);var A=psub(toPoly(parse(p1[0])),toPoly(parse(p1[1]))),B=psub(toPoly(parse(p2[0])),toPoly(parse(p2[1])));
  var vs=pvars(A).concat(pvars(B)).filter(function(v,i,a){return a.indexOf(v)===i}).sort();var s=[],out={kind:"system",steps:s,q:show(parse(p1[0]))+" = "+show(parse(p1[1]))+" \\t{ and } "+show(parse(p2[0]))+" = "+show(parse(p2[1]))};
  if(vs.length!==2||pdeg(A)>1||pdeg(B)>1)return fail(out,"I can solve two straight-line equations with two unknowns (like x and y).");
  var x=vs[0],y=vs[1];function cf(E,v){return pconst(pcoef(pcoef(E,v===x?y:x,0),v,1))||F(0)}
  var a1=cf(A,x),b1=cf(A,y),c1=fneg(pconst(pcoef(pcoef(A,x,0),y,0))||F(0)),a2=cf(B,x),b2=cf(B,y),c2=fneg(pconst(pcoef(pcoef(B,x,0),y,0))||F(0));
  /* integer coefficients */var k1=lcm(lcm(a1.d,b1.d),c1.d),k2=lcm(lcm(a2.d,b2.d),c2.d);a1=fmul(a1,F(k1));b1=fmul(b1,F(k1));c1=fmul(c1,F(k1));a2=fmul(a2,F(k2));b2=fmul(b2,F(k2));c2=fmul(c2,F(k2));
  var E=function(a,b,c){return pmx(padd(pscale(pvar(x),a),pscale(pvar(y),b)))+" = "+fmx(c)};
  s.push(St(E(a1,b1,c1)+" \\t{   (1)}","Write equation (1) neatly: "+x+"'s, then "+y+"'s, then = number."));s.push(St(E(a2,b2,c2)+" \\t{   (2)}","Same for equation (2)."));
  var det=a1.n*b2.n-a2.n*b1.n;
  if(det===0){var same=a1.n*c2.n===a2.n*c1.n&&b1.n*c2.n===b2.n*c1.n;out.answer=same?"\\t{infinitely many solutions}":"\\t{no solution}";out.note=same?"The two equations are the **same line** — every point on it works.":"The lines have the **same slope but different intercepts** — they're parallel and never meet.";out.special=same?"inf":"none";return out}
  /* eliminate the letter whose coefficients need the smaller multipliers */
  var Ly=lcm(Math.abs(b1.n),Math.abs(b2.n)),Lx=lcm(Math.abs(a1.n),Math.abs(a2.n)),elimY=b1.n&&b2.n&&(!a1.n||!a2.n||Ly<=Lx);
  var e=elimY?y:x,keep=elimY?x:y,c1e=elimY?b1.n:a1.n,c2e=elimY?b2.n:a2.n;
  if(!c1e||!c2e){/* one equation already lacks a letter: solve it directly */}
  var L=lcm(Math.abs(c1e),Math.abs(c2e))||1,m1=c1e?L/Math.abs(c1e):1,m2=c2e?L/Math.abs(c2e):1,add=(c1e>0)!==(c2e>0);
  var A1=[F(a1.n*m1),F(b1.n*m1),F(c1.n*m1)],A2=[F(a2.n*m2),F(b2.n*m2),F(c2.n*m2)];
  if(m1!==1)s.push(St(E(A1[0],A1[1],A1[2]),"Multiply (1) by **"+m1+"**"+" so the "+e+"'s will cancel."));
  if(m2!==1)s.push(St(E(A2[0],A2[1],A2[2]),"Multiply (2) by **"+m2+"**."));
  var R=add?[fadd(A1[0],A2[0]),fadd(A1[1],A2[1]),fadd(A1[2],A2[2])]:[fsub(A1[0],A2[0]),fsub(A1[1],A2[1]),fsub(A1[2],A2[2])];
  var kc=elimY?R[0]:R[1];s.push(St(pmx(pscale(pvar(keep),kc))+" = "+fmx(R[2]),(add?"**Add**":"**Subtract**")+" the equations: the **"+e+"**'s cancel."));
  var kv=fdiv(R[2],kc);s.push(St(keep+" = "+fmx(kv),"Divide by "+fmx(kc)+"."));
  /* back-substitute into (1) (or (2) if (1) lacks the other letter) */
  var useA=elimY?b1.n!==0:a1.n!==0,aa=useA?a1:a2,bb=useA?b1:b2,cc=useA?c1:c2;var ov;
  function sub1(c,val,w,cw){/* c·(val) + cw·w */var t1=fz(c)?"":c.n===1&&c.d===1?(val.n<0?"("+fmx(val)+")":fmx(val)):(c.n===-1&&c.d===1?M:fmx(c))+"("+fmx(val)+")";var t2=(cw.n===1&&cw.d===1?"":cw.n===-1&&cw.d===1?M:fmx(cw))+w;return t1?(elimY?t1+" + "+t2:t2+" + "+t1):t2}
  if(elimY){ov=fdiv(fsub(cc,fmul(aa,kv)),bb);s.push(St(sub1(aa,kv,y,bb)+" = "+fmx(cc)+" \\t{ → } "+y+" = "+fmx(ov),"Put "+keep+" = "+fmx(kv)+" back into equation ("+(useA?1:2)+") and solve for "+y+"."))}
  else{ov=fdiv(fsub(cc,fmul(bb,kv)),aa);s.push(St(sub1(bb,kv,x,aa)+" = "+fmx(cc)+" \\t{ → } "+x+" = "+fmx(ov),"Put "+keep+" = "+fmx(kv)+" back into equation ("+(useA?1:2)+") and solve for "+x+"."))}
  var X=elimY?kv:ov,Y=elimY?ov:kv;out.sol={};out.sol[x]=X;out.sol[y]=Y;out.answer=x+" = "+nice(X)+", \\s "+y+" = "+nice(Y);
  out.check="("+fmx(X)+", "+fmx(Y)+") \\t{ works in both equations}";out.note="On a graph, the two lines **cross at ("+fstr(X)+", "+fstr(Y)+")**.";return out}
function eqSide(E,vs){return E}
function splitEq(s){var p=clean(s).split("=");if(p.length!==2)throw new Error("Each equation needs one “=” sign");return p}

/* ---------------- expressions: simplify · expand · factor · evaluate ---------------- */
function evaluate(str){var n=parse(str);if(hasVar(n))return null;var s=[],cur=n,guard=0,last=show(n),u=unpar(n);
  /* sin/cos/tan of an angle: give the exact value when it's a special angle (π/6 → 30° …) */
  if(u.t==="fn"&&/^(sin|cos|tan)$/.test(u.f)){var deg=has(u.a,"pi")?ev(u.a)*180/Math.PI:ev(u.a);deg=Math.round(deg*1e6)/1e6;var tr=trig(u.f+" "+deg);if(tr){if(has(u.a,"pi"))tr.steps.unshift(St(show(u.a)+" = "+dec(deg,4)+"°","Change radians to degrees: replace π with 180°."));tr.q=show(n);return tr}}
  /* √n → simplest radical form */
  if(u.t==="fn"&&u.f==="sqrt"&&unpar(u.a).t==="n"&&fint(unpar(u.a).v)&&unpar(u.a).v.n>0){var N=unpar(u.a).v.n,sd=surd(N);if(sd.m===1)return {kind:"eval",q:show(n),steps:[St("\\r{"+N+"} = "+sd.k,sd.k+" × "+sd.k+" = "+N+".")],answer:String(sd.k),val:sd.k};
    if(sd.k===1)return {kind:"eval",q:show(n),steps:[St("\\r{"+N+"} ≈ "+dec(Math.sqrt(N),4),N+" has no perfect-square factor, so √"+N+" is already as simple as it gets.")],answer:"\\r{"+N+"} ≈ "+dec(Math.sqrt(N),4),val:Math.sqrt(N)};
    return {kind:"eval",q:show(n),steps:[St("\\r{"+N+"} = \\r{"+sd.k*sd.k+" · "+sd.m+"}","Find the **biggest perfect square** that divides "+N+": "+sd.k*sd.k+"."),St("= \\r{"+sd.k*sd.k+"} · \\r{"+sd.m+"} = "+sd.k+"\\r{"+sd.m+"}","Split the root and take the square root of the perfect square.")],answer:sd.k+"\\r{"+sd.m+"} ≈ "+dec(Math.sqrt(N),4),val:Math.sqrt(N)}}
  while(guard++<16){var nx=reduceOnce(cur);if(!nx)break;cur=nx;var sh=show(cur);if(sh!==last){s.push(St(sh,""));last=sh}}
  var val=ev(n),ex=null;try{ex=toPoly(n)}catch(e){}var exact=ex&&pconst(ex);if(exact&&isNaN(exact.n))exact=null;
  if(!isFinite(val)||exact===null&&isNaN(val))return {kind:"eval",q:show(n),steps:[St(show(n),"Somewhere this divides by **0** (or takes an impossible value) — that has no answer.")],answer:"\\t{undefined}",val:NaN};
  if(!exact&&Math.abs(val-Math.round(val))<1e-9)exact=F(Math.round(val));
  var ans=exact?(fint(exact)?fmx(exact):fmx(exact)+" ≈ "+dec(fv(exact),4)):dec(val,6);
  if(s.length&&!s[0].t)s[0].t=/÷|\/\s*\(?\s*\d+\s*\/|\)\s*\/\s*\(/.test(str)&&/·/.test(s[0].m)?"Dividing by a fraction = **multiplying by its reciprocal** (flip it).":/\\f\{\d+\}\{(\d+)\} [+−] \\f\{\d+\}\{\1\}/.test(s[0].m)&&/[+−-]/.test(str)?"Rewrite the fractions over a **common denominator**.":"Follow the order of operations (brackets → powers → × ÷ → + −), one piece at a time.";
  return {kind:"eval",q:show(n),steps:s.slice(0,14),answer:ans,val:val,exact:exact}}
function isFracLit(n){n=unpar(n);return n.t==="/"&&unpar(n.a).t==="n"&&unpar(n.b).t==="n"&&fint(unpar(n.a).v)&&fint(unpar(n.b).v)}
function isNumLike(n){n=unpar(n);return n.t==="n"||n.t==="pi"||isFracLit(n)||(n.t==="neg"&&isNumLike(n.a))}
function fracOf(n){n=unpar(n);if(n.t==="n")return n.v;if(isFracLit(n))return fdiv(unpar(n.a).v,unpar(n.b).v);if(n.t==="neg")return fneg(fracOf(n.a));return null}
function reduceOnce(n){if(!n)return null;var u=n.t;
  if(u==="n"||u==="v"||u==="pi")return null;
  if(isFracLit(n)){var z0=unpar(n),fa0=unpar(z0.a).v,fb0=unpar(z0.b).v;if(fb0.n===1||gcd(fa0.n,fb0.n)>1||fb0.n<0)return {t:"n",v:fdiv(fa0,fb0)};return null}
  if((u==="+"||u==="-")&&isNumLike(n.a)&&isNumLike(n.b)&&(isFracLit(n.a)||isFracLit(n.b))&&unpar(n.a).t!=="pi"&&unpar(n.b).t!=="pi"){var xa=unpar(n.a),xb=unpar(n.b),da=isFracLit(xa)?unpar(xa.b).v.n:1,db=isFracLit(xb)?unpar(xb.b).v.n:1;
    if(da===db&&isFracLit(xa)&&isFracLit(xb)){var na=unpar(xa.a).v,nb2=unpar(xb.a).v;return {t:"/",a:{t:"n",v:u==="+"?fadd(na,nb2):fsub(na,nb2)},b:{t:"n",v:F(da)}}}
    var fa1=fracOf(xa),fb1=fracOf(xb),L1=lcm(fa1.d,fb1.d);function fr1(f){return {t:"/",a:{t:"n",v:F(f.n*L1/f.d)},b:{t:"n",v:F(L1)}}}return {t:u,a:fr1(fa1),b:fr1(fb1)}}
  if(u==="par"){var r=reduceOnce(n.a);if(r){if(unpar(r).t==="n")return unpar(r);return {t:"par",a:r,sub:n.sub}}if(unpar(n.a).t==="n")return unpar(n.a);return null}
  var kids=["a","b"].filter(function(k){return n[k]});for(var i=0;i<kids.length;i++){var c=n[kids[i]],rc=reduceOnce(c);if(rc){var o={};for(var k in n)o[k]=n[k];o[kids[i]]=rc;return o}}
  if(n.a&&!isNumLike(n.a)||n.b&&!isNumLike(n.b))return null;
  /* dividing by a fraction: multiply by its reciprocal */
  if(u==="/"&&unpar(n.b).t!=="pi"&&unpar(n.a).t!=="pi"){var fb2=fracOf(n.b),fa2=fracOf(n.a);if(fb2&&fa2&&fb2.d>1&&!fz(fb2))return {t:"*",a:n.a,b:Math.abs(fb2.n)===1?{t:"n",v:F(fb2.d*(fb2.n<0?-1:1))}:{t:"/",a:{t:"n",v:F(fb2.d*(fb2.n<0?-1:1))},b:{t:"n",v:F(Math.abs(fb2.n))}},recip:1}}
  /* adding fractions: rewrite over a common denominator first */
  if((u==="+"||u==="-")&&(isFracLit(n.a)||isFracLit(n.b))){var fa=fracOf(n.a),fb=fracOf(n.b);if(fa&&fb&&fa.d!==fb.d){var L=lcm(fa.d,fb.d);function fr(f){return {t:"/",a:{t:"n",v:F(f.n*L/f.d)},b:{t:"n",v:F(L)}}}return {t:u,a:fr(fa),b:fr(fb)}}}
  if(u==="fn"&&n.f==="sqrt"){var c0=fracOf(n.a);if(c0&&c0.n>=0){var sq=sqrtF(c0);if(sq)return {t:"n",v:sq}}}
  try{var p=toPoly(n),c2=p&&pconst(p);if(c2)return {t:"n",v:c2};var val=ev(n);if(isFinite(val))return {t:"n",v:F(Math.round(val*1e6)/1e6)}}catch(e){}return null}
function simplify(str){var n=parse(str),p=toPoly(n);if(!p)return null;var s=[];var sh=show(n),pm=pmx(p);if(sh.replace(/\s/g,"")!==pm.replace(/\s/g,""))s.push(St(pm,"Expand the brackets and **combine like terms** (same letter, same power)."));
  return {kind:"simplify",q:sh,steps:s,answer:pm,poly:p}}
function factor(str){var n=parse(str),p=toPoly(n);if(!p)return null;var vs=pvars(p),s=[],out={kind:"factor",q:show(n),steps:s};
  /* greatest common factor */var K=pden(p);var g=pnumgcd(pscale(p,F(K)));var q=pscale(p,F(K,g));var gc=F(g,K);
  /* common variable power */var common={};vs.forEach(function(v){var mn=99;for(var k in q){var e=mono(k)[v]||0;if(e<mn)mn=e}if(mn>0&&mn<99)common[v]=mn});
  var lead=q[ordered(q)[0]];if(lead.n<0){gc=fneg(gc);q=pneg(q)}
  var cm=mkey(common);if(cm){var div={};for(var k in q){var m=mono(k);for(var v in common)m[v]-=common[v];div[mkey(m)]=q[k]}q=div}
  var pre=(gc.n===1&&gc.d===1?"":gc.n===-1&&gc.d===1?M:fmx(gc))+(cm?monoMX(cm):"");
  if(pre)s.push(St(pre+"("+pmx(q)+")","Take out the **greatest common factor**: "+pre+"."));
  var v=pvars(q)[0],inner=pmx(q),f=null;
  if(pvars(q).length===1&&pdeg(q,v)===2){var a=pconst(pcoef(q,v,2)),b=pconst(pcoef(q,v,1))||F(0),c=pconst(pcoef(q,v,0))||F(0);
    if(fint(a)&&fint(b)&&fint(c)){var Q=quadRoots(a.n,b.n,c.n);if(!Q.none&&Q.exact){f=factorStr(a.n,Q.r[0],Q.r[1],v);
      if(b.n===0&&c.n<0)s.push(St(f,"It's a **difference of squares**: a² − b² = (a − b)(a + b)."));
      else if(a.n===1)s.push(St(f,"Find two numbers that **multiply to "+fmx(c)+"** and **add to "+fmx(b)+"**: "+fmx(fneg(Q.r[0]))+" and "+fmx(fneg(Q.r[1]))+"."));
      else s.push(St(f,"Split the middle term (ac method): a·c = "+fmx(F(a.n*c.n))+"; find two numbers that multiply to "+fmx(F(a.n*c.n))+" and add to "+fmx(b)+"."))}}}
  else if(pvars(q).length===1&&pdeg(q,v)===3){var co=[];for(var e=3;e>=0;e--)co.push(pconst(pcoef(q,v,e))||F(0));var rr=ratRoot(co);if(rr){var qq=synth(co,rr),qa=qq[0],qb=qq[1],qc=qq[2];var fq="("+lin(F(rr.d),F(-rr.n),v)+")";var Q2=fint(qa)&&fint(qb)&&fint(qc)?quadRoots(qa.n/rr.d,qb.n/rr.d,qc.n/rr.d):null;
    if(Q2&&!Q2.none&&Q2.exact&&(qa.n/rr.d)%1===0)f=fq+factorStr(qa.n/rr.d,Q2.r[0],Q2.r[1],v);else f=fq+"("+pmx(polyFrom(qq.map(function(x){return fdiv(x,F(rr.d))}),v))+")";s.push(St(f,v+" = "+fmx(rr)+" makes it 0, so ("+ptx(polyFrom([F(rr.d),F(-rr.n)],v))+") is a factor; divide it out."))}}
  if(!f)f=factorMore(q,s);
  var whole=(pre||"")+(f?f:(pre?"("+inner+")":inner));out.answer=whole;out.factored=!!(f||pre);if(!out.factored)out.note="This doesn't factor over the whole numbers — it's already as simple as it gets.";return out}
/* more factoring: difference of squares of any even power, x⁴-type quadratics, and two-letter trinomials */
function sqrtPoly(A){/* a·v^(2k) with a a perfect square → √ as a polynomial, else null */var ks=Object.keys(A);if(ks.length!==1)return null;var c=A[ks[0]];if(c.n<0)return null;var r=sqrtF(c);if(!r)return null;var m=mono(ks[0]),h={};for(var v in m){if(m[v]%2)return null;h[v]=m[v]/2}var o={};o[mkey(h)]=r;return o}
function factorMore(q,s){var ks=Object.keys(q);
  if(ks.length===2){var pos={},negp={};ks.forEach(function(k){if(q[k].n>0)pos[k]=q[k];else negp[k]=fneg(q[k])});if(Object.keys(pos).length===1&&Object.keys(negp).length===1){var a=sqrtPoly(pos),b=sqrtPoly(negp);
    if(a&&b){var A1=pmx(psub(a,b)),B1=pmx(padd(a,b));s.push(St("("+A1+")("+B1+")","It's a **difference of squares**: a² − b² = (a − b)(a + b), with a = "+pmx(a)+", b = "+pmx(b)+"."));
      var more=factorMore(psub(a,b),[]);if(more){s.push(St(more+"("+B1+")","The first bracket is a difference of squares too."));return more+"("+B1+")"}return "("+A1+")("+B1+")"}}}
  var vs=pvars(q);
  if(vs.length===2&&pdeg(q)===2&&Object.keys(q).every(function(k){var m=mono(k);return (m[vs[0]]||0)+(m[vs[1]]||0)===2})){var x=vs[0],y=vs[1],a2=pconst(pcoef(pcoef(q,x,2),y,0))||F(0),b2=pconst(pcoef(pcoef(q,x,1),y,1))||F(0),c2=pconst(pcoef(pcoef(q,x,0),y,2))||F(0);
    if(fint(a2)&&fint(b2)&&fint(c2)&&!fz(a2)){var Q=quadRoots(a2.n,b2.n,c2.n);if(!Q.none&&Q.exact){var r1=Q.r[0],r2=Q.r[1],k=a2.n/(r1.d*r2.d);function br(r){return "("+pmx(padd(pscale(pvar(x),F(r.d)),pscale(pvar(y),F(-r.n))))+")"}
      var f=(k===1?"":k===-1?M:String(k))+(feq(r1,r2)?br(r1)+"^{2}":br(r1)+br(r2));s.push(St(f,feq(r1,r2)?"A **perfect square**: a² + 2ab + b² = (a + b)².":"Treat it like a quadratic in "+x+", with "+y+" riding along."));return f}}}
  if(vs.length===1){var v=vs[0],d=pdeg(q,v);if(d===4&&!Object.keys(q).some(function(k){return (mono(k)[v]||0)%2})){var a=pconst(pcoef(q,v,4)),b=pconst(pcoef(q,v,2))||F(0),c=pconst(pcoef(q,v,0))||F(0);
    if(fint(a)&&fint(b)&&fint(c)){var Q4=quadRoots(a.n,b.n,c.n);if(!Q4.none&&Q4.exact){var u=pvar(v),u2=ppow(u,2);var parts=[Q4.r[0],Q4.r[1]].map(function(r){return padd(pscale(u2,F(r.d)),P(F(-r.n)))});var k4=a.n/(Q4.r[0].d*Q4.r[1].d);
      var str=(k4===1?"":String(k4))+parts.map(function(pp){return "("+pmx(pp)+")"}).join("");s.push(St(str,"Only even powers: treat "+v+"² as one thing and factor like a quadratic."));
      var fin=(k4===1?"":String(k4))+parts.map(function(pp){var sub=[],m2=factorMore(pp,sub);return m2||"("+pmx(pp)+")"}).join("");if(fin!==str)s.push(St(fin,"A bracket that's a difference of squares splits again."));return fin}}}}
  return null}
/* y = … : describe the graph */
function analyze(rhs,v){var n=parse(rhs),p=toPoly(n);if(!p)return null;var vs=pvars(p);if(vs.length>1)return null;v=v||vs[0]||"x";var d=pdeg(p,v),out={kind:"graph",q:"y = "+pmx(p),steps:[],facts:[]},f=out.facts;
  var c=pconst(pcoef(p,v,0))||F(0);
  if(d<=1){var m=pconst(pcoef(p,v,1))||F(0);f.push(["Slope (m)",fmx(m)+(fz(m)?" — a flat line":fv(m)>0?" — goes **up** "+fstr(m)+" for every 1 step right":" — goes **down** "+fstr(fabs(m))+" for every 1 step right")]);f.push(["y-intercept",fmx(c)+" — crosses the y-axis at (0, "+fstr(c)+")"]);if(!fz(m))f.push(["x-intercept",fmx(fdiv(fneg(c),m))+" — crosses the x-axis at ("+fstr(fdiv(fneg(c),m))+", 0)"]);out.answer="\\t{a straight line with slope } "+fmx(m);out.line=[m,c]}
  else if(d===2){var a=pconst(pcoef(p,v,2)),b=pconst(pcoef(p,v,1))||F(0),h=fdiv(fneg(b),fmul(F(2),a)),k=pevalF(p,v,h);
    f.push(["Opens",fv(a)>0?"**up** (a > 0) — the vertex is the lowest point":"**down** (a < 0) — the vertex is the highest point"]);f.push(["Vertex","("+fmx(h)+", "+fmx(k)+")  — using "+v+" = −b/(2a) = "+fmx(h)]);f.push(["Axis of symmetry",v+" = "+fmx(h)]);f.push(["y-intercept","(0, "+fmx(c)+")"]);
    var K=pden(p),q=pscale(p,F(K));var A=pconst(pcoef(q,v,2)),B=pconst(pcoef(q,v,1))||F(0),C=pconst(pcoef(q,v,0))||F(0);var Q=quadRoots(A.n,B.n,C.n);
    var zr=Q.exact?Q.r.slice().sort(function(x,y){return fv(x)-fv(y)}):null;f.push(["x-intercepts (zeros)",Q.none?"none — it never touches the x-axis":Q.exact?(feq(zr[0],zr[1])?fmx(zr[0])+" (touches once)":fmx(zr[0])+" and "+fmx(zr[1])):Q.mx+" ≈ "+dec(Q.v[1],3)+", "+dec(Q.v[0],3)]);
    f.push(["Vertex form","y = "+(a.n===1&&a.d===1?"":fmx(a))+"("+v+" "+(fv(h)<0?"+ "+fmx(fabs(h)):"− "+fmx(h))+")^{2}"+(fz(k)?"":fv(k)<0?" − "+fmx(fabs(k)):" + "+fmx(k))]);
    out.answer="\\t{a parabola with vertex } ("+fmx(h)+", "+fmx(k)+")";out.para=[a,h,k]}
  else{out.answer="\\t{a polynomial of degree "+d+"}";var fac=factor(rhs);if(fac&&fac.factored)f.push(["Factored",fac.answer])}
  return out}

/* ---------------- percent, ratios, statistics, number facts ---------------- */
function nums(s){return (clean(s).match(/-?\d+(?:\.\d+)?(?:\/\d+)?/g)||[]).map(function(x){return x.indexOf("/")>-1?+x.split("/")[0]/+x.split("/")[1]:+x})}
function D(x){return dec(x,4)}
function percent(q){var t=clean(q).toLowerCase().replace(/(\d),(\d{3})/g,"$1$2").replace(/\$/g,"").replace(/\s*\bper\s*cent(age)?\b/g,"%").replace(/\s+%/g,"%").replace(/\ba number\b/g,"what").replace(/\bwhat number\b/g,"what"),m;
  function out(q,steps,ans,note){return {kind:"pct",q:q,steps:steps,answer:ans,note:note}}
  /* compound growth / interest */
  if((m=t.match(/(\d+(?:\.\d+)?)\D*?(?:grows?|increases?|interest|rises?|appreciates?|compounded|at)\D*?(\d+(?:\.\d+)?)%\D*?(?:per|a|each|every)?\s*(?:year|month|day|week)s?\D*?(\d+)\s*(?:years?|months?|days?|weeks?)/))&&!/simple interest/.test(t)){var P0=+m[1],rt=+m[2]/100,n=+m[3],dn=/decay|decreas|depreciat|loses|falls?/.test(t),mul=dn?1-rt:1+rt,A=P0*Math.pow(mul,n);
    return out("Growth: "+P0+" at "+m[2]+"% for "+n,[St("\\t{multiplier} = 1 "+(dn?"−":"+")+" "+D(rt)+" = "+D(mul),"Each period multiplies by the same number."),St(P0+" × "+D(mul)+"^{"+n+"} = "+D(A),"Apply it "+n+" times: that's a power, not "+n+" × "+m[2]+"%.")],D(A),"This is exponential growth: A = P(1 "+(dn?"−":"+")+" r)^t.")}
  /* successive changes */
  var ch=[],re=/(up|rise[sd]?|increase[sd]?|grows?|raise[sd]?|down|fall[s]?|fell|decrease[sd]?|drops?|discount(?:ed)?)\s*(?:by)?\s*(\d+(?:\.\d+)?)%/g,mm;while((mm=re.exec(t)))ch.push([/up|ris|incr|grow|rais/.test(mm[1])?1:-1,+mm[2]]);
  if(ch.length>=2){var tot=1,stp=ch.map(function(c){var k=1+c[0]*c[1]/100;tot*=k;return D(k)});var net=(tot-1)*100;return out("Successive changes",[St("\\t{multipliers: } "+stp.join(" × ")+" = "+D(tot),"Each change works on the **new** amount, so multiply the multipliers."),St("("+D(tot)+" − 1) × 100 = "+D(net)+"\\%","Turn the total multiplier back into a percent change.")],(net>=0?"\\t{a net increase of } ":"\\t{a net decrease of } ")+D(Math.abs(net))+"\\%","Not "+D(ch.reduce(function(a,c){return a+c[0]*c[1]},0))+"% — percents don't simply add.")}
  /* original price before a discount / increase */
  if((m=t.match(/(?:after|with|following)\s+(?:a|an)?\s*(\d+(?:\.\d+)?)%\s*(discount|off|decrease|reduction|increase|markup|raise|tax|tip)[^\d]*?(\d+(?:\.\d+)?)/))&&/original|before|was|what was|start|initial/.test(t)){var p2=+m[1]/100,up=/increase|markup|raise|tax|tip/.test(m[2]),now=+m[3],mul2=up?1+p2:1-p2;
    return out("Original amount",[St("\\t{original} × "+D(mul2)+" = "+now,"The new amount is the original times the multiplier ("+(up?"1 + ":"1 − ")+D(p2)+")."),St("\\t{original} = "+now+" ÷ "+D(mul2)+" = "+D(now/mul2),"So **divide** to undo it — don't just add "+m[1]+"% back.")],D(now/mul2))}
  if((m=t.match(/(-?\d+(?:\.\d+)?)%\s*of\s*(?:what|which)\s*(?:is|=|equals)\s*(-?\d+(?:\.\d+)?)/))||(m=t.match(/(?:if\s+)?(-?\d+(?:\.\d+)?)%\s*of\s*what\s*(?:is|=)\s*(-?\d+(?:\.\d+)?)/))){var p=+m[1],n1=+m[2];return out(p+"% of what number is "+n1+"?",[St("\\f{"+p+"}{100} × w = "+n1,"“Of” means multiply, “is” means equals."),St("w = "+n1+" ÷ "+D(p/100),"Divide by "+D(p/100)+" (the percent as a decimal).")],"w = "+D(n1/(p/100)))}
  if((m=t.match(/(-?\d+(?:\.\d+)?)\s*(?:is|=)\s*(\d+(?:\.\d+)?)%\s*of\s*what/))){var n3=+m[1],p3=+m[2];return out(p3+"% of what number is "+n3+"?",[St("\\f{"+p3+"}{100} × w = "+n3,"“Of” means multiply, “is” means equals."),St("w = "+n3+" ÷ "+D(p3/100),"Divide by the percent as a decimal.")],"w = "+D(n3/(p3/100)))}
  function partOf(a,b){return out(D(a)+" out of "+D(b)+" as a percent",[St("\\f{"+D(a)+"}{"+D(b)+"} = "+D(a/b),"Part ÷ whole."),St(D(a/b)+" × 100 = "+D(100*a/b)+"\\%","× 100 turns the decimal into a percent.")],D(100*a/b)+"\\%")}
  if((m=t.match(/(-?\d+(?:\.\d+)?)\s*(?:is|=)\s*what\s*%\s*of\s*(-?\d+(?:\.\d+)?)/)))return partOf(+m[1],+m[2]);
  if((m=t.match(/what\s*%\s*of\s*(-?\d+(?:\.\d+)?)\s*is\s*(-?\d+(?:\.\d+)?)/)))return partOf(+m[2],+m[1]);
  if((m=t.match(/what\s*%\s*is\s*(-?\d+(?:\.\d+)?)\s*of\s*(-?\d+(?:\.\d+)?)/)))return partOf(+m[1],+m[2]);
  if((m=t.match(/(-?\d+(?:\.\d+)?)\s*as\s*an?\s*%\s*of\s*(-?\d+(?:\.\d+)?)/)))return partOf(+m[1],+m[2]);
  if((m=t.match(/(-?\d+(?:\.\d+)?)\s*(?:out of|of|\/)\s*(\d+(?:\.\d+)?)\s*(?:as|in|to|into)\s*(?:an?\s*)?%/)))return partOf(+m[1],+m[2]);
  if((m=t.match(/(-?\d*\.\d+|-?\d+)\s*(?:as|to|in|into)\s*(?:an?\s*)?%/))){var v=+m[1];return out(m[1]+" as a percent",[St(m[1]+" × 100 = "+D(v*100)+"\\%","Multiply by 100 (move the decimal point two places right).")],D(v*100)+"\\%")}
  if((m=t.match(/(-?\d+(?:\.\d+)?)%\s*(?:as|to|in|into)\s*(?:a\s*)?(decimal|fraction)/))){var v2=+m[1],fr=F(v2,100);return out(m[1]+"% as a "+m[2],[St(m[1]+"\\% = \\f{"+m[1]+"}{100}"+(m[2]==="fraction"?" = "+fmx(fr):" = "+D(v2/100)),"Percent means “out of 100”.")],m[2]==="fraction"?fmx(fr):D(v2/100))}
  if((m=t.match(/(?:%|percent)\s*(?:change|increase|decrease|growth|drop|difference)?[\s,]*from\s*(-?\d+(?:\.\d+)?)\s*to\s*(-?\d+(?:\.\d+)?)/))||(m=t.match(/from\s*(-?\d+(?:\.\d+)?)\s*to\s*(-?\d+(?:\.\d+)?)/))&&/%|change|increase|decrease/.test(t)){var o=+m[1],nw=+m[2],chg=(nw-o)/o*100;
    return out("Percent change from "+o+" to "+nw,[St("\\t{change} = "+nw+" − "+o+" = "+D(nw-o),"Find the change: new − old."),St("\\f{"+D(nw-o)+"}{"+o+"} × 100 = "+D(chg)+"\\%","Divide by the **old** (original) value, then × 100.")],(chg>=0?"\\t{an increase of } ":"\\t{a decrease of } ")+D(Math.abs(chg))+"\\%")}
  if((m=t.match(/(increase|raise|decrease|reduce|lower|discount)\s*(-?\d+(?:\.\d+)?)\s*by\s*(\d+(?:\.\d+)?)%/))||(m=t.match(/(-?\d+(?:\.\d+)?)\s*(increased|decreased|reduced|discounted|raised)\s*by\s*(\d+(?:\.\d+)?)%/))){var up2,base,pc;if(isNaN(+m[1])){up2=/increase|raise/.test(m[1]);base=+m[2];pc=+m[3]}else{base=+m[1];up2=/increase|raise/.test(m[2]);pc=+m[3]}
    var mult=up2?1+pc/100:1-pc/100;return out((up2?"Increase ":"Decrease ")+base+" by "+pc+"%",[St("\\t{multiplier} = 1 "+(up2?"+":"−")+" "+D(pc/100)+" = "+D(mult),up2?"Going up "+pc+"% means you keep 100% **and add** "+pc+"%.":"Going down "+pc+"% means you keep **"+D(100-pc)+"%**."),St(base+" × "+D(mult)+" = "+D(base*mult),"Multiply once by the multiplier.")],D(base*mult))}
  if((m=t.match(/(\d+(?:\.\d+)?)\D{0,40}?\b(discounted|reduced|marked down|marked up|increased|decreased|raised|lowered|on sale for|cut)\b\s*(?:by)?\s*(\d+(?:\.\d+)?)%/))){var base3=+m[1],up3=/up|increased|raised/.test(m[2]),pc3=+m[3],mul3=up3?1+pc3/100:1-pc3/100;
    return out(base3+(up3?" + ":" − ")+pc3+"%",[St("\\t{multiplier} = 1 "+(up3?"+":"−")+" "+D(pc3/100)+" = "+D(mul3),up3?"Up "+pc3+"%: keep 100% and add "+pc3+"%.":"Down "+pc3+"%: you pay **"+D(100-pc3)+"%**."),St(base3+" × "+D(mul3)+" = "+D(base3*mul3),"Multiply once by the multiplier.")],D(base3*mul3))}
  if((m=t.match(/(\d+(?:\.\d+)?)%\s*off\s*(?:of\s*)?(?:a\s*)?(\d+(?:\.\d+)?)/))||(m=t.match(/(\d+(?:\.\d+)?)\D{0,30}?(\d+(?:\.\d+)?)%\s*(?:off|discount)/))&&(m=[m[0],m[0].match(/(\d+(?:\.\d+)?)%/)[1],m[1]])){var pc2=+m[1],b2=+m[2];return out(pc2+"% off "+b2,[St("100\\% − "+pc2+"\\% = "+D(100-pc2)+"\\%","After the discount you pay the rest."),St(b2+" × "+D(1-pc2/100)+" = "+D(b2*(1-pc2/100)),"Multiply by that as a decimal.")],D(b2*(1-pc2/100)))}
  if((m=t.match(/(-?\d+(?:\.\d+)?)%\s*of\s*(-?\d+(?:\.\d+)?)/))){var pp=+m[1],nn=+m[2];return out(pp+"% of "+nn,[St(pp+"\\% = "+D(pp/100),"Turn the percent into a decimal: divide by 100 (move the point two places left)."),St(D(pp/100)+" × "+nn+" = "+D(pp/100*nn),"“Of” means **multiply**.")],D(pp/100*nn))}
  return null}
var NWS={two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
function stats(q){var t=q.toLowerCase().replace(/\b(two|three|four|five|six|seven|eight|nine|ten)\b/g,function(w){return NWS[w]}),m;
  /* the missing value: "the mean of 5 numbers is 12; four are 10, 14, 9, 15 — what is the fifth?" */
  if((m=t.match(/(?:mean|average)\s*of\s*(\d+)\s*(?:numbers|values|scores|tests|items|students|people|data)?\D*?(?:is|=|was)\s*(-?\d+(?:\.\d+)?)/))&&/(fifth|sixth|seventh|last|missing|other|remaining|another|next|final|\bnth\b|what (?:score|number|value))/.test(t)){var n=+m[1],mean=+m[2],tail=t.slice(m.index+m[0].length).replace(/\b\d+\s*(?:of (?:them|the numbers|these))/g," ").replace(/\b\d+(?:st|nd|rd|th)\b/g," "),rest=nums(tail).slice(0,n-1);if(rest.length===n-1){var tot=n*mean,sm=rest.reduce(function(a,b){return a+b},0);
    return {kind:"stats",q:"Missing value: mean "+mean+" of "+n+" numbers",steps:[St("\\t{total} = "+n+" × "+mean+" = "+D(tot),"Mean × count = the total of all the numbers."),St("\\t{known} = "+rest.join(" + ")+" = "+D(sm),"Add the ones you know."),St(D(tot)+" − "+D(sm)+" = "+D(tot-sm),"The missing one makes up the difference.")],answer:"\\t{missing value} = "+D(tot-sm)}}}
  var xs=nums(t.replace(/^[^\d-]*/,""));if(xs.length<2)return null;var n2=xs.length,sorted=xs.slice().sort(function(a,b){return a-b}),sum=xs.reduce(function(a,b){return a+b},0),mean2=sum/n2;
  var med=n2%2?sorted[(n2-1)/2]:(sorted[n2/2-1]+sorted[n2/2])/2,cnt={},mx=0;xs.forEach(function(x){cnt[x]=(cnt[x]||0)+1;if(cnt[x]>mx)mx=cnt[x]});var modes=Object.keys(cnt).filter(function(k){return cnt[k]===mx}).map(Number);
  var sd=Math.sqrt(xs.reduce(function(a,x){return a+(x-mean2)*(x-mean2)},0)/n2),q1=quart(sorted,0.25),q3=quart(sorted,0.75);
  var want=/median/.test(t)?"median":/\bmode\b/.test(t)?"mode":/interquartile|\biqr\b|quartile/.test(t)?"iqr":/\brange\b|spread/.test(t)?"range":/standard|deviation|\bsd\b/.test(t)?"sd":"mean";var s=[];
  s.push(St("\\t{in order: } "+sorted.join(", "),"Put the "+n2+" numbers **in order** first."));
  if(want==="mean")s.push(St("\\t{mean} = \\f{"+(sum<0?M+Math.abs(D(sum)):D(sum))+"}{"+n2+"} = "+D(mean2),"Add them all ("+D(sum)+") and divide by how many there are ("+n2+")."));
  if(want==="median")s.push(St("\\t{median} = "+D(med),n2%2?"The middle one is number "+((n2+1)/2)+" in the ordered list.":"An even count: average the two middle numbers, "+sorted[n2/2-1]+" and "+sorted[n2/2]+"."));
  if(want==="mode")s.push(St("\\t{mode} = "+(mx>1?modes.join(", "):"\\t{none}"),mx>1?"Appears most often ("+mx+" times).":"Every number appears once, so there's **no mode**."));
  if(want==="range")s.push(St("\\t{range} = "+sorted[n2-1]+" − "+sorted[0]+" = "+D(sorted[n2-1]-sorted[0]),"Biggest − smallest."));
  if(want==="sd")s.push(St("\\t{SD} = \\r{\\f{\\t{sum of squared gaps}}{"+n2+"}} "+(Math.abs(sd-Math.round(sd))<1e-9?"= ":"≈ ")+D(sd),"Find each distance from the mean ("+D(mean2)+"), square, average, then square-root. (On the SAT you usually just **compare** spreads.)"));
  if(want==="iqr")s.push(St("\\t{IQR} = Q_{3} − Q_{1} = "+D(q3)+" − "+D(q1)+" = "+D(q3-q1),"Q1 is the middle of the lower half, Q3 the middle of the upper half."));
  var ans={mean:D(mean2),median:D(med),mode:mx>1?modes.join(", "):"\\t{none}",range:D(sorted[n2-1]-sorted[0]),sd:(Math.abs(sd-Math.round(sd))<1e-9?"":"≈ ")+D(sd),iqr:D(q3-q1)}[want];
  return {kind:"stats",q:want+" of "+xs.join(", "),steps:s,answer:"\\t{"+({mean:"mean",median:"median",mode:"mode",range:"range",sd:"SD",iqr:"IQR"}[want])+"} = "+ans,
    facts:[["Mean",D(mean2)],["Median",D(med)],["Mode",mx>1?modes.join(", "):"none"],["Range",D(sorted[n2-1]-sorted[0])],["Q1 · Q3 (IQR)",D(q1)+" · "+D(q3)+" ("+D(q3-q1)+")"],["Standard deviation","≈ "+D(sd)]]}}
function quart(s,p){var n=s.length,lo=s.slice(0,Math.floor(n/2)),hi=s.slice(Math.ceil(n/2));var h=p<0.5?lo:hi;if(!h.length)return s[0];var m=h.length;return m%2?h[(m-1)/2]:(h[m/2-1]+h[m/2])/2}
function primeFac(n){var f=[],m=n;for(var p=2;p*p<=m;p++)while(m%p===0){f.push(p);m/=p}if(m>1)f.push(m);return f}
function facPow(f){var c={};f.forEach(function(p){c[p]=(c[p]||0)+1});return Object.keys(c).map(function(p){return c[p]>1?p+"^{"+c[p]+"}":p}).join(" · ")}
function numberFacts(q){var t=q.toLowerCase(),xs=nums(q).filter(function(x){return x%1===0&&x>0});
  if(/\b(gcf|gcd|hcf|greatest common|highest common)/.test(t)&&xs.length>=2){var g=xs.reduce(gcd);return {kind:"nt",q:"GCF of "+xs.join(", "),steps:xs.map(function(x){return St(x+" = "+facPow(primeFac(x)),"")}).concat([St("\\t{GCF} = "+g,"Take the prime factors they **all share** (lowest power of each).")]),answer:"\\t{GCF} = "+g}}
  if(/\b(lcm|least common multiple|lowest common multiple|lcd|common denominator)/.test(t)&&xs.length>=2){var l=xs.reduce(lcm);return {kind:"nt",q:"LCM of "+xs.join(", "),steps:xs.map(function(x){return St(x+" = "+facPow(primeFac(x)),"")}).concat([St("\\t{LCM} = "+l,"Take **every** prime factor that appears, at its highest power.")]),answer:"\\t{LCM} = "+l}}
  if(/prime factori[sz]ation|prime factors|factor tree/.test(t)&&xs.length){var x=xs[0],f=primeFac(x);return {kind:"nt",q:"Prime factors of "+x,steps:[St(x+" = "+f.join(" · "),"Keep dividing by the smallest prime that works (2, 3, 5, 7, …).")],answer:x+" = "+facPow(f)}}
  if(/\bis\b.*\bprime\b/.test(t)&&/\b[01]\b/.test(t)&&!xs.filter(function(x){return x>1}).length){var z1=nums(q)[0];return {kind:"nt",q:"\\t{Is "+z1+" prime?}",steps:[St(z1+" \\t{ is not prime}","A prime has **exactly two** different factors: 1 and itself. "+(z1===1?"1 has only one factor.":"0 is divisible by every number."))],answer:"\\t{no — "+z1+" is not prime}"}}
  if(/\bis\b.*\bprime\b/.test(t)&&xs.length){var y=xs[0],fy=primeFac(y),pr=y>1&&fy.length===1;return {kind:"nt",q:"\\t{Is "+y+" prime?}",steps:[St(pr?y+" \\t{ has no factors except 1 and itself}":y+" = "+fy.join(" · "),pr?"I tried every prime up to √"+y+" ≈ "+D(Math.sqrt(y))+" — none divides it.":"It splits into smaller factors.")],answer:pr?"\\t{yes, "+y+" is prime}":"\\t{no — "+y+" = "+fy.join(" × ")+"}"}}
  if(/\b(factors|divisors)\s*of\b/.test(t)&&xs.length){var z=xs[0],d=divisors(z);return {kind:"nt",q:"Factors of "+z,steps:[St(d.slice(0,Math.ceil(d.length/2)).map(function(a){return a+" × "+z/a}).join(", \\s "),"List them in **pairs** that multiply to "+z+".")],answer:d.join(", ")}}
  return null}
/* two points → slope, line, distance, midpoint */
function points(q){var pts=[],re=/\(\s*(-?\d+(?:\.\d+)?(?:\/\d+)?)\s*,\s*(-?\d+(?:\.\d+)?(?:\/\d+)?)\s*\)/g,m,t=clean(q);while((m=re.exec(t)))pts.push([F(nums(m[1])[0]),F(nums(m[2])[0])]);if(pts.length<2)return null;
  var A=pts[0],B=pts[1],dx=fsub(B[0],A[0]),dy=fsub(B[1],A[1]),tl=q.toLowerCase(),want=/distance|length|how far/.test(tl)?"dist":/midpoint|middle/.test(tl)?"mid":/\bslope\b|gradient|rate of change/.test(tl)?"slope":/equation|line through|line passing/.test(tl)?"line":"slope";
  var PT=function(p){return "("+fmx(p[0])+", "+fmx(p[1])+")"},s=[],facts=[];
  var slope=fz(dx)?null:fdiv(dy,dx),b=slope?fsub(A[1],fmul(slope,A[0])):null,dd=fv(dx)*fv(dx)+fv(dy)*fv(dy),dist=surdMX(Math.round(dd)===dd?dd:NaN)||dec(Math.sqrt(dd),4),mid=[fdiv(fadd(A[0],B[0]),F(2)),fdiv(fadd(A[1],B[1]),F(2))];
  if(want==="slope"||want==="line"){s.push(St("m = \\f{y_{2} − y_{1}}{x_{2} − x_{1}} = \\f{"+fmx(B[1])+" − "+par(A[1])+"}{"+fmx(B[0])+" − "+par(A[0])+"} = \\f{"+fmx(dy)+"}{"+fmx(dx)+"}"+(slope?" = "+fmx(slope):""),"Slope = **rise over run**: change in y ÷ change in x."));
    if(!slope)s.push(St("\\t{undefined slope}","The run is 0 — it's a **vertical** line, x = "+fmx(A[0])+"."))}
  if(want==="line"&&slope){s.push(St("y = "+fmx(slope)+"x + b \\t{ → } "+fmx(A[1])+" = "+fmx(slope)+"("+fmx(A[0])+") + b \\t{ → } b = "+fmx(b),"Put one point into y = mx + b to find the y-intercept b."))}
  if(want==="dist")s.push(St("d = \\r{"+par(dx)+"^{2} + "+par(dy)+"^{2}} = \\r{"+D(dd)+"} = "+dist,"Distance = Pythagoras on the run and the rise."));
  if(want==="mid")s.push(St("\\t{midpoint} = (\\f{"+fmx(A[0])+" + "+par(B[0])+"}{2}, \\f{"+fmx(A[1])+" + "+par(B[1])+"}{2}) = "+PT(mid),"Average the x's and average the y's."));
  facts.push(["Slope",slope?fmx(slope):"undefined (vertical)"]);if(slope)facts.push(["Line","y = "+pmx(padd(pscale(pvar("x"),slope),P(b)))]);else facts.push(["Line","x = "+fmx(A[0])]);facts.push(["Distance",dist+(Math.round(dd)===dd&&surd(dd).m!==1?" ≈ "+dec(Math.sqrt(dd),3):"")]);facts.push(["Midpoint",PT(mid)]);
  var answer=want==="dist"?"d = "+dist:want==="mid"?"\\t{midpoint } "+PT(mid):want==="line"?(slope?"y = "+pmx(padd(pscale(pvar("x"),slope),P(b))):"x = "+fmx(A[0])):(slope?"m = "+fmx(slope):"\\t{undefined}");
  return {kind:"points",q:PT(A)+" \\t{ and } "+PT(B),steps:s,answer:answer,facts:facts}}
function par(f){return f.n<0?"("+fmx(f)+")":fmx(f)}

/* ---------------- geometry & trig formulas ---------------- */
function nb(t,re){var m=t.match(re);return m?+m[1]:null}
function geometry(q){var t=clean(q).toLowerCase().replace(/(\d),(\d{3})/g,"$1$2"),N=nums(t);
  function g(re){var m=t.match(re);return m?+m[1]:null}
  var r=g(/\b(?:radius|r)\b\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/),d=g(/\b(?:diameter|d)\b\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/),h=g(/\b(?:height|h)\b\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/),sl=g(/\bslant(?: height)?\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/);
  var rFromD=false;if(r===null&&d!==null){r=d/2;rFromD=true}
  function res(title,steps,ans,note){return {kind:"geo",q:String(title).replace(/^([A-Za-z][A-Za-z ''()-]*?)(,|:|$)/,"\\t{$1$2}"),steps:steps.filter(Boolean),answer:ans,note:note}}
  function dstep(){return rFromD?St("r = \\f{"+d+"}{2} = "+D(r),"The radius is **half the diameter**."):null}
  function pi(c){return (c===1?"":D(c))+"π"}
  /* polygons */
  var names={triangle:3,quadrilateral:4,pentagon:5,hexagon:6,heptagon:7,octagon:8,nonagon:9,decagon:10,dodecagon:12},n2=null;for(var k in names)if(new RegExp("\\b"+k).test(t))n2=names[k];var ng=t.match(/(\d+)\s*(?:-\s*)?(?:sided|sides|gon)\b/);if(ng)n2=+ng[1];
  if(/exterior angle/.test(t)&&n2&&!/triangle/.test(t)||/exterior angle/.test(t)&&/regular/.test(t)&&n2){return res("Exterior angle of a regular "+n2+"-gon",[St("\\f{360}{"+n2+"} = "+D(360/n2),"The exterior angles of any polygon add to **360°** — share it equally.")],D(360/n2)+"°")}
  if(/(interior|inside)\b.*\bangle|angle sum|sum of.*angles|each angle|angles? (of|in) an? (regular )?[a-z]*gon/.test(t)&&n2&&n2>=3){var sm=(n2-2)*180,each=/each|one|regular/.test(t);
    return res("Angles in a "+n2+"-sided polygon",[St("(n − 2) × 180 = ("+n2+" − 2) × 180 = "+sm,"Split it into **n − 2 triangles** from one corner."),each?St("\\f{"+sm+"}{"+n2+"} = "+D(sm/n2),"Regular: every angle is equal, so share the total."):null],each?D(sm/n2)+"° \\t{ each}":sm+"° \\t{ in total}")}
  /* arcs & sectors (before plain circles) */
  if(/\b(arc|sector)\b/.test(t)&&N.length>=2){var rr=r!==null?r:N[0],ang=g(/(?:angle|central angle)\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/);if(ang===null)ang=N.filter(function(x){return x!==rr})[0];
    if(/sector|area/.test(t)&&!/arc length/.test(t))return res("Sector area: r = "+rr+", angle "+ang+"°",[dstep(),St("\\f{"+ang+"}{360} × π("+rr+")^{2}","The slice is "+ang+"/360 of the whole circle's area.")],"A = "+pi(ang/360*rr*rr)+" ≈ "+D(ang/360*Math.PI*rr*rr));
    return res("Arc length: r = "+rr+", angle "+ang+"°",[dstep(),St("\\f{"+ang+"}{360} × 2π("+rr+")","The arc is "+ang+"/360 of the whole circumference.")],"L = "+pi(ang/360*2*rr)+" ≈ "+D(ang/360*2*Math.PI*rr))}
  /* circle: find r from the area or the circumference */
  if(/\b(radius|diameter)\b/.test(t)&&/\b(area|circumference)\b/.test(t)&&/\b(what|find|radius of|diameter of)\b/.test(t)&&!/\b(radius|diameter)\s*(?:=|is|of)?\s*\d/.test(t)){var am=t.match(/(?:area|circumference)\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)\s*(π|pi)?/);if(am){var val=+am[1],hasPi=!!am[2],isA=/area/.test(am[0]);
      var rv=isA?(hasPi?Math.sqrt(val):Math.sqrt(val/Math.PI)):(hasPi?val/2:val/(2*Math.PI)),wantD=/diameter/.test(t.slice(0,t.search(/area|circumference/)))||/what is the diameter|find the diameter/.test(t);
      return res((isA?"Area":"Circumference")+" = "+val+(hasPi?"π":"")+" → radius",[isA?St("πr^{2} = "+val+(hasPi?"π":"")+" \\t{ → } r^{2} = "+(hasPi?val:D(val/Math.PI)),"Divide both sides by π."):St("2πr = "+val+(hasPi?"π":"")+" \\t{ → } r = "+D(rv),"Divide by 2π."),isA?St("r = \\r{"+(hasPi?val:D(val/Math.PI))+"} = "+D(rv),"Square-root."):null,wantD?St("d = 2r = "+D(2*rv),"Diameter = 2 × radius."):null],(wantD?"d = "+D(2*rv):"r = "+D(rv)))}}
  if(/semicircle|half (a |of a )?circle/.test(t)){if(r===null&&N.length)r=N[0];if(r===null)return null;if(/perimeter|around/.test(t))return res("Semicircle perimeter, r = "+r,[dstep(),St("πr + 2r = π("+r+") + "+D(2*r),"Half the circumference **plus** the straight diameter.")],"P = "+pi(r)+" + "+D(2*r)+" ≈ "+D(Math.PI*r+2*r));
    return res("Semicircle area, r = "+r,[dstep(),St("\\f{1}{2}πr^{2} = \\f{1}{2}π("+r+")^{2}","Half of a full circle's area.")],"A = "+pi(r*r/2)+" ≈ "+D(Math.PI*r*r/2))}
  if(/circle/.test(t)&&!/equation|center|centre/.test(t)){if(r===null&&N.length)r=N[0];if(r===null)return null;
    if(/circumference|perimeter|around/.test(t))return res("Circumference, r = "+D(r),[dstep(),St("C = 2πr = 2π("+D(r)+") = "+pi(2*r),"Circumference = 2 × π × radius.")],"C = "+pi(2*r)+" ≈ "+D(2*Math.PI*r));
    return res("Area of a circle, r = "+D(r),[dstep(),St("A = πr^{2} = π("+D(r)+")^{2} = "+pi(r*r),"Area = π × radius squared.")],"A = "+pi(r*r)+" ≈ "+D(Math.PI*r*r))}
  if(/sphere/.test(t)){if(r===null&&N.length)r=N[0];if(r===null)return null;if(/surface/.test(t))return res("Sphere surface, r = "+D(r),[dstep(),St("SA = 4πr^{2} = 4π("+D(r)+")^{2}","")],"SA = "+pi(4*r*r)+" ≈ "+D(4*Math.PI*r*r));return res("Volume of a sphere, r = "+D(r),[dstep(),St("V = \\f{4}{3}πr^{3} = \\f{4}{3}π("+D(r)+")^{3}","Volume of a sphere (it's on the SAT reference sheet).")],"V = "+pi(4/3*r*r*r)+" ≈ "+D(4/3*Math.PI*r*r*r))}
  if(/cylinder|cone/.test(t)){var cone=/cone/.test(t);if(r===null||(h===null&&sl===null)){var rest=N.filter(function(x){return x!==d});if(r===null)r=rest[0];if(h===null&&sl===null)h=rest.filter(function(x){return x!==r})[0]}if(r==null||(h==null&&sl==null))return null;
    if(/surface/.test(t)){if(cone){var L=sl!==null?sl:Math.sqrt(r*r+h*h);return res("Cone surface, r = "+D(r)+", slant "+D(L),[dstep(),sl===null?St("l = \\r{r^{2} + h^{2}} = "+D(L),"The slant height is the hypotenuse of r and h."):null,St("SA = πr^{2} + πrl = π("+D(r)+")^{2} + π("+D(r)+")("+D(L)+")","Base circle + the curved side (πrl)."+(/lateral/.test(t)?" (Lateral area is just πrl.)":""))],/lateral/.test(t)?"\\t{lateral } = "+pi(r*L)+" ≈ "+D(Math.PI*r*L):"SA = "+pi(r*r+r*L)+" ≈ "+D(Math.PI*(r*r+r*L)))}
      return res("Cylinder surface, r = "+D(r)+", h = "+D(h),[dstep(),St("SA = 2πr^{2} + 2πrh = 2π("+D(r)+")^{2} + 2π("+D(r)+")("+D(h)+")","Two circle lids + the label (a rectangle 2πr wide).")],"SA = "+pi(2*r*r+2*r*h)+" ≈ "+D(Math.PI*(2*r*r+2*r*h)))}
    if(h===null)h=Math.sqrt(sl*sl-r*r);
    return res((cone?"Cone":"Cylinder")+", r = "+D(r)+", h = "+D(h),[dstep(),St((cone?"V = \\f{1}{3}πr^{2}h = \\f{1}{3}π":"V = πr^{2}h = π")+"("+D(r)+")^{2}("+D(h)+")",cone?"A cone holds **one third** of the matching cylinder.":"Base area (πr²) × height.")],"V = "+pi((cone?1/3:1)*r*r*h)+" ≈ "+D((cone?1/3:1)*Math.PI*r*r*h))}
  if(/hypotenuse|pythag|right triangle|\blegs?\b/.test(t)&&N.length>=2&&!/sin|cos|tan/.test(t)){var hy=/\bleg\b/.test(t)&&!/\blegs\b/.test(t)?g(/hypotenuse\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/):null;
    if(hy!==null){var lg=N.filter(function(x){return x!==hy})[0];if(lg===undefined||lg>=hy)return null;var o=hy*hy-lg*lg;return res("Leg with hypotenuse "+hy+" and leg "+lg,[St("b^{2} = c^{2} − a^{2} = "+hy+"^{2} − "+lg+"^{2} = "+D(o),"To find a **leg**, subtract: hypotenuse² − the other leg²."),St("b = \\r{"+D(o)+"}"+(o%1===0&&surd(o).m===1?" = "+Math.sqrt(o):""),"Square-root.")],"b = "+(o%1===0?surdMX(o):D(Math.sqrt(o)))+(o%1===0&&surd(o).m!==1?" ≈ "+D(Math.sqrt(o)):""))}
    var a=N[0],b=N[1],c2=a*a+b*b;return res("Hypotenuse with legs "+a+" and "+b,[St("c^{2} = a^{2} + b^{2} = "+a+"^{2} + "+b+"^{2} = "+D(a*a)+" + "+D(b*b)+" = "+D(c2),"Pythagoras: square the legs and add."),St("c = \\r{"+D(c2)+"}"+(c2%1===0&&surd(c2).m===1?" = "+Math.sqrt(c2):""),"Square-root to undo the squaring.")],"c = "+(c2%1===0?surdMX(c2):D(Math.sqrt(c2)))+(c2%1===0&&surd(c2).m!==1?" ≈ "+D(Math.sqrt(c2)):""))}
  if(/equilateral/.test(t)&&/area/.test(t)&&N.length){var sd=N[0];return res("Equilateral triangle, side "+sd,[St("A = \\f{\\r{3}}{4}s^{2} = \\f{\\r{3}}{4}("+sd+")^{2}","Half of base × height, where the height is \\r{3}/2 × side.")],"A = "+(sd*sd%4===0?D(sd*sd/4):"\\f{"+D(sd*sd)+"}{4}")+"\\r{3} ≈ "+D(Math.sqrt(3)/4*sd*sd))}
  if(/trapezoid|trapezium/.test(t)&&N.length>=3){var b1=N[0],b2=N[1],th=h!==null?h:N[2];if(h!==null){var bs=N.filter(function(x){return x!==h});b1=bs[0];b2=bs[1]}return res("Trapezoid: bases "+b1+" and "+b2+", height "+th,[St("A = \\f{1}{2}(b_{1} + b_{2})h = \\f{1}{2}("+b1+" + "+b2+")("+th+")","Average the two parallel sides, times the height.")],"A = "+D((b1+b2)/2*th))}
  if(/triangle/.test(t)&&/area/.test(t)&&N.length>=2){var bb=g(/\bbase\b\s*(?:=|is|of)?\s*(\d+(?:\.\d+)?)/),hh=h;if(bb===null||hh===null){bb=N[0];hh=N[1]}return res("Triangle, base "+bb+", height "+hh,[St("A = \\f{1}{2}bh = \\f{1}{2}("+bb+")("+hh+")","Half of base × height (the height meets the base at 90°).")],"A = "+D(bb*hh/2))}
  if(/triangle/.test(t)&&/angle/.test(t)&&N.length>=2&&N[0]+N[1]<180){return res("Third angle",[St("180 − "+N[0]+" − "+N[1]+" = "+(180-N[0]-N[1]),"The three angles of any triangle add to **180°**.")],(180-N[0]-N[1])+"°")}
  if(/\bcube\b/.test(t)&&N.length){var e=N[0];if(/surface/.test(t))return res("Cube surface, edge "+e,[St("SA = 6s^{2} = 6("+e+")^{2}","Six identical square faces.")],"SA = "+D(6*e*e));if(/volume/.test(t))return res("Cube volume, edge "+e,[St("V = s^{3} = "+e+"^{3}","Edge × edge × edge.")],"V = "+D(e*e*e))}
  if(/(box|prism|cuboid)/.test(t)&&/volume|surface/.test(t)&&N.length>=3){var L2=N[0],W2=N[1],H2=N[2];if(/surface/.test(t))return res("Box surface",[St("SA = 2(lw + lh + wh) = 2("+D(L2*W2)+" + "+D(L2*H2)+" + "+D(W2*H2)+")","Three pairs of matching faces.")],"SA = "+D(2*(L2*W2+L2*H2+W2*H2)));return res("Volume of a box",[St("V = lwh = "+L2+" × "+W2+" × "+H2,"Length × width × height.")],"V = "+D(L2*W2*H2))}
  if(/rectangle|\bsquare\b/.test(t)&&N.length&&!/square (root|feet|foot|inch|meter|metre|cm|mile|unit|yard)/.test(t)){var w=N[0],l=N.length>1?N[1]:N[0];if(/perimeter/.test(t))return res("Perimeter",[St("P = 2("+w+" + "+l+")","Add all four sides: 2 × (length + width).")],"P = "+D(2*(w+l)));if(/diagonal/.test(t))return res("Diagonal",[St("d = \\r{"+w+"^{2} + "+l+"^{2}}","Pythagoras across the rectangle.")],"d ≈ "+D(Math.sqrt(w*w+l*l)));if(/area/.test(t))return res("Area",[St("A = "+w+" × "+l,"Length × width.")],"A = "+D(w*l))}
  return null}
var EXACT={0:["0","1","0"],30:["\\f{1}{2}","\\f{\\r{3}}{2}","\\f{\\r{3}}{3}"],45:["\\f{\\r{2}}{2}","\\f{\\r{2}}{2}","1"],60:["\\f{\\r{3}}{2}","\\f{1}{2}","\\r{3}"],90:["1","0","\\t{undefined}"]};
var SPEC={0:["0","1","0"],30:["\\f{1}{2}","\\f{\\r{3}}{2}","\\f{\\r{3}}{3}"],45:["\\f{\\r{2}}{2}","\\f{\\r{2}}{2}","1"],60:["\\f{\\r{3}}{2}","\\f{1}{2}","\\r{3}"],90:["1","0",null]};
function special(f,a){/* exact value of sin/cos/tan at multiples of 30° and 45° */var r=((a%360)+360)%360;if(r%30&&r%45)return null;var q=r%180,ref=q>90?180-q:q,i={sin:0,cos:1,tan:2}[f];var v=SPEC[ref];if(!v)return null;var val=v[i];if(val===null)return "\\t{undefined}";
  var sg=Math[f](a*Math.PI/180);if(Math.abs(sg)<1e-12)return "0";return (sg<0?"−":"")+val}
function trig(q){var t=clean(q).toLowerCase(),m;
  if((m=t.match(/(-?\d+(?:\.\d+)?)\s*(?:°|deg|degrees?)\s*(?:to|in|into)\s*rad/))){var d=+m[1],g=gcd(d,180);return {kind:"trig",q:d+"° in radians",steps:[St(d+" × \\f{π}{180}","Multiply degrees by **π/180**."),St("\\f{"+(d/g===1?"":d/g)+"π}{"+180/g+"}","Simplify the fraction.")],answer:(180/g===1?(d/g===1?"":d/g)+"π":"\\f{"+(d/g===1?"":d/g)+"π}{"+180/g+"}")+" ≈ "+D(d*Math.PI/180)}}
  if((m=t.match(/(\d+(?:\.\d+)?)?\s*(?:pi|π)\s*(?:\/\s*(\d+))?\s*(?:rad\w*)?\s*(?:to|in|into)\s*deg/))){var k=m[1]?+m[1]:1,dv=m[2]?+m[2]:1;return {kind:"trig",q:"radians to degrees",steps:[St("\\f{"+(k===1?"":k)+"π}{"+dv+"} × \\f{180}{π}","Multiply by **180/π** — or just replace π with 180°.")],answer:D(k*180/dv)+"°"}}
  if((m=t.match(/\b(sin|cos|tan)\s*\(?\s*(-?\d+(?:\.\d+)?)\s*(?:°|deg\w*)?\s*\)?(?!\s*[*/^a-z(]|\s*pi)/))){var f=m[1],a=+m[2],val=Math[f](a*Math.PI/180),ex=special(f,a);
    var undef=ex==="\\t{undefined}";return {kind:"trig",q:f+" "+a+"°",steps:[St(f+" "+a+"°"+(ex?" = "+ex:""),undef?"tan = sin ÷ cos, and cos "+a+"° = 0 — you can't divide by 0.":ex?"A special angle — use the 30-60-90 / 45-45-90 triangles"+(a%360>90?" and the sign of its quadrant":"")+".":"Use a calculator in **degree** mode.")],answer:f+" "+a+"° "+(undef?"\\t{is undefined}":ex?"= "+ex+(ex.indexOf("\\")>-1?" ≈ "+D(val):""):"≈ "+D(val))}}
  return null}
var UNITS={mm:["len",0.001],cm:["len",0.01],m:["len",1],km:["len",1000],in:["len",0.0254],inch:["len",0.0254],inches:["len",0.0254],ft:["len",0.3048],feet:["len",0.3048],foot:["len",0.3048],yd:["len",0.9144],yard:["len",0.9144],yards:["len",0.9144],mi:["len",1609.344],mile:["len",1609.344],miles:["len",1609.344],meter:["len",1],meters:["len",1],metre:["len",1],metres:["len",1],kilometers:["len",1000],kilometres:["len",1000],centimeters:["len",0.01],
  g:["mass",1],kg:["mass",1000],mg:["mass",0.001],lb:["mass",453.592],lbs:["mass",453.592],pound:["mass",453.592],pounds:["mass",453.592],oz:["mass",28.3495],ounce:["mass",28.3495],ounces:["mass",28.3495],grams:["mass",1],kilograms:["mass",1000],
  s:["time",1],sec:["time",1],seconds:["time",1],min:["time",60],mins:["time",60],minutes:["time",60],h:["time",3600],hr:["time",3600],hrs:["time",3600],hour:["time",3600],hours:["time",3600],day:["time",86400],days:["time",86400],week:["time",604800],weeks:["time",604800],
  "mph":["spd",0.44704],"kph":["spd",0.277778],"m/s":["spd",1],"ft/s":["spd",0.3048],"km/s":["spd",1000],ms:["time",0.001],
  ml:["vol",0.001],milliliters:["vol",0.001],millilitres:["vol",0.001],l:["vol",1],liter:["vol",1],liters:["vol",1],litre:["vol",1],litres:["vol",1],gallon:["vol",3.78541],gallons:["vol",3.78541],cup:["vol",0.236588],cups:["vol",0.236588]};
function convert(q){var t=q.toLowerCase().replace(/,(?=\d{3})/g,"").replace(/miles per hour/g,"mph").replace(/kilometers per hour|km\/h/g,"kph").replace(/meters per second|metres per second/g,"m/s").replace(/feet per second/g,"ft/s").replace(/\b(square|sq\.?)\s+/g,"sq_").replace(/\bcubic\s+/g,"cu_"),m,v,a,b;
  var hm=t.match(/how many\s+([a-z_\/]+)\s+(?:are\s+)?(?:there\s+)?in\s+(?:a|an|one|(-?\d+(?:\.\d+)?))\s*([a-z_\/]+)/);
  if(hm){v=hm[2]?+hm[2]:1;a=hm[3];b=hm[1]}else{m=t.match(/(-?\d+(?:\.\d+)?)\s*°?\s*([a-z_\/]+)\s*(?:to|in|into|=\s*\?|as)\s*°?\s*([a-z_\/]+)/);if(!m)return null;v=+m[1];a=m[2];b=m[3]}
  var pw=1;if(/^sq_/.test(a)&&/^sq_/.test(b)){pw=2;a=a.slice(3);b=b.slice(3)}else if(/^cu_/.test(a)&&/^cu_/.test(b)){pw=3;a=a.slice(3);b=b.slice(3)}
  if(pw>1){var A0=UNITS[a],B0=UNITS[b];if(!A0||!B0||A0[0]!=="len")return null;var f0=Math.pow(A0[1]/B0[1],pw);return {kind:"unit",q:v+" "+(pw===2?"square ":"cubic ")+a+" → "+b,steps:[St("1 \\t{ "+a+"} = "+D(A0[1]/B0[1])+" \\t{ "+b+"}","First the length conversion."),St(v+" × "+D(A0[1]/B0[1])+"^{"+pw+"} = "+D(v*f0),(pw===2?"Area":"Volume")+" units are "+(pw===2?"squared":"cubed")+", so the factor is "+(pw===2?"squared":"cubed")+" too.")],answer:D(v*f0)+" "+(pw===2?"square ":"cubic ")+b}}
  if(/^(c|celsius)$/.test(a)&&/^(f|fahrenheit)$/.test(b))return {kind:"unit",q:v+"°C to °F",steps:[St("F = \\f{9}{5}C + 32 = \\f{9}{5}("+v+") + 32","")],answer:D(v*9/5+32)+"°F"};
  if(/^(f|fahrenheit)$/.test(a)&&/^(c|celsius)$/.test(b))return {kind:"unit",q:v+"°F to °C",steps:[St("C = \\f{5}{9}(F − 32) = \\f{5}{9}("+v+" − 32)","")],answer:D((v-32)*5/9)+"°C"};
  var A=UNITS[a],B=UNITS[b];if(!A||!B||A[0]!==B[0])return null;var r=v*A[1]/B[1],fac=A[1]/B[1];
  return {kind:"unit",q:v+" "+a+" → "+b,steps:[St(v+" \\t{ "+a+"} × \\f{"+D(fac)+" \\t{ "+b+"}}{1 \\t{ "+a+"}}","Multiply by a **conversion factor** that equals 1 — the old unit cancels.")],answer:D(r)+" "+b}}

/* ---------------- f(x) = …, f(3) ---------------- */
function funcEval(q){var t=clean(q),m=t.match(/([a-zA-Z])\s*\(\s*([a-zA-Z])\s*\)\s*=\s*([^,;]+?)(?:[,;]|\s+(?:find|what is|evaluate|and|then)\s+|$)/i);if(!m)return null;var fn=m[1],v=m[2],body=m[3],rest=t.slice(m.index+m[0].length-1);
  var n=parse(body),comp=rest.match(new RegExp(fn+"\\s*\\(\\s*"+fn+"\\s*\\(\\s*(-?[\\d.\\/]+)\\s*\\)\\s*\\)")),mm=comp||rest.match(new RegExp(fn+"\\s*\\(\\s*(-?[\\d.\\/]+)\\s*\\)"));if(!mm)return null;
  function once(val,s){var sub=subst(n,v,{t:"n",v:val}),first=show(sub),ev1=evaluate(stringify(sub));s.push(St(fn+"("+fmx(val)+") = "+first,"Replace **every "+v+"** with ("+fmx(val)+")."));if(ev1)ev1.steps.forEach(function(x){if(x.m!==first)s.push(St("= "+x.m,""))});return ev1}
  var val=F(nums(mm[1])[0]),s=[],e1=once(val,s);if(!e1||!e1.exact&&!isFinite(e1.val))return {kind:"func",q:fn+"("+fmx(val)+")",steps:s,answer:"\\t{undefined}"};
  if(comp){var inner=e1.exact||F(e1.val);s.push(St(fn+"("+fn+"("+fmx(val)+")) = "+fn+"("+fmx(inner)+")","Work from the **inside out**: the inner answer goes into "+fn+" again."));var e2=once(inner,s);return {kind:"func",q:fn+"("+v+") = "+show(n)+", \\s "+fn+"("+fn+"("+fmx(val)+"))",steps:s,answer:fn+"("+fn+"("+fmx(val)+")) = "+(e2?e2.answer:"?")}}
  return {kind:"func",q:fn+"("+v+") = "+show(n)+", \\s "+fn+"("+fmx(val)+")",steps:s,answer:fn+"("+fmx(val)+") = "+e1.answer}}
/* questions about a straight line: slope, intercepts, parallel, perpendicular */
function lineInfo(q){var t=clean(q),m=t.match(/(-?[\dxy.\s+\-*\/()]*[xy][\dxy.\s+\-*\/()]*)=([\dxy.\s+\-*\/()]+)/i);if(!m)return null;var L,Rr;try{L=toPoly(parse(m[1]));Rr=toPoly(parse(m[2]))}catch(e){return null}if(!L||!Rr)return null;
  var Dd=psub(L,Rr),vs=pvars(Dd);if(vs.join("")!=="xy"&&vs.join("")!=="x"&&vs.join("")!=="y"||pdeg(Dd)>1)return null;var A=pconst(pcoef(pcoef(Dd,"y",0),"x",1))||F(0),B=pconst(pcoef(pcoef(Dd,"x",0),"y",1))||F(0),C=pconst(pcoef(pcoef(Dd,"x",0),"y",0))||F(0),tl=t.toLowerCase(),s=[],eq=show(parse(m[1]))+" = "+show(parse(m[2]));
  if(fz(B)){var xv=fdiv(fneg(C),A);return {kind:"line",q:eq,steps:[St("x = "+fmx(xv),"There's no y, so it's a **vertical** line.")],answer:/perpendicular/.test(tl)?"\\t{perpendicular slope } = 0":"\\t{slope is undefined (vertical line } x = "+fmx(xv)+"\\t{)}"}}
  var mS=fdiv(fneg(A),B),b=fdiv(fneg(C),B),yform="y = "+pmx(padd(pscale(pvar("x"),mS),P(b)));
  if(!(m[1].replace(/\s/g,"")==="y"))s.push(St(yform,"Get **y alone** (slope-intercept form): then the number with x is the slope."));
  var facts=[["Slope",fmx(mS)],["y-intercept","(0, "+fmx(b)+")"],["x-intercept",fz(mS)?"none":"("+fmx(fdiv(fneg(b),mS))+", 0)"],["Parallel slope",fmx(mS)],["Perpendicular slope",fz(mS)?"undefined":fmx(fdiv(F(-1),mS))]];
  if(/perpendicular/.test(tl)){if(fz(mS))return {kind:"line",q:eq,steps:s,answer:"\\t{undefined (a vertical line)}",facts:facts};var pm=fdiv(F(-1),mS);s.push(St("m_{⟂} = −\\f{1}{"+fmx(mS)+"} = "+fmx(pm),"Perpendicular slopes are **negative reciprocals**: flip the fraction and change the sign."));return {kind:"line",q:eq,steps:s,answer:"m_{⟂} = "+fmx(pm),facts:facts}}
  if(/parallel/.test(tl)){s.push(St("m_{∥} = "+fmx(mS),"Parallel lines have the **same** slope."));return {kind:"line",q:eq,steps:s,answer:"m_{∥} = "+fmx(mS),facts:facts}}
  if(/x-?\s*intercept/.test(tl)){if(fz(mS))return {kind:"line",q:eq,steps:s,answer:"\\t{no x-intercept}",facts:facts};var xi=fdiv(fneg(b),mS);s.push(St("0 = "+fmx(mS)+"x + "+fmx(b)+" \\t{ → } x = "+fmx(xi),"On the x-axis, **y = 0**."));return {kind:"line",q:eq,steps:s,answer:"\\t{x-intercept } ("+fmx(xi)+", 0)",facts:facts}}
  if(/y-?\s*intercept/.test(tl)){s.push(St("y = "+fmx(b)+" \\t{ when } x = 0","On the y-axis, **x = 0**."));return {kind:"line",q:eq,steps:s,answer:"\\t{y-intercept } (0, "+fmx(b)+")",facts:facts}}
  if(/slope|gradient|rate of change/.test(tl)){return {kind:"line",q:eq,steps:s,answer:"m = "+fmx(mS),facts:facts}}
  return null}
/* ---------------- probability & counting ---------------- */
var NW={one:1,a:1,an:1,once:1,two:2,twice:2,both:2,three:3,thrice:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
function nword(x){return x==null?null:isNaN(+x)?NW[x]:+x}
function fact(n){var r=1;for(var i=2;i<=n;i++)r*=i;return r}
function nCr(n,r){if(r<0||r>n)return 0;var x=1;for(var i=1;i<=r;i++)x=x*(n-r+i)/i;return Math.round(x)}
function nPr(n,r){var x=1;for(var i=0;i<r;i++)x*=n-i;return x}
function pres(title,steps,f,extra){var fr=typeof f==="object"?f:F(f);return {kind:"prob",q:title,steps:steps,answer:"P = "+fmx(fr)+(fint(fr)?"":" ≈ "+dec(fv(fr),4)+" \\t{ ("+dec(100*fv(fr),2)+"\\%)}"),note:extra}}
function prob(q){var t=clean(q).toLowerCase(),m,N="(\\d+|one|a|an|two|three|four|five|six|seven|eight|nine|ten|twice|thrice|once|both)";
  /* counting */
  var mc=t.match(/(?:choose|select|pick)\s+(\d+)\s*(?:\w+\s+)?(?:from|out of|of)\s+(\d+)/);if(mc)m=[mc[0],mc[2],mc[1]];
  if(m||(m=t.match(/(\d+)\s*(?:choose|c)\s*(\d+)/))||(m=t.match(/c\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/))){var n=+m[1],r=+m[2];if(r>n){var sw=n;n=r;r=sw}return {kind:"prob",q:"\\t{choose } "+r+" \\t{ from } "+n,steps:[St("_{"+n+"}C_{"+r+"} = \\f{"+n+"!}{"+r+"!("+n+" − "+r+")!}","Order **doesn't** matter (a group, a team): use combinations."),St("= \\f{"+nPr(n,r)+"}{"+fact(r)+"} = "+nCr(n,r),"Top: "+n+" × "+(n-1)+(r>2?" × …":"")+" ("+r+" numbers). Bottom: "+r+"! = "+fact(r)+" (the ways to reorder the chosen ones).")],answer:nCr(n,r)+" \\t{ ways}"}}
  if((m=t.match(/(\d+)\s*p\s*(\d+)/))||(m=t.match(/p\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/))||(m=t.match(/(?:arrange|order|permutations? of)\s*(\d+)\D+?(\d+)/))&&/arrange|order|permut|first|second|gold/.test(t)){var n2=+m[1],r2=+m[2];if(r2>n2){var tmp=n2;n2=r2;r2=tmp}return {kind:"prob",q:"\\t{arrange } "+r2+" \\t{ of } "+n2,steps:[St("_{"+n2+"}P_{"+r2+"} = "+Array.apply(null,{length:r2}).map(function(_,i){return n2-i}).join(" × "),"Order **matters**: "+n2+" choices for the first spot, "+(n2-1)+" for the next, …")],answer:nPr(n2,r2)+" \\t{ ways}"}}
  if((m=t.match(/(?:how many ways (?:can you |to |are there to )?(?:arrange|order|line up|seat))\s*(\d+)/))||(m=t.match(/(\d+)\s*!/))){var k=+m[1];return {kind:"prob",q:k+"!",steps:[St(k+"! = "+Array.apply(null,{length:k}).map(function(_,i){return k-i}).join(" × "),"Each place has one fewer choice than the one before.")],answer:fact(k)+" \\t{ ways}"}}
  /* marbles in a bag */
  var bag=[],seenC={},head=t.split(/probab|chance|odds|\bdraw|\bpick|\bselect/)[0]||t,re=/(\d+)\s+(red|blue|green|white|black|yellow|orange|purple|pink)\b/g;while((m=re.exec(head)))if(!seenC[m[2]]){seenC[m[2]]=1;bag.push([m[2],+m[1]])}
  if(bag.length>=2&&/(probab|chance|odds|draw|pick|select|choose)/.test(t)){var tot=bag.reduce(function(a,b){return a+b[1]},0),cols=bag.map(function(b){return b[0]}),want=null;
    var tail=t.slice(head.length),each=tail.match(/one of each|one (red|blue|green|white|black|yellow|orange|purple|pink) and one (red|blue|green|white|black|yellow|orange|purple|pink)/);
    if(each&&bag.length>=2){var cA=each[1]||bag[0][0],cB=each[2]||bag[1][0],nA=(bag.filter(function(b){return b[0]===cA})[0]||[0,0])[1],nB=(bag.filter(function(b){return b[0]===cB})[0]||[0,0])[1],wr2=/with replacement|put back/.test(t)&&!/without/.test(t);
      var p1=fmul(F(nA,tot),wr2?F(nB,tot):F(nB,tot-1)),p2=fmul(F(nB,tot),wr2?F(nA,tot):F(nA,tot-1)),pe=fadd(p1,p2);
      return pres("P(\t{one "+cA+" and one "+cB+"})",[St("P("+cA+"\t{ then }"+cB+") = \f{"+nA+"}{"+tot+"} × "+(wr2?"\f{"+nB+"}{"+tot+"}":"\f{"+nB+"}{"+(tot-1)+"}")+" = "+fmx(p1),"One order."),St("P("+cB+"\t{ then }"+cA+") = \f{"+nB+"}{"+tot+"} × "+(wr2?"\f{"+nA+"}{"+tot+"}":"\f{"+nA+"}{"+(tot-1)+"}")+" = "+fmx(p2),"The other order."),St(fmx(p1)+" + "+fmx(p2)+" = "+fmx(pe),"Either order works → **add**.")],pe)}

    var tail=t.slice(head.length),wm=tail.match(new RegExp("(?:both|two|2|all|a|an|one|1|draw(?:ing)?|pick(?:ing)?|get(?:ting)?)\\s+("+cols.join("|")+")(?![\\s\\S]*\\b(and|then)\\b)"))||t.match(new RegExp("(?:probability|chance)[^.]*?\\b("+cols.join("|")+")\\b"));if(wm)want=wm[1];if(!want)return null;var w=bag.filter(function(b){return b[0]===want})[0][1];
    if(/\b(both|two|twice|2)\s+(?:\w+\s+)?(red|blue|green|white|black|yellow|orange|purple|pink|marbles|balls)|\b(both|twice)\b/.test(tail)){var wr=/with replacement|replace|put back/.test(t)&&!/without/.test(t);var f1=F(w,tot),f2=wr?F(w,tot):F(w-1,tot-1),pr=fmul(f1,f2);
      return pres("P(\\t{two "+want+"})",[St("P(\\t{1st "+want+"}) = \\f{"+w+"}{"+tot+"}","There are "+w+" "+want+" out of "+tot+"."),St("P(\\t{2nd "+want+"}) = "+(wr?"\\f{"+w+"}{"+tot+"}":"\\f{"+(w-1)+"}{"+(tot-1)+"}"),wr?"It was put back, so nothing changes.":"**Without replacement**: one "+want+" and one marble are gone."),St("\\f{"+w+"}{"+tot+"} × "+(wr?"\\f{"+w+"}{"+tot+"}":"\\f{"+(w-1)+"}{"+(tot-1)+"}")+" = "+fmx(pr),"**And** → multiply.")],pr)}
    return pres("P(\\t{"+want+"})",[St("P = \\f{\\t{"+want+"}}{\\t{all}} = \\f{"+w+"}{"+tot+"}","Want over all: "+w+" "+want+" out of "+tot+" in total.")],F(w,tot))}
  /* coins */
  if(/\b(coin|coins|flip|flips|flipped|toss|tosses|tossed|heads|tails)\b/.test(t)){var k2=nword((t.match(new RegExp(N+"\\s*(?:coin\\s*|fair coins?\\s*)?(?:times|flips|tosses|coins|tries)\\b"))||[])[1])||nword((t.match(/\b(twice|thrice)\b/)||[])[1])||nword((t.match(new RegExp("(?:flip|toss)\\s+(?:a coin\\s+)?"+N+"\\b(?!\\s*heads?|\\s*tails?)"))||[])[1])||1;
    var side=/tail/.test(t)&&!/head/.test(t)?"tails":"heads",TOT=Math.pow(2,k2);
    var al=t.match(new RegExp("at (least|most)\\s+"+N+"\\s+(?:heads?|tails?)"));if(al){var j2=nword(al[2]),most=al[1]==="most",cnt=0,lst=[];for(var x=0;x<=k2;x++)if(most?x<=j2:x>=j2){cnt+=nCr(k2,x);lst.push("_{"+k2+"}C_{"+x+"}")}var pal=F(cnt,TOT);
      return pres("P(\\t{at "+al[1]+" "+j2+" "+side+" in "+k2+" flips})",[St(lst.join(" + ")+" = "+cnt,"Add the ways for each allowed number of "+side+"."),St("\\f{"+cnt+"}{2^{"+k2+"}} = "+fmx(pal),"Out of 2^"+k2+" = "+TOT+" equally likely sequences.")],pal)}
    if(/at least one/.test(t)){var pn=F(1,TOT),pa=fsub(F(1),pn);return pres("P(\\t{at least one "+side.replace(/s$/,"")+" in "+k2+" flips})",[St("P(\\t{none}) = (\\f{1}{2})^{"+k2+"} = "+fmx(pn),"Flip it: the opposite of “at least one” is “none at all”."),St("1 − "+fmx(pn)+" = "+fmx(pa),"Subtract from 1.")],pa)}
    var ex=t.match(new RegExp("(?:exactly\\s+)?"+N+"\\s+(heads|tails|head|tail)\\b"));if(ex&&nword(ex[1])!==null&&!(k2===1)){var j=nword(ex[1]);if(j>k2)return pres("P",[St("\\t{impossible}","You can't get "+j+" "+side+" from "+k2+" flips.")],F(0));var c=nCr(k2,j),pe=F(c,TOT);return pres("P(\\t{exactly "+j+" "+side+" in "+k2+"})",[St("_{"+k2+"}C_{"+j+"} = "+c,"How many ways can "+j+" of the "+k2+" flips be "+side+"? Choose which ones."),St("\\f{"+c+"}{2^{"+k2+"}} = "+fmx(pe),"Each exact sequence has chance (1/2)^"+k2+".")],pe)}
    var pall=F(1,TOT);return pres("P(\\t{"+side+(k2>1?" every time in "+k2+" flips":"")+"})",[St(k2>1?"(\\f{1}{2})^{"+k2+"} = "+fmx(pall):"P = \\f{1}{2}",k2>1?"Flips are **independent** — multiply ½ for each flip.":"Two equally likely sides.")],pall)}
  /* cards */
  if(/\b(card|cards|deck|aces?|kings?|queens?|jacks?|hearts?|spades?|clubs?|diamonds?)\b/.test(t)&&/\b(card|cards|deck|draw\w*|pick\w*)\b/.test(t)){
    var CATS=[[/face cards?/,12,"face card",null],[/\baces?\b/,4,"ace","r"],[/\bkings?\b/,4,"king","r"],[/\bqueens?\b/,4,"queen","r"],[/\bjacks?\b/,4,"jack","r"],[/\bhearts?\b/,13,"heart","s"],[/\bspades?\b/,13,"spade","s"],[/\bclubs?\b/,13,"club","s"],[/\bdiamonds?\b/,13,"diamond","s"],[/\bred\b/,26,"red card","c"],[/\bblack\b/,26,"black card","c"]];
    var found=CATS.filter(function(c){return c[0].test(t)});if(!found.length)return null;
    if(found.length>=2&&/\bor\b/.test(t)){var A1=found[0],B1=found[1],ov=0;if(A1[3]==="r"&&B1[3]==="s"||A1[3]==="s"&&B1[3]==="r")ov=1;else if(A1[3]==="r"&&B1[3]==="c"||A1[3]==="c"&&B1[3]==="r")ov=2;else if(A1[3]==="s"&&B1[3]==="c"||A1[3]==="c"&&B1[3]==="s")ov=(/heart|diamond/.test(A1[2]+B1[2])&&/red/.test(A1[2]+B1[2])||/spade|club/.test(A1[2]+B1[2])&&/black/.test(A1[2]+B1[2]))?13:0;else if(A1[2]==="face card"&&B1[3]==="s"||B1[2]==="face card"&&A1[3]==="s")ov=3;
      var tot=A1[1]+B1[1]-ov,po=F(tot,52);return pres("P(\\t{"+A1[2]+" or "+B1[2]+"})",[St("P(A) + P(B) − P(\\t{both}) = \\f{"+A1[1]+"}{52} + \\f{"+B1[1]+"}{52} − \\f{"+ov+"}{52}","**Or** → add, then take away the cards counted twice ("+ov+" "+(ov===1?"card is":"cards are")+" both)."),St("\\f{"+tot+"}{52} = "+fmx(po),"Simplify.")],po)}
    var c0=found[0],cnt=c0[1];
    if(/\b(two|2|both)\b/.test(t)&&/\b(draw|drawn|drawing|pick|picked|picking|deal|dealt)\b/.test(t)){var wr=/with replacement|replac|put back/.test(t)&&!/without/.test(t),f1=F(cnt,52),f2=wr?F(cnt,52):F(cnt-1,51),pr=fmul(f1,f2);
      return pres("P(\\t{two "+c0[2]+"s})",[St("P(\\t{1st}) = \\f{"+cnt+"}{52}","There are "+cnt+" "+c0[2]+"s in 52 cards."),St("P(\\t{2nd}) = "+(wr?"\\f{"+cnt+"}{52}":"\\f{"+(cnt-1)+"}{51}"),wr?"Put back, so nothing changes.":"**Without replacement**: one "+c0[2]+" and one card are gone."),St("\\f{"+cnt+"}{52} × "+(wr?"\\f{"+cnt+"}{52}":"\\f{"+(cnt-1)+"}{51}")+" = "+fmx(pr),"**And** → multiply.")],pr)}
    var neg=/\bnot\b/.test(t),pc=F(cnt,52);if(neg){var pn=fsub(F(1),pc);return pres("P(\\t{not a "+c0[2]+"})",[St("1 − \\f{"+cnt+"}{52} = "+fmx(pn),"“Not” = 1 − the chance it happens.")],pn)}
    return pres("P(\\t{"+c0[2]+"})",[St("P = \\f{"+cnt+"}{52} = "+fmx(pc),"A standard deck has 52 cards: 4 suits × 13 ranks, 26 red and 26 black, 12 face cards.")],pc)}
  /* dice */
  if(/\b(die|dice|roll|rolls|rolled|rolling)\b/.test(t)){var times=nword((t.match(new RegExp(N+"\\s*(?:times|rolls|dice)"))||[])[1])||nword((t.match(/\b(twice|thrice|both)\b/)||[])[1])||(/in a row/.test(t)?2:1);
    if((m=t.match(/sum\s*(?:of|is|=)?\s*(\d+)/))){var S=+m[1],c2=0,list=[];for(var a=1;a<=6;a++)for(var b=1;b<=6;b++)if(a+b===S){c2++;list.push("("+a+","+b+")")}var ps=F(c2,36);return pres("P(\\t{sum } "+S+")",[St("\\t{ways: } "+(list.join(" ")||"\\t{none}"),"List the pairs of two dice that add to "+S+"."),St("\\f{"+c2+"}{36} = "+fmx(ps),"Two dice make 6 × 6 = 36 equally likely outcomes.")],ps)}
    var neg=/\bnot\b|\bnever\b|\bwithout\b|\bno\s+\d/.test(t),tg=(t.match(/(?:a|an|one|rolling|roll|get|getting|no)\s+(\d+)\b(?!\s*(?:times|rolls|dice|sided))/)||[])[1],one=null,what="";
    if(tg&&+tg>6)return pres("P(\t{"+tg+" on one die})",[St("\t{faces: } 1, 2, 3, 4, 5, 6","A normal die only goes up to 6, so "+tg+" can't happen.")],F(0));
    if(/doubles/.test(t))return pres("P(\\t{doubles})",[St("\\f{6}{36} = \\f{1}{6}","(1,1), (2,2), … (6,6): 6 of the 36 outcomes.")],F(1,6));
    if(tg&&!/(?:greater|more|bigger|higher|less|smaller|lower) than/.test(t)){one=F(1,6);what="a "+tg}else if(/even|odd/.test(t)){one=F(1,2);what=/even/.test(t)?"an even number":"an odd number"}else if((m=t.match(/(?:greater|more|bigger|higher) than\s*(?:or equal to\s*)?(\d)/))){var ge=/or equal/.test(m[0]);one=F(Math.max(0,Math.min(6,6-+m[1]+(ge?1:0))),6);what=(ge?"at least ":"more than ")+m[1]}else if((m=t.match(/(?:less|smaller|lower) than\s*(?:or equal to\s*)?(\d)/))){var le=/or equal/.test(m[0]);one=F(Math.max(0,Math.min(6,+m[1]-1+(le?1:0))),6);what=(le?"at most ":"less than ")+m[1]}else if(/prime/.test(t)){one=F(1,2);what="a prime (2, 3 or 5)"}
    if(!one)return null;
    if(neg&&times===1){var nn=fsub(F(1),one);return pres("P(\t{not "+what+"})",[St("P(\t{"+what+"}) = "+fmx(one),"First find the chance it **does** happen."),St("1 − "+fmx(one)+" = "+fmx(nn),"“Not” = 1 − the chance it happens.")],nn)}
    if(/at least one/.test(t)&&times>1){var miss=fsub(F(1),one),pn2=fpow(miss,times),pa2=fsub(F(1),pn2);return pres("P(\\t{at least one "+what.replace(/^an? /,"")+" in "+times+" rolls})",[St("P(\\t{not "+what+"}) = "+fmx(miss),"First the chance of missing on one roll."),St("("+fmx(miss)+")^{"+times+"} = "+fmx(pn2),"Missing every time: multiply (independent rolls)."),St("1 − "+fmx(pn2)+" = "+fmx(pa2),"“At least one” = 1 − “none”.")],pa2)}
    var pt=fpow(one,times);return pres("P(\\t{"+what+(times>1?" "+times+" times in a row":"")+"})",[St("P(\\t{"+what+"}) = "+fmx(one),"Count the faces that work, out of 6.")].concat(times>1?[St("("+fmx(one)+")^{"+times+"} = "+fmx(pt),"Each roll is **independent**, so multiply.")]:[]),pt)}
  return null}

return {solveCompound:solveCompound,lineInfo:lineInfo,prob:prob,nCr:nCr,F:F,fmx:fmx,fstr:fstr,dec:dec,parse:parse,show:show,toPoly:toPoly,pmx:pmx,ptx:ptx,solveEq:solveEq,solveIneq:solveIneq,solveSystem:solveSystem,evaluate:evaluate,simplify:simplify,factor:factor,analyze:analyze,
  percent:percent,stats:stats,numberFacts:numberFacts,points:points,geometry:geometry,trig:trig,convert:convert,funcEval:funcEval,clean:clean,hasVar:hasVar,varsOf:varsOf,ev:ev,surdMX:surdMX,gcd:gcd,lcm:lcm}})();
