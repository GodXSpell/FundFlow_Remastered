export interface UserSettings {
  id: string
  userId: string
  theme: "light" | "dark" | "system"
  currency: Currency
  language: string
  timezone: string
  dateFormat: string
  notifications: NotificationSettings
  privacy: PrivacySettings
  preferences: UserPreferences
  updatedAt: string
}

export interface Currency {
  code: string
  symbol: string
  name: string
  decimalPlaces: number
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  budgetAlerts: boolean
  goalReminders: boolean
  transactionAlerts: boolean
  weeklyReports: boolean
  monthlyReports: boolean
}

export interface PrivacySettings {
  shareAnalytics: boolean
  shareWithPartners: boolean
  showInSearch: boolean
  twoFactorAuth: boolean
}

export interface UserPreferences {
  defaultView: "dashboard" | "transactions" | "budgets" | "analytics"
  transactionPageSize: number
  showDecimalPlaces: boolean
  groupTransactionsByDate: boolean
  showCategoryIcons: boolean
  dashboardLayout: DashboardWidget[]
}

export interface DashboardWidget {
  id: string
  type: "summary" | "transactions" | "budgets" | "goals" | "chart"
  position: number
  isVisible: boolean
  size: "small" | "medium" | "large"
}