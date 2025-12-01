// src/routes/_authenticated/company/projects/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ProjectView from '@/features/company-manage/project/view'

export const Route = createFileRoute('/_authenticated/company-manage/projects/$projectId/')({
  component: ProjectView,
})