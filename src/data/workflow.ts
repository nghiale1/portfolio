export type Stage = {
  n: string;
  title: string;
  desc: string;
};

// Một video hoàn chỉnh được tách thành mười công đoạn sản xuất này.
export const stages: Stage[] = [
  { n: "01", title: "Nghiên cứu sản phẩm", desc: "Chọn sản phẩm đáng quay và tìm góc bán khiến người xem muốn mua." },
  { n: "02", title: "Hiểu khán giả", desc: "Xác định ai đang mua và điều gì khiến họ dừng lướt." },
  { n: "03", title: "Câu mở (Hook)", desc: "Thiết kế một giây đầu để video sống sót giữa dòng đề xuất." },
  { n: "04", title: "Kịch bản", desc: "Dựng nhịp nội dung gọn, xoay quanh đúng thời điểm chốt đơn." },
  { n: "05", title: "Viết prompt", desc: "Soạn prompt chuẩn cho mô hình tạo ảnh và tạo video." },
  { n: "06", title: "Tạo bằng AI", desc: "Sinh hình ảnh và cảnh quay bằng ChatGPT, Gemini, Grok." },
  { n: "07", title: "Dựng phim", desc: "Ghép cảnh, canh nhịp và chọn nhạc bắt trend." },
  { n: "08", title: "Kiểm soát chất lượng", desc: "Soát chất lượng và an toàn thương hiệu trước khi đăng." },
  { n: "09", title: "Xuất bản", desc: "Đăng theo lịch, tần suất cao, trên nhiều kênh." },
  { n: "10", title: "Đánh giá hiệu quả", desc: "Đọc số liệu, rút kinh nghiệm, đưa lại vào khâu nghiên cứu." },
];
