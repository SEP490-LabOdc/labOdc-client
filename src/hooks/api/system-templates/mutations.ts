import apiRequest from "@/config/request"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { systemTemplateKeys } from "./query-keys"

export function useCreateSystemTemplate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: {
            name: string,
            category: string,
            type: string,
            fileUrl: string,
            fileName: string,
            description: string
        }) => {
            const { data } = await apiRequest.post(
                `/api/v1/system-templates`,
                payload
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: systemTemplateKeys.getAllSystemTemplates(),
            })
        }
    })
}

export function useDeleteSystemTemplate() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (templateId: string) => {
            const { data } = await apiRequest.delete(
                `/api/v1/system-templates/${templateId}`,
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: systemTemplateKeys.getAllSystemTemplates(),
            })
        }
    })
}

