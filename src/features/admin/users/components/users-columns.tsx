import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { callTypes, roles } from '../data/data'
import { USER_ROLE_LABEL, USER_STATUS_LABEL, type User } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { Link } from '@tanstack/react-router'

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
        cell: ({ row }) => (


            <LongText className='max-w-36 ps-3'>
                {(() => {
                    const id = row.original.id;
                    const linkTo = `/admin/users/edit?id=${id}`

                    return (
                        <Link to={linkTo} className="hover:underline">
                            {row.getValue('fullName')}
                        </Link>
                    );
                })()}
            </LongText>
        ),
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

            console.log('Status:', row.original)
            console.log('Label:', USER_STATUS_LABEL[status])

            return (
                <Badge variant='outline' className={cn('capitalize border-none', callTypes.get(status))}>
                    {USER_STATUS_LABEL[status]}
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

            return (
                <div className='flex items-center gap-x-2'>
                    {userRole?.icon && <userRole.icon size={16} className='text-muted-foreground' />}
                    <span className='text-sm'>{USER_ROLE_LABEL[role] ?? role}</span>
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
