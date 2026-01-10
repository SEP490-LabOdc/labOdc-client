import { createFileRoute } from '@tanstack/react-router'
import ProjectFinancialPage from '@/features/projects/project-financial'

export const Route = createFileRoute(
  '/_authenticated/talent/projects/$projectId/financials/',
)({
  component: ProjectFinancialPage,
})