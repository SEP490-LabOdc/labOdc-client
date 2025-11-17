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

export const useUpdateUserRole = () => {
    return useMutation({
        mutationFn: async ({
            id,
            roleName,
        }: {
            id: string
            roleName: string
        }) => {
            const { data } = await apiRequest.put(`/api/v1/users/${id}/role`, {
                roleName,
            })
            return data
        },
        onError: (error: any) => {
            console.error('❌ Update role failed:', error)
            throw error
        },
    })
}

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string
            status: string
        }) => {
            const { data } = await apiRequest.put(
                `/api/v1/users/${id}/status`,
                null,
                {
                    params: { status },
                }
            )
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
            console.error("❌ Update user status failed:", error)
            throw error
        },
    })
}

export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (payload: any) => {
            const { data } = await apiRequest.post("/api/v1/users", payload)
            return data
        },
        onError: (error: any) => {
            console.error("❌ Create user failed:", error)
            throw error
        },
    })
}


export const fetchMentorsByProjectId = async (projectId: string) => {
    const response = await apiRequest.get(
        `/api/v1/project-members/available-mentors/${projectId}`
    );

    return response.data;
};

export const useGetMentorByProjectId = (projectId: string | null) =>
    useQuery({
        queryKey: userKeys.availableMentors(projectId),
        queryFn: async () => {
            const res = await fetchMentorsByProjectId(projectId!);
            return res.data;
        },
        enabled: !!projectId,
    });