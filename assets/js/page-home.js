/* ══════════════════════════════════════════════════════════════
   page-home.js  ·  home page only — wire up everything
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var ST = window.ST;
  var DATA = ST.HOME;
  if (!DATA) return;
  var $ = ST.$;

  /* ───────── verse-of-the-day ───────── */
  var verseIdx = 0;
  var verses = DATA.verses;
  var bodyEl, dateEl;

  function paintVerse(v) {
    $("vDev").textContent = v.dev;
    $("vTranslit").textContent = v.translit;
    $("vMeaning").textContent = v.meaning;
    $("verseSourceLabel").textContent = v.source;
    $("verseMoreLabel").textContent = v.study ? "Open the study" : "Open the mantra";
  }
  function showVerse(i, animate) {
    verseIdx = ((i % verses.length) + verses.length) % verses.length;
    var v = verses[verseIdx];
    if (animate) {
      bodyEl.classList.add("swapping");
      setTimeout(function () {
        paintVerse(v);
        bodyEl.classList.remove("swapping");
      }, 280);
    } else {
      paintVerse(v);
    }
  }
  function setVerseDate() {
    if (!dateEl) return;
    var d = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    dateEl.textContent = months[d.getMonth()] + " " + d.getDate();
  }

  var verseBody = $("verseBody");
  if (verseBody) {
    bodyEl = verseBody;
    dateEl = $("verseDate");
    setVerseDate();
    showVerse(0, false);

    $("verseShuffle").addEventListener("click", function () {
      ST.sound.bell(587);
      showVerse(verseIdx + 1, true);
    });
    $("verseSource").addEventListener("click", function () {
      var v = verses[verseIdx];
      var item = DATA.library.find(function (l) { return l.id === v.study; });
      if (item) openDrawerForItem(item);
      else document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });
    $("verseMore").addEventListener("click", function () {
      var v = verses[verseIdx];
      var pages = DATA.pages[v.study];
      if (pages && pages.length) {
        var item = DATA.library.find(function (l) { return l.id === v.study; });
        ST.openReader(pages, 0, { title: item ? item.title : v.source, hue: item && item.hue, hs: item && item.hs });
      } else {
        document.getElementById("library").scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ───────── library ───────── */
  var libGrid = $("libGrid");
  var libCount = $("libCount");

  function renderLibrary(filter) {
    filter = filter || "all";
    libGrid.classList.add("fading");
    setTimeout(function () {
      var items = DATA.library.filter(function (l) {
        return filter === "all" || l.cat === filter;
      });
      libGrid.innerHTML = items.map(function (l) {
        var pageCount = (DATA.pages[l.id] || []).length;
        return '<article class="lib-card" style="--h:' + l.hue + ';--hs:' + l.hs + '">' +
          '<button class="card-open" aria-label="Open ' + l.title + '"></button>' +
          '<div class="lc-top">' +
            '<span class="lc-icon"><svg class="ic"><use href="#' + l.icon + '"/></svg></span>' +
            '<span class="lc-cat">' + l.catLabel + '</span>' +
          '</div>' +
          '<p class="lc-dev" lang="sa">' + l.dev + '</p>' +
          '<h3 class="lc-title">' + l.title + '</h3>' +
          '<p class="lc-desc">' + l.desc + '</p>' +
          '<div class="lc-foot">' +
            '<span>' + pageCount + ' page' + (pageCount === 1 ? '' : 's') + '</span>' +
            '<span class="lc-read">Read <svg class="ic xs"><use href="#i-arrow"/></svg></span>' +
          '</div>' +
          '</article>';
      }).join("");

      libGrid.querySelectorAll(".lib-card").forEach(function (card, i) {
        var item = items[i];
        card.querySelector(".card-open").addEventListener("click", function () {
          ST.sound.bell(659);
          openDrawerForItem(item);
        });
      });
      libGrid.classList.remove("fading");
      if (libCount) {
        libCount.textContent = items.length + " of " + DATA.library.length + " studies";
      }
    }, 180);
  }

  if (libGrid) {
    renderLibrary("all");
    document.querySelectorAll("#libPills .pill").forEach(function (p) {
      p.addEventListener("click", function () {
        document.querySelectorAll("#libPills .pill").forEach(function (x) {
          x.setAttribute("aria-selected", "false");
        });
        p.setAttribute("aria-selected", "true");
        renderLibrary(p.dataset.filter);
      });
    });
  }

  /* ───────── drawer content builder ───────── */
  function openDrawerForItem(item) {
    if (!item) return;
    var pages = DATA.pages[item.id] || [];
    var iconSvg = '<svg class="ic"><use href="#' + item.icon + '"/></svg>';

    var bodyHtml = '<p class="dr-desc">' + item.desc + '</p>';
    bodyHtml += '<p class="dr-label">How this study reads</p>';
    bodyHtml += '<div class="stream-grid" style="--h:' + item.hue + '">';
    bodyHtml += item.streams.map(function (s) {
      return '<div class="stream">' +
        '<p class="stream-kicker">' + s.kicker + '</p>' +
        '<h4>' + s.title + '</h4>' +
        '<p>' + s.desc + '</p>' +
        '</div>';
    }).join("");
    bodyHtml += '</div>';

    if (pages.length) {
      bodyHtml += '<p class="dr-label">Pages written so far</p>';
      bodyHtml += '<ul class="dr-list">';
      bodyHtml += pages.map(function (p, i) {
        return '<li class="dr-item">' +
          '<span class="di-name">' + p.title + '</span>' +
          '<span class="status' + (p.status === "writing" ? " writing" : "") + '"><i></i>' +
            (p.status === "writing" ? "Writing" : (p.subtitle || "Ready")) + '</span>' +
          '<button class="btn ghost sm" data-goto="' + i + '">Open →</button>' +
          '</li>';
      }).join("");
      bodyHtml += '</ul>';
    } else {
      bodyHtml += '<p class="dr-label">Pages</p>';
      bodyHtml += '<ul class="dr-list"><li class="dr-item">' +
        '<span class="di-name">First pages are being written</span>' +
        '<span class="status writing"><i></i>Writing</span></li></ul>';
    }

    var footHtml = '<code class="path-code">' + item.id + '/</code>';
    if (pages.length) {
      footHtml += '<span class="dr-hint">Opens in the reader — with word-by-word and my own reflection kept separate.</span>';
      footHtml += '<button class="btn primary sm" id="openReaderBtn">Open first page →</button>';
    } else {
      footHtml += '<span class="dr-hint">This shelf is being written. Check back soon.</span>';
    }

    ST.openDrawer({
      title: item.title,
      dev: item.dev,
      iconSvg: iconSvg,
      hue: item.hue,
      hs: item.hs,
      body: bodyHtml,
      foot: footHtml,
      onReady: function (drawer) {
        if (pages.length) {
          var firstBtn = drawer.querySelector("#openReaderBtn");
          if (firstBtn) firstBtn.addEventListener("click", function () {
            ST.openReader(pages, 0, { title: item.title, hue: item.hue, hs: item.hs });
          });
          drawer.querySelectorAll("[data-goto]").forEach(function (b) {
            b.addEventListener("click", function () {
              var idx = parseInt(b.dataset.goto, 10) || 0;
              ST.openReader(pages, idx, { title: item.title, hue: item.hue, hs: item.hs });
            });
          });
        }
      }
    });
  }

  /* ───────── notebook shelf ───────── */
  var nbList = $("notebookList");
  if (nbList) {
    nbList.innerHTML = DATA.notebook.map(function (n, i) {
      return '<article class="nb-row">' +
        '<button class="card-open" aria-label="Open ' + n.title + '"></button>' +
        '<div class="nb-date">' + n.date + '</div>' +
        '<div>' +
          '<h3 class="nb-title">' + n.title + '</h3>' +
          '<p class="nb-desc">' + n.desc + '</p>' +
          '<div class="nb-chips">' +
            '<span class="nb-sec"><i style="background:' + n.hue + '"></i>' + n.section + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="nb-arrow"><svg class="ic sm"><use href="#i-arrow"/></svg></span>' +
        '</article>';
    }).join("");

    nbList.querySelectorAll(".nb-row").forEach(function (row, i) {
      var n = DATA.notebook[i];
      row.querySelector(".card-open").addEventListener("click", function () {
        var pages = DATA.pages[n.study];
        if (!pages || !pages.length) return;
        var item = DATA.library.find(function (l) { return l.id === n.study; });
        ST.openReader(pages, n.pageIndex || 0, {
          title: item ? item.title : n.section,
          hue: item && item.hue,
          hs: item && item.hs
        });
      });
    });
  }

  /* ───────── CTA buttons ───────── */
  var heroRead = $("heroReadBtn");
  if (heroRead) heroRead.addEventListener("click", function () {
    var pages = DATA.pages.gita;
    ST.openReader(pages, 0, { title: "Bhagavad Gita", hue: "#B86B2B", hs: "rgba(184,107,43,.11)" });
  });
  var bannerBtn = $("bannerExplorerBtn");
  if (bannerBtn) bannerBtn.addEventListener("click", function () {
    var item = DATA.library.find(function (l) { return l.id === "vishnu"; });
    openDrawerForItem(item);
  });
  var essayBtn = $("essayBtn");
  if (essayBtn) essayBtn.addEventListener("click", function () {
    var pages = DATA.pages.compass;
    ST.openReader(pages, 0, { title: "The Dharma Compass", hue: "#5E7162", hs: "rgba(94,113,98,.12)" });
  });

  /* ───────── compass ───────── */
  var svg = $("compassSvg");
  var needle = $("compassNeedle");
  var statusEl = $("compassStatus");
  var noteEl = $("compassNote");

  function recenter() {
    if (!needle) return;
    needle.classList.remove("sway");
    needle.style.transform = "rotate(0deg)";
    statusEl.textContent = "True North · Dharma";
    statusEl.classList.remove("pulled");
    noteEl.textContent = "We do not need a flawless record — only the sincerity to return to truth again and again.";
    if (svg) {
      svg.classList.remove("settled");
      void svg.offsetWidth;
      svg.classList.add("settled");
    }
    ST.sound.bell(659);
    setTimeout(function () { if (svg) svg.classList.remove("settled"); }, 1900);
  }
  if (svg) {
    svg.addEventListener("click", recenter);
    svg.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); recenter(); }
    });
  }
  document.querySelectorAll("#compassPulls .pull").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("true")) { recenter(); return; }
      var angle = parseFloat(btn.dataset.angle) || 0;
      needle.classList.remove("sway");
      needle.style.transform = "rotate(" + angle + "deg)";
      statusEl.textContent = btn.dataset.status;
      statusEl.classList.add("pulled");
      noteEl.textContent = btn.dataset.note;
      ST.sound.bell(330);
    });
  });

  /* ───────── mantra band ───────── */
  var wordsToggle = $("mantraToggle");
  if (wordsToggle) wordsToggle.addEventListener("click", function () {
    var open = $("mantraWords").classList.toggle("open");
    this.setAttribute("aria-expanded", String(open));
  });
  var fullToggle = $("mantraFullToggle");
  if (fullToggle) fullToggle.addEventListener("click", function () {
    var open = $("mantraFull").classList.toggle("open");
    this.setAttribute("aria-expanded", String(open));
  });
  var copyBtn = $("mantraCopy");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    ST.copyText(
      "आ नो भद्राः क्रतवो यन्तु विश्वतः॥\n" +
      "ā no bhadrāḥ kratavo yantu viśvataḥ\n\n" +
      "Let noble thoughts come to us from every side.\n" +
      "— Rig Veda 1.89.8",
      "Mantra copied"
    );
  });

  /* ───────── stars field ───────── */
  (function stars() {
    var box = $("stars");
    if (!box) return;
    for (var i = 0; i < 42; i++) {
      var s = document.createElement("span");
      s.className = "star";
      s.style.left = (Math.random() * 100).toFixed(1) + "%";
      s.style.top = (Math.random() * 100).toFixed(1) + "%";
      var size = (1 + Math.random() * 1.6).toFixed(2) + "px";
      s.style.width = size;
      s.style.height = size;
      s.style.setProperty("--tw", (3 + Math.random() * 4).toFixed(1) + "s");
      s.style.setProperty("--td", (Math.random() * 4).toFixed(1) + "s");
      box.appendChild(s);
    }
  })();

  /* ───────── file-tree copy ───────── */
  function copyTree() {
    var text =
      "satyam/\n" +
      "├── index.html\n" +
      "├── assets/\n" +
      "│   ├── css/\n" +
      "│   │   ├── base.css\n" +
      "│   │   └── home.css\n" +
      "│   └── js/\n" +
      "│       ├── core.js\n" +
      "│       ├── data-home.js\n" +
      "│       └── page-home.js\n" +
      "└── pages/\n" +
      "    └── gita.html";
    ST.copyText(text, "File tree copied");
  }
  var ct = $("copyTreeBtn"), tc = $("treeCopyBtn");
  if (ct) ct.addEventListener("click", copyTree);
  if (tc) tc.addEventListener("click", copyTree);

})();
