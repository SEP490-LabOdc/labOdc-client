import { useEffect } from 'react'
import type { JSX } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { useNavigate } from '@tanstack/react-router'
import { DatePicker } from '@/components/date-picker'

// 👇 Schema xác thực cho các field có trong dữ liệu trả về
const formSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc.'),
    email: z.string().email('Email không hợp lệ.'),
    phone: z.string().min(1, 'Số điện thoại là bắt buộc.'),
    role: z.string().min(1, 'Vai trò là bắt buộc.'),
    gender: z
        .enum(['MALE', 'FEMALE', 'OTHER'])
        .refine((val) => ['MALE', 'FEMALE', 'OTHER'].includes(val), {
            message: 'Giới tính không hợp lệ.',
        }),
    birthDate: z.date('Please select your date of birth.').optional(),
    avatarUrl: z.string().nullable().optional(),
})

export type UserForm = z.infer<typeof formSchema>

export default function UsersForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: Partial<UserForm> & { id?: string }
}): JSX.Element {
    const navigate = useNavigate()
    const isEdit = mode === 'edit'

    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: initialData?.fullName ?? '',
            email: initialData?.email ?? '',
            phone: initialData?.phone ?? '',
            role: initialData?.role ?? '',
            gender: initialData?.gender ?? 'OTHER',
            birthDate: initialData?.birthDate
                ? new Date(initialData.birthDate)
                : new Date(),
            avatarUrl: initialData?.avatarUrl ?? '',
        },
    })

    useEffect(() => {
        if (initialData) form.reset(initialData)
    }, [initialData, form])

    const onSubmit = async (values: UserForm) => {
        try {
            const res = await fetch(
                isEdit ? `/api/users/${initialData?.id}` : '/api/users',
                {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                }
            )
            if (!res.ok) throw new Error('Lưu thất bại.')
            navigate({ to: '/admin/users' })
        } catch (e: any) {
            alert(e.message)
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                >
                    {/* ===== CỘT TRÁI ===== */}
                    <div className="space-y-4 px-12">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Họ và tên
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="VD: Hoàng Văn Nam" {...field} />
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
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Email
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="hoang@example.com" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="+84..." {...field} />
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
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Vai trò
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Chọn vai trò"
                                                items={[
                                                    { label: 'Người dùng', value: 'USER' },
                                                    { label: 'Quản trị', value: 'ADMIN' },
                                                ]}
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
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Giới tính
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                items={[
                                                    { label: 'Nam', value: 'MALE' },
                                                    { label: 'Nữ', value: 'FEMALE' },
                                                    { label: 'Khác', value: 'OTHER' },
                                                ]}
                                                placeholder="Chọn giới tính"
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
                            name='birthDate'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">Ngày sinh</FormLabel>
                                        <div className="flex-1">
                                            <DatePicker selected={field.value} onSelect={field.onChange} />
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form >

            {/* --- BUTTON ACTIONS --- */}
            <div className="mt-3 pt-3 flex gap-3" >
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/admin/users' })}
                >
                    Hủy
                </Button>
            </div >
        </>
    )
}
