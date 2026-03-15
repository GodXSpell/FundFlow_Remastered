// Data export utilities for CSV, PDF, and other formats

export interface ExportConfig {
  format: "csv" | "pdf" | "json" | "xlsx"
  filename?: string
  dateRange?: {
    start: string
    end: string
  }
  filters?: Record<string, any>
}

export interface ExportData {
  headers: string[]
  rows: any[][]
  metadata?: Record<string, any>
}

export class ExportService {
  async exportToCsv(data: ExportData, filename: string = "export.csv"): Promise<void> {
    const csvContent = this.generateCsvContent(data)
    this.downloadFile(csvContent, filename, "text/csv")
  }

  async exportToJson(data: any, filename: string = "export.json"): Promise<void> {
    const jsonContent = JSON.stringify(data, null, 2)
    this.downloadFile(jsonContent, filename, "application/json")
  }

  async exportToPdf(data: ExportData, filename: string = "export.pdf"): Promise<void> {
    // TODO: Implement PDF generation using libraries like jsPDF or Puppeteer
    console.log("PDF export not yet implemented")
    
    // Placeholder: Export as CSV for now
    await this.exportToCsv(data, filename.replace(".pdf", ".csv"))
  }

  private generateCsvContent(data: ExportData): string {
    const { headers, rows } = data
    const csvRows = [headers, ...rows]
    
    return csvRows
      .map(row => 
        row
          .map(field => this.escapeCsvField(String(field)))
          .join(",")
      )
      .join("\n")
  }

  private escapeCsvField(field: string): string {
    if (field.includes(",") || field.includes('"') || field.includes("\n")) {
      return `"${field.replace(/"/g, '""')}"`
    }
    return field
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.style.display = "none"
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }
}

// Create singleton instance
export const exportService = new ExportService()

// Transaction export functions
export function formatTransactionsForExport(transactions: any[]): ExportData {
  const headers = [
    "Date",
    "Description",
    "Category",
    "Amount",
    "Type",
    "Wallet",
    "Merchant",
    "Tags",
  ]

  const rows = transactions.map(transaction => [
    transaction.date,
    transaction.description,
    transaction.category,
    transaction.amount,
    transaction.type,
    transaction.walletName || "",
    transaction.merchant || "",
    transaction.tags?.join("; ") || "",
  ])

  return { headers, rows }
}

export async function exportTransactions(
  transactions: any[],
  config: ExportConfig
): Promise<void> {
  const data = formatTransactionsForExport(transactions)
  const filename = config.filename || `transactions-${new Date().toISOString().split("T")[0]}`

  switch (config.format) {
    case "csv":
      await exportService.exportToCsv(data, `${filename}.csv`)
      break
    case "json":
      await exportService.exportToJson(transactions, `${filename}.json`)
      break
    case "pdf":
      await exportService.exportToPdf(data, `${filename}.pdf`)
      break
    default:
      throw new Error(`Unsupported format: ${config.format}`)
  }
}

// Budget export functions
export function formatBudgetsForExport(budgets: any[]): ExportData {
  const headers = [
    "Name",
    "Amount",
    "Spent",
    "Remaining",
    "Period",
    "Start Date",
    "End Date",
    "Categories",
    "Status",
  ]

  const rows = budgets.map(budget => [
    budget.name,
    budget.amount,
    budget.spent,
    budget.remaining,
    budget.period?.type || "",
    budget.startDate,
    budget.endDate,
    budget.categories?.join("; ") || "",
    budget.isActive ? "Active" : "Inactive",
  ])

  return { headers, rows }
}

export async function exportBudgets(
  budgets: any[],
  config: ExportConfig
): Promise<void> {
  const data = formatBudgetsForExport(budgets)
  const filename = config.filename || `budgets-${new Date().toISOString().split("T")[0]}`

  switch (config.format) {
    case "csv":
      await exportService.exportToCsv(data, `${filename}.csv`)
      break
    case "json":
      await exportService.exportToJson(budgets, `${filename}.json`)
      break
    case "pdf":
      await exportService.exportToPdf(data, `${filename}.pdf`)
      break
    default:
      throw new Error(`Unsupported format: ${config.format}`)
  }
}

// Analytics export functions
export function formatAnalyticsForExport(analytics: any): ExportData {
  const headers = ["Metric", "Value", "Period"]
  
  const rows = [
    ["Total Income", analytics.summary?.totalIncome || 0, analytics.timeframe?.period || ""],
    ["Total Expenses", analytics.summary?.totalExpenses || 0, analytics.timeframe?.period || ""],
    ["Net Income", analytics.summary?.netIncome || 0, analytics.timeframe?.period || ""],
    ["Savings Rate", `${analytics.summary?.savingsRate || 0}%`, analytics.timeframe?.period || ""],
    ["Average Monthly Spending", analytics.summary?.averageMonthlySpending || 0, analytics.timeframe?.period || ""],
  ]

  return { headers, rows }
}

export async function exportAnalytics(
  analytics: any,
  config: ExportConfig
): Promise<void> {
  const data = formatAnalyticsForExport(analytics)
  const filename = config.filename || `analytics-${new Date().toISOString().split("T")[0]}`

  switch (config.format) {
    case "csv":
      await exportService.exportToCsv(data, `${filename}.csv`)
      break
    case "json":
      await exportService.exportToJson(analytics, `${filename}.json`)
      break
    case "pdf":
      await exportService.exportToPdf(data, `${filename}.pdf`)
      break
    default:
      throw new Error(`Unsupported format: ${config.format}`)
  }
}

// Complete financial report export
export async function exportFinancialReport(
  data: {
    transactions: any[]
    budgets: any[]
    goals: any[]
    analytics: any
  },
  config: ExportConfig
): Promise<void> {
  const reportData = {
    summary: data.analytics?.summary || {},
    transactions: data.transactions,
    budgets: data.budgets,
    goals: data.goals,
    exportedAt: new Date().toISOString(),
    period: config.dateRange,
  }

  const filename = config.filename || `financial-report-${new Date().toISOString().split("T")[0]}`

  switch (config.format) {
    case "json":
      await exportService.exportToJson(reportData, `${filename}.json`)
      break
    case "csv":
      // Export transactions as the main CSV
      const transactionData = formatTransactionsForExport(data.transactions)
      await exportService.exportToCsv(transactionData, `${filename}-transactions.csv`)
      break
    case "pdf":
      // TODO: Generate comprehensive PDF report
      console.log("Comprehensive PDF report not yet implemented")
      break
    default:
      throw new Error(`Unsupported format: ${config.format}`)
  }
}