import { WithdrawalStatus } from '@/hooks/api/withdrawal/enums'
import { z } from 'zod'


export const WITHDRAWAL_STATUS_LABEL: Record<string, string> = {
    [WithdrawalStatus.PENDING]: 'Chờ duyệt',
    [WithdrawalStatus.APPROVED]: 'Đã duyệt',
    [WithdrawalStatus.REJECTED]: 'Đã từ chối',
    [WithdrawalStatus.PROCESSED]: 'Đã xử lý',
}

export const WITHDRAWAL_STATUS_OPTIONS = Object.entries(WITHDRAWAL_STATUS_LABEL).map(
    ([value, label]) => ({ value, label })
)

export const withdrawalRequestItemSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    walletId: z.string().uuid(),
    amount: z.number(),
    bankInfo: z.object({
        bankName: z.string().optional(),
        accountNumber: z.string().optional(),
        accountHolder: z.string().optional(),
        additionalProp1: z.string().optional(),
        additionalProp2: z.string().optional(),
        additionalProp3: z.string().optional(),
    }).catchall(z.unknown()),
    status: z.string(),
    adminNote: z.string().nullable().optional(),
    scheduledAt: z.string().datetime().nullable().optional(),
    processedAt: z.string().datetime().nullable().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})

export type WithdrawalRequestItem = z.infer<typeof withdrawalRequestItemSchema>

