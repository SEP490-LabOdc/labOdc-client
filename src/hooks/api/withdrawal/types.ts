export interface WithdrawalRequest {
    totalPages: number
    totalElements: number
    pageable: {
        pageNumber: number
        pageSize: number
        offset: number
        sort: {
            sorted: boolean
            empty: boolean
            unsorted: boolean
        }
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    first: boolean
    size: number
    content: WithdrawalRequestItem[]
}

export interface WithdrawalRequestItem {
    id: string
    userId: string
    walletId: string
    amount: number
    bankInfo: {
        additionalProp1: string
        additionalProp2: string
        additionalProp3: string
    }
    status: string
    adminNote: string
    scheduledAt: string
    processedAt: string
    createdAt: string
    updatedAt: string
}

export interface WithdrawalFilter {
    status: string
    fromDate: string
    toDate: string
    page: number
    size: number
}