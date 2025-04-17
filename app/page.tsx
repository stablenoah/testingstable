import Link from "next/link"
import { HorseVault } from "@/components/horse-vault"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronDown, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveIndicator } from "@/components/live-indicator"
import { MarketPulseTicker } from "@/components/market-pulse-ticker"
import { UserProfile } from "@/components/user-profile"

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/10 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="font-display text-2xl font-bold tracking-tighter flex items-center gap-1">
              <span className="text-primary glow-text">STABLE</span>
              <span>HOLD</span>
            </Link>
            <Badge variant="outline" className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              VAULT
            </Badge>
            <div className="hidden md:flex items-center gap-6 ml-6">
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Bloodstock
              </Link>
              <div className="relative group">
                <Link
                  href="#"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  Marketplace
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Link>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="glass-card p-2 rounded-md w-48">
                    <div className="py-1 px-2 text-sm hover:bg-primary/10 rounded cursor-pointer">Auctions</div>
                    <div className="py-1 px-2 text-sm hover:bg-primary/10 rounded cursor-pointer">Private Sales</div>
                    <div className="py-1 px-2 text-sm hover:bg-primary/10 rounded cursor-pointer">Breeding Rights</div>
                  </div>
                </div>
              </div>
              <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search bloodstock..."
                className="h-9 w-[200px] rounded-full bg-secondary pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
              <LiveIndicator />
              <span className="text-sm font-medium">$TABLE: 2,450</span>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                  3
                </span>
              </Button>
            </div>
            <UserProfile />
          </div>
        </div>
      </header>
      <div className="flex">
        <main className="flex-1 container py-8">
          <HorseVault />
        </main>
        <aside className="hidden lg:block w-[320px] border-l border-primary/10 h-[calc(100vh-4rem)] sticky top-16 overflow-hidden">
          <MarketPulseTicker />
        </aside>
      </div>
    </div>
  )
}
