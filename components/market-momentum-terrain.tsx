"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { LineChart, TrendingUp, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MarketMomentumTerrainProps {
  horseName: string
  tokenValue: number
}

export function MarketMomentumTerrain({ horseName, tokenValue }: MarketMomentumTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timeframe, setTimeframe] = useState("1m")
  const [isHovering, setIsHovering] = useState(false)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [hoverValue, setHoverValue] = useState({ price: 0, date: "" })

  // Market data - would be dynamic in a real application
  const marketData = {
    "1w": generateMarketData(7, tokenValue, 0.05),
    "1m": generateMarketData(30, tokenValue, 0.12),
    "3m": generateMarketData(90, tokenValue, 0.25),
    "1y": generateMarketData(365, tokenValue, 0.4),
  }

  // Generate synthetic market data
  function generateMarketData(days: number, currentValue: number, volatility: number) {
    const data = []
    let value = currentValue * (1 - volatility)

    for (let i = days; i >= 0; i--) {
      // Create a date for each point
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Generate a value with some randomness but trending upward
      const randomFactor = Math.random() * volatility - volatility / 2
      const trendFactor = ((days - i) / days) * volatility
      value = value * (1 + randomFactor * 0.1 + trendFactor * 0.05)

      data.push({
        date: date.toLocaleDateString(),
        value: Math.round(value),
      })
    }

    return data
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.scale(dpr, dpr)

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    // Get current data based on timeframe
    const data = marketData[timeframe as keyof typeof marketData]

    // Find min and max values for scaling
    const minValue = Math.min(...data.map((d) => d.value)) * 0.9
    const maxValue = Math.max(...data.map((d) => d.value)) * 1.1
    const valueRange = maxValue - minValue

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw terrain
    const terrainPoints = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((d.value - minValue) / valueRange) * height * 0.7 - height * 0.1,
    }))

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "hsla(160, 94%, 43%, 0.1)") // Primary color with 0.1 opacity
    gradient.addColorStop(1, "hsla(160, 8%, 10%, 0)") // Background color with 0 opacity

    ctx.beginPath()
    ctx.moveTo(0, height)
    terrainPoints.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw terrain line
    ctx.beginPath()
    terrainPoints.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.strokeStyle = "hsla(160, 94%, 43%, 0.8)" // Primary color with 0.8 opacity
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw peaks (terrain points)
    terrainPoints.forEach((point, i) => {
      // Only draw every few points to avoid clutter
      if (i % 5 === 0 || i === terrainPoints.length - 1) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "hsla(160, 94%, 43%, 1)" // Primary color
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        const glowGradient = ctx.createRadialGradient(point.x, point.y, 3, point.x, point.y, 6)
        glowGradient.addColorStop(0, "hsla(160, 94%, 43%, 0.3)") // Primary color with 0.3 opacity
        glowGradient.addColorStop(1, "hsla(160, 94%, 43%, 0)") // Primary color with 0 opacity
        ctx.fillStyle = glowGradient
        ctx.fill()
      }
    })

    // Draw terrain peaks (decorative)
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width
      const y = Math.random() * height * 0.5 + height * 0.3

      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      const peakGradient = ctx.createRadialGradient(x, y, 5, x, y, 20)
      peakGradient.addColorStop(0, "hsla(160, 94%, 43%, 0.1)") // Primary color with 0.1 opacity
      peakGradient.addColorStop(1, "hsla(160, 94%, 43%, 0)") // Primary color with 0 opacity
      ctx.fillStyle = peakGradient
      ctx.fill()
    }

    // Draw hover indicator if hovering
    if (isHovering) {
      const closestPointIndex = Math.min(
        Math.max(0, Math.round((hoverPosition.x / width) * (data.length - 1))),
        data.length - 1,
      )
      const closestPoint = terrainPoints[closestPointIndex]
      const dataPoint = data[closestPointIndex]

      // Draw vertical line
      ctx.beginPath()
      ctx.moveTo(closestPoint.x, 0)
      ctx.lineTo(closestPoint.x, height)
      ctx.strokeStyle = "hsla(160, 94%, 43%, 0.3)" // Primary color with 0.3 opacity
      ctx.lineWidth = 1
      ctx.setLineDash([5, 3])
      ctx.stroke()
      ctx.setLineDash([])

      // Draw point highlight
      ctx.beginPath()
      ctx.arc(closestPoint.x, closestPoint.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = "hsla(160, 94%, 43%, 1)" // Primary color
      ctx.fill()

      // Update hover value
      setHoverValue({
        price: dataPoint.value,
        date: dataPoint.date,
      })
    }
  }, [timeframe, isHovering, hoverPosition, tokenValue])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setIsHovering(true)
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className="rounded-lg border border-primary/20 p-4 bg-background/50 premium-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <LineChart className="h-4 w-4 text-primary" />
          Market Momentum Terrain
        </h3>
        <Badge className="bg-primary">
          <TrendingUp className="h-3 w-3 mr-1" />
          {tokenValue} $TABLE
        </Badge>
      </div>

      <Tabs defaultValue="1m" value={timeframe} onValueChange={setTimeframe}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-background/50 backdrop-blur-sm border border-primary/20">
            <TabsTrigger
              value="1w"
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              1W
            </TabsTrigger>
            <TabsTrigger
              value="1m"
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              1M
            </TabsTrigger>
            <TabsTrigger
              value="3m"
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              3M
            </TabsTrigger>
            <TabsTrigger
              value="1y"
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              1Y
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last updated: Today</span>
          </div>
        </div>

        <div className="relative h-[250px] market-terrain">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />

          {isHovering && (
            <div
              className="absolute bg-background/80 backdrop-blur-sm border border-primary/20 rounded-md px-2 py-1 text-xs pointer-events-none"
              style={{
                left: `${Math.min(hoverPosition.x, canvasRef.current?.clientWidth || 0 - 100)}px`,
                top: `${Math.max(20, hoverPosition.y - 40)}px`,
              }}
            >
              <div className="font-medium">{hoverValue.price} $TABLE</div>
              <div className="text-muted-foreground">{hoverValue.date}</div>
            </div>
          )}

          {/* Terrain peaks (decorative) */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="terrain-peak absolute"
              style={{
                left: `${20 + i * 30}%`,
                bottom: `${30 + i * 15}%`,
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                opacity: 0.3 - i * 0.05,
              }}
            />
          ))}
        </div>
      </Tabs>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          <div className="font-medium">Market Analysis</div>
          <p className="text-xs text-muted-foreground mt-1">
            {horseName}'s token value has shown strong upward momentum over the{" "}
            {timeframe === "1w"
              ? "past week"
              : timeframe === "1m"
                ? "past month"
                : timeframe === "3m"
                  ? "past quarter"
                  : "past year"}
            , with a growth trend that outperforms the market average by 12%.
          </p>
        </div>

        <Button variant="outline" size="sm" className="text-xs border-primary/20">
          <TrendingUp className="h-3 w-3 mr-1" />
          Full Analysis
        </Button>
      </div>
    </div>
  )
}
