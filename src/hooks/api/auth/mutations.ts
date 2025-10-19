import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'
import type { TCompanyRegisterDTO, UserLoginPayload } from './types.ts'

const login = async (payload: UserLoginPayload) => {
  const { data } = await apiRequest.post('/api/v1/auth/login', payload)
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
      const { data } = await apiRequest.post('/api/v1/companies/register', payload)
      return data
    }
  })
}

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ otp, email }: { otp: string, email: string }) => {
      const { data } = await apiRequest.post('/api/v1/otp/verify', {
        otp: otp,
        email: email
      })
      return data
    },
  })
}

export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await apiRequest.post('/api/v1/otp/send', {email})
      return data
    },
  })
}

