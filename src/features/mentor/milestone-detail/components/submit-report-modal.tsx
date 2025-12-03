import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FileUpload } from '@/components/file/FileUpload'
import { useCreateReport } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'

interface SubmitReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  versionNumber: number
  lastFeedback?: string
  projectId: string
  milestoneId: string
}

export const SubmitReportModal: React.FC<SubmitReportModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  versionNumber,
  lastFeedback,
  projectId,
  milestoneId
}) => {
  const [content, setContent] = useState('')
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)

  const { mutateAsync: createReport, isPending } = useCreateReport()

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Vui lòng nhập nội dung báo cáo')
      return
    }

    try {
      await createReport({
        projectId,
        milestoneId,
        reportType: 'MILESTONE',
        content: content.trim(),
        attachmentsUrl: attachmentUrl ? [attachmentUrl] : []
      })

      toast.success('Nộp báo cáo thành công')
      setContent('')
      setAttachmentUrl(null)
      onSuccess()
      onClose()
    } catch (error) {
      toast.error('Nộp báo cáo thất bại')
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nộp Báo cáo Mới (Phiên bản {versionNumber})</DialogTitle>
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
            <label className="text-sm font-medium">Nội dung báo cáo / Cập nhật</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả các công việc đã hoàn thành, các thay đổi so với phiên bản trước..."
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
            className="bg-indigo-600 hover:bg-indigo-700"
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
