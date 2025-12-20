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

/* =======================
   MOCK DATA – LABODC
======================= */

const approvalStats = {
    pendingCompanies: 42,
    pendingProjects: 42,
}

const systemOverview = {
    activeCompanies: 88,
    activeProjects: 44,
    recruitingProjects: 17,
    totalMentors: 100,
    availableMentors: 30,
    totalStudents: 500,
    joinedStudents: 100,
    totalCapital: 12_500_000,
}

const recentActivities = [
    {
        type: 'APPROVAL_PROJECT',
        title: 'Có dự án mới cần phê duyệt',
        description:
            'Dự án "Hệ thống Microservices E-commerce" vừa được tạo và đang chờ phê duyệt.',
        time: 'Khoảng 19 giờ trước',
    },
    {
        type: 'APPROVAL_COMPANY',
        title: 'Công ty cập nhật thông tin cần duyệt',
        description:
            'Doanh nghiệp "Công ty SoftWave" đã cập nhật thông tin đăng ký.',
        time: 'Khoảng 19 giờ trước',
    },
    {
        type: 'REGISTER_COMPANY',
        title: 'Có công ty đăng ký mới',
        description:
            'Doanh nghiệp "Công ty SoftWave" vừa đăng ký tham gia nền tảng.',
        time: 'Khoảng 19 giờ trước',
    },
]

/* =======================
   DASHBOARD
======================= */

export default function Dashboard() {
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
                                <ApprovalBox
                                    icon={<Building2 size={16} />}
                                    label="Doanh nghiệp chờ phê duyệt"
                                    value={approvalStats.pendingCompanies}
                                    variant="company"
                                />
                                <ApprovalBox
                                    icon={<FolderKanban size={16} />}
                                    label="Dự án chờ phê duyệt"
                                    value={approvalStats.pendingProjects}
                                    variant="project"
                                />
                            </div>

                            <p className="text-sm text-muted-foreground">
                                ⚠️ Hiện có{' '}
                                <strong>
                                    {approvalStats.pendingCompanies} doanh nghiệp
                                </strong>{' '}
                                và{' '}
                                <strong>
                                    {approvalStats.pendingProjects} dự án
                                </strong>{' '}
                                đang chờ phê duyệt.
                            </p>
                        </CardContent>
                    </Card>

                    {/* ===== RECENT ACTIVITIES ===== */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Hoạt động gần đây
                            </CardTitle>
                            <CardDescription>
                                Các sự kiện mới nhất trong hệ thống
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentActivities.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-md border p-4"
                                >
                                    <div className="mb-1 flex items-center gap-2">
                                        <Badge>
                                            {item.type ===
                                                'APPROVAL_PROJECT'
                                                ? 'Phê duyệt dự án'
                                                : item.type ===
                                                    'APPROVAL_COMPANY'
                                                    ? 'Phê duyệt doanh nghiệp'
                                                    : 'Đăng ký mới'}
                                        </Badge>
                                        <span className="text-sm font-medium">
                                            {item.title}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {item.description}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {item.time}
                                    </p>
                                </div>
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
                                value={`${systemOverview.totalCapital.toLocaleString()} VND`}
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
            className={`relative rounded-lg border ${styles.border} ${styles.bg} p-4`}
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
