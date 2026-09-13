import Lenis from "lenis";
import gsap from "gsap";
import { setShift } from "./desk.js";

export function walk() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 980px)").matches;
  const floor = document.getElementById("floor");
  const walkEl = document.getElementById("walk");
  const clock = document.getElementById("clock");
  const tabs = [...document.querySelectorAll(".tab")];
  const bays = [...document.querySelectorAll(".bay")];
  const punch = document.getElementById("punch");
  const veil = document.getElementById("veil");
  const times = bays.map((b) => b.dataset.time || "");

  function progress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  function paint(p) {
    const x = p * Math.max(0, bays.length - 1);
    if (!mobile && floor) {
      floor.style.transform = `translate3d(${-x * 100}vw, 0, 0)`;
    }
    const i = Math.min(times.length - 1, Math.floor(p * (times.length - 0.001)));
    if (clock && times[i] && times[i] !== "FILE") clock.textContent = times[i];
    const sub = clock?.nextElementSibling;
    if (sub) sub.textContent = p > 0.82 ? "IST · morning" : "IST · night";
    tabs.forEach((t, n) => t.classList.toggle("is-on", n === i));
    document.documentElement.style.setProperty("--p", String(p));
    setShift(p);
    if (!mobile) {
      bays.forEach((bay, n) => {
        bay.style.setProperty("--d", String(n - x));
      });
    }
  }

  function goBay(id) {
    const i = bays.findIndex((b) => b.id === id);
    if (i < 0) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = (i / Math.max(1, bays.length - 1)) * max;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  }

  function liftVeil() {
    if (!veil || veil.classList.contains("is-off")) return;
    gsap.to(veil, {
      opacity: 0,
      duration: 0.85,
      ease: "power3.inOut",
      onComplete: () => veil.classList.add("is-off"),
    });
  }

  punch?.addEventListener("click", liftVeil);

  function toBay(id) {
    liftVeil();
    if (mobile || reduce) {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    } else {
      goBay(id);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => toBay(tab.dataset.bay));
  });

  document.querySelector(".skip")?.addEventListener("click", (e) => {
    e.preventDefault();
    toBay("out");
  });

  if (mobile || reduce) {
    document.body.classList.add("is-stack");
    veil?.classList.add("is-off");
    window.addEventListener("scroll", () => paint(progress()), { passive: true });
    paint(0);
    return { lenis: null };
  }

  document.body.classList.add("is-mill");
  walkEl.style.height = `${bays.length * 100}vh`;

  const lenis = new Lenis({
    duration: 1.25,
    smoothWheel: true,
    touchMultiplier: 1.1,
  });

  function raf(t) {
    lenis.raf(t);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", () => paint(progress()));
  paint(0);

  window.addEventListener("wheel", liftVeil, { once: true, passive: true });
  window.addEventListener("pointerdown", liftVeil, { once: true });

  return { lenis };
}
