import { inject } from "@vercel/analytics";
import "./styles/mill.css";
import { mill } from "./mill.js";
import { mountGithub } from "./github.js";
import { steam } from "./steam.js";
import { walk } from "./walk.js";
import { startDesk } from "./desk.js";

document.getElementById("mill").innerHTML = mill();
steam(document.getElementById("steam"));
mountGithub(document.getElementById("gh"));
startDesk(document.getElementById("desk"));
walk();

const reduce =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  Boolean(navigator.connection && navigator.connection.saveData);

if (!reduce) {
  import("./lamp.js")
    .then((m) => m.lamp(document.getElementById("lamp")))
    .catch(() => {});
} else {
  document.getElementById("lamp")?.remove();
  document.getElementById("veil")?.classList.add("is-off");
}

document.body.classList.add("is-on");
inject();
