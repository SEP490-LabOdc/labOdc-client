export const disbursementKeys = {
    all: ['disbursement'] as const,
    preview: (milestoneId: string, totalAmount: number) =>
        ['disbursement', 'preview', milestoneId, totalAmount] as const,
}

