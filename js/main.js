import { initStarfield } from './starfield.js';
import { initAnimations } from './animations.js';
import { initCounters } from './counter.js';
import { initScrollProgress } from './progress.js';
import { initContactForm } from './contact.js';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  initScrollProgress();
  initStarfield();
  initAnimations();
  initCounters();
  initContactForm();
  initNav();
});
