import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FileUpload } from '@/components/file/FileUpload'
import { useCreateMilestoneDocument } from '@/hooks/api/projects/mutation'
import { toast } from 'sonner'
import { Loader2, FileText } from 'lucide-react'

interface CreateDocumentModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    milestoneId: string
}

export const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    milestoneId
}) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>('')

    const { mutateAsync: createDocument, isPending } = useCreateMilestoneDocument()

    const handleFileUploaded = (uploadedFileName: string) => {
        setFileName(uploadedFileName)
    }

    const handleSubmit = async () => {
        if (!fileUrl) {
            toast.error('Vui lòng chọn file để tải lên')
            return
        }

        // Get fileName from fileUrl if not set yet
        const finalFileName = fileName || fileUrl.split('/').pop() || 'document'

        try {
            await createDocument({
                milestoneId,
                attachmentsUrl: [
                    {
                        name: finalFileName,
                        fileName: finalFileName,
                        url: fileUrl
                    }
                ]
            })

            toast.success('Tạo tài liệu thành công')
            setFileUrl(null)
            setFileName('')
            onSuccess()
            onClose()
        } catch (error) {
            toast.error('Tạo tài liệu thất bại')
            console.error(error)
        }
    }

    const handleClose = () => {
        if (!isPending) {
            setFileUrl(null)
            setFileName('')
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#2a9d8f]" />
                        Tạo Tài liệu Mới
                    </DialogTitle>
                    <DialogDescription>
                        Tải lên tài liệu cho milestone này. Bạn có thể tải lên file PDF, Word, hoặc các định dạng khác.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Tài liệu <span className="text-red-500">*</span>
                        </label>
                        <FileUpload
                            value={fileUrl}
                            onChange={setFileUrl}
                            onFileUploaded={handleFileUploaded}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                            maxSize={50}
                            placeholder="Chọn file để tải lên"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={handleClose} disabled={isPending}>
                        Hủy bỏ
                    </Button>
                    <Button
                        className="bg-[#2a9d8f] hover:bg-[#2a9d8f]/90"
                        onClick={handleSubmit}
                        disabled={!fileUrl || isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Đang tạo...
                            </>
                        ) : (
                            'Tạo Tài liệu'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

