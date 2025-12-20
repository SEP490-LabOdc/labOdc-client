export const withdrawalKeys = {
    getWithdrawalRequests: ['withdrawal-requests'] as const,
    getWithdrawalRequestById: (id: string) => ['withdrawal-requests', id] as const,
}