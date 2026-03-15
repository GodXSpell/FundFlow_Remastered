import { cn } from '@/lib/utils'
import React from 'react'
import { PortfolioSeparator } from './separator'

interface SectionProps {
  children: React.ReactNode
  withSeparator?: boolean
  className?: string
  separatorClassName?: string
}

export function Section({ 
  children, 
  withSeparator = true,
  className,
  separatorClassName
}: SectionProps) {
  return (
    <>
      <section className={cn("py-16 px-6", className)}>
        <div className="space-y-8">
          {children}
        </div>
      </section>
      {withSeparator && <PortfolioSeparator className={separatorClassName} />}
    </>
  )
}

export function HeroSection({ 
  children, 
  withSeparator = true,
  className,
  separatorClassName
}: SectionProps) {
  return (
    <>
      <section className={cn("py-24 px-6", className)}>
        <div className="space-y-12">
          {children}
        </div>
      </section>
      {withSeparator && <PortfolioSeparator className={separatorClassName} />}
    </>
  )
}

export function CompactSection({ 
  children, 
  withSeparator = true,
  className,
  separatorClassName
}: SectionProps) {
  return (
    <>
      <section className={cn("py-8 px-6", className)}>
        <div className="space-y-6">
          {children}
        </div>
      </section>
      {withSeparator && <PortfolioSeparator className={separatorClassName} />}
    </>
  )
}