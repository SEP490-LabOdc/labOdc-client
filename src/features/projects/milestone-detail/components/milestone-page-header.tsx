import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Edit } from 'lucide-react'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'
import { useApproveMilestone, useStartMilestone } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { usePermission } from '@/hooks/usePermission'
import { ProjectStatus } from '@/hooks/api/projects'
import { RejectMilestoneModal } from './reject-milestone-modal'
import { useQueryClient } from '@tanstack/react-query'
import { milestoneKeys } from '@/hooks/api/milestones/query-keys'
import { useNavigate } from '@tanstack/react-router'

interface MilestonePageHeaderProps {
  milestone: MilestoneDetail
}

export const MilestonePageHeader: React.FC<MilestonePageHeaderProps> = ({ milestone }) => {
  const { isCompany, isMentor } = usePermission()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const approveMutation = useApproveMilestone()
  const startMutation = useStartMilestone()

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync(milestone.id)
      toast.success('Milestone đã được phê duyệt')
      await queryClient.invalidateQueries({ queryKey: milestoneKeys.detail(milestone.id) })
    } catch (error) {
      console.error(error)
      toast.error('Không thể phê duyệt milestone')
    }
  }

  const handleStart = async () => {
    try {
      await startMutation.mutateAsync(milestone.id)
      toast.success('Milestone đã được bắt đầu')
      await queryClient.invalidateQueries({ queryKey: milestoneKeys.detail(milestone.id) })
    } catch (error) {
      console.error(error)
      toast.error('Không thể bắt đầu milestone')
    }
  }

  const handleRejectSuccess = async () => {
    toast.success('Milestone đã bị từ chối')
    await queryClient.invalidateQueries({ queryKey: milestoneKeys.detail(milestone.id) })
  }

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {isCompany && milestone.status === ProjectStatus.PENDING && (
                <>
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={handleApprove}
                    disabled={approveMutation.isPending}
                  >
                    Phê duyệt
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => setRejectModalOpen(true)}
                  >
                    Từ chối
                  </Button>
                </>
              )}
              {isMentor && milestone.status === ProjectStatus.PENDING_START && (
                <>
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    onClick={handleStart}
                    disabled={startMutation.isPending}
                  >
                    Bắt đầu
                  </Button>
                </>
              )}
              {isMentor && milestone.status === ProjectStatus.UPDATE_REQUIRED && (
                <>
                  <Button variant="outline" onClick={() => navigate({ to: '/mentor/projects/$projectId/$milestoneId/update', params: { projectId: milestone.projectId, milestoneId: milestone.id } })}>
                    <Edit className="h-4 w-4 mr-2" />
                    Sửa Milestone
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <RejectMilestoneModal
        open={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        milestoneId={milestone.id}
        onSuccess={handleRejectSuccess}
      />
    </>
  )
}
