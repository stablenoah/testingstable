"use client"

import { useEffect, useRef, useState } from "react"
import { Users, DollarSign, PlusCircle, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TokenizedOwnershipFluidProps {
  horseName: string
}

interface Owner {
  id: string
  name: string
  stake: number
  avatar: string
}

export function TokenizedOwnershipFluid({ horseName }: TokenizedOwnershipFluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [owners, setOwners] = useState<Owner[]>([
    { id: "1", name: "You", stake: 35, avatar: "JD" },
    { id: "2", name: "BloodstockPro", stake: 25, avatar: "BP" },
    { id: "3", name: "EquineVentures", stake: 20, avatar: "EV" },
    { id: "4", name: "StableInc", stake: 15, avatar: "SI" },
    { id: "5", name: "Other Holders", stake: 5, avatar: "+" },
  ])
  const [isAnimating, setIsAnimating] = useState(true)
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null)

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

    // Animation variables
    let animationFrameId: number
    let time = 0

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Skip animation if paused
      if (!isAnimating) {
        drawFluid(ctx, width, height, time)
        return
      }

      // Update time
      time += 0.01

      // Draw fluid visualization
      drawFluid(ctx, width, height, time)

      // Continue animation loop
      animationFrameId = requestAnimationFrame(render)
    }

    const drawFluid = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      // Draw background
      ctx.fillStyle = "hsla(var(--background), 0.3)"
      ctx.fillRect(0, 0, width, height)

      // Calculate total height based on ownership percentages
      let currentY = height
      let cumulativePercentage = 0

      // Draw fluid layers for each owner
      owners.forEach((owner, index) => {
        cumulativePercentage += owner.stake
        const fluidHeight = (height * cumulativePercentage) / 100
        const layerHeight = height - fluidHeight

        // Draw fluid layer
        const gradient = ctx.createLinearGradient(0, currentY, 0, layerHeight)

        // Use different colors for each owner
        const hue = 160 + index * 30
        gradient.addColorStop(0, `hsla(${hue}, 94%, 43%, 0.7)`)
        gradient.addColorStop(1, `hsla(${hue}, 94%, 43%, 0.9)`)

        ctx.fillStyle = gradient

        // Draw waves
        ctx.beginPath()

        // Start at left edge
        ctx.moveTo(0, currentY)

        // Draw wavy top edge
        for (let x = 0; x <= width; x += 20) {
          const waveHeight = 5 * Math.sin((x / width) * 4 * Math.PI + time * 2 + index)
          const y = layerHeight + waveHeight
          ctx.lineTo(x, y)
        }

        // Complete the rectangle
        ctx.lineTo(width, currentY)
        ctx.closePath()
        ctx.fill()

        // Highlight selected owner
        if (selectedOwner === owner.id) {
          ctx.strokeStyle = "hsla(var(--primary), 1)"
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw label
          ctx.fillStyle = "hsla(var(--background), 0.8)"
          ctx.fillRect(width / 2 - 60, layerHeight + 10, 120, 24)
          ctx.strokeRect(width / 2 - 60, layerHeight + 10, 120, 24)

          ctx.fillStyle = "hsla(var(--foreground), 1)"
          ctx.font = "bold 12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${owner.name}: ${owner.stake}%`, width / 2, layerHeight + 22)
        }

        // Update current Y position for next layer
        currentY = layerHeight
      })

      // Draw bubbles for decorative effect
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * width
        const y = height - ((time * 50 + i * 30) % height)
        const size = 2 + Math.sin(time + i) * 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = "hsla(var(--background), 0.6)"
        ctx.fill()
      }
    }

    // Start animation
    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [owners, isAnimating, selectedOwner])

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const handleOwnerClick = (ownerId: string) => {
    setSelectedOwner(selectedOwner === ownerId ? null : ownerId)
  }

  return (
    <div className="rounded-lg border border-primary/20 p-4 bg-background/50 premium-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Tokenized Ownership Fluid
        </h3>
        <Badge className="bg-primary">
          <DollarSign className="h-3 w-3 mr-1" />
          Fractional Ownership
        </Badge>
      </div>

      <div className="relative">
        <div className="ownership-fluid h-[200px] mb-4">
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Fluid waves animation */}
          <div className="fluid-wave" style={{ animationPlayState: isAnimating ? "running" : "paused" }}></div>
          <div
            className="fluid-wave"
            style={{
              animationDelay: "-3s",
              animationDuration: "7s",
              animationPlayState: isAnimating ? "running" : "paused",
            }}
          ></div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
          onClick={toggleAnimation}
        >
          {isAnimating ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          <span className="sr-only">{isAnimating ? "Pause" : "Play"} Animation</span>
        </Button>
      </div>

      <div className="space-y-3 mt-4">
        <div className="text-sm font-medium">Ownership Distribution</div>

        {owners.map((owner) => (
          <div
            key={owner.id}
            className={`flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer ${selectedOwner === owner.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"}`}
            onClick={() => handleOwnerClick(owner.id)}
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
              {owner.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{owner.name}</span>
                <span className="text-sm">{owner.stake}%</span>
              </div>
              <Progress value={owner.stake} className="h-1.5 mt-1" />
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" className="text-xs">
            <Share2 className="h-3 w-3 mr-1" />
            Transfer Shares
          </Button>
          <Button variant="outline" size="sm" className="text-xs text-primary border-primary/20">
            <PlusCircle className="h-3 w-3 mr-1" />
            Increase Stake
          </Button>
        </div>
      </div>
    </div>
  )
}

// Simple play/pause icons
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  )
}
