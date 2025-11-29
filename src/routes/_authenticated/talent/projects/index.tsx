import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import TalentProjectPage from '@/features/talent/projects'

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

export const Route = createFileRoute('/_authenticated/talent/projects/')({
  component: TalentProjectPage,
  validateSearch: (search) => projectSearchSchema.parse(search),
})
