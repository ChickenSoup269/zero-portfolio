// components/Navbar.tsx ("use client")
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react" // Import icon
import { useTheme } from "next-themes"
import Link from "next/link"
import { useLanguage } from "@/app/LanguageContext"

// UI Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Navbar() {
  const { setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <header className="sticky top-0 bg-background border-b shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          My Portfolio
        </Link>

        {/* Menu Links */}
        <div className="flex-1 flex justify-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/featured-projects">Featured Projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/other-projects">Other Projects</Link>
          </Button>
        </div>

        {/* Right Actions: Language & Theme */}
        <div className="space-x-4 flex items-center">
          {/* Language Select */}
          <Select
            value={language}
            onValueChange={(value: "en" | "vi") => setLanguage(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="vi">Tiếng Việt</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
