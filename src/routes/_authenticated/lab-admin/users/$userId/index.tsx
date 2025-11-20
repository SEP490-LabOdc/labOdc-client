import { createFileRoute } from '@tanstack/react-router'
import UserInfo from '@/features/labAdmin/users/info'

export const Route = createFileRoute('/_authenticated/lab-admin/users/$userId/')({
    component: UserInfo,
})