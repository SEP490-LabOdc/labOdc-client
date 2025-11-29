import React from 'react'
import { useParams } from '@tanstack/react-router'
import { useGetProjectById, useGetProjectMilestones } from '@/hooks/api/projects/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ProjectPageHeader, ProjectSidebar, ProjectActivityTab, ProjectFilesTab, ProjectInvoicesTab, ProjectOverviewTab,
  MilestonesTab,
} from './components'

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams({ strict: false })
  const { data: projectData, isLoading: isLoadingProject, error: projectError } = useGetProjectById(projectId as string)
  const { data: milestonesData, isLoading: isLoadingMilestones, refetch: refetchMilestones } = useGetProjectMilestones(projectId as string)

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (projectError || !projectData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Không thể tải thông tin dự án</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectPageHeader />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ProjectSidebar projectData={projectData.data} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tổng quan</TabsTrigger>
              <TabsTrigger value="milestones" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Cột mốc</TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tệp tin & Hình ảnh</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Hoạt động & Ghi chú</TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Hóa đơn</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ProjectOverviewTab projectData={projectData.data} />
            </TabsContent>

            <TabsContent value="milestones" className="mt-6">
              {isLoadingMilestones ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Đang tải milestones...</p>
                </div>
              ) : (
                <MilestonesTab
                  milestones={milestonesData.data}
                  projectId={projectId as string}
                  onRefresh={() => refetchMilestones()}
                />
              )}
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <ProjectFilesTab projectId={projectId as string} files={projectData.files || []} projectImages={projectData.images || []} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ProjectActivityTab activities={projectData.activities || []} notes={projectData.notes || []} />
            </TabsContent>

            <TabsContent value="invoices" className="mt-6">
              <ProjectInvoicesTab invoices={projectData.invoices || []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
