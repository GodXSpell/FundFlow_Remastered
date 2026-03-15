// Number formatting utilities
export function formatCurrency(amount: number, currency: string = "USD", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatPercentage(value: number, decimals: number = 1, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

export function formatCompactNumber(value: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(value)
}

// String formatting utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function titleCase(str: string): string {
  return str
    .split(" ")
    .map(word => capitalize(word))
    .join(" ")
}

export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Utility formatting functions
export function formatFileSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Bytes"
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

// Financial calculation utilities
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / oldValue) * 100
}

export function calculateSavingsRate(income: number, expenses: number): number {
  if (income === 0) return 0
  return ((income - expenses) / income) * 100
}

export function roundToTwoDecimals(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function formatTransactionAmount(amount: number, type: "income" | "expense", currency: string = "USD"): string {
  const formattedAmount = formatCurrency(Math.abs(amount), currency)
  return type === "expense" ? `-${formattedAmount}` : `+${formattedAmount}`
}

// Color utilities for financial data
export function getAmountColor(amount: number, type?: "income" | "expense"): string {
  if (type) {
    return type === "income" ? "text-green-600" : "text-red-600"
  }
  return amount >= 0 ? "text-green-600" : "text-red-600"
}

export function getTrendColor(percentage: number): string {
  if (percentage > 0) return "text-green-600"
  if (percentage < 0) return "text-red-600"
  return "text-gray-600"
}

// Data parsing utilities
export function parseCurrency(value: string): number {
  const cleanValue = value.replace(/[^\d.-]/g, "")
  return parseFloat(cleanValue) || 0
}

export function parsePercentage(value: string): number {
  const cleanValue = value.replace(/[^\d.-]/g, "")
  return parseFloat(cleanValue) || 0
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidCurrency(amount: string): boolean {
  const currencyRegex = /^\d+(\.\d{1,2})?$/
  return currencyRegex.test(amount.replace(/[^\d.]/g, ""))
}

// Array formatting utilities
export function formatList(items: string[], conjunction: string = "and"): string {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`
  
  const allButLast = items.slice(0, -1).join(", ")
  const last = items[items.length - 1]
  return `${allButLast}, ${conjunction} ${last}`
}