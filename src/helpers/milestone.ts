import { MilestoneStatus } from "@/hooks/api/milestones"
import type { Milestone, MilestoneFund } from "@/hooks/api/milestones/types"
import type { ProjectMember } from "@/hooks/api/projects"

/**
 * Tính toán phần trăm tiến độ của milestone dựa trên ngày bắt đầu và kết thúc
 * @param startDate - Ngày bắt đầu (ISO string)
 * @param endDate - Ngày kết thúc (ISO string)
 * @returns Phần trăm tiến độ (0-100)
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