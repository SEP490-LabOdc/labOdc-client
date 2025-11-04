import type { Project } from '@/types/project'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Calendar, DollarSign, BookOpen } from 'lucide-react'

type ProjectInfoTabProps = {
    project?: Project
    isLoading: boolean
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

export function ProjectInfoTab({ project, isLoading }: ProjectInfoTabProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!project) return null

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin dự án</CardTitle>
                    <CardDescription>Chi tiết về dự án này</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
                            <Badge variant={getStatusVariant(project.status)} className="mt-1">
                                {getStatusLabel(project.status)}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p>{project.startDate ? format(new Date(project.startDate), 'dd/MM/yyyy') : 'N/A'}</p>
                            </div>
                        </div>
                        {project.endDate && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Ngày kết thúc</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p>{format(new Date(project.endDate), 'dd/MM/yyyy')}</p>
                                </div>
                            </div>
                        )}
                        {project.budget && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Ngân sách</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <p>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(project.budget)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {project.description && (
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Mô tả</p>
                            <p className="text-sm">{project.description}</p>
                        </div>
                    )}
                    {project.skills && project.skills.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Kỹ năng yêu cầu
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill) => (
                                    <Badge key={skill.id} variant="outline">
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}