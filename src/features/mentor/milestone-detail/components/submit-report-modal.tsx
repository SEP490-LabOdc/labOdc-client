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
import { UploadCloud } from 'lucide-react'

interface SubmitReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string, files: any[]) => void
  versionNumber: number
  lastFeedback?: string
}

export const SubmitReportModal: React.FC<SubmitReportModalProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      onSubmit,
                                                                      versionNumber,
                                                                      lastFeedback
                                                                    }) => {
  const [content, setContent] = useState('')
  // Giả lập state cho files, thực tế sẽ phức tạp hơn
  const [files, setFiles] = useState<any[]>([])

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, files)
      setContent('')
      setFiles([])
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
          {/* Hiển thị feedback gần nhất nếu có */}
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
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer">
            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Kéo thả file báo cáo (PDF, Docx, Zip) hoặc <span className="text-indigo-600 font-semibold">Click để tải lên</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Hỗ trợ tối đa 50MB</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Hủy bỏ</Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            Nộp Báo cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}