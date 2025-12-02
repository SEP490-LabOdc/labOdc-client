import apiRequest from '@/config/request.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { milestoneKeys } from '@/hooks/api/milestones'

// export function useCreateProject() {
//   return useMutation({
//     mutationFn: async (payload: {
//       title: string
//       description: string
//       skillIds: string[]
//     }) => {
//       const res = await apiRequest.post('/api/v1/projects', payload)
//       return res.data
//     },
//   })
// }

export function useUpdateStatusHiring() {
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      isHiring: boolean
    }) => {
      const { data } = await apiRequest.patch(
        `/api/v1/projects/${payload.projectId}/open-for-applications`,
        { isOpenForApplications: payload.isHiring },
      )
      return data
    }
  })
}

export function useCreateProjectApplication() {
  return useMutation({
    mutationFn: async (payload: {
      userId: string
      projectId: string
      cvUrl: string
    }) => {
      const { data } = await apiRequest.post(
        `/api/v1/project-applications/apply`,
        payload,
      )
      return data
    }
  })
}

export function useApproveProjectApplication() {
  return useMutation({
    mutationFn: async (projectApplicationId: string) => {
      const { data } = await apiRequest.post(
        `/api/v1/project-applications/${projectApplicationId}/approve`
      )
      return data
    },
  })
}

export function useRejectProjectApplication() {
  return useMutation({
    mutationFn: async (payload: {projectApplicationId: string, reviewNotes: string}) => {
      const { data } = await apiRequest.post(
        `/api/v1/project-applications/${payload.projectApplicationId}/reject`,
        { reviewNotes: payload.reviewNotes }
      )
      return data
    }
  })
}

export function useCreateMilestone() {
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      title: string
      description: string
      percentage: number
      startDate: string
      endDate: string
      attachmentUrls?: Array<{
        name: string
        fileName: string
        url: string
      }>
    }) => {
      const { data } = await apiRequest.post(
        `/api/v1/project-milestones`,
        payload
      )
      return data
    }
  })
}


export function useAddTalentToMilestone() {
  return useMutation({
    mutationFn: async (payload: {
      milestoneId: string
      projectMemberIds: string[]
    }) => {
      const { data } = await apiRequest.post(
        `/api/v1/milestone-members/talent`,
        payload
      )
      return data
    }
  })
}

export function useAddProjectDocuments() {
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      documentName: string
      documentUrl: string
      documentType: string
    }) => {
      const { data } = await apiRequest.post(
        `/api/v1/project-documents`,
        payload
      )
      return data
    }
  })
}

export function useApproveMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${milestoneId}/approve`
      )
      return data
    },
    onSuccess: async (_, milestoneId) => {
      await queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(milestoneId)
      })
    }
  })
}

export function useRejectMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      milestoneId: string
      feedbackContent: string
      attachmentUrls: string[]
    }) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${payload.milestoneId}/reject`,
        {
          feedbackContent: payload.feedbackContent,
          attachmentUrls: payload.attachmentUrls
        }
      )
      return data
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(variables.milestoneId)
      })
    }
  })
}

export function useStartMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${milestoneId}/start`
      )
      return data
    },
    onSuccess: async (_, milestoneId) => {
      await queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(milestoneId)
      })
    }
  })
}



