import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { formatVND } from '@/helpers/currency'
import { formatDate } from '@/helpers/datetime'
import { type WithdrawalRequestItem, WITHDRAWAL_STATUS_LABEL } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { STATUS_COLORS } from '@/helpers/status'
import { LongText } from '@/components/long-text'

export const withdrawalColumns: ColumnDef<WithdrawalRequestItem>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => (
            <LongText className='max-w-32 font-mono text-xs'>
                {row.getValue('id')?.toString().slice(0, 8)}...
            </LongText>
        ),
        meta: { className: 'w-32' },
    },
    {
        accessorKey: 'userId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='User ID' />
        ),
        cell: ({ row }) => (
            <LongText className='max-w-32 font-mono text-xs'>
                {row.getValue('userId')?.toString().slice(0, 8)}...
            </LongText>
        ),
        meta: { className: 'w-32' },
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
        accessorKey: 'adminNote',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Ghi chú' />
        ),
        cell: ({ row }) => {
            const note = row.getValue('adminNote') as string | null | undefined
            return (
                <LongText className='max-w-48 text-sm'>
                    {note || '-'}
                </LongText>
            )
        },
        meta: { className: 'w-48' },
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
        id: 'actions',
        cell: DataTableRowActions,
        enableHiding: false,
    },
]

