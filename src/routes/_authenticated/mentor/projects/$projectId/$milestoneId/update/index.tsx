import UpdateMilestonePage from '@/features/projects/milestone-detail/update'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/mentor/projects/$projectId/$milestoneId/update/',
)({
  component: UpdateMilestonePage,
})
