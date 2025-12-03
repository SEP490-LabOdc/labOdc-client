import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

type ReportStatus = 'SUBMITTED' | 'CHANGES_REQUESTED' | 'APPROVED';

interface ReportVersion {
  id: string;
  version: number;
  submittedAt: string;
  submittedBy: string;
  content: string;
  files: { name: string; size: string }[];
  status: ReportStatus;
  feedback?: string;
}

interface ReportDetailModalProps {
  isOpen: boolean
  onClose: () => void
  report: ReportVersion | null
  isCompany: boolean
  isLatest: boolean
  onApprove: () => void
  onRequestChanges: () => void
}

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case 'SUBMITTED': return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Đang chờ duyệt</Badge>;
    case 'CHANGES_REQUESTED': return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Yêu cầu sửa</Badge>;
    case 'APPROVED': return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Đã nghiệm thu</Badge>;
    default: return null;
  }
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      report,
                                                                      isCompany,
                                                                      isLatest,
                                                                      onApprove,
                                                                      onRequestChanges
                                                                    }) => {
  const { mutateAsync: reviewReport, isPending } = useReviewReport()

  const handleApprove = async () => {
    if (!report) return

    try {
      await reviewReport({
        reportId: report.id,
        status: 'APPROVED'
      })
      toast.success('Phê duyệt báo cáo thành công')
      onApprove()
    } catch (error) {
      toast.error('Phê duyệt báo cáo thất bại')
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
              <DialogTitle>Chi tiết Phiên bản {report.version}</DialogTitle>
              <DialogDescription className="mt-1">
                Người nộp: {report.submittedBy} • {report.submittedAt}
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
              {report.files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </div>

          {report.feedback && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-orange-800 mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Phản hồi từ Doanh nghiệp:
              </h4>
              <p className="text-sm text-orange-700 italic">"{report.feedback}"</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {isCompany && report.status === 'SUBMITTED' && isLatest ? (
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
                    <><CheckCircle className="w-4 h-4 mr-2" /> Phê duyệt & Trả tiền</>
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
