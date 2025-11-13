import { z } from 'zod'

// ===== Project Status =====
export const PROJECT_STATUS = {
    PENDING: 'PENDING',
    COMPANY_UPDATE_REQUEST: 'COMPANY_UPDATE_REQUEST',
    REJECTED: 'REJECTED',
    MENTOR_BUILD_PROJECT_PLAN: 'MENTOR_BUILD_PROJECT_PLAN',
    PENDING_COMPANY_APPROVAL: 'PENDING_COMPANY_APPROVAL',
    PENDING_LAB_PUBLISH: 'PENDING_LAB_PUBLISH',
    HIRING: 'HIRING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
} as const

// ===== Project Status Labels =====
export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
    [PROJECT_STATUS.PENDING]: 'Chờ lab admin duyệt',
    [PROJECT_STATUS.COMPANY_UPDATE_REQUEST]: 'Công ty cần cập nhật thông tin',
    [PROJECT_STATUS.REJECTED]: 'Đã bị hủy',
    [PROJECT_STATUS.MENTOR_BUILD_PROJECT_PLAN]: 'Mentor lên kế hoạch',
    [PROJECT_STATUS.PENDING_COMPANY_APPROVAL]: 'Chờ công ty phê duyệt',
    [PROJECT_STATUS.PENDING_LAB_PUBLISH]: 'Chờ Lab admin công bố',
    [PROJECT_STATUS.HIRING]: 'Đang tuyển nhân sự',
    [PROJECT_STATUS.IN_PROGRESS]: 'Đang thực hiện',
    [PROJECT_STATUS.COMPLETED]: 'Hoàn thành',
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
