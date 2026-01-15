/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const currentYear = new Date().getFullYear()

const translations = {
  en: {
    // Navbar
    home: "Home",
    featuredProjects: "Featured Projects",
    otherProjects: "Other Projects",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    githubProfile: "GitHub Profile",
    viewCV: "View CV",
    cvTitle: "Curriculum Vitae",
    cvDesc: "A summary of my skills and work experience.",

    // Hero Section
    hiIm: "Hi, I'm",
    role: "Full-stack Developer | Open Source Enthusiast",
    heroDesc:
      "I specialize in building modern, high-performance, and scalable web applications. Always exploring new technologies and sharing knowledge on GitHub.",
    viewProjects: "View Projects",

    // Tech Stack
    techStack: "Technology Stack",
    techStackDesc: "The toolkit I use to bring ideas to life.",

    // About Me
    aboutMe: "About Me",
    whoAmI: "Who I Am",
    aboutDesc1:
      "Hello! I'm ChickenSoup. I am passionate about programming and solving complex problems through code. On my personal GitHub, I frequently share open-source projects and learn from the community.",
    aboutDesc2:
      "I believe that 'Code is poetry' and always strive to write clean, maintainable, and optimized code. When not coding, I enjoy exploring system architecture and AI.",
    repositories: "Repositories",
    yearsExp: "Years Experience",

    // Featured Projects Page
    featuredTitle: "Featured Projects",
    featuredSubtitle:
      "Some highlighted projects I've worked on (Check my GitHub for more!).",
    viewGithub: "View GitHub",
    details: "Details",

    // Other Projects Page
    otherProjectsTitle: "Other Noteworthy Projects",
    otherProjectsDesc:
      "Open source projects, experiments, and other cool stuff.",
    paginationPrevious: "Previous",
    paginationPage: "Page",
    paginationOf: "of",
    paginationNext: "Next",
    allProjectsTitle: "All Projects",
    allProjectsDesc:
      "A collection of projects I've built, from web apps to browser extensions.",

    // Project Details Page UI
    backToProjects: "Back to Projects",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    overview: "Overview",
    videoDemo: "Video Demo",
    gallery: "Gallery",
    keyFeatures: "Key Features",
    projectDetails: "Project Details",
    detailYear: "Year",
    detailType: "Type",
    detailRole: "Role",
    detailStatus: "Status",
    statusActive: "Active / Maintaining",
    statusCompleted: "Completed",
    metaBookmarkManagerType: "Browser Extension",
    metaBookmarkManagerRole: "Solo Developer",
    metaZeroMovieType: "University Capstone",
    metaZeroMovieRole: "Frontend Lead",
    metaSteamCloneType: "UI Clone / Practice",
    metaSteamCloneRole: "Frontend Developer",
    metaDefaultType: "Personal Project",
    metaDefaultRole: "Fullstack Developer",

    // Project Specific Content
    projBookmarkManagerTitle: "Zero Bookmark Manager",
    projBookmarkManagerDesc:
      "An intelligent bookmark management extension to replace the default manager.",
    projBookmarkManagerContent:
      "A browser extension that helps users manage thousands of bookmarks efficiently. The project focuses on user experience with a beautiful interface, ultra-fast search speed, and high customizability.",
    projBookmarkManagerFeature1: "Fuzzy Search (finds results even with typos)",
    projBookmarkManagerFeature2: "Drag & Drop to organize folders",
    projBookmarkManagerFeature3: "Automatic Dark/Light Mode",
    projBookmarkManagerFeature4: "Real-time data synchronization",
    projBookmarkManagerFeature5: "Secure JSON data Import/Export",

    projZeroMovieTitle: "Zero Movie Theater",
    projZeroMovieDesc: "A comprehensive online movie ticket booking system (MERN Stack).",
    projZeroMovieContent:
      "A graduation project that completely simulates the operational flow of a movie theater. It includes a Client Side for customers to book tickets and an Admin Dashboard to manage films, showtimes, and revenue.",
    projZeroMovieFeature1: "Real-time seat booking and holding (Socket.io)",
    projZeroMovieFeature2: "Integrated payments (PayPal Sandbox)",
    projZeroMovieFeature3: "Send e-tickets via Email (Nodemailer)",
    projZeroMovieFeature4: "Admin Dashboard: Manage Movies, Showtimes, Users",
    projZeroMovieFeature5: "Revenue statistics with charts",

    projSteamCloneTitle: "SteamClone",
    projSteamCloneDesc:
      "A clone of the Steam platform's interface and functionality.",
    projSteamCloneContent:
      "An e-commerce website specializing in games, recreating the complex UI/UX of Steam. The system allows users to view game details, add to cart, and manage their personal game library.",
    projSteamCloneFeature1: "Authentication (Login/Register)",
    projSteamCloneFeature2: "Shopping Cart & Wishlist",
    projSteamCloneFeature3: "Search and filter games by genre",
    projSteamCloneFeature4: "Responsive design for mobile compatibility",
    projSteamCloneFeature5: "Comment and rate games",

    // Footer
    footerRights: `© ${currentYear} Trần Phước Thiện. All Rights Reserved.`,
    copied: "Copied!",
    builtWith: "Built with",
  },
  vi: {
    // Navbar
    home: "Trang Chủ",
    featuredProjects: "Dự Án Nổi Bật",
    otherProjects: "Dự Án Khác",
    language: "Ngôn Ngữ",
    theme: "Giao Diện",
    light: "Sáng",
    dark: "Tối",
    system: "Hệ Thống",
    githubProfile: "Hồ Sơ GitHub",
    viewCV: "Xem CV (My CV)",
    cvTitle: "Sơ Yếu Lý Lịch",
    cvDesc: "Bản tóm tắt kỹ năng và kinh nghiệm làm việc của tôi.",

    // Hero Section
    hiIm: "Xin chào, tôi là",
    role: "Lập trình viên Full-stack | Yêu thích Mã nguồn mở",
    heroDesc:
      "Tôi chuyên xây dựng các ứng dụng web hiện đại, hiệu năng cao và có khả năng mở rộng. Luôn tìm tòi công nghệ mới và chia sẻ kiến thức trên GitHub.",
    viewProjects: "Xem Dự Án",

    // Tech Stack
    techStack: "Công Nghệ Sử Dụng",
    techStackDesc: "Bộ công cụ tôi sử dụng để hiện thực hóa các ý tưởng.",

    // About Me
    aboutMe: "Về Tôi",
    whoAmI: "Tôi Là Ai",
    aboutDesc1:
      "Xin chào! Tôi là ChickenSoup. Tôi đam mê lập trình và giải quyết các vấn đề phức tạp thông qua code. Trên GitHub cá nhân, tôi thường xuyên chia sẻ các dự án mã nguồn mở và học hỏi từ cộng đồng.",
    aboutDesc2:
      "Tôi tin rằng 'Code là thơ' và luôn cố gắng viết code sạch, dễ bảo trì và tối ưu. Khi không code, tôi thích tìm hiểu về kiến trúc hệ thống và AI.",
    repositories: "Kho Chứa (Repos)",
    yearsExp: "Năm Kinh Nghiệm",

    // Featured Projects
    featuredTitle: "Dự Án Tiêu Biểu",
    featuredSubtitle:
      "Một số dự án tiêu biểu tôi đã thực hiện (Xem thêm trên GitHub!).",
    viewGithub: "Xem GitHub",
    details: "Chi Tiết",

    // Other Projects Page
    otherProjectsTitle: "Các Dự Án Đáng Chú Ý Khác",
    otherProjectsDesc:
      "Các dự án mã nguồn mở, experiments và những thứ thú vị khác.",
    paginationPrevious: "Trang Trước",
    paginationPage: "Trang",
    paginationOf: "trên",
    paginationNext: "Trang Kế",
    allProjectsTitle: "Tất Cả Dự Án",
    allProjectsDesc:
      "Tuyển tập các dự án tôi đã xây dựng, từ ứng dụng web đến tiện ích mở rộng trình duyệt.",

    // Project Details Page UI
    backToProjects: "Quay lại trang dự án",
    liveDemo: "Bản Demo",
    sourceCode: "Mã Nguồn",
    overview: "Tổng Quan",
    videoDemo: "Video Demo",
    gallery: "Thư Viện",
    keyFeatures: "Tính Năng Chính",
    projectDetails: "Chi Tiết Dự Án",
    detailYear: "Năm",
    detailType: "Loại",
    detailRole: "Vai Trò",
    detailStatus: "Trạng Thái",
    statusActive: "Đang hoạt động / Bảo trì",
    statusCompleted: "Đã hoàn thành",
    metaBookmarkManagerType: "Tiện ích mở rộng",
    metaBookmarkManagerRole: "Solo Developer",
    metaZeroMovieType: "Đồ án tốt nghiệp",
    metaZeroMovieRole: "Frontend Lead",
    metaSteamCloneType: "UI Clone / Luyện tập",
    metaSteamCloneRole: "Frontend Developer",
    metaDefaultType: "Dự án cá nhân",
    metaDefaultRole: "Fullstack Developer",

    // Project Specific Content
    projBookmarkManagerTitle: "Zero Bookmark Manager",
    projBookmarkManagerDesc:
      "Extension quản lý bookmark thông minh thay thế trình quản lý mặc định.",
    projBookmarkManagerContent:
      "Một tiện ích mở rộng (Extension) giúp người dùng quản lý hàng nghìn bookmark một cách hiệu quả. Dự án tập trung vào trải nghiệm người dùng với giao diện đẹp mắt, tốc độ tìm kiếm cực nhanh và khả năng tùy biến cao.",
    projBookmarkManagerFeature1: "Tìm kiếm Fuzzy Search (gõ sai vẫn ra kết quả)",
    projBookmarkManagerFeature2: "Kéo thả (Drag & Drop) để sắp xếp thư mục",
    projBookmarkManagerFeature3: "Chế độ Dark/Light Mode tự động",
    projBookmarkManagerFeature4: "Đồng bộ dữ liệu thời gian thực",
    projBookmarkManagerFeature5: "Import/Export dữ liệu JSON an toàn",

    projZeroMovieTitle: "Zero Movie Theater",
    projZeroMovieDesc: "Hệ thống đặt vé xem phim trực tuyến toàn diện (MERN Stack).",
    projZeroMovieContent:
      "Dự án tốt nghiệp mô phỏng hoàn chỉnh quy trình hoạt động của rạp chiếu phim. Bao gồm Client Side cho khách hàng đặt vé và Admin Dashboard để quản lý phim, suất chiếu và doanh thu.",
    projZeroMovieFeature1: "Đặt vé và giữ ghế Realtime (Socket.io)",
    projZeroMovieFeature2: "Thanh toán tích hợp (PayPal Sandbox)",
    projZeroMovieFeature3: "Gửi vé điện tử qua Email (Nodemailer)",
    projZeroMovieFeature4: "Admin Dashboard: Quản lý Phim, Lịch chiếu, User",
    projZeroMovieFeature5: "Thống kê doanh thu bằng biểu đồ",

    projSteamCloneTitle: "SteamClone",
    projSteamCloneDesc: "Bản sao giao diện và chức năng của nền tảng Steam.",
    projSteamCloneContent:
      "Website thương mại điện tử chuyên về game, tái hiện lại giao diện người dùng (UI/UX) phức tạp của Steam. Hệ thống cho phép xem chi tiết game, thêm vào giỏ hàng và quản lý thư viện game cá nhân.",
    projSteamCloneFeature1: "Authentication (Đăng nhập/Đăng ký)",
    projSteamCloneFeature2: "Giỏ hàng & Wishlist",
    projSteamCloneFeature3: "Tìm kiếm và lọc game theo thể loại",
    projSteamCloneFeature4: "Giao diện Responsive tương thích Mobile",
    projSteamCloneFeature5: "Bình luận và đánh giá game",

    // Footer
    footerRights: `© ${currentYear} Trần Phước Thiện. Mọi quyền được bảo lưu.`,
    copied: "Đã sao chép!",
    builtWith: "Xây dựng với",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
