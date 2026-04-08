import { atom } from 'jotai'

// Mock authentication state
export const isAuthenticatedAtom = atom<boolean>(false)

// Global font preference state
export type FontChoice = 'jetbrains' | 'inter' | 'sans'
export const fontPreferenceAtom = atom<FontChoice>('jetbrains')
