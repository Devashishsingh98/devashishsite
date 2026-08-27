import "./styles/main.css";
import { render } from "./app.js";
import { bindMagnetic, bindMap, bindSystems } from "./ui/bind.js";
import { mountGithub } from "./ui/github.js";

const root = document.getElementById("app");
root.innerHTML = render();

bindSystems();
bindMap();
bindMagnetic();
mountGithub(document.getElementById("gh-line"));

const reduce =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  Boolean(navigator.connection && navigator.connection.saveData);

import("./motion/smooth.js").then((m) => m.initMotion());

if (!reduce) {
  import("./scene/engine.js")
    .then((m) => m.createEngine(document.getElementById("webgl")))
    .catch(() => document.body.classList.add("no-webgl"));
} else {
  document.getElementById("webgl")?.remove();
}

document.body.classList.add("is-ready");
