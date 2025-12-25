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
    Mail,
    Phone,
    Globe,
    MapPin,
    Briefcase,
} from 'lucide-react'
import { useGetMyCompanyInfo } from '@/hooks/api/companies'
import { useGetMyCompanyProjects } from '@/hooks/api/projects'
import { ErrorView } from '@/components/admin/ErrorView'
import { PROJECT_STATUS_LABEL, type ProjectStatus } from '../project/data/schema'
import { callTypes } from '../project/data/data'

/* =======================
   COMPANY DASHBOARD
======================= */

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

    const isLoading =
        isLoadingCompanyInfo || isLoadingCompanyProjects

    const isError =
        isCompanyError || isProjectError

    if (isError) {
        return (
            <ErrorView details='Có lỗi khi tải dữ liệu dashboard' />
        )
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

    const projects = projectsData.data.projectResponses.slice(0, 4);

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
                            {isLoadingCompanyProjects && (
                                <p className="text-sm text-muted-foreground">
                                    Đang tải danh sách dự án...
                                </p>
                            )}

                            {!isLoadingCompanyProjects && projects.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Công ty chưa có dự án nào
                                </p>
                            )}

                            {!isLoadingCompanyProjects &&
                                projects.map((project: any) => (
                                    <div
                                        key={project.id}
                                        className="rounded-lg border p-4 transition hover:shadow-sm"
                                    >
                                        {/* Header */}
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="font-semibold">{project.title}</h3>
                                            <ProjectStatusBadge status={project.status} />
                                        </div>

                                        {/* Meta */}
                                        <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div>📅 {project.startDate}</div>
                                            <div>💰 {project.budget.toLocaleString()} VND</div>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {project.skills?.slice(0, 4).map((s: any) => (
                                                <Badge variant="secondary">
                                                    {s.name}
                                                </Badge>
                                            ))}
                                            {project.skills?.length > 4 && (
                                                <Badge variant="outline">
                                                    +{project.skills.length - 4}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {project.description || 'Không có mô tả'}
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
                                value={isLoadingCompanyInfo ? 'Đang tải...' : company?.name ?? '-'}
                            />

                            <OverviewItem
                                icon={<FolderKanban size={16} />}
                                label="Tổng số dự án"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : projects.length}
                            />

                            <OverviewItem
                                icon={<Briefcase size={16} />}
                                label="Lĩnh vực"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : (company?.domain || 'Chưa cập nhật')}
                            />

                            <OverviewItem
                                icon={<Phone size={16} />}
                                label="Điện thoại"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : (company?.phone || '-')}
                            />

                            <OverviewItem
                                icon={<Mail size={16} />}
                                label="Email"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : (company?.email || '-')}
                            />

                            <OverviewItem
                                icon={<Globe size={16} />}
                                label="Website"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : (company?.website || 'Chưa cập nhật')}
                            />

                            <OverviewItem
                                icon={<MapPin size={16} />}
                                label="Địa chỉ"
                                value={isLoadingCompanyInfo
                                    ? 'Đang tải...'
                                    : (company?.address || '-')}
                            />

                            <div className="rounded-md border p-3">
                                <div className="mb-1 text-sm text-muted-foreground">
                                    Mô tả công ty
                                </div>
                                <p className="text-sm leading-relaxed">
                                    {isLoadingCompanyInfo
                                        ? 'Đang tải...'
                                        : (company?.description || 'Chưa có mô tả')}
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

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
    const className =
        callTypes.get(status) ??
        'bg-muted text-muted-foreground border-border'

    const label =
        PROJECT_STATUS_LABEL[status] ?? status

    return (
        <Badge
            variant="outline"
            className={className}
        >
            {label}
        </Badge>
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
