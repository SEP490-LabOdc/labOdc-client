import { createFileRoute } from '@tanstack/react-router'
import ViewProject from '@/features/company-manage/project/view'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/')({
  component: ViewProject,
})