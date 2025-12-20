import apiRequest from '@/config/request.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PaymentDepositPayload, PaymentDepositResponse, PayMilestonePayload } from './types'
import { milestoneKeys } from '../milestones'

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


export function usePayMilestone() {
  const queryClient = useQueryClient()
  return useMutation<PaymentDepositResponse, Error, PayMilestonePayload>({
    mutationFn: async (payload: PayMilestonePayload) => {
      const { data } = await apiRequest.post<PaymentDepositResponse>(
        '/api/v1/payment/pay-milestone',
        payload
      )
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(data.milestoneId)
      })
    },
    onError: (error: Error) => {
      console.error('Pay milestone failed:', error)
      throw error
    },
  })
}