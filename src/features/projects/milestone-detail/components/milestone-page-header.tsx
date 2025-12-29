import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Edit } from 'lucide-react'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'
import { useApproveMilestone, useStartMilestone } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { usePermission } from '@/hooks/usePermission'
import { ProjectStatus } from '@/hooks/api/projects'
import { RejectMilestoneModal } from './reject-milestone-modal'
import { ExtensionRequestModal } from './extension-request-modal'
import { useQueryClient } from '@tanstack/react-query'
import { milestoneKeys } from '@/hooks/api/milestones/query-keys'
import { useNavigate } from '@tanstack/react-router'
import { usePopUp } from '@/hooks/usePopUp'

interface MilestonePageHeaderProps {
  milestone: MilestoneDetail
}

export const MilestonePageHeader: React.FC<MilestonePageHeaderProps> = ({ milestone }) => {
  const { isCompany, isMentor } = usePermission()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['extensionRequest'] as const)
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

  const handleExtensionRequestSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: milestoneKeys.detail(milestone.id) })
  }

  return (
    <>
      <div className="bg-card px-6 lg:px-18 py-4 border-b border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="hover:bg-muted text-muted-foreground hover:text-foreground"
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
                className="text-secondary border-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20"
                onClick={handleApprove}
                disabled={approveMutation.isPending}
              >
                Phê duyệt
              </Button>
              <Button
                variant="outline"
                className="text-destructive border-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
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
                className="text-primary border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
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
          {isMentor && milestone.status === ProjectStatus.ON_GOING && (
            <>
              <Button
                variant="outline"
                className="text-accent border-accent hover:bg-accent/10 dark:hover:bg-accent/20"
                onClick={() => handlePopUpOpen('extensionRequest')}>
                Gia hạn cột mốc
              </Button>
            </>
          )}
        </div>
      </div>

      <RejectMilestoneModal
        open={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        milestoneId={milestone.id}
        onSuccess={handleRejectSuccess}
      />

      <ExtensionRequestModal
        open={popUp.extensionRequest.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            handlePopUpClose('extensionRequest')
          }
        }}
        milestone={milestone}
        onSuccess={handleExtensionRequestSuccess}
      />
    </>
  )
}
