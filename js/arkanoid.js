'use strict';

const Arkanoid = (() => {
  // ── Fixed constants ────────────────────────────────────────────────────────
  const FADE_MS    = 100;   // fade in/out duration
  const HDR_H      = 52;    // lives + score bar
  const PLAY_H     = 200;   // extra bounce space below items
  const CANVAS_PAD = 18;    // padding around the brick area (visual + ball walls)
  const PADDLE_H   = 12;
  const PADDLE_W0  = 120;
  const PADDLE_SPD = 8;
  const BALL_R     = 7;
  const BALL_SPD0  = 4.5;
  const BALL_SPD_MAX  = BALL_SPD0 * 1.8;
  const SPEED_STEP = 4;
  const SPEED_MUL  = 1.08;
  const BONUS_CHANCE = 0.3;
  const BONUS_SPD  = 2.2;
  const BONUS_W    = 72;
  const BONUS_H    = 22;
  const LIVES_START    = 3;
  const PTS_PER_BRICK  = 25;
  const ICON_SIZE  = 18;
  const ICON_LEFT  = 12;    // same as .stack__item padding-left
  const TEXT_LEFT  = ICON_LEFT + ICON_SIZE + 11; // icon + gap (11px = original gap)

  // ── Dynamic — set at game start via DOM measurement ────────────────────────
  let C_W, C_H, PADDLE_Y;

  const CLR = {
    bg:      '#060a14',
    card:    '#111c33',
    border:  'rgba(148,163,184,0.13)',
    accent:  '#2cd4c5',
    accent2: '#22d3ee',
    ink:     '#e9eef8',
    muted:   '#94a4be',
    faint:   '#3a4d69',
    red:     '#ef4444',
  };

  // ── SVG icons (exact same as inline HTML) ──────────────────────────────────
  const SVGS = {
    'React.js':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23 23 20.46"><circle r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
    'Vue.js 3':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 221"><path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" fill="#41B883"/><path d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" fill="#41B883"/><path d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z" fill="#35495E"/></svg>`,
    'TypeScript':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="20" fill="#3178C6"/><path d="M150.5 200.5v27.6c4.5 2.3 9.8 4 15.9 5.2 6.1 1.1 12.6 1.7 19.4 1.7 6.6 0 12.9-.6 18.9-1.9 6-1.3 11.2-3.4 15.7-6.3 4.5-2.9 8-6.7 10.7-11.4 2.6-4.7 3.9-10.5 3.9-17.4 0-5-.7-9.4-2.2-13.2a30.7 30.7 0 0 0-6.5-10c-2.8-2.9-6.2-5.6-10.1-7.9-3.9-2.3-8.4-4.5-13.3-6.6-3.6-1.5-6.9-2.9-9.8-4.4-2.9-1.4-5.3-2.8-7.3-4.3-2-1.5-3.6-3-4.7-4.7-1.1-1.6-1.6-3.5-1.6-5.6 0-1.9.5-3.6 1.5-5.1s2.4-2.8 4.1-3.9c1.8-1.1 4-1.9 6.6-2.5 2.6-.6 5.5-.9 8.6-.9 2.3 0 4.7.2 7.3.5 2.6.3 5.1.9 7.7 1.6 2.6.7 5.1 1.6 7.6 2.7 2.4 1.1 4.7 2.4 6.8 3.8v-25.8c-4.2-1.6-8.8-2.8-13.8-3.6-5-.8-10.7-1.2-17.1-1.2-6.6 0-12.8.7-18.7 2.1-5.9 1.4-11 3.6-15.5 6.6-4.5 3-8 6.8-10.6 11.4-2.6 4.6-3.9 10.2-3.9 16.6 0 8.2 2.4 15.2 7.1 21 4.8 5.8 12 10.7 21.6 14.8 3.8 1.5 7.3 3.1 10.6 4.6 3.3 1.5 6.1 3 8.5 4.7 2.4 1.6 4.3 3.4 5.7 5.3 1.4 1.9 2.1 4 2.1 6.5 0 1.8-.4 3.4-1.3 5-.9 1.5-2.2 2.8-3.9 4-1.8 1.1-3.9 2-6.6 2.6-2.6.6-5.7 1-9.2 1-6 0-11.9-1-17.8-3.2-5.9-2.1-11.3-5.2-16.3-9.4Zm-46-68.7H140V109H41v22.7h35.3V233h28.1V131.7Z" fill="#FFF"/></svg>`,
    'Tailwind':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 33"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/></svg>`,
    'JavaScript':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1052 1052"><path fill="#f0db4f" d="M0 0h1052v1052H0z"/><path d="M965.9 801.1c-7.7-48-39-88.3-131.7-125.9-32.2-14.8-68.1-25.4-78.8-49.8-3.8-14.2-4.3-22.2-1.9-30.8 6.9-27.9 40.2-36.6 66.6-28.6 17 5.7 33.1 18.8 42.8 39.7 45.4-29.4 45.3-29.2 77-49.4-11.6-18-17.8-26.3-25.4-34-27.3-30.5-64.5-46.2-124-45l-31 4c-29.7 7.5-58 23.1-74.6 44-49.8 56.5-35.6 155.4 25 196.1 59.7 44.8 147.4 55 158.6 96.9 10.9 51.3-37.7 67.9-86 62-35.6-7.4-55.4-25.5-76.8-58.4l-79.9 46.1c9.6 21 19.7 30.5 35.8 48.7 76.2 77.3 266.9 73.5 301.1-43.5 1.4-4 10.6-30.8 3.2-72.1zm-394-317.6h-98.4c0 85-.4 169.4-.4 254.4 0 54.1 2.8 103.7-6 118.9-14.4 29.9-51.7 26.2-68.7 20.4-17.3-8.5-26.1-20.6-36.3-37.7l-5.6-9c-26.7 16.3-53.3 32.7-80 49 13.3 27.3 32.9 51 58 66.4 37.5 22.5 87.9 29.4 140.6 17.3 34.3-10 63.9-30.7 79.4-62.2 22.4-41.3 17.6-91.3 17.4-146.6.5-90.2 0-180.4 0-270.9z" fill="#323330"/></svg>`,
    'HTML5':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520"><path fill="#e34f26" d="M41 460L0 0h451l-41 460-185 52"/><path fill="#ef652a" d="M226 472l149-41 35-394H226"/><path fill="#ecedee" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"/><path fill="#fff" d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"/></svg>`,
    'CSS3':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#264de4" d="M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z"/><path fill="#2965f1" d="m405.388 431.408 35.148-393.73H256v435.146z"/><path fill="#ebebeb" d="m124.46 208.59 5.065 56.517H256V208.59zm-5.041-57.875H256V94.197H114.281zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z"/><path fill="#fff" d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"/></svg>`,
    'Bootstrap':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7952B3"><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H5.003c-1.368 0-2.382-1.2-2.336-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.247-2.268V11.39c1.147-.108 1.837-.944 2.247-2.268.407-1.319.463-2.937.42-4.186-.046-1.3.968-2.5 2.336-2.5h13.994c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.103-2.629-2.207v-.027c1.231-.262 2.001-1.085 2.001-2.315 0-1.554-1.158-2.523-3.057-2.523h-4.05v9.166h4.213c2.087 0 3.522-.943 3.522-2.794z"/></svg>`,
    'Node.js':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5FA04E"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.05-.139.146-.139.241v10.146c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.145c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.146c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.281.163-.6.247-.926.247z"/></svg>`,
    'Supabase':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 113" fill="none"><path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97L53.974 40.063h45.22c8.19 0 12.758 9.46 7.665 15.875l-43.151 54.346Z" fill="#3ECF8E"/><path d="M45.317 2.071c2.86-3.601 8.658-1.628 8.726 2.97l.442 67.251H9.831C1.64 72.292-2.928 62.832 2.166 56.418L45.317 2.07Z" fill="#3ECF8E" opacity=".6"/></svg>`,
    'Firebase':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFCA28"><path d="M3.89 15.673L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/></svg>`,
    'GraphQL':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E10098"><path d="M12.002 0a2.138 2.138 0 100 4.277 2.138 2.138 0 100-4.277zm8.54 4.931a2.138 2.138 0 100 4.277 2.138 2.138 0 100-4.277zm0 9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 100-4.277zm-8.54 4.931a2.138 2.138 0 100 4.276 2.138 2.138 0 100-4.276zm-8.541-4.931a2.138 2.138 0 100 4.277 2.138 2.138 0 100-4.277zm0-9.862a2.138 2.138 0 100 4.277 2.138 2.138 0 100-4.277zm8.541-1.6L2.953 6.31v11.38l9.049 5.221 9.049-5.221V6.31zm0 1.252l7.866 13.626H4.136zm-1.082.625L3.601 15.669V7.387zm2.164 0l6.835 3.946v8.282zM5.218 16.916h13.566l-6.783 3.916z"/></svg>`,
    'Git':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33" fill="#DE4C36"/></svg>`,
    'Vercel':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 222" fill="#ffffff"><path d="m128 0 128 221.705H0z"/></svg>`,
    'VS Code':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#0065A9" d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"/><path fill="#007ACC" d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"/><path fill="#1F9CF0" d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"/></svg>`,
    'GitHub':
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#ffffff"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`,
  };

  // Tech order matches querySelectorAll('.stack__item') DOM order
  const TECHS = [
    [
      { name: 'React.js',   color: '#61DAFB' },
      { name: 'Vue.js 3',  color: '#41B883' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind',   color: '#38BDF8' },
    ],
    [
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'HTML5',      color: '#E34F26' },
      { name: 'CSS3',       color: '#1572B6' },
      { name: 'Bootstrap',  color: '#7952B3' },
    ],
    [
      { name: 'Node.js',   color: '#5FA04E' },
      { name: 'Supabase',  color: '#3ECF8E' },
      { name: 'Firebase',  color: '#FFCA28' },
      { name: 'GraphQL',   color: '#E10098' },
    ],
    [
      { name: 'Git',      color: '#DE4C36' },
      { name: 'Vercel',   color: '#BBBBBB' },
      { name: 'VS Code',  color: '#007ACC' },
      { name: 'GitHub',   color: '#BBBBBB' },
    ],
  ];

  const BONUS_TYPES = [
    { id: 'double', label: '2x BOLA',  color: '#F59E0B' },
    { id: 'extend', label: '+ BARRA',  color: '#8B5CF6' },
  ];

  // ── State ──────────────────────────────────────────────────────────────────
  let canvas, ctx, btnJugar, btnClose, container, gridEl;
  let raf;
  let state = 'idle';

  let score, lives, bricksLeft, bricksBroken, speedFactor;
  let paddle, balls, bricks, bonuses, catData;
  let mouseX = 400;
  let keys   = {};
  let icons  = {};

  // ── Boot ───────────────────────────────────────────────────────────────────
  function init() {
    canvas    = document.getElementById('arkanoid-canvas');
    ctx       = canvas.getContext('2d');
    btnJugar  = document.getElementById('btn-jugar');
    btnClose  = document.getElementById('btn-arkanoid-close');
    container = document.getElementById('arkanoid-container');
    gridEl    = document.querySelector('.stack__grid');

    preloadIcons();

    btnJugar.addEventListener('click', startGame);
    btnClose.addEventListener('click', closeGame);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onCanvasClick);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);
  }

  function preloadIcons() {
    for (const [name, svgStr] of Object.entries(SVGS)) {
      const img = new Image();
      img.src   = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
      icons[name] = img;
    }
  }

  // ── Measure DOM → build bricks at exact original positions ─────────────────
  function measureLayout() {
    const catEls   = document.querySelectorAll('.stack__category-label');
    const itemEls  = document.querySelectorAll('.stack__item');

    const catRects  = Array.from(catEls).map(el => el.getBoundingClientRect());
    const itemRects = Array.from(itemEls).map(el => el.getBoundingClientRect());

    // Canvas left/right = bounding box of ALL items (accounts for negative margin-left)
    const refLeft   = Math.min(...itemRects.map(r => r.left));
    const refRight  = Math.max(...itemRects.map(r => r.right));
    // Canvas top origin = top of category labels
    const refTop    = Math.min(...catRects.map(r => r.top));
    // Content bottom = bottom of last item row
    const refBottom = Math.max(...itemRects.map(r => r.bottom));

    C_W = Math.ceil(refRight - refLeft) + CANVAS_PAD * 2;
    const contentH = Math.ceil(refBottom - refTop);

    PADDLE_Y = HDR_H + CANVAS_PAD + contentH + CANVAS_PAD + PLAY_H;
    C_H      = PADDLE_Y + PADDLE_H + 28;

    canvas.width  = C_W;
    canvas.height = C_H;
    mouseX = C_W / 2;

    // Category labels — shifted right+down by CANVAS_PAD
    catData = Array.from(catEls).map((el, i) => ({
      x:    Math.round(catRects[i].left - refLeft) + CANVAS_PAD,
      y:    Math.round(catRects[i].top  - refTop)  + HDR_H + CANVAS_PAD,
      h:    Math.round(catRects[i].height),
      text: el.textContent.trim(),
    }));

    // Bricks — exact DOM positions + canvas padding offset
    bricks = TECHS.flat().map((tech, i) => ({
      x:    Math.round(itemRects[i].left - refLeft) + CANVAS_PAD,
      y:    Math.round(itemRects[i].top  - refTop)  + HDR_H + CANVAS_PAD,
      w:    Math.round(itemRects[i].width),
      h:    Math.round(itemRects[i].height),
      name: tech.name,
      color: tech.color,
      dead: false,
    }));
  }

  // ── Game lifecycle ─────────────────────────────────────────────────────────
  function startGame() {
    const playWrap = document.getElementById('stack-play-wrap');
    const fade     = `opacity ${FADE_MS}ms ease`;

    // Fade out grid + button together
    gridEl.style.transition  = fade;
    playWrap.style.transition = fade;
    gridEl.style.opacity     = '0';
    playWrap.style.opacity   = '0';

    setTimeout(() => {
      // Measure while grid still in DOM (just invisible)
      measureLayout();

      playWrap.style.cssText  = 'display:none';
      gridEl.classList.add('arkanoid-hidden');
      gridEl.style.cssText    = '';

      // Show canvas at opacity 0, then fade in
      container.style.opacity = '0';
      container.classList.add('active');
      resetAll();
      raf = requestAnimationFrame(loop);

      requestAnimationFrame(() => requestAnimationFrame(() => {
        container.style.transition = fade;
        container.style.opacity    = '1';
      }));
    }, FADE_MS);
  }

  function closeGame() {
    const playWrap = document.getElementById('stack-play-wrap');
    const fade     = `opacity ${FADE_MS}ms ease`;

    // Fade out canvas
    container.style.transition = fade;
    container.style.opacity    = '0';

    setTimeout(() => {
      cancelAnimationFrame(raf);
      container.classList.remove('active');
      container.style.cssText = '';
      state = 'idle';

      // Show grid + button at opacity 0, then fade in
      playWrap.style.cssText = 'opacity:0';
      gridEl.style.opacity   = '0';
      gridEl.classList.remove('arkanoid-hidden');

      requestAnimationFrame(() => requestAnimationFrame(() => {
        gridEl.style.transition   = fade;
        playWrap.style.transition = fade;
        gridEl.style.opacity      = '1';
        playWrap.style.opacity    = '1';

        setTimeout(() => {
          gridEl.style.cssText  = '';
          playWrap.style.cssText = '';
        }, FADE_MS);
      }));
    }, FADE_MS);
  }

  function resetAll() {
    score        = 0;
    lives        = LIVES_START;
    speedFactor  = 1;
    bricksBroken = 0;
    bonuses      = [];
    keys         = {};

    // Re-use already-measured bricks, just reset dead state
    bricks.forEach(b => { b.dead = false; });
    bricksLeft = bricks.length;

    resetRound();
    state = 'ready';
  }

  function resetRound() {
    initPaddle();
    balls = [makeBall(C_W / 2, PADDLE_Y - BALL_R - 2)];
  }

  // ── Object factories ───────────────────────────────────────────────────────
  function initPaddle() {
    paddle = { x: C_W / 2 - PADDLE_W0 / 2, y: PADDLE_Y, w: PADDLE_W0, h: PADDLE_H };
  }

  function makeBall(x, y, vx, vy) {
    return { x, y, vx: vx ?? 0, vy: vy ?? 0, trail: [] };
  }

  function makeBonus(bx, by, type) {
    return { x: bx, y: by, vy: BONUS_SPD, type, dead: false };
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  function onMouseMove(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = C_W / rect.width;
    mouseX = (e.clientX - rect.left) * scaleX;
  }

  function onKeyDown(e) {
    keys[e.code] = true;
    if (state !== 'idle' && ['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
    if (e.code === 'Space' && state === 'ready') launch();
  }

  function onKeyUp(e) { keys[e.code] = false; }

  function onCanvasClick() {
    if (state === 'ready')                       launch();
    if (state === 'gameover' || state === 'win') resetAll();
  }

  // ── Game loop ──────────────────────────────────────────────────────────────
  function loop() {
    update();
    render();
    raf = requestAnimationFrame(loop);
  }

  function launch() {
    state = 'playing';
    const spd   = BALL_SPD0 * speedFactor;
    const angle = (-90 + (Math.random() - 0.5) * 60) * Math.PI / 180;
    balls[0].vx = Math.cos(angle) * spd;
    balls[0].vy = Math.sin(angle) * spd;
  }

  // ── Update ─────────────────────────────────────────────────────────────────
  function update() {
    movePaddle();

    if (state === 'ready') {
      balls[0].x = paddle.x + paddle.w / 2;
      balls[0].y = PADDLE_Y - BALL_R - 2;
      return;
    }
    if (state === 'playing') {
      moveBalls();
      moveBonuses();
    }
  }

  function movePaddle() {
    const usingKeys = keys['ArrowLeft'] || keys['ArrowRight'];
    if (usingKeys) {
      if (keys['ArrowLeft'])  paddle.x -= PADDLE_SPD;
      if (keys['ArrowRight']) paddle.x += PADDLE_SPD;
      mouseX = paddle.x + paddle.w / 2;
    } else {
      paddle.x = mouseX - paddle.w / 2;
    }
    paddle.x = Math.max(CANVAS_PAD, Math.min(C_W - CANVAS_PAD - paddle.w, paddle.x));
  }

  function moveBalls() {
    const toRemove = [];

    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];

      b.trail.push({ x: b.x, y: b.y });
      if (b.trail.length > 8) b.trail.shift();

      b.x += b.vx;
      b.y += b.vy;

      // Walls
      if (b.x - BALL_R < CANVAS_PAD)       { b.x = CANVAS_PAD + BALL_R;       b.vx =  Math.abs(b.vx); }
      if (b.x + BALL_R > C_W - CANVAS_PAD) { b.x = C_W - CANVAS_PAD - BALL_R; b.vx = -Math.abs(b.vx); }
      if (b.y - BALL_R < HDR_H)          { b.y = HDR_H + BALL_R;           b.vy =  Math.abs(b.vy); }

      // Paddle
      if (
        b.vy > 0 &&
        b.y + BALL_R >= paddle.y &&
        b.y + BALL_R <= paddle.y + paddle.h + Math.abs(b.vy) * 1.5 &&
        b.x > paddle.x - BALL_R &&
        b.x < paddle.x + paddle.w + BALL_R
      ) {
        const rel   = (b.x - paddle.x) / paddle.w;
        const angle = (rel - 0.5) * 140 * Math.PI / 180;
        const spd   = Math.hypot(b.vx, b.vy);
        b.vx = Math.sin(angle) * spd;
        b.vy = -Math.abs(Math.cos(angle) * spd);
        b.y  = paddle.y - BALL_R;
      }

      // Bricks
      for (const brick of bricks) {
        if (brick.dead) continue;
        if (hitBrick(b, brick)) {
          brick.dead = true;
          score     += PTS_PER_BRICK;
          bricksBroken++;
          bricksLeft--;
          if (bricksBroken % SPEED_STEP === 0) scaleSpeed();
          if (Math.random() < BONUS_CHANCE)    spawnBonus(brick);
          if (bricksLeft === 0) { state = 'win'; fireConfetti(); return; }
          break;
        }
      }

      if (b.y - BALL_R > C_H) toRemove.push(i);
    }

    for (let i = toRemove.length - 1; i >= 0; i--) balls.splice(toRemove[i], 1);

    if (balls.length === 0) {
      lives--;
      if (lives <= 0) state = 'gameover';
      else { resetRound(); state = 'ready'; }
    }
  }

  function hitBrick(ball, brick) {
    const cx = Math.max(brick.x, Math.min(ball.x, brick.x + brick.w));
    const cy = Math.max(brick.y, Math.min(ball.y, brick.y + brick.h));
    const dx = ball.x - cx;
    const dy = ball.y - cy;
    if (dx * dx + dy * dy > BALL_R * BALL_R) return false;

    const oL = (ball.x + BALL_R) - brick.x;
    const oR = (brick.x + brick.w) - (ball.x - BALL_R);
    const oT = (ball.y + BALL_R) - brick.y;
    const oB = (brick.y + brick.h) - (ball.y - BALL_R);

    if (Math.min(oL, oR) < Math.min(oT, oB)) {
      ball.vx = oL < oR ? -Math.abs(ball.vx) : Math.abs(ball.vx);
    } else {
      ball.vy = oT < oB ? -Math.abs(ball.vy) : Math.abs(ball.vy);
    }
    return true;
  }

  function scaleSpeed() {
    speedFactor = Math.min(speedFactor * SPEED_MUL, BALL_SPD_MAX / BALL_SPD0);
    const target = BALL_SPD0 * speedFactor;
    for (const b of balls) {
      const cur = Math.hypot(b.vx, b.vy);
      if (cur > 0) { const r = target / cur; b.vx *= r; b.vy *= r; }
    }
  }

  function spawnBonus(brick) {
    const type = BONUS_TYPES[Math.floor(Math.random() * BONUS_TYPES.length)];
    bonuses.push(makeBonus(brick.x + brick.w / 2 - BONUS_W / 2, brick.y + brick.h / 2, type));
  }

  function moveBonuses() {
    for (const bo of bonuses) {
      if (bo.dead) continue;
      bo.y += bo.vy;
      if (
        bo.y + BONUS_H >= paddle.y && bo.y <= paddle.y + paddle.h &&
        bo.x + BONUS_W > paddle.x  && bo.x < paddle.x + paddle.w
      ) {
        bo.dead = true;
        applyBonus(bo.type);
      }
      if (bo.y > C_H) bo.dead = true;
    }
    bonuses = bonuses.filter(b => !b.dead);
  }

  function applyBonus(type) {
    if (type.id === 'double') {
      const src = balls[0];
      if (src) balls.push(makeBall(src.x, src.y, -src.vx, src.vy));
    } else if (type.id === 'extend') {
      paddle.w = Math.min(paddle.w + 60, 240);
      setTimeout(() => { if (paddle) paddle.w = Math.max(PADDLE_W0, paddle.w - 60); }, 8000);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function render() {
    ctx.fillStyle = CLR.bg;
    ctx.fillRect(0, 0, C_W, C_H);

    drawDotGrid();
    drawHeader();
    drawCatLabels();
    drawBricks();
    drawBonuses();
    drawPaddle();
    drawBalls();

    if (state === 'ready')    drawReadyMsg();
    if (state === 'gameover') drawGameOver();
    if (state === 'win')      drawWin();
  }

  function drawDotGrid() {
    ctx.fillStyle = 'rgba(44,212,197,0.04)';
    for (let x = 0; x <= C_W; x += 40) {
      for (let y = HDR_H + 40; y < C_H; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawHeader() {
    ctx.fillStyle = 'rgba(17,28,51,0.96)';
    ctx.fillRect(0, 0, C_W, HDR_H);

    ctx.strokeStyle = CLR.accent + '55';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(0, HDR_H); ctx.lineTo(C_W, HDR_H); ctx.stroke();

    // Lives
    ctx.fillStyle    = CLR.muted;
    ctx.font         = `700 10px 'JetBrains Mono', monospace`;
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('VIDAS', 20, HDR_H / 2);

    for (let i = 0; i < LIVES_START; i++) {
      ctx.fillStyle = i < lives ? CLR.accent : CLR.faint;
      ctx.font      = `17px sans-serif`;
      ctx.fillText('♥', 78 + i * 26, HDR_H / 2 + 1);
    }

    // Score
    ctx.fillStyle  = CLR.muted;
    ctx.font       = `700 10px 'JetBrains Mono', monospace`;
    ctx.textAlign  = 'right';
    ctx.fillText('SCORE', C_W - 108, HDR_H / 2);

    ctx.fillStyle = CLR.accent;
    ctx.font      = `bold 22px 'JetBrains Mono', monospace`;
    ctx.fillText(String(score).padStart(5, '0'), C_W - 20, HDR_H / 2 + 1);
  }

  function drawCatLabels() {
    if (!catData) return;
    ctx.font         = `700 12px 'JetBrains Mono', monospace`;
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'middle';

    for (const cat of catData) {
      ctx.fillStyle = CLR.accent;
      ctx.fillText(cat.text.toUpperCase(), cat.x, cat.y + cat.h / 2);
    }
  }

  function drawBricks() {
    for (const b of bricks) {
      if (b.dead) continue;

      // Exactly like .stack__item: card bg + subtle border + radius 10
      ctx.fillStyle = CLR.card;
      rrect(b.x, b.y, b.w, b.h, 10);
      ctx.fill();

      ctx.strokeStyle = CLR.border;
      ctx.lineWidth   = 1;
      rrect(b.x, b.y, b.w, b.h, 10);
      ctx.stroke();

      // Icon — same position as .stack__item padding-left (12px)
      const iconX = b.x + ICON_LEFT;
      const iconY = b.y + (b.h - ICON_SIZE) / 2;
      const img   = icons[b.name];
      if (img && img.complete) {
        ctx.drawImage(img, iconX, iconY, ICON_SIZE, ICON_SIZE);
      }

      // Name — gap: 11px after icon, same as original
      ctx.fillStyle    = CLR.ink;
      ctx.font         = `400 14px 'Space Grotesk', system-ui, sans-serif`;
      ctx.textAlign    = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.name, b.x + TEXT_LEFT, b.y + b.h / 2 + 1);
    }
  }

  function drawBonuses() {
    for (const bo of bonuses) {
      if (bo.dead) continue;

      ctx.fillStyle = bo.type.color + 'cc';
      rrect(bo.x, bo.y, BONUS_W, BONUS_H, BONUS_H / 2);
      ctx.fill();

      ctx.strokeStyle = bo.type.color;
      ctx.lineWidth   = 1;
      rrect(bo.x, bo.y, BONUS_W, BONUS_H, BONUS_H / 2);
      ctx.stroke();

      ctx.fillStyle    = '#000';
      ctx.font         = `bold 9px 'JetBrains Mono', monospace`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bo.type.label, bo.x + BONUS_W / 2, bo.y + BONUS_H / 2);
    }
  }

  function drawPaddle() {
    ctx.shadowColor = CLR.accent;
    ctx.shadowBlur  = 16;

    const g = ctx.createLinearGradient(paddle.x, 0, paddle.x + paddle.w, 0);
    g.addColorStop(0,   CLR.accent2);
    g.addColorStop(0.5, CLR.accent);
    g.addColorStop(1,   CLR.accent2);

    ctx.fillStyle = g;
    rrect(paddle.x, paddle.y, paddle.w, paddle.h, paddle.h / 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function drawBalls() {
    for (const b of balls) {
      for (let i = 0; i < b.trail.length; i++) {
        const t     = b.trail[i];
        const alpha = (i / b.trail.length) * 0.28;
        const r     = BALL_R * (i / b.trail.length) * 0.7;
        ctx.fillStyle = `rgba(34,211,238,${alpha})`;
        ctx.beginPath(); ctx.arc(t.x, t.y, r, 0, Math.PI * 2); ctx.fill();
      }

      ctx.shadowColor = CLR.accent2;
      ctx.shadowBlur  = 20;

      const g = ctx.createRadialGradient(b.x - 2, b.y - 2, 1, b.x, b.y, BALL_R);
      g.addColorStop(0,   '#ffffff');
      g.addColorStop(0.4, CLR.accent2);
      g.addColorStop(1,   CLR.accent);

      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawReadyMsg() {
    ctx.fillStyle    = CLR.muted + 'bb';
    ctx.font         = `13px 'JetBrains Mono', monospace`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('[ Clic o ESPACIO para lanzar ]', C_W / 2, PADDLE_Y - 28);
  }

  function drawGameOver() {
    ctx.fillStyle = 'rgba(6,10,20,0.88)';
    ctx.fillRect(0, 0, C_W, C_H);

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    ctx.shadowColor = CLR.red; ctx.shadowBlur = 32;
    ctx.fillStyle = CLR.red;
    ctx.font = `bold 54px 'Space Grotesk', system-ui, sans-serif`;
    ctx.fillText('GAME OVER', C_W / 2, C_H / 2 - 46);
    ctx.shadowBlur = 0;

    ctx.fillStyle = CLR.muted;
    ctx.font = `17px 'JetBrains Mono', monospace`;
    ctx.fillText(`Puntuación: ${score}`, C_W / 2, C_H / 2 + 8);

    ctx.fillStyle = CLR.accent;
    ctx.font = `13px 'JetBrains Mono', monospace`;
    ctx.fillText('[ Clic para reintentar ]', C_W / 2, C_H / 2 + 52);
  }

  function drawWin() {
    ctx.fillStyle = 'rgba(6,10,20,0.82)';
    ctx.fillRect(0, 0, C_W, C_H);

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    ctx.shadowColor = CLR.accent; ctx.shadowBlur = 32;
    ctx.fillStyle = CLR.accent;
    ctx.font = `bold 54px 'Space Grotesk', system-ui, sans-serif`;
    ctx.fillText('¡GANASTE!', C_W / 2, C_H / 2 - 46);
    ctx.shadowBlur = 0;

    ctx.fillStyle = CLR.muted;
    ctx.font = `17px 'JetBrains Mono', monospace`;
    ctx.fillText(`Puntuación final: ${score}`, C_W / 2, C_H / 2 + 8);

    ctx.fillStyle = CLR.accent2;
    ctx.font = `13px 'JetBrains Mono', monospace`;
    ctx.fillText('[ Clic para jugar de nuevo ]', C_W / 2, C_H / 2 + 52);
  }

  // ── Confetti ───────────────────────────────────────────────────────────────
  function fireConfetti() {
    if (typeof confetti === 'undefined') return;
    const base  = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };
    const count = 200;
    const fire  = (ratio, opts) =>
      confetti({ ...base, ...opts, particleCount: Math.floor(count * ratio) });

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.20, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.10, { spread: 120, startVelocity: 45 });
  }

  // ── Util ───────────────────────────────────────────────────────────────────
  function rrect(x, y, w, h, r) {
    if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y,     x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h,     x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y,         x + r.tl, y);
    ctx.closePath();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
