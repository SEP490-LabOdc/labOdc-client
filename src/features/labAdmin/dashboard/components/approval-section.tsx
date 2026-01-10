import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { Building2, FolderKanban } from 'lucide-react'
import { useGetCompanyDashboardOverview, useGetProjectDashboardOverview } from '@/hooks/api/dashboard'
import ApprovalBox from './approval-box'

export default function ApprovalSection() {
    const { data: companyOverview } = useGetCompanyDashboardOverview()
    const { data: projectOverview } = useGetProjectDashboardOverview()

    const pendingCompanies = companyOverview?.pendingCompanies ?? 0
    const pendingProjects = projectOverview?.pendingProjects ?? 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>Yêu cầu chờ phê duyệt</CardTitle>
                <CardDescription>
                    Các yêu cầu cần quản trị viên xử lý
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/lab-admin/companies" search={{ status: ['PENDING'] }}>
                        <ApprovalBox
                            icon={<Building2 size={16} />}
                            label="Doanh nghiệp chờ phê duyệt"
                            value={pendingCompanies}
                            variant="company"
                        />
                    </Link>

                    <Link to="/lab-admin/projects" search={{ status: ['PENDING'] }}>
                        <ApprovalBox
                            icon={<FolderKanban size={16} />}
                            label="Dự án chờ phê duyệt"
                            value={pendingProjects}
                            variant="project"
                        />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
