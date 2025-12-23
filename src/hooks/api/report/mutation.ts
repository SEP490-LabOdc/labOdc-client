import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiRequest from '@/config/request'
import { reportKeys } from './queries'

export function useApproveReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            reportId: string
            milestoneId: string
            feedback?: string
        }) => {
            const { data } = await apiRequest.patch(
                `/api/v1/admin/reports/${payload.reportId}/approve`,
                {
                    milestoneId: payload.milestoneId,
                    ...(payload.feedback && { feedback: payload.feedback }),
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.all })
        },
    })
}

export function useRejectReport() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            reportId: string
            milestoneId: string
            feedback: string
        }) => {
            const { data } = await apiRequest.patch(
                `/api/v1/admin/reports/${payload.reportId}/reject`,
                {
                    milestoneId: payload.milestoneId,
                    feedback: payload.feedback,
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.all })
        },
    })
}

