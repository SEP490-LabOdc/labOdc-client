import { useQuery } from '@tanstack/react-query';
import type { BankListResponse } from './types';

export const getBanks = async (): Promise<BankListResponse> => {
    const res = await fetch('https://api.vietqr.io/v2/banks')

    if (!res.ok) {
        throw new Error('Failed to fetch bank list')
    }

    return res.json()
}

export const useGetBanks = () => {
    return useQuery<BankListResponse>({
        queryKey: ['banks'],
        queryFn: getBanks,
        staleTime: 1000 * 60 * 60
    })
}