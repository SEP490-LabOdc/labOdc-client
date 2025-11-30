import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetProjectMilestones } from '@/hooks/api/projects/queries'

// 3. Import các component con đã chia nhỏ
import { ProjectPageHeader, ProjectSidebar, ProjectActivityTab, ProjectFilesTab, ProjectInvoicesTab, ProjectOverviewTab, MilestonesTab } from './components'

// Component chính
const ProjectDetailPage: React.FC<any> = (
  { initialData }
) => {

  const { data: milestonesData, isLoading: isLoadingMilestones, refetch: refetchMilestones } = useGetProjectMilestones(initialData.id)

  console.log(initialData);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* === HEADER === */}
      <ProjectPageHeader />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">

        {/* === Left column === */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ProjectSidebar projectData={initialData} />
        </div>

        {/* === Right column (TABS) === */}
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
              <ProjectOverviewTab projectData={initialData} />
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
                  projectId={initialData.id as string}
                  onRefresh={() => refetchMilestones()}
                />
              )}
            </TabsContent>


            <TabsContent value="files" className="mt-6">
              <ProjectFilesTab projectId={initialData.id as string} files={initialData.files || []} projectImages={initialData.images || []} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ProjectActivityTab activities={initialData.activities || []} notes={initialData.notes || []} />
            </TabsContent>

            <TabsContent value="invoices" className="mt-6">
              <ProjectInvoicesTab invoices={initialData.invoices || []} />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage