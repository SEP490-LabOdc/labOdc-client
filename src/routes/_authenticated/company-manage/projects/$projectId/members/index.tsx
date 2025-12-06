import { createFileRoute } from '@tanstack/react-router'
import ProjectMembers from '@/features/projects/members'

export const Route = createFileRoute(
  '/_authenticated/company-manage/projects/$projectId/members/',
)({
  component: ProjectMembers,
})