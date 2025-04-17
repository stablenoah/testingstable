"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AuctionCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })
  const [bidAmount, setBidAmount] = useState(500)
  const [showBidConfirmation, setShowBidConfirmation] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePlaceBid = () => {
    setShowBidConfirmation(true)
    setTimeout(() => {
      setShowBidConfirmation(false)
      setBidAmount((prev) => prev + 50)
    }, 2000)
  }

  return (
    <Card className="border-primary/20 bg-primary/5 gradient-border premium-card">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Triple Crown Exclusive
          </h3>
          <Badge className="bg-red-500 hover:bg-red-600">
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-white breathe inline-block"></span>
            Live Now
          </Badge>
        </div>

        <div className="flex justify-center my-3">
          <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
            <div className="flex flex-col items-center">
              <motion.div
                className="w-12 h-12 rounded-md premium-card flex items-center justify-center text-2xl font-bold"
                animate={{ scale: timeLeft.seconds === 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(timeLeft.hours).padStart(2, "0")}
              </motion.div>
              <span className="text-xs mt-1">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <motion.div
                className="w-12 h-12 rounded-md premium-card flex items-center justify-center text-2xl font-bold"
                animate={{ scale: timeLeft.seconds === 0 && timeLeft.minutes === 0 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(timeLeft.minutes).padStart(2, "0")}
              </motion.div>
              <span className="text-xs mt-1">Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <motion.div
                className="w-12 h-12 rounded-md premium-card flex items-center justify-center text-2xl font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              >
                {String(timeLeft.seconds).padStart(2, "0")}
              </motion.div>
              <span className="text-xs mt-1">Seconds</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Current Bid</span>
            <span className="font-medium">450 $TABLE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Your Bid</span>
            <span className="font-medium text-primary">{bidAmount} $TABLE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Bidders</span>
            <div className="flex items-center">
              <span className="font-medium">12</span>
              <div className="ml-2 flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full bg-primary/80 border border-background"
                    style={{ zIndex: 3 - i }}
                  />
                ))}
                <div className="h-4 px-1 rounded-full bg-background/80 border border-primary/20 text-[8px] flex items-center">
                  +9
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showBidConfirmation ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-primary/10 border border-primary/20 rounded-md p-2 text-center"
            >
              <div className="text-sm font-medium text-primary">Bid Placed Successfully!</div>
              <div className="text-xs mt-1">You are now the highest bidder</div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-white glow-border" onClick={handlePlaceBid}>
                Place Bid
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
