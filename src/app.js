import { about, contact, hero, intro, mapLayers, nav, profile, projects, systems } from "./data/site.js";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function visual(p) {
  if (p.visual) {
    return `<div class="case-visual"><img src="${esc(p.visual)}" alt="${esc(p.visualAlt || p.title)}" loading="lazy" /></div>`;
  }
  return `<div class="case-visual case-visual--type"><span>${esc(p.title)}</span></div>`;
}

function mapSvg() {
  const W = 1000;
  const H = 380;
  const nodes = mapLayers.map((n) => ({ ...n, px: (n.x / 100) * W, py: (n.y / 100) * H }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const paths = nodes
    .flatMap((n) =>
      (n.to || []).map((id) => {
        const b = byId[id];
        if (!b) return "";
        const mx = (n.px + b.px) / 2;
        const my = Math.min(n.py, b.py) - 48;
        return `<path class="map-arc" data-from="${esc(n.id)}" data-to="${esc(id)}" d="M${n.px} ${n.py} Q ${mx} ${my} ${b.px} ${b.py}" fill="none" />`;
      })
    )
    .join("");
  const dots = nodes
    .map(
      (n) => `
      <g class="map-node" data-id="${esc(n.id)}" data-hint="${esc(n.hint)}">
        <circle class="map-halo" cx="${n.px}" cy="${n.py}" r="18" />
        <circle class="map-dot" cx="${n.px}" cy="${n.py}" r="4.5" />
        <text x="${n.px}" y="${n.py + 32}" text-anchor="middle">${esc(n.label)}</text>
      </g>`
    )
    .join("");
  return `<svg class="map-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="How work moves from incoming files to a live website">${paths}${dots}</svg>`;
}

export function render() {
  return `
    <a class="skip" href="#work">Skip to work</a>
    <header class="nav">
      <a class="brand" href="/">${esc(profile.name.split(" ")[0])} <span>/ ${esc(profile.short)}</span></a>
      <nav class="nav-links">
        ${nav.map((n) => `<a href="#${n.id}">${esc(n.label)}</a>`).join("")}
      </nav>
      <div class="nav-status"><i></i>${esc(profile.availability)}</div>
    </header>

    <main class="site">
      <section class="hero" id="top">
        <div class="hero-copy">
          <p class="kicker" data-in>${esc(hero.kicker)}</p>
          <h1 data-in>${hero.title.map((line, i) => `${i ? "<br />" : ""}${esc(line)}`).join("")}</h1>
          <p class="lede" data-in>${esc(hero.lede)}</p>
          <div class="row" data-in>
            <a class="btn btn-fill" href="${esc(hero.primary.href)}">${esc(hero.primary.label)}</a>
            <a class="text-link" href="${esc(hero.secondary.href)}">${esc(hero.secondary.label)}</a>
          </div>
        </div>
      </section>

      <section class="intro">
        <div class="intro-inner" data-reveal>
          <p class="kicker">${esc(intro.kicker)}</p>
          <h2>${esc(intro.statement)}</h2>
        </div>
      </section>

      <section class="work" id="work">
        <div class="work-head" data-reveal>
          <p class="kicker">Work</p>
          <h2>Things I’ve already built.</h2>
        </div>
        ${projects
          .map(
            (p) => `
          <article class="case" id="${esc(p.id)}">
            <span class="case-num" aria-hidden="true">${esc(p.num)}</span>
            ${visual(p)}
            <div class="case-copy" data-reveal>
              <div class="case-index">${esc(p.num)} — ${esc(p.category)}</div>
              <h3>${esc(p.title)}</h3>
              <p class="line">${esc(p.line)}</p>
              <p class="purpose">${esc(p.purpose)}</p>
              <ul class="stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              <div class="links">${p.links
                .map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`)
                .join("")}</div>
            </div>
          </article>`
          )
          .join("")}
      </section>

      <section class="capabilities" id="capabilities">
        <div class="cap-head" data-reveal>
          <div>
            <p class="kicker">What I do</p>
            <h2>What I can do for you.</h2>
          </div>
          <p>Hover a type of work to see which projects use it.</p>
        </div>
        <div class="sys-row" data-reveal>
          ${systems
            .map(
              (col) => `
            <button class="sys" type="button" data-techs="${esc(col.techs.join(","))}">
              <h3>${esc(col.layer)}</h3>
              <p>${esc(col.line)}</p>
            </button>`
            )
            .join("")}
        </div>
        <p class="related" id="related">Pick a type of work to see matching projects.</p>

        <div class="map" data-reveal>
          <p class="kicker">How the work flows</p>
          ${mapSvg()}
          <p class="map-note" id="map-note">${esc(mapLayers[0].hint)}</p>
        </div>
      </section>

      <section class="about" id="about">
        <p class="kicker" data-reveal>${esc(about.kicker)}</p>
        <h2 data-reveal>${esc(about.statement)}</h2>
        <dl class="facts" data-reveal>
          ${about.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("")}
        </dl>
        <div class="split" data-reveal>
          <div>
            <h3>A good match</h3>
            <ul class="take">${about.take.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>Not a fit</h3>
            <ul>${about.skip.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
        </div>
        <p class="gh-line" id="gh-line" data-reveal></p>
      </section>

      <section class="contact" id="contact">
        <p class="kicker" data-reveal>${esc(contact.kicker)}</p>
        <h2 data-reveal>${esc(contact.title)}</h2>
        <p class="lede" data-reveal>${esc(contact.lede)}</p>
        <div class="row" data-reveal>
          <a class="btn btn-fill" href="${esc(profile.upwork)}">Hire on Upwork</a>
          <a class="btn btn-line" href="${esc(profile.github)}">GitHub</a>
        </div>
      </section>
    </main>

    <footer>
      <div>${esc(profile.name)} · not affiliated with xAI or Upwork</div>
      <div>${esc(profile.site)}</div>
    </footer>
  `;
}
