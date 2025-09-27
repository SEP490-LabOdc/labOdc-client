'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
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
        {
            message: 'Mật khẩu là bắt buộc.',
            path: ['password'],
        }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return password.length >= 8
        },
        {
            message: 'Mật khẩu phải dài tối thiểu 8 ký tự.',
            path: ['password'],
        }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return /[a-z]/.test(password)
        },
        {
            message: 'Mật khẩu phải chứa ít nhất một chữ cái thường.',
            path: ['password'],
        }
    )
    .refine(
        ({ isEdit, password }) => {
            if (isEdit && !password) return true
            return /\d/.test(password)
        },
        {
            message: 'Mật khẩu phải chứa ít nhất một số.',
            path: ['password'],
        }
    )
    .refine(
        ({ isEdit, password, confirmPassword }) => {
            if (isEdit && !password) return true
            return password === confirmPassword
        },
        {
            message: "Mật khẩu không khớp.",
            path: ['confirmPassword'],
        }
    )
type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
    currentRow?: User
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({
    currentRow,
    open,
    onOpenChange,
}: UserActionDialogProps) {
    const isEdit = !!currentRow
    const form = useForm<UserForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow,
                password: '',
                confirmPassword: '',
                isEdit,
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
                isEdit,
            },
    })

    const onSubmit = (values: UserForm) => {
        form.reset()
        showSubmittedData(values)
        onOpenChange(false)
    }

    const isPasswordTouched = !!form.formState.dirtyFields.password

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset()
                onOpenChange(state)
            }}
        >
            <DialogContent className='sm:max-w-lg'>
                <DialogHeader className='text-start'>
                    <DialogTitle>{isEdit ? 'Chỉnh sửa Người dùng' : 'Thêm Người dùng Mới'}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Cập nhật thông tin người dùng tại đây. ' : 'Tạo người dùng mới tại đây. '}
                        Nhấn lưu khi bạn hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <div className='h-[26.25rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
                    <Form {...form}>
                        <form
                            id='user-form'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 px-0.5'
                        >
                            <FormField
                                control={form.control}
                                name='firstName'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Tên
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='John'
                                                className='col-span-4'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='lastName'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Họ
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Doe'
                                                className='col-span-4'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Tên đăng nhập
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='john_doe'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='john.doe@gmail.com'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='phoneNumber'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='+123456789'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>Vai trò</FormLabel>
                                        <SelectDropdown
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                            placeholder='Chọn một vai trò'
                                            className='col-span-4'
                                            items={roles.map(({ label, value }) => ({
                                                label,
                                                value,
                                            }))}
                                        />
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Mật khẩu
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder='VD: S3cur3P@ssw0rd'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Xác nhận Mật khẩu
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                disabled={!isPasswordTouched}
                                                placeholder='VD: S3cur3P@ssw0rd'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type='submit' form='user-form'>
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}