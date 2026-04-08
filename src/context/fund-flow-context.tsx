"use client"

import { Transaction, transactions as initialTransactions } from "@/app/dashboard/transactions/data"
import React, { createContext, useContext, useState } from "react"

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
    addTransaction: (transaction: Transaction) => void
    addAccount: (account: Account) => void
    addBudget: (budget: Budget) => void
    updateUser: (updates: Partial<UserProfile>) => void
}

const FundFlowContext = createContext<FundFlowContextType | undefined>(undefined)

export function FundFlowProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

    const [user, setUser] = useState<UserProfile>({
        name: "Tarunpreet Singh",
        email: "tarun@fundflow.com",
        avatar: "/avatars/01.png", // We'll handle this later
        currency: "USD",
        notifications: true,
        theme: "system"
    })

    const [accounts, setAccounts] = useState<Account[]>([
        { id: "1", name: "Main Savings", bank: "Chase Bank", number: "**** 4589", balance: 12450.80, type: "Savings" },
        { id: "2", name: "Spending", bank: "Barclays", number: "**** 8821", balance: 2850.40, type: "Checking" },
        { id: "3", name: "Emergency Fund", bank: "Vault", number: "**** 9000", balance: 50000.00, type: "Other" }
    ])

    const [budgets, setBudgets] = useState<Budget[]>([
        { id: "1", name: "Rent & Utilities", spent: 1200, total: 1500, color: "bg-blue-500", group: "Monthly Essentials" },
        { id: "2", name: "Groceries", spent: 450, total: 600, color: "bg-green-500", group: "Monthly Essentials" },
        { id: "3", name: "Transport", spent: 180, total: 200, color: "bg-orange-500", group: "Monthly Essentials" },
        { id: "4", name: "Dining Out", spent: 220, total: 300, color: "bg-pink-500", group: "Lifestyle" },
        { id: "5", name: "Europe Trip", spent: 3000, total: 8000, color: "bg-teal-500", group: "Savings" }
    ])

    const addTransaction = (newTx: Transaction) => {
        setTransactions(prev => [newTx, ...prev])

        // Update Account Balance
        if (newTx.status === "Done") {
            setAccounts(prevAccounts => prevAccounts.map(acc => {
                if (acc.name === newTx.account) {
                    const amount = newTx.type === "Incoming" ? newTx.amount : -newTx.amount
                    return { ...acc, balance: acc.balance + amount }
                }
                return acc
            }))
        }

        // Update Budget Spent if applicable (Simple matching by category or name for now)
        if (newTx.type === "Outgoing" && newTx.status === "Done") {
            setBudgets(prevBudgets => prevBudgets.map(budget => {
                // If transaction category matches budget name (simplified logic)
                if (newTx.category && (budget.name.toLowerCase().includes(newTx.category.toLowerCase()) || newTx.category.toLowerCase().includes(budget.name.toLowerCase()))) {
                    return { ...budget, spent: budget.spent + newTx.amount }
                }
                return budget
            }))
        }
    }

    const addAccount = (acc: Account) => {
        setAccounts(prev => [...prev, acc])
    }

    const addBudget = (budget: Budget) => {
        setBudgets(prev => [...prev, budget])
    }

    const updateUser = (updates: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev, ...updates }))
    }

    return (
        <FundFlowContext.Provider value={{ transactions, accounts, budgets, user, addTransaction, addAccount, addBudget, updateUser }}>
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
