import { useWithdrawal } from './withdrawal-provider'
import { WithdrawalViewDialog } from './withdrawal-view-dialog'
import { WithdrawalApproveDialog } from './withdrawal-approve-dialog'
import { WithdrawalRejectDialog } from './withdrawal-reject-dialog'

export function WithdrawalDialogs() {
    const { currentRow } = useWithdrawal()

    if (!currentRow) return null

    return (
        <>
            <WithdrawalViewDialog />
            <WithdrawalApproveDialog />
            <WithdrawalRejectDialog />
        </>
    )
}