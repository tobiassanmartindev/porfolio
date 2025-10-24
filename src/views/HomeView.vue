<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import ExperienciaLaboral from '@/components/ExperienciaLaboral.vue'
import ProyectosH from '@/components/ProyectosH.vue'
import StackTech from '@/components/StackTech.vue'
import AboutMe from '@/components/AboutMe.vue'
import FooterSection from '@/components/FooterSection.vue'

// Refs de secciones
const heroRef = ref(null)
const experienciaRef = ref(null)
const proyectosRef = ref(null)
const stackRef = ref(null)
const aboutRef = ref(null)
const footerRef = ref(null)

// Refs de los círculos de fondo
const circle1Ref = ref(null)
const circle2Ref = ref(null)

onMounted(() => {
  // IntersectionObserver para fade-in
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up')
        fadeObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  const allSections = [heroRef, experienciaRef, proyectosRef, stackRef, aboutRef, footerRef]
  allSections.forEach(refEl => {
    if (refEl.value) fadeObserver.observe(refEl.value)
  })

  // IntersectionObserver para los círculos y cambio de color/movimiento
  const circle1 = circle1Ref.value
  const circle2 = circle2Ref.value

  const sections = [
    { ref: heroRef, color1: '#3b82f6', color2: '#06b6d4' },     
    { ref: experienciaRef, color1: '#a78bfa', color2: '#f472b6' }, 
    { ref: proyectosRef, color1: '#22c55e', color2: '#facc15' },   
    { ref: stackRef, color1: '#ef4444', color2: '#f97316' },       
    { ref: aboutRef, color1: '#6366f1', color2: '#8b5cf6' },       
    { ref: footerRef, color1: '#6b7280', color2: '#9ca3af' }       
  ]

  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = sections.find(s => s.ref.value === entry.target)
        if (!section) return

        // Cambiar color y posición suavemente
        console.log("cambia de seccion");
        
        [circle1, circle2].forEach((c, i) => {
          if (!c) return
          c.style.transition = 'all 1s ease'
          c.style.backgroundColor = i === 0 ? section.color1 : section.color2
          c.style.transform = `translateY(${Math.random() * 20 - 10}px) translateX(${Math.random() * 20 - 10}px)`
        })
      }
    })
  }, { threshold: 0.5 })

  sections.forEach(s => {
    if (s.ref.value) circleObserver.observe(s.ref.value)
  })

  console.log('Refs detectados al montar:')
  console.log('heroRef:', heroRef.value)
  console.log('experienciaRef:', experienciaRef.value)
  console.log('proyectosRef:', proyectosRef.value)
  console.log('stackRef:', stackRef.value)
  console.log('aboutRef:', aboutRef.value)
  console.log('footerRef:', footerRef.value)

})
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Círculos de fondo -->
    <div ref="circle1Ref" class="animate-pulse-slow fixed fixed-custom top-10 left-24 rounded-full -z-10"></div>
    <div ref="circle2Ref" class="animate-pulse-slow fixed fixed-custom bottom-10 right-24 rounded-full -z-10"></div>
    
    
    <!-- Navbar -->
    <NavBar />

    <!-- Secciones con fade-in desde abajo -->
    <section ref="heroRef">
      <HeroComponent />
    </section>

    <section ref="experienciaRef">
      <ExperienciaLaboral />
    </section>

    <section ref="proyectosRef">
      <ProyectosH />
    </section>

    <section ref="stackRef">
      <StackTech />
    </section>

    <section ref="aboutRef">
      <AboutMe />
    </section>

    <FooterSection />
  </div>
</template>

<style scoped>
/* --- Secciones fade-in --- */
section {
  opacity: 0;
  transform: translateY(40px);
}

.fade-in-up {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease-out, transform 1s ease-out;
}

/* --- Círculos de fondo --- */
.fixed-custom {
  filter: blur(80px);
  opacity: 0.3;
  transition: all 1s ease;
  width: 300px;
  height: 300px;
}

/* --- Clase para animación pulse opcional --- */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.35; }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>
