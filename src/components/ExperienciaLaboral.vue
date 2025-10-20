<template>
  <div class="text-experiencia-custom font-bold text-3xl text-white text-center mb-20">Experiencia laboral</div>
  <div class="lg:flex md:grid justify-center mb-10">
    <div class="flex-initial w-70">
      <div class="lg:w-[560px] md:w-[760px] mx-auto mt-4 lg:px-0 px-6">
        <ol class="relative border-s border-teal-200">
          <li class="mb-8 ms-4">
            <div
              class="absolute w-3 h-3 bg-teal-600 rounded-full mt-1.5 -start-1.5 border border-white"
            ></div>

            <time class="mb-1 text-sm font-normal leading-none text-gray-400"
              >Diciembre 2024 - Actualidad</time
            >
            <h3 class="text-lg font-semibold text-gray-100">Frontend Developer Freelance</h3>
            <p class="mb-4 font-normal text-gray-100">
              Actualmente, trabajo como desarrollador frontend freelance, ayudando a empresas y emprendedores a optimizar su presencia 
              digital mediante el desarrollo de sitios web responsivos y aplicaciones web eficientes. Me especializo en transformar ideas 
              de diseño en experiencias de usuario fluidas y atractivas, asegurando un código limpio y optimizado para un rendimiento superior. Con experiencia en HTML, CSS, JavaScript, 
              y frameworks como Vue.js, me enfoco en proyectos que requieren atención al detalle y un enfoque centrado en el usuario.
            </p>
          </li>
          <li class="mb-8 ms-4">
            <div
              class="absolute w-3 h-3 bg-teal-600 rounded-full mt-1.5 -start-1.5 border border-white"
            ></div>

            <time class="mb-1 text-sm font-normal leading-none text-gray-400"
              >Mayo 2024 - Diciembre 2024</time
            >
            <h3 class="text-lg font-semibold text-gray-100">Frontend Developer en Cuyo Code</h3>
            <p class="mb-4 font-normal text-gray-100">
              Durante este periodo en Cuyo Code (contractor), realize el mantenimiento de su sistema principal.
              Refactorizando Legacy Code, implementando estructuras nuevas, optimizando pantallas existentes y creando nuevas.
            </p>
          </li>
          <li class="mb-10 ms-4">
            <div
              class="absolute w-3 h-3 bg-teal-600 rounded-full mt-1.5 -start-1.5 border border-white"
            ></div>

            <time class="mb-1 text-sm font-normal leading-none text-gray-400"
              >Marzo 2022 - Marzo 2024</time
            >
            <h3 class="text-lg font-semibold text-gray-100">Frontend Developer en WAVE IT</h3>
            <p class="mb-4 font-normal text-gray-200">
              Como Desarrollador Frontend en WAVE IT, lideré la implementación de sitios web y sistemas de gestión para 
              clientes de diversas industrias. Me encargué de supervisar el diseño, crear documentación técnica y optimizar 
              el código para mejorar la estructura y rendimiento de las aplicaciones. Colaboré estrechamente con el equipo de 
              diseño para mejorar la experiencia del usuario y coordiné el flujo de desarrollo, asegurando la entrega puntual de 
              los proyectos.
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div id="proyectos"></div>
</template>

<style scoped>
@media (max-width:506px) {
  .text-experiencia-custom{
    margin-top: 50px;
  } 
}
@media (max-width:430px) {
  .text-experiencia-custom{
    margin-top: 100px;
  } 
}
@media (max-width:415px) {
  .text-experiencia-custom{
    margin-top: 150px;
  } 
}
@media (max-width:394px) {
  .text-experiencia-custom{
    margin-top: 200px;
  } 
}
@media (max-width:369px) {
  .text-experiencia-custom{
    margin-top: 250px;
  } 
}
</style>
