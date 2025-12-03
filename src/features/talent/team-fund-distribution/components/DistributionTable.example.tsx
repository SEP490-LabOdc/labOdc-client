/**
 * DistributionTable Usage Example
 * This file demonstrates how to use the DistributionTable component
 */

import React, { useState } from 'react'
import { DistributionTable } from './DistributionTable'
import {
    MOCK_TEAM_MEMBERS,
    MOCK_MILESTONE_FUNDS,
    getActiveMembers
} from '../finance.types'

export const DistributionTableExample: React.FC = () => {
    // State for allocations (memberId -> amount)
    const [allocations, setAllocations] = useState<Record<string, number>>({})

    // Get sample data
    const members = MOCK_TEAM_MEMBERS
    const milestone = MOCK_MILESTONE_FUNDS[1] // Use milestone 2 (has remaining funds)
    const totalFund = milestone.remainingAmount
    const currentUserId = 'tm-001' // Leader ID

    // Handler for allocation changes
    const handleAllocationChange = (memberId: string, amount: number) => {
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Phân bổ tiền - {milestone.title}
                </h1>
                <p className="text-gray-600 mt-1">
                    Nhập số tiền cho từng thành viên trong nhóm
                </p>
            </div>

            <DistributionTable
                members={members}
                totalFund={totalFund}
                allocations={allocations}
                onAllocationChange={handleAllocationChange}
                currentUserId={currentUserId}
            />

            {/* Debug Info */}
            <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                    Current Allocations (Debug):
                </p>
                <pre className="text-xs text-gray-600">
                    {JSON.stringify(allocations, null, 2)}
                </pre>
            </div>
        </div>
    )
}

/**
 * Example with Active Members Only
 */
export const DistributionTableActiveOnlyExample: React.FC = () => {
    const [allocations, setAllocations] = useState<Record<string, number>>({})

    // Filter to active members only
    const activeMembers = getActiveMembers(MOCK_TEAM_MEMBERS)
    const milestone = MOCK_MILESTONE_FUNDS[1]

    const handleAllocationChange = (memberId: string, amount: number) => {
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Phân bổ tiền - Chỉ thành viên Active
                </h1>
                <p className="text-gray-600 mt-1">
                    {activeMembers.length} thành viên đang hoạt động
                </p>
            </div>

            <DistributionTable
                members={activeMembers}
                totalFund={milestone.remainingAmount}
                allocations={allocations}
                onAllocationChange={handleAllocationChange}
                currentUserId="tm-001"
            />
        </div>
    )
}

/**
 * Example with Pre-filled Allocations
 */
export const DistributionTablePrefilledExample: React.FC = () => {
    // Pre-fill with equal distribution
    const members = getActiveMembers(MOCK_TEAM_MEMBERS)
    const milestone = MOCK_MILESTONE_FUNDS[1]
    const equalAmount = Math.floor(milestone.remainingAmount / members.length)

    const [allocations, setAllocations] = useState<Record<string, number>>(
        members.reduce((acc, member) => ({
            ...acc,
            [member.id]: equalAmount
        }), {})
    )

    const handleAllocationChange = (memberId: string, amount: number) => {
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Phân bổ tiền - Chia đều tự động
                </h1>
                <p className="text-gray-600 mt-1">
                    Đã tự động chia đều cho tất cả thành viên
                </p>
            </div>

            <DistributionTable
                members={members}
                totalFund={milestone.remainingAmount}
                allocations={allocations}
                onAllocationChange={handleAllocationChange}
                currentUserId="tm-001"
            />
        </div>
    )
}

