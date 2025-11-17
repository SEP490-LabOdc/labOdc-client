import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { milestoneKeys } from './query-keys'
import apiRequest from '@/config/request';

export function useGetMilestonesByProjectId(projectId: string) {
    return useQuery({
        queryKey: milestoneKeys.list(projectId),
        queryFn: async () => {
            const res = await apiRequest.get(
                `/api/v1/projects/${projectId}/milestones`
            )
            return res.data.data
        },
        enabled: !!projectId,
    })
}
