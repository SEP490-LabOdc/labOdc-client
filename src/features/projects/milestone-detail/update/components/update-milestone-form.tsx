import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { useUpdateMilestone } from '@/hooks/api/milestones/mutations'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { toast } from 'sonner'
import { FileUpload } from '@/components/file/FileUpload'
import { getMilestoneStatusBadge } from '@/helpers/milestone'
import type { MilestoneAttachment, MilestoneDetail } from '@/hooks/api/milestones/types'

const updateMilestoneSchema = z.object({
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    description: z.string().min(1, 'Mô tả không được để trống'),
    startDate: z.string().min(1, 'Ngày bắt đầu không được để trống'),
    endDate: z.string().min(1, 'Ngày kết thúc không được để trống'),
    attachments: z.array(z.object({
        id: z.string().optional(),
        name: z.string(),
        fileName: z.string(),
        url: z.string(),
    })).optional(),
}).refine((data) => {
    if (!data.startDate || !data.endDate) return true
    return new Date(data.startDate) < new Date(data.endDate)
}, {
    message: 'Ngày kết thúc phải sau ngày bắt đầu',
    path: ['endDate'],
})

type UpdateMilestoneFormData = z.infer<typeof updateMilestoneSchema>

interface UpdateMilestoneFormProps {
    milestone: MilestoneDetail
    milestoneId: string
    projectId: string
    onSuccess?: () => void
}

export const UpdateMilestoneForm: React.FC<UpdateMilestoneFormProps> = ({
    milestone,
    milestoneId,
    projectId,
    onSuccess,
}) => {
    const navigate = useNavigate()
    const updateMilestone = useUpdateMilestone()

    const form = useForm<UpdateMilestoneFormData>({
        resolver: zodResolver(updateMilestoneSchema),
        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            attachments: [],
        },
    })

    const [attachments, setAttachments] = React.useState<MilestoneAttachment[]>([])

    // Load milestone data into form
    useEffect(() => {
        if (milestone) {
            const startDate = milestone.startDate ? new Date(milestone.startDate).toISOString().split('T')[0] : ''
            const endDate = milestone.endDate ? new Date(milestone.endDate).toISOString().split('T')[0] : ''

            form.reset({
                title: milestone.title || '',
                description: milestone.description || '',
                startDate: startDate,
                endDate: endDate,
                attachments: milestone.attachments || [],
            })

            setAttachments(milestone.attachments || [])
        }
    }, [milestone, form])

    const handleFileUploaded = (url: string, fileName: string) => {
        const newAttachment: MilestoneAttachment = {
            id: '',
            name: fileName,
            fileName: fileName,
            url: url,
        }
        setAttachments(prev => [...prev, newAttachment])
    }

    const handleRemoveAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index))
    }

    const handleCancel = () => {
        const basePath = '/projects' // Adjust based on your routing structure
        navigate({
            to: `${basePath}/${projectId}/${milestoneId}`,
            params: { projectId, milestoneId },
        })
    }

    const onSubmit = async (data: UpdateMilestoneFormData) => {
        try {
            await updateMilestone.mutateAsync({
                milestoneId: milestoneId,
                payload: {
                    title: data.title,
                    description: data.description,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    status: milestone.status as any, // Giữ nguyên status hiện tại, không cho update
                    attachments: attachments,
                },
            })
            toast.success('Cập nhật milestone thành công')
            onSuccess?.()

            // Navigate back to milestone detail
            const basePath = '/projects' // Adjust based on your routing structure
            navigate({
                to: `${basePath}/${projectId}/${milestoneId}`,
                params: { projectId, milestoneId },
            })
        } catch (error) {
            console.error(error)
            toast.error('Cập nhật milestone thất bại')
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle>Thông tin Milestone</CardTitle>
                    {getMilestoneStatusBadge(milestone.status)}
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tiêu đề</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tiêu đề milestone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Nhập mô tả chi tiết"
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngày bắt đầu</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngày kết thúc dự kiến</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormLabel>Tệp đính kèm</FormLabel>
                            <FileUpload
                                value={null}
                                onChange={(url) => {
                                    if (url) {
                                        const fileName = url.split('/').pop() || 'attachment'
                                        handleFileUploaded(url, fileName)
                                    }
                                }}
                                placeholder="Chọn file để tải lên"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            />

                            {attachments.length > 0 && (
                                <div className="space-y-2 mt-4">
                                    <p className="text-sm font-medium text-gray-700">Danh sách tệp đính kèm:</p>
                                    {attachments.map((attachment, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm font-medium">{attachment.name}</p>
                                                    <p className="text-xs text-gray-400">{attachment.fileName}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveAttachment(index)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={updateMilestone.isPending}
                            >
                                {updateMilestone.isPending ? 'Đang cập nhật...' : 'Cập nhật Milestone'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
