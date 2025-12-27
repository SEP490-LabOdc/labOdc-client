import { z } from 'zod'

export const skillSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Tên kỹ năng là bắt buộc'),
    description: z.string().nullable().optional(),
})

export type Skill = z.infer<typeof skillSchema>

export const skillFormSchema = z.object({
    name: z.string().min(1, 'Tên kỹ năng là bắt buộc'),
    description: z.string().optional(),
})

export type SkillForm = z.infer<typeof skillFormSchema>

