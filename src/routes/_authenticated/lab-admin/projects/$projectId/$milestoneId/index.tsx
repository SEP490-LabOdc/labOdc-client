import { createFileRoute } from '@tanstack/react-router'
import MilestoneView from '@/features/labAdmin/milestone-detail/index'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/$milestoneId/')({
    component: MilestoneView,
})