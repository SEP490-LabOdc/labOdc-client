import type { ApiResponse } from '@/hooks/api/types'

/**
 * Payload để tính toán phân bổ tiền
 */
export interface CalculateDisbursementPayload {
    projectId: string
    milestoneId: string
    mentorLeaderId: string
    talentLeaderId: string
    totalAmount: number
}

/**
 * Response từ API calculate disbursement
 */
export interface DisbursementCalculation {
    disbursementId?: string
    totalAmount: number
    systemFee: number
    mentorShare: number
    teamShare: number
    mentorLeaderShare?: number
    talentLeaderShare?: number
    teamMemberShares?: Array<{
        userId: string
        amount: number
    }>
    [key: string]: any
}

export type CalculateDisbursementResponse = ApiResponse<DisbursementCalculation>

/**
 * Payload để xem trước phân bổ tiền
 */
export interface PreviewDisbursementParams {
    milestoneId: string
    totalAmount: number
}

/**
 * Response từ API preview disbursement
 */
export type PreviewDisbursementResponse = ApiResponse<DisbursementCalculation>

/**
 * Payload để thực hiện giải ngân
 */
export interface ExecuteDisbursementPayload {
    disbursementId: string
}

/**
 * Response từ API execute disbursement
 */
export interface ExecuteDisbursementResult {
    success: boolean
    disbursementId: string
    transactionId?: string
    [key: string]: any
}

export type ExecuteDisbursementResponse = ApiResponse<ExecuteDisbursementResult>

