<template>
  <div class="font-bold text-2xl text-center mb-10">Proyectos</div>
  <div class="mx-auto justify-center items-center flex">
    <div class="lg:flex md:flex mb-2">
      <div
        class="max-w-xs bg-white border border-gray-200 rounded-lg shadow mx-auto mb-4 lg:mb-0 sm:mb-4"
      >
        <a href="#">
          <img class="rounded-lg" src="../../public/fithub.png" alt="" />
        </a>
      </div>
      <div class="pl-7">
        <p class="font-semibold text-xl mb-2">
          FitHub Software - Sistema de gestion para gimnasios
        </p>
        <span class="bg-green-100 text-black-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
          >VueJs</span
        >
        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
          >Quasar</span
        >
        <p class="mt-4 max-w-md text-gray-700">
          Un sistema de gestion para gimnasios, el cual ayuda a la administracion del gimnasio, con
          un control de los miembros, membresias, rutinas e ingreso.
        </p>
        <div class="mt-4">
          <a target="_blank" href="https://fithub-software-v1.vercel.app/#/">
            <button
              type="button"
              class="text-white bg-white mr-3 text-black border border-black rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              <span class="text-black font-semibold">Preview</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="rtl:rotate-180 w-6 h-6 ms-2"
                viewBox="0 0 24 24"
              >
                <title>link-variant</title>
                <path
                  d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div id="stack"></div>
</template>
