/* =====================================================================
   ZERO TO 800 — v2 CONTENT PART 1
   Illustration kit (animated SVG), "Try it" boxes, and new lessons for
   units: nums, frac, ratio, alg, ineq, lines, sys
   ===================================================================== */

/* ---------------- illustration kit ---------------- */
var FIG=(function(){
var uid=0;
function col(c){return {blue:"var(--blue)",red:"var(--red)",grn:"var(--grn)",yel:"var(--yel)",vio:"var(--violet)",ink:"var(--ink)",ink2:"var(--ink2)"}[c||"blue"]||c}
function wrap(w,h,inner,cap){return '<figure class="fig"><svg viewBox="0 0 '+w+' '+h+'" style="width:100%;max-width:'+w+'px;height:auto" xmlns="http://www.w3.org/2000/svg">'+inner+'</svg>'+(cap?'<figcaption>'+cap+'</figcaption>':'')+'</figure>'}
function t(x,y,s,o){o=o||{};return '<text x="'+x+'" y="'+y+'" text-anchor="'+(o.a||"middle")+'" class="ft'+(o.pop?" fpop":"")+'" style="fill:'+col(o.c||"ink")+(o.fs?";font-size:"+o.fs+"px":"")+(o.d?";animation-delay:"+o.d+"s":"")+'">'+s+'</text>'}
function p(d,o){o=o||{};return '<path d="'+d+'"'+(o.dash||o.draw===false?'':' pathLength="1" class="fdraw"')+' style="fill:'+(o.fill||"none")+';stroke:'+col(o.c||"ink")+';stroke-width:'+(o.w||2.5)+(o.dash?";stroke-dasharray:"+o.dash+";animation:none":"")+(o.d?";animation-delay:"+o.d+"s":"")+(o.op?";fill-opacity:"+o.op:"")+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function dot(x,y,c,r,d){return '<circle cx="'+x+'" cy="'+y+'" r="'+(r||6)+'" class="fpop" style="fill:'+col(c)+(d?";animation-delay:"+d+"s":"")+'"/>'}

/* number line */
function numline(min,max,o){
  o=o||{};var W=620,H=o.h||110,y=o.y||64;
  function X(v){return 40+(v-min)*540/(max-min)}
  var s=p("M20 "+y+" H600",{c:"ink2",w:2,draw:false})+'<path d="M600 '+(y-6)+' L612 '+y+' L600 '+(y+6)+'Z" style="fill:var(--ink2)"/>'+'<path d="M20 '+(y-6)+' L8 '+y+' L20 '+(y+6)+'Z" style="fill:var(--ink2)"/>';
  var step=o.step||1;
  for(var v=min;v<=max+1e-9;v+=step){s+='<path d="M'+X(v)+' '+(y-7)+' V'+(y+7)+'" style="stroke:var(--ink2);stroke-width:2"/>'+t(X(v),y+28,+v.toFixed(2),{c:"ink2",fs:13})}
  (o.rays||[]).forEach(function(r){
    var end=r.dir==="left"?20:600;
    s+=p("M"+X(r.v)+" "+y+" H"+end,{c:r.c||"blue",w:6});
    s+='<circle cx="'+X(r.v)+'" cy="'+y+'" r="8" style="fill:'+(r.closed?col(r.c||"blue"):"var(--paper)")+';stroke:'+col(r.c||"blue")+';stroke-width:3"/>';
  });
  (o.segs||[]).forEach(function(r){
    s+=p("M"+X(r.a)+" "+y+" H"+X(r.b),{c:r.c||"blue",w:6});
    [[r.a,r.ca],[r.b,r.cb]].forEach(function(q){s+='<circle cx="'+X(q[0])+'" cy="'+y+'" r="8" style="fill:'+(q[1]?col(r.c||"blue"):"var(--paper)")+';stroke:'+col(r.c||"blue")+';stroke-width:3"/>'});
  });
  (o.jumps||[]).forEach(function(j,i){
    var a=X(j.from),b=X(j.to),m=(a+b)/2,h=j.h||34;
    s+=p("M"+a+" "+(y-10)+" Q"+m+" "+(y-10-h*2)+" "+b+" "+(y-10),{c:j.c||"violet",w:2.5,d:0.3+i*0.5});
    s+=t(m,y-16-h,j.label,{c:j.c||"vio",fs:14,pop:1,d:0.6+i*0.5});
  });
  (o.marks||[]).forEach(function(m,i){s+=dot(X(m.v),y,m.c||"red",7,0.2+i*0.15);if(m.label)s+=t(X(m.v),y-18,m.label,{c:m.c||"red",fs:14,pop:1,d:0.3+i*0.15})});
  return wrap(W,H,s,o.cap);
}

/* coordinate plane */
function plane(o){
  o=o||{};var r=o.r||6,S=300,u=S/(2*r),W=S+40,H=S+40;
  function X(x){return 20+(x+r)*u}function Y(y){return 20+(r-y)*u}
  var id="cp"+(++uid);
  var s='<defs><clipPath id="'+id+'"><rect x="20" y="20" width="'+S+'" height="'+S+'"/></clipPath></defs>';
  for(var i=-r;i<=r;i++){s+='<path d="M'+X(i)+' 20 V'+(20+S)+'M20 '+Y(i)+' H'+(20+S)+'" style="stroke:var(--line);stroke-width:1"/>'}
  s+='<path d="M'+X(0)+' 20 V'+(20+S)+'M20 '+Y(0)+' H'+(20+S)+'" style="stroke:var(--ink2);stroke-width:2"/>';
  var ls=r>6?2:1;
  for(i=-r;i<=r;i+=ls){if(i!==0){s+=t(X(i),Y(0)+16,i,{c:"ink2",fs:11})+t(X(0)-8,Y(i)+4,i,{c:"ink2",fs:11,a:"end"})}}
  s+=t(W-14,Y(0)-6,"x",{c:"ink2",fs:13})+t(X(0)+10,16,"y",{c:"ink2",fs:13});
  var g='<g clip-path="url(#'+id+')">';
  (o.shade||[]).forEach(function(sh){
    var yA=sh.m*(-r)+sh.b,yB=sh.m*r+sh.b,edge=sh.above?-3*r:5*r;
    g+='<path d="M'+X(-r)+' '+Y(yA)+' L'+X(r)+' '+Y(yB)+' L'+X(r)+' '+(sh.above?Y(4*r):Y(-4*r))+' L'+X(-r)+' '+(sh.above?Y(4*r):Y(-4*r))+'Z" class="ffade" style="fill:'+col(sh.c||"blue")+';fill-opacity:.16"/>';
  });
  (o.lines||[]).forEach(function(l,k){g+=p("M"+X(-r)+" "+Y(l.m*-r+l.b)+" L"+X(r)+" "+Y(l.m*r+l.b),{c:l.c||(k?"red":"blue"),w:3,d:0.2+k*0.5,dash:l.dash})});
  (o.vlines||[]).forEach(function(l){g+=p("M"+X(l.x)+" 20 V"+(20+S),{c:l.c||"vio",w:3})});
  (o.fns||[]).forEach(function(f,k){
    var d="",pen=false;
    for(var j=0;j<=240;j++){var x=-r+2*r*j/240,y=f.f(x);
      if(!isFinite(y)||Math.abs(y)>4*r){pen=false;continue}
      d+=(pen?"L":"M")+X(x).toFixed(1)+" "+Y(y).toFixed(1)+" ";pen=true}
    g+=p(d,{c:f.c||(k?"red":"blue"),w:3,d:0.2+k*0.6,dash:f.dash});
  });
  g+='</g>';s+=g;
  if(o.slope){var q=o.slope;
    s+=p("M"+X(q[0])+" "+Y(q[1])+" H"+X(q[2]),{c:"grn",w:3,d:1})+p("M"+X(q[2])+" "+Y(q[1])+" V"+Y(q[3]),{c:"vio",w:3,d:1.4});
    s+=t((X(q[0])+X(q[2]))/2,Y(q[1])+18,"run = "+(q[2]-q[0]),{c:"grn",fs:13,pop:1,d:1.2})+t(X(q[2])+8,(Y(q[1])+Y(q[3]))/2,"rise = "+(q[3]-q[1]),{c:"vio",fs:13,a:"start",pop:1,d:1.6});
  }
  (o.pts||[]).forEach(function(pt,k){s+=dot(X(pt[0]),Y(pt[1]),pt[3]||"red",6,0.6+k*0.2);if(pt[2])s+=t(X(pt[0])+(pt[4]||10),Y(pt[1])-10,pt[2],{c:pt[3]||"red",fs:13,a:"start",pop:1,d:0.7+k*0.2})});
  (o.labels||[]).forEach(function(lb){s+=t(X(lb[0]),Y(lb[1]),lb[2],{c:lb[3]||"blue",fs:13,a:"start",pop:1,d:1})});
  return wrap(W,H,s,o.cap);
}

/* right triangle */
function tri(o){
  o=o||{};var w=o.w||250,h=o.h||150,Ax=70,Ay=210,Bx=Ax+w,Cy=Ay-h;
  var s=p("M"+Ax+" "+Ay+" L"+Bx+" "+Ay+" L"+Ax+" "+Cy+" Z",{c:"ink",w:3});
  s+='<path d="M'+Ax+' '+(Ay-18)+' H'+(Ax+18)+' V'+Ay+'" style="fill:none;stroke:var(--ink2);stroke-width:2"/>';
  if(o.a)s+=t(Ax-12,(Ay+Cy)/2+5,o.a,{a:"end",c:o.ac||"vio",pop:1,d:.8});
  if(o.b)s+=t((Ax+Bx)/2,Ay+26,o.b,{c:o.bc||"grn",pop:1,d:1});
  if(o.c)s+=t((Ax+Bx)/2+18,(Ay+Cy)/2-8,o.c,{c:o.cc||"red",a:"start",pop:1,d:1.2});
  if(o.ang){s+=p("M"+(Bx-44)+" "+Ay+" A44 44 0 0 1 "+(Bx-44*Math.cos(Math.atan(h/w)))+" "+(Ay-44*Math.sin(Math.atan(h/w))),{c:"blue",w:2.5,d:1});s+=t(Bx-62,Ay-10,o.ang,{c:"blue",pop:1,d:1.3})}
  if(o.top)s+=t(Ax-10,Cy-8,o.top,{c:"ink2",fs:13});
  return wrap(Bx+60,Ay+44,s,o.cap);
}

/* circle, with optional sector */
function circ(o){
  o=o||{};var cx=170,cy=140,R=100,s="";
  if(o.deg){var a=o.deg*Math.PI/180,x2=cx+R*Math.cos(-a),y2=cy+R*Math.sin(-a);
    s+='<path d="M'+cx+' '+cy+' L'+(cx+R)+' '+cy+' A'+R+' '+R+' 0 '+(o.deg>180?1:0)+' 0 '+x2.toFixed(1)+' '+y2.toFixed(1)+' Z" class="ffade" style="fill:var(--yel);fill-opacity:.55;stroke:var(--ink);stroke-width:2"/>';
    s+=t(cx+34*Math.cos(-a/2),cy+34*Math.sin(-a/2)+5,o.deg+"°",{fs:13,pop:1,d:1});}
  s+=p("M"+(cx+R)+" "+cy+" A"+R+" "+R+" 0 1 1 "+(cx+R-0.01)+" "+cy,{c:"blue",w:3});
  s+=dot(cx,cy,"ink",4);
  if(o.r){s+=p("M"+cx+" "+cy+" H"+(cx+R),{c:"red",w:3,d:.8});s+=t(cx+R/2,cy+20,o.r,{c:"red",pop:1,d:1})}
  if(o.dia){s+=p("M"+(cx-R)+" "+cy+" H"+(cx+R),{c:"grn",w:3,d:.8,dash:"6 5"});s+=t(cx,cy-10,o.dia,{c:"grn",pop:1,d:1})}
  if(o.label)s+=t(cx,cy+R+26,o.label,{c:"ink2",fs:13});
  return wrap(340,o.label?300:280,s,o.cap);
}

/* fraction pizza */
function pizza(n,k,o){
  o=o||{};var cx=120,cy=120,R=96,s="";
  for(var i=0;i<n;i++){var a1=-Math.PI/2+i*2*Math.PI/n,a2=a1+2*Math.PI/n;
    var d="M"+cx+" "+cy+" L"+(cx+R*Math.cos(a1)).toFixed(1)+" "+(cy+R*Math.sin(a1)).toFixed(1)+" A"+R+" "+R+" 0 0 1 "+(cx+R*Math.cos(a2)).toFixed(1)+" "+(cy+R*Math.sin(a2)).toFixed(1)+" Z";
    s+='<path d="'+d+'" class="fpop" style="animation-delay:'+(i*0.08)+'s;fill:'+(i<k?"var(--yel)":"var(--soft)")+';stroke:var(--ink);stroke-width:2"/>';}
  s+=t(cx,cy+R+30,k+"/"+n,{fs:18});
  return wrap(240,260,s,o.cap);
}

/* bar chart */
function bars(vals,labels,o){
  o=o||{};var W=440,H=250,base=200,max=Math.max.apply(null,vals)*1.15,bw=Math.min(60,320/vals.length),gap=(360-bw*vals.length)/(vals.length+1),s="";
  s+='<path d="M50 20 V'+base+' H420" style="fill:none;stroke:var(--ink2);stroke-width:2"/>';
  vals.forEach(function(v,i){var x=60+gap+i*(bw+gap),h=v/max*170;
    s+='<rect x="'+x+'" y="'+(base-h)+'" width="'+bw+'" height="'+h+'" rx="5" class="fgrow" style="animation-delay:'+(i*0.12)+'s;fill:'+(o.hi===i?"var(--red)":"var(--blue)")+'"/>';
    s+=t(x+bw/2,base-h-8,v,{fs:13,pop:1,d:.5+i*0.12})+t(x+bw/2,base+20,labels[i],{c:"ink2",fs:12});});
  if(o.title)s+=t(W/2,16,o.title,{fs:13,c:"ink2"});
  return wrap(W,H,s,o.cap);
}

/* balance scale */
function scale(L,R,o){
  o=o||{};var s="";
  s+='<path d="M210 60 L190 190 H230 Z" style="fill:var(--soft);stroke:var(--ink);stroke-width:2"/>';
  s+=p("M70 60 H350",{c:"ink",w:4});
  s+=p("M90 60 L60 120 M90 60 L120 120 M330 60 L300 120 M330 60 L360 120",{c:"ink2",w:1.5,d:.3});
  s+='<path d="M40 120 Q90 150 140 120 Z" style="fill:var(--yel);fill-opacity:.6;stroke:var(--ink);stroke-width:2"/>';
  s+='<path d="M280 120 Q330 150 380 120 Z" style="fill:var(--yel);fill-opacity:.6;stroke:var(--ink);stroke-width:2"/>';
  s+=t(90,108,L,{fs:17,pop:1,d:.5})+t(330,108,R,{fs:17,pop:1,d:.7})+t(210,52,"=",{fs:22,c:"blue"});
  return wrap(420,200,s,o.cap);
}

/* parallel lines + transversal */
function para(lb,o){
  o=o||{};lb=lb||[];var s="";
  s+=p("M30 80 H370",{c:"blue",w:3})+p("M30 170 H370",{c:"blue",w:3,d:.2})+p("M130 20 L270 230",{c:"red",w:3,d:.4});
  s+='<path d="M60 74 l8 6 l-8 6 M60 164 l8 6 l-8 6" style="fill:none;stroke:var(--blue);stroke-width:2"/>';
  var P=[[170,80],[230,170]],off=[[-24,-10],[24,-10],[-26,24],[22,24]];
  for(var i=0;i<8;i++){if(lb[i]){var c=P[i<4?0:1],f=off[i%4];s+=t(c[0]+f[0],c[1]+f[1],lb[i],{fs:14,c:(o.cs&&o.cs[i])||"ink",pop:1,d:.8+i*0.08})}}
  return wrap(400,240,s,o.cap);
}

/* 3D box */
function box(o){
  o=o||{};var s="";
  s+='<path d="M60 90 L120 40 L320 40 L260 90 Z" class="ffade" style="fill:var(--yel);fill-opacity:.35;stroke:var(--ink);stroke-width:2"/>';
  s+='<path d="M260 90 L320 40 L320 160 L260 210 Z" class="ffade" style="fill:var(--blue);fill-opacity:.15;stroke:var(--ink);stroke-width:2"/>';
  s+=p("M60 90 H260 V210 H60 Z",{c:"ink",w:2.5});
  if(o.l)s+=t(160,232,o.l,{c:"grn",pop:1,d:.6});
  if(o.w)s+=t(302,200,o.w,{c:"vio",a:"start",pop:1,d:.8});
  if(o.h)s+=t(48,155,o.h,{c:"red",a:"end",pop:1,d:1});
  return wrap(380,250,s,o.cap);
}

/* scatterplot */
function scatter(pts,o){
  o=o||{};var xm=o.xmax||10,ym=o.ymax||10,W=380,H=270;
  function X(x){return 50+x/xm*300}function Y(y){return 230-y/ym*200}
  var s='<path d="M50 20 V230 H360" style="fill:none;stroke:var(--ink2);stroke-width:2"/>';
  for(var i=0;i<=xm;i+=(o.xs||xm/5))s+=t(X(i),248,i,{c:"ink2",fs:11});
  for(i=0;i<=ym;i+=(o.ys||ym/5))s+=t(42,Y(i)+4,i,{c:"ink2",fs:11,a:"end"});
  pts.forEach(function(q,k){s+=dot(X(q[0]),Y(q[1]),"blue",5,k*0.05)});
  if(o.line)s+=p("M"+X(0)+" "+Y(o.line.b)+" L"+X(xm)+" "+Y(o.line.m*xm+o.line.b),{c:"red",w:3,d:.8});
  if(o.xl)s+=t(205,266,o.xl,{c:"ink2",fs:12});
  return wrap(W,H+6,s,o.cap);
}
return {numline:numline,plane:plane,tri:tri,circ:circ,pizza:pizza,bars:bars,scale:scale,para:para,box:box,scatter:scatter};
})();

/* ---------------- "Try it" box + teacher note helpers ---------------- */
function QC(q,a,s){
  return '<div class="qc" data-a="'+esc(Array.isArray(a)?a.join("|"):a)+'" data-s="'+esc(s)+'">'+
    '<div class="qc-q"><span class="qc-lab">✍️ Try it yourself</span>'+q+'</div>'+
    '<div class="qc-row"><input placeholder="your answer" onkeydown="if(event.key===\'Enter\')qcCheck(this.nextElementSibling)"><button class="btn pri" onclick="qcCheck(this)">Check</button><button class="btn ghost" onclick="qcShow(this)">Show me</button></div>'+
    '<div class="qc-out"></div></div>';
}
function NOTE(s){return '<div class="note"><b>🧑‍🏫 From my years of teaching:</b> '+s+'</div>'}

/* ---------------- content helpers ---------------- */
function L(uid,id,t,mins,h){var u=findUnit(uid);if(u)u.lessons.push({id:id,t:t,mins:mins,h:h})}
function addFig(uid,lid,html){
  var u=findUnit(uid);if(!u)return;
  u.lessons.forEach(function(l){if(l.id===lid){var i=l.h.indexOf("</p>");l.h=i>-1?l.h.slice(0,i+4)+html+l.h.slice(i+4):html+l.h}});
}
function addEnd(uid,lid,html){var u=findUnit(uid);if(!u)return;u.lessons.forEach(function(l){if(l.id===lid)l.h+=html})}
function more(uid,prac,quiz,cards){var u=findUnit(uid);if(!u)return;
  [].push.apply(u.prac,prac||[]);[].push.apply(u.quiz,quiz||[]);[].push.apply(u.cards,cards||[])}

/* =====================================================================
   FIGURES + TRY-ITS added to the original lessons
   ===================================================================== */
addFig("nums","l3",FIG.numline(-6,6,{marks:[{v:-5,label:"−5",c:"red"},{v:-2,label:"−2",c:"blue"}],cap:"−5 sits further left, so it is the smaller number."}));
addEnd("nums","l3",FIG.numline(-4,6,{jumps:[{from:-3,to:5,label:"+8",c:"grn"},{from:5,to:3,label:"−2",c:"red",h:24}],marks:[{v:3,label:"answer 3",c:"blue"}],cap:"−3 − (−8) + (−2): start at −3, jump right 8, then left 2."})+QC("Compute −4 − (−9).","5","Minus a negative is plus: −4 + 9 = 5."));
addEnd("nums","l2",QC("Compute 18 − 12 ÷ 3 × 2.","10","Divide and multiply left to right: 12÷3 = 4, 4×2 = 8. Then 18 − 8 = 10."));
addFig("frac","l1",'<div class="figrow">'+FIG.pizza(4,3,{cap:"3/4 — three of four equal slices"})+FIG.pizza(8,6,{cap:"6/8 — same amount of pizza!"})+'</div>');
addEnd("frac","l1",QC("Compute 3/5 + 1/10 (as a fraction).","7/10","Common denominator 10: 6/10 + 1/10 = 7/10."));
addEnd("frac","l3",QC("A $120 jacket is 15% off. New price?","102","Keep 85%: 120 × 0.85 = 102."));
addEnd("ratio","l2",QC("If 4 notebooks cost $10, what do 10 notebooks cost?","25","One costs 10 ÷ 4 = $2.50, so 10 cost $25."));
addFig("alg","l2",FIG.scale("4x − 7","13",{cap:"An equation is a balance: do the same thing to both pans."}));
addEnd("alg","l2",QC("Solve 3x + 8 = 29.","7","Subtract 8: 3x = 21. Divide by 3: x = 7."));
addFig("ineq","l1",FIG.numline(-2,8,{rays:[{v:5,dir:"left",closed:true,c:"blue"}],cap:"x ≤ 5: filled dot (5 is included), arrow to the left."}));
addFig("ineq","l2",FIG.numline(-4,10,{marks:[{v:3,label:"3",c:"ink"},{v:8,label:"8",c:"red"},{v:-2,label:"−2",c:"red"}],jumps:[{from:3,to:8,label:"5 away",c:"grn"},{from:3,to:-2,label:"5 away",c:"grn"}],cap:"|x − 3| = 5 asks: which numbers are 5 steps from 3?"}));
addFig("lines","l1",FIG.plane({r:6,lines:[{m:3,b:-1}],slope:[1,2,3,8],pts:[[1,2,"(1, 2)"],[3,8,"(3, 8)"]],cap:"Slope = rise ÷ run = 6 ÷ 2 = 3."}));
addFig("lines","l2",FIG.plane({r:6,lines:[{m:2,b:1,c:"blue"},{m:2,b:-3,c:"red"},{m:-0.5,b:2,c:"grn",dash:"8 6"}],labels:[[1.2,4.5,"y = 2x + 1","blue"],[2.6,1.2,"y = 2x − 3","red"],[-5.5,5.6,"perpendicular: y = −½x + 2","grn"]],cap:"Blue and red are parallel (same slope 2). Green is perpendicular (slope −½)."}));
addFig("lines","l3",FIG.plane({r:7,lines:[{m:-2/3,b:4}],pts:[[6,0,"(6, 0)"],[0,4,"(0, 4)"]],cap:"2x + 3y = 12 crosses the axes at (6, 0) and (0, 4)."}));
addFig("sys","l1",FIG.plane({r:6,lines:[{m:-1,b:5},{m:1,b:-1}],pts:[[3,2,"(3, 2) solution!","vio"]],cap:"x + y = 5 and x − y = 1 cross at exactly one point: (3, 2)."}));
addEnd("sys","l1",'<div class="figrow">'+FIG.plane({r:5,lines:[{m:1,b:2},{m:1,b:-2}],cap:"Parallel → no solution"})+FIG.plane({r:5,lines:[{m:-0.5,b:1,c:"blue"},{m:-0.5,b:1,c:"red",dash:"10 8"}],cap:"Same line → infinitely many"})+'</div>');

/* =====================================================================
   NEW LESSONS — UNIT: nums
   ===================================================================== */
L("nums","l4","Factors, multiples & prime numbers",9,`
<p>Think of a number as a chocolate bar. Its <strong>factors</strong> are all the ways you can break it into equal rows with nothing left over. 12 can be 1×12, 2×6 or 3×4 — so the factors of 12 are <strong>1, 2, 3, 4, 6, 12</strong>.</p>
<p><strong>Multiples</strong> go the other way: they're what you get when you keep adding the number. Multiples of 4: 4, 8, 12, 16, 20…</p>
${NOTE("students mix these two up for years. Remember: factors are <em>small</em> (they fit inside), multiples are <em>big</em> (they grow out). 3 is a factor of 12; 12 is a multiple of 3.")}
<h3>Prime numbers</h3>
<p>A <strong>prime</strong> has exactly two factors: 1 and itself. They're the "atoms" of numbers.</p>
<div class="fbox">2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 …</div>
<div class="trap"><b>Two famous traps.</b> 1 is NOT prime (it has only one factor). 2 IS prime — the only even prime.</div>
<h3>Breaking a number into primes</h3>
<p>Keep splitting until everything is prime: 60 = 6 × 10 = (2·3)(2·5) = <strong>2² · 3 · 5</strong>. Every number has exactly one prime recipe like this.</p>
<h3>GCF — the greatest common factor</h3>
<p>The biggest number that divides both. For 12 and 18: factors of 12 are 1,2,3,4,6,12; of 18 are 1,2,3,6,9,18. The biggest shared one is <strong>6</strong>.</p>
<h3>LCM — the least common multiple</h3>
<p>The smallest number both divide into. Multiples of 4: 4, 8, <u>12</u>… Multiples of 6: 6, <u>12</u>… So LCM = <strong>12</strong>.</p>
<div class="tip"><b>Which one does the question want?</b><br>• "Split into the largest equal groups", "biggest tile that fits" → <b>GCF</b>.<br>• "When will both happen again at the same time?", "smallest number both go into" → <b>LCM</b>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
One bus leaves every 12 minutes, another every 18 minutes. They both leave now. When will they next leave together? That's the LCM of 12 and 18 = <strong>36 minutes</strong>.</div>
${QC("What is the LCM of 4 and 6?","12","Multiples of 6: 6, 12… 12 is also a multiple of 4.")}
${QC("What is the GCF of 24 and 36?","12","12 divides both (24 = 12·2, 36 = 12·3) and nothing bigger does.")}
`);
L("nums","l5","Even, odd, remainders & consecutive numbers",8,`
<p>These look babyish, but the SAT uses them to build surprisingly tricky questions. Once you see the patterns, those questions become free points.</p>
<h3>Even & odd rules</h3>
<div class="fbox">even ± even = even     odd ± odd = even     even ± odd = odd
even × anything = even     odd × odd = odd</div>
<div class="tip"><b>Can't remember?</b> Test with tiny numbers: odd + odd → 1 + 3 = 4, even. Done. This "try small numbers" habit will save you all through the test.</div>
<h3>Remainders</h3>
<p>When something doesn't divide evenly, the leftover is the <strong>remainder</strong>. 17 ÷ 5 = 3 groups of 5 (that's 15) with <strong>2 left over</strong>.</p>
<div class="fbox">number = divisor × quotient + remainder      17 = 5·3 + 2</div>
<div class="eg"><div class="lab">EXAMPLE</div>
When n is divided by 7 the remainder is 3. What's the remainder when 2n is divided by 7? Pick a number that works: n = 10 (10 = 7+3). Then 2n = 20, and 20 ÷ 7 = 2 remainder <strong>6</strong>.</div>
${NOTE("for remainder questions, <b>never</b> do algebra first. Pick the smallest number that fits the rule and just compute. It takes ten seconds.")}
<h3>Consecutive integers</h3>
<p>Numbers in a row: n, n+1, n+2… Consecutive <em>even</em> or <em>odd</em> numbers go up by 2: n, n+2, n+4.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Three consecutive odd numbers add to 45. n + (n+2) + (n+4) = 45 → 3n + 6 = 45 → n = 13. They are <strong>13, 15, 17</strong>.</div>
<div class="tip"><b>Shortcut:</b> for an odd count of consecutive numbers, the middle one = total ÷ count. 45 ÷ 3 = 15, so it's 13, 15, 17.</div>
${QC("What is the remainder when 29 is divided by 4?","1","4 × 7 = 28, and 29 − 28 = 1.")}
${QC("Five consecutive integers add to 60. What is the largest?","14","Middle = 60 ÷ 5 = 12. So 10, 11, 12, 13, 14.")}
`);
L("nums","l6","Mental math & estimating like a pro",7,`
<p>Yes, the digital SAT gives you a calculator for every math question. But the students who score 750+ still do small things in their head — because it's faster and it catches mistakes. Here are the tricks I teach every class.</p>
<h3>Quick tricks</h3>
<ul>
<li><strong>× 5:</strong> multiply by 10, then halve. 46 × 5 = 460 ÷ 2 = 230.</li>
<li><strong>× 25:</strong> multiply by 100, then ÷ 4. 16 × 25 = 1600 ÷ 4 = 400.</li>
<li><strong>10% of anything:</strong> move the decimal one place left. 10% of 340 = 34.</li>
<li><strong>Build other percents from 10%:</strong> 5% is half of 10%. 15% = 10% + 5%. 30% = 3 × 10%.</li>
<li><strong>× 99:</strong> × 100 then subtract one. 7 × 99 = 700 − 7 = 693.</li>
</ul>
<div class="eg"><div class="lab">EXAMPLE</div>
15% tip on $48: 10% = 4.80, 5% = 2.40, total <strong>$7.20</strong>.</div>
<h3>Estimate before you calculate</h3>
<p>Round the numbers, get a rough answer, then compare with your real answer. If you expect "about 300" and your calculator says 3000, you hit a wrong key.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
38.7 × 5.1 ≈ 40 × 5 = 200. The real answer (197.37) is near 200 ✓.</div>
${NOTE("I've watched brilliant students lose points because they trusted a mistyped calculator number. A two-second estimate is your seatbelt.")}
${QC("Mentally: what is 15% of 60?","9","10% = 6, 5% = 3, total 9.")}
`);
more("nums",[
N("What is the GCF of 18 and 30?","6","Factors in common: 1, 2, 3, 6. Biggest is 6."),
N("What is the LCM of 6 and 8?","24","Multiples of 8: 8, 16, 24. 24 is also a multiple of 6."),
P("Which number is prime?",["21","27","29","33"],2,"29 has only the factors 1 and 29. 21=3·7, 27=3·9, 33=3·11."),
N("Remainder when 50 is divided by 6?","2","6 × 8 = 48, 50 − 48 = 2."),
P("If a is odd and b is even, a·b + a is:",["always even","always odd","could be either","zero"],1,"a·b is even; even + odd = odd. Try a=1, b=2: 2+1 = 3."),
N("Three consecutive even numbers sum to 54. The smallest?","16","Middle = 54 ÷ 3 = 18, so 16, 18, 20."),
N("Mentally compute 24 × 25.","600","24 × 100 = 2400, ÷ 4 = 600."),
N("Write 72 as 2^a · 3^b. Enter a.","3","72 = 8 · 9 = 2³ · 3²."),
N("What is 35% of 80? (use 10% steps)","28","10% = 8, so 30% = 24, 5% = 4. Total 28.")
],[
N("Two lights blink every 8 s and 12 s. They blink together now. Seconds until they blink together again?","24","LCM of 8 and 12 is 24."),
N("When n is divided by 5 the remainder is 4. Remainder when n + 3 is divided by 5?","2","Try n = 9: n + 3 = 12, 12 ÷ 5 remainder 2."),
P("How many prime numbers are between 10 and 20?",["3","4","5","6"],1,"11, 13, 17, 19 → four primes."),
N("A garden 24 m by 40 m is split into equal square plots as large as possible. Side length (m)?","8","Largest square that fits both = GCF(24, 40) = 8.")
],[
C("Factor vs multiple","Factors fit inside (small). Multiples grow out (big). 3 is a factor of 12; 12 is a multiple of 3."),
C("Prime number","Exactly two factors: 1 and itself. 1 is not prime; 2 is the only even prime."),
C("GCF clue words","'largest equal groups', 'biggest that fits both'."),
C("LCM clue words","'happen together again', 'smallest both go into'."),
C("Remainder trick","Pick the smallest number that fits the rule and compute."),
C("Odd + odd","Even. (odd × odd = odd; anything × even = even)"),
C("Consecutive middle trick","For an odd count: middle = total ÷ count.")
]);

/* =====================================================================
   NEW LESSONS — UNIT: frac
   ===================================================================== */
L("frac","l4","Mixed numbers & comparing fractions",7,`
<p>A <strong>mixed number</strong> like 2⅓ means "2 whole pizzas and ⅓ of another". For math, we almost always turn it into an <strong>improper fraction</strong> (top bigger than bottom).</p>
<div class="fbox">2⅓ = (2 × 3 + 1)/3 = 7/3</div>
<p>Why? Each whole pizza has 3 thirds, so 2 pizzas = 6 thirds, plus 1 more third = 7 thirds.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Back the other way: 17/5 → 5 goes into 17 three times (15) with 2 left → <strong>3⅖</strong>.</div>
<div class="tip"><b>On the SAT grid-in</b> you can NOT type mixed numbers. Type 7/3, never "2 1/3" — the computer would read it as 21/3!</div>
<h3>Which fraction is bigger?</h3>
<p>Three reliable ways:</p>
<ul>
<li><strong>Turn into decimals</strong> (calculator): 5/8 = 0.625 vs 3/5 = 0.6 → 5/8 is bigger.</li>
<li><strong>Cross-multiply:</strong> for 5/8 vs 3/5, compare 5×5 = 25 with 8×3 = 24. The side with the bigger product wins → 5/8.</li>
<li><strong>Compare to ½:</strong> 3/7 is less than half, 5/9 is more than half.</li>
</ul>
<h3>Reciprocal</h3>
<p>Flip a fraction upside-down: the reciprocal of 3/4 is 4/3. A number times its reciprocal is always 1.</p>
${QC("Write 3½ as an improper fraction.","7/2","3 × 2 + 1 = 7 halves → 7/2.")}
${QC("Which is bigger, 4/9 or 3/7? Type the bigger fraction.","4/9","Cross-multiply: 4×7 = 28 vs 9×3 = 27. 28 wins, so 4/9.")}
`);
L("frac","l5","Real-life percent: tax, tip, discount, interest",9,`
<p>This is where percents pay rent. The same move — <strong>multiply by a "keep" or "grow" number</strong> — solves almost all of these.</p>
<table class="tbl" style="width:100%;margin:12px 0"><tr><td><b>Situation</b></td><td><b>Multiply by</b></td></tr>
<tr><td>8% sales tax added</td><td>1.08</td></tr><tr><td>20% tip added</td><td>1.20</td></tr>
<tr><td>35% discount</td><td>0.65</td></tr><tr><td>price up 12%</td><td>1.12</td></tr></table>
<div class="eg"><div class="lab">EXAMPLE — discount then tax</div>
A $60 shirt is 25% off, then 8% tax is added. Price = 60 × 0.75 × 1.08 = <strong>$48.60</strong>. Just chain the multipliers.</div>
${NOTE("I make my students say out loud: <i>“percent changes multiply.”</i> You never add 25% and 8% together.")}
<h3>Simple interest</h3>
<div class="fbox">interest = principal × rate × years      (I = P·r·t)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
$500 at 4% simple interest for 3 years: I = 500 × 0.04 × 3 = $60. Total = <strong>$560</strong>.</div>
<p>(Compound interest — where interest earns interest — is in the Advanced Math unit.)</p>
<h3>"Percent more than" questions</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
A is 30% more than B, and B = 50. Then A = 50 × 1.30 = <strong>65</strong>. "More than B" always means B is the starting point.</div>
<div class="trap"><b>Trap.</b> "A is 30% more than B" does NOT mean "B is 30% less than A". 65 × 0.70 = 45.5, not 50. The base changed!</div>
${QC("A $40 meal gets a 15% tip. Total cost in dollars?","46","40 × 1.15 = 46.")}
${QC("$800 at 5% simple interest for 2 years. Interest earned?","80","800 × 0.05 × 2 = 80.")}
`);
L("frac","l6","Reverse percent: finding the original",7,`
<p>The SAT's favourite percent twist: they give you the price <em>after</em> the change and ask for the price <em>before</em>. Most students mess this up, so let's make it bulletproof.</p>
<div class="fbox">original × multiplier = new     ⟹     original = new ÷ multiplier</div>
<div class="eg"><div class="lab">EXAMPLE</div>
After a 25% discount a jacket costs $60. Original? The multiplier is 0.75, so original = 60 ÷ 0.75 = <strong>$80</strong>.</div>
<div class="trap"><b>The classic wrong move:</b> adding 25% of 60 back (60 + 15 = 75). Wrong! The 25% was taken from the original, not from 60. Always divide by the multiplier.</div>
<h3>The three percent sentences</h3>
<p>Every percent question is one of these. Translate "is" as =, "of" as ×, "what" as x:</p>
<ul>
<li><b>What is 20% of 50?</b> → x = 0.2 × 50 = 10</li>
<li><b>10 is what percent of 50?</b> → 10 = x × 50 → x = 0.2 = 20%</li>
<li><b>10 is 20% of what?</b> → 10 = 0.2 × x → x = 50</li>
</ul>
${NOTE("write the equation every time, even when it feels easy. The translation step is where points are lost, not the arithmetic.")}
${QC("After a 20% raise, a salary is $54,000. What was it before?","45000","54000 ÷ 1.2 = 45000.")}
${QC("18 is 40% of what number?","45","18 = 0.4x → x = 45.")}
`);
more("frac",[
N("Write 17/4 as a mixed number: enter the whole-number part.","4","4 × 4 = 16, remainder 1 → 4¼."),
N("Write 2¾ as an improper fraction.","11/4","2 × 4 + 3 = 11 → 11/4."),
N("A $25 book with 8% tax. Total ($)?","27","25 × 1.08 = 27."),
N("$200 off 30%, then 10% tax. Final price ($)?","154","200 × 0.7 × 1.1 = 154."),
N("After 40% off, a lamp costs $36. Original price?","60","36 ÷ 0.6 = 60."),
N("12 is what percent of 48?","25","12/48 = 0.25 = 25%."),
N("30 is 60% of what?","50","30 = 0.6x → x = 50."),
N("$1000 at 3% simple interest for 4 years. Total amount ($)?","1120","Interest 1000×0.03×4 = 120; total 1120."),
P("Which is largest?",["3/5","5/8","2/3","7/12"],2,"Decimals: 0.6, 0.625, 0.667, 0.583. 2/3 is largest.")
],[
N("A price rises 10% then another 10%. Total percent increase?","21","1.1 × 1.1 = 1.21 → 21%."),
N("After an 8% tax, a bill is $54. Price before tax?","50","54 ÷ 1.08 = 50."),
P("A is 25% more than B. B is what percent less than A?",["25%","20%","75%","80%"],1,"Let B = 100, A = 125. 25/125 = 20% less."),
N("A town grew from 2,500 to 3,000. Percent increase?","20","500/2500 = 0.2.")
],[
C("Mixed → improper","whole × bottom + top, over bottom. 2⅓ = 7/3."),
C("Grid-in mixed numbers","Not allowed. Type 7/3, never '2 1/3'."),
C("Chain of % changes","Multiply the multipliers: 0.75 × 1.08 …"),
C("Simple interest","I = P · r · t."),
C("Reverse percent","original = new ÷ multiplier. Never add the % back."),
C("'x is what % of y'","x = p·y → p = x ÷ y."),
C("Compare fractions","Decimals, cross-multiply, or compare to ½.")
]);

/* =====================================================================
   NEW LESSONS — UNIT: ratio
   ===================================================================== */
L("ratio","l3","Unit conversion deep dive (squares, cubes, density)",9,`
<p>Converting units is just multiplying by clever versions of 1. The SAT makes it harder in three ways: two-step conversions, squared/cubed units, and density.</p>
<h3>Two-step conversions</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
72 km/h in meters per second:<br>
72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 72000/3600 = <strong>20 m/s</strong>.<br>
Every unit you don't want appears once on top and once on bottom, so it cancels.</div>
<h3>Squared and cubed units — the big trap</h3>
<p>1 foot = 12 inches. But 1 <em>square</em> foot is a 12-by-12 square, so it holds 12 × 12 = <strong>144</strong> square inches.</p>
<div class="fbox">1 ft = 12 in     1 ft² = 144 in²     1 ft³ = 1728 in³
1 m = 100 cm    1 m² = 10,000 cm²   1 m³ = 1,000,000 cm³</div>
<div class="trap"><b>Trap.</b> Converting area? Use the conversion factor <em>twice</em>. Volume? <em>Three</em> times.</div>
<h3>Density</h3>
<div class="fbox">density = mass ÷ volume       (or people ÷ area for population density)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A block has mass 540 g and volume 200 cm³. Density = 540 ÷ 200 = <strong>2.7 g/cm³</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A town of 12,000 people covers 16 km². Population density = 12000 ÷ 16 = <strong>750 people per km²</strong>.</div>
${QC("How many square inches are in 3 square feet?","432","3 × 144 = 432.")}
${QC("Convert 36 km/h to m/s.","10","36 × 1000 ÷ 3600 = 10.")}
`);
L("ratio","l4","Rate word problems: speed, meeting & work",10,`
<p>Nearly all rate problems use one relationship. Learn it in all three disguises:</p>
<div class="fbox">distance = rate × time      rate = distance ÷ time      time = distance ÷ rate</div>
<h3>Two things moving toward each other</h3>
<p>If two cars drive toward each other, the gap closes at the <strong>sum</strong> of their speeds.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Two cars 300 miles apart drive toward each other at 40 mph and 60 mph. The gap shrinks by 100 miles each hour → they meet after 300 ÷ 100 = <strong>3 hours</strong>.</div>
<h3>Average speed — the famous trap</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
You drive 60 miles at 30 mph and back at 60 mph. Average speed is NOT 45!<br>
Time there = 2 h, back = 1 h. Total 120 miles in 3 hours → <strong>40 mph</strong>.</div>
<div class="trap"><b>Average speed = total distance ÷ total time.</b> Never average the two speeds.</div>
<h3>Work problems</h3>
<p>Think "jobs per hour". If Ana paints a room in 3 hours, she does ⅓ room per hour. Rates add when people work together.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Ana: 3 hours alone. Ben: 6 hours alone. Together per hour: ⅓ + ⅙ = ½ room. So together they need <strong>2 hours</strong>.</div>
${NOTE("draw a quick table with columns Rate | Time | Distance (or Work). Filling the boxes turns a scary paragraph into a calm little puzzle.")}
${QC("Two cars 300 miles apart drive toward each other at 70 mph and 50 mph. Hours until they meet?","2.5","300 ÷ (70 + 50) = 2.5.")}
${QC("A pipe fills a tank in 4 h, another in 12 h. Hours together?","3","1/4 + 1/12 = 4/12 = 1/3 per hour → 3 hours.")}
`);
L("ratio","l5","Direct & inverse variation",7,`
<p>Two quantities can be linked in two classic ways.</p>
<h3>Direct variation: y = kx</h3>
<p>When one doubles, the other doubles. Cost of apples vs number of apples. The ratio y/x is always the same number k.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
y varies directly with x, and y = 15 when x = 5. So k = 15/5 = 3 and y = 3x. When x = 8, y = <strong>24</strong>.</div>
${FIG.plane({r:6,lines:[{m:0.8,b:0}],cap:"Direct variation is a straight line through the origin (0, 0)."})}
<h3>Inverse variation: y = k/x</h3>
<p>When one doubles, the other is cut in half. More workers → fewer days. The product x·y is always the same number k.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
6 workers finish a job in 10 days. How long for 15 workers? Product = 6 × 10 = 60 worker-days. 60 ÷ 15 = <strong>4 days</strong>.</div>
<div class="tip"><b>Tell them apart:</b> direct → divide gives constant (y/x). Inverse → multiply gives constant (x·y).</div>
${QC("y varies inversely with x. y = 6 when x = 4. Find y when x = 8.","3","x·y = 24, so y = 24 ÷ 8 = 3.")}
`);
more("ratio",[
N("How many square centimeters in 2 square meters?","20000","1 m² = 10,000 cm² → 20,000."),
N("An object: 300 g, 120 cm³. Density (g/cm³)?","2.5","300 ÷ 120 = 2.5."),
N("A runner goes 15 km at 10 km/h. Hours?","1.5","time = 15 ÷ 10."),
N("Trip: 120 km at 60 km/h, back at 40 km/h. Average speed (km/h)?","48","Times 2 h + 3 h = 5 h. 240 ÷ 5 = 48."),
N("One printer does a job in 6 h, another in 3 h. Hours together?","2","1/6 + 1/3 = 1/2 per hour → 2 h."),
N("y = kx and y = 12 when x = 4. Find y when x = 10.","30","k = 3, y = 30."),
N("8 workers take 9 days. How many days for 12 workers?","6","72 worker-days ÷ 12 = 6."),
N("Convert 5 m/s to km/h.","18","5 × 3600 ÷ 1000 = 18.")
],[
N("How many cubic inches are in 2 cubic feet?","3456","1 ft³ = 1728 in³, × 2 = 3456."),
N("Two trains 450 km apart approach at 80 and 70 km/h. Hours to meet?","3","450 ÷ 150 = 3."),
P("If x doubles and y is cut in half every time, x and y vary:",["directly","inversely","not at all","linearly with slope 2"],1,"Product stays constant → inverse."),
N("A city of 45,000 people covers 30 square miles. Density (people per sq mi)?","1500","45000 ÷ 30.")
],[
C("d = r · t","distance = rate × time; rearrange for rate or time."),
C("Meeting problems","Toward each other: add the speeds."),
C("Average speed","Total distance ÷ total time. Never average the speeds."),
C("Work together","Add the rates: 1/a + 1/b = jobs per hour."),
C("ft² → in²","× 144 (12²). ft³ → in³: × 1728 (12³)."),
C("Density","mass ÷ volume (or people ÷ area)."),
C("Direct vs inverse","Direct: y/x constant (y = kx). Inverse: x·y constant (y = k/x).")
]);

/* =====================================================================
   NEW LESSONS — UNIT: alg
   ===================================================================== */
L("alg","l4","Literal equations: solving for a letter",8,`
<p>Sometimes there are only letters — no numbers — and the question says "solve for w" or "which expression gives r?". Don't panic. Treat every other letter as if it were a number, and use the exact same balance moves.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
Area of a rectangle: A = lw. Solve for w.<br>
w is being multiplied by l, so divide both sides by l: <strong>w = A/l</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Perimeter P = 2l + 2w. Solve for l.<br>
Subtract 2w: P − 2w = 2l. Divide by 2: <strong>l = (P − 2w)/2</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Temperature F = (9/5)C + 32. Solve for C.<br>
Subtract 32: F − 32 = (9/5)C. Multiply by 5/9: <strong>C = (5/9)(F − 32)</strong>.</div>
${NOTE("if the letters confuse you, secretly replace them with numbers. \"A = lw\" becomes \"12 = 3 × 4\". How do you get 4 from 12 and 3? Divide! So w = A ÷ l. Then put the letters back.")}
${QC("Using d = rt, find t when d = 150 and r = 50.","3","t = d ÷ r = 150 ÷ 50 = 3.")}
${QC("If 2a + b = c, what is a when b = 4 and c = 18?","7","a = (c − b)/2 = 14/2 = 7.")}
`);
L("alg","l5","No solution & infinitely many solutions",8,`
<p>Most equations have one answer. But two special cases show up on the SAT a lot, and they're easy once you see them.</p>
<h3>Case 1: No solution</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
2x + 3 = 2x + 5. Subtract 2x: 3 = 5. That's false no matter what x is → <strong>no solution</strong>.</div>
<h3>Case 2: Infinitely many solutions</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
3(x + 1) = 3x + 3. Expand: 3x + 3 = 3x + 3. Always true → <strong>every x works</strong>.</div>
<div class="fbox">Simplify both sides to  ax + b = cx + d
• a ≠ c            → exactly one solution
• a = c,  b ≠ d    → no solution
• a = c,  b = d    → infinitely many solutions</div>
<h3>Finding the missing constant</h3>
<div class="eg"><div class="lab">EXAMPLE</div>
For what k does 4x + 7 = kx − 1 have <b>no solution</b>? The x-parts must match (k = 4) while the numbers differ (7 ≠ −1). So <strong>k = 4</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
ax + 2 = 5x + b has <b>infinitely many</b> solutions. Then a = 5 and b = 2.</div>
${QC("For what value of a does ax + 2 = 5x + 2 have infinitely many solutions?","5","Both sides must be identical: a = 5.")}
`);
L("alg","l6","Building linear models from words",9,`
<p>A huge share of SAT questions describe something that has a <strong>starting amount</strong> and then changes by a <strong>fixed amount each time</strong>. That's always a line:</p>
<div class="fbox">total = start + (rate × number of units)      y = b + mx</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A gym charges a $50 sign-up fee and $30 per month. Cost after m months: <strong>C = 50 + 30m</strong>. After 6 months: 50 + 180 = $230.</div>
<div class="eg"><div class="lab">EXAMPLE — going down</div>
A phone battery starts at 100% and drops 8% per hour. B = 100 − 8h. When is it at 20%? 100 − 8h = 20 → h = <strong>10 hours</strong>.</div>
<h3>"What does the number mean?" questions</h3>
<p>In C = 50 + 30m:</p>
<ul><li><b>50</b> = the cost when m = 0 → the one-time sign-up fee.</li><li><b>30</b> = how much C grows for each extra month → the monthly price.</li></ul>
<div class="tip"><b>Magic sentence for the slope:</b> "for each additional [x-unit], [y] increases by [slope] [y-units]." Plug in the words and you'll pick the right choice every time.</div>
${NOTE("when two companies are compared (\"when is plan A cheaper than plan B?\"), write both lines and set them equal to find the break-even point.")}
${QC("A taxi charges $2.50 plus $1.75 per mile. Cost of an 8-mile ride?","16.5","2.50 + 1.75 × 8 = 16.50.")}
${QC("Plan A: $20 + $5/month. Plan B: $50 + $2/month. After how many months do they cost the same?","10","20 + 5m = 50 + 2m → 3m = 30 → m = 10.")}
`);
more("alg",[
N("A = lw. Find w when A = 48 and l = 6.","8","w = A ÷ l = 8."),
N("P = 2l + 2w. Find l when P = 30, w = 5.","10","30 − 10 = 20, ÷ 2 = 10."),
P("3x + 5 = 3x − 2 has:",["one solution","no solution","infinitely many","x = 0"],1,"The 3x cancels, leaving 5 = −2 — false."),
P("2(x − 4) = 2x − 8 has:",["one solution","no solution","infinitely many","x = 4"],2,"Both sides are identical."),
N("For what k does kx + 1 = 6x + 9 have no solution?","6","x-parts must match: k = 6 (and 1 ≠ 9)."),
N("A plumber charges $60 plus $45 per hour. Cost for 3 hours?","195","60 + 135 = 195."),
N("A candle is 30 cm and burns 2 cm per hour. Height after 7 hours (cm)?","16","30 − 14 = 16."),
N("F = (9/5)C + 32. Find C when F = 212.","100","212 − 32 = 180; 180 × 5/9 = 100.")
],[
N("ax + 3 = 7x + b has infinitely many solutions. Find a + b.","10","a = 7, b = 3, sum 10."),
N("A tank holds 500 L and drains 25 L/min. Minutes until it holds 200 L?","12","500 − 25t = 200 → t = 12."),
P("In C = 12 + 4n (n = hours), what does 4 represent?",["the starting cost","the cost per hour","the total cost","hours rented"],1,"It's multiplied by the hours: the rate per hour."),
N("Solve y = 3x + 2 for x when y = 20.","6","x = (y − 2)/3 = 6.")
],[
C("Literal equation","Solve for one letter using normal balance moves; treat other letters like numbers."),
C("No solution","x-terms cancel and a false statement remains (3 = 5)."),
C("Infinitely many","Both sides simplify to the same thing."),
C("Linear model","total = start + rate × units  (y = b + mx)."),
C("Slope meaning","For each additional x-unit, y changes by the slope."),
C("Break-even","Set the two plans' equations equal.")
]);

/* =====================================================================
   NEW LESSONS — UNIT: ineq
   ===================================================================== */
L("ineq","l3","Compound inequalities & absolute value ranges",8,`
<p>A <strong>compound inequality</strong> squeezes x between two values, like −3 &lt; 2x + 1 ≤ 7. Solve it by doing the same step to <em>all three parts</em>.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
−3 &lt; 2x + 1 ≤ 7 → subtract 1 everywhere: −4 &lt; 2x ≤ 6 → divide by 2: <strong>−2 &lt; x ≤ 3</strong>.</div>
${FIG.numline(-4,5,{segs:[{a:-2,b:3,ca:false,cb:true,c:"blue"}],cap:"−2 &lt; x ≤ 3: open dot at −2 (not included), filled dot at 3 (included)."})}
<h3>"And" vs "or"</h3>
<ul><li><b>and</b> (between): x &gt; −2 <b>and</b> x ≤ 3 → one connected piece.</li>
<li><b>or</b> (outside): x &lt; −1 <b>or</b> x &gt; 4 → two separate arrows going away from each other.</li></ul>
<h3>Absolute value inequalities</h3>
<div class="fbox">|x − a| &lt; d   →   a − d &lt; x &lt; a + d    (within d of a: "between")
|x − a| &gt; d   →   x &lt; a − d  or  x &gt; a + d   (more than d away: "outside")</div>
<div class="eg"><div class="lab">EXAMPLE</div>
A machine part must be 50 mm, give or take 0.2 mm: |L − 50| ≤ 0.2 → <strong>49.8 ≤ L ≤ 50.2</strong>.</div>
${QC("What is the largest integer x with −3 < 2x + 1 ≤ 7?","3","−2 < x ≤ 3, so the largest integer is 3.")}
`);
L("ineq","l4","Inequality word problems & shaded graphs",9,`
<p>Inequalities appear in word problems about budgets, limits and minimums.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
You have $50. Notebooks cost $3.75 each. How many can you buy? 3.75n ≤ 50 → n ≤ 13.33. You can't buy part of a notebook, so the answer is <strong>13</strong>.</div>
<div class="trap"><b>Rounding trap.</b> With "at most / can afford", round <b>down</b> (13, not 14). With "at least / needs", round <b>up</b>: if a bus holds 40 and 130 students go, you need 130/40 = 3.25 → <b>4 buses</b>.</div>
<h3>Two-variable inequalities are shaded regions</h3>
<p>y &gt; 2x − 1 means "all the points <em>above</em> the line y = 2x − 1". The line itself is drawn dashed for &gt; or &lt;, solid for ≥ or ≤.</p>
${FIG.plane({r:5,lines:[{m:2,b:-1,dash:"9 7"}],shade:[{m:2,b:-1,above:true}],pts:[[0,3,"(0, 3) ✓","grn"],[3,0,"(3, 0) ✗","red"]],cap:"y > 2x − 1: everything above the dashed line."})}
<div class="tip"><b>The point test.</b> To check if a point is a solution, just plug it in. (0, 3): 3 &gt; 2·0 − 1 = −1 ✓. (3, 0): 0 &gt; 5? ✗.</div>
<h3>Systems of inequalities</h3>
<p>The solution is the region where both shadings overlap. On the SAT, simply plug each answer choice's point into <em>both</em> inequalities.</p>
${QC("You have $50 and notebooks cost $3.75 each. Maximum number you can buy?","13","50 ÷ 3.75 = 13.33 → round down to 13.")}
${QC("130 students, buses hold 40 each. Minimum number of buses?","4","3.25 buses → round up to 4.")}
`);
more("ineq",[
P("Solve 1 ≤ 3x − 2 < 10.",["1 ≤ x < 4","3 ≤ x < 12","−1 ≤ x < 8/3","1 < x ≤ 4"],0,"Add 2: 3 ≤ 3x < 12. Divide by 3: 1 ≤ x < 4."),
P("|x − 10| ≤ 2 means:",["8 ≤ x ≤ 12","x ≤ 8 or x ≥ 12","−12 ≤ x ≤ −8","x = 12"],0,"Within 2 of 10."),
N("A van holds 7 people. Minimum vans for 45 people?","7","45/7 = 6.4 → round up to 7."),
N("Tickets cost $12. With $100, the most tickets?","8","100/12 = 8.33 → 8."),
P("Which point is in y ≥ x + 2?",["(0, 1)","(1, 4)","(3, 4)","(2, 3)"],1,"(1,4): 4 ≥ 3 ✓. Others fail."),
N("Smallest integer satisfying 5x − 3 > 17.","5","5x > 20 → x > 4 → smallest integer 5.")
],[
N("How many integers satisfy −2 ≤ x < 3?","5","−2, −1, 0, 1, 2."),
P("Which describes |x| > 4?",["−4 < x < 4","x < −4 or x > 4","x > 4 only","x < 4"],1,"More than 4 away from zero: outside."),
N("A phone plan: $30 plus $0.05 per text. Budget $40. Max texts?","200","30 + 0.05t ≤ 40 → t ≤ 200."),
P("Point (2, 1) is a solution of:",["y > 2x","y < x","y > x + 1","y ≥ 3"],1,"1 < 2 ✓.")
],[
C("Compound inequality","Do the same step to all three parts."),
C("|x − a| < d","Between: a − d < x < a + d."),
C("|x − a| > d","Outside: x < a − d or x > a + d."),
C("Round down / up","'Can afford / at most' → down. 'Need / at least' → up."),
C("Dashed vs solid line","< or > → dashed. ≤ or ≥ → solid."),
C("Test a point","Plug it into every inequality; all must be true.")
]);

/* =====================================================================
   NEW LESSONS — UNIT: lines
   ===================================================================== */
L("lines","l4","Point-slope form & reading lines off graphs",8,`
<p>If you know one point and the slope, <strong>point-slope form</strong> writes the line instantly:</p>
<div class="fbox">y − y₁ = m(x − x₁)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Slope 3 through (2, 5): y − 5 = 3(x − 2) → y = 3x − 6 + 5 → <strong>y = 3x − 1</strong>.</div>
<h3>Reading a line from its graph</h3>
<ol><li>Find where it crosses the y-axis → that's <b>b</b>.</li>
<li>Find a second point where the line hits grid corners exactly.</li>
<li>Count rise and run between the two points → slope <b>m</b>.</li></ol>
${FIG.plane({r:6,lines:[{m:-0.5,b:3}],slope:[0,3,4,1],pts:[[0,3,"(0, 3)"],[4,1,"(4, 1)"]],cap:"b = 3. From (0,3) to (4,1): rise −2, run 4 → slope −½. So y = −½x + 3."})}
${NOTE("pick grid-corner points only. Guessing a point like (1.3, 2.4) is how slopes come out wrong.")}
${QC("A line has slope 3 and passes through (2, 5). What is y when x = 4?","11","From x=2 to x=4 is 2 steps, rising 3 each: 5 + 6 = 11.")}
`);
L("lines","l5","Lines in real life: what the numbers mean",8,`
<p>SAT loves questions like "what does the 2.5 represent?". Here's the whole secret in one picture: in <span class="fx">y = mx + b</span>, <b>b is the starting value</b> and <b>m is the change per one unit</b>.</p>
<div class="eg"><div class="lab">EXAMPLE</div>
A plant's height in cm after w weeks: h = 2.5w + 10.<br>
• 10 = the height when it was planted (w = 0).<br>
• 2.5 = it grows 2.5 cm each week.<br>
• After 6 weeks: 2.5 × 6 + 10 = 25 cm.</div>
<h3>Units of the slope</h3>
<p>Slope's unit is always "y-unit per x-unit": cm per week, dollars per hour, miles per gallon. If an answer choice has the wrong units, cross it out.</p>
<h3>Tables that are really lines</h3>
<table class="tbl" style="width:100%;margin:10px 0"><tr><td>x</td><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><td>y</td><td>7</td><td>11</td><td>15</td><td>19</td></tr></table>
<p>y goes up by 4 each time x goes up by 1 → slope 4. At x = 0, y = 7 → <strong>y = 4x + 7</strong>.</p>
<div class="trap"><b>Check the x-steps.</b> If x jumps by 2 each column, the slope is (change in y) ÷ 2, not the change in y.</div>
${QC("h = 2.5w + 10. Height (cm) after 6 weeks?","25","2.5 × 6 + 10 = 25.")}
`);
L("lines","l6","Distance & midpoint",6,`
<p>Two quick formulas for points on the plane.</p>
<h3>Midpoint — the exact middle</h3>
<div class="fbox">midpoint = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 )     just average the coordinates</div>
<div class="eg"><div class="lab">EXAMPLE</div>
Between (2, 3) and (8, 11): ((2+8)/2, (3+11)/2) = <strong>(5, 7)</strong>.</div>
<h3>Distance — it's Pythagoras in disguise</h3>
<div class="fbox">d = √( (x₂ − x₁)² + (y₂ − y₁)² )</div>
${FIG.plane({r:6,lines:[{m:4/3,b:2/3,c:"red"}],slope:[1,2,4,6],pts:[[1,2,"(1, 2)"],[4,6,"(4, 6)"]],cap:"Across 3, up 4 → the slanted distance is 5 (a 3-4-5 triangle)."})}
<div class="eg"><div class="lab">EXAMPLE</div>
From (1, 2) to (4, 6): across 3, up 4 → d = √(9 + 16) = <strong>5</strong>.</div>
${QC("Distance between (1, 2) and (4, 6)?","5","√(3² + 4²) = 5.")}
${QC("Midpoint of (−2, 4) and (6, 0): enter its x-coordinate.","2","(−2 + 6)/2 = 2.")}
`);
more("lines",[
N("Line with slope 2 through (1, 3). Find its y-intercept.","1","3 = 2(1) + b → b = 1."),
N("Line through (0, 4) and (2, 10). Slope?","3","6/2 = 3."),
N("Midpoint of (4, 6) and (10, 2): y-coordinate.","4","(6 + 2)/2 = 4."),
N("Distance between (0, 0) and (6, 8).","10","√(36 + 64) = 10."),
N("Table: x = 0,1,2 → y = 5,8,11. Slope?","3","y rises 3 per step."),
N("Table: x = 0,2,4 → y = 1,5,9. Slope?","2","y rises 4 while x rises 2 → 2."),
P("Cost C = 15h + 40. What is 40?",["cost per hour","hours worked","fixed starting fee","total cost"],2,"It's the cost when h = 0."),
N("A line through (3, 7) with slope −2. y when x = 5?","3","Two steps right, down 2 each: 7 − 4 = 3.")
],[
N("Line through (2, 1) and (6, 9). Its y-intercept?","-3","Slope 2; 1 = 2(2) + b → b = −3."),
P("A car's gas: G = 14 − 0.04m (m = miles). 0.04 is:",["gallons at start","gallons used per mile","miles per gallon","total miles"],1,"G drops 0.04 gallons for each mile."),
N("Distance between (−1, −1) and (2, 3).","5","√(9 + 16)."),
N("Midpoint of (a, 4) and (10, 8) is (7, 6). Find a.","4","(a + 10)/2 = 7 → a = 4.")
],[
C("Point-slope form","y − y₁ = m(x − x₁)."),
C("Read a slope from a graph","Use two grid-corner points; rise ÷ run."),
C("b in context","The starting value (when x = 0)."),
C("m in context","Change in y for each one-unit increase in x."),
C("Midpoint","Average the x's and average the y's."),
C("Distance formula","√((Δx)² + (Δy)²) — Pythagoras.")
]);

/* =====================================================================
   NEW LESSONS — UNIT: sys
   ===================================================================== */
L("sys","l4","Systems in word problems: tickets, coins & mixtures",10,`
<p>When a word problem has <b>two unknowns</b> and gives <b>two facts</b>, it's a system. The pattern is almost always: one equation counts <em>how many</em>, the other counts <em>how much value</em>.</p>
<div class="eg"><div class="lab">EXAMPLE — tickets</div>
A show sold 20 tickets for $168. Adults pay $10, children $6. How many adult tickets?<br>
Let a = adults, c = children.<br>
Count: a + c = 20<br>Money: 10a + 6c = 168<br>
From the first, c = 20 − a. Substitute: 10a + 120 − 6a = 168 → 4a = 48 → <strong>a = 12</strong>.</div>
<div class="eg"><div class="lab">EXAMPLE — coins</div>
14 coins, only dimes and quarters, worth $2.60. d + q = 14 and 0.10d + 0.25q = 2.60. Multiply the second by 10: d + 2.5q = 26. Subtract the first: 1.5q = 12 → q = 8, d = 6.</div>
<div class="eg"><div class="lab">EXAMPLE — mixture</div>
Mix a 10% salt solution with a 30% solution to get 20 L of 25%. x + y = 20 and 0.10x + 0.30y = 0.25·20 = 5. Then 0.1x + 0.3(20 − x) = 5 → 6 − 0.2x = 5 → x = 5 L of 10%, y = 15 L of 30%.</div>
${NOTE("the 'value' equation is the one people get wrong. Always multiply each count by its price or percent — and write the units next to it.")}
${QC("A show sold 20 tickets for $168: adults $10, children $6. How many adult tickets?","12","a + c = 20, 10a + 6c = 168 → a = 12.")}
`);
L("sys","l5","Finding the missing constant (k questions)",8,`
<p>A top-scorer favourite: "For what value of k does this system have no solution?" There's a clean rule.</p>
<div class="fbox">a₁x + b₁y = c₁
a₂x + b₂y = c₂
No solution:        a₁/a₂ = b₁/b₂ ≠ c₁/c₂   (same slope, different line)
Infinitely many:    a₁/a₂ = b₁/b₂ = c₁/c₂   (the same line)</div>
<div class="eg"><div class="lab">EXAMPLE</div>
kx + 3y = 6 and 2x + y = 5 have no solution. The y-coefficients are 3 and 1 (ratio 3), so x-coefficients need ratio 3: k/2 = 3 → <strong>k = 6</strong>. Check c: 6/5 ≠ 3 ✓.</div>
<div class="eg"><div class="lab">EXAMPLE</div>
3x − 2y = 8 and 6x + ky = 16 have infinitely many solutions. Everything doubles (3→6, 8→16), so −2 → <strong>k = −4</strong>.</div>
<div class="tip"><b>Slope version.</b> If the equations are in y = mx + b form: same m and different b → no solution; same m and same b → infinite.</div>
${QC("kx + 3y = 6 and 2x + y = 5 have no solution. Find k.","6","Ratios must match: k/2 = 3/1 → k = 6.")}
`);
L("sys","l6","Speed tricks: choosing the fastest method",7,`
<p>An 800 scorer doesn't just solve systems — they solve them <em>fast</em>. Here's my decision list.</p>
<ol>
<li><b>Something already alone</b> (y = …)? → substitution.</li>
<li><b>Coefficients line up</b> (same or opposite numbers)? → elimination.</li>
<li><b>Ugly decimals or fractions?</b> → type both equations into Desmos and click the crossing point.</li>
<li><b>They ask for x + y or x − y?</b> → try adding or subtracting the equations directly!</li>
</ol>
<div class="eg"><div class="lab">EXAMPLE — the x + y shortcut</div>
3x + 2y = 17 and 2x + 3y = 18. Find x + y.<br>
Add the equations: 5x + 5y = 35 → x + y = <strong>7</strong>. No need to find x or y at all!</div>
<div class="eg"><div class="lab">EXAMPLE — the x − y shortcut</div>
Subtract the same equations: x − y = −1. Done in one line.</div>
${NOTE("whenever the question asks for a combination like x + y, 2x − y or 4x + 4y, stop and look for a way to get it straight from the equations. The SAT writes these questions so that this trick works.")}
${QC("3x + 2y = 17 and 2x + 3y = 18. Find x + y.","7","Add them: 5x + 5y = 35 → x + y = 7.")}
`);
more("sys",[
N("30 coins of nickels and dimes are worth $2.20. How many dimes?","14","n + d = 30, 5n + 10d = 220 → d = 14."),
N("Adults $8, kids $5. 50 tickets bring $325. How many adult tickets?","25","a + k = 50, 8a + 5k = 325 → 3a = 75."),
N("For no solution: 4x + ky = 7 and 2x + 3y = 1. Find k.","6","Ratio 4/2 = 2, so k = 6 (and 7/1 ≠ 2)."),
N("Infinite solutions: 2x + 5y = 3 and 4x + ky = 6. Find k.","10","Everything doubles."),
N("x + 2y = 11 and 2x + y = 13. Find x + y.","8","Add: 3x + 3y = 24."),
N("5x + y = 20 and 3x − y = 4. Find x.","3","Add: 8x = 24."),
P("y = 3x + 2 and y = 3x − 7 have:",["one solution","no solution","infinitely many","two solutions"],1,"Same slope, different intercepts.")
],[
N("Pens cost $2, markers $3. 12 items cost $29. How many markers?","5","p + m = 12, 2p + 3m = 29 → m = 5."),
N("2x + 3y = 12 and 3x + 2y = 13. Find x − y.","1","Subtract the first from the second: x − y = 1."),
N("ax + 2y = 8 and 3x + y = 4 have infinitely many solutions. Find a.","6","Everything doubles: a = 6."),
N("Two numbers sum to 40 and differ by 8. The larger?","24","x + y = 40, x − y = 8 → x = 24.")
],[
C("Word-problem system","One 'how many' equation + one 'how much value' equation."),
C("No solution rule","a₁/a₂ = b₁/b₂ ≠ c₁/c₂."),
C("Infinite solutions rule","a₁/a₂ = b₁/b₂ = c₁/c₂."),
C("x + y shortcut","Add or subtract the equations to get the combination directly."),
C("Mixture equation","amount × percent + amount × percent = total × percent.")
]);
