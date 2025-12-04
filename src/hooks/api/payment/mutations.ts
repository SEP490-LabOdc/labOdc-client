import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'
import type { CreatePaymentLinkPayload, PaymentLinkResponse } from './types'

/**
 * Hook to create a payment link for milestone deposit
 */
export function useCreatePaymentLink() {
  return useMutation<PaymentLinkResponse, Error, CreatePaymentLinkPayload>({
    mutationFn: async (payload: CreatePaymentLinkPayload) => {
      const { data } = await apiRequest.post<PaymentLinkResponse>(
        '/api/v1/payment/create-link',
        payload
      )
      return data
    },
    onError: (error: Error) => {
      console.error('Create payment link failed:', error)
      throw error
    },
  })
}
