import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectKeys } from './query-keys.ts'
import { projects } from './data.ts'
import apiRequest from '@/config/request';

const fetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 500);
  });
};

const fetchProjectsByCompanyId = (companyId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matchingProject = projects.find(
        (item) => item.companyId === companyId
      );
      resolve(matchingProject || []);
    }, 500);
  });
};

export const useGetAllProjects = () =>
  useQuery({
    queryKey: projectKeys.getAllProjects,
    queryFn: async () => {
      const data = await fetchProjects()
      return data
    },
  })

export const useGetProjectsByCompanyId = (companyId: string) =>
  useQuery({
    queryKey: projectKeys.getProjectsByCompanyId(companyId),
    queryFn: async () => {
      const data = await fetchProjectsByCompanyId(companyId);
      return data
    }
  })

export function getMyCompanyProjects() {
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