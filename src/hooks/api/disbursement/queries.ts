import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'
import { disbursementKeys } from './query-keys.ts'
import type { Disbursement, PreviewDisbursementParams, PreviewDisbursementResponse } from './types.ts'
import type { ApiResponse } from '../types.ts'

/**
 * Hook to preview disbursement before executing
 */
export function usePreviewDisbursement(
    params: PreviewDisbursementParams,
) {
    return useQuery<PreviewDisbursementResponse, Error>({
        queryKey: disbursementKeys.preview(params.milestoneId, params.totalAmount),
        queryFn: async () => {
            const { data } = await apiRequest.get<PreviewDisbursementResponse>(
                '/api/v1/disbursement/preview',
                {
                    params: {
                        milestoneId: params.milestoneId,
                        totalAmount: params.totalAmount,
                    },
                }
            )
            return data
        },
    })
}

/**
 * Hook to get disbursement by milestone id
 */
export function useGetDisbursementByMilestoneId(milestoneId: string) {
    return useQuery<ApiResponse<Disbursement>, Error>({
        queryKey: disbursementKeys.getDisbursementByMilestoneId(milestoneId),
        queryFn: async () => {
            const { data } = await apiRequest.get<ApiResponse<Disbursement>>(
                `/api/v1/disbursement/milestones/${milestoneId}`
            )
            return data
        },
        enabled: !!milestoneId,
    })
}

