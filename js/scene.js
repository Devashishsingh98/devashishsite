const ION = 0xc6ff3b;
const UV = 0x8b7cff;
const PLASMA = 0xff4f88;
const VOID = 0x05040c;

function isMobile() {
  return window.matchMedia("(max-width: 860px)").matches || window.innerWidth < 860;
}

export async function mountScene(canvas) {
  if (!canvas) return () => {};

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js");
  } catch {
    document.body.classList.add("no-webgl");
    return () => {};
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile(),
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(VOID, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile() ? 1.25 : 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(VOID, 0.085);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.set(0, 0.15, 7.2);

  const uTime = { value: 0 };
  const uRes = { value: new THREE.Vector2(1, 1) };
  const uMouse = { value: new THREE.Vector2(0.5, 0.5) };

  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { uTime, uRes, uMouse },
      vertexShader: `
        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uMouse;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p = p * 2.07 + 13.1;
            a *= 0.52;
          }
          return v;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uRes.xy;
          vec2 p = (uv - 0.5) * vec2(uRes.x / max(uRes.y, 1.0), 1.0);
          p += (uMouse - 0.5) * 0.18;
          float t = uTime * 0.07;
          float n = fbm(p * 2.15 + vec2(t, -t * 0.4));
          float n2 = fbm(p * 3.4 - vec2(t * 0.65, t) + n);
          float ribbon = smoothstep(0.32, 0.78, n2);
          vec3 voidc = vec3(0.02, 0.016, 0.047);
          vec3 ion = vec3(0.776, 1.0, 0.231);
          vec3 uvv = vec3(0.545, 0.486, 1.0);
          vec3 plasma = vec3(1.0, 0.31, 0.533);
          vec3 col = voidc;
          col = mix(col, uvv * 0.42, n * 0.62);
          col = mix(col, ion * 0.28, ribbon * 0.7);
          col += plasma * pow(max(n2, 0.0), 6.0) * 0.32;
          float scan = sin((uv.y + t * 0.15) * 920.0) * 0.018;
          col += scan;
          float left = smoothstep(0.0, 0.62, uv.x);
          col *= 0.28 + 0.72 * left;
          col *= 1.0 - length(p) * 0.32;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
    })
  );
  bg.frustumCulled = false;
  bg.renderOrder = -10;
  scene.add(bg);

  const core = new THREE.Group();
  core.position.set(isMobile() ? 0 : 1.55, isMobile() ? -0.05 : 0.12, 0);
  scene.add(core);

  const iridescent = new THREE.MeshPhysicalMaterial({
    color: 0x101018,
    metalness: 0.92,
    roughness: 0.18,
    iridescence: 1,
    iridescenceIOR: 1.22,
    iridescenceThicknessRange: [80, 620],
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    emissive: new THREE.Color(ION),
    emissiveIntensity: 0.07,
  });

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.02, 0.26, isMobile() ? 120 : 220, isMobile() ? 16 : 28, 2, 3),
    iridescent
  );
  core.add(knot);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.85, 1),
    new THREE.MeshBasicMaterial({
      color: ION,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
  );
  core.add(shell);

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 1),
    new THREE.MeshBasicMaterial({
      color: PLASMA,
      transparent: true,
      opacity: 0.85,
    })
  );
  core.add(inner);

  [1.55, 2.05, 2.55].forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.006, 8, 128),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? UV : ION,
        transparent: true,
        opacity: 0.28 - i * 0.05,
      })
    );
    ring.rotation.x = Math.PI / 2 + i * 0.18;
    ring.rotation.y = i * 0.4;
    ring.userData.spin = (i % 2 === 0 ? 1 : -1) * (0.0018 + i * 0.0004);
    core.add(ring);
  });

  const nodeCount = isMobile() ? 28 : 64;
  const positions = [];
  const pts = [];
  for (let i = 0; i < nodeCount; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(2.35 + Math.random() * 0.55);
    pts.push(v);
    positions.push(v.x, v.y, v.z);
  }
  const nodes = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)),
    new THREE.PointsMaterial({
      color: ION,
      size: isMobile() ? 0.035 : 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    })
  );
  core.add(nodes);

  const linePos = [];
  const maxDist = 1.35;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < maxDist) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3)),
    new THREE.LineBasicMaterial({
      color: UV,
      transparent: true,
      opacity: 0.22,
    })
  );
  core.add(lines);

  scene.add(new THREE.AmbientLight(0x6b6688, 0.45));
  const l1 = new THREE.PointLight(ION, 22, 16);
  l1.position.set(3.2, 2.2, 4.2);
  scene.add(l1);
  const l2 = new THREE.PointLight(UV, 16, 14);
  l2.position.set(-3.4, -0.8, 3.2);
  scene.add(l2);
  const l3 = new THREE.PointLight(PLASMA, 10, 12);
  l3.position.set(0.4, 3.4, -2.2);
  scene.add(l3);

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const onMove = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = (y / window.innerHeight) * 2 - 1;
    uMouse.value.set(x / window.innerWidth, 1 - y / window.innerHeight);
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const setSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    core.position.x = isMobile() ? 0 : 1.55;
  };
  setSize();
  window.addEventListener("resize", setSize);

  let raf = 0;
  let alive = true;
  const clock = new THREE.Clock();

  const tick = () => {
    if (!alive) return;
    const t = clock.getElapsedTime();
    uTime.value = t;
    target.x += (mouse.x - target.x) * 0.045;
    target.y += (mouse.y - target.y) * 0.045;
    const scroll = window.scrollY || 0;
    core.rotation.y = t * 0.12 + target.x * 0.45;
    core.rotation.x = 0.18 + target.y * 0.25 + scroll * 0.00035;
    shell.rotation.y = -t * 0.08;
    inner.rotation.x = t * 0.7;
    inner.rotation.z = t * 0.4;
    core.children.forEach((child) => {
      if (child.userData.spin) child.rotation.z += child.userData.spin;
    });
    camera.position.x = target.x * 0.35;
    camera.position.y = 0.15 - target.y * 0.2;
    camera.lookAt(core.position.x * 0.35, 0, 0);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  const onVis = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else if (alive) {
      clock.getDelta();
      raf = requestAnimationFrame(tick);
    }
  };
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(tick);

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", setSize);
    document.removeEventListener("visibilitychange", onVis);
    renderer.dispose();
  };
}
