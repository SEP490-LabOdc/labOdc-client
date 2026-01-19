import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface ConfirmApprovedAlertProps {
    icon?: ReactNode
    title?: string
    message?: string
    className?: string
}

/**
 * Component hiển thị thông báo xác nhận thông tin đã được phê duyệt và không thể cập nhật.
 * 
 * Ví dụ:
 * <ConfirmApprovedAlert />
 * 
 * hoặc với message tùy chỉnh:
 * <ConfirmApprovedAlert 
 *   title="Thông tin đã được xác nhận"
 *   message="Thông tin này đã được phê duyệt và không thể chỉnh sửa sau khi được duyệt."
 * />
 */
export function ConfirmApprovedAlert({
    icon,
    title = "Thông tin đã được xác nhận",
    message = "Vui lòng xác nhận thông tin là chính xác. Sau khi được phê duyệt, bạn sẽ không thể cập nhật thông tin này nữa.",
    className,
}: ConfirmApprovedAlertProps) {
    const colorClass = 'text-green-700 border-green-200 bg-green-50 dark:text-green-300 dark:border-green-700/50 dark:bg-green-950/30'

    const defaultIcon = (
        <CheckCircle className="h-6 w-6 shrink-0" />
    )

    return (
        <div
            className={cn(
                'flex items-start gap-3 rounded-md border p-4 transition-colors duration-200',
                colorClass,
                className
            )}
            role="alert"
        >
            {icon ?? defaultIcon}
            <div className="flex-1">
                <p className="font-semibold">{title}</p>
                {message && (
                    <p className="mt-1 text-sm opacity-90 leading-relaxed">{message}</p>
                )}
            </div>
        </div>
    )
}
