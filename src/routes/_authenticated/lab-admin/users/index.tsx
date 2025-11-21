import User from '@/features/labAdmin/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/lab-admin/users/')({
  component: User,
})

