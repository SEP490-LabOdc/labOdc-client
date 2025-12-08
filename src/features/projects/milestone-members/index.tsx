import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetMilestonesMembers, useGetMilestonesById, useUpdateMilestoneMemberLeader } from '@/hooks/api/milestones'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Loader2 } from 'lucide-react'
import { MembersList } from '@/features/projects/members/components'
import { ROLE } from '@/const'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { usePermission } from '@/hooks/usePermission'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { milestoneKeys } from '@/hooks/api/milestones'
import { useMemo } from 'react'
import type { ProjectMember } from '@/hooks/api/projects'

export default function MilestoneMembersPage() {
    const { projectId, milestoneId } = useParams({ strict: false })
    const navigate = useNavigate()
    const { user } = useUser()
    const { isLabAdmin, isMentor } = usePermission()
    const queryClient = useQueryClient()

    const { data: milestoneData, isLoading: isLoadingMilestone } = useGetMilestonesById(milestoneId as string)
    const { data: membersResponse, isLoading: isLoadingMembers } = useGetMilestonesMembers(milestoneId as string)

    const updateMilestoneMemberLeaderMutation = useUpdateMilestoneMemberLeader()

    // Map API response to ProjectMember format
    const apiMembersData = membersResponse?.data || { mentors: [], talents: [] }

    // Map mentors to ProjectMember format
    const mentors: ProjectMember[] = useMemo(() => {
        return (apiMembersData.mentors || []).map((mentor: any) => ({
            projectMemberId: mentor.milestoneMemberId || mentor.projectMemberId || mentor.userId || '',
            userId: mentor.userId || '',
            fullName: mentor.name || mentor.fullName || 'Unknown',
            email: mentor.email || '',
            avatarUrl: mentor.avatar || mentor.avatarUrl || '',
            roleName: ROLE.MENTOR as 'MENTOR',
            leader: mentor.leader || mentor.isLeader || false,
        }))
    }, [apiMembersData.mentors])

    // Map talents to ProjectMember format
    const talents: ProjectMember[] = useMemo(() => {
        return (apiMembersData.talents || []).map((talent: any) => ({
            projectMemberId: talent.milestoneMemberId || talent.projectMemberId || talent.userId || '',
            userId: talent.userId || '',
            fullName: talent.name || talent.fullName || 'Unknown',
            email: talent.email || '',
            avatarUrl: talent.avatar || talent.avatarUrl || '',
            roleName: ROLE.TALENT as 'TALENT',
            leader: talent.leader || talent.isLeader || false,
        }))
    }, [apiMembersData.talents])

    const handleToggleMilestoneMemberLeader = (milestoneMemberId: string, currentLeaderStatus: boolean) => {
        updateMilestoneMemberLeaderMutation.mutate(
            {
                milestoneId: milestoneId as string,
                milestoneMemberId: milestoneMemberId,
                leader: !currentLeaderStatus,
            },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: milestoneKeys.milestoneMembers(milestoneId as string),
                    })
                    await queryClient.invalidateQueries({
                        queryKey: milestoneKeys.detail(milestoneId as string),
                    })
                    toast.success(
                        !currentLeaderStatus
                            ? 'Đã đặt làm leader thành công'
                            : 'Đã gỡ quyền leader thành công'
                    )
                },
                onError: (error) => {
                    console.error('Error updating milestone member leader:', error)
                },
            }
        )
    }

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
                        onClick={() => {
                            const basePath = getRoleBasePath(user?.role || '')
                            navigate({ to: `${basePath}/projects/${projectId}/${milestoneId}` })
                        }}
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
                    role={ROLE.MENTOR as 'MENTOR'}
                    title="Mentors"
                    emptyMessage="Chưa có mentor nào trong milestone"
                    iconColor="#2a9d8f"
                    showActionButton={isLabAdmin}
                    isActionLoading={updateMilestoneMemberLeaderMutation.isPending}
                    onToggleLeader={(memberId: string, currentLeaderStatus: boolean) => {
                        const member = mentors.find(m => m.userId === memberId)
                        if (member?.projectMemberId) {
                            handleToggleMilestoneMemberLeader(member.projectMemberId, currentLeaderStatus)
                        }
                    }}
                    leaderLabel="Đặt làm trưởng nhóm"
                    removeLeaderLabel="Gỡ trưởng nhóm"
                    badgeLabel="Trưởng nhóm"
                />

                {/* Talents Section */}
                <MembersList
                    members={talents}
                    role={ROLE.TALENT as 'TALENT'}
                    title="Talents"
                    emptyMessage="Chưa có talent nào trong milestone"
                    iconColor="#e76f51"
                    showActionButton={isMentor}
                    isActionLoading={updateMilestoneMemberLeaderMutation.isPending}
                    onToggleLeader={(memberId: string, currentLeaderStatus: boolean) => {
                        const member = talents.find(t => t.userId === memberId)
                        if (member?.projectMemberId) {
                            handleToggleMilestoneMemberLeader(member.projectMemberId, currentLeaderStatus)
                        }
                    }}
                    leaderLabel="Đặt làm leader"
                    removeLeaderLabel="Gỡ leader"
                    badgeLabel="Leader"
                />
            </div>
        </div>
    )
}

