import { useParams } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectInfoTab } from './components/project-info-tab'
import { ProjectMembersTab } from './components/project-members-tab'
import { ProjectMilestonesTab } from './components/project-milestones-tab'
import { ProjectReportsTab } from './components/project-reports-tab'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import type { Project } from '@/types/project'

export function CompanyProjectDetailPage() {
    const { projectId } = useParams({ from: '/_authenticated/company/projects/$projectId/' })

    // TODO: Dùng useQuery để fetch project
    // const { data: project, isLoading } = useGetProjectById(projectId)
    const project: Project | undefined = undefined // Giả định chưa có data
    const isLoading = true // Đặt là false để thấy layout mẫu

    if (isLoading) {
        return <ProjectDetailSkeleton projectId={projectId} />
    }

    if (!project) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Không tìm thấy dự án.</p>
                    <Button asChild variant="outline" className="mt-4">
                        <Link to="/company/projects">Quay lại danh sách</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // TypeScript guard: project is now Project (not undefined)
    const projectData = project as Project

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link to="/company/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">{projectData.title}</h1>
                <p className="text-muted-foreground mt-2">{projectData.description}</p>
            </div>

            <Tabs defaultValue="info" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="info">Thông tin dự án</TabsTrigger>
                    <TabsTrigger value="members">Thành viên</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="reports">Báo cáo</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <ProjectInfoTab project={projectData} isLoading={false} />
                </TabsContent>
                <TabsContent value="members">
                    <ProjectMembersTab projectId={projectId} isLoading={false} />
                </TabsContent>
                <TabsContent value="milestones">
                    <ProjectMilestonesTab projectId={projectId} isLoading={false} />
                </TabsContent>
                <TabsContent value="reports">
                    <ProjectReportsTab projectId={projectId} isLoading={false} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

// Component Skeleton cho trang chi tiết
function ProjectDetailSkeleton({ projectId }: { projectId: string }) {
    return (
        <div className="container mx-auto py-10">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <Tabs defaultValue="info">
                <TabsList className="mb-4">
                    <TabsTrigger value="info">Thông tin dự án</TabsTrigger>
                    <TabsTrigger value="members">Thành viên</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    <TabsTrigger value="reports">Báo cáo</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                    <ProjectInfoTab project={undefined} isLoading={true} />
                </TabsContent>
                <TabsContent value="members">
                    <ProjectMembersTab projectId={projectId} isLoading={true} />
                </TabsContent>
                <TabsContent value="milestones">
                    <ProjectMilestonesTab projectId={projectId} isLoading={true} />
                </TabsContent>
                <TabsContent value="reports">
                    <ProjectReportsTab projectId={projectId} isLoading={true} />
                </TabsContent>
            </Tabs>
        </div>
    )
}