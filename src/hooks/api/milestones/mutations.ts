import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'

/**
 * Update leader status for a milestone member
 */
export function useUpdateMilestoneMemberLeader() {
    return useMutation({
        mutationFn: async (payload: {
            milestoneId: string
            milestoneMemberId: string
            leader: boolean
        }) => {
            const { data } = await apiRequest.patch(
                `/api/v1/project-milestones/${payload.milestoneId}/milestone-members/${payload.milestoneMemberId}/role`,
                { leader: payload.leader }
            )
            return data
        },
    })
}

