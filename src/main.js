import { inject } from "@vercel/analytics";
import { initMotion } from "./site/motion.js";

// Styles are linked from index.html so the page paints styled without JS.
initMotion();
inject();
