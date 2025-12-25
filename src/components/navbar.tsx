"use client"

import * as React from "react"

import { Moon, Sun, FileText, User, CaseSensitive } from "lucide-react"

import { useTheme } from "next-themes"

import Link from "next/link"

import { useLanguage } from "@/app/LanguageContext" // Import hook

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export default function Navbar() {
  const { setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage() // Lấy t từ context

  function setFont(arg0: string): void {
    throw new Error("Function not implemented.")
  }

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-gradient"
        >
          Zero Portfolio
        </Link>

        <div className="hidden md:flex flex-1 justify-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/">{t("home")}</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/featured-projects">{t("featuredProjects")}</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/other-projects">{t("otherProjects")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={language}
            onValueChange={(value: "en" | "vi") => setLanguage(value)}
          >
            <SelectTrigger className="w-[120px] h-9 shadow-md">
              <SelectValue placeholder="Lang" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="en">English</SelectItem>

              <SelectItem value="vi">Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 shadow-md">
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
              <Button variant="ghost" size="icon" className="h-9 w-9 shadow-md">
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

              <DropdownMenuItem onClick={() => setTheme("system")}>
                {t("system")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full shadow-md"
                >
                  <Avatar className="h-9 w-9 border transition-opacity hover:opacity-80">
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
                      dev@example.com
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
      </nav>
    </header>
  )
}
