import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'
import { type SkillForm, skillFormSchema } from '../data/schema'
import { Checkbox } from '@/components/ui/checkbox'


type SkillsFormProps = {
    mode: 'create' | 'edit'
    initialData?: Partial<SkillForm> & { id?: string }
    onSubmit: (values: SkillForm) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

export function SkillsForm({
    mode,
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: SkillsFormProps) {
    const isEdit = mode === 'edit'

    const form = useForm<SkillForm>({
        resolver: zodResolver(skillFormSchema),
        defaultValues: {
            name: initialData?.name ?? '',
            description: initialData?.description ?? '',
            isDeleted: initialData?.isDeleted ?? false,
        },
    })

    const handleSubmit = async (values: SkillForm) => {
        await onSubmit(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên kỹ năng *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='VD: React, Node.js, Python...'
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Mô tả về kỹ năng...'
                                    {...field}
                                    disabled={isLoading}
                                    rows={4}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='isDeleted'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>Đánh dấu là không hoạt động</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <div className='flex justify-end gap-2 pt-4'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Hủy
                    </Button>
                    <Button type='submit' disabled={isLoading}>
                        {isLoading
                            ? 'Đang xử lý...'
                            : isEdit
                                ? 'Cập nhật'
                                : 'Tạo mới'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

