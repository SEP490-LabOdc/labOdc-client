import { createFileRoute } from '@tanstack/react-router'
import ProjectList from '@/features/company-manage/project'

export const Route = createFileRoute('/_authenticated/company-manage/projects/')({
  component: ProjectList,
})  