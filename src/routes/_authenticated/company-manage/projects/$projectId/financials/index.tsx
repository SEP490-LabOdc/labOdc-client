import { createFileRoute } from '@tanstack/react-router'
import ProjectFinancialPage from '@/features/mentor/project-financial'

export const Route = createFileRoute(
  '/_authenticated/company-manage/projects/$projectId/financials/',
)({
  component: ProjectFinancialPage,
})
