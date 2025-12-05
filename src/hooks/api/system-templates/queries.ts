import { useQuery } from "@tanstack/react-query";
import { systemTemplateKeys, type FilterOption } from "./query-keys";
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

export function useGetAllSystemTemplates(
    page: number = 1,
    size: number = 100,
    filters: FilterOption[] = []
) {
    return useQuery({
        queryKey: systemTemplateKeys.getAllSystemTemplates(page, size, filters),
        queryFn: async () => {
            const { data } = await apiRequest.post(`/api/v1/system-templates/search`, {
                filters,
                sorts: [],
                page,
                size,
            });
            return data;
        },
    })
}