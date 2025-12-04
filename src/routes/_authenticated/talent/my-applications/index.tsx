import { createFileRoute } from '@tanstack/react-router'
import MyApplicationsPage from '@/features/talent/my-applications'

export const Route = createFileRoute('/_authenticated/talent/my-applications/')({
  component: MyApplicationsPage,
})
