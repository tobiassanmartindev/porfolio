/**
 * Every piece of copy, link and image on the site lives here,
 * so swapping in real data never means touching the components.
 */

import type { Tech } from "@/components/TechIcon";

const email = "tobiassanmartin.work@gmail.com";
const github = "https://github.com/tobiassanmartindev";
/** Cursor phrases over anything that can be broken. Each click shows the next one. */
const breakCursor = "Probar durabilidad|Generar impacto|Testear en producción|Deploy un viernes";

export const site = {
  title: "Porfolio - Tobias Sanmartin",
  description:
    "Tobias Sanmartin, desarrollador full-stack en Buenos Aires. Aplicaciones web, sistemas de gestión e integraciones de punta a punta, en remoto.",
  brand: "Tobias",
  wordmark: "TOBIAS",
  /** Tab title while the visitor is on another tab. */
  awayTitle: "Volvé, quedó algo por romper",
  copyright: "© 2026 Tobias Sanmartin",
  email,
  /** WhatsApp en formato internacional sin "+". En Argentina los celulares llevan un 9 después del 54. */
  whatsapp: {
    number: "5492257410077",
    label: "Escribime por WhatsApp",
    message: "Hola Tobias, vi tu porfolio y quería consultarte por un proyecto.",
  },
  linkedin: "https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/",
  github,

  nav: {
    phrases: ["Software a medida", "Aplicaciones web", "Sistemas de gestión", "Automatización de procesos", "Integraciones y APIs"],
    links: [
      { label: "Proyectos", href: "/#proyectos" },
      { label: "Experiencia", href: "/#experiencia" },
      { label: "Preguntas", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
    ],
    note: `Disponible para nuevos proyectos. ${email}`,
  },

  loader: {
    label: "Strata® Studio",
    caption: "Loading experience",
    grid: ["0111112", "1100000", "1100000", "0111110", "0000011", "0000011", "1111110"],
  },

  hero: {
    name: "Tobias Sanmartin",
    role: "Desarrollador Full-Stack & Diseñador UX/UI",
    tagline: "Ideas que se convierten en soluciones",
    primary: "Hablemos",
    secondary: "Ver proyectos",
    aside: "Diseño y desarrollo productos digitales de punta a punta, desde la primera idea hasta que llegan a manos de quienes los usan.",
    availability: "Disponible para nuevos proyectos",
    scroll: "Scroll ↓",
    cursorField: "Hacé clic",
    cursorName: "Arrastrame",
  },

  /**
   * Sección "Sobre mí". Los valores marcados PENDIENTE son placeholders:
   * hay que reemplazarlos por datos reales antes de publicar.
   */
  about: {
    label: "▚ Sobre mí",
    title: [
      { text: "Entiendo el " },
      { text: "problema", accent: true },
      { text: ", diseño y programo la " },
      { text: "solución", accent: true },
      { text: "." },
    ],
    lead: "Soy ",
    leadName: "Tobias Sanmartin",
    leadRest:
      ", desarrollador full-stack y diseñador UX/UI. Creo software a medida: aplicaciones web, sistemas de gestión, automatización de procesos e integraciones.",
    body: "Acompaño cada proyecto desde la primera idea hasta que está funcionando. Como el diseño y el código salen de la misma persona, lo que se decide en pantalla es lo que después se construye.",
    location: "Buenos Aires, Argentina · remoto",
    stats: [
      { value: "+6", label: "años de experiencia" },
      { value: "+20", label: "proyectos entregados" },
      { value: "+10", label: "clientes" },
    ],
    today: {
      label: "Hoy",
      roles: [
        {
          name: "WK Point",
          role: "Fullstack Developer",
          href: "https://wkpoint.com",
          logo: "/logos/wkpoint.png",
          description: "Plataforma que conecta a estudiantes y graduados con su primer trabajo, a través de sus instituciones educativas.",
        },
        {
          name: "RoadRunner",
          role: "Fullstack Developer",
          href: "https://www.roadrunnerca.com",
          logo: "/logos/roadrunner.png",
          /** Wide wordmark: shown contained instead of edge to edge. */
          wordmark: true,
          description: "Reservas online de shuttles compartidos y privados en Guatemala, con seguimiento GPS en vivo y chat con el conductor.",
        },
      ],
    },
    stack: {
      label: "Stack",
      cursor: "Movelo",
      /** Íconos de simple-icons (ver components/TechIcon.tsx), en gris y naranja al pasar el mouse. */
      items: [
        { tech: "typescript", name: "TypeScript" },
        { tech: "react", name: "React" },
        { tech: "nextjs", name: "Next.js" },
        { tech: "nodejs", name: "Node.js" },
        { tech: "postgresql", name: "PostgreSQL" },
        { tech: "docker", name: "Docker" },
        { tech: "git", name: "Git" },
        { tech: "figma", name: "Figma" },
        { tech: "swagger", name: "APIs REST" },
      ] as { tech: Tech; name: string }[],
    },
    services: [
      {
        title: "Diseño",
        description: "Investigo, prototipo y defino interfaces claras, listas para pasar a código sin perder nada en el camino.",
      },
      {
        title: "Desarrollo",
        description: "Front, back y base de datos: software que se adapta a tu negocio, y no al revés.",
      },
      {
        title: "Automatización",
        description: "Tareas repetitivas que dejan de depender de alguien, con flujos e integraciones entre tus sistemas.",
      },
    ],
    breakCursor,
    breakable: {
      label: "Romper mi foto",
      hint: "No se rompe. Probá.",
      broken: "Bueno, se rompió.",
      fixing: "Dame un segundo…",
      fixed: "Arreglado. A eso me dedico.",
      again: "¿Otra vez? Arreglado.",
      cursor: breakCursor,
    },
    projectsTitle: "Proyectos",
    projectsIntro: "Algunos trabajos, contados de punta a punta.",
  },

  orbit: {
    label: "▚ Proyectos",
    heading: [{ text: "Algunas ideas que ya son " }, { text: "soluciones", accent: true }, { text: "." }],
    title: "En órbita",
    hint: "Elegí un proyecto para ver el caso",
    hintDrag: "Arrastrá para girar · Clic para ver el caso",
    cursorStage: "Arrastrá",
    cursorCard: "Ver caso",
    cardAction: "ver el caso",
  },

  experience: {
    label: "▚ Experiencia",
    intro: "Trayectoria profesional.",
  },

  faq: {
    label: "▚ Preguntas",
    title: "Preguntas frecuentes.",
    sub: "Lo que suelen consultarme antes de empezar un proyecto.",
    cta: "Escribime",
    items: [
      {
        q: "¿Qué tipo de proyectos desarrollás?",
        a: "Aplicaciones web, dashboards, sistemas de gestión, e-commerce y landing pages. Lo que tu negocio necesite para funcionar mejor.",
      },
      {
        q: "¿Trabajás freelance o full-time?",
        a: "Ambos. Estoy abierto a colaboraciones puntuales por proyecto y también a sumarme a un equipo a largo plazo.",
      },
      {
        q: "¿Cómo es el proceso para empezar?",
        a: "Escribime por el formulario, WhatsApp o mail. Charlamos el alcance, te paso una propuesta con tiempos estimados y arrancamos.",
      },
      {
        q: "¿Trabajás con equipos?",
        a: "Sí. Tengo experiencia en metodologías ágiles (Scrum y Kanban), code reviews y pair programming dentro de equipos de desarrollo.",
      },
      {
        q: "¿Qué pasa después de la entrega?",
        a: "Te acompaño en la puesta en marcha y podemos acordar un mantenimiento para que el proyecto siga funcionando y evolucionando.",
      },
    ],
  },

  contact: {
    label: "▚ Contacto",
    title: "Contame qué tenés en mente.",
    sub: "Agendemos una reunión y vemos juntos tu proyecto. Te respondo a la brevedad.",
    meeting: {
      label: "Agendar reunión",
      subject: "Reunión para hablar de un proyecto",
      body: "Hola Tobias, vi tu porfolio y me gustaría agendar una reunión.\n\nSobre el proyecto:\n\nDías y horarios que me quedan bien:\n",
    },
    copy: "Copiar",
    copied: "¡Copiado!",
    status: "Disponible para proyectos",
    city: "Buenos Aires",
    timeZone: "America/Argentina/Buenos_Aires",
    cvPending: "Próximamente",
    /** Sin `href`, la fila se muestra deshabilitada. Para el CV: subir el PDF a public/ y poner su ruta, ej. "/tobias-sanmartin-cv.pdf". */
    links: [
      { kind: "linkedin", label: "LinkedIn", handle: "/in/tobías-sanmartín", href: "https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/" },
      { kind: "github", label: "GitHub", handle: "@tobiassanmartindev", href: github },
      // PENDIENTE: subir el currículum y completar la ruta
      { kind: "cv", label: "Currículum", handle: "PDF", href: "" },
    ] as { kind: "linkedin" | "github" | "cv"; label: string; handle: string; href: string }[],
  },

  footer: {
    navigateTitle: "Navegar",
    followTitle: "Seguime",
    follow: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tob%C3%ADas-sanmart%C3%ADn-001b74254/" },
      { label: "GitHub", href: github },
      { label: "WhatsApp", href: "https://wa.me/5492257410077" },
    ],
    game: {
      title: "¿Llegaste hasta acá?",
      start: "Rompé la página →",
      launch: "Clic o espacio para lanzar · flechas o mouse para mover",
      launchTouch: "Tocá para lanzar · arrastrá para mover",
      exit: "Salir (Esc)",
      lives: "Vidas",
      won: "Rota en {t}. Arreglada en 1. A eso me dedico.",
      lost: "Sin vidas. Tranqui, la arreglo igual.",
      quit: "La dejo como estaba.",
    },
    backToTop: "Volver arriba ↑",
    backToHome: "Volver al inicio",
    caseStudy: "Caso de estudio",
    nextProject: "Siguiente proyecto",
  },

  caseLabels: {
    live: "Ver en vivo",
    brief: "El problema",
    did: "La solución",
    features: "Funciones principales",
    stack: "Tecnologías",
    results: "Resultados",
    challenge: "Lo más difícil",
  },

  notFound: {
    eyebrow: "Error 404 · Block not found",
    title: "This block fell out of the grid.",
    body: "The page you wanted isn't here. The work is.",
    cta: "Back to home",
  },
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  /** Technologies shown as icons. The available names are listed in components/TechIcon.tsx. */
  tech: Tech[];
  /** Square company logo, shown edge to edge. */
  logo?: string;
  /** Wide wordmark logo: shown contained instead of edge to edge. */
  wordmark?: boolean;
  /** Short text shown in the tile when there is no logo (e.g. "freelance"). Without logo or badge, the tile shows the initial. */
  badge?: string;
};

export const experience: Experience[] = [
  {
    company: "RoadRunner",
    role: "Fullstack Developer",
    period: "Sep 2026 — Actualidad",
    description:
      "Mantengo y hago evolucionar la plataforma de reservas de shuttles, de punta a punta: corrijo errores, mejoro la estabilidad y el rendimiento, y sumo funcionalidades nuevas sin frenar la operación diaria de viajes, pagos y seguimiento en vivo.",
    tech: ["nextjs", "react", "typescript", "nodejs"],
    logo: "/logos/roadrunner.png",
    wordmark: true,
  },
  {
    company: "WK Point",
    role: "Fullstack Developer",
    period: "Mar 2026 — Actualidad",
    description:
      "Sostengo y hago evolucionar el frontend de la plataforma, con foco en estabilidad. Sumé herramientas para las operaciones comerciales y reduje hasta un 60% los tiempos de respuesta.",
    tech: ["vue", "react", "typescript", "nodejs", "vite"],
    logo: "/logos/wkpoint.png",
  },
  {
    company: "Freelance",
    role: "Fullstack Developer",
    period: "Ene 2025 — Feb 2026",
    description:
      "Productos web completos para clientes independientes, con pagos online integrados. Me encargué de todo el recorrido: entender la necesidad, construir, publicar y mantener.",
    tech: ["react", "vue", "nodejs", "typescript"],
    badge: "freelance",
  },
  {
    company: "Cuyo Code",
    role: "Fullstack Developer · Contrato temporal",
    period: "Jun 2024 — Dic 2024",
    description:
      "Aplicaciones pensadas para crecer sin volverse difíciles de mantener. Bajé los tiempos de carga y acompañé a desarrolladores junior con revisiones de código y mentoría.",
    tech: ["vue", "react", "typescript", "vite"],
    logo: "/logos/cuyocode.png",
  },
  {
    company: "WAVE IT",
    role: "Fullstack Developer",
    period: "May 2022 — May 2024",
    description:
      "Armé una librería de componentes compartida para que el equipo construyera más rápido y con una misma línea visual, y sumé tests para entregar con más confianza. Mantuve una app de e-commerce que procesaba pedidos y pagos en tiempo real.",
    tech: ["vue", "react", "typescript", "vitest", "cypress"],
    logo: "/logos/waveit.png",
  },
  {
    company: "Proyectos independientes",
    role: "Desarrollador Web",
    period: "May 2021 — May 2022",
    description: "Soluciones a medida para distintos clientes: sitios y sistemas que resolvían necesidades concretas de cada negocio.",
    tech: ["typescript", "react", "nextjs", "nodejs", "postgresql", "docker"],
    badge: "freelance",
  },
];

export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** Small label above the title, e.g. "SaaS · 2026". */
  meta: string;
  lead: string;
  /** Public URL, when the project can be visited. */
  live?: string;
  /** Vertical image for the orbit card. */
  cover: Shot;
  /** Wide screenshot at the top of the case study (16:10). */
  image: Shot;
  facts: { label: string; value: string }[];
  brief: string;
  did: string;
  features: string[];
  stack: string[];
  /** Mobile screen next to a desktop detail. */
  pair?: { phone: Shot; detail: Shot };
  /** Extra screenshots. `ratio` is width / height and defaults to 16:10. */
  gallery: (Shot & { ratio?: number })[];
  results: string[];
  challenge: string;
  next: string;
};

const shot = (slug: string, name: string, alt: string): Shot => ({ src: `/projects/${slug}/${name}.webp`, alt });

const facts = (cliente: string, rol: string, duracion: string, lanzamiento: string) => [
  { label: "Cliente", value: cliente },
  { label: "Mi rol", value: rol },
  { label: "Duración", value: duracion },
  { label: "Lanzamiento", value: lanzamiento },
];

export const projects: Project[] = [
  {
    slug: "padel-flow",
    name: "Padel Flow",
    meta: "SaaS para clubes · 2026",
    lead: "Una plataforma para que los clubes de pádel manejen reservas, cobros, caja y torneos en un solo lugar, sin planillas ni cadenas de WhatsApp.",
    live: "https://app-padelflow.vercel.app/",
    cover: shot("padel-flow", "cover", "Logo de PadelFlow sobre la grilla de turnos por cancha"),
    image: shot("padel-flow", "hero", "Grilla de turnos de Padel Flow con las reservas del día por cancha"),
    facts: facts("Clubes de pádel", "Desarrollo y venta", "2 meses", "Agosto 2026"),
    brief:
      "Los clubes de pádel manejan reservas, cobros, caja y torneos con planillas, cuadernos y WhatsApp. Eso genera turnos superpuestos, señas que no se cobran y poca visibilidad de cuánto factura cada cancha.",
    did: "Una plataforma donde cada club tiene su espacio aislado y maneja todo desde la grilla de turnos. El jugador reserva solo y paga la seña online, y los planes de suscripción permiten sumar clubes sin tocar código.",
    features: [
      "Grilla de turnos por cancha y día, con horarios fijos recurrentes",
      "Reservas online con seña cobrada por Mercado Pago",
      "Caja diaria y venta de productos: bebidas, alquiler de paletas y más",
      "Torneos con fixture automático e inscripción online",
      "Gestión de clientes y reportes de ocupación e ingresos",
      "Planes de suscripción con prueba gratis y límites por plan",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS", "shadcn/ui", "Mercado Pago", "WhatsApp Cloud API", "Vitest", "Vercel"],
    pair: {
      phone: shot("padel-flow", "phone", "Caja del día de Padel Flow en el celular"),
      detail: shot("padel-flow", "detail", "Listado de torneos de Padel Flow"),
    },
    gallery: [
      shot("padel-flow", "g1", "Reportes de ingresos, ocupación y medios de pago"),
      shot("padel-flow", "g2", "Landing de Padel Flow: del caos de WhatsApp a un club ordenado"),
    ],
    results: [
      "10 clubes operan sus reservas y su caja desde una sola plataforma.",
      "Menos coordinación manual por WhatsApp gracias a la reserva online.",
      "Señas cobradas automáticamente y menos turnos perdidos por ausencias.",
    ],
    challenge:
      "Separar bien los datos de cada club en una misma plataforma y conectar los pagos para que cada uno cobre en su propia cuenta de Mercado Pago.",
    next: "wk-point",
  },
  {
    slug: "wk-point",
    name: "WK Point",
    meta: "Plataforma de empleo · 2026",
    lead: "Un ecosistema que conecta instituciones educativas, estudiantes y empresas para que el talento joven llegue a su primer empleo con el respaldo de su institución.",
    live: "https://wkpoint.com",
    cover: shot("wk-point", "cover", "Logo de WK Point sobre un listado de búsquedas laborales"),
    image: shot("wk-point", "hero", "Portada de WK Point: el ecosistema de vinculación profesional"),
    facts: facts("WK Point", "Desarrollo, en equipo", "6 meses", "Enero 2026"),
    brief:
      "Estudiantes y graduados no tienen visibilidad ante las empresas, las empresas no saben dónde encontrar talento joven y las instituciones no tienen cómo conectar a sus alumnos con el mercado laboral. Además, la versión anterior estaba en un stack viejo y difícil de escalar.",
    did: "Reconstruimos la plataforma desde cero sobre un stack moderno, con la institución educativa en el centro: valida a sus estudiantes y se conecta con empresas, que acceden a los candidatos por suscripción o por créditos.",
    features: [
      "Perfil completo de estudiantes con CV, validado por su institución",
      "Búsquedas laborales con aprobación institucional",
      "Postulación en un click y seguimiento del estado de cada postulación",
      "Panel de empresas con reclutadores, planes y créditos pagados con Mercado Pago",
      "Subdominio propio por institución y métricas de empleabilidad",
      "Notificaciones y avisos del sistema por mail",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Fastify", "tRPC", "Prisma", "PostgreSQL", "Redis", "BullMQ", "MinIO", "Mercado Pago", "Docker", "GitLab CI", "Turborepo", "Playwright"],
    pair: {
      phone: shot("wk-point", "phone", "Elección del tipo de cuenta en el celular"),
      detail: shot("wk-point", "detail", "Registro de estudiante con búsqueda de su institución"),
    },
    gallery: [
      shot("wk-point", "g1", "Registro de empresa en pasos"),
      shot("wk-point", "g2", "Página de contacto de WK Point"),
    ],
    results: [
      "Instituciones, empresas y estudiantes conectados en una misma plataforma.",
      "Migración completa del sistema anterior a un stack moderno y mantenible.",
      "Validación y postulación digitalizadas de punta a punta.",
    ],
    challenge:
      "Manejar cinco tipos de usuario con reglas de acceso distintas (institución, estudiante, empresa, reclutador y admin) y migrar desde el sistema anterior sin cortar el servicio.",
    next: "francis",
  },
  {
    slug: "francis",
    name: "Francis POS",
    meta: "Punto de venta · 2026",
    lead: "Un punto de venta para una panchería: cada pedido se arma y se cobra desde una sola pantalla, en la PC o en el celular, y el ticket sale por la impresora térmica.",
    cover: shot("francis", "cover", "Logo de Francis sobre los botones de venta de panchos y combos"),
    image: shot("francis", "hero", "Pantalla de venta de Francis con panchos, combos y el pedido en curso"),
    facts: facts("Panchería Francis", "Desarrollo y venta", "1 mes", "Octubre 2026"),
    brief:
      "Una panchería con atención en mostrador necesitaba cobrar muy rápido en horas pico, armar pedidos personalizados, controlar la caja y saber cuánto pan y salchicha le queda, sin un sistema complejo pensado para restaurantes.",
    did: "Un POS enfocado en la velocidad: el pedido se arma y se cobra en pocos toques, el ticket se imprime en una térmica de 58 mm y el stock se descuenta solo con cada venta.",
    features: [
      "Venta rápida con personalización de cada pancho, combos y extras",
      "Cobro con varios medios de pago y pagos divididos",
      "Ticket impreso en impresora térmica de 58 mm",
      "Caja con apertura, movimientos, cierre e historial",
      "Stock que se descuenta con cada venta y avisa los faltantes",
      "Compras a proveedores, resumen del día y reportes",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS", "QZ Tray", "PWA"],
    pair: {
      phone: shot("francis", "phone", "Resumen del día de Francis en el celular"),
      detail: shot("francis", "detail", "Stock de insumos con alertas de faltantes"),
    },
    gallery: [
      shot("francis", "g1", "Combos con su precio y el ahorro para el cliente"),
      shot("francis", "g2", "Reportes de ventas por hora y productos más vendidos"),
    ],
    results: [
      "Ventas en mostrador más rápidas, desde una sola pantalla.",
      "Caja y stock controlados a diario, sin anotaciones a mano.",
      "Funciona en la PC o en el celular del local, instalable como app.",
    ],
    challenge:
      "Que una venta se haga en pocos toques en plena hora pico y que el ticket se imprima bien en una impresora térmica directamente desde el navegador.",
    next: "playa-giron",
  },
  {
    slug: "playa-giron",
    name: "Playa Girón POS",
    meta: "Punto de venta y gestión · 2024",
    lead: "Un sistema a medida para un comercio de pesca y playa: venta en mostrador, caja, stock en dos ubicaciones, cuentas corrientes y factura electrónica en un solo lugar.",
    cover: shot("playa-giron", "cover", "Logo de Playa Girón sobre el inventario con stock en local y depósito"),
    image: shot("playa-giron", "hero", "Dashboard con ventas del mes, métodos de pago y productos más vendidos"),
    facts: facts("Playa Girón", "Desarrollo", "4 meses", "Octubre 2024"),
    brief:
      "Un comercio de artículos de pesca y playa necesitaba vender rápido en mostrador, controlar el stock del local y del depósito, llevar las cuentas corrientes de sus clientes y facturar electrónicamente, sin depender de herramientas sueltas ni de planillas.",
    did: "Un punto de venta web hecho a la medida del negocio: venta con lector de códigos, caja con cierre diario, stock en dos ubicaciones y factura electrónica conectada a ARCA, con reportes para que el dueño vea cómo va el negocio.",
    features: [
      "Venta con código de barras y promociones automáticas (2x1, 3x2, combos)",
      "Caja con apertura, cierre e informe Z",
      "Cuenta corriente de clientes: ventas fiadas, cobros parciales y saldos",
      "Inventario en local y depósito, con ingresos y transferencias",
      "Factura electrónica B en ARCA, manual o automática según el medio de pago",
      "Dashboard e informes por período exportables a Excel",
    ],
    stack: ["Vue 3", "Quasar", "Pinia", "Supabase", "PostgreSQL", "Node.js", "Express", "ARCA (WSFE)", "jsPDF", "SheetJS", "ApexCharts", "ZXing", "PWA", "Vercel"],
    pair: {
      phone: shot("playa-giron", "phone", "Dashboard de Playa Girón en el celular"),
      detail: shot("playa-giron", "detail", "Inventario con stock en local y depósito"),
    },
    gallery: [
      shot("playa-giron", "g1", "Promociones y combos con su vigencia"),
      shot("playa-giron", "g2", "Gestión financiera: cuentas y comisiones por forma de pago"),
    ],
    results: [
      "Ventas, caja, stock y facturación centralizados en un solo sistema.",
      "El cierre de caja diario pasó a tomar minutos en lugar de hacerse a mano.",
      "Factura electrónica integrada a la venta, sin cargar comprobantes aparte.",
    ],
    challenge:
      "Mantener stock, caja y cuenta corriente consistentes entre sí en cada operación, y emitir la factura sin frenar la venta.",
    next: "wk-point-admin",
  },
  {
    slug: "wk-point-admin",
    name: "WK Point Admin",
    meta: "CRM interno · 2026",
    lead: "El portal interno del equipo comercial de WK Point: cuentas, contactos, seguimientos y campañas de mail en un mismo lugar, en vez de planillas de Excel.",
    cover: shot("wk-point-admin", "cover", "Logo de WK Point Admin sobre el listado de cuentas del CRM"),
    image: shot("wk-point-admin", "hero", "Listado de cuentas del CRM con filtros por tipo, país y estado"),
    facts: facts("WK Point", "Desarrollo, en equipo", "3 meses", "Noviembre 2026"),
    brief:
      "El equipo comercial seguía a instituciones y empresas en planillas de Excel: contactos duplicados, seguimientos que se perdían y campañas de mail sin registro de quién respondió.",
    did: "Un portal interno con CRM (cuentas, contactos, historial de interacciones y oportunidades) y campañas de mail con seguimiento automático de respuestas. Sumamos importación desde Excel para migrar lo que ya existía y permisos por rol.",
    features: [
      "Cuentas y contactos unificados, con historial de interacciones y casos",
      "Importación CSV y XLSX con vista previa, detección de duplicados y reversión",
      "Campañas de mail con plantillas visuales y seguimientos automáticos",
      "Detección de respuestas y rebotes que actualiza el estado del contacto",
      "Bandeja «Mi trabajo» con las tareas pendientes de cada usuario",
      "Roles y permisos, auditoría y reportes con gráficos",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "NestJS", "Fastify", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Brevo", "Tiptap", "React Email", "Recharts", "Zod", "Vitest", "Playwright", "Docker", "Turborepo"],
    pair: {
      phone: shot("wk-point-admin", "phone", "Bandeja de pendientes en el celular"),
      detail: shot("wk-point-admin", "detail", "Detalle de una campaña con su secuencia y contactos por estado"),
    },
    gallery: [
      shot("wk-point-admin", "g1", "Reportes de campañas con embudo por mensaje"),
      shot("wk-point-admin", "g2", "Editor de plantillas de mail con variables y vista previa"),
    ],
    results: [
      "Seguimiento comercial centralizado en lugar de planillas sueltas.",
      "Base de contactos migrada desde Excel sin duplicados.",
      "Campañas de mail medibles: quién abrió, respondió o rebotó.",
    ],
    challenge:
      "Importar años de datos históricos sin duplicar contactos y registrar las respuestas y los rebotes de cada mail de forma confiable.",
    next: "buenas-olas",
  },
  {
    slug: "buenas-olas",
    name: "Buenas Olas Surf Club",
    meta: "Sitio web · 2026",
    lead: "El sitio de una escuela de surf de Mar de Ajó con más de 20 años: su historia, sus clases y el contacto directo, en una página liviana y rápida.",
    live: "https://www.buenasolas.ar",
    cover: shot("buenas-olas", "cover", "Logo de Buenas Olas sobre las clases de surf con fotos"),
    image: shot("buenas-olas", "hero", "Portada de Buenas Olas Surf Club con video de fondo"),
    facts: facts("Buenas Olas Surf Club", "Desarrollo", "2 semanas", "Octubre 2026"),
    brief:
      "Una escuela de surf con más de 20 años no tenía un sitio que mostrara sus clases, sus servicios y su historia. Todo se consultaba por redes o por mensaje y no había un lugar claro para conocerla y contactarla.",
    did: "Un sitio de una sola página que cuenta la identidad de la escuela con fotos y video reales, presenta cada tipo de clase y lleva directo al contacto por WhatsApp.",
    features: [
      "Portada con video de fondo y la identidad de la escuela",
      "Clases por perfil: chicos, todas las edades, avanzado y surf adaptado",
      "Alquiler de tablas y trajes de neopreno",
      "Galerías de fotos con carruseles por sección",
      "Reseñas, preguntas frecuentes y ubicación",
      "Optimizado para celular y buscadores",
    ],
    stack: ["HTML", "CSS", "JavaScript", "SEO"],
    pair: {
      phone: shot("buenas-olas", "phone", "Sección de clases en el celular"),
      detail: shot("buenas-olas", "detail", "Sección «Una clase para cada surfista»"),
    },
    gallery: [
      shot("buenas-olas", "g1", "Sección de equipos y alquiler"),
      shot("buenas-olas", "g2", "Reseñas de Google y preguntas frecuentes"),
    ],
    results: [
      "Presencia online propia para la escuela.",
      "Toda la información de clases y servicios en un solo lugar.",
      "Contacto directo desde el sitio y menos consultas repetidas por redes.",
    ],
    challenge: "Que el video y las fotos se vean bien y carguen rápido en cualquier celular, Safari incluido.",
    next: "arca-api",
  },
  {
    slug: "arca-api",
    name: "ARCA API",
    meta: "Automatización · 2026",
    lead: "Un servicio propio que factura en ARCA por nuestros sistemas: el punto de venta pide la factura con una llamada y recibe el CAE y el QR listos para imprimir.",
    cover: shot("arca-api", "cover", "Logo de ARCA sobre una Factura C aprobada con CAE y QR"),
    image: shot("arca-api", "hero", "Portada de ARCA API: esto es una API"),
    facts: facts("Uso propio", "Desarrollo", "1 mes", "Marzo 2026"),
    brief:
      "Cada sistema que hacemos para comercios necesita emitir factura electrónica en ARCA. Integrarlo de nuevo en cada proyecto es lento, repetir la lógica genera errores y tener los certificados en varios lugares es un riesgo de seguridad.",
    did: "Un servicio centralizado: cualquier sistema nuestro pide una factura y recibe el CAE y el QR. El servicio se autentica con ARCA, numera los comprobantes y guarda todo de forma segura, para varias empresas a la vez.",
    features: [
      "Facturas y notas de crédito con CAE y QR fiscal",
      "Varias empresas en un mismo servicio, cada una con su API key",
      "Certificados y claves privadas generados y guardados cifrados",
      "Reintentos seguros: el mismo pedido nunca genera dos facturas",
      "Numeración ordenada y conciliación con ARCA si se pierde una respuesta",
      "Verificación de credenciales y puntos de venta antes de facturar",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "ARCA (WSAA + WSFEv1)", "node-forge", "AES-256-GCM", "Zod", "Vitest", "Vercel"],
    gallery: [{ ...shot("arca-api", "diagram", "Diagrama: el sistema pide la factura, ARCA API se autentica con WSAA, pide el CAE a WSFEv1, la guarda y devuelve CAE y QR"), ratio: 2000 / 1040 }],
    results: [
      "Una sola integración con ARCA, reutilizada por todos nuestros sistemas.",
      "Sumar facturación a un sistema nuevo pasa a ser configuración, no desarrollo.",
      "Facturas emitidas en producción sin duplicados ni números salteados.",
    ],
    challenge:
      "Evitar facturas duplicadas o números salteados cuando se corta la conexión a mitad de camino, y proteger los certificados de cada empresa.",
    next: "padel-flow",
  },
];
