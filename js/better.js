/* =====================================================================
   AXIOM — social & motivation layer
   device league · duels · streak freezes · daily goal · my flashcards
   certificates · guided tour · sound volume
   ===================================================================== */
ICONS.snow="M12 2v20 M4.9 4.9l14.2 14.2 M2 12h20 M4.9 19.1 19.1 4.9 M9 4l3 2 3-2 M9 20l3-2 3 2";ICONS.swords="M14 4l6-1-1 6-9 9-4-4z M5 15l4 4 M3 21l3-3";ICONS.medal="M12 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8 10 6 2h4l2 5 2-5h4l-2 8";
if(S.freeze===undefined)S.freeze=0;if(!S.goalHit)S.goalHit={};if(!S.mycards)S.mycards=[];if(!S.duels)S.duels={};if(S.sfxVol===undefined)S.sfxVol=1;

/* ---------- sound volume ---------- */
var _toneB=tone;tone=function(c,f,t0,dur,type,vol,f2){_toneB(c,f,t0,dur,type,Math.max(0.0002,(vol||.15)*S.sfxVol),f2)};

/* ---------- streak freezes ---------- */
function freezeNotices(){if(S._froze){var _fz=S._froze;delete S._froze;saveS();setTimeout(function(){toast("❄ A streak freeze saved your "+_fz+"-day streak!");sfx("badge")},2200)}
  if(S._earnedFreeze){var _ef=S._earnedFreeze;delete S._earnedFreeze;saveS();setTimeout(function(){toast("❄ "+_ef+"-day streak! You earned a streak freeze ("+S.freeze+"/2).");sfx("badge")},4200)}}
freezeNotices();var _tsN=tickStreak;tickStreak=function(){_tsN();freezeNotices()};

/* ---------- daily goal celebration ---------- */
var _recB=record;record=function(uid,ok){_recB(uid,ok);var t=dayStr(),g=S.goalQ||20;if((S.days[t]||0)>=g&&!S.goalHit[t]){S.goalHit[t]=1;saveS();setTimeout(function(){confetti(160);sfx("level");addXp(15);
  var d=document.createElement("div");d.className="streakPop";d.innerHTML='<span class="sp-ic" style="background:radial-gradient(circle at 50% 60%,#7ef0b5,#16a86f)">'+ic("target")+'</span><b>Daily goal reached!</b><small>'+g+' questions today · +15 XP bonus</small>';document.body.appendChild(d);setTimeout(function(){d.classList.add("out")},2600);setTimeout(function(){d.remove()},3200)},600)}};

/* ---------- device league ---------- */
function leagueRows(){var users=accUsers(),rows=[];
  function sum(d){var w=0,L=d.log||{};for(var i=0;i<7;i++){var k=dayStr(-i);w+=(L[k]&&L[k].xp)||0}return w}
  Object.keys(users).forEach(function(u){var raw=null;try{raw=localStorage.getItem("z800_u_"+u)}catch(e){}if(!raw)return;var d;try{d=JSON.parse(raw)}catch(e){return}if(d.hideBoard&&u!==window.Z800_USER)return;
    var st=d.streak||{c:0,last:""},alive=st.last===dayStr()||st.last===dayStr(-1);
    rows.push({u:u,name:(d.profile&&d.profile.name)||users[u].name||u,xp:d.xp||0,week:sum(d),streak:alive?st.c:0,lessons:Object.keys(d.lessons||{}).length,q:d.answered||0,acc:d.answered?Math.round(100*(d.correctN||0)/d.answered):0,me:u===window.Z800_USER,duels:d.duels||{}})});
  return rows}
var LG={tab:"week"};
function viewLeague(a){var rows=leagueRows(),k=LG.tab==="all"?"xp":LG.tab==="streak"?"streak":"week";rows.sort(function(x,y){return y[k]-x[k]});
  var me=window.Z800_USER&&window.Z800_USER!=="__guest";
  a.innerHTML='<section><div class="pg-h"><div><h1>Device League</h1><p>Everyone with an AXIOM account on this device. Study together, push each other — friendly competition is one of the strongest motivators.</p></div><div class="seg">'+[["week","This week"],["all","All time"],["streak","Streaks"]].map(function(t){return '<button class="'+(LG.tab===t[0]?"on":"")+'" onclick="LG.tab=\''+t[0]+'\';viewLeague(el(\'app\'))">'+t[1]+'</button>'}).join("")+'</div></div>'+
   (!me?'<div class="card pad">'+ic("user")+' <b>Create an account to join the league.</b> <button class="btn sm pri" onclick="authOpen()">Sign in / Create account</button></div>':'')+
   (rows.length?'<div class="podium">'+[1,0,2].map(function(i){var r=rows[i];if(!r)return '<div class="pd-slot empty"></div>';return '<div class="pd-slot p'+(i+1)+(r.me?" me":"")+'"><span class="av big">'+esc(r.name.charAt(0).toUpperCase())+'</span><b>'+esc(r.name)+'</b><small>'+(k==="week"?r.week+" XP this week":k==="xp"?r.xp+" XP":r.streak+"-day streak")+'</small><div class="pd-bar"><span>'+(i+1)+'</span></div></div>'}).join("")+'</div>'+
    '<div class="card lg-table">'+rows.map(function(r,i){return '<div class="lg-row'+(r.me?" me":"")+'"><span class="lg-n">'+(i+1)+'</span><span class="av">'+esc(r.name.charAt(0).toUpperCase())+'</span><div class="lg-m"><b>'+esc(r.name)+(r.me?' <em>(you)</em>':'')+'</b><small>Level '+(1+Math.floor(r.xp/120))+' · '+r.lessons+' lessons · '+r.acc+'% accuracy</small></div><span class="lg-v">'+(k==="week"?r.week+" XP":k==="xp"?r.xp+" XP":ic("flame")+r.streak)+'</span></div>'}).join("")+'</div>':'<div class="empty card">No accounts yet on this device.</div>')+
   '<h2 class="sec">'+ic("swords")+' Duels</h2><div class="grid g2"><div class="card pad"><h3 class="h3">Start a duel</h3><p class="muted">10 questions. Share the code — your friend gets exactly the same questions.</p><div class="row"><select id="duU" class="search" style="max-width:240px"><option value="">All topics</option>'+UNITS.filter(function(u){return GEN.skills(u.id).length&&u.id!=="words"}).map(function(u){return '<option value="'+u.id+'">'+esc(u.title)+'</option>'}).join("")+'</select><button class="btn pri" onclick="duelCreate()">'+ic("swords")+'Create duel</button></div></div>'+
   '<div class="card pad"><h3 class="h3">Join a duel</h3><p class="muted">Enter the code your friend gave you.</p><div class="row"><input id="duCode" class="search" placeholder="e.g. QUAD-7K2P" style="max-width:220px;text-transform:uppercase"><button class="btn" onclick="duelJoin()">'+ic("play")+'Play</button></div></div></div>'+duelHistory(rows)+
   '<div class="lg-foot"><label class="gchk"><input type="checkbox" '+(S.hideBoard?"checked":"")+' onchange="S.hideBoard=this.checked;saveS();viewLeague(el(\'app\'))"> Hide me from the league on this device</label></div></section>';trUI(a)}
function duelHistory(rows){var codes={};rows.forEach(function(r){Object.keys(r.duels).forEach(function(c){(codes[c]=codes[c]||[]).push([r,r.duels[c]])})});var ks=Object.keys(codes).sort(function(a,b){return (codes[b][0][1].date||"")>(codes[a][0][1].date||"")?1:-1}).slice(0,6);if(!ks.length)return "";
  return '<h2 class="sec">Recent duels</h2><div class="grid g2">'+ks.map(function(c){var L=codes[c].sort(function(x,y){return (y[1].score-x[1].score)||(x[1].ms-y[1].ms)});return '<div class="card pad duel-c"><div class="dc-h"><b>'+esc(c)+'</b><small>'+esc(L[0][1].date||"")+'</small></div>'+L.map(function(p,i){return '<div class="dc-r'+(p[0].me?" me":"")+'"><span>'+(i===0?ic("crownf"):(i+1))+'</span><b>'+esc(p[0].name)+'</b><span>'+p[1].score+'/10 · '+Math.round(p[1].ms/1000)+' s</span></div>'}).join("")+(L.some(function(p){return p[0].me})?'':'<button class="btn sm" onclick="duelPlay(\''+c+'\')">Play this duel</button>')+'</div>'}).join("")+'</div>'}
function duelCode(uid){var A="ABCDEFGHJKMNPQRSTUVWXYZ23456789",s="";for(var i=0;i<4;i++)s+=A.charAt(Math.floor(Math.random()*A.length));return (uid?uid.toUpperCase():"ALL")+"-"+s}
function duelCreate(){var u=el("duU").value,c=duelCode(u);var m=modal('<div class="auth-hero">'+ic("swords")+'</div><h2>Duel created</h2><p class="muted" style="text-align:center">Share this code with your friend. You both get the same 10 questions.</p><div class="duel-code">'+c+'</div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="dcCopy">'+ic("save")+'Copy code</button><button class="btn pri" id="dcGo">'+ic("play")+'Play now</button></div>',"auth");
  el("dcCopy").onclick=function(){try{navigator.clipboard.writeText(c).then(function(){toast("Code copied")})}catch(e){toast(c)}};el("dcGo").onclick=function(){m.remove();duelPlay(c)};trUI(m)}
function duelJoin(){var c=(el("duCode").value||"").trim().toUpperCase();if(!/^[A-Z0-9]+-[A-Z0-9]{4}$/.test(c)){toast("Codes look like QUAD-7K2P");return}duelPlay(c)}
function duelItems(code){var pre=code.split("-")[0].toLowerCase(),units=pre!=="all"&&findUnit(pre)?[pre]:UNITS.filter(function(u){return GEN.skills(u.id).length&&["words","desmos","hard","traps","satday","solve"].indexOf(u.id)<0}).map(function(u){return u.id}),items=[],seen={};
  GEN.seed(hashStr("duel|"+code));for(var t=0;items.length<10&&t<60;t++){var u=units[Math.floor(GEN.rnd()*units.length)],it=GEN.make(u,[1,2,2,2,3][items.length%5]);if(it&&!seen[it.q]){seen[it.q]=1;items.push(it)}}GEN.unseed();return items}
function duelPlay(code){if(!window.Z800_USER||window.Z800_USER==="__guest"){toast("Create an account to play duels");authOpen();return}
  startRun({u:{id:"__duel",title:"Duel "+code,em:"⚔️",color:"#ffe6e0"},mode:"quiz",items:duelItems(code),i:0,correct:0,answered:false,duel:code,t0:Date.now()},"/run")}
var _srB=showResults;showResults=function(){var R=RUN;if(R&&R.duel){var ms=Date.now()-R.t0,prev=S.duels[R.duel];if(!prev||R.correct>prev.score||(R.correct===prev.score&&ms<prev.ms))S.duels[R.duel]={score:R.correct,ms:ms,date:dayStr()};saveS();addXp(10);
    var code=R.duel;_srB();var c=document.querySelector(".q-card.result");if(c){var L=leagueRows().filter(function(r){return r.duels[code]}).sort(function(x,y){return (y.duels[code].score-x.duels[code].score)||(x.duels[code].ms-y.duels[code].ms)});
      c.insertAdjacentHTML("beforeend",'<div class="duel-c" style="margin-top:14px;text-align:left"><div class="dc-h"><b>Duel '+esc(code)+'</b><small>'+Math.round(ms/1000)+' s</small></div>'+L.map(function(r,i){return '<div class="dc-r'+(r.me?" me":"")+'"><span>'+(i===0?ic("crownf"):(i+1))+'</span><b>'+esc(r.name)+'</b><span>'+r.duels[code].score+'/10 · '+Math.round(r.duels[code].ms/1000)+' s</span></div>'}).join("")+'<p class="muted" style="font-size:13px">Give your friend the code <b>'+esc(code)+'</b> — they can play it from the League page.</p></div>')}return}
  _srB()};

/* ---------- my flashcards ---------- */
function myCardsAll(){return S.mycards.map(function(c){return {f:c.f,b:c.b,k:"my#"+c.id,uid:"my"}})}
var _srsStartB=srsStart;srsStart=function(){var mine=myCardsAll(),t=dayStr(),due=mine.filter(function(c){var s=S.srs[c.k];return !s||s.due<=t});_srsStartB();if(!DECK||DECK.u.id!=="__srs"){if(due.length){DECK={u:{id:"__srs",title:"Smart flashcards"},cards:due.slice(0,20),i:0,flipped:false,known:0};go("/srs/run")}return}
  DECK.cards=DECK.cards.concat(due.slice(0,15))};
var _vsrsB=viewSRS;viewSRS=function(a){_vsrsB(a);a.insertAdjacentHTML("beforeend",'<h2 class="sec">'+ic("pen")+' My own cards</h2><div class="card pad"><p class="muted">Add anything you want to remember — a formula in your own words, a trap you fell for, an English word. Your cards join Smart flashcards automatically.</p><div class="mc-add"><input id="mcF" class="search" placeholder="Front (question)"><input id="mcB" class="search" placeholder="Back (answer)"><button class="btn pri" onclick="myCardAdd()">'+ic("pen")+'Add card</button></div><div id="mcList">'+myCardList()+'</div></div>');trUI(a)};
function myCardList(){return S.mycards.length?S.mycards.map(function(c){return '<div class="mc-row"><div><b>'+esc(c.f)+'</b><small>'+esc(c.b)+'</small></div><button class="tb-btn" title="Delete" onclick="myCardDel(\''+c.id+'\')">'+ic("x")+'</button></div>'}).join(""):'<p class="muted" style="margin:10px 0 0">No cards yet.</p>'}
function myCardAdd(){var f=(el("mcF").value||"").trim(),b=(el("mcB").value||"").trim();if(!f||!b){toast("Fill in both sides");return}S.mycards.unshift({id:Date.now().toString(36),f:f,b:b});saveS();el("mcF").value="";el("mcB").value="";el("mcList").innerHTML=myCardList();sfx("ok");toast("Card added to Smart flashcards")}
function myCardDel(id){S.mycards=S.mycards.filter(function(c){return c.id!==id});delete S.srs["my#"+id];saveS();el("mcList").innerHTML=myCardList()}

/* ---------- certificates ---------- */
function unitMastered(u){var st=unitStats(u);return st.ld>=st.lt&&(S.quiz[u.id]||0)>=80}
function certificate(id){var u=findUnit(id);if(!u)return;var nm=(S.profile&&S.profile.name)||(AUTH.user&&AUTH.user.user_metadata.name)||"AXIOM learner";
  pdfDoc("Certificate of mastery",u.title,'<div class="cert"><div class="cert-in"><small>AXIOM · SAT Math</small><h1>Certificate of Mastery</h1><p>This certifies that</p><h2>'+esc(nm)+'</h2><p>has completed every lesson and passed the unit quiz in</p><h3>'+esc(u.title)+'</h3><div class="cert-meta"><span>Quiz best: <b>'+(S.quiz[u.id]||0)+'%</b></span><span>Crowns: <b>'+crowns(u)+' / 5</b></span><span>Date: <b>'+dayStr()+'</b></span></div><div class="cert-seal">'+AXLOGO+'</div></div></div>')}
var _vuC=viewUnit;viewUnit=function(a,id,tab){_vuC(a,id,tab);var u=findUnit(id);if(!u)return;var r=a.querySelector(".uhero .row");if(r)r.insertAdjacentHTML("beforeend",unitMastered(u)?'<button class="btn gd" onclick="certificate(\''+id+'\')">'+ic("medal")+'Certificate</button>':'<button class="btn ghost" disabled title="Read all lessons and score 80%+ on the quiz">'+ic("medal")+'Certificate (locked)</button>')};

/* ---------- Today: freezes ---------- */
var _vhE=viewHome;viewHome=function(a){_vhE(a);var st=a.querySelectorAll(".stc")[1];if(st){var d=st.querySelector("div small");if(d)d.insertAdjacentHTML("afterend",'<span class="frz" title="Streak freezes protect your streak if you miss a day. Earn one every 7-day streak.">'+ic("snow")+S.freeze+'/2</span>')}};

/* ---------- guided tour ---------- */
var TOUR=[[".brand","This is AXIOM's menu. Use the small buttons above it to collapse it to icons, move it to the other side, or tuck it into the ☰ button. Drag its edge to resize. Click a group title to fold that group."],["#snav a[href='#/units']","Course — your step-by-step path from zero. Follow the steps in order."],["#snav a[href='#/diagnostic']","Not sure where to start? The diagnostic test builds a personal study guide."],[".srch-pill","Search everything and run commands. Shortcut: Ctrl + K."],["#qmTop","Tools: calculator, graphing calculator, scratchpad, focus mode, settings and more. Hover or click."],[".topbar .thsw","Light and dark mode — always here at the top."],["#acct","Your account. Each person on this device has their own progress."]];
function tourStart(i){i=i||0;var ov=el("tour");if(!ov){ov=document.createElement("div");ov.id="tour";document.body.appendChild(ov)}
  while(i<TOUR.length){var t=document.querySelector(TOUR[i][0]);if(t&&t.getBoundingClientRect().width>0)break;i++}
  if(i>=TOUR.length){ov.remove();S.seenTour=1;saveS();toast("Tour finished — enjoy AXIOM!");return}
  var t=document.querySelector(TOUR[i][0]),r=t.getBoundingClientRect(),pad=6,ru=S.uiLang==="ru";
  var below=r.bottom+180<window.innerHeight,left=Math.min(window.innerWidth-330,Math.max(10,r.left));
  ov.innerHTML='<div class="tr-hole" style="left:'+(r.left-pad)+'px;top:'+(r.top-pad)+'px;width:'+(r.width+pad*2)+'px;height:'+(r.height+pad*2)+'px"></div><div class="tr-card" style="left:'+left+'px;top:'+(below?r.bottom+14:Math.max(10,r.top-170))+'px"><small>'+(i+1)+' / '+TOUR.length+'</small><p>'+esc(TOUR[i][1])+'</p><div class="row" style="justify-content:space-between"><button class="btn sm ghost" onclick="el(\'tour\').remove();S.seenTour=1;saveS()">Skip</button><button class="btn sm pri" onclick="tourStart('+(i+1)+')">'+(i===TOUR.length-1?"Finish":"Next")+'</button></div></div>';sfx("tap")}
var _hoB=helpOpen;helpOpen=function(){_hoB();var m=document.querySelector(".modal.help .row");if(m)m.insertAdjacentHTML("afterbegin",'<button class="btn ghost" onclick="this.closest(\'.modal\').remove();tourStart(0)">'+ic("compass")+'Take the 30-second tour</button>')};

/* ---------- settings: sound volume ---------- */
var _soE=settingsOpen;settingsOpen=function(){_soE();var set=document.querySelector(".modal.settings .set");if(!set)return;var sw=el("swSfx"),row=sw&&sw.closest(".setrow");
  var h='<div class="setrow"><div><b>Effects volume</b><small>Answer chimes, pages, levels</small></div><input type="range" min="0" max="1.5" step="0.1" value="'+S.sfxVol+'" id="sfxVol" style="accent-color:var(--blue)"></div>';if(row)row.insertAdjacentHTML("afterend",h);else set.insertAdjacentHTML("beforeend",h);
  el("sfxVol").onchange=function(){S.sfxVol=+this.value;saveS();sfx("ok")}};

/* ---------- nav, routes, quick menu ---------- */
NAV.splice(NAV.length-1,0,["/league","League","trophy"]);navInit();TITLES.league="Device League";
var _qiB=quickItems;quickItems=function(){var l=_qiB();l.splice(l.length-1,0,["compass","Take the tour","tourStart(0)"],["trophy","Device League","go(\'/league\')"]);return l};buildTop();
var _rE=router;router=function(){var h=location.hash.replace(/^#/,"")||"/",p=h.split("/").filter(Boolean);
  if(p[0]==="league"){var a=el("app");a.classList.remove("fadein");void a.offsetWidth;a.classList.add("fadein");tickStreak();paintMini();markNav(h);var m=document.querySelector(".mainc");if(m)m.scrollTop=0;return viewLeague(a)}return _rE()};
Object.assign(RU,{"League":"Лига","Device League":"Лига устройства","Duels":"Дуэли","Start a duel":"Начать дуэль","Join a duel":"Присоединиться к дуэли","Create duel":"Создать дуэль","Play":"Играть","This week":"Эта неделя","All time":"За всё время","Streaks":"Серии","Recent duels":"Недавние дуэли","My own cards":"Мои карточки","Add card":"Добавить карточку","Certificate":"Сертификат","Take the tour":"Пройти обзор","Effects volume":"Громкость эффектов","Next":"Далее","Skip":"Пропустить","Finish":"Готово"});

(function(){var c=`
.podium{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:end;margin:6px 0 16px}
.pd-slot{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;animation:fadeUp .5s ease both}.pd-slot.empty{visibility:hidden}
.pd-slot .av.big{width:56px;height:56px;font-size:22px}.pd-slot.p1 .av.big{width:70px;height:70px;font-size:28px;box-shadow:0 0 0 4px #ffd76a}
.pd-slot b{font-size:15px}.pd-slot small{color:var(--ink2);font-size:12.5px}
.pd-bar{width:100%;border-radius:14px 14px 4px 4px;display:grid;place-items:center;color:#fff;font:900 26px var(--disp);margin-top:6px;animation:grow .8s cubic-bezier(.2,.8,.2,1) both;transform-origin:bottom}
.p1 .pd-bar{height:110px;background:linear-gradient(180deg,#ffd76a,#f5b02e)}.p2 .pd-bar{height:80px;background:linear-gradient(180deg,#d7dce8,#9aa3b8)}.p3 .pd-bar{height:62px;background:linear-gradient(180deg,#f0b48a,#c77a48)}
.pd-slot.me b{color:var(--blue)}
.lg-table{padding:6px}.lg-row{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px}.lg-row.me{background:color-mix(in srgb,var(--blue) 12%,transparent)}
.lg-n{width:24px;text-align:center;font-weight:800;color:var(--ink2)}.lg-m{flex:1;min-width:0}.lg-m small{display:block;color:var(--ink2);font-size:12px}.lg-m em{color:var(--blue);font-style:normal;font-size:12px}
.lg-v{font-weight:800;display:flex;align-items:center;gap:4px}.lg-v .ic{width:16px;height:16px;color:#ff8a3d}.lg-foot{margin-top:18px}
.sec .ic{width:20px;height:20px;vertical-align:-3px}
.duel-code{font:900 34px var(--mono);letter-spacing:.12em;text-align:center;padding:14px;border-radius:16px;background:var(--soft);border:2px dashed color-mix(in srgb,var(--blue) 50%,var(--line));margin-top:10px}
.duel-c .dc-h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}.duel-c .dc-h b{font-family:var(--mono)}.duel-c small{color:var(--ink2)}
.dc-r{display:grid;grid-template-columns:26px 1fr auto;gap:8px;align-items:center;padding:6px 8px;border-radius:10px;font-size:14px}.dc-r.me{background:color-mix(in srgb,var(--blue) 12%,transparent)}.dc-r .ic{width:16px;height:16px;color:#f5b02e}
.mc-add{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin:10px 0}@media(max-width:700px){.mc-add{grid-template-columns:1fr}}
.mc-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:var(--soft);margin-top:6px}.mc-row>div{flex:1;min-width:0}.mc-row small{display:block;color:var(--ink2)}
.frz{display:inline-flex;align-items:center;gap:3px;margin-top:3px;padding:1px 8px;border-radius:999px;font-size:11.5px;font-weight:800;color:#4fb3e8;background:color-mix(in srgb,#4fc3f7 14%,transparent)}.frz .ic{width:12px;height:12px}
#tour{position:fixed;inset:0;z-index:400}.tr-hole{position:fixed;border-radius:14px;box-shadow:0 0 0 9999px rgba(6,9,16,.62);border:2px solid var(--blue);transition:all .35s cubic-bezier(.3,1.2,.5,1);pointer-events:none}
.tr-card{position:fixed;width:min(320px,calc(100vw - 20px));padding:16px;border-radius:18px;background:var(--paper);border:1px solid var(--line);box-shadow:0 20px 60px rgba(0,0,0,.4);animation:fadeUp .3s ease both}.tr-card small{color:var(--blue);font-weight:800}.tr-card p{margin:6px 0 12px;line-height:1.5}
#printArea .cert{border:6px double #3d5cff;border-radius:16px;padding:30px;text-align:center;margin-top:10px}#printArea .cert-in h1{font-size:28pt;margin:6px 0 14px}#printArea .cert-in h2{font-size:24pt;color:#3d5cff;margin:6px 0}#printArea .cert-in h3{font-size:17pt;margin:6px 0 16px}
#printArea .cert-meta{display:flex;justify-content:center;gap:22px;font-size:11pt}#printArea .cert-seal{width:70px;height:70px;margin:20px auto 0}#printArea .cert-in small{letter-spacing:.2em;text-transform:uppercase;color:#545d74}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
bootRoute();
