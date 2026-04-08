"use client"

import { useSetAtom } from "jotai"
import { isAuthenticatedAtom } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
  const router = useRouter()

  const handleMockAuth = () => {
    setIsAuthenticated(true)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 border border-border/10 rounded-3xl bg-card shadow-2xl flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-4 tracking-tighter">Fund<span className="text-[#E67E6E] dark:text-[#9B4437]">Flow</span></h1>
        <p className="text-muted-foreground text-center mb-8">Begin your journey. (This is a mock dev portal)</p>
        
        <button 
          onClick={handleMockAuth}
          className="w-full bg-[#E67E6E] dark:bg-[#9B4437] text-white py-4 rounded-xl font-bold tracking-tight shadow-xl hover:opacity-90 transition-opacity"
        >
          Mock Signup As User
        </button>
        
        <a href="/" className="mt-6 text-sm text-[#64748B] hover:text-[#E67E6E] transition-colors">Return Home</a>
      </div>
    </div>
  )
}
