<template>
  <div class="relative px-4">
    <h2 class="text-experiencia-custom font-bold text-4xl text-white text-center mb-24">
      Experiencia Laboral
    </h2>

    <div class="relative max-w-5xl mx-auto">
      <!-- Línea central -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal-100 to-cyan-100 h-full"></div>

      <!-- Item 1 -->
      <div class="flex justify-start mb-16 relative">
        <div class="w-1/2 pr-12 text-right">
          <time class="block text-gray-400 mb-2 text-sm">Diciembre 2024 - Actualidad</time>
          <h3 class="text-3xl font-semibold text-white mb-2">
            Frontend Developer Freelance
          </h3>
          <p class="text-xl text-gray-200 leading-relaxed">
            Actualmente, trabajo como desarrollador frontend freelance, ayudando a empresas y emprendedores a optimizar su presencia 
            digital mediante el desarrollo de sitios web responsivos y aplicaciones web eficientes.
          </p>
        </div>

        <!-- Icono en el centro -->
        <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 16 16" fill="#14b8a6" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
            <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z"></path>
            <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path>
            <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z"></path>
          </svg>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="flex justify-end mb-16 relative">
        <div class="w-1/2 pl-12 text-left">
          <time class="block text-gray-400 mb-2 text-sm">Mayo 2024 - Diciembre 2024</time>
          <h3 class="text-3xl font-semibold text-white mb-2">
            Frontend Developer en <br> Cuyo Code
          </h3>
          <p class="text-xl text-gray-200 leading-relaxed">
            Durante este periodo en Cuyo Code (contractor), realicé mantenimiento del sistema principal,
            refactorizando Legacy Code, implementando nuevas estructuras y optimizando pantallas.
          </p>
        </div>

        <!-- Icono en el centro -->
        <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
          <svg viewBox="0 0 16 16" fill="#14b8a6" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
            <path d="M8.01005 0.858582L6.01005 14.8586L7.98995 15.1414L9.98995 1.14142L8.01005 0.858582Z"></path>
            <path d="M12.5 11.5L11.0858 10.0858L13.1716 8L11.0858 5.91422L12.5 4.5L16 8L12.5 11.5Z"></path>
            <path d="M2.82843 8L4.91421 10.0858L3.5 11.5L0 8L3.5 4.5L4.91421 5.91422L2.82843 8Z"></path>
          </svg>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex justify-start mb-10 relative">
        <div class="w-1/2 pr-12 text-right">
          <time class="block text-gray-400 mb-2 text-sm">Marzo 2022 - Marzo 2024</time>
          <h3 class="text-3xl font-semibold text-white mb-2">
            Frontend Developer en <br> WAVE IT
          </h3>
          <p class="text-xl text-gray-200 leading-relaxed">
            Como desarrollador frontend en WAVE IT, lideré la implementación de sitios web y sistemas de gestión.
            Coordiné el desarrollo y trabajé en optimización del rendimiento y experiencia de usuario.
          </p>
        </div>

        <!-- Icono en el centro -->
        <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 border-2 border-teal-400 rounded-full p-3 shadow-lg">
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

@media (max-width: 768px) {
  .max-w-5xl > div {
    flex-direction: column !important;
    text-align: center !important;
  }

  .w-1\/2 {
    width: 100% !important;
    padding: 0 !important;
  }

  .absolute.left-1\/2 {
    left: 50%;
    transform: translateX(-50%);
  }

  .text-right,
  .text-left {
    text-align: center !important;
  }
}
</style>
