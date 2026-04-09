"use client"

import { useFundFlow } from "@/context/fund-flow-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ReportsPage() {
    const { transactions, budgets } = useFundFlow()

    // Assuming we are looking at the current year and month for simplicity
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    const expenses = transactions.filter(t => t.type === "Outgoing")
    const income = transactions.filter(t => t.type === "Incoming")

    const spentThisMonth = expenses
        .filter(t => new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + t.amount, 0)
        
    const spentThisYear = expenses
        .filter(t => new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + t.amount, 0)

    const earnedThisMonth = income
        .filter(t => new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + t.amount, 0)

    const earnedThisYear = income
        .filter(t => new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + t.amount, 0)

    const biggestSpending = expenses.length > 0 
        ? expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]) 
        : null

    const topIncomeSource = income.length > 0
        ? income.reduce((max, t) => t.amount > max.amount ? t : max, income[0])
        : null

    const frequency = expenses.length

    let budgetsFollowedCount = 0
    budgets.forEach(b => {
        if (b.spent <= b.total) budgetsFollowedCount++
    })
    
    const followPercentage = budgets.length > 0 ? Math.round((budgetsFollowedCount / budgets.length) * 100) : 0

    if (transactions.length === 0) {
        return (
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 items-center justify-center min-h-[50vh]">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight">Not Enough Data</h2>
                    <p className="text-sm text-muted-foreground w-[60%]">
                        You have not put sufficient data yet. Please add more transactions and budgets to generate comprehensive reports and analytics.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Reports & Analytics</h2>
                <p className="text-sm text-muted-foreground">
                    A brief overview of your spending habits and budget adherence.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Earned This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-500">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(earnedThisMonth)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spent This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spentThisMonth)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Budget Adherence</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{followPercentage}%</div>
                        <p className="text-xs text-muted-foreground">
                            Followed {budgetsFollowedCount} of {budgets.length} budgets
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Biggest Spending</CardTitle>
                        <CardDescription>Your largest single expense.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {biggestSpending ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border">
                                    <div>
                                        <div className="font-semibold">{biggestSpending.name}</div>
                                        <div className="text-xs text-muted-foreground">{biggestSpending.category} · {biggestSpending.date}</div>
                                    </div>
                                    <div className="text-xl font-bold text-red-500">
                                        -{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(biggestSpending.amount)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground py-4 text-center">No expenses recorded yet.</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Top Income Source</CardTitle>
                        <CardDescription>Your highest single income amount.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topIncomeSource ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-xl border border-emerald-500/20">
                                    <div>
                                        <div className="font-semibold">{topIncomeSource.name}</div>
                                        <div className="text-xs text-muted-foreground">{topIncomeSource.category} · {topIncomeSource.date}</div>
                                    </div>
                                    <div className="text-xl font-bold text-emerald-500">
                                        +{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(topIncomeSource.amount)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground py-4 text-center">No income recorded yet.</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Financial Summary</CardTitle>
                        <CardDescription>A complete high-level overview of your wealth journey.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-sm text-foreground leading-relaxed">
                            This month, you have accumulated <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(earnedThisMonth)}</strong> in total income. 
                            Based on your recent activity, you have spent <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spentThisMonth)}</strong>. 
                            Your largest single expense was for <strong>{biggestSpending?.name || "nothing"}</strong>, consuming <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(biggestSpending?.amount || 0)}</strong>. 
                            Currently, you are accurately adhering to <strong>{followPercentage}%</strong> of the budgets you have set for yourself. Keep growing your wealth!
                         </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}