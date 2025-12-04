import React from 'react'
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

const ProjectDetailPage: React.FC = () => {
  const { user } = useUser()
  const navigate = useNavigate()
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
          <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-indigo-600" />
              Quản lý Tài chính
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Theo dõi ngân sách, ví Escrow, và phân bổ quỹ 10/20/70.
            </p>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all group"
              onClick={() => navigate({ to: `${getRoleBasePath(user?.role)}/projects/${projectId}/financials` })}
            >
              Truy cập Dashboard Tài chính
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Biểu mẫu Card - Nổi bật và dễ nhận biết */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl shadow-md border-2 border-purple-200 hover:border-purple-300 transition-all hover:shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Biểu mẫu Dự án
                </h3>
                <p className="text-xs text-gray-600">
                  Tải xuống các template báo cáo, tài liệu và biểu mẫu cần thiết
                </p>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all group"
              onClick={() => navigate({ to: `${getRoleBasePath(user?.role)}/projects/${projectId}/templates` })}
            >
              <FileText className="w-4 h-4 mr-2" />
              Xem Biểu mẫu
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <ProjectSidebar projectData={projectData.data} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tổng quan</TabsTrigger>
              <TabsTrigger value="milestones" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Cột mốc</TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tệp tin & Hình ảnh</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Hoạt động & Ghi chú</TabsTrigger>
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
                  projectData={projectData.data}
                  onRefresh={() => refetchMilestones()}
                />
              )}
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <ProjectFilesTab projectId={projectId as string} projectImages={projectData.images || []} />
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
