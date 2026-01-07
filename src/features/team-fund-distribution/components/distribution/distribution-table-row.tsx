import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Crown, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPercentage, getBarWidth, getPercentageColor } from '@/helpers/distribution'
import { formatVND } from '@/helpers/currency'
import type { MilestoneMember } from '@/hooks/api/milestones'

interface DistributionTableRowProps {
    member: MilestoneMember
    allocation: number
    totalFund: number
    currentUserId: string
    isReadOnly: boolean
    onAllocationChange: (memberId: string, amount: number) => void
}

export const DistributionTableRow: React.FC<DistributionTableRowProps> = ({
    member,
    allocation,
    totalFund,
    currentUserId,
    isReadOnly,
    onAllocationChange,
}) => {
    const percentage = getPercentage(allocation, totalFund)
    const isCurrentUser = member.userId === currentUserId
    const isInactive = member.leftAt !== null && member.leftAt !== undefined

    const handleInputChange = (value: string) => {
        if (isReadOnly) return

        const numericValue = value.replace(/\D/g, '')

        if (numericValue === '') {
            onAllocationChange(member.userId, 0)
            return
        }

        const amount = parseInt(numericValue, 10)

        if (isNaN(amount) || amount < 0) {
            return
        }

        onAllocationChange(member.userId, amount)
    }

    return (
        <tr
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
                        <AvatarImage src={member.avatarUrl} alt={member.fullName} />
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
                                {member.fullName}
                            </p>
                            {member.leader && (
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-50 text-yellow-700 border-yellow-300 flex items-center gap-1"
                                >
                                    <Crown className="h-3 w-3" />
                                    Trưởng nhóm
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

            {/* Allocation Input */}
            <td className="px-4 py-4">
                <div className="flex items-center gap-2 max-w-xs">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={allocation === 0 ? '' : allocation.toString()}
                            onChange={(e) => handleInputChange(e.target.value)}
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
}