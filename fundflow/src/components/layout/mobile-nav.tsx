"use client"

import Link from "next/link"

import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="flex flex-col space-y-3">
        <Link href="/" className="flex items-center">
          <span className="font-bold">FundFlow</span>
        </Link>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-3 pt-6">
          <h4 className="font-medium">Navigation</h4>
          <Link href="/" className="text-muted-foreground">
            Home
          </Link>
          <Link href="/features" className="text-muted-foreground">
            Features
          </Link>
          <Link href="/pricing" className="text-muted-foreground">
            Pricing
          </Link>
          <Link href="/about" className="text-muted-foreground">
            About
          </Link>
        </div>
        <div className="flex flex-col space-y-3 pt-6">
          <h4 className="font-medium">Account</h4>
          <Link href="/login" className="text-muted-foreground">
            Login
          </Link>
          <Link href="/register" className="text-muted-foreground">
            Sign Up
          </Link>
          <Link href="/dashboard" className="text-muted-foreground">
            Dashboard
          </Link>
        </div>
      </div>
    </ScrollArea>
  )
}