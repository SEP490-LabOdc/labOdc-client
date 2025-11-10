import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Plus, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { getStatusColor } from '@/lib/utils'

// Định nghĩa kiểu dữ liệu cho props
type ProjectData = {
  client: string;
  totalCost: number;
  hoursOfWork: number;
  createdOn: string;
  startedOn: string;
  dueDate: string;
  dueDateTag: string;
  createdBy: { name: string; avatar: string; };
  priority: string;
}

type Task = {
  id: number;
  name: string;
  status: string;
  assignees: { name: string; avatar: string; }[];
  completed: boolean;
}

interface ProjectSidebarProps {
  projectData: ProjectData;
  tasks: Task[];
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ projectData, tasks }) => {
  // Logic tính toán giờ thuộc về component này
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const tasksCompletionPercentage = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Phần Project Details */}
        <div className="space-y-3 text-sm">
          {[
            { label: 'Client', value: projectData.client },
            { label: 'Project Total Cost', value: `$${projectData.totalCost}` },
            { label: 'Hours of Work', value: `${projectData.hoursOfWork} hrs` },
            { label: 'Created on', value: projectData.createdOn },
            { label: 'Started on', value: projectData.startedOn },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}:</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Due Date:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">{projectData.dueDate}</span>
              <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                {projectData.dueDateTag}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Created by:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={projectData.createdBy.avatar} />
                <AvatarFallback>{projectData.createdBy.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-800">{projectData.createdBy.name}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Priority:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge className={`${getStatusColor(projectData.priority)} cursor-pointer flex items-center gap-1`}>
                  {projectData.priority} <ChevronDown className="h-3 w-3" />
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

        {/* Đường phân cách */}
        <Separator className="my-6" />

        {/* Phần Tasks Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tasks Details</CardTitle>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
              <Plus className="h-4 w-4 mr-1" /> New task
            </Button>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Tasks Done</div>
            <div className="text-2xl font-bold mt-1">{completedTasksCount} / {tasks.length}</div>
            <Progress value={tasksCompletionPercentage} className="mt-3 h-2" />
            <div className="text-sm text-gray-600 mt-2">{tasksCompletionPercentage}% Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}