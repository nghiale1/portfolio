export type CareerNode = {
  year: string;
  org: string;
  role: string;
  desc: string;
};

// SCENE 7 — Software-engineering background as the infrastructure underneath.
export const career: CareerNode[] = [
  {
    year: "2021–2023",
    org: "Otanics",
    role: "Business Analyst / Software",
    desc: "IoT & aquaculture software. Digitised manual workflows into systems.",
  },
  {
    year: "2023–2024",
    org: "Care Connect Vietnam",
    role: "Software Engineer",
    desc: "Rebuilt a healthcare comms system on AWS — Lambda, AppSync, DynamoDB.",
  },
  {
    year: "2025",
    org: "Flash Lex",
    role: "Full-stack (solo)",
    desc: "Solo build: data crawling, REST API, text-to-speech integration.",
  },
  {
    year: "2025 — now",
    org: "AI Content Studio",
    role: "AI Content Producer",
    desc: "Three self-built TikTok Affiliate channels, AI production at scale.",
  },
];
