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
import { Textarea } from '@/components/ui/textarea' // Thêm Textarea cho Description
import { type Company } from '../data/schema' // Đảm bảo đường dẫn này đúng

const formSchema = z.object({
    companyName: z.string().min(1, 'Tên công ty là bắt buộc.'),
    description: z.string().min(1, 'Mô tả của công ty là bắt buộc.').max(500, 'Mô tả không được vượt quá 500 ký tự.'),
    taxId: z.string().min(5, 'Mã số thuế là bắt buộc và phải có ít nhất 5 ký tự.'),
    address: z.string().min(1, 'Địa chỉ là bắt buộc.'),
    industry: z.string().min(1, 'Lĩnh vực công nghiệp là bắt buộc.'),
    techStack: z.string().min(1, 'Ngăn xếp công nghệ là bắt buộc.'),
    accountManagerId: z.string().min(1, 'Người quản lý tài khoản là bắt buộc.'),
    logoUrl: z.string().url('URL logo phải là một địa chỉ hợp lệ.').min(1, 'URL logo là bắt buộc.'),
    // Giữ isEdit để xử lý logic thêm/sửa, không cần trường password/confirmPassword vì đây là Company
    isEdit: z.boolean(),
})
// Loại bỏ các refined validation liên quan đến mật khẩu vì đây là công ty, không phải người dùng.

type CompaniesForm = z.infer<typeof formSchema>

type CompaniesActionDialogProps = {
    currentRow?: Company
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CompaniesActionDialog({
    currentRow,
    open,
    onOpenChange,
}: CompaniesActionDialogProps) {
    const isEdit = !!currentRow
    const form = useForm<CompaniesForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                companyName: currentRow.companyName ?? '',
                description: currentRow.description ?? '',
                taxId: currentRow.taxId ?? '',
                address: currentRow.address ?? '',
                // industry: currentRow.industry ?? '',
                // techStack: currentRow.techStack ?? '',
                // accountManagerId: currentRow.accountManagerId ?? '',
                // logoUrl: currentRow.logoUrl ?? '',
                isEdit,
            }
            : {
                companyName: '',
                description: '',
                taxId: '',
                address: '',
                industry: '',
                techStack: '',
                accountManagerId: '',
                logoUrl: '',
                isEdit,
            },
    })

    const onSubmit = (values: CompaniesForm) => {
        form.reset()
        showSubmittedData(values)
        onOpenChange(false)
    }

    // Đã xóa isPasswordTouched

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset()
                onOpenChange(state)
            }}
        >
            <DialogContent className='sm:max-w-xl'> {/* Tăng kích thước dialog một chút */}
                <DialogHeader className='text-start'>
                    <DialogTitle>{isEdit ? 'Chỉnh sửa Công ty' : 'Thêm Công ty Mới'}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Cập nhật thông tin công ty tại đây. ' : 'Thêm công ty mới vào hệ thống tại đây. '}
                        Nhấn lưu khi bạn hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <div className='h-[30rem] w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
                    <Form {...form}>
                        <form
                            id='company-form' // Đổi tên id
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 px-0.5'
                        >
                            {/* --- COMPANY NAME --- */}
                            <FormField
                                control={form.control}
                                name='companyName'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Tên công ty
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Acme Corp'
                                                className='col-span-4'
                                                autoComplete='off'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- DESCRIPTION (SỬ DỤNG TEXTAREA) --- */}
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 pt-2 text-end'>
                                            Mô tả
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Công ty chuyên về...'
                                                className='col-span-4 resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- TAX ID --- */}
                            <FormField
                                control={form.control}
                                name='taxId'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Mã số thuế
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='0123456789'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- ADDRESS --- */}
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Địa chỉ
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123 Main St, Anytown'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- INDUSTRY --- */}
                            <FormField
                                control={form.control}
                                name='industry'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Lĩnh vực
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Fintech / E-commerce'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- TECH STACK --- */}
                            <FormField
                                control={form.control}
                                name='techStack'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Tech Stack
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='React/Node.js/AWS'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- ACCOUNT MANAGER ID --- */}
                            <FormField
                                control={form.control}
                                name='accountManagerId'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            Người QL Tài khoản
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Jane Doe'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* --- LOGO URL --- */}
                            <FormField
                                control={form.control}
                                name='logoUrl'
                                render={({ field }) => (
                                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                                        <FormLabel className='col-span-2 text-end'>
                                            URL Logo
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='https://example.com/logo.png'
                                                className='col-span-4'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='col-span-4 col-start-3' />
                                    </FormItem>
                                )}
                            />

                            {/* Trường ẩn isEdit được thêm vào Form để sử dụng trong Zod (nếu cần) */}
                            <FormField
                                control={form.control}
                                name='isEdit'
                                render={() => <FormControl><Input type="hidden" /></FormControl>}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type='submit' form='company-form'>
                        Lưu thay đổi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}