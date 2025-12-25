import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/date-picker'
import { useCreateExtensionRequest } from '@/hooks/api/milestones/mutations'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import type { MilestoneDetail } from '@/hooks/api/milestones/types'
import { format } from 'date-fns'

const extensionRequestSchema = z.object({
    requestedEndDate: z.date({
        message: 'Vui lòng chọn ngày kết thúc mới',
    }),
    requestReason: z.string().min(1, 'Vui lòng nhập lý do gia hạn'),
}).refine((data) => {
    // requestedEndDate should be after current date
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(data.requestedEndDate)
    selectedDate.setHours(0, 0, 0, 0)
    return selectedDate > today
}, {
    message: 'Ngày kết thúc mới phải sau ngày hiện tại',
    path: ['requestedEndDate'],
})

type ExtensionRequestFormData = z.infer<typeof extensionRequestSchema>

interface ExtensionRequestModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    milestone: MilestoneDetail
    onSuccess?: () => void
}

export function ExtensionRequestModal({
    open,
    onOpenChange,
    milestone,
    onSuccess
}: ExtensionRequestModalProps) {
    const form = useForm<ExtensionRequestFormData>({
        resolver: zodResolver(extensionRequestSchema),
        defaultValues: {
            requestedEndDate: undefined,
            requestReason: '',
        },
    })

    const { mutateAsync: createExtensionRequest, isPending } = useCreateExtensionRequest()

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            form.reset()
        }
    }, [open, form])

    const onSubmit = async (data: ExtensionRequestFormData) => {
        try {
            // Validate that requested date is after current milestone end date
            const currentEndDate = new Date(milestone.endDate)
            currentEndDate.setHours(0, 0, 0, 0)
            const requestedDate = new Date(data.requestedEndDate)
            requestedDate.setHours(0, 0, 0, 0)

            if (requestedDate <= currentEndDate) {
                form.setError('requestedEndDate', {
                    type: 'manual',
                    message: 'Ngày kết thúc mới phải sau ngày kết thúc hiện tại'
                })
                return
            }

            // Format dates to ISO string
            const requestedEndDateISO = format(data.requestedEndDate, 'yyyy-MM-dd')
            const currentEndDateISO = format(new Date(milestone.endDate), 'yyyy-MM-dd')

            await createExtensionRequest({
                milestoneId: milestone.id,
                requestedEndDate: requestedEndDateISO,
                currentEndDate: currentEndDateISO,
                requestReason: data.requestReason.trim(),
            })

            toast.success('Yêu cầu gia hạn đã được gửi thành công')
            form.reset()
            onOpenChange(false)
            onSuccess?.()
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        if (!isPending) {
            form.reset()
            onOpenChange(false)
        }
    }

    // Get minimum date (should be after current end date)
    const currentEndDate = new Date(milestone.endDate)
    currentEndDate.setHours(0, 0, 0, 0)
    const minDate = new Date(currentEndDate)
    minDate.setDate(minDate.getDate() + 1) // At least 1 day after current end 

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Gửi yêu cầu gia hạn milestone</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="bg-gray-50 p-3 rounded-md text-sm">
                            <p className="font-medium mb-1">Thông tin milestone hiện tại:</p>
                            <p>Ngày kết thúc hiện tại: <span className="font-medium">{format(new Date(milestone.endDate), 'dd/MM/yyyy')}</span></p>
                        </div>

                        <FormField
                            control={form.control}
                            name="requestedEndDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="required">Ngày kết thúc mới</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            placeholder="Chọn ngày kết thúc mới"
                                            disabled={isPending}
                                            minDate={minDate}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="requestReason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="required">Lý do gia hạn</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Nhập lý do cần gia hạn milestone..."
                                            rows={6}
                                            disabled={isPending}
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isPending}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-yellow-600 hover:bg-yellow-700"
                            >
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Gửi yêu cầu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

