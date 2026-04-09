"use client"

import { EditAccountDialog } from "@/components/accounts/edit-account-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFundFlow } from "@/context/fund-flow-context"
import { Building2, CreditCard, TrendingUp, Wallet } from "lucide-react"

export function ManageAccountsGrid() {
    const { accounts } = useFundFlow()

    // Helper to get icon based on bank name or random
    const getIcon = (type: string) => {
        if (type === "Savings") return Building2
        if (type === "Checking") return CreditCard
        return Wallet
    }

    const getColors = (type: string) => {
        if (type === "Savings") return "text-blue-500 bg-blue-500/10"
        if (type === "Checking") return "text-purple-500 bg-purple-500/10"
        return "text-emerald-500 bg-emerald-500/10"
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((acc, i) => {
                const Icon = getIcon(acc.type)
                const colors = getColors(acc.type)

                return (
                    <Card key={acc.id} className="shadow-none border relative overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <span className="text-muted-foreground">{acc.name}</span>
                            </CardTitle>
                            <div className="flex items-center gap-1">
                                <EditAccountDialog account={acc} />
                                <div className={`p-2 rounded-full ${colors}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(acc.balance)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`flex items-center text-xs text-green-500`}>
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    +0.0%
                                </div>
                                <span className="text-xs text-muted-foreground">from last month</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-4 pt-4 border-t flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className="font-medium">Bank</span>
                                    <span>{acc.bank}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Account Number</span>
                                    <span className="font-mono">{acc.number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Type</span>
                                    <span>{acc.type}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
