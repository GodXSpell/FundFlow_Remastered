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
import { Account, useFundFlow } from "@/context/fund-flow-context"
import { Edit2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function EditAccountDialog({ account }: { account: Account }) {
    const { updateAccount } = useFundFlow()
    const [open, setOpen] = useState(false)
    const [balance, setBalance] = useState(account.balance.toString())

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        await updateAccount(account.id, {
            name: formData.get("name") as string,
            bank: formData.get("bank") as string,
            number: formData.get("number") as string,
            balance: parseFloat(balance) || 0,
            type: formData.get("type") as any || "Checking",
        })

        toast.success("Account updated successfully")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Edit Account</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Bank Account</DialogTitle>
                        <DialogDescription>
                            Update your account details or manually adjust your balance.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" required defaultValue={account.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bank" className="text-right">
                                Bank
                            </Label>
                            <Input id="bank" name="bank" required defaultValue={account.bank} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Number
                            </Label>
                            <Input id="number" name="number" required defaultValue={account.number} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="balance" className="text-right">
                                Balance
                            </Label>
                            <Input 
                                id="balance" 
                                name="balance" 
                                required 
                                type="number" 
                                step="0.01" 
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                className="col-span-3" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select name="type" defaultValue={account.type}>
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
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
