import User from '@/features/admin/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/users/')({
  component: User,
})

