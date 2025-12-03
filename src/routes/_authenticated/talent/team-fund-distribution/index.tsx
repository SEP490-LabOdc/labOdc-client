import { createFileRoute } from '@tanstack/react-router'
import { TeamFundDistributionPage } from '@/features/talent/team-fund-distribution'

export const Route = createFileRoute(
  '/_authenticated/talent/team-fund-distribution/',
)({
  component: TeamFundDistributionPage,
})
