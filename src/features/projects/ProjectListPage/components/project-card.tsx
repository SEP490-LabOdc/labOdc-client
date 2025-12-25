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
        "transition-all duration-300 border-l-4 border-l-secondary hover:shadow-lg",
        isSelected
          ? "bg-muted border-2 border-secondary shadow-md"
          : "bg-card",
        "cursor-pointer"
      )}
      onClick={() => onSelect(project)}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-secondary/20 text-secondary text-sm border-secondary/30">
            Đang Mở
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {project.currentApplicants} ứng viên
          </div>
        </div>

        {/* Title */}
        <CardTitle
          className="text-foreground text-lg font-semibold hover:text-secondary transition-colors"
        >
          {project.projectName}
        </CardTitle>

      </CardHeader>

      <CardContent className="pt-0 space-y-4">

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {project.skills.slice(0, 3).map((skill) => (
            <Badge key={skill.id} variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/30">
              {skill.name}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">
              +{project.skills.length - 3} kỹ năng
            </Badge>
          )}
        </div>

        {/* Meta (Dates) */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-foreground/80">
            <Clock className="h-4 w-4 mr-1" />
            <span>Bắt đầu: {project.startDate ? new Date(project.startDate).toLocaleDateString('vi-VN') : 'Không xác định'}</span>
          </div>
          <div className="flex items-center text-sm text-foreground/80">
            <Clock className="h-4 w-4 mr-1" />
            <span>Kết thúc: {project.endDate ? new Date(project.endDate).toLocaleDateString('vi-VN') : 'Không xác định'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}