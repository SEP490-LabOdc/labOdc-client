import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { type Project } from '@/hooks/api/projects/types.ts'
import { Clock, Users } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null

  const projectDuration = Math.ceil(
    (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-2xl">{project.projectName}</DialogTitle>
          <DialogDescription>Chi tiết thông tin dự án</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800">
              Đang Mở
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {project.currentApplicants} ứng viên đã ứng tuyển
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
                    <span className="font-medium">{projectDuration} tháng</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Thông Tin Dự Án</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã dự án:</span>
                    <span className="font-medium font-mono">{project.projectId.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số mentor:</span>
                    <span className="font-medium">{project.mentors.length} mentor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Trạng Thái Ứng Tuyển</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số ứng viên hiện tại:</span>
                    <span className="font-medium">{project.currentApplicants} ứng viên</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn ứng tuyển:</span>
                    <span className="font-medium text-orange-600">
                      {Math.floor(Math.random() * 10) + 3} ngày nữa
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cơ hội được chọn:</span>
                    <span className="font-medium text-green-600">
                      {project.currentApplicants === 0 ? 'Rất cao' :
                        project.currentApplicants < 5 ? 'Cao' : 'Trung bình'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-[#264653]">Thông Tin Liên Hệ</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Phản hồi thường trong vòng 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#264653] mb-2">💡 Lời khuyên ứng tuyển</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Đọc kỹ mô tả dự án và yêu cầu kỹ năng</li>
              <li>• Chuẩn bị portfolio phù hợp với công nghệ sử dụng</li>
              <li>• Viết cover letter thể hiện hiểu biết về dự án</li>
              <li>• Đề xuất timeline và phương pháp thực hiện cụ thể</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
