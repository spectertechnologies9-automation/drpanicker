/* Dr Panicker's Dental Care — shared site script (vanilla JS, no dependencies) */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  window.__dpReady = true;                       /* tells the head fallback that animations are safe */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ── Mobile menu ── */
  var btn = $("#menuBtn"), nav = $("#nav");
  function setMenu(open) {
    if (!btn || !nav) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    var l = btn.querySelector(".menu-label"); if (l) l.textContent = open ? "Close" : "Menu";
    if (open) { var first = nav.querySelector("a"); if (first) first.focus({ preventScroll: true }); }
  }
  if (btn && nav) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); }
    });
    d.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !e.target.closest("#nav") && !e.target.closest("#menuBtn")) setMenu(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* ── Header state, scroll progress, back-to-top ── */
  var hdr = $("#hdr"), bar = $(".progress"), top = $(".to-top"), ticking = false;
  function onScroll() {
    var y = window.scrollY || 0, h = root.scrollHeight - window.innerHeight;
    if (hdr) hdr.classList.toggle("scrolled", y > 8);
    if (bar) bar.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
    if (top) top.classList.toggle("show", y > window.innerHeight * 1.2);
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (top) top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    var skip = $(".brand"); if (skip) skip.focus({ preventScroll: true });
  });

  /* ── Open / closed status (India Standard Time) ── */
  var OPEN = 600, CLOSE = 1230; /* 10:00 AM – 8:30 PM, Monday–Saturday */
  function istNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[o.weekday], mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  function status() {
    var t = istNow(); if (!t) return;
    var open = t.day >= 1 && t.day <= 6 && t.mins >= OPEN && t.mins < CLOSE, msg;
    if (open) msg = "Open now · until 8:30 PM";
    else if (t.day === 0 || (t.day === 6 && t.mins >= CLOSE)) msg = "Closed · opens Monday 10 AM";
    else if (t.mins < OPEN) msg = "Closed · opens today at 10 AM";
    else msg = "Closed · opens tomorrow at 10 AM";
    $$(".js-status").forEach(function (el) {
      var dot = el.querySelector(".dot"), txt = el.querySelector(".txt");
      if (dot) dot.classList.toggle("shut", !open);
      if (txt) txt.textContent = msg;
    });
    $$(".hours tr[data-day]").forEach(function (tr) {
      tr.classList.toggle("today", parseInt(tr.getAttribute("data-day"), 10) === t.day);
    });
  }
  status(); setInterval(status, 60000);

  /* ── Accordions: one open at a time within a group ── */
  $$("[data-accordion]").forEach(function (group) {
    var items = $$("details", group);
    items.forEach(function (el) {
      el.addEventListener("toggle", function () {
        if (el.open) items.forEach(function (o) { if (o !== el && o.open) o.open = false; });
      });
    });
  });

  /* ── Deep links to treatments / FAQs (#t-implant, #q-hours …) ── */
  function openTarget(hash, smooth) {
    if (!hash || hash.length < 2) return;
    var el = d.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;
    if (el.tagName === "DETAILS") {
      var grp = el.closest(".tx-group"); if (grp && grp.hidden) showCat("all");
      el.open = true;
      setTimeout(function () {
        el.scrollIntoView({ behavior: smooth && !reduce ? "smooth" : "auto", block: "start" });
        var s = el.querySelector("summary"); if (s) s.focus({ preventScroll: true });
      }, 40);
    }
  }
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#t-"],a[href^="#q-"]');
    if (!a) return;
    e.preventDefault();
    var h = a.getAttribute("href");
    if (history.replaceState) history.replaceState(null, "", h);
    openTarget(h, true);
  });

  /* ── Treatment category filter ── */
  var chips = $$(".filterbar .chip");
  function showCat(cat) {
    $$(".tx-group").forEach(function (g) { g.hidden = !(cat === "all" || g.getAttribute("data-cat") === cat); g.classList.add("in"); });
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-cat") === cat ? "true" : "false"); });
  }
  if (chips.length) {
    chips.forEach(function (c) {
      c.setAttribute("role", "button");
      c.addEventListener("click", function (e) {
        e.preventDefault();
        var cat = c.getAttribute("data-cat");
        showCat(cat);
        if (history.replaceState) history.replaceState(null, "", cat === "all" ? location.pathname : "#cat-" + cat);
        var list = $("#directory"); if (list && window.scrollY > list.offsetTop) list.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
      c.addEventListener("keydown", function (e) { if (e.key === " ") { e.preventDefault(); c.click(); } });
    });
    var m = location.hash.match(/^#cat-([\w-]+)/);
    showCat(m ? m[1] : "all");
  }
  openTarget(location.hash, false);

  /* ── FAQ search ── */
  var q = $("#faqSearch");
  if (q) {
    var faqs = $$(".faq-cat .faq"), cats = $$(".faq-cat"), empty = $("#faqEmpty"), live = $("#faqLive");
    q.addEventListener("input", function () {
      var term = q.value.trim().toLowerCase(), shown = 0;
      faqs.forEach(function (f) {
        var hit = !term || f.textContent.toLowerCase().indexOf(term) > -1;
        f.hidden = !hit; if (hit) shown++;
        if (term && hit && term.length > 2) f.open = true;
        if (!term) f.open = false;
      });
      cats.forEach(function (c) { c.hidden = !$$(".faq", c).some(function (f) { return !f.hidden; }); c.classList.add("in"); });
      if (empty) empty.hidden = shown > 0;
      if (live) live.textContent = term ? shown + (shown === 1 ? " question matches" : " questions match") : "";
    });
  }

  /* ── Counters (genuine figures only; final value is already in the HTML) ── */
  function count(el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = (el.getAttribute("data-count").split(".")[1] || "").length;
    if (reduce || isNaN(end)) return;
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (end * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(step); else el.textContent = end.toFixed(dec);
    }
    requestAnimationFrame(step);
  }

  /* ── Line drawings: measure path lengths ── */
  $$(".draw").forEach(function (svg) {
    $$("path,circle,line", svg).forEach(function (p, i) {
      try { var len = Math.ceil(p.getTotalLength()); p.style.setProperty("--len", len); p.style.setProperty("--i", i); } catch (e) {}
    });
  });

  /* ── Scroll reveals ── */
  var targets = $$(".rv,.stagger,.draw,.mask,[data-count]");
  if (reduce || !hasIO) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.hasAttribute("data-count")) count(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ── Hide mobile contact bar over the footer ── */
  var mbar = $("#mbar"), foot = $(".foot");
  if (mbar && foot && hasIO) {
    new IntersectionObserver(function (en) { mbar.classList.toggle("hide", en[0].isIntersecting); }).observe(foot);
  }

  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();
