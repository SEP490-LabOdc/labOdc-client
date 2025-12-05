import { createFileRoute } from '@tanstack/react-router'
import { TemplatesPage } from '@/features/system-templates'

export const Route = createFileRoute(
  '/_authenticated/company-manage/projects/$projectId/templates/',
)({
  component: TemplatesPage,
})
