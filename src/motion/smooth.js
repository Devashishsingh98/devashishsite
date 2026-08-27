import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return { lenis: null, kill() {} };
  }

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.1,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      }
    );
  });

  gsap.utils.toArray(".case").forEach((el) => {
    const visual = el.querySelector(".case-visual");
    if (!visual) return;
    gsap.fromTo(
      visual,
      { y: 40 },
      {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-solid", window.scrollY > 40);
  };
  onScroll();
  lenis.on("scroll", onScroll);

  const sections = [...document.querySelectorAll("section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  const spy = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    sections.forEach((s) => {
      if (s.offsetTop <= y) current = s;
    });
    links.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current.id);
    });
  };
  lenis.on("scroll", spy);
  spy();

  return {
    lenis,
    kill() {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    },
  };
}
