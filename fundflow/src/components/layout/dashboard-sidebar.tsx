"use client"

import {
    BarChart3,
    CreditCard,
    DollarSign,
    Home,
    PiggyBank,
    Settings,
    Target,
    TrendingUp,
    Wallet,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
  {
    title: "Wallets",
    href: "/wallets",
    icon: Wallet,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
]

const quickActions = [
  {
    title: "Add Transaction",
    href: "/transactions/new",
    icon: DollarSign,
  },
  {
    title: "Create Budget",
    href: "/budgets/new",
    icon: PiggyBank,
  },
  {
    title: "Add Wallet",
    href: "/wallets/new",
    icon: Wallet,
  },
  {
    title: "Set Goal",
    href: "/goals/new",
    icon: Target,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6" />
          <span className="font-bold">FundFlow</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <h4 className="px-2 py-1 text-sm font-medium text-muted-foreground">
              Quick Actions
            </h4>
            {quickActions.map((action) => (
              <Button
                key={action.href}
                variant="ghost"
                className="w-full justify-start"
                size="sm"
                asChild
              >
                <Link href={action.href}>
                  <action.icon className="mr-2 h-3 w-3" />
                  {action.title}
                </Link>
              </Button>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}