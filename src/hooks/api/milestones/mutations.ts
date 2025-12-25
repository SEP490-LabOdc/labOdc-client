import apiRequest from '@/config/request.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ExtensionRequestPayload, UpdateMilestonePayload } from './types'
import { milestoneKeys } from './query-keys'

/**
 * Update leader status for a milestone member
 */
export function useUpdateMilestoneMemberLeader() {
    return useMutation({
        mutationFn: async (payload: {
            milestoneId: string
            milestoneMemberId: string
            leader: boolean
        }) => {
            const { data } = await apiRequest.patch(
                `/api/v1/project-milestones/${payload.milestoneId}/milestone-members/${payload.milestoneMemberId}/role`,
                { isLeader: payload.leader }
            )
            return data
        },
    })
}


export function useUpdateMilestone() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: { milestoneId: string, payload: UpdateMilestonePayload }) => {
            const { data } = await apiRequest.put(
                `/api/v1/project-milestones/${payload.milestoneId}`,
                payload.payload
            )
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: milestoneKeys.detail(variables.milestoneId)
            })
        }
    })
}

export function useCreateExtensionRequest() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: ExtensionRequestPayload) => {
            const { data } = await apiRequest.post(`/api/v1/project-milestones/${payload.milestoneId}/extension-requests`, payload)
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    milestoneKeys.detail(variables.milestoneId),
                    milestoneKeys.milestoneExtensionRequests(variables.milestoneId)
                ]
            })
        }
    })
}

export function useUpdateExtensionRequest() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: {
            milestoneId: string,
            id: string,
            status: string
            reason: string
        }) => {
            const { data } = await apiRequest.patch(`/api/v1/project-milestones/${payload.milestoneId}/extension-requests/${payload.id}`, {
                status: payload.status,
                reason: payload.reason
            })
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    milestoneKeys.detail(variables.milestoneId),
                    milestoneKeys.milestoneExtensionRequests(variables.milestoneId)
                ]
            })
        }
    })
}