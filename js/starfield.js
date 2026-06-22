export function initStarfield() {
  const wrap = document.getElementById('starfield');
  if (!wrap || wrap.childElementCount > 0) return;

  const n = 150;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < n; i++) {
    const el = document.createElement('span');
    const x = (Math.random() * 100).toFixed(2);
    const y = (Math.random() * 100).toFixed(2);
    const s = (Math.random() * 1.8 + 1).toFixed(2);
    const dur = (Math.random() * 3.5 + 2).toFixed(2);
    const del = (Math.random() * 6).toFixed(2);
    const op = (Math.random() * 0.5 + 0.25).toFixed(2);
    const glow = Math.random() > 0.8;
    const color = glow ? 'var(--accent)' : '#cfe0ff';

    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `
      position:absolute;
      left:${x}%;
      top:${y}%;
      width:${s}px;
      height:${s}px;
      border-radius:50%;
      background:${color};
      opacity:${op};
      box-shadow:0 0 ${(parseFloat(s) * 2).toFixed(1)}px ${color};
      animation:twinkle ${dur}s ease-in-out ${del}s infinite;
    `;
    fragment.appendChild(el);
  }

  wrap.appendChild(fragment);
}
