import { z } from 'zod'

// ===== Project Status =====
export const PROJECT_STATUS = {
    PENDING: 'PENDING',
    UPDATE_REQUIRED: 'UPDATE_REQUIRED',
    REJECTED: 'REJECTED',
    PLANNING: 'PLANNING',
    ON_GOING: 'ON_GOING',
    CLOSED: 'CLOSED',
    PAUSED: 'PAUSED',
    COMPLETE: 'COMPLETE',
    PENDING_CLOSURE: 'PENDING_CLOSURE'
} as const

// ===== Project Status Labels =====
export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
    PENDING: 'Chờ Lab Admin duyệt',
    UPDATE_REQUIRED: 'Doanh nghiệp cập nhật thông tin',
    REJECTED: 'Đã bị hủy',
    PLANNING: 'Đang lên kế hoạch',
    ON_GOING: 'Đang thực hiện',
    CLOSED: 'Đã đóng',
    PAUSED: 'Tạm dừng',
    COMPLETE: 'Hoàn thành',
    PENDING_CLOSURE: 'Đang chờ đóng'
}

export const PROJECT_STATUS_OPTIONS = Object.entries(PROJECT_STATUS_LABEL).map(
    ([value, label]) => ({ value, label })
)

export const projectStatusSchema = z.enum(PROJECT_STATUS)
export type ProjectStatus = z.infer<typeof projectStatusSchema>

// ===== Skill Schema =====
export const skillSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Tên kỹ năng là bắt buộc.'),
    description: z.string().nullable().optional(),
})

// ===== Project Schema =====
export const projectSchema = z.object({
    id: z.string(),
    title: z.string().min(2, 'Tên dự án phải có ít nhất 2 ký tự.'),
    description: z.string().nullable(),
    status: projectStatusSchema,
    startDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Ngày bắt đầu không hợp lệ.'),
    endDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Ngày kết thúc không hợp lệ.'),
    budget: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'Ngân sách không hợp lệ.'),
    skills: z.array(skillSchema),
})

// ===== TypeScript types =====
export type Project = z.infer<typeof projectSchema>

// ===== List schema =====
export const projectListSchema = z.array(projectSchema)
export type ProjectList = z.infer<typeof projectListSchema>

// ===== Company Projects schema =====
export const myCompanyProjectsSchema = z.object({
    companyId: z.string(),
    companyName: z.string(),
    projectResponses: projectListSchema,
})
export type MyCompanyProjects = z.infer<typeof myCompanyProjectsSchema>
