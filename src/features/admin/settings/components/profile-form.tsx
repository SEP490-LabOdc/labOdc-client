import { useEffect } from 'react'
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
import { useGetUserById, useUpdateProfile } from '@/hooks/api/users'
import { toast } from 'sonner'
import type { UpdateProfilePayload } from '@/hooks/api/users/queries'
import { DatePicker } from '@/components/date-picker'
import { ImageUpload } from '@/components/admin/ImageUpload'

// ============================
//  SCHEMA
// ============================
const profileSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên không được bỏ trống.'),
    phone: z.string().min(1, 'Số điện thoại không được bỏ trống.'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    birthDate: z.date().optional(),
    address: z.string().optional(),
    avatarUrl: z.string('Cần cập nhật ảnh đại diện.').optional(),
    email: z.string().optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>


// ============================
//  COMPONENT
// ============================
export function ProfileForm() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null

    const { data: userData, isLoading, refetch } = useGetUserById(userId)
    const { mutateAsync: updateProfile } = useUpdateProfile()

    // Form setup
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            gender: 'OTHER',
            birthDate: undefined,
            address: '',
            avatarUrl: '',
            email: ''
        },
    })

    // Re-fetch khi có userId
    useEffect(() => {
        if (userId) refetch()
    }, [userId, refetch])

    // Khi có userData → fill form
    useEffect(() => {
        if (!userData) return

        const u = userData.data

        form.reset({
            fullName: u.fullName ?? '',
            phone: u.phone ?? '',
            gender: u.gender ?? 'OTHER',
            birthDate: u.birthDate ? new Date(u.birthDate) : undefined,
            address: u.address ?? '',
            avatarUrl: u.avatarUrl ?? '',
            email: u.email ?? ''
        })
    }, [userData, form])

    const onSubmit = async (values: ProfileFormValues) => {
        if (!userId) return toast.error('Không tìm thấy ID người dùng!')

        const payload = {
            fullName: values.fullName,
            phone: values.phone,
            gender: values.gender,
            birthDate: values.birthDate
                ? values.birthDate.toISOString().split('T')[0]
                : null,
            address: values.address,
            avatarUrl: values.avatarUrl,
        }

        const promise = updateProfile({
            id: userId!,
            payload: payload
        } as { id: string; payload: UpdateProfilePayload })

        toast.promise(promise, {
            loading: 'Đang cập nhật...',
            success: 'Cập nhật hồ sơ thành công!',
            error: 'Có lỗi xảy ra!',
        })

        await promise
    }

    if (isLoading) {
        return <p className="text-center py-6">Đang tải dữ liệu người dùng...</p>
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="VD: Hoàng Văn Nam" {...field} />
                                </FormControl>
                                <FormDescription>Tên hiển thị công khai.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled {...field} />
                                </FormControl>
                                <FormDescription>Email không thể thay đổi.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="+84 987 654 321" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>

                                <SelectDropdown
                                    defaultValue={field.value ?? 'OTHER'}
                                    onValueChange={field.onChange}
                                    placeholder="Chọn giới tính"
                                    items={[
                                        { label: 'Nam', value: 'MALE', label2: null },
                                        { label: 'Nữ', value: 'FEMALE', label2: null },
                                        { label: 'Khác', value: 'OTHER', label2: null },
                                    ]}
                                    className="w-[200px]"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Birth Date */}
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày sinh</FormLabel>
                                <DatePicker selected={field.value} onSelect={field.onChange} />
                                <FormDescription>Ngày sinh của bạn.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ</FormLabel>
                                <FormControl>
                                    <Input placeholder="VD: Hà Nội" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Avatar */}
                    <FormField
                        control={form.control}
                        name='avatarUrl'
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel className="text-sm font-medium text-[#264653]">
                                    Ảnh đại diện
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => field.onChange(url)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-start pb-3">
                        <Button type="submit">Cập nhật hồ sơ</Button>
                    </div>

                </form>
            </Form>
        </div>
    )
}
