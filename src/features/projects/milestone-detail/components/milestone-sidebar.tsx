import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Calendar, CheckSquare, CircleDotDashed } from 'lucide-react'
import { getStatusColor } from '@/lib/utils'
import type { ProjectData, Milestone } from '../../data/project-mock-data'

interface MilestoneSidebarProps {
  milestone: Milestone;
  project: ProjectData;
}

export const MilestoneSidebar: React.FC<MilestoneSidebarProps> = ({ milestone, project }) => {
  const {
    status,
    progress,
    dueDate,
    totalTasks,
    completedTasks,
  } = milestone;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chi tiết Cột mốc</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Key-Value Details */}
        <div className="space-y-4 text-sm mb-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-600">
              <CheckSquare className="h-4 w-4" /> Trạng thái
            </span>
            <Badge className={`${getStatusColor(status)} cursor-pointer`}>
              {status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" /> Hạn chót
            </span>
            <span className="font-medium text-gray-800">{dueDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-600">
              <CircleDotDashed className="h-4 w-4" /> Dự án
            </span>
            <span className="font-medium text-gray-800 hover:underline cursor-pointer">
              {project.name}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Progress */}
        <div className="space-y-4">
          <CardTitle className="text-lg font-semibold">Tiến độ Công việc</CardTitle>
          <div className="text-center">
            <div className="text-sm text-gray-600">Tasks Done</div>
            <div className="text-2xl font-bold mt-1">{completedTasks} / {totalTasks}</div>
            <Progress value={progress} className="mt-3 h-2" />
            <div className="text-sm text-gray-600 mt-2">{progress}% Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}