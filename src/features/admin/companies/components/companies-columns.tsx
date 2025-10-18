import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes } from '../data/data'
import { type Company } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

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
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tên công ty" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-36 ps-3">
                {row.getValue('name')}
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
            <DataTableColumnHeader className="m-0" column={column} title="Mô tả" />
        ),
        cell: ({ row }) => {
            return <LongText className="max-w-36">{row.getValue('description')}</LongText>
        },
        meta: { className: 'w-36' },
        enableHiding: true,
    },
    {
        accessorKey: 'taxCode',
        header: ({ column }) => (
            <DataTableColumnHeader className="m-0" column={column} title="Mã số thuế" />
        ),
        cell: ({ row }) => {
            return <LongText className="max-w-36">{row.getValue('taxCode')}</LongText>
        },
        meta: { className: 'w-36' },
        enableHiding: true,
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
    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="SĐT Công ty" />
        ),
        cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    },
    {
        accessorKey: 'contactPersonName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Người liên hệ" />
        ),
        cell: ({ row }) => <div>{row.getValue('contactPersonName')}</div>,
    },
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
                PENDING: 'Chờ xác thực',
                UPDATE_REQUIRED: 'Yêu cầu cập nhật',
                ACTIVE: 'Đang hoạt động',
                DISABLED: 'Vô hiệu hóa',
            } as const

            const vietnameseStatusLabel = STATUS_MAP[status as keyof typeof STATUS_MAP]

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
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ngày tạo" />
        ),
        cell: ({ row }) => {
            // Lấy giá trị chuỗi ngày tháng từ row
            const dateString = row.getValue('createdAt') as string

            // Chuyển đổi chuỗi thành đối tượng Date
            const dateValue = new Date(dateString)

            // Kiểm tra xem đối tượng Date có hợp lệ không (để tránh lỗi nếu chuỗi bị sai định dạng)
            if (isNaN(dateValue.getTime())) {
                return <div>Không hợp lệ</div>;
            }

            return <div className="min-w-[100px]">{formatDate(dateValue)}</div>
        },
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
    },
]