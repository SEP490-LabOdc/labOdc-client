import type { ColumnDef } from '@tanstack/react-table'
import type { Project } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return 'default'
        case 'PENDING':
            return 'secondary'
        case 'COMPLETED':
            return 'default'
        case 'CANCELLED':
            return 'destructive'
        default:
            return 'outline'
    }
}

const getStatusLabel = (status: string): string => {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return 'Đang hoạt động'
        case 'PENDING':
            return 'Đang chờ'
        case 'COMPLETED':
            return 'Đã hoàn thành'
        case 'CANCELLED':
            return 'Đã hủy'
        default:
            return status || 'N/A'
    }
}

export const projectColumns: ColumnDef<Project>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: 'Tiêu đề',
        cell: ({ row }) => (
            <Link
                to="/company/projects/$projectId"
                params={{ projectId: row.original.id }}
                className="font-medium text-blue-600 hover:underline"
            >
                {row.getValue('title')}
            </Link>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => (
            <Badge variant={getStatusVariant(row.getValue('status'))}>
                {getStatusLabel(row.getValue('status'))}
            </Badge>
        ),
    },
    {
        accessorKey: 'startDate',
        header: 'Ngày bắt đầu',
        cell: ({ row }) => {
            const date = row.getValue('startDate') as string
            return date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A'
        },
    },
    {
        accessorKey: 'endDate',
        header: 'Ngày kết thúc',
        cell: ({ row }) => {
            const date = row.getValue('endDate') as string | undefined
            return date ? format(new Date(date), 'dd/MM/yyyy') : 'N/A'
        },
    },
    {
        accessorKey: 'budget',
        header: 'Ngân sách',
        cell: ({ row }) => {
            const budget = row.getValue('budget') as number | undefined
            return budget ? new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(budget) : 'N/A'
        },
    },
    {
        id: 'actions',
        header: 'Hành động',
        cell: ({ row }) => (
            <Button asChild variant="ghost" size="sm">
                <Link
                    to="/company/projects/$projectId"
                    params={{ projectId: row.original.id }}
                    className="flex items-center gap-2"
                >
                    <Eye className="h-4 w-4" />
                    Xem chi tiết
                </Link>
            </Button>
        ),
    },
]
