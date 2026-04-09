"use client"

import { Transaction } from "@/app/dashboard/transactions/data"
import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { api } from "@/lib/api"

export interface Account {
    id: string
    name: string
    bank: string
    number: string
    balance: number
    type: "Savings" | "Checking" | "Other"
}

export interface Budget {
    id: string
    name: string
    spent: number
    total: number
    color: string
    group: string // "Monthly Essentials", "Lifestyle", "Savings"
}

export interface UserProfile {
    name: string
    email: string
    avatar: string
    currency: string
    notifications: boolean
    theme: "light" | "dark" | "system"
}

interface FundFlowContextType {
    transactions: Transaction[]
    accounts: Account[]
    budgets: Budget[]
    user: UserProfile
    refreshData: () => Promise<void>
    addTransaction: (transaction: Transaction) => Promise<void>
    addAccount: (account: Account) => Promise<void>
    updateAccount: (id: string, account: Partial<Account>) => Promise<void>
    addBudget: (budget: Budget) => Promise<void>
    updateBudget: (id: string, budget: Partial<Budget>) => Promise<void>
    updateUser: (updates: Partial<UserProfile>) => void
}

const FundFlowContext = createContext<FundFlowContextType | undefined>(undefined)

export function FundFlowProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [accounts, setAccounts] = useState<Account[]>([])
    const [budgets, setBudgets] = useState<Budget[]>([])

    const [user, setUser] = useState<UserProfile>({
        name: "Tarunpreet Singh",
        email: "tarun@fundflow.com",
        avatar: "/avatars/01.png",
        currency: "USD",
        notifications: true,
        theme: "system"
    })

    const fetchAccounts = useCallback(async () => {
        try {
            const data = await api.accounts.getAll()
            const accsList = Array.isArray(data) ? data : (data?.content || [])
            const mappedAccounts: Account[] = accsList.map((a: any) => ({
                id: a.id?.toString(),
                name: a.name,
                bank: a.bankName || "Unknown Bank",
                number: a.accountNumber ? `**** ${a.accountNumber.slice(-4)}` : "**** 0000",
                balance: a.balance || 0,
                type: a.accountType === "SAVINGS" ? "Savings" : a.accountType === "CHECKING" ? "Checking" : "Other"
            }))
            setAccounts(mappedAccounts)
            return mappedAccounts
        } catch (e) {
            console.error("Failed to fetch accounts", e)
            return []
        }
    }, [])

    const fetchBudgets = useCallback(async () => {
        try {
            const data = await api.budgets.getAll()
            const bdgsList = Array.isArray(data) ? data : (data?.content || [])
            const mappedBudgets: Budget[] = bdgsList.map((b: any) => ({
                id: b.id?.toString(),
                name: b.name,
                spent: b.amountSpent || b.spent || 0, // Fallback if property isn't defined explicitly by backend
                total: b.amount || 0,
                color: b.color || "bg-blue-500", 
                group: b.category || "Monthly Essentials" // Categorize mapping
            }))
            setBudgets(mappedBudgets)
        } catch (e) {
            console.error("Failed to fetch budgets", e)
        }
    }, [])

    const fetchTransactions = useCallback(async (accs: Account[]) => {
        try {
            const data = await api.transactions.getAll(0, 50)
            const txnsList = Array.isArray(data) ? data : (data?.content || [])
            const mappedTxns: Transaction[] = txnsList.map((t: any) => {
                const acct = accs.find((a: any) => a.id === t.bankAccountId?.toString() || a.name === t.bankAccountId)
                
                return {
                    id: t.id?.toString() || Math.random().toString(),
                    name: t.description || t.category || "Transaction",
                    date: t.transactionDate ? new Date(t.transactionDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    amount: t.amount || 0,
                    type: (t.type === "CREDIT" || t.type === "Incoming") ? "Incoming" : "Outgoing",
                    account: acct ? acct.name : "Unknown Account",
                    category: t.category || "General",
                    mode: "Card",
                    status: "Done"
                }
            })
            setTransactions(mappedTxns)
            return mappedTxns
        } catch (e) {
            console.error("Failed to fetch transactions", e)
            return []
        }
    }, [])

    const refreshData = useCallback(async () => {
        if (!localStorage.getItem("token")) return;
        const fetchedAccounts = await fetchAccounts()
        const fetchedTransactions = await fetchTransactions(fetchedAccounts)

        // Fetch budgets and calculate spent locally based on transactions
        try {
            const data = await api.budgets.getAll()
            const bdgsList = Array.isArray(data) ? data : (data?.content || [])
            const mappedBudgets: Budget[] = bdgsList.map((b: any) => {
                const groupName = b.category || "Monthly Essentials"
                const bName = b.name
                
                // Calculate spent from transactions in the current month locally
                const spent = (fetchedTransactions || []).reduce((acc: number, t: Transaction) => {
                    if (t.type === "Outgoing") {
                        const tGroup = CATEGORY_TO_BUDGET_GROUP[t.category] || "Lifestyle"
                        if (t.category.toLowerCase() === bName.toLowerCase() || tGroup.toLowerCase() === groupName.toLowerCase()) {
                            return acc + t.amount
                        }
                    }
                    return acc
                }, 0)

                return {
                    id: b.id?.toString(),
                    name: bName,
                    spent, // Local calculated sum
                    total: b.amount || 0,
                    color: b.color || "bg-blue-500", 
                    group: groupName
                }
            })
            setBudgets(mappedBudgets)
        } catch (e) {
            console.error("Failed to fetch budgets", e)
        }
    }, [fetchAccounts, fetchTransactions])

    useEffect(() => {
        refreshData()
    }, [refreshData])

    const addAccount = async (account: Account) => {
        try {
            const payload = {
                name: account.name,
                bankName: account.bank,
                accountNumber: account.number,
                balance: account.balance,
                accountType: account.type.toUpperCase() // CHECKING, SAVINGS etc. based on Postman schemas
            }
            await api.accounts.create(payload)
            await refreshData()
        } catch (e) {
            console.error("Error adding account", e)
        }
    }

    const updateAccount = async (id: string, accountUpdates: Partial<Account>) => {
        try {
            const payload = {
                name: accountUpdates.name,
                bankName: accountUpdates.bank,
                accountNumber: accountUpdates.number,
                balance: accountUpdates.balance,
                accountType: accountUpdates.type?.toUpperCase()
            }
            await api.accounts.update(id, payload)
            await refreshData()
        } catch (e) {
            console.error("Error updating account", e)
        }
    }

    const addBudget = async (budget: Budget) => {
        try {
            const dateStr = new Date().toISOString().split('T')[0]
            const payload = {
                name: budget.name,
                category: budget.group,
                amount: budget.total,
                period: "MONTHLY",
                startDate: dateStr,
                endDate: dateStr 
            }
            await api.budgets.create(payload)
            await refreshData()
        } catch (e) {
            console.error("Error adding budget", e)
        }
    }

    const updateBudget = async (id: string, budget: Partial<Budget>) => {
        try {
            const dateStr = new Date().toISOString().split('T')[0]
            const payload = {
                name: budget.name,
                category: budget.group,
                amount: budget.total,
                period: "MONTHLY",
                startDate: dateStr,
                endDate: dateStr 
            }
            await api.budgets.update(id, payload)
            await refreshData()
        } catch (e) {
            console.error("Error updating budget", e)
        }
    }

    const CATEGORY_TO_BUDGET_GROUP: Record<string, string> = {
        "Food": "Monthly Essentials",
        "Groceries": "Monthly Essentials",
        "Rent": "Monthly Essentials",
        "Utilities": "Monthly Essentials",
        "Transport": "Monthly Essentials",
        "Medical": "Monthly Essentials",
        "Dining": "Lifestyle",
        "Entertainment": "Lifestyle",
        "Shopping": "Lifestyle",
        "Personal Care": "Lifestyle",
        "Stocks": "Savings",
        "Mutual Funds": "Savings",
        "Fixed Deposit": "Savings"
    }

    const addTransaction = async (newTx: Transaction) => {
        try {
            const acct = accounts.find((a: any) => a.name === newTx.account)
            const bankAccountId = acct ? acct.id : undefined
            
            if (!bankAccountId) {
                console.error("Could not find matching bank account ID for transaction.");
                return;
            }

const targetCategory = newTx.category || "General";

        const payload = {
            bankAccountId,
            amount: newTx.amount,
            type: newTx.type === "Incoming" ? "CREDIT" : "DEBIT",
            category: targetCategory,
            description: newTx.name,
            transactionDate: newTx.date || new Date().toISOString()
        }
        await api.transactions.create(payload)

            await refreshData()
        } catch (e) {
            console.error("Error adding transaction", e)
        }
    }

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev, ...updates }))
    }

    return (
        <FundFlowContext.Provider value={{ transactions, accounts, budgets, user, refreshData, addTransaction, addAccount, updateAccount, addBudget, updateBudget, updateUser }}>
            {children}
        </FundFlowContext.Provider>
    )
}

export function useFundFlow() {
    const context = useContext(FundFlowContext)
    if (context === undefined) {
        throw new Error("useFundFlow must be used within a FundFlowProvider")
    }
    return context
}
