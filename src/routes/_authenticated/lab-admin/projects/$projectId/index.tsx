import { createFileRoute } from '@tanstack/react-router'
import ViewProject from '@/features/labAdmin/project/view'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/')({
  component: ViewProject,
})