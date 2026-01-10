export const transactionKeys = {
    getTransactions: ['transactions'] as const,
    getTransactionById: (id: string) => ['transactions', id] as const,
    getTransactionsByProjectId: (projectId: string, filters?: { page?: number; size?: number; sortBy?: string; sortDir?: string }) =>
        ['transactions', 'project', projectId, { filters }] as const,
    getMyTransactions: (filters?: { page?: number; size?: number; sortBy?: string; sortDir?: string }) =>
        ['transactions', 'my-transactions', { filters }] as const,
}