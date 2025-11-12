import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Import data (tất cả data cần thiết cho trang này)
import {
  projectData,
  milestones,
  milestoneTasks,
  milestoneReports,
  milestoneDocuments
} from '../data'

// Import các component con của trang
import { MilestonePageHeader, MilestoneOverviewTab, MilestoneReportsTab, MilestoneSidebar, MilestoneDocumentsTab } from './components'

const currentMilestone = milestones.find(m => m.id === 'milestone-2')

const MilestoneDetailPage: React.FC = () => {
  if (!currentMilestone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Không tìm thấy Cột mốc</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === HEADER === */}
      <MilestonePageHeader milestone={currentMilestone} project={projectData} />

      {/* === Main Content Grid === */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">

        {/* === CỘT TRÁI (Sidebar) === */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MilestoneSidebar milestone={currentMilestone} project={projectData} />
        </div>

        {/* === CỘT PHẢI (Tabs) === */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">
                Tổng quan
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">
                Báo cáo
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2">
                Tài liệu
              </TabsTrigger>
            </TabsList>

            {/* Tab Content: Tổng quan */}
            <TabsContent value="overview" className="mt-6">
              <MilestoneOverviewTab
                milestone={currentMilestone}
                tasks={milestoneTasks}
              />
            </TabsContent>

            {/* Tab Content: Báo cáo */}
            <TabsContent value="reports" className="mt-6">
              <MilestoneReportsTab reports={milestoneReports} />
            </TabsContent>

            {/* Tab Content: Tài liệu */}
            <TabsContent value="documents" className="mt-6">
              <MilestoneDocumentsTab documents={milestoneDocuments} />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MilestoneDetailPage