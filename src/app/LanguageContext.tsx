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
    home: "Home",
    featuredProjects: "Featured Projects",
    otherProjects: "Other Projects",
    welcome: "Welcome to My Portfolio",
    description:
      "I'm a passionate developer building amazing things with Next.js and more.",
    aboutMe: "About Me",
    aboutDescription:
      "I'm a full-stack developer with 5+ years of experience in web technologies. Passionate about clean code, user experience, and innovative solutions.",
    skills: "Skills",
    featuredPreview: "Featured Projects Preview",
    viewProjects: "View Projects",
    seeAllFeatured: "See All Featured",
    footerRights: "© 2025 Your Name. All rights reserved.",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    confirmOpen: "Do you want to open this link in a new tab?",
    ok: "OK",
    cancel: "Cancel",
  },
  vi: {
    home: "Trang Chủ",
    featuredProjects: "Dự Án Nổi Bật",
    otherProjects: "Dự Án Khác",
    welcome: "Chào Mừng Đến Với Portfolio Của Tôi",
    description:
      "Tôi là một lập trình viên đam mê xây dựng những thứ tuyệt vời với Next.js và hơn thế nữa.",
    aboutMe: "Về Tôi",
    aboutDescription:
      "Tôi là lập trình viên full-stack với hơn 5 năm kinh nghiệm trong công nghệ web. Đam mê code sạch, trải nghiệm người dùng và giải pháp sáng tạo.",
    skills: "Kỹ Năng",
    featuredPreview: "Xem Trước Dự Án Nổi Bật",
    viewProjects: "Xem Dự Án",
    seeAllFeatured: "Xem Tất Cả Nổi Bật",
    footerRights: "© 2025 Tên Của Bạn. Tất cả quyền được bảo lưu.",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    confirmOpen: "Bạn có muốn mở liên kết này trong tab mới không?",
    ok: "OK",
    cancel: "Hủy",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) =>
    translations[language][key as keyof typeof translations.en] || key

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
