function animateCounter(el) {
  if (el._counted) return;
  el._counted = true;

  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function initCounters() {
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (!counters.length) return;

  const check = () => {
    const vh = window.innerHeight;
    for (const el of counters) {
      if (el._counted) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) animateCounter(el);
    }
  };

  window.addEventListener('scroll', check, { passive: true });
  requestAnimationFrame(check);
}
