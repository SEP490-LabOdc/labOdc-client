export interface PaymentDepositPayload {
  amount: number
  returnUrl: string
  cancelUrl: string
}

export interface PayMilestonePayload {
  milestoneId: string
  projectId: string
  milestoneTitle: string
  amount: number
}

export interface PaymentDepositResponse {
  paymentUrl?: string
  paymentId?: string
  [key: string]: any
}
