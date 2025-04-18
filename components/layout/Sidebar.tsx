'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Home, BookOpen, ChartBar, Wallet, Settings, ChevronLeft } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: BookOpen, label: 'Vaults', href: '/vaults' },
  { icon: ChartBar, label: 'Simulator', href: '/simulator' },
  { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()

  return (
    <motion.aside
      className="fixed left-0 top-0 z-50 h-screen bg-charcoal-900/95 backdrop-blur-md border-r border-accent-gold/10"
      initial={false}
      animate={{
        width: isExpanded ? 260 : 64,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-white/5 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50
                   transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ChevronLeft className="w-5 h-5 text-accent-gold" />
          </motion.div>
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 mt-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Tooltip.Provider key={item.href}>
                <Tooltip.Root delayDuration={300}>
                  <Tooltip.Trigger asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`
                        flex items-center gap-4 px-3 py-2 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:translate-y-[-2px]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50
                        ${isActive 
                          ? 'text-accent-gold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-px after:bg-accent-gold/40' 
                          : 'text-silver-400 hover:text-silver-100 hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <motion.span
                        animate={{ 
                          opacity: isExpanded ? 1 : 0,
                          width: isExpanded ? 'auto' : 0 
                        }}
                        transition={{ duration: 0.2 }}
                        className="truncate font-medium"
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      className={`
                        px-3 py-2 rounded-md bg-charcoal-800 text-silver-100
                        border border-accent-gold/10 text-sm
                        ${isExpanded ? 'hidden' : 'block'}
                      `}
                    >
                      {item.label}
                      <Tooltip.Arrow className="fill-charcoal-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )
          })}
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle expanded={isExpanded} />
      </div>
    </motion.aside>
  )
} 