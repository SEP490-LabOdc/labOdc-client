import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Report } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { formatDateOnly, formatDateTime } from '@/helpers/datetime'
import { getReportTypeLabel, getReportStatusBadge } from '@/helpers/report'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAvatarUrl } from '@/lib/utils'

export const reportsColumns: ColumnDef<Report>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'projectName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên dự án" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-40">
                {row.getValue('projectName')}
            </LongText>
        ),
    },
    {
        accessorKey: 'milestoneName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên cột mốc" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-40">
                {row.getValue('milestoneName')}
            </LongText>
        ),
    },
    {
        accessorKey: 'reporterName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Người nộp" />
        ),
        cell: ({ row }) => {
            const report = row.original
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={report.reporterAvatar} />
                        <AvatarFallback>
                            <img src={getAvatarUrl(report.reporterName)} alt={report.reporterName} />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{report.reporterName}</span>
                        {report.reporterEmail && (
                            <span className="text-xs text-muted-foreground">{report.reporterEmail}</span>
                        )}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'companyName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên công ty" />
        ),
        cell: ({ row }) => (
            <span className="text-sm">
                {row.getValue('companyName') || '-'}
            </span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Thời gian nộp" />
        ),
        cell: ({ row }) => {
            const date = row.getValue('createdAt') as string
            return (
                <div className="flex flex-col">
                    <span className="text-sm">{formatDateTime(date)}</span>
                    <span className="text-xs text-muted-foreground">{formatDateOnly(date)}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'reportType',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Loại báo cáo" />
        ),
        cell: ({ row }) => {
            const reportType = row.getValue('reportType')
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {getReportTypeLabel(reportType as string)}
                </Badge>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return getReportStatusBadge(status)
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

