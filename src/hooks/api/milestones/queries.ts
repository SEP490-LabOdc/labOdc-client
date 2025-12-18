import { useQuery } from '@tanstack/react-query'
import { milestoneKeys } from './query-keys'
import apiRequest from '@/config/request';
import type { MilestoneMembersResponse } from './types';

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

export function useGetMilestoneById(milestoneId: string) {
    return useQuery({
        queryKey: milestoneKeys.detail(milestoneId),
        queryFn: async () => {
            const res = await apiRequest.get(`/api/v1/project-milestones/${milestoneId}`)
            return res.data
        },
        enabled: !!milestoneId,
    })
}

export function useGetMilestonesById(milestoneId: string) {
    return useQuery({
        queryKey: milestoneKeys.detail(milestoneId),
        queryFn: async () => {
            const res = await apiRequest.get(
                `/api/v1/project-milestones/${milestoneId}`
            );
            return res.data.data;
        },
        enabled: !!milestoneId,
    });
}


export function useGetMilestonesMembers(milestoneId: string) {
    return useQuery<MilestoneMembersResponse>({
        queryKey: milestoneKeys.milestoneMembers(milestoneId),
        queryFn: async () => {
            const { data } = await apiRequest.get<MilestoneMembersResponse>(
                `/api/v1/project-milestones/${milestoneId}/milestone-members`
            );
            return data;
        },
        enabled: !!milestoneId,
    });
}

export function useGetMilestonesMembersByRole(milestoneId: string, role: string) {
    return useQuery<MilestoneMembersResponse>({
        queryKey: milestoneKeys.milestoneMembersByRole(milestoneId, role),
        queryFn: async () => {
            const { data } = await apiRequest.get<MilestoneMembersResponse>(
                `/api/v1/project-milestones/${milestoneId}/milestone-members/by-role?role=${role}`
            );
            return data;
        },
        enabled: !!milestoneId && !!role,
    });
}
