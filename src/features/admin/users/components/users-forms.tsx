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
import { SelectDropdown } from '@/components/select-dropdown'
import { useNavigate } from '@tanstack/react-router'
import { DatePicker } from '@/components/date-picker'
import { useUpdateProfile } from '@/hooks/api/users'
import { toast } from 'sonner'
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from '../data/schema'

// ✅ Schema cập nhật
const formSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc.'),
    email: z.string().email('Email không hợp lệ.'),
    phone: z.string().optional(),
    role: z.string().min(1, 'Vai trò là bắt buộc.'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    birthDate: z.date().optional(),
    avatarUrl: z.string().nullable().optional(),
    address: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'INVITED', 'SUSPENDED']).optional(),
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
    const { mutateAsync: updateProfile } = useUpdateProfile()

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
                : undefined,
            avatarUrl: initialData?.avatarUrl ?? '',
            address: initialData?.address ?? '',
            status: initialData?.status ?? 'ACTIVE',
        },
    })

    useEffect(() => {
        if (initialData) form.reset(initialData)
    }, [initialData, form])

    const onSubmit = async (values: UserForm) => {
        if (!initialData?.id) return

        const updatePromise = updateProfile({
            id: initialData.id,
            payload: {
                fullName: values.fullName,
                phone: values.phone ?? '',
                gender: values.gender ?? 'OTHER',
                birthDate: values.birthDate
                    ? values.birthDate.toISOString().split('T')[0]
                    : undefined,
                address: values.address ?? '',
                avatarUrl: values.avatarUrl ?? undefined,
            },
        })

        toast.promise(updatePromise, {
            loading: 'Đang cập nhật hồ sơ...',
            success: 'Cập nhật hồ sơ thành công!',
            error: 'Cập nhật thất bại, vui lòng thử lại!',
        })

        try {
            await updatePromise
        } catch (error) {
            console.error('❌ Update failed:', error)
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
                                            <Input placeholder="VD: Hoàng Văn Nam" {...field} disabled />
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
                                            <Input placeholder="hoang@example.com" {...field} disabled />
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
                                            <Input value={field.value ? field.value : ""} disabled />
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
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Địa chỉ
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input value={field.value ? field.value : ""} disabled />
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
                                                items={USER_ROLE_OPTIONS}
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
                                                    { label: '', value: 'OTHER' },
                                                ]}
                                                placeholder="Chọn giới tính"
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
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Trạng thái
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                items={[
                                                    { label: 'Hoạt động', value: 'ACTIVE' },
                                                    { label: 'Vô hiệu hóa', value: 'INACTIVE' },
                                                ]}
                                                placeholder="Chọn trạng thái"
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
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Ngày sinh
                                        </FormLabel>
                                        <div className="flex-1">
                                            {field.value ? (
                                                <DatePicker
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled
                                                />
                                            ) : (
                                                <FormControl className="flex-1">
                                                    <Input value={""} disabled />
                                                </FormControl>
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>

            {/* --- BUTTON ACTIONS --- */}
            <div className="mt-3 pt-3 flex gap-3">
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
            </div>
        </>
    )
}
