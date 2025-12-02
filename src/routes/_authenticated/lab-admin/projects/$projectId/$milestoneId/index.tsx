import { createFileRoute } from '@tanstack/react-router'
import MilestoneDetailPage from '@/features/mentor/milestone-detail'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/$milestoneId/')({
    component: MilestoneDetailPage,
})