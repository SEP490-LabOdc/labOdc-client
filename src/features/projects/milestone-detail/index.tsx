import React from 'react'
import { useParams, useSearch } from '@tanstack/react-router'
import { useGetMilestoneById } from '@/hooks/api/milestones/queries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePermission } from '@/hooks/usePermission'
import {
  MilestonePageHeader,
  MilestoneOverviewTab,
  MilestoneReportsTab,
  MilestoneSidebar,
  MilestoneDocumentsTab,
  MilestoneFinancialsTab
} from './components'
import { MilestoneStatus } from '@/hooks/api/milestones'
import { Spinner } from '@/components/ui/spinner'
import { ExtensionTab } from './components/extension-request'

const MilestoneDetailPage: React.FC = () => {
  const { milestoneId, projectId } = useParams({ strict: false })
  const search = useSearch({ strict: false })
  // Get companyId from search params (passed when navigating from project detail)
  const companyId = search.companyId as string
  const { data: milestoneData, isLoading, error, refetch } = useGetMilestoneById(milestoneId as string)
  const { user, isMentor, isCompany } = usePermission()

  // Get user role for display (used by MilestoneFinancialsTab)
  const userRole = user?.role || 'USER'

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">
    <Spinner />
  </div>
  if (error || !milestoneData?.data) return <div className="min-h-screen flex items-center justify-center text-destructive">Lỗi tải dữ liệu</div>

  const milestone = milestoneData.data

  return (
    <div className="min-h-screen">
      <MilestonePageHeader milestone={milestone} />

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <MilestoneSidebar
            milestone={milestone}
            paymentStatus={MilestoneStatus.PENDING_DEPOSIT}
            projectId={projectId as string || milestone.projectId}
            onRefresh={refetch}
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={`grid w-full ${isMentor || isCompany ? 'grid-cols-5' : 'grid-cols-4'} h-auto`}>
              <TabsTrigger value="overview" className="py-2">Tổng quan</TabsTrigger>
              <TabsTrigger value="reports" className="py-2">Báo cáo</TabsTrigger>
              <TabsTrigger value="documents" className="py-2">Tài liệu</TabsTrigger>
              <TabsTrigger value="financials" className="py-2 flex items-center gap-2">
                Phân bổ
              </TabsTrigger>
              {(isMentor || isCompany) && (
                <TabsTrigger value="extension" className="py-2">Yêu cầu gia hạn</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <MilestoneOverviewTab milestone={milestone} />
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <MilestoneReportsTab milestone={milestone} />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <MilestoneDocumentsTab milestoneId={milestoneId as string} />
            </TabsContent>

            <TabsContent value="financials" className="mt-6">
              <MilestoneFinancialsTab
                amount={milestone.budget}
                status={MilestoneStatus.PENDING_DEPOSIT}
                userRole={userRole}
                milestoneId={milestone.id}
              />
            </TabsContent>

            {(isMentor || isCompany) && (
              <TabsContent value="extension" className="mt-6">
                <ExtensionTab
                  milestone={milestone}
                  projectId={projectId as string || milestone.projectId}
                  companyId={companyId}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MilestoneDetailPage


