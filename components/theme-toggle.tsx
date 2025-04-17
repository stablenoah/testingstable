"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }, 100)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative h-10 w-10 rounded-full overflow-hidden gradient-border ${isTransitioning ? "mode-transition" : ""}`}
      onClick={handleToggle}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          </motion.div>
        </AnimatePresence>
      </div>
      {isTransitioning && (
        <div className="absolute bottom-1 right-1 opacity-0 founder-signature text-[6px] text-primary">STABLEHOLD</div>
      )}
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
