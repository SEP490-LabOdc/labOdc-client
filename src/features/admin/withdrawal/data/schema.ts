import { z } from 'zod'

export const WITHDRAWAL_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const

export const withdrawalStatusSchema = z.nativeEnum(WITHDRAWAL_STATUS)
export type WithdrawalStatus = z.infer<typeof withdrawalStatusSchema>

export const WITHDRAWAL_STATUS_LABEL: Record<string, string> = {
    [WITHDRAWAL_STATUS.PENDING]: 'Chờ duyệt',
    [WITHDRAWAL_STATUS.APPROVED]: 'Đã duyệt',
    [WITHDRAWAL_STATUS.REJECTED]: 'Đã từ chối',
    [WITHDRAWAL_STATUS.PROCESSING]: 'Đang xử lý',
    [WITHDRAWAL_STATUS.COMPLETED]: 'Hoàn thành',
    [WITHDRAWAL_STATUS.CANCELLED]: 'Đã hủy',
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

