import { createFileRoute } from '@tanstack/react-router'
import MyProjectPage from '@/features/projects/my-projects'

export const Route = createFileRoute('/_authenticated/talent/my-projects/')({
  component: MyProjectPage,
})
