import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreHorizontal, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getStatusColor } from '@/lib/utils'
import type { Task } from '../../data/project-mock-data'

interface ProjectTasksTabProps {
  tasks: Task[];
}

export const ProjectTasksTab: React.FC<ProjectTasksTabProps> = ({ tasks }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Danh sách Công việc</CardTitle>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Checkbox checked={task.completed} className="mr-3 flex-shrink-0" />
              <span className={`font-medium flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.name}
              </span>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Assign</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}