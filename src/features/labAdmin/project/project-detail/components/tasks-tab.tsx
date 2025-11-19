import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { getStatusColor } from '@/lib/utils'
import type { Task } from '../project-mock-data'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { useGetMilestonesByProjectId } from '@/hooks/api/milestones'

// interface ProjectTasksTabProps {
//   tasks: Task[];
// }

export const ProjectTasksTab: React.FC<any> = ({ initialData }) => {
  const navigate = useNavigate();

  const {
    data: milestones = [],
    isLoading,
    isError,
  } = useGetMilestonesByProjectId(initialData.id);

  if (isLoading)
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-6">
        Không thể tải danh sách milestones.
      </p>
    );

  console.log(milestones);

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
          {milestones.map((task: any) => (
            <div
              key={task.id}
              className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Link
                to={`/lab-admin/projects/$projectId/$milestoneId`}
                params={{ milestoneId: task.id, projectId: initialData?.id }}
                className="font-medium flex-grow text-gray-800 hover:text-orange-600 hover:underline cursor-pointer"
                title={`Xem chi tiết: ${task.title}`}
              >
                {task.title}
              </Link>

              {/* Status */}
              <Badge
                className={`${getStatusColor(
                  task.status
                )} rounded-full px-3 py-1 text-xs flex-shrink-0 mr-3`}
              >
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}