import { createFileRoute } from '@tanstack/react-router'
import ProjectFinancialPage from '@/features/mentor/project-financial'

export const Route = createFileRoute(
  '/_authenticated/mentor/projects/$projectId/financials/',
)({
  component: ProjectFinancialPage,
})
