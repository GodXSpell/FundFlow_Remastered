// App Configuration
export const APP_NAME = "FundFlow"
export const APP_DESCRIPTION = "Modern Personal Finance Management"
export const APP_VERSION = "1.0.0"

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"
export const API_TIMEOUT = 30000 // 30 seconds

// Database Configuration
export const DB_CONNECTION_TIMEOUT = 10000 // 10 seconds
export const DB_QUERY_TIMEOUT = 5000 // 5 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

// Transaction Categories
export const DEFAULT_INCOME_CATEGORIES = [
  { name: "Salary", icon: "briefcase", color: "#10b981" },
  { name: "Freelance", icon: "laptop", color: "#3b82f6" },
  { name: "Investments", icon: "trending-up", color: "#8b5cf6" },
  { name: "Business", icon: "building", color: "#f59e0b" },
  { name: "Other Income", icon: "plus-circle", color: "#6b7280" },
]

export const DEFAULT_EXPENSE_CATEGORIES = [
  { name: "Food & Dining", icon: "utensils", color: "#ef4444" },
  { name: "Transportation", icon: "car", color: "#f97316" },
  { name: "Shopping", icon: "shopping-bag", color: "#ec4899" },
  { name: "Entertainment", icon: "film", color: "#8b5cf6" },
  { name: "Bills & Utilities", icon: "receipt", color: "#0ea5e9" },
  { name: "Healthcare", icon: "heart", color: "#10b981" },
  { name: "Education", icon: "book", color: "#3b82f6" },
  { name: "Travel", icon: "plane", color: "#06b6d4" },
  { name: "Home & Garden", icon: "home", color: "#84cc16" },
  { name: "Personal Care", icon: "user", color: "#f59e0b" },
]

// Currencies
export const DEFAULT_CURRENCY = "USD"
export const SUPPORTED_CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", decimalPlaces: 2 },
  { code: "EUR", symbol: "€", name: "Euro", decimalPlaces: 2 },
  { code: "GBP", symbol: "£", name: "British Pound", decimalPlaces: 2 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", decimalPlaces: 0 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", decimalPlaces: 2 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", decimalPlaces: 2 },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", decimalPlaces: 2 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimalPlaces: 2 },
]

// Date Formats
export const DATE_FORMATS = [
  { label: "MM/DD/YYYY", value: "MM/dd/yyyy" },
  { label: "DD/MM/YYYY", value: "dd/MM/yyyy" },
  { label: "YYYY-MM-DD", value: "yyyy-MM-dd" },
  { label: "MMM DD, YYYY", value: "MMM dd, yyyy" },
  { label: "DD MMM YYYY", value: "dd MMM yyyy" },
]

// Wallet Types
export const WALLET_TYPES = [
  { id: "cash", name: "Cash", category: "cash", icon: "wallet", requiresConnection: false },
  { id: "checking", name: "Checking Account", category: "checking", icon: "credit-card", requiresConnection: true },
  { id: "savings", name: "Savings Account", category: "savings", icon: "piggy-bank", requiresConnection: true },
  { id: "credit", name: "Credit Card", category: "credit", icon: "credit-card", requiresConnection: true },
  { id: "investment", name: "Investment Account", category: "investment", icon: "trending-up", requiresConnection: true },
  { id: "crypto", name: "Crypto Wallet", category: "crypto", icon: "bitcoin", requiresConnection: false },
]

// Budget Periods
export const BUDGET_PERIODS = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Yearly", value: "yearly" },
  { label: "Custom", value: "custom" },
]

// Goal Categories
export const GOAL_CATEGORIES = [
  { id: "emergency", name: "Emergency Fund", icon: "shield", color: "#ef4444" },
  { id: "vacation", name: "Vacation", icon: "plane", color: "#06b6d4" },
  { id: "house", name: "House Down Payment", icon: "home", color: "#84cc16" },
  { id: "car", name: "New Car", icon: "car", color: "#f97316" },
  { id: "education", name: "Education", icon: "book", color: "#3b82f6" },
  { id: "retirement", name: "Retirement", icon: "trending-up", color: "#8b5cf6" },
  { id: "wedding", name: "Wedding", icon: "heart", color: "#ec4899" },
  { id: "debt", name: "Debt Payoff", icon: "credit-card", color: "#6b7280" },
  { id: "investment", name: "Investment", icon: "trending-up", color: "#10b981" },
  { id: "other", name: "Other", icon: "target", color: "#f59e0b" },
]

// Theme Colors
export const THEME_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#84cc16", // Lime
  "#f97316", // Orange
  "#6b7280", // Gray
]

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "fundflow-theme",
  SIDEBAR_COLLAPSED: "fundflow-sidebar-collapsed",
  RECENT_SEARCHES: "fundflow-recent-searches",
  DASHBOARD_LAYOUT: "fundflow-dashboard-layout",
  ONBOARDING_COMPLETED: "fundflow-onboarding-completed",
} as const

// Analytics Events
export const ANALYTICS_EVENTS = {
  TRANSACTION_CREATED: "transaction_created",
  BUDGET_CREATED: "budget_created",
  GOAL_CREATED: "goal_created",
  WALLET_ADDED: "wallet_added",
  EXPORT_GENERATED: "export_generated",
  REPORT_VIEWED: "report_viewed",
} as const