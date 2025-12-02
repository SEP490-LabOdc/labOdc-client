import { createFileRoute } from '@tanstack/react-router'
import MilestoneDetailPage from '@/features/mentor/milestone-detail'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/$milestoneId/')({
    component: MilestoneDetailPage,
})