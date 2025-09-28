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
import { type Company } from '../data/schema'
//import { DataTableBulkActions } from './data-table-bulk-actions'
import { companiesColumns as columns } from './companies-columns'

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        className: string
    }
}

type DataTableProps = {
    data: Company[]
    search: Record<string, unknown>
    navigate: NavigateFn
}

export function CompaniesTable({ data, search, navigate }: DataTableProps) {
    // Local UI-only states
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [sorting, setSorting] = useState<SortingState>([])

    // Local state management for table (uncomment to use local-only state, not synced with URL)
    // const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
    // const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

    // Synced with URL states (keys/defaults mirror users route search schema)
    const {
        columnFilters,
        onColumnFiltersChange,
        pagination,
        onPaginationChange,
        ensurePageInRange,
    } = useTableUrlState({
        search,
        navigate,
        pagination: { defaultPage: 1, defaultPageSize: 10 },
        globalFilter: { enabled: false },
        columnFilters: [
            // username per-column text filter
            { columnId: 'companyName', searchKey: 'companyName', type: 'string' },
            { columnId: 'status', searchKey: 'status', type: 'array' }
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
        <div className='space-y-4 max-sm:has-[div[role="toolbar"]]:mb-16'>
            <DataTableToolbar
                table={table}
                searchPlaceholder='Tìm kiếm công ty...'
                searchKey='username'
                filters={[
                    {
                        columnId: 'status',
                        title: 'Trạng thái',
                        options: [
                            { label: 'Đang hoạt động', value: 'active' },
                            { label: 'Không hoạt động', value: 'inactive' },
                            { label: 'Đã tạm khóa', value: 'suspended' },
                            { label: 'Chờ phê duyệt', value: 'approving' },
                            { label: 'Từ chối phê duyệt', value: 'rejected' },
                        ],
                    },
                ]}
            />
            <div className='overflow-hidden rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='group/row'>
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
                                    className='group/row'
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
                                    className='h-24 text-center'
                                >
                                    Không có kết quả nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
            {/* <DataTableBulkActions table={table} /> */}
        </div>
    )
}
