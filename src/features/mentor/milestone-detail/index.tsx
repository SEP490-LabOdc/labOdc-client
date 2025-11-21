import React from 'react'
import { useParams } from '@tanstack/react-router'
import { useGetMilestoneById } from '@/hooks/api/milestones/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MilestonePageHeader, MilestoneOverviewTab, MilestoneReportsTab, MilestoneSidebar, MilestoneDocumentsTab } from './components'

const MilestoneDetailPage: React.FC = () => {
  const { milestoneId } = useParams({ strict: false })
  const { data: milestoneData, isLoading, error } = useGetMilestoneById(milestoneId as string)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error || !milestoneData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-red-600">Không tìm thấy Milestone</p>
      </div>
    )
  }

  const milestone = milestoneData.data

  return (
    <div className="min-h-screen bg-gray-50">
      <MilestonePageHeader milestone={milestone} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MilestoneSidebar milestone={milestone} />
        </div>

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

            <TabsContent value="overview" className="mt-6">
              <MilestoneOverviewTab milestone={milestone} />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <MilestoneReportsTab />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <MilestoneDocumentsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MilestoneDetailPage
