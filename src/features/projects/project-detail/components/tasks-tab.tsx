import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { getStatusColor } from '@/lib/utils'
import type { Task } from '../../data/project-mock-data'
import { useNavigate } from '@tanstack/react-router'

interface ProjectTasksTabProps {
  tasks: Task[];
}

export const ProjectTasksTab: React.FC<ProjectTasksTabProps> = ({ tasks }) => {
  const navigate = useNavigate();

  const handleNavigate = async (taskId: number) => {
    await navigate({ to: `/milestones/${taskId}` });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Danh sách cột mốc</CardTitle>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Thêm cột mốc
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <a
                href={`/milestones/${task.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(task.id);
                }}
                className="font-medium flex-grow text-gray-800 hover:text-orange-600 hover:underline cursor-pointer"
                title={`Xem chi tiết ${task.name}`}
              >
                {task.name}
              </a>
              <Badge className={`${getStatusColor(task.status)} rounded-full px-3 py-1 text-xs flex-shrink-0 mr-3`}>
                {task.status}
              </Badge>
              <div className="flex -space-x-1 flex-shrink-0 mr-3">
                {task.assignees.map((assignee, index) => (
                  <Avatar key={index} className="h-7 w-7 border border-white bg-gray-200">
                    <AvatarImage src={assignee.avatar} />
                    <AvatarFallback className="text-xs">{assignee.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}