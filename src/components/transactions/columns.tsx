"use client"

import { Transaction } from "@/app/dashboard/transactions/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CreditCardIcon,
    LandmarkIcon,
    PlaneIcon,
    ScanLineIcon,
    ShoppingBagIcon,
    SmartphoneIcon,
    UtensilsIcon,
    WalletIcon
} from "lucide-react"

// Helper to get icons based on strings
const getModeIcon = (mode: string) => {
    switch (mode) {
        case "Google Pay": return <SmartphoneIcon className="h-4 w-4 text-blue-400" />
        case "Paytm": return <ScanLineIcon className="h-4 w-4 text-cyan-400" />
        case "PhonePe": return <SmartphoneIcon className="h-4 w-4 text-purple-500" />
        case "Card": return <CreditCardIcon className="h-4 w-4 text-orange-400" />
        default: return <WalletIcon className="h-4 w-4 text-slate-400" />
    }
}

const getCategoryIcon = (cat: string) => {
    switch (cat) {
        case "Shopping": return <ShoppingBagIcon className="h-4 w-4 text-pink-400" />
        case "Trips": return <PlaneIcon className="h-4 w-4 text-sky-400" />
        case "Food": return <UtensilsIcon className="h-4 w-4 text-orange-400" />
        default: return <ShoppingBagIcon className="h-4 w-4 text-slate-400" />
    }
}

export const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate") as boolean | "indeterminate"
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()} // Prevent row click when selecting
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Transaction",
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            const date = row.original.date
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-orange-500/20">
                        <AvatarFallback className="bg-orange-500 text-white text-xs font-bold">
                            {name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-white">{name}</span>
                        <span className="text-[10px] text-muted-foreground">{date}</span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const type = row.original.type
            const isIncome = type === "Incoming"

            return (
                <div className={`flex items-center font-medium ${isIncome ? "text-green-500" : "text-red-500"}`}>
                    {isIncome ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
                    ₹{amount.toFixed(2)}
                </div>
            )
        },
    },
    {
        accessorKey: "account",
        header: "Account",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 text-slate-300">
                    <LandmarkIcon className="h-4 w-4 text-pink-500" /> {/* Generic bank icon for now */}
                    <span>{row.getValue("account")}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const cat = row.getValue("category") as string
            return (
                <div className="flex items-center gap-2 text-slate-300">
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "mode",
        header: "Mode",
        cell: ({ row }) => {
            const mode = row.getValue("mode") as string
            return (
                <div className="flex items-center gap-2 text-slate-300">
                    {getModeIcon(mode)}
                    <span>{mode}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let variant = "default"
            let className = "bg-slate-800 text-slate-300 hover:bg-slate-700"

            if (status === "Pending") className = "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
            if (status === "Done") className = "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
            if (status === "Failed") className = "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"

            return (
                <div className="flex items-center gap-1">
                    <div className={`h-1.5 w-1.5 rounded-full ${status === 'Done' ? 'bg-green-500' : status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <Badge variant="outline" className={`border-0 ${className}`}>
                        {status}
                    </Badge>
                </div>
            )
        }
    },
]
