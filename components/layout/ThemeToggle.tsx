'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ expanded = true }: { expanded?: boolean }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-4 px-3 py-2 rounded-lg 
                 hover:bg-white/5 hover:translate-y-[-2px]
                 text-silver-400 transition-all duration-300
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        animate={{ rotateY: isDark ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
      {expanded && (
        <motion.span
          animate={{ opacity: expanded ? 1 : 0 }}
          className="font-medium"
        >
          Theme
        </motion.span>
      )}
    </button>
  )
} 