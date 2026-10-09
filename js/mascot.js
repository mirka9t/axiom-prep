/* =====================================================================
   AXIOM — Axi the axolotl (brand mascot)
   moods · animations · looks that grow with your level · music · celebrations
   ===================================================================== */
if(!S.unitCeleb)S.unitCeleb={};
var AXI_TIERS=[[25,"crown","a golden crown"],[15,"cap","a graduation cap"],[10,"phones","headphones"],[5,"star","a glowing star"]];
function axiLook(lv){lv=lv||level();for(var i=0;i<AXI_TIERS.length;i++)if(lv>=AXI_TIERS[i][0])return AXI_TIERS[i][1];return ""}
function AXI(mood,size,cls,look){mood=mood||"happy";size=size||120;look=look===undefined?axiLook():look;
  var eyes=mood==="sleep"?'<path d="M70 88 q8 6 16 0 M114 88 q8 6 16 0" stroke="#2b2340" stroke-width="4" fill="none" stroke-linecap="round"/>':
    '<g class="axi-eyes"><ellipse cx="78" cy="'+(mood==="think"?84:88)+'" rx="9" ry="10" fill="#2b2340"/><ellipse cx="122" cy="'+(mood==="think"?84:88)+'" rx="9" ry="10" fill="#2b2340"/><circle cx="81" cy="'+(mood==="think"?80:84)+'" r="3.2" fill="#fff"/><circle cx="125" cy="'+(mood==="think"?80:84)+'" r="3.2" fill="#fff"/></g>';
  var mouth={happy:'<path d="M88 106 Q100 118 112 106" stroke="#7a2a4a" stroke-width="4" fill="none" stroke-linecap="round"/>',
    cheer:'<path d="M86 104 Q100 126 114 104 Z" fill="#7a2a4a"/><path d="M93 113 Q100 120 107 113 Z" fill="#ff7aa8"/>',
    sad:'<path d="M90 114 Q100 106 110 114" stroke="#7a2a4a" stroke-width="4" fill="none" stroke-linecap="round"/>',
    wow:'<ellipse cx="100" cy="110" rx="7" ry="9" fill="#7a2a4a"/>',think:'<path d="M92 110 Q102 106 110 111" stroke="#7a2a4a" stroke-width="4" fill="none" stroke-linecap="round"/>',
    sleep:'<path d="M93 108 Q100 112 107 108" stroke="#7a2a4a" stroke-width="3.5" fill="none" stroke-linecap="round"/>'}[mood]||"";
  var arms=mood==="cheer"?'<g class="axi-armL"><ellipse cx="54" cy="122" rx="9" ry="20" fill="#ffb3d1" transform="rotate(40 54 122)"/></g><g class="axi-armR"><ellipse cx="146" cy="122" rx="9" ry="20" fill="#ffb3d1" transform="rotate(-40 146 122)"/></g>':
    mood==="think"?'<ellipse cx="66" cy="148" rx="9" ry="16" fill="#ffb3d1" transform="rotate(20 66 148)"/><ellipse cx="128" cy="124" rx="8" ry="15" fill="#ffb3d1" transform="rotate(-140 128 124)"/>':
    '<g class="axi-armL"><ellipse cx="62" cy="150" rx="9" ry="16" fill="#ffb3d1" transform="rotate(25 62 150)"/></g><g class="axi-armR"><ellipse cx="138" cy="150" rx="9" ry="16" fill="#ffb3d1" transform="rotate(-25 138 150)"/></g>';
  function gill(x,y,a){return '<ellipse cx="'+x+'" cy="'+y+'" rx="17" ry="7" transform="rotate('+a+' '+x+' '+y+')" fill="url(#axg2)"/>'}
  var gills='<g class="axi-gillL">'+gill(36,64,-35)+gill(30,84,-8)+gill(34,104,22)+'</g><g class="axi-gillR">'+gill(164,64,35)+gill(170,84,8)+gill(166,104,-22)+'</g>';
  var acc={star:'<g class="axi-acc"><polygon points="152,30 156,40 167,41 158,48 161,59 152,53 143,59 146,48 137,41 148,40" fill="#ffd34d" stroke="#e8a21c" stroke-width="1.5"/></g>',
    phones:'<g class="axi-acc"><path d="M50 84 Q50 34 100 34 Q150 34 150 84" stroke="#3b3355" stroke-width="7" fill="none"/><rect x="40" y="76" width="16" height="26" rx="6" fill="var(--violet)"/><rect x="144" y="76" width="16" height="26" rx="6" fill="var(--violet)"/></g>',
    cap:'<g class="axi-acc"><polygon points="100,22 150,40 100,58 50,40" fill="#2b2340"/><rect x="80" y="44" width="40" height="14" rx="3" fill="#2b2340"/><path d="M146 41 L148 66" stroke="#ffd34d" stroke-width="3"/><circle cx="148" cy="68" r="4" fill="#ffd34d"/></g>',
    crown:'<g class="axi-acc"><path d="M70 50 L76 24 L90 40 L100 18 L110 40 L124 24 L130 50 Z" fill="#ffd34d" stroke="#e8a21c" stroke-width="2"/><circle cx="100" cy="30" r="4" fill="#ef4f6b"/></g>'}[look]||"";
  return '<svg class="axi '+(cls||"")+' m-'+mood+'" viewBox="0 0 200 200" width="'+size+'" height="'+size+'" aria-label="Axi the axolotl"><defs><linearGradient id="axg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ab6"/><stop offset="1" stop-color="#a87bff"/></linearGradient></defs>'+
   '<path class="axi-tail" d="M140 160 Q186 150 182 120 Q170 140 138 146 Z" fill="#ff9ec7"/>'+
   '<ellipse cx="100" cy="150" rx="46" ry="36" fill="#ffb3d1"/><ellipse cx="100" cy="158" rx="28" ry="20" fill="#ffd3e6"/>'+
   '<polygon points="100,140 112,162 88,162" fill="#ffd34d" stroke="#e8a21c" stroke-width="1.5"/><path d="M92 156 H108" stroke="#e8a21c" stroke-width="1.5"/>'+arms+
   '<ellipse cx="80" cy="184" rx="13" ry="7" fill="#ff9ec7"/><ellipse cx="120" cy="184" rx="13" ry="7" fill="#ff9ec7"/>'+
   '<g class="axi-head">'+gills+'<ellipse cx="100" cy="90" rx="62" ry="50" fill="#ffc4dc"/><ellipse class="axi-ck" cx="64" cy="104" rx="10" ry="6" fill="#ff8fb8" opacity=".75"/><ellipse class="axi-ck" cx="136" cy="104" rx="10" ry="6" fill="#ff8fb8" opacity=".75"/>'+eyes+
   '<g class="axi-mouth">'+mouth+'</g><g class="axi-talk"><ellipse class="axi-tm" cx="100" cy="109" rx="8.5" ry="1.6" fill="#7a2a4a"/><ellipse class="axi-tt" cx="100" cy="110" rx="2" ry="0" fill="#ff7aa8"/></g>'+acc+'</g></svg>'}

/* ---------- music (Web Audio, no files) ---------- */
var _actx=null;function audio(){if(S.sfx===false)return null;try{_actx=_actx||new (window.AudioContext||window.webkitAudioContext)();if(_actx.state==="suspended")_actx.resume();return _actx}catch(e){return null}}
function note(c,f,t,d,type,v){var o=c.createOscillator(),g=c.createGain();o.type=type||"triangle";o.frequency.value=f;var vol=(v||.12)*(S.sfxVol===undefined?1:S.sfxVol);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol),t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.05)}
function jingle(kind){var c=audio();if(!c)return;var t=c.currentTime+.05,N={C4:261.63,E4:329.63,G4:392,A4:440,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,C6:1046.5,E6:1318.5,G6:1568};
  var seq=kind==="unit"?[["G4",0,.16],["C5",.16,.16],["E5",.32,.16],["G5",.48,.32],["E5",.86,.14],["G5",1.0,.6],["C6",1.0,.9]]:kind==="level"?[["C5",0,.12],["E5",.1,.12],["G5",.2,.12],["C6",.3,.5],["G5",.3,.5]]:[["E5",0,.12],["G5",.12,.12],["C6",.24,.36]];
  seq.forEach(function(s){note(c,N[s[0]],t+s[1],s[2]+.25,"triangle",.11);note(c,N[s[0]]/2,t+s[1],s[2]+.2,"sine",.05)});
  if(kind==="unit")[["C4",1.0],["E4",1.0],["G4",1.0]].forEach(function(s){note(c,N[s[0]],t+s[1],1.3,"sine",.06)});
  if(kind!=="lesson")for(var k=0;k<6;k++)note(c,2000+Math.random()*1800,t+0.9+k*.07,.12,"sine",.025)}

/* ---------- celebration queue ---------- */
var CELQ=[],CELON=false;function celebrate(kind,data){CELQ.push([kind,data]);if(!CELON)celNext()}
function celNext(){var x=CELQ.shift();if(!x){CELON=false;return}CELON=true;var kind=x[0],d=x[1]||{},o=document.createElement("div");o.className="celeb c-"+kind;
  function close(){o.classList.add("out");setTimeout(function(){o.remove();celNext()},350)}
  if(kind==="lesson"){o.innerHTML='<div class="cel-card small">'+AXI("cheer",120,"axi-jump")+'<b>Lesson complete!</b><small>'+esc(d.t||"")+'</small><span class="cel-xp">'+ic("sparkles")+'+10 XP</span></div>';document.body.appendChild(o);jingle("lesson");setTimeout(close,2300);o.onclick=close;return}
  if(kind==="level"){var lk=axiLook(d.lv),prev=axiLook(d.lv-1),newLook=lk&&lk!==prev,T=AXI_TIERS.filter(function(t){return t[1]===lk})[0];
    o.innerHTML='<div class="cel-card">'+AXI("cheer",150,"axi-jump",lk)+'<div class="cel-lv"><small>LEVEL</small><b>'+d.lv+'</b></div><h2>Level up!</h2>'+(newLook?'<p class="cel-new">'+ic("sparkles")+'New look unlocked: Axi now has '+T[2]+'!</p>':'<p>Every level makes Axi proud. Keep going!</p>')+'<button class="btn pri" id="celOk">Awesome</button></div>';
    document.body.appendChild(o);confetti(110);el("celOk").onclick=close;return}
  if(kind==="unit"){var u=d.u,i=UNITS.indexOf(u),nx=UNITS.slice(i+1).filter(function(x){return x.id!=="words"})[0],pv=UNITS.slice(0,i).filter(function(x){return x.id!=="words"}).slice(-1)[0];
    o.innerHTML='<div class="cel-unit"><div class="cel-tower"><div class="ct-node top">'+ic("crownf")+'<span>'+(nx?esc(nx.title):"Course complete")+'</span></div><div class="ct-node mid done">'+ic("check")+'<span>'+esc(u.title)+'</span></div><div class="ct-node low done">'+ic("check")+'<span>'+(pv?esc(pv.title):"Start")+'</span></div><div class="ct-axi">'+AXI("cheer",110)+'</div></div>'+
     '<div class="cel-txt"><span class="eyebrow">UNIT COMPLETE</span><h1>'+esc(u.title)+'</h1><p>All '+u.lessons.length+' lessons done. Axi jumped to the top — and so did you.</p><div class="cel-stats"><div><b>'+u.lessons.length+'</b><small>lessons</small></div><div><b>'+crowns(u)+'/5</b><small>crowns</small></div><div><b>'+level()+'</b><small>level</small></div></div>'+
     '<div class="row" style="justify-content:center">'+(nx?'<button class="btn pri" id="celNx">'+ic("play")+'Next: '+esc(nx.title)+'</button>':'')+'<button class="btn" id="celQz">'+ic("target")+'Unit quiz</button><button class="btn ghost" id="celX">Close</button></div></div></div>';
    document.body.appendChild(o);jingle("unit");setTimeout(function(){confetti(220)},1150);setTimeout(function(){confetti(140)},1700);
    el("celX").onclick=close;el("celQz").onclick=function(){close();startSet(u.id,"quiz")};if(nx)el("celNx").onclick=function(){close();go("/unit/"+nx.id)};return}
  CELON=false}

/* ---------- hooks ---------- */
var _axXp=addXp;addXp=function(n){var b=level();_axXp(n);if(level()>b&&!S.axiOff){document.querySelectorAll(".modal.lvl").forEach(function(m){m.remove()});celebrate("level",{lv:level()})}};
var _axLf=lpFinish;lpFinish=function(){var P=LP,u=P&&P.u,before=u?u.lessons.filter(function(l){return S.lessons[u.id+"/"+l.id]}).length:0,was=P&&S.lessons[P.key];_axLf();if(!u)return;
  var after=u.lessons.filter(function(l){return S.lessons[u.id+"/"+l.id]}).length;if(!was&&!S.axiOff)celebrate("lesson",{t:P.l.t});
  var st=el("plStage");if(st&&!S.axiOff){var h=st.querySelector(".bigcheck");if(h)h.outerHTML='<div class="axi-done">'+AXI("cheer",130,"axi-jump")+'</div>'}
  if(after===u.lessons.length&&before<after&&!S.unitCeleb[u.id]&&u.id!=="words"){S.unitCeleb[u.id]=dayStr();saveS();setTimeout(function(){celebrate("unit",{u:u})},400)}};

/* streaks in practice + encouragement after mistakes */
var AXI_ENC=["Axolotls regrow what they lose — every mistake helps your brain rebuild stronger.","That's data, not failure. Read the why below, then try one more.","Even 800 scorers miss this type at first. You've got this!","Slow down on the next one — underline what's being asked.","Mistakes now mean fewer mistakes on test day."];
var _axFq=finishQ;finishQ=function(ok,it,ct){var R=RUN;_axFq(ok,it,ct);if(!R||S.axiOff)return;R.axStreak=ok?(R.axStreak||0)+1:0;var ex=el("exbox");
  if(!ok&&ex&&!ex.querySelector(".axi-tip"))(ex.querySelector(".explain")||ex.lastElementChild||ex).insertAdjacentHTML(ex.querySelector(".explain")?"afterend":"beforeend",'<div class="axi-tip">'+AXI("sad",56,"axi-bob")+'<span>'+esc(AXI_ENC[Math.floor(Math.random()*AXI_ENC.length)])+'</span></div>');
  if(ok&&[3,5,10,15].indexOf(R.axStreak)>-1){var d=document.createElement("div");d.className="axi-pop";d.innerHTML=AXI("cheer",70,"axi-jump")+'<b>'+R.axStreak+' in a row!</b>';document.body.appendChild(d);try{jingle("lesson")}catch(e){}setTimeout(function(){d.classList.add("out")},1600);setTimeout(function(){d.remove()},2100)}};
var _axSr=showResults;showResults=function(){var R=RUN;_axSr();if(!R||S.axiOff)return;var c=document.querySelector(".q-card.result");if(!c||c.querySelector(".axi"))return;var n=R.items?R.items.length:1,p=n?R.correct/n:0,m=p>=.8?"cheer":p>=.5?"happy":"think";
  var big=c.querySelector(".big-em");var h=AXI(m,110,m==="cheer"?"axi-jump":"axi-bob");if(big)big.outerHTML='<div class="axi-res">'+h+'</div>';else c.insertAdjacentHTML("afterbegin",'<div class="axi-res">'+h+'</div>');
  c.insertAdjacentHTML("beforeend",'<p class="axi-say">'+(p>=.8?"Axi is doing a happy dance!":p>=.5?"Solid work — review the misses and you'll be unstoppable.":"Every expert started here. Let's fix these together — open Review.")+'</p>')};

/* Today: Axi greets you */
function axiMessage(){var nl=0;UNITS.forEach(function(u){u.lessons.forEach(function(l){if(S.lessons[u.id+"/"+l.id])nl++})});var mis=(S.mistakes||[]).length,h=new Date().getHours(),nm=(S.profile&&S.profile.name)||"";
  if(!nl)return "Hi"+(nm?" "+nm:"")+"! I'm Axi. Let's start with Step 1 together — one lesson at a time.";
  if(S.streak&&S.streak.c>=2)return "Day "+S.streak.c+" of your streak! Let's keep the fire going today.";
  if(mis>=3)return "You have "+mis+" mistakes waiting in Review. Fixing them is the fastest way to raise your score!";
  if(h>=22||h<5)return "It's late! A short review now, then sleep — sleep is when memory gets saved.";
  return ["Ready for today's lesson? I'll be right here cheering.","Small steps every day beat cramming. Let's do one lesson!","Want a challenge? Try the Reasoning Gym after your lesson.","Tip: tap a dotted word to see it in Russian."][Math.floor(Math.random()*4)]}
var _axHome=viewHome;viewHome=function(a){_axHome(a);if(S.axiOff)return;var th=a.querySelector(".t-head");if(!th||a.querySelector(".axi-greet"))return;
  th.insertAdjacentHTML("afterend",'<div class="axi-greet" onclick="axiPoke(this)">'+AXI("happy",96,"axi-bob")+'<div class="axi-bubble">'+esc(axiMessage())+'<small>Axi · your AXIOM buddy · Level '+level()+(axiLook()?' · wearing '+AXI_TIERS.filter(function(t){return t[1]===axiLook()})[0][2]:'')+'</small></div></div>')};
function axiPoke(box){var s=box.querySelector(".axi");if(s){s.classList.remove("axi-jump");void s.getBoundingClientRect();s.classList.add("axi-jump")}try{jingle("lesson")}catch(e){}var b=box.querySelector(".axi-bubble");if(b)b.firstChild.nodeValue=["You poked me! Let's learn something 😄","Did you know? Axolotls can regrow their hearts. You can regrow forgotten formulas!","Try a Speed drill — 60 seconds of mental maths.","Your next frontier is waiting in the AXIOM Mirror."][Math.floor(Math.random()*4)]}
/* splash, help & sign-in */
(function(){var sp=document.querySelector("#splash .sp-in");if(sp&&!S.axiOff)sp.insertAdjacentHTML("afterbegin",'<div class="sp-axi">'+AXI("cheer",110,"axi-jump")+'</div>')})();
var _axHelp=helpOpen;helpOpen=function(){_axHelp();var m=document.querySelector(".modal.help .mbox");if(m&&!S.axiOff&&!m.querySelector(".axi"))m.insertAdjacentHTML("afterbegin",'<div style="text-align:center">'+AXI("happy",84,"axi-bob")+'</div>')};
var _axGate=accGate;accGate=function(md){_axGate(md);var c=document.querySelector(".gate-card h1");if(c&&!document.querySelector(".gate-card .axi"))c.insertAdjacentHTML("beforebegin",'<div style="text-align:center;margin-top:6px">'+AXI("happy",90,"axi-bob")+'</div>')};
/* settings */
var _axSet=settingsOpen;settingsOpen=function(){_axSet();var set=document.querySelector(".modal.settings .set");if(!set)return;set.insertAdjacentHTML("afterbegin",'<div class="setrow"><div><b>Axi the axolotl</b><small>Your mascot: greetings, cheers and celebrations</small></div><button class="sw'+(S.axiOff?"":" on")+'" id="swAxi"><i></i></button></div>');el("swAxi").onclick=function(){S.axiOff=!S.axiOff;saveS();this.classList.toggle("on",!S.axiOff)};trUI(set)};
Object.assign(RU,{"Lesson complete!":"Урок пройден!","Level up!":"Новый уровень!","Awesome":"Супер","UNIT COMPLETE":"РАЗДЕЛ ПРОЙДЕН","Unit quiz":"Тест раздела","Axi the axolotl":"Акси-аксолотль"});

(function(){var c=`
.axi{display:inline-block;overflow:visible}.axi .axi-gillL{transform-box:view-box;transform-origin:52px 84px;animation:gillL 2.4s ease-in-out infinite}.axi .axi-gillR{transform-box:view-box;transform-origin:148px 84px;animation:gillR 2.4s ease-in-out infinite}
@keyframes gillL{50%{transform:rotate(-7deg)}}@keyframes gillR{50%{transform:rotate(7deg)}}
.axi .axi-eyes{transform-box:view-box;transform-origin:100px 88px;animation:blink 4.5s infinite}@keyframes blink{0%,94%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
.axi .axi-tail{transform-box:view-box;transform-origin:140px 150px;animation:tail 1.8s ease-in-out infinite}@keyframes tail{50%{transform:rotate(8deg)}}
.axi.m-cheer .axi-armL{transform-box:view-box;transform-origin:66px 136px;animation:wave .6s ease-in-out infinite alternate}.axi.m-cheer .axi-armR{transform-box:view-box;transform-origin:134px 136px;animation:wave2 .6s ease-in-out infinite alternate}
@keyframes wave{to{transform:rotate(-14deg)}}@keyframes wave2{to{transform:rotate(14deg)}}
.axi .axi-acc{animation:accGlow 2s ease-in-out infinite}
.axi .axi-talk{display:none}.axi.talking .axi-talk{display:inline}.axi.talking .axi-mouth{display:none}
.axi .axi-head{transform-box:view-box;transform-origin:100px 132px}.axi.talking .axi-head{animation:axTalk .5s ease-in-out infinite alternate}
@keyframes axTalk{0%{transform:rotate(-2.4deg) translateY(0)}100%{transform:rotate(2.4deg) translateY(-1.6px)}}
.axi.talking .axi-gillL,.axi.talking .axi-gillR{animation-duration:.85s}.axi.talking .axi-ck{opacity:.95}@keyframes accGlow{50%{filter:drop-shadow(0 0 6px #ffd34d)}}
.axi-bob{animation:bob 3s ease-in-out infinite}@keyframes bob{50%{transform:translateY(-6px)}}
.axi-jump{animation:jump .9s cubic-bezier(.3,1.6,.5,1) 2}@keyframes jump{0%{transform:translateY(0) scale(1,1)}15%{transform:translateY(4px) scale(1.08,.9)}50%{transform:translateY(-28px) scale(.95,1.06)}80%{transform:translateY(0) scale(1.05,.95)}100%{transform:none}}
html.calm .axi,html.calm .axi *{animation:none!important}
.axi-greet{display:flex;align-items:center;gap:14px;margin:6px 0 14px;cursor:pointer}.axi-greet .axi{flex:none}
.axi-bubble{position:relative;padding:14px 16px;border-radius:18px;background:var(--paper);border:1px solid var(--line);box-shadow:var(--sh);font-size:15.5px;line-height:1.5;max-width:560px}
.axi-bubble::before{content:"";position:absolute;left:-9px;top:50%;width:16px;height:16px;background:var(--paper);border-left:1px solid var(--line);border-bottom:1px solid var(--line);transform:translateY(-50%) rotate(45deg)}
.axi-bubble small{display:block;margin-top:4px;color:var(--ink2);font-size:12px}
.axi-tip{display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:8px 12px;border-radius:14px;background:color-mix(in srgb,#ff9ec7 14%,var(--paper));border:1px solid color-mix(in srgb,#ff9ec7 45%,var(--line));font-size:14px}.axi-tip .axi{flex:none}
.axi-pop{position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:210;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 18px;border-radius:20px;background:var(--glass);backdrop-filter:blur(14px);border:1px solid var(--line);box-shadow:0 20px 50px rgba(0,0,0,.3);animation:fpop .4s cubic-bezier(.3,1.6,.5,1) both;transition:opacity .4s,transform .4s}.axi-pop.out{opacity:0;transform:translateX(-50%) translateY(-20px)}.axi-pop b{font-family:var(--disp);font-size:20px}
.axi-res{display:grid;place-items:center;margin-bottom:4px}.axi-say{margin-top:12px;color:var(--ink2);font-size:14px}.axi-done{display:grid;place-items:center}
.sp-axi{margin-bottom:-18px}
.celeb{position:fixed;inset:0;z-index:260;display:grid;place-items:center;padding:20px;background:radial-gradient(60% 60% at 50% 40%,color-mix(in srgb,var(--violet) 30%,rgba(6,9,16,.75)),rgba(6,9,16,.82));animation:fadeUp .3s ease both;transition:opacity .35s}.celeb.out{opacity:0}
.celeb.c-lesson{background:rgba(6,9,16,.35);pointer-events:auto}
.cel-card{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;padding:26px 32px;border-radius:28px;background:var(--paper);border:1px solid var(--line);box-shadow:0 30px 80px rgba(0,0,0,.45);animation:fpop .5s cubic-bezier(.3,1.5,.5,1) both;max-width:420px}
.cel-card.small{padding:18px 26px}.cel-card b{font-family:var(--disp);font-size:24px}.cel-card small{color:var(--ink2)}.cel-xp{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:999px;background:color-mix(in srgb,var(--yel) 18%,transparent);color:#c98500;font-weight:800}.cel-xp .ic{width:15px;height:15px}
.cel-lv{display:flex;flex-direction:column;align-items:center;margin-top:-6px}.cel-lv small{font-size:11px;font-weight:800;letter-spacing:.2em;color:var(--ink2)}.cel-lv b{font:900 64px/1 var(--disp);background:linear-gradient(135deg,var(--blue),var(--violet));-webkit-background-clip:text;background-clip:text;color:transparent;animation:fpop .6s .3s cubic-bezier(.3,1.6,.5,1) both}
.cel-card h2{margin:4px 0}.cel-new{display:flex;align-items:center;gap:6px;color:#c98500;font-weight:700}.cel-new .ic{width:16px;height:16px}
.cel-unit{display:flex;gap:30px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:860px;padding:26px;border-radius:30px;background:var(--paper);border:1px solid var(--line);box-shadow:0 30px 90px rgba(0,0,0,.5);animation:fpop .5s cubic-bezier(.3,1.4,.5,1) both}
.cel-tower{position:relative;width:240px;height:430px}.ct-node{position:absolute;left:30px;right:30px;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:16px;background:var(--soft);border:2px solid var(--line);font-size:13px;font-weight:700}.ct-node .ic{width:18px;height:18px;flex:none}.ct-node span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ct-node.low{bottom:10px}.ct-node.mid{bottom:150px}.ct-node.top{bottom:290px;border-color:#f5b02e;background:color-mix(in srgb,#ffd34d 18%,var(--paper))}.ct-node.top .ic{color:#f5b02e}.ct-node.done{border-color:var(--grn)}.ct-node.done .ic{color:var(--grn)}
.cel-tower::before{content:"";position:absolute;left:50%;top:150px;bottom:40px;border-left:3px dashed var(--line)}
.ct-axi{position:absolute;left:50%;bottom:52px;transform:translateX(-50%);animation:climb 1.7s cubic-bezier(.4,1.4,.5,1) .35s both;line-height:0}
@keyframes climb{0%{bottom:52px}28%{bottom:206px}36%{bottom:192px}66%{bottom:346px}76%{bottom:328px}100%{bottom:332px}}
.cel-txt{flex:1;min-width:260px;text-align:center}.cel-txt h1{font-family:var(--disp);font-size:clamp(28px,4vw,40px);margin:6px 0}.cel-txt p{color:var(--ink2)}
.cel-stats{display:flex;gap:10px;justify-content:center;margin:14px 0}.cel-stats div{min-width:84px;padding:10px;border-radius:14px;background:var(--soft)}.cel-stats b{display:block;font:800 24px var(--disp)}.cel-stats small{color:var(--ink2)}
@media(max-width:640px){.cel-unit{padding:16px;gap:10px}.cel-tower{width:210px;height:360px}.ct-node.mid{bottom:124px}.ct-node.top{bottom:238px}.cel-tower::before{top:130px}.ct-axi .axi{width:86px;height:86px}@keyframes climb{0%{bottom:52px}28%{bottom:178px}36%{bottom:166px}66%{bottom:292px}76%{bottom:276px}100%{bottom:280px}}}
`;var s=document.createElement("style");s.textContent=c;document.head.appendChild(s)})();
