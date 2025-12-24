import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request'
import { reportKeys } from './query-keys';

export function useGetReportsForLabAdmin(filters?: { page?: number; pageSize?: number }) {
    return useQuery({
        queryKey: reportKeys.list(filters),
        queryFn: async () => {
            const params = new URLSearchParams()
            if (filters?.page) params.append('page', filters.page.toString())
            if (filters?.pageSize) params.append('size', filters.pageSize.toString())

            const { data } = await apiRequest.get(
                `/api/v1/reports/for-lab-admin${params.toString() ? `?${params.toString()}` : ''}`
            )
            return data
        },
    })
}

export function useGetReportById(reportId: string) {
    return useQuery({
        queryKey: reportKeys.byId(reportId),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/reports/${reportId}`)
            return data
        },
        enabled: !!reportId,
    })
}

