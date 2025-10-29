import { createFileRoute } from '@tanstack/react-router'
import EditUser from '@/features/admin/users/edit'

export const Route = createFileRoute('/_authenticated/admin/users/edit/')({
    component: EditUser,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            id: search.id as string | undefined,
        }
    },
})

