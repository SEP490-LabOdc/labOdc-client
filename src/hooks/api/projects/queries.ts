import { useMutation, useQuery } from '@tanstack/react-query'
import { projectKeys } from './query-keys.ts'
import apiRequest from '@/config/request';

export const useGetProjectHiring = () =>
  useQuery({
    queryKey: projectKeys.getProjectHiring,
    queryFn: async () => {
      const { data } = await apiRequest.get('/api/v1/projects/hiring');
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
    }) => {
      const res = await apiRequest.post('/api/v1/projects', payload)
      return res.data
    },
  })
}

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
  return useMutation({
    mutationFn: async (payload: {
      projectId: string
      userIds: string[]
    }) => {
      const res = await apiRequest.post('/api/v1/project-members', payload)
      return res.data
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
    }
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

export function useGetProjectDocuments(status: string) {
  return useQuery({
    queryKey: projectKeys.getMyProjects(status),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/project-documents`);
      return data;
    }
  })
}

export function useGetProjectApplicationStatus(projectId: string) {
  return useQuery({
    queryKey: projectKeys.getProjectApplicationStatus(projectId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/projects/${projectId}/application-status`);
      return data;
    }
  })
}
