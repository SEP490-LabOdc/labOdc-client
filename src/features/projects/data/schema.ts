import { z } from 'zod'

export const projectStatusSchema = z.enum(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD'])
export const projectPrioritySchema = z.enum(['high', 'medium', 'low'])

export const projectSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  mentorId: z.string().nullable(),
  title: z.string(),
  description: z.string().optional(),
  status: projectStatusSchema,
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  budget: z.number(),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
  })),
  mentors: z.array(z.object({
    id: z.string(),
    name: z.string(),
    roleName: z.string(),
    leader: z.boolean(),
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  createdByName: z.string(),
  createdByAvatar: z.string(),
  currentMilestoneId: z.string().nullable(),
  currentMilestoneName: z.string().nullable(),
  companyName: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export const PROJECT_STATUS_OPTIONS = [
  { label: 'Đang lên kế hoạch', value: 'PLANNING' },
  { label: 'Đang thực hiện', value: 'IN_PROGRESS' },
  { label: 'Hoàn thành', value: 'COMPLETED' },
  { label: 'Tạm dừng', value: 'ON_HOLD' },
  { label: 'Đang chờ đóng', value: 'PENDING_CLOSURE' },
]

export const PROJECT_PRIORITY_OPTIONS = [
  { label: 'Cao', value: 'high' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Thấp', value: 'low' },
]
