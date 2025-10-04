import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes } from '../data/data'
import { type Company } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const companiesColumns: ColumnDef<Company>[] = [
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
        meta: {
            className: cn('sticky md:table-cell start-0 z-10 rounded-tl[inherit]'),
        },
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
        accessorKey: 'companyName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên công ty" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-36 ps-3">
                {row.getValue('companyName')}
            </LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none m-0',
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mô tả" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-36 ps-3">
                {row.getValue('description')}
            </LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none m-0',
            ),
        },
    },
    {
        accessorKey: 'taxId',
        header: ({ column }) => (
            <DataTableColumnHeader className="m-0" column={column} title="Mã số thuế" />
        ),
        cell: ({ row }) => {
            return <LongText className="max-w-36">{row.getValue('taxId')}</LongText>
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Địa chỉ" />
        ),
        cell: ({ row }) => {
            return <LongText className="max-w-36">{row.getValue('address')}</LongText>
        },
    },

    // 🔁 ĐÃ SỬA: 'industry' -> 'domain' (Lĩnh vực)
    {
        accessorKey: 'domain',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Lĩnh vực" />
        ),
        cell: ({ row }) => <div>{row.getValue('domain')}</div>,
    },

    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const { status } = row.original
            const badgeColor = callTypes.get(status)
            const STATUS_MAP = {
                approving: 'Chờ phê duyệt',
                rejected: 'Từ chối phê duyệt',
                active: 'Đang hoạt động',
                inactive: 'Không hoạt động',
                suspended: 'Đã tạm khóa',
            } as const
            const vietnameseStatusLabel = STATUS_MAP[status]
            return (
                <div className="flex space-x-2">
                    <Badge variant="outline" className={cn('capitalize', badgeColor)}>
                        {vietnameseStatusLabel}
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
]
