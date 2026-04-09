"use client"

import { useFundFlow } from "@/context/fund-flow-context"

import { Transaction } from "@/app/dashboard/transactions/data"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function AddTransactionDialog() {
    const { addTransaction, accounts } = useFundFlow()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600))

        const newTransaction: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.get("payee") as string || "Unknown Payee",
            amount: parseFloat(formData.get("amount") as string) || 0,
            category: formData.get("category") as string || "Other",
            type: (formData.get("type") as "Incoming" | "Outgoing") || "Outgoing",
            mode: (formData.get("mode") as any) || "Card",
            date: new Date().toISOString(), // Use standard format so the backend parses it smoothly
            status: (formData.get("status") as any) || "Done",
            account: formData.get("account") as string || "Main Account",
            description: "Added via Dashboard",
        }

        await addTransaction(newTransaction)
        toast.success("Transaction added successfully")
        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    <span className="hidden lg:inline">Add Transaction</span>
                    <span className="lg:hidden">Add</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Transaction</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new transaction here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="payee" className="text-right">
                                Payee
                            </Label>
                            <Input id="payee" name="payee" required placeholder="Starbucks, Netflix, etc." className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input id="amount" name="amount" required type="number" step="0.01" placeholder="0.00" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select name="category" required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Food">Food</SelectItem>
                                    <SelectItem value="Shopping">Shopping</SelectItem>
                                    <SelectItem value="Transport">Transport</SelectItem>
                                    <SelectItem value="Bills">Bills & Utilities</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Health">Health</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="Pay">Pay (Salary)</SelectItem>
                                    <SelectItem value="Stocks">Stocks / Investments</SelectItem>
                                    <SelectItem value="Other Income">Other Income</SelectItem>
                                    <SelectItem value="Other">Other Expenses</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="account" className="text-right">
                                Account
                            </Label>
                            <Select name="account" required defaultValue={accounts[0]?.name}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accounts.map(acc => (
                                        <SelectItem key={acc.id} value={acc.name}>{acc.name} ({acc.bank})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select name="type" defaultValue="Outgoing">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Outgoing">Expense</SelectItem>
                                    <SelectItem value="Incoming">Income</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mode" className="text-right">
                                Mode
                            </Label>
                            <Select name="mode" defaultValue="Card">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Google Pay">Google Pay</SelectItem>
                                    <SelectItem value="Card">Card</SelectItem>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Net Banking">Net Banking</SelectItem>
                                    <SelectItem value="PhonePe">PhonePe</SelectItem>
                                    <SelectItem value="Paytm">Paytm</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select name="status" defaultValue="Done">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Done">Done</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Date is auto-set for now or can be added back if user specifically wants backdating */}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Transaction"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
