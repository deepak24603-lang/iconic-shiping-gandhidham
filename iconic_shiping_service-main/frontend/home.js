// Home hero slider: auto-advance, dots, arrows, swipe, keyboard. Reduced-motion par auto-play band.
(function () {
  const root = document.querySelector("[data-slider]");
  if (!root) return;
  const slides = [...root.querySelectorAll(".slide")];
  const dots = [...root.querySelectorAll(".dot")];
  const status = document.getElementById("slideStatus");
  const DELAY = 5500;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0, timer = null, x0 = null;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle("is-active", k === i);
      s.setAttribute("aria-hidden", String(k !== i));
    });
    dots.forEach((d, k) => d.setAttribute("aria-current", k === i ? "true" : "false"));
    if (status) status.textContent = `Slide ${i + 1} of ${slides.length}`;
  }
  function play() { if (reduce || timer) return; timer = setInterval(() => show(i + 1), DELAY); }
  function stop() { clearInterval(timer); timer = null; }
  function go(n) { show(n); stop(); play(); }

  root.querySelector(".next").addEventListener("click", () => go(i + 1));
  root.querySelector(".prev").addEventListener("click", () => go(i - 1));
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", play);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", play);
  root.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  });
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : play()));
  root.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  }, { passive: true });

  show(0);
  play();
})();
