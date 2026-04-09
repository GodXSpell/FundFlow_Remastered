import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Persistent authentication state
export const isAuthenticatedAtom = atomWithStorage<boolean>('isAuthenticated', false)

// Global font preference state
export type FontChoice = 'jetbrains' | 'inter' | 'sans'
export const fontPreferenceAtom = atomWithStorage<FontChoice>('fontPreference', 'jetbrains')
