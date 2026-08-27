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
  return `<div class="case-visual"><div class="case-fallback">${esc(p.num)} / ${esc(p.category)}</div></div>`;
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
        <div class="hero-copy" data-reveal>
          <p class="kicker">${esc(hero.kicker)}</p>
          <h1>${esc(hero.title[0])}<br /><span class="end">${esc(hero.title[1])}</span></h1>
          <p class="lede">${esc(hero.lede)}</p>
          <div class="row">
            <a class="btn btn-fill" href="${esc(hero.primary.href)}">${esc(hero.primary.label)}</a>
            <a class="btn btn-line" href="${esc(hero.secondary.href)}">${esc(hero.secondary.label)}</a>
          </div>
        </div>
        <div class="hero-void" aria-hidden="true"></div>
      </section>

      <section class="intro wrap-bleed">
        <div class="intro-grid wrap" style="width:min(var(--max), calc(100% - var(--pad) * 2)); margin:0 auto;">
          <div data-reveal>
            <p class="kicker">${esc(intro.kicker)}</p>
            <h2>${esc(intro.statement)}</h2>
          </div>
          <div data-reveal>
            ${intro.lines
              .map(
                (l) =>
                  `<div class="capability"><strong>${esc(l.em)}</strong><span>${esc(l.rest)}</span></div>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="work" id="work">
        <div class="work-head" data-reveal>
          <p class="kicker">Selected work</p>
          <h2>Software that already exists.</h2>
        </div>
        ${projects
          .map(
            (p) => `
          <article class="case" id="${esc(p.id)}">
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
            <p class="kicker">Capabilities</p>
            <h2>Systems I work with.</h2>
          </div>
          <p>Not a badge wall. These are the layers that actually appear in the work above.</p>
        </div>
        <div class="sys-grid" data-reveal>
          ${systems
            .map(
              (col) => `
            <div class="sys-col">
              <h3>${esc(col.layer)}</h3>
              ${col.items
                .map(
                  (item) =>
                    `<button class="chip" type="button" data-tech="${esc(item.id)}">${esc(item.label)}</button>`
                )
                .join("")}
            </div>`
            )
            .join("")}
        </div>
        <p class="related" id="related">Hover a technology to see where it ships.</p>

        <div class="map" data-reveal>
          <p class="kicker">How a job actually moves</p>
          <div class="map-track">
            ${mapLayers
              .map(
                (n, i) => `
              <button class="node${i === 0 ? " is-on" : ""}" type="button" data-hint="${esc(n.hint)}">
                <i></i>
                <b>${esc(n.label)}</b>
                <span>${esc(n.hint)}</span>
              </button>`
              )
              .join("")}
          </div>
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
            <h3>Good fit</h3>
            <ul class="take">${about.take.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>I will pass</h3>
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
