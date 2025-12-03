/**
 * Team Fund Distribution Types & Data
 * @description Type definitions and mock data for team fund management
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Member status in the team
 */
export type MemberStatus = 'ACTIVE' | 'INACTIVE'

/**
 * Milestone fund status
 */
export type MilestoneFundStatus = 'OPEN' | 'CLOSED'

/**
 * Team member interface
 */
export interface Member {
    id: string
    name: string
    avatar: string
    role: 'LEADER' | 'MEMBER'
    status: MemberStatus
    email: string
    joinedAt: string
}

/**
 * Milestone fund interface
 */
export interface MilestoneFund {
    id: string
    title: string
    totalReceived: number
    remainingAmount: number
    status: MilestoneFundStatus
    releasedAt: string
    description: string
}

/**
 * Allocation detail for a single member
 */
export interface AllocationDetail {
    memberName: string
    memberId: string
    amount: number
    avatar: string
    allocatedBy: string
}

/**
 * Allocation history record
 */
export interface AllocationHistory {
    id: string
    milestoneTitle: string
    milestoneId: string
    date: string
    totalAmount: number
    details: AllocationDetail[]
    notes?: string
}

/**
 * Team fund summary statistics
 */
export interface TeamFundSummary {
    totalReceived: number
    totalDistributed: number
    remainingInHolding: number
    activeMilestones: number
    totalMembers: number
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format number to Vietnamese Dong currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 * @example formatVND(1000000) // "1.000.000 ₫"
 */
export const formatVND = (amount: number): string => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '0 ₫'
    }

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
}

/**
 * Format number with thousands separator
 * @param amount - The amount to format
 * @returns Formatted number string
 * @example formatNumber(1000000) // "1.000.000"
 */
export const formatNumber = (amount: number): string => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '0'
    }

    return new Intl.NumberFormat('vi-VN').format(amount)
}

/**
 * Calculate percentage
 * @param partial - The partial amount
 * @param total - The total amount
 * @returns Percentage value
 */
export const calculatePercentage = (partial: number, total: number): number => {
    if (total === 0) return 0
    return Math.round((partial / total) * 100)
}

/**
 * Generate avatar URL from name
 * @param name - Person's name
 * @returns Avatar URL from UI Avatars
 */
export const generateAvatarUrl = (name: string): string => {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=2a9d8f&color=fff&size=128`
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Mock team members data
 */
export const MOCK_TEAM_MEMBERS: Member[] = [
    {
        id: 'tm-001',
        name: 'Nguyễn Văn Minh',
        avatar: generateAvatarUrl('Nguyễn Văn Minh'),
        role: 'LEADER',
        status: 'ACTIVE',
        email: 'nguyenvanminh@student.fpt.edu.vn',
        joinedAt: '2024-09-01T08:00:00Z'
    },
    {
        id: 'tm-002',
        name: 'Trần Thị Hương',
        avatar: generateAvatarUrl('Trần Thị Hương'),
        role: 'MEMBER',
        status: 'ACTIVE',
        email: 'tranthihuong@student.fpt.edu.vn',
        joinedAt: '2024-09-01T08:00:00Z'
    },
    {
        id: 'tm-003',
        name: 'Lê Hoàng Nam',
        avatar: generateAvatarUrl('Lê Hoàng Nam'),
        role: 'MEMBER',
        status: 'ACTIVE',
        email: 'lehoangnam@student.fpt.edu.vn',
        joinedAt: '2024-09-01T08:00:00Z'
    },
    {
        id: 'tm-004',
        name: 'Phạm Thị Lan',
        avatar: generateAvatarUrl('Phạm Thị Lan'),
        role: 'MEMBER',
        status: 'ACTIVE',
        email: 'phamthilan@student.fpt.edu.vn',
        joinedAt: '2024-09-01T08:00:00Z'
    },
    {
        id: 'tm-005',
        name: 'Võ Minh Tuấn',
        avatar: generateAvatarUrl('Võ Minh Tuấn'),
        role: 'MEMBER',
        status: 'INACTIVE',
        email: 'vominhtuan@student.fpt.edu.vn',
        joinedAt: '2024-09-01T08:00:00Z'
    }
]

/**
 * Mock milestone funds data
 */
export const MOCK_MILESTONE_FUNDS: MilestoneFund[] = [
    {
        id: 'mf-001',
        title: 'Milestone 1: Thiết kế và Xây dựng Database',
        totalReceived: 10500000,
        remainingAmount: 0,
        status: 'CLOSED',
        releasedAt: '2024-11-15T10:30:00Z',
        description: 'Hoàn thành thiết kế UI/UX và xây dựng database schema cho hệ thống'
    },
    {
        id: 'mf-002',
        title: 'Milestone 2: Phát triển Backend APIs',
        totalReceived: 14000000,
        remainingAmount: 5600000,
        status: 'OPEN',
        releasedAt: '2024-12-20T14:15:00Z',
        description: 'Xây dựng RESTful APIs và tích hợp authentication, authorization'
    },
    {
        id: 'mf-003',
        title: 'Milestone 3: Phát triển Frontend và Testing',
        totalReceived: 17500000,
        remainingAmount: 12250000,
        status: 'OPEN',
        releasedAt: '2025-01-25T09:45:00Z',
        description: 'Hoàn thiện giao diện người dùng, tích hợp APIs và testing tổng thể'
    }
]

/**
 * Mock allocation history data
 */
export const MOCK_ALLOCATION_HISTORY: AllocationHistory[] = [
    {
        id: 'ah-001',
        milestoneTitle: 'Milestone 1: Thiết kế và Xây dựng Database',
        milestoneId: 'mf-001',
        date: '2024-11-20T16:30:00Z',
        totalAmount: 10500000,
        notes: 'Phân bổ hoàn tất cho Milestone 1 - Tất cả thành viên đã hoàn thành tốt công việc',
        details: [
            {
                memberName: 'Nguyễn Văn Minh',
                memberId: 'tm-001',
                amount: 3150000,
                avatar: generateAvatarUrl('Nguyễn Văn Minh'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Trần Thị Hương',
                memberId: 'tm-002',
                amount: 2625000,
                avatar: generateAvatarUrl('Trần Thị Hương'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Lê Hoàng Nam',
                memberId: 'tm-003',
                amount: 2625000,
                avatar: generateAvatarUrl('Lê Hoàng Nam'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Phạm Thị Lan',
                memberId: 'tm-004',
                amount: 2100000,
                avatar: generateAvatarUrl('Phạm Thị Lan'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            }
        ]
    },
    {
        id: 'ah-002',
        milestoneTitle: 'Milestone 2: Phát triển Backend APIs',
        milestoneId: 'mf-002',
        date: '2024-12-28T11:00:00Z',
        totalAmount: 8400000,
        notes: 'Phân bổ đợt 1 cho Milestone 2 - Dựa trên tiến độ và đóng góp của từng thành viên',
        details: [
            {
                memberName: 'Nguyễn Văn Minh',
                memberId: 'tm-001',
                amount: 2800000,
                avatar: generateAvatarUrl('Nguyễn Văn Minh'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Trần Thị Hương',
                memberId: 'tm-002',
                amount: 2100000,
                avatar: generateAvatarUrl('Trần Thị Hương'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Lê Hoàng Nam',
                memberId: 'tm-003',
                amount: 2100000,
                avatar: generateAvatarUrl('Lê Hoàng Nam'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            },
            {
                memberName: 'Phạm Thị Lan',
                memberId: 'tm-004',
                amount: 1400000,
                avatar: generateAvatarUrl('Phạm Thị Lan'),
                allocatedBy: 'Nguyễn Văn Minh (Leader)'
            }
        ]
    }
]

/**
 * Calculate team fund summary from data
 * @param milestones - Array of milestone funds
 * @param members - Array of team members
 * @returns Team fund summary statistics
 */
export const calculateTeamFundSummary = (
    milestones: MilestoneFund[],
    members: Member[]
): TeamFundSummary => {
    const totalReceived = milestones.reduce((sum, m) => sum + m.totalReceived, 0)
    const remainingInHolding = milestones.reduce((sum, m) => sum + m.remainingAmount, 0)
    const totalDistributed = totalReceived - remainingInHolding
    const activeMilestones = milestones.filter(m => m.status === 'OPEN').length
    const totalMembers = members.filter(m => m.status === 'ACTIVE').length

    return {
        totalReceived,
        totalDistributed,
        remainingInHolding,
        activeMilestones,
        totalMembers
    }
}

/**
 * Get member allocation summary
 * @param memberId - Member ID
 * @param history - Allocation history
 * @returns Total amount received by member
 */
export const getMemberAllocationTotal = (
    memberId: string,
    history: AllocationHistory[]
): number => {
    return history.reduce((total, record) => {
        const memberDetail = record.details.find(d => d.memberId === memberId)
        return total + (memberDetail?.amount || 0)
    }, 0)
}

/**
 * Get active members only
 * @param members - Array of members
 * @returns Array of active members
 */
export const getActiveMembers = (members: Member[]): Member[] => {
    return members.filter(member => member.status === 'ACTIVE')
}

/**
 * Get open milestones only
 * @param milestones - Array of milestones
 * @returns Array of open milestones
 */
export const getOpenMilestones = (milestones: MilestoneFund[]): MilestoneFund[] => {
    return milestones.filter(milestone => milestone.status === 'OPEN')
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Minimum allocation amount per member (50,000 VND)
 */
export const MIN_ALLOCATION_AMOUNT = 50000

/**
 * Maximum days to hold funds before warning (7 days)
 */
export const MAX_HOLDING_DAYS = 7

/**
 * Team fund distribution ratio (default: equal split)
 */
export const DEFAULT_DISTRIBUTION_RATIO = {
    LEADER: 0.30,  // 30%
    MEMBER: 0.70   // 70% split among members
}

