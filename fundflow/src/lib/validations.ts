import { z } from "zod"

// Auth validations
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Transaction validations
export const transactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  walletId: z.string().min(1, "Wallet is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense"]),
  merchant: z.string().optional(),
  tags: z.array(z.string()).optional(),
  location: z.string().optional(),
})

// Budget validations
export const budgetSchema = z.object({
  name: z.string().min(1, "Budget name is required"),
  amount: z.number().positive("Amount must be positive"),
  period: z.enum(["weekly", "monthly", "quarterly", "yearly", "custom"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  description: z.string().optional(),
})

// Wallet validations
export const walletSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
  type: z.string().min(1, "Wallet type is required"),
  balance: z.number("Balance must be a number"),
  currency: z.string().min(1, "Currency is required"),
  color: z.string().min(1, "Color is required"),
  description: z.string().optional(),
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
})

// Goal validations
export const goalSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  targetAmount: z.number().positive("Target amount must be positive"),
  currentAmount: z.number().min(0, "Current amount cannot be negative"),
  targetDate: z.string().min(1, "Target date is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.enum(["low", "medium", "high"]),
  description: z.string().optional(),
})

// Settings validations
export const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  currency: z.string().min(1, "Currency is required"),
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type TransactionFormData = z.infer<typeof transactionSchema>
export type BudgetFormData = z.infer<typeof budgetSchema>
export type WalletFormData = z.infer<typeof walletSchema>
export type GoalFormData = z.infer<typeof goalSchema>
export type SettingsFormData = z.infer<typeof settingsSchema>