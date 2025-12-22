import { useQuery } from "@tanstack/react-query"
import apiRequest from "@/config/request"
import { transactionKeys } from "./query-keys"
import type { Sort } from "../types"

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
 * Hook to get my transactions with optional query params
 */
export interface GetMyTransactionsParams {
    page?: number
    size?: number
    sortBy?: string
    sortDir?: Sort
}

export const useGetMyTransactions = (params?: GetMyTransactionsParams) => {
    return useQuery({
        queryKey: transactionKeys.getMyTransactions(params),
        queryFn: async () => {
            const queryParams = new URLSearchParams()
            if (params?.page) queryParams.append('page', params.page.toString())
            if (params?.size) queryParams.append('size', params.size.toString())
            if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
            if (params?.sortDir) queryParams.append('sortDir', params.sortDir)

            const queryString = queryParams.toString()
            const url = `/api/v1/transactions/my-transactions${queryString ? `?${queryString}` : ''}`
            const { data } = await apiRequest.get(url)
            return data
        },
    })
}