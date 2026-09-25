/* ==========================================================================
   Motion layer.
   Rules held here:
   - Only transform and opacity are animated. No layout properties, no filters.
   - Scroll reveals are pure CSS (scroll-driven). This module only adds
     choreography on top, so nothing is ever left hidden if JS does not run.
   - Every branch is guarded by prefers-reduced-motion.
   ========================================================================== */

import Lenis from "lenis";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = "(prefers-reduced-motion: reduce)";
const DESKTOP = "(min-width: 981px)";
const FINE = "(hover: hover) and (pointer: fine)";

export function initMotion() {
  const reduceQuery = window.matchMedia(REDUCED);
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const reduced = reduceQuery.matches || saveData;

  /* ---------------------------------------------------------------------
     Smooth scroll. Lenis drives the page; GSAP drives Lenis.
     --------------------------------------------------------------------- */
  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------------------------------------------------------------------
     Reading progress rule at the top of the viewport.
     --------------------------------------------------------------------- */
  gsap.fromTo(
    ".progress i",
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
    }
  );

  /* ---------------------------------------------------------------------
     Nav: materialise once the hero is behind us, and track the open section.
     --------------------------------------------------------------------- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    ScrollTrigger.create({
      start: 48,
      end: "max",
      onToggle: (self) => nav.classList.toggle("is-scrolled", self.isActive),
    });

    const links = Array.from(nav.querySelectorAll(".nav__links a"));
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if (sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) =>
              a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
            );
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }

  /* Reduced motion stops here: scroll reveals are CSS, the page is complete. */
  if (reduced) return;

  /* ---------------------------------------------------------------------
     Hero entrance. gsap.from sets its own start state at runtime, so a
     broken bundle can never strand the headline off screen.
     --------------------------------------------------------------------- */
  const hero = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.08 });

  hero
    .from(".hero__title .line > span", { yPercent: 114, duration: 1.15, stagger: 0.085 }, 0)
    .from(".eyebrow", { opacity: 0, y: 14, duration: 0.7 }, 0)
    .from(".hero__sub", { opacity: 0, y: 18, duration: 0.8 }, 0.34)
    .from(".hero__cta > *", { opacity: 0, y: 16, duration: 0.7, stagger: 0.07 }, 0.46)
    .from(".cascade__item", { opacity: 0, y: 40, duration: 1.05, stagger: 0.1 }, 0.3);

  /* ---------------------------------------------------------------------
     Hero cascade drifts apart as the section leaves. Composed on the item
     wrapper so the CSS rotation on the plate itself is left untouched.
     --------------------------------------------------------------------- */
  gsap.matchMedia().add(`${DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
    gsap.utils.toArray(".cascade__item").forEach((item, i) => {
      /* fromTo with an explicit start: the hero entrance leaves y at 40 when
         this tween is built, and a plain .to() would cache that as its origin
         and rest the whole cascade 40px low. */
      gsap.fromTo(
        item,
        { y: 0 },
        {
          y: -(i + 1) * 22,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  });

  /* ---------------------------------------------------------------------
     Work cards enter once, as a group. They deliberately carry no
     scroll-driven CSS animation: a CSS animation outranks inline styles and
     would cancel the pinned recede below. The inner core is animated here
     instead, so the shell receives its content.
     --------------------------------------------------------------------- */
  gsap.from(".card__core", {
    opacity: 0,
    y: 22,
    duration: 0.75,
    ease: "power3.out",
    stagger: 0.09,
    scrollTrigger: { trigger: ".work", start: "top 74%", once: true },
  });

  /* ---------------------------------------------------------------------
     Sticky work stack. The card being covered recedes as the next one
     arrives. Desktop only, since the stack stops being sticky below 980px.
     --------------------------------------------------------------------- */
  gsap.matchMedia().add(`${DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
    const cards = gsap.utils.toArray(".card");
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.945,
        opacity: 0.45,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
    });
  });

  /* ---------------------------------------------------------------------
     Magnetic primary buttons. Fine pointers only, and small enough to read
     as weight rather than as a gimmick.
     --------------------------------------------------------------------- */
  if (window.matchMedia(FINE).matches) {
    const magnets = document.querySelectorAll(
      ".hero__cta .btn--acid, .closing__cta .btn--acid, .card .btn--acid"
    );
    magnets.forEach((el) => {
      const strength = 7;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      el.addEventListener("pointermove", (event) => {
        const box = el.getBoundingClientRect();
        xTo(((event.clientX - box.left) / box.width - 0.5) * strength * 2);
        yTo(((event.clientY - box.top) / box.height - 0.5) * strength);
      });
      el.addEventListener("pointerleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* Fonts can change measurements once they land. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}
