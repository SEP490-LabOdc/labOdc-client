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
import { PROJECT_STATUS_LABEL } from "../data/schema"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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

export default function ProjectForm({ initialData }: { initialData: ProjectFormData }) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData,
    })

    if (!initialData) return null

    const statusLabel =
        PROJECT_STATUS_LABEL[initialData.status as keyof typeof PROJECT_STATUS_LABEL] ??
        "Không xác định"

    return (
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
                                        <Input {...field} disabled />
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
                                        <Input
                                            {...field}
                                            disabled
                                            value={Number(initialData.budget).toLocaleString("vi-VN")}
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
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </form>
            </Form>
        </div>
    )
}
