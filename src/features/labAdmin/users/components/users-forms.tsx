import { useEffect, useState } from 'react'
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
import { USER_ROLE_OPTIONS, USER_STATUS } from '../data/schema'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Loader2 } from 'lucide-react'
import { useCreateUser, useUpdateUserRole, useUpdateUserStatus } from '@/hooks/api/users/queries'

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
    password: z.string().optional(),
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
    const { mutateAsync: updateUserRole } = useUpdateUserRole();
    const { mutateAsync: updateUserStatus } = useUpdateUserStatus();
    const { mutateAsync: createUser } = useCreateUser();

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
            navigate({ to: '/admin/users' })
        } catch (error) {
            console.error('❌ Create failed:', error)
        }
    }

    const [isRoleModalOpen, setRoleModalOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState(initialData?.role ?? "")
    const [loadingAction, setLoadingAction] = useState<"UPDATE_ROLE" | null>(null)

    const handleChangeRole = async () => {
        if (!initialData?.id || !selectedRole) return

        setLoadingAction("UPDATE_ROLE")

        const updatePromise = updateUserRole({
            id: initialData.id,
            roleName: selectedRole,
        })

        toast.promise(updatePromise, {
            loading: "Đang cập nhật vai trò...",
            success: "Cập nhật vai trò thành công!",
            error: "Cập nhật vai trò thất bại!",
        })

        try {
            await updatePromise
            form.setValue("role", selectedRole);
            setRoleModalOpen(false);
        } catch (error) {
            console.error("❌ Update role failed:", error)
        } finally {
            setLoadingAction(null)
        }
    }

    const handleToggleStatus = async () => {
        if (!initialData?.id) return

        const newStatus =
            initialData.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE

        const updatePromise = updateUserStatus({
            id: initialData.id,
            status: newStatus,
        })

        toast.promise(updatePromise, {
            loading: "Đang cập nhật trạng thái...",
            success:
                newStatus === USER_STATUS.ACTIVE
                    ? "Tài khoản đã được kích hoạt lại!"
                    : "Tài khoản đã bị vô hiệu hóa!",
            error: "Cập nhật trạng thái thất bại!",
        })

        try {
            await updatePromise
            form.setValue("status", newStatus)
        } catch (error) {
            console.error("❌ Update status failed:", error)
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
                                            <Input placeholder="VD: Hoàng Văn Nam" {...field} disabled={isEdit} />
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
                                            <Input placeholder="hoang@example.com" {...field} disabled={isEdit} />
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
                                            <Input {...field} disabled={isEdit} />
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
                                            <Input {...field} disabled={isEdit} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        {!isEdit && (
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <FormLabel className="w-40 text-end text-base font-medium">
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
                                        <FormMessage className="ml-40" />
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
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 text-end text-base font-medium">
                                            Vai trò
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                key={field.value}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Chọn vai trò"
                                                items={USER_ROLE_OPTIONS}
                                                className="w-full"
                                                disabled={isEdit}
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
                                                disabled={isEdit}
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
                                                key={field.value}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                items={[
                                                    { label: 'Hoạt động', value: 'ACTIVE' },
                                                    { label: 'Vô hiệu hóa', value: 'INACTIVE' },
                                                ]}
                                                placeholder="Chọn trạng thái"
                                                className="w-full"
                                                disabled={isEdit}
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
                                            {(!isEdit) || (isEdit && field.value) ? (
                                                <DatePicker
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={isEdit}
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
                {isEdit && (
                    <>
                        {/* <Button
                            type="button"
                            onClick={() => setRoleModalOpen(true)}
                        >
                            Đổi vai trò
                        </Button> */}

                        {initialData?.status === USER_STATUS.ACTIVE ? (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleToggleStatus}
                            >
                                Vô hiệu hóa
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleToggleStatus}
                            >
                                Kích hoạt
                            </Button>
                        )}
                    </>
                )}

                {
                    !isEdit && (
                        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                            Thêm
                        </Button>
                    )
                }

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/lab-admin/users' })}
                >
                    Quay về danh sách
                </Button>
            </div>
        </>
    )
}
