import { useQuery } from '@tanstack/react-query'
import { companyKeys } from './query-keys'
import apiRequest from '@/config/request';

export const useGetCompanies = () =>
    useQuery({
        queryKey: companyKeys.getCompanies,
        queryFn: async () => {
            const { data } = await apiRequest.get('/api/v1/companies')
            return data
        }
    });
