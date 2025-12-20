import React from 'react'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatVND } from '@/helpers/currency'
import { DisbursementStatus } from '@/hooks/api/disbursement'
import type { Disbursement } from '@/hooks/api/disbursement'

interface FundSummaryCardsProps {
    totalFund: number
    totalAllocated: number
    remaining: number
    disbursement?: Disbursement
    roleAmount: number
}

export const FundSummaryCards: React.FC<FundSummaryCardsProps> = ({
    totalFund,
    totalAllocated,
    remaining,
    disbursement,
    roleAmount,
}) => {
    const allocatedAmount = disbursement?.status === DisbursementStatus.COMPLETED
        ? roleAmount
        : totalAllocated

    const remainingAmount = disbursement?.status === DisbursementStatus.COMPLETED
        ? 0
        : remaining

    const isOverAllocated = totalAllocated > totalFund

    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Tổng quỹ */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">Tổng quỹ</span>
                </div>
                <p className="text-lg font-bold text-blue-900">{formatVND(totalFund)}</p>
            </div>

            {/* Đã phân bổ */}
            <div className={cn(
                "p-3 border rounded-lg",
                isOverAllocated
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
            )}>
                <div className={cn(
                    "flex items-center gap-2 text-sm mb-1",
                    isOverAllocated ? "text-red-700" : "text-green-700"
                )}>
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">Đã phân bổ</span>
                </div>
                <p className={cn(
                    "text-lg font-bold",
                    isOverAllocated ? "text-red-900" : "text-green-900"
                )}>
                    {formatVND(allocatedAmount)}
                </p>
            </div>

            {/* Còn lại */}
            <div className={cn(
                "p-3 border rounded-lg",
                remaining < 0
                    ? "bg-red-50 border-red-200"
                    : remaining === 0
                        ? "bg-gray-50 border-gray-200"
                        : "bg-orange-50 border-orange-200"
            )}>
                <div className={cn(
                    "flex items-center gap-2 text-sm mb-1",
                    remaining < 0
                        ? "text-red-700"
                        : remaining === 0
                            ? "text-gray-700"
                            : "text-orange-700"
                )}>
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Còn lại</span>
                </div>
                <p className={cn(
                    "text-lg font-bold",
                    remaining < 0
                        ? "text-red-900"
                        : remaining === 0
                            ? "text-gray-900"
                            : "text-orange-900"
                )}>
                    {formatVND(remainingAmount)}
                </p>
            </div>
        </div>
    )
}