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
    Users,
    Wallet,
    Calendar,
    Mail,
    User,
    Phone,
    Globe,
    MapPin,
    Briefcase,
} from 'lucide-react'

/* =======================
   FAKE DATA – COMPANY
======================= */

const companyInfo = {
    name: 'Công ty SoftWave',
    status: 'ACTIVE',
    field: 'Software & IT Services',
    phone: '0901 234 567',
    address: 'Tầng 8, Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh',
    website: 'https://softwave.vn',
    email: 'contact@softwave.vn',
    description:
        'SoftWave là doanh nghiệp hoạt động trong lĩnh vực phát triển phần mềm, cung cấp các giải pháp công nghệ cho doanh nghiệp và hệ thống quy mô lớn.',
    totalProjects: 4,
}

const companyProjects = [
    {
        id: 'p-001',
        title: 'Hệ thống Microservices E-commerce',
        description:
            'Thiết kế và triển khai hệ thống E-commerce theo kiến trúc Microservices, tích hợp CI/CD và hệ thống thanh toán.',
        status: 'ACTIVE',
        startDate: '2025-10-01',
        endDate: '2025-12-30',
        budget: 350_000_000,
        skills: [
            { name: 'Java' },
            { name: 'Spring Boot' },
            { name: 'Docker' },
            { name: 'Kubernetes' },
            { name: 'SQL' },
            { name: 'Redis' },
        ],
    },
    {
        id: 'p-002',
        title: 'Admin Dashboard cho Logistics',
        description:
            'Xây dựng dashboard quản lý đơn hàng, kho vận và báo cáo real-time cho hệ thống logistics.',
        status: 'RECRUITING',
        startDate: '2025-11-15',
        endDate: '2026-02-15',
        budget: 250_000_000,
        skills: [
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'Node.js' },
            { name: 'Chart.js' },
            { name: 'REST API' },
        ],
    },
    {
        id: 'p-003',
        title: 'Real-time Chat Service',
        description:
            'Phát triển dịch vụ chat thời gian thực sử dụng WebSocket, hỗ trợ scale lớn và bảo mật cao.',
        status: 'ACTIVE',
        startDate: '2025-09-20',
        endDate: '2025-12-20',
        budget: 180_000_000,
        skills: [
            { name: 'Node.js' },
            { name: 'WebSocket' },
            { name: 'Redis' },
            { name: 'MongoDB' },
        ],
    },
    {
        id: 'p-004',
        title: 'AI Recommendation Engine',
        description:
            'Xây dựng hệ thống gợi ý sản phẩm dựa trên hành vi người dùng và machine learning.',
        status: 'PLANNING',
        startDate: '2026-01-05',
        endDate: '2026-04-30',
        budget: 420_000_000,
        skills: [
            { name: 'Python' },
            { name: 'Machine Learning' },
            { name: 'TensorFlow' },
            { name: 'Data Analysis' },
        ],
    },
    {
        id: 'p-005',
        title: 'Hệ thống quản lý tài liệu nội bộ',
        description:
            'Phát triển hệ thống quản lý tài liệu nội bộ với phân quyền, versioning và audit log.',
        status: 'COMPLETED',
        startDate: '2025-06-01',
        endDate: '2025-08-30',
        budget: 150_000_000,
        skills: [
            { name: 'Java' },
            { name: 'Spring Boot' },
            { name: 'PostgreSQL' },
            { name: 'Security' },
        ],
    },
    {
        id: 'p-006',
        title: 'Ứng dụng quản lý sinh viên thực tập',
        description:
            'Xây dựng nền tảng kết nối sinh viên thực tập với doanh nghiệp, hỗ trợ quản lý tiến độ và đánh giá. Xây dựng nền tảng kết nối sinh viên thực tập với doanh nghiệp, hỗ trợ quản lý tiến độ và đánh giá.Xây dựng nền tảng kết nối sinh viên thực tập với doanh nghiệp, hỗ trợ quản lý tiến độ và đánh giá.Xây dựng nền tảng kết nối sinh viên thực tập với doanh nghiệp, hỗ trợ quản lý tiến độ và đánh giá.',
        status: 'RECRUITING',
        startDate: '2025-12-01',
        endDate: '2026-03-01',
        budget: 300_000_000,
        skills: [
            { name: 'Flutter' },
            { name: 'Firebase' },
            { name: 'REST API' },
        ],
    },
]


/* =======================
   COMPANY DASHBOARD
======================= */

export default function CompanyDashboard() {
    return (
        <Main>
            {/* ===== HEADER ===== */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-muted-foreground text-sm">
                    Tổng quan dự án và thông tin doanh nghiệp
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* =======================
            LEFT (PROJECTS) – 7
        ======================= */}
                <div className="space-y-6 lg:col-span-7">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dự án của công ty</CardTitle>
                            <CardDescription>
                                Các dự án đã và đang triển khai
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {companyProjects.map(project => (
                                <div
                                    key={project.id}
                                    className="rounded-lg border p-4 hover:shadow-sm transition"
                                >
                                    {/* Header */}
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="font-semibold">
                                            {project.title}
                                        </h3>
                                        <ProjectStatusBadge status={project.status} />
                                    </div>

                                    {/* Meta */}
                                    <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            📅 {project.startDate}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            💰 {project.budget.toLocaleString()} VND
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {project.skills.slice(0, 4).map((s, idx) => (
                                            <Badge key={idx} variant="secondary">
                                                {s.name}
                                            </Badge>
                                        ))}
                                        {project.skills.length > 4 && (
                                            <Badge variant="outline">
                                                +{project.skills.length - 4}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="line-clamp-2 text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* =======================
            RIGHT (COMPANY INFO) – 5
        ======================= */}
                <div className="space-y-6 lg:col-span-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin công ty</CardTitle>
                            <CardDescription>
                                Thông tin tổng quan doanh nghiệp
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm">
                            <OverviewItem
                                icon={<Building2 size={16} />}
                                label="Tên công ty"
                                value={companyInfo.name}
                            />

                            <OverviewItem
                                icon={<FolderKanban size={16} />}
                                label="Tổng số dự án"
                                value={companyInfo.totalProjects}
                            />

                            <OverviewItem
                                icon={<Briefcase size={16} />}
                                label="Lĩnh vực"
                                value={companyInfo.field}
                            />

                            <OverviewItem
                                icon={<Phone size={16} />}
                                label="Điện thoại"
                                value={companyInfo.phone}
                            />

                            <OverviewItem
                                icon={<Mail size={16} />}
                                label="Email"
                                value={companyInfo.email}
                            />

                            <OverviewItem
                                icon={<Globe size={16} />}
                                label="Website"
                                value={companyInfo.website}
                            />

                            <OverviewItem
                                icon={<MapPin size={16} />}
                                label="Địa chỉ"
                                value={companyInfo.address}
                            />

                            {/* Description block */}
                            <div className="rounded-md border p-3">
                                <div className="mb-1 text-sm text-muted-foreground">
                                    Mô tả công ty
                                </div>
                                <p className="text-sm leading-relaxed">
                                    {companyInfo.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Main>
    )
}

/* =======================
   SMALL COMPONENTS
======================= */

function ProjectStatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        PENDING: 'bg-amber-100 text-amber-700',
        ACTIVE: 'bg-green-100 text-green-700',
        RECRUITING: 'bg-blue-100 text-blue-700',
        COMPLETED: 'bg-gray-200 text-gray-700',
    }

    const labelMap: Record<string, string> = {
        PENDING: 'Chờ duyệt',
        ACTIVE: 'Đang triển khai',
        RECRUITING: 'Đang tuyển',
        COMPLETED: 'Hoàn thành',
    }

    return (
        <Badge className={map[status]}>
            {labelMap[status]}
        </Badge>
    )
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{icon}</span>
            <span>{label}: </span>
            <span className="font-medium">{value}</span>
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
            <span className="font-semibold">{value}</span>
        </div>
    )
}
