import apiRequest from "@/config/request"
import { useMutation } from "@tanstack/react-query"
export interface ApproveWithdrawalPayload {
    withdrawalId: string
    adminNote?: string
}

export interface RejectWithdrawalPayload {
    withdrawalId: string
    adminNote: string
}

export const useApproveWithdrawal = () => {
    return useMutation({
        mutationFn: async (payload: ApproveWithdrawalPayload) => {
            const body = payload.adminNote ? { adminNote: payload.adminNote } : {}
            const { data } = await apiRequest.post(
                `/api/v1/admin/withdrawal-requests/${payload.withdrawalId}/approve`,
                body
            )
            return data
        },
    })
}

export const useRejectWithdrawal = () => {
    return useMutation({
        mutationFn: async (payload: RejectWithdrawalPayload) => {
            const { data } = await apiRequest.post(
                `/api/v1/admin/withdrawal-requests/${payload.withdrawalId}/reject`,
                { adminNote: payload.adminNote }
            )
            return data
        }
    })
}