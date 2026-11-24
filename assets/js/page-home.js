/* ══════════════════════════════════════════════════════════════
   page-home.js  ·  home page only
   Mantra copy · file-tree copy · gentle scroll parallax
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var ST = window.ST;
  if (!ST) return;
  var $ = ST.$;

  /* ───────── copy the mantra ───────── */
  var copyBtn = $("mantraCopy");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    ST.copyText(
      "आ नो भद्राः क्रतवो यन्तु विश्वतः॥\n" +
      "ā no bhadrāḥ kratavo yantu viśvataḥ\n\n" +
      "Let noble thoughts come to us from every side.\n" +
      "— Rig Veda 1.89.8",
      "Mantra copied"
    );
    ST.sound.bell(659);
  });

  /* ───────── copy the file tree ───────── */
  var TREE =
    "satyam/\n" +
    "├── index.html\n" +
    "├── assets/\n" +
    "│   ├── css/\n" +
    "│   │   ├── base.css\n" +
    "│   │   ├── home.css\n" +
    "│   │   └── page.css\n" +
    "│   └── js/\n" +
    "│       ├── core.js\n" +
    "│       └── page-home.js\n" +
    "└── pages/\n" +
    "    ├── bhagavadGita/\n" +
    "    │   └── bhagavadGitaMain.html\n" +
    "    ├── upanishads/\n" +
    "    │   └── upanishadsMain.html\n" +
    "    ├── ramayana/\n" +
    "    │   └── ramayanaMain.html\n" +
    "    ├── vishnuSahasranama/\n" +
    "    │   └── vishnuSahasranamaMain.html\n" +
    "    ├── dharmaCompass/\n" +
    "    │   └── dharmaCompassMain.html\n" +
    "    └── eveningNotes/\n" +
    "        └── eveningNotesMain.html";

  function copyTree() { ST.copyText(TREE, "File tree copied"); }
  var ct = $("copyTreeBtn"), tc = $("treeCopyBtn");
  if (ct) ct.addEventListener("click", copyTree);
  if (tc) tc.addEventListener("click", copyTree);

  /* ───────── gentle parallax depth ───────── */
  var visual = $("heroVisual"), om = $("mantraOm"), band = $("mantra");
  if (!ST.RM && (visual || om)) {
    var ticking = false;
    var paint = function () {
      ticking = false;
      var y = window.scrollY || 0;
      if (visual && y < window.innerHeight * 1.2) {
        visual.style.transform = "translateY(" + (y * 0.07).toFixed(2) + "px)";
      }
      if (om && band) {
        var r = band.getBoundingClientRect();
        if (r.bottom > -200 && r.top < window.innerHeight + 200) {
          var mid = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          om.style.transform = "translate(-50%,-50%) translateY(" + (mid * -34).toFixed(2) + "px)";
        }
      }
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(paint); }
    }, { passive: true });
    paint();
  }
})();