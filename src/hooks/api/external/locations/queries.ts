import { useQuery } from '@tanstack/react-query'
import { locationKeys } from '@/hooks/api/external'
import axios from 'axios'
import { allProvincesData, wardsData } from './data.ts'


const fetchProvinces = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allProvincesData);
    }, 500);
  });
};

const fetchWardsByProvinceCode = (provinceCode: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matchingProvince = wardsData.find(
        (item) => item.provinceCode === provinceCode
      );
      resolve(matchingProvince || []);
    }, 500);
  });
};

export const useGetProvinces = () =>
  useQuery({
    queryKey: locationKeys.getProvinces,
    queryFn: async () => {
      try {
        const { data } = await axios.get('https://provinces.open-api.vn/api/v2/p/')
        return data
      } catch (e: unknown) {
        console.error(e)
        return fetchProvinces()
      }
    }
  });

export const useGetWardsByProvinceCode = (provinceCode: string) =>
  useQuery({
    queryKey: locationKeys.getWardsByProvinceCode(provinceCode),
    queryFn: async () => {
      try {
        const { data } = await axios.get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
        return data
      } catch (e) {
        console.error(e)
        return fetchWardsByProvinceCode(provinceCode)
      }
    },
    enabled: !!provinceCode,
  });
