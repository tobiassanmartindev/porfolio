<template>
  <div class="relative px-4">
    <h2 class="text-experiencia-custom font-bold text-4xl text-white text-center mb-24" data-animation="fadeInUp">
      Experiencia Laboral
    </h2>

    <div class="relative max-w-5xl mx-auto">
      <!-- Línea central (solo desktop) -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal-100 to-cyan-100 h-full hidden md:block"></div>
      
      <!-- Línea izquierda (solo mobile) -->
      <div class="absolute left-8 w-1 bg-gradient-to-b from-teal-100 to-cyan-100 h-full md:hidden"></div>

      <!-- Item 1 -->
      <div class="flex justify-start mb-16 relative md:justify-start">
        <div class="w-full md:w-1/2 md:pr-12 pl-16 md:pl-0 md:text-right" data-animation="fadeInLeft">
          <time class="block text-gray-400 mb-2 text-sm">marzo 2025 - Actualidad</time>
          <h3 class="text-2xl md:text-3xl font-semibold text-white mb-2">
            Full Stack Developer en ComerciOS
          </h3>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
            Actualmente, trabajo como desarrollador full stack en comerciOS, donde lidero el desarrollo de nuevas funcionalidades y mejoras en la plataforma.
             Mi enfoque principal es garantizar un código limpio y eficiente, optimizando la experiencia del usuario y manteniendo la estabilidad del sistema.
          </p>
        </div>

        <!-- Icono en el centro (desktop) / izquierda (mobile) -->
        <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 16 16" fill="#14b8a6" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
            <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z"></path>
            <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path>
            <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z"></path>
          </svg>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="flex justify-end mb-16 relative md:justify-end">
        <div class="w-full md:w-1/2 md:pl-12 pl-16 md:text-left" data-animation="fadeInRight">
          <time class="block text-gray-400 mb-2 text-sm">Mayo 2024 - Diciembre 2024</time>
          <h3 class="text-2xl md:text-3xl font-semibold text-white mb-2">
            Frontend Developer en <br> Cuyo Code
          </h3>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
            Durante este periodo en Cuyo Code (contractor), realicé mantenimiento del sistema principal,
            refactorizando Legacy Code, implementando nuevas estructuras y optimizando pantallas.
          </p>
        </div>

        <!-- Icono en el centro (desktop) / izquierda (mobile) -->
        <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 16 16" fill="#14b8a6" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
            <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z"></path>
            <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path>
            <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z"></path>
          </svg>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex justify-start mb-10 relative md:justify-start">
        <div class="w-full md:w-1/2 md:pr-12 pl-16 md:pl-0 md:text-right" data-animation="fadeInLeft">
          <time class="block text-gray-400 mb-2 text-sm">Marzo 2022 - Marzo 2024</time>
          <h3 class="text-2xl md:text-3xl font-semibold text-white mb-2">
            Frontend Developer en <br> WAVE IT
          </h3>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
            Como desarrollador frontend en WAVE IT, lideré la implementación de sitios web y sistemas de gestión.
            Coordiné el desarrollo y trabajé en optimización del rendimiento y experiencia de usuario.
          </p>
        </div>

        <!-- Icono en el centro (desktop) / izquierda (mobile) -->
        <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 16 16" fill="#14b8a6" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
            <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z"></path>
            <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path>
            <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-experiencia-custom {
  margin-top: 50px;
}
</style>