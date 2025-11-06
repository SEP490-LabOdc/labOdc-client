import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import apiRequest from '@/config/request';
import { projectKeys } from './query-keys';

export function getMyCompanyProjects() {
    return useQuery({
        queryKey: projectKeys.myCompany(),
        queryFn: async () => {
            const res = await apiRequest.get('/api/v1/projects/my-company-projects');
            return res.data;
        }
    });
}
