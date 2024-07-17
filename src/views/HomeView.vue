<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 mt-4">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
      <div class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
              >Experiencia</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Proyectos</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Sobre mi</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div></div>
  <section class="bg-white dark:bg-gray-900">
    <div class="grid max-w-screen-lg px-4 pt-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="max-w-xl mb-4 text-3xl font-bold tracking-tight leading-none md:text-2xl xl:text-5xl dark:text-white"
        >
          Hola! Soy Tobias
        </h1>
        <p class="max-w-xl mb-6 font-semibold text-gray-500 lg:mb-8 lg:text-2xl dark:text-gray-400">
          +3 años de experiencia. <span class="font-bold">Desarrollador Frontend</span> de
          Argentina. Transformando ideas en aplicaciones funcionales con código limpio y eficiente.
        </p>
        <p>
          <button
            type="button"
            class="px-5 py-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Contactame
          </button>
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Linkedin
          </button>
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            CV
          </button>
        </p>
      </div>
      <div class="lg:mt-0 ml-auto lg:col-span-5 lg:flex h-72">
        <img src="../../public/perfil.png" alt="perfil" />
      </div>
    </div>
  </section>
  <div class="font-bold text-2xl text-center mt-14">Experiencia laboral</div>
  <div class="max-w-screen-md px-4 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <ol class="relative border-s border-teal-200 dark:border-gray-700">
      <li class="mb-10 ms-4">
        <div
          class="absolute w-3 h-3 bg-teal-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>

        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Marzo 2022 - Actualidad</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Frontend Developer WAVE IT
        </h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Actualmente trabajo en una empresa de desarrollo web, donde construyo páginas desde
          diseños y hago mantenimiento de sistemas ya implementados. Me dedico a transformar ideas
          en realidad a través de código limpio y soluciones eficientes, asegurando que cada
          proyecto sea funcional y accesible.
        </p>
      </li>
      <li class="mb-10 ms-4">
        <div
          class="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >Marzo 2021 - Marzo 2022</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Desarrollador Freelance</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          Durante este año e trabajo con varios comercios desarrollando sitios webs y sistemas de
          calidad mejorando el alcanze de los comercios hasta un 30% en los mejores casos.
        </p>
      </li>
      <!-- <li class="ms-4">
        <div
          class="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
        ></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >April 2022</time
        >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          E-Commerce UI code in Tailwind CSS
        </h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          Get started with dozens of web components and interactive elements built on top of
          Tailwind CSS.
        </p>
      </li> -->
    </ol>
  </div>
  <div class="font-bold text-2xl text-center mb-10">Proyectos</div>
  <div class="mx-auto justify-center items-center flex">
    <div class="flex mb-2">
      <div
        class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img class="rounded-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
        </a>
      </div>
      <div class="pl-7">
        <p class="font-semibold text-xl mb-2">
          FitHub Software - Sistema de gestion para gimnasios
        </p>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >Tecnologia</span
        >
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >Tecnologia</span
        >
        <p class="mt-4 max-w-md text-gray-700">
          Un sistema de gestion para gimnasios, el cual ayuda a la administracion del gimnasio, con
          un control de los miebros, membresias, rutinas e ingreso.
        </p>
        <div class="mt-4">
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-slate-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Codigo
          </button>
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-slate-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-auto justify-center items-center flex mt-12">
    <div class="flex mb-2">
      <div
        class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img class="rounded-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
        </a>
      </div>
      <div class="pl-7">
        <p class="font-semibold text-xl mb-2">
          FitHub Software - Sistema de gestion para gimnasios
        </p>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >Tecnologia</span
        >
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >Tecnologia</span
        >
        <p class="mt-4 max-w-md text-gray-700">
          Un sistema de gestion para gimnasios, el cual ayuda a la administracion del gimnasio, con
          un control de los miebros, membresias, rutinas e ingreso.
        </p>
        <div class="mt-4">
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-slate-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Codigo
          </button>
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-slate-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="font-bold text-2xl text-center mt-14">Stack de Tecnologias</div>
</template>
