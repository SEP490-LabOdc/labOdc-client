import apiRequest from '@/config/request.ts'
import { useMutation } from '@tanstack/react-query'
import type { PaymentDepositPayload, PaymentDepositResponse } from './types'

/**
 * Hook to create a payment deposit
 */
export function usePaymentDeposit() {
  return useMutation<PaymentDepositResponse, Error, PaymentDepositPayload>({
    mutationFn: async (payload: PaymentDepositPayload) => {
      const { data } = await apiRequest.post<PaymentDepositResponse>(
        '/api/v1/payment/deposit',
        payload
      )
      return data
    },
    onError: (error: Error) => {
      console.error('Payment deposit failed:', error)
      throw error
    },
  })
}
