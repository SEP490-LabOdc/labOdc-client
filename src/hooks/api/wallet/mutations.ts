import apiRequest from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { WithdrawPayload } from "./types"

export const useWithdraw = () => {
    return useMutation({
        mutationFn: async (payload: WithdrawPayload) => {
            const { data } = await apiRequest.post('/api/v1/wallets/withdraw', payload)
            return data
        }
    })
}
