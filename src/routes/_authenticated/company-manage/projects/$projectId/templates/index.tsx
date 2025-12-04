import { createFileRoute } from '@tanstack/react-router'
import { TemplatesPage } from '@/features/mentor/project-detail/components/templates-page'

export const Route = createFileRoute(
  '/_authenticated/company-manage/projects/$projectId/templates/',
)({
  component: TemplatesPage,
})
