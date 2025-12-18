import React from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { usePermission } from '@/hooks/usePermission'
import { ProjectStatus, useCloseProject, useCompleteProject } from '@/hooks/api/projects'
import type { ProjectDetail } from '@/hooks/api/projects/types'

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
  }

  const handleCloseProject = async (projectId: string) => {
    await closeProjectMutation.mutateAsync(projectId)
  }

  const projectStatus = projectData?.status
  const isOngoing = projectStatus === ProjectStatus.ON_GOING
  const isPaused = projectStatus === ProjectStatus.PAUSED

  // Điều kiện hiển thị nút "Hoàn thành"
  const showCompleteButton = isOngoing && isCompany

  // Điều kiện hiển thị nút "Đóng dự án"
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
          <Button
            onClick={() => handleCompleteProject(projectData?.id)}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={completeProjectMutation.isPending}
          >
            {completeProjectMutation.isPending ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Đang hoàn thành...</>
            ) : (
              'Hoàn thành'
            )}
          </Button>
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