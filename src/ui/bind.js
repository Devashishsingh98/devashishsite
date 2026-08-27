import { projects } from "../data/site.js";

export function bindSystems() {
  const chips = [...document.querySelectorAll(".chip[data-tech]")];
  const related = document.getElementById("related");
  if (!chips.length || !related) return;

  const show = (id) => {
    chips.forEach((c) => c.classList.toggle("is-on", c.dataset.tech === id));
    const hits = projects.filter((p) => p.techs.includes(id));
    if (!id || !hits.length) {
      related.innerHTML = "Hover a technology to see where it ships.";
      return;
    }
    related.innerHTML =
      `<strong>${chips.find((c) => c.dataset.tech === id)?.textContent}</strong> lives in ` +
      hits.map((p) => p.title).join(", ") +
      ".";
  };

  chips.forEach((chip) => {
    chip.addEventListener("pointerenter", () => show(chip.dataset.tech));
    chip.addEventListener("focus", () => show(chip.dataset.tech));
  });
  document.querySelector(".sys-grid")?.addEventListener("pointerleave", () => show(null));
}

export function bindMap() {
  const nodes = [...document.querySelectorAll(".node")];
  const note = document.getElementById("map-note");
  if (!nodes.length) return;
  nodes.forEach((n) => {
    const on = () => {
      nodes.forEach((x) => x.classList.toggle("is-on", x === n));
      if (note) note.textContent = n.dataset.hint || "";
    };
    n.addEventListener("pointerenter", on);
    n.addEventListener("focus", on);
  });
}

export function bindMagnetic() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.22;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}
