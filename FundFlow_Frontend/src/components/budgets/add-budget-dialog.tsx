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

interface AddBudgetDialogProps {
    defaultGroup?: string
}

export function AddBudgetDialog({ defaultGroup }: AddBudgetDialogProps) {
    const { addBudget } = useFundFlow()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        await new Promise(resolve => setTimeout(resolve, 300)) // Fake delay

        addBudget({
            id: Math.random().toString(36).substr(2, 9),
            name: formData.get("name") as string,
            spent: 0,
            total: parseFloat(formData.get("limit") as string) || 0,
            color: formData.get("color") as string || "bg-blue-500",
            group: formData.get("group") as string || defaultGroup || "Monthly Essentials",
        })

        toast.success("Budget created successfully")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <PlusIcon className="mr-2 h-3 w-3" />
                    Add Budget
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            Set a spending limit for a specific category.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" required placeholder="e.g., Coffee, Hobbies" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="limit" className="text-right">
                                Limit
                            </Label>
                            <Input id="limit" name="limit" required type="number" placeholder="500.00" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="group" className="text-right">
                                Group
                            </Label>
                            <Select name="group" defaultValue={defaultGroup || "Monthly Essentials"}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Monthly Essentials">Monthly Essentials</SelectItem>
                                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="Savings">Savings</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            <Select name="color" defaultValue="bg-blue-500">
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                                    <SelectItem value="bg-green-500">Green</SelectItem>
                                    <SelectItem value="bg-orange-500">Orange</SelectItem>
                                    <SelectItem value="bg-pink-500">Pink</SelectItem>
                                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                                    <SelectItem value="bg-red-500">Red</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Budget</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
