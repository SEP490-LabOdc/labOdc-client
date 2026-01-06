import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getPercentage, getBarWidth } from '@/helpers/distribution'
import { formatVND } from '@/helpers/currency'

interface DistributionTableFooterSectionProps {
    totalAllocated: number
    totalFund: number
    isOverAllocated: boolean
}

export const DistributionTableFooterSection: React.FC<DistributionTableFooterSectionProps> = ({
    totalAllocated,
    totalFund,
    isOverAllocated,
}) => {
    const totalPercentage = getPercentage(totalAllocated, totalFund)

    return (
        <tfoot className="bg-gray-50 border-t-2">
            <tr>
                <td className="px-4 py-3 font-bold text-gray-900">
                    Tổng cộng
                </td>
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <p className={cn(
                            "font-bold text-lg",
                            isOverAllocated ? "text-red-600" : "text-gray-900"
                        )}>
                            {formatVND(totalAllocated)}
                        </p>
                        {totalAllocated > 0 && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "font-semibold",
                                    isOverAllocated
                                        ? "bg-red-50 text-red-700 border-red-300"
                                        : totalPercentage === 100
                                            ? "bg-green-50 text-green-700 border-green-300"
                                            : "bg-blue-50 text-blue-700 border-blue-300"
                                )}
                            >
                                {totalPercentage}%
                            </Badge>
                        )}
                    </div>
                </td>
                <td className="px-4 py-3">
                    <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-300",
                                isOverAllocated
                                    ? "bg-red-500"
                                    : totalPercentage === 100
                                        ? "bg-green-500"
                                        : "bg-blue-500"
                            )}
                            style={{ width: getBarWidth(totalPercentage) }}
                        />
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}