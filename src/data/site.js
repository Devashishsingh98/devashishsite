export const profile = {
  name: "Devashish Singh",
  short: "DS",
  role: "AI engineer · full-stack systems · product builder",
  location: "India · IST",
  overlap: "US morning overlap",
  availability: "Available for select projects",
  hours: "30+ hrs / week",
  window: "7-day first slice",
  rateHourly: "$60–$80",
  rateFixed: "$1,500–$4,000",
  escrow: "50% Upwork escrow to start",
  github: "https://github.com/Devashishsingh98",
  upwork: "https://www.upwork.com/freelancers/~01cfcd81e60f9bb55a",
  site: "https://www.devashish98.xyz",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  kicker: "AI engineer · full-stack systems · product builder",
  title: ["I build intelligent systems", "that actually ship."],
  lede:
    "Working web products in seven days — Next.js, RAG over your files, agents, dashboards. You get a live URL and the repository. Fixed price. No decks.",
  primary: { label: "Explore my work", href: "#work" },
  secondary: { label: "Let’s build something", href: "#contact" },
};

export const intro = {
  kicker: "Practice",
  statement:
    "I build the software around the model: ingestion, retrieval, interfaces, and the boring production path in between.",
  lines: [
    { em: "AI systems", rest: "RAG, embeddings, agents, chat on your data" },
    { em: "Products", rest: "Next.js / React apps with auth, admin, deploy" },
    { em: "Pipelines", rest: "scrape → parse → match → notify" },
    { em: "Internal tools", rest: "dashboards, research workspaces, ops UIs" },
  ],
};

export const projects = [
  {
    id: "pdf-lens",
    num: "01",
    category: "Document intelligence",
    title: "PDF Lens",
    line: "AI reading workspace for papers — highlight a sentence, keep the thread.",
    purpose:
      "Chat on your documents as a real product: nested explain / teach / example / code / go-deeper, optional Chrome extension. Not a ChatGPT skin.",
    visual: "/media/pdf-lens-home.jpg",
    visualAlt: "PDF Lens workspace with a highlighted paper and nested answers",
    stack: ["React", "Vite", "Express", "OpenAI / OpenRouter", "pdf.js", "SQLite", "local embeddings"],
    techs: ["rag", "react", "node", "embeddings"],
    links: [{ label: "GitHub", href: "https://github.com/Devashishsingh98/pdf-lens" }],
  },
  {
    id: "jobs",
    num: "02",
    category: "Automation pipeline",
    title: "Job notification extractor",
    line: "Telegram in. Structured, eligible jobs out. On a schedule.",
    purpose:
      "Ingest noisy channel posts, parse with regex then Gemini, match eligibility, notify. Celery every 15 minutes. React admin.",
    visual: null,
    stack: ["FastAPI", "Celery", "Redis", "Supabase", "Telethon", "Gemini", "React / TS"],
    techs: ["fastapi", "python", "redis", "react", "pipelines"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Devashishsingh98/jobNotificationExtractor",
      },
    ],
  },
  {
    id: "studyhelper",
    num: "03",
    category: "Streaming research UI",
    title: "StudyHelper",
    line: "Highlight a passage, pick a lens, get a streamed insight in the same panel.",
    purpose:
      "Exam study workspace with follow-ups that stay put. OCR when the page is a scan. Same shape as an internal research tool.",
    visual: null,
    stack: ["React", "FastAPI", "SSE", "Tesseract", "Zustand", "pdf.js"],
    techs: ["rag", "fastapi", "python", "react"],
    links: [{ label: "GitHub", href: "https://github.com/Devashishsingh98/studyhelper" }],
  },
  {
    id: "commerce-chat",
    num: "04",
    category: "Backend product",
    title: "Commerce + realtime chat",
    line: "An Express shop with sessions and cart. A Django Channels room on Redis.",
    purpose:
      "Older, still honest backend work — useful when the ticket is cart + auth or live chat, not another landing page.",
    visual: null,
    stack: ["Express", "sessions", "Django", "Channels", "Redis"],
    techs: ["node", "python", "redis"],
    links: [
      { label: "Ecommerce", href: "https://github.com/Devashishsingh98/ecommerce" },
      { label: "Chat room", href: "https://github.com/Devashishsingh98/RealTimeChatRoom" },
    ],
  },
];

export const systems = [
  {
    id: "frontend",
    layer: "Frontend",
    items: [
      { id: "react", label: "React" },
      { id: "next", label: "Next.js" },
      { id: "ts", label: "TypeScript" },
    ],
  },
  {
    id: "backend",
    layer: "Backend",
    items: [
      { id: "node", label: "Node" },
      { id: "python", label: "Python" },
      { id: "fastapi", label: "FastAPI" },
    ],
  },
  {
    id: "ai",
    layer: "Intelligence",
    items: [
      { id: "rag", label: "RAG" },
      { id: "embeddings", label: "Embeddings" },
      { id: "agents", label: "Agents" },
    ],
  },
  {
    id: "infra",
    layer: "Infrastructure",
    items: [
      { id: "redis", label: "Redis" },
      { id: "pipelines", label: "Queues / cron" },
      { id: "deploy", label: "Vercel / APIs" },
    ],
  },
];

export const mapLayers = [
  { id: "input", label: "Input", hint: "PDFs, Telegram, forms, APIs" },
  { id: "data", label: "Data", hint: "SQLite, Supabase, sessions" },
  { id: "process", label: "Processing", hint: "Celery, Redis, regex, OCR" },
  { id: "intel", label: "Intelligence", hint: "RAG, embeddings, Gemini, OpenAI" },
  { id: "action", label: "Action", hint: "notify, stream, book, write" },
  { id: "product", label: "Product", hint: "Next.js / React UI, live URL" },
];

export const about = {
  kicker: "About",
  statement:
    "I ship a working slice in seven days. You keep the URL and the repo. I would rather decline a ticket than fake a week of strategy.",
  facts: [
    { k: "Based", v: "India · IST · US morning overlap" },
    { k: "Availability", v: "Select product sprints · 30+ hrs" },
    { k: "Engagement", v: "$1,500–$4,000 fixed · 50% escrow" },
    { k: "Hourly", v: "$60–$80 if the work cannot be fixed" },
  ],
  take: [
    "Next.js / React MVP",
    "RAG over your docs or PDFs",
    "Agent or site chat on your data",
    "Internal dashboard / admin",
    "Scrape → parse → notify pipelines",
  ],
  skip: [
    "ManyChat, GHL, Zapier-only clicking",
    "$100 any-HTML tasks",
    "Unpaid trials or “build me Uber”",
    "Six-month hire-an-employee posts",
  ],
};

export const contact = {
  kicker: "Contact",
  title: "Have a system worth building?",
  lede: "Open the job. Send the stack. I’ll answer in five lines with what ships in week one.",
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
]);

export const githubFeatured = new Set(projects.flatMap((p) => p.links.map((l) => l.href.split("/").pop())));
