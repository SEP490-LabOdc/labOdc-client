import { ErrorView } from '@/components/admin/ErrorView'
import { useGetReportsForLabAdmin } from '@/hooks/api/report/queries'
import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ReportsTable } from './components/reports-table'
import { type Report } from './data/schema'
import { ReportType, ReportStatus } from '@/hooks/api/report'
import type { Report as ApiReport } from '@/hooks/api/report/types'

const route = getRouteApi('/_authenticated/lab-admin/reports/')

/**
 * Map API report response to UI Report schema
 */
function mapApiReportToUI(apiReport: ApiReport): Report {
    return {
        id: apiReport.id,
        projectId: apiReport.projectId,
        projectName: apiReport.projectName,
        milestoneId: apiReport.milestoneId,
        milestoneName: apiReport.milestoneTitle || '',
        reporterId: apiReport.reporterId,
        reporterName: apiReport.reporterName,
        reporterEmail: apiReport.reporterEmail,
        reporterAvatar: apiReport.reporterAvatar,
        companyId: apiReport.companyId,
        companyName: apiReport.companyName,
        reportType: apiReport.reportType as ReportType,
        status: apiReport.status as ReportStatus,
        content: apiReport.content,
        attachmentsUrl: apiReport.attachmentsUrl || [],
        reportingDate: apiReport.reportingDate,
        createdAt: apiReport.createdAt,
        updatedAt: apiReport.createdAt, // Use createdAt as fallback if updatedAt not available
        feedback: apiReport.feedback,
    }
}

export default function Reports() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    const { data, isLoading, isError, error } = useGetReportsForLabAdmin({
        page: 1,
        pageSize: 10,
    })

    if (isError) {
        return (
            <ErrorView
                title="Lỗi Tải Dữ Liệu"
                description="Không thể kết nối đến server hoặc tải danh sách báo cáo."
                details={error?.message}
            />
        )
    }

    // Map API response to UI schema
    // Handle both data.data (nested) and data (direct array) structures
    const apiReports: ApiReport[] = data?.data?.data
        ? (data.data.data as ApiReport[])
        : data?.data
            ? (Array.isArray(data.data) ? (data.data as ApiReport[]) : [])
            : []

    const reports: Report[] = apiReports.map(mapApiReportToUI)

    return (
        <Main>
            <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Quản lý báo cáo</h2>
                    <p className="text-muted-foreground">
                        Duyệt và quản lý các báo cáo từ mentor/talent trước khi chuyển giao cho công ty.
                    </p>
                </div>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-muted-foreground">Đang tải dữ liệu...</div>
                    </div>
                ) : (
                    <ReportsTable data={reports} search={search} navigate={navigate} />
                )}
            </div>
        </Main>
    )
}

