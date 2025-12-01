import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request';
import { skillKeys } from './query-keys';

export function useGetSkills() {
    return useQuery({
        queryKey: skillKeys.list(),
        queryFn: async () => {
            const res = await apiRequest.get('/api/v1/skills')
            return res.data.data
        },
    })
}