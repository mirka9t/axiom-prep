/* =====================================================================
   AXIOM — lesson player upgrades for long lessons
   ===================================================================== */
if(!S.flagPages)S.flagPages=[];
function lpLabel(p,i){if(!p)return "";if(p.kind==="cover")return "Introduction";if(p.kind==="terms")return "Key words";if(p.kind==="recap")return "Recap";if(p.kind==="check")return "Check yourself";return p.t||"Page "+(i+1)}
function lpDeepStart(){if(!LP)return -1;for(var i=0;i<LP.seq.length;i++){var p=LP.seq[i];if(p.t&&/^Going deeper/.test(p.t))return i}return -1}
function lpToc(){if(!LP)return;var groups=[],last=null;LP.seq.forEach(function(p,i){var lab=lpLabel(p,i);if(p.kind==="check"){if(last)last.checks++;return}if(last&&last.lab===lab){last.n++;return}last={lab:lab,i:i,n:1,checks:0,deep:false};groups.push(last)});
  var ds=lpDeepStart();groups.forEach(function(g){g.deep=ds>-1&&g.i>=ds&&g.lab!=="Key words"&&g.lab!=="Recap"});
  var m=modal('<h2>Contents</h2><p class="muted">'+esc(LP.l.t)+' · '+LP.seq.length+' pages</p><div class="toc">'+groups.map(function(g,k){var cur=LP.i>=g.i&&(!groups[k+1]||LP.i<groups[k+1].i),done=LP.i>g.i&&!cur;
    return '<button class="toc-i'+(cur?" cur":"")+(done?" done":"")+'" data-i="'+g.i+'"><span class="toc-n">'+(done?ic("check"):(k+1))+'</span><span class="toc-t"><b>'+esc(g.lab)+'</b><small>'+g.n+' page'+(g.n>1?"s":"")+(g.checks?' · '+g.checks+' check'+(g.checks>1?"s":""):'')+'</small></span>'+(g.deep?'<em class="toc-deep">Deep dive</em>':'')+'</button>'}).join("")+'</div>',"tocm");
  m.querySelectorAll("[data-i]").forEach(function(b){b.onclick=function(){var i=+b.getAttribute("data-i");m.remove();LP.i=i;lpShow(i>=LP.i?1:-1)}});trUI(m)}
function lpFlag(){if(!LP)return;var k=LP.key+"#"+LP.i,i=-1;S.flagPages.forEach(function(f,j){if(f.k===k)i=j});
  if(i>-1){S.flagPages.splice(i,1);toast("Flag removed")}else{S.flagPages.unshift({k:k,key:LP.key,i:LP.i,t:lpLabel(LP.seq[LP.i],LP.i),lt:LP.l.t,d:dayStr()});S.flagPages=S.flagPages.slice(0,60);toast("Page flagged — find it in Review")}saveS();var b=el("lpFlagBtn");if(b)b.classList.toggle("on",i<0)}
function lpGoto(key,i){S.lpos=S.lpos||{};S.lpos[key]=i;var was=S.lessons[key];if(was)delete S.lessons[key];go("/lesson/"+key);setTimeout(function(){if(was)S.lessons[key]=was;if(LP&&LP.key===key&&LP.i!==i){LP.i=i;lpShow(1)}},120)}
var _lsU=lpShow;lpShow=function(d){_lsU(d);if(!LP)return;var st=el("plStage");if(!st)return;var p=LP.seq[LP.i],ds=lpDeepStart(),pg=st.firstElementChild;
  if(ds>-1&&LP.i>=ds&&p&&p.kind!=="terms"&&p.kind!=="recap"&&pg&&!pg.querySelector(".deep-rib"))pg.insertAdjacentHTML("afterbegin",'<div class="deep-rib">'+ic("sparkles")+'Deep dive</div>');
  if(p&&p.kind==="cover"&&pg&&ds>-1&&!pg.querySelector(".cv-deep")){var mt=pg.querySelector(".cv-meta");if(mt)mt.insertAdjacentHTML("beforeend",'<span class="cv-deep">'+ic("sparkles")+'deep dive</span>')}
  if(p&&(p.kind==="read"||p.kind==="example")&&pg&&!pg.querySelector(".pg-flag")){var on=S.flagPages.some(function(f){return f.k===LP.key+"#"+LP.i});pg.insertAdjacentHTML("beforeend",'<div class="pg-flag"><button class="flagb'+(on?" on":"")+'" id="lpFlagBtn" onclick="lpFlag()">'+ic("flag")+'<span>Didn\u2019t get it? Flag this page</span></button></div>')}
  var c=el("plCount");if(c&&!c.classList.contains("tocable")){c.classList.add("tocable");c.title="Contents";c.onclick=lpToc}};
var _vlL=viewLesson;viewLesson=function(a,uid,lid){_vlL(a,uid,lid);var p=a.querySelector("#qmLesson .qm-pop");if(p)p.insertAdjacentHTML("afterbegin",'<button class="qm-i" onclick="qmClose();lpToc()"><span class="qm-ic">'+ic("list")+'</span><span>Contents</span></button>')};
var _vrL=viewRevise;viewRevise=function(a){_vrL(a);if(!S.flagPages.length)return;var sec=a.querySelector("section");if(!sec)return;
  sec.insertAdjacentHTML("beforeend",'<h2 class="sec">'+ic("flag")+' Pages you flagged</h2><div class="card pad"><p class="muted" style="margin-top:0">Pages you didn\u2019t understand. Re-read them, then remove the flag.</p>'+S.flagPages.map(function(f,j){var u=findUnit(f.key.split("/")[0]);return '<div class="pl"><span class="pl-ic">'+ic(u?(UICON[u.id]||"book"):"book")+'</span><span class="pl-t"><b>'+esc(f.t)+'</b><small>'+esc(f.lt)+' · page '+(f.i+1)+'</small></span><button class="btn sm" onclick="lpGoto(\''+f.key+'\','+f.i+')">Open</button><button class="tb-btn" title="Remove" onclick="S.flagPages.splice('+j+',1);saveS();viewRevise(el(\'app\'))">'+ic("x")+'</button></div>'}).join("")+'</div>')};
document.addEventListener("keydown",function(e){var tg=(e.target||{}).tagName||"";if(/INPUT|TEXTAREA/.test(tg)||e.ctrlKey||e.metaKey)return;if(LP&&el("plStage")&&(e.key==="l"||e.key==="L")&&!document.querySelector(".modal")){lpToc()}});
Object.assign(RU,{"Contents":"Содержание","Deep dive":"Углублённо","Pages you flagged":"Отмеченные страницы","Introduction":"Введение"});

(function(){var c=`
.pg.lesson,.pg .lesson,.player .pg{font-size:17px;line-height:1.75}
.player .pg{max-width:780px;margin-left:auto;margin-right:auto}
.player .pg h3{position:relative;padding-left:14px;margin:22px 0 10px}.player .pg h3::before{content:"";position:absolute;left:0;top:.15em;bottom:.15em;width:4px;border-radius:4px;background:linear-gradient(var(--blue),var(--violet))}
.player .pg p{margin:0 0 14px}
.player .eg{position:relative;padding:16px 18px 16px 18px;border-radius:16px;background:color-mix(in srgb,var(--blue) 6%,var(--paper));border:1px solid color-mix(in srgb,var(--blue) 22%,var(--line));line-height:1.8}
.player .eg .lab{display:inline-block;margin-bottom:6px;padding:2px 10px;border-radius:999px;background:color-mix(in srgb,var(--blue) 16%,transparent);color:var(--blue);font-size:11.5px;font-weight:800;letter-spacing:.06em}
.player .fbox{background:linear-gradient(var(--soft),var(--soft)) padding-box,linear-gradient(135deg,var(--blue),var(--violet)) border-box;border:1.5px solid transparent;border-radius:14px}
.player .tip,.player .trap,.player .note{border-radius:14px}
.ps-steps{counter-reset:st;list-style:none;padding:0;margin:8px 0 10px}.ps-steps li{counter-increment:st;position:relative;padding:8px 10px 8px 44px;margin:6px 0;border-radius:12px;background:var(--soft)}
.ps-steps li::before{content:counter(st);position:absolute;left:10px;top:8px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font:800 12.5px var(--ui);color:#fff;background:linear-gradient(135deg,var(--blue),var(--violet))}
.ps-ans{margin-top:10px;padding:10px 14px;border-radius:12px;background:color-mix(in srgb,var(--grn) 14%,var(--paper));border:1px solid color-mix(in srgb,var(--grn) 35%,var(--line))}
.deep-rib{display:inline-flex;align-items:center;gap:6px;margin-bottom:10px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#fff;background:linear-gradient(135deg,#ff8a6b,#c254ff)}.deep-rib .ic{width:14px;height:14px}
.cv-deep{color:#c254ff!important}.cv-deep .ic{color:#c254ff!important}.cov-badges{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0;width:100%;flex-basis:100%}.cov-badges span{white-space:nowrap}.cov-badges span{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:999px;background:var(--soft);font-size:13px;font-weight:700;color:var(--ink2)}.cov-badges .ic{width:14px;height:14px}.cov-badges .dd{color:#c254ff;background:color-mix(in srgb,#c254ff 12%,var(--soft))}
.pg-flag{display:flex;justify-content:flex-end;margin-top:16px}.flagb{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;border:1px dashed var(--line);background:none;color:var(--ink2);font:600 12.5px var(--ui);cursor:pointer;opacity:.75;transition:opacity .15s,color .15s,border-color .15s}.flagb:hover{opacity:1}.flagb .ic{width:14px;height:14px}
.flagb.on{opacity:1;color:#e8a21c;border:1px solid color-mix(in srgb,#e8a21c 60%,var(--line));background:color-mix(in srgb,#e8a21c 10%,transparent)}
.pl-cnt.tocable{cursor:pointer;padding:4px 10px;border-radius:999px;border:1px solid var(--line);transition:border-color .15s}.pl-cnt.tocable:hover{border-color:var(--blue)}
.tocm .mbox{text-align:left;width:min(560px,100%)}.toc{display:flex;flex-direction:column;gap:6px;margin-top:12px;max-height:62vh;overflow:auto}
.toc-i{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;text-align:left;font-family:var(--ui);transition:transform .12s,border-color .12s}.toc-i:hover{transform:translateX(3px);border-color:var(--blue)}
.toc-n{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;flex:none;font-weight:800;font-size:13px;background:var(--soft);color:var(--ink2)}.toc-n .ic{width:14px;height:14px;stroke-width:3}
.toc-i.done .toc-n{background:var(--grn);color:#fff}.toc-i.cur{border-color:var(--blue);box-shadow:0 0 0 3px color-mix(in srgb,var(--blue) 14%,transparent)}.toc-i.cur .toc-n{background:var(--blue);color:#fff}
.toc-t{flex:1;min-width:0}.toc-t small{display:block;color:var(--ink2);font-size:12px}.toc-deep{font-style:normal;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;color:#c254ff;background:color-mix(in srgb,#c254ff 12%,transparent)}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
