import apiRequest from '@/config/request.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateSystemConfigPayload, CreateSystemConfigPayload, SystemConfigsResponse, SystemConfig } from './types.ts'
import type { ApiResponse } from '@/hooks/api/types'
import { systemConfigKeys } from './query-keys.ts'

/**
 * Hook để tạo system config mới (generic)
 */
export function useCreateSystemConfig<T = Record<string, any>>() {
    const queryClient = useQueryClient()

    return useMutation<SystemConfig, Error, CreateSystemConfigPayload<T>>({
        mutationFn: async (payload: CreateSystemConfigPayload<T>) => {
            const { data } = await apiRequest.post<ApiResponse<SystemConfig>>(
                '/api/v1/system-configs',
                payload
            )
            return data.data
        },
        onSuccess: () => {
            // Invalidate all system config queries
            queryClient.invalidateQueries({ queryKey: systemConfigKeys.all })
        },
        onError: (error: Error) => {
            console.error('Create system config failed:', error)
            throw error
        },
    })
}

/**
 * Hook để cập nhật system config (generic)
 */
export function useUpdateSystemConfig<T = Record<string, any>>() {
    const queryClient = useQueryClient()

    return useMutation<SystemConfigsResponse, Error, UpdateSystemConfigPayload<T>>({
        mutationFn: async (payload: UpdateSystemConfigPayload<T>) => {
            const { id, properties } = payload
            const { data } = await apiRequest.put<SystemConfigsResponse>(
                `/api/v1/system-configs/${id}`,
                { properties }
            )
            return data
        },
        onSuccess: () => {
            // Invalidate all system config queries
            queryClient.invalidateQueries({ queryKey: systemConfigKeys.all })
        },
        onError: (error: Error) => {
            console.error('Update system config failed:', error)
            throw error
        },
    })
}

