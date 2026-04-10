"use client"

import {
  Calculator,
  CreditCard,
  FileText,
  Home,
  Landmark,
  LayoutDashboard,
  Moon,
  PieChart,
  Settings,
  Sun,
  Target,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Type
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useAtom } from "jotai"
import { isAuthenticatedAtom, fontPreferenceAtom, FontChoice, isSettingsOpenAtom, isCommandMenuOpenAtom } from "@/lib/store"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = useAtom(isCommandMenuOpenAtom)
  const { setTheme } = useTheme()
  const router = useRouter()
  
  // Connect to Jotai atomic global states
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom)
  const [fontChoice, setFontChoice] = useAtom(fontPreferenceAtom)
  const [, setIsSettingsOpen] = useAtom(isSettingsOpenAtom)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput autoFocus placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* =========================================
            GUEST / UN-AUTHENTICATED ROUTES 
            ========================================= */}
        {!isAuthenticated && (
          <CommandGroup>
            <CommandItem value="home" onSelect={() => runCommand(() => router.push('/'))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem value="login" onSelect={() => runCommand(() => router.push('/login'))}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </CommandItem>
            <CommandItem value="signup" onSelect={() => runCommand(() => router.push('/signup'))}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Signup</span>
            </CommandItem>
          </CommandGroup>
        )}

        {/* =========================================
            AUTHENTICATED ROUTES 
            ========================================= */}
        {isAuthenticated && (
          <>
            <CommandGroup heading="Dashboard">
              <CommandItem value="dashboard overview" onSelect={() => runCommand(() => router.push('/dashboard'))}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Overview</span>
              </CommandItem>
              <CommandItem value="bank accounts" onSelect={() => runCommand(() => router.push('/dashboard/accounts'))}>
                <Landmark className="mr-2 h-4 w-4" />
                <span>Bank Accounts</span>
              </CommandItem>
              <CommandItem value="transactions" onSelect={() => runCommand(() => router.push('/dashboard/transactions'))}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Transactions</span>
              </CommandItem>
              <CommandItem value="budgets" onSelect={() => runCommand(() => router.push('/dashboard/budgets'))}>
                <PieChart className="mr-2 h-4 w-4" />
                <span>Budgets</span>
              </CommandItem>
              <CommandItem value="reports" onSelect={() => runCommand(() => router.push('/dashboard/reports'))}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Reports</span>
              </CommandItem>
              {/* To be implemented
              <CommandItem value="savings goals" onSelect={() => runCommand(() => router.push('/dashboard/savings'))}>
                <Target className="mr-2 h-4 w-4" />
                <span>Savings & Goals</span>
              </CommandItem>
              */}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem value="profile" onSelect={() => runCommand(() => setIsSettingsOpen(true))}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem value="settings" onSelect={() => runCommand(() => setIsSettingsOpen(true))}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
              <CommandItem value="logout sign out" onSelect={() => runCommand(() => {
                localStorage.removeItem("token")
                setIsAuthenticated(false)
                window.location.href = '/'
              })}>
                <LogOut className="mr-2 h-4 w-4 text-[#E67E6E] dark:text-[#9B4437]" />
                <span className="text-[#E67E6E] dark:text-[#9B4437]">Logout</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        
        {/* =========================================
            GLOBAL PREFERENCES 
            ========================================= */}
        <CommandGroup heading="Theme Preferences">
          <CommandItem value="light mode theme sun" onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem value="dark mode theme moon" onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
          <CommandItem value="system mode theme auto" onSelect={() => runCommand(() => setTheme("system"))}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>System Mode</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Typography Settings">
          <CommandItem value="font typography jetbrains developer code monospace" onSelect={() => runCommand(() => setFontChoice('jetbrains'))}>
            <Type className="mr-2 h-4 w-4" />
            <span>Developer Code Font (JetBrains)</span>
            {fontChoice === 'jetbrains' && <span className="ml-auto text-xs opacity-50">Active</span>}
          </CommandItem>
          <CommandItem value="font typography inter modern standard" onSelect={() => runCommand(() => setFontChoice('inter'))}>
            <Type className="mr-2 h-4 w-4" />
            <span>Modern Standard Font (Inter)</span>
            {fontChoice === 'inter' && <span className="ml-auto text-xs opacity-50">Active</span>}
          </CommandItem>
          <CommandItem value="font typography default sans serif ui" onSelect={() => runCommand(() => setFontChoice('sans'))}>
            <Type className="mr-2 h-4 w-4" />
            <span>System Browser Default (Sans-Serif)</span>
            {fontChoice === 'sans' && <span className="ml-auto text-xs opacity-50">Active</span>}
          </CommandItem>
        </CommandGroup>

      </CommandList>
    </CommandDialog>
  )
}
