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
import { useFundFlow, Budget } from "@/context/fund-flow-context"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface EditBudgetDialogProps {
    budget: Budget
}

export function EditBudgetDialog({ budget }: EditBudgetDialogProps) {
    const { updateBudget } = useFundFlow()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        await updateBudget(budget.id, {
            name: formData.get("name") as string,
            total: parseFloat(formData.get("limit") as string) || 0,
            color: formData.get("color") as string || budget.color,
            group: formData.get("group") as string || budget.group,
        })

        toast.success("Budget updated successfully")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground mr-2">
                    <EditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit Budget</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>
                            Update your spending limit and category.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" required defaultValue={budget.name} placeholder="e.g., Coffee, Hobbies" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="limit" className="text-right">
                                Limit
                            </Label>
                            <Input id="limit" name="limit" required type="number" defaultValue={budget.total} placeholder="500.00" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="group" className="text-right">
                                Group
                            </Label>
                            <Input id="group" name="group" required defaultValue={budget.group} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            <Select name="color" defaultValue={budget.color || "bg-blue-500"}>
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
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}