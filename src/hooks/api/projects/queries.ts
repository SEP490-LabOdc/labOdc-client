import { useQuery } from '@tanstack/react-query'
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

export function getMyCompanyProjects() {
    return useQuery({
        queryKey: projectKeys.myCompany(),
        queryFn: async () => {
            const res = await apiRequest.get('/api/v1/projects/my-company-projects');
            return res.data;
        }
    });
}


