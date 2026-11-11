"use client";

import { useEffect, useRef, useState } from "react";

const BG: [number, number, number] = [7 / 255, 8 / 255, 10 / 255];
const BLOCK: [number, number, number] = [44 / 255, 46 / 255, 52 / 255];
const ACCENT: [number, number, number] = [255 / 255, 90 / 255, 31 / 255];

const GRID = 64;
const FOV = (40 * Math.PI) / 180;
const MAX_RETRIES = 3;
// Waking the GPU costs a few hundred ms on the main thread, so it waits for the visitor's first move (or a quiet moment).
const START_EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
const START_AFTER_MS = 6000;
const RETRY_MS = 1000;
// Adaptive resolution: after a warm-up, two slow windows in a row mean a weak GPU, so render fewer pixels.
const WARMUP_MS = 2500;
const SLOW_FRAME_MS = 40;
const SAMPLE_FRAMES = 45;
const MIN_SCALE = 0.6;
const P = {
  blockGap: 0.08,
  amplitude: 3.2,
  waveScale: 0.07,
  speed: 0.35,
  glow: 0.85,
  fog: 1.5,
  fadeTop: 0.3,
  fadeBottom: 0.35,
  vignette: 0.55,
  cameraHeight: 9,
  tilt: 0,
  parallax: 0.6,
};

const VERTEX = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aCell;
uniform mat4 uProj, uView;
uniform float uTime, uGrid, uGap, uHeight, uScale, uSpeed;
uniform vec2 uPointer; uniform float uPointerAmt;
uniform vec2 uShockPos; uniform float uShockAge;
out vec3 vNormal; out vec3 vLocal; out vec3 vWorld; out float vLift; out float vGlowMask; out float vShock;

vec3 hash3(vec2 p){ vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=hash3(i).x, b=hash3(i+vec2(1,0)).x, c=hash3(i+vec2(0,1)).x, d=hash3(i+vec2(1,1)).x;
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*noise(p); p*=2.03; a*=0.5; } return s; }

void main(){
  vec2 cell=aCell;
  float t=uTime*uSpeed;
  vec2 p=cell*uScale;
  float h=fbm(p+vec2(t*0.35,t*0.22));
  h=h*h*1.6;
  // slow rolling swell
  h+=0.35*sin(cell.x*0.18+t*0.9)*cos(cell.y*0.14-t*0.6);
  // pointer ripple
  float d=distance(cell,uPointer);
  float ripple=exp(-d*d*0.012)*uPointerAmt;
  h+=ripple*1.4;
  // click shockwave: a crater, then a ring of blocks thrown outwards
  float sd=distance(cell,uShockPos);
  float fade=exp(-uShockAge*1.5);
  float front=(sd-uShockAge*24.0)*0.3;
  float ring=exp(-front*front)*fade;
  h+=ring*1.5*(0.5+hash3(cell).z);
  h-=exp(-sd*sd*0.06)*fade*0.9;
  // quantize a little for a stepped, voxel feel
  h=floor(h*6.0+0.5)/6.0;
  float lift=h*uHeight;
  float s=1.0-uGap;
  vec3 local=aPos;
  vec3 world=vec3(cell.x, lift, cell.y)+local*vec3(s,1.0,s);
  vNormal=aNormal; vLocal=aPos; vWorld=world; vLift=h;
  vGlowMask=hash3(cell).y;
  vShock=ring;
  gl_Position=uProj*uView*vec4(world,1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec3 vNormal; in vec3 vLocal; in vec3 vWorld; in float vLift; in float vGlowMask; in float vShock;
uniform vec3 uBg, uBlock, uAccent, uCam;
uniform float uTime, uGlow, uFog, uSpeed, uFadeTop, uFadeBottom, uVignette;
uniform vec2 uRes;
out vec4 outColor;
void main(){
  vec3 n=normalize(vNormal);
  vec3 L=normalize(vec3(-0.45,0.85,0.35));
  float diff=max(dot(n,L),0.0);
  float top=step(0.5,n.y);
  // bevelled edges: darken near the face borders
  vec2 fc = abs(n.y)>0.5 ? vLocal.xz : (abs(n.x)>0.5 ? vLocal.zy : vLocal.xy);
  float edge=smoothstep(0.40,0.5,max(abs(fc.x),abs(fc.y)));
  vec3 base=uBlock*(0.28+0.85*diff)+uBlock*0.18*top;
  base*=1.0-edge*0.55;
  // accent: a travelling band + sparse lit tiles on the highest blocks
  float band=smoothstep(0.965,1.0,sin(vWorld.x*0.08+vWorld.z*0.05-uTime*uSpeed*1.4)*0.5+0.5);
  float hot=smoothstep(0.85,1.25,vLift)*step(0.93,vGlowMask);
  float g=(band*0.45+hot*0.9)*top*uGlow;
  vec3 col=mix(base,uAccent*(1.1+0.4*diff),clamp(g+vShock*0.8*top,0.0,1.0));
  // rim
  vec3 V=normalize(uCam-vWorld);
  float rim=pow(1.0-max(dot(n,V),0.0),3.0);
  col+=uAccent*rim*0.08*uGlow;
  // depth fog
  float dist=length(uCam-vWorld);
  float f=1.0-exp(-pow(dist*uFog*0.012,1.6));
  col=mix(col,uBg,clamp(f,0.0,1.0));
  // screen-space fades so content on top stays legible
  vec2 uv=gl_FragCoord.xy/uRes;
  col=mix(col,uBg,(1.0-smoothstep(0.0,uFadeBottom,uv.y))*0.92);
  col=mix(col,uBg,smoothstep(1.0-uFadeTop,1.0,uv.y)*0.9);
  float vig=smoothstep(0.35,1.05,length((uv-0.5)*vec2(1.25,1.0)));
  col=mix(col,uBg,vig*uVignette);
  outColor=vec4(col,1.0);
}`;

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(eye: number[], target: number[], up: number[]) {
  let zx = eye[0] - target[0];
  let zy = eye[1] - target[1];
  let zz = eye[2] - target[2];
  let len = Math.hypot(zx, zy, zz);
  zx /= len;
  zy /= len;
  zz /= len;
  let xx = up[1] * zz - up[2] * zy;
  let xy = up[2] * zx - up[0] * zz;
  let xz = up[0] * zy - up[1] * zx;
  len = Math.hypot(xx, xy, xz);
  xx /= len;
  xy /= len;
  xz /= len;
  const yx = zy * xz - zz * xy;
  const yy = zz * xx - zx * xz;
  const yz = zx * xy - zy * xx;
  return new Float32Array([
    xx, yx, zx, 0,
    xy, yy, zy, 0,
    xz, yz, zz, 0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
    1,
  ]);
}

function cubeVertices() {
  const faces: [number[], number[][]][] = [
    [[0, 1, 0], [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]]],
    [[0, -1, 0], [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]]],
    [[1, 0, 0], [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]]],
    [[-1, 0, 0], [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]]],
    [[0, 0, 1], [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]],
    [[0, 0, -1], [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]]],
  ];
  const out: number[] = [];
  for (const [normal, corners] of faces) {
    for (const i of [0, 1, 2, 0, 2, 3]) {
      const c = corners[i];
      out.push(c[0] * 0.5, c[1] * 0.5 - 0.5, c[2] * 0.5, normal[0], normal[1], normal[2]);
    }
  }
  return new Float32Array(out);
}

/** Instanced WebGL2 voxel landscape behind the hero and the 404 page. */
export function VoxelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // A lost context comes back on a new canvas, because a canvas can't get a second context.
  useEffect(() => {
    if (!failed) return;
    if (attempt >= MAX_RETRIES) {
      // Without the 3D field there is no shockwave, so the cursor must not offer a click.
      fallbackRef.current?.closest("[data-cursor]")?.removeAttribute("data-cursor");
      return;
    }
    const timer = window.setTimeout(() => {
      setAttempt((value) => value + 1);
      setFailed(false);
    }, RETRY_MS);
    return () => window.clearTimeout(timer);
  }, [failed, attempt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // The first render never waits for the 3D: it starts on the first interaction, or after a quiet wait.
    let cleanup: (() => void) | undefined;
    let begun = false;
    let timer = 0;
    const unlisten = () => {
      window.clearTimeout(timer);
      START_EVENTS.forEach((type) => window.removeEventListener(type, begin));
    };
    function begin() {
      if (begun) return;
      begun = true;
      unlisten();
      cleanup = setup(canvas!);
    }
    // A retry after a lost context should come back right away.
    if (attempt > 0) begin();
    else {
      START_EVENTS.forEach((type) => window.addEventListener(type, begin, { once: true, passive: true }));
      timer = window.setTimeout(begin, START_AFTER_MS);
    }
    return () => {
      begun = true;
      unlisten();
      cleanup?.();
    };
  }, [attempt]);

  /** Creates the context and starts compiling; the rest runs in later frames so no single task blocks for long. */
  function setup(canvas: HTMLCanvasElement): (() => void) | undefined {
    // Without a GPU the browser would rasterise on the CPU and stall the page, so the CSS fallback is used instead.
    const gl = canvas.getContext("webgl2", {
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) {
      setAttempt(MAX_RETRIES);
      setFailed(true);
      return;
    }
    const onLost = () => setFailed(true);
    canvas.addEventListener("webglcontextlost", onLost);

    // Status checks are left for later: asking right away would make the page wait for the compiler.
    const shaders = [gl.createShader(gl.VERTEX_SHADER)!, gl.createShader(gl.FRAGMENT_SHADER)!];
    const program = gl.createProgram()!;
    [VERTEX, FRAGMENT].forEach((source, i) => {
      gl.shaderSource(shaders[i], source);
      gl.compileShader(shaders[i]);
      gl.attachShader(program, shaders[i]);
    });
    gl.linkProgram(program);
    const parallel = gl.getExtension("KHR_parallel_shader_compile");

    let disposed = false;
    let wait = 0;
    let stop: (() => void) | undefined;
    const poll = () => {
      if (disposed) return;
      if (parallel && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
        wait = requestAnimationFrame(poll);
        return;
      }
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        shaders.forEach((shader) => console.warn(gl.getShaderInfoLog(shader)));
        console.warn(gl.getProgramInfoLog(program));
        return;
      }
      stop = start(canvas, gl, program);
    };
    wait = requestAnimationFrame(poll);
    return () => {
      disposed = true;
      cancelAnimationFrame(wait);
      stop?.();
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }

  function start(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, program: WebGLProgram) {
    let still = false;
    gl.useProgram(program);
    const u = (name: string) => gl.getUniformLocation(program, name);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices(), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);

    const cells = new Float32Array(GRID * GRID * 2);
    let c = 0;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        cells[c++] = x - GRID / 2;
        cells[c++] = y - GRID / 2;
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, cells, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 8, 0);
    gl.vertexAttribDivisor(2, 1);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, amt: 0, tamt: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        pointer.tamt = 0;
      } else {
        pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
        pointer.tamt = 1;
      }
    };
    const onLeave = () => {
      pointer.tamt = 0;
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const goStill = () => {
      still = true;
      // A still field has no shockwave, so the cursor must not offer a click.
      canvas.closest("[data-cursor]")?.removeAttribute("data-cursor");
    };
    const shock = { x: 0, z: 0, at: -100 };
    const camera = { eye: [0, P.cameraHeight, GRID * 0.42], target: [0, 0, -GRID * 0.12 + P.tilt] };
    // Finds the point of the ground under the click by casting a ray from the camera.
    const onClick = (e: MouseEvent) => {
      if (reduced || still) return;
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) return;
      if (e.target instanceof Element && e.target.closest("a, button, .nav, .nm-p, .hero-name")) return;
      const { eye, target } = camera;
      const forward = [target[0] - eye[0], target[1] - eye[1], target[2] - eye[2]];
      const fl = Math.hypot(forward[0], forward[1], forward[2]);
      const fx = forward[0] / fl;
      const fy = forward[1] / fl;
      const fz = forward[2] / fl;
      const rl = Math.hypot(fz, fx) || 1;
      const rx = -fz / rl;
      const rz = fx / rl;
      const ux = -rz * fy;
      const uy = rz * fx - rx * fz;
      const uz = rx * fy;
      const tan = Math.tan(FOV / 2);
      const nx = (((e.clientX - r.left) / r.width) * 2 - 1) * tan * (r.width / r.height);
      const ny = (1 - ((e.clientY - r.top) / r.height) * 2) * tan;
      const dy = fy + uy * ny;
      if (dy >= -0.01) return;
      const t = -eye[1] / dy;
      shock.x = eye[0] + (fx + rx * nx + ux * ny) * t;
      shock.z = eye[2] + (fz + rz * nx + uz * ny) * t;
      shock.at = performance.now();
      canvas.closest("[data-cursor]")?.removeAttribute("data-cursor");
    };
    window.addEventListener("click", onClick);
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const start = performance.now();
    const proj = u("uProj");
    const view = u("uView");
    const camU = u("uCam");
    const time = u("uTime");
    const pointerU = u("uPointer");
    const pointerAmt = u("uPointerAmt");
    const res = u("uRes");
    const shockPos = u("uShockPos");
    const shockAge = u("uShockAge");
    gl.uniform1f(u("uGrid"), GRID);
    gl.uniform1f(u("uGap"), P.blockGap);
    gl.uniform1f(u("uHeight"), P.amplitude);
    gl.uniform1f(u("uScale"), P.waveScale);
    gl.uniform1f(u("uSpeed"), P.speed);
    gl.uniform1f(u("uGlow"), P.glow);
    gl.uniform1f(u("uFog"), P.fog);
    gl.uniform1f(u("uFadeTop"), P.fadeTop);
    gl.uniform1f(u("uFadeBottom"), P.fadeBottom);
    gl.uniform1f(u("uVignette"), P.vignette);
    gl.uniform3fv(u("uBg"), BG);
    gl.uniform3fv(u("uBlock"), BLOCK);
    gl.uniform3fv(u("uAccent"), ACCENT);

    let scale = Math.min(window.devicePixelRatio || 1, 2);
    const draw = () => {
      const dpr = scale;
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const t = reduced ? 8 : (performance.now() - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.amt += (pointer.tamt - pointer.amt) * 0.04;

      gl.viewport(0, 0, w, h);
      gl.clearColor(BG[0], BG[1], BG[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const eye = [pointer.x * P.parallax * 4, P.cameraHeight + -pointer.y * P.parallax * 2, GRID * 0.42];
      const target = [0, 0, -GRID * 0.12 + P.tilt];
      camera.eye = eye;
      camera.target = target;
      gl.uniformMatrix4fv(proj, false, perspective(FOV, w / h, 0.1, 400));
      gl.uniformMatrix4fv(view, false, lookAt(eye, target, [0, 1, 0]));
      gl.uniform3fv(camU, eye);
      gl.uniform1f(time, t);
      gl.uniform2f(res, w, h);
      gl.uniform2f(pointerU, pointer.x * GRID * 0.35, GRID * 0.05 + pointer.y * GRID * 0.2);
      gl.uniform1f(pointerAmt, pointer.amt);
      gl.uniform2f(shockPos, shock.x, shock.z);
      gl.uniform1f(shockAge, (performance.now() - shock.at) / 1000);
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 36, GRID * GRID);
    };

    let raf = 0;
    let first = true;
    canvas.style.opacity = "1";
    let last = 0;
    let frames = 0;
    let spent = 0;
    let slowWindows = 0;
    const sampleFrom = performance.now() + WARMUP_MS;
    const loop = (now: number) => {
      if (visible && (!(reduced || still) || first)) {
        first = false;
        draw();
        // Measure real frame pacing and trade resolution for smoothness on weak GPUs.
        if (!reduced && !still && last && now > sampleFrom) {
          frames++;
          spent += now - last;
          if (frames >= SAMPLE_FRAMES) {
            const avg = spent / frames;
            slowWindows = avg > SLOW_FRAME_MS ? slowWindows + 1 : 0;
            if (slowWindows >= 2) {
              slowWindows = 0;
              if (scale > MIN_SCALE) scale = Math.max(MIN_SCALE, scale * 0.75);
              else goStill();
            }
            frames = 0;
            spent = 0;
          }
        }
        last = now;
      } else {
        last = 0;
      }
      if (still && !first) {
        // Keep the still frame sharp when the viewport changes size.
        const w = Math.max(1, Math.round(canvas.clientWidth * scale));
        const h = Math.max(1, Math.round(canvas.clientHeight * scale));
        if (visible && (canvas.width !== w || canvas.height !== h)) draw();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("pointerleave", onLeave);
    };
  }

  if (failed) {
    return (
      <div ref={fallbackRef} aria-hidden="true" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "rgb(7, 8, 10)" }}>
        <div
          style={{
            position: "absolute",
            left: "-60%",
            right: "-60%",
            top: "38%",
            height: "120%",
            transformOrigin: "50% 0",
            transform: "perspective(760px) rotateX(62deg)",
            background:
              "repeating-linear-gradient(90deg, #000 0 3px, transparent 3px 84px), repeating-linear-gradient(0deg, #000 0 3px, transparent 3px 84px), rgb(44, 46, 52)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(46% 22% at 62% 62%, color-mix(in srgb, rgb(255, 90, 31) 34%, transparent), transparent 72%), linear-gradient(180deg, rgb(7, 8, 10) 36%, transparent 58%)",
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      key={attempt}
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", background: "rgb(7, 8, 10)", opacity: 0, transition: "opacity 0.9s ease" }}
    />
  );
}
