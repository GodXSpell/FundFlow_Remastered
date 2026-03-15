export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  categoryId: string
  date: string
  type: "income" | "expense"
  walletId: string
  merchant?: string
  tags?: string[]
  location?: string
  receipt?: string
  isRecurring?: boolean
  recurringPattern?: RecurringPattern
  createdAt: string
  updatedAt: string
}

export interface TransactionCategory {
  id: string
  name: string
  icon: string
  color: string
  type: "income" | "expense" | "both"
  parentId?: string
  isDefault: boolean
}

export interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly"
  interval: number
  endDate?: string
  count?: number
}

export interface TransactionFilter {
  startDate?: string
  endDate?: string
  categories?: string[]
  types?: ("income" | "expense")[]
  wallets?: string[]
  minAmount?: number
  maxAmount?: number
  search?: string
}

export interface TransactionStats {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  transactionCount: number
  averageTransaction: number
  topCategories: CategorySpending[]
}

export interface CategorySpending {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  transactionCount: number
}