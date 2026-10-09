/* =====================================================================
   ZERO TO 800 — APP UI (4) · Question Bank · calculator · reference
   ===================================================================== */
var QB=null,QBI={};if(!S.qb)S.qb={};
function hashStr(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

/* ---------- turn type-in questions into 4-choice MC with mistake-based distractors ---------- */
function _g(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t}return a||1}
function _fmt(n,d){if(d<0){n=-n;d=-d}var g=_g(n,d);n/=g;d/=g;return (d===1?String(n):n+"/"+d).replace(/^-/,"−")}
function _dec(v){var r=Math.round(v*1e4)/1e4;return String(r).replace(/^-/,"−")}
function mcFromNum(q,seed){
  var a=String(Array.isArray(q.a)?q.a[0]:q.a).trim(),cand=[],isFr=/^-?\d+\/\d+$/.test(a),v=numOf(a);if(isNaN(v))return q;
  var pct=/%|percent/i.test(q.q),R="";
  function add(val,why){if(val===R||cand.some(function(c){return c[0]===val}))return;cand.push([val,why])}
  if(isFr){var p=a.split("/"),n=+p[0],d=+p[1];R=_fmt(n,d);
    add(_fmt(-n,d),"It has the right size but the wrong sign — a negative sign was lost in one of the steps.");
    if(n!==0)add(_fmt(d,n),"It is the reciprocal of the correct value — the fraction was set up upside down.");
    add(_fmt(n+d,d),"It is 1 more than the correct value — a small slip in the final step.");
    add(_fmt(2*n,d),"It is twice the correct value — something was doubled that shouldn't have been.");
    add(_fmt(n,2*d),"It is half the correct value — a step divided by 2 unnecessarily.");}
  else{var isInt=Number.isInteger(v);R=isInt?String(v).replace(/^-/,"−"):_dec(v);
    if(v!==0)add(isInt?String(-v).replace(/^-/,"−"):_dec(-v),"It has the right size but the wrong sign — a negative sign was dropped, or subtraction was done in the wrong order.");
    if(pct&&v>0&&v<100)add(_dec(100-v),"It gives the part that remains instead of the percent that changed (or the reverse).");
    add(isInt?String(2*v).replace(/^-/,"−"):_dec(2*v),"It is twice the correct value — something was doubled that should not have been.");
    if(v!==0&&Math.abs(v)!==1&&isInt&&Math.abs(v)<=20)add(_fmt(1,v),"It is the reciprocal of the correct value — the division was done the wrong way round.");
    add(isInt?(v%2===0?String(v/2):_dec(v/2)).replace(/^-/,"−"):_dec(v/2),"It is half the correct value — a step divided by 2 unnecessarily.");
    [1,-1,2,-2,10].forEach(function(k){add(isInt?String(v+k).replace(/^-/,"−"):_dec(v+k),"It is close to the correct value but comes from an arithmetic slip in the last step — redo the final calculation carefully.")});}
  var rng=seed>>>0;function rnd(){rng=(rng*1664525+1013904223)>>>0;return rng/4294967296}
  var pickc=cand.filter(function(c){return c[0]!==R}).slice(0,6).sort(function(){return rnd()-.5}).slice(0,3);if(pickc.length<3)return q;
  var opts=[[R,null]].concat(pickc);for(var i=opts.length-1;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=opts[i];opts[i]=opts[j];opts[j]=t}
  q.t="mc";q.c=opts.map(function(o){return o[0]});q.why=opts.map(function(o){return o[1]});q.a=q.c.indexOf(R);return q;
}
function qbBuild(){if(QB)return QB;QB=[];var seen={};
  function add(it,u,D,sk,d,src){var q=Object.assign({},it);q.uid=u.id;q.dom=D.id;q.skill=sk;q.d=d;q.src=src;q.id=("0000000"+hashStr((it._q0||it.q)+"#"+u.id).toString(16)).slice(-8);if(QBI[q.id])return;if(q.t==="num"&&hashStr(q.id)%100<(src==="gen"?86:55))mcFromNum(q,hashStr(q.id+"mc"));QB.push(q);QBI[q.id]=q}
  UNITS.forEach(function(u){if(u.id==="words")return;var D=domainOf(u.id);
    GEN.skills(u.id).forEach(function(sk,si){for(var n=0;n<12;n++){GEN.seed(hashStr(u.id+"|"+sk+"|"+n));var it=GEN.make(u.id,[1,1,1,1,2,2,2,2,3,3,3,3][n],si);if(!it||seen[it.q])continue;seen[it.q]=1;add(it,u,D,sk,it.d,"gen")}});
    u.prac.forEach(function(it,i){if(seen[it.q])return;seen[it.q]=1;var t=tipFor(it);add(it,u,D,t?t.name:"Mixed skills",i<4?1:2,"hand")});
    u.quiz.forEach(function(it,i){if(seen[it.q])return;seen[it.q]=1;var t=tipFor(it);add(it,u,D,t?t.name:"Mixed skills",i<3?2:3,"hand")})});
  GEN.unseed();return QB}
function QB_TOTAL(){return qbBuild().length}
function QB_COUNT_UNIT(id){return qbBuild().filter(function(q){return q.uid===id}).length}
var QBF={units:{},skills:{},diff:{1:1,2:1,3:1},status:"all",type:"all",q:"",page:0,open:{}};
function qbForUnit(id){QBF.units={};QBF.units[id]=1;QBF.skills={};QBF.page=0;go("/qb")}
function qbFiltered(){var q=QBF.q.toLowerCase(),un=Object.keys(QBF.units).length,sk=Object.keys(QBF.skills).length;
  return qbBuild().filter(function(x){var s=S.qb[x.id]||{};
    if(un&&!QBF.units[x.uid])return false;if(sk&&!QBF.skills[x.uid+"|"+x.skill])return false;if(!QBF.diff[x.d])return false;
    if(QBF.type==="mc"&&x.t!=="mc")return false;if(QBF.type==="spr"&&x.t!=="num")return false;
    if(QBF.status==="un"&&s.st)return false;if(QBF.status==="c"&&s.st!=="c")return false;if(QBF.status==="i"&&s.st!=="i")return false;if(QBF.status==="bm"&&!s.bm)return false;if(QBF.status==="mr"&&!s.mr)return false;
    if(q&&(x.q+" "+x.skill+" "+x.id).toLowerCase().indexOf(q)<0)return false;return true})}
function diffBars(d){return '<span class="dbars d'+d+'" title="'+["","Easy","Medium","Hard"][d]+'"><i></i><i></i><i></i></span>'}
function viewQB(a){
  qbBuild();var list=qbFiltered(),per=25,pages=Math.max(1,Math.ceil(list.length/per));QBF.page=Math.min(QBF.page,pages-1);
  var done=QB.filter(function(x){return S.qb[x.id]&&S.qb[x.id].st}).length,cor=QB.filter(function(x){return S.qb[x.id]&&S.qb[x.id].st==="c"}).length;
  var filt='<div class="qbf-sec"><div class="qbf-h">Domains & skills</div>'+DOMAINS.map(function(D){var dn=D.units.filter(function(id){return id!=="words"});
    return '<div class="qbd"><div class="qbd-h" onclick="QBF.open[\''+D.id+'\']=!QBF.open[\''+D.id+'\'];viewQB(el(\'app\'))">'+ic(QBF.open[D.id]?"chevD":"chevR")+'<b>'+esc(D.name)+'</b><small>'+QB.filter(function(x){return x.dom===D.id}).length+'</small></div>'+
     (QBF.open[D.id]?dn.map(function(id){var u=findUnit(id),sks={};QB.forEach(function(x){if(x.uid===id)sks[x.skill]=(sks[x.skill]||0)+1});
       return '<label class="qbu"><input type="checkbox" '+(QBF.units[id]?"checked":"")+' onchange="qbTogU(\''+id+'\')"><span>'+esc(u.title)+'</span></label>'+(QBF.units[id]?'<div class="qbsk">'+Object.keys(sks).map(function(s){var k=id+"|"+s;return '<label><input type="checkbox" '+(QBF.skills[k]?"checked":"")+' onchange="qbTogS(\''+esc(k).replace(/'/g,"\\'")+'\')"><span>'+esc(s)+'</span><small>'+sks[s]+'</small></label>'}).join("")+'</div>':'')}).join(""):'')+'</div>'}).join("")+'</div>'+
   '<div class="qbf-sec"><div class="qbf-h">Difficulty</div><div class="qbchips">'+[1,2,3].map(function(d){return '<button class="tog'+(QBF.diff[d]?" on":"")+'" onclick="QBF.diff['+d+']=QBF.diff['+d+']?0:1;QBF.page=0;viewQB(el(\'app\'))">'+diffBars(d)+["","Easy","Medium","Hard"][d]+'</button>'}).join("")+'</div></div>'+
   '<div class="qbf-sec"><div class="qbf-h">Status</div><div class="qbchips">'+[["all","All"],["un","Unanswered"],["i","Incorrect"],["c","Correct"],["bm","Bookmarked"],["mr","Marked for review"]].map(function(s){return '<button class="tog'+(QBF.status===s[0]?" on":"")+'" onclick="QBF.status=\''+s[0]+'\';QBF.page=0;viewQB(el(\'app\'))">'+s[1]+'</button>'}).join("")+'</div></div>'+
   '<div class="qbf-sec"><div class="qbf-h">Question type</div><div class="qbchips">'+[["all","All"],["mc","Multiple choice"],["spr","Student-produced response"]].map(function(s){return '<button class="tog'+(QBF.type===s[0]?" on":"")+'" onclick="QBF.type=\''+s[0]+'\';QBF.page=0;viewQB(el(\'app\'))">'+s[1]+'</button>'}).join("")+'</div></div>'+
   '<button class="btn sm ghost block" onclick="QBF.units={};QBF.skills={};QBF.diff={1:1,2:1,3:1};QBF.status=\'all\';QBF.type=\'all\';QBF.q=\'\';viewQB(el(\'app\'))">'+ic("refresh")+'Reset filters</button>';
  var rows=list.slice(QBF.page*per,QBF.page*per+per).map(function(x,i){var s=S.qb[x.id]||{},u=findUnit(x.uid);
    return '<a class="qrow" href="#/qb/q/'+x.id+'"><span class="qn">'+(QBF.page*per+i+1)+'</span><span class="qid">'+x.id+'</span>'+diffBars(x.d)+'<span class="qsk"><b>'+esc(x.skill)+'</b><small>'+esc(u.title)+' · '+(x.t==="mc"?"MC":"SPR")+'</small></span><span class="qst '+(s.st||"")+'">'+(s.st==="c"?ic("check"):s.st==="i"?ic("x"):'')+'</span><span class="qbm">'+(s.bm?ic("bookmark","on"):"")+(s.mr?ic("flag","on"):"")+'</span></a>'}).join("");
  a.innerHTML='<section class="qbv"><div class="pg-h"><div><h1>Question Bank</h1><p>'+QB.length+' SAT Math questions, each with a full answer rationale. '+done+' answered · '+(done?Math.round(100*cor/done):0)+'% correct.</p></div><div class="srch">'+ic("search")+'<input id="qbs" placeholder="Search by ID, skill or text" value="'+esc(QBF.q)+'"></div></div>'+
   '<div class="qb"><aside class="qbf" id="qbf"><button class="btn sm qbf-tg" onclick="el(\'qbf\').classList.toggle(\'open\')">'+ic("filter")+'Filters</button><div class="qbf-in">'+filt+'</div></aside>'+
   '<div class="qbl"><div class="qbl-h"><b>'+list.length+' question'+(list.length===1?"":"s")+'</b><div class="row"><button class="btn sm" onclick="qbStartList(true)">'+ic("dice")+'Random</button><button class="btn sm pri" onclick="qbStartList(false)" '+(list.length?"":"disabled")+'>'+ic("play")+'Practice in order</button></div></div>'+
   '<div class="qtable"><div class="qrow qhead"><span class="qn">#</span><span class="qid">ID</span><span>Difficulty</span><span class="qsk">Skill</span><span>Status</span><span></span></div>'+(rows||'<div class="empty">No questions match these filters.</div>')+'</div>'+
   (pages>1?'<div class="pager"><button class="btn sm" '+(QBF.page?"":"disabled")+' onclick="QBF.page--;viewQB(el(\'app\'))">'+ic("chevL")+'</button><span>Page '+(QBF.page+1)+' of '+pages+'</span><button class="btn sm" '+(QBF.page<pages-1?"":"disabled")+' onclick="QBF.page++;viewQB(el(\'app\'))">'+ic("chevR")+'</button></div>':'')+'</div></div></section>';
  var s=el("qbs");s.oninput=function(){QBF.q=this.value;QBF.page=0;clearTimeout(s._t);s._t=setTimeout(function(){viewQB(el("app"));var n=el("qbs");n.focus();n.setSelectionRange(n.value.length,n.value.length)},300)};
}
function qbTogU(id){if(QBF.units[id])delete QBF.units[id];else QBF.units[id]=1;Object.keys(QBF.skills).forEach(function(k){if(!QBF.units[k.split("|")[0]])delete QBF.skills[k]});QBF.page=0;viewQB(el("app"))}
function qbTogS(k){if(QBF.skills[k])delete QBF.skills[k];else QBF.skills[k]=1;QBF.page=0;viewQB(el("app"))}
function qbStartList(rand){var l=qbFiltered();if(!l.length)return;var x=rand?pickA(l):(l.filter(function(q){return !(S.qb[q.id]||{}).st})[0]||l[0]);go("/qb/q/"+x.id)}

/* ---------- rationale for every choice ---------- */
function numOf(s){var m=String(s).replace(/−/g,"-").match(/-?\d+(\.\d+)?(\/\d+)?/);if(!m)return NaN;var v=m[0];if(v.indexOf("/")>-1){var p=v.split("/");return +p[0]/+p[1]}return +v}
function wrongWhy(it,c,r,i){
  if(it.why&&it.why[i])return it.why[i];
  var nc=numOf(c),nr=numOf(r),t=tipFor(it);
  var ic_=/[<>≤≥]/.test(c)&&/[<>≤≥]/.test(r);
  if(ic_&&nc===nr)return "It has the inequality pointing the wrong way. When you multiply or divide both sides by a negative number, the sign must flip.";
  if(ic_)return "The boundary number is wrong. Re-check the step where the constant is moved across the inequality.";
  if(/i\b/.test(c)&&/i\b/.test(r))return "This comes from a slip in the FOIL step or from not replacing i² with −1 correctly.";
  if(!isNaN(nc)&&!isNaN(nr)){
    if(nr!==0&&nc===-nr)return "It has the correct size but the wrong sign — a negative sign was probably lost along the way.";
    if(nr!==0&&Math.abs(nc*nr-1)<1e-9)return "It is the reciprocal of the correct value — the fraction was likely set up upside down.";
    if(nr!==0&&(Math.abs(nc-2*nr)<1e-9||Math.abs(2*nc-nr)<1e-9))return "It is off by a factor of 2 — check where something should (or shouldn't) have been doubled or halved.";
    if(/√/.test(c)!==/√/.test(r)||/π/.test(c)!==/π/.test(r))return "It uses the wrong form of the answer — check which multiplier (√2, √3, π) the rule requires.";}
  if(t)return "This may result from a common error: "+t.x;
  return "It doesn't satisfy the conditions of the question — substitute it back into the problem and you'll get a false statement.";
}
function rationaleHTML(it,picked,ok){
  var right=it.t==="mc"?it.c[it.a]:String(it.a),L="ABCD";
  var h='<div class="rat '+(ok?"ok":"no")+'"><div class="rat-h">'+ic(ok?"check":"x")+'<b>'+(ok?"Correct":"Incorrect")+'</b><span>'+(ok?pickA(["Well reasoned.","Exactly right.","That's the one."]):"Correct answer: "+(it.t==="mc"?L.charAt(it.a)+") ":"")+esc(right))+'</span></div><div class="rat-b"><h4>Rationale</h4>';
  if(it.t==="mc"){h+=it.c.map(function(c,i){var isR=i===it.a;return '<div class="rch '+(isR?"r":"w")+(i===picked?" p":"")+'"><b>Choice '+L.charAt(i)+' is '+(isR?"correct":"incorrect")+'.</b> '+(isR?esc(it.s):esc(wrongWhy(it,c,right,i)))+'</div>'}).join("")}
  else h+='<div class="rch r"><b>The correct answer is '+esc(right)+'.</b> '+esc(it.s)+' <span class="muted">Equivalent forms (a fraction or its decimal) are accepted.</span></div>';
  return h+'<h4>How to solve questions like this</h4>'+deepHTML(it)+'</div></div>';
}

/* ---------- question viewer ---------- */
var QV=null;
function viewQBQ(a,id){
  var it=QBI[id]||(qbBuild(),QBI[id]);if(!it)return go("/qb");
  var list=qbFiltered().map(function(x){return x.id});if(list.indexOf(id)<0)list=qbBuild().map(function(x){return x.id});
  var k=list.indexOf(id),s=S.qb[id]||{},u=findUnit(it.uid),D=domainOf(it.uid);
  QV={id:id,it:it,sel:null,done:false,strike:{},list:list,k:k};
  a.innerHTML='<section class="qv"><div class="qv-top"><button class="btn sm ghost" onclick="go(\'/qb\')">'+ic("grid")+'<span>All questions</span></button><div class="qv-pos">Question <b>'+(k+1)+'</b> of '+list.length+'</div><div class="qv-tools">'+
    '<button class="tb-btn" title="Calculator" onclick="calcOpen()">'+ic("calc")+'</button><button class="tb-btn" title="Reference sheet" onclick="refOpen()">'+ic("sigma")+'</button><button class="tb-btn'+(QV.sOn?" on":"")+'" id="qvStr" title="Answer eliminator" onclick="QV.sOn=!QV.sOn;this.classList.toggle(\'on\');el(\'qvCh\')&&el(\'qvCh\').classList.toggle(\'elim\')">'+ic("strike")+'</button>'+
    '<button class="tb-btn'+(s.bm?" on":"")+'" id="qvBm" title="Bookmark" onclick="qbMark(\'bm\')">'+ic("bookmark")+'</button><button class="tb-btn'+(s.mr?" on":"")+'" id="qvMr" title="Mark for review" onclick="qbMark(\'mr\')">'+ic("flag")+'</button></div></div>'+
   '<div class="qv-card card"><div class="qv-meta"><span class="qid">ID '+id+'</span>'+diffBars(it.d)+'<span class="chip">'+ic(DICON[D.id])+esc(D.name)+'</span><span class="chip">'+esc(it.skill)+'</span>'+(s.st?'<span class="chip st-'+s.st+'">'+(s.st==="c"?"Answered correctly":"Answered incorrectly")+'</span>':'')+'</div>'+
   '<div class="q-q">'+esc(it.q)+'</div>'+
   (it.t==="mc"?'<div class="qv-ch" id="qvCh">'+it.c.map(function(c,i){return '<div class="chrow" data-i="'+i+'"><button class="opt" onclick="qvPick('+i+')"><span class="k">'+"ABCD".charAt(i)+'</span><span>'+esc(c)+'</span></button><button class="chx" title="Cross out" onclick="qvStrike('+i+')">'+ic("strike")+'</button></div>'}).join("")+'</div>':
    '<div class="numin qv-num"><input id="qvIn" placeholder="Type your answer" autocomplete="off" onkeydown="if(event.key===\'Enter\')qvCheck()"></div><p class="muted" style="font-size:13px">Enter a number, fraction (3/4) or decimal. No mixed numbers or units.</p>')+
   '<div class="qv-act"><button class="btn pri" id="qvChk" onclick="qvCheck()">Check answer</button><button class="btn ghost" onclick="qvReveal()">'+ic("eye")+'Show answer</button></div><div id="qvRes"></div></div>'+
   '<div class="qv-nav"><button class="btn" '+(k>0?"":"disabled")+' onclick="go(\'/qb/q/'+list[k-1]+'\')">'+ic("chevL")+'Previous</button><button class="btn pri" '+(k<list.length-1?"":"disabled")+' onclick="go(\'/qb/q/'+list[k+1]+'\')">Next'+ic("chevR")+'</button></div></section>';
  if(QV.sOn)el("qvCh").classList.add("elim");
}
function qvPick(i){if(!QV||QV.done)return;if(QV.strike[i])qvStrike(i);QV.sel=i;document.querySelectorAll("#qvCh .opt").forEach(function(o,j){o.classList.toggle("sel",j===i)})}
function qvStrike(i){if(!QV||QV.done)return;QV.strike[i]=!QV.strike[i];var r=document.querySelector('#qvCh .chrow[data-i="'+i+'"]');r.classList.toggle("struck",QV.strike[i]);if(QV.strike[i]&&QV.sel===i){QV.sel=null;r.querySelector(".opt").classList.remove("sel")}}
function qbMark(k){var s=S.qb[QV.id]||(S.qb[QV.id]={});s[k]=s[k]?0:1;saveS();el(k==="bm"?"qvBm":"qvMr").classList.toggle("on",!!s[k]);toast(k==="bm"?(s.bm?"Bookmarked":"Bookmark removed"):(s.mr?"Marked for review":"Unmarked"))}
function qvCheck(){if(!QV||QV.done)return;var it=QV.it,ok,picked=QV.sel;
  if(it.t==="mc"){if(picked==null){toast("Choose an answer first");return}ok=picked===it.a}
  else{var v=el("qvIn").value;if(!v.trim()){toast("Type an answer first");return}ok=checkNum(it.a,v);el("qvIn").disabled=true;el("qvIn").classList.add(ok?"good":"bad")}
  QV.done=true;var s=S.qb[QV.id]||(S.qb[QV.id]={});s.a=(s.a||0)+1;if(!s.st||s.st!=="c")s.st=ok?"c":"i";s.last=dayStr();
  tickStreak();record(it.uid,ok);skUpdate(it,ok);addXp(ok?5:1);if(!ok){var u=findUnit(it.uid);if(u)logMistake2(u,it,String(it.t==="mc"?it.c[it.a]:it.a))}saveS();
  qvShow(picked,ok);
}
function qvReveal(){if(!QV)return;if(!QV.done){QV.done=true;var s=S.qb[QV.id]||(S.qb[QV.id]={});if(!s.st)s.st="i";saveS()}qvShow(QV.sel,null)}
function qvShow(picked,ok){var it=QV.it;
  if(it.t==="mc")document.querySelectorAll("#qvCh .chrow").forEach(function(r,j){var o=r.querySelector(".opt");o.disabled=true;if(j===it.a)o.classList.add("correct");else if(j===picked)o.classList.add("wrong")});
  el("qvChk").style.display="none";
  var card=document.querySelector(".qv-card");if(card&&ok!=null){card.classList.remove("pop","shake");void card.offsetWidth;card.classList.add(ok?"pop":"shake")}
  el("qvRes").innerHTML=ok==null?rationaleHTML(it,picked,false).replace('<b>Incorrect</b>','<b>Answer</b>'):rationaleHTML(it,picked,ok);
  if(ok===false)el("qvRes").insertAdjacentHTML("beforeend",'<button class="btn sm" style="margin-top:12px" onclick="router()">'+ic("refresh")+'Try it again</button>');
}
document.addEventListener("keydown",function(e){if(!QV||!document.querySelector(".qv")||/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||""))return;
  var k="abcd".indexOf(e.key.toLowerCase());if(k>-1&&QV.it.t==="mc"&&k<QV.it.c.length){qvPick(k);return}
  if(e.key==="Enter"){if(!QV.done)qvCheck();else if(QV.k<QV.list.length-1)go("/qb/q/"+QV.list[QV.k+1])}
  if(e.key==="ArrowRight"&&QV.k<QV.list.length-1)go("/qb/q/"+QV.list[QV.k+1]);if(e.key==="ArrowLeft"&&QV.k>0)go("/qb/q/"+QV.list[QV.k-1])});

/* ---------- calculator ---------- */
function calcEval(src){var s=src.replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/π/g,"pi").replace(/√/g,"sqrt").replace(/\s+/g,""),i=0;
  function num(){var m=s.slice(i).match(/^\d*\.?\d+(e[+-]?\d+)?/i);if(!m)throw 0;i+=m[0].length;return parseFloat(m[0])}
  function prim(){var c=s[i];if(c==="("){i++;var v=expr();if(s[i]!==")")throw 0;i++;return v}
    var m=s.slice(i).match(/^[a-z]+/i);if(m){var n=m[0].toLowerCase();i+=n.length;if(n==="pi")return Math.PI;if(n==="e")return Math.E;
      if(s[i]!=="(")throw 0;i++;var a=expr();if(s[i]!==")")throw 0;i++;var d=Math.PI/180;
      var F={sqrt:Math.sqrt,abs:Math.abs,sin:function(x){return Math.sin(x*d)},cos:function(x){return Math.cos(x*d)},tan:function(x){return Math.tan(x*d)},log:Math.log10||function(x){return Math.log(x)/Math.LN10},ln:Math.log};if(!F[n])throw 0;return F[n](a)}
    return num()}
  function unary(){if(s[i]==="-"){i++;return -unary()}if(s[i]==="+"){i++;return unary()}return pw()}
  function pw(){var b=prim();if(s[i]==="^"){i++;return Math.pow(b,unary())}return b}
  function term(){var v=unary();for(;;){var c=s[i];if(c==="*"){i++;v*=unary()}else if(c==="/"){i++;v/=unary()}else if(c&&/[(a-z0-9.]/i.test(c)){v*=unary()}else return v}}
  function expr(){var v=term();for(;;){if(s[i]==="+"){i++;v+=term()}else if(s[i]==="-"){i++;v-=term()}else return v}}
  var r=expr();if(i<s.length)throw 0;return r}
function calcOpen(){if(el("calc")){el("calc").remove();return}
  var d=document.createElement("div");d.id="calc";d.className="calc";
  var keys=["7","8","9","÷","(","4","5","6","×",")","1","2","3","−","^","0",".","π","+","√(","C","⌫","sin(","cos(","="];
  d.innerHTML='<div class="calc-h">'+ic("calc")+'<b>Calculator</b><small>trig in degrees</small><button class="tb-btn" onclick="el(\'calc\').remove()">'+ic("x")+'</button></div><input id="calcIn" placeholder="e.g. 3(4+5)^2 or sqrt(50)" autocomplete="off"><div class="calc-out" id="calcOut">= 0</div><div class="calc-k">'+keys.map(function(k){return '<button class="'+(k==="="?"eq":/[÷×−+^()]/.test(k)?"op":"")+'">'+k+'</button>'}).join("")+'</div>';
  document.body.appendChild(d);var inp=el("calcIn");
  function upd(){try{var v=calcEval(inp.value||"0");el("calcOut").textContent="= "+(Math.abs(v)<1e-12?0:+v.toPrecision(10))}catch(e){el("calcOut").textContent=inp.value?"…":"= 0"}}
  inp.oninput=upd;inp.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();try{inp.value=String(+calcEval(inp.value).toPrecision(10))}catch(x){}upd()}e.stopPropagation()};
  d.querySelectorAll(".calc-k button").forEach(function(b){b.onclick=function(){var k=b.textContent;if(k==="C")inp.value="";else if(k==="⌫")inp.value=inp.value.slice(0,-1);else if(k==="="){try{inp.value=String(+calcEval(inp.value).toPrecision(10))}catch(x){}}else inp.value+=k;upd();inp.focus()}});
  inp.focus();
}
function refOpen(){modal('<h2>Reference sheet</h2><p class="muted">The same facts the SAT gives you at the start of the math section.</p><div class="ref">'+
  [["Circle","A = πr²   ·   C = 2πr"],["Rectangle","A = ℓw"],["Triangle","A = ½bh"],["Pythagorean theorem","c² = a² + b²"],["Special right triangles","45-45-90: x, x, x√2   ·   30-60-90: x, x√3, 2x"],["Rectangular prism","V = ℓwh"],["Cylinder","V = πr²h"],["Sphere","V = (4/3)πr³"],["Cone","V = (1/3)πr²h"],["Pyramid","V = (1/3)ℓwh"],["Circle facts","360° in a circle = 2π radians"],["Triangle facts","Angles add to 180°"]].map(function(r){return '<div class="refr"><b>'+r[0]+'</b><span>'+r[1]+'</span></div>'}).join("")+'</div><button class="btn pri" data-close>Close</button>',"refm")}

/* ---------- routes ---------- */
var _routerUI4=router;
router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);
  if(p[0]==="qb"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;window.scrollTo(0,0);
    return p[1]==="q"?viewQBQ(a,p[2]):viewQB(a)}
  return _routerUI4()};
(function(){var t=el("tbTools");if(t)t.insertAdjacentHTML("afterbegin",'<button class="tb-btn fo" title="Calculator" onclick="calcOpen()">'+ic("calc")+'</button><button class="tb-btn fo" title="Reference sheet" onclick="refOpen()">'+ic("sigma")+'</button>')})();
(window.requestIdleCallback||function(f){setTimeout(f,1200)})(function(){qbBuild()},{timeout:4000});
bootRoute();
