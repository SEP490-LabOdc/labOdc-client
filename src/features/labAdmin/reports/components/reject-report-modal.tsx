import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { XCircle, Loader2 } from 'lucide-react'
import { ReportStatus, useReviewReportForLabAdmin, type Report } from '@/hooks/api/report'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { usePopUp } from '@/hooks/usePopUp'

interface RejectReportModalProps {
    isOpen: boolean
    onClose: () => void
    report: Report
}

export const RejectReportModal: React.FC<RejectReportModalProps> = ({ isOpen, onClose, report }) => {
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['confirmDialog'] as const)
    const [feedback, setFeedback] = useState('')

    const rejectMutation = useReviewReportForLabAdmin()

    useEffect(() => {
        if (!isOpen) {
            setFeedback('')
        }
    }, [isOpen])

    const handleRejectClick = () => {
        if (!feedback.trim()) {
            toast.error('Vui lòng nhập lý do từ chối')
            return
        }
        handlePopUpOpen('confirmDialog')
    }

    const handleConfirmReject = async () => {
        if (!report || !feedback.trim()) {
            return
        }

        try {
            await rejectMutation.mutateAsync({
                reportId: report.id,
                milestoneId: report.milestoneId,
                feedback: feedback,
                status: ReportStatus.LAB_ADMIN_REJECTED,
            })
            toast.success('Từ chối báo cáo thành công')
            handlePopUpClose('confirmDialog')
            onClose()
            setFeedback('')
        } catch (error) {
            toast.error('Từ chối báo cáo thất bại')
            console.error(error)
        }
    }

    const isPending = rejectMutation.isPending

    if (!report) {
        return null
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Từ chối Báo cáo</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập lý do từ chối cho báo cáo này
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Thông tin báo cáo:</h4>
                            <div className="bg-gray-50 p-4 rounded-md text-sm space-y-1">
                                <p><strong>Dự án:</strong> {report.projectName}</p>
                                <p><strong>Cột mốc:</strong> {report.milestoneTitle}</p>
                                <p><strong>Người nộp:</strong> {report.reporterName}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reject-feedback">
                                Lý do từ chối <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="reject-feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Nhập lý do từ chối..."
                                className="min-h-[120px]"
                                disabled={isPending}
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="w-full sm:w-auto"
                            disabled={isPending}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleRejectClick}
                            disabled={isPending || !feedback.trim()}
                            className="w-full sm:w-auto"
                        >
                            <XCircle className="w-4 h-4 mr-2" /> Từ chối báo cáo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={popUp.confirmDialog.isOpen}
                onOpenChange={(open) => !open && handlePopUpClose('confirmDialog')}
                title="Xác nhận từ chối báo cáo"
                desc="Bạn có chắc chắn muốn từ chối báo cáo này? Hành động này không thể hoàn tác."
                confirmText={
                    isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...
                        </>
                    ) : (
                        <>
                            <XCircle className="w-4 h-4 mr-2" /> Xác nhận từ chối
                        </>
                    )
                }
                cancelBtnText="Hủy"
                destructive
                isLoading={isPending}
                handleConfirm={handleConfirmReject}
            />
        </>
    )
}

