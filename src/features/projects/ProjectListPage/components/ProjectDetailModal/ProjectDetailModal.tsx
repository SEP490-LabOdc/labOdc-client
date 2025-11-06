import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { type Project, ProjectTypes } from '@/hooks/api/projects/types.ts'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  const getStatusText = (status: ProjectTypes): string => {
    const statusMap: Record<ProjectTypes, string> = {
      [ProjectTypes.OPEN]: 'Đang Mở',
      [ProjectTypes.IN_PROGRESS]: 'Đang Thực Hiện',
      [ProjectTypes.COMPLETED]: 'Hoàn Thành',
      [ProjectTypes.CLOSED]: 'Đã Đóng'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: ProjectTypes): string => {
    const colorMap: Record<ProjectTypes, string> = {
      [ProjectTypes.OPEN]: 'bg-green-100 text-green-800',
      [ProjectTypes.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
      [ProjectTypes.COMPLETED]: 'bg-gray-100 text-gray-800',
      [ProjectTypes.CLOSED]: 'bg-red-100 text-red-800'
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-2xl">{project.title}</DialogTitle>
          <DialogDescription>Chi tiết thông tin dự án</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(project.status as ProjectTypes)}>
              {getStatusText(project.status as ProjectTypes)}
            </Badge>
            <div className="text-sm text-gray-500">
              Đăng ngày: {new Date(project.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-[#264653] text-lg">Mô Tả Dự Án</h4>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-[#264653] text-lg">Kỹ Năng Yêu Cầu</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill.id} className="bg-[#2a9d8f] text-white px-3 py-1">
                  {skill.name}
                </Badge>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p className="font-medium">Mô tả kỹ năng:</p>
              {project.skills.map((skill) => (
                <div key={skill.id} className="mt-1">
                  <span className="font-medium">{skill.name}:</span> {skill.description}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Thời Gian Dự Án</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày bắt đầu:</span>
                    <span className="font-medium">{new Date(project.startDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày kết thúc:</span>
                    <span className="font-medium">{new Date(project.endDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian thực hiện:</span>
                    <span className="font-medium">
                      {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} tháng
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Ngân Sách</h4>
                <p className="text-2xl font-bold text-[#2a9d8f]">${project.budget.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Có thể thương lượng</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Thông Tin Liên Hệ</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company ID:</span>
                    <span className="font-medium">{project.companyId.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentor ID:</span>
                    <span className="font-medium">{project.mentorId.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Trạng Thái Ứng Tuyển</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số ứng viên hiện tại:</span>
                    <span className="font-medium">{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn ứng tuyển:</span>
                    <span className="font-medium text-orange-600">
                      {Math.floor(Math.random() * 10) + 3} ngày nữa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
