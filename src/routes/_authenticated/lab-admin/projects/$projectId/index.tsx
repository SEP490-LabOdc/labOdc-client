import { createFileRoute } from '@tanstack/react-router'
import ProjectDetailPage from '@/features/mentor/project-detail'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/')({
  component: ProjectDetailPage,
})