// app/providers.tsx ("use client" for client providers)
"use client"
import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "./LanguageContext"
import { FontProvider } from "./FontContext"
import { AnimationProvider } from "./AnimationContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark", "ocean"]}
    >
      <AnimationProvider>
        <FontProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </FontProvider>
      </AnimationProvider>
    </ThemeProvider>
  )
}
