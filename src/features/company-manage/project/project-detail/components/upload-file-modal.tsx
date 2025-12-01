import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FileUpload } from '@/components/file/FileUpload'
import { useAddProjectDocuments } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'

interface UploadFileModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  onSuccess?: () => void
}

export function UploadFileModal({
  isOpen,
  onClose,
  projectId,
  onSuccess
}: UploadFileModalProps) {
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const addDocumentMutation = useAddProjectDocuments()

  const handleSubmit = async () => {
    if (!documentUrl || !uploadedFileName) {
      toast.error('Vui lòng tải lên file')
      return
    }

    try {
      await addDocumentMutation.mutateAsync({
        projectId,
        documentName: uploadedFileName,
        documentUrl,
        documentType: getFileExtension(uploadedFileName)
      })

      toast.success('Tải lên tài liệu thành công')
      handleClose()
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error('Tải lên tài liệu thất bại')
    }
  }

  const handleClose = () => {
    setDocumentUrl(null)
    setUploadedFileName('')
    onClose()
  }

  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop()?.toLowerCase() || 'unknown'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tải lên tài liệu</DialogTitle>
          <DialogDescription>
            Thêm tài liệu mới vào dự án
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              File tài liệu <span className="text-red-500">*</span>
            </Label>
            <FileUpload
              value={documentUrl}
              onChange={setDocumentUrl}
              onFileUploaded={setUploadedFileName}
              existingFileName={uploadedFileName}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
              maxSize={10}
              placeholder="Chọn file để tải lên"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={addDocumentMutation.isPending}>
              Hủy
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={addDocumentMutation.isPending || !documentUrl || !uploadedFileName}
          >
            {addDocumentMutation.isPending ? 'Đang tải lên...' : 'Tải lên'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
