import React, { useState } from 'react'
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
import { useApproveReport, useRejectReport, ReportStatus } from '@/hooks/api/report'
import { toast } from 'sonner'
import { getReportTypeLabel, getStatusBadge } from '@/helpers/report'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { type Report } from '../data/schema'

interface ReportDetailModalProps {
    isOpen: boolean
    onClose: () => void
    report: Report
    actionMode?: 'approve' | 'reject' | null
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
    isOpen,
    onClose,
    report,
    actionMode: initialActionMode = null,
}) => {
    const [actionMode, setActionMode] = useState<'approve' | 'reject' | null>(initialActionMode)
    const [feedback, setFeedback] = useState('')

    const approveMutation = useApproveReport()
    const rejectMutation = useRejectReport()

    const handleApprove = async () => {
        try {
            await approveMutation.mutateAsync({
                reportId: report.id,
                milestoneId: report.milestoneId,
                feedback: feedback || undefined,
            })
            toast.success('Duyệt báo cáo thành công')
            onClose()
            setFeedback('')
            setActionMode(null)
        } catch (error) {
            toast.error('Duyệt báo cáo thất bại')
            console.error(error)
        }
    }

    const handleReject = async () => {
        if (!feedback.trim()) {
            toast.error('Vui lòng nhập lý do từ chối')
            return
        }

        try {
            await rejectMutation.mutateAsync({
                reportId: report.id,
                milestoneId: report.milestoneId,
                feedback: feedback,
            })
            toast.success('Từ chối báo cáo thành công')
            onClose()
            setFeedback('')
            setActionMode(null)
        } catch (error) {
            toast.error('Từ chối báo cáo thất bại')
            console.error(error)
        }
    }

    const isPending = approveMutation.isPending || rejectMutation.isPending
    const canApprove = report.status === ReportStatus.SUBMITTED || report.status === ReportStatus.PENDING_ADMIN_CHECK
    const canReject = report.status === ReportStatus.SUBMITTED || report.status === ReportStatus.PENDING_ADMIN_CHECK

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
                            <p><strong>Tên cột mốc:</strong> {report.milestoneName}</p>
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
                                        <Button variant="ghost" size="sm">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {report.feedback && (
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                            <h4 className="text-sm font-bold text-orange-800 mb-1">
                                Phản hồi trước đó:
                            </h4>
                            <p className="text-sm text-orange-700 italic">"{report.feedback}"</p>
                        </div>
                    )}

                    {(canApprove || canReject) && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                {canApprove && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setActionMode(actionMode === 'approve' ? null : 'approve')}
                                        className={actionMode === 'approve' ? 'border-green-500 bg-green-50' : ''}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Duyệt báo cáo
                                    </Button>
                                )}
                                {canReject && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setActionMode(actionMode === 'reject' ? null : 'reject')}
                                        className={actionMode === 'reject' ? 'border-red-500 bg-red-50' : ''}
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Từ chối
                                    </Button>
                                )}
                            </div>

                            {actionMode && (
                                <div className="space-y-2">
                                    <Label htmlFor="feedback">
                                        {actionMode === 'approve' ? 'Phản hồi (tùy chọn)' : 'Lý do từ chối *'}
                                    </Label>
                                    <Textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder={
                                            actionMode === 'approve'
                                                ? 'Nhập phản hồi nếu có...'
                                                : 'Nhập lý do từ chối...'
                                        }
                                        className="min-h-[100px]"
                                        disabled={isPending}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto" disabled={isPending}>
                        Đóng
                    </Button>
                    {actionMode === 'approve' && (
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                            onClick={handleApprove}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" /> Xác nhận duyệt
                                </>
                            )}
                        </Button>
                    )}
                    {actionMode === 'reject' && (
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={isPending || !feedback.trim()}
                            className="w-full sm:w-auto"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4 mr-2" /> Xác nhận từ chối
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

