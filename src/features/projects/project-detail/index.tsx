import React from 'react'

// 1. Import Data
import {
  projectData,
  tasks,
  files,
  projectImages,
  notes,
  activities,
  invoices
} from '../data/project-mock-data'

// 2. Import UI (chỉ còn Tabs)
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 3. Import các component con đã chia nhỏ
import { ProjectPageHeader, ProjectSidebar, ProjectActivityTab, ProjectTasksTab, ProjectFilesTab, ProjectInvoicesTab, ProjectOverviewTab } from './components'

// Component chính
const ProjectDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* === HEADER === */}
      <ProjectPageHeader />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">

        {/* === Left column === */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ProjectSidebar projectData={projectData} tasks={tasks} />
        </div>

        {/* === Right column (TABS) === */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tổng quan</TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Cột mốc</TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Tệp tin & Hình ảnh</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Hoạt động & Ghi chú</TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">Hóa đơn</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ProjectOverviewTab projectData={projectData} />
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              <ProjectTasksTab tasks={tasks} />
            </TabsContent>

            <TabsContent value="files" className="mt-6">
              <ProjectFilesTab files={files} projectImages={projectImages} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ProjectActivityTab activities={activities} notes={notes} />
            </TabsContent>

            <TabsContent value="invoices" className="mt-6">
              <ProjectInvoicesTab invoices={invoices} />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage