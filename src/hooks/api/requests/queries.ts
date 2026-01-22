import { type RequestList, type UpdateDetailRequest } from './../../../features/requests/data/schema';
import { useQuery } from "@tanstack/react-query";
import apiRequest from "@/config/request";
import { requestKeys } from './query-keys';

export const useGetRequests = (
  payload = {
    filters: [],
    sorts: [],
  }
) => {
  return useQuery({
    queryKey: requestKeys.list(payload),
    queryFn: async (): Promise<RequestList> => {
      const res = await apiRequest.post(
        "/api/v1/update-requests/search",
        payload
      );
      return res.data.data.data;
    },
  });
};

export const useGetRequestDetail = (requestId: string) => {
  return useQuery({
    queryKey: requestKeys.byId(requestId),
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/v1/update-requests/${requestId}`)
      return data.data as UpdateDetailRequest
    },
    enabled: !!requestId,
  })
};



