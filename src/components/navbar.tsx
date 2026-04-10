"use client"

import * as React from "react"
import {
  Moon,
  Sun,
  FileText,
  User,
  CaseSensitive,
  Menu,
  Home,
  Star,
  List,
  Settings,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/app/LanguageContext"
import { useFont } from "@/app/FontContext"
import { useAnimation } from "@/app/AnimationContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import CV from "@/app/image/CV.png"
import logo from "@/app/image/logo2.png"

export default function Navbar() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { setFont } = useFont()
  const { setAnimation } = useAnimation()
  const pathname = usePathname()

  // Helper để check active state
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    if (path === "/featured-projects")
      return (
        pathname === "/featured-projects" || pathname?.startsWith("/projects/")
      )
    return pathname === path
  }

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 py-2.5 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={logo}
            alt="Zero Portfolio Logo"
            width={200}
            height={200}
            className="h-10 w-auto"
            priority
          />
          <span className="text-xl md:text-2xl font-bold bg-clip-text">
            Zero Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-2 px-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            asChild
            className="whitespace-nowrap h-10"
          >
            <Link href="/">{t("home")}</Link>
          </Button>
          <Button
            variant={isActive("/featured-projects") ? "default" : "ghost"}
            asChild
            className="whitespace-nowrap h-10"
          >
            <Link href="/featured-projects">{t("featuredProjects")}</Link>
          </Button>
          <Button
            variant={isActive("/other-projects") ? "default" : "ghost"}
            asChild
            className="whitespace-nowrap h-10"
          >
            <Link href="/other-projects">{t("otherProjects")}</Link>
          </Button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Select
            value={language}
            onValueChange={(value: "en" | "vi") => setLanguage(value)}
          >
            <SelectTrigger className="w-[130px] h-10 shadow-sm whitespace-nowrap overflow-visible">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shadow-sm cursor-pointer"
              >
                <CaseSensitive className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFont("default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFont("gohu")}>
                Gohu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shadow-sm cursor-pointer"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                {t("light")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                {t("dark")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("ocean")}>
                Ocean
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                {t("system")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shadow-sm cursor-pointer"
              >
                <Settings className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Animation</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setAnimation("none")}>
                      None
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnimation("rain")}>
                      Pixel Rain
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnimation("war")}>
                      Pixel War
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnimation("snake")}>
                      Pixel Snake
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full shadow-sm"
                >
                  <Avatar className="h-10 w-10 border transition-opacity hover:opacity-80 shadow-sm cursor-pointer">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/95624468?v=4"
                      alt="ChickenSoup"
                    />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      ChickenSoup
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      thientran01345@icloud.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/ChickenSoup269"
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("githubProfile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t("viewCV")}</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="max-w-3xl w-full h-[90vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b">
                <DialogTitle>{t("cvTitle")}</DialogTitle>
                <DialogDescription>{t("cvDesc")}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-auto bg-muted/20 p-4 flex items-center justify-center">
                <Image width={400} height={400} src={CV} alt="cv" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center shrink-0">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className={`flex items-center gap-3 ${isActive("/") ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <Home className="h-4 w-4" />
                    <span>{t("home")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/featured-projects"
                    className={`flex items-center gap-3 ${isActive("/featured-projects") ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <Star className="h-4 w-4" />
                    <span>{t("featuredProjects")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/other-projects"
                    className={`flex items-center gap-3 ${isActive("/other-projects") ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <List className="h-4 w-4" />
                    <span>{t("otherProjects")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/ChickenSoup269"
                    target="_blank"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    <span>{t("githubProfile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>{t("viewCV")}</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuLabel>Theme</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        {t("light")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        {t("dark")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("ocean")}>
                        Ocean
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        {t("system")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Language</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setLanguage("en")}>
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage("vi")}>
                        Tiếng Việt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Font</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setFont("default")}>
                        Default
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFont("gohu")}>
                        Gohu
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Animation</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setAnimation("none")}>
                        None
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAnimation("rain")}>
                        Pixel Rain
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAnimation("war")}>
                        Pixel War
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAnimation("snake")}>
                        Pixel Snake
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="max-w-3xl w-full h-[90vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader className="p-4 border-b">
                <DialogTitle>{t("cvTitle")}</DialogTitle>
                <DialogDescription>{t("cvDesc")}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-auto bg-muted/20 p-4 flex items-center justify-center">
                <Image width={400} height={400} src={CV} alt="cv" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  )
}
