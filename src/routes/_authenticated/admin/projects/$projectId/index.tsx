import { createFileRoute } from '@tanstack/react-router'
import ViewProject from '@/features/admin/project/view'

export const Route = createFileRoute('/_authenticated/admin/projects/$projectId/')({
  component: ViewProject,
})