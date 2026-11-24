/* ══════════════════════════════════════════════════════════════
   assets/js/core.js  ·  SATYAM shared engine
   Icons · sound (tanpura + bell) · Day/Sandhya · Om mandala ·
   drifting motes · nav & scroll · folds · toasts
   Every page loads this file first.
   ══════════════════════════════════════════════════════════════ */
window.ST = window.ST || {};
(function (ST) {
  "use strict";

  ST.repoUrl = "https://github.com/";   /* ← set this to your repository URL */

  ST.RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ST.$ = function (id) { return document.getElementById(id); };

  ST.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  ST.hexToRgb = function (hex) {
    hex = String(hex).trim().replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(hex, 16);
    if (isNaN(n)) return [160, 90, 30];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
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
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
    '<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-1.8Z"/></symbol>' +
    '</defs></svg>';

  document.body.insertAdjacentHTML("afterbegin", SPRITE);
  document.body.insertAdjacentHTML("beforeend",
    '<div id="toasts" aria-live="polite"></div>' +
    '<button id="toTop" aria-label="Back to top"><svg class="ic"><use href="#i-up"/></svg></button>');

  /* repository links */
  document.querySelectorAll("[data-repo]").forEach(function (a) {
    a.setAttribute("href", ST.repoUrl);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });

  /* ───────── toasts & clipboard ───────── */
  ST.toast = function (msg, icon) {
    var host = ST.$("toasts");
    if (!host) return;
    while (host.children.length >= 3) host.firstChild.remove();
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = '<svg class="ic"><use href="#' + (icon || "i-check") + '"/></svg><span></span>';
    t.querySelector("span").textContent = msg;
    host.appendChild(t);
    setTimeout(function () {
      t.classList.add("out");
      setTimeout(function () { t.remove(); }, 320);
    }, 2500);
  };

  ST.copyText = function (text, msg) {
    var ok = function () { ST.toast(msg, "i-check"); };
    var no = function () { ST.toast("Couldn’t copy — your browser blocked it", "i-close"); };
    var fallback = function () {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        var done = document.execCommand("copy");
        ta.remove();
        done ? ok() : no();
      } catch (e) { no(); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(fallback);
    } else {
      fallback();
    }
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
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);

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
      build();
      if (!ctx) return;
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
      enabled = v;
      ST.store.set("satyam-sound", v ? "1" : "0");
      if (v) { ensure(); bell(659); }
      else {
        stop();
        if (ctx && master) {
          master.gain.cancelScheduledValues(ctx.currentTime);
          master.gain.setTargetAtTime(0, ctx.currentTime, .12);
        }
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (enabled) ctx.resume();
    });

    return {
      get enabled() { return enabled; },
      setEnabled: setEnabled,
      bell: bell,
      firstGesture: ensure
    };
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

  /* ───────── Om mandala ───────── */
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
      mk("path", {
        d: "M500 78 C536 132 536 186 500 226 C464 186 464 132 500 78 Z",
        transform: "rotate(" + (i * 15) + " 500 500)",
        fill: "var(--om-fill)", stroke: "currentColor", "stroke-width": "1.1"
      }, a);
      mk("line", {
        x1: 500, y1: 246, x2: 500, y2: 264,
        transform: "rotate(" + (i * 15 + 7.5) + " 500 500)",
        stroke: "currentColor", "stroke-width": "1.1"
      }, a);
    }

    mk("circle", Object.assign({ cx: 500, cy: 500, r: 232, "stroke-dasharray": "2 12", "stroke-linecap": "round" }, ring), b);
    for (var j = 0; j < 12; j++) {
      mk("path", {
        d: "M500 280 C530 318 530 362 500 396 C470 362 470 318 500 280 Z",
        transform: "rotate(" + (j * 30) + " 500 500)",
        fill: "var(--om-fill)", stroke: "currentColor", "stroke-width": "1.1"
      }, b);
    }
  };

  /* ───────── drifting motes ───────── */
  var cv, cx2d, list = [], palette = [[160, 90, 30], [201, 162, 74], [94, 113, 98]], boost = 1;
  var raf = null, last = 0, clock = 0, W = 0, H = 0;

  function refreshPalette() {
    var cs = getComputedStyle(document.documentElement);
    palette = ["--sandalwood", "--gold2", "--sage"].map(function (v) {
      return ST.hexToRgb(cs.getPropertyValue(v) || "#A05A1E");
    });
    boost = parseFloat(cs.getPropertyValue("--mote-boost")) || 1;
  }

  function spawn(anyY) {
    return {
      x: Math.random() * W, y: anyY ? Math.random() * H : H + 24,
      s: .8 + Math.random() * 2.2, petal: Math.random() < .18,
      vy: 6 + Math.random() * 10, swa: 6 + Math.random() * 10, swf: .2 + Math.random() * .5,
      ph: Math.random() * 6.283, rot: Math.random() * 6.283, vr: (Math.random() - .5) * .6,
      a: .10 + Math.random() * .2, tw: .3 + Math.random() * .7, ci: Math.floor(Math.random() * 3)
    };
  }

  function sizeMotes() {
    if (!cv || !cx2d) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    cx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    var target = Math.min(44, Math.max(14, Math.floor(W / 32)));
    while (list.length < target) list.push(spawn(true));
    list.length = target;
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    var dt = Math.min((ts - last) / 1000, .05); last = ts; clock += dt;
    cx2d.clearRect(0, 0, W, H);
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      p.y -= p.vy * dt;
      p.x += Math.sin(clock * p.swf + p.ph) * p.swa * dt;
      p.rot += p.vr * dt;
      if (p.y < -26) list[i] = spawn(false);
      var c = palette[p.ci];
      var al = Math.min(.55, p.a * boost * (.55 + .45 * Math.sin(clock * p.tw + p.ph)));
      cx2d.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + al.toFixed(3) + ")";
      if (p.petal) {
        cx2d.save(); cx2d.translate(p.x, p.y); cx2d.rotate(p.rot);
        cx2d.beginPath(); cx2d.ellipse(0, 0, p.s * 2.1, p.s * .85, 0, 0, 6.283); cx2d.fill();
        cx2d.restore();
      } else {
        cx2d.beginPath(); cx2d.arc(p.x, p.y, p.s, 0, 6.283); cx2d.fill();
      }
    }
  }

  function startMotes() {
    if (ST.RM || raf !== null || !cx2d) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stopMotes() {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
  }

  ST.initMotes = function () {
    cv = ST.$("motes");
    if (!cv) return;
    cx2d = cv.getContext("2d");
    if (!cx2d) return;
    refreshPalette();
    sizeMotes();
    window.addEventListener("resize", sizeMotes, { passive: true });
    startMotes();
  };
  ST.refreshMotes = refreshPalette;

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopMotes(); else startMotes();
  });

  /* ───────── folds (used on every page) ───────── */
  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("[data-fold]") : null;
    if (!btn) return;
    var panel = document.getElementById(btn.getAttribute("data-fold"));
    if (!panel) return;
    var open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.classList.toggle("is-open", open);
    ST.sound.bell(open ? 659 : 494);
  });

  /* ───────── header: mobile menu, scroll, spy ───────── */
  var navEl = ST.$("siteNav");
  var menuBtn = ST.$("menuBtn"), mobileMenu = ST.$("mobileMenu");

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    var ic = ST.$("menuIcon");
    if (ic) ic.setAttribute("href", "#i-menu");
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      var ic = ST.$("menuIcon");
      if (ic) ic.setAttribute("href", open ? "#i-close" : "#i-menu");
    });
    mobileMenu.querySelectorAll(".nav-link").forEach(function (a) {
      a.addEventListener("click", closeMenu);
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
    window.scrollTo({ top: 0, behavior: ST.RM ? "auto" : "smooth" });
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
        spyPairs.forEach(function (p) { p.link.classList.toggle("active", p.el === en.target); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyPairs.forEach(function (p) { spy.observe(p.el); });
  }

  /* reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revObs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
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
    soundBtn.setAttribute("aria-label", on ? "Mute sound" : "Unmute sound");
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
      closeMenu();
      el.scrollIntoView({ behavior: ST.RM ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
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