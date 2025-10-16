<script setup lang="ts">
import Meditation from './Meditation.vue';
import { ref } from "vue"
import TecnologiesStack from './TecnologiesStack.vue';
const eyeOpen = ref(false)
</script>

<template>
  <div class="font-bold text-2xl text-center mt-14 text-white">Stack de Tecnologías</div>
  <div class="flex w-72 h-72 items-center justify-center mx-auto mt-20 mb-20">
    <Meditation :eye-open="eyeOpen" />
  </div>
  <TecnologiesStack @menu-hover="eyeOpen = $event" />
  <div id="sobremi"></div>
</template>
