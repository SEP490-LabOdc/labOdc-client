import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { useUser } from '@/context/UserContext'
import { useGetUserNotifications } from '@/hooks/api/notifications'

export default function RecentActivities() {
    const { user } = useUser()

    const {
        data: notifications = [],
        isLoading,
    } = useGetUserNotifications(user?.id)

    const latestNotifications = [...(notifications?.data ?? [])]
        .sort(
            (a, b) =>
                new Date(b.sentAt).getTime() -
                new Date(a.sentAt).getTime()
        )
        .slice(0, 8)

    return (
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

                            <p className="text-sm text-muted-foreground">
                                {item.content}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {new Date(item.sentAt).toLocaleString('vi-VN')}
                            </p>
                        </Link>
                    ))}
            </CardContent>
        </Card>
    )
}
