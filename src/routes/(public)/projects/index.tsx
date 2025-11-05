import ProjectListPage from '@/features/projects/ProjectListPage/ProjectListPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/projects/')({
    component: ProjectListPage,
})