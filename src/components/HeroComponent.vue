<script setup lang="ts">
import { onMounted } from 'vue'
import Meditation from './Meditation.vue'

// Añade un fade-in progresivo al texto e imagen al montar
onMounted(() => {
  const fadeEls = document.querySelectorAll('.fade-in-up')
  fadeEls.forEach((el: any, i) => {
    el.style.animationDelay = `${i * 0.2}s`
    el.classList.add('animate-fadeInUp')
  })
})
</script>

<template>
  <section class="pt-[200px] h-[100vh] relative relative bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
    <!-- Fondo gradiente animado basado en #0f172a -->
    <div
      class="absolute animate-gradient-x opacity-90"
      style="background: linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #1e293b)"
    ></div>

    <!-- Círculos decorativos difuminados -->
    <div class="absolute top-10 left-20 w-64 h-64 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse-slow"></div>
    <div class="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 blur-3xl rounded-full animate-pulse-slow"></div>

    <!-- Contenido -->
    <div
      class="relative grid max-w-screen-xl px-4 pt-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <!-- Texto -->
      <div class="mr-10 place-self-center lg:col-span-7 z-10">
        <h1
          class="fade-in-up max-w-xl mb-4 text-4xl font-extrabold text-white tracking-tight leading-tight md:text-5xl xl:text-6xl drop-shadow-lg"
        >
          Hola! Soy Tobias
        </h1>

        <p
          class="fade-in-up max-w-xl mb-6 font-semibold text-gray-200 lg:mb-8 lg:text-2xl leading-relaxed"
        >
          +4 años de experiencia. <span class="font-bold text-white">Desarrollador Frontend</span> de
          Argentina, transformando ideas en aplicaciones funcionales con código limpio y eficiente.
        </p>

        <!-- Botones (mantengo tus originales) -->
        <div class="fade-in-up lg:flex md:flex gap-5 mt-20">
          <!-- CONTACTAME -->
          <a href="mailto:tobiassanmartin.work@gmail.com">
            <button>
              <div class="button_top flex items-center justify-center gap-2">
                <span>Contactame</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M13 19C13 18.66 13.04 18.33 13.09 18H4V8L12 13L20 8V13.09C20.72 13.21 21.39 13.46 22 13.81V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H13.09C13.04 19.67 13 19.34 13 19M20 6L12 11L4 6H20M20 22V20H16V18H20V16L23 19L20 22Z"
                  />
                </svg>
              </div>
            </button>
          </a>

          <!-- LINKEDIN -->
          <a
            target="_blank"
            href="https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/"
          >
            <button class="group">
              <span class="button_top flex items-center justify-center gap-2">
                <span>Linkedin</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
                  />
                </svg>
              </span>
            </button>
          </a>

          <!-- CURRICULUM -->
          <a href="/tobias-sanmartin-cv.pdf" download="tobias-sanmartin.pdf">
            <button class="group">
              <span class="button_top flex items-center justify-center gap-2">
                <span>Curriculum</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23 19L20 16V18H16V20H20V22L23 19M13.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V13.1C19.7 13 19.3 13 19 13S18.3 13 18 13.1V9H13V4H6V20H13.1C13.2 20.7 13.5 21.4 13.8 22M8 12H16V13.8C15.9 13.9 15.8 13.9 15.7 14H8V12M8 16H13V18H8V16Z"
                  />
                </svg>
              </span>
            </button>
          </a>
        </div>
      </div>

      <!-- Imagen (mantiene card flotante) -->
      <div
        class="fade-in-up flex items-center justify-center w-72 h-72 lg:ml-24 sm:mx-auto z-10 animate-float-smooth mt-[50px] lg:mt-[0px]"
      >
        <img
          src="../../public/about.png"
          alt="perfil"
          class="object-contain rounded-full shadow-2xl border border-white/20 backdrop-blur-md"
        />
      </div>
    </div>
  <div id="experiencia"></div>

  </section>

</template>

<style scoped>
/* --- Fondo animado con tus colores --- */
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 10s ease infinite;
}

/* --- Pulsación sutil --- */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.35;
  }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

/* --- Imagen flotante --- */
@keyframes float-smooth {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}
.animate-float-smooth {
  animation: float-smooth 5s ease-in-out infinite;
}

/* --- Fade-in de texto e imagen --- */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease forwards;
}

/* --- Tus botones originales --- */
button {
  --button_radius: 0.75em;
  --button_color: #0f172a;
  --button_outline_color: #ffffff;
  font-size: 17px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
  transition: transform 0.2s ease;
}

.button_top {
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.15s ease, background 0.3s ease, color 0.3s ease;
}

button:hover .button_top {
  transform: translateY(-0.35em);
  background: #192646;
}

button:active .button_top {
  transform: translateY(0);
}
</style>
