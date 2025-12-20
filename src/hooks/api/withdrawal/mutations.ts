import apiRequest from "@/config/request"
import { useMutation } from "@tanstack/react-query"

export const useApproveWithdrawal = () => {
    return useMutation({
        mutationFn: async (withdrawalId: string) => {
            const { data } = await apiRequest.post(`/api/v1/admin/withdrawal-requests/${withdrawalId}/approve`)
            return data
        }
    })
}

export const useRejectWithdrawal = () => {
    return useMutation({
        mutationFn: async (withdrawalId: string) => {
            const { data } = await apiRequest.post(`/api/v1/admin/withdrawal-requests/${withdrawalId}/reject`)
            return data
        }
    })
}