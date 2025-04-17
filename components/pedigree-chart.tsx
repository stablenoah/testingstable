"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dna, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PedigreeChartProps {
  horseName: string
}

export function PedigreeChart({ horseName }: PedigreeChartProps) {
  const [heatmapVisible, setHeatmapVisible] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // This would be dynamic data in a real application
  const pedigreeData = {
    name: horseName,
    sire: {
      name: "Bold Ruler",
      sire: { name: "Nasrullah", sire: { name: "Near" }, dam: { name: "Mumtaz Begum" } },
      dam: { name: "Miss Disco", sire: { name: "Discovery" }, dam: { name: "Outdone" } },
    },
    dam: {
      name: "Somethingroyal",
      sire: { name: "Princequillo", sire: { name: "Prince Rose" }, dam: { name: "Cosquilla" } },
      dam: { name: "Imperatrice", sire: { name: "Caruso" }, dam: { name: "Cinquepace" } },
    },
  }

  const renderHorseNode = (horse: any, depth = 0, position = "") => {
    const width = depth === 0 ? "w-40" : depth === 1 ? "w-36" : "w-32"
    const bgColor = heatmapVisible
      ? position.includes("sire")
        ? "bg-gradient-to-r from-blue-500/20 to-blue-500/10"
        : "bg-gradient-to-r from-pink-500/20 to-pink-500/10"
      : "bg-card/50"

    const isSelected = selectedNode === `${depth}-${position}`

    return (
      <motion.div
        className={`${width} rounded-lg border ${isSelected ? "border-primary" : "border-border/40"} ${bgColor} p-2 flex flex-col items-center justify-center hover:border-primary/20 transition-all ${isSelected ? "glow-border" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.1, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.05, y: -5 }}
        onClick={() => setSelectedNode(`${depth}-${position}`)}
      >
        <div className="text-center">
          <div className="font-semibold text-sm truncate">{horse.name}</div>
          {depth < 2 && (
            <div className="text-xs text-muted-foreground mt-1">{position.includes("sire") ? "Stallion" : "Mare"}</div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          Pedigree Visualization
        </h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">View the family tree with AI-generated heatmap</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="outline"
            size="sm"
            className={heatmapVisible ? "text-primary border-primary/20" : ""}
            onClick={() => setHeatmapVisible(!heatmapVisible)}
          >
            {heatmapVisible ? "Hide Heatmap" : "Show Heatmap"}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border/40 p-4 bg-background/50 premium-card">
        <div className="flex flex-col items-center space-y-4">
          {/* Generation 1 */}
          <div className="flex justify-center">{renderHorseNode(pedigreeData, 0)}</div>

          {/* Connecting lines */}
          <div className="h-6 w-px bg-border/40"></div>

          {/* Generation 2 */}
          <div className="flex justify-center gap-8">
            {renderHorseNode(pedigreeData.sire, 1, "sire")}
            {renderHorseNode(pedigreeData.dam, 1, "dam")}
          </div>

          {/* Connecting lines */}
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-border/40"></div>
              <div className="flex gap-4">
                {renderHorseNode(pedigreeData.sire.sire, 2, "sire.sire")}
                {renderHorseNode(pedigreeData.sire.dam, 2, "sire.dam")}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-border/40"></div>
              <div className="flex gap-4">
                {renderHorseNode(pedigreeData.dam.sire, 2, "dam.sire")}
                {renderHorseNode(pedigreeData.dam.dam, 2, "dam.dam")}
              </div>
            </div>
          </div>
        </div>

        {/* Hidden constellation lines that appear during theme transition */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 constellation-hidden"
          viewBox="0 0 100 100"
        >
          <line x1="50" y1="20" x2="30" y2="40" className="constellation-line" />
          <line x1="50" y1="20" x2="70" y2="40" className="constellation-line" />
          <line x1="30" y1="40" x2="20" y2="60" className="constellation-line" />
          <line x1="30" y1="40" x2="40" y2="60" className="constellation-line" />
          <line x1="70" y1="40" x2="60" y2="60" className="constellation-line" />
          <line x1="70" y1="40" x2="80" y2="60" className="constellation-line" />
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-blue-500 border-blue-500/20">
            Sire Line
          </Badge>
          <Badge variant="outline" className="text-pink-500 border-pink-500/20">
            Dam Line
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          Export Pedigree
        </Button>
      </div>

      {selectedNode && (
        <motion.div
          className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Genetic Influence Analysis</h4>
            <Badge className="bg-primary">Premium</Badge>
          </div>
          <p className="text-sm mt-2">
            This bloodline contributes significantly to speed and stamina traits with a 78% genetic influence score.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[78%]"></div>
            </div>
            <span className="text-xs font-medium">78%</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
