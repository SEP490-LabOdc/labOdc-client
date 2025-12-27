import { useQuery } from '@tanstack/react-query'
import apiRequest from '@/config/request';
import { skillKeys } from './query-keys';

/**
 * Hook to get all skills
 */
export const useGetSkills = () => {
    return useQuery({
        queryKey: skillKeys.list(),
        queryFn: async () => {
            const res = await apiRequest.get('/api/v1/skills')
            return res.data.data
        },
    })
}

/**
 * Hook to get a skill by id
 */
export const useGetSkillById = (id: string) => {
    return useQuery({
        queryKey: skillKeys.byId(id),
        queryFn: async () => {
            const res = await apiRequest.get(`/api/v1/skills/${id}`)
            return res.data.data
        },
    })
}
