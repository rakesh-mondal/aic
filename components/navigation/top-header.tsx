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
                  className="inline-flex w-4 h-4 animate-pulse"
                  style={{ 
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    background: 'linear-gradient(90deg, #ffaa40, #9c40ff, #ffaa40)',
                    backgroundSize: 'var(--bg-size) 100%',
                    mask: `url("data:image/svg+xml,${encodeURIComponent('<svg width="669" height="524" viewBox="0 0 669 524" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M356.788 315.869H315.249L321.352 237.849L368.6 225.316L356.788 315.869Z" fill="currentColor"/><path d="M583.908 292.903C555.953 329.321 521.436 359.308 483.178 384.571C436.323 415.478 385.99 442.578 352.26 489.167C345.501 498.485 338.808 509.902 332.508 522.501C565.6 510.952 628.335 315.278 630.173 216.523C628.466 216.523 626.891 216.72 625.185 216.785C611.404 242.114 601.036 270.461 583.843 292.903H583.908Z" fill="currentColor"/><path d="M350.423 287.85C353.179 297.036 355.345 306.354 356.723 315.869C357.576 315.016 357.904 310.554 358.166 309.307C359.61 301.827 361.316 294.28 363.613 287.062C368.6 271.38 375.688 256.419 384.743 242.704C414.274 198.478 471.103 168.031 523.076 158.057C494.137 152.086 455.944 140.668 432.058 123.017C391.306 92.8979 364.729 50.7053 357.051 0.179199C356.263 1.03224 355.935 5.16621 355.673 6.47858C354.295 13.8278 352.654 21.1771 350.423 28.2638C345.698 43.4217 339.005 57.8577 330.474 71.1782C308.096 105.693 275.679 132.334 237.683 147.492C226.068 152.086 214.125 155.301 201.984 158.057C230.268 163.569 257.042 175.183 280.469 192.113C313.018 215.735 338.414 249.135 350.488 287.915L350.423 287.85Z" fill="currentColor"/><path d="M668.168 217.507C626.367 214.685 566.519 211.864 483.309 274.595C368.995 360.883 367.354 499.075 367.485 515.086C367.682 546.976 342.155 366.001 248.052 280.303C177.114 215.735 82.2232 211.011 12.6631 216.457C19.2254 246.379 45.8026 382.34 175.079 465.019C217.603 492.251 241.161 506.949 260.192 514.889C270.757 505.243 286.113 501.175 300.616 504.456C311.772 507.015 291.625 510.886 296.941 520.401C314.921 520.401 367.157 524.01 367.157 524.01C367.288 524.01 367.354 524.01 367.485 524.01C367.616 524.01 367.682 524.01 367.813 524.01C614.883 521.319 666.265 318.559 668.168 217.376V217.507Z" fill="currentColor"/><path d="M357.116 0.179199H315.577C315.577 0.179199 323.911 75.509 331.983 78.9212C340.054 82.3333 356.919 70.0627 356.919 70.0627C356.919 70.0627 359.61 12.9092 357.116 0.244832V0.179199Z" fill="currentColor"/><path d="M630.238 216.523C628.335 317.641 562.713 520.467 315.643 523.157C315.512 523.157 315.446 523.157 315.315 523.157C315.184 523.157 315.118 523.157 314.987 523.157C67.9172 520.467 2.29466 317.706 0.391602 216.523C240.768 221.838 309.737 411.672 315.315 514.168C320.893 411.672 389.862 221.904 630.238 216.523ZM315.578 0.179377C323.255 50.6399 349.898 92.8324 390.584 123.017C414.471 140.668 441.573 152.086 470.578 158.057C418.671 168.031 372.801 198.478 343.27 242.705C334.214 256.419 327.127 271.314 322.14 287.063C319.843 294.346 318.071 301.827 316.693 309.307C316.431 310.62 316.102 315.082 315.249 315.869C313.806 306.42 311.706 297.037 308.95 287.85C296.941 249.135 271.479 215.67 238.93 192.047C215.503 175.118 188.729 163.503 160.445 157.991C172.586 155.301 184.529 152.02 196.144 147.427C234.14 132.269 266.623 105.628 288.935 71.1128C297.466 57.7923 304.159 43.3562 308.884 28.1984C311.115 21.1116 312.821 13.6968 314.134 6.41312C314.396 5.10075 314.724 0.966807 315.512 0.11377L315.578 0.179377Z" fill="currentColor"/><path d="M390.584 122.951C375.622 111.862 362.629 99.1975 351.736 85.0239C350.751 100.182 348.258 114.946 344.255 128.66C333.427 165.866 303.7 193.229 291.231 229.581C289.657 234.174 288.541 238.636 287.557 243.098C296.613 256.944 303.962 271.905 308.884 287.85C311.64 297.037 313.806 306.354 315.184 315.869C316.037 315.016 316.365 310.554 316.627 309.307C318.071 301.827 319.777 294.281 322.074 287.063C327.062 271.38 334.149 256.419 343.205 242.705C372.735 198.478 418.54 168.031 470.513 158.057C441.573 152.086 414.405 140.668 390.519 123.017L390.584 122.951Z" fill="currentColor"/><path d="M308.949 287.85C311.705 297.036 313.871 306.354 315.249 315.869C316.102 315.016 316.43 310.554 316.693 309.307C318.136 301.827 319.843 294.28 322.14 287.062C327.127 271.38 334.214 256.419 343.27 242.704C372.8 198.478 418.605 168.031 470.578 158.057C441.638 152.086 414.471 140.668 390.584 123.017C349.832 92.8979 323.255 50.7053 315.577 0.179199C314.79 1.03224 314.462 5.16621 314.199 6.47858C312.821 13.8278 311.18 21.1771 308.949 28.2638C304.224 43.4217 297.531 57.8577 289 71.1782C266.623 105.693 234.205 132.334 196.21 147.492C184.594 152.086 172.651 155.301 160.511 158.057C188.794 163.569 215.568 175.183 238.995 192.113C271.544 215.735 296.94 249.135 309.015 287.915L308.949 287.85Z" fill="currentColor"/><path d="M390.584 122.951C360.726 100.838 338.545 72.1625 325.749 38.5659C334.411 89.4201 346.223 141.521 323.649 188.241C312.296 211.667 298.122 228.268 292.281 250.579C299.172 262.324 304.881 274.726 308.949 287.85C311.706 297.036 313.871 306.354 315.249 315.869C316.102 315.016 316.43 310.554 316.693 309.307C318.137 301.827 319.843 294.28 322.14 287.062C327.127 271.38 334.214 256.419 343.27 242.704C372.8 198.478 418.605 168.031 470.578 158.057C441.639 152.086 414.471 140.668 390.584 123.017V122.951Z" fill="currentColor"/></svg>')}")`,
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
