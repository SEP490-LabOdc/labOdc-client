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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AutoMoneyInput } from '@/components/v2/AutoMoneyInput'
import { ReferenceField } from '@/components/admin/ReferenceField'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import { CURRENCY_SUFFIX } from '@/const'

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

    const { user } = useUser();
    const navigate = useNavigate();

    if (!initialData) return null

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
                                            Ngân sách ({CURRENCY_SUFFIX})
                                        </FormLabel>
                                        <FormControl>
                                            <AutoMoneyInput
                                                {...field}
                                                disabled
                                                value={Number(field.value)}
                                                onChange={field.onChange}
                                                suffix={CURRENCY_SUFFIX}
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
                    </form>
                </Form>
            </div>

            <div className="pt-3 md:col-span-2 flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: getRoleBasePath(user.role) + '/projects' })}
                >
                    Quay về danh sách
                </Button>
            </div>

        </>
    )
}
