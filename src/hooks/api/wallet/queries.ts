import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request'
import { walletKeys } from './query-keys'
import type { WalletResponse } from './types'

/**
 * Hook to get current user's wallet information
 */
export function useGetMyWallet() {
    return useQuery<WalletResponse>({
        queryKey: walletKeys.getMyWallet,
        queryFn: async () => {
            const { data } = await apiRequest.get<WalletResponse>('/api/v1/wallets/me')
            return data
        },
    })
}
