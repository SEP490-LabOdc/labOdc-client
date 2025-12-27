import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type WithdrawalRequestItem } from '../data/schema'

type WithdrawalDialogType = 'approve' | 'reject' | 'view'

type WithdrawalContextType = {
    open: WithdrawalDialogType | null
    setOpen: (str: WithdrawalDialogType | null) => void
    currentRow: WithdrawalRequestItem | null
    setCurrentRow: React.Dispatch<React.SetStateAction<WithdrawalRequestItem | null>>
}

const WithdrawalContext = React.createContext<WithdrawalContextType | null>(null)

export function WithdrawalProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<WithdrawalDialogType>(null)
    const [currentRow, setCurrentRow] = useState<WithdrawalRequestItem | null>(null)

    return (
        <WithdrawalContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
            {children}
        </WithdrawalContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWithdrawal = () => {
    const withdrawalContext = React.useContext(WithdrawalContext)

    if (!withdrawalContext) {
        throw new Error('useWithdrawal has to be used within <WithdrawalProvider>')
    }

    return withdrawalContext
}

