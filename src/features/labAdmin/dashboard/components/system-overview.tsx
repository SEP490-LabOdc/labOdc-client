import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Wallet, Building2, FolderKanban, Briefcase, UserCheck, GraduationCap } from 'lucide-react'

import { useGetCompanyDashboardOverview, useGetProjectDashboardOverview, useGetUserDashboardOverview, useGetMyWallet } from '@/hooks/api/dashboard'
import { formatVND } from '@/helpers/currency'
import OverviewItem from './overview-item'

export default function SystemOverview() {
    const { data: company } = useGetCompanyDashboardOverview()
    const { data: project } = useGetProjectDashboardOverview()
    const { data: user } = useGetUserDashboardOverview()
    const { data: wallet } = useGetMyWallet()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tổng quan hệ thống</CardTitle>
                <CardDescription>Tình trạng vận hành & nguồn lực</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
                <OverviewItem icon={<Wallet size={16} />} label="Tổng số vốn" value={formatVND(wallet?.heldBalance ?? 0)} />
                <OverviewItem icon={<Building2 size={16} />} label="Doanh nghiệp đang hoạt động" value={company?.activeCompanies ?? 0} />
                <OverviewItem icon={<FolderKanban size={16} />} label="Dự án đang triển khai" value={project?.activeProjects ?? 0} />
                <OverviewItem icon={<Briefcase size={16} />} label="Dự án đang tuyển dụng" value={project?.recruitingProjects ?? 0} />
                <OverviewItem icon={<UserCheck size={16} />} label="Mentor khả dụng" value={`${project?.availableMentors ?? 0} / ${user?.totalMentors ?? 0}`} />
                <OverviewItem icon={<GraduationCap size={16} />} label="Sinh viên tham gia dự án" value={`${project?.joinedStudents ?? 0} / ${user?.totalStudents ?? 0}`} />
            </CardContent>
        </Card>
    )
}
