"use client"

import { motion } from "framer-motion"

export function LiveIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative h-2 w-2">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.2, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <div className="relative h-2 w-2 rounded-full bg-primary"></div>
      </div>
    </div>
  )
}
