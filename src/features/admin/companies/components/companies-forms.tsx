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
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { useNavigate } from '@tanstack/react-router'
import type { Company } from '../data/schema'

// Options
const DOMAIN_OPTIONS = [
    { label: 'Fintech', value: 'Fintech' },
    { label: 'E-commerce', value: 'E-commerce' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'EdTech', value: 'EdTech' },
    { label: 'Logistics', value: 'Logistics' },
    { label: 'Gaming', value: 'Gaming' },
    { label: 'SaaS', value: 'SaaS' },
    { label: 'AI/ML', value: 'AI/ML' },
]
const STATUS_OPTIONS = [
    { label: 'Chờ phê duyệt', value: 'approving' },
    { label: 'Từ chối phê duyệt', value: 'rejected' },
    { label: 'Đang hoạt động', value: 'active' },
    { label: 'Không hoạt động', value: 'inactive' },
    { label: 'Đã tạm khóa', value: 'suspended' },
]

// Helpers
const isValidDateStr = (s: string) => !Number.isNaN(Date.parse(s))
const toDateInput = (d?: Date) => (d ? new Date(d).toISOString().slice(0, 10) : '')

const formSchema = z.object({
    companyName: z.string().min(1, 'Tên công ty là bắt buộc.'),
    description: z.string().min(1, 'Mô tả là bắt buộc.'),
    email: z.email({
        error: (iss) => (iss.input === '' ? 'Email là bắt buộc.' : undefined),
    }),
    taxId: z.string().min(1, 'Mã số thuế là bắt buộc.'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc.'),
    domain: z.string().min(1, 'Lĩnh vực là bắt buộc.'),
    status: z.enum(['approving', 'rejected', 'active', 'inactive', 'suspended']),
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

export default function CompanyForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: Company
}): JSX.Element {
    const navigate = useNavigate()
    const isEdit = mode === 'edit'

    const defaultValues: CompanyFormValues = useMemo(
        () =>
            isEdit && initialData
                ? {
                    companyName: initialData.companyName ?? '',
                    description: initialData.description ?? '',
                    email: initialData.email ?? '',
                    taxId: initialData.taxId ?? '',
                    address: initialData.address ?? '',
                    phoneNumber: initialData.phoneNumber ?? '',
                    domain: initialData.domain ?? '',
                    status: initialData.status ?? 'approving',
                    logo: initialData.logo ?? '',
                    banner: initialData.banner ?? '',
                    accountManager: initialData.accountManager ?? '',
                    lastInteraction: toDateInput(initialData.lastInteraction),
                    isEdit: true,
                }
                : {
                    companyName: '',
                    description: '',
                    email: '',
                    taxId: '',
                    address: '',
                    phoneNumber: '',
                    domain: '',
                    status: 'approving',
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
            companyName: values.companyName,
            description: values.description,
            email: values.email,
            taxId: values.taxId,
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
            navigate({ to: '/admin/companies' })
        } catch (e: any) {
            alert(e.message)
            // Có thể giữ nguyên trang để sửa, hoặc điều hướng về list
            // navigate({ to: '/admin/companies' })
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
                            name="companyName"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Tên công ty
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="VD: Acme Corp." {...field} />
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
                                            <Input placeholder="Mô tả ngắn về công ty" {...field} />
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
                                            <Input placeholder="contact@company.com" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="taxId"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Mã số thuế
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="0123456789" {...field} />
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
                                            <Input placeholder="Số nhà, đường, phường/xã, quận/huyện" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
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
                                            <Input placeholder="+84 123 456 789" {...field} />
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
                                                placeholder="Chọn lĩnh vực"
                                                items={DOMAIN_OPTIONS}
                                                className="w-full"
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
                                                placeholder="Chọn trạng thái"
                                                items={STATUS_OPTIONS}
                                                className="w-full"
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
                                            <Input placeholder="https://..." {...field} />
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
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="accountManager"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Quản lý tài khoản
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="Nguyễn Văn A" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastInteraction"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Lần tương tác cuối
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input type="date" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
            <div className="pt-3 md:col-span-2 flex gap-3">
                <Button type="submit">Lưu thay đổi</Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/admin/companies' })}
                >
                    Hủy
                </Button>
            </div>
        </>

    )
}
