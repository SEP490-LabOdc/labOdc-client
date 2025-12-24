import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiRequest from '@/config/request'
import { reportKeys } from './query-keys'
import type { CreateReportForLabAdminPayload } from './types'

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

export function useReviewReportForLabAdmin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            reportId: string
            milestoneId: string
            feedback: string
            status: string
        }) => {
            const { data } = await apiRequest.put(
                `/api/v1/reports/${payload.reportId}/lab-admin-review`,
                {
                    milestoneId: payload.milestoneId,
                    feedback: payload.feedback,
                    status: payload.status,
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.all })
        },
    })
}

export function useCreateReportForLabAdmin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: CreateReportForLabAdminPayload) => {
            const { data } = await apiRequest.post(
                `/api/v1/reports/for-lab-admin`,
                payload
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.all })
        },
    })
}

export function usePublishReportToCompany() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            reportId: string
            userCompanyId: string
        }) => {
            const { data } = await apiRequest.put(
                `/api/v1/reports/${payload.reportId}/publish-to-company/${payload.userCompanyId}`
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: reportKeys.all })
        },
    })
} 