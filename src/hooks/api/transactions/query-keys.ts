export const transactionKeys = {
    getTransactions: ['transactions'] as const,
    getTransactionById: (id: string) => ['transactions', id] as const,
    getTransactionsByProjectId: (projectId: string) => ['transactions', 'project', projectId] as const,
    getMyTransactions: ['transactions', 'my-transactions'] as const,
}