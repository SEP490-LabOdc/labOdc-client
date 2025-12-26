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
import { FileText, CheckCircle, XCircle, AlertTriangle, DollarSign, Download, Loader2 } from 'lucide-react'
import { useReviewReport } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { getReportTypeLabel, getStatusBadge } from '@/helpers/report'
import { ReportStatus, type Report } from '@/hooks/api/report'
import { formatDateOnly } from '@/helpers/datetime'

interface ReportDetailModalProps {
  isOpen: boolean
  onClose: () => void
  report: Report | null
  isCompany: boolean
  onApprove: () => void
  onRequestChanges: () => void
  milestoneId: string
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  isOpen,
  onClose,
  report,
  isCompany,
  onApprove,
  onRequestChanges,
  milestoneId
}) => {

  const { mutateAsync: reviewReport, isPending } = useReviewReport()

  const handleApprove = async () => {
    if (!report) return

    try {
      await reviewReport({
        reportId: report.id,
        status: 'APPROVED',
        milestoneId: milestoneId
      })
      toast.success('Phê duyệt báo cáo thành công')
      onApprove()
    } catch (error) {
      console.error(error)
    }
  }

  if (!report) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start pr-6">
            <div>
              <DialogTitle>Chi tiết Báo cáo</DialogTitle>
              <DialogDescription className="mt-1">
                <span className="font-medium">{getReportTypeLabel(report.reportType)}</span> • Người nộp: {report.reporterName} • {formatDateOnly(report.createdAt)}
              </DialogDescription>
            </div>
            {getStatusBadge(report.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Mô tả công việc:</h4>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap border">
              {report.content}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Tài liệu đính kèm:</h4>
            <div className="space-y-2">
              {report.attachmentsUrl.map((attachmentUrl: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{attachmentUrl}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </div>

          {report.feedback && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-md">
              <h4 className="text-sm font-bold text-orange-800 mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Phản hồi từ Doanh nghiệp:
              </h4>
              <p className="text-sm text-orange-700 italic">"{report.feedback}"</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {isCompany && report.status === ReportStatus.PENDING_COMPANY_REVIEW ? (
            <div className="w-full space-y-4">
              <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200 flex items-start gap-2">
                <DollarSign className="w-4 h-4 mt-0.5" />
                <div>
                  <strong>Lưu ý tài chính:</strong> Nhấn "Phê duyệt" sẽ tự động giải ngân tiền từ Escrow cho phiên bản này.
                </div>
              </div>
              <div className="flex justify-end gap-2 w-full">
                <Button variant="outline" onClick={onClose} disabled={isPending}>Đóng</Button>
                <Button
                  variant="destructive"
                  onClick={onRequestChanges}
                  disabled={isPending}
                >
                  <XCircle className="w-4 h-4 mr-2" /> Yêu cầu sửa
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleApprove}
                  disabled={isPending}
                >
                  {isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...</>
                  ) : (
                    <><CheckCircle className="w-4 h-4 mr-2" />Phê duyệt</>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">Đóng</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
