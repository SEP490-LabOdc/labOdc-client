import apiRequest from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { SearchCompaniesPayload } from "./types"

export const useSearchCompanies = () => {
    return useMutation({
        mutationFn: async (payload: SearchCompaniesPayload) => {
            const { data } = await apiRequest.post('/api/v1/companies/search', payload)
            return data
        }
    })
}