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
import { DatePicker } from '@/components/date-picker'
import { SelectDropdown } from '@/components/select-dropdown'
import { useGetUserById, useUpdateProfile } from '@/hooks/api/users'
import { toast } from 'sonner'

// ✅ Schema khớp với API /api/v1/users/{id}/profile
const profileSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc.'),
    phone: z.string().min(1, 'Số điện thoại là bắt buộc.'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    birthDate: z.date(),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    avatarUrl: z.string().url('Avatar phải là URL hợp lệ.').optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export function AccountForm() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null

    const { data: userData, isLoading, refetch } = useGetUserById(userId);

    const { mutateAsync: updateProfile } = useUpdateProfile()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            gender: 'OTHER',
            birthDate: new Date(),
            address: '',
            avatarUrl: '',
        },
    })

    useEffect(() => {
        if (userId) refetch()
    }, [userId, refetch])

    useEffect(() => {
        if (userData) {
            form.reset({
                fullName: userData.data.fullName ?? '',
                phone: userData.data.phone ?? '',
                gender: userData.data.gender ?? 'OTHER',
                birthDate: userData.data.birthDate ? new Date(userData.data.birthDate) : new Date(),
                address: userData.data.address ?? '',
                avatarUrl: userData.data.avatarUrl ?? '',
            })
        }
    }, [userData, form])

    // 🔹 Submit form để cập nhật profile
    const onSubmit = async (values: ProfileFormValues) => {
        if (!userId) return toast.error('Không tìm thấy ID người dùng!')

        const promise = updateProfile({
            id: userId,
            payload: {
                fullName: values.fullName,
                phone: values.phone,
                gender: values.gender,
                birthDate: values.birthDate.toISOString().split('T')[0],
                address: values.address,
                avatarUrl: values.avatarUrl,
            },
        })

        toast.promise(promise, {
            loading: 'Đang cập nhật hồ sơ...',
            success: 'Cập nhật hồ sơ thành công!',
            error: 'Cập nhật thất bại, vui lòng thử lại!',
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
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="VD: Hoàng Văn Nam" {...field} />
                                </FormControl>
                                <FormDescription>Tên hiển thị công khai của bạn.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="+84 908 899 008" {...field} />
                                </FormControl>
                                <FormDescription>Dùng để liên hệ và xác minh tài khoản.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <SelectDropdown
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Chọn giới tính"
                                    items={[
                                        { label: 'Nam', value: 'MALE' },
                                        { label: 'Nữ', value: 'FEMALE' },
                                        { label: 'Khác', value: 'OTHER' },
                                    ]}
                                    className="w-[200px]"
                                />
                                <FormDescription>Chọn giới tính phù hợp của bạn.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ</FormLabel>
                                <FormControl>
                                    <Input placeholder="VD: Hà Nội" {...field} />
                                </FormControl>
                                <FormDescription>Nơi bạn đang sinh sống.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="avatarUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh đại diện (URL)</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormDescription>Dán liên kết ảnh đại diện của bạn.</FormDescription>
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
