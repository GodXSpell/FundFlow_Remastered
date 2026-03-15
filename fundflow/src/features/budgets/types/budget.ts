export interface Budget {
  id: string
  name: string
  description?: string
  amount: number
  spent: number
  remaining: number
  period: BudgetPeriod
  startDate: string
  endDate: string
  categories: string[]
  alerts: BudgetAlert[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface BudgetPeriod {
  type: "weekly" | "monthly" | "quarterly" | "yearly" | "custom"
  startDay?: number // For weekly budgets (0 = Sunday, 1 = Monday, etc.)
  startDate?: string // For custom periods
  endDate?: string // For custom periods
}

export interface BudgetAlert {
  id: string
  threshold: number // Percentage (e.g., 80 for 80%)
  type: "warning" | "critical"
  isTriggered: boolean
  triggeredAt?: string
}

export interface BudgetProgress {
  budgetId: string
  percentage: number
  amountSpent: number
  amountRemaining: number
  daysRemaining: number
  dailyAverage: number
  projectedOverage?: number
  isOnTrack: boolean
}

export interface BudgetTemplate {
  id: string
  name: string
  description: string
  categories: BudgetCategoryTemplate[]
  totalAmount: number
  period: BudgetPeriod
}

export interface BudgetCategoryTemplate {
  categoryId: string
  categoryName: string
  percentage: number
  amount: number
}