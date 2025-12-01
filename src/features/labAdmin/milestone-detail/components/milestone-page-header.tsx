import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronLeft, Edit, MoreHorizontal } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'

interface MilestonePageHeaderProps {
  milestone: MilestoneDetail
}

export const MilestonePageHeader: React.FC<MilestonePageHeaderProps> = ({ milestone }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: `/lab-admin/projects/${milestone.projectId}` })}
              className="hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{milestone.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span className="hover:underline cursor-pointer">{milestone.projectName}</span>
                <span>/</span>
                <span>{milestone.title}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              <Edit className="h-4 w-4 mr-2" />
              Sửa Milestone
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Đánh dấu Hoàn thành</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Xóa Milestone</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
