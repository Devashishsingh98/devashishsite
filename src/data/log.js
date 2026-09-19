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
  { id: "job-1", time: "23:14", label: "Paper" },
  { id: "job-2", time: "00:20", label: "Clinic" },
  { id: "job-3", time: "01:50", label: "Lens" },
  { id: "file", time: "FILE", label: "File" },
  { id: "out", time: "07:00", label: "Out" },
];

export const jobs = [
  {
    id: "job-1",
    time: "23:14",
    ticket: "N-052 · LIVE",
    incoming: "A weekly Hindi paper needed a daily desk, not a Facebook page.",
    title: "SAT PATH",
    body: "Live newspaper site for Durg–Bhilai. Print stays Thursday. The web desk runs all week.",
    still: "/media/satpath.jpg",
    stillAlt: "SAT PATH homepage with Hindi masthead, e-paper, and local stories",
    stillKind: "page",
    tags: ["Next.js", "i18n", "Razorpay", "Vercel"],
    href: "https://satpath.in",
    hrefLabel: "Open satpath.in",
    did: [
      "Hindi-first site with a full English switch",
      "Sections, search, weather, Sensex and Nifty on the masthead",
      "Thursday e-paper plus a daily web desk",
      "Sign in, subscribe (₹49 / ₹499 via Razorpay), donate, advertise",
      "About, contact, grievance, and legal pages. Editor: Vibha Singh. RNI CHHHIN/2008/26619",
    ],
  },
  {
    id: "job-2",
    time: "00:20",
    ticket: "N-041 · LIVE",
    incoming: "A dentist needed a site patients could actually read.",
    title: "Dr. Ashisha Singh",
    body: "Live clinic site. Plain language, maps, contact. Not a template with stock teeth.",
    still: "/media/doctor-ashisha.jpg",
    stillAlt: "Live homepage for Dr. Ashisha Singh, dentist in Rajnandgaon",
    stillKind: "page",
    tags: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
    href: "https://doctorashishasingh.com",
    hrefLabel: "Open live site",
    did: [
      "Custom Next.js site on a real domain",
      "Services in plain words: crowns, bridges, dentures, implants",
      "Maps for GDC Raipur and CDCRI, plus a contact form",
      "SEO and structured data so the clinic can be found",
    ],
  },
  {
    id: "job-3",
    time: "01:50",
    ticket: "N-014 · TEST",
    incoming: "A paper that will not explain itself.",
    title: "PDF Lens",
    body: "Highlight one sentence. The answer stays on the page. Nested, not a chatbot in another tab.",
    still: "/media/pdf-lens-teach.png",
    stillAlt: "PDF Lens teach lens: highlight a sentence and get a nested explanation beside the page",
    tags: ["React", "Express", "pdf.js", "RAG", "local embeddings"],
    href: "https://pdflens.in",
    hrefLabel: "Under testing",
    status: "Under testing",
    did: [
      "PDF workspace: highlight, then Explain / Teach / Example / Code",
      "Nested answers stay open so you do not lose the thread",
      "RAG-style chat on the document. Repo is private while it is in testing",
    ],
  },
];

export const bench = [
  {
    crib: "Ship",
    tools: ["Next.js", "React", "TypeScript", "Node", "Vite", "Tailwind", "i18n", "HTML", "CSS"],
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
  take: "A product that has to exist in a week. A newspaper. A clinic site. Chat on your files.",
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
  "jobNotificationExtractor",
  "studyhelper",
]);

export const githubFeatured = new Set([
  "pdf-lens",
  ...jobs.flatMap((j) => [j.href, j.href2].filter(Boolean).map((h) => h.split("/").pop())),
]);
