import { useQuery } from '@tanstack/react-query'
import { locationKeys } from '@/hooks/api/external'
import axios from 'axios'

export const useGetProvinces = () =>
  useQuery({
    queryKey: locationKeys.getProvinces,
    queryFn: async () => {
      const { data } = await axios.get('https://provinces.open-api.vn/api/v2/p/')
      return data
    }
  });

export const useGetWardsByProvinceCode = (provinceCode: string) =>
  useQuery({
    queryKey: locationKeys.getWardsByProvinceCode(provinceCode),
    queryFn: async () => {
      const { data } = await axios.get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
      return data
    },
    enabled: !!provinceCode,
  });
