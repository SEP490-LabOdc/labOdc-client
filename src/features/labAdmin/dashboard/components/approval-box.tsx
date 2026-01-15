import { AlertTriangle } from 'lucide-react'

export default function ApprovalBox({
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
        <div className={`relative rounded-md border ${styles.border} ${styles.bg} p-4 hover:shadow-md`}>
            <div className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`} />

            <div className="mb-2 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconText}`}>
                    {icon}
                </div>
                <span className={`text-sm font-medium ${styles.text}`}>
                    {label}
                </span>
            </div>

            <p className={`text-3xl font-bold ${styles.text}`}>{value}</p>

            <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                Xem chi tiết →
            </span>

            <AlertTriangle size={16} className={`absolute right-3 top-3 ${styles.iconText}`} />
        </div>
    )
}
