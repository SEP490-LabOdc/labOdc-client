import { Main } from '@/components/layout/main'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Building2,
    FolderKanban,
    AlertTriangle,
    GraduationCap,
    UserCheck,
    Wallet,
    Briefcase,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { useGetUserNotifications } from '@/hooks/api/notifications'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatVND } from '@/helpers/currency'

/* =======================
   MOCK DATA – LABODC
======================= */

const systemOverview = {
    pendingCompanies: 42,
    pendingProjects: 42,
    activeCompanies: 88,
    activeProjects: 44,
    recruitingProjects: 17,
    totalMentors: 100,
    availableMentors: 30,
    totalStudents: 500,
    joinedStudents: 100,
    totalBudget: 12500000,
}

const projectCreatedByMonth = [
    { month: '2025-11', total: 18 },
    { month: '2025-12', total: 24 },
    { month: '2026-01', total: 15 },
    { month: '2026-02', total: 21 },
    { month: '2026-03', total: 19 },
    { month: '2026-04', total: 26 },
]

const companyCreatedByMonth = [
    { month: '2025-11', total: 6 },
    { month: '2025-12', total: 9 },
    { month: '2026-01', total: 7 },
    { month: '2026-02', total: 10 },
    { month: '2026-03', total: 8 },
    { month: '2026-04', total: 11 },
]

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
        data: notifications = [],
        isLoading,
    } = useGetUserNotifications(user?.id);

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

    const projectChartData = projectCreatedByMonth.map(item => ({
        label: formatMonthLabel(item.month), // 11/2025
        total: item.total,
    }))

    const companyChartData = companyCreatedByMonth.map(item => ({
        label: formatMonthLabel(item.month),
        total: item.total,
    }))


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
                <div className="space-y-6 lg:col-span-7">
                    {/* ===== APPROVAL REQUIRED ===== */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Yêu cầu chờ phê duyệt
                            </CardTitle>
                            <CardDescription>
                                Các yêu cầu cần quản trị viên xử lý
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    to="/lab-admin/companies"
                                    search={{ status: ['PENDING'] }}
                                    className="block"
                                >
                                    <ApprovalBox
                                        icon={<Building2 size={16} />}
                                        label="Doanh nghiệp chờ phê duyệt"
                                        value={systemOverview.pendingCompanies}
                                        variant="company"
                                    />
                                </Link>

                                <Link
                                    to="/lab-admin/projects"
                                    search={{ status: ['PENDING'] }}
                                    className="block"
                                >
                                    <ApprovalBox
                                        icon={<FolderKanban size={16} />}
                                        label="Dự án chờ phê duyệt"
                                        value={systemOverview.pendingProjects}
                                        variant="project"
                                    />
                                </Link>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                ⚠️ Hiện có{' '}
                                <strong>
                                    {systemOverview.pendingCompanies} doanh nghiệp
                                </strong>{' '}
                                và{' '}
                                <strong>
                                    {systemOverview.pendingProjects} dự án
                                </strong>{' '}
                                đang chờ phê duyệt.
                            </p>
                        </CardContent>
                    </Card>

                    {/* ===== RECENT ACTIVITIES ===== */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hoạt động gần đây</CardTitle>
                            <CardDescription>
                                8 thông báo mới nhất cần quản trị viên xử lý
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {isLoading && (
                                <p className="text-sm text-muted-foreground">
                                    Đang tải thông báo...
                                </p>
                            )}

                            {!isLoading && latestNotifications.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Không có thông báo mới
                                </p>
                            )}

                            {!isLoading &&
                                latestNotifications.map((item) => (
                                    <Link
                                        key={item.notificationRecipientId}
                                        to={item.deepLink}
                                        className="block rounded-md border p-4 transition hover:bg-muted"
                                    >
                                        <div className="mb-1 flex items-center gap-2">
                                            <Badge>
                                                {item.category === 'PROJECT_MANAGEMENT'
                                                    ? 'Dự án'
                                                    : 'Doanh nghiệp'}
                                            </Badge>

                                            {!item.readStatus && (
                                                <span className="text-xs font-semibold text-red-500">
                                                    ●
                                                </span>
                                            )}

                                            <span className="text-sm font-medium">
                                                {item.title}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground text-sm">
                                            {item.content}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {new Date(item.sentAt).toLocaleString('vi-VN')}
                                        </p>
                                    </Link>
                                ))}
                        </CardContent>
                    </Card>
                </div>

                {/* =======================
                    RIGHT COLUMN (5)
                ======================= */}
                <div className="space-y-6 lg:col-span-5">
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
                                value={`${formatVND(systemOverview.totalBudget)}`}
                            />
                            <OverviewItem
                                icon={<Building2 size={16} />}
                                label="Doanh nghiệp đang hoạt động"
                                value={systemOverview.activeCompanies}
                            />
                            <OverviewItem
                                icon={<FolderKanban size={16} />}
                                label="Dự án đang triển khai"
                                value={systemOverview.activeProjects}
                            />
                            <OverviewItem
                                icon={<Briefcase size={16} />}
                                label="Dự án đang tuyển dụng"
                                value={systemOverview.recruitingProjects}
                            />
                            <OverviewItem
                                icon={<UserCheck size={16} />}
                                label="Mentor khả dụng"
                                value={`${systemOverview.availableMentors} / ${systemOverview.totalMentors}`}
                            />
                            <OverviewItem
                                icon={<GraduationCap size={16} />}
                                label="Sinh viên tham gia dự án"
                                value={`${systemOverview.joinedStudents} / ${systemOverview.totalStudents}`}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dự án mới theo tháng</CardTitle>
                            <CardDescription>Số dự án được tạo trong 6 tháng gần nhất</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[220px]">
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
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Doanh nghiệp mới theo tháng</CardTitle>
                            <CardDescription>Số doanh nghiệp đăng ký trong 6 tháng gần nhất</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={companyChartData}>
                                    <XAxis dataKey="label" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip
                                        formatter={(value: number) => [`${value} doanh nghiệp`, 'Đăng ký mới']}
                                        labelFormatter={(label) => `Tháng ${label}`}
                                    />
                                    <Bar
                                        dataKey="total"
                                        radius={[4, 4, 0, 0]}
                                        className="fill-primary"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Main>
    )
}

/* =======================
   INLINE UI BLOCKS
======================= */
function ApprovalBox({
    icon,
    label,
    value,
    variant,
}: {
    icon: React.ReactNode
    label: string
    value: number
    variant: 'company' | 'project'
}) {
    const styles =
        variant === 'company'
            ? {
                border: 'border-amber-200',
                bg: 'bg-amber-50',
                iconBg: 'bg-amber-100',
                iconText: 'text-amber-700',
                accent: 'bg-amber-400',
                text: 'text-amber-900',
            }
            : {
                border: 'border-blue-200',
                bg: 'bg-blue-50',
                iconBg: 'bg-blue-100',
                iconText: 'text-blue-700',
                accent: 'bg-blue-400',
                text: 'text-blue-900',
            }

    return (
        <div
            className={`relative rounded-lg border ${styles.border} ${styles.bg} p-4 transition hover:shadow-md`}
        >
            {/* Accent strip */}
            <div
                className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${styles.accent}`}
            />

            <div className="mb-2 flex items-center gap-2">
                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconText}`}
                >
                    {icon}
                </div>
                <span className={`text-sm font-medium ${styles.text}`}>
                    {label}
                </span>
            </div>

            <p className={`text-3xl font-bold ${styles.text}`}>
                {value}
            </p>

            <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                Xem chi tiết →
            </span>

            <AlertTriangle
                size={16}
                className={`absolute right-3 top-3 ${styles.iconText}`}
            />
        </div>
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
            <span className="text-lg font-semibold">
                {value}
            </span>
        </div>
    )
}
