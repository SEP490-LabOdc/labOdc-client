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
import {
    formatVND,
    calculateTeamFundSummary,
    getOpenMilestones,
    type Member,
    type MilestoneFund
} from './finance.types'
import { useGetMyProjects, useGetProjectMilestones } from '@/hooks/api/projects'
import { useGetMilestonesMembers } from '@/hooks/api/milestones/queries'
import type { MilestoneMember } from '@/hooks/api/milestones'
import { usePermission } from '@/hooks/usePermission'

export const TeamFundPage: React.FC = () => {
    const { user } = usePermission()

    // State Management
    const [selectedProjectId, setSelectedProjectId] = useState<string>('')
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
    const [allocations, setAllocations] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch projects
    const { data: projectsResponse, isLoading: isLoadingProjects } = useGetMyProjects('')
    const projects = projectsResponse?.data || []

    // Fetch milestones when project is selected
    const { data: milestonesResponse, isLoading: isLoadingMilestones } = useGetProjectMilestones(selectedProjectId)
    const apiMilestones = milestonesResponse?.data || []

    // Get current user ID (Leader)
    const currentUserId = user?.userId || ''
    const userRole = user?.role || ''

    // Fetch members when milestone is selected
    const { data: membersResponse, isLoading: isLoadingMembers } = useGetMilestonesMembers(selectedMilestoneId)

    // Get the correct member list based on user role
    // API returns: { data: { mentors: [], talents: [] } }
    const apiMembersData = membersResponse?.data || {}
    const apiMembers = useMemo(() => {
        // If user is MENTOR, show mentors list
        // If user is USER/TALENT, show talents list
        if (userRole === 'MENTOR') {
            return apiMembersData.mentors || []
        } else {
            // USER, TALENT, or other roles
            return apiMembersData.talents || []
        }
    }, [apiMembersData, userRole])

    // Map API milestones to MilestoneFund format
    const milestones: MilestoneFund[] = useMemo(() => {
        return apiMilestones.map((m: any) => ({
            id: m.id,
            title: m.title,
            totalReceived: m.budget || 0,
            remainingAmount: m.budget || 0, // TODO: Calculate actual remaining from API
            status: m.status === 'ON_GOING' ? 'OPEN' : 'CLOSED' as const,
            releasedAt: m.endDate || new Date().toISOString(),
            description: m.description || ''
        }))
    }, [apiMilestones])

    // Check if members list is empty (no fallback to mock)
    const hasMembers = apiMembers && apiMembers.length > 0

    // Map API members to Member format
    const members: Member[] = useMemo(() => {
        if (!hasMembers) {
            return [] // Return empty array if no members
        }
        return apiMembers.map((m: MilestoneMember) => {
            // Check if user is leader
            const isLeader = m.leader || m.userId === currentUserId

            return {
                id: m.userId,
                name: m.fullName,
                avatar: m.avatarUrl,
                role: isLeader ? 'LEADER' : 'MEMBER' as const,
                status: (m.leftAt === null || !m.leftAt) ? 'ACTIVE' : 'INACTIVE' as const,
                email: m.email,
                joinedAt: m.joinedAt
            }
        })
    }, [apiMembers, currentUserId, hasMembers])

    // Get open milestones only
    const openMilestones = getOpenMilestones(milestones)

    // Calculate summary stats
    const summary = calculateTeamFundSummary(milestones, members)

    // Get selected milestone
    const selectedMilestone = milestones.find(m => m.id === selectedMilestoneId)

    // Calculate allocations
    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [allocations])

    const remaining = selectedMilestone
        ? selectedMilestone.remainingAmount - totalAllocated
        : 0

    const canSubmit = selectedMilestone && remaining >= 0 && totalAllocated > 0 && hasMembers

    // Handlers
    const handleProjectChange = (projectId: string) => {
        setSelectedProjectId(projectId)
        setSelectedMilestoneId('') // Reset milestone when changing project
        setAllocations({}) // Reset allocations
    }

    const handleMilestoneChange = (milestoneId: string) => {
        setSelectedMilestoneId(milestoneId)
        setAllocations({}) // Reset allocations when changing milestone
    }

    const handleAllocationChange = (memberId: string, amount: number) => {
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    const handleConfirmDistribution = async () => {
        if (!canSubmit) return

        setIsSubmitting(true)
        try {
            // TODO: Call API to submit distribution
            console.log('Distribution:', {
                milestoneId: selectedMilestoneId,
                allocations,
                totalAmount: totalAllocated
            })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast.success(`Đã phân bổ thành công ${formatVND(totalAllocated)}`)

            // Reset state
            setAllocations({})
            setSelectedMilestoneId('')
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
            console.error('Distribution error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="overflow-hidden">
            <div className="h-full p-4">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-[#2a9d8f]" />
                        Quản lý Quỹ Nhóm
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Phân bổ và quản lý nguồn tiền cho các thành viên trong nhóm
                    </p>
                </div>

                {/* Project Selector */}
                <ProjectSelector
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectChange={handleProjectChange}
                    isLoading={isLoadingProjects}
                />

                {/* Master-Detail Layout */}
                <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
                    {/* LEFT COLUMN - Master (Sidebar) */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                        {/* Summary Cards */}
                        <SummaryCards
                            remainingInHolding={summary.remainingInHolding}
                            totalDistributed={summary.totalDistributed}
                        />

                        {/* Milestone List */}
                        <MilestoneList
                            milestones={openMilestones}
                            selectedMilestoneId={selectedMilestoneId}
                            selectedProjectId={selectedProjectId}
                            isLoading={isLoadingMilestones}
                            onMilestoneSelect={handleMilestoneChange}
                        />
                    </div>

                    {/* RIGHT COLUMN - Detail (Work Area) */}
                    <div className="col-span-12 lg:col-span-8 h-full">
                        {selectedMilestone ? (
                            <MilestoneDetailCard
                                milestone={selectedMilestone}
                                members={members}
                                allocations={allocations}
                                onAllocationChange={handleAllocationChange}
                                currentUserId={currentUserId}
                                isLoadingMembers={isLoadingMembers}
                                hasMembers={hasMembers}
                                userRole={userRole}
                                totalAllocated={totalAllocated}
                                remaining={remaining}
                                canSubmit={canSubmit}
                                isSubmitting={isSubmitting}
                                onSubmit={handleConfirmDistribution}
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

