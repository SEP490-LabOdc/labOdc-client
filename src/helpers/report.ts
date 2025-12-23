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
// Note: UI uses simplified statuses (SUBMITTED, CHANGES_REQUESTED, APPROVED)
// which map from API statuses
export const REPORT_STATUS_LABEL: Record<string, string> = {
    [ReportStatus.SUBMITTED]: 'Đang chờ duyệt',
    'CHANGES_REQUESTED': 'Yêu cầu sửa',
    [ReportStatus.APPROVED]: 'Đã nghiệm thu',
    [ReportStatus.REJECTED]: 'Từ chối',
    [ReportStatus.UNDER_REVIEW]: 'Đang xem xét',
    [ReportStatus.FINAL]: 'Cuối cùng',
}

// ===== REPORT TYPE COLORS =====
export const REPORT_TYPE_COLORS: Record<ReportType, string> = {
    [ReportType.DAILY_REPORT]: 'bg-blue-100 text-blue-700 border-blue-200',
    [ReportType.WEEKLY_REPORT]: 'bg-purple-100 text-purple-700 border-purple-200',
    [ReportType.MILESTONE_REPORT]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [ReportType.DELIVERY_REPORT]: 'bg-green-100 text-green-700 border-green-200',
}

// ===== REPORT STATUS COLORS =====
export const REPORT_STATUS_COLORS: Record<string, string> = {
    [ReportStatus.SUBMITTED]: 'bg-blue-100 text-blue-700 border-blue-200',
    'CHANGES_REQUESTED': 'bg-orange-100 text-orange-700 border-orange-200',
    [ReportStatus.APPROVED]: 'bg-green-100 text-green-700 border-green-200',
    [ReportStatus.REJECTED]: 'bg-red-100 text-red-700 border-red-200',
    [ReportStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [ReportStatus.FINAL]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
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
 */
export const getReportStatusLabel = (status: ReportStatus | string): string => {
    return REPORT_STATUS_LABEL[status] || status || ''
}

// ===== HELPER FUNCTIONS - STATUS MAPPING =====

/**
 * Map API status to UI status
 * API may return: SUBMITTED, PENDING, CHANGES_REQUESTED, REJECTED, APPROVED, ACCEPTED
 * UI uses: SUBMITTED, CHANGES_REQUESTED, APPROVED
 */
export const mapApiStatusToUIStatus = (apiStatus: string): ReportStatus | 'CHANGES_REQUESTED' => {
    const statusMap: Record<string, ReportStatus | 'CHANGES_REQUESTED'> = {
        'SUBMITTED': ReportStatus.SUBMITTED,
        'PENDING': ReportStatus.SUBMITTED,
        'CHANGES_REQUESTED': 'CHANGES_REQUESTED',
        'REJECTED': 'CHANGES_REQUESTED',
        'APPROVED': ReportStatus.APPROVED,
        'ACCEPTED': ReportStatus.APPROVED,
    }
    return statusMap[apiStatus] || ReportStatus.SUBMITTED
}

// ===== HELPER FUNCTIONS - BADGE COMPONENTS =====

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

// ===== HELPER FUNCTIONS - DATA TRANSFORMATION =====

/**
 * API Report Type (from backend)
 */
export interface ApiReport {
    id: string
    projectId: string
    projectName: string
    reporterId: string
    reporterName: string
    reporterEmail: string
    reporterAvatar: string
    recipientId: string
    reportType: string
    status: string
    content: string
    attachmentsUrl: string[]
    reportingDate: string
    createdAt: string
    feedback?: string
    milestoneId: string
    milestoneTitle: string
}

/**
 * UI Report Version Type
 * Note: status can be ReportStatus or 'CHANGES_REQUESTED' (which is not in enum but used in UI)
 */
export interface ReportVersion {
    id: string
    submittedAt: string
    submittedBy: string
    submittedByAvatar?: string
    content: string
    files: { name: string; size: string }[]
    status: ReportStatus | 'CHANGES_REQUESTED'
    reportType: ReportType
    feedback?: string
}

// Type for status that includes CHANGES_REQUESTED
export type ReportStatusUI = ReportStatus | 'CHANGES_REQUESTED'

/**
 * Map API reports to UI format
 */
export const mapApiReportsToUI = (apiReports: ApiReport[]): ReportVersion[] => {
    return apiReports.map((report) => ({
        id: report.id,
        submittedAt: new Date(report.createdAt).toLocaleString('vi-VN'),
        submittedBy: report.reporterName,
        submittedByAvatar: report.reporterAvatar,
        content: report.content,
        files: report.attachmentsUrl.map((url) => ({
            name: url.split('/').pop() || 'file',
            size: 'N/A',
        })),
        status: mapApiStatusToUIStatus(report.status),
        reportType: report.reportType as ReportType,
        feedback: report.feedback,
    }))
}
