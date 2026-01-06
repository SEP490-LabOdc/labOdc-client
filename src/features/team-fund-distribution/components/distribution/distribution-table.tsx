import React, { useMemo } from 'react'
import { OverAllocationWarning } from './over-allocation-warning'
import { DistributionTableHeader } from './distribution-table-header'
import { DistributionTableRow } from './distribution-table-row'
import { DistributionTableFooterSection } from './distribution-table-footer-section'
import { InfoBoxes } from './info-boxes'
import { EmptyState } from './empty-state'
import type { MilestoneMember } from '@/hooks/api/milestones'

interface DistributionTableProps {
    members: MilestoneMember[]
    totalFund: number
    allocations: Record<string, number>
    onAllocationChange: (memberId: string, amount: number) => void
    currentUserId: string
    isReadOnly: boolean
}

export const DistributionTable: React.FC<DistributionTableProps> = ({
    members,
    totalFund,
    allocations,
    onAllocationChange,
    currentUserId,
    isReadOnly = false,
}) => {
    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [allocations])

    const isOverAllocated = totalAllocated > totalFund

    return (
        <div className="space-y-4">
            {isOverAllocated && <OverAllocationWarning />}

            <div className="border rounded-md overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <DistributionTableHeader />

                        <tbody className="divide-y divide-gray-200">
                            {members.length === 0 ? (
                                <EmptyState />
                            ) : (
                                members.map((member) => (
                                    <DistributionTableRow
                                        key={member.userId}
                                        member={member}
                                        allocation={allocations[member.userId] || 0}
                                        totalFund={totalFund}
                                        currentUserId={currentUserId}
                                        isReadOnly={isReadOnly}
                                        onAllocationChange={onAllocationChange}
                                    />
                                ))
                            )}
                        </tbody>

                        <DistributionTableFooterSection
                            totalAllocated={totalAllocated}
                            totalFund={totalFund}
                            isOverAllocated={isOverAllocated}
                        />
                    </table>
                </div>
            </div>

            <InfoBoxes />
        </div>
    )
}