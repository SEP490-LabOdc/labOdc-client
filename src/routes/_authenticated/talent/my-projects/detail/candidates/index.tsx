import { createFileRoute } from '@tanstack/react-router'
import CandidateListPage from '@/features/projects/project-candidates'

export const Route = createFileRoute(
  '/_authenticated/talent/my-projects/detail/candidates/',
)({
  component: CandidateListPage,
})
