import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Plus, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn, getStatusColor } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { PROJECT_STATUS_LABEL } from '../../data/schema'
import { callTypes } from '../../data/data'

// Định nghĩa kiểu dữ liệu cho props
// type ProjectData = {
//   client: string;
//   totalCost: number;
//   hoursOfWork: number;
//   createdOn: string;
//   startedOn: string;
//   dueDate: string;
//   dueDateTag: string;
//   createdBy: { name: string; avatar: string; };
//   priority: string;
// }

// type Task = {
//   id: number;
//   name: string;
//   status: string;
//   assignees: { name: string; avatar: string; }[];
//   completed: boolean;
// }

// interface ProjectSidebarProps {
//   projectData: ProjectData;
//   tasks: Task[];
// }

export const ProjectSidebar: React.FC<any> = ({ initialData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Phần Project Details */}
        <div className="space-y-3 text-sm">
          {[
            { label: 'Công ty', value: 'abac' },
            { label: 'Tổng chi phí dự án', value: `${initialData?.budget} VNĐ` },
            { label: 'Số giờ làm việc', value: `${initialData?.createdAt} giờ` },
            { label: 'Ngày tạo', value: initialData?.createdAt },
            { label: 'Ngày bắt đầu', value: initialData?.startDate || 'Đang lên kết hoạch   ' },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}:</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Người tạo:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={initialData?.createdByAvarta} />
                <AvatarFallback>{initialData?.createdByName}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-800">{initialData?.createdBy?.name}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái:</span>
            <div className="flex items-center gap-2">
              {(() => {
                const status = initialData?.status;

                const vietnameseStatusLabel =
                  PROJECT_STATUS_LABEL[status as keyof typeof PROJECT_STATUS_LABEL];

                const badgeColor = callTypes.get(status);

                return (
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={cn(' px-3 py-1 rounded text-xs font-medium', badgeColor)}>
                      {vietnameseStatusLabel}
                    </Badge>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Đường phân cách */}
        <Separator className="my-6" />

        {/* Phần Tasks Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold"> Milestone hiện tại</CardTitle>
          </div>
          <div className="text-center">
            <Link to='/404'>
              Patient appointment booking
            </Link>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}