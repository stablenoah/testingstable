"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowUp, Clock, DollarSignIcon as Dollar, Shield, Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MarketPulseItem {
  id: string
  type: "premium" | "watchlist" | "market" | "governance"
  title: string
  value: string
  change?: number
  time: string
  icon?: React.ReactNode
}

export function MarketPulseTicker() {
  const [items, setItems] = useState<MarketPulseItem[]>([
    {
      id: "1",
      type: "premium",
      title: "Northern Dancer Breeding Right",
      value: "1,250 $TABLE",
      change: 12.5,
      time: "2m ago",
      icon: <Dollar className="h-4 w-4 text-primary" />,
    },
    {
      id: "2",
      type: "watchlist",
      title: "Secretariat Offspring",
      value: "850 $TABLE",
      change: 5.2,
      time: "5m ago",
      icon: <Star className="h-4 w-4 text-secondary" />,
    },
    {
      id: "3",
      type: "market",
      title: "Average Stud Fee",
      value: "320 $TABLE",
      change: -2.1,
      time: "10m ago",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "4",
      type: "governance",
      title: "Breeding Season Extension",
      value: "Poll Closing",
      time: "2h remaining",
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: "5",
      type: "premium",
      title: "Triple Crown Package",
      value: "3,200 $TABLE",
      change: 8.7,
      time: "15m ago",
      icon: <Dollar className="h-4 w-4 text-primary" />,
    },
  ])

  // Simulate new market data arriving
  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: MarketPulseItem = {
        id: Math.random().toString(36).substring(2, 9),
        type: ["premium", "watchlist", "market", "governance"][Math.floor(Math.random() * 4)] as any,
        title: ["Pharoah Bloodline", "Eclipse Stakes Winner", "New G1 Addition", "Governance Vote"][
          Math.floor(Math.random() * 4)
        ],
        value: `${Math.floor(Math.random() * 1000 + 100)} $TABLE`,
        change: Math.random() > 0.3 ? Number.parseFloat((Math.random() * 15 - 5).toFixed(1)) : undefined,
        time: "Just now",
        icon: <Zap className="h-4 w-4 text-primary" />,
      }

      setItems((prev) => [newItem, ...prev.slice(0, 9)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-primary/10 flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Market Pulse
        </h3>
        <Badge variant="outline" className="text-primary text-xs">
          Live
        </Badge>
      </div>

      <div className="market-pulse-ticker flex-1 overflow-hidden">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`market-pulse-item ${item.type === "premium" ? "market-pulse-premium" : ""} ${item.type === "watchlist" ? "market-pulse-watchlist" : ""}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.time}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold">{item.value}</span>
                {item.change !== undefined && (
                  <div
                    className={`flex items-center text-xs ${item.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {item.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {Math.abs(item.change)}%
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
