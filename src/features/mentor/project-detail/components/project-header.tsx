import React from 'react'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'

export const ProjectPageHeader: React.FC = () => {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { user } = useUser()

  const handleGoBack = () => {
    // Try to go back in history, if no history, navigate to projects list
    if (window.history.length > 1) {
      history.go(-1)
    } else {
      navigate({ to: `${getRoleBasePath(user?.role)}/projects` })
    }
  }

  return (
    <div className="bg-white px-6 lg:px-18 py-4 border-b">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGoBack}
        className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Quay lại
      </Button>
    </div>
  )
}