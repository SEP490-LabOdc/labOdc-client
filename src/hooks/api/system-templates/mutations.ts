import apiRequest from "@/config/request"
import { useMutation } from "@tanstack/react-query"

export function useCreateMilestoneDocument() {
    return useMutation({
        mutationFn: async (payload: {
            name: string,
            type: string,
            fileUrl: string,
            fileName: string,
            description: string
        }) => {
            const { data } = await apiRequest.post(
                `/api/v1/system-templates`,
                { payload }
            )
            return data
        }
    })
}

export function useDeleteSystemTemplates() {
    return useMutation({
        mutationFn: async (templateId: string) => {
            const { data } = await apiRequest.delete(
                `/api/v1/system-templates/${templateId}`,
            )
            return data
        }
    })
}

