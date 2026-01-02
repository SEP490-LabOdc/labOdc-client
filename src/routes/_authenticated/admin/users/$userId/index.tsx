import { createFileRoute } from '@tanstack/react-router'
import UserInfo from '@/features/admin/users/info'

export const Route = createFileRoute('/_authenticated/admin/users/$userId/')({
    component: UserInfo,
})