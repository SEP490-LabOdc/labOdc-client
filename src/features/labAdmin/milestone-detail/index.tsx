import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  projectData,
  milestoneTasks,
  milestoneReports,
  milestoneDocuments
} from '../data'

import { MilestonePageHeader, MilestoneOverviewTab, MilestoneReportsTab, MilestoneSidebar, MilestoneDocumentsTab } from './components'
import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Main } from '@/components/layout/main'
import { useGetMilestonesById } from '@/hooks/api/milestones/queries'
import { ErrorView } from '@/components/admin/ErrorView'

const route = getRouteApi('/_authenticated/lab-admin/projects/$projectId/$milestoneId/')

const MilestoneDetailPage: React.FC = () => {

  const { milestoneId } = route.useParams()

  const {
    data: milestone,
    isLoading,
    isError,
    error,
  } = useGetMilestonesById(milestoneId);

  if (isError) {
    return (
      <ErrorView
        title="Lỗi tải dữ liệu"
        description="Không thể tải thông tin cột mốc."
        details={error?.message}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <p className="text-muted-foreground">Đang tải thông tin cột mốc...</p>
      </div>
    )
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main className='pt-0'>
        <div className="min-h-screen bg-gray-50">
          {/* === HEADER === */}
          <MilestonePageHeader milestone={milestone} project={projectData} />

          {/* === Main Content Grid === */}
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">

            {/* === CỘT TRÁI (Sidebar) === */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <MilestoneSidebar milestone={milestone} project={projectData} />
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
                  {/* <MilestoneOverviewTab
                    milestone={currentMilestone}
                    tasks={milestoneTasks}
                  /> */}
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
      </Main>
    </>
  )
}

export default MilestoneDetailPage