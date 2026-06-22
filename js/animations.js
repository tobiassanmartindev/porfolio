const VARIANTS = {
  fadeIn:      [{ opacity: 0 }, { opacity: 1 }],
  fadeInUp:    [{ opacity: 0, transform: 'translateY(46px)' }, { opacity: 1, transform: 'translateY(0)' }],
  fadeInDown:  [{ opacity: 0, transform: 'translateY(-46px)' }, { opacity: 1, transform: 'translateY(0)' }],
  fadeInLeft:  [{ opacity: 0, transform: 'translateX(-56px)' }, { opacity: 1, transform: 'translateX(0)' }],
  fadeInRight: [{ opacity: 0, transform: 'translateX(56px)' }, { opacity: 1, transform: 'translateX(0)' }],
  zoomIn:      [{ opacity: 0, transform: 'scale(0.92)' }, { opacity: 1, transform: 'scale(1)' }],
};

function reveal(el) {
  if (el._revealed) return;
  el._revealed = true;

  const kf = VARIANTS[el.dataset.animation] || VARIANTS.fadeInUp;
  const delay = parseInt(el.dataset.delay || '0', 10);

  const anim = el.animate(kf, {
    duration: 850,
    delay,
    easing: 'cubic-bezier(0.16,1,0.3,1)',
    fill: 'both',
  });

  anim.onfinish = () => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.willChange = '';
  };
}

export function initAnimations() {
  const els = Array.from(document.querySelectorAll('[data-animation]'));
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.willChange = 'opacity, transform';
  });

  const check = () => {
    const vh = window.innerHeight;
    for (const el of els) {
      if (el._revealed) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) reveal(el);
    }
  };

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) check();
  });

  requestAnimationFrame(() => {
    check();
    requestAnimationFrame(check);
  });

  // Safety net: force everything visible if animations are throttled
  setTimeout(() => {
    for (const el of els) {
      try { el.getAnimations().forEach((a) => a.cancel()); } catch (_) {}
      el.style.opacity = '';
      el.style.transform = '';
      el.style.willChange = '';
      el._revealed = true;
    }
  }, 1900);
}
