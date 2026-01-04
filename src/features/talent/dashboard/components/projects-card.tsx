import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { formatVND } from '@/helpers/currency'
import ProjectStatusBadge from './project-status-badge'

export default function ProjectsCard({ projects }: { projects: any[] }) {
    return (
        <Card className='gap-3'>
            <CardHeader>
                <CardTitle>Dự án của bạn</CardTitle>
                <CardDescription>Các dự án đã và đang triển khai</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                {projects.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Bạn chưa có dự án nào
                    </p>
                )}

                {projects.map((project) => (
                    <Link
                        key={project.id}
                        to={'/talent/projects/' + project.id}
                        className="block"
                    >
                        <div className="rounded-lg border p-4 hover:shadow-sm transition">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="font-semibold">{project.title}</h3>
                                <ProjectStatusBadge status={project.status} />
                            </div>

                            <div className="mb-3 flex gap-4 text-sm text-muted-foreground">
                                <div>📅 {project.startDate}</div>
                                <div>💰 {formatVND(project.budget)}</div>
                            </div>

                            <div className="mb-3 flex flex-wrap gap-2">
                                {project.skills?.slice(0, 4).map((s: any) => (
                                    <Badge key={s.id} variant="secondary">
                                        {s.name}
                                    </Badge>
                                ))}
                                {project.skills?.length > 4 && (
                                    <Badge variant="outline">
                                        +{project.skills.length - 4}
                                    </Badge>
                                )}
                            </div>

                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                {project.description || 'Không có mô tả'}
                            </p>
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    )
}
