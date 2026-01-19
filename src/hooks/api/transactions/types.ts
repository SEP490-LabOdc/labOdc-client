import type { TransactionDirection, TransactionStatus, TransactionType } from "./enums"

export interface Transaction {
    id: string
    amount: number
    type: TransactionType
    direction: TransactionDirection
    description: string
    status: TransactionStatus
    balanceAfter: number
    walletId: string
    refId: string
    refType: string
    projectId?: string
    milestoneId?: string
    companyId?: string
    createdAt: string
    updatedAt: string
}