import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request'

export const reportKeys = {
    all: ['reports'] as const,
    lists: () => [...reportKeys.all, 'list'] as const,
    list: (filters?: { status?: string; page?: number; size?: number }) =>
        [...reportKeys.lists(), { filters }] as const,
    byId: (id: string) => [...reportKeys.all, 'by-id', id] as const,
}

export function useGetReports(filters?: { status?: string; page?: number; size?: number }) {
    return useQuery({
        queryKey: reportKeys.list(filters),
        queryFn: async () => {
            const params = new URLSearchParams()
            if (filters?.status) params.append('status', filters.status)
            if (filters?.page) params.append('page', filters.page.toString())
            if (filters?.size) params.append('size', filters.size.toString())

            const { data } = await apiRequest.get(
                `/api/v1/admin/reports${params.toString() ? `?${params.toString()}` : ''}`
            )
            return data
        },
    })
}

export function useGetReportById(reportId: string) {
    return useQuery({
        queryKey: reportKeys.byId(reportId),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/admin/reports/${reportId}`)
            return data
        },
        enabled: !!reportId,
    })
}

