/* 纯原生 JS，无依赖。四个小功能：移动端菜单、导航栏描边、渐入、年份。 */
(function () {
  "use strict";

  /* ---------- 1. 移动端菜单 ---------- */
  var nav = document.getElementById("nav-list");
  var toggle = document.querySelector(".nav-toggle");

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    // 桌面端窗口变宽后，避免菜单状态残留
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- 2. 滚动时导航栏描边 ---------- */
  var header = document.getElementById("site-nav");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. 渐入（同组元素错开一点） ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reveals.length && "IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    var groups = new Map();
    reveals.forEach(function (el) {
      var parent = el.parentElement;
      var list = groups.get(parent) || [];
      list.push(el);
      groups.set(parent, list);
    });

    groups.forEach(function (list) {
      list.forEach(function (el, i) {
        el.style.setProperty("--d", Math.min(i * 0.06, 0.24) + "s");
        revealer.observe(el);
      });
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  // 兜底：首屏内如果因为字体/图片回流而漏触发，加载完成后补一次
  window.addEventListener("load", function () {
    reveals.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
    });
  });

  /* ---------- 4. 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
