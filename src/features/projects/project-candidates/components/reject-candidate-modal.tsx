import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface RejectCandidateModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (note: string) => void
  candidateName: string
}

export function RejectCandidateModal({
                                       isOpen,
                                       onClose,
                                       onConfirm,
                                       candidateName,
                                     }: RejectCandidateModalProps) {
  const [note, setNote] = useState('')

  const handleConfirm = () => {
    if (note.trim()) {
      onConfirm(note)
      setNote('')
      onClose()
    }
  }

  const handleClose = () => {
    setNote('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Từ chối ứng viên</DialogTitle>
          <DialogDescription>
            Vui lòng nhập lý do từ chối ứng viên <span className="font-semibold">{candidateName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reject-note">
              Lý do từ chối <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reject-note"
              placeholder="Nhập lý do từ chối (tối thiểu 10 ký tự)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-gray-500">
              {note.length}/500 ký tự
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={note.trim().length < 10}
          >
            <X className="mr-2 h-4 w-4" />
            Từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
