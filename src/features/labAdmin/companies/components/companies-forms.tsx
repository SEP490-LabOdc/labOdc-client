'use client'
import { useEffect, useMemo } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { useNavigate } from '@tanstack/react-router'
import type { Company } from '../data/schema'
import { DOMAIN_OPTIONS, STATUS_OPTIONS } from '../data/data'


// Helpers
const isValidDateStr = (s: string) => !Number.isNaN(Date.parse(s))
//const toDateInput = (d?: Date) => (d ? new Date(d).toISOString().slice(0, 10) : '')

const formSchema = z.object({
    name: z.string().min(1, 'Tên công ty là bắt buộc.'),
    description: z.string().min(1, 'Mô tả là bắt buộc.'),
    email: z.email({
        error: (iss) => (iss.input === '' ? 'Email là bắt buộc.' : undefined),
    }),
    taxCode: z.string().min(1, 'Mã số thuế là bắt buộc.'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc.'),
    domain: z.string().min(1, 'Lĩnh vực là bắt buộc.'),
    status: z.enum(['PENDING', 'UPDATE_REQUIRED', 'ACTIVE', 'DISABLED']),
    logo: z.string().url('Logo phải là URL hợp lệ.').min(1, 'Logo là bắt buộc.'),
    banner: z.string().url('Banner phải là URL hợp lệ.').min(1, 'Banner là bắt buộc.'),
    accountManager: z.string().min(1, 'Người quản lý tài khoản là bắt buộc.'),
    lastInteraction: z
        .string()
        .optional()
        .refine((v) => !v || isValidDateStr(v), 'Ngày không hợp lệ (yyyy-mm-dd).'),
    isEdit: z.boolean(),
})

export type CompanyFormValues = z.infer<typeof formSchema>

type CompanyWithDocuments = Company & {
    getCompanyDocumentResponses?: {
        id: string;
        fileUrl: string;
        type: string;
    }[],
    userId: string
};

export default function CompanyForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: CompanyWithDocuments
}): JSX.Element {
    const navigate = useNavigate()
    const isEdit = mode === 'edit'

    const defaultValues: CompanyFormValues = useMemo(
        () =>
            isEdit && initialData
                ? {
                    name: initialData.name ?? '',
                    description: initialData.description ?? '',
                    email: initialData.email ?? '',
                    taxCode: initialData.taxCode ?? '',
                    address: initialData.address ?? '',
                    phoneNumber: initialData.phone ?? '',
                    domain: initialData.domain ?? '',
                    status: initialData.status ?? 'PENDING',
                    logo: initialData.logo ?? '',
                    banner: initialData.banner ?? '',
                    accountManager: initialData.contactPersonName ?? '',
                    isEdit: true,
                }
                : {
                    name: '',
                    description: '',
                    email: '',
                    taxCode: '',
                    address: '',
                    phoneNumber: '',
                    domain: '',
                    status: 'PENDING',
                    logo: '',
                    banner: '',
                    accountManager: '',
                    lastInteraction: '',
                    isEdit: false,
                },
        [isEdit, initialData]
    )

    const form = useForm<CompanyFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    useEffect(() => {
        if (isEdit && initialData) {
            form.reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialData])

    const onSubmit = async (values: CompanyFormValues) => {
        const payload: any = {
            name: values.name,
            description: values.description,
            email: values.email,
            taxId: values.taxCode,
            address: values.address,
            phoneNumber: values.phoneNumber,
            domain: values.domain,
            status: values.status,
            logo: values.logo,
            banner: values.banner,
            accountManager: values.accountManager,
            lastInteraction: values.lastInteraction ? new Date(values.lastInteraction) : null,
        }

        try {
            const res = await fetch(
                isEdit ? `/api/companies/${(initialData as any)?.id}` : '/api/companies',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            )
            if (!res.ok) throw new Error('Lưu thất bại')
            navigate({ to: '/lab-admin/companies' })
        } catch (e: any) {
            alert(e.message)
            // Có thể giữ nguyên trang để sửa, hoặc điều hướng về list
            // navigate({ to: '/lab-admin/companies' })
        }
    }

    return (
        <>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                >
                    {/* ========== CỘT TRÁI ========== */}
                    <div className="space-y-4 px-12">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Tên công ty
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="VD: Acme Corp." {...field} disabled />
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
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Email
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="contact@company.com" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="taxCode"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Mã số thuế
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="0123456789" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Địa chỉ
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        {(initialData?.getCompanyDocumentResponses?.length ?? 0) > 0 && (
                            <div className="space-y-3">
                                {initialData!.getCompanyDocumentResponses!.map((doc) => {
                                    // 🔹 Lấy tên file chỉ phần sau dấu "_"
                                    const rawName = decodeURIComponent(doc.fileUrl.split('/').pop() || 'Tài liệu');
                                    const fileName = rawName.includes('_') ? rawName.split('_').pop()! : rawName;

                                    const typeLabelMap: Record<string, string> = {
                                        BUSINESS_LICENSE: 'Giấy phép kinh doanh',
                                        IDENTIFICATION: 'Giấy tờ cá nhân',
                                        CONTRACT: 'Hợp đồng',
                                    };
                                    const typeLabel = typeLabelMap[doc.type] || doc.type;

                                    return (
                                        <div key={doc.id} className="flex items-center gap-3">
                                            <span className="w-40 block text-end text-base font-medium">
                                                {typeLabel}
                                            </span>
                                            <a
                                                href={doc.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={fileName}
                                                className="flex-1 px-3 py-2 rounded-xs border bg-muted/40 text-sm text-blue-600 border-input underline truncate"
                                                title={fileName}
                                            >
                                                {fileName}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </div>

                    {/* ========== CỘT PHẢI ========== */}
                    <div className="space-y-4 px-12">
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="+84 123 456 789" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Lĩnh vực
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder=""
                                                items={DOMAIN_OPTIONS}
                                                showSearch
                                                className="w-full"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Trạng thái
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder=""
                                                items={STATUS_OPTIONS}
                                                className="w-full"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Logo (URL)
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="banner"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Banner (URL)
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="" {...field} disabled />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        {
                            initialData?.userId && (
                                <FormField
                                    control={form.control}
                                    name="accountManager"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <FormLabel className="w-40 block text-end text-base font-medium">
                                                    Người quản lý
                                                </FormLabel>
                                                <FormControl className="flex-1">

                                                    <Input placeholder="" {...field} onClick={() => navigate({ to: '/lab-admin/users/info?id=' + initialData?.userId })}
                                                        className="cursor-pointer underline text-blue-600 hover:bg-muted/40 transition" />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="ml-40" />
                                        </FormItem>
                                    )}
                                />
                            )
                        }
                    </div>
                </form>
            </Form>
            <div className="pt-4 md:col-span-2 flex gap-3">
                {/* <Button type="submit">Cập nhật</Button> */}
                <Button
                    type="button"
                    variant="outline"
                // onClick={() => navigate({ to: 'lab-admin/companies' })}
                >
                    Quay về danh sách
                </Button>
            </div>
            {/* --- RELATIONSHIP SECTION (ServiceNow Style) --- */}
            <div className="mt-8 border rounded p-2">
                <div className="">
                    <Tabs defaultValue="explore" className="w-full">
                        {/* --- TAB HEADER --- */}
                        <div className="">
                            <TabsList className="bg-background gap-1 border p-1">
                                <TabsTrigger
                                    value="projects"
                                >
                                    Projects
                                </TabsTrigger>
                                <TabsTrigger
                                    value="users"
                                >
                                    Users
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* --- PROJECTS TAB --- */}
                        <TabsContent value="projects" className="mt-0">
                            <div className="overflow-hidden border-t border-border">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-muted/40 border-b border-border">
                                        <tr>
                                            <th className="text-left font-semibold px-4 py-2">Tên dự án</th>
                                            <th className="text-left font-semibold px-4 py-2">Trạng thái</th>
                                            <th className="text-left font-semibold px-4 py-2">Ngày bắt đầu</th>
                                            <th className="text-left font-semibold px-4 py-2">Ngày kết thúc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Fintech Platform', status: 'Đang triển khai', start: '2024-02-10', end: '2025-01-15' },
                                            { name: 'Mobile Banking App', status: 'Hoàn thành', start: '2023-06-01', end: '2023-12-20' },
                                            { name: 'CRM Integration', status: 'Chuẩn bị', start: '2025-03-01', end: '2025-06-30' },
                                        ].map((proj, i) => (
                                            <tr key={i} className="border-b border-border hover:bg-muted/30">
                                                <td className="px-4 py-2 font-medium">{proj.name}</td>
                                                <td className="px-4 py-2">{proj.status}</td>
                                                <td className="px-4 py-2">{proj.start}</td>
                                                <td className="px-4 py-2">{proj.end}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>

                        {/* --- USERS TAB --- */}
                        <TabsContent value="users" className="mt-0">
                            <div className="overflow-hidden border-t border-border">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-muted/40 border-b border-border">
                                        <tr>
                                            <th className="text-left font-semibold px-4 py-2">Tên người dùng</th>
                                            <th className="text-left font-semibold px-4 py-2">Email</th>
                                            <th className="text-left font-semibold px-4 py-2">Vai trò</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Nguyễn Văn A', email: 'a@fintechplus.vn', role: 'Manager' },
                                            { name: 'Trần Thị B', email: 'b@fintechplus.vn', role: 'Staff' },
                                            { name: 'Lê Văn C', email: 'c@fintechplus.vn', role: 'Admin' },
                                        ].map((user, i) => (
                                            <tr key={i} className="border-b border-border hover:bg-muted/30">
                                                <td className="px-4 py-2 font-medium">{user.name}</td>
                                                <td className="px-4 py-2">{user.email}</td>
                                                <td className="px-4 py-2">{user.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </>

    )
}
