import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddBudgetDialog } from "./add-budget-dialog"
import { BudgetCard } from "./budget-card"
import { Budget } from "@/context/fund-flow-context"

interface BudgetGroupProps {
    title: string
    budgets: (Budget & { icon?: React.ReactNode })[]
}

export function BudgetGroup({ title, budgets }: BudgetGroupProps) {
    const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0)
    const totalBudget = budgets.reduce((acc, curr) => acc + curr.total, 0)

    return (
        <Card className="border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSpent)} / {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBudget)}
                    </p>
                </div>
                <AddBudgetDialog defaultGroup={title} />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-2">
                {budgets.map((budget, index) => (
                    <BudgetCard key={index} {...budget} />
                ))}
                {/* Empty State / Add New Placeholder if needed */}
                {budgets.length === 0 && (
                    <div className="col-span-full py-8 text-center text-sm text-muted-foreground border-2 border-dashed rounded-xl">
                        No budgets in this group.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
