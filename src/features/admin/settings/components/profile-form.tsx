import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = z.object({
    username: z
        .string('Please enter your username.')
        .min(2, 'Username must be at least 2 characters.')
        .max(30, 'Username must not be longer than 30 characters.'),
    email: z.email({
        error: (iss) =>
            iss.input === undefined
                ? 'Please select an email to display.'
                : undefined,
    }),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.url('Please enter a valid URL.'),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: 'I own a computer.',
    urls: [
        { value: 'https://shadcn.com' },
        { value: 'http://twitter.com/shadcn' },
    ],
}

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const { fields, append } = useFieldArray({
        name: 'urls',
        control: form.control,
    })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
                className='space-y-8'
            >
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input placeholder='shadcn' {...field} />
                            </FormControl>
                            <FormDescription>
                                Đây là tên hiển thị công khai của bạn. Nó có thể là tên thật hoặc biệt danh của bạn. Bạn chỉ có thể thay đổi tên này một lần sau mỗi 30 ngày.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Chọn một email đã xác minh để hiển thị' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Bạn có thể quản lý các địa chỉ email đã xác minh trong{' '}
                                <Link to='/'>cài đặt email</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tiểu sử</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Kể cho chúng tôi một chút về bản thân bạn'
                                    className='resize-none'
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Bạn có thể <span>@mention</span> những người dùng và tổ chức khác để liên kết đến họ.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                                        Đường dẫn (URLs)
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                                        Thêm liên kết đến trang web, blog, hoặc hồ sơ mạng xã hội của bạn.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        className='mt-2'
                        onClick={() => append({ value: '' })}
                    >
                        Thêm đường dẫn
                    </Button>
                </div>
                <Button type='submit'>Cập nhật hồ sơ</Button>
            </form>
        </Form>
    )
}