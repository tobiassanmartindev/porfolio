<template>
  <section class="py-16 bg-[#0f172a]">
    <h2 class="font-bold text-3xl text-center mb-12 text-white">
      Algunos de los proyectos más destacados que he construido:
    </h2>

    <div
      class="mx-auto flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >
      <!-- Imagen con animación hover -->
      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://comerci-os.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/sistema-pos.png"
            alt="ComerciOS - Sistema POS"
          />
        </a>
      </div>

      <!-- Contenido -->
      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          ComerciOS - Sistema de gestión
        </h3>

        <p class="text-gray-400 mb-6">
          Un sistema punto de venta para la gestión comercial que permite llevar
          tanto el control del stock como el seguimiento de las ventas a detalle.
        </p>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in technologies[0]"
            :key="tech.name"
            :class="[
              'text-xs font-medium px-3 py-1.5 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer',
              tech.color,
            ]"
          >
            {{ tech.name }}
          </span>
        </div>

        <!-- Botones -->
        <div class="flex gap-4">
          <!-- Botón Ver más -->
          <a href="https://comerci-os.vercel.app/" target="_blank">
            <button
              type="button"
              class="text-white font-semibold border border-sky-400 rounded-full text-sm px-6 py-2 transition-all duration-300 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/30"
            >
              Ver más →
            </button>
          </a>
        </div>
      </div>
    </div>
    <div
      class="mx-auto mt-20 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >      
      <!-- Contenido -->
      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          SheetAnalizer - Generador de graficos
        </h3>

        <p class="text-gray-400 mb-6">
          Herramienta que permite a los usuarios cargar archivos Excel y generar gráficos interactivos de manera sencilla y rápida.
        </p>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in technologies[1]"
            :key="tech.name"
            :class="[
              'text-xs font-medium px-3 py-1.5 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer',
              tech.color,
            ]"
          >
            {{ tech.name }}
          </span>
        </div>

        <!-- Botones -->
        <div class="flex gap-4">
          <!-- Botón Ver más -->
          <a href="https://comerci-os.vercel.app/" target="_blank">
            <button
              type="button"
              class="text-white font-semibold border border-sky-400 rounded-full text-sm px-6 py-2 transition-all duration-300 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/30"
            >
              Ver más →
            </button>
          </a>

          <!-- Botón GitHub -->
          <a href="https://github.com/tuusuario/comerci-os" target="_blank" aria-label="Ver en GitHub">
            <button
              type="button"
              class="flex items-center gap-2 text-white border border-gray-500 rounded-full text-sm px-5 py-2 transition-all duration-300 hover:bg-gray-800 hover:border-gray-400 hover:scale-105 hover:shadow-md"
            >
              <!-- Icono GitHub -->
              <svg
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 fill-white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                />
              </svg>
              <span class="font-medium">GitHub</span>
            </button>
          </a>
        </div>
      </div>

      <!-- Imagen con animación hover -->
      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://comerci-os.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/sheet-analizer.png"
            alt="ComerciOS - Sistema POS"
          />
        </a>
      </div>
    </div>
    <div
      class="mx-auto mt-20 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >      
      
      <!-- Imagen con animación hover -->
      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://comerci-os.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/truco.png"
            alt="ComerciOS - Sistema POS"
          />
        </a>
      </div>

      <!-- Contenido -->
      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          Truco argentino - Juego de cartas
        </h3>

        <p class="text-gray-400 mb-6">
          Clasico truco argentino, un jugador vs máquina. Mazo de 40 cartas y mucha viveza criolla.
        </p>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in technologies[2]"
            :key="tech.name"
            :class="[
              
              'text-xs font-medium px-3 py-1.5 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer',
              tech.color,
            ]"
          >
            {{ tech.name }}
          </span>
        </div>

        <!-- Botones -->
        <div class="flex gap-4">
          <!-- Botón Ver más -->
          <a href="https://comerci-os.vercel.app/" target="_blank">
            <button
              type="button"
              class="text-white font-semibold border border-sky-400 rounded-full text-sm px-6 py-2 transition-all duration-300 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/30"
            >
              Ver más →
            </button>
          </a>

          <!-- Botón GitHub -->
          <a href="https://github.com/tuusuario/comerci-os" target="_blank" aria-label="Ver en GitHub">
            <button
              type="button"
              class="flex items-center gap-2 text-white border border-gray-500 rounded-full text-sm px-5 py-2 transition-all duration-300 hover:bg-gray-800 hover:border-gray-400 hover:scale-105 hover:shadow-md"
            >
              <!-- Icono GitHub -->
              <svg
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 fill-white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                />
              </svg>
              <span class="font-medium">GitHub</span>
            </button>
          </a>
        </div>
      </div>

    </div> 
  </section>
</template>

<script setup>
const technologies = [
  [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Quasar', color: 'bg-blue-200 text-black' },
    { name: 'Supabase', color: 'bg-emerald-200 text-black' },
    { name: 'Pinia', color: 'bg-yellow-200 text-black' }],
    [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Chart.js', color: 'bg-red-200 text-black' },
    { name: 'Pinia', color: 'bg-yellow-200 text-black' }],
    [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Javascript', color: 'bg-yellow-200 text-black' },
  { name: 'Mucho café', color: 'bg-amber-900 text-white' }]
]
</script>

<style scoped>
/* Micro interacción suave */
img {
  transition: transform 0.5s ease, filter 0.5s ease;
}

/* Sombra suave */
section {
  transition: box-shadow 0.4s ease-in-out;
}
</style>

<div id="stack"></div>