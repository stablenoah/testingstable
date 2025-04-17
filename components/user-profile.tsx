"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BreederMark } from "./breeder-mark"

export function UserProfile() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -30 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <span>JD</span>
          <BreederMark level="gold" className="mt-2" />
        </motion.div>
      </div>
      {isHovered && (
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <BreederMark level="gold" />
        </motion.div>
      )}
    </motion.div>
  )
}
