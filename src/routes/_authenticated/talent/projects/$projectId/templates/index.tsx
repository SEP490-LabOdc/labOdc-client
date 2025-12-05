import { createFileRoute } from '@tanstack/react-router'
import { TemplatesPage } from '@/features/system-templates'

export const Route = createFileRoute(
  '/_authenticated/talent/projects/$projectId/templates/',
)({
  component: TemplatesPage,
})
