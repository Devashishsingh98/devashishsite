import { githubFeatured, githubSkip, operator } from "./data/log.js";

function score(repo) {
  let n = 0;
  if (repo.description) n += 2;
  if (repo.size > 40) n += 2;
  if (["JavaScript", "TypeScript", "Python"].includes(repo.language)) n += 2;
  const year = Number((repo.pushed_at || "").slice(0, 4));
  if (year >= 2026) n += 3;
  else if (year >= 2022) n += 1;
  return n;
}

export async function mountGithub(root) {
  if (!root) return;
  try {
    const [user, repos] = await Promise.all([
      fetch("https://api.github.com/users/Devashishsingh98").then((r) => (r.ok ? r.json() : null)),
      fetch("https://api.github.com/users/Devashishsingh98/repos?per_page=100&sort=updated").then((r) => {
        if (!r.ok) throw new Error("github");
        return r.json();
      }),
    ]);

    const extra = repos
      .filter((repo) => {
        if (repo.fork || githubSkip.has(repo.name) || githubFeatured.has(repo.name)) return false;
        if (repo.size < 30) return false;
        return Number((repo.pushed_at || "").slice(0, 4)) >= 2022 && score(repo) >= 5;
      })
      .sort((a, b) => score(b) - score(a))
      .slice(0, 3);

    const count = user?.public_repos ? `${user.public_repos} public jobs on GitHub` : "Public jobs on GitHub";
    const extras = extra.map((r) => `<a href="${r.html_url}">${r.name}</a>`).join(" · ");
    root.innerHTML = `<a href="${operator.github}">${count}</a>` + (extras ? ` · also ${extras}` : "");
  } catch {
    root.innerHTML = `<a href="${operator.github}">GitHub</a>`;
  }
}
