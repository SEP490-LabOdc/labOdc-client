import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FileText, Download, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { usePublishReportToCompany, type Report } from '@/hooks/api/report'
import { toast } from 'sonner'
import { getReportTypeLabel, getStatusBadge } from '@/helpers/report'
import { downloadFileFromUrl } from '@/helpers/download'

interface ReportDetailModalProps {
    isOpen: boolean
    onClose: () => void
    report: Report
    onReject?: () => void
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
    isOpen,
    onClose,
    report,
    onReject,
}) => {

    const publishMutation = usePublishReportToCompany()

    const handlePublish = async () => {
        if (!report.userCompanyId) {
            toast.error('Không tìm thấy thông tin công ty')
            return
        }
        try {
            await publishMutation.mutateAsync({
                reportId: report.id,
                userCompanyId: report.userCompanyId,
            })
            toast.success('Đã gửi báo cáo đến công ty')
            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    const isPending = publishMutation.isPending

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-between items-start pr-6">
                        <div>
                            <DialogTitle>Chi tiết Báo cáo</DialogTitle>
                            <DialogDescription className="mt-1">
                                <span className="font-medium">{getReportTypeLabel(report.reportType)}</span>
                                {' • '}
                                Người nộp: {report.reporterName}
                                {' • '}
                                {new Date(report.createdAt).toLocaleString('vi-VN')}
                            </DialogDescription>
                        </div>
                        {getStatusBadge(report.status)}
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Thông tin dự án:</h4>
                        <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2">
                            <p><strong>Tên dự án:</strong> {report.projectName}</p>
                            <p><strong>Tên cột mốc:</strong> {report.milestoneTitle}</p>
                            <p><strong>Tên công ty:</strong> {report.companyName || '-'}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Mô tả công việc:</h4>
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap border">
                            {report.content}
                        </div>
                    </div>

                    {report.attachmentsUrl && report.attachmentsUrl.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Tài liệu đính kèm:</h4>
                            <div className="space-y-2">
                                {report.attachmentsUrl.map((url, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-8 h-8 text-blue-500" />
                                            <div>
                                                <p className="text-sm font-medium">{url.split('/').pop() || 'file'}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => downloadFileFromUrl(url)}
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex flex-col gap-2">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={handlePublish}
                        disabled={isPending || !report.userCompanyId}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" /> Gửi báo cáo đến công ty
                            </>
                        )}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onReject}
                        disabled={isPending}
                    >
                        <XCircle className="w-4 h-4 mr-2" /> Từ chối
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={isPending}>
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

