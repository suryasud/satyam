/* ══════════════════════════════════════════════════════════════
   assets/js/core.js  ·  SATYAM shared engine
   Icons · sound (tanpura + bell) · Day/Sandhya · Om background ·
   drifting motes · nav & scroll · drawer + reader · toasts
   Every future page loads this file first.
   ══════════════════════════════════════════════════════════════ */
window.ST = window.ST || {};
(function (ST) {
"use strict";

ST.repoUrl = "https://github.com/";           /* ← set to your repo, e.g. https://github.com/<you>/satyam */
ST.RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
ST.$ = function (id) { return document.getElementById(id); };
ST.store = {
  get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
ST.TYPE_CLASS = {
  "Direct Teaching": "t-teach", "Personal Reflection": "t-refl", "Word by word": "t-word",
  "Essay": "t-essay", "Study": "t-note", "Purāṇa Note": "t-story", "Journal": "t-note", "Teaching": "t-teach"
};
ST.hexToRgb = function (hex) {
  hex = String(hex).trim().replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
  var n = parseInt(hex, 16);
  if (isNaN(n)) return [184, 107, 43];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/* ───────── shared reading components ───────── */
ST.verseBlock = function (dev, translit) {
  return '<div class="verse-block"><p class="vb-dev" lang="sa">' + dev + '</p><p class="vb-translit">' + translit + '</p></div>';
};
ST.wordsTable = function (rows) {
  return '<p class="block-label">Word by word</p><table class="words-table"><thead><tr><th style="width:38%">Word</th><th>Meaning</th></tr></thead><tbody>' +
    rows.map(function (r) {
      return '<tr><td><span class="w-dev" lang="sa">' + r[0] + '</span><span class="w-iast">' + r[1] + '</span></td><td>' + r[2] + '</td></tr>';
    }).join("") + '</tbody></table>';
};
ST.translation = function (t) { return '<p class="block-label">Meaning</p><blockquote class="translation">' + t + '</blockquote>'; };
ST.epigraph = function (dev, translit, meaning, cite) {
  return '<div class="epigraph"><p class="dev" lang="sa">' + dev + '</p><span class="iast">' + translit + '</span><q>' + meaning + '</q><cite>' + cite + '</cite></div>';
};
ST.reflBlock = function (html) {
  return '<div class="refl"><button class="refl-toggle" aria-expanded="false">' +
    '<svg class="ic"><use href="#i-heart"/></svg>' +
    '<span class="lbl"><small>Stream II · Anubhava — my own, not scripture</small><span class="refl-verb">Show my reflection</span></span>' +
    '<svg class="ic sm chev"><use href="#i-chevron"/></svg></button>' +
    '<div class="refl-wrap"><div class="refl-inner"><div class="refl-body">' + html + '</div></div></div></div>';
};

/* ───────── icon sprite ───────── */
var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
'<symbol id="i-lotus" viewBox="0 0 24 24"><path d="M12 4.5C13.8 6.8 14.7 8.9 14.7 10.9C14.7 13.2 13.5 14.6 12 14.6C10.5 14.6 9.3 13.2 9.3 10.9C9.3 8.9 10.2 6.8 12 4.5Z"/><path d="M4 8.2C6.6 8.9 8.7 10.3 9.9 12.4C10.5 13.4 10.8 14.3 10.9 15.1C8.4 15.3 6.3 14.5 4.9 12.6C4.2 11.6 3.9 10.1 4 8.2Z"/><path d="M20 8.2C17.4 8.9 15.3 10.3 14.1 12.4C13.5 13.4 13.2 14.3 13.1 15.1C15.6 15.3 17.7 14.5 19.1 12.6C19.8 11.6 20.1 10.1 20 8.2Z"/><path d="M4.5 15.8C6 18.4 8.7 19.8 12 19.8C15.3 19.8 18 18.4 19.5 15.8C17.2 17 14.7 17.6 12 17.6C9.3 17.6 6.8 17 4.5 15.8Z"/></symbol>' +
'<symbol id="i-chakra" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.3"/><path d="M12 3v6.7M12 14.3V21M3 12h6.7M14.3 12H21M5.6 5.6l4.8 4.8M13.6 13.6l4.8 4.8M18.4 5.6l-4.8 4.8M10.4 13.6l-4.8 4.8"/></symbol>' +
'<symbol id="i-bow" viewBox="0 0 24 24"><path d="M6 3C15 6 15 18 6 21"/><path d="M6 3v18"/><path d="M6 12h14"/><path d="M20 12l-3.5-2.2M20 12l-3.5 2.2"/></symbol>' +
'<symbol id="i-mala" viewBox="0 0 24 24"><circle cx="19" cy="10" r="1.25"/><circle cx="18.06" cy="13.5" r="1.25"/><circle cx="15.5" cy="16.06" r="1.25"/><circle cx="8.5" cy="16.06" r="1.25"/><circle cx="5.94" cy="13.5" r="1.25"/><circle cx="5" cy="10" r="1.25"/><circle cx="5.94" cy="6.5" r="1.25"/><circle cx="8.5" cy="3.94" r="1.25"/><circle cx="12" cy="3" r="1.25"/><circle cx="15.5" cy="3.94" r="1.25"/><circle cx="18.06" cy="6.5" r="1.25"/><circle cx="12" cy="17.6" r="1.9"/><path d="M12 19.5V22M10.6 21.4L12 19.8l1.4 1.6"/></symbol>' +
'<symbol id="i-diya" viewBox="0 0 24 24"><path d="M4 15h16c0 3.4-3.6 5.5-8 5.5S4 18.4 4 15Z"/><path d="M12 12v3"/><path d="M12 3.5C13.8 5.9 14.6 7.4 14.6 9C14.6 10.8 13.4 12 12 12C10.6 12 9.4 10.8 9.4 9C9.4 7.4 10.2 5.9 12 3.5Z"/></symbol>' +
'<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 8h6M9 12h4"/></symbol>' +
'<symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></symbol>' +
'<symbol id="i-quill" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8L2 22M17.5 15H9"/></symbol>' +
'<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20C7 16 4 13 4 9.5C4 7 6 5 8.5 5C10 5 11.3 5.8 12 7C12.7 5.8 14 5 15.5 5C18 5 20 7 20 9.5C20 13 17 16 12 20Z"/></symbol>' +
'<symbol id="i-rings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" opacity=".65"/><circle cx="12" cy="12" r="10.5" opacity=".35"/></symbol>' +
'<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>' +
'<symbol id="i-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></symbol>' +
'<symbol id="i-bell" viewBox="0 0 24 24"><path d="M12 4C8.7 4 6.5 6.4 6.5 9.5C6.5 13 5.5 14.5 4.5 15.5H19.5C18.5 14.5 17.5 13 17.5 9.5C17.5 6.4 15.3 4 12 4Z"/><path d="M12 2.5V4M10.5 18.5a1.5 1.5 0 0 0 3 0"/></symbol>' +
'<symbol id="i-bell-off" viewBox="0 0 24 24"><path d="M12 4C8.7 4 6.5 6.4 6.5 9.5C6.5 13 5.5 14.5 4.5 15.5H19.5C18.5 14.5 17.5 13 17.5 9.5C17.5 6.4 15.3 4 12 4Z"/><path d="M10.5 18.5a1.5 1.5 0 0 0 3 0M4 3l16 18"/></symbol>' +
'<symbol id="i-github" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></symbol>' +
'<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
'<symbol id="i-up" viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6"/></symbol>' +
'<symbol id="i-chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>' +
'<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
'<symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15h-.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/></symbol>' +
'<symbol id="i-check" viewBox="0 0 24 24"><path d="M4.5 12.5l5 5L19.5 7"/></symbol>' +
'<symbol id="i-shuffle" viewBox="0 0 24 24"><path d="M3 7h4l10 10h4M3 17h4l2.8-2.8M14.2 9.8L17 7h4M18.5 4.5L21 7l-2.5 2.5M18.5 14.5L21 17l-2.5 2.5"/></symbol>' +
'<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
'<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8Z"/></symbol>' +
'</defs></svg>';

var SHELLS =
'<div id="scrim" hidden></div>' +
'<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle" hidden>' +
  '<div class="dr-head"><span class="dr-icon" id="drIcon"></span>' +
  '<div class="dr-titles"><h2 id="drawerTitle"></h2><span class="dev" id="drawerDev" lang="sa"></span></div>' +
  '<button class="close-btn" id="drawerClose" aria-label="Close preview"><svg class="ic"><use href="#i-close"/></svg></button></div>' +
  '<div class="dr-scroll" id="drawerBody"></div><div class="dr-foot" id="drawerFoot"></div></aside>' +
'<div class="reader" id="reader" role="dialog" aria-modal="true" aria-labelledby="readerTitle" hidden><div class="reader-card">' +
  '<div class="reader-top"><div class="reader-chips" id="readerChips"></div>' +
  '<button class="close-btn" id="readerClose" aria-label="Close page"><svg class="ic"><use href="#i-close"/></svg></button></div>' +
  '<div class="reader-scroll" id="readerScroll"><div class="reader-content" id="readerContent"></div></div>' +
  '<div class="reader-foot"><button class="r-nav-btn" id="readerPrev"><small>← Previous</small><span id="prevLabel"></span></button>' +
  '<button class="r-copy" id="readerCopy"><svg class="ic sm"><use href="#i-copy"/></svg> Copy verse</button>' +
  '<button class="r-nav-btn next" id="readerNext"><small>Next →</small><span id="nextLabel"></span></button></div>' +
'</div></div>' +
'<div id="toasts" aria-live="polite"></div>' +
'<button id="toTop" aria-label="Back to top"><svg class="ic"><use href="#i-up"/></svg></button>';

document.body.insertAdjacentHTML("afterbegin", SPRITE);
document.body.insertAdjacentHTML("beforeend", SHELLS);

/* ───────── toasts & clipboard ───────── */
ST.toast = function (msg, icon) {
  var host = ST.$("toasts");
  while (host.children.length >= 3) host.firstChild.remove();
  var t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = '<svg class="ic"><use href="#' + (icon || "i-check") + '"/></svg><span></span>';
  t.querySelector("span").textContent = msg;
  host.appendChild(t);
  setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 320); }, 2500);
};
ST.copyText = function (text, msg) {
  var ok = function () { ST.toast(msg, "i-check"); };
  var no = function () { ST.toast("Couldn’t copy — your browser blocked it", "i-close"); };
  var fallback = function () {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      var done = document.execCommand("copy"); ta.remove();
      done ? ok() : no();
    } catch (e) { no(); }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok).catch(fallback);
  else fallback();
};

/* ───────── sound: tanpura drone + temple bell ───────── */
ST.sound = (function () {
  var ctx = null, master = null, timer = null, idx = 0, running = false;
  var enabled = ST.store.get("satyam-sound") !== "0";
  var SA = 130.81, PA = 196.0, SA2 = 261.63, PATTERN = [PA, SA2, SA2, SA];
  function build() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      var bus = ctx.createGain(); bus.gain.value = .9; bus.connect(master);
      var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 880; lp.connect(bus);
      [[SA, "triangle", .020], [PA, "triangle", .013], [SA2, "sine", .009]].forEach(function (c) {
        var o = ctx.createOscillator(); o.type = c[1]; o.frequency.value = c[0];
        var g = ctx.createGain(); g.gain.value = c[2];
        o.connect(g); g.connect(lp); o.start();
        var lfo = ctx.createOscillator(); lfo.frequency.value = .06 + Math.random() * .05;
        var lg = ctx.createGain(); lg.gain.value = 1.8;
        lfo.connect(lg); lg.connect(o.detune); lfo.start();
      });
      var breath = ctx.createOscillator(); breath.frequency.value = .05;
      var bg = ctx.createGain(); bg.gain.value = .12;
      breath.connect(bg); bg.connect(bus.gain); breath.start();
    } catch (e) { ctx = null; }
  }
  function pluck(f) {
    if (!ctx) return;
    var t = ctx.currentTime;
    var env = ctx.createGain(); env.connect(master);
    env.gain.setValueAtTime(.0001, t);
    env.gain.exponentialRampToValueAtTime(.05, t + .012);
    env.gain.exponentialRampToValueAtTime(.0001, t + 2.6);
    var flt = ctx.createBiquadFilter(); flt.type = "lowpass"; flt.frequency.value = 2400; flt.connect(env);
    [1, 2, 3, 4.02].forEach(function (h, i) {
      var o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f * h; o.detune.value = Math.random() * 6 - 3;
      var g = ctx.createGain(); g.gain.value = [1, .42, .24, .12][i];
      o.connect(g); g.connect(flt); o.start(t); o.stop(t + 2.8);
    });
    setTimeout(function () { try { env.disconnect(); } catch (e) {} }, 3100);
  }
  function schedule() {
    if (!running || !enabled || !ctx) return;
    pluck(PATTERN[idx % 4]); idx++;
    timer = setTimeout(schedule, 1500);
  }
  function start() { if (running) return; running = true; schedule(); }
  function stop() { running = false; clearTimeout(timer); timer = null; }
  function ensure() {
    if (!enabled) return;
    build(); if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(.9, ctx.currentTime, .4);
    start();
  }
  function bell(base) {
    if (!enabled || !ctx || ctx.state !== "running") return;
    var f = (base || 587) * (1 + (Math.random() * .01 - .005)), t = ctx.currentTime;
    var env = ctx.createGain(); env.connect(master);
    env.gain.setValueAtTime(.0001, t);
    env.gain.exponentialRampToValueAtTime(.09, t + .008);
    env.gain.exponentialRampToValueAtTime(.0001, t + 2.4);
    [[1, .5], [2, .22], [2.98, .14], [4.2, .08], [5.43, .05]].forEach(function (p) {
      var o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f * p[0];
      var g = ctx.createGain(); g.gain.value = p[1];
      o.connect(g); g.connect(env); o.start(t); o.stop(t + 2.6);
    });
    setTimeout(function () { try { env.disconnect(); } catch (e) {} }, 2900);
  }
  function setEnabled(v) {
    enabled = v; ST.store.set("satyam-sound", v ? "1" : "0");
    if (v) { ensure(); bell(659); }
    else { stop(); if (ctx && master) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0, ctx.currentTime, .12); } }
  }
  document.addEventListener("visibilitychange", function () {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else if (enabled) ctx.resume();
  });
  return { get enabled() { return enabled; }, setEnabled: setEnabled, bell: bell, firstGesture: ensure };
})();
window.addEventListener("pointerdown", function () { ST.sound.firstGesture(); }, { once: true });
window.addEventListener("keydown", function () { ST.sound.firstGesture(); }, { once: true });

/* ───────── theme: Day / Sandhya ───────── */
var themeHooks = [];
ST.onTheme = function (fn) { themeHooks.push(fn); };
ST.isSandhya = function () { return document.documentElement.dataset.theme === "sandhya"; };
ST.applyTheme = function (sandhya) {
  document.documentElement.dataset.theme = sandhya ? "sandhya" : "day";
  var icon = ST.$("themeIcon"), label = ST.$("themeLabel"), btn = ST.$("themeBtn"), meta = ST.$("themeMeta");
  if (icon) icon.setAttribute("href", sandhya ? "#i-sun" : "#i-moon");
  if (label) label.textContent = sandhya ? "Day" : "Sandhya";
  if (btn) btn.setAttribute("aria-label", sandhya ? "Switch to Day mode" : "Switch to Sandhya evening mode");
  if (meta) meta.setAttribute("content", sandhya ? "#1A1715" : "#FAF7F2");
  ST.store.set("satyam-theme", sandhya ? "sandhya" : "day");
  themeHooks.forEach(function (fn) { fn(); });
};

/* ───────── Om background ───────── */
ST.buildOm = function (svg) {
  if (!svg) return;
  var NS = "http://www.w3.org/2000/svg";
  var a = svg.querySelector("#omA"), b = svg.querySelector("#omB");
  if (!a || !b) return;
  function mk(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    parent.appendChild(el);
  }
  var ring = { fill: "none", stroke: "currentColor", "stroke-width": "1.2" };
  mk("circle", Object.assign({ cx: 500, cy: 500, r: 470 }, ring), a);
  mk("circle", Object.assign({ cx: 500, cy: 500, r: 452, "stroke-dasharray": "1 15", "stroke-linecap": "round" }, ring), a);
  mk("circle", Object.assign({ cx: 500, cy: 500, r: 268 }, ring), a);
  for (var i = 0; i < 24; i++) {
    mk("path", { d: "M500 78 C536 132 536 186 500 226 C464 186 464 132 500 78 Z", transform: "rotate(" + (i * 15) + " 500 500)", fill: "var(--om-fill)", stroke: "currentColor", "stroke-width": "1.1" }, a);
    mk("line", { x1: 500, y1: 246, x2: 500, y2: 264, transform: "rotate(" + (i * 15 + 7.5) + " 500 500)", stroke: "currentColor", "stroke-width": "1.1" }, a);
  }
  mk("circle", Object.assign({ cx: 500, cy: 500, r: 232, "stroke-dasharray": "2 12", "stroke-linecap": "round" }, ring), b);
  for (var j = 0; j < 12; j++) {
    mk("path", { d: "M500 280 C530 318 530 362 500 396 C470 362 470 318 500 280 Z", transform: "rotate(" + (j * 30) + " 500 500)", fill: "var(--om-fill)", stroke: "currentColor", "stroke-width": "1.1" }, b);
  }
};

/* ───────── drifting motes ───────── */
var cv, cx, list = [], palette = [[184, 107, 43], [201, 162, 74], [94, 113, 98]], boost = 1;
var raf = null, last = 0, clock = 0, W = 0, H = 0;
function refreshPalette(vars) {
  var cs = getComputedStyle(document.documentElement);
  palette = vars.map(function (v) { return ST.hexToRgb(cs.getPropertyValue(v) || "#B86B2B"); });
  boost = parseFloat(cs.getPropertyValue("--mote-boost")) || 1;
}
function spawn(anyY) {
  return { x: Math.random() * W, y: anyY ? Math.random() * H : H + 24, s: .8 + Math.random() * 2.2, petal: Math.random() < .18,
    vy: 6 + Math.random() * 10, swa: 6 + Math.random() * 10, swf: .2 + Math.random() * .5, ph: Math.random() * 6.283,
    rot: Math.random() * 6.283, vr: (Math.random() - .5) * .6, a: .10 + Math.random() * .2, tw: .3 + Math.random() * .7, ci: Math.floor(Math.random() * 3) };
}
function size() {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  var target = Math.min(44, Math.max(14, Math.floor(W / 32)));
  while (list.length < target) list.push(spawn(true));
  list.length = target;
}
function frame(ts) {
  raf = requestAnimationFrame(frame);
  var dt = Math.min((ts - last) / 1000, .05); last = ts; clock += dt;
  cx.clearRect(0, 0, W, H);
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    p.y -= p.vy * dt; p.x += Math.sin(clock * p.swf + p.ph) * p.swa * dt; p.rot += p.vr * dt;
    if (p.y < -26) list[i] = spawn(false);
    var c = palette[p.ci], al = Math.min(.55, p.a * boost * (.55 + .45 * Math.sin(clock * p.tw + p.ph)));
    cx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + al.toFixed(3) + ")";
    if (p.petal) {
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
      cx.beginPath(); cx.ellipse(0, 0, p.s * 2.1, p.s * .85, 0, 0, 6.283); cx.fill(); cx.restore();
    } else { cx.beginPath(); cx.arc(p.x, p.y, p.s, 0, 6.283); cx.fill(); }
  }
}
function startMotes() { if (ST.RM || raf !== null) return; last = performance.now(); raf = requestAnimationFrame(frame); }
function stopMotes() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

/* ───────── overlays ───────── */
var scrim = ST.$("scrim"),
    drawerEl = ST.$("drawer"),
    readerEl = ST.$("reader");
var currentPages = [], currentIdx = 0;

/* ───────── motes public API ───────── */
ST.initMotes = function () {
  cv = ST.$("motes"); if (!cv) return;
  cx = cv.getContext("2d");
  refreshPalette(["--sandalwood", "--gold2", "--sage"]);
  size();
  window.addEventListener("resize", size, { passive: true });
  startMotes();
};
ST.refreshMotes = function () {
  refreshPalette(["--sandalwood", "--gold2", "--sage"]);
};

/* ───────── focus trap helper ───────── */
function trapFocus(container) {
  var focusables = container.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return function () {};
  var first = focusables[0], last = focusables[focusables.length - 1];
  function onKey(e) {
    if (e.key !== "Tab") return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  container.addEventListener("keydown", onKey);
  return function () { container.removeEventListener("keydown", onKey); };
}
var releaseDrawerFocus = null, releaseReaderFocus = null;

/* ───────── drawer ───────── */
ST.openDrawer = function (content) {
  if (!content) return;
  var titleEl = drawerEl.querySelector(".dr-titles h2");
  var devEl = drawerEl.querySelector(".dr-titles .dev");
  var iconEl = ST.$("drIcon");
  if (titleEl) titleEl.textContent = content.title || "";
  if (devEl) devEl.textContent = content.dev || "";
  if (iconEl) {
    iconEl.innerHTML = content.iconSvg || "";
    if (content.hue) {
      iconEl.style.background = content.hs || content.hue;
      iconEl.style.color = content.hue;
    }
  }
  ST.$("drawerBody").innerHTML = content.body || "";
  ST.$("drawerFoot").innerHTML = content.foot || "";

  scrim.hidden = false; drawerEl.hidden = false;
  requestAnimationFrame(function () {
    scrim.classList.add("open");
    drawerEl.classList.add("open");
  });
  document.body.classList.add("locked");
  setTimeout(function () { ST.$("drawerClose").focus(); }, 60);
  releaseDrawerFocus = trapFocus(drawerEl);
  if (typeof content.onReady === "function") content.onReady(drawerEl);
};
ST.closeDrawer = function () {
  scrim.classList.remove("open");
  drawerEl.classList.remove("open");
  setTimeout(function () {
    scrim.hidden = true; drawerEl.hidden = true;
    if (readerEl.hidden) document.body.classList.remove("locked");
  }, 340);
  if (releaseDrawerFocus) { releaseDrawerFocus(); releaseDrawerFocus = null; }
};

/* ───────── reader ───────── */
ST.openReader = function (pages, idx, meta) {
  if (!pages || !pages.length) return;
  currentPages = pages;
  currentIdx = Math.max(0, Math.min(pages.length - 1, idx || 0));
  ST.closeDrawer();
  ST.renderReader(meta);
  readerEl.hidden = false;
  requestAnimationFrame(function () { readerEl.classList.add("open"); });
  document.body.classList.add("locked");
  setTimeout(function () { ST.$("readerClose").focus(); }, 80);
  releaseReaderFocus = trapFocus(readerEl);
};
ST.closeReader = function () {
  readerEl.classList.remove("open");
  setTimeout(function () {
    readerEl.hidden = true;
    if (drawerEl.hidden) document.body.classList.remove("locked");
  }, 380);
  if (releaseReaderFocus) { releaseReaderFocus(); releaseReaderFocus = null; }
};
ST.renderReader = function (meta) {
  meta = meta || {};
  var page = currentPages[currentIdx];
  var hue = meta.hue || "var(--sandalwood)";
  var hs = meta.hs || "var(--sandalwood-soft)";
  ST.$("readerChips").innerHTML =
    '<span class="reader-chip" style="background:' + hs + ';border-color:' + hs + ';color:' + hue + '">' +
      (meta.title || "Study") + '</span>' +
    (page.subtitle ? '<span class="reader-chip">' + page.subtitle + '</span>' : "") +
    (page.type ? '<span class="reader-chip">' + page.type + '</span>' : "");
  var html = '<p class="block-label">' + (page.type || "Page") + '</p>' +
    '<h2 class="entry-h" style="font-size:2.1rem;margin-top:.3rem">' + page.title + '</h2>' +
    ST.renderPageBody(page);
  ST.$("readerContent").innerHTML = html;

  ST.$("readerContent").querySelectorAll(".refl-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.nextElementSibling;
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      wrap.classList.toggle("open", !open);
      var verb = btn.querySelector(".refl-verb");
      if (verb) verb.textContent = open ? "Show my reflection" : "Hide my reflection";
    });
  });

  var prev = ST.$("readerPrev"), next = ST.$("readerNext");
  if (currentIdx > 0) {
    prev.disabled = false;
    ST.$("prevLabel").textContent = currentPages[currentIdx - 1].title;
  } else {
    prev.disabled = true;
    ST.$("prevLabel").textContent = "—";
  }
  if (currentIdx < currentPages.length - 1) {
    next.disabled = false;
    ST.$("nextLabel").textContent = currentPages[currentIdx + 1].title;
  } else {
    next.disabled = true;
    ST.$("nextLabel").textContent = "—";
  }
  ST.$("readerScroll").scrollTop = 0;
};
ST.renderPageBody = function (page) {
  var html = "";
  if (page.epigraph) {
    html += ST.epigraph(
      page.epigraph.dev,
      page.epigraph.translit,
      page.epigraph.meaning,
      page.epigraph.cite
    );
  }
  if (page.dev && page.translit) html += ST.verseBlock(page.dev, page.translit);
  if (page.words) html += ST.wordsTable(page.words);
  if (page.translation) html += ST.translation(page.translation);
  if (page.commentary) {
    html += '<p class="block-label">Commentary</p><div class="essay">' + page.commentary + '</div>';
  }
  if (page.signature) html += '<p class="signature">— ' + page.signature + '</p>';
  if (page.reflection) html += ST.reflBlock(page.reflection);
  return html;
};

ST.$("drawerClose").addEventListener("click", ST.closeDrawer);
ST.$("readerClose").addEventListener("click", ST.closeReader);
scrim.addEventListener("click", function () {
  ST.closeDrawer();
  ST.closeReader();
});
ST.$("readerPrev").addEventListener("click", function () {
  if (currentIdx > 0) { currentIdx--; ST.renderReader(); ST.sound.bell(659); }
});
ST.$("readerNext").addEventListener("click", function () {
  if (currentIdx < currentPages.length - 1) { currentIdx++; ST.renderReader(); ST.sound.bell(659); }
});
ST.$("readerCopy").addEventListener("click", function () {
  var page = currentPages[currentIdx];
  if (!page) return;
  var text = [page.dev, page.translit, page.translation].filter(Boolean).join("\n\n");
  ST.copyText(text, "Verse copied");
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!readerEl.hidden) ST.closeReader();
    else if (!drawerEl.hidden) ST.closeDrawer();
  }
  if (!readerEl.hidden) {
    if (e.key === "ArrowLeft" && !ST.$("readerPrev").disabled) ST.$("readerPrev").click();
    if (e.key === "ArrowRight" && !ST.$("readerNext").disabled) ST.$("readerNext").click();
  }
});

/* ───────── header: mobile menu, scroll, spy ───────── */
var navEl = ST.$("siteNav");
var menuBtn = ST.$("menuBtn"), mobileMenu = ST.$("mobileMenu");
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    var ic = ST.$("menuIcon");
    if (ic) ic.setAttribute("href", open ? "#i-close" : "#i-menu");
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll(".nav-link").forEach(function (a) {
    a.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      var ic = ST.$("menuIcon");
      if (ic) ic.setAttribute("href", "#i-menu");
    });
  });
}

var toTop = ST.$("toTop");
function onScroll() {
  if (navEl) navEl.classList.toggle("scrolled", window.scrollY > 20);
  var h = document.documentElement;
  var pct = h.scrollHeight > h.clientHeight ? window.scrollY / (h.scrollHeight - h.clientHeight) : 0;
  var bar = ST.$("progressBar");
  if (bar) bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, pct)) + ")";
  if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
if (toTop) toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

var spyPairs = [];
document.querySelectorAll("[data-spy]").forEach(function (a) {
  var el = document.getElementById(a.dataset.spy);
  if (el) spyPairs.push({ link: a, el: el });
});
if ("IntersectionObserver" in window && spyPairs.length) {
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      spyPairs.forEach(function (p) {
        p.link.classList.toggle("active", p.el === en.target);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  spyPairs.forEach(function (p) { spy.observe(p.el); });
}

/* reveal-on-scroll */
var reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); revObs.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { revObs.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

/* ───────── sound + theme buttons ───────── */
var soundBtn = ST.$("soundBtn");
function syncSound() {
  if (!soundBtn) return;
  var on = ST.sound.enabled;
  soundBtn.classList.toggle("off", !on);
  soundBtn.setAttribute("aria-pressed", String(on));
  var ic = ST.$("soundIcon"); if (ic) ic.setAttribute("href", on ? "#i-bell" : "#i-bell-off");
  var lb = ST.$("soundLabel"); if (lb) lb.textContent = on ? "Sound on" : "Sound off";
}
syncSound();
if (soundBtn) soundBtn.addEventListener("click", function () {
  ST.sound.setEnabled(!ST.sound.enabled);
  syncSound();
});

ST.applyTheme(document.documentElement.dataset.theme === "sandhya");
var themeBtn = ST.$("themeBtn");
if (themeBtn) themeBtn.addEventListener("click", function () {
  ST.sound.bell(659);
  ST.applyTheme(!ST.isSandhya());
});

/* smooth scroll for in-page anchors */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ───────── boot atmosphere ───────── */
function bootAtmosphere() {
  ST.initMotes();
  ST.buildOm(ST.$("omMandala"));
  ST.onTheme(function () { ST.refreshMotes(); });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootAtmosphere);
} else {
  bootAtmosphere();
}

})(window.ST);
