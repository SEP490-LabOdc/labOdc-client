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
import { useGetSkills } from '@/hooks/api/skills'
import { MultiSelectDropdown } from '@/components/multi-select-dropdown'
import { useCreateProject } from '@/hooks/api/projects/queries'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { MoneyInput } from '@/components/admin/MoneyInput'
import { DatePicker } from '@/components/date-picker'

const formSchema = z.object({
    title: z.string().min(3, 'Tên dự án là bắt buộc và ít nhất 3 kí tự.').max(50, 'Tên dự án phải nhỏ hơn 50 kí tự'),
    description: z.string().min(5, 'Mô tả phải có ít nhất 5 ký tự.').max(4000, 'Mô tả phải ít hơn 4000 ký tự'),
    budget: z.coerce.number<number>().min(0, "Ngân sách phải lớn hơn 0").refine((v) => v > 0, "Ngân sách phải lớn hơn 0").max(10000000000, "Ngân sách không được lớn hơn 10 tỷ"),
    skillIds: z.array(z.string()).min(1, 'Phải chọn ít nhất một kỹ năng.'),
    startDate: z.date({
        message: 'Ngày bắt đầu là bắt buộc.',
    }).refine((date) => {
        if (!date) return false
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const minDate = new Date(today)
        minDate.setDate(minDate.getDate() + 5)
        const selectedDate = new Date(date)
        selectedDate.setHours(0, 0, 0, 0)
        return selectedDate >= minDate
    }, {
        message: 'Ngày bắt đầu phải sau 5 ngày so với ngày hiện tại.',
    }),
    endDate: z.date({
        message: 'Ngày kết thúc là bắt buộc.',
    }),
}).refine((data) => {
    if (data.startDate && data.endDate) {
        const start = new Date(data.startDate)
        start.setHours(0, 0, 0, 0)
        const end = new Date(data.endDate)
        end.setHours(0, 0, 0, 0)
        return end > start
    }
    return true
}, {
    message: 'Ngày kết thúc phải sau ngày bắt đầu.',
    path: ['endDate'],
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
        mode: "onChange",
        defaultValues: {
            title: initialData?.title ?? '',
            description: initialData?.description ?? '',
            budget: initialData?.budget ?? 0,
            skillIds: initialData?.skillIds ?? [],
            startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
            endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
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
            await createPromise
            navigate({ to: '/company-manage/projects' })
        } catch (error) {
            console.error('❌ Create project failed:', error)
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* GRID 2 COLUMNS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                        {/* --- TÊN DỰ ÁN --- */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Tên dự án</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="VD: Hệ thống đặt lịch thông minh"
                                            {...field}
                                            disabled={isEdit}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --- NGÂN SÁCH --- */}
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">Ngân sách (VND)</FormLabel>
                                    <FormControl>
                                        <MoneyInput
                                            min={0}
                                            max={100000000000}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isEdit}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* GRID 2 COLUMNS - DATES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* --- NGÀY BẮT ĐẦU --- */}
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => {
                                // Tính minDate: sau 5 ngày từ hôm nay
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                const minStartDate = new Date(today)
                                minStartDate.setDate(minStartDate.getDate() + 5)

                                return (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">Ngày bắt đầu</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                placeholder="Chọn ngày bắt đầu"
                                                disabled={isEdit}
                                                minDate={minStartDate}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Ngày bắt đầu phải sau 5 ngày so với ngày hiện tại
                                        </p>
                                    </FormItem>
                                )
                            }}
                        />

                        {/* --- NGÀY KẾT THÚC --- */}
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => {
                                // Tính minDate: sau ngày bắt đầu
                                const startDate = form.watch('startDate')
                                const minEndDate = startDate ? (() => {
                                    const min = new Date(startDate)
                                    min.setDate(min.getDate() + 1) // Phải sau ngày bắt đầu
                                    min.setHours(0, 0, 0, 0)
                                    return min
                                })() : undefined

                                return (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">Ngày kết thúc</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                placeholder="Chọn ngày kết thúc"
                                                disabled={isEdit || !startDate}
                                                minDate={minEndDate}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {startDate
                                                ? 'Ngày kết thúc phải sau ngày bắt đầu'
                                                : 'Vui lòng chọn ngày bắt đầu trước'}
                                        </p>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    {/* Kỹ năng yêu cầu */}
                    <FormField
                        control={form.control}
                        name="skillIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium">Kỹ năng yêu cầu</FormLabel>

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

                                {/* 🔥 Show skills đã chọn */}
                                {field.value && field.value.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {field.value.map((skillId: any) => {
                                            const skill = skills.find((s: any) => s.id === skillId)
                                            return (
                                                <Tooltip key={skill.id}>
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
                                )}

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mô tả */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium">Mô tả</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={10}
                                        placeholder="Mô tả ngắn gọn về dự án..."
                                        {...field}
                                        disabled={isEdit}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate({ to: '/company-manage/projects' })}
                        >
                            Hủy
                        </Button>

                        <Button type="submit">
                            {isEdit ? 'Cập nhật' : 'Tạo dự án'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
