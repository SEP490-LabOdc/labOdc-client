import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet, TrendingUp } from 'lucide-react'
import { formatVND } from '@/helpers/currency'
import { Skeleton } from '@/components/ui/skeleton'

interface SummaryCardsProps {
    remainingInHolding: number
    totalDistributed: number
    isLoading?: boolean
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
    remainingInHolding = 0,
    totalDistributed = 0,
    isLoading = false
}) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-3">
                <Card className="border-2 border-indigo-200 shadow-md rounded-md overflow-hidden">
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-indigo-500 to-indigo-600 p-3">
                            <Skeleton className="h-4 w-20 mb-2 bg-white/20" />
                            <Skeleton className="h-8 w-32 bg-white/20" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-green-200 shadow-md rounded-md overflow-hidden">
                    <CardContent className="p-0">
                        <div className="bg-linear-to-r from-green-500 to-green-600 p-3">
                            <Skeleton className="h-4 w-20 mb-2 bg-white/20" />
                            <Skeleton className="h-8 w-32 bg-white/20" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-3">
            {/* Total Held Amount Card */}
            <Card className="border-2 border-indigo-200 shadow-md rounded-md overflow-hidden">
                <CardContent className="p-0">
                    <div className="bg-linear-to-r from-indigo-500 to-indigo-600 p-3 text-white">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Wallet className="h-4 w-4" />
                            <p className="text-xs font-medium">Đang Giữ</p>
                        </div>
                        <p className="text-xl font-bold">
                            {formatVND(remainingInHolding)}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Lifetime Distributed Card */}
            <Card className="border-2 border-green-200 shadow-md rounded-md overflow-hidden">
                <CardContent className="p-0">
                    <div className="bg-linear-to-r from-green-500 to-green-600 p-3 text-white">
                        <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <p className="text-xs font-medium">Đã Chia</p>
                        </div>
                        <p className="text-xl font-bold">
                            {formatVND(totalDistributed)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

