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
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useGetSkills } from '@/hooks/api/skills/queries'
import { MultiSelectDropdown } from '@/components/multi-select-dropdown'
import { useCreateProject } from '@/hooks/api/projects'

const formSchema = z.object({
    title: z.string().min(2, 'Tên dự án là bắt buộc.'),
    description: z.string().min(5, 'Mô tả phải có ít nhất 5 ký tự.'),
    budget: z.coerce.number<number>().min(0, "Giá trị nhỏ nhất là 0"),
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
    const { mutateAsync: createProject } = useCreateProject()

    const form = useForm<ProjectForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title ?? '',
            description: initialData?.description ?? '',
            budget: initialData?.budget ?? 0,
            skillIds: initialData?.skillIds ?? [],
        },
    })

    useEffect(() => {
        if (initialData) form.reset(initialData)
    }, [initialData, form])

    const onSubmit = async (values: ProjectForm) => {
        const createPromise = createProject(values)

        toast.promise(createPromise, {
            loading: 'Đang tạo dự án...',
            success: 'Tạo dự án thành công!',
            error: 'Tạo dự án thất bại!',
        })

        try {
            const data = await createPromise
            console.log('✅ Project created:', data.data.id)
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

                    {/* 🔹 NEW: Ngân sách */}
                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <FormLabel className="w-40 text-end text-base font-medium">
                                        Ngân sách (VND)
                                    </FormLabel>
                                    <FormControl className="flex-1">
                                        <Input
                                            type="number"
                                            {...field}
                                            // react-hook-form truyền string, z.coerce sẽ convert về number
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
                <div>
                    <div className="space-y-4 px-12">
                        <FormField
                            control={form.control}
                            name="skillIds"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium pt-2">
                                            Kỹ năng yêu cầu
                                        </FormLabel>
                                        <div className="flex-1 space-y-3">
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

                                            {field.value && field.value.length > 0 && (
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {field.value.map((skillId: string) => {
                                                        const skill = skills.find(
                                                            (s: any) => s.id === skillId
                                                        )
                                                        return (
                                                            <span
                                                                key={skillId}
                                                                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground"
                                                            >
                                                                {skill?.name || 'Không xác định'}
                                                            </span>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Mô tả */}
                <div className="space-y-4 px-12 md:col-span-2">
                    <div className="space-y-4 px-12">
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
                                            <Textarea
                                                rows={8}
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
                </div>
            </form>

            {/* --- BUTTONS --- */}
            <div className="mt-6 flex gap-3 px-12">
                {!isEdit ? (
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Tạo dự án
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
