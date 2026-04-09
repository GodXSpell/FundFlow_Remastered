"use client"

import { useFundFlow } from "@/context/fund-flow-context"
import { ActivityIcon, ArrowLeftRightIcon, TargetIcon, WalletIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  const { accounts, transactions, budgets, user } = useFundFlow()

  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: user?.currency || "USD",
  })

  // 1. Total balance
  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance ?? 0), 0)

  // 2. Total spent (Outgoing)
  const totalSpent = transactions
    .filter((t) => t.type === "Outgoing")
    .reduce((sum, t) => sum + t.amount, 0)

  // 3. Income to expense ratio
  const totalIncome = transactions
    .filter((t) => t.type === "Incoming")
    .reduce((sum, t) => sum + t.amount, 0)

  let ratioText = "0"
  let ratioSubText = "No income or expenses"

  if (totalSpent === 0 && totalIncome > 0) {
    ratioText = "100% Savings"
    ratioSubText = "No expenses this period"
  } else if (totalIncome === 0 && totalSpent > 0) {
    ratioText = "0.0x"
    ratioSubText = "No income this period"
  } else if (totalIncome > 0 && totalSpent > 0) {
    const ratio = totalIncome / totalSpent
    ratioText = `${ratio.toFixed(1)}x`
    ratioSubText = "Income relative to expenses"
  }

  // 4. At-Risk Budgets
  const totalBudgets = budgets.length
  // Metrics calculation
  const now = new Date()
  
  const thirtyDaysAgo = new Date(now)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const sixtyDaysAgo = new Date(now)
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

  // 1. Total balance trend (net change past 30 days)
  const balanceNet30d = transactions
    .filter(t => new Date(t.date) >= thirtyDaysAgo)
    .reduce((sum, t) => sum + (t.type === "Incoming" ? t.amount : -t.amount), 0)
  const balanceTrendColor = balanceNet30d > 0 ? "text-emerald-500" : balanceNet30d < 0 ? "text-red-500" : "text-muted-foreground"
  const BalanceIcon = balanceNet30d > 0 ? TrendingUpIcon : balanceNet30d < 0 ? TrendingDownIcon : MinusIcon

  // 2. Total spent trend (last 30d vs prev 30d)
  const spentLast30d = transactions
    .filter(t => t.type === "Outgoing" && new Date(t.date) >= thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)
  const spentPrev30d = transactions
    .filter(t => t.type === "Outgoing" && new Date(t.date) >= sixtyDaysAgo && new Date(t.date) < thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)
  
  let spentTrend = 0
  let spentTrendText = "No prior data"
  if (spentPrev30d > 0) {
    spentTrend = ((spentLast30d - spentPrev30d) / spentPrev30d) * 100
    spentTrendText = `${Math.abs(spentTrend).toFixed(1)}% from last month`
  } else if (spentLast30d > 0) {
    spentTrendText = "+100% from last month"
    spentTrend = 100
  }
  
  // For spending, down is good (emerald), up is bad (red)
  const spentTrendColor = spentTrend > 0 ? "text-red-500" : spentTrend < 0 ? "text-emerald-500" : "text-muted-foreground"
  const SpentIcon = spentTrend > 0 ? TrendingUpIcon : spentTrend < 0 ? TrendingDownIcon : MinusIcon

  // 3. Income to expense ratio trend
  const incomeLast30d = transactions
    .filter(t => t.type === "Incoming" && new Date(t.date) >= thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)
  const incomePrev30d = transactions
    .filter(t => t.type === "Incoming" && new Date(t.date) >= sixtyDaysAgo && new Date(t.date) < thirtyDaysAgo)
    .reduce((sum, t) => sum + t.amount, 0)

  const ratioLast30d = spentLast30d === 0 ? (incomeLast30d > 0 ? 100 : 0) : incomeLast30d / spentLast30d
  const ratioPrev30d = spentPrev30d === 0 ? (incomePrev30d > 0 ? 100 : 0) : incomePrev30d / spentPrev30d
  
  const ratioDiff = ratioLast30d - ratioPrev30d
  const ratioTrendText = ratioPrev30d === 0 && ratioLast30d === 0 ? "No change" : `${ratioDiff > 0 ? '+' : ''}${ratioDiff.toFixed(1)}x from last month`
  const ratioTrendColor = ratioDiff > 0 ? "text-emerald-500" : ratioDiff < 0 ? "text-red-500" : "text-muted-foreground"
  const RatioIcon = ratioDiff > 0 ? TrendingUpIcon : ratioDiff < 0 ? TrendingDownIcon : MinusIcon

  const atRiskBudgets = budgets.filter(b => b.total > 0 && (b.spent / b.total) >= 0.8).length
  const atRiskText = `${atRiskBudgets} / ${totalBudgets}`
  const atRiskSubText = totalBudgets === 0 ? "No budgets tracked" : "Budgets >= 80% spent"

  return (
    <div className="grid grid-cols-1 gap-4 px-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 lg:px-6 *:data-[slot=card]:shadow-xs">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {currencyFormatter.format(totalBalance)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <WalletIcon className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className={`flex items-center gap-1 font-medium ${balanceTrendColor}`}>
            <BalanceIcon className="size-4" />
            {balanceNet30d >= 0 ? "+" : ""}{currencyFormatter.format(balanceNet30d)}
          </div>
          <div className="text-muted-foreground">
            Across {accounts.length} linked account{accounts.length !== 1 ? 's' : ''}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Spent</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {currencyFormatter.format(totalSpent)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <ActivityIcon className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className={`flex items-center gap-1 font-medium ${spentTrendColor}`}>
            <SpentIcon className="size-4" />
            <span>{spentTrend === 0 && spentTrendText !== "No prior data" ? "No change" : spentTrendText}</span>
          </div>
          <div className="text-muted-foreground">
            Sum of all outgoing transactions
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Income to Expense</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {ratioText}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <ArrowLeftRightIcon className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className={`flex items-center gap-1 font-medium ${ratioTrendColor}`}>
            <RatioIcon className="size-4" />
            <span>{ratioTrendText}</span>
          </div>
          <div className="text-muted-foreground">
            {ratioSubText}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>At-Risk Budgets</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {atRiskText}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <TargetIcon className="size-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className={`flex items-center gap-1 font-medium ${atRiskBudgets > 0 ? "text-amber-500" : "text-emerald-500"}`}>
            {atRiskBudgets > 0 ? <TrendingUpIcon className="size-4" /> : <MinusIcon className="size-4" />}
            {atRiskBudgets > 0 ? "Requires attention" : "All good"}
          </div>
          <div className="text-muted-foreground">
            {atRiskSubText}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
