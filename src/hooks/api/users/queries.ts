import { useQuery } from '@tanstack/react-query'

import apiRequest from '@/config/request';
import { userKeys } from './query-keys';

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

// export const useGetCompanyById = (id?: string) =>
//     useQuery({
//         queryKey: [...companyKeys.getCompanyById, id],
//         queryFn: async () => {
//             if (!id) throw new Error('Missing company id')
//             const { data } = await apiRequest.get(`/api/v1/companies/${id}`)
//             return data
//         },
//         enabled: !!id,
//     });
