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
import { PROJECT_STATUS_LABEL } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'

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

    if (!initialData) return null

    return (
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
                                        Ngân sách (VNĐ)
                                    </FormLabel>
                                    <FormControl className="flex-1">
                                        <Input
                                            {...field}
                                            disabled
                                            value={`${Number(initialData.budget).toLocaleString('vi-VN')}`}
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
                            const statusLabel = PROJECT_STATUS_LABEL[field.value as keyof typeof PROJECT_STATUS_LABEL] || 'Không xác định'

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
                </div>

                <div className='space-y-4 px-12 md:col-span-2'>
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
                                                rows={15}
                                                placeholder="Mô tả ngắn gọn về dự án..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>
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
            </form>
        </Form>
    )
}
