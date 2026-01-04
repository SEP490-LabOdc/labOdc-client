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
import { PROJECT_STATUS } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useLabAdminApproveProject, useUpdateProjectStatus } from '@/hooks/api/projects'
import { AddMemberModal } from './add-member-modal'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MoneyInput } from '@/components/admin/MoneyInput'
import { ReferenceField } from '@/components/admin/ReferenceField'

/* -------------------- SCHEMA -------------------- */
const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    companyId: z.string().optional(),
    companyName: z.string().optional(),
    createdBy: z.string().optional(),
    createdByName: z.string().optional(),
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

    const navigate = useNavigate();
    const updateProjectStatus = useUpdateProjectStatus();

    // === STATE CHO DIALOG PHÊ DUYỆT ===
    const [addMentorOpen, setAddMentorOpen] = useState(false);

    // === STATE CHO DIALOG YÊU CẦU CẬP NHẬT ===
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [requestNote, setRequestNote] = useState('')
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    // --- YÊU CẦU CẬP NHẬT ---
    const handleSendUpdate = async () => {
        setLoadingUpdate(true);

        const updatePromise = updateProjectStatus.mutateAsync({
            projectId: initialData.id,
            status: "UPDATE_REQUIRED",
            notes: requestNote,
        });

        toast.promise(updatePromise, {
            loading: "Đang gửi yêu cầu...",
            success: "Đã gửi yêu cầu cập nhật!",
            error: "Gửi yêu cầu thất bại!",
        });

        updatePromise
            .then(() => {
                setLoadingUpdate(false);
                setUpdateDialogOpen(false);
                setRequestNote('');
            })
            .catch(() => {
                setLoadingUpdate(false);
            });
    };

    if (!initialData) return null

    const approveProject = useLabAdminApproveProject();

    return (
        <>
            <div className="max-w-5xl mx-auto py-2">
                <Form {...form}>
                    <form className="space-y-8">
                        {/* ===== Thông tin chung ===== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Tên dự án */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Tên dự án
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled className='bg-muted/20 text-foreground disabled:opacity-100' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Công ty
                                        </FormLabel>
                                        <FormControl>
                                            <ReferenceField
                                                type="company"
                                                value={field.value}
                                                id={form.getValues("companyId")}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Ngân sách */}
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Ngân sách (VNĐ)
                                        </FormLabel>
                                        <FormControl>
                                            <MoneyInput
                                                {...field}
                                                disabled
                                                value={Number(field.value)}
                                                className='bg-muted/20 text-foreground disabled:opacity-100'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="createdByName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Quản lý dự án
                                        </FormLabel>
                                        <FormControl>
                                            <ReferenceField
                                                type="user"
                                                value={field.value}
                                                id={form.getValues("createdBy")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* ===== Ngày bắt đầu và kết thúc ===== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Ngày bắt đầu */}
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Ngày bắt đầu
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                value={
                                                    field.value
                                                        ? new Date(field.value).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })
                                                        : 'Chưa có'
                                                }
                                                disabled
                                                className='bg-muted/20 text-foreground disabled:opacity-100'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Ngày kết thúc */}
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Ngày kết thúc
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                value={
                                                    field.value
                                                        ? new Date(field.value).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })
                                                        : 'Chưa có'
                                                }
                                                disabled
                                                className='bg-muted/20 text-foreground disabled:opacity-100'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="">
                            <FormLabel className="text-base font-medium block mb-3">
                                Kỹ năng yêu cầu
                            </FormLabel>

                            {initialData.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {initialData.skills.map((skill: any) => {
                                        return (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-sm px-3 py-1 cursor-help"
                                                    >
                                                        {skill.name}
                                                    </Badge>
                                                </TooltipTrigger>

                                                {skill.description && (
                                                    <TooltipContent className="max-w-xs">
                                                        {skill.description}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">
                                    Không có kỹ năng nào
                                </p>
                            )}
                        </div>

                        {/* ===== Mô tả ===== */}
                        <div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={10}
                                                {...field}
                                                disabled
                                                className='bg-muted/20 text-foreground disabled:opacity-100 resize-none'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <AddMemberModal
                            isOpen={addMentorOpen}
                            onClose={() => setAddMentorOpen(false)}
                            onAddMembers={(members) => {
                                const mentorIds = members.map((m) => m.id);

                                if (mentorIds.length === 0) {
                                    toast.error("Vui lòng chọn ít nhất 1 mentor.");
                                    return;
                                }

                                const assignPromise = approveProject.mutateAsync({
                                    projectId: initialData.id,
                                    userIds: mentorIds,
                                });

                                // Hiển thị toast loading / success / error
                                toast.promise(assignPromise, {
                                    loading: "Đang phê duyệt...",
                                    success: "Phê duyệt thành công!",
                                    error: "Phê duyệt thất bại!",
                                });

                                assignPromise
                                    .then(() => {
                                        setAddMentorOpen(false); // đóng modal
                                    })
                                    .catch(() => { });
                            }}
                            projectId={initialData?.id}
                        />

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
            </div>

            {
                initialData.status == PROJECT_STATUS.UPDATE_REQUIRED ? (
                    <p className="text-sm text-muted-foreground italic mt-2 text-center">
                        Công ty đang trong quá trình cập nhật thông tin — bạn không thể chỉnh sửa hoặc phê duyệt lúc này.
                    </p>
                ) : (
                    <div className="pt-3 md:col-span-2 flex gap-3">
                        <Button type="button" onClick={() => setAddMentorOpen(true)}>
                            Phê duyệt
                        </Button>
                        <Button type="button" onClick={() => setUpdateDialogOpen(true)}>
                            Yêu cầu cập nhật
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate({ to: '/lab-admin/projects' })}
                        >
                            Hủy
                        </Button>
                    </div>
                )
            }

        </>
    )
}
