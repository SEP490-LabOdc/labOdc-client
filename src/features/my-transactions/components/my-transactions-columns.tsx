import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { formatVND } from '@/helpers/currency'
import { formatDateTime } from '@/helpers/datetime'
import { LongText } from '@/components/long-text'
import { type Transaction } from './my-transactions-table'
import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock,
    CheckCircle,
    XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DataTableRowActions } from './data-table-row-actions'

const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
        case 'INCOME':
        case 'MILESTONE_RELEASE':
        case 'INTERNAL_DISTRIBUTION':
            return {
                icon: ArrowDownLeft,
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                label: 'Thu nhập',
                sign: '+',
            }
        case 'WITHDRAWAL':
            return {
                icon: ArrowUpRight,
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                label: 'Rút tiền',
                sign: '-',
            }
        case 'DEPOSIT':
            return {
                icon: ArrowDownLeft,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                label: 'Nạp tiền',
                sign: '+',
            }
        case 'REFUND':
            return {
                icon: ArrowUpRight,
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                label: 'Hoàn tiền',
                sign: '-',
            }
        default:
            return {
                icon: ArrowDownLeft,
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                label: 'Giao dịch',
                sign: '',
            }
    }
}

const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
        case 'COMPLETED':
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Hoàn thành
                </Badge>
            )
        case 'PENDING':
            return (
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Đang xử lý
                </Badge>
            )
        case 'FAILED':
            return (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Thất bại
                </Badge>
            )
    }
}

export const myTransactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Loại" />
        ),
        cell: ({ row }) => {
            const type = row.getValue('type') as Transaction['type']
            const typeConfig = getTypeConfig(type)
            const TypeIcon = typeConfig.icon

            return (
                <div className="flex items-center gap-2">
                    <div className={`p-2 ${typeConfig.bgColor} rounded-full`}>
                        <TypeIcon className={`h-4 w-4 ${typeConfig.color}`} />
                    </div>
                    <span className="text-sm font-medium">{typeConfig.label}</span>
                </div>
            )
        },
        meta: { className: 'w-40' },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mô tả" />
        ),
        cell: ({ row }) => {
            const transaction = row.original
            return (
                <div className="flex flex-col">
                    <LongText className="font-medium text-sm max-w-[300px]">
                        {transaction.description}
                    </LongText>
                    {transaction.metadata && (
                        <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                            {transaction.metadata.milestoneName && (
                                <div>{transaction.metadata.milestoneName}</div>
                            )}
                            {transaction.metadata.projectName && (
                                <div>{transaction.metadata.projectName}</div>
                            )}
                            {transaction.metadata.fromUser && (
                                <div>Từ: {transaction.metadata.fromUser}</div>
                            )}
                            {transaction.metadata.bankAccount && (
                                <div>{transaction.metadata.bankAccount}</div>
                            )}
                        </div>
                    )}
                </div>
            )
        },
        meta: { className: 'min-w-[300px]' },
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Số tiền" />
        ),
        cell: ({ row }) => {
            const transaction = row.original
            const typeConfig = getTypeConfig(transaction.type)
            const amount = row.getValue('amount') as number

            return (
                <p className={cn('text-lg font-bold', typeConfig.color)}>
                    {typeConfig.sign}{formatVND(amount)}
                </p>
            )
        },
        meta: { className: 'w-80' },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Trạng thái" />
        ),
        cell: ({ row }) => {
            const status = row.getValue('status') as Transaction['status']
            return getStatusBadge(status)
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        enableHiding: false,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Thời gian" />
        ),
        cell: ({ row }) => {
            const date = row.getValue('createdAt') as string
            return (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{formatDateTime(date)}</span>
                </div>
            )
        },
        meta: { className: 'w-48' },
    },
    {
        id: 'actions',
        cell: DataTableRowActions,
        enableHiding: false,
    },
]

