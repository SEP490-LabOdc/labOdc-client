import { useQuery } from "@tanstack/react-query"
import { withdrawalKeys } from "./query-keys"
import apiRequest from "@/config/request"

export const useGetWithdrawalRequests = () => {
    return useQuery({
        queryKey: withdrawalKeys.getWithdrawalRequests,
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/admin/withdrawal-requests`)
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