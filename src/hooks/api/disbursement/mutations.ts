import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'
import type {
    CalculateDisbursementPayload,
    CalculateDisbursementResponse,
    ExecuteDisbursementPayload,
    ExecuteDisbursementResponse,
} from './types.ts'
import type { ApiResponse } from '../types.ts'
import type { DisbursePayload } from './types.ts'

/**
 * Hook để tính toán phân bổ tiền cho milestone
 */
export function useCalculateDisbursement() {
    return useMutation<CalculateDisbursementResponse, Error, CalculateDisbursementPayload>({
        mutationFn: async (payload: CalculateDisbursementPayload) => {
            const { data } = await apiRequest.post<CalculateDisbursementResponse>(
                '/api/v1/disbursement/calculate',
                payload
            )
            return data
        },
        onError: (error: Error) => {
            console.error('Calculate disbursement failed:', error)
            throw error
        },
    })
}

/**
 * Hook để thực hiện giải ngân (phân bổ tiền)
 */
export function useExecuteDisbursement() {
    return useMutation<ExecuteDisbursementResponse, Error, ExecuteDisbursementPayload>({
        mutationFn: async (payload: ExecuteDisbursementPayload) => {
            const { data } = await apiRequest.post<ExecuteDisbursementResponse>(
                `/api/v1/disbursement/execute/${payload.disbursementId}`,
                {}
            )
            return data
        },
        onError: (error: Error) => {
            console.error('Execute disbursement failed:', error)
            throw error
        },
    })
}

export function useDisburse() {
    return useMutation<{}, Error, DisbursePayload>({
        mutationFn: async (payload: DisbursePayload) => {
            const { data } = await apiRequest.post<ApiResponse<{}>>(
                `/api/v1/disbursement/milestones/${payload.milestoneId}/disburse`,
                {
                    disbursements: payload.disbursements
                }
            )
            return data
        },
        onError: (error: Error) => {
            console.error('Disburse failed:', error)
            throw error
        },
    })
}

