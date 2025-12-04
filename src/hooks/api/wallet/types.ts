export interface WalletData {
    id: string
    ownerId: string
    ownerType: string
    balance: number
    heldBalance: number
    currency: string
    status: string
}

export interface WalletResponse {
    success: boolean
    message: string
    data: WalletData
    errorCode?: string
    timestamp: string
}

