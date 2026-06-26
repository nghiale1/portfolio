export type Metric = {
  value: string;
  label: string;
  sub: string;
};

// SCENE 2 — verified proof, shown as labels wired to the Core (not dashboard cards).
export const metrics: Metric[] = [
  { value: "5+", label: "Years software engineering", sub: "Systems · APIs · automation" },
  { value: "3", label: "TikTok Affiliate channels", sub: "Food · Fashion · Home" },
  { value: "30–50", label: "Videos produced / day", sub: "AI-assisted production" },
  { value: "1,000+", label: "Orders / month", sub: "Via affiliate model" },
];
