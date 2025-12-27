import type { WithdrawalFilter } from "./types"

export const withdrawalKeys = {
    getWithdrawalRequests: (filters: WithdrawalFilter) => ['withdrawal-requests', filters] as const,
    getWithdrawalRequestById: (id: string) => ['withdrawal-requests', id] as const,
}