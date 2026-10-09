/* =====================================================================
   ZERO TO 800 — TOOLS
   graphing calculator · scratchpad · read aloud · question figures
   practice timer & pacing · hints · why each answer is right or wrong
   ===================================================================== */
ICONS.graph="M3 3v18h18 M7 15c2-6 4-9 6-6s3 4 6-2";ICONS.draw="M3 21c3-1 4-4 7-4s3 3 6 2 4-5 5-8 M15 4l5 5";ICONS.speak="M11 5 6 9H3v6h3l5 4z M15.5 9a4 4 0 0 1 0 6 M18.5 6a8 8 0 0 1 0 12";
if(!S.time)S.time={};

/* =================== GRAPHING CALCULATOR =================== */
function gCompile(src){var s=String(src).replace(/^\s*y\s*=\s*/i,"").replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/π/g,"pi").replace(/√/g,"sqrt").replace(/\s+/g,"").toLowerCase(),i=0;
  if(!s)throw 0;var T=["sqrt","abs","sin","cos","tan","log","ln","exp","pi","x","e"];
  function num(){var m=s.slice(i).match(/^\d*\.?\d+/);if(!m)throw 0;i+=m[0].length;var v=parseFloat(m[0]);return function(){return v}}
  function prim(){var c=s[i];if(c==="("){i++;var f=expr();if(s[i]!==")")throw 0;i++;return f}
    if(c==="|"){i++;var g=expr();if(s[i]!=="|")throw 0;i++;return function(x){return Math.abs(g(x))}}
    for(var k=0;k<T.length;k++){var t=T[k];if(s.substr(i,t.length)===t){i+=t.length;
      if(t==="x")return function(x){return x};if(t==="pi")return function(){return Math.PI};if(t==="e")return function(){return Math.E};
      if(s[i]!=="(")throw 0;i++;var a=expr();if(s[i]!==")")throw 0;i++;var F={sqrt:Math.sqrt,abs:Math.abs,sin:Math.sin,cos:Math.cos,tan:Math.tan,log:function(v){return Math.log(v)/Math.LN10},ln:Math.log,exp:Math.exp}[t];return function(x){return F(a(x))}}}
    return num()}
  function unary(){if(s[i]==="-"){i++;var u=unary();return function(x){return -u(x)}}if(s[i]==="+"){i++;return unary()}return pw()}
  function pw(){var b=prim();if(s[i]==="^"){i++;var e=unary();return function(x){return Math.pow(b(x),e(x))}}return b}
  function term(){var v=unary();for(;;){var c=s[i];if(c==="*"){i++;var r=unary();v=(function(a,b){return function(x){return a(x)*b(x)}})(v,r)}else if(c==="/"){i++;var d=unary();v=(function(a,b){return function(x){return a(x)/b(x)}})(v,d)}
    else if(c&&/[(a-z0-9.|]/.test(c)&&c!=="|"){var m=pw();v=(function(a,b){return function(x){return a(x)*b(x)}})(v,m)}else return v}}
  function expr(){var v=term();for(;;){if(s[i]==="+"){i++;var r=term();v=(function(a,b){return function(x){return a(x)+b(x)}})(v,r)}else if(s[i]==="-"){i++;var d=term();v=(function(a,b){return function(x){return a(x)-b(x)}})(v,d)}else return v}}
  var f=expr();if(i<s.length)throw 0;return f}
var GR={exprs:["x^2-4","2x+1","","",""],view:{x0:-10,x1:10,y0:-7,y1:7},pts:[],sel:null};
var GCOL=["#5b7cff","#ef4f6b","#16a86f","#e8a21c","#9b6bff"];
function graphOpen(){if(el("graph")){el("graph").remove();return}var d=document.createElement("div");d.id="graph";d.className="graph";
  d.innerHTML='<div class="gr-h">'+ic("graph")+'<b>Graphing calculator</b><small>like Desmos · trig in radians</small><button class="tb-btn" title="Open the real Desmos in a new tab" onclick="window.open(\'https://www.desmos.com/calculator\',\'_blank\')">D</button><button class="tb-btn" onclick="el(\'graph\').remove()">'+ic("x")+'</button></div>'+
   '<div class="gr-b"><div class="gr-l" id="grL"></div><div class="gr-r"><canvas id="grC"></canvas><div class="gr-z"><button onclick="grZoom(0.7)">+</button><button onclick="grZoom(1.4)">−</button><button onclick="GR.view={x0:-10,x1:10,y0:-7,y1:7};grDraw()">'+ic("home")+'</button></div></div></div><div class="gr-pts" id="grP"></div>';
  document.body.appendChild(d);grInputs();grBind();setTimeout(grDraw,30)}
function grInputs(){el("grL").innerHTML=GR.exprs.map(function(e,k){return '<div class="gr-in"><i style="background:'+GCOL[k]+'"></i><span>y =</span><input data-k="'+k+'" value="'+esc(e)+'" placeholder="'+(k===0?"e.g. x^2 - 4":"")+'" autocomplete="off" spellcheck="false"></div>'}).join("")+'<p class="gr-tip">Type with x: 3x+2, (x-1)^2, sqrt(x), abs(x), 2^x, 1/x. Tap a point below to see it.</p>';
  el("grL").querySelectorAll("input").forEach(function(inp){inp.oninput=function(){GR.exprs[+inp.getAttribute("data-k")]=inp.value;grDraw()};inp.onkeydown=function(e){e.stopPropagation()}})}
function grBind(){var c=el("grC"),drag=null;
  c.onpointerdown=function(e){drag={x:e.clientX,y:e.clientY,v:Object.assign({},GR.view)};c.setPointerCapture(e.pointerId)};
  c.onpointermove=function(e){if(!drag)return;var r=c.getBoundingClientRect(),dx=(e.clientX-drag.x)/r.width*(drag.v.x1-drag.v.x0),dy=(e.clientY-drag.y)/r.height*(drag.v.y1-drag.v.y0);GR.view={x0:drag.v.x0-dx,x1:drag.v.x1-dx,y0:drag.v.y0+dy,y1:drag.v.y1+dy};grDraw()};
  c.onpointerup=function(){drag=null};c.onwheel=function(e){e.preventDefault();grZoom(e.deltaY>0?1.15:0.87)}}
function grZoom(f){var v=GR.view,cx=(v.x0+v.x1)/2,cy=(v.y0+v.y1)/2,w=(v.x1-v.x0)*f/2,h=(v.y1-v.y0)*f/2;GR.view={x0:cx-w,x1:cx+w,y0:cy-h,y1:cy+h};grDraw()}
function grDraw(){var c=el("grC");if(!c)return;var dpr=window.devicePixelRatio||1,W=c.clientWidth||360,H=c.clientHeight||300;c.width=W*dpr;c.height=H*dpr;var x=c.getContext("2d");if(!x||!x.setTransform)return;x.setTransform(dpr,0,0,dpr,0,0);
  var v=GR.view,dark=document.documentElement.getAttribute("data-theme")==="dark";function X(a){return (a-v.x0)/(v.x1-v.x0)*W}function Y(b){return H-(b-v.y0)/(v.y1-v.y0)*H}
  x.fillStyle=dark?"#151b2a":"#ffffff";x.fillRect(0,0,W,H);
  var st=Math.pow(10,Math.floor(Math.log10((v.x1-v.x0)/8)));if((v.x1-v.x0)/st>16)st*=2;if((v.x1-v.x0)/st>16)st*=2.5;
  x.lineWidth=1;x.strokeStyle=dark?"#232b42":"#e8ebf3";x.fillStyle=dark?"#8892ab":"#6b7489";x.font="11px sans-serif";
  for(var gx=Math.ceil(v.x0/st)*st;gx<=v.x1;gx+=st){x.beginPath();x.moveTo(X(gx),0);x.lineTo(X(gx),H);x.stroke();if(Math.abs(gx)>1e-9)x.fillText(+gx.toFixed(6),X(gx)+2,Math.min(H-4,Math.max(12,Y(0)+12)))}
  for(var gy=Math.ceil(v.y0/st)*st;gy<=v.y1;gy+=st){x.beginPath();x.moveTo(0,Y(gy));x.lineTo(W,Y(gy));x.stroke();if(Math.abs(gy)>1e-9)x.fillText(+gy.toFixed(6),Math.min(W-28,Math.max(2,X(0)+3)),Y(gy)-2)}
  x.strokeStyle=dark?"#8892ab":"#3a4258";x.lineWidth=1.5;x.beginPath();x.moveTo(X(0),0);x.lineTo(X(0),H);x.moveTo(0,Y(0));x.lineTo(W,Y(0));x.stroke();
  var fs=[];GR.exprs.forEach(function(e,k){if(!e.trim())return;try{fs.push([k,gCompile(e)])}catch(er){var inp=document.querySelector('#grL input[data-k="'+k+'"]');if(inp)inp.classList.add("bad")}});
  document.querySelectorAll("#grL input").forEach(function(inp){var k=+inp.getAttribute("data-k");inp.classList.toggle("bad",!!GR.exprs[k].trim()&&!fs.some(function(p){return p[0]===k}))});
  var N=Math.max(300,Math.round(W*1.5));GR.pts=[];
  fs.forEach(function(p){var f=p[1];x.strokeStyle=GCOL[p[0]];x.lineWidth=2.6;x.beginPath();var pen=false,py=null;
    for(var j=0;j<=N;j++){var xv=v.x0+(v.x1-v.x0)*j/N,yv=f(xv);if(!isFinite(yv)||(py!==null&&Math.abs(yv-py)>(v.y1-v.y0)*3)){pen=false;py=isFinite(yv)?yv:null;continue}
      if(pen)x.lineTo(X(xv),Y(yv));else{x.moveTo(X(xv),Y(yv));pen=true}py=yv}x.stroke()});
  function root(g,a,b){var fa=g(a);for(var t=0;t<50;t++){var m=(a+b)/2,fm=g(m);if(fa*fm<=0)b=m;else{a=m;fa=fm}}return (a+b)/2}
  function scan(g,kind,yf){var px=v.x0,pv=g(px);for(var j=1;j<=N;j++){var cx=v.x0+(v.x1-v.x0)*j/N,cv=g(cx);if(isFinite(pv)&&isFinite(cv)&&pv*cv<=0&&Math.abs(pv-cv)<(v.y1-v.y0)){var r=root(g,px,cx);GR.pts.push({x:r,y:yf(r),kind:kind})}px=cx;pv=cv}}
  fs.forEach(function(p){var f=p[1],h=(v.x1-v.x0)/N;scan(f,"zero",function(){return 0});scan(function(z){return f(z+h/4)-f(z-h/4)},"turning point",f)});
  for(var a=0;a<fs.length;a++)for(var b=a+1;b<fs.length;b++){(function(f1,f2){scan(function(z){return f1(z)-f2(z)},"intersection",f1)})(fs[a][1],fs[b][1])}
  var seen={};GR.pts=GR.pts.filter(function(q){var k=q.kind+Math.round(q.x*1000);if(seen[k]||!isFinite(q.y))return false;seen[k]=1;return true}).slice(0,24);
  GR.pts.forEach(function(q,k){x.fillStyle=GR.sel===k?"#ff9f1c":(dark?"#d6dcef":"#1b2236");x.beginPath();x.arc(X(q.x),Y(q.y),GR.sel===k?6:3.5,0,7);x.fill()});
  var pp=el("grP");if(pp)pp.innerHTML=GR.pts.length?GR.pts.map(function(q,k){return '<button class="'+(GR.sel===k?"on":"")+'" onclick="GR.sel='+k+';grDraw()"><small>'+q.kind+'</small>('+(+q.x.toFixed(3))+', '+(+q.y.toFixed(3))+')</button>'}).join(""):'<span class="muted">Zeros, turning points and intersections appear here.</span>'}
function graphWith(exprs){if(!el("graph"))graphOpen();GR.exprs=exprs.concat(["","","","",""]).slice(0,5);grInputs();grDraw()}

/* =================== SCRATCHPAD =================== */
var SP={col:"#5b7cff",w:3,er:false};
function scratchOpen(){if(el("scratch")){el("scratch").remove();return}var d=document.createElement("div");d.id="scratch";
  d.innerHTML='<canvas id="spC"></canvas><div class="sp-bar">'+["#5b7cff","#ef4f6b","#16a86f","#f0f2f8","#1b2236"].map(function(c){return '<button class="sp-c" style="background:'+c+'" onclick="SP.col=\''+c+'\';SP.er=false;spMark(this)"></button>'}).join("")+'<button class="sp-t" onclick="SP.er=!SP.er;this.classList.toggle(\'on\',SP.er)">Eraser</button><button class="sp-t" onclick="spClear()">Clear</button><button class="sp-t" onclick="el(\'scratch\').remove()">'+ic("x")+'</button></div>';
  document.body.appendChild(d);var c=el("spC"),dpr=window.devicePixelRatio||1;c.width=innerWidth*dpr;c.height=innerHeight*dpr;var x=c.getContext("2d");if(!x||!x.scale)return;x.scale(dpr,dpr);x.lineCap="round";x.lineJoin="round";var dn=false,lx,ly;
  c.onpointerdown=function(e){dn=true;lx=e.clientX;ly=e.clientY;c.setPointerCapture(e.pointerId)};c.onpointerup=function(){dn=false};
  c.onpointermove=function(e){if(!dn)return;x.globalCompositeOperation=SP.er?"destination-out":"source-over";x.strokeStyle=SP.col;x.lineWidth=SP.er?24:SP.w;x.beginPath();x.moveTo(lx,ly);x.lineTo(e.clientX,e.clientY);x.stroke();lx=e.clientX;ly=e.clientY}}
function spMark(b){document.querySelectorAll(".sp-c").forEach(function(x){x.classList.toggle("on",x===b)})}
function spClear(){var c=el("spC");if(c){var x=c.getContext("2d");if(x&&x.clearRect)x.clearRect(0,0,c.width,c.height)}}

/* =================== READ ALOUD =================== */
function speak(text){try{var ss=window.speechSynthesis;if(!ss)return toast("Read aloud isn't supported in this browser");if(ss.speaking){ss.cancel();return}var u=new SpeechSynthesisUtterance(text.replace(/\s+/g," ").slice(0,4000));u.lang="en-US";u.rate=.95;ss.speak(u)}catch(e){}}
var _vlT=viewLesson;viewLesson=function(a,uid,lid){_vlT(a,uid,lid);var top=a.querySelector(".pl-top");if(!top||!window.speechSynthesis)return;var b=document.createElement("button");b.className="tb-btn";b.title="Read this page aloud";b.innerHTML=ic("speak");b.onclick=function(){var st=el("plStage");if(st)speak(st.textContent)};top.insertBefore(b,top.lastElementChild)};

/* =================== QUESTIONS WITH FIGURES =================== */
function figTriAngles(a,b){var base=280,ta=Math.tan(a*Math.PI/180),tb=Math.tan(b*Math.PI/180),d1=base*tb/(ta+tb),h=d1*ta,sc=Math.min(1,150/h),W=base*sc,x0=45+(base-W)/2,A=[x0,190],B=[x0+W,190],C=[x0+d1*sc,190-h*sc];
  return '<figure class="fig"><svg viewBox="0 0 370 220" style="width:100%;max-width:370px"><path d="M'+A[0].toFixed(1)+' 190 L'+B[0].toFixed(1)+' 190 L'+C[0].toFixed(1)+' '+C[1].toFixed(1)+' Z" pathLength="1" class="fdraw" style="fill:none;stroke:var(--ink);stroke-width:2.5"/>'+
   '<text x="'+(A[0]+26).toFixed(1)+'" y="182" class="ft fpop" style="fill:var(--blue)">'+a+'°</text><text x="'+(B[0]-26).toFixed(1)+'" y="182" class="ft fpop" style="fill:var(--blue)" text-anchor="end">'+b+'°</text><text x="'+C[0].toFixed(1)+'" y="'+(C[1]+30).toFixed(1)+'" class="ft fpop" style="fill:var(--red)" text-anchor="middle">x°</text></svg><figcaption>Note: figure not drawn to scale.</figcaption></figure>'}
(function(){var R=function(){return GEN.rnd()};function ri(a,b){return a+Math.floor(R()*(b-a+1))}function pk(a){return a[Math.floor(R()*a.length)]}function nz(a,b){var v;do{v=ri(a,b)}while(v===0);return v}
  function nm(q,a,s,fig){return {t:"num",q:q,a:String(a),s:s,fig:fig}}function f(n){return n<0?"−"+(-n):String(n)}
  var S_=GEN._S;function add(u,n,fn){(S_[u]=S_[u]||[]).push([n,fn])}
  add("lines","Slope from a graph",function(d){var m=pk([1,2,-1,-2,0.5,-0.5,3,-3]),x1=pk([-2,0]),y1=nz(-3,3),dx=m%1?2:1,x2=x1+dx*2,y2=y1+m*(x2-x1);if(Math.abs(y2)>5){y1=-y1;y2=y1+m*(x2-x1)}var b=y1-m*x1;
    return nm("The line in the graph passes through two marked grid points. What is its slope?",GEN.frac(Math.round(m*2),2),"From ("+f(x1)+", "+f(y1)+") to ("+f(x2)+", "+f(y2)+"): rise "+f(y2-y1)+", run "+(x2-x1)+". Slope = "+f(y2-y1)+"/"+(x2-x1)+" = "+GEN.frac(Math.round(m*2),2).replace("-","−")+".",FIG.plane({r:6,lines:[{m:m,b:b}],pts:[[x1,y1,""],[x2,y2,""]]}))});
  add("geo1","Triangle angles (figure)",function(d){var a=ri(30,80),b=ri(30,80);return nm("In the triangle shown, what is the value of x?",180-a-b,"The angles of a triangle add to 180°: x = 180 − "+a+" − "+b+" = "+(180-a-b)+".",figTriAngles(a,b))});
  add("geo1","Right triangle (figure)",function(d){var t=pk([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[7,24,25]]),k=ri(1,2),leg=R()<.4,A=t[0]*k,B=t[1]*k,C=t[2]*k;
    return leg?nm("In the right triangle shown, what is the length of the side marked x?",B,"Pythagoras: x = √("+C+"² − "+A+"²) = √"+(C*C-A*A)+" = "+B+".",FIG.tri({a:String(A),b:"x",c:String(C)})):nm("In the right triangle shown, what is the length of the hypotenuse x?",C,"x = √("+A+"² + "+B+"²) = √"+(C*C)+" = "+C+".",FIG.tri({a:String(A),b:String(B),c:"x"}))});
  add("geo2","Sector area (figure)",function(d){var deg=pk([45,60,90,120,135,150,240]),r=pk([2,3,4,6,8,12]),k=+(deg/360*r*r).toFixed(4);
    return nm("The shaded sector has a central angle of "+deg+"° in a circle of radius "+r+". Its area is kπ. What is k?",k,"Sector = ("+deg+"/360) × π × "+r+"² = "+k+"π.",FIG.circ({deg:deg,r:String(r)}))});
  add("geo0","Parallel lines (figure)",function(d){var g=ri(35,145),pos=pk([1,2,3,4,5,6,7]),A=[0,3,4,7],x=A.indexOf(pos)>-1?g:180-g,lb=["","","","","","","",""];lb[0]=g+"°";lb[pos]="x°";
    return nm("Two parallel lines are cut by a transversal, as shown. What is the value of x?",x,"With parallel lines, every angle equals either "+g+"° or its supplement 180 − "+g+" = "+(180-g)+"°. The angle marked x is "+(x===g?"equal to the given angle (vertical / corresponding / alternate).":"supplementary to the given angle (they form a straight line or are co-interior)."),FIG.para(lb,{cs:["blue","ink","ink","ink","ink","ink","ink","ink"].map(function(c,i){return i===pos?"red":c}),cap:"Figure not drawn to scale."}))});
  add("data","Reading a bar chart (figure)",function(d){var L=["Mon","Tue","Wed","Thu","Fri"],v=L.map(function(){return 5*ri(2,14)}),i=ri(0,4),j=ri(0,4);while(j===i)j=ri(0,4);var tot=R()<.4;
    return tot?nm("The bar chart shows books sold each day. How many books were sold in total from Monday to Friday?",v.reduce(function(s,x){return s+x},0),"Add the five bars: "+v.join(" + ")+" = "+v.reduce(function(s,x){return s+x},0)+".",FIG.bars(v,L,{title:"Books sold"})):
      nm("The bar chart shows books sold each day. How many more books were sold on "+L[Math.max(v[i],v[j])===v[i]?i:j]+" than on "+L[Math.max(v[i],v[j])===v[i]?j:i]+"?",Math.abs(v[i]-v[j]),"Read both bars: "+Math.max(v[i],v[j])+" and "+Math.min(v[i],v[j])+". Difference = "+Math.abs(v[i]-v[j])+".",FIG.bars(v,L,{title:"Books sold"}))});
})();
T("Slope from a graph","lines","l4","slope = rise ÷ run between two exact grid points",["Find two points where the line crosses grid corners exactly.","Count the rise (up +, down −) and the run (right).","Divide and simplify."],"Using points that aren't exactly on grid corners, or counting the run as negative.",["graph"]);
T("Triangle angles (figure)","geo1","l2","angles in a triangle add to 180°",["Read the two given angles from the figure.","Subtract their sum from 180."],"Trusting how the angle looks — figures may not be drawn to scale.",["triangle shown"]);
T("Right triangle (figure)","geo1","l3","a² + b² = c² (c opposite the right angle)",["Find the right-angle mark; the side opposite it is c.","Look for a 3-4-5, 5-12-13 or 8-15-17 triple.","Otherwise square, add or subtract, then square-root."],"Adding the squares when the missing side is a leg.",["right triangle shown"]);
T("Sector area (figure)","geo2","l1","sector = (angle ÷ 360) × πr²",["Find the angle and radius in the figure.","Fraction of the circle = angle ÷ 360.","Multiply by πr²."],"Using the diameter, or forgetting to divide by 360.",["sector"]);
T("Parallel lines (figure)","geo0","l2","with parallel lines only two angle sizes exist: g and 180 − g",["Find the given angle.","Decide if x matches it (vertical, corresponding, alternate) or pairs with it to 180°.","Answer g or 180 − g."],"Assuming every angle is equal to the given one.",["parallel"]);
T("Reading a bar chart (figure)","data","l9","read title → axis → each bar carefully",["Read each needed bar's value from the axis.","Do the operation the question asks (difference, total)."],"Reading the wrong bar or misreading the scale.",["bar chart"]);
function figInject(root,it){if(!it||!it.fig||!root)return;var q=root.querySelector(".q-q");if(q&&!root.querySelector(".q-fig"))q.insertAdjacentHTML("afterend",'<div class="q-fig">'+it.fig+'</div>')}

/* =================== PRACTICE: timer · hint · figures · tools =================== */
function fmtS(ms){var s=Math.round(ms/1000);return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
var _dqT=drawQuestion;drawQuestion=function(){_dqT();var R=RUN;if(!R)return;var it=R.items[R.i],card=document.querySelector(".q-card");if(!card||!it)return;
  figInject(card,it);R.qStart=Date.now();R.hinted=false;
  var hd=document.querySelector(".q-head");if(hd&&!el("qTime"))hd.insertAdjacentHTML("beforeend",'<span class="qtime" id="qTime">'+ic("clock")+'<b>0:00</b></span>');
  clearInterval(window._qt);window._qt=setInterval(function(){var t=el("qTime");if(!t||!RUN||RUN.answered){clearInterval(window._qt);return}var ms=Date.now()-RUN.qStart;t.querySelector("b").textContent=fmtS(ms);t.classList.toggle("warn",ms>95000&&ms<=150000);t.classList.toggle("over",ms>150000)},500);
  var q=card.querySelector(".q-q");if(q)q.insertAdjacentHTML("afterend",'<div class="q-tools"><button class="btn sm ghost" id="hintBtn" onclick="showHint()">'+ic("bulb")+'Hint</button>'+(window.speechSynthesis?'<button class="btn sm ghost" onclick="speak(document.querySelector(\'.q-card .q-q\').textContent)">'+ic("speak")+'Read aloud</button>':'')+'<button class="btn sm ghost" onclick="graphOpen()">'+ic("graph")+'Graph</button><button class="btn sm ghost" onclick="scratchOpen()">'+ic("draw")+'Scratchpad</button></div>');
  if(q&&it.fig){var f=card.querySelector(".q-fig"),tl=card.querySelector(".q-tools");if(f&&tl)f.parentNode.insertBefore(tl,f.nextSibling)}};
function showHint(){var R=RUN;if(!R||R.answered)return;var it=R.items[R.i],t=tipFor(it),b=el("hintBtn");R.hinted=true;
  var h=t?'<b>Hint:</b> '+esc(t.steps[0])+' <span class="muted">('+esc(t.f)+')</span>':'<b>Hint:</b> underline what is asked, write what you know, and pick the rule from this unit that connects them.';
  if(b)b.outerHTML='<div class="hintbox rise">'+ic("bulb")+'<span>'+h+'</span></div>'}
function diagnoseHTML(it){var R=RUN;if(!it)return "";var right=it.t==="mc"?it.c[it.a]:String(Array.isArray(it.a)?it.a[0]:it.a),L="ABCD";
  if(it.t==="mc"){var p=R&&R.picked;return '<div class="choicewhy"><h4>'+ic("list")+'Why each choice is right or wrong</h4>'+it.c.map(function(c,i){var ok=i===it.a;return '<div class="rch '+(ok?"r":"w")+(i===p?" p":"")+'"><b>'+(i===p&&!ok?"Your choice ":"Choice ")+L.charAt(i)+' is '+(ok?"correct":"incorrect")+'.</b> '+(ok?esc(it.s):esc(wrongWhy(it,c,right,i)))+'</div>'}).join("")+'</div>'}
  var inp=el("nin"),v=inp?inp.value.trim():"";if(!v)return "";return '<div class="choicewhy"><h4>'+ic("search")+'About your answer</h4><div class="rch w p"><b>You entered '+esc(v)+'; the answer is '+esc(right)+'.</b> '+esc(wrongWhy(it,v,right))+'</div></div>'}
var _fqT=finishQ;finishQ=function(ok,it,ct){var R=RUN,ms=R&&R.qStart?Date.now()-R.qStart:0;clearInterval(window._qt);_fqT(ok,it,ct);if(!R)return;
  R.times=R.times||[];R.times.push(ms);var u=it.uid||R.u.id,tm=S.time[u]||(S.time[u]={n:0,ms:0});tm.n++;tm.ms+=ms;saveS();
  var ex=el("exbox");if(!ex)return;var sec=Math.round(ms/1000),pace=sec<=95?["good","Good pace — under the SAT's ~95 seconds per question."]:sec<=150?["warn","A bit slow — the SAT gives about 95 seconds per question."]:["over","Too slow for test day — practise this skill until it's automatic."];
  ex.insertAdjacentHTML("afterbegin",'<div class="pace '+pace[0]+'">'+ic("clock")+'<b>'+sec+' s</b><span>'+pace[1]+(R.hinted?' (hint used)':'')+'</span></div>');
  if(!ok){var d=document.createElement("div");d.innerHTML=diagnoseHTML(it);var w=ex.querySelector(".whyc");if(d.firstChild){if(w)ex.insertBefore(d.firstChild,w);else ex.appendChild(d.firstChild)}}};
var _srT=showResults;showResults=function(){var R=RUN,times=R&&R.times||[];_srT();if(!times.length)return;var avg=Math.round(times.reduce(function(a,b){return a+b},0)/times.length/1000),c=document.querySelector(".q-card.result");
  if(c){var lab=c.querySelector(".lab");if(lab)lab.insertAdjacentHTML("afterend",'<div class="pace '+(avg<=95?"good":avg<=150?"warn":"over")+'" style="justify-content:center;margin-top:10px">'+ic("clock")+'<b>'+avg+' s</b><span>average per question · SAT pace ≈ 95 s</span></div>')}};

/* QB viewer, mock, worksheet: figures + timer */
var _qbqT=viewQBQ;viewQBQ=function(a,id){_qbqT(a,id);if(!QV)return;figInject(a.querySelector(".qv-card"),QV.it);QV.start=Date.now();
  var pos=a.querySelector(".qv-pos");if(pos)pos.insertAdjacentHTML("beforeend",' <span class="qtime" id="qvTime">'+ic("clock")+'<b>0:00</b></span>');
  var tools=a.querySelector(".qv-tools");if(tools)tools.insertAdjacentHTML("afterbegin",'<button class="tb-btn" title="Graphing calculator" onclick="graphOpen()">'+ic("graph")+'</button><button class="tb-btn" title="Scratchpad" onclick="scratchOpen()">'+ic("draw")+'</button>');
  clearInterval(window._qvt);window._qvt=setInterval(function(){var t=el("qvTime");if(!t||!QV||QV.done){clearInterval(window._qvt);return}var ms=Date.now()-QV.start;t.querySelector("b").textContent=fmtS(ms);t.classList.toggle("warn",ms>95000&&ms<=150000);t.classList.toggle("over",ms>150000)},500)};
var _qvsT=qvShow;qvShow=function(p,ok){clearInterval(window._qvt);_qvsT(p,ok);if(ok!=null&&QV&&QV.start){var ms=Date.now()-QV.start,u=QV.it.uid,tm=S.time[u]||(S.time[u]={n:0,ms:0});tm.n++;tm.ms+=ms;saveS();
  var r=el("qvRes");if(r)r.insertAdjacentHTML("afterbegin",'<div class="pace '+(ms<=95000?"good":ms<=150000?"warn":"over")+'">'+ic("clock")+'<b>'+Math.round(ms/1000)+' s</b><span>SAT pace ≈ 95 s per question</span></div>')}};
var _mdT=mockDraw;mockDraw=function(){_mdT();if(MOCK&&MOCK.items)figInject(document.querySelector(".mock .q-card"),MOCK.items[MOCK.i]);var mt=document.querySelector(".mtop");if(mt&&!mt.querySelector(".mt-tools"))mt.insertAdjacentHTML("beforeend",'<span class="mt-tools"><button class="tb-btn" onclick="calcOpen()">'+ic("calc")+'</button><button class="tb-btn" onclick="graphOpen()">'+ic("graph")+'</button><button class="tb-btn" onclick="refOpen()">'+ic("sigma")+'</button><button class="tb-btn" onclick="scratchOpen()">'+ic("draw")+'</button></span>')};
var _vsT=viewSheet;viewSheet=function(a,uid){_vsT(a,uid);if(!SHEET)return;a.querySelectorAll(".sq").forEach(function(c,i){figInject(c,SHEET.items[i])})};
var _pqT=pdfQuestions;pdfQuestions=function(title,sub,items){var q=items.map(function(it,i){return '<div class="pd-q"><b>'+(i+1)+'.</b> '+esc(it.q)+(it.fig?it.fig:"")+(it.t==="mc"?'<ol type="A">'+it.c.map(function(c){return '<li>'+esc(c)+'</li>'}).join("")+'</ol>':'<div class="pd-line">Answer: ____________________</div>')+'</div>'}).join("");
  var an=items.map(function(it,i){var r=it.t==="mc"?"ABCD".charAt(it.a)+") "+it.c[it.a]:it.a;return '<div class="pd-a"><b>'+(i+1)+'. '+esc(String(r))+'</b> — '+esc(it.s)+'</div>'}).join("");
  pdfDoc(title,sub,'<div class="pd-qs">'+q+'</div><div class="pd-lesson"><h2>Answer key with explanations</h2>'+an+'</div>')};

/* topbar tools during practice */
(function(){var t=el("tbTools");if(t)t.insertAdjacentHTML("afterbegin",'<button class="tb-btn fo" title="Graphing calculator" onclick="graphOpen()">'+ic("graph")+'</button><button class="tb-btn fo" title="Scratchpad" onclick="scratchOpen()">'+ic("draw")+'</button>')})();
NAV2.splice(3,0,["javascript:graphOpen()","Graphing calculator","graph"]);
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href="#javascript:graphOpen()"]');if(a){e.preventDefault();var m=a.closest(".modal");if(m)m.remove();graphOpen()}},true);navInit();
Object.assign(RU,{"Hint":"Подсказка","Read aloud":"Читать вслух","Graph":"График","Scratchpad":"Черновик","Graphing calculator":"Графический калькулятор","Why each choice is right or wrong":"Почему каждый вариант верен или неверен","About your answer":"О твоём ответе","Eraser":"Ластик","Clear":"Очистить"});

(function(){var c=`
.graph{position:fixed;right:18px;bottom:18px;z-index:115;width:min(760px,calc(100vw - 24px));border-radius:22px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--line);box-shadow:0 24px 70px rgba(0,0,0,.4);padding:12px;animation:fadeUp .25s ease both}
.gr-h{display:flex;align-items:center;gap:8px;margin-bottom:8px}.gr-h small{flex:1;color:var(--ink2)}.gr-h .tb-btn{font-weight:900;font-family:var(--ui)}
.gr-b{display:grid;grid-template-columns:240px 1fr;gap:10px}.gr-l{display:flex;flex-direction:column;gap:6px}
.gr-in{display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:12px;background:var(--paper);border:1px solid var(--line)}.gr-in i{width:12px;height:12px;border-radius:50%;flex:none}.gr-in span{font:700 13px var(--mono);color:var(--ink2)}
.gr-in input{flex:1;min-width:0;border:0;background:none;color:var(--ink);font:600 15px var(--mono);outline:none}.gr-in input.bad{color:var(--red)}
.gr-tip{font-size:11.5px;color:var(--ink2);margin:4px 2px 0;line-height:1.5}
.gr-r{position:relative}#grC{width:100%;height:320px;border-radius:14px;border:1px solid var(--line);touch-action:none;cursor:grab;display:block}
.gr-z{position:absolute;right:8px;top:8px;display:flex;flex-direction:column;gap:4px}.gr-z button{width:32px;height:32px;border-radius:9px;border:1px solid var(--line);background:var(--paper);color:var(--ink);font-weight:800;cursor:pointer;display:grid;place-items:center}.gr-z .ic{width:16px;height:16px}
.gr-pts{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;max-height:84px;overflow:auto}.gr-pts button{border:1px solid var(--line);background:var(--paper);color:var(--ink);border-radius:9px;padding:4px 8px;font:600 12px var(--mono);cursor:pointer}.gr-pts button small{display:block;font:600 10px var(--ui);color:var(--ink2);text-transform:uppercase}.gr-pts button.on{border-color:#ff9f1c}
@media(max-width:700px){.gr-b{grid-template-columns:1fr}#grC{height:240px}.graph{bottom:calc(84px + env(safe-area-inset-bottom,0px))}}
#scratch{position:fixed;inset:0;z-index:150;background:rgba(10,14,24,.08)}#spC{width:100%;height:100%;touch-action:none;cursor:crosshair}
.sp-bar{position:fixed;left:50%;top:14px;transform:translateX(-50%);display:flex;gap:6px;padding:8px;border-radius:16px;background:var(--glass);backdrop-filter:blur(16px);border:1px solid var(--line);box-shadow:0 10px 30px rgba(0,0,0,.25)}
.sp-c{width:30px;height:30px;border-radius:50%;border:2px solid var(--line);cursor:pointer}.sp-c.on{outline:3px solid var(--blue)}.sp-t{border:1px solid var(--line);background:var(--paper);color:var(--ink);border-radius:10px;padding:0 10px;font:600 13px var(--ui);cursor:pointer;display:grid;place-items:center}.sp-t.on{background:var(--blue);color:#fff}
.q-fig{margin:8px 0 6px}.q-fig .fig{margin:6px auto}
.q-tools{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 10px}.q-tools .btn{min-height:32px}
.qtime{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;background:var(--soft);font:700 13px var(--mono);color:var(--ink2);margin-left:auto}.qtime .ic{width:14px;height:14px}
.qtime.warn{color:#c98500;background:color-mix(in srgb,var(--yel) 18%,var(--soft))}.qtime.over{color:var(--red);background:color-mix(in srgb,var(--red) 12%,var(--soft));animation:pulse 1.2s infinite}
.hintbox{display:flex;gap:10px;align-items:flex-start;margin:4px 0 12px;padding:12px 14px;border-radius:14px;background:color-mix(in srgb,var(--yel) 14%,var(--paper));border:1px solid color-mix(in srgb,var(--yel) 40%,var(--line));font-size:15px}.hintbox .ic{color:var(--yel);flex:none}
.pace{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:13.5px;color:var(--ink2)}.pace .ic{width:16px;height:16px}.pace b{color:var(--ink)}
.pace.good .ic{color:var(--grn)}.pace.warn .ic{color:var(--yel)}.pace.over .ic{color:var(--red)}
.choicewhy{margin-top:12px}.choicewhy h4{display:flex;align-items:center;gap:6px;font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:var(--ink2);margin:10px 0 6px}.choicewhy h4 .ic{width:15px;height:15px}
.mt-tools{display:flex;gap:6px}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
QB=null;QBI={};
