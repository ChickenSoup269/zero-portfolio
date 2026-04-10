// components/Footer.tsx ("use client")
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/app/LanguageContext"
import { Github, Linkedin, Mail, Copy } from "lucide-react"
import Image from "next/image"
import logoImage from "@/app/image/logo.png"

export default function Footer() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const email = "thientran01345@icloud.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="footer-section" className="bg-muted py-8 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-lg">
              Trần Phước Thiện
              <Image
                src={logoImage}
                alt="Logo"
                width={50}
                height={50}
                className="inline-block ml-2"
              />
            </p>
            <p className="text-sm">{t("footerRights")}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/tr%E1%BA%A7n-ph%C6%B0%E1%BB%9Bc-thi%E1%BB%87n-zero-90ba9a329/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/ChickenSoup269"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <Github size={24} />
            </a>
            <div className="relative group flex items-center gap-2">
              <Mail size={24} />
              <span className="text-sm">{email}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                <Copy size={16} />
              </Button>
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {t("copied")}
                </span>
              )}
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-center text-sm">
          <p>
            {t("builtWith")}{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-primary"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-primary"
            >
              Tailwind CSS
            </a>
            , &{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-primary"
            >
              Shadcn/ui
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
