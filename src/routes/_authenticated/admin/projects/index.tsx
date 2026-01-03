import { createFileRoute } from '@tanstack/react-router'
import ProjectList from '@/features/admin/project/index'

export const Route = createFileRoute('/_authenticated/admin/projects/')({
  component: ProjectList,
})  