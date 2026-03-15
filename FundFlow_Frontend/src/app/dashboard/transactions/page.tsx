"use client"

import { TransactionsDataTable } from "@/components/transactions/transactions-data-table"
import { useFundFlow } from "@/context/fund-flow-context"

export default function Page() {
    const { transactions } = useFundFlow()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <TransactionsDataTable data={transactions} />
        </div>
    )
}
