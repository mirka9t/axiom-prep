/* =====================================================================
   ZERO TO 800 — FINAL FEATURES
   mistake coach · backup files · formula of the day · installable app
   ===================================================================== */
if(!S.why)S.why={};
var WHY=[["rule","Didn't know the rule","Re-read the lesson linked in the explanation, then do 10 endless-practice questions on that skill."],["careless","Careless slip","Write every step on paper and re-check signs. Read the Top 20 SAT traps unit."],["misread","Misread the question","Underline what is asked before solving, and re-read it before you choose."],["time","Rushed / out of time","Use the Speed drill daily and flag hard questions instead of getting stuck."]];
function whyChips(){return '<div class="whyc"><b>'+ic("bulb")+' Why did you miss it?</b><div class="chipset">'+WHY.map(function(w){return '<button class="tog" onclick="whyPick(this,\''+w[0]+'\')">'+w[1]+'</button>'}).join("")+'</div></div>'}
function whyPick(b,k){S.why[k]=(S.why[k]||0)+1;saveS();var w=WHY.filter(function(x){return x[0]===k})[0];b.closest(".whyc").innerHTML='<b>'+ic("check")+' Noted.</b> <span class="muted">'+esc(w[2])+'</span>';sfx("tap")}
var _fq3=finishQ;finishQ=function(ok,it,ct){_fq3(ok,it,ct);if(!ok){var ex=el("exbox");if(ex)ex.insertAdjacentHTML("beforeend",whyChips())}};
var _qv3=qvShow;qvShow=function(p,ok){_qv3(p,ok);if(ok===false){var r=el("qvRes");if(r)r.insertAdjacentHTML("beforeend",whyChips())}};

/* ---------- backup files ---------- */
function backupDownload(){var data=JSON.stringify(S),name="zero-to-800-backup-"+dayStr()+".json";
  try{var b=new Blob([data],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);toast("Backup file saved")}catch(e){toast("Download not available here — use the backup code instead")}}
function backupImport(input){var f=input.files&&input.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);if(typeof o.xp!=="number")throw 0;if(!confirm("Replace your current progress with this backup (level "+(1+Math.floor(o.xp/120))+")?"))return;for(var k in o)S[k]=o[k];saveS();toast("Progress restored ✓");router()}catch(e){toast("That file isn't a Zero to 800 backup")}};r.readAsText(f)}

/* ---------- Progress: mistake coach + backup files ---------- */
var _vp3=viewProgress;viewProgress=function(a){_vp3(a);var tot=0;WHY.forEach(function(w){tot+=S.why[w[0]]||0});
  var top=WHY.slice().sort(function(x,y){return (S.why[y[0]]||0)-(S.why[x[0]]||0)})[0];
  var html='<h2 class="sec">Mistake coach</h2><div class="card pad">'+(tot?WHY.map(function(w){var n=S.why[w[0]]||0,p=Math.round(100*n/tot);return '<div class="dbar"><span>'+w[1]+'</span><div class="bar-t"><i data-w="'+p+'"></i></div><b>'+n+'</b></div>'}).join("")+'<div class="coach">'+ic("bulb")+'<span><b>Your biggest point-loser: '+esc(top[1].toLowerCase())+'.</b> '+esc(top[2])+'</span></div>':'<p class="muted">After a wrong answer, tap why you missed it. The coach will show which habit costs you the most points — and what to do about it.</p>')+'</div>'+
   '<h2 class="sec">Backup file</h2><div class="card pad"><p class="muted">Save all your progress as a file, then open it on another phone or computer.</p><div class="row"><button class="btn" onclick="backupDownload()">'+ic("download")+'Download backup file</button><label class="btn">'+ic("save")+'Import backup file<input type="file" accept=".json,application/json" hidden onchange="backupImport(this)"></label></div></div>';
  var crs=a.querySelector(".crgrid");if(crs)crs.insertAdjacentHTML("afterend",html);else a.insertAdjacentHTML("beforeend",html);paintBars()};

/* ---------- formula of the day ---------- */
function formulaOfDay(){var all=[];FORMULAS.forEach(function(g){g.f.forEach(function(r){all.push([g.h,r[0],r[1]])})});var n=0,t=dayStr();for(var i=0;i<t.length;i++)n=n*7+t.charCodeAt(i);return all[Math.abs(n)%all.length]}
var _vh3=viewHome;viewHome=function(a){_vh3(a);var f=formulaOfDay(),anchor=a.querySelector(".lvstrip")||a.querySelector(".t-head");
  if(anchor)anchor.insertAdjacentHTML("afterend",'<div class="card fod"><span class="fod-ic">'+ic("sigma")+'</span><div><small>Formula of the day · '+esc(f[0])+'</small><b>'+esc(f[1])+'  →  '+esc(f[2])+'</b></div><button class="btn sm ghost" onclick="go(\'/formulas\')">All formulas</button></div>')};

/* ---------- installable app (works on your own https site) ---------- */
var INSTALL=null;
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();INSTALL=e;var t=el("tbTools");if(t&&!el("instBtn"))t.insertAdjacentHTML("afterbegin",'<button class="tb-btn" id="instBtn" title="Install the app" onclick="installApp()">'+ic("download")+'</button>')});
function installApp(){if(!INSTALL)return;INSTALL.prompt();INSTALL=null;var b=el("instBtn");if(b)b.remove()}
try{if("serviceWorker" in navigator&&/^https?:/.test(location.protocol)&&document.querySelector('link[rel="manifest"]'))navigator.serviceWorker.register("sw.js").catch(function(){})}catch(e){}

Object.assign(RU,{"Mistake coach":"Тренер ошибок","Backup file":"Файл копии","Download backup file":"Скачать файл копии","Import backup file":"Загрузить файл копии","All formulas":"Все формулы","Modeling real situations":"Моделирование реальных ситуаций","Problem-solving toolkit":"Инструменты решения задач","Didn't know the rule":"Не знал правило","Careless slip":"Невнимательность","Misread the question":"Неверно прочитал вопрос","Rushed / out of time":"Спешил / не хватило времени"});
(function(){var c=`
.whyc{margin-top:12px;padding:12px 14px;border-radius:14px;background:var(--soft);font-size:14px}.whyc b{display:inline-flex;align-items:center;gap:6px;margin-bottom:8px}.whyc .ic{width:16px;height:16px}
.coach{display:flex;gap:10px;align-items:flex-start;margin-top:12px;padding:12px;border-radius:12px;background:color-mix(in srgb,var(--yel) 14%,var(--paper));font-size:14px}.coach .ic{color:var(--yel);flex:none}
.fod{display:flex;align-items:center;gap:14px;padding:14px 18px;margin-bottom:12px;flex-wrap:wrap}.fod>div{flex:1;min-width:200px}.fod small{display:block;color:var(--ink2);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}.fod b{font-family:var(--mono);font-size:17px}
.fod-ic{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;color:var(--blue);background:color-mix(in srgb,var(--blue) 14%,transparent);flex:none}
label.btn{cursor:pointer}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
