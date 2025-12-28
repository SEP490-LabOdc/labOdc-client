import { Main } from '@/components/layout/main'
import { ErrorView } from '@/components/admin/ErrorView'
import { useGetMyCompanyInfo } from '@/hooks/api/companies'
import { useGetMyCompanyProjects } from '@/hooks/api/projects'
import CompanyProjectsCard from './components/company-projects-card'
import CompanyInfoCard from './components/company-info-card'

export default function CompanyDashboard() {
    const {
        data: company,
        isLoading: isLoadingCompanyInfo,
        isError: isCompanyError,
    } = useGetMyCompanyInfo()

    const {
        data: projectsData,
        isLoading: isLoadingCompanyProjects,
        isError: isProjectError,
    } = useGetMyCompanyProjects()

    const isLoading = isLoadingCompanyInfo || isLoadingCompanyProjects
    const isError = isCompanyError || isProjectError

    if (isError) {
        return <ErrorView details="Có lỗi khi tải dữ liệu dashboard" />
    }

    if (isLoading) {
        return (
            <Main>
                <p className="text-sm text-muted-foreground">
                    Đang tải dữ liệu dashboard...
                </p>
            </Main>
        )
    }

    const projects = projectsData.data.projectResponses.slice(0, 4)

    return (
        <Main>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm">
                    Tổng quan dự án và thông tin doanh nghiệp
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <CompanyProjectsCard projects={projects} />
                </div>

                <div className="lg:col-span-5">
                    <CompanyInfoCard company={company} projectCount={projects.length} />
                </div>
            </div>
        </Main>
    )
}
