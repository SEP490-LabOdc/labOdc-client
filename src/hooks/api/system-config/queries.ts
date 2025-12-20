import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'
import { systemConfigKeys } from './query-keys.ts'
import type { SystemConfigsResponse } from './types.ts'

/**
 * Hook để lấy danh sách system configs
 */
export function useGetSystemConfigs(page: number = 1, pageSize: number = 10) {
    return useQuery<SystemConfigsResponse, Error>({
        queryKey: systemConfigKeys.list(page, pageSize),
        queryFn: async () => {
            const { data } = await apiRequest.get<SystemConfigsResponse>(
                '/api/v1/system-configs',
                {
                    params: {
                        page: page,
                        size: pageSize,
                    },
                }
            )
            return data
        },
    })
}

