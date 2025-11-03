import apiRequest from '@/config/request.ts'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { TCompanyRegisterDTO, UserLoginGooglePayload, UserLoginPayload } from './types.ts'

export const authKeys = {
  getAuthToken: ["token"] as const,
}

const login = async (payload: UserLoginPayload) => {
  const { data } = await apiRequest.post('/api/v1/auth/login', payload)
  return data
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (payload: UserLoginPayload) => login(payload),
  })
}

// export const fetchAuthToken = async () => {
//   const { data } = await apiRequest.post('/api/v1/auth/token')
// }

// export const useGetAuthToken = () =>
//   useQuery({
//     queryKey: authKeys.getAuthToken,
//     queryFn: async () => {
//   })


export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async (payload: UserLoginGooglePayload) => {
      const { data } = await apiRequest.post('/api/v1/auth/google', payload)

      return data
    },
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

export const useCompanyRegisterUpdate = (token: string) => {
  return useMutation({
    mutationFn: async (payload: TCompanyRegisterDTO) => {
      const url = '/api/v1/companies/onboard/update';
      
      const body = payload;

      const config = {
        params: {
          token: token
        }
      };

      const { data } = await apiRequest.put(url, body, config);

      return data;
    }
  });
};

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

