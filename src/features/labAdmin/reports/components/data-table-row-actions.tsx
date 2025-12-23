import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Row } from '@tanstack/react-table'
import { Eye, CheckCircle, XCircle } from 'lucide-react'
import { type Report } from '../data/schema'
import { useState } from 'react'
import { ReportDetailModal } from './report-detail-modal'
import { ReportStatus } from '@/hooks/api/report'

interface DataTableRowActionsProps {
    row: Row<Report>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const report = row.original
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [actionMode, setActionMode] = useState<'approve' | 'reject' | null>(null)

    const canApprove = report.status === ReportStatus.SUBMITTED || report.status === ReportStatus.PENDING_ADMIN_CHECK
    const canReject = report.status === ReportStatus.SUBMITTED || report.status === ReportStatus.PENDING_ADMIN_CHECK

    const handleOpenDetail = (mode: 'approve' | 'reject' | null = null) => {
        setActionMode(mode)
        setIsDetailOpen(true)
    }

    const handleClose = () => {
        setIsDetailOpen(false)
        setActionMode(null)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleOpenDetail(null)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                    </DropdownMenuItem>
                    {canApprove && (
                        <DropdownMenuItem onClick={() => handleOpenDetail('approve')}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Duyệt báo cáo
                        </DropdownMenuItem>
                    )}
                    {canReject && (
                        <DropdownMenuItem onClick={() => handleOpenDetail('reject')}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Từ chối
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <ReportDetailModal
                isOpen={isDetailOpen}
                onClose={handleClose}
                report={report}
                actionMode={actionMode}
            />
        </>
    )
}

