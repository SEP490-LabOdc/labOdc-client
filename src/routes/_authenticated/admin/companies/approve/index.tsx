import { createFileRoute } from '@tanstack/react-router'
import ApproveCompany from '@/features/admin/companies/approve'
import type { Company } from '@/features/admin/companies/data/schema'

export const Route = createFileRoute('/_authenticated/admin/companies/approve/')({
    component: ApproveCompany,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            company: search.company as Company | undefined,
        }
    },
})
