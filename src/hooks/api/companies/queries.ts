import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

export const useUpdateCompanyRegistration = (token: string) =>
  useQuery({
    queryKey: companyKeys.updateCompanyRegistration(token),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/companies/for-update?token=${token}`);
      return data;
    },
    enabled: !!token,
  })


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

interface PatchPendingCompanyPayload {
    id: string
    status: 'APPROVED' | 'UPDATE_REQUIRED'
    templateId: string
    assigneeId: string
    notes?: string
    items: {
        templateItemId: string
        completedById: string
        isChecked: boolean
    }[]
}

export const usePostPendingCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [...companyKeys.patchCompany],
        mutationFn: async (payload: PatchPendingCompanyPayload) => {
            const { id, status, templateId, assigneeId, notes, items } = payload

            const body = {
                status,
                createChecklistRequest: {
                    templateId,
                    companyId: id,
                    assigneeId,
                    status,
                    notes,
                    items,
                },
            }

            const { data } = await apiRequest.post(`/api/v1/companies/review`, body)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: companyKeys.getCompanyById,
            })
            queryClient.invalidateQueries({
                queryKey: companyKeys.getCompanyChecklists,
            })

            queryClient.invalidateQueries({
                queryKey: companyKeys.getCheckList,
            })
        }
    })
}



export const useGetCompanyChecklists = (id?: string) =>
    useQuery({
        queryKey: [...companyKeys.getCompanyChecklists, id],
        queryFn: async () => {
            if (!id) throw new Error('Missing company id')

            const { data } = await apiRequest.get(`/api/v1/companies/${id}/checklists`)
            return data?.data
        },
        enabled: !!id,
    })