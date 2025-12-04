import { createFileRoute } from '@tanstack/react-router'
import { TemplatesPage } from '@/features/mentor/project-detail/components/templates-page'

export const Route = createFileRoute(
  '/_authenticated/talent/projects/$projectId/templates/',
)({
  component: TemplatesPage,
})
