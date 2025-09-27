import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes, roles } from '../data/data'
import { type User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const usersColumns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        meta: {
            className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'username',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Username' />
        ),
        cell: ({ row }) => (
            <LongText className='max-w-36 ps-3'>{row.getValue('username')}</LongText>
        ),
        meta: {
            className: cn(
                'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none m-0'
            ),
        },
        enableHiding: false,
    },
    {
        accessorKey: 'fullName',
        header: ({ column }) => (
            <DataTableColumnHeader className='m-0' column={column} title='Tên' />
        ),
        cell: ({ row }) => {
            return <LongText className='max-w-36'>{row.getValue('fullName')}</LongText>
        },
        meta: { className: 'w-36' },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Email' />
        ),
        cell: ({ row }) => (
            <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Số điện thoại' />
        ),
        cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Trạng thái' />
        ),
        cell: ({ row }) => {
            const { status } = row.original
            const badgeColor = callTypes.get(status)
            const STATUS_MAP = {
                'active': 'Đang hoạt động',
                'inactive': 'Không hoạt động',
                'invited': 'Đã mời',
                'suspended': 'Đã tạm khóa',
            } as const;
            const vietnameseStatusLabel = STATUS_MAP[status];
            return (
                <div className='flex space-x-2'>
                    <Badge variant='outline' className={cn('capitalize', badgeColor)}>
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
        accessorKey: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Vai trò' />
        ),
        cell: ({ row }) => {
            const { role } = row.original
            const userType = roles.find(({ value }) => value === role)

            if (!userType) {
                return null
            }
            const STATUS_MAP = {
                'admin': 'Quản trị viên',
                'lab_manager': 'Quản lý Lab',
                'company_admin': 'Quản lý công ty',
                'mentor': 'Mentor',
                'talent': 'Sinh viên',
            } as const;
            const vietnameseStatusLabel = STATUS_MAP[role];

            return (
                <div className='flex items-center gap-x-2'>
                    {userType.icon && (
                        <userType.icon size={16} className='text-muted-foreground' />
                    )}
                    <span className='text-sm capitalize'>{vietnameseStatusLabel}</span>
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
