import { useQuery } from "@tanstack/react-query";
import { systemTemplateKeys } from "./query-keys";
import apiRequest from "@/config/request";

export function useSystemTemplates(templateType: string) {
    return useQuery({
        queryKey: systemTemplateKeys.getSystemTemplates(templateType),
        queryFn: async () => {
            const { data } = await apiRequest.get(`/api/v1/system-templates/latest?type=${templateType}`);
            return data;
        },
    })
}