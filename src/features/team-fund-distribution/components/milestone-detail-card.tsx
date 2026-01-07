import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, DollarSign } from 'lucide-react'
import { formatVND } from '@/helpers/currency'
import type { Milestone, MilestoneMember } from '@/hooks/api/milestones'
import { UserRole } from '@/hooks/api/users'
import { DistributionFooter, DistributionTable } from './distribution'
import { useGetMilestonesMembersByRole } from '@/hooks/api/milestones/queries'
import { useGetMilestoneWallet } from '@/hooks/api/wallet'
import { useDisburse } from '@/hooks/api/disbursement/mutations'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

interface MilestoneDetailCardProps {
    milestone: Milestone
    milestoneId: string
    userRole: string
    currentUserId: string
    allocations: Record<string, number>
    onAllocationChange: (memberId: string, amount: number) => void
    onDistributionSuccess?: () => void
}

export const MilestoneDetailCard: React.FC<MilestoneDetailCardProps> = ({
    milestone,
    milestoneId,
    userRole,
    currentUserId,
    allocations,
    onAllocationChange,
    onDistributionSuccess
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch members by role
    const { data: membersResponse, isLoading: isLoadingMembers } = useGetMilestonesMembersByRole(
        milestoneId,
        userRole
    )

    // Fetch milestone wallet information
    const { data: walletResponse, isLoading: isLoadingWallet } = useGetMilestoneWallet(milestoneId)

    // Disbursement mutation
    const { mutateAsync: disburse } = useDisburse()

    // Process members data
    const members: MilestoneMember[] = useMemo(() => {
        return membersResponse?.data
            ? (Array.isArray(membersResponse.data)
                ? membersResponse.data
                : [])
            : []
    }, [membersResponse?.data])

    // Process wallet data
    const walletData = walletResponse?.data
    const availableBalance = walletData?.balance ?? 0
    const walletId = walletData?.id

    // Calculate derived values
    const hasMembers = members.length > 0
    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [allocations])

    const remaining = availableBalance - totalAllocated
    const canSubmit = Boolean(
        remaining >= 0
        && totalAllocated > 0
        && hasMembers
        && walletId
    )

    // Handle distribution submission
    const handleConfirmDistribution = async () => {
        if (!canSubmit || !milestoneId || !walletId) return

        const disbursements = Object.entries(allocations)
            .filter(([_, amount]) => amount > 0)
            .map(([userId, amount]) => ({
                userId,
                amount
            }))

        if (disbursements.length === 0) {
            toast.error('Vui lòng phân bổ tiền cho ít nhất một thành viên')
            return
        }

        setIsSubmitting(true)
        try {
            await disburse({
                milestoneId,
                walletId,
                disbursements
            })

            toast.success(`Đã phân bổ thành công ${formatVND(totalAllocated)}`)
            onDistributionSuccess?.()
        } catch (error: any) {
            console.error('Distribution error:', error)
            toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi phân bổ quỹ')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Loading state
    if (isLoadingMembers || isLoadingWallet) {
        return (
            <Card className="h-full shadow-lg rounded-md border-2 flex flex-col overflow-hidden">
                <CardContent className="flex-1 flex items-center justify-center">
                    <Spinner />
                </CardContent>
            </Card>
        )
    }

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
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Khả dụng: {formatVND(availableBalance)}
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
                        totalFund={availableBalance}
                        allocations={allocations}
                        onAllocationChange={onAllocationChange}
                        currentUserId={currentUserId}
                        isReadOnly={false}
                    />
                )}
            </CardContent>

            <CardFooter className="border-t bg-gray-50 p-4 flex-col gap-3">
                <DistributionFooter
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                    onSubmit={handleConfirmDistribution}
                />
            </CardFooter>
        </Card>
    )
}

