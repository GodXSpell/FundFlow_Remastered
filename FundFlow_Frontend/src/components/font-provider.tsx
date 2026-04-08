"use client"

import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { fontPreferenceAtom } from "@/lib/store"

export function FontProvider({ children }: { children: React.ReactNode }) {
  const fontChoice = useAtomValue(fontPreferenceAtom)

  useEffect(() => {
    // We map the choice to CSS variables mapped on document body
    // layout.tsx sets these predefined css variables securely.
    if (fontChoice === 'jetbrains') {
      document.body.style.setProperty('--font-sans', 'var(--font-jetbrains)')
    } else if (fontChoice === 'inter') {
      document.body.style.setProperty('--font-sans', 'var(--font-inter)')
    } else if (fontChoice === 'sans') {
      document.body.style.setProperty('--font-sans', 'system-ui, sans-serif')
    }
  }, [fontChoice])

  return <>{children}</>
}
