import React, { useState, useMemo } from 'react'
import { Wallet } from 'lucide-react'
import { toast } from 'sonner'
import {
    ProjectSelector,
    SummaryCards,
    MilestoneList,
    MilestoneDetailCard,
    EmptyMilestoneState
} from './components'
import { useGetMyProjects, useGetProjectMilestones } from '@/hooks/api/projects'
import { useGetMilestonesMembersByRole } from '@/hooks/api/milestones/queries'
import type { MilestoneMember } from '@/hooks/api/milestones'
import { usePermission } from '@/hooks/usePermission'
import { formatVND } from '@/helpers/currency'
import { useDisburse } from '@/hooks/api/disbursement/mutations'
import { UserRole } from '@/hooks/api/users'
import { useGetDisbursementByMilestoneId } from '@/hooks/api/disbursement'
import { DisbursementStatus } from '@/hooks/api/disbursement/enums'
import { Spinner } from '@/components/ui/spinner'
import type { Milestone } from '@/features/labAdmin/data'

export const TeamFundPage: React.FC = () => {
    const { user } = usePermission()

    const [selectedProjectId, setSelectedProjectId] = useState<string>('')
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
    const [allocations, setAllocations] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: projectsResponse, isLoading: isLoadingProjects } = useGetMyProjects('')
    const projects = projectsResponse?.data || []

    const { data: milestonesResponse, isLoading: isLoadingMilestones } = useGetProjectMilestones(selectedProjectId)
    const apiMilestones = milestonesResponse?.data || []

    const currentUserId = user?.userId || ''
    const userRole = user?.role || ''

    const { data: membersResponse, isLoading: isLoadingMembers } = useGetMilestonesMembersByRole(
        selectedMilestoneId,
        userRole
    )

    const { data: disbursementResponse, isLoading: isLoadingDisbursement } = useGetDisbursementByMilestoneId(selectedMilestoneId)
    const disbursement = disbursementResponse?.data
    const hasDisbursement = !!disbursement
    const isDisbursementCompleted = disbursement?.status === DisbursementStatus.COMPLETED

    const roleAmount = useMemo(() => {
        if (!disbursement) return 0
        return userRole === UserRole.MENTOR
            ? disbursement.mentorAmount
            : disbursement.talentAmount
    }, [disbursement, userRole])

    const apiMembers: MilestoneMember[] = membersResponse?.data
        ? (Array.isArray(membersResponse.data)
            ? membersResponse.data
            : [])
        : []

    const hasMembers = apiMembers.length > 0
    const selectedMilestone = apiMilestones.find((m: Milestone) => m.id === selectedMilestoneId)

    const totalAllocated = useMemo(() => {
        if (hasDisbursement && disbursement) {
            return roleAmount
        }
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [hasDisbursement, disbursement, roleAmount, allocations])

    const remaining = selectedMilestone
        ? selectedMilestone.remainingAmount - totalAllocated
        : 0

    const canSubmit = (selectedMilestone
        && !isDisbursementCompleted
        && remaining >= 0
        && totalAllocated > 0
        && hasMembers) || false

    const handleProjectChange = (projectId: string) => {
        setSelectedProjectId(projectId)
        setSelectedMilestoneId('')
        setAllocations({})
    }

    const handleMilestoneChange = (milestoneId: string) => {
        setSelectedMilestoneId(milestoneId)
        setAllocations({})
    }

    const handleAllocationChange = (memberId: string, amount: number) => {
        if (isDisbursementCompleted) return

        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    const { mutateAsync: disburse } = useDisburse()

    const handleConfirmDistribution = async () => {
        if (!canSubmit || !selectedMilestoneId) return

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
                milestoneId: selectedMilestoneId,
                disbursements
            })

            toast.success(`Đã phân bổ thành công ${formatVND(totalAllocated)}`)

            setAllocations({})
            setSelectedMilestoneId('')
        } catch (error: any) {
            console.error('Distribution error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderLoading = () => {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner />
            </div>
        )
    }

    if (isLoadingProjects) {
        return renderLoading()
    }

    return (
        <div className="overflow-hidden">
            <div className="h-full p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-[#2a9d8f]" />
                        Quản lý Quỹ Nhóm
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Phân bổ và quản lý nguồn tiền cho các thành viên trong nhóm
                    </p>
                </div>

                <ProjectSelector
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectChange={handleProjectChange}
                    isLoading={isLoadingProjects}
                />

                <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                        <SummaryCards
                            remainingInHolding={0}
                            totalDistributed={0}
                        />

                        <MilestoneList
                            milestones={apiMilestones}
                            selectedMilestoneId={selectedMilestoneId}
                            selectedProjectId={selectedProjectId}
                            isLoading={isLoadingMilestones}
                            onMilestoneSelect={handleMilestoneChange}
                        />
                    </div>

                    <div className="col-span-12 lg:col-span-8 h-full">
                        {isLoadingMilestones || isLoadingMembers || isLoadingDisbursement ? renderLoading() : selectedMilestone ? (
                            <MilestoneDetailCard
                                milestone={selectedMilestone}
                                members={apiMembers}
                                allocations={allocations}
                                onAllocationChange={handleAllocationChange}
                                currentUserId={currentUserId}
                                hasMembers={hasMembers}
                                userRole={userRole}
                                totalAllocated={totalAllocated}
                                remaining={remaining}
                                canSubmit={canSubmit}
                                isSubmitting={isSubmitting}
                                onSubmit={handleConfirmDistribution}
                                disbursement={disbursement}
                                roleAmount={roleAmount}
                                isDisbursementCompleted={isDisbursementCompleted}
                            />
                        ) : (
                            <EmptyMilestoneState />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamFundPage

