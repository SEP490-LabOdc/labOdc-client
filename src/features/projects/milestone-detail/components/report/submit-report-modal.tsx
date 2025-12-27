import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileUpload } from '@/components/file/FileUpload'
import { toast } from 'sonner'
import { getReportTypeLabel } from '@/helpers/report'
import { ReportType, useCreateReportForLabAdmin } from '@/hooks/api/report'

interface SubmitReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  lastFeedback?: string
  projectId: string
  milestoneId: string
}

export const SubmitReportModal: React.FC<SubmitReportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lastFeedback,
  projectId,
  milestoneId,
}) => {
  const [reportType, setReportType] = useState<ReportType>(ReportType.MILESTONE_REPORT)
  const [content, setContent] = useState('')
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)

  const { mutateAsync: createReportForLabAdmin, isPending } = useCreateReportForLabAdmin()

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Vui lòng nhập nội dung báo cáo')
      return
    }

    if (!reportType) {
      toast.error('Vui lòng chọn loại báo cáo')
      return
    }

    try {
      await createReportForLabAdmin({
        projectId,
        milestoneId,
        reportType,
        content: content.trim(),
        attachmentsUrl: attachmentUrl ? [attachmentUrl] : [],
      })

      toast.success('Nộp báo cáo thành công')
      setContent('')
      setAttachmentUrl(null)
      setReportType(ReportType.MILESTONE_REPORT)
      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nộp Báo cáo Mới</DialogTitle>
          <DialogDescription>
            Vui lòng điền thông tin chi tiết và tải lên các tài liệu cần thiết để nghiệm thu.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {lastFeedback && (
            <div className="bg-orange-50 p-4 rounded-md border border-orange-200 text-sm">
              <strong>Feedback cần khắc phục:</strong> "{lastFeedback}"
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Loại báo cáo <span className="text-red-500">*</span></label>
            <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)} disabled={isPending}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Chọn loại báo cáo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ReportType.DAILY_REPORT}>{getReportTypeLabel(ReportType.DAILY_REPORT)}</SelectItem>
                <SelectItem value={ReportType.WEEKLY_REPORT}>{getReportTypeLabel(ReportType.WEEKLY_REPORT)}</SelectItem>
                <SelectItem value={ReportType.MILESTONE_REPORT}>{getReportTypeLabel(ReportType.MILESTONE_REPORT)}</SelectItem>
                <SelectItem value={ReportType.DELIVERY_REPORT}>{getReportTypeLabel(ReportType.DELIVERY_REPORT)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="space-y-2">
            <label className="text-sm font-medium">
              Người nhận báo cáo <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedRecipientId}
              onValueChange={setSelectedRecipientId}
              disabled={isPending || recipients.length === 0}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={recipients.length === 0 ? "Không có người nhận" : "Chọn người nhận"} />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.roleName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {recipients.length === 0 && (
              <p className="text-xs text-gray-500">Không có người nhận nào được cấu hình cho milestone này</p>
            )}
          </div> */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Nội dung báo cáo / Cập nhật</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả các công việc đã hoàn thành..."
              className="min-h-[120px]"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tài liệu đính kèm</label>
            <FileUpload
              value={attachmentUrl}
              onChange={setAttachmentUrl}
              accept=".pdf,.doc,.docx,.zip"
              maxSize={50}
              placeholder="Tải lên tài liệu báo cáo"
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isPending}
          >
            {isPending ? 'Đang nộp...' : 'Nộp Báo cáo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
