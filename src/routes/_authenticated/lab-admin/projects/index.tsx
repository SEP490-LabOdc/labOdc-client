import { createFileRoute } from '@tanstack/react-router'
import ProjectList from '@/features/labAdmin/project/index'

export const Route = createFileRoute('/_authenticated/lab-admin/projects/')({
  component: ProjectList,
})  