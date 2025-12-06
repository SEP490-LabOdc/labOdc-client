import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PROJECT_STATUS, PROJECT_STATUS_LABEL } from "../data/schema"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useUpdateProject } from "@/hooks/api/projects"
import { MoneyInput } from "@/components/admin/MoneyInput"
import { DatePicker } from "@/components/date-picker"

const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    budget: z.coerce.number<number>().min(1, "Ngân sách không được nhỏ hơn 0").refine((v) => v >= 0, "Ngân sách không được nhỏ hơn 0"),
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
    }).optional(),
    endDate: z.date({
        message: 'Ngày kết thúc là bắt buộc.',
    }).optional(),
    skills: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
        })
    ),
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

export type ProjectFormData = z.infer<typeof projectSchema>

export default function ProjectForm({ initialData }: { initialData: ProjectFormData }) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            ...initialData,
            startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
            endDate: initialData.endDate ? new Date(initialData.endDate) : undefined,
        }
    })

    console.log(form.formState.errors)

    if (!initialData) return null

    // ========== CHECK UPDATE MODE ==========
    const isUpdateMode = initialData.status === PROJECT_STATUS.UPDATE_REQUIRED

    // ========== UPDATE API HOOK ==========
    const updateProject = useUpdateProject()

    const statusLabel =
        PROJECT_STATUS_LABEL[initialData.status as keyof typeof PROJECT_STATUS_LABEL] ??
        "Không xác định"

    // ========== HANDLE SUBMIT UPDATE ==========
    const handleSubmitUpdate = async (values: any) => {

        const payload = {
            projectId: initialData.id,
            title: values.title,
            description: values.description,
            budget: Number(values.budget),
            skillIds: values.skills.map((s: any) => s.id),
            startDate: values.startDate,
            endDate: values.endDate,
        }

        const promise = updateProject.mutateAsync(payload)

        toast.promise(promise, {
            loading: "Đang gửi cập nhật...",
            success: "Cập nhật thành công!",
            error: "Gửi cập nhật thất bại!",
        })

        await promise
    }

    return (
        <div className="max-w-5xl mx-auto py-2">
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmitUpdate)} >
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
                                        <Input
                                            {...field}
                                            disabled={!isUpdateMode}
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
                                            disabled={!isUpdateMode}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Trạng thái */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium">
                                        Trạng thái
                                    </FormLabel>
                                    <FormControl>
                                        <Input value={statusLabel} disabled />
                                    </FormControl>
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
                            render={({ field }) => {
                                // Tính minDate: sau 5 ngày từ hôm nay
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                const minStartDate = new Date(today)
                                minStartDate.setDate(minStartDate.getDate() + 5)

                                return (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">
                                            Ngày bắt đầu
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                placeholder="Chọn ngày bắt đầu"
                                                disabled={!isUpdateMode}
                                                minDate={minStartDate}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        {isUpdateMode && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Ngày bắt đầu phải sau 5 ngày so với ngày hiện tại
                                            </p>
                                        )}
                                    </FormItem>
                                )
                            }}
                        />

                        {/* Ngày kết thúc */}
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
                                        <FormLabel className="text-base font-medium">
                                            Ngày kết thúc
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                placeholder="Chọn ngày kết thúc"
                                                disabled={!isUpdateMode || !startDate}
                                                minDate={minEndDate}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        {isUpdateMode && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                {startDate
                                                    ? 'Ngày kết thúc phải sau ngày bắt đầu'
                                                    : 'Vui lòng chọn ngày bắt đầu trước'}
                                            </p>
                                        )}
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    {/* ===== Kỹ năng ===== */}
                    <div className="">
                        <FormLabel className="text-base font-medium block mb-3">
                            Kỹ năng yêu cầu
                        </FormLabel>

                        {initialData.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {initialData.skills.map((skill) => (
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
                                ))}
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
                                            disabled={!isUpdateMode}
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ===== BUTTON GỬI CẬP NHẬT ===== */}
                    {isUpdateMode && (
                        <div className="md:col-span-2 flex gap-3">
                            <Button
                                type="submit"
                            >
                                Gửi cập nhật
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    )
}
