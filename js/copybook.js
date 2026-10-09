/* =====================================================================
   AXIOM — Copybook engine
   real maths typesetting · notebook ("copybook") cards with human words,
   coloured pens and step-by-step examples · animated pictures
   ===================================================================== */

/* ---------- maths typesetting ----------
   markup:  \f{top}{bottom} fraction · \r{x} square root · \rr{x} cube root
            ^{..} power · _{..} small index · \c1..\c6{..} coloured pen
            \b{..} boxed · \t{words} plain words · \s small space          */
var MXWORDS=/^(sin|cos|tan|log|ln|GCF|LCM|IQR|SD|or|and|of|if|is|to|by|in|at|as|no|so|on|it|cm|mm|km|kg|mg|mL|ft|yd|mi|oz|lb|hr|mph|kph|min|max|mean|new|old)$/;
function mxEsc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function mxText(t,p0){t=String(t).replace(/\s-\s/g," − ").replace(/\s*([=+−×÷±≤≥≠≈→⟹·])\s*/g,"$1").replace(/\s*([<>])\s+/g,"$1").replace(/\s+/g," ");
  var re=/([A-Za-zα-ωθπ]+)|(\d+(?:[.,]\d+)*)|( )|([=+−×÷±<>≤≥≠≈→⟹·])|([\s\S])/g,m,out="",prev=p0||"start";
  while((m=re.exec(t))){
    if(m[1]){var w=m[1];out+=(MXWORDS.test(w)||w.length>2)?'<span class="mw">'+w+'</span>':w.split("").map(function(c){return '<i>'+c+'</i>'}).join("");prev="n"}
    else if(m[2]){out+=m[2];prev="n"}
    else if(m[3]){out+=" "}
    else if(m[4]){var op=m[4],un=(op==="−"||op==="+"||op==="±")&&(prev==="start"||prev==="op"||prev==="open");out+='<span class="mo'+(un?" mu":"")+'">'+mxEsc(op)+'</span>'+(/[=→⟹≈≤≥<>]/.test(op)?'<wbr>':'');prev="op"}
    else{var ch=m[5];out+=mxEsc(ch);prev=/[(\[]/.test(ch)?"open":/[)\]]/.test(ch)?"n":prev}}
  mxText.last=prev;return out}
function mxRun(s){s=String(s||"").replace(/\\%/g,"%");var out="",buf="",i=0,last="start";
  function flush(){if(buf){out+=mxText(buf,last);last=mxText.last;buf=""}}
  function grp(){while(s[i]===" ")i++;if(s[i]!=="{")return null;var d=1,st=++i;while(i<s.length&&d){if(s[i]==="{")d++;else if(s[i]==="}")d--;i++}return s.slice(st,i-1)}
  while(i<s.length){var c=s[i];
    if(c==="\\"){var m=s.slice(i+1).match(/^(rr|r|f|c[1-6]|b|t|s)/);if(m){flush();i+=1+m[1].length;var cmd=m[1],a,b;
      if(cmd==="f"){a=grp();b=grp();out+='<span class="mf"><span class="mf-n">'+mxRun(a)+'</span><span class="mf-d">'+mxRun(b)+'</span></span>'}
      else if(cmd==="r"||cmd==="rr"){a=grp();out+='<span class="mr">'+(cmd==="rr"?'<span class="mr-i">3</span>':'')+'<svg class="mr-s" viewBox="0 0 60 100" preserveAspectRatio="none" aria-hidden="true"><path d="M3 60 L18 52 L36 97 L60 1"/></svg><span class="mr-b">'+mxRun(a)+'</span></span>'}
      else if(cmd.charAt(0)==="c"){a=grp();out+='<span class="mc'+cmd.charAt(1)+'">'+mxRun(a)+'</span>'}
      else if(cmd==="b"){a=grp();out+='<span class="mbx">'+mxRun(a)+'</span>'}
      else if(cmd==="t"){a=grp();out+='<span class="mw">'+mxEsc(a||"")+'</span>'}
      else out+='<span class="msp"></span>';if(cmd!=="s")last="n";continue}}
    if(c==="^"||c==="_"){flush();i++;var g=grp();if(g===null){g=s[i]||"";i++}out+=(c==="^"?"<sup>":"<sub>")+mxRun(g)+(c==="^"?"</sup>":"</sub>");last="n";continue}
    buf+=c;i++}
  flush();return out}
/* the same formula as words, for Axi's voice */
function mxSay(s){s=String(s||"");var k=0,prev;
  do{prev=s;s=s.replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g," $1 over $2 ").replace(/\\rr\{([^{}]*)\}/g," the cube root of $1 ").replace(/\\r\{([^{}]*)\}/g," the square root of $1 ")
    .replace(/\\c[1-6]\{([^{}]*)\}/g,"$1").replace(/\\[bt]\{([^{}]*)\}/g,"$1").replace(/\^\{2\}/g," squared ").replace(/\^\{3\}/g," cubed ").replace(/\^\{([^{}]*)\}/g," to the power $1 ").replace(/_\{([^{}]*)\}/g," $1 ");k++}while(s!==prev&&k<8);
  s=s.replace(/\\s/g," ").replace(/[{}\\]/g," ");return typeof mathSpeak==="function"?mathSpeak(s):s}
function MX(src,inline){return '<span class="mx'+(inline?" mx-in":"")+'" data-say="'+mxEsc(mxSay(src))+'">'+mxRun(src)+'</span>'}
/* text with `inline maths`, ==highlighter== and **bold** */
function cbT(s){if(s==null)return "";return String(s).replace(/`([^`]+)`/g,function(m,a){return MX(a,1)}).replace(/==([^=]+)==/g,'<mark class="cb-hl">$1</mark>').replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[\s(“"])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)”"]|$)/g,"$1<em>$2</em>")}

/* ---------- copybook cards ---------- */
var CBOOK=[];
function CB(uid,lid,o){o.uid=uid;o.lid=lid;CBOOK.push(o)}
function cbHTML(o,part){var d=0,h='<div class="cb'+(part===2?" cb-exs":"")+'" data-cb="'+o.uid+'/'+o.lid+'">';
  function A(cls,inner){d++;return '<div class="'+cls+'" style="--d:'+d+'">'+inner+'</div>'}
  if(part!==2){
    h+=A("cb-head",'<span class="cb-tag">'+ic("pen")+'Copybook</span><h4 class="cb-t"><span>'+cbT(o.t)+'</span></h4>');
    if(o.f){h+=A("cb-f",'<span class="cb-l l-b">'+(o.fl||"The rule")+'</span>'+[].concat(o.f).map(function(f){return '<div class="cb-fx">'+String(f).split("||").map(function(x){return '<span class="cb-chip">'+MX(x.trim())+'</span>'}).join("")+'</div>'}).join(""))}
    if(o.h){var hs=[].concat(o.h);h+=A("cb-h",'<span class="cb-l l-g">In human words</span>'+(hs.length>1?'<ul>'+hs.map(function(x){return '<li>'+cbT(x)+'</li>'}).join("")+'</ul>':'<p>'+cbT(hs[0])+'</p>'))}
    if(o.pic)h+=A("cb-pic",o.pic);
    if(o.k)h+=A("cb-k",'<span class="cb-l l-v">Words to know</span><div class="cb-kw">'+o.k.map(function(x){return '<span class="cb-kc"><b>'+cbT(x[0])+'</b>'+cbT(x[1])+'</span>'}).join("")+'</div>');
    if(o.tr)h+=A("cb-tr",'<span class="cb-l l-o">Memory trick</span><p>'+cbT(o.tr)+'</p>');
    if(o.w)h+=A("cb-w",'<span class="cb-l l-r">Watch out</span><p>'+cbT(o.w)+'</p>')}
  else{h+=A("cb-head",'<span class="cb-tag">'+ic("pen")+'Copybook · worked examples</span><h4 class="cb-t"><span>'+cbT(o.t)+'</span></h4>');
    (o.ex||[]).forEach(function(e,i){var st=e[1]||[];
      h+=A("cb-ex",'<span class="cb-l l-v">Example '+(i+1)+'</span><div class="cb-q">'+cbT(e[0])+'</div><ol class="cb-steps">'+st.map(function(s,j){var p=String(s).split(" // ");return '<li style="--s:'+j+'"><span class="cb-n">'+(j+1)+'</span><div>'+cbT(p[0])+(p[1]?'<span class="cb-why">'+cbT(p[1])+'</span>':'')+'</div></li>'}).join("")+'</ol>'+
        (e[2]?'<div class="cb-a" style="--s:'+st.length+'">'+ic("check")+'<span>'+cbT(e[2])+'</span></div>':''))})}
  return h+'</div>'}
function cbFind(uid,lid){for(var i=0;i<CBOOK.length;i++)if(CBOOK[i].uid===uid&&CBOOK[i].lid===lid)return CBOOK[i];return null}

/* ---------- animated pictures for the copybook ---------- */
var PIC=(function(){
function wrap(w,h,s,cap){return '<figure class="fig cbfig"><svg viewBox="0 0 '+w+' '+h+'" style="width:100%;max-width:'+w+'px">'+s+'</svg>'+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'}
function t(x,y,s,o){o=o||{};var cl=(o.hand?"cbhand ":"")+(o.d!==undefined?"fpop":"");return '<text x="'+x+'" y="'+y+'" font-size="'+(o.fs||14)+'" text-anchor="'+(o.a||"middle")+'" font-weight="'+(o.fw||700)+'" fill="'+(o.c||"var(--ink)")+'"'+(cl?' class="'+cl.trim()+'"':'')+(o.d!==undefined?' style="animation-delay:'+o.d+'s"':'')+'>'+s+'</text>'}
var C={b:"var(--blue)",g:"var(--grn)",r:"var(--red)",o:"#f0a020",v:"var(--violet)",t:"#14b8a6",k:"var(--ink2)"};
/* percent bar: p% of a whole */
function pct(p,o){o=o||{};var x0=30,x1=470,W=x1-x0,s='<rect x="'+x0+'" y="40" width="'+W+'" height="34" rx="9" fill="color-mix(in srgb,var(--blue) 10%,transparent)" stroke="var(--line)"/>';
  s+='<rect x="'+x0+'" y="40" width="'+(W*p/100)+'" height="34" rx="9" fill="url(#cbgp)" class="cbgx"/>';
  for(var i=0;i<=10;i++){var x=x0+W*i/10;s+='<line x1="'+x+'" y1="76" x2="'+x+'" y2="'+(i%5?82:86)+'" stroke="var(--ink2)" stroke-width="1.5"/>'+(i%5?'':t(x,102,i*10+"%",{fs:12,c:C.k,fw:600}))}
  s+=t(x0+W*p/200,63,o.inner||p+"%",{fs:15,c:"#fff",d:.9})+(o.part?t(x0+W*p/200,28,o.part,{c:C.b,hand:1,fs:19,d:1.1}):"")+(o.whole?t(x1-4,28,o.whole,{a:"end",c:C.k,hand:1,fs:19,d:1.2}):"");
  return wrap(500,112,'<defs><linearGradient id="cbgp" x1="0" x2="1"><stop offset="0" stop-color="var(--blue)"/><stop offset="1" stop-color="var(--violet)"/></linearGradient></defs>'+s,o.cap)}
/* fraction strips: k of n equal parts (optionally a second strip to compare) */
function strip(n,k,o){o=o||{};var s="",rows=[[n,k,o.col||C.b]];if(o.n2)rows.push([o.n2,o.k2,o.col2||C.g]);
  rows.forEach(function(r,j){var y=24+j*62,w=400/r[0];for(var i=0;i<r[0];i++)s+='<rect x="'+(40+i*w)+'" y="'+y+'" width="'+(w-3)+'" height="38" rx="7" fill="'+(i<r[1]?r[2]:"color-mix(in srgb,var(--ink2) 12%,transparent)")+'" class="fpop" style="animation-delay:'+(j*.5+i*.07)+'s;opacity:'+(i<r[1]?.9:1)+'"/>';
    s+=t(462,y+26,r[1]+"/"+r[0],{a:"start",c:r[2],fs:20,hand:1,d:j*.5+.6})});
  return wrap(520,30+rows.length*62,s,o.cap)}
/* Pythagoras: squares on the three sides */
function pyth(a,b,o){o=o||{};var sc=o.s||24,A=a*sc,B=b*sc,x0=B+16,y0=A+B+16,P=[x0+A,y0],Q=[x0,y0-B],c=Math.round(Math.sqrt(a*a+b*b)*100)/100;
  function poly(pts,col,dl){return '<polygon points="'+pts.map(function(p){return p.join(",")}).join(" ")+'" fill="color-mix(in srgb,'+col+' 22%,transparent)" stroke="'+col+'" stroke-width="2" class="fpop" style="animation-delay:'+dl+'s"/>'}
  var s=poly([[x0,y0],[x0+A,y0],[x0+A,y0+A],[x0,y0+A]],C.b,.2)+poly([[x0-B,y0-B],[x0,y0-B],[x0,y0],[x0-B,y0]],C.g,.5)+poly([P,Q,[Q[0]+B,Q[1]-A],[P[0]+B,P[1]-A]],C.o,.9);
  s+='<polygon points="'+[[x0,y0],P,Q].map(function(p){return p.join(",")}).join(" ")+'" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/><path d="M'+x0+' '+(y0-14)+' h14 v14" fill="none" stroke="var(--ink2)" stroke-width="1.6"/>';
  s+=t(x0+A/2,y0+A/2+6,"a² = "+a*a,{c:C.b,d:.4})+t(x0-B/2,y0-B/2+6,"b² = "+b*b,{c:C.g,d:.7})+t((P[0]+Q[0])/2+B/2,(P[1]+Q[1])/2-A/2+6,"c² = "+(a*a+b*b),{c:C.o,d:1.1});
  s+=t(x0+A/2,y0+A/2+22,"a = "+a,{fs:12,c:C.b,fw:600,d:.5})+t(x0-B/2,y0-B/2+22,"b = "+b,{fs:12,c:C.g,fw:600,d:.8})+t((P[0]+Q[0])/2+B/2,(P[1]+Q[1])/2-A/2+22,"c = "+c,{fs:12,c:C.o,fw:600,d:1.2});
  return wrap(x0+A+B+16,y0+A+12,s,o.cap)}
/* box plot on a number line */
function box(v,o){o=o||{};var lo=o.lo!==undefined?o.lo:v[0],hi=o.hi!==undefined?o.hi:v[4],X=function(x){return 40+(x-lo)/(hi-lo)*420},y=60,s="";
  s+='<line x1="40" y1="110" x2="460" y2="110" stroke="var(--ink2)" stroke-width="1.5"/>';
  for(var k=0;k<=5;k++){var val=lo+(hi-lo)*k/5;s+='<line x1="'+X(val)+'" y1="106" x2="'+X(val)+'" y2="114" stroke="var(--ink2)"/>'+t(X(val),130,Math.round(val*10)/10,{fs:11,c:C.k,fw:600})}
  s+='<line x1="'+X(v[0])+'" y1="'+y+'" x2="'+X(v[1])+'" y2="'+y+'" stroke="var(--ink)" stroke-width="2" class="fpop"/><line x1="'+X(v[3])+'" y1="'+y+'" x2="'+X(v[4])+'" y2="'+y+'" stroke="var(--ink)" stroke-width="2" class="fpop"/>';
  s+='<rect x="'+X(v[1])+'" y="'+(y-22)+'" width="'+(X(v[3])-X(v[1]))+'" height="44" rx="6" fill="color-mix(in srgb,var(--violet) 22%,transparent)" stroke="var(--violet)" stroke-width="2" class="fpop" style="animation-delay:.3s"/>';
  s+='<line x1="'+X(v[2])+'" y1="'+(y-22)+'" x2="'+X(v[2])+'" y2="'+(y+22)+'" stroke="var(--red)" stroke-width="3" class="fpop" style="animation-delay:.6s"/>';
  [["min",0],["Q1",1],["median",2],["Q3",3],["max",4]].forEach(function(q,i){s+=t(X(v[q[1]]),i%2?96:24,q[0]+" "+v[q[1]],{fs:12,c:q[0]==="median"?C.r:C.k,d:.8+i*.12})});
  return wrap(500,140,s,o.cap)}
/* a chain of boxes joined by labelled arrows: how to convert / what to do next */
function flow(items,arrows,o){o=o||{};var n=items.length,bw=o.bw||120,gap=o.gap||64,W=n*bw+(n-1)*gap+20,s="";
  items.forEach(function(it,i){var x=10+i*(bw+gap),col=[C.b,C.v,C.g,C.o,C.t][i%5];
    s+='<rect x="'+x+'" y="22" width="'+bw+'" height="58" rx="14" fill="color-mix(in srgb,'+col+' 16%,transparent)" stroke="'+col+'" stroke-width="2" class="fpop" style="animation-delay:'+(i*.45)+'s"/>'+t(x+bw/2,44,it[0],{fs:12,c:C.k,d:i*.45})+t(x+bw/2,68,it[1],{fs:17,c:col,d:i*.45+.1});
    if(i<n-1){var ax=x+bw+6,bx=x+bw+gap-6;s+='<path d="M'+ax+' 51 H'+bx+' M'+(bx-8)+' 45 L'+bx+' 51 L'+(bx-8)+' 57" fill="none" stroke="var(--ink2)" stroke-width="2" stroke-linecap="round" pathLength="1" class="fdraw" style="animation-delay:'+(i*.45+.25)+'s"/>'+(arrows&&arrows[i]?t((ax+bx)/2,100,arrows[i],{fs:16,c:C.r,hand:1,d:i*.45+.4}):"")}});
  return wrap(W,112,s,o.cap)}
/* two quantities side by side (e.g. before / after) */
function bars2(a,b,o){o=o||{};var m=Math.max(a[1],b[1]),s="";[a,b].forEach(function(q,i){var h=150*q[1]/m,x=80+i*170,col=i?C.g:C.b;
  s+='<rect x="'+x+'" y="'+(180-h)+'" width="90" height="'+h+'" rx="8" fill="'+col+'" class="fgrow" style="animation-delay:'+(i*.4)+'s;opacity:.85"/>'+t(x+45,172-h,q[2]||q[1],{c:col,d:.6+i*.4})+t(x+45,202,q[0],{fs:13,c:C.k})});
  if(o.mid)s+=t(255,90,o.mid,{c:C.r,hand:1,fs:20,d:1.1});return wrap(420,215,'<line x1="60" y1="180" x2="360" y2="180" stroke="var(--ink2)" stroke-width="1.5"/>'+s,o.cap)}
/* dot plot: stacked dots per value, with mean ▲ and median ▼ */
function dots(vals,o){o=o||{};var lo=o.lo!==undefined?o.lo:Math.min.apply(null,vals),hi=o.hi!==undefined?o.hi:Math.max.apply(null,vals),X=function(x){return 40+(x-lo)/((hi-lo)||1)*420},cnt={},s="",n=vals.length;
  s+='<line x1="30" y1="120" x2="470" y2="120" stroke="var(--ink2)" stroke-width="1.5"/>';
  for(var v=lo;v<=hi;v++)s+='<line x1="'+X(v)+'" y1="116" x2="'+X(v)+'" y2="124" stroke="var(--ink2)"/>'+t(X(v),140,v,{fs:12,c:C.k,fw:600});
  vals.slice().sort(function(a,b){return a-b}).forEach(function(v,i){cnt[v]=(cnt[v]||0)+1;s+='<circle cx="'+X(v)+'" cy="'+(120-cnt[v]*17)+'" r="7" fill="'+(o.col||C.b)+'" class="fpop" style="animation-delay:'+(i*.06)+'s"/>'});
  var mean=vals.reduce(function(a,b){return a+b},0)/n,sv=vals.slice().sort(function(a,b){return a-b}),med=n%2?sv[(n-1)/2]:(sv[n/2-1]+sv[n/2])/2;
  if(o.mean!==false)s+='<path d="M'+X(mean)+' 150 l-7 12 h14z" fill="'+C.r+'" class="fpop" style="animation-delay:1s"/>'+t(X(mean),178,"mean "+(Math.round(mean*100)/100),{fs:12,c:C.r,d:1.1});
  if(o.median!==false)s+='<path d="M'+X(med)+' 14 l-7 -10 h14z" fill="'+C.g+'" class="fpop" style="animation-delay:1.2s" transform="translate(0,12)"/>'+t(X(med)+(Math.abs(med-mean)<0.6?0:0),12,"median "+med,{fs:12,c:C.g,d:1.3});
  return wrap(500,186,s,o.cap)}
/* unit circle: angle θ, the point (cos θ, sin θ) */
function ucirc(deg,o){o=o||{};var cx=170,cy=150,R=110,a=deg*Math.PI/180,px=cx+R*Math.cos(a),py=cy-R*Math.sin(a),s="";
  s+='<line x1="40" y1="'+cy+'" x2="300" y2="'+cy+'" stroke="var(--ink2)" stroke-width="1.5"/><line x1="'+cx+'" y1="20" x2="'+cx+'" y2="280" stroke="var(--ink2)" stroke-width="1.5"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="color-mix(in srgb,var(--blue) 6%,transparent)" stroke="var(--blue)" stroke-width="2.5" pathLength="1" class="fdraw"/>';
  s+='<path d="M'+cx+' '+cy+' L'+px.toFixed(1)+' '+py.toFixed(1)+'" stroke="var(--ink)" stroke-width="2.5" class="fpop" style="animation-delay:.4s"/>';
  s+='<path d="M'+px.toFixed(1)+' '+cy+' V'+py.toFixed(1)+'" stroke="'+C.v+'" stroke-width="3" stroke-dasharray="6 4" class="fpop" style="animation-delay:.8s"/><path d="M'+cx+' '+(cy+1)+' H'+px.toFixed(1)+'" stroke="'+C.g+'" stroke-width="4" class="fpop" style="animation-delay:.7s"/>';
  s+='<path d="M'+(cx+30)+' '+cy+' A30 30 0 0 0 '+(cx+30*Math.cos(a)).toFixed(1)+' '+(cy-30*Math.sin(a)).toFixed(1)+'" fill="none" stroke="'+C.r+'" stroke-width="2.5"/>'+t(cx+44*Math.cos(a/2),cy-44*Math.sin(a/2)+5,o.lab||deg+"°",{fs:13,c:C.r,d:.6});
  s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="7" fill="'+C.o+'" class="fpop" style="animation-delay:1s"/>'+t(px+10,py-12,o.pt||"(cos θ, sin θ)",{fs:15,c:C.o,a:"start",hand:1,d:1.1});
  s+=t((cx+px)/2,cy+20,o.cos||"cos θ",{fs:14,c:C.g,d:.9})+t(px+8,(cy+py)/2+5,o.sin||"sin θ",{fs:14,c:C.v,a:"start",d:1})+t(cx+R+6,cy+18,"1",{fs:12,c:C.k,a:"start"})+t((cx+px)/2-14,(cy+py)/2-4,"1",{fs:13,c:C.k,a:"end",d:.5});
  return wrap(400,290,s,o.cap)}
/* two similar triangles: small and k times bigger */
function simtri(a,b,k,o){o=o||{};var u=o.u||22,s="",x0=30,y0=40+b*k*u;
  [[1,x0,C.b],[k,x0+a*u+60,C.o]].forEach(function(T,i){var w=a*u*T[0],h=b*u*T[0],x=T[1],y=y0;
    s+='<polygon points="'+x+','+y+' '+(x+w)+','+y+' '+x+','+(y-h)+'" fill="color-mix(in srgb,'+T[2]+' 18%,transparent)" stroke="'+T[2]+'" stroke-width="2.5" class="fpop" style="animation-delay:'+(i*.5)+'s"/><path d="M'+x+' '+(y-12)+' h12 v12" fill="none" stroke="var(--ink2)" stroke-width="1.5"/>';
    s+=t(x+w/2,y+20,a*T[0],{fs:14,c:T[2],d:.3+i*.5})+t(x-8,y-h/2+5,b*T[0],{fs:14,c:T[2],a:"end",d:.4+i*.5})});
  s+=t(x0+a*u+30+a*u*k/2,26,o.lab||"× "+k+" on every side",{fs:19,c:C.r,hand:1,d:1.1});
  return wrap(x0+a*u+60+a*u*k+30,y0+30,s,o.cap)}
/* a small ruled table (two-way tables, frequency tables) */
function tbl(head,rows,o){o=o||{};var hi=o.hi||[];function isH(r,c){return hi.some(function(h){return h[0]===r&&h[1]===c})}
  return '<figure class="fig cbfig"><table class="cb-tbl"><thead><tr>'+head.map(function(h){return '<th>'+cbT(String(h))+'</th>'}).join("")+'</tr></thead><tbody>'+rows.map(function(r,i){return '<tr style="--s:'+i+'">'+r.map(function(c,j){return (j?'<td':'<th')+(isH(i,j)?' class="hi"':'')+'>'+cbT(String(c))+(j?'</td>':'</th>')}).join("")+'</tr>'}).join("")+'</tbody></table>'+(o.cap?'<figcaption>'+o.cap+'</figcaption>':'')+'</figure>'}
/* two crossing lines: vertical angles + supplementary neighbours */
function xang(deg,o){o=o||{};var cx=200,cy=105,a=deg*Math.PI/180,R=Math.min(150,92/Math.max(Math.sin(a),.01)),s="";function P(r,ang){return [(cx+r*Math.cos(ang)).toFixed(1),(cy-r*Math.sin(ang)).toFixed(1)]}
  var e1=P(R,a),e2=P(R,a+Math.PI);
  s+='<path d="M'+(cx-170)+' '+cy+' H'+(cx+170)+'" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" pathLength="1" class="fdraw"/><path d="M'+e2.join(" ")+' L'+e1.join(" ")+'" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" pathLength="1" class="fdraw" style="animation-delay:.25s"/>';
  [[0,a,C.b,deg],[a,Math.PI,C.r,180-deg],[Math.PI,Math.PI+a,C.b,deg],[Math.PI+a,2*Math.PI,C.r,180-deg]].forEach(function(q,i){var r=i%2?30:38,p1=P(r,q[0]),p2=P(r,q[1]),m=P(r+26,(q[0]+q[1])/2);
    s+='<path d="M'+p1.join(" ")+' A'+r+' '+r+' 0 0 0 '+p2.join(" ")+'" fill="none" stroke="'+q[2]+'" stroke-width="3" class="fpop" style="animation-delay:'+(.6+i*.18)+'s"/>'+t(m[0],+m[1]+5,q[3]+"°",{fs:15,c:q[2],d:.7+i*.18})});
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="var(--ink)"/>';
  if(o.note)s+=t(cx,205,o.note,{fs:19,c:C.v,hand:1,d:1.5});
  return wrap(400,o.note?215:200,s,o.cap)}
return {pct:pct,strip:strip,pyth:pyth,box:box,flow:flow,bars2:bars2,dots:dots,ucirc:ucirc,simtri:simtri,tbl:tbl,xang:xang}})();

/* ---------- styles ---------- */
(function(){var c=`
.mx{font-family:"STIX Two Text","Cambria Math","Latin Modern Roman","Times New Roman",Georgia,serif;font-size:1.1em;letter-spacing:.005em}
.mx i{font-style:italic;padding:0 .03em}.mx .mw{font-style:normal}.mx .mo{margin:0 .24em}.mx .mo.mu{margin:0 .05em 0 0}.mx .msp{display:inline-block;width:.3em}
.mx sup{font-size:.68em;vertical-align:.62em;line-height:0}.mx sub{font-size:.68em;vertical-align:-.28em;line-height:0}
.mf{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 .14em;line-height:1.2;white-space:nowrap}
.mf-n{padding:0 .22em .08em;border-bottom:.075em solid currentColor;align-self:stretch;text-align:center}.mf-d{padding:.08em .22em 0}.mf .mf{font-size:.88em}
.mr{display:inline-flex;align-items:stretch;vertical-align:middle;white-space:nowrap;line-height:1.3;margin:0 .06em}.mr-s{width:.6em;height:auto;flex:none;align-self:stretch;overflow:visible;margin-right:-.02em}.mr-s path{fill:none;stroke:currentColor;stroke-width:.075em;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.mr-b{border-top:.075em solid currentColor;padding:.08em .14em 0 .1em}.mr-i{font-size:.55em;margin-left:.2em;margin-right:-.78em;margin-top:.05em;align-self:flex-start;line-height:1}
.mbx{border:1.6px solid currentColor;border-radius:6px;padding:0 .3em;margin:0 .1em}
.mc1{color:var(--pb,var(--blue))}.mc2{color:var(--pr,var(--red))}.mc3{color:var(--pg,var(--grn))}.mc4{color:var(--po,#e8a21c)}.mc5{color:var(--pv,var(--violet))}.mc6{color:var(--pt,#14b8a6)}
.mx-in{font-size:1.06em;white-space:normal}
.cb{--pb:#8db4ff;--pg:#4fdba3;--pr:#ff8d9d;--po:#ffc56e;--pv:#c6abff;--pt:#62e2df;--cbpaper:#161e33;--rule:rgba(140,170,255,.07);--margin:rgba(255,125,155,.34);
  position:relative;margin:10px 0 18px;padding:22px 22px 20px 58px;border-radius:20px;color:var(--ink);
  background:linear-gradient(90deg,transparent 42px,var(--margin) 42px,var(--margin) 44px,transparent 44px),repeating-linear-gradient(180deg,transparent 0 33px,var(--rule) 33px 34px),var(--cbpaper);
  border:1px solid color-mix(in srgb,var(--pv) 20%,var(--line));box-shadow:0 22px 50px -18px rgba(0,0,0,.55);font-size:16.5px;line-height:1.7}
html[data-theme="light"] .cb{--pb:#2459d8;--pg:#0d8a56;--pr:#d6334c;--po:#c86c00;--pv:#6b46d9;--pt:#0b8784;--cbpaper:#fffdf6;--rule:rgba(60,110,220,.1);--margin:rgba(230,80,110,.42);box-shadow:0 14px 36px -16px rgba(20,30,60,.25);border-color:#ebe3cf}
.cb::before{content:"";position:absolute;left:14px;top:26px;bottom:26px;width:14px;background:radial-gradient(circle at 7px 7px,var(--bg) 5px,transparent 5.5px) 0 0/14px 64px repeat-y;opacity:.9}
.cb>div{animation:cbIn .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--d,0)*.11s)}
@keyframes cbIn{from{opacity:0;transform:translateY(12px)}}
.cb-head{display:flex;flex-direction:column;gap:2px;margin-bottom:10px}
.cb-tag{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;font:800 11px var(--ui);letter-spacing:.08em;text-transform:uppercase;color:var(--pv);padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--pv) 14%,transparent)}.cb-tag .ic{width:13px;height:13px}
.cb-t{margin:2px 0 0;font:700 clamp(26px,3.6vw,32px)/1.15 "Caveat","Segoe Print","Comic Sans MS",cursive;color:var(--pb);align-self:flex-start;padding:0}.cb-t>span{background:linear-gradient(transparent 64%,color-mix(in srgb,var(--po) 30%,transparent) 64% 92%,transparent 92%);-webkit-box-decoration-break:clone;box-decoration-break:clone;padding:0 4px}
.cb-l{display:block;font:700 22px/1.1 "Caveat","Segoe Print","Comic Sans MS",cursive;margin:0 0 4px}.l-b{color:var(--pb)}.l-g{color:var(--pg)}.l-v{color:var(--pv)}.l-o{color:var(--po)}.l-r{color:var(--pr)}
.cb-f{margin:12px 0 16px}.cb-fx{display:block;text-align:center;font-size:23px;padding:14px 16px;margin:6px 0;color:var(--ink);border:2.2px solid color-mix(in srgb,var(--pb) 70%,transparent);border-radius:255px 18px 225px 18px/18px 225px 18px 255px;background:color-mix(in srgb,var(--pb) 6%,transparent);overflow-x:auto}
.cb-fx .mx{font-size:1em}.cb-fx{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px 30px}
.cb-h{margin:8px 0 14px}.cb-h p{margin:0}.cb-h ul{margin:0;padding:0;list-style:none}.cb-h li{position:relative;padding-left:24px;margin:6px 0}.cb-h li::before{content:"";position:absolute;left:4px;top:.62em;width:9px;height:9px;border-radius:50%;background:var(--pg);box-shadow:0 0 0 3px color-mix(in srgb,var(--pg) 22%,transparent)}
.cb-hl{background:color-mix(in srgb,var(--po) 32%,transparent);color:inherit;padding:0 3px;border-radius:4px}
.cb-tbl{margin:4px auto;border-collapse:separate;border-spacing:0;font-size:15px;min-width:min(100%,360px);border-radius:12px;overflow:hidden;border:1.5px solid color-mix(in srgb,var(--pb) 45%,transparent)}.cb-tbl th,.cb-tbl td{padding:7px 14px;text-align:center;border-bottom:1px solid color-mix(in srgb,var(--pb) 18%,transparent)}.cb-tbl thead th{background:color-mix(in srgb,var(--pb) 16%,transparent);color:var(--pb);font-weight:800}.cb-tbl tbody th{color:var(--pv);text-align:left}.cb-tbl tbody tr{animation:cbIn .5s both;animation-delay:calc(.2s + var(--s,0)*.12s)}.cb-tbl tbody tr:last-child td,.cb-tbl tbody tr:last-child th{border-bottom:0}.cb-tbl td.hi{background:color-mix(in srgb,var(--po) 30%,transparent);font-weight:800;box-shadow:inset 0 0 0 2px var(--po)}
.cb-pic{margin:6px 0 12px}.cb-pic .fig{margin:6px auto}.cbhand{font-family:"Caveat","Segoe Print",cursive;font-weight:700}
.cb-k{margin:10px 0}.cb-kw{display:flex;flex-wrap:wrap;gap:8px}.cb-kw .cb-kc{padding:6px 10px;border-radius:10px;background:color-mix(in srgb,var(--pv) 10%,transparent);border:1px dashed color-mix(in srgb,var(--pv) 45%,transparent);font-size:14.5px}.cb-kw .cb-kc>b{color:var(--pv);margin-right:6px}
.cb-tr{position:relative;margin:16px 4px 12px;padding:12px 16px 12px;border-radius:4px 4px 14px 4px;background:color-mix(in srgb,var(--po) 17%,var(--cbpaper));transform:rotate(-.5deg);box-shadow:0 8px 18px -10px rgba(0,0,0,.45)}
.cb-tr::before{content:"";position:absolute;top:-9px;left:50%;width:70px;height:18px;transform:translateX(-50%) rotate(2deg);background:color-mix(in srgb,var(--ink2) 22%,transparent);border-radius:3px}.cb-tr p,.cb-w p{margin:0}
.cb-w{margin:12px 0 4px;padding:10px 14px;border-left:4px solid var(--pr);border-radius:4px 12px 12px 4px;background:color-mix(in srgb,var(--pr) 9%,transparent)}
.cb-ex{margin:6px 0 20px;padding-bottom:16px;border-bottom:1.5px dashed color-mix(in srgb,var(--ink2) 30%,transparent)}.cb-ex:last-child{border-bottom:0;margin-bottom:0;padding-bottom:0}
.cb-q{font-weight:700;font-size:17px;margin:0 0 10px;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--pv) 9%,transparent)}
.cb-steps{list-style:none;margin:0;padding:0;counter-reset:none}.cb-steps li{display:flex;gap:12px;align-items:flex-start;margin:0 0 10px;animation:cbIn .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--d,0)*.1s + var(--s,0)*.3s + .2s)}
.cb-n{flex:none;width:26px;height:26px;margin-top:2px;border-radius:50%;display:grid;place-items:center;font:800 13px var(--ui);color:#fff;background:linear-gradient(135deg,var(--pb),var(--pv))}
.cb-steps li>div{flex:1;min-width:0}
.cb-why{display:block;font:700 19px/1.25 "Caveat","Segoe Print",cursive;color:var(--pg);margin-top:1px}.cb-why::before{content:"↳ "}
.cb-a{display:flex;align-items:center;gap:10px;margin-top:6px;padding:10px 14px;border-radius:12px;font-weight:700;background:color-mix(in srgb,var(--pg) 13%,transparent);border:1.5px solid color-mix(in srgb,var(--pg) 50%,transparent);animation:cbIn .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--d,0)*.1s + var(--s,0)*.3s + .3s)}.cb-a .ic{flex:none;width:20px;height:20px;color:var(--pg);stroke-width:2.6}
.cbfig svg text{paint-order:stroke;stroke:var(--cbpaper,var(--paper));stroke-width:3px}
.cbgx{transform-box:fill-box;transform-origin:left;animation:cbGrowX 1s cubic-bezier(.2,.8,.2,1) both .2s}@keyframes cbGrowX{from{transform:scaleX(0)}}
@media(max-width:560px){.cb{padding:18px 14px 16px 40px;font-size:16px}.cb::before{left:7px}.cb{background:linear-gradient(90deg,transparent 30px,var(--margin) 30px,var(--margin) 32px,transparent 32px),repeating-linear-gradient(180deg,transparent 0 33px,var(--rule) 33px 34px),var(--cbpaper)}.cb-fx{font-size:19px;padding:12px 8px}.cb-q{font-size:16px}}
@media(prefers-reduced-motion:reduce){.cb>div,.cb-steps li,.cb-a{animation:none}}
html.calm .cb>div,html.calm .cb-steps li,html.calm .cb-a{animation:none}
`;var st=document.createElement("style");st.textContent=c;document.head.appendChild(st)})();
