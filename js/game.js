/* =====================================================================
   ZERO TO 800 — GAME LAYER
   sound effects · XP pops · streak celebrations · lesson stars · crowns
   daily log · line graphs · streak calendar · new Progress page
   ===================================================================== */
if(S.sfx===undefined)S.sfx=true;if(!S.log)S.log={};if(!S.lstars)S.lstars={};if(!S.bestStreak)S.bestStreak=S.streak.c||0;

/* ---------- sound effects (synthesized, no files) ---------- */
function actx(){try{AU.ctx=AU.ctx||new (window.AudioContext||window.webkitAudioContext)();if(AU.ctx.state==="suspended")AU.ctx.resume();return AU.ctx}catch(e){return null}}
function tone(c,f,t0,dur,type,vol,f2){var o=c.createOscillator(),g=c.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
  g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(vol||.15,t0+.015);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(g);g.connect(c.destination);o.start(t0);o.stop(t0+dur+.03)}
function sfx(k){if(!S.sfx)return;var c=actx();if(!c)return;var t=c.currentTime+.01;
  try{
  if(k==="ok"){tone(c,659.25,t,.15,"sine",.16);tone(c,987.77,t+.09,.26,"sine",.14)}
  else if(k==="no"){tone(c,240,t,.2,"triangle",.13,190);tone(c,190,t+.13,.26,"triangle",.1,150)}
  else if(k==="tap"){tone(c,900,t,.05,"sine",.035)}
  else if(k==="page"){var b=c.createBuffer(1,Math.floor(c.sampleRate*.16),c.sampleRate),d=b.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
    var s=c.createBufferSource();s.buffer=b;var bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.setValueAtTime(700,t);bp.frequency.exponentialRampToValueAtTime(2800,t+.14);var g=c.createGain();g.gain.value=.07;s.connect(bp);bp.connect(g);g.connect(c.destination);s.start(t)}
  else if(k==="done"){[523.25,659.25,783.99,1046.5].forEach(function(f,i){tone(c,f,t+i*.1,.38,"sine",.13)})}
  else if(k==="level"){[392,523.25,659.25,783.99,1046.5,1318.5].forEach(function(f,i){tone(c,f,t+i*.08,.42,"triangle",.11)})}
  else if(k==="badge"){[1318.5,1568,2093].forEach(function(f,i){tone(c,f,t+i*.07,.32,"sine",.09)})}
  else if(k==="streak"){[440,554.37,659.25,880,1108.7].forEach(function(f,i){tone(c,f,t+i*.09,.32,"sine",.11)})}
  }catch(e){}}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".snav a,.tabbar a,.tabbar button,.tog,.seg button");if(a)sfx("tap")},true);

/* ---------- daily log ---------- */
function logDay(k,v){var t=dayStr(),d=S.log[t]||(S.log[t]={xp:0,q:0,c:0});d[k]=(d[k]||0)+v}
var _recG=record;record=function(uid,ok){_recG(uid,ok);logDay("q",1);if(ok)logDay("c",1);try{S.log[dayStr()].s=overall().score}catch(e){}saveS()};

/* ---------- XP pops & level-up sound ---------- */
function xpPop(n){var d=document.createElement("div");d.className="xpPop";d.innerHTML=ic("sparkles")+"+"+n+" XP";document.body.appendChild(d);setTimeout(function(){d.remove()},1300)}
var _addXpG=addXp;addXp=function(n){var b=level();_addXpG(n);logDay("xp",n);saveS();if(n>=2)xpPop(n);if(level()>b)sfx("level");paintMini()};
var _cbG=checkBadges;checkBadges=function(){var b=Object.keys(S.badges).length;_cbG();if(Object.keys(S.badges).length>b)setTimeout(function(){sfx("badge")},450)};

/* ---------- streak celebration ---------- */
var _tsG=tickStreak;tickStreak=function(){var before=S.streak.last;_tsG();if(S.streak.last!==before){S.bestStreak=Math.max(S.bestStreak||0,S.streak.c);saveS();
  if(S.streak.c>=2)setTimeout(function(){var d=document.createElement("div");d.className="streakPop";d.innerHTML='<span class="sp-ic">'+ic("flame")+'</span><b>'+S.streak.c+'-day streak!</b><small>'+(S.streak.c>=S.bestStreak?"Your best ever — keep it alive.":"Come back tomorrow to keep it going.")+'</small>';document.body.appendChild(d);sfx("streak");setTimeout(function(){d.classList.add("out")},2600);setTimeout(function(){d.remove()},3200)},700)}};

/* ---------- answer sounds ---------- */
var _fqG=finishQ;finishQ=function(ok,it,ct){_fqG(ok,it,ct);sfx(ok?"ok":"no")};
var _qvsG=qvShow;qvShow=function(p,ok){_qvsG(p,ok);if(ok===true)sfx("ok");else if(ok===false)sfx("no")};
var _cmG=cardMark;cardMark=function(k){sfx(k?"ok":"tap");_cmG(k)};

/* ---------- lesson stars ---------- */
var _qcG=qcCheck;qcCheck=function(btn){var box=btn.closest(".qc"),first=!box._tried;box._tried=1;_qcG(btn);var ok=box.classList.contains("pop");
  if(box.querySelector(".qc-out .explain"))sfx(ok?"ok":"no");if(LP&&first){LP.ck=(LP.ck||0)+1;if(ok)LP.okc=(LP.okc||0)+1}};
var _qsG=qcShow;qcShow=function(btn){var box=btn.closest(".qc");if(LP&&!box._tried){box._tried=1;LP.ck=(LP.ck||0)+1}_qsG(btn)};
var _lsG=lpShow;lpShow=function(dir){_lsG(dir);if(dir)sfx("page")};
function starsHTML(n,big){var h="";for(var i=1;i<=3;i++)h+='<span class="st'+(i<=n?" on":"")+'" style="animation-delay:'+(i*.18)+'s">'+ic("star")+'</span>';return '<span class="stars'+(big?" big":"")+'">'+h+'</span>'}
var _lfG=lpFinish;lpFinish=function(){var P=LP,ck=P.ck||0,ok=P.okc||0,n=!ck?3:ok>=ck?3:ok/ck>=.5?2:1;_lfG();
  S.lstars[P.key]=Math.max(S.lstars[P.key]||0,n);saveS();sfx("done");
  var c=document.querySelector(".pg.cover.done h1");if(c)c.insertAdjacentHTML("beforebegin",starsHTML(n,true));
  var p=document.querySelector(".pg.cover.done p");if(p&&ck)p.insertAdjacentHTML("afterend",'<p class="muted">Checks right on the first try: '+ok+' of '+ck+'</p>')};

/* ---------- crowns (unit mastery levels) ---------- */
function crownList(u){var st=unitStats(u),a=S.stats[u.id],sk=GEN.skills(u.id),sum=0,qn=0;sk.forEach(function(n){sum+=(S.sk[u.id+"|"+n]||{b:0}).b});
  qbBuild();for(var id in S.qb){var q=QBI[id];if(q&&q.uid===u.id&&S.qb[id].st==="c")qn++}
  return [["Read every lesson",st.ld>=st.lt],["Score 80%+ on the unit quiz",(S.quiz[u.id]||0)>=80],["70%+ accuracy on 15+ questions",!!(a&&a.a>=15&&a.c/a.a>=.7)],["Skill memory level 3+ on average",sk.length?sum/sk.length>=3:(S.quiz[u.id]||0)>=90],["15 Question Bank questions right",u.id==="words"?(S.cardsSeen>=60):qn>=15]]}
function crowns(u){return crownList(u).filter(function(x){return x[1]}).length}
function crownBadge(n){return '<span class="crown c'+n+'" title="'+n+' of 5 mastery crowns">'+ic("crownf")+n+'</span>'}
var _vuG=viewUnits;viewUnits=function(a){_vuG(a);decorateUnits(a)};
function decorateUnits(a){a.querySelectorAll(".ucard").forEach(function(c){var id=(c.getAttribute("href")||"").split("/").pop(),u=findUnit(id);if(u&&!c.querySelector(".crown"))c.querySelector(".uc-m").insertAdjacentHTML("beforeend",crownBadge(crowns(u)))})}
var _lsrch=null;
var _vunG=viewUnit;viewUnit=function(a,id,tab){_vunG(a,id,tab);var u=findUnit(id);if(!u)return;var cl=crownList(u),n=cl.filter(function(x){return x[1]}).length;
  var hs=a.querySelector(".uh-s");if(hs)hs.insertAdjacentHTML("afterbegin",'<span>'+crownBadge(n)+' mastery</span>');
  var pc=a.querySelector(".pcards");if(pc)pc.insertAdjacentHTML("afterbegin",'<div class="pc col crowncard"><div class="pc-top"><span class="pc-ic y">'+ic("crownf")+'</span><div><b>Mastery crowns: '+n+' / 5</b><small>Earn all five to make this unit permanent.</small></div></div>'+cl.map(function(x){return '<div class="cr-row'+(x[1]?" on":"")+'">'+ic(x[1]?"check":"dot")+'<span>'+x[0]+'</span></div>'}).join("")+'</div>');
  a.querySelectorAll(".pnode").forEach(function(p){var lid=(p.getAttribute("href")||"").split("/").pop(),s=S.lstars[id+"/"+lid];if(s)p.querySelector(".pn-b b").insertAdjacentHTML("beforeend",starsHTML(s))})};

/* ---------- sidebar level bar + Today additions ---------- */
(function(){var sf=document.querySelector(".side-foot");if(sf)sf.insertAdjacentHTML("afterbegin",'<div class="lvbar" id="lvbar"></div>')})();
function lvHTML(){var lv=level(),into=S.xp%120;return '<div class="lv-h"><b>Level '+lv+'</b><small>'+into+' / 120 XP</small></div><div class="pbar"><i style="width:'+Math.round(into/120*100)+'%"></i></div>'}
var _pmG=paintMini;paintMini=function(){_pmG();var b=el("lvbar");if(b)b.innerHTML=lvHTML()};
function weekStrip(){var h="",names=["S","M","T","W","T","F","S"];for(var i=6;i>=0;i--){var k=dayStr(-i),on=(S.days[k]||0)>0||(S.log[k]&&S.log[k].xp>0),wd=new Date(k+"T12:00:00").getDay();
  h+='<div class="wd'+(on?" on":"")+(i===0?" today":"")+'"><span>'+(on?ic("flame"):"")+'</span><small>'+names[wd]+'</small></div>'}return h}
function spark(vals,w,h){var mx=Math.max.apply(null,vals.concat([1])),n=vals.length,pts=vals.map(function(v,i){return [(i*(w-4)/(n-1)+2).toFixed(1),(h-3-(v/mx)*(h-8)).toFixed(1)]});
  return '<svg class="spark" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><path d="M'+pts.map(function(p){return p.join(" ")}).join(" L")+'" pathLength="1" class="fdraw"/></svg>'}
var _vhG=viewHome;viewHome=function(a){_vhG(a);var th=a.querySelector(".t-head");if(!th)return;var xs=[];for(var i=13;i>=0;i--){var L_=S.log[dayStr(-i)];xs.push(L_?L_.xp:0)}
  th.insertAdjacentHTML("afterend",'<div class="lvstrip card"><div class="lvs-l"><span class="lvs-badge">'+level()+'</span><div class="lvs-m">'+lvHTML()+'</div></div><div class="lvs-w">'+weekStrip()+'</div><div class="lvs-s"><small>XP · 14 days</small>'+spark(xs,150,40)+'</div></div>')};

/* ---------- line chart ---------- */
var LCID=0;
function lineChart(pts,o){o=o||{};var W=680,H=230,l=44,r=16,t=18,b=34,n=pts.length,vals=pts.map(function(p){return p.v}),mx=o.max!=null?o.max:Math.max.apply(null,vals.concat([1]))*1.15,mn=o.min||0,id="lg"+(++LCID);
  function X(i){return l+(W-l-r)*(n<2?0:i/(n-1))}function Y(v){return t+(H-t-b)*(1-(v-mn)/(mx-mn||1))}
  var s='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+(o.col||"var(--blue)")+'" stop-opacity=".35"/><stop offset="1" stop-color="'+(o.col||"var(--blue)")+'" stop-opacity="0"/></linearGradient></defs>';
  for(var g=0;g<=4;g++){var gv=mn+(mx-mn)*g/4,gy=Y(gv);s+='<path d="M'+l+' '+gy+' H'+(W-r)+'" class="lc-grid"/><text x="'+(l-8)+'" y="'+(gy+4)+'" class="lc-lab" text-anchor="end">'+(o.pct?Math.round(gv)+"%":Math.round(gv))+'</text>'}
  var step=Math.ceil(n/8);pts.forEach(function(p,i){if(i%step===0||i===n-1)s+='<text x="'+X(i)+'" y="'+(H-10)+'" class="lc-lab" text-anchor="middle">'+p.l+'</text>'});
  var d=pts.map(function(p,i){return (i?"L":"M")+X(i).toFixed(1)+" "+Y(p.v).toFixed(1)}).join(" ");
  s+='<path d="'+d+' L'+X(n-1).toFixed(1)+' '+(H-b)+' L'+X(0).toFixed(1)+' '+(H-b)+' Z" fill="url(#'+id+')" class="ffade"/>';
  s+='<path d="'+d+'" pathLength="1" class="fdraw lc-line" style="stroke:'+(o.col||"var(--blue)")+'"/>';
  pts.forEach(function(p,i){if(p.v>0||o.dots)s+='<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(p.v).toFixed(1)+'" r="3.5" class="lc-dot" style="fill:'+(o.col||"var(--blue)")+'"><title>'+p.l+': '+p.v+(o.pct?"%":"")+'</title></circle>'});
  return '<svg class="lchart" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+s+'</svg>'}
function series(kind,days){var out=[];for(var i=days-1;i>=0;i--){var k=dayStr(-i),L_=S.log[k]||{},lab=k.slice(5).replace("-","/"),v=0;
  if(kind==="xp")v=L_.xp||0;else if(kind==="q")v=Math.max(L_.q||0,S.days[k]||0);else if(kind==="acc")v=L_.q?Math.round(100*(L_.c||0)/L_.q):0;else if(kind==="s"){v=L_.s||0}
  out.push({l:lab,v:v})}
  if(kind==="s"){var last=0;out.forEach(function(p){if(p.v)last=p.v;else p.v=last});if(!last)out.forEach(function(p){p.v=200})}
  return out}
var CHART={k:"xp",d:30};
function chartHTML(){var k=CHART.k,o={xp:{col:"var(--yel)"},q:{col:"var(--blue)"},acc:{col:"var(--grn)",pct:1,max:100},s:{col:"var(--violet)",min:200,max:800}}[k];
  var data=series(k,CHART.d),tot=data.reduce(function(m,p){return m+p.v},0);
  var sum=k==="xp"?tot+" XP in "+CHART.d+" days":k==="q"?tot+" questions in "+CHART.d+" days":k==="acc"?"Daily accuracy (days you practiced)":"Estimated score over time";
  return '<div class="ch-sum">'+sum+'</div>'+lineChart(data,o)}
function chartSet(k,d){if(k)CHART.k=k;if(d)CHART.d=d;var c=el("chartBox");if(c)c.innerHTML=chartHTML();document.querySelectorAll(".chtabs button[data-k]").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-k")===CHART.k)});document.querySelectorAll(".chtabs button[data-d]").forEach(function(b){b.classList.toggle("on",+b.getAttribute("data-d")===CHART.d)})}
function heatmap(){var h="",start=new Date();start.setDate(start.getDate()-104-start.getDay());var mx=1;for(var k in S.days)mx=Math.max(mx,S.days[k]);
  for(var w=0;w<15;w++){h+='<div class="hm-col">';for(var d=0;d<7;d++){var dt=new Date(start.getTime()+(w*7+d)*864e5),ks=dt.toISOString().slice(0,10),v=Math.max(S.days[ks]||0,(S.log[ks]||{}).q||0),lvl=v===0?0:v<mx*.25?1:v<mx*.5?2:v<mx*.75?3:4;
    h+='<i class="h'+lvl+(ks===dayStr()?" t":"")+'" title="'+ks+': '+v+' questions"></i>'}h+='</div>'}
  return '<div class="heat">'+h+'</div><div class="hm-leg"><span>less</span><i class="h0"></i><i class="h1"></i><i class="h2"></i><i class="h3"></i><i class="h4"></i><span>more</span></div>'}
var _vpG=viewProgress;
viewProgress=function(a){var tmp=document.createElement("div");_vpG(tmp);var o=overall(),acct=S.answered?Math.round(100*S.correctN/S.answered):0,totalCrowns=0;UNITS.forEach(function(u){totalCrowns+=crowns(u)});
  a.innerHTML='<section class="prog"><div class="pg-h"><div><h1>Progress</h1><p>Every question, lesson and minute you study is tracked here. Watch the lines go up.</p></div><button class="btn sm" onclick="onboard(true)">'+ic("user")+'Edit details</button></div>'+
   '<div class="pstats"><div class="card ps lvc"><span class="lvs-badge big">'+level()+'</span><div style="flex:1">'+lvHTML()+'</div></div>'+
   '<div class="card ps"><span class="stc-ic fl">'+ic("flame")+'</span><div><b>'+S.streak.c+' days</b><small>streak · best '+(S.bestStreak||S.streak.c)+'</small></div></div>'+
   '<div class="card ps"><span class="stc-ic cal">'+ic("target")+'</span><div><b>'+acct+'%</b><small>accuracy on '+S.answered+' questions</small></div></div>'+
   '<div class="card ps"><span class="stc-ic cr">'+ic("crownf")+'</span><div><b>'+totalCrowns+' / '+UNITS.length*5+'</b><small>mastery crowns</small></div></div></div>'+
   '<div class="card chartc"><div class="chtabs"><div class="seg">'+[["xp","XP"],["q","Questions"],["acc","Accuracy"],["s","Est. score"]].map(function(x){return '<button data-k="'+x[0]+'" onclick="chartSet(\''+x[0]+'\')">'+x[1]+'</button>'}).join("")+'</div><div class="seg">'+[[7,"7d"],[30,"30d"],[90,"90d"]].map(function(x){return '<button data-d="'+x[0]+'" onclick="chartSet(null,'+x[0]+')">'+x[1]+'</button>'}).join("")+'</div></div><div id="chartBox"></div></div>'+
   '<div class="pgrid2"><div class="card pad"><h3 class="h3">Study calendar · 15 weeks</h3>'+heatmap()+'</div><div class="card pad"><h3 class="h3">Score estimate</h3><div class="big-score">'+o.score+'</div><div class="pbar"><i style="width:'+Math.round(o.mastery*100)+'%"></i></div><p class="muted" style="font-size:13px">Lessons '+o.lessonsDone+'/'+o.lessonsTotal+' · units mastered '+o.quizzesDone+'/'+UNITS.length+'</p></div></div>'+
   '<h2 class="sec">Mastery crowns</h2><div class="crgrid">'+UNITS.map(function(u){var n=crowns(u);return '<a class="crc card" href="#/unit/'+u.id+'">'+uic(u)+'<div><b>'+esc(u.title.replace(/ \(.*\)$/,""))+'</b><div class="crs">'+[1,2,3,4,5].map(function(i){return '<span class="'+(i<=n?"on":"")+'">'+ic("crownf")+'</span>'}).join("")+'</div></div></a>'}).join("")+'</div>'+
   '<div class="oldprog">'+tmp.innerHTML+'</div></section>';
  var op=a.querySelector(".oldprog .sec-h");if(op)op.remove();var os=a.querySelector(".oldprog > .stat");if(os)os.remove();
  chartSet();paintBars();
};

/* ---------- settings: sound toggle ---------- */
var _soG=settingsOpen;settingsOpen=function(){_soG();var set=document.querySelector(".modal .set");if(set)set.insertAdjacentHTML("afterbegin",'<div class="setrow"><div><b>Sound effects</b><small>Chimes for right answers, pages, levels</small></div><button class="sw'+(S.sfx?" on":"")+'" id="swSfx"><i></i></button></div>');
  var b=el("swSfx");if(b)b.onclick=function(){S.sfx=!S.sfx;saveS();this.classList.toggle("on",S.sfx);if(S.sfx)sfx("ok")}};

/* ---------- styles ---------- */
(function(){var c=`
.fgrowx{transform-box:fill-box;transform-origin:left;animation:growx 1s cubic-bezier(.2,.8,.2,1) both}@keyframes growx{from{transform:scaleX(0)}}
.xpPop{position:fixed;left:50%;bottom:110px;z-index:140;transform:translateX(-50%);display:flex;align-items:center;gap:6px;padding:9px 16px;border-radius:999px;font-weight:800;color:#3a2a00;background:linear-gradient(135deg,#ffd76a,#f5b02e);box-shadow:0 10px 30px rgba(245,176,46,.45);animation:xpup 1.3s cubic-bezier(.2,.8,.2,1) forwards;pointer-events:none}
.xpPop .ic{width:18px;height:18px}@keyframes xpup{0%{opacity:0;transform:translate(-50%,20px) scale(.8)}15%{opacity:1;transform:translate(-50%,0) scale(1.08)}70%{opacity:1;transform:translate(-50%,-30px) scale(1)}100%{opacity:0;transform:translate(-50%,-60px)}}
.streakPop{position:fixed;left:50%;top:22%;z-index:150;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;padding:26px 34px;border-radius:26px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--line);box-shadow:0 30px 80px rgba(0,0,0,.35);animation:fpop .5s cubic-bezier(.3,1.5,.5,1) both;text-align:center}
.streakPop.out{animation:ffadeout .5s ease forwards}@keyframes ffadeout{to{opacity:0;transform:translate(-50%,-20px)}}
.sp-ic{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 50% 60%,#ffb347,#ff6a3d);box-shadow:0 0 50px rgba(255,120,60,.6);animation:flick 1.4s ease-in-out infinite}.sp-ic .ic{width:46px;height:46px}
.streakPop b{font-family:var(--disp);font-size:26px;margin-top:8px}.streakPop small{color:var(--ink2)}
.stars{display:inline-flex;gap:2px;margin-left:8px;vertical-align:middle}.stars .st .ic{width:14px;height:14px;color:var(--line);fill:var(--line)}.stars .st.on .ic{color:var(--yel);fill:var(--yel)}
.stars.big{display:flex;justify-content:center;gap:10px;margin:0 0 6px}.stars.big .st{animation:fpop .55s cubic-bezier(.3,1.6,.5,1) both}.stars.big .st .ic{width:46px;height:46px}
.crown{display:inline-flex;align-items:center;gap:3px;margin-top:5px;padding:2px 8px;border-radius:999px;font-size:11.5px;font-weight:800;background:var(--soft);color:var(--ink2)}.crown .ic{width:13px;height:13px}
.crown.c5,.crown.c4{color:#3a2a00;background:linear-gradient(135deg,#ffd76a,#f5b02e)}.crown.c3,.crown.c2,.crown.c1{color:var(--yel);background:color-mix(in srgb,var(--yel) 14%,transparent)}
.crowncard .cr-row{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--ink2);padding:3px 0}.cr-row .ic{width:16px;height:16px}.cr-row.on{color:var(--ink)}.cr-row.on .ic{color:var(--grn)}
.lvbar{padding:10px 12px;margin-bottom:8px;border-radius:14px;background:var(--soft);border:1px solid var(--line)}
.lv-h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}.lv-h small{color:var(--ink2);font-size:12px}
.lvstrip{display:grid;grid-template-columns:1.2fr 1.4fr auto;gap:18px;align-items:center;padding:14px 18px;margin-bottom:12px}
.lvs-l{display:flex;align-items:center;gap:12px}.lvs-m{flex:1}
.lvs-badge{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;font-family:var(--disp);font-weight:900;font-size:20px;color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet));box-shadow:0 6px 18px color-mix(in srgb,var(--blue) 40%,transparent)}
.lvs-badge.big{width:60px;height:60px;font-size:26px;border-radius:18px}
.lvs-w{display:flex;gap:8px;justify-content:center}
.wd{display:flex;flex-direction:column;align-items:center;gap:3px}.wd span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft);border:1.5px dashed var(--line)}
.wd.on span{border:0;color:#fff;background:linear-gradient(135deg,#ffb347,#ff6a3d)}.wd span .ic{width:16px;height:16px}.wd small{font-size:11px;color:var(--ink2);font-weight:700}.wd.today span{outline:2px solid var(--blue);outline-offset:2px}
.lvs-s small{display:block;color:var(--ink2);font-size:11px;font-weight:700;margin-bottom:2px}
.spark path{fill:none;stroke:var(--yel);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
@media(max-width:900px){.lvstrip{grid-template-columns:1fr}.lvs-s{display:none}}
.pstats{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:12px}.ps{display:flex;align-items:center;gap:12px;padding:14px}.ps b{display:block;font-size:18px}.ps small{color:var(--ink2);font-size:12.5px}
.stc-ic.cr{color:var(--yel);background:color-mix(in srgb,var(--yel) 15%,transparent)}
@media(max-width:900px){.pstats{grid-template-columns:1fr 1fr}.lvc{grid-column:1/-1}}
.chartc{margin-top:14px;padding:16px 18px}.chtabs{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px}
.ch-sum{font-weight:700;color:var(--ink2);font-size:13.5px;margin:4px 0}
.lchart{width:100%;height:auto;display:block}.lc-grid{stroke:var(--line);stroke-width:1}.lc-lab{fill:var(--ink2);font:600 11px var(--ui)}
.lc-line{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.lc-dot{stroke:var(--paper);stroke-width:2}
.pgrid2{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;margin-top:14px}@media(max-width:900px){.pgrid2{grid-template-columns:1fr}}
.heat{display:flex;gap:4px;overflow-x:auto;padding-bottom:4px}.hm-col{display:flex;flex-direction:column;gap:4px}
.heat i,.hm-leg i{width:14px;height:14px;border-radius:4px;display:block;background:var(--soft);border:1px solid var(--line)}
.h1{background:color-mix(in srgb,var(--grn) 30%,var(--soft))!important}.h2{background:color-mix(in srgb,var(--grn) 55%,var(--soft))!important}.h3{background:color-mix(in srgb,var(--grn) 78%,var(--soft))!important}.h4{background:var(--grn)!important}
.heat i.t{outline:2px solid var(--blue);outline-offset:1px}
.hm-leg{display:flex;align-items:center;gap:4px;margin-top:10px;font-size:11.5px;color:var(--ink2)}
.big-score{font-family:var(--disp);font-size:54px;font-weight:900;line-height:1;margin:6px 0 12px;background:linear-gradient(135deg,var(--blue),var(--violet));-webkit-background-clip:text;background-clip:text;color:transparent}
.crgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.crc{display:flex;align-items:center;gap:12px;padding:12px 14px;color:var(--ink)}.crc b{font-size:14px}
.crs{display:flex;gap:2px;margin-top:4px}.crs .ic{width:16px;height:16px;color:var(--line)}.crs .on .ic{color:var(--yel)}
.oldprog{margin-top:10px}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
paintMini();bootRoute();
