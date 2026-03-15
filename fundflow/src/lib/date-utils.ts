import { addDays, addMonths, differenceInDays, endOfMonth, endOfWeek, format, formatDistanceToNow, isToday, isWithinInterval, isYesterday, parseISO, startOfMonth, startOfWeek } from "date-fns"

// Date formatting utilities
export function formatDate(date: string | Date, formatStr: string = "MMM dd, yyyy"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  
  if (isToday(dateObj)) {
    return "Today"
  }
  
  if (isYesterday(dateObj)) {
    return "Yesterday"
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

// Date range utilities
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfMonth(now),
    end: endOfMonth(now)
  }
}

export function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfWeek(now),
    end: endOfWeek(now)
  }
}

export function getDateRange(period: "week" | "month" | "quarter" | "year", offset: number = 0): { start: Date; end: Date } {
  const now = new Date()
  
  switch (period) {
    case "week":
      const weekStart = addDays(startOfWeek(now), offset * 7)
      return {
        start: weekStart,
        end: endOfWeek(weekStart)
      }
    
    case "month":
      const monthStart = addMonths(startOfMonth(now), offset)
      return {
        start: monthStart,
        end: endOfMonth(monthStart)
      }
    
    case "quarter":
      // TODO: Implement quarter logic
      return getCurrentMonthRange()
    
    case "year":
      // TODO: Implement year logic
      return getCurrentMonthRange()
    
    default:
      return getCurrentMonthRange()
  }
}

// Date validation utilities
export function isDateInRange(date: string | Date, start: string | Date, end: string | Date): boolean {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  const startObj = typeof start === "string" ? parseISO(start) : start
  const endObj = typeof end === "string" ? parseISO(end) : end
  
  return isWithinInterval(dateObj, { start: startObj, end: endObj })
}

export function getDaysBetween(start: string | Date, end: string | Date): number {
  const startObj = typeof start === "string" ? parseISO(start) : start
  const endObj = typeof end === "string" ? parseISO(end) : end
  
  return differenceInDays(endObj, startObj)
}

// Date generation utilities
export function generateDateArray(start: string | Date, end: string | Date): Date[] {
  const startObj = typeof start === "string" ? parseISO(start) : start
  const endObj = typeof end === "string" ? parseISO(end) : end
  const dates: Date[] = []
  
  let currentDate = startObj
  while (currentDate <= endObj) {
    dates.push(new Date(currentDate))
    currentDate = addDays(currentDate, 1)
  }
  
  return dates
}

// ISO string utilities
export function toISOString(date: Date): string {
  return date.toISOString()
}

export function toISODateString(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Business logic utilities
export function getNextPayday(frequency: "weekly" | "biweekly" | "monthly", lastPayday?: string): Date {
  const last = lastPayday ? parseISO(lastPayday) : new Date()
  
  switch (frequency) {
    case "weekly":
      return addDays(last, 7)
    case "biweekly":
      return addDays(last, 14)
    case "monthly":
      return addMonths(last, 1)
    default:
      return addDays(last, 7)
  }
}

export function getRecurringDates(start: string | Date, frequency: "daily" | "weekly" | "monthly" | "yearly", count: number): Date[] {
  const startObj = typeof start === "string" ? parseISO(start) : start
  const dates: Date[] = []
  
  for (let i = 0; i < count; i++) {
    let nextDate: Date
    
    switch (frequency) {
      case "daily":
        nextDate = addDays(startObj, i)
        break
      case "weekly":
        nextDate = addDays(startObj, i * 7)
        break
      case "monthly":
        nextDate = addMonths(startObj, i)
        break
      case "yearly":
        nextDate = addMonths(startObj, i * 12)
        break
      default:
        nextDate = addDays(startObj, i)
    }
    
    dates.push(nextDate)
  }
  
  return dates
}