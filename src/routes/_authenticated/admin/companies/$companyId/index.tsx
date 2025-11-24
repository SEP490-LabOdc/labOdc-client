import { createFileRoute } from '@tanstack/react-router'
import ViewCompany from '@/features/admin/companies/view'

export const Route = createFileRoute('/_authenticated/admin/companies/$companyId/')({
    component: ViewCompany,
})
