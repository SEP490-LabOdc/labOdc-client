import React, { useState } from 'react'
import { Wallet } from 'lucide-react'
import {
    ProjectSelector,
    SummaryCards,
    MilestoneList,
    MilestoneDetailCard,
    EmptyMilestoneState
} from './components'
import { useGetMyProjects } from '@/hooks/api/projects'
import { useGetMilestonesPaid } from '@/hooks/api/milestones/queries'
import { usePermission } from '@/hooks/usePermission'
import { Spinner } from '@/components/ui/spinner'
import type { Milestone } from '@/features/labAdmin/data'
import { useGetMilestoneWallet } from '@/hooks/api/wallet'

export const TeamFundPage: React.FC = () => {
    const { user } = usePermission()

    const [selectedProjectId, setSelectedProjectId] = useState<string>('')
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
    const [allocations, setAllocations] = useState<Record<string, number>>({})

    const { data: projectsResponse, isLoading: isLoadingProjects } = useGetMyProjects('')
    const projects = projectsResponse?.data || []

    const { data: milestonesResponse, isLoading: isLoadingMilestones } = useGetMilestonesPaid(selectedProjectId)
    const apiMilestones = milestonesResponse?.data || []

    const currentUserId = user?.userId || ''
    const userRole = user?.role || ''

    // Get milestone wallet information for SummaryCards
    const { data: walletResponse, isLoading: isLoadingWallet } = useGetMilestoneWallet(selectedMilestoneId)
    const walletData = walletResponse?.data
    const availableBalance = walletData?.balance ?? 0
    const heldBalance = walletData?.heldBalance ?? 0

    const selectedMilestone = apiMilestones.find((m: Milestone) => m.id === selectedMilestoneId)

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
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    const handleDistributionSuccess = () => {
        setAllocations({})
        setSelectedMilestoneId('')
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
                        Quản lý quỹ nhóm
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
                            remainingInHolding={heldBalance}
                            totalDistributed={availableBalance}
                            isLoading={isLoadingWallet}
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
                        {isLoadingMilestones ? renderLoading() : selectedMilestone ? (
                            <MilestoneDetailCard
                                milestone={selectedMilestone}
                                milestoneId={selectedMilestoneId}
                                userRole={userRole}
                                currentUserId={currentUserId}
                                allocations={allocations}
                                onAllocationChange={handleAllocationChange}
                                onDistributionSuccess={handleDistributionSuccess}
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

