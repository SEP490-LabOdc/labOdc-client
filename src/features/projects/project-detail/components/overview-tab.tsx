import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  FileText,
  CircleDotDashed,
  Users,
  User,
  Tag,
  CheckSquare,
  Briefcase,
  Circle,
  ArrowRight,
} from 'lucide-react'
import { getRoleBasePath, getStatusColor, getStatusLabel } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { ProjectDetail, ProjectMentor } from '@/hooks/api/projects/types'
import { toast } from 'sonner'
import { projectKeys, useUpdateStatusHiring, useGetProjectApplicants } from '@/hooks/api/projects'
import { useQueryClient } from '@tanstack/react-query'
import { usePermission } from '@/hooks/usePermission'
import { Plus } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { MembersAvatarList } from '@/components/members-avatar-list'
import type { ProjectMember } from '@/hooks/api/projects'
import { UserRole } from '@/hooks/api/users'

interface ProjectOverviewTabProps {
  projectData: ProjectDetail;
}

export const ProjectOverviewTab = ({ projectData }: ProjectOverviewTabProps) => {
  const navigate = useNavigate()
  const [isHiring, setIsHiring] = useState(projectData.isOpenForApplications)
  const { isMentor } = usePermission()
  const { user } = useUser()

  const updateStatusMutation = useUpdateStatusHiring()
  const queryClient = useQueryClient()

  // Get applicants count
  const { data: applicantsData } = useGetProjectApplicants(projectData.id)
  const applicantsCount = applicantsData?.data?.length || 0

  // Map talents to ProjectMember format
  const talents: ProjectMember[] = useMemo(() => {
    return (projectData.talents || []).map((talent: any) => ({
      projectMemberId: talent.id || talent.userId || '',
      userId: talent.id || talent.userId || '',
      fullName: talent.name || 'Unknown',
      email: talent.email || '',
      avatarUrl: talent.avatar || talent.avatarUrl || '',
      roleName: UserRole.TALENT,
      isActive: true,
      joinedAt: new Date().toISOString(),
      leftAt: null,
    }))
  }, [projectData.talents])


  const handleToggleHiring = async (checked: boolean) => {
    updateStatusMutation.mutate(
      {
        projectId: projectData.id,
        isHiring: checked,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: projectKeys.byId(projectData.id),
          })

          setIsHiring(checked)
          toast.success(
            checked
              ? 'Đã mở tuyển dụng cho dự án'
              : 'Đã đóng tuyển dụng cho dự án',
          )
        },
        onError: (error) => {
          toast.error('Cập nhật trạng thái thất bại')
          console.error('Error updating hiring status:', error)
        },
      },
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <CircleDotDashed className="h-10 w-10 text-secondary shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">{projectData.title}</h2>
              <p className="text-sm text-muted-foreground">Mã dự án: {projectData.id.slice(0, 8)}</p>
            </div>
          </div>

          <div className="space-y-5 pt-4 border-t border-primary/20">
            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <CheckSquare className="h-4 w-4" />
                <span>Trạng thái</span>
              </div>
              <div className="flex-1">
                <Badge className={`${getStatusColor(projectData.status)} px-3 py-1 rounded text-xs font-medium`}>
                  {getStatusLabel(projectData.status)}
                </Badge>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>Tuyển dụng</span>
              </div>
              <div className="flex-1 flex items-center gap-3 flex-wrap">
                {isMentor ? (
                  <>
                    <Switch
                      id="hiring-status"
                      checked={isHiring}
                      onCheckedChange={handleToggleHiring}
                      disabled={updateStatusMutation.isPending}
                    />
                    {isHiring ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 dark:bg-green-400"></span>
                      </span>
                    ) : (
                      <Circle className="h-3 w-3 text-destructive fill-destructive" />
                    )}
                  </>
                ) : (
                  <>
                    {isHiring ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 dark:bg-green-400"></span>
                      </span>
                    ) : (
                      <Circle className="h-3 w-3 text-destructive fill-destructive" />
                    )}
                  </>
                )}
                <Label
                  className={`text-sm font-bold ${isHiring ? 'text-green-600 dark:text-green-500' : 'text-destructive'}`}
                >
                  {isHiring ? 'Dự án đang tuyển' : 'Dự án đã đóng tuyển'}
                </Label>

                {isMentor && (
                  <>
                    <span className="text-muted-foreground/50 mx-1">•</span>
                    <button
                      onClick={() => navigate({ to: `${getRoleBasePath(user.role)}/projects/${projectData.id}/candidates` })}
                      className="text-sm text-secondary hover:text-secondary/80 hover:underline transition-colors flex items-center gap-1"
                    >
                      Xem {applicantsCount} Ứng viên
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Section Đội ngũ */}
            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Đội ngũ</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {talents.length > 0 ? (
                    <>
                      <MembersAvatarList
                        members={talents}
                        size="md"
                        maxVisible={8}
                        showCount={false}
                        emptyMessage="Chưa có thành viên trong đội ngũ"
                      />
                      <button
                        onClick={() => navigate({ to: `${getRoleBasePath(user.role)}/projects/${projectData.id}/members` })}
                        className="h-8 px-3 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-medium flex items-center gap-1 transition-colors border border-secondary/30"
                      >
                        <Plus className="h-3 w-3" />
                        Thêm/Sửa
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Chưa có thành viên trong đội ngũ</span>
                      <button
                        onClick={() => navigate({ to: `${getRoleBasePath(user.role)}/projects/${projectData.id}/members` })}
                        className="h-8 px-3 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-medium flex items-center gap-1 transition-colors border border-secondary/30"
                      >
                        <Plus className="h-3 w-3" />
                        Thêm thành viên
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Giảng viên</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {projectData.mentors ? projectData.mentors.map((mentor: ProjectMentor) => (
                  <div key={mentor.id} className="inline-flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-foreground">{mentor.name}</span>
                  </div>
                )) : (
                  <span className="text-sm text-muted-foreground">Chưa có giảng viên phụ trách</span>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Quản lý dự án</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-muted rounded-full px-2 py-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={projectData.createdByAvatar} />
                    <AvatarFallback>{projectData.createdByName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-foreground">{projectData.createdByName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Nhãn</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {projectData.skills.map((skill) => (
                  <Badge key={skill.id} className={`px-3 py-1 text-sm rounded-xl`}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Mô tả</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground/80 leading-relaxed">{projectData.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
