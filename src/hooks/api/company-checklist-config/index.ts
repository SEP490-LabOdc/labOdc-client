import apiRequest from '@/config/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/** ---------- Response Types (Backend Wrapper) ---------- */
export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
  errorCode: string | null
  timestamp: string
}

export interface PageData<T> {
  data: T[]
  totalElements: number
  totalPages: number
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
}

/** ---------- Domain Types ---------- */
export interface ChecklistItem {
  id: string
  content: string
  displayOrder: number
  required: boolean
  isDeleted: boolean // ✅ NEW
}

export interface ChecklistGroup {
  id: string
  title: string
  displayOrder: number
  items: ChecklistItem[]
}

export interface Checklist {
  id: string
  name: string
  description: string
  entityType: string
  createdAt: string
  groups: ChecklistGroup[]
}

/** ---------- Create/Update Payload Types ---------- */
export interface CreateChecklistItemPayload {
  content: string
  displayOrder: number
  required: boolean
  isDeleted?: boolean // ✅ NEW
}

export interface CreateChecklistGroupPayload {
  title: string
  displayOrder: number
  items: CreateChecklistItemPayload[]
}

export interface CreateChecklistPayload {
  name: string
  description: string
  entityType: string
  groups: CreateChecklistGroupPayload[]
}

export interface UpdateChecklistPayload extends CreateChecklistPayload {
  id: string
}

/** ---------- Search Payload ---------- */
export interface ChecklistSearchPayload {
  filters: Array<{
    key: string
    operator: string
    value: string
    valueTo?: Record<string, any>
  }>
  sorts?: Array<{
    key: string
    direction: 'ASC' | 'DESC'
  }>
  page: number
  size: number
}

/** ---------- Query Keys ---------- */
export const checklistKeys = {
  all: () => ['company-checklists'] as const,
  lists: () => [...checklistKeys.all(), 'list'] as const,
  list: (page: number, limit: number, entityType?: string) =>
    [...checklistKeys.lists(), { page, limit, entityType }] as const,
  details: () => [...checklistKeys.all(), 'detail'] as const,
  detail: (id: string) => [...checklistKeys.details(), id] as const,
}

/** ---------- Queries ---------- */
export const useGetCompanyChecklists = (
  page: number = 1,
  limit: number = 10,
  entityType: string = 'COMPANY_REGISTRATION'
) => {
  return useQuery({
    queryKey: checklistKeys.list(page, limit, entityType),
    queryFn: async () => {
      const payload: ChecklistSearchPayload = {
        filters: [
          {
            key: 'entityType',
            operator: 'LIKE',
            value: entityType,
            valueTo: {},
          },
        ],
        sorts: [{ key: 'createdAt', direction: 'ASC' }],
        page,
        size: limit,
      }

      const { data } = await apiRequest.post<ApiResponse<PageData<Checklist>>>(
        '/api/v1/checklist-templates/search',
        payload
      )
      return data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export const useGetCompanyChecklist = (id: string) => {
  return useQuery({
    queryKey: checklistKeys.detail(id),
    queryFn: async () => {
      const { data } = await apiRequest.get<ApiResponse<Checklist>>(
        `/api/v1/checklist-templates/${id}`
      )
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const CHECKLIST_FIXED_ID = '20ec46f7-c336-416c-a0ac-7820040531df'

export const useGetCompanyChecklistFixed = () => {
  return useGetCompanyChecklist(CHECKLIST_FIXED_ID)
}

/** ---------- Mutations ---------- */
export const useCreateCompanyChecklist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateChecklistPayload) => {
      const { data } = await apiRequest.post<ApiResponse<Checklist>>(
        '/api/v1/checklist-templates',
        payload
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checklistKeys.lists() })
    },
  })
}

export const useUpdateCompanyChecklist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateChecklistPayload) => {
      const { data } = await apiRequest.put<ApiResponse<Checklist>>(
        `/api/v1/checklist-templates/${id}`,
        payload
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: checklistKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: checklistKeys.lists() })
    },
  })
}

export const useDeleteCompanyChecklist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiRequest.delete<ApiResponse<null>>(
        `/api/v1/checklist-templates/${id}`
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: checklistKeys.lists() })
    },
  })
}
