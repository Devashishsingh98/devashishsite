import { projects, systems } from "../data/site.js";

export function bindSystems() {
  const buttons = [...document.querySelectorAll(".sys")];
  const related = document.getElementById("related");
  const cases = [...document.querySelectorAll(".case")];
  if (!buttons.length || !related) return;

  const show = (techs) => {
    buttons.forEach((b) => b.classList.toggle("is-on", b === show.current));
    const set = new Set(techs || []);
    const hits = projects.filter((p) => p.techs.some((t) => set.has(t)));
    cases.forEach((c) => {
      const match = hits.some((p) => p.id === c.id);
      c.classList.toggle("is-dim", Boolean(techs) && !match);
    });
    if (!techs || !hits.length) {
      related.textContent = "Select a layer to see where it ships.";
      return;
    }
    const label = systems.find((s) => s.techs.join(",") === techs.join(","))?.layer || "This";
    related.innerHTML = `<strong>${label}</strong> shows up in ${hits.map((p) => p.title).join(", ")}.`;
  };

  buttons.forEach((btn) => {
    const techs = (btn.dataset.techs || "").split(",").filter(Boolean);
    const on = () => {
      show.current = btn;
      show(techs);
    };
    btn.addEventListener("pointerenter", on);
    btn.addEventListener("focus", on);
  });
  document.querySelector(".sys-row")?.addEventListener("pointerleave", () => {
    show.current = null;
    buttons.forEach((b) => b.classList.remove("is-on"));
    show(null);
  });
}

export function bindMap() {
  const nodes = [...document.querySelectorAll(".map-node")];
  const arcs = [...document.querySelectorAll(".map-arc")];
  const note = document.getElementById("map-note");
  if (!nodes.length) return;

  const clear = () => {
    nodes.forEach((n) => n.classList.remove("is-on"));
    arcs.forEach((a) => a.classList.remove("is-on"));
  };

  const activate = (id, hint) => {
    clear();
    nodes.forEach((n) => n.classList.toggle("is-on", n.dataset.id === id));
    arcs.forEach((a) => {
      if (a.dataset.from === id || a.dataset.to === id) a.classList.add("is-on");
    });
    if (note && hint) note.textContent = hint;
  };

  nodes.forEach((n, i) => {
    n.style.cursor = "pointer";
    const on = () => activate(n.dataset.id, n.dataset.hint);
    n.addEventListener("pointerenter", on);
    n.addEventListener("click", on);
    if (i === 0) activate(n.dataset.id, n.dataset.hint);
  });
}

export function bindMagnetic() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.16;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}
