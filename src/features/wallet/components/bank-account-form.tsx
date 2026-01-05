import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Info } from 'lucide-react'

export const BANKS = [
    { value: 'vietcombank', label: 'Vietcombank - Ngân hàng Ngoại thương' },
    { value: 'vietinbank', label: 'VietinBank - Ngân hàng Công thương' },
    { value: 'bidv', label: 'BIDV - Ngân hàng Đầu tư và Phát triển' },
    { value: 'agribank', label: 'Agribank - Ngân hàng Nông nghiệp' },
    { value: 'techcombank', label: 'Techcombank - Ngân hàng Kỹ thương' },
    { value: 'mbbank', label: 'MB Bank - Ngân hàng Quân đội' },
    { value: 'acb', label: 'ACB - Ngân hàng Á Châu' },
    { value: 'vpbank', label: 'VPBank - Ngân hàng Việt Nam Thịnh vượng' },
    { value: 'tpbank', label: 'TPBank - Ngân hàng Tiên Phong' },
    { value: 'sacombank', label: 'Sacombank - Ngân hàng TMCP Sài Gòn Thương Tín' },
]

export const bankAccountSchema = z.object({
    bankName: z.string().min(1, 'Vui lòng chọn ngân hàng'),
    accountNumber: z
        .string()
        .min(1, 'Vui lòng nhập số tài khoản')
        .regex(/^\d+$/, 'Số tài khoản chỉ được chứa chữ số')
        .min(8, 'Số tài khoản phải có ít nhất 8 chữ số')
        .max(20, 'Số tài khoản không được vượt quá 20 chữ số'),
    accountHolder: z
        .string()
        .min(1, 'Vui lòng nhập tên chủ tài khoản')
        .max(50, 'Tên chủ tài khoản không được vượt quá 50 ký tự'),
})

export type BankAccountFormData = z.infer<typeof bankAccountSchema>

interface BankAccountFormProps {
    defaultValues?: Partial<BankAccountFormData>
    onSubmit: (data: BankAccountFormData) => void | Promise<void>
    children?: (form: ReturnType<typeof useForm<BankAccountFormData>>) => React.ReactNode
    showPreview?: boolean
}

export const BankAccountForm: React.FC<BankAccountFormProps> = ({
    defaultValues,
    onSubmit,
    children,
    showPreview = true
}) => {
    const form = useForm<BankAccountFormData>({
        resolver: zodResolver(bankAccountSchema),
        mode: 'onChange',
        defaultValues: {
            bankName: '',
            accountNumber: '',
            accountHolder: '',
            ...defaultValues,
        },
    })

    React.useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues)
        }
    }, [defaultValues, form])

    const bankName = form.watch('bankName')
    const accountNumber = form.watch('accountNumber')
    const accountHolder = form.watch('accountHolder')

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Info Note */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-800">
                            <p className="font-semibold mb-1">Hướng dẫn:</p>
                            <ul className="space-y-0.5 ml-4">
                                <li>• Chỉ được liên kết tài khoản ngân hàng chính chủ</li>
                                <li>• Kiểm tra kỹ thông tin trước khi lưu</li>
                                <li>• Tên chủ tài khoản phải viết KHÔNG DẤU, IN HOA</li>
                                <li>• Số tài khoản phải chính xác để nhận tiền</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bank Name Select */}
                <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngân hàng *</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn ngân hàng..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {BANKS.map((bank) => (
                                        <SelectItem key={bank.value} value={bank.label}>
                                            {bank.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Account Number Input */}
                <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số tài khoản *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nhập số tài khoản..."
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '')
                                        field.onChange(value)
                                    }}
                                    maxLength={20}
                                />
                            </FormControl>
                            <p className="text-xs text-gray-500">
                                Chỉ nhập số, độ dài 8-20 chữ số
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Account Holder Input */}
                <FormField
                    control={form.control}
                    name="accountHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên chủ tài khoản *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="NGUYEN VAN A"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value.toUpperCase())
                                    }}
                                    maxLength={50}
                                />
                            </FormControl>
                            <p className="text-xs text-gray-500">
                                Viết KHÔNG DẤU, IN HOA (ví dụ: NGUYEN VAN A)
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Preview */}
                {showPreview && bankName && accountNumber && accountHolder && (
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-md">
                        <p className="text-xs font-semibold text-green-800 mb-2">
                            Xem trước thông tin:
                        </p>
                        <div className="space-y-1 text-sm">
                            <p className="text-green-900">
                                <strong>Ngân hàng:</strong> {bankName}
                            </p>
                            <p className="text-green-900">
                                <strong>Số TK:</strong> {accountNumber}
                            </p>
                            <p className="text-green-900">
                                <strong>Chủ TK:</strong> {accountHolder}
                            </p>
                        </div>
                    </div>
                )}

                {/* Warning */}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-xs text-yellow-800">
                        <strong>Lưu ý:</strong> Vui lòng kiểm tra kỹ thông tin.
                        Nếu sai số tài khoản hoặc tên chủ TK, tiền có thể bị mất hoặc hoàn trả chậm.
                    </p>
                </div>

                {children?.(form)}
            </form>
        </Form>
    )
}


