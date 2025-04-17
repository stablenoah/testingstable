"use client"

import { motion } from "framer-motion"

type BreederMarkLevel = "bronze" | "silver" | "gold" | "platinum" | "diamond"

interface BreederMarkProps {
  level: BreederMarkLevel
  className?: string
}

export function BreederMark({ level, className = "" }: BreederMarkProps) {
  const fillPercentage = {
    bronze: 20,
    silver: 40,
    gold: 60,
    platinum: 80,
    diamond: 100,
  }

  const fillClass = {
    bronze: "prestige-bronze",
    silver: "prestige-silver",
    gold: "prestige-gold",
    platinum: "prestige-platinum",
    diamond: "prestige-diamond",
  }

  return (
    <div className={`breeders-mark ${className}`}>
      <div className="absolute inset-0 rounded-full border border-primary/30"></div>
      <motion.div
        className={`mark-fill ${fillClass[level]}`}
        initial={{ height: "0%" }}
        animate={{ height: `${fillPercentage[level]}%` }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  )
}
