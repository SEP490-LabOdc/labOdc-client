import { createFileRoute } from '@tanstack/react-router'
import MilestoneMembersPage from '@/features/projects/milestone-members'

export const Route = createFileRoute(
  '/_authenticated/company-manage/projects/$projectId/$milestoneId/members/',
)({
  component: MilestoneMembersPage,
})
