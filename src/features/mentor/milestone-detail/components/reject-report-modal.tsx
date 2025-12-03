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
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useReviewReport } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'

interface RejectReportModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  reportId: string
}

export const RejectReportModal: React.FC<RejectReportModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  reportId
}) => {
  const [feedbackInput, setFeedbackInput] = useState('')
  const { mutateAsync: reviewReport, isPending } = useReviewReport()

  const handleConfirm = async () => {
    if (!feedbackInput.trim()) return

    try {
      await reviewReport({
        reportId,
        status: 'REJECTED',
        feedback: feedbackInput.trim()
      })
      toast.success('Đã gửi yêu cầu chỉnh sửa')
      onConfirm(feedbackInput)
      setFeedbackInput('')
    } catch (error) {
      toast.error('Gửi yêu cầu thất bại')
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Yêu cầu Chỉnh sửa
          </DialogTitle>
          <DialogDescription>
            Vui lòng cung cấp lý do cụ thể để đội ngũ phát triển có thể khắc phục vấn đề.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">Lý do từ chối / Feedback:</label>
          <Textarea
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            placeholder="Ví dụ: Giao diện chưa đúng thiết kế, chức năng login bị lỗi..."
            className="min-h-[120px]"
            disabled={isPending}
          />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isPending}>Hủy bỏ</Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!feedbackInput.trim() || isPending}
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang gửi...</>
            ) : (
              'Gửi Yêu cầu'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
