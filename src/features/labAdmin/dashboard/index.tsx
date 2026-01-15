import { Main } from '@/components/layout/main'
import ApprovalSection from './components/approval-section'
import SystemOverview from './components/system-overview'
import MonthlyBarChart from './components/monthly-bar-chart'
import RecentActivities from './components/recent-activities'

export default function Dashboard() {
    return (
        <Main>
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm">
                    Tổng quan vận hành và nguồn lực của hệ thống LabODC
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-7">
                    <ApprovalSection />
                    <RecentActivities />
                </div>

                <div className="space-y-6 lg:col-span-5">
                    <SystemOverview />
                    <MonthlyBarChart type="project" />
                    <MonthlyBarChart type="company" />
                </div>
            </div>
        </Main>
    )
}
