export function steam(root) {
  if (!root) return;
  const n = window.matchMedia("(max-width: 980px)").matches ? 6 : 12;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.setProperty("--x", `${8 + Math.random() * 84}vw`);
    s.style.setProperty("--d", `${14 + Math.random() * 18}s`);
    s.style.setProperty("--delay", `${Math.random() * -18}s`);
    s.style.setProperty("--s", `${0.6 + Math.random() * 1.4}`);
    root.appendChild(s);
  }
}
