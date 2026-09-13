let progress = 0;

export function setShift(p) {
  progress = p;
}

function rnd(a, b) {
  return a + Math.random() * (b - a);
}

function makePaper() {
  const w = rnd(70, 150);
  const h = rnd(90, 190);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  g.fillStyle = `rgba(${rnd(232, 245)}, ${rnd(214, 230)}, ${rnd(180, 205)}, 1)`;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = "rgba(90, 50, 20, 0.08)";
  g.lineWidth = 1;
  for (let y = 16; y < h - 10; y += rnd(9, 14)) {
    g.beginPath();
    g.moveTo(10, y);
    let x = 10;
    while (x < w - 10) {
      x += rnd(6, 18);
      g.lineTo(x, y + rnd(-1.2, 1.2));
    }
    g.stroke();
  }
  if (Math.random() > 0.45) {
    g.fillStyle = "rgba(255, 138, 42, 0.18)";
    g.beginPath();
    g.arc(rnd(16, w - 16), rnd(20, h - 20), rnd(4, 10), 0, Math.PI * 2);
    g.fill();
  }
  if (Math.random() > 0.6) {
    g.strokeStyle = "rgba(255, 138, 42, 0.35)";
    g.lineWidth = 1.4;
    g.beginPath();
    g.moveTo(rnd(12, 30), rnd(20, 40));
    g.bezierCurveTo(w * 0.4, h * 0.2, w * 0.6, h * 0.8, w - 16, h - 20);
    g.stroke();
  }
  return c;
}

export function startDesk(root) {
  if (!root) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.hidden = true;
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.id = "night";
  root.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const mobile = window.matchMedia("(max-width: 980px)").matches;

  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  window.addEventListener("resize", size);

  const papers = Array.from({ length: mobile ? 5 : 9 }, (_, i) => ({
    img: makePaper(),
    x: rnd(0.08, 0.92),
    y: rnd(0.12, 0.82),
    r: rnd(-0.45, 0.45),
    spin: rnd(-0.00018, 0.00018),
    bob: rnd(0, Math.PI * 2),
    lift: rnd(6, 16),
    born: i * 0.4,
  }));

  const motes = Array.from({ length: mobile ? 40 : 90 }, () => ({
    x: rnd(0, 1),
    y: rnd(0, 1),
    z: rnd(0.3, 1.6),
    s: rnd(0.6, 2.2),
    v: rnd(0.00004, 0.00014),
    drift: rnd(-0.00008, 0.00008),
    gold: Math.random() > 0.55,
  }));

  const sparks = [];
  const threads = Array.from({ length: mobile ? 3 : 6 }, (_, i) => ({
    seed: rnd(0, 100),
    y: 0.18 + i * 0.12,
    amp: rnd(18, 48),
    w: rnd(0.7, 1.6),
  }));

  let lastSpark = 0;
  let raf = 0;

  const draw = (t) => {
    const w = innerWidth;
    const h = innerHeight;
    ctx.clearRect(0, 0, w, h);
    const p = progress;
    const joy = 0.55 + Math.sin(t * 0.0007) * 0.12;
    const fade = 0.92 - p * 0.28;

    const lampX = w * (mobile ? 0.5 : 0.68 - p * 0.18);
    const lampY = h * 0.08;
    const glow = ctx.createRadialGradient(lampX, lampY, 10, lampX, lampY, h * 0.72);
    glow.addColorStop(0, `rgba(255, 176, 80, ${0.22 * fade})`);
    glow.addColorStop(0.35, `rgba(255, 120, 40, ${0.08 * fade})`);
    glow.addColorStop(1, "rgba(10, 7, 4, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    threads.forEach((th, i) => {
      ctx.beginPath();
      ctx.lineWidth = th.w;
      ctx.strokeStyle = `rgba(255, 197, 106, ${0.12 * fade * joy})`;
      const y0 = h * th.y + Math.sin(t * 0.0004 + th.seed) * 10;
      ctx.moveTo(-20, y0);
      for (let x = 0; x <= w + 40; x += 28) {
        const y =
          y0 +
          Math.sin(x * 0.008 + t * 0.0009 + th.seed) * th.amp * (0.6 + joy) +
          Math.sin(x * 0.02 + t * 0.0014) * 8;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (i % 2 === 0) {
        const bead = ((t * 0.04 + th.seed * 40) % (w + 80)) - 40;
        const by =
          y0 +
          Math.sin(bead * 0.008 + t * 0.0009 + th.seed) * th.amp * (0.6 + joy);
        ctx.fillStyle = `rgba(255, 210, 120, ${0.45 * fade})`;
        ctx.beginPath();
        ctx.arc(bead, by, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();

    papers.forEach((sheet, i) => {
      const age = Math.max(0, t * 0.001 - sheet.born);
      const inA = Math.min(1, age / 1.6);
      const x = sheet.x * w + Math.sin(t * 0.00035 + i) * 10;
      const y = sheet.y * h + Math.sin(t * 0.0005 + sheet.bob) * sheet.lift;
      const r = sheet.r + t * sheet.spin;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r);
      ctx.globalAlpha = 0.22 * fade * inA * (0.75 + Math.sin(t * 0.001 + i) * 0.1);
      ctx.shadowColor = "rgba(255, 160, 70, 0.25)";
      ctx.shadowBlur = 18;
      ctx.drawImage(sheet.img, -sheet.img.width / 2, -sheet.img.height / 2);
      ctx.restore();
    });

    if (t - lastSpark > rnd(900, 2200) && p < 0.9) {
      lastSpark = t;
      const n = 6 + Math.floor(Math.random() * 8);
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: rnd(0.2, 0.8) * w,
          y: rnd(0.25, 0.7) * h,
          vx: rnd(-0.18, 0.18),
          vy: rnd(-0.32, -0.04),
          life: 1,
          s: rnd(1.2, 3.4),
        });
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx * 16;
      s.y += s.vy * 16;
      s.vy += 0.004;
      s.life -= 0.008;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = s.life * 0.7 * fade;
      ctx.fillStyle = i % 2 ? "#ffc56a" : "#ff8a2a";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
      ctx.fill();
    }

    motes.forEach((m) => {
      m.y -= m.v * m.z * (0.7 + joy);
      m.x += m.drift + Math.sin(t * 0.0006 + m.y * 8) * 0.00004;
      if (m.y < -0.02) {
        m.y = 1.04;
        m.x = rnd(0, 1);
      }
      const px = m.x * w;
      const py = m.y * h;
      const near = 1 - Math.min(1, Math.hypot(px - lampX, py - lampY) / (h * 0.7));
      ctx.globalAlpha = (0.08 + near * 0.35) * fade * m.z;
      ctx.fillStyle = m.gold ? "#ffd89a" : "#f0e6d4";
      ctx.beginPath();
      ctx.arc(px, py, m.s * (0.5 + near), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    const loom = 0.22 + p * 0.55;
    ctx.save();
    ctx.translate(w * (mobile ? 0.5 : 0.78), h * 0.58);
    ctx.rotate(-0.12);
    ctx.globalAlpha = 0.18 * fade;
    ctx.strokeStyle = "rgba(255, 197, 106, 0.9)";
    ctx.lineWidth = 1.1;
    const rings = 4;
    for (let i = 1; i <= rings; i++) {
      const r = 28 * i * (0.55 + loom * 0.45);
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.42, t * 0.00012 * i, 0, Math.PI * 2 * Math.min(1, loom + i * 0.08));
      ctx.stroke();
    }
    ctx.restore();

    raf = requestAnimationFrame(draw);
  };

  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}

export function stopDesk() {}
