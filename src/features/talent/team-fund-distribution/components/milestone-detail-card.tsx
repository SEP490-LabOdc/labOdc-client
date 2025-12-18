import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, DollarSign, Clock } from 'lucide-react'
import { formatVND } from '../finance.types'
import { DistributionTable } from './distribution-table'
import { DistributionFooter } from './distribution-footer'
import type { MilestoneFund, MilestoneMember } from '@/hooks/api/milestones/types'

interface MilestoneDetailCardProps {
    milestone: MilestoneFund
    members: MilestoneMember[]
    allocations: Record<string, number>
    onAllocationChange: (memberId: string, amount: number) => void
    currentUserId: string
    isLoadingMembers: boolean
    hasMembers: boolean
    userRole: string
    totalAllocated: number
    remaining: number
    canSubmit: boolean
    isSubmitting: boolean
    onSubmit: () => void
}

export const MilestoneDetailCard: React.FC<MilestoneDetailCardProps> = ({
    milestone,
    members,
    allocations,
    onAllocationChange,
    currentUserId,
    isLoadingMembers,
    hasMembers,
    userRole,
    totalAllocated,
    remaining,
    canSubmit,
    isSubmitting,
    onSubmit
}) => {
    return (
        <Card className="h-full shadow-lg rounded-lg border-2 flex flex-col overflow-hidden">
            {/* Card Header */}
            <CardHeader className="border-b bg-white">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#2a9d8f]" />
                    {milestone.title}
                </CardTitle>
                <CardDescription className="mt-1">
                    {milestone.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Khả dụng: {formatVND(milestone.remainingAmount)}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(milestone.releasedAt).toLocaleDateString('vi-VN')}
                    </Badge>
                </div>
            </CardHeader>

            {/* Card Body - Scrollable Table */}
            <CardContent className="flex-1 overflow-y-auto p-6">
                {!isLoadingMembers && !hasMembers ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-full mb-4">
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Chưa có thành viên trong milestone này
                        </h3>
                        <p className="text-sm text-gray-600 max-w-md">
                            {userRole === 'MENTOR'
                                ? 'Milestone này chưa có mentor nào được thêm vào. Vui lòng thêm mentor trước khi thực hiện phân bổ quỹ.'
                                : 'Milestone này chưa có talent nào được thêm vào. Vui lòng thêm talent trước khi thực hiện phân bổ quỹ.'}
                        </p>
                    </div>
                ) : (
                    <DistributionTable
                        members={members}
                        totalFund={milestone.remainingAmount}
                        allocations={allocations}
                        onAllocationChange={onAllocationChange}
                        currentUserId={currentUserId}
                        isLoading={isLoadingMembers}
                    />
                )}
            </CardContent>

            {/* Card Footer - Fixed at Bottom */}
            <CardFooter className="border-t bg-gray-50 p-4 flex-col gap-3">
                <DistributionFooter
                    milestone={milestone}
                    totalAllocated={totalAllocated}
                    remaining={remaining}
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                    onSubmit={onSubmit}
                />
            </CardFooter>
        </Card>
    )
}

