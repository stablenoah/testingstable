"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Dna, Sparkles, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BreedingOutcomeWheelProps {
  horseName: string
}

export function BreedingOutcomeWheel({ horseName }: BreedingOutcomeWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null)

  // Breeding outcome data - would be dynamic in a real application
  const outcomes = [
    { trait: "Speed", probability: 0.25, color: "hsla(160, 94%, 43%, 1)" },
    { trait: "Stamina", probability: 0.2, color: "hsla(190, 94%, 43%, 1)" },
    { trait: "Temperament", probability: 0.15, color: "hsla(220, 94%, 43%, 1)" },
    { trait: "Conformation", probability: 0.15, color: "hsla(250, 94%, 43%, 1)" },
    { trait: "Heart", probability: 0.1, color: "hsla(280, 94%, 43%, 1)" },
    { trait: "Intelligence", probability: 0.1, color: "hsla(310, 94%, 43%, 1)" },
    { trait: "Rare Trait", probability: 0.05, color: "hsla(46, 94%, 43%, 1)" },
  ]

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
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw wheel segments
    let startAngle = rotation
    outcomes.forEach((outcome, index) => {
      const sliceAngle = 2 * Math.PI * outcome.probability
      const endAngle = startAngle + sliceAngle

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Fill with gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, outcome.color.replace("1)", "0.7)"))
      gradient.addColorStop(1, outcome.color)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw segment border
      ctx.strokeStyle = "hsla(var(--background), 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw trait label
      const labelRadius = radius * 0.75
      const labelAngle = startAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      // Rotate text to align with segment
      ctx.save()
      ctx.translate(labelX, labelY)
      ctx.rotate(labelAngle + Math.PI / 2)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "hsla(var(--background), 1)"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(outcome.trait, 0, 0)
      ctx.restore()

      // Highlight selected segment
      if (selectedSegment === index) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius + 5, startAngle, endAngle)
        ctx.closePath()
        ctx.strokeStyle = "hsla(var(--primary), 1)"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      startAngle = endAngle
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.2, 0, 2 * Math.PI)
    ctx.fillStyle = "hsla(var(--background), 0.9)"
    ctx.fill()
    ctx.strokeStyle = "hsla(var(--primary), 0.5)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw DNA icon in center
    ctx.fillStyle = "hsla(var(--primary), 1)"
    ctx.font = "bold 20px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("DNA", centerX, centerY)

    // Draw spinner arrow
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, -radius - 15)
    ctx.lineTo(10, -radius)
    ctx.lineTo(-10, -radius)
    ctx.closePath()
    ctx.fillStyle = "hsla(var(--primary), 1)"
    ctx.fill()
    ctx.restore()
  }, [rotation, selectedSegment])

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedSegment(null)

    // Random number of rotations (3-5 full rotations)
    const rotations = 3 + Math.random() * 2
    const targetRotation = rotation + rotations * 2 * Math.PI

    // Determine final segment
    const randomValue = Math.random()
    let cumulativeProbability = 0
    let finalSegment = 0

    for (let i = 0; i < outcomes.length; i++) {
      cumulativeProbability += outcomes[i].probability
      if (randomValue <= cumulativeProbability) {
        finalSegment = i
        break
      }
    }

    // Calculate exact stopping angle to land on the selected segment
    let segmentStartAngle = 0
    for (let i = 0; i < finalSegment; i++) {
      segmentStartAngle += outcomes[i].probability * 2 * Math.PI
    }
    const segmentMiddleAngle = segmentStartAngle + (outcomes[finalSegment].probability * 2 * Math.PI) / 2
    const finalRotation = Math.floor(targetRotation / (2 * Math.PI)) * 2 * Math.PI + segmentMiddleAngle

    // Animate the spin
    let startTime: number | null = null
    const duration = 5000 // 5 seconds

    const animateSpin = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for natural slowdown
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const currentRotation = rotation + (finalRotation - rotation) * easeOut(progress)

      setRotation(currentRotation)

      if (progress < 1) {
        requestAnimationFrame(animateSpin)
      } else {
        setIsSpinning(false)
        setSelectedSegment(finalSegment)
      }
    }

    requestAnimationFrame(animateSpin)
  }

  return (
    <div className="rounded-lg border border-primary/20 p-4 bg-background/50 premium-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          Breeding Outcome Wheel
        </h3>
        <Badge className="bg-secondary text-secondary-foreground">
          <Sparkles className="h-3 w-3 mr-1" />
          Genetic Prediction
        </Badge>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[300px] outcome-wheel" style={{ width: "100%", height: "300px" }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: isSpinning ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: isSpinning ? Number.POSITIVE_INFINITY : 0, duration: 0.5 }}
          >
            <Button
              className="bg-primary hover:bg-primary/90 text-white pointer-events-auto"
              onClick={spinWheel}
              disabled={isSpinning}
            >
              {isSpinning ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Spinning...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Spin Wheel
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        {selectedSegment !== null ? (
          <div className="p-3 border border-primary/20 rounded-md bg-primary/5">
            <div className="font-medium flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: outcomes[selectedSegment].color }}></div>
              {outcomes[selectedSegment].trait} Dominant
            </div>
            <p className="text-xs mt-1">
              Breeding {horseName} with the selected mare has a{" "}
              {Math.round(outcomes[selectedSegment].probability * 100)}% chance of producing offspring with dominant{" "}
              {outcomes[selectedSegment].trait.toLowerCase()} traits.
            </p>
          </div>
        ) : (
          <p>
            Spin the wheel to simulate potential breeding outcomes with {horseName}. The wheel represents the
            probability distribution of dominant traits in potential offspring.
          </p>
        )}
      </div>
    </div>
  )
}
