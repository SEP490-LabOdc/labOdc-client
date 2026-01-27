import React from 'react'
import { Badge } from '@/components/ui/badge'
import { ReportStatus, ReportType } from '@/hooks/api/report'

// ===== REPORT TYPE LABELS =====
export const REPORT_TYPE_LABEL: Record<ReportType, string> = {
    [ReportType.DAILY_REPORT]: 'Báo cáo Hàng ngày',
    [ReportType.WEEKLY_REPORT]: 'Báo cáo Tuần',
    [ReportType.MILESTONE_REPORT]: 'Báo cáo Milestone',
    [ReportType.DELIVERY_REPORT]: 'Báo cáo bàn giao',
}

// ===== REPORT STATUS LABELS =====
/**
 * Map ReportStatus enum to Vietnamese text labels
 */
export const REPORT_STATUS_LABEL: Record<ReportStatus, string> = {
    [ReportStatus.SUBMITTED]: 'Đã gửi',
    [ReportStatus.UNDER_REVIEW]: 'Đang xem xét',
    [ReportStatus.APPROVED]: 'Đã duyệt',
    [ReportStatus.REJECTED]: 'Từ chối',
    [ReportStatus.LAB_ADMIN_APPROVED]: 'Lab Admin Đã duyệt',
    [ReportStatus.LAB_ADMIN_REJECTED]: 'Lab Admin Từ chối',
    [ReportStatus.FINAL]: 'Cuối cùng',
    [ReportStatus.PENDING_ADMIN_CHECK]: 'Chờ Lab Admin kiểm tra',
    [ReportStatus.PENDING_COMPANY_REVIEW]: 'Chờ công ty xem xét',
}

// Additional status for UI (not in enum)
const ADDITIONAL_STATUS_LABELS: Record<string, string> = {
    'CHANGES_REQUESTED': 'Yêu cầu sửa',
}

// ===== REPORT TYPE COLORS =====
export const REPORT_TYPE_COLORS: Record<ReportType, string> = {
    [ReportType.DAILY_REPORT]: 'bg-blue-100 text-blue-700 border-blue-200',
    [ReportType.WEEKLY_REPORT]: 'bg-purple-100 text-purple-700 border-purple-200',
    [ReportType.MILESTONE_REPORT]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [ReportType.DELIVERY_REPORT]: 'bg-green-100 text-green-700 border-green-200',
}

// ===== REPORT STATUS COLORS =====
export const REPORT_STATUS_COLORS: Record<ReportStatus | string, string> = {
    [ReportStatus.SUBMITTED]: 'bg-blue-100 text-blue-700 border-blue-200',
    [ReportStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [ReportStatus.APPROVED]: 'bg-green-100 text-green-700 border-green-200',
    [ReportStatus.REJECTED]: 'bg-red-100 text-red-700 border-red-200',
    [ReportStatus.FINAL]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [ReportStatus.PENDING_ADMIN_CHECK]: 'bg-orange-100 text-orange-700 border-orange-200',
    [ReportStatus.PENDING_COMPANY_REVIEW]: 'bg-purple-100 text-purple-700 border-purple-200',
    'CHANGES_REQUESTED': 'bg-orange-100 text-orange-700 border-orange-200',
}

// ===== HELPER FUNCTIONS - STRING LABELS =====

/**
 * Get label for report type
 */
export const getReportTypeLabel = (reportType: ReportType | string): string => {
    return REPORT_TYPE_LABEL[reportType as ReportType] || reportType || ''
}

/**
 * Get label for report status
 * Maps ReportStatus enum values to Vietnamese text
 */
export const getReportStatusLabel = (status: ReportStatus | string): string => {
    // Check if it's a valid ReportStatus enum value
    if (status in REPORT_STATUS_LABEL) {
        return REPORT_STATUS_LABEL[status as ReportStatus]
    }
    // Check additional status labels
    if (status in ADDITIONAL_STATUS_LABELS) {
        return ADDITIONAL_STATUS_LABELS[status]
    }
    // Fallback to original status or empty string
    return status || ''
}

/**
 * Get Badge component for report type
 */
export const getReportTypeBadge = (reportType: ReportType | string): React.ReactElement => {
    const type = reportType as ReportType
    const className = REPORT_TYPE_COLORS[type] || 'bg-gray-100 text-gray-700 border-gray-200'
    const label = getReportTypeLabel(reportType)

    return React.createElement(
        Badge,
        { variant: 'outline', className },
        label
    )
}

/**
 * Get Badge component for report status
 */
export const getReportStatusBadge = (status: ReportStatus | string): React.ReactElement | null => {
    const className = REPORT_STATUS_COLORS[status] || 'bg-gray-100 text-gray-700 border-gray-200'
    const label = getReportStatusLabel(status)

    if (!label) return null

    return React.createElement(
        Badge,
        { variant: 'outline', className },
        label
    )
}

// Legacy alias for backward compatibility
export const getStatusBadge = getReportStatusBadge

/**
 * Report status options for select/dropdown components
 * Derived from REPORT_STATUS_LABEL to ensure consistency
 */
export const REPORT_STATUS_OPTIONS = Object.values(ReportStatus).map((status) => ({
    value: status,
    label: REPORT_STATUS_LABEL[status],
}))
