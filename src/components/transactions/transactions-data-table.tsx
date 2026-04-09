"use client"

import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    CheckCircle2Icon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ColumnsIcon,
    GripVerticalIcon,
    LoaderIcon
} from "lucide-react"
import * as React from "react"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { AddTransactionDialog } from "./add-transaction-dialog"
import { TransactionDetails } from "./transaction-details"

// Define the schema based on Transaction type
export const schema = z.object({
    id: z.string(),
    date: z.string(),
    name: z.string(),
    amount: z.number(),
    type: z.enum(["Incoming", "Outgoing"]),
    status: z.enum(["Done", "Pending", "Failed"]),
    account: z.string(),
    category: z.string(),
    note: z.string().optional(),
})

export type Transaction = z.infer<typeof schema>

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
    const { attributes, listeners } = useSortable({
        id,
    })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent cursor-grab active:cursor-grabbing"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

const columns: ColumnDef<Transaction>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                                ? "indeterminate"
                                : false
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Payee",
        cell: ({ row }) => {
            return (
                <TableCellViewer item={row.original}>
                    <Button variant="link" className="w-fit px-0 text-left text-foreground font-medium">
                        {row.original.name}
                    </Button>
                </TableCellViewer>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const dateStr = row.original.date;
            // Assuming dateStr is "HH:mm MMM DD" or similar from data.ts e.g., "0:05 Dec 21"
            // Start by splitting. If format is strictly "H:mm MMM DD"
            // User wants "Date first then time". -> "Dec 21, 0:05"
            let formatted = dateStr;
            const parts = dateStr.split(" ");
            if (parts.length >= 3) {
                // parts[0] = time, parts[1] = month, parts[2] = day
                formatted = `${parts[1]} ${parts[2]}, ${parts[0]}`;
            }

            return (
                <TableCellViewer item={row.original}>
                    <div className="text-muted-foreground text-sm cursor-pointer hover:underline decoration-muted-foreground/50 underline-offset-4">
                        {formatted}
                    </div>
                </TableCellViewer>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = row.original.amount
            const isIncome = row.original.type === "Incoming"
            return (
                <TableCellViewer item={row.original}>
                    <div className={`text-right font-medium cursor-pointer hover:underline decoration-muted-foreground/50 underline-offset-4 ${isIncome ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {isIncome ? "+" : ""}{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}
                    </div>
                </TableCellViewer>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className="flex w-fit gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
                {row.original.status === "Done" ? (
                    <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                ) : row.original.status === "Pending" ? (
                    <LoaderIcon className="animate-spin" />
                ) : (
                    <div className="size-1.5 rounded-full bg-red-500" />
                )}
                {row.original.status}
            </Badge>
        ),
    },

]

function DraggableRow({ row }: { row: Row<Transaction> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 group"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function TransactionsDataTable({
    data: initialData,
}: {
    data: Transaction[]
}) {
    const [data, setData] = React.useState(initialData)

    // Sync local state with prop updates (from Context)
    React.useEffect(() => {
        setData(initialData)
    }, [initialData])

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const sortableId = React.useId()
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ id }) => id) || [],
        [data]
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id)
                const newIndex = dataIds.indexOf(over.id)
                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    const handleAddTransaction = (newTransaction: Transaction) => {
        // Prepend the new transaction to the data
        setData((prev) => [newTransaction, ...prev])
    }

    return (
        <Tabs
            defaultValue="all"
            className="flex w-full flex-col justify-start gap-6"
        >
            <div className="flex items-center justify-between px-4 lg:px-6">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="all">
                    <SelectTrigger
                        className="@4xl/main:hidden flex w-fit"
                        id="view-selector"
                    >
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expenses">Expenses</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="@4xl/main:flex hidden">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <ColumnsIcon />
                                <span className="hidden lg:inline">Columns</span>
                                <ChevronDownIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AddTransactionDialog />
                </div>
            </div>
            <TabsContent
                value="all"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <TransactionTableContent
                    table={table}
                    sensors={sensors}
                    sortableId={sortableId}
                    handleDragEnd={handleDragEnd}
                    dataIds={dataIds}
                    columns={columns}
                />
            </TabsContent>
            <TabsContent
                value="income"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                {/* Filtering logic would ideally happen at the Data level or use Table filters. 
              For now just rendering the full table for demo of layout. 
          */}
                <TransactionTableContent
                    table={table}
                    sensors={sensors}
                    sortableId={sortableId}
                    handleDragEnd={handleDragEnd}
                    dataIds={dataIds}
                    columns={columns}
                />
            </TabsContent>
            <TabsContent
                value="expenses"
                className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
            >
                <TransactionTableContent
                    table={table}
                    sensors={sensors}
                    sortableId={sortableId}
                    handleDragEnd={handleDragEnd}
                    dataIds={dataIds}
                    columns={columns}
                />
            </TabsContent>
        </Tabs>
    )
}

function TransactionTableContent({ table, sensors, sortableId, handleDragEnd, dataIds, columns }: any) {
    return (
        <>
            <div className="overflow-hidden rounded-lg border">
                <DndContext
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                    sensors={sensors}
                    id={sortableId}
                >
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            {table.getHeaderGroups().map((headerGroup: any) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header: any) => {
                                        return (
                                            <TableHead key={header.id} colSpan={header.colSpan}>
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
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {table.getRowModel().rows?.length ? (
                                <SortableContext
                                    items={dataIds}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {table.getRowModel().rows.map((row: any) => (
                                        <DraggableRow key={row.id} row={row} />
                                    ))}
                                </SortableContext>
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
                </DndContext>
            </div>
            <div className="flex items-center justify-between px-4">
                <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="w-20" id="rows-per-page">
                                <SelectValue
                                    placeholder={table.getState().pagination.pageSize}
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}


function TableCellViewer({ item, children }: { item: Transaction, children: React.ReactNode }) {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer hover:underline decoration-muted-foreground/50 underline-offset-4">
                    {children}
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col sm:max-w-md">
                <SheetHeader className="gap-1">
                    <SheetTitle>Transaction Details</SheetTitle>
                    <SheetDescription>
                        View and manage transaction details.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col overflow-y-auto py-4">
                    <TransactionDetails transaction={item} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
