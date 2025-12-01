import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import MentorProjectPage from '@/features/mentor/projects'

const projectSearchSchema = z.object({
  status: z.enum([
    'PENDING',
    'UPDATE_REQUIRED',
    'REJECTED',
    'PLANNING',
    'ON_GOING',
    'CLOSED',
    'COMPLETE',
    'PAUSED',
  ]).optional(),
})

export const Route = createFileRoute('/_authenticated/mentor/projects/')({
  component: MentorProjectPage,
  validateSearch: (search) => projectSearchSchema.parse(search),
})
