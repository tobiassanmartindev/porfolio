<template>
  <div id="proyectos" class="py-16" data-animation="fadeInUp">
    <h2 class="font-bold text-3xl text-center mt-24 mb-12 text-white" data-animation="fadeIn">
      Algunos de los proyectos más destacados que he construido:
    </h2>

    
    <div
      class="lg:mx-auto mx-4 mt-20 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >      
      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          SheetAnalizer - Generador de graficos
        </h3>

        <p class="text-gray-400 mb-6">
          Herramienta que permite a los usuarios cargar archivos Excel y generar gráficos interactivos de manera sencilla y rápida.
        </p>

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

        <div class="lg:flex md:flex grid gap-4">
          <a href="https://sheet-analyzer-peach.vercel.app/" target="_blank">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
                <span>Ver demo</span>
                <svg fill="#ffffff" class="w-4 h-4 ml-1" 
                  version="1.1" id="Capa_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 486.465 486.465" 
                  xml:space="preserve" 
                  stroke="#ffffff"><g id="SVGRepo_bgCarrier" 
                  stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143 L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94 c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503 c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384 c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342 c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104 c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308 l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"></path> <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043 l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974 c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463 c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151 L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582 c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819 c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"></path> </g> </g> </g></svg>
              </div>
            </button>
          </a>

          <a href="https://github.com/tobiassanmartindev/SheetAnalyzer" target="_blank" aria-label="Ver en GitHub">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
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
              </div>
            </button>
          </a>
        </div>
      </div>

      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://sheet-analyzer-peach.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/sheet-analizer.png"
            alt="Sheet-Analizer"
          />
        </a>
      </div>
    </div>
     
    <div
      class="lg:mx-auto mx-4 mt-20 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >      
      
      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://truco-online-jade.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/truco.png"
            alt="Truco Argentino Online"
          />
        </a>
      </div>

      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          Truco argentino - Juego de cartas
        </h3>

        <p class="text-gray-400 mb-6">
          Clasico truco argentino, un jugador vs máquina. Mazo de 40 cartas y mucha viveza criolla.
        </p>

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

        <div class="lg:flex md:flex grid gap-4">
          <a href="https://truco-online-jade.vercel.app/" target="_blank">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
                <span>Ver demo</span>
                <svg fill="#ffffff" class="w-4 h-4 ml-1" 
                  version="1.1" id="Capa_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 486.465 486.465" 
                  xml:space="preserve" 
                  stroke="#ffffff"><g id="SVGRepo_bgCarrier" 
                  stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143 L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94 c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503 c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384 c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342 c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104 c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308 l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"></path> <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043 l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974 c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463 c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151 L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582 c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819 c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"></path> </g> </g> </g></svg>
              </div>
            </button>
          </a>

          <a href="https://github.com/tobiassanmartindev/truco-online.git" target="_blank" aria-label="Ver en GitHub">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
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
              </div>
            </button>
          </a>
        </div>
      </div>

    </div>
    
    <div
      class="lg:mx-auto mx-4 mt-20 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >      
      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          UserFinder - Busqueda de usuarios, challenge técnico para entrevista.
        </h3>

        <p class="text-gray-400 mb-6">
          Descubra y administre perfiles de usuario con búsqueda y filtrado avanzados, Power by Random User API 
        </p>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in technologies[3]"
            :key="tech.name"
            :class="[
              'text-xs font-medium px-3 py-1.5 rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer',
              tech.color,
            ]"
          >
            {{ tech.name }}
          </span>
        </div>

        <div class="lg:flex md:flex grid gap-4">
          <a href="https://oberstaff-challenge.vercel.app/" target="_blank">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
                <span>Ver demo</span>
                <svg fill="#ffffff" class="w-4 h-4 ml-1" 
                  version="1.1" id="Capa_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 486.465 486.465" 
                  xml:space="preserve" 
                  stroke="#ffffff"><g id="SVGRepo_bgCarrier" 
                  stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143 L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94 c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503 c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384 c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342 c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104 c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308 l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"></path> <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043 l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974 c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463 c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151 L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582 c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819 c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"></path> </g> </g> </g></svg>
              </div>
            </button>
          </a>

          <a href="https://github.com/tobiassanmartindev/oberstaff-challenge" target="_blank" aria-label="Ver en GitHub">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
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
              </div>
            </button>
          </a>
        </div>
      </div>

      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://oberstaff-challenge.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/userFinder.png"
            alt="User-Finder"
          />
        </a>
      </div>
    </div>
  </div>
  <!-- <div
      class="lg:mx-auto mx-4 flex flex-col lg:flex-row items-center gap-8 max-w-5xl bg-[#1e293b] rounded-2xl p-6 transition-all duration-500"
    >
      <div class="relative w-full lg:w-1/2 overflow-hidden rounded-xl group">
        <a href="https://comerci-os.vercel.app/" target="_blank">
          <img
            class="rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            src="../../public/sistema-pos.png"
            alt="ComerciOS - Sistema POS"
          />
        </a>
      </div>

      <div class="flex flex-col justify-center lg:w-1/2">
        <h3 class="text-2xl font-semibold text-white mb-4">
          ComerciOS - Sistema de gestión
        </h3>

        <p class="text-gray-400 mb-6">
          Un sistema punto de venta para la gestión comercial que permite llevar
          tanto el control del stock como el seguimiento de las ventas a detalle.
        </p>

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

        <div class="flex gap-4">
          <a href="https://comerci-os.vercel.app/" target="_blank">
            <button class="mt-3">
              <div class="button_top_cards flex items-center justify-center gap-2">
                <span>Ver más</span>
                <svg fill="#ffffff" class="w-4 h-4 ml-1" 
                  version="1.1" id="Capa_1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  xmlns:xlink="http://www.w3.org/1999/xlink" 
                  viewBox="0 0 486.465 486.465" 
                  xml:space="preserve" 
                  stroke="#ffffff"><g id="SVGRepo_bgCarrier" 
                  stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143 L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94 c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503 c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384 c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342 c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104 c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308 l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"></path> <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043 l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974 c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463 c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151 L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582 c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819 c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"></path> </g> </g> </g></svg>
              </div>
            </button>
          </a>
        </div>
      </div>
  </div> -->
  <div id="stack"></div>
</template>

<script setup>
const technologies = [
  [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Quasar', color: 'bg-blue-200 text-black' },
    { name: 'Supabase', color: 'bg-emerald-200 text-black' },
    { name: 'Pinia', color: 'bg-yellow-200 text-black' },
    {name:'Node.js', color: 'bg-green-900 text-white'}],
    [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Chart.js', color: 'bg-red-200 text-black' },
    { name: 'Pinia', color: 'bg-yellow-200 text-black' }],
    [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Javascript', color: 'bg-yellow-200 text-black' },
    { name: 'Mucho mate', color: 'bg-green-900 text-white' }],
    [{ name: 'Vue.js', color: 'bg-green-200 text-black' },
    { name: 'Javascript', color: 'bg-yellow-200 text-black' }]
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* --- Estilo de botones --- */
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
  /* display: block; */
  /* box-sizing: border-box; */
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.15s ease, background 0.3s ease, color 0.3s ease;
}

.button_top_cards {
  /* display: block; */
  /* box-sizing: border-box; */
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  height: 40px;
  width: 180px;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.15s ease, background 0.3s ease, color 0.3s ease;
}

button:hover .button_top_cards {
  transform: translateY(-0.35em);
  background: #15203b;
}

button:active .button_top_cards {
  transform: translateY(0);
}

button:hover .button_top {
  transform: translateY(-0.35em);
  background: #192646;
}

button:active .button_top {
  transform: translateY(0);
}

</style>

<div id="stack"></div>