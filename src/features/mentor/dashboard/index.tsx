import { Main } from '@/components/layout/main'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { useGetUserNotifications } from '@/hooks/api/notifications'
import { useGetMyProjects } from '@/hooks/api/projects'
import ProjectsCard from './components/projects-card'

export default function Dashboard() {
    const { user } = useUser()

    const {
        data: notifications = [],
        isLoading: isNotificationLoading,
    } = useGetUserNotifications(user?.id);

    const { data, isLoading: isLoadingProject } = useGetMyProjects('');

    const isLoading =
        isLoadingProject || isNotificationLoading

    if (isLoading) {
        return (
            <Main>
                <div className="container mx-auto px-8 py-12 text-center">
                    <div className="text-gray-500">Đang tải dữ liệu...</div>
                </div>
            </Main>
        )
    }

    const projects = data.data;

    let latestNotifications = [];

    latestNotifications = [...(notifications?.data ?? [])]
        .sort(
            (a, b) =>
                new Date(b.sentAt).getTime() -
                new Date(a.sentAt).getTime()
        )
        .slice(0, 5)

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
                <div className="space-y-6 lg:col-span-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hoạt động gần đây</CardTitle>
                            <CardDescription>
                                5 thông báo mới nhất
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
                <div className="space-y-6 lg:col-span-6">
                    <ProjectsCard projects={projects ?? []} />
                </div>
            </div>
        </Main>
    )
}
