import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { DatePicker } from '@/components/date-picker'

const languages = [
    { label: 'Tiếng Anh', value: 'en' },
    { label: 'Tiếng Việt', value: 'vi' },
] as const

const accountFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Please enter your name.')
        .min(2, 'Name must be at least 2 characters.')
        .max(30, 'Name must not be longer than 30 characters.'),
    dob: z.date('Please select your date of birth.'),
    language: z.string('Please select a language.'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    name: '',
}

export function AccountForm() {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    })

    function onSubmit(data: AccountFormValues) {
        showSubmittedData(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder='Tên của bạn' {...field} />
                            </FormControl>
                            <FormDescription>
                                Đây là tên sẽ được hiển thị trên hồ sơ của bạn và trong các email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='dob'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Ngày sinh</FormLabel>
                            <DatePicker selected={field.value} onSelect={field.onChange} />
                            <FormDescription>
                                Ngày sinh của bạn được sử dụng để tính tuổi của bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='language'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Ngôn ngữ</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className={cn(
                                                'w-[200px] justify-between',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value
                                                ? languages.find(
                                                    (language) => language.value === field.value
                                                )?.label
                                                : 'Chọn ngôn ngữ'}
                                            <CaretSortIcon className='ms-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                    <Command>
                                        <CommandInput placeholder='Tìm kiếm ngôn ngữ...' />
                                        <CommandEmpty>Không tìm thấy ngôn ngữ nào.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandList>
                                                {languages.map((language) => (
                                                    <CommandItem
                                                        value={language.label}
                                                        key={language.value}
                                                        onSelect={() => {
                                                            form.setValue('language', language.value)
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                'size-4',
                                                                language.value === field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {language.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Đây là ngôn ngữ sẽ được sử dụng trong bảng điều khiển.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Cập nhật tài khoản</Button>
            </form>
        </Form>
    )
}
