"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { useFundFlow } from "@/context/fund-flow-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecentTransactions() {
  const { transactions } = useFundFlow()

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
  }, [transactions])

  const hasData = recent.length > 0

  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/transactions">View all</Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        {hasData ? (
          <div className="space-y-0 divide-y pt-2">
            {recent.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium leading-none">{txn.name}</span>
                  <span className="text-xs text-muted-foreground">{txn.category} • {new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}</span>
                </div>
                <div className="font-medium flex items-center justify-end">
                  <span className={txn.type === "Outgoing" ? "text-destructive" : "text-emerald-500"}>
                    {txn.type === "Outgoing" ? "-" : "+"}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(txn.amount || 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center text-sm text-muted-foreground">
            <p>Not enough data</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
