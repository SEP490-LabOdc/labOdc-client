import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getStatusColor } from '@/lib/utils'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { getAvatarFallback } from '@/helpers/stringUtils.ts'

interface ProjectSidebarProps {
  projectData: ProjectDetail;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ projectData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">Thông tin dự án</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Khách hàng', value: projectData.companyName },
            { label: 'Tổng chi phí dự án', value: `${projectData.budget.toLocaleString('vi-VN')} VNĐ` },
            { label: 'Số dư ngân sách', value: `${(projectData.remainingBudget ?? 0).toLocaleString('vi-VN')} VNĐ` },
            { label: 'Ngày tạo', value: new Date(projectData.createdAt).toLocaleDateString('vi-VN') },
            { label: 'Ngày bắt đầu', value: new Date(projectData.startDate).toLocaleDateString('vi-VN') },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}:</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ngày kết thúc:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {new Date(projectData.endDate).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Người tạo:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={projectData.createdByAvatar} />
                <AvatarFallback>{getAvatarFallback(projectData.createdByName)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-800">{projectData.createdByName}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Độ ưu tiên:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge className={`${getStatusColor('Medium')} cursor-pointer flex items-center gap-1`}>
                  Trung bình <ChevronDown className="h-3 w-3" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Cao</DropdownMenuItem>
                <DropdownMenuItem>Trung bình</DropdownMenuItem>
                <DropdownMenuItem>Thấp</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
