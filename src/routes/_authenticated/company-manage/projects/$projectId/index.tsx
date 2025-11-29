// src/routes/_authenticated/company/projects/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ProjectView from '@/features/companyManage/project/view'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/')({
  component: ProjectView,
})