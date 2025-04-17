"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Dna,
  DollarSign,
  Flame,
  Heart,
  LineChart,
  Maximize2,
  Minimize2,
  Plus,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HorseModel } from "@/components/horse-model"
import { PedigreeChart } from "@/components/pedigree-chart"
import { BreedingSimulator } from "@/components/breeding-simulator"
import { AuctionCountdown } from "@/components/auction-countdown"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GeneticValueHelix } from "@/components/genetic-value-helix"
import { BloodlineConstellation } from "@/components/bloodline-constellation"
import { MarketMomentumTerrain } from "@/components/market-momentum-terrain"
import { BreedingOutcomeWheel } from "@/components/breeding-outcome-wheel"
import { TokenizedOwnershipFluid } from "@/components/tokenized-ownership-fluid"

export function HorseVault() {
  const [selectedHorse, setSelectedHorse] = useState("secretariat")
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showLiveUpdate, setShowLiveUpdate] = useState(false)
  const [showShockFeature, setShowShockFeature] = useState<string | null>(null)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setShowLiveUpdate(true)
      setTimeout(() => setShowLiveUpdate(false), 3000)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const horses = [
    {
      id: "secretariat",
      name: "Secretariat",
      image: "/placeholder.svg?height=200&width=300",
      bloodline: "Bold Ruler x Somethingroyal",
      earnings: "$1,316,808",
      grade: "G1",
      wins: 16,
      tokenValue: 450,
      breedingFee: 85,
      trend: "up",
      geneticScore: 92,
    },
    {
      id: "northern-dancer",
      name: "Northern Dancer",
      image: "/placeholder.svg?height=200&width=300",
      bloodline: "Nearctic x Natalma",
      earnings: "$580,647",
      grade: "G1",
      wins: 14,
      tokenValue: 380,
      breedingFee: 65,
      trend: "stable",
      geneticScore: 88,
    },
    {
      id: "american-pharoah",
      name: "American Pharoah",
      image: "/placeholder.svg?height=200&width=300",
      bloodline: "Pioneerof the Nile x Littleprincessemma",
      earnings: "$8,650,300",
      grade: "G1",
      wins: 9,
      tokenValue: 520,
      breedingFee: 95,
      trend: "up",
      geneticScore: 94,
    },
  ]

  const selectedHorseData = horses.find((h) => h.id === selectedHorse)

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  }

  const renderShockFeature = () => {
    if (!showShockFeature) return null

    switch (showShockFeature) {
      case "genetic":
        return (
          <GeneticValueHelix
            horseName={selectedHorseData?.name || ""}
            geneticScore={selectedHorseData?.geneticScore || 0}
          />
        )
      case "bloodline":
        return <BloodlineConstellation horseName={selectedHorseData?.name || ""} />
      case "market":
        return (
          <MarketMomentumTerrain
            horseName={selectedHorseData?.name || ""}
            tokenValue={selectedHorseData?.tokenValue || 0}
          />
        )
      case "breeding":
        return <BreedingOutcomeWheel horseName={selectedHorseData?.name || ""} />
      case "ownership":
        return <TokenizedOwnershipFluid horseName={selectedHorseData?.name || ""} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Your Breeding Vault
            {showLiveUpdate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="ml-2"
              >
                <Badge className="bg-primary/20 text-primary animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Live Update
                </Badge>
              </motion.div>
            )}
          </h1>
          <p className="text-muted-foreground">Manage your elite bloodstock portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary/20 bg-background/50 backdrop-blur-sm text-primary"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
                  {expanded ? "Compact View" : "Expanded View"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle between compact and expanded view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={sectionRef}>
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="overflow-hidden premium-card">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Elite Stallions</CardTitle>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  3 Owned
                </Badge>
              </div>
              <CardDescription>Select a stallion to view details and breeding options</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {horses.map((horse, i) => (
                  <motion.div
                    key={horse.id}
                    custom={i}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer rounded-lg p-2 transition-all parallax-container ${
                      selectedHorse === horse.id
                        ? "premium-card glow-border"
                        : "glass-card hover:bg-card/80 border border-border/40"
                    }`}
                    onClick={() => setSelectedHorse(horse.id)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="aspect-[3/2] rounded-md overflow-hidden mb-2 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={horse.image || "/placeholder.svg"}
                        alt={horse.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 parallax-element"
                        style={{ transform: "translateZ(20px)" }}
                      />
                      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-secondary" />
                        <span className="text-xs font-medium text-white">{horse.grade}</span>
                      </div>
                      {horse.trend === "up" && (
                        <div className="absolute top-2 right-2 z-20">
                          <Badge className="bg-primary/80 text-white text-[10px] px-1.5 py-0.5">
                            <ArrowRight className="h-2 w-2 mr-0.5 rotate-[-45deg]" />
                            +12%
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 parallax-element" style={{ transform: "translateZ(30px)" }}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{horse.name}</h3>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">{horse.tokenValue}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{horse.bloodline}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{horse.wins} Wins</span>
                        <span className="font-medium text-primary">{horse.breedingFee} $TABLE</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {selectedHorseData && (
              <motion.div
                key={selectedHorse + activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="mt-6"
              >
                <Card className="premium-card overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold">{selectedHorseData.name}</CardTitle>
                      <Badge className="bg-primary hover:bg-primary/80">G1 Winner</Badge>
                    </div>
                    <CardDescription>{selectedHorseData.bloodline}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs
                      defaultValue="overview"
                      value={activeTab}
                      onValueChange={(value) => {
                        setActiveTab(value)
                        setShowShockFeature(null)
                      }}
                    >
                      <TabsList className="bg-background/50 backdrop-blur-sm border border-primary/20 p-1">
                        <TabsTrigger
                          value="overview"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="pedigree"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Pedigree
                        </TabsTrigger>
                        <TabsTrigger
                          value="breeding"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Breeding
                        </TabsTrigger>
                        <TabsTrigger
                          value="3d-model"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          3D Model
                        </TabsTrigger>
                        <TabsTrigger
                          value="shock-features"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Advanced
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-secondary" />
                                  <span className="text-sm font-medium">Career Wins</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">{selectedHorseData.wins}</p>
                              </motion.div>
                              <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium">Earnings</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">{selectedHorseData.earnings}</p>
                              </motion.div>
                              <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <Flame className="h-4 w-4 text-secondary" />
                                  <span className="text-sm font-medium">Token Value</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">{selectedHorseData.tokenValue} $TABLE</p>
                              </motion.div>
                              <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <Heart className="h-4 w-4 text-red-500" />
                                  <span className="text-sm font-medium">Breeding Fee</span>
                                </div>
                                <p className="text-2xl font-bold mt-1">{selectedHorseData.breedingFee} $TABLE</p>
                              </motion.div>
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="rounded-lg border border-border/40 p-4 glass-card hover:border-primary/20 transition-all"
                            >
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <LineChart className="h-4 w-4 text-primary" />
                                Performance Metrics
                              </h3>
                              <div className="h-32 w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-20 px-4">
                                    <div className="relative h-full">
                                      <div className="absolute bottom-0 left-0 w-1/6 h-[30%] bg-primary/20 rounded-t"></div>
                                      <div className="absolute bottom-0 left-[calc(100%/6)] w-1/6 h-[45%] bg-primary/30 rounded-t"></div>
                                      <div className="absolute bottom-0 left-[calc(100%/3)] w-1/6 h-[60%] bg-primary/40 rounded-t"></div>
                                      <div className="absolute bottom-0 left-[calc(100%/2)] w-1/6 h-[80%] bg-primary/50 rounded-t"></div>
                                      <div className="absolute bottom-0 left-[calc(100%*2/3)] w-1/6 h-[70%] bg-primary/60 rounded-t"></div>
                                      <div className="absolute bottom-0 left-[calc(100%*5/6)] w-1/6 h-[90%] bg-primary/70 rounded-t shimmer"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                                  Race Performance (Last 6 Races)
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          <div className="space-y-4">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="rounded-lg border border-border/40 p-4 glass-card hover:border-primary/20 transition-all"
                            >
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                Breeding Season Calendar
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Next Availability</span>
                                  <Badge variant="outline" className="text-primary">
                                    May 15, 2025
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Season Ends</span>
                                  <Badge variant="outline" className="text-red-500">
                                    July 30, 2025
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Bookings Available</span>
                                  <Badge variant="outline">3 of 20</Badge>
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="rounded-lg border border-border/40 p-4 glass-card hover:border-primary/20 transition-all"
                            >
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Award className="h-4 w-4 text-secondary" />
                                Notable Progeny
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Storm Cat</span>
                                  <Badge variant="outline" className="text-secondary">
                                    G1 Winner
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Seattle Slew</span>
                                  <Badge variant="outline" className="text-secondary">
                                    G1 Winner
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Danzig</span>
                                  <Badge variant="outline" className="text-primary">
                                    G2 Winner
                                  </Badge>
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="rounded-lg border border-primary/20 p-4 bg-primary/5 hover:border-primary/40 transition-all gradient-border"
                            >
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                Tokenized Ownership
                              </h3>
                              <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary w-[35%] animate-progress"></div>
                                </div>
                                <span className="text-sm font-medium">35%</span>
                              </div>
                              <div className="mt-2 flex justify-between">
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Plus className="h-3 w-3 mr-1" />
                                  Increase Stake
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs text-primary border-primary/20">
                                  View Holders
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="pedigree" className="mt-4">
                        <PedigreeChart horseName={selectedHorseData.name} />
                      </TabsContent>

                      <TabsContent value="breeding" className="mt-4">
                        <BreedingSimulator horseName={selectedHorseData.name} />
                      </TabsContent>

                      <TabsContent value="3d-model" className="mt-4">
                        <div className="aspect-video rounded-lg overflow-hidden border border-border/40">
                          <HorseModel horseName={selectedHorseData.name} />
                        </div>
                      </TabsContent>

                      <TabsContent value="shock-features" className="mt-4">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant={showShockFeature === "genetic" ? "default" : "outline"}
                              className={
                                showShockFeature === "genetic"
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/20"
                              }
                              onClick={() => setShowShockFeature("genetic")}
                            >
                              <Dna className="h-4 w-4 mr-2" />
                              Genetic Value Helix
                            </Button>
                            <Button
                              variant={showShockFeature === "bloodline" ? "default" : "outline"}
                              className={
                                showShockFeature === "bloodline"
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/20"
                              }
                              onClick={() => setShowShockFeature("bloodline")}
                            >
                              <Award className="h-4 w-4 mr-2" />
                              Bloodline Constellation
                            </Button>
                            <Button
                              variant={showShockFeature === "market" ? "default" : "outline"}
                              className={
                                showShockFeature === "market"
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/20"
                              }
                              onClick={() => setShowShockFeature("market")}
                            >
                              <LineChart className="h-4 w-4 mr-2" />
                              Market Momentum Terrain
                            </Button>
                            <Button
                              variant={showShockFeature === "breeding" ? "default" : "outline"}
                              className={
                                showShockFeature === "breeding"
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/20"
                              }
                              onClick={() => setShowShockFeature("breeding")}
                            >
                              <Sparkles className="h-4 w-4 mr-2" />
                              Breeding Outcome Wheel
                            </Button>
                            <Button
                              variant={showShockFeature === "ownership" ? "default" : "outline"}
                              className={
                                showShockFeature === "ownership"
                                  ? "bg-primary text-primary-foreground"
                                  : "border-primary/20"
                              }
                              onClick={() => setShowShockFeature("ownership")}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Tokenized Ownership Fluid
                            </Button>
                          </div>

                          <AnimatePresence mode="wait">
                            {showShockFeature && (
                              <motion.div
                                key={showShockFeature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              >
                                {renderShockFeature()}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {!showShockFeature && (
                            <div className="flex items-center justify-center h-64 border border-dashed border-primary/20 rounded-lg">
                              <div className="text-center">
                                <Sparkles className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                                <p className="text-muted-foreground">Select an advanced feature to explore</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="border-t border-border/40 bg-muted/20">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Dna className="h-3 w-3 mr-1" />
                          DNA Profile
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Race History
                        </Button>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Book Breeding
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="premium-card h-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Upcoming Auctions</CardTitle>
              <CardDescription>Exclusive breeding rights available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AuctionCountdown />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">Breeding Season Highlights</h3>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2 stagger-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary breathe" />
                    <span className="text-xs">Triple Crown winners available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary breathe" />
                    <span className="text-xs">New G1 winners added weekly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary breathe" />
                    <span className="text-xs">Exclusive bloodlines for $TABLE holders</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-lg border border-primary/20 p-3 bg-primary/5 hover:border-primary/40 transition-all gradient-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">Live Coverage Alerts</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Northern Dancer x Rags to Riches</span>
                    <Badge variant="outline" className="text-primary text-xs">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary breathe inline-block"></span>
                      Live Now
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">American Pharoah x Zenyatta</span>
                    <Badge variant="outline" className="text-xs">
                      In 2 hours
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Secretariat x Lady's Secret</span>
                    <Badge variant="outline" className="text-xs">
                      Tomorrow
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs text-primary border-primary/20">
                  View All Scheduled Coverings
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-lg border border-border/40 p-3 glass-card hover:border-primary/20 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">$TABLE Token Stats</h3>
                  <Badge variant="outline" className="text-primary">
                    +12.4%
                  </Badge>
                </div>
                <div className="h-24 w-full bg-muted/50 rounded-md flex items-center justify-center mb-2 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path
                        d="M0,20 Q10,15 20,25 T40,15 T60,25 T80,10 T100,20"
                        fill="none"
                        stroke="hsl(var(--primary) / 0.5)"
                        strokeWidth="1"
                      />
                      <path
                        d="M0,20 Q10,15 20,25 T40,15 T60,25 T80,10 T100,20"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.5"
                        strokeDasharray="1,1"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-2 text-xs text-muted-foreground">Token Price (24h)</div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="font-medium">$4.85</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-medium">$1.2M</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">$48.5M</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
