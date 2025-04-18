'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { truncateAddress } from '@/lib/utils'

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-accent-gold/10 bg-charcoal-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-cinzel font-bold gold-foil">
            StableHold
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {['Dashboard', 'Vaults', 'Learn'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-silver-400 hover:text-silver-100 transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <WalletButton />
      </div>
    </header>
  )
}

function WalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const address = "0x1234...5678"

  const handleConnect = async () => {
    setIsConnected(true)
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 1000)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={isPulsing ? {
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 0 0 rgba(212, 175, 55, 0)',
          '0 0 0 4px rgba(212, 175, 55, 0.3)',
          '0 0 0 0 rgba(212, 175, 55, 0)'
        ]
      } : {}}
      onClick={handleConnect}
      className="px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 
                 text-accent-gold hover:bg-accent-gold/20 transition-colors
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50"
    >
      {isConnected ? truncateAddress(address) : "Connect Wallet"}
    </motion.button>
  )
} 