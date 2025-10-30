import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import apiRequest from '@/config/request';
import { userKeys } from './query-keys';

export type UpdateProfilePayload = {
    fullName: string
    phone: string
    gender: 'MALE' | 'FEMALE' | 'OTHER'
    birthDate?: string
    address?: string
    avatarUrl?: string
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            payload,
        }: {
            id: string
            payload: UpdateProfilePayload
        }) => {
            const { data } = await apiRequest.put(`/api/v1/users/${id}/profile`, payload)
            return data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: userKeys.getUserById(variables.id),
            })
            queryClient.invalidateQueries({
                queryKey: userKeys.getUsers,
            })
        },
        onError: (error: any) => {
            console.error('❌ Update profile failed:', error)
            throw error
        },
    })
}

export const fetchUserById = async (userId: string | null) => {
    const { data } = await apiRequest.get(`/api/v1/users/${userId}`)
    return data
}

export const useGetUsers = () =>
    useQuery({
        queryKey: userKeys.getUsers,
        queryFn: async () => {
            const { data } = await apiRequest.get('/api/v1/users')
            return data
        }
    });

export const useGetUserById = (userId: string | null) =>
    useQuery({
        queryKey: userKeys.getUserById(userId),
        queryFn: () => fetchUserById(userId),
        enabled: !!userId
    })

// Hook mới cho user ĐANG ĐĂNG NHẬP
export const useGetMeQuery = () => {
    const userId = localStorage.getItem("user_id")

    return useQuery({
        queryKey: userKeys.getUserById(userId),
        queryFn: () => fetchUserById(userId),
        enabled: !!userId,
    });
};
