import { useQuery } from "@tanstack/react-query"
import apiRequest from "@/config/request"
import { transactionKeys } from "./query-keys"

/**
 * Hook to get all transactions
 */
export const useGetTransactions = () => {
    return useQuery({
        queryKey: transactionKeys.getTransactions,
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/transactions`)
            return data
        }
    })
}

/**
 * Hook to get a transaction by id
 */
export const useGetTransactionById = (transactionId: string) => {
    return useQuery({
        queryKey: transactionKeys.getTransactionById(transactionId),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/transactions/${transactionId}`)
            return data
        }
    })
}

/**
 * Hook to get transactions by project id
 */
export const useGetTransactionsByProjectId = (projectId: string) => {
    return useQuery({
        queryKey: transactionKeys.getTransactionsByProjectId(projectId),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/transactions/project/${projectId}`)
            return data
        }
    })
}

/**
 * Hook to get my transactions
 */
export const useGetMyTransactions = () => {
    return useQuery({
        queryKey: transactionKeys.getMyTransactions,
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/transactions/my-transactions`)
            return data
        }
    })
}