"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "hover:text-foreground",
                  index === items.length - 1 && "text-foreground font-medium"
                )}
              >
                {item.title}
              </Link>
            ) : (
              <span
                className={cn(
                  index === items.length - 1 && "text-foreground font-medium"
                )}
              >
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}