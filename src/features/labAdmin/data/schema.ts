// src/features/projects/data/schema.ts
import { z } from 'zod'

export const projectStatusSchema = z.enum(['active', 'inactive', 'completed', 'pending'])
export const projectPrioritySchema = z.enum(['high', 'medium', 'low'])

export const projectSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  projectName: z.string(),
  description: z.string().optional(),
  leader: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
  }),
  team: z.array(z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
  })),
  deadline: z.string(),
  priority: projectPrioritySchema,
  status: projectStatusSchema,
  role: z.string(),
  progress: z.number(),
})

export type Project = z.infer<typeof projectSchema>

export const PROJECT_STATUS_OPTIONS = [
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Không hoạt động', value: 'inactive' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Đang chờ', value: 'pending' },
]

export const PROJECT_PRIORITY_OPTIONS = [
  { label: 'Cao', value: 'high' },
  { label: 'Trung bình', value: 'medium' },
  { label: 'Thấp', value: 'low' },
]
