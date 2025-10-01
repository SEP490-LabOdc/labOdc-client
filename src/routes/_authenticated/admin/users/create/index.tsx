import { createFileRoute } from '@tanstack/react-router'
import CreateUser from '@/features/admin/users/create'

export const Route = createFileRoute('/_authenticated/admin/users/create/')({
    component: CreateUser,
})

