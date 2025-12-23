import React, { useState } from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { usePermission } from '@/hooks/usePermission'
import { ProjectStatus, useCloseProject, useCompleteProject } from '@/hooks/api/projects'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface ProjectPageHeaderProps {
  projectData: ProjectDetail
}

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = ({ projectData }) => {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { user } = useUser()
  const { isCompany, isLabAdmin } = usePermission()

  const completeProjectMutation = useCompleteProject()
  const closeProjectMutation = useCloseProject()
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)

  const handleGoBack = () => {
    // Try to go back in history, if no history, navigate to projects list
    if (window.history.length > 1) {
      history.go(-1)
    } else {
      navigate({ to: `${getRoleBasePath(user?.role)}/projects` })
    }
  }

  const handleCompleteProject = async (projectId: string) => {
    await completeProjectMutation.mutateAsync(projectId)
    setIsCompleteDialogOpen(false)
  }

  const handleCloseProject = async (projectId: string) => {
    await closeProjectMutation.mutateAsync(projectId)
  }

  const projectStatus = projectData?.status
  const isOngoing = projectStatus === ProjectStatus.ON_GOING
  const isPaused = projectStatus === ProjectStatus.PAUSED

  // Condition to show complete button
  const showCompleteButton = isOngoing && isCompany

  // Condition to show close button
  const showCloseButton = (isOngoing || isPaused) && isLabAdmin

  return (
    <div className="bg-white px-6 lg:px-18 py-4 border-b flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGoBack}
        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Button>

      <div className="flex items-center gap-3">
        {showCompleteButton && (
          <>
            <Button
              onClick={() => setIsCompleteDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={completeProjectMutation.isPending}
            >
              Hoàn thành
            </Button>
            <ConfirmDialog
              open={isCompleteDialogOpen}
              onOpenChange={setIsCompleteDialogOpen}
              title="Xác nhận hoàn thành dự án"
              desc={
                <div className="space-y-2">
                  <p>Bạn có chắc chắn muốn hoàn thành dự án <strong>{projectData?.title}</strong>?</p>
                  <p className="text-sm text-muted-foreground">
                    Sau khi hoàn thành, dự án sẽ được đánh dấu là hoàn thành và không thể chỉnh sửa thêm.
                  </p>
                </div>
              }
              cancelBtnText="Hủy"
              confirmText={
                completeProjectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang xử lý...
                  </>
                ) : (
                  'Xác nhận hoàn thành'
                )
              }
              handleConfirm={() => handleCompleteProject(projectData?.id)}
              isLoading={completeProjectMutation.isPending}
            />
          </>
        )}

        {showCloseButton && (
          <Button
            onClick={() => handleCloseProject(projectData?.id)}
            variant="destructive"
            disabled={closeProjectMutation.isPending}
          >
            {closeProjectMutation.isPending ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang đóng dự án...</>
            ) : (
              'Đóng dự án'
            )}
          </Button>
        )}
      </div>
    </div>
  )
}