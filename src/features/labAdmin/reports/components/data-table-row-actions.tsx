import { Button } from '@/components/ui/button'
import { type Row } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { usePopUp } from '@/hooks/usePopUp'
import { ReportDetailModal } from './report-detail-modal'
import { RejectReportModal } from './reject-report-modal'
import { type Report } from '@/hooks/api/report'

interface DataTableRowActionsProps {
    row: Row<Report>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const report = row.original
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['reportDetail', 'rejectReport'] as const)

    const handleOpenDetail = () => {
        handlePopUpOpen('reportDetail')
    }

    const handleCloseDetail = () => {
        handlePopUpClose('reportDetail')
    }

    const handleOpenReject = () => {
        handlePopUpOpen('rejectReport', report)
        handlePopUpClose('reportDetail')
    }

    const handleCloseReject = () => {
        handlePopUpClose('rejectReport')
    }

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => handleOpenDetail()}>
                <Eye />
            </Button>

            <ReportDetailModal
                isOpen={popUp.reportDetail.isOpen}
                onClose={handleCloseDetail}
                report={report}
                onReject={handleOpenReject}
            />

            <RejectReportModal
                isOpen={popUp.rejectReport.isOpen}
                onClose={handleCloseReject}
                report={popUp.rejectReport.data as Report}
            />
        </>
    )
}

