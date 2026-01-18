import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import { SelectDropdown } from '@/components/select-dropdown'
import { DOMAIN_OPTIONS } from '@/features/company-classic/data/data'
import { getChangedFields } from '@/helpers/getChangedFields'
import type { UpdatePayload } from '@/types/update'
import { toast } from 'sonner'
import { useUpdateCompanyInfo } from '@/hooks/api/requests'

export const updateCompanySchema = z.object({
    name: z
        .string()
        .min(3, 'Tên công ty tối thiểu 3 ký tự')
        .max(255, 'Tên công ty quá dài'),

    domain: z
        .string()
        .min(2, 'Lĩnh vực không hợp lệ')
        .optional()
        .or(z.literal('')),

    phone: z
        .string()
        .regex(/^[0-9+ ]{8,15}$/, 'Số điện thoại không hợp lệ')
        .or(z.literal('')),

    website: z
        .string()
        .optional()
        .or(z.literal('')),

    address: z
        .string()
        .min(5, 'Địa chỉ quá ngắn')
        .optional()
        .or(z.literal('')),

    description: z
        .string()
        .max(1000, 'Mô tả tối đa 1000 ký tự')
        .optional()
        .or(z.literal('')),
})

export type UpdateCompanyFormValues = z.infer<typeof updateCompanySchema>

type UpdateCompanyModalProps = {
    open: boolean
    onClose: () => void
    company: any
}

export default function UpdateCompanyModal({
    open,
    onClose,
    company,
}: UpdateCompanyModalProps) {
    const form = useForm<UpdateCompanyFormValues>({
        resolver: zodResolver(updateCompanySchema),
        mode: 'onChange',
        defaultValues: {
            name: company?.name ?? '',
            domain: company?.domain ?? '',
            phone: company?.phone ?? '',
            website: company?.website ?? '',
            address: company?.address ?? '',
            description: company?.description ?? '',
        },
    })

    const { mutate: updateCompany, isPending } = useUpdateCompanyInfo(() => {
        onClose();
    });

    useEffect(() => {
        if (open) {
            form.reset({
                name: company?.name ?? '',
                domain: company?.domain ?? '',
                phone: company?.phone ?? '',
                website: company?.website ?? '',
                address: company?.address ?? '',
                description: company?.description ?? '',
            })
        }
    }, [open, company, form])

    const onSubmit = (values: UpdateCompanyFormValues) => {
        const changeData = getChangedFields(
            {
                name: company?.name ?? '',
                domain: company?.domain ?? '',
                phone: company?.phone ?? '',
                website: company?.website ?? '',
                address: company?.address ?? '',
                description: company?.description ?? '',
            },
            values
        )

        if (Object.keys(changeData).length === 0) {
            toast.info('Bạn chưa thay đổi thông tin nào')
            return
        }


        const payload: UpdatePayload = {
            requestType: 'UPDATE_COMPANY',
            targetId: company.id,
            changeData: changeData
        }

        updateCompany(payload);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin công ty</DialogTitle>
                    <DialogDescription>
                        Yêu cầu sẽ được gửi
                        để quản trị viên phê duyệt
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên công ty *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="domain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lĩnh vực</FormLabel>
                                    <FormControl>
                                        <SelectDropdown
                                            defaultValue={field.value ?? 'OTHER'}
                                            onValueChange={field.onChange}
                                            placeholder="Chọn lĩnh vực"
                                            items={DOMAIN_OPTIONS}
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả công ty</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" loading={isPending} disabled={isPending}>
                                Gửi yêu cầu cập nhật
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
