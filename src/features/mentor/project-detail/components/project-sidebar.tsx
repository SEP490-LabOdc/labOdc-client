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

  const calculateDaysRemaining = (endDate: string): string => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Quá hạn'
    if (diffDays === 0) return 'Hôm nay'
    return `${diffDays} ngày`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Client', value: projectData.companyName },
            { label: 'Project Total Cost', value: `$${projectData.budget}` },
            { label: 'Created on', value: new Date(projectData.createdAt).toLocaleDateString('vi-VN') },
            { label: 'Started on', value: new Date(projectData.startDate).toLocaleDateString('vi-VN') },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}:</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Due Date:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {new Date(projectData.endDate).toLocaleDateString('vi-VN')}
              </span>
              <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                {calculateDaysRemaining(projectData.endDate)}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Created by:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={projectData.createdByAvatar} />
                <AvatarFallback>{getAvatarFallback(projectData.createdByName)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-800">{projectData.createdByName}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Priority:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge className={`${getStatusColor('Medium')} cursor-pointer flex items-center gap-1`}>
                  Medium <ChevronDown className="h-3 w-3" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
