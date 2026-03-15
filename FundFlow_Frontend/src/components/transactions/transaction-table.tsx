"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { PlusIcon, SearchIcon } from "lucide-react"
import * as React from "react"

import { Transaction } from "@/app/dashboard/transactions/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TransactionTableProps {
    columns: ColumnDef<Transaction>[]
    data: Transaction[]
    onSelectTransaction: (transaction: Transaction | null) => void
    selectedTransactionId?: string | null
}

export function TransactionTable({
    columns,
    data,
    onSelectTransaction,
    selectedTransactionId
}: TransactionTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Handle row click to select transaction for details view
    const handleRowClick = (row: Transaction) => {
        if (selectedTransactionId === row.id) {
            onSelectTransaction(null) // Deselect if already selected
        } else {
            onSelectTransaction(row)
        }
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">Transaction History</h2>
                    <p className="text-sm text-muted-foreground hidden md:block">Ready for today's challenges?</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for your transaction"
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="w-[250px] pl-9 bg-zinc-900 border-zinc-800 rounded-full focus-visible:ring-orange-500"
                        />
                    </div>
                    <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium">
                        <PlusIcon className="mr-2 h-4 w-4" /> Add Transaction
                    </Button>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                1-{table.getRowModel().rows.length} of {data.length} transactions
            </div>

            <div className="rounded-md border border-zinc-800 overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-zinc-800 hover:bg-zinc-900/50">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-zinc-400 font-medium">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() || selectedTransactionId === row.original.id ? "selected" : undefined}
                                    className={`border-zinc-800 cursor-pointer transition-colors ${selectedTransactionId === row.original.id ? "bg-zinc-800/50" : "hover:bg-zinc-900/30"}`}
                                    onClick={() => handleRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls could go here */}
        </div>
    )
}
