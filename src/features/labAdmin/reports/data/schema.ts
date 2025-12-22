import { z } from 'zod'
import { ReportStatus, ReportType } from '@/hooks/api/report'

export const reportSchema = z.object({
    id: z.string(),
    projectId: z.string(),
    projectName: z.string(),
    milestoneId: z.string(),
    milestoneName: z.string(),
    reporterId: z.string(),
    reporterName: z.string(),
    reporterEmail: z.string().optional(),
    reporterAvatar: z.string().optional(),
    companyId: z.string().optional(),
    companyName: z.string().optional(),
    reportType: z.nativeEnum(ReportType),
    status: z.nativeEnum(ReportStatus),
    content: z.string(),
    attachmentsUrl: z.array(z.string()).optional(),
    reportingDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    feedback: z.string().optional(),
})

export type Report = z.infer<typeof reportSchema>

export const REPORT_STATUS_OPTIONS = [
    { value: ReportStatus.SUBMITTED, label: 'Đã gửi' },
    { value: ReportStatus.UNDER_REVIEW, label: 'Đang xem xét' },
    { value: ReportStatus.APPROVED, label: 'Đã duyệt' },
    { value: ReportStatus.REJECTED, label: 'Từ chối' },
    { value: ReportStatus.FINAL, label: 'Cuối cùng' },
    { value: ReportStatus.PENDING_ADMIN_CHECK, label: 'Chờ Lab Admin kiểm tra' },
    { value: ReportStatus.PENDING_COMPANY_REVIEW, label: 'Chờ công ty xem xét' },
]

