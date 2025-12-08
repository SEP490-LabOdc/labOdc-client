import { useState } from 'react'
import {
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { systemConfigsColumns } from './system-configs-columns'
import type { SystemConfig } from '@/hooks/api/system-config/types'
import { cn } from '@/lib/utils'

type SystemConfigsTableProps = {
    data: SystemConfig[]
    selectedConfig: SystemConfig | null
    onSelectConfig: (config: SystemConfig | null) => void
}

export function SystemConfigsTable({
    data,
    selectedConfig,
    onSelectConfig,
}: SystemConfigsTableProps) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns: systemConfigsColumns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const isSelected = selectedConfig?.id === row.original.id
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={isSelected && 'selected'}
                                    className={cn(
                                        'cursor-pointer hover:bg-muted/50',
                                        isSelected && 'bg-muted'
                                    )}
                                    onClick={() => {
                                        if (isSelected) {
                                            onSelectConfig(null)
                                        } else {
                                            onSelectConfig(row.original)
                                        }
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={systemConfigsColumns.length}
                                className="h-24 text-center"
                            >
                                Không có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

