import { createFileRoute } from '@tanstack/react-router'
import EditUser from '@/features/admin/users/edit'
import type { User } from '@/features/admin/users/data/schema'

export const Route = createFileRoute('/_authenticated/admin/users/edit/')({
    component: EditUser,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            user: search.user as User | undefined,
        }
    },
})

