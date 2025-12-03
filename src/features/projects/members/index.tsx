import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetProjectMembers } from '@/hooks/api/projects/queries'
import { useUpdateTalentLeader, useUpdateMentorLeader, projectKeys, type ProjectMember } from '@/hooks/api/projects'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Crown, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getAvatarUrl } from '@/lib/utils'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { usePermission } from '@/hooks/usePermission'

export default function ProjectMembersPage() {
  const { projectId } = useParams({ strict: false })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLabAdmin, isMentor } = usePermission()

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
            onClick={() => navigate({ to: `/mentor/projects/${projectId}` })}
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2a9d8f]" />
              Mentors ({mentors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentors.map((mentor: ProjectMember) => (
                  <div
                    key={mentor.projectMemberId}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white relative"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {mentor.isLeader && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Trưởng nhóm
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3 pr-24">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatarUrl} />
                        <AvatarFallback>
                          <img src={getAvatarUrl(mentor.fullName)} alt={mentor.fullName} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {mentor.fullName}
                          {mentor.isLeader && (
                            <Crown className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{mentor.email}</div>
                      </div>
                    </div>
                    {isLabAdmin && (
                      <Button
                        size="sm"
                        variant={mentor.isLeader ? "default" : "outline"}
                        className={`w-full mt-3 ${mentor.isLeader
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                          }`}
                        disabled={updateMentorLeaderMutation.isPending}
                        onClick={() => handleToggleMentorLeader(mentor.userId, mentor.isLeader || false)}
                      >
                        {updateMentorLeaderMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : mentor.isLeader ? (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Gỡ trưởng nhóm
                          </>
                        ) : (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Đặt làm trưởng nhóm
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Chưa có mentor nào trong dự án
              </p>
            )}
          </CardContent>
        </Card>

        {/* Talents Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#e76f51]" />
              Talents ({talents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {talents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {talents.map((talent: ProjectMember) => (
                  <div
                    key={talent.projectMemberId}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white relative"
                  >
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {talent.isLeader && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Leader
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3 pr-24">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={talent.avatarUrl} />
                        <AvatarFallback>
                          <img src={getAvatarUrl(talent.fullName)} alt={talent.fullName} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          <span className="truncate">{talent.fullName}</span>
                        </div>
                        <div className="text-sm text-gray-500 truncate">{talent.email}</div>
                      </div>
                    </div>
                    {isMentor && (
                      <Button
                        size="sm"
                        variant={talent.isLeader ? "default" : "outline"}
                        className={`w-full mt-3 ${talent.isLeader
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                          }`}
                        disabled={updateTalentLeaderMutation.isPending}
                        onClick={() => handleToggleTalentLeader(talent.userId, talent.isLeader || false)}
                      >
                        {updateTalentLeaderMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : talent.isLeader ? (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Gỡ leader
                          </>
                        ) : (
                          <>
                            <Crown className="h-4 w-4 mr-2" />
                            Đặt làm leader
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Chưa có talent nào trong dự án
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}