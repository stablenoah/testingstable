"use client"

import { useEffect, useRef, useState } from "react"
import { Dna } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GeneticValueHelixProps {
  horseName: string
  geneticScore: number
}

export function GeneticValueHelix({ horseName, geneticScore }: GeneticValueHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)

  // DNA helix parameters
  const width = 600
  const height = 300
  const strands = 2
  const nodes = 10
  const nodeRadius = 6
  const helixRadius = 50
  const helixPitch = 80

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Animation loop
    let animationFrameId: number
    let angle = rotation

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw helix
      for (let strand = 0; strand < strands; strand++) {
        const strandOffset = (Math.PI * strand) / strands

        for (let i = 0; i < nodes; i++) {
          const t = (i / nodes) * Math.PI * 4 + angle
          const x = width / 2 + Math.cos(t + strandOffset) * helixRadius
          const y = height / 2 - (i * helixPitch) / nodes + height / 4

          // Calculate color based on genetic score and position
          const hue = strand === 0 ? 160 : 46 // Primary or secondary color
          const saturation = 90 + Math.sin(t) * 10
          const lightness = 50 + Math.cos(t) * 10

          // Draw node
          ctx.beginPath()
          ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
          ctx.fill()

          // Draw connecting line to next node if not the last node
          if (i < nodes - 1) {
            const nextT = ((i + 1) / nodes) * Math.PI * 4 + angle
            const nextX = width / 2 + Math.cos(nextT + strandOffset) * helixRadius
            const nextY = height / 2 - ((i + 1) * helixPitch) / nodes + height / 4

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(nextX, nextY)
            ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`
            ctx.lineWidth = 2
            ctx.stroke()
          }

          // Draw connecting rung between strands
          if (strand === 0) {
            const oppositeT = t + Math.PI
            const oppositeX = width / 2 + Math.cos(oppositeT) * helixRadius
            const oppositeY = y

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(oppositeX, oppositeY)
            ctx.strokeStyle = `hsla(${hue}, ${saturation - 30}%, ${lightness}%, 0.3)`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Update rotation for animation
      angle += 0.01
      setRotation(angle)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [rotation, geneticScore])

  return (
    <div className="rounded-lg border border-primary/20 p-4 bg-background/50 premium-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          Genetic Value Helix
        </h3>
        <Badge className="bg-primary">{geneticScore}% Genetic Value</Badge>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[300px] dna-helix" style={{ width: "100%", height: "300px" }} />

        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md border border-primary/20">
          <div className="text-xs font-medium">Key Genetic Markers:</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-xs">Speed (Dominant)</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-2 w-2 rounded-full bg-secondary"></div>
            <span className="text-xs">Stamina (Recessive)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <p>
          This visualization represents the genetic value profile of {horseName}, highlighting key performance markers
          and hereditary traits. The helix structure shows dominant and recessive gene expressions that contribute to
          the overall genetic value score.
        </p>
      </div>
    </div>
  )
}
