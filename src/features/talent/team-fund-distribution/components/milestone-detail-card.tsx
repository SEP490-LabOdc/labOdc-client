import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { formatVND } from '@/helpers/currency'
import type { Milestone, MilestoneMember } from '@/hooks/api/milestones'
import { UserRole } from '@/hooks/api/users'
import type { Disbursement } from '@/hooks/api/disbursement/types'
import { DistributionFooter, DistributionTable } from './distribution'
import { formatDate } from '@/helpers/datetime'

interface MilestoneDetailCardProps {
    milestone: Milestone
    members: MilestoneMember[]
    allocations: Record<string, number>
    onAllocationChange: (memberId: string, amount: number) => void
    currentUserId: string
    hasMembers: boolean
    userRole: string
    totalAllocated: number
    remaining: number
    canSubmit: boolean
    isSubmitting: boolean
    onSubmit: () => void
    disbursement?: Disbursement
    roleAmount: number
    isDisbursementCompleted?: boolean
}

export const MilestoneDetailCard: React.FC<MilestoneDetailCardProps> = ({
    milestone,
    members,
    allocations,
    onAllocationChange,
    currentUserId,
    hasMembers,
    userRole,
    totalAllocated,
    remaining,
    canSubmit,
    isSubmitting,
    onSubmit,
    disbursement,
    roleAmount,
    isDisbursementCompleted = false
}) => {
    return (
        <Card className="h-full shadow-lg rounded-md border-2 flex flex-col overflow-hidden">
            <CardHeader className="border-b bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-[#2a9d8f]" />
                            {milestone.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {milestone.description}
                        </CardDescription>
                    </div>
                    {isDisbursementCompleted && (
                        <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Đã hoàn thành
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Khả dụng: {formatVND(roleAmount)}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(disbursement?.updatedAt)}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6">
                {!hasMembers ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-full mb-4">
                            <Users className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Chưa có thành viên trong milestone này
                        </h3>
                        <p className="text-sm text-gray-600 max-w-md">
                            {userRole === UserRole.MENTOR
                                ? 'Milestone này chưa có mentor nào được thêm vào. Vui lòng thêm mentor trước khi thực hiện phân bổ quỹ.'
                                : 'Milestone này chưa có talent nào được thêm vào. Vui lòng thêm talent trước khi thực hiện phân bổ quỹ.'}
                        </p>
                    </div>
                ) : (
                    <DistributionTable
                        members={members}
                        totalFund={roleAmount}
                        allocations={allocations}
                        onAllocationChange={onAllocationChange}
                        currentUserId={currentUserId}
                        isReadOnly={isDisbursementCompleted}
                        disbursement={disbursement}
                        roleAmount={roleAmount}
                    />
                )}
            </CardContent>

            {!isDisbursementCompleted && (
                <CardFooter className="border-t bg-gray-50 p-4 flex-col gap-3">
                    <DistributionFooter
                        milestone={milestone}
                        totalAllocated={totalAllocated}
                        remaining={remaining}
                        canSubmit={canSubmit}
                        isSubmitting={isSubmitting}
                        onSubmit={onSubmit}
                        disbursement={disbursement}
                        roleAmount={roleAmount}
                        userRole={userRole}
                    />
                </CardFooter>
            )}
        </Card>
    )
}

