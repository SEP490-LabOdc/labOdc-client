// src/routes/_authenticated/company/projects/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ProjectList from '@/features/companyManage/project/'

export const Route = createFileRoute('/_authenticated/company-manage/projects/')({
  component: ProjectList,
})  