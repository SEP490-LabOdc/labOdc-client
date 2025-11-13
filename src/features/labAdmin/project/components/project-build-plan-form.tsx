'use client'

import { z } from 'zod'
import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from '@tanstack/react-router'
import { PROJECT_STATUS, PROJECT_STATUS_LABEL } from '../data/schema'
import { cn } from '@/lib/utils'

/* -------------------- SCHEMA -------------------- */
const buildPlanSchema = z.object({
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
    accountManager1: z.string().optional(),
    accountManager2: z.string().optional(),
    userId: z.string().optional(),
})

export type BuildPlanFormData = z.infer<typeof buildPlanSchema>

/* -------------------- COMPONENT -------------------- */
export default function ProjectBuildPlanForm({
    initialData,
}: {
    initialData: BuildPlanFormData
}) {
    const form = useForm<BuildPlanFormData>({
        resolver: zodResolver(buildPlanSchema),
        defaultValues: initialData,
    })

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('files')

    // Fake data cho tabs
    const uploadedFiles = [
        { id: 1, name: 'Kế hoạch dự án.pdf', size: '2.1 MB', uploadedAt: '05/11/2025' },
        { id: 2, name: 'Ngân sách.xlsx', size: '580 KB', uploadedAt: '03/11/2025' },
        { id: 3, name: 'Thiết kế giao diện.fig', size: '4.2 MB', uploadedAt: '01/11/2025' },
    ]

    const teamMembers = [
        { id: 'sv01', name: 'Nguyễn Văn Minh', role: 'Trưởng nhóm' },
        { id: 'sv02', name: 'Trần Thị Lan', role: 'Thành viên' },
        { id: 'sv03', name: 'Phạm Đức Anh', role: 'Thành viên' },
        { id: 'sv04', name: 'Lê Thị Hồng', role: 'Thiết kế UI/UX' },
    ]

    if (!initialData) return null

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ===== CỘT TRÁI ===== */}
                    <div className="space-y-4 px-6">
                        {/* Tên dự án */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
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

                        {/* Người quản lý 1 */}
                        <FormField
                            control={form.control}
                            name="accountManager1"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Quản lý 1
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input
                                                value={"Nguyễn Văn A"}
                                                // {...field}
                                                onClick={() =>
                                                    navigate({
                                                        to: '/lab-admin/users/info?id=' + initialData?.userId,
                                                    })
                                                }
                                                className="cursor-pointer underline text-blue-600 hover:bg-muted/40 transition"
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
                                    <FormItem>
                                        <div className="flex items-center gap-3">
                                            <FormLabel className="w-40 block text-end text-base font-medium">
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


                        {/* Người quản lý 2 */}
                        <FormField
                            control={form.control}
                            name="accountManager2"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Quản lý 2
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input
                                                value="Trần Thị B"
                                                //{...field}
                                                onClick={() =>
                                                    navigate({
                                                        to: '/lab-admin/users/info?id=' + initialData?.userId,
                                                    })
                                                }
                                                className="cursor-pointer underline text-blue-600 hover:bg-muted/40 transition"
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
                                <FormItem>
                                    <div className="flex items-start gap-3">
                                        <FormLabel className="w-20 block text-end text-base font-medium pt-2">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Textarea rows={6} {...field} disabled />
                                        </FormControl>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* ===== KỸ NĂNG ===== */}
                    <div className="col-span-2 px-6 space-y-3">
                        <FormLabel className="block text-base font-medium text-center">
                            Kỹ năng yêu cầu
                        </FormLabel>
                        {initialData.skills?.length ? (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {initialData.skills.map((skill) => (
                                    <Badge key={skill.id} variant="secondary" className="text-sm px-3 py-1">
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

            {
                initialData.status == PROJECT_STATUS.PENDING_LAB_PUBLISH && (
                    <div className="pt-3 md:col-span-2 flex gap-3">
                        <Button type="button" >
                            Công bố dự án
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

            {/* ===== TABS BÊN DƯỚI ===== */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
                <TabsList
                    className="
      flex rounded-full bg-muted/50 dark:bg-zinc-800 p-1
      shadow-sm border border-border/40
    "
                >
                    <TabsTrigger
                        value="files"
                        className={cn(
                            'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow',
                        )}
                    >
                        Tệp đính kèm
                    </TabsTrigger>

                    <TabsTrigger
                        value="members"
                        className={cn(
                            'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow',
                        )}
                    >
                        Thành viên dự án
                    </TabsTrigger>
                </TabsList>

                {/* ===== FILES ===== */}
                <TabsContent value="files" className="mt-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                        {uploadedFiles.map((f) => (
                            <div
                                key={f.id}
                                className="flex items-center justify-between border-b last:border-0 py-2"
                            >
                                <div>
                                    <p className="font-medium text-blue-600 cursor-pointer hover:underline">
                                        {f.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Dung lượng: {f.size} • Tải lên: {f.uploadedAt}
                                    </p>
                                </div>
                                <Button size="sm" variant="outline">
                                    Tải xuống
                                </Button>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* ===== MEMBERS ===== */}
                <TabsContent value="members" className="mt-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="py-2 px-2">Mã SV</th>
                                    <th className="py-2 px-2">Họ tên</th>
                                    <th className="py-2 px-2">Vai trò</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((m) => (
                                    <tr key={m.id} className="border-b last:border-0">
                                        <td className="py-2 px-2">{m.id}</td>
                                        <td className="py-2 px-2">{m.name}</td>
                                        <td className="py-2 px-2">{m.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
