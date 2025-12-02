import { createFileRoute } from '@tanstack/react-router'
import ProjectDetailPage from '@/features/mentor/project-detail'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/')({
  component: ProjectDetailPage,
})