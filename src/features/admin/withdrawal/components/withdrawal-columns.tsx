import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { formatVND } from '@/helpers/currency'
import { formatDate } from '@/helpers/datetime'
import { type WithdrawalRequestItem, WITHDRAWAL_STATUS_LABEL } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { STATUS_COLORS } from '@/helpers/status'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const withdrawalColumns: ColumnDef<WithdrawalRequestItem>[] = [
    {
        accessorKey: 'fullName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Người dùng' />
        ),
        cell: ({ row }) => {
            const { fullName, email, avatarUrl } = row.original

            return (
                <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={avatarUrl ?? undefined} alt={fullName} />
                        <AvatarFallback>{fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium'>{fullName}</span>
                        <span className='text-xs text-muted-foreground'>{email}</span>
                    </div>
                </div>
            )
        },
        meta: { className: 'w-64' },
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Số tiền' />
        ),
        cell: ({ row }) => {
            const amount = row.getValue('amount') as number
            return (
                <div className='font-semibold text-green-600'>
                    {formatVND(amount)}
                </div>
            )
        },
        meta: { className: 'w-40' },
    },
    {
        accessorKey: 'bankInfo',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Thông tin ngân hàng' />
        ),
        cell: ({ row }) => {
            const bankInfo = row.getValue('bankInfo') as WithdrawalRequestItem['bankInfo']
            return (
                <div className='space-y-1'>
                    {bankInfo?.bankName && (
                        <div className='text-sm font-medium'>{bankInfo.bankName}</div>
                    )}
                    {bankInfo?.accountNumber && (
                        <div className='text-xs text-muted-foreground'>
                            Số TK: {bankInfo.accountNumber}
                        </div>
                    )}
                    {bankInfo?.accountHolder && (
                        <div className='text-xs text-muted-foreground'>
                            {bankInfo.accountHolder}
                        </div>
                    )}
                    {!bankInfo?.bankName && !bankInfo?.accountNumber && (
                        <div className='text-xs text-muted-foreground'>-</div>
                    )}
                </div>
            )
        },
        meta: { className: 'w-64' },
    },
    
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Ngày tạo' />
        ),
        cell: ({ row }) => {
            const date = row.getValue('createdAt') as string
            return <div className='text-sm'>{formatDate(date)}</div>
        },
        meta: { className: 'w-48' },
    },
    {
        accessorKey: 'processedAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Ngày xử lý' />
        ),
        cell: ({ row }) => {
            const date = row.getValue('processedAt') as string | null | undefined
            return <div className='text-sm'>{date ? formatDate(date) : '-'}</div>
        },
        meta: { className: 'w-48' },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Trạng thái' />
        ),
        cell: ({ row }) => {
            const status = row.original.status as string
            const statusLabel = WITHDRAWAL_STATUS_LABEL[status] || status
            const colorClass = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.PENDING

            return (
                <Badge variant='outline' className={cn('capitalize border-none', colorClass)}>
                    {statusLabel}
                </Badge>
            )
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
        enableHiding: false,
    },
]