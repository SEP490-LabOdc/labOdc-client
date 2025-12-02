import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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
import { getAvatarUrl, getStatusColor, getStatusLabel, getTagColor } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { toast } from 'sonner'
import { projectKeys, useUpdateStatusHiring } from '@/hooks/api/projects'
import { useQueryClient } from '@tanstack/react-query'
import { useIsMentor } from '@/hooks/useIsMentor.ts'

interface ProjectOverviewTabProps {
  projectData: ProjectDetail;
}

export const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({ projectData }) => {
  const navigate = useNavigate()
  const [isHiring, setIsHiring] = useState(projectData.isOpenForApplications)

  const updateStatusMutation = useUpdateStatusHiring()
  const queryClient = useQueryClient()

  const isMentor = useIsMentor()

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
            <CircleDotDashed className="h-10 w-10 text-purple-600 flex-shrink-0" />
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

            {/* Show hiring status for everyone, but only allow mentors to change it */}
            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span>Tuyển dụng</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
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
              </div>
            </div>

            {/* Only show candidate button for mentors when hiring */}
            {isMentor && isHiring && (
              <div className="flex items-start">
                <div className="w-40 flex-shrink-0" />
                <div className="flex-1">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigate({ to: `/mentor/projects/${projectData.id}/candidates` })}
                  >
                    Xem danh sách ứng viên
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <div className="w-40 flex-shrink-0 flex items-center gap-3 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Đội ngũ</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                {projectData.talents ? projectData.talents.map((member) => (
                  <div key={member.id} className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        <img src={getAvatarUrl(member.name)} alt={member.name} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">{member.name}</span>
                  </div>
                )) : (
                  <span className="text-sm text-gray-500">Chưa có thành viên trong đội ngũ</span>
                )}
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
