import type { ApiResponse } from '@/hooks/api/types'
import type { DisbursementStatus } from './enums'

/**
 * Payload to calculate disbursement
 */
export interface CalculateDisbursementPayload {
    projectId: string
    milestoneId: string
    mentorLeaderId: string
    talentLeaderId: string
    totalAmount: number
}

/**
 * Response from API calculate disbursement
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
 * Payload to preview disbursement
 */
export interface PreviewDisbursementParams {
    milestoneId: string
    totalAmount: number
}

/**
 * Leader information in preview disbursement
 */
export interface DisbursementLeader {
    userId: string
    fullName: string
    email: string
    avatarUrl: string
    roleInProject: string
    amount: number
    leader: boolean
}

/**
 * Response from API preview disbursement
 */
export interface PreviewDisbursementData {
    milestoneId: string
    totalAmount: number
    systemFee: number
    status: string
    mentorLeader: DisbursementLeader
    talentLeader: DisbursementLeader
}

export type PreviewDisbursementResponse = ApiResponse<PreviewDisbursementData>

/**
 * Payload to execute disbursement
 */
export interface ExecuteDisbursementPayload {
    disbursementId: string
}

/**
 * Response from API execute disbursement
 */
export interface ExecuteDisbursementResult {
    success: boolean
    disbursementId: string
    transactionId?: string
    [key: string]: any
}

export type ExecuteDisbursementResponse = ApiResponse<ExecuteDisbursementResult>

/**
 * Payload to disburse
 */
export interface DisbursePayload {
    milestoneId: string
    disbursements: Array<{
        userId: string
        amount: number
    }>
}

/**
 * Disbursement information
 */
export interface Disbursement {
    disbursementId: string
    milestoneId: string
    totalAmount: number
    systemFee: number
    mentorAmount: number
    mentorLeaderId: string
    talentAmount: number
    talentLeaderId: string
    status: DisbursementStatus
    updatedAt: string
}