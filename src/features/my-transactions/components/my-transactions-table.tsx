import { useEffect, useState } from 'react'
import {
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { myTransactionsColumns as columns } from './my-transactions-columns'

export interface Transaction {
    id: string
    type: 'INCOME' | 'WITHDRAWAL' | 'DEPOSIT' | 'MILESTONE_RELEASE' | 'REFUND' | 'INTERNAL_DISTRIBUTION'
    amount: number
    description: string
    status: 'COMPLETED' | 'PENDING' | 'FAILED'
    createdAt: string
    metadata?: {
        milestoneName?: string
        bankAccount?: string
        fromUser?: string
        projectName?: string
        [key: string]: unknown
    }
}

const TRANSACTION_STATUS_OPTIONS = [
    { value: 'COMPLETED', label: 'Hoàn thành' },
    { value: 'PENDING', label: 'Đang xử lý' },
    { value: 'FAILED', label: 'Thất bại' },
]

const TRANSACTION_TYPE_OPTIONS = [
    { value: 'INCOME', label: 'Thu nhập' },
    { value: 'WITHDRAWAL', label: 'Rút tiền' },
    { value: 'DEPOSIT', label: 'Nạp tiền' },
    { value: 'MILESTONE_RELEASE', label: 'Giải ngân' },
    { value: 'REFUND', label: 'Hoàn tiền' },
    { value: 'INTERNAL_DISTRIBUTION', label: 'Phân bổ' },
]

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        className: string
    }
}

type DataTableProps = {
    data: Transaction[]
    search: Record<string, unknown>
    navigate: NavigateFn
}

export function MyTransactionsTable({ data, search, navigate }: DataTableProps) {
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [sorting, setSorting] = useState<SortingState>([])

    const {
        columnFilters,
        onColumnFiltersChange,
        pagination,
        onPaginationChange,
        ensurePageInRange,
    } = useTableUrlState({
        search,
        navigate,
        pagination: { defaultPage: 1, defaultPageSize: 20 },
        globalFilter: { enabled: false },
        columnFilters: [
            { columnId: 'status', searchKey: 'status', type: 'array' },
            { columnId: 'type', searchKey: 'type', type: 'array' },
        ],
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
            rowSelection,
            columnFilters,
            columnVisibility,
        },
        enableRowSelection: true,
        onPaginationChange,
        onColumnFiltersChange,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    useEffect(() => {
        ensurePageInRange(table.getPageCount())
    }, [table, ensurePageInRange])

    return (
        <div className="space-y-4 max-sm:has-[div[role='toolbar']]:mb-16">
            <DataTableToolbar
                table={table}
                searchPlaceholder="Tìm kiếm giao dịch..."
                searchKey="description"
                filters={[
                    {
                        columnId: 'status',
                        title: 'Trạng thái',
                        options: TRANSACTION_STATUS_OPTIONS,
                    },
                    {
                        columnId: 'type',
                        title: 'Loại giao dịch',
                        options: TRANSACTION_TYPE_OPTIONS,
                    },
                ]}
            />
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="group/row">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                header.column.columnDef.meta?.className ?? ''
                                            )}
                                        >
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
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="group/row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                cell.column.columnDef.meta?.className ?? ''
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
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
                                    Không có giao dịch nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}   
