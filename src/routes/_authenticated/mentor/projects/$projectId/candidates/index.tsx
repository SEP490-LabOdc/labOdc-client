import { createFileRoute } from '@tanstack/react-router'
import ProjectCandidates from '@/features/projects/project-candidates'

export const Route = createFileRoute(
  '/_authenticated/mentor/projects/$projectId/candidates/',
)({
  component: ProjectCandidates,
})
