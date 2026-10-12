/* =====================================================================
   AXIOM — Axi's voice
   talking mouth · real voice / chirps / silent · word-by-word captions
   math-aware read-aloud dock · voice settings
   ===================================================================== */
ICONS.vPause="M8 5v14 M16 5v14";ICONS.vPlay="M7 4l13 8-13 8z";ICONS.vNext="M5 5l10 7-10 7z M19 5v14";ICONS.vPrev="M19 5L9 12l10 7z M5 5v14";
ICONS.vMute="M11 5 6 9H3v6h3l5 4z M22 9l-6 6 M16 9l6 6";ICONS.vWave="M3 12h2 M7 8v8 M11 5v14 M15 8v8 M19 10v4";

/* ---------- settings (per user) ---------- */
if(!S.voice)S.voice={};
(function(v){var has=!!window.speechSynthesis;if(v.mode===undefined)v.mode=has?"voice":"chirp";if(v.rate===undefined)v.rate=1;if(v.pitch===undefined)v.pitch=1.25;
  if(v.rrate===undefined)v.rrate=1;if(v.auto===undefined)v.auto=true;if(v.buddy===undefined)v.buddy=true;if(v.tips===undefined)v.tips=true;if(v.vname===undefined)v.vname="";if(v.vnameRu===undefined)v.vnameRu=""})(S.voice);
function L2(en,ru){return S.uiLang==="ru"&&ru?ru:en}

/* browsers only allow sound after the first tap / key press */
var VG=false,VUNL=false;["pointerdown","keydown","touchstart"].forEach(function(t){document.addEventListener(t,function(){VG=true},{capture:true,passive:true})});
/* unlock speech + sound inside a real tap (iPhone / iPad need this once) */
function vUnlock(){if(VUNL)return;VUNL=true;VG=true;try{if(window.speechSynthesis&&window.SpeechSynthesisUtterance&&!speechSynthesis.speaking){var u=new SpeechSynthesisUtterance(" ");u.volume=0;u.rate=2;speechSynthesis.speak(u)}}catch(e){}try{if(S.sfx!==false)audio()}catch(e){}}
["click","touchend","keydown"].forEach(function(t){document.addEventListener(t,vUnlock,{capture:true,passive:true})});

/* ---------- voices ---------- */
var VVOICES=[];function vLoad(){try{VVOICES=window.speechSynthesis?speechSynthesis.getVoices()||[]:[]}catch(e){VVOICES=[]}return VVOICES}
if(window.speechSynthesis){vLoad();try{speechSynthesis.addEventListener("voiceschanged",vLoad)}catch(e){}}
var VPREF={en:["Google US English","Samantha","Microsoft Aria","Microsoft Jenny","Microsoft Ana","Ava","Allison","Susan","Karen","Moira","Tessa","Google UK English Female","Zira"],ru:["Google русский","Milena","Microsoft Svetlana","Microsoft Irina","Katya","Svetlana","Irina"]};
function vPick(lang){var L=vLoad(),pre=lang==="ru"?"ru":"en",want=pre==="ru"?S.voice.vnameRu:S.voice.vname;
  var c=L.filter(function(v){return (v.lang||"").toLowerCase().replace("_","-").indexOf(pre)===0});if(!c.length)return null;
  if(want){var w=c.filter(function(v){return v.name===want})[0];if(w)return w}
  var P=VPREF[pre];for(var i=0;i<P.length;i++){var m=c.filter(function(v){return v.name.indexOf(P[i])>-1})[0];if(m)return m}
  return (pre==="en"?c.filter(function(v){return /en[-_]us/i.test(v.lang)})[0]:null)||c[0]}
function vLang(t){return /[а-яё]/i.test(t)?"ru":"en"}

/* ---------- text helpers ---------- */
function sylN(w){w=String(w||"").toLowerCase();if(/\d/.test(w))return Math.min(4,Math.max(1,w.replace(/\D/g,"").length));return Math.min(5,(w.match(/[aeiouyаеёиоуыэюя]+/g)||[]).length||1)}
function vowelsOf(w){var m=String(w||"").toLowerCase().match(/[aeiouyаеёиоуыэюя]/g)||["a"],map={"а":"a","е":"e","ё":"o","и":"i","о":"o","у":"u","ы":"i","э":"e","ю":"u","я":"a"};return m.map(function(c){return map[c]||c})}
function firstVowel(w){return vowelsOf(w)[0]||"a"}
function vBuild(text,sayFn){var words=String(text).replace(/\s+/g," ").trim().split(" ").filter(Boolean),chunks=[],cur=[];
  words.forEach(function(w,i){cur.push(w);var len=cur.join(" ").length;if((/[.!?…]["»”)]?$/.test(w)&&len>28)||len>190||(/[,;:]$/.test(w)&&len>140)){chunks.push({w0:i-cur.length+1,words:cur});cur=[]}});
  if(cur.length)chunks.push({w0:words.length-cur.length,words:cur});
  chunks.forEach(function(c){c.show=c.words.join(" ");c.say=sayFn?sayFn(c.show):c.show;var p=0;c.starts=c.words.map(function(w){var s=p;p+=w.length+1;return s})});
  return {words:words,chunks:chunks}}
function vWordAt(c,frac){var pos=frac*c.show.length,k=0;for(var i=0;i<c.starts.length;i++)if(c.starts[i]<=pos+0.5)k=i;return k}

/* read maths the way a teacher says it */
function mathSpeak(t){t=" "+String(t)+" ";
  var sup={"⁰":"0","¹":"1","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n","ˣ":"x"},sub={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4"};
  t=t.replace(/\|([^|]{1,14})\|/g," the absolute value of $1 ")
   .replace(/\b([fgh])\(([a-z0-9]{1,3})\)/g,"$1 of $2")
   .replace(/√\(/g," the square root of (").replace(/√/g," the square root of ").replace(/∛/g," the cube root of ")
   .replace(/²/g," squared ").replace(/³/g," cubed ")
   .replace(/[⁰¹⁴⁵⁶⁷⁸⁹ⁿˣ]+/g,function(m){return " to the power "+m.split("").map(function(c){return sup[c]}).join("")+" "})
   .replace(/[₀₁₂₃₄]/g,function(m){return " sub "+sub[m]+" "})
   .replace(/\^\(([^)]{1,12})\)/g," to the power $1 ").replace(/\^/g," to the power ")
   .replace(/π/g," pi ").replace(/(\d)\s*\/\s*(\d)/g,"$1 over $2").replace(/(\b[a-z0-9]{1,3}|\))\s*\/\s*([a-z0-9(]{1,3}\b|\()/gi,"$1 over $2")
   .replace(/\+/g," plus ").replace(/×|·/g," times ").replace(/÷/g," divided by ").replace(/±/g," plus or minus ").replace(/−/g," minus ").replace(/\s-\s/g," minus ")
   .replace(/≠/g," is not equal to ").replace(/≤/g," is less than or equal to ").replace(/≥/g," is greater than or equal to ")
   .replace(/\s<\s/g," is less than ").replace(/\s>\s/g," is greater than ").replace(/\s=\s|=/g," equals ")
   .replace(/π/g," pi ").replace(/θ/g," theta ").replace(/°/g," degrees ").replace(/%/g," percent ").replace(/→|⟹|⇒/g," so ").replace(/∥/g," is parallel to ").replace(/⟂/g," is perpendicular to ")
   .replace(/\b([A-Z]{3,})\b/g,function(m){return m.charAt(0)+m.slice(1).toLowerCase()});
  return t.replace(/\s+/g," ").trim()}

/* ---------- the mouth ---------- */
var MOUTH={svgs:[],open:0,target:0,osc:false,ph:0,vowel:"a",until:0,tm:0,last:0,
  kick:function(){this.ph=0},
  pulse:function(ms,v){this.vowel=v;this.target=.7+Math.random()*.3;this.until=performance.now()+ms;this.open=Math.max(this.open,this.target*.85);this.draw();this.loop()},
  draw:function(){var me=this;me.svgs.forEach(function(s){drawMouth(s,me.open,me.vowel)})},
  tick:function(){var me=MOUTH,now=performance.now(),dt=Math.min(80,now-(me.last||now-40));me.last=now;var tgt=0;
    if(me.osc){me.ph+=dt/1000*4.3*2*Math.PI*Math.min(1.6,S.voice.rate||1);var s=Math.sin(me.ph);tgt=s>0?Math.pow(s,.7)*(.5+.5*Math.abs(Math.sin(me.ph*.37+1.3))):0}
    else if(now<me.until)tgt=me.target;
    me.open+=(tgt-me.open)*Math.min(1,dt/45);
    var had=me.svgs.length;me.svgs=me.svgs.filter(function(s){return s.isConnected});
    if(had&&!me.svgs.length&&TK&&TK.svgN)axiHush();
    me.draw();
    if(!(me.svgs.length&&(me.osc||now<me.until||me.open>.02||TK||(RD&&RD.on&&!RD.paused)))){clearInterval(me.tm);me.tm=0;me.last=0;me.open=0;me.draw()}},
  loop:function(){if(this.tm)return;this.last=0;this.tm=setInterval(this.tick,40)}};
function drawMouth(s,o,v){var m=s.querySelector(".axi-tm"),t=s.querySelector(".axi-tt");if(!m)return;var mg=s.querySelector(".axi-mouth"),tg=s.querySelector(".axi-talk"),shut=o<.14;if(mg)mg.style.display=shut?"inline":"none";if(tg)tg.style.display=shut?"none":"inline";var wide={a:1,e:1.18,i:1.28,o:.76,u:.66,y:1.15}[v]||1;
  m.setAttribute("ry",(1.6+o*9.5).toFixed(2));m.setAttribute("rx",(8.5*wide+o*1.6).toFixed(2));m.setAttribute("cy",(109+o*2).toFixed(2));
  if(t){t.setAttribute("rx",(5.4*wide*(.35+o*.65)).toFixed(2));t.setAttribute("ry",(o>.35?o*3.3:0).toFixed(2));t.setAttribute("cy",(110+o*7.6).toFixed(2))}}

/* ---------- Axi's chirps (tiny synth voice, no files) ---------- */
function vBlip(v,ms){var c=audio();if(!c)return;try{var t=c.currentTime+.005,o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain(),
  base=470*(S.voice.pitch||1.25)/1.25,mul={a:1,e:1.12,i:1.25,o:.9,u:.82,y:1.18}[v]||1,fr=base*mul*(.95+Math.random()*.1),d=ms/1000;
  o.type="triangle";o.frequency.setValueAtTime(fr*1.07,t);o.frequency.exponentialRampToValueAtTime(fr*.93,t+d);
  f.type="lowpass";f.frequency.value={a:1300,e:2100,i:2600,o:900,u:700,y:2300}[v]||1400;f.Q.value=5;
  var vol=.2*(S.sfxVol===undefined?1:S.sfxVol);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(f);f.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03)}catch(e){}}

/* ---------- players ---------- */
/* real speech: chunks of a sentence or two, word events for captions + mouth */
function ttsPlay(chunks,cb,o){o=o||{};var ss=window.speechSynthesis,me={dead:false},i=0,first=true,wd=null,est=null;
  me.stop=function(){me.dead=true;clearTimeout(wd);clearTimeout(est);MOUTH.osc=false;try{ss&&ss.cancel()}catch(e){}};
  if(!ss||!window.SpeechSynthesisUtterance){setTimeout(function(){cb.fail&&cb.fail()},0);me.dead=true;return me}
  function estimate(ci){var c=chunks[ci],k=0,per=60000/(170*(o.rate||1));
    (function step(){if(me.dead||c.gotB||k>=c.starts.length)return;cb.word&&cb.word(ci,c.starts[k]/Math.max(1,c.show.length));var n=sylN(c.words[k]);k++;est=setTimeout(step,per*Math.max(.55,n*.6))})()}
  function next(){if(me.dead)return;if(i>=chunks.length){MOUTH.osc=false;cb.done&&cb.done();return}
    var c=chunks[i],ci=i,started=false,u=new SpeechSynthesisUtterance(c.say),lang=o.lang||vLang(c.say),v=vPick(lang);
    if(v){u.voice=v;u.lang=v.lang}else u.lang=lang==="ru"?"ru-RU":"en-US";
    u.rate=Math.max(.5,Math.min(2,o.rate||1));u.pitch=Math.max(.1,Math.min(2,o.pitch||1));u.volume=1;
    u.onstart=function(){if(me.dead)return;started=true;first=false;clearTimeout(wd);MOUTH.osc=true;cb.chunk&&cb.chunk(ci);estimate(ci)};
    u.onboundary=function(e){if(me.dead||(e.name&&e.name!=="word"))return;c.gotB=true;clearTimeout(est);MOUTH.kick();cb.word&&cb.word(ci,(e.charIndex||0)/Math.max(1,c.say.length))};
    u.onend=function(){if(me.dead)return;clearTimeout(est);clearTimeout(wd);MOUTH.osc=false;i++;setTimeout(next,o.gap||110)};
    u.onerror=function(e){if(me.dead)return;clearTimeout(est);clearTimeout(wd);MOUTH.osc=false;if(first&&!started){me.dead=true;cb.fail&&cb.fail()}else{i++;setTimeout(next,60)}};
    try{ss.speak(u)}catch(err){me.dead=true;cb.fail&&cb.fail();return}
    wd=setTimeout(function(){if(started||me.dead)return;try{ss.cancel()}catch(e){}if(first){me.dead=true;cb.fail&&cb.fail()}else{i++;next()}},first?2600:4000)}
  try{if(ss.speaking||ss.pending)ss.cancel()}catch(e){}
  setTimeout(next,70);return me}
/* timer driver: chirps or silent, one mouth movement per syllable */
function timerPlay(chunks,cb,o){o=o||{};var me={dead:false},t=null,i=0,rate=Math.max(.5,o.rate||1);
  me.stop=function(){me.dead=true;clearTimeout(t)};
  function chunk(){if(me.dead)return;if(i>=chunks.length){cb.done&&cb.done();return}var c=chunks[i],ci=i,k=0;cb.chunk&&cb.chunk(ci);
    (function word(){if(me.dead)return;if(k>=c.words.length){i++;t=setTimeout(chunk,230/rate);return}var w=c.words[k],n=sylN(w),vs=vowelsOf(w),j=0;cb.word&&cb.word(ci,c.starts[k]/Math.max(1,c.show.length));
      (function syl(){if(me.dead)return;if(j>=n){k++;t=setTimeout(word,(/[.!?…]["»”)]?$/.test(w)?300:/[,;:]$/.test(w)?170:40)/rate);return}
        var d=(o.chirp?135:150)/rate*(.8+Math.random()*.45),v=vs[j%vs.length]||"a";MOUTH.pulse(d*.78,v);if(o.chirp)vBlip(v,d*.72);j++;t=setTimeout(syl,d)})()})()}
  t=setTimeout(chunk,30);return me}

/* ---------- karaoke captions ---------- */
function kRender(el,text){el.innerHTML=String(text).replace(/\s+/g," ").trim().split(" ").map(function(w){return '<span class="kw">'+esc(w)+'</span>'}).join(" ");el.classList.add("karaoke");return [].slice.call(el.querySelectorAll(".kw"))}
function kMark(spans,g){if(!spans)return;spans.forEach(function(sp,j){sp.classList.toggle("on",j===g);sp.classList.toggle("done",j<g)})}

/* ---------- Axi says something ---------- */
var TK=null;
function axiSvgs(x){var out=[];(x&&x.length!==undefined&&!x.tagName&&!x.nodeType?[].slice.call(x):[x]).forEach(function(n){if(!n||!n.nodeType)return;if(n.classList&&n.classList.contains("axi"))out.push(n);else[].push.apply(out,n.querySelectorAll(".axi"))});return out}
function axiSay(text,o){o=o||{};text=String(text||"").trim();if(!text)return null;axiHush();if(!o.keepReader)readerStop();
  var mode=o.mode||S.voice.mode;if(!VG&&mode!=="silent")mode="silent";
  var svgs=axiSvgs(o.axi),B=vBuild(text),spans=o.bubble?kRender(o.bubble,text):null,me={svgN:svgs.length,loud:mode!=="silent"};TK=me;
  svgs.forEach(function(s){s.classList.add("talking")});MOUTH.svgs=svgs;
  function finish(){if(TK!==me)return;TK=null;svgs.forEach(function(s){s.classList.remove("talking")});if(spans)spans.forEach(function(sp){sp.classList.remove("on");sp.classList.remove("done")});MOUTH.osc=false;if(o.onend)o.onend()}
  var cb={word:function(ci,frac){if(TK!==me)return;var c=B.chunks[ci],k=vWordAt(c,frac);MOUTH.vowel=firstVowel(c.words[k]);kMark(spans,c.w0+k)},
    done:finish,
    fail:function(){if(TK!==me)return;me.p=timerPlay(B.chunks,cb,{chirp:!!audio(),rate:S.voice.rate})}};
  if(mode==="voice")me.p=ttsPlay(B.chunks,cb,{rate:S.voice.rate,pitch:S.voice.pitch,lang:o.lang});
  else me.p=timerPlay(B.chunks,cb,{chirp:mode==="chirp",rate:S.voice.rate});
  MOUTH.loop();return me}
function axiHush(){var t=TK;TK=null;if(t){try{t.p&&t.p.stop()}catch(e){}}MOUTH.osc=false;MOUTH.until=0;
  document.querySelectorAll(".axi.talking").forEach(function(s){if(!RD||!RD.on||!s.closest("#axiDock"))s.classList.remove("talking")});
  document.querySelectorAll(".karaoke .kw.on,.karaoke .kw.done").forEach(function(s){s.classList.remove("on");s.classList.remove("done")})}
/* speak automatically only if the learner wants it; otherwise Axi still mouths the words silently */
function axiAuto(text,o){if(S.axiOff)return null;o=o||{};if(!S.voice.auto)o.mode="silent";return axiSay(text,o)}
function axiTest(){VG=true;var d=document.querySelector(".modal.settings .vtest .axi")||document.querySelector("#axiBuddy .axi");
  axiSay(L2("Hi! I'm Axilotti. This is how I sound. Two plus two equals four!","Привет! Я Аксилотти. Вот так я говорю. Два плюс два — четыре!"),{axi:d,bubble:document.querySelector(".modal.settings .vtest-t"),force:1})}

/* ---------- the read-aloud dock ---------- */
var RD=null;
function blockText(n){var c=n.cloneNode(true);c.querySelectorAll("svg,button,input,textarea,select,script,style,.say,.pg-kind,.kp,.qc,.no-read").forEach(function(x){x.remove()});
  c.querySelectorAll(".lab,.k,h1,h2,h3,h4,b:first-child").forEach(function(x){if(!/[.!?:]$/.test(x.textContent.trim()))x.appendChild(document.createTextNode(". "))});
  c.querySelectorAll("br").forEach(function(x){x.replaceWith(document.createTextNode(". "))});
  c.querySelectorAll("li").forEach(function(x){x.appendChild(document.createTextNode(". "))});
  return c.textContent.replace(/\s+/g," ").replace(/\s+\./g,".").replace(/\.\s*\./g,".").trim()}
function readBlocks(root){if(!root)return [];var sel="h1,h2,h3,p,li,.eg,.tip,.trap,.note,.fbox,figcaption,.term,.plain,.rch,.explain,.cv-i,.hintbox,.q-q,.opt";
  var all=[].slice.call(root.querySelectorAll(sel)).filter(function(n){if(n.closest(".qc,svg,.pg-kind,#axiDock,.no-read,.q-tools,.cv-meta,[hidden],.hidden"))return false;return blockText(n).length>1});
  return all.filter(function(n){var p=n.parentElement;while(p&&p!==root){if(all.indexOf(p)>-1)return false;p=p.parentElement}return true})}
function readerDock(){var d=el("axiDock");if(d){d.classList.remove("out");return d}d=document.createElement("div");d.id="axiDock";d.setAttribute("role","region");d.setAttribute("aria-label","Axi reads aloud");
  d.innerHTML='<div class="ad-axi" title="Tap Axi to pause" onclick="readerToggle()">'+AXI("happy",56,"")+'</div><div class="ad-mid"><small id="adLab"></small><div class="ad-cap" id="adCap" aria-live="polite"></div></div>'+
   '<div class="ad-ctl"><button title="Previous part" onclick="readerStep(-1)">'+ic("vPrev")+'</button><button id="adPlay" class="ad-main" title="Pause" onclick="readerToggle()">'+ic("vPause")+'</button><button title="Next part" onclick="readerStep(1)">'+ic("vNext")+'</button><button class="ad-rate" id="adRate" title="Reading speed" onclick="readerRate()">'+S.voice.rrate+'×</button><button title="Stop reading (Esc)" onclick="readerStop()">'+ic("x")+'</button></div>';
  document.body.appendChild(d);document.body.classList.add("reading");trUI(d);return d}
function readerStart(blocks,o){o=o||{};axiHush();readerStop(true);if(typeof tipClose==="function")tipClose();if(typeof buddyClose==="function")buddyClose();if(!blocks||!blocks.length){toast(L2("Nothing to read here","Здесь нечего читать"));return}VG=true;
  RD={blocks:blocks,i:0,on:true,paused:false,o:o};readerDock();readerPlay()}
function readerText(text,o){var d=document.createElement("div");d.textContent=text;d.className="rd-virtual";o=o||{};o.virtual=1;readerStart([d],o)}
function readerPlay(){var R=RD;if(!R||!R.on)return;if(R.p){try{R.p.stop()}catch(e){}R.p=null}
  document.querySelectorAll(".rd-now").forEach(function(x){x.classList.remove("rd-now")});
  if(R.i>=R.blocks.length)return readerDone();
  var b=R.blocks[R.i];if(!R.o.virtual&&b.isConnected){b.classList.add("rd-now");try{b.scrollIntoView({block:"center",behavior:"smooth"})}catch(e){}}
  var lab=el("adLab");if(lab)lab.textContent=(R.o.label||L2("Axi is reading","Акси читает"))+(R.blocks.length>1?" · "+(R.i+1)+" / "+R.blocks.length:"");
  var pl=el("adPlay");if(pl){pl.innerHTML=ic("vPause");pl.title=L2("Pause","Пауза")}
  var dk=el("axiDock"),svgs=dk?axiSvgs(dk):[];svgs.forEach(function(s){s.classList.add("talking")});MOUTH.svgs=svgs;
  var B=vBuild(blockText(b),mathSpeak),cap=el("adCap"),spans=null,me={};R.cur=me;
  var cb={chunk:function(ci){if(R.cur!==me)return;spans=cap?kRender(cap,B.chunks[ci].show):null},
    word:function(ci,frac){if(R.cur!==me)return;var c=B.chunks[ci],k=vWordAt(c,frac);MOUTH.vowel=firstVowel(c.words[k]);kMark(spans,k)},
    done:function(){if(R.cur!==me||!R.on)return;R.i++;setTimeout(function(){if(RD===R&&R.cur===me&&!R.paused)readerPlay()},260)},
    fail:function(){if(R.cur!==me)return;if(!R.warned){R.warned=1;toast(L2("No reading voice on this device — showing captions","На этом устройстве нет голоса — показываю субтитры"))}R.p=timerPlay(B.chunks,cb,{chirp:false,rate:S.voice.rrate})}};
  R.p=ttsPlay(B.chunks,cb,{rate:S.voice.rrate,pitch:Math.min(1.25,S.voice.pitch||1),lang:"en"});MOUTH.loop()}
function readerDone(){var R=RD;if(!R)return;if(R.o.onDone&&R.o.onDone()!==false)return;readerStop()}
function readerToggle(){var R=RD;if(!R)return;var pl=el("adPlay");
  if(R.paused){R.paused=false;readerPlay()}else{R.paused=true;R.cur=null;if(R.p){try{R.p.stop()}catch(e){}R.p=null}MOUTH.osc=false;if(pl){pl.innerHTML=ic("vPlay");pl.title=L2("Continue","Продолжить")}var l=el("adLab");if(l)l.textContent=L2("Paused — tap ▶ to continue","Пауза — нажми ▶")}}
function readerStep(d){var R=RD;if(!R)return;R.i=Math.max(0,Math.min(R.blocks.length-1,R.i+d));R.paused=false;readerPlay()}
function readerRate(){var L=[.8,1,1.2,1.5],k=L.indexOf(S.voice.rrate);S.voice.rrate=L[(k+1)%L.length];saveS();var b=el("adRate");if(b)b.textContent=S.voice.rrate+"×";if(RD&&!RD.paused)readerPlay()}
function readerStop(keepDock){var R=RD;RD=null;if(R){R.on=false;R.cur=null;if(R.p){try{R.p.stop()}catch(e){}}}MOUTH.osc=false;
  document.querySelectorAll(".rd-now").forEach(function(x){x.classList.remove("rd-now")});if(keepDock)return;var d=el("axiDock");if(d){d.classList.add("out");setTimeout(function(){if(!RD&&d.parentNode)d.remove()},250)}document.body.classList.remove("reading")}
window.addEventListener("hashchange",function(){if(RD)readerStop()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&(RD||TK)){readerStop();axiHush()}});

/* the old one-shot "Read aloud" buttons now go through Axi */
speak=function(text){if(RD){readerStop();return}readerText(text)};

/* questions: read the question and every answer choice */
function readQuestion(){var c=document.querySelector(".q-card");if(!c)return;if(RD){readerStop();return}var b=[].slice.call(c.querySelectorAll(".q-q,.opt"));readerStart(b,{label:L2("Axi reads the question","Акси читает вопрос")})}
var _dqV=drawQuestion;drawQuestion=function(){_dqV();var t=document.querySelector(".q-tools");if(!t)return;[].slice.call(t.querySelectorAll("button")).forEach(function(b){if(/speak/.test(b.getAttribute("onclick")||"")){b.setAttribute("onclick","readQuestion()");b.innerHTML=ic("speak")+L2("Read to me","Читать")}})};

/* ---------- lessons: Axi reads page by page ---------- */
function lessonRead(){if(!LP||!el("plStage"))return;if(RD&&RD.lesson){readerStop();return}lessonReadPage(true)}
function lessonReadPage(fresh){var st=el("plStage");if(!st||!LP)return;var pg=LP.seq[LP.i],blocks=readBlocks(st.querySelector(".pg")||st);
  readerStart(blocks,{label:L2("Axi is reading this page","Акси читает страницу"),onDone:function(){var R=RD;if(!R)return false;
    var last=LP&&LP.i>=LP.seq.length-1;
    if(pg.kind==="check"){R.wait=1;var l=el("adLab");if(l)l.textContent=L2("Your turn! Try it, then press Continue","Твоя очередь! Реши и нажми «Далее»");axiSay(L2("Your turn! Try this one, then press Continue and I'll keep reading.","Твоя очередь! Попробуй решить, потом нажми «Далее» — я продолжу."),{axi:el("axiDock"),keepReader:1});return true}
    if(last){axiSay(L2("That's the whole lesson! Press Complete lesson to collect your XP.","Это весь урок! Нажми «Завершить урок» и получи XP."),{axi:el("axiDock"),keepReader:1});setTimeout(function(){if(RD===R)readerStop()},5200);return true}
    R.turning=1;setTimeout(function(){if(RD===R)lpGo(1)},650);return true}});
  if(RD)RD.lesson=1}
var _lpShowV=lpShow;lpShow=function(d){_lpShowV(d);if(RD&&RD.lesson){var keep=RD;setTimeout(function(){if(RD===keep)lessonReadPage()},380)}};
var _vlV=viewLesson;viewLesson=function(a,uid,lid){_vlV(a,uid,lid);var top=a.querySelector(".pl-top");if(!top)return;
  var b=[].slice.call(top.querySelectorAll(".tb-btn")).filter(function(x){return /aloud/i.test(x.title||"")})[0];
  if(!b){b=document.createElement("button");b.className="tb-btn";top.insertBefore(b,top.lastElementChild)}
  b.classList.add("rd-btn");b.title=L2("Axi reads this lesson to you (R)","Акси прочитает урок (R)");b.innerHTML=ic("speak")+'<span>'+L2("Read to me","Читать")+'</span>';b.onclick=lessonRead};

/* ---------- styles ---------- */
(function(){var c=`
.karaoke .kw{border-radius:5px;padding:0 1px;transition:background .12s,color .12s}.karaoke .kw.on{background:color-mix(in srgb,var(--violet) 26%,transparent);color:var(--ink);box-shadow:0 0 0 2px color-mix(in srgb,var(--violet) 26%,transparent)}
#axiDock{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:125;width:min(680px,calc(100vw - 20px));display:flex;align-items:center;gap:10px;padding:8px 10px 8px 6px;border-radius:22px;background:var(--glass);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid color-mix(in srgb,var(--violet) 40%,var(--line));box-shadow:0 20px 60px rgba(0,0,0,.4);animation:adIn .35s cubic-bezier(.3,1.3,.5,1) both;transition:opacity .25s,transform .25s}
#axiDock.out{opacity:0;transform:translateX(-50%) translateY(20px)}@keyframes adIn{from{opacity:0;transform:translateX(-50%) translateY(30px)}}
.ad-axi{flex:none;cursor:pointer;margin:-14px 0 -6px}.ad-mid{flex:1;min-width:0}.ad-mid small{display:block;font-size:11.5px;font-weight:800;letter-spacing:.04em;color:var(--violet);text-transform:uppercase}
.ad-cap{font-size:14.5px;line-height:1.45;max-height:3.1em;overflow:hidden;color:var(--ink2)}.ad-cap .kw.done{color:var(--ink)}
.ad-ctl{display:flex;gap:4px;flex:none}.ad-ctl button{width:36px;height:36px;border-radius:11px;border:1px solid var(--line);background:var(--paper);color:var(--ink2);display:grid;place-items:center;cursor:pointer}.ad-ctl button .ic{width:17px;height:17px}
.ad-ctl .ad-main{background:linear-gradient(135deg,var(--blue),var(--violet));color:#fff;border:0}.ad-ctl .ad-rate{font:800 12px var(--ui);width:42px}
body:has(.player) #axiDock{bottom:calc(84px + env(safe-area-inset-bottom,0px))}
.rd-now{outline:3px solid color-mix(in srgb,var(--violet) 55%,transparent);outline-offset:5px;border-radius:10px;background:color-mix(in srgb,var(--violet) 7%,transparent);transition:outline-color .2s,background .2s}
.pl-top .rd-btn{width:auto;padding:0 12px;display:inline-flex;gap:6px;font:800 13px var(--ui);color:var(--violet);border-color:color-mix(in srgb,var(--violet) 45%,var(--line))}
@media(max-width:900px){#axiDock{bottom:calc(80px + env(safe-area-inset-bottom,0px))}body:has(.player) #axiDock{bottom:calc(78px + env(safe-area-inset-bottom,0px))}}
@media(max-width:560px){#axiDock{gap:6px;padding:6px 8px 6px 4px}.ad-axi .axi{width:44px;height:44px}.ad-ctl button{width:32px;height:32px}.ad-ctl button:first-child,.ad-ctl button:nth-child(3){display:none}.ad-cap{font-size:13.5px}.pl-top .rd-btn span{display:none}.pl-top .rd-btn{width:40px;padding:0}}
`;var st=document.createElement("style");st.textContent=c;document.head.appendChild(st)})();
Object.assign(RU,{"Read to me":"Читать","Axi is reading":"Акси читает"});
