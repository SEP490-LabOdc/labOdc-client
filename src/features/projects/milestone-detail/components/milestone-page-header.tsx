import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, Edit, MoreHorizontal } from 'lucide-react'
import type { ProjectData, Milestone } from '../../data/project-mock-data'

interface MilestonePageHeaderProps {
  milestone: Milestone;
  project: ProjectData;
}

export const MilestonePageHeader: React.FC<MilestonePageHeaderProps> = ({ milestone, project }) => {
  return (
    <div className="bg-white px-6 py-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
          <ChevronLeft className="h-4 w-4" />
          Về trang Dự án
        </Button>
        <Separator orientation="vertical" className="h-6" />
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 hover:underline cursor-pointer">{project.name}</span>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-800">{milestone.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700">
          <Edit className="h-4 w-4 mr-2" />
          Sửa Cột mốc
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Đánh dấu Hoàn thành</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Xóa Cột mốc</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}