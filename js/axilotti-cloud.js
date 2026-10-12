/* AXIOM cloud features: secure accounts, progress sync, support, admin UI and Axilotti AI. */
(function () {
  'use strict';

  /* Lesson modules extend the course at different points. Set one deliberate
     basics-to-advanced route before Today/continue-learning reads UNITS. */
  var courseOrder = ['nums', 'gcf', 'frac', 'pct', 'ratio', 'meas', 'data', 'prob',
    'alg', 'poly', 'ineq', 'lines', 'sys', 'wp', 'solve', 'exp', 'quad', 'func',
    'abs', 'advm', 'model', 'geo0', 'geo1', 'geo2', 'trig', 'desmos', 'hard',
    'traps', 'satday', 'words'];
  var byId = Object.create(null);
  UNITS.forEach(function (unit) { if (!byId[unit.id]) byId[unit.id] = unit; });
  var ordered = courseOrder.map(function (id) { return byId[id]; }).filter(Boolean);
  UNITS.forEach(function (unit) { if (ordered.indexOf(unit) < 0) ordered.push(unit); });
  UNITS.splice.apply(UNITS, [0, UNITS.length].concat(ordered));
  if (typeof DOMAINS !== 'undefined') {
    var domainOrder = ['psda', 'alg', 'adv', 'geo', 'pro'];
    var domainUnits = {
      psda: ['nums', 'gcf', 'frac', 'pct', 'ratio', 'meas', 'data', 'prob'],
      alg: ['alg', 'poly', 'ineq', 'lines', 'sys', 'wp', 'solve'],
      adv: ['exp', 'quad', 'func', 'abs', 'advm', 'model'],
      geo: ['geo0', 'geo1', 'geo2', 'trig'],
      pro: ['desmos', 'hard', 'traps', 'satday', 'words']
    };
    DOMAINS.sort(function (a, b) { return domainOrder.indexOf(a.id) - domainOrder.indexOf(b.id); });
    DOMAINS.forEach(function (domain) {
      domain.units = (domainUnits[domain.id] || domain.units).filter(function (id) { return !!byId[id]; });
    });
  }

  var API = '/api/';
  var checkingSession = true;
  var gateDismissed = false;
  var cloudUserId = '';
  var isAdmin = false;
  var syncTimer = 0;
  var currentSupportId = '';
  var syncStatus = 'On this device';
  var lastMistake = null;
  var accountStateBeforeJoin = null;
  var oldSaveS = saveS;
  var oldAccLogout = accLogout;
  var oldChatOpen = typeof chatOpen === 'function' ? chatOpen : null;
  var oldChatClear = typeof chatClear === 'function' ? chatClear : null;
  var oldFinishQ = typeof finishQ === 'function' ? finishQ : null;
  var oldMarkLesson = typeof markLesson === 'function' ? markLesson : null;
  var oldShowResults = typeof showResults === 'function' ? showResults : null;
  var lastMockCount = (S.mockHist || []).length;

  function clone(value) { try { return JSON.parse(JSON.stringify(value)); } catch (_) { return {}; } }
  function attr(value) { return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function plain(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html || '');
    return (d.textContent || d.innerText || '').trim().slice(0, 2200);
  }
  async function api(path, options) {
    options = options || {};
    var headers = options.headers || {};
    if (options.body && typeof options.body !== 'string') {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
    options.headers = headers;
    options.credentials = 'same-origin';
    options.cache = 'no-store';
    var response = await fetch(API + path, options);
    // If the backend isn't running (static hosting / offline), the request
    // resolves to the HTML shell, not JSON. Treat that as "unavailable" so we
    // never show a false success.
    var ct = response.headers.get('content-type') || '';
    if (ct.indexOf('application/json') < 0) {
      var unavailable = new Error('backend_unavailable');
      unavailable.status = response.status;
      throw unavailable;
    }
    var data = {};
    try { data = await response.json(); } catch (_) {}
    if (!response.ok) {
      var error = new Error(data.error || 'request_failed');
      error.status = response.status;
      throw error;
    }
    return data;
  }
  function messageFor(code) {
    return ({
      backend_not_configured: 'The account database is not configured yet. Add the server environment variables in the deployment settings.',
      backend_unavailable: 'The AXIOM server is not reachable. Accounts, the admin panel and cloud AI need the app deployed with its backend (or run “node dev-server.js” locally). You can keep studying as a guest.',
      invalid_credentials: 'The username or password is incorrect.',
      invalid_username: 'Username: 3–20 letters or numbers (dots, - and _ allowed).',
      name_required: 'Enter your name to create an account.',
      username_taken: 'That username is taken. Try another one, or sign in.',
      password_too_short: 'Use a password with at least 6 characters.',
      too_many_requests: 'Too many attempts. Wait a little and try again.',
      banned: 'This account is restricted. Contact support if you think this is a mistake.'
    })[code] || 'We could not complete that request. Please try again.';
  }
  function setCurrentUser(user) {
    if (!user) return;
    cloudUserId = user.id;
    syncStatus = 'Syncing…';
    window.Z800_USER = user.id;
    try { localStorage.removeItem('z800_session'); sessionStorage.removeItem('z800_session'); } catch (_) {}
    AUTH.user = {
      id: user.id,
      username: user.username || '',
      name: user.name,
      role: user.role || 'user',
      created: user.created || '',
      user_metadata: { name: user.name || user.username }
    };
  }
  function setProgress(progress) {
    if (!progress || typeof progress !== 'object' || Array.isArray(progress)) return;
    Object.keys(S).forEach(function (key) { delete S[key]; });
    Object.keys(progress).forEach(function (key) { S[key] = progress[key]; });
    if (!S.lessons) S.lessons = {};
    if (!S.quiz) S.quiz = {};
    if (!S.prac) S.prac = {};
    if (!S.cards) S.cards = {};
    if (!S.mistakes) S.mistakes = [];
    if (!S.streak) S.streak = { c: 0, last: '' };
    lastMockCount = (S.mockHist || []).length;
    oldSaveS();
    if (typeof paintMini === 'function') paintMini();
  }
  function queueProgressSync() {
    if (!cloudUserId) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      api('progress', { method: 'POST', body: { progress: S } }).then(function () {
        syncStatus = 'Synced';
        var status = el('syncStatus'); if (status) status.textContent = syncStatus;
      }).catch(function (e) {
        syncStatus = 'Saved here · sync paused';
        var status = el('syncStatus'); if (status) status.textContent = syncStatus;
        console.warn('Progress sync paused:', e.message);
      });
    }, 900);
  }
  saveS = function () {
    if (cloudUserId) S._cloudUpdatedAt = Date.now();
    oldSaveS();
    queueProgressSync();
    var history = S.mockHist || [];
    if (history.length < lastMockCount) lastMockCount = history.length;
    while (history.length > lastMockCount) {
      var result = history[lastMockCount++];
      activity('test_done', { title: result.full ? 'Full practice test' : 'Practice test', score: result.score });
    }
  };
  function activity(event, data) {
    if (!cloudUserId) return;
    api('activity', { method: 'POST', body: { event: event, data: data || {} } }).catch(function () {});
  }
  async function loadCloudProgress(user, initialProgress) {
    setCurrentUser(user);
    try {
      var saved = await api('progress');
      var local = null;
      try { local = JSON.parse(localStorage.getItem('z800') || 'null'); } catch (_) {}
      if (saved.progress) {
        if (local && Number(local._cloudUpdatedAt) > Number(saved.progress._cloudUpdatedAt)) {
          setProgress(local);
          await api('progress', { method: 'POST', body: { progress: S } });
        } else setProgress(saved.progress);
      } else if (initialProgress) {
        initialProgress._cloudUpdatedAt = Number(initialProgress._cloudUpdatedAt) || Date.now();
        setProgress(initialProgress);
        await api('progress', { method: 'POST', body: { progress: S } });
      } else {
        if (local) {
          setProgress(local);
          await api('progress', { method: 'POST', body: { progress: S } });
        }
      }
      syncStatus = 'Synced';
    } catch (e) {
      syncStatus = 'Saved here · sync paused';
      console.warn('Could not load saved progress:', e.message);
    }
    renderAcct();
    router();
  }

  /* Account gate. Legacy local accounts remain on this device; new accounts use the server. */
  accGate = function (mode) {
    if (checkingSession || gateDismissed) return;
    mode = mode || 'up';
    var up = mode === 'up';
    var gate = el('gate');
    if (!gate) { gate = document.createElement('div'); gate.id = 'gate'; document.body.appendChild(gate); }
    if (gate.dataset.cloudMode === mode) return;
    gate.dataset.cloudMode = mode;
    gate.innerHTML = '<div class="gate-card"><div class="gate-brand"><span class="logo-m">∑</span><div><b>AXIOM</b><small>SAT Math · cloud account</small></div></div>' +
      '<h1>' + (up ? 'Create your account' : 'Welcome back') + '</h1>' +
      '<p class="muted">' + (up ? 'Save your learning across devices.' : 'Sign in to continue your progress.') + '</p>' +
      '<div class="seg auth-seg"><button class="' + (!up ? 'on' : '') + '" id="gIn">Sign in</button><button class="' + (up ? 'on' : '') + '" id="gUp">Create account</button></div>' +
      (up ? '<label class="fl">Your name<input id="gName" autocomplete="name" maxlength="60" placeholder="Your name"></label>' : '') +
      '<label class="fl">Username<input id="gUser" type="text" autocomplete="username" maxlength="20" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + (up ? 'Choose a username' : 'Your username') + '"></label>' +
      '<label class="fl">Password<input id="gPass" type="password" autocomplete="' + (up ? 'new-password' : 'current-password') + '" minlength="6" maxlength="200" placeholder="' + (up ? 'At least 6 characters' : 'Your password') + '"></label>' +
      (up ? '<label class="fl">Repeat password<input id="gPass2" type="password" autocomplete="new-password" maxlength="200" placeholder="Type it again"></label>' : '') +
      '<p class="muted">You stay signed in on this device for up to 30 days, or until you sign out.' + (up ? ' By creating an account you agree to our <a href="#/terms" target="_blank">Terms</a> and <a href="#/privacy" target="_blank">Privacy Policy</a>.' : '') + '</p>' +
      '<div id="gMsg" class="auth-msg" aria-live="polite"></div><button class="btn pri block" id="gGo">' + (up ? 'Create account' : 'Sign in') + '</button>' +
      (!window.Z800_USER || window.Z800_USER === '__guest' ? '<button class="btn ghost block" style="margin-top:8px" id="gGuest">Continue as guest</button>' : '<button class="btn ghost block" style="margin-top:8px" id="gCancel">Cancel</button>') +
      '<p class="gate-note">' + ic('lock') + 'Passwords are stored as one-way hashes on the server. AXIOM never sends passwords to Telegram. <a href="#/privacy" target="_blank">Privacy details</a>.</p></div>';
    var msg = function (text, good) { var box = el('gMsg'); if (box) { box.textContent = text; box.className = 'auth-msg ' + (good ? 'ok' : 'no'); } };
    el('gIn').onclick = function () { accGate('in'); };
    el('gUp').onclick = function () { accGate('up'); };
    var guest = el('gGuest');
    if (guest) guest.onclick = function () { gateDismissed = true; window.Z800_USER = '__guest'; AUTH.user = null; try { sessionStorage.setItem('z800_session', '__guest'); } catch (_) {} gate.remove(); renderAcct(); router(); };
    var cancel = el('gCancel');
    if (cancel) cancel.onclick = function () { gateDismissed = true; gate.remove(); };
    async function submit() {
      var username = (el('gUser').value || '').trim();
      var password = el('gPass').value || '';
      var button = el('gGo');
      if (!username || !password) return msg('Enter your username and password.');
      if (up) {
        if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,19}$/.test(username)) return msg('Username: 3–20 letters or numbers (. _ - allowed).');
        if (password.length < 6) return msg('Use a password with at least 6 characters.');
        if (password !== el('gPass2').value) return msg('The two passwords do not match.');
      }
      button.disabled = true; button.textContent = up ? 'Creating…' : 'Signing in…';
      try {
        if (up) {
          accountStateBeforeJoin = clone(S);
          var result = await api('auth/register', { method: 'POST', body: { username: username, name: (el('gName').value || '').trim(), password: password } });
          if (result.user) await loadCloudProgress(result.user, accountStateBeforeJoin);
          accountStateBeforeJoin = null;
          gateDismissed = true;
          gate.remove();
          if (!S.profile && typeof onboard === 'function') setTimeout(function () { onboard(true); }, 250);
          toast('Account created. Your progress is syncing.');
        } else {
          var result = await api('auth/login', { method: 'POST', body: { username: username, password: password } });
          gateDismissed = true;
          gate.remove();
          if (result.admin) {
            isAdmin = true;
            try { localStorage.setItem('z800_admin_hint', '1'); } catch (_) {}
            renderAcct(); go('/admin'); router(); return;
          }
          if (result.restricted) {
            cloudUserId = result.user.id;
            AUTH.user = null;
            window.Z800_USER = '__guest';
            renderAcct();
            el('app').innerHTML = '<div class="policy card pad"><h1>Account restricted</h1><p>' + esc(result.reason || 'This account is restricted.') + '</p><p>You can still contact the AXIOM administrator and read replies.</p><a class="btn pri" href="#/support">Open support chat</a></div>';
            go('/support'); router();
            return;
          }
          await loadCloudProgress(result.user);
          toast('Signed in. Progress synced.');
        }
      } catch (e) {
        msg(messageFor(e.message));
        button.disabled = false; button.textContent = up ? 'Create account' : 'Sign in';
      }
    }
    el('gGo').onclick = submit;
    gate.querySelectorAll('input').forEach(function (input) { input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); }); });
    if (typeof trUI === 'function') trUI(gate);
  };
  window.openCloudGate = function (mode) { gateDismissed = false; accGate(mode || 'in'); };

  accLogout = async function () {
    var wasLocal = AUTH.user && AUTH.user.localOnly;
    if (wasLocal) { oldAccLogout(); return; }
    try { await api('auth/logout', { method: 'POST', body: {} }); } catch (_) {}
    cloudUserId = ''; isAdmin = false; AUTH.user = null; window.Z800_USER = '__guest';
    try { localStorage.removeItem('z800_admin_hint'); } catch (_) {}
    location.reload();
  };
  renderAcct = function () {
    var box = el('acct'); if (!box) return;
    var user = AUTH.user;
    if (user) {
      var name = user.user_metadata && user.user_metadata.name || user.name || user.username || 'Student';
      box.innerHTML = '<button class="acct-b" onclick="authOpen()"><span class="av">' + esc(name.charAt(0).toUpperCase()) + '</span><span class="ac-t"><b>' + esc(name) + '</b><small>' + ic('lock') + (user.localOnly ? 'Local on this device' : '@' + esc(user.username || user.name || 'account')) + '</small>' + (user.localOnly ? '' : '<small id="syncStatus">' + esc(syncStatus) + '</small>') + '</span></button>';
    } else {
      box.innerHTML = '<button class="acct-b" onclick="authOpen()"><span class="av g">' + ic('user') + '</span><span class="ac-t"><b>Guest</b><small>Create a secure cloud account</small></span></button>';
    }
  };
  authOpen = function () {
    gateDismissed = false;
    if (!AUTH.user) { gateDismissed = false; return accGate('up'); }
    var u = AUTH.user;
    var name = u.user_metadata && u.user_metadata.name || u.name || 'Student';
    var o = overall();
    var m = modal('<div class="auth-hero">' + ic('user') + '</div><h2>' + esc(name) + '</h2><p class="muted" style="text-align:center">' + (u.localOnly ? 'Local account on this device' : '@' + esc(u.username || u.name || 'account')) + '</p>' +
      '<div class="stat mini4"><div class="b"><b>' + level() + '</b><span>level</span></div><div class="b"><b>' + S.xp + '</b><span>XP</span></div><div class="b"><b>' + o.lessonsDone + '</b><span>lessons</span></div><div class="b"><b>' + S.streak.c + '</b><span>streak</span></div></div>' +
      '<div class="acct-info">' + ic('lock') + '<span>' + (u.localOnly ? 'This legacy account and its progress are stored on this device only. Create a cloud account to sync.' : 'Passwords are one-way hashed. Progress syncs to the AXIOM database; support messages are visible to the administrator.') + '</span></div>' +
      '<div class="acct-acts"><button class="btn" onclick="go(\'/support\');document.querySelector(\'.modal\')?.remove()">' + ic('chat') + 'Contact support</button><button class="btn" onclick="go(\'/privacy\');document.querySelector(\'.modal\')?.remove()">Privacy policy</button></div>' +
      '<div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn ghost" data-close>Close</button>' + (u.localOnly ? '<button class="btn" onclick="accGate(\'in\');document.querySelector(\'.modal\')?.remove()">Sign in to cloud</button><button class="btn pri" onclick="accGate(\'up\');document.querySelector(\'.modal\')?.remove()">Create cloud account</button><button class="btn ghost" id="aOut">Sign out of this device</button>' : '<button class="btn pri" id="aOut">' + ic('logout') + 'Sign out</button>') + '</div>', 'auth');
    var out = el('aOut'); if (out) out.onclick = accLogout;
    if (typeof trUI === 'function') trUI(m);
  };

  /* Safe Axilotti chat proxy. Only messages the learner chooses to send reach Groq. */
  if (oldChatOpen) {
    chatOpen = function (prefill, send) {
      oldChatOpen(prefill, send);
      var panel = el('axiChat'); if (!panel) return;
      var name = panel.querySelector('.axc-who b'); if (name) name.textContent = 'Axilotti';
      var sub = panel.querySelector('.axc-who small'); if (sub) sub.innerHTML = '<i class="axc-dot"></i>Friendly SAT Math tutor · cloud AI when available';
      var note = panel.querySelector('.axc-privacy-note');
      if (!note) {
        note = document.createElement('div'); note.className = 'axc-privacy-note';
        note.textContent = 'Messages you send are processed by Groq to answer. Do not include passwords or private information.';
        var body = el('axcBody'); if (body && body.parentNode) body.parentNode.insertBefore(note, body.nextSibling);
      }
    };
  }
  function textReply(reply) {
    var clean = String(reply || '').trim();
    if (!/^Axilotti\b|^I(?:'m| am) Axilotti\b/i.test(clean)) clean = 'Axilotti: ' + clean;
    return '<p>' + esc(clean).replace(/\n/g, '<br>') + '</p>';
  }
  chatSend = async function (text) {
    var input = el('axcIn');
    var raw = String(text !== undefined ? text : (input ? input.value : '')).trim();
    if (!raw || AXC.busy) return;
    if (input && text === undefined) { input.value = ''; input.style.height = 'auto'; }
    chatAdd('me', esc(raw), raw);
    var body = el('axcBody'); if (!body) return;
    AXC.busy = true;
    body.insertAdjacentHTML('beforeend', '<div class="axm ai typing" id="axcTyping"><div class="axm-av">' + AXI('think', 30, '') + '</div><div class="axm-b"><i></i><i></i><i></i></div></div>');
    chatScroll(); axcMood('think');
    var mistake = lastMistake && /explain|wrong|mistake|incorrect|why/i.test(raw) ? lastMistake : null;
    var history = AXC.hist.slice(-12).map(function (m) {
      return { role: m.f === 'ai' ? 'assistant' : 'user', content: (m.f === 'ai' ? plain(m.h) : String(m.raw || plain(m.h))).slice(0, 2000) };
    }).filter(function (m) { return !!m.content; });
    try {
      var result = await api('ai', { method: 'POST', body: {
        messages: history,
        mode: mistake ? 'mistake' : 'chat',
        context: mistake || ((typeof LP !== 'undefined' && LP && LP.l) ? { topic: LP.l.t } : {})
      } });
      var reply = result.reply;
      if (mistake) lastMistake = null;
      var typing = el('axcTyping'); if (typing) typing.remove();
      AXC.busy = false;
      chatReply({ html: textReply(reply), mood: 'happy', say: reply.slice(0, 900) });
    } catch (_) {
      var local;
      if (mistake) {
        local = { html: '<p><b>Axilotti:</b> For “' + esc(mistake.problem) + '”, your answer was <b>' + esc(mistake.yourAnswer) + '</b>. The correct answer is <b>' + esc(mistake.correctAnswer) + '</b>.</p><p>' + esc(mistake.explanation) + '</p>', mood: 'sad' };
      } else {
        try { local = BRAIN.respond(raw); } catch (e) { local = null; }
      }
      if (!local) local = { html: '<p>My cloud tutor is unavailable right now. Please try again in a moment.</p>', mood: 'sad' };
      local.html = '<div class="ax-offline-note">Axilotti (on-device): I’m your SAT Math tutor. I’m using the study brain on this device while cloud AI is unavailable.</div>' + local.html;
      if (mistake) lastMistake = null;
      var typing2 = el('axcTyping'); if (typing2) typing2.remove();
      AXC.busy = false;
      chatReply(local);
    }
  };
  if (oldChatClear) chatClear = function () { lastMistake = null; return oldChatClear.apply(this, arguments); };
  if (oldFinishQ) finishQ = function (ok, item, correctText) {
    if (!ok && item) {
      var run = window.RUN || {};
      var answer = run.picked != null && item.c ? item.c[run.picked] : (el('nin') ? el('nin').value : '');
      lastMistake = { problem: String(item.q || '').slice(0, 1200), yourAnswer: answer == null || answer === '' ? 'not recorded' : String(answer).slice(0, 200), correctAnswer: correctText == null ? '' : String(correctText).slice(0, 200), explanation: String(item.s || '').slice(0, 1200), topic: (findUnit(item.uid || (run.u && run.u.id)) || {}).title || '' };
    }
    return oldFinishQ.apply(this, arguments);
  };
  if (oldMarkLesson) markLesson = function (unitId, lessonId) {
    var wasDone = S.lessons && S.lessons[unitId + '/' + lessonId];
    var result = oldMarkLesson.apply(this, arguments);
    if (!wasDone) {
      var unit = findUnit(unitId), lesson = unit && unit.lessons.filter(function (l) { return l.id === lessonId; })[0];
      activity('lesson_done', { unitId: unitId, lessonId: lessonId, title: lesson && lesson.t || '' });
    }
    return result;
  };
  if (oldShowResults) showResults = function () {
    var run = window.RUN;
    var result = oldShowResults.apply(this, arguments);
    if (run && run.mode === 'quiz' && run.u && run.u.id.charAt(0) !== '_') {
      var pct = Math.round(100 * run.correct / Math.max(1, run.items.length));
      activity('quiz_done', { title: run.u.title || run.u.id, score: pct });
    }
    return result;
  };

  /* User support inbox. Support text stays in the AXIOM database, never Telegram. */
  async function renderSupport(a) {
    if (!cloudUserId) {
      a.innerHTML = '<div class="policy card pad"><h1>Contact support</h1><p>Sign in to send a private support message. Messages are stored in your AXIOM support thread for the administrator to reply.</p><button class="btn pri" onclick="openCloudGate(\'in\')">Sign in</button></div>';
      return;
    }
    a.innerHTML = '<section class="policy"><div class="pg-h"><div><h1>Support</h1><p>Messages are visible to you and the AXIOM administrator. They are not sent to Telegram.</p></div><button class="btn sm" id="supportRefresh">Refresh</button></div><div class="card pad" id="supportThread">Loading…</div><form id="supportForm" class="card pad support-form"><label class="fl">Message<textarea id="supportText" maxlength="2000" required rows="4" placeholder="How can we help?"></textarea></label><button class="btn pri" type="submit">Send message</button></form></section>';
    async function refresh() {
      try {
        var r = await api('support');
        el('supportThread').innerHTML = (r.messages || []).map(function (m) {
          return '<div class="support-msg ' + (m.from === 'admin' ? 'from-admin' : '') + '"><b>' + (m.from === 'admin' ? 'AXIOM support' : 'You') + '</b><small>' + new Date(m.ts).toLocaleString() + '</small><p>' + esc(m.text || '') + '</p></div>';
        }).join('') || '<p class="muted">No messages yet. Send a message below to start.</p>';
      } catch (_) { el('supportThread').textContent = 'Could not load support messages.'; }
    }
    el('supportForm').onsubmit = async function (e) {
      e.preventDefault(); var text = el('supportText').value.trim(); if (!text) return;
      var button = this.querySelector('button'); button.disabled = true;
      try { await api('support', { method: 'POST', body: { text: text } }); el('supportText').value = ''; await refresh(); }
      catch (err) { toast(messageFor(err.message)); }
      button.disabled = false;
    };
    el('supportRefresh').onclick = refresh;
    await refresh();
  }

  /* Admin panel: every operation is checked by the server-side admin session. */
  async function renderAdmin(a) {
    try { await api('admin/me'); isAdmin = true; }
    catch (_) { isAdmin = false; a.innerHTML = '<div class="policy card pad"><h1>Admin sign in</h1><p>This area requires the configured administrator account.</p><button class="btn pri" onclick="openCloudGate(\'in\')">Sign in</button></div>'; return; }
    a.innerHTML = '<section class="policy admin-panel"><div class="pg-h"><div><h1>AXIOM administration</h1><p>User support, account controls, study progress and a limited action log.</p></div><button class="btn" onclick="accLogout()">Sign out</button></div><div class="admin-tabs"><button class="btn sm on" data-tab="users">Users</button><button class="btn sm" data-tab="support">Support inbox</button><button class="btn sm" data-tab="audit">Admin actions</button></div><div id="adminBody" class="card pad">Loading…</div></section>';
    var tab = 'users';
    var userOffset = 0;
    async function draw() {
      var host = el('adminBody'); if (!host) return;
      document.querySelectorAll('.admin-tabs [data-tab]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-tab') === tab); });
      try {
        if (tab === 'users') {
          var result = await api('admin/users?offset=' + userOffset + '&limit=100');
          host.innerHTML = '<h2>Accounts <small>' + result.total + ' total</small></h2><div class="admin-list">' + (result.users || []).map(function (u) {
            return '<button class="admin-row" data-user="' + attr(u.id) + '"><span class="av">' + esc((u.name || '?').charAt(0).toUpperCase()) + '</span><span><b>' + esc(u.name) + '</b><small>@' + esc(u.username || '') + ' · ' + (u.banned ? 'restricted' : 'active') + '</small></span><small>' + (u.lastSeen ? new Date(u.lastSeen).toLocaleDateString() : 'Never') + '</small></button>';
          }).join('') + '</div><div class="row admin-pages">' + (userOffset > 0 ? '<button class="btn sm" data-page="prev">Previous</button>' : '') + (userOffset + 100 < result.total ? '<button class="btn sm" data-page="next">Next</button>' : '') + '</div><div id="adminDetail"></div>';
          host.querySelectorAll('[data-page]').forEach(function (b) { b.onclick = function () { userOffset = Math.max(0, userOffset + (b.getAttribute('data-page') === 'next' ? 100 : -100)); draw(); }; });
          host.querySelectorAll('[data-user]').forEach(function (b) { b.onclick = function () { userDetail(b.getAttribute('data-user')); }; });
        } else if (tab === 'support') {
          var result = await api('admin/support');
          host.innerHTML = '<h2>Support inbox</h2><div class="admin-list">' + ((result.threads || []).map(function (t) {
            return '<button class="admin-row" data-thread="' + attr(t.userId) + '"><span class="av">' + esc((t.name || '?').charAt(0).toUpperCase()) + '</span><span><b>' + esc(t.name) + (t.unread ? ' · new' : '') + '</b><small>' + esc(t.lastText || 'No message') + '</small></span><small>' + (t.lastTs ? new Date(t.lastTs).toLocaleDateString() : '') + '</small></button>';
          }).join('') || '<p class="muted">No support messages yet.</p>') + '</div><div id="adminThread"></div>';
          host.querySelectorAll('[data-thread]').forEach(function (b) { b.onclick = function () { supportThread(b.getAttribute('data-thread')); }; });
        } else {
          var result = await api('admin/audit');
          host.innerHTML = '<h2>Recent admin actions</h2><div class="admin-list">' + ((result.entries || []).map(function (e) {
            return '<div class="admin-audit"><b>' + esc(e.action) + '</b><span>Account ' + esc(e.targetId || '—') + '</span><small>' + new Date(e.ts).toLocaleString() + (e.details && e.details.banned === false ? ' · unbanned' : e.details && e.details.banned === true ? ' · banned' : '') + '</small></div>';
          }).join('') || '<p class="muted">No admin actions recorded yet.</p>') + '</div>';
        }
      } catch (e) { host.textContent = messageFor(e.message); }
    }
    async function userDetail(id) {
      var place = el('adminDetail'); if (!place) return;
      place.innerHTML = '<p>Loading account…</p>';
      try {
        var d = await api('admin/user?id=' + encodeURIComponent(id));
        var p = d.progress || {}, mh = Array.isArray(p.mockHist) ? p.mockHist.slice(-8).reverse() : [];
        place.innerHTML = '<div class="admin-detail"><h3>' + esc(d.user.name) + '</h3><p>@' + esc(d.user.username || '') + ' · joined ' + (d.user.created ? new Date(d.user.created).toLocaleDateString() : 'unknown') + ' · last active ' + (d.user.lastSeen ? new Date(d.user.lastSeen).toLocaleString() : 'unknown') + '</p>' +
          '<div class="admin-stats"><span><b>' + (p.xp || 0) + '</b> XP</span><span><b>' + (p.lessonsCompleted || 0) + '</b> lessons</span><span><b>' + (p.answered || 0) + '</b> answers</span><span><b>' + (p.answered ? Math.round(100 * (p.correctN || 0) / p.answered) : 0) + '%</b> accuracy</span><span><b>' + (p.mockHist || []).length + '</b> tests</span></div>' +
          '<h4>Unit quiz best scores</h4>' + (Object.keys(p.quiz || {}).filter(function (key) { return Number(p.quiz[key]) > 0; }).map(function (key) { var unit = findUnit(key); return '<div class="admin-audit"><b>' + esc(unit ? unit.title : key) + '</b><span>' + esc(p.quiz[key]) + '%</span></div>'; }).join('') || '<p class="muted">No unit quiz scores.</p>') +
          '<h4>Recent practice test results</h4>' + (mh.map(function (r) { return '<div class="admin-audit"><b>' + esc(r.score) + ' estimated score</b><span>' + esc(r.raw) + '/' + esc(r.total) + ' · ' + esc(r.date) + '</span></div>'; }).join('') || '<p class="muted">No practice test results.</p>') +
          '<h4>Recent learning activity</h4>' + ((d.activity || []).slice(0, 30).map(function (v) { return '<div class="admin-audit"><b>' + esc(v.event) + '</b><span>' + esc(v.data && (v.data.title || v.data.lessonId) || '') + '</span><small>' + new Date(v.ts).toLocaleString() + '</small></div>'; }).join('') || '<p class="muted">No recent activity events.</p>') +
          '<div class="row" style="margin-top:12px"><button id="adminBan" class="btn ' + (d.user.banned ? '' : 'warn') + '">' + (d.user.banned ? 'Restore account' : 'Restrict account') + '</button></div></div>';
        el('adminBan').onclick = async function () {
          var banned = !d.user.banned;
          var reason = banned ? (prompt('Reason shown to the user (optional):') || '') : '';
          if (!banned && !confirm('Restore this account?')) return;
          try { await api('admin/ban', { method: 'POST', body: { id: id, banned: banned, reason: reason } }); toast(banned ? 'Account restricted' : 'Account restored'); draw(); }
          catch (e) { toast(messageFor(e.message)); }
        };
      } catch (e) { place.textContent = messageFor(e.message); }
    }
    async function supportThread(id) {
      currentSupportId = id;
      var place = el('adminThread'); if (!place) return;
      try {
        var result = await api('admin/support?id=' + encodeURIComponent(id));
        place.innerHTML = '<div class="admin-detail"><h3>Conversation</h3><div class="admin-thread">' + (result.messages || []).map(function (m) {
          return '<div class="support-msg ' + (m.from === 'admin' ? 'from-admin' : '') + '"><b>' + (m.from === 'admin' ? 'AXIOM support' : 'User') + '</b><small>' + new Date(m.ts).toLocaleString() + '</small><p>' + esc(m.text) + '</p></div>';
        }).join('') + '</div><form id="adminReply"><label class="fl">Reply<textarea id="adminReplyText" maxlength="2000" required rows="3"></textarea></label><button class="btn pri">Send reply</button></form></div>';
        el('adminReply').onsubmit = async function (e) {
          e.preventDefault(); var text = el('adminReplyText').value.trim(); if (!text) return;
          try { await api('admin/support', { method: 'POST', body: { userId: currentSupportId, text: text } }); await supportThread(currentSupportId); }
          catch (err) { toast(messageFor(err.message)); }
        };
      } catch (e) { place.textContent = messageFor(e.message); }
    }
    document.querySelectorAll('.admin-tabs [data-tab]').forEach(function (b) { b.onclick = function () { tab = b.getAttribute('data-tab'); draw(); }; });
    await draw();
  }

  /* Public terms and privacy pages. Keep disclosures synchronized with API behavior. */
  function legalPage(kind, a) {
    if (kind === 'privacy') {
      a.innerHTML = '<section class="policy card pad"><div class="eyebrow">AXIOM · Privacy Policy · Version 1.0 · 9 October 2026</div><h1>Privacy Policy</h1><p>This notice explains what AXIOM stores and when information leaves this site.</p>' +
        '<h2>Information stored</h2><ul><li>Account name, username, password hash, creation time and account status. AXIOM does not ask for your email address.</li><li>Learning progress, including completed lessons, quiz scores, study streaks, practice test results, profile settings and notes you choose to sync. A copy may also remain in this browser for local use.</li><li>Limited activity events such as lesson completion and quiz/test results, plus last active time. AXIOM does not record keystrokes or every page view.</li><li>Messages you send to support and the administrator’s replies.</li><li>Browser-only settings and chat history may be saved in local storage on your device.</li></ul>' +
        '<h2>Passwords</h2><p>New cloud account passwords are processed by the server and saved as a salted scrypt hash. AXIOM cannot read or recover them. Older device-only accounts may use a legacy browser-side hash and remain on that device. Passwords are never sent to Telegram and should not be included in support or AI messages.</p>' +
        '<h2>Axilotti and Groq</h2><p>When cloud AI is available and you send a message to Axilotti, the message and recent relevant chat, lesson or mistake context are sent through AXIOM’s server to Groq to generate a response. Chat history is kept in this browser; AXIOM does not save AI conversations to its account database. Groq processes requests under its own privacy terms. Do not enter passwords or sensitive personal information.</p>' +
        '<h2>Database, support and administrator</h2><p>Account details, random sign-in session tokens, synced progress, limited learning events and support messages are stored in the AXIOM database provider configured by the operator. A session cookie stays in your browser so you can remain signed in. The administrator panel shows account details, study summaries, recent learning events and support messages to provide support and moderate accounts; it does not display private notes. Restricted accounts can still use support to contact the administrator. Database operators may have broader technical access to stored data. Admin actions such as restrictions and support replies are logged.</p>' +
        '<h2>Telegram alerts</h2><p>If Telegram notifications are configured, AXIOM sends only a generic new-account alert. Passwords, learning results, activity details and support message text are not sent to Telegram.</p>' +
        '<h2>Retention and your choices</h2><p>Progress and support threads remain in the database while the account is active. This version does not yet provide self-service account deletion; contact support to request account deletion or correction. You can clear browser-only chat history from the Axilotti chat menu and remove local data using your browser settings.</p>' +
        '<h2>Operational logs</h2><p>AXIOM uses IP-derived counters to limit sign-in, registration and AI requests; these counters expire automatically. The hosting provider may keep server request logs under its own policies.</p>' +
        '<h2>Contact</h2><p>Use the <a href="#/support">Support</a> page for privacy questions. Creating a cloud account records the time you accepted this policy version. Account deletion requests must be handled by the site operator.</p><a class="btn" href="#/terms">Terms of Use</a></section>';
    } else {
      a.innerHTML = '<section class="policy card pad"><div class="eyebrow">AXIOM · Terms of Use · Version 1.0 · 9 October 2026</div><h1>Terms of Use</h1><p>By using AXIOM, you agree to these terms and the <a href="#/privacy">Privacy Policy</a>.</p>' +
        '<h2>Learning service</h2><p>AXIOM provides SAT Math study materials, practice questions and an AI tutoring feature for educational use. Content and score estimates are learning aids and are not official SAT results or a guarantee of any score.</p>' +
        '<h2>Accounts and security</h2><p>Choose a username, use a password you do not reuse elsewhere, and keep your sign-in details private. AXIOM stores a one-way password hash and cannot send your password back to you. Do not share credentials or submit them in support or AI chats.</p>' +
        '<h2>Acceptable use</h2><p>Do not disrupt the service, attempt to access another person’s account, misuse support, or use the service for unlawful activity. The administrator may restrict accounts to protect users or the service and should provide a reason where appropriate.</p>' +
        '<h2>AI answers</h2><p>Axilotti can make mistakes. Check explanations and answers, especially before relying on them outside practice. Messages you submit are processed by Groq as described in the Privacy Policy.</p>' +
        '<h2>Availability and changes</h2><p>AXIOM is provided as available. Features, lessons and these terms may change. Continued use after a posted update means you accept the revised terms.</p>' +
        '<h2>Contact</h2><p>Questions about these terms: <a href="#/support">contact support</a>.</p><a class="btn" href="#/privacy">Privacy Policy</a></section>';
    }
  }
  var oldRouter = router;
  router = function () {
    var h = location.hash.replace(/^#/, '') || '/';
    var parts = h.split('/').filter(Boolean);
    var a = el('app');
    if (parts[0] === 'privacy' || parts[0] === 'terms') { markNav(h); legalPage(parts[0], a); return; }
    if (parts[0] === 'support') { markNav(h); renderSupport(a); return; }
    if (parts[0] === 'admin') { markNav(h); renderAdmin(a); return; }
    return oldRouter.apply(this, arguments);
  };
  var oldHome = viewHome;
  viewHome = function (a) {
    oldHome.apply(this, arguments);
    var links = document.createElement('div');
    links.className = 'legal-links';
    links.innerHTML = '<a href="#/privacy">Privacy Policy</a><a href="#/terms">Terms of Use</a><a href="#/support">Support</a>';
    a.appendChild(links);
  };
  window.addEventListener('hashchange', function () { if (oldChatOpen && AXC && AXC.open) { var n = el('axcBody'); if (n) n.scrollTop = n.scrollHeight; } });
  window.addEventListener('online', function () { if (cloudUserId) queueProgressSync(); });

  /* Start with server session discovery. Do not expose account credentials in the page. */
  (async function bootstrap() {
    try {
      var session = await api('auth/me');
      isAdmin = !!session.admin;
      if (session.banned && !session.admin) {
        checkingSession = false; gateDismissed = true; AUTH.user = null; cloudUserId = session.user ? session.user.id : ''; window.Z800_USER = '__guest';
        el('app').innerHTML = '<div class="policy card pad"><h1>Account restricted</h1><p>' + esc(session.reason || 'This account is restricted.') + '</p><p>You can still contact the AXIOM administrator and read replies.</p><a class="btn pri" href="#/support">Open support chat</a></div>';
        renderAcct(); return;
      }
      if (session.banned && session.admin) { AUTH.user = null; cloudUserId = ''; window.Z800_USER = '__guest'; }
      else if (session.user) await loadCloudProgress(session.user);
      else { checkingSession = false; if (AUTH.user && !AUTH.user.username) AUTH.user.localOnly = true; renderAcct(); if (!AUTH.user && window.Z800_USER !== '__guest' && location.hash !== '#/admin') setTimeout(function () { accGate('up'); }, 120); var choseGuest = false; try { choseGuest = sessionStorage.getItem('z800_session') === '__guest'; } catch (_) {} if (!AUTH.user && window.Z800_USER === '__guest' && !choseGuest && location.hash !== '#/admin') setTimeout(function () { accGate('up'); }, 120); if (location.hash === '#/admin') router(); }
    } catch (_) {
      // Backend unreachable (opened as static files, offline, or not deployed
      // with its functions). Run smoothly as a guest instead of showing a
      // sign-in gate that cannot succeed. Accounts/admin/AI light up once the
      // server is running. The account button still opens sign-in on demand.
      checkingSession = false;
      gateDismissed = true;
      if (typeof AUTH !== 'undefined' && AUTH.user && !AUTH.user.username) {
        AUTH.user.localOnly = true; // a legacy device-only account stays signed in
      } else if (!(typeof AUTH !== 'undefined' && AUTH.user)) {
        window.Z800_USER = '__guest';
        try { sessionStorage.setItem('z800_session', '__guest'); } catch (e) {}
      }
      if (typeof renderAcct === 'function') renderAcct();
      if (location.hash === '#/admin') router();
    }
    checkingSession = false;
    if (typeof renderAcct === 'function') renderAcct();
    if (isAdmin && location.hash === '#/admin') router();
  })();

  var style = document.createElement('style');
  style.textContent = '.axc-privacy-note{padding:6px 12px;font-size:11px;line-height:1.35;color:var(--ink2);border-top:1px solid var(--line);background:var(--paper)}.ax-offline-note{padding:8px 10px;margin-bottom:8px;border-radius:10px;background:var(--soft);color:var(--ink2);font-size:12px}.legal-links{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;padding:30px 12px 10px;color:var(--ink2);font-size:13px}.legal-links a,.policy a{color:var(--blue)}.policy{max-width:900px;margin:0 auto;animation:axCloudIn .38s cubic-bezier(.2,.8,.2,1) both}.policy h1{font:800 34px var(--disp);margin:8px 0 16px}.policy h2{font:800 21px var(--disp);margin:26px 0 8px}.policy h3,.policy h4{margin:20px 0 8px}.policy p,.policy li{color:var(--ink2);line-height:1.7}.policy ul{padding-left:22px}.policy .eyebrow{color:var(--violet);font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.policy .muted{font-size:13px}.support-form{margin-top:16px}.support-form textarea,.admin-detail textarea{width:100%;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);font:inherit}.support-msg{padding:12px;margin:8px 0;border-radius:14px;background:var(--soft);animation:axCloudIn .24s ease both}.support-msg.from-admin{border-left:3px solid var(--blue)}.support-msg b{font-size:13px}.support-msg small{float:right;color:var(--ink2);font-size:11px}.support-msg p{white-space:pre-wrap;margin:8px 0 0}.admin-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}.admin-pages{justify-content:space-between;margin-top:12px}.admin-list{display:grid;gap:7px}.admin-row{width:100%;display:flex;align-items:center;gap:12px;text-align:left;padding:10px;border-radius:12px;background:var(--paper);border:1px solid var(--line);color:var(--ink);cursor:pointer;transition:transform .18s,border-color .18s,box-shadow .18s;animation:axCloudIn .24s ease both}.admin-row>span:nth-child(2){flex:1;min-width:0}.admin-row small{display:block;color:var(--ink2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.admin-row:hover{border-color:var(--blue);transform:translateY(-2px);box-shadow:0 9px 22px -16px var(--blue)}.admin-detail{margin-top:18px;padding:16px;border:1px solid var(--line);border-radius:16px;background:var(--paper);animation:axCloudIn .3s ease both}.admin-detail>p{color:var(--ink2);font-size:13px}.admin-stats{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}.admin-stats span{padding:8px 12px;border-radius:12px;background:var(--soft);color:var(--ink2)}.admin-stats b{color:var(--ink)}.admin-audit{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:10px;border-bottom:1px solid var(--line)}.admin-audit span,.admin-audit small{color:var(--ink2)}.admin-audit small{margin-left:auto}.admin-thread{max-height:400px;overflow:auto}.admin-panel h2 small{font:500 13px var(--ui);color:var(--ink2)}@keyframes axCloudIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){.admin-row,.policy,.support-msg,.admin-detail{animation:none!important;transition:none!important}.admin-row:hover{transform:none!important}}';
  document.head.appendChild(style);
})();
