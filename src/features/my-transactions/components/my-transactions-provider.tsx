import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Transaction } from './my-transactions-table'

type TransactionDialogType = 'view'

type TransactionContextType = {
    open: TransactionDialogType | null
    setOpen: (str: TransactionDialogType | null) => void
    currentRow: Transaction | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Transaction | null>>
}

const TransactionContext = React.createContext<TransactionContextType | null>(null)

export function MyTransactionsProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<TransactionDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Transaction | null>(null)

    return (
        <TransactionContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
            {children}
        </TransactionContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMyTransactions = () => {
    const transactionContext = React.useContext(TransactionContext)

    if (!transactionContext) {
        throw new Error('useMyTransactions has to be used within <MyTransactionsProvider>')
    }

    return transactionContext
}

