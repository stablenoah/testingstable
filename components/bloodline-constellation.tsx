"use client"

import { useEffect, useRef } from "react"
import { Award, Search, ZoomIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BloodlineConstellationProps {
  horseName: string
}

export function BloodlineConstellation({ horseName }: BloodlineConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Constellation data - would be dynamic in a real application
  const stars = [
    { name: horseName, x: 300, y: 150, size: 10, brightness: 1.0, lineage: "self" },
    { name: "Bold Ruler", x: 200, y: 100, size: 8, brightness: 0.9, lineage: "sire" },
    { name: "Somethingroyal", x: 400, y: 100, size: 8, brightness: 0.9, lineage: "dam" },
    { name: "Nasrullah", x: 150, y: 50, size: 6, brightness: 0.8, lineage: "sire" },
    { name: "Miss Disco", x: 250, y: 50, size: 6, brightness: 0.8, lineage: "dam" },
    { name: "Princequillo", x: 350, y: 50, size: 6, brightness: 0.8, lineage: "sire" },
    { name: "Imperatrice", x: 450, y: 50, size: 6, brightness: 0.8, lineage: "dam" },
    { name: "Near", x: 100, y: 25, size: 4, brightness: 0.7, lineage: "sire" },
    { name: "Mumtaz Begum", x: 175, y: 25, size: 4, brightness: 0.7, lineage: "dam" },
    { name: "Discovery", x: 225, y: 25, size: 4, brightness: 0.7, lineage: "sire" },
    { name: "Outdone", x: 275, y: 25, size: 4, brightness: 0.7, lineage: "dam" },
    { name: "Prince Rose", x: 325, y: 25, size: 4, brightness: 0.7, lineage: "sire" },
    { name: "Cosquilla", x: 375, y: 25, size: 4, brightness: 0.7, lineage: "dam" },
    { name: "Caruso", x: 425, y: 25, size: 4, brightness: 0.7, lineage: "sire" },
    { name: "Cinquepace", x: 475, y: 25, size: 4, brightness: 0.7, lineage: "dam" },
  ]

  // Connections between stars
  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 7 },
    { from: 3, to: 8 },
    { from: 4, to: 9 },
    { from: 4, to: 10 },
    { from: 5, to: 11 },
    { from: 5, to: 12 },
    { from: 6, to: 13 },
    { from: 6, to: 14 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = 600 * dpr
    canvas.height = 300 * dpr
    ctx.scale(dpr, dpr)

    // Animation variables
    let animationFrameId: number
    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (so they appear behind stars)
      connections.forEach((conn) => {
        const from = stars[conn.from]
        const to = stars[conn.to]

        // Calculate line style based on lineage
        let lineColor = "hsla(160, 94%, 43%, 0.3)" // Primary color
        if (from.lineage === "sire" || to.lineage === "sire") {
          lineColor = "hsla(210, 80%, 60%, 0.3)" // Blue for sire line
        } else if (from.lineage === "dam" || to.lineage === "dam") {
          lineColor = "hsla(340, 80%, 60%, 0.3)" // Pink for dam line
        }

        // Draw connection line with subtle animation
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 1

        // Animated dash effect
        ctx.setLineDash([2, 4])
        ctx.lineDashOffset = -time * 0.5

        ctx.stroke()
        ctx.setLineDash([])
      })

      // Draw stars
      stars.forEach((star) => {
        // Pulsating effect
        const pulseScale = 1 + 0.1 * Math.sin(time * 0.5 + star.x * 0.01)
        const radius = star.size * pulseScale

        // Star color based on lineage
        let fillColor = "hsla(160, 94%, 43%, 1)" // Primary color
        if (star.lineage === "sire") {
          fillColor = "hsla(210, 80%, 60%, 1)" // Blue for sire
        } else if (star.lineage === "dam") {
          fillColor = "hsla(340, 80%, 60%, 1)" // Pink for dam
        }

        // Draw star (circle)
        ctx.beginPath()
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = fillColor
        ctx.fill()

        // Draw glow effect
        ctx.beginPath()
        ctx.arc(star.x, star.y, radius * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(star.x, star.y, radius, star.x, star.y, radius * 2)
        gradient.addColorStop(0, fillColor.replace("1)", "0.3)"))
        gradient.addColorStop(1, fillColor.replace("1)", "0)"))
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw star name for larger stars
        if (star.size >= 6) {
          ctx.font = `${star.size + 2}px sans-serif`
          ctx.fillStyle = "hsla(60, 30%, 96%, 0.8)" // Foreground color (using the dark mode value)
          ctx.textAlign = "center"
          ctx.fillText(star.name, star.x, star.y + radius * 2 + 10)
        }
      })

      // Update animation time
      time += 0.05
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="rounded-lg border border-primary/20 p-4 bg-background/50 premium-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          Bloodline Constellation
        </h3>
        <Badge className="bg-secondary text-secondary-foreground">Elite Lineage</Badge>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[300px]" style={{ width: "100%", height: "300px" }} />

        <div className="absolute top-2 right-2 flex gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm">
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">Zoom In</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <p>
          This constellation map visualizes {horseName}'s bloodline connections, highlighting the influence of key
          ancestors through four generations. The size and brightness of each star represents the genetic contribution
          to {horseName}'s traits.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(210,80%,60%)]"></div>
          <span className="text-xs">Sire Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(340,80%,60%)]"></div>
          <span className="text-xs">Dam Line</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary"></div>
          <span className="text-xs">{horseName}</span>
        </div>
      </div>
    </div>
  )
}
