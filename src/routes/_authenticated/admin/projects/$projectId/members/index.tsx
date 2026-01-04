import { createFileRoute } from '@tanstack/react-router'
import ProjectMembers from '@/features/projects/members'

export const Route = createFileRoute(
  '/_authenticated/admin/projects/$projectId/members/',
)({
  component: ProjectMembers,
})