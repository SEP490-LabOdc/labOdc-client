import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Project } from '@/types/project'
import { ProjectCard } from './components/project-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function CompanyProjectListPage() {
    const data: Project[] = []
    const isLoading = false

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Quản lý dự án</h2>
                <Button asChild>
                    <Link to="/company-admin/projects/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tạo dự án
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="p-6">
                            <Skeleton className="h-6 w-24 mb-4" />
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3 mb-4" />
                            <Skeleton className="h-10 w-full" />
                        </Card>
                    ))}
                </div>
            ) : data.length === 0 ? (
                <div className="text-center py-16">
                    <div className="mb-4">
                        <PlusCircle className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Chưa có dự án nào</h3>
                    <p className="text-muted-foreground mb-4">Tạo dự án đầu tiên để bắt đầu</p>
                    <Button asChild>
                        <Link to="/company-admin/projects/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Tạo dự án mới
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    )
}