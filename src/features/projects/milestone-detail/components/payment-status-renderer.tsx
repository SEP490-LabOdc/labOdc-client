import React from 'react'

type PaymentStatus = 'PENDING_DEPOSIT' | 'DEPOSITED' | 'RELEASED'

interface PaymentStatusRendererProps {
    status: PaymentStatus
    children: {
        pendingDeposit?: React.ReactNode
        deposited?: React.ReactNode
        released?: React.ReactNode
        fallback?: React.ReactNode
    }
}

export const PaymentStatusRenderer: React.FC<PaymentStatusRendererProps> = ({
    status,
    children,
}) => {
    switch (status) {
        case 'PENDING_DEPOSIT':
            return <>{children.pendingDeposit || children.fallback}</>
        case 'DEPOSITED':
            return <>{children.deposited || children.fallback}</>
        case 'RELEASED':
            return <>{children.released || children.fallback}</>
        default:
            return <>{children.fallback}</>
    }
}

