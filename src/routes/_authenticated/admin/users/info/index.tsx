import { createFileRoute } from '@tanstack/react-router'
import UserInfo from '@/features/admin/users/info'

export const Route = createFileRoute('/_authenticated/admin/users/info/')({
    component: UserInfo,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            id: search.id as string | undefined,
        }
    },
})