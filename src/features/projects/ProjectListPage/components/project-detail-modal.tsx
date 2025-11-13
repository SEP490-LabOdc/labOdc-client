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
      {/* 1. TĂNG ĐỘ RỘNG MODAL LÊN 5XL */}
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-3xl font-bold">{project.projectName}</DialogTitle>
          <DialogDescription>Chi tiết thông tin dự án</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
              Đang Mở
            </Badge>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">{project.currentApplicants}</span>&nbsp;ứng viên đã ứng tuyển
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#264653] text-xl">Mô Tả Dự Án</h4>
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#264653] text-xl">Kỹ Năng Yêu Cầu</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill.id} className="bg-[#2a9d8f] text-white px-3 py-1 text-sm">
                  {skill.name}
                </Badge>
              ))}
            </div>
            {/* 2. TỐI ƯU HIỂN THỊ MÔ TẢ KỸ NĂNG */}
            <div className="mt-3 text-sm text-gray-700 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-800 mb-2">Chi tiết kỹ năng:</p>
              <ul className="list-disc list-inside space-y-1">
                {project.skills.map((skill) => (
                  <li key={skill.id}>
                    <span className="font-medium text-gray-900">{skill.name}:</span> {skill.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. TÁI CẤU TRÚC SANG GRID 3 CỘT ĐỂ CÂN ĐỐI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
            {/* CỘT 1: THỜI GIAN */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#264653] text-lg">Thời Gian Dự Án</h4>
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

            {/* CỘT 2: TRẠNG THÁI ỨNG TUYỂN */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#264653] text-lg">Trạng Thái Ứng Tuyển</h4>
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

            {/* CỘT 3: THÔNG TIN KHÁC */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#264653] text-lg">Thông Tin Khác</h4>
              <div className="space-y-2 text-sm">
                {/* 4. ĐÃ BỎ MÃ DỰ ÁN */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Số mentor:</span>
                  <span className="font-medium">{project.mentors.length} mentor</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Phản hồi thường trong vòng 24h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phần lời khuyên */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-[#264653] mb-2 text-lg">💡 Lời khuyên ứng tuyển</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Đọc kỹ mô tả dự án và yêu cầu kỹ năng</li>
              <li>Chuẩn bị portfolio phù hợp với công nghệ sử dụng</li>
              <li>Viết cover letter thể hiện hiểu biết về dự án</li>
              <li>Đề xuất timeline và phương pháp thực hiện cụ thể</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}