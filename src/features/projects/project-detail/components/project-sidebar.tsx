import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { ProjectDetail } from '@/hooks/api/projects/types'
import { getAvatarFallback } from '@/helpers/stringUtils.ts'
import { CURRENCY_SUFFIX } from '@/const'

interface ProjectSidebarProps {
  projectData: ProjectDetail;
}

export const ProjectSidebar = ({ projectData }: ProjectSidebarProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">Thông tin dự án</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Khách hàng', value: projectData.companyName },
            { label: 'Tổng chi phí dự án', value: `${projectData.budget.toLocaleString('vi-VN')} ${CURRENCY_SUFFIX}` },
            { label: 'Số dư ngân sách', value: `${(projectData.remainingBudget ?? 0).toLocaleString('vi-VN')} ${CURRENCY_SUFFIX}` },
            { label: 'Ngày tạo', value: new Date(projectData.createdAt).toLocaleDateString('vi-VN') },
            { label: 'Ngày bắt đầu', value: new Date(projectData.startDate).toLocaleDateString('vi-VN') },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">{item.label}:</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Ngày kết thúc:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {new Date(projectData.endDate).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Người tạo:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={projectData.createdByAvatar} />
                <AvatarFallback>{getAvatarFallback(projectData.createdByName)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{projectData.createdByName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
