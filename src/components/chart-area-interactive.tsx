"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/components/hooks/use-mobile"
import { useFundFlow } from "@/context/fund-flow-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const { transactions } = useFundFlow()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const isDemo = transactions.length === 0;

  const aggregatedData = React.useMemo(() => {
    if (isDemo) {
      const demo: any[] = [];
      const baseDate = new Date();
      for (let i = 90; i >= 0; i--) {
        const d = new Date(baseDate);
        d.setDate(d.getDate() - i);
        // Base income/expense around 2k varying a bit
        demo.push({
          date: d.toISOString().split("T")[0],
          income: Math.floor(Math.random() * 2000 + 3000),
          expenses: Math.floor(Math.random() * 2500 + 1000)
        });
      }
      return demo;
    }

    const dataMap: Record<string, { income: number; expenses: number }> = {}
    
    transactions.forEach(t => {
      const d = new Date(t.date)
      const dateStr = d.toISOString().split("T")[0]
      
      if (!dataMap[dateStr]) {
        dataMap[dateStr] = { income: 0, expenses: 0 }
      }
      
      if (t.type === "Incoming") {
        dataMap[dateStr].income += t.amount
      } else {
        dataMap[dateStr].expenses += t.amount
      }
    })
    
    return Object.entries(dataMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [transactions])

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    startDate.setHours(0, 0, 0, 0)
    
    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)

    // Generate a dense array of all dates in the range
    const denseData = []
    const dataMapByDate = Object.fromEntries(aggregatedData.map(item => [item.date, item]))

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]
      denseData.push(dataMapByDate[dateStr] || { date: dateStr, income: 0, expenses: 0 })
    }

    return denseData
  }, [aggregatedData, timeRange])

  return (
    <Card className="@container/card">
      <CardHeader className="relative flex flex-col items-start space-y-2 pb-6 w-full">
        <div>
          <CardTitle className="flex items-center gap-2">
            Cash Flow {isDemo && <span className="text-[10px] uppercase font-bold tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">Demo Data</span>}
          </CardTitle>
          <CardDescription>
            <span className="@[540px]/card:block hidden">
              Overview for the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
            </span>
            <span className="@[540px]/card:hidden">Last {timeRange.replace("d", " days")}</span>
          </CardDescription>
        </div>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => { if (value) setTimeRange(value) }}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const dateStr = new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                    return isDemo ? `Demo Data (Income/Expenses) - ${dateStr}` : dateStr
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
