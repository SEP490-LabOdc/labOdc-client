import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetMilestonesMembers, useGetMilestonesById } from '@/hooks/api/milestones'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Loader2 } from 'lucide-react'
import { MembersList } from '@/features/projects/members/components'
import type { ProjectMember } from '@/hooks/api/projects'
import { useMemo } from 'react'

export default function MilestoneMembersPage() {
    const { projectId, milestoneId } = useParams({ strict: false })
    const navigate = useNavigate()

    const { data: milestoneData, isLoading: isLoadingMilestone } = useGetMilestonesById(milestoneId as string)
    const { data: membersResponse, isLoading: isLoadingMembers } = useGetMilestonesMembers(milestoneId as string)

    // Map API response to ProjectMember format
    const apiMembersData = membersResponse?.data || {}
    const mentors: ProjectMember[] = useMemo(() => {
        return (apiMembersData.mentors || []).map((mentor: any) => ({
            projectMemberId: mentor.userId || mentor.projectMemberId || '',
            userId: mentor.userId || '',
            fullName: mentor.fullName || mentor.name || 'Unknown',
            email: mentor.email || '',
            avatarUrl: mentor.avatarUrl || mentor.avatar || '',
            roleName: 'MENTOR' as const,
            isLeader: mentor.isLeader || false,
        }))
    }, [apiMembersData.mentors])

    const talents: ProjectMember[] = useMemo(() => {
        return (apiMembersData.talents || []).map((talent: any) => ({
            projectMemberId: talent.userId || talent.projectMemberId || '',
            userId: talent.userId || '',
            fullName: talent.fullName || talent.name || 'Unknown',
            email: talent.email || '',
            avatarUrl: talent.avatarUrl || talent.avatar || '',
            roleName: 'TALENT' as const,
            isLeader: talent.isLeader || false,
        }))
    }, [apiMembersData.talents])

    const isLoading = isLoadingMilestone || isLoadingMembers

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#2a9d8f]" />
                    <p className="text-gray-500 mt-4">Đang tải...</p>
                </div>
            </div>
        )
    }

    const milestoneTitle = milestoneData?.title || 'Milestone'

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: `/mentor/projects/${projectId}/${milestoneId}` })}
                        className="mb-4 hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Quay lại milestone
                    </Button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Users className="h-8 w-8 text-[#2a9d8f]" />
                                Thành viên milestone
                            </h1>
                            <p className="text-gray-500 mt-2">
                                {milestoneTitle} - Quản lý và xem danh sách thành viên tham gia milestone
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mentors Section */}
                <MembersList
                    members={mentors}
                    role="MENTOR"
                    title="Mentors"
                    emptyMessage="Chưa có mentor nào trong milestone"
                    iconColor="#2a9d8f"
                    showActionButton={false}
                />

                {/* Talents Section */}
                <MembersList
                    members={talents}
                    role="TALENT"
                    title="Talents"
                    emptyMessage="Chưa có talent nào trong milestone"
                    iconColor="#e76f51"
                    showActionButton={false}
                />
            </div>
        </div>
    )
}

