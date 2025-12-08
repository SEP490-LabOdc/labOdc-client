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
  bin?: string
  accountNumber?: string
  orderCode?: number
  amount?: number
  description?: string
  checkoutUrl?: string
  qrCode?: string
  status?: string
  paymentUrl?: string // Keep for backward compatibility
  paymentId?: string
  [key: string]: any
}
