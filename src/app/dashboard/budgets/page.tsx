"use client"

import { AccountSummary } from "@/components/budgets/account-summary"
import { AddAccountDialog } from "@/components/budgets/add-account-dialog"
import { BudgetGroup } from "@/components/budgets/budget-group"
import { useFundFlow } from "@/context/fund-flow-context"
import { Home } from "lucide-react"

export default function Page() {
    const { budgets } = useFundFlow()

    const groupedBudgets = budgets.reduce((acc, budget) => {
        if (!acc[budget.group]) {
            acc[budget.group] = []
        }
        acc[budget.group].push({
            ...budget,
            icon: <Home className="h-4 w-4" /> // Static icon for now as we don't store component in context
        })
        return acc
    }, {} as Record<string, any[]>)

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Budgets & Accounts</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your bank accounts and track your monthly spending limits.
                    </p>
                </div>
                <AddAccountDialog />
            </div>

            <AccountSummary />

            <div className="grid gap-6">
                {Object.entries(groupedBudgets).map(([groupName, groupBudgets]) => (
                    <BudgetGroup key={groupName} title={groupName} budgets={groupBudgets} />
                ))}
            </div>
        </div>
    )
}
