import { COLOR_PALETTE } from '@/consts'
import { CompanyStatus } from '@/hooks/api/companies/enums'
import { MilestoneStatus } from '@/hooks/api/milestones'
import { ProjectStatus, ReportStatus } from '@/hooks/api/projects'
import { UserStatus } from '@/hooks/api/users/enums'

export const PROJECT_STATUS_LABEL: Record<string, string> = {
    [ProjectStatus.PENDING]: 'Chờ duyệt',
    [ProjectStatus.UPDATE_REQUIRED]: 'Cần cập nhật',
    [ProjectStatus.REJECTED]: 'Đã bị hủy',
    [ProjectStatus.PLANNING]: 'Đang lên kế hoạch',
    [ProjectStatus.ON_GOING]: 'Đang thực hiện',
    [ProjectStatus.CLOSED]: 'Đã đóng',
    [ProjectStatus.PAUSED]: 'Tạm dừng',
    [ProjectStatus.COMPLETED]: 'Hoàn thành',
    [ProjectStatus.PENDING_START]: 'Chờ bắt đầu',
    [ProjectStatus.PAID]: 'Đã thanh toán',
}

export const MILESTONE_STATUS_LABEL: Record<string, string> = {
    [MilestoneStatus.PENDING]: 'Chờ xử lý',
    [MilestoneStatus.PENDING_START]: 'Chờ bắt đầu',
    [MilestoneStatus.UPDATE_REQUIRED]: 'Yêu cầu cập nhật',
    [MilestoneStatus.ON_GOING]: 'Đang thực hiện',
    [MilestoneStatus.PENDING_COMPLETED]: 'Chờ hoàn thành',
    [MilestoneStatus.COMPLETED]: 'Đã hoàn thành',
    [MilestoneStatus.UPDATE_COMPLETED]: 'Cập nhật hoàn thành',
    [MilestoneStatus.PENDING_DEPOSIT]: 'Chờ nạp tiền',
    [MilestoneStatus.DEPOSITED]: 'Đã nạp tiền',
    [MilestoneStatus.PAID]: 'Đã thanh toán',
    [MilestoneStatus.RELEASED]: 'Đã giải ngân',
}


export const COMPANY_STATUS_LABEL: Record<string, string> = {
    [CompanyStatus.PENDING]: 'Chờ duyệt',
    [CompanyStatus.UPDATE_REQUIRED]: 'Cần cập nhật',
    [CompanyStatus.ACTIVE]: 'Đang hoạt động',
    [CompanyStatus.DISABLED]: 'Ngừng hoạt động',
}

export const USER_STATUS_LABEL: Record<string, string> = {
    [UserStatus.ACTIVE]: 'Đang hoạt động',
    [UserStatus.INACTIVE]: 'Ngừng hoạt động',
}


export const REPORT_STATUS_LABEL: Record<string, string> = {
    [ReportStatus.SUBMITTED]: 'Đã gửi',
    [ReportStatus.UNDER_REVIEW]: 'Đang xem xét',
    [ReportStatus.APPROVED]: 'Đã nghiệm thu',
    [ReportStatus.REJECTED]: 'Từ chối',
    [ReportStatus.FINAL]: 'Cuối cùng',
}

// ===== TRANSACTION STATUS =====
export const TRANSACTION_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED',
} as const

export const TRANSACTION_STATUS_LABEL: Record<string, string> = {
    [TRANSACTION_STATUS.PENDING]: 'Đang xử lý',
    [TRANSACTION_STATUS.COMPLETED]: 'Hoàn thành',
    [TRANSACTION_STATUS.FAILED]: 'Thất bại',
    [TRANSACTION_STATUS.CANCELLED]: 'Đã hủy',
}

// ===== CANDIDATE STATUS =====
export const CANDIDATE_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const

export const CANDIDATE_STATUS_LABEL: Record<string, string> = {
    [CANDIDATE_STATUS.PENDING]: 'Đang chờ',
    [CANDIDATE_STATUS.APPROVED]: 'Đã duyệt',
    [CANDIDATE_STATUS.REJECTED]: 'Từ chối',
}

// ===== STATUS COLORS MAPPING =====
export enum STATUS_COLORS {
    PENDING = COLOR_PALETTE.SKY,
    COMPLETED = COLOR_PALETTE.GREEN,
    REJECTED = COLOR_PALETTE.RED,
    APPROVED = COLOR_PALETTE.GREEN,
    PROCESSING = COLOR_PALETTE.BLUE,
    ACTIVE = COLOR_PALETTE.TEAL,
    INACTIVE = COLOR_PALETTE.NEUTRAL,
    PAUSED = COLOR_PALETTE.GRAY,
    CLOSED = COLOR_PALETTE.SLATE,
    FAILED = COLOR_PALETTE.RED,
    CANCELLED = COLOR_PALETTE.GRAY,
    UPDATE_REQUIRED = COLOR_PALETTE.ORANGE,
    CHANGES_REQUESTED = COLOR_PALETTE.ORANGE,
    PLANNING = COLOR_PALETTE.BLUE,
    ON_GOING = COLOR_PALETTE.EMERALD,
    COMPLETE = COLOR_PALETTE.TEAL,
    PENDING_START = COLOR_PALETTE.SKY,
    PENDING_COMPLETED = COLOR_PALETTE.YELLOW,
    UPDATE_COMPLETED = COLOR_PALETTE.ORANGE,
    PENDING_DEPOSIT = COLOR_PALETTE.AMBER,
    DEPOSITED = COLOR_PALETTE.BLUE,
    PAID = COLOR_PALETTE.EMERALD,
    RELEASED = COLOR_PALETTE.GREEN,
    DISABLED = COLOR_PALETTE.RED_DISABLED,
    INVITED = COLOR_PALETTE.SKY,
    SUSPENDED = COLOR_PALETTE.DESTRUCTIVE,
    SUBMITTED = COLOR_PALETTE.BLUE,
    UNDER_REVIEW = COLOR_PALETTE.BLUE,
    FINAL = COLOR_PALETTE.GREEN,
}