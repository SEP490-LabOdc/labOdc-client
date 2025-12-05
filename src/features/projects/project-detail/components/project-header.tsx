import React from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { usePermission } from '@/hooks/usePermission'
import { ProjectTypes } from '@/hooks/api/projects/types'
import type { ProjectDetail } from '@/hooks/api/projects/types'

interface ProjectPageHeaderProps {
  projectData?: ProjectDetail
}

export const ProjectPageHeader: React.FC<ProjectPageHeaderProps> = ({ projectData }) => {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { user } = useUser()
  const { isCompany, isLabAdmin } = usePermission()

  const handleGoBack = () => {
    // Try to go back in history, if no history, navigate to projects list
    if (window.history.length > 1) {
      history.go(-1)
    } else {
      navigate({ to: `${getRoleBasePath(user?.role)}/projects` })
    }
  }

  const handleCompleteProject = () => {
    console.log('Hoàn thành dự án:', projectData?.id)
  }

  const handleCloseProject = () => {
    console.log('Đóng dự án:', projectData?.id)
  }

  const projectStatus = projectData?.status
  const isOngoing = projectStatus === ProjectTypes.ON_GOING
  const isPaused = projectStatus === ProjectTypes.PAUSED

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
            onClick={handleCompleteProject}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Hoàn thành
          </Button>
        )}

        {showCloseButton && (
          <Button
            onClick={handleCloseProject}
            variant="destructive"
          >
            Đóng dự án
          </Button>
        )}
      </div>
    </div>
  )
}