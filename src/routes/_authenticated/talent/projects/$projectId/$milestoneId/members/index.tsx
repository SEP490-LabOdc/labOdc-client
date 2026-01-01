import { createFileRoute } from '@tanstack/react-router'
import MilestoneMembersPage from '@/features/projects/milestone-members'

export const Route = createFileRoute(
  '/_authenticated/talent/projects/$projectId/$milestoneId/members/',
)({
  component: MilestoneMembersPage,
})
