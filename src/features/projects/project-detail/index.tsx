import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetProjectById, useGetProjectMilestones } from '@/hooks/api/projects/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ProjectPageHeader, ProjectSidebar, ProjectActivityTab, ProjectFilesTab, ProjectOverviewTab,
  MilestonesTab,
} from './components'
import { ArrowRight, Wallet, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { getRoleBasePath } from '@/lib/utils.ts'
import { useUser } from '@/context/UserContext'

const ProjectDetailPage = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const { projectId } = useParams({ strict: false })
  const { data: projectData, isLoading: isLoadingProject, error: projectError } = useGetProjectById(projectId as string)
  const { data: milestonesData, isLoading: isLoadingMilestones, refetch: refetchMilestones } = useGetProjectMilestones(projectId as string)

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (projectError || !projectData) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Không thể tải thông tin dự án</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ProjectPageHeader projectData={projectData.data} />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ProjectSidebar projectData={projectData.data} />

          <div className="bg-card p-4 rounded-md shadow-sm border border-secondary/20">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-secondary" />
              Quản lý Tài chính
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Theo dõi ngân sách, ví Escrow, và phân bổ quỹ 10/20/70.
            </p>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all group"
              onClick={() => navigate({ to: `${getRoleBasePath(user?.role)}/projects/${projectId}/financials` })}
            >
              Truy cập Dashboard Tài chính
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Biểu mẫu Card - Nổi bật và dễ nhận biết */}
          <div className="bg-linear-to-br from-secondary/10 to-primary/10 p-5 rounded-md shadow-md border-2 border-secondary/30 hover:border-secondary/50 transition-all hover:shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-card rounded-md shadow-sm">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-base mb-1">
                  Biểu mẫu Dự án
                </h3>
                <p className="text-xs text-foreground/70">
                  Tải xuống các template báo cáo, tài liệu và biểu mẫu cần thiết
                </p>
              </div>
            </div>
            <Button
              className="w-full bg-linear-to-br from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-semibold shadow-md transition-all group"
              onClick={() => navigate({ to: `${getRoleBasePath(user?.role)}/projects/${projectId}/templates` })}
            >
              <FileText className="w-4 h-4 mr-2" />
              Xem Biểu mẫu
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="milestones">Cột mốc</TabsTrigger>
              <TabsTrigger value="files">Tệp tin & Hình ảnh</TabsTrigger>
              <TabsTrigger value="activity">Hoạt động & Ghi chú</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ProjectOverviewTab projectData={projectData.data} />
            </TabsContent>

            <TabsContent value="milestones" className="mt-6">
              {isLoadingMilestones ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Đang tải milestones...</p>
                </div>
              ) : (
                <MilestonesTab
                  milestones={milestonesData.data}
                  projectId={projectId as string}
                  projectData={projectData.data}
                  onRefresh={() => refetchMilestones()}
                />
              )}
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <ProjectFilesTab projectId={projectId as string} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ProjectActivityTab activities={projectData.activities || []} notes={projectData.notes || []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
