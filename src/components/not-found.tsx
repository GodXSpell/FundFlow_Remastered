"use client"

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "@/lib/store";

import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";

export function NotFound({ className }: { className?: string }) {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className
      )}
    >
      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link href={isAuthenticated ? "/dashboard" : "/"}>
          Go to {isAuthenticated ? "Dashboard" : "Home"}
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
