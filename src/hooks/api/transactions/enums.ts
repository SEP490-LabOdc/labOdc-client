export enum TransactionStatus {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    MILESTONE_PAYMENT = 'MILESTONE_PAYMENT',
    DISBURSEMENT = 'DISBURSEMENT',
    ALLOCATION = 'ALLOCATION',
    SYSTEM_FEE = 'SYSTEM_FEE',
    REFUND = 'REFUND',
}

export enum TransactionDirection {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}