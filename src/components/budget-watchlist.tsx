"use client"

import React, { useMemo } from "react"
import { useFundFlow } from "@/context/fund-flow-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetCard } from "@/components/budgets/budget-card"

export function BudgetWatchlist() {
  const { budgets } = useFundFlow()

  const watchlist = useMemo(() => {
    return budgets.filter((budget) => {
      if (!budget.total || budget.total === 0) return false
      return (budget.spent / budget.total) >= 0.8
    })
  }, [budgets])

  return (
    <Card className="flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle>Budget Watchlist</CardTitle>
        <CardDescription>Budgets nearing their limit (80% or more)</CardDescription>
      </CardHeader>
      <CardContent>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {watchlist.map((budget) => (
              <BudgetCard key={budget.id} {...budget} />
            ))}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center py-8 text-sm text-muted-foreground">
            <p>All budgets are looking healthy!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
