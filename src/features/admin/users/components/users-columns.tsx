import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { roles } from '../data/data'
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
                aria-label='Chọn tất cả'
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
                aria-label='Chọn hàng'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'fullName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Họ và tên' />
        ),
        cell: ({ row }) => <LongText className='max-w-36'>{row.getValue('fullName')}</LongText>,
        meta: { className: 'w-40' },
    },

    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Email' />
        ),
        cell: ({ row }) => <LongText className='max-w-50'>{row.getValue('email')}</LongText>,
    },

    {
        accessorKey: 'phone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Số điện thoại' />
        ),
        cell: ({ row }) => <div>{row.getValue('phone') ?? '-'}</div>,
    },

    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Trạng thái' />
        ),
        cell: ({ row }) => {
            const status = row.original.status
            const STATUS_MAP: Record<string, { label: string; color: string }> = {
                ACTIVE: { label: 'Đang hoạt động', color: 'bg-green-500/20 text-green-700 dark:text-green-300' },
                INACTIVE: { label: 'Không hoạt động', color: 'bg-gray-300/30 text-gray-600 dark:text-gray-400' },
                INVITED: { label: 'Đã mời', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-300' },
                SUSPENDED: { label: 'Đã tạm khóa', color: 'bg-red-500/20 text-red-700 dark:text-red-300' },
            }

            const display = STATUS_MAP[status] ?? STATUS_MAP.INACTIVE
            return (
                <Badge variant='outline' className={cn('capitalize border-none', display.color)}>
                    {display.label}
                </Badge>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },

    {
        accessorKey: 'role',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Vai trò' />
        ),
        cell: ({ row }) => {
            const role = row.original.role
            const userRole = roles.find(({ value }) => value === role)

            const ROLE_MAP: Record<string, string> = {
                SYSTEM_ADMIN: 'Quản trị viên',
                LAB_ADMIN: 'Quản lý LabOdc',
                SUPERVISOR: 'Giám sát viên',
                USER: 'Sinh viên',
                COMPANY: 'Đại diện công ty',
            }

            return (
                <div className='flex items-center gap-x-2'>
                    {userRole?.icon && <userRole.icon size={16} className='text-muted-foreground' />}
                    <span className='text-sm'>{ROLE_MAP[role] ?? role}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },

    {
        id: 'actions',
        cell: DataTableRowActions,
    },
]
