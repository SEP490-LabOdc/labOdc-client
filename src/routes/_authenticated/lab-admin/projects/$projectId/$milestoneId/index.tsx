import { createFileRoute } from '@tanstack/react-router'
import MilestoneDetailPage from '@/features/projects/milestone-detail'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/$milestoneId/')({
    component: MilestoneDetailPage,
})