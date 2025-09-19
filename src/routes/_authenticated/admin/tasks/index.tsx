import Task from '@/features/admin/task'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/tasks/')({
  component: Task,
})

