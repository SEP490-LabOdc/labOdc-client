import apiRequest from "@/config/request"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SkillRequest } from "./types"
import { skillKeys } from "./query-keys"


/**
 * Hook to create a skill
 */
export const useCreateSkill = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            name: string,
            description: string
        }) => {
            const { data } = await apiRequest.post(`/api/v1/skills`, payload)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: skillKeys.list(),
            })
        }
    })
}

/**
 * Hook to update a skill
 */
export const useUpdateSkill = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: {
            id: string,
            name: string,
            description: string
        }) => {
            const { data } = await apiRequest.put(`/api/v1/skills/${payload.id}`, payload)
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: skillKeys.byId(variables.id),
            })
            queryClient.invalidateQueries({
                queryKey: skillKeys.list(),
            })
        }
    })
}

/**
 * Hook to delete a skill
 */
export const useDeleteSkill = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiRequest.delete(`/api/v1/skills/${id}`)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: skillKeys.list(),
            })
        }
    })
}


export const useSearchSkills = () => {
    return useMutation({
        mutationFn: async (payload: SkillRequest) => {
            const { data } = await apiRequest.get(`/api/v1/skills/search`, { params: payload })
            return data
        }
    })
}