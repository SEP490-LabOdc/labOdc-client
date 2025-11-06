import { z } from 'zod'

// ===== Project Status =====
export const PROJECT_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    HIRING: 'HIRING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CLOSED: 'CLOSED',
} as const

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
    [PROJECT_STATUS.PENDING]: 'Chờ duyệt',
    [PROJECT_STATUS.APPROVED]: 'Đã duyệt',
    [PROJECT_STATUS.HIRING]: 'Đang tuyển',
    [PROJECT_STATUS.IN_PROGRESS]: 'Đang thực hiện',
    [PROJECT_STATUS.COMPLETED]: 'Hoàn thành',
    [PROJECT_STATUS.CLOSED]: 'Đã đóng',
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
