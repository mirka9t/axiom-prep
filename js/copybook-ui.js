/* =====================================================================
   AXIOM — Copybook in the app
   · puts each copybook note into its lesson (notes page + examples page)
   · makes every existing lesson clearer: typeset formulas, examples split
     into numbered steps, calmer colours, things appear with animation
   · My Copybook page, formula of the day, copybook flashcards
   ===================================================================== */
ICONS.notebook="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z M6 3v18 M3 7h3 M3 12h3 M3 17h3 M10 8h6 M10 12h6";

/* ---------- 1. copybook notes go into their lessons ---------- */
/* where do the notes go? first top-level <h3>, or first top-level quiz (.qc) that isn't the very first element */
function cbAt(h){var re=/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g,m,depth=0,kid=0,VOID=/^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  while((m=re.exec(h))){var close=m[1]==="/",tg=m[2].toLowerCase(),self=/\/\s*$/.test(m[3])||VOID.test(tg);
    if(close){depth=Math.max(0,depth-1);continue}
    if(depth===0){if(tg==="h3")return {i:m.index,qc:false};if(kid>0&&/class="[^"]*\bqc\b/.test(m[3]))return {i:m.index,qc:true};kid++}
    if(!self)depth++}
  return {i:-1,qc:false}}
(function cbInject(){CBOOK.forEach(function(o){var u=findUnit(o.uid),l=u&&u.lessons.filter(function(x){return x.id===o.lid})[0];if(!l||l.cbDone)return;l.cbDone=1;
  var html='<h3>Copybook notes</h3>'+cbHTML(o,1)+(o.ex&&o.ex.length?'<h3>Copybook: worked examples</h3>'+cbHTML(o,2):"");
  /* notes go before the first top-level <h3>, or before the first quiz, so nobody is tested before they have seen the clear rule.
     (a fast string scan: parsing 171 lessons into the DOM at start-up cost ~0.3 s) */
  if(window.__CBTEST)l.h0=l.h;var at=cbAt(l.h);if(at.qc)html+='<h3>The big idea</h3>';
  l.h=at.i<0?l.h+html:l.h.slice(0,at.i)+html+l.h.slice(at.i);l.mins+=o.ex&&o.ex.length?4:2;
  /* a flashcard for every note */
  if(o.f||o.h){var back=(o.f?[].concat(o.f).map(mxPlain).join("   ·   ")+"  —  ":"")+cbPlain([].concat(o.h||[])[0]||"");var c={f:"📒 "+cbPlain(o.t)+" — what's the rule?",b:back,k:o.uid+"#cb-"+o.lid,uid:o.uid};u.cards.push(c)}})})();
if(typeof LPC!=="undefined")LPC={};
if(typeof GLOSS_SKIP!=="undefined")GLOSS_SKIP+=",.cb-t,.cb-l,.cb-why,.cb-tag,.mx,.cb-n,.eg-num,.cbm,.cb-q,.cb-fx";
function mxPlain(s){s=String(s||"");var k=0,p;do{p=s;s=s.replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g,function(m,a,b){return (/[\s+−-]/.test(a.trim())?"("+a.trim()+")":a.trim())+"/"+(/[\s+−-]/.test(b.trim())?"("+b.trim()+")":b.trim())}).replace(/\\rr\{([^{}]*)\}/g,"∛($1)").replace(/\\r\{([^{}]*)\}/g,"√($1)").replace(/\\[c][1-6]\{([^{}]*)\}/g,"$1").replace(/\\[bt]\{([^{}]*)\}/g,"$1").replace(/\^\{2\}/g,"²").replace(/\^\{3\}/g,"³").replace(/\^\{([^{}]*)\}/g,"^($1)").replace(/_\{([^{}]*)\}/g,"$1");k++}while(p!==s&&k<8);return s.replace(/\\s/g," ").replace(/[{}\\]/g,"").replace(/\s+/g," ").trim()}
function cbPlain(s){return String(s||"").replace(/`([^`]+)`/g,function(m,a){return mxPlain(a)}).replace(/==|\*\*/g,"").replace(/<[^>]+>/g,"")}

/* ---------- 2. make existing lesson pages clearer ---------- */
function fbChip(c,inl){var m=c.trim();
  m=m.replace(/√\(((?:[^()]|\([^()]*\))*)\)/g,"\\r{$1}");
  m=m.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g,"\\f{$1}{$2}").replace(/\(([^()]+)\)\s*\/\s*([A-Za-z0-9.²³πθ]+)/g,"\\f{$1}{$2}").replace(/([A-Za-z0-9.²³πθ]+)\s*\/\s*\(([^()]+)\)/g,"\\f{$1}{$2}").replace(/(^|[^A-Za-z0-9.πθ])([A-Za-z0-9.²³πθ]{1,6})\/([A-Za-z0-9.²³πθ]{1,6})(?![A-Za-z0-9πθ])/g,"$1\\f{$2}{$3}");
  return MX(m,inl)}
function fbPretty(fb){if(fb.getAttribute("data-mx"))return;fb.setAttribute("data-mx","1");if(fb.querySelector("svg,table,input,.mx"))return;var raw=fb.innerText||fb.textContent;if(!raw||!raw.trim())return;
  var lines=raw.split(/\n/).map(function(x){return x.trim()}).filter(Boolean);if(lines.length>2&&lines.filter(function(x){return /^\d+\s*\|/.test(x)||/^\|/.test(x)}).length>1)return;
  fb.innerHTML=lines.map(function(line){var chips=line.split(/\s{3,}|\s+·\s+/).filter(function(x){return x.trim()});return '<div class="fb-line">'+chips.map(function(ch){return '<span class="fb-chip">'+fbChip(ch)+'</span>'}).join("")+'</div>'}).join("");fb.classList.add("fb-mx")}
function fxPretty(x){if(x.getAttribute("data-mx")||x.children.length)return;x.setAttribute("data-mx","1");var t=x.textContent;if(!t.trim()||t.length>80)return;x.innerHTML=mxRun(t.replace(/\s{2,}/g," "));x.classList.add("fx-mx")}
function egSteps(eg){if(eg.getAttribute("data-st"))return;eg.setAttribute("data-st","1");if(eg.querySelector("table,ul,ol,figure,svg,.fbox,div:not(.lab),.cb"))return;
  var lab=eg.querySelector(".lab"),steps=[[]];
  [].slice.call(eg.childNodes).forEach(function(n){if(n===lab)return;if(n.nodeType===1&&n.tagName==="BR"){steps.push([]);return}
    if(n.nodeType===3){n.nodeValue.replace(/([.!?;])\s+(?=[A-Z0-9(“"−•])/g,"$1\u0001").replace(/\s*(→|⟹)\s*/g,"\u0001$1 ").split("\u0001").forEach(function(p,i){if(i>0)steps.push([]);if(p)steps[steps.length-1].push(document.createTextNode(p))});return}
    steps[steps.length-1].push(n.cloneNode(true))});
  steps=steps.filter(function(s){return s.some(function(n){return (n.textContent||"").trim()})});if(steps.length<2)return;
  var txt=function(s){return s.map(function(n){return n.textContent}).join("").trim()},isQ=steps.length>=3||/\?/.test(txt(steps[0]))||/^(Compute|Solve|Find|Simplify|Factor|Expand|Multiply|Convert|Write|Evaluate|Is|How|What|Which|Graph|Divide|Add|Subtract)\b/i.test(txt(steps[0]));
  var lastStrong=-1;steps.forEach(function(s,i){if(s.some(function(n){return n.nodeType===1&&(n.tagName==="STRONG"||n.querySelector&&n.querySelector("strong"))}))lastStrong=i});
  var ol=document.createElement("ol");ol.className="eg-steps";var num=0;
  steps.forEach(function(s,i){var li=document.createElement("li"),t=txt(s),q=i===0&&isQ,aside=/^\(/.test(t)&&i>0,ans=i===lastStrong&&i>0;
    li.className=q?"eg-q":aside?"eg-aside":ans?"eg-ans":"";li.style.setProperty("--i",i);
    if(!q&&!aside){num++;li.insertAdjacentHTML("beforeend",'<span class="eg-num">'+(ans?"✓":num)+'</span>')}
    var body=document.createElement("div");s.forEach(function(n){body.appendChild(n)});
    var f=body.firstChild;if(f&&f.nodeType===3){f.nodeValue=f.nodeValue.replace(/^\s*\d+\.\s+/,"");if(/^\s*(→|⟹)/.test(f.nodeValue)){f.nodeValue=f.nodeValue.replace(/^\s*(→|⟹)\s*/,"");body.insertAdjacentHTML("afterbegin",'<span class="eg-arr">⇒</span>')}}
    li.appendChild(body);ol.appendChild(li)});
  [].slice.call(eg.childNodes).forEach(function(n){if(n!==lab)n.remove()});eg.appendChild(ol);eg.classList.add("eg-st")}
/* typeset the maths hiding inside ordinary example sentences: "so 2x + 3 = 11, then x = 4" */
var MATHTOK=/^[0-9A-Za-z.+\-−×÷·\/()²³√=<>≤≥≠≈π^|°%$,]+$/,ENGW=/^(an|or|of|to|in|is|at|by|on|if|so|it|as|be|we|no|do|up|us|my|he|am|go)$/i;
function mathTok(tok){if(!MATHTOK.test(tok))return false;var core=tok.replace(/[,.;:]+$/,"").replace(/^\(+|\)+$/g,"");if(!core)return /[()]/.test(tok);
  if(/^[A-Za-z]{3,}$/.test(core)&&!/^(sin|cos|tan)$/.test(core))return false;if(ENGW.test(core))return false;if(/[A-Za-z]{3,}/.test(core)&&!/\d|[=+−×÷^\/]/.test(core))return false;return true}
function mathLine(s){var parts=s.split(/(\s+)/),out="",run=[],hit=false,lw=null,pre=null;
  function flush(){if(!run.length)return;
    var txt=run.join(""),tail="",mm=txt.match(/[,.;:]+$/);if(mm){tail=mm[0];txt=txt.slice(0,-tail.length)}
    var bal=(txt.match(/\(/g)||[]).length===(txt.match(/\)/g)||[]).length,full=(pre?pre.w+" ":"")+txt;
    if(bal&&/[^\s=<>≤≥≠≈]\s*[=<>≤≥≠≈]\s*[^\s=<>≤≥≠≈]/.test(full)&&full.length<70){out+=fbChip((pre?"\\t{"+pre.w+"} ":"")+txt,true)+mxEsc(tail);hit=true}else out+=mxEsc(full+tail);run=[];pre=null}
  parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){if(run.length)run.push(p);else out+=p;return}
    if(mathTok(p)){if(!run.length&&/^[=<>≤≥≈]/.test(p)&&lw&&lw.end===out.length-1&&/^\s$/.test(out.slice(-1))){out=out.slice(0,lw.start);pre={w:lw.w}}run.push(p)}
    else{var sp=[];while(run.length&&/^\s+$/.test(run[run.length-1]))sp.unshift(run.pop());flush();out+=sp.join("");var st=out.length;out+=mxEsc(p);lw=/^[A-Za-z]{3,14}$/.test(p)?{w:p,start:st,end:out.length}:null}});
  var sp2=[];while(run.length&&/^\s+$/.test(run[run.length-1]))sp2.unshift(run.pop());flush();out+=sp2.join("");return hit?out:null}
function mathify(root){if(!root||root.getAttribute("data-mt"))return;root.setAttribute("data-mt","1");if(root.closest(".cb"))return;
  var W=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),list=[],n;while((n=W.nextNode())){var pe=n.parentNode;if(pe.closest&&pe.closest(".mx,.lab,.eg-num,.eg-arr,svg,button,a,code,input,textarea,.qc"))continue;if(/[=<>≤≥]/.test(n.nodeValue))list.push(n)}
  list.forEach(function(tn){var h=mathLine(tn.nodeValue);if(h===null)return;var sp=document.createElement("span");sp.innerHTML=h;var kids=[].slice.call(sp.childNodes);kids.forEach(function(k){tn.parentNode.insertBefore(k,tn)});tn.remove()})}
function polishLesson(root){if(!root)return;
  root.querySelectorAll(".fbox").forEach(function(f){if(!f.closest(".cb"))fbPretty(f)});
  root.querySelectorAll(".eg").forEach(function(e){egSteps(e);try{mathify(e)}catch(x){}});
  root.querySelectorAll(".fx").forEach(function(x){if(!x.closest(".cb"))fxPretty(x)});
  root.querySelectorAll(".pg").forEach(function(pg){var k=pg.querySelector(".pg-kind");if(k&&pg.querySelector(".cb")){k.className="pg-kind k-cb";k.innerHTML=ic("notebook")+(pg.querySelector(".cb-exs")?"Copybook · examples":"Copybook notes")}pg.classList.add("pg-rev");[].slice.call(pg.children).forEach(function(c,i){c.style.setProperty("--k",Math.min(i,10))})})}
var _lpShowCB=lpShow;lpShow=function(d){_lpShowCB(d);polishLesson(el("plStage"))};
var _lpReaderCB=lpReader;lpReader=function(){_lpReaderCB();var a=el("app");polishLesson(a.querySelector(".lesson")||a)};

/* ---------- 3. Axi reads copybook notes and typeset maths properly ---------- */
var _readBlocksCB=readBlocks;readBlocks=function(root){var b=_readBlocksCB(root);if(!root||!root.querySelector(".cb"))return b;
  var extra=[].slice.call(root.querySelectorAll(".cb-t,.cb-fx,.cb-q,.cb-a,.cb-steps li,.cb-tr p,.cb-w p,.cb-h li,.cb-h p,.cb-kw .cb-kc"));
  var all=b.filter(function(n){return !n.closest(".cb")}).concat(extra);return all.sort(function(x,y){return x.compareDocumentPosition(y)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1})};
var _blockTextCB=blockText;blockText=function(n){if(n.querySelector&&n.querySelector(".mx[data-say]")){var c=n.cloneNode(true);c.querySelectorAll(".mx[data-say]").forEach(function(x){x.replaceWith(document.createTextNode(" "+x.getAttribute("data-say")+" "))});c.querySelectorAll(".cb-n,.eg-num").forEach(function(x){x.remove()});return _blockTextCB(c)}return _blockTextCB(n)};

/* ---------- 4. My Copybook page ---------- */
if(!S.cbStar)S.cbStar={};
function cbMini(o){var key=o.uid+"/"+o.lid,u=findUnit(o.uid),st=!!S.cbStar[key];
  return '<div class="cbm" data-k="'+key+'" data-q="'+esc((cbPlain(o.t)+" "+cbPlain([].concat(o.h||[]).join(" "))+" "+(u?u.title:"")).toLowerCase())+'"><div class="cbm-top"><span class="cbm-u">'+(u?esc(u.title.replace(/ \(.*\)$/,"")):"")+'</span><button class="cbm-star'+(st?" on":"")+'" title="Star this note" onclick="cbStar(\''+key+'\',this)">★</button></div>'+
   '<h4 class="cb-t"><span>'+cbT(o.t)+'</span></h4>'+(o.f?'<div class="cbm-f">'+String([].concat(o.f)[0]).split("||").map(function(x){return '<span class="cb-chip">'+MX(x.trim())+'</span>'}).join("")+'</div>':'')+(o.h?'<p>'+cbT([].concat(o.h)[0])+'</p>':'')+
   '<div class="cbm-b"><button class="btn sm pri" onclick="cbOpen(\''+key+'\')">'+ic("notebook")+'Open note</button><button class="btn sm ghost" onclick="go(\'/lesson/'+key+'\')">'+ic("bookOpen")+'Lesson</button></div></div>'}
function cbStar(key,b){S.cbStar[key]=!S.cbStar[key];if(!S.cbStar[key])delete S.cbStar[key];saveS();if(b)b.classList.toggle("on",!!S.cbStar[key]);try{sfx("tap")}catch(e){}}
function cbOpen(key){var p=key.split("/"),o=cbFind(p[0],p[1]);if(!o)return;var m=modal('<div class="cbo">'+cbHTML(o,1)+(o.ex&&o.ex.length?cbHTML(o,2):"")+'</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn" onclick="this.closest(\'.modal\').remove();go(\'/lesson/'+key+'\')">'+ic("bookOpen")+'Open the lesson</button><button class="btn" onclick="cbRead(this)">'+ic("speak")+'Read to me</button><button class="btn pri" data-close>Close</button></div>',"cbmodal");trUI(m)}
function cbRead(b){var m=b.closest(".modal");if(RD){readerStop();return}readerStart(readBlocks(m.querySelector(".cbo")),{label:"Axi reads your copybook"})}
function viewCopybook(a){var q=(S._cbq||"").toLowerCase(),starOnly=!!S._cbs,n=0,units="";
  UNITS.forEach(function(u){var cs=CBOOK.filter(function(o){return o.uid===u.id});if(!cs.length)return;n+=cs.length;
    units+='<section class="cbk-u" data-u="'+u.id+'"><div class="cbk-uh">'+(typeof uic==="function"?uic(u):"")+'<div><b>'+esc(u.title)+'</b><small>'+cs.length+' notes</small></div></div><div class="cbk-grid">'+cs.map(cbMini).join("")+'</div></section>'});
  a.innerHTML='<section class="cbk"><div class="pg-h"><div><h1>My Copybook</h1><p>Every rule of the course written the way a top student keeps notes: the formula, what it means in human words, and worked examples step by step. '+n+' notes.</p></div></div>'+
   '<div class="cbk-bar"><label class="srch">'+ic("search")+'<input id="cbkQ" placeholder="Search a rule… (slope, percent, circle)" value="'+esc(S._cbq||"")+'"></label><button class="btn'+(starOnly?" pri":"")+'" id="cbkS">★ Starred</button><button class="btn ghost" onclick="window.print()">'+ic("download")+'Print</button></div>'+
   '<div id="cbkList">'+units+'</div><div class="empty" id="cbkNone" hidden>No note matches. Try a shorter word.</div></section>';
  function filt(){var q=(el("cbkQ").value||"").toLowerCase().trim();S._cbq=q;var any=0;a.querySelectorAll(".cbk-u").forEach(function(sec){var vis=0;sec.querySelectorAll(".cbm").forEach(function(c){var ok=(!q||c.getAttribute("data-q").indexOf(q)>-1)&&(!S._cbs||S.cbStar[c.getAttribute("data-k")]);c.hidden=!ok;if(ok)vis++});sec.hidden=!vis;any+=vis});el("cbkNone").hidden=!!any}
  el("cbkQ").oninput=filt;el("cbkS").onclick=function(){S._cbs=!S._cbs;this.classList.toggle("pri",!!S._cbs);filt()};filt()}
TITLES.notebook="My Copybook";
NAV2.splice(0,0,["/notebook","My Copybook","notebook"]);if(typeof NAVGROUPS!=="undefined"){var _g0=NAVGROUPS[0][2],_iu=_g0.indexOf("/units");_g0.splice(_iu+1,0,"/notebook")}
if(typeof SIMPLE_NAV!=="undefined")SIMPLE_NAV.splice(SIMPLE_NAV.indexOf("/units")+1,0,"/notebook");navInit();
var _rCB=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);if(p[0]==="notebook"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;var t=el("tbTitle");if(t)t.textContent="My Copybook";return viewCopybook(a)}return _rCB()};
if(typeof PAGEHELP!=="undefined")PAGEHELP.notebook=["My Copybook keeps every rule of the course in plain words, with the formula and worked examples. Search for a rule, star the ones you need, or print it all.","«Моя тетрадь» — все правила курса простыми словами, с формулой и разобранными примерами. Ищи правило, отмечай звёздочкой или распечатай."];
var _qiCB=quickItems;quickItems=function(){var l=_qiCB();l.splice(2,0,["notebook","My Copybook","go(\'/notebook\')"]);return l};buildTop();
var _paCB=paletteActions;paletteActions=function(){var l=_paCB();l.splice(1,0,["notebook","My Copybook — every rule in plain words",function(){go("/notebook")}]);return l};

/* ---------- 5. formula of the day → a copybook note ---------- */
var _vhCB=viewHome;viewHome=function(a){_vhCB(a);var f=a.querySelector(".fod");if(!f||!CBOOK.length)return;var day=Math.floor(Date.now()/864e5),withF=CBOOK.filter(function(o){return o.f}),o=withF[day%withF.length],key=o.uid+"/"+o.lid,u=findUnit(o.uid);
  f.className="fod fod-cb";f.innerHTML='<div class="cb cb-mini" data-cb="'+key+'"><div class="fod-h"><span class="cb-tag">'+ic("sparkles")+'Formula of the day · '+esc(u?u.title.replace(/ \(.*\)$/,""):"")+'</span></div><h4 class="cb-t"><span>'+cbT(o.t)+'</span></h4><div class="cb-fx">'+String([].concat(o.f)[0]).split("||").map(function(x){return '<span class="cb-chip">'+MX(x.trim())+'</span>'}).join("")+'</div>'+(o.h?'<p class="fod-p">'+cbT([].concat(o.h)[0])+'</p>':'')+
   '<div class="row"><button class="btn sm pri" onclick="cbOpen(\''+key+'\')">'+ic("notebook")+'See the examples</button><button class="btn sm ghost" onclick="cbFodRead(this)">'+ic("speak")+'Read to me</button><button class="btn sm ghost" onclick="go(\'/notebook\')">All notes</button></div></div>'};
function cbFodRead(b){var c=b.closest(".cb");if(RD){readerStop();return}readerStart([c.querySelector(".cb-t"),c.querySelector(".cb-fx"),c.querySelector(".fod-p")].filter(Boolean),{label:"Formula of the day"})}

/* ---------- styles ---------- */
(function(){var c=`
.player .pg{font-size:17.5px;line-height:1.8}.player .pg>p,.player .pg li{max-width:70ch}
.player .pg .tt{border-bottom:1px dotted color-mix(in srgb,var(--violet) 40%,transparent)}
.pg.pg-rev>*{animation:pgRev .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--k,0)*.07s + .05s)}@keyframes pgRev{from{opacity:0;transform:translateY(10px)}}
.player .pg-t{position:relative;display:table;padding-bottom:4px}.pg-kind.k-cb{background:color-mix(in srgb,#ffc56e 18%,transparent);color:#e8a21c}.player .pg-t::after{content:"";position:absolute;left:0;right:30%;bottom:0;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--blue),var(--violet),transparent);opacity:.75;animation:cbGrowX .8s cubic-bezier(.2,.8,.2,1) both .15s;transform-origin:left}
.fx.fx-mx,.lesson .fx.fx-mx{font-family:"STIX Two Text","Cambria Math","Times New Roman",Georgia,serif;font-size:1.08em;background:color-mix(in srgb,var(--blue) 9%,transparent);border:0;border-radius:7px;padding:1px 7px}
.fx-mx i{font-style:italic}.fx-mx .mo{margin:0 .2em}.fx-mx sup{font-size:.7em}
.fbox.fb-mx{font-family:inherit;text-align:center;padding:16px 18px;margin:16px 0;overflow-x:auto}
.fb-line{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 30px;margin:4px 0}.fb-line+.fb-line{padding-top:8px;border-top:1px dashed color-mix(in srgb,var(--blue) 22%,transparent)}
.fb-chip{font-size:20px;line-height:1.5}.fb-chip .mx{font-size:1em}
.eg.eg-st{padding-bottom:10px}.eg-steps{list-style:none;margin:6px 0 0;padding:0}
.eg-steps li{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-top:1px dashed color-mix(in srgb,var(--blue) 16%,transparent);animation:pgRev .45s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*.2s + .2s)}
.eg-steps li:first-child{border-top:0}.eg-steps li>div{flex:1;min-width:0}
.eg-num{flex:none;width:24px;height:24px;margin-top:3px;border-radius:50%;display:grid;place-items:center;font:800 12px var(--ui);color:var(--blue);background:color-mix(in srgb,var(--blue) 16%,transparent)}
.eg-steps li.eg-q{font-weight:650;padding:4px 10px 10px;margin:0 -10px 4px;border-radius:10px;background:color-mix(in srgb,var(--blue) 7%,transparent);border-top:0}
.eg-steps li.eg-ans .eg-num{background:var(--grn);color:#fff}.eg-steps li.eg-ans>div{font-weight:600}
.eg-steps li.eg-aside{font:600 19px/1.35 "Caveat","Segoe Print",cursive;color:var(--grn);padding-left:34px}
.eg-arr{color:var(--violet);font-weight:800;margin-right:6px}
.player .eg strong,.lesson .eg strong{color:var(--grn);background:color-mix(in srgb,var(--grn) 12%,transparent);padding:0 6px;border-radius:6px}
.player .tip{position:relative;padding:14px 16px 14px 46px;border:0;border-radius:6px 6px 16px 6px;background:color-mix(in srgb,var(--yel) 17%,var(--paper));box-shadow:0 10px 22px -14px rgba(0,0,0,.5)}
.player .tip::before{content:"💡";position:absolute;left:14px;top:13px;font-size:18px}
.player .trap{position:relative;padding:14px 16px 14px 46px;border:0;border-left:4px solid var(--red);border-radius:6px 16px 16px 6px;background:color-mix(in srgb,var(--red) 9%,var(--paper))}
.player .trap::before{content:"⚠️";position:absolute;left:14px;top:13px;font-size:17px}
.player .note{border:0;border-radius:16px;background:color-mix(in srgb,var(--grn) 8%,var(--paper));border-left:4px solid var(--grn)}
.player .plainw{background:color-mix(in srgb,#e8a21c 9%,var(--paper));border-left:4px solid #e8a21c}.player .plainw>b:first-child{font:700 21px/1.1 "Caveat","Segoe Print",cursive;color:#e8a21c;display:block;margin-bottom:2px}
.cbk .cbk-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 18px}.cbk .srch{flex:1;min-width:220px}
.cbk-u{margin-bottom:26px}.cbk-uh{display:flex;align-items:center;gap:12px;margin-bottom:10px}.cbk-uh b{display:block;font-family:var(--disp);font-size:19px}.cbk-uh small{color:var(--ink2)}
.cbk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.cbm{--pb:#8db4ff;--pg:#4fdba3;--po:#ffc56e;--pv:#c6abff;--cbpaper:#161e33;position:relative;display:flex;flex-direction:column;gap:6px;padding:14px 16px 14px 26px;border-radius:16px;background:linear-gradient(90deg,transparent 12px,rgba(255,125,155,.3) 12px,rgba(255,125,155,.3) 13.5px,transparent 13.5px),repeating-linear-gradient(180deg,transparent 0 29px,rgba(140,170,255,.06) 29px 30px),var(--cbpaper);border:1px solid var(--line);transition:transform .15s,box-shadow .15s;animation:pgRev .45s both}
html[data-theme="light"] .cbm{--pb:#2459d8;--pg:#0d8a56;--po:#c86c00;--pv:#6b46d9;--cbpaper:#fffdf6;background:linear-gradient(90deg,transparent 12px,rgba(230,80,110,.35) 12px,rgba(230,80,110,.35) 13.5px,transparent 13.5px),repeating-linear-gradient(180deg,transparent 0 29px,rgba(60,110,220,.08) 29px 30px),var(--cbpaper);border-color:#ebe3cf}
.cbm:hover{transform:translateY(-2px);box-shadow:0 14px 30px -14px rgba(0,0,0,.5)}
.cbm-top{display:flex;justify-content:space-between;align-items:center}.cbm-u{font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink2)}
.cbm-star{border:0;background:none;font-size:20px;line-height:1;color:color-mix(in srgb,var(--ink2) 45%,transparent);cursor:pointer}.cbm-star.on{color:#ffc53d}
.cbm .cb-t{font:700 25px/1.1 "Caveat","Segoe Print",cursive;color:var(--pb);margin:0}.cbm-f{font-size:18px;padding:6px 0;display:flex;flex-wrap:wrap;align-items:center;gap:2px 20px;min-width:0}.cbm-f .cb-chip{max-width:100%}.cbm p{margin:0;font-size:14.5px;color:var(--ink2);line-height:1.55}.cbm-b{display:flex;gap:6px;margin-top:auto;padding-top:6px}
.modal.cbmodal .mbox{width:min(760px,100%);text-align:left;padding:18px}.cbo .cb{margin:0 0 14px}
.fod.fod-cb{display:block;padding:0;background:none;border:0;box-shadow:none}.fod-cb .cb{margin:0}.fod-cb .cb-t{font-size:28px;margin:4px 0 8px}.fod-cb .cb-fx{font-size:22px;margin:4px 0 10px}.fod-p{margin:0 0 12px}
@media print{.cbk .cbk-bar,.cbm-b,.cbm-star{display:none!important}.cbm{break-inside:avoid;background:#fff!important;color:#000}}
@media(max-width:560px){.player .pg{font-size:16.5px}.fb-chip{font-size:18px}.player .tip,.player .trap{padding-left:40px}}
`;var st=document.createElement("style");st.textContent=c;document.head.appendChild(st)})();
Object.assign(RU,{"My Copybook":"Моя тетрадь","Open note":"Открыть","Lesson":"Урок","See the examples":"Примеры","All notes":"Все записи","Copybook":"Тетрадь","In human words":"Простыми словами","Memory trick":"Как запомнить","Watch out":"Осторожно","The rule":"Правило","Starred":"Избранное"});
/* ---------- what's new in 2.3 ---------- */
AXV="2.3";
whatsNew=function(){if(el("intro"))return;S.seenVer=AXV;saveS();
  var L=[["notebook",L2("Copybook notes in every lesson","Конспект в каждом уроке"),L2("Each core lesson now has clear notes: the rule, the rule in human words, a picture and a memory trick.","В каждом уроке теперь есть понятный конспект: правило, правило простыми словами, рисунок и подсказка, как запомнить.")],
    ["pen",L2("Worked examples, step by step","Примеры, разобранные по шагам"),L2("Every step is numbered, with a handwritten note saying why.","Каждый шаг пронумерован, а рядом — рукописная пометка «почему».")],
    ["sparkles",L2("Maths that looks like maths","Формулы как в учебнике"),L2("Fractions, roots and powers are written the way a textbook writes them, even inside examples.","Дроби, корни и степени записаны как в учебнике — даже внутри примеров.")],
    ["bookOpen",L2("My Copybook","Моя тетрадь"),L2("All 171 notes in one place: search, star and print them. Plus a formula of the day on Today.","Все 171 конспект в одном месте: поиск, избранное и печать. И формула дня на главной.")]];
  var m=modal('<div style="text-align:center">'+AXI("cheer",90,"axi-jump")+'</div><h2>'+L2("What’s new in AXIOM ","Что нового в AXIOM ")+AXV+'</h2><div class="wn">'+L.map(function(x){return '<div class="wn-i"><span class="qa-ic">'+ic(x[0])+'</span><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join("")+'</div><div style="display:flex;gap:8px"><button class="btn ghost" style="flex:1" data-close onclick="go(\'/notebook\')">'+ic("notebook")+L2("Open My Copybook","Открыть тетрадь")+'</button><button class="btn pri" style="flex:1" data-close>'+L2("Let’s go","Поехали")+'</button></div>',"gs");trUI(m);
  setTimeout(function(){var mb=document.querySelector(".modal.gs");if(mb&&typeof axiAuto==="function")axiAuto(L2("New! Every lesson now has copybook notes written in plain words. Want to see them?","Новое! В каждом уроке теперь есть конспект простыми словами. Посмотрим?"),{axi:mb})},400)};
/* re-draw the current page so every new hook applies right away */
try{bootRoute()}catch(e){}
