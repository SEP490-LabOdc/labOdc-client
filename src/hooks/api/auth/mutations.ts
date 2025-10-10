import axiosInstance from '@/lib/axios.ts'
import { useMutation } from '@tanstack/react-query'
import type { TCompanyRegisterDTO, UserLoginPayload } from './types.ts'

const login = async (payload: UserLoginPayload) => {
  const { data } = await axiosInstance.post('/auth/login', payload)
  return data
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (payload: UserLoginPayload) => login(payload),
  })
}

export const useCompanyRegister = () => {
  return useMutation({
    mutationFn: async (payload: TCompanyRegisterDTO) => {
      const { data } = await axiosInstance.post('/companies/register',payload)
      return data
    }
  })
}