import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateProject() {
  return useMutation({
    mutationFn: async (payload: {
      title: string
      description: string
      skillIds: string[]
    }) => {
      const res = await apiRequest.post('/api/v1/projects', payload)
      return res.data
    },
  })
}

export function useUpdateStatusHiring() {
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      isHiring: boolean
    }) => {
      const { data } = await apiRequest.patch(
        `/api/v1/projects/${payload.projectId}/open-for-applicatiions`,
        { isOpenForApplications: payload.isHiring },
      )
      return data
    }
  })
}