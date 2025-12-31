"use client"

import { useLanguage } from "@/app/LanguageContext"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  Github,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

// 1. DỮ LIỆU THẬT TỪ GITHUB REPOS
const allProjects = [
  {
    id: "React-Food-KFC",
    title: "React Food - KFC Clone",
    description:
      "Một ứng dụng web đặt đồ ăn, lấy cảm hứng từ giao diện của KFC, được xây dựng bằng React.",
    techStack: ["React", "JavaScript", "CSS", "Firebase"],
    githubUrl: "https://github.com/ChickenSoup269/React-Food-KFC",
    liveUrl: "https://react-food-kfc.web.app/",
    hasDetail: false,
  },
  {
    id: "Python-spending-note",
    title: "Python Spending Note",
    description:
      "Một công cụ dòng lệnh đơn giản để theo dõi chi tiêu cá nhân, được viết bằng Python.",
    techStack: ["Python"],
    githubUrl: "https://github.com/ChickenSoup269/Python-spending-note",
    liveUrl: null,
    hasDetail: false,
  },
  {
    id: "Spotify_Clone",
    title: "Spotify Clone",
    description:
      "Bản sao giao diện web của Spotify, cho phép người dùng duyệt và phát nhạc (sử dụng API của Spotify).",
    techStack: ["React", "JavaScript", "Spotify API", "Node.js"],
    githubUrl: "https://github.com/ChickenSoup269/Spotify_Clone",
    liveUrl: null,
    hasDetail: false,
  },
  {
    id: "ProjectAndroid1",
    title: "Netflix Android Project",
    description:
      "Một dự án Android cơ bản để giới thiệu về lập trình di động, thể hiện các tính năng cốt lõi.",
    techStack: ["Java", "Android"],
    githubUrl: "https://github.com/ChickenSoup269/ProjectAndroid1",
    liveUrl: null,
    hasDetail: false,
  },
  {
    id: "bot-discord",
    title: "Discord Bot",
    description:
      "Một bot tùy chỉnh cho Discord để tự động hóa các tác vụ và thêm chức năng mới cho máy chủ.",
    techStack: ["Python", "discord.py", "API"],
    githubUrl: "https://github.com/ChickenSoup269/bot-discord",
    liveUrl: null,
    hasDetail: false,
  },
  {
    id: "The-cofffee-1995",
    title: "The Coffee 1995",
    description:
      "Một trang web giới thiệu quán cà phê, được thiết kế theo phong cách cổ điển, sử dụng HTML, CSS và JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ChickenSoup269/The-cofffee-1995",
    liveUrl: null,
    hasDetail: false,
  },
  {
    id: "Blog-Coffe_HTML_CSS_JS",
    title: "Blog Coffee",
    description:
      "Một blog đơn giản về cà phê, được xây dựng với HTML, CSS và JavaScript cơ bản.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ChickenSoup269/Blog-Coffe_HTML_CSS_JS",
    liveUrl: null,
    hasDetail: false,
  },
]

const ITEMS_PER_PAGE = 6

export default function OtherProjects() {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)

  // 2. LOGIC PHÂN TRANG
  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProjects = allProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen flex flex-col">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("otherProjectsTitle")}</h1>
        <p className="text-muted-foreground">{t("otherProjectsDesc")}</p>
      </div>

      {/* 3. GRID PROJECTS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1"
        >
          {currentProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 group bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Folder className="w-6 h-6" />
                  </div>

                  <div className="flex gap-3 items-center">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>

                <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {project.hasDetail && (
                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-primary/5 px-2"
                    asChild
                  >
                    <Link href={`/projects/${project.id}`}>
                      <span className="text-sm">View Detail</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 4. THANH PHÂN TRANG (PAGINATION CONTROLS) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="w-32"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> {t("paginationPrevious")}
          </Button>

          <span className="text-sm font-medium text-muted-foreground">
            {t("paginationPage")}{" "}
            <span className="text-foreground font-bold">{currentPage}</span>{" "}
            {t("paginationOf")} {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="w-32"
          >
            {t("paginationNext")} <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
