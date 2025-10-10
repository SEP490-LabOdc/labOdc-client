import { useQuery } from '@tanstack/react-query'
import { locationKeys } from '@/hooks/api/external'
import axiosInstance from '@/lib/axios.ts'

export const useGetProvinces = () =>
  useQuery({
    queryKey: locationKeys.getProvinces,
    queryFn: async () => {
        const { data } = await axiosInstance.get('https://provinces.open-api.vn/api/v2/p/')
        return data
    }
  });

export const useGetWardsByProvinceCode = (provinceCode: string) =>
  useQuery({
    queryKey: locationKeys.getWardsByProvinceCode(provinceCode),
    queryFn: async () => {
      const { data } = await axiosInstance.get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
      return data
    },
    enabled: !!provinceCode,
  });
