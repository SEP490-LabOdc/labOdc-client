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
import { AlertTriangle } from 'lucide-react'

interface RejectReportModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

export const RejectReportModal: React.FC<RejectReportModalProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      onConfirm
                                                                    }) => {
  const [feedbackInput, setFeedbackInput] = useState('')

  const handleConfirm = () => {
    if (feedbackInput.trim()) {
      onConfirm(feedbackInput)
      setFeedbackInput('') // Reset sau khi gửi
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
          />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Hủy bỏ</Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!feedbackInput.trim()}
          >
            Gửi Yêu cầu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}