// src/routes/_authenticated/company/projects/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import ProjectView from '@/features/labAdmin/project/view'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/$projectId/')({
  component: ProjectView,
})