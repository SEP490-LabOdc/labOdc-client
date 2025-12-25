import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatusAlertProps {
    icon?: ReactNode
    title: string
    message?: string
    variant?: 'info' | 'warning' | 'success' | 'error'
    className?: string
}

/**
 * Component cảnh báo trạng thái (hỗ trợ dark mode).
 * 
 * Ví dụ:
 * <StatusAlert
 *   variant="warning"
 *   title="Dự án bị từ chối"
 *   message="Dự án này đã bị từ chối và không thể chỉnh sửa thêm."
 * />
 */
export function StatusAlert({
    icon,
    title,
    message,
    variant = 'info',
    className,
}: StatusAlertProps) {
    const colorMap = {
        info: 'text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-700/50 dark:bg-blue-950/30',
        warning: 'text-amber-700 border-amber-200 bg-amber-50 dark:text-amber-300 dark:border-amber-700/50 dark:bg-amber-950/30',
        success: 'text-green-700 border-green-200 bg-green-50 dark:text-green-300 dark:border-green-700/50 dark:bg-green-950/30',
        error: 'text-red-700 border-red-200 bg-red-50 dark:text-red-300 dark:border-red-700/50 dark:bg-red-950/30',
    }[variant]

    return (
        <div
            className={cn(
                'flex items-center gap-3 rounded-md border p-3 transition-colors duration-200',
                colorMap,
                className
            )}
        >
            {icon ?? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 002 0V6zm0 6a1 1 0 10-2 0v.01a1 1 0 002 0V12z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
            <div>
                <p className="font-semibold">{title}</p>
                {message && (
                    <p className="text-sm opacity-80">{message}</p>
                )}
            </div>
        </div>
    )
}
