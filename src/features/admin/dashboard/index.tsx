import { Main } from '@/components/layout/main'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import {
    Building2,
    FolderKanban,
    GraduationCap,
    UserCheck,
    Wallet,
    Briefcase,
} from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { useGetUserNotifications } from '@/hooks/api/notifications'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatVND } from '@/helpers/currency'
import { useGetCompanyDashboardOverview, useGetCompanyLast6MonthStatistic, useGetMyWallet, useGetProjectDashboardOverview, useGetProjectLast6MonthStatistic, useGetUserDashboardOverview } from '@/hooks/api/dashboard'

const formatMonthLabel = (month: string) => {
    const [year, m] = month.split('-')
    return `${m}/${year}`
}

/* =======================
   DASHBOARD
======================= */

export default function Dashboard() {
    const { user } = useUser()

    const {
        data: projectStatistic,
        isLoading: projectLoading,
    } = useGetProjectLast6MonthStatistic();

    const {
        data: companyStatistic,
        isLoading: companyLoading,
    } = useGetCompanyLast6MonthStatistic();

    const {
        data: notifications = [],
        isLoading,
    } = useGetUserNotifications(user?.id);

    const { data: projectOverview } = useGetProjectDashboardOverview();
    const { data: companyOverview } = useGetCompanyDashboardOverview();
    const { data: userOverview } = useGetUserDashboardOverview();
    const { data: wallet, isLoading: walletLoading } = useGetMyWallet()

    const overviewLoading =
        !projectOverview || !companyOverview || !userOverview || walletLoading

    let latestNotifications = [];

    if (!isLoading) {
        latestNotifications = [...notifications?.data]
            .sort(
                (a, b) =>
                    new Date(b.sentAt).getTime() -
                    new Date(a.sentAt).getTime()
            )
            .slice(0, 8)

    }


    const projectChartData =
        projectStatistic?.map((item: { month: string; total: number }) => ({
            label: formatMonthLabel(item.month),
            total: item.total,
        })) ?? []

    const companyChartData =
        companyStatistic?.map((item: { month: string; total: number }) => ({
            label: formatMonthLabel(item.month),
            total: item.total,
        })) ?? []

    const systemOverview = {
        // Company
        pendingCompanies: companyOverview?.pendingCompanies ?? 0,
        activeCompanies: companyOverview?.activeCompanies ?? 0,

        // Project
        pendingProjects: projectOverview?.pendingProjects ?? 0,
        activeProjects: projectOverview?.activeProjects ?? 0,
        recruitingProjects: projectOverview?.recruitingProjects ?? 0,
        joinedStudents: projectOverview?.joinedStudents ?? 0,
        availableMentors: projectOverview?.availableMentors ?? 0,

        // User
        totalMentors: userOverview?.totalMentors ?? 0,
        totalStudents: userOverview?.totalStudents ?? 0,

        totalBudget:
            (wallet?.heldBalance ?? 0),
    }

    const renderValue = (
        loading: boolean,
        value: string | number
    ) => (loading ? 'Đang tải dữ liệu...' : value)

    return (
        <Main>
            {/* ===== HEADER ===== */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-muted-foreground text-sm">
                    Tổng quan vận hành và nguồn lực của hệ thống LabODC
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* =======================
                    LEFT COLUMN (7)
                ======================= */}
                <div className="space-y-6 lg:col-span-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Tổng quan hệ thống
                            </CardTitle>
                            <CardDescription>
                                Tình trạng vận hành & nguồn lực
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <OverviewItem
                                icon={<Wallet size={16} />}
                                label="Tổng số vốn"
                                value={renderValue(
                                    overviewLoading,
                                    formatVND(systemOverview.totalBudget)
                                )}
                            />

                            <OverviewItem
                                icon={<Building2 size={16} />}
                                label="Doanh nghiệp đang hoạt động"
                                value={renderValue(
                                    overviewLoading,
                                    systemOverview.activeCompanies
                                )}
                            />

                            <OverviewItem
                                icon={<FolderKanban size={16} />}
                                label="Dự án đang triển khai"
                                value={renderValue(
                                    overviewLoading,
                                    systemOverview.activeProjects
                                )}
                            />

                            <OverviewItem
                                icon={<Briefcase size={16} />}
                                label="Dự án đang tuyển dụng"
                                value={renderValue(
                                    overviewLoading,
                                    systemOverview.recruitingProjects
                                )}
                            />

                            <OverviewItem
                                icon={<UserCheck size={16} />}
                                label="Mentor khả dụng"
                                value={renderValue(
                                    overviewLoading,
                                    `${systemOverview.availableMentors} / ${systemOverview.totalMentors}`
                                )}
                            />

                            <OverviewItem
                                icon={<GraduationCap size={16} />}
                                label="Sinh viên tham gia dự án"
                                value={renderValue(
                                    overviewLoading,
                                    `${systemOverview.joinedStudents} / ${systemOverview.totalStudents}`
                                )}
                            />

                        </CardContent>
                    </Card>
                </div>

                {/* =======================
                    RIGHT COLUMN (5)
                ======================= */}
                <div className="space-y-6 lg:col-span-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dự án mới theo tháng</CardTitle>
                            <CardDescription>Số dự án được tạo trong 6 tháng gần nhất</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[220px]">
                            {projectLoading ? (
                                <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={projectChartData}>
                                        <XAxis dataKey="label" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip
                                            formatter={(value: number) => [`${value} dự án`, 'Số lượng']}
                                            labelFormatter={(label) => `Tháng ${label}`}
                                        />
                                        <Bar
                                            dataKey="total"
                                            radius={[4, 4, 0, 0]}
                                            className="fill-primary"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Doanh nghiệp mới theo tháng</CardTitle>
                            <CardDescription>Số doanh nghiệp đăng ký trong 6 tháng gần nhất</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[220px]">
                            {companyLoading ? (
                                <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={companyChartData}>
                                        <XAxis dataKey="label" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip
                                            formatter={(value: number) => [
                                                `${value} doanh nghiệp`,
                                                'Đăng ký mới',
                                            ]}
                                            labelFormatter={(label) => `Tháng ${label}`}
                                        />
                                        <Bar
                                            dataKey="total"
                                            radius={[4, 4, 0, 0]}
                                            className="fill-primary"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Main>
    )
}

function OverviewItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string | number
}) {
    return (
        <div className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    {icon}
                </div>
                <span>{label}</span>
            </div>
            <span className="font-semibold">
                {value}
            </span>
        </div>
    )
}
