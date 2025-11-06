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
