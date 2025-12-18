/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

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

    // Featured Projects
    featuredTitle: "Featured Projects",
    featuredSubtitle:
      "Some highlighted projects I've worked on (Check my GitHub for more!).",
    viewGithub: "View GitHub",
    details: "Details",

    // Project Descriptions (Example)
    projEcommerce:
      "Full-stack online shopping platform with integrated payments.",
    projTask: "Realtime team task management app with drag-and-drop (Kanban).",
    projChat: "Smart chatbot using OpenAI API for automated support.",
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

    // Project Descriptions
    projEcommerce:
      "Nền tảng mua sắm trực tuyến full-stack với thanh toán tích hợp.",
    projTask: "Ứng dụng quản lý công việc nhóm realtime, kéo thả (Kanban).",
    projChat: "Chatbot thông minh sử dụng OpenAI API hỗ trợ trả lời tự động.",
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
