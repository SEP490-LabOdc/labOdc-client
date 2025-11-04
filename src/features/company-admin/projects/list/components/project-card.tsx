// src/features/company-admin/projects/list/components/project-card.tsx
import type { Project } from '@/types/project'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Calendar, DollarSign, Tag, Eye } from 'lucide-react'
import { format } from 'date-fns'

type ProjectCardProps = {
    project: Project
}

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return 'default'
        case 'PENDING':
            return 'secondary'
        case 'COMPLETED':
            return 'default'
        case 'CANCELLED':
            return 'destructive'
        default:
            return 'outline'
    }
}

const getStatusLabel = (status: string): string => {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return 'Đang hoạt động'
        case 'PENDING':
            return 'Đang chờ'
        case 'COMPLETED':
            return 'Đã hoàn thành'
        case 'CANCELLED':
            return 'Đã hủy'
        default:
            return status || 'N/A'
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Badge variant={getStatusVariant(project.status)}>
                        {getStatusLabel(project.status)}
                    </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2 mb-2">
                    {project.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    {project.startDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {format(new Date(project.startDate), 'dd/MM/yyyy')}
                                {project.endDate && ` - ${format(new Date(project.endDate), 'dd/MM/yyyy')}`}
                            </span>
                        </div>
                    )}
                    {project.budget && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(project.budget)}
                            </span>
                        </div>
                    )}
                    {project.skills && project.skills.length > 0 && (
                        <div className="flex items-start gap-2 text-sm">
                            <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <div className="flex flex-wrap gap-1">
                                {project.skills.slice(0, 3).map((skill) => (
                                    <Badge key={skill.id} variant="outline" className="text-xs">
                                        {skill.name}
                                    </Badge>
                                ))}
                                {project.skills.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{project.skills.length - 3}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <Button asChild variant="outline" className="w-full">
                    <Link to="/company/projects/$projectId" params={{ projectId: project.id }}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

