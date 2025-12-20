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
import { Plus, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCreateSystemConfig } from '@/hooks/api/system-config'
import { cn } from '@/lib/utils'

interface CreateConfigDialogProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

interface PropertyPair {
    id: string
    key: string
    value: string
}

export function CreateConfigDialog({
    isOpen,
    onClose,
    onSuccess,
}: CreateConfigDialogProps) {
    const createMutation = useCreateSystemConfig()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    const [properties, setProperties] = useState<PropertyPair[]>([
        { id: '1', key: '', value: '' },
    ])

    const handleFormChange = (field: 'name' | 'description', value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleAddProperty = () => {
        setProperties((prev) => [
            ...prev,
            { id: Date.now().toString(), key: '', value: '' },
        ])
    }

    const handleRemoveProperty = (id: string) => {
        if (properties.length > 1) {
            setProperties((prev) => prev.filter((p) => p.id !== id))
        } else {
            toast.error('Phải có ít nhất một property')
        }
    }

    const handlePropertyChange = (id: string, field: 'key' | 'value', value: string) => {
        setProperties((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate
        if (!formData.name.trim()) {
            toast.error('Vui lòng nhập tên cấu hình')
            return
        }

        if (!formData.description.trim()) {
            toast.error('Vui lòng nhập mô tả')
            return
        }

        // Build properties object from key-value pairs
        const propertiesObj: Record<string, any> = {}
        const duplicateKeys: string[] = []

        for (const prop of properties) {
            const key = prop.key.trim()
            const value = prop.value.trim()

            if (!key) {
                toast.error('Tất cả các key phải được điền')
                return
            }

            if (key in propertiesObj) {
                duplicateKeys.push(key)
            } else {
                // Try to parse value as number or boolean, otherwise keep as string
                let parsedValue: any = value

                if (value === '') {
                    // Empty string stays as empty string
                    parsedValue = ''
                } else if (value === 'true') {
                    parsedValue = true
                } else if (value === 'false') {
                    parsedValue = false
                } else if (value === 'null') {
                    parsedValue = null
                } else if (!isNaN(Number(value)) && value !== '') {
                    parsedValue = Number(value)
                } else {
                    // Try to parse as JSON
                    try {
                        parsedValue = JSON.parse(value)
                    } catch {
                        // Keep as string if not valid JSON
                        parsedValue = value
                    }
                }
                propertiesObj[key] = parsedValue
            }
        }

        if (duplicateKeys.length > 0) {
            toast.error(`Các key sau bị trùng: ${duplicateKeys.join(', ')}`)
            return
        }

        try {
            await createMutation.mutateAsync({
                name: formData.name.trim(),
                description: formData.description.trim(),
                properties: propertiesObj,
            })
            toast.success('Tạo cấu hình thành công!')

            // Reset form
            setFormData({
                name: '',
                description: '',
            })
            setProperties([{ id: '1', key: '', value: '' }])

            onSuccess?.()
            onClose()
        } catch (error: any) {
            toast.error(error?.message || 'Tạo cấu hình thất bại')
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
        })
        setProperties([{ id: '1', key: '', value: '' }])
        onClose()
    }

    const isValid = formData.name.trim() && formData.description.trim() &&
        properties.every(p => p.key.trim())

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-[#2a9d8f]" />
                        Tạo cấu hình mới
                    </DialogTitle>
                    <DialogDescription>
                        Tạo một cấu hình hệ thống mới. Nhập tên, mô tả và các properties dưới dạng key-value.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Tên cấu hình <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleFormChange('name', e.target.value)}
                            placeholder="Ví dụ: fee-distribution, email-config, etc."
                            disabled={createMutation.isPending}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Mô tả <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleFormChange('description', e.target.value)}
                            placeholder="Mô tả về cấu hình này..."
                            rows={3}
                            disabled={createMutation.isPending}
                            required
                        />
                    </div>

                    {/* Properties Key-Value Pairs */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>
                                Properties <span className="text-red-500">*</span>
                            </Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddProperty}
                                disabled={createMutation.isPending}
                                className="h-8"
                            >
                                <Plus className="h-3 w-3 mr-1" />
                                Thêm property
                            </Button>
                        </div>

                        <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
                            {properties.map((prop) => (
                                <div
                                    key={prop.id}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <div>
                                            <Input
                                                placeholder="Key"
                                                value={prop.key}
                                                onChange={(e) =>
                                                    handlePropertyChange(prop.id, 'key', e.target.value)
                                                }
                                                disabled={createMutation.isPending}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder="Value"
                                                value={prop.value}
                                                onChange={(e) =>
                                                    handlePropertyChange(prop.id, 'value', e.target.value)
                                                }
                                                disabled={createMutation.isPending}
                                                className="font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveProperty(prop.id)}
                                        disabled={createMutation.isPending || properties.length === 1}
                                        className={cn(
                                            "h-9 w-9 p-0",
                                            properties.length === 1 && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Value sẽ tự động được parse: số, boolean (true/false), null, hoặc JSON. Nếu không hợp lệ, sẽ được giữ nguyên dạng string.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={createMutation.isPending}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || createMutation.isPending}
                            className="bg-[#2a9d8f] hover:bg-[#1e7a6e]"
                        >
                            {createMutation.isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Đang tạo...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tạo cấu hình
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

