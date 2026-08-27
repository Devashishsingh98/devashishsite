const FEATURED = new Set([
  "pdf-lens",
  "jobNotificationExtractor",
  "studyhelper",
  "ecommerce",
  "RealTimeChatRoom",
  "devashishsite",
]);

const SKIP = new Set([
  "skills",
  "scrapy",
  "contributor_covenant",
  "codingblocks.online.projectx",
  "yourfirstpr.github.io",
  "candy",
  "stopwatch",
  "Guess-The-color",
  "scoreregister",
  "project",
  "Devashishsingh98",
  "TODO",
  "Attendance",
  "animo",
  "TextUtils",
  "Todo-List",
  "moviecompare",
  "messageshare",
  "Blog_site",
]);

const COPY = {
  weatherapi: "Full shopping SPA: catalog, search, cart, checkout, wishlist. (Repo name is leftover.)",
  imdbdata: "Scrapy crawl of IMDb-style listings — useful when the ticket is a scraper.",
};

function score(repo) {
  let n = 0;
  if (repo.description) n += 2;
  if (repo.size > 40) n += 2;
  if (["JavaScript", "TypeScript", "Python"].includes(repo.language)) n += 2;
  const year = Number((repo.pushed_at || "").slice(0, 4));
  if (year >= 2026) n += 4;
  else if (year >= 2022) n += 2;
  if (repo.homepage) n += 1;
  return n;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function loadGithub() {
  const status = document.getElementById("gh-status");
  const grid = document.getElementById("gh-grid");
  const count = document.getElementById("repo-count");
  const section = document.getElementById("github");
  if (!status || !grid) return Promise.resolve();

  fetch("https://api.github.com/users/Devashishsingh98")
    .then((r) => (r.ok ? r.json() : null))
    .then((user) => {
      if (user && user.public_repos && count) {
        count.textContent = String(user.public_repos).padStart(2, "0");
      }
    })
    .catch(() => {});

  return fetch("https://api.github.com/users/Devashishsingh98/repos?per_page=100&sort=updated")
    .then((r) => {
      if (!r.ok) throw new Error("GitHub " + r.status);
      return r.json();
    })
    .then((repos) => {
      const picked = repos
        .filter((repo) => {
          if (repo.fork || FEATURED.has(repo.name) || SKIP.has(repo.name)) return false;
          if (repo.size < 30) return false;
          const year = Number((repo.pushed_at || "").slice(0, 4));
          return year >= 2022 && score(repo) >= 5;
        })
        .sort((a, b) => score(b) - score(a) || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 3);

      if (!picked.length) {
        if (section) section.hidden = true;
        return;
      }

      status.textContent = "LIVE FEED · forks and classroom toys omitted";
      grid.innerHTML = picked
        .map((repo, i) => {
          const blurb = COPY[repo.name] || repo.description || "Public repository.";
          const pushed = (repo.pushed_at || "").slice(0, 10);
          return (
            '<a class="gh-card tilt" href="' +
            repo.html_url +
            '">' +
            '<span class="idx">' +
            String(i + 1).padStart(2, "0") +
            "</span>" +
            "<h3>" +
            escapeHtml(repo.name) +
            "</h3>" +
            "<p>" +
            escapeHtml(blurb) +
            "</p>" +
            '<div class="gh-meta">' +
            "<span>" +
            escapeHtml(repo.language || "repo") +
            "</span>" +
            "<span>" +
            escapeHtml(pushed) +
            "</span>" +
            "</div></a>"
          );
        })
        .join("");
    })
    .catch(() => {
      status.textContent = "GitHub is quiet. Featured work above is enough.";
    });
}
