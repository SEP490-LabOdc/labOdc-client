import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CalendarDays, CheckCircle2, Circle, Clock, Plus, UserPlus, Users } from 'lucide-react'
import { getRoleBasePath, getStatusColor, getStatusLabel } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import type { Milestone, ProjectDetail } from '@/hooks/api/projects/types'
import { CreateMilestoneModal } from './create-milestone-modal'
import { AddMemberModal } from '@/features/projects/components/add-member-modal'
import { useAddTalentToMilestone } from '@/hooks/api/projects/mutation'
import { useGetProjectMembers } from '@/hooks/api/projects/queries'
import { toast } from 'sonner'
import { usePermission } from '@/hooks/usePermission'

interface MilestonesTabProps {
  milestones: Milestone[]
  projectId: string
  projectData?: ProjectDetail
  onRefresh?: () => void
  showApprovalActions?: boolean
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({
  milestones,
  projectId,
  projectData,
  onRefresh,
}) => {
  const navigate = useNavigate()
  const { user, isMentor } = usePermission()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)

  const { data: projectMembersData, isLoading: isLoadingMembers, refetch: refetchMembers } = useGetProjectMembers(
    projectId,
    selectedMilestoneId || undefined
  )
  const addTalentMutation = useAddTalentToMilestone()

  const projectMembers = projectMembersData?.data || []

  const handleAddMembers = async (selectedUserIds: string[]) => {
    if (!selectedMilestoneId) return
    await refetchMembers()

    try {
      await addTalentMutation.mutateAsync({
        milestoneId: selectedMilestoneId,
        projectMemberIds: selectedUserIds
      })
      toast.success('Thêm thành viên vào milestone thành công')
      onRefresh?.()
    } catch (error) {
      console.error(error)
      toast.error('Thêm thành viên thất bại')
    }
  }

  const openAddMemberModal = (milestoneId: string) => {
    setSelectedMilestoneId(milestoneId)
    setIsAddMemberModalOpen(true)
  }

  const calculateProgress = (startDate: string, endDate: string): number => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()

    if (now < start) return 0
    if (now > end) return 100

    return Math.round(((now - start) / (end - start)) * 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETE':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'ON_GOING':
        return <Clock className="h-4 w-4 text-[#2a9d8f]" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const handleNavigateToMilestone = async (milestoneId: string) => {
    const roleBasePath = user?.role ? getRoleBasePath(user.role) : '/talent'

    await navigate({
      to: `${roleBasePath}/projects/$projectId/${milestoneId}/`,
      params: { projectId }
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Milestones</h2>
        {isMentor && (
          <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tạo Milestone
          </Button>
        )}
      </div>

      {milestones.map((milestone) => {
        const talents = milestone.talents || []
        const progress = calculateProgress(milestone.startDate, milestone.endDate)

        return (
          <Card key={milestone.id} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(milestone.status)}
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm truncate hover:text-[#2a9d8f] cursor-pointer"
                        onClick={() => handleNavigateToMilestone(milestone.id)}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{milestone.description}</p>
                    </div>
                    <Badge className={`${getStatusColor(milestone.status)} rounded-full text-xs flex-shrink-0`}>
                      {getStatusLabel(milestone.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>
                        {new Date(milestone.startDate).toLocaleDateString('vi-VN')} -{' '}
                        {new Date(milestone.endDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-600">Ngân sách:</span>
                      <span className="font-medium text-gray-800">
                        {(milestone.budget ?? 0).toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>

                    <span className="font-medium text-gray-800">{progress}%</span>
                  </div>

                  <Progress value={progress} className="h-1.5" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Users className="h-3.5 w-3.5" />
                          <span>Talents</span>
                        </div>
                        <div className="flex -space-x-2">
                          {talents.length > 0 ? (
                            <span className="text-xs text-gray-400">{talents.length}</span>
                          ) : (
                            <span className="text-xs text-gray-400">Chưa có</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isMentor && milestone.status === 'ON_GOING' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAddMemberModal(milestone.id)}
                          disabled={isLoadingMembers}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Thêm thành viên
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {milestones.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm">Chưa có milestone nào được tạo</p>
            </div>
          </CardContent>
        </Card>
      )}

      <CreateMilestoneModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        projectId={projectId}
        projectData={projectData}
        onSuccess={onRefresh}
      />

      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => {
          setIsAddMemberModalOpen(false)
          setSelectedMilestoneId(null)
        }}
        onAddMembers={handleAddMembers}
        projectMembers={projectMembers}
      />
    </div>
  )
}
