import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import type { TCompanyRegisterDTO, TRefreshTokenDTO, UserLoginGooglePayload, UserLoginPayload } from './types.ts'

const login = async (payload: UserLoginPayload) => {
  const { data } = await apiRequest.post('/api/v1/auth/login', payload)
  return data
}

export const useSignIn = () => {
  const { setTokens } = useAuthStore()

  return useMutation({
    mutationFn: (payload: UserLoginPayload) => login(payload),
    onSuccess: (data) => {
      setTokens(data.data.accessToken, data.data.refreshToken)
    }
  })
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (payload: TRefreshTokenDTO) => {
      const { data } = await apiRequest.post('/api/v1/auth/refresh', payload)

      return data
    },
  })
}

export const useSignInWithGoogle = () => {
  const { setTokens } = useAuthStore()

  return useMutation({
    mutationFn: async (payload: UserLoginGooglePayload) => {
      const { data } = await apiRequest.post('/api/v1/auth/google', payload)
      return data
    },
    onSuccess: (data) => {
      setTokens(data.data.accessToken, data.data.refreshToken)
    }
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

