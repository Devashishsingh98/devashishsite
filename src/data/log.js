export const operator = {
  name: "Devashish Singh",
  stamp: "SINGH",
  city: "Bhilai, Chhattisgarh",
  plant: "Steel city · BIT Raipur",
  github: "https://github.com/Devashishsingh98",
  upwork: "https://www.upwork.com/freelancers/~01cfcd81e60f9bb55a",
  x: "https://x.com/devashishsin98",
  site: "https://www.devashish98.xyz",
};

export const bays = [
  { id: "gate", time: "23:00", label: "In" },
  { id: "job-1", time: "23:14", label: "Clinic" },
  { id: "job-2", time: "00:40", label: "Lens" },
  { id: "job-3", time: "02:10", label: "Wire" },
  { id: "job-4", time: "04:05", label: "Desk" },
  { id: "file", time: "FILE", label: "File" },
  { id: "out", time: "07:00", label: "Out" },
];

export const jobs = [
  {
    id: "job-1",
    time: "23:14",
    ticket: "N-041",
    incoming: "A dentist needed a site patients could actually read.",
    title: "doctorashishasingh.com",
    body: "Live clinic site, shipped. Next.js on Vercel. Plain language, maps, contact, specialist training made obvious. Not a template with stock teeth.",
    still: "/media/doctor-ashisha.jpg",
    stillAlt: "Live homepage for Dr. Ashisha Singh, dentist in Rajnandgaon",
    stillKind: "page",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
    href: "https://doctorashishasingh.com",
    hrefLabel: "Open live site",
  },
  {
    id: "job-2",
    time: "00:40",
    ticket: "N-014 · TEST",
    incoming: "A paper that will not explain itself.",
    title: "PDF Lens",
    body: "Highlight one sentence. The answer stays on the page. Teach, example, code. Nested, not a chatbot in another tab. Repo is private. App is under testing.",
    still: "/media/pdf-lens-teach.png",
    stillAlt: "PDF Lens teach lens: highlight a sentence and get a nested explanation beside the page",
    tags: ["React", "Express", "pdf.js", "RAG", "local embeddings"],
    href: "https://pdflens.in",
    hrefLabel: "Under testing",
    status: "Under testing",
  },
  {
    id: "job-3",
    time: "02:10",
    ticket: "N-027",
    incoming: "Telegram will not stop talking. A human should not read this at 2am.",
    title: "Job wire",
    body: "Posts come in dirty. Facts come out clean. If it matches, a message leaves. Every fifteen minutes. A small admin screen, because someone has to watch the line.",
    still: null,
    tags: ["FastAPI", "Celery", "Redis", "Telethon", "Gemini"],
    href: "https://github.com/Devashishsingh98/jobNotificationExtractor",
    hrefLabel: "On the floor",
  },
  {
    id: "job-4",
    time: "04:05",
    ticket: "N-033",
    incoming: "A student still awake. The paragraph is the whole world.",
    title: "StudyHelper",
    body: "Highlight. Pick a point of view. The answer sits in the same panel. Follow-ups do not throw you out. If the page is a photograph of text, it still reads.",
    still: null,
    tags: ["React", "FastAPI", "SSE", "Tesseract"],
    href: "https://github.com/Devashishsingh98/studyhelper",
    hrefLabel: "On the floor",
  },
];

export const bench = [
  {
    crib: "Ship",
    tools: ["Next.js", "React", "TypeScript", "Node", "Vite", "Tailwind", "HTML", "CSS"],
  },
  {
    crib: "AI",
    tools: ["RAG", "Agents", "OpenAI", "Gemini", "Embeddings", "Streaming", "Prompting"],
  },
  {
    crib: "Python",
    tools: ["FastAPI", "Flask", "Django", "Celery", "Scrapy", "Automation"],
  },
  {
    crib: "Ops",
    tools: ["AWS", "Vercel", "Linux", "Nginx", "Docker", "Git", "CI/CD"],
  },
  {
    crib: "Data",
    tools: ["Postgres", "MySQL", "Redis", "Supabase", "REST APIs", "System design"],
  },
];

export const file = {
  lines: [
    ["Name", "Devashish Singh"],
    ["Station", "Bhilai, Chhattisgarh · IST"],
    ["School", "Bhilai Institute of Technology, Raipur · CSE"],
    ["Years", "Five. Mostly the unglamorous parts."],
    ["Window", "US morning. Thirty hours. A few jobs, not a crowd."],
    ["Rate", "$1,500–$4,000 fixed · $60–$80 if it cannot be fixed"],
    ["Hold", "Half in Upwork escrow. You keep the site and the code."],
  ],
  take: "A product that has to exist in a week. A real client site. Chat on your files. A wire that sorts the night.",
  leave: "Button-clicking in someone else's tool. A $100 page. Unpaid trials. A six-month hire.",
};

export const githubSkip = new Set([
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
  "ecommerce",
  "RealTimeChatRoom",
]);

export const githubFeatured = new Set([
  "pdf-lens",
  ...jobs.flatMap((j) => [j.href, j.href2].filter(Boolean).map((h) => h.split("/").pop())),
]);
