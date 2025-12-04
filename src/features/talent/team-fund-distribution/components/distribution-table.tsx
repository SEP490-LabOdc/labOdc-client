import React, { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Crown,
    User,
    AlertCircle,
    TrendingUp,
    DollarSign
} from 'lucide-react'
import type { Member } from '../finance.types'
import { formatVND, calculatePercentage } from '../finance.types'
import { cn } from '@/lib/utils'

interface DistributionTableProps {
    members: Member[]
    totalFund: number
    allocations: Record<string, number>
    onAllocationChange: (memberId: string, amount: number) => void
    currentUserId?: string
    isLoading?: boolean
}

/**
 * Smart table component for fund distribution
 * Allows leader to input allocation amounts for each member
 */
export const DistributionTable: React.FC<DistributionTableProps> = ({
    members,
    totalFund,
    allocations,
    onAllocationChange,
    currentUserId,
    isLoading = false
}) => {
    // Calculate total allocated
    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [allocations])

    // Calculate remaining
    const remaining = totalFund - totalAllocated

    // Check if over-allocated
    const isOverAllocated = totalAllocated > totalFund

    /**
     * Handle input change with validation
     */
    const handleInputChange = (memberId: string, value: string) => {
        // Remove all non-numeric characters
        const numericValue = value.replace(/\D/g, '')

        if (numericValue === '') {
            onAllocationChange(memberId, 0)
            return
        }

        const amount = parseInt(numericValue, 10)

        // Prevent NaN or negative values
        if (isNaN(amount) || amount < 0) {
            return
        }

        onAllocationChange(memberId, amount)
    }

    /**
     * Get percentage for a member's allocation
     */
    const getPercentage = (amount: number): number => {
        return calculatePercentage(amount, totalFund)
    }

    /**
     * Get percentage bar width (capped at 100%)
     */
    const getBarWidth = (percentage: number): string => {
        return `${Math.min(percentage, 100)}%`
    }

    /**
     * Get percentage color based on value
     */
    const getPercentageColor = (percentage: number): string => {
        if (percentage === 0) return 'bg-gray-200'
        if (percentage < 15) return 'bg-red-400'
        if (percentage < 25) return 'bg-orange-400'
        if (percentage < 40) return 'bg-yellow-400'
        return 'bg-green-500'
    }

    return (
        <div className="space-y-4">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">Tổng quỹ</span>
                    </div>
                    <p className="text-lg font-bold text-blue-900">{formatVND(totalFund)}</p>
                </div>

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
                        {formatVND(totalAllocated)}
                    </p>
                </div>

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
                        {formatVND(remaining)}
                    </p>
                </div>
            </div>

            {/* Warning if over-allocated */}
            {isOverAllocated && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                        <p className="font-semibold">Vượt quá số dư!</p>
                        <p>Bạn đang phân bổ nhiều hơn số tiền có sẵn. Vui lòng điều chỉnh lại.</p>
                    </div>
                </div>
            )}

            {/* Distribution Table */}
            <div className="border rounded-lg overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Table Header */}
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Thành viên
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Số tiền phân bổ
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Tỷ lệ
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
                                            <p>Đang tải danh sách thành viên...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : members.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <User className="h-8 w-8 text-gray-400" />
                                            <p>Chưa có thành viên nào trong milestone này</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => {
                                    const allocation = allocations[member.id] || 0
                                    const percentage = getPercentage(allocation)
                                    const isCurrentUser = member.id === currentUserId
                                    const isInactive = member.status === 'INACTIVE'

                                    return (
                                        <tr
                                            key={member.id}
                                            className={cn(
                                                "transition-colors hover:bg-gray-50",
                                                isCurrentUser && "bg-indigo-50/50 hover:bg-indigo-50",
                                                isInactive && "opacity-60"
                                            )}
                                        >
                                            {/* Member Info */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className={cn(
                                                        "h-10 w-10",
                                                        isInactive && "grayscale"
                                                    )}>
                                                        <AvatarImage src={member.avatar} alt={member.name} />
                                                        <AvatarFallback>
                                                            <User className="h-5 w-5" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className={cn(
                                                                "font-semibold text-gray-900 truncate",
                                                                isInactive && "text-gray-500"
                                                            )}>
                                                                {member.name}
                                                            </p>
                                                            {member.role === 'LEADER' && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-yellow-50 text-yellow-700 border-yellow-300 flex items-center gap-1"
                                                                >
                                                                    <Crown className="h-3 w-3" />
                                                                    Leader
                                                                </Badge>
                                                            )}
                                                            {isInactive && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-gray-100 text-gray-600 border-gray-300"
                                                                >
                                                                    Inactive
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {member.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Input Amount */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2 max-w-xs">
                                                    <div className="relative flex-1">
                                                        <Input
                                                            type="text"
                                                            inputMode="numeric"
                                                            pattern="[0-9]*"
                                                            value={allocation === 0 ? '' : allocation.toString()}
                                                            onChange={(e) => handleInputChange(member.id, e.target.value)}
                                                            placeholder="0"
                                                            className={cn(
                                                                "pr-16 text-right font-mono",
                                                                "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                                                                isCurrentUser && "border-indigo-300",
                                                                allocation > 0 && "border-green-300 bg-green-50/30"
                                                            )}
                                                        />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
                                                            VNĐ
                                                        </span>
                                                    </div>

                                                    {/* Percentage Badge */}
                                                    {allocation > 0 && (
                                                        <Badge
                                                            variant="outline"
                                                            className={cn(
                                                                "font-semibold border-2 min-w-[60px] justify-center",
                                                                percentage < 15 && "bg-red-50 text-red-700 border-red-300",
                                                                percentage >= 15 && percentage < 25 && "bg-orange-50 text-orange-700 border-orange-300",
                                                                percentage >= 25 && percentage < 40 && "bg-yellow-50 text-yellow-700 border-yellow-300",
                                                                percentage >= 40 && "bg-green-50 text-green-700 border-green-300"
                                                            )}
                                                        >
                                                            {percentage}%
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Helper Text */}
                                                {allocation > 0 && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatVND(allocation)}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Percentage Bar */}
                                            <td className="px-4 py-4">
                                                <div className="space-y-1">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full transition-all duration-300",
                                                                getPercentageColor(percentage)
                                                            )}
                                                            style={{ width: getBarWidth(percentage) }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        {percentage > 0 ? `${percentage}% của tổng quỹ` : 'Chưa phân bổ'}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>

                        {/* Table Footer */}
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
                                                        : getPercentage(totalAllocated) === 100
                                                            ? "bg-green-50 text-green-700 border-green-300"
                                                            : "bg-blue-50 text-blue-700 border-blue-300"
                                                )}
                                            >
                                                {getPercentage(totalAllocated)}%
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
                                                    : getPercentage(totalAllocated) === 100
                                                        ? "bg-green-500"
                                                        : "bg-blue-500"
                                            )}
                                            style={{ width: getBarWidth(getPercentage(totalAllocated)) }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Info Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800">
                        💡 <strong>Gợi ý:</strong> Nhấn Tab để di chuyển nhanh giữa các ô nhập liệu
                    </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                        ✓ <strong>Lưu ý:</strong> Tổng phân bổ phải bằng hoặc nhỏ hơn tổng quỹ
                    </p>
                </div>
            </div>
        </div>
    )
}

