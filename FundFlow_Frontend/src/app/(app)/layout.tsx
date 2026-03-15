import React from 'react'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Full-width container with side borders */}
      <div className="relative border-x border-border/20">
        {/* Centered content container */}
        <div className="mx-auto max-w-3xl">
          {/* Header would go here */}
          <main className="relative">
            {children}
          </main>
          {/* Footer would go here */}
        </div>
      </div>
    </div>
  )
}