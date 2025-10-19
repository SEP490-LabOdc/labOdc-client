import { useQuery } from '@tanstack/react-query'
import { companyKeys } from './query-keys'
import apiRequest from '@/config/request';

export const useGetCompanies = () =>
    useQuery({
        queryKey: companyKeys.getCompanies,
        queryFn: async () => {
            const { data } = await apiRequest.get('/api/v1/companies')
            return data
        }
    });

export const useGetCompanyById = (id?: string) =>
    useQuery({
        queryKey: [...companyKeys.getCompanyById, id],
        queryFn: async () => {
            if (!id) throw new Error('Missing company id')
            const { data } = await apiRequest.get(`/api/v1/companies/${id}`)
            return data
        },
        enabled: !!id,
    });

export const useGetCheckList = () =>
    useQuery({
        queryKey: companyKeys.getCheckList,
        queryFn: async () => {
            const body = {
                filters: [
                    {
                        key: "entityType",
                        operator: "EQUAL",
                        value: "COMPANY_REGISTRATION",
                        valueTo: {},
                    },
                ],
                sorts: [],
                page: null,
                size: null,
            };

            const { data } = await apiRequest.post(
                "/api/v1/checklist-templates/search",
                body
            );

            return data?.data;
        },
    });