import React from 'react'
import { MilestoneStatus } from '@/hooks/api/milestones'

interface PaymentStatusRendererProps {
    status: MilestoneStatus
    children: {
        completed?: React.ReactNode
        paid?: React.ReactNode
        released?: React.ReactNode
        fallback?: React.ReactNode
    }
}

export const PaymentStatusRenderer: React.FC<PaymentStatusRendererProps> = ({
    status,
    children,
}) => {
    switch (status) {
        case MilestoneStatus.COMPLETED:
            return <>{children.completed || children.fallback}</>
        case MilestoneStatus.PAID:
            return <>{children.paid || children.fallback}</>
        case MilestoneStatus.RELEASED:
            return <>{children.released || children.fallback}</>
        default:
            return <>{children.fallback}</>
    }
}

