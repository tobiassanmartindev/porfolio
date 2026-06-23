const VARIANTS = {
  fadeIn:      [{ opacity: 0 }, { opacity: 1 }],
  fadeInUp:    [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }],
  fadeInDown:  [{ opacity: 0, transform: 'translateY(-28px)' }, { opacity: 1, transform: 'translateY(0)' }],
  fadeInLeft:  [{ opacity: 0, transform: 'translateX(-36px)' }, { opacity: 1, transform: 'translateX(0)' }],
  fadeInRight: [{ opacity: 0, transform: 'translateX(36px)' }, { opacity: 1, transform: 'translateX(0)' }],
  zoomIn:      [{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }],
};

function reveal(el) {
  if (el._revealed) return;
  el._revealed = true;

  const kf = VARIANTS[el.dataset.animation] || VARIANTS.fadeInUp;
  const delay = parseInt(el.dataset.delay || '0', 10);

  const anim = el.animate(kf, {
    duration: 580,
    delay,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'both',
  });

  anim.onfinish = () => {
    // Commit final state as inline styles so CSS hover transitions work normally
    el.style.opacity = '1';
    el.style.transform = '';
    el.style.willChange = '';
    anim.cancel();
  };
}

export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const els = Array.from(document.querySelectorAll('[data-animation]'));

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.willChange = 'opacity, transform';
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
  );

  els.forEach(el => observer.observe(el));
}
