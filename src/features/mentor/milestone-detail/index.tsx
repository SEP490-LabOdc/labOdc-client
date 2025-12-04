import React from 'react'
import { useParams } from '@tanstack/react-router'
import { useGetMilestoneById } from '@/hooks/api/milestones/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePermission } from '@/hooks/usePermission'
import {
  MilestonePageHeader,
  MilestoneOverviewTab,
  MilestoneReportsTab,
  MilestoneSidebar,
  MilestoneDocumentsTab,
  MilestoneFinancialsTab // <-- Component mới
} from './components'

const MilestoneDetailPage: React.FC = () => {
  const { milestoneId } = useParams({ strict: false })
  const { data: milestoneData, isLoading, error } = useGetMilestoneById(milestoneId as string)
  const { user } = usePermission()

  // Get user role for display (used by MilestoneFinancialsTab)
  const userRole = user?.role || 'USER'

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Đang tải...</div>
  if (error || !milestoneData?.data) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Lỗi tải dữ liệu</div>

  const milestone = milestoneData.data

  return (
    <div className="min-h-screen bg-gray-50">
      <MilestonePageHeader milestone={milestone} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MilestoneSidebar
            milestone={milestone}
            paymentStatus={'PENDING_DEPOSIT'}
            escrowBalance={milestone.escrowBalance || 0}
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="py-2">Tổng quan</TabsTrigger>
              <TabsTrigger value="reports" className="py-2">Báo cáo & Nghiệm thu</TabsTrigger>
              <TabsTrigger value="documents" className="py-2">Tài liệu</TabsTrigger>

              {/* TAB MỚI: TÀI CHÍNH */}
              <TabsTrigger value="financials" className="py-2 flex items-center gap-2">
                Phân bổ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <MilestoneOverviewTab milestone={milestone} />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              {/* Tab này cần chứa nút Action cho Mentor (Gửi duyệt) và Doanh nghiệp (Phê duyệt) */}
              <MilestoneReportsTab milestone={milestone} />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <MilestoneDocumentsTab milestoneId={milestoneId as string} />
            </TabsContent>

            {/* CONTENT TAB TÀI CHÍNH */}
            <TabsContent value="financials" className="mt-6">
              <MilestoneFinancialsTab
                amount={milestone.budget}
                status={'PENDING_DEPOSIT'}
                userRole={userRole}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MilestoneDetailPage


