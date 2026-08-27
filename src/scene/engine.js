import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const CYAN = 0x62e6ff;
const VOID = 0x050608;

function mobile() {
  return window.matchMedia("(max-width: 980px)").matches;
}

export async function createEngine(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile(),
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(VOID, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile() ? 1.15 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  scene.fog = new THREE.FogExp2(VOID, 0.045);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0.35, 0.12, 8.4);

  const artifact = new THREE.Group();
  artifact.position.set(mobile() ? 0 : 1.35, 0.05, 0);
  scene.add(artifact);

  const metal = new THREE.MeshPhysicalMaterial({
    color: 0x161b22,
    metalness: 0.86,
    roughness: 0.28,
    clearcoat: 0.55,
    clearcoatRoughness: 0.25,
    envMapIntensity: 0.8,
  });

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x0c1218,
    metalness: 0.1,
    roughness: 0.08,
    transmission: 0.55,
    thickness: 1.2,
    transparent: true,
    opacity: 0.85,
    ior: 1.35,
    envMapIntensity: 1,
  });

  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 0), glass);
  artifact.add(shell);

  const frame = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.56, 0),
    new THREE.MeshBasicMaterial({
      color: 0x2a3340,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
  );
  artifact.add(frame);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.95, 0.018, 12, 96),
    metal
  );
  ring.rotation.x = Math.PI / 2.4;
  artifact.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, 0.01, 8, 80),
    new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.18,
    })
  );
  ring2.rotation.x = Math.PI / 1.7;
  artifact.add(ring2);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.38, 0),
    new THREE.MeshStandardMaterial({
      color: 0x041018,
      emissive: new THREE.Color(CYAN),
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.3,
    })
  );
  artifact.add(core);

  const count = mobile() ? 16 : 28;
  const pts = [];
  const pos = [];
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(2.15);
    pts.push(v);
    pos.push(v.x, v.y, v.z);
  }
  artifact.add(
    new THREE.Points(
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)),
      new THREE.PointsMaterial({
        color: CYAN,
        size: 0.028,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      })
    )
  );

  const segs = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      if (pts[i].distanceTo(pts[j]) < 1.55) {
        segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  artifact.add(
    new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(segs, 3)),
      new THREE.LineBasicMaterial({ color: 0x62e6ff, transparent: true, opacity: 0.12 })
    )
  );

  scene.add(new THREE.AmbientLight(0x6b7380, 0.35));
  const key = new THREE.PointLight(CYAN, 10, 18);
  key.position.set(4.2, 2.4, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0x8d7cff, 4.5, 16);
  fill.position.set(-4, -1.2, 3.2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xf3f1ea, 0.35);
  rim.position.set(-2, 4, -3);
  scene.add(rim);

  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
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
    artifact.position.x = mobile() ? 0 : 1.35;
  };
  setSize();
  window.addEventListener("resize", setSize);

  const clock = new THREE.Clock();
  let raf = 0;
  let live = true;
  let scroll = 0;

  const tick = () => {
    if (!live) return;
    const t = clock.getElapsedTime();
    target.x += (mouse.x - target.x) * 0.04;
    target.y += (mouse.y - target.y) * 0.04;
    const s = window.scrollY || 0;
    scroll += (s - scroll) * 0.06;
    const progress = Math.min(scroll / (window.innerHeight * 1.8), 1);

    artifact.rotation.y = t * 0.08 + target.x * 0.35;
    artifact.rotation.x = 0.16 + target.y * 0.2 + progress * 0.6;
    ring.rotation.z = t * 0.12;
    ring2.rotation.z = -t * 0.08;
    core.rotation.y = t * 0.35;
    shell.rotation.y = t * 0.03;

    camera.position.x = 0.35 + target.x * 0.28;
    camera.position.y = 0.12 - target.y * 0.18 + progress * 0.4;
    camera.position.z = 8.4 - progress * 1.6;
    camera.lookAt(artifact.position.x * 0.4, 0, 0);

    renderer.domElement.style.opacity = String(1 - progress * 0.55);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  const vis = () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (live) raf = requestAnimationFrame(tick);
  };
  document.addEventListener("visibilitychange", vis);
  raf = requestAnimationFrame(tick);

  return () => {
    live = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", setSize);
    document.removeEventListener("visibilitychange", vis);
    renderer.dispose();
  };
}
