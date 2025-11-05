import { createFileRoute } from '@tanstack/react-router'
import Project from '@/features/companyManager/project'

export const Route = createFileRoute('/_authenticated/company-manager/project/')({
  component: Project,
})
