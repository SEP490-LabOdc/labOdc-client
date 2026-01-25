import React from 'react'
import { Badge } from '@/components/ui/badge'
import { MilestoneStatus } from "@/hooks/api/milestones"
import type { Milestone } from "@/hooks/api/milestones/types"
import type { ProjectMember } from "@/hooks/api/projects"

// ===== MILESTONE STATUS LABELS =====
/**
 * Map MilestoneStatus enum to Vietnamese text labels
 */
export const MILESTONE_STATUS_LABEL: Record<MilestoneStatus, string> = {
    [MilestoneStatus.PENDING]: 'Chờ xử lý',
    [MilestoneStatus.PENDING_START]: 'Chờ bắt đầu',
    [MilestoneStatus.UPDATE_REQUIRED]: 'Yêu cầu cập nhật',
    [MilestoneStatus.ON_GOING]: 'Đang thực hiện',
    [MilestoneStatus.PENDING_COMPLETED]: 'Chờ hoàn thành',
    [MilestoneStatus.COMPLETED]: 'Đã hoàn thành',
    [MilestoneStatus.PAID]: 'Đã thanh toán',
    [MilestoneStatus.DISTRIBUTED]: 'Đã giải ngân',
}

// ===== MILESTONE STATUS COLORS =====
/**
 * Map MilestoneStatus enum to color classes
 */
export const MILESTONE_STATUS_COLORS: Record<MilestoneStatus, string> = {
    [MilestoneStatus.PENDING]: 'bg-gray-100 text-gray-700 border-gray-200',
    [MilestoneStatus.PENDING_START]: 'bg-blue-100 text-blue-700 border-blue-200',
    [MilestoneStatus.UPDATE_REQUIRED]: 'bg-orange-100 text-orange-700 border-orange-200',
    [MilestoneStatus.ON_GOING]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [MilestoneStatus.PENDING_COMPLETED]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [MilestoneStatus.COMPLETED]: 'bg-green-100 text-green-700 border-green-200',
    [MilestoneStatus.PAID]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [MilestoneStatus.DISTRIBUTED]: 'bg-green-100 text-green-700 border-green-200',
}

// ===== HELPER FUNCTIONS =====

/**
 * Get label for milestone status
 * Maps MilestoneStatus enum values to Vietnamese text
 */
export const getMilestoneStatusLabel = (status: MilestoneStatus | string): string => {
    if (status in MILESTONE_STATUS_LABEL) {
        return MILESTONE_STATUS_LABEL[status as MilestoneStatus]
    }
    return status || ''
}

/**
 * Get color classes for milestone status
 * Maps MilestoneStatus enum values to Tailwind CSS color classes
 */
export const getMilestoneStatusColor = (status: MilestoneStatus | string): string => {
    if (status in MILESTONE_STATUS_COLORS) {
        return MILESTONE_STATUS_COLORS[status as MilestoneStatus]
    }
    return 'bg-gray-100 text-gray-700 border-gray-200'
}

/**
 * Get Badge component for milestone status
 */
export const getMilestoneStatusBadge = (status: MilestoneStatus | string): React.ReactElement | null => {
    const className = getMilestoneStatusColor(status)
    const label = getMilestoneStatusLabel(status)

    if (!label) return null

    return React.createElement(
        Badge,
        { variant: 'outline', className },
        label
    )
}

// ===== UTILITY FUNCTIONS =====

/**
 * Calculate the progress percentage of a milestone based on the start and end dates
 * @param startDate - Start date (ISO string)
 * @param endDate - End date (ISO string)
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (startDate: string, endDate: string): number => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()

    if (now < start) return 0
    if (now > end) return 100

    return Math.round(((now - start) / (end - start)) * 100)
}

export const calculateDaysRemaining = (endDate: string): string => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Quá hạn'
    if (diffDays === 0) return 'Hôm nay'
    return `${diffDays} ngày`
}

// helpers/milestoneUtils.tsx
export function mapMilestoneMembers(members: any[]): ProjectMember[] {
    return members.map((member) => ({
        userId: member.userId || '',
        fullName: member.name || 'Unknown',
        email: member.email || '',
        avatarUrl: member.avatar || '',
        leader: member.leader || false,
    }))
}

export const getPaidMilestones = (milestones: Milestone[]): Milestone[] => {
    return milestones.filter(milestone => milestone.status === MilestoneStatus.PAID)
}

