import Task from '@/features/admin/tasks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/tasks/')({
  component: Task,
})

