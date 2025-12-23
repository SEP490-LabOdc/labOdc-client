// import { ErrorView } from '@/components/admin/ErrorView'
// import { useGetReports } from '@/hooks/api/report'
import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { ReportsTable } from './components/reports-table'
import { type Report } from './data/schema'
import { ReportType, ReportStatus } from '@/hooks/api/report'

const route = getRouteApi('/_authenticated/lab-admin/reports/')

// TODO: Fake data tạm thời - sẽ thay bằng API call sau
const mockReports: Report[] = [
    {
        id: '1',
        projectId: 'proj-1',
        projectName: 'Dự án Phát triển Website E-commerce',
        milestoneId: 'milestone-1',
        milestoneName: 'Milestone 1: Thiết kế UI/UX',
        reporterId: 'user-1',
        reporterName: 'Nguyễn Văn A',
        reporterEmail: 'nguyenvana@example.com',
        reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA',
        companyId: 'company-1',
        companyName: 'Công ty ABC',
        reportType: ReportType.MILESTONE_REPORT,
        status: ReportStatus.SUBMITTED,
        content: 'Đã hoàn thành thiết kế giao diện trang chủ và trang sản phẩm. Đã tạo wireframe và mockup cho các trang chính. Đang chờ phản hồi từ team design.',
        attachmentsUrl: ['https://example.com/file1.pdf', 'https://example.com/file2.zip'],
        reportingDate: new Date().toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        projectId: 'proj-1',
        projectName: 'Dự án Phát triển Website E-commerce',
        milestoneId: 'milestone-2',
        milestoneName: 'Milestone 2: Phát triển Backend API',
        reporterId: 'user-2',
        reporterName: 'Trần Thị B',
        reporterEmail: 'tranthib@example.com',
        reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TranThiB',
        companyId: 'company-1',
        companyName: 'Công ty ABC',
        reportType: ReportType.WEEKLY_REPORT,
        status: ReportStatus.APPROVED,
        content: 'Tuần này đã hoàn thành việc phát triển API cho module quản lý sản phẩm và đơn hàng. Đã test và fix các lỗi phát hiện được.',
        attachmentsUrl: [],
        reportingDate: new Date().toISOString(),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        projectId: 'proj-2',
        projectName: 'Dự án Mobile App Quản lý Nhân sự',
        milestoneId: 'milestone-3',
        milestoneName: 'Milestone 1: Setup Project & Authentication',
        reporterId: 'user-3',
        reporterName: 'Lê Văn C',
        reporterEmail: 'levanc@example.com',
        reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC',
        companyId: 'company-2',
        companyName: 'Công ty XYZ',
        reportType: ReportType.DAILY_REPORT,
        status: ReportStatus.REJECTED,
        content: 'Đã setup project và cấu hình authentication. Tuy nhiên còn một số vấn đề về security cần được xem xét lại.',
        attachmentsUrl: ['https://example.com/file3.pdf'],
        reportingDate: new Date().toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        feedback: 'Vui lòng cải thiện phần bảo mật authentication và thêm 2FA.',
    },
    {
        id: '4',
        projectId: 'proj-2',
        projectName: 'Dự án Mobile App Quản lý Nhân sự',
        milestoneId: 'milestone-4',
        milestoneName: 'Milestone 2: Phát triển Module Quản lý Nhân viên',
        reporterId: 'user-4',
        reporterName: 'Phạm Thị D',
        reporterEmail: 'phamthid@example.com',
        reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD',
        companyId: 'company-2',
        companyName: 'Công ty XYZ',
        reportType: ReportType.DELIVERY_REPORT,
        status: ReportStatus.SUBMITTED,
        content: 'Đã hoàn thành module quản lý nhân viên với đầy đủ các chức năng CRUD. Đã tích hợp với hệ thống chấm công và tính lương.',
        attachmentsUrl: ['https://example.com/file4.zip', 'https://example.com/file5.pdf'],
        reportingDate: new Date().toISOString(),
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '5',
        projectId: 'proj-3',
        projectName: 'Dự án Hệ thống Quản lý Kho',
        milestoneId: 'milestone-5',
        milestoneName: 'Milestone 1: Database Design & Setup',
        reporterId: 'user-5',
        reporterName: 'Hoàng Văn E',
        reporterEmail: 'hoangvane@example.com',
        reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangVanE',
        companyId: 'company-3',
        companyName: 'Công ty DEF',
        reportType: ReportType.MILESTONE_REPORT,
        status: ReportStatus.PENDING_ADMIN_CHECK,
        content: 'Đã thiết kế database schema và setup database. Đã tạo các bảng cơ bản cho quản lý kho, sản phẩm, nhập xuất kho.',
        attachmentsUrl: [],
        reportingDate: new Date().toISOString(),
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

export default function Reports() {
    const search = route.useSearch()
    const navigate = route.useNavigate()

    // TODO: Uncomment khi có API
    // const { data, isLoading, isError, error } = useGetReports({
    //     page: 1,
    //     size: 100,
    // })

    // if (isError) {
    //     return (
    //         <ErrorView
    //             title="Lỗi Tải Dữ Liệu"
    //             description="Không thể kết nối đến server hoặc tải danh sách báo cáo."
    //             details={error?.message}
    //         />
    //     )
    // }

    // const reports = data?.data || []
    const reports = mockReports // TODO: Thay bằng data từ API
    const isLoading = false // TODO: Thay bằng isLoading từ API

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

