"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dna, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

interface BreedingSimulatorProps {
  horseName: string
}

export function BreedingSimulator({ horseName }: BreedingSimulatorProps) {
  const [selectedMare, setSelectedMare] = useState("zenyatta")
  const [simulationRun, setSimulationRun] = useState(false)
  const [traitWeights, setTraitWeights] = useState({
    speed: 50,
    stamina: 50,
    temperament: 50,
  })
  const [isSimulating, setIsSimulating] = useState(false)

  const mares = [
    { id: "zenyatta", name: "Zenyatta", grade: "G1", traits: { speed: 85, stamina: 90, temperament: 75 } },
    {
      id: "rachel-alexandra",
      name: "Rachel Alexandra",
      grade: "G1",
      traits: { speed: 95, stamina: 80, temperament: 70 },
    },
    { id: "rags-to-riches", name: "Rags to Riches", grade: "G1", traits: { speed: 80, stamina: 85, temperament: 85 } },
  ]

  const selectedMareData = mares.find((m) => m.id === selectedMare)

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      setSimulationRun(true)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="border-primary/20 bg-background/50 premium-card">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3">Select Mare</h3>
              <Select value={selectedMare} onValueChange={setSelectedMare}>
                <SelectTrigger className="w-full border-primary/20">
                  <SelectValue placeholder="Select a mare" />
                </SelectTrigger>
                <SelectContent>
                  {mares.map((mare) => (
                    <SelectItem key={mare.id} value={mare.id}>
                      <div className="flex items-center gap-2">
                        <span>{mare.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {mare.grade}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedMareData && (
                <div className="mt-4 space-y-3 stagger-fade-in">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Speed</span>
                      <span className="text-sm font-medium">{selectedMareData.traits.speed}%</span>
                    </div>
                    <Progress value={selectedMareData.traits.speed} className="h-2 animate-progress" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Stamina</span>
                      <span className="text-sm font-medium">{selectedMareData.traits.stamina}%</span>
                    </div>
                    <Progress value={selectedMareData.traits.stamina} className="h-2 animate-progress" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Temperament</span>
                      <span className="text-sm font-medium">{selectedMareData.traits.temperament}%</span>
                    </div>
                    <Progress value={selectedMareData.traits.temperament} className="h-2 animate-progress" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="border-primary/20 bg-background/50 premium-card">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3">Trait Weighting</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Speed Importance</span>
                    <span className="text-sm font-medium">{traitWeights.speed}%</span>
                  </div>
                  <Slider
                    value={[traitWeights.speed]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setTraitWeights({ ...traitWeights, speed: value[0] })}
                    className="[&>span]:bg-primary"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stamina Importance</span>
                    <span className="text-sm font-medium">{traitWeights.stamina}%</span>
                  </div>
                  <Slider
                    value={[traitWeights.stamina]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setTraitWeights({ ...traitWeights, stamina: value[0] })}
                    className="[&>span]:bg-primary"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temperament Importance</span>
                    <span className="text-sm font-medium">{traitWeights.temperament}%</span>
                  </div>
                  <Slider
                    value={[traitWeights.temperament]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setTraitWeights({ ...traitWeights, temperament: value[0] })}
                    className="[&>span]:bg-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="bg-primary hover:bg-primary/90 text-white glow-border"
            onClick={handleRunSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Simulating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Run Breeding Simulation
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {simulationRun && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <Card className="border-primary/20 bg-primary/5 gradient-border">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Dna className="h-4 w-4 text-primary" />
                    Simulation Results
                  </h3>
                  <Badge className="bg-primary hover:bg-primary/90">92% Match</Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg border border-border/40 p-2 bg-card/50 text-center"
                    >
                      <div className="text-xs text-muted-foreground">Speed</div>
                      <div className="text-xl font-bold mt-1">88%</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg border border-border/40 p-2 bg-card/50 text-center"
                    >
                      <div className="text-xs text-muted-foreground">Stamina</div>
                      <div className="text-xl font-bold mt-1">92%</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-lg border border-border/40 p-2 bg-card/50 text-center"
                    >
                      <div className="text-xs text-muted-foreground">Temperament</div>
                      <div className="text-xl font-bold mt-1">85%</div>
                    </motion.div>
                  </div>

                  <div className="p-3 rounded-lg border border-primary/20 bg-primary/10">
                    <div className="text-sm font-medium mb-2">Genetic Compatibility Analysis</div>
                    <p className="text-xs">
                      Breeding {horseName} with {selectedMareData?.name} has a high probability of producing exceptional
                      offspring with superior stamina traits. The genetic markers indicate a 92% compatibility score,
                      which is significantly above average.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-primary">
                        A+ Rating
                      </Badge>
                      <Badge variant="outline">Top 5%</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Save Results
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
