export const walletKeys = {
    getMyWallet: ['wallets', 'me'] as const,
    getMilestoneWallet: (milestoneId: string) => ['wallets-milestones', { milestoneId }] as const,
}
