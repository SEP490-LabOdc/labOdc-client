import { useQuery } from '@tanstack/react-query'
import { dashboardKey } from './query-keys'
import apiRequest from '@/config/request';

export const useGetCompanyLast6MonthStatistic = () =>
    useQuery({
        queryKey: dashboardKey.getCompanyLast6MonthStatistic,
        queryFn: async () => {
            const { data } = await apiRequest.get(
                '/api/v1/companies/statistics/new-last-6-months'
            )
            return data?.data
        },
    })


export const useGetProjectLast6MonthStatistic = () =>
    useQuery({
        queryKey: dashboardKey.getProjectLast6MonthStatistic,
        queryFn: async () => {
            const { data } = await apiRequest.get(
                '/api/v1/projects/statistics/new-last-6-months'
            )
            return data?.data
        },
    })
