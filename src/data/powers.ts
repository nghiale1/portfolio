export type Power = {
  key: "creative" | "commercial" | "technical";
  title: string;
  motion: string;
  items: string[];
};

// Ba lớp phân tích trên cùng một dự án thật: Sáng tạo, Thương mại, Kỹ thuật.
export const powers: Power[] = [
  {
    key: "creative",
    title: "Sáng tạo",
    motion: "flowing",
    items: [
      "Tạo hình ảnh bằng AI (ChatGPT, Gemini, Grok)",
      "Dựng video & xử lý chuyển động",
      "Kể chuyện theo định dạng video ngắn",
      "Định hướng concept & phong cách hình ảnh",
    ],
  },
  {
    key: "commercial",
    title: "Thương mại",
    motion: "pulsing",
    items: [
      "Xây hook & góc tiếp cận sản phẩm",
      "Nghiên cứu sản phẩm và nhu cầu người mua",
      "Cấu trúc nội dung hướng tới chuyển đổi",
      "Đọc số liệu hiệu suất để điều chỉnh",
    ],
  },
  {
    key: "technical",
    title: "Kỹ thuật",
    motion: "structured",
    items: [
      "Tư duy hệ thống từ nền tảng kỹ sư",
      "Làm việc với API & dữ liệu JSON",
      "Tự động hóa các công đoạn lặp lại",
      "Chuẩn hóa quy trình để sản xuất ổn định",
    ],
  },
];

export const powersStatement =
  "THỰC THI SÁNG TẠO. TƯ DUY THƯƠNG MẠI. MỞ RỘNG BẰNG HỆ THỐNG.";
