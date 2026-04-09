"use client"

import { ManageAccountsGrid } from "@/components/accounts/manage-accounts-grid"
import { AddAccountDialog } from "@/components/budgets/add-account-dialog"
import { Building2 } from "lucide-react"

export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-semibold tracking-tight">Bank Accounts</h2>
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">
                        View, update, and manage the balances of your connected bank accounts.
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <AddAccountDialog />
                </div>
            </div>

            <ManageAccountsGrid />
        </div>
    )
}
