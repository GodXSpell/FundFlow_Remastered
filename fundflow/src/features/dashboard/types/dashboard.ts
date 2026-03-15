export interface DashboardData {
  summary: DashboardSummary
  recentTransactions: Transaction[]
  budgetProgress: BudgetProgress[]
  goalProgress: GoalProgress[]
  quickStats: QuickStats
  alerts: DashboardAlert[]
}

export interface DashboardSummary {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  netWorth: number
  lastUpdated: string
}

export interface QuickStats {
  transactionsThisMonth: number
  categoriesUsed: number
  avgTransactionAmount: number
  topSpendingCategory: string
}

export interface DashboardAlert {
  id: string
  type: "budget_exceeded" | "goal_behind" | "unusual_spending" | "low_balance"
  title: string
  message: string
  severity: "info" | "warning" | "error"
  actionUrl?: string
  dismissible: boolean
  createdAt: string
}

// Re-export types from other features
export type { BudgetProgress } from "../budgets/types/budget"
export type { GoalProgress } from "../goals/types/goal"
export type { Transaction } from "../transactions/types/transaction"
