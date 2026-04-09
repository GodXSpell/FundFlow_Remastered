"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { RiFacebookFill, RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import { isAuthenticatedAtom } from "@/lib/store"
import { api } from "@/lib/api"

import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await api.auth.login({ email, password })
      if (data && data.token) {
        localStorage.setItem("token", data.token)
      }
      setIsAuthenticated(true)
      window.location.href = "/dashboard"
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">FundFlow</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to FundFlow</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" aria-label="Login with Google" size="icon">
              <RiGoogleFill size={16} aria-hidden="true" />
            </Button>
            <Button variant="outline" aria-label="Login with Facebook" size="icon">
              <RiFacebookFill size={16} aria-hidden="true" />
            </Button>
            <Button variant="outline" aria-label="Login with X" size="icon">
              <RiTwitterXFill size={16} aria-hidden="true" />
            </Button>
            <Button variant="outline" aria-label="Login with GitHub" size="icon">
              <RiGithubFill size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
