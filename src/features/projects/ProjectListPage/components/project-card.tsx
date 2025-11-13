import { Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { type Project } from '@/hooks/api/projects/types.ts'

interface ProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
  onApply: (project: Project) => void
}

export function ProjectCard({ project, onViewDetails, onApply }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#2a9d8f] hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-green-100 text-green-800">
            Đang Mở
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {project.currentApplicants} ứng viên
          </div>
        </div>
        <CardTitle className="text-[#264653] text-lg hover:text-[#2a9d8f] transition-colors">
          {project.projectName}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-3">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {project.skills.slice(0, 3).map((skill) => (
              <Badge key={skill.id} variant="outline" className="text-xs bg-[#e9f5f3] text-[#2a9d8f] border-[#2a9d8f]">
                {skill.name}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{project.skills.length - 3} kỹ năng
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Bắt đầu: {new Date(project.startDate).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Kết thúc: {new Date(project.endDate).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="text-xs text-gray-500">
              Đăng {Math.floor(Math.random() * 7) + 1} ngày trước
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent hover:bg-[#f8f9fa]"
              onClick={() => onViewDetails(project)}
            >
              Chi Tiết
            </Button>
            <Button
              size="sm"
              className="bg-[#2a9d8f] hover:bg-[#264653] flex-1"
              onClick={() => onApply(project)}
            >
              Ứng Tuyển Ngay
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
