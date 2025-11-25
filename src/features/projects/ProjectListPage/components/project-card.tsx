import { Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { type Project } from '@/hooks/api/projects/types.ts'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
  onApply: (project: Project) => void
  onSelect: (project: Project) => void
  isSelected: boolean
}

export function ProjectCard({ project, onSelect, isSelected }: ProjectCardProps) {

  return (
    <Card
      className={cn(
        "transition-all duration-300 border-l-4 border-l-[#2a9d8f] hover:shadow-lg",
        isSelected
          ? "bg-slate-50 border-2 border-[#2a9d8f] shadow-md"
          : "bg-white",
        "cursor-pointer"
      )}
      onClick={() => onSelect(project)}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-green-100 text-green-800 text-sm">
            Đang Mở
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {project.currentApplicants} ứng viên
          </div>
        </div>

        {/* Title */}
        <CardTitle
          className="text-[#264653] text-lg font-semibold hover:text-[#2a9d8f] transition-colors"
        >
          {project.projectName}
        </CardTitle>

      </CardHeader>

      <CardContent className="pt-0 space-y-4">

        {/* Skills */}
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

        {/* Meta (Dates) */}
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
      </CardContent>
    </Card>
  )
}