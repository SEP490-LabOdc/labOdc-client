import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PROJECT_STATUS, PROJECT_STATUS_LABEL } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

/* -------------------- SCHEMA -------------------- */
const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    budget: z.string(),
    skills: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
        })
    ),
})

export type ProjectFormData = z.infer<typeof projectSchema>

/* -------------------- COMPONENT -------------------- */
export default function ProjectForm({
    initialData,
}: {
    initialData: ProjectFormData
}) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData,
    })

    // === STATE CHO DIALOG PHÊ DUYỆT ===
    const [approveDialogOpen, setApproveDialogOpen] = useState(false)
    const [mentor1, setMentor1] = useState('')
    const [mentor2, setMentor2] = useState('')
    const [loadingAction, setLoadingAction] = useState(false)

    // === STATE CHO DIALOG YÊU CẦU CẬP NHẬT ===
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [requestNote, setRequestNote] = useState('')
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    const mentors = [
        { id: 'm1', name: 'Nguyễn Văn A' },
        { id: 'm2', name: 'Trần Thị B' },
        { id: 'm3', name: 'Lê Văn C' },
        { id: 'm4', name: 'Phạm Thị D' },
    ]

    // --- PHÊ DUYỆT ---
    const handleApprove = () => {
        setLoadingAction(true)
        setTimeout(() => {
            console.log('✅ Mentors đã chọn:', [mentor1, mentor2].filter(Boolean))
            setLoadingAction(false)
            setApproveDialogOpen(false)
        }, 1000)
    }

    // --- YÊU CẦU CẬP NHẬT ---
    const handleSendUpdate = () => {
        setLoadingUpdate(true)
        setTimeout(() => {
            console.log('📝 Gửi yêu cầu cập nhật:', requestNote)
            setLoadingUpdate(false)
            setUpdateDialogOpen(false)
            setRequestNote('')
        }, 1000)
    }

    if (!initialData) return null

    const canApprove = mentor1 !== '' || mentor2 !== ''

    return (
        <>
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ===== CỘT TRÁI ===== */}
                    <div className="space-y-4 px-6">
                        {/* Tên dự án */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Tên dự án
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        {/* Ngân sách */}
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Ngân sách
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input
                                                {...field}
                                                disabled
                                                value={`${Number(initialData.budget).toLocaleString('vi-VN')} VNĐ`}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ===== CỘT PHẢI ===== */}
                    <div className="space-y-4 px-6">
                        {/* Trạng thái */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => {
                                const statusLabel =
                                    PROJECT_STATUS_LABEL[field.value as keyof typeof PROJECT_STATUS_LABEL] ||
                                    'Không xác định'

                                return (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <FormLabel className="w-40 text-end text-base font-medium">
                                                Trạng thái
                                            </FormLabel>
                                            <FormControl className="flex-1">
                                                <Input value={statusLabel} disabled />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="ml-40" />
                                    </FormItem>
                                )
                            }}
                        />

                        {/* Ngày bắt đầu */}
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Ngày bắt đầu
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input
                                                value={new Date(field.value).toLocaleDateString('vi-VN')}
                                                disabled
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        {/* Ngày kết thúc */}
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Ngày kết thúc
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input
                                                value={new Date(field.value).toLocaleDateString('vi-VN')}
                                                disabled
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ===== MÔ TẢ ===== */}
                    <div className="space-y-4 px-12 md:col-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-20 text-end text-base font-medium">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Textarea rows={8} {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ===== KỸ NĂNG ===== */}
                    <div className="col-span-2 px-6 space-y-3">
                        <FormLabel className="block text-base font-medium text-center">
                            Kỹ năng yêu cầu
                        </FormLabel>
                        {initialData.skills && initialData.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {initialData.skills.map((skill) => (
                                    <Badge
                                        key={skill.id}
                                        variant="secondary"
                                        className="text-sm px-3 py-1"
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic text-center">
                                Không có kỹ năng nào
                            </p>
                        )}
                    </div>
                    {/* ===== DIALOG PHÊ DUYỆT ===== */}
                    <ConfirmDialog
                        open={approveDialogOpen}
                        onOpenChange={setApproveDialogOpen}
                        title="Chọn mentor cho dự án"
                        desc="Hãy chọn 1 hoặc 2 mentor để phụ trách dự án này."
                        cancelBtnText="Hủy"
                        confirmText={
                            loadingAction ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang phê duyệt...
                                </>
                            ) : (
                                'Phê duyệt'
                            )
                        }
                        handleConfirm={handleApprove}
                        disabled={!canApprove}
                    >
                        <div className="space-y-5">
                            <FormItem className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <FormLabel className="text-sm font-medium w-20">Mentor 1</FormLabel>
                                    <FormControl className="flex-1">
                                        <Select value={mentor1} onValueChange={setMentor1}>
                                            <SelectTrigger className="mt-1 w-70">
                                                <SelectValue placeholder="Chọn mentor thứ nhất" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mentors.map((m) => (
                                                    <SelectItem key={m.id} value={m.id}>
                                                        {m.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className="ml-40" />
                            </FormItem>

                            <FormItem className="space-y-1 pb-2">
                                <div className="flex items-center gap-3">
                                    <FormLabel className="text-sm font-medium w-20">Mentor 2</FormLabel>
                                    <FormControl className="flex-1">
                                        <Select value={mentor2} onValueChange={setMentor2}>
                                            <SelectTrigger className="mt-1 w-70">
                                                <SelectValue placeholder="Chọn mentor thứ hai" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mentors.map((m) => (
                                                    <SelectItem key={m.id} value={m.id}>
                                                        {m.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className="ml-40" />
                            </FormItem>
                        </div>
                    </ConfirmDialog>

                    {/* ===== DIALOG YÊU CẦU CẬP NHẬT ===== */}
                    <ConfirmDialog
                        open={updateDialogOpen}
                        onOpenChange={setUpdateDialogOpen}
                        title="Yêu cầu cập nhật thông tin"
                        desc="Hãy nhập ghi chú gửi đến doanh nghiệp để họ biết cần cập nhật gì."
                        cancelBtnText="Hủy"
                        confirmText={
                            loadingUpdate ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                'Gửi yêu cầu'
                            )
                        }
                        handleConfirm={handleSendUpdate}
                        disabled={!requestNote.trim()}
                    >
                        <div className="space-y-3">
                            <FormLabel className="text-sm font-medium" htmlFor="request-note">
                                Ghi chú
                            </FormLabel>
                            <Textarea
                                id="request-note"
                                placeholder="Nhập ghi chú cho doanh nghiệp..."
                                rows={5}
                                value={requestNote}
                                onChange={(e) => setRequestNote(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground italic">
                                Khi bạn nhấn <span className="font-medium">"Gửi yêu cầu"</span>, hệ thống sẽ
                                gửi thông báo đến người liên hệ của doanh nghiệp.
                            </p>
                        </div>
                    </ConfirmDialog>
                </form>
            </Form>

            {
                initialData.status == PROJECT_STATUS.COMPANY_UPDATE_REQUEST ? (
                    <p className="text-sm text-muted-foreground italic mt-2 text-center">
                        Công ty đang trong quá trình cập nhật thông tin — bạn không thể chỉnh sửa hoặc phê duyệt lúc này.
                    </p>
                ) : (
                    <div className="pt-3 md:col-span-2 flex gap-3">
                        <Button type="button" onClick={() => setApproveDialogOpen(true)}>
                            Phê duyệt
                        </Button>
                        <Button type="button" onClick={() => setUpdateDialogOpen(true)}>
                            Yêu cầu cập nhật
                        </Button>
                    </div>
                )
            }

        </>
    )
}
