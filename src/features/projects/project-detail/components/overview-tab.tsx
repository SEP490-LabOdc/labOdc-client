import React, { useState } from 'react'
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
import { getAvatarUrl, getRoleBasePath, getStatusColor, getStatusLabel, getTagColor } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { toast } from 'sonner'
import { projectKeys, useUpdateStatusHiring, useGetProjectApplicants } from '@/hooks/api/projects'
import { useQueryClient } from '@tanstack/react-query'
import { usePermission } from '@/hooks/usePermission'
import { Plus } from 'lucide-react'
import { useUser } from '@/context/UserContext'

interface ProjectOverviewTabProps {
  projectData: ProjectDetail;
}

export const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({ projectData }) => {
  const navigate = useNavigate()
  const [isHiring, setIsHiring] = useState(projectData.isOpenForApplications)
  const { isMentor } = usePermission()
  const { user } = useUser()

  const updateStatusMutation = useUpdateStatusHiring()
  const queryClient = useQueryClient()

  // Get applicants count
  const { data: applicantsData } = useGetProjectApplicants(projectData.id)
  const applicantsCount = applicantsData?.data?.length || 0

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
            <CircleDotDashed className="h-10 w-10 text-[#2a9d8f] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold">{projectData.title}</h2>
              <p className="text-sm text-gray-500">Mã dự án: {projectData.id.slice(0, 8)}</p>
            </div>
          </div>

          <div className="space-y-5 pt-4 border-t">
            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
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
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    ) : (
                      <Circle className="h-3 w-3 text-red-500 fill-red-500" />
                    )}
                  </>
                ) : (
                  <>
                    {isHiring ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    ) : (
                      <Circle className="h-3 w-3 text-red-500 fill-red-500" />
                    )}
                  </>
                )}
                <Label
                  className={`text-sm font-bold ${isHiring ? 'text-green-700' : 'text-red-700'}`}
                >
                  {isHiring ? 'Dự án đang tuyển' : 'Dự án đã đóng tuyển'}
                </Label>

                {isMentor && (
                  <>
                    <span className="text-gray-300 mx-1">•</span>
                    <button
                      onClick={() => navigate({ to: `${getRoleBasePath(user.role)}/projects/${projectData.id}/candidates` })}
                      className="text-sm text-[#2a9d8f] hover:text-[#238d7f] hover:underline transition-colors flex items-center gap-1"
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
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Đội ngũ</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {projectData.talents && projectData.talents.length > 0 ? (
                    <>
                      {projectData.talents.slice(0, 8).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            <img src={getAvatarUrl(member.name)} alt={member.name} />
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {projectData.talents.length > 8 && (
                        <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-xs font-semibold text-gray-600">
                          +{projectData.talents.length - 8}
                        </div>
                      )}
                      <button
                        onClick={() => navigate({ to: `${getRoleBasePath(user.role)}/projects/${projectData.id}/members` })}
                        className="h-8 px-3 rounded-full bg-[#2a9d8f]/10 hover:bg-[#2a9d8f]/20 text-[#2a9d8f] text-xs font-medium flex items-center gap-1 transition-colors border border-[#2a9d8f]/30"
                      >
                        <Plus className="h-3 w-3" />
                        Thêm/Sửa
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Chưa có thành viên trong đội ngũ</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Giảng viên</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {projectData.mentors ? projectData.mentors.map((leader) => (
                  <div key={leader.id} className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{leader.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">{leader.name}</span>
                  </div>
                )) : (
                  <span className="text-sm text-gray-500">Chưa có giảng viên phụ trách</span>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Quản lý dự án</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={projectData.createdByAvatar} />
                    <AvatarFallback>{projectData.createdByName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-gray-800">{projectData.createdByName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <Tag className="h-4 w-4" />
                <span>Nhãn</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {projectData.skills.map((skill) => (
                  <Badge key={skill.id} className={`px-3 py-1 text-sm rounded ${getTagColor(skill.name)}`}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>Mô tả</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 leading-relaxed">{projectData.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
