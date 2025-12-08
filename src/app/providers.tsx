// app/providers.tsx ("use client" for client providers)
"use client"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "./LanguageContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
