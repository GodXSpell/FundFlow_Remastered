export interface AnalyticsData {
  timeframe: Timeframe
  summary: FinancialSummary
  trends: TrendData[]
  categoryBreakdown: CategoryBreakdown[]
  incomeVsExpenses: IncomeExpenseData[]
  netWorthHistory: NetWorthData[]
  insights: FinancialInsight[]
}

export interface Timeframe {
  start: string
  end: string
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  savingsRate: number
  averageMonthlySpending: number
  largestExpense: number
  mostFrequentCategory: string
}

export interface TrendData {
  date: string
  income: number
  expenses: number
  netIncome: number
}

export interface CategoryBreakdown {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  transactionCount: number
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

export interface IncomeExpenseData {
  month: string
  income: number
  expenses: number
  netIncome: number
}

export interface NetWorthData {
  date: string
  assets: number
  liabilities: number
  netWorth: number
}

export interface FinancialInsight {
  id: string
  type: "spending" | "saving" | "goal" | "budget" | "trend"
  title: string
  description: string
  impact: "positive" | "negative" | "neutral"
  actionable: boolean
  action?: string
  priority: "low" | "medium" | "high"
}