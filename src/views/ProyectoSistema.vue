<script setup>
import FooterSection from '@/components/FooterSection.vue'
const sections = [
  {
    title: "Dashboard",
    description: "Visualización de métricas mensuales de ventas que permite monitorear el desempeño del negocio y facilita la toma de decisiones.",
    image: "../../public/dashboard.png",
    alt: "Dashboard",
    reverse: false,
  },
  {
    title: "Ventas",
    description: "Sistema de punto de venta que incluye impresión de tickets para optimizar el proceso de ventas al público.",
    image: "../../public/ventas.png",
    alt: "Ventas",
    reverse: true,
  },
  {
    title: "Caja",
    description: "Gestión de apertura y cierre de cajas, con detalles de ventas, medios de pago y clientes, para un control financiero preciso.",
    image: "../../public/caja.png",
    alt: "Caja",
    reverse: false,
  },
  {
    title: "Inventario",
    description: "Administración completa de productos, permitiendo agregar, modificar y eliminar items en el inventario para un control de stock preciso.",
    image: "../../public/inventario.png",
    alt: "Inventario",
    reverse: true,
  },
];
</script>

<template>
  <div class="px-2">
    <div class="text-2xl text-center mt-5 mb-5">
      Proyecto Sistema Pos
    </div>
    <div class="max-w-3xl mx-auto space-y-10">
      <p>
        Este sistema fue desarrollado para optimizar la gestión de una <strong>distribuidora con venta al público</strong>,
        adaptándose a las necesidades específicas del cliente en un plazo de <strong>1 mes y medio</strong>. La solución
        integra diversas funcionalidades para agilizar desde el <strong>control de inventario</strong> hasta la
        <strong>administración de ventas</strong>, brindando una plataforma <strong>robusta y a medida</strong>.
        El sistema fue construido con <strong>Vue.js</strong>, <strong>Quasar</strong>, <strong>Supabase</strong>,
        <strong>Pinia</strong> y <strong>Vercel</strong>, asegurando <strong>rendimiento y facilidad de uso</strong>.
      </p>
      <p>
        Entre las principales características, el sistema permite <strong>gestionar productos, clientes, usuarios,
        y cajas</strong>; incluye un <strong>punto de venta con impresión de tickets</strong> y un
        <strong>dashboard con métricas de ventas mensuales</strong>. Esto lo convierte en una herramienta
        <strong>integral y eficiente</strong> para la <strong>operación diaria de la distribuidora</strong>.
      </p>

      <!-- Alternating image and text sections -->
      <div
        v-for="(section, index) in sections"
        :key="index"
        :class="section.reverse ? 'lg:flex-row-reverse' : ''"
        class="flex flex-col lg:flex-row items-center gap-6"
      >
        <img :src="section.image" :alt="section.alt" class="w-full lg:w-[400px] rounded shadow-lg" />
        <div class="text-center lg:text-left">
          <h3 class="text-xl font-bold mb-2">{{ section.title }}</h3>
          <p>{{ section.description }}</p>
        </div>
      </div>

      <p>
        Además de las funcionalidades principales, el sistema cuenta con otras pantallas que facilitan la <strong>gestión integral del comercio</strong> y simplifican el <strong>uso diario del sistema</strong>. Estas pantallas adicionales están diseñadas para brindar una experiencia intuitiva y eficiente, adaptándose a las diversas necesidades operativas del negocio.
      </p>
      <br><br>
    </div>
  </div>
  <FooterSection />
</template>
