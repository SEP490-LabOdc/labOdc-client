import { createFileRoute } from '@tanstack/react-router'
import MilestoneView from '@/features/company-manage/milestone-detail/'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/$milestoneId/')({
    component: MilestoneView,
})