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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { FileUpload } from '@/components/file/FileUpload'
import { useCreateSystemTemplate } from '@/hooks/api/system-templates'
import { toast } from 'sonner'
import { TEMPLATE_TYPES, TEMPLATE_TYPE_LABELS } from '../index'
import { TEMPLATE_CATEGORIES, TEMPLATE_CATEGORY_LABELS } from '../index'

interface CreateTemplateModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export function CreateTemplateModal({
    isOpen,
    onClose,
    onSuccess,
}: CreateTemplateModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        type: '',
        description: '',
        fileUrl: '',
        fileName: '',
    })

    const createMutation = useCreateSystemTemplate()

    const handleCreate = async () => {
        if (!formData.name || !formData.category || !formData.type || !formData.fileUrl || !formData.fileName) {
            toast.error('Vui lòng điền đầy đủ thông tin')
            return
        }

        const payload = {
            name: formData.name,
            category: formData.category,
            type: formData.type,
            fileUrl: formData.fileUrl,
            fileName: formData.fileName,
            description: formData.description,
        }

        try {
            await createMutation.mutateAsync(payload)
            toast.success('Tạo template thành công')
            onClose()
            setFormData({
                name: '',
                category: '',
                type: '',
                description: '',
                fileUrl: '',
                fileName: '',
            })
            onSuccess?.()
        } catch (error) {
            toast.error('Tạo template thất bại')
        }
    }

    const handleClose = () => {
        if (!createMutation.isPending) {
            onClose()
            setFormData({
                name: '',
                category: '',
                type: '',
                description: '',
                fileUrl: '',
                fileName: '',
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Tạo Template Mới</DialogTitle>
                    <DialogDescription>
                        Tạo template mới cho hệ thống. Chỉ lab-admin mới có quyền tạo template.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>
                            Tên Template <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Nhập tên template"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.category || undefined}
                            onValueChange={(value) =>
                                setFormData({ ...formData, category: value })
                            }
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Chọn category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {TEMPLATE_CATEGORY_LABELS[value]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Loại Template <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.type || undefined}
                            onValueChange={(value) =>
                                setFormData({ ...formData, type: value })
                            }
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Chọn loại template" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(TEMPLATE_TYPES).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>
                                        {TEMPLATE_TYPE_LABELS[value]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Mô tả</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Nhập mô tả template"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>
                            File Template <span className="text-red-500">*</span>
                        </Label>
                        <FileUpload
                            value={formData.fileUrl || null}
                            onChange={(url) => {
                                setFormData((prev) => ({ ...prev, fileUrl: url || '' }))
                            }}
                            onFileUploaded={(fileName) => {
                                setFormData((prev) => ({ ...prev, fileName }))
                            }}
                            existingFileName={formData.fileName}
                            accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf"
                            maxSize={10}
                            placeholder="Chọn file template để tải lên"
                        />
                        {formData.fileUrl && (
                            <p className="text-xs text-gray-500 mt-1">
                                File URL: {formData.fileUrl}
                            </p>
                        )}
                        {formData.fileName && (
                            <p className="text-xs text-gray-500">
                                File Name: {formData.fileName}
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={createMutation.isPending}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={
                            createMutation.isPending
                        }
                        className="bg-[#264653] hover:bg-[#1e353d]"
                    >
                        {createMutation.isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Đang tạo...
                            </>
                        ) : (
                            'Tạo Template'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

