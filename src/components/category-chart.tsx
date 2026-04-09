"use client"

import React, { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { useFundFlow } from "@/context/fund-flow-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle } from "lucide-react"

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b']

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const entry = payload[0]
    return (
      <div className="flex items-center gap-2 rounded-lg border bg-background p-3 shadow-md">
        <Circle fill={entry.payload.fill || entry.color || COLORS[0]} stroke="none" className="h-3 w-3" />
        <div className="flex flex-col">
          <span className="text-xs uppercase text-muted-foreground font-medium">
            {entry.payload.name}
          </span>
          <span className="font-bold text-foreground">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.value || 0)}
          </span>
        </div>
      </div>
    )
  }
  return null
}

export function CategoryChart() {
  const { transactions } = useFundFlow()

  const { spendingData, incomeData } = useMemo(() => {
    const outgoing = transactions.filter((t) => t.type === "Outgoing")
    const incoming = transactions.filter((t) => t.type === "Incoming")

    const sCats: Record<string, number> = {}
    const iCats: Record<string, number> = {}

    outgoing.forEach((t) => {
      sCats[t.category] = (sCats[t.category] || 0) + (t.amount || 0)
    })
    incoming.forEach((t) => {
      iCats[t.category] = (iCats[t.category] || 0) + (t.amount || 0)
    })

    return {
      spendingData: Object.entries(sCats)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value).slice(0, 5), // top 5
      incomeData: Object.entries(iCats)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value).slice(0, 5) // top 5
    }
  }, [transactions])

  const hasSpending = spendingData.length > 0
  const hasIncome = incomeData.length > 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="flex flex-col shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Spending Highlights</CardTitle>
          <CardDescription>Top expenses by category</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center pb-6">
          {hasSpending ? (
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={30}>
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={'hsl(var(--chart-1))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[250px] w-full items-center justify-center text-sm text-muted-foreground">
              Not enough data
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Income Sources</CardTitle>
          <CardDescription>Top earnings by category</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center pb-6">
          {hasIncome ? (
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={30}>
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={'hsl(var(--chart-2))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[250px] w-full items-center justify-center text-sm text-muted-foreground">
              Not enough data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
