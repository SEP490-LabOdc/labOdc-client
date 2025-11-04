import { createFileRoute } from '@tanstack/react-router'
import ApproveCompany from '@/features/labAdmin/companies/approve'

export const Route = createFileRoute('/_authenticated/lab-admin/companies/approve/')({
    component: ApproveCompany,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            id: search.id as string | undefined,
        }
    },
})
