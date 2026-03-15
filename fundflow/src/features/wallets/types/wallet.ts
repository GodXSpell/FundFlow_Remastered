export interface Wallet {
  id: string
  name: string
  type: WalletType
  balance: number
  currency: string
  color: string
  icon: string
  description?: string
  accountNumber?: string
  bankName?: string
  isDefault: boolean
  isActive: boolean
  lastSynced?: string
  createdAt: string
  updatedAt: string
}

export interface WalletType {
  id: string
  name: string
  category: "cash" | "checking" | "savings" | "credit" | "investment" | "crypto"
  icon: string
  requiresConnection: boolean
}

export interface WalletBalance {
  current: number
  available: number
  pending: number
  creditLimit?: number
  interestRate?: number
}

export interface Transfer {
  id: string
  fromWalletId: string
  toWalletId: string
  amount: number
  fee?: number
  description?: string
  status: "pending" | "completed" | "failed"
  processedAt?: string
  createdAt: string
}