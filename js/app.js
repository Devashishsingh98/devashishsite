import { mountScene } from "./scene.js";
import { loadGithub } from "./github.js";

const reduce =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  Boolean(navigator.connection && navigator.connection.saveData);

function boot() {
  const el = document.getElementById("boot");
  if (!el) return;
  const finish = () => {
    el.classList.add("is-done");
    document.body.classList.add("is-live");
    window.setTimeout(() => el.remove(), 900);
  };
  if (reduce || sessionStorage.getItem("ds-boot") === "1") {
    finish();
    return;
  }
  sessionStorage.setItem("ds-boot", "1");
  el.addEventListener("click", finish, { once: true });
  window.setTimeout(finish, 1600);
}

function clock() {
  const el = document.getElementById("ist-clock");
  if (!el) return;
  const tick = () => {
    el.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  };
  tick();
  window.setInterval(tick, 1000);
}

function tilt() {
  if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cards = document.querySelectorAll(".tilt");
  cards.forEach((card) => {
    if (card.dataset.tilt === "1") return;
    card.dataset.tilt = "1";
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 10;
      const ry = (px - 0.5) * 12;
      card.style.setProperty("--rx", rx.toFixed(2) + "deg");
      card.style.setProperty("--ry", ry.toFixed(2) + "deg");
      card.style.setProperty("--lx", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--ly", (py * 100).toFixed(1) + "%");
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

function spine() {
  const links = [...document.querySelectorAll(".spine a[href^='#']")];
  if (!links.length) return;
  const ids = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const set = () => {
    const y = window.scrollY + window.innerHeight * 0.38;
    let current = ids[0];
    ids.forEach((sec) => {
      if (sec.offsetTop <= y) current = sec;
    });
    links.forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + current.id));
  };
  set();
  window.addEventListener("scroll", set, { passive: true });
}

function year() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

boot();
clock();
tilt();
spine();
year();
loadGithub().then(() => tilt());

if (reduce) {
  document.body.classList.add("is-flat");
} else {
  mountScene(document.getElementById("stage")).catch(() => {
    document.body.classList.add("no-webgl");
  });
}
