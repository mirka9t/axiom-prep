/* =====================================================================
   AXIOM — tools 2.0
   floating windows (drag · snap · minimise · remember) · graphing calculator
   with math keypad, pretty preview, sliders, trace, table, points & lines
   ===================================================================== */
ICONS.plus="M12 5v14 M5 12h14";ICONS.extlink="M14 4h6v6 M20 4l-9 9 M18 14v6H4V6h6";ICONS.grip="M9 5h.01 M15 5h.01 M9 12h.01 M15 12h.01 M9 19h.01 M15 19h.01";ICONS.kbd="M3 6h18v12H3z M7 10h.01 M11 10h.01 M15 10h.01 M7 14h10";ICONS.corner="M4 9V4h5 M20 15v5h-5 M15 4h5v5 M9 20H4v-5";ICONS.minus="M5 12h14";ICONS.table="M4 5h16v14H4z M4 10h16 M4 15h16 M10 5v14";
if(!S.win)S.win={};

/* ---------------- floating windows ---------------- */
function winCtl(){return '<span class="wctl"><button class="tb-btn" data-wsnap title="Move to another corner">'+ic("corner")+'</button><button class="tb-btn" data-wmin title="Minimise (or double-click the title)">'+ic("minus")+'</button></span>'}
function makeFloat(win,handle,key){if(!win||!handle||win.__float)return;win.__float=1;win.classList.add("floatwin");
  if(!handle.querySelector(".wgrip"))handle.insertAdjacentHTML("afterbegin",'<span class="wgrip" title="Drag to move">'+ic("grip")+'</span>');
  function clamp(x,y){var w=win.offsetWidth,W=innerWidth,H=innerHeight;return [Math.min(Math.max(6,x),Math.max(6,W-w-6)),Math.min(Math.max(6,y),Math.max(6,H-56))]}
  function place(x,y,anim){var c=clamp(x,y);if(anim){win.classList.add("snapping");clearTimeout(win.__st);win.__st=setTimeout(function(){win.classList.remove("snapping")},360)}
    if(!win.style.width){var r=win.getBoundingClientRect();win.style.width=r.width+"px"}win.style.left=c[0]+"px";win.style.top=c[1]+"px";win.style.right="auto";win.style.bottom="auto";win.style.transform="none";S.win[key]={x:c[0],y:c[1]}}
  win.__place=place;var saved=S.win[key];if(saved)requestAnimationFrame(function(){place(saved.x,saved.y)});
  var drag=null,raf=0,tx=0,ty=0;
  handle.addEventListener("pointerdown",function(e){if(e.button>0||e.target.closest("button,input,select,textarea,a"))return;var r=win.getBoundingClientRect();drag={dx:e.clientX-r.left,dy:e.clientY-r.top};try{handle.setPointerCapture(e.pointerId)}catch(_){}win.classList.add("dragging");e.preventDefault()});
  handle.addEventListener("pointermove",function(e){if(!drag)return;tx=e.clientX-drag.dx;ty=e.clientY-drag.dy;if(!raf)raf=requestAnimationFrame(function(){raf=0;if(drag)place(tx,ty)})});
  function end(){if(!drag)return;drag=null;win.classList.remove("dragging");saveS()}
  handle.addEventListener("pointerup",end);handle.addEventListener("pointercancel",end);
  handle.addEventListener("dblclick",function(e){if(e.target.closest("button,input"))return;win.classList.toggle("minimized")});
  var order=["br","bl","tl","tr","c"];
  win.snapTo=function(where){var w=win.offsetWidth,h=win.offsetHeight,W=innerWidth,H=innerHeight,m=14,top=70,bottom=innerWidth<=900?90:m;
    var P={tl:[m,top],tr:[W-w-m,top],bl:[m,H-h-bottom],br:[W-w-m,H-h-bottom],c:[(W-w)/2,Math.max(top,(H-h)/2)]}[where];place(P[0],Math.max(6,P[1]),true);win.__corner=where;saveS()};
  var sn=win.querySelector("[data-wsnap]"),mn=win.querySelector("[data-wmin]");
  if(sn)sn.onclick=function(){var i=order.indexOf(win.__corner||"br");win.snapTo(order[(i+1)%order.length])};
  if(mn)mn.onclick=function(){win.classList.toggle("minimized")};
  win.addEventListener("pointerdown",function(){document.querySelectorAll(".floatwin").forEach(function(o){o.classList.toggle("front",o===win)})},true);
  window.addEventListener("resize",function(){if(win.isConnected&&win.style.left){var r=win.getBoundingClientRect();place(r.left,r.top)}})}
function floatsReset(){S.win={};saveS();document.querySelectorAll(".floatwin").forEach(function(w){w.style.left=w.style.top=w.style.width=w.style.right=w.style.bottom=w.style.transform="";w.classList.remove("minimized")});toast("Tool windows moved back to their default places")}

/* ---------------- expression engine (backwards compatible) ---------------- */
var GP_LETTERS="abcdhkmnpqrst";
function gNorm(src){return String(src).replace(/^\s*[a-z]\s*\(\s*x\s*\)\s*=\s*/i,"").replace(/^\s*y\s*=\s*/i,"").replace(/×|·/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/π/g,"pi").replace(/∛/g,"cbrt").replace(/√/g,"sqrt").replace(/²/g,"^2").replace(/³/g,"^3").replace(/\s+/g,"").toLowerCase()}
gCompile=function(src,P){var s=gNorm(src),i=0;if(!s)throw 0;var T=["sqrt","cbrt","asin","acos","atan","abs","sin","cos","tan","log","ln","exp","pi","x","e"],deg=P&&P.deg?Math.PI/180:1;
  var F={sqrt:Math.sqrt,cbrt:Math.cbrt,abs:Math.abs,sin:function(v){return Math.sin(v*deg)},cos:function(v){return Math.cos(v*deg)},tan:function(v){return Math.tan(v*deg)},asin:function(v){return Math.asin(v)/deg},acos:function(v){return Math.acos(v)/deg},atan:function(v){return Math.atan(v)/deg},log:function(v){return Math.log(v)/Math.LN10},ln:Math.log,exp:Math.exp};
  function num(){var m=s.slice(i).match(/^\d*\.?\d+/);if(!m)throw 0;i+=m[0].length;var v=parseFloat(m[0]);return function(){return v}}
  function prim(){var c=s[i];if(c==="("){i++;var f=expr();if(s[i]!==")")throw 0;i++;return f}
    if(c==="|"){i++;var g=expr();if(s[i]!=="|")throw 0;i++;return function(x){return Math.abs(g(x))}}
    for(var k=0;k<T.length;k++){var t=T[k];if(s.substr(i,t.length)===t){i+=t.length;
      if(t==="x")return function(x){return x};if(t==="pi")return function(){return Math.PI};if(t==="e")return function(){return Math.E};
      if(s[i]!=="(")throw 0;i++;var a=expr();if(s[i]!==")")throw 0;i++;var fn=F[t];return function(x){return fn(a(x))}}}
    if(P&&c&&GP_LETTERS.indexOf(c)>-1){i++;P.used=P.used||{};P.used[c]=1;return function(){var v=P.v&&P.v[c];return v===undefined?1:v}}
    return num()}
  function unary(){if(s[i]==="-"){i++;var u=unary();return function(x){return -u(x)}}if(s[i]==="+"){i++;return unary()}return pw()}
  function pw(){var b=prim();if(s[i]==="^"){i++;var e=unary();return function(x){return Math.pow(b(x),e(x))}}return b}
  function term(){var v=unary();for(;;){var c=s[i];if(c==="*"){i++;var r=unary();v=(function(a,b){return function(x){return a(x)*b(x)}})(v,r)}else if(c==="/"){i++;var d=unary();v=(function(a,b){return function(x){return a(x)/b(x)}})(v,d)}
    else if(c&&/[(a-z0-9.]/.test(c)){var m=pw();v=(function(a,b){return function(x){return a(x)*b(x)}})(v,m)}else return v}}
  function expr(){var v=term();for(;;){if(s[i]==="+"){i++;var r=term();v=(function(a,b){return function(x){return a(x)+b(x)}})(v,r)}else if(s[i]==="-"){i++;var d=term();v=(function(a,b){return function(x){return a(x)-b(x)}})(v,d)}else return v}}
  var f=expr();if(i<s.length)throw 0;return f};

/* pretty printer: x^2 → x², (a)/(b) → stacked fraction, sqrt( ) → √ with a bar */
function gPretty(src){var s=gNorm(src),i=0;if(!s)return "";var FN=["sqrt","cbrt","asin","acos","atan","abs","sin","cos","tan","log","ln","exp"];
  function inner(a){return a.grp?a.inn:a.h}
  function E(){var a=T();while(s[i]==="+"||s[i]==="-"){var op=s[i++],b=T();a={h:a.h+'<i class="o">'+(op==="-"?"−":"+")+'</i>'+b.h}}return a}
  function T(){var a=U();for(;;){var c=s[i];if(c==="*"){i++;var b=U();a={h:a.h+'<i class="o">·</i>'+b.h}}else if(c==="/"){i++;var d=U();a={h:'<span class="gf"><span>'+inner(a)+'</span><span>'+inner(d)+'</span></span>'}}
    else if(c&&/[(a-z0-9.]/.test(c)){var m=W();a={h:a.h+m.h}}else return a}}
  function U(){if(s[i]==="-"){i++;var u=U();return {h:"−"+u.h}}if(s[i]==="+"){i++;return U()}return W()}
  function W(){var b=R();if(s[i]==="^"){i++;var e=U();return {h:b.h+'<sup>'+inner(e)+'</sup>'}}return b}
  function close(){if(s[i]===")"){i++;return ""}if(i>=s.length)return '<i class="ghost">)</i>';throw 0}
  function R(){var c=s[i];if(i>=s.length)return {h:'<i class="box"></i>'};if(c==="("){i++;var e=i<s.length?E():{h:'<i class="box"></i>'};var cl=close();return {h:'('+e.h+(cl||')'),grp:!cl,inn:e.h}}
    if(c==="|"){i++;var g=E();if(s[i]==="|")i++;return {h:'|'+g.h+'|'}}
    for(var k=0;k<FN.length;k++){var f=FN[k];if(s.substr(i,f.length)===f){i+=f.length;if(s[i]!=="(")throw 0;i++;var a=i<s.length&&s[i]!==")"?E():{h:'<i class="box"></i>'};close();
      if(f==="sqrt")return {h:'<span class="gsq">√<span>'+a.h+'</span></span>'};if(f==="cbrt")return {h:'<span class="gsq"><sup class="ri">3</sup>√<span>'+a.h+'</span></span>'};if(f==="abs")return {h:'|'+a.h+'|'};if(f==="exp")return {h:'<var>e</var><sup>'+a.h+'</sup>'};
      return {h:'<span class="fn">'+(f.charAt(0)==="a"&&f.length===4?f.slice(1)+'<sup>−1</sup>':f)+'</span>('+a.h+')'}}}
    if(s.substr(i,2)==="pi"){i+=2;return {h:"π"}}
    if(c&&/[a-z]/.test(c)){i++;return {h:'<var>'+c+'</var>'}}
    var m=s.slice(i).match(/^\d*\.?\d+\.?/);if(m){i+=m[0].length;return {h:m[0]}}throw 0}
  try{var r=E();if(i<s.length)throw 0;return r.h}catch(e){return null}}

/* ---------------- graphing calculator ---------------- */
GR.exprs=GR.exprs.filter(function(e){return e&&e.trim()});if(!GR.exprs.length)GR.exprs=["x^2-4","2x+1"];
GR.params=GR.params||{};GR.deg=false;GR.kp=S.grKp===undefined?true:!!S.grKp;GR.focus=0;GR.trace=null;GR.table=false;GR.anim={};
var GCOL=["#5b7cff","#ef4f6b","#16a86f","#e8a21c","#9b6bff","#14b8a6","#f472b6","#64748b"];
function grParse(e){var t=String(e||"").trim();if(!t)return null;var P={v:GR.params,deg:GR.deg,used:{}};
  var mv=t.replace(/−/g,"-").match(/^x\s*=\s*(.+)$/i);if(mv){try{var fv=gCompile(mv[1],P);return {kind:"vline",x:fv(0),P:P}}catch(_){return {bad:1}}}
  var mp=t.replace(/−/g,"-").match(/^\(\s*([^,()]+(?:\([^()]*\))?[^,()]*)\s*,\s*(.+)\)$/);if(mp){try{var a=gCompile(mp[1],P),b=gCompile(mp[2],P);return {kind:"point",x:a(0),y:b(0),P:P}}catch(_){return {bad:1}}}
  try{return {kind:"fn",f:gCompile(t,P),P:P}}catch(_){return {bad:1}}}
graphOpen=function(){if(el("graph")){el("graph").remove();return}var d=document.createElement("div");d.id="graph";d.className="graph g2";
  d.innerHTML='<div class="gr-h">'+ic("graph")+'<b>Graphing calculator</b><small>Desmos-style</small>'+
   '<button class="tb-btn txt" id="grDeg" title="Angle mode for sin, cos, tan" onclick="GR.deg=!GR.deg;this.textContent=GR.deg?\'DEG\':\'RAD\';grDraw()">'+(GR.deg?"DEG":"RAD")+'</button>'+
   '<button class="tb-btn'+(GR.kp?" on":"")+'" id="grKpB" title="Math keypad" onclick="grKeypad()">'+ic("kbd")+'</button><button class="tb-btn'+(GR.table?" on":"")+'" id="grTbB" title="Table of values" onclick="GR.table=!GR.table;this.classList.toggle(\'on\',GR.table);grDraw()">'+ic("table")+'</button>'+winCtl()+
   '<button class="tb-btn gr-ext" title="Open the real Desmos in a new tab" onclick="window.open(\'https://www.desmos.com/calculator\',\'_blank\')">'+ic("extlink")+'</button><button class="tb-btn" title="Close" onclick="el(\'graph\').remove()">'+ic("x")+'</button></div>'+
   '<div class="gr-body"><div class="gr-b"><div class="gr-l"><div id="grL"></div><button class="gr-add" onclick="grAdd()">'+ic("plus")+'Add expression</button><div id="grS"></div></div>'+
   '<div class="gr-r"><canvas id="grC"></canvas><div class="gr-z"><button onclick="grZoom(0.7)" title="Zoom in">+</button><button onclick="grZoom(1.4)" title="Zoom out">−</button><button onclick="GR.view={x0:-10,x1:10,y0:-7,y1:7};GR.trace=null;grDraw()" title="Reset view">'+ic("home")+'</button></div><div class="gr-tr" id="grT"></div></div></div>'+
   '<div class="gr-kp" id="grK"></div><div id="grTb"></div><div class="gr-pts" id="grP"></div></div>';
  document.body.appendChild(d);grInputs();grBind();grKeypad(GR.kp);makeFloat(d,d.querySelector(".gr-h"),"graph");setTimeout(grDraw,30)};
function grAdd(){if(GR.exprs.length>=8){toast("Up to 8 expressions");return}GR.exprs.push("");GR.focus=GR.exprs.length-1;grInputs();grDraw();var i=document.querySelector('#grL input[data-k="'+GR.focus+'"]');if(i)i.focus()}
function grDel(k){GR.exprs.splice(k,1);if(!GR.exprs.length)GR.exprs=[""];GR.focus=Math.min(GR.focus,GR.exprs.length-1);grInputs();grDraw()}
grInputs=function(){var L=el("grL");if(!L)return;L.innerHTML=GR.exprs.map(function(e,k){return '<div class="gr-row'+(k===GR.focus?" f":"")+'" data-k="'+k+'"><i class="gr-dot" style="background:'+GCOL[k%GCOL.length]+'"></i><div class="gr-cell"><input data-k="'+k+'" value="'+esc(e)+'" placeholder="'+(k===0?"type x^2 - 4 or use the keypad":"y = …   (2, 3)   x = 4")+'" autocomplete="off" autocapitalize="off" spellcheck="false"'+(GR.kp&&innerWidth<=900?' inputmode="none"':'')+'><div class="gr-pv" id="grPv'+k+'"></div></div><button class="gr-x" title="Delete" onclick="grDel('+k+')">'+ic("x")+'</button></div>'}).join("");
  L.querySelectorAll("input").forEach(function(inp){var k=+inp.getAttribute("data-k");
    inp.oninput=function(){GR.exprs[k]=inp.value;grPreview(k);grDraw()};inp.onfocus=function(){GR.focus=k;L.querySelectorAll(".gr-row").forEach(function(r){r.classList.toggle("f",+r.getAttribute("data-k")===k)})};
    inp.onkeydown=function(e){e.stopPropagation();if(e.key==="Enter"){e.preventDefault();grNext()}};grPreview(k)})};
function grPreview(k){var pv=el("grPv"+k);if(!pv)return;var t=GR.exprs[k]||"",tt=t.trim();if(!tt){pv.innerHTML="";pv.className="gr-pv";return}
  var mv=tt.match(/^x\s*=\s*(.+)$/i),mp=tt.match(/^\((.+),(.+)\)$/),h;
  if(mv){var r=gPretty(mv[1]);h=r===null?null:'<var>x</var> = '+r}else if(mp){var a=gPretty(mp[1]),b=gPretty(mp[2]);h=a===null||b===null?null:'('+a+', '+b+')'}else{var p=gPretty(tt);h=p===null?null:'<var>y</var> = '+p}
  var ok=grParse(tt),good=ok&&!ok.bad;pv.className="gr-pv"+(h===null?" bad":good?"":" inc");pv.innerHTML=h===null?'Check this expression':h}
function grNext(){if(GR.focus>=GR.exprs.length-1){if(GR.exprs[GR.exprs.length-1].trim())grAdd();return}GR.focus++;var i=document.querySelector('#grL input[data-k="'+GR.focus+'"]');if(i)i.focus()}
function grIn(){var i=document.querySelector('#grL input[data-k="'+GR.focus+'"]')||document.querySelector('#grL input');return i}

/* keypad */
var GKP={"123":[["x","x"],["a","a",0,"slider"],["x²","^2"],["xⁿ","^()",1],["7","7"],["8","8"],["9","9"],["÷","/",0,"op"],
  ["(","("],[")",")"],["a⁄b","()/()",4,"frac"],["√","sqrt()",1],["4","4"],["5","5"],["6","6"],["×","*",0,"op"],
  ["|x|","abs()",1],["π","π"],[",",","],["⌫","",0,"del"],["1","1"],["2","2"],["3","3"],["−","-",0,"op"],
  ["←","",0,"left"],["→","",0,"right"],["AC","",0,"clear"],["↵","",0,"enter"],["0","0"],[".","."],["=","=",0,"op"],["+","+",0,"op"]],
  "f(x)":[["sin","sin()",1],["cos","cos()",1],["tan","tan()",1],["ln","ln()",1],["log","log()",1],["eˣ","e^()",1],["10ˣ","10^()",1],["∛","cbrt()",1],
  ["sin⁻¹","asin()",1],["cos⁻¹","acos()",1],["tan⁻¹","atan()",1],["1/x","1/()",1],["x³","^3"],["e","e"],["(a,b)","(,)",2,"pt"],["x =","x="],
  ["b","b",0,"slider"],["c","c",0,"slider"],["d","d",0,"slider"],["h","h",0,"slider"],["k","k",0,"slider"],["m","m",0,"slider"],["n","n",0,"slider"],["t","t",0,"slider"],
  ["←","",0,"left"],["→","",0,"right"],[",",","],["|x|","abs()",1],["AC","",0,"clear"],["⌫","",0,"del"],["↵","",0,"enter"],["↵","",0,"enter"]]};
var GKPTAB="123";
function grKeypad(on){if(on===undefined){on=!GR.kp;S.grKp=on;saveS()}GR.kp=on;var k=el("grK"),b=el("grKpB");if(b)b.classList.toggle("on",on);if(!k)return;
  if(!on){k.innerHTML="";document.querySelectorAll("#grL input").forEach(function(i){i.removeAttribute("inputmode")});return}
  if(innerWidth<=900)document.querySelectorAll("#grL input").forEach(function(i){i.setAttribute("inputmode","none")});
  k.innerHTML='<div class="kp-tabs">'+Object.keys(GKP).map(function(t){return '<button class="'+(t===GKPTAB?"on":"")+'" data-t="'+t+'">'+t+'</button>'}).join("")+'<span class="kp-hint">Taps type into the line you selected</span></div><div class="kp-g">'+GKP[GKPTAB].map(function(x,i,A){if(x[3]==="enter"&&A[i-1]&&A[i-1][3]==="enter")return "";return '<button class="kp'+(x[3]?" k-"+x[3]:"")+(x[3]==="enter"&&A[i+1]&&A[i+1][3]==="enter"?" w2":"")+(/^[0-9.]$/.test(x[0])?" n":"")+'" data-i="'+i+'">'+x[0]+'</button>'}).join("")+'</div>';
  k.querySelectorAll(".kp-tabs button").forEach(function(b){b.onclick=function(){GKPTAB=b.getAttribute("data-t");grKeypad(true)}});
  k.querySelectorAll(".kp").forEach(function(b){b.addEventListener("pointerdown",function(e){e.preventDefault()});b.onclick=function(){grKey(GKP[GKPTAB][+b.getAttribute("data-i")]);try{sfx("tap")}catch(_){}}})}
function grKey(x){var inp=grIn();if(!inp)return;var act=x[3],s=inp.selectionStart==null?inp.value.length:inp.selectionStart,e=inp.selectionEnd==null?s:inp.selectionEnd,v=inp.value;
  if(act==="left"){var p=Math.max(0,s-1);inp.setSelectionRange(p,p);inp.focus();return}if(act==="right"){var q=Math.min(v.length,e+1);inp.setSelectionRange(q,q);inp.focus();return}
  if(act==="enter"){grNext();return}if(act==="clear"){inp.value="";}else if(act==="del"){if(s===e&&s>0){inp.value=v.slice(0,s-1)+v.slice(e);s=s-1}else inp.value=v.slice(0,s)+v.slice(e);inp.setSelectionRange(s,s)}
  else{var t=x[1],back=x[2]||0,sel=v.slice(s,e);if(sel&&t.indexOf("()")>-1){t=t.replace("()","("+sel+")");back=act==="frac"?1:0}else if(act==="frac"&&s===e&&s>0&&/[0-9a-z)²³]$/i.test(v.slice(0,s))&&!/[+\-*\/(]$/.test(v.slice(0,s))){
      var m=v.slice(0,s).match(/([0-9.]+|[a-z]|\([^()]*\))$/i);if(m){var st=s-m[0].length;inp.value=v.slice(0,st)+"("+m[0]+")/()"+v.slice(e);var pp=st+m[0].length+4;inp.setSelectionRange(pp,pp);inp.focus();inp.dispatchEvent(new Event("input"));return}}
    inp.value=v.slice(0,s)+t+v.slice(e);var pos=s+t.length-back;inp.setSelectionRange(pos,pos)}
  inp.focus();inp.dispatchEvent(new Event("input"))}

/* drawing */
grBind=function(){var c=el("grC"),drag=null;
  c.onpointerdown=function(e){drag={x:e.clientX,y:e.clientY,v:Object.assign({},GR.view),moved:false};c.setPointerCapture(e.pointerId)};
  c.onpointermove=function(e){if(!drag)return;if(Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)>5)drag.moved=true;if(!drag.moved)return;var r=c.getBoundingClientRect(),dx=(e.clientX-drag.x)/r.width*(drag.v.x1-drag.v.x0),dy=(e.clientY-drag.y)/r.height*(drag.v.y1-drag.v.y0);GR.view={x0:drag.v.x0-dx,x1:drag.v.x1-dx,y0:drag.v.y0+dy,y1:drag.v.y1+dy};grDraw()};
  c.onpointerup=function(e){if(drag&&!drag.moved){var r=c.getBoundingClientRect(),v=GR.view;GR.trace=v.x0+(e.clientX-r.left)/r.width*(v.x1-v.x0);grDraw()}drag=null};
  c.onwheel=function(e){e.preventDefault();grZoom(e.deltaY>0?1.15:0.87)}};
function niceNum(v){return Math.abs(v)<1e-10?0:+v.toFixed(Math.abs(v)>=100?2:4)}
grDraw=function(){var c=el("grC");if(!c)return;var dpr=window.devicePixelRatio||1,W=c.clientWidth||360,H=c.clientHeight||300;c.width=W*dpr;c.height=H*dpr;var x=c.getContext("2d");if(!x||!x.setTransform)return;x.setTransform(dpr,0,0,dpr,0,0);
  var v=GR.view,dark=document.documentElement.getAttribute("data-theme")==="dark";function X(a){return (a-v.x0)/(v.x1-v.x0)*W}function Y(b){return H-(b-v.y0)/(v.y1-v.y0)*H}
  x.fillStyle=dark?"#151b2a":"#ffffff";x.fillRect(0,0,W,H);
  var st=Math.pow(10,Math.floor(Math.log10((v.x1-v.x0)/8)));if((v.x1-v.x0)/st>16)st*=2;if((v.x1-v.x0)/st>16)st*=2.5;
  x.lineWidth=1;x.strokeStyle=dark?"#232b42":"#e8ebf3";x.fillStyle=dark?"#8892ab":"#6b7489";x.font="11px sans-serif";
  for(var gx=Math.ceil(v.x0/st)*st;gx<=v.x1;gx+=st){x.beginPath();x.moveTo(X(gx),0);x.lineTo(X(gx),H);x.stroke();if(Math.abs(gx)>1e-9)x.fillText(+gx.toFixed(6),X(gx)+2,Math.min(H-4,Math.max(12,Y(0)+12)))}
  for(var gy=Math.ceil(v.y0/st)*st;gy<=v.y1;gy+=st){x.beginPath();x.moveTo(0,Y(gy));x.lineTo(W,Y(gy));x.stroke();if(Math.abs(gy)>1e-9)x.fillText(+gy.toFixed(6),Math.min(W-28,Math.max(2,X(0)+3)),Y(gy)-2)}
  x.strokeStyle=dark?"#8892ab":"#3a4258";x.lineWidth=1.5;x.beginPath();x.moveTo(X(0),0);x.lineTo(X(0),H);x.moveTo(0,Y(0));x.lineTo(W,Y(0));x.stroke();
  var fs=[],used={};GR.exprs.forEach(function(e,k){var r=grParse(e);if(!r||r.bad)return;r.k=k;r.col=GCOL[k%GCOL.length];fs.push(r);for(var p in r.P.used)used[p]=1});
  grSliders(Object.keys(used).sort());
  var N=Math.max(300,Math.round(W*1.5));GR.pts=[];var fns=fs.filter(function(r){return r.kind==="fn"});
  fs.forEach(function(r){x.strokeStyle=r.col;x.fillStyle=r.col;x.lineWidth=2.6;
    if(r.kind==="vline"){if(isFinite(r.x)){x.beginPath();x.moveTo(X(r.x),0);x.lineTo(X(r.x),H);x.stroke()}return}
    if(r.kind==="point"){if(isFinite(r.x)&&isFinite(r.y)){x.beginPath();x.arc(X(r.x),Y(r.y),5.5,0,7);x.fill();x.font="bold 12px sans-serif";x.fillText("("+niceNum(r.x)+", "+niceNum(r.y)+")",X(r.x)+8,Y(r.y)-8)}return}
    var f=r.f;x.beginPath();var pen=false,py=null;
    for(var j=0;j<=N;j++){var xv=v.x0+(v.x1-v.x0)*j/N,yv=f(xv);if(!isFinite(yv)||(py!==null&&Math.abs(yv-py)>(v.y1-v.y0)*3)){pen=false;py=isFinite(yv)?yv:null;continue}
      if(pen)x.lineTo(X(xv),Y(yv));else{x.moveTo(X(xv),Y(yv));pen=true}py=yv}x.stroke()});
  function root(g,a,b){var fa=g(a);for(var t=0;t<50;t++){var m=(a+b)/2,fm=g(m);if(fa*fm<=0)b=m;else{a=m;fa=fm}}return (a+b)/2}
  function scan(g,kind,yf){var px=v.x0,pv=g(px);for(var j=1;j<=N;j++){var cx=v.x0+(v.x1-v.x0)*j/N,cv=g(cx);if(isFinite(pv)&&isFinite(cv)&&pv*cv<=0&&Math.abs(pv-cv)<(v.y1-v.y0)){var r=root(g,px,cx);GR.pts.push({x:r,y:yf(r),kind:kind})}px=cx;pv=cv}}
  fns.forEach(function(r){var f=r.f,h=(v.x1-v.x0)/N;scan(f,"zero",function(){return 0});scan(function(z){return f(z+h/4)-f(z-h/4)},"turning point",f)});
  for(var a=0;a<fns.length;a++)for(var b=a+1;b<fns.length;b++){(function(f1,f2){scan(function(z){return f1(z)-f2(z)},"intersection",f1)})(fns[a].f,fns[b].f)}
  var seen={};GR.pts=GR.pts.filter(function(q){var k=q.kind+Math.round(q.x*1000);if(seen[k]||!isFinite(q.y))return false;seen[k]=1;return true}).slice(0,24);
  GR.pts.forEach(function(q,k){x.fillStyle=GR.sel===k?"#ff9f1c":(dark?"#d6dcef":"#1b2236");x.beginPath();x.arc(X(q.x),Y(q.y),GR.sel===k?6:3.5,0,7);x.fill()});
  var tr=el("grT");if(GR.trace!==null&&isFinite(GR.trace)){var tx=GR.trace;x.setLineDash([5,5]);x.strokeStyle=dark?"#c9d1e6":"#3a4258";x.lineWidth=1.2;x.beginPath();x.moveTo(X(tx),0);x.lineTo(X(tx),H);x.stroke();x.setLineDash([]);
    var parts=[];fns.forEach(function(r){var yv=r.f(tx);if(isFinite(yv)){x.fillStyle=r.col;x.beginPath();x.arc(X(tx),Y(yv),5,0,7);x.fill();parts.push('<span><i style="background:'+r.col+'"></i>'+niceNum(yv)+'</span>')}});
    if(tr)tr.innerHTML='<b>x = '+niceNum(tx)+'</b>'+(parts.length?parts.join(""):'<span class="muted">no curve here</span>')+'<button onclick="GR.trace=null;grDraw()" title="Hide">'+ic("x")+'</button>'}else if(tr)tr.innerHTML='<span class="muted">Tap the graph to trace values</span>';
  var pp=el("grP");if(pp)pp.innerHTML=GR.pts.length?GR.pts.map(function(q,k){return '<button class="'+(GR.sel===k?"on":"")+'" onclick="GR.sel='+k+';GR.trace='+q.x+';grDraw()"><small>'+q.kind+'</small>('+niceNum(q.x)+', '+niceNum(q.y)+')</button>'}).join(""):'<span class="muted">Zeros, turning points and intersections appear here.</span>';
  var tb=el("grTb");if(tb){if(!GR.table||!fns.length){tb.innerHTML=""}else{var c0=GR.trace!==null&&isFinite(GR.trace)?Math.round(GR.trace):0,xs=[];for(var q=-3;q<=3;q++)xs.push(c0+q);
    tb.innerHTML='<table class="tbl gr-tab"><tr><td><b>x</b></td>'+fns.map(function(r){return '<td><i style="background:'+r.col+'"></i>y'+(r.k+1)+'</td>'}).join("")+'</tr>'+xs.map(function(xx){return '<tr><td><b>'+xx+'</b></td>'+fns.map(function(r){var yv=r.f(xx);return '<td>'+(isFinite(yv)?niceNum(yv):"—")+'</td>'}).join("")+'</tr>'}).join("")+'</table>'}}};

/* sliders for letters (a, b, k …) */
function grSliders(names){var box=el("grS");if(!box)return;var key=names.join(",");if(box.getAttribute("data-k")===key){names.forEach(function(n){var o=document.querySelector('#grS output[data-n="'+n+'"]');if(o)o.textContent=niceNum(GR.params[n])});return}
  box.setAttribute("data-k",key);names.forEach(function(n){if(GR.params[n]===undefined)GR.params[n]=1});
  box.innerHTML=names.length?'<div class="gsl-h">Sliders</div>'+names.map(function(n){return '<div class="gsl"><var>'+n+'</var><span>=</span><output data-n="'+n+'">'+niceNum(GR.params[n])+'</output><button class="tb-btn sm'+(GR.anim[n]?" on":"")+'" title="Animate" onclick="grAnim(\''+n+'\',this)">'+(GR.anim[n]?"❚❚":"▶")+'</button><input type="range" min="-10" max="10" step="0.1" value="'+GR.params[n]+'" data-n="'+n+'"></div>'}).join(""):"";
  box.querySelectorAll("input").forEach(function(s){s.oninput=function(){GR.params[s.getAttribute("data-n")]=+s.value;grDraw()}})}
function grAnim(n,b){if(GR.anim[n]){clearInterval(GR.anim[n]);delete GR.anim[n];if(b){b.textContent="▶";b.classList.remove("on")}return}var dir=1;
  GR.anim[n]=setInterval(function(){if(!el("graph")){clearInterval(GR.anim[n]);delete GR.anim[n];return}var v=(GR.params[n]||0)+0.1*dir;if(v>10){v=10;dir=-1}if(v<-10){v=-10;dir=1}GR.params[n]=Math.round(v*10)/10;var s=document.querySelector('#grS input[data-n="'+n+'"]');if(s)s.value=GR.params[n];grDraw()},60);if(b){b.textContent="❚❚";b.classList.add("on")}}
graphWith=function(exprs){if(!el("graph"))graphOpen();GR.exprs=exprs.filter(function(e){return e}).slice(0,8);if(!GR.exprs.length)GR.exprs=[""];GR.focus=0;grInputs();grDraw()};

/* ---------------- calculator & reference sheet as floating windows ---------------- */
(function(){var _co=calcOpen;calcOpen=function(){var had=!!el("calc");_co();var d=el("calc");if(had||!d)return;var h=d.querySelector(".calc-h");if(h){var x=h.querySelector(".tb-btn:last-child");if(x)x.insertAdjacentHTML("beforebegin",winCtl())}makeFloat(d,h,"calc");
  var inp=el("calcIn");d.querySelectorAll(".calc-k button").forEach(function(b){var k=b.textContent;if(/^[CN⌫=]$/.test(k)&&k!=="π")return;b.addEventListener("pointerdown",function(e){e.preventDefault()});
    b.onclick=function(){var s=inp.selectionStart==null?inp.value.length:inp.selectionStart,e=inp.selectionEnd==null?s:inp.selectionEnd;inp.value=inp.value.slice(0,s)+k+inp.value.slice(e);var p=s+k.length;inp.setSelectionRange(p,p);inp.dispatchEvent(new Event("input"));inp.focus()}})}})();
refOpen=function(){if(el("refw")){el("refw").remove();return}var d=document.createElement("div");d.id="refw";d.className="refw";
  d.innerHTML='<div class="calc-h">'+ic("sigma")+'<b>Reference sheet</b><small>SAT formulas</small>'+winCtl()+'<button class="tb-btn" title="Close" onclick="el(\'refw\').remove()">'+ic("x")+'</button></div><div class="ref">'+
  [["Circle","A = πr²   ·   C = 2πr"],["Rectangle","A = ℓw"],["Triangle","A = ½bh"],["Pythagorean theorem","c² = a² + b²"],["Special right triangles","45-45-90: x, x, x√2   ·   30-60-90: x, x√3, 2x"],["Rectangular prism","V = ℓwh"],["Cylinder","V = πr²h"],["Sphere","V = (4/3)πr³"],["Cone","V = (1/3)πr²h"],["Pyramid","V = (1/3)ℓwh"],["Circle facts","360° in a circle = 2π radians"],["Triangle facts","Angles add to 180°"]].map(function(r){return '<div class="refr"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join("")+'</div>';
  document.body.appendChild(d);makeFloat(d,d.querySelector(".calc-h"),"ref");trUI(d)};
var _qiG2=quickItems;quickItems=function(){var l=_qiG2();l.push(["corner","Reset tool window positions","floatsReset()"]);return l};buildTop();
Object.assign(RU,{"Graphing calculator":"Графический калькулятор","Add expression":"Добавить выражение","Sliders":"Ползунки","Reference sheet":"Справочный лист","Tap the graph to trace values":"Нажми на график, чтобы увидеть значения","Taps type into the line you selected":"Кнопки печатают в выбранную строку","Check this expression":"Проверь выражение","Reset tool window positions":"Вернуть окна инструментов на место"});

(function(){var c=`
.floatwin{will-change:left,top;touch-action:auto}.floatwin.front{z-index:121}.floatwin.dragging{transition:none!important;box-shadow:0 34px 90px rgba(0,0,0,.5);opacity:.97;cursor:grabbing}.floatwin.dragging *{user-select:none}
.floatwin.snapping{transition:left .34s cubic-bezier(.3,1.2,.4,1),top .34s cubic-bezier(.3,1.2,.4,1)}
.wgrip{display:grid;place-items:center;width:20px;color:var(--ink2);cursor:grab;flex:none;opacity:.7}.wgrip .ic{width:16px;height:16px}
.floatwin .gr-h,.floatwin .calc-h{cursor:grab;user-select:none;touch-action:none}.wctl{display:inline-flex;gap:4px}
.floatwin.minimized{height:auto!important}.floatwin.minimized>:not(.gr-h):not(.calc-h){display:none!important}.floatwin.minimized{width:auto!important;min-width:250px}
.tb-btn.txt{font:900 12px var(--ui);width:auto;padding:0 8px}.tb-btn.on{background:color-mix(in srgb,var(--blue) 18%,var(--paper));color:var(--blue);border-color:color-mix(in srgb,var(--blue) 50%,var(--line))}.tb-btn.sm{width:28px;height:28px}
.graph.g2{width:min(820px,calc(100vw - 24px));max-height:calc(100vh - 24px);display:flex;flex-direction:column}.graph.g2 .gr-body{overflow:auto;min-height:0;overscroll-behavior:contain}.graph.g2 .gr-kp:not(:empty){position:sticky;bottom:0;z-index:3;background:var(--paper);padding-top:6px;padding-bottom:2px;box-shadow:0 -10px 14px -10px rgba(0,0,0,.35)}
.graph.g2 .gr-h small{flex:1;color:var(--ink2)}.graph.g2 .gr-h{flex-wrap:nowrap}@media(max-width:600px){.graph.g2 .gr-h{gap:3px}.graph.g2 .gr-h .tb-btn{width:34px;height:34px;min-width:34px;padding:0;flex:none}.graph.g2 .gr-h .tb-btn.txt{width:auto;padding:0 7px}.graph.g2 .gr-h>b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1}.graph.g2 .gr-h .gr-ext{display:none}}
.graph.g2 .gr-b{grid-template-columns:270px 1fr}#grL{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow:auto}
.gr-row{display:flex;align-items:flex-start;gap:6px;padding:6px 6px 6px 8px;border-radius:12px;background:var(--paper);border:1px solid var(--line);transition:border-color .15s}.gr-row.f{border-color:var(--blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--blue) 14%,transparent)}
.gr-dot{width:12px;height:12px;border-radius:50%;flex:none;margin-top:9px}.gr-cell{flex:1;min-width:0}.gr-cell input{width:100%;border:0;background:none;color:var(--ink);font:600 15px var(--mono);outline:none;padding:4px 0}
.gr-pv{min-height:0;font:500 16px/1.5 "Times New Roman",Georgia,serif;color:var(--ink);overflow-x:auto;white-space:nowrap}.gr-pv:empty{display:none}.gr-pv.bad{color:var(--red);font:600 11.5px var(--ui)}.gr-pv.inc{opacity:.55}
.gr-pv var{font-style:italic}.gr-pv sup{font-size:.7em;vertical-align:.6em}.gr-pv .o{font-style:normal;margin:0 .22em}.gr-pv .fn{font-style:normal;margin-right:1px}.gr-pv .ghost{opacity:.35;font-style:normal}.gr-pv .box{display:inline-block;width:.6em;height:.8em;border:1px dashed var(--ink2);vertical-align:-.1em;border-radius:2px}
.gf{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 .15em;font-size:.88em;line-height:1.15}.gf>span{padding:0 .2em}.gf>span:first-child{border-bottom:1.5px solid currentColor}
.gsq{white-space:nowrap}.gsq>span{border-top:1.5px solid currentColor;padding:0 .12em;margin-left:1px}.gsq .ri{font-size:.55em;vertical-align:.9em;margin-right:-.35em}
.gr-x{flex:none;width:26px;height:26px;border:0;background:none;color:var(--ink2);border-radius:8px;cursor:pointer;display:grid;place-items:center;opacity:.6}.gr-x:hover{opacity:1;background:var(--soft)}.gr-x .ic{width:14px;height:14px}
.gr-add{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:6px;padding:7px;border:1px dashed var(--line);border-radius:12px;background:none;color:var(--ink2);font:600 13px var(--ui);cursor:pointer;width:100%}.gr-add:hover{color:var(--ink);border-color:var(--blue)}.gr-add .ic{width:14px;height:14px}
.gsl-h{margin:10px 2px 4px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--ink2)}
.gsl{display:grid;grid-template-columns:auto auto 1fr auto;align-items:center;gap:6px;padding:6px 8px;margin-bottom:5px;border-radius:12px;background:var(--paper);border:1px solid var(--line);font:600 15px var(--mono)}.gsl var{font:italic 700 16px Georgia,serif}.gsl input{grid-column:1/-1;width:100%;accent-color:var(--violet)}
.gr-tr{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:6px;padding:6px 10px;border-radius:10px;background:var(--paper);border:1px solid var(--line);font:600 13px var(--mono);min-height:34px}.gr-tr span{display:inline-flex;align-items:center;gap:4px}.gr-tr i{width:9px;height:9px;border-radius:50%}.gr-tr button{margin-left:auto;border:0;background:none;color:var(--ink2);cursor:pointer;display:grid}.gr-tr .ic{width:14px;height:14px}.gr-tr .muted{font:500 12px var(--ui)}
.gr-kp{margin-top:10px}.gr-kp:empty{display:none}.kp-tabs{display:flex;align-items:center;gap:6px;margin-bottom:6px}.kp-tabs button{padding:5px 14px;border-radius:999px;border:1px solid var(--line);background:var(--paper);color:var(--ink2);font:700 13px var(--mono);cursor:pointer}.kp-tabs button.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}.kp-hint{margin-left:auto;font-size:11px;color:var(--ink2)}
.kp-g{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}.kp.w2{grid-column:span 2}.kp:nth-child(8n+5){margin-left:6px}.kp-g:has(.w2) .kp:nth-child(8n+5){margin-left:0}.kp.k-op{background:color-mix(in srgb,var(--violet) 12%,var(--paper));font:700 17px var(--ui)}
.kp{height:40px;border-radius:10px;border:1px solid var(--line);background:color-mix(in srgb,var(--blue) 7%,var(--paper));color:var(--ink);font:600 15px "Times New Roman",Georgia,serif;cursor:pointer;transition:transform .08s,background .12s;touch-action:manipulation}.kp:active{transform:scale(.94)}
.kp.n{background:var(--paper);font:700 16px var(--ui)}.kp.k-enter{background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;border:0;font-size:18px}.kp.k-del,.kp.k-clear,.kp.k-left,.kp.k-right{background:var(--soft);font-family:var(--ui)}.kp.k-slider{color:var(--violet);font-style:italic}
.gr-tab{width:100%;margin-top:10px;text-align:center;font:600 13px var(--mono)}.gr-tab td{padding:5px}.gr-tab i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:4px}
@media(max-width:900px){.graph.g2 .gr-b{grid-template-columns:1fr}.graph.g2{max-height:calc(100vh - 100px)}.graph.g2 #grC{height:200px}.graph.g2{max-height:calc(100vh - 90px);max-height:calc(100dvh - 90px)}.kp{height:38px}.kp-g{grid-template-columns:repeat(8,1fr);gap:4px}.kp:nth-child(8n+5){margin-left:3px}.kp{font-size:14px}.kp{height:42px}.kp-hint{display:none}#grL{max-height:190px}.graph.g2 .gr-h small{display:none}}
.refw{position:fixed;right:20px;top:80px;z-index:112;width:min(380px,calc(100vw - 24px));max-height:calc(100vh - 110px);overflow:auto;padding:12px;border-radius:20px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--line);box-shadow:0 24px 60px rgba(0,0,0,.35);animation:fadeUp .25s ease both}
.refw .calc-h{display:flex;align-items:center;gap:8px;margin-bottom:8px}.refw .calc-h small{flex:1;color:var(--ink2)}
@media(max-width:900px){.refw{left:10px;right:10px;width:auto;top:auto;bottom:calc(84px + env(safe-area-inset-bottom,0px));max-height:55vh}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
