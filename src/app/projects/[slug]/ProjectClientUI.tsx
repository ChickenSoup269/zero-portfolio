"use client"

import { useLanguage } from "@/app/LanguageContext"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle2,
  Github,
  Globe,
  Youtube,
  ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Tag,
  Activity,
} from "lucide-react"
import Image from "next/image"

// Helper để lấy thông tin chi tiết dựa trên tên dự án
const getProjectMeta = (titleKey: string, t: (key: string) => string) => {
  if (titleKey.includes("Bookmark")) {
    return {
      year: "2026",
      type: t("metaBookmarkManagerType"),
      role: t("metaBookmarkManagerRole"),
      status: t("statusActive"),
    }
  }
  if (titleKey.includes("Movie")) {
    return {
      year: "2025",
      type: t("metaZeroMovieType"),
      role: t("metaZeroMovieRole"),
      status: t("statusCompleted"),
    }
  }
  if (titleKey.includes("Steam")) {
    return {
      year: "2024",
      type: t("metaSteamCloneType"),
      role: t("metaSteamCloneRole"),
      status: t("statusCompleted"),
    }
  }
  // Mặc định
  return {
    year: "2024",
    type: t("metaDefaultType"),
    role: t("metaDefaultRole"),
    status: t("statusCompleted"),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectClientUI({ project }: { project: any }) {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Lấy thông tin meta tự động
  const meta = getProjectMeta(project.title, t)

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* 1. BACKGROUND GRADIENTS & GRID (Z-Index thấp nhất) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Nút Back */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Button
            variant="ghost"
            asChild
            className="mb-8 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
          >
            <Link href="/featured-projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToProjects")}
            </Link>
          </Button>
        </motion.div>

        {/* 2. HEADER SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-5 gap-8 mb-12"
        >
          {/* Cột Ảnh Chính */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 rounded-2xl overflow-hidden border shadow-2xl aspect-video bg-muted group relative"
          >
            <Image
              src={project.imageUrl}
              alt={t(project.title)}
              width={800}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay nhẹ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>

          {/* Cột Thông Tin Header */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 flex flex-col justify-center space-y-6"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400">
                {t(project.title)}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t(project.description)}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xs text-foreground/60 uppercase tracking-widest mb-3">
                {t("techStack")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="px-3 py-1 text-sm bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {project.liveUrl && (
                <Button
                  className="w-full sm:flex-1 sm:w-auto shadow-lg shadow-primary/20"
                  asChild
                >
                  <Link href={project.liveUrl} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> {t("liveDemo")}
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="w-full sm:flex-1 sm:w-auto"
                  asChild
                >
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> {t("sourceCode")}
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="my-10 border-muted"
        />

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* CỘT TRÁI (LỚN) - Overview & Media */}
          <div className="md:col-span-2 space-y-12">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                {t("overview")}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground text-lg leading-8 text-justify">
                {t(project.content)}
              </div>
            </motion.section>

            {/* Video Demo */}
            {project.videoId && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-600" /> {t("videoDemo")}
                </h2>
                <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden border shadow-lg bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${project.videoId}`}
                    title="Project Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-blue-500" /> {t("gallery")}
                </h2>

                <div className="relative group/gallery w-full">
                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("gallery-container")
                      if (container)
                        container.scrollBy({ left: -300, behavior: "smooth" })
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all opacity-0 group-hover/gallery:opacity-100 disabled:opacity-0 translate-x-2"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div
                    id="gallery-container"
                    className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {project.gallery.map((img: string, idx: number) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(img)}
                        className="relative min-w-20 h-28 sm:min-w-[180px] sm:h-[120px] rounded-xl overflow-hidden border shadow-sm cursor-pointer snap-start bg-muted shrink-0"
                      >
                        <Image
                          src={img}
                          alt={`Gallery ${idx}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="text-white w-6 h-6 drop-shadow-md" />
                        </div>
                      </motion.div>
                    ))}
                    <div className="w-1 shrink-0" />
                  </div>

                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("gallery-container")
                      if (container)
                        container.scrollBy({ left: 300, behavior: "smooth" })
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all opacity-0 group-hover/gallery:opacity-100 -translate-x-2"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
                </div>
              </motion.section>
            )}
          </div>

          {/* CỘT PHẢI (SIDEBAR) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Features Card */}
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm md:sticky top-24">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 border-b pb-4">
                {t("keyFeatures")}
              </h3>
              <ul className="space-y-4">
                {project.features.map((featureKey: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {t(featureKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Details Card - ĐÃ CẬP NHẬT */}
            <div className="p-6 rounded-2xl border bg-muted/20">
              <h3 className="font-bold text-lg mb-4">{t("projectDetails")}</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {t("detailYear")}
                  </span>
                  <span className="font-medium">{meta.year}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Tag className="w-4 h-4" /> {t("detailType")}
                  </span>
                  <span className="font-medium text-right">{meta.type}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> {t("detailRole")}
                  </span>
                  <span className="font-medium">{meta.role}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Activity className="w-4 h-4" /> {t("detailStatus")}
                  </span>
                  <Badge
                    variant={
                      meta.status === t("statusCompleted")
                        ? "default"
                        : "secondary"
                    }
                  >
                    {meta.status}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL (ZOOM ẢNH) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50">
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full Preview"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-md"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
