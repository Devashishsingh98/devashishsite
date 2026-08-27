import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const CYAN = 0x62e6ff;
const VOID = 0x050608;

function isMobile() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function metalMat() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1a212b,
    metalness: 0.92,
    roughness: 0.32,
    clearcoat: 0.4,
    clearcoatRoughness: 0.35,
    envMapIntensity: 0.9,
  });
}

export async function createEngine(canvas) {
  const mobile = isMobile();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(VOID, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.fog = new THREE.FogExp2(VOID, 0.038);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 80);
  camera.position.set(0.2, 0.05, 9.2);

  const root = new THREE.Group();
  root.position.set(mobile ? 0.15 : 2.15, mobile ? 0.55 : 0.15, 0);
  scene.add(root);

  const gimbals = new THREE.Group();
  root.add(gimbals);

  const metal = metalMat();
  const dark = new THREE.MeshPhysicalMaterial({
    color: 0x0c1016,
    metalness: 0.55,
    roughness: 0.12,
    transmission: 0.42,
    thickness: 1.4,
    transparent: true,
    opacity: 0.92,
    ior: 1.4,
    envMapIntensity: 1.1,
  });

  const rings = [
    { r: 1.55, t: 0.028, rot: [Math.PI / 2, 0, 0], spin: [0.003, 0, 0] },
    { r: 1.82, t: 0.016, rot: [Math.PI / 2.8, 0.4, 0.2], spin: [0, 0.0024, 0] },
    { r: 2.12, t: 0.012, rot: [0.35, Math.PI / 2.2, 0.15], spin: [0, 0, 0.0018] },
  ].map((cfg) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(cfg.r, cfg.t, 14, 128), metal);
    mesh.rotation.set(...cfg.rot);
    mesh.userData.spin = cfg.spin;
    gimbals.add(mesh);
    return mesh;
  });

  const vessel = new THREE.Mesh(new THREE.DodecahedronGeometry(0.72, 0), dark);
  root.add(vessel);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.MeshStandardMaterial({
      color: 0x041018,
      emissive: new THREE.Color(CYAN),
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.5,
    })
  );
  root.add(core);

  const strutMat = metalMat();
  for (let i = 0; i < 6; i++) {
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.42, 6), strutMat);
    const phi = (i / 6) * Math.PI * 2;
    strut.position.set(Math.cos(phi) * 0.72, Math.sin(phi) * 0.18, Math.sin(phi) * 0.72);
    strut.lookAt(0, 0, 0);
    strut.rotateX(Math.PI / 2);
    root.add(strut);
  }

  const nodeCount = mobile ? 10 : 18;
  const pts = [];
  const pos = [];
  for (let i = 0; i < nodeCount; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(1.35 + Math.random() * 0.45);
    pts.push(v);
    pos.push(v.x, v.y, v.z);
  }
  const nodes = new THREE.Points(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)),
    new THREE.PointsMaterial({
      color: CYAN,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })
  );
  root.add(nodes);

  const segs = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < 1.15) {
        segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  const veins = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(segs, 3)),
    new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.1 })
  );
  root.add(veins);

  scene.add(new THREE.AmbientLight(0x5b6370, 0.22));
  const key = new THREE.DirectionalLight(0xf3f1ea, 0.55);
  key.position.set(-4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(CYAN, 6.5, 16);
  rim.position.set(5, 1.2, 3);
  scene.add(rim);
  const fill = new THREE.PointLight(0x8d7cff, 2.2, 14);
  fill.position.set(-3.5, -2, 2);
  scene.add(fill);
  const interior = new THREE.PointLight(CYAN, 3.2, 4);
  interior.position.set(0, 0, 0);
  root.add(interior);

  const mouse = { x: 0, y: 0 };
  const look = { x: 0, y: 0 };
  const onMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const setSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  };
  setSize();
  window.addEventListener("resize", setSize);

  const clock = new THREE.Clock();
  let raf = 0;
  let live = true;
  let intro = 0;

  function range(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const h = window.innerHeight;
    const start = h * 0.9;
    const end = h * 0.12;
    if (r.top > start) return 0;
    if (r.top < end) return 1;
    return (start - r.top) / (start - end);
  }

  const tick = () => {
    if (!live) return;
    const t = clock.getElapsedTime();
    intro = Math.min(1, intro + 0.012);
    look.x += (mouse.x - look.x) * 0.035;
    look.y += (mouse.y - look.y) * 0.035;

    const flatten = range("capabilities");
    const recede = Math.max(range("work") * 0.55, range("contact"));

    root.position.x = (mobile ? 0.15 : 2.15) - flatten * 1.4 - recede * 0.4;
    root.position.y = (mobile ? 0.55 : 0.15) + flatten * 0.2;
    root.scale.setScalar(0.86 + intro * 0.14 - recede * 0.12);

    gimbals.rotation.y = t * 0.06 + look.x * 0.32;
    gimbals.rotation.x = 0.22 + look.y * 0.18 + flatten * 0.9;
    rings.forEach((ring, i) => {
      const [sx, sy, sz] = ring.userData.spin;
      ring.rotation.x += sx;
      ring.rotation.y += sy;
      ring.rotation.z += sz;
      ring.scale.setScalar(1 + flatten * (0.18 + i * 0.08));
    });
    vessel.rotation.y = t * 0.04;
    core.rotation.y = -t * 0.25;
    core.rotation.z = t * 0.12;
    veins.material.opacity = 0.08 + Math.sin(t * 0.7) * 0.04 + flatten * 0.08;

    camera.position.x = 0.2 + look.x * 0.22 - flatten * 0.3;
    camera.position.y = 0.05 - look.y * 0.16 + flatten * 1.1;
    camera.position.z = 9.2 - flatten * 1.4 + recede * 1.2;
    camera.lookAt(root.position.x * 0.25, root.position.y * 0.2, 0);

    renderer.domElement.style.opacity = String(
      (mobile ? 0.38 : 1) * (0.15 + intro * 0.85) * (1 - recede * 0.75)
    );
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  const vis = () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (live) raf = requestAnimationFrame(tick);
  };
  document.addEventListener("visibilitychange", vis);
  raf = requestAnimationFrame(tick);

  return {
    destroy() {
      live = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", setSize);
      document.removeEventListener("visibilitychange", vis);
      renderer.dispose();
    },
  };
}
