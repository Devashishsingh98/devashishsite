export const profile = {
  name: "Devashish Singh",
  short: "DS",
  role: "AI engineer · full-stack systems · product builder",
  location: "India · IST",
  overlap: "US morning overlap",
  availability: "Open for a few projects",
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
  { id: "capabilities", label: "What I do" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  kicker: "Websites · AI tools · products you can click",
  title: ["I build working", "products you", "can use."],
  lede:
    "I make web apps in seven days — chat that reads your files, dashboards, booking tools. You get a live website and the code. Fixed price. No slide decks.",
  primary: { label: "See my work", href: "#work" },
  secondary: { label: "Let’s talk", href: "#contact" },
};

export const intro = {
  kicker: "How I work",
  statement:
    "I don’t just plug in ChatGPT. I build the whole product around it — the screens people use, the data behind them, and the parts that have to work every day.",
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
    category: "Reading helper",
    title: "PDF Lens",
    line: "Highlight a sentence in a PDF. Get a clear answer without losing your place.",
    purpose:
      "A real app for talking to your documents. Ask it to explain, teach, give an example, or show code. Optional Chrome add-on. Not just a ChatGPT window.",
    visual: "/media/pdf-lens-home.jpg",
    visualAlt: "PDF Lens workspace with a highlighted paper and nested answers",
    stack: ["React", "Vite", "Express", "OpenAI / OpenRouter", "pdf.js", "SQLite", "local embeddings"],
    techs: ["rag", "react", "node", "embeddings"],
    links: [{ label: "GitHub", href: "https://github.com/Devashishsingh98/pdf-lens" }],
  },
  {
    id: "jobs",
    num: "02",
    category: "Automation",
    title: "Job notification extractor",
    line: "Job posts come in from Telegram. Matching jobs go out — on a schedule.",
    purpose:
      "Reads messy job posts, pulls out the facts, checks if you qualify, and sends you a message. Runs every 15 minutes. Has a simple admin screen.",
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
    category: "Study tool",
    title: "StudyHelper",
    line: "Highlight a paragraph, pick a point of view, get an answer in the same panel.",
    purpose:
      "A study app for exams. Follow-up questions stay on screen. If the page is a photo of text, it can still read it.",
    visual: null,
    stack: ["React", "FastAPI", "SSE", "Tesseract", "Zustand", "pdf.js"],
    techs: ["rag", "fastapi", "python", "react"],
    links: [{ label: "GitHub", href: "https://github.com/Devashishsingh98/studyhelper" }],
  },
  {
    id: "commerce-chat",
    num: "04",
    category: "Shop and chat",
    title: "Commerce + live chat",
    line: "An online shop with a cart. A live chat room.",
    purpose:
      "Older work, still real: login, shopping cart, and live chat. Useful when you need a store or chat — not another landing page.",
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
    id: "intelligence",
    layer: "AI",
    line: "Chat that can read your files and answer from them.",
    techs: ["rag", "embeddings", "agents"],
  },
  {
    id: "systems",
    layer: "Behind the scenes",
    line: "The parts that run on a schedule and keep data moving.",
    techs: ["fastapi", "redis", "pipelines", "python"],
  },
  {
    id: "product",
    layer: "The website",
    line: "The screens people click: login, admin, a live site.",
    techs: ["react", "next", "node"],
  },
  {
    id: "automation",
    layer: "Automation",
    line: "Take incoming messages, sort them, and send the right alert.",
    techs: ["pipelines", "python", "redis"],
  },
];

export const mapLayers = [
  { id: "input", label: "Files in", hint: "PDFs, messages, and forms come in.", x: 10, y: 68, to: ["data"] },
  { id: "data", label: "Saved", hint: "The information is stored.", x: 26, y: 30, to: ["process"] },
  { id: "process", label: "Sorted", hint: "It gets cleaned up and run on a schedule.", x: 46, y: 58, to: ["intel"] },
  { id: "intel", label: "AI reads", hint: "AI reads it and decides what it means.", x: 62, y: 22, to: ["action"] },
  { id: "action", label: "Action", hint: "Send a message, show an answer, or book a time.", x: 80, y: 52, to: ["product"] },
  { id: "product", label: "Live site", hint: "The website people actually click.", x: 94, y: 28, to: [] },
];

export const about = {
  kicker: "About",
  statement:
    "I deliver a working first version in seven days. You keep the website and the code. I’d rather say no than pretend a week of planning is the work.",
  facts: [
    { k: "Based", v: "India. Mornings overlap with the US." },
    { k: "Time", v: "Open for a few projects. 30+ hours a week." },
    { k: "Price", v: "$1,500–$4,000 fixed. Half up front on Upwork." },
    { k: "Hourly", v: "$60–$80 if the job can’t be a fixed price." },
  ],
  take: [
    "A new web app",
    "Chat that answers from your PDFs or docs",
    "A bot or chat on your website",
    "A dashboard for your team",
    "Take data in, clean it, send alerts",
  ],
  skip: [
    "Only clicking buttons in ManyChat, GoHighLevel, or Zapier",
    "Tiny $100 HTML jobs",
    "Unpaid trials or “build me Uber”",
    "A full-time hire for six months",
  ],
};

export const contact = {
  kicker: "Contact",
  title: "Have something worth building?",
  lede: "Tell me what you need. I’ll reply in five lines with what you’ll have in week one.",
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
