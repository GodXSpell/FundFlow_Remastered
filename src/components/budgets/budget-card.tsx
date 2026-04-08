import { Progress } from "@/components/ui/progress"
import { cn } from "@/components/lib/utils"
import { AlertCircle, MoreHorizontal } from "lucide-react"

interface BudgetCardProps {
    name: string
    spent: number
    total: number
    color?: string // e.g., "bg-blue-500"
    icon?: React.ReactNode
}

export function BudgetCard({ name, spent, total, color = "bg-primary", icon }: BudgetCardProps) {
    const percentage = Math.min((spent / total) * 100, 100)

    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {icon && <div className={cn("p-1.5 rounded-md bg-muted text-muted-foreground", color && `bg-opacity-10 text-${color.split('-')[1]}-500`)}>{icon}</div>}
                    <h4 className="font-semibold tracking-tight text-sm">{name}</h4>
                </div>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                </button>
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

                <Progress value={percentage} className="h-2" indicatorClassName={cn(color)} />

                <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-muted-foreground">
                        {percentage.toFixed(0)}% Used
                    </span>
                    {percentage >= 90 && (
                        <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium animate-pulse">
                            <AlertCircle className="h-3 w-3" />
                            <span>Near Limit</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
