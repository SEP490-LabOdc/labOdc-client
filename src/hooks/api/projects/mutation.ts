import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'

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
      startDate: string
      endDate: string
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
  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${milestoneId}/approve`
      )
      return data
    },
  })
}

export function useRejectMilestone() {
  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${milestoneId}/reject`
      )
      return data
    },
  })
}

export function useStartMilestone() {
  return useMutation({
    mutationFn: async (milestoneId: string) => {
      const { data } = await apiRequest.patch(
        `/api/v1/project-milestones/${milestoneId}/start`
      )
      return data
    },
  })
}



