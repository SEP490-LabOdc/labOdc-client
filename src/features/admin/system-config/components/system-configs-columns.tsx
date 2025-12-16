import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Edit2, Settings } from 'lucide-react'
import type { SystemConfig } from '@/hooks/api/system-config/types'
import { hasConfigEditor } from './config-registry'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const getConfigDisplayName = (name: string): string => {
    const nameMap: Record<string, string> = {
        'fee-distribution': 'Phân chia phí',
    }
    return nameMap[name] || name
}

export const systemConfigsColumns: ColumnDef<SystemConfig>[] = [
    {
        accessorKey: 'name',
        header: 'Tên cấu hình',
        cell: ({ row }) => {
            const config = row.original
            return (
                <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{getConfigDisplayName(config.name)}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
        cell: ({ row }) => {
            return (
                <p className="text-sm text-muted-foreground max-w-md">
                    {row.getValue('description')}
                </p>
            )
        },
    },
    {
        accessorKey: 'updatedAt',
        header: 'Cập nhật lần cuối',
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'))
            return (
                <span className="text-sm">
                    {format(date, 'dd/MM/yyyy HH:mm', { locale: vi })}
                </span>
            )
        },
    },
    {
        id: 'editable',
        header: 'Trạng thái',
        cell: ({ row }) => {
            const config = row.original
            const editable = hasConfigEditor(config.name)
            return (
                <Badge variant={editable ? 'default' : 'secondary'}>
                    {editable ? 'Có thể chỉnh sửa' : 'Chưa hỗ trợ'}
                </Badge>
            )
        },
    },
    {
        id: 'actions',
        header: 'Thao tác',
        cell: ({ row }) => {
            const config = row.original
            const editable = hasConfigEditor(config.name)
            return (
                <div className="flex items-center justify-end">
                    {editable ? (
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                    )}
                </div>
            )
        },
    },
]

