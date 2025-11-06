import { useEffect } from 'react'
import type { JSX } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useGetSkills } from '@/hooks/api/skills/queries' // ✅ Hook lấy danh sách kỹ năng
import apiRequest from '@/config/request'
import { MultiSelectDropdown } from '@/components/multi-select-dropdown'

// ✅ Schema validation cho Project form
const formSchema = z.object({
    title: z.string().min(2, 'Tên dự án là bắt buộc.'),
    description: z.string().min(5, 'Mô tả phải có ít nhất 5 ký tự.'),
    skillIds: z.array(z.string()).min(1, 'Phải chọn ít nhất một kỹ năng.'),
})

export type ProjectForm = z.infer<typeof formSchema>

export default function ProjectsForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: Partial<ProjectForm> & { id?: string }
}): JSX.Element {
    const navigate = useNavigate()
    const isEdit = mode === 'edit'
    const { data: skills = [], isLoading: skillsLoading } = useGetSkills()

    const form = useForm<ProjectForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title ?? '',
            description: initialData?.description ?? '',
            skillIds: initialData?.skillIds ?? [],
        },
    })

    useEffect(() => {
        if (initialData) form.reset(initialData)
    }, [initialData, form])

    const onSubmit = async (values: ProjectForm) => {
        const createPromise = apiRequest.post('/api/v1/projects', values)

        toast.promise(createPromise, {
            loading: 'Đang tạo dự án...',
            success: 'Tạo dự án thành công!',
            error: 'Tạo dự án thất bại!',
        })

        try {
            await createPromise
            navigate({ to: '/company-manage/projects' })
        } catch (error) {
            console.error('❌ Create project failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
            >
                {/* ===== CỘT TRÁI ===== */}
                <div className="space-y-4 px-12">
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
                                        <Input
                                            placeholder="VD: Hệ thống đặt lịch thông minh"
                                            {...field}
                                            disabled={isEdit}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="ml-40" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <FormLabel className="w-40 text-end text-base font-medium">
                                        Mô tả
                                    </FormLabel>
                                    <FormControl className="flex-1">
                                        <Textarea
                                            rows={4}
                                            placeholder="Mô tả ngắn gọn về dự án..."
                                            {...field}
                                            disabled={isEdit}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="ml-40" />
                            </FormItem>
                        )}
                    />
                </div>

                {/* ===== CỘT PHẢI ===== */}
                <div className="space-y-4 px-12">
                    <FormField
                        control={form.control}
                        name="skillIds"
                        render={({ field }) => (
                            <FormField
                                control={form.control}
                                name="skillIds"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <FormLabel className="w-40 text-end text-base font-medium">
                                                Kỹ năng yêu cầu
                                            </FormLabel>
                                            <div className="flex-1">
                                                <MultiSelectDropdown
                                                    items={skills.map((s: any) => ({
                                                        label: s.name,
                                                        value: s.id,
                                                    }))}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Chọn kỹ năng"
                                                    disabled={skillsLoading || isEdit}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="ml-40" />
                                    </FormItem>
                                )}
                            />
                        )}
                    />
                </div>
            </form>

            {/* --- BUTTONS --- */}
            <div className="mt-6 flex gap-3 px-12">
                {!isEdit ? (
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Thêm dự án
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        variant="secondary"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Cập nhật
                    </Button>
                )}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/company-manage/projects' })}
                >
                    Hủy
                </Button>
            </div>
        </Form>
    )
}
