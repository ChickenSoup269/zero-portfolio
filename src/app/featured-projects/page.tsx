"use client"

import { useLanguage } from "@/app/LanguageContext"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/lib/projectsData" // Sử dụng dữ liệu tập trung

export default function FeaturedProjects() {
  const { t } = useLanguage()
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Lớp nền lưới */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute -bottom-1/3 left-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-primary/20 opacity-20 blur-[120px]"></div>
      <div className="absolute -top-1/4 right-0 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-purple-500/10 opacity-20 blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {t("allProjectsTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("allProjectsDesc")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
        >
          {projectsData.map((project) => (
            <motion.div key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="block">
                <Card className="group relative h-65  w-full overflow-hidden rounded-xl border-2 border-transparent hover:border-primary/50 shadow-lg transition-all duration-300 cursor-pointer">
                  {/* Lớp ảnh nền */}
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />

                  {/* Lớp phủ Gradient cố định ở dưới */}
                  <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                  {/* Nội dung Text cố định */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                      {t(project.title)}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2 drop-shadow">
                      {t(project.description)}
                    </p>
                  </div>

                  {/* Nút và thông tin hiện ra khi hover */}

                  <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-6 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <div className="text-center">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-2xl font-bold text-white mb-6"
                      >
                        {t(project.title)}
                      </motion.h3>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full sm:w-40 text-base sm:text-lg px-6 py-3 border-2 border-white text-white bg-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 pointer-events-none"
                        >
                          {t("details")}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
