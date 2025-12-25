import { useQuery } from '@tanstack/react-query'
import { dashboardKey, walletKeys } from './query-keys'
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

export const useGetProjectDashboardOverview = () =>
    useQuery({
        queryKey: dashboardKey.projectOverview,
        queryFn: async () => {
            const { data } = await apiRequest.get(
                '/api/v1/projects/dashboard/overview'
            )
            return data?.data
        },
    })


export const useGetCompanyDashboardOverview = () =>
    useQuery({
        queryKey: dashboardKey.companyOverview,
        queryFn: async () => {
            const { data } = await apiRequest.get(
                '/api/v1/companies/dashboard/overview'
            )
            return data?.data
        },
    })

export const useGetUserDashboardOverview = () =>
    useQuery({
        queryKey: dashboardKey.userOverview,
        queryFn: async () => {
            const { data } = await apiRequest.get(
                '/api/v1/users/dashboard/overview'
            )
            return data?.data
        },
    })

export const useGetMyWallet = () =>
    useQuery({
        queryKey: walletKeys.me(),
        queryFn: async () => {
            const { data } = await apiRequest.get('/api/v1/wallets/me')
            return data.data
        },
    })