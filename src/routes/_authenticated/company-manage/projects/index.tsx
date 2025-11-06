import { createFileRoute } from '@tanstack/react-router'
import Project from '@/features/companyManage/project'

export const Route = createFileRoute('/_authenticated/company-manage/projects/')({
  component: Project,
})
