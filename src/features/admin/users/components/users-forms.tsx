// File: components/admin/users/UsersForm.tsx
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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { roles } from '../data/data'
import { type User } from '../data/schema'
import { useNavigate } from '@tanstack/react-router'

const formSchema = z
    .object({
        firstName: z.string().min(1, 'Tên là bắt buộc.'),
        lastName: z.string().min(1, 'Họ là bắt buộc.'),
        username: z.string().min(1, 'Tên đăng nhập là bắt buộc.'),
        phoneNumber: z.string().min(1, 'Số điện thoại là bắt buộc.'),
        email: z.email({
            error: (iss) => (iss.input === '' ? 'Email là bắt buộc.' : undefined),
        }),
        password: z.string().transform((pwd) => pwd.trim()),
        role: z.string().min(1, 'Vai trò là bắt buộc.'),
        confirmPassword: z.string().transform((pwd) => pwd.trim()),
        isEdit: z.boolean(),
    })
    .refine(
        (data) => {
            if (data.isEdit && !data.password) return true
            return data.password.length > 0
        },
        { message: 'Mật khẩu là bắt buộc.', path: ['password'] }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return password.length >= 8
        },
        { message: 'Mật khẩu phải dài tối thiểu 8 ký tự.', path: ['password'] }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return /[a-z]/.test(password)
        },
        { message: 'Mật khẩu phải chứa ít nhất một chữ cái thường.', path: ['password'] }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return /\d/.test(password)
        },
        { message: 'Mật khẩu phải chứa ít nhất một số.', path: ['password'] }
    )
    .refine(
        ({ isEdit, password, confirmPassword }) => {
            if (isEdit && !password) return true
            return password === confirmPassword
        },
        { message: 'Mật khẩu không khớp.', path: ['confirmPassword'] }
    )

export type UserForm = z.infer<typeof formSchema>

export default function UsersForm({
    mode,
    initialData,
}: {
    mode: 'create' | 'edit'
    initialData?: User
}): JSX.Element {
    const navigate = useNavigate()

    const isEdit = mode === 'edit'

    const defaultValues: UserForm = useMemo(
        () =>
            isEdit && initialData
                ? {
                    ...(initialData as any),
                    password: '',
                    confirmPassword: '',
                    isEdit: true,
                }
                : {
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    role: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    isEdit: false,
                },
        [isEdit, initialData]
    )

    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })
    // Khi initialData đến trễ (trang edit), đồng bộ vào form
    useEffect(() => {
        if (isEdit && initialData) {
            form.reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, initialData])

    const onSubmit: any = async (values: UserForm) => {
        const payload: any = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            phoneNumber: values.phoneNumber,
            role: values.role,
        }
        if (!isEdit || values.password) {
            payload.password = values.password
        }

        try {
            const res = await fetch(isEdit ? `/api/users/${(initialData as any)?.id}` : '/api/users', {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error('Lưu thất bại')
            navigate({ to: '/admin/users' })
        } catch (e: any) {
            // Bạn có thể thay bằng toast UI của bạn
            alert(e.message);
            navigate({ to: '/admin/users' });
        }
    }

    const isPasswordTouched = !!form.formState.dirtyFields.password

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
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            First name
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="John" autoComplete="off" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Last name
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="Doe" autoComplete="off" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            User ID
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="abel.tuter" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Business phone
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="+1 234 567 890" {...field} />
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Email
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <Input placeholder="abel.tuter@example.com" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Language / Role
                                        </FormLabel>
                                        <div className="flex-1">
                                            <SelectDropdown
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Chọn một vai trò"
                                                items={roles.map(({ label, value }) => ({ label, value }))}
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
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Password{isEdit ? ' (để trống nếu không đổi)' : ''}
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <PasswordInput placeholder="VD: S3cur3P@ssw0rd" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="ml-40" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="w-40 block text-end text-base font-medium">
                                            Confirm password
                                        </FormLabel>
                                        <FormControl className="flex-1">
                                            <PasswordInput
                                                disabled={isEdit && !isPasswordTouched}
                                                placeholder="VD: S3cur3P@ssw0rd"
                                                {...field}
                                            />
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
                    onClick={() => navigate({ to: '/admin/users' })}
                >
                    Hủy
                </Button>
            </div>
        </>
    )


}