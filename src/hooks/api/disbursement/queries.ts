import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'
import { disbursementKeys } from './query-keys.ts'
import type { PreviewDisbursementParams, PreviewDisbursementResponse } from './types.ts'

/**
 * Hook để xem trước phân bổ tiền trước khi thực hiện giải ngân
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

