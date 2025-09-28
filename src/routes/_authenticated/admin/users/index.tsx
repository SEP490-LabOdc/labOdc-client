import User from '@/features/admin/users'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const userSearchSchema = z.object({
  status: z.enum(['all', 'active', 'invited', 'suspended']).default('all'),
})

export const Route = createFileRoute('/_authenticated/admin/users/')({
  validateSearch: (search) => userSearchSchema.parse(search),
  component: User,
})

