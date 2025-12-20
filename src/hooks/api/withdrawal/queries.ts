import { useQuery } from "@tanstack/react-query"
import { withdrawalKeys } from "./query-keys"
import apiRequest from "@/config/request"
import type { WithdrawalFilter } from "./types"

export const useGetWithdrawalRequests = (filters: WithdrawalFilter) => {
    return useQuery({
        queryKey: withdrawalKeys.getWithdrawalRequests(filters),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/admin/withdrawal-requests`, { params: filters })
            return data
        }
    })
}

export const useGetWithdrawalRequestById = (id: string) => {
    return useQuery({
        queryKey: withdrawalKeys.getWithdrawalRequestById(id),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/admin/withdrawal-requests/${id}`)
            return data
        }
    })
}