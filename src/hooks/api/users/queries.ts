import { useQuery } from '@tanstack/react-query'

import apiRequest from '@/config/request';
import { userKeys } from './query-keys';

export const useGetUsers = () =>
    useQuery({
        queryKey: userKeys.getUsers,
        queryFn: async () => {
            const { data } = await apiRequest.get('/api/v1/users')
            return data
        }
    });

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
