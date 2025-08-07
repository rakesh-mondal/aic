"use client"

import Link from "next/link"
import { 
  BellIcon, 
  UserIcon, 
  CogIcon, 
  GlobeAltIcon, 
  CreditCardIcon, 
  Bars3Icon, 
  ChevronDownIcon, 
  ChartBarIcon, 
  ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline"
import { KrutrimLogo } from "@/components/ui/krutrim-logo"
import { Button } from "@/components/ui/button"
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { GlobalSearch } from "@/components/search/global-search"
import { Progress } from "@/components/ui/progress"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"

interface TopHeaderProps {
  onMenuClick?: () => void
  isMobile?: boolean
  onAIToggle?: () => void
}

interface User {
  name: string
  email: string
}

export function TopHeader({ onMenuClick, isMobile, onAIToggle }: TopHeaderProps) {
  const { user, logout } = useAuth() as { user: User | null, logout: () => void }

  // Sample regions for the region selector
  const regions = [
    { id: "in-blr", name: "Bengaluru" },
    { id: "in-hyd", name: "Hyderabad" },
  ]

  // Sample usage data
  const usageData = {
    total: 5000,
    used: 3200,
    remaining: 1800,
    breakdown: [
      { name: "Compute", used: 1500, total: 2000 },
      { name: "Storage", used: 1000, total: 2000 },
      { name: "Network", used: 700, total: 1000 },
    ],
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="flex h-[56px] items-center justify-between px-4">
        {/* Left side - Logo, mobile menu button and search */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <KrutrimLogo width={120} height={40} href={null} />
          </Link>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
              <Bars3Icon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          <div className="w-[300px] hidden">
            <GlobalSearch />
          </div>
        </div>

        {/* Right side - Region selector, notifications, help, and user profile */}
        <div className="flex items-center gap-3">
          {/* Region selector */}
          <DropdownMenu>
            <TooltipWrapper content="Select your preferred region for resources">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 h-9 px-3 hover:bg-[#1f22250f]">
                  <GlobeAltIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="max-w-[120px] truncate text-sm">{regions[0].name}</span>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent align="end" className="w-[240px]">
              <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Select Region</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {regions.map((region) => (
                <DropdownMenuItem key={region.id} className="cursor-pointer py-2">
                  <div className="flex flex-col">
                    <span className="text-sm">{region.name}</span>
                    <span className="text-xs text-muted-foreground">{region.id}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Credits display */}
          <DropdownMenu>
            <TooltipWrapper content="View credit balance and usage details">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 h-9 px-3 hover:bg-[#1f22250f]">
                  <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Balance ₹{usageData.remaining}</span>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent align="end" className="w-[240px]">
              <div className="px-3 py-3">
                <div className="space-y-2">
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <Link href="/billing/add-credits">
                      Add Credits
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/billing/usage">
                      View Usage
                    </Link>
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Krutrim AI Button */}
          <div onClick={onAIToggle} className="cursor-pointer">
            <AnimatedGradientText className="bg-white/90 hover:bg-white px-6 py-2">
              <div className="flex items-center gap-2">
                <span 
                  className="inline-flex w-4 h-4 animate-pulse animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%]"
                  style={{ 
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    mask: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><g id="ai-cloud-spark--cloud-internet-server-network-artificial-intelligence-ai"><path id="Subtract" fill="currentColor" fill-rule="evenodd" d="M6.481285714285716 1.026a5.6160000000000005 5.6160000000000005 0 0 1 8.543571428571429 4.006285714285715 4.152857142857143 4.152857142857143 0 0 1 0.29185714285714287 7.855714285714287c-0.1092857142857143 -1.0812857142857144 -0.8395714285714286 -2.100857142857143 -2.190857142857143 -2.3361428571428573a1.8552857142857144 1.8552857142857144 0 0 1 -1.510714285714286 -1.5030000000000001l-0.012857142857142859 -0.05657142857142857c-0.6351428571428572 -2.79 -4.614428571428571 -2.7720000000000002 -5.225142857142858 0.02185714285714286l-0.02957142857142857 0.135A1.8334285714285714 1.8334285714285714 0 0 1 4.872857142857144 10.553142857142857c-1.272857142857143 0.22242857142857142 -1.9954285714285716 1.1404285714285716 -2.163857142857143 2.1510000000000002A4.745571428571429 4.745571428571429 0 0 1 4.242857142857143 3.705428571428572 5.6160000000000005 5.6160000000000005 0 0 1 6.48 1.026Z" clip-rule="evenodd"/><path id="Union" fill="currentColor" fill-rule="evenodd" d="M10.035 9.349714285714287c-0.25328571428571434 -1.1147142857142858 -1.8437142857142859 -1.1082857142857143 -2.088 0.009000000000000001l-0.010285714285714287 0.046285714285714284 -0.020571428571428574 0.09128571428571429A3.440571428571429 3.440571428571429 0 0 1 5.148 12.137142857142857c-1.161 0.20185714285714287 -1.161 1.8694285714285714 0 2.0700000000000003a3.440571428571429 3.440571428571429 0 0 1 2.7720000000000002 2.6550000000000002l0.025714285714285717 0.12471428571428572c0.2455714285714286 1.1172857142857144 1.836 1.1237142857142859 2.0892857142857144 0.009000000000000001l0.03342857142857143 -0.14400000000000002a3.4624285714285716 3.4624285714285716 0 0 1 2.7822857142857145 -2.640857142857143c1.1635714285714287 -0.20314285714285715 1.1635714285714287 -1.8732857142857144 0 -2.0764285714285715a3.4624285714285716 3.4624285714285716 0 0 1 -2.8028571428571434 -2.729571428571429l-0.012857142857142859 -0.055285714285714285Z" clip-rule="evenodd"/></g></svg>')}")`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center'
                  }}
                />
                <span
                  className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium"
                >
                  Krutrim AI
                </span>
              </div>
            </AnimatedGradientText>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hidden">
                <div className="relative flex items-center justify-center w-9 h-9 border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                  <BellIcon className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white">3</Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">VM Deployment Complete</div>
                  <div className="text-xs text-muted-foreground">Your VM instance is now running</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">Billing Alert</div>
                  <div className="text-xs text-muted-foreground">You've used 80% of your credits</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
                  <div className="font-medium">Maintenance Scheduled</div>
                  <div className="text-xs text-muted-foreground">Scheduled maintenance on June 15</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/notifications" className="w-full cursor-pointer text-center text-sm">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              <div className="flex items-center gap-3 px-3 py-2 border-b">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Sammy Shark</span>
                  <span className="text-xs text-muted-foreground">Owner</span>
                </div>
              </div>
              <div className="p-1">
                <div className="flex items-center px-3 py-2">
                  <Badge variant="outline" className="px-3 py-1.5 rounded-full bg-gray-50 border-gray-200 text-gray-700 font-medium text-xs">
                    Account Id - 7381739941
                  </Badge>
                </div>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="flex items-center gap-2 py-2 px-3 cursor-pointer" asChild>
                  <Link href="/dashboard/profile-completion">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem 
                  className="flex items-center gap-2 py-2 px-3 cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-100/50 dark:hover:bg-red-900/50"
                  onClick={logout}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
