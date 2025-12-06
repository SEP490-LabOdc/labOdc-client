import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetProjectMembers } from '@/hooks/api/projects/queries'
import { useUpdateTalentLeader, useUpdateMentorLeader, projectKeys, type ProjectMember } from '@/hooks/api/projects'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { usePermission } from '@/hooks/usePermission'
import { MembersList } from './components'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'

export default function ProjectMembersPage() {
  const { projectId } = useParams({ strict: false })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLabAdmin, isMentor } = usePermission()
  const { user } = useUser()

  const { data: projectMembersData, isLoading } = useGetProjectMembers(projectId as string)
  const projectMembers = projectMembersData?.data || []

  const updateTalentLeaderMutation = useUpdateTalentLeader()
  const updateMentorLeaderMutation = useUpdateMentorLeader()

  const handleToggleTalentLeader = (talentId: string, currentLeaderStatus: boolean) => {
    updateTalentLeaderMutation.mutate(
      {
        projectId: projectId as string,
        talentId: talentId,
        isLeader: !currentLeaderStatus,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: projectKeys.getProjectMembers(projectId as string),
          })
          await queryClient.invalidateQueries({
            queryKey: projectKeys.byId(projectId as string),
          })
          toast.success(
            !currentLeaderStatus
              ? 'Đã đặt làm leader thành công'
              : 'Đã gỡ quyền leader thành công'
          )
        },
        onError: (error) => {
          toast.error('Cập nhật thất bại')
          console.error('Error updating talent leader:', error)
        },
      }
    )
  }

  const handleToggleMentorLeader = (mentorId: string, currentLeaderStatus: boolean) => {
    updateMentorLeaderMutation.mutate(
      {
        projectId: projectId as string,
        mentorId: mentorId,
        isLeader: !currentLeaderStatus,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: projectKeys.getProjectMembers(projectId as string),
          })
          await queryClient.invalidateQueries({
            queryKey: projectKeys.byId(projectId as string),
          })
          toast.success(
            !currentLeaderStatus
              ? 'Đã đặt làm trưởng nhóm thành công'
              : 'Đã gỡ quyền trưởng nhóm thành công'
          )
        },
        onError: (error) => {
          toast.error('Cập nhật thất bại')
          console.error('Error updating mentor leader:', error)
        },
      }
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    )
  }

  // Group members by role
  const mentors = projectMembers.filter((m: ProjectMember) => m.roleName === 'MENTOR')
  const talents = projectMembers.filter((m: ProjectMember) => m.roleName === 'TALENT')

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
              navigate({ to: `${basePath}/projects/${projectId}` })
            }}
            className="mb-4 hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Quay lại dự án
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-[#2a9d8f]" />
                Thành viên dự án
              </h1>
              <p className="text-gray-500 mt-2">
                Quản lý và xem danh sách thành viên tham gia dự án
              </p>
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <MembersList
          members={mentors}
          role="MENTOR"
          title="Mentors"
          emptyMessage="Chưa có mentor nào trong dự án"
          iconColor="#2a9d8f"
          showActionButton={isLabAdmin}
          isActionLoading={updateMentorLeaderMutation.isPending}
          onToggleLeader={handleToggleMentorLeader}
          leaderLabel="Đặt làm trưởng nhóm"
          removeLeaderLabel="Gỡ trưởng nhóm"
          badgeLabel="Trưởng nhóm"
        />

        {/* Talents Section */}
        <MembersList
          members={talents}
          role="TALENT"
          title="Talents"
          emptyMessage="Chưa có talent nào trong dự án"
          iconColor="#e76f51"
          showActionButton={isMentor}
          isActionLoading={updateTalentLeaderMutation.isPending}
          onToggleLeader={handleToggleTalentLeader}
          leaderLabel="Đặt làm leader"
          removeLeaderLabel="Gỡ leader"
          badgeLabel="Leader"
        />
      </div>
    </div>
  )
}