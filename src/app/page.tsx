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
import {
  ArrowRight,
  Code,
  Terminal,
  Cpu,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"

// Import Context
import { useLanguage } from "@/app/LanguageContext"

// IMPORT ICONS
import { FaReact, FaNodeJs, FaDocker, FaJava, FaGitAlt } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiSpring,
} from "react-icons/si"

// Variants Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}
const fadeIn = {
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
    { name: "Java", icon: FaJava, color: "text-red-500" },
    { name: "Spring", icon: SiSpring, color: "text-green-500" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-500" },
    { name: "Prisma", icon: SiPrisma, color: "text-teal-600" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Docker", icon: FaDocker, color: "text-blue-500" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
  ]

  const previewProjects = [
    {
      title: "E-Commerce Platform",
      desc: t("projEcommerce"), // Dùng t()
      icon: <Code className="h-6 w-6 text-blue-500" />,
      tags: ["Next.js", "Stripe", "Prisma"],
    },
    {
      title: "Task Management",
      desc: t("projTask"), // Dùng t()
      icon: <Terminal className="h-6 w-6 text-green-500" />,
      tags: ["React", "dnd-kit", "Socket.io"],
    },
    {
      title: "AI Chat Assistant",
      desc: t("projChat"), // Dùng t()
      icon: <Cpu className="h-6 w-6 text-purple-500" />,
      tags: ["OpenAI", "Tailwind", "Vercel SDK"],
    },
  ]

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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500">
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                <Link href="https://github.com/ChickenSoup269" target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="mailto:contact@example.com">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="#">
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
            <img
              src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop"
              alt="Coding Workspace"
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
            {previewProjects.map((proj, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-primary/50">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      {proj.icon}
                    </div>
                    <CardTitle className="text-xl">{proj.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {proj.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {proj.tags &&
                        proj.tags.map((tag, i) => (
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
                      <Link href="/featured-projects">
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
