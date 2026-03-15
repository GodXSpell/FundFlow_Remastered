"use client"

import Link from "next/link"


export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">FundFlow</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Take control of your financial future with modern tools and insights.
                Track expenses, set budgets, and reach your financial goals.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-foreground">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-foreground">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2024 FundFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}