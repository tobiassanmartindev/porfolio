<script setup lang="ts">
import Meditation from './Meditation.vue';

</script>

<template>
  <section class="pt-[100px]">
    <div class="grid max-w-screen-lg px-4 pt-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-32 place-self-center lg:col-span-7">
        <h1
          class="max-w-xl mb-4 text-3xl font-bold text-white tracking-tight leading-none md:text-2xl xl:text-5xl"
        >
          Hola! Soy Tobias
        </h1>
        <p class="max-w-xl mb-6 font-semibold text-gray-200 lg:mb-8 lg:text-2xl">
          +4 años de experiencia. <span class="font-bold">Desarrollador Frontend</span> de
          Argentina, transformando ideas en aplicaciones funcionales con código limpio y eficiente.
        </p>
        <div class="flex gap-5 mt-20">
          <a href="mailto:tobiassanmartin.work@gmail.com">
            <button>
              <span class="button_top"> Contactame </span>
            </button>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/"
          >
            <button>
              <span class="button_top"> Linkedin </span>
            </button>
          </a>
          <a href="/tobias-sanmartin-cv.pdf" download="tobias-sanmartin.pdf">
            <button>
              <span class="button_top"> Curriculum </span>
            </button>
          </a>
        </div>
      </div>
      <div class="flex-none w-72 h-72 items-center justify-center lg:ml-24 sm:mx-auto">
        <img src="../../public/about.png" alt="perfil" />
      </div>
    </div>
  </section>
  <div id="experiencia"></div>
</template>
<style scoped>
button {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #1a1a1a;
  --button_outline_color: #ffffff;
  font-size: 17px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

button:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

button:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}

</style>
