<template>
  <footer class="text-white rounded-lg shadow m-4 mt-24">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-200 sm:text-center">
        © {{new Date().getFullYear()}} <a href="https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/" class="hover:underline">Tobías Sanmartín</a>.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0">
        <li>
          <a href="#experiencia" class="hover:underline me-4 md:me-6">Experiencia</a>
        </li>
        <li>
          <a href="#proyectos" class="hover:underline me-4 md:me-6">Proyectos</a>
        </li>
        <li>
          <a href="#stack" class="hover:underline me-4 md:me-6">Stack</a>
        </li>
        <li>
          <a href="#sobremi" class="hover:underline">Sobre Mí</a>
        </li>      
      </ul>
      <div class="row">
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Hecho con</h3>
          <div class="flex flex-wrap items-center gap-3 text-sm">
            <div class="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" class="w-4 h-4" alt="Vue.js" />
              <span>Vue.js</span>
            </div>
            <div class="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 54 33">
                  <g clip-path="url(#tailwindcss__a)">
                      <path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/>
                  </g>
                  <defs>
                      <clipPath id="tailwindcss__a">
                          <path fill="#fff" d="M0 0h54v33H0z"/>
                      </clipPath>
                  </defs>
              </svg>
              <span>Tailwind</span>
            </div>
            <div class="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
              <span>🧉</span>
              <span>Mate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </footer>
</template>