// src/utils/animations.js
import { animate } from "animejs"

// === ANIMACIONES BASE === //
export const animations = {
  fadeIn: (target) => animate(target,{
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad'
  }),

  fadeInUp: (target) => animate(target,{
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }),

  fadeInDown: (target) => animate(target,{
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }),

  fadeInLeft: (target) => animate(target,{
    opacity: [0, 1],
    translateX: [-80, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }),

  fadeInRight: (target) => animate(target,{
    opacity: [0, 1],
    translateX: [80, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }),

  zoomIn: (target) => animate(target,{
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    easing: 'easeOutBack'
  }),

  rotateIn: (target) => animate(target,{
    opacity: [0, 1],
    rotate: ['-10deg', '0deg'],
    duration: 800,
    easing: 'easeOutBack'
  })
}

// === OBSERVADOR PARA SCROLL === //
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animationType = entry.target.dataset.animation

      if (animationType && animations[animationType]) {
        animations[animationType](entry.target)
      }

      observer.unobserve(entry.target) // se ejecuta una sola vez
    }
  })
}, { threshold: 0.2 }) // cuando el 20% del elemento entra en vista

// === APLICAR ANIMACIONES EN SCROLL === //
export const applyScrollAnimations = () => {
  document.querySelectorAll('[data-animation]').forEach(el => {
    // estado inicial oculto
    el.style.opacity = 0
    observer.observe(el)
  })
}
