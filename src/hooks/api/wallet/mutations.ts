import apiRequest from "@/config/request"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { WithdrawPayload, BankInfoPayload } from "./types"
import { walletKeys } from "./query-keys"

export const useWithdraw = () => {
    return useMutation({
        mutationFn: async (payload: WithdrawPayload) => {
            const { data } = await apiRequest.post('/api/v1/wallets/withdraw', payload)
            return data
        }
    })
}

export const useCreateBankInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: BankInfoPayload) => {
            const { data } = await apiRequest.post('/api/v1/wallets/bank-info', payload)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: walletKeys.getMyWallet })
        }
    })
}

export const useDeleteBankInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (accountNumber: string) => {
            const { data } = await apiRequest.delete(`/api/v1/wallets/bank-info/${accountNumber}`)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: walletKeys.getMyWallet })
        }
    })
}
