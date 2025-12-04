import { createFileRoute } from '@tanstack/react-router'
import { TeamFundPage } from '@/features/talent/team-fund-distribution'

export const Route = createFileRoute(
  '/_authenticated/mentor/team-fund-distribution/',
)({
  component: TeamFundPage,
})
