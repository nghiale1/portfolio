export type Project = {
  slug: string;
  index: number;
  category: string;
  channel: string;
  title: string;
  handle: string;
  accent: string;
  summary: string;
  poster: string;
  preview: string;
  link?: string;
  objective: string;
  role: string;
  tools: string[];
  result: string;
  tags: string[];
  about: string[];
  highlights: string[];
};

// Chỉ dùng thông tin thật, có thể kiểm chứng. Không bịa số liệu. Kết quả chung
// của hệ thống (30–50 video/ngày, 1.000+ đơn/tháng trên 3 kênh) là thật.
export const projects: Project[] = [
  {
    slug: "food",
    index: 0,
    category: "Tiếp thị liên kết TikTok",
    channel: "Ẩm thực",
    title: "Ẩm Thực",
    handle: "@taphoa.baoanngon",
    accent: "#f0b066",
    summary: "Video ngắn ẩm thực & tạp hóa, dựng để chốt đơn affiliate.",
    poster: "/posters/food.jpg",
    preview: "/previews/food.mp4",
    link: "https://www.tiktok.com/@taphoa.baoanngon",
    objective:
      "Biến sản phẩm ẩm thực, tạp hóa thành video hook-first — kéo người xem từ lướt sang mua chỉ trong vài giây.",
    role: "Sản xuất · Nghiên cứu sản phẩm · Tạo hình ảnh & video bằng AI · Dựng",
    tools: ["ChatGPT", "Grok", "Gemini", "CapCut"],
    result:
      "Thuộc hệ thống 3 kênh sản xuất 30–50 video/ngày và mang về 1.000+ đơn mỗi tháng.",
    tags: ["Video ngắn", "Video AI", "Affiliate", "Ẩm thực"],
    about: [
      "Kênh affiliate ngành ẩm thực và tạp hóa, nơi mỗi video được dựng quanh một hook sản phẩm và một cú chốt nhanh, kích thích nhu cầu mua ngay.",
      "Toàn bộ quy trình có AI hỗ trợ từ đầu đến cuối: nghiên cứu và chọn góc bán, sinh hình ảnh bằng prompt, rồi qua một bước dựng và kiểm soát chất lượng của con người trước khi đăng.",
    ],
    highlights: [
      "Đăng đều mỗi ngày với tần suất cao",
      "Cấu trúc hook-first nhắm đúng ý định mua hàng",
      "Bộ khung kịch bản dùng lại được cho từng nhóm sản phẩm",
    ],
  },
  {
    slug: "fashion",
    index: 1,
    category: "Tiếp thị liên kết TikTok",
    channel: "Thời trang",
    title: "Thời Trang",
    handle: "@nome.nome2026",
    accent: "#e878aa",
    summary: "Nội dung thời trang với hình ảnh AI và concept bám trend.",
    poster: "/posters/fashion.jpg",
    preview: "/previews/fashion.mp4",
    link: "https://www.tiktok.com/@nome.nome2026",
    objective:
      "Giữ kênh thời trang bám trend và ra video đều đặn mà không cần ekip quay dựng — mỗi concept gắn với một sản phẩm và một góc bán.",
    role: "Sản xuất · Lên concept · Hình ảnh AI · Dựng",
    tools: ["ChatGPT", "Gemini", "Grok", "CapCut"],
    result:
      "Thuộc hệ thống 3 kênh sản xuất 30–50 video/ngày và mang về 1.000+ đơn mỗi tháng.",
    tags: ["Video ngắn", "Hình ảnh AI", "Affiliate", "Thời trang"],
    about: [
      "Kênh affiliate thời trang dựa trên các concept bám trend và hình ảnh do AI hỗ trợ, giúp nội dung luôn mới mà không cần một ekip sản xuất đầy đủ.",
      "Mỗi concept đều được gắn với một sản phẩm và một mục tiêu chuyển đổi trước khi bắt tay vào tạo hình.",
    ],
    highlights: [
      "Định hướng concept và hình ảnh cho mỗi đợt sản phẩm",
      "Kết hợp hình ảnh AI với cách trình bày sản phẩm thật",
      "Theo dõi trend để nuôi hàng đợi nội dung",
    ],
  },
  {
    slug: "home",
    index: 2,
    category: "Tiếp thị liên kết TikTok",
    channel: "Gia dụng",
    title: "Gia Dụng",
    handle: "@nome_nome26",
    accent: "#6ed6c4",
    summary: "Nội dung gia dụng sản xuất đều đặn mỗi ngày ở số lượng lớn.",
    poster: "/posters/home.jpg",
    preview: "/previews/home.mp4",
    link: "https://www.tiktok.com/@nome_nome26",
    objective:
      "Trình bày công năng đồ gia dụng thật rõ ràng, sản xuất số lượng lớn mỗi ngày mà chất lượng không tụt.",
    role: "Sản xuất · Nghiên cứu · Tạo bằng AI · Xuất bản",
    tools: ["ChatGPT", "Grok", "Gemini", "CapCut"],
    result:
      "Thuộc hệ thống 3 kênh sản xuất 30–50 video/ngày và mang về 1.000+ đơn mỗi tháng.",
    tags: ["Video ngắn", "Video AI", "Affiliate", "Gia dụng"],
    about: [
      "Kênh affiliate đồ gia dụng vận hành trên cùng một quy trình đã được hệ thống hóa: nghiên cứu, chọn góc, sản xuất bằng AI, xuất bản — mỗi ngày.",
      "Trọng tâm là sự ổn định và số lượng, nhưng vẫn giữ được độ rõ ràng khi trình bày công năng sản phẩm.",
    ],
    highlights: [
      "Sản xuất số lượng lớn mà chất lượng không trôi",
      "Dựng theo hướng minh họa công năng cho sản phẩm tiện ích",
      "Dùng chung bộ khung sản xuất với cả ba kênh",
    ],
  },
  {
    slug: "workflow",
    index: 3,
    category: "Hệ thống sản xuất",
    channel: "Hệ thống",
    title: "Cỗ Máy Nội Dung",
    handle: "Quy trình nội dung AI",
    accent: "#c6f24e",
    summary: "Hệ thống bán tự động đẩy ra 30–50 video mỗi ngày.",
    poster: "/posters/workflow.jpg",
    preview: "/previews/workflow.mp4",
    objective:
      "Đưa một sản phẩm đi hết một quy trình lặp lại để thành video hoàn chỉnh, sẵn sàng đăng — và mở rộng được cho nhiều kênh.",
    role: "Tự thiết kế & xây dựng",
    tools: ["Prompt engineering", "API / JSON", "Tự động hóa", "CapCut"],
    result:
      "Duy trì 30–50 video/ngày trên 3 kênh, với các bước chuyển giao tự động giữa từng công đoạn.",
    tags: ["Tự động hóa", "Prompt", "Hệ thống", "Quy trình"],
    about: [
      "Hệ thống sản xuất phía sau ba kênh: một quy trình lặp lại biến sản phẩm thành video ngắn hoàn chỉnh, sẵn sàng xuất bản.",
      "Nó đến từ nền tảng kỹ sư phần mềm — những công đoạn lặp lại được tự động hóa, còn con người giữ phần quyết định sáng tạo và chất lượng.",
    ],
    highlights: [
      "30–50 video được sản xuất mỗi ngày",
      "Chuyển giao tự động giữa các công đoạn",
      "Thiết kế để mở rộng cho nhiều kênh",
    ],
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
