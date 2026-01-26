import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectKeys } from './query-keys.ts'
import apiRequest from '@/config/request';
import { useAuthStore } from '@/stores/auth-store.ts'

export const useGetProjectHiring = (page: number = 1, pageSize: number = 3) =>
  useQuery({
    queryKey: [...projectKeys.getProjectHiring, page, pageSize],
    queryFn: async () => {
      const { data } = await apiRequest.get('/api/v1/projects/hiring', {
        params: { page, pageSize }
      });
      return data;
    },
  });


export function useGetMyCompanyProjects() {
  return useQuery({
    queryKey: projectKeys.myCompany(),
    queryFn: async () => {
      const res = await apiRequest.get('/api/v1/projects/my-company-projects');
      return res.data;
    }
  });
}

export function useCreateProject() {
  return useMutation({
    mutationFn: async (payload: {
      title: string
      description: string
      skillIds: string[]
      budget: number
      startDate?: Date | string
      endDate?: Date | string
    }) => {
      // Format dates to ISO string if they are Date objects
      const requestBody: any = {
        title: payload.title,
        description: payload.description,
        skillIds: payload.skillIds,
        budget: payload.budget,
      }

      if (payload.startDate) {
        requestBody.startDate = payload.startDate instanceof Date
          ? payload.startDate.toISOString()
          : payload.startDate
      }
      if (payload.endDate) {
        requestBody.endDate = payload.endDate instanceof Date
          ? payload.endDate.toISOString()
          : payload.endDate
      }

      const res = await apiRequest.post('/api/v1/projects', requestBody)
      return res.data
    },
  })
}

export const getProjectByIdQueryOptions = (projectId: string) => ({
  queryKey: projectKeys.byId(projectId),
  queryFn: async () => {
    const res = await apiRequest.get(`/api/v1/projects/${projectId}`)
    return res.data
  },
  enabled: !!projectId,
})

export function useGetProjectById(projectId: string) {
  return useQuery({
    queryKey: projectKeys.byId(projectId),
    queryFn: async () => {
      const res = await apiRequest.get(`/api/v1/projects/${projectId}`)
      return res.data
    },
    enabled: !!projectId,
  })
}

export function useGetProjects() {
  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: async () => {
      const res = await apiRequest.get('/api/v1/projects')
      return res.data
    },
  })
}

export function useLabAdminApproveProject() {
  const queryClient = useQueryClient();;
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      userIds: string[]
    }) => {
      const res = await apiRequest.post('/api/v1/project-members', payload)
      return res.data
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.byId(payload.projectId),
      });
    },
  })
}

export function useGetProjectsParticipants(projectId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectParticipants(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/participants`);
      return data;
    }
  })
}

export function useGetProjectMilestones(projectId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectMilestones(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/milestones`);
      return data;
    },
    enabled: !!projectId,
  })
}

export function useGetProjectApplicants(projectId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectApplicants(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/applicants`);
      return data;
    }
  })
}

export function useGetMyProjects(status: string) {
  return useQuery({
    queryKey: projectKeys.getMyProjects(status),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/my-projects?status=${status}`);
      return data;
    }
  })
}

export function useGetProjectDocuments(projectId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectDocuments(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/documents`);
      return data;
    },
    enabled: !!projectId,
  })
}

export function useGetProjectApplicationStatus(projectId: string | undefined) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: projectKeys.getProjectApplicationStatus(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/application-status`);
      return data;
    },
    enabled: !!projectId && isAuthenticated(),
  })
}


export function useGetProjectMembers(projectId: string, milestoneId?: string) {
  return useQuery({
    queryKey: projectKeys.getProjectMembers(projectId, milestoneId),
    queryFn: async () => {
      const params = milestoneId ? { milestoneId } : {};
      const { data } = await apiRequest.get(
        `/api/v1/projects/${projectId}/project-members`,
        { params }
      );
      return data;
    },
    enabled: !!projectId,
  })
}

export function useGetProjectMilestoneDocuments(milestoneId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectMilestoneDocuments(milestoneId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/project-milestones/${milestoneId}/documents`);
      return data;
    },
    enabled: !!milestoneId,
  })
}

export function useGetProjectMilestoneReports(milestoneId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectMilestoneReports(milestoneId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/reports/milestone/${milestoneId}`);
      return data;
    },
    enabled: !!milestoneId,
  })
}

export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      status: string
      notes?: string
    }) => {
      const { data } = await apiRequest.patch(
        `/api/v1/projects/${payload.projectId}/status`,
        {
          status: payload.status,
          notes: payload.notes
        }
      )
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.byId(variables.projectId),
      });
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      projectId: string;
      title: string;
      description: string;
      budget: number;
      skillIds: string[];
      startDate?: Date | string;
      endDate?: Date | string;
    }) => {
      const { projectId, startDate, endDate, ...body } = payload;

      // Format dates to ISO string if they are Date objects
      const requestBody: any = { ...body };
      if (startDate) {
        requestBody.startDate = startDate instanceof Date
          ? startDate.toISOString()
          : startDate;
      }
      if (endDate) {
        requestBody.endDate = endDate instanceof Date
          ? endDate.toISOString()
          : endDate;
      }

      const { data } = await apiRequest.put(
        `/api/v1/projects/${projectId}`,
        requestBody
      );

      return data;
    },

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.byId(payload.projectId),
      });
    },
  });
}

export function useGetMyApplications() {
  return useQuery({
    queryKey: projectKeys.getMyApplications(),
    queryFn: async () => {
      const { data } = await apiRequest.get('/api/v1/projects/my-applications');
      return data;
    }
  })
}

export function useGetReportRecipients(projectId: string, milestoneId: string) {
  return useQuery({
    queryKey: projectKeys.getReportRecipients(projectId, milestoneId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/reports/recipients?projectId=${projectId}&milestoneId=${milestoneId}`);
      return data;
    }
  })
}

export function useGetProjectsByCompanyId(companyId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectsByCompanyId(companyId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/companies/${companyId}`);
      return data;
    }
  })
}

export function useGetProjectClosureRequest(payload: {
  projectId: string
  role: string
}) {
  return useQuery({
    queryKey: projectKeys.getProjectClosureRequest(payload.projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${payload.projectId}/closure-requests?role=${payload.role}`);
      return data;
    }
  })
}





