export interface PaymentDepositPayload {
  amount: number
  returnUrl: string
  cancelUrl: string
}

export interface PaymentDepositResponse {
  paymentUrl?: string
  paymentId?: string
  [key: string]: any
}
