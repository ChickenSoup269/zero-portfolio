"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  ArrowRight,
  Code,
  Terminal,
  Cpu,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import Image from "next/image"
import aboutImage from "./image/about.png"
// Import Context
import { useLanguage } from "@/app/LanguageContext"
import { projectsData } from "@/lib/projectsData"
// IMPORT ICONS
import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiSpring,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si"

// Variants Animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function Home() {
  const { t } = useLanguage() // Gọi hook useLanguage

  // Move data inside component to use translation "t"
  const skills = [
    { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
    { name: "React", icon: FaReact, color: "text-blue-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    { name: "HTML", icon: SiHtml5, color: "text-orange-600" },
    { name: "CSS", icon: SiCss3, color: "text-blue-600" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Docker", icon: FaDocker, color: "text-blue-500" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "GitHub", icon: Github, color: "text-gray-800 dark:text-white" },
  ]

  const featuredProjects = projectsData.filter((p) => p.featured)

  const handleScrollToFooter = () => {
    const footerElement = document.getElementById("footer-section")
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="overflow-hidden bg-background min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-8 inline-block"
          >
            <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-purple-500 shadow-xl">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/95624468?v=4"
                  alt="ChickenSoup269"
                />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            {t("hiIm")}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient">
              ChickenSoup
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {t("role")}
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base md:text-lg text-muted-foreground/80 mb-10 max-w-xl mx-auto"
          >
            {t("heroDesc")}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="text-lg px-8 rounded-full shadow-lg"
              asChild
            >
              <Link href="/featured-projects">{t("viewProjects")}</Link>
            </Button>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="#" target="_blank" onClick={handleScrollToFooter}>
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="#" onClick={handleScrollToFooter}>
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="#" onClick={handleScrollToFooter}>
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SKILLS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              {t("techStack")}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              {t("techStackDesc")}
            </motion.p>

            <div className="flex flex-wrap justify-center gap-6">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-background border shadow-sm hover:shadow-lg transition-all w-28 md:w-32 hover:-translate-y-2 cursor-default group"
                >
                  <skill.icon
                    className={`h-10 w-10 ${skill.color} transition-transform group-hover:scale-110`}
                  />
                  <span className="font-medium text-sm text-foreground/80">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-muted group">
            <Image
              src={aboutImage}
              alt="About Section Image"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            {t("whoAmI")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">{t("aboutMe")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("aboutDesc1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("aboutDesc2")}
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col p-4 bg-muted/50 rounded-xl border">
              <span className="text-3xl font-bold text-primary">15+</span>
              <span className="text-sm text-muted-foreground">
                {t("repositories")}
              </span>
            </div>
            <div className="flex flex-col p-4 bg-muted/50 rounded-xl border">
              <span className="text-3xl font-bold text-primary">2+</span>
              <span className="text-sm text-muted-foreground">
                {t("yearsExp")}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("featuredTitle")}</h2>
              <p className="text-muted-foreground max-w-2xl">
                {t("featuredSubtitle")}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/ChickenSoup269"
                target="_blank"
                className="flex items-center gap-2"
              >
                {t("viewGithub")} <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((proj, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl">{t(proj.title)}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {t(proj.description)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full group justify-between"
                      asChild
                    >
                      <Link href={`/projects/${proj.slug}`}>
                        {t("details")}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
