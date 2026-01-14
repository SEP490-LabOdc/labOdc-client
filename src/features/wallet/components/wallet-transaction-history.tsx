import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock,
    CheckCircle,
    XCircle,
    History,
    Eye
} from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

export interface Transaction {
    id: string
    type: 'INCOME' | 'WITHDRAWAL' | 'DEPOSIT' | 'MILESTONE_RELEASE' | 'REFUND' | 'INTERNAL_DISTRIBUTION'
    amount: number
    description: string
    status: 'COMPLETED' | 'PENDING' | 'FAILED'
    createdAt: string
    metadata?: {
        milestoneName?: string
        bankAccount?: string
        fromUser?: string
        projectName?: string
        [key: string]: unknown
    }
}

interface WalletTransactionHistoryProps {
    transactions: Transaction[]
    isLoading?: boolean
    onViewAll?: () => void
}

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)

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
                sign: '+'
            }
        case 'DEPOSIT':
            return {
                icon: ArrowDownLeft,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                label: 'Nạp tiền',
                sign: '+'
            }
        case 'WITHDRAWAL':
            return {
                icon: ArrowUpRight,
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                label: 'Rút tiền',
                sign: '-'
            }
        case 'REFUND':
            return {
                icon: ArrowUpRight,
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                label: 'Hoàn tiền',
                sign: '-'
            }
        default:
            return {
                icon: ArrowDownLeft,
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                label: 'Giao dịch',
                sign: ''
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

export const WalletTransactionHistory: React.FC<WalletTransactionHistoryProps> = ({
    transactions,
    isLoading = false,
    onViewAll
}) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <History className="h-6 w-6 text-[#2a9d8f]" />
                            Lịch sử Giao dịch
                        </CardTitle>
                        <CardDescription>
                            Theo dõi các khoản thu nhập và rút tiền
                        </CardDescription>
                    </div>
                    {onViewAll && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={onViewAll}
                            className="flex items-center gap-2"
                        >
                            <Eye className="h-4 w-4" />
                            Xem tất cả
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Spinner className="w-10 h-10" />
                    </div>
                ) : transactions.length > 0 ? (
                    <div className="space-y-3">
                        {transactions.map((transaction) => {
                            const typeConfig = getTypeConfig(transaction.type)
                            const TypeIcon = typeConfig.icon

                            return (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 ${typeConfig.bgColor} rounded-full`}>
                                            <TypeIcon className={`h-5 w-5 ${typeConfig.color}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {transaction.description}
                                                </p>
                                                {getStatusBadge(transaction.status)}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="h-3 w-3" />
                                                <span>
                                                    {new Date(transaction.createdAt).toLocaleString('vi-VN')}
                                                </span>
                                            </div>
                                            {transaction.metadata && (
                                                <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                                                    {transaction.metadata.milestoneName && (
                                                        <div>📍 {transaction.metadata.milestoneName}</div>
                                                    )}
                                                    {transaction.metadata.projectName && (
                                                        <div>📁 {transaction.metadata.projectName}</div>
                                                    )}
                                                    {transaction.metadata.fromUser && (
                                                        <div>👤 Từ: {transaction.metadata.fromUser}</div>
                                                    )}
                                                    {transaction.metadata.bankAccount && (
                                                        <div>🏦 {transaction.metadata.bankAccount}</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-bold ${typeConfig.color}`}>
                                            {typeConfig.sign}{formatVND(transaction.amount)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {typeConfig.label}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <History className="h-16 w-16 mx-auto text-gray-300 mb-3" />
                        <p className="font-medium">Chưa có giao dịch nào</p>
                        <p className="text-sm mt-1">
                            Lịch sử giao dịch sẽ hiển thị ở đây khi bạn nhận hoặc rút tiền
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

