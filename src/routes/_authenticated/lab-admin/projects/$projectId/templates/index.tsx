import { createFileRoute } from '@tanstack/react-router'
import { TemplatesPage } from '@/features/mentor/project-detail/components/templates-page'

export const Route = createFileRoute(
  '/_authenticated/lab-admin/projects/$projectId/templates/',
)({
  component: TemplatesPage,
})
