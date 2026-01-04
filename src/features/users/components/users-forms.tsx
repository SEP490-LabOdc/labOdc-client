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
import { toast } from 'sonner'
import { USER_ROLE, USER_ROLE_OPTIONS, USER_STATUS } from '@/features/users/data/schema'
import { useCreateUser } from '@/hooks/api/users/queries'
import { useUser } from '@/context/UserContext'
import { getRoleBasePath } from '@/lib/utils'

// ✅ Schema cập nhật
const formSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc.'),
    email: z.string().email('Email không hợp lệ.'),
    phone: z
        .string()
        .min(8, 'Số điện thoại tối thiểu 8 chữ số')
        .max(15, 'Số điện thoại tối đa 15 chữ số')
        .regex(/^\+?[0-9]+$/, 'Chỉ được chứa số và dấu +'),
    role: z.string().min(1, 'Vai trò là bắt buộc.'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    birthDate: z.date().optional(),
    avatarUrl: z.string().nullable().optional(),
    address: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'INVITED', 'SUSPENDED']).optional(),
    password: z.string(),
})

export type UserForm = z.infer<typeof formSchema>

export default function UsersForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: Partial<UserForm> & { id?: string }
}): JSX.Element {
    const { user } = useUser();
    const navigate = useNavigate()
    const isEdit = mode === 'edit'
    const { mutateAsync: createUser } = useCreateUser();

    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            fullName: initialData?.fullName ?? '',
            email: initialData?.email ?? '',
            phone: initialData?.phone ?? '',
            role: initialData?.role ?? USER_ROLE.SUPERVISOR,
            gender: initialData?.gender ?? 'MALE',
            birthDate: initialData?.birthDate
                ? new Date(initialData.birthDate)
                : undefined,
            avatarUrl: initialData?.avatarUrl ?? '',
            address: initialData?.address ?? '',
            status: initialData?.status ?? 'ACTIVE',
            password: '',
        },
    })

    useEffect(() => {
        if (initialData) form.reset(initialData)
    }, [initialData, form])

    const onSubmit = async (values: UserForm) => {
        // Gọi API tạo user
        const createPromise = createUser(values)

        toast.promise(createPromise, {
            loading: 'Đang tạo người dùng...',
            success: 'Tạo người dùng thành công!',
            error: 'Tạo người dùng thất bại!',
        })

        try {
            await createPromise
            navigate({ to: getRoleBasePath(user.role) + '/users' })
        } catch (error) {
            console.error('❌ Tạo thất bại:', error)
        }
    }

    const ALLOWED_ROLES = ["LAB_ADMIN", "SUPERVISOR", "USER"] as const
    type AllowedRole = typeof ALLOWED_ROLES[number]

    const FILTERED_ROLE_OPTIONS = USER_ROLE_OPTIONS.filter(
        (r): r is { label: string; value: AllowedRole } =>
            ALLOWED_ROLES.includes(r.value as AllowedRole)
    )

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
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Họ và tên
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="VD: Hoàng Văn Nam" {...field} disabled={isEdit} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Email
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="hoang@example.com" {...field} disabled={isEdit} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input {...field} disabled={isEdit} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Địa chỉ
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input {...field} disabled={isEdit} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        {!isEdit && (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1 gap-0">
                                        <div className="flex items-center gap-3">
                                            <FormLabel className="w-40 text-end text-base block font-medium">
                                                Mật khẩu
                                            </FormLabel>
                                            <FormControl className="flex-1">
                                                <Input
                                                    type="password"
                                                    placeholder="Nhập mật khẩu"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="ml-45" />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    {/* ===== CỘT PHẢI ===== */}
                    <div className="space-y-4 px-12">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Vai trò
                                        </FormLabel>

                                        <div className="flex-1">
                                            <SelectDropdown
                                                key={field.value}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Chọn vai trò"
                                                items={FILTERED_ROLE_OPTIONS.map(r => ({
                                                    ...r,
                                                    label2: null,
                                                }))}
                                                className="w-full"
                                                disabled={isEdit}
                                            />
                                        </div>
                                    </div>

                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Giới tính
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                items={[
                                                    { label: 'Nam', value: 'MALE', label2: null },
                                                    { label: 'Nữ', value: 'FEMALE', label2: null },
                                                    { label: 'Khác', value: 'OTHER', label2: null },
                                                ]}
                                                placeholder="Chọn giới tính"
                                                className="w-full"
                                                disabled={isEdit}
                                            />
                                        </div>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Trạng thái
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                key={field.value}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                items={[
                                                    { label: 'Hoạt động', value: USER_STATUS.ACTIVE, label2: null },
                                                    { label: 'Ngừng hoạt động', value: USER_STATUS.INACTIVE, label2: null },
                                                ]}
                                                placeholder="Chọn trạng thái"
                                                className="w-full"
                                                disabled={isEdit}
                                            />
                                        </div>
                                    </div>
                                    <FormMessage className="ml-45" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="space-y-1 gap-0">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base block font-medium">
                                            Ngày sinh
                                        </FormLabel>
                                        <div className="flex-1">
                                            <FormControl>
                                                {(!isEdit) || (isEdit && field.value) ? (
                                                    <DatePicker
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={isEdit}
                                                        buttonClassName='w-full'
                                                    />
                                                ) : (

                                                    <Input value={""} disabled />
                                                )}
                                            </FormControl>
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
                    Thêm
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: getRoleBasePath(user.role) + '/users' })}
                >
                    Hủy
                </Button>
            </div>
        </>
    )
}
