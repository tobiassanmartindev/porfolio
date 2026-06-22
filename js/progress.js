export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const d = document.documentElement;
    const max = (d.scrollHeight - d.clientHeight) || 1;
    const p = Math.min(Math.max(d.scrollTop / max, 0), 1);
    bar.style.width = (p * 100) + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}
