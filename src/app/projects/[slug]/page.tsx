import Link from "next/link"
import { notFound } from "next/navigation"
import ProjectClientUI from "./ProjectClientUI"

// 1. DỮ LIỆU GIẢ LẬP (ĐÃ CẬP NHẬT TECH STACK CHUẨN THEO GITHUB)
/* eslint-disable @typescript-eslint/no-explicit-any */
const projectsData: Record<string, any> = {
  "bookmark-manager": {
    title: "Zero Bookmark Manager",
    description:
      "Extension quản lý bookmark thông minh thay thế trình quản lý mặc định.",
    imageUrl:
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/1.png?raw=true",
    // Cập nhật Tech Stack: React + Vite + TS là chuẩn cho Extension hiện đại
    techStack: ["HTML", "CSS", "JavaScript"],
    content:
      "Một tiện ích mở rộng (Extension) giúp người dùng quản lý hàng nghìn bookmark một cách hiệu quả. Dự án tập trung vào trải nghiệm người dùng với giao diện đẹp mắt, tốc độ tìm kiếm cực nhanh và khả năng tùy biến cao.",
    features: [
      "Tìm kiếm Fuzzy Search (gõ sai vẫn ra kết quả)",
      "Kéo thả (Drag & Drop) để sắp xếp thư mục",
      "Chế độ Dark/Light Mode tự động",
      "Đồng bộ dữ liệu thời gian thực",
      "Import/Export dữ liệu JSON an toàn",
    ],
    githubUrl: "https://github.com/ChickenSoup269/bookmark-manager",
    videoId: "3mcsG_p_j7s",
    gallery: [
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/2.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/3.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/feature/search.png?raw=true",
    ],
  },
  "zero-movie": {
    title: "Zero Movie Theater",
    description: "Hệ thống đặt vé xem phim trực tuyến toàn diện (MERN Stack).",
    imageUrl:
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/trangchinh.png",
    // Cập nhật Tech Stack: MERN Stack + Socket.io + Ant Design
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "Ant Design",
      "Socket.io",
      "Tailwind CSS",
    ],
    content:
      "Dự án tốt nghiệp mô phỏng hoàn chỉnh quy trình hoạt động của rạp chiếu phim. Bao gồm Client Side cho khách hàng đặt vé và Admin Dashboard để quản lý phim, suất chiếu và doanh thu.",
    features: [
      "Đặt vé và giữ ghế Realtime (Socket.io)",
      "Thanh toán tích hợp (PayPal Sandbox)",
      "Gửi vé điện tử qua Email (Nodemailer)",
      "Admin Dashboard: Quản lý Phim, Lịch chiếu, User",
      "Thống kê doanh thu bằng biểu đồ",
    ],
    githubUrl: "https://github.com/ChickenSoup269/Zero_Movie",
    liveUrl: "https://zero-movie-fe-v2.onrender.com/",
    videoId: "Hv5FI1u5by8",
    gallery: [
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/datve.png",
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/admin.png",
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/chitiet.png",
    ],
  },
  "steam-clone": {
    title: "SteamClone",
    description: "Bản sao giao diện và chức năng của nền tảng Steam.",
    imageUrl:
      "https://github.com/ChickenSoup269/SteamClone/raw/master/Screenshot/Screenshot%202024-07-25%20203434.png",
    // Cập nhật Tech Stack: React + Tailwind + Redux
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    content:
      "Website thương mại điện tử chuyên về game, tái hiện lại giao diện người dùng (UI/UX) phức tạp của Steam. Hệ thống cho phép xem chi tiết game, thêm vào giỏ hàng và quản lý thư viện game cá nhân.",
    features: [
      "Authentication (Đăng nhập/Đăng ký)",
      "Giỏ hàng & Wishlist",
      "Tìm kiếm và lọc game theo thể loại",
      "Giao diện Responsive tương thích Mobile",
      "Bình luận và đánh giá game",
    ],
    githubUrl: "https://github.com/ChickenSoup269/SteamClone",
    videoId: "zZd_RgvPfic",
    gallery: [
      "https://github.com/ChickenSoup269/SteamClone/raw/master/Screenshot/Screenshot%202024-07-25%20203531.png",
      "https://github.com/ChickenSoup269/SteamClone/raw/master/Screenshot/Screenshot%202024-07-25%20203610.png",
    ],
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

// --- SERVER COMPONENT (Main Entry) ---
export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const project = projectsData[slug]

  if (!project) {
    return notFound()
  }

  return <ProjectClientUI project={project} />
}
