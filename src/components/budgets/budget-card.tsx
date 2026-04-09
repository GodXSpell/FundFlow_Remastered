import { Progress } from "@/components/ui/progress"
import { cn } from "@/components/lib/utils"
import { AlertCircle, MoreHorizontal } from "lucide-react"

import { EditBudgetDialog } from "./edit-budget-dialog"

interface BudgetCardProps {
    id: string
    name: string
    spent: number
    total: number
    color?: string // e.g., "bg-blue-500"
    icon?: React.ReactNode
    group: string
}

export function BudgetCard({ id, name, spent, total, color = "bg-primary", icon, group }: BudgetCardProps) {
    const percentage = Math.min((spent / total) * 100, 100)
    
    let progressColor = "bg-green-500"
    if (percentage >= 95) {
        progressColor = "bg-red-500"
    } else if (percentage >= 80) {
        progressColor = "bg-amber-500"
    }

    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {icon && <div className={cn("p-1.5 rounded-md bg-muted text-muted-foreground", color && `bg-opacity-10 text-${color.split('-')[1]}-500`)}>{icon}</div>}
                    <h4 className="font-semibold tracking-tight text-sm">{name}</h4>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditBudgetDialog budget={{ id, name, spent, total, color, group }} />
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)}
                    </span>
                    <span className="text-muted-foreground">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                    </span>
                </div>

                <Progress value={percentage} className="h-2" indicatorClassName={cn(progressColor)} />

                <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-muted-foreground">
                        {Math.round((spent / total) * 100)}% Used
                    </span>
                    {percentage >= 80 && (
                        <div className={cn("flex items-center gap-1 text-[10px] font-medium animate-pulse", percentage >= 100 ? "text-red-500" : "text-orange-500")}>
                            <AlertCircle className="h-3 w-3" />
                            <span>{percentage >= 100 ? "Limit Reached" : "Near Limit"}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
