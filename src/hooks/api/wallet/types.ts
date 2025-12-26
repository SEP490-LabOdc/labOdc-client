import type { ApiResponse } from '@/hooks/api/types'

export interface WalletData {
    id: string
    ownerId: string
    ownerType: string
    balance: number
    heldBalance: number
    currency: string
    status: string
}

export type WalletResponse = ApiResponse<WalletData>

export interface WithdrawPayload {
    amount: number
    bankName: string
    accountNumber: string
    accountName: string
}

