import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lê Minh Nghĩa — Nhà sản xuất nội dung AI",
  description:
    "Nhà sản xuất nội dung AI với nền tảng kỹ sư phần mềm. Ba kênh TikTok Affiliate, 30–50 video AI mỗi ngày, 1.000+ đơn mỗi tháng.",
  icons: { icon: "/lmn-mark.svg" },
  openGraph: {
    title: "Lê Minh Nghĩa — Nhà sản xuất nội dung AI",
    description:
      "Ba kênh nội dung. Một hệ thống sản xuất có thể mở rộng — xây trên nền tảng kỹ sư phần mềm.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
