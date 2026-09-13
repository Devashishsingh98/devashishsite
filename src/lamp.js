import * as THREE from "three";

export function lamp(canvas) {
  const mobile = window.matchMedia("(max-width: 980px)").matches;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x0a0704, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.4));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.2, 8.4);

  const root = new THREE.Group();
  root.position.set(mobile ? 0 : 1.6, 1.35, 0);
  scene.add(root);

  const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 3.2, 6),
    new THREE.MeshBasicMaterial({ color: 0x1a120c })
  );
  cord.position.y = 2.1;
  root.add(cord);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 0.7, 16, 1, true),
    new THREE.MeshPhysicalMaterial({
      color: 0x2a1c10,
      metalness: 0.7,
      roughness: 0.45,
      side: THREE.DoubleSide,
    })
  );
  shade.position.y = 0.45;
  root.add(shade);

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffb24a })
  );
  bulb.position.y = 0.18;
  root.add(bulb);

  const glow = new THREE.PointLight(0xff8a2a, 18, 22);
  glow.position.y = 0.1;
  root.add(glow);

  scene.add(new THREE.AmbientLight(0x3a2414, 0.25));

  const mouse = { x: 0, y: 0 };
  const onMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const setSize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    camera.updateProjectionMatrix();
  };
  setSize();
  window.addEventListener("resize", setSize);

  let raf = 0;
  let live = true;
  const tick = (t) => {
    if (!live) return;
    const s = t * 0.001;
    const sway = Math.sin(s * 0.7) * 0.08 + mouse.x * 0.12;
    root.rotation.z = sway;
    root.rotation.x = mouse.y * 0.04;
    glow.intensity = 16 + Math.sin(s * 2.1) * 2.2;
    const p = Number(document.documentElement.style.getPropertyValue("--p") || 0);
    root.position.x = (mobile ? 0 : 1.6) - p * 3.2;
    renderer.domElement.style.opacity = String(0.55 + (1 - p) * 0.35);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    destroy() {
      live = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", setSize);
      renderer.dispose();
    },
  };
}
