import { bays, bench, file, jobs, operator } from "./data/log.js";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jobBay(job) {
  const kind = job.stillKind === "page" ? "still still--page" : "still still--shot";
  const still = job.still
    ? `<figure class="${kind}"><img src="${esc(job.still)}" alt="${esc(job.stillAlt || job.title)}" loading="lazy" /></figure>`
    : `<figure class="still still--blank"><span>${esc(job.ticket)}</span></figure>`;
  const stillLinked = job.href
    ? `<a class="still-link" href="${esc(job.href)}" rel="noreferrer">${still}</a>`
    : still;
  const extra = job.href2
    ? `<a class="mark" href="${esc(job.href2)}">${esc(job.href2Label)}</a>`
    : "";
  const status = job.status ? `<p class="job-status">${esc(job.status)}</p>` : "";
  const did = Array.isArray(job.did) && job.did.length
    ? `<ul class="did">${job.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`
    : "";
  return `
    <section class="bay bay-job" id="${esc(job.id)}" data-time="${esc(job.time)}">
      <div class="bay-rail" aria-hidden="true">${esc(job.time)}</div>
      <p class="incoming">${esc(job.incoming)}</p>
      ${stillLinked}
      <div class="job">
        <p class="ticket">${esc(job.ticket)}</p>
        <h2>${esc(job.title)}</h2>
        ${status}
        <p class="body">${esc(job.body)}</p>
        ${did}
        <ul class="tags">${job.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="marks">
          <a class="mark" href="${esc(job.href)}" rel="noreferrer">${esc(job.hrefLabel)}</a>
          ${extra}
        </div>
      </div>
    </section>
  `;
}

export function mill() {
  return `
    <div class="veil" id="veil">
      <p class="veil-city">${esc(operator.city)}</p>
      <p class="veil-line">The mill takes the night.</p>
      <button class="punch" type="button" id="punch">Punch in</button>
    </div>

    <canvas id="lamp" aria-hidden="true"></canvas>
    <div class="desk" id="desk" aria-hidden="true"></div>
    <div class="haze" aria-hidden="true"></div>
    <div class="soot" aria-hidden="true"></div>
    <div class="steam" id="steam" aria-hidden="true"></div>

    <aside class="clock" aria-label="Shift clock">
      <span id="clock">23:00</span>
      <small>IST · night</small>
    </aside>

    <nav class="strip" aria-label="Bays">
      ${bays
        .map(
          (b, i) =>
            `<button type="button" class="tab" data-bay="${esc(b.id)}" data-i="${i}"><em>${esc(b.time)}</em>${esc(b.label)}</button>`
        )
        .join("")}
    </nav>

    <div class="walk" id="walk">
      <div class="floor" id="floor">
        <section class="bay bay-gate" id="gate" data-time="23:00">
          <p class="stamp">${esc(operator.stamp)}</p>
          <h1>
            <span>The mill</span>
            <span>takes the</span>
            <span class="em">night.</span>
          </h1>
          <p class="lede">Bhilai does not sleep the way cities do. Steel keeps a watch. So do I. By morning there is a product you can click — and you keep the code.</p>
          <p class="hint">Scroll. Walk the floor.</p>
        </section>

        ${jobs.map(jobBay).join("")}

        <section class="bay bay-file" id="file" data-time="FILE">
          <p class="incoming">Personnel file. Not a biography.</p>
          <h2>Who is on the line.</h2>
          <dl class="sheet">
            ${file.lines.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
          <div class="cribs" aria-label="Skills">
            ${bench
              .map(
                (c) => `
              <div class="crib">
                <p class="ticket">${esc(c.crib)}</p>
                <ul class="tags">${c.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
              </div>`
              )
              .join("")}
          </div>
          <div class="two">
            <p><strong>Take the job</strong>${esc(file.take)}</p>
            <p><strong>Leave it</strong>${esc(file.leave)}</p>
          </div>
          <p class="gh" id="gh"></p>
        </section>

        <section class="bay bay-out" id="out" data-time="07:00">
          <p class="incoming">Shift ends when the thing works.</p>
          <h2>Seven days.<br />Yours.</h2>
          <p class="lede">Tell me what has to exist. I answer in five lines with what you’ll have in week one. Half in escrow. No decks.</p>
          <div class="marks">
            <a class="mark mark-hot" href="${esc(operator.upwork)}">Hire on Upwork</a>
            <a class="mark" href="${esc(operator.github)}">GitHub</a>
          </div>
          <p class="end">${esc(operator.name)} · ${esc(operator.plant)}</p>
        </section>
      </div>
    </div>
  `;
}
