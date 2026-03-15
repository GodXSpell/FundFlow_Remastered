"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

// Custom Portfolio-style diagonal separator
interface PortfolioSeparatorProps {
  className?: string
}

const PortfolioSeparator = React.forwardRef<
  HTMLDivElement,
  PortfolioSeparatorProps
>(({ className }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("relative flex h-8 w-full border-x border-border/20", className)}
    >
      <div 
        className="flex-1"
        style={{
          background: `repeating-linear-gradient(
            315deg,
            transparent,
            transparent 4px,
            hsl(var(--border) / 0.1) 4px,
            hsl(var(--border) / 0.1) 8px
          )`,
          maskImage: "linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent)"
        }}
      />
    </div>
  )
})
PortfolioSeparator.displayName = "PortfolioSeparator"

export { PortfolioSeparator, Separator }

