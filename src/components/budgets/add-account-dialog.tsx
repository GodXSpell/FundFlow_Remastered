"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFundFlow } from "@/context/fund-flow-context"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function AddAccountDialog() {
    const { addAccount } = useFundFlow()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        await new Promise(resolve => setTimeout(resolve, 300))

        addAccount({
            id: Math.random().toString(36).substr(2, 9),
            name: formData.get("name") as string,
            bank: formData.get("bank") as string,
            number: "**** " + (formData.get("number") as string).slice(-4),
            balance: parseFloat(formData.get("balance") as string) || 0,
            type: formData.get("type") as any || "Checking",
        })

        toast.success("Account added successfully")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Bank Account</DialogTitle>
                        <DialogDescription>
                            Link a new bank account to track its balance.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" required placeholder="e.g., Main Savings" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bank" className="text-right">
                                Bank
                            </Label>
                            <Input id="bank" name="bank" required placeholder="e.g., Chase, Wells Fargo" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input id="number" name="number" required placeholder="Last 4 digits" maxLength={4} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="balance" className="text-right">
                                Balance
                            </Label>
                            <Input id="balance" name="balance" required type="number" step="0.01" placeholder="0.00" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select name="type" defaultValue="Checking">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Checking">Checking</SelectItem>
                                    <SelectItem value="Savings">Savings</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Account</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
