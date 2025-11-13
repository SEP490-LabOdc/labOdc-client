import { createFileRoute } from '@tanstack/react-router'
import MilestoneDetailPage from '@/features/projects/milestone-detail'

export const Route = createFileRoute(
  '/_authenticated/talent/my-projects/detail/milestone-detail/',
)({
  component: MilestoneDetailPage,
})

