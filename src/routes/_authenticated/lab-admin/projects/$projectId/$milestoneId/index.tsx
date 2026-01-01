import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import MilestoneDetailPage from '@/features/projects/milestone-detail'

const milestoneSearchSchema = z.object({
  companyId: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/$milestoneId/')({
    component: MilestoneDetailPage,
    validateSearch: (search) => milestoneSearchSchema.parse(search),
})