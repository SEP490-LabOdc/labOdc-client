import { createFileRoute } from '@tanstack/react-router'
import { TeamFundPage } from '@/features/team-fund-distribution'

export const Route = createFileRoute(
  '/_authenticated/talent/team-fund-distribution/',
)({
  component: TeamFundPage,
})
