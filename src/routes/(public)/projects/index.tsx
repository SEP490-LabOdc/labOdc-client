import ProjectListPage from '@/features/projects/pages/ProjectListPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/projects/')({
    component: ProjectListPage,
})