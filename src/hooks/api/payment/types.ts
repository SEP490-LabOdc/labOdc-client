export interface CreatePaymentLinkPayload {
  milestoneId: string
  projectId: string
  companyId: string
  milestoneTitle: string
  amount: number
  returnUrl: string
  cancelUrl: string
}

export interface PaymentLinkResponse {
  paymentUrl?: string
  paymentId?: string
  [key: string]: any
}
