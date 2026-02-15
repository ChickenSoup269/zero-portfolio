/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type Font = "default" | "gohu"

interface FontContextType {
  font: Font
  setFont: (font: Font) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Font>("default")

  useEffect(() => {
    const storedFont = localStorage.getItem("font") as Font | null
    if (storedFont) {
      setFont(storedFont)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove("font-gohu")
    if (font === "gohu") {
      document.documentElement.classList.add("font-gohu")
    }
    localStorage.setItem("font", font)
  }, [font])

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) throw new Error("useFont must be used within FontProvider")
  return context
}
